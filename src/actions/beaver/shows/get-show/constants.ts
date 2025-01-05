import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while fetching the show." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Show not found." }),
  unauthorized: msg({ message: "You are not authorized to fetch the show." }),
};
