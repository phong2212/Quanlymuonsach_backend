const { ObjectId } = require("mongodb");

class BorrowService {
    constructor(client) {
        this.Borrow = client.db().collection("TheoDoiMuonSach");
    }
    extractConactData(payload) {
        const borrow = {
            maDocGia: payload.maDocGia,
            maSach: payload.maSach,
            ngayMuon: payload.ngayMuon,
            ngayTra: payload.ngayTra,
        };

        Object.keys(borrow).forEach(
            (key) => borrow[key] === undefined && delete borrow[key]
        );
        return borrow;
    }

    async create(payload) {
        const borrow = this.extractConactData(payload);
        const result = await this.Borrow.findOneAndUpdate(
            borrow,
            { $set: borrow },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Borrow.find(filter);
        return await cursor.toArray();
    }
    async findById(id) {
        return await this.Borrow.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Borrow.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
}

module.exports = BorrowService;
