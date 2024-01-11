import { html, css, LitElement } from 'lit';
import '@mole/view-home/view-home.js';

export class FlowMole extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--flow-mole-text-color, #000);
    }
  `;

  static properties = {
    header: { type: String },
  };

  constructor() {
    super();
    this.header = 'Este es el componente: flow-mole';
  }

  render() {
    return html`
      <h1>${this.header}</h1>
      <p>Aquí debajo debería estar el componente view-home:</p>
      <view-home></view-home>
    `;
  }
}
