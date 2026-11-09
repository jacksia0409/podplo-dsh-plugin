window.__ModuleLoader__.load({id:'@podplo/dsh-plugin',factory:(require)=>{ const module={exports:{}}; const exports=module.exports; try {
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/podplo-dsh/src/client.tsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react9 = require("react");

// plugins/podplo-dsh/src/chat-generation-tasks.tsx
var import_react2 = require("react");

// plugins/podplo-dsh/src/chat-generation-approval.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var object = (value) => !!value && typeof value === "object" && !Array.isArray(value);
var finiteInteger = (value) => Number.isSafeInteger(value) && Number(value) >= 0;
function chatGenerationQuotes(value) {
  const rows = object(value) && Array.isArray(value.items) ? value.items : [];
  return rows.flatMap((row) => {
    if (!object(row) || row.status !== "quoted" || typeof row.operationId !== "string" || !row.operationId || typeof row.approvalId !== "string" || !row.approvalId || !object(row.quote) || !object(row.summary) || typeof row.quote.expiresAt !== "string" || !Number.isFinite(Date.parse(row.quote.expiresAt)) || typeof row.quote.confirmationText !== "string" || !finiteInteger(row.quote.totalCredits) || !finiteInteger(row.quote.outputCount) || !finiteInteger(row.summary.itemCount) || row.summary.totalCredits !== row.quote.totalCredits || row.summary.outputCount !== row.quote.outputCount) return [];
    return [{
      operationId: row.operationId,
      approvalId: row.approvalId,
      status: "quoted",
      quote: {
        expiresAt: row.quote.expiresAt,
        totalCredits: row.quote.totalCredits,
        outputCount: row.quote.outputCount,
        confirmationText: row.quote.confirmationText
      },
      summary: { itemCount: row.summary.itemCount, totalCredits: row.summary.totalCredits, outputCount: row.summary.outputCount }
    }];
  });
}
function ChatGenerationApproval({ quote, attempt, onApprove }) {
  const expired = Date.parse(quote.quote.expiresAt) <= Date.now();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      className: "ppd-chat-confirm",
      "data-podplo-chat-approve": true,
      disabled: expired || !!attempt,
      onClick: onApprove,
      children: attempt?.busy ? "\u6B63\u5728\u786E\u8BA4\u2026" : attempt ? "\u5DF2\u63D0\u4EA4\u786E\u8BA4" : "\u786E\u8BA4\u5E76\u751F\u6210"
    }
  );
}

// plugins/podplo-dsh/src/chat-generation-progress.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var generationStatusLabels = {
  submitting: "\u6B63\u5728\u63D0\u4EA4",
  submitted: "\u6B63\u5728\u751F\u6210",
  submission_unknown: "\u63D0\u4EA4\u7ED3\u679C\u5F85\u6838\u5BF9",
  partial_unknown: "\u90E8\u5206\u7ED3\u679C\u5F85\u6838\u5BF9",
  completed: "\u672C\u6279\u751F\u56FE\u5B8C\u6210",
  partial_failure: "\u90E8\u5206\u5B8C\u6210\u3001\u90E8\u5206\u5931\u8D25",
  partial_cancelled: "\u90E8\u5206\u5B8C\u6210\u3001\u5176\u4F59\u5DF2\u505C\u6B62",
  failed: "\u6267\u884C\u5931\u8D25",
  cancelled: "\u5DF2\u505C\u6B62",
  quoted: "\u7B49\u5F85\u63D0\u4EA4"
};
var activeGenerationStatuses = /* @__PURE__ */ new Set(["submitting", "submitted", "submission_unknown", "partial_unknown"]);
var terminalGenerationStatuses = /* @__PURE__ */ new Set(["completed", "partial_failure", "partial_cancelled", "failed", "cancelled"]);
function ChatGenerationProgress({ item, busy, onAction }) {
  const summary = item.summary;
  const settled = summary.completedCount + summary.failedCount + summary.cancelledCount;
  const canStop = activeGenerationStatuses.has(item.status) && !item.stoppedAt;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "ppd-chat-progress-details", "data-podplo-progress-details": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("progress", { "aria-label": "\u5DF2\u7ED3\u675F\u7684\u751F\u56FE\u9879\u76EE", max: Math.max(1, summary.itemCount), value: settled }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
      "\u5B8C\u6210 ",
      summary.completedCount,
      " \xB7 \u751F\u6210\u4E2D ",
      summary.submittedCount,
      " \xB7 \u5F85\u6838\u5BF9 ",
      summary.unknownCount,
      " \xB7 \u5931\u8D25 ",
      summary.failedCount,
      " \xB7 \u5DF2\u505C\u6B62 ",
      summary.cancelledCount
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ol", { children: item.items.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        index + 1,
        ". ",
        row.skillId || "\u666E\u901A\u751F\u56FE",
        " \xB7 ",
        row.outputCount,
        " \u5F20"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: row.status === "completed" ? "\u5DF2\u5B8C\u6210" : generationStatusLabels[row.status] ?? row.status }),
      row.errorCode && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: row.errorCode })
    ] }, row.itemId)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "ppd-chat-progress-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", disabled: busy, onClick: () => onAction("generation.status"), children: "\u5237\u65B0\u8FDB\u5EA6" }),
      canStop && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", disabled: busy, title: "\u53EA\u505C\u6B62\u672A\u63D0\u4EA4\u6B65\u9AA4\uFF0C\u5DF2\u63A5\u7EB3\u7684\u4EFB\u52A1\u7EE7\u7EED\u751F\u6210", onClick: () => onAction("generation.stopRemaining"), children: "\u505C\u6B62\u5269\u4F59\u6B65\u9AA4" })
    ] })
  ] });
}

// plugins/podplo-dsh/src/task-archive-ui.tsx
var import_react = require("react");

// plugins/podplo-dsh/src/task-archive.css
var task_archive_default = ".ppd-archive-card{border:1px solid var(--border,#deded7);border-radius:9px;padding:14px;margin:12px 0;background:var(--background,#fff);min-width:0}\n.ppd-task-audit{padding:10px 12px;background:var(--muted,#f5f5ef);border-radius:6px;margin:10px 0;font-size:12px;line-height:1.65}.ppd-task-audit strong{font-size:12px}.ppd-task-audit p{margin:3px 0;overflow-wrap:anywhere}\n.ppd-archive-title{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.ppd-archive-title strong{overflow-wrap:anywhere}.ppd-archive-title small{margin-left:auto;color:var(--muted-foreground,#6c6c63)}\n.ppd-archive-meta,.ppd-archive-guidance{color:var(--muted-foreground,#6c6c63);font-size:12px;line-height:1.7;margin:7px 0}.ppd-archive-path{display:block;overflow-wrap:anywhere;white-space:normal;font-size:11px;margin:8px 0;color:var(--muted-foreground,#66665d)}\n.ppd-archive-actions,.ppd-archive-toolbar{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:10px}.ppd-archive-actions button,.ppd-archive-toolbar button,.ppd-archive-toolbar select{border:1px solid var(--border,#deded7);border-radius:6px;padding:5px 9px;background:transparent;font:inherit;font-size:12px;color:inherit;cursor:pointer}.ppd-archive-actions button:disabled{opacity:.45;cursor:default}\n.ppd-archive-toolbar input{min-width:120px;flex:1;border:1px solid var(--border,#deded7);border-radius:6px;padding:6px;background:transparent;color:inherit}.ppd-archive-error{font-size:12px;color:#b54b30;overflow-wrap:anywhere}\n.ppd-archive-thumbnails{display:flex;gap:8px;border:0;background:transparent;padding:0;margin:10px 0;cursor:pointer}.ppd-archive-thumbnails img,.ppd-archive-thumbnails .ppd-archive-placeholder{width:72px;height:72px;object-fit:contain;border-radius:4px;background:#f4f4ef}\n.ppd-archive-placeholder{display:flex;align-items:center;justify-content:center;color:#777;font-size:12px}.ppd-archive-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,190px),1fr));gap:12px}.ppd-archive-file{min-width:0;border:1px solid var(--border,#deded7);border-radius:6px;padding:8px}.ppd-archive-file strong{display:block;font-size:12px;overflow-wrap:anywhere;margin:8px 0}.ppd-archive-file small{font-size:11px;color:var(--muted-foreground,#66665d)}\n.ppd-archive-image{display:flex;align-items:center;justify-content:center;width:100%;height:180px;padding:0;border:0;background:#f4f4ef;cursor:pointer}.ppd-archive-image img{width:100%;height:100%;object-fit:contain}.ppd-archive-detail h3{font-size:14px;margin:22px 0 12px}.ppd-archive-lightbox{position:fixed;inset:24px;z-index:1000;background:var(--background,#fff);border:1px solid var(--border,#ddd);box-shadow:0 8px 40px #0003;display:flex;flex-direction:column;padding:16px;gap:12px}.ppd-archive-lightbox>button{align-self:flex-end}.ppd-archive-lightbox img{width:100%;height:calc(100% - 42px);object-fit:contain}.ppd-chat-folders{max-width:760px;width:100%;margin:0 auto}\n.ppd-archive-browser-heading{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin:6px 0 18px}.ppd-archive-browser-heading h2{font-size:22px;margin:0 0 6px}.ppd-archive-browser-heading p{font-size:13px;color:var(--muted-foreground,#6c6c63);margin:0;line-height:1.6}\n.ppd-archive-view-switch{display:flex;border:1px solid var(--border,#deded7);border-radius:7px;padding:3px;gap:3px}.ppd-archive-view-switch button{border:0;border-radius:4px;padding:6px 15px;background:transparent;color:inherit;font:inherit;font-size:12px;cursor:pointer}.ppd-archive-view-switch button[aria-pressed=true]{background:var(--foreground,#292925);color:var(--background,#fff)}\n.ppd-archive-date-toolbar{display:flex;align-items:end;flex-wrap:wrap;gap:10px;margin:14px 0}.ppd-archive-date-toolbar label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--muted-foreground,#6c6c63)}.ppd-archive-date-toolbar input,.ppd-archive-date-toolbar select,.ppd-archive-date-toolbar button{box-sizing:border-box;min-height:32px;border:1px solid var(--border,#deded7);border-radius:6px;padding:5px 9px;color:var(--foreground,inherit);background:var(--background,#fff);font:inherit;font-size:12px;max-width:100%}.ppd-archive-date-toolbar>span{align-self:center;padding-top:16px}.ppd-archive-date-toolbar button{cursor:pointer}.ppd-archive-count{font-size:12px;color:var(--muted-foreground,#6c6c63);margin:18px 0 12px;line-height:1.6}\n.ppd-archive-batches{display:grid;gap:14px}.ppd-archive-batches[data-batch-layout=cards]{grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr))}.ppd-archive-batches>.ppd-archive-card{margin:0;padding:16px;display:flex;flex-direction:column}.ppd-archive-batch-kind{font-size:10px;letter-spacing:.06em;color:var(--muted-foreground,#6c6c63);margin-bottom:10px}.ppd-archive-batches .ppd-archive-title{align-items:start}.ppd-archive-batches .ppd-archive-title strong{font-size:14px;line-height:1.55}.ppd-archive-batches .ppd-archive-title small{font-size:11px;line-height:1.9}.ppd-archive-batch-audit{font-size:11px;line-height:1.6;color:var(--muted-foreground,#6c6c63);margin:2px 0 8px}.ppd-archive-batches .ppd-archive-actions{margin-top:auto;padding-top:12px}.ppd-archive-batches .ppd-archive-thumbnails{min-height:84px;align-items:center;margin:4px 0 12px}.ppd-archive-batches .ppd-archive-thumbnails img{max-width:calc((100% - 16px)/3);height:84px;flex:1}\n.ppd-archive-batches[data-batch-layout=list]>.ppd-archive-card{position:relative;padding-left:104px;min-height:104px}.ppd-archive-batches[data-batch-layout=list] .ppd-archive-thumbnails{position:absolute;left:16px;top:28px;min-height:0;margin:0;width:70px;height:70px}.ppd-archive-batches[data-batch-layout=list] .ppd-archive-thumbnails img{width:70px;height:70px;max-width:none}.ppd-archive-batches[data-batch-layout=list] .ppd-archive-batch-kind{margin-bottom:5px}.ppd-archive-batches[data-batch-layout=list] .ppd-archive-meta{margin:4px 0}.ppd-archive-batches[data-batch-layout=list] .ppd-archive-actions{padding-top:4px}\n.ppd-archive-batch-meta{display:flex;flex-wrap:wrap;gap:3px 10px}.ppd-archive-batch-meta span,.ppd-archive-batch-meta time{white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}\n.ppd-archive-actions .ppd-archive-delete{color:#ad3d32;border-color:#e6c7c2}.ppd-archive-delete-backdrop{position:fixed;inset:0;z-index:1100;display:flex;align-items:center;justify-content:center;padding:20px;background:#171a1d66}.ppd-archive-delete-dialog{width:440px;max-width:100%;padding:24px;background:var(--background,#fff);color:var(--foreground,#292925);border:1px solid var(--border,#ddd);border-radius:12px;box-shadow:0 16px 60px #0002}.ppd-archive-delete-dialog h3{margin:0 0 18px;font-size:18px}.ppd-archive-delete-dialog>strong{display:block;font-size:14px;overflow-wrap:anywhere}.ppd-archive-delete-dialog p{font-size:13px;line-height:1.8;color:var(--muted-foreground,#6c6c63)}.ppd-archive-delete-dialog .ppd-archive-actions{justify-content:flex-end;margin-top:22px}.ppd-archive-actions .ppd-archive-delete-confirm{background:#a9382c;color:#fff;border-color:#a9382c}\n@media(max-width:520px){.ppd-archive-browser-heading{align-items:start}.ppd-archive-batches[data-batch-layout=list]>.ppd-archive-card{padding-left:16px}.ppd-archive-batches[data-batch-layout=list] .ppd-archive-thumbnails{position:static;order:3;margin:6px 0}.ppd-archive-batches[data-batch-layout=list] .ppd-archive-actions{order:4}.ppd-archive-date-toolbar label{max-width:100%}.ppd-archive-title small{margin-left:0}.ppd-archive-toolbar{min-width:0}.ppd-archive-toolbar input{min-width:0;width:100%}}\n";

// plugins/podplo-dsh/src/task-result-audit.ts
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).filter(([, item]) => item !== void 0).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${canonical(item)}`).join(",")}}`;
  return JSON.stringify(value) ?? "null";
}
function processingStepDigest(step) {
  return canonical({ toolName: step.toolName, options: step.options, sourceStepId: step.sourceStepId });
}
function auditTask(files, generation, plan, receipts = [], failures = []) {
  const results = files.filter((file) => file.group === "result");
  const originals = results.filter((file) => file.variant === "generated" || file.assetId);
  const actualGeneration = generation ?? { planned: null, succeeded: originals.length, failed: 0, pending: 0, cancelled: 0, unknown: 0 };
  const downloaded = results.filter((file) => file.status === "saved").length;
  const steps = [];
  const outputsByStep = /* @__PURE__ */ new Map();
  for (const step of plan ?? []) {
    const ids = step.sourceStepId ? outputsByStep.get(step.sourceStepId) ?? [] : (actualGeneration.planned === 0 ? files.filter((file) => file.group === "reference") : originals).map((file) => file.originId).filter((id) => !!id);
    const inputs = [...new Set(ids)];
    const runs = receipts.filter((run) => run.toolName === step.toolName && run.options !== void 0 && canonical(run.options) === canonical(step.options) && run.resultIds.length > 0);
    const completed = new Set(runs.flatMap((run) => run.inputIds).filter((id) => inputs.includes(id)));
    const planDigest = processingStepDigest(step);
    const matchedFailures = failures.filter((failure) => failure.stepId === step.id && failure.planDigest === planDigest && inputs.includes(failure.inputId) && !completed.has(failure.inputId));
    const failedIds = [...new Set(matchedFailures.map((failure) => failure.inputId))];
    outputsByStep.set(step.id, [...new Set(runs.filter((run) => run.inputIds.some((id) => inputs.includes(id))).flatMap((run) => run.resultIds))]);
    steps.push({
      id: step.id,
      label: step.label,
      required: inputs.length,
      completed: completed.size,
      missingIds: inputs.filter((id) => !completed.has(id)),
      failedIds,
      failures: failedIds.map((inputId) => ({ inputId, code: matchedFailures.find((row) => row.inputId === inputId).code }))
    });
  }
  const required = plan === void 0 ? null : steps.reduce((sum, step) => sum + step.required, 0);
  const processed = steps.reduce((sum, step) => sum + step.completed, 0);
  const audit = {
    generation: actualGeneration,
    download: {
      expected: results.length,
      saved: downloaded,
      remaining: results.length - downloaded,
      generated: originals.length,
      generatedSaved: originals.filter((file) => file.status === "saved").length,
      processed: results.length - originals.length,
      processedSaved: results.filter((file) => file.variant === "processed" && file.status === "saved").length,
      failed: results.filter((file) => file.status === "failed").length,
      missing: results.filter((file) => file.status === "missing").length
    },
    processing: {
      registered: plan !== void 0,
      required,
      completed: processed,
      remaining: required === null ? null : required - processed,
      failed: steps.reduce((sum, step) => sum + step.failedIds.length, 0),
      outputs: results.filter((file) => file.variant === "processed").length,
      steps
    },
    complete: false
  };
  audit.complete = actualGeneration.planned !== null && actualGeneration.succeeded === actualGeneration.planned && !actualGeneration.failed && !actualGeneration.pending && !actualGeneration.cancelled && !actualGeneration.unknown && required !== null && required === processed && audit.download.remaining === 0 && !files.some((file) => file.status !== "saved" || file.reviewRequired);
  return audit;
}
function auditLines(audit) {
  const g = audit.generation, d = audit.download, p = audit.processing;
  const lines = [
    g.planned === 0 ? "\u751F\u6210\uFF1A\u672C\u4EFB\u52A1\u6CA1\u6709\u751F\u56FE\u6B65\u9AA4\u3002" : g.planned === null ? `\u751F\u6210\uFF1A\u5DF2\u77E5 ${g.succeeded} \u5F20\uFF0C\u539F\u4EFB\u52A1\u8BA1\u5212\u6570\u91CF\u672A\u767B\u8BB0\u3002` : `\u751F\u6210\uFF1A\u8BA1\u5212 ${g.planned} \u5F20\uFF0C\u6210\u529F ${g.succeeded} \u5F20${g.failed ? `\uFF0C\u5931\u8D25 ${g.failed} \u5F20` : ""}${g.pending ? `\uFF0C\u751F\u6210\u4E2D ${g.pending} \u5F20` : ""}${g.cancelled ? `\uFF0C\u5DF2\u505C\u6B62 ${g.cancelled} \u5F20` : ""}${g.unknown ? `\uFF0C\u5F85\u6838\u5BF9 ${g.unknown} \u5F20` : ""}\u3002`,
    `\u4E0B\u8F7D\uFF1A\u751F\u6210\u56FE\u5DF2\u5B58 ${d.generatedSaved}/${d.generated} \u5F20\uFF1B\u52A0\u5DE5\u6210\u54C1\u5DF2\u5B58 ${d.processedSaved}/${d.processed} \u4E2A\uFF1B\u8FD8\u6709 ${d.remaining} \u4E2A\u672A\u4FDD\u5B58${d.failed ? `\uFF08\u4FDD\u5B58\u5931\u8D25 ${d.failed} \u4E2A\uFF09` : ""}${d.missing ? `\uFF08\u5DF2\u79FB\u52A8\u6216\u6539\u53D8 ${d.missing} \u4E2A\uFF09` : ""}\u3002`
  ];
  if (!p.registered) lines.push(`\u5904\u7406\uFF1A\u539F\u4EFB\u52A1\u7684\u5904\u7406\u8981\u6C42\u672A\u767B\u8BB0\uFF0C\u65E0\u6CD5\u5224\u65AD\u662F\u5426\u6F0F\u5904\u7406\uFF1B\u5DF2\u6709 ${p.outputs} \u4E2A\u52A0\u5DE5\u4EA7\u7269\u3002`);
  else if (!p.steps.length) lines.push("\u5904\u7406\uFF1A\u672C\u4EFB\u52A1\u4E0D\u8981\u6C42\u540E\u7EED\u52A0\u5DE5\u3002");
  else for (const step of p.steps) {
    const transparencyFailures = step.failures.filter((row) => row.code === "TRANSPARENCY_REQUIRED").length;
    lines.push(`\u5904\u7406\u300C${step.label}\u300D\uFF1A\u9700\u8981\u5904\u7406 ${step.required} \u5F20\uFF0C\u5DF2\u5904\u7406 ${step.completed} \u5F20\uFF0C\u8FD8\u6709 ${step.missingIds.length} \u5F20\u672A\u5904\u7406${step.failedIds.length ? `\uFF08\u5931\u8D25 ${step.failedIds.length} \u5F20${transparencyFailures ? `\uFF0C\u5176\u4E2D\u771F\u5B9E\u900F\u660E\u50CF\u7D20\u68C0\u67E5\u672A\u901A\u8FC7 ${transparencyFailures} \u5F20` : ""}\uFF09` : ""}\u3002`);
  }
  if (p.outputs) lines.push(`\u52A0\u5DE5\u4EA7\u7269\uFF1A${p.outputs} \u4E2A\uFF08\u539F\u56FE\u65B9\u5411\u3001\u955C\u50CF\u53CA\u5176\u4ED6\u7248\u672C\u5206\u522B\u8BA1\u4EA7\u7269\uFF0C\u4E0D\u91CD\u590D\u8BA1\u5904\u7406\u5F20\u6570\uFF09\u3002`);
  lines.push(audit.complete ? "\u6838\u5BF9\u7ED3\u679C\uFF1A\u5DF2\u9F50\u5168\u3002" : "\u6838\u5BF9\u7ED3\u679C\uFF1A\u4ECD\u6709\u672A\u5B8C\u6210\u6216\u9700\u6838\u5BF9\u7684\u9879\u76EE\u3002");
  return lines;
}

// plugins/podplo-dsh/src/archive-filters.ts
function localDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) return date;
}
function archiveDateError({ period, from, to }) {
  if (period !== "custom") return "";
  if (from && !localDate(from) || to && !localDate(to)) return "\u8BF7\u586B\u5199\u6709\u6548\u7684\u65E5\u671F\u3002";
  if (from && to && from > to) return "\u5F00\u59CB\u65E5\u671F\u4E0D\u80FD\u665A\u4E8E\u7ED3\u675F\u65E5\u671F\u3002";
  return "";
}
function filterArchiveTasks(tasks, filters, now = /* @__PURE__ */ new Date()) {
  if (archiveDateError(filters)) return [];
  let start, end;
  if (filters.period === "custom") {
    start = localDate(filters.from);
    end = localDate(filters.to);
    if (end) end.setDate(end.getDate() + 1);
  } else if (filters.period !== "all") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    start.setDate(start.getDate() - (filters.period === "7days" ? 6 : filters.period === "30days" ? 29 : 0));
  }
  const query = filters.query.trim().toLocaleLowerCase();
  const timestamp = (task) => {
    const value = Date.parse(task.createdAt);
    return Number.isFinite(value) ? value : -Infinity;
  };
  return tasks.filter((task) => {
    if (filters.project && task.projectId !== filters.project || !`${task.name} ${task.projectName}`.toLocaleLowerCase().includes(query)) return false;
    const time = timestamp(task);
    return !start && !end || Number.isFinite(time) && (!start || time >= start.getTime()) && (!end || time < end.getTime());
  }).sort((a, b) => timestamp(a) === timestamp(b) ? 0 : timestamp(b) - timestamp(a));
}

// plugins/podplo-dsh/src/task-archive-ui.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var target;
var listeners = /* @__PURE__ */ new Set();
var archiveTarget = {
  getSnapshot: () => target,
  subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  open(id) {
    target = { id, sequence: (target?.sequence ?? 0) + 1 };
    for (const listener of listeners) listener();
  },
  clear() {
    target = void 0;
    for (const listener of listeners) listener();
  }
};
var saveLabels = { saving: "\u6B63\u5728\u4FDD\u5B58\u5230\u7535\u8111\u2026", saved: "\u5DF2\u4FDD\u5B58\u5230\u7535\u8111", failed: "\u4FDD\u5B58\u672A\u5B8C\u6210", missing: "\u672C\u5730\u6587\u4EF6\u5DF2\u79FB\u52A8\u6216\u6539\u53D8", waiting: "\u7B49\u5F85\u751F\u6210\u7ED3\u679C", cloud: "\u4EC5\u4E91\u7AEF \xB7 \u5C1A\u672A\u4E0B\u8F7D" };
function ArchiveStyles() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("style", { children: task_archive_default });
}
function ArchiveImage({ task, file, request }) {
  const [image, setImage] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    let alive = true;
    setImage("");
    setError("");
    const load = async () => {
      if (!file.image) return;
      if (file.status === "saved") {
        try {
          const { data } = await request("archive.preview", { taskId: task.id, fileId: file.id });
          if (alive) setImage(data.dataUrl);
          return;
        } catch {
        }
      }
      if (file.assetId) {
        const { data } = await request("assets.detail", { id: file.assetId });
        if (alive) setImage(data.previewUrl || "");
      }
    };
    void load().catch(() => {
      if (alive) setError("\u9884\u89C8\u6682\u4E0D\u53EF\u7528");
    });
    return () => {
      alive = false;
    };
  }, [request, task.id, file.id, file.status, file.image, file.assetId]);
  return image ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: image, alt: file.name, loading: "lazy" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ppd-archive-placeholder", children: error || (file.image ? "\u56FE\u7247" : "\u6587\u4EF6") });
}
function TaskFolderCard({ task, request, onView, library = false, view, onDelete }) {
  const [error, setError] = (0, import_react.useState)("");
  const [busy, setBusy] = (0, import_react.useState)(false);
  const act = async (action) => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await request(action, action === "archive.saveCloud" ? { assetId: task.files[0]?.assetId } : { taskId: task.id });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u64CD\u4F5C\u672A\u5B8C\u6210");
    } finally {
      setBusy(false);
    }
  };
  const images = task.files.filter((file) => file.group === "result" && file.image && (file.status === "saved" || file.assetId)).slice(view === "list" ? -1 : -3);
  const running2 = ["quoted", "submitting", "submitted", "submission_unknown", "partial_unknown"].includes(task.status);
  const createdTime = Date.parse(task.createdAt);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: "ppd-archive-card", "data-task-folder": task.id, "data-batch-view": view, children: [
    view && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "ppd-archive-batch-kind", children: task.saveStatus === "cloud" ? "\u5355\u5F20\u4E91\u7AEF\u5386\u53F2" : "\u4EFB\u52A1\u6279\u6B21" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-title", children: [
      !view && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: "\u{1F4C1}" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: task.name }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("small", { children: [
        running2 ? "\u4EFB\u52A1\u8FDB\u884C\u4E2D \xB7 " : "",
        saveLabels[task.saveStatus]
      ] })
    ] }),
    view ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-meta ppd-archive-batch-meta", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: task.projectName }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("time", { dateTime: Number.isFinite(createdTime) ? task.createdAt : void 0, children: Number.isFinite(createdTime) ? new Date(createdTime).toLocaleString(void 0, { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "\u65F6\u95F4\u672A\u63D0\u4F9B" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
        task.resultCount,
        " \u4E2A\u7ED3\u679C \xB7 ",
        task.referenceCount,
        " \u5F20\u53C2\u8003\u56FE"
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-meta", children: [
      task.projectName,
      " \xB7 ",
      Number.isFinite(createdTime) ? new Date(createdTime).toLocaleString() : "\u65F6\u95F4\u672A\u63D0\u4F9B",
      " \xB7 ",
      task.resultCount,
      " \u4E2A\u7ED3\u679C \xB7 ",
      task.referenceCount,
      " \u5F20\u53C2\u8003\u56FE"
    ] }),
    task.audit && (view ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "ppd-archive-batch-audit", "data-task-audit": true, children: task.audit.complete ? "\u6570\u91CF\u6838\u5BF9\u5DF2\u9F50\u5168" : "\u6709\u672A\u5B8C\u6210\u6216\u5F85\u6838\u5BF9\u9879\uFF0C\u67E5\u770B\u7ED3\u679C\u4E86\u89E3\u8BE6\u60C5" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-task-audit", role: "status", "data-task-audit": true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("strong", { children: [
        "\u4EFB\u52A1\u6570\u91CF\u6838\u5BF9 \xB7 ",
        task.audit.complete ? "\u5DF2\u9F50\u5168" : "\u8FD8\u6709\u672A\u5B8C\u6210\u6216\u5F85\u6838\u5BF9\u9879"
      ] }),
      auditLines(task.audit).slice(0, -1).map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: line }, index))
    ] })),
    images.length > 0 && onView && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "ppd-archive-thumbnails", "aria-label": `\u67E5\u770B ${task.name} \u7684\u7ED3\u679C`, onClick: onView, children: images.map((file) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArchiveImage, { task, file, request }, file.id)) }),
    !view && task.directory && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { className: "ppd-archive-path", title: task.directory, children: task.directory }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-actions", children: [
      onView && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: onView, children: "\u67E5\u770B\u7ED3\u679C" }),
      task.directory ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: busy || task.saveStatus === "missing", onClick: () => void act("archive.openTask"), children: "\u6253\u5F00\u4EFB\u52A1\u6587\u4EF6\u5939" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: busy || task.status !== "completed", onClick: () => void act("archive.saveCloud"), children: "\u4FDD\u5B58\u5230\u7535\u8111" }),
      task.summaryStatus === "saved" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: busy, onClick: () => void act("archive.openSummary"), children: "\u6253\u5F00\u4EFB\u52A1\u603B\u7ED3" }),
      library && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: busy, onClick: () => void act("archive.navigate"), children: "\u5728\u5904\u7406\u7ED3\u679C\u4E2D\u67E5\u770B" }),
      task.directory && (task.saveStatus === "failed" || task.audit && task.audit.download.remaining > 0) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: busy, onClick: () => void act("archive.retry"), children: "\u8865\u4E0B\u8F7D" }),
      !!task.audit?.processing.remaining && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: busy, onClick: () => void act("archive.processPending"), children: busy ? "\u5904\u7406\u4E2D\u2026" : "\u7EE7\u7EED\u5904\u7406" }),
      task.directory && onDelete && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          className: "ppd-archive-delete",
          disabled: busy || running2 || task.saveStatus === "saving",
          title: running2 || task.saveStatus === "saving" ? "\u4EFB\u52A1\u8FDB\u884C\u4E2D\uFF0C\u8BF7\u5148\u505C\u6B62\u5E76\u7B49\u5F85\u4FDD\u5B58\u7ED3\u675F" : "\u5220\u9664\u6279\u6B21\u8BB0\u5F55\u53CA\u5BF9\u5E94\u672C\u5730\u4EFB\u52A1\u6587\u4EF6\u5939",
          onClick: () => onDelete(task),
          children: "\u5220\u9664\u6279\u6B21"
        }
      )
    ] }),
    (error || task.error) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "ppd-archive-error", role: "alert", children: error || task.error }),
    task.summaryError && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "ppd-archive-error", role: "alert", children: task.summaryError })
  ] });
}
function ArchiveDetail({ task, request, onBack, onUse, onDelete }) {
  const [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)("");
  const [selected, setSelected] = (0, import_react.useState)();
  const act = async (action, file) => {
    if (busy) return;
    setBusy(file.id);
    setError("");
    try {
      const { data } = action === "archive.use" && file.assetId && file.status !== "saved" ? await request("selection.resolve", { kind: "asset", id: file.assetId }) : await request(action, { taskId: task.id, fileId: file.id });
      if (action === "archive.use") await onUse?.(data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "\u64CD\u4F5C\u672A\u5B8C\u6210");
    } finally {
      setBusy("");
    }
  };
  const full = task.files.find((file) => file.id === selected);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "ppd-archive-detail", "data-archive-detail": task.id, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "ppd-button", onClick: onBack, children: "\u8FD4\u56DE\u4EFB\u52A1\u6587\u4EF6\u5939" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TaskFolderCard, { task, request, onDelete }),
    error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { role: "alert", className: "ppd-archive-error", children: error }),
    !!task.audit?.processing.remaining && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: "\u5C1A\u672A\u5904\u7406\u7684\u56FE\u7247" }),
      task.audit.processing.steps.filter((step) => step.missingIds.length).map((step) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: step.label }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { children: step.missingIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: task.files.find((file) => file.originId === id)?.name ?? "\u6765\u6E90\u56FE\u7247\uFF08\u5C1A\u672A\u5F52\u6863\uFF09" }, id)) })
      ] }, step.id))
    ] }),
    ["generated", "processed", "reference"].map((group) => {
      const matches = (file) => group === "reference" ? file.group === "reference" : file.group === "result" && (file.variant ?? (file.assetId ? "generated" : "processed")) === group;
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: group === "generated" ? "\u751F\u6210\u56FE" : group === "processed" ? "\u52A0\u5DE5\u540E\u7684\u6210\u54C1" : "\u53C2\u8003\u56FE" }),
        !task.files.some(matches) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: group === "reference" ? "\u6B64\u4EFB\u52A1\u6CA1\u6709\u53C2\u8003\u56FE\u3002" : "\u6682\u65E0\u6B64\u7C7B\u6210\u679C\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "ppd-archive-grid", children: task.files.filter(matches).map((file) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: "ppd-archive-file", "data-archive-file": file.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "ppd-archive-image", disabled: !file.image || file.status !== "saved" && !file.assetId, onClick: () => setSelected(file.id), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArchiveImage, { task, file, request }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { title: file.name, children: file.name }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("small", { children: task.saveStatus === "cloud" ? "\u5C1A\u672A\u4E0B\u8F7D\u5230\u7535\u8111" : file.status === "saved" ? "\u5DF2\u4FDD\u5B58\u672C\u5730" : file.status === "pending" ? "\u6B63\u5728\u4FDD\u5B58\u2026" : file.status === "missing" ? "\u6587\u4EF6\u5DF2\u79FB\u52A8\u6216\u6539\u53D8" : "\u4FDD\u5B58\u5931\u8D25" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-actions", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: !!busy || file.status !== "saved", onClick: () => void act("archive.reveal", file), children: "\u5B9A\u4F4D\u6587\u4EF6" }),
            onUse && file.image && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: !!busy || file.status !== "saved" && !file.assetId, onClick: () => void act("archive.use", file), children: "\u9009\u5165\u4F1A\u8BDD" })
          ] })
        ] }, file.id)) })
      ] }, group);
    }),
    full && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-lightbox", role: "dialog", "aria-modal": "true", "aria-label": "\u7ED3\u679C\u56FE\u9884\u89C8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: () => setSelected(void 0), children: "\u5173\u95ED\u9884\u89C8" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArchiveImage, { task, file: full, request })
    ] })
  ] });
}
function DeleteBatchDialog({ task, busy, error, onCancel, onConfirm }) {
  const cancel = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const previous = document.activeElement;
    cancel.current?.focus();
    return () => {
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "ppd-archive-delete-backdrop", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "section",
    {
      className: "ppd-archive-delete-dialog",
      role: "alertdialog",
      "aria-modal": "true",
      "aria-label": "\u5220\u9664\u6279\u6B21\u53CA\u672C\u5730\u6587\u4EF6",
      onKeyDown: (event) => {
        if (event.key === "Escape" && !busy) onCancel();
        if (event.key === "Tab") {
          const buttons = [...event.currentTarget.querySelectorAll("button:not(:disabled)")];
          if (buttons.length) {
            event.preventDefault();
            const index = buttons.indexOf(document.activeElement);
            buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus();
          }
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: "\u5220\u9664\u8FD9\u4E2A\u6279\u6B21\uFF1F" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: task.name }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
          "\u5C06\u5220\u9664\u8BE5\u6279\u6B21\u8BB0\u5F55\u548C\u6574\u4E2A\u672C\u5730\u4EFB\u52A1\u6587\u4EF6\u5939\uFF0C\u5305\u62EC ",
          task.resultCount,
          " \u4E2A\u6210\u679C\u3001",
          task.referenceCount,
          " \u5F20\u53C2\u8003\u56FE\u3001\u4EFB\u52A1\u603B\u7ED3\u53CA\u4F60\u653E\u5165\u7684\u5176\u4ED6\u6587\u4EF6\u3002"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { className: "ppd-archive-path", children: task.directory }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "\u4E91\u7AEF\u7D20\u6750\u3001\u6E90\u7D20\u6750\u548C\u5176\u4ED6\u6279\u6B21\u4E0D\u53D7\u5F71\u54CD\u3002\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002" }),
        error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { role: "alert", className: "ppd-archive-error", children: error }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { ref: cancel, type: "button", disabled: busy, onClick: onCancel, children: "\u53D6\u6D88" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "ppd-archive-delete-confirm", disabled: busy, onClick: onConfirm, children: busy ? "\u6B63\u5728\u5220\u9664\u2026" : "\u5220\u9664\u8BB0\u5F55\u548C\u672C\u5730\u6587\u4EF6" })
        ] })
      ]
    }
  ) });
}
function cloudTask(row) {
  const file = { id: row.id, originId: row.id, assetId: row.id, name: row.filename || "\u4E91\u7AEF\u751F\u6210\u56FE", group: "result", variant: "generated", status: "pending", image: true };
  const generation = { planned: null, succeeded: row.status === "ready" ? 1 : 0, failed: 0, pending: row.status === "ready" ? 0 : 1, cancelled: 0, unknown: 0 };
  return {
    id: `cloud:${row.id}`,
    name: row.filename || "\u4E91\u7AEF\u751F\u6210\u56FE",
    projectId: "cloud-history",
    projectName: "\u4E91\u7AEF\u5386\u53F2\u6210\u679C\uFF08\u672A\u627E\u5230\u539F\u4EFB\u52A1\u8BB0\u5F55\uFF09",
    createdAt: row.createdAt || "",
    status: row.status === "ready" ? "completed" : "submitted",
    saveStatus: "cloud",
    resultCount: 1,
    referenceCount: 0,
    savedCount: 0,
    operationIds: [],
    files: [file],
    audit: auditTask([file], generation, void 0)
  };
}
function ArchiveBrowser({ request, onUse, targetId, navigation }) {
  const [items, setItems] = (0, import_react.useState)([]), [error, setError] = (0, import_react.useState)("");
  const [cloud, setCloud] = (0, import_react.useState)([]), [cursor, setCursor] = (0, import_react.useState)(null), [cloudError, setCloudError] = (0, import_react.useState)("");
  const [cloudLoading, setCloudLoading] = (0, import_react.useState)(false), [paginationSupported, setPaginationSupported] = (0, import_react.useState)();
  const [loading, setLoading] = (0, import_react.useState)(true), [project, setProject] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)("");
  const [view, setView] = (0, import_react.useState)("cards");
  const [period, setPeriod] = (0, import_react.useState)("all"), [from, setFrom] = (0, import_react.useState)(""), [to, setTo] = (0, import_react.useState)("");
  const [detail, setDetail] = (0, import_react.useState)(targetId), [page, setPage] = (0, import_react.useState)(1), [revision, setRevision] = (0, import_react.useState)(0);
  const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(), [deleteBusy, setDeleteBusy] = (0, import_react.useState)(false), [deleteError, setDeleteError] = (0, import_react.useState)("");
  const [suppressed, setSuppressed] = (0, import_react.useState)([]);
  const alive = (0, import_react.useRef)(false), cloudReading = (0, import_react.useRef)(false), appended = (0, import_react.useRef)(false), cloudSequence = (0, import_react.useRef)(0);
  (0, import_react.useEffect)(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      cloudSequence.current++;
    };
  }, []);
  (0, import_react.useEffect)(() => {
    setDetail(targetId);
    if (targetId) setProject("");
  }, [targetId]);
  const loadCloud = async (append, after) => {
    if (cloudReading.current) return;
    cloudReading.current = true;
    setCloudLoading(true);
    const token = ++cloudSequence.current;
    try {
      const { data } = await request("archive.cloud", after ? { cursor: after } : {});
      if (!alive.current || token !== cloudSequence.current) return;
      const rows = data.items ?? [];
      setCloud((old) => append || appended.current ? [...new Map([...old, ...rows].map((row) => [row.id, row])).values()] : rows);
      if (append || !appended.current) setCursor(typeof data.nextCursor === "string" ? data.nextCursor : null);
      if (append) appended.current = true;
      setPaginationSupported(data.paginationSupported !== false);
      setCloudError("");
    } catch (cause) {
      if (alive.current) setCloudError(cause instanceof Error ? cause.message : "\u4E91\u7AEF\u5386\u53F2\u8BFB\u53D6\u5931\u8D25");
    } finally {
      cloudReading.current = false;
      if (alive.current) setCloudLoading(false);
    }
  };
  (0, import_react.useEffect)(() => {
    let active = true, reading = false;
    const load = async () => {
      if (reading) return;
      reading = true;
      try {
        const { data } = await request("archive.list", {});
        if (active) {
          setItems(data.items ?? []);
          setSuppressed(data.deletedAssetIds ?? []);
          setError(data.error ?? "");
        }
      } catch (cause) {
        if (active) {
          setItems([]);
          setError(cause instanceof Error ? cause.message : "\u6210\u679C\u8BFB\u53D6\u5931\u8D25");
        }
      } finally {
        reading = false;
        if (active) setLoading(false);
      }
    };
    void load();
    const timer = setInterval(() => void load(), 1800);
    void loadCloud(false);
    const cloudTimer = setInterval(() => void loadCloud(false), 15e3);
    return () => {
      active = false;
      clearInterval(timer);
      clearInterval(cloudTimer);
    };
  }, [request, revision]);
  const confirmDelete = async () => {
    if (!deleteTarget || deleteBusy) return;
    setDeleteBusy(true);
    setDeleteError("");
    try {
      const { data } = await request("archive.delete", { taskId: deleteTarget.id, confirmed: true });
      if (!alive.current) return;
      setItems((old) => old.filter((task) => task.id !== deleteTarget.id));
      setSuppressed((old) => [.../* @__PURE__ */ new Set([...old, ...data.assetIds ?? []])]);
      setDetail(void 0);
      setDeleteTarget(void 0);
      setRevision((value) => value + 1);
    } catch (cause) {
      if (alive.current) setDeleteError(cause instanceof Error ? cause.message : "\u5220\u9664\u672A\u5B8C\u6210\uFF0C\u8BF7\u91CD\u8BD5\u3002");
    } finally {
      if (alive.current) setDeleteBusy(false);
    }
  };
  const askDelete = (task) => {
    setDeleteError("");
    setDeleteTarget(task);
  };
  const deleteDialog = deleteTarget && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DeleteBatchDialog, { task: deleteTarget, busy: deleteBusy, error: deleteError, onCancel: () => setDeleteTarget(void 0), onConfirm: () => void confirmDelete() });
  const known = /* @__PURE__ */ new Set([...suppressed, ...items.flatMap((row) => row.files.flatMap((file) => file.group === "result" && file.assetId ? [file.assetId] : []))]);
  const all = [...items, ...cloud.filter((row) => !known.has(row.id)).map(cloudTask)].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const current = all.find((row) => row.id === detail);
  if (current) return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArchiveStyles, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArchiveDetail, { task: current, request, onBack: () => setDetail(void 0), onUse, onDelete: askDelete }),
    deleteDialog
  ] });
  const projects = [...new Map(all.map((row) => [row.projectId, row.projectName])).entries()];
  const filters = { project, query, period, from, to }, dateError = archiveDateError(filters);
  const filtered = filterArchiveTasks(all, filters);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 20)), visiblePage = Math.min(page, pageCount);
  const cloudCount = filtered.filter((row) => row.saveStatus === "cloud").length;
  const hasFilters = !!(project || query || period !== "all");
  const clearFilters = () => {
    setProject("");
    setQuery("");
    setPeriod("all");
    setFrom("");
    setTo("");
    setPage(1);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { "data-task-archive-browser": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArchiveStyles, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: "ppd-archive-browser-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { children: "\u5904\u7406\u7ED3\u679C" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "\u6BCF\u6B21\u4EFB\u52A1\u4E00\u4E2A\u6279\u6B21\uFF0C\u67E5\u770B\u6210\u54C1\u6216\u6253\u5F00\u5BF9\u5E94\u6587\u4EF6\u5939\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-view-switch", role: "group", "aria-label": "\u5904\u7406\u7ED3\u679C\u89C6\u56FE", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", "aria-pressed": view === "list", onClick: () => setView("list"), children: "\u5217\u8868" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", "aria-pressed": view === "cards", onClick: () => setView("cards"), children: "\u5361\u7247" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-library-toolbar", children: [
      navigation,
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-toolbar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { "aria-label": "\u641C\u7D22\u5904\u7406\u7ED3\u679C", placeholder: "\u641C\u7D22\u6279\u6B21\u6216\u9879\u76EE", value: query, onChange: (event) => {
          setQuery(event.target.value);
          setPage(1);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { "aria-label": "\u6309\u9879\u76EE\u7B5B\u9009\u6210\u679C", value: project, onChange: (event) => {
          setProject(event.target.value);
          setPage(1);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "", children: "\u5168\u90E8\u9879\u76EE" }),
          projects.map(([id, name]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: id, children: name }, id))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", disabled: project === "cloud-history", title: project === "cloud-history" ? "\u8BF7\u5148\u5C06\u4E91\u7AEF\u6210\u679C\u4FDD\u5B58\u5230\u7535\u8111" : void 0, onClick: () => void request("archive.openProject", project ? { projectId: project } : {}).catch((cause) => setError(cause.message)), children: [
          "\u6253\u5F00",
          project ? "\u9879\u76EE" : "\u5F53\u524D\u9879\u76EE",
          "\u6210\u679C\u76EE\u5F55"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: () => {
          appended.current = false;
          setRevision((value) => value + 1);
        }, children: "\u5237\u65B0\u6210\u679C" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-date-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { children: [
        "\u65F6\u95F4\u8303\u56F4",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("select", { "aria-label": "\u6309\u4EFB\u52A1\u521B\u5EFA\u65F6\u95F4\u7B5B\u9009", value: period, onChange: (event) => {
          setPeriod(event.target.value);
          setPage(1);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "all", children: "\u5168\u90E8\u65F6\u95F4" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "today", children: "\u4ECA\u5929" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "7days", children: "\u8FD1 7 \u5929" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "30days", children: "\u8FD1 30 \u5929" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("option", { value: "custom", children: "\u81EA\u5B9A\u4E49\u65E5\u671F" })
        ] })
      ] }),
      period === "custom" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { children: [
          "\u5F00\u59CB\u65E5\u671F",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "date", value: from, "aria-label": "\u5F00\u59CB\u65E5\u671F", onChange: (event) => {
            setFrom(event.target.value);
            setPage(1);
          } })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: "\u2014" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { children: [
          "\u7ED3\u675F\u65E5\u671F",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "date", value: to, "aria-label": "\u7ED3\u675F\u65E5\u671F", onChange: (event) => {
            setTo(event.target.value);
            setPage(1);
          } })
        ] })
      ] }),
      hasFilters && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", onClick: clearFilters, children: "\u6E05\u9664\u7B5B\u9009" })
    ] }),
    !dateError && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "ppd-archive-count", role: "status", children: [
      filtered.length - cloudCount,
      " \u4E2A\u4EFB\u52A1\u6279\u6B21",
      cloudCount ? ` \xB7 ${cloudCount} \u6761\u672A\u5F52\u6863\u4E91\u7AEF\u5386\u53F2` : "",
      " \xB7 \u6309\u4EFB\u52A1\u521B\u5EFA\u65F6\u95F4\u4ECE\u65B0\u5230\u65E7\u6392\u5217"
    ] }),
    dateError && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { role: "alert", className: "ppd-archive-error", children: dateError }),
    (error || cloudError) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { role: "alert", className: "ppd-archive-error", children: error || cloudError }),
    paginationSupported === false && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { role: "status", children: "\u5F53\u524D\u670D\u52A1\u53EA\u63D0\u4F9B\u90E8\u5206\u4E91\u7AEF\u5386\u53F2\uFF0C\u5C1A\u4E0D\u80FD\u786E\u8BA4\u5168\u90E8\u4E91\u7AEF\u56FE\u7247\u5DF2\u5217\u51FA\uFF1B\u5DF2\u5F52\u6863\u4EFB\u52A1\u4E0D\u53D7\u5F71\u54CD\u3002" }),
    loading && !all.length ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { role: "status", children: "\u6B63\u5728\u8BFB\u53D6\u5904\u7406\u7ED3\u679C\u2026" }) : !filtered.length ? !dateError && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "ppd-archive-empty", children: hasFilters ? "\u6CA1\u6709\u7B26\u5408\u7B5B\u9009\u6761\u4EF6\u7684\u6279\u6B21" : "\u6682\u65E0\u5904\u7406\u7ED3\u679C" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "ppd-archive-batches", "data-batch-layout": view, children: filtered.slice((visiblePage - 1) * 20, visiblePage * 20).map((task) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TaskFolderCard, { task, view, request, onView: () => setDetail(task.id), onDelete: askDelete }, task.id)) }),
    filtered.length > 20 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ppd-archive-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: visiblePage === 1, onClick: () => setPage(visiblePage - 1), children: "\u4E0A\u4E00\u9875" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
        visiblePage,
        " / ",
        pageCount
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: visiblePage * 20 >= filtered.length, onClick: () => setPage(visiblePage + 1), children: "\u4E0B\u4E00\u9875" })
    ] }),
    cursor && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "ppd-archive-actions", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", disabled: cloudLoading, onClick: () => void loadCloud(true, cursor), children: cloudLoading ? "\u6B63\u5728\u52A0\u8F7D\u2026" : "\u52A0\u8F7D\u66F4\u591A\u4E91\u7AEF\u6210\u679C" }) }),
    deleteDialog
  ] });
}

// plugins/podplo-dsh/src/chat-generation-tasks.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var preferenceKey = (sessionId) => `podplo:chat-hidden-tasks:v1:${sessionId}`;
var folderHiddenKey = (id) => `archive:${id}`;
function readHidden(sessionId) {
  try {
    const value = JSON.parse(localStorage.getItem(preferenceKey(sessionId)) ?? "[]");
    return new Set(Array.isArray(value) ? value.filter((id) => typeof id === "string") : []);
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function tasksFrom(value) {
  const quotes = chatGenerationQuotes(value).map((quote) => ({ operationId: quote.operationId, quote }));
  const batches = (Array.isArray(value?.items) ? value.items : []).filter((row) => (row.approvedAt || row.status === "cancelled") && row.summary && Array.isArray(row.items) && (activeGenerationStatuses.has(row.status) || terminalGenerationStatuses.has(row.status))).map((batch) => ({ operationId: batch.operationId, batch }));
  return [...quotes, ...batches];
}
function phase(task) {
  if (task.quote) return Date.parse(task.quote.quote.expiresAt) <= Date.now() ? "expired" : "pending";
  return activeGenerationStatuses.has(task.batch.status) ? "active" : "finished";
}
function ChatGenerationTasks(props) {
  if (!props.sessionId || props.sessionId === "podplo-manual") return null;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SessionTasks, { ...props, sessionId: props.sessionId }, props.sessionId);
}
function SessionTasks({ request, sessionId, pollMs = 900 }) {
  const [tasks, setTasks] = (0, import_react2.useState)([]);
  const [folders, setFolders] = (0, import_react2.useState)([]);
  const [folderId, setFolderId] = (0, import_react2.useState)();
  const [hidden, setHidden] = (0, import_react2.useState)(() => readHidden(sessionId));
  const [includeCleared, setIncludeCleared] = (0, import_react2.useState)(false);
  const [expanded, setExpanded] = (0, import_react2.useState)({});
  const [detailsView, setDetailsView] = (0, import_react2.useState)({ settledKey: "", open: false });
  const detailsId = (0, import_react2.useId)();
  const [attempts, setAttempts] = (0, import_react2.useState)({});
  const [receipt, setReceipt] = (0, import_react2.useState)("");
  const [busy, setBusy] = (0, import_react2.useState)();
  const [error, setError] = (0, import_react2.useState)("");
  const locked = (0, import_react2.useRef)(/* @__PURE__ */ new Set());
  const quoted = (0, import_react2.useRef)(/* @__PURE__ */ new Set());
  const actionLocked = (0, import_react2.useRef)(false);
  const mounted = (0, import_react2.useRef)(false);
  const receiptTimer = (0, import_react2.useRef)(void 0);
  (0, import_react2.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (receiptTimer.current !== void 0) window.clearTimeout(receiptTimer.current);
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    let alive = true;
    let reading = false;
    const refresh = async () => {
      if (reading) return;
      reading = true;
      try {
        const { data } = await request("generation.list", {});
        if (alive) {
          const next = tasksFrom(data);
          const declined = next.some((task) => task.batch?.status === "cancelled" && !task.batch.approvedAt && quoted.current.has(task.operationId));
          quoted.current = new Set(next.flatMap((task) => task.quote ? [task.operationId] : []));
          setTasks(next);
          if (declined) {
            setReceipt("\u5DF2\u53D6\u6D88\uFF0C\u672A\u63D0\u4EA4\u751F\u56FE\u3002");
            if (receiptTimer.current !== void 0) window.clearTimeout(receiptTimer.current);
            receiptTimer.current = window.setTimeout(() => {
              setReceipt("");
              receiptTimer.current = void 0;
            }, 5e3);
          }
        }
      } catch {
        if (alive) setTasks([]);
      } finally {
        reading = false;
      }
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), pollMs);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [request, pollMs]);
  (0, import_react2.useEffect)(() => {
    let alive = true, reading = false;
    const refresh = async () => {
      if (reading) return;
      reading = true;
      try {
        const { data } = await request("archive.list", { scope: "session" });
        if (alive) setFolders(data.items ?? []);
      } catch {
        if (alive) setFolders([]);
      } finally {
        reading = false;
      }
    };
    void refresh();
    const timer = setInterval(() => void refresh(), Math.max(1500, pollMs));
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [request, pollMs]);
  const changeHidden = (ids, hide) => {
    setHidden((current) => {
      const next = new Set(current);
      for (const id of ids) {
        if (hide) next.add(id);
        else next.delete(id);
      }
      try {
        localStorage.setItem(preferenceKey(sessionId), JSON.stringify([...next]));
      } catch {
      }
      return next;
    });
  };
  const approve = async (quote) => {
    if (locked.current.has(quote.operationId) || Date.parse(quote.quote.expiresAt) <= Date.now()) return;
    locked.current.add(quote.operationId);
    setAttempts((current) => ({ ...current, [quote.operationId]: { busy: true } }));
    try {
      await request("generation.approve", { operationId: quote.operationId, approvalId: quote.approvalId });
      if (!mounted.current) return;
      setTasks((current) => current.filter((row) => row.operationId !== quote.operationId));
      setReceipt(`\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u751F\u6210 ${quote.quote.outputCount} \u5F20\u56FE\u7247\u2026`);
      if (receiptTimer.current !== void 0) window.clearTimeout(receiptTimer.current);
      receiptTimer.current = window.setTimeout(() => {
        setReceipt("");
        receiptTimer.current = void 0;
      }, 5e3);
    } catch (cause) {
      if (mounted.current) setAttempts((current) => ({ ...current, [quote.operationId]: {
        busy: false,
        error: cause instanceof Error ? cause.message : "\u786E\u8BA4\u672A\u5B8C\u6210\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u62A5\u4EF7\u72B6\u6001\u3002"
      } }));
    }
  };
  const act = async (action, task) => {
    if (actionLocked.current) return;
    actionLocked.current = true;
    setBusy(task.operationId);
    try {
      await request(action, { operationId: task.operationId, ...action === "generation.status" ? { refresh: true } : {} });
      const { data } = await request("generation.list", {});
      if (mounted.current) {
        setTasks(tasksFrom(data));
        setError("");
      }
    } catch (cause) {
      if (mounted.current) setError(cause instanceof Error ? cause.message : "\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u5237\u65B0\u8FDB\u5EA6\u3002");
    } finally {
      actionLocked.current = false;
      if (mounted.current) setBusy(void 0);
    }
  };
  if (!tasks.length && !receipt && !folders.length) return null;
  const isFolderHidden = (row) => hidden.has(folderHiddenKey(row.id)) || row.operationIds.length > 0 && row.operationIds.every((id) => hidden.has(id));
  const listedTasks = tasks.filter((task) => includeCleared || !hidden.has(task.operationId));
  const listedFolders = folders.filter((row) => includeCleared || !isFolderHidden(row));
  const folder = listedFolders.find((row) => row.id === folderId);
  const settledKey = JSON.stringify([.../* @__PURE__ */ new Set([
    ...tasks.filter((task) => ["expired", "finished"].includes(phase(task))).map((task) => task.operationId),
    ...folders.filter((row) => !activeGenerationStatuses.has(row.status) && row.status !== "quoted").flatMap((row) => row.operationIds.length ? row.operationIds : [`archive:${row.id}`])
  ])].sort());
  const showDetails = detailsView.settledKey === settledKey && detailsView.open;
  const archivedOperations = new Set(listedFolders.flatMap((row) => row.operationIds));
  const detailCount = listedFolders.length + listedTasks.filter((task) => !archivedOperations.has(task.operationId)).length;
  const removedFolders = folders.filter(isFolderHidden);
  const removedOperations = new Set(removedFolders.flatMap((row) => row.operationIds));
  const removedCount = removedFolders.length + tasks.filter((task) => hidden.has(task.operationId) && !removedOperations.has(task.operationId)).length;
  const pendingCount = listedTasks.filter((task) => phase(task) === "pending").length + listedFolders.filter((row) => row.status === "quoted" && !listedTasks.some((task) => row.operationIds.includes(task.operationId))).length;
  const activeCount = listedTasks.filter((task) => phase(task) === "active").length + listedFolders.filter((row) => activeGenerationStatuses.has(row.status) && !listedTasks.some((task) => row.operationIds.includes(task.operationId))).length;
  const resultCount = listedFolders.reduce((sum, row) => sum + row.resultCount, 0);
  const settledLabel = listedTasks.every((task) => task.batch?.status === "completed") && listedFolders.every((row) => row.status === "completed") ? "\u5DF2\u5B8C\u6210" : "\u5DF2\u7ED3\u675F";
  const detailsSummary = [
    activeCount ? `\u8FDB\u884C\u4E2D ${activeCount}` : "",
    pendingCount ? `\u5F85\u786E\u8BA4 ${pendingCount}` : "",
    !activeCount && !pendingCount ? settledLabel : "",
    resultCount ? `${resultCount} \u4E2A\u7ED3\u679C` : ""
  ].filter(Boolean).join(" \xB7 ");
  const clearable = tasks.filter((task) => !hidden.has(task.operationId) && ["expired", "finished"].includes(phase(task)));
  const clearableFolders = folders.filter((row) => !isFolderHidden(row) && row.status !== "quoted" && !activeGenerationStatuses.has(row.status) && !tasks.some((task) => row.operationIds.includes(task.operationId) && ["pending", "active"].includes(phase(task))));
  const clearableOperations = new Set(clearableFolders.flatMap((row) => row.operationIds));
  const clearableCount = clearableFolders.length + clearable.filter((task) => !clearableOperations.has(task.operationId)).length;
  const restoreTask = (operationId2) => changeHidden([
    operationId2,
    ...folders.filter((row) => row.operationIds.includes(operationId2)).map((row) => folderHiddenKey(row.id))
  ], false);
  const visible = showDetails ? listedTasks : listedTasks.filter((task) => !hidden.has(task.operationId) && ["pending", "active"].includes(phase(task)));
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "ppd-chat-tasks", "aria-label": "PodPlo \u4F1A\u8BDD\u4EFB\u52A1", "data-podplo-chat-tasks": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ArchiveStyles, {}),
    (detailCount > 0 || removedCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "ppd-chat-task-toolbar", children: [
      detailCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "button",
        {
          type: "button",
          "aria-expanded": showDetails,
          "aria-controls": detailsId,
          "data-podplo-task-details": true,
          onClick: () => setDetailsView({ settledKey, open: !showDetails }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { "aria-hidden": "true", children: showDetails ? "\u25BE" : "\u25B8" }),
            " ",
            showDetails ? "\u6536\u8D77\u4EFB\u52A1\u8BE6\u60C5" : "\u4EFB\u52A1\u8BE6\u60C5",
            " \xB7 ",
            detailCount,
            "\u3000",
            detailsSummary
          ]
        }
      ),
      showDetails && clearableCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "button",
        {
          type: "button",
          "data-podplo-task-clear-settled": true,
          title: "\u4ECE\u5F53\u524D\u5C55\u793A\u6E05\u9664\uFF0C\u4EFB\u52A1\u8BB0\u5F55\u548C\u672C\u5730\u6587\u4EF6\u7EE7\u7EED\u4FDD\u7559",
          onClick: () => {
            changeHidden([...clearable.map((task) => task.operationId), ...clearableFolders.flatMap((row) => [folderHiddenKey(row.id), ...row.operationIds])], true);
            setIncludeCleared(false);
            setFolderId(void 0);
            setDetailsView({ settledKey, open: false });
          },
          children: [
            "\u6E05\u9664\u8FC7\u671F\u548C\u5DF2\u7ED3\u675F \xB7 ",
            clearableCount
          ]
        }
      ),
      removedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "button",
        {
          type: "button",
          "data-podplo-task-show-cleared": true,
          "aria-pressed": includeCleared,
          onClick: () => {
            setIncludeCleared((value) => !value);
            setDetailsView({ settledKey, open: true });
          },
          children: [
            includeCleared ? "\u9690\u85CF\u5DF2\u6E05\u9664" : "\u67E5\u770B\u5DF2\u6E05\u9664",
            " \xB7 ",
            removedCount
          ]
        }
      )
    ] }),
    receipt && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "ppd-chat-approval-receipt", role: "status", "data-podplo-chat-receipt": true, children: receipt }),
    error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { role: "alert", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: detailsId, className: "ppd-chat-task-content", "data-details-expanded": showDetails, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "ppd-chat-task-list", "data-podplo-task-view": showDetails ? "details" : "chat", children: visible.map((task) => {
        const state = phase(task);
        const expandKey = `${task.operationId}:${state}`;
        const open = expanded[expandKey] ?? state === "pending";
        const summary = task.quote?.summary ?? task.batch.summary;
        const attempt = attempts[task.operationId];
        const label = task.quote ? state === "expired" ? "\u62A5\u4EF7\u5DF2\u8FC7\u671F" : "PodPlo \u751F\u56FE\u62A5\u4EF7" : task.batch.status === "cancelled" && !task.batch.approvedAt ? "\u5DF2\u53D6\u6D88\uFF0C\u672A\u63D0\u4EA4\u751F\u56FE" : generationStatusLabels[task.batch.status] ?? task.batch.status;
        const progress = task.batch ? ` \xB7 \u5B8C\u6210 ${task.batch.summary.completedCount}/${summary.itemCount} \u9879` + (task.batch.summary.unknownCount ? ` \xB7 \u5F85\u6838\u5BF9 ${task.batch.summary.unknownCount}` : "") + (task.batch.summary.failedCount ? ` \xB7 \u5931\u8D25 ${task.batch.summary.failedCount}` : "") : "";
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "article",
          {
            "data-operation-id": task.operationId,
            "data-task-phase": state,
            "data-task-expanded": open,
            "data-podplo-chat-approvals": task.quote ? "" : void 0,
            "data-podplo-chat-progress": task.batch ? "" : void 0,
            className: task.quote ? "ppd-chat-approval" : "ppd-chat-progress",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "ppd-chat-task-heading", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: "ppd-chat-task-toggle",
                    "aria-expanded": open,
                    onClick: () => setExpanded((current) => ({ ...current, [expandKey]: !open })),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { "aria-hidden": "true", children: open ? "\u25BE" : "\u25B8" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "ppd-chat-task-summary", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: label }),
                        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
                          summary.itemCount,
                          " \u9879 \xB7 ",
                          summary.outputCount,
                          " \u5F20 \xB7 \u5171 ",
                          summary.totalCredits,
                          " \u79EF\u5206",
                          progress
                        ] })
                      ] })
                    ]
                  }
                ),
                task.quote && state === "pending" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChatGenerationApproval, { quote: task.quote, attempt, onApprove: () => void approve(task.quote) }),
                showDetails && hidden.has(task.operationId) ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", "data-podplo-task-restore": true, onClick: () => restoreTask(task.operationId), children: "\u6062\u590D\u5230\u5BF9\u8BDD" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "ppd-chat-task-remove",
                    "data-podplo-task-remove": true,
                    "aria-label": "\u4ECE\u5BF9\u8BDD\u79FB\u9664",
                    title: "\u4ECE\u5BF9\u8BDD\u79FB\u9664\uFF0C\u4EFB\u52A1\u7EE7\u7EED\u4FDD\u7559\u5728\u8BE6\u60C5\u4E2D",
                    onClick: () => changeHidden([task.operationId], true),
                    children: "\xD7"
                  }
                )
              ] }),
              attempt?.error && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { role: "alert", children: [
                "\u786E\u8BA4\u7ED3\u679C\u5F85\u6838\u5BF9\uFF1A",
                attempt.error
              ] }),
              open && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "ppd-chat-task-body", children: task.quote ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: task.quote.quote.confirmationText }),
                state === "expired" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { role: "status", children: "\u62A5\u4EF7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u8BA9 PodPlo \u91CD\u65B0\u62A5\u4EF7\u3002" })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChatGenerationProgress, { item: task.batch, busy: !!busy, onAction: (action) => void act(action, task) }) })
            ]
          },
          task.operationId
        );
      }) }),
      showDetails && listedFolders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "ppd-chat-folders", "aria-label": "\u672C\u5730\u4EFB\u52A1\u6210\u679C", children: folder ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ArchiveDetail, { task: folder, request, onBack: () => setFolderId(void 0) }) : listedFolders.map((row) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
        isFolderHidden(row) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            "data-podplo-folder-restore": true,
            onClick: () => changeHidden([folderHiddenKey(row.id), ...row.operationIds], false),
            children: "\u6062\u590D\u5230\u5BF9\u8BDD"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TaskFolderCard, { task: row, request, onView: () => setFolderId(row.id), library: true })
      ] }, row.id)) })
    ] })
  ] });
}

// plugins/podplo-dsh/src/generation-cache.ts
var GenerationBootstrapCache = class {
  values = /* @__PURE__ */ new Map();
  jobs = /* @__PURE__ */ new Map();
  drafts = /* @__PURE__ */ new Map();
  operations = /* @__PURE__ */ new Map();
  prepareJobs = /* @__PURE__ */ new Map();
  pendingReferences = /* @__PURE__ */ new Map();
  draftListeners = /* @__PURE__ */ new Map();
  referenceUploads = /* @__PURE__ */ new Map();
  epoch = 0;
  revision() {
    return this.epoch;
  }
  isCurrent(revision) {
    return revision === this.epoch;
  }
  draftKey(ownerId, sessionId) {
    return `${ownerId}:${sessionId}`;
  }
  operationKey(ownerId, sessionId, intentId, planVersion) {
    return `${this.draftKey(ownerId, sessionId)}:${intentId}:${planVersion}`;
  }
  read(ownerId) {
    return this.values.get(ownerId);
  }
  ensure(ownerId) {
    const current = this.values.get(ownerId);
    if (current) return current;
    const next = {
      ownerId,
      capabilities: void 0,
      publicRows: [],
      personalRows: [],
      assets: [],
      assetCursor: null,
      families: {},
      warnings: [],
      refreshedAt: 0
    };
    this.values.set(ownerId, next);
    return next;
  }
  update(ownerId, patch) {
    const current = this.values.get(ownerId) ?? this.ensure(ownerId);
    const selected = /* @__PURE__ */ new Set();
    if (patch.assets) {
      for (const [key, draft] of this.drafts) if (key.startsWith(`${ownerId}:`)) draft.references.forEach((id) => selected.add(id));
      for (const [key, pending] of this.pendingReferences) if (key.startsWith(`${ownerId}:`)) pending.referenceIds.forEach((id) => selected.add(id));
    }
    const retained = current.assets.filter((value) => selected.has(String(value?.id ?? "")));
    const selectedAssets = new Map(retained.map((value) => [String(value?.id ?? ""), value]));
    for (const value of patch.assets ?? []) {
      const id = String(value?.id ?? "");
      selectedAssets.set(id, { ...selectedAssets.get(id), ...value });
    }
    const assets = patch.assets ? [...selectedAssets.values()] : current.assets;
    const next = { ...current, ...patch, ownerId, assets };
    this.values.set(ownerId, next);
    return next;
  }
  refresh(ownerId, loader) {
    const existing = this.jobs.get(ownerId);
    if (existing) return existing;
    const epoch = this.epoch;
    let job;
    const publish = (patch) => {
      if (epoch !== this.epoch || this.jobs.get(ownerId) !== job) return void 0;
      return this.update(ownerId, patch);
    };
    job = Promise.resolve().then(() => loader(publish)).then((value) => {
      const previous = this.values.get(ownerId);
      const next = {
        ...value,
        ownerId,
        families: previous?.families ?? {},
        refreshedAt: Date.now()
      };
      return epoch === this.epoch ? this.update(ownerId, next) : next;
    }).finally(() => {
      if (this.jobs.get(ownerId) === job) this.jobs.delete(ownerId);
    });
    this.jobs.set(ownerId, job);
    return job;
  }
  rememberFamily(ownerId, slug, family) {
    const current = this.values.get(ownerId);
    if (!current) return;
    this.values.set(ownerId, { ...current, families: { ...current.families, [slug]: family } });
  }
  readReferenceUploads(ownerId, sessionId) {
    return (this.referenceUploads.get(this.draftKey(ownerId, sessionId)) ?? []).map((row) => ({ ...row }));
  }
  addReferenceUploads(ownerId, sessionId, rows, revision) {
    if (revision !== this.epoch) return false;
    const key = this.draftKey(ownerId, sessionId);
    this.referenceUploads.set(key, [...this.readReferenceUploads(ownerId, sessionId), ...rows]);
    this.notifyDraft(key);
    return true;
  }
  updateReferenceUpload(ownerId, sessionId, id, patch, revision) {
    if (revision !== this.epoch) return false;
    const key = this.draftKey(ownerId, sessionId), rows = this.referenceUploads.get(key) ?? [];
    const row = rows.find((value) => value.id === id);
    if (!row) return false;
    if (patch === null) {
      URL.revokeObjectURL(row.previewUrl);
      this.referenceUploads.set(key, rows.filter((value) => value.id !== id));
    } else this.referenceUploads.set(key, rows.map((value) => value.id === id ? { ...value, ...patch } : value));
    this.notifyDraft(key);
    return true;
  }
  readDraft(ownerId, sessionId) {
    const value = this.drafts.get(this.draftKey(ownerId, sessionId));
    return value ? structuredClone(value) : void 0;
  }
  writeDraft(ownerId, sessionId, draft) {
    const key = this.draftKey(ownerId, sessionId);
    const existing = this.drafts.get(key);
    let next = structuredClone(draft);
    if (existing?.intentId === next.intentId && existing.planVersion > next.planVersion) {
      next = {
        ...next,
        references: [...existing.references],
        planVersion: existing.planVersion,
        operation: existing.operation ? structuredClone(existing.operation) : void 0,
        approvalAttempted: existing.approvalAttempted
      };
    }
    const pending = this.pendingReferences.get(key);
    if (pending) {
      next.references = [.../* @__PURE__ */ new Set([...next.references, ...pending.referenceIds])];
      this.pendingReferences.delete(key);
    }
    if (next.operation && (next.operation.intentId !== next.intentId || next.operation.planVersion !== next.planVersion)) delete next.operation;
    this.drafts.set(key, next);
    if (next.operation) this.operations.set(this.operationKey(ownerId, sessionId, next.intentId, next.planVersion), structuredClone(next.operation));
    if (pending) this.notifyDraft(key);
  }
  subscribeDraft(ownerId, sessionId, listener) {
    const key = this.draftKey(ownerId, sessionId);
    const listeners2 = this.draftListeners.get(key) ?? /* @__PURE__ */ new Set();
    listeners2.add(listener);
    this.draftListeners.set(key, listeners2);
    return () => {
      listeners2.delete(listener);
      if (!listeners2.size) this.draftListeners.delete(key);
    };
  }
  mergeReadyReference(ownerId, sessionId, asset, expectedRevision) {
    if (expectedRevision !== this.epoch || !asset || typeof asset !== "object") return false;
    const row = asset;
    if (typeof row.id !== "string" || !row.id || row.status !== "ready") return false;
    const bootstrap = this.ensure(ownerId);
    const assets = [...new Map([...bootstrap.assets, structuredClone(asset)].map((value) => [String(value?.id ?? ""), value])).values()];
    this.values.set(ownerId, { ...bootstrap, assets });
    const key = this.draftKey(ownerId, sessionId);
    const draft = this.drafts.get(key);
    if (!draft) {
      const pending = this.pendingReferences.get(key) ?? { assets: [], referenceIds: [] };
      this.pendingReferences.set(key, { assets: [...pending.assets, structuredClone(asset)], referenceIds: [.../* @__PURE__ */ new Set([...pending.referenceIds, row.id])] });
      this.notifyDraft(key);
      return true;
    }
    if (draft.references.includes(row.id)) return true;
    const nextPlanVersion = Math.min(1e6, draft.planVersion + 1);
    this.drafts.set(key, { ...draft, references: [...draft.references, row.id], planVersion: nextPlanVersion, operation: void 0, approvalAttempted: false });
    this.notifyDraft(key);
    return true;
  }
  notifyDraft(key) {
    for (const listener of this.draftListeners.get(key) ?? []) listener();
  }
  readOperation(ownerId, sessionId, intentId, planVersion) {
    const operation = this.operations.get(this.operationKey(ownerId, sessionId, intentId, planVersion));
    return operation ? structuredClone(operation) : void 0;
  }
  rememberOperation(ownerId, sessionId, operation) {
    const draftKey = this.draftKey(ownerId, sessionId);
    const draft = this.drafts.get(draftKey);
    if (!draft || draft.intentId !== operation.intentId || draft.planVersion !== operation.planVersion) return false;
    const next = structuredClone(operation);
    this.operations.set(this.operationKey(ownerId, sessionId, operation.intentId, operation.planVersion), next);
    this.drafts.set(draftKey, { ...draft, operation: structuredClone(next) });
    return true;
  }
  rememberApprovalAttempt(ownerId, sessionId, intentId, planVersion) {
    const key = this.draftKey(ownerId, sessionId);
    const draft = this.drafts.get(key);
    if (!draft || draft.intentId !== intentId || draft.planVersion !== planVersion) return false;
    this.drafts.set(key, { ...draft, approvalAttempted: true });
    return true;
  }
  advanceDraftPlan(ownerId, sessionId, intentId, planVersion, nextPlanVersion) {
    const key = this.draftKey(ownerId, sessionId);
    const draft = this.drafts.get(key);
    if (!draft || draft.intentId !== intentId || draft.planVersion !== planVersion) return false;
    this.drafts.set(key, { ...draft, planVersion: nextPlanVersion, operation: void 0, approvalAttempted: false });
    return true;
  }
  readPendingPrepare(ownerId, sessionId, intentId, planVersion) {
    return this.prepareJobs.get(this.operationKey(ownerId, sessionId, intentId, planVersion));
  }
  prepare(ownerId, sessionId, intentId, planVersion, loader) {
    const key = this.operationKey(ownerId, sessionId, intentId, planVersion);
    const remembered = this.operations.get(key);
    if (remembered) return Promise.resolve(structuredClone(remembered));
    const existing = this.prepareJobs.get(key);
    if (existing) return existing;
    const epoch = this.epoch;
    let job;
    job = Promise.resolve().then(loader).then((operation) => {
      if (operation.intentId !== intentId || operation.planVersion !== planVersion) throw new Error("\u751F\u56FE\u62A5\u4EF7\u4E0E\u5F53\u524D\u8BA1\u5212\u4E0D\u5339\u914D");
      if (epoch !== this.epoch || this.prepareJobs.get(key) !== job) throw new Error("\u751F\u56FE\u62A5\u4EF7\u8D26\u53F7\u4E0A\u4E0B\u6587\u5DF2\u5931\u6548");
      if (!this.rememberOperation(ownerId, sessionId, operation)) throw new Error("\u751F\u56FE\u62A5\u4EF7\u8BA1\u5212\u5DF2\u53D8\u66F4");
      return structuredClone(operation);
    }).finally(() => {
      if (this.prepareJobs.get(key) === job) this.prepareJobs.delete(key);
    });
    this.prepareJobs.set(key, job);
    return job;
  }
  clear() {
    this.epoch += 1;
    for (const rows of this.referenceUploads.values()) for (const row of rows) URL.revokeObjectURL(row.previewUrl);
    this.referenceUploads.clear();
    this.values.clear();
    this.jobs.clear();
    this.drafts.clear();
    this.operations.clear();
    this.prepareJobs.clear();
    this.pendingReferences.clear();
    for (const listeners2 of this.draftListeners.values()) for (const listener of listeners2) listener();
    this.draftListeners.clear();
  }
};
var generationBootstrapCache = new GenerationBootstrapCache();

// packages/online/reference-image.ts
var MAX_REFERENCE_BYTES = 1e7;
var MAX_REFERENCE_INPUT_BYTES = 5e7;
var REFERENCE_REMAINING_RATIO = 0.3;
function validReferenceFile(file) {
  return file.size > 0 && file.size <= MAX_REFERENCE_INPUT_BYTES && ["image/jpeg", "image/png", "image/webp"].includes(file.type);
}
async function compressReferenceImage(file) {
  if (!validReferenceFile(file)) throw new Error("Choose a JPEG, PNG or WebP image up to 50 MB.");
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("Could not read this image. Choose a valid JPEG, PNG or WebP image.");
  }
  try {
    if (bitmap.width * bitmap.height > 4e7) throw new Error("Image dimensions exceed the pixel limit.");
    const target2 = Math.min(MAX_REFERENCE_BYTES, Math.max(1024, Math.floor(file.size * REFERENCE_REMAINING_RATIO)));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) throw new Error("Image compression is unavailable.");
    let scale = Math.min(1, 4096 / Math.max(bitmap.width, bitmap.height));
    let best;
    for (let attempt = 0; attempt < 9; attempt++) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const encoded = await new Promise((resolve, reject) => canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error("Image compression failed.")),
        "image/webp",
        attempt === 0 ? 0.88 : attempt === 1 ? 0.74 : 0.68
      ));
      if (encoded.type !== "image/webp") throw new Error("This browser cannot compress reference images to WebP.");
      if (!best || encoded.size < best.size) best = encoded;
      if (best.size <= target2) break;
      if (attempt >= 1) scale *= Math.min(0.85, Math.max(0.35, Math.sqrt(target2 / best.size) * 0.92));
    }
    if (!best || best.size > MAX_REFERENCE_BYTES) throw new Error("The compressed image exceeds 10 MB.");
    return new File([best], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp", lastModified: file.lastModified });
  } finally {
    bitmap.close();
  }
}

// plugins/podplo-dsh/src/reference-upload.ts
async function uploadReferenceFile(file, ownerId, sessionId) {
  if (!(file instanceof Blob) || !file.size || file.size > 5e7 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("\u8BF7\u9009\u62E9\u4E0D\u8D85\u8FC7 50 MB \u7684 JPEG\u3001PNG \u6216 WebP \u56FE\u7247\u3002");
  file = await compressReferenceImage(file);
  const globals = globalThis;
  const send = globals.__DSH_FILE_UPLOAD__?.fetch ?? globals.__DSH_TRANSPORT__?.fetch ?? globalThis.fetch;
  const response = await send("api/podplo/upload", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": file.type, "X-Podplo-Upload": encodeURIComponent(JSON.stringify({
      filename: file.name,
      ownerId,
      ...sessionId ? { sessionId } : {}
    })) },
    body: await file.arrayBuffer()
  });
  if (!response.ok) throw new Error(`\u56FE\u7247\u4E0A\u4F20\u8BF7\u6C42\u672A\u5B8C\u6210\uFF08${response.status}\uFF09\u3002`);
  const result = await response.json();
  if (!result?.ok) throw Object.assign(new Error(result?.error?.message || "\u56FE\u7247\u4E0A\u4F20\u672A\u5B8C\u6210\uFF0C\u8BF7\u91CD\u8BD5\u3002"), { code: result?.error?.code });
  return result.value;
}

// plugins/podplo-dsh/src/navigation.ts
var PODPLO_NAVIGATION_STORAGE_KEY = "podplo.native.navigation.v1";
var PODPLO_SECTIONS = ["generation", "gallery", "skills", "assets", "results", "toolbox"];
var PODPLO_NAVIGATION_GROUPS = [
  { id: "create", label: "\u521B\u4F5C", sections: ["generation"] },
  { id: "resources", label: "\u8D44\u6E90", sections: ["gallery", "skills", "assets"] },
  { id: "tools", label: "\u5DE5\u5177", sections: ["results", "toolbox"] }
];
var groupIds = new Set(PODPLO_NAVIGATION_GROUPS.map((group) => group.id));
var sectionIds = new Set(PODPLO_SECTIONS);
var uniqueSections = (value) => Array.isArray(value) ? [...new Set(value.filter((item) => typeof item === "string" && sectionIds.has(item)))] : [];
function defaultPodploNavigationPreferences() {
  return { version: 1, order: [...PODPLO_SECTIONS], pinned: [], hidden: [], collapsedGroups: [], railCollapsed: false, sidebarExpanded: true, lastSection: "gallery" };
}
function normalizePodploNavigationPreferences(value) {
  const defaults = defaultPodploNavigationPreferences();
  if (!value || typeof value !== "object" || Array.isArray(value)) return defaults;
  const input = value;
  const order = uniqueSections(input.order);
  for (const section of PODPLO_SECTIONS) if (!order.includes(section)) order.push(section);
  const pinned = uniqueSections(input.pinned);
  const hidden = uniqueSections(input.hidden);
  const collapsedGroups = Array.isArray(input.collapsedGroups) ? [...new Set(input.collapsedGroups.filter((item) => typeof item === "string" && groupIds.has(item)))] : [];
  const lastSection = typeof input.lastSection === "string" && sectionIds.has(input.lastSection) ? input.lastSection === "generation" ? "gallery" : input.lastSection : defaults.lastSection;
  return { version: 1, order, pinned, hidden, collapsedGroups, railCollapsed: input.railCollapsed === true, sidebarExpanded: input.sidebarExpanded !== false, lastSection };
}
function browserStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return void 0;
  }
}
function readPodploNavigationPreferences(storage = browserStorage()) {
  if (!storage) return defaultPodploNavigationPreferences();
  try {
    const raw = storage.getItem(PODPLO_NAVIGATION_STORAGE_KEY);
    return raw ? normalizePodploNavigationPreferences(JSON.parse(raw)) : defaultPodploNavigationPreferences();
  } catch {
    return defaultPodploNavigationPreferences();
  }
}
function writePodploNavigationPreferences(value, storage = browserStorage()) {
  const normalized = normalizePodploNavigationPreferences(value);
  try {
    storage?.setItem(PODPLO_NAVIGATION_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
  }
  return normalized;
}
function createPodploNavigator(initial = "gallery") {
  let section = sectionIds.has(initial) && initial !== "generation" ? initial : "gallery";
  const listeners2 = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => section,
    subscribe(listener) {
      listeners2.add(listener);
      return () => listeners2.delete(listener);
    },
    navigate(next) {
      if (!sectionIds.has(next) || next === section) return;
      section = next;
      for (const listener of listeners2) listener();
    }
  };
}
function createPodploSessionStore(initial) {
  let sessionId = initial;
  const listeners2 = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => sessionId,
    subscribe(listener) {
      listeners2.add(listener);
      return () => listeners2.delete(listener);
    },
    set(next) {
      if (next === sessionId) return;
      sessionId = next;
      for (const listener of listeners2) listener();
    }
  };
}

// plugins/podplo-dsh/src/workspace.tsx
var import_react8 = require("react");

// plugins/podplo-dsh/src/panels.tsx
var import_react7 = require("react");

// plugins/podplo-dsh/src/generation-panel.tsx
var import_react3 = require("react");

// plugins/podplo-dsh/src/generation-background.ts
var allows = (schema, value) => schema?.type === "string" && (!schema.enum || schema.enum.includes(value));
function transparentControl(properties, model) {
  const parameters = model?.parameterSchema?.properties ?? {};
  const declared = model?.supportsTransparentMode === true || Array.isArray(model?.backgroundModes) && model.backgroundModes.includes("transparent");
  if (model?.supportsTransparentMode === false) return void 0;
  if (allows(properties.background, "transparent") && (declared || allows(parameters.background, "transparent"))) {
    const format = ["png", "webp"].find((value) => allows(properties.output_format, value) && (!parameters.output_format || allows(parameters.output_format, value)));
    return format ? { key: "background", format } : void 0;
  }
  const key = Object.keys(properties).find((key2) => /transparent/i.test(key2) && properties[key2]?.type === "boolean");
  return key && (declared || parameters[key]?.type === "boolean") ? { key } : void 0;
}
function backgroundArgs(properties, model, transparent) {
  const control = transparentControl(properties, model);
  if (!control) {
    if (transparent) throw new Error("\u5F53\u524D\u6A21\u578B\u6216\u670D\u52A1\u7AEF\u5C1A\u672A\u5F00\u653E\u900F\u660E\u80CC\u666F\u53CA PNG/WebP \u53C2\u6570\uFF0C\u8BF7\u5237\u65B0\u80FD\u529B\u6216\u66F4\u6362\u6A21\u578B\u3002");
    return {};
  }
  if (control.key !== "background") return { [control.key]: transparent };
  if (transparent) return { background: "transparent", output_format: control.format };
  return allows(properties.background, "opaque") ? { background: "opaque" } : {};
}

// packages/online/generation-credit-pricing.ts
var object2 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var integer = (v) => Number.isSafeInteger(v) && Number(v) >= 0;
var keys = (v, k) => Object.keys(v).length === k.length && k.every((x) => Object.hasOwn(v, x));
function isGenerationCreditPricingRule(value) {
  if (!object2(value) || !keys(value, ["version", "unit", "maxPromptCharacters", "prices"]) || value.version !== 2 || value.unit !== "credits" || !integer(value.maxPromptCharacters) || !Array.isArray(value.prices) || !value.prices.length) return false;
  const seen = /* @__PURE__ */ new Set();
  return value.prices.every((row) => {
    if (!object2(row) || !keys(row, ["quality", "resolution", "referenceImages", "ecoMode", "webSearch", "imageSearch", "promptBands"]) || !(row.quality === null || typeof row.quality === "string") || typeof row.resolution !== "string" || !row.resolution || !integer(row.referenceImages) || typeof row.ecoMode !== "boolean" || typeof row.webSearch !== "boolean" || typeof row.imageSearch !== "boolean" || !Array.isArray(row.promptBands) || !row.promptBands.length) return false;
    const key = JSON.stringify([row.quality, row.resolution, row.referenceImages, row.ecoMode, row.webSearch, row.imageSearch]);
    if (seen.has(key)) return false;
    seen.add(key);
    let previousStart = -1, previousPrice = -1;
    return row.promptBands.every((band, index) => {
      if (!Array.isArray(band) || band.length !== 2 || !integer(band[0]) || !integer(band[1]) || band[0] > Number(value.maxPromptCharacters) || (index === 0 ? band[0] !== 0 : band[0] <= previousStart) || band[1] <= previousPrice) return false;
      [previousStart, previousPrice] = band;
      return true;
    });
  });
}
function calculateGenerationCreditsFromRule(rule, input) {
  if (!isGenerationCreditPricingRule(rule)) throw new Error("Unsupported public sale price table");
  const references = input.referenceImageCount ?? 0;
  if (!integer(references)) throw new Error("Unsupported reference count");
  const length = Array.from(input.prompt?.trim() ?? "").length;
  if (length > rule.maxPromptCharacters) throw new Error("Prompt exceeds public price coverage");
  const price = rule.prices.find((row) => row.quality === (input.quality ?? null) && row.resolution === input.resolution && row.referenceImages === references && row.ecoMode === !!input.ecoMode && row.webSearch === !!input.webSearch && row.imageSearch === !!input.imageSearch);
  if (!price) throw new Error("Unsupported public sale price options");
  let credits = price.promptBands[0][1];
  for (const [start, amount] of price.promptBands) {
    if (start > length) break;
    credits = amount;
  }
  return credits;
}

// packages/online/generation-credit-rules.json
var generation_credit_rules_default = { schemaVersion: 2, models: [{ key: "gpt-image-1-5", name: "GPT Image 1.5", defaultQuality: "low", defaultResolution: "1K", rule: { version: 2, unit: "credits", maxPromptCharacters: 2e4, prices: [{ quality: "low", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 1], [34, 2], [3562, 3], [7090, 4], [10618, 5], [14146, 6], [17674, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 4], [3244, 5], [6772, 6], [10300, 7], [13828, 8], [17356, 9]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [2926, 7], [6454, 8], [9982, 9], [13510, 10], [17038, 11]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [2611, 9], [6139, 10], [9667, 11], [13195, 12], [16723, 13]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [2293, 11], [5821, 12], [9349, 13], [12877, 14], [16405, 15], [19933, 16]] }, { quality: "low", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [1978, 13], [5506, 14], [9034, 15], [12562, 16], [16090, 17], [19618, 18]] }, { quality: "low", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [1660, 15], [5188, 16], [8716, 17], [12244, 18], [15772, 19], [19300, 20]] }, { quality: "low", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [1342, 17], [4870, 18], [8398, 19], [11926, 20], [15454, 21], [18982, 22]] }, { quality: "low", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1027, 19], [4555, 20], [8083, 21], [11611, 22], [15139, 23], [18667, 24]] }, { quality: "low", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [709, 21], [4237, 22], [7765, 23], [11293, 24], [14821, 25], [18349, 26]] }, { quality: "low", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [394, 23], [3922, 24], [7450, 25], [10978, 26], [14506, 27], [18034, 28]] }, { quality: "low", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [76, 25], [3604, 26], [7132, 27], [10660, 28], [14188, 29], [17716, 30]] }, { quality: "low", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [3286, 28], [6814, 29], [10342, 30], [13870, 31], [17398, 32]] }, { quality: "low", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 1], [34, 2], [3562, 3], [7090, 4], [10618, 5], [14146, 6], [17674, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [2332, 3], [5860, 4], [9388, 5], [12916, 6], [16444, 7], [19972, 8]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1102, 3], [4630, 4], [8158, 5], [11686, 6], [15214, 7], [18742, 8]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [3403, 4], [6931, 5], [10459, 6], [13987, 7], [17515, 8]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [2173, 4], [5701, 5], [9229, 6], [12757, 7], [16285, 8], [19813, 9]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [2515, 7], [6043, 8], [9571, 9], [13099, 10], [16627, 11]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [2200, 9], [5728, 10], [9256, 11], [12784, 12], [16312, 13], [19840, 14]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [1882, 11], [5410, 12], [8938, 13], [12466, 14], [15994, 15], [19522, 16]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [1564, 13], [5092, 14], [8620, 15], [12148, 16], [15676, 17], [19204, 18]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [1249, 15], [4777, 16], [8305, 17], [11833, 18], [15361, 19], [18889, 20]] }, { quality: "medium", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [931, 17], [4459, 18], [7987, 19], [11515, 20], [15043, 21], [18571, 22]] }, { quality: "medium", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [616, 19], [4144, 20], [7672, 21], [11200, 22], [14728, 23], [18256, 24]] }, { quality: "medium", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [298, 21], [3826, 22], [7354, 23], [10882, 24], [14410, 25], [17938, 26]] }, { quality: "medium", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [3508, 24], [7036, 25], [10564, 26], [14092, 27], [17620, 28]] }, { quality: "medium", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [3193, 26], [6721, 27], [10249, 28], [13777, 29], [17305, 30]] }, { quality: "medium", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [2875, 28], [6403, 29], [9931, 30], [13459, 31], [16987, 32]] }, { quality: "medium", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 29], [2560, 30], [6088, 31], [9616, 32], [13144, 33], [16672, 34]] }, { quality: "medium", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [2242, 32], [5770, 33], [9298, 34], [12826, 35], [16354, 36], [19882, 37]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [2515, 7], [6043, 8], [9571, 9], [13099, 10], [16627, 11]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1288, 7], [4816, 8], [8344, 9], [11872, 10], [15400, 11], [18928, 12]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [58, 7], [3586, 8], [7114, 9], [10642, 10], [14170, 11], [17698, 12]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 7], [2356, 8], [5884, 9], [9412, 10], [12940, 11], [16468, 12], [19996, 13]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 7], [1129, 8], [4657, 9], [8185, 10], [11713, 11], [15241, 12], [18769, 13]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [2482, 24], [6010, 25], [9538, 26], [13066, 27], [16594, 28]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [2164, 26], [5692, 27], [9220, 28], [12748, 29], [16276, 30], [19804, 31]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [1846, 28], [5374, 29], [8902, 30], [12430, 31], [15958, 32], [19486, 33]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 29], [1531, 30], [5059, 31], [8587, 32], [12115, 33], [15643, 34], [19171, 35]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [1213, 32], [4741, 33], [8269, 34], [11797, 35], [15325, 36], [18853, 37]] }, { quality: "high", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [898, 34], [4426, 35], [7954, 36], [11482, 37], [15010, 38], [18538, 39]] }, { quality: "high", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 35], [580, 36], [4108, 37], [7636, 38], [11164, 39], [14692, 40], [18220, 41]] }, { quality: "high", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [262, 38], [3790, 39], [7318, 40], [10846, 41], [14374, 42], [17902, 43]] }, { quality: "high", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 40], [3475, 41], [7003, 42], [10531, 43], [14059, 44], [17587, 45]] }, { quality: "high", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 42], [3157, 43], [6685, 44], [10213, 45], [13741, 46], [17269, 47]] }, { quality: "high", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 44], [2842, 45], [6370, 46], [9898, 47], [13426, 48], [16954, 49]] }, { quality: "high", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 46], [2524, 47], [6052, 48], [9580, 49], [13108, 50], [16636, 51]] }, { quality: "high", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 48], [2206, 49], [5734, 50], [9262, 51], [12790, 52], [16318, 53], [19846, 54]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 23], [2482, 24], [6010, 25], [9538, 26], [13066, 27], [16594, 28]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 23], [1252, 24], [4780, 25], [8308, 26], [11836, 27], [15364, 28], [18892, 29]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 23], [22, 24], [3550, 25], [7078, 26], [10606, 27], [14134, 28], [17662, 29]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 24], [2323, 25], [5851, 26], [9379, 27], [12907, 28], [16435, 29], [19963, 30]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 24], [1093, 25], [4621, 26], [8149, 27], [11677, 28], [15205, 29], [18733, 30]] }] } }, { key: "gpt-image-2", name: "GPT Image 2", defaultQuality: "low", defaultResolution: "1K", rule: { version: 2, unit: "credits", maxPromptCharacters: 2e4, prices: [{ quality: "low", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 1], [1765, 2], [5290, 3], [8821, 4], [12346, 5], [15877, 6], [19402, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1447, 4], [4975, 5], [8503, 6], [12031, 7], [15559, 8], [19087, 9]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [1129, 6], [4657, 7], [8185, 8], [11713, 9], [15241, 10], [18769, 11]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [814, 8], [4342, 9], [7870, 10], [11398, 11], [14926, 12], [18454, 13]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [496, 10], [4024, 11], [7552, 12], [11080, 13], [14608, 14], [18136, 15]] }, { quality: "low", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [178, 12], [3706, 13], [7234, 14], [10762, 15], [14290, 16], [17818, 17]] }, { quality: "low", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [3391, 15], [6919, 16], [10447, 17], [13975, 18], [17503, 19]] }, { quality: "low", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [3073, 17], [6601, 18], [10129, 19], [13657, 20], [17185, 21]] }, { quality: "low", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [2758, 19], [6286, 20], [9814, 21], [13342, 22], [16870, 23]] }, { quality: "low", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [2440, 21], [5968, 22], [9496, 23], [13024, 24], [16552, 25]] }, { quality: "low", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [2122, 23], [5650, 24], [9178, 25], [12706, 26], [16234, 27], [19762, 28]] }, { quality: "low", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [1807, 25], [5335, 26], [8863, 27], [12391, 28], [15919, 29], [19447, 30]] }, { quality: "low", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [1489, 27], [5017, 28], [8545, 29], [12073, 30], [15601, 31], [19129, 32]] }, { quality: "low", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 1], [1765, 2], [5290, 3], [8821, 4], [12346, 5], [15877, 6], [19402, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [4063, 3], [7591, 4], [11119, 5], [14647, 6], [18175, 7]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [2833, 3], [6361, 4], [9889, 5], [13417, 6], [16945, 7]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1606, 3], [5134, 4], [8662, 5], [12190, 6], [15718, 7], [19246, 8]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [376, 3], [3904, 4], [7432, 5], [10960, 6], [14488, 7], [18016, 8]] }, { quality: "low", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1672, 3], [5203, 4], [8728, 5], [12259, 6], [15784, 7], [19315, 8]] }, { quality: "low", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 4], [1357, 5], [4885, 6], [8413, 7], [11941, 8], [15469, 9], [18997, 10]] }, { quality: "low", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1039, 7], [4567, 8], [8095, 9], [11623, 10], [15151, 11], [18679, 12]] }, { quality: "low", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [724, 9], [4252, 10], [7780, 11], [11308, 12], [14836, 13], [18364, 14]] }, { quality: "low", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [406, 11], [3934, 12], [7462, 13], [10990, 14], [14518, 15], [18046, 16]] }, { quality: "low", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [88, 13], [3616, 14], [7144, 15], [10672, 16], [14200, 17], [17728, 18]] }, { quality: "low", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [3301, 16], [6829, 17], [10357, 18], [13885, 19], [17413, 20]] }, { quality: "low", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [2983, 18], [6511, 19], [10039, 20], [13567, 21], [17095, 22]] }, { quality: "low", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2668, 20], [6196, 21], [9724, 22], [13252, 23], [16780, 24]] }, { quality: "low", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [2350, 22], [5878, 23], [9406, 24], [12934, 25], [16462, 26], [19990, 27]] }, { quality: "low", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [2032, 24], [5560, 25], [9088, 26], [12616, 27], [16144, 28], [19672, 29]] }, { quality: "low", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [1717, 26], [5245, 27], [8773, 28], [12301, 29], [15829, 30], [19357, 31]] }, { quality: "low", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [1399, 28], [4927, 29], [8455, 30], [11983, 31], [15511, 32], [19039, 33]] }, { quality: "low", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1672, 3], [5203, 4], [8728, 5], [12259, 6], [15784, 7], [19315, 8]] }, { quality: "low", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [445, 3], [3973, 4], [7501, 5], [11029, 6], [14557, 7], [18085, 8]] }, { quality: "low", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [2743, 4], [6271, 5], [9799, 6], [13327, 7], [16855, 8]] }, { quality: "low", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1516, 4], [5044, 5], [8572, 6], [12100, 7], [15628, 8], [19156, 9]] }, { quality: "low", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [286, 4], [3814, 5], [7342, 6], [10870, 7], [14398, 8], [17926, 9]] }, { quality: "low", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 3], [487, 4], [4012, 5], [7543, 6], [11068, 7], [14599, 8], [18124, 9]] }, { quality: "low", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [169, 6], [3697, 7], [7225, 8], [10753, 9], [14281, 10], [17809, 11]] }, { quality: "low", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3379, 9], [6907, 10], [10435, 11], [13963, 12], [17491, 13]] }, { quality: "low", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [3064, 11], [6592, 12], [10120, 13], [13648, 14], [17176, 15]] }, { quality: "low", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [2746, 13], [6274, 14], [9802, 15], [13330, 16], [16858, 17]] }, { quality: "low", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [2428, 15], [5956, 16], [9484, 17], [13012, 18], [16540, 19]] }, { quality: "low", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2113, 17], [5641, 18], [9169, 19], [12697, 20], [16225, 21], [19753, 22]] }, { quality: "low", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1795, 19], [5323, 20], [8851, 21], [12379, 22], [15907, 23], [19435, 24]] }, { quality: "low", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [1480, 21], [5008, 22], [8536, 23], [12064, 24], [15592, 25], [19120, 26]] }, { quality: "low", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [1162, 23], [4690, 24], [8218, 25], [11746, 26], [15274, 27], [18802, 28]] }, { quality: "low", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [844, 25], [4372, 26], [7900, 27], [11428, 28], [14956, 29], [18487, 30]] }, { quality: "low", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [529, 27], [4057, 28], [7585, 29], [11113, 30], [14641, 31], [18169, 32]] }, { quality: "low", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [211, 29], [3739, 30], [7267, 31], [10795, 32], [14323, 33], [17851, 34]] }, { quality: "low", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [487, 4], [4012, 5], [7543, 6], [11068, 7], [14599, 8], [18124, 9]] }, { quality: "low", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [2785, 5], [6313, 6], [9841, 7], [13369, 8], [16897, 9]] }, { quality: "low", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [1555, 5], [5083, 6], [8611, 7], [12139, 8], [15667, 9], [19195, 10]] }, { quality: "low", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [328, 5], [3856, 6], [7384, 7], [10912, 8], [14440, 9], [17968, 10]] }, { quality: "low", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [2626, 6], [6154, 7], [9682, 8], [13210, 9], [16738, 10]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16021, 14], [19546, 15]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [1591, 12], [5119, 13], [8647, 14], [12175, 15], [15703, 16], [19231, 17]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [1273, 14], [4801, 15], [8329, 16], [11857, 17], [15385, 18], [18913, 19]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [958, 16], [4486, 17], [8014, 18], [11542, 19], [15070, 20], [18598, 21]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [640, 18], [4168, 19], [7696, 20], [11224, 21], [14752, 22], [18280, 23]] }, { quality: "medium", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [322, 20], [3850, 21], [7378, 22], [10906, 23], [14434, 24], [17962, 25]] }, { quality: "medium", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [7, 22], [3535, 23], [7063, 24], [10591, 25], [14119, 26], [17647, 27]] }, { quality: "medium", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [3217, 25], [6745, 26], [10273, 27], [13801, 28], [17329, 29]] }, { quality: "medium", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [2902, 27], [6430, 28], [9958, 29], [13486, 30], [17014, 31]] }, { quality: "medium", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [2584, 29], [6112, 30], [9640, 31], [13168, 32], [16696, 33]] }, { quality: "medium", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [2269, 31], [5797, 32], [9322, 33], [12850, 34], [16378, 35], [19906, 36]] }, { quality: "medium", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [1951, 33], [5479, 34], [9007, 35], [12535, 36], [16063, 37], [19591, 38]] }, { quality: "medium", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [1633, 35], [5161, 36], [8689, 37], [12217, 38], [15745, 39], [19273, 40]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16021, 14], [19546, 15]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [679, 10], [4207, 11], [7735, 12], [11263, 13], [14791, 14], [18319, 15]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [2977, 11], [6505, 12], [10033, 13], [13561, 14], [17089, 15]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [1750, 11], [5278, 12], [8806, 13], [12334, 14], [15862, 15], [19390, 16]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [520, 11], [4048, 12], [7576, 13], [11104, 14], [14632, 15], [18160, 16]] }, { quality: "medium", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1042, 19], [4570, 20], [8101, 21], [11626, 22], [15154, 23], [18682, 24]] }, { quality: "medium", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [727, 21], [4255, 22], [7783, 23], [11311, 24], [14839, 25], [18367, 26]] }, { quality: "medium", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [409, 23], [3937, 24], [7465, 25], [10993, 26], [14521, 27], [18049, 28]] }, { quality: "medium", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [94, 25], [3622, 26], [7150, 27], [10678, 28], [14206, 29], [17734, 30]] }, { quality: "medium", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [3304, 28], [6832, 29], [10360, 30], [13888, 31], [17416, 32]] }, { quality: "medium", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 29], [2986, 30], [6514, 31], [10042, 32], [13570, 33], [17098, 34]] }, { quality: "medium", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [2671, 32], [6199, 33], [9727, 34], [13255, 35], [16783, 36]] }, { quality: "medium", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [2353, 34], [5881, 35], [9409, 36], [12937, 37], [16465, 38], [19993, 39]] }, { quality: "medium", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 35], [2038, 36], [5566, 37], [9094, 38], [12622, 39], [16150, 40], [19678, 41]] }, { quality: "medium", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [1720, 38], [5248, 39], [8776, 40], [12304, 41], [15832, 42], [19360, 43]] }, { quality: "medium", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [1402, 40], [4930, 41], [8458, 42], [11986, 43], [15514, 44], [19042, 45]] }, { quality: "medium", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [1087, 42], [4615, 43], [8143, 44], [11671, 45], [15199, 46], [18727, 47]] }, { quality: "medium", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [769, 44], [4297, 45], [7825, 46], [11353, 47], [14881, 48], [18409, 49]] }, { quality: "medium", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1042, 19], [4570, 20], [8101, 21], [11626, 22], [15154, 23], [18682, 24]] }, { quality: "medium", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [3343, 20], [6871, 21], [10399, 22], [13927, 23], [17455, 24]] }, { quality: "medium", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2113, 20], [5641, 21], [9169, 22], [12697, 23], [16225, 24], [19753, 25]] }, { quality: "medium", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [886, 20], [4414, 21], [7942, 22], [11470, 23], [14998, 24], [18526, 25]] }, { quality: "medium", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 20], [3184, 21], [6712, 22], [10240, 23], [13768, 24], [17296, 25]] }, { quality: "medium", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [865, 31], [4393, 32], [7918, 33], [11446, 34], [14974, 35], [18502, 36]] }, { quality: "medium", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [547, 33], [4075, 34], [7603, 35], [11131, 36], [14659, 37], [18187, 38]] }, { quality: "medium", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [229, 35], [3757, 36], [7285, 37], [10813, 38], [14341, 39], [17869, 40]] }, { quality: "medium", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3442, 38], [6970, 39], [10498, 40], [14026, 41], [17554, 42]] }, { quality: "medium", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [3124, 40], [6652, 41], [10180, 42], [13708, 43], [17236, 44]] }, { quality: "medium", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [2806, 42], [6337, 43], [9865, 44], [13390, 45], [16921, 46]] }, { quality: "medium", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [2491, 44], [6019, 45], [9547, 46], [13075, 47], [16603, 48]] }, { quality: "medium", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 45], [2173, 46], [5701, 47], [9229, 48], [12757, 49], [16285, 50], [19813, 51]] }, { quality: "medium", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 47], [1858, 48], [5386, 49], [8914, 50], [12442, 51], [15970, 52], [19498, 53]] }, { quality: "medium", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 49], [1540, 50], [5068, 51], [8596, 52], [12124, 53], [15652, 54], [19180, 55]] }, { quality: "medium", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 51], [1222, 52], [4753, 53], [8278, 54], [11806, 55], [15334, 56], [18862, 57]] }, { quality: "medium", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [907, 54], [4435, 55], [7963, 56], [11491, 57], [15019, 58], [18547, 59]] }, { quality: "medium", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [589, 56], [4117, 57], [7645, 58], [11173, 59], [14701, 60], [18229, 61]] }, { quality: "medium", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 30], [865, 31], [4393, 32], [7918, 33], [11446, 34], [14974, 35], [18502, 36]] }, { quality: "medium", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [3163, 32], [6691, 33], [10219, 34], [13747, 35], [17275, 36]] }, { quality: "medium", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [1933, 32], [5461, 33], [8989, 34], [12517, 35], [16045, 36], [19573, 37]] }, { quality: "medium", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [706, 32], [4234, 33], [7762, 34], [11290, 35], [14818, 36], [18346, 37]] }, { quality: "medium", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 32], [3004, 33], [6532, 34], [10060, 35], [13588, 36], [17116, 37]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 36], [2338, 37], [5866, 38], [9394, 39], [12922, 40], [16450, 41], [19978, 42]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 38], [2023, 39], [5551, 40], [9079, 41], [12607, 42], [16135, 43], [19663, 44]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 40], [1705, 41], [5233, 42], [8761, 43], [12289, 44], [15817, 45], [19345, 46]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 42], [1390, 43], [4918, 44], [8446, 45], [11974, 46], [15502, 47], [19030, 48]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 44], [1072, 45], [4600, 46], [8128, 47], [11656, 48], [15184, 49], [18712, 50]] }, { quality: "high", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 46], [757, 47], [4282, 48], [7810, 49], [11338, 50], [14866, 51], [18394, 52]] }, { quality: "high", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 48], [439, 49], [3967, 50], [7495, 51], [11023, 52], [14551, 53], [18079, 54]] }, { quality: "high", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 50], [121, 51], [3649, 52], [7177, 53], [10705, 54], [14233, 55], [17761, 56]] }, { quality: "high", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [3334, 54], [6862, 55], [10390, 56], [13918, 57], [17446, 58]] }, { quality: "high", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [3016, 56], [6544, 57], [10072, 58], [13600, 59], [17128, 60]] }, { quality: "high", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 57], [2698, 58], [6229, 59], [9754, 60], [13282, 61], [16810, 62]] }, { quality: "high", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 59], [2383, 60], [5911, 61], [9439, 62], [12967, 63], [16495, 64]] }, { quality: "high", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 61], [2065, 62], [5593, 63], [9121, 64], [12649, 65], [16177, 66], [19705, 67]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 36], [2338, 37], [5866, 38], [9394, 39], [12922, 40], [16450, 41], [19978, 42]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 36], [1111, 37], [4639, 38], [8167, 39], [11695, 40], [15223, 41], [18751, 42]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3409, 38], [6937, 39], [10465, 40], [13993, 41], [17521, 42]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [2182, 38], [5710, 39], [9238, 40], [12766, 41], [16294, 42], [19822, 43]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [952, 38], [4480, 39], [8008, 40], [11536, 41], [15064, 42], [18592, 43]] }, { quality: "high", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 73], [2410, 74], [5938, 75], [9466, 76], [12994, 77], [16522, 78]] }, { quality: "high", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 75], [2095, 76], [5623, 77], [9151, 78], [12679, 79], [16207, 80], [19735, 81]] }, { quality: "high", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 77], [1777, 78], [5305, 79], [8833, 80], [12361, 81], [15889, 82], [19417, 83]] }, { quality: "high", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 79], [1462, 80], [4990, 81], [8518, 82], [12046, 83], [15574, 84], [19102, 85]] }, { quality: "high", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 81], [1144, 82], [4672, 83], [8200, 84], [11728, 85], [15256, 86], [18784, 87]] }, { quality: "high", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 83], [826, 84], [4354, 85], [7882, 86], [11410, 87], [14938, 88], [18466, 89]] }, { quality: "high", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 85], [511, 86], [4039, 87], [7567, 88], [11095, 89], [14623, 90], [18151, 91]] }, { quality: "high", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 87], [193, 88], [3721, 89], [7249, 90], [10777, 91], [14305, 92], [17833, 93]] }, { quality: "high", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 90], [3406, 91], [6934, 92], [10462, 93], [13990, 94], [17518, 95]] }, { quality: "high", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 92], [3088, 93], [6616, 94], [10144, 95], [13672, 96], [17200, 97]] }, { quality: "high", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 94], [2770, 95], [6298, 96], [9826, 97], [13354, 98], [16885, 99]] }, { quality: "high", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 96], [2455, 97], [5983, 98], [9511, 99], [13039, 100], [16567, 101]] }, { quality: "high", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 98], [2137, 99], [5665, 100], [9193, 101], [12721, 102], [16249, 103], [19777, 104]] }, { quality: "high", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 73], [2410, 74], [5938, 75], [9466, 76], [12994, 77], [16522, 78]] }, { quality: "high", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 73], [1183, 74], [4711, 75], [8239, 76], [11767, 77], [15295, 78], [18823, 79]] }, { quality: "high", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [3481, 75], [7009, 76], [10537, 77], [14065, 78], [17593, 79]] }, { quality: "high", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [2254, 75], [5782, 76], [9310, 77], [12838, 78], [16366, 79], [19894, 80]] }, { quality: "high", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [1024, 75], [4552, 76], [8080, 77], [11608, 78], [15136, 79], [18664, 80]] }, { quality: "high", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 121], [1708, 122], [5236, 123], [8764, 124], [12292, 125], [15823, 126], [19348, 127]] }, { quality: "high", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 123], [1393, 124], [4921, 125], [8449, 126], [11977, 127], [15505, 128], [19033, 129]] }, { quality: "high", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 125], [1075, 126], [4603, 127], [8131, 128], [11659, 129], [15187, 130], [18715, 131]] }, { quality: "high", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 127], [760, 128], [4288, 129], [7816, 130], [11344, 131], [14872, 132], [18400, 133]] }, { quality: "high", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 129], [442, 130], [3970, 131], [7498, 132], [11026, 133], [14554, 134], [18082, 135]] }, { quality: "high", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 131], [124, 132], [3652, 133], [7180, 134], [10708, 135], [14236, 136], [17764, 137]] }, { quality: "high", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 134], [3337, 135], [6865, 136], [10393, 137], [13921, 138], [17449, 139]] }, { quality: "high", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 136], [3019, 137], [6547, 138], [10075, 139], [13603, 140], [17131, 141]] }, { quality: "high", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 138], [2704, 139], [6232, 140], [9760, 141], [13288, 142], [16816, 143]] }, { quality: "high", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 140], [2386, 141], [5914, 142], [9442, 143], [12970, 144], [16498, 145]] }, { quality: "high", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 142], [2068, 143], [5596, 144], [9124, 145], [12652, 146], [16180, 147], [19708, 148]] }, { quality: "high", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 144], [1753, 145], [5281, 146], [8809, 147], [12337, 148], [15865, 149], [19393, 150]] }, { quality: "high", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 146], [1435, 147], [4963, 148], [8491, 149], [12019, 150], [15547, 151], [19075, 152]] }, { quality: "high", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 121], [1708, 122], [5236, 123], [8764, 124], [12292, 125], [15823, 126], [19348, 127]] }, { quality: "high", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 121], [481, 122], [4009, 123], [7537, 124], [11065, 125], [14593, 126], [18121, 127]] }, { quality: "high", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [2779, 123], [6307, 124], [9835, 125], [13363, 126], [16891, 127]] }, { quality: "high", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [1552, 123], [5080, 124], [8608, 125], [12136, 126], [15664, 127], [19192, 128]] }, { quality: "high", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [322, 123], [3850, 124], [7378, 125], [10906, 126], [14434, 127], [17962, 128]] }] } }, { key: "gpt-image-2-5-flare", name: "GPT Image 2.5 Flare", defaultQuality: "low", defaultResolution: "1K", rule: { version: 2, unit: "credits", maxPromptCharacters: 2e4, prices: [{ quality: "low", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 1], [1765, 2], [5290, 3], [8821, 4], [12346, 5], [15877, 6], [19402, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1447, 4], [4975, 5], [8503, 6], [12031, 7], [15559, 8], [19087, 9]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [1129, 6], [4657, 7], [8185, 8], [11713, 9], [15241, 10], [18769, 11]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [814, 8], [4342, 9], [7870, 10], [11398, 11], [14926, 12], [18454, 13]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [496, 10], [4024, 11], [7552, 12], [11080, 13], [14608, 14], [18136, 15]] }, { quality: "low", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [178, 12], [3706, 13], [7234, 14], [10762, 15], [14290, 16], [17818, 17]] }, { quality: "low", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [3391, 15], [6919, 16], [10447, 17], [13975, 18], [17503, 19]] }, { quality: "low", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [3073, 17], [6601, 18], [10129, 19], [13657, 20], [17185, 21]] }, { quality: "low", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [2758, 19], [6286, 20], [9814, 21], [13342, 22], [16870, 23]] }, { quality: "low", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [2440, 21], [5968, 22], [9496, 23], [13024, 24], [16552, 25]] }, { quality: "low", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [2122, 23], [5650, 24], [9178, 25], [12706, 26], [16234, 27], [19762, 28]] }, { quality: "low", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [1807, 25], [5335, 26], [8863, 27], [12391, 28], [15919, 29], [19447, 30]] }, { quality: "low", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [1489, 27], [5017, 28], [8545, 29], [12073, 30], [15601, 31], [19129, 32]] }, { quality: "low", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 1], [1765, 2], [5290, 3], [8821, 4], [12346, 5], [15877, 6], [19402, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [4063, 3], [7591, 4], [11119, 5], [14647, 6], [18175, 7]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [2833, 3], [6361, 4], [9889, 5], [13417, 6], [16945, 7]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1606, 3], [5134, 4], [8662, 5], [12190, 6], [15718, 7], [19246, 8]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [376, 3], [3904, 4], [7432, 5], [10960, 6], [14488, 7], [18016, 8]] }, { quality: "low", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1672, 3], [5203, 4], [8728, 5], [12259, 6], [15784, 7], [19315, 8]] }, { quality: "low", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 4], [1357, 5], [4885, 6], [8413, 7], [11941, 8], [15469, 9], [18997, 10]] }, { quality: "low", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1039, 7], [4567, 8], [8095, 9], [11623, 10], [15151, 11], [18679, 12]] }, { quality: "low", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [724, 9], [4252, 10], [7780, 11], [11308, 12], [14836, 13], [18364, 14]] }, { quality: "low", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [406, 11], [3934, 12], [7462, 13], [10990, 14], [14518, 15], [18046, 16]] }, { quality: "low", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [88, 13], [3616, 14], [7144, 15], [10672, 16], [14200, 17], [17728, 18]] }, { quality: "low", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [3301, 16], [6829, 17], [10357, 18], [13885, 19], [17413, 20]] }, { quality: "low", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [2983, 18], [6511, 19], [10039, 20], [13567, 21], [17095, 22]] }, { quality: "low", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2668, 20], [6196, 21], [9724, 22], [13252, 23], [16780, 24]] }, { quality: "low", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [2350, 22], [5878, 23], [9406, 24], [12934, 25], [16462, 26], [19990, 27]] }, { quality: "low", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [2032, 24], [5560, 25], [9088, 26], [12616, 27], [16144, 28], [19672, 29]] }, { quality: "low", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [1717, 26], [5245, 27], [8773, 28], [12301, 29], [15829, 30], [19357, 31]] }, { quality: "low", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [1399, 28], [4927, 29], [8455, 30], [11983, 31], [15511, 32], [19039, 33]] }, { quality: "low", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1672, 3], [5203, 4], [8728, 5], [12259, 6], [15784, 7], [19315, 8]] }, { quality: "low", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [445, 3], [3973, 4], [7501, 5], [11029, 6], [14557, 7], [18085, 8]] }, { quality: "low", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [2743, 4], [6271, 5], [9799, 6], [13327, 7], [16855, 8]] }, { quality: "low", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1516, 4], [5044, 5], [8572, 6], [12100, 7], [15628, 8], [19156, 9]] }, { quality: "low", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [286, 4], [3814, 5], [7342, 6], [10870, 7], [14398, 8], [17926, 9]] }, { quality: "low", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 3], [487, 4], [4012, 5], [7543, 6], [11068, 7], [14599, 8], [18124, 9]] }, { quality: "low", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [169, 6], [3697, 7], [7225, 8], [10753, 9], [14281, 10], [17809, 11]] }, { quality: "low", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3379, 9], [6907, 10], [10435, 11], [13963, 12], [17491, 13]] }, { quality: "low", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [3064, 11], [6592, 12], [10120, 13], [13648, 14], [17176, 15]] }, { quality: "low", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [2746, 13], [6274, 14], [9802, 15], [13330, 16], [16858, 17]] }, { quality: "low", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [2428, 15], [5956, 16], [9484, 17], [13012, 18], [16540, 19]] }, { quality: "low", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2113, 17], [5641, 18], [9169, 19], [12697, 20], [16225, 21], [19753, 22]] }, { quality: "low", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1795, 19], [5323, 20], [8851, 21], [12379, 22], [15907, 23], [19435, 24]] }, { quality: "low", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [1480, 21], [5008, 22], [8536, 23], [12064, 24], [15592, 25], [19120, 26]] }, { quality: "low", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [1162, 23], [4690, 24], [8218, 25], [11746, 26], [15274, 27], [18802, 28]] }, { quality: "low", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [844, 25], [4372, 26], [7900, 27], [11428, 28], [14956, 29], [18487, 30]] }, { quality: "low", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [529, 27], [4057, 28], [7585, 29], [11113, 30], [14641, 31], [18169, 32]] }, { quality: "low", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [211, 29], [3739, 30], [7267, 31], [10795, 32], [14323, 33], [17851, 34]] }, { quality: "low", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [487, 4], [4012, 5], [7543, 6], [11068, 7], [14599, 8], [18124, 9]] }, { quality: "low", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [2785, 5], [6313, 6], [9841, 7], [13369, 8], [16897, 9]] }, { quality: "low", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [1555, 5], [5083, 6], [8611, 7], [12139, 8], [15667, 9], [19195, 10]] }, { quality: "low", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [328, 5], [3856, 6], [7384, 7], [10912, 8], [14440, 9], [17968, 10]] }, { quality: "low", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [2626, 6], [6154, 7], [9682, 8], [13210, 9], [16738, 10]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 2], [916, 3], [4447, 4], [7972, 5], [11500, 6], [15028, 7], [18559, 8]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 4], [601, 5], [4129, 6], [7657, 7], [11185, 8], [14713, 9], [18241, 10]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [283, 7], [3811, 8], [7339, 9], [10867, 10], [14395, 11], [17923, 12]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [3496, 10], [7024, 11], [10552, 12], [14080, 13], [17608, 14]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [3178, 12], [6706, 13], [10234, 14], [13762, 15], [17290, 16]] }, { quality: "medium", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [2860, 14], [6388, 15], [9916, 16], [13444, 17], [16972, 18]] }, { quality: "medium", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [2545, 16], [6073, 17], [9601, 18], [13129, 19], [16657, 20]] }, { quality: "medium", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [2227, 18], [5755, 19], [9283, 20], [12811, 21], [16339, 22], [19867, 23]] }, { quality: "medium", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [1912, 20], [5440, 21], [8968, 22], [12496, 23], [16024, 24], [19552, 25]] }, { quality: "medium", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [1594, 22], [5122, 23], [8650, 24], [12178, 25], [15706, 26], [19234, 27]] }, { quality: "medium", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [1276, 24], [4804, 25], [8332, 26], [11860, 27], [15388, 28], [18916, 29]] }, { quality: "medium", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [961, 26], [4489, 27], [8017, 28], [11545, 29], [15073, 30], [18601, 31]] }, { quality: "medium", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [643, 28], [4171, 29], [7699, 30], [11227, 31], [14755, 32], [18283, 33]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [916, 3], [4447, 4], [7972, 5], [11500, 6], [15028, 7], [18559, 8]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [3217, 4], [6745, 5], [10273, 6], [13801, 7], [17329, 8]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1987, 4], [5515, 5], [9043, 6], [12571, 7], [16099, 8], [19627, 9]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [760, 4], [4288, 5], [7816, 6], [11344, 7], [14872, 8], [18400, 9]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [3058, 5], [6586, 6], [10114, 7], [13642, 8], [17170, 9]] }, { quality: "medium", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [3349, 6], [6874, 7], [10405, 8], [13930, 9], [17458, 10]] }, { quality: "medium", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [3031, 8], [6559, 9], [10087, 10], [13615, 11], [17143, 12]] }, { quality: "medium", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [2713, 10], [6241, 11], [9769, 12], [13297, 13], [16825, 14]] }, { quality: "medium", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [2398, 12], [5926, 13], [9454, 14], [12982, 15], [16510, 16]] }, { quality: "medium", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [2080, 14], [5608, 15], [9136, 16], [12664, 17], [16192, 18], [19720, 19]] }, { quality: "medium", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [1762, 16], [5290, 17], [8818, 18], [12346, 19], [15874, 20], [19405, 21]] }, { quality: "medium", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [1447, 18], [4975, 19], [8503, 20], [12031, 21], [15559, 22], [19087, 23]] }, { quality: "medium", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [1129, 20], [4657, 21], [8185, 22], [11713, 23], [15241, 24], [18769, 25]] }, { quality: "medium", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [814, 22], [4342, 23], [7870, 24], [11398, 25], [14926, 26], [18454, 27]] }, { quality: "medium", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [496, 24], [4024, 25], [7552, 26], [11080, 27], [14608, 28], [18136, 29]] }, { quality: "medium", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [178, 26], [3706, 27], [7237, 28], [10765, 29], [14293, 30], [17821, 31]] }, { quality: "medium", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [3391, 29], [6919, 30], [10447, 31], [13975, 32], [17503, 33]] }, { quality: "medium", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [3073, 31], [6601, 32], [10129, 33], [13657, 34], [17185, 35]] }, { quality: "medium", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [3349, 6], [6874, 7], [10405, 8], [13930, 9], [17458, 10]] }, { quality: "medium", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [2119, 6], [5647, 7], [9175, 8], [12703, 9], [16231, 10], [19759, 11]] }, { quality: "medium", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [889, 6], [4417, 7], [7945, 8], [11473, 9], [15001, 10], [18529, 11]] }, { quality: "medium", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [3190, 7], [6718, 8], [10246, 9], [13774, 10], [17302, 11]] }, { quality: "medium", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1960, 7], [5488, 8], [9016, 9], [12544, 10], [16072, 11], [19600, 12]] }, { quality: "medium", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3292, 9], [6823, 10], [10348, 11], [13876, 12], [17407, 13]] }, { quality: "medium", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [2977, 11], [6505, 12], [10033, 13], [13561, 14], [17089, 15]] }, { quality: "medium", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [2659, 13], [6187, 14], [9715, 15], [13243, 16], [16771, 17]] }, { quality: "medium", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [2344, 15], [5872, 16], [9400, 17], [12928, 18], [16456, 19], [19984, 20]] }, { quality: "medium", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2026, 17], [5554, 18], [9082, 19], [12610, 20], [16138, 21], [19666, 22]] }, { quality: "medium", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1708, 19], [5236, 20], [8767, 21], [12292, 22], [15820, 23], [19348, 24]] }, { quality: "medium", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [1393, 21], [4921, 22], [8449, 23], [11977, 24], [15505, 25], [19033, 26]] }, { quality: "medium", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [1075, 23], [4603, 24], [8131, 25], [11659, 26], [15187, 27], [18715, 28]] }, { quality: "medium", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [760, 25], [4288, 26], [7816, 27], [11344, 28], [14872, 29], [18400, 30]] }, { quality: "medium", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [442, 27], [3970, 28], [7498, 29], [11026, 30], [14554, 31], [18082, 32]] }, { quality: "medium", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [127, 29], [3655, 30], [7183, 31], [10711, 32], [14236, 33], [17764, 34]] }, { quality: "medium", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [3337, 32], [6865, 33], [10393, 34], [13921, 35], [17449, 36]] }, { quality: "medium", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [3019, 34], [6547, 35], [10075, 36], [13603, 37], [17131, 38]] }, { quality: "medium", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3292, 9], [6823, 10], [10348, 11], [13876, 12], [17407, 13]] }, { quality: "medium", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [2065, 9], [5593, 10], [9121, 11], [12649, 12], [16177, 13], [19705, 14]] }, { quality: "medium", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [835, 9], [4363, 10], [7891, 11], [11419, 12], [14947, 13], [18475, 14]] }, { quality: "medium", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [3136, 10], [6664, 11], [10192, 12], [13720, 13], [17248, 14]] }, { quality: "medium", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16018, 14], [19546, 15]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16021, 14], [19546, 15]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [1591, 12], [5119, 13], [8647, 14], [12175, 15], [15703, 16], [19231, 17]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [1273, 14], [4801, 15], [8329, 16], [11857, 17], [15385, 18], [18913, 19]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [958, 16], [4486, 17], [8014, 18], [11542, 19], [15070, 20], [18598, 21]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [640, 18], [4168, 19], [7696, 20], [11224, 21], [14752, 22], [18280, 23]] }, { quality: "high", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [322, 20], [3850, 21], [7378, 22], [10906, 23], [14434, 24], [17962, 25]] }, { quality: "high", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [7, 22], [3535, 23], [7063, 24], [10591, 25], [14119, 26], [17647, 27]] }, { quality: "high", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [3217, 25], [6745, 26], [10273, 27], [13801, 28], [17329, 29]] }, { quality: "high", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [2902, 27], [6430, 28], [9958, 29], [13486, 30], [17014, 31]] }, { quality: "high", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [2584, 29], [6112, 30], [9640, 31], [13168, 32], [16696, 33]] }, { quality: "high", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [2269, 31], [5797, 32], [9322, 33], [12850, 34], [16378, 35], [19906, 36]] }, { quality: "high", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [1951, 33], [5479, 34], [9007, 35], [12535, 36], [16063, 37], [19591, 38]] }, { quality: "high", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [1633, 35], [5161, 36], [8689, 37], [12217, 38], [15745, 39], [19273, 40]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16021, 14], [19546, 15]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [679, 10], [4207, 11], [7735, 12], [11263, 13], [14791, 14], [18319, 15]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [2977, 11], [6505, 12], [10033, 13], [13561, 14], [17089, 15]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [1750, 11], [5278, 12], [8806, 13], [12334, 14], [15862, 15], [19390, 16]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [520, 11], [4048, 12], [7576, 13], [11104, 14], [14632, 15], [18160, 16]] }, { quality: "high", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1042, 19], [4570, 20], [8101, 21], [11626, 22], [15154, 23], [18682, 24]] }, { quality: "high", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [727, 21], [4255, 22], [7783, 23], [11311, 24], [14839, 25], [18367, 26]] }, { quality: "high", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [409, 23], [3937, 24], [7465, 25], [10993, 26], [14521, 27], [18049, 28]] }, { quality: "high", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [94, 25], [3622, 26], [7150, 27], [10678, 28], [14206, 29], [17734, 30]] }, { quality: "high", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [3304, 28], [6832, 29], [10360, 30], [13888, 31], [17416, 32]] }, { quality: "high", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 29], [2986, 30], [6514, 31], [10042, 32], [13570, 33], [17098, 34]] }, { quality: "high", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [2671, 32], [6199, 33], [9727, 34], [13255, 35], [16783, 36]] }, { quality: "high", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [2353, 34], [5881, 35], [9409, 36], [12937, 37], [16465, 38], [19993, 39]] }, { quality: "high", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 35], [2038, 36], [5566, 37], [9094, 38], [12622, 39], [16150, 40], [19678, 41]] }, { quality: "high", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [1720, 38], [5248, 39], [8776, 40], [12304, 41], [15832, 42], [19360, 43]] }, { quality: "high", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [1402, 40], [4930, 41], [8458, 42], [11986, 43], [15514, 44], [19042, 45]] }, { quality: "high", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [1087, 42], [4615, 43], [8143, 44], [11671, 45], [15199, 46], [18727, 47]] }, { quality: "high", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [769, 44], [4297, 45], [7825, 46], [11353, 47], [14881, 48], [18409, 49]] }, { quality: "high", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1042, 19], [4570, 20], [8101, 21], [11626, 22], [15154, 23], [18682, 24]] }, { quality: "high", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [3343, 20], [6871, 21], [10399, 22], [13927, 23], [17455, 24]] }, { quality: "high", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2113, 20], [5641, 21], [9169, 22], [12697, 23], [16225, 24], [19753, 25]] }, { quality: "high", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [886, 20], [4414, 21], [7942, 22], [11470, 23], [14998, 24], [18526, 25]] }, { quality: "high", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 20], [3184, 21], [6712, 22], [10240, 23], [13768, 24], [17296, 25]] }, { quality: "high", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [865, 31], [4393, 32], [7918, 33], [11446, 34], [14974, 35], [18502, 36]] }, { quality: "high", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [547, 33], [4075, 34], [7603, 35], [11131, 36], [14659, 37], [18187, 38]] }, { quality: "high", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [229, 35], [3757, 36], [7285, 37], [10813, 38], [14341, 39], [17869, 40]] }, { quality: "high", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3442, 38], [6970, 39], [10498, 40], [14026, 41], [17554, 42]] }, { quality: "high", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [3124, 40], [6652, 41], [10180, 42], [13708, 43], [17236, 44]] }, { quality: "high", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [2806, 42], [6337, 43], [9865, 44], [13390, 45], [16921, 46]] }, { quality: "high", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [2491, 44], [6019, 45], [9547, 46], [13075, 47], [16603, 48]] }, { quality: "high", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 45], [2173, 46], [5701, 47], [9229, 48], [12757, 49], [16285, 50], [19813, 51]] }, { quality: "high", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 47], [1858, 48], [5386, 49], [8914, 50], [12442, 51], [15970, 52], [19498, 53]] }, { quality: "high", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 49], [1540, 50], [5068, 51], [8596, 52], [12124, 53], [15652, 54], [19180, 55]] }, { quality: "high", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 51], [1222, 52], [4753, 53], [8278, 54], [11806, 55], [15334, 56], [18862, 57]] }, { quality: "high", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [907, 54], [4435, 55], [7963, 56], [11491, 57], [15019, 58], [18547, 59]] }, { quality: "high", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [589, 56], [4117, 57], [7645, 58], [11173, 59], [14701, 60], [18229, 61]] }, { quality: "high", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 30], [865, 31], [4393, 32], [7918, 33], [11446, 34], [14974, 35], [18502, 36]] }, { quality: "high", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [3163, 32], [6691, 33], [10219, 34], [13747, 35], [17275, 36]] }, { quality: "high", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [1933, 32], [5461, 33], [8989, 34], [12517, 35], [16045, 36], [19573, 37]] }, { quality: "high", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [706, 32], [4234, 33], [7762, 34], [11290, 35], [14818, 36], [18346, 37]] }, { quality: "high", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 32], [3004, 33], [6532, 34], [10060, 35], [13588, 36], [17116, 37]] }, { quality: "xhigh", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2014, 17], [5542, 18], [9070, 19], [12598, 20], [16129, 21], [19654, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1699, 19], [5227, 20], [8755, 21], [12283, 22], [15811, 23], [19339, 24]] }, { quality: "xhigh", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [1381, 21], [4909, 22], [8437, 23], [11965, 24], [15493, 25], [19021, 26]] }, { quality: "xhigh", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [1066, 23], [4594, 24], [8122, 25], [11650, 26], [15178, 27], [18706, 28]] }, { quality: "xhigh", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [748, 25], [4276, 26], [7804, 27], [11332, 28], [14860, 29], [18388, 30]] }, { quality: "xhigh", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [430, 27], [3958, 28], [7486, 29], [11014, 30], [14542, 31], [18070, 32]] }, { quality: "xhigh", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [115, 29], [3643, 30], [7171, 31], [10699, 32], [14227, 33], [17755, 34]] }, { quality: "xhigh", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [3325, 32], [6853, 33], [10381, 34], [13909, 35], [17437, 36]] }, { quality: "xhigh", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [3010, 34], [6538, 35], [10066, 36], [13594, 37], [17122, 38]] }, { quality: "xhigh", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 35], [2692, 36], [6220, 37], [9748, 38], [13276, 39], [16804, 40]] }, { quality: "xhigh", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [2374, 38], [5902, 39], [9430, 40], [12958, 41], [16486, 42]] }, { quality: "xhigh", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [2059, 40], [5587, 41], [9115, 42], [12643, 43], [16171, 44], [19699, 45]] }, { quality: "xhigh", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [1741, 42], [5269, 43], [8797, 44], [12325, 45], [15853, 46], [19381, 47]] }, { quality: "xhigh", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2014, 17], [5542, 18], [9070, 19], [12598, 20], [16129, 21], [19654, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 16], [787, 17], [4315, 18], [7843, 19], [11371, 20], [14899, 21], [18427, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 17], [3085, 18], [6613, 19], [10141, 20], [13669, 21], [17197, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 17], [1858, 18], [5386, 19], [8914, 20], [12442, 21], [15970, 22], [19498, 23]] }, { quality: "xhigh", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 17], [628, 18], [4156, 19], [7684, 20], [11212, 21], [14740, 22], [18268, 23]] }, { quality: "xhigh", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [484, 33], [4012, 34], [7540, 35], [11068, 36], [14596, 37], [18124, 38]] }, { quality: "xhigh", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [169, 35], [3697, 36], [7225, 37], [10753, 38], [14281, 39], [17809, 40]] }, { quality: "xhigh", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3379, 38], [6907, 39], [10435, 40], [13963, 41], [17491, 42]] }, { quality: "xhigh", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [3064, 40], [6592, 41], [10120, 42], [13648, 43], [17176, 44]] }, { quality: "xhigh", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [2746, 42], [6274, 43], [9802, 44], [13330, 45], [16858, 46]] }, { quality: "xhigh", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [2428, 44], [5956, 45], [9484, 46], [13015, 47], [16540, 48]] }, { quality: "xhigh", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 45], [2113, 46], [5641, 47], [9169, 48], [12697, 49], [16225, 50], [19753, 51]] }, { quality: "xhigh", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 47], [1795, 48], [5323, 49], [8851, 50], [12379, 51], [15907, 52], [19435, 53]] }, { quality: "xhigh", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 49], [1480, 50], [5008, 51], [8536, 52], [12064, 53], [15592, 54], [19120, 55]] }, { quality: "xhigh", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 51], [1162, 52], [4690, 53], [8218, 54], [11746, 55], [15274, 56], [18802, 57]] }, { quality: "xhigh", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [844, 54], [4372, 55], [7900, 56], [11428, 57], [14956, 58], [18487, 59]] }, { quality: "xhigh", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [529, 56], [4057, 57], [7585, 58], [11113, 59], [14641, 60], [18169, 61]] }, { quality: "xhigh", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 57], [211, 58], [3739, 59], [7267, 60], [10795, 61], [14323, 62], [17851, 63]] }, { quality: "xhigh", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 32], [484, 33], [4012, 34], [7540, 35], [11068, 36], [14596, 37], [18124, 38]] }, { quality: "xhigh", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 33], [2785, 34], [6313, 35], [9841, 36], [13369, 37], [16897, 38]] }, { quality: "xhigh", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 33], [1555, 34], [5083, 35], [8611, 36], [12139, 37], [15667, 38], [19195, 39]] }, { quality: "xhigh", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 33], [328, 34], [3856, 35], [7384, 36], [10912, 37], [14440, 38], [17968, 39]] }, { quality: "xhigh", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 34], [2626, 35], [6154, 36], [9682, 37], [13210, 38], [16738, 39]] }, { quality: "xhigh", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 54], [2518, 55], [6046, 56], [9574, 57], [13102, 58], [16633, 59]] }, { quality: "xhigh", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 56], [2203, 57], [5731, 58], [9259, 59], [12787, 60], [16315, 61], [19843, 62]] }, { quality: "xhigh", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 58], [1885, 59], [5413, 60], [8941, 61], [12469, 62], [15997, 63], [19525, 64]] }, { quality: "xhigh", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 60], [1570, 61], [5098, 62], [8626, 63], [12154, 64], [15682, 65], [19210, 66]] }, { quality: "xhigh", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 62], [1252, 63], [4780, 64], [8308, 65], [11836, 66], [15364, 67], [18892, 68]] }, { quality: "xhigh", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 64], [934, 65], [4462, 66], [7990, 67], [11518, 68], [15046, 69], [18574, 70]] }, { quality: "xhigh", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 66], [619, 67], [4147, 68], [7675, 69], [11203, 70], [14731, 71], [18259, 72]] }, { quality: "xhigh", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 68], [301, 69], [3829, 70], [7357, 71], [10885, 72], [14413, 73], [17941, 74]] }, { quality: "xhigh", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 71], [3514, 72], [7042, 73], [10570, 74], [14098, 75], [17626, 76]] }, { quality: "xhigh", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 73], [3196, 74], [6724, 75], [10252, 76], [13780, 77], [17308, 78]] }, { quality: "xhigh", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 75], [2878, 76], [6406, 77], [9934, 78], [13462, 79], [16990, 80]] }, { quality: "xhigh", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 77], [2563, 78], [6091, 79], [9619, 80], [13147, 81], [16675, 82]] }, { quality: "xhigh", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 79], [2245, 80], [5773, 81], [9301, 82], [12829, 83], [16357, 84], [19885, 85]] }, { quality: "xhigh", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 54], [2518, 55], [6046, 56], [9574, 57], [13102, 58], [16633, 59]] }, { quality: "xhigh", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 54], [1291, 55], [4819, 56], [8347, 57], [11875, 58], [15403, 59], [18931, 60]] }, { quality: "xhigh", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 54], [61, 55], [3589, 56], [7117, 57], [10645, 58], [14173, 59], [17701, 60]] }, { quality: "xhigh", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 55], [2362, 56], [5890, 57], [9418, 58], [12946, 59], [16474, 60]] }, { quality: "xhigh", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 55], [1132, 56], [4660, 57], [8188, 58], [11716, 59], [15244, 60], [18772, 61]] }, { quality: "max", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 36], [2338, 37], [5866, 38], [9394, 39], [12922, 40], [16450, 41], [19978, 42]] }, { quality: "max", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 38], [2023, 39], [5551, 40], [9079, 41], [12607, 42], [16135, 43], [19663, 44]] }, { quality: "max", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 40], [1705, 41], [5233, 42], [8761, 43], [12289, 44], [15817, 45], [19345, 46]] }, { quality: "max", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 42], [1390, 43], [4918, 44], [8446, 45], [11974, 46], [15502, 47], [19030, 48]] }, { quality: "max", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 44], [1072, 45], [4600, 46], [8128, 47], [11656, 48], [15184, 49], [18712, 50]] }, { quality: "max", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 46], [757, 47], [4282, 48], [7810, 49], [11338, 50], [14866, 51], [18394, 52]] }, { quality: "max", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 48], [439, 49], [3967, 50], [7495, 51], [11023, 52], [14551, 53], [18079, 54]] }, { quality: "max", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 50], [121, 51], [3649, 52], [7177, 53], [10705, 54], [14233, 55], [17761, 56]] }, { quality: "max", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [3334, 54], [6862, 55], [10390, 56], [13918, 57], [17446, 58]] }, { quality: "max", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [3016, 56], [6544, 57], [10072, 58], [13600, 59], [17128, 60]] }, { quality: "max", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 57], [2698, 58], [6229, 59], [9754, 60], [13282, 61], [16810, 62]] }, { quality: "max", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 59], [2383, 60], [5911, 61], [9439, 62], [12967, 63], [16495, 64]] }, { quality: "max", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 61], [2065, 62], [5593, 63], [9121, 64], [12649, 65], [16177, 66], [19705, 67]] }, { quality: "max", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 36], [2338, 37], [5866, 38], [9394, 39], [12922, 40], [16450, 41], [19978, 42]] }, { quality: "max", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 36], [1111, 37], [4639, 38], [8167, 39], [11695, 40], [15223, 41], [18751, 42]] }, { quality: "max", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3409, 38], [6937, 39], [10465, 40], [13993, 41], [17521, 42]] }, { quality: "max", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [2182, 38], [5710, 39], [9238, 40], [12766, 41], [16294, 42], [19822, 43]] }, { quality: "max", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [952, 38], [4480, 39], [8008, 40], [11536, 41], [15064, 42], [18592, 43]] }, { quality: "max", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 73], [2410, 74], [5938, 75], [9466, 76], [12994, 77], [16522, 78]] }, { quality: "max", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 75], [2095, 76], [5623, 77], [9151, 78], [12679, 79], [16207, 80], [19735, 81]] }, { quality: "max", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 77], [1777, 78], [5305, 79], [8833, 80], [12361, 81], [15889, 82], [19417, 83]] }, { quality: "max", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 79], [1462, 80], [4990, 81], [8518, 82], [12046, 83], [15574, 84], [19102, 85]] }, { quality: "max", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 81], [1144, 82], [4672, 83], [8200, 84], [11728, 85], [15256, 86], [18784, 87]] }, { quality: "max", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 83], [826, 84], [4354, 85], [7882, 86], [11410, 87], [14938, 88], [18466, 89]] }, { quality: "max", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 85], [511, 86], [4039, 87], [7567, 88], [11095, 89], [14623, 90], [18151, 91]] }, { quality: "max", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 87], [193, 88], [3721, 89], [7249, 90], [10777, 91], [14305, 92], [17833, 93]] }, { quality: "max", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 90], [3406, 91], [6934, 92], [10462, 93], [13990, 94], [17518, 95]] }, { quality: "max", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 92], [3088, 93], [6616, 94], [10144, 95], [13672, 96], [17200, 97]] }, { quality: "max", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 94], [2770, 95], [6298, 96], [9826, 97], [13354, 98], [16885, 99]] }, { quality: "max", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 96], [2455, 97], [5983, 98], [9511, 99], [13039, 100], [16567, 101]] }, { quality: "max", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 98], [2137, 99], [5665, 100], [9193, 101], [12721, 102], [16249, 103], [19777, 104]] }, { quality: "max", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 73], [2410, 74], [5938, 75], [9466, 76], [12994, 77], [16522, 78]] }, { quality: "max", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 73], [1183, 74], [4711, 75], [8239, 76], [11767, 77], [15295, 78], [18823, 79]] }, { quality: "max", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [3481, 75], [7009, 76], [10537, 77], [14065, 78], [17593, 79]] }, { quality: "max", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [2254, 75], [5782, 76], [9310, 77], [12838, 78], [16366, 79], [19894, 80]] }, { quality: "max", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [1024, 75], [4552, 76], [8080, 77], [11608, 78], [15136, 79], [18664, 80]] }, { quality: "max", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 121], [1708, 122], [5236, 123], [8764, 124], [12292, 125], [15823, 126], [19348, 127]] }, { quality: "max", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 123], [1393, 124], [4921, 125], [8449, 126], [11977, 127], [15505, 128], [19033, 129]] }, { quality: "max", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 125], [1075, 126], [4603, 127], [8131, 128], [11659, 129], [15187, 130], [18715, 131]] }, { quality: "max", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 127], [760, 128], [4288, 129], [7816, 130], [11344, 131], [14872, 132], [18400, 133]] }, { quality: "max", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 129], [442, 130], [3970, 131], [7498, 132], [11026, 133], [14554, 134], [18082, 135]] }, { quality: "max", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 131], [124, 132], [3652, 133], [7180, 134], [10708, 135], [14236, 136], [17764, 137]] }, { quality: "max", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 134], [3337, 135], [6865, 136], [10393, 137], [13921, 138], [17449, 139]] }, { quality: "max", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 136], [3019, 137], [6547, 138], [10075, 139], [13603, 140], [17131, 141]] }, { quality: "max", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 138], [2704, 139], [6232, 140], [9760, 141], [13288, 142], [16816, 143]] }, { quality: "max", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 140], [2386, 141], [5914, 142], [9442, 143], [12970, 144], [16498, 145]] }, { quality: "max", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 142], [2068, 143], [5596, 144], [9124, 145], [12652, 146], [16180, 147], [19708, 148]] }, { quality: "max", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 144], [1753, 145], [5281, 146], [8809, 147], [12337, 148], [15865, 149], [19393, 150]] }, { quality: "max", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 146], [1435, 147], [4963, 148], [8491, 149], [12019, 150], [15547, 151], [19075, 152]] }, { quality: "max", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 121], [1708, 122], [5236, 123], [8764, 124], [12292, 125], [15823, 126], [19348, 127]] }, { quality: "max", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 121], [481, 122], [4009, 123], [7537, 124], [11065, 125], [14593, 126], [18121, 127]] }, { quality: "max", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [2779, 123], [6307, 124], [9835, 125], [13363, 126], [16891, 127]] }, { quality: "max", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [1552, 123], [5080, 124], [8608, 125], [12136, 126], [15664, 127], [19192, 128]] }, { quality: "max", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [322, 123], [3850, 124], [7378, 125], [10906, 126], [14434, 127], [17962, 128]] }] } }, { key: "gpt-image-2-5-sunburst", name: "GPT Image 2.5 Sunburst", defaultQuality: "low", defaultResolution: "1K", rule: { version: 2, unit: "credits", maxPromptCharacters: 2e4, prices: [{ quality: "low", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 1], [1765, 2], [5290, 3], [8821, 4], [12346, 5], [15877, 6], [19402, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1447, 4], [4975, 5], [8503, 6], [12031, 7], [15559, 8], [19087, 9]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [1129, 6], [4657, 7], [8185, 8], [11713, 9], [15241, 10], [18769, 11]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [814, 8], [4342, 9], [7870, 10], [11398, 11], [14926, 12], [18454, 13]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [496, 10], [4024, 11], [7552, 12], [11080, 13], [14608, 14], [18136, 15]] }, { quality: "low", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [178, 12], [3706, 13], [7234, 14], [10762, 15], [14290, 16], [17818, 17]] }, { quality: "low", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [3391, 15], [6919, 16], [10447, 17], [13975, 18], [17503, 19]] }, { quality: "low", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [3073, 17], [6601, 18], [10129, 19], [13657, 20], [17185, 21]] }, { quality: "low", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [2758, 19], [6286, 20], [9814, 21], [13342, 22], [16870, 23]] }, { quality: "low", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [2440, 21], [5968, 22], [9496, 23], [13024, 24], [16552, 25]] }, { quality: "low", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [2122, 23], [5650, 24], [9178, 25], [12706, 26], [16234, 27], [19762, 28]] }, { quality: "low", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [1807, 25], [5335, 26], [8863, 27], [12391, 28], [15919, 29], [19447, 30]] }, { quality: "low", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [1489, 27], [5017, 28], [8545, 29], [12073, 30], [15601, 31], [19129, 32]] }, { quality: "low", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 1], [1765, 2], [5290, 3], [8821, 4], [12346, 5], [15877, 6], [19402, 7]] }, { quality: "low", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [4063, 3], [7591, 4], [11119, 5], [14647, 6], [18175, 7]] }, { quality: "low", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [2833, 3], [6361, 4], [9889, 5], [13417, 6], [16945, 7]] }, { quality: "low", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1606, 3], [5134, 4], [8662, 5], [12190, 6], [15718, 7], [19246, 8]] }, { quality: "low", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [376, 3], [3904, 4], [7432, 5], [10960, 6], [14488, 7], [18016, 8]] }, { quality: "low", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1672, 3], [5203, 4], [8728, 5], [12259, 6], [15784, 7], [19315, 8]] }, { quality: "low", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 4], [1357, 5], [4885, 6], [8413, 7], [11941, 8], [15469, 9], [18997, 10]] }, { quality: "low", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1039, 7], [4567, 8], [8095, 9], [11623, 10], [15151, 11], [18679, 12]] }, { quality: "low", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [724, 9], [4252, 10], [7780, 11], [11308, 12], [14836, 13], [18364, 14]] }, { quality: "low", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [406, 11], [3934, 12], [7462, 13], [10990, 14], [14518, 15], [18046, 16]] }, { quality: "low", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [88, 13], [3616, 14], [7144, 15], [10672, 16], [14200, 17], [17728, 18]] }, { quality: "low", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [3301, 16], [6829, 17], [10357, 18], [13885, 19], [17413, 20]] }, { quality: "low", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [2983, 18], [6511, 19], [10039, 20], [13567, 21], [17095, 22]] }, { quality: "low", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2668, 20], [6196, 21], [9724, 22], [13252, 23], [16780, 24]] }, { quality: "low", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [2350, 22], [5878, 23], [9406, 24], [12934, 25], [16462, 26], [19990, 27]] }, { quality: "low", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [2032, 24], [5560, 25], [9088, 26], [12616, 27], [16144, 28], [19672, 29]] }, { quality: "low", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [1717, 26], [5245, 27], [8773, 28], [12301, 29], [15829, 30], [19357, 31]] }, { quality: "low", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [1399, 28], [4927, 29], [8455, 30], [11983, 31], [15511, 32], [19039, 33]] }, { quality: "low", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [1672, 3], [5203, 4], [8728, 5], [12259, 6], [15784, 7], [19315, 8]] }, { quality: "low", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [445, 3], [3973, 4], [7501, 5], [11029, 6], [14557, 7], [18085, 8]] }, { quality: "low", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [2743, 4], [6271, 5], [9799, 6], [13327, 7], [16855, 8]] }, { quality: "low", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1516, 4], [5044, 5], [8572, 6], [12100, 7], [15628, 8], [19156, 9]] }, { quality: "low", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [286, 4], [3814, 5], [7342, 6], [10870, 7], [14398, 8], [17926, 9]] }, { quality: "low", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 3], [487, 4], [4012, 5], [7543, 6], [11068, 7], [14599, 8], [18124, 9]] }, { quality: "low", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [169, 6], [3697, 7], [7225, 8], [10753, 9], [14281, 10], [17809, 11]] }, { quality: "low", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3379, 9], [6907, 10], [10435, 11], [13963, 12], [17491, 13]] }, { quality: "low", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [3064, 11], [6592, 12], [10120, 13], [13648, 14], [17176, 15]] }, { quality: "low", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [2746, 13], [6274, 14], [9802, 15], [13330, 16], [16858, 17]] }, { quality: "low", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [2428, 15], [5956, 16], [9484, 17], [13012, 18], [16540, 19]] }, { quality: "low", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2113, 17], [5641, 18], [9169, 19], [12697, 20], [16225, 21], [19753, 22]] }, { quality: "low", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1795, 19], [5323, 20], [8851, 21], [12379, 22], [15907, 23], [19435, 24]] }, { quality: "low", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [1480, 21], [5008, 22], [8536, 23], [12064, 24], [15592, 25], [19120, 26]] }, { quality: "low", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [1162, 23], [4690, 24], [8218, 25], [11746, 26], [15274, 27], [18802, 28]] }, { quality: "low", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [844, 25], [4372, 26], [7900, 27], [11428, 28], [14956, 29], [18487, 30]] }, { quality: "low", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [529, 27], [4057, 28], [7585, 29], [11113, 30], [14641, 31], [18169, 32]] }, { quality: "low", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [211, 29], [3739, 30], [7267, 31], [10795, 32], [14323, 33], [17851, 34]] }, { quality: "low", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [487, 4], [4012, 5], [7543, 6], [11068, 7], [14599, 8], [18124, 9]] }, { quality: "low", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [2785, 5], [6313, 6], [9841, 7], [13369, 8], [16897, 9]] }, { quality: "low", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [1555, 5], [5083, 6], [8611, 7], [12139, 8], [15667, 9], [19195, 10]] }, { quality: "low", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [328, 5], [3856, 6], [7384, 7], [10912, 8], [14440, 9], [17968, 10]] }, { quality: "low", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [2626, 6], [6154, 7], [9682, 8], [13210, 9], [16738, 10]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 2], [916, 3], [4447, 4], [7972, 5], [11500, 6], [15028, 7], [18559, 8]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 4], [601, 5], [4129, 6], [7657, 7], [11185, 8], [14713, 9], [18241, 10]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [283, 7], [3811, 8], [7339, 9], [10867, 10], [14395, 11], [17923, 12]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [3496, 10], [7024, 11], [10552, 12], [14080, 13], [17608, 14]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [3178, 12], [6706, 13], [10234, 14], [13762, 15], [17290, 16]] }, { quality: "medium", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [2860, 14], [6388, 15], [9916, 16], [13444, 17], [16972, 18]] }, { quality: "medium", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [2545, 16], [6073, 17], [9601, 18], [13129, 19], [16657, 20]] }, { quality: "medium", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [2227, 18], [5755, 19], [9283, 20], [12811, 21], [16339, 22], [19867, 23]] }, { quality: "medium", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [1912, 20], [5440, 21], [8968, 22], [12496, 23], [16024, 24], [19552, 25]] }, { quality: "medium", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [1594, 22], [5122, 23], [8650, 24], [12178, 25], [15706, 26], [19234, 27]] }, { quality: "medium", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [1276, 24], [4804, 25], [8332, 26], [11860, 27], [15388, 28], [18916, 29]] }, { quality: "medium", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [961, 26], [4489, 27], [8017, 28], [11545, 29], [15073, 30], [18601, 31]] }, { quality: "medium", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [643, 28], [4171, 29], [7699, 30], [11227, 31], [14755, 32], [18283, 33]] }, { quality: "medium", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 2], [916, 3], [4447, 4], [7972, 5], [11500, 6], [15028, 7], [18559, 8]] }, { quality: "medium", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [3217, 4], [6745, 5], [10273, 6], [13801, 7], [17329, 8]] }, { quality: "medium", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [1987, 4], [5515, 5], [9043, 6], [12571, 7], [16099, 8], [19627, 9]] }, { quality: "medium", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 3], [760, 4], [4288, 5], [7816, 6], [11344, 7], [14872, 8], [18400, 9]] }, { quality: "medium", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 4], [3058, 5], [6586, 6], [10114, 7], [13642, 8], [17170, 9]] }, { quality: "medium", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [3349, 6], [6874, 7], [10405, 8], [13930, 9], [17458, 10]] }, { quality: "medium", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [3031, 8], [6559, 9], [10087, 10], [13615, 11], [17143, 12]] }, { quality: "medium", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [2713, 10], [6241, 11], [9769, 12], [13297, 13], [16825, 14]] }, { quality: "medium", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [2398, 12], [5926, 13], [9454, 14], [12982, 15], [16510, 16]] }, { quality: "medium", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [2080, 14], [5608, 15], [9136, 16], [12664, 17], [16192, 18], [19720, 19]] }, { quality: "medium", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [1762, 16], [5290, 17], [8818, 18], [12346, 19], [15874, 20], [19405, 21]] }, { quality: "medium", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [1447, 18], [4975, 19], [8503, 20], [12031, 21], [15559, 22], [19087, 23]] }, { quality: "medium", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [1129, 20], [4657, 21], [8185, 22], [11713, 23], [15241, 24], [18769, 25]] }, { quality: "medium", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [814, 22], [4342, 23], [7870, 24], [11398, 25], [14926, 26], [18454, 27]] }, { quality: "medium", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [496, 24], [4024, 25], [7552, 26], [11080, 27], [14608, 28], [18136, 29]] }, { quality: "medium", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 25], [178, 26], [3706, 27], [7237, 28], [10765, 29], [14293, 30], [17821, 31]] }, { quality: "medium", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [3391, 29], [6919, 30], [10447, 31], [13975, 32], [17503, 33]] }, { quality: "medium", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [3073, 31], [6601, 32], [10129, 33], [13657, 34], [17185, 35]] }, { quality: "medium", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [3349, 6], [6874, 7], [10405, 8], [13930, 9], [17458, 10]] }, { quality: "medium", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [2119, 6], [5647, 7], [9175, 8], [12703, 9], [16231, 10], [19759, 11]] }, { quality: "medium", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [889, 6], [4417, 7], [7945, 8], [11473, 9], [15001, 10], [18529, 11]] }, { quality: "medium", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [3190, 7], [6718, 8], [10246, 9], [13774, 10], [17302, 11]] }, { quality: "medium", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1960, 7], [5488, 8], [9016, 9], [12544, 10], [16072, 11], [19600, 12]] }, { quality: "medium", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3292, 9], [6823, 10], [10348, 11], [13876, 12], [17407, 13]] }, { quality: "medium", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [2977, 11], [6505, 12], [10033, 13], [13561, 14], [17089, 15]] }, { quality: "medium", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [2659, 13], [6187, 14], [9715, 15], [13243, 16], [16771, 17]] }, { quality: "medium", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 14], [2344, 15], [5872, 16], [9400, 17], [12928, 18], [16456, 19], [19984, 20]] }, { quality: "medium", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2026, 17], [5554, 18], [9082, 19], [12610, 20], [16138, 21], [19666, 22]] }, { quality: "medium", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1708, 19], [5236, 20], [8767, 21], [12292, 22], [15820, 23], [19348, 24]] }, { quality: "medium", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [1393, 21], [4921, 22], [8449, 23], [11977, 24], [15505, 25], [19033, 26]] }, { quality: "medium", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [1075, 23], [4603, 24], [8131, 25], [11659, 26], [15187, 27], [18715, 28]] }, { quality: "medium", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [760, 25], [4288, 26], [7816, 27], [11344, 28], [14872, 29], [18400, 30]] }, { quality: "medium", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [442, 27], [3970, 28], [7498, 29], [11026, 30], [14554, 31], [18082, 32]] }, { quality: "medium", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [127, 29], [3655, 30], [7183, 31], [10711, 32], [14236, 33], [17764, 34]] }, { quality: "medium", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [3337, 32], [6865, 33], [10393, 34], [13921, 35], [17449, 36]] }, { quality: "medium", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [3019, 34], [6547, 35], [10075, 36], [13603, 37], [17131, 38]] }, { quality: "medium", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3292, 9], [6823, 10], [10348, 11], [13876, 12], [17407, 13]] }, { quality: "medium", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [2065, 9], [5593, 10], [9121, 11], [12649, 12], [16177, 13], [19705, 14]] }, { quality: "medium", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [835, 9], [4363, 10], [7891, 11], [11419, 12], [14947, 13], [18475, 14]] }, { quality: "medium", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [3136, 10], [6664, 11], [10192, 12], [13720, 13], [17248, 14]] }, { quality: "medium", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16018, 14], [19546, 15]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16021, 14], [19546, 15]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [1591, 12], [5119, 13], [8647, 14], [12175, 15], [15703, 16], [19231, 17]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [1273, 14], [4801, 15], [8329, 16], [11857, 17], [15385, 18], [18913, 19]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 15], [958, 16], [4486, 17], [8014, 18], [11542, 19], [15070, 20], [18598, 21]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 17], [640, 18], [4168, 19], [7696, 20], [11224, 21], [14752, 22], [18280, 23]] }, { quality: "high", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [322, 20], [3850, 21], [7378, 22], [10906, 23], [14434, 24], [17962, 25]] }, { quality: "high", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [7, 22], [3535, 23], [7063, 24], [10591, 25], [14119, 26], [17647, 27]] }, { quality: "high", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [3217, 25], [6745, 26], [10273, 27], [13801, 28], [17329, 29]] }, { quality: "high", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [2902, 27], [6430, 28], [9958, 29], [13486, 30], [17014, 31]] }, { quality: "high", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [2584, 29], [6112, 30], [9640, 31], [13168, 32], [16696, 33]] }, { quality: "high", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [2269, 31], [5797, 32], [9322, 33], [12850, 34], [16378, 35], [19906, 36]] }, { quality: "high", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [1951, 33], [5479, 34], [9007, 35], [12535, 36], [16063, 37], [19591, 38]] }, { quality: "high", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [1633, 35], [5161, 36], [8689, 37], [12217, 38], [15745, 39], [19273, 40]] }, { quality: "high", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [1906, 10], [5434, 11], [8962, 12], [12490, 13], [16021, 14], [19546, 15]] }, { quality: "high", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [679, 10], [4207, 11], [7735, 12], [11263, 13], [14791, 14], [18319, 15]] }, { quality: "high", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [2977, 11], [6505, 12], [10033, 13], [13561, 14], [17089, 15]] }, { quality: "high", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [1750, 11], [5278, 12], [8806, 13], [12334, 14], [15862, 15], [19390, 16]] }, { quality: "high", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [520, 11], [4048, 12], [7576, 13], [11104, 14], [14632, 15], [18160, 16]] }, { quality: "high", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1042, 19], [4570, 20], [8101, 21], [11626, 22], [15154, 23], [18682, 24]] }, { quality: "high", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [727, 21], [4255, 22], [7783, 23], [11311, 24], [14839, 25], [18367, 26]] }, { quality: "high", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [409, 23], [3937, 24], [7465, 25], [10993, 26], [14521, 27], [18049, 28]] }, { quality: "high", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [94, 25], [3622, 26], [7150, 27], [10678, 28], [14206, 29], [17734, 30]] }, { quality: "high", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [3304, 28], [6832, 29], [10360, 30], [13888, 31], [17416, 32]] }, { quality: "high", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 29], [2986, 30], [6514, 31], [10042, 32], [13570, 33], [17098, 34]] }, { quality: "high", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [2671, 32], [6199, 33], [9727, 34], [13255, 35], [16783, 36]] }, { quality: "high", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [2353, 34], [5881, 35], [9409, 36], [12937, 37], [16465, 38], [19993, 39]] }, { quality: "high", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 35], [2038, 36], [5566, 37], [9094, 38], [12622, 39], [16150, 40], [19678, 41]] }, { quality: "high", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [1720, 38], [5248, 39], [8776, 40], [12304, 41], [15832, 42], [19360, 43]] }, { quality: "high", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [1402, 40], [4930, 41], [8458, 42], [11986, 43], [15514, 44], [19042, 45]] }, { quality: "high", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [1087, 42], [4615, 43], [8143, 44], [11671, 45], [15199, 46], [18727, 47]] }, { quality: "high", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [769, 44], [4297, 45], [7825, 46], [11353, 47], [14881, 48], [18409, 49]] }, { quality: "high", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1042, 19], [4570, 20], [8101, 21], [11626, 22], [15154, 23], [18682, 24]] }, { quality: "high", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [3343, 20], [6871, 21], [10399, 22], [13927, 23], [17455, 24]] }, { quality: "high", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2113, 20], [5641, 21], [9169, 22], [12697, 23], [16225, 24], [19753, 25]] }, { quality: "high", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [886, 20], [4414, 21], [7942, 22], [11470, 23], [14998, 24], [18526, 25]] }, { quality: "high", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 20], [3184, 21], [6712, 22], [10240, 23], [13768, 24], [17296, 25]] }, { quality: "high", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 30], [865, 31], [4393, 32], [7918, 33], [11446, 34], [14974, 35], [18502, 36]] }, { quality: "high", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [547, 33], [4075, 34], [7603, 35], [11131, 36], [14659, 37], [18187, 38]] }, { quality: "high", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [229, 35], [3757, 36], [7285, 37], [10813, 38], [14341, 39], [17869, 40]] }, { quality: "high", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3442, 38], [6970, 39], [10498, 40], [14026, 41], [17554, 42]] }, { quality: "high", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [3124, 40], [6652, 41], [10180, 42], [13708, 43], [17236, 44]] }, { quality: "high", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [2806, 42], [6337, 43], [9865, 44], [13390, 45], [16921, 46]] }, { quality: "high", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [2491, 44], [6019, 45], [9547, 46], [13075, 47], [16603, 48]] }, { quality: "high", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 45], [2173, 46], [5701, 47], [9229, 48], [12757, 49], [16285, 50], [19813, 51]] }, { quality: "high", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 47], [1858, 48], [5386, 49], [8914, 50], [12442, 51], [15970, 52], [19498, 53]] }, { quality: "high", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 49], [1540, 50], [5068, 51], [8596, 52], [12124, 53], [15652, 54], [19180, 55]] }, { quality: "high", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 51], [1222, 52], [4753, 53], [8278, 54], [11806, 55], [15334, 56], [18862, 57]] }, { quality: "high", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [907, 54], [4435, 55], [7963, 56], [11491, 57], [15019, 58], [18547, 59]] }, { quality: "high", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [589, 56], [4117, 57], [7645, 58], [11173, 59], [14701, 60], [18229, 61]] }, { quality: "high", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 30], [865, 31], [4393, 32], [7918, 33], [11446, 34], [14974, 35], [18502, 36]] }, { quality: "high", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [3163, 32], [6691, 33], [10219, 34], [13747, 35], [17275, 36]] }, { quality: "high", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [1933, 32], [5461, 33], [8989, 34], [12517, 35], [16045, 36], [19573, 37]] }, { quality: "high", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 31], [706, 32], [4234, 33], [7762, 34], [11290, 35], [14818, 36], [18346, 37]] }, { quality: "high", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 32], [3004, 33], [6532, 34], [10060, 35], [13588, 36], [17116, 37]] }, { quality: "xhigh", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2014, 17], [5542, 18], [9070, 19], [12598, 20], [16129, 21], [19654, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [1699, 19], [5227, 20], [8755, 21], [12283, 22], [15811, 23], [19339, 24]] }, { quality: "xhigh", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [1381, 21], [4909, 22], [8437, 23], [11965, 24], [15493, 25], [19021, 26]] }, { quality: "xhigh", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [1066, 23], [4594, 24], [8122, 25], [11650, 26], [15178, 27], [18706, 28]] }, { quality: "xhigh", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 24], [748, 25], [4276, 26], [7804, 27], [11332, 28], [14860, 29], [18388, 30]] }, { quality: "xhigh", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 26], [430, 27], [3958, 28], [7486, 29], [11014, 30], [14542, 31], [18070, 32]] }, { quality: "xhigh", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28], [115, 29], [3643, 30], [7171, 31], [10699, 32], [14227, 33], [17755, 34]] }, { quality: "xhigh", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 31], [3325, 32], [6853, 33], [10381, 34], [13909, 35], [17437, 36]] }, { quality: "xhigh", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 33], [3010, 34], [6538, 35], [10066, 36], [13594, 37], [17122, 38]] }, { quality: "xhigh", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 35], [2692, 36], [6220, 37], [9748, 38], [13276, 39], [16804, 40]] }, { quality: "xhigh", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [2374, 38], [5902, 39], [9430, 40], [12958, 41], [16486, 42]] }, { quality: "xhigh", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [2059, 40], [5587, 41], [9115, 42], [12643, 43], [16171, 44], [19699, 45]] }, { quality: "xhigh", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [1741, 42], [5269, 43], [8797, 44], [12325, 45], [15853, 46], [19381, 47]] }, { quality: "xhigh", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 16], [2014, 17], [5542, 18], [9070, 19], [12598, 20], [16129, 21], [19654, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 16], [787, 17], [4315, 18], [7843, 19], [11371, 20], [14899, 21], [18427, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 17], [3085, 18], [6613, 19], [10141, 20], [13669, 21], [17197, 22]] }, { quality: "xhigh", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 17], [1858, 18], [5386, 19], [8914, 20], [12442, 21], [15970, 22], [19498, 23]] }, { quality: "xhigh", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 17], [628, 18], [4156, 19], [7684, 20], [11212, 21], [14740, 22], [18268, 23]] }, { quality: "xhigh", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 32], [484, 33], [4012, 34], [7540, 35], [11068, 36], [14596, 37], [18124, 38]] }, { quality: "xhigh", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 34], [169, 35], [3697, 36], [7225, 37], [10753, 38], [14281, 39], [17809, 40]] }, { quality: "xhigh", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3379, 38], [6907, 39], [10435, 40], [13963, 41], [17491, 42]] }, { quality: "xhigh", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 39], [3064, 40], [6592, 41], [10120, 42], [13648, 43], [17176, 44]] }, { quality: "xhigh", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 41], [2746, 42], [6274, 43], [9802, 44], [13330, 45], [16858, 46]] }, { quality: "xhigh", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 43], [2428, 44], [5956, 45], [9484, 46], [13015, 47], [16540, 48]] }, { quality: "xhigh", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 45], [2113, 46], [5641, 47], [9169, 48], [12697, 49], [16225, 50], [19753, 51]] }, { quality: "xhigh", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 47], [1795, 48], [5323, 49], [8851, 50], [12379, 51], [15907, 52], [19435, 53]] }, { quality: "xhigh", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 49], [1480, 50], [5008, 51], [8536, 52], [12064, 53], [15592, 54], [19120, 55]] }, { quality: "xhigh", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 51], [1162, 52], [4690, 53], [8218, 54], [11746, 55], [15274, 56], [18802, 57]] }, { quality: "xhigh", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [844, 54], [4372, 55], [7900, 56], [11428, 57], [14956, 58], [18487, 59]] }, { quality: "xhigh", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [529, 56], [4057, 57], [7585, 58], [11113, 59], [14641, 60], [18169, 61]] }, { quality: "xhigh", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 57], [211, 58], [3739, 59], [7267, 60], [10795, 61], [14323, 62], [17851, 63]] }, { quality: "xhigh", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 32], [484, 33], [4012, 34], [7540, 35], [11068, 36], [14596, 37], [18124, 38]] }, { quality: "xhigh", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 33], [2785, 34], [6313, 35], [9841, 36], [13369, 37], [16897, 38]] }, { quality: "xhigh", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 33], [1555, 34], [5083, 35], [8611, 36], [12139, 37], [15667, 38], [19195, 39]] }, { quality: "xhigh", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 33], [328, 34], [3856, 35], [7384, 36], [10912, 37], [14440, 38], [17968, 39]] }, { quality: "xhigh", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 34], [2626, 35], [6154, 36], [9682, 37], [13210, 38], [16738, 39]] }, { quality: "xhigh", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 54], [2518, 55], [6046, 56], [9574, 57], [13102, 58], [16633, 59]] }, { quality: "xhigh", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 56], [2203, 57], [5731, 58], [9259, 59], [12787, 60], [16315, 61], [19843, 62]] }, { quality: "xhigh", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 58], [1885, 59], [5413, 60], [8941, 61], [12469, 62], [15997, 63], [19525, 64]] }, { quality: "xhigh", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 60], [1570, 61], [5098, 62], [8626, 63], [12154, 64], [15682, 65], [19210, 66]] }, { quality: "xhigh", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 62], [1252, 63], [4780, 64], [8308, 65], [11836, 66], [15364, 67], [18892, 68]] }, { quality: "xhigh", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 64], [934, 65], [4462, 66], [7990, 67], [11518, 68], [15046, 69], [18574, 70]] }, { quality: "xhigh", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 66], [619, 67], [4147, 68], [7675, 69], [11203, 70], [14731, 71], [18259, 72]] }, { quality: "xhigh", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 68], [301, 69], [3829, 70], [7357, 71], [10885, 72], [14413, 73], [17941, 74]] }, { quality: "xhigh", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 71], [3514, 72], [7042, 73], [10570, 74], [14098, 75], [17626, 76]] }, { quality: "xhigh", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 73], [3196, 74], [6724, 75], [10252, 76], [13780, 77], [17308, 78]] }, { quality: "xhigh", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 75], [2878, 76], [6406, 77], [9934, 78], [13462, 79], [16990, 80]] }, { quality: "xhigh", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 77], [2563, 78], [6091, 79], [9619, 80], [13147, 81], [16675, 82]] }, { quality: "xhigh", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 79], [2245, 80], [5773, 81], [9301, 82], [12829, 83], [16357, 84], [19885, 85]] }, { quality: "xhigh", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 54], [2518, 55], [6046, 56], [9574, 57], [13102, 58], [16633, 59]] }, { quality: "xhigh", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 54], [1291, 55], [4819, 56], [8347, 57], [11875, 58], [15403, 59], [18931, 60]] }, { quality: "xhigh", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 54], [61, 55], [3589, 56], [7117, 57], [10645, 58], [14173, 59], [17701, 60]] }, { quality: "xhigh", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 55], [2362, 56], [5890, 57], [9418, 58], [12946, 59], [16474, 60]] }, { quality: "xhigh", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 55], [1132, 56], [4660, 57], [8188, 58], [11716, 59], [15244, 60], [18772, 61]] }, { quality: "max", resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 36], [2338, 37], [5866, 38], [9394, 39], [12922, 40], [16450, 41], [19978, 42]] }, { quality: "max", resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 38], [2023, 39], [5551, 40], [9079, 41], [12607, 42], [16135, 43], [19663, 44]] }, { quality: "max", resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 40], [1705, 41], [5233, 42], [8761, 43], [12289, 44], [15817, 45], [19345, 46]] }, { quality: "max", resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 42], [1390, 43], [4918, 44], [8446, 45], [11974, 46], [15502, 47], [19030, 48]] }, { quality: "max", resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 44], [1072, 45], [4600, 46], [8128, 47], [11656, 48], [15184, 49], [18712, 50]] }, { quality: "max", resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 46], [757, 47], [4282, 48], [7810, 49], [11338, 50], [14866, 51], [18394, 52]] }, { quality: "max", resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 48], [439, 49], [3967, 50], [7495, 51], [11023, 52], [14551, 53], [18079, 54]] }, { quality: "max", resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 50], [121, 51], [3649, 52], [7177, 53], [10705, 54], [14233, 55], [17761, 56]] }, { quality: "max", resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 53], [3334, 54], [6862, 55], [10390, 56], [13918, 57], [17446, 58]] }, { quality: "max", resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 55], [3016, 56], [6544, 57], [10072, 58], [13600, 59], [17128, 60]] }, { quality: "max", resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 57], [2698, 58], [6229, 59], [9754, 60], [13282, 61], [16810, 62]] }, { quality: "max", resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 59], [2383, 60], [5911, 61], [9439, 62], [12967, 63], [16495, 64]] }, { quality: "max", resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 61], [2065, 62], [5593, 63], [9121, 64], [12649, 65], [16177, 66], [19705, 67]] }, { quality: "max", resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 36], [2338, 37], [5866, 38], [9394, 39], [12922, 40], [16450, 41], [19978, 42]] }, { quality: "max", resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 36], [1111, 37], [4639, 38], [8167, 39], [11695, 40], [15223, 41], [18751, 42]] }, { quality: "max", resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [3409, 38], [6937, 39], [10465, 40], [13993, 41], [17521, 42]] }, { quality: "max", resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [2182, 38], [5710, 39], [9238, 40], [12766, 41], [16294, 42], [19822, 43]] }, { quality: "max", resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 37], [952, 38], [4480, 39], [8008, 40], [11536, 41], [15064, 42], [18592, 43]] }, { quality: "max", resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 73], [2410, 74], [5938, 75], [9466, 76], [12994, 77], [16522, 78]] }, { quality: "max", resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 75], [2095, 76], [5623, 77], [9151, 78], [12679, 79], [16207, 80], [19735, 81]] }, { quality: "max", resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 77], [1777, 78], [5305, 79], [8833, 80], [12361, 81], [15889, 82], [19417, 83]] }, { quality: "max", resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 79], [1462, 80], [4990, 81], [8518, 82], [12046, 83], [15574, 84], [19102, 85]] }, { quality: "max", resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 81], [1144, 82], [4672, 83], [8200, 84], [11728, 85], [15256, 86], [18784, 87]] }, { quality: "max", resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 83], [826, 84], [4354, 85], [7882, 86], [11410, 87], [14938, 88], [18466, 89]] }, { quality: "max", resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 85], [511, 86], [4039, 87], [7567, 88], [11095, 89], [14623, 90], [18151, 91]] }, { quality: "max", resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 87], [193, 88], [3721, 89], [7249, 90], [10777, 91], [14305, 92], [17833, 93]] }, { quality: "max", resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 90], [3406, 91], [6934, 92], [10462, 93], [13990, 94], [17518, 95]] }, { quality: "max", resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 92], [3088, 93], [6616, 94], [10144, 95], [13672, 96], [17200, 97]] }, { quality: "max", resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 94], [2770, 95], [6298, 96], [9826, 97], [13354, 98], [16885, 99]] }, { quality: "max", resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 96], [2455, 97], [5983, 98], [9511, 99], [13039, 100], [16567, 101]] }, { quality: "max", resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 98], [2137, 99], [5665, 100], [9193, 101], [12721, 102], [16249, 103], [19777, 104]] }, { quality: "max", resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 73], [2410, 74], [5938, 75], [9466, 76], [12994, 77], [16522, 78]] }, { quality: "max", resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 73], [1183, 74], [4711, 75], [8239, 76], [11767, 77], [15295, 78], [18823, 79]] }, { quality: "max", resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [3481, 75], [7009, 76], [10537, 77], [14065, 78], [17593, 79]] }, { quality: "max", resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [2254, 75], [5782, 76], [9310, 77], [12838, 78], [16366, 79], [19894, 80]] }, { quality: "max", resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 74], [1024, 75], [4552, 76], [8080, 77], [11608, 78], [15136, 79], [18664, 80]] }, { quality: "max", resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 121], [1708, 122], [5236, 123], [8764, 124], [12292, 125], [15823, 126], [19348, 127]] }, { quality: "max", resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 123], [1393, 124], [4921, 125], [8449, 126], [11977, 127], [15505, 128], [19033, 129]] }, { quality: "max", resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 125], [1075, 126], [4603, 127], [8131, 128], [11659, 129], [15187, 130], [18715, 131]] }, { quality: "max", resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 127], [760, 128], [4288, 129], [7816, 130], [11344, 131], [14872, 132], [18400, 133]] }, { quality: "max", resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 129], [442, 130], [3970, 131], [7498, 132], [11026, 133], [14554, 134], [18082, 135]] }, { quality: "max", resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 131], [124, 132], [3652, 133], [7180, 134], [10708, 135], [14236, 136], [17764, 137]] }, { quality: "max", resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 134], [3337, 135], [6865, 136], [10393, 137], [13921, 138], [17449, 139]] }, { quality: "max", resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 136], [3019, 137], [6547, 138], [10075, 139], [13603, 140], [17131, 141]] }, { quality: "max", resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 138], [2704, 139], [6232, 140], [9760, 141], [13288, 142], [16816, 143]] }, { quality: "max", resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 140], [2386, 141], [5914, 142], [9442, 143], [12970, 144], [16498, 145]] }, { quality: "max", resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 142], [2068, 143], [5596, 144], [9124, 145], [12652, 146], [16180, 147], [19708, 148]] }, { quality: "max", resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 144], [1753, 145], [5281, 146], [8809, 147], [12337, 148], [15865, 149], [19393, 150]] }, { quality: "max", resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 146], [1435, 147], [4963, 148], [8491, 149], [12019, 150], [15547, 151], [19075, 152]] }, { quality: "max", resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 121], [1708, 122], [5236, 123], [8764, 124], [12292, 125], [15823, 126], [19348, 127]] }, { quality: "max", resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 121], [481, 122], [4009, 123], [7537, 124], [11065, 125], [14593, 126], [18121, 127]] }, { quality: "max", resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [2779, 123], [6307, 124], [9835, 125], [13363, 126], [16891, 127]] }, { quality: "max", resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [1552, 123], [5080, 124], [8608, 125], [12136, 126], [15664, 127], [19192, 128]] }, { quality: "max", resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 122], [322, 123], [3850, 124], [7378, 125], [10906, 126], [14434, 127], [17962, 128]] }] } }, { key: "nano-banana-2", name: "Nano Banana 2", defaultQuality: null, defaultResolution: "0.5K", rule: { version: 2, unit: "credits", maxPromptCharacters: 2e4, prices: [{ quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8]] }, { quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 10], [4882, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 10], [4882, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [17362, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 10], [1522, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 10], [1522, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [19738, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [14005, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [16378, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [10645, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [13018, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [7285, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [9658, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [3925, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [6298, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [565, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [18781, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [18781, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [2938, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [15421, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [15421, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [12061, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [12061, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [8701, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [8701, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [5341, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [5341, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [17824, 10]] }, { quality: null, resolution: "0.5K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [1981, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [1981, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [14464, 10]] }, { quality: null, resolution: "0.5K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 12]] }, { quality: null, resolution: "0.5K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14], [16837, 15]] }, { quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8]] }, { quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 10], [4882, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 10], [4882, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 13]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [17362, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 10], [1522, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 10], [1522, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 13], [19738, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [14005, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 13], [16378, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [10645, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 13], [13018, 14]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 8], [7285, 9]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 11]] }, { quality: null, resolution: "0.5K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 13], [9658, 14]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 14], [6910, 15]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 14], [6910, 15]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [19390, 13]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 14], [3550, 15]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 14], [3550, 15]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [16030, 13]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 14], [190, 15]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 14], [190, 15]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17], [18406, 18]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [12670, 13]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17], [15046, 18]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [9313, 13]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17], [11686, 18]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [5953, 13]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17], [8326, 18]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [2593, 13]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17], [4966, 18]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15], [17449, 16]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15], [17449, 16]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17], [1606, 18]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15], [14089, 16]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15], [14089, 16]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 18]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15], [10729, 16]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15], [10729, 16]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 18]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15], [7369, 16]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15], [7369, 16]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 18]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [19849, 14]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15], [4009, 16]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15], [4009, 16]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 18]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 13], [16492, 14]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 15], [649, 16]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 15], [649, 16]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 18], [18865, 19]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 12]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 14], [6910, 15]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 14], [6910, 15]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 17]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 12], [19390, 13]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 14], [3550, 15]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 14], [3550, 15]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 17]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 12], [16030, 13]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 14], [190, 15]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 14], [190, 15]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 17], [18406, 18]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 12], [12670, 13]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 17], [15046, 18]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 12], [9313, 13]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 15]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 17], [11686, 18]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 20], [9772, 21]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 20], [9772, 21]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 20], [6412, 21]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 20], [6412, 21]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [18892, 19]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 20], [3052, 21]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 20], [3052, 21]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [15532, 19]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23], [17905, 24]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [12172, 19]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23], [14548, 24]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [8815, 19]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23], [11188, 24]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [5455, 19]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23], [7828, 24]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 18], [2095, 19]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23], [4468, 24]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21], [16948, 22]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21], [16948, 22]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 23], [1108, 24]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21], [13591, 22]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21], [13591, 22]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 24]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21], [10231, 22]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21], [10231, 22]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 24]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21], [6871, 22]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21], [6871, 22]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 24]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [19351, 20]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 21], [3511, 22]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 21], [3511, 22]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 24]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 20], [9772, 21]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 20], [9772, 21]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 23]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 20], [6412, 21]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 20], [6412, 21]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 23]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18], [18892, 19]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 20], [3052, 21]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 20], [3052, 21]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 23]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18], [15532, 19]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 23], [17905, 24]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 18], [12172, 19]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 21]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 23], [14548, 24]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 29], [14059, 30]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 29], [14059, 30]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 29], [10699, 30]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 29], [10699, 30]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 29], [7339, 30]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 29], [7339, 30]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [19819, 28]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 29], [3979, 30]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 29], [3979, 30]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [16462, 28]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 29], [619, 30]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 29], [619, 30]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32], [18835, 33]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [13102, 28]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32], [15475, 33]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [9742, 28]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32], [12115, 33]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [6382, 28]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32], [8755, 33]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 27], [3022, 28]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32], [5395, 33]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30], [17878, 31]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30], [17878, 31]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 32], [2035, 33]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30], [14518, 31]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30], [14518, 31]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 33]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30], [11158, 31]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30], [11158, 31]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 33]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 28]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 30], [7798, 31]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 30], [7798, 31]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 33]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 27]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 29], [14059, 30]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 29], [14059, 30]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 27]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 29], [10699, 30]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 29], [10699, 30]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 27]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 29], [7339, 30]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 29], [7339, 30]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 27], [19819, 28]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 29], [3979, 30]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 29], [3979, 30]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 32]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 27], [16462, 28]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 29], [619, 30]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 29], [619, 30]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 32], [18835, 33]] }] } }, { key: "nano-banana-2-lite", name: "Nano Banana 2 Lite", defaultQuality: null, defaultResolution: "1K", rule: { version: 2, unit: "credits", maxPromptCharacters: 2e4, prices: [{ quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [7678, 6]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [4324, 6]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 5], [973, 6]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [7678, 6]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [4324, 6]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 5], [973, 6]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6]] }] } }, { key: "nano-banana-2-1", name: "Nano Banana 2.1", defaultQuality: null, defaultResolution: "1K", rule: { version: 2, unit: "credits", maxPromptCharacters: 2e4, prices: [{ quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [8440, 7]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 8], [3958, 9], [15718, 10]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 8], [3958, 9], [15718, 10]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 11], [11239, 12]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [5077, 7], [16837, 8]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 8], [598, 9], [12358, 10]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 8], [598, 9], [12358, 10]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 11], [7876, 12], [19636, 13]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1714, 7], [13474, 8]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 9], [8995, 10]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 9], [8995, 10]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 11], [4513, 12], [16273, 13]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [10111, 8]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 9], [5632, 10], [17392, 11]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 9], [5632, 10], [17392, 11]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 11], [1150, 12], [12910, 13]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [6748, 8], [18508, 9]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 9], [2269, 10], [14029, 11]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 9], [2269, 10], [14029, 11]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 12], [9550, 13]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [3385, 8], [15145, 9]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 10], [10666, 11]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 10], [10666, 11]] }, { quality: null, resolution: "1K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 12], [6187, 13], [17947, 14]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 7], [22, 8], [11782, 9]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 10], [7303, 11], [19063, 12]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 10], [7303, 11], [19063, 12]] }, { quality: null, resolution: "1K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 12], [2824, 13], [14584, 14]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [8419, 9]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 10], [3940, 11], [15700, 12]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 10], [3940, 11], [15700, 12]] }, { quality: null, resolution: "1K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [11221, 14]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [5059, 9], [16819, 10]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 10], [577, 11], [12337, 12]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 10], [577, 11], [12337, 12]] }, { quality: null, resolution: "1K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [7858, 14], [19618, 15]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 8], [1696, 9], [13456, 10]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [8974, 12]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [8974, 12]] }, { quality: null, resolution: "1K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [4495, 14], [16255, 15]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [10093, 10]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [5611, 12], [17371, 13]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [5611, 12], [17371, 13]] }, { quality: null, resolution: "1K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [1132, 14], [12892, 15]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [6730, 10], [18490, 11]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [2248, 12], [14008, 13]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [2248, 12], [14008, 13]] }, { quality: null, resolution: "1K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14], [9529, 15]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [3367, 10], [15127, 11]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 12], [10648, 13]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 12], [10648, 13]] }, { quality: null, resolution: "1K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14], [6166, 15], [17926, 16]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [8440, 7]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 8], [3958, 9], [15718, 10]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 8], [3958, 9], [15718, 10]] }, { quality: null, resolution: "1K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 11], [11239, 12]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [5077, 7], [16837, 8]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 8], [598, 9], [12358, 10]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 8], [598, 9], [12358, 10]] }, { quality: null, resolution: "1K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 11], [7876, 12], [19636, 13]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 6], [1714, 7], [13474, 8]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 9], [8995, 10]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 9], [8995, 10]] }, { quality: null, resolution: "1K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 11], [4513, 12], [16273, 13]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 7], [10111, 8]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 9], [5632, 10], [17392, 11]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 9], [5632, 10], [17392, 11]] }, { quality: null, resolution: "1K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 11], [1150, 12], [12910, 13]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 7], [6748, 8], [18508, 9]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 9], [2269, 10], [14029, 11]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 9], [2269, 10], [14029, 11]] }, { quality: null, resolution: "1K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 12], [9550, 13]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [10918, 10]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [6439, 12], [18199, 13]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [6439, 12], [18199, 13]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 13], [1960, 14], [13720, 15]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [7555, 10], [19315, 11]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 11], [3076, 12], [14836, 13]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 11], [3076, 12], [14836, 13]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14], [10357, 15]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [4192, 10], [15952, 11]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 12], [11473, 13]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 12], [11473, 13]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14], [6994, 15], [18754, 16]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 9], [832, 10], [12592, 11]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 12], [8110, 13], [19870, 14]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 12], [8110, 13], [19870, 14]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14], [3631, 15], [15391, 16]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [9229, 11]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 12], [4747, 13], [16507, 14]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 12], [4747, 13], [16507, 14]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 14], [268, 15], [12028, 16]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [5866, 11], [17626, 12]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 12], [1384, 13], [13144, 14]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 12], [1384, 13], [13144, 14]] }, { quality: null, resolution: "2K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 15], [8665, 16]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 10], [2503, 11], [14263, 12]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 13], [9781, 14]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 13], [9781, 14]] }, { quality: null, resolution: "2K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 15], [5302, 16], [17062, 17]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [10900, 12]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 13], [6421, 14], [18181, 15]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 13], [6421, 14], [18181, 15]] }, { quality: null, resolution: "2K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 15], [1939, 16], [13699, 17]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [7537, 12], [19297, 13]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 13], [3058, 14], [14818, 15]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 13], [3058, 14], [14818, 15]] }, { quality: null, resolution: "2K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 16], [10336, 17]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [4174, 12], [15934, 13]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 14], [11455, 15]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 14], [11455, 15]] }, { quality: null, resolution: "2K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 16], [6973, 17], [18733, 18]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 11], [811, 12], [12571, 13]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 14], [8092, 15], [19852, 16]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 14], [8092, 15], [19852, 16]] }, { quality: null, resolution: "2K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 16], [3610, 17], [15370, 18]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [9208, 13]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 14], [4729, 15], [16489, 16]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 14], [4729, 15], [16489, 16]] }, { quality: null, resolution: "2K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 16], [250, 17], [12010, 18]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 12], [5845, 13], [17605, 14]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 14], [1366, 15], [13126, 16]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 14], [1366, 15], [13126, 16]] }, { quality: null, resolution: "2K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 17], [8647, 18]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [10918, 10]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 11], [6439, 12], [18199, 13]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 11], [6439, 12], [18199, 13]] }, { quality: null, resolution: "2K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 13], [1960, 14], [13720, 15]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [7555, 10], [19315, 11]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 11], [3076, 12], [14836, 13]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 11], [3076, 12], [14836, 13]] }, { quality: null, resolution: "2K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 14], [10357, 15]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [4192, 10], [15952, 11]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 12], [11473, 13]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 12], [11473, 13]] }, { quality: null, resolution: "2K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 14], [6994, 15], [18754, 16]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 9], [832, 10], [12592, 11]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 12], [8110, 13], [19870, 14]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 12], [8110, 13], [19870, 14]] }, { quality: null, resolution: "2K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 14], [3631, 15], [15391, 16]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 10], [9229, 11]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 12], [4747, 13], [16507, 14]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 12], [4747, 13], [16507, 14]] }, { quality: null, resolution: "2K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 14], [268, 15], [12028, 16]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2518, 20], [14278, 21]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 22], [9799, 23]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 22], [9799, 23]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 24], [5320, 25], [17080, 26]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [10915, 21]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 22], [6436, 23], [18196, 24]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 22], [6436, 23], [18196, 24]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 24], [1957, 25], [13717, 26]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [7552, 21], [19312, 22]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 22], [3073, 23], [14833, 24]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 22], [3073, 23], [14833, 24]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 25], [10354, 26]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [4192, 21], [15952, 22]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 23], [11470, 24]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 23], [11470, 24]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 25], [6991, 26], [18751, 27]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 20], [829, 21], [12589, 22]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 23], [8107, 24], [19867, 25]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 23], [8107, 24], [19867, 25]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 25], [3628, 26], [15388, 27]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [9226, 22]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 23], [4744, 24], [16504, 25]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 23], [4744, 24], [16504, 25]] }, { quality: null, resolution: "4K", referenceImages: 5, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 25], [265, 26], [12025, 27]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [5863, 22], [17623, 23]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 23], [1381, 24], [13141, 25]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 23], [1381, 24], [13141, 25]] }, { quality: null, resolution: "4K", referenceImages: 6, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 26], [8662, 27]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 21], [2500, 22], [14260, 23]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 24], [9781, 25]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 24], [9781, 25]] }, { quality: null, resolution: "4K", referenceImages: 7, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 26], [5299, 27], [17059, 28]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [10897, 23]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 24], [6418, 25], [18178, 26]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 24], [6418, 25], [18178, 26]] }, { quality: null, resolution: "4K", referenceImages: 8, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 26], [1936, 27], [13696, 28]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [7534, 23], [19294, 24]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 24], [3055, 25], [14815, 26]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 24], [3055, 25], [14815, 26]] }, { quality: null, resolution: "4K", referenceImages: 9, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 27], [10333, 28]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [4171, 23], [15931, 24]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 25], [11452, 26]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 25], [11452, 26]] }, { quality: null, resolution: "4K", referenceImages: 10, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 27], [6970, 28], [18730, 29]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 22], [808, 23], [12568, 24]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 25], [8089, 26], [19849, 27]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 25], [8089, 26], [19849, 27]] }, { quality: null, resolution: "4K", referenceImages: 11, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 27], [3610, 28], [15370, 29]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: false, promptBands: [[0, 23], [9205, 24]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: false, imageSearch: true, promptBands: [[0, 25], [4726, 26], [16486, 27]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: false, promptBands: [[0, 25], [4726, 26], [16486, 27]] }, { quality: null, resolution: "4K", referenceImages: 12, ecoMode: false, webSearch: true, imageSearch: true, promptBands: [[0, 27], [247, 28], [12007, 29]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 19], [2518, 20], [14278, 21]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 22], [9799, 23]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 22], [9799, 23]] }, { quality: null, resolution: "4K", referenceImages: 0, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 24], [5320, 25], [17080, 26]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 20], [10915, 21]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 22], [6436, 23], [18196, 24]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 22], [6436, 23], [18196, 24]] }, { quality: null, resolution: "4K", referenceImages: 1, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 24], [1957, 25], [13717, 26]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 20], [7552, 21], [19312, 22]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 22], [3073, 23], [14833, 24]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 22], [3073, 23], [14833, 24]] }, { quality: null, resolution: "4K", referenceImages: 2, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 25], [10354, 26]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 20], [4192, 21], [15952, 22]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 23], [11470, 24]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 23], [11470, 24]] }, { quality: null, resolution: "4K", referenceImages: 3, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 25], [6991, 26], [18751, 27]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: false, promptBands: [[0, 20], [829, 21], [12589, 22]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: false, imageSearch: true, promptBands: [[0, 23], [8107, 24], [19867, 25]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: false, promptBands: [[0, 23], [8107, 24], [19867, 25]] }, { quality: null, resolution: "4K", referenceImages: 4, ecoMode: true, webSearch: true, imageSearch: true, promptBands: [[0, 25], [3628, 26], [15388, 27]] }] } }] };

// plugins/podplo-dsh/src/generation-local-pricing.ts
function referenceCount(userReferences, presetReferences) {
  const ids = [...userReferences ?? [], ...Array.isArray(presetReferences) ? presetReferences : []].filter((value) => typeof value === "string" && !!value);
  return new Set(ids).size;
}
var identity = (value) => typeof value === "string" ? value.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
var bundledModels = new Map(generation_credit_rules_default.models.flatMap((model) => [model.key, model.name].map((key) => [identity(key), model])));
function calculateLocalGenerationQuote(model, input) {
  const bundled = model && [model.id, model.modelId, model.key, model.name, model.label, model.modelName].map((value) => bundledModels.get(identity(value))).find(Boolean);
  const rule = bundled?.rule;
  const count = input.count;
  const resolution = input.resolution || (typeof model?.defaultResolution === "string" ? model.defaultResolution : bundled?.defaultResolution ?? "");
  const quality = input.quality || (typeof model?.defaultQuality === "string" ? model.defaultQuality : bundled?.defaultQuality ?? void 0);
  if (!isGenerationCreditPricingRule(rule) || !resolution || !Number.isSafeInteger(count) || count < 1) return void 0;
  try {
    const creditsPerImage = calculateGenerationCreditsFromRule(rule, {
      quality: quality ?? null,
      resolution,
      prompt: input.prompt,
      referenceImageCount: referenceCount(input.referenceAssetIds, input.presetReferenceAssetIds),
      ecoMode: input.ecoMode,
      webSearch: input.webSearch,
      imageSearch: input.imageSearch
    });
    const totalCredits = creditsPerImage * count;
    if (!Number.isSafeInteger(creditsPerImage) || creditsPerImage < 0 || !Number.isSafeInteger(totalCredits)) return void 0;
    return { creditsPerImage, totalCredits, outputCount: count };
  } catch {
    return void 0;
  }
}

// plugins/podplo-dsh/src/generation-panel.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var imageTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp"]);
var errorText = (error) => error instanceof Error ? error.message : "\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002";
var uuid = () => typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
var stringList = (value) => Array.isArray(value) ? value.filter((item) => typeof item === "string" && !!item) : [];
var modelId = (model) => String(model.id ?? model.modelId ?? "");
var modelName = (model) => String(model.name ?? model.label ?? model.modelName ?? modelId(model));
var modelDisplayOrder = new Map([
  "GPT Image 2.5 Flare",
  "GPT Image 2.5 Sunburst",
  "GPT Image 2",
  "GPT Image 1.5"
].map((name, index) => [name.toLowerCase(), index]));
var normalizedChoice = (options, current, fallback) => {
  if (options.includes(current)) return current;
  return typeof fallback === "string" && options.includes(fallback) ? fallback : options[0] ?? "";
};
var capabilityModels = (value) => Array.isArray(value?.models) ? value.models : [];
var availableModel = (value, preferred) => {
  const rows = capabilityModels(value);
  return rows.find((row) => modelId(row) === preferred && row.availableForCurrentPlan !== false) ?? rows.find((row) => row.availableForCurrentPlan !== false) ?? rows[0];
};
var publicChoices = (rows, families = {}) => {
  const direct = rows.filter((row) => row.executable === true && row.kind !== "family").map((row) => ({
    id: `library:${row.executionSlug || row.slug}`,
    slug: row.executionSlug || row.slug,
    title: row.title,
    version: row.version || "\u5F53\u524D\u7248\u672C",
    source: "library",
    kind: "skill",
    available: true,
    coverUrl: row.thumbnailUrl || row.coverUrl || row.imageUrl
  }));
  const familyChoices = rows.filter((row) => row.kind === "family").map((row) => ({
    id: `family:${row.slug}`,
    slug: row.slug,
    title: row.title,
    version: row.version || "\u5F53\u524D\u7248\u672C",
    source: "library",
    kind: "family",
    available: true,
    coverUrl: row.thumbnailUrl || row.coverUrl || row.imageUrl
  }));
  const members = Object.values(families).flatMap((data) => (Array.isArray(data?.members) ? data.members : []).filter((member) => member.executable === true).map((member) => ({
    id: `library:${member.executionSlug || member.slug}`,
    slug: member.executionSlug || member.slug,
    title: member.title,
    version: member.version || "\u5F53\u524D\u7248\u672C",
    family: data.title,
    source: "library",
    kind: "skill",
    available: true,
    coverUrl: member.thumbnailUrl || member.coverUrl || member.imageUrl
  })));
  return [...new Map([...direct, ...familyChoices, ...members].map((row) => [row.id, row])).values()];
};
var personalChoices = (rows) => rows.map((row) => ({
  id: `personal:${row.id}`,
  generationId: row.id,
  title: row.name,
  version: row.updatedAt,
  source: "personal",
  kind: "skill",
  available: true
}));
var directSkillChoice = (id, title, coverUrl) => {
  const library = id.startsWith("library:");
  const target2 = id.slice(library ? "library:".length : "personal:".length);
  return {
    id,
    title: title || target2,
    slug: library ? target2 : void 0,
    generationId: library ? void 0 : target2,
    version: "",
    kind: "skill",
    source: library ? "library" : "personal",
    coverUrl,
    available: true
  };
};
var exactOperation = (value, intentId, planVersion) => value && typeof value.operationId === "string" && typeof value.approvalId === "string" && value.intentId === intentId && value.planVersion === planVersion && typeof value.status === "string" && value.quote && Number.isFinite(Number(value.quote.totalCredits)) && Number.isFinite(Number(value.quote.outputCount)) && typeof value.quote.confirmationText === "string" && typeof value.quote.expiresAt === "string" ? value : void 0;
var ratioGlyphStyle = (value) => {
  if (!value.includes(":")) return void 0;
  const [wide, tall] = value.split(":").map(Number);
  if (!wide || !tall) return void 0;
  const scale = Math.min(18 / wide, 16 / tall);
  return { width: Math.max(5, wide * scale), height: Math.max(5, tall * scale) };
};
var argsForCapabilities = (caps, selected, values) => {
  const props = caps?.quoteInputSchema?.properties ?? {};
  const args = {};
  const put = (key, value) => {
    if (props[key] !== void 0 && value !== "" && value !== void 0) args[key] = value;
  };
  put("prompt", values.prompt.trim());
  put("modelId", values.model);
  put("referenceAssetIds", values.references);
  put("ratio", values.ratio.trim());
  put("count", values.count);
  if (stringList(selected?.qualities).length) put("quality", values.quality);
  if (stringList(selected?.resolutions).length) put("resolution", values.resolution);
  if (stringList(selected?.thinkingLevels).length) put("thinkingLevel", values.thinkingLevel);
  if (selected?.supportsWebSearch === true) put("webSearch", values.booleans.webSearch === true);
  if (selected?.supportsImageSearch === true) put("imageSearch", values.booleans.imageSearch === true);
  if (Number.isInteger(Number(selected?.ecoMaximumReferenceImages))) put("ecoMode", values.booleans.ecoMode === true);
  Object.assign(args, backgroundArgs(props, selected, values.transparent));
  return args;
};
function GenerationPanel({ request, onChanged, onSubmission, onVerification, onOperationId, onSelectionConsumed, nativeSessionId, accountKey, placement = "inline", selection, revealSequence = 0 }) {
  const [capabilities, setCapabilities] = (0, import_react3.useState)();
  const [skills, setSkills] = (0, import_react3.useState)([]);
  const [skillId, setSkillId] = (0, import_react3.useState)("");
  const [skillLoading, setSkillLoading] = (0, import_react3.useState)("");
  const [skillError, setSkillError] = (0, import_react3.useState)("");
  const [assets, setAssets] = (0, import_react3.useState)([]);
  const [assetCursor, setAssetCursor] = (0, import_react3.useState)(null);
  const [references, setReferences] = (0, import_react3.useState)([]);
  const [uploadPreviews, setUploadPreviews] = (0, import_react3.useState)([]);
  const [prompt, setPrompt] = (0, import_react3.useState)("");
  const [model, setModel] = (0, import_react3.useState)("");
  const [ratio, setRatio] = (0, import_react3.useState)("1:1");
  const [quality, setQuality] = (0, import_react3.useState)("");
  const [resolution, setResolution] = (0, import_react3.useState)("");
  const [thinkingLevel, setThinkingLevel] = (0, import_react3.useState)("");
  const [count, setCount] = (0, import_react3.useState)(1);
  const [transparent, setTransparent] = (0, import_react3.useState)(false);
  const [booleans, setBooleans] = (0, import_react3.useState)({});
  const [intentId, setIntentId] = (0, import_react3.useState)(uuid);
  const [planVersion, setPlanVersion] = (0, import_react3.useState)(1);
  const [operation, setOperation] = (0, import_react3.useState)();
  const [busy, setBusy] = (0, import_react3.useState)("");
  const [loading, setLoading] = (0, import_react3.useState)(true);
  const [error, setError] = (0, import_react3.useState)("");
  const [notice, setNotice] = (0, import_react3.useState)("");
  const [priceVerification, setPriceVerification] = (0, import_react3.useState)("");
  const approving = (0, import_react3.useRef)(false);
  const [approvalAttempted, setApprovalAttempted] = (0, import_react3.useState)(false);
  const [uploadWarning, setUploadWarning] = (0, import_react3.useState)("");
  const [uploadProgress, setUploadProgress] = (0, import_react3.useState)("");
  const uploading = (0, import_react3.useRef)(false);
  const [composerFocused, setComposerFocused] = (0, import_react3.useState)(false);
  const [draftHydrated, setDraftHydrated] = (0, import_react3.useState)(false);
  const [floatingOpen, setFloatingOpen] = (0, import_react3.useState)(false);
  const uploadInput = (0, import_react3.useRef)(null);
  const preparing = (0, import_react3.useRef)(false);
  const mounted = (0, import_react3.useRef)(true);
  const ownerId = (0, import_react3.useRef)("");
  const loadSequence = (0, import_react3.useRef)(0);
  const skillSequence = (0, import_react3.useRef)(0);
  const prepareSequence = (0, import_react3.useRef)(0);
  const draftReady = (0, import_react3.useRef)(false);
  const restoredSkillId = (0, import_react3.useRef)("");
  const cacheRevision = (0, import_react3.useRef)(generationBootstrapCache.revision());
  const currentIntent = (0, import_react3.useRef)(intentId);
  const currentPlanVersion = (0, import_react3.useRef)(planVersion);
  currentIntent.current = intentId;
  currentPlanVersion.current = planVersion;
  const requestContext = (0, import_react3.useRef)({ request, nativeSessionId, accountKey });
  requestContext.current = { request, nativeSessionId, accountKey };
  const selectedSkillId = (0, import_react3.useRef)(skillId);
  selectedSkillId.current = skillId;
  const selections = (0, import_react3.useRef)({ model, ratio, quality, resolution, thinkingLevel, booleans, transparent });
  selections.current = { model, ratio, quality, resolution, thinkingLevel, booleans, transparent };
  const floatingShell = (0, import_react3.useRef)(null);
  const consumedSelection = (0, import_react3.useRef)(0);
  const schema = capabilities?.quoteInputSchema;
  const properties = schema?.properties ?? {};
  const models = (0, import_react3.useMemo)(() => [...capabilityModels(capabilities)].sort((a, b) => (modelDisplayOrder.get(modelName(a).toLowerCase()) ?? modelDisplayOrder.size) - (modelDisplayOrder.get(modelName(b).toLowerCase()) ?? modelDisplayOrder.size)), [capabilities]);
  const selectedModel = models.find((row) => modelId(row) === model);
  const modelRatios = stringList(selectedModel?.ratios);
  const modelQualities = stringList(selectedModel?.qualities);
  const modelResolutions = stringList(selectedModel?.resolutions);
  const modelThinkingLevels = stringList(selectedModel?.thinkingLevels);
  const supportsWebSearch = properties.webSearch?.type === "boolean" && selectedModel?.supportsWebSearch === true;
  const supportsImageSearch = properties.imageSearch?.type === "boolean" && selectedModel?.supportsImageSearch === true;
  const supportsEcoMode = properties.ecoMode?.type === "boolean" && Number.isInteger(Number(selectedModel?.ecoMaximumReferenceImages));
  const transparentOption = transparentControl(properties, selectedModel);
  const transparentKey = transparentOption?.key;
  const supportsTransparent = !!transparentOption;
  const selectedSkill = skills.find((row) => row.id === skillId);
  const selectedModelLabel = selectedModel ? modelName(selectedModel) : "\u9009\u62E9\u6A21\u578B";
  const localQuote = (0, import_react3.useMemo)(() => calculateLocalGenerationQuote(selectedModel, {
    prompt,
    quality,
    resolution,
    count,
    referenceAssetIds: references,
    presetReferenceAssetIds: selectedSkill?.source === "personal" ? selectedSkill.detail?.referenceAssetIds : void 0,
    ecoMode: booleans.ecoMode === true,
    webSearch: booleans.webSearch === true,
    imageSearch: booleans.imageSearch === true
  }), [
    booleans.ecoMode,
    booleans.imageSearch,
    booleans.webSearch,
    count,
    prompt,
    quality,
    references,
    resolution,
    selectedModel,
    selectedSkill?.detail?.referenceAssetIds,
    selectedSkill?.source
  ]);
  const pendingUploadCount = uploadPreviews.filter((row) => row.status !== "failed").length;
  const uploadFeedback = uploadWarning || uploadPreviews.filter((row) => row.status === "failed").map((row) => `${row.filename}\uFF1A${row.message || "\u4E0A\u4F20\u672A\u5B8C\u6210"}`).join("\uFF1B");
  const visibleUploadProgress = uploadProgress || (pendingUploadCount ? `\u6B63\u5728\u4E0A\u4F20\u5904\u7406\u4E2D ${pendingUploadCount} \u5F20\u2026` : "");
  const referenceLimit = (0, import_react3.useMemo)(() => {
    const modelLimit = booleans.ecoMode === true && supportsEcoMode ? Number(selectedModel?.ecoMaximumReferenceImages) : Number(selectedModel?.maximumReferenceImages);
    const schemaLimit = Number(properties.referenceAssetIds?.maxItems);
    return Math.min(Number.isFinite(modelLimit) ? modelLimit : Infinity, Number.isFinite(schemaLimit) ? schemaLimit : Infinity);
  }, [booleans.ecoMode, properties.referenceAssetIds?.maxItems, selectedModel?.ecoMaximumReferenceImages, selectedModel?.maximumReferenceImages, supportsEcoMode]);
  const countMinimum = Math.max(1, Number(properties.count?.minimum) || 1);
  const countMaximum = Math.max(countMinimum, Number(properties.count?.maximum) || 4);
  const invalidate = (0, import_react3.useCallback)(() => {
    const nextPlanVersion = Math.min(1e6, planVersion + 1);
    if (ownerId.current && nativeSessionId && generationBootstrapCache.isCurrent(cacheRevision.current)) {
      generationBootstrapCache.advanceDraftPlan(ownerId.current, nativeSessionId, intentId, planVersion, nextPlanVersion);
    }
    currentPlanVersion.current = nextPlanVersion;
    setPlanVersion(nextPlanVersion);
    setApprovalAttempted(false);
    setNotice("");
    setPriceVerification("");
    setOperation((previous) => {
      if (previous?.status === "quoted") void request("generation.cancel", { operationId: previous.operationId }).catch(() => {
      });
      return void 0;
    });
  }, [intentId, nativeSessionId, planVersion, request]);
  const change = (setter, value) => {
    invalidate();
    setter(value);
  };
  const changeBoolean = (key, value) => {
    invalidate();
    setBooleans((current) => ({ ...current, [key]: value }));
  };
  const loadAssets = (0, import_react3.useCallback)(async (append = false) => {
    const { data } = await request("assets.list", { limit: 50, ...append && assetCursor ? { cursor: assetCursor } : {} });
    const rows = (Array.isArray(data?.items) ? data.items : []).filter((row) => row.status === "ready");
    const nextCursor = typeof data?.nextCursor === "string" && data.nextCursor ? data.nextCursor : null;
    setAssets((current) => {
      const next = append ? [...new Map([...current, ...rows].map((row) => [row.id, row])).values()] : rows;
      const cached = ownerId.current ? generationBootstrapCache.update(ownerId.current, { assets: next, assetCursor: nextCursor }) : void 0;
      return cached ? cached.assets : next;
    });
    setAssetCursor(nextCursor);
  }, [assetCursor, request]);
  const applyCapabilities = (0, import_react3.useCallback)((nextCapabilities) => {
    if (nextCapabilities?.available !== true) {
      setCapabilities(void 0);
      return;
    }
    setCapabilities(nextCapabilities);
    const current = selections.current;
    const nextModel = availableModel(nextCapabilities, current.model);
    setModel(modelId(nextModel ?? {}));
    setRatio(normalizedChoice(stringList(nextModel?.ratios), current.ratio, stringList(nextModel?.ratios)[0]));
    setQuality(normalizedChoice(stringList(nextModel?.qualities), current.quality, nextModel?.defaultQuality));
    setResolution(normalizedChoice(stringList(nextModel?.resolutions), current.resolution, nextModel?.defaultResolution));
    setThinkingLevel(normalizedChoice(stringList(nextModel?.thinkingLevels), current.thinkingLevel, nextModel?.defaultThinkingLevel));
    const nextProperties = nextCapabilities.quoteInputSchema?.properties ?? {};
    const defaults = {};
    for (const [key, value] of Object.entries(nextProperties)) if (value.type === "boolean" && !/transparent/i.test(key)) defaults[key] = value.default === true;
    setBooleans({
      ...defaults,
      ...current.booleans,
      webSearch: nextModel?.supportsWebSearch === true && current.booleans.webSearch === true,
      imageSearch: nextModel?.supportsImageSearch === true && current.booleans.imageSearch === true,
      ecoMode: Number.isInteger(Number(nextModel?.ecoMaximumReferenceImages)) && current.booleans.ecoMode === true
    });
  }, []);
  const applyBootstrap = (0, import_react3.useCallback)((value) => {
    applyCapabilities(value.capabilities);
    const nextSkills = [...personalChoices(value.personalRows), ...publicChoices(value.publicRows, value.families)];
    setSkills((previous) => {
      const next = nextSkills.map((row) => {
        const verified = previous.find((item) => item.id === row.id && item.version === row.version && item.detail);
        return verified ? { ...row, generationId: verified.generationId, detail: verified.detail } : row;
      });
      const selected = previous.find((row) => row.id === selectedSkillId.current);
      return selected && !next.some((row) => row.id === selected.id) ? [...next, selected] : next;
    });
    setAssets(value.assets);
    setAssetCursor(value.assetCursor);
  }, [applyCapabilities]);
  const load = (0, import_react3.useCallback)(async (force = false) => {
    const sequence = ++loadSequence.current;
    let expectedRevision = cacheRevision.current;
    setLoading(true);
    setError("");
    try {
      const parentOwner = accountKey && accountKey !== "anonymous" ? accountKey : void 0;
      const snapshot = parentOwner ? void 0 : await request("snapshot", {});
      const nextOwner = parentOwner ?? snapshot?.data?.account?.userId;
      if (typeof nextOwner !== "string" || !nextOwner) {
        generationBootstrapCache.clear();
        expectedRevision = generationBootstrapCache.revision();
        cacheRevision.current = expectedRevision;
        throw new Error("\u8BF7\u5148\u767B\u5F55 PodPlo\u3002");
      }
      if (!generationBootstrapCache.isCurrent(expectedRevision)) return;
      ownerId.current = nextOwner;
      setUploadPreviews(generationBootstrapCache.readReferenceUploads(nextOwner, nativeSessionId ?? "podplo-manual"));
      let restoredDraft;
      if (!draftReady.current && nativeSessionId) {
        const draft = generationBootstrapCache.readDraft(nextOwner, nativeSessionId);
        if (draft) {
          restoredDraft = draft;
          restoredSkillId.current = draft.skillId;
          selectedSkillId.current = draft.skillId;
          selections.current = {
            model: draft.model,
            ratio: draft.ratio,
            quality: draft.quality,
            resolution: draft.resolution,
            thinkingLevel: draft.thinkingLevel,
            booleans: draft.booleans,
            transparent: draft.transparent
          };
          setPrompt(draft.prompt);
          setSkillId(draft.skillId);
          setModel(draft.model);
          setRatio(draft.ratio);
          setQuality(draft.quality);
          setResolution(draft.resolution);
          setThinkingLevel(draft.thinkingLevel);
          setCount(draft.count);
          setTransparent(draft.transparent);
          setBooleans(draft.booleans);
          setReferences(draft.references);
          currentIntent.current = draft.intentId;
          currentPlanVersion.current = draft.planVersion;
          if (/^(library|personal):/.test(draft.skillId)) {
            setSkills((rows) => rows.some((row) => row.id === draft.skillId) ? rows : [...rows, directSkillChoice(draft.skillId)]);
          }
          setIntentId(draft.intentId);
          setPlanVersion(draft.planVersion);
          const restoredOperation = exactOperation(draft.operation ?? generationBootstrapCache.readOperation(nextOwner, nativeSessionId, draft.intentId, draft.planVersion), draft.intentId, draft.planVersion);
          setOperation(restoredOperation);
          setApprovalAttempted(draft.approvalAttempted === true);
        }
        draftReady.current = true;
        setDraftHydrated(true);
      }
      if (restoredDraft && nativeSessionId) {
        const expectedIntent = restoredDraft.intentId;
        const expectedPlan = restoredDraft.planVersion;
        const restore = (candidate) => {
          const exact = exactOperation(candidate, expectedIntent, expectedPlan);
          if (!exact || sequence !== loadSequence.current || ownerId.current !== nextOwner || !generationBootstrapCache.isCurrent(expectedRevision) || currentIntent.current !== expectedIntent || currentPlanVersion.current !== expectedPlan) return;
          if (!generationBootstrapCache.rememberOperation(nextOwner, nativeSessionId, exact)) return;
          setOperation(exact);
        };
        const pending = generationBootstrapCache.readPendingPrepare(nextOwner, nativeSessionId, expectedIntent, expectedPlan);
        if (pending) void pending.then(restore).catch(() => {
        });
        if (!restoredDraft.operation && !generationBootstrapCache.readOperation(nextOwner, nativeSessionId, expectedIntent, expectedPlan)) {
          void request("generation.list", {}).then((result) => {
            const exact = (Array.isArray(result.data?.items) ? result.data.items : []).find((row) => row.intentId === expectedIntent && row.planVersion === expectedPlan);
            restore(exact);
          }).catch(() => {
          });
        }
      }
      const cached = generationBootstrapCache.read(nextOwner);
      const seeded = cached ?? generationBootstrapCache.ensure(nextOwner);
      if (cached && generationBootstrapCache.isCurrent(expectedRevision)) applyBootstrap(cached);
      const value = await generationBootstrapCache.refresh(nextOwner, async (publishCache) => {
        const publish = (patch) => {
          const value2 = publishCache(patch);
          if (value2 && sequence === loadSequence.current && ownerId.current === nextOwner && generationBootstrapCache.isCurrent(expectedRevision)) applyBootstrap(value2);
        };
        const warnings = [];
        const settle = async (label, task, apply2) => {
          try {
            const result = await task;
            apply2(result.data);
          } catch (error2) {
            warnings.push(`${label}\uFF1A${errorText(error2)}`);
          }
        };
        await Promise.all([
          settle("\u751F\u56FE\u80FD\u529B", request("generation.capabilities", { refresh: force }), (data) => {
            if (data?.available !== true) warnings.push("\u751F\u56FE\u80FD\u529B\uFF1A\u5F53\u524D\u670D\u52A1\u672A\u63D0\u4F9B\u53EF\u9A8C\u8BC1\u7684\u62A5\u4EF7\u80FD\u529B");
            publish({ capabilities: data });
          }),
          settle("Skill \u5E93", request("skills.list", { query: "" }), (data) => publish({ publicRows: Array.isArray(data?.items) ? data.items : [] })),
          settle("\u6211\u7684 Skill", request("mySkills.list", { query: "" }), (data) => publish({ personalRows: Array.isArray(data?.items) ? data.items : [] })),
          settle("\u53C2\u8003\u7D20\u6750", request("assets.list", { limit: 50 }), (data) => publish({
            assets: (Array.isArray(data?.items) ? data.items : []).filter((row) => row.status === "ready"),
            assetCursor: typeof data?.nextCursor === "string" && data.nextCursor ? data.nextCursor : null
          }))
        ]);
        const confirmed = await request("snapshot", {});
        if (confirmed.data?.account?.userId !== nextOwner) throw new Error("\u8D26\u53F7\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u751F\u56FE\u5DE5\u4F5C\u53F0\u3002");
        const current = generationBootstrapCache.read(nextOwner) ?? seeded;
        return {
          capabilities: current.capabilities,
          publicRows: current.publicRows,
          personalRows: current.personalRows,
          assets: current.assets,
          assetCursor: current.assetCursor,
          warnings
        };
      });
      if (sequence === loadSequence.current && ownerId.current === nextOwner && generationBootstrapCache.isCurrent(expectedRevision)) {
        applyBootstrap(value);
        if (value.warnings.length) setError(`\u90E8\u5206\u5185\u5BB9\u66F4\u65B0\u5931\u8D25\uFF1A${value.warnings.join("\uFF1B")}\u3002\u53EF\u7EE7\u7EED\u4F7F\u7528\u5DF2\u52A0\u8F7D\u5185\u5BB9\u6216\u91CD\u8BD5\u3002`);
      }
    } catch (error2) {
      if (sequence === loadSequence.current && generationBootstrapCache.isCurrent(expectedRevision)) setError(`\u751F\u56FE\u5DE5\u4F5C\u53F0\u66F4\u65B0\u5931\u8D25\uFF1A${errorText(error2)} \u53EF\u4FDD\u7559\u5F53\u524D\u5185\u5BB9\u5E76\u91CD\u8BD5\u3002`);
    } finally {
      if (sequence === loadSequence.current && generationBootstrapCache.isCurrent(expectedRevision)) setLoading(false);
    }
  }, [accountKey, applyBootstrap, nativeSessionId, request]);
  (0, import_react3.useEffect)(() => {
    mounted.current = true;
    void load(false);
    return () => {
      mounted.current = false;
      loadSequence.current += 1;
      skillSequence.current += 1;
      prepareSequence.current += 1;
    };
  }, []);
  (0, import_react3.useEffect)(() => {
    if (!draftHydrated || !nativeSessionId || !ownerId.current) return;
    const owner = ownerId.current;
    return generationBootstrapCache.subscribeDraft(owner, nativeSessionId, () => {
      if (!mounted.current || !generationBootstrapCache.isCurrent(cacheRevision.current)) return;
      setUploadPreviews(generationBootstrapCache.readReferenceUploads(owner, nativeSessionId));
      const draft = generationBootstrapCache.readDraft(owner, nativeSessionId);
      if (!draft) return;
      currentPlanVersion.current = draft.planVersion;
      setReferences(draft.references);
      setPlanVersion(draft.planVersion);
      setOperation(draft.operation);
      setApprovalAttempted(draft.approvalAttempted === true);
      const bootstrap = generationBootstrapCache.read(owner);
      if (bootstrap) setAssets(bootstrap.assets);
    });
  }, [accountKey, draftHydrated, nativeSessionId]);
  (0, import_react3.useEffect)(() => {
    if (!draftHydrated || !draftReady.current || !nativeSessionId || !ownerId.current || !generationBootstrapCache.isCurrent(cacheRevision.current)) return;
    generationBootstrapCache.writeDraft(ownerId.current, nativeSessionId, {
      prompt,
      skillId,
      model,
      ratio,
      quality,
      resolution,
      thinkingLevel,
      count,
      transparent,
      booleans,
      references,
      intentId,
      planVersion,
      operation: exactOperation(operation, intentId, planVersion),
      approvalAttempted
    });
  }, [approvalAttempted, booleans, count, draftHydrated, intentId, model, nativeSessionId, operation, planVersion, prompt, quality, ratio, references, resolution, skillId, thinkingLevel, transparent]);
  (0, import_react3.useEffect)(() => {
    if (!operation || !["quoted", "submitting", "submitted", "submission_unknown", "partial_unknown"].includes(operation.status)) return;
    let active = true;
    const refresh = async () => {
      try {
        const { data } = await request("generation.list", {});
        const latest = (Array.isArray(data?.items) ? data.items : []).find((row) => row.operationId === operation.operationId);
        if (active && generationBootstrapCache.isCurrent(cacheRevision.current) && latest) {
          const exact = exactOperation(latest, operation.intentId, operation.planVersion);
          if (exact) {
            if (ownerId.current && nativeSessionId) generationBootstrapCache.rememberOperation(ownerId.current, nativeSessionId, exact);
            setOperation((current) => current?.operationId === exact.operationId ? exact : current);
          }
        }
      } catch {
      }
    };
    const timer = setInterval(() => void refresh(), 1500);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [nativeSessionId, operation?.intentId, operation?.operationId, operation?.planVersion, operation?.status, request]);
  (0, import_react3.useEffect)(() => {
    if (operation?.status !== "quoted") return;
    const delay = Date.parse(operation.quote.expiresAt) - Date.now();
    if (!Number.isFinite(delay)) return;
    const timer = setTimeout(() => {
      setNotice("\u670D\u52A1\u7AEF\u6838\u9A8C\u79EF\u5206\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u70B9\u51FB\u751F\u6210\u3002");
      invalidate();
    }, Math.max(0, delay) + 25);
    return () => clearTimeout(timer);
  }, [invalidate, operation?.operationId, operation?.quote.expiresAt, operation?.status]);
  (0, import_react3.useEffect)(() => {
    if (!draftReady.current || !generationBootstrapCache.isCurrent(cacheRevision.current) || !selectedSkill || restoredSkillId.current !== selectedSkill.id || selectedSkill.kind === "family" || selectedSkill.detail || skillLoading) return;
    restoredSkillId.current = "";
    const sequence = ++skillSequence.current;
    const expectedOwner = ownerId.current;
    const expectedId = selectedSkill.id;
    setSkillLoading(expectedId);
    void fetchSkillDetail(selectedSkill).then((latest) => {
      if (!mounted.current || !generationBootstrapCache.isCurrent(cacheRevision.current) || sequence !== skillSequence.current || expectedOwner !== ownerId.current) return;
      setSkills((rows) => rows.map((row) => row.id === expectedId ? latest : row));
    }).catch((error2) => {
      if (mounted.current && generationBootstrapCache.isCurrent(cacheRevision.current) && sequence === skillSequence.current && expectedOwner === ownerId.current) setSkillError(`\u65E0\u6CD5\u6062\u590D\u5DF2\u9009 Skill \u7684\u5B8C\u6574\u8BE6\u60C5\uFF1A${errorText(error2)}`);
    }).finally(() => {
      if (mounted.current && generationBootstrapCache.isCurrent(cacheRevision.current) && sequence === skillSequence.current) setSkillLoading("");
    });
  }, [selectedSkill?.detail, selectedSkill?.id, selectedSkill?.kind, selectedSkill?.version, skillLoading]);
  (0, import_react3.useEffect)(() => {
    if (!selection || consumedSelection.current === selection.sequence || !draftHydrated) return;
    if (selection.kind === "skill") {
      const targetId = selection.locator.skillSlug ? `library:${selection.locator.skillSlug}` : `personal:${selection.id}`;
      consumedSelection.current = selection.sequence;
      onSelectionConsumed?.(selection.sequence);
      if (selection.private && selection.ownerId !== ownerId.current) {
        setSkillError("\u8D26\u53F7\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9 Skill\u3002");
        return;
      }
      const choice = skills.find((row) => row.id === targetId) ?? directSkillChoice(targetId, selection.label, selection.previewUrl);
      void selectSkill(targetId, choice);
      return;
    }
    if (selection.kind === "gallery") {
      consumedSelection.current = selection.sequence;
      const expected = selection.sequence;
      onSelectionConsumed?.(selection.sequence);
      void request("gallery.importReference", { id: selection.locator.galleryId || selection.id }).then(({ data }) => {
        if (consumedSelection.current !== expected) return;
        const asset = data?.asset ?? data;
        if (!asset || typeof asset.id !== "string" || !asset.id || asset.status !== "ready") throw new Error("\u56FE\u5E93\u7D20\u6750\u672A\u80FD\u5BFC\u5165\u4E3A\u53EF\u7528\u53C2\u8003\u56FE\u3002");
        setAssets((current) => current.some((row) => row.id === asset.id) ? current : [...current, asset]);
        addReference(asset.id);
      }).catch((error2) => {
        if (consumedSelection.current === expected) setError(errorText(error2));
      });
      return;
    }
    if (selection.kind === "asset") {
      consumedSelection.current = selection.sequence;
      onSelectionConsumed?.(selection.sequence);
      const id = selection.locator.assetId || selection.id;
      setAssets((current) => current.some((row) => row.id === id) ? current : [...current, { id, filename: selection.label, status: "ready", previewUrl: selection.previewUrl }]);
      addReference(id);
    }
  }, [draftHydrated, onSelectionConsumed, selection, skills]);
  (0, import_react3.useEffect)(() => {
    if (placement === "floating" && revealSequence > 0) setFloatingOpen(true);
  }, [placement, revealSequence]);
  (0, import_react3.useEffect)(() => {
    if (placement !== "floating" || !floatingOpen) return;
    const close = (event) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !floatingShell.current?.contains(event.target)) setFloatingOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [floatingOpen, placement]);
  (0, import_react3.useEffect)(() => {
    onOperationId?.(operation?.status === "quoted" ? operation.operationId : void 0);
    return () => onOperationId?.(void 0);
  }, [onOperationId, operation?.operationId, operation?.status]);
  function selectModel(nextId) {
    const next = models.find((row) => modelId(row) === nextId);
    if (!next) return;
    invalidate();
    setModel(nextId);
    setRatio((current) => normalizedChoice(stringList(next.ratios), current, stringList(next.ratios)[0]));
    setQuality((current) => normalizedChoice(stringList(next.qualities), current, next.defaultQuality));
    setResolution((current) => normalizedChoice(stringList(next.resolutions), current, next.defaultResolution));
    setThinkingLevel((current) => normalizedChoice(stringList(next.thinkingLevels), current, next.defaultThinkingLevel));
    setBooleans((current) => ({
      ...current,
      webSearch: next.supportsWebSearch === true && current.webSearch === true,
      imageSearch: next.supportsImageSearch === true && current.imageSearch === true,
      ecoMode: Number.isInteger(Number(next.ecoMaximumReferenceImages)) && current.ecoMode === true
    }));
    if (!transparentControl(properties, next)) setTransparent(false);
  }
  async function fetchSkillDetail(choice) {
    const { data } = choice.source === "personal" ? await request("mySkills.get", { id: choice.generationId, ...choice.version ? { expectedUpdatedAt: choice.version } : {} }) : await request("skills.detail", { slug: choice.slug, resolve: true });
    const generationId = choice.source === "personal" ? choice.generationId : data?.binding?.id;
    if (typeof generationId !== "string" || !generationId) throw new Error("Skill \u8BE6\u60C5\u672A\u8FD4\u56DE\u53EF\u6838\u5BF9\u7684\u751F\u56FE\u7ED1\u5B9A ID");
    if (choice.source === "library" && data?.binding?.availableForCurrentPlan === false) throw new Error("\u8BE5 Skill \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5237\u65B0\u6743\u9650\u540E\u91CD\u8BD5");
    return {
      ...choice,
      title: data?.title || data?.name || choice.title,
      coverUrl: data?.coverImage || choice.coverUrl,
      generationId,
      detail: data,
      version: data?.version || data?.updatedAt || choice.version,
      available: true
    };
  }
  async function selectSkill(nextId, suppliedChoice) {
    const sequence = ++skillSequence.current;
    const expectedOwner = ownerId.current;
    const expectedRevision = cacheRevision.current;
    const current = () => mounted.current && generationBootstrapCache.isCurrent(expectedRevision) && sequence === skillSequence.current && expectedOwner === ownerId.current;
    invalidate();
    setError("");
    setSkillError("");
    setNotice("");
    const choice = suppliedChoice ?? skills.find((row) => row.id === nextId);
    selectedSkillId.current = choice ? nextId : "";
    if (!choice) {
      setSkillId("");
      setSkillLoading("");
      return;
    }
    if (suppliedChoice) setSkills((rows) => rows.some((row) => row.id === nextId) ? rows : [...rows, suppliedChoice]);
    if (choice.kind === "family") {
      setSkillId(nextId);
      setSkillLoading(nextId);
      try {
        const { data } = await request("skills.family", { slug: choice.slug });
        if (!current()) return;
        if (ownerId.current && choice.slug) generationBootstrapCache.rememberFamily(ownerId.current, choice.slug, data);
        const members = publicChoices([], { [choice.slug]: data });
        setSkills((rows) => [...new Map([...rows, ...members].map((row) => [row.id, row])).values()]);
        setSkillId("");
        setNotice(`\u5DF2\u52A0\u8F7D\u300C${choice.title}\u300D\u7684\u53EF\u7528 Skill\uFF0C\u8BF7\u9009\u62E9\u5177\u4F53\u6210\u5458\u3002`);
      } catch (error2) {
        if (current()) setSkillError(`\u65E0\u6CD5\u5C55\u5F00\u8BE5 Skill \u65CF\uFF1A${errorText(error2)}`);
      } finally {
        if (current()) setSkillLoading("");
      }
      return;
    }
    setSkillId(nextId);
    setSkillLoading(nextId);
    try {
      const latest = await fetchSkillDetail(choice);
      if (!current()) return;
      setSkills((rows) => rows.map((row) => row.id === nextId ? latest : row));
    } catch (error2) {
      if (current()) {
        setSkills((rows) => rows.map((row) => row.id === nextId ? { ...row, detail: void 0, generationId: row.source === "personal" ? row.generationId : void 0 } : row));
        setSkillError(`\u65E0\u6CD5\u53D6\u5F97\u8BE5 Skill \u7684\u5B8C\u6574\u8BE6\u60C5\uFF1A${errorText(error2)}`);
      }
    } finally {
      if (current()) setSkillLoading("");
    }
  }
  function addReference(id) {
    const normalized = id.trim();
    if (!normalized || references.includes(normalized)) return;
    change(setReferences, [...references, normalized]);
  }
  function moveReference(index, offset) {
    const target2 = index + offset;
    if (target2 < 0 || target2 >= references.length) return;
    const next = [...references];
    [next[index], next[target2]] = [next[target2], next[index]];
    change(setReferences, next);
  }
  async function upload(files) {
    if (!files.length || busy || uploading.current || !draftReady.current || !ownerId.current || generationBootstrapCache.readReferenceUploads(ownerId.current, nativeSessionId ?? "podplo-manual").some((row) => row.status !== "failed")) return;
    uploading.current = true;
    const expectedOwner = ownerId.current;
    const expectedRevision = cacheRevision.current;
    const sessionId = nativeSessionId;
    const supported = files.filter((file) => imageTypes.has(file.type));
    const invalid = files.length - supported.length;
    const previewSession = sessionId ?? "podplo-manual";
    const previewRows = supported.map((file) => ({ id: uuid(), filename: file.name, previewUrl: URL.createObjectURL(file), status: "queued" }));
    generationBootstrapCache.addReferenceUploads(expectedOwner, previewSession, previewRows, expectedRevision);
    if (mounted.current) setUploadPreviews(generationBootstrapCache.readReferenceUploads(expectedOwner, previewSession));
    const updatePreview = (index, patch) => {
      generationBootstrapCache.updateReferenceUpload(expectedOwner, previewSession, previewRows[index].id, patch, expectedRevision);
      if (mounted.current && current()) setUploadPreviews(generationBootstrapCache.readReferenceUploads(expectedOwner, previewSession));
    };
    const current = () => generationBootstrapCache.isCurrent(expectedRevision) && ownerId.current === expectedOwner;
    const visible = () => current() && mounted.current;
    setBusy("upload");
    setError("");
    setUploadWarning("");
    setUploadProgress(supported.length ? `\u6B63\u5728\u4E0A\u4F20\u5E76\u5904\u7406 0 / ${supported.length} \u5F20\u2026` : "");
    const results = new Array(supported.length);
    const failed = [];
    let cursor = 0;
    let completed = 0;
    let published = 0;
    const worker = async () => {
      for (; ; ) {
        const index = cursor++;
        if (index >= supported.length || !current()) return;
        const file = supported[index];
        updatePreview(index, { status: "uploading" });
        try {
          if (!current()) return;
          const { data } = await request("assets.upload", { file });
          if (!current()) return;
          if (data?.id && data.status === "ready") results[index] = data;
          else {
            const message = "\u4E91\u7AEF\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u4ECE\u6211\u7684\u7D20\u6750\u9009\u62E9";
            failed.push(`${file.name}\uFF1A${message}`);
            updatePreview(index, { status: "failed", message });
          }
        } catch (error2) {
          if (current()) {
            const message = errorText(error2);
            failed.push(`${file.name}\uFF1A${message}`);
            updatePreview(index, { status: "failed", message });
          }
        } finally {
          completed += 1;
        }
        if (!current()) return;
        done.add(index);
        while (done.has(published)) {
          const resultIndex = published++;
          const asset = results[resultIndex];
          if (!asset) continue;
          if (sessionId) {
            const displaced = generationBootstrapCache.readDraft(expectedOwner, sessionId)?.operation;
            if (!generationBootstrapCache.mergeReadyReference(expectedOwner, sessionId, asset, expectedRevision)) continue;
            if (displaced?.status === "quoted") void request("generation.cancel", { operationId: displaced.operationId }).catch(() => {
            });
          }
          if (visible()) {
            setAssets((rows) => [...new Map([...rows, asset].map((row) => [row.id, row])).values()]);
            if (!sessionId) {
              invalidate();
              setReferences((ids) => [.../* @__PURE__ */ new Set([...ids, asset.id])]);
            }
          }
          updatePreview(resultIndex, null);
        }
        if (visible()) setUploadProgress(`\u6B63\u5728\u4E0A\u4F20\u5E76\u5904\u7406 ${completed} / ${supported.length} \u5F20\u2026`);
      }
    };
    const done = /* @__PURE__ */ new Set();
    try {
      await Promise.all(Array.from({ length: Math.min(4, supported.length) }, () => worker()));
      if (!visible()) return;
      const warnings = [invalid ? `${invalid} \u4E2A\u683C\u5F0F\u4E0D\u652F\u6301\uFF0C\u4EC5\u652F\u6301 JPEG\u3001PNG\u3001WebP` : "", ...failed].filter(Boolean);
      setUploadWarning(warnings.join("\uFF1B"));
      setUploadProgress("");
      onChanged?.();
    } finally {
      uploading.current = false;
      if (visible()) {
        setBusy("");
        if (uploadInput.current) uploadInput.current.value = "";
      }
    }
  }
  function validationError() {
    if (uploadPreviews.length) return uploadPreviews.some((row) => row.status !== "failed") ? "\u53C2\u8003\u56FE\u6B63\u5728\u4E0A\u4F20\u5904\u7406\u4E2D\uFF0C\u8BF7\u7A0D\u5019\u3002" : "\u53C2\u8003\u56FE\u4E0A\u4F20\u672A\u5B8C\u6210\uFF0C\u8BF7\u79FB\u9664\u5931\u8D25\u9879\u540E\u91CD\u8BD5\u3002";
    if (selectedSkill?.kind === "family") return "\u8BF7\u7B49\u5F85\u65CF\u6210\u5458\u52A0\u8F7D\u540E\u9009\u62E9\u4E00\u4E2A\u5177\u4F53 Skill\u3002";
    if (selectedSkill?.available === false) return "\u8BE5 Skill \u5DF2\u4E0D\u5728\u5F53\u524D\u8D26\u53F7\u7684\u53EF\u7528\u5217\u8868\u4E2D\uFF0C\u8BF7\u5237\u65B0\u6216\u91CD\u65B0\u9009\u62E9\u3002";
    if (selectedSkill && skillLoading === selectedSkill.id) return "\u6B63\u5728\u6838\u5BF9 Skill \u7684\u6700\u65B0\u8BE6\u60C5\u3002";
    if (selectedSkill && (!selectedSkill.detail || !selectedSkill.generationId)) return "\u8BF7\u7B49\u5F85 Skill \u5B8C\u6574\u8BE6\u60C5\u3001\u7248\u672C\u548C\u751F\u56FE\u7ED1\u5B9A\u8BFB\u53D6\u5B8C\u6210\u3002";
    if (properties.prompt && !prompt.trim()) return "\u8BF7\u8F93\u5165\u751F\u56FE\u63CF\u8FF0\u3002";
    if (properties.modelId && !model) return "\u8BF7\u9009\u62E9\u670D\u52A1\u7AEF\u5F53\u524D\u63D0\u4F9B\u7684\u6A21\u578B\u3002";
    if (selectedModel?.availableForCurrentPlan === false) return "\u5F53\u524D\u8D26\u53F7\u5C1A\u672A\u5F00\u901A\u8FD9\u4E2A\u6A21\u578B\uFF0C\u8BF7\u9009\u62E9\u5176\u4ED6\u6A21\u578B\u3002";
    if (properties.ratio && (!ratio.trim() || modelRatios.length && !modelRatios.includes(ratio))) return "\u8BF7\u9009\u62E9\u5F53\u524D\u6A21\u578B\u652F\u6301\u7684\u56FE\u7247\u6BD4\u4F8B\u3002";
    const modelReferenceLimit = booleans.ecoMode === true && supportsEcoMode ? Number(selectedModel?.ecoMaximumReferenceImages) : Number(selectedModel?.maximumReferenceImages);
    const schemaReferenceLimit = Number(properties.referenceAssetIds?.maxItems);
    const maxRefs = Math.min(Number.isFinite(modelReferenceLimit) ? modelReferenceLimit : Infinity, Number.isFinite(schemaReferenceLimit) ? schemaReferenceLimit : Infinity);
    if (Number.isFinite(maxRefs) && references.length > maxRefs) return `\u53C2\u8003\u56FE\u6700\u591A ${maxRefs} \u5F20\u3002`;
    return "";
  }
  async function prepare() {
    if (preparing.current || busy) return void 0;
    const problem = validationError();
    if (problem) {
      setError(problem);
      return void 0;
    }
    const sequence = ++prepareSequence.current;
    const expectedOwner = ownerId.current;
    const expectedIntent = intentId;
    const expectedPlan = planVersion;
    const expectedRevision = cacheRevision.current;
    const expectedContext = requestContext.current;
    const sameContext = () => mounted.current && generationBootstrapCache.isCurrent(expectedRevision) && sequence === prepareSequence.current && ownerId.current === expectedOwner && requestContext.current.request === expectedContext.request && requestContext.current.nativeSessionId === expectedContext.nativeSessionId && requestContext.current.accountKey === expectedContext.accountKey;
    const current = () => sameContext() && currentIntent.current === expectedIntent && currentPlanVersion.current === expectedPlan;
    preparing.current = true;
    setBusy("prepare");
    setError("");
    setNotice("");
    setPriceVerification("");
    try {
      const chosen = selectedSkill;
      const selectedValues = selections.current;
      const intendedArgs = argsForCapabilities(capabilities, selectedModel, {
        ...selectedValues,
        prompt,
        count,
        references: [...references]
      });
      const [capsResult, latestSkill] = await Promise.all([
        request("generation.capabilities", { refresh: true }),
        chosen ? fetchSkillDetail(chosen) : Promise.resolve(void 0)
      ]);
      if (!current()) return;
      const latestCaps = capsResult.data;
      if (latestCaps?.available !== true) throw new Error("\u5F53\u524D PodPlo \u670D\u52A1\u672A\u63D0\u4F9B\u53EF\u9A8C\u8BC1\u7684\u751F\u56FE\u62A5\u4EF7\u80FD\u529B\u3002");
      const latestModel = capabilityModels(latestCaps).find((row) => modelId(row) === selectedValues.model);
      if (!latestModel || latestModel.availableForCurrentPlan === false) throw new Error("\u6A21\u578B\u6743\u9650\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6A21\u578B\u540E\u518D\u62A5\u4EF7\u3002");
      const latestValues = {
        prompt,
        model: selectedValues.model,
        ratio: normalizedChoice(stringList(latestModel.ratios), selectedValues.ratio, stringList(latestModel.ratios)[0]),
        quality: normalizedChoice(stringList(latestModel.qualities), selectedValues.quality, latestModel.defaultQuality),
        resolution: normalizedChoice(stringList(latestModel.resolutions), selectedValues.resolution, latestModel.defaultResolution),
        thinkingLevel: normalizedChoice(stringList(latestModel.thinkingLevels), selectedValues.thinkingLevel, latestModel.defaultThinkingLevel),
        count,
        references: [...references],
        booleans: {
          ...selectedValues.booleans,
          webSearch: latestModel.supportsWebSearch === true && selectedValues.booleans.webSearch === true,
          imageSearch: latestModel.supportsImageSearch === true && selectedValues.booleans.imageSearch === true,
          ecoMode: Number.isInteger(Number(latestModel.ecoMaximumReferenceImages)) && selectedValues.booleans.ecoMode === true
        },
        transparent: selectedValues.transparent
      };
      const latestProperties = latestCaps.quoteInputSchema?.properties ?? {};
      if (latestProperties.prompt && !latestValues.prompt.trim()) throw new Error("\u8BF7\u8F93\u5165\u751F\u56FE\u63CF\u8FF0\u3002");
      if (latestProperties.ratio && stringList(latestModel.ratios).length && !stringList(latestModel.ratios).includes(latestValues.ratio)) throw new Error("\u6A21\u578B\u652F\u6301\u7684\u6BD4\u4F8B\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002");
      const modelReferenceLimit = latestValues.booleans.ecoMode === true && Number.isInteger(Number(latestModel.ecoMaximumReferenceImages)) ? Number(latestModel.ecoMaximumReferenceImages) : Number(latestModel.maximumReferenceImages);
      const schemaReferenceLimit = Number(latestProperties.referenceAssetIds?.maxItems);
      const maxRefs = Math.min(Number.isFinite(modelReferenceLimit) ? modelReferenceLimit : Infinity, Number.isFinite(schemaReferenceLimit) ? schemaReferenceLimit : Infinity);
      if (Number.isFinite(maxRefs) && references.length > maxRefs) throw new Error(`\u53C2\u8003\u56FE\u6700\u591A ${maxRefs} \u5F20\u3002`);
      setCapabilities(latestCaps);
      if (chosen && latestSkill) setSkills((rows) => rows.map((row) => row.id === chosen.id ? latestSkill : row));
      setRatio(latestValues.ratio);
      setQuality(latestValues.quality);
      setResolution(latestValues.resolution);
      setThinkingLevel(latestValues.thinkingLevel);
      setBooleans(latestValues.booleans);
      if (ownerId.current) generationBootstrapCache.update(ownerId.current, { capabilities: latestCaps });
      if (!current()) return;
      const verifiedArgs = argsForCapabilities(latestCaps, latestModel, latestValues);
      if (JSON.stringify(intendedArgs) !== JSON.stringify(verifiedArgs) || chosen && latestSkill && (chosen.generationId !== latestSkill.generationId || chosen.version !== latestSkill.version)) {
        setPriceVerification("\u6A21\u578B\u53C2\u6570\u6216 Skill \u7248\u672C\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u6838\u5BF9\u540E\u518D\u6B21\u70B9\u51FB\u751F\u6210\u3002");
        return;
      }
      const prepareRequest = async () => {
        const item = { ...latestSkill?.generationId ? { skillId: latestSkill.generationId } : {}, args: verifiedArgs };
        const { data } = await request("generation.prepare", { intentId: expectedIntent, planVersion: expectedPlan, items: [item], taskName: latestValues.prompt.trim().slice(0, 40) || "\u751F\u56FE\u4EFB\u52A1", processingPlan: [] });
        const exact = exactOperation(data, expectedIntent, expectedPlan);
        if (!exact) throw new Error("\u670D\u52A1\u7AEF\u8FD4\u56DE\u7684\u62A5\u4EF7\u4E0E\u5F53\u524D\u610F\u56FE\u4E0D\u5339\u914D\u3002");
        return exact;
      };
      let quote;
      if (expectedContext.nativeSessionId) {
        generationBootstrapCache.writeDraft(expectedOwner, expectedContext.nativeSessionId, {
          prompt: latestValues.prompt,
          skillId,
          model: latestValues.model,
          ratio: latestValues.ratio,
          quality: latestValues.quality,
          resolution: latestValues.resolution,
          thinkingLevel: latestValues.thinkingLevel,
          count: latestValues.count,
          transparent: latestValues.transparent,
          booleans: latestValues.booleans,
          references: latestValues.references,
          intentId: expectedIntent,
          planVersion: expectedPlan,
          operation: exactOperation(operation, expectedIntent, expectedPlan),
          approvalAttempted
        });
        quote = await generationBootstrapCache.prepare(expectedOwner, expectedContext.nativeSessionId, expectedIntent, expectedPlan, prepareRequest);
      } else quote = await prepareRequest();
      if (!current()) return;
      setOperation(quote);
      setApprovalAttempted(false);
      onChanged?.();
      setNotice("\u670D\u52A1\u7AEF\u79EF\u5206\u5DF2\u6838\u9A8C\u3002");
      return quote;
    } catch (error2) {
      if (current()) setError(errorText(error2));
    } finally {
      preparing.current = false;
      if (sameContext()) setBusy("");
    }
    return void 0;
  }
  async function approve(candidate, navigate = true) {
    const approvedOperation = candidate ?? operation;
    if (!approvedOperation || approvedOperation.status !== "quoted" || approvalAttempted || busy || approving.current) return;
    if (!mounted.current || !generationBootstrapCache.isCurrent(cacheRevision.current) || approvedOperation.intentId !== currentIntent.current || approvedOperation.planVersion !== currentPlanVersion.current) return;
    const expiresAt = Date.parse(approvedOperation.quote.expiresAt);
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      invalidate();
      return;
    }
    const expectedOperation = approvedOperation;
    const expectedOwner = ownerId.current;
    const expectedContext = requestContext.current;
    const expectedRevision = cacheRevision.current;
    approving.current = true;
    setApprovalAttempted(true);
    setBusy("approve");
    setError("");
    setNotice("");
    setPriceVerification("");
    if (expectedContext.nativeSessionId) generationBootstrapCache.rememberApprovalAttempt(expectedOwner, expectedContext.nativeSessionId, expectedOperation.intentId, expectedOperation.planVersion);
    onSubmission?.({ ...expectedOperation, status: "submitting", createdAt: (/* @__PURE__ */ new Date()).toISOString() }, void 0, navigate);
    try {
      const { data } = await request("generation.approve", { operationId: expectedOperation.operationId, approvalId: expectedOperation.approvalId });
      const exact = exactOperation(data, expectedOperation.intentId, expectedOperation.planVersion);
      if (!exact) throw new Error("\u670D\u52A1\u7AEF\u8FD4\u56DE\u7684\u6279\u6B21\u4E0E\u5F53\u524D\u62A5\u4EF7\u4E0D\u5339\u914D\u3002");
      if (expectedContext.nativeSessionId) generationBootstrapCache.rememberOperation(expectedOwner, expectedContext.nativeSessionId, exact);
      if (!mounted.current || !generationBootstrapCache.isCurrent(expectedRevision) || ownerId.current !== expectedOwner || requestContext.current.nativeSessionId !== expectedContext.nativeSessionId) return;
      setOperation(exact);
      setNotice("\u5DF2\u63D0\u4EA4\u4E00\u6B21\uFF0C\u6B63\u5728\u751F\u6210\u3002\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002");
      onChanged?.();
      onSubmission?.(exact);
      setIntentId(uuid());
      setPlanVersion(1);
    } catch (error2) {
      if (mounted.current && generationBootstrapCache.isCurrent(expectedRevision) && ownerId.current === expectedOwner && requestContext.current.nativeSessionId === expectedContext.nativeSessionId) {
        const message = `\u786E\u8BA4\u7ED3\u679C\u5C1A\u672A\u786E\u5B9A\uFF1A${errorText(error2)} \u8BF7\u5728\u5386\u53F2\u8BB0\u5F55\u4E2D\u5237\u65B0\u6838\u5BF9\uFF1B\u4E3A\u9632\u91CD\u590D\u6267\u884C\uFF0C\u672C\u62A5\u4EF7\u4E0D\u4F1A\u518D\u6B21\u63D0\u4EA4\u3002`;
        setError(message);
        onSubmission?.({ ...expectedOperation, status: "submission_unknown" }, message);
        onChanged?.();
      }
    } finally {
      approving.current = false;
      if (mounted.current && generationBootstrapCache.isCurrent(expectedRevision) && ownerId.current === expectedOwner) setBusy("");
    }
  }
  async function generate() {
    if (busy || preparing.current || approving.current || approvalAttempted) return;
    if (operation?.status === "quoted") {
      await approve(operation);
      return;
    }
    const expectedOwner = ownerId.current;
    const expectedContext = requestContext.current;
    const expectedRevision = cacheRevision.current;
    const expectedIntent = currentIntent.current;
    const expectedPlan = currentPlanVersion.current;
    const expectedLocalQuote = localQuote;
    if (validationError()) return;
    onVerification?.({
      operationId: `verification:${expectedIntent}`,
      intentId: expectedIntent,
      planVersion: expectedPlan,
      approvalId: "",
      status: "verifying",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      quote: {
        totalCredits: expectedLocalQuote?.totalCredits ?? 0,
        outputCount: expectedLocalQuote?.outputCount ?? count,
        confirmationText: "",
        expiresAt: ""
      }
    });
    let approvalStarted = false;
    try {
      const verified = await prepare();
      if (!verified) return;
      if (!mounted.current || !generationBootstrapCache.isCurrent(expectedRevision) || ownerId.current !== expectedOwner || requestContext.current.request !== expectedContext.request || requestContext.current.nativeSessionId !== expectedContext.nativeSessionId || requestContext.current.accountKey !== expectedContext.accountKey || currentIntent.current !== expectedIntent || currentPlanVersion.current !== expectedPlan || verified.intentId !== expectedIntent || verified.planVersion !== expectedPlan) return;
      if (!expectedLocalQuote || verified.quote.totalCredits !== expectedLocalQuote.totalCredits || verified.quote.outputCount !== expectedLocalQuote.outputCount) {
        setPriceVerification(expectedLocalQuote ? `\u670D\u52A1\u7AEF\u6838\u9A8C\u79EF\u5206\u5DF2\u66F4\u65B0\u4E3A ${verified.quote.totalCredits}\uFF0C\u8BF7\u518D\u6B21\u70B9\u51FB\u751F\u6210\u3002` : `\u670D\u52A1\u7AEF\u6838\u9A8C\u4E3A ${verified.quote.totalCredits} \u79EF\u5206\uFF0C\u8BF7\u518D\u6B21\u70B9\u51FB\u751F\u6210\u3002`);
        return;
      }
      approvalStarted = true;
      await approve(verified, false);
    } finally {
      if (!approvalStarted && mounted.current && generationBootstrapCache.isCurrent(expectedRevision) && ownerId.current === expectedOwner && requestContext.current.nativeSessionId === expectedContext.nativeSessionId && currentIntent.current === expectedIntent && currentPlanVersion.current === expectedPlan) onVerification?.();
    }
  }
  async function cancelQuote() {
    if (!operation || operation.status !== "quoted" || busy) return;
    const expectedOperation = operation;
    const expectedOwner = ownerId.current;
    const expectedContext = requestContext.current;
    const expectedRevision = cacheRevision.current;
    setBusy("cancel");
    setError("");
    setNotice("");
    try {
      const { data } = await request("generation.cancel", { operationId: expectedOperation.operationId });
      const exact = exactOperation(data, expectedOperation.intentId, expectedOperation.planVersion);
      if (!exact) throw new Error("\u670D\u52A1\u7AEF\u8FD4\u56DE\u7684\u53D6\u6D88\u7ED3\u679C\u4E0E\u5F53\u524D\u62A5\u4EF7\u4E0D\u5339\u914D\u3002");
      if (expectedContext.nativeSessionId) generationBootstrapCache.rememberOperation(expectedOwner, expectedContext.nativeSessionId, exact);
      if (!mounted.current || !generationBootstrapCache.isCurrent(expectedRevision) || ownerId.current !== expectedOwner || requestContext.current.nativeSessionId !== expectedContext.nativeSessionId) return;
      setOperation(exact);
      setApprovalAttempted(false);
      setNotice("\u62A5\u4EF7\u5DF2\u53D6\u6D88\uFF0C\u672A\u6267\u884C\u4E5F\u672A\u6263\u9664\u79EF\u5206\u3002");
      onChanged?.();
    } catch (error2) {
      if (mounted.current && generationBootstrapCache.isCurrent(expectedRevision) && ownerId.current === expectedOwner) setError(errorText(error2));
    } finally {
      if (mounted.current && generationBootstrapCache.isCurrent(expectedRevision) && ownerId.current === expectedOwner) setBusy("");
    }
  }
  function clearComposer() {
    if (!prompt && !skillId && references.length === 0) return;
    invalidate();
    skillSequence.current += 1;
    setPrompt("");
    setSkillId("");
    setSkillLoading("");
    setSkillError("");
    setReferences([]);
  }
  const chevron = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "m7 10 5 5 5-5" }) });
  const plus = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M12 5v14M5 12h14" }) });
  const imageIcon = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "8.5", cy: "9", r: "1.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "m21 15-5-5L5 20" })
  ] });
  const broomIcon = /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M13.5 10.5 22 2" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M14.734 13.841a2 2 0 0 0-.314-2.42L12.58 9.58a2 2 0 0 0-2.421-.314l-7.657 4.461A1 1 0 0 0 2.3 15.3l6.403 6.403a1 1 0 0 0 1.571-.204z" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "m5 18 2-2" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "m7.699 10.7 5.602 5.601" })
  ] });
  const skillPicker = (label = "\u9009\u62E9 Skill") => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("select", { "aria-label": label, value: skillId, onChange: (event) => {
    void selectSkill(event.target.value);
    event.currentTarget.closest("details")?.removeAttribute("open");
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "", children: "\u8BF7\u9009\u62E9\u5177\u4F53 Skill" }),
    skills.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("option", { value: row.id, children: [
      row.title,
      row.kind === "family" ? " \xB7 \u5C55\u5F00\u6210\u5458" : row.source === "personal" ? " \xB7 \u6211\u7684" : ""
    ] }, `${row.source}:${row.id}`))
  ] });
  if (placement === "floating" && !floatingOpen) return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { ref: floatingShell, className: "ppd-generation-shell is-floating is-collapsed", "data-generation-composer": "floating", "data-generation-composer-collapsed": true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", className: "ppd-generation-collapsed", "aria-expanded": "false", onClick: () => setFloatingOpen(true), children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-collapsed-add", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M12 5v14M5 12h14" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-collapsed-placeholder", children: "Create image" }),
    (references.length > 0 || uploadPreviews.length > 0 || uploadProgress || uploadWarning) && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("small", { "data-generation-reference-count": true, title: uploadFeedback || void 0, children: uploadPreviews.some((row) => row.status !== "failed") ? `\u6B63\u5728\u4E0A\u4F20 ${uploadPreviews.length} \u5F20\u2026` : uploadPreviews.length || uploadWarning ? "\u4E0A\u4F20\u672A\u5B8C\u6210" : `${references.length} \u5F20\u53C2\u8003\u56FE` }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-collapsed-expand", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "m12 19V5m-6 6 6-6 6 6" }) }) })
  ] }) });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { ref: floatingShell, className: `ppd-generation ppd-generation-shell is-${placement}`, "data-generation-composer": placement, "data-generation-composer-expanded": true, "aria-busy": loading, children: [
    error && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "ppd-visually-hidden", role: "alert", children: error }),
    notice && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "ppd-visually-hidden", role: "status", children: notice }),
    priceVerification && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "ppd-price-verification", "data-generation-price-verification": true, role: "status", children: priceVerification }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("fieldset", { className: "ppd-generation-form", disabled: busy === "upload" || busy === "approve" || busy === "cancel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("legend", { className: "ppd-visually-hidden", children: "\u672C\u6279\u8BBE\u7F6E" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `ppd-web-composer ${composerFocused ? "is-focused" : ""}`, "data-ui": "podplo-web-composer", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-composer-actions", children: [
          placement === "floating" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", "aria-label": "\u6536\u8D77\u751F\u56FE\u6846", onClick: () => setFloatingOpen(false), children: "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", "aria-label": "\u6E05\u7A7A\u8F93\u5165", title: "\u6E05\u7A7A", onClick: clearComposer, children: broomIcon })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-composer-media-row", children: [
          selectedSkill && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "ppd-skill-token has-value", title: selectedSkill.title, children: [
            selectedSkill?.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { className: "ppd-skill-cover", src: selectedSkill.coverUrl, alt: "" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-token-mark", children: "\u2726" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "ppd-skill-copy", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("small", { children: skillLoading === selectedSkill.id ? "\u6B63\u5728\u8BFB\u53D6\u2026" : "Skill" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: selectedSkill?.title || "\u9009\u62E9 Skill" })
            ] }),
            chevron,
            skillPicker()
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `ppd-reference-tray ${references.length || uploadPreviews.length ? "has-references" : ""}`, "aria-label": references.length ? `${references.length} \u5F20\u53C2\u8003\u7D20\u6750` : "\u6DFB\u52A0\u53C2\u8003\u7D20\u6750", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ppd-upload-tile", "data-generation-upload": true, "aria-label": "\u4E0A\u4F20\u672C\u5730\u56FE\u7247", title: "\u4E0A\u4F20\u672C\u5730\u56FE\u7247", onClick: () => uploadInput.current?.click(), children: plus }),
            references.map((id, index) => {
              const asset = assets.find((row) => row.id === id);
              const preview = asset?.thumbnailUrl || asset?.previewUrl;
              return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-reference-token", title: asset?.filename || id, children: [
                preview ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: preview, alt: "" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: index + 1 }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: index + 1 }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-reference-actions", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", disabled: index === 0, "aria-label": "\u4E0A\u79FB", onClick: () => moveReference(index, -1), children: "\u2190" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", disabled: index === references.length - 1, "aria-label": "\u4E0B\u79FB", onClick: () => moveReference(index, 1), children: "\u2192" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", "aria-label": "\u79FB\u9664", onClick: () => change(setReferences, references.filter((value) => value !== id)), children: "\xD7" })
                ] })
              ] }, id);
            }),
            uploadPreviews.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `ppd-reference-token ppd-upload-preview is-${row.status}`, "data-generation-upload-preview": row.status, title: `${row.filename}\uFF1A${row.message || "\u4E0A\u4F20\u4E2D"}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: row.previewUrl, alt: row.filename }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-upload-preview-status", role: row.status === "failed" ? "alert" : "status", children: row.status === "failed" ? "\u4E0A\u4F20\u672A\u5B8C\u6210" : "\u4E0A\u4F20\u4E2D\u2026" }),
              row.status === "failed" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ppd-upload-preview-remove", "aria-label": `\u79FB\u9664\u672A\u4E0A\u4F20\u56FE\u7247 ${row.filename}`, onClick: () => {
                setUploadWarning("");
                generationBootstrapCache.updateReferenceUpload(ownerId.current, nativeSessionId ?? "podplo-manual", row.id, null, cacheRevision.current);
                setUploadPreviews(generationBootstrapCache.readReferenceUploads(ownerId.current, nativeSessionId ?? "podplo-manual"));
              }, children: "\xD7" })
            ] }, row.id)),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { ref: uploadInput, className: "ppd-file-input", type: "file", multiple: true, accept: "image/jpeg,image/png,image/webp", onChange: (event) => void upload(Array.from(event.target.files ?? [])) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("textarea", { value: prompt, maxLength: Number(properties.prompt?.maxLength) || 4e3, "aria-label": "\u751F\u56FE\u63CF\u8FF0", placeholder: "\u63CF\u8FF0\u4F60\u60F3\u751F\u6210\u7684\u753B\u9762\u2026", onFocus: () => setComposerFocused(true), onBlur: () => setComposerFocused(false), onChange: (event) => change(setPrompt, event.target.value) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-composer-toolbar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-toolbar-left", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("details", { className: "ppd-add-menu", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("summary", { className: "ppd-toolbar-icon", "aria-label": "\u6DFB\u52A0\u7D20\u6750\u6216 Skill", children: plus }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-add-popover", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { children: [
                  "\u6D4F\u89C8 Skill\u5E93",
                  skillPicker(selectedSkill ? "\u6D4F\u89C8 Skill\u5E93" : "\u9009\u62E9 Skill")
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", onClick: (event) => {
                  uploadInput.current?.click();
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }, children: "\u672C\u5730\u4E0A\u4F20" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-toolbar-divider" }),
            properties.modelId && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("details", { className: "ppd-model-menu", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("summary", { className: "ppd-toolbar-select ppd-model-select", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: `ppd-model-dot ${/^gpt/i.test(selectedModelLabel) ? "is-gpt" : ""}` }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: selectedModelLabel }),
                chevron
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { className: "ppd-contract-control", "data-generation-parameter": "modelId", "aria-hidden": "true", tabIndex: -1, value: model, onChange: (event) => selectModel(event.target.value), children: models.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("option", { value: modelId(row), disabled: row.availableForCurrentPlan === false, children: [
                modelName(row),
                row.availableForCurrentPlan === false ? " \xB7 \u672A\u5F00\u901A" : ""
              ] }, modelId(row))) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-model-popover", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("header", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "\u56FE\u7247\u6A21\u578B" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("small", { children: [
                    models.length,
                    " \u4E2A\u53EF\u7528\u6A21\u578B"
                  ] })
                ] }),
                models.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", className: modelId(row) === model ? "is-selected" : "", "aria-pressed": modelId(row) === model, disabled: row.availableForCurrentPlan === false, onClick: (event) => {
                  selectModel(modelId(row));
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: `ppd-model-brand ${/^gpt/i.test(modelName(row)) ? "is-gpt" : ""}`, children: /^gpt/i.test(modelName(row)) ? "GPT" : "AI" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: modelName(row) }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("small", { children: row.availableForCurrentPlan === false ? "\u5F53\u524D\u65B9\u6848\u672A\u5F00\u901A" : `${stringList(row.ratios).length} \u79CD\u6BD4\u4F8B \xB7 \u6700\u591A ${Number(row.maximumReferenceImages) || 0} \u5F20\u53C2\u8003\u56FE` })
                  ] }),
                  modelId(row) === model && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: "\u2713" })
                ] }, modelId(row)))
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("details", { className: "ppd-settings-menu", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("summary", { className: "ppd-toolbar-button", children: [
                imageIcon,
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: ratio || "\u6BD4\u4F8B" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", {}),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
                  count,
                  " \u5F20"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", {}),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: [resolution, quality].filter(Boolean).join(" \xB7 ") || "\u9ED8\u8BA4" }),
                chevron
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-settings-popover", children: [
                properties.ratio && modelRatios.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "\u6BD4\u4F8B" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { className: "ppd-contract-control", "data-generation-parameter": "ratio", "aria-hidden": "true", tabIndex: -1, value: ratio, onChange: (event) => change(setRatio, event.target.value), children: modelRatios.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { children: value }, value)) }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ppd-ratio-grid", children: modelRatios.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", className: ratio === value ? "is-selected" : "", "aria-pressed": ratio === value, onClick: () => change(setRatio, value), children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { className: "ppd-ratio-glyph", style: ratioGlyphStyle(value) }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: value })
                  ] }, value)) })
                ] }),
                properties.count && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "\u6570\u91CF" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { className: "ppd-contract-control", type: "number", "aria-hidden": "true", tabIndex: -1, min: countMinimum, max: countMaximum, value: count, onChange: (event) => change(setCount, Math.max(1, Number(event.target.value) || 1)) }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ppd-segmented", children: Array.from({ length: countMaximum - countMinimum + 1 }, (_, index) => countMinimum + index).map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: count === value ? "is-selected" : "", "aria-pressed": count === value, onClick: () => change(setCount, value), children: value }, value)) })
                ] }),
                properties.resolution && modelResolutions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "\u5206\u8FA8\u7387" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { className: "ppd-contract-control", "data-generation-parameter": "resolution", "aria-hidden": "true", tabIndex: -1, value: resolution, onChange: (event) => change(setResolution, event.target.value), children: modelResolutions.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { children: value }, value)) }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ppd-segmented", children: modelResolutions.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: resolution === value ? "is-selected" : "", "aria-pressed": resolution === value, onClick: () => change(setResolution, value), children: value }, value)) })
                ] }),
                properties.quality && modelQualities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "\u6E05\u6670\u5EA6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { className: "ppd-contract-control", "data-generation-parameter": "quality", "aria-hidden": "true", tabIndex: -1, value: quality, onChange: (event) => change(setQuality, event.target.value), children: modelQualities.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { children: value }, value)) }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ppd-segmented", children: modelQualities.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: quality === value ? "is-selected" : "", "aria-pressed": quality === value, onClick: () => change(setQuality, value), children: value === "xhigh" ? "Ultra" : value }, value)) })
                ] }),
                properties.thinkingLevel && modelThinkingLevels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "\u601D\u8003\u7A0B\u5EA6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("select", { className: "ppd-contract-control", "data-generation-parameter": "thinkingLevel", "aria-hidden": "true", tabIndex: -1, value: thinkingLevel, onChange: (event) => change(setThinkingLevel, event.target.value), children: modelThinkingLevels.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { children: value }, value)) }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "ppd-segmented", children: modelThinkingLevels.map((value) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: thinkingLevel === value ? "is-selected" : "", "aria-pressed": thinkingLevel === value, onClick: () => change(setThinkingLevel, value), children: value }, value)) })
                ] }),
                supportsTransparent && transparentKey && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { children: "\u80CC\u666F" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "ppd-settings-check", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", "data-generation-parameter": transparentKey, checked: transparent, onChange: (event) => change(setTransparent, event.target.checked) }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", {}) }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u900F\u660E\u80CC\u666F" })
                  ] })
                ] })
              ] })
            ] }),
            supportsWebSearch && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: `ppd-search-chip ${booleans.webSearch ? "is-selected" : ""}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u8054\u7F51\u641C\u7D22" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", "data-generation-parameter": "webSearch", checked: booleans.webSearch === true, onChange: (event) => changeBoolean("webSearch", event.target.checked) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", {}) })
            ] }),
            supportsImageSearch && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: `ppd-search-chip ${booleans.imageSearch ? "is-selected" : ""}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u56FE\u7247\u641C\u7D22" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", "data-generation-parameter": "imageSearch", checked: booleans.imageSearch === true, onChange: (event) => changeBoolean("imageSearch", event.target.checked) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", {}) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-toolbar-right", children: [
            supportsEcoMode && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: `ppd-eco-control ${booleans.ecoMode ? "is-selected" : ""}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", "data-generation-parameter": "ecoMode", checked: booleans.ecoMode === true, onChange: (event) => changeBoolean("ecoMode", event.target.checked) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", {}) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Eco" })
            ] }),
            (operation?.status === "quoted" || localQuote) && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "ppd-generation-cost", "aria-label": `${operation?.status === "quoted" ? operation.quote.totalCredits : localQuote.totalCredits} \u79EF\u5206`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { "aria-hidden": "true", children: "\u2727" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { "data-generation-credits": true, children: operation?.status === "quoted" ? operation.quote.totalCredits : localQuote.totalCredits })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ppd-generate-button", "data-generation-submit": true, "aria-label": operation?.status === "quoted" || localQuote ? `\u751F\u6210 \xB7 ${operation?.status === "quoted" ? operation.quote.totalCredits : localQuote.totalCredits} \u79EF\u5206` : "\u751F\u6210 \xB7 \u70B9\u51FB\u6838\u9A8C\u79EF\u5206", disabled: busy === "prepare" || busy === "approve" || approvalAttempted || !!validationError(), onClick: () => void generate(), children: busy === "prepare" || busy === "approve" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-spinner" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "m12 19V5m-6 6 6-6 6 6" }) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "ppd-composer-meta", children: [
        selectedSkill && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ppd-skill-proof", role: "status", children: skillLoading === selectedSkill.id ? selectedSkill.kind === "family" ? "\u6B63\u5728\u52A0\u8F7D\u65CF\u6210\u5458\u2026" : "\u6B63\u5728\u8BFB\u53D6\u5B8C\u6574\u8BE6\u60C5\u2026" : selectedSkill.detail ? `\u8BE6\u60C5\u5DF2\u6838\u5BF9 \xB7 \u7248\u672C ${selectedSkill.version}` : selectedSkill.kind === "family" ? "\u8BF7\u9009\u62E9\u65CF\u6210\u5458" : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ppd-link-button", onClick: () => void selectSkill(selectedSkill.id), children: "\u91CD\u8BD5 Skill \u8BE6\u60C5" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
          references.length,
          Number.isFinite(referenceLimit) ? ` / ${referenceLimit}` : "",
          " \u5F20\u53C2\u8003\u7D20\u6750"
        ] }),
        assetCursor && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ppd-link-button", onClick: () => void loadAssets(true), children: "\u52A0\u8F7D\u66F4\u591A\u7D20\u6750" })
      ] })
    ] }),
    skillError && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "ppd-skill-feedback", "data-generation-skill-feedback": true, role: "alert", children: [
      skillError,
      selectedSkill && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ppd-link-button", disabled: !!skillLoading, onClick: () => void selectSkill(selectedSkill.id), children: "\u91CD\u8BD5" })
    ] }),
    (visibleUploadProgress || uploadFeedback) && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "ppd-upload-feedback", role: uploadFeedback ? "alert" : "status", "data-generation-upload-feedback": true, children: [
      visibleUploadProgress,
      visibleUploadProgress && uploadFeedback ? "\uFF1B" : "",
      uploadFeedback
    ] })
  ] });
}

// plugins/podplo-dsh/src/generation-history.tsx
var import_react4 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var labels = {
  verifying: "\u6B63\u5728\u6838\u9A8C\u79EF\u5206",
  quoted: "\u6B63\u5728\u63D0\u4EA4",
  submitting: "\u6B63\u5728\u63D0\u4EA4",
  submitted: "\u6B63\u5728\u751F\u6210",
  completed: "\u5DF2\u5B8C\u6210",
  failed: "\u751F\u6210\u5931\u8D25",
  partial_failure: "\u90E8\u5206\u751F\u6210\u5931\u8D25",
  cancelled: "\u5DF2\u505C\u6B62",
  partial_cancelled: "\u90E8\u5206\u5B8C\u6210",
  submission_unknown: "\u63D0\u4EA4\u7ED3\u679C\u5F85\u6838\u5BF9",
  partial_unknown: "\u90E8\u5206\u7ED3\u679C\u5F85\u6838\u5BF9"
};
var running = /* @__PURE__ */ new Set(["verifying", "quoted", "submitting", "submitted"]);
function GenerationHistory({ request, submission, onBack, renderAsset }) {
  const [items, setItems] = (0, import_react4.useState)([]);
  const [loading, setLoading] = (0, import_react4.useState)(true);
  const [error, setError] = (0, import_react4.useState)("");
  const [refreshVersion, setRefreshVersion] = (0, import_react4.useState)(0);
  const [folders, setFolders] = (0, import_react4.useState)([]);
  const [folderId, setFolderId] = (0, import_react4.useState)();
  (0, import_react4.useEffect)(() => {
    let alive = true, reading = false;
    const load = async () => {
      if (reading) return;
      reading = true;
      try {
        const { data } = await request("archive.list", { scope: "session" });
        if (alive) setFolders(data.items ?? []);
      } catch {
        if (alive) setFolders([]);
      } finally {
        reading = false;
      }
    };
    void load();
    const timer = setInterval(() => void load(), 1800);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [request]);
  (0, import_react4.useEffect)(() => {
    let alive = true;
    let reading = false;
    const refresh = async () => {
      if (reading) return;
      reading = true;
      try {
        const { data } = await request("generation.list", { scope: "manual" });
        if (!alive) return;
        setItems((Array.isArray(data?.items) ? data.items : []).filter((row) => row.approvedAt));
        setError("");
      } catch (error2) {
        if (alive) setError(error2 instanceof Error ? error2.message : "\u5386\u53F2\u8BB0\u5F55\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u3002");
      } finally {
        reading = false;
        if (alive) setLoading(false);
      }
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 1500);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [request, refreshVersion]);
  const recent = submission && items.find((row) => row.operationId === submission.operation.operationId);
  const rows = submission && !recent ? [submission.operation, ...items] : items;
  const submissionError = recent ? void 0 : submission?.error;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "ppd-history", "data-generation-history": true, "aria-label": "\u5386\u53F2\u8BB0\u5F55", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ArchiveStyles, {}),
    folderId && folders.find((row) => row.id === folderId) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ArchiveDetail, { task: folders.find((row) => row.id === folderId), request, onBack: () => setFolderId(void 0) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "ppd-history-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { children: "\u5386\u53F2\u8BB0\u5F55" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "ppd-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ppd-button", onClick: () => setRefreshVersion((value) => value + 1), children: "\u5237\u65B0" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ppd-button", onClick: onBack, children: "\u8FD4\u56DE" })
      ] })
    ] }),
    (error || submissionError) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "ppd-alert", role: "alert", children: error || submissionError }),
    loading && !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "ppd-state", role: "status", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ppd-spinner" }),
      "\u6B63\u5728\u8BFB\u53D6\u5386\u53F2\u8BB0\u5F55\u2026"
    ] }) : !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "ppd-state", children: "\u8FD8\u6CA1\u6709\u751F\u6210\u8BB0\u5F55" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "ppd-history-list", children: rows.map((row) => {
      const pending = running.has(row.status);
      const summary = row.summary;
      const outputs = [...new Set(row.items?.flatMap((item) => item.outputs?.flatMap((output) => output.assetId ? [output.assetId] : []) ?? []) ?? [])];
      const failures = [...new Set(row.items?.flatMap((item) => [item.errorCode, ...item.outputs?.map((output) => output.failureCode) ?? []].filter(Boolean)) ?? [])];
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("article", { className: "ppd-history-record", "data-operation-id": row.operationId, "data-generation-status": row.status, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "ppd-history-record-heading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("strong", { role: "status", children: [
            pending && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ppd-spinner" }),
            labels[row.status] ?? row.status
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
            row.quote.outputCount,
            " \u5F20",
            row.status !== "verifying" && ` \xB7 ${row.quote.totalCredits} \u79EF\u5206`
          ] })
        ] }),
        row.createdAt && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("time", { dateTime: row.createdAt, children: new Date(row.createdAt).toLocaleString() }),
        summary && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("progress", { "aria-label": "\u751F\u6210\u8FDB\u5EA6", max: Math.max(1, summary.itemCount), value: summary.completedCount + summary.failedCount + summary.cancelledCount }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("small", { children: [
            "\u5B8C\u6210 ",
            summary.completedCount,
            " / ",
            summary.itemCount,
            summary.failedCount > 0 && ` \xB7 \u5931\u8D25 ${summary.failedCount}`
          ] })
        ] }),
        failures.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "ppd-alert", children: failures.join(" \xB7 ") }),
        outputs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "ppd-history-results", children: outputs.map((id) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { "data-history-asset": id, children: renderAsset(id) }, `${id}:${refreshVersion}`)) }),
        folders.filter((folder) => folder.operationIds.includes(row.operationId)).map((folder) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TaskFolderCard, { task: folder, request, onView: () => setFolderId(folder.id), library: true }, folder.id))
      ] }, row.operationId);
    }) })
  ] });
}

// plugins/podplo-dsh/src/ManualToolboxPanel.tsx
var import_react5 = __toESM(require("react"), 1);
var import_jsx_runtime7 = require("react/jsx-runtime");
var tools = [
  { key: "rotate", label: "\u65CB\u8F6C\u7FFB\u8F6C", toolName: "podplo_rotate_flip_images", help: "\u65CB\u8F6C / \u6C34\u5E73\u4E0E\u5782\u76F4\u955C\u50CF", group: "\u56FE\u50CF\u5904\u7406" },
  { key: "color", label: "\u8C03\u8272", toolName: "podplo_adjust_image_colors", help: "\u4EAE\u5EA6 / \u5BF9\u6BD4\u5EA6 / \u9971\u548C\u5EA6", group: "\u56FE\u50CF\u5904\u7406" },
  { key: "outline", label: "\u63CF\u8FB9", toolName: "podplo_outline_images", help: "\u900F\u660E\u4E3B\u4F53\u8F6E\u5ED3", group: "\u56FE\u50CF\u5904\u7406" },
  { key: "resize", label: "\u5C3A\u5BF8", toolName: "podplo_resize_images", help: "\u6700\u7EC8\u5BBD\u9AD8 / \u9501\u5B9A\u6BD4\u4F8B", group: "\u5370\u5237\u4E0E\u5BFC\u51FA" },
  { key: "print", label: "\u51FA\u8840", toolName: "podplo_prepare_print_files", help: "\u56DB\u8FB9\u8BBE\u7F6E / \u88C1\u5207\u6821\u6837", group: "\u5370\u5237\u4E0E\u5BFC\u51FA" },
  { key: "export", label: "\u8F93\u51FA\u8BBE\u7F6E", toolName: "podplo_export_images", help: "\u955C\u50CF\u62FC\u63A5 / \u683C\u5F0F / PDF", group: "\u5370\u5237\u4E0E\u5BFC\u51FA" }
];
var initialOptions = {
  resize: { lockAspect: true, resizeAxis: "width", width: 2e3, height: 2e3, unit: "px", ppi: 300, trimTransparent: false },
  rotate: { angle: 0, flipHorizontal: false, flipVertical: false },
  color: { brightness: 0, contrast: 0, saturation: 0, temperature: 0 },
  export: { format: "png", quality: 95, background: "#ffffff", mirror: false, mirrorJoin: "none" },
  print: {
    bleed: 3,
    bleedMode: "background",
    background: "#ffffff",
    bleedSetup: "uniform",
    bleedTop: 3,
    bleedRight: 3,
    bleedBottom: 3,
    bleedLeft: 3
  },
  outline: {
    distancePercent: 9,
    strokePercent: 0.5,
    roundingPercent: 6,
    threshold: 16,
    fillHoles: true,
    fill: "none",
    fillColor: "#ffffff",
    strokeColor: "#111111",
    patternId: "",
    patternScale: 100,
    patternRotation: 0
  }
};
function processingOptions(tool, values) {
  const result = { ...values };
  if (tool === "resize") {
    result.sizing = values.lockAspect ? values.resizeAxis : "fixed";
    delete result.lockAspect;
    delete result.resizeAxis;
  }
  if (tool === "outline") {
    result.mirror = false;
    delete result.trimTransparent;
    if (!result.patternId) delete result.patternId;
  }
  if (tool === "print") {
    if (values.bleedSetup === "edges") {
      result.bleedEdges = { top: values.bleedTop, right: values.bleedRight, bottom: values.bleedBottom, left: values.bleedLeft };
      delete result.bleed;
    }
    delete result.bleedSetup;
    for (const side of ["Top", "Right", "Bottom", "Left"]) delete result[`bleed${side}`];
  }
  return result;
}
function unitFactor(unit, ppi) {
  return { px: 1, mm: ppi / 25.4, cm: ppi / 2.54, in: ppi, ft: ppi * 12 }[unit] ?? 1;
}
function messageOf(error) {
  return error instanceof Error ? error.message : "\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002";
}
function operationId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function toBase64(bytes) {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 32768)
    binary += String.fromCharCode(...bytes.subarray(offset, Math.min(bytes.length, offset + 32768)));
  return btoa(binary);
}
function ManualToolboxPanel({ request: hostRequest }) {
  const request = (0, import_react5.useCallback)((action, args) => hostRequest(
    action.startsWith("local.") ? `toolbox.${action.slice("local.".length)}` : action,
    args
  ), [hostRequest]);
  const mounted = (0, import_react5.useRef)(true);
  (0, import_react5.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const [enabled, setEnabled] = (0, import_react5.useState)({ resize: true, rotate: false, color: false, outline: false, print: false, export: false });
  const [trimTransparent, setTrimTransparent] = (0, import_react5.useState)(true);
  const resizeEdited = (0, import_react5.useRef)(false);
  const [options, setOptions] = (0, import_react5.useState)(() => structuredClone(initialOptions));
  const [images, setImages] = (0, import_react5.useState)([]);
  const [selected, setSelected] = (0, import_react5.useState)([]);
  const [sourcePreview, setSourcePreview] = (0, import_react5.useState)();
  const [toolPreview, setToolPreview] = (0, import_react5.useState)();
  const [resizeSource, setResizeSource] = (0, import_react5.useState)();
  const [previewBusy, setPreviewBusy] = (0, import_react5.useState)(false);
  const [previewError, setPreviewError] = (0, import_react5.useState)("");
  const [previewMode, setPreviewMode] = (0, import_react5.useState)(0);
  const [latest, setLatest] = (0, import_react5.useState)([]);
  const [busy, setBusy] = (0, import_react5.useState)("");
  const [notice, setNotice] = (0, import_react5.useState)("");
  const [error, setError] = (0, import_react5.useState)("");
  const selectedIds = (0, import_react5.useMemo)(() => selected.filter((id) => images.some((row) => row.id === id)), [selected, images]);
  const previewIds = JSON.stringify(selectedIds);
  const plan = { orderVersion: 2, steps: tools.flatMap((row) => [
    ...row.key === "resize" && trimTransparent ? [{ tool: "trim" }] : [],
    ...enabled[row.key] ? [{ tool: row.key, options: processingOptions(row.key, options[row.key]) }] : []
  ]) };
  const hasProcessing = plan.steps.length > 0;
  const previewOptions = JSON.stringify(plan);
  const bleedFields = options.print.bleedSetup === "edges" ? ["bleedTop", "bleedRight", "bleedBottom", "bleedLeft"] : ["bleed"];
  const bleedError = enabled.print && bleedFields.some((field) => typeof options.print[field] !== "number" || !Number.isFinite(options.print[field]) || Number(options.print[field]) < 0 || Number(options.print[field]) > 1e3) ? "\u51FA\u8840\u8BF7\u586B\u5199 0\uFF5E1000 \u6BEB\u7C73\u7684\u6709\u6548\u6570\u5B57\uFF0C\u5141\u8BB8\u5355\u8FB9\u4E3A 0\u3002" : "";
  const sourceId = selectedIds[0], source = images.find((row) => row.id === sourceId);
  const upstreamSteps = plan.steps.filter((row) => !["resize", "print", "export"].includes(row.tool));
  const upstreamKey = JSON.stringify({ id: sourceId, steps: upstreamSteps });
  const resizeBasis = resizeSource && resizeSource.id === sourceId && resizeSource.key === upstreamKey ? resizeSource : upstreamSteps.length ? void 0 : source;
  const displayedPreviewMode = previewMode > 0 && !toolPreview?.images[previewMode] ? 0 : previewMode;
  const update = (tool, name, value) => {
    if (tool === "resize" && (name === "width" || name === "height")) resizeEdited.current = true;
    setOptions((current) => {
      const previous = current[tool], next = { ...previous, [name]: value };
      if (tool === "resize" && (name === "width" || name === "height")) next.resizeAxis = name;
      if (tool === "resize" && next.lockAspect && resizeBasis && resizeBasis.width > 0 && resizeBasis.height > 0 && (name === "width" || name === "height" || name === "lockAspect")) {
        if (next.resizeAxis === "height") next.width = Number((Number(next.height) * resizeBasis.width / resizeBasis.height).toPrecision(12));
        else next.height = Number((Number(next.width) * resizeBasis.height / resizeBasis.width).toPrecision(12));
      }
      if (name === "unit" && tool === "resize") {
        const factor = unitFactor(String(previous.unit), Number(previous.ppi)) / unitFactor(String(value), Number(previous.ppi));
        for (const field of ["width", "height"]) next[field] = Number((Number(previous[field]) * factor).toPrecision(12));
      }
      if (name === "bleedSetup" && value === "edges" && previous[name] !== "edges") {
        for (const side of ["Top", "Right", "Bottom", "Left"]) next[`bleed${side}`] = previous.bleed;
      }
      return { ...current, [tool]: next };
    });
  };
  (0, import_react5.useEffect)(() => {
    if (!source) return;
    resizeEdited.current = false;
    setOptions((current) => {
      const previous = current.resize, factor = unitFactor(String(previous.unit), Number(previous.ppi));
      return { ...current, resize: {
        ...previous,
        width: Number((source.width / factor).toPrecision(12)),
        height: Number((source.height / factor).toPrecision(12)),
        resizeAxis: "width"
      } };
    });
  }, [sourceId, source?.width, source?.height]);
  (0, import_react5.useEffect)(() => {
    if (!enabled.resize || !resizeBasis) return;
    setOptions((current) => {
      const previous = current.resize;
      if (!resizeEdited.current) {
        const factor = unitFactor(String(previous.unit), Number(previous.ppi));
        const width = Number((resizeBasis.width / factor).toPrecision(12)), height = Number((resizeBasis.height / factor).toPrecision(12));
        return previous.width === width && previous.height === height ? current : { ...current, resize: { ...previous, width, height } };
      }
      if (!previous.lockAspect) return current;
      const field = previous.resizeAxis === "height" ? "width" : "height";
      const value = Number((field === "width" ? Number(previous.height) * resizeBasis.width / resizeBasis.height : Number(previous.width) * resizeBasis.height / resizeBasis.width).toPrecision(12));
      return previous[field] === value ? current : { ...current, resize: { ...previous, [field]: value } };
    });
  }, [enabled.resize, resizeBasis?.width, resizeBasis?.height, upstreamKey]);
  (0, import_react5.useEffect)(() => {
    setSourcePreview(void 0);
    if (!sourceId) return;
    let alive = true;
    void request("local.preview", { id: sourceId }).then((result) => {
      if (alive) setSourcePreview(result.data);
    }, (value) => {
      if (alive) setPreviewError(messageOf(value));
    });
    return () => {
      alive = false;
    };
  }, [sourceId, request]);
  (0, import_react5.useEffect)(() => {
    let alive = true;
    setPreviewError("");
    setToolPreview(void 0);
    setPreviewMode(0);
    if (bleedError) {
      setPreviewError(bleedError);
      setPreviewBusy(false);
      return;
    }
    if (!selectedIds.length || !JSON.parse(previewOptions).steps.length) {
      setPreviewBusy(false);
      return;
    }
    setPreviewBusy(true);
    const timer = setTimeout(() => {
      void request("local.pipelinePreview", { ids: JSON.parse(previewIds), options: JSON.parse(previewOptions) }).then((value) => {
        if (alive) {
          setToolPreview(value.data);
          if (value.data.resizeSource) setResizeSource({ ...value.data.resizeSource, key: upstreamKey });
        }
      }, (value) => {
        if (alive) setPreviewError(messageOf(value));
      }).finally(() => {
        if (alive) setPreviewBusy(false);
      });
    }, 250);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [previewIds, previewOptions, upstreamKey, bleedError, request]);
  (0, import_react5.useEffect)(() => {
    setLatest([]);
    setNotice("");
  }, [previewIds]);
  (0, import_react5.useEffect)(() => {
    setNotice("");
  }, [previewOptions]);
  const importFile = async (file, purpose = "source") => {
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      setError("\u5355\u5F20\u56FE\u7247\u4E0D\u80FD\u8D85\u8FC7 50 MB\u3002");
      return;
    }
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("\u53EA\u652F\u6301 PNG\u3001JPEG \u548C WebP\u3002");
      return;
    }
    setBusy(purpose === "pattern" ? "import-pattern" : "import");
    setError("");
    setNotice("");
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const result = await request("local.importInput", { name: file.name, contentType: file.type, base64: toBase64(bytes) });
      setImages((current) => [...current.filter((row) => row.id !== result.data.id), result.data]);
      if (purpose === "pattern") {
        setOptions((current) => ({ ...current, outline: { ...current.outline, patternId: result.data.id } }));
        setNotice("\u672C\u5730\u56FE\u6848\u5DF2\u9009\u7528\u3002");
      } else {
        setSelected([result.data.id]);
        setNotice("\u56FE\u7247\u5DF2\u6DFB\u52A0\u3002");
      }
    } catch (value) {
      setError(messageOf(value));
    } finally {
      setBusy("");
    }
  };
  const save = async () => {
    setBusy("save");
    setError("");
    setNotice("");
    try {
      const response = await request("local.save", { operationId: operationId(), ids: selectedIds, options: plan });
      if (!mounted.current) return;
      const rows = [...response.data.images ?? [], ...response.data.files ?? []];
      setLatest(rows);
      setPreviewMode(0);
      if (response.data.preview) {
        setToolPreview(response.data.preview);
      }
      const reviewCount = rows.filter((row) => row.kind === "image" && row.transparentCrop?.status === "review").length;
      setNotice(`\u5DF2\u4FDD\u5B58 ${rows.length} \u4E2A\u7ED3\u679C\uFF0C\u539F\u4EF6\u4FDD\u7559\u3002${reviewCount ? `${reviewCount} \u5F20\u7591\u70B9\u56FE\u7247\u53CA\u8BF4\u660E\u5DF2\u5355\u72EC\u5B58\u5165\u201C\u5F85\u590D\u6838\u201D\u6587\u4EF6\u5939\uFF0C\u540E\u7EED\u52A0\u5DE5\u5DF2\u6682\u505C\u3002` : ""}`);
    } catch (value) {
      setError(messageOf(value));
    } finally {
      setBusy("");
    }
  };
  const openResult = async (id) => {
    setBusy(`open:${id}`);
    setError("");
    try {
      await request("local.reveal", { id });
    } catch (value) {
      setError(messageOf(value));
    } finally {
      setBusy("");
    }
  };
  const exportPreset = () => {
    try {
      if (bleedError) throw new Error(bleedError);
      const parameters = structuredClone(options);
      delete parameters.outline.patternId;
      delete parameters.resize.trimTransparent;
      for (const values of Object.values(parameters)) for (const value of Object.values(values))
        if (typeof value === "number" && !Number.isFinite(value)) throw new Error("\u8BF7\u5148\u586B\u5199\u6709\u6548\u7684\u53C2\u6570\u518D\u5BFC\u51FA\u9884\u8BBE\u3002");
      const preset = { schemaVersion: 1, orderVersion: 2, type: "podplo-toolbox-preset", enabled: { trimTransparent, ...enabled }, parameters };
      const url = URL.createObjectURL(new Blob([JSON.stringify(preset, null, 2) + "\n"], { type: "application/json" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "PodPlo-\u5DE5\u5177\u7BB1\u9884\u8BBE.json";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
      setNotice("\u5DF2\u5BFC\u51FA\u5DE6\u4FA7\u5DE5\u5177\u52FE\u9009\u72B6\u6001\u548C\u53C2\u6570\u9884\u8BBE\u3002");
      setError("");
    } catch (value) {
      setError(messageOf(value));
    }
  };
  const previewLabel = (image, index) => image.name.includes("\u6821\u6837") ? `\u6821\u6837${index > 2 ? " " + (index - 1) : ""}` : /-镜像(?:-|\.)/.test(image.name) ? "\u955C\u50CF" : `\u7ED3\u679C ${index + 1}`;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "ppd-toolbox", "aria-label": "PodPlo \u624B\u52A8\u5DE5\u5177\u7BB1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("aside", { className: "ppd-toolbox__parameters", "aria-label": "\u5DE5\u5177\u548C\u53C2\u6570", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("header", { className: "ppd-toolbox__header", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { children: "\u56FE\u50CF\u5DE5\u5177\u7BB1" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: "\u52FE\u9009\u5DE5\u5177\uFF0C\u6309\u4ECE\u4E0A\u5230\u4E0B\u7684\u987A\u5E8F\u53E0\u52A0\u3002\u672A\u52FE\u9009\u9879\u4E0D\u53C2\u4E0E\u4FDD\u5B58\u3002" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "ppd-toolbox__modules", children: tools.map((row) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_react5.default.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "ppd-toolbox__module", "data-toolbox-module": row.key, children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { type: "checkbox", checked: enabled[row.key], disabled: !!busy, onChange: (event) => setEnabled((current) => ({ ...current, [row.key]: event.target.checked })) }),
              row.label
            ] }) }),
            enabled[row.key] && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("fieldset", { disabled: !!busy, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              ToolFields,
              {
                tool: row.key,
                values: options[row.key],
                images,
                update: (name, value) => update(row.key, name, value),
                importPattern: (file) => importFile(file, "pattern"),
                patternBusy: busy === "import-pattern",
                outlineLongEdge: toolPreview?.outlineSource?.id === sourceId ? toolPreview?.outlineSource?.longEdge : void 0
              }
            ) })
          ] }),
          row.key === "outline" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "ppd-toolbox__module", "data-toolbox-module": "trim", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { type: "checkbox", checked: trimTransparent, disabled: !!busy, onChange: (event) => {
                const checked = event.target.checked;
                setTrimTransparent(checked);
                if (!checked) setEnabled({ resize: false, rotate: false, color: false, outline: false, print: false, export: false });
              } }),
              "\u88C1\u526A\u900F\u660E\u56FE\u6742\u8FB9"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("small", { children: "\u88C1\u53BB\u5F53\u524D\u7ED3\u679C\u5916\u56F4\u5168\u900F\u660E\u7A7A\u767D\uFF1B\u4F4D\u4E8E\u63CF\u8FB9\u4E4B\u540E\u3001\u6700\u7EC8\u5C3A\u5BF8\u4E4B\u524D\u3002\u53D6\u6D88\u65F6\u540C\u65F6\u53D6\u6D88\u5176\u4ED6\u5DE5\u5177\u52FE\u9009\u3002" })
          ] })
        ] }, row.key)) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__save-bar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__actions", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { className: "ppd-toolbox__primary", type: "button", disabled: !!busy || previewBusy || !!previewError || !!bleedError || !selectedIds.length || !hasProcessing || enabled.outline && options.outline.fill === "pattern" && !options.outline.patternId, onClick: () => void save(), children: busy === "save" ? "\u6B63\u5728\u4FDD\u5B58\u2026" : "\u4FDD\u5B58" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", disabled: !!busy || !latest.length, onClick: () => void openResult((latest.find((row) => row.kind === "image") ?? latest[0]).id), children: "\u6253\u5F00" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", disabled: !!busy, onClick: exportPreset, children: "\u5BFC\u51FA\u9884\u8BBE" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("small", { children: "\u4FDD\u5B58\u52FE\u9009\u5DE5\u5177\u7684\u6700\u7EC8\u6548\u679C\uFF0C\u4FDD\u7559\u539F\u4EF6\u3002" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "ppd-toolbox__workspace", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("main", { className: "ppd-toolbox__preview-panel", "aria-label": "\u5B9E\u65F6\u9884\u89C8", "aria-busy": previewBusy, children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__preview-heading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: "\u5B9E\u65F6\u9884\u89C8" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { "aria-live": "polite", children: previewBusy ? "\u6B63\u5728\u66F4\u65B0\u2026" : toolPreview ? "\u5DF2\u66F4\u65B0" : "" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__preview-toolbar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__preview-tabs", role: "group", "aria-label": "\u9884\u89C8\u89C6\u56FE", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", "aria-pressed": displayedPreviewMode === 0, onClick: () => setPreviewMode(0), children: "\u6548\u679C" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", "aria-pressed": displayedPreviewMode === -1, onClick: () => setPreviewMode(-1), children: "\u6E90\u56FE" }),
            toolPreview?.images.slice(1).map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", "aria-pressed": displayedPreviewMode === index + 1, onClick: () => setPreviewMode(index + 1), children: previewLabel(image, index + 1) }, index))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "ppd-toolbox__upload", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "input",
              {
                type: "file",
                accept: "image/png,image/jpeg,image/webp",
                disabled: !!busy,
                onChange: (event) => {
                  void importFile(event.currentTarget.files?.[0]);
                  event.currentTarget.value = "";
                }
              }
            ),
            busy === "import" ? "\u6B63\u5728\u8BFB\u53D6\u2026" : "\uFF0B \u4E0A\u4F20\u56FE\u7247"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "ppd-toolbox__previews", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          PreviewCard,
          {
            title: displayedPreviewMode === -1 ? "\u6E90\u56FE" : displayedPreviewMode === 0 ? "\u6548\u679C" : previewLabel(toolPreview.images[displayedPreviewMode], displayedPreviewMode),
            preview: displayedPreviewMode === -1 || !hasProcessing ? sourcePreview : toolPreview?.images[displayedPreviewMode],
            unit: enabled.resize && displayedPreviewMode !== -1 ? String(options.resize.unit) : "px",
            empty: previewBusy ? "\u6B63\u5728\u751F\u6210\u9884\u89C8\u2026" : previewError ? "\u9884\u89C8\u672A\u5B8C\u6210" : selectedIds.length ? "\u52FE\u9009\u5DE5\u5177\u5E76\u8C03\u6574\u53C2\u6570" : "\u9009\u62E9\u56FE\u7247\u540E\u81EA\u52A8\u9884\u89C8"
          }
        ) }),
        selectedIds.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "ppd-toolbox__preview-note", children: [
          "\u9884\u89C8\u7B2C\u4E00\u5F20\uFF0C\u4FDD\u5B58\u65F6\u5904\u7406\u5168\u90E8 ",
          selectedIds.length,
          " \u5F20\u3002"
        ] }),
        toolPreview?.pendingPattern && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__preview-note", children: "\u8BF7\u9009\u62E9\u56FE\u6848\u56FE\u7247\uFF1B\u5F53\u524D\u9884\u89C8\u7684\u95F4\u8DDD\u4FDD\u6301\u900F\u660E\u3002" }),
        toolPreview?.transparentCrop?.status === "review" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__preview-note", role: "status", children: toolPreview.reviewPreview ? "\u8FD9\u5F20\u56FE\u7247\u9700\u8981\u590D\u6838\uFF1A\u5DF2\u4FDD\u7559\u6240\u6709\u975E\u900F\u660E\u50CF\u7D20\uFF0C\u53EF\u7EE7\u7EED\u8C03\u6574\u5E76\u9884\u89C8\u6548\u679C\u3002\u4FDD\u5B58\u65F6\u4EC5\u5C06\u88C1\u8FB9\u56FE\u7247\u548C\u539F\u56E0\u8BF4\u660E\u653E\u5165\u201C\u5F85\u590D\u6838\u201D\u6587\u4EF6\u5939\uFF0C\u540E\u7EED\u6548\u679C\u4E0D\u4F1A\u4FDD\u5B58\u3002" : "\u8FD9\u5F20\u56FE\u7247\u9700\u8981\u590D\u6838\uFF1A\u672A\u5220\u9664\u4EFB\u4F55\u975E\u900F\u660E\u50CF\u7D20\uFF0C\u540E\u7EED\u52A0\u5DE5\u5DF2\u6682\u505C\u3002\u4FDD\u5B58\u65F6\u56FE\u7247\u548C\u539F\u56E0\u8BF4\u660E\u4F1A\u5355\u72EC\u653E\u5165\u201C\u5F85\u590D\u6838\u201D\u6587\u4EF6\u5939\u3002" }),
        !!toolPreview?.files.length && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("ul", { className: "ppd-toolbox__preview-files", children: toolPreview.files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: file.name }, index)) }),
        previewError && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__preview-error", role: "alert", children: previewError })
      ] }) })
    ] }),
    notice && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__notice", role: "status", children: notice }),
    error && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__error", role: "alert", children: error })
  ] });
}
function PreviewCard({ title, preview, unit = "px", empty = "\u5C1A\u672A\u751F\u6210" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("figure", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("figcaption", { children: title }),
    preview ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("img", { src: preview.dataUrl, alt: preview.name }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("small", { title: preview.name, children: preview.name }),
      preview.name.includes("\u6821\u6837") && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("small", { children: "\u68CB\u76D8\u683C\u8868\u793A\u900F\u660E\u533A\u57DF\uFF1B\u7EA2\u7EBF\u4E3A\u88C1\u5207\u8FB9\u754C\uFF0C\u84DD\u7EBF\u4E3A\u542B\u51FA\u8840\u7684\u56FE\u7247\u8FB9\u754C\u3002\u6821\u6837\u52FF\u7528\u4E8E\u751F\u4EA7\u3002" }),
      preview.width && preview.height ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("small", { children: [
        preview.width,
        " \xD7 ",
        preview.height,
        " px",
        preview.format ? ` \xB7 ${preview.format.toUpperCase()}` : "",
        preview.density ? ` \xB7 ${preview.density} DPI` : ""
      ] }) : null,
      preview.width && preview.height && preview.density && unit !== "px" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("small", { children: [
        Number((preview.width / unitFactor(unit, preview.density)).toFixed(4)),
        " \xD7 ",
        Number((preview.height / unitFactor(unit, preview.density)).toFixed(4)),
        " ",
        unit
      ] }) : null
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "ppd-toolbox__preview-empty", children: empty })
  ] });
}
function OutlineRangeField({ name, label, value, min, max, step, longEdge, onChange }) {
  const id = (0, import_react5.useId)();
  const [draft, setDraft] = (0, import_react5.useState)(String(value));
  (0, import_react5.useEffect)(() => {
    setDraft(String(value));
  }, [value]);
  const change = (next) => {
    setDraft(String(next));
    onChange(next);
  };
  const pixels = longEdge === void 0 ? void 0 : longEdge * value / 100;
  const pixelText = pixels === void 0 ? "\u2014 px" : `${Number(pixels.toFixed(4))} px`;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__range-field", "data-outline-parameter": name, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { htmlFor: id, children: [
      label,
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "input",
        {
          id,
          "aria-label": label,
          type: "number",
          value: draft,
          min,
          max,
          step,
          onChange: (event) => {
            setDraft(event.currentTarget.value);
            const next = event.currentTarget.valueAsNumber;
            if (Number.isFinite(next) && next >= min && next <= max) onChange(next);
          },
          onBlur: (event) => {
            const next = event.currentTarget.valueAsNumber;
            change(Number.isFinite(next) ? Math.max(min, Math.min(max, next)) : value);
          }
        }
      )
    ] }),
    ["distancePercent", "strokePercent", "roundingPercent"].includes(name) && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("output", { "data-outline-pixels": name, "aria-live": "polite", children: pixelText }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "input",
      {
        type: "range",
        "aria-label": `${label}\u6ED1\u5757`,
        min,
        max,
        step,
        value,
        onChange: (event) => change(event.currentTarget.valueAsNumber)
      }
    )
  ] });
}
function ToolFields({ tool, values, images, update, importPattern, patternBusy, outlineLongEdge }) {
  const number = (name, label, min, max, step) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { children: [
    label,
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "input",
      {
        type: "number",
        value: String(values[name]),
        min,
        max,
        step,
        onChange: (event) => update(name, tool === "print" && event.target.value === "" ? "" : Number(event.target.value))
      }
    )
  ] });
  const select = (name, label, rows) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { children: [
    label,
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "select",
      {
        value: String(values[name]),
        onChange: (event) => update(name, event.target.value),
        children: rows.map(([value, text]) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value, children: text }, value))
      }
    )
  ] });
  const check = (name, label) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "ppd-toolbox__check", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "input",
      {
        type: "checkbox",
        checked: Boolean(values[name]),
        onChange: (event) => update(name, event.target.checked)
      }
    ),
    label
  ] });
  const color = (name, label) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { children: [
    label,
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { type: "color", value: String(values[name]), onChange: (event) => update(name, event.target.value) })
  ] });
  const range = (name, label, min, max, step) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    OutlineRangeField,
    {
      name,
      label,
      value: Number(values[name]),
      min,
      max,
      step,
      longEdge: outlineLongEdge,
      onChange: (value) => update(name, value)
    }
  );
  const units = /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { children: [
    "\u5355\u4F4D",
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("select", { value: String(values.unit), onChange: (event) => update("unit", event.target.value), children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("optgroup", { label: "\u50CF\u7D20", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: "px", children: "\u50CF\u7D20 px" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("optgroup", { label: "\u516C\u5236", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: "mm", children: "\u6BEB\u7C73 mm" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: "cm", children: "\u5398\u7C73 cm" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("optgroup", { label: "\u82F1\u5236", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: "in", children: "\u82F1\u5BF8 in" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: "ft", children: "\u82F1\u5C3A ft" })
      ] })
    ] })
  ] });
  const edges = (title, mode, prefix, uniform) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "ppd-toolbox__edge-group", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h4", { children: title }),
    select(mode, `${title}\u8BBE\u7F6E`, [["uniform", "\u56DB\u8FB9\u7EDF\u4E00"], ["edges", "\u5206\u522B\u8BBE\u7F6E"]]),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "ppd-toolbox__fields", children: values[mode] === "edges" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      number(`${prefix}Top`, `\u4E0A${title}`, 0, 1e3, "any"),
      number(`${prefix}Right`, `\u53F3${title}`, 0, 1e3, "any"),
      number(`${prefix}Bottom`, `\u4E0B${title}`, 0, 1e3, "any"),
      number(`${prefix}Left`, `\u5DE6${title}`, 0, 1e3, "any")
    ] }) : number(uniform, title, 0, 1e3, "any") })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "ppd-toolbox__fields", children: [
    tool === "resize" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__pixel-basis", children: "\u4EE5\u6B64\u524D\u5904\u7406\u7ED3\u679C\u4E3A\u57FA\u7840\u8BBE\u7F6E\u6700\u7EC8\u6210\u54C1\u5C3A\u5BF8\uFF0C\u51FA\u8840\u5728\u4E4B\u540E\u6DFB\u52A0\u3002" }),
      number("width", "\u5BBD", 0.01, 3e4, "any"),
      number("height", "\u9AD8", 0.01, 3e4, "any"),
      check("lockAspect", "\u9501\u5B9A\u6BD4\u4F8B"),
      units,
      number("ppi", "DPI / PPI", 30, 1200, 1)
    ] }),
    tool === "rotate" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      number("angle", "\u89D2\u5EA6", -360, 360, 1),
      check("flipHorizontal", "\u6C34\u5E73\u7FFB\u8F6C"),
      check("flipVertical", "\u5782\u76F4\u7FFB\u8F6C")
    ] }),
    tool === "color" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      number("brightness", "\u4EAE\u5EA6", -100, 100, 1),
      number("contrast", "\u5BF9\u6BD4\u5EA6", -100, 100, 1),
      number("saturation", "\u9971\u548C\u5EA6", -100, 100, 1),
      number("temperature", "\u51B7\u6696", -100, 100, 1)
    ] }),
    tool === "export" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      select("mirrorJoin", "\u955C\u50CF\u62FC\u63A5", [["none", "\u4E0D\u62FC\u63A5"], ["horizontal", "\u5DE6\u53F3\u62FC\u63A5"], ["vertical", "\u4E0A\u4E0B\u62FC\u63A5"]]),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__pixel-basis", children: "\u5DE6\u53F3\uFF1A\u5DE6\u539F\u56FE\uFF0B\u53F3\u6C34\u5E73\u955C\u50CF\uFF1B\u4E0A\u4E0B\uFF1A\u4E0A\u539F\u56FE\uFF0B\u4E0B\u5782\u76F4\u955C\u50CF\u3002\u524D\u9762\u5904\u7406\u5B8C\u6210\u540E\u65E0\u7F1D\u62FC\u63A5\uFF0C\u5BBD\u5EA6\u6216\u9AD8\u5EA6\u7FFB\u500D\uFF0C\u9884\u89C8\u548C\u4FDD\u5B58\u76F4\u63A5\u8F93\u51FA\u62FC\u597D\u7684\u56FE\u3002" }),
      select("format", "\u683C\u5F0F", [["png", "PNG"], ["jpeg", "JPEG"], ["webp", "WebP"], ["pdf", "PDF"]]),
      number("quality", "\u8D28\u91CF", 1, 100, 1),
      color("background", "\u900F\u660E\u533A\u5E95\u8272"),
      check("mirror", "\u955C\u50CF"),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__pixel-basis", children: "\u52FE\u9009\u955C\u50CF\u540E\uFF0C\u989D\u5916\u8F93\u51FA\u4E00\u4EFD\u6700\u7EC8\u6548\u679C\u7684\u6C34\u5E73\u955C\u50CF\u3002" })
    ] }),
    tool === "print" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__pixel-basis", children: "\u8FB9\u8DDD\u5355\u4F4D\uFF1A\u6BEB\u7C73 mm\u3002\u6210\u54C1\u5C3A\u5BF8\u548C DPI \u6CBF\u7528\u524D\u9762\u5904\u7406\u540E\u7684\u56FE\u7247\u3002" }),
      edges("\u51FA\u8840", "bleedSetup", "bleed", "bleed"),
      select("bleedMode", "\u51FA\u8840\u65B9\u5F0F", [["background", "\u80CC\u666F\u586B\u5145"], ["transparent", "\u900F\u660E\u7559\u8FB9"], ["extend", "\u8FB9\u7F18\u5EF6\u5C55"]]),
      values.bleedMode === "transparent" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__pixel-basis", children: "\u65B0\u589E\u7559\u8FB9\u4FDD\u6301\u900F\u660E\u3002\u5BFC\u51FA JPG \u65F6\u4F1A\u4F7F\u7528\u683C\u5F0F\u533A\u7684\u201C\u900F\u660E\u533A\u5E95\u8272\u201D\u586B\u5145\u3002" }) : color("background", "\u80CC\u666F\u8272")
    ] }),
    tool === "outline" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      range("distancePercent", "\u95F4\u8DDD %", 0, 100, 0.1),
      range("strokePercent", "\u7EBF\u5BBD %", 0, 10, 0.01),
      range("roundingPercent", "\u5E73\u6ED1 %", 0, 100, 0.1),
      range("threshold", "\u900F\u660E\u9608\u503C", 1, 250, 1),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "ppd-toolbox__pixel-basis", children: outlineLongEdge === void 0 ? "\u9009\u62E9\u900F\u660E\u56FE\u7247\u540E\u663E\u793A\u5BF9\u5E94\u50CF\u7D20\u503C\u3002" : `\u50CF\u7D20\u503C\u4EE5\u53BB\u9664\u5168\u900F\u660E\u8FB9\u540E\u7684\u4E3B\u4F53\u957F\u8FB9 ${outlineLongEdge} px \u4E3A\u57FA\u51C6\uFF1B\u5E73\u6ED1\u4E3A\u51F9\u53E3\u5408\u5E76\u7A0B\u5EA6\u3002` }),
      select("fill", "\u95F4\u8DDD\u586B\u5145", [["none", "\u900F\u660E"], ["solid", "\u7EAF\u8272"], ["pattern", "\u56FE\u6848"]]),
      color("fillColor", "\u586B\u5145\u8272"),
      color("strokeColor", "\u63CF\u8FB9\u8272"),
      values.fill === "pattern" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
        select("patternId", "\u56FE\u6848\u56FE\u7247", [["", "\u8BF7\u9009\u62E9"], ...images.map((row) => [row.id, row.name])]),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "ppd-toolbox__upload", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "input",
            {
              type: "file",
              accept: "image/png,image/jpeg,image/webp",
              onChange: (event) => {
                void importPattern(event.currentTarget.files?.[0]);
                event.currentTarget.value = "";
              }
            }
          ),
          patternBusy ? "\u6B63\u5728\u8BFB\u53D6\u56FE\u6848\u2026" : "\u4ECE\u672C\u5730\u9009\u62E9\u56FE\u6848"
        ] }),
        range("patternScale", "\u56FE\u6848\u7F29\u653E %", 10, 300, 1),
        range("patternRotation", "\u56FE\u6848\u89D2\u5EA6", -180, 180, 1)
      ] }),
      check("fillHoles", "\u5FFD\u7565\u4E3B\u4F53\u5185\u90E8\u5B54\u6D1E")
    ] })
  ] });
}

// plugins/podplo-dsh/src/plugin-update-control.tsx
var import_react6 = require("react");

// plugins/podplo-dsh/package.json
var package_default = {
  name: "@podplo/dsh-plugin",
  version: "0.1.0-alpha.77.results",
  private: true,
  license: "UNLICENSED",
  description: "PodPlo libraries, personal Skills and generation tools for native DeepSeek Harness",
  type: "module",
  main: "dist/index.js",
  exports: {
    ".": "./dist/index.js",
    "./client": "./dist/client.js",
    "./package.json": "./package.json"
  },
  files: [
    "dist",
    "cordis.patch.yml",
    "README.md"
  ],
  dsh: {
    bundle: {
      patch: "./cordis.patch.yml"
    },
    client: {
      platform: "web",
      immediately: true,
      inject: [
        "@deepseek-ai/dsh-client-connection",
        "@deepseek-ai/dsh-client-ui-sidebar",
        "@deepseek-ai/dsh-client-ui-layout",
        "@deepseek-ai/dsh-client-ui-workspace",
        "@deepseek-ai/dsh-client-ui-session"
      ]
    }
  },
  dependencies: {
    sharp: "0.35.5"
  },
  peerDependencies: {
    "@deepseek-ai/cordis": "~4.1.0",
    "@deepseek-ai/dsh-mcp-client": "0.2.2-rc.1",
    "@deepseek-ai/dsh-home-paths": "0.2.2-rc.1",
    "@deepseek-ai/dsh-llm": "0.2.2-rc.1",
    "@deepseek-ai/dsh-credentials": "0.2.2-rc.1",
    "@deepseek-ai/schemastery": "~3.19.0"
  },
  engines: {
    node: ">=24.9.0"
  }
};

// plugins/podplo-dsh/src/version.ts
var PLUGIN_VERSION = package_default.version;

// plugins/podplo-dsh/src/plugin-update-control.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function PluginUpdateControl({ request, taskBusy = false }) {
  const [status, setStatus] = (0, import_react6.useState)({ currentVersion: PLUGIN_VERSION, phase: "idle", updateAvailable: false });
  const [working, setWorking] = (0, import_react6.useState)("");
  const [checked, setChecked] = (0, import_react6.useState)(false);
  const [error, setError] = (0, import_react6.useState)("");
  const alive = (0, import_react6.useRef)(true), inFlight = (0, import_react6.useRef)(false);
  (0, import_react6.useEffect)(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const receive = (data) => {
    if (!data || typeof data.currentVersion !== "string" || typeof data.phase !== "string") throw new Error("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u63D2\u4EF6\u7248\u672C\uFF0C\u8BF7\u91CD\u8BD5\u3002");
    setStatus(data);
    setError(data.error ?? "");
  };
  (0, import_react6.useEffect)(() => {
    let active = true;
    void request("plugin.status").then(({ data }) => {
      if (active) receive(data);
    }).catch(() => {
      if (active) setError("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u91CD\u8BD5\u3002");
    });
    return () => {
      active = false;
    };
  }, [request]);
  (0, import_react6.useEffect)(() => {
    if (!["checking", "installing"].includes(status.phase)) return;
    let active = true, reading = false;
    const timer = setInterval(() => {
      if (reading) return;
      reading = true;
      void request("plugin.status").then(({ data }) => {
        if (active) receive(data);
      }).catch(() => {
        if (active) setError("\u66F4\u65B0\u72B6\u6001\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u68C0\u67E5\u3002");
      }).finally(() => {
        reading = false;
      });
    }, 1500);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [status.phase, request]);
  async function act(install) {
    if (inFlight.current || ["checking", "installing"].includes(status.phase)) return;
    if (install && (taskBusy || !status.updateAvailable || !status.latestVersion)) return;
    inFlight.current = true;
    setWorking(install ? "installing" : "checking");
    setError("");
    try {
      const { data } = await request(
        install ? "plugin.installUpdate" : "plugin.checkUpdate",
        install ? { version: status.latestVersion } : { force: true }
      );
      if (!alive.current) return;
      receive(data);
      if (!install) setChecked(true);
    } catch (cause) {
      if (alive.current) setError(cause instanceof Error ? cause.message : "\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u91CD\u8BD5\u3002");
    } finally {
      inFlight.current = false;
      if (alive.current) setWorking("");
    }
  }
  const pending = !!working || ["checking", "installing"].includes(status.phase);
  const installed = ["applied", "restart-required"].includes(status.phase);
  const message = status.phase === "installing" || working === "installing" ? "\u6B63\u5728\u66F4\u65B0\u63D2\u4EF6\u2026" : status.phase === "applied" ? "\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u6B63\u5728\u52A0\u8F7D\u65B0\u7248\u2026" : status.phase === "restart-required" ? "\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002" : checked && status.phase === "idle" && !status.updateAvailable && !error ? "\u6682\u65E0\u53EF\u7528\u66F4\u65B0\u3002" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "ppd-plugin-update", "data-podplo-plugin-update": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "ppd-plugin-version", "data-podplo-plugin-version": true, children: [
      "PodPlo v",
      status.currentVersion
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: "ppd-button ppd-button-quiet", disabled: pending || installed, onClick: () => void act(false), children: working === "checking" || status.phase === "checking" ? "\u68C0\u67E5\u4E2D\u2026" : "\u68C0\u67E5\u66F4\u65B0" }),
    status.updateAvailable && status.latestVersion && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "ppd-plugin-version", children: [
      "\u53EF\u66F4\u65B0\u81F3 v",
      status.latestVersion
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        type: "button",
        className: "ppd-button ppd-button-primary",
        disabled: pending || installed || taskBusy || !status.updateAvailable || !status.latestVersion,
        title: taskBusy ? "\u8BF7\u7B49\u5F85\u5F53\u524D\u4EFB\u52A1\u7ED3\u675F\u540E\u66F4\u65B0" : status.updateAvailable && status.latestVersion ? `\u66F4\u65B0\u5230 ${status.latestVersion}` : "\u8BF7\u5148\u68C0\u67E5\u662F\u5426\u6709\u53EF\u7528\u66F4\u65B0",
        onClick: () => void act(true),
        children: working === "installing" || status.phase === "installing" ? "\u66F4\u65B0\u4E2D\u2026" : "\u66F4\u65B0\u7248\u672C"
      }
    ),
    (error || message) && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `ppd-plugin-update-message${error ? " is-error" : ""}`, role: error ? "alert" : "status", children: error || message })
  ] });
}

// plugins/podplo-dsh/src/panels.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var PAGE_SIZE = 18;
var USER_SKILL_REFERENCE_LIMIT = 12;
var CARD_TITLE_LIMIT = 24;
var isConnected = (status) => status === "connected" || status === "authenticated" || status === "ready";
var displayError = (error) => error instanceof Error ? error.message : "\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002";
var displayUserSkillError = (error) => {
  const message = displayError(error);
  const code = error && typeof error === "object" && "code" in error ? String(error.code ?? "") : "";
  return code === "SKILLS_WRITE_SCOPE_REQUIRED" || message.includes("SKILLS_WRITE_SCOPE_REQUIRED") ? "\u5F53\u524D\u8FDE\u63A5\u6682\u4E0D\u652F\u6301\u7BA1\u7406\u81EA\u5EFA Skill\uFF0C\u4F60\u7684\u5185\u5BB9\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u786E\u8BA4\u4E3B\u7AD9\u5DF2\u5F00\u653E\u540E\u518D\u91CD\u65B0\u6388\u6743\u3002\uFF08SKILLS_WRITE_SCOPE_REQUIRED\uFF09" : message;
};
var uniq = (rows) => [...new Set(rows)];
var cardTitle = (value, filename = false) => {
  const normalized = value.replace(/\s+/g, " ").trim();
  const display = filename ? normalized.replace(/\.[a-z0-9]{1,10}$/i, "") : normalized;
  const characters = Array.from(display || normalized);
  return characters.length > CARD_TITLE_LIMIT ? `${characters.slice(0, CARD_TITLE_LIMIT).join("")}\u2026` : characters.join("");
};
var blankDraft = () => ({ name: "", description: "", prompt: "", referenceAssetIds: [] });
var fieldsOf = (row) => ({ name: row.name, description: row.description, prompt: row.prompt, referenceAssetIds: [...row.referenceAssetIds] });
var availableCredits = (snapshot) => typeof snapshot?.account.balance === "number" ? snapshot.account.balance : snapshot?.account.balance?.availableCredits;
var connectionLabel = (snapshot) => {
  if (!snapshot) return "\u6B63\u5728\u521D\u59CB\u5316";
  if (snapshot.account.status === "error") return "\u9700\u91CD\u65B0\u767B\u5F55";
  if (!isConnected(snapshot.account.status)) return snapshot.account.status === "authorizing" ? "\u8FDE\u63A5\u4E2D" : "\u672A\u8FDE\u63A5";
  if (snapshot.connection.phase === "verified" || snapshot.connection.phase === "ready") return "\u5DF2\u8FDE\u63A5";
  return "\u8FDE\u63A5\u4E2D";
};
function randomUuid() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function Icon({ name }) {
  const values = {
    back: "\u2190",
    search: "\u2315",
    heart: "\u2661",
    upload: "\u2191",
    plus: "+",
    refresh: "\u21BB",
    trash: "\u232B",
    "arrow-up": "\u2191",
    "arrow-down": "\u2193"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-icon", "aria-hidden": "true", children: values[name] });
}
function Status({ loading, error, empty, children }) {
  if (loading) return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-state", role: "status", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-spinner" }),
    "\u6B63\u5728\u8BFB\u53D6\u2026"
  ] });
  if (error) return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-state ppd-error", role: "alert", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: "\u8BFB\u53D6\u5931\u8D25" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: error })
  ] });
  if (empty) return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-state", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: "\u8FD9\u91CC\u8FD8\u6CA1\u6709\u5185\u5BB9" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: empty })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children });
}
function Notice({ error, notice }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-alert", role: "alert", children: error }),
    notice && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-notice", role: "status", children: notice })
  ] });
}
function PageNav({ page, total, onPage }) {
  const navRef = (0, import_react7.useRef)(null);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages <= 1) return null;
  const navigate = (nextPage) => {
    const panel = navRef.current?.closest(".ppd-panel-scroll");
    onPage(nextPage);
    requestAnimationFrame(() => panel?.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("nav", { ref: navRef, className: "ppd-pagination", "aria-label": "\u5206\u9875", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", disabled: page <= 1, onClick: () => navigate(page - 1), children: "\u4E0A\u4E00\u9875" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
      page,
      " / ",
      pages
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", disabled: page >= pages, onClick: () => navigate(page + 1), children: "\u4E0B\u4E00\u9875" })
  ] });
}
function SearchBar({ value, placeholder, busy, children, navigation, onChange, onSearch, onRefresh }) {
  const form = /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("form", { className: "ppd-search", onSubmit: (event) => {
    event.preventDefault();
    onSearch();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-sr-only", children: "\u641C\u7D22" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "search" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { value, maxLength: 120, placeholder, onChange: (event) => onChange(event.target.value) })
    ] }),
    children,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "submit", className: "ppd-button", disabled: busy, children: "\u641C\u7D22" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button", "aria-label": "\u5237\u65B0", title: "\u5237\u65B0", disabled: busy, onClick: onRefresh, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "refresh" }) })
  ] });
  return navigation ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-library-toolbar", children: [
    navigation,
    form
  ] }) : form;
}
function ImageFrame({ src, alt, before }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: `ppd-image ${before ? "ppd-image-pair" : ""}`, children: [
    before && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: before, alt: `${alt}\u5904\u7406\u524D`, referrerPolicy: "no-referrer" }),
    src ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src, alt, referrerPolicy: "no-referrer" }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-hidden": "true", children: "\u25A6" })
  ] });
}
function PrivateAssetPreview({ id, alt, request, revision }) {
  const [preview, setPreview] = (0, import_react7.useState)({ status: "loading" });
  (0, import_react7.useEffect)(() => {
    let active = true;
    setPreview({ status: "loading" });
    void request("assets.detail", { id }).then(({ data }) => {
      if (!active) return;
      setPreview(typeof data?.previewUrl === "string" && data.previewUrl ? { status: "ready", url: data.previewUrl } : data?.status === "processing" ? { status: "processing" } : { status: "error" });
    }).catch(() => {
      if (active) setPreview({ status: "error" });
    });
    return () => {
      active = false;
    };
  }, [id, request, revision]);
  if (preview.status === "processing") return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-image", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { role: "status", children: "\u56FE\u7247\u5904\u7406\u4E2D\uFF0C\u7A0D\u540E\u5237\u65B0" }) });
  if (preview.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-image", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { role: "alert", children: "\u9884\u89C8\u5931\u8D25\uFF0C\u70B9\u5F00\u91CD\u8BD5" }) });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-image", children: preview.url ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: preview.url, alt, referrerPolicy: "no-referrer", onError: () => setPreview({ status: "error" }) }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { "aria-label": "\u6B63\u5728\u52A0\u8F7D\u9884\u89C8", children: "\u25A6" }) });
}
function DetailShell({ title, eyebrow, onBack, actions, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { className: "ppd-detail", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("header", { className: "ppd-detail-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-back", onClick: onBack, children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "back" }),
        "\u8FD4\u56DE"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
        eyebrow && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-eyebrow", children: eyebrow }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { children: title })
      ] }),
      actions && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-actions", children: actions })
    ] }),
    children
  ] });
}
function FavoriteButton({ active, busy, onClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: `ppd-favorite ${active ? "is-active" : ""}`, "aria-label": active ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF", title: active ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF", disabled: busy, onClick: (event) => {
    event.stopPropagation();
    onClick();
  }, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "heart" }) });
}
function DetailMedia({ src, alt, label, reference = false }) {
  const dialog = (0, import_react7.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("figure", { className: reference ? "ppd-detail-reference" : "ppd-detail-artwork", "data-detail-media": reference ? "reference" : "result", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("figcaption", { children: label }),
    src ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", "aria-label": `\u653E\u5927${label}`, "aria-haspopup": "dialog", onClick: () => dialog.current?.showModal(), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src, alt, referrerPolicy: "no-referrer" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dialog", { ref: dialog, className: "ppd-media-dialog", "aria-label": `${label}\u9884\u89C8`, onClick: (event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", "aria-label": "\u5173\u95ED\u56FE\u7247\u9884\u89C8", onClick: () => dialog.current?.close(), children: "\u5173\u95ED" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src, alt, referrerPolicy: "no-referrer" })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-state", children: "\u6682\u65E0\u9884\u89C8\u56FE" })
  ] });
}
function ResourceDetail({ title, kind, onBack, media, actions, notice, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { className: `ppd-detail ppd-resource-detail ppd-${kind}-detail`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-back", onClick: onBack, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "back" }),
      "\u8FD4\u56DE"
    ] }),
    notice,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-resource-detail-grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-resource-visual", children: media }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("aside", { className: "ppd-resource-info", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { children: title }),
        children,
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-resource-detail-actions", children: actions })
      ] })
    ] })
  ] });
}
function PublicSkillDetail({ skill, onBack, actions, notice }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    ResourceDetail,
    {
      title: skill.title,
      kind: "skill",
      onBack,
      notice,
      actions,
      media: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(DetailMedia, { src: skill.coverImage, alt: `${skill.title}\u7ED3\u679C\u56FE`, label: "\u7ED3\u679C\u56FE" }),
      children: [
        skill.beforeImage && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(DetailMedia, { src: skill.beforeImage, alt: `${skill.title}\u53C2\u8003\u56FE`, label: "\u53C2\u8003\u56FE", reference: true }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { className: "ppd-resource-about", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { children: "\u4ECB\u7ECD" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: skill.description || skill.summary })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SkillFacts, { skill }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-tags", children: uniq([...skill.categories || [], ...skill.tags || []]).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: tag }, tag)) })
      ]
    }
  );
}
function GalleryDetail({ item, onBack, actions, notice }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    ResourceDetail,
    {
      title: item.label,
      kind: "gallery",
      onBack,
      actions,
      notice,
      media: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(DetailMedia, { src: item.previewUrl || item.thumbnailUrl, alt: item.label, label: "\u7D20\u6750\u9884\u89C8" }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { className: "ppd-resource-about", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { children: "\u6807\u7B7E" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-tags", children: uniq([item.label, item.category, item.style, ...item.keywords || []].filter(Boolean)).map((word) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: word }, word)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dl", { className: "ppd-resource-facts", children: [
          item.collectionName && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u5408\u96C6" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: item.collectionName })
          ] }),
          item.width && item.height ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u5C3A\u5BF8" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dd", { children: [
              item.width,
              " \xD7 ",
              item.height
            ] })
          ] }) : null
        ] })
      ]
    }
  );
}
function useFavorites(request) {
  const [favorites, setFavorites] = (0, import_react7.useState)([]);
  const [busyKey, setBusyKey] = (0, import_react7.useState)("");
  const [error, setError] = (0, import_react7.useState)("");
  const refresh = (0, import_react7.useCallback)(async () => {
    try {
      const rows = [];
      const seen = /* @__PURE__ */ new Set();
      let cursor;
      for (; ; ) {
        const { data } = await request("favorites.list", { limit: 100, ...cursor ? { cursor } : {} });
        for (const row of Array.isArray(data?.items) ? data.items : []) {
          const key = `${row.type}:${row.id}`;
          if (!seen.has(key)) {
            seen.add(key);
            rows.push(row);
          }
        }
        const next = typeof data?.nextCursor === "string" && data.nextCursor ? data.nextCursor : void 0;
        if (!next || seen.has(`cursor:${next}`)) break;
        seen.add(`cursor:${next}`);
        cursor = next;
      }
      setFavorites(rows);
      setError("");
    } catch (error2) {
      setError(displayError(error2));
    }
  }, [request]);
  (0, import_react7.useEffect)(() => {
    void refresh();
  }, [refresh]);
  const has = (0, import_react7.useCallback)((type, id) => favorites.some((row) => row.type === type && row.id === id), [favorites]);
  const toggle = (0, import_react7.useCallback)(async (favorite) => {
    const key = `${favorite.type}:${favorite.id}`;
    setBusyKey(key);
    setError("");
    try {
      await request("assets.favorite", { kind: favorite.type, id: favorite.id, favorite: !has(favorite.type, favorite.id) });
      await refresh();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusyKey("");
    }
  }, [has, refresh, request]);
  return { favorites, has, toggle, refresh, busyKey, error };
}
function AccountBar({ snapshot, busy, onAccountAction, onRefresh, request }) {
  const connected = isConnected(snapshot?.account.status);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-account", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-account-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-connection", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: `ppd-dot ${connected ? "is-online" : ""}` }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: connected ? snapshot?.account.name || snapshot?.account.email || "PodPlo \u5DF2\u8FDE\u63A5" : "\u5C1A\u672A\u767B\u5F55 PodPlo" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: snapshot?.connection.message || (connected ? "\u8D26\u53F7\u4E0E\u4F1A\u8BDD\u8FDE\u63A5\u6B63\u5E38" : "\u767B\u5F55\u540E\u53EF\u4F7F\u7528\u79C1\u6709\u7D20\u6750\u548C\u81EA\u5EFA Skill") })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-account-meta", children: [
        typeof availableCredits(snapshot) === "number" && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { title: "\u53EF\u7528\u79EF\u5206", children: [
          availableCredits(snapshot),
          " \u79EF\u5206"
        ] }),
        !!snapshot?.pending.confirmations && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { title: "\u5F85\u786E\u8BA4\u7684\u5220\u9664\u64CD\u4F5C", children: [
          snapshot.pending.confirmations,
          " \u9879\u5F85\u786E\u8BA4"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-phase", children: connectionLabel(snapshot) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button", title: "\u540C\u6B65\u72B6\u6001", "aria-label": "\u540C\u6B65\u72B6\u6001", disabled: busy, onClick: onRefresh, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "refresh" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-quiet", disabled: busy, onClick: () => onAccountAction(connected ? "logout" : "login"), children: connected ? "\u9000\u51FA" : "\u767B\u5F55" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PluginUpdateControl, { request, taskBusy: !!snapshot?.pending.generations })
  ] });
}
function GalleryPanel({ request, onUse }) {
  const [query, setQuery] = (0, import_react7.useState)("");
  const [appliedQuery, setAppliedQuery] = (0, import_react7.useState)("");
  const [category, setCategory] = (0, import_react7.useState)("");
  const [items, setItems] = (0, import_react7.useState)([]);
  const [categories, setCategories] = (0, import_react7.useState)([]);
  const [cursor, setCursor] = (0, import_react7.useState)(null);
  const [total, setTotal] = (0, import_react7.useState)(0);
  const [detail, setDetail] = (0, import_react7.useState)();
  const [loading, setLoading] = (0, import_react7.useState)(true);
  const [busy, setBusy] = (0, import_react7.useState)("");
  const [error, setError] = (0, import_react7.useState)("");
  const [notice, setNotice] = (0, import_react7.useState)("");
  const favorites = useFavorites(request);
  const sequence = (0, import_react7.useRef)(0);
  const load = (0, import_react7.useCallback)(async (append = false, nextQuery = appliedQuery, nextCategory = category) => {
    const token = ++sequence.current;
    setLoading(true);
    setError("");
    try {
      const { data } = await request("gallery.list", { query: nextQuery, category: nextCategory, ...append && cursor ? { cursor } : {} });
      if (token !== sequence.current) return;
      const nextItems = Array.isArray(data?.items) ? data.items : [];
      setItems((old) => append ? [...new Map([...old, ...nextItems].map((row) => [row.id, row])).values()] : nextItems);
      setCategories(Array.isArray(data?.categories) ? data.categories : []);
      setCursor(data?.nextCursor ?? null);
      setTotal(Number(data?.total) || nextItems.length);
    } catch (error2) {
      if (token === sequence.current) setError(displayError(error2));
    } finally {
      if (token === sequence.current) setLoading(false);
    }
  }, [appliedQuery, category, cursor, request]);
  (0, import_react7.useEffect)(() => {
    void load(false, "", "");
  }, []);
  async function open(item) {
    setBusy(item.id);
    setError("");
    try {
      const { data } = await request("gallery.detail", { id: item.id });
      setDetail(data);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function use(item) {
    if (busy) return;
    setBusy(item.id);
    setError("");
    setNotice("");
    try {
      const { data } = await request("selection.resolve", { kind: "gallery", id: item.id });
      await onUse({ ...data, previewUrl: item.previewUrl || item.thumbnailUrl });
      setNotice(`\u5DF2\u5C06\u201C${item.label}\u201D\u52A0\u5165\u751F\u56FE\u6846\u3002`);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  if (detail) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(GalleryDetail, { item: detail, onBack: () => setDetail(void 0), actions: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: busy === detail.id, onClick: () => void use(detail), children: busy === detail.id ? "\u6B63\u5728\u52A0\u5165\u2026" : "\u52A0\u5165\u53C2\u8003\u56FE" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FavoriteButton, { active: favorites.has("gallery", detail.id), busy: !!favorites.busyKey, onClick: () => void favorites.toggle({ type: "gallery", id: detail.id }) })
  ] }), notice: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error: error || favorites.error, notice: busy === detail.id ? "\u6B63\u5728\u52A0\u5165\u53C2\u8003\u56FE\uFF0C\u8BF7\u7A0D\u5019\u2026" : notice }) });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error: error || favorites.error, notice }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchBar, { value: query, placeholder: "\u641C\u7D22\u56FE\u5E93", busy: loading, onChange: setQuery, onSearch: () => {
      const next = query.trim();
      setAppliedQuery(next);
      void load(false, next, category);
    }, onRefresh: () => void load(false), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("select", { "aria-label": "\u56FE\u5E93\u5206\u7C7B", value: category, onChange: (event) => {
      const value = event.target.value;
      setCategory(value);
      void load(false, appliedQuery, value);
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "", children: "\u5168\u90E8\u5206\u7C7B" }),
      categories.map((value) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value, children: value }, value))
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Status, { loading: loading && !items.length, error: !items.length ? error : "", empty: !loading && !items.length ? "\u6362\u4E2A\u5173\u952E\u8BCD\u6216\u5206\u7C7B\u8BD5\u8BD5\u3002" : "", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-grid", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { className: "ppd-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-card-open", "aria-label": `\u67E5\u770B ${item.label}`, disabled: busy === item.id, onClick: () => void open(item), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImageFrame, { src: item.thumbnailUrl, alt: item.label }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-card-copy", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title: item.label, children: cardTitle(item.label) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FavoriteButton, { active: favorites.has("gallery", item.id), busy: favorites.busyKey === `gallery:${item.id}`, onClick: () => void favorites.toggle({ type: "gallery", id: item.id }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-card-use", disabled: busy === item.id, onClick: () => void use(item), children: "\u52A0\u5165" })
    ] }, item.id)) }) }),
    cursor && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-load-more", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: loading, onClick: () => void load(true), children: loading ? "\u6B63\u5728\u8BFB\u53D6\u2026" : "\u52A0\u8F7D\u66F4\u591A" }) })
  ] });
}
function SkillFacts({ skill }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-skill-facts", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dl", { className: "ppd-resource-facts", children: [
      skill.inputs?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u9002\u7528\u8F93\u5165" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: skill.inputs.join(" \xB7 ") })
      ] }),
      skill.output && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u8F93\u51FA" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: skill.output })
      ] })
    ] }),
    [["\u4FDD\u7559\u5185\u5BB9", skill.keeps], ["\u6539\u53D8\u5185\u5BB9", skill.changes]].map(([title, values]) => values?.length ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: values.join(" \xB7 ") })
    ] }, title) : null)
  ] });
}
function PublicSkills({ request, onUse, navigation }) {
  const [query, setQuery] = (0, import_react7.useState)("");
  const [items, setItems] = (0, import_react7.useState)([]);
  const [categories, setCategories] = (0, import_react7.useState)([]);
  const [category, setCategory] = (0, import_react7.useState)("");
  const [page, setPage] = (0, import_react7.useState)(1);
  const [detail, setDetail] = (0, import_react7.useState)();
  const [family, setFamily] = (0, import_react7.useState)();
  const [loading, setLoading] = (0, import_react7.useState)(true);
  const [busy, setBusy] = (0, import_react7.useState)("");
  const [error, setError] = (0, import_react7.useState)("");
  const [notice, setNotice] = (0, import_react7.useState)("");
  const favorites = useFavorites(request);
  const sequence = (0, import_react7.useRef)(0);
  const navigationSequence = (0, import_react7.useRef)(0);
  const load = (0, import_react7.useCallback)(async (nextQuery = query, forceRefresh = false) => {
    const token = ++sequence.current;
    setLoading(true);
    setError("");
    const apply2 = (data) => {
      setItems(Array.isArray(data?.items) ? data.items : []);
      setCategories(Array.isArray(data?.categories) ? data.categories : []);
    };
    try {
      const args = { query: nextQuery.trim() };
      const { data } = await request("skills.list", args);
      if (token !== sequence.current) return;
      apply2(data);
      setPage(1);
      setLoading(false);
      void request("skills.list", { ...args, refresh: true, forceRefresh }).then(({ data: data2 }) => {
        if (token === sequence.current) apply2(data2);
      }).catch((error2) => {
        if (token === sequence.current && forceRefresh) setError(displayError(error2));
      });
    } catch (error2) {
      if (token === sequence.current) setError(displayError(error2));
    } finally {
      if (token === sequence.current) setLoading(false);
    }
  }, [query, request]);
  (0, import_react7.useEffect)(() => {
    void load("");
    return () => {
      sequence.current++;
      navigationSequence.current++;
    };
  }, []);
  const filtered = (0, import_react7.useMemo)(() => category ? items.filter((item) => item.categories?.includes(category)) : items, [category, items]);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  async function open(item) {
    const token = ++navigationSequence.current;
    setError("");
    if (item.kind !== "family") {
      setDetail(item);
      setFamily(void 0);
      setBusy("");
      return;
    }
    setBusy(item.slug);
    try {
      const { data } = await request("skills.family", { slug: item.slug });
      if (token !== navigationSequence.current) return;
      setFamily(data);
      setDetail(void 0);
    } catch (error2) {
      if (token === navigationSequence.current) setError(displayError(error2));
    } finally {
      if (token === navigationSequence.current) setBusy("");
    }
  }
  async function use(skill) {
    setBusy(skill.slug);
    setError("");
    try {
      const { data } = await request("selection.resolve", { kind: "skill", id: skill.executionSlug || skill.slug });
      await onUse({ ...data, previewUrl: skill.coverImage });
      setNotice(`\u5DF2\u5728\u751F\u56FE\u6846\u4E2D\u9009\u62E9\u201C${skill.title}\u201D\u3002`);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  if (family) return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(DetailShell, { title: family.title, eyebrow: "Skill \u65CF", onBack: () => setFamily(void 0), children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error: error || favorites.error, notice }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-family-intro", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: family.summary }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: family.chooseLabel })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-grid ppd-family-grid", children: family.members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("article", { className: "ppd-card", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-card-open", "aria-label": `\u67E5\u770B ${member.title}`, onClick: () => {
      setFamily(void 0);
      setDetail(member);
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImageFrame, { src: member.coverImage, before: member.beforeImage, alt: member.title }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-card-copy", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title: member.title, children: cardTitle(member.title) }) })
    ] }) }, member.slug)) })
  ] });
  if (detail) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PublicSkillDetail, { skill: detail, onBack: () => {
    if (detail.kind === "member" && detail.familySlug) {
      void request("skills.family", { slug: detail.familySlug }).then(({ data }) => {
        setFamily(data);
        setDetail(void 0);
      }).catch((error2) => setError(displayError(error2)));
    } else setDetail(void 0);
  }, actions: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: busy === detail.slug || !detail.executable, onClick: () => void use(detail), children: detail.executable ? "\u4F7F\u7528 Skill" : "\u8BF7\u5148\u9009\u62E9\u65CF\u6210\u5458" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FavoriteButton, { active: favorites.has("skill", detail.slug), busy: !!favorites.busyKey, onClick: () => void favorites.toggle({ type: "skill", id: detail.slug }) })
  ] }), notice: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error: error || favorites.error, notice }) });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error: error || favorites.error, notice }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchBar, { navigation, value: query, placeholder: "\u641C\u7D22\u516C\u5F00 Skill", busy: loading, onChange: setQuery, onSearch: () => void load(), onRefresh: () => void load(query, true), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("select", { "aria-label": "Skill \u5206\u7C7B", value: category, onChange: (event) => {
      setCategory(event.target.value);
      setPage(1);
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "", children: "\u5168\u90E8\u5206\u7C7B" }),
      categories.map((value) => {
        const id = typeof value === "string" ? value : value.id;
        const label = typeof value === "string" ? value : value.label;
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: id, children: label }, id);
      })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Status, { loading: loading && !filtered.length, error: !filtered.length ? error : "", empty: !loading && !filtered.length ? "\u6CA1\u6709\u5339\u914D\u7684 Skill\u3002" : "", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-grid", children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { className: "ppd-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-card-open", "aria-label": `\u67E5\u770B ${item.title}`, disabled: busy === item.slug, onClick: () => void open(item), children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImageFrame, { src: item.coverImage, before: item.beforeImage, alt: item.title }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-card-copy", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title: item.title, children: cardTitle(item.title) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FavoriteButton, { active: favorites.has("skill", item.slug), busy: favorites.busyKey === `skill:${item.slug}`, onClick: () => void favorites.toggle({ type: "skill", id: item.slug }) })
      ] }, item.slug)) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PageNav, { page, total: filtered.length, onPage: setPage })
    ] })
  ] });
}
function UploadReferencePicker({ request, ids, disabled, onSelect }) {
  const [query, setQuery] = (0, import_react7.useState)("");
  const [items, setItems] = (0, import_react7.useState)([]);
  const [cursor, setCursor] = (0, import_react7.useState)(null);
  const [loading, setLoading] = (0, import_react7.useState)(true);
  const [error, setError] = (0, import_react7.useState)("");
  const [search, setSearch] = (0, import_react7.useState)("");
  const sequence = (0, import_react7.useRef)(0);
  const inFlight = (0, import_react7.useRef)(false);
  async function load(append = false, term = query.trim()) {
    if (append && (inFlight.current || !cursor)) return;
    const token = ++sequence.current;
    inFlight.current = true;
    setLoading(true);
    setError("");
    if (!append) {
      setItems([]);
      setCursor(null);
      setSearch(term);
    }
    try {
      const { data } = await request("assets.list", { kind: "upload", query: term, limit: 24, ...append && cursor ? { cursor } : {} });
      if (sequence.current !== token) return;
      const rows = Array.isArray(data?.items) ? data.items.filter((row) => row.kind === "upload") : [];
      setItems((current) => append ? [...new Map([...current, ...rows].map((row) => [row.id, row])).values()] : rows);
      setCursor(typeof data?.nextCursor === "string" && data.nextCursor ? data.nextCursor : null);
    } catch (error2) {
      if (sequence.current === token) setError(displayError(error2));
    } finally {
      if (sequence.current === token) {
        inFlight.current = false;
        setLoading(false);
      }
    }
  }
  (0, import_react7.useEffect)(() => {
    void load(false, "");
    return () => {
      sequence.current++;
    };
  }, [request]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-upload-picker", "aria-label": "\u5DF2\u4E0A\u4F20\u56FE\u7247\u9009\u62E9\u5668", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchBar, { value: query, placeholder: "\u641C\u7D22\u5DF2\u4E0A\u4F20\u56FE\u7247", busy: loading || disabled, onChange: setQuery, onSearch: () => void load(), onRefresh: () => void load(false, search) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-alert", role: "alert", children: [
      error,
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: disabled || loading, onClick: () => void load(!!items.length && !!cursor, search), children: "\u91CD\u8BD5\u52A0\u8F7D\u56FE\u7247" })
    ] }),
    loading && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { role: "status", children: "\u6B63\u5728\u52A0\u8F7D\u5DF2\u4E0A\u4F20\u56FE\u7247\u2026" }),
    !loading && !error && !items.length && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: search ? "\u6CA1\u6709\u5339\u914D\u7684\u5DF2\u4E0A\u4F20\u56FE\u7247\u3002" : "\u8FD8\u6CA1\u6709\u4E0A\u4F20\u56FE\u7247\uFF0C\u53EF\u4EE5\u5148\u4ECE\u672C\u5730\u4E0A\u4F20\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-upload-grid", children: items.map((row, index) => {
      const selected = ids.includes(row.id), label = row.filename || `\u4E0A\u4F20\u56FE ${index + 1}`;
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
        "button",
        {
          type: "button",
          "aria-label": `${selected ? "\u5DF2\u6DFB\u52A0" : "\u6DFB\u52A0"} ${label}`,
          "aria-pressed": selected,
          disabled: disabled || selected || row.status !== "ready" || ids.length >= USER_SKILL_REFERENCE_LIMIT,
          onClick: () => onSelect(row),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PrivateAssetPreview, { id: row.id, alt: label, request, revision: 0 }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title: label, children: label }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: selected ? "\u5DF2\u6DFB\u52A0" : row.status === "ready" ? "\u70B9\u51FB\u6DFB\u52A0" : row.status === "processing" || row.status === "pending" ? "\u5904\u7406\u4E2D" : "\u6682\u4E0D\u53EF\u7528" })
          ]
        },
        row.id
      );
    }) }),
    cursor && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-load-more", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: disabled || loading, onClick: () => void load(true, search), children: "\u52A0\u8F7D\u66F4\u591A\u56FE\u7247" }) })
  ] });
}
function ReferenceEditor({ ids, choices, disabled, request, onChange, onUpload, onSelect }) {
  const [browsing, setBrowsing] = (0, import_react7.useState)(false);
  const localInput = (0, import_react7.useRef)(null);
  function move(index, offset) {
    const next = [...ids];
    const target2 = index + offset;
    if (target2 < 0 || target2 >= next.length) return;
    [next[index], next[target2]] = [next[target2], next[index]];
    onChange(next);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { className: "ppd-reference-editor", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-form-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { children: "\u53C2\u8003\u56FE\u7247" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "\u4ECE\u672C\u5730\u4E0A\u4F20\u6216\u6D4F\u89C8\u5DF2\u4E0A\u4F20\u56FE\u7247\uFF0C\u751F\u56FE\u65F6\u6309\u4E0B\u65B9\u987A\u5E8F\u5F15\u7528\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
        ids.length,
        " / ",
        USER_SKILL_REFERENCE_LIMIT
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ol", { children: ids.map((id, index) => {
      const asset = choices.find((row) => row.id === id);
      const label = asset?.filename || `\u53C2\u8003\u56FE ${index + 1}`;
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: index + 1 }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PrivateAssetPreview, { id, alt: label, request, revision: 0 }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: label }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button", "aria-label": "\u4E0A\u79FB", disabled: disabled || index === 0, onClick: () => move(index, -1), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "arrow-up" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button", "aria-label": "\u4E0B\u79FB", disabled: disabled || index === ids.length - 1, onClick: () => move(index, 1), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "arrow-down" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button ppd-danger", "aria-label": "\u79FB\u9664\u5F15\u7528", disabled, onClick: () => onChange(ids.filter((value) => value !== id)), children: "\xD7" })
      ] }, id);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-actions ppd-reference-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-button", disabled: disabled || ids.length >= USER_SKILL_REFERENCE_LIMIT, onClick: () => localInput.current?.click(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "upload" }),
        "\u4ECE\u672C\u5730\u4E0A\u4F20"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled, "aria-expanded": browsing, onClick: () => setBrowsing((value) => !value), children: browsing ? "\u6536\u8D77\u5DF2\u4E0A\u4F20\u56FE\u7247" : "\u6D4F\u89C8\u5DF2\u4E0A\u4F20\u56FE\u7247" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { ref: localInput, className: "ppd-file-input", type: "file", hidden: true, multiple: true, disabled: disabled || ids.length >= USER_SKILL_REFERENCE_LIMIT, accept: "image/jpeg,image/png,image/webp", onChange: (event) => {
        const files = Array.from(event.currentTarget.files ?? []);
        event.currentTarget.value = "";
        if (files.length && !disabled) onUpload(files);
      } })
    ] }),
    browsing && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(UploadReferencePicker, { request, ids, disabled, onSelect: (asset) => {
      if (disabled || ids.includes(asset.id) || ids.length >= USER_SKILL_REFERENCE_LIMIT || asset.status !== "ready" || asset.kind !== "upload") return;
      onSelect(asset);
      onChange([...ids, asset.id]);
    } })
  ] });
}
function SkillEditor({ value, mode, choices, busy, error, notice, conflict, request, onChange, onSave, onCancel, onReload, onUpload, onSelect }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { className: "ppd-editor", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("header", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-eyebrow", children: mode === "edit" ? "\u7F16\u8F91" : mode === "copy" ? "\u590D\u5236" : "\u65B0\u5EFA" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { children: mode === "edit" ? "\u7F16\u8F91\u6211\u7684 Skill" : "\u521B\u5EFA\u6211\u7684 Skill" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-quiet", disabled: busy, onClick: onCancel, children: "\u53D6\u6D88" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error, notice }),
    conflict && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-conflict", role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: "\u8FD9\u4E2A Skill \u5728\u522B\u5904\u88AB\u66F4\u65B0\u4E86" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "\u8BF7\u8BFB\u53D6\u6700\u65B0\u7248\u672C\u540E\u518D\u7EE7\u7EED\u7F16\u8F91\uFF0C\u907F\u514D\u8986\u76D6\u65B0\u5185\u5BB9\u3002" }),
      onReload && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", onClick: onReload, children: "\u8BFB\u53D6\u6700\u65B0\u7248\u672C" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("fieldset", { disabled: busy || conflict, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "\u540D\u79F0" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { value: value.name, maxLength: 80, placeholder: "\u4F8B\u5982\uFF1A\u6211\u7684\u65C5\u884C\u6D77\u62A5", onChange: (event) => onChange({ ...value, name: event.target.value }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
          "\u8BF4\u660E ",
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: "\u53EF\u9009" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("textarea", { value: value.description, maxLength: 300, rows: 3, onChange: (event) => onChange({ ...value, description: event.target.value }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "\u9884\u8BBE\u63D0\u793A\u8BCD" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("textarea", { className: "ppd-prompt", value: value.prompt, maxLength: 5e3, rows: 9, placeholder: "\u5199\u4E0B\u53EF\u4EE5\u91CD\u590D\u4F7F\u7528\u7684\u521B\u4F5C\u8981\u6C42\u2026", onChange: (event) => onChange({ ...value, prompt: event.target.value }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ReferenceEditor, { request, onSelect, ids: value.referenceAssetIds, choices, disabled: busy || conflict, onChange: (referenceAssetIds) => onChange({ ...value, referenceAssetIds }), onUpload })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("footer", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: "\u63D0\u793A\u8BCD\u6216\u53C2\u8003\u7D20\u6750\u81F3\u5C11\u63D0\u4F9B\u4E00\u9879\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: busy || conflict, onClick: onSave, children: busy ? "\u6B63\u5728\u4FDD\u5B58\u2026" : "\u4FDD\u5B58 Skill" })
    ] })
  ] });
}
function MySkills({ request, onUse, onChanged, navigation }) {
  const [query, setQuery] = (0, import_react7.useState)("");
  const [items, setItems] = (0, import_react7.useState)([]);
  const [cursor, setCursor] = (0, import_react7.useState)(null);
  const [detail, setDetail] = (0, import_react7.useState)();
  const [editor, setEditor] = (0, import_react7.useState)();
  const [draft, setDraft] = (0, import_react7.useState)(blankDraft);
  const [choices, setChoices] = (0, import_react7.useState)([]);
  const [confirmDelete, setConfirmDelete] = (0, import_react7.useState)();
  const [loading, setLoading] = (0, import_react7.useState)(true);
  const [busy, setBusy] = (0, import_react7.useState)("");
  const [error, setError] = (0, import_react7.useState)("");
  const [notice, setNotice] = (0, import_react7.useState)("");
  const [conflict, setConflict] = (0, import_react7.useState)(false);
  const sequence = (0, import_react7.useRef)(0);
  const load = (0, import_react7.useCallback)(async (append = false, nextQuery = query.trim()) => {
    const token = ++sequence.current;
    setLoading(true);
    setError("");
    try {
      const { data } = await request("mySkills.list", { query: nextQuery, ...append && cursor ? { cursor } : {} });
      if (token !== sequence.current) return;
      const next = Array.isArray(data?.items) ? data.items : [];
      setItems((old) => append ? [...new Map([...old, ...next].map((row) => [row.id, row])).values()] : next);
      setCursor(data?.nextCursor ?? null);
    } catch (error2) {
      if (token === sequence.current) setError(displayError(error2));
    } finally {
      if (token === sequence.current) setLoading(false);
    }
  }, [cursor, query, request]);
  (0, import_react7.useEffect)(() => {
    void load(false, "");
  }, []);
  async function uploadReferences(files) {
    if (!editor || busy) return;
    const remaining = USER_SKILL_REFERENCE_LIMIT - draft.referenceAssetIds.length;
    const supported = files.filter((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type));
    if (!remaining) {
      setError(`\u6BCF\u4E2A Skill \u6700\u591A\u4F7F\u7528 ${USER_SKILL_REFERENCE_LIMIT} \u5F20\u53C2\u8003\u7D20\u6750\u3002`);
      return;
    }
    if (files.length > remaining) {
      setError(`\u5F53\u524D\u8FD8\u53EF\u6DFB\u52A0 ${remaining} \u5F20\u53C2\u8003\u56FE\u7247\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002`);
      return;
    }
    if (supported.length !== files.length) {
      setError("\u8BF7\u9009\u62E9 JPEG\u3001PNG \u6216 WebP \u56FE\u7247\u3002");
      return;
    }
    setBusy("reference-upload");
    setError("");
    const uploaded = [];
    const failed = [];
    try {
      let cursor2 = 0;
      const worker = async () => {
        for (; ; ) {
          const index = cursor2++, file = supported[index];
          if (!file) return;
          try {
            const { data } = await request("assets.upload", { file });
            if (typeof data?.id !== "string" || !data.id || data.status !== "ready") throw new Error("\u56FE\u7247\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u4ECE\u5DF2\u4E0A\u4F20\u56FE\u7247\u4E2D\u9009\u62E9");
            uploaded.push({ index, asset: data });
          } catch {
            failed.push(file.name);
          }
        }
      };
      await Promise.all(Array.from({ length: Math.min(4, supported.length) }, worker));
      if (uploaded.length) {
        const ordered = uploaded.sort((left, right) => left.index - right.index).map((row) => row.asset);
        setChoices((current) => [...new Map([...current, ...ordered].map((row) => [row.id, row])).values()]);
        setDraft((current) => ({ ...current, referenceAssetIds: uniq([...current.referenceAssetIds, ...ordered.map((row) => row.id)]).slice(0, USER_SKILL_REFERENCE_LIMIT) }));
        setNotice(`${uploaded.length} \u5F20\u672C\u5730\u56FE\u7247\u5DF2\u4E0A\u4F20\u5E76\u52A0\u5165\u5F53\u524D Skill\u3002`);
        onChanged();
      }
      if (failed.length) setError(`${failed.length} \u5F20\u56FE\u7247\u4E0A\u4F20\u5931\u8D25${failed.length <= 3 ? `\uFF1A${failed.join("\u3001")}` : ""}\u3002`);
    } finally {
      setBusy("");
    }
  }
  async function open(id) {
    setBusy(id);
    setError("");
    try {
      const { data } = await request("mySkills.get", { id });
      setDetail(data);
      setEditor(void 0);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  function start(mode, source) {
    setConflict(false);
    setError("");
    setEditor({ mode, source, requestId: randomUuid() });
    setDraft(source ? { ...fieldsOf(source), name: mode === "copy" ? `${source.name} \u526F\u672C` : source.name } : blankDraft());
    setNotice("");
  }
  async function save() {
    if (!editor || busy) return;
    if (!draft.name.trim()) {
      setError("\u8BF7\u586B\u5199 Skill \u540D\u79F0\u3002");
      return;
    }
    if (!draft.prompt.trim() && !draft.referenceAssetIds.length) {
      setError("\u8BF7\u586B\u5199\u9884\u8BBE\u63D0\u793A\u8BCD\u6216\u6DFB\u52A0\u81F3\u5C11\u4E00\u5F20\u53C2\u8003\u7D20\u6750\u3002");
      return;
    }
    setBusy("save");
    setError("");
    setConflict(false);
    try {
      const input = { name: draft.name.trim(), description: draft.description.trim(), prompt: draft.prompt.trim(), referenceAssetIds: draft.referenceAssetIds };
      const result = editor.mode === "edit" && editor.source ? await request("mySkills.update", { id: editor.source.id, input: { ...input, expectedUpdatedAt: editor.source.updatedAt } }) : await request("mySkills.create", { input: { ...input, clientRequestId: editor.requestId } });
      setDetail(result.data);
      setEditor(void 0);
      setNotice(editor.mode === "edit" ? "Skill \u5DF2\u66F4\u65B0\u3002" : "Skill \u5DF2\u521B\u5EFA\u3002");
      await load(false);
    } catch (error2) {
      const message = displayUserSkillError(error2);
      setError(message);
      if (/409|conflict|版本|更新时间|stale/i.test(message)) setConflict(true);
    } finally {
      setBusy("");
    }
  }
  async function reloadSource() {
    if (!editor?.source) return;
    try {
      const { data } = await request("mySkills.get", { id: editor.source.id });
      setEditor({ ...editor, source: data });
      setDraft(fieldsOf(data));
      setConflict(false);
      setError("");
    } catch (error2) {
      setError(displayError(error2));
    }
  }
  async function askDelete(row) {
    setBusy(row.id);
    setError("");
    try {
      const { data } = await request("mySkills.delete", { id: row.id, expectedUpdatedAt: row.updatedAt });
      if (!data?.confirmationRequired || !data.confirmationId) throw new Error("\u672A\u6536\u5230\u53EF\u9A8C\u8BC1\u7684\u5220\u9664\u786E\u8BA4\u3002");
      setConfirmDelete({ id: row.id, confirmationId: data.confirmationId, name: row.name });
      onChanged();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function cancelDelete() {
    if (!confirmDelete) return;
    setBusy(confirmDelete.id);
    setError("");
    try {
      await request("confirmation.cancel", { confirmationId: confirmDelete.confirmationId });
      setConfirmDelete(void 0);
      onChanged();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function deleteConfirmed() {
    if (!confirmDelete) return;
    setBusy(confirmDelete.id);
    setError("");
    try {
      await request("mySkills.delete", { confirmationId: confirmDelete.confirmationId });
      setConfirmDelete(void 0);
      setDetail(void 0);
      setNotice("Skill \u5DF2\u5220\u9664\uFF0C\u539F\u59CB\u7D20\u6750\u4ECD\u4FDD\u7559\u3002");
      await load(false);
      onChanged();
    } catch (error2) {
      setError(displayUserSkillError(error2));
    } finally {
      setBusy("");
    }
  }
  async function use(row) {
    setBusy(row.id);
    setError("");
    try {
      const { data } = await request("selection.resolve", { kind: "skill", id: row.id });
      await onUse(data);
      setNotice(`\u5DF2\u5728\u751F\u56FE\u6846\u4E2D\u9009\u62E9\u201C${row.name}\u201D\u3002`);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  const deleteDialog = confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ConfirmDialog, { title: "\u5220\u9664\u6211\u7684 Skill\uFF1F", description: `\u201C${confirmDelete.name}\u201D\u5C06\u4ECE\u4F60\u7684 Skill \u5E93\u5220\u9664\u3002\u5DF2\u6709\u7D20\u6750\u4E0E\u5386\u53F2\u751F\u6210\u4E0D\u53D7\u5F71\u54CD\u3002`, confirmLabel: "\u786E\u8BA4\u5220\u9664", busy: busy === confirmDelete.id, error, onCancel: () => void cancelDelete(), onConfirm: () => void deleteConfirmed() }) : null;
  if (editor) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SkillEditor, { request, notice, onSelect: (asset) => setChoices((current) => [...new Map([...current, asset].map((row) => [row.id, row])).values()]), value: draft, mode: editor.mode, choices, busy: busy === "save" || busy === "reference-upload", error, conflict, onChange: setDraft, onSave: () => void save(), onCancel: () => setEditor(void 0), onReload: editor.source ? () => void reloadSource() : void 0, onUpload: (files) => void uploadReferences(files) });
  if (detail) return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(DetailShell, { title: detail.name, eyebrow: "\u6211\u7684 Skill", onBack: () => setDetail(void 0), actions: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: busy === detail.id, onClick: () => void use(detail), children: "\u9009\u5165\u4F1A\u8BDD" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", onClick: () => start("edit", detail), children: "\u7F16\u8F91" })
    ] }), children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error, notice }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-user-skill-detail", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: detail.description || "\u672A\u586B\u5199\u8BF4\u660E" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { children: "\u9884\u8BBE\u63D0\u793A\u8BCD" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("pre", { children: detail.prompt || "\u4EC5\u4F7F\u7528\u53C2\u8003\u7D20\u6750" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("h3", { children: [
            "\u6709\u5E8F\u53C2\u8003\u7D20\u6750 \xB7 ",
            detail.referenceAssetIds.length
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ol", { className: "ppd-skill-reference-detail", children: detail.referenceAssetIds.map((id, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PrivateAssetPreview, { id, alt: `\u53C2\u8003\u56FE ${index + 1}`, request, revision: 0 }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
              index + 1,
              ". ",
              choices.find((row) => row.id === id)?.filename || "\u53C2\u8003\u56FE\u7247"
            ] })
          ] }, id)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", onClick: () => start("copy", detail), children: "\u590D\u5236\u4E3A\u65B0 Skill" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-danger", disabled: busy === detail.id, onClick: () => void askDelete(detail), children: "\u5220\u9664" })
        ] })
      ] })
    ] }),
    deleteDialog
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error, notice }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-toolbar-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchBar, { navigation, value: query, placeholder: "\u641C\u7D22\u6211\u7684 Skill", busy: loading, onChange: setQuery, onSearch: () => void load(false), onRefresh: () => void load(false) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-button ppd-button-primary", onClick: () => start("create"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "plus" }),
        "\u521B\u5EFA Skill"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Status, { loading: loading && !items.length, error: !items.length ? error : "", empty: !loading && !items.length ? "\u521B\u5EFA\u4E00\u4E2A\u53EF\u91CD\u590D\u4F7F\u7528\u7684\u79C1\u6709 Skill\u3002" : "", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-list", children: items.map((row) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-list-open", "aria-label": `\u67E5\u770B ${row.name}`, disabled: busy === row.id, onClick: () => void open(row.id), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title: row.name, children: cardTitle(row.name) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("small", { children: [
          row.referenceAssetIds.length,
          " \u5F20\u53C2\u8003\u7D20\u6750 \xB7 \u66F4\u65B0\u4E8E ",
          new Date(row.updatedAt).toLocaleDateString()
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: busy === row.id, onClick: () => void use(row), children: "\u9009\u5165" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button", "aria-label": "\u590D\u5236", onClick: () => start("copy", row), children: "\u2398" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button ppd-danger", "aria-label": "\u5220\u9664", onClick: () => void askDelete(row), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "trash" }) })
    ] }, row.id)) }) }),
    cursor && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-load-more", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: loading, onClick: () => void load(true), children: "\u52A0\u8F7D\u66F4\u591A" }) }),
    deleteDialog
  ] });
}
function SkillsPanel({ request, onUse, onChanged }) {
  const [tab, setTab] = (0, import_react7.useState)("public");
  const navigation = /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("nav", { className: "ppd-tabs", "aria-label": "Skill \u5E93\u5206\u7EC4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: tab === "public" ? "is-active" : "", "aria-current": tab === "public" ? "page" : void 0, onClick: () => setTab("public"), children: "\u516C\u5F00 Skill" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: tab === "mine" ? "is-active" : "", "aria-current": tab === "mine" ? "page" : void 0, onClick: () => setTab("mine"), children: "\u6211\u7684 Skill" })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("section", { children: tab === "public" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PublicSkills, { request, onUse, navigation }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(MySkills, { request, onUse, onChanged, navigation }) });
}
function ConfirmDialog({ title, description, confirmLabel, busy, error, onCancel, onConfirm }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-dialog-backdrop", role: "presentation", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "ppd-confirm-title", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { id: "ppd-confirm-title", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: description }),
    error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-alert", role: "alert", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: busy, onClick: onCancel, children: "\u53D6\u6D88" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-danger", disabled: busy, onClick: onConfirm, children: busy ? "\u6B63\u5728\u5904\u7406\u2026" : confirmLabel })
    ] })
  ] }) });
}
function LocalResults({ request, onUse, nativeSessionId }) {
  const archiveSelection = (0, import_react7.useSyncExternalStore)(archiveTarget.subscribe, archiveTarget.getSnapshot, archiveTarget.getSnapshot);
  (0, import_react7.useEffect)(() => () => archiveTarget.clear(), []);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ArchiveBrowser, { request, onUse, targetId: archiveSelection?.id }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(UnfiledLocalResults, { request, onUse, conversationAvailable: !!nativeSessionId, compact: true })
  ] });
}
function UnfiledLocalResults({ request, onUse, compact = false, conversationAvailable = false }) {
  const [items, setItems] = (0, import_react7.useState)([]);
  const [query, setQuery] = (0, import_react7.useState)("");
  const [page, setPage] = (0, import_react7.useState)(1);
  const [detail, setDetail] = (0, import_react7.useState)();
  const [loading, setLoading] = (0, import_react7.useState)(true);
  const [busy, setBusy] = (0, import_react7.useState)("");
  const [error, setError] = (0, import_react7.useState)("");
  const [notice, setNotice] = (0, import_react7.useState)("");
  const load = (0, import_react7.useCallback)(async () => {
    setLoading(true);
    setError("");
    try {
      const [toolbox, conversation, archived] = await Promise.all([
        request("toolbox.list", {}),
        conversationAvailable ? request("local.list", {}) : Promise.resolve({ data: void 0 }),
        request("archive.list", {})
      ]);
      const project = (rows2, group, toolbox2) => Array.isArray(rows2) ? rows2.map((row) => ({ ...row, group, toolbox: toolbox2 })) : [];
      const known = new Set((archived.data.items ?? []).flatMap((task) => task.files.map((file) => file.originId)));
      setItems([
        ...project(toolbox.data?.images, "image", true),
        ...project(toolbox.data?.files, "file", true),
        ...project(conversation.data?.images, "image", false),
        ...project(conversation.data?.files, "file", false)
      ].filter((row) => !known.has(row.id)));
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setLoading(false);
    }
  }, [request, conversationAvailable]);
  (0, import_react7.useEffect)(() => {
    void load();
  }, [load]);
  const rows = (0, import_react7.useMemo)(() => {
    const term = query.trim().toLocaleLowerCase();
    return term ? items.filter((row) => `${row.name || ""} ${row.filename || ""} ${row.label || ""} ${row.id}`.toLocaleLowerCase().includes(term)) : items;
  }, [items, query]);
  const visible = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  (0, import_react7.useEffect)(() => {
    setPage((value) => Math.min(value, Math.max(1, Math.ceil(rows.length / PAGE_SIZE))));
  }, [rows.length]);
  const titleOf = (row) => row.name || row.filename || row.label || (row.group === "image" ? "\u672C\u5730\u56FE\u7247\u7ED3\u679C" : "\u672C\u5730\u6587\u4EF6\u7ED3\u679C");
  const actionFor = (row, action) => `${row.toolbox ? "toolbox" : "local"}.${action}`;
  async function open(row) {
    setBusy(row.id);
    setError("");
    try {
      if (row.group === "image") {
        const { data } = await request(actionFor(row, "preview"), { id: row.id });
        setDetail({ ...row, ...data, group: "image" });
      } else setDetail(row);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function choose(row) {
    setBusy(row.id);
    setError("");
    try {
      const { data } = await request("snapshot", {});
      const ownerId = data?.account?.userId;
      if (typeof ownerId !== "string" || !ownerId) throw new Error("\u8BF7\u5148\u767B\u5F55 PodPlo\u3002");
      const selected = row.toolbox ? (await request("toolbox.use", { id: row.id })).data : row;
      await onUse({ version: 1, kind: "local", id: selected.id, label: titleOf(selected), locator: { localResultId: selected.id }, ownerId, private: true });
      setNotice("\u5DF2\u5C06\u672C\u5730\u7ED3\u679C\u5F15\u7528\u52A0\u5165\u5F53\u524D\u4F1A\u8BDD\u3002");
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function exportAttachment(row) {
    setBusy(`export:${row.id}`);
    setError("");
    try {
      const { data } = await request(actionFor(row, "export"), { id: row.id });
      if (!data?.attachment || typeof data.dataUrl !== "string" || !data.dataUrl.startsWith("data:")) throw new Error("\u672A\u6536\u5230\u53EF\u5BFC\u51FA\u7684\u672C\u5730\u7ED3\u679C\u3002");
      const anchor = document.createElement("a");
      anchor.href = data.dataUrl;
      anchor.download = typeof data.name === "string" && data.name ? data.name : titleOf(row);
      anchor.rel = "noopener";
      anchor.click();
      setNotice(`\u201C${titleOf(row)}\u201D\u5DF2\u5BFC\u51FA\u3002`);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  if (detail) return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(DetailShell, { title: titleOf(detail), eyebrow: detail.group === "image" ? "\u672C\u5730\u56FE\u7247\u7ED3\u679C" : "\u672C\u5730\u6587\u4EF6\u7ED3\u679C", onBack: () => setDetail(void 0), actions: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    conversationAvailable && detail.group === "image" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: busy === detail.id, onClick: () => void choose(detail), children: "\u9009\u5165\u4F1A\u8BDD" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: busy === `export:${detail.id}`, onClick: () => void exportAttachment(detail), children: "\u5BFC\u51FA\u6587\u4EF6" })
  ] }), children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error, notice }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-detail-grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImageFrame, { src: detail.group === "image" ? detail.dataUrl : void 0, alt: titleOf(detail) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-detail-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dl", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "ID" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { className: "ppd-break", children: detail.id })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u7C7B\u578B" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: detail.contentType || detail.format || detail.kind || detail.group })
          ] }),
          detail.width && detail.height ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u5C3A\u5BF8" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dd", { children: [
              detail.width,
              " \xD7 ",
              detail.height
            ] })
          ] }) : null,
          typeof detail.bytes === "number" && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u5927\u5C0F" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dd", { children: [
              detail.bytes,
              " bytes"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-lead", children: "\u5BFC\u51FA\u4F1A\u4F7F\u7528 Host \u8FD4\u56DE\u7684\u5DF2\u9A8C\u8BC1\u539F\u59CB\u5B57\u8282\uFF0C\u56FE\u7247\u3001PDF \u548C ZIP \u7B49\u7C7B\u578B\u90FD\u4FDD\u7559\u539F\u5185\u5BB9\u3002" })
      ] })
    ] })
  ] });
  if (compact && !items.length && !error) return null;
  const content = /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error, notice }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchBar, { value: query, placeholder: "\u641C\u7D22\u672C\u5730\u7ED3\u679C", busy: loading, onChange: (value) => {
      setQuery(value);
      setPage(1);
    }, onSearch: () => setPage(1), onRefresh: () => void load() }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Status, { loading: loading && !rows.length, error: !rows.length ? error : "", empty: !loading && !rows.length ? "\u8FD8\u6CA1\u6709\u672C\u5730\u5DE5\u5177\u7ED3\u679C\u3002" : "", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-list", children: visible.map((row) => {
        const title = titleOf(row);
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-list-open", "aria-label": `\u67E5\u770B ${title}`, disabled: busy === row.id, onClick: () => void open(row), children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title, children: cardTitle(title, true) }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: row.group === "image" ? "\u672C\u5730\u56FE\u7247\u7ED3\u679C" : "\u672C\u5730\u6587\u4EF6\u7ED3\u679C" })
          ] }),
          conversationAvailable && row.group === "image" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: busy === row.id, onClick: () => void choose(row), children: "\u9009\u5165" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: busy === `export:${row.id}`, onClick: () => void exportAttachment(row), children: "\u5BFC\u51FA" })
        ] }, `${row.group}:${row.id}`);
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PageNav, { page, total: rows.length, onPage: setPage })
    ] })
  ] });
  return compact ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("details", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("summary", { children: "\u5DE5\u5177\u8BB0\u5F55" }),
    content
  ] }) : content;
}
function AssetsPanel({ request, onUse, onChanged, refreshKey, onOpenToolbox }) {
  const [tab, setTab] = (0, import_react7.useState)("favorites");
  const [query, setQuery] = (0, import_react7.useState)("");
  const [page, setPage] = (0, import_react7.useState)(1);
  const [items, setItems] = (0, import_react7.useState)([]);
  const [favorites, setFavorites] = (0, import_react7.useState)([]);
  const [detail, setDetail] = (0, import_react7.useState)();
  const [confirmDelete, setConfirmDelete] = (0, import_react7.useState)();
  const [loading, setLoading] = (0, import_react7.useState)(true);
  const [busy, setBusy] = (0, import_react7.useState)("");
  const [error, setError] = (0, import_react7.useState)("");
  const [notice, setNotice] = (0, import_react7.useState)("");
  const [uploadWarning, setUploadWarning] = (0, import_react7.useState)("");
  const [savedResource, setSavedResource] = (0, import_react7.useState)();
  const [exported, setExported] = (0, import_react7.useState)();
  const [previewRevision, setPreviewRevision] = (0, import_react7.useState)(0);
  const [search, setSearch] = (0, import_react7.useState)("");
  const [cursor, setCursor] = (0, import_react7.useState)(null);
  const [paginationSupported, setPaginationSupported] = (0, import_react7.useState)();
  const [migration, setMigration] = (0, import_react7.useState)();
  const scope = (0, import_react7.useRef)({ tab, search });
  scope.current = { tab, search };
  const detailSequence = (0, import_react7.useRef)(0);
  const cursorRef = (0, import_react7.useRef)(null);
  const sequence = (0, import_react7.useRef)(0);
  const inFlight = (0, import_react7.useRef)(false);
  const fileInput = (0, import_react7.useRef)(null);
  const load = (0, import_react7.useCallback)(async (append = false, target2 = scope.current) => {
    if (append && (inFlight.current || !cursorRef.current)) return;
    const token = ++sequence.current;
    inFlight.current = true;
    setLoading(true);
    setError("");
    const kind = target2.tab === "uploads" ? "upload" : void 0;
    const next = append ? cursorRef.current : null;
    try {
      const { data } = target2.tab === "favorites" ? await request("favorites.list", { ...next ? { cursor: next } : {}, limit: 100 }) : await request("assets.list", { ...kind ? { kind } : {}, ...target2.search ? { query: target2.search } : {}, ...next ? { cursor: next } : {}, limit: 50 });
      if (sequence.current !== token) return;
      const pageItems = Array.isArray(data?.items) ? data.items : [];
      if (target2.tab === "favorites") {
        setFavorites((old) => append ? [...new Map([...old, ...pageItems].map((row) => [`${row.type}:${row.id}`, row])).values()] : pageItems);
        if (data?.migration && typeof data.migration === "object") setMigration(data.migration);
      } else setItems((old) => append ? [...new Map([...old, ...pageItems].map((row) => [row.id, row])).values()] : pageItems);
      const nextCursor = typeof data?.nextCursor === "string" && data.nextCursor ? data.nextCursor : null;
      cursorRef.current = nextCursor;
      setCursor(nextCursor);
      setPaginationSupported(target2.tab === "favorites" || data?.paginationSupported === true);
      setPreviewRevision((value) => value + 1);
      if (!append) setPage(1);
    } catch (error2) {
      if (sequence.current === token) setError(displayError(error2));
    } finally {
      if (sequence.current === token) {
        inFlight.current = false;
        setLoading(false);
      }
    }
  }, [request]);
  (0, import_react7.useEffect)(() => {
    void load();
    return () => {
      sequence.current++;
      inFlight.current = false;
    };
  }, [load, tab, search, refreshKey]);
  const rows = (0, import_react7.useMemo)(() => {
    const source = tab === "favorites" ? favorites : items.filter((row) => row.kind === "upload");
    const term = search.trim().toLocaleLowerCase();
    return tab === "favorites" && term ? source.filter((row) => `${"type" in row ? row.label || "" : row.filename || ""} ${row.id}`.toLocaleLowerCase().includes(term)) : source;
  }, [favorites, items, search, tab]);
  const visible = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  (0, import_react7.useEffect)(() => {
    setPage((value) => Math.min(value, Math.max(1, Math.ceil(rows.length / PAGE_SIZE))));
  }, [rows.length]);
  function switchTab(value) {
    detailSequence.current++;
    setBusy((current) => current === "upload" ? current : "");
    if (value !== tab) {
      sequence.current++;
      inFlight.current = false;
      setItems([]);
      if (value === "favorites") setFavorites([]);
      setCursor(null);
      cursorRef.current = null;
      setPaginationSupported(void 0);
    }
    setTab(value);
    setPage(1);
    setQuery("");
    setSearch("");
    setDetail(void 0);
    setSavedResource(void 0);
    setError("");
  }
  async function open(row) {
    const token = ++detailSequence.current;
    setBusy(row.id);
    setError("");
    setExported(void 0);
    try {
      if ("kind" in row) {
        const { data } = await request("assets.detail", { id: row.id });
        if (token === detailSequence.current) setDetail(data);
      } else if (row.type === "gallery") {
        const { data } = await request("gallery.detail", { id: row.id });
        if (token === detailSequence.current) setSavedResource({ row, gallery: data });
      } else {
        const { data: catalog } = await request("skills.list", {});
        if (token !== detailSequence.current) return;
        const entry = catalog?.items?.find((skill) => skill.slug === row.id);
        if (entry?.kind === "family") {
          const { data } = await request("skills.family", { slug: row.id });
          if (token === detailSequence.current) setSavedResource({ row, family: data });
        } else {
          const { data } = await request("skills.detail", { slug: row.id, resolve: false });
          if (token === detailSequence.current) setSavedResource({ row, skill: data });
        }
      }
    } catch (error2) {
      if (token === detailSequence.current) setError(displayError(error2));
    } finally {
      if (token === detailSequence.current) setBusy("");
    }
  }
  async function useSavedSkill(skill) {
    setBusy(skill.slug);
    setError("");
    try {
      const { data } = await request("selection.resolve", { kind: "skill", id: skill.executionSlug || skill.slug });
      await onUse({ ...data, previewUrl: skill.coverImage });
      setNotice(`\u5DF2\u5728\u751F\u56FE\u6846\u4E2D\u9009\u62E9\u201C${skill.title}\u201D\u3002`);
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function use(row) {
    setBusy(row.id);
    setError("");
    try {
      const selectionKind = "kind" in row ? "asset" : row.type === "skill" ? "skill" : "gallery";
      let previewUrl = "kind" in row ? row.previewUrl : row.imageUrl;
      if ("kind" in row) {
        const { data: detail2 } = await request("assets.detail", { id: row.id });
        if (detail2?.id !== row.id || detail2?.status !== "ready" || typeof detail2?.previewUrl !== "string" || !detail2.previewUrl) throw new Error("\u8FD9\u5F20\u7D20\u6750\u5C1A\u672A\u51C6\u5907\u597D\u53EF\u7528\u9884\u89C8\uFF0C\u8BF7\u7A0D\u540E\u5237\u65B0\u3002");
        previewUrl = detail2.previewUrl;
      }
      const { data } = await request("selection.resolve", { kind: selectionKind, id: row.id });
      await onUse({ ...data, previewUrl });
      setNotice(selectionKind === "skill" ? "\u5DF2\u5728\u751F\u56FE\u6846\u4E2D\u66F4\u6362 Skill\u3002" : "\u5DF2\u5C06\u7D20\u6750\u52A0\u5165\u751F\u56FE\u6846\u3002");
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function upload(files) {
    if (!files.length || busy === "upload") return;
    setBusy("upload");
    setError("");
    setUploadWarning("");
    setNotice("");
    const supported = files.filter((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type));
    const unsupported = files.length - supported.length;
    let uploaded = 0;
    let processing = 0;
    const failed = [];
    try {
      let cursor2 = 0;
      const worker = async () => {
        for (; ; ) {
          const file = supported[cursor2++];
          if (!file) return;
          try {
            const { data } = await request("assets.upload", { file });
            uploaded++;
            if (data?.status !== "ready") processing++;
          } catch {
            failed.push(file.name);
          }
        }
      };
      await Promise.all(Array.from({ length: Math.min(4, supported.length) }, worker));
      if (uploaded) {
        switchTab("uploads");
        await load(false, { tab: "uploads", search: "" });
        setNotice(`${uploaded} \u4E2A\u7D20\u6750\u5DF2\u4E0A\u4F20${processing ? `\uFF0C\u5176\u4E2D ${processing} \u4E2A\u6B63\u5728\u5904\u7406` : ""}\u3002`);
      }
      const problems = [unsupported ? `${unsupported} \u4E2A\u6587\u4EF6\u683C\u5F0F\u4E0D\u652F\u6301` : "", failed.length ? `${failed.length} \u4E2A\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25${failed.length <= 3 ? `\uFF08${failed.join("\u3001")}\uFF09` : ""}` : ""].filter(Boolean);
      if (problems.length) setUploadWarning(`${problems.join("\uFF1B")}\u3002\u4EC5\u652F\u6301 JPEG\u3001PNG \u6216 WebP\u3002`);
      else if (!uploaded) setError("\u8BF7\u9009\u62E9 JPEG\u3001PNG \u6216 WebP \u56FE\u7247\u3002");
    } finally {
      setBusy("");
      if (fileInput.current) fileInput.current.value = "";
    }
  }
  async function toggleFavorite(row) {
    setBusy(row.id);
    setError("");
    try {
      await request("assets.favorite", { kind: row.type, id: row.id, favorite: false });
      await load();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function retryMigration() {
    setBusy("migration");
    setError("");
    try {
      const { data } = await request("favorites.migrate", {});
      setMigration(data);
      await load();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function askDelete(row) {
    setBusy(row.id);
    setError("");
    try {
      const { data } = await request("assets.delete", { ids: [row.id] });
      if (!data?.confirmationRequired || !data.confirmationId) throw new Error("\u672A\u6536\u5230\u53EF\u9A8C\u8BC1\u7684\u5220\u9664\u786E\u8BA4\u3002");
      setConfirmDelete({ id: row.id, confirmationId: data.confirmationId, label: row.filename || "\u8FD9\u5F20\u79C1\u6709\u7D20\u6750" });
      onChanged();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function cancelDelete() {
    if (!confirmDelete) return;
    setBusy(confirmDelete.id);
    setError("");
    try {
      await request("confirmation.cancel", { confirmationId: confirmDelete.confirmationId });
      setConfirmDelete(void 0);
      onChanged();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function deleteConfirmed() {
    if (!confirmDelete) return;
    setBusy(confirmDelete.id);
    setError("");
    try {
      const { data } = await request("assets.delete", { confirmationId: confirmDelete.confirmationId });
      const failure = Array.isArray(data?.failed) && data.failed.length ? `\uFF0C${data.failed.length} \u9879\u672A\u80FD\u5220\u9664` : "";
      setNotice(`\u79C1\u6709\u4E0A\u4F20\u5DF2\u5220\u9664${failure}\u3002`);
      setConfirmDelete(void 0);
      setDetail(void 0);
      await load();
      onChanged();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  async function exportAsset(row) {
    setBusy(`export:${row.id}`);
    setError("");
    setNotice("");
    try {
      const { data } = await request("local.output.exportAsset", { id: row.id });
      if (typeof data?.exportId !== "string" || typeof data?.path !== "string") throw new Error("\u672A\u6536\u5230\u53EF\u6838\u5BF9\u7684\u5BFC\u51FA\u4F4D\u7F6E\u3002");
      setExported(data);
      setNotice("\u539F\u56FE\u5DF2\u4FDD\u5B58\u5230\u5DE5\u5177\u7BB1\u7684\u8F93\u51FA\u76EE\u5F55\u3002");
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy("");
    }
  }
  const deleteDialog = confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ConfirmDialog, { title: "\u5220\u9664\u79C1\u6709\u4E0A\u4F20\uFF1F", description: `\u201C${confirmDelete.label}\u201D\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002\u5F15\u7528\u8BE5\u56FE\u7684 Skill \u4E4B\u540E\u53EF\u80FD\u9700\u8981\u4FEE\u590D\u3002`, confirmLabel: "\u786E\u8BA4\u5220\u9664", busy: busy === confirmDelete.id, error, onCancel: () => void cancelDelete(), onConfirm: () => void deleteConfirmed() }) : null;
  if (detail) {
    const privateRow = "kind" in detail;
    const title = privateRow ? detail.filename || (detail.kind === "generated" ? "\u672C\u4EBA\u751F\u6210\u56FE" : "\u79C1\u6709\u4E0A\u4F20") : detail.label || detail.id;
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(DetailShell, { title, eyebrow: privateRow ? detail.kind === "generated" ? "\u751F\u6210\u8BB0\u5F55" : "\u79C1\u6709\u4E0A\u4F20" : "\u6211\u7684\u6536\u85CF", onBack: () => {
        setDetail(void 0);
        setExported(void 0);
      }, actions: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: busy === detail.id, onClick: () => void use(detail), children: "\u9009\u5165\u4F1A\u8BDD" }),
        privateRow && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: busy === `export:${detail.id}` || detail.status !== "ready", onClick: () => void exportAsset(detail), children: busy === `export:${detail.id}` ? "\u6B63\u5728\u5BFC\u51FA\u2026" : "\u5BFC\u51FA\u5230\u8F93\u51FA\u76EE\u5F55" }),
        privateRow && detail.kind === "upload" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-danger", onClick: () => void askDelete(detail), children: "\u5220\u9664" })
      ] }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error: error || uploadWarning, notice }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-detail-grid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImageFrame, { src: privateRow ? detail.previewUrl : detail.imageUrl, alt: title }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-detail-copy", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dl", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "ID" }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { className: "ppd-break", children: detail.id })
              ] }),
              privateRow && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u72B6\u6001" }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: detail.status })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { children: "\u5C3A\u5BF8" }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: detail.width && detail.height ? `${detail.width} \xD7 ${detail.height}` : "\u5904\u7406\u4E2D\u6216\u672A\u63D0\u4F9B" })
                ] })
              ] })
            ] }),
            privateRow && detail.downloadUrl && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { className: "ppd-button", href: detail.downloadUrl, target: "_blank", rel: "noreferrer", children: "\u6D4F\u89C8\u5668\u4E0B\u8F7D\u539F\u56FE" }),
            privateRow && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-lead", children: "\u201C\u5BFC\u51FA\u5230\u8F93\u51FA\u76EE\u5F55\u201D\u4F1A\u4FDD\u5B58\u7ECF Host \u6838\u9A8C\u7684\u672C\u4EBA\u539F\u56FE\uFF1B\u8F93\u51FA\u4F4D\u7F6E\u53EF\u5728\u5DE5\u5177\u7BB1\u4E2D\u8BBE\u7F6E\u3002" }),
            onOpenToolbox && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-link-button", onClick: onOpenToolbox, children: "\u524D\u5F80\u5DE5\u5177\u7BB1\u8BBE\u7F6E\u8F93\u51FA\u76EE\u5F55" }),
            exported && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { className: "ppd-export-result", role: "status", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: exported.name }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("code", { className: "ppd-break", children: exported.path }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", onClick: () => void request("local.output.open", { exportId: exported.exportId }).catch((error2) => setError(displayError(error2))), children: "\u6253\u5F00\u6587\u4EF6" }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", onClick: () => void request("local.output.reveal", { exportId: exported.exportId }).catch((error2) => setError(displayError(error2))), children: "\u6240\u5728\u6587\u4EF6\u5939" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      deleteDialog
    ] });
  }
  if (savedResource) {
    const back = () => setSavedResource(void 0);
    const noticeBlock = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error, notice });
    if (savedResource.skill) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PublicSkillDetail, { skill: savedResource.skill, onBack: () => savedResource.family ? setSavedResource({ ...savedResource, skill: void 0 }) : back(), notice: noticeBlock, actions: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: !!busy || !savedResource.skill.executable, onClick: () => void useSavedSkill(savedResource.skill), children: "\u4F7F\u7528 Skill" }) });
    if (savedResource.gallery) return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(GalleryDetail, { item: savedResource.gallery, onBack: back, notice: noticeBlock, actions: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button ppd-button-primary", disabled: !!busy, onClick: () => void use(savedResource.row), children: "\u52A0\u5165\u53C2\u8003\u56FE" }) });
    if (savedResource.family) return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(DetailShell, { title: savedResource.family.title, onBack: back, children: [
      noticeBlock,
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-family-intro", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: savedResource.family.summary }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { children: savedResource.family.chooseLabel })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-grid ppd-family-grid", children: savedResource.family.members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("article", { className: "ppd-card", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-card-open", "aria-label": `\u67E5\u770B ${member.title}`, onClick: () => setSavedResource({ ...savedResource, skill: member }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImageFrame, { src: member.coverImage, before: member.beforeImage, alt: member.title }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ppd-card-copy", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title: member.title, children: cardTitle(member.title) }) })
      ] }) }, member.slug)) })
    ] });
  }
  const migrationNotice = tab === "favorites" && migration?.status === "blocked" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-alert", role: "status", children: "\u5F53\u524D\u767B\u5F55\u5C1A\u672A\u6388\u6743\u4E91\u7AEF\u6536\u85CF\uFF0C\u8BF7\u9000\u51FA\u540E\u91CD\u65B0\u767B\u5F55\u4E00\u6B21\uFF1B\u5176\u4ED6\u529F\u80FD\u4ECD\u53EF\u4F7F\u7528\u3002" }) : tab === "favorites" && migration?.unknown ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "ppd-alert", role: "status", children: [
    "\u6709 ",
    migration.unknown,
    " \u9879\u65E7\u6536\u85CF\u7684\u8FC1\u79FB\u7ED3\u679C\u65E0\u6CD5\u786E\u8BA4\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u8BD5\uFF0C\u907F\u514D\u5DF2\u53D6\u6D88\u7684\u6536\u85CF\u88AB\u91CD\u65B0\u52A0\u56DE\u3002"
  ] }) : tab === "favorites" && migration?.rejected ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "ppd-alert", role: "status", children: [
    migration.rejected,
    " \u9879\u65E7\u6536\u85CF\u5DF2\u5931\u6548\u6216\u65E0\u6743\u8BBF\u95EE\u3002",
    migration.retryable && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: busy === "migration", onClick: () => void retryMigration(), children: busy === "migration" ? "\u6B63\u5728\u91CD\u8BD5\u2026" : "\u91CD\u8BD5\u5931\u8D25\u9879" })
  ] }) : null;
  const navigation = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("nav", { className: "ppd-tabs", "aria-label": "\u7D20\u6750\u5206\u7EC4", children: [["favorites", "\u6536\u85CF"], ["uploads", "\u4E0A\u4F20"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: tab === value ? "is-active" : "", "aria-current": tab === value ? "page" : void 0, onClick: () => switchTab(value), children: label }, value)) });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("section", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Notice, { error: error || uploadWarning, notice }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchBar, { navigation, value: query, placeholder: "\u641C\u7D22\u5F53\u524D\u5206\u7EC4", busy: loading, onChange: setQuery, onSearch: () => {
      const value = query.trim();
      setPage(1);
      if (value === search) void load();
      else {
        if (tab !== "favorites") setItems([]);
        setSearch(value);
      }
    }, onRefresh: () => void load(), children: tab === "uploads" && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-upload-area", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-icon-button", "aria-label": "\u4E0A\u4F20\u56FE\u7247", title: "\u4E0A\u4F20\u56FE\u7247", "aria-busy": busy === "upload", disabled: busy === "upload", onClick: () => fileInput.current?.click(), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "plus" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { ref: fileInput, className: "ppd-file-input", type: "file", accept: "image/jpeg,image/png,image/webp", multiple: true, onChange: (event) => {
        const files = Array.from(event.target.files ?? []);
        if (files.length) void upload(files);
      } })
    ] }) }),
    migrationNotice,
    tab === "uploads" && paginationSupported === false && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-alert", role: "status", children: "\u5F53\u524D\u670D\u52A1\u4EC5\u63D0\u4F9B\u6700\u8FD1 50 \u6761\u6DF7\u5408\u7D20\u6750\uFF0C\u672C\u5206\u7EC4\u548C\u641C\u7D22\u53EF\u80FD\u4E0D\u5B8C\u6574\u3002\u5B8C\u6574\u5386\u53F2\u9700\u8981\u670D\u52A1\u7AEF\u542F\u7528\u5206\u9875\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Status, { loading: loading && !rows.length, error: !rows.length ? error : "", empty: !rows.length ? tab === "favorites" ? "\u6536\u85CF\u516C\u5F00 Skill \u6216\u516C\u5F00\u7D20\u6750\u540E\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002" : tab === "uploads" ? "\u4E0A\u4F20\u4E00\u5F20\u6216\u591A\u5F20\u79C1\u6709\u56FE\u7247\u4F5C\u4E3A\u53C2\u8003\u7D20\u6750\u3002" : "\u5B8C\u6210\u751F\u56FE\u540E\uFF0C\u7ED3\u679C\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002" : "", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-grid", children: visible.map((row) => {
        const privateRow = "kind" in row;
        const privatePreview = privateRow;
        const title = privateRow ? row.filename || (row.kind === "generated" ? "\u672C\u4EBA\u751F\u6210\u56FE" : "\u79C1\u6709\u4E0A\u4F20") : row.label || row.id;
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("article", { className: "ppd-card", "data-asset-id": row.id, children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", className: "ppd-card-open", "aria-label": `\u67E5\u770B ${title}`, disabled: busy === row.id, onClick: () => void open(row), children: [
            privatePreview ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PrivateAssetPreview, { id: row.id, alt: title, request, revision: previewRevision }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImageFrame, { src: row.imageUrl, alt: title }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "ppd-card-copy", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("strong", { title, children: cardTitle(title) }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("small", { children: privateRow ? `${row.kind === "generated" ? "\u751F\u6210" : "\u4E0A\u4F20"} \xB7 ${row.status}` : row.assetKind || row.type })
            ] })
          ] }),
          !privateRow && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FavoriteButton, { active: true, busy: busy === row.id, onClick: () => void toggleFavorite(row) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-card-use", disabled: busy === row.id, onClick: () => void use(row), children: "\u9009\u5165" }),
          privateRow && row.kind === "upload" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-card-delete", "aria-label": "\u5220\u9664\u4E0A\u4F20", onClick: () => void askDelete(row), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "trash" }) })
        ] }, `${privateRow ? row.kind : row.type}:${row.id}`);
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PageNav, { page, total: rows.length, onPage: setPage })
    ] }),
    cursor && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "ppd-load-more", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", disabled: loading, onClick: () => void load(true), children: tab === "favorites" ? "\u52A0\u8F7D\u66F4\u591A\u6536\u85CF" : "\u52A0\u8F7D\u66F4\u591A\u7D20\u6750" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { children: [
        "\u5DF2\u52A0\u8F7D ",
        rows.length,
        " \u6761"
      ] })
    ] }),
    deleteDialog
  ] });
}
function PodploPanel({ section, request, composerRequest, onUse, onNavigate, nativeSessionId }) {
  const requestRef = (0, import_react7.useRef)(request);
  const onUseRef = (0, import_react7.useRef)(onUse);
  requestRef.current = request;
  onUseRef.current = onUse;
  const composerRequestRef = (0, import_react7.useRef)(composerRequest);
  composerRequestRef.current = composerRequest;
  const stableRequest = (0, import_react7.useCallback)((action, args) => requestRef.current(action, args), []);
  const stableComposerRequest = (0, import_react7.useCallback)((action, args) => composerRequestRef.current(action, args), []);
  const stableOnUse = (0, import_react7.useCallback)((selection) => onUseRef.current(selection), []);
  const selectionSequence = (0, import_react7.useRef)(0);
  const [composerSelection, setComposerSelection] = (0, import_react7.useState)();
  const [composerReveal, setComposerReveal] = (0, import_react7.useState)(0);
  const selectForComposer = (0, import_react7.useCallback)(async (selection) => {
    if (selection.kind === "asset" || selection.kind === "gallery") {
      let ownerId = selection.ownerId;
      if (selection.kind === "gallery") {
        const { data } = await stableComposerRequest("snapshot", {});
        ownerId = data?.account?.userId;
      }
      if (!ownerId) throw new Error("\u8BF7\u5148\u767B\u5F55 PodPlo\u3002");
      const revision = generationBootstrapCache.revision();
      let asset;
      if (selection.kind === "gallery") {
        const { data } = await stableComposerRequest("gallery.importReference", { id: selection.locator.galleryId || selection.id });
        asset = data?.asset;
      } else asset = { id: selection.locator.assetId || selection.id, status: "ready", filename: selection.label, previewUrl: selection.previewUrl };
      const displaced = generationBootstrapCache.readDraft(ownerId, "podplo-manual")?.operation;
      if (!generationBootstrapCache.mergeReadyReference(ownerId, "podplo-manual", asset, revision)) throw new Error("\u8D26\u53F7\u6216\u751F\u56FE\u8349\u7A3F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u7D20\u6750\u3002");
      if (displaced?.status === "quoted") void stableComposerRequest("generation.cancel", { operationId: displaced.operationId }).catch(() => {
      });
      setComposerReveal((value) => value + 1);
      return;
    }
    setComposerSelection({ ...selection, sequence: ++selectionSequence.current });
    setComposerReveal((value) => value + 1);
  }, [stableComposerRequest]);
  const selectionConsumed = (0, import_react7.useCallback)((sequence) => setComposerSelection((current) => current?.sequence === sequence ? void 0 : current), []);
  const [snapshot, setSnapshot] = (0, import_react7.useState)();
  const [busy, setBusy] = (0, import_react7.useState)(false);
  const [error, setError] = (0, import_react7.useState)("");
  const loadSnapshot = (0, import_react7.useCallback)(async () => {
    try {
      const { data } = await stableRequest("snapshot", {});
      setSnapshot(data);
      setError("");
    } catch (error2) {
      setError(displayError(error2));
    }
  }, [stableRequest]);
  (0, import_react7.useEffect)(() => {
    let active = true;
    const refreshSnapshot = () => {
      if (active) void loadSnapshot();
    };
    refreshSnapshot();
    const timer = setInterval(refreshSnapshot, 2e3);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [loadSnapshot]);
  async function accountAction(action) {
    setBusy(true);
    setError("");
    try {
      await stableRequest(action, {});
      await loadSnapshot();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy(false);
    }
  }
  async function refresh() {
    setBusy(true);
    setError("");
    try {
      await stableRequest("refresh", {});
      await loadSnapshot();
    } catch (error2) {
      setError(displayError(error2));
    } finally {
      setBusy(false);
    }
  }
  const pendingCount = snapshot?.pending.generations || 0;
  const accountKey = snapshot?.account.userId || "anonymous";
  const [historyOpen, setHistoryOpen] = (0, import_react7.useState)(false);
  const panelScroll = (0, import_react7.useRef)(null);
  const [submission, setSubmission] = (0, import_react7.useState)();
  (0, import_react7.useEffect)(() => {
    setHistoryOpen(false);
    setSubmission(void 0);
  }, [section, accountKey]);
  (0, import_react7.useEffect)(() => {
    if (historyOpen) panelScroll.current?.scrollTo({ top: 0 });
  }, [historyOpen]);
  const onSubmission = (0, import_react7.useCallback)((operation, error2, starting = false) => {
    setSubmission({ operation, error: error2, ownerId: accountKey });
    if (starting) setHistoryOpen(true);
  }, [accountKey]);
  const onVerification = (0, import_react7.useCallback)((operation) => {
    setSubmission(operation ? { operation, ownerId: accountKey } : void 0);
    setHistoryOpen(!!operation);
  }, [accountKey]);
  const composerSection = section === "generation" || section === "gallery" || section === "skills" || section === "assets";
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("main", { className: `ppd-panel ppd-panel-${section}`, "data-podplo-panel": section, "data-podplo-session": nativeSessionId, "data-podplo-history-open": historyOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { ref: panelScroll, className: "ppd-panel-scroll", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(AccountBar, { snapshot, busy, onAccountAction: (action) => void accountAction(action), onRefresh: () => void refresh(), request: stableRequest }),
      error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "ppd-alert", role: "alert", children: error }),
      snapshot && section === "generation" && !historyOpen && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-history-shortcut", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "ppd-button", "data-generation-history-shortcut": true, onClick: () => setHistoryOpen(true), children: "\u5386\u53F2\u8BB0\u5F55" }) }),
      snapshot && historyOpen && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-content ppd-history-content", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(GenerationHistory, { request: stableComposerRequest, submission: submission?.ownerId === accountKey ? submission : void 0, onBack: () => setHistoryOpen(false), renderAsset: (id) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PrivateAssetPreview, { id, alt: "\u751F\u6210\u7ED3\u679C", request: stableComposerRequest, revision: 0 }) }, accountKey) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "ppd-content", hidden: historyOpen, children: !snapshot ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Status, { loading: !error, error, children: null }) : section === "gallery" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(GalleryPanel, { request: stableRequest, onUse: selectForComposer }, accountKey) : section === "skills" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SkillsPanel, { request: stableRequest, onUse: selectForComposer, onChanged: () => void loadSnapshot() }, accountKey) : section === "generation" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(GenerationPanel, { request: stableComposerRequest, onSubmission, onVerification, onChanged: () => void loadSnapshot(), onSelectionConsumed: selectionConsumed, nativeSessionId: "podplo-manual", accountKey, placement: "inline", selection: composerSelection }, `${accountKey}:podplo-manual`) : section === "toolbox" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ManualToolboxPanel, { request: stableRequest, onUse: nativeSessionId ? stableOnUse : void 0 }, accountKey) : section === "results" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LocalResults, { request: stableRequest, onUse: stableOnUse, nativeSessionId }, accountKey) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(AssetsPanel, { request: stableRequest, onUse: selectForComposer, onChanged: () => void loadSnapshot(), refreshKey: pendingCount, onOpenToolbox: onNavigate ? () => onNavigate("toolbox") : void 0 }, accountKey) })
    ] }),
    snapshot && composerSection && section !== "generation" && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { hidden: historyOpen, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(GenerationPanel, { request: stableComposerRequest, onSubmission, onVerification, onChanged: () => void loadSnapshot(), onSelectionConsumed: selectionConsumed, nativeSessionId: "podplo-manual", accountKey, placement: "floating", selection: composerSelection, revealSequence: composerReveal }, `${accountKey}:podplo-manual`) })
  ] });
}

// plugins/podplo-dsh/src/workspace.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function PodploWorkspace({ request, composerRequest = request, onUse, nativeSessionId, navigator, onSelectSection }) {
  const section = (0, import_react8.useSyncExternalStore)(navigator.subscribe, navigator.getSnapshot, navigator.getSnapshot);
  const navigate = (0, import_react8.useCallback)((next) => {
    navigator.navigate(next);
    onSelectSection?.(next);
  }, [navigator, onSelectSection]);
  (0, import_react8.useEffect)(() => {
    const current = readPodploNavigationPreferences();
    if (current.lastSection !== section) writePodploNavigationPreferences({ ...current, lastSection: section });
  }, [section]);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "ppd-workspace", "data-podplo-workspace": true, "data-podplo-section": section, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "ppd-workspace-main", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PodploPanel, { section, request, composerRequest, onUse, nativeSessionId, onNavigate: navigate }) }) });
}

// plugins/podplo-dsh/src/style.css
var style_default = '.ppd-panel{--ppd-bg:#fff;--ppd-surface:#f7f7f5;--ppd-line:#e5e5e1;--ppd-text:#252522;--ppd-muted:#74746d;--ppd-accent:#252522;--ppd-soft:#efefeb;--ppd-danger:#a53a31;box-sizing:border-box;min-height:100%;background:var(--ppd-bg);color:var(--ppd-text);font:14px/1.55 ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.ppd-panel *{box-sizing:border-box}.ppd-panel button,.ppd-panel input,.ppd-panel textarea,.ppd-panel select{font:inherit;color:inherit}.ppd-panel button{cursor:pointer}.ppd-panel button:disabled{cursor:not-allowed;opacity:.48}.ppd-content{max-width:1180px;margin:0 auto;padding:28px 30px 64px}.ppd-account{position:sticky;z-index:20;top:0;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:10px 22px;border-bottom:1px solid var(--ppd-line);background:#ffffffef;backdrop-filter:blur(14px)}.ppd-connection,.ppd-account-meta,.ppd-actions,.ppd-toolbar-row{display:flex;align-items:center;gap:10px}.ppd-connection>div{display:grid;line-height:1.3}.ppd-connection strong{font-size:12px;font-weight:650}.ppd-connection small{font-size:10px;color:var(--ppd-muted)}.ppd-dot{width:8px;height:8px;border-radius:50%;background:#b7b7b1;box-shadow:0 0 0 3px #b7b7b11c}.ppd-dot.is-online{background:#45a06b;box-shadow:0 0 0 3px #45a06b1c}.ppd-account-meta{font-size:11px;color:var(--ppd-muted)}.ppd-phase{padding:3px 7px;border-radius:999px;background:var(--ppd-soft)}.ppd-button,.ppd-icon-button,.ppd-back{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:34px;padding:7px 12px;border:1px solid var(--ppd-line);border-radius:8px;background:#fff;text-decoration:none;white-space:nowrap}.ppd-button:hover,.ppd-icon-button:hover,.ppd-back:hover{border-color:#cacac3;background:#fafaf8}.ppd-button-primary{border-color:var(--ppd-accent);background:var(--ppd-accent);color:#fff}.ppd-button-primary:hover{border-color:#000;background:#000}.ppd-button-quiet{min-height:29px;padding:5px 9px;background:transparent}.ppd-button-danger{border-color:#dec0bb;color:var(--ppd-danger);background:#fff9f8}.ppd-button-danger:hover{border-color:var(--ppd-danger);background:#fff4f2}.ppd-icon-button{width:32px;min-height:32px;padding:0}.ppd-icon{display:inline-grid;place-items:center;min-width:1em;font-size:15px;line-height:1}.ppd-danger{color:var(--ppd-danger)}.ppd-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;clip:rect(0,0,0,0);overflow:hidden;white-space:nowrap;border:0}.ppd-alert,.ppd-notice{max-width:1180px;margin:12px auto 0;padding:10px 12px;border-radius:8px;font-size:12px}.ppd-alert{border:1px solid #edcbc6;background:#fff6f4;color:#92352d}.ppd-notice{border:1px solid #cbe0d2;background:#f4fbf6;color:#326f48}.ppd-pending{max-width:1180px;margin:12px auto 0;border:1px solid #e6ddc6;border-radius:10px;background:#fffcf5;overflow:hidden}.ppd-pending-toggle{display:flex;width:100%;align-items:center;justify-content:space-between;padding:11px 14px;border:0;background:transparent;text-align:left}.ppd-pending-toggle span{font-weight:620}.ppd-pending-toggle small{color:var(--ppd-muted)}.ppd-pending-list{display:grid;gap:8px;padding:0 12px 12px}.ppd-pending-list>article{display:grid;grid-template-columns:minmax(180px,1fr) auto auto;align-items:center;gap:16px;padding:12px;border-top:1px solid #ece4d2}.ppd-pending-list>article>div:first-child{display:grid}.ppd-pending-list span{font-size:12px;color:var(--ppd-muted)}.ppd-pending-list dl{display:flex;gap:14px;margin:0}.ppd-pending-list dl div{display:grid}.ppd-pending-list dt{font-size:10px;color:var(--ppd-muted)}.ppd-pending-list dd{margin:0;font-weight:650}.ppd-section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin:0 0 22px}.ppd-section-heading h1,.ppd-detail h2,.ppd-editor h2{margin:1px 0 4px;font-size:25px;line-height:1.2;letter-spacing:-.025em}.ppd-section-heading p{margin:0;color:var(--ppd-muted)}.ppd-section-heading>span{font-size:12px;color:var(--ppd-muted)}.ppd-eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:700;color:#8b8b84}.ppd-tabs{display:flex;gap:3px;width:max-content;margin:0 0 20px;padding:3px;border-radius:9px;background:var(--ppd-soft)}.ppd-tabs button{min-width:96px;padding:7px 12px;border:0;border-radius:7px;background:transparent;color:var(--ppd-muted)}.ppd-tabs button.is-active{background:#fff;color:var(--ppd-text);box-shadow:0 1px 4px #1111}.ppd-search{display:flex;align-items:center;gap:8px;margin:0 0 20px}.ppd-search label{position:relative;display:flex;align-items:center;flex:1;min-width:180px}.ppd-search label>.ppd-icon{position:absolute;left:11px;color:#8f8f88}.ppd-search input,.ppd-search select,.ppd-inline-input input,.ppd-editor input,.ppd-editor textarea{width:100%;border:1px solid var(--ppd-line);border-radius:8px;background:#fff;outline:none}.ppd-search input{height:38px;padding:8px 12px 8px 34px}.ppd-search select{width:auto;height:38px;padding:7px 31px 7px 10px}.ppd-search input:focus,.ppd-search select:focus,.ppd-inline-input input:focus,.ppd-editor input:focus,.ppd-editor textarea:focus{border-color:#aaa9a1;box-shadow:0 0 0 3px #2221}.ppd-toolbar-row{align-items:flex-start;justify-content:space-between}.ppd-toolbar-row>.ppd-search{flex:1}.ppd-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:22px 13px}.ppd-card{position:relative;min-width:0}.ppd-card-open{display:block;width:100%;padding:0;border:0;background:none;text-align:left}.ppd-card-open:hover .ppd-image img{transform:scale(1.02)}.ppd-image{display:grid;place-items:center;width:100%;aspect-ratio:1;overflow:hidden;border-radius:9px;background:var(--ppd-surface);color:#aaa}.ppd-image img{display:block;width:100%;height:100%;object-fit:contain;transition:transform .18s ease}.ppd-image-pair{grid-template-columns:1fr 1fr}.ppd-image-pair img{min-width:0;object-fit:cover}.ppd-card-copy{display:grid;gap:3px;margin-top:8px;padding-right:28px}.ppd-card-copy strong,.ppd-card-copy span,.ppd-card-copy small{overflow:hidden;text-overflow:ellipsis}.ppd-card-copy strong{white-space:nowrap;font-size:12px;font-weight:650}.ppd-card-copy span{display:-webkit-box;min-height:34px;color:var(--ppd-muted);font-size:11px;-webkit-line-clamp:2;-webkit-box-orient:vertical}.ppd-card-copy small{white-space:nowrap;color:#989891;font-size:10px}.ppd-favorite{position:absolute;top:7px;right:7px;display:grid;place-items:center;width:27px;height:27px;padding:0;border:1px solid #ffffff80;border-radius:50%;background:#ffffffed;color:#666;box-shadow:0 1px 6px #1112}.ppd-favorite.is-active{color:#b14657;background:#fff4f5}.ppd-favorite.is-active .ppd-icon{font-size:0}.ppd-favorite.is-active .ppd-icon::after{content:"\u2665";font-size:15px}.ppd-card-use{position:absolute;right:0;bottom:0;padding:2px 0;border:0;background:none;color:#5e6e91;font-size:10px}.ppd-card-delete{position:absolute;left:0;bottom:0;padding:2px;border:0;background:none;color:var(--ppd-danger)}.ppd-load-more{display:flex;justify-content:center;margin-top:28px}.ppd-pagination{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:28px;color:var(--ppd-muted);font-size:11px}.ppd-pagination button{padding:5px 10px;border:1px solid var(--ppd-line);border-radius:7px;background:#fff}.ppd-state{display:grid;place-items:center;gap:6px;min-height:220px;padding:30px;border:1px dashed var(--ppd-line);border-radius:10px;text-align:center;color:var(--ppd-muted)}.ppd-state strong{color:var(--ppd-text)}.ppd-state.ppd-error{color:var(--ppd-danger)}.ppd-spinner{width:18px;height:18px;border:2px solid #ddd;border-top-color:#555;border-radius:50%;animation:ppd-spin .75s linear infinite}@keyframes ppd-spin{to{transform:rotate(360deg)}}.ppd-detail-header{display:grid;grid-template-columns:90px minmax(0,1fr) auto;align-items:start;gap:15px;margin-bottom:25px}.ppd-back{justify-self:start;border-color:transparent;background:transparent;padding-left:0}.ppd-detail-grid{display:grid;grid-template-columns:minmax(320px,1.1fr) minmax(280px,.9fr);gap:30px}.ppd-detail-grid>.ppd-image{aspect-ratio:auto;min-height:360px;max-height:70vh}.ppd-detail-copy{min-width:0}.ppd-detail-copy h3{margin:0 0 10px;font-size:13px}.ppd-detail-copy dl{display:grid;margin:0 0 20px}.ppd-detail-copy dl>div{display:grid;grid-template-columns:90px 1fr;gap:12px;padding:9px 0;border-bottom:1px solid var(--ppd-line)}.ppd-detail-copy dt{color:var(--ppd-muted)}.ppd-detail-copy dd{margin:0}.ppd-lead{margin-top:0;white-space:pre-wrap;color:#55554f}.ppd-tags{display:flex;flex-wrap:wrap;gap:5px;margin:14px 0}.ppd-tags span{padding:3px 7px;border-radius:999px;background:var(--ppd-soft);font-size:10px;color:#676761}.ppd-skill-facts{display:grid;gap:16px;margin-top:24px}.ppd-skill-facts section{border-top:1px solid var(--ppd-line);padding-top:12px}.ppd-skill-facts ul{margin:0;padding-left:18px;color:#575751}.ppd-family-intro{margin:-8px 0 24px}.ppd-family-intro p{max-width:760px;color:var(--ppd-muted)}.ppd-family-grid .ppd-card-copy{padding-right:0}.ppd-list{display:grid;gap:8px}.ppd-list>article{display:grid;grid-template-columns:minmax(0,1fr) auto auto auto;align-items:center;gap:8px;padding:12px 13px;border:1px solid var(--ppd-line);border-radius:10px}.ppd-list-open{display:grid;gap:2px;min-width:0;padding:0;border:0;background:none;text-align:left}.ppd-list-open strong,.ppd-list-open span,.ppd-list-open small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ppd-list-open span{color:var(--ppd-muted)}.ppd-list-open small{font-size:10px;color:#999}.ppd-editor{max-width:900px;margin:0 auto}.ppd-editor>header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px}.ppd-editor fieldset{display:grid;gap:18px;margin:0;padding:0;border:0}.ppd-editor label{display:grid;gap:6px}.ppd-editor label>span{font-weight:620}.ppd-editor label small{font-weight:400;color:var(--ppd-muted)}.ppd-editor input,.ppd-editor textarea{padding:9px 11px;resize:vertical}.ppd-editor .ppd-prompt{min-height:180px;line-height:1.65}.ppd-editor>footer{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:22px;padding-top:16px;border-top:1px solid var(--ppd-line)}.ppd-editor>footer span{font-size:11px;color:var(--ppd-muted)}.ppd-form-heading{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px}.ppd-form-heading h3{margin:0;font-size:13px}.ppd-form-heading p{margin:2px 0;color:var(--ppd-muted);font-size:11px}.ppd-form-heading>span{font-size:11px;color:var(--ppd-muted)}.ppd-reference-editor>ol{display:grid;gap:6px;margin:0;padding:0;list-style:none}.ppd-reference-editor>ol li{display:grid;grid-template-columns:24px minmax(0,1fr) auto auto auto;align-items:center;gap:7px;padding:8px;border:1px solid var(--ppd-line);border-radius:8px}.ppd-reference-editor>ol li>span{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--ppd-soft);font-size:10px}.ppd-reference-editor>ol li>div{display:grid;min-width:0}.ppd-reference-editor>ol strong{font-size:11px}.ppd-reference-editor>ol small{overflow:hidden;text-overflow:ellipsis;color:var(--ppd-muted);font-size:9px}.ppd-reference-choices{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}.ppd-reference-choices button{max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:5px 8px;border:1px solid var(--ppd-line);border-radius:7px;background:var(--ppd-surface);font-size:10px}.ppd-inline-input{display:flex;gap:7px}.ppd-inline-input input{min-width:0;padding:8px 10px}.ppd-conflict{display:grid;gap:4px;margin-bottom:16px;padding:12px;border:1px solid #e8c9a8;border-radius:9px;background:#fff9f1;color:#7d4e24}.ppd-conflict .ppd-button{justify-self:start;margin-top:6px}.ppd-user-skill-detail{display:grid;gap:18px;max-width:850px;margin-left:105px}.ppd-user-skill-detail>p{color:var(--ppd-muted)}.ppd-user-skill-detail section{padding:15px;border-radius:10px;background:var(--ppd-surface)}.ppd-user-skill-detail h3{margin:0 0 8px;font-size:12px}.ppd-user-skill-detail pre{max-height:300px;margin:0;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;font:inherit}.ppd-user-skill-detail ol{margin:0;padding-left:22px;font-size:11px;color:var(--ppd-muted)}.ppd-file-input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}.ppd-break{overflow-wrap:anywhere}.ppd-dialog-backdrop{position:fixed;z-index:100;inset:0;display:grid;place-items:center;padding:24px;background:#16161355;backdrop-filter:blur(2px)}.ppd-dialog{width:min(440px,100%);padding:24px;border:1px solid var(--ppd-line);border-radius:13px;background:#fff;box-shadow:0 24px 80px #1114}.ppd-dialog h2{margin:0 0 9px;font-size:18px}.ppd-dialog p{margin:0 0 22px;color:var(--ppd-muted)}.ppd-dialog .ppd-actions{justify-content:flex-end}\n@media(max-width:980px){.ppd-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.ppd-detail-grid{grid-template-columns:1fr}.ppd-detail-grid>.ppd-image{min-height:300px}.ppd-pending-list>article{grid-template-columns:1fr}.ppd-user-skill-detail{margin-left:0}}\n@media(max-width:720px){.ppd-content{padding:20px 16px 48px}.ppd-account{align-items:flex-start;padding:10px 14px}.ppd-connection small,.ppd-phase,.ppd-account-meta>span:first-child{display:none}.ppd-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 10px}.ppd-search,.ppd-toolbar-row,.ppd-section-heading{align-items:stretch;flex-wrap:wrap}.ppd-search label{flex-basis:100%}.ppd-search select{flex:1}.ppd-toolbar-row>.ppd-search{flex-basis:100%}.ppd-detail-header{grid-template-columns:1fr}.ppd-detail-header>.ppd-actions{flex-wrap:wrap}.ppd-detail-grid>.ppd-image{min-height:240px}.ppd-list>article{grid-template-columns:minmax(0,1fr) auto auto}.ppd-list>article>.ppd-button{grid-column:1/-1}.ppd-editor>footer{align-items:stretch;flex-direction:column}.ppd-user-skill-detail{margin-left:0}.ppd-pending{margin-inline:12px}}\n.ppd-pending-list>article{grid-template-columns:minmax(180px,.8fr) auto minmax(240px,1fr) auto}.ppd-batch-copy{display:grid;min-width:0}.ppd-batch-copy small{font-size:10px;color:#9a693c}.ppd-batch-summary{align-self:start}.ppd-batch-progress{display:grid;gap:5px;min-width:0}.ppd-batch-progress progress{width:100%;height:6px;border:0;border-radius:999px;overflow:hidden;background:#ece8dc}.ppd-batch-progress progress::-webkit-progress-bar{background:#ece8dc}.ppd-batch-progress progress::-webkit-progress-value{background:#6b826d}.ppd-batch-progress>span{font-size:10px;color:var(--ppd-muted)}.ppd-batch-progress details{font-size:10px}.ppd-batch-progress summary{cursor:pointer;color:#5d6680}.ppd-batch-progress ol{display:grid;gap:4px;max-height:180px;margin:7px 0 0;padding:0;overflow:auto;list-style:none}.ppd-batch-progress li{display:grid;grid-template-columns:20px minmax(70px,1fr) auto;gap:5px;align-items:center;padding:5px 6px;border-radius:6px;background:#fff}.ppd-batch-progress li>span{display:grid;place-items:center;width:17px;height:17px;border-radius:50%;background:var(--ppd-soft);font-size:9px}.ppd-batch-progress code{overflow:hidden;text-overflow:ellipsis;font:9px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ppd-muted)}.ppd-batch-progress li>strong{font-size:10px}.ppd-batch-progress li>small{grid-column:2/-1;color:var(--ppd-muted);font-size:9px}.ppd-batch-progress li[data-status="submission_unknown"]>strong,.ppd-batch-progress li[data-status="failed"]>strong{color:var(--ppd-danger)}\n.ppd-native-composer{display:flex;align-items:center;gap:5px;flex-wrap:wrap;padding:6px 8px;border-top:1px solid #e5e5e1;color:#686862;font:11px/1.4 ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.ppd-native-composer>span{margin-right:3px;font-weight:700;color:#343431}.ppd-native-composer button{min-height:25px;padding:3px 8px;border:1px solid #e1e1dc;border-radius:7px;background:#fff;color:#50504b;font:inherit;cursor:pointer}.ppd-native-composer button:hover{border-color:#c9c9c2;background:#f8f8f5}.ppd-native-composer small{flex-basis:100%;padding:3px 7px;border-radius:6px;background:#f3f6ef;color:#52705a}\n@media(max-width:1180px){.ppd-pending-list>article{grid-template-columns:1fr auto}.ppd-batch-progress{grid-column:1/-1}.ppd-pending-list>article>.ppd-actions{justify-self:end}}@media(max-width:620px){.ppd-pending-list>article{grid-template-columns:1fr}.ppd-pending-list>article>.ppd-actions{justify-self:start}.ppd-batch-progress{grid-column:auto}}\n.ppd-pending-list>article[data-terminal=true]{background:#fafaf7;opacity:.92}.ppd-favorites-import{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:-8px 0 14px}.ppd-favorites-import>small{color:var(--ppd-muted);font-size:10px}.ppd-favorites-import>p{flex-basis:100%;margin:0;padding:7px 9px;border-radius:7px;background:var(--ppd-surface);font-size:11px}.ppd-favorites-import>section{flex-basis:100%;padding:12px;border:1px solid var(--ppd-line);border-radius:9px;background:var(--ppd-surface)}.ppd-favorites-import>section ul{max-height:160px;margin:8px 0;padding-left:20px;overflow:auto}.ppd-favorites-import>section .ppd-button{margin-right:7px}\n.ppd-button-stop{border-color:#dec9a8;background:#fffaf1;color:#81591f}.ppd-button-stop:hover{border-color:#b98b45;background:#fff5e4}\n.ppd-panel .ppd-button-primary,.ppd-panel .ppd-button-primary:hover{color:#fff}\n.ppd-dialog p.ppd-alert{margin:0 0 14px;color:#92352d}.ppd-favorites-import>p.ppd-alert{border:1px solid #edcbc6;background:#fff6f4;color:#92352d}\n.ppd-panel{width:100%;height:100%;min-width:0;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain}\n.ppd-card-copy>span,.ppd-card-copy>small{display:none}\n.ppd-export-result{display:grid;gap:8px;margin-top:14px;padding:12px;border:1px solid var(--ppd-line);border-radius:9px;background:var(--ppd-surface)}.ppd-export-result code{font-size:10px;color:var(--ppd-muted)}\n/* Keep Skill previews inside their frame, including tall originals and before/after pairs. */\n.ppd-panel-skills .ppd-image{grid-template-rows:minmax(0,1fr)}\n.ppd-panel-skills .ppd-image img{min-width:0;min-height:0;object-fit:contain}\n.ppd-panel-skills .ppd-card-open:hover .ppd-image img{transform:none}\n\n/* Public Skill card titles use the full card width. */\n.ppd-panel-skills .ppd-grid:not(.ppd-family-grid) .ppd-card-copy{padding-right:0;text-align:center}\n\n/* Personal Skill references: local upload and visual browsing. */\n.ppd-reference-actions{margin:14px 0;flex-wrap:wrap}\n.ppd-reference-editor>ol li{grid-template-columns:24px 52px minmax(0,1fr) auto auto auto}\n.ppd-reference-editor>ol li>.ppd-image{width:52px;height:52px;aspect-ratio:1;border-radius:5px}\n.ppd-reference-editor>ol strong{overflow-wrap:anywhere}\n.ppd-reference-editor .ppd-image span{padding:3px;font-size:10px;text-align:center}\n.ppd-upload-picker{padding:14px;border:1px solid var(--ppd-line);border-radius:9px}\n.ppd-upload-picker .ppd-search{margin-bottom:14px}\n.ppd-upload-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px}\n.ppd-upload-grid>button{display:grid;min-width:0;gap:4px;padding:6px;border:1px solid var(--ppd-line);border-radius:8px;background:var(--ppd-surface);text-align:left;cursor:pointer}\n.ppd-upload-grid>button[aria-pressed=true]{border-color:var(--ppd-text)}\n.ppd-upload-grid>button:disabled{cursor:default;opacity:.6}\n.ppd-upload-grid .ppd-image{width:100%;aspect-ratio:1;border-radius:4px}\n.ppd-upload-grid strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}\n.ppd-upload-grid small{color:var(--ppd-muted);font-size:10px}\n.ppd-user-skill-detail .ppd-skill-reference-detail{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px;padding:0;list-style:none}\n.ppd-skill-reference-detail li{min-width:0;overflow-wrap:anywhere}\n.ppd-skill-reference-detail .ppd-image{aspect-ratio:1;margin-bottom:5px}\n@media(max-width:600px){.ppd-upload-picker{padding:10px}.ppd-reference-editor>ol li{grid-template-columns:20px 40px minmax(0,1fr) auto auto auto;gap:4px;padding:6px}.ppd-reference-editor>ol li>.ppd-image{width:40px;height:40px}.ppd-reference-editor>ol .ppd-icon-button{padding:3px}}\n\n/* Library controls share one baseline; group navigation belongs only to lists. */\n.ppd-library-toolbar{display:flex;align-items:center;gap:16px;min-width:0;margin:0 0 24px}\n.ppd-library-toolbar>.ppd-tabs{flex:0 0 auto;margin:0}\n.ppd-tabs{max-width:100%;padding:3px;border-radius:999px;background:#f1f1ee;gap:2px}\n.ppd-panel .ppd-tabs button{font-size:12px;line-height:1.4;min-width:64px;min-height:28px;padding:5px 12px;border-radius:999px;white-space:nowrap;transition:background-color .15s ease,color .15s ease}\n.ppd-tabs button.is-active{background:var(--ppd-text);color:#fff;box-shadow:none}\n.ppd-tabs button:not(.is-active){color:#686861}\n.ppd-tabs button:not(.is-active):hover{background:#e7e7e2;color:var(--ppd-text)}\n.ppd-library-toolbar>.ppd-search{flex:0 1 auto;min-width:0;max-width:100%;margin:0;margin-inline-start:auto;justify-content:flex-end;flex-wrap:nowrap}\n.ppd-library-toolbar .ppd-search label{min-width:120px;width:224px;max-width:224px;flex:0 1 224px}\n.ppd-library-toolbar .ppd-search input{height:34px;border-radius:999px}\n.ppd-library-toolbar .ppd-search select{max-width:150px;height:32px}\n.ppd-library-toolbar .ppd-search>.ppd-button{min-height:32px;padding-block:5px}\n.ppd-panel .ppd-library-toolbar input,.ppd-panel .ppd-library-toolbar select,.ppd-panel .ppd-library-toolbar button{font-size:12px}\n.ppd-toolbar-row:has(.ppd-library-toolbar){align-items:center;gap:12px;margin-bottom:24px}\n.ppd-toolbar-row>.ppd-library-toolbar{flex:1;margin-bottom:0}\n.ppd-panel button:focus-visible{outline:2px solid var(--ppd-text);outline-offset:3px}\n.ppd-upload-area{display:flex;align-items:center;flex:none}\n.ppd-upload-area>.ppd-icon-button{width:32px;height:32px;border-radius:50%}\n.ppd-upload-area .ppd-icon{font-size:20px}\n.ppd-library-toolbar>.ppd-archive-toolbar{flex:0 1 auto;min-width:0;margin:0;margin-inline-start:auto;justify-content:flex-end;flex-wrap:nowrap}\n.ppd-library-toolbar>.ppd-archive-toolbar input{flex:0 1 224px;min-width:120px;width:224px;max-width:224px;height:34px;padding-inline:14px;border-radius:999px;font:inherit}\n.ppd-library-toolbar>.ppd-archive-toolbar select,.ppd-library-toolbar>.ppd-archive-toolbar button{min-height:32px;white-space:nowrap}\n\n/* Web detail hierarchy: full result on the left, reference and information on the right. */\n.ppd-resource-detail>.ppd-back{position:sticky;top:64px;z-index:5;margin-bottom:20px;padding-inline:12px;border-radius:999px;background:var(--ppd-bg)}\n.ppd-resource-detail-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,.85fr);gap:40px;align-items:start}\n.ppd-resource-visual,.ppd-resource-info{min-width:0}\n.ppd-resource-info>h2{margin:0 0 28px;font-size:28px;font-weight:650;line-height:1.2;overflow-wrap:anywhere}\n.ppd-detail-artwork,.ppd-detail-reference{margin:0}\n.ppd-detail-artwork>figcaption,.ppd-detail-reference>figcaption{margin-bottom:10px;font-size:12px;color:var(--ppd-muted)}\n.ppd-detail-artwork>button{display:flex;align-items:center;justify-content:center;width:100%;height:clamp(360px,56vw,660px);padding:24px;border:0;border-radius:14px;background:var(--ppd-surface);cursor:zoom-in}\n.ppd-detail-artwork>button>img{display:block;width:100%;height:100%;object-fit:contain}\n.ppd-detail-reference{margin-bottom:28px}\n.ppd-detail-reference>button{display:block;width:88px;height:88px;padding:0;overflow:hidden;border:0;border-radius:10px;background:var(--ppd-surface);cursor:zoom-in}\n.ppd-detail-reference>button>img{display:block;width:100%;height:100%;object-fit:contain}\n.ppd-resource-about{margin-bottom:28px}\n.ppd-resource-info h3{margin:0 0 10px;font-size:13px;font-weight:550;color:var(--ppd-muted)}\n.ppd-resource-about p{margin:0;font-size:14px;line-height:1.75;white-space:pre-wrap;overflow-wrap:anywhere}\n.ppd-resource-info .ppd-skill-facts{margin:0;gap:20px}\n.ppd-resource-info .ppd-skill-facts section{padding:0;border:0}\n.ppd-resource-info .ppd-skill-facts ul{margin:0;padding-left:18px;line-height:1.7}\n.ppd-resource-info .ppd-skill-facts p{margin:0;line-height:1.7}\n.ppd-resource-info .ppd-tags{gap:6px;margin:20px 0}\n.ppd-resource-info .ppd-tags span{padding:5px 10px;font-size:12px}\n.ppd-resource-facts{margin:0}\n.ppd-resource-facts>div{display:flex;justify-content:space-between;gap:20px;padding:15px 0;border-bottom:1px solid var(--ppd-line)}\n.ppd-resource-facts dt{color:var(--ppd-muted)}\n.ppd-resource-facts dd{margin:0;text-align:right;overflow-wrap:anywhere}\n.ppd-resource-detail-actions{display:flex;align-items:center;gap:12px;margin-top:28px}\n.ppd-resource-detail-actions>.ppd-button-primary{flex:1;min-height:44px;border-radius:999px}\n.ppd-resource-detail-actions>.ppd-favorite{position:static;flex:0 0 44px;width:44px;height:44px;border:1px solid var(--ppd-line);box-shadow:none}\n.ppd-media-dialog{position:fixed;inset:0;width:min(980px,92vw);max-width:92vw;height:min(900px,90vh);max-height:90vh;margin:auto;padding:16px;border:0;border-radius:14px;background:var(--ppd-bg);color:var(--ppd-text)}\n.ppd-media-dialog[open]{display:flex;flex-direction:column;gap:12px}\n.ppd-media-dialog::backdrop{background:#0009}\n.ppd-media-dialog>.ppd-button{align-self:flex-end;flex:none}\n.ppd-media-dialog>img{display:block;min-height:0;width:100%;height:100%;flex:1;object-fit:contain}\n@media(max-width:960px){\n .ppd-library-toolbar{gap:12px}\n .ppd-library-toolbar .ppd-search select{max-width:110px}\n .ppd-panel .ppd-tabs button{padding-inline:10px;min-width:60px}\n .ppd-resource-detail-grid{grid-template-columns:minmax(0,1.1fr) minmax(260px,.9fr);gap:28px}\n .ppd-resource-info>h2{font-size:24px}\n .ppd-toolbar-row:has(.ppd-library-toolbar){flex-wrap:wrap;justify-content:flex-end}\n .ppd-toolbar-row>.ppd-library-toolbar{flex-basis:100%}\n}\n@media(max-width:700px){\n .ppd-library-toolbar{flex-wrap:wrap;gap:14px}\n .ppd-library-toolbar>.ppd-search,.ppd-library-toolbar>.ppd-archive-toolbar{flex-basis:100%;flex-wrap:wrap}\n .ppd-library-toolbar .ppd-search label{flex:0 1 224px;width:224px;max-width:224px}\n .ppd-library-toolbar .ppd-search select{max-width:none}\n .ppd-library-toolbar>.ppd-archive-toolbar input{flex:0 1 224px;width:224px}\n .ppd-resource-detail-grid{grid-template-columns:minmax(0,1fr);gap:28px}\n .ppd-detail-artwork>button{height:clamp(300px,85vw,520px);padding:18px}\n .ppd-resource-info>h2{font-size:24px;margin-bottom:22px}\n .ppd-resource-detail-actions{margin-top:24px}\n .ppd-media-dialog{padding:12px}\n}\n@media(prefers-reduced-motion:reduce){.ppd-tabs button{transition:none}}\n\n.ppd-archive-empty{margin:24px 0;color:var(--ppd-muted);font-size:12px}\n\n.ppd-account{display:block}.ppd-account-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-width:0}.ppd-plugin-update{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:7px;font-size:11px;color:var(--ppd-muted)}.ppd-plugin-version{min-width:0;max-width:100%;overflow-wrap:anywhere}.ppd-plugin-update-message{flex-basis:100%;line-height:1.5}.ppd-plugin-update-message.is-error{color:#9b3030}.ppd-plugin-update .ppd-button{padding:4px 9px;font-size:11px}.ppd-account-row .ppd-connection{min-width:0}.ppd-account-row .ppd-connection strong{overflow-wrap:anywhere}\n';

// plugins/podplo-dsh/src/generation-panel.css
var generation_panel_default = '.ppd-visually-hidden{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}\n.ppd-skill-feedback{margin:6px 0 0;display:flex;align-items:center;gap:8px;color:#a13d31;font-size:12px;line-height:18px}.ppd-skill-feedback .ppd-link-button{flex:none}\n.ppd-generation-shell.is-floating:has(>.ppd-skill-feedback){height:auto}\n.ppd-generation{min-width:0}.ppd-generation-loading{display:flex;align-items:center;gap:6px;margin-top:7px;color:var(--ppd-muted)}.ppd-generation-loading .ppd-spinner{width:12px;height:12px}.ppd-generation-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(220px,300px);gap:18px;align-items:start}.ppd-generation-form{min-width:0;margin:0;border:0;padding:0;display:grid;gap:9px}.ppd-generation-form:disabled{opacity:1}.ppd-generation-form:disabled .ppd-web-composer{opacity:.72}.ppd-link-button{width:max-content;border:0;background:none;color:var(--ppd-accent);padding:0;font:inherit;cursor:pointer}.ppd-form-hint,.ppd-generation-quote small,.ppd-muted{color:var(--ppd-muted);font-size:12px}\n\n.ppd-web-composer{--composer-line:#e0e4eb;--composer-soft:#f0f2f5;--composer-muted:#676f7e;--composer-faint:#a8afbd;--composer-ink:#0b0d12;position:relative;box-sizing:border-box;width:100%;max-width:720px;height:178px;border:1px solid var(--composer-line);border-radius:16px;background:#fff;box-shadow:0 2px 5px rgba(15,20,28,.04);padding:12px 12px 8px;display:flex;flex-direction:column;transition:box-shadow .18s,border-color .18s}.ppd-web-composer.is-focused{border-color:var(--composer-line);box-shadow:0 2px 5px rgba(15,20,28,.04)}.ppd-composer-media-row{height:64px;display:flex;align-items:flex-start;gap:8px;padding-right:38px;min-width:0}.ppd-composer-clear{position:absolute;z-index:7;top:14px;right:14px;width:30px;height:30px;display:grid;place-items:center;border:0;border-radius:8px;background:transparent;color:#8b929d;cursor:pointer;font-size:21px;line-height:1;transform:rotate(-20deg);transition:background-color .18s,color .18s,transform .18s}.ppd-composer-clear:hover{background:var(--composer-soft);color:#3f4752;transform:translateY(-1px) rotate(-20deg)}.ppd-web-composer>textarea{flex:1;min-height:0;resize:none;border:0;outline:0;background:transparent;color:var(--composer-ink);font-family:inherit;font-size:12px;line-height:18px;font-weight:500;padding:0 2px}.ppd-web-composer>textarea::placeholder{color:var(--composer-faint)}\n.ppd-skill-token{position:relative;box-sizing:border-box;width:max-content;min-width:170px;max-width:min(300px,calc(100% - 64px));height:56px;flex:0 1 auto;padding:0 13px;display:flex;align-items:center;justify-content:flex-start;gap:10px;border:1px dashed #c8cdd5;border-radius:10px;background:#f7f8f9;color:#6f7783;cursor:pointer;overflow:hidden}.ppd-skill-token.has-value{padding-right:12px;border:0;background:#121418;color:#fff}.ppd-skill-copy{position:static;min-width:0;display:flex;flex:1;flex-direction:column;align-items:flex-start;gap:2px}.ppd-skill-token small{color:#7b8290;font-size:9px;line-height:11px;font-weight:700;letter-spacing:.04em}.ppd-skill-token strong{max-width:220px;overflow:hidden;color:inherit;font-size:12px;line-height:14px;font-weight:700;text-overflow:ellipsis;white-space:nowrap}.ppd-token-mark{width:28px;height:28px;display:grid;place-items:center;flex:0 0 28px;border-radius:8px;background:#fff;color:#1a1d24;font-size:16px}.ppd-skill-cover{width:42px;height:42px;flex:0 0 42px;border-radius:8px;object-fit:cover}.ppd-skill-token>select,.ppd-upload-tile>select,.ppd-toolbar-select>select{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}\n.ppd-reference-tray{position:relative;height:56px;min-width:0;display:flex;flex:0 1 auto;align-items:flex-start;gap:8px;isolation:isolate}.ppd-upload-tile,.ppd-reference-token{position:relative;box-sizing:border-box;width:56px;height:56px;flex:0 0 56px;border:1px dashed #c8cdd5;border-radius:10px;background:#f7f8f9;display:grid;place-items:center;color:#6f7783;cursor:pointer;overflow:hidden}.ppd-upload-tile:hover{border-color:#1597e5;background:#eaf6fd;color:#086eba}.ppd-local-upload{border-style:solid;font-size:22px}.ppd-reference-token{border:0;background:#242830;color:#fff}.ppd-reference-token>img{width:100%;height:100%;object-fit:cover}.ppd-reference-token>span{font-size:17px;font-weight:800}.ppd-reference-token>b{position:absolute;right:4px;bottom:4px;width:17px;height:17px;border-radius:50%;background:rgba(0,0,0,.72);display:grid;place-items:center;font-size:10px}.ppd-reference-actions{position:absolute;inset:0;display:flex;align-items:flex-start;justify-content:flex-end;gap:2px;padding:3px;background:linear-gradient(to bottom,rgba(0,0,0,.55),transparent 54%);opacity:0;transition:opacity .14s}.ppd-reference-token:hover .ppd-reference-actions,.ppd-reference-token:focus-within .ppd-reference-actions{opacity:1}.ppd-reference-actions button{width:15px;height:15px;border:0;border-radius:50%;padding:0;background:rgba(0,0,0,.72);color:#fff;display:grid;place-items:center;font-size:9px;line-height:1;cursor:pointer}.ppd-reference-actions button:disabled{opacity:.35}.ppd-reference-tray.has-references>.ppd-upload-tile:first-child{position:absolute;z-index:6;left:38px;top:22px;width:36px;height:36px;border:2px solid #fff;border-radius:50%;background:#242830;color:#fff;box-shadow:0 4px 10px rgba(12,16,22,.24)}.ppd-reference-tray.has-references>.ppd-reference-token+.ppd-reference-token{margin-left:-40px}.ppd-reference-tray.has-references>.ppd-reference-token{border:2px solid #fff;border-radius:15px;clip-path:polygon(10% 12%,35% 3%,68% 8%,93% 2%,98% 36%,90% 68%,96% 92%,58% 97%,28% 91%,3% 98%,7% 61%,2% 31%);box-shadow:0 3px 9px rgba(19,24,31,.18);transition:margin-left .24s cubic-bezier(.2,.72,.2,1),clip-path .2s ease,border-radius .2s ease,transform .2s ease}.ppd-reference-tray.has-references>.ppd-reference-token:nth-of-type(2n){transform:rotate(4deg)}.ppd-reference-tray.has-references>.ppd-reference-token:nth-of-type(3n){transform:rotate(-4deg)}.ppd-reference-tray.has-references:is(:hover,:focus-within){z-index:8}.ppd-reference-tray.has-references:is(:hover,:focus-within)>.ppd-upload-tile:first-child{position:relative;left:0;top:0;width:56px;height:56px;flex-basis:56px;border:1px dashed #c8cdd5;border-radius:10px;background:#f7f8f9;color:#6f7783;box-shadow:none}.ppd-reference-tray.has-references:is(:hover,:focus-within)>.ppd-reference-token{margin-left:0;border:0;border-radius:10px;clip-path:none;box-shadow:none;transform:none}.ppd-reference-tray.has-references:not(:hover):not(:focus-within)>.ppd-local-upload{display:none}\n.ppd-composer-toolbar{height:38px;display:flex;align-items:flex-end;justify-content:space-between;gap:8px}.ppd-toolbar-left,.ppd-toolbar-right{display:flex;align-items:center;gap:2px;min-width:0}.ppd-toolbar-left{flex:1}.ppd-toolbar-right{flex:none}.ppd-toolbar-divider{width:1px;height:22px;flex:0 0 1px;background:var(--composer-line);margin:0 6px 5px 5px}.ppd-toolbar-icon,.ppd-toolbar-button,.ppd-toolbar-select{position:relative;box-sizing:border-box;height:32px;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--composer-muted);display:flex;align-items:center;justify-content:center;gap:5px;cursor:pointer;white-space:nowrap}.ppd-toolbar-icon{width:32px;flex:0 0 32px;padding:0}.ppd-toolbar-button,.ppd-toolbar-select{padding:0 8px;font-size:12px;font-weight:500}.ppd-toolbar-icon:hover,.ppd-toolbar-button:hover,.ppd-toolbar-select:hover{background:var(--composer-soft);color:var(--composer-ink)}.ppd-toolbar-select strong{max-width:118px;overflow:hidden;font-size:12px;font-weight:500;text-overflow:ellipsis;white-space:nowrap}.ppd-model-dot{width:14px;height:14px;flex:0 0 14px;border-radius:4px;background:linear-gradient(145deg,#7b8cff,#7557d8);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}.ppd-model-dot.is-gpt{background:linear-gradient(145deg,#49c970,#138f7e)}\n.ppd-contract-control{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;opacity:.001!important;pointer-events:none!important}.ppd-model-menu,.ppd-settings-menu{position:relative}.ppd-model-menu>summary,.ppd-settings-menu>summary{list-style:none}.ppd-model-menu>summary::-webkit-details-marker,.ppd-settings-menu>summary::-webkit-details-marker{display:none}.ppd-model-menu[open]>summary,.ppd-settings-menu[open]>summary{background:var(--composer-soft);color:var(--composer-ink)}.ppd-settings-menu summary>i{width:1px;height:16px;background:#dfe3e8}.ppd-settings-menu summary>strong{max-width:88px;overflow:hidden;color:#535d6b;font-size:11px;font-weight:650;text-overflow:ellipsis;white-space:nowrap}.ppd-model-popover,.ppd-settings-popover{position:absolute;z-index:30;left:0;bottom:38px;box-sizing:border-box;border:1px solid #e3e6ea;border-radius:12px;background:#fff;box-shadow:0 12px 30px rgba(20,27,38,.14)}.ppd-model-popover{width:390px;max-height:min(440px,calc(100vh - 40px));overflow:auto;padding:7px;display:grid;gap:7px}.ppd-model-popover>header{display:flex;flex-direction:column;gap:2px;padding:7px 9px 5px}.ppd-model-popover>header strong{color:#202630;font-size:12px}.ppd-model-popover>header small{color:#959daa;font-size:9px}.ppd-model-popover>button{position:relative;min-height:74px;border:1px solid #e2e6eb;border-radius:12px;padding:9px 38px 9px 9px;background:#fff;display:flex;align-items:center;gap:11px;color:#171b22;text-align:left;cursor:pointer}.ppd-model-popover>button:hover,.ppd-model-popover>button.is-selected{border-color:#b5bdc8;background:#eef1f5}.ppd-model-popover>button:disabled{opacity:.55;cursor:not-allowed}.ppd-model-popover>button>span:nth-child(2){min-width:0;display:flex;flex:1;flex-direction:column;gap:4px}.ppd-model-popover>button strong{overflow:hidden;font-size:13px;text-overflow:ellipsis;white-space:nowrap}.ppd-model-popover>button small{color:#697383;font-size:10px}.ppd-model-popover>button>b{position:absolute;right:15px}.ppd-model-brand{width:42px;height:42px;flex:0 0 42px;border-radius:11px;background:linear-gradient(145deg,#8798ff,#7053d4);display:grid;place-items:center;color:#fff;font-size:10px;font-weight:800}.ppd-model-brand.is-gpt{background:linear-gradient(145deg,#58cf78,#168e7e)}.ppd-settings-popover{width:330px;max-height:min(440px,calc(100vh - 40px));overflow:auto;padding:7px}.ppd-settings-popover section+section{margin-top:5px}.ppd-settings-popover section>label:first-child{display:block;margin:0 3px 3px;color:#8a929e;font-size:9px;font-weight:650}.ppd-ratio-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:3px;padding:4px;border-radius:12px;background:#f6f7f9}.ppd-ratio-grid button{min-height:40px;border:0;border-radius:8px;background:transparent;color:#77808c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer}.ppd-ratio-grid button:hover,.ppd-ratio-grid button.is-selected,.ppd-segmented button:hover,.ppd-segmented button.is-selected{background:#fff;color:#202630;box-shadow:0 1px 4px rgba(18,25,35,.08)}.ppd-ratio-grid b{font-size:10px}.ppd-ratio-glyph{width:15px;height:11px;border:1.5px solid currentColor;border-radius:3px}.ppd-segmented{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:2px;padding:3px;border-radius:10px;background:#f6f7f9}.ppd-segmented button{min-width:0;height:28px;border:0;border-radius:7px;background:transparent;color:#74808d;cursor:pointer;font-size:10px;text-transform:capitalize}.ppd-settings-check{position:relative;height:30px;display:flex!important;align-items:center!important;gap:7px!important;margin:0!important;color:#687281!important;cursor:pointer}.ppd-settings-check>input{position:absolute;opacity:0}.ppd-settings-check>i{position:relative;width:30px;height:18px;border-radius:999px;background:#dfe3e8}.ppd-settings-check>i>b{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(18,25,35,.18);transition:transform .18s}.ppd-settings-check>input:checked+i{background:#1d2734}.ppd-settings-check>input:checked+i>b{transform:translateX(12px)}\n.ppd-search-chip{position:relative;height:32px;border:1px solid transparent;border-radius:8px;background:#f6f7f9;color:#737d8a;display:flex;align-items:center;gap:8px;padding:0 7px 0 9px;cursor:pointer;white-space:nowrap;font-size:11px;font-weight:550}.ppd-search-chip>input,.ppd-eco-control>input{position:absolute;opacity:0;pointer-events:none}.ppd-search-chip>i,.ppd-eco-control>i{position:relative;width:30px;height:18px;flex:0 0 30px;border-radius:999px;background:#dfe3e8;transition:background-color .18s}.ppd-search-chip>i>b,.ppd-eco-control>i>b{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(18,25,35,.18);transition:transform .18s}.ppd-search-chip.is-selected{background:#f0efff;color:#514aab}.ppd-search-chip.is-selected>i{background:#625abd}.ppd-search-chip.is-selected>i>b,.ppd-eco-control.is-selected>i>b{transform:translateX(12px)}.ppd-eco-control{position:relative;height:30px;display:flex;align-items:center;gap:5px;padding:0 4px;color:#7d8794;cursor:pointer;white-space:nowrap;font-size:11px;font-weight:550}.ppd-eco-control.is-selected>i{background:#1d2734}.ppd-generation-cost{height:32px;display:flex;align-items:center;gap:4px;padding:0 2px;color:#6f7782;white-space:nowrap}.ppd-generation-cost>strong{min-width:14px;color:#4d5560;font-size:13px;font-weight:700}.ppd-generate-button{width:34px;height:32px;flex:0 0 34px;border:1px solid transparent;border-radius:7px;background:var(--composer-ink);color:#fff;display:grid;place-items:center;cursor:pointer;transition:transform .18s,background-color .3s}.ppd-generate-button:hover:not(:disabled){transform:translateY(-1px);background:#232832}.ppd-generate-button:disabled{background:var(--composer-soft);color:var(--composer-faint);cursor:not-allowed}.ppd-generate-button .ppd-spinner{width:14px;height:14px}.ppd-composer-meta{min-height:18px;display:flex;align-items:center;flex-wrap:wrap;gap:6px 12px;color:var(--ppd-muted);font-size:11px}.ppd-composer-meta>span+span:before{content:"\xB7";margin-right:12px}.ppd-file-input{display:none}\n.ppd-web-composer .ppd-model-popover,.ppd-web-composer .ppd-settings-popover{top:38px;bottom:auto}\n.ppd-generation-quote{position:sticky;top:0;display:grid;gap:12px;border:1px solid var(--ppd-line);border-radius:16px;background:var(--ppd-bg);padding:18px}.ppd-generation-quote h2{font-size:16px;margin:0}.ppd-generation-quote>strong{font-size:30px;line-height:1}.ppd-generation-quote>span{font-size:13px}.ppd-generation-quote p{margin:0;line-height:1.55}.ppd-generation-state{border-radius:9px;background:var(--ppd-surface);padding:8px 10px;font-weight:650}\n@media(hover:none),(pointer:coarse){.ppd-reference-tray.has-references>.ppd-upload-tile:first-child{position:relative;left:0;top:0;width:56px;height:56px;flex-basis:56px;border:1px dashed #c8cdd5;border-radius:10px;background:#f7f8f9;color:#6f7783;box-shadow:none}.ppd-reference-tray.has-references>.ppd-reference-token,.ppd-reference-tray.has-references>.ppd-reference-token+.ppd-reference-token{margin-left:0;border:0;border-radius:10px;clip-path:none;box-shadow:none;transform:none}.ppd-reference-actions{opacity:1}.ppd-reference-tray.has-references>.ppd-local-upload{display:grid}}\n@media(max-width:1050px){.ppd-generation-grid{grid-template-columns:1fr}.ppd-generation-quote{position:static;max-width:720px}.ppd-web-composer{max-width:none}}\n@media(max-width:720px){.ppd-web-composer{height:auto;min-height:214px}.ppd-composer-media-row{overflow-x:auto}.ppd-composer-toolbar{height:auto;min-height:72px;align-items:stretch;flex-direction:column}.ppd-toolbar-left{flex-wrap:wrap}.ppd-toolbar-right{justify-content:flex-end}.ppd-model-popover{left:0;right:auto;width:min(390px,calc(100vw - 52px))}.ppd-settings-popover{left:auto;right:0;width:min(330px,calc(100vw - 52px))}.ppd-search-chip>span{display:none}}\n@media(max-width:480px){.ppd-skill-token{min-width:138px}.ppd-skill-token strong{max-width:130px}.ppd-model-select strong{max-width:80px}.ppd-eco-control>span{display:none}}\n.ppd-generation-shell.is-inline{position:relative;width:min(720px,100%);margin:0 auto}.ppd-generation-shell.is-floating{position:absolute;z-index:45;left:50%;bottom:18px;width:min(720px,calc(100% - 40px));transform:translateX(-50%)}.ppd-generation-shell.is-floating:before{content:"";position:absolute;z-index:-1;inset:-24px -34px -22px;background:radial-gradient(ellipse at center,rgba(247,248,249,.98) 38%,rgba(247,248,249,.78) 64%,transparent 78%);pointer-events:none}.ppd-generation-shell.is-floating>.ppd-alert,.ppd-generation-shell.is-floating>.ppd-notice{margin:0 0 7px}.ppd-generation-shell.is-collapsed{width:min(620px,calc(100% - 40px))}.ppd-generation-collapsed{width:100%;height:54px;border:1px solid #dde1e6;border-radius:15px;background:rgba(255,255,255,.97);box-shadow:0 15px 45px rgba(23,30,42,.16);padding:0 12px;display:flex;align-items:center;gap:10px;color:#1d222b;text-align:left}.ppd-generation-collapsed>span:nth-child(2){min-width:0;display:grid;flex:1;gap:2px}.ppd-generation-collapsed strong,.ppd-generation-collapsed small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ppd-generation-collapsed strong{font-size:12px}.ppd-generation-collapsed small{color:#8a929e;font-size:9px}.ppd-generation-collapsed>b{color:#596270;font-size:10px}.ppd-composer-actions{position:absolute;z-index:9;top:9px;right:9px;display:flex;gap:2px}.ppd-composer-actions button{width:29px;height:29px;border:0;border-radius:8px;background:transparent;color:#8b929d;display:grid;place-items:center}.ppd-composer-actions button:hover{background:var(--composer-soft);color:#3f4752}.ppd-composer-actions button svg{transform:rotate(-20deg)}.ppd-generation-shell.is-floating .ppd-composer-media-row{padding-right:70px}.ppd-generation-shell.is-inline .ppd-composer-media-row{padding-right:38px}.ppd-generation-shell.is-inline .ppd-model-popover,.ppd-generation-shell.is-inline .ppd-settings-popover{top:38px;bottom:auto}.ppd-generation-shell.is-floating .ppd-model-popover,.ppd-generation-shell.is-floating .ppd-settings-popover{top:auto;bottom:38px}.ppd-generate-button{width:auto;min-width:104px;padding:0 7px 0 11px;display:flex;gap:8px}.ppd-generate-button>span:not(.ppd-spinner){white-space:nowrap;font-size:11px;font-weight:700}.ppd-generation-shell .ppd-composer-meta{display:none}\n@media(max-width:720px){.ppd-generation-shell.is-floating{width:calc(100% - 24px)}.ppd-generation-shell.is-inline{width:100%}}\n\n/* The native resource pages use the same Web dock geometry: a 480\xD740 trigger\n   opens into the 820\xD7200 shell, while the generation page keeps the composer inline. */\n.ppd-generation-shell.is-floating{bottom:76px;width:min(820px,calc(100% - 64px));height:200px;padding:10px;border:1px solid #d8dad5;border-radius:18px;background:rgba(255,255,255,.98);box-shadow:0 22px 64px rgba(16,24,38,.2),0 4px 12px rgba(16,24,38,.08);backdrop-filter:blur(12px);transform-origin:center bottom;animation:ppd-composer-open .28s cubic-bezier(.2,.82,.2,1)}\n@keyframes ppd-composer-open{from{opacity:0;transform:translateX(-50%) scale(.58,.18)}to{opacity:1;transform:translateX(-50%) scale(1)}}\n.ppd-generation-shell.is-floating:before{display:none}.ppd-generation-shell.is-floating .ppd-web-composer{width:100%;max-width:none;border-color:transparent;box-shadow:none}.ppd-generation-shell.is-floating .ppd-composer-actions{right:19px;top:19px}\n.ppd-generation-shell.is-collapsed{bottom:24px;width:min(480px,calc(100% - 40px));height:40px;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;backdrop-filter:none}\n.ppd-generation-collapsed{height:40px;border-color:#d5dbe3;border-radius:16px;padding:4px 5px;gap:9px;box-shadow:0 10px 32px rgba(16,24,38,.18),0 2px 6px rgba(16,24,38,.06)}\n.ppd-collapsed-add,.ppd-collapsed-expand{display:grid;place-items:center;flex:0 0 30px;width:30px;height:30px}.ppd-collapsed-add{color:#485260}.ppd-collapsed-placeholder{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#737b89;font-size:13px;font-weight:500}.ppd-generation-collapsed>small{color:#8a929e;font-size:9px;white-space:nowrap}.ppd-collapsed-expand{border-radius:50%;background:#e9edf2;color:#7d8998;font-size:16px}\n.ppd-generation-shell:is(.is-floating,.is-inline)>.ppd-alert,.ppd-generation-shell:is(.is-floating,.is-inline)>.ppd-notice,.ppd-generation-shell:is(.is-floating,.is-inline) .ppd-form-hint{position:absolute;z-index:3;right:12px;bottom:calc(100% + 8px);left:12px;width:auto;margin:0;border:1px solid rgba(208,214,222,.9);border-radius:999px;background:rgba(255,255,255,.96);box-shadow:0 6px 22px rgba(21,28,39,.1);padding:6px 12px;color:#66707e;font-size:10px;text-align:center}.ppd-generation-shell:is(.is-floating,.is-inline)>.ppd-alert,.ppd-generation-shell:is(.is-floating,.is-inline) .ppd-form-hint{color:#a13e3e}\n@media(max-width:720px){.ppd-generation-shell.is-floating{width:calc(100% - 24px)}.ppd-generation-shell.is-collapsed{width:calc(100% - 24px)}}\n.ppd-generation .ppd-generate-button{background:var(--composer-ink);color:#fff}.ppd-generation .ppd-generate-button>span,.ppd-generation .ppd-generate-button>svg{color:#fff;stroke:currentColor}.ppd-generation .ppd-generate-button:disabled{background:var(--composer-soft);color:var(--composer-faint)}.ppd-generation .ppd-generate-button:disabled>span,.ppd-generation .ppd-generate-button:disabled>svg{color:var(--composer-faint)}\n.ppd-generation .ppd-local-upload{display:none!important}\n\n/* Match Web product-mode selected Skill and empty floating reference tile. */\n.ppd-generation .ppd-skill-token.has-value{background:#eef0f4;color:#252a34}.ppd-generation-shell.is-floating .ppd-reference-tray:not(.has-references)>.ppd-upload-tile{border:0;border-radius:0;background:transparent}\n.ppd-add-menu{position:relative}.ppd-add-menu>summary{list-style:none}.ppd-add-menu>summary::-webkit-details-marker{display:none}.ppd-add-popover{position:absolute;z-index:30;left:0;top:38px;width:160px;padding:5px;border:1px solid var(--composer-line);border-radius:10px;background:#fff;box-shadow:0 8px 24px rgba(20,27,38,.14)}.ppd-generation-shell.is-floating .ppd-add-popover{top:auto;bottom:38px}.ppd-add-popover>label,.ppd-add-popover>button{position:relative;box-sizing:border-box;display:block;width:100%;padding:9px;border:0;border-radius:6px;background:transparent;color:var(--composer-muted);font:inherit;font-size:12px;text-align:left;cursor:pointer}.ppd-add-popover>label:hover,.ppd-add-popover>button:hover{background:var(--composer-soft)}.ppd-add-popover select{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}.ppd-generation .ppd-generate-button{width:34px;min-width:34px;padding:0;justify-content:center}.ppd-generation-cost{margin:0 10px 0 6px}\n\n/* Manual generation history shares the account bar and keeps the draft mounted. */\n.ppd-panel [hidden]{display:none!important}\n.ppd-price-verification{margin:0 12px 10px;color:#866218;font-size:12px;line-height:1.5}\n.ppd-history-shortcut{display:flex;justify-content:flex-end;padding:12px 28px 0}\n.ppd-panel-generation .ppd-content.ppd-history-content{display:block;min-height:0;padding:24px 28px}\n.ppd-history{width:100%;max-width:1120px;margin:0 auto}\n.ppd-history-heading,.ppd-history-record-heading{display:flex;align-items:center;justify-content:space-between;gap:16px}\n.ppd-history-heading{margin-bottom:20px}.ppd-history-heading h2{font-size:20px;margin:0}\n.ppd-history-list{display:grid;gap:16px}.ppd-history-record{padding:20px;border:1px solid #e4e4e2;border-radius:12px;background:#fff}\n.ppd-history-record-heading strong{display:flex;align-items:center;gap:8px}.ppd-history-record-heading>span,.ppd-history-record time,.ppd-history-record>small{color:#73736e;font-size:12px}\n.ppd-history-record time{display:block;margin-top:8px}.ppd-history-record progress{display:block;width:100%;height:6px;margin:16px 0 8px;accent-color:#656c49}\n.ppd-history-results{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-top:16px}.ppd-history-results .ppd-image{aspect-ratio:1;background:#f5f5f3;border-radius:8px;overflow:hidden}.ppd-history-results img{width:100%;height:100%;object-fit:contain}\n@media(max-width:720px){.ppd-history-shortcut{padding-inline:16px}.ppd-panel-generation .ppd-content.ppd-history-content{padding:20px 16px}.ppd-history-heading,.ppd-history-record-heading{flex-wrap:wrap}.ppd-history-results{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}\n\n/* Local reference previews appear before cloud upload; only ready asset IDs can generate. */\n.ppd-upload-preview{clip-path:none!important;transform:none!important;margin-left:0!important;border-radius:10px!important;outline:1px solid #c8cdd5}\n.ppd-upload-preview>img{opacity:.65}\n.ppd-upload-preview.is-failed{outline-color:#a13e3e}\n.ppd-upload-preview .ppd-upload-preview-status{position:absolute;right:0;bottom:0;left:0;padding:4px 1px;background:rgba(24,28,34,.8);color:#fff;font-size:9px;line-height:12px;text-align:center}\n.ppd-upload-preview.is-failed .ppd-upload-preview-status{background:rgba(139,39,39,.9)}\n.ppd-upload-preview-remove{position:absolute;top:1px;right:1px;width:18px;height:18px;padding:0;border:0;border-radius:50%;background:#fff;color:#8b2727;cursor:pointer}\n';

// plugins/podplo-dsh/src/manual-toolbox.css
var manual_toolbox_default = ".ppd-toolbox{position:relative;height:100%;overflow:hidden;padding:18px;box-sizing:border-box;color:var(--text-primary,#292927);background:var(--background,#fff)}\n.ppd-toolbox *{box-sizing:border-box}.ppd-toolbox button{cursor:pointer}.ppd-toolbox button:disabled{cursor:default;opacity:.55}\n.ppd-toolbox button,.ppd-toolbox input,.ppd-toolbox select{font:inherit}\n.ppd-toolbox__header,.ppd-toolbox__result,.ppd-toolbox__exported{display:flex;align-items:center;justify-content:space-between;gap:12px}\n.ppd-toolbox__header h2{margin:0 0 8px;font-size:24px;line-height:1.2}.ppd-toolbox__header p,.ppd-toolbox__output p{margin:4px 0 0;color:#777;font-size:12px;line-height:1.6}\n.ppd-toolbox__upload{position:relative;padding:8px 12px;border:1px solid #ddd;border-radius:10px;cursor:pointer;white-space:nowrap}\n.ppd-toolbox__upload input{position:absolute;inline-size:1px;block-size:1px;opacity:0}\n.ppd-toolbox__tabs{display:grid;gap:14px}.ppd-toolbox__tool-group>div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.ppd-toolbox__tool-group h3{font-size:11px;color:#777;margin:0 0 7px}\n.ppd-toolbox__tabs button{display:flex;flex-direction:column;gap:3px;text-align:left;padding:9px;border:1px solid #ddd;border-radius:11px;background:#fff;color:inherit}\n.ppd-toolbox__tabs button.is-active{border-color:#222;background:#f4f4f1}.ppd-toolbox__tabs small{color:#888;font-size:10px}\n.ppd-toolbox__body{display:grid;height:100%;min-height:0;grid-template-columns:minmax(280px,360px) minmax(0,1fr);gap:20px;align-items:start}.ppd-toolbox__workspace{min-width:0;min-height:0;height:100%;overflow:auto;padding-bottom:48px}\n.ppd-toolbox__parameters{display:grid;align-content:start;gap:12px;min-width:0;min-height:0;height:100%;overflow:auto;padding-right:4px;padding-bottom:48px}.ppd-toolbox__source-list{max-height:160px;overflow:auto}\n.ppd-toolbox__sources,.ppd-toolbox__controls,.ppd-toolbox__preview-panel,.ppd-toolbox__results,.ppd-toolbox__output{min-width:0;border:1px solid #e4e4df;border-radius:14px;padding:14px;background:#fff}\n.ppd-toolbox__controls fieldset{border:0;min-width:0;padding:0;margin:0}\n.ppd-toolbox h3{margin:0 0 11px;font-size:14px}.ppd-toolbox__source{display:flex;gap:9px;padding:8px 0;border-bottom:1px solid #eee}\n.ppd-toolbox__source span,.ppd-toolbox__result span,.ppd-toolbox__exported span{display:flex;min-width:0;flex-direction:column;gap:3px}.ppd-toolbox__source b,.ppd-toolbox__result b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}\n.ppd-toolbox__source small,.ppd-toolbox__result small,.ppd-toolbox__exported small{color:#888;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.ppd-toolbox__fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 9px}.ppd-toolbox__fields label{display:flex;min-width:0;flex-direction:column;gap:5px;font-size:12px;color:#666}\n.ppd-toolbox__fields input,.ppd-toolbox__fields select,.ppd-toolbox__directory>input{min-width:0;padding:7px;border:1px solid #ddd;border-radius:8px;background:#fff;color:#292927}\n.ppd-toolbox__edge-group{grid-column:1/-1;display:grid;gap:10px;border-top:1px solid #eee;padding-top:12px}.ppd-toolbox__edge-group h4{font-size:12px;margin:0;color:#333}\n.ppd-toolbox__range-field{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px 10px;align-items:center}.ppd-toolbox__range-field label{display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:10px}.ppd-toolbox__range-field input[type=number]{width:88px}.ppd-toolbox__range-field output{min-width:64px;text-align:right;font-size:12px;color:#444;font-variant-numeric:tabular-nums}\n.ppd-toolbox__fields .ppd-toolbox__range-field input[type=range]{grid-column:1/-1;width:100%;height:20px;margin:0;padding:0;border:0;background:transparent;accent-color:#333;cursor:ew-resize}.ppd-toolbox__pixel-basis{grid-column:1/-1;margin:0;font-size:11px;line-height:1.5;color:#777}\n.ppd-toolbox__fields .ppd-toolbox__check{flex-direction:row;align-items:center;grid-column:1/-1}.ppd-toolbox .ppd-toolbox__primary{margin-top:16px;width:100%;padding:11px 13px;border:0;border-radius:10px;background:#20201f;color:#fff}\n.ppd-toolbox__preview-heading{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.ppd-toolbox__preview-heading>span{font-size:12px;color:#777}\n.ppd-toolbox__preview-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px}.ppd-toolbox__preview-toolbar .ppd-toolbox__upload{margin-left:auto}.ppd-toolbox__preview-tabs{display:flex;gap:6px}.ppd-toolbox__preview-tabs button{border:1px solid #ddd;border-radius:7px;background:#fff;color:inherit;padding:6px 14px}.ppd-toolbox__preview-tabs button[aria-pressed=true]{background:#292927;color:#fff;border-color:#292927}\n.ppd-toolbox__previews figure{margin:0;min-width:0}.ppd-toolbox__previews figcaption{position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%)}\n.ppd-toolbox__previews img,.ppd-toolbox__preview-empty{display:block;width:100%;height:clamp(300px,52vh,620px);object-fit:contain;border-radius:9px;background:conic-gradient(#eee 25%,#fafafa 0 50%,#eee 0 75%,#fafafa 0) 0 0/16px 16px}\n.ppd-toolbox__preview-empty{display:grid;place-items:center;color:#777;font-size:12px;text-align:center}.ppd-toolbox__previews small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:9px;color:#666;font-size:12px}\n.ppd-toolbox__preview-note{font-size:12px;color:#666;line-height:1.5;margin:12px 0 0}.ppd-toolbox__preview-error{color:#9d2c23;font-size:12px;line-height:1.5;margin:12px 0 0}\n.ppd-toolbox__preview-files{margin:12px 0 0;padding-left:18px;font-size:12px;overflow-wrap:anywhere}.ppd-toolbox__preview-files li+li{margin-top:8px}.ppd-toolbox__preview-files small{display:block;color:#666;margin-top:3px}\n.ppd-toolbox__results,.ppd-toolbox__output{margin-top:14px}.ppd-toolbox__result{padding:8px 0;border-bottom:1px solid #eee}.ppd-toolbox__result>div{display:flex;gap:6px}.ppd-toolbox__result button,.ppd-toolbox__output button{padding:6px 8px;border:1px solid #ddd;border-radius:8px;background:#fafafa;color:inherit}\n.ppd-toolbox__result>span{flex:1}.ppd-toolbox__result-thumbnail{width:56px;height:56px;object-fit:contain;border-radius:6px;background:conic-gradient(#eee 25%,#fafafa 0 50%,#eee 0 75%,#fafafa 0) 0 0/12px 12px;flex-shrink:0}\n.ppd-toolbox__directory{display:grid;grid-template-columns:minmax(240px,1fr) auto auto;gap:8px;align-items:center;margin-top:10px}.ppd-toolbox__directory label{grid-column:1/-1;font-size:11px;color:#666}.ppd-toolbox__output code{display:block;margin-top:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px;color:#666}\n.ppd-toolbox__exported{margin-top:10px;padding:9px;background:#f6f6f3;border-radius:10px}.ppd-toolbox__notice,.ppd-toolbox__error{position:absolute;left:18px;right:18px;bottom:8px;margin:0;z-index:2;padding:9px 11px;border-radius:9px;font-size:12px}.ppd-toolbox__notice{background:#e9f6ee;color:#246c3b}.ppd-toolbox__error{background:#fff0ef;color:#9d2c23}.ppd-toolbox__empty{color:#999;font-size:11px}\n@media(max-width:900px){.ppd-toolbox__body{grid-template-columns:minmax(230px,290px) minmax(0,1fr);gap:14px}.ppd-toolbox__directory{grid-template-columns:1fr}.ppd-toolbox__result{align-items:flex-start;flex-wrap:wrap}}\n@media(max-width:620px){.ppd-toolbox{padding:12px;overflow:auto}.ppd-toolbox__header{align-items:flex-start;flex-wrap:wrap}.ppd-toolbox__body{height:auto;grid-template-columns:1fr}.ppd-toolbox__parameters,.ppd-toolbox__workspace{height:auto;overflow:visible;padding:0}.ppd-toolbox__directory{grid-template-columns:1fr}.ppd-toolbox__directory label{grid-column:auto}.ppd-toolbox__preview-tabs button{flex:1}.ppd-toolbox__previews img,.ppd-toolbox__preview-empty{height:320px}.ppd-toolbox__notice,.ppd-toolbox__error{position:sticky;left:auto;right:auto;margin-top:12px}}\n\n/* Vertical independent modules; only the left pane scrolls while adjusting parameters. */\n.ppd-toolbox__modules{min-width:0}.ppd-toolbox__module{padding:16px 0;border-top:1px solid #e4e4df}\n.ppd-toolbox__module h3{margin:0 0 14px;font-size:16px}.ppd-toolbox__module h3 label{display:flex;align-items:center;gap:10px;cursor:pointer}\n.ppd-toolbox__module h3 input{width:17px;height:17px;margin:0;accent-color:#292927}\n.ppd-toolbox__module fieldset{border:0;min-width:0;margin:0;padding:0}\n.ppd-toolbox__save-bar{position:sticky;bottom:-48px;background:#fff;padding:8px 0 14px;margin-top:0;z-index:1}\n.ppd-toolbox__save-bar .ppd-toolbox__primary{margin-top:0}.ppd-toolbox__save-bar>small{display:block;margin-top:8px;color:#888;font-size:11px;line-height:1.5}\n.ppd-toolbox__actions{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px}\n.ppd-toolbox__actions>button{padding:10px 13px;border:1px solid #ddd;border-radius:10px;background:#fff;color:inherit}\n.ppd-toolbox__actions>button:last-child{grid-column:1/-1}\n.ppd-toolbox__preview-tabs{flex-wrap:wrap}.ppd-toolbox__result-name{display:flex;flex:1;min-width:0;text-align:left;flex-direction:column;gap:4px;background:none!important;border:0!important}\n@media(max-width:620px){.ppd-toolbox__save-bar{position:static}.ppd-toolbox__module{padding:14px 0}}\n\n/* Bound the toolbox to the native DSH panel, including its account header. */\n.ppd-panel-toolbox{height:100%;min-height:0}\n.ppd-panel-toolbox .ppd-panel-scroll{display:flex;flex-direction:column;min-height:0;overflow:hidden}\n.ppd-panel-toolbox .ppd-account{flex:0 0 auto}\n.ppd-panel-toolbox .ppd-content{flex:1 1 0;min-height:0;width:100%;max-width:none;margin:0;padding:0;overflow:hidden}\n";

// plugins/podplo-dsh/src/workspace.css
var workspace_default = '.ppd-workspace{width:100%;height:100%;min-width:0;min-height:0;overflow:hidden;background:#fff;color:#252522;font:13px/1.45 ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.ppd-workspace *{box-sizing:border-box}.ppd-workspace-main{position:relative;width:100%;height:100%;min-width:0;min-height:0;overflow:hidden}.ppd-panel{position:relative!important;overflow:hidden!important}.ppd-panel-scroll{width:100%;height:100%;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain}.ppd-panel-gallery .ppd-content,.ppd-panel-assets .ppd-content,.ppd-panel-skills .ppd-content{padding-bottom:170px}.ppd-resource-actions{display:flex;justify-content:flex-end;margin-bottom:12px}\n.ppd-panel-generation .ppd-panel-scroll{display:flex;flex-direction:column}.ppd-panel-generation .ppd-content{display:grid;flex:1;place-items:center;width:100%;min-height:178px;padding-block:28px}\n\n/* DSH 0.2.2-rc.1 exposes flat panel rows. Markers scope this adapter to the\n   native panel nav without depending on generated class names or locale text. */\nnav:has(.ppd-sidebar-root-marker) button:has(.ppd-sidebar-child-marker){min-height:32px;padding-block:5px;padding-inline-start:calc(var(--dsh-sidebar-row-padding,12px) + 20px);font-size:13px}\nnav:has(.ppd-sidebar-root-marker) button:has(.ppd-sidebar-child-marker[data-podplo-sidebar-visible="false"]),nav:has(.ppd-sidebar-root-marker) button:has(.ppd-sidebar-child-marker[data-podplo-sidebar-wide="false"]){display:none!important}\nnav:has(.ppd-sidebar-root-marker) button:has(.ppd-sidebar-root-marker[data-podplo-sidebar-wide="true"])::after{content:"";width:6px;height:6px;margin-inline-start:auto;border-inline-end:1.5px solid currentColor;border-block-end:1.5px solid currentColor;transform:rotate(-45deg);transition:transform .15s ease}\nnav:has(.ppd-sidebar-root-marker) button[aria-expanded="true"]:has(.ppd-sidebar-root-marker[data-podplo-sidebar-wide="true"])::after{transform:rotate(45deg)}\n.ppd-sidebar-root-marker,.ppd-sidebar-child-marker{display:inline-flex;align-items:center;justify-content:center;width:100%;height:100%}.ppd-sidebar-child-marker{color:color-mix(in srgb,currentColor 76%,transparent)}\n@media(max-width:720px){.ppd-panel-gallery .ppd-content,.ppd-panel-assets .ppd-content,.ppd-panel-skills .ppd-content{padding-bottom:240px}}\n';

// plugins/podplo-dsh/src/chat-generation-approval.css
var chat_generation_approval_default = '.ppd-chat-tasks{display:grid;gap:6px;width:min(720px,calc(100% - 16px));margin:0 auto 7px;color:#292925;font:12px/1.4 ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}\n.ppd-chat-task-toolbar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}\n.ppd-chat-tasks button{flex:0 0 auto;padding:4px 8px;border:1px solid #deded8;border-radius:6px;background:#fff;color:inherit;font:inherit;cursor:pointer}\n.ppd-chat-tasks button:disabled{opacity:.52;cursor:not-allowed}.ppd-chat-tasks button:focus-visible{outline:2px solid currentColor;outline-offset:2px}\n.ppd-chat-task-toolbar button{border:0;padding:2px 0;background:transparent;color:#696963}\n.ppd-chat-task-toolbar [data-podplo-task-details]{flex:1 1 auto;min-width:0;min-height:28px;text-align:left;white-space:normal}\n.ppd-chat-task-content{min-height:0;max-height:min(340px,35vh);overflow:auto;overscroll-behavior:contain}\n.ppd-chat-task-content[data-details-expanded=true] .ppd-chat-task-list{max-height:none;overflow:visible}\n.ppd-chat-task-list{display:grid;gap:6px;max-height:240px;overflow:auto;overscroll-behavior:contain}.ppd-chat-task-list[data-podplo-task-view=details]{max-height:340px}\n.ppd-chat-task-list>article{display:grid;gap:6px;padding:7px 10px;border:1px solid #deded8;border-radius:9px;background:#fafaf8;min-width:0}\n.ppd-chat-task-heading{display:flex;align-items:center;gap:8px;min-width:0}\n.ppd-chat-tasks .ppd-chat-task-toggle{display:flex;align-items:center;gap:7px;flex:1 1 auto;min-width:0;padding:2px 0;border:0;background:transparent;text-align:left}\n.ppd-chat-task-summary{display:flex;align-items:baseline;gap:10px;min-width:0;white-space:nowrap}.ppd-chat-task-summary strong{flex:0 0 auto;font-size:12px}.ppd-chat-task-summary>span{min-width:0;overflow:hidden;text-overflow:ellipsis;color:#696963}\n.ppd-chat-tasks .ppd-chat-confirm{min-height:32px;padding:6px 12px;border-color:#252522;border-radius:8px;background:#252522;color:#fff;font-weight:600}.ppd-chat-confirm:hover:not(:disabled){background:#000}\n.ppd-chat-tasks .ppd-chat-task-remove{border:0;padding:2px 5px;background:transparent;color:#696963;font-size:18px;line-height:1}\n.ppd-chat-task-body{padding:2px 0 3px 16px;min-width:0}.ppd-chat-task-body>div{display:grid;gap:5px}.ppd-chat-tasks small{display:block;color:#925044;overflow-wrap:anywhere}\n.ppd-chat-approval-receipt{padding:3px 0;color:#3f6748}.ppd-chat-tasks>p{margin:0;color:#925044}\n@media(max-width:620px){.ppd-chat-tasks{width:calc(100% - 12px)}.ppd-chat-task-summary{gap:5px}.ppd-chat-task-list>article{padding:6px 8px}.ppd-chat-task-heading{gap:5px}.ppd-chat-tasks .ppd-chat-confirm{padding:5px 8px}.ppd-chat-approval .ppd-chat-task-summary{display:grid;gap:1px}.ppd-chat-approval .ppd-chat-task-summary>span{font-size:11px}}\n';

// plugins/podplo-dsh/src/chat-generation-progress.css
var chat_generation_progress_default = ".ppd-chat-progress-details{display:grid;gap:6px;min-width:0}.ppd-chat-progress-details>span{color:#696963}.ppd-chat-progress-details progress{width:100%;height:6px;accent-color:#6b826d}.ppd-chat-progress-details ol{display:grid;gap:5px;margin:7px 0;padding:0;list-style:none;font-size:11px}.ppd-chat-progress-details li{display:flex;flex-wrap:wrap;gap:5px 12px;justify-content:space-between;overflow-wrap:anywhere}.ppd-chat-progress-details li small{width:100%;color:#925044}.ppd-chat-progress-actions{display:flex;flex-wrap:wrap;gap:8px}\n";

// plugins/podplo-dsh/src/client.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var inject = ["slots", "connection", "layout", "uiWorkspace", "sessions"];
var sectionLabels = { generation: "\u751F\u56FE", gallery: "\u56FE\u5E93", skills: "Skill \u5E93", assets: "\u6211\u7684\u7D20\u6750", results: "\u5904\u7406\u7ED3\u679C", toolbox: "\u5DE5\u5177\u7BB1" };
var referenceText = (selection) => `
\u5DF2\u9009\u62E9 PodPlo ${selection.kind === "skill" ? "Skill" : "\u7D20\u6750"}\uFF1A${selection.label ?? selection.id}
PodPlo \u5F15\u7528\uFF1A${JSON.stringify(selection)}
`;
function createSidebarDisclosure() {
  let expanded = readPodploNavigationPreferences().sidebarExpanded;
  const listeners2 = /* @__PURE__ */ new Set();
  const setExpanded = (next) => {
    if (expanded === next) return;
    expanded = next;
    const preferences = readPodploNavigationPreferences();
    writePodploNavigationPreferences({ ...preferences, sidebarExpanded: next });
    for (const listener of listeners2) listener();
  };
  return {
    getSnapshot: () => expanded,
    subscribe(listener) {
      listeners2.add(listener);
      return () => listeners2.delete(listener);
    },
    toggle() {
      setExpanded(!expanded);
    }
  };
}
function apply(ctx) {
  try {
    return mount(ctx);
  } catch (error) {
    console.error("PodPlo native panel registration failed:", error instanceof Error ? error.message : "unknown");
    throw error;
  }
}
function mount(ctx) {
  let lastSessionId;
  const queued = /* @__PURE__ */ new Map();
  const navigator = createPodploNavigator(readPodploNavigationPreferences().lastSection);
  const sessionStore = createPodploSessionStore();
  const sidebarDisclosure = createSidebarDisclosure();
  let disposed = false;
  const request = async (action, args, sessionId = lastSessionId) => {
    if (action === "archive.navigate") {
      const taskId = args?.taskId;
      if (typeof taskId !== "string") throw new Error("\u4EFB\u52A1\u6210\u679C\u7F16\u53F7\u65E0\u6548");
      archiveTarget.open(taskId);
      navigator.navigate("results");
      ctx.layout.selectPanel("podplo-results");
      return { ok: true, data: { opened: true } };
    }
    if (action === "assets.upload") {
      const snapshot = await request("snapshot", {}, sessionId);
      if (disposed) throw new Error("PodPlo \u63D2\u4EF6\u5DF2\u505C\u7528");
      const ownerId = snapshot?.data?.account?.userId;
      if (typeof ownerId !== "string" || !ownerId) throw new Error("\u8BF7\u5148\u767B\u5F55 PodPlo\u3002");
      const value = await uploadReferenceFile(args.file, ownerId, sessionId);
      if (disposed) throw new Error("PodPlo \u63D2\u4EF6\u5DF2\u505C\u7528");
      return value;
    }
    if (action === "logout") generationBootstrapCache.clear();
    const targetSessionId = action.startsWith("toolbox.") && action !== "toolbox.use" ? void 0 : sessionId;
    const result = await ctx.connection.rpc.call("/api", "podplo/request", { action, args: args ?? {}, ...targetSessionId ? { sessionId: targetSessionId } : {} });
    if (disposed) throw new Error("PodPlo \u63D2\u4EF6\u5DF2\u505C\u7528");
    if (!result.ok) throw Object.assign(new Error(result.error.message), { code: result.error.code });
    if (action === "snapshot" && !result.value?.data?.account?.userId) generationBootstrapCache.clear();
    return result.value;
  };
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.podplo = "native";
    style.textContent = `${style_default}
${generation_panel_default}
${manual_toolbox_default}
${workspace_default}
${chat_generation_approval_default}
${chat_generation_progress_default}`;
    document.head.appendChild(style);
    return () => {
      disposed = true;
      queued.clear();
      generationBootstrapCache.clear();
      style.remove();
    };
  });
  const onUse = async (selection) => {
    if (!lastSessionId) {
      await ctx.uiWorkspace.startSession(void 0, { prompt: referenceText(selection), whenDraftExists: "append" });
      ctx.layout.selectPanel(null);
      return;
    }
    const target2 = lastSessionId;
    queued.set(target2, [...queued.get(target2) ?? [], selection]);
    ctx.uiWorkspace.openSession(target2);
    ctx.layout.selectPanel(null);
  };
  function Icon2({ size = 16 }) {
    const expanded = (0, import_react9.useSyncExternalStore)(sidebarDisclosure.subscribe, sidebarDisclosure.getSnapshot, sidebarDisclosure.getSnapshot);
    const marker = (0, import_react9.useRef)(null);
    (0, import_react9.useEffect)(() => {
      const button = marker.current?.closest("button");
      if (!button) return;
      button.setAttribute("aria-expanded", String(expanded));
      const toggle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        sidebarDisclosure.toggle();
      };
      button.addEventListener("click", toggle, { capture: true });
      return () => {
        button.removeEventListener("click", toggle, { capture: true });
        button.removeAttribute("aria-expanded");
      };
    }, [expanded]);
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { ref: marker, className: "ppd-sidebar-root-marker ppd-sidebar-nav", "data-podplo-sidebar-root": true, "data-podplo-sidebar-expanded": expanded, "data-podplo-sidebar-wide": size === 16, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M5 4.5h8.2a5.8 5.8 0 0 1 0 11.6H9v3.4H5z" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M9 8v4.6h4a2.3 2.3 0 0 0 0-4.6z" })
    ] }) });
  }
  function SectionIcon({ section, size = 16 }) {
    const expanded = (0, import_react9.useSyncExternalStore)(sidebarDisclosure.subscribe, sidebarDisclosure.getSnapshot, sidebarDisclosure.getSnapshot);
    const paths = {
      generation: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" }),
      gallery: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { x: "4", y: "5", width: "16", height: "14", rx: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "m7 16 3.5-4 2.5 2 2-2 2 4" })
      ] }),
      skills: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M12 3 4.5 8 12 13l7.5-5z" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "m6.5 11.5-2 1.5 7.5 5 7.5-5-2-1.5" })
      ] }),
      assets: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M4 7h6l2 2h8v10H4z" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M4 7V5h6l2 2" })
      ] }),
      results: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "m8 12 3 3 5-6" })
      ] }),
      toolbox: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M4 7h16M4 17h16" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { cx: "9", cy: "7", r: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("circle", { cx: "15", cy: "17", r: "2" })
      ] })
    };
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "span",
      {
        className: "ppd-sidebar-child-marker ppd-sidebar-nav",
        "data-podplo-sidebar-section": section,
        "data-podplo-nav-section": section,
        "data-podplo-sidebar-visible": expanded,
        "data-podplo-sidebar-wide": size === 16,
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: paths[section] })
      }
    );
  }
  function NativeWorkspace() {
    const nativeSessionId = (0, import_react9.useSyncExternalStore)(sessionStore.subscribe, sessionStore.getSnapshot, sessionStore.getSnapshot);
    const panelRequest = (action, args) => request(action, args, nativeSessionId ?? "");
    const composerRequest = (action, args) => request(
      action,
      action === "generation.prepare" ? { ...args, archiveSessionId: nativeSessionId } : args,
      ""
    );
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      PodploWorkspace,
      {
        request: panelRequest,
        composerRequest,
        onUse,
        nativeSessionId,
        navigator,
        onCloseNative: () => ctx.layout.selectPanel(null),
        onSelectSection: (section) => ctx.layout.selectPanel(`podplo-${section}`)
      },
      nativeSessionId ?? "draft"
    );
  }
  ctx.slots.inject("main", () => ctx.slots.register({ name: "main", id: "podplo", key: "podplo" }, NativeWorkspace));
  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({ name: "sidebar.panellist", id: "podplo", order: 30, label: "PodPlo" }, Icon2));
  for (const [index, section] of PODPLO_SECTIONS.entries()) {
    let SectionWorkspace2 = function() {
      (0, import_react9.useEffect)(() => {
        navigator.navigate(section);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(NativeWorkspace, {});
    }, NativeSectionIcon2 = function({ size = 16 }) {
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(SectionIcon, { section, size });
    };
    var SectionWorkspace = SectionWorkspace2, NativeSectionIcon = NativeSectionIcon2;
    const id = `podplo-${section}`;
    ctx.slots.inject("main", () => ctx.slots.register({ name: "main", id, key: id }, SectionWorkspace2));
    if (section !== "generation") ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({ name: "sidebar.panellist", id, order: 30 + (index + 1) / 10, label: sectionLabels[section] }, NativeSectionIcon2));
  }
  function ComposerBridge({ sessionId, inputActions }) {
    const [notice, setNotice] = (0, import_react9.useState)("");
    const chatRequest = (0, import_react9.useCallback)((action, args) => request(action, args, sessionId), [sessionId]);
    (0, import_react9.useEffect)(() => {
      lastSessionId = sessionId;
      sessionStore.set(sessionId);
      if (!sessionId) return;
      let alive = true;
      if (!inputActions) return () => {
        alive = false;
      };
      const consume = async () => {
        const values = queued.get(sessionId);
        if (!values?.length) return;
        const result = await request("snapshot", {}, sessionId);
        if (!alive) return;
        const owner = result.data.account.userId;
        if (values.some((value) => value.private && value.ownerId !== owner)) {
          queued.delete(sessionId);
          setNotice("\u8D26\u53F7\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u7D20\u6750\u3002");
          return;
        }
        const span = inputActions.captureInsertion();
        if (!inputActions.insertText(values.map(referenceText).join(""), span)) {
          setNotice("\u8349\u7A3F\u6B63\u5728\u53D8\u5316\uFF0C\u7D20\u6750\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u518D\u6B21\u6253\u5F00\u6B64\u4F1A\u8BDD\u540E\u91CD\u8BD5\u3002");
          return;
        }
        inputActions.persistDraft();
        queued.delete(sessionId);
        setNotice("\u5DF2\u5C06\u7D20\u6750\u5F15\u7528\u52A0\u5165\u5F53\u524D\u8349\u7A3F\u3002");
      };
      void consume().catch(() => {
        if (alive) setNotice("\u7D20\u6750\u5C1A\u672A\u52A0\u5165\uFF0C\u8BF7\u68C0\u67E5 PodPlo \u8FDE\u63A5\u540E\u91CD\u8BD5\u3002");
      });
      return () => {
        alive = false;
      };
    }, [sessionId, inputActions]);
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ChatGenerationTasks, { request: chatRequest, sessionId }, sessionId ?? "draft"),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "ppd-visually-hidden ppd-native-composer", role: "status", "data-podplo-session": sessionId, children: notice })
    ] });
  }
  ctx.slots.inject("conversation.input.dock", () => ctx.slots.register({ name: "conversation.input.dock", id: "podplo-selection-bridge", order: 30 }, ComposerBridge));
}
return module.exports;} catch(error) { console.error('PodPlo client module failed:', error); throw error; }}});
