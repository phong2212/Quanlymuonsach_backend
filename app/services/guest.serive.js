const { ObjectId } = require("mongodb");

class GuestService {
    constructor(client) {
        this.Guest = client.db().collection("NhaXuatBan");
    }
    extractConactData(payload) {
        const guest = {
            hoLot: payload.hoLot,
            ten: payload.ten,
            ngaySinh: payload.ngaySinh,
            phai: payload.phai,
            diaChi: payload.diaChi,
            dienThoai: payload.dienThoai,
        };

        Object.keys(guest).forEach(
            (key) => guest[key] === undefined && delete guest[key]
        );
        return guest;
    }

    async create(payload) {
        const guest = this.extractConactData(payload);
        const result = await this.Guest.findOneAndUpdate(
            guest,
            { $set: guest },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
}

module.exports = GuestService;
