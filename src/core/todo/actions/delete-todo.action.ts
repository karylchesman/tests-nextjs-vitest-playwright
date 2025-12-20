import { revalidatePath } from 'next/cache';
import { deleteTodoUsecase } from '../usecases/delete-todo.usecase';

export async function deleteTodoAction(id: string) {
  'use server';
  const deleteResult = await deleteTodoUsecase(id);
  if (deleteResult.success) {
    revalidatePath('/');
  }
  return deleteResult;
}
