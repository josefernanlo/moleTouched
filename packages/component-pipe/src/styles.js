import { css } from 'lit';

export const cssStyles = css`
  :host {
    display: block;
    padding: 5px;
    width: min-content;
    height: 170px;
    overflow: hidden;
  }

  div {
    -webkit-tap-highlight-color: transparent;
  }

  #head-pipe {
    position: relative;
    z-index: 4;
    width: 100px;
    height: 40px;
    background-color: #74e84a;
    border-radius: 5px;
    margin: 0 auto;
    border: solid 4px #4c6b2c;
  }

  #body-pipe {
    position: relative;
    z-index: 4;
    width: 80px;
    height: 100px;
    background-color: #74e84a;
    border-radius: 0px;
    margin: 0 auto;
    border: solid 4px #4c6b2c;
    border-top: solid 5px #4c6b2c;
  }

  #pipe-mark {
    width: 10px;
    height: 100%;
    background-color: #e8e44a;
    margin-right: 10px;
    margin-left: auto;
  }

  #mole {
    position: relative;
    z-index: 1;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    transition: top 0.1s;
  }

  .initial {
    top: 95px;
  }

  .up {
    top: 30px;
  }
`;
