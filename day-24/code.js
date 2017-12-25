let input1 = `
0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`
let input2 = `
25/13
4/43
42/42
39/40
17/18
30/7
12/12
32/28
9/28
1/1
16/7
47/43
34/16
39/36
6/4
3/2
10/49
46/50
18/25
2/23
3/21
5/24
46/26
50/19
26/41
1/50
47/41
39/50
12/14
11/19
28/2
38/47
5/5
38/34
39/39
17/34
42/16
32/23
13/21
28/6
6/20
1/30
44/21
11/28
14/17
33/33
17/43
31/13
11/21
31/39
0/9
13/50
10/14
16/10
3/24
7/0
50/50
`

const input3 = `
`;

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