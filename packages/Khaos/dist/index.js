var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Khaos: () => import_hm_core.Khaos,
  LoginForm: () => import_hm_core.LoginForm,
  Resource: () => import_hm_core.Resource,
  SimpleButton: () => import_hm_components.SimpleButton,
  TabsSelect: () => import_hm_components.TabsSelect,
  request: () => import_hm_core.request
});
module.exports = __toCommonJS(src_exports);
var import_hm_components = require("hm-components");
var import_hm_core = require("hm-core");
var import_dist = require("hm-components/dist/index.css");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Khaos,
  LoginForm,
  Resource,
  SimpleButton,
  TabsSelect,
  request
});
//# sourceMappingURL=index.js.map