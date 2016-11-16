
const Authentication = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local', {session:false});

module.exports = function(app) {
   app.get('/',requireAuth,function (req,res) {
      res.send({ message: 'My profile' });
   });
   app.post('/signin', requireSignin,  Authentication.signin);
   app.post('/signup', Authentication.signup);
   app.post('/userdata',requireAuth,Authentication.adddata);
   app.get('/userdata',requireAuth,Authentication.getdata);
};
