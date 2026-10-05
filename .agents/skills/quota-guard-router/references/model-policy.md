# Model routing policy

## Primary path

- GPT-6 Luna: default owner for exploration, implementation, debugging, tests, small reviews, and repetitive work.
- GPT-6 Sol: first compact consultant when Luna has a concrete unresolved blocker.
- GPT-6.1 Sol: deeper consultant for genuinely complex coding/agentic reasoning when available.
- GPT-6 Astra: rare final judge for an unresolved high-impact decision; never automatic.

## GPT-5.6 compatibility lane

GPT-5.6 Luna, Terra, and Sol remain useful when:
- a GPT-6 model is unavailable in the current account/workspace/client;
- a project has compatibility constraints;
- the user's own measured allowance history shows a better result for a particular task class.

Do not assume an older 5.x model is cheaper merely because its version number is lower. Current OpenAI guidance should be checked periodically.

## Unsupported names

Do not invent model IDs. If the user asks for a model not shown by `/model`, do not route to it. Fall back to the nearest available tier and explain briefly.
