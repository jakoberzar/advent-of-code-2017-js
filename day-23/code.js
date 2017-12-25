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
    const program0 = new Program(0, input);

    while (program0.isRunning) {
        program0.processInstruction();
    }

    console.log(program0.timesMul);
}


function main2() {
    const input = parseInput(input2);
    const program0 = new Program(0, input);

    while (program0.isRunning) {
        program0.processInstruction();
    }

    console.log(program0.registers.h);

}

function main3() {
    let h = 0;
    for (let b = 106500; b <= 123500; b += 17) {
        let f = 1;
        for (let d = 2; d < b && f == 1; d++) {
            if (b % d == 0) {
                console.log(b, d, b / d);
                f = 0;
            }
        }
        if (f == 0) {
            h++;
        }
    }
    console.log(h);
}

class Program {
    constructor(programId, input) {
        this.registers = { a:1, b:0, c:0, d:0, e:0, f:0, g:0, h:0, p:programId };
        this.programId = programId;
        this.input = input;
        this.pc = 0;
        this.playingFrequency = null;

        this.isWaiting = false;
        this.isRunning = true;

        this.timesMul = 0;
    }

    processInstruction() {
        if (this.pc < this.input.length && this.pc >= 0 && this.isRunning) {
            const instr = this.input[this.pc];
            switch (instr.op) {
                case 'set':
                    this.registers[instr.reg] = getOperandValue(instr, this.registers);
                    break;
                case 'sub':
                    this.registers[instr.reg] -= getOperandValue(instr, this.registers);
                    break;
                case 'mul':
                    this.registers[instr.reg] *= getOperandValue(instr, this.registers);
                    this.timesMul++;
                    break;
                case 'jnz':
                    if (getOperandValue(instr, this.registers, true) != 0) {
                        this.pc += getOperandValue(instr, this.registers) - 1;
                    }
                    break;
                default:
                    break;
            }
            this.pc += 1;
        } else {
            // Out of bounds
            this.isRunning = false;
        }
    }
}



main3();

/*
set b 65
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23

a=1
b=65
c=65

jnz a 2 -> 5 (mul b 100)

a:1
b:106500
c:123500
d:2
e:6
f:1
g:-106494
h:0
p:0

"{
    "a":1,
    "b":106500,
    "c":123500,
    "d":2,
    "e":7,
    "f":1,
    "g":-106493,
    "h":0,
    "p":0
}"


-------------
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8

g=d
g=d*e
g=(d*e)-106500
ko bo g=0, torej bo g=(d*e) =106500 -> e=53250, nastavi f=0
e=e+1
g=e-106500
loopaj, dokler ni e=106500

optimizirano=
    e=b,
    if (b/d < b) f=0

-------------
sub d -1
set g d
sub g b
jnz g -13

d=3
g=d-b
loopaj, dokler d-b !== 0, torej ko bo d=106500 pejt naprej

-------------
jnz f 2
sub h -1

ko enkrat f ne bo nič, h ne prištej 1.
=> vsakič, ko je f=0, h prištej 1 - h = število, kolikokrat se f nastavi na 0.

-------------
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23

loopaj, dokler je c-b !== 0, torej nehaj izvajat program, ko bo c==b


b = 106500
h = 0;
for (let b = 106500; b < 123500; b += 17) {
    for ()
}
*/