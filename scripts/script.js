'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = localStorage.todoList ? JSON.parse(localStorage.todoList) : [];

const setLocalStorage = function() {
    localStorage.todoList = JSON.stringify(todoData);
};

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.dataset.index = i;

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoComplete = li.querySelector('.todo-complete');
        const todoremove = li.querySelector('.todo-remove');

        todoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            setLocalStorage();
            render();
        });
        todoremove.addEventListener('click', function(event) {
            const index = event.target.closest('li').dataset.index;
            todoData.splice(index, 1);
            setLocalStorage();
            render();
        });
    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);
        headerInput.value = '';

        setLocalStorage();
        render();
    }
});

render();