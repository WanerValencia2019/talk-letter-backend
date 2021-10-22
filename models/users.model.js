const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    //roles ['basic', 'admin']
    role: {type: String, required: true, default: 'basic'},
    facebookProvider: {
      type: {
        id: String,
        token: String,
      },
      select: false,
    },
    createdAt: { type: Date, required: false, default: Date.now },    
  },
  { collection: "users" }
);

userSchema.static.facebookLogin = function(accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne({
        'facebookProvider.id': profile.id
  }, function(err, user) {
    // no user was found, lets create a new one
    console.log(profile);
    if (!user) {
          var newUser = new that({
                email: profile.emails[0].value,
                facebookProvider: {
                      id: profile.id,
                      token: accessToken
                }
          });

          newUser.save(function(error, savedUser) {
            if (error) {
                  console.log(error);
            }
            return cb(error, savedUser);
      });
    } else {
          return cb(err, user);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
