import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: block;
    padding: 25px;
    color: var(--flow-mole-text-color, #000);
    background-color: red;
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
  }

  #outlet {
    width: 100%;
    height: 100%;
    background-color: blue;
  }
`;
