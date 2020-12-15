"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    // fillings
    restoreUserData();
    // delegates
    document.forms["personal-data"].addEventListener("submit", processPersonalData);
}

function restoreUserData() {
    const user = JSON.parse(localStorage.getItem("person"));
    if (user) {
        const form = document.forms["personal-data"];
        form["name"].value = user["name"];
        form["email"].value = user["email"];
        form["available-ECTS"].value = user["ECTS"];
    }
}

function processPersonalData(e) {
    e.preventDefault();
    const person = {name: "", email: "", ECTS: NaN};
    person["name"] = e.currentTarget["name"].value;
    person["email"] = e.currentTarget["email"].value;
    person["ECTS"] = parseInt(e.currentTarget["available-ECTS"].value);
    if (validateData(person)) {
        savePersonalData(person);
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
    localStorage.setItem("person", JSON.stringify(person));
    document.querySelector("#personal-data").classList.add("hidden");
    document.querySelector("#completed-courses").classList.remove("hidden");
}

//export {processPersonalData};
