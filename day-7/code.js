function findBottom(objs) {
    const parents = objs.filter(o => o.programs.length > 0);
    const pnames = parents.map(p => p.name);
    const remaining = [];
    for (let i = 0; i < parents.length; i++) {
        let isBottom = true;
        for (let j = 0; j < parents.length; j++) {
            const is = parents[j].programs.filter(n => n == parents[i].name);
            if (is.length > 0) {
                isBottom = false;
                break;
            }
        }
        if (isBottom == true) {
            return parents[i];
        }
    }
}

const exclude = [];
const failedKids = [];

function findCorrupt(objMap, bottom) {
    let childSum = 0;
    let childSums = [];
    bottom.childObjs = [];
    for (let i = 0; i < bottom.programs.length; i++) {
        const child = objMap[bottom.programs[i]];
        const childSize = findCorrupt(objMap, child);
        childSums.push(childSize);
        bottom.childObjs.push(child);
        childSum += childSize;
    }

    let sumsAvg = childSums.reduce((prev, cur) => prev + cur, 0) / childSums.length;
    if (sumsAvg != childSums[0]) { // something not matching
        for (let i = 0; i < childSums.length; i++) {
            const child = childSums[i];
            const childObj = objMap[bottom.programs[i]];
            // What happens if we remove it
            // let copy = _.clone(childSums);
            let clone = _.clone(childSums);
            let copy = clone.splice(i, 1);
            let cloneAvg = clone.reduce((prev, cur) => prev + cur, 0) / clone.length;
            if (cloneAvg == clone[0]) {
                if (exclude.indexOf(childObj.name) == -1) {
                    console.log('corrupt', objMap[bottom.programs[i]], clone[0]);
                    failedKids.push(...childObj.programs);
                    // childSum = clone.reduce((prev, cur) => prev + cur, 0) + clone[0];
                    bottom.fixed = true;
                    break;
                }
                exclude.push(bottom.name);
            }

        }
    }

    bottom.childSums = childSums;
    bottom.childSize = childSum;
    bottom.completeSize = childSum + bottom.weight;

    return bottom.weight + childSum;
}

function addSums(objMap, node) {
    const childsSum = node.programs.map(pName => {
        const child = objMap[pName];
        const childSum = addSums(objMap, child);
        return childSum;
    });
    const completeSum = childsSum.reduce((x, y) => x + y, 0) + node.weight;
    node.sum = completeSum;
    node.childSums = childsSum;
    return completeSum;
}

function makeGraph(objMap, bottom) {
    const str = bottom.programs.map(n => {
        makeGraph(objMap, objMap[n]);
        return bottom.name + ' -> ' + n;
    }).join('\n');
    document.getElementById('input').innerHTML += str + '\n';
}

function main1() {
    const objs = input2.trim().split('\n').map(line => {
        let splited = line.split('->').map(s => s.trim());
        let splited1 = splited[0].split(' ');
        const name = splited1[0];
        const n = parseInt(splited1[1].substring(1, 3));

        const retobj = {
            name: name,
            size: n,
            programs: [],
        }

        if (splited.length > 1) {
            const names = splited[1].split(', ');
            retobj.programs = names;
        }

        return retobj;
    })

    const bottom = findBottom(objs);
    console.log(bottom);
}

function main2() {
    const objs = input2.trim().split('\n').map(line => {
        let splited = line.split('->').map(s => s.trim());
        let splited1 = splited[0].split(' ');
        const name = splited1[0];
        const n = parseInt(splited1[1].substring(1, splited1[1].length - 1));

        const retobj = {
            name: name,
            weight: n,
            programs: [],
        }

        if (splited.length > 1) {
            const names = splited[1].split(', ');
            retobj.programs = names;
        }

        return retobj;
    })

    const objMap = {};
    objs.forEach(element => {
        objMap[element.name] = element;
    });

    const bottom = findBottom(objs);
    // addSums(objMap, bottom);
    // makeGraph(objMap, bottom);
    const corrupt = findCorrupt(objMap, bottom);
    // console.log(failedKids);
    console.log(objMap);
    console.log(bottom);

}

main2();