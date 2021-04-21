import { Response } from 'express';

interface ErrorImpl {
  status: number;
  message: string;
}

class ErrorHandler extends Error implements ErrorImpl{
  status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { status = 400, message } = err;
  res.status(status).json({
    message
  });
};

export default ErrorHandler;
