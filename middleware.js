const {campgroundSchema , reviewSchema} = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const review = require('./models/review');
const Review = require('./models/review')

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // rediredt user
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.validateCampground = (req , res, next) => {
    const {error} = campgroundSchema.validate(req.body);
     if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg , 400)
     } else {
        next();
     }
}

module.exports.isAuthor = async (req,res,next) =>{
    const campground = await Campground.findById(req.params.id)
    const {id} = req.params;
    if (!campground.author.equals(req.user._id)){
        req.flash('error' , 'You dont have permission to do that');
        return res.redirect(`/campgrounds/${id}`)
       }
       next()
}

module.exports.validateReview = (req , res , next)=>{
    const {error} = reviewSchema.validate(req.body);
   
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg , 400);
        console.log(error)
     } else {
        next();
     }
}
module.exports.isReviewAuthor = async (req,res,next) =>{
    const {reviewId , id} = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review.author.equals(req.user._id)){
        req.flash('error' , 'You dont have permission to do that');
        return res.redirect(`/campgrounds/${id}`)
       }
       next()
}
