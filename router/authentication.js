const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


module.exports = (router) => {

    router.post('/register', (req, res) => {

        if(!req.body.email){
            res.send({success: false, message: 'Email not found'});
        } else{
            if(!req.body.username){
                res.send({success: false, message: 'Username not found'});
            } else{
                if(!req.body.password){
                    res.send({success: false, message: 'Username not found'});
                } else{
                   // res.send(JSON.stringify(req.body, undefined, 2));
                    var user = new User({
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password
                    });

                    user.save().then((doc) => {
                        console.log(doc);
                        res.send({success: true, message: "Account Registered"});
                        
                    }, (err) => {
                        console.log(err);
                        if(err.code === 11000){
                            res.send({success: false, message: 'Duplicate Email or Username'});
                        } else{
                            res.send({success: false, message: 'Could Not Save'});
                        }
                    });
                }
            }
        }
    });

    router.get('/checkEmail/:email', (req, res) => {
        //console.log(req.params.email);
        if(!req.params.email){
            res.json({success: false, message: 'Email Not Provided'});
        } else{
            User.findOne({email: req.params.email}).then((user) => {
                if(user){
                    res.json({success: false, message: 'Email Already Exist'});
                } else{
                    res.json({success: true, message: ''});
                }
                
            }, (err) => {
                res.json({success: false, message: err});
            });

        }
    });



    router.get('/checkUsername/:username', (req, res) => {

        if(!req.params.username){
            res.json({success: false, message: 'username Not Provided'});
        } else{
            User.findOne({username: req.params.username}).then((user) => {
                if(user){
                    res.json({success: false, message: 'Username Already Exist'});
                } else{
                    res.json({success: true, message: ''});
                }
            }, (err) => {
                res.json({success: false, message: err});
            });
        }
    });


    router.post('/login', (req, res) => {

        if(!req.body.username){
            res.json({success: false, message: "Please provide Username"});
        } else{
            if(!req.body.password){
                res.json({success: false, message: "Please provide Password"});
            } else{
                User.findOne({username: req.body.username}).then((user) => {

                    if(!user){
                        res.json({success: false, message: "Username Not Found"});
                    } else{
                        //res.json({success: true, message: "Login Successful"});
                        const validPass = user.comparePasswords(req.body.password);
                        
                        //console.log(req.body.password);
                        if(!validPass){
                            res.json({success: false, message: "Password is Incorrect"});
                        } else{
                            const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                            res.json({success: true, message: "Login Successful", token: token, user: {username: user.username}});
                        }
                    }

                }, (err) => {
                    res.json({success: false, message: err});
                });
            }
        }

        //res.send('ok');

    });


    //Auth TOKEN
    router.use((req, res, next) => {
        const token = req.headers['x-auth'];
        if(!token){
            res.json({success: false, message: 'No Token Found'});
        } else{
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err){
                    res.json({success: false, message: 'Token Invalid'});
                } else{
                    req.decoded = decoded;
                    next();
                }
            })
        }
    });


    router.get('/profile', (req, res) => {
        //res.send(req.decoded);
        User.findOne({_id: req.decoded.userId}).select('username email').exec((err, user) => {
            if(err){
                res.json({success: false, message: err});
            } else{
                if(!user){
                    res.json({success: false, message: 'User not Found'});
                } else{
                    res.json({success: true, user: user});
                }
            }
        })
    })

    


    return router;
}