import { html, LitElement, nothing } from 'lit';
import { cssStyles } from './styles.js';

// Components
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
      <div id="firstStep" class="card">
        <div class="description">
          <p>
            ¿Qué? ¿De qué va esto? Te explico... Has sido seleccionado para
            EXTERMINAR la plaga de topos que se encuentra campando a sus
            anchas...
          </p>
          <p>
            Para ello, tendrás que demostrar que eres el mejor cazador de topos.
            ¿Cómo? Sencillo, cazando topos, simplemente cuando veas uno haz
            click en él y listo.
          </p>
          <p>
            Pero para ello antes debes decirnos cual es tu nombre, como buen
            exterminador de topos, necesitamos procesar tu licencia...
          </p>
          <label for="name">Por favor, introduce tu nombre:</label>
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
        </div>
        <component-button id="continue" @click="${() => this.onContinue()}">
          Continuar
        </component-button>
      </div>
    `;
  }

  _goBack() {
    this.step = 0;
  }

  get _secondStepTemplate() {
    return html`
      <h1>😄 Antes de empezar a jugar</h1>
      <div id="secondStep" class="card">
        <div class="description">
          <p>
            Perfecto ${this.name}, parece que todo está en orden... Ahora
            necesitamos que entres en nuestro campo de entrenamiento, ya sabes
            las reglas, la puntuación solo depende de ti.
          </p>
          <p>¡Buena suerte!</p>
        </div>
        <div>
          <component-button @click="${this._goBack}" id="goBack"
            >Volver</component-button
          >
          <div id="difficultLevel">
            <component-button
              @click="${() => {
                this._startGame('easy');
              }}"
              id="easy"
              >Fácil</component-button
            >
            <component-button
              @click="${() => {
                this._startGame('medium');
              }}"
              id="medium"
              >Medio</component-button
            >
            <component-button
              @click="${() => {
                this._startGame('hard');
              }}"
              id="hard"
              >Difícil</component-button
            >
          </div>
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
  _startGame(difficulty) {
    dispatchEvent(
      new CustomEvent('view-home-start-game', {
        detail: { difficulty, userName: this.name },
      })
    );
  }
}
