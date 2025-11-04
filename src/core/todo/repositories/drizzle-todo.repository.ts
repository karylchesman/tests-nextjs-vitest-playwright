import { TodoRepository } from "@/core/todo/repositories/todo.contract.repository";
import { Todo, TodoPresenter } from "@/core/todo/schemas/todo.contract";
import { DrizzleDatabase } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { todoTable } from "../schemas/drizzle-todo-table.schema";

export class DrizzleTodoRepository implements TodoRepository {
  constructor(private readonly db: DrizzleDatabase) {}

  async findAll(): Promise<Todo[]> {
    return this.db.query.todo.findMany({
      orderBy: (fields, { desc }) => [
        desc(fields.createdAt),
        desc(fields.description),
      ],
    });
  }

  async create(todo: Todo): Promise<TodoPresenter> {
    const existingTodo = await this.db.query.todo.findFirst({
      where: (fields, { eq, or }) =>
        or(eq(fields.id, todo.id), eq(fields.description, todo.description)),
    });

    if (existingTodo) {
      return {
        success: false,
        errors: ["Todo with the same id or description already exists."],
      };
    }

    await this.db.insert(todoTable).values(todo).returning();
    return {
      success: true,
      todo,
    };
  }

  async remove(id: string): Promise<TodoPresenter> {
    const existingTodo = await this.db.query.todo.findFirst({
      where: (fields, { eq }) => eq(fields.id, id),
    });

    if (!existingTodo) {
      return {
        success: false,
        errors: ["Todo not found."],
      };
    }

    await this.db.delete(todoTable).where(eq(todoTable.id, id)).returning();
    return {
      success: true,
      todo: existingTodo,
    };
  }
}
