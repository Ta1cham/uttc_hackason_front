"use client";
import { createTheme } from "@mui/material/styles";

// TypographyVariantsの型を拡張
declare module '@mui/material/styles' {
  interface TypographyVariants {
    postUserName: React.CSSProperties;
    postUserId: React.CSSProperties;
    postContent: React.CSSProperties;
  }

  // オプション型の拡張（createThemeで使用するため）
  interface TypographyVariantsOptions {
    postUserName?: React.CSSProperties;
    postUserId?: React.CSSProperties;
    postContent?: React.CSSProperties;
  }
}

// TypographyPropsVariantOverridesの型を拡張
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    postUserName: true;
    postUserId: true;
    postContent: true;
  }
}

// テーマの作成
const theme = createTheme({
  typography: {
    postUserName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    postUserId: {
      fontSize: 14,
      fontWeight: 'normal',
    },
    postContent: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'normal',
    },
  },
});

export default theme;
