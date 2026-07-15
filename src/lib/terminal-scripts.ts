export type TerminalLineStyle = 'prompt' | 'tool' | 'result' | 'check' | 'success';

export interface TerminalLine {
  text: string;
  style: TerminalLineStyle;
}

type TerminalScript = TerminalLine[];

const es: TerminalScript[] = [
  // 1. Auditando el CV
  [
    { text: '$ claude "revisa este CV antes de publicarlo"', style: 'prompt' },
    { text: '⏺ Read(cv.json)', style: 'tool' },
    { text: '⎿ 5 proyectos · 0 alucinaciones', style: 'result' },
    { text: '⏺ Bash(pnpm build)', style: 'tool' },
    { text: '⎿ ✓ Compiled successfully', style: 'result' },
    { text: '⏺ Verificando honestidad del argumento...', style: 'tool' },
    { text: '⎿ ✓ Todo verificable en producción', style: 'result' },
    { text: '✓ Listo para publicar', style: 'success' },
  ],
  // 2. Origen de NeoNexAI
  [
    { text: '$ claude "automatiza mis tareas repetitivas"', style: 'prompt' },
    { text: '⏺ Read(gestion-documental.xlsx)', style: 'tool' },
    { text: '⎿ 2 horas detectadas', style: 'result' },
    { text: '⏺ Write(agente.py)', style: 'tool' },
    { text: '⎿ 1 agente de IA creado', style: 'result' },
    { text: '⏺ Bash(python agente.py)', style: 'tool' },
    { text: '⎿ ✓ Completado en 5 min', style: 'result' },
    { text: '✓ Así empezó todo', style: 'success' },
  ],
  // 3. Loop Engineering
  [
    { text: '$ claude "hazlo, verifícalo, itera"', style: 'prompt' },
    { text: '✅ Diseñar arquitectura', style: 'check' },
    { text: '✅ Escribir el código', style: 'check' },
    { text: '✅ Autoevaluar el resultado', style: 'check' },
    { text: '✅ Iterar hasta que esté limpio', style: 'check' },
    { text: '✓ Humano al mando. Resultado entregado.', style: 'success' },
  ],
  // 4. whoami
  [
    { text: '$ whoami', style: 'prompt' },
    { text: 'jonatan@neonexai — Agentic Developer', style: 'result' },
    { text: '$ cat manifiesto.txt', style: 'prompt' },
    { text: 'No vendo magia de IA — vendo sistemas', style: 'result' },
    { text: 'que se pueden auditar, verificar y repetir.', style: 'result' },
    { text: '$ ./construir_web.sh', style: 'prompt' },
    { text: '✓ jonni-ai.com desplegado', style: 'success' },
  ],
  // 5. Deploy en vivo
  [
    { text: '$ claude "despliega jonni-ai.com"', style: 'prompt' },
    { text: '⏺ Bash(git push origin main)', style: 'tool' },
    { text: '⎿ ✓ 1 commit pusheado', style: 'result' },
    { text: '⏺ Bash(coolify deploy --force)', style: 'tool' },
    { text: '⎿ ✓ Build finished', style: 'result' },
    { text: '⏺ Bash(curl -I https://jonni-ai.com)', style: 'tool' },
    { text: '⎿ ✓ 200 OK', style: 'result' },
    { text: '✓ En producción, verificado', style: 'success' },
  ],
  // 6. Cero alucinaciones
  [
    { text: '$ claude "resume mi experiencia sin exagerar"', style: 'prompt' },
    { text: '⏺ Buscando adjetivos vacíos...', style: 'tool' },
    { text: '⎿ 0 encontrados', style: 'result' },
    { text: '⏺ Verificando cada dato contra la realidad...', style: 'tool' },
    { text: '⎿ 100% comprobable', style: 'result' },
    { text: '✓ Honestidad: aprobada', style: 'success' },
  ],
  // 7. Orquestando el equipo
  [
    { text: '$ claude "cierra el sprint de esta semana"', style: 'prompt' },
    { text: '⏺ Task(CEO Agent)', style: 'tool' },
    { text: '⎿ Delegando a 4 subagentes especializados', style: 'result' },
    { text: '⏺ Task(CTO Agent) → deploy verificado', style: 'tool' },
    { text: '⏺ Task(CMO Agent) → contenido revisado', style: 'tool' },
    { text: '⏺ Task(CFO Agent) → cierre financiero', style: 'tool' },
    { text: '✓ Equipo coordinado, cero fricción', style: 'success' },
  ],
];

