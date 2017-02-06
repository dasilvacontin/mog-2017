const Person = require('./Person.js')

class Warrior extends Person {
    constructor (name, hp = 120, atk) {
        super(name, hp, atk)
    }
}

console.log('Warrior processed')
module.exports = Warrior