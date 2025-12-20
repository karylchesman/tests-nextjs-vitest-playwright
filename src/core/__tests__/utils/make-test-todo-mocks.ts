import { InvalidTodo, ValidTodo } from '@/core/todo/schemas/todo.contract';
import * as createTodoUsecaseMod from '@/core/todo/usecases/create-todo.usecase';
import * as deleteTodoUsecaseMod from '@/core/todo/usecases/delete-todo.usecase';
import { revalidatePath } from 'next/cache';

export const makeTestTodoMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: 'any-id',
      description: 'any-description',
      createdAt: 'any-date',
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ['any-error'],
  } as InvalidTodo;

  const createTodoUsecaseSpy = vi
    .spyOn(createTodoUsecaseMod, 'createTodoUsecase')
    .mockResolvedValue(successResult);

  const deleteTodoUsecaseSpy = vi
    .spyOn(deleteTodoUsecaseMod, 'deleteTodoUsecase')
    .mockResolvedValue(successResult);

  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    createTodoUsecaseSpy,
    deleteTodoUsecaseSpy,
    revalidatePathMocked,
  };
};
