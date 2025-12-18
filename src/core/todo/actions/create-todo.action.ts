import { revalidatePath } from "next/cache";
import { createTodoUsecase } from "../usecases/create-todo.usecase";

export async function createTodoAction(description: string) {
  "use server";
  const createResult = await createTodoUsecase(description);
  if (createResult.success) {
    revalidatePath("/");
  }
  return createResult;
}
