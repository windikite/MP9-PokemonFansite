// fetch function
const getPokeData = async (url) => {
    try {
        //  console.log(`fetching ${url}`);
         const response = await fetch(url);
         const fetched_data = await response.json();
         return await fetched_data;
    } catch (error) {
         console.error(error);
         return [];
    }
};

// function to quickly create a row for a table
function createRow(...content) {
    let new_row = document.createElement("tr");
    const new_cells = content.map((x) => {
         let new_td = document.createElement("td");
         new_td.innerHTML = x;
         return new_td;
    });
    new_cells.forEach((x) => new_row.appendChild(x));
    return new_row;
}

function cleanText(text){
    let noDashes = text.replace("-", " ")
    let caps = noDashes[0].toUpperCase() + noDashes.slice(1,)
    return caps
   }

// document element hooks
const moveTable = document.getElementById("moveTable");

const moveList = getPokeData("https://pokeapi.co/api/v2/move/?limit=50").then(response => {
    moveTable.classList.remove("d-none");
    response.results.map(x => getPokeData(x.url).then(response => {
        // console.log(response)
        moveTable.appendChild(createRow(cleanText(response.type.name), cleanText(response.name), response.power, response.accuracy, response.pp, response.effect_entries[0].short_effect))
        return response
    }))
    moveTable.classList.add("bg-dark");
    moveTable.classList.add("table-dark");
    moveTable.classList.add("table-striped");
})
