var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DialogContext: () => DialogContext,
  DialogProvider: () => DialogProvider,
  debounce: () => debounce,
  useDialog: () => useDialog
});
module.exports = __toCommonJS(index_exports);

// src/global/debounce/debounce.ts
function debounce(func, wait) {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// src/global/dialog/dialog.context.tsx
var import_react = __toESM(require("react"));
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
var DialogContext = (0, import_react.createContext)(
  void 0
);
var DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = (0, import_react.useState)([]);
  const openDialog = (0, import_react.useCallback)((dialog) => {
    const id = (/* @__PURE__ */ new Date()).toISOString();
    return new Promise((resolve) => {
      setDialogs((prev) => [...prev, { ...dialog, id, resolve }]);
    });
  }, []);
  const closeDialog = (0, import_react.useCallback)((id) => {
    if (!id) {
      setDialogs((prev) => prev.slice(0, -1));
      return;
    }
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  }, []);
  const closeAllDialog = (0, import_react.useCallback)(() => {
    setDialogs([]);
  }, []);
  const resolveDialog = (0, import_react.useCallback)(
    (id, result) => {
      const dialog = dialogs.find((d) => d.id === id);
      if (dialog?.resolve) dialog.resolve(result);
      closeDialog(id);
    },
    [dialogs, closeDialog]
  );
  return /* @__PURE__ */ import_react.default.createElement(DialogContext.Provider, { value: { openDialog, closeDialog, closeAllDialog } }, children, dialogs.map((dialog) => /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: dialog.id,
      style: overlayStyle,
      onClick: () => resolveDialog(dialog.id, null)
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style: dialog.content ? null : dialogBoxStyle,
        onClick: (e) => e.stopPropagation()
      },
      typeof dialog.content === "function" ? dialog.content(
        (result) => resolveDialog(dialog.id, result)
      ) : dialog.content ?? /* @__PURE__ */ import_react.default.createElement("div", { style: buttonGroupStyle }, /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          style: buttonStyle("ok"),
          onClick: () => resolveDialog(dialog.id, true)
        },
        "OK"
      ), /* @__PURE__ */ import_react.default.createElement(
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
var import_react2 = require("react");
var useDialog = () => {
  const context = (0, import_react2.useContext)(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DialogContext,
  DialogProvider,
  debounce,
  useDialog
});
