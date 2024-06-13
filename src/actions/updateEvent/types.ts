import { components } from "../../api/emishows";

export type UpdateEventProps = {
  id: string;
  update: {
    id?: string;
    show?: string;
    type?: components["schemas"]["EventCreateInput"]["type"];
    start?: Date;
    end?: Date;
    timezone?: string;
  };
};
