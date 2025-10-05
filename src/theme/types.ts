/*
 * Created by Asad on 04 OCT 2025
 */

export type Theme = {
  name: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    primary: string;
    text: string;
    muted: string;
    success: string;
    danger: string;
    inputBg: string;
    border: string;
    secondary: string;
  };
};
