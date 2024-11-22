let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
  // Create route MUST be first
  app.get("/lab5/todos/create", (req, res) => {
      const newTodo = {
          id: new Date().getTime(),
          title: "New Task",
          completed: false,
      };
      todos.push(newTodo);
      res.json(todos);
  });

  // Add new POST route
  app.post("/lab5/todos", (req, res) => {
      const newTodo = { ...req.body, id: new Date().getTime() };
      todos.push(newTodo);
      res.json(newTodo);
  });

  // Update title route (before :id route)
  app.get("/lab5/todos/:id/title/:title", (req, res) => {
      const { id, title } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.title = title;
      res.json(todos);
  });

  // Delete route (must come before the :id route)
  app.get("/lab5/todos/:id/delete", (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
      todos.splice(todoIndex, 1);
      res.json(todos);
  });

  // Update completed route
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
      const { id, completed } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.completed = completed === "true";
      res.json(todos);
  });

  // Update description route
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
      const { id, description } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.description = description;
      res.json(todos);
  });

  // Get all todos
  app.get("/lab5/todos", (req, res) => {
      const { completed } = req.query;
      if (completed !== undefined) {
          const completedBool = completed === "true";
          const completedTodos = todos.filter(
              (t) => t.completed === completedBool);
          return res.json(completedTodos);
      }
      return res.json(todos);
  });

  // Get todo by ID must be last
  app.get("/lab5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (!todo) {
          return res.status(404).send("Todo not found");
      }
      return res.json(todo);

  });


  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
        res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
        return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
});

app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
        res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
        return;
    }
    todos = todos.map((t) => {
        if (t.id === parseInt(id)) {
            return { ...t, ...req.body };
        }
        return t;
    });
    res.sendStatus(200);
});

}