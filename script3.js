 const inputElement = document.querySelector(".new-task-input");
 const addTaskButton = document.querySelector(".new-task-button");

 const tasksContainer = document.querySelector(".tasks-container");

 const validateInput = () => inputElement.value.trim().lenght > 0;
 
 const handleAddTask = () => {
    const inputIsValid = validateInput();

    console.log(inputIsValid)

  

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
        taskContent.innerText = inputElement.value; 

        taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-regular");
    deleteItem.classList.add("fa-ban");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent) )

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    console.log({taskItemContainer})

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    uptadeLocalStorage();

 };


 const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }
    }

    uptadeLocalStorage();
 };

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
      if (currentTaskIsBeingClicked) {
          taskItemContainer.remove();
      }
  }

  uptadeLocalStorage();
};

 const handleInputChange = () => {
     const inputIsValid = validateInput();

     if(inputIsValid) {
         return inputElement.classList.remove("error");
     }
 };

 const uptadeLocalStorage = () => {
     const tasks = tasksContainer.childNodes;

     const localStoreTasks = [...tasks].map(task => {
         const content = task.firstChild;
         const isCompleted = content.classList.contains('completed')

         return {description: content.innerText, isCompleted};

     });

     localStorage.setItem('tasks', JSON.stringify(localStoreTasks));
 };

 const refreshTasksUsingLocalStorage = () => {
     const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

     if(!tasksFromLocalStorage) return;

     for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");
    
        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;

        if (task.isCompleted) {
            taskContent.classList.add("completed")
        }
    
        taskContent.addEventListener('click', () => handleClick(taskContent))
    
        const deleteItem = document.createElement("i");
        deleteItem.classList.add("fa-regular");
        deleteItem.classList.add("fa-ban");
    
        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent) )
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        console.log({taskItemContainer})
    
        tasksContainer.appendChild(taskItemContainer);
     }
 };

 refreshTasksUsingLocalStorage();

 addTaskButton.addEventListener("click", () => handleAddTask());

 inputElement.addEventListener("change", () => handleInputChange());

 