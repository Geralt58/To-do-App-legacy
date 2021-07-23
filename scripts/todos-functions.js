
//Read existing todos from localstorage
const getSavedTodos =  () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

//save Todos to localstorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//render Todos with all filters
const renderedTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todo')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })
   
    const incompletetodos = todos.filter((todo) => !todo.completed)
    
    todoEl.innerHTML = ''
    todoEl.appendChild(genreateSummaryDOM(incompletetodos))

    if(filteredTodos.length > 0) {
        filteredTodos.forEach((todos) => {
          todoEl.appendChild(generateTodoDOM(todos))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
      todoEl.appendChild(messageEl)
    }
}

//remove todo by their id
const removeTodoButton = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

//toggle the completed value of a todo
 const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}

//Get DOM elements for individual note
const generateTodoDOM = (todo) => {
    const todosEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
    const checkbox =document .createElement('input')
    const removeButton =document.createElement('button')

    //setup the todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderedTodos(todos, filters)
    })
   

    //setup the todo text
    textEl.textContent = todo.text  
    containerEl.appendChild(textEl)

    //setup container
    todosEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todosEl.appendChild(containerEl)

    //setup the remove button
    removeButton.textContent='Remove'
    removeButton.classList.add('button', 'button--text')
    todosEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodoButton(todo.id)
        saveTodos(todos)
        renderedTodos(todos,filters)
    })

   

    return todosEl
}

//Create DOM elements to list summary
const genreateSummaryDOM = (incompletetodos) => {
    const summary = document.createElement('h3')
    const plural = incompletetodos.length>1 ? 's' : ''
    summary.classList.add('list-title')
    summary.textContent = `There are ${incompletetodos.length} todo${plural} remaining`
    return summary
}    