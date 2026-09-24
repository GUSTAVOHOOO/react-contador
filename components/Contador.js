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

  // Texto temporário dos campos: permite digitar valores como "-5" antes do blur.
  const [textoStep, setTextoStep] = useState('1');
  const [textoMinimo, setTextoMinimo] = useState('0');
  const [textoMaximo, setTextoMaximo] = useState('10');

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

  // Handlers de digitação: guardam o texto a cada tecla.
  // O texto temporário permite digitar "-5" antes da normalização no blur.
  function mudarStep(evento) {
    setTextoStep(evento.target.value);
  }

  function mudarMinimo(evento) {
    setTextoMinimo(evento.target.value);
  }

  function mudarMaximo(evento) {
    setTextoMaximo(evento.target.value);
  }

  // Req. 5: ao sair do campo, texto inválido (<= 0 ou não numérico) volta para 1.
  function validarStep() {
    const valor = Number(textoStep);
    const novoStep = Number.isFinite(valor) && valor > 0 ? valor : 1;
    setStep(novoStep);
    setTextoStep(String(novoStep));
  }

  // Req. 6: ao sair do campo, texto do mínimo nunca passa do máximo.
  // Texto vazio ou não numérico usa 0 como fallback seguro.
  // Req. 7: contador é reajustado para dentro do novo intervalo.
  function validarMinimo() {
    const valor = Number(textoMinimo);
    const minimoDigitado = Number.isFinite(valor) ? valor : 0;
    const novoMinimo = Math.min(minimoDigitado, maximo);
    setMinimo(novoMinimo);
    setTextoMinimo(String(novoMinimo));
    setContador(Math.min(Math.max(contador, novoMinimo), maximo));
  }

  // Req. 6: ao sair do campo, texto do máximo nunca fica abaixo do mínimo.
  // Texto vazio ou não numérico usa 0 como fallback seguro.
  // Req. 7: contador é reajustado para dentro do novo intervalo.
  function validarMaximo() {
    const valor = Number(textoMaximo);
    const maximoDigitado = Number.isFinite(valor) ? valor : 0;
    const novoMaximo = Math.max(maximoDigitado, minimo);
    setMaximo(novoMaximo);
    setTextoMaximo(String(novoMaximo));
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
            value={textoStep}
            onChange={mudarStep}
            onBlur={validarStep}
          />
        </label>

        <label>
          Mínimo
          <input
            type="number"
            step="any"
            value={textoMinimo}
            onChange={mudarMinimo}
            onBlur={validarMinimo}
          />
        </label>

        <label>
          Máximo
          <input
            type="number"
            step="any"
            value={textoMaximo}
            onChange={mudarMaximo}
            onBlur={validarMaximo}
          />
        </label>
      </fieldset>
    </main>
  );
}
