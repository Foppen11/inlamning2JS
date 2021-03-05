let todos = []

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todosOutput = document.querySelector('#todos');

const fetchTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos?_page=0&_limit=10')
    .then(res => res.json())
    .then(data => {
        todos = data;
        listTodos();
    })
}


const validateTodo = (input) => {

    if(input.value.trim() === '') {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.focus();
        return false;
    
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}

const listTodos = () => {
    todosOutput.innerHTML = '';
    todos.forEach(todo => {
        newTodo(todo);
    })
}

const newTodo = (todo) => {

    if(todo.completed === true){
        todosOutput.innerHTML+=
        `
        <div id="${todo.id}" class="rounded p-2 d-flex justify-content-between align-items-center mb-3 bg-success">
            <h3>${todo.title}</h3>
            <div>
                <button class="btn btn-primary btn-un-finish">Un-finish</button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>`
    }
    else if(todo.completed === false){
        todosOutput.innerHTML+=
        `
        <div id="${todo.id}" class="rounded p-2 d-flex justify-content-between align-items-center mb-3 bg-white">
            <h3>${todo.title}</h3>
            <div>
                <button class="btn btn-primary btn-finish">Finish</button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>`
    }
}

const createTodo = (title) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title: title,
            completed: false
        })
    })
    .then(res => res.json())
    .then(data => {
        let newTodo = {
            ...data,
            id: Date.now()
        }
        todos.unshift(newTodo);
        listTodos();
    })
}

todoForm.addEventListener('submit', e => {
    e.preventDefault();

    if(validateTodo(todoInput)){
        createTodo(todoInput.value); 
    }
       
    todoForm.reset();
})

todosOutput.addEventListener('click', e => {
    if(e.target.classList.contains('btn-danger')) {
        if(e.target.parentNode.parentNode.classList.contains('bg-success')){
            todos = todos.filter(newTodo=> newTodo.id != e.target.parentNode.parentNode.id) 
        }
        else{
            alert('can not delete an un-finished todo!')
        }
    }
    if(e.target.classList.contains('btn-finish')){
        for(i=0; i<todos.length; i++){
            if(todos[i].id == e.target.parentNode.parentNode.id){
                todos[i].completed = true;
            }
        }
    }
    if(e.target.classList.contains('btn-un-finish')){
        for(i=0; i<todos.length; i++){
            if(todos[i].id == e.target.parentNode.parentNode.id){
                todos[i].completed = false;
            }
        }
    }
    listTodos();
})

fetchTodos();