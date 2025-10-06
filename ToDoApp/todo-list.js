const todoList = [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todo, index) => {
    const { name, dueDate } = todo;
    const html = `
      <div style="display:flex; flex-direction: row; ">${name}      ${dueDate} <button class="js-delete-button" data-index="${index}" style="color: red; margin-left:20px; background-color : white border: none">Delete</button></div>`;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
    
  const deleteButtons = document.querySelectorAll('.js-delete-button');

  
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  // Loop over evey delete button and add an eventListener that deletes the toDo and rerender the Tasks

}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"
  todoList.push({ name, dueDate });
  // Clear the input value


  inputElement.value = '';

  renderTodoList();
}