const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name: 'make dinner',
    dueDate: '2022-12-22'
}, {
    name: 'wash dishes',
    dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {
    let html = '';

    todoList.forEach((todoObject, index) => {
        const todoName = todoObject.name;
        const dueDate = todoObject.dueDate;
        html += `
                <div>${todoName}</div> 
                <div>${dueDate}</div>
                <button class="delete-button" onclick="
                    todoList.splice(${index}, 1);
                    renderTodoList();

                    saveToStorage();

                ">Delete</button>
        `;
    });

    /*
    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const todoName = todoObject.name;
        const dueDate = todoObject.dueDate;
        html += `
                <div>${todoName}</div> 
                <div>${dueDate}</div>
                <button class="delete-button" onclick="
                    todoList.splice(${i}, 1);
                    renderTodoList();

                    saveToStorage();

                ">Delete</button>
        `;
    }
    */
    document.querySelector('.js-result1').innerHTML = html;
}

function addTodo() {
    const name = document.querySelector('.js-input1').value;
    const dueDate = document.querySelector('.Duedate').value;
    todoList.push({
        name: name, 
        dueDate: dueDate
    });

    document.querySelector('.js-input1').value = '';
    renderTodoList();

    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
