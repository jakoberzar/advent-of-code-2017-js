function main1() {
    const arr = input.trim().split('\n').map(x => parseInt(x));
    let currentPos = 0;
    let steps = 0;
    while (currentPos < arr.length) {
        const move = arr[currentPos];
        arr[currentPos] = move + 1;
        currentPos += move;
        steps++;
    }
    console.log(steps);
}

function main2() {
    const arr = input.trim().split('\n').map(x => parseInt(x));
    let currentPos = 0;
    let steps = 0;
    while (currentPos < arr.length) {
        const move = arr[currentPos];
        arr[currentPos] = move >= 3 ? move - 1 : move + 1;
        currentPos += move;
        steps++;
    }
    console.log(steps);

}


main2();