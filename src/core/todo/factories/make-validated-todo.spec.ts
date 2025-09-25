import * as sanitizeStrModule from "../../../utils/sanitize-str";
import { makeValidatedTodo } from "./make-validated-todo";

describe("makeValidatedTodo (unit)", () => {
  test.only('should call "sanitizeStr" with correct values', () => {
    const description = "New Todo";
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrModule, "sanitizeStr")
      .mockReturnValue(description);

    makeValidatedTodo(description);

    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });
  test('should call "validateTodoDescription" with the returned value of "sanitizeStr"', () => {});
  test('should call "makeNewTodo" if "validateTodoDescription" returns success', () => {});
  test('should return validatedDescription errors if "validateTodoDescription" fails', () => {});
});
