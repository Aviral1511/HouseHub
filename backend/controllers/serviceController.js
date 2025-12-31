import Service from "../models/Service.js";

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
