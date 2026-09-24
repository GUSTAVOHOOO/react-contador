# Contador com limites e step

Este projeto implementa um contador com incremento, decremento, reset e limites configuráveis. Os inputs de mínimo e máximo tornam o contador dinâmico porque o intervalo pode ser ajustado pelo usuário durante o uso, sem depender de valores fixos no código.

## Como executar

```bash
npm install
npm run dev
```

Abra http://localhost:3000 no navegador.

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

1. Abrir a página: o contador mostra 0.
2. Step 1 e máximo 10: `+` mostra 1, 2 e 3; `-` diminui o contador.
3. Contador 8 e step 5: `+` mostra 10 sem ultrapassar o máximo.
4. Contador 2 e step 5: `-` mostra 0 sem ficar abaixo do mínimo.
5. Resetar: o contador mostra 0.
6. Mínimo 5 e resetar: o contador mostra 5.
7. Step 0 ou -3 e saída do campo: o valor retorna para 1.
8. Mínimo 20 com máximo 10: o mínimo é corrigido para 10 e o contador é ajustado.
9. Máximo -5 com mínimo 0: o máximo é corrigido para 0 e o contador é ajustado.
10. Contador 8 e máximo 3: o contador se torna 3 automaticamente.
