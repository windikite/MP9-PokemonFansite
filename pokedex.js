const getPokeData = async () => {
    try {
         const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/?limit=1500`
         );
         const fetched_data = await response.json();
         return await fetched_data;
    } catch (error) {
         console.error(error);
         return [];
    }
};

const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("searchInput");

const matchContainer = document.getElementById("matchContainer");

const pokedex = [];

getPokeData().then((result) => {
    searchForm.classList.remove("d-none");
    result.results.forEach((x, i) => {
         let new_entry = {};
         new_entry.name = x.name;
         new_entry.url = x.url;
         new_entry.ID = i + 1;
         pokedex.push(new_entry);
    });
});

let filteredResults = [];

function createElementWithClasses(element, classes) {
    let new_element = document.createElement(element);
    classes.forEach((x) => new_element.classList.add(x));
    return new_element;
}

function updateMatches(text) {
    filteredResults = pokedex.filter((x) => {
         return x.name.includes(text) || x.ID == text;
    });
    while (matchContainer.hasChildNodes()) {
         matchContainer.removeChild(matchContainer.firstChild);
    }
    const pokemonToDisplay = filteredResults.slice(0, 15);
    pokemonToDisplay.forEach((x) => {
         let new_div = createElementWithClasses("div", [
              "bg-dark-subtle",
              "text-dark",
              "mb-1",
              "rounded",
              "p-1",
              "ps-3",
              "row",
              "d-flex",
              "align-items-center"
         ]);
         let new_text = createElementWithClasses("p", [
              "col-sm-8",
              "mt-0",
              "mb-0",
              "text-center"
         ]);
         let new_button = createElementWithClasses("a", [
              "btn",
              "btn-outline-primary",
              "btn-sm",
              "pokeDetails",
              "col-sm-4"
         ]);
         new_text.innerHTML = `${x.name[0].toUpperCase()}${x.name.slice(
              1
         )} - #${x.ID}`;
         new_button.innerHTML = "View";
         new_button.addEventListener("click", function (event) {
              localStorage.setItem("fetchUrl", x.url);
         });
         new_button.href = "/pokeDetails.html";
         new_button.role = "button";
         new_div.appendChild(new_text);
         new_div.appendChild(new_button);
         matchContainer.appendChild(new_div);
    });
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
});

searchInput.addEventListener("input", function (event) {
    updateMatches(event.target.value);
});

// updateMatches("");