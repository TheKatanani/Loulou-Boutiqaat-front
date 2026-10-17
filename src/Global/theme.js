const fontSizes = {
    h1: 3,
    h2: 2.5,
    h3: 2.0,
    h4: 1.8,
    h5: 1.6,
    h6: 1.4,
    body: 1.1,
    body2: 0.76,
};
const media = {
    // X-Small devices (portrait phones, less than 576px)
    xs:'@media (max-width: 575.9px)',
    // Small devices (landscape phones, 576px and up)
    s: '@media (min-width: 576px)',
    // Medium devices (tablets, 768px and up)
    m: '@media (min-width: 768px)',
    // Large devices (desktops, 992px and up)
    l: '@media (min-width: 992px)',
    // X-Large devices (large desktops, 1200px and up)
    xl: '@media (min-width: 1200px)',
    // XX-Large devices (larger desktops, 1400px and up)
    xxl: '@media (min-width: 1400px)'
}
const ColorApp = {
    primary: "#6d28d9",
    primary_gradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
    primary_light: "#8b5cf6",
    primary_soft: "#f5f3ff",
    gold: "#d4af37",
    gold_gradient: "linear-gradient(135deg, #d4af37 0%, #f3e8cb 100%)",
    orange: "#f97316",
    green: "#10b981",
    dark: "#0f172a",
    white: "#ffffff",
    gray_800: "#1e293b",
    gray_600: "#475569",
    gray_500: "#64748b",
    gray_400: "#94a3b8",
    gray_300: "#cbd5e1",
    gray_200: "#e2e8f0",
    gray_100: "#f1f5f9",
    gray_50: "#f8fafc",
}

export const lightTheme = {
    theme: 'light',
    palette: {
        main: ColorApp.white,
        ColorApp,
        page: ColorApp.gray_50,
        card: ColorApp.white,
        font: ColorApp.dark,
        border: ColorApp.gray_200,
    },
    fontSizes,
    media
};

export const darkTheme = {
    theme: 'dark',
    palette: {
        main: "#131b2e",
        ColorApp: {
            ...ColorApp,
            primary: "#8b5cf6",
            primary_light: "#a78bfa",
            primary_soft: "#1e1b4b",
            gray_800: "#f1f5f9",
            gray_600: "#cbd5e1",
            gray_500: "#94a3b8",
            gray_300: "#334155",
            gray_200: "#1e293b",
            gray_100: "#131b2e",
            gray_50: "#090d16",
        },
        page: "#090d16",
        card: "#131b2e",
        font: ColorApp.white,
        border: "#1e293b",
    },
    fontSizes,
    media
};