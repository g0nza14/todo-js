import './styles.css';
import { Todo, TodoList } from './classes'; //como no se le especifica el archivo js busca por defecto el index.js
import { crearTodoHtml } from './js/componentes';
export const todoList = new TodoList();
todoList.todos.forEach( todo => crearTodoHtml( todo ))
// o como es un solo argumento el que le pasamos se puede hacer: todoList.todos.forEach( crearTodoHtml );