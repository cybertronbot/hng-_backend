const community = require("../models/community");
const mongoose = require("mongoose");

const getcommunityy = async (req, res) => {
  const community = await community.find({}).sort({ createdAt: -1 });

  res.status(200).json(community);
};

const getcommunity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No community" });
  }

  const community = await community.findById(id);

  if (!community) {
    return res.status(404).json({ error: "No community" });
  }

  res.status(200).json(community);
};

const createcommunity = async (req, res) => {
  const {
    title,
    name,
    role,
    company,
    ratings,
    reviews,
    currency,
    price,
    track,
    category,
    description,
    id,
    Title,
    Duration,
    imageUrl,
    videoUrl,

  } = req.body;
  
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!name) {
    emptyFields.push("name");
  }
  if (!role) {
    emptyFields.push("role");
  }
  if (!company) {
    emptyFields.push("company");
  }
  if (!ratings) {
    emptyFields.push("ratings");
  }
  if (!reviews) {
    emptyFields.push("reviews");
  }
  if (!currency) {
    emptyFields.push("currency");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!track) {
    emptyFields.push("track");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!imageUrl) {
    emptyFields.push("imageUrl");
  }
  if (!videoUrl) {
    emptyFields.push("videoUrl");
  }
  
  
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const community = await community.create({
      title,
      name,
      role,
      company,
      ratings,
      reviews,
      currency,
      price,
      track,
      category,
      description,
      courseContents: [
        {
            id,
            titlee:Title,
            duration:Duration,
       
        },
      ],
      imageUrl,
      videoUrl,
      
    });
    res.status(200).json(community);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletecommunity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such community" });
  }

  const community = await community.findOneAndDelete({ _id: id });

  if (!community) {
    return res.status(400).json({ error: "No such community" });
  }

  res.status(200).json(community);
};

const updatecommunity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such community" });
  }

  const community = await community.findOneAndUpdate(
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
  getcommunityy,
  getcommunity,
  createcommunity,
  deletecommunity,
  updatecommunity,
};
