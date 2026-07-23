# Mímir el Necio — Documentación generada

> Generada automáticamente desde el código fuente el 2026-07-21.
> No editar manualmente. Las secciones de texto curado están en [MIMIR.md](./MIMIR.md).

---

## Catálogo de modelos

> Extraído de `packages/core/src/model-catalog.ts`. 17 modelos registrados.
> Los precios pueden cambiar según el proveedor. Verifica en la fuente oficial de cada uno.

| Modelo | Proveedor | Tier | Input $/MTok | Output $/MTok | Contexto |
|---|---|---|---|---|---|
| **Qwen3 27B (Ollama local)** | ollama | free | $0 | $0 | 41K |
| **Qwen3 Coder 32B (Ollama local)** | ollama | free | $0 | $0 | 41K |
| **Llama 3.3 8B (Ollama local)** | ollama | free | $0 | $0 | 128K |
| **Buffy (Freebuff)** | freebuff | free | $0 | $0 | 128K |
| **DeepSeek v4 Flash (Freebuff)** | freebuff | free | $0 | $0 | 128K |
| **DeepSeek v4 Flash** | deepseek | cheap | $0.15 | $0.30 | 128K |
| **DeepSeek v4 Pro** | deepseek | cheap | $0.50 | $1.50 | 128K |
| **GPT-5.6 Luna** | openai | cheap | $0.50 | $3.00 | 400K |
| **Gemini 3.1 Flash Lite** | google | cheap | $0.25 | $1.50 | 1000K |
| **Gemini 3.5 Flash** | google | cheap | $0.40 | $2.00 | 1000K |
| **Grok 4.5** | xai | cheap | $0.30 | $0.80 | 500K |
| **Claude Sonnet 5** | anthropic | cheap | $1.50 | $7.50 | 200K |
| **Claude Fable 5** | anthropic | top | $3.00 | $15.00 | 1000K |
| **Claude Opus 4.8** | anthropic | top | $5.00 | $25.00 | 1000K |
| **GPT-5.6 Sol** | openai | top | $5.00 | $30.00 | 1050K |
| **GPT-5.6 Terra** | openai | top | $3.00 | $15.00 | 1000K |
| **Gemini 3.1 Pro** | google | top | $2.00 | $12.00 | 1000K |

## Herramientas del agente

> Definidas en `packages/core/src/tools/index.ts` via `createAgentTools()`. 9 tools registradas.

| Tool | Archivo | Descripción |
|---|---|---|
| **read** | `tools/read.ts` | Lee archivos del proyecto (UTF-8, paths absolutos/relativos) |
| **write** | `tools/write.ts` | Escribe o sobrescribe archivos; crea directorios padre automáticamente |
| **edit** | `tools/edit.ts` | Edición str_replace con detección de ambigüedad y texto no encontrado |
| **bash** | `tools/bash.ts` | Ejecuta comandos en shell con timeout configurable |
| **glob** | `tools/glob.ts` | Búsqueda de archivos por patrón glob (timeout 10s) |
| **grep** | `tools/grep.ts` | Búsqueda de texto con ripgrep en paralelo (máx 250 resultados) |
| **webfetch** | `tools/webfetch.ts` | Fetch a URLs externas (timeout 15s, límite 50KB) |
| **todo** | `tools/todo.ts` | Checklist persistente de pasos; sobrevive reinicios |
| **terminal** | `tools/terminal.ts` | Tool Router — ejecuta comandos via el mejor TerminalAdapter disponible |

## Adaptadores de terminal

> Extraídos de `packages/core/src/terminal-adapters/`. 9 adaptadores.

| Adaptador | Requiere suscripción | Ecosistema |
|---|---|---|
| **Bash nativo** | No | native |
| **Bash persistente** | No | native |
| **OpenHands** | No | python |
| **Claude Code** | Sí | node |
| **OpenCode** | No | node |
| **Aider** | No | python |
| **Gemini CLI** | No | node |
| **Codex CLI** | Sí | node |
| **Goose** | No | node |

