const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsItemSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, default: "http://1.bp.blogspot.com/-Zr0pmj1bLnM/Uhh7kROhGYI/AAAAAAAAGkE/W51xFS75-Ec/s1600/no-thumbnail.png" },
    tags: [{ type: String }],
    content: { type: String, required: true },
    comments: [{
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
        author: { type: String, required: true },
        userImage: String,
        userId: Schema.Types.ObjectId
    }],
    date: { type: Date, default: Date.now }
});

mongoose.model('news', newsItemSchema);