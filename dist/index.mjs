// src/dialog/dialog.context.tsx
import React, { createContext, useCallback, useState } from "react";
var DialogContext = createContext(
  void 0
);
var DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState([]);
  const openDialog = useCallback((dialog) => {
    const id = (/* @__PURE__ */ new Date()).toISOString();
    return new Promise((resolve) => {
      setDialogs((prev) => [...prev, { ...dialog, id, resolve }]);
    });
  }, []);
  const closeDialog = useCallback((id) => {
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
    (id, result) => {
      const dialog = dialogs.find((d) => d.id === id);
      if (dialog?.resolve) {
        dialog.resolve(result);
      }
      closeDialog(id);
    },
    [dialogs, closeDialog]
  );
  return /* @__PURE__ */ React.createElement(DialogContext.Provider, { value: { openDialog, closeDialog, closeAllDialog } }, children, dialogs.map((dialog) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: dialog.id,
      className: "fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/40 transition-opacity duration-300 animate-fadeIn",
      onClick: () => resolveDialog(dialog.id, null)
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "bg-white p-6 rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 animate-dialogIn"
      },
      typeof dialog.content === "function" ? dialog.content(
        (result) => resolveDialog(dialog.id, result)
      ) : dialog.content ?? /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => resolveDialog(dialog.id, true),
          className: "mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        },
        "OK"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => resolveDialog(dialog.id, false),
          className: "mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        },
        "Cancel"
      ))
    )
  )));
};

// src/dialog/useDialog.hook.tsx
import { useContext } from "react";
var useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
export {
  DialogContext,
  DialogProvider,
  useDialog
};
