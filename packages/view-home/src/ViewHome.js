import { html, css, LitElement } from 'lit';

export class ViewHome extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--view-home-text-color, #000);
      background-color: green;
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = null;
  }

  get _inputElement() {
    return this.shadowRoot.getElementById('name');
  }

  get _buttonElement() {
    return this.shadowRoot.getElementById('continue');
  }

  get _secondStepElement() {
    return this.shadowRoot.getElementById('secondStep');
  }

  render() {
    return html`
      <h1>Bienvenido ${this.name ? `${this.name}!` : ''}</h1>
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
      <button id="continue" @click="${() => this.onContinue()}">
        Comenzar
      </button>
      <div id="secondStep" hidden>
        <h1>Antes de empezar a jugar</h1>
        <p>Selecciona un nivel de dificultad</p>
        <p>No te preocupes, podrás cambiarlo después</p>

        <!-- Ponme 3 botones de dificultad-->
        <button id="easy">Fácil</button>
        <button id="medium">Medio</button>
        <button id="hard">Difícil</button>
      </div>
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
    this._secondStepElement.hidden = false;
  }
}
