import { create } from "zustand";
import type { IUrl, IUrlCreate } from "../models/IUrl";
import { authUser } from "../shared/constants";
import { useMessageStore } from "./useMessageStore";

type UrlStore = {
  urls: IUrl[];
  lastModifiedUrl: IUrl;
  shortenedUrl: string;
  fetchUrls: () => Promise<void>;
  addUrl: (url: IUrlCreate) => Promise<void>;
  editUrl: (url: IUrlCreate) => Promise<void>;
  deleteUrl: (id: string) => Promise<void>;
  setLastModifiedUrl: (url: IUrl) => void;
  handleShortenURL: (inputUrl: string) => void;
};

export const useUrlStore = create<UrlStore>((set, get) => ({
  urls: [],
  lastModifiedUrl: {
    id: "",
    url: "",
    createdDate: "",
    modifiedDate: "",
    ttlInSeconds: 0,
  },
  shortenedUrl: "",
  fetchUrls: async () => {
    const { showSnackbar } = useMessageStore.getState();

    fetch("https://urlshortener.smef.io/urls", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(authUser)}`,
      },
    })
      .then((response) => {
        if (
          response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 500
        ) {
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then((data) => {
        if (data.status) {
          let message = "";
          if (data.invalidParams) {
            message =
              data.title +
              ": " +
              data.invalidParams[0].name +
              " " +
              data.invalidParams[0].reason;
          } else {
            message = data.title + ": " + data.detail;
          }
          showSnackbar(message, "warning");
        } else {
          set({ urls: data });
        }
      })
      .catch((error) => {
        showSnackbar(error.message, "error");
      });
  },
  addUrl: async (url: IUrlCreate) => {
    const { showSnackbar } = useMessageStore.getState();
    const jsonData = {
      url: url.url,
      ttlInSeconds: url.ttlInSeconds,
    };

    fetch(`https://urlshortener.smef.io/urls/${url.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(authUser)}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (
          response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 409 &&
          response.status !== 500
        ) {
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then((data) => {
        if (data.status) {
          let message = "";
          if (data.invalidParams) {
            message =
              data.title +
              ": " +
              data.invalidParams[0].name +
              " " +
              data.invalidParams[0].reason;
          } else {
            message = data.title + ": " + data.detail;
          }
          showSnackbar(message, "warning");
        } else {
          const urls = get().urls;
          set({ urls: [...urls, data] });
        }
      })
      .catch((error) => {
        showSnackbar(error.message, "error");
      });
  },
  editUrl: async (url: IUrlCreate) => {
    const { showSnackbar } = useMessageStore.getState();
    const urls = get().urls;
    const jsonData = {
      url: url.url,
      ttlInSeconds: url.ttlInSeconds,
    };

    fetch(`https://urlshortener.smef.io/urls/${url.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(authUser)}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (
          response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 404 &&
          response.status !== 500
        ) {
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then((data) => {
        if (data.status) {
          let message = "";
          if (data.invalidParams) {
            message =
              data.title +
              ": " +
              data.invalidParams[0].name +
              " " +
              data.invalidParams[0].reason;
          } else {
            message = data.title + ": " + data.detail;
          }
          showSnackbar(message, "warning");
        } else {
          const newList = urls.map((item) => {
            if (item.id === data.id) {
              const updatedItem = {
                ...item,
                url: url.url,
                ttlInSeconds:
                  url.ttlInSeconds !== null
                    ? url.ttlInSeconds
                    : item.ttlInSeconds,
                modifiedDate: new Date().toISOString(),
              };
              set({ lastModifiedUrl: updatedItem });
              return updatedItem;
            }
            return item;
          });
          set({ urls: newList });
        }
      })
      .catch((error) => {
        showSnackbar(error.message, "error");
      });
  },
  deleteUrl: async (id) => {
    const { showSnackbar } = useMessageStore.getState();
    const urls = get().urls;

    fetch(`https://urlshortener.smef.io/urls/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(authUser)}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          const newList = urls.filter((item) => item.id !== id);
          set({ urls: newList });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.status) {
          let message = "";
          if (data.invalidParams) {
            message =
              data.title +
              ": " +
              data.invalidParams[0].name +
              " " +
              data.invalidParams[0].reason;
          } else {
            message = data.title + ": " + data.detail;
          }
          showSnackbar(message, "warning");
        }
      })
      .catch((error) => {
        showSnackbar(error.message, "error");
      });
  },
  handleShortenURL: (inputUrl: string) => {
    const shorten: string = "https://urlshortener.smef.io/";
    const jsonData = {
      url: inputUrl,
      ttlInSeconds: null,
    };
    const { showSnackbar } = useMessageStore.getState();

    fetch("https://urlshortener.smef.io/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(authUser)}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (
          response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 500
        ) {
          //Unknown error handling
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then((data) => {
        //if error exists show snackbar, else set data
        if (data.status) {
          let message = "";
          if (data.invalidParams) {
            message =
              data.title +
              ": " +
              data.invalidParams[0].name +
              " " +
              data.invalidParams[0].reason;
          } else {
            message = data.title + ": " + data.detail;
          }
          showSnackbar(message, "warning");
        } else {
          set({ shortenedUrl: shorten + data.id });
        }
      })
      .catch((error) => {
        showSnackbar(error.message, "error");
      });
  },
  setLastModifiedUrl: (url) => set({ lastModifiedUrl: url }),
}));
