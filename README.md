# BPS Console

Static portal shell for `brain.seekorigin.ai`.

## What this is

This repo is the first deployable frame for a personal operations dashboard:

- one entrance for focus / brainwaves
- one entrance for BuilderPulse and news
- one entrance for analytics and user journey surfaces
- one entrance for monitoring, schedules, and future automations
- one place to keep expanding into a real control console

## Why static first

The first goal is deployment speed and structural clarity.

This version avoids framework and backend lock-in so the shell can ship first.
The next iteration can add auth, APIs, and task execution without rewriting the information architecture.

## File layout

- `index.html`: shell and module layout
- `styles.css`: visual system
- `app.js`: module registry, pinning, search, and built-in brainwave audio

## Future upgrades

1. auth gate for private entrances
2. schedule/task execution center
3. API-backed revenue / analytics / keyword cards
4. persistent personalized layouts
