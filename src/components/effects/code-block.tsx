"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Token = { type: string; value: string };

/* One Dark-inspired palette, applied on an always-dark code surface. */
const COLOR: Record<string, string> = {
  comment: "#5c6370",
  string: "#98c379",
  atrule: "#c678dd",
  number: "#d19a66",
  property: "#56b6c2",
  tag: "#e06c75",
  attr: "#d19a66",
  punctuation: "#9aa0ac",
  plain: "#abb2bf",
};

const CSS_RE = new RegExp(
  [
    "(\\/\\*[\\s\\S]*?\\*\\/)", // 1 comment
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')", // 2 string
    "(@[\\w-]+)", // 3 atrule / keyframes name
    "(#[0-9a-fA-F]{3,8}\\b)", // 4 hex color
    "(-?\\d*\\.?\\d+(?:px|rem|em|%|vh|vw|vmin|vmax|s|ms|deg|fr|ch|ex|cm|mm|in|pt|pc|turn)?)", // 5 number + optional unit
    "(?<=(?:^|[;{])\\s*)[\\w-]+(?=\\s*:)", // 6 property (line/block scoped)
    "([{};:,()])", // 7 punctuation
  ].join("|"),
  "gm"
);

const HTML_RE = new RegExp(
  [
    "(<!--[\\s\\S]*?-->)", // 1 comment
    "(<\\/?[a-zA-Z][\\w-]*)", // 2 tag token like <button or </button
    "([\\w-]+(?==))", // 3 attribute name
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')", // 4 string
    "(\\/?>|=)", // 5 closing bracket or =
  ].join("|"),
  "g"
);

function tokenize(code: string, regex: RegExp, classify: (m: RegExpExecArray) => string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  regex.lastIndex = 0;
  while ((m = regex.exec(code)) !== null) {
    if (m.index > last) {
      tokens.push({ type: "plain", value: code.slice(last, m.index) });
    }
    tokens.push({ type: classify(m), value: m[0] });
    last = m.index + m[0].length;
    if (m[0] === "") regex.lastIndex++; // guard against zero-width loops
  }
  if (last < code.length) {
    tokens.push({ type: "plain", value: code.slice(last) });
  }
  return tokens;
}

function classifyCss(m: RegExpExecArray): string {
  if (m[1] !== undefined) return "comment";
  if (m[2] !== undefined) return "string";
  if (m[3] !== undefined) return "atrule";
  if (m[4] !== undefined) return "number";
  if (m[5] !== undefined) return "number";
  if (m[6] !== undefined) return "property";
  if (m[7] !== undefined) return "punctuation";
  return "plain";
}

function classifyHtml(m: RegExpExecArray): string {
  if (m[1] !== undefined) return "comment";
  if (m[2] !== undefined) return "tag";
  if (m[3] !== undefined) return "attr";
  if (m[4] !== undefined) return "string";
  if (m[5] !== undefined) return "punctuation";
  return "plain";
}

export function highlight(code: string, lang: "css" | "html"): Token[] {
  if (lang === "css") return tokenize(code, CSS_RE, classifyCss);
  return tokenize(code, HTML_RE, classifyHtml);
}

interface CodeBlockProps {
  code: string;
  language: "css" | "html";
  /** Optional max height in px before vertical scroll appears. */
  maxHeight?: number;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  maxHeight = 360,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const tokens = React.useMemo(() => highlight(code, language), [code, language]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for environments without the async clipboard API.
      const el = document.createElement("textarea");
      el.value = code;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* no-op */
      }
      document.body.removeChild(el);
    }
  }

  return (
    <div
      className={cn(
        "group min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[#282c34]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          {language === "css" ? "style.css" : "index.html"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium transition-colors",
            copied
              ? "text-emerald-400"
              : "text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
          )}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        className="fx-code-pre m-0 overflow-auto p-4 text-[13px] leading-relaxed whitespace-pre-wrap break-words"
        style={{ maxHeight }}
      >
        <code className="font-mono">
          {tokens.map((t, i) => (
            <span
              key={i}
              style={{
                color: COLOR[t.type] ?? COLOR.plain,
                fontStyle: t.type === "comment" ? "italic" : undefined,
              }}
            >
              {t.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
