const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongoosePaginate = require('mongoose-paginate-v2')

const reviewSchema = new Schema({
    product_name: {
        type: String
    },
    product_type: {
        type: String
    },
    body:{
        type: String
    },
    rating:{
        type: Number
    },
    user_reviews:[{
        firstname: String,
        lastname: String,
        email: String,
        confirmed: Boolean,
        title: String,
        body: String,
        rating: Number,
        date: Date 
    }],
    pricings:[{
        sellername: String,
        price: Number,
    }],
},{timestamps:true})

reviewSchema.plugin(mongoosePaginate)
const Review = mongoose.model('Review',reviewSchema)
module.exports = Review