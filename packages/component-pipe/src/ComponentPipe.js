import { html, LitElement } from 'lit';
import { cssStyles } from './styles.js';

export class ComponentPipe extends LitElement {
  static styles = cssStyles;

  static properties = {
    status: { type: String },
  };

  constructor() {
    super();
    this.status = 'initial';
    this.id = '00';
  }

  get moleElement() {
    return this.shadowRoot.getElementById('mole');
  }

  _onclick() {
    if (this.status === 'up') {
      this.status = 'initial';
      dispatchEvent(
        new CustomEvent('component-pipe-clicked', { detail: { id: this.id } })
      );
    }
  }

  render() {
    return html`
      <div @click="${() => this._onclick()}" @keydown="${() => {}}">
        <img
          id="mole"
          class="${this.status}"
          src="./resources/mole.png"
          alt="mole"
        />
        <div id="head-pipe">
          <div id="pipe-mark"></div>
        </div>
        <div id="body-pipe">
          <div id="pipe-mark"></div>
        </div>
      </div>
    `;
  }
}
