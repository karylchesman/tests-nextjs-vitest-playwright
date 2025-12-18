import { InvalidTodo, ValidTodo } from "@/core/todo/schemas/todo.contract";
import * as createTodoUsecaseMod from "@/core/todo/usecases/create-todo.usecase";
import { revalidatePath } from "next/cache";
import { createTodoAction } from "./create-todo.action";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("createTodoAction (unit)", () => {
  test("should call createTodoUsecase with correct values", async () => {
    const { createTodoUsecaseSpy } = makeMocks();
    const expectedParamCall = "Usecase should be called with this description";
    await createTodoAction(expectedParamCall);
    expect(createTodoUsecaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall
    );
  });

  test("should call revalidatePath on success", async () => {
    const { revalidatePathMocked } = makeMocks();
    const description = "Usecase should be called with this description";
    await createTodoAction(description);
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith("/");
  });

  test("should return the same value as createTodoUsecase on success", async () => {
    const { successResult } = makeMocks();
    const description = "Usecase should be called with this description";
    const result = await createTodoAction(description);
    expect(result).toStrictEqual(successResult);
  });

  test("should return the same value as createTodoUsecase on failure", async () => {
    const { createTodoUsecaseSpy, errorResult } = makeMocks();
    createTodoUsecaseSpy.mockResolvedValueOnce(errorResult);
    const description = "Usecase should be called with this description";
    const result = await createTodoAction(description);
    expect(result).toStrictEqual(errorResult);
  });
});

const makeMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: "any-id",
      description: "any-description",
      createdAt: "any-date",
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ["any-error"],
  } as InvalidTodo;

  const createTodoUsecaseSpy = vi
    .spyOn(createTodoUsecaseMod, "createTodoUsecase")
    .mockResolvedValue(successResult);

  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    createTodoUsecaseSpy,
    revalidatePathMocked,
  };
};
