const objDeepMerge = (target: { [x: string]: unknown }, source: { [x: string]: unknown }) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object)
            // @ts-ignore: correct soruce structure
            Object.assign(source[key], objDeepMerge(target[key], source[key]));
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
};

export default objDeepMerge;
