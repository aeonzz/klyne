import { isAxiosError } from "axios";
import { toast } from "sonner";

/**
 *
 * @param error
 * @returns Error message
 */

const errorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    return (
      error.response?.data.message ||
      "Something went wrong while connecting to the server. Please try again."
    );
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "An unexpected error occurred. Please try again.";
  }
};

/**
 *
 * @param error
 * @returns Toast component with error message
 */

export const getErrorMessage = (error: unknown) => {
  const message = errorMessage(error);

  return toast.error("Error", {
    description: message,
  });
};
