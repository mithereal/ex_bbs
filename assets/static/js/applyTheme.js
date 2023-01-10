function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark'){
        localStorage.theme = 'light'
    } else {
        localStorage.theme = 'dark'
    }
    reapplyTheme()
}
function reapplyTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

reapplyTheme()

window.matchMedia('(prefers-color-scheme: dark)').addListener(reapplyTheme)

window.onload = function () {
    reapplyTheme()
}
