import { html } from 'lit';
import { fixture, expect, assert } from '@open-wc/testing';

import '../component-button.js';

describe('ComponentButton', () => {
  it('should create a button element', async () => {
    const el = await fixture(html`<component-button></component-button>`);
    const button = el.shadowRoot.querySelector('button');
    assert.isNotEmpty(button);
  });

  it('should passes the a11y audit', async () => {
    const el = await fixture(html`<component-button></component-button>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
