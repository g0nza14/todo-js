//este archivo agrupa todas las clases que tengo en la carpeta "classes" y las exporta
// a fin de reducir los imports que se encuentran en el index.js de la carpeta src

import { Todo } from './todo.class.js';
import { TodoList } from './todo-list.class.js';

export{
    Todo,
    TodoList
}