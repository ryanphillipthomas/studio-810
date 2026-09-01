# Sources of truth

One canonical home per concern. Everything else is a mirror, a consumer, or drift.

| Concern | Canonical home | Mirrored where | Handoff mechanism |
|---|---|---|---|
| **Design** | Figma (files listed in [`design/figma.manifest.json`](../design/figma.manifest.json)) | `design/tokens/` in this repo | Design role syncs published Figma variables/components → tokens via the Figma MCP; the drift gate verifies code against the mirror |
| **Tickets** | GitHub Issues in this repository | Run brief artifact (`10-brief.json`) | The `pipeline:build` label fires the pipeline; the Chief derives the brief from the issue body and links the run back on the issue |
| **Development** | This repository, `develop` branch | Run branches (`run/<run-id>`) | Pull requests; human review is the only path to `develop` — bot PRs get inline QA, hand-written PRs get the `pr-review` check |
| **Run state / audit** | `pipeline/runs/<run-id>/` on the run branch, plus the PR itself | GitHub Actions run logs | Each role commits its artifact before handing off |
| **Deployment** | Render, configured by [`render.yaml`](../render.yaml) | PR deploy previews | Per-PR service previews are a dashboard toggle, Off for this repo as of 2026-08-31 by choice; when enabled, the preview URL is recorded in the build report artifact |
| **Distribution** (future: App Store, TestFlight) | To be decided when Apple targets land — will be a single home, documented here first | — | — |

## Rules

1. **Writes go to the canonical home only.** A bot that wants to change a design value changes it in Figma (or escalates to a human who can); it never edits `design/tokens/` directly except through the Design role's sync process.
2. **Mirrors are read-only for consumers.** Code reads tokens from `design/tokens/`; it never defines its own.
3. **A missing fact is a finding, not an invitation.** If the canonical home lacks something a role needs, the role records it in its artifact and escalates — it does not create a shadow copy elsewhere.
4. **Changing a canonical home is a human decision.** Moving tickets off GitHub Issues, deployment off Render, etc. requires updating this document first, by a human-merged PR.

## Design parent/child relationship

The studio810 design system is the **parent**. A sub-application may carry a **child** system that extends it — shared fundamentals, distinct identity — rather than restating it.

- `design/tokens/studio810/` — the parent tokens, extracted from the studio810 Figma foundation.
- `design/tokens/<child>/` — **deltas only**: new `<child>.*` tokens, plus explicit overrides marked `"override": true`. Never a copy of the parent. The directory name is the namespace.
- A child design-system package declares a dependency on `packages/design-studio810` and re-exports what it does not override.

This makes extension mechanically checkable: the drift gate fails any child token that silently redefines a parent path. There are no child layers today — zero is valid, and the check binds the moment one appears.
