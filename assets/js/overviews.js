"use strict";

const modules01 = [
    {
        "module": "Problem Solving",
        "lecturer": "Brian Baert",
        "semester": "S1",
        "ects": 6,
        "colour": "yellow"
    },
    {
        "module": "Programming Fundamentals",
        "lecturer": "Mattias De Wael ",
        "semester": "S1",
        "ects": 6,
        "colour": "blue"
    },
    {
        "module": "Web Development",
        "lecturer": "Jill VandenDriessche",
        "semester": "S1",
        "ects": 6,
        "colour": "pink"
    },
    {
        "module": "Hardware and Desktop Operating Systems",
        "lecturer": "Koen Koreman",
        "semester": "S1",
        "ects": 6,
        "colour": "orange"
    }
];

document.addEventListener("DOMContentLoaded", init);

function init() {
    fillModules("#completed-courses", modules01, "Completed");
    fillModules("#curriculum-configurator", modules01, "Take course ")
}

function delegateModuleAction(e) {

}

function fillModules(selector, modules, buttonText) {
    const target = document.querySelector(`${selector} .modules`);
    removePredefinedModules(target);
    selectAllSemesters(selector);
    for (const module of modules) {
        let res = `<article>
                   <h2>${module["module"]}</h2>
                   <figure class="${module["colour"]}">
                       <figcaption>${generateCourseAbbreviation(module["module"])}</figcaption>
                   </figure>
                   <p>${module["ects"]}ECTS</p>
                   <h3>${module["lecturer"]}</h3>
                   <form method="post" action="#">
                       <button><span>${buttonText}</span></button>
                   </form>
                   </article>`;
        target.insertAdjacentHTML("beforeend", res);
    }
}

function removePredefinedModules(page) {
    page.innerHTML = "";
}

function selectAllSemesters(selector) {
    document.querySelectorAll(`${selector}  .filters li`).forEach(li => li.classList.add("selected-semester"));
}

function generateCourseAbbreviation(moduleName) {
    const splitName = moduleName.split(" ");
    for (let i=0; i < splitName.length; i++) {
        splitName[i] = splitName[i].charAt(0).toUpperCase();
    }
    return splitName.join("");
}
