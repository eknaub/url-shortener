import type { AlertColor } from "@mui/material";
import { create } from "zustand";

type Severity = AlertColor;

type MessageStore = {
  isOpen: boolean;
  message: string;
  severity: Severity;
  showSnackbar: (message: string, severity: Severity) => void;
  hideSnackbar: () => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  isOpen: false,
  message: "",
  severity: "info",
  showSnackbar: (message: string, severity: Severity) =>
    set(() => ({
      isOpen: true,
      message,
      severity,
    })),
  hideSnackbar: () => set(() => ({ isOpen: false })),
}));
