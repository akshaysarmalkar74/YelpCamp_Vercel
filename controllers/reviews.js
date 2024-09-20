const Review = require('../models/review');
const Campground = require('../models/campground');



module.exports.createReview= async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    // same to when we were looking for author of campground
    req.flash('success','Congrats! you successfully added a review')
    await review.save(); 
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async(req , res)=>{
    const {id , reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Congrats! you successfully deleted a review')
  
    res.redirect(`/campgrounds/${id}`); 
  }