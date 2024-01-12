import { html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { cssStyles } from './styles.js';

import '@mole/view-home/view-home.js';

export class FlowMole extends LitElement {
  static styles = cssStyles;

  static properties = {
    /**
     * Header of the component
     */
    header: { type: String },
    /**
     * Routes of the component
     */
    routes: { type: Array },
  };

  constructor() {
    super();
    this.header = 'Este es el componente: flow-mole';
  }

  firstUpdated() {
    const router = new Router(this._outletElement);
    router.setRoutes([
      { path: '/', component: 'view-home' },
      { path: '/game', component: 'view-game' },
      { path: '/archievements', component: 'view-archievements' },
      { path: '(.*)', redirect: '/' },
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

  render() {
    return html` ${FlowMole._outletTemplate} `;
  }
}
