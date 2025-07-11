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

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentShows, error, refresh } = useListShows(props);
  const shows = currentShows ?? prefetchedShows;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleCreateSwitch = useCallback(() => {
    setState({ state: "create" });
  }, []);

  const handleDelete = useCallback(() => {
    void refresh();
  }, [refresh]);

  const handleEdit = useCallback((show: (typeof shows)["shows"][number]) => {
    setState({ show: show, state: "edit" });
  }, []);

  const handleEditSave = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  const handleEditCancel = useCallback(() => {
    setState({ state: "display" });
  }, []);

  const handleCreate = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  const handleCancelCreate = useCallback(() => {
    setState({ state: "display" });
  }, []);

  return (() => {
    switch (state.state) {
      case "create":
        return (
          <NewShowWidget
            onCancel={handleCancelCreate}
            onCreate={handleCreate}
          />
        );
      case "display":
        return (
          <ShowListWidget
            onCreate={handleCreateSwitch}
            onDelete={handleDelete}
            onEdit={handleEdit}
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
