import { useContext } from "react";
import { DialogContextType } from "./dialog.interface";
import { DialogContext } from "./dialog.context";

/**
 * Custom hook to access the DialogContext.
 *
 * This hook provides access to dialog functions like `openDialog`, `closeDialog`, and `closeAllDialog`.
 *
 * Make sure to wrap your component tree with `<DialogProvider>` before using this hook.
 *
 * @throws Error if used outside of `DialogProvider`.
 * @returns {DialogContextType} Dialog context API.
 *
 * @example
 * const { openDialog } = useDialog();
 * const result = await openDialog({ content: "Are you sure?" });
 */
export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
