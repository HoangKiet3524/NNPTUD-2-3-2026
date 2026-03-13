var express = require("express");
var router = express.Router();
let bcrypt = require("bcrypt");
let { userPostValidation, validateResult } =
  require("../utils/validationHandler");

let userController = require("../controllers/users");

// Get all
router.get("/", async function (req, res, next) {
  try {
    let users = await userController.GetAll();
    res.send(users);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Get by ID
router.get("/:id", async function (req, res, next) {
  try {
    let result = await userController.GetByID(req.params.id);
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
router.post("/", userPostValidation, validateResult,
  async function (req, res, next) {
    try {
      let saved = await userController.Create(
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.role,
        req.body.fullName || "",
        req.body.avatarUrl || ""
      );
      res.send(saved);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });

// Update
router.put("/:id", async function (req, res, next) {
  try {
    let result = await userController.Update(req.params.id, req.body);
    if (!result) return res.status(404).send({ message: "id not found" });
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Soft delete
router.delete("/:id", async function (req, res, next) {
  try {
    let result = await userController.Delete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "id not found" });
    }
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Enable user
router.post("/enable", async function (req, res, next) {
  try {
    let { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).send({ message: "email and username are required" });
    }
    let result = await userController.Enable(email, username);
    if (!result) {
      return res.status(404).send({ message: "user not found" });
    }
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Disable user
router.post("/disable", async function (req, res, next) {
  try {
    let { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).send({ message: "email and username are required" });
    }
    let result = await userController.Disable(email, username);
    if (!result) {
      return res.status(404).send({ message: "user not found" });
    }
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;