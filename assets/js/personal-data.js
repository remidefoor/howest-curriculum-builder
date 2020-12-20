"use strict";

function fillPersonalData() {
    const form = document.forms["personal-data"];
    const user = getItemFromLocalStorage("person");
    form["name"].value = user["name"];
    form["email"].value = user["email"];
    form["available-ECTS"].value = user["ECTS"];
}


function processPersonalData(e) {
    e.preventDefault();
    const person = {name: "", email: "", ECTS: NaN};
    person["name"] = e.currentTarget["name"].value;
    person["email"] = e.currentTarget["email"].value;
    person["ECTS"] = parseInt(e.currentTarget["available-ECTS"].value);
    if (validateData(person)) {
        if (getItemFromLocalStorage("person")) {
            if (!compareObjects(person, getItemFromLocalStorage("person"))) {
                resetModules();
            }
        }
        savePersonalData(person);
        fillQuickview();
        switchPage(document.querySelector("#personal-data"), "#completed-modules");
    }
}

function validateData(person){
    if (person["name"].length < 2) {
        return false;
    }
    if (person["email"].length === 0) {
        return false;
    }
    if (!Number.isInteger(person["ECTS"]) || (person["ECTS"] < 3 || person["ECTS"] > 60)) {
        return false;
    }
    return true;
}

function compareObjects(object01,object02) {
    const keysObject01 = Object.keys(object01);
    for (const key of keysObject01) {
        if (object01[key] !== object02[key]) {
            return false;
        }
    }
    return true;
}

function resetModules() {
    initializeModulesInLocalStorage();
    fillModules("#completed-modules", modules, "Completed");
    fillModules("#desired-modules", filterArray(modules, getItemFromLocalStorage("completedModules")), "Take course");
}

function savePersonalData(person){
    sendItemToLocalStorage("person", person);
}


function removeUserData(e) {
    localStorage.removeItem("person");
    localStorage.removeItem("completedModules");
    localStorage.removeItem("desiredModules");
}
