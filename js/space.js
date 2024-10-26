const boton = document.getElementById("btnBuscar");

// buscar el item
boton.addEventListener("click", () => {
    const input = document.getElementById("inputBuscar").value.toLowerCase();
    const API_URL = `https://images-api.nasa.gov/search?q=${input}`;
    let array = []; // array vacio para guardar los datos

    // fetch a la api
    fetch(API_URL)
        .then((response) => response.json()) // convierte la respuesta en json
        .then((data) => {
            array = data.collection.items; // guarda los datos en el array
            // console.log(array);

            const results = array.filter((data) => data.data[0].title.toLowerCase().includes(input)); // filtra los datos
            // console.log(results);
            showResults(results); // muestra los resultados
        });
});

function showResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";
    resultsContainer.classList.add("row", "g-4");

    results.forEach((item) => {
        const title = item.data[0].title;
        const description = item.data[0].description;
        const img = item.links[0].href;
        const date = item.data[0].date_created;

        const card = `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="${img}" class="card-img-top img-fluid" style="object-fit:cover; height: 200px;" alt="${title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text flex-grow-1 overflow-auto" style="max-height: 100px;">${description}</p>
                    <p class="card-text mt-auto"><small class="text-body-secondary">${date}</small></p>
                </div>
            </div>
        </div>
        `;
        resultsContainer.innerHTML += card;
    });
}
