"use strict";

function delegateModuleAction(e) {
    if (e.target.tagName === "BUTTON" ) {
        const visibleSection = getVisibleSection();
        if (visibleSection.id === "completed-modules") {
            handleCompletedModulesAction(e);
        } else {
            handleDesiredModuleAction();
        }
    }




    /*if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        if (getVisibleSection().id === "desired-modules") {
            let ECTSCurrentModule = parseInt(e.target.parentNode.querySelector("p").innerHTML[0]);
            let withdrawnECTS = computeTotalECTS(desiredModules) + ECTSCurrentModule;
            if (withdrawnECTS > getWithdrawnECTS()) {
                alert(`Unable to withdraw more ECTS than stated: ${getWithdrawnECTS()}`);
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
        if (modules === desiredModules) {
            fillQuickview();
        }
    }*/
}

function getCorrespondingArray() {
    const visibleSection = getVisibleSection();
    if (visibleSection.id === "completed-modules") {
        return completedModules;
    } else {
        return desiredModules;
    }
}

function computeTotalECTS(modules) {
    let selectedECTS = 0;
    for (const module of modules) {
        selectedECTS += parseInt(module["ects"]);
    }
    return selectedECTS;
}

function getWithdrawnECTS() {
    return JSON.parse(localStorage.getItem("person"))["ECTS"];
}

function filterArray(mainArray, arrayOfRedundancies) {
    return mainArray.filter(function (el) {
        return !arrayOfRedundancies.includes(el);
    })
}




function handleCompletedModulesAction(e) {
    let moduleName = e.target.parentNode.querySelector("h2").innerHTML;
    const completedModules = updateArrayOfModules(getItemFromLocalStorage("completedModules"), getModule(moduleName));
    sendItemToLocalStorage("completedModules", completedModules);
    toggleClass(e.target, "selected-module");
}

function handleDesiredModuleAction(){

}

function getModule(moduleName) {
    for (const module of modules) {
        if (module["module"] === moduleName) {
            return module;
        }
    }
}

function updateArrayOfModules(modules, module) {
    if (modules.includes(module)) {
        modules.splice(modules.indexOf(module));
    } else {
        modules.push(module);
    }
    return modules;
}

function toggleClass(el, className) {
    el.classList.toggle(className);
}



function fillModules(selector, modules, buttonText) {
    const parent = document.querySelector(`${selector} .modules`);
    removePreviousModules(parent);
    for (const module of modules) {
        let article = `<article>
                           <h2>${module["module"]}</h2>
                           <figure class="${getRandomColor()}">
                               <figcaption>${generateModuleAbbreviation(module["module"])}</figcaption>
                           </figure>
                           <p>${module["ects"]}ECTS</p>
                           <h3>${module["lecturer"]}</h3>
                           <button${checkModuleSelection(module, selector)}>${buttonText}</button>
                       </article>`;
        parent.insertAdjacentHTML("beforeend", article);
    }
}

function removePreviousModules(parent) {
    parent.innerHTML = "";
}

function getRandomColor() {
    const colors = ["green", "yellow", "pink", "orange", "blue", "purple"];
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateModuleAbbreviation(moduleName) {
    const splitName = moduleName.split(" ");
    for (let i = 0; i < splitName.length; i++) {
        splitName[i] = splitName[i].charAt(0).toUpperCase();
    }
    return splitName.join("");
}

function checkModuleSelection(module, id) {
    let selectedModules;
    if (id === "#completed-modules") {
        selectedModules = getItemFromLocalStorage("completedModules");
    } else {
        selectedModules = getItemFromLocalStorage("desiredModules");
    }

    if (selectedModules.includes(module)) {
        return " class='selected-module'";
    } else {
        return "";
    }

}



function validateWithdrawnECTS(e) {
    if (computeTotalECTS(desiredModules) !== getWithdrawnECTS()) {
        e.stopImmediatePropagation();
    }
}
