import * as sanitizeStrModule from "../../../utils/sanitize-str";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import * as validateTodoDescriptionModule from "../schemas/validate-todo-description";
import * as makeNewTodoModule from "./make-new-todo";
import { makeValidatedTodo } from "./make-validated-todo";

const makeMocks = (description = "New Todo") => {
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrModule, "sanitizeStr")
    .mockReturnValue(description);
  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionModule, "validateTodoDescription")
    .mockReturnValue({ success: true, errors: [] });
  const todo = {
    id: "any-id",
    description,
    createdAt: "any-date-string",
  };
  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoModule, "makeNewTodo")
    .mockReturnValue(todo);
  return {
    todo,
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};

describe("makeValidatedTodo (unit)", () => {
  test('should call "sanitizeStr" with correct values', () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });
  test('should call "validateTodoDescription" with the returned value of "sanitizeStr"', () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();
    const sanitizeStrReturnValue = "Sanitized Description";
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturnValue);

    makeValidatedTodo(description);

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturnValue
    );
  });
  test('should call "makeNewTodo" if "validateTodoDescription" returns success', () => {
    const { description } = makeMocks();

    const result = makeValidatedTodo(description) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual(
      expect.objectContaining({
        id: "any-id",
        description,
        createdAt: "any-date-string",
      })
    );
    // expect(result.data).toStrictEqual(
    //   expect.objectContaining({
    //     id: "any-id",
    //     description,
    //     createdAt: expect.any(String),
    //   })
    // );
    // expect(result.data).toStrictEqual(
    //   expect.objectContaining({
    //     id: "any-id",
    //     description,
    //     createdAt: expect.stringMatching(
    //       /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
    //     ),
    //   })
    // );
  });
  test('should return validatedDescription errors if "validateTodoDescription" fails', () => {
    const { description, validateTodoDescriptionSpy } = makeMocks();
    const errors = ["any", "error"];
    validateTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors,
    });

    const result = makeValidatedTodo(description) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual(errors);
  });
});
