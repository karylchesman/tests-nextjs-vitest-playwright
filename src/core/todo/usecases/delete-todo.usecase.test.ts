import {
  makeTestTodo,
  makeTestTodoRepository,
} from '@/core/__tests__/utils/make-test-todo-repository';
import { deleteTodoUsecase } from './delete-todo.usecase';

describe('deleteTodoUsecase (integration)', () => {
  beforeEach(async () => {
    const { deleteAllTodosDb } = await makeTestTodoRepository();
    await deleteAllTodosDb();
  });

  afterAll(async () => {
    const { deleteAllTodosDb } = await makeTestTodoRepository();
    await deleteAllTodosDb();
  });

  test('should return error with invalid ID', async () => {
    const result = await deleteTodoUsecase('');

    expect(result).toStrictEqual({
      success: false,
      errors: expect.arrayContaining(['Invalid ID']),
    });
  });

  test('should return true if the TODO exists in the database', async () => {
    const { insertTodoDb } = await makeTestTodoRepository();
    const testTodo = makeTestTodo(1)[0];
    await insertTodoDb().values(testTodo);

    const result = await deleteTodoUsecase(testTodo.id);

    expect(result).toStrictEqual({
      success: true,
      todo: testTodo,
    });
  });

  test('should return error if the TODO does not exist in the database', async () => {
    const result = await deleteTodoUsecase('non-existent-id');

    expect(result).toStrictEqual({
      success: false,
      errors: expect.arrayContaining(['Todo not found.']),
    });
  });
});
