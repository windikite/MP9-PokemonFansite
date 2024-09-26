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

// document element hooks
const moveTable = document.getElementById("moveTable");

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

function convertGeneration(gen){
 if(gen == "generation-iii"){
   return "R/S/E/Fr/Lg"
 }else if(gen == "generation-iv"){
   return "D/P/Pt"
 }else if(gen == "generation-v"){
   return "B/W/B2/W2"
 }else if(gen == "generation-vi"){
   return "ORAS/X/Y"
 }else if(gen == "generation-vii"){
   return "S/M/US/UM"
 }else if(gen == "generation-viii"){
   return "Sw/Sh"
 }else if(gen == "generation-ix"){
   return "S/V"
 }
}

function cleanText(text){
 let noDashes = text.replace("-", " ")
 let caps = noDashes[0].toUpperCase() + noDashes.slice(1,)
 return caps
}

const moveList = getPokeData("https://pokeapi.co/api/v2/ability/?limit=100000&offset=0").then(
    (response) => {
         moveTable.classList.remove("d-none");
         // console.log(response)
         response.results.map((x) =>
              getPokeData(x.url).then((response) => {
                   console.log(response.effect_entries[1].short_effect)
                   moveTable.appendChild(
                        createRow(
                             cleanText(response.name),
                             response.effect_entries[1].short_effect,
                             response.pokemon.length,
                             convertGeneration(response.generation.name)
                        )
                   );
                   return response;
              })
         );
         moveTable.classList.add("bg-dark");
         moveTable.classList.add("table-dark");
         moveTable.classList.add("table-striped");
    }
);
