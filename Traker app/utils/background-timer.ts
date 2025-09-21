import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface BackgroundTimerState {
  isRunning: boolean;
  startTime: number;
  pausedTime: number;
  totalTime: number;
  sessionType: 'work' | 'shortBreak' | 'longBreak';
  mode: 'pomodoro' | 'countup';
  subjectId: string;
  completedSessions: number;
  totalSessions: number;
  distractionCount: number;
}

const BACKGROUND_TIMER_KEY = 'background_timer_state';

export class BackgroundTimer {
  private static instance: BackgroundTimer;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private state: BackgroundTimerState | null = null;

  static getInstance(): BackgroundTimer {
    if (!BackgroundTimer.instance) {
      BackgroundTimer.instance = new BackgroundTimer();
    }
    return BackgroundTimer.instance;
  }

  async saveState(state: BackgroundTimerState): Promise<void> {
    try {
      this.state = state;
      await AsyncStorage.setItem(BACKGROUND_TIMER_KEY, JSON.stringify({
        ...state,
        lastSaveTime: Date.now()
      }));
      console.log('Background timer state saved:', state);
    } catch (error) {
      console.error('Error saving background timer state:', error);
    }
  }

  async loadState(): Promise<BackgroundTimerState | null> {
    try {
      const stateStr = await AsyncStorage.getItem(BACKGROUND_TIMER_KEY);
      if (!stateStr || stateStr === 'undefined' || stateStr === 'null') return null;
      
      // Enhanced validation for corrupted data
      const trimmed = stateStr.trim();
      if (trimmed === '' || 
          trimmed === 'object' || 
          trimmed.includes('[object Object]') ||
          trimmed.startsWith('[object') ||
          /^[a-zA-Z]+$/.test(trimmed)) {
        console.warn('Background timer: Corrupted data detected, clearing state');
        await this.clearState();
        return null;
      }
      
      const savedState = JSON.parse(trimmed);
      this.state = savedState;
      console.log('Background timer state loaded:', savedState);
      return savedState;
    } catch (error) {
      console.error('Error loading background timer state:', error);
      // Clear corrupted state
      await this.clearState();
      return null;
    }
  }

  async clearState(): Promise<void> {
    try {
      this.state = null;
      await AsyncStorage.removeItem(BACKGROUND_TIMER_KEY);
      console.log('Background timer state cleared');
    } catch (error) {
      console.error('Error clearing background timer state:', error);
    }
  }

  async startBackgroundTimer(state: BackgroundTimerState): Promise<void> {
    console.log('Starting background timer with state:', state);
    await this.saveState(state);
    
    if (Platform.OS === 'web') {
      // For web, use a regular interval that continues even when tab is not active
      this.startWebBackgroundTimer();
    } else {
      // For mobile, the timer state is saved and will be calculated when app returns
      console.log('Mobile background timer started - state saved for calculation on return');
    }
  }

  private startWebBackgroundTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(async () => {
      if (!this.state) return;

      try {
        const now = Date.now();
        const elapsed = Math.floor((now - this.state.startTime - this.state.pausedTime) / 1000);
        
        if (this.state.mode === 'pomodoro') {
          const remaining = Math.max(0, this.state.totalTime - elapsed);
          
          // Update state with current progress
          const updatedState = {
            ...this.state,
            lastSaveTime: now
          };
          await AsyncStorage.setItem(BACKGROUND_TIMER_KEY, JSON.stringify(updatedState));
          
          // Check if timer completed
          if (remaining === 0 && elapsed >= this.state.totalTime) {
            console.log('Background timer completed on web');
            await this.handleTimerCompletion();
          }
        }
      } catch (error) {
        console.error('Error in web background timer:', error);
      }
    }, 1000);
  }

  private async handleTimerCompletion(): Promise<void> {
    console.log('Handling background timer completion');
    
    // Stop the background timer
    await this.stopBackgroundTimer();
    
    // The actual completion handling will be done when the app becomes active
    // We just mark that completion occurred
    if (this.state) {
      const completionState = {
        ...this.state,
        completed: true,
        completionTime: Date.now()
      };
      await AsyncStorage.setItem(BACKGROUND_TIMER_KEY, JSON.stringify(completionState));
    }
  }

  async stopBackgroundTimer(): Promise<void> {
    console.log('Stopping background timer');
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    await this.clearState();
  }

  async pauseBackgroundTimer(): Promise<void> {
    if (!this.state) return;
    
    const now = Date.now();
    const currentPausedTime = this.state.pausedTime + (now - this.state.startTime);
    
    const pausedState = {
      ...this.state,
      pausedTime: currentPausedTime,
      isRunning: false,
      lastPauseTime: now
    };
    
    await this.saveState(pausedState);
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    console.log('Background timer paused');
  }

  async resumeBackgroundTimer(): Promise<void> {
    if (!this.state) return;
    
    const now = Date.now();
    const resumedState = {
      ...this.state,
      isRunning: true,
      startTime: now - (this.state.pausedTime || 0)
    };
    
    await this.saveState(resumedState);
    
    if (Platform.OS === 'web') {
      this.startWebBackgroundTimer();
    }
    
    console.log('Background timer resumed');
  }

  async getTimerProgress(): Promise<{
    timeRemaining: number;
    elapsedTime: number;
    isCompleted: boolean;
    state: BackgroundTimerState | null;
  } | null> {
    const state = await this.loadState();
    if (!state) return null;

    const now = Date.now();
    const totalElapsed = Math.floor((now - state.startTime - (state.pausedTime || 0)) / 1000);
    
    if (state.mode === 'pomodoro') {
      const timeRemaining = Math.max(0, state.totalTime - totalElapsed);
      const isCompleted = timeRemaining === 0;
      
      return {
        timeRemaining,
        elapsedTime: totalElapsed,
        isCompleted,
        state
      };
    } else {
      return {
        timeRemaining: 0,
        elapsedTime: totalElapsed,
        isCompleted: false,
        state
      };
    }
  }

  isActive(): boolean {
    return this.state?.isRunning || false;
  }
}

export const backgroundTimer = BackgroundTimer.getInstance();