import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo (unit)", () => {
  test("creates a new valid todo", () => {
    // AAA -> Arrange, Act, Assert

    const expectedTodo = {
      id: expect.any(String),
      description: "Learn Vitest",
      createdAt: expect.any(String),
    };

    const newTodo = makeNewTodo("Learn Vitest");

    expect(newTodo.description).toBe(expectedTodo.description);
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
