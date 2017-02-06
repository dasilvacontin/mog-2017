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

class Wizard extends Person {
    constructor (name, hp, atk = 20) {
        super(name, hp, atk)
    }
}

class Warrior extends Person {
    constructor (name, hp = 120, atk) {
        super(name, hp, atk)
    }
}

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

const b = new Battle ()

/*
Math.random()
[].length
setTimeout(fn, ms)
// armor http://leagueoflegends.wikia.com/wiki/Armor

warrior.hit()
var h = warrior.hit
h()
*/

/*
function fnName (argName) {
    // ...
    return 
}

(function (argName) {
    ...
})(value)

Following ones have current context bound to `this`
(argName) => {
    //..
    return
}

arr.filter((argName) => ...)