import theme from "./src/theme.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.fonts,
      boxShadow: theme.shadows,
      height: {
        "calendar-cell-mobile": theme.spacing.calendar.cell.height.mobile,
        "calendar-cell-tablet": theme.spacing.calendar.cell.height.tablet,
        "calendar-cell-desktop": theme.spacing.calendar.cell.height.desktop,
      },
      width: {
        "sidebar-mobile": theme.spacing.sidebar.width.mobile,
        "sidebar-tablet": theme.spacing.sidebar.width.tablet,
        "sidebar-desktop": theme.spacing.sidebar.width.desktop,
      },
      fontSize: {
        "bs-mobile": theme.calendar.day.bs.fontSize.mobile,
        "bs-tablet": theme.calendar.day.bs.fontSize.tablet,
        "bs-desktop": theme.calendar.day.bs.fontSize.desktop,
        "ad-mobile": theme.calendar.day.ad.fontSize.mobile,
        "ad-tablet": theme.calendar.day.ad.fontSize.tablet,
        "ad-desktop": theme.calendar.day.ad.fontSize.desktop,
      },
      gap: {
        calendar: theme.spacing.calendar.gap,
      },
      borderRadius: {
        calendar: theme.spacing.calendar.borderRadius,
      },
      fontSize: {
        "2xs": "0.625rem", // 10px
      },
    },
  },
  plugins: [],
};
