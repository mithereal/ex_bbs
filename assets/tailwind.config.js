const plugin = require('tailwindcss/plugin');

module.exports = {
    mode: "jit",
    content: [
        './js/**/*.js',
        '../lib/*_web.ex',
        '../lib/*_web/**/*.*ex'
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#5a88e3",
                "primary-admin": "#b5b7bb",
                "primary-dark": "#102a52",
                "primary-admin-dark": "#102a52",
                "secondary": "#3b3d3f",
                "secondary-admin": "#0a0ad2",
                "secondary-dark": "#060C11",
                "secondary-admin-dark": "#060C11",
                "custom_scrollbar": "#182430",
                "custom_scrollbar_thumb": "#888",
                "custom_scrollbar_thumb:hover": "#555",
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        plugin(function({ addUtilities, theme }) {
            const newUtilities = {
                '.custom-scrollbar': {
                    '.custom-scrollbar::-webkit-scrollbar': { width: '6px' },
                    '.custom-scrollbar::-webkit-scrollbar-track': { background: theme('custom_scrollbar')},
                    '.custom-scrollbar::-webkit-scrollbar-thumb': { background: theme('custom_scrollbar_thumb')},
                    '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {background: theme('custom_scrollbar_thumb:hover')},
                }
            }

            addUtilities(newUtilities, ['responsive', 'hover'])
        })
    ],
}