document.addEventListener("DOMContentLoaded", startFunction);

function startFunction() {
    fetchMonsters();
    createMonsterForm();
    addNavListeners();
}

const monstersUrl = "http://localhost:3000/monsters"; //the API URL

let page = 1; //page numbering that will be used for next and back

//Function that fetches data from the API
function fetchMonsters(a) {
    fetch(monstersUrl + `/?_limit=50&_page=${a}`)
        .then((response) => response.json())
        .then((data) => {
            // for (let c = 0; c < data.length; c++) console.log("monster", data[c]), createMonsterCard(data[c]);
            data.map(values => {
                createMonsterCard(values);
            })
    });
}

//Creating card and mapping data to the card
function createMonsterCard(a) {
    let b = document.createElement("div"),
        c = document.createElement("h2"),
        d = document.createElement("h4"),
        e = document.createElement("p");
    c.innerHTML = `Name: ${a.name}`;
    d.innerHTML = `Age: ${a.age}`;
    e.innerHTML = `Bio: ${a.description}`; 
    b.append(c,d,e);
    document.querySelector("#monster-container").appendChild(b);
}


//creating a form for new monster and attaching it to the create-monster div in DOM 
function createMonsterForm() {
    const a = document.createElement("form"),
          b = document.createElement("input"),
          c = document.createElement("input"),
          d = document.createElement("input"),
          e = document.createElement("button");
    a.id = "monster-form";
    b.id = "name";
    c.id = "age";
    d.id = "description";
    b.placeholder = "name...";
    c.placeholder = "age...";
    d.placeholder = "description...";
    e.innerHTML = "Create";
    a.append(b,c,d,e);

    document.getElementById("create-monster").appendChild(a),
    submitBtn();
}

//submit button with an event listener
function submitBtn() {
    document.querySelector("#monster-form").addEventListener("submit", (e) => {
        debugger; //pausing the execution to inspect the state of the program
        e.preventDefault();
        // console.log("submitted", getFormData());
        sendNewMonster(formData());
        clearForm();
    });
}

//function that gets the form data that the user inputs
function formData() {
    let a = document.querySelector("#name"),
        b = document.querySelector("#age"),
        c = document.querySelector("#description");
    return { name: a.value, age: parseFloat(b.value), description: c.value };
}

//function that sends new monster to the database
function sendNewMonster(a) {
    fetch(monstersUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(a)
    })

    .then((response) => response.json())
    .then((response) => console.log(response));
}

//after the user has posted a new Monster, the value left on the fields are cleared here to default
function clearForm() {
    let monForm = document.querySelector("#monster-form");
    monForm.reset();

    //its the same as:
    //monForm.value = "";
    
}

//function on back and forward buttons
function addNavListeners() {
        let a = document.querySelector("#back"),
            b = document.querySelector("#forward");
        a.addEventListener("click", () => {
            pageDown();
        });
        b.addEventListener("click", () => {
            pageUp();
        });
}

//function forward  for the button
function pageUp() {
        page++;
        fetchMonsters(page);
}

//function previous for the button and incase the user clicks previous on the first page
function pageDown() {
        1 < page ? (page--, fetchMonsters(page)) : alert("Aint no monsters here");
}

    
  
