import { html, LitElement } from 'lit';
import { cssStyles } from './styles.js';

export class ComponentButton extends LitElement {
  static styles = cssStyles;

  static properties = {};

  render() {
    return html`
      <button class="button" aria-label="Botón">
        <span class="button-shadow"></span>
        <span class="button-shadow"></span>
        <span class="button-front text"> <slot></slot> </span>
      </button>
    `;
  }
}
