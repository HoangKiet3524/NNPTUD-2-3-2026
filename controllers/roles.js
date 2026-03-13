let roleModel = require("../schemas/roles");
module.exports = {
    GetAll: async function () {
        return await roleModel.find({ isDeleted: false });
    },
    GetByID: async function (id) {
        return await roleModel.findOne({ _id: id, isDeleted: false });
    },
    Create: async function (name, description) {
        let newItem = new roleModel({
            name: name,
            description: description,
        });
        await newItem.save();
        return newItem;
    },
    Update: async function (id, body) {
        let item = await roleModel.findByIdAndUpdate(id, body, { new: true });
        return item;
    },
    Delete: async function (id) {
        return await roleModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    },
};
