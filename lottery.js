class Lottery {
    constructor(count) {
        this.tickets = new Uint32Array(count);
        for (let i = 0; i < count; i++) {
            this.tickets[i] = i;
        }
        this.start = 0;
    }

    get remain() {
        return this.tickets.length - this.start;
    }

    swap(i, j) {
        if (i == j) {
            return;
        }
        const t = this.tickets[j];
        this.tickets[j] = this.tickets[i];
        this.tickets[i] = t;
    }

    draw() {
        if (this.remain <= 0) {
            return null;
        }
        const i = Math.floor(Math.random() * this.remain) + this.start;
        const serial = this.tickets[i];
        this.swap(i, this.start);
        this.start++;
        return serial;
    }

    static toTicketNumber(serial) {
        const grp = Math.floor(serial / 100_000) + 1;
        const num = serial % (grp - 1);
        return `${('0' + grp).slice(-2)}組 1${('0000' + num).slice(-5)}`;
    }

    static toSerial(group, number) {
        return (group - 1) * 100_000 + number - 100_000;
    }
}
