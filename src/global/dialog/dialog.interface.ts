import { ReactNode } from "react";

/**
 * Represents a dialog to be displayed.
 */
export interface Dialog {
  /**
   * Unique identifier for the dialog.
   */
  id: string;

  /**
   * The content of the dialog, which can be:
   * - A ReactNode (JSX Element)
   * - A function that receives a resolve callback and returns a ReactNode.
   *   This allows the dialog to be resolved asynchronously.
   */
  content?: ((resolve: (result: any) => void) => ReactNode) | ReactNode;

  /**
   * Optional resolve callback to return a result when the dialog is closed.
   */
  resolve?: (value: any) => void;
}

/**
 * Interface for dialog context functions used to control dialogs.
 */
export interface DialogContextType {
  /**
   * Opens a new dialog.
   * @param dialog - Dialog data without the ID (ID will be internally generated).
   * @returns A Promise that resolves with a value when the dialog is closed.
   */
  openDialog: (dialog: Omit<Dialog, "id">) => Promise<any>;

  /**
   * Closes the currently active dialog.
   * @param id - Optional ID of the dialog to close. If not provided, closes the latest opened dialog.
   */
  closeDialog: (id?: string) => void;

  /**
   * Closes all opened dialogs.
   */
  closeAllDialog: () => void;
}

/**
 * Props for the DialogProvider component.
 */
export interface DialogProviderProps {
  /**
   * The children components wrapped by the provider.
   */
  children: ReactNode;
}
