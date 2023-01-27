class BitWriter {
    constructor() {
        this.bytes = [];
    }

    write(data) {
        if (Array.isArray(data)) {
            data.forEach(byte => this.bytes.push(byte));
        } else if (typeof data === "string") {
            this.write(Buffer.from(data, "utf8"));
        } else if (typeof data === "number") {
            this.write(Buffer.from(data.toString(), "utf8"));
        }
        this.bytes.push(0);
    }

    dump() {
        return Buffer.from(this.bytes);
    }
}

module.exports = {
    BitWriter
}