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

// Inline styles
const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const dialogBoxStyle: CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  minWidth: "320px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
};

const buttonGroupStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "16px",
  gap: "8px",
};

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

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const openDialog = useCallback((dialog: Omit<Dialog, "id">): Promise<any> => {
    const id = new Date().toISOString();
    return new Promise((resolve) => {
      setDialogs((prev) => [...prev, { ...dialog, id, resolve }]);
    });
  }, []);

  const closeDialog = useCallback((id?: string) => {
    if (!id) {
      setDialogs((prev) => prev.slice(0, -1));
      return;
    }
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const closeAllDialog = useCallback(() => {
    setDialogs([]);
  }, []);

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
