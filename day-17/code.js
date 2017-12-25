const arr = [0];
let position = 0;

function parseInput(input) {

}


function main1() {
    const steps = parseInt(input2.trim());
    for (let n = 1; n < 2018; n++) { // 2018
        let newIdx = (position + steps) % arr.length;
        arr.splice(newIdx + 1, 0, n);
        position = newIdx + 1;
    }
    console.log(arr[(position + 1) % arr.length]);
}

let arrLen = 1;

function main2() {
    const steps = parseInt(input2.trim());
    const start = performance.now();
    let lastPos1 = 0;
    for (let n = 1; n < 50000000; n++) { // 2018
        let newIdx = (position + steps) % arrLen;
        arrLen++;
        position = newIdx + 1;
        if (n % 100000 == 0) {
            const stop = performance.now();
            console.log(n, n / 50000000 * 100, stop - start)
        }
        if (position == 1) lastPos1 = n;
    }
    console.log(lastPos1)
    console.log(arr[1]);


}

main2();