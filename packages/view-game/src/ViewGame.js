import { html, LitElement } from 'lit';
import { cssStyles } from './styles.js';

import '@mole/component-pipe/component-pipe.js';
import { DIFFICULTY_LEVELS, RANDOM_POSSIBILITY, SIZE } from './constants.js';

export class ViewGame extends LitElement {
  static styles = cssStyles;

  static properties = {
    difficulty: { type: String },
    points: { type: Number },
  };

  constructor() {
    super();
    this.difficulty = 'easy';
    this.userName = null;
    this.interval = null;
    this.points = 0;
    const urlAudio = [
      './resources/punch1.mp3',
      './resources/punch2.mp3',
      './resources/punch3.mp3',
    ];
    this.slapAudio = urlAudio.map(
      url => new Audio(new URL(url, import.meta.url).href)
    );
  }

  firstUpdated() {
    this._pipeController();
  }

  /**
   * Resets all the pipes to the initial state.
   * @param {NodeList} pipes
   */
  static _resetPipes(pipes) {
    pipes.forEach(pipe => {
      const currentPipe = pipe;
      currentPipe.status = 'initial';
    });
  }

  /**
   * Returns a random number between 0 and RANDOM_POSSIBILITY
   * This function is used to generate a random number after another one for
   * this reason, it checks that the new number is not the same as the previous one.
   *
   * @param {Number} previousNumber
   * @returns {Number}
   */
  static _generateRandomNumber(previousNumber) {
    let randomNumber = Math.floor(Math.random() * RANDOM_POSSIBILITY);
    while (randomNumber === previousNumber) {
      randomNumber = Math.floor(Math.random() * RANDOM_POSSIBILITY);
    }
    return randomNumber;
  }

  /**
   * Returns the refresh rate of the game based on the difficulty
   * @returns {Number}
   */
  get refreshRate() {
    return DIFFICULTY_LEVELS[this.difficulty].refreshRate;
  }

  /**
   * This function is executed at firstUpdated function and it controls the pipes.
   * Every X seconds, it resets all the pipes and then it sets one of them to up.
   * The X is based on the difficulty.
   */
  _pipeController() {
    let previousPipe = null;
    const pipes = this.shadowRoot.querySelectorAll('component-pipe');

    this.interval = setInterval(() => {
      ViewGame._resetPipes(pipes);
      const randomNumber = ViewGame._generateRandomNumber(previousPipe);
      pipes[randomNumber].status = 'up';
      previousPipe = randomNumber;
    }, this.refreshRate);
  }

  /**
   * This function is executed when @component-pipe-clicked event is fired.
   * It plays a random slap sound and add points to the score.
   */
  _onSlapMole() {
    const randomNumber = Math.floor(Math.random() * 3);
    const slapAudio = this.slapAudio[randomNumber];
    slapAudio.currentTime = 0;
    slapAudio.play();
    this.points += DIFFICULTY_LEVELS[this.difficulty].points;
    if (navigator.vibrate) {
      navigator.vibrate(500);
    }
  }

  /**
   * Returns the header template
   * @returns {TemplateResult}
   */
  get _headerTemplate() {
    return html`
      <div class="headerTemp">
        <span>${this.userName || '❓'}</span>
        <span>Dificultad: ${DIFFICULTY_LEVELS[this.difficulty].literal}</span>
        <span>${this.points}</span>
      </div>
    `;
  }

  /**
   * Returns the game template
   * @returns {TemplateResult}
   */
  get _gameTemplate() {
    return html`
      <div id="pipe-container">
        ${Array.from(
          { length: SIZE.columns },
          () => html` <div>
            ${Array.from(
              { length: SIZE.rows },
              () =>
                html` <component-pipe
                  @component-pipe-clicked=${this._onSlapMole}
                ></component-pipe>`
            )}
          </div>`
        )}
      </div>
    `;
  }

  render() {
    return html` ${this._headerTemplate} ${this._gameTemplate} `;
  }
}
