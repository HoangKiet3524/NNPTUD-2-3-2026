var express = require("express");
var router = express.Router();

let roleController = require("../controllers/roles");

// Get all
router.get("/", async function (req, res, next) {
    try {
        let roles = await roleController.GetAll();
        res.send(roles);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Get by ID
router.get("/:id", async function (req, res, next) {
    try {
        let result = await roleController.GetByID(req.params.id);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: "id not found" });
        }
    } catch (error) {
        res.status(404).send({ message: "id not found" });
    }
});

// Create
router.post("/", async function (req, res, next) {
    try {
        let newItem = await roleController.Create(
            req.body.name,
            req.body.description
        );
        res.send(newItem);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Update
router.put("/:id", async function (req, res, next) {
    try {
        let updatedItem = await roleController.Update(req.params.id, req.body);
        if (!updatedItem) {
            return res.status(404).send({ message: "id not found" });
        }
        res.send(updatedItem);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Soft delete
router.delete("/:id", async function (req, res, next) {
    try {
        let result = await roleController.Delete(req.params.id);
        if (!result) {
            return res.status(404).send({ message: "id not found" });
        }
        res.send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;