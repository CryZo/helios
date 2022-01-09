/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");
const twColors = require('tailwindcss/colors')
const sassVars = require(__dirname + "/theme.js");

const generateThemeColorStructure = () => {
  let ret = {};
  const keys = Object.keys(sassVars.themeColors);
  keys.forEach(colorName => {
    ret[colorName] = {};
    ret[colorName]['50'] = `var(--color-${colorName}-50)`;
    for (let val = 100; val <= 900; val += 100) {
      ret[colorName][val.toString()] = `var(--color-${colorName}-${val})`;
    }
    ret[colorName]['default'] = `var(--color-${colorName}-500)`;
  });

  return ret;
}

const generateThemeColorVariantsStructure = (variants) => {
  let ret = {};
  const keys = Object.keys(sassVars.themeColors);
  keys.forEach(colorName => {
    ret[colorName] = {};
    variants.forEach((variant) => {
      ret[colorName][variant] = `var(--color-${colorName}-${variant})`;
    })
  });

  return ret;
}

const generateShadowOutlineStructure = () => {
  let ret = {};
  const keys = Object.keys(sassVars.themeColors);
  keys.forEach(colorName => {
    ret[`outline-${colorName}`] = `0 0 0 3px rgba(var(--triplet-${colorName}), 0.5)`;
  });

  return ret;
}

const colorMerger = (colors) => {
  let ret = {}
  colors.forEach((color) => {
    let entries = Object.entries(color);
    entries.forEach((entry) => {
      if (!ret[entry[0]]) ret[entry[0]] = {};

      ret[entry[0]] = {...ret[entry[0]], ...entry[1]};
    })
  })

  return ret;
}

const colors = colorMerger([
  generateThemeColorStructure(),
  generateThemeColorVariantsStructure(['hover', 'active', 'disabled', 'popup-bg'])
]);

const shadowOutline = generateShadowOutlineStructure();

module.exports = {
  darkMode: 'media', // or 'media' or 'class'

  future: {
    defaultLineHeights: false,
    standardFontWeights: false,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },

  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        "black": "#0c0c0c",
        'blue-gray': twColors.blueGray,
        ...colors,
      },
      boxShadow: {
        ...shadowOutline
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        "88": "22rem",
        "128": "32rem"
      },
      zIndex: {
        "-1": "-1"
      },
      inset: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "32": "8rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "64": "16rem",
        "-1": "-0.25rem",
        "-2": "-0.5rem",
        "-3": "-0.75rem",
        "-4": "-1rem",
        "-5": "-1.25rem",
        "-6": "-1.5rem",
        "-8": "-2rem",
        "-10": "-2.5rem",
        "-12": "-3rem",
        "-16": "-4rem",
        "-20": "-5rem",
        "-24": "-6rem",
        "-32": "-8rem",
        "-40": "-10rem",
        "-48": "-12rem",
        "-56": "-14rem",
        "-64": "-16rem"
      },
      flexGrow: {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5
      },
      minHeight: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "32": "8rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "64": "16rem",
      }
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")]
};
