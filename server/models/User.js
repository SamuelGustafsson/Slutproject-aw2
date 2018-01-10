const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    googleID: String,
    fullname: String,
    image: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQce-FK_IPkt5h-fXx3IEwBRyP8nfW9uDVzylCni58JAaeShHW"},
    admin: { type: Boolean, default: false },
    username: String,
    password: String,
    type: String
});

userSchema.plugin(passportLocalMongoose)

// Ge modellen till mongoose
mongoose.model('users', userSchema);