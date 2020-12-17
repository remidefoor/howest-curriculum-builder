"use strict";

function fillSummary(e) {
    let completedECTS = computeTotalECTS(completedModules).toString();
    document.querySelector("#overview #completed-ECTS-counter p").innerHTML = completedECTS;
    let withdrawnECTS = getWithdrawnECTS();
    document.querySelector("#overview #desired-ECTS-counter p").innerHTML = getWithdrawnECTS();
}


function fillTbody(parent) {

}

function filltfoot(parent) {

}
