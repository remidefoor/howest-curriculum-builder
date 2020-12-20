"use strict";

/* Declare any global variables below this line, but before the first function call */

document.addEventListener("DOMContentLoaded", init);

function init() {
    // Other initialisations
    if (!getItemFromLocalStorage("person")) {
        initializeLocalStorage();
    }

    // Fillings
    if (getItemFromLocalStorage("person")) {
        fillPersonalData();
    }
    fillModules("#completed-modules", modules, "Completed");
    fillModules("#desired-modules", modules, "Take course");
    // Bindings
    document.querySelector(".navigation-links a[href='#overview']").addEventListener("click", validateWithdrawnECTS);
    document.querySelectorAll(".navigation-links a").forEach(a => a.addEventListener("click", handleNavigation));
    document.querySelector(".navigation-links a[href='#overview']").addEventListener("click", fillSummary);
    document.querySelector(".navigation-links a[href='#submission']").addEventListener("click", removeUserData);
    document.forms["personal-data"].addEventListener("submit", processPersonalData);
    document.querySelectorAll(".filters select").forEach(select => select.addEventListener("change", filterAndSortModules));
    // Delegates
    document.querySelectorAll(".filters li").forEach(li => li.addEventListener("click", changeFilter));
    document.querySelectorAll(".modules").forEach(div => div.addEventListener("click", delegateModuleAction));
}


function initializeLocalStorage() {
    const completedModules = [];
    sendItemToLocalStorage("completedModules", completedModules);
    const desiredModules = [];
    sendItemToLocalStorage("desiredModules", desiredModules);
}


function handleNavigation(e) {
    const visibleSection = getVisibleSection();
    const nextPage = e.target.getAttribute("href");
    switchPage(visibleSection, nextPage);
}

function switchPage(previousPage, nextPage){
    previousPage.classList.add("hidden");
    document.querySelector(nextPage).classList.remove("hidden");
}



function sendItemToLocalStorage(name, item) {
    localStorage.setItem(name, JSON.stringify(item));
}

function getItemFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}


function getVisibleSection() {
    return document.querySelector("#left-aligned-content > article:not(.hidden), #left-aligned-content section:not(.hidden)");
}
