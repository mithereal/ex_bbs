// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
// import "../css/root.css"
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
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"
import "../vendor/alpine_cdn"
import "../vendor/hammer"
// import {onCLS, onFID, onLCP} from 'web-vitals';

const queue = new Set();
function addToQueue(metric) {
    queue.add(metric);
}

function flushQueue() {
    let url = '/analytics'

    if (queue.size > 0) {
        // Replace with whatever serialization method you prefer.
        // Note: JSON.stringify will likely include more data than you need.
        const body = JSON.stringify([...queue]);

        // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
        (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
        fetch( url, {body, method: 'POST', keepalive: true});

        queue.clear();
    }
}

// onCLS(addToQueue);
// onFID(addToQueue);
// onLCP(addToQueue);

// Report all available metrics whenever the page is backgrounded or unloaded.
addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        flushQueue();
    }
});

// NOTE: Safari does not reliably fire the `visibilitychange` event when the
// page is being unloaded. If Safari support is needed, you should also flush
// the queue in the `pagehide` event.
addEventListener('pagehide', flushQueue);

let rootElement = document.getElementById('product_grid');

// create a simple instance
// by default, it only adds horizontal recognizers
let mc = new Hammer(rootElement);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    rootElement.textContent = ev.type +" gesture detected.";
});

window.Alpine = Alpine;
// window.Alpine.prefix("data-x-");
Alpine.start();

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")


import {InitToast} from "./init_toast.js"
//import {InitCheckout} from "./init_checkout.js"
// import {InitCart} from "./init_cart.js"

let Hooks = {}
Hooks.InitToast = InitToast

Hooks.ConnectionStatus = {
    mounted () {
        window.connected = true
    },
    disconnected () {
        window.connected = false
    },
    reconnected () {
        window.connected = true
    }
}

let liveSocket = new LiveSocket("/live", Socket, {
    hooks: Hooks,
    params: {_csrf_token: csrfToken, _cart_id: cart_id},
    dom: {
        onBeforeElUpdated(from, to) {
            if (from._x_dataStack) {
                window.Alpine.clone(from, to);
                window.Alpine.initTree(to)
            }
        }
    }
})


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


// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket