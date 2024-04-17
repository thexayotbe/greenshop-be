import mongoose, { Schema } from "mongoose";
import { flower_db } from "../../config/db";
const flower_model = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Boolean,
    required: true,
    default: false,
  },
  discount_price: {
    type: String,
    default: "0",
  },
  short_description: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  main_image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  detailed_images: {
    type: Array,
    required: true,
  },
  rate: {
    type: Number,
    default: 0,
  },
  views: {
    type: String,
    default: 0,
  },
  tags: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  sold_times: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  created_by: {
    type: String,
    required: true,
  },
});

const house_plants = flower_db.model("house_plants", flower_model);
const potter_plants = flower_db.model("potter_plants", flower_model);
const seeds = flower_db.model("seeds", flower_model);
const small_plants = flower_db.model("small_plants", flower_model);
const big_plants = flower_db.model("big_plants", flower_model);
const succulents = flower_db.model("succulents", flower_model);
const trerrariums = flower_db.model("trerrariums", flower_model);
const gardening = flower_db.model("gardening", flower_model);
const accessories = flower_db.model("accessories", flower_model);

module.exports = {
  house_plants,
  potter_plants,
  seeds,
  small_plants,
  big_plants,
  succulents,
  trerrariums,
  gardening,
  accessories,
};
