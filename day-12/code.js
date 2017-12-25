function parseInput(input) {
    const arr = []
    const lines = input.trim().split('\n');
    lines.forEach(line => {
        const parts = line.split(' <-> ');
        const connected = parts[1].trim().split(', ').map(x => parseInt(x));
        arr[parts[0]] = connected;
    });
    return arr;
}

function findReachable(input, start) {
    const queue = [];
    queue.push(start);
    const reachable = [];

    while (queue.length > 0) {
        const ind = queue.pop();
        const elements = input[ind];
        const diff = _.difference(elements, reachable);
        diff.forEach(el => {
            queue.push(el);
            reachable.push(el);
        });
    }

    return reachable;
}


function main1() {
    const input = parseInput(input2);
    const reachable = findReachable(input, 0);
    console.log(reachable.length);
}

function main2() {
    const input = parseInput(input2);

    let allFound = [];
    let groupsN = 0;

    while (allFound.length < input.length) {
        const notYetFound = [];
        for (let i = 0; i < input.length; i++) {
            if (allFound.indexOf(i) == -1) {
                notYetFound.push(i);
            }
        }
        if (notYetFound.length > 0) {
            const reachable = findReachable(input, notYetFound[0]);
            groupsN++;
            allFound = allFound.concat(...reachable);
            allFound = _.uniq(allFound);
        }
    }

    console.log(groupsN);
}

main2();