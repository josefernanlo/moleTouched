import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: block;
    color: var(--view-home-text-color, #000);
  }

  #difficultLevel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
