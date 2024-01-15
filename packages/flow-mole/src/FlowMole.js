import { html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { cssStyles } from './styles.js';

// views
import '@mole/view-home/view-home.js';
import '@mole/view-game/view-game.js';
import { ROUTES, URLS } from './constants.js';

export class FlowMole extends LitElement {
  static styles = cssStyles;

  static properties = {
    /**
     * Routes of the component
     */
    routes: { type: Array },
  };

  constructor() {
    super();
    this._onStartFunction = this._onStart.bind(this);
    // This variable contains all the routes of the app but is not used
    this.routes = URLS;
  }

  /**
   * When the app is connected, it adds the event listener
   * Normally to know when an event is fired, we use the @eventname in the template
   * but in this case, we cant do it because the template is not defined, is managed by the router
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('view-home-start-game', this._onStartFunction);
  }

  /**
   * When the app is disconnected, it removes the event listener
   * this is made to avoid memory leaks
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('view-home-start-game', this._onStartFunction);
  }

  firstUpdated() {
    // Check docs about router: https://github.com/vaadin/router
    const router = new Router(this._outletElement);
    router.setRoutes([
      { path: ROUTES.HOME, component: 'view-home' },
      {
        path: ROUTES.GAME,
        component: 'view-game',
        action: () => {
          /**
           * This function is performed when we navigate to the route (router.go function)
           * the return value is the component that will be rendered
           */
          const component = document.createElement('view-game');
          component.difficulty = this.difficulty;
          return component;
        },
      },
      {
        path: ROUTES.ARCHIEVEMENTS,
        component: 'view-archievements',
      },
      { path: '(.*)', redirect: ROUTES.HOME },
    ]);
  }

  /**
   * div element that will be used as outlet for the router
   * @returns {TemplateResult} Returns the template of the component
   */
  static get _outletTemplate() {
    return html`<div id="outlet"></div>`;
  }

  /**
   * @returns {HTMLElement} Returns the outlet element
   */
  get _outletElement() {
    return this.shadowRoot.getElementById('outlet');
  }

  /**
   * When view-home-start-game event is fired, this function is called
   * It sets the difficulty and navigates to the game page
   * @param {Object} detail
   */
  _onStart({ detail }) {
    this.difficulty = detail.difficulty;
    Router.go('/game');
  }

  render() {
    return html` ${FlowMole._outletTemplate} `;
  }
}
