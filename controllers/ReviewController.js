const Review = require('../models/Review')

//show list of reviews
const index = (req,res,next) => {
    if(req.query.page && req.query.limit){
        Review.paginate({},{page:req.query.page, limit:req.query.limit})
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occurred!',
                error
            })
        })
    }else{
        Review.find({})
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occurred!',
                error: error
            })
        })
    }
}

//show one review
const show = (req,res,next) => {
    let product_name = req.query.product_name
    Review.findOne({product_name})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occurred!',
            error: error
        })
    })
}

//add one review to db
const store = (req,res,next) => {
    let rev = new Review({
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        body: req.body.body,
        rating: req.body.rating
    })
    rev.save()
    .then( () => {
        res.json({
            message: 'Added review!',
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occurred!',
            error: error
        })
    })
}

//update one review into db
const update = (req,res,next) => {
    let reviewId = req.body.reviewId

    let updatedData = {
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        body: req.body.body,
        rating: req.body.rating
    }
    
    Review.findByIdAndUpdate(reviewId, {$set: updatedData})
    .then( () => {
        res.json({
            message: 'Updated review!',
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occurred!',
            error: error
        })
    })
}

//delete review
const destroy = (req,res,next) => {
    let reviewId = req.body.reviewId
    Review.findByIdAndRemove(reviewId)
    .then( () => {
        res.json({
            message: 'Deleted review!',
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occurred!',
            error: error
        })
    })
}

//add user review
const addUserReview = (req,res,next) => {
    
    let reviewId = req.body.reviewId
    Review.findById(reviewId)
    .then(review => {
        review.user_reviews.push(req.body.user_review)
        review.save()
        res.json({
            message: 'Added user review!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occurred!',
            error: error
        })
    })
}

module.exports = {
    index, show, store, update, destroy, addUserReview
}