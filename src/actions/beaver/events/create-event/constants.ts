import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while creating the event." }),
  invalidInput: msg({ message: "Invalid input." }),
  unauthorized: msg({ message: "You are not authorized to create the event." }),
};
