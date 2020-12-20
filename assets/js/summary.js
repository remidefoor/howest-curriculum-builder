"use strict";

function fillSummary(e) {
    let completedECTS = computeTotalECTS(getItemFromLocalStorage("completedModules")).toString();
    document.querySelector("#overview #completed-ECTS-counter p").innerHTML = completedECTS;
    let withdrawnECTS = getWithdrawnECTS();
    document.querySelector("#overview #desired-ECTS-counter p").innerHTML = withdrawnECTS;
    const table = document.querySelector("#overview table");
    fillTbody(table);
    filltfoot(table, completedECTS, withdrawnECTS);
}


function fillTbody(parent) {
    const sortedCompletedModules = sortModulesBySemester(getItemFromLocalStorage("completedModules"));
    const sortedDesiredModules = sortModulesBySemester(getItemFromLocalStorage("desiredModules"));
    let i = 0;
    while (i < sortedCompletedModules.length || i < sortedDesiredModules.length) {
        let leftPartTr = createTrPart(i, sortedCompletedModules, "left-part-table");
        let rightPartTr = createTrPart(i, sortedDesiredModules, "right-part-table");
        let tr = `${leftPartTr}
                  ${rightPartTr}`;
        parent.querySelector("tbody").insertAdjacentHTML("beforeend", tr);
        i += 1
    }
}

function createTrPart(i, modules, side) {
    let leftTr;
    if (i < modules.length) {
        leftTr = `<td class="${side} right-align">${modules[i]["semester"]}</td>
                  <td class="${side}">${modules[i]["module"]}</td> 
                  <td class="${side}">${modules[i]["ects"]}ECTS</td>`;
    } else {
        leftTr = `<td class="${side} right-align"></td>
                  <td class="${side}"></td>
                  <td class="${side}"></td>`;
    }
    if (modules === getItemFromLocalStorage("completedModules")) {
        return  leftTr = `<tr>
                              ${leftTr}`;
    } else {
        return leftTr = `    ${leftTr}
                         </tr>`;
    }
}

function filltfoot(parent, completedECTS, withdrawnECTS) {
    completedECTS = `<th class="left-part-table">${completedECTS}</th>`;
    parent.querySelector("tfoot th.left-part-table").insertAdjacentHTML("afterend", completedECTS);
    withdrawnECTS = `<th class="right-part-table">${withdrawnECTS}</th>`;
    parent.querySelector("tfoot th.right-part-table").insertAdjacentHTML("afterend", withdrawnECTS);
}
