const jobListingsSection = document.querySelector(".jobs-listings");
const loading = document.querySelector('#jobs-loading');

fetch("./data.json").then(response => response.json()).then(jobs => {
    if (loading) loading.remove()

    if (jobs.length === 0) {
        jobListingsSection.innerHTML = '<p>No hay empleos disponibles por ahora.</p>'
        return
    }

    jobs.forEach(job => {
        const article = document.createElement("article");
        article.classList.add("job-listing-card");
        article.dataset.modalidad = job.data.modalidad;
        article.dataset.nivel = job.data.nivel;
        article.dataset.technology = job.data.technology;
        article.innerHTML = `
            <div>
                <h3>${job.titulo}</h3>
                <small>${job.empresa} | ${job.ubicacion}</small>
                <p>${job.descripcion}</p>
            </div>
            <button class="button-apply-job"> Aplicar</button>
        `;
        jobListingsSection.appendChild(article);
    })

}).catch((error) => {
    if (loading) loading.textContent = 'No se pudieron cargar los empleos'
    console.error(error)
});