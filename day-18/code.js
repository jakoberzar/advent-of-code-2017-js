function parseInput(input) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return input.trim().split('\n').map(line => {
        const sp = line.split(' ');
        let operand = null;
        let operandRegister = null;
        if (sp.length > 2) {
            operand = sp[2];
            operandRegister = true;
            if (alphabet.indexOf(operand) == -1) {
                operand = parseInt(sp[2]);
                operandRegister = false;
            }
        }
        return {
            op: sp[0],
            reg: sp[1],
            operand: operand,
            operandRegister: operandRegister,
            regRegister: alphabet.indexOf(sp[1]) != -1,
        };
    });
}

let registers = {};
let pc = 0;
let playingFrequency = null;

function getOperandValue(instr, regs = null, procRegisters = false) {
    if (regs === null) regs = registers;
    if (instr.operandRegister == null || procRegisters) {
        return instr.regRegister ? regs[instr.reg] : parseInt(instr.reg);
    } else {
        return instr.operandRegister ? regs[instr.operand] : instr.operand;
    }
}

function main1() {
    const input = parseInput(input2);
    let recoveredFrequency = null;
    while (pc < input.length && pc >= 0 && recoveredFrequency == null) {
        const instr = input[pc];
        switch (instr.op) {
            case 'snd':
                playingFrequency = registers[instr.reg];
                break;
            case 'set':
                registers[instr.reg] = getOperandValue(instr);
                break;
            case 'add':
                registers[instr.reg] += getOperandValue(instr);
                break;
            case 'mul':
                registers[instr.reg] *= getOperandValue(instr);
                break;
            case 'mod':
                registers[instr.reg] = registers[instr.reg] % getOperandValue(instr);
                break;
            case 'rcv':
                if (registers[instr.reg] != 0) {
                    registers[instr.reg] = playingFrequency;
                    if (recoveredFrequency == null) {
                        recoveredFrequency = playingFrequency;
                    }
                }
                break;
            case 'jgz':
                if (registers[instr.reg] > 0) {
                    pc += getOperandValue(instr) - 1;
                }
                break;
            default:
                break;
        }
        pc += 1;
    }

    console.log(recoveredFrequency);
}


function main2() {
    const input = parseInput(input2);
    const program0 = new Program(0, input);
    const program1 = new Program(1, input);
    program0.setSendingQueue(program1);
    program1.setSendingQueue(program0);
    let deadlock = false;
    while (program0.isRunning && program1.isRunning && !deadlock) {
        program0.processInstruction();
        program1.processInstruction();
        // debugger;
        if (program0.isWaiting && program1.isWaiting) {
            deadlock = true;
            console.log('deadlock!');
            break;
        } else if (program0.isWaiting) {
            while (program0.receivingQueue.length == 0 && program1.isRunning && !program1.isWaiting) {
                program1.processInstruction();
            }
        } else if (program1.isWaiting) {
            while (program1.receivingQueue.length == 0 && program0.isRunning && !program0.isWaiting) {
                program0.processInstruction();
            }
        }
    }

    console.log(program1.timesSentValue);

}

class Program {
    constructor(programId, input) {
        this.registers = { p: programId };
        this.programId = programId;
        this.input = input;
        this.pc = 0;
        this.playingFrequency = null;

        this.isWaiting = false;
        this.isRunning = true;

        this.sendingQueue = null;
        this.receivingQueue = [];
        this.timesSentValue = 0;
    }

    setSendingQueue(OtherProgram) {
        this.sendingQueue = OtherProgram.receivingQueue;
    }

    processInstruction() {
        if (this.pc < this.input.length && this.pc >= 0 && this.isRunning) {
            const instr = this.input[this.pc];
            switch (instr.op) {
                case 'snd':
                    this.sendingQueue.push(getOperandValue(instr, this.registers));
                    this.timesSentValue += 1;
                    break;
                case 'set':
                    this.registers[instr.reg] = getOperandValue(instr, this.registers);
                    break;
                case 'add':
                    this.registers[instr.reg] += getOperandValue(instr, this.registers);
                    break;
                case 'mul':
                    this.registers[instr.reg] *= getOperandValue(instr, this.registers);
                    break;
                case 'mod':
                    this.registers[instr.reg] = this.registers[instr.reg] % getOperandValue(instr, this.registers);
                    break;
                case 'rcv':
                    if (this.receivingQueue.length > 0) {
                        this.registers[instr.reg] = this.receivingQueue.splice(0, 1)[0];
                        // debugger;
                        this.isWaiting = false;
                    } else {
                        this.isWaiting = true;
                        this.pc -= 1;
                    }
                    break;
                case 'jgz':
                    if (getOperandValue(instr, this.registers, true) > 0) {
                        this.pc += getOperandValue(instr, this.registers) - 1;
                    }
                    break;
                default:
                    break;
            }
            this.pc += 1;
            // console.log(this.programId, instr, this.registers);
        } else {
            // Out of bounds
            this.isRunning = false;
        }
    }
}



main2();