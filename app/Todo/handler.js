const todo = ["makan", "minum"];
const handler = {
  getTodo: (req, res) => {
    res.json(todo);
  },
};

module.exports = handler;