## Estructura de paquetes

> 9 paquetes/apps en el monorepo. Archivos fuente contados recursivamente en `src/`.

| Paquete | Path | Archivos fuente | Descripción |
|---|---|---|---|
| **desktop** | `apps/desktop/` | 11 | — |
| **tui** | `apps/tui/` | 6 | — |
| **caveman** | `packages/caveman/` | 12 | — |
| **core** | `packages/core/` | 42 | — |
| **memory** | `packages/memory/` | 7 | — |
| **mimir-cli** | `packages/mimir-cli/` | 0 | Mímir CLI — Autonomous coding agent with 4 roles (Architect, Builder, Inspector, Chronicler) |
| **persona** | `packages/persona/` | 3 | — |
| **roles** | `packages/roles/` | 8 | — |
| **safety** | `packages/safety/` | 12 | — |

**Total:** 9 paquetes, ~101 archivos fuente.

### `core` — exports públicos

| Archivo | Símbolos exportados |
|---|---|
| `auto-setup.ts` | `AvailabilityReport, ProviderProbeResult, InstallResult` |
| `config-paths.ts` | `configDir, vaultDir, settingsPath, priorityListPath` |
| `credentials-env.ts` | `EnvCredentialSource` |
| `events.ts` | `EventBus` |
| `failover.ts` | `ErrorClassification, classifyError` |
| `mcp.ts` | `StdioMcpServerConfig, HttpMcpServerConfig, McpServerConfig, McpConnection, McpBundle` |
| `model-catalog.ts` | `ModelTier, ModelCatalogEntry, TokenUsage, estimateCostUsd, MODEL_CATALOG` |
| `priority-list.ts` | `PriorityListStore` |
| `providers.ts` | `CredentialSource, MissingBaseUrlError, resolveLanguageModel` |
| `router.ts` | `NoModelAvailableError, BudgetExceededError, RouterOptions, ModelRouter, assertWithinBudget` |
| `sandbox.ts` | `GitCommandError, SandboxOptions, WorktreeSandbox` |
| `settings.ts` | `PreferredTerminal, FeatureFlags, PermissionLevel, DEFAULT_FEATURE_FLAGS, SettingsStore` |
| `store.ts` | `Store` |
| `tool-router.ts` | `BASH_ADAPTER, ToolRouter, BenchmarkResult` |
| `types.ts` | `Role, ModelRef, MessagePart, Message, ToolCall, ToolResult, Session, AgentEvent, AgentEventType, CommandResult, TerminalAdapter, PickForGoalOptions … y 2 más` |
| `verify.ts` | `VerifyStep, VerifyResult, detectVerifySteps, summarizeVerifyResults` |
| `view-model.ts` | `LogLine, ViewModel, initialViewModel, reduceEvent, reduceEvents` |

### `roles` — exports públicos

| Archivo | Símbolos exportados |
|---|---|
| `agent.ts` | `CreateRoleAgentOptions, RoleAgentHandle, createRoleAgent` |
| `definitions.ts` | `RoleDefinition, ROLE_DEFINITIONS` |
| `failover-agent.ts` | `FailoverEvent, FailoverListener, CreateFailoverLoopAgentOptions, createFailoverLoopAgent` |
| `loop-agent.ts` | `LoopAgentUsage, LoopAgentRunOptions, LoopAgent, adaptRoleAgent` |
| `loop-factory.ts` | `BuildLoopAgentsOptions, BuiltLoopAgents` |
| `loop.ts` | `VerifyRunner, LoopStatus, LoopResult, LoopAgents, LoopOptions` |
| `prompts.ts` | `buildPlanPrompt, buildStepPrompt, buildReviewPrompt, buildLearnPrompt` |

### `caveman` — exports públicos

