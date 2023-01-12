const pattern = 'staticOne/:paramOne/staticTwo/staticThree/:paramTwo'

function getUrlParams(path: string, pattern: string): Object {
    const _path: string[] = path.split('/');
    const _pattern: string[] = pattern.split('/');
    let obj:any = {};
    for (let i = 0; i < _pattern.length; i++){
        if (i === _path.length+1) break;
        if (_pattern[i].startsWith(':')) {
            //if param is only ':' it breaks and return the previous params
            //we could use obj[_path[i]] = null in that case too.
            if (_pattern[i].length < 2) break;
            obj[_path[i]] = _pattern[i].slice(1,_pattern[i].length);
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


//change Object types if needed
interface IProps{
    [key: string]: any;
    id: string;
    name?: string;
    lastname?: string;
    age: number;
}

function objectDiff(source: IProps, target: IProps): Object {
    let ret:any = {}
    for (let key in target) {
        ret[key] = {'old': source[key], 'new': target[key]}
    }
    return ret
}

console.log(objectDiff({id: "1", age:18}, {id:"2", name:"Ahmed", lastname: "Zrouqui", age: 25}))