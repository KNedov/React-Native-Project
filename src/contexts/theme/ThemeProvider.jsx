import { Platform, useColorScheme } from "react-native";
import { ThemeContext } from "./ThemeContext.js";
import { useMemo,  useEffect } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-system-ui";

export default function ThemeProvider({
    children,
}) {
    const colorScheme = useColorScheme();
    const isDarkMode =  colorScheme === "dark";

    const lightTheme = useMemo(() => ({
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            background: "#f5f5f5",
            backgroundCard:"#FFF",
            backgroundContent:"#ffffff",
            text: "#000000",
            textCard:"#333",
            textCreate:"#6C6C6C",
        },
        fonts: Platform.select({
            ios: "San Francisco",
            android: "Roboto",
            default: "System",
        })
    }), []);

    const darkTheme = useMemo(() => ({
        ...DarkTheme,
        dark: true,
        colors: {
            ...DarkTheme.colors,
            background: "#121212",
            backgroundCard: "#1E293B",
            backgroundContent: "#31425e",
            text: "#E0E0E0",
            textCard:"#94A3B8",
            textCreate:"#6C6C6C",
        },
        fonts: Platform.select({
            ios: "San Francisco",
            android: "Roboto",
            default: "System",
        })
    }), []);

    useEffect(() => {
        setBackgroundColorAsync(isDarkMode ? darkTheme.colors.background : lightTheme.colors.background);
    }, [isDarkMode]);



    const contextValue = {
        isDarkMode,
        theme: isDarkMode ? darkTheme : lightTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}