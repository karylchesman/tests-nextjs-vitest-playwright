import { makeValidatedTodo } from "../factories/make-validated-todo";
import { todoRepository } from "../repositories/default.repository";

export async function createTodoUsecase(description: string) {
  const validatedResult = makeValidatedTodo(description);

  if (!validatedResult.success) {
    return validatedResult;
  }

  const createResult = await todoRepository.create(validatedResult.todo);
  return createResult;
}
