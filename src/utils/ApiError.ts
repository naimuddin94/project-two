class ApiError extends Error {
  public data: null;
  public success: boolean;
  constructor(
    public status: number,
    public message: string = 'Something went wrong',
    public errors: string[] = [],
    public stack: string = '',
  ) {
    super(message);
    this.status = status;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
