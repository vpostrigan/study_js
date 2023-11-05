const message = 'Hello World';
alert(message);

// will add text 'Hello2' to '<div id="root"></div>'
const root = document.getElementById('root');
if (root) {
    root.innerHTML = 'Hello2';
}

// //

// object
class Home {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const home = new Home('Home1');
if (root) {
    root.innerHTML = root.innerHTML + ' ' + home.name;
    root.innerHTML = root.innerHTML + ` <b>${home.name}</b>`;
}
