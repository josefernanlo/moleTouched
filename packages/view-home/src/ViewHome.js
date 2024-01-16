import { html, LitElement, nothing } from 'lit';
import { cssStyles } from './styles.js';

// Components
import '@mole/component-button/component-button.js';

/**
 * Represents the ViewHome component, which is responsible for rendering the home view of the application.
 * This component allows the user to enter their name and choose the difficulty level before starting the game.
 */
export class ViewHome extends LitElement {
  static styles = cssStyles;

  static properties = {
    name: { type: String },
    step: { type: Number },
  };

  constructor() {
    super();
    this.name = '';
    this.step = 0;
  }

  firstUpdated() {
    this._inputElement.focus();
  }

  get _inputElement() {
    return this.shadowRoot.getElementById('name');
  }

  get _errorMessageElement() {
    return this.shadowRoot.getElementById('errorMessage');
  }

  /**
   * Fired when user writes on the input
   */
  _onInput() {
    this.name = this._inputElement.value;
  }

  /**
   * Fired when user clicks on the return button
   * Go back to the first step
   */
  async _goBack() {
    this.step = 0;
    await this.updateComplete;
    this._inputElement.value = this.name ? this.name : '';
  }

  /**
   * Fired when user clicks on the continue button
   * Check if the name is valid and go to the second step
   * If the name is not valid, add the error class to the input
   */
  _onContinue() {
    if (this._checkValidName()) {
      this.step = 1;
    } else {
      this._inputElement.focus();
      this._inputElement.classList.add('error');
      this._errorMessageElement.hidden = false;
    }
  }

  /**
   * Check if the name is valid
   * Is valid if the name is between 4 and 10 characters and only letters and spaces.
   * If the name is valid, capitalize the first letter and remove spaces at the beginning and end.
   * If the name is not valid, remove the error class to the input
   * @returns {Boolean} true if the name is valid, false if not
   */
  _checkValidName() {
    const regex = /^[a-zA-Z\s]{4,10}$/;
    const isValid = regex.test(this.name);
    if (isValid) {
      this._inputElement.classList.remove('error');
      this._errorMessageElement.hidden = true;
      const name = this.name.trim();
      this.name = `${name[0].toUpperCase()}${name.slice(1)}`;
    }
    return isValid;
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
            click en el y listo.
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
            maxlength="10"
            size="12"
            @input="${() => this._onInput()}"
          />
          <p id="errorMessage" hidden>
            El nombre no puede contener números y debe tener un mínimo de 4
            caracteres y un máximo de 20
          </p>
        </div>
        <component-button id="continue" @click="${this._onContinue}">
          Continuar
        </component-button>
      </div>
    `;
  }

  get _secondStepTemplate() {
    return html`
      <h1>😄 Antes de empezar a jugar</h1>
      <div id="secondStep" class="card">
        <div class="description">
          <p>
            Perfecto ${this.name}, parece que todo está en orden y tu licencia
            está correcta... Ahora necesitamos que entres en nuestro campo de
            entrenamiento, ya sabes las reglas, la puntuación solo depende de
            ti.
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
}
