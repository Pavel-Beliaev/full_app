export const hasErrorField = (error: unknown): error is { data: { errors: [], message: string, status: number }, status: number } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data
  );
};