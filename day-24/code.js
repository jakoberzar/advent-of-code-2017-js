function parseInput(input) {
    return input.trim().split('\n').map(line => {
        const els = line.split('/').map(x => parseInt(x));
        return {
            el1: els[0],
            el2: els[1],
            els: els,
            taken: false,
        };
    });
}

function sideMatches(value, component) {
    if (component.el1 === value) {
        return 0;
    } else if (component.el2 === value) {
        return 1;
    } else {
        return -1;
    }
}

function take(inPorts, input) {
    let maxSum = 0;
    let bestComponentIndex = -1;
    let bestLen = 0;
    for (let i = 0; i < input.length; i++) {
        const component = input[i];
        const match = sideMatches(inPorts, component);
        if (!component.taken && match >= 0) {
            component.taken = true;
            const otherEnd = match === 0 ? 1 : 0;
            const result = take(component.els[otherEnd], input);
            if (result.len > bestLen || (result.len == bestLen && result.sum >= maxSum)) {
                maxSum = result.sum;
                bestComponentIndex = i;
                bestLen = result.len;
            }
            component.taken = false;
            // const bestComponent = take
        }
    }

    let thisSum = maxSum;
    if (bestComponentIndex >= 0) {
        const comp = input[bestComponentIndex];
        thisSum += comp.el1 + comp.el2;
        bestLen++;
    }

    return {
        sum: thisSum,
        idx: bestComponentIndex,
        len: bestLen,
    }
}

function main1() {
    debugger;
    const input = parseInput(input2);
    console.log(input);

    let sum = take(0, input)
    console.log(sum);
}


function main2() {
    const input = parseInput(input2);
    console.log(input);

    let sum = take(0, input)
    console.log(sum);
}

function main3() {

}

main2();