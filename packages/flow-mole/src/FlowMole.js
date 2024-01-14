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
    this.subroute = '';
    this._onStartFunction = this._onStart.bind(this);
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
    this._getRightUrl(window.location.href);
    // Check docs about router: https://github.com/vaadin/router
    const router = new Router(this._outletElement);
    router.setRoutes([
      { path: `${this.subroute}${ROUTES.HOME}`, component: 'view-home' },
      {
        path: `${this.subroute}${ROUTES.GAME}`,
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
        path: `${this.subroute}${ROUTES.ARCHIEVEMENTS}`,
        component: 'view-archievements',
      },
      { path: '(.*)', redirect: `${this.subroute}/` },
    ]);
  }

  /**
   * This function is executed after the first render (firstUpdated function)
   *
   * Made to get the right url when the app is running in a subroute
   * @example If the app is deployed in https://example.com/moleTouchedDemo/ the subroute will be '/moleTouchedDemo'
   * @example If the app is deployed in https://example.com/ the subroute will be ''
   *
   * It only work with 1 level of subroute
   * @example https://example.com/moleTouchedDemo/otherSubroute will not work, the subroute will be '/moleTouchedDemo'
   * You must use one level of subroute or modify this function, but for this demo is enough.
   *
   * Some subroutes like /game or /archievements are not valid, so we made a redirect to the domain
   * @example https://example.com/game/game will be redirected to https://example.com
   * Please avoid using subroutes that are equal to the routes, again this is enough for this demo.
   *
   * @param {String} url
   */
  _getRightUrl(url) {
    const [, , , subRoute] = url.split('/');
    if (subRoute !== '' && !URLS.includes(subRoute)) {
      this.subroute = `/${subRoute}`;
    }
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
