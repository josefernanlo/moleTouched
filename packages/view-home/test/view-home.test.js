import { html } from 'lit';
import { fixture, expect, assert } from '@open-wc/testing';
import sinon from 'sinon';

import '../view-home.js';

describe('ViewHome', () => {
  it('should continue button change step property from 0 to 1', async () => {
    const el = await fixture(html`<view-home></view-home>`);
    const button = el.shadowRoot.querySelector('#continue');
    el.name = 'validName';
    button.click();

    assert.equal(el.step, 1);
  });

  it('should _goBack function change step property', async () => {
    const el = await fixture(html`<view-home></view-home>`);

    const button = el.shadowRoot.querySelector('#continue');
    el.name = 'validName';

    button.click();
    await el.updateComplete;

    el._goBack();
    await el.updateComplete;

    assert.equal(el.step, 0);
  });

  it('should easy button call _startGame function and dispatch an event', async () => {
    const el = await fixture(html`<view-home></view-home>`);

    let called = false;
    const stub = sinon.stub(el, '_startGame').returns((called = true));

    const button = el.shadowRoot.querySelector('#continue');
    el.name = 'validName';
    button.click();
    await el.updateComplete;

    const easyButton = el.shadowRoot.querySelector('#easy');
    easyButton.click();
    await el.updateComplete;

    assert.isTrue(called);
    stub.restore();
  });

  it('should medium button call _startGame function and dispatch an event', async () => {
    const el = await fixture(html`<view-home></view-home>`);

    let called = false;
    const stub = sinon.stub(el, '_startGame').returns((called = true));

    const button = el.shadowRoot.querySelector('#continue');
    el.name = 'validName';
    button.click();
    await el.updateComplete;

    const mediumButton = el.shadowRoot.querySelector('#medium');
    mediumButton.click();
    await el.updateComplete;

    assert.isTrue(called);
    stub.restore();
  });

  it('should hard button call _startGame function and dispatch an event', async () => {
    const el = await fixture(html`<view-home></view-home>`);

    let called = false;
    const stub = sinon.stub(el, '_startGame').returns((called = true));

    const button = el.shadowRoot.querySelector('#continue');
    el.name = 'validName';
    button.click();
    await el.updateComplete;

    const hardButton = el.shadowRoot.querySelector('#hard');
    hardButton.click();
    await el.updateComplete;

    assert.isTrue(called);
    stub.restore();
  });

  it('should passes the a11y audit', async () => {
    const el = await fixture(html`<view-home></view-home>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
