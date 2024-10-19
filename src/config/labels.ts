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
      title: "tulip",
      description: "tulip",
    },
    shows: {
      title: "Shows • tulip",
      description: "tulip",
    },
    show: {
      title: (id: string) => `Show ${id} • tulip`,
      description: "tulip",
    },
    showNotFound: {
      text: "Show not found",
    },
    newShow: {
      title: "New Show • tulip",
      description: "tulip",
    },
    events: {
      title: "Events • tulip",
      description: "tulip",
    },
    event: {
      title: (id: string) => `Event ${id} • tulip`,
      description: "tulip",
    },
    eventNotFound: {
      text: "Event not found",
    },
    newEvent: {
      title: "New Event • tulip",
      description: "tulip",
    },
    notFound: {
      title: "Not Found • tulip",
      description: "tulip",
      text: "Page not found",
    },
    error: {
      title: "Error • tulip",
      description: "tulip",
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
          recurrence: {
            title: "Recurrence",
            recurring: {
              options: {
                no: "No",
                yes: "Yes",
              },
              errors: {
                missing: "Recurrence is required",
                invalid: "Recurrence must be no or yes",
              },
            },
            repeat: {
              header: "Repeat every",
              interval: {
                errors: {
                  missing: "Interval is required",
                },
              },
              frequency: {
                options: {
                  daily: {
                    singular: "day",
                    plural: "days",
                  },
                  weekly: {
                    singular: "week",
                    plural: "weeks",
                  },
                  monthly: {
                    singular: "month",
                    plural: "months",
                  },
                  yearly: {
                    singular: "year",
                    plural: "years",
                  },
                },
                errors: {
                  missing: "Frequency is required",
                  invalid:
                    "Frequency must be daily, weekly, monthly, or yearly",
                },
              },
            },
            ends: {
              header: "Ends",
              ends: {
                options: {
                  never: "Never",
                  after: "After",
                  on: "On",
                },
                errors: {
                  missing: "Ends is required",
                  invalid: "Ends must be never, after, or on",
                },
              },
              count: {
                count: {
                  errors: {
                    missing: "Count is required",
                  },
                },
                text: {
                  singular: "time",
                  plural: "times",
                },
              },
              until: {
                errors: {
                  missing: "Until is required",
                },
              },
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
          recurrence: {
            title: "Recurrence",
            recurring: {
              options: {
                no: "No",
                yes: "Yes",
              },
              errors: {
                missing: "Recurrence is required",
                invalid: "Recurrence must be no or yes",
              },
            },
            repeat: {
              header: "Repeat every",
              interval: {
                errors: {
                  missing: "Interval is required",
                },
              },
              frequency: {
                options: {
                  daily: {
                    singular: "day",
                    plural: "days",
                  },
                  weekly: {
                    singular: "week",
                    plural: "weeks",
                  },
                  monthly: {
                    singular: "month",
                    plural: "months",
                  },
                  yearly: {
                    singular: "year",
                    plural: "years",
                  },
                },
                errors: {
                  missing: "Frequency is required",
                  invalid:
                    "Frequency must be daily, weekly, monthly, or yearly",
                },
              },
            },
            ends: {
              header: "Ends",
              ends: {
                options: {
                  never: "Never",
                  after: "After",
                  on: "On",
                },
                errors: {
                  missing: "Ends is required",
                  invalid: "Ends must be never, after, or on",
                },
              },
              count: {
                count: {
                  errors: {
                    missing: "Count is required",
                  },
                },
                text: {
                  singular: "time",
                  plural: "times",
                },
              },
              until: {
                errors: {
                  missing: "Until is required",
                },
              },
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
