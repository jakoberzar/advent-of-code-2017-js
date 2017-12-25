function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function computeKnotHash(input) {
    const list = [];
    const size = 256; // 256 or 5
    let skipSize = 0;
    let currentPosition = 0;

    // Init list
    for (let i = 0; i < size; i++) {
        list[i] = i;
    }


    const lenArr = input.trim().split('')
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
    // console.log(res);
    return res;
}

function parseInput(input) {

}

function main1() {
    const prepend = input2.trim();
    let sum = 0;
    for (let row = 0; row < 128; row++) {
        let hex = computeKnotHash(prepend + '-' + row);

        const binary = hex.toUpperCase().split('').map(h => {
            let n = 0;
            if (h === '0') n = 0;
            if (h === '1') n = 1;
            if (h === '2') n = 2;
            if (h === '3') n = 3;
            if (h === '4') n = 4;
            if (h === '5') n = 5;
            if (h === '6') n = 6;
            if (h === '7') n = 7;
            if (h === '8') n = 8;
            if (h === '9') n = 9;
            if (h === 'A') n = 10;
            if (h === 'B') n = 11;
            if (h === 'C') n = 12;
            if (h === 'D') n = 13;
            if (h === 'E') n = 14;
            if (h === 'F') n = 15;
            const paded = pad(n.toString(2), 4);
            return paded;
        }).join('');

        const ones = binary.split('').reduce((prev, curr) => {
            return prev + parseInt(curr);
        }, 0);

        sum += ones;

    }

    console.log(sum);
}

function main2() {
    const prepend = input2.trim();
    let sum = 0;
    let grid = [];
    for (let row = 0; row < 128; row++) {
        let hex = computeKnotHash(prepend + '-' + row);

        const binary = hex.toUpperCase().split('').map(h => {
            let n = 0;
            if (h === '0') n = 0;
            if (h === '1') n = 1;
            if (h === '2') n = 2;
            if (h === '3') n = 3;
            if (h === '4') n = 4;
            if (h === '5') n = 5;
            if (h === '6') n = 6;
            if (h === '7') n = 7;
            if (h === '8') n = 8;
            if (h === '9') n = 9;
            if (h === 'A') n = 10;
            if (h === 'B') n = 11;
            if (h === 'C') n = 12;
            if (h === 'D') n = 13;
            if (h === 'E') n = 14;
            if (h === 'F') n = 15;
            const paded = pad(n.toString(2), 4);
            return paded;
        }).join('');

        if (row < 8) console.log(binary);

        const ones = binary.split('').reduce((prev, curr) => {
            return prev + parseInt(curr);
        }, 0);

        const rowArray = binary.split('').map(x => x == '0' ? '.' : '#');
        grid[row] = rowArray;

        sum += ones;
    }

    let n = 1;
    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 128; j++) {
            const justPainted = paint(grid, i, j, n);
            if (justPainted) n++;
        }
    }

    for (let i = 0; i < 8; i++) {
        let line = '';
        for (let j = 0; j < 8; j++) {
            line += grid[i][j] != '.' ? '1 ' : '. ';
        }
        console.log(line);
    }

    console.log(--n);


}

function paint(grid, y, x, number) {
    if (y < 0 || y >= 128) return false;
    if (x < 0 || x >= 128) return false;
    if (grid[y][x] != '#') return false;

    // Paint it
    grid[y][x] = number.toString();
    paint(grid, y+1, x, number);
    paint(grid, y-1, x, number);
    paint(grid, y, x-1, number);
    paint(grid, y, x+1, number);
    return true;
}

main2();