/**
 * Guiones del terminal del hero. Cada guion es una secuencia de eventos que el
 * motor de TerminalIntro reproduce en directo:
 *  - cmd:  se teclea char a char tras el prompt C:\Users\Jonatan&Claude>
 *  - work: arranca el spinner estilo Claude Code (verbo + tokens + esc to interrupt)
 *  - tool: línea de tool call `⏺ Tool(args)`
 *  - out:  resultado indentado `⎿`
 *  - txt:  salida plana de terminal (sin marcador)
 *  - ok:   línea final `✓` — apaga el spinner
 */

export type TermLine =
  | { t: 'cmd'; text: string }
  | { t: 'work'; verb: string }
  | { t: 'tool'; text: string }
  | { t: 'out'; text: string }
  | { t: 'txt'; text: string }
  | { t: 'ok'; text: string };

export type TermScript = TermLine[];

const es: TermScript[] = [
  // 1. Auditando el CV
  [
    { t: 'cmd', text: 'claude -p "audita el CV antes del deploy"' },
    { t: 'work', verb: 'Clauding' },
    { t: 'tool', text: 'Read(src/lib/cv/content.ts)' },
    { t: 'out', text: '214 líneas · 5 proyectos · 0 alucinaciones' },
    { t: 'tool', text: 'Bash(pnpm tsc --noEmit && pnpm build)' },
    { t: 'out', text: '✓ Compiled successfully in 12.5s' },
    { t: 'ok', text: 'CV 100% verificable — listo para producción' },
  ],
  // 2. Origen de NeoNexAI
  [
    { t: 'cmd', text: 'claude -p "automatiza la gestión documental"' },
    { t: 'work', verb: 'Cooking' },
    { t: 'tool', text: 'Read(gestion_documental.xlsx)' },
    { t: 'out', text: 'tarea manual detectada: 2 h/día' },
    { t: 'tool', text: 'Write(agente.py) · 148 líneas' },
    { t: 'tool', text: 'Bash(python agente.py --run)' },
    { t: 'out', text: 'done in 4m 52s — antes: 2 h' },
    { t: 'ok', text: 'Primer agente en producción. Así empezó NeoNexAI.' },
  ],
  // 3. Loop Engineering
  [
    { t: 'cmd', text: 'claude -p "implementa, verifica e itera hasta que pase"' },
    { t: 'work', verb: 'Reticulando splines' },
    { t: 'tool', text: 'TodoWrite(4 tareas)' },
    { t: 'out', text: '☒ arquitectura  ☒ código  ☒ tests  ☒ self-review' },
    { t: 'tool', text: 'Bash(pnpm test)' },
    { t: 'out', text: '34 passed, 0 failed (3.2s)' },
    { t: 'ok', text: 'Loop cerrado. Humano al mando, máquina al teclado.' },
  ],
  // 4. whoami
  [
    { t: 'cmd', text: 'whoami' },
    { t: 'txt', text: 'neonexai\\jonatan — ingeniero industrial → agentic developer' },
    { t: 'cmd', text: 'type manifiesto.txt' },
    { t: 'txt', text: 'No vendo magia de IA — vendo sistemas auditables,' },
    { t: 'txt', text: 'verificables y repetibles.' },
    { t: 'cmd', text: 'claude -p "a trabajar"' },
    { t: 'work', verb: 'Vibing' },
    { t: 'ok', text: 'Sistemas en producción > promesas en slides.' },
  ],
  // 5. Deploy en vivo
  [
    { t: 'cmd', text: 'claude -p "despliega jonni-ai.com a producción"' },
    { t: 'work', verb: 'Shipping' },
    { t: 'tool', text: 'Bash(git push origin main)' },
    { t: 'out', text: '1d4b3f3..d197535  main -> main' },
    { t: 'tool', text: 'Bash(POST coolify/api/v1/deploy?force=true)' },
    { t: 'out', text: 'queued → building → finished (2m 3s)' },
    { t: 'tool', text: 'Bash(curl -I https://jonni-ai.com)' },
    { t: 'out', text: 'HTTP/2 200 · TTFB 89 ms' },
    { t: 'ok', text: 'En producción. Verificado, no prometido.' },
  ],
  // 6. Cero alucinaciones
  [
    { t: 'cmd', text: 'claude -p "resume mi experiencia sin inventar nada"' },
    { t: 'work', verb: 'Deliberando' },
    { t: 'tool', text: 'Grep("revolucionario|disruptivo|sinergia")' },
    { t: 'out', text: '0 matches — cero humo' },
    { t: 'tool', text: 'Verify(claims → producción)' },
    { t: 'out', text: '12/12 con URL o commit verificable' },
    { t: 'ok', text: 'Honestidad: PASS · Hype: 404 Not Found' },
  ],
  // 7. Orquestando el equipo
  [
    { t: 'cmd', text: 'claude -p "CEO: cierra el sprint de la semana"' },
    { t: 'work', verb: 'Orquestando' },
    { t: 'tool', text: 'Task(CEO Agent → 4 subagentes en paralelo)' },
    { t: 'out', text: 'cto: deploy verificado · 200 OK' },
    { t: 'out', text: 'cmo: 3 drafts → cola HITL' },
    { t: 'out', text: 'cfo: cierre mensual ✓ · runway actualizado' },
    { t: 'out', text: 'qa: 34/34 tests · 0 regresiones' },
    { t: 'ok', text: 'Sprint cerrado. 1 humano, N agentes.' },
  ],
];

const en: TermScript[] = [
  // 1. Auditing the CV
  [
    { t: 'cmd', text: 'claude -p "audit the CV before deploying"' },
    { t: 'work', verb: 'Clauding' },
    { t: 'tool', text: 'Read(src/lib/cv/content.ts)' },
    { t: 'out', text: '214 lines · 5 projects · 0 hallucinations' },
    { t: 'tool', text: 'Bash(pnpm tsc --noEmit && pnpm build)' },
    { t: 'out', text: '✓ Compiled successfully in 12.5s' },
    { t: 'ok', text: 'CV 100% verifiable — production ready' },
  ],
  // 2. Where NeoNexAI started
  [
    { t: 'cmd', text: 'claude -p "automate the document management"' },
    { t: 'work', verb: 'Cooking' },
    { t: 'tool', text: 'Read(document_management.xlsx)' },
    { t: 'out', text: 'manual task detected: 2 h/day' },
    { t: 'tool', text: 'Write(agent.py) · 148 lines' },
    { t: 'tool', text: 'Bash(python agent.py --run)' },
    { t: 'out', text: 'done in 4m 52s — was: 2 h' },
    { t: 'ok', text: 'First agent in production. That is how NeoNexAI started.' },
  ],
  // 3. Loop Engineering
  [
    { t: 'cmd', text: 'claude -p "implement, verify and iterate until it passes"' },
    { t: 'work', verb: 'Reticulating splines' },
    { t: 'tool', text: 'TodoWrite(4 tasks)' },
    { t: 'out', text: '☒ architecture  ☒ code  ☒ tests  ☒ self-review' },
    { t: 'tool', text: 'Bash(pnpm test)' },
    { t: 'out', text: '34 passed, 0 failed (3.2s)' },
    { t: 'ok', text: 'Loop closed. Human in charge, machine on the keyboard.' },
  ],
  // 4. whoami
  [
    { t: 'cmd', text: 'whoami' },
    { t: 'txt', text: 'neonexai\\jonatan — industrial engineer → agentic developer' },
    { t: 'cmd', text: 'type manifesto.txt' },
    { t: 'txt', text: "I don't sell AI magic — I sell systems you can audit," },
    { t: 'txt', text: 'verify and repeat.' },
    { t: 'cmd', text: 'claude -p "let\'s get to work"' },
    { t: 'work', verb: 'Vibing' },
    { t: 'ok', text: 'Systems in production > promises in slides.' },
  ],
  // 5. Live deploy
  [
    { t: 'cmd', text: 'claude -p "deploy jonni-ai.com to production"' },
    { t: 'work', verb: 'Shipping' },
    { t: 'tool', text: 'Bash(git push origin main)' },
    { t: 'out', text: '1d4b3f3..d197535  main -> main' },
    { t: 'tool', text: 'Bash(POST coolify/api/v1/deploy?force=true)' },
    { t: 'out', text: 'queued → building → finished (2m 3s)' },
    { t: 'tool', text: 'Bash(curl -I https://jonni-ai.com)' },
    { t: 'out', text: 'HTTP/2 200 · TTFB 89 ms' },
    { t: 'ok', text: 'In production. Verified, not promised.' },
  ],
  // 6. Zero hallucinations
  [
    { t: 'cmd', text: 'claude -p "summarize my experience without making anything up"' },
    { t: 'work', verb: 'Deliberating' },
    { t: 'tool', text: 'Grep("game-changing|disruptive|synergy")' },
    { t: 'out', text: '0 matches — zero hype' },
    { t: 'tool', text: 'Verify(claims → production)' },
    { t: 'out', text: '12/12 with a verifiable URL or commit' },
    { t: 'ok', text: 'Honesty: PASS · Hype: 404 Not Found' },
  ],
  // 7. Orchestrating the team
  [
    { t: 'cmd', text: 'claude -p "CEO: close out this week\'s sprint"' },
    { t: 'work', verb: 'Orchestrating' },
    { t: 'tool', text: 'Task(CEO Agent → 4 subagents in parallel)' },
    { t: 'out', text: 'cto: deploy verified · 200 OK' },
    { t: 'out', text: 'cmo: 3 drafts → HITL queue' },
    { t: 'out', text: 'cfo: monthly close ✓ · runway updated' },
    { t: 'out', text: 'qa: 34/34 tests · 0 regressions' },
    { t: 'ok', text: 'Sprint closed. 1 human, N agents.' },
  ],
];

export const TERMINAL_SCRIPTS = { es, en };
