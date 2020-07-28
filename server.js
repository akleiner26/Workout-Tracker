const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTrackerDB", { useNewUrlParser: true });

app.get("/exercise", function (req, res) {
    res.sendFile(__dirname + "/public/exercise.html")
});

app.get("/stats", (req, res) => {
    res.sendFile(__dirname + "/public/stats.html")
});

//Add to an Existing Workout
// app.put("/api/workouts/:id", (req, res) => {
//     db.Workout.update({ _id: mongojs.Object(req.params.id) }, {
//         type: req.body.type,
//         name: req.body.name,
//         weight: req.body.weight,
//         sets: req.body.sets,
//         duration: req.body.duration,
//         distance: req.body.distance
//     }, (err, data) => {
//         if(err){
//             console.log(err);
//         } else {
//             res.json(data);
//         }
//     }) 
// })
//Adds to an existing workout
app.put("/api/workouts/:id", ({body, id}, res) => {
    db.Exercise.create(body)
    .then (({_id}) => 
        db.Workout.findByIdAndUpdate( id, { $push: {exercises: _id } }, {new:true})
    ).then(dbWorkout => {
        res.json(dbWorkout);
    }) .catch (err => {
        res.json(err);
    })
})

//adds a new workout
// app.post("/api/workouts", (req, res) => {
//     db.Workout.create(req.body, (err, data) => {
//         if(err) {
//             console.log(err)
//         } else {
//             res.json(data)
//         }
//     });
// });
app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(({message}) => {
        res.json(message)
    })
})


//Get Last Workout
// app.get("/api/workouts/:id", (req, res) => {
//     db.Workout.findOne({ _id: mongojs.ObjectId (req.params.id)}, (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(data)
//         }
//     })
// })
app.get("/api/workouts" , (req,res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch (err => {
        res.json(err);
    });
});

//Get for the Stats Page
app.get("/api/workouts/range", (req,res) => {
    db.Workout.find({})
    .limit(7)
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    })
})
// app.get("/api/workouts/range", (req, res) => {
//     db.Workout.find({}, (err, data) => {
//         if(err){
//             console.log(err);
//         } else {
//             res.json(data)
//         }
//     })
// })


// db.User.create({ name: "Ernest Hemingway" })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

// app.get("/workouts", (req, res) => {
//   db.Workout.find({})
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/exercise", (req, res) => {
//   db.Exercise.find({})
//     .then(dbExercise => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.post("/submit", ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populateduser", (req, res) => {
//   db.User.find({})
//   .populate("notes")
//   .then(dbUser => {
//     res.json(dbUser);
//   })
//   .catch(err => {
//     res.json(err);
//   })
//   // TODO
//   // =====
//   // Write the query to grab the documents from the User collection,
//   // and populate them with any associated Notes.
//   // TIP: Check the models out to see how the Notes refers to the User
// });

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
