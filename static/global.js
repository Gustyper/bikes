// alert("IT’S ALIVE!");

// function $$ (selector, context = document) {
//     return Array.from(context.querySelectorAll(selector));
// }

// let navLinks = $$("nav a");

// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);

// if (currentLink) { // or if (currentLink !== undefined)
//     currentLink.classList.add("current");
// }

// //o IF de cima pode ser escrito como:
// //currentLink?.classList.add("current");



//------------------------------------------ SEGUNDA PARTE (automatizar todo o nav)

const ARE_WE_HOME = document.documentElement.classList.contains("home");

let pages = [
    // {url: ".", title: "Home"},
    {url: "https://github.com/Gustyper", title: "Github"},
    // add the rest of your pages here
];

let nav = document.createElement("nav");
document.body.prepend(nav);

// document.body.insertAdjacentHTML("afterbegin", `
//     <label class="color-scheme">
//         Theme:
//         <select>
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//             <option value="auto">Automatic</option>
//         </select>
//     </label>`
// );

// TODO terminar