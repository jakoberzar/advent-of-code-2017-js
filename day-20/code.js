function parseInput(input) {
    return input.trim().split('\n').map(line => {
        let sp = line.split(', ');
        let coords = [];
        for (let i = 0; i < sp.length; i++) {
            const nums = sp[i].substring(3, sp[i].length - 1).split(',').map(x => parseInt(x));
            coords[i] = nums;
        }
        return {
            position: coords[0],
            velocity: coords[1],
            acceleration: coords[2],
        };
    })
}
function main1() {
    const input = parseInput(input2);
    let lowestAcc = Infinity;
    let lowestElement = -1;
    // for (let i = 0; i < input.length; i++) {
    //     let acc = Math.pow(input[i].acceleration[0], 2) +
    //         Math.pow(input[i].acceleration[1], 2) +
    //         Math.pow(input[i].acceleration[2], 2);
    //     if (acc < lowestAcc) {
    //         lowestAcc = acc;
    //         lowestElement = i;
    //     }
    // }

    let LOOPS_LIMIT = 10000;
    for (let loops = 0; loops < LOOPS_LIMIT; loops++) {
        for (let i = 0; i < input.length; i++) {
            for (let c = 0; c < 3; c++) {
                input[i].velocity[c] += input[i].acceleration[c];
                input[i].position[c] += input[i].velocity[c];
            }
        }
        if (loops % (LOOPS_LIMIT / 100) == 0) console.log(loops, loops / (LOOPS_LIMIT / 100) + '%');
    }
    for (let i = 0; i < input.length; i++) {
        let pos = Math.pow(input[i].position[0], 2) +
            Math.pow(input[i].position[1], 2) +
            Math.pow(input[i].position[2], 2);
        if (pos < lowestAcc) {
            lowestAcc = pos;
            lowestElement = i;
        }
    }
    console.log(lowestElement);
}


function main2() {
    const input = parseInput(input2);
    let lowestAcc = Infinity;
    let lowestElement = -1;
    let LOOPS_LIMIT = 100;

    for (let loops = 0; loops < LOOPS_LIMIT; loops++) {
        const taken = [{}, {}, {}];
        const takenTwice = [{}, {}, {}];
        for (let i = 0; i < input.length; i++) {
            if (input[i].removed) continue;
            for (let c = 0; c < 3; c++) {
                input[i].velocity[c] += input[i].acceleration[c];
                input[i].position[c] += input[i].velocity[c];
                // const cStr = c.toString() + '.';
                if (taken[c][input[i].position[c]]) {
                    taken[c][input[i].position[c]].push(i);
                } else {
                    taken[c][input[i].position[c]] = [i];
                }
            }
        }

        let crashed = {}; // index -> boolean
        let crashedWith = {}; // index -> [][][]
        for (let c = 0; c < 3; c++) {
            for (let i in taken[c]) {
                const els = taken[c][i];
                if (els.length > 1) {
                    for (let eli = 0; eli < els.length; eli++) {
                        const idxE = els[eli];
                        for (let other = 0; other < els.length; other++) {
                            if (other == eli) continue;
                            const idxO = els[other];
                            if (input[idxE].position[0] == input[idxO].position[0] &&
                                input[idxE].position[1] == input[idxO].position[1] &&
                                input[idxE].position[2] == input[idxO].position[2]
                            ) {
                                input[idxE].removed = true;
                                input[idxO].removed = true;
                            }
                        }
                    }
                }
            }
        }

        if (loops % (LOOPS_LIMIT / 100) == 0) console.log(loops, loops / (LOOPS_LIMIT / 100) + '%');
    }
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i].removed) continue;
        sum++;
    }
    console.log(sum);
    // Already in main1, only countSteps added.
}

main2();