import { msg } from "@lingui/core/macro";

export const commonRoutingConstants = {
  routes: {
    "/": msg({ message: "/" }),
    "/events/[id]": msg({ message: "/events/[id]" }),
    "/events/[id]/split": msg({ message: "/events/[id]/split" }),
    "/events/new": msg({ message: "/events/new" }),
    "/instances/[event]/[start]": msg({
      message: "/instances/[event]/[start]",
    }),
  },
} as const;
