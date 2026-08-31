# design/tokens/

The in-repo mirror of the published Figma variables. **Read-only for everyone except the Design role's sync process** — see [`docs/sources-of-truth.md`](../../docs/sources-of-truth.md).

- `studio810/tokens.json` — the parent design system, extracted from the studio810 foundation Figma file.
- `connect/tokens.json` — Connect's **deltas only**: additions under the `connect.*` namespace, and explicit overrides of parent paths marked `"override": true`. Copying parent values here is drift.

Format: nested token groups; each leaf is `{ "value": <string|number>, "type": "<color|dimension|fontFamily|fontSize|radius|...>" }`. Connect overrides add `"override": true` and `"overrides": "<studio810 token path>"`.

Both files start as placeholders. The first Design-role task is extracting the real values from the Figma files in [`figma.manifest.json`](../figma.manifest.json) (once its `fileKey` fields are filled in) and stamping `sync.lastSync`. The drift gate's raw-value scan uses these files as its whitelist, so extraction precedes any app build.
