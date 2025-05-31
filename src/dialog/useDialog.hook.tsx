import { useContext } from "react";
import { DialogContextType } from "./dialog.interface";
import { DialogContext } from "./dialog.context";

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
