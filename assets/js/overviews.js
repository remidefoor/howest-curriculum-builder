"use strict";

function getVisibleSection() {
    return document.querySelector
    ("#left-aligned-content section:not(.hidden), #left-aligned-content > article:not(.hidden)");
}

function delegateModuleAction(e) {
    if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        if (getVisibleSection().id === "curriculum-configurator") {
            let ECTSCurrentModule = parseInt(e.target.parentNode.querySelector("p").innerHTML[0]);
            let withdrawnECTS = computeWithdrawnECTS(e) + ECTSCurrentModule;
            if (withdrawnECTS > getStatedECTS()) {
                alert(`Unable to withdraw more ECTS than stated: ${getStatedECTS()}`);
                return false;
            }
        }

        e.target.classList.toggle("selected-module");
        const moduleName = e.target.parentNode.querySelector("h2").innerHTML;
        const modules = getCorrespondingArray();
        updateArrayOfModules(modules, moduleName);
        if (modules === completedModules) {
            resetCurriculumConfigurator();
        }
    }
}

function getCorrespondingArray() {
    const visibleSection = getVisibleSection();
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

function resetCurriculumConfigurator() {
    const curriculumConfigurator = document.querySelector("#curriculum-configurator");
    curriculumConfigurator.querySelectorAll(".filters li").forEach(function (li) {
        li.classList.add("selected-semester");
    })
    curriculumConfigurator.querySelector(".filters select").selectedIndex = "0";
    curriculumModules = filterArray(modules, completedModules);
    fillModules("#curriculum-configurator", curriculumModules, "Take course");
    curriculumConfigurator.querySelectorAll(".modules button").forEach(function (button) {
        button.classList.remove("selected-module");
    })
    desiredModules = [];
}

function computeWithdrawnECTS(e) {
    let selectedECTS = 0;
    for (const module of desiredModules) {
        selectedECTS += parseInt(module["ects"]);
    }
    return selectedECTS;
}

function getStatedECTS() {
    return JSON.parse(localStorage.getItem("person"))["ECTS"];
}

function filterArray(mainArray, arrayOfRedundancies) {
    return mainArray.filter(function (el) {
        return !arrayOfRedundancies.includes(el);
    })
}

function fillModules(selector, modules, buttonText) {
    const target = document.querySelector(`${selector} .modules`);
    const selectedModules = getSelectedModules(target);
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
    reselectModules(target, selectedModules);
}

function getSelectedModules(visibleSection) {
    const selectedModules = [];
    visibleSection.querySelectorAll("button.selected-module").forEach(function (button) {
        selectedModules.push(button.parentNode.querySelector("h2").innerHTML);
    });
    return selectedModules;
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

function reselectModules(target, selectedModules) {
    target.querySelectorAll("article").forEach(function (module){
        if (selectedModules.includes(module.querySelector("h2").innerHTML)) {
            module.querySelector("button").classList.add("selected-module");
        }
    });
}

function validateWithdrawnECTS(e) {
    if (computeWithdrawnECTS(e) !== getStatedECTS()) {
        e.stopImmediatePropagation();
    }
}
