import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const create = orpcServerRootBase.core.events.create.handler(
  async ({ errors, input }) => {
    const { data, ...query } = input;

    const { data: eventsCreateData, response: eventsCreateResponse } =
      await state.current.apis.beaver.eventsCreate({
        body: data,
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (eventsCreateData === undefined) {
      if (eventsCreateResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return eventsCreateData;
  },
);
