class GuestService {
    constructor(client) {
        this.Guest = client.db().collection("DocGia");
    }
    extractConactData(payload) {
        const guest = {
            hoLot: payload.hoLot,
            ten: payload.ten,
            ngaySinh: payload.ngaySinh,
            phai: payload.phai,
            diaChi: payload.diaChi,
            dienThoai: payload.dienThoai,
            taiKhoan: payload.taiKhoan,
            password: payload.password,
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
