// Error handling utilities for API responses

export interface ApiError {
  message: string;
  statusCode?: number;
  details?: string;
}

export class ApiException extends Error {
  statusCode?: number;
  details?: string;

  constructor(message: string, statusCode?: number, details?: string) {
    super(message);
    this.name = 'ApiException';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const handleApiError = (error: any): ApiException => {
  if (error instanceof ApiException) {
    return error;
  }

  // Network errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return new ApiException(
      'Network error. Please check your internet connection and try again.',
      0,
      'Network connectivity issue'
    );
  }

  // Timeout errors
  if (error.name === 'AbortError' || error.message.includes('timeout')) {
    return new ApiException(
      'Request timeout. Please try again.',
      408,
      'Request timeout'
    );
  }

  // Parse error response
  if (error.response) {
    const statusCode = error.response.status;
    let message = 'An error occurred';

    switch (statusCode) {
      case 400:
        message = 'Invalid request. Please check your input.';
        break;
      case 401:
        message = 'Authentication failed. Please login again.';
        break;
      case 403:
        message = 'Access denied. You do not have permission.';
        break;
      case 404:
        message = 'Resource not found.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      default:
        message = error.message || 'An unexpected error occurred';
    }

    return new ApiException(message, statusCode, error.response.data?.details);
  }

  // Generic error
  return new ApiException(
    error.message || 'An unexpected error occurred',
    undefined,
    error.stack
  );
};

export const getErrorMessage = (error: any): string => {
  const apiError = handleApiError(error);
  return apiError.message;
};