import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    theme: {
        extend: {
            colors: {
                primary: defaultTheme.colors.green
            },
            maxWidth: {
                '1440': '1440px'
            },
        }
    }
}
