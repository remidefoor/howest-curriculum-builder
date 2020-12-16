"use strict";

function filterArray(mainArray, arrayOfRedundancies) {
    return mainArray.filter(function (el) {
        return !arrayOfRedundancies.includes(el);
    })
}

function delegateModuleAction(e) {
    if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        e.target.classList.toggle("selected-module");
        const moduleName = e.target.parentNode.querySelector("h2").innerHTML;
        const modules = getCorrespondingArray();
        updateArrayOfModules(modules, moduleName);
        if (modules === completedModules) {
            clearCurriculumConfigurator();
        }
    }
}

function getCorrespondingArray() {
    const visibleSection = document.querySelector("#left-aligned-content section:not(.hidden)");
    if (visibleSection.id === "completed-courses") {
        return completedModules;
    } else {
        return desiredModules;
    }
}

function updateArrayOfModules(arrayOfModules, moduleName) {
    const module = getModule(modules, moduleName);
    if (getModule(arrayOfModules, moduleName)) {
        arrayOfModules.splice(arrayOfModules.indexOf(module));
    } else {
        arrayOfModules.push(module);
    }
}

function getModule(modules, moduleName) {
    for (const module of modules) {
        if (module["module"] === moduleName) {
            return module;
        }
    }
    return false;
}

function clearCurriculumConfigurator() {
    curriculumModules = filterArray(modules, completedModules);
    fillModules("#curriculum-configurator", curriculumModules, "Take course");
    desiredModules = [];
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
