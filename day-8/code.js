const registers = {};

function parseInput(input) {
    return input.trim().split('\n').map(line => {
        const elements = line.split(' ');
        return {
            register: elements[0],
            operation: elements[1],
            operand: parseInt(elements[2]),
            conditionRegister: elements[4],
            conditionOperator: elements[5],
            conditionValue: parseInt(elements[6])
        };
    });
}

function initializeRegisters(input) {
    const regs = input.map(l => l.register);
    const uniqRegs = _.unique(regs);
    uniqRegs.forEach(element => {
        registers[element] = 0;
    });
}

function executeLine(lineEntry) {
    // First, check condition
    const condRegValue = registers[lineEntry.conditionRegister];
    const check = eval(condRegValue + " " + lineEntry.conditionOperator + " " + lineEntry.conditionValue);
    if (check) {
        if (lineEntry.operation == "inc") {
            registers[lineEntry.register] += lineEntry.operand;
        } else {
            registers[lineEntry.register] -= lineEntry.operand;
        }
    }
}

function getHighestRegister() {
    let max = -Infinity;
    for (let i in registers) {
        if (registers[i] > max) {
            max = registers[i];
        }
    }
    return max;
}


function main1() {
    const input = parseInput(input2);
    initializeRegisters(input);
    input.forEach(el => {
        executeLine(el);
    })
    console.log(getHighestRegister());
}

function main2() {
    const input = parseInput(input2);
    initializeRegisters(input);
    let max = 0;
    input.forEach(el => {
        executeLine(el);
        let m = getHighestRegister();
        if (m > max) {
            max = m;
        }
    })
    console.log(max);

}

main2();