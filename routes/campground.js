

const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const multer  = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({ storage })


const {isLoggedIn , isAuthor , validateCampground } = require('../middleware');

const Campground = require('../models/campground');

router.route('/')
      .get(catchAsync(campgrounds.index))
      .post(isLoggedIn , upload.array('image') , validateCampground ,  catchAsync( campgrounds.createCampground));
      
router.get('/new', isLoggedIn , campgrounds.renderNewForm);

router.route('/:id')
      .get( catchAsync( campgrounds.showCampground))
      .put(isLoggedIn, isAuthor , upload.array('image'), validateCampground ,campgrounds.updateCampground)
      .delete(isLoggedIn , isAuthor , campgrounds.deleteCampground);


router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.editCampground);


module.exports = router;


// router.get('/makecampground' , async(req , res)=>{
   
//     const camp = new Campground({ title : "My Backyard" ,  description: "cheap Camping"});
//     await camp.save();
//     res.send(camp)
// })