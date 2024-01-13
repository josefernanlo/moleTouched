import { html, css, LitElement } from 'lit';

export class ViewGame extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--view-game-text-color, #000);
    }
  `;

  static properties = {
    header: { type: String },
    counter: { type: Number },
    difficulty: { type: String },
  };

  constructor() {
    super();
    this.header = 'Hey there';
    this.counter = 5;
    this.difficulty = 'NO';
  }

  __increment() {
    this.counter += 1;
  }

  render() {
    return html` <h1>Hola</h1> `;
  }
}
