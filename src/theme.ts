import { createTheme } from "@mui/material";

export const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: { main: "#277cfb", light: "#f2f7ff", contrastText: "#ffffff" },
    secondary: {
      main: "#8c95a5",
      light: "#f9fafb",
      dark: "#dce4f1",
      contrastText: "#2A2B32",
    },
    error: { main: "#f94a4a", light: "#ffe8e7" },
    info: {
      main: "#C3C9D3",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius: 0,
          ":hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          variants: [
            {
              props: { variant: "outlined" },
              style: {
                color: "#000",
                borderColor: "var(--mui-palette-secondary-dark)",
                ":hover": {
                  borderColor: "var(--mui-palette-primary-main)",
                  background: "var(--mui-palette-primary-light)",
                },
              },
            },
          ],
        },
      },
    },
  },
});
