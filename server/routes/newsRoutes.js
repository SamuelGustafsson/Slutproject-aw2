const mongoose = require('mongoose');
const newsController = require('../controllers/newsController');


module.exports = function (app) {


    // ************ NEWS ENDPOINTS *************

    // Get all news.
    app.get('/api/news', newsController.getAllNews);

    // Get one newsitem by id.
    app.get('/api/news/:id', newsController.getNewsitemById);

    // Create newsitem.
    app.post('/api/news', newsController.createNewsItem);

    // Insert news array
    app.post('/api/news/bulk', newsController.insertNewsArray);

    // Update newsitem by id.
    app.put('/api/news/:id', newsController.updateNewsById);

    // Delete newsitem by id.
    app.put('/api/news/:id', newsController.updateNewsById);

    // ************ NEWS / COMMENTS ENDPOINTS *************

    // Submit comment to newsitem.
    app.post('/api/news/:newsid/comments', newsController.createComment);

    // Get news all comments
    app.get('/api/news/:newsid/comments', newsController.getAllComments);

    // Get comment.
    app.get('/api/news/:newsid/comments/:commentid', newsController.getComment);

    // Delete comment.
    app.delete('/api/news/:newsid/comments/:commentid', newsController.deleteComment);

    // Update comment.
    app.put('/api/news/:newsid/comments/:commentid', newsController.updateComment);

}

