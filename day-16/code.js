function parseInput(input) {
    return input.trim().split(',').map(el => {
        const type = el.charAt(0);
        if (type == 's') {
            return {
                t: 'spin',
                n: parseInt(el.substring(1)),
            };
        } else if (type == 'x') {
            const remSplit = el.substring(1).split('/');
            const idx1 = Math.min(remSplit[0], remSplit[1]);
            const idx2 = Math.max(remSplit[0], remSplit[1]);
            return {
                t: 'exchange',
                first: idx1,
                second: idx2,
            };
        } else if (type == 'p') {
            const remSplit = el.substring(1).split('/');
            return {
                t: 'partner',
                first: remSplit[0],
                second: remSplit[1]
            };
        }
    })
}


function main1() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let dancing = alphabet.substring(0, 16);

    const input = parseInput(input2);

    input.forEach(move => {
        if (move.t === 'spin') {
            const p1 = dancing.substr(0, dancing.length - move.n);
            const p2 = dancing.substr(dancing.length - move.n, move.n);
            dancing = p2 + p1;
        } else if (move.t === 'exchange') {
            const ch1 = dancing.substr(move.first, 1);
            const ch2 = dancing.substr(move.second, 1);
            const sp = dancing.split('');
            sp[move.first] = ch2;
            sp[move.second] = ch1;
            dancing = sp.join('');
        } else if (move.t === 'partner') {
            const idx1 = dancing.indexOf(move.first);
            const idx2 = dancing.indexOf(move.second);
            const first = Math.min(idx1, idx2);
            const second = Math.max(idx1, idx2);
            const sp = dancing.split('');
            sp[first] = move.second;
            sp[second] = move.first;
            dancing = sp.join('');
        }
    });


    console.log(dancing);

}

let progDiv = document.getElementById('progress');

function main2() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let dancing = alphabet.substring(0, 16);
    let found = [];

    const input = parseInput(input2);
    const start = performance.now();
    const rep = 60;
    const limit = 1000000000 % rep;
    for (let i = 0; i < limit; i++) { // 1000000000
        for (let j = 0; j < input.length; j++) {
            const move = input[j];
            if (move.t === 'spin') {
                const p1 = dancing.substr(0, dancing.length - move.n);
                const p2 = dancing.substr(dancing.length - move.n, move.n);
                dancing = p2 + p1;
            } else if (move.t === 'exchange') {
                const ch1 = dancing.substr(move.first, 1);
                const ch2 = dancing.substr(move.second, 1);
                dancing = dancing.substring(0, move.first) + ch2 + dancing.substring(move.first + 1, move.second) + ch1 + dancing.substring(move.second + 1);
            } else if (move.t === 'partner') {
                const idx1 = dancing.indexOf(move.first);
                const idx2 = dancing.indexOf(move.second);
                let first = idx1;
                let second = idx2;
                let firstChar = move.second;
                let secondChar = move.first;
                if (second < first) {
                    first = idx2;
                    second = idx1;
                    firstChar = move.first;
                    secondChar = move.second;
                }
                dancing = dancing.substring(0, first) + firstChar + dancing.substring(first + 1, second) + secondChar + dancing.substring(second + 1);
            }
        }
        if (found.indexOf(dancing) != -1) {
            console.log('repeated', i);
        } else {
            found.push(dancing);
        }
        if (i % 100 == 0) {
            const current = performance.now();
            console.log(i.toString(), (i / 1000000000) + '%', dancing, current - start);
        }
    }


    console.log(dancing);
}


function main3() {
    // pogbjfihclkemadn
    const input = parseInput(input2);
    const dancing = new Dancers(16);
    // dancing.exchange(3, 4);
    // console.log(dancing.toString());
    // dancing.partner('e'.charCodeAt(0) - 'a'.charCodeAt(0), 'b'.charCodeAt(0) - 'a'.charCodeAt(0));
    // console.log(dancing.toString());
    const start = performance.now();
    for (let i = 0; i < 1000000000; i++) { // 1000000000
        for (let j = 0; j < input.length; j++) {
            const move = input[j];
            if (move.t == 'spin') {
                dancing.spin(1);
            } else if (move.t == 'exchange') {
                dancing.exchange(move.first, move.second);
            } else if (move.t == 'partner') {
                const a = 'a'.charCodeAt(0);
                dancing.partner(move.first.charCodeAt(0) - a, move.second.charCodeAt(0) - a);
            }
        }
        if (i % 10000 == 0) {
            const current = performance.now();
            console.log(i.toString(), (i / 1000000000) + '%', dancing.toString(), current - start);
        }
    }
// eanlfcbkgmdpihoj
// pkgnhomelfdibjac

    console.log(dancing.toString());

}


class Dancers {
    constructor(len) {
        this.len = len;
        this.values = [];
        for (let i = 0; i < len; i++){
            this.values.push(i);
        }
        this.start = 0;
    }

    toString() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let str = '';
        for (let i = 0; i < this.len; i++) {
            const idx = (this.start + i) % this.len;
            str += alphabet.substr(this.values[idx], 1);
        }
        return str;
    }

    spin(val) {
        this.start = (this.start - val + this.len) % this.len;
    }

    exchange(idx1Off, idx2Off) {
        const idx1 = (this.start + idx1Off) % this.len;
        const idx2 = (this.start + idx2Off) % this.len;
        const tmp = this.values[idx1];
        this.values[idx1] = this.values[idx2];
        this.values[idx2] = tmp;
    }

    partner(ch1, ch2) {
        const idx1 = this.find(ch1);
        const idx2 = this.find(ch2);
        const tmp = this.values[idx1];
        this.values[idx1] = this.values[idx2];
        this.values[idx2] = tmp;
    }

    find(val) {
        for (let i = 0; i < this.len; i++) {
            if (this.values[i] == val) {
                return i;
            }
        }
    }
}

main2();