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



    router.get('/edit-blog/:id', (req, res) => {
        //console.log('ok');
        if(!req.params.id){
            res.json({success: false, message: 'Id Not Provided.'});
        } else{
            Blog.findById(req.params.id).then((doc) => {
                //console.log(doc);
                if(!doc){
                    res.json('Blog not found');
                } else{
                    //res.send(doc);
                    User.findOne({_id: req.decoded.userId}).then((user) => {
                        if(!user){
                            res.json({success: false, message: 'Please Login first'});
                        } else{
                            if(user.username !== doc.createdBy){
                                res.json({success: false, message: 'You are not an authorized user'});
                            } else{
                                res.json({success: true, blog: doc});
                                //console.log(doc);
                            }
                        }
                    }, (err) => {
                        res.json({success: false, message: 'Please check the connection'});
                    });
                }
            }, (err) => {
                res.json({success: false, message: 'ID is not valid'});
            });
        }
    });


    router.post('/update-blog', (req, res) => {
        if(!req.body._id){
            res.json({success: false, message: 'Cannot find the blog'});
        } else{
            Blog.findById(req.body._id).then((blog) => {
                if(!blog){
                    res.json({success: false, message: 'No blog found'});
                } else{
                    User.findOne({_id: req.decoded.userId}).then((user) => {
                        if(!user){
                            res.json({success: false, message: 'Please Login first'});
                        } else{
                            if(user.username !== blog.createdBy){
                                res.json({success: false, message: 'You are not an authorized user'});
                            } else{
                                //res.json({success: true, blog: doc});
                                //console.log(doc);

                                blog.title = req.body.title;
                                blog.body = req.body.body;
                                blog.save().then((doc) => {
                                    if(!doc){
                                        res.json({success: false, message: 'Could not save the blog'});
                                    } else{
                                        res.json({success: true, message: 'Blog is updated..'});
                                    }
                                }, (err) => {
                                    res.json({success: false, message: 'Please check the connection'});
                                })
                            }
                        }
                    }, (err) => {
                        res.json({success: false, message: 'Please check the connection'});
                    });
                }
            }, (err) => {
                res.json({success: false, message: 'ID is not valid'});
            });
        }
    });


    router.delete('/delete-blog/:id', (req, res) => {
        if(!req.params.id){
            res.json({success: false, message: 'Provide the ID'});
        } else{
            Blog.findById(req.params.id).then((blog) => {
                if(!blog){
                    res.json({success: false, message: 'Blog Not Found'});
                } else{
                    User.findById(req.decoded.userId).then((user) => {
                        if(!user) {
                            res.json({success: false, message: 'User not found'});
                        } else{
                            if(user.username !== blog.createdBy){
                                res.json({success: false, message: 'User is not authorised'});
                            } else{
                                blog.remove().then((response) => {
                                    if(response){
                                        res.json({success: true, message: 'Blog Post Deleted'});
                                    } else{
                                        res.json({success: false, message: 'Cannot delete Blog POst'});
                                    }
                                }, (err) => {
                                    res.json({success: false, message: 'Please check the connection'});
                                });
                            }
                        }
                    }, (err) => {
                        res.json({success: false, message: 'Please check the connection'});
                    });
                }
            }, (err) => {
                res.json({success: false, message: 'Please check the connection'});
            });
        }
    })


    return router;

}