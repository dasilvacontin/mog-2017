function sayName () {
    console.log(this)
    console.log(`my name is ${this.name}`)
}

sayName()
global.name = 'David'
sayName()

var a = { name: 'John' }
a.n = sayName
a.n()

/*
    El parametro implicito de una funcion (aka `this`) toma el valor del objeto a traves del cual se ejecuta la funcion.
*/
