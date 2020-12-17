"use strict";

function changeFilter(e) {
    e.preventDefault();
    e.currentTarget.classList.toggle("selected-semester");
    filterAndSortModules(e);
}

function filterAndSortModules(e) {
    const visibleSection = getVisibleSection();
    const selectedSemesters = getSelectedSemesters(visibleSection);
    const modules = getCorrespondingModules(visibleSection);
    const filteredModules = filterModules(modules, selectedSemesters);
    const filteredAndSortedModules = sortModulesByName(filteredModules, visibleSection);
    let buttonText;
    if (visibleSection.id === "completed-courses") {
        buttonText = "Completed";
    } else {
        buttonText = "Take course";
    }

    fillModules(`#${visibleSection.id}`, filteredAndSortedModules, buttonText);
}

function getSelectedSemesters(visibleSection) {
    const selectedSemesters = [];
    visibleSection.querySelectorAll(".filters li.selected-semester a").forEach(function (a) {
        selectedSemesters.push(a.innerHTML);
    })
    return selectedSemesters;
}

function getCorrespondingModules(visibleSection) {
    if (visibleSection.id === "completed-courses") {
        return modules;
    } else {
        return curriculumModules;
    }
}

function filterModules(modules, selectedSemesters) {
    const filteredModules = [];
    for (const module of modules) {
        if (selectedSemesters.includes(module["semester"])) {
            filteredModules.push(module);
            }
    }
    return filteredModules;
}

function sortModulesByName(filteredModules, visibleSection) {
    let sortOrder = visibleSection.querySelector(".filters select").value;
    if (sortOrder === "ascending") {
        sortOrder = 1;
    } else {
        sortOrder = -1;
    }
    filteredModules.sort(function (M01, M02) {
        if (M01["module"] > M02["module"]) {
            return sortOrder;
        } else if (M01["module"] < M02["module"]) {
            return -sortOrder;
        } else {
            return 0
        }
    })
    return filteredModules;
}
