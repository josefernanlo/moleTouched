import { html } from 'lit';
import { fixture, expect, assert } from '@open-wc/testing';
import sinon from 'sinon';

import '../view-game.js';
import { ViewGame } from '../src/ViewGame.js';

describe('ViewGame', () => {
  it('should _resetPipes function reset all pipes', async () => {
    const el = await fixture(html`<view-game></view-game>`);
    const pipes = el.shadowRoot.querySelectorAll('component-pipe');
    const pipeId = 4;
    pipes[pipeId].status = 'up';
    ViewGame._resetPipes(pipes);
    assert.equal(pipes[pipeId].status, 'initial');
  });

  it('should _generateRandomNumber function generate a number', async () => {
    const result = ViewGame._generateRandomNumber({});
    assert.isNumber(result);
  });

  it('should _generateRandomNumber function generate a not repeated number ', async () => {
    const arr = Array.from({ length: 1000 });
    const isRepeated = arr.reduce((acc, _, index) => {
      const previousNumber = acc[index - 1];
      const randomNumber = ViewGame._generateRandomNumber({ previousNumber });
      const isEqual = randomNumber === previousNumber;
      return [...acc, isEqual];
    }, []);

    assert.isFalse(isRepeated.includes(true));
  });

  it('should _pipeController function return a Number (the id of the interval)', async () => {
    const el = await fixture(html`<view-game></view-game>`);
    const interval = el._pipeController();
    assert.isNumber(interval);
  });

  it('should playPause button change status of the game (isPlaying property)', async () => {
    const el = await fixture(html`<view-game></view-game>`);
    const button = el.shadowRoot.querySelector('#playPause');
    button.click();
    assert.isFalse(el.isPlaying);
  });

  it('should changeDifficulty button chage isChangingDifficulty property ', async () => {
    const el = await fixture(html`<view-game></view-game>`);
    const button = el.shadowRoot.querySelector('#changeDifficulty');
    button.click();
    assert.isTrue(el.isChangingDifficulty);
  });

  it('should easy button change difficulty property', async () => {
    const el = await fixture(html`<view-game></view-game>`);

    const button = el.shadowRoot.querySelector('#changeDifficulty');
    button.click();
    await el.updateComplete;
    const easyButton = el.shadowRoot.querySelector('#easyButton');
    easyButton.click();

    assert.equal(el.difficulty, 'easy');
  });

  it('should medium button change difficulty property', async () => {
    const el = await fixture(html`<view-game></view-game>`);

    const button = el.shadowRoot.querySelector('#changeDifficulty');
    button.click();
    await el.updateComplete;
    const mediumButton = el.shadowRoot.querySelector('#mediumButton');
    mediumButton.click();

    assert.equal(el.difficulty, 'medium');
  });

  it('should hard button change difficulty property', async () => {
    const el = await fixture(html`<view-game></view-game>`);

    const button = el.shadowRoot.querySelector('#changeDifficulty');
    button.click();
    await el.updateComplete;
    const hardButton = el.shadowRoot.querySelector('#hardButton');
    hardButton.click();

    assert.equal(el.difficulty, 'hard');
  });

  it('should _changeStatus function remove paused class of pipeContainerElement property when the game continues (from pause status)', async () => {
    const el = await fixture(html`<view-game></view-game>`);
    const button = el.shadowRoot.querySelector('#playPause');
    button.click();
    await el.updateComplete;
    button.click();
    assert.isFalse(el.pipeContainerElement.classList.contains('paused'));
  });

  it('should _onSlapMole function executed when a mole is clicked', async () => {
    const el = await fixture(html`<view-game></view-game>`);

    const sandbox = sinon.createSandbox();

    const pipe = el.shadowRoot.querySelector('component-pipe');
    const spyMethod = sandbox.spy(el, '_onSlapMole');

    pipe.dispatchEvent(new CustomEvent('component-pipe-clicked'));

    await expect(spyMethod).to.have.been.calledOnce;
    sandbox.restore();
  });

  it('should event being dispatched when a mole is clicked', async () => {
    const spy = sinon.spy();
    const el = await fixture(html`<view-game></view-game>`);

    const pipe = el.shadowRoot.querySelector('component-pipe');
    pipe.addEventListener('component-pipe-clicked', spy);

    pipe.dispatchEvent(new CustomEvent('component-pipe-clicked'), {
      bubbles: true,
    });

    await el.updateComplete;
    expect(spy).to.have.been.calledOnce;
  });

  it('should _onSlapMole function change isPlaying property to true when isPlaying is false and this function is executed ', async () => {
    const el = await fixture(html`<view-game></view-game>`);
    el.isPlaying = false;
    await el.updateComplete;

    el._onSlapMole();
    assert.isTrue(el.isPlaying);
  });

  it('should passes the a11y audit', async () => {
    const el = await fixture(html`<view-game></view-game>`);
    await expect(el).shadowDom.to.be.accessible();
  });
});
