const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const communitySchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    members: [
      {
        id: String,
        memberName: String,
        isMentor: Boolean,
        about: String,
        imageUrl: String,
      },
    ],
    discssions: [
      {
        id: String,
        topic: String,
        discussionPoster: String,
        note: String,
      },
    ],
    author: [
      {
        name: String,
        topic: String,
        profilePhoto: String,
        isMentor: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
