const Community = require("../models/community");
const mongoose = require("mongoose");

const getCommunityy = async (req, res) => {
  const community = await Community.find({}).sort({ createdAt: -1 });

  res.status(200).json(community);
};

const getCommunity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No community" });
  }

  const community = await Community.findById(id);

  if (!community) {
    return res.status(404).json({ error: "No community" });
  }

  res.status(200).json(community);
};

const createCommunity = async (req, res) => {
  const {
    slug,
    name,
    description,
    id,
    MemberName,
    IsMentor,
    About,
    Note,
    Topic,
    Topicc,
    DiscussionPoster,
    ProfilePhoto,
   ImageUrl,
   Namee,
  } = req.body;

  let emptyFields = [];

  

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const community = await Community.create({
      slug,
      name,
      description,
      members: [
        {
          id,
          memberName: MemberName,
          isMentor: IsMentor,
          about: About,
          imageUrl: ImageUrl,
        },
      ],
      discussion: [
        {
          id,
          topic: Topic,
          discussionPoster: DiscussionPoster,
          note: Note,
        },
      ],
      author: [
        {
          name: Namee,
          topic: Topicc,
          profilePhoto: ProfilePhoto,
          isMentor:IsMentor
        },
      ],
    });
    res.status(200).json(community);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCommunity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such community" });
  }

  const community = await Community.findOneAndDelete({ _id: id });

  if (!community) {
    return res.status(400).json({ error: "No such community" });
  }

  res.status(200).json(community);
};

const updateCommunity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such community" });
  }

  const community = await Community.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!community) {
    return res.status(400).json({ error: "No such community" });
  }

  res.status(200).json(community);
};

module.exports = {
  getCommunityy,
  getCommunity,
  createCommunity,
  deleteCommunity,
  updateCommunity,
};
