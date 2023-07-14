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

function nicePrintHeroes(...heroes) {
    heroes.forEach((element) => {
        console.log(element.split(':'));
    });
}

nicePrintHeroes(...data.heroes, 'Iron Man:Marvel', 'Hulk:Marvel');

// 3. Copy vs reference

const heroes = data.heroes;
const customHeroes = [...heroes];

customHeroes.push('Iron Man:Marvel');

// console.log(heroes);
// console.log(customHeroes);

// 2. Destructuring of Arrays

// const h1 = data.heroes[0]
// const h2 = data.heroes[1]

const [h1, , h2] = data.heroes;
console.log(h1, h2);

// 1. Destructuring

// const color = data.color;
// const name = data.name;
// const animal = data.animalLongKeyName;

// Add it in one line with default values
const { color, name, animalLongKeyName: animal, msg = 'no message' } = data;
// console.log(color, name, animal, msg);

function printColor({ color = 'black' }) {
    console.log(color);
}

// printColor(data);

function printText({ name, color }) {
    console.log(`${name} loves the color ${color}`);
}

// printText(data);
