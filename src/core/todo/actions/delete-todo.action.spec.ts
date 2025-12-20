import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo-mocks';
import { deleteTodoAction } from './delete-todo.action';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('deleteTodoAction (unit)', () => {
  test('should call deleteTodoUsecase with correct values', async () => {
    const { deleteTodoUsecaseSpy } = makeTestTodoMocks();
    const expectedIdToCall = 'any-id-to-delete';
    await deleteTodoAction(expectedIdToCall);
    expect(deleteTodoUsecaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedIdToCall,
    );
  });

  test('should call revalidatePath on success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const fakeId = 'any-id-to-delete';
    await deleteTodoAction(fakeId);
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('should return the same value as deleteTodoUsecase on success', async () => {
    const { successResult } = makeTestTodoMocks();
    const fakeId = 'any-id-to-delete';
    const result = await deleteTodoAction(fakeId);
    expect(result).toStrictEqual(successResult);
  });

  test('should return the same value as deleteTodoUsecase on failure', async () => {
    const { deleteTodoUsecaseSpy, errorResult } = makeTestTodoMocks();
    deleteTodoUsecaseSpy.mockResolvedValueOnce(errorResult);
    const fakeId = 'any-id-to-delete';
    const result = await deleteTodoAction(fakeId);
    expect(result).toStrictEqual(errorResult);
  });
});
