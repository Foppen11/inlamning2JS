let todos = []

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todosOutput = document.querySelector('#todos');

const fetchTodos = () => {                                                      // ANROPAR DATABASEN OCH TAR NER 10 OBJEKT
    fetch('https://jsonplaceholder.typicode.com/todos?_page=0&_limit=10')
    .then(res => res.json())                                                    // KONVERTERAR TEXTEN TILL JSON
    .then(data => {
        todos = data;
        listTodos();
    })
}

const validateTodo = (input) => {                                               // VALIDERAR TEXTEN SÅ INPUTEN INTE ÄR TOM
    if(input.value.trim() === '') {                                             // LÄGGER TILL ELLER TAR BORT KLASSER FÖR ATT SKAPA ETT FELMEDELANDE
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.focus();
        return false;
    } 
    else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}

const listTodos = () => {                                                       // GÖR SÅ OUTPUTEN ÄR TOM OCH KALLAR SEDAN PÅ "newTodo"
    todosOutput.innerHTML = '';
    todos.forEach(todo => {
        newTodo(todo);
    })
}

const newTodo = (todo) => {                                                     // SKAPAR HTML-KOD AV VARJE OBJEKT OCH SKRIVER UT DE PÅ HEMSIDAN
    if(todo.completed === true){                                                // KOLLAR OM "todon" ÄR FÄRDIG OCH GÖR DEN ISF TILL EN COMPLETED todo
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
    else if(todo.completed === false){                                          // KOLLAR OM "todon" ÄR O-FÄRDIG OCH GÖR DEN ISF TILL EN O-FÄRDIG todo
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

const createTodo = (title) => {                                                 // SKAPAR EN NY TODO OCH "SKICKAR" DE TILL DATABASEN
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

    if(validateTodo(todoInput)){                                                // KOLLAR OM VALIDERINGEN ÄR OKEJ OCH SKAPAR SEDAN NYA TODON
        createTodo(todoInput.value); 
    } 
    todoForm.reset();
})

todosOutput.addEventListener('click', e => {
    if(e.target.classList.contains('btn-danger')) {                                             // KOLLAR EFTER KNAPPTRYCK PÅ "DELETE"
        if(e.target.parentNode.parentNode.classList.contains('bg-success')){                    // KONTROLLERAR SÅ ATT OBJEKTET ÄR FÄRDIGT (COMPLETED)
            todos = todos.filter(newTodo=> newTodo.id != e.target.parentNode.parentNode.id)     // TAR ISF BORT OBJEKTET OCH FILTRERAR MED HJÄLP AV ID
        }
        else{                                                                                   // ÄR TODON INTE FÄRDIG KOMMER EN ALERT UPP MED ERRORMEDELANDE
            alert('can not delete an un-finished todo!')
        }
    }
    if(e.target.classList.contains('btn-finish')){                                              // KOLLAR EFTER KNAPPTRYCK PÅ FINISH
        for(i=0; i<todos.length; i++){                                                          // ÄNDRAR OBJEKTETS COMPLETED STATUS FRÅN FALSE TILL TRUE
            if(todos[i].id == e.target.parentNode.parentNode.id){
                todos[i].completed = true;
            }
        }
    }
    if(e.target.classList.contains('btn-un-finish')){                                           // KOLLAR EFTER KNAPPTRYCK PÅ UN-FINISH
        for(i=0; i<todos.length; i++){                                                          // ÄNDRAR OBJEKTETS COMPLETED STATUS FRÅN TRUE TILL FALSE
            if(todos[i].id == e.target.parentNode.parentNode.id){
                todos[i].completed = false;
            }
        }
    }
    listTodos();
})
fetchTodos();