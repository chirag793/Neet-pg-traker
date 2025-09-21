{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling1\cocoaplatform1{\fonttbl\f0\fmodern\fcharset0 Courier;\f1\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red250\green250\blue250;\red197\green134\blue192;\red212\green212\blue212;
\red156\green220\blue254;\red206\green145\blue120;\red86\green156\blue214;\red78\green201\blue176;\red220\green220\blue170;
}
{\*\expandedcolortbl;;\cssrgb\c98039\c98039\c98039;\cssrgb\c77255\c52549\c75294;\cssrgb\c83137\c83137\c83137;
\cssrgb\c61176\c86275\c99608;\cssrgb\c80784\c56863\c47059;\cssrgb\c33725\c61176\c83922;\cssrgb\c30588\c78824\c69020;\cssrgb\c86275\c86275\c66667;
}
\deftab720
\pard\pardeftab720\qr\partightenfactor0

\f0\fs24 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 2\
3\
4\
5\
6\
7\
8\
9\
10\
11\
12\
13\
14\
15\
16\
17\
18\
19\
20\
21\
22\
23\
24\
25\
\pard\pardeftab720\partightenfactor0

\f1 \cf3 \strokec3 import\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  \cf5 \strokec5 createTRPCReact\cf2 \strokec2  \cf4 \strokec4 \}\cf2 \strokec2  \cf3 \strokec3 from\cf2 \strokec2  \cf6 \strokec6 "@trpc/react-query"\cf4 \strokec4 ;\cf2 \strokec2 \
\cf3 \strokec3 import\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  \cf5 \strokec5 httpLink\cf2 \strokec2  \cf4 \strokec4 \}\cf2 \strokec2  \cf3 \strokec3 from\cf2 \strokec2  \cf6 \strokec6 "@trpc/client"\cf4 \strokec4 ;\cf2 \strokec2 \
\cf3 \strokec3 import\cf2 \strokec2  \cf7 \strokec7 type\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  \cf5 \strokec5 AppRouter\cf2 \strokec2  \cf4 \strokec4 \}\cf2 \strokec2  \cf3 \strokec3 from\cf2 \strokec2  \cf6 \strokec6 "@/backend/trpc/app-router"\cf4 \strokec4 ;\cf2 \strokec2 \
\cf3 \strokec3 import\cf2 \strokec2  \cf5 \strokec5 superjson\cf2 \strokec2  \cf3 \strokec3 from\cf2 \strokec2  \cf6 \strokec6 "superjson"\cf4 \strokec4 ;\cf2 \strokec2 \
\
\cf3 \strokec3 export\cf2 \strokec2  \cf7 \strokec7 const\cf2 \strokec2  \cf5 \strokec5 trpc\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf5 \strokec5 createTRPCReact\cf2 \strokec2 <\cf8 \strokec8 AppRouter\cf2 \strokec2 >\cf4 \strokec4 ();\cf2 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \strokec7 const\cf2 \strokec2  \cf5 \strokec5 getBaseUrl\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf4 \strokec4 ()\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2 \
  \cf3 \strokec3 if\cf2 \strokec2  \cf4 \strokec4 (\cf5 \strokec5 process\cf4 \strokec4 .\cf5 \strokec5 env\cf4 \strokec4 .\cf5 \strokec5 EXPO_PUBLIC_RORK_API_BASE_URL\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2 \
    \cf3 \strokec3 return\cf2 \strokec2  \cf5 \strokec5 process\cf4 \strokec4 .\cf5 \strokec5 env\cf4 \strokec4 .\cf5 \strokec5 EXPO_PUBLIC_RORK_API_BASE_URL\cf4 \strokec4 ;\cf2 \strokec2 \
  \cf4 \strokec4 \}\cf2 \strokec2 \
\
  \cf3 \strokec3 throw\cf2 \strokec2  \cf7 \strokec7 new\cf2 \strokec2  \cf8 \strokec8 Error\cf4 \strokec4 (\cf2 \strokec2 \
    \cf6 \strokec6 "No base url found, please set EXPO_PUBLIC_RORK_API_BASE_URL"\cf2 \strokec2 \
  \cf4 \strokec4 );\cf2 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \strokec4 \};\cf2 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf3 \strokec3 export\cf2 \strokec2  \cf7 \strokec7 const\cf2 \strokec2  \cf5 \strokec5 trpcClient\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf5 \strokec5 trpc\cf4 \strokec4 .\cf9 \strokec9 createClient\cf4 \strokec4 (\{\cf2 \strokec2 \
  \cf5 \strokec5 links\cf4 \strokec4 :\cf2 \strokec2  \cf4 \strokec4 [\cf2 \strokec2 \
    \cf9 \strokec9 httpLink\cf4 \strokec4 (\{\cf2 \strokec2 \
      \cf5 \strokec5 url\cf4 \strokec4 :\cf2 \strokec2  \cf6 \strokec6 `\cf7 \strokec7 $\{\cf9 \strokec9 getBaseUrl\cf4 \strokec4 ()\cf7 \strokec7 \}\cf6 \strokec6 /api/trpc`\cf4 \strokec4 ,\cf2 \strokec2 \
      \cf5 \strokec5 transformer\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 superjson\cf4 \strokec4 ,\cf2 \strokec2 \
    \cf4 \strokec4 \}),\cf2 \strokec2 \
  \cf4 \strokec4 ],\cf2 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \strokec4 \});\cf2 \strokec2 \
}