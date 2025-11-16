import { DrizzleTodoRepository } from "@/core/todo/repositories/drizzle-todo.repository";
import { Todo } from "@/core/todo/schemas/todo.contract";
import { drizzleDatabase } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function makeTestTodoRepository() {
  const { db, todoTable } = drizzleDatabase;
  const repository = new DrizzleTodoRepository(db);
  const insertTodoDb = () => db.insert(todoTable);
  const deleteAllTodosDb = () => db.delete(todoTable);
  const deleteTodoDb = (id: string) =>
    db.delete(todoTable).where(eq(todoTable.id, id));
  const todos = makeTestTodo(5);

  return {
    todoRepository: repository,
    insertTodoDb,
    deleteAllTodosDb,
    deleteTodoDb,
    todos,
  };
}

export async function insertTestTodos() {
  const { insertTodoDb } = await makeTestTodoRepository();
  const todos = makeTestTodo(5);
  await insertTodoDb().values(todos);
}

export function makeTestTodo(amount: number = 1): Todo[] {
  return Array.from({ length: amount }, (_, i) => ({
    id: `test-todo-id-${i + 1}`,
    description: `This is a test todo number ${i + 1}`,
    createdAt: `date-${i}`,
  }));
}
