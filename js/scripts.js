const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const searchInput = document.getElementById("search-input");
const eraseBtn = document.getElementById("erase-button");
const filterBtn = document.getElementById("filter-select");
const editBtn = document.getElementById('edit-todo');

let oldInputValue;

const loadTarefas = () => {
    todoList.innerHTML = "<h2>Tarefas:</h2>";

    arrayDeTarefas.forEach((tarefa) => {
        exibirTarefa(tarefa);
    });
};

const exibirTarefa = (tarefa) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const tituloTarefa = document.createElement("h3");
    tituloTarefa.innerText = tarefa;
    todo.appendChild(tituloTarefa);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = `<i class="far fa-check-circle"></i>`
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = `<i class="far fa-edit"></i>`
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
};

const toggleForms = () => {
    editForm.classList.toggle("hidden");
    todoForm.classList.toggle("hidden");
    todoList.classList.toggle("hidden");
}

const editarTarefa = (tarefaASerEditada) => {
    const novoValorDaTarefa = editInput.value;

    arrayDeTarefas = arrayDeTarefas.map((tarefa, i) => {
        if (tarefa === tarefaASerEditada) {
            arrayDeTarefas[i] = novoValorDaTarefa;
            return novoValorDaTarefa;
        }
        return tarefa;
    });

    loadTarefas();
};

const busca = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitle.includes(normalizedSearch)) {
            todo.style.display = "none";
        }
    });
};

const filtro = (valorDoFiltro) => {
    const tarefas = document.querySelectorAll(".todo");

    switch (valorDoFiltro) {
        case "all":
            tarefas.forEach((todo) => (todo.style.display = "flex"));
            break;
        case "done":
            tarefas.forEach((todo) =>
                todo.classList.contains("done")
                    ? todo.style.display = "flex"
                    : todo.style.display = "none"
            );
            break;
        case "todo":
            tarefas.forEach((todo) =>
                !todo.classList.contains("done")
                    ? todo.style.display = "flex"
                    : todo.style.display = "none"
            );
            break;
        default:
            break;
    }
}

let arrayDeTarefas = [];
let tarefaParaEdicao;

if (arrayDeTarefas.length === 0) {
    todoList.classList.add("hidden");
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        arrayDeTarefas.push(inputValue);
        exibirTarefa(inputValue);
        todoList.classList.remove("hidden");
    };
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    };

    if (targetEl.classList.contains("remove-todo")) {
        const indiceDaTarefaParaRemocao = arrayDeTarefas.findIndex((tarefa) => tarefa === todoTitle);
        arrayDeTarefas.splice(indiceDaTarefaParaRemocao, 1);

        loadTarefas();
    };


    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();
        tarefaParaEdicao = parentEl.querySelector("h3").innerText;
        editInput.value = tarefaParaEdicao;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});


editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    console.log(tarefaParaEdicao)
    const tarefaAtual = tarefaParaEdicao;

    if (editInputValue) {
        console.log('editando, linha 226')
        editarTarefa(tarefaAtual);
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {

    const search = e.target.value;

    busca(search);
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filtro(filterValue)
});