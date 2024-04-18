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
}

module.exports = BorrowService;
