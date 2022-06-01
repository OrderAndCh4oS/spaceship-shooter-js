function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function angleTo(angleOne, angleTwo) {
    return Math.atan2(Math.sin(angleOne - angleTwo),
        Math.cos(angleOne - angleTwo));
}

function isAngleBetweenRange(angleOne, angleTwo, range) {
    return angleTo(angleOne, angleTwo) <= range / 2 &&
        angleTo(angleOne, angleTwo) >= -(range / 2);
}

function shuffle(arr) {
    let randomizedArray = [];
    let array = arr;
    while(array.length !== 0) {
        let rIndex = Math.floor(array.length * Math.random());
        randomizedArray.push(array[rIndex]);
        array.splice(rIndex, 1);
    }
    return randomizedArray;
}
