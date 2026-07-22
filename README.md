# Mímir CLI

**Autonomous coding agent** with 4 roles (Architect, Builder, Inspector, Chronicler).
Works in your terminal with zero setup.

Created by [Uriel Gomez Becerril (@UreckChan)](https://github.com/UreckChan)

---

## Install

```bash
npm install -g mimir-cli
```

No API key required. No account needed. Uses Freebuff + Ollama by default.

## Quick Start

```bash
# Chat mode (conversational)
mimir --goal "Hello! What can you do?"

# Project mode (full 4-role loop)
mimir --goal "Create a CLI tool" --cwd /my/project

# Sidecar mode (for desktop app)
mimir --serve
```

## How it works

Mímir uses 4 specialized agents that work in a loop:

```
▲ Architect   → Plans and breaks down your goal
■ Builder     → Writes code, runs commands
◆ Inspector   → Verifies quality, rejects bad work
● Chronicler  → Saves lessons and generates playbooks
```

### Modes

| Mode | Description |
|---|---|
| Chat | Direct conversational response, no tools |
| Plan | Full loop with detailed planning |
| Build | Optimized loop for coding |

### Failover

If a model fails (quota, rate limit, timeout), it automatically falls back to the next one:

```yaml
1. deepseek/deepseek-v4-flash
2. anthropic/claude-sonnet-5
3. ollama/llama3.2:3b   # free local fallback
```

## CLI Flags

| Flag | Description |
|---|---|
| `--goal` | Your objective |
| `--cwd` | Working directory |
| `--budget` | Max budget in USD |
| `--night` | Night mode (queue goals) |
| `--no-sandbox` | Skip git worktree isolation |
| `--serve` | WebSocket sidecar mode |
| `--port` | Port for sidecar (default 4317) |
| `--setup` | Interactive setup wizard |

## Configuration

### API Keys
Set environment variables or use the desktop Settings panel:

```bash
export ANTHROPIC_API_KEY=sk-...
export OPENAI_API_KEY=sk-...
export DEEPSEEK_API_KEY=sk-...
```

### Terminal Adapters
Choose which CLI the Builder uses to run commands:

| Terminal | Install | Subscription |
|---|---|---|
| Native bash | Always available | No |
| Claude Code | `npm i -g @anthropic-ai/claude-code` | Claude subscription |
| Codex CLI | `npm i -g @openai/codex` | OpenAI |
| OpenCode | `npm i -g opencode` | No |
| Aider | `pip install aider-chat` | No |

### Feature Flags

| Flag | Description |
|---|---|
| Free mode | Freebuff + Ollama, no API keys needed |
| ▲ Architect | Strategic planning agent |
| ■ Builder | Code execution agent |
| ◆ Inspector | Quality verification agent |
| ● Chronicler | Documentation agent |
| Caveman | Ultra-compressed responses (token savings) |
| Memory | Persistent vault with FTS5 search |
| Sandbox | Isolated git worktree with rollback |
| MCP | External MCP server connections |
| Headroom | Long tool output compression |

## Desktop App

Mímir also has a native desktop app with:
- Chat interface with markdown rendering
- Settings panel for API keys and flags
- Real-time streaming responses
- Conversation history
- Dark/light theme

```bash
# Run in browser (dev mode)
mimir --serve
# Open http://localhost:1420
```

### macOS Gatekeeper

The desktop .dmg and .app bundles aren't code-signed yet (no Apple Developer license).
On first launch, macOS will show "Apple could not verify Mímir is free of malware."

To bypass:

**Option 1** — Right-click the .app → Open (works once)

**Option 2** — Remove the quarantine flag:
```bash
xattr -d com.apple.quarantine /Applications/Mímir.app
```

**Option 3** — Install via npm instead (no Gatekeeper):
```bash
npm install -g mimir-cli
mimir --serve
```
Then access the UI at http://localhost:1420 (desktop-like experience in browser).

## Supported Providers

| Provider | Type | Cost |
|---|---|---|
| Freebuff | Cloud | Free (ads) |
| Ollama | Local | Free |
| Anthropic | Cloud | API key |
| OpenAI | Cloud | API key |
| Google | Cloud | API key |
| DeepSeek | Cloud | API key |
| xAI | Cloud | API key |
| Custom | Any | Configurable |

## Platforms

- **macOS** Apple Silicon (arm64)
- **Linux** x86_64
- **Windows** x64

## License

MIT © Uriel Gomez Becerril
