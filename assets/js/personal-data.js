"use strict";

function processPersonalData(e) {
    e.preventDefault();
    const person = {name: "", email: "", ECTS: NaN};
    person["name"] = e.currentTarget["name"].value;
    person["email"] = e.currentTarget["email"].value;
    person["ECTS"] = parseInt(e.currentTarget["available-ECTS"].value);
    if (validateData(person)) {
        savePersonalData(person);
        fillQuickview();
        switchPage(document.querySelector("#personal-data"), document.querySelector("#completed-courses"));
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

function savePersonalData(person){
    sendItemToLocalStorage("person", person);
}


function fillPersonalData() {
    const form = document.forms["personal-data"];
    const user = getItemFromLocalStorage("person");
    form["name"].value = user["name"];
    form["email"].value = user["email"];
    form["available-ECTS"].value = user["ECTS"];
}


function removeUserData(e) {
    localStorage.removeItem("person");
    localStorage.removeItem("completedModules");
    localStorage.removeItem("desiredModules");
}
