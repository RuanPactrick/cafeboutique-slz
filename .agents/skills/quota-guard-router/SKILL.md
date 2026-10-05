---
name: quota-guard-router
description: Build, debug, refactor, test, or review code while aggressively protecting the user's Codex/Work included usage allowance. Default to GPT-6 Luna, minimize context and retries, and escalate to stronger models only after a concrete blocker and within the configured quota guardrails.
---

# Quota Guard Router

Primary objective: finish the user's task **without exhausting the 5-hour or weekly Codex/Work allowance**. Quality matters, but quota preservation is a hard constraint.

## 1. Start cheap and stay cheap

Use the current main thread when it is GPT-6 Luna. Prefer **GPT-6 Luna with Max reasoning** for normal coding work unless the task is obviously trivial enough to use less reasoning.

Before any model escalation:
1. Narrow the task to the smallest useful unit.
2. Read only files that are likely relevant.
3. Reuse cached context instead of reopening large files.
4. Run the narrowest useful test or reproducer.
5. Give Luna one coherent repair attempt based on evidence.

Do not escalate merely because the task looks difficult.

## 2. Read quota state

If `.quota-guard/state.json` exists, read it before expensive escalation. Treat a snapshot older than 30 minutes as stale.

If quota is unknown or stale, behave as **AMBER**: Luna may continue, but any non-Luna escalation requires user approval.

Use the bands in `references/quota-policy.md`.

## 3. Escalation ladder

Escalate only for a concrete blocker: a targeted test still fails after one evidence-based fix, competing hypotheses remain unresolved, a high-risk design choice cannot be settled locally, or the requested quality clearly exceeds Luna after a focused attempt.

Preferred ladder:
1. `luna6_explorer` / `luna6_worker` — stay on GPT-6 Luna.
2. `sol6_consultant` — one compact GPT-6 Sol consultation.
3. `sol61_consultant` — GPT-6.1 Sol only if the blocker remains and the model is available.
4. `astra_judge` — emergency-only final judge; explicit user approval is required every time.

Legacy GPT-5.6 agents are a **compatibility/empirical lane**, not the default savings lane. Use them only when GPT-6 options are unavailable or the user's own benchmark history shows better allowance efficiency for that task class.

After every consultation, return implementation ownership to Luna. Stronger agents should be read-only advisers unless the user explicitly requests otherwise.

## 4. Context capsule for consultations

Never send a whole repository or long transcript to a stronger model. Send a capsule containing only:
- goal in <= 3 sentences;
- exact blocker;
- 1-3 relevant snippets or file paths;
- failing test/error excerpt;
- hypotheses already tested;
- one precise question.

Target <= 1,500 words unless a larger capsule is demonstrably necessary.

## 5. Hard quota rules

- Never enable Ultra/multi-agent mode automatically.
- Keep spawned-agent concurrency at 1.
- Never ask a stronger model to re-review a passing solution "just in case".
- Never run broad test suites repeatedly when a targeted test can validate the change.
- Never escalate twice for the same unchanged evidence.
- Astra always requires explicit approval.
- When the quota band is ORANGE or RED, do not auto-escalate.
- When at or below reserve floor, stop before starting optional work.

## 6. Finish criteria

Finish when the requested behavior is implemented and the narrow validation passes. Report:
- what changed;
- tests/checks run;
- whether any stronger model was consulted;
- remaining uncertainty, if any.

Do not spend allowance polishing optional details unless the user asked for them.