| Archivo | Símbolos exportados |
|---|---|
| `code-blocks.ts` | `CodeBlockExtraction, extractCodeBlocks, restoreCodeBlocks` |
| `compress.ts` | `CavemanLevel, CompressResult, compressOutput` |
| `context.ts` | `compressForContext` |
| `dictionary.ts` | `ABBREVIATIONS, applyDictionary` |
| `headroom.ts` | `HeadroomOptions, createHeadroomCompressor, wrapToolSetOutputs` |
| `meter.ts` | `MeterSnapshot, TokenMeter` |
| `original-store.ts` | `OriginalStore` |
| `prompt-cache.ts` | `CacheableSections, buildCacheablePrompt, stableHash, PromptCacheStats, PromptCacheTracker` |
| `recall-tool.ts` | `createRecallTool` |
| `safety.ts` | `needsClarity` |
| `signatures.ts` | `Signature, SourceLanguage, extractSignatures, languageFromExtension` |

### `memory` — exports públicos

| Archivo | Símbolos exportados |
|---|---|
| `anti-repeat.ts` | `RepeatWarning, checkForRepeatedError` |
| `frontmatter.ts` | `FrontmatterValue, Frontmatter, ParsedNote, parseNote, serializeNote, extractWikilinks` |
| `memory.ts` | `MemoryVaultOptions, MemoryVault` |
| `playbook.ts` | `PlaybookSpec, renderPlaybook, findPlaybook` |
| `vault-index.ts` | `SearchOptions, NoteMetaRow, VaultIndex` |
| `vault.ts` | `NoteType, NoteMeta, Note, slugify, CreateNoteInput, Vault` |

### `safety` — exports públicos

| Archivo | Símbolos exportados |
|---|---|
| `backend.ts` | `KeychainBackend` |
| `credentials.ts` | `API_KEY_PROVIDERS, UnsupportedCredentialError, KeychainCredentialSource` |
| `guarded-bash.ts` | `PermissionDeniedError, ConfirmHandler, GuardedBashOptions, createGuardedBashTool` |
| `keychain.ts` | `CommandFinder, selectBackend` |
| `permissions.ts` | `PermissionLevel, PermissionDecision, CommandVerdict, isDestructiveCommand, PermissionGateOptions, PermissionGate` |
| `redactor.ts` | `SecretsProvider, createSecretRedactor, redactToolSetOutputs` |
| `spawn-util.ts` | `RunResult, RunOptions, run` |

### `persona` — exports públicos

| Archivo | Símbolos exportados |
|---|---|
| `predictions.ts` | `PredictionOutcome, Prediction, PredictionNotFoundError, PredictionLog` |
| `system-prompt.ts` | `IDENTITY_SECTION, WORKFLOW_SECTION, GOLDEN_RULE_SECTION, CLOSING_SECTION, CAVEMAN_SECTION, MEMORY_SECTION, HONESTY_METER_SECTION, CUARTO_HOMBRE_SYSTEM_PROMPT, composeInstructions` |

## Clases de error personalizadas

> Extraídas de los source files. 10 clases de error.

| Error | Archivo |
|---|---|
| **AmbiguousMatchError** | `packages/core/src/tools/edit.ts` |
| **BudgetExceededError** | `packages/core/src/router.ts` |
| **GitCommandError** | `packages/core/src/sandbox.ts` |
| **MissingBaseUrlError** | `packages/core/src/providers.ts` |
| **NoModelAvailableError** | `packages/core/src/router.ts` |
| **PathEscapesCwdError** | `packages/core/src/tools/paths.ts` |
| **PermissionDeniedError** | `packages/roles/src/loop-factory.ts` |
| **PredictionNotFoundError** | `packages/persona/src/predictions.ts` |
| **TextNotFoundError** | `packages/core/src/tools/edit.ts` |
| **UnsupportedCredentialError** | `packages/safety/src/credentials.ts` |

---

> Generado el 2026-07-21 desde SHA `8c48afe`.
> Documentación completa (texto curado): [MIMIR.md](./MIMIR.md).
