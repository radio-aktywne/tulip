import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({ message: "An error occurred while deleting the event." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Event not found." }),
  unauthorized: msg({ message: "You are not authorized to delete the event." }),
};
