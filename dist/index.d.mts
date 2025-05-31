import React, { ReactNode, FC } from 'react';

interface Dialog {
    id: string;
    content?: ((resolve: (result: any) => void) => ReactNode) | ReactNode;
    resolve?: (value: any) => void;
}
interface DialogContextType {
    openDialog: (dialog: Omit<Dialog, "id">) => Promise<any>;
    closeDialog: (id?: string) => void;
    closeAllDialog: () => void;
}
interface DialogProviderProps {
    children: ReactNode;
}

/**
 * Global Dialog Context.
 * Provides centralized dialog control across the application.
 */
declare const DialogContext: React.Context<DialogContextType>;
/**
 * DialogProvider component.
 * Must wrap your application to enable dialog functionality globally.
 *
 * @param children - Child components that can access dialog features via context.
 */
declare const DialogProvider: FC<DialogProviderProps>;

declare const useDialog: () => DialogContextType;

export { type Dialog, DialogContext, type DialogContextType, DialogProvider, type DialogProviderProps, useDialog };
