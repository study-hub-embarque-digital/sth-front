import { PaletteOptions, Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    breadcrumb: string;
    button: string;
    hover: string;
    active: string;
    tabs: {
      activeTab: string;
      border: string;
    };
  }

  interface TypeText {
    caption?: string
  }

  interface PaletteOptions {
    breadcrumb?: string;
    button?: string;
    hover?: string;
    active?: string;
    tabs?: {
      activeTab: string;
      border: string;
    };
  }
}
