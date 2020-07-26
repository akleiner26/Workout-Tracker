const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  type: {
      type: String,
      trim: true,
      required: "Type of Workout Is Required"
  },
  name: {
      type: String,
      trim: true,
      require: "Name of Workout is Required"
  },
  duration: {
      type: Number,
      trim: true,
      require: "Workout Duration is Required"
  },
  weight: {
      type: Number,
      trim: true,
      require: "Weight is Required"
  },
  reps: {
      type: Number,
      trim: true,
      require: "Amount of Reps is Required"
  },
  sets: {
      type: Number,
      trim: true,
      require: "Amount of Sets is Required"
  },
  date: {
      type: Date,
      default: Date.now
  }
});

const Note = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
