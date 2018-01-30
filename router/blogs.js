const User = require('../model/user');
const Blog = require('../model/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


module.exports = (router) => {

    router.post('/newBlog', (req, res) => {

        if(!req.body.title){
            res.json({success: false, message: 'Title Not Found'});
        } else{
            if(!req.body.body){
                res.json({success: false, message: 'Body Not Found'});
            } else{
                if(!req.body.createdBy){
                    res.json({success: false, message: 'Blog Creator Not Found'});
                } else{
                    const newBlog = new Blog({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy
                    });

                    newBlog.save().then((doc) => {
                        console.log(doc);
                        res.json({success: true, message: 'Blog Saved'});
                    }, (err) => {
                        res.json({success: false, message: 'Blog cannot be saved' + err});
                        console.log(err);
                    });
                }
            }
        }

    });


    router.get('/viewAll', (req, res) => {
        Blog.find({}).sort({'_id': -1}).then((doc) => {
            if(!doc){
                res.json({success: false, message: 'No Blog Found'});
            } else{
                res.json({success: true, blogs: doc});
            }
        }, (err) => {
            res.send({success: false, message: err});
        });
    });


    return router;

}