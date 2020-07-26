const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  type: {
      type: String,
      trim: true,
      required: "Type of Exercise Is Required"
  },
  name: {
      type: String,
      trim: true,
      require: "Name of Exercise is Required"
  },
  duration: {
      type: Number,
      trim: true,
      require: "Exercise Duration is Required"
  },
  distance: {
      type: Number,
      trim: true,
      require: "Distance of Exercise is Required"
  }
});

const Note = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
