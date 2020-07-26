const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
      type: Date,
      default: Date.now
  },
  exercises : [
      {
          type: Schema.types.ObjectId,
          ref: "Exercise"
      }
  ]
});

const Note = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
