# Contador com limites e step

Este projeto implementa um contador com incremento, decremento, reinício e limites configuráveis. Os campos de mínimo e máximo tornam o contador dinâmico porque o intervalo pode ser ajustado pelo usuário durante o uso, sem depender de valores fixos no código.

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
| 2 | `incrementar` soma o valor do incremento (`step`) sem ultrapassar o máximo. |
| 3 | `decrementar` subtrai o valor do incremento (`step`) sem ficar abaixo do mínimo. |
| 4 | `resetar` faz o reinício do contador para zero ou para o limite aplicável. |
| 5 | `validarStep` garante que o valor do incremento (`step`) seja maior que zero. |
| 6 | `validarMinimo` e `validarMaximo` mantêm os limites consistentes. |
| 7 | O ajuste automático mantém o contador dentro do novo intervalo. |

A validação dos campos de `step`, mínimo e máximo ocorre no evento `onBlur`, quando o usuário sai do campo.

## Checklist manual

1. Abrir a página: o contador mostra 0.
2. Com `step` igual a 1 e máximo 10: `+` mostra 1, 2 e 3; `-` diminui o contador.
3. Contador 8 e `step` igual a 5: `+` mostra 10 sem ultrapassar o máximo.
4. Contador 2 e `step` igual a 5: `-` mostra 0 sem ficar abaixo do mínimo.
5. `resetar`: o contador mostra 0.
6. Informe mínimo 5, saia do campo e use `resetar`: o contador mostra 5.
7. Informe `step` 0 ou -3 e saia do campo: o valor retorna para 1.
8. Com máximo 10, informe mínimo 20 e saia do campo: o mínimo é corrigido para 10 e o contador é ajustado.
9. Com mínimo 0, informe máximo -5 e saia do campo: o máximo é corrigido para 0 e o contador é ajustado.
10. Com contador 8, informe máximo 3 e saia do campo: o contador se torna 3 automaticamente.
