const mongoose = require('mongoose');
const NewsItem = mongoose.model('news');

module.exports = {

    // Get all news.
    getAllNews(req, res, next) {
        NewsItem.find()
            .then(news => res.status(200).send(news))
            .catch(error => res.status(500).send(error))
    },

    // Get newsitem by id.
    getNewsitemById(req, res, next) {

        NewsItem.findById(req.params.id)
            .then((newsitem) => {
                if (newsitem === null) { res.status(404).send("Newsitem not found"); }
                else { res.status(200).send(newsitem); }
            })
            .catch(error => res.status(500).send(error));
    },

    // Create newsitem.
    createNewsItem(req, res, next) {
        let newsItem = new NewsItem(req.body)
        newsItem.save()
            .then((item) => {
                res.status(201).json(item);
            })
            .catch(error => res.status(500).send(error));
    },

    // Create multiple newsitem
    insertNewsArray(req, res, next) {

        NewsItem.collection.insert(req.body)
            .then(docs => {
                console.log(`\n ${docs.ops.length} News added to database: \n`);
                res.send(docs);
            })
            .catch(error => res.status(500).send(error));
    },

    // Update newsitem by id.
    updateNewsById(req, res, next) {

        NewsItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(newsitem => {
                console.log(`\n Newsitem with id: ${newsitem.id} has been updated \n`);
                res.status(200).send(newsitem);
            })
            .catch(error => res.status(500).send(error))
    },

    // Delete newsitem by id.
    deleteNewsById(req, res, next) {
        NewsItem.findByIdAndRemove(req.params.id)
            .then(newsitem => res.status(204).send(newsitem))
            .catch(error => res.status(500).send(error))
    },

    // ***************** Comments ***************

    getAllComments(req, res, next) {
        NewsItem.findById(req.params.id)
            .then(newsitem => {
                res.send(newsitem.comments)
            })
            .catch(error => res.status(304).send(error))
    },
    getComment(req, res, next) {
        NewsItem.findById(req.params.id)
            .then(newsItem => res.send(newsItem))
            .catch(error => res.status(400).send(error));
    },

    deleteComment(req, res, next) {
        NewsItem.findByIdAndUpdate(
            req.params.newsid,
            { $pull: { 'comments': { _id: req.params.commentid } } })
            .then(item => res.send(`Comment: ${item.id} has been deleted`))
            .catch(error => res.status(404).send(error));
    },

    createComment(req, res, next) {
        console.log("req.user", req.user);
        NewsItem.findByIdAndUpdate(req.params.newsid,
            { $push: { comments: req.body } },
            { safe: true, upsert: true, new: true })
            .then(item => { res.send(item); console.log("Nu postades en kommentar", item); })
            .catch(error => res.status(304).send(error))
    },

    updateComment(req, res, next) {
        NewsItem.update({ 'comments._id': req.params.commentid },
            { '$set': { 'comments.$.text': req.body.text, } },
            { safe: true, upsert: false, new: true }
        )
            .then(item => {
                res.status(200).send("Item updated.");
            })
            .catch(error => {
                res.status(304).send(error);
            })
    }
}