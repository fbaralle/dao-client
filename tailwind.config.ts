import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2400px",
      },
      container: {
        screens: {
          DEFAULT: "100%",
          sm: "100%",
          lg: "100%",
          xl: "100%",
          "2xl": "1800px",
        },
      },
      fontFamily: {
        lexend: ["var(--fontFamilyLexend)", "sans-serif"],
        "roboto-mono": ["var(--font-roboto-mono)", "sans-serif"],
      },
      fontSize: {
        xxs: ["0.6rem", "0.8rem"], // 10px
        "2.5xl": ["1.75rem", "2.15rem"], // 28px
      },
      colors: {
        button: {
          primary: "var(--buttonPrimaryBackgroundColor)",
          "primary-hover": "var(--buttonPrimaryHoverColor)",
          "primary-pressed": "var(--buttonPrimaryPressedColor)",
          secondary: "var(--buttonSecondaryBackgroundColor)",
          "secondary-hover": "var(--buttonSecondaryHoverColor)",
          "secondary-pressed": "var(--buttonSecondaryPressedColor)",
          "destructive-border": "var(--buttonDestructiveBorderColor)",
          "destructive-border-hover":
            "var(--buttonDestructiveBorderHoverColor)",
          "destructive-border-pressed":
            "var(--buttonDestructiveBorderPressedColor)",
          disabled: "var(--buttonDisabledBackgroundColor)",
        },
        text: {
          primary: "var(--textPrimaryColor)",
          disabled: "var(--textDisabledColor)",
          black: "var(--textBlack)",
          white: "var(--textWhite)",
          default: "var(--textDefaultColor)",
          destructive: "var(--textDestructiveColor)",
          green: "var(--textGreenColor)",
          inverted: "var(--textInvertedColor)",
          link: "var(--textLinkColor)",
          "link-hover": "var(--textLinkHoverColor)",
          purple: "var(--textPurpleColor)",
          subdued: "var(--textSubduedColor)",
          warning: "var(--textWarningColor)",
          daoGoldGradientStart: "var(--daoGoldGradientStart)",
          daoGoldGradientMiddle: "var(--daoGoldGradientMiddle)",
          daoGoldGradientEnd: "var(--daoGoldGradientEnd)",
          doubleXPGradientStart: "var(--doubleXPGradientStart)",
          doubleXPGradientMiddle: "var(--doubleXPGradientMiddle)",
          doubleXPGradientEnd: "var(--doubleXPGradientEnd)",
          darkGreen: "var(--textDarkgreen)",
          darkRed: "var(--textDarkred)",
        },
        fill: {
          // DEPRECATED: DO NOT USE - this color group doesn't exist in Figma
          black: "var(--textBlack)",
          white: "var(--textWhite)",
          default: "var(--textDefaultColor)",
          destructive: "var(--textDestructiveColor)",
          disabled: "var(--textDisabledColor)",
          green: "var(--textGreenColor)",
          inverted: "var(--textInvertedColor)",
          link: "var(--textLinkColor)",
          linkHover: "var(--textLinkHoverColor)",
          purple: "var(--textPurpleColor)",
          subdued: "var(--textSubduedColor)",
        },
        background: {
          main: "var(--backgroundMainColor)",
          popout: "var(--backgroundPopoutColor)",
          highlight: "var(--backgroundHighlightColor)",
          warning: "var(--backgroundAlertColor)",
          focusTransparent: "var(--backgroundSearchBarUnfocusedRgba)",
          daoGoldGradient: "var(--daoGoldGradient)",
          shadingGreen: "var(--backgroundShadingGreen)",
          teal: "var(--solidTeal)",
          shadingRed: "var(--backgroundShadingRed)",
          shadingGray: "var(--backgroundShadingGray)",
          transparent: "var(--countdownBackgroundColor)",
        },
        bg: {
          // DEPRECATED: DO NOT USE - this color group doesn't exist in Figma
          primary: "var(--backgroundPrimaryColor)",
          popout: "var(--backgroundPopoutColor)",
          primaryTransparent: "var(--backgroundPrimaryColorTransparent)",
          cellHighlight: "var(--backgroundCellHighlightColor)",
          separation: "var(--backgroundSeparationColor)",
          green: "var(--backgroundGreen)",
          placeholder: "var(--backgroundPlaceholder)",
          foregroundDisabled: "var(--foreGroundDisabled)",
          lightPurple: "var(--backgroundLightPurple)",
          disabledInput: "var(--backgroundDisabledInput)",
          imageCount: "var(--backgroundImageCountRgba)",
        },
        border: {
          primary: "var(--borderPrimaryColor)",
          warning: "var(--borderWarningColor)",
          teal: "var(--solidTeal)",
        },
        borderRadius: {
          xs: "var(--borderXSmallRadius)",
          sm: "var(--borderSmallRadius)",
          md: "var(--borderMediumRadius)",
          lg: "var(--borderLargeRadius)",
          xl: "16px",
          "2xl": "24px",
        },
        shading: {
          green: "var(--shadingGreen)",
          purple: "var(--shadingPurple)",
          blue: "var(--shadingBlue)",
          red: "var(--shadingRed)",
          yellow: "var(--shadingYellow)",
          gray: "var(--shadingGray)",
          teal: "var(--shadingTeal)",
        },
        solid: {
          yellow: "var(--solidYellow)",
          orange: "var(--solidOrange)",
          pink: "var(--solidPink)",
          teal: "var(--solidTeal)",
        },
        shadow: {
          default: "var(--shadowDefaultColor)",
        },
      },
      boxShadow: {
        default: "0px 1px 20px var(--shadowDefaultColor)",
      },
      minHeight: {
        "screen-50": "50vh",
      },
      letterSpacing: {
        default: ".02em",
      },
      lineHeight: {
        130: "130%",
        150: "150%",
      },
      animation: {
        spinner: "spinner 0.6s linear infinite",
      },
      keyframes: {
        spinner: {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },

  plugins: [],
};
export default config;
