const { ObjectId } = require("mongodb");

class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("NhaXuatBan");
    }
    extractConactData(payload) {
        const staff = {
            hoTen: payload.hoten,
            password: payload.password,
            chucVu: payload.chucVu,
            diaChi: payload.diachi,
            soDienThoai: payload.soDienThoai
        };

        Object.keys(staff).forEach(
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }

    async create(payload) {
        const staff = this.extractConactData(payload);
        const result = await this.Staff.findOneAndUpdate(
            staff,
            { $set: staff },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
}

module.exports = StaffService;
