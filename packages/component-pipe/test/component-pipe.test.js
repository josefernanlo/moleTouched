import { html } from 'lit';
import { fixture, expect, assert } from '@open-wc/testing';

import '../component-pipe.js';

describe('ComponentPipe', () => {
  it('should has the class "initial" attached', async () => {
    const el = await fixture(html`<component-pipe></component-pipe>`);
    const mole = el.shadowRoot.querySelector('img');
    assert.isTrue(mole.classList.contains('initial'));
  });

  it('should not change status property when his value is "initial" and the element is clicked', async () => {
    const el = await fixture(html`<component-pipe></component-pipe>`);
    const divContainer = el.shadowRoot.querySelector('div');
    divContainer.click();
    await el.updateComplete;
    assert.equal(el.status, 'initial');
  });

  it('should dispatch an event when status property when his value is "up" and the element is clicked', async () => {
    const el = await fixture(html`<component-pipe></component-pipe>`);
    // addEventListener
    let eventDispatched = false;
    el.addEventListener('component-pipe-clicked', () => {
      eventDispatched = true;
    });

    // Simulate click when status is "up"
    const divContainer = el.shadowRoot.querySelector('div');
    el.status = 'up';
    await el.updateComplete;
    divContainer.click();
    await el.updateComplete;

    // Check if event was dispatched
    assert.isTrue(eventDispatched);
  });

  it('should passes the a11y audit', async () => {
    const el = await fixture(html`<component-pipe></component-pipe>`);
    await expect(el).shadowDom.to.be.accessible();
  });
});
