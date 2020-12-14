"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    //Delegates
    document.forms["personal-data"].addEventListener("submit", processPersonalData);
}

function processPersonalData(e) {
    e.preventDefault();
    const person = {name: "", email: "", ECTS: NaN};
    person["name"] = e.currentTarget["name"].value;
    person["email"] = e.currentTarget["email"].value;
    person["ECTS"] = parseInt(e.currentTarget["available-ECTS"].value);
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

}

//export {processPersonalData};
