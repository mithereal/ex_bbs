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
                "primary": "#d8dbe0",
                "primary-dark": "#102a52",
                "secondary": "#adb1b4",
                "secondary-dark": "#060C11",
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