const StaffService = require("../services/staff.service");
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
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const staffService = new StaffService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await staffService.findByName(name);
        } else {
            documents = await staffService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the staffs")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Staff not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                'Error retrieving staff with id=${req.params.id}'
            )
        );
    }
};


