import { analyzeProblem, getRecommendedProviders } from "../services/aiAgent.js";

export const analyzeIssue = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) return res.status(400).json({ message: "Description required" });

        const result = await analyzeProblem(description);

        const providers = await getRecommendedProviders(result.category);

        res.json({
            ai: result,
            recommendedProviders: providers
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
