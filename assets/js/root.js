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
import {wallClock} from "./utils"

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


let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")


import "./utils.js"


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/service-worker.js');
    });
}


wallClock('current_time')
