"use strict";

/* Declare any global variables below this line, but before the first function call */

document.addEventListener("DOMContentLoaded", init);

function init() {

    // Fillings

    // Bindings
    document.querySelectorAll(".navigation-links a").forEach(a => a.addEventListener("click", handleNavigation));
    // Delegates

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
