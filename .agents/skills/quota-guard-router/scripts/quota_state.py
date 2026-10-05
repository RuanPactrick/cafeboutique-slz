#!/usr/bin/env python3
import argparse, json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path.cwd() / ".quota-guard"
STATE = ROOT / "state.json"


def load():
    if not STATE.exists():
        return None
    return json.loads(STATE.read_text(encoding="utf-8"))


def save(five, weekly):
    ROOT.mkdir(parents=True, exist_ok=True)
    data = {
        "five_hour_remaining": five,
        "weekly_remaining": weekly,
        "captured_at": datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
        "source": "manual"
    }
    STATE.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return data


def band(data):
    if not data:
        return "AMBER (unknown)"
    low = min(data["five_hour_remaining"], data["weekly_remaining"])
    if data["five_hour_remaining"] <= 25 or data["weekly_remaining"] <= 35:
        return "RED (reserve floor)"
    if low >= 70:
        return "GREEN"
    if low >= 50:
        return "AMBER"
    if low >= 30:
        return "ORANGE"
    return "RED"

p = argparse.ArgumentParser(description="Record/show Quota Guard allowance snapshots")
sub = p.add_subparsers(dest="cmd", required=True)
s = sub.add_parser("set")
s.add_argument("--five-hour", type=int, required=True, choices=range(0,101), metavar="0..100")
s.add_argument("--weekly", type=int, required=True, choices=range(0,101), metavar="0..100")
sub.add_parser("show")
a = p.parse_args()

if a.cmd == "set":
    d = save(a.five_hour, a.weekly)
else:
    d = load()

if not d:
    print("Quota state: unknown (AMBER policy applies)")
else:
    print(f"5-hour remaining: {d['five_hour_remaining']}%")
    print(f"Weekly remaining: {d['weekly_remaining']}%")
    print(f"Captured: {d['captured_at']}")
    print(f"Band: {band(d)}")
