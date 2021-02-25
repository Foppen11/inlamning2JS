let todos = [
    {
        userid: 1
        id: '1', 
        title: 'Tvätta',
        completed: false,
    },
    {
        userid: 1
        id: '2', 
        title: 'Diska',
        completed: true,
    },
]

const todo = document.querySelector('#todoForm');
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

const listTodo = () => {
    output.innerHTML = '';
  
    todos.forEach(
        if(todos.completed === true)
        {
            todos => {
                output.innerHTML += `
                <div id="${todos.id}" class="rounded p-2 d-flex justify-content-between align-items-center mb-3 bg-success">
                <h3>${todos.title}</h3>
                    <div>
                        <button class="btn btn-primary btn-un-finish">Un-finish</button>
                        <button class="btn btn-danger">Delete</button>
                    </div>
                </div>
            `
            }
        }
        else if(todos.completed === false){
            todos => {
                output.innerHTML += `
                <div id="${todos.id}" class="rounded p-2 d-flex justify-content-between align-items-center mb-3 bg-white">
                    <h3>${todos.title}</h3>
                    <div>
                        <button class="btn btn-primary btn-finish">Finish</button>
                        <button class="btn btn-danger">Delete</button>
                    </div>
                </div>
            `
            }
        })
}

listTodo();