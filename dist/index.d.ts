import React, { ReactNode, FC } from 'react';
export { Q as QueryParamsInterface, U as UseQueryInterface } from './query-params.interface-BRtsT-op.js';

/**
 * A generic function type that accepts any arguments and returns nothing.
 * Useful for callbacks, handlers, or any void-returning function signature.
 */
type Func = (...args: any[]) => void;

/**
 * Creates a debounced version of the provided function, which delays
 * invoking the function until after the specified wait time has elapsed
 * since the last time the debounced function was called.
 *
 * @template F - A function type that extends Func.
 * @param func - The original function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A new debounced function.
 */
declare function debounce<F extends Func>(func: F, wait: number): (this: any, ...args: Parameters<F>) => void;

/**
 * Represents a dialog to be displayed.
 */
interface Dialog {
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
interface DialogContextType {
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
interface DialogProviderProps {
    /**
     * The children components wrapped by the provider.
     */
    children: ReactNode;
}

/**
 * Context to manage dialog interactions. Provides functions to open, close, and manage dialogs.
 */
declare const DialogContext: React.Context<DialogContextType>;
/**
 * DialogProvider component that manages and renders dialogs globally.
 * Wrap this around your app to enable the dialog system.
 *
 * @param children - React children to be rendered inside the provider.
 */
declare const DialogProvider: FC<DialogProviderProps>;

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
declare const useDialog: () => DialogContextType;

export { type Dialog, DialogContext, type DialogContextType, DialogProvider, type DialogProviderProps, type Func, debounce, useDialog };
