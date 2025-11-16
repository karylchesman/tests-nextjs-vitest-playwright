import {
  insertTestTodos,
  makeTestTodoRepository,
} from "@/core/__tests__/utils/make-test-todo-repository";

describe("DrizzleTodoRepository (integration)", () => {
  beforeEach(async () => {
    const { deleteAllTodosDb } = await makeTestTodoRepository();
    await deleteAllTodosDb();
  });

  afterAll(async () => {
    const { deleteAllTodosDb } = await makeTestTodoRepository();
    await deleteAllTodosDb();
  });

  describe("findAll", () => {
    test("should return an empty array if there are no todos", async () => {
      const { todoRepository } = await makeTestTodoRepository();
      expect(await todoRepository.findAll()).toStrictEqual([]);
    });

    test("should return all TODOs in descending order", async () => {
      const { todoRepository } = await makeTestTodoRepository();
      await insertTestTodos();

      const todos = await todoRepository.findAll();
      expect(todos).toHaveLength(5);
      expect(todos[0].createdAt).toBe("date-4");
      expect(todos[1].createdAt).toBe("date-3");
      expect(todos[2].createdAt).toBe("date-2");
      expect(todos[3].createdAt).toBe("date-1");
      expect(todos[4].createdAt).toBe("date-0");
    });
  });

  describe("create", () => {
    test("create a todo if all properties are valid", async () => {
      const { todoRepository, todos } = await makeTestTodoRepository();
      const result = await todoRepository.create(todos[0]);

      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test("fails if there's a duplicate todo description", async () => {
      const { todoRepository, todos } = await makeTestTodoRepository();
      await todoRepository.create(todos[0]);
      const anotherTodo = {
        id: "any-todo-id",
        description: todos[0].description,
        createdAt: "any-date",
      };
      const result = await todoRepository.create(anotherTodo);
      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo with the same id or description already exists."],
      });
    });

    test("fails if there's a duplicated ID in the table", async () => {
      const { todoRepository, todos } = await makeTestTodoRepository();
      await todoRepository.create(todos[0]);
      const anotherTodo = {
        id: todos[0].id,
        description: "A unique description",
        createdAt: "any-date",
      };
      const result = await todoRepository.create(anotherTodo);
      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo with the same id or description already exists."],
      });
    });
  });

  describe("delete", () => {
    test("delete a TODO if it exists", async () => {
      const { todoRepository, todos } = await makeTestTodoRepository();
      await todoRepository.create(todos[0]);

      const result = await todoRepository.remove(todos[0].id);

      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test("fails if the TODO not exists", async () => {
      const { todoRepository } = await makeTestTodoRepository();

      const result = await todoRepository.remove("non-existent-id");

      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo not found."],
      });
    });
  });
});
