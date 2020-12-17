"use strict";

function fillQuickview() {
    let allocatedECTS = computeAllocatedECTS();
    document.querySelector("#allocated-ECTS").innerHTML = allocatedECTS;
    let withdrawnECTS = getWithdrawnECTS();
    let unallocatedECTS = withdrawnECTS - allocatedECTS;



}

function progressBar(desiredECTS, totalECTS){

}

function ectsPerSemester(){

}

