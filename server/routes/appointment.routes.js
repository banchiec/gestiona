const express = require("express");
const Appointment = require("../models/Appointment.model");
const router = express.Router();

router.get("/", (req, res) => {
    Appointment.find()
        .select('name phone description')
        .then(appointments => res.status(200).json(appointments))
        .catch(err => res.status(500).json({ code: 500, message: "Error retrieving appointment", err }))
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    Appointment.findById(id)
        .then(appointment => res.status(200).json({ appointment, message: "Appointment getted" }))
        .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single appointment", err }))
})

router.post("/", (req, res) => {
    const appointment = req.body;
    Appointment.create(appointment)
        .then(appointment => res.status(200).json({ appointment, message: "Appointment created" }))
        .catch(err => res.status(500).json({ code: 500, message: "Error creating appointment", err }))
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Appointment.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: `Appointment ${id} deleted` }))
        .catch(err => res.status(500).json({ code: 500, message: "Error deleting appointment", err }))
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    Appointment.findByIdAndUpdate(id, req.body, { new: true })
        .then(appointment => res.status(200).json({ appointment, message: "Appointment edited" }))
        .catch(err => res.status(500).json({ code: 500, message: "Error editing", err }))
})

module.exports = router