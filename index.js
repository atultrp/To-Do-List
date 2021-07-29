// Select the element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("item");


// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Show todays date
const options = { weekday: "long", month: "short", day: "numeric" }
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString(undefined, options);

// Variable

let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadLIST(LIST); // load the list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface

function loadLIST(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});


// ToDo function

function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = ` <li class = "item"> 
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>  
                </li> `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add items from the list user the enter key
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        // if the input isn't empty
        if (toDo) {
            addToDo(toDo, 1, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

// Complete to do

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do 

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target the items created dynamically

list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside the list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});