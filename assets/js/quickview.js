"use strict";

function fillQuickview() {
    let allocatedECTS = computeAllocatedECTS().toString();
    document.querySelector("#allocated-ECTS").innerHTML = allocatedECTS;
    let withdrawnECTS = getWithdrawnECTS();
    let unallocatedECTS = withdrawnECTS - allocatedECTS.toString();
    document.querySelector("#unallocated-ECTS").innerHTML = `${unallocatedECTS} ECTS left`;
}

function progressBar(desiredECTS, totalECTS){

}

function ectsPerSemester(){

}

