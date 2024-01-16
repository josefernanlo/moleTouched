import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../flow-mole.js';

describe('FlowMole', () => {
  it('should passes the a11y audit', async () => {
    const el = await fixture(html`<flow-mole></flow-mole>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
