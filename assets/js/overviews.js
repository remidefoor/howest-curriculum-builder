"use strict";

function delegateModuleAction(e) {
    if (e.target.tagName === "BUTTON" ) {
        const visibleSection = getVisibleSection();
        if (visibleSection.id === "completed-modules") {
            handleCompletedModuleAction(e);
        } else {
            handleDesiredModuleAction(e);
        }
    }
}

function filterArray(mainArray, arrayOfRedundancies) {
    return mainArray.filter(function (module) {
        return !checkPresenceModule(arrayOfRedundancies, module);
    })
}




function handleCompletedModuleAction(e) {
    const module = getModule(getModuleName(e));
    const completedModules = updateArrayOfModules(getItemFromLocalStorage("completedModules"), module);
    sendItemToLocalStorage("completedModules", completedModules);
    toggleClass(e.target, "selected-module");
    if (e.target.classList.contains("selected-module")) {
        const desiredModules = getItemFromLocalStorage("desiredModules");
        if (checkPresenceModule(desiredModules, module)) {
            desiredModules.splice(getIndexOfModule(desiredModules, module), 1);
            sendItemToLocalStorage("desiredModules", desiredModules);
            fillQuickview();
        }
    }
    updateDesiredModulesSection();
}

function handleDesiredModuleAction(e){
    const module = getModule(getModuleName(e));
    let desiredModules = getItemFromLocalStorage("desiredModules");
    if (!e.target.classList.contains("selected-module")) {
        let withdrawnECTS = getWithdrawnECTS();
        let allocatedECTS = computeTotalECTS(desiredModules) + module["ects"];
        if (allocatedECTS > withdrawnECTS) {
            alert("Unable to allocate more ECTS than withdrawn");
            return false;
        }
        const allocatedSemesters = getAllocatedSemesters(getItemFromLocalStorage("desiredModules"));
        if (!determineAllocatableSemesters(allocatedSemesters).includes(module["semester"])) {
            displayPossibilities(determineAllocatableSemesters(allocatedSemesters), e);
            return false;
        }
    }
    desiredModules = updateArrayOfModules(desiredModules, module);
    sendItemToLocalStorage("desiredModules", desiredModules);
    toggleClass(e.target, "selected-module");
    fillQuickview();
}

function displayPossibilities(allocatableSemesters, e) {
    document.querySelectorAll("#desired-modules .filters a").forEach(function (a) {
        if (allocatableSemesters.includes(a.innerHTML)) {
            a.parentNode.classList.add("selected-semester");
        } else {
            a.parentNode.classList.remove("selected-semester");
        }
    });
    filterAndSortModules(e);
}

function determineAllocatableSemesters(allocatedSemesters) {
    let allocatableSemesters;
    switch (allocatedSemesters.length) {
        case 1:
            let semester = parseInt(allocatedSemesters[0][1]);
            allocatableSemesters = [createSemester(semester, -2), createSemester(semester, -1),
                                   createSemester(semester), createSemester(semester, 1),
                                   createSemester(semester, 2)];
            break;
        case 2:
            let semester01 = parseInt(allocatedSemesters[0][1]);
            let semester02 = parseInt(allocatedSemesters[1][1]);
            if ((semester01 + 1) === semester02) {
                allocatableSemesters = [createSemester(semester01, -1), createSemester(semester01),
                                       createSemester(semester02), createSemester(semester02, 1)];
            } else {
                allocatableSemesters = [createSemester(semester01), createSemester(semester01, 1),
                                        createSemester(semester02)];
            }
            break;
        case 3:
            allocatableSemesters = allocatedSemesters;
            break;
        default:
            allocatableSemesters = ["S1", "S2", "S3", "S4", "S5", "S6"];
    }
    return allocatableSemesters;
}

function createSemester(semester, step=0) {
    let newSemester = semester + step;
    return `S${newSemester}`;
}

function getAllocatedSemesters(modules) {
    modules = sortModulesBySemester(modules);
    const allocatedSemesters = [];
    for (const module of modules) {
        if (!allocatedSemesters.includes(module["semester"])) {
            allocatedSemesters.push(module["semester"]);
        }
    }
    return allocatedSemesters;
}

function getModuleName(e) {
    return e.target.parentNode.querySelector("h2").innerHTML;
}

function getWithdrawnECTS() {
    return getItemFromLocalStorage("person")["ECTS"];
}

function computeTotalECTS(modules) {
    let ECTS = 0;
    for (const module of modules) {
        ECTS += module["ects"];
    }
    return ECTS;
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



function validateAllocatedECTS(e) {
    if (computeTotalECTS(getItemFromLocalStorage("desiredModules")) < getWithdrawnECTS()) {
        e.stopImmediatePropagation();
    }
}
