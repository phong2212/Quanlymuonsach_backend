const { ObjectId } = require("mongodb");

class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("NhanVien");
    }
    extractConactData(payload) {
        const staff = {
            hoTen: payload.hoTen,
            taiKhoan: payload.taiKhoan,
            password: payload.password,
            chucVu: payload.chucVu,
            diaChi: payload.diaChi,
            soDienThoai: payload.soDienThoai,
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

    async find(filter) {
        const cursor = await this.Staff.find(filter);
        return await cursor.toArray();
    }
    async findById(id) {
        return await this.Staff.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
}


module.exports = StaffService;
