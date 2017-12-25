let seenBefore = [];

function checkIfSeen(arr) {
    for (let i = 0; i < seenBefore.length; i++) {
        debugger;
        if (_.isEqual(arr, seenBefore[i])) return true;
    }
    return false;
}

function main1() {
    console.log('test');
    const arr = input1.trim().split("\t").map(x => parseInt(x));
    let count = 0;

    do  {
        seenBefore.push(arr.slice());
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[maxIndex]) maxIndex = i;
        }

        let distVal = arr[maxIndex];
        arr[maxIndex] = 0;
        let curIndex = (maxIndex + 1) % arr.length;
        while (distVal > 0) {
            arr[curIndex] += 1;
            distVal -= 1;
            curIndex = (curIndex + 1) % arr.length;
        }
        count++;

    } while (!checkIfSeen(arr))

    console.log(count)

}

function main2() {
    console.log('test');
    const arr = input1.trim().split("\t").map(x => parseInt(x));
    let count = 0;

    do  {
        seenBefore.push(_.clone(arr));
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[maxIndex]) maxIndex = i;
        }

        let distVal = arr[maxIndex];
        arr[maxIndex] = 0;
        let curIndex = (maxIndex + 1) % arr.length;
        while (distVal > 0) {
            arr[curIndex] += 1;
            distVal -= 1;
            curIndex = (curIndex + 1) % arr.length;
        }
        count++;

    } while (!checkIfSeen(arr))

    count = 0;
    seenBefore = [];

    do  {
        seenBefore.push(_.clone(arr));
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[maxIndex]) maxIndex = i;
        }

        let distVal = arr[maxIndex];
        arr[maxIndex] = 0;
        let curIndex = (maxIndex + 1) % arr.length;
        while (distVal > 0) {
            arr[curIndex] += 1;
            distVal -= 1;
            curIndex = (curIndex + 1) % arr.length;
        }
        count++;

    } while (!checkIfSeen(arr))



    console.log(count)

}

main2();