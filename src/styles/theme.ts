import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#242EDB",
    fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,
  },

  components: {
    Button: {
      controlHeightLG: 54,
      borderRadiusLG: 12,
      contentFontSizeLG: 18,
    },
    Checkbox: {
      controlInteractiveSize: 24,
      lineWidth: 2,
    },
  },
};
