const Resources = require("../models/resources");
const mongoose = require("mongoose");

const getResources = async (req, res) => {
  const resources = await Resources.find({}).sort({ createdAt: -1 });

  res.status(200).json(resources);
};

const getResource = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Resources" });
  }

  const resources = await Resources.findById(id);

  if (!resources) {
    return res.status(404).json({ error: "No Resources" });
  }

  res.status(200).json(resources);
};

const createResources = async (req, res) => {
  const {
    title,
    name,
    role,
    company,
    ratings,
    reviews,
    currency,
    price,
    coursetype,
    category,
    description,
    
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
  if (!coursetype) {
    emptyFields.push("coursetype");
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
    const resources = await Resources.create({
      title,
      name,
      role,
      company,
      ratings,
      reviews,
      currency,
      price,
      coursetype,
      category,
      description,
   
      imageUrl,
      videoUrl,
    });
    res.status(200).json(resources);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteResources = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such resources" });
  }

  const resources = await Resources.findOneAndDelete({ _id: id });

  if (!resources) {
    return res.status(400).json({ error: "No such resources" });
  }

  res.status(200).json(resources);
};

const updateResources = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such resources" });
  }

  const resources = await Resources.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!resources) {
    return res.status(400).json({ error: "No such resources" });
  }

  res.status(200).json(resources);
};

module.exports = {
  getResource,
  getResources,
  createResources,
  deleteResources,
  updateResources,
};
