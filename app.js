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
        // This function will be implemented when task addition functionality is added
        console.log('Add task functionality ready to be implemented');
        
        // For now, just clear the input to show the UI is responsive
        const inputValue = todoInput.value.trim();
        if (inputValue) {
            console.log('Task to add:', inputValue);
            todoInput.value = '';
        }
    }
    
    function updateTaskCount() {
        const taskCount = todoList.children.length;
        totalTasks.textContent = `${taskCount} task${taskCount !== 1 ? 's' : ''}`;
    }
    
    // Utility function to create task elements (for future use)
    function createTaskElement(taskText) {
        // Implementation will be added when task creation is needed
        console.log('Task element creation ready:', taskText);
    }
    
    // Export functions for potential testing (if needed)
    window.TodoApp = {
        updateTaskCount,
        createTaskElement
    };
});