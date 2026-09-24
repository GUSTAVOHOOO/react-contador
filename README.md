# Contador com limites e step

Este projeto implementa um contador com incremento, decremento, reset e limites configuráveis. Os inputs de mínimo e máximo tornam o contador dinâmico porque o intervalo pode ser ajustado pelo usuário durante o uso, sem depender de valores fixos no código.

## Como executar

```bash
npm install
npm run dev
```

## Requisitos e implementação

| Requisito | Implementação em `components/Contador.js` |
| --- | --- |
| 1 | `useState(0)` inicia o contador em zero. |
| 2 | `incrementar` soma o step sem ultrapassar o máximo. |
| 3 | `decrementar` subtrai o step sem ficar abaixo do mínimo. |
| 4 | `resetar` retorna o contador para zero ou para o limite aplicável. |
| 5 | `validarStep` garante que o step seja maior que zero. |
| 6 | `validarMinimo` e `validarMaximo` mantêm os limites consistentes. |
| 7 | O clamp automático reajusta o contador para dentro do novo intervalo. |

A validação dos campos de step, mínimo e máximo roda no evento `onBlur`, quando o usuário sai do campo.

## Checklist manual

1. initial 0
2. step 1/max 10 increment and decrement
3. count 8 step 5 plus => 10
4. count 2 step 5 minus => 0
5. reset => 0
6. min 5 reset => 5
7. step 0 or -3 blur => 1
8. min 20 with max 10 => min 10 and count adjusted
9. max -5 with min 0 => max 0 and count adjusted
10. count 8 max 3 => count 3
