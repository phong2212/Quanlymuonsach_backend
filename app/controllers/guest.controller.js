const GuestService = require("../services/guest.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.taiKhoan) {
        return next(new ApiError(400, "Tai khoan can not be empty"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Passoword can not be empty"));
    }
    try {
        const guestService = new GuestService(MongoDB.client);
        const document = await guestService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the guest")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const guestService = new GuestService(MongoDB.client);
        const document = await guestService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Guest not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                'Error retrieving guest with id=${req.params.id}'
            )
        );
    }
};

