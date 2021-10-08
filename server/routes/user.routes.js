const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

router.get("/", (req, res) => {
    User.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json({ code: 500, message: "Error retrieving users", err }))
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => res.status(200).json({ user, message: "User getted" }))
        .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single user", err }))
})

router.post("/", (req, res) => {
    const user = req.body;
    User.create(user)
        .then(user => res.status(200).json({ user, message: "User created" }))
        .catch(err => res.status(500).json({ code: 500, message: "Error creating user", err }))
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: `User ${id} deleted` }))
        .catch(err => res.status(500).json({ code: 500, message: "Error deleting user", err }))
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.status(200).json({ user, message: "User edited" }))
        .catch(err => res.status(500).json({ code: 500, message: "Error editing", err }))
})

module.exports = router;