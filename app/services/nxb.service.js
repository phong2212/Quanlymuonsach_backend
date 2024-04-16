const { ObjectId } = require("mongodb");

class NxbService {
    constructor(client) {
        this.Nxb = client.db().collection("NhaXuatBan");
    }
    extractConactData(payload) {
        const nxb = {
            tenNxb: payload.tenNxb,
            diaChi: payload.diaChi,
        };

        Object.keys(nxb).forEach(
            (key) => nxb[key] === undefined && delete nxb[key]
        );
        return nxb;
    }

    async create(payload) {
        const nxb = this.extractConactData(payload);
        const result = await this.Nxb.findOneAndUpdate(
            nxb,
            { $set: nxb },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Nxb.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Nxb.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Nxb.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
    async delete(id) {
        const result = await this.Nxb.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Nxb.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NxbService;
