export enum THEME {
    default = 'default',
    dark = 'dark'
}

export const THEME_COLOR: { [key in THEME]: string } = {
    default: '#121212',
    dark: '#292929'
}