
// calculate insulin for carbohydrate
function count_ce(c, r) {
    var iu = c / r;
    return iu.toFixed(1);
}

// calculate insulin for fat and protein
function count_fpe(f, p, r) {
    var fat = f * 9;
    var protein = p * 4;
    fpe = ((fat + protein) / 10 / r) / 2;
    return fpe.toFixed(1);
}

// get amount of protein
function get_protein(element) {
    idx = element.innerHTML.indexOf('Białko') + 7; 
    return parseInt(element.innerHTML.substr(idx, 3));
}

// get amount of fat
function get_fat(element) {
    idx = element.innerHTML.indexOf('Tłuszcz') + 7; 
    return parseInt(element.innerHTML.substr(idx, 3));
}

//get amount of carbohydrate
function get_carbohydrate(element) {
    idx = element.innerHTML.indexOf('Węglowodany') + 11; 
    return parseInt(element.innerHTML.substr(idx, 3));
}

function add_ce_to_meals() {
    var i;
    var meal_type;
    var data_p;
    rows = document.getElementsByClassName('meal-first-row');
    for (i = 0; i < rows.length; i++) {
        meal_type = rows[i].getElementsByTagName('strong')[0];
        // get first paragraph to append ce and fpe
        data_p = rows[i].getElementsByTagName('p')[0];
        // get second paragraph to find protein, fat and carbohydrate
        cfp_p = rows[i].getElementsByTagName('p')[1];
        protein = get_protein(cfp_p);
        fat = get_fat(cfp_p);
        carbohydrate = get_carbohydrate(cfp_p);
        // we have different rate for first breakfest, keep that into account
        if (meal_type.innerHTML.indexOf('Śniadanie') == 0) {
            ce = count_ce(carbohydrate, 9);
            fpe = count_fpe(fat, protein, 9);
        } else {
            ce = count_ce(carbohydrate, 8);
            fpe = count_fpe(fat, protein, 8);
        }
        // append data to a page
        data_p.innerHTML = data_p.innerHTML + "<b></br></br>WW: " + ce + " j. </br>WBT: " + fpe + " j. </br></b>";
    } 
}

// add carbohydrate (fat and protein) exchangers to set valid insulin bolus
if (document.title.indexOf("Vitalia.pl") != -1) {
    add_ce_to_meals();
}
