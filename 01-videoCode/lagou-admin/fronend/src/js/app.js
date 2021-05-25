import "../css/index.sass";
import homeHtml from "../views/home.art"

const html = homeHtml()
const ul = document.createElement('div')
ul.innerHTML = html
document.body.appendChild(ul)

const x = 10
console.log(x);