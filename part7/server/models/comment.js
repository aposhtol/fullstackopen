const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
  text: String,
  blog: {
    type: mongoose.ObjectId,
    ref: "Blog",
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Comment", commentSchema);
