import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: block;
    color: var(--view-home-text-color, #000);
    max-width: 500px;
  }

  #difficultLevel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
