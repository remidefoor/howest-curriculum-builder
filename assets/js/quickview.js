"use strict";

function fillQuickview() {
    let allocatedECTS = computeAllocatedECTS();
    document.querySelector("#allocated-ECTS").innerHTML = allocatedECTS;
    let withdrawnECTS = getWithdrawnECTS();
    let unallocatedECTS = withdrawnECTS - allocatedECTS;
    document.querySelector("#unallocated-ECTS").innerHTML = `${unallocatedECTS} ECTS left`;
    progressBar(withdrawnECTS, allocatedECTS);
}

function progressBar(desiredECTS, totalECTS){
    let percentageAllocatedECTS = Math.round((totalECTS / desiredECTS) * 100);
    document.querySelector("#percentage-allocated-ECTS").innerHTML = `${percentageAllocatedECTS}% desired ects allocated`;
    const progressBar = document.querySelector("#progress-bar");
    progressBar.className = determineProgressBarColor(percentageAllocatedECTS);
    progressBar.style.width = `${percentageAllocatedECTS}%`;
}

function determineProgressBarColor(percentageAllocatedECTS) {
    let color;
    switch (true) {
        case (percentageAllocatedECTS < 25):
            return  color = "pink";
        case (percentageAllocatedECTS < 50):
            return color = "orange";
        case (percentageAllocatedECTS < 75):
            return  color = "yellow";
        case (percentageAllocatedECTS < 100):
            return color = "green";
        default:
            return color = "white";
    }
}

function ectsPerSemester(){

}

function sortModulesBySemester(modules) {
    return modules.sort(function (M01, M02) {
        if (M01["semester"] < M01["semester"]) {
            return -1
        } else if (M01["semester"] > M02["semester"]) {
            return 1
        } else {
            if (M01["module"] < M02["module"]) {
                return -1
            } else if (M01["module"] > M02["module"]) {
                return 1
            } else {
                return 0
            }
        }
    });
}

