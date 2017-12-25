function getBits(n, index, bits) {
    const bitMask = Math.pow(2, bits) - 1;
    const mask = bitMask << index;
    return (n & mask) >> index;
}

function* generator(startingValue, factor) {
    let previousValue = startingValue;
    while (true) {
        let product = previousValue * factor;
        let remainder = product % 2147483647;
        previousValue = remainder;
        yield remainder;
    }
}



function parseInput(input) {

}

function main1() {
    const input = input2;
    let genA = generator(input.genA, 16807);
    let genB = generator(input.genB, 48271);

    let matches = 0;
    for (let i = 0; i < 40000000; i++) {
        const valA = genA.next().value;
        const valB = genB.next().value;
        // console.log(valA, valB);
        const bitsA = getBits(valA, 0, 16);
        const bitsB = getBits(valB, 0, 16);
        if (bitsA == bitsB) {
            // console.log('match', i);
            matches++;
        }
    }

    console.log(matches);
}

function* generator2(startingValue, factor, multiplyMatch) {
    let previousValue = startingValue;
    while (true) {
        let product = previousValue * factor;
        let remainder = product % 2147483647;
        previousValue = remainder;
        if (remainder % multiplyMatch == 0) {
            yield remainder;
        }
    }
}

function main2() {
    const input = input2;
    let genA = generator2(input.genA, 16807, 4);
    let genB = generator2(input.genB, 48271, 8);

    let matches = 0;
    for (let i = 0; i < 5000000; i++) {
        const valA = genA.next().value;
        const valB = genB.next().value;
        // console.log(valA, valB);
        const bitsA = getBits(valA, 0, 16);
        const bitsB = getBits(valB, 0, 16);
        if (bitsA == bitsB) {
            // console.log('match', i);
            matches++;
        }
    }

    console.log(matches);
}

main2();