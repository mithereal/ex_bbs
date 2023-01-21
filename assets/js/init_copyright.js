export const InitCopyright = {
    mounted() {
        init()
    }
}

const init = () => {

    const copyright = new Date();

    document.getElementById('copyright-year').innerHTML=copyright.getFullYear();

}

init()