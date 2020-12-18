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
    let i = 0;
    while (i < completedModules.length || i < desiredModules.length) {
        let tr = `<tr>
                      <td class="left-part-table right-align">${completedModules[i]["semester"]}</td>
                      <td class="left-part-table">${completedModules[i]["module"]}</td>
                      <td class="left-part-table">${completedModules[i]["ects"]}ECTS</td>
                      <td class="right-part-table right-align">${desiredModules[i]["semester"]}</td>
                      <td class="right-part-table">${desiredModules[i]["module"]}</td>
                      <td class="right-part-table">${desiredModules[i]["ects"]}ECTS</td>
                  </tr>`;
        parent.querySelector("tbody").insertAdjacentHTML("beforeend", tr);
        i += 1
    }
}

function filltfoot(parent, completedECTS, withdrawnECTS) {
    completedECTS = `<th class="left-part-table">${completedECTS}</th>`;
    parent.querySelector("tfoot th.left-part-table").insertAdjacentHTML("afterend", completedECTS);
    withdrawnECTS = `<th class="right-part-table">${withdrawnECTS}</th>`;
    parent.querySelector("tfoot th.right-part-table").insertAdjacentHTML("afterend", withdrawnECTS);
}
