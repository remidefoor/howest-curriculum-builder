"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    fillModules("#completed-courses", modules, "Completed");
}

function delegateModuleAction(e) {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
        e.target.classList.toggle("selected-module");

    }
}

function findModule(moduleName) {
    for (const module in modules) {
        if (module["module"] === moduleName) {
            return module;
        }
    }
}

function fillModules(selector, modules, buttonText) {
    const target = document.querySelector(`${selector} .modules`);
    removePredefinedModules(target);
    for (const module of modules) {
        let html = `<article>
                    <h2>${module["module"]}</h2>
                    <figure class="${module["colour"]}">
                        <figcaption>${generateCourseAbbreviation(module["module"])}</figcaption>
                    </figure>
                    <p>${module["ects"]}ECTS</p>
                    <h3>${module["lecturer"]}</h3>
                    <button>${buttonText}</button>
                    </article>`;
        target.insertAdjacentHTML("beforeend", html);
    }
}

function removePredefinedModules(currentSection) {
    currentSection.innerHTML = "";
}

function generateCourseAbbreviation(moduleName) {
    const splitName = moduleName.split(" ");
    for (let i=0; i < splitName.length; i++) {
        splitName[i] = splitName[i].charAt(0).toUpperCase();
    }
    return splitName.join("");
}
