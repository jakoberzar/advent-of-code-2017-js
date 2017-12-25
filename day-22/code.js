function parseInput(input) {
    return input.trim().split('\n').map(line => line.split(''));
}

function directionToVector(dir) {
    if (dir == 0) return {delX: 0, delY: 1};
    if (dir == 1) return {delX: -1, delY: 0};
    if (dir == 2) return {delX: 0, delY: -1};
    if (dir == 3) return {delX: 1, delY: 0};
}

function main1() {
    const MAX_BURSTS = 10000;

    let input = parseInput(input2);
    let position = { X: Math.floor(input[0].length / 2), Y: Math.floor(input.length / 2)};
    let direction = 2; // Up
    let infectedBursts = 0;

    for (let burst = 0; burst < MAX_BURSTS; burst++) {
        const node = input[position.Y][position.X];
        if (node === '.') {
            direction = (direction - 1 + 4) % 4;
            input[position.Y][position.X] = '#';
            infectedBursts++;
        } else {
            direction = (direction + 1 + 4) % 4;
            input[position.Y][position.X] = '.';
        }

        const del = directionToVector(direction);
        position.X += del.delX;
        position.Y += del.delY;
        if (position.X < 0) {
            for (let i = 0; i < input.length; i++) input[i].unshift('.');
            position.X++;
        }
        if (position.X >= input[0].length) {
            for (let i = 0; i < input.length; i++) input[i].push('.');
        }
        if (position.Y < 0) {
            let row = [];
            for (let i = 0; i < input[0].length; i++) row.push('.');
            input.unshift(row);
            position.Y++;
        }
        if (position.Y >= input.length) {
            let row = [];
            for (let i = 0; i < input[0].length; i++) row.push('.');
            input.push(row);
        }
    }

    console.log(input);
    console.log(infectedBursts);
}


function main2() {
    const MAX_BURSTS = 10000000;

    let input = parseInput(input2);
    let position = { X: Math.floor(input[0].length / 2), Y: Math.floor(input.length / 2)};
    let direction = 2; // Up
    let infectedBursts = 0;

    for (let burst = 0; burst < MAX_BURSTS; burst++) {
        const node = input[position.Y][position.X];
        if (node === '.') {
            direction = (direction - 1 + 4) % 4;
            input[position.Y][position.X] = 'W';
        } else if (node === 'F') {
            direction = (direction - 2 + 4) % 4;
            input[position.Y][position.X] = '.';

        } else if (node === 'W') {
            input[position.Y][position.X] = '#';
            infectedBursts++;
        } else {
            direction = (direction + 1 + 4) % 4;
            input[position.Y][position.X] = 'F';
        }

        const del = directionToVector(direction);
        position.X += del.delX;
        position.Y += del.delY;
        if (position.X < 0) {
            for (let i = 0; i < input.length; i++) input[i].unshift('.');
            position.X++;
        }
        if (position.X >= input[0].length) {
            for (let i = 0; i < input.length; i++) input[i].push('.');
        }
        if (position.Y < 0) {
            let row = [];
            for (let i = 0; i < input[0].length; i++) row.push('.');
            input.unshift(row);
            position.Y++;
        }
        if (position.Y >= input.length) {
            let row = [];
            for (let i = 0; i < input[0].length; i++) row.push('.');
            input.push(row);
        }
    }

    console.log(input);
    console.log(infectedBursts);
}

main2();