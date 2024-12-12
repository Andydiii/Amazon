const todoList = [{
    name: 'make dinner',
    duedate: '2022-12-22'
}, {
    name: 'wash dishes',
    duedate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {
    let html = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const todoName = todoObject.name;
        const dueDate = todoObject.duedate;
        html += `
                <div>${todoName}</div> 
                <div>${dueDate}</div>
                <button class="delete-button" onclick="
                    todoList.splice(${i}, 1);
                    renderTodoList();
                ">Delete</button>
        `;
    }
    
    document.querySelector('.js-result1').innerHTML = html;
}

function addTodo() {
    const todoname = document.querySelector('.js-input1').value;
    const dueDate = document.querySelector('.Duedate').value;
    todoList.push({
        name: todoname, 
        duedate: dueDate
    });

    document.querySelector('.js-input1').value = '';
    renderTodoList();
}