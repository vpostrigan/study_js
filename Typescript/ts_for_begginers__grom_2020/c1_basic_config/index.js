"use strict";
var message = 'Hello World';
alert(message);
// will add text 'Hello2' to '<div id="root"></div>'
var root = document.getElementById('root');
if (root) {
    root.innerHTML = 'Hello2';
}
// object
var Home = /** @class */ (function () {
    function Home(name) {
        this.name = name;
    }
    return Home;
}());
var home = new Home('Home1');
if (root) {
    root.innerHTML = root.innerHTML + ' ' + home.name;
    root.innerHTML = root.innerHTML + " <b>".concat(home.name, "</b>");
}
