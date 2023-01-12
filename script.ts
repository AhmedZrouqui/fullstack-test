const pattern = 'staticOne/:paramOne/staticTwo/staticThree/:paramTwo'

function getUrlParams(path: string, pattern: string): Object {
    const _path: string[] = path.split('/');
    const _pattern: string[] = pattern.split('/');
    let obj:any = {};
    for (let i:number = 0; i < Math.min(_pattern.length, _path.length); i++){
        if (_pattern[i].startsWith(':')) {
            //if param is only ':' it breaks and return the previous params
            //we could use obj[_path[i]] = null in that case too.
            if (_pattern[i].length < 2) break;
            obj[_pattern[i].slice(1,_pattern[i].length)] = _path[i];
        } else {
            if (_pattern[i] !== _path[i]) {
                break;
            }
        }
    } 

    return obj
}

//returns {}
console.log(getUrlParams('staticZero/one', pattern))

//returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one', pattern))

//returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one/staticThree/three', pattern))

//returns { one: 'paramOne', two: 'paramTwo' }
console.log(getUrlParams('staticOne/one/staticTwo/staticThree/two', pattern))


function objectDiff<T>(source: T, target: T): Object {
    let ret:any = {}
    for (let key in target) {
        if(source[key] !== target[key])
        ret[key] = {'old': source[key], 'new': target[key]}
    }
    return ret
}

console.log(objectDiff({id: "1", age:18}, {id:"2", name:"Ahmed", lastname: "Zrouqui", age: 18}))