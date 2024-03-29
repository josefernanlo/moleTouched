import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: block;
    color: var(--component-button-text-color, #000);
    width: min-content;
    margin-top: 20px;
    width: min-content;
  }
  .button {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
  }
  .button-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  .button-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }
  .button-front {
    display: block;
    position: relative;
    padding: 12px 27px;
    border-radius: 12px;
    font-size: 1.1rem;
    color: white;
    background: rgb(179, 0, 47);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    font-family: 'Pixelify Sans';
  }
  .button:hover {
    filter: brightness(110%);
    -webkit-filter: brightness(110%);
  }
  .button:hover .button-front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .button:active .button-front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
  .button:hover .button-shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .button:active .button-shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }
  .button:focus:not(:focus-visible) {
    outline: none;
  }
`;
