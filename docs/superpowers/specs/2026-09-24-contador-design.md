# Design — Contador com limites e step

- **Data:** 2026-09-24
- **Status:** Aprovado pelo usuário
- **Projeto:** `react-contador` (pasta do exercício)

## 1. Objetivo

Exercício de faculdade: componente React de contador com controle completo —
incrementar, decrementar, resetar, step configurável e limites mínimo/máximo
configuráveis, com validação automática. Os inputs de mínimo e máximo existem
para tornar o contador dinâmico: o próprio usuário define o intervalo sem
precisar alterar código.

**Meta de qualidade:** código simples, muito bem auditável e fácil de
compreender. Cada requisito do enunciado mapeia para uma função específica,
com comentário curto em português indicando o requisito correspondente.

## 2. Decisões (aprovadas pelo usuário)

| Decisão | Escolha |
|---|---|
| Comportamento nos limites | Ajustar ao limite (contador 8 + step 5, máx 10 → vira 10; nunca bloquear) |
| Estilo | CSS Modules (padrão Next.js) |
| Comentários | Sim, curtos, em português, apontando o requisito |
| Arquitetura | Componente único com `useState` (sem `useReducer`, sem hooks customizados, sem `useEffect`) |
| Stack | Next.js (App Router) com JavaScript — sem TypeScript, sem Tailwind |

## 3. Arquivos

| Arquivo | Papel |
|---|---|
| `app/page.js` | Página inicial; apenas renderiza `<Contador />` |
| `app/layout.js` | Layout do Next.js; título da aba "Contador" |
| `app/globals.css` | Reset mínimo |
| `components/Contador.js` | Componente completo do exercício (~80 linhas comentadas) |
| `components/Contador.module.css` | Estilos: cartão centralizado, número grande, botões, fieldset "Configuração" |
| `README.md` | Enunciado + explicação + checklist de testes manuais (requisito → comportamento esperado → onde no código) |

Scaffold via `create-next-app`: JavaScript, App Router, sem Tailwind, sem
`src/`, com ESLint.

## 4. Estado (`useState`)

| Estado | Tipo | Valor inicial | Regra |
|---|---|---|---|
| `contador` | number | `0` | Req. 1 — começa em 0 |
| `minimo` | number | `0` | Req. 6 — sempre ≤ `maximo` |
| `maximo` | number | `10` | Req. 6 — sempre ≥ `minimo` |
| `step` | number | `1` | Req. 5 — sempre > 0 |

## 5. Funções e regras

Cada função nomeada corresponde a um requisito e carrega comentário próprio:

- `incrementar()` — **Req. 2:** `Math.min(contador + step, maximo)`.
  Soma o step ajustando ao máximo, sem passar dele.
- `decrementar()` — **Req. 3:** `Math.max(contador - step, minimo)`.
  Subtrai o step ajustando ao mínimo, sem ir abaixo dele.
- `resetar()` — **Req. 4:** `Math.max(0, minimo)`.
  Volta para 0, ou para o mínimo quando o mínimo for maior que 0.
- `validarStep()` — **Req. 5** (`onBlur` do input de step):
  se `step <= 0`, volta para `1`.
- `validarMinimo()` — **Reqs. 6 e 7** (`onBlur` do input de mínimo):
  `novoMinimo = Math.min(minimo, maximo)`; aplica `novoMinimo` e reajusta o
  contador ao intervalo `[novoMinimo, maximo]`.
- `validarMaximo()` — **Reqs. 6 e 7** (`onBlur` do input de máximo):
  `novoMaximo = Math.max(maximo, minimo)`; aplica `novoMaximo` e reajusta o
  contador ao intervalo `[minimo, novoMaximo]`.
- `mudarStep`, `mudarMinimo`, `mudarMaximo` — handlers de digitação
  (`onChange`): apenas convertem o valor com `Number()`. A validação fica no blur.

**Por que validar no `onBlur`:** o blur dispara quando o usuário sai do campo.
Validar ali evita sobrescrever o valor no meio da digitação (ex.: ao digitar
"15", o "1" provisório não é corrigido). Como clicar em um botão dispara o
blur antes do clique, as ações sempre usam valores já validados. Campo
limpado vira `Number('') = 0` e é corrigido no blur pela regra correspondente.

**Por que handlers explícitos (sem `useEffect`):** cada função de validação
calcula o valor corrigido e chama os `setState` em sequência — leitura linear
de cima a baixo, sem closures desatualizadas e sem conceitos extras.

## 6. Interface (UI)

- `<h1>Contador</h1>` e o valor do contador em destaque (número grande).
- Botões:
  - `− Step` — desabilitado quando `contador === minimo`;
  - `Resetar`;
  - `+ Step` — desabilitado quando `contador === maximo`.
- `<fieldset>` "Configuração" com três `<label>` + `<input type="number">`
  (com atributo `step="any"`, que aceita decimais e evita que o navegador
  marque o campo como inválido): Step, Mínimo, Máximo.
- Todos os textos em português.

## 7. Mapa requisito → código (auditabilidade)

| # | Requisito do enunciado | Onde está no código |
|---|---|---|
| 1 | Contador começa em 0 | `useState(0)` de `contador` |
| 2 | Soma o step sem passar do máximo | `incrementar()` |
| 3 | Subtrai o step sem ir abaixo do mínimo | `decrementar()` |
| 4 | Reset para 0 (ou mínimo, se mínimo > 0) | `resetar()` |
| 5 | Step numérico > 0 | `validarStep()` |
| 6 | Limites configuráveis com mín ≤ máx | fieldset "Configuração" + `validarMinimo()` / `validarMaximo()` |
| 7 | Ajuste automático do contador fora do intervalo | reajuste dentro de `validarMinimo()` / `validarMaximo()` |

## 8. Fora do escopo (YAGNI)

TypeScript, Tailwind, testes automatizados, persistência (localStorage),
acessibilidade além do HTML semântico nativo, deploy.

## 9. Verificação

1. `npm run build` passa sem erros.
2. `npm run dev` + checklist manual (também vai no README):
   - Abrir a página → contador mostra **0**.
   - Step 1, máx 10: clicar `+` → 1, 2, 3...; clicar `−` → volta.
   - Contador 8, step 5, clicar `+` → **10** (ajusta ao máximo, não passa).
   - Contador 2, step 5, clicar `−` → **0** (ajusta ao mínimo).
   - `Resetar` → **0**.
   - Mín = 5, `Resetar` → **5** (mínimo > 0).
   - Step = 0 ou −3, sair do campo → volta para **1**.
   - Mín = 20 (máx 10) → mínimo corrigido para **10**; contador reajustado.
   - Máx = −5 (mín 0) → máximo corrigido para **0**; contador reajustado.
   - Contador 8, mudar máx para 3 → contador vira **3** (req. 7).
