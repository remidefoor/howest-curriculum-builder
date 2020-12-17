"use strict";

function fillSummary(e) {
    let completedECTS = computeTotalECTS(completedModules).toString();
    document.querySelector("#overview #completed-ECTS-counter p").innerHTML = completedECTS;
    let withdrawnECTS = getWithdrawnECTS();
    document.querySelector("#overview #desired-ECTS-counter p").innerHTML = withdrawnECTS;
    const table = document.querySelector("#overview table");
    fillTbody(table);
    filltfoot(table, completedECTS, withdrawnECTS);
}


function fillTbody(parent) {

}

function filltfoot(parent, completedECTS, withdrawnECTS) {
    completedECTS = `<th class="left-part-table">${completedECTS}</th>`;
    parent.querySelector("tfoot th.left-part-table").insertAdjacentHTML("afterend", completedECTS);
    withdrawnECTS = `<th class="right-part-table">${withdrawnECTS}</th>`;
    parent.querySelector("tfoot th.right-part-table").insertAdjacentHTML("afterend", withdrawnECTS);
}
