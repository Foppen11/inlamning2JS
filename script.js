let todos = [
    {
        userid: 1,
        id: '1', 
        title: 'Tvätta',
        completed: false,
    },
    {
        userid: 1,
        id: '2', 
        title: 'Diska',
        completed: true,
    },
]

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todosOutput = document.querySelector('#todos');


const validateTodo = (text) => {
    let input = document.querySelector(text);

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

todoForm.addEventListener('submit', e => {
    e.preventDefault();

    if(e.target.parentNode.innerText === 'ADD'){
        
        if(validateTodo('#todoInput') === true) {
            let newTodo = {
                userid: 1,
                id: Date.now().toString(), 
                title: todoInput.value,
                completed: false,
            }
            todos.push(newTodo);
            listTodos();
            todoInput.value = '';
            
        }
        else{
            return
        }
    }
    
})

const listTodos = () => {
    todosOutput.innerHTML = '';
  
    todos.forEach(todos => {
        

        if(todos.completed === true){
            todosOutput.innerHTML+=
            `
            <div id="${todos.id}" class="rounded p-2 d-flex justify-content-between align-items-center mb-3 bg-success">
            <h3>${todos.title}</h3>
                <div>
                    <button class="btn btn-primary btn-un-finish">Un-finish</button>
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>`
        }
        else if(todos.completed === false){
            todosOutput.innerHTML+=
            `
            <div id="${todos.id}" class="rounded p-2 d-flex justify-content-between align-items-center mb-3 bg-white">
                <h3>${todos.title}</h3>
                <div>
                    <button class="btn btn-primary btn-finish">Finish</button>
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>`
        }
    })
}


todosOutput.addEventListener('click', e => {
    if(e.target.classList.contains('btn-danger')) {
        if(e.target.parentNode.parentNode.classList.contains('bg-success')){
            todos = todos.filter(newTodo => newTodo.id !== e.target.parentNode.parentNode.id)
        }
        else{
            alert('can not delete an un-finished todo!')
        }
    }
    if(e.target.classList.contains('btn-finish')){
        for(i=0; i<todos.length; i++){
            if(todos[i].id === e.target.parentNode.parentNode.id){
                todos[i].completed = true;
            }
        }
    }
    if(e.target.classList.contains('btn-un-finish')){
        for(i=0; i<todos.length; i++){
            if(todos[i].id === e.target.parentNode.parentNode.id){
                todos[i].completed = false;
            }
        }
    }
    listTodos();
})

listTodos();