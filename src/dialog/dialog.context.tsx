import React, { createContext, useCallback, useState, FC } from "react";
import {
  DialogContextType,
  DialogProviderProps,
  Dialog,
} from "./dialog.interface";

/**
 * Global Dialog Context.
 * Provides centralized dialog control across the application.
 */
export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

/**
 * DialogProvider component.
 * Must wrap your application to enable dialog functionality globally.
 *
 * @param children - Child components that can access dialog features via context.
 */
export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  /**
   * Open a new dialog.
   *
   * @param dialog - The dialog configuration (without `id`). Accepts either static content or a function that receives a `resolve` callback.
   * @returns A Promise that resolves when the dialog is closed.
   */
  const openDialog = useCallback((dialog: Omit<Dialog, "id">): Promise<any> => {
    const id = new Date().toISOString(); // unique-ish ID using timestamp
    return new Promise((resolve) => {
      setDialogs((prev) => [...prev, { ...dialog, id, resolve }]);
    });
  }, []);

  /**
   * Close a dialog by its ID.
   * If no ID is provided, it closes the last dialog in the stack.
   *
   * @param id - (Optional) ID of the dialog to close.
   */
  const closeDialog = useCallback((id?: string) => {
    if (!id) {
      setDialogs((prev) => prev.slice(0, -1));
      return;
    }
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  }, []);

  /**
   * Closes all currently open dialogs.
   */
  const closeAllDialog = useCallback(() => {
    setDialogs([]);
  }, []);

  /**
   * Resolves a dialog by its ID and closes it.
   * Calls the internal `resolve()` passed to `openDialog`.
   *
   * @param id - ID of the dialog to resolve
   * @param result - The result passed back to the caller
   */
  const resolveDialog = useCallback(
    (id: string, result: any) => {
      const dialog = dialogs.find((d) => d.id === id) as any;
      if (dialog?.resolve) {
        dialog.resolve(result);
      }
      closeDialog(id);
    },
    [dialogs, closeDialog]
  );

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, closeAllDialog }}>
      {children}

      {dialogs.map((dialog) => (
        <div
          key={dialog.id}
          className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/40 transition-opacity duration-300 animate-fadeIn"
          onClick={() => resolveDialog(dialog.id, null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 animate-dialogIn"
          >
            {typeof dialog.content === "function"
              ? dialog.content((result: any) =>
                  resolveDialog(dialog.id, result)
                )
              : dialog.content ?? (
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => resolveDialog(dialog.id, true)}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      OK
                    </button>
                    <button
                      onClick={() => resolveDialog(dialog.id, false)}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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
