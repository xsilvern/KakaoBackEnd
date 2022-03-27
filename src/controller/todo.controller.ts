import express from "express";
import TodoModel from "../model/todo.model";

const router = express.Router();
type Todo = {
  name: string;
};
router.get("/", async (req, res) => {
  const data: TodoModel[] = await TodoModel.findAll();
  return res.status(200).json(data);
});

router.post("/", (req, res) => {
  const Todo: Todo = req.body as Todo;
  if (!Todo) {
    return res.status(400).json();
  }
  TodoModel.create({
    name: Todo.name,
  });
  return res.status(201).json();
});
router.get("/:TodoId", async (req, res) => {
  const { TodoId } = req.params;
  if (!TodoId) {
    return res.status(400).json();
  }
  const TodoIdNumber = parseInt(TodoId, 10);
  const Todo: TodoModel | null = await TodoModel.findByPk(TodoIdNumber);
  if (!Todo) {
    return res.status(404).json();
  }
  return res.status(200).json(Todo);
});
router.delete("/:TodoId", async (req, res) => {
  const { TodoId } = req.params;
  const todo: TodoModel | null = await TodoModel.findByPk(TodoId);
  if (!todo) {
    return res.status(404).json();
  }
  const deleteTodo = await TodoModel.destroy({ where: { id: TodoId } });
  return res.status(201).json(deleteTodo);
});
export default router;
