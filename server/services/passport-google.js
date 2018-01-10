const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // Ta emot användaren som loggat in från GoogleStrategy och gör den till en sekvens av bitar som vi kan skickar i en cookie
    // till användaren så den kan identifera sig när den använder applikationen.
    done(null, user.id);
});

// Konvertera userID (bit sekvensen) från passport.Serializer() och se vilken användare det är i databasen.
passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// passport config
passport.use(User.createStrategy());

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
        // Callback som returnerar informationen från authenticeringen.
        async (accessToken, refreshToken, profile, done) => {
            const doesUserExist = await User.findOne({ googleID: profile.id })

            if (doesUserExist) {
                done(null, doesUserExist);
            }
            else {
                const user = await new User({ googleID: profile.id, fullname: profile.displayName, image: profile.photos[0].value, type: "google" }).save()
                // ta svaret med den nya användaren och skicka den till passport.serializeUser(user)
                console.log(`\n New user added to database: \n _ID: ${user.googleID} \n Fullname: ${user.fullname}\n`);
                done(null, user)
            }
        }
    )
);