import Review from "../models/Review.js";
import Provider from "../models/Provider.js";

export const addReview = async (req, res) => {
  try {
    const { providerId, bookingId, rating, comment } = req.body;

    const review = await Review.create({
      userId: req.user.id,
      providerId,
      bookingId,
      rating,
      comment
    });

    // Update provider rating avg
    const reviews = await Review.find({ providerId });
    const avg = reviews.reduce((a,b)=>a+b.rating,0) / reviews.length;

    await Provider.findByIdAndUpdate(providerId,{
      rating: avg,
      totalReviews: reviews.length
    });

    res.json({ message:"Review added", review });
  } catch (err) {
    res.status(500).json({ error:err.message });
  }
};

export const getProviderReviews = async (req,res)=>{
  try {
    const reviews = await Review.find({ providerId:req.params.id })
      .populate("userId","name");

    res.json(reviews);
  } catch(err){
    res.status(500).json({error:err.message});
  }
};

export const getRecentReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate({
        path: "userId",
        select: "name profilePic"
      })
      .populate({
        path: "providerId",
        populate: {
          path: "userId",
          select: "name"
        }
      });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};
