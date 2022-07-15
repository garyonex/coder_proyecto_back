import passport from 'passport';
import { Strategy } from 'passport-local';
import UserModels from '../models/UserModels';
const localStrategy = Strategy;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const userDB = await UserModels.findOne({ username });
            if (userDB) {
                return done(null, false);
            }
            const newUser = new UserModels();
            newUser.username = username;
            newUser.passwordHash = password;
            newUser.email = email;
            await newUser.save();
            done(null, newUser);
        }
    )
);
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const userDB = new UserModels.findOne({ username });
            if (!userDB) {
                return done(null, false);
            }
            done(null, newUser);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await UserModels.findById(id);
    done(null, user);
});
