export enum THEME {
    default = 'default',
    dark = 'dark'
}

export const PRIMARY_COLOR: { [key in THEME]: string } = {
    default: '#377E95',
    dark: '#913DF3'
}