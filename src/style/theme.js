import { css } from "styled-components";

/* color */
export const color = {
    white: "#fff",
    black: "#000",
    grey0: "#ddd",
    grey1: "#ededed",
    grey2: "#b2b2b2",
    grey3: "#57595d",
    grey4: '#242424',
    grey5: '#0e0e0e',
    green1: "#3dcc8e",
    green2: "#03b898",
    orange1: "#e78007",
    orange2: "#d3471b",
    red1: "#FC5021",
    brown: "#4a4a4a",
};

/* font family & size (1rem = 16px) */
export const fontFamily = "SukhumvitTadmai-ExtraBold";
export const fontSize = {
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5
};

//mobile first approach min-width
export const screenSizes = {
    mobile: 425,
    tablet: 768,
    laptop: 1024,
    desktop: 1440,
};

// export const device = {
//     mobile: `(max-width: ${screenSizes.mobile}px)`,
//     tablet: `(max-width: ${screenSizes.tablet}px) and (min-width: ${screenSizes.mobile}px)`,
//     laptop: `(max-width: ${screenSizes.laptop}px) and (min-width: ${screenSizes.tablet}px)`,
//     desktop: `(max-width: ${screenSizes.desktop}px) and (min-width: ${screenSizes.laptop}px)`,
//     wideScreen: `(min-width: ${screenSizes.desktop}px)`
// }

export const device = {
    mobile: `(min-width: ${screenSizes.mobile}px)`,
    tablet: `(min-width: ${screenSizes.tablet}px)`,
    laptop: `(min-width: ${screenSizes.laptop}px)`,
    desktop: `(min-width: ${screenSizes.desktop}px)`,
    wideScreen: `(min-width: ${screenSizes.wideScreen}px)`
};

export const media = Object.keys(screenSizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (min-width: ${screenSizes[label] / 16}rem) {
            ${css(...args)}
        }
    `;
    return acc;
}, {});
