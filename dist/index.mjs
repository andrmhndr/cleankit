import {
  debounce
} from "./chunk-NYLYRUYK.mjs";

// src/global/dialog/dialog.context.tsx
import React, {
  createContext,
  useCallback,
  useState
} from "react";
var overlayStyle = {
  position: "fixed",
  inset: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1e3
};
var dialogBoxStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  minWidth: "320px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
};
var buttonGroupStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "16px",
  gap: "8px"
};
var buttonStyle = (variant = "cancel") => ({
  padding: "8px 16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  backgroundColor: variant === "ok" ? "#0070f3" : "#aaa",
  color: "white",
  cursor: "pointer",
  transition: "opacity 0.2s"
});
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
      if (dialog?.resolve) dialog.resolve(result);
      closeDialog(id);
    },
    [dialogs, closeDialog]
  );
  return /* @__PURE__ */ React.createElement(DialogContext.Provider, { value: { openDialog, closeDialog, closeAllDialog } }, children, dialogs.map((dialog) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: dialog.id,
      style: overlayStyle,
      onClick: () => resolveDialog(dialog.id, null)
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: dialog.content ? null : dialogBoxStyle,
        onClick: (e) => e.stopPropagation()
      },
      typeof dialog.content === "function" ? dialog.content(
        (result) => resolveDialog(dialog.id, result)
      ) : dialog.content ?? /* @__PURE__ */ React.createElement("div", { style: buttonGroupStyle }, /* @__PURE__ */ React.createElement(
        "button",
        {
          style: buttonStyle("ok"),
          onClick: () => resolveDialog(dialog.id, true)
        },
        "OK"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          style: buttonStyle("cancel"),
          onClick: () => resolveDialog(dialog.id, false)
        },
        "Cancel"
      ))
    )
  )));
};

// src/global/dialog/useDialog.hook.tsx
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
  debounce,
  useDialog
};
