const input = 325489;
let lastN = 1;

let field = [[1]];
function generate() {
    let currentN = 1;
    while (lastN <= input) {
        const newH = field.length + 2;
        const newW = field[0].length + 2;

        let newField = [];
        for (let i = 0; i < newH; i++) {
            const newRow = [];
            for (let j = 0; j < newW; j++) newRow[j] = 0;
            newField[i] = newRow;
        }

        // Overwrite current
        for (let row = 0; row < field.length; row++) {
            for (let col = 0; col < field[0].length; col++) {
                newField[row+1][col+1] = field[row][col];
            }
        }

        for (let row = newH - 2; row >= 0; row--) {
            newField[row][newW - 1] = getSum(row, newW - 1, newField);
        }

        for (let col = newW - 2; col >= 0; col--) {
            newField[0][col] = getSum(0, col, newField);
        }

        for (let row = 1; row < newH; row++) {
            newField[row][0] = getSum(row, 0, newField);
        }

        for (let col = 1; col < newW; col++) {
            newField[newH - 1][col] = getSum(newH - 1, col, newField);
        }

        field = newField;

    }
}

function getSum(y, x, fld) {
    let sum = 0;
    let lowY = y - 1 < 0 ? 0 : y - 1;
    let lowX = x - 1 < 0 ? 0 : x - 1;
    let highY = y + 1 >= fld.length ? fld.length - 1 : y + 1;
    let highX = x + 1 >= fld.length ? fld.length - 1 : x + 1;
    for (let row = lowY; row <= highY; row++) {
        for (let col = lowX; col <= highX; col++) {
            sum += fld[row][col];
        }
    }
    lastN = sum;
    return sum;
}

function print(param) {
    let str = '<table>';
    for (let i = 0; i < param.length; i++) {
        str += '<tr>';
        for (let j = 0; j < param[i].length; j++) {
            str += '<td>' + param[i][j] + '</td>';
        }
        str += '</tr>';
    }
    str += '</table>';
    document.getElementById('out').innerHTML = str;
}

function findN(n) {
    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[0].length; col++) {
            if (field[row][col] == n) {
                return [row, col];
            }
        }
    }
}

function main() {
    console.log('test');
    generate();

    print(field);

    let lowest = Infinity;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[0].length; j++) {
            let n = field[i][j];
            if (n > input && n < lowest) lowest = n;
        }
    }

    console.log(lowest);

    // let coords = findN(input);
    // const mid = field.length / 2 - 0.5;
    // console.log('Difference ' + (Math.abs(coords[0] - mid) + Math.abs(coords[1] - mid)));
}


main();