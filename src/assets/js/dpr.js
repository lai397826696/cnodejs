let dpr, rem, scale;
let docEl = document.documentElement;
let metaEl = document.querySelector('meta[name="viewport"]');
let isIPhone = window.navigator.appVersion.match(/iphone/gi);

dpr = window.devicePixelRatio || 1;
// rem = docEl.clientWidth * dpr / 10;
rem = docEl.clientWidth / 10 * 2;
scale = 1 / dpr;

console.log("dpr:" + dpr);
// if (!isIPhone) {
//     dpr = 1;
// }

// metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');


docEl.setAttribute('data-dpr', dpr);
docEl.setAttribute('style', 'font-size:' + rem + 'px');

window.rem2px = function (v) {
    v = parseFloat(v);
    return v * rem;
}
window.px2rem = function (v) {
    v = parseFloat(v);
    return v / rem;
}
window.dpr = dpr;
window.rem = rem;


