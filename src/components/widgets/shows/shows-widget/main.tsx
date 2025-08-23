"use client";

import { useLingui } from "@lingui/react";
import { useCallback, useEffect, useState } from "react";

import { useListShows } from "../../../../hooks/beaver/shows/use-list-shows";
import { useToasts } from "../../../../hooks/use-toasts";
import { EditShowWidget } from "./components/edit-show-widget";
import { NewShowWidget } from "./components/new-show-widget";
import { ShowListWidget } from "./components/show-list-widget";
import { ShowsWidgetInput, ShowsWidgetState } from "./types";

export function ShowsWidget({
  shows: prefetchedShows,
  ...props
}: ShowsWidgetInput) {
  const [state, setState] = useState<ShowsWidgetState>({ state: "display" });
  const [page, setPage] = useState<number>();
  const [query, setQuery] = useState<string>();

  const { _ } = useLingui();
  const toasts = useToasts();

  const {
    data: currentShows,
    error,
    refresh,
  } = useListShows({
    ...props,
    offset: page ? (page - 1) * props.limit : undefined,
    where: JSON.stringify({
      ...(props.where ? JSON.parse(props.where) : {}),
      ...(query
        ? {
            title: {
              contains: query,
              mode: "insensitive",
            },
          }
        : {}),
    }),
  });
  const shows = query ? currentShows : (currentShows ?? prefetchedShows);

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  useEffect(() => {
    if (shows === undefined || page === undefined) return;

    const pages = Math.ceil(shows.count / props.limit);
    if (page > pages) setPage(Math.max(1, pages));
  }, [page, shows, props.limit]);

  const handleCreateCreate = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  const handleCreateCancel = useCallback(() => {
    setState({ state: "display" });
  }, []);

  const handleDisplayCreate = useCallback(() => {
    setState({ state: "create" });
  }, []);

  const handleDisplayDelete = useCallback(() => {
    void refresh();
  }, [refresh]);

  const handleDisplayEdit = useCallback(
    (show: NonNullable<typeof shows>["shows"][number]) => {
      setState({ show: show, state: "edit" });
    },
    [],
  );

  const handleDisplayPageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleDisplayQueryChange = useCallback((query: string) => {
    setPage(1);
    setQuery(query || undefined);
  }, []);

  const handleEditSave = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  const handleEditCancel = useCallback(() => {
    setState({ state: "display" });
  }, []);

  return (() => {
    switch (state.state) {
      case "create":
        return (
          <NewShowWidget
            onCancel={handleCreateCancel}
            onCreate={handleCreateCreate}
          />
        );
      case "display":
        return (
          <ShowListWidget
            onCreate={handleDisplayCreate}
            onDelete={handleDisplayDelete}
            onEdit={handleDisplayEdit}
            onPageChange={handleDisplayPageChange}
            onQueryChange={handleDisplayQueryChange}
            page={page}
            perPage={props.limit}
            query={query}
            shows={shows}
          />
        );
      case "edit":
        return (
          <EditShowWidget
            onCancel={handleEditCancel}
            onSave={handleEditSave}
            show={state.show}
          />
        );
    }
  })();
}
