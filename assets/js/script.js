"use strict";

/* Declare any global variables below this line, but before the first function call */

document.addEventListener('DOMContentLoaded', init);

function init() {

    // Fillings

    // Bindings
    document.querySelectorAll('.navigation-links a').forEach(a => a.addEventListener('click', handleNavigation));
    // Delegates

    // Other initialisations

}


function handleNavigation(e) {
    e.preventDefault();
    const currentPage = document.querySelector
    ('#left-aligned-content section:not(.hidden), #left-aligned-content > article:not(.hidden)');
    const nextPage = e.target.getAttribute("href");
    console.log(currentPage);
    console.log(nextPage);

}

function switchPage(previousPage,nextPage){

}
