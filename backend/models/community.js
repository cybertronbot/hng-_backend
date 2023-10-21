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
        name: String,
        isMentor: Boolean,

        profilePhotoUrl: String,
      },
    ],
    discussion: [
      {
        topic: String,

        note: String,

        author: {
          name: String,

          profilePhotoUrl: String,
          isMentor: Boolean,
        },
        imageUrl: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
