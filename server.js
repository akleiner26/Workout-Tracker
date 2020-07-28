const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
let totalDuration = 0;


const PORT = process.env.PORT || 3000;

const db = require("./models");
const { Workout } = require("./models");

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTrackerDB", { useNewUrlParser: true });

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
});


app.get("/exercise", function (req, res) {
    res.sendFile(__dirname + "/public/exercise.html")
});

app.get("/stats", (req, res) => {
    res.sendFile(__dirname + "/public/stats.html")
});

//Adds to an existing workout
app.put("/api/workouts/:id", ({body, params}, res) => {
    db.Exercise.create(body)
    .then (({_id}) => 
        db.Workout.findByIdAndUpdate( params.id, { $push: {exercises: _id } }, {new:true})
    ).then(dbWorkout => {
        res.json(dbWorkout);
    }) .catch (err => {
        res.json(err);
    })
})

//adds a new workout
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
app.get("/api/workouts" , (req,res) => {
    db.Workout.find({}).populate("exercises")
    .then(dbWorkout => {
        let workoutArr = [];
        for (let i = 0; i < dbWorkout.length; i++) {
            let totalDuration = 0;
            for (let j=0; j < dbWorkout[i].exercises.length; j++){
                totalDuration += dbWorkout[i].exercises[j].duration
            }
            let newWorkout = {
                day: dbWorkout[i].day,
                exercises: dbWorkout[i].exercises,
                totalDuration: totalDuration
            }
            console.log(newWorkout);
            workoutArr.push(newWorkout)
        }
        res.json(workoutArr);
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

//Tally total duration with virtual
// Workout.virtual("duration").get(function() {
//     return (totalDuration + this.Exercise.duration)
// })

// //Post total duration
// app.get("/api/workouts" , (req,res) => {
//         res.json(totalDuration);
//     });

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

