import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

/**CARGA LO QUE ENCUENTRE EN EL LOCALSTORAGE */
const pepitaLaPistolera = ()=>{
    return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodo = () => {

    const initialState = []

    const [todos, dispatch] = useReducer(todoReducer, initialState, pepitaLaPistolera);

    useEffect(() => {
      localStorage.setItem('todos',JSON.stringify(todos));
    }, [todos])
    

    const handleOnNewTodo = (todo)=>{
       
        const action = {
            type: 'add todo',
            payload: todo
        }
        
        dispatch(action)
    }

    const handleDeleteTodo = (id)=>{
        // console.log(id)
        const action = {
            type: 'remove todo',
            payload: id
        }
        
        dispatch(action)
    }

    const handleToggleTodo = (id)=>{
        // console.log(id)
        const action = {
            type: 'toggle todo',
            payload:id
        }
        dispatch(action)
    }

  return {
    handleOnNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(t => !t.done).length
  }
}
