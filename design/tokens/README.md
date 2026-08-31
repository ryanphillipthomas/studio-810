# design/tokens/

The in-repo mirror of the published Figma variables. **Read-only for everyone except the Design role's sync process** — see [`docs/sources-of-truth.md`](../../docs/sources-of-truth.md).

- `studio810/tokens.json` — the parent design system, extracted from the studio810 foundation Figma file.
- `<child>/tokens.json` — a child layer's **deltas only**: additions under that directory's own `<child>.*` namespace, and explicit overrides of parent paths marked `"override": true`. Copying parent values here is drift. There are no child layers today; the directory name is the namespace when one lands.

Format: nested token groups; each leaf is `{ "value": <string|number>, "type": "<color|dimension|fontFamily|fontSize|radius|...>" }`. Child overrides add `"override": true` and `"overrides": "<studio810 token path>"`.

Values come from the Figma files in [`figma.manifest.json`](../figma.manifest.json); the Design role extracts them and stamps `sync.lastSync` at sync time. The drift gate's raw-value scan uses these files as its whitelist, so extraction precedes any app build.
