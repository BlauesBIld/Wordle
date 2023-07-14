const data = {
    color: 'red',
    name: 'Jane Doe',
    type: 'Superhero',
    animalLongKeyName: 'Shark',
    number: 42,
    heroes: ['Wonder Woman:DC', 'Batman:DC', 'Thor:Marvel', 'Ant Man:Marvel'],
    msg: 'This is the real message',
};

// 4. Spread vs Rest

function nicePrintHeroes( ... heroes) {
    heroes.forEach(element => {
        console.log(element.split(':'))
    });
}

nicePrintHeroes(...data.heroes, 'Iron Man: Marvel', 'Hulk: Marvel');

// 3. Copy vs reference

const heroes = data.heroes;
const customHeroes = [...heroes];

customHeroes.push('Spiderman:Marvel');

console.log(heroes);
console.log(customHeroes);

// 2. Destructuring arrays

//const h1 = data.heroes[0]
//const h2 = data.heroes[1]

const [h1,h2] = data.heroes;
//console.log(h1,h2);

//console.log(data);

// 1. Deconstructing the data object

//const color = data.color;
//const name = data.name;
//const animal = data.animalLongKeyName;

const {color, name = 'Dejan', animalLongKeyName: animal, msg = 'no message'} = data;

//console.log(color, name, animal, msg);

function printData({color, name, animalLongKeyName: animal, msg}) {
    console.log(color, name, animal, msg);
}

//printData(data);

function printText({name, color, msg}) {
    console.log(`Hello ${name}, your favorite color is ${color} and your message is: ${msg}`);
}

//printText(data);
