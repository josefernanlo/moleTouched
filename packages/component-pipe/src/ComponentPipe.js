import { html, LitElement } from 'lit';
import { cssStyles } from './styles.js';
import { STATUS } from './constants.js';

export class ComponentPipe extends LitElement {
  static styles = cssStyles;

  static properties = {
    status: { type: String },
  };

  constructor() {
    super();
    this.status = STATUS.INITIAL;
  }

  _onclick() {
    if (this.status === STATUS.UP) {
      const event = new CustomEvent('component-pipe-clicked', {
        cancelable: true,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
      this.status = STATUS.INITIAL;
    }
  }

  render() {
    const imageUrlMole = new URL('./resources/mole.png', import.meta.url);
    return html`
      <div @click="${this._onclick}" @keydown="${() => {}}">
        <img
          id="mole"
          class="${this.status}"
          src="${imageUrlMole.href}"
          alt="mole"
          draggable="false"
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
