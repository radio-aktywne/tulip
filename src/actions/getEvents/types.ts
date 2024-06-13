export type GetEventsProps = {
  limit?: number;
  offset?: number;
  where?: Record<string, unknown>;
  query?: Record<string, unknown>;
  include?: Record<string, unknown>;
  order?: Record<string, unknown>;
};
