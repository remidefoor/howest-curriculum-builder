"use strict";

/* Declare any global variables below this line, but before the first function call */
let completedModules = [];
let curriculumModules = modules;
let desiredModules = [];

document.addEventListener("DOMContentLoaded", init);

function init() {
    // Fillings
    fillModules("#completed-courses", modules, "Completed");
    fillModules("#curriculum-configurator", curriculumModules, "Take course");
    // Bindings
    document.querySelector(".navigation-links a[href='#overview']").addEventListener("click", validateWithdrawnECTS);
    document.querySelectorAll(".navigation-links a").forEach(a => a.addEventListener("click", handleNavigation));
    document.querySelector(".navigation-links a[href='#overview']").addEventListener("click", fillSummary);
    document.querySelector(".navigation-links a[href='#submission']").addEventListener("click", removeUserData);
    document.querySelectorAll(".filters select").forEach(select => select.addEventListener("change", filterAndSortModules));
    // Delegates
    document.querySelectorAll(".filters li").forEach(li => li.addEventListener("click", changeFilter));
    document.querySelectorAll(".modules").forEach(div => div.addEventListener("click", delegateModuleAction));
    // Other initialisations
}

function handleNavigation(e) {
    const currentPage = document.querySelector
    ("#left-aligned-content section:not(.hidden), #left-aligned-content > article:not(.hidden)");
    const nextPage = e.target.getAttribute("href");
    switchPage(currentPage, nextPage);
}

function switchPage(previousPage,nextPage){
    previousPage.classList.add("hidden");
    document.querySelector(nextPage).classList.remove("hidden");
}
