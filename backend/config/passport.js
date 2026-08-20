// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { User } from "../models/userModel.js";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
//     },

//     async (accessToken, refreshToken, profile, cb) => {
//       console.log("========== GOOGLE AUTH ==========");
//       console.log("Google ID:", profile.id);
//       console.log("Email:", profile.emails?.[0]?.value);
//       console.log("Name:", profile.displayName);

//       try {
//         const googleId = profile.id;
//         const email = profile.emails?.[0]?.value;

//         if (!email) {
//           return cb(
//             new Error("Google account email not available"),
//             null
//           );
//         }

//         // 1. Find by Google ID
//         let user = await User.findOne({ googleId });

//         if (user) {
//           user.isLoggedIn = true;
//           await user.save();

//           return cb(null, user);
//         }

//         // 2. Find existing account by email
//         user = await User.findOne({ email });

//         if (user) {
//           user.googleId = googleId;
//           user.avatar = profile.photos?.[0]?.value;
//           user.isLoggedIn = true;
//           user.isVerified = true;

//           await user.save();

//           return cb(null, user);
//         }

//         // 3. Create new Google user
//         user = await User.create({
//           googleId,
//           username: profile.displayName,
//           email,
//           avatar: profile.photos?.[0]?.value,
//           isLoggedIn: true,
//           isVerified: true,
//         });

//         return cb(null, user);

//       } catch (error) {
//         console.error("========== GOOGLE AUTH ERROR ==========");
//         console.error(error);

//         return cb(error, null);
//       }
//     }
//   )
// );

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { User } from "../models/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log("Google Profile:", profile.displayName);

        let user = await User.findOneAndUpdate(
          {
            googleId: profile.id,
          },
          {
            isLoggedIn: true,
          },
          {
            new: true,
          },
        );

        if (!user) {
          user = await User.create({
            googleId: profile.id,

            username: profile.displayName,

            email: profile.emails?.[0]?.value,

            avatar: profile.photos?.[0]?.value,

            isLoggedIn: true,

            isVerified: true,
          });
        }

        return cb(null, user);
      } catch (error) {
        console.error("Passport Google Error:", error);

        return cb(error, null);
      }
    },
  ),
);
