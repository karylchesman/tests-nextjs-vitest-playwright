import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { createTodoUsecase } from "./create-todo.usecase";

describe("createTodoUsecase (integration)", () => {
  beforeEach(async () => {
    const { deleteAllTodosDb } = await makeTestTodoRepository();
    await deleteAllTodosDb();
  });

  afterAll(async () => {
    const { deleteAllTodosDb } = await makeTestTodoRepository();
    await deleteAllTodosDb();
  });

  test("should return error if the validation fails", async () => {
    const result = await createTodoUsecase("");

    expect(result).toStrictEqual({
      success: false,
      errors: expect.arrayContaining([expect.any(String)]),
    });
  });

  test("should return a TODO if the validation succeeds", async () => {
    const description = "My new todo";
    const result = await createTodoUsecase(description);

    expect(result).toStrictEqual({
      success: true,
      todo: expect.objectContaining({
        description,
      }),
    });
  });

  test("should return error if the repository fails", async () => {
    const description = "Duplicate todo";

    await createTodoUsecase(description);
    const result = await createTodoUsecase(description);

    expect(result).toStrictEqual({
      success: false,
      errors: expect.arrayContaining([expect.any(String)]),
    });
  });
});
