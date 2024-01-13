import { html, LitElement, nothing } from 'lit';

import { cssStyles } from './styles.js';
// Componentes
import '@mole/component-button/component-button.js';

export class ViewHome extends LitElement {
  static styles = cssStyles;

  static properties = {
    name: { type: String },
    step: { type: Number },
  };

  constructor() {
    super();
    this.name = null;
    this.step = 0;
  }

  get _inputElement() {
    return this.shadowRoot.getElementById('name');
  }

  get _buttonContinueElement() {
    return this.shadowRoot.getElementById('continue');
  }

  get _secondStepElement() {
    return this.shadowRoot.getElementById('secondStep');
  }

  get _firstStepTemplate() {
    return html`
      <h1>👋 Bienvenido</h1>
      <div id="firstStep">
        <p>Introduce un nombre para empezar a jugar</p>
        <p>Si no sabes que nombre poner, prueba con: "Javi"</p>
        <p>No introduzcas números</p>
        <input
          type="text"
          id="name"
          name="name"
          required
          minlength="4"
          maxlength="20"
          size="10"
          @input="${() => this._onInput()}"
        />
        <component-button id="continue" @click="${() => this.onContinue()}">
          Continuar
        </component-button>
      </div>
    `;
  }

  get _secondStepTemplate() {
    return html`
      <div id="secondStep">
        <h1>😄 Antes de empezar a jugar</h1>
        <p>Porfavor ${this.name}, seleccione un nivel de dificultad</p>
        <p>No te preocupes, podrás cambiarlo después</p>

        <div id="difficultLevel">
          <component-button
            @click="${() => {
              ViewHome._startGame('easy');
            }}"
            id="easy"
            >Fácil</component-button
          >
          <component-button
            @click="${() => {
              ViewHome._startGame('medium');
            }}"
            id="medium"
            >Medio</component-button
          >
          <component-button
            @click="${() => {
              ViewHome._startGame('hard');
            }}"
            id="hard"
            >Difícil</component-button
          >
        </div>
      </div>
    `;
  }

  render() {
    return html`
      ${this.step === 0 ? this._firstStepTemplate : nothing}
      ${this.step === 1 ? this._secondStepTemplate : nothing}
    `;
  }

  /**
   * Fired when user writes on the input
   */
  _onInput() {
    this.name = this._inputElement.value;
  }

  /**
   * Fired when user clicks on the button
   */
  onContinue() {
    this.step = 1;
  }

  /**
   * Fired when user clicks on the button
   * dispatch a custom event (start-game) to start the game
   * @param {String} difficulty
   */
  static _startGame(difficulty) {
    dispatchEvent(
      new CustomEvent('view-home-start-game', { detail: { difficulty } })
    );
  }
}
