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

function main1() {
    const input = input2;
    let tape = new Array(50000000).fill(0);
    let position = 25000000;
    let currentState = "stateA";
    for (let i = 0; i < 12208951; i++) { // 6 or 12208951
        const val = tape[position];
        const st = input[currentState][val];
        tape[position] = st.write;
        position = (position + st.move) % 50000000;
        currentState = st.nextState;
    }

    const sum = tape.reduce((prev, cur) => prev + cur, 0);
    console.log(sum);
}


function main2() {

}

main1();