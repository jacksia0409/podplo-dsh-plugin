"use strict";
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

// packages/tools/tool-worker.ts
var tool_worker_exports = {};
__export(tool_worker_exports, {
  adjustPixels: () => adjustPixels
});
module.exports = __toCommonJS(tool_worker_exports);
var import_node_worker_threads = require("node:worker_threads");
function adjustPixels(data, options) {
  const contrast = (1 + options.contrast / 100) ** 2;
  const brightness = options.brightness * 2.55;
  const warmth = options.temperature * 0.4;
  const saturation = 1 + options.saturation / 100;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    data[i] = Math.round(Math.max(0, Math.min(255, (gray + (r - gray) * saturation - 127.5) * contrast + 127.5 + brightness + warmth)));
    data[i + 1] = Math.round(Math.max(0, Math.min(255, (gray + (g - gray) * saturation - 127.5) * contrast + 127.5 + brightness)));
    data[i + 2] = Math.round(Math.max(0, Math.min(255, (gray + (b - gray) * saturation - 127.5) * contrast + 127.5 + brightness - warmth)));
  }
  return data;
}
if (import_node_worker_threads.parentPort) import_node_worker_threads.parentPort.once("message", (message) => {
  try {
    const result = adjustPixels(message.data, message.options);
    if (!(result.buffer instanceof ArrayBuffer)) throw new Error("\u8C03\u8272\u5DE5\u4F5C\u7EBF\u7A0B\u8F93\u51FA\u65E0\u6548");
    import_node_worker_threads.parentPort.postMessage({ data: result }, [result.buffer]);
  } catch (error) {
    import_node_worker_threads.parentPort.postMessage({ error: error instanceof Error ? error.message : "\u8C03\u8272\u5904\u7406\u5931\u8D25" });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustPixels
});
