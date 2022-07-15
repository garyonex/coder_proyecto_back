import passport from 'passport';
import { Strategy } from 'passport-facebook';
import UserModels from '../models/UserModels';

const facebookStrategy = Strategy;
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await UserModels.findById(id);
    done(null, user);
});

passport.use(
    new facebookStrategy(
        {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
            callbackURL: 'http://localhost:3001/auth/facebook',
        },
        async function (accesstoken, refreshToken, profile, done) {
            console.log(profile);
            const userDB = await UserModels.findOne({
                facebookId: profile.id,
            });
            if (userDB) {
                return done(null, userDB);
            }
            const userFb = new UserModels();
            userFb.username = profile.displayName;
            userFb.facebookId = profile.id;
            await userFb.save();
            done(null, userFb);
        }
    )
);
