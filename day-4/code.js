function main1() {
    console.log('test');

    const result = input.trim().split('\n').map(line => {
        const words = line.trim().split(' ');
        const uniqueItems = _.uniq(words);
        return words.length == uniqueItems.length;
    }).reduce((pivot, current) => {
        if (current) return pivot + 1;
        else return pivot;
    }, 0);

    console.log(result);

}

function main() {
    console.log('test');

    const result = input.trim().split('\n').map(line => {
        const words = line.trim().split(' ');
        const letters = words.map(word => {
            return word.split('').sort();

        });
        for (let out = 0; out < words.length; out++) {
            for (let inside = 0; inside < words.length; inside++) {
                const res = _.isEqual(letters[out], letters[inside]);
                if (out != inside && res) {return false};
            }
        }
        return true;
    }).reduce((pivot, current) => {
        if (current) return pivot + 1;
        else return pivot;
    }, 0);

    console.log(result);

}


main();