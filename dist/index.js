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
  useDialog: () => useDialog
});
module.exports = __toCommonJS(index_exports);

// src/dialog/dialog.context.tsx
var import_react = __toESM(require("react"));
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
      if (dialog?.resolve) {
        dialog.resolve(result);
      }
      closeDialog(id);
    },
    [dialogs, closeDialog]
  );
  return /* @__PURE__ */ import_react.default.createElement(DialogContext.Provider, { value: { openDialog, closeDialog, closeAllDialog } }, children, dialogs.map((dialog) => /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: dialog.id,
      className: "fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/40 transition-opacity duration-300 animate-fadeIn",
      onClick: () => resolveDialog(dialog.id, null)
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "bg-white p-6 rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 animate-dialogIn"
      },
      typeof dialog.content === "function" ? dialog.content(
        (result) => resolveDialog(dialog.id, result)
      ) : dialog.content ?? /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          onClick: () => resolveDialog(dialog.id, true),
          className: "mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        },
        "OK"
      ), /* @__PURE__ */ import_react.default.createElement(
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
  useDialog
});
