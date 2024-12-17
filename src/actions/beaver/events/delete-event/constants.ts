import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while deleting the event." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Event not found." }),
};