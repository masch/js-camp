const jobListingSection = document.querySelector(".jobs-listings");

jobListingSection?.addEventListener('click', function (event) {
    const element = event.target;

    if (element.classList.contains('button-apply-job')) {
        element.textContent = "¡Aplicado!";
        element.classList.add("is-applied");
        element.disabled = true;
    }
})

// Comments with other methos

//const botones = document.querySelectorAll('.button-apply-job');

// botones.forEach(boton => {

//     boton.addEventListener('click', () => {
//         boton.textContent = "Aplicado!";
//         boton.classList.add("is-applied");
//         boton.disabled = true;
//     });

// })

// Another ways to add add click event listener


/*
const filter = document.querySelector("#filter-location");

filter?.addEventListener('change', function () {
    const selectedValue = filter.value;
})


const searchInput = document.querySelector("#empleos-search-input");

searchInput?.addEventListener('input', function () {
    const searchValue = searchInput.value;
})

searchInput?.addEventListener('blur', function () {
    const searchValue = searchInput.value;
})

const searchForm = document.querySelector("#empleos-search-form");

searchForm?.addEventListener('submit', function () {
    event.preventDefault();
    const searchValue = searchInput.value;
})
*/