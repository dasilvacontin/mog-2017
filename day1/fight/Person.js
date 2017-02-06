class Person {
    constructor (name, hp = 80, atk = 10) {
        this.name = name
        this.hp = hp
        this.atk = atk
    }

    hit (opponent) {
        opponent.hp -= this.atk
    }

    isAlive () {
        return (this.hp > 0)
    }
}

console.log('Person processed')
module.exports = Person