const Community = require("../models/community");
const mongoose = require("mongoose");

const getCommunityy = async (req, res) => {
  const community = await Community.find({}).sort({ createdAt: -1 });

  res.status(200).json(community);
};

const getCommunity = async (req, res) => {
  const { slug } = req.params;

  const community = await Community.findOne({ slug }); 

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
    members,
    discussions,
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
    members,
    discussions
    });
    res.status(200).json(community);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCommunity = async (req, res) => {
  const { slug } = req.params;

  if (!mongoose.Types.ObjectId.isValid(slug)) {
    return res.status(400).json({ error: "No such community" });
  }

  const community = await Community.findOneAndDelete({ slug });

  if (!community) {
    return res.status(400).json({ error: "No such community" });
  }

  res.status(200).json(community);
};

const updateCommunity = async (req, res) => {
  const { slug } = req.params;

  if (!mongoose.Types.ObjectId.isValid(slug)) {
    return res.status(400).json({ error: "No such community" });
  }

  const community = await Community.findOneAndUpdate(
    { slug },
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