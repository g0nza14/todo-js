import { Todo } from "./todo.class";


export class TodoList{
    constructor(){
        //this.todos = [];
        this.cargarLocalStorage();
    }
    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }
    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id); //devuelve un nuevo arreglo el cual se reescribe en el arreglo this.todo del constructor
        this.guardarLocalStorage();
    }
    marcarCompletado( id ){
        for( const todo of this.todos ){
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }
    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos)); //el segundo parametro hace que el array se convierta en un "string" pues setItem solo permite strings
    }
    cargarLocalStorage(){
        // if( localStorage.getItem('todo')){ //verifico que exista
        //     this.todos = JSON.parse( localStorage.getItem('todo') ); //pasar de string a array, es decir, su forma original
        //     console.log(this.todos);
        // }else{
        //     this.todos = [];
        // }

        //forma reducida:
        this.todos = localStorage.getItem('todo')
                        ? JSON.parse( localStorage.getItem('todo') )
                        : []; //pero almacena  un arreglo de Objetos, no instancias de Todo por eso implemento lo siguiente
        this.todos = this.todos.map( obj => Todo.fromJson( obj )); // el map permite barrer cada elemento de un arreglo y retornar un nuevo arreglo con cada objeto mutado
        //con lo anterior puedo acceder a metodos del Todo antes no podía porque en el localStorage no se almacenan metodos pero si propiedades. 
    }
}