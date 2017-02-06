const Wizard = require('./Wizard.js')
const Warrior = require('./Warrior.js')

class Battle {
    constructor () {
        this.fighters = []

        const nFighters = 2 + Math.floor(20 * Math.random())
        for (let i = 0; i < nFighters; ++i) {
            const fighter = new (Math.random() < 0.5 ? Wizard : Warrior)(`f${i}`)
            this.fighters.push(fighter)
        }

        this.myTurn = this.turn.bind(this)
        this.turn()
    }

    turn () {
        this.fighters.forEach((fighter) => {
            // random between 0 and (length - 1)
            const randomIndex = Math.floor(Math.random() * this.fighters.length)
            const target = this.fighters[randomIndex]
            fighter.hit(target)
        })

        this.fighters = this.fighters.filter((fighter) => fighter.isAlive())

        if (this.fighters.length < 2) {
            // battle finished
            if (this.fighters.length === 1) {
                const winner = this.fighters[0]
                console.log(`${winner.name} won the battle!`)
            } else {
                console.log('tie')
            }
        } else {
            console.log(`${this.fighters.length} alive fighters`)
            setTimeout(this.myTurn, 10)
        }
    }
}

module.exports = Battle