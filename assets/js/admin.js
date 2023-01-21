// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
//import "../css/user.css"
// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"

import topbar from "../vendor/topbar"
import "../vendor/alpine_cdn"
import "../vendor/hammer"

import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"


import {keepAlive} from "./utils";
import {InitToast} from "./init_toast";
import {InitCopyright} from "./init_copyright";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/service-worker.js');
    });
}

window.Alpine = Alpine;
// Alpine.prefix("data-x-");
Alpine.start();

const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}})

let Hooks = {};

Hooks.InitToast = InitToast
Hooks.InitCopyright = InitCopyright

Hooks.ConnectionStatus = {
    mounted() {
        window.connected = true
    },
    disconnected() {
        window.connected = false
    },
    reconnected() {
        window.connected = true
    }
}

liveSocket = new LiveSocket("/live", Socket, {
    params: {_csrf_token: csrfToken},
    Hooks: Hooks,
    dom: {
        onBeforeElUpdated(from, to) {
            if (from._x_dataStack) {
                window.Alpine.clone(from, to);
            }
        },
    },
});

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/service-worker.js');
    });
}

// connect if there are any LiveViews on the page
liveSocket.connect()
// keepAlive()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
