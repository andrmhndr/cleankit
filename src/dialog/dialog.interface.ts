import { ReactNode } from "react";

export interface Dialog {
  id: string;
  content?: ((resolve: (result: any) => void) => ReactNode) | ReactNode;
  resolve?: (value: any) => void;
}

export interface DialogContextType {
  openDialog: (dialog: Omit<Dialog, "id">) => Promise<any>;
  closeDialog: (id?: string) => void;
  closeAllDialog: () => void;
}

export interface DialogProviderProps {
  children: ReactNode;
}
