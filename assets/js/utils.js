export function wait(ms) {
    return () => new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export function keepAlive(seconds = 60) {
    fetch('/keep-alive')
        .then(wait(seconds * 1000 /*ms*/))
        .then(keepAlive)
}

export function localize_time(utc_time, locales = []) {
    const client_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const options = {
        timeZone: client_timezone,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat(locales, options);

    return formatter.format(new Date(utc_time));
}

export function sendToGoogleAnalytics({name, delta, id}, ga) {
    // Assumes the global `ga()` function exists, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs
    ga('send', 'event', {
        eventCategory: 'Web Vitals',
        eventAction: name,
        // The `id` value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        eventLabel: id,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
        // Use a non-interaction event to avoid affecting bounce rate.
        nonInteraction: true,
        // Use `sendBeacon()` if the browser supports it.
        transport: 'beacon',

        // OPTIONAL: any additional attribution params here.
        // See: https://web.dev/debug-performance-in-the-field/
        // dimension1: '...',
        // dimension2: '...',
        // ...
    });
}

export function sendGtagToGoogleAnalytics({name, delta, id}, gtag) {
    // Assumes the global `gtag()` function exists, see:
    // https://developers.google.com/analytics/devguides/collection/gtagjs
    gtag('event', name, {
        event_category: 'Web Vitals',
        // The `id` value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        event_label: id,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        // Use a non-interaction event to avoid affecting bounce rate.
        non_interaction: true,

        // OPTIONAL: any additional attribution params here.
        // See: https://web.dev/debug-performance-in-the-field/
        // dimension1: '...',
        // dimension2: '...',
        // ...
    });
}

export function clearCookies() {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let spcook = cookies[i].split("=");
        deleteCookie(spcook[0]);
    }
}

export function deleteCookie(cookiename) {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let expires = ";expires=" + d;
    let name = cookiename;
    //alert(name);
    let value = "";
    document.cookie = name + "=" + value + expires + "; path=/acc/html";
    window.location = ""; // TO REFRESH THE PAGE
}


export function current_datetime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time
}

export function wallClock(id) {
    setTimeout(function() {
        const d = new Date();
        const n = d.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'});
        document.getElementById(id).innerHTML = n;
        wallClock(id);
    }, 1000)
}


