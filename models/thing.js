const mongoose = require('mongoose');

const commentSchema = new Schema ({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        default: ''
    }
})

const thingSchema = new mongoose.Schema({
    photoUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true
        },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    created: {
        type: Date,
        default: function () {
            return new Date()
        }
    },
    active: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    bids: {
        type : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thing'
            }
        ],
        default: []
    },
    comments: [commentSchema]
  })
 

module.exports = mongoose.model('Thing', thingSchema);