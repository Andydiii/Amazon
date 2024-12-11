const todoList = [];

function addTodo() {
    const todoname = document.querySelector('.js-input1').value;
    todoList.push(todoname);
    console.log(todoList);

    document.querySelector('.js-input1').value = '';

    document.querySelector('.js-result1').innerHTML += `<p>${todoname}</p>`;
}
