import { sanitizeStr } from "@/utils/sanitize-str";
import { Todo } from "../schemas/todo.contract";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";

type TMakeValidatedTodoResult =
  | {
      success: true;
      data: Todo;
    }
  | {
      success: false;
      errors: string[];
    };

export function makeValidatedTodo(
  description: string
): TMakeValidatedTodoResult {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanDescription);

  if (validatedDescription.success) {
    return {
      success: true,
      data: makeNewTodo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validatedDescription.errors,
  };
}
