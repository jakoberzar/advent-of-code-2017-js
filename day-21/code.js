const imageStart = `
.#.
..#
###
`;

function parseInput(input) {
    const transMatrices = _.partition(input.trim().split('\n').map(line => {
        const parts = line.split(' => ');
        const partsMatrices = parts.map(part => {
            const rows = part.split('/');
            return rows.map(row => row.split(''));
        });
        return {
            in: partsMatrices[0],
            out: partsMatrices[1],
            size: partsMatrices[0].length
        };
    }), transformation => transformation.size == 2);
    return {
        byTwo: transMatrices[0],
        byThree: transMatrices[1],
    }
}

function generateMatrixRotations(matrix) {
    let newMatrix = [];
    const len = matrix.length;
    const len2 = len - 1;
    let matrices = generate2DArray(8, len, []);
    for (let i = 0; i < len; i++) {
        let rows = generate2DArray(8, len, []);
        for (let j = 0; j < len; j++) {
            rows[0][j] = matrix[i][j];
            rows[1][j] = matrix[i][len2-j]; // Reversed
            rows[2][j] = matrix[len2-i][j];
            rows[3][j] = matrix[len2-i][len2-j]; // Reversed
            // Rotated
            rows[4][j] = matrix[j][i];
            rows[5][j] = matrix[j][len2-i]; // Reversed
            rows[6][j] = matrix[len2-j][i];
            rows[7][j] = matrix[len2-j][len2-i]; // Reversed
        }

        for (let matIdx = 0; matIdx < 8; matIdx++) {
            matrices[matIdx][i] = rows[matIdx];
        }
    }
    return matrices;
}

function checkMatch(matrix1, matrix2) {
    for (let row = 0; row < matrix1.length; row++) {
        for (let col = 0; col < matrix1[0].length; col++) {
            if (matrix1[row][col] != matrix2[row][col]) return false;
        }
    }
    return true;
}

function transformImageWith(image, transMatrices) {
    let match = -1;
    for (let transIdx = 0; transIdx < transMatrices.length; transIdx++) {
        const transformations = generateMatrixRotations(transMatrices[transIdx].in);
        for (let rotateIdx = 0; rotateIdx < transformations.length; rotateIdx++) {
            if (checkMatch(image, transformations[rotateIdx])) {
                match = transIdx;
                break;
            }
        }
        if (match != -1) break;
    }
    return transMatrices[match].out; // Check pointers
}

function countOnPixels(matrix) {
    return matrix
        .map(row => row
            .map(px => px === '#' ? 1 : 0)
            .reduce((prev, px) => prev + px, 0))
        .reduce((prev, px) => prev + px, 0);
}

function main1() {
    const input = parseInput(input2);
    const iterations = 18;

    let image = imageStart.trim().split('\n').map(row => row.split(''));

    for (let i = 0; i < iterations; i++) {
        if (image.length % 2 == 0) {
            // Transform by two
            if (image.length === 2) {
                image = _.clone(transformImageWith(image, input.byTwo));
            } else {
                let currSize = 2;
                let nextSize = currSize + 1;
                const newImage = generate2DArray(nextSize * image.length / 2, nextSize * image.length / 2, '.');
                for (let row = 0; row < image.length; row += currSize) {
                    const row1 = _.chunk(image[row], currSize);
                    const row2 = _.chunk(image[row + 1], currSize);
                    for (let smallIdx = 0; smallIdx < row1.length; smallIdx++) {
                        const small = [row1[smallIdx], row2[smallIdx]];
                        const newSmall = transformImageWith(small, input.byTwo);
                        for (let smallRow = 0; smallRow < nextSize; smallRow++) {
                            const newRow = (row / currSize) * nextSize + smallRow;
                            for (let smallCol = 0; smallCol < nextSize; smallCol++) {
                                const newCol = smallIdx * nextSize + smallCol;
                                newImage[newRow][newCol] = newSmall[smallRow][smallCol];
                            }
                        }
                    }
                }
                image = newImage;
            }
        } else if (image.length % 3 == 0) {
            // Transform by three
            if (image.length === 3) {
                image = _.clone(transformImageWith(image, input.byThree));
            } else {
                let currSize = 3;
                let nextSize = currSize + 1;
                const newImage = generate2DArray(nextSize * image.length / 3, nextSize * image.length / 3, '.');
                for (let row = 0; row < image.length; row += currSize) {
                    const row1 = _.chunk(image[row], currSize);
                    const row2 = _.chunk(image[row + 1], currSize);
                    const row3 = _.chunk(image[row + 2], currSize);
                    for (let smallIdx = 0; smallIdx < row1.length; smallIdx++) {
                        const small = [row1[smallIdx], row2[smallIdx], row3[smallIdx]];
                        const newSmall = transformImageWith(small, input.byThree);
                        for (let smallRow = 0; smallRow < nextSize; smallRow++) {
                            const newRow = (row / currSize) * nextSize + smallRow;
                            for (let smallCol = 0; smallCol < nextSize; smallCol++) {
                                const newCol = smallIdx * nextSize + smallCol;
                                newImage[newRow][newCol] = newSmall[smallRow][smallCol];
                            }
                        }
                    }
                }
                image = newImage;
            }
        } else {
            console.log(image.length);
        }

        console.log(image);
        console.log(countOnPixels(image));
    }
    console.log('ended');
}


function main2() {
    // Already in main1, only change iterations from 5 to 18.
}

main1();