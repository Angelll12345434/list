const todoList = getTodoListFromLocalStorage() || [];
renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const { name, dueDate } = todoObject;
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button onclick="
                todoList.splice(${i}, 1);
                updateLocalStorage();
                renderTodoList();
            " class="delete-todo-button">Delete</button>
        `;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list')
        .innerHTML = todoListHTML;
}

function addTodo() {
    const inputElem = document.querySelector('.js-name-input');
    const name = inputElem.value;

    const DateInputElem = document.querySelector('.js-due-date-input');
    const dueDate = DateInputElem.value;

    todoList.push({
        name,
        dueDate
    });

    inputElem.value = '';
    updateLocalStorage();
    renderTodoList();
}

function updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function getTodoListFromLocalStorage() {
    const storedTodoList = localStorage.getItem('todoList');
    return storedTodoList ? JSON.parse(storedTodoList) : null;
}