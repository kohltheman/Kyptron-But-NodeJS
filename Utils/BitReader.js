class BitReader {
    constructor(data) {
        this.index = 0;
        this.Data = data;
    }

    read() {
        try {
            let index_ = 0;
            let bytes = [];
            for (let i = 0; i < this.Data.length; i++) {
                if (this.Data[i] === 0) {
                    if (this.index !== index_) {
                        index_++;
                    } else {
                        this.index++;
                        return bytes;
                    }
                } else if (this.index === index_) {
                    bytes.push(this.Data[i]);
                }
            }
            return null;
        } catch (error) {
            return [0x8];
        }
    }

    readString() {
        return Buffer.from(this.read()).toString();
    }

    readFloat() {
        return parseFloat(this.readString());
    }

    readInt() {
        return parseInt(this.readString());
    }

    peekString() {
        let returnValue = this.readString();
        this.index--;
        return returnValue;
    }

    peekFloat() {
        let returnValue = this.readFloat();
        this.index--;
        return returnValue;
    }

    peekInt() {
        let returnValue = this.readInt();
        this.index--;
        return returnValue;
    }
}

module.exports = {
    BitReader
}