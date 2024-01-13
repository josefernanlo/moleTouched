import { html, LitElement } from 'lit';
import { cssStyles } from './styles.js';

export class ComponentButton extends LitElement {
  static styles = cssStyles;

  static properties = {};

  render() {
    return html`
      <button class="button-82-pushable">
        <span class="button-82-shadow"></span>
        <span class="button-82-edge"></span>
        <span class="button-82-front text"> <slot></slot> </span>
      </button>
    `;
  }
}
