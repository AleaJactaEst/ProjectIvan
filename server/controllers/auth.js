const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req,res, next) {
    // User has already had their email and password authd
    // We just need to give them tokjen
    res.send({token : tokenForUser(req.user)});

}


exports.signup = function (req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({ error:'You must provide email and password' });
    }

    //See f a user with the given email exists
    User.findOne({email:email}, function (err, existingUser) {
        if(err) {return next(err);}
        //If a user with email does exist , return an error
        if(existingUser){
            return res.status(422).send({error:'Email is in use'});
        }
        // If a user with email does NOT exist , create and server record
        const user = new User({
            email:email,
            password:password
        });
        user.save(function(err){
            if(err) {return next(err); }
        })
        //Repond to request indicating the user was created
        res.json({token: tokenForUser(user)});
    });
}


exports.adddata = function (req, res, next){
    const email = req.user.email;

    const desc = req.body.description||req.user.data.description;
    const status = req.body.status||req.user.data.status;
    const birth = req.body.birthday||req.user.data.birthday;
    const name = req.body.name||req.user.data.name;
    const surname = req.body.surname||req.user.data.surname;


    User.findOneAndUpdate({email:email},
        { $set:
             {
                 data:
                    {
                     name:name,
                     surname:surname,
                     description:desc,
                     status : status,
                     birthday: birth,
                    }
             }
        }, { new: true }, function (err, existingUser) {
        if (err) return handleError(err);
        res.send(existingUser);
    });

}

exports.getdata = function (req, res, next){
    const email = req.user.email;
    User.findOne({email:email}, function (err, existingUser) {
        if(err) {return next(err);}
        //If a user with email does exist , return an error
        if(existingUser){
            res.send(existingUser);
        }
    });
}


