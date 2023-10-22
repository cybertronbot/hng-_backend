const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const freesessionSchema = new Schema(
    {
        mentorId: {
            type: String,
            required: true,
          },sessionName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        attendeesLimit: {
            type: Number,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },

        relevantTopics: {
            type: String,
            required: true,
        },
        sessionUrl: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        sessionState: {
            type: String,
            enum: ["Pending", "Cancelled"],
            default:"Pending",
            required: false,
         
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FreeSession", freesessionSchema);
