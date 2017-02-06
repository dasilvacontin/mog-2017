/*
console.log('Hello World')
  vgafib07
  vga2017
*/

var variableName
var variableName = 42
console.log(variableName)

function sum (a, b) {
  return a + b
}

console.log(sum(1, variableName))
console.log(sum.toString())

// number
// 4 4.56
// 3 / 2 => 1.5

// string
// typeof 'asdf' => 'string'
var str = 'hi what\'s up'
var str2 = "hi what's up"
console.log(`hi what's up ${variableName}`)

// objects
var obj = {
  name: 'David',
  name2: 64
}
console.log(obj.name)
console.log(obj['name' + 2])
obj.name = 'Victor'
obj['name'] = 'Edgar'
delete obj.name
delete obj['name']

// array
var arr = []
arr = new Array(10)
arr = [1, 'david', function () {}]
arr.points = 5
arr[2]()
arr.push(5)
arr.pop()
arr.shift()
arr.forEach(function (elem, i, arr) {
  console.log(elem)
})

// &&, ||
// true, false
// === (strict equality)
// >=, >, <, <=
// https://dorey.github.io/JavaScript-Equality-Table/
if (true) {

} else if (false) {

} else {

}

for (var i = 0; i < 10; ++i) {
  console.log(i)
}

class Rect {
  constructor (width, height) {
    this.width = width
    this.height = height
  }

  getArea () {
    return this.width * this.height
  }
}

class Square extends Rect {
  /**
   * @private
   **/
  constructor (edge) {
    super(edge, edge)
    // this.edge = edge
  }
}

var r = new Rect(4, 5)
var sq = new Square(3)

console.log(`rect's area is ${r.getArea()}`)
console.log(`square's are is ${sq.getArea()}`)

// object refs
var a = { score: 50 }
var b = a
a.score += 10
console.log(b)

/*
var a = new String('asdf')
var b = a
a.hi = 5
console.log(b)
*/

