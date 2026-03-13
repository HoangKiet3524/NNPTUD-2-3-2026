let userModel = require("../schemas/users");
module.exports = {
    GetAll: async function () {
        return await userModel
            .find({ isDeleted: false })
            .populate({ path: "role", select: "name" });
    },
    GetByID: async function (id) {
        return await userModel
            .findOne({ _id: id, isDeleted: false })
            .populate({ path: "role", select: "name" });
    },
    Create: async function (username, password, email, role, fullName, avatarUrl) {
        let newItem = new userModel({
            username: username,
            password: password,
            email: email,
            role: role,
            fullName: fullName,
            avatarUrl: avatarUrl,
        });
        await newItem.save();
        return await userModel
            .findById(newItem._id)
            .populate({ path: "role", select: "name" });
    },
    Update: async function (id, body) {
        let item = await userModel.findOne({ _id: id, isDeleted: false });
        if (!item) return null;
        let keys = Object.keys(body);
        for (const key of keys) {
            item[key] = body[key];
        }
        await item.save();
        return await userModel
            .findById(item._id)
            .populate({ path: "role", select: "name" });
    },
    Delete: async function (id) {
        return await userModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    },
    Enable: async function (email, username) {
        let user = await userModel.findOne({
            email: email,
            username: username,
            isDeleted: false,
        });
        if (!user) return null;
        user.status = true;
        await user.save();
        return user;
    },
    Disable: async function (email, username) {
        let user = await userModel.findOne({
            email: email,
            username: username,
            isDeleted: false,
        });
        if (!user) return null;
        user.status = false;
        await user.save();
        return user;
    },
};