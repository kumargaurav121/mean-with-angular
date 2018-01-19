const User = require('../model/user');


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



    return router;
}