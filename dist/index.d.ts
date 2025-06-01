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

declare const DialogContext: React.Context<DialogContextType>;
declare const DialogProvider: FC<DialogProviderProps>;

declare const useDialog: () => DialogContextType;

type Func = (...args: any[]) => void;

declare function debounce<F extends Func>(func: F, wait: number): (this: any, ...args: Parameters<F>) => void;

type QueryParamsInterface = Record<string, string | number | null | undefined>;

declare const useQueryParamsNext: <K extends string = string>() => {
    getAll: () => Record<string, string>;
    getOne: (key: K) => string | null;
    setQuery: (param?: Partial<Record<K, QueryParamsInterface[K]>>, options?: {
        debounce?: number;
    }) => void;
    removeQuery: (...keys: K[]) => void;
    clearQuery: () => void;
};

declare const useQueryParamsReact: <K extends string = string>() => {
    getAll: () => Record<string, string>;
    getOne: (key: K) => string | null;
    setQuery: (param?: Partial<Record<K, QueryParamsInterface[K]>>, options?: {
        debounce?: number;
    }) => void;
    removeQuery: (...keys: K[]) => void;
    clearQuery: () => void;
};

export { type Dialog, DialogContext, type DialogContextType, DialogProvider, type DialogProviderProps, type Func, type QueryParamsInterface, debounce, useDialog, useQueryParamsNext, useQueryParamsReact };
