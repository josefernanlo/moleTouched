import { html, LitElement } from 'lit';
import { cssStyles } from './styles.js';

import '@mole/component-pipe/component-pipe.js';

export class ViewGame extends LitElement {
  static styles = cssStyles;

  static properties = {
    counter: { type: Number },
    difficulty: { type: String },
  };

  constructor() {
    super();
    this.counter = 5;
    this.difficulty = 'NO';
    this.interval = null;
  }

  firstUpdated() {
    const pipes = this.shadowRoot.querySelectorAll('component-pipe');
    this.interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 9);
      pipes[randomNumber].status = 'up';
    }, 200);
  }

  render() {
    return html`
      <div id="pipe-container">
        <div>
          <component-pipe></component-pipe> <component-pipe></component-pipe>
          <component-pipe></component-pipe>
        </div>
        <div>
          <component-pipe></component-pipe> <component-pipe></component-pipe>
          <component-pipe></component-pipe>
        </div>
        <div>
          <component-pipe></component-pipe> <component-pipe></component-pipe>
          <component-pipe></component-pipe>
        </div>
      </div>
    `;
  }
}
