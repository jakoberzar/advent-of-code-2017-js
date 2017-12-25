function parseInput(input) {

}


function main1() {
    let path = input2.trim().split(',');

    // Offset odd-r horizontal layout
    let nToS = 0;
    let neToSw = 0;
    let nwToSe = 0;
    for (let i = 0; i < path.length; i++) {
        const str = path[i];

        if (str == 'n') {
            nToS++;
        } else if (str == 'ne') {
            neToSw++;
        } else if (str == 'se') {
            nwToSe--;
        } else if (str == 's') {
            nToS--;
        } else if (str == 'sw') {
            neToSw--;
        } else if (str == 'nw') {
            nwToSe++;
        }
    }

    console.log(nToS, neToSw, nwToSe);
    // 417 367 41

    while (neToSw > 0 && nwToSe > 0) {
        nToS++;
        neToSw--;
        nwToSe--;
    }

    while (neToSw < 0 && nwToSe < 0) {
        nToS--;
        neToSw++;
        nwToSe++;
    }

    console.log(nToS, neToSw, nwToSe);
    // let dist = Math.abs(nToS + neToSw + nwToSe);
    // if (nToS > 0 && (nwToSe < 0 || neToSw < 0)) {
    //     let under = nwToSe < 0 ? nwToSe : neToSw;
    //     let diff =
    // }
    console.log(Math.abs(nToS + neToSw + nwToSe));
}

function main2() {
    let path = input2.trim().split(',');

    // Offset odd-r horizontal layout
    let nToS = 0;
    let neToSw = 0;
    let nwToSe = 0;
    let maxPath = 0;

    for (let i = 0; i < path.length; i++) {
        const str = path[i];

        if (str == 'n') {
            nToS++;
        } else if (str == 'ne') {
            neToSw++;
        } else if (str == 'se') {
            nwToSe--;
        } else if (str == 's') {
            nToS--;
        } else if (str == 'sw') {
            neToSw--;
        } else if (str == 'nw') {
            nwToSe++;
        }

        let dist = getDist(nToS, neToSw, neToSw) ;
        if (dist > maxPath) {
            maxPath = dist;
        }
    }



    console.log(nToS, neToSw, nwToSe);
    console.log(maxPath);
}

function getDist(ntos, nwtose, netosw) {
    let neToSw = netosw;
    let nToS = ntos;
    let nwToSe = nwtose;
    while (neToSw > 0 && nwToSe > 0) {
        nToS++;
        neToSw--;
        nwToSe--;
    }

    while (neToSw < 0 && nwToSe < 0) {
        nToS--;
        neToSw++;
        nwToSe++;
    }

    const dist = Math.abs(nToS + neToSw + nwToSe);
    return dist;
}

main2();
// main1();