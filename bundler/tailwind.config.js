const defaultTheme = require('tailwindcss/defaultTheme')
const globEntries = require('webpack-glob-entries-extended')

const paths = require("./paths.js")

const pxToRem = (px) => {
  const base = 16
  return px / base
}

const pxToRemString = (value) => {
  return pxToRem(value) + "rem"
}

const generateFontSize = () => {
  const fontSize = {}

  const minFontSize = 12
  const maxFontSize = 100

  let size = minFontSize
  while (size <= maxFontSize) {
    fontSize[size] = pxToRemString(size)
    size += 2
  }

  return fontSize
}

const generateBorderRadius = () => {
  const borderRadius = {}

  const minRadius = 0
  const maxRadius = 24

  let radius = minRadius
  while (radius <= maxRadius) {
    borderRadius[radius] = pxToRemString(radius),
    radius += 2
  }

  borderRadius["full"] = "9999px"

  return borderRadius
}

module.exports = {
  content: Object.values(globEntries(paths.src + "/**/*.{html,js,jsx,ts,tsx}")),
  darkMode: "class",
  theme: {
    extend: {
      borderRadius: generateBorderRadius(),
      colors: {
        "red": "#F87070",
        "lightblue": "#70F3F8",
        "purple": "#D881F8",
        "gray": {
          100: "#EFF1FA",
          200: "#D7E0FF",
        },
        "blue": {
          100: "#1E213F",
          200: "#161932",
        },
      },
      fontFamily: {
        "sans": ['Kumbh Sans', ...defaultTheme.fontFamily.sans],
        "serif": ['Roboto Slab', ...defaultTheme.fontFamily.serif],
        "mono": ['Space Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: generateFontSize(),
      spacing: {
        4.5: pxToRemString(18),
        6.5: pxToRemString(38),
        25: pxToRemString(100),
      },
      transitionDuration: { "DEFAULT": "300ms" }
    },
  },
  plugins: [],
}