const Task = require('../models/taskModel');

module.exports.createTask = (req, res) => {
  let userId = req.user.id;
  let title = req.body.title;
  let description = req.body.description;
  let steps = req.body.steps;

  let newTask = new Task({
    userId: userId,
    title: title,
    description: description,
  });

  return newTask
    .save()
    .then((savedTask) => {
      res.send(savedTask);
    })
    .catch((err) => {
      res.send({ message: 'All fields are required!' });
    });
};

module.exports.getUserTasks= (req, res) => {
  let userId = req.user.id;
  Task.find({ userId: userId })

    .then((result) => {
      res.send({ message: 'List of user tasks', data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};


module.exports.getAllTasks = (req, res) => {
  Task.find()
    .then((result) => {
      res.send({ message: 'List of all Tasks', data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getSpecificTask = (req, res) => {
  let TaskId = req.params.TaskId;
  Task.findOne({_id:TaskId})
    .then((result) => {
      if (result) {
        res.send({ message: 'Task Information', data: result });
      } else {
        res.send({ message: 'No Task found!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.editTask = (req, res) => {
  let TaskId = req.params.TaskId;
  let options = {
    new: true,
  };

  Task.findByIdAndEdit(TaskId, req.body, options)
    .then((editdTask) => {
      res.send(editdTask);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.completeTask = (req, res) => {
  let TaskId = req.params.TaskId;
  Task.findOne({ _id: TaskId })
    .then((result) => {
      if (result.isActive) {
        result.isActive = false;
        result
          .save()
          .then((completedTask) => {
            res.send({
              message: 'Task completed successfully!',
              completedData: completedTask,
            });
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send({ message: 'Task is already completed!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getAllCompleteTasks = (req, res) => {
  Task.find({ isActive: false })
    .then((result) => {
      res.send({ message: 'List of completed Tasks', data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

// module.exports.activateTask = (req, res) => {
//   let TaskId = req.params.TaskId;
//   Task.findOne({ _id: TaskId })
//     .then((result) => {
//       if (result.isActive === false) {
//         result.isActive = true;
//         result
//           .save()
//           .then((activatedTask) => {
//             res.send({
//               message: 'Task activated successfully!',
//               activatedData: activatedTask,
//             });
//           })
//           .catch((err) => {
//             res.send(err);
//           });
//       } else {
//         res.send({ message: 'Task is already activated!' });
//       }
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };


module.exports.deleteTask = (req, res) => {
  let TaskId = req.params.TaskId;
  Task.findByIdAndDelete(TaskId)
  .then(result => {
    res.send ({message: 'Task deleted successfully!',
              deletedData: result})
  }).catch(err => {
    res.send (err);
  })
}

