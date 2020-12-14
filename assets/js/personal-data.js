"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    //Delegates
    document.querySelector("#personal-data form").addEventListener("submit", processPersonalData);
}

function processPersonalData(e) {
    e.preventDefault();
    const person = {};
    person["name"] = e.currentTarget.querySelector("input[id='name']").value;
    person["email"] = e.currentTarget.querySelector("input[id='email']").value;
    person["ECTS"] = parseInt(e.currentTarget.querySelector("input[id='available-ECTS']").value);
}

function validateData(person){

}

function savePersonalData(person){

}

//export {processPersonalData};
