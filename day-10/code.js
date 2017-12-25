const list = [];
const size = 256; // 256 or 5
// const size = 5; // 256 or 5
let skipSize = 0;
let currentPosition = 0;

function initList() {
    for (let i = 0; i < size; i++) {
        list[i] = i;
    }
}

function parseInput(input) {

}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}


function main1() {
    initList();
    input2.trim().split(',')
        .map(x => parseInt(x))
        .forEach(len => {
            const cpyArray = [];
            for (let i = 0; i < len; i++) {
                cpyArray[i] = list[(currentPosition + i) % size];
            }

            cpyArray.reverse();

            for (let i = 0; i < len; i++) {
                list[(currentPosition + i) % size] = cpyArray[i];
            }

            currentPosition = (currentPosition + len + skipSize) % size;
            skipSize++;
        });

    console.log(list);
    console.log(list[0] * list[1]);
}

function main2() {
    initList();
    // let input = '1,2,3';
    const lenArr = input2.trim().split('')
        .map(x => x.charCodeAt(0));
    const appendInput = [17, 31, 73, 47, 23];
    appendInput.forEach(element => {
        lenArr.push(element);
    });

    for (let round = 0; round < 64; round++) {
        lenArr.forEach(len => {
            const cpyArray = [];
            for (let i = 0; i < len; i++) {
                cpyArray[i] = list[(currentPosition + i) % size];
            }

            cpyArray.reverse();

            for (let i = 0; i < len; i++) {
                list[(currentPosition + i) % size] = cpyArray[i];
            }

            currentPosition = (currentPosition + len + skipSize) % size;
            skipSize++;
        });
    }

    // compute hash
    let denseArray = _.chunk(list, 16);
    const hexes = denseArray.map(arr => {
        const xored = arr.reduce((prev, curr) => {
            return prev ^ curr;
        }, 0);
        const hex = xored.toString(16);
        return pad(hex, 2);
    });

    const res = hexes.join('');
    console.log(res);
    console.log('3efbe78a8d82f29979031a4aa0b16a9d');

    console.log(list);
    console.log(list[0] * list[1]);

}

main2();