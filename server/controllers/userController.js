const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = {
  // Get all user.
  getAllUsers(req, res, next) {
    User.find()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(500).send(error));
  },

  // // Get user by id.
  // getNewsitemById(req, res, next) {

  //     NewsItem.findById(req.params.id)
  //         .then((newsitem) => {
  //             if (newsitem === null) { res.status(404).send("Newsitem not found"); }
  //             else { res.status(200).send(newsitem); }
  //         })
  //         .catch(error => res.status(500).send(error));
  // },

  // // Create user.
  // createNewsItem(req, res, next) {
  //     let newsItem = new NewsItem(req.body)
  //     newsItem.save()
  //         .then((item) => {
  //             res.status(201).json(item);
  //         })
  //         .catch(error => res.status(500).send(error));
  // },

  // // Insert users
  // insertNewsArray(req, res, next) {

  //     NewsItem.collection.insert(req.body)
  //         .then(docs => {
  //             console.log(`\n ${docs.ops.length} News added to database: \n`);
  //             res.send(docs);
  //         })
  //         .catch(error => res.status(500).send(error));
  // },

  // // Update user.
  // updateNewsById(req, res, next) {

  //     NewsItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
  //         .then(newsitem => {
  //             console.log(`\n Newsitem with id: ${newsitem.id} has been updated \n`);
  //             res.status(200).send(newsitem);
  //         })
  //         .catch(error => res.status(500).send(error))
  // },

  // // Delete user.
  // deleteNewsById(req, res, next) {
  //     NewsItem.findByIdAndRemove(req.params.id)
  //         .then(newsitem => res.status(204).send(newsitem))
  //         .catch(error => res.status(500).send(error))
  // },

  RegisterUserLocalStrategy(req, res, next) {
    console.log("Användaren registrerar sig.");
    User.register(new User({ ...req.body }), req.body.password, function(
      err,
      user
    ) {
      if (err) res.send(err);

      console.log("Godkänd registrering.", req.body);

      //TODO: Se över inloggningen osv det ska inte vara redirects.
    });
  }
};
