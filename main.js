
let todoArray = [];
let tasksCompleted = 0;

//Handle submit event
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const input = document.querySelector('#input-field');
    if (!input.value) { //Exit early with message if input.value is falsey/empty
        showMessage('Input must not be empty');
        return;
    }
    addTodo(input.value);
    input.value = ''; //clear input field
    clearMessage(); 
});

//Handle click event from the list-item buttons
document.querySelector('ul').addEventListener('click', e => {
    if (e.target.getAttribute('class') == 'todo-item') {
        completeTodo(e);
    } else if (e.target.name == 'button-delete') {
        deleteTodo(e);
    }
});


function addTodo(todo) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');

    const iconDelete = '🗑️';
    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="button-delete" class="button-delete">${iconDelete}</button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);


    todoArray.push({
        text: todo, //Store todo string
        isCompleted: false, //Keeping track of completing
    });

}
function deleteTodo(e) {

    const item = e.target.parentNode; //Get <li> item from clicked button
    const index = getIndexFromList(item); //Get array index of the item
    item.remove(); //remove item element from html document

    todoArray.splice(index, 1); //Then finally remove/splice index from todo array 
}
function completeTodo(e) {

    item = e.target.parentNode;
    const index = getIndexFromList(item);
    if (todoArray[index].isCompleted) {

        todoArray[index].isCompleted = false;
        item.classList.remove('completed'); //Remove class element from html document
        updateDisplay(--tasksCompleted);
    } else {
        
        todoArray[index].isCompleted = true;
        item.classList.add('completed'); //Add class element so we can style in CSS
        updateDisplay(++tasksCompleted);
    }
}

function getIndexFromList(item) {
    const listItems = Array.from(document.querySelectorAll('li'));
    return listItems.indexOf(item);   
}

function updateDisplay(tasks) {
    const display = document.querySelector('#tasks-completed');
    display.innerHTML = tasks + ' completed';
}

function showMessage(text) {
    const message = document.querySelector('#message');
    message.innerHTML = text;
    message.classList.add('show-message'); //Add class for CSS animation
}
function clearMessage() {
    const message = document.querySelector('#message');
    message.innerHTML = '';   
    message.classList.remove('show-message');
}


