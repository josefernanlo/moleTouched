import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: block;
    color: var(--view-game-text-color, #000);
    max-width: 500px;
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

  .headerTemp {
    display: flex;
    justify-content: space-between;
  }
`;
