const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique:true
    },
    parentCategoryId: {
        type: String,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);