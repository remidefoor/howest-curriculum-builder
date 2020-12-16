"use strict";

/* Declare any global variables below this line, but before the first function call */
const completedModules = [];

document.addEventListener("DOMContentLoaded", init);

function init() {

    // Fillings

    // Bindings
    document.querySelectorAll(".navigation-links a").forEach(a => a.addEventListener("click", handleNavigation));
    document.querySelectorAll(".filters select").forEach(select => select.addEventListener("change", filterAndSortModules));
    // Delegates
    document.querySelectorAll(".filters li").forEach(li => li.addEventListener("click", changeFilter));
    document.querySelector("#completed-courses .modules").addEventListener("click", delegateModuleAction);

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
