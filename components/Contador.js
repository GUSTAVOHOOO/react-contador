'use client';

// Componente client-side: usa estado (useState) e eventos do usuário.
import { useState } from 'react';
import styles from './Contador.module.css';

// Exercício: contador com step e limites (mínimo/máximo) configuráveis.
export default function Contador() {
  // Req. 1: o contador começa em 0.
  const [contador, setContador] = useState(0);

  // Req. 6: limites configuráveis pelo usuário (mínimo sempre <= máximo).
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(10);

  // Req. 5: o step sempre deve ser maior que zero.
  const [step, setStep] = useState(1);

  // Req. 2: soma o step ajustando ao máximo (nunca passa do máximo).
  function incrementar() {
    setContador(Math.min(contador + step, maximo));
  }

  // Req. 3: subtrai o step ajustando ao mínimo (nunca fica abaixo dele).
  function decrementar() {
    setContador(Math.max(contador - step, minimo));
  }

  // Req. 4: reset volta para 0, para o mínimo se ele for maior que 0,
  // ou fica no máximo se todo o intervalo for negativo.
  function resetar() {
    setContador(Math.min(Math.max(0, minimo), maximo));
  }

  // Handlers de digitação: guardam o número digitado.
  // Campo vazio não muda o estado (deixa digitar "-5" com calma).
  function mudarStep(evento) {
    const texto = evento.target.value;
    if (texto !== '') setStep(Number(texto));
  }

  function mudarMinimo(evento) {
    const texto = evento.target.value;
    if (texto !== '') setMinimo(Number(texto));
  }

  function mudarMaximo(evento) {
    const texto = evento.target.value;
    if (texto !== '') setMaximo(Number(texto));
  }

  // Req. 5: ao sair do campo, step inválido (<= 0) volta para 1.
  function validarStep() {
    if (step <= 0) {
      setStep(1);
    }
  }

  // Req. 6: mínimo nunca passa do máximo.
  // Req. 7: contador é reajustado para dentro do novo intervalo.
  function validarMinimo() {
    const novoMinimo = Math.min(minimo, maximo);
    setMinimo(novoMinimo);
    setContador(Math.min(Math.max(contador, novoMinimo), maximo));
  }

  // Req. 6: máximo nunca fica abaixo do mínimo.
  // Req. 7: contador é reajustado para dentro do novo intervalo.
  function validarMaximo() {
    const novoMaximo = Math.max(maximo, minimo);
    setMaximo(novoMaximo);
    setContador(Math.min(Math.max(contador, minimo), novoMaximo));
  }

  return (
    <main className={styles.cartao}>
      <h1>Contador</h1>

      {/* Valor atual do contador em destaque */}
      <p className={styles.valor}>{contador}</p>

      <div className={styles.botoes}>
        {/* Botão desabilita quando o contador já está no mínimo */}
        <button onClick={decrementar} disabled={contador === minimo}>
          - Step
        </button>

        <button onClick={resetar}>Resetar</button>

        {/* Botão desabilita quando o contador já está no máximo */}
        <button onClick={incrementar} disabled={contador === maximo}>
          + Step
        </button>
      </div>

      {/* Req. 6: inputs que tornam o contador dinâmico e configurável */}
      <fieldset className={styles.configuracao}>
        <legend>Configuração</legend>

        <label>
          Step
          <input
            type="number"
            step="any"
            value={step}
            onChange={mudarStep}
            onBlur={validarStep}
          />
        </label>

        <label>
          Mínimo
          <input
            type="number"
            step="any"
            value={minimo}
            onChange={mudarMinimo}
            onBlur={validarMinimo}
          />
        </label>

        <label>
          Máximo
          <input
            type="number"
            step="any"
            value={maximo}
            onChange={mudarMaximo}
            onBlur={validarMaximo}
          />
        </label>
      </fieldset>
    </main>
  );
}
