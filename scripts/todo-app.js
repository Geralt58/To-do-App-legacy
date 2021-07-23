let todos = getSavedTodos()
 
const filters = {
    searchText : '',
    hideCompleted: false
}

//show list of all files before searching
renderedTodos(todos, filters)

//add search value to class above
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderedTodos(todos, filters)
}) 


//add more fields to todos
document.querySelector('#todo-form').addEventListener('submit', (e) => { 
    e.preventDefault()
    const text = e.target.elements.todoText.value.trim()
    if(text.length>0) {
        todos.push({
            id: uuidv4(),
            text, 
            completed: false
        })
        saveTodos(todos)
        renderedTodos(todos, filters)
        e.target.elements.todoText.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderedTodos(todos ,filters)
})