export const labels = {
  toasts: {
    titles: {
      error: "Error",
      warning: "Warning",
      success: "Success",
      info: "Info",
    },
  },
  pages: {
    index: {
      title: "webshows",
      description: "webshows",
    },
    shows: {
      title: "Shows • webshows",
      description: "webshows",
    },
    show: {
      title: (id: string) => `Show ${id} • webshows`,
      description: "webshows",
    },
    showNotFound: {
      text: "Show not found",
    },
    newShow: {
      title: "New Show • webshows",
      description: "webshows",
    },
    events: {
      title: "Events • webshows",
      description: "webshows",
    },
    event: {
      title: (id: string) => `Event ${id} • webshows`,
      description: "webshows",
    },
    eventNotFound: {
      text: "Event not found",
    },
    newEvent: {
      title: "New Event • webshows",
      description: "webshows",
    },
    notFound: {
      title: "Not Found • webshows",
      description: "webshows",
      text: "Page not found",
    },
    error: {
      title: "Error • webshows",
      description: "webshows",
      text: "Something went wrong",
      buttons: {
        retry: {
          label: "Retry",
        },
      },
    },
  },
  widgets: {
    shows: {
      tiles: {
        show: {
          text: (id: string) => `${id}`,
        },
      },
      buttons: {
        create: {
          label: "Create",
        },
      },
      empty: {
        text: "No shows...",
      },
    },
    show: {
      form: {
        fields: {
          title: {
            title: "Title",
            errors: {
              missing: "Title is required",
            },
          },
          description: {
            title: "Description",
          },
        },
        buttons: {
          save: {
            label: "Save",
          },
          delete: {
            label: "Delete",
          },
        },
      },
      toasts: {
        update: {
          error: (id: string) => `Failed to update show ${id}`,
          success: (id: string) => `Show ${id} updated`,
        },
        delete: {
          success: (id: string) => `Show ${id} deleted`,
        },
      },
    },
    newShow: {
      form: {
        fields: {
          title: {
            title: "Title",
            errors: {
              missing: "Title is required",
            },
          },
          description: {
            title: "Description",
          },
        },
        buttons: {
          create: {
            label: "Create",
          },
        },
      },
      toasts: {
        create: {
          error: "Failed to create show",
          success: (id: string) => `Show ${id} created`,
        },
      },
    },
    events: {
      tiles: {
        event: {
          text: (id: string) => `${id}`,
        },
      },
      buttons: {
        create: {
          label: "Create",
        },
      },
      empty: {
        text: "No events...",
      },
    },
    event: {
      form: {
        fields: {
          type: {
            title: "Type",
            options: {
              live: "Live",
              replay: "Replay",
              prerecorded: "Prerecorded",
            },
            errors: {
              missing: "Type is required",
              invalid: "Type must be live, replay, or prerecorded",
            },
          },
          show: {
            title: "Show",
            option: (id: string) => `${id}`,
            errors: {
              missing: "Show is required",
            },
          },
          start: {
            title: "Start",
            errors: {
              missing: "Start date and time is required",
            },
          },
          end: {
            title: "End",
            errors: {
              missing: "End date and time is required",
            },
          },
          timezone: {
            title: "Timezone",
            errors: {
              missing: "Timezone is required",
            },
          },
        },
        buttons: {
          save: {
            label: "Save",
          },
          delete: {
            label: "Delete",
          },
        },
      },
      toasts: {
        update: {
          error: (id: string) => `Failed to update event ${id}`,
          success: (id: string) => `Event ${id} updated`,
        },
        delete: {
          success: (id: string) => `Event ${id} deleted`,
        },
      },
    },
    newEvent: {
      form: {
        fields: {
          type: {
            title: "Type",
            options: {
              live: "Live",
              replay: "Replay",
              prerecorded: "Prerecorded",
            },
            errors: {
              missing: "Type is required",
              invalid: "Type must be live, replay, or prerecorded",
            },
          },
          show: {
            title: "Show",
            option: (id: string) => `${id}`,
            errors: {
              missing: "Show is required",
            },
          },
          start: {
            title: "Start",
            errors: {
              missing: "Start date and time is required",
            },
          },
          end: {
            title: "End",
            errors: {
              missing: "End date and time is required",
            },
          },
          timezone: {
            missing: "Timezone is required",
            title: "Timezone",
            errors: {
              missing: "Timezone is required",
            },
          },
        },
        buttons: {
          create: {
            label: "Create",
          },
        },
      },
      toasts: {
        create: {
          error: "Failed to create event",
          success: (id: string) => `Event ${id} created`,
        },
      },
    },
  },
};
