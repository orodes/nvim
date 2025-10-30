"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanBuffer = void 0;
class ScanBuffer {
    constructor() {
        this.buffer = [];
        this.index = 0;
        this.isExhausted = true;
    }
    addToQueue(input) {
        this.buffer.push('\n');
        this.buffer.push(...input);
        this.isExhausted = false;
    }
    consumeWhileMatchesRegex(regex, single) {
        const result = [];
        while (this.index < this.buffer.length && regex.test(this.buffer[this.index])) {
            result.push(this.buffer[this.index++]);
            if (single) {
                break;
            }
        }
        if (this.index >= this.buffer.length && !this.isExhausted) {
            this.isExhausted = true;
        }
        return result.join('');
    }
    skipWhitespace() {
        this.consumeWhileMatchesRegex(/[ \r\n\t]/, false);
    }
    initialContents() {
        return JSON.stringify(this.buffer.slice(this.index, this.index + 10).join(''));
    }
    readInt() {
        this.skipWhitespace();
        const contents = this.consumeWhileMatchesRegex(/[0-9-]/, false);
        let result = parseInt(contents);
        if (isNaN(result)) {
            result = undefined;
        }
        return result;
    }
    readChar() {
        this.skipWhitespace(); // todo: this isn't necessarily correct
        return this.consumeWhileMatchesRegex(/./, true) || undefined;
    }
    clear() {
        this.index = 0;
        this.buffer = [];
        this.isExhausted = true;
    }
}
exports.ScanBuffer = ScanBuffer;
//# sourceMappingURL=scanBuffer.js.map