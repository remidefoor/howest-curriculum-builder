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
    const module = getModule(moduleName);
    const completedModules = updateArrayOfModules(getItemFromLocalStorage("completedModules"), module);
    sendItemToLocalStorage("completedModules", completedModules);
    toggleClass(e.target, "selected-module");
    if (e.target.matches("selected-module")) {
        const desiredModules = getItemFromLocalStorage("desiredModules");
        if (checkPresenceModule(desiredModules, module)) {
            desiredModules.splice(getIndexOfModule(desiredModules, module));
            sendItemToLocalStorage("desireModules", desiredModules);
            fillQuickview();
        }
    }
    updateDesiredModulesSection();
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
    if (checkPresenceModule(modules, module)) {
        console.log(getIndexOfModule(modules, module));
        modules.splice(getIndexOfModule(modules, module), 1);
    } else {
        modules.push(module);
    }
    return modules;
}

function getIndexOfModule(modules, module) {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i]["module"] === module["module"]) {
            return i;
        }
    }
    return NaN;
}

function toggleClass(el, className) {
    el.classList.toggle(className);
}

function checkPresenceModule(modules, module) {
    return modules.some(moduleOfArray => moduleOfArray["module"] === module["module"]);
}

function updateDesiredModulesSection() {
    const section = document.querySelector("#desired-modules");
    resetSemesters(section);
    resetSelect(section);
    const uncompletedModules = filterArray(modules, getItemFromLocalStorage("completedModules"));
    fillModules("#desired-modules", uncompletedModules, "Take course");
}

function resetSemesters(section) {
    section.querySelectorAll(".filters li").forEach(function (li) {
        li.classList.add("selected-semester")
    });
}

function resetSelect(section) {
    section.querySelector(".filters select").selectedIndex = 0;
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

    if (checkPresenceModule(selectedModules, module)) {
        return " class='selected-module'";
    } else {
        return "";
    }

}

function compareTwoModules(M01, M02) {
    return M01["module"] === M02["module"];
}



function validateWithdrawnECTS(e) {
    if (computeTotalECTS(desiredModules) !== getWithdrawnECTS()) {
        e.stopImmediatePropagation();
    }
}
