import { html, css, LitElement } from 'lit';

export class ViewHome extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--view-home-text-color, #000);
    }
  `;

  static properties = {
    header: { type: String },
  };

  constructor() {
    super();
    this.header = 'Soy el componente: view-home!';
  }

  render() {
    return html` <h1>${this.header}</h1> `;
  }
}
