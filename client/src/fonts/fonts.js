import brushtype from './brushtype-normal.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Font Name';
        url(${brushtype}) format('truetype');
        font-style: normal;
    }
`;