const en: TerminalScript[] = [
  // 1. Auditing the CV
  [
    { text: '$ claude "review this CV before publishing"', style: 'prompt' },
    { text: '⏺ Read(cv.json)', style: 'tool' },
    { text: '⎿ 5 projects · 0 hallucinations', style: 'result' },
    { text: '⏺ Bash(pnpm build)', style: 'tool' },
    { text: '⎿ ✓ Compiled successfully', style: 'result' },
    { text: '⏺ Checking the honesty of the pitch...', style: 'tool' },
    { text: '⎿ ✓ Everything verifiable in production', style: 'result' },
    { text: '✓ Ready to publish', style: 'success' },
  ],
  // 2. Where NeoNexAI started
  [
    { text: '$ claude "automate my repetitive tasks"', style: 'prompt' },
    { text: '⏺ Read(document-management.xlsx)', style: 'tool' },
    { text: '⎿ 2 hours detected', style: 'result' },
    { text: '⏺ Write(agent.py)', style: 'tool' },
    { text: '⎿ 1 AI agent created', style: 'result' },
    { text: '⏺ Bash(python agent.py)', style: 'tool' },
    { text: '⎿ ✓ Done in 5 min', style: 'result' },
    { text: "✓ That's where it all started", style: 'success' },
  ],
  // 3. Loop Engineering
  [
    { text: '$ claude "do it, verify it, iterate"', style: 'prompt' },
    { text: '✅ Design the architecture', style: 'check' },
    { text: '✅ Write the code', style: 'check' },
    { text: '✅ Self-evaluate the result', style: 'check' },
    { text: "✅ Iterate until it's clean", style: 'check' },
    { text: '✓ Human in the loop. Result delivered.', style: 'success' },
  ],
  // 4. whoami
  [
    { text: '$ whoami', style: 'prompt' },
    { text: 'jonatan@neonexai — Agentic Developer', style: 'result' },
    { text: '$ cat manifesto.txt', style: 'prompt' },
    { text: "I don't sell AI magic — I sell systems", style: 'result' },
    { text: 'you can audit, verify and repeat.', style: 'result' },
    { text: '$ ./build_site.sh', style: 'prompt' },
    { text: '✓ jonni-ai.com deployed', style: 'success' },
  ],
  // 5. Live deploy
  [
    { text: '$ claude "deploy jonni-ai.com"', style: 'prompt' },
    { text: '⏺ Bash(git push origin main)', style: 'tool' },
    { text: '⎿ ✓ 1 commit pushed', style: 'result' },
    { text: '⏺ Bash(coolify deploy --force)', style: 'tool' },
    { text: '⎿ ✓ Build finished', style: 'result' },
    { text: '⏺ Bash(curl -I https://jonni-ai.com)', style: 'tool' },
    { text: '⎿ ✓ 200 OK', style: 'result' },
    { text: '✓ In production, verified', style: 'success' },
  ],
  // 6. Zero hallucinations
  [
    { text: '$ claude "summarize my experience without exaggerating"', style: 'prompt' },
    { text: '⏺ Searching for empty adjectives...', style: 'tool' },
    { text: '⎿ 0 found', style: 'result' },
    { text: '⏺ Checking every fact against reality...', style: 'tool' },
    { text: '⎿ 100% verifiable', style: 'result' },
    { text: '✓ Honesty: approved', style: 'success' },
  ],
  // 7. Orchestrating the team
  [
    { text: '$ claude "close out this week\'s sprint"', style: 'prompt' },
    { text: '⏺ Task(CEO Agent)', style: 'tool' },
    { text: '⎿ Delegating to 4 specialized subagents', style: 'result' },
    { text: '⏺ Task(CTO Agent) → deploy verified', style: 'tool' },
    { text: '⏺ Task(CMO Agent) → content reviewed', style: 'tool' },
    { text: '⏺ Task(CFO Agent) → books closed', style: 'tool' },
    { text: '✓ Team coordinated, zero friction', style: 'success' },
  ],
];

export const TERMINAL_SCRIPTS = { es, en };
