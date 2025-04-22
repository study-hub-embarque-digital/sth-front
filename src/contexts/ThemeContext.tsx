import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "../theme";

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void
}

interface IMyThemeProvider {
    children: React.ReactNode
}

const ThemeContext = createContext({} as IThemeContextData);

export const useThemeContext = () => {
    return useContext(ThemeContext)
}

export const MyThemeProvider: React.FC<IMyThemeProvider> = ({ children }: IMyThemeProvider) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

    const toggleTheme = useCallback(() => {
        setThemeName(atualTheme => atualTheme === 'light' ? 'dark' : 'light')
    }, [])

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme
        return DarkTheme
    }, [themeName])

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}