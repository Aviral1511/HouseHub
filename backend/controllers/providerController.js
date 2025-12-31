import Provider from "../models/Provider.js";

export const createProviderProfile = async (req, res) => {
    try {
        const { serviceCategory, experience, bio, basePrice, location } = req.body;

        const exists = await Provider.findOne({ userId: req.user.id });
        if (exists) return res.status(400).json({ message: "Profile already exists" });

        const profile = await Provider.create({
            userId: req.user.id,
            serviceCategory,
            experience,
            bio,
            basePrice,
            location
        });

        res.json({ message: "Provider profile created", profile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProviderProfile = async (req, res) => {
    try {
        const profile = await Provider.findOne({ userId: req.user.id }).populate("userId");

        if (!profile) return res.status(404).json({ message: "Profile not found" });

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProvidersByCategory = async (req, res) => {
    try {
        const providers = await Provider.find({
            serviceCategory: req.params.category
        }).populate("userId");

        res.json(providers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
