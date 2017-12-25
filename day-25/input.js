let input1 = {
    stateA: [{
        write: 1,
        move: 1,
        nextState: "stateB",
    },{
        write: 0,
        move: -1,
        nextState: "stateB",
    }],
    stateB: [{
        write: 1,
        move: -1,
        nextState: "stateA",
    },{
        write: 1,
        move: 1,
        nextState: "stateA",
    }],
}

let input2 = {
    stateA: [{
        write: 1,
        move: 1,
        nextState: "stateB",
    },{
        write: 0,
        move: -1,
        nextState: "stateE",
    }],
    stateB: [{
        write: 1,
        move: -1,
        nextState: "stateC",
    },{
        write: 0,
        move: 1,
        nextState: "stateA",
    }],
    stateC: [{
        write: 1,
        move: -1,
        nextState: "stateD",
    },{
        write: 0,
        move: 1,
        nextState: "stateC",
    }],
    stateD: [{
        write: 1,
        move: -1,
        nextState: "stateE",
    },{
        write: 0,
        move: -1,
        nextState: "stateF",
    }],
    stateE: [{
        write: 1,
        move: -1,
        nextState: "stateA",
    },{
        write: 1,
        move: -1,
        nextState: "stateC",
    }],
    stateF: [{
        write: 1,
        move: -1,
        nextState: "stateE",
    },{
        write: 1,
        move: 1,
        nextState: "stateA",
    }],
}

const input3 = `
`;
