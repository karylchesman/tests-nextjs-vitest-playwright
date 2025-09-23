import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  test("returns an error if description has less than 4 characters", () => {
    const result = validateTodoDescription("abc");
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      "Description must be longer than 3 characters.",
    ]);
  });

  test("returns success if description is valid", () => {
    const result = validateTodoDescription("Valid description");
    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
