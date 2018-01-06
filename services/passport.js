const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)', 'link', 'email'],
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ loginId: profile.id });
    console.log(profile);
    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({ 
      loginId: profile.id,
      image: (profile.photos[0].value == undefined) ? profile.photos[0].value : 'https://scontent.fzgh1-1.fna.fbcdn.net/v/t1.0-1/c71.0.240.240/p240x240/10354686_10150004552801856_220367501106153455_n.jpg?oh=28e3783815066effc54f2009563241e1&oe=5AB0C258',
      name: profile.displayName }).save();
    done(null, user);
  }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
