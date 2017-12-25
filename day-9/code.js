function parseInput(input) {
    const chars = input.split('');
    let score = 0;
    let level = 1;
    let ignoreNext = false;
    let inGarbage = false;
    let charsGarbage = 0;

    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (ignoreNext) {
            ignoreNext = false;
            continue;
        }

        if (c == '!') {
            ignoreNext = true;
            continue;
        }

        if (inGarbage) {
            if (c == '>') {
                inGarbage = false;
            } else {
                charsGarbage++;
                continue;
            }
        }

        if (c == '<') {
            inGarbage = true;
            continue;
        }

        if (c == '{') {
            score += level;
            level++;
        }

        if (c == '}') {
            level--;
        }
    }

    return {
        score: score,
        garbage: charsGarbage
    }
}


function main1() {
    const res = parseInput(input2.trim());
    console.log(res);
}

function main2() {
    const res = parseInput(input2.trim());
    console.log(res);
}

main2();