import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  #footer {
    display: flex;
    justify-content: space-between;
  }

  #changeDifficulty {
    flex-grow: 1;
    max-width: 60%;
  }

  .paused {
    opacity: 0.3;
  }
`;
