function roll () {
    if (Math.random() < 0.1) {
        console.log('fail')
    } else {
        console.log('survived')
        setTimeout(roll, 500)
    }
}

roll()