import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: var(--view-home-text-color, #000);
    max-width: 500px;
  }

  #difficultLevel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #continue,
  #goBack {
    width: 100%;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }
`;
