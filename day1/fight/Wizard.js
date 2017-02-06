const Person = require('./Person.js')

class Wizard extends Person {
    constructor (name, hp, atk = 20) {
        super(name, hp, atk)
    }
}

console.log('Wizard processed')
module.exports = Wizard