import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo-mocks';
import { createTodoAction } from './create-todo.action';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('createTodoAction (unit)', () => {
  test('should call createTodoUsecase with correct values', async () => {
    const { createTodoUsecaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'Usecase should be called with this description';
    await createTodoAction(expectedParamCall);
    expect(createTodoUsecaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('should call revalidatePath on success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'Usecase should be called with this description';
    await createTodoAction(description);
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('should return the same value as createTodoUsecase on success', async () => {
    const { successResult } = makeTestTodoMocks();
    const description = 'Usecase should be called with this description';
    const result = await createTodoAction(description);
    expect(result).toStrictEqual(successResult);
  });

  test('should return the same value as createTodoUsecase on failure', async () => {
    const { createTodoUsecaseSpy, errorResult } = makeTestTodoMocks();
    createTodoUsecaseSpy.mockResolvedValueOnce(errorResult);
    const description = 'Usecase should be called with this description';
    const result = await createTodoAction(description);
    expect(result).toStrictEqual(errorResult);
  });
});
