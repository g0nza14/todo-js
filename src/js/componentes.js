import { Todo } from './../classes';
import { todoList } from './../index';

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list'); //es el ul
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
    //${ (todo.completado) ? 'completed' : '' } hace que si todo.completado sea true
    // entonces agregue al li una clase completed que lo tacha. Caso contrario, no agrega nada.

    const htmlTodo = `

    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo; //inserto en el div creado todo el htmlTodo
    divTodoList.append( div.firstElementChild ); //es firstElementChild porque quiero agregar solamente el li no el div creado y luego el li.
    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', ( event ) => {
    if( event.keyCode == 13 && event.target.value.length > 0){
        console.log(event.target.value); //permite obtener lo ultimo que se escribio. Tambien es válido txtInput.value
        const nuevoTodo = new Todo( event.target.value );
        todoList.nuevoTodo( nuevoTodo ); //se agrega a la instancia que se encuentra en index.html
        crearTodoHtml( nuevoTodo );
        event.target.value = ''; //se limpia el input
    }
})

divTodoList.addEventListener('click', (event) => {
    //este evento identifica en que parte del li hice click.
    const nombreElemento = event.target.localName; // puede ser un input, label o boton
    const todoElemento = event.target.parentElement.parentElement; //para que me de el li
    const todoId = todoElemento.getAttribute('data-id');
    if( nombreElemento.includes('input')){ //se hizo click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle( 'completed' );
    }else if ( nombreElemento.includes('button')){ //se borra el todo
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento ); //se elimina el html del todo
    }
    console.log(todoList);
})

btnBorrar.addEventListener('click', (event) => {
    
    todoList.eliminarCompletados();
    for( let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento =  divTodoList.children[i]; //me da desde abajo hacia arriba por eso decremento
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
    // console.log(divTodoList.children);
})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if( !filtro){
        return;
    }
    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro){
            
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');

                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden')
                }
                break;
        }
    }
})