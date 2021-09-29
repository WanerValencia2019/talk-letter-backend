const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false, default: null },
    createdAt: { type: Date, required: false, default: Date.now }
  },
  { collection: "users"}
);

module.exports = mongoose.model("User", userSchema);
