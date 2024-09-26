// fetch function
const getPokeData = async (url) => {
    try {
         const response = await fetch(url);
         const fetched_data = await response.json();
         return await fetched_data;
    } catch (error) {
         console.error(error);
         return [];
    }
};

// document element hooks
const detailsContainer = document.getElementById("detailsContainer");
const mainSprite = document.getElementById("mainSprite");
const pokeName = document.getElementById("pokeName");
const pokeNumber = document.getElementById("pokeNumber");
const pokeType = document.getElementById("pokeType");
const pokeAbilities = document.getElementById("pokeAbilities");
const pokeHiddenAbilities = document.getElementById("pokeHiddenAbilities");
const pokeStats = document.getElementById("pokeStats");
const pokeExp = document.getElementById("pokeExp");
const pokeHW = document.getElementById("pokeHW");
const levelUpMoves = document.getElementById("levelUpMoves");
const tmMoves = document.getElementById("tmMoves");

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

// initialize fetch and use of data
getPokeData(localStorage.getItem("fetchUrl")).then((result) => {
    //      when the data is successfully fetched, allow the page content to be displayed
    detailsContainer.classList.remove("d-none");
    //      capitalize the name and add it to page
    pokeName.innerHTML = `${result.name[0].toUpperCase()}${result.name.slice(
         1
    )}`;
    console.log(Object.keys(result));
    //add main sprite to page
    mainSprite.src = result.sprites.front_default;
    //add types
    let types = result.types.map(function (type) {
         return cleanText(type.type.name);
    });
    pokeType.innerHTML = types.join(" / ");
    //add pokemon number
    console.log(result)
    pokeNumber.innerHTML = `${result.id}`;
    //      add pokemon height/weight
    pokeHW.innerHTML = `${result.height}ft / ${result.weight}lbs`;
    //      stats
    const stats = Object.values(result.stats).map((x) => {
         let new_stat = {
              name: cleanText(x.stat.name),
              amount: x.base_stat
         };
         // console.log(new_stat)
         return new_stat;
    });
    stats.forEach((x) => {
         pokeStats.appendChild(createRow(x.name, x.amount));
    });
    //      abilities
    const abilities = Object.values(result.abilities).map((x) => {
         let new_ability = {
              name: cleanText(x.ability.name),
              isHidden: x.is_hidden
         };
         return new_ability;
    });
    abilities.forEach((x) => {
         if (x.isHidden == false) {
              pokeAbilities.appendChild(createRow(x.name));
         } else {
              pokeHiddenAbilities.appendChild(createRow(x.name));
         }
    });
    //map over result's moves to package into convenient objects
    const moves = Object.entries(result.moves).map((x) => {
         let new_move = {
              name: cleanText(x[1].move.name),
              learned: x[1].version_group_details[0].level_learned_at,
              method: x[1].version_group_details[0].move_learn_method.name,
              version: x[1].version_group_details[0].version_group.name
         };
         return new_move;
    });
    //filter out learned moves into their own array
    const learnedMoves = moves.filter(
         (x) => x.method == "level-up" || x.method == "egg"
    );
    //sort them into egg/level-up, then by level
    learnedMoves.sort((x, y) => x.method - y.method);
    learnedMoves.sort((x, y) => x.learned - y.learned);
    //filter out tm moves
    const machineMoves = moves.filter((x) => x.method == "machine");
    //sort them alphabetically
    machineMoves.sort((x, y) => x.name - y.name);
    //generate a row for each and append to the relevant tables
    learnedMoves.forEach((x) => {
         levelUpMoves.appendChild(createRow(x.learned, x.name));
    });
    machineMoves.forEach((x) => {
         tmMoves.appendChild(createRow(x.name));
    });
});
