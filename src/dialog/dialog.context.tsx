import React, { createContext, useCallback, useState, FC } from "react";
import styled from "@emotion/styled";
import {
  DialogContextType,
  DialogProviderProps,
  Dialog,
} from "./dialog.interface";

// Styled components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogBox = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  min-width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 8px;
`;

const Button = styled.button<{ variant?: "ok" | "cancel" }>`
  padding: 8px 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  background-color: ${({ variant }) =>
    variant === "ok" ? "#0070f3" : "#aaa"};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// Context
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
        <Overlay
          key={dialog.id}
          onClick={() => resolveDialog(dialog.id, null)}
        >
          <DialogBox onClick={(e) => e.stopPropagation()}>
            {typeof dialog.content === "function"
              ? dialog.content((result: any) =>
                  resolveDialog(dialog.id, result)
                )
              : dialog.content ?? (
                  <ButtonGroup>
                    <Button
                      onClick={() => resolveDialog(dialog.id, true)}
                      variant="ok"
                    >
                      OK
                    </Button>
                    <Button
                      onClick={() => resolveDialog(dialog.id, false)}
                      variant="cancel"
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                )}
          </DialogBox>
        </Overlay>
      ))}
    </DialogContext.Provider>
  );
};
