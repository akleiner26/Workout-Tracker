let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workoutTrackerDB", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let exerciseSeed = [
  {
    exercises: [
      {
        type: "resistance",
        name: "Bicep Curl",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Lateral Pull",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Push Press",
        duration: 25,
        weight: 185,
        reps: 8,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "cardio",
        name: "Running",
        duration: 25,
        distance: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 285,
        reps: 10,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Quad Press",
        duration: 30,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Military Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  }, {
    exercises: [
      {
        type: "resistance",
        name: "Bench",
        duration: 30,
        distance: 2
      }
    ]
  }
]

let workoutSeed = [
  {
    day: new Date().setDate(new Date().getDate()-10),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-9),
  },
  {
    day: new Date().setDate(new Date().getDate()-8),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-7),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-6),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-5),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-4),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-3),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-2),
    
  },
  {
    day: new Date().setDate(new Date().getDate()-1), 
  }
];

db.Workout.deleteMany({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  db.Exercise.collection.insertMany(exerciseSeed)
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
