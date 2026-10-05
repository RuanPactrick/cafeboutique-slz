# Quota policy

The local snapshot is user-supplied because Codex skills do not have a documented machine-readable API for the exact Settings > Usage percentages.

Default reserve floors:
- 5-hour remaining: 25%
- weekly remaining: 35%

Bands use the lower of the two remaining percentages:

| Band | Remaining | Behavior |
|---|---:|---|
| GREEN | >= 70% | Luna-first. At most one GPT-6 Sol consultation after a concrete blocker. GPT-6.1 Sol requires a stronger blocker. Astra still requires approval. |
| AMBER | 50-69% or unknown/stale | Luna-first. Non-Luna consultation requires approval. |
| ORANGE | 30-49% | Luna-only by default. Shrink scope, checkpoint, and ask before any stronger model. |
| RED | < 30% or either reserve floor reached | Do not auto-escalate. Stop optional work. Ask before continuing anything that could materially consume allowance. |

The reserve floors are deliberately conservative. Users can edit `.quota-guard/policy.json`.
