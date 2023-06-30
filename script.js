const toDoList = document.getElementById('toDoList');
const toDoForm = document.getElementById('toDoForm');
const clearAll = document.getElementById('clear-all');
const inputArea = document.getElementById('textOfInput');

const listOfToDos = [];

function creatoDo(){
    toDoList.innerHTML = '';
    for(let toDo of listOfToDos ){
        const span = document.createElement('span');
        span.innerText = toDo.text;

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = toDo.isCompleted;
        checkbox.classList.add('checkbox');
        checkbox.dataset.toDoId = toDo.id;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');

        const toDoItem = document.createElement('li');

        if(toDo.isCompleted){
            toDoItem.classList.add('checked');
            
        }

        toDoItem.appendChild(checkbox);
        toDoItem.appendChild(span);
        toDoItem.appendChild(deleteButton);
        toDoList.appendChild(toDoItem);
        saveToDoS();

    }
}

toDoList.addEventListener('click', (event) => {
    if(event.target.matches('input.checkbox')){
       const toDoIndex = listOfToDos.findIndex(toDo => toDo.id == event.target.dataset.toDoId);
       listOfToDos[toDoIndex] = {...listOfToDos[toDoIndex], isCompleted: event.target.checked};
       event.target.parentElement.classList.toggle('checked')
        
       saveToDoS();
    }
})

toDoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const textOfInput = document.getElementById('textOfInput');

    if(!textOfInput.value){
        alert('Input field can not be empty!');
        return;
    }

    listOfToDos.push({id: Date.now(), text: textOfInput.value, isCompleted : false});
    textOfInput.value = '';
    creatoDo();
    saveToDoS();
})

toDoList.addEventListener('click', (event) => {
    if(event.target.matches('button')){
        const removedItem = event.target.parentElement.remove();
        listOfToDos.splice(removedItem, 1)
        saveToDoS();
    }
})


clearAll.addEventListener('click', () => {
    listOfToDos.splice(0);
    creatoDo();
    saveToDoS();
})

function saveToDoS(){
    localStorage.setItem('data', toDoList.innerHTML)
}

function displayToDoS(){
    toDoList.innerHTML = localStorage.getItem('data');
}

displayToDoS();