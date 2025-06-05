import React, {
  createContext,
  useCallback,
  useState,
  FC,
  CSSProperties,
} from "react";
import {
  DialogContextType,
  DialogProviderProps,
  Dialog,
} from "./dialog.interface";

/**
 * Styling for the overlay background when a dialog is active.
 */
const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

/**
 * Basic style for the dialog container.
 */
const dialogBoxStyle: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  minWidth: "320px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
};

/**
 * Button group styling within the dialog.
 */
const buttonGroupStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "16px",
  gap: "8px",
};

/**
 * Dynamic styling for OK and Cancel buttons.
 * @param variant - Button type ("ok" or "cancel")
 */
const buttonStyle = (variant: "ok" | "cancel" = "cancel"): CSSProperties => ({
  padding: "8px 16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  backgroundColor: variant === "ok" ? "#0070f3" : "#aaa",
  color: "white",
  cursor: "pointer",
  transition: "opacity 0.2s",
});

/**
 * Context to manage dialog interactions. Provides functions to open, close, and manage dialogs.
 */
export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

/**
 * DialogProvider component that manages and renders dialogs globally.
 * Wrap this around your app to enable the dialog system.
 *
 * @param children - React children to be rendered inside the provider.
 */
export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  /**
   * Opens a new dialog and returns a promise that resolves when the dialog is closed.
   * @param dialog - The dialog to open (excluding the ID).
   */
  const openDialog = useCallback((dialog: Omit<Dialog, "id">): Promise<any> => {
    const id = new Date().toISOString();
    return new Promise((resolve) => {
      setDialogs((prev) => [...prev, { ...dialog, id, resolve }]);
    });
  }, []);

  /**
   * Closes a specific dialog by ID, or closes the most recent dialog if no ID is provided.
   * @param id - The ID of the dialog to close.
   */
  const closeDialog = useCallback((id?: string) => {
    if (!id) {
      setDialogs((prev) => prev.slice(0, -1));
      return;
    }
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  }, []);

  /**
   * Closes all active dialogs.
   */
  const closeAllDialog = useCallback(() => {
    setDialogs([]);
  }, []);

  /**
   * Resolves a dialog with the given result and closes it.
   * @param id - ID of the dialog to resolve.
   * @param result - Value to return to the caller via the promise.
   */
  const resolveDialog = useCallback(
    (id: string, result: any) => {
      const dialog = dialogs.find((d) => d.id === id) as any;
      if (dialog?.resolve) dialog.resolve(result);
      closeDialog(id);
    },
    [dialogs, closeDialog]
  );

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, closeAllDialog }}>
      {children}

      {/* Render all active dialogs */}
      {dialogs.map((dialog) => (
        <div
          key={dialog.id}
          style={overlayStyle}
          onClick={() => resolveDialog(dialog.id, null)}
        >
          <div
            style={dialog.content ? null : dialogBoxStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {typeof dialog.content === "function"
              ? dialog.content((result: any) =>
                  resolveDialog(dialog.id, result)
                )
              : dialog.content ?? (
                  <div style={buttonGroupStyle}>
                    <button
                      style={buttonStyle("ok")}
                      onClick={() => resolveDialog(dialog.id, true)}
                    >
                      OK
                    </button>
                    <button
                      style={buttonStyle("cancel")}
                      onClick={() => resolveDialog(dialog.id, false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
          </div>
        </div>
      ))}
    </DialogContext.Provider>
  );
};
