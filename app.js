// To-Do List App JavaScript
// This file contains the core functionality for the to-do list application

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('To-Do List App initialized');
    
    // Get DOM elements
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const totalTasks = document.getElementById('totalTasks');
    
    // Verify all elements are found
    if (!todoInput || !addBtn || !todoList || !totalTasks) {
        console.error('Required DOM elements not found');
        return;
    }
    
    // Task ID counter for unique identification
    let taskIdCounter = 0;
    
    // Initialize the app
    init();
    
    function init() {
        console.log('App components initialized successfully');
        updateTaskCount();
        
        // Add event listeners
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Add button click event
        addBtn.addEventListener('click', handleAddTask);
        
        // Enter key press in input field
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleAddTask();
            }
        });
        
        console.log('Event listeners attached');
    }
    
    function handleAddTask() {
        const inputValue = todoInput.value.trim();
        
        // Validate input - check for empty or whitespace-only tasks
        if (!inputValue) {
            showValidationMessage('Please enter a task before adding!');
            return;
        }
        
        // Create and add the task
        const taskElement = createTaskElement(inputValue);
        todoList.appendChild(taskElement);
        
        // Clear the input field
        todoInput.value = '';
        
        // Update task count
        updateTaskCount();
        
        // Focus back on input for better UX
        todoInput.focus();
        
        console.log('Task added:', inputValue);
    }
    
    function createTaskElement(taskText) {
        // Create task container
        const taskItem = document.createElement('li');
        taskItem.className = 'todo-item';
        taskItem.setAttribute('data-task-id', ++taskIdCounter);
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.setAttribute('aria-label', 'Mark task as complete');
        
        // Create task text span
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'todo-text';
        taskTextSpan.textContent = taskText;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '✕';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.title = 'Delete task';
        
        // Add event listeners for task interactions
        checkbox.addEventListener('change', function() {
            taskItem.classList.toggle('completed', checkbox.checked);
        });
        
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            updateTaskCount();
            console.log('Task deleted:', taskText);
        });
        
        // Assemble the task element
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteBtn);
        
        return taskItem;
    }
    
    function updateTaskCount() {
        const taskCount = todoList.children.length;
        totalTasks.textContent = `${taskCount} task${taskCount !== 1 ? 's' : ''}`;
        
        // Update the empty state message
        if (taskCount === 0) {
            todoList.style.display = 'flex';
            todoList.style.alignItems = 'center';
            todoList.style.justifyContent = 'center';
        } else {
            todoList.style.display = 'block';
        }
    }
    
    function showValidationMessage(message) {
        // Remove any existing validation message
        const existingMessage = document.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create validation message element
        const validationDiv = document.createElement('div');
        validationDiv.className = 'validation-message';
        validationDiv.textContent = message;
        validationDiv.style.cssText = `
            background-color: #fff3cd;
            color: #856404;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            margin-top: 10px;
            border: 1px solid #ffeaa7;
            animation: fadeInOut 3s ease-in-out forwards;
        `;
        
        // Add CSS animation for the message
        if (!document.querySelector('#validationStyles')) {
            const style = document.createElement('style');
            style.id = 'validationStyles';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(-10px); }
                    20% { opacity: 1; transform: translateY(0); }
                    80% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Insert after input container
        const inputSection = document.querySelector('.input-section');
        inputSection.appendChild(validationDiv);
        
        // Remove message after animation
        setTimeout(() => {
            if (validationDiv.parentNode) {
                validationDiv.remove();
            }
        }, 3000);
        
        // Add visual feedback to input
        todoInput.style.borderColor = '#ffc107';
        todoInput.style.backgroundColor = '#fff3cd';
        
        // Reset input styling after a moment
        setTimeout(() => {
            todoInput.style.borderColor = '';
            todoInput.style.backgroundColor = '';
        }, 1500);
    }
    
    // Export functions for potential testing (if needed)
    window.TodoApp = {
        updateTaskCount,
        createTaskElement,
        handleAddTask
    };
});