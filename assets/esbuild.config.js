const { build } = require('esbuild')
require('dotenv').config()
const args = process.argv.slice(2)

const options = {
    entryPoints: ['./js/_main.js'],
    outfile: './js/main.bundle.js',
    bundle: true,
    minify: true,
    watch: args.includes('--watch'),
    define: {
        'VARIABLE': JSON.stringify(process.env.VARIABLE)
    },
}

build(options).catch(() => process.exit(1))