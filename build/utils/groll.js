"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomUserIdFormat(option) {
    if (!Array.isArray(option.array)) {
        console.warn('typeof oprion.array must be array');
        return "none";
    }
    let randomNumber = Math.floor((Math.random() * option.array.length));
    const value = [];
    for (let index = 0; index < option.amount; index++) {
        const element = option.array[randomNumber];
        value.push(`<@${element}>`);
    }
    return value.join(' ');
}
exports.default = randomUserIdFormat;
