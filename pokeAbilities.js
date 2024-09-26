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
const abilityTable = document.getElementById("abilityTable");

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

// function to convert the standard way generations are written in the pokeapi into something more friendly for this site
// this starts at gen 3 as that is the first generation to have abilities
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

// neat function to replace the standard dashes with spaces and capitalize the first letter of the string 
function cleanText(text){
 let noDashes = text.replace("-", " ")
 let caps = noDashes[0].toUpperCase() + noDashes.slice(1,)
 return caps
}

// call the api, iterate over and fetch each entry's url, then create a row and append to table
const abilityList = getPokeData("https://pokeapi.co/api/v2/ability/?limit=100000&offset=0").then(
    (response) => {
         response.results.map((x) =>
              getPokeData(x.url).then((response) => {
               abilityTable.appendChild(
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
         abilityTable.classList.add("bg-dark");
         abilityTable.classList.add("table-dark");
         abilityTable.classList.remove("d-none");
    }
);
