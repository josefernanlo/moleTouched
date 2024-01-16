import { html, LitElement } from 'lit';
import { cssStyles } from './styles.js';
import {
  DIFFICULTY_LEVELS,
  RANDOM_POSSIBILITY,
  SIZE,
  STATUS,
} from './constants.js';

// Components
import '@mole/component-pipe/component-pipe.js';
import '@mole/component-button/component-button.js';

export class ViewGame extends LitElement {
  static styles = cssStyles;

  static properties = {
    difficulty: { type: String },
    points: { type: Number },
    isPlaying: { type: Boolean },
    isChangingDifficulty: { type: Boolean },
  };

  constructor() {
    super();
    this.difficulty = 'easy';
    this.userName = null;
    this.interval = null;
    this.isPlaying = true;
    this.isChangingDifficulty = false;
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
    this.interval = this._pipeController();
    this.pipeContainerElement =
      this.shadowRoot.querySelector('#pipe-container');
  }

  updated(changedProperties) {
    if (changedProperties.has('difficulty') && this.interval) {
      clearInterval(this.interval);
      this.interval = this._pipeController();
    }
  }

  /**
   * Resets all the pipes to the initial state.
   * @param {NodeList} pipes
   */
  static _resetPipes(pipes) {
    pipes.forEach(pipe => {
      const currentPipe = pipe;
      currentPipe.status = STATUS.INITIAL;
    });
  }

  /**
   * Returns a random number between 0 and possibilities
   * If possibilities is not specified the value is RANDOM_POSSIBILITY
   * This function is used to generate a random number after another one for
   * this reason, it checks that the new number is not the same as the previous one.
   *
   * @param {Number} previousNumber
   * @param {Number} possibilities
   * @returns {Number}
   */
  static _generateRandomNumber({
    previousNumber,
    possibilities = RANDOM_POSSIBILITY,
  }) {
    let randomNumber = Math.floor(Math.random() * possibilities);
    while (randomNumber === previousNumber) {
      randomNumber = Math.floor(Math.random() * possibilities);
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
   * This function is executed at firstUpdated function and when the difficult level is changed
   * It controls the pipes.
   * Every X seconds, it resets all the pipes and then it sets one of them to up.
   * The X is based on the difficulty.
   */
  _pipeController() {
    let previousPipe = null;
    const pipes = this.shadowRoot.querySelectorAll('component-pipe');

    return setInterval(() => {
      if (this.isPlaying) {
        ViewGame._resetPipes(pipes);
        const randomNumber = ViewGame._generateRandomNumber({
          previousNumber: previousPipe,
        });
        pipes[randomNumber].status = STATUS.UP;
        previousPipe = randomNumber;
      }
    }, this.refreshRate);
  }

  /**
   * This function is executed when @component-pipe-clicked event is fired.
   * If the game is not playing, the game continues but it doesn't add points.
   * If the game is playing It plays a random slap sound and add points to the score.
   */
  _onSlapMole() {
    if (!this.isPlaying) {
      this._changeStatus();
      return;
    }
    const randomNumber = ViewGame._generateRandomNumber({
      possibilities: this.slapAudio.length,
    });
    const slapAudio = this.slapAudio[randomNumber];
    slapAudio.currentTime = 0;
    slapAudio.play();
    this.points += DIFFICULTY_LEVELS[this.difficulty].points;
    if (navigator.vibrate) {
      navigator.vibrate(250);
    }
  }

  /**
   * This function is executed when the user clicks on the play/pause button or
   * the user clicks a mole when the game is paused.
   * It changes the status of the game.
   */
  _changeStatus() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.pipeContainerElement.classList.remove('paused');
    } else {
      this.pipeContainerElement.classList.add('paused');
    }
  }

  _changeDifficulty() {
    this.isChangingDifficulty = !this.isChangingDifficulty;
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

  get _normalMenuTemplate() {
    return html` <component-button id="playPause" @click="${this._changeStatus}"
        >${this.isPlaying ? 'Pausar' : 'Reanudar'}</component-button
      >
      <component-button id="changeDifficulty" @click="${this._changeDifficulty}"
        >Cambiar dificultad</component-button
      >`;
  }

  get _changeDifficultyTemplate() {
    return html` <component-button
        id="easyButton"
        @click="${() => {
          this.difficulty = 'easy';
          this.isChangingDifficulty = false;
        }}"
        >Fácil</component-button
      >
      <component-button
        id="mediumButton"
        @click="${() => {
          this.difficulty = 'medium';
          this.isChangingDifficulty = false;
        }}"
        >Medio</component-button
      >
      <component-button
        id="hardButton"
        @click="${() => {
          this.difficulty = 'hard';
          this.isChangingDifficulty = false;
        }}"
        >Difícil</component-button
      >`;
  }

  get _footerTemplate() {
    return html`
      <div id="footer">
        ${this.isChangingDifficulty
          ? this._changeDifficultyTemplate
          : this._normalMenuTemplate}
      </div>
    `;
  }

  render() {
    return html` ${this._headerTemplate} ${this._gameTemplate}
    ${this._footerTemplate}`;
  }
}
