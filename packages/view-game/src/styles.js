import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: block;
    color: var(--view-game-text-color, #000);
  }

  #pipe-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
  }
`;
