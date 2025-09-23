type ValidatedDescription = {
  success: boolean;
  errors: string[];
};

export function validateTodoDescription(
  description: string
): ValidatedDescription {
  const errors: string[] = [];
  if (description.length <= 3) {
    errors.push("Description must be longer than 3 characters.");
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
