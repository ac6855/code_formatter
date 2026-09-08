var PrettierExtra = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/prettier/standalone.js
  var require_standalone = __commonJS({
    "node_modules/prettier/standalone.js"(exports, module) {
      (function(t) {
        function e() {
          var o = t();
          return o.default || o;
        }
        if (typeof exports == "object" && typeof module == "object") module.exports = e();
        else if (typeof define == "function" && define.amd) define(e);
        else {
          var f = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : this || {};
          f.prettier = e();
        }
      })(function() {
        "use strict";
        var yt2 = Object.defineProperty;
        var Ru2 = Object.getOwnPropertyDescriptor;
        var vu2 = Object.getOwnPropertyNames;
        var Lu2 = Object.prototype.hasOwnProperty;
        var At2 = (t, e) => {
          for (var r in e) yt2(t, r, { get: e[r], enumerable: true });
        }, Mu2 = (t, e, r, n) => {
          if (e && typeof e == "object" || typeof e == "function") for (let u of vu2(e)) !Lu2.call(t, u) && u !== r && yt2(t, u, { get: () => e[u], enumerable: !(n = Ru2(e, u)) || n.enumerable });
          return t;
        };
        var Yu2 = (t) => Mu2(yt2({}, "__esModule", { value: true }), t);
        var Ji = {};
        At2(Ji, { __debug: () => Hi, check: () => Gi, doc: () => cr2, format: () => Su2, formatWithCursor: () => Pu2, getSupportInfo: () => Ki, util: () => lr, version: () => _u2 });
        var X2 = (t, e) => (r, n, ...u) => r | 1 && n == null ? void 0 : (e.call(n) ?? n[t]).apply(n, u);
        var ju2 = String.prototype.replaceAll ?? function(t, e) {
          return t.global ? this.replace(t, e) : this.split(t).join(e);
        }, Uu2 = X2("replaceAll", function() {
          if (typeof this == "string") return ju2;
        }), ne2 = Uu2;
        var Ne2 = class {
          diff(e, r, n = {}) {
            let u;
            typeof n == "function" ? (u = n, n = {}) : "callback" in n && (u = n.callback);
            let o = this.castInput(e, n), i = this.castInput(r, n), D = this.removeEmpty(this.tokenize(o, n)), s = this.removeEmpty(this.tokenize(i, n));
            return this.diffWithOptionsObj(D, s, n, u);
          }
          diffWithOptionsObj(e, r, n, u) {
            var o;
            let i = (C) => {
              if (C = this.postProcess(C, n), u) {
                setTimeout(function() {
                  u(C);
                }, 0);
                return;
              } else return C;
            }, D = r.length, s = e.length, a = 1, c = D + s;
            n.maxEditLength != null && (c = Math.min(c, n.maxEditLength));
            let p = (o = n.timeout) !== null && o !== void 0 ? o : 1 / 0, l = Date.now() + p, m = [{ oldPos: -1, lastComponent: void 0 }], f = this.extractCommon(m[0], r, e, 0, n);
            if (m[0].oldPos + 1 >= s && f + 1 >= D) return i(this.buildValues(m[0].lastComponent, r, e));
            let F = -1 / 0, d = 1 / 0, E = () => {
              for (let C = Math.max(F, -a); C <= Math.min(d, a); C += 2) {
                let h, _ = m[C - 1], P = m[C + 1];
                _ && (m[C - 1] = void 0);
                let A = false;
                if (P) {
                  let J = P.oldPos - C;
                  A = P && 0 <= J && J < D;
                }
                let B = _ && _.oldPos + 1 < s;
                if (!A && !B) {
                  m[C] = void 0;
                  continue;
                }
                if (!B || A && _.oldPos < P.oldPos ? h = this.addToPath(P, true, false, 0, n) : h = this.addToPath(_, false, true, 1, n), f = this.extractCommon(h, r, e, C, n), h.oldPos + 1 >= s && f + 1 >= D) return i(this.buildValues(h.lastComponent, r, e)) || true;
                m[C] = h, h.oldPos + 1 >= s && (d = Math.min(d, C - 1)), f + 1 >= D && (F = Math.max(F, C + 1));
              }
              a++;
            };
            if (u) (function C() {
              setTimeout(function() {
                if (a > c || Date.now() > l) return u(void 0);
                E() || C();
              }, 0);
            })();
            else for (; a <= c && Date.now() <= l; ) {
              let C = E();
              if (C) return C;
            }
          }
          addToPath(e, r, n, u, o) {
            let i = e.lastComponent;
            return i && !o.oneChangePerToken && i.added === r && i.removed === n ? { oldPos: e.oldPos + u, lastComponent: { count: i.count + 1, added: r, removed: n, previousComponent: i.previousComponent } } : { oldPos: e.oldPos + u, lastComponent: { count: 1, added: r, removed: n, previousComponent: i } };
          }
          extractCommon(e, r, n, u, o) {
            let i = r.length, D = n.length, s = e.oldPos, a = s - u, c = 0;
            for (; a + 1 < i && s + 1 < D && this.equals(n[s + 1], r[a + 1], o); ) a++, s++, c++, o.oneChangePerToken && (e.lastComponent = { count: 1, previousComponent: e.lastComponent, added: false, removed: false });
            return c && !o.oneChangePerToken && (e.lastComponent = { count: c, previousComponent: e.lastComponent, added: false, removed: false }), e.oldPos = s, a;
          }
          equals(e, r, n) {
            return n.comparator ? n.comparator(e, r) : e === r || !!n.ignoreCase && e.toLowerCase() === r.toLowerCase();
          }
          removeEmpty(e) {
            let r = [];
            for (let n = 0; n < e.length; n++) e[n] && r.push(e[n]);
            return r;
          }
          castInput(e, r) {
            return e;
          }
          tokenize(e, r) {
            return Array.from(e);
          }
          join(e) {
            return e.join("");
          }
          postProcess(e, r) {
            return e;
          }
          get useLongestToken() {
            return false;
          }
          buildValues(e, r, n) {
            let u = [], o;
            for (; e; ) u.push(e), o = e.previousComponent, delete e.previousComponent, e = o;
            u.reverse();
            let i = u.length, D = 0, s = 0, a = 0;
            for (; D < i; D++) {
              let c = u[D];
              if (c.removed) c.value = this.join(n.slice(a, a + c.count)), a += c.count;
              else {
                if (!c.added && this.useLongestToken) {
                  let p = r.slice(s, s + c.count);
                  p = p.map(function(l, m) {
                    let f = n[a + m];
                    return f.length > l.length ? f : l;
                  }), c.value = this.join(p);
                } else c.value = this.join(r.slice(s, s + c.count));
                s += c.count, c.added || (a += c.count);
              }
            }
            return u;
          }
        };
        var xt2 = class extends Ne2 {
          tokenize(e) {
            return e.slice();
          }
          join(e) {
            return e;
          }
          removeEmpty(e) {
            return e;
          }
        }, mr = new xt2();
        function Bt2(t, e, r) {
          return mr.diff(t, e, r);
        }
        var Vu2 = () => {
        }, k2 = Vu2;
        var Fr2 = "cr", Er2 = "crlf", Wu2 = "lf", $u2 = Wu2, Tt2 = "\r", Cr2 = `\r
`, ze2 = `
`, zu2 = ze2;
        function hr2(t) {
          let e = t.indexOf(Tt2);
          return e !== -1 ? t.charAt(e + 1) === ze2 ? Er2 : Fr2 : $u2;
        }
        function we2(t) {
          return t === Fr2 ? Tt2 : t === Er2 ? Cr2 : zu2;
        }
        var Gu2 = /* @__PURE__ */ new Map([[ze2, /\n/g], [Tt2, /\r/g], [Cr2, /\r\n/g]]);
        function Nt2(t, e) {
          let r = Gu2.get(e);
          return t.match(r)?.length ?? 0;
        }
        var Ku2 = /\r\n?/g;
        function gr2(t) {
          return ne2(0, t, Ku2, ze2);
        }
        var ue2 = /* @__PURE__ */ Symbol.for("comments");
        function Hu2(t) {
          return this[t < 0 ? this.length + t : t];
        }
        var Ju2 = X2("at", function() {
          if (Array.isArray(this) || typeof this == "string") return Hu2;
        }), y2 = Ju2;
        var G2 = "string", U2 = "array", V2 = "cursor", I2 = "indent", R2 = "align", v2 = "trim", x2 = "group", S2 = "fill", T2 = "if-break", L2 = "indent-if-break", M2 = "line-suffix", Y2 = "line-suffix-boundary", g2 = "line", b2 = "label", N2 = "break-parent", Ge2 = /* @__PURE__ */ new Set([V2, I2, R2, v2, x2, S2, T2, L2, M2, Y2, g2, b2, N2]);
        function _r2(t) {
          let e = t.length;
          for (; e > 0 && (t[e - 1] === "\r" || t[e - 1] === `
`); ) e--;
          return e < t.length ? t.slice(0, e) : t;
        }
        function Fe2(t, e, r) {
          if (!t.has(e)) {
            let n = r(e);
            t.set(e, n);
          }
          return t.get(e);
        }
        function qu2(t) {
          if (typeof t == "string") return G2;
          if (Array.isArray(t)) return U2;
          if (!t) return;
          let { type: e } = t;
          if (Ge2.has(e)) return e;
        }
        var q2 = qu2;
        var Xu2 = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
        function Qu2(t) {
          let e = t === null ? "null" : typeof t;
          if (e !== "string" && e !== "object") return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
          if (q2(t)) throw new Error("doc is valid.");
          let r = Object.prototype.toString.call(t);
          if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
          let n = Xu2([...Ge2].map((u) => `'${u}'`));
          return `Unexpected doc.type '${t.type}'.
Expected it to be ${n}.`;
        }
        var wt2 = class extends Error {
          name = "InvalidDocError";
          constructor(e) {
            super(Qu2(e)), this.doc = e;
          }
        }, Z2 = wt2;
        var yr2 = {};
        function Zu2(t, e, r, n) {
          let u = [t];
          for (; u.length > 0; ) {
            let o = u.pop();
            if (o === yr2) {
              r(u.pop());
              continue;
            }
            r && u.push(o, yr2);
            let i = q2(o);
            if (!i) throw new Z2(o);
            if (e?.(o) !== false) switch (i) {
              case U2:
              case S2: {
                let D = i === U2 ? o : o.parts;
                for (let s = D.length, a = s - 1; a >= 0; --a) u.push(D[a]);
                break;
              }
              case T2:
                u.push(o.flatContents, o.breakContents);
                break;
              case x2:
                if (n && o.expandedStates) for (let D = o.expandedStates.length, s = D - 1; s >= 0; --s) u.push(o.expandedStates[s]);
                else u.push(o.contents);
                break;
              case R2:
              case I2:
              case L2:
              case b2:
              case M2:
                u.push(o.contents);
                break;
              case G2:
              case V2:
              case v2:
              case Y2:
              case g2:
              case N2:
                break;
              default:
                throw new Z2(o);
            }
          }
        }
        var Oe2 = Zu2;
        function Se2(t, e) {
          if (typeof t == "string") return e(t);
          let r = /* @__PURE__ */ new Map();
          return n(t);
          function n(o) {
            return Fe2(r, o, u);
          }
          function u(o) {
            switch (q2(o)) {
              case U2:
                return e(o.map(n));
              case S2:
                return e({ ...o, parts: o.parts.map(n) });
              case T2:
                return e({ ...o, breakContents: n(o.breakContents), flatContents: n(o.flatContents) });
              case x2: {
                let { expandedStates: i, contents: D } = o;
                return i ? (i = i.map(n), D = i[0]) : D = n(D), e({ ...o, contents: D, expandedStates: i });
              }
              case R2:
              case I2:
              case L2:
              case b2:
              case M2:
                return e({ ...o, contents: n(o.contents) });
              case G2:
              case V2:
              case v2:
              case Y2:
              case g2:
              case N2:
                return e(o);
              default:
                throw new Z2(o);
            }
          }
        }
        function Ke2(t, e, r) {
          let n = r, u = false;
          function o(i) {
            if (u) return false;
            let D = e(i);
            D !== void 0 && (u = true, n = D);
          }
          return Oe2(t, o), n;
        }
        function eo2(t) {
          if (t.type === x2 && t.break || t.type === g2 && t.hard || t.type === N2) return true;
        }
        function Br2(t) {
          return Ke2(t, eo2, false);
        }
        function Ar2(t) {
          if (t.length > 0) {
            let e = y2(0, t, -1);
            !e.expandedStates && !e.break && (e.break = "propagated");
          }
          return null;
        }
        function Tr2(t) {
          let e = /* @__PURE__ */ new Set(), r = [];
          function n(o) {
            if (o.type === N2 && Ar2(r), o.type === x2) {
              if (r.push(o), e.has(o)) return false;
              e.add(o);
            }
          }
          function u(o) {
            o.type === x2 && r.pop().break && Ar2(r);
          }
          Oe2(t, n, u, true);
        }
        function to2(t) {
          return t.type === g2 && !t.hard ? t.soft ? "" : " " : t.type === T2 ? t.flatContents : t;
        }
        function Nr2(t) {
          return Se2(t, to2);
        }
        function xr2(t) {
          for (t = [...t]; t.length >= 2 && y2(0, t, -2).type === g2 && y2(0, t, -1).type === N2; ) t.length -= 2;
          if (t.length > 0) {
            let e = Pe2(y2(0, t, -1));
            t[t.length - 1] = e;
          }
          return t;
        }
        function Pe2(t) {
          switch (q2(t)) {
            case I2:
            case L2:
            case x2:
            case M2:
            case b2: {
              let e = Pe2(t.contents);
              return { ...t, contents: e };
            }
            case T2:
              return { ...t, breakContents: Pe2(t.breakContents), flatContents: Pe2(t.flatContents) };
            case S2:
              return { ...t, parts: xr2(t.parts) };
            case U2:
              return xr2(t);
            case G2:
              return _r2(t);
            case R2:
            case V2:
            case v2:
            case Y2:
            case g2:
            case N2:
              break;
            default:
              throw new Z2(t);
          }
          return t;
        }
        function He2(t) {
          return Pe2(no2(t));
        }
        function ro2(t) {
          switch (q2(t)) {
            case S2: {
              let { parts: e } = t;
              if (e.every((r) => r === "")) return "";
              if (e.length === 1) return e[0];
              break;
            }
            case x2:
              if (!t.contents && !t.id && !t.break && !t.expandedStates) return "";
              if (t.contents.type === x2 && t.contents.id === t.id && t.contents.break === t.break && t.contents.expandedStates === t.expandedStates) return t.contents;
              break;
            case R2:
            case I2:
            case L2:
            case M2:
              if (!t.contents) return "";
              break;
            case T2:
              if (!t.flatContents && !t.breakContents) return "";
              break;
            case U2: {
              let e = [];
              for (let r of t) {
                if (!r) continue;
                let [n, ...u] = Array.isArray(r) ? r : [r];
                typeof n == "string" && typeof y2(0, e, -1) == "string" ? e[e.length - 1] += n : e.push(n), e.push(...u);
              }
              return e.length === 0 ? "" : e.length === 1 ? e[0] : e;
            }
            case G2:
            case V2:
            case v2:
            case Y2:
            case g2:
            case b2:
            case N2:
              break;
            default:
              throw new Z2(t);
          }
          return t;
        }
        function no2(t) {
          return Se2(t, (e) => ro2(e));
        }
        function wr2(t, e = Je2) {
          return Se2(t, (r) => typeof r == "string" ? be2(e, r.split(`
`)) : r);
        }
        function uo2(t) {
          if (t.type === g2) return true;
        }
        function Or2(t) {
          return Ke2(t, uo2, false);
        }
        function Ee2(t, e) {
          return t.type === b2 ? { ...t, contents: e(t.contents) } : e(t);
        }
        var w2 = k2, qe2 = k2, Pr2 = k2, Sr2 = k2;
        function oe2(t) {
          return w2(t), { type: I2, contents: t };
        }
        function De2(t, e) {
          return Sr2(t), w2(e), { type: R2, contents: e, n: t };
        }
        function br2(t) {
          return De2(Number.NEGATIVE_INFINITY, t);
        }
        function Xe2(t) {
          return De2({ type: "root" }, t);
        }
        function kr2(t) {
          return De2(-1, t);
        }
        function Qe2(t, e, r) {
          w2(t);
          let n = t;
          if (e > 0) {
            for (let u = 0; u < Math.floor(e / r); ++u) n = oe2(n);
            n = De2(e % r, n), n = De2(Number.NEGATIVE_INFINITY, n);
          }
          return n;
        }
        var ae2 = { type: N2 };
        var ee2 = { type: V2 };
        function Ir2(t) {
          return Pr2(t), { type: S2, parts: t };
        }
        function Ot2(t, e = {}) {
          return w2(t), qe2(e.expandedStates, true), { type: x2, id: e.id, contents: t, break: !!e.shouldBreak, expandedStates: e.expandedStates };
        }
        function Rr2(t, e) {
          return Ot2(t[0], { ...e, expandedStates: t });
        }
        function vr2(t, e = "", r = {}) {
          return w2(t), e !== "" && w2(e), { type: T2, breakContents: t, flatContents: e, groupId: r.groupId };
        }
        function Lr2(t, e) {
          return w2(t), { type: L2, contents: t, groupId: e.groupId, negate: e.negate };
        }
        function be2(t, e) {
          w2(t), qe2(e);
          let r = [];
          for (let n = 0; n < e.length; n++) n !== 0 && r.push(t), r.push(e[n]);
          return r;
        }
        function Mr2(t, e) {
          return w2(e), t ? { type: b2, label: t, contents: e } : e;
        }
        var Ze2 = { type: g2 }, Yr2 = { type: g2, soft: true }, ke2 = { type: g2, hard: true }, W2 = [ke2, ae2], Pt2 = { type: g2, hard: true, literal: true }, Je2 = [Pt2, ae2];
        function Ie2(t) {
          return w2(t), { type: M2, contents: t };
        }
        var jr2 = { type: Y2 };
        var Ur2 = { type: v2 };
        function te2(t) {
          if (!t) return "";
          if (Array.isArray(t)) {
            let e = [];
            for (let r of t) if (Array.isArray(r)) e.push(...te2(r));
            else {
              let n = te2(r);
              n !== "" && e.push(n);
            }
            return e;
          }
          return t.type === T2 ? { ...t, breakContents: te2(t.breakContents), flatContents: te2(t.flatContents) } : t.type === x2 ? { ...t, contents: te2(t.contents), expandedStates: t.expandedStates?.map(te2) } : t.type === S2 ? { type: "fill", parts: t.parts.map(te2) } : t.contents ? { ...t, contents: te2(t.contents) } : t;
        }
        function Vr2(t) {
          let e = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ new Set();
          return n(te2(t));
          function n(o, i, D) {
            if (typeof o == "string") return JSON.stringify(o);
            if (Array.isArray(o)) {
              let s = o.map(n).filter(Boolean);
              return s.length === 1 ? s[0] : `[${s.join(", ")}]`;
            }
            if (o.type === g2) {
              let s = D?.[i + 1]?.type === N2;
              return o.literal ? s ? "literalline" : "literallineWithoutBreakParent" : o.hard ? s ? "hardline" : "hardlineWithoutBreakParent" : o.soft ? "softline" : "line";
            }
            if (o.type === N2) return D?.[i - 1]?.type === g2 && D[i - 1].hard ? void 0 : "breakParent";
            if (o.type === v2) return "trim";
            if (o.type === I2) return "indent(" + n(o.contents) + ")";
            if (o.type === R2) return o.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + n(o.contents) + ")" : o.n < 0 ? "dedent(" + n(o.contents) + ")" : o.n.type === "root" ? "markAsRoot(" + n(o.contents) + ")" : "align(" + JSON.stringify(o.n) + ", " + n(o.contents) + ")";
            if (o.type === T2) return "ifBreak(" + n(o.breakContents) + (o.flatContents ? ", " + n(o.flatContents) : "") + (o.groupId ? (o.flatContents ? "" : ', ""') + `, { groupId: ${u(o.groupId)} }` : "") + ")";
            if (o.type === L2) {
              let s = [];
              o.negate && s.push("negate: true"), o.groupId && s.push(`groupId: ${u(o.groupId)}`);
              let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
              return `indentIfBreak(${n(o.contents)}${a})`;
            }
            if (o.type === x2) {
              let s = [];
              o.break && o.break !== "propagated" && s.push("shouldBreak: true"), o.id && s.push(`id: ${u(o.id)}`);
              let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
              return o.expandedStates ? `conditionalGroup([${o.expandedStates.map((c) => n(c)).join(",")}]${a})` : `group(${n(o.contents)}${a})`;
            }
            if (o.type === S2) return `fill([${o.parts.map((s) => n(s)).join(", ")}])`;
            if (o.type === M2) return "lineSuffix(" + n(o.contents) + ")";
            if (o.type === Y2) return "lineSuffixBoundary";
            if (o.type === b2) return `label(${JSON.stringify(o.label)}, ${n(o.contents)})`;
            if (o.type === V2) return "cursor";
            throw new Error("Unknown doc type " + o.type);
          }
          function u(o) {
            if (typeof o != "symbol") return JSON.stringify(String(o));
            if (o in e) return e[o];
            let i = o.description || "symbol";
            for (let D = 0; ; D++) {
              let s = i + (D > 0 ? ` #${D}` : "");
              if (!r.has(s)) return r.add(s), e[o] = `Symbol.for(${JSON.stringify(s)})`;
            }
          }
        }
        var Wr2 = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
        var $r2 = 12288, zr2 = 65510, Gr2 = [12288, 12288, 65281, 65376, 65504, 65510];
        var Kr2 = 4352, Hr2 = 262141, St2 = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];
        var bt2 = (t, e) => {
          let r = 0, n = Math.floor(t.length / 2) - 1;
          for (; r <= n; ) {
            let u = Math.floor((r + n) / 2), o = u * 2;
            if (e < t[o]) n = u - 1;
            else if (e > t[o + 1]) r = u + 1;
            else return true;
          }
          return false;
        };
        var Jr2 = 19968, [oo2, io2] = so2(St2);
        function so2(t) {
          let e = t[0], r = t[1];
          for (let n = 0; n < t.length; n += 2) {
            let u = t[n], o = t[n + 1];
            if (Jr2 >= u && Jr2 <= o) return [u, o];
            o - u > r - e && (e = u, r = o);
          }
          return [e, r];
        }
        var kt2 = (t) => t < $r2 || t > zr2 ? false : bt2(Gr2, t);
        var It2 = (t) => t >= oo2 && t <= io2 ? true : t < Kr2 || t > Hr2 ? false : bt2(St2, t);
        var Do2 = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/, qr2 = (t) => Do2.test(t);
        var ao2 = /[^\x20-\x7F]/;
        function co2(t) {
          if (!t) return 0;
          if (!ao2.test(t)) return t.length;
          let e = 0;
          t = t.replace(Wr2(), (r) => (e += qr2(r) ? 1 : 2, ""));
          for (let r of t) {
            let n = r.codePointAt(0);
            n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || n >= 65024 && n <= 65039 || (e += kt2(n) || It2(n) ? 2 : 1);
          }
          return e;
        }
        var Re2 = co2;
        var fo2 = { type: 0 }, lo2 = { type: 1 }, Rt2 = { value: "", length: 0, queue: [], get root() {
          return Rt2;
        } };
        function Xr2(t, e, r) {
          let n = e.type === 1 ? t.queue.slice(0, -1) : [...t.queue, e], u = "", o = 0, i = 0, D = 0;
          for (let f of n) switch (f.type) {
            case 0:
              c(), r.useTabs ? s(1) : a(r.tabWidth);
              break;
            case 3: {
              let { string: F } = f;
              c(), u += F, o += F.length;
              break;
            }
            case 2: {
              let { width: F } = f;
              i += 1, D += F;
              break;
            }
            default:
              throw new Error(`Unexpected indent comment '${f.type}'.`);
          }
          return l(), { ...t, value: u, length: o, queue: n };
          function s(f) {
            u += "	".repeat(f), o += r.tabWidth * f;
          }
          function a(f) {
            u += " ".repeat(f), o += f;
          }
          function c() {
            r.useTabs ? p() : l();
          }
          function p() {
            i > 0 && s(i), m();
          }
          function l() {
            D > 0 && a(D), m();
          }
          function m() {
            i = 0, D = 0;
          }
        }
        function Qr2(t, e, r) {
          if (!e) return t;
          if (e.type === "root") return { ...t, root: t };
          if (e === Number.NEGATIVE_INFINITY) return t.root;
          let n;
          return typeof e == "number" ? e < 0 ? n = lo2 : n = { type: 2, width: e } : n = { type: 3, string: e }, Xr2(t, n, r);
        }
        function Zr2(t, e) {
          return Xr2(t, fo2, e);
        }
        function po2(t) {
          let e = 0;
          for (let r = t.length - 1; r >= 0; r--) {
            let n = t[r];
            if (n === " " || n === "	") e++;
            else break;
          }
          return e;
        }
        function et2(t) {
          let e = po2(t);
          return { text: e === 0 ? t : t.slice(0, t.length - e), count: e };
        }
        var vt2 = class {
          #t = [];
          #e = "";
          #n = 0;
          #u = [];
          #r = [];
          #o() {
            let e = this.#e;
            e !== "" && (this.#t.push(e), this.#n += e.length, this.#e = "");
            for (let r of this.#r) this.#u.push(Math.min(r, this.#n));
            this.#r.length = 0;
          }
          markPosition() {
            if (this.#u.length + this.#r.length >= 2) throw new Error("There are too many 'cursor' in doc.");
            this.#r.push(this.#n + this.#e.length);
          }
          write(e) {
            this.#e += e;
          }
          trim() {
            let { text: e, count: r } = et2(this.#e);
            return this.#e = e, this.#o(), r;
          }
          finish() {
            return this.#o(), { text: this.#t.join(""), positions: this.#u };
          }
        }, en2 = vt2;
        var K2 = /* @__PURE__ */ Symbol("MODE_BREAK"), Q2 = /* @__PURE__ */ Symbol("MODE_FLAT"), Lt2 = /* @__PURE__ */ Symbol("DOC_FILL_PRINTED_LENGTH");
        function tt2(t, e, r, n, u, o) {
          if (r === Number.POSITIVE_INFINITY) return true;
          let i = e.length, D = false, s = [t], a = "";
          for (; r >= 0; ) {
            if (s.length === 0) {
              if (i === 0) return true;
              s.push(e[--i]);
              continue;
            }
            let { mode: c, doc: p } = s.pop(), l = q2(p);
            switch (l) {
              case G2:
                p && (D && (a += " ", r -= 1, D = false), a += p, r -= Re2(p));
                break;
              case U2:
              case S2: {
                let m = l === U2 ? p : p.parts, f = p[Lt2] ?? 0;
                for (let F = m.length - 1; F >= f; F--) s.push({ mode: c, doc: m[F] });
                break;
              }
              case I2:
              case R2:
              case L2:
              case b2:
                s.push({ mode: c, doc: p.contents });
                break;
              case v2: {
                let { text: m, count: f } = et2(a);
                a = m, r += f;
                break;
              }
              case x2: {
                if (o && p.break) return false;
                let m = p.break ? K2 : c, f = p.expandedStates && m === K2 ? y2(0, p.expandedStates, -1) : p.contents;
                s.push({ mode: m, doc: f });
                break;
              }
              case T2: {
                let f = (p.groupId ? u[p.groupId] || Q2 : c) === K2 ? p.breakContents : p.flatContents;
                f && s.push({ mode: c, doc: f });
                break;
              }
              case g2:
                if (c === K2 || p.hard) return true;
                p.soft || (D = true);
                break;
              case M2:
                n = true;
                break;
              case Y2:
                if (n) return false;
                break;
            }
          }
          return false;
        }
        function Ce2(t, e) {
          let r = /* @__PURE__ */ Object.create(null), n = e.printWidth, u = we2(e.endOfLine), o = 0, i = [{ indent: Rt2, mode: K2, doc: t }], D = false, s = [], a = new en2();
          for (Tr2(t); i.length > 0; ) {
            let { indent: f, mode: F, doc: d } = i.pop();
            switch (q2(d)) {
              case G2: {
                let E = u !== `
` ? ne2(0, d, `
`, u) : d;
                E && (a.write(E), i.length > 0 && (o += Re2(E)));
                break;
              }
              case U2:
                for (let E = d.length - 1; E >= 0; E--) i.push({ indent: f, mode: F, doc: d[E] });
                break;
              case V2:
                a.markPosition();
                break;
              case I2:
                i.push({ indent: Zr2(f, e), mode: F, doc: d.contents });
                break;
              case R2:
                i.push({ indent: Qr2(f, d.n, e), mode: F, doc: d.contents });
                break;
              case v2:
                o -= a.trim();
                break;
              case x2: {
                let E = (function() {
                  if (F === Q2 && !D) return { indent: f, mode: d.break ? K2 : Q2, doc: d.contents };
                  D = false;
                  let h = n - o, _ = s.length > 0, P = { indent: f, mode: Q2, doc: d.contents };
                  if (!d.break && tt2(P, i, h, _, r)) return P;
                  if (!d.expandedStates) return { indent: f, mode: K2, doc: d.contents };
                  if (!d.break) for (let A = 1; A < d.expandedStates.length - 1; A++) {
                    let B = { indent: f, mode: Q2, doc: d.expandedStates[A] };
                    if (tt2(B, i, h, _, r)) return B;
                  }
                  return { indent: f, mode: K2, doc: y2(0, d.expandedStates, -1) };
                })();
                i.push(E), d.id && (r[d.id] = E.mode);
                break;
              }
              case S2: {
                let E = n - o, C = d[Lt2] ?? 0, { parts: h } = d, _ = h.length - C;
                if (_ === 0) break;
                let P = h[C + 0], A = h[C + 1], B = { indent: f, mode: Q2, doc: P }, J = { indent: f, mode: K2, doc: P }, $e = tt2(B, [], E, s.length > 0, r, true);
                if (_ === 1) {
                  $e ? i.push(B) : i.push(J);
                  break;
                }
                let pr2 = { indent: f, mode: Q2, doc: A }, _t = { indent: f, mode: K2, doc: A };
                if (_ === 2) {
                  $e ? i.push(pr2, B) : i.push(_t, J);
                  break;
                }
                let bu = h[C + 2], ku = { indent: f, mode: F, doc: { ...d, [Lt2]: C + 2 } }, Iu = tt2({ indent: f, mode: Q2, doc: [P, A, bu] }, [], E, s.length > 0, r, true);
                i.push(ku), Iu ? i.push(pr2, B) : $e ? i.push(_t, B) : i.push(_t, J);
                break;
              }
              case T2:
              case L2: {
                let E = d.groupId ? r[d.groupId] : F;
                if (E === K2) {
                  let C = d.type === T2 ? d.breakContents : d.negate ? d.contents : oe2(d.contents);
                  C && i.push({ indent: f, mode: F, doc: C });
                }
                if (E === Q2) {
                  let C = d.type === T2 ? d.flatContents : d.negate ? oe2(d.contents) : d.contents;
                  C && i.push({ indent: f, mode: F, doc: C });
                }
                break;
              }
              case M2:
                s.push({ indent: f, mode: F, doc: d.contents });
                break;
              case Y2:
                s.length > 0 && i.push({ indent: f, mode: F, doc: ke2 });
                break;
              case g2:
                switch (F) {
                  case Q2:
                    if (!d.hard) {
                      d.soft || (a.write(" "), o += 1);
                      break;
                    }
                    D = true;
                  case K2:
                    if (s.length > 0) {
                      i.push({ indent: f, mode: F, doc: d }, ...s.reverse()), s.length = 0;
                      break;
                    }
                    d.literal ? (a.write(u), o = 0, f.root && (f.root.value && a.write(f.root.value), o = f.root.length)) : (a.trim(), a.write(u + f.value), o = f.length);
                    break;
                }
                break;
              case b2:
                i.push({ indent: f, mode: F, doc: d.contents });
                break;
              case N2:
                break;
              default:
                throw new Z2(d);
            }
            i.length === 0 && s.length > 0 && (i.push(...s.reverse()), s.length = 0);
          }
          let { text: c, positions: p } = a.finish();
          if (p.length !== 2) return { formatted: c };
          let [l, m] = p;
          return { formatted: c, cursorNodeStart: l, cursorNodeText: c.slice(l, m) };
        }
        function mo2(t, e, r = 0) {
          let n = 0;
          for (let u = r; u < t.length; ++u) t[u] === "	" ? n = n + e - n % e : n++;
          return n;
        }
        var he2 = mo2;
        var Mt2 = class {
          constructor(e) {
            this.stack = [e];
          }
          get key() {
            let { stack: e, siblings: r } = this;
            return y2(0, e, r === null ? -2 : -4) ?? null;
          }
          get index() {
            return this.siblings === null ? null : y2(0, this.stack, -2);
          }
          get node() {
            return y2(0, this.stack, -1);
          }
          get parent() {
            return this.getNode(1);
          }
          get grandparent() {
            return this.getNode(2);
          }
          get isInArray() {
            return this.siblings !== null;
          }
          get siblings() {
            let { stack: e } = this, r = y2(0, e, -3);
            return Array.isArray(r) ? r : null;
          }
          get next() {
            let { siblings: e } = this;
            return e === null ? null : e[this.index + 1];
          }
          get previous() {
            let { siblings: e } = this;
            return e === null ? null : e[this.index - 1];
          }
          get isFirst() {
            return this.index === 0;
          }
          get isLast() {
            let { siblings: e, index: r } = this;
            return e !== null && r === e.length - 1;
          }
          get isRoot() {
            return this.stack.length === 1;
          }
          get root() {
            return this.stack[0];
          }
          get ancestors() {
            return [...this.#e()];
          }
          getName() {
            let { stack: e } = this, { length: r } = e;
            return r > 1 ? y2(0, e, -2) : null;
          }
          getValue() {
            return y2(0, this.stack, -1);
          }
          getNode(e = 0) {
            let r = this.#t(e);
            return r === -1 ? null : this.stack[r];
          }
          getParentNode(e = 0) {
            return this.getNode(e + 1);
          }
          #t(e) {
            let { stack: r } = this;
            for (let n = r.length - 1; n >= 0; n -= 2) if (!Array.isArray(r[n]) && --e < 0) return n;
            return -1;
          }
          call(e, ...r) {
            let { stack: n } = this, { length: u } = n, o = y2(0, n, -1);
            for (let i of r) o = o?.[i], n.push(i, o);
            try {
              return e(this);
            } finally {
              n.length = u;
            }
          }
          callParent(e, r = 0) {
            let n = this.#t(r + 1), u = this.stack.splice(n + 1);
            try {
              return e(this);
            } finally {
              this.stack.push(...u);
            }
          }
          each(e, ...r) {
            let { stack: n } = this, { length: u } = n, o = y2(0, n, -1);
            for (let i of r) o = o[i], n.push(i, o);
            try {
              for (let i = 0; i < o.length; ++i) n.push(i, o[i]), e(this, i, o), n.length -= 2;
            } finally {
              n.length = u;
            }
          }
          map(e, ...r) {
            let n = [];
            return this.each((u, o, i) => {
              n[o] = e(u, o, i);
            }, ...r), n;
          }
          match(...e) {
            let r = this.stack.length - 1, n = null, u = this.stack[r--];
            for (let o of e) {
              if (u === void 0) return false;
              let i = null;
              if (typeof n == "number" && (i = n, n = this.stack[r--], u = this.stack[r--]), o && !o(u, n, i)) return false;
              n = this.stack[r--], u = this.stack[r--];
            }
            return true;
          }
          findAncestor(e) {
            for (let r of this.#e()) if (e(r)) return r;
          }
          hasAncestor(e) {
            for (let r of this.#e()) if (e(r)) return true;
            return false;
          }
          *#e() {
            let { stack: e } = this;
            for (let r = e.length - 3; r >= 0; r -= 2) {
              let n = e[r];
              Array.isArray(n) || (yield n);
            }
          }
        }, tn2 = Mt2;
        function Fo2(t) {
          return Array.isArray(t) && t.length > 0;
        }
        var rt2 = Fo2;
        function Eo2(t) {
          return t !== null && typeof t == "object";
        }
        var ge2 = Eo2;
        function _e2(t) {
          return (e, r, n) => {
            if (r === false) return false;
            let u = !!n?.backwards, { length: o } = e, i = r;
            for (; i >= 0 && i < o; ) {
              let D = e.charAt(i);
              if (t instanceof RegExp) {
                if (!t.test(D)) return i;
              } else if (!t.includes(D)) return i;
              u ? i-- : i++;
            }
            return i === -1 || i === o ? i : false;
          };
        }
        var rn2 = _e2(/\s/), j2 = _e2(" 	"), nt2 = _e2(",; 	"), ut2 = _e2(/[^\n\r]/);
        var nn2 = (t) => t === `
` || t === "\r" || t === "\u2028" || t === "\u2029";
        function Co2(t, e, r) {
          if (e === false) return false;
          let n = !!r?.backwards, u = t.charAt(e);
          if (n) {
            if (t.charAt(e - 1) === "\r" && u === `
`) return e - 2;
            if (nn2(u)) return e - 1;
          } else {
            if (u === "\r" && t.charAt(e + 1) === `
`) return e + 2;
            if (nn2(u)) return e + 1;
          }
          return e;
        }
        var $2 = Co2;
        function ho2(t, e, r = {}) {
          let n = j2(t, r.backwards ? e - 1 : e, r), u = $2(t, n, r);
          return n !== u;
        }
        var H2 = ho2;
        function* ye2(t, e) {
          let { getVisitorKeys: r, filter: n = () => true } = e, u = (o) => ge2(o) && n(o);
          for (let o of r(t)) {
            let i = t[o];
            if (Array.isArray(i)) for (let D of i) u(D) && (yield D);
            else u(i) && (yield i);
          }
        }
        function* un2(t, e) {
          let r = [t];
          for (let n = 0; n < r.length; n++) {
            let u = r[n];
            for (let o of ye2(u, e)) yield o, r.push(o);
          }
        }
        function on2(t, e) {
          return ye2(t, e).next().done;
        }
        function go2(t, e, r) {
          let { filter: n } = r;
          if (!n) return [];
          let u, o = (r.getChildren?.(t, r) ?? [...ye2(t, { getVisitorKeys: r.getVisitorKeys })]).flatMap((s) => (u ?? (u = [t, ...e]), n(s, u) ? [s] : sn2(s, u, r))), { locStart: i, locEnd: D } = r;
          return o.sort((s, a) => i(s) - i(a) || D(s) - D(a)), o;
        }
        function sn2(t, e, r) {
          return Fe2(r.cache, t, (n) => go2(n, e, r));
        }
        var ot2 = sn2;
        function _o2(t) {
          let e = t.type || t.kind || "(unknown type)", r = String(t.name || t.id && (typeof t.id == "object" ? t.id.name : t.id) || t.key && (typeof t.key == "object" ? t.key.name : t.key) || t.value && (typeof t.value == "object" ? "" : String(t.value)) || t.operator || "");
          return r.length > 20 && (r = r.slice(0, 19) + "\u2026"), e + (r ? " " + r : "");
        }
        function Yt2(t, e) {
          (t.comments ?? (t.comments = [])).push(e), e.printed = false, e.nodeDescription = _o2(t);
        }
        function ce2(t, e) {
          e.leading = true, e.trailing = false, Yt2(t, e);
        }
        function re2(t, e, r) {
          e.leading = false, e.trailing = false, r && (e.marker = r), Yt2(t, e);
        }
        function fe2(t, e) {
          e.leading = false, e.trailing = true, Yt2(t, e);
        }
        var Vt2 = /* @__PURE__ */ new WeakMap();
        function an2(t, e, r, n, u = []) {
          let { locStart: o, locEnd: i } = r, D = o(e), s = i(e), a = ot2(t, u, { cache: Vt2, locStart: o, locEnd: i, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes }), c, p, l = 0, m = a.length;
          for (; l < m; ) {
            let f = l + m >> 1, F = a[f], d = o(F), E = i(F);
            if (d <= D && s <= E) return an2(F, e, r, F, [F, ...u]);
            if (E <= D) {
              c = F, l = f + 1;
              continue;
            }
            if (s <= d) {
              p = F, m = f;
              continue;
            }
            throw new Error("Comment location overlaps with node location");
          }
          if (n?.type === "TemplateLiteral") {
            let { quasis: f } = n, F = Ut2(f, e, r);
            c && Ut2(f, c, r) !== F && (c = null), p && Ut2(f, p, r) !== F && (p = null);
          }
          return { enclosingNode: n, precedingNode: c, followingNode: p };
        }
        var jt2 = () => false;
        function cn2(t, e) {
          let { comments: r } = t;
          if (delete t.comments, !rt2(r) || !e.printer.canAttachComment) return;
          let n = [], { printer: { features: { experimental_avoidAstMutation: u }, handleComments: o = {} }, originalText: i } = e, { ownLine: D = jt2, endOfLine: s = jt2, remaining: a = jt2 } = o, c = r.map((l, m) => ({ ...an2(t, l, e), comment: l, text: i, options: e, ast: t, isLastComment: r.length - 1 === m, placement: void 0 })), p = !u;
          for (let [l, m] of c.entries()) {
            let { comment: f, precedingNode: F, enclosingNode: d, followingNode: E, text: C, options: h, ast: _, isLastComment: P } = m, A = yo2(C, h, c, l) ? "ownLine" : Ao2(C, h, c, l) ? "endOfLine" : "remaining", B;
            if (u ? (m.placement = A, B = [m]) : B = [f, C, h, _, P], p && (f.enclosingNode = d, f.precedingNode = F, f.followingNode = E), f.placement = A, A === "ownLine") D(...B) || (E ? ce2(E, f) : F ? fe2(F, f) : d ? re2(d, f) : re2(_, f));
            else if (A === "endOfLine") s(...B) || (F ? fe2(F, f) : E ? ce2(E, f) : d ? re2(d, f) : re2(_, f));
            else if (!a(...B)) if (F && E) {
              let J = n.length;
              J > 0 && n[J - 1].followingNode !== E && Dn2(n, h), n.push(m);
            } else F ? fe2(F, f) : E ? ce2(E, f) : d ? re2(d, f) : re2(_, f);
          }
          if (Dn2(n, e), p) for (let l of r) delete l.precedingNode, delete l.enclosingNode, delete l.followingNode;
        }
        var fn2 = (t) => !/[\S\n\u2028\u2029]/.test(t);
        function yo2(t, e, r, n) {
          let { comment: u, precedingNode: o } = r[n], { locStart: i, locEnd: D } = e, s = i(u);
          if (o) for (let a = n - 1; a >= 0; a--) {
            let { comment: c, precedingNode: p } = r[a];
            if (p !== o || !fn2(t.slice(D(c), s))) break;
            s = i(c);
          }
          return H2(t, s, { backwards: true });
        }
        function Ao2(t, e, r, n) {
          let { comment: u, followingNode: o } = r[n], { locStart: i, locEnd: D } = e, s = D(u);
          if (o) for (let a = n + 1; a < r.length; a++) {
            let { comment: c, followingNode: p } = r[a];
            if (p !== o || !fn2(t.slice(s, i(c)))) break;
            s = D(c);
          }
          return H2(t, s);
        }
        function Dn2(t, e) {
          let r = t.length;
          if (r === 0) return;
          let { precedingNode: n, followingNode: u } = t[0], o = e.locStart(u), i;
          for (i = r; i > 0; --i) {
            let { comment: D, precedingNode: s, followingNode: a } = t[i - 1];
            k2(s, n), k2(a, u);
            let c = e.originalText.slice(e.locEnd(D), o);
            if (e.printer.isGap?.(c, e) ?? /^[\s(]*$/.test(c)) o = e.locStart(D);
            else break;
          }
          for (let [D, { comment: s }] of t.entries()) D < i ? fe2(n, s) : ce2(u, s);
          for (let D of [n, u]) D.comments && D.comments.length > 1 && D.comments.sort((s, a) => e.locStart(s) - e.locStart(a));
          t.length = 0;
        }
        function Ut2(t, e, r) {
          let n = r.locStart(e) - 1;
          for (let u = 1; u < t.length; ++u) if (n < r.locStart(t[u])) return u - 1;
          return 0;
        }
        function xo2(t, e) {
          let r = e - 1;
          r = j2(t, r, { backwards: true }), r = $2(t, r, { backwards: true }), r = j2(t, r, { backwards: true });
          let n = $2(t, r, { backwards: true });
          return r !== n;
        }
        var ve2 = xo2;
        var ln2 = () => true;
        function pn2(t, e) {
          let r = t.node;
          return r.printed = true, e.printer.printComment(t, e);
        }
        function Bo2(t, e) {
          let r = t.node, n = [pn2(t, e)], { printer: u, originalText: o, locStart: i, locEnd: D } = e;
          if (u.isBlockComment?.(r)) {
            let c = " ";
            H2(o, D(r)) && (H2(o, i(r), { backwards: true }) ? c = W2 : c = Ze2), n.push(c);
          } else n.push(W2);
          let a = $2(o, j2(o, D(r)));
          return a !== false && H2(o, a) && n.push(W2), n;
        }
        function To2(t, e, r) {
          let n = t.node, u = pn2(t, e), { printer: o, originalText: i, locStart: D } = e, s = o.isBlockComment?.(n);
          if (r?.hasLineSuffix && !r?.isBlock || H2(i, D(n), { backwards: true })) {
            let a = ve2(i, D(n));
            return { doc: Ie2([W2, a ? W2 : "", u]), isBlock: s, hasLineSuffix: true };
          }
          return !s || r?.hasLineSuffix ? { doc: [Ie2([" ", u]), ae2], isBlock: s, hasLineSuffix: true } : { doc: [" ", u], isBlock: s, hasLineSuffix: false };
        }
        function No2(t, e, r) {
          let n = e[/* @__PURE__ */ Symbol.for("printedComments")], u = r?.filter ?? ln2, o = new Set(t.node?.comments?.filter((i) => !n?.has(i) && i.leading && u(i)));
          return o.size === 0 ? "" : t.map(({ node: i }) => o.has(i) ? Bo2(t, e) : "", "comments").filter(Boolean);
        }
        function wo2(t, e, r) {
          let n = t.node?.comments, u = new Set(n?.filter((c) => c.trailing)), o = e[/* @__PURE__ */ Symbol.for("printedComments")], i = r?.filter ?? ln2, D = new Set(n?.filter((c) => u.has(c) && !o?.has(c) && i(c)));
          if (D.size === 0) return "";
          let s = [], a;
          return t.each(({ node: c }) => {
            u.has(c) && (a = To2(t, e, a), D.has(c) && s.push(a.doc));
          }, "comments"), s;
        }
        function mn2(t, e, r, n) {
          let u = No2(t, r, n), o = wo2(t, r, n);
          return u || o ? Ee2(e, (i) => [u, i, o]) : e;
        }
        function dn2(t) {
          let { [ue2]: e, [/* @__PURE__ */ Symbol.for("printedComments")]: r } = t;
          for (let n of e) {
            if (!n.printed && !r.has(n)) throw new Error('Comment "' + n.value.trim() + '" was not printed. Please report this error!');
            delete n.printed;
          }
        }
        var Fn2 = () => k2;
        var Le2 = class extends Error {
          name = "ConfigError";
        }, Me2 = class extends Error {
          name = "UndefinedParserError";
        };
        var Oo2 = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), le2 = Oo2;
        var En2 = { checkIgnorePragma: { category: "Special", type: "boolean", default: false, description: "Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.", cliCategory: "Other" }, cursorOffset: { category: "Special", type: "int", default: -1, range: { start: -1, end: 1 / 0, step: 1 }, description: "Print (to stderr) where a cursor at the given position would move to after formatting.", cliCategory: "Editor" }, endOfLine: { category: "Global", type: "choice", default: "lf", description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)` }] }, filepath: { category: "Special", type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: "Other", cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { category: "Special", type: "boolean", default: false, description: "Insert @format pragma into file's first docblock comment.", cliCategory: "Other" }, parser: { category: "Global", type: "choice", default: void 0, description: "Which parser to use.", exception: (t) => typeof t == "string" || typeof t == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", description: "JavaScript" }, { value: "babel-flow", description: "Flow" }, { value: "babel-ts", description: "TypeScript" }, { value: "typescript", description: "TypeScript" }, { value: "acorn", description: "JavaScript" }, { value: "espree", description: "JavaScript" }, { value: "meriyah", description: "JavaScript" }, { value: "css", description: "CSS" }, { value: "less", description: "Less" }, { value: "scss", description: "SCSS" }, { value: "json", description: "JSON" }, { value: "json5", description: "JSON5" }, { value: "jsonc", description: "JSON with Comments" }, { value: "json-stringify", description: "JSON.stringify" }, { value: "graphql", description: "GraphQL" }, { value: "markdown", description: "Markdown" }, { value: "mdx", description: "MDX" }, { value: "vue", description: "Vue" }, { value: "yaml", description: "YAML" }, { value: "glimmer", description: "Ember / Handlebars" }, { value: "html", description: "HTML" }, { value: "angular", description: "Angular" }, { value: "lwc", description: "Lightning Web Components" }, { value: "mjml", description: "MJML" }] }, plugins: { type: "path", array: true, default: [{ value: [] }], category: "Global", description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (t) => typeof t == "string" || typeof t == "object", cliName: "plugin", cliCategory: "Config" }, printWidth: { category: "Global", type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: 1 / 0, step: 1 } }, rangeEnd: { category: "Special", type: "int", default: 1 / 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`, cliCategory: "Editor" }, rangeStart: { category: "Special", type: "int", default: 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`, cliCategory: "Editor" }, requirePragma: { category: "Special", type: "boolean", default: false, description: "Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.", cliCategory: "Other" }, tabWidth: { type: "int", category: "Global", default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: 1 / 0, step: 1 } }, useTabs: { category: "Global", type: "boolean", default: false, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { category: "Global", type: "choice", default: "auto", description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
        function it2({ plugins: t = [], showDeprecated: e = false } = {}) {
          let r = t.flatMap((u) => u.languages ?? []), n = [];
          for (let u of So2(Object.assign({}, ...t.map(({ options: o }) => o), En2))) !e && u.deprecated || (Array.isArray(u.choices) && (e || (u.choices = u.choices.filter((o) => !o.deprecated)), u.name === "parser" && (u.choices = [...u.choices, ...Po2(u.choices, r, t)])), u.pluginDefaults = Object.fromEntries(t.filter((o) => o.defaultOptions?.[u.name] !== void 0).map((o) => [o.name, o.defaultOptions[u.name]])), n.push(u));
          return { languages: r, options: n };
        }
        function* Po2(t, e, r) {
          let n = new Set(t.map((u) => u.value));
          for (let u of e) if (u.parsers) {
            for (let o of u.parsers) if (!n.has(o)) {
              n.add(o);
              let i = r.find((s) => s.parsers && le2(s.parsers, o)), D = u.name;
              i?.name && (D += ` (plugin: ${i.name})`), yield { value: o, description: D };
            }
          }
        }
        function So2(t) {
          let e = [];
          for (let [r, n] of Object.entries(t)) {
            let u = { name: r, ...n };
            Array.isArray(u.default) && (u.default = y2(0, u.default, -1).value), e.push(u);
          }
          return e;
        }
        var bo2 = Array.prototype.toReversed ?? function() {
          return [...this].reverse();
        }, ko2 = X2("toReversed", function() {
          if (Array.isArray(this)) return bo2;
        }), Cn2 = ko2;
        function Io2() {
          let t = globalThis, e = t.process?.platform;
          if (typeof e == "string") return e.startsWith("win");
          let r = t.Deno?.build?.os;
          return typeof r == "string" ? r === "windows" : t.navigator?.platform?.startsWith("Win") ?? false;
        }
        var Ro2 = Io2();
        function hn2(t) {
          if (t = t instanceof URL ? t : new URL(t), t.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${t.protocol}"`);
          return t;
        }
        function vo2(t) {
          return t = hn2(t), decodeURIComponent(t.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
        }
        function Lo2(t) {
          t = hn2(t);
          let e = decodeURIComponent(t.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
          return t.hostname !== "" && (e = `\\\\${t.hostname}${e}`), e;
        }
        function Wt2(t) {
          return Ro2 ? Lo2(t) : vo2(t);
        }
        var gn2 = (t) => String(t).split(/[/\\]/).pop(), _n2 = (t) => String(t).startsWith("file:");
        function yn2(t, e) {
          if (!e) return;
          let r = gn2(e).toLowerCase();
          return t.find(({ filenames: n }) => n?.some((u) => u.toLowerCase() === r)) ?? t.find(({ extensions: n }) => n?.some((u) => r.endsWith(u)));
        }
        function Mo2(t, e) {
          if (e) return t.find(({ name: r }) => r.toLowerCase() === e) ?? t.find(({ aliases: r }) => r?.includes(e)) ?? t.find(({ extensions: r }) => r?.includes(`.${e}`));
        }
        var Yo2 = void 0;
        function An2(t, e) {
          if (e) {
            if (_n2(e)) try {
              e = Wt2(e);
            } catch {
              return;
            }
            if (typeof e == "string") return t.find(({ isSupported: r }) => r?.({ filepath: e }));
          }
        }
        function jo2(t, e) {
          let r = Cn2(0, t.plugins).flatMap((u) => u.languages ?? []);
          return (Mo2(r, e.language) ?? yn2(r, e.physicalFile) ?? yn2(r, e.file) ?? An2(r, e.physicalFile) ?? An2(r, e.file) ?? Yo2?.(r, e.physicalFile))?.parsers[0];
        }
        var st2 = jo2;
        var ie2 = { key: (t) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(t) ? t : JSON.stringify(t), value(t) {
          if (t === null || typeof t != "object") return JSON.stringify(t);
          if (Array.isArray(t)) return `[${t.map((r) => ie2.value(r)).join(", ")}]`;
          let e = Object.keys(t);
          return e.length === 0 ? "{}" : `{ ${e.map((r) => `${ie2.key(r)}: ${ie2.value(t[r])}`).join(", ")} }`;
        }, pair: ({ key: t, value: e }) => ie2.value({ [t]: e }) };
        var xn2 = new Proxy(String, { get: () => xn2 }), z2 = xn2;
        var Bn2 = (t, e, { descriptor: r }) => {
          let n = [`${z2.yellow(typeof t == "string" ? r.key(t) : r.pair(t))} is deprecated`];
          return e && n.push(`we now treat it as ${z2.blue(typeof e == "string" ? r.key(e) : r.pair(e))}`), n.join("; ") + ".";
        };
        var Dt2 = /* @__PURE__ */ Symbol.for("vnopts.VALUE_NOT_EXIST"), Ae2 = /* @__PURE__ */ Symbol.for("vnopts.VALUE_UNCHANGED");
        var Tn2 = " ".repeat(2), wn2 = (t, e, r) => {
          let { text: n, list: u } = r.normalizeExpectedResult(r.schemas[t].expected(r)), o = [];
          return n && o.push(Nn2(t, e, n, r.descriptor)), u && o.push([Nn2(t, e, u.title, r.descriptor)].concat(u.values.map((i) => On2(i, r.loggerPrintWidth))).join(`
`)), Pn2(o, r.loggerPrintWidth);
        };
        function Nn2(t, e, r, n) {
          return [`Invalid ${z2.red(n.key(t))} value.`, `Expected ${z2.blue(r)},`, `but received ${e === Dt2 ? z2.gray("nothing") : z2.red(n.value(e))}.`].join(" ");
        }
        function On2({ text: t, list: e }, r) {
          let n = [];
          return t && n.push(`- ${z2.blue(t)}`), e && n.push([`- ${z2.blue(e.title)}:`].concat(e.values.map((u) => On2(u, r - Tn2.length).replace(/^|\n/g, `$&${Tn2}`))).join(`
`)), Pn2(n, r);
        }
        function Pn2(t, e) {
          if (t.length === 1) return t[0];
          let [r, n] = t, [u, o] = t.map((i) => i.split(`
`, 1)[0].length);
          return u > e && u > o ? n : r;
        }
        var xe2 = [], $t2 = [];
        function at2(t, e, r) {
          if (t === e) return 0;
          let n = r?.maxDistance, u = t;
          t.length > e.length && (t = e, e = u);
          let o = t.length, i = e.length;
          for (; o > 0 && t.charCodeAt(~-o) === e.charCodeAt(~-i); ) o--, i--;
          let D = 0;
          for (; D < o && t.charCodeAt(D) === e.charCodeAt(D); ) D++;
          if (o -= D, i -= D, n !== void 0 && i - o > n) return n;
          if (o === 0) return n !== void 0 && i > n ? n : i;
          let s, a, c, p, l = 0, m = 0;
          for (; l < o; ) $t2[l] = t.charCodeAt(D + l), xe2[l] = ++l;
          for (; m < i; ) {
            for (s = e.charCodeAt(D + m), c = m++, a = m, l = 0; l < o; l++) p = s === $t2[l] ? c : c + 1, c = xe2[l], a = xe2[l] = c > a ? p > a ? a + 1 : p : p > c ? c + 1 : p;
            if (n !== void 0) {
              let f = a;
              for (l = 0; l < o; l++) xe2[l] < f && (f = xe2[l]);
              if (f > n) return n;
            }
          }
          return xe2.length = o, $t2.length = o, n !== void 0 && a > n ? n : a;
        }
        function Sn2(t, e, r) {
          if (!Array.isArray(e) || e.length === 0) return;
          let n = r?.maxDistance, u = t.length;
          for (let s of e) if (s === t) return s;
          if (n === 0) return;
          let o, i = Number.POSITIVE_INFINITY, D = /* @__PURE__ */ new Set();
          for (let s of e) {
            if (D.has(s)) continue;
            D.add(s);
            let a = Math.abs(s.length - u);
            if (a >= i || n !== void 0 && a > n) continue;
            let c = Number.isFinite(i) ? n === void 0 ? i : Math.min(i, n) : n, p = c === void 0 ? at2(t, s) : at2(t, s, { maxDistance: c });
            if (n !== void 0 && p > n) continue;
            let l = p;
            if (c !== void 0 && p === c && c === n && (l = at2(t, s)), l < i && (i = l, o = s, i === 0)) break;
          }
          if (!(n !== void 0 && i > n)) return o;
        }
        var ct2 = (t, e, { descriptor: r, logger: n, schemas: u }) => {
          let o = [`Ignored unknown option ${z2.yellow(r.pair({ key: t, value: e }))}.`], i = Sn2(t, Object.keys(u), { maxDistance: 3 });
          i && o.push(`Did you mean ${z2.blue(r.key(i))}?`), n.warn(o.join(" "));
        };
        var Uo2 = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
        function Vo2(t, e) {
          let r = new t(e), n = Object.create(r);
          for (let u of Uo2) u in e && (n[u] = Wo2(e[u], r, O2.prototype[u].length));
          return n;
        }
        var O2 = class {
          static create(e) {
            return Vo2(this, e);
          }
          constructor(e) {
            this.name = e.name;
          }
          default(e) {
          }
          expected(e) {
            return "nothing";
          }
          validate(e, r) {
            return false;
          }
          deprecated(e, r) {
            return false;
          }
          forward(e, r) {
          }
          redirect(e, r) {
          }
          overlap(e, r, n) {
            return e;
          }
          preprocess(e, r) {
            return e;
          }
          postprocess(e, r) {
            return Ae2;
          }
        };
        function Wo2(t, e, r) {
          return typeof t == "function" ? (...n) => t(...n.slice(0, r - 1), e, ...n.slice(r - 1)) : () => t;
        }
        var ft2 = class extends O2 {
          constructor(e) {
            super(e), this._sourceName = e.sourceName;
          }
          expected(e) {
            return e.schemas[this._sourceName].expected(e);
          }
          validate(e, r) {
            return r.schemas[this._sourceName].validate(e, r);
          }
          redirect(e, r) {
            return this._sourceName;
          }
        };
        var lt2 = class extends O2 {
          expected() {
            return "anything";
          }
          validate() {
            return true;
          }
        };
        var pt2 = class extends O2 {
          constructor({ valueSchema: e, name: r = e.name, ...n }) {
            super({ ...n, name: r }), this._valueSchema = e;
          }
          expected(e) {
            let { text: r, list: n } = e.normalizeExpectedResult(this._valueSchema.expected(e));
            return { text: r && `an array of ${r}`, list: n && { title: "an array of the following values", values: [{ list: n }] } };
          }
          validate(e, r) {
            if (!Array.isArray(e)) return false;
            let n = [];
            for (let u of e) {
              let o = r.normalizeValidateResult(this._valueSchema.validate(u, r), u);
              o !== true && n.push(o.value);
            }
            return n.length === 0 ? true : { value: n };
          }
          deprecated(e, r) {
            let n = [];
            for (let u of e) {
              let o = r.normalizeDeprecatedResult(this._valueSchema.deprecated(u, r), u);
              o !== false && n.push(...o.map(({ value: i }) => ({ value: [i] })));
            }
            return n;
          }
          forward(e, r) {
            let n = [];
            for (let u of e) {
              let o = r.normalizeForwardResult(this._valueSchema.forward(u, r), u);
              n.push(...o.map(bn2));
            }
            return n;
          }
          redirect(e, r) {
            let n = [], u = [];
            for (let o of e) {
              let i = r.normalizeRedirectResult(this._valueSchema.redirect(o, r), o);
              "remain" in i && n.push(i.remain), u.push(...i.redirect.map(bn2));
            }
            return n.length === 0 ? { redirect: u } : { redirect: u, remain: n };
          }
          overlap(e, r) {
            return e.concat(r);
          }
        };
        function bn2({ from: t, to: e }) {
          return { from: [t], to: e };
        }
        var mt2 = class extends O2 {
          expected() {
            return "true or false";
          }
          validate(e) {
            return typeof e == "boolean";
          }
        };
        function In2(t, e) {
          let r = /* @__PURE__ */ Object.create(null);
          for (let n of t) {
            let u = n[e];
            if (r[u]) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
            r[u] = n;
          }
          return r;
        }
        function Rn2(t, e) {
          let r = /* @__PURE__ */ new Map();
          for (let n of t) {
            let u = n[e];
            if (r.has(u)) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
            r.set(u, n);
          }
          return r;
        }
        function vn2() {
          let t = /* @__PURE__ */ Object.create(null);
          return (e) => {
            let r = JSON.stringify(e);
            return t[r] ? true : (t[r] = true, false);
          };
        }
        function Ln2(t, e) {
          let r = [], n = [];
          for (let u of t) e(u) ? r.push(u) : n.push(u);
          return [r, n];
        }
        function Mn2(t) {
          return t === Math.floor(t);
        }
        function Yn2(t, e) {
          if (t === e) return 0;
          let r = typeof t, n = typeof e, u = ["undefined", "object", "boolean", "number", "string"];
          return r !== n ? u.indexOf(r) - u.indexOf(n) : r !== "string" ? Number(t) - Number(e) : t.localeCompare(e);
        }
        function jn2(t) {
          return (...e) => {
            let r = t(...e);
            return typeof r == "string" ? new Error(r) : r;
          };
        }
        function zt2(t) {
          return t === void 0 ? {} : t;
        }
        function Gt2(t) {
          if (typeof t == "string") return { text: t };
          let { text: e, list: r } = t;
          return $o2((e || r) !== void 0, "Unexpected `expected` result, there should be at least one field."), r ? { text: e, list: { title: r.title, values: r.values.map(Gt2) } } : { text: e };
        }
        function Kt2(t, e) {
          return t === true ? true : t === false ? { value: e } : t;
        }
        function Ht2(t, e, r = false) {
          return t === false ? false : t === true ? r ? true : [{ value: e }] : "value" in t ? [t] : t.length === 0 ? false : t;
        }
        function kn2(t, e) {
          return typeof t == "string" || "key" in t ? { from: e, to: t } : "from" in t ? { from: t.from, to: t.to } : { from: e, to: t.to };
        }
        function dt2(t, e) {
          return t === void 0 ? [] : Array.isArray(t) ? t.map((r) => kn2(r, e)) : [kn2(t, e)];
        }
        function Jt2(t, e) {
          let r = dt2(typeof t == "object" && "redirect" in t ? t.redirect : t, e);
          return r.length === 0 ? { remain: e, redirect: r } : typeof t == "object" && "remain" in t ? { remain: t.remain, redirect: r } : { redirect: r };
        }
        function $o2(t, e) {
          if (!t) throw new Error(e);
        }
        var Ft2 = class extends O2 {
          constructor(e) {
            super(e), this._choices = Rn2(e.choices.map((r) => r && typeof r == "object" ? r : { value: r }), "value");
          }
          expected({ descriptor: e }) {
            let r = Array.from(this._choices.keys()).map((i) => this._choices.get(i)).filter(({ hidden: i }) => !i).map((i) => i.value).sort(Yn2).map(e.value), n = r.slice(0, -2), u = r.slice(-2);
            return { text: n.concat(u.join(" or ")).join(", "), list: { title: "one of the following values", values: r } };
          }
          validate(e) {
            return this._choices.has(e);
          }
          deprecated(e) {
            let r = this._choices.get(e);
            return r && r.deprecated ? { value: e } : false;
          }
          forward(e) {
            let r = this._choices.get(e);
            return r ? r.forward : void 0;
          }
          redirect(e) {
            let r = this._choices.get(e);
            return r ? r.redirect : void 0;
          }
        };
        var Et2 = class extends O2 {
          expected() {
            return "a number";
          }
          validate(e, r) {
            return typeof e == "number";
          }
        };
        var Ct2 = class extends Et2 {
          expected() {
            return "an integer";
          }
          validate(e, r) {
            return r.normalizeValidateResult(super.validate(e, r), e) === true && Mn2(e);
          }
        };
        var Ye2 = class extends O2 {
          expected() {
            return "a string";
          }
          validate(e) {
            return typeof e == "string";
          }
        };
        var Un2 = ie2, Vn2 = ct2, Wn2 = wn2, $n2 = Bn2;
        var ht2 = class {
          constructor(e, r) {
            let { logger: n = console, loggerPrintWidth: u = 80, descriptor: o = Un2, unknown: i = Vn2, invalid: D = Wn2, deprecated: s = $n2, missing: a = () => false, required: c = () => false, preprocess: p = (m) => m, postprocess: l = () => Ae2 } = r || {};
            this._utils = { descriptor: o, logger: n || { warn: () => {
            } }, loggerPrintWidth: u, schemas: In2(e, "name"), normalizeDefaultResult: zt2, normalizeExpectedResult: Gt2, normalizeDeprecatedResult: Ht2, normalizeForwardResult: dt2, normalizeRedirectResult: Jt2, normalizeValidateResult: Kt2 }, this._unknownHandler = i, this._invalidHandler = jn2(D), this._deprecatedHandler = s, this._identifyMissing = (m, f) => !(m in f) || a(m, f), this._identifyRequired = c, this._preprocess = p, this._postprocess = l, this.cleanHistory();
          }
          cleanHistory() {
            this._hasDeprecationWarned = vn2();
          }
          normalize(e) {
            let r = {}, u = [this._preprocess(e, this._utils)], o = () => {
              for (; u.length !== 0; ) {
                let i = u.shift(), D = this._applyNormalization(i, r);
                u.push(...D);
              }
            };
            o();
            for (let i of Object.keys(this._utils.schemas)) {
              let D = this._utils.schemas[i];
              if (!(i in r)) {
                let s = zt2(D.default(this._utils));
                "value" in s && u.push({ [i]: s.value });
              }
            }
            o();
            for (let i of Object.keys(this._utils.schemas)) {
              if (!(i in r)) continue;
              let D = this._utils.schemas[i], s = r[i], a = D.postprocess(s, this._utils);
              a !== Ae2 && (this._applyValidation(a, i, D), r[i] = a);
            }
            return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
          }
          _applyNormalization(e, r) {
            let n = [], { knownKeys: u, unknownKeys: o } = this._partitionOptionKeys(e);
            for (let i of u) {
              let D = this._utils.schemas[i], s = D.preprocess(e[i], this._utils);
              this._applyValidation(s, i, D);
              let a = ({ from: m, to: f }) => {
                n.push(typeof f == "string" ? { [f]: m } : { [f.key]: f.value });
              }, c = ({ value: m, redirectTo: f }) => {
                let F = Ht2(D.deprecated(m, this._utils), s, true);
                if (F !== false) if (F === true) this._hasDeprecationWarned(i) || this._utils.logger.warn(this._deprecatedHandler(i, f, this._utils));
                else for (let { value: d } of F) {
                  let E = { key: i, value: d };
                  if (!this._hasDeprecationWarned(E)) {
                    let C = typeof f == "string" ? { key: f, value: d } : f;
                    this._utils.logger.warn(this._deprecatedHandler(E, C, this._utils));
                  }
                }
              };
              dt2(D.forward(s, this._utils), s).forEach(a);
              let l = Jt2(D.redirect(s, this._utils), s);
              if (l.redirect.forEach(a), "remain" in l) {
                let m = l.remain;
                r[i] = i in r ? D.overlap(r[i], m, this._utils) : m, c({ value: m });
              }
              for (let { from: m, to: f } of l.redirect) c({ value: m, redirectTo: f });
            }
            for (let i of o) {
              let D = e[i];
              this._applyUnknownHandler(i, D, r, (s, a) => {
                n.push({ [s]: a });
              });
            }
            return n;
          }
          _applyRequiredCheck(e) {
            for (let r of Object.keys(this._utils.schemas)) if (this._identifyMissing(r, e) && this._identifyRequired(r)) throw this._invalidHandler(r, Dt2, this._utils);
          }
          _partitionOptionKeys(e) {
            let [r, n] = Ln2(Object.keys(e).filter((u) => !this._identifyMissing(u, e)), (u) => u in this._utils.schemas);
            return { knownKeys: r, unknownKeys: n };
          }
          _applyValidation(e, r, n) {
            let u = Kt2(n.validate(e, this._utils), e);
            if (u !== true) throw this._invalidHandler(r, u.value, this._utils);
          }
          _applyUnknownHandler(e, r, n, u) {
            let o = this._unknownHandler(e, r, this._utils);
            if (o) for (let i of Object.keys(o)) {
              if (this._identifyMissing(i, o)) continue;
              let D = o[i];
              i in this._utils.schemas ? u(i, D) : n[i] = D;
            }
          }
          _applyPostprocess(e) {
            let r = this._postprocess(e, this._utils);
            if (r !== Ae2) {
              if (r.delete) for (let n of r.delete) delete e[n];
              if (r.override) {
                let { knownKeys: n, unknownKeys: u } = this._partitionOptionKeys(r.override);
                for (let o of n) {
                  let i = r.override[o];
                  this._applyValidation(i, o, this._utils.schemas[o]), e[o] = i;
                }
                for (let o of u) {
                  let i = r.override[o];
                  this._applyUnknownHandler(o, i, e, (D, s) => {
                    let a = this._utils.schemas[D];
                    this._applyValidation(s, D, a), e[D] = s;
                  });
                }
              }
            }
          }
        };
        var qt2;
        function zo2(t, e, { logger: r = false, isCLI: n = false, passThrough: u = false, FlagSchema: o, descriptor: i } = {}) {
          if (n) {
            if (!o) throw new Error("'FlagSchema' option is required.");
            if (!i) throw new Error("'descriptor' option is required.");
          } else i = ie2;
          let D = u ? Array.isArray(u) ? (l, m) => u.includes(l) ? { [l]: m } : void 0 : (l, m) => ({ [l]: m }) : (l, m, f) => {
            let { _: F, ...d } = f.schemas;
            return ct2(l, m, { ...f, schemas: d });
          }, s = Go2(e, { isCLI: n, FlagSchema: o }), a = new ht2(s, { logger: r, unknown: D, descriptor: i }), c = r !== false;
          c && qt2 && (a._hasDeprecationWarned = qt2);
          let p = a.normalize(t);
          return c && (qt2 = a._hasDeprecationWarned), p;
        }
        function Go2(t, { isCLI: e, FlagSchema: r }) {
          let n = [];
          e && n.push(lt2.create({ name: "_" }));
          for (let u of t) n.push(Ko2(u, { isCLI: e, optionInfos: t, FlagSchema: r })), u.alias && e && n.push(ft2.create({ name: u.alias, sourceName: u.name }));
          return n;
        }
        function Ko2(t, { isCLI: e, optionInfos: r, FlagSchema: n }) {
          let { name: u } = t, o = { name: u }, i, D = {};
          switch (t.type) {
            case "int":
              i = Ct2, e && (o.preprocess = Number);
              break;
            case "string":
              i = Ye2;
              break;
            case "choice":
              i = Ft2, o.choices = t.choices.map((s) => s?.redirect ? { ...s, redirect: { to: { key: t.name, value: s.redirect } } } : s);
              break;
            case "boolean":
              i = mt2;
              break;
            case "flag":
              i = n, o.flags = r.flatMap((s) => [s.alias, s.description && s.name, s.oppositeDescription && `no-${s.name}`].filter(Boolean));
              break;
            case "path":
              i = Ye2;
              break;
            default:
              throw new Error(`Unexpected type ${t.type}`);
          }
          if (t.exception ? o.validate = (s, a, c) => t.exception(s) || a.validate(s, c) : o.validate = (s, a, c) => s === void 0 || a.validate(s, c), t.redirect && (D.redirect = (s) => s ? { to: typeof t.redirect == "string" ? t.redirect : { key: t.redirect.option, value: t.redirect.value } } : void 0), t.deprecated && (D.deprecated = true), e && !t.array) {
            let s = o.preprocess || ((a) => a);
            o.preprocess = (a, c, p) => c.preprocess(s(Array.isArray(a) ? y2(0, a, -1) : a), p);
          }
          return t.array ? pt2.create({ ...e ? { preprocess: (s) => Array.isArray(s) ? s : [s] } : {}, ...D, valueSchema: i.create(o) }) : i.create({ ...o, ...D });
        }
        var zn2 = zo2;
        var Ho2 = Array.prototype.findLast ?? function(t) {
          for (let e = this.length - 1; e >= 0; e--) {
            let r = this[e];
            if (t(r, e, this)) return r;
          }
        }, Jo2 = X2("findLast", function() {
          if (Array.isArray(this)) return Ho2;
        }), Xt2 = Jo2;
        var Gn2 = /* @__PURE__ */ Symbol.for("PRETTIER_IS_FRONT_MATTER"), Qt2 = [];
        function qo2(t) {
          return !!t?.[Gn2];
        }
        var pe2 = qo2;
        var Kn2 = /* @__PURE__ */ new Set(["yaml", "toml"]), je2 = ({ node: t }) => pe2(t) && Kn2.has(t.language);
        async function Zt2(t, e, r, n) {
          let { node: u } = r, { language: o } = u;
          if (!Kn2.has(o)) return;
          let i = u.value.trim(), D;
          if (i) {
            let s = o === "yaml" ? o : st2(n, { language: o });
            if (!s) return;
            D = i ? await t(i, { parser: s }) : "";
          } else D = i;
          return Xe2([u.startDelimiter, u.explicitLanguage ?? "", W2, D, D ? W2 : "", u.endDelimiter]);
        }
        function Xo2(t, e) {
          return je2({ node: t }) && (delete e.end, delete e.raw, delete e.value), e;
        }
        var er2 = Xo2;
        function Qo2({ node: t }) {
          return t.raw;
        }
        var tr2 = Qo2;
        var Hn2 = /* @__PURE__ */ new Set(["tokens", "comments", "parent", "enclosingNode", "precedingNode", "followingNode"]), Zo2 = (t) => Object.keys(t).filter((e) => !Hn2.has(e));
        function ei2(t, e) {
          let r = t ? (n) => t(n, Hn2) : Zo2;
          return e ? new Proxy(r, { apply: (n, u, o) => pe2(o[0]) ? Qt2 : Reflect.apply(n, u, o) }) : r;
        }
        var rr2 = ei2;
        function nr2(t, e) {
          if (!e) throw new Error("parserName is required.");
          let r = Xt2(0, t, (u) => u.parsers && le2(u.parsers, e));
          if (r) return r;
          let n = `Couldn't resolve parser "${e}".`;
          throw n += " Plugins must be explicitly added to the standalone bundle.", new Le2(n);
        }
        function Jn2(t, e) {
          if (!e) throw new Error("astFormat is required.");
          let r = Xt2(0, t, (u) => u.printers && le2(u.printers, e));
          if (r) return r;
          let n = `Couldn't find plugin for AST format "${e}".`;
          throw n += " Plugins must be explicitly added to the standalone bundle.", new Le2(n);
        }
        function Ue2({ plugins: t, parser: e }) {
          let r = nr2(t, e);
          return ur2(r, e);
        }
        function ur2(t, e) {
          let r = t.parsers[e];
          return typeof r == "function" ? r() : r;
        }
        async function qn2(t, e) {
          let r = t.printers[e], n = typeof r == "function" ? await r() : r;
          return ni2(n);
        }
        function ti2(t) {
          let { features: e, getVisitorKeys: r, embed: n, massageAstNode: u, print: o, ...i } = t;
          e = si2(e);
          let D = e.experimental_frontMatterSupport;
          r = rr2(r, D.massageAstNode || D.embed || D.print);
          let s = u;
          u && D.massageAstNode && (s = new Proxy(u, { apply(l, m, f) {
            return er2(...f), Reflect.apply(l, m, f);
          } }));
          let a = n;
          if (n) {
            let l;
            a = new Proxy(n, { get(m, f, F) {
              return f === "getVisitorKeys" ? (l ?? (l = n.getVisitorKeys ? rr2(n.getVisitorKeys, D.massageAstNode || D.embed) : r), l) : Reflect.get(m, f, F);
            }, apply: (m, f, F) => D.embed && je2(...F) ? Zt2 : Reflect.apply(m, f, F) });
          }
          let c = o;
          return D.print && (c = new Proxy(o, { apply(l, m, f) {
            let [F] = f;
            return pe2(F.node) ? tr2(F) : Reflect.apply(l, m, f);
          } })), { features: e, getVisitorKeys: r, embed: a, massageAstNode: s, print: c, ...i };
        }
        var ri2 = /* @__PURE__ */ new WeakMap();
        function ni2(t) {
          return Fe2(ri2, t, ti2);
        }
        var ui2 = ["clean", "embed", "print"], oi2 = Object.fromEntries(ui2.map((t) => [t, false]));
        function ii2(t) {
          return { ...oi2, ...t };
        }
        function si2(t) {
          return { experimental_avoidAstMutation: false, ...t, experimental_frontMatterSupport: ii2(t?.experimental_frontMatterSupport) };
        }
        var Xn2 = { astFormat: "estree", printer: {}, originalText: void 0, locStart: null, locEnd: null, getVisitorKeys: null };
        async function Di2(t, e = {}) {
          let r = { ...t };
          if (!r.parser) {
            if (!r.filepath) throw new Me2("No parser and no file path given, couldn't infer a parser.");
            if (r.parser = st2(r, { physicalFile: r.filepath }), !r.parser) throw new Me2(`No parser could be inferred for file "${r.filepath}".`);
          }
          let n = it2({ plugins: t.plugins, showDeprecated: true }).options, u = { ...Xn2, ...Object.fromEntries(n.filter((p) => p.default !== void 0).map((p) => [p.name, p.default])) }, o = nr2(r.plugins, r.parser), i = await ur2(o, r.parser);
          r.astFormat = i.astFormat, r.locEnd = i.locEnd, r.locStart = i.locStart;
          let D = o.printers?.[i.astFormat] ? o : Jn2(r.plugins, i.astFormat), s = await qn2(D, i.astFormat);
          r.printer = s, r.getVisitorKeys = s.getVisitorKeys;
          let a = D.defaultOptions ? Object.fromEntries(Object.entries(D.defaultOptions).filter(([, p]) => p !== void 0)) : {}, c = { ...u, ...a };
          for (let [p, l] of Object.entries(c)) r[p] ?? (r[p] = l);
          return r.parser === "json" && (r.trailingComma = "none"), zn2(r, n, { passThrough: Object.keys(Xn2), ...e });
        }
        var se2 = Di2;
        var Qn2 = /\r\n|[\n\r\u2028\u2029]/;
        function ai2(t, e, r, n) {
          let u = { column: null, line: -1, ...t.start }, o = { ...u, ...t.end }, { linesAbove: i = 2, linesBelow: D = 3 } = r || {}, s = u.line - n, a = u.column, c = o.line - n, p = o.column, l = Math.max(s - (i + 1), 0), m = Math.min(e.length, c + D);
          s === -1 && (l = 0), c === -1 && (m = e.length);
          let f = c - s, F = {};
          if (f) for (let d = 0; d <= f; d++) {
            let E = d + s;
            if (a == null) F[E] = true;
            else if (d === 0) {
              let C = e[E - 1].length;
              F[E] = [a, C - a];
            } else if (d === f) F[E] = [0, p];
            else {
              let C = e[E - 1].length;
              F[E] = [0, C];
            }
          }
          else if (a === p) a != null ? F[s] = [a, 0] : F[s] = true;
          else {
            let d = a ?? 0, E = p ?? d;
            F[s] = [d, E - d];
          }
          return { start: l, end: m, markerLines: F };
        }
        function Zn2(t, e, r = {}, n) {
          let { defs: u, highlight: o } = n || { defs: { gutter: String, marker: String, message: String, reset: String }, highlight: String }, i = (r.startLine || 1) - 1, D = t.split(Qn2), { start: s, end: a, markerLines: c } = ai2(e, D, r, i), p = e.start && typeof e.start.column == "number", l = String(a + i).length, f = o(t).split(Qn2, a).slice(s, a).map((F, d) => {
            let E = s + 1 + d, h = ` ${` ${E + i}`.slice(-l)} |`, _ = c[E], P = !c[E + 1];
            if (_) {
              let A = "";
              if (Array.isArray(_)) {
                let B = F.slice(0, _[0]).replace(/[^\t]/g, " "), J = _[1] || 1;
                A = [`
 `, u.gutter(h.replace(/\d/g, " ")), " ", B, u.marker("^").repeat(J)].join(""), P && r.message && (A += " " + u.message(r.message));
              }
              return [u.marker(">"), u.gutter(h), F.length > 0 ? ` ${F}` : "", A].join("");
            } else return ` ${u.gutter(h)}${F.length > 0 ? ` ${F}` : ""}`;
          }).join(`
`);
          return r.message && !p && (f = `${" ".repeat(l + 1)}${r.message}
${f}`), u.reset(f);
        }
        function eu2(t, e, r = {}) {
          return Zn2(t, e, r);
        }
        async function ci2(t, e) {
          let r = await Ue2(e), n = r.preprocess ? await r.preprocess(t, e) : t;
          e.originalText = n;
          let u;
          try {
            u = await r.parse(n, e, e);
          } catch (o) {
            fi2(o, t);
          }
          return { text: n, ast: u };
        }
        function fi2(t, e) {
          let { loc: r } = t;
          if (r) {
            let { start: n, end: u } = r;
            n && (n = { line: n.line, column: n.column - 1 }), u && (u = { line: u.line, column: u.column - 1 });
            let o = eu2(e, { start: n, end: u }, { highlightCode: true });
            t.message += `
` + o, t.codeFrame = o;
          }
          throw t;
        }
        var me2 = ci2;
        async function tu2(t, e, r, n, u) {
          if (r.embeddedLanguageFormatting !== "auto") return;
          let { printer: o } = r, { embed: i } = o;
          if (!i) return;
          if (i.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed");
          let { hasPrettierIgnore: D } = o, { getVisitorKeys: s } = i, a = [];
          l();
          let c = t.stack;
          for (let { print: m, node: f, pathStack: F } of a) try {
            t.stack = F;
            let d = await m(p, e, t, r);
            d && u.set(f, d);
          } catch (d) {
            if (globalThis.PRETTIER_DEBUG) throw d;
          }
          t.stack = c;
          function p(m, f) {
            return li2(m, f, r, n);
          }
          function l() {
            let { node: m } = t;
            if (m === null || typeof m != "object" || D?.(t)) return;
            for (let F of s(m)) Array.isArray(m[F]) ? t.each(l, F) : t.call(l, F);
            let f = i(t, r);
            if (f) {
              if (typeof f == "function") {
                a.push({ print: f, node: m, pathStack: [...t.stack] });
                return;
              }
              u.set(m, f);
            }
          }
        }
        async function li2(t, e, r, n) {
          let u = await se2({ ...r, ...e, parentParser: r.parser, originalText: t, cursorOffset: void 0, rangeStart: void 0, rangeEnd: void 0 }, { passThrough: true }), { ast: o } = await me2(t, u), i = await n(o, u);
          return He2(i);
        }
        function pi2(t, e, r, n) {
          let { originalText: u, [ue2]: o, locStart: i, locEnd: D, [/* @__PURE__ */ Symbol.for("printedComments")]: s } = e, { node: a } = t, c = i(a), p = D(a);
          for (let m of o) i(m) >= c && D(m) <= p && s.add(m);
          let { printPrettierIgnored: l } = e.printer;
          return l ? l(t, e, r, n) : u.slice(c, p);
        }
        var ru2 = pi2;
        async function Ve2(t, e) {
          ({ ast: t } = await or2(t, e));
          let r = /* @__PURE__ */ new Map(), n = new tn2(t), u = Fn2(e), o = /* @__PURE__ */ new Map();
          await tu2(n, D, e, Ve2, o);
          let i = await nu2(n, e, D, void 0, o);
          if (dn2(e), e.cursorOffset >= 0) {
            if (e.nodeAfterCursor && !e.nodeBeforeCursor) return [ee2, i];
            if (e.nodeBeforeCursor && !e.nodeAfterCursor) return [i, ee2];
          }
          return i;
          function D(a, c) {
            return a === void 0 || a === n ? s(c) : Array.isArray(a) ? n.call(() => s(c), ...a) : n.call(() => s(c), a);
          }
          function s(a) {
            u(n);
            let c = n.node;
            if (c == null) return "";
            let p = ge2(c) && a === void 0;
            if (p && r.has(c)) return r.get(c);
            let l = nu2(n, e, D, a, o);
            return p && r.set(c, l), l;
          }
        }
        function nu2(t, e, r, n, u) {
          let { node: o } = t, { printer: i } = e, D;
          switch (i.hasPrettierIgnore?.(t) ? D = ru2(t, e, r, n) : u.has(o) ? D = u.get(o) : D = i.print(t, e, r, n), o) {
            case e.cursorNode:
              D = Ee2(D, (s) => [ee2, s, ee2]);
              break;
            case e.nodeBeforeCursor:
              D = Ee2(D, (s) => [s, ee2]);
              break;
            case e.nodeAfterCursor:
              D = Ee2(D, (s) => [ee2, s]);
              break;
          }
          return i.printComment && rt2(o.comments) && !i.willPrintOwnComments?.(t, e) && (D = mn2(t, D, e)), D;
        }
        async function or2(t, e) {
          let r = t.comments ?? [];
          e[ue2] = r, e[/* @__PURE__ */ Symbol.for("printedComments")] = /* @__PURE__ */ new Set(), cn2(t, e);
          let { printer: { preprocess: n } } = e;
          return t = n ? await n(t, e) : t, { ast: t, comments: r };
        }
        function mi2(t, e) {
          let { cursorOffset: r, locStart: n, locEnd: u, getVisitorKeys: o } = e, i = (m) => n(m) <= r && u(m) >= r, D = t, s = [t];
          for (let m of un2(t, { getVisitorKeys: o, filter: i })) s.push(m), D = m;
          if (on2(D, { getVisitorKeys: o })) return { cursorNode: D };
          let a, c, p = -1, l = Number.POSITIVE_INFINITY;
          for (; s.length > 0 && (a === void 0 || c === void 0); ) {
            D = s.pop();
            let m = a !== void 0, f = c !== void 0;
            for (let F of ye2(D, { getVisitorKeys: o })) {
              if (!m) {
                let d = u(F);
                d <= r && d > p && (a = F, p = d);
              }
              if (!f) {
                let d = n(F);
                d >= r && d < l && (c = F, l = d);
              }
            }
          }
          return { nodeBeforeCursor: a, nodeAfterCursor: c };
        }
        var ir2 = mi2;
        function di2(t, e) {
          let { printer: r } = e, n = r.massageAstNode;
          if (!n) return t;
          let { getVisitorKeys: u } = r, { ignoredProperties: o } = n;
          return i(t);
          function i(D, s) {
            if (!ge2(D)) return D;
            if (Array.isArray(D)) return D.map((l) => i(l, s)).filter(Boolean);
            let a = {}, c = new Set(u(D));
            for (let l in D) !le2(D, l) || o?.has(l) || (c.has(l) ? a[l] = i(D[l], D) : a[l] = D[l]);
            let p = n(D, a, s);
            if (p !== null) return p ?? a;
          }
        }
        var uu2 = di2;
        var Fi2 = Array.prototype.findLastIndex ?? function(t) {
          for (let e = this.length - 1; e >= 0; e--) {
            let r = this[e];
            if (t(r, e, this)) return e;
          }
          return -1;
        }, Ei2 = X2("findLastIndex", function() {
          if (Array.isArray(this)) return Fi2;
        }), ou2 = Ei2;
        function Ci2(t, e) {
          return e = new Set(e), t.find((r) => Du2.has(r.type) && e.has(r));
        }
        function iu2(t) {
          let e = ou2(0, t, (r) => r.type !== "Program" && r.type !== "File");
          return e === -1 ? t : t.slice(0, e + 1);
        }
        function hi2(t, e, { locStart: r, locEnd: n }) {
          let [u, ...o] = t, [i, ...D] = e;
          if (u === i) return [u, i];
          let s = r(u);
          for (let c of iu2(D)) if (r(c) >= s) i = c;
          else break;
          let a = n(i);
          for (let c of iu2(o)) {
            if (n(c) <= a) u = c;
            else break;
            if (u === i) break;
          }
          return [u, i];
        }
        function sr2(t, e, r, n, u = [], o, i) {
          let { locStart: D, locEnd: s } = i, a = D(t), c = s(t);
          if (e > c || e < a || o === "rangeEnd" && e === a || o === "rangeStart" && e === c) return;
          let p = [t, ...u], l = ot2(t, p, { cache: Vt2, locStart: D, locEnd: s, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes });
          for (let m of l) {
            let f = sr2(m, e, r, n, p, o, i);
            if (f) return f;
          }
          if (n(t, u[0])) return p;
        }
        function gi(t, e) {
          return e !== "DeclareExportDeclaration" && t !== "TypeParameterDeclaration" && (t === "Directive" || t === "TypeAlias" || t === "TSExportAssignment" || t.startsWith("Declare") || t.startsWith("TSDeclare") || t.endsWith("Statement") || t.endsWith("Declaration"));
        }
        var Du2 = /* @__PURE__ */ new Set(["JsonRoot", "ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]), _i2 = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
        function su2(t, e, r) {
          if (!e) return false;
          switch (t.parser) {
            case "flow":
            case "hermes":
            case "babel":
            case "babel-flow":
            case "babel-ts":
            case "typescript":
            case "acorn":
            case "espree":
            case "meriyah":
            case "oxc":
            case "oxc-ts":
            case "yuku":
            case "yuku-ts":
            case "__babel_estree":
              return gi(e.type, r?.type);
            case "json":
            case "json5":
            case "jsonc":
            case "json-stringify":
              return Du2.has(e.type);
            case "graphql":
              return _i2.has(e.kind);
            case "vue":
              return e.tag !== "root";
          }
          return false;
        }
        function au2(t, e, r) {
          let { rangeStart: n, rangeEnd: u } = e;
          k2(u > n);
          let o = t.slice(n, u).search(/\S/), i = o === -1;
          if (!i) for (n += o; u > n && !/\S/.test(t[u - 1]); --u) ;
          let D = e.printer.features?.experimental_locForRangeFormat ?? e, s = sr2(r, n, e, (f, F) => su2(e, f, F), [], "rangeStart", D);
          if (!s) return;
          let a = i ? s : sr2(r, u, e, (f) => su2(e, f), [], "rangeEnd", D);
          if (!a) return;
          let c, p;
          if (r.type === "JsonRoot") {
            let f = Ci2(s, a);
            c = f, p = f;
          } else [c, p] = hi2(s, a, e);
          let { locStart: l, locEnd: m } = D;
          return [Math.min(l(c), l(p)), Math.max(m(c), m(p))];
        }
        var pu2 = "\uFEFF", cu2 = /* @__PURE__ */ Symbol("cursor");
        async function mu2(t, e, r = 0) {
          if (!t || t.trim().length === 0) return { formatted: "", cursorOffset: -1, comments: [] };
          let { ast: n, text: u } = await me2(t, e);
          e.cursorOffset >= 0 && (e = { ...e, ...ir2(n, e) });
          let o = await Ve2(n, e, r);
          r > 0 && (o = Qe2([W2, o], r, e.tabWidth));
          let i = Ce2(o, e);
          if (r > 0) {
            let s = i.formatted.trim();
            i.cursorNodeStart !== void 0 && (i.cursorNodeStart -= i.formatted.indexOf(s), i.cursorNodeStart < 0 && (i.cursorNodeStart = 0, i.cursorNodeText = i.cursorNodeText.trimStart()), i.cursorNodeStart + i.cursorNodeText.length > s.length && (i.cursorNodeText = i.cursorNodeText.trimEnd())), i.formatted = s + we2(e.endOfLine);
          }
          let D = e[ue2];
          if (e.cursorOffset >= 0) {
            let s, a, c, p;
            if ((e.cursorNode || e.nodeBeforeCursor || e.nodeAfterCursor) && i.cursorNodeText) if (c = i.cursorNodeStart, p = i.cursorNodeText, e.cursorNode) s = e.locStart(e.cursorNode), a = u.slice(s, e.locEnd(e.cursorNode));
            else {
              if (!e.nodeBeforeCursor && !e.nodeAfterCursor) throw new Error("Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor");
              s = e.nodeBeforeCursor ? e.locEnd(e.nodeBeforeCursor) : 0;
              let E = e.nodeAfterCursor ? e.locStart(e.nodeAfterCursor) : u.length;
              a = u.slice(s, E);
            }
            else s = 0, a = u, c = 0, p = i.formatted;
            let l = e.cursorOffset - s;
            if (a === p) return { formatted: i.formatted, cursorOffset: c + l, comments: D };
            let m = a.split("");
            m.splice(l, 0, cu2);
            let f = p.split(""), F = Bt2(m, f), d = c;
            for (let E of F) if (E.removed) {
              if (E.value.includes(cu2)) break;
            } else d += E.count;
            return { formatted: i.formatted, cursorOffset: d, comments: D };
          }
          return { formatted: i.formatted, cursorOffset: -1, comments: D };
        }
        async function yi2(t, e) {
          let { ast: r, text: n } = await me2(t, e), [u, o] = au2(n, e, r) ?? [0, 0], i = n.slice(u, o), D = Math.min(u, n.lastIndexOf(`
`, u) + 1), s = n.slice(D, u).match(/^\s*/)[0], a = he2(s, e.tabWidth), c = await mu2(i, { ...e, rangeStart: 0, rangeEnd: Number.POSITIVE_INFINITY, cursorOffset: e.cursorOffset > u && e.cursorOffset <= o ? e.cursorOffset - u : -1, endOfLine: "lf" }, a), p = c.formatted.trimEnd(), { cursorOffset: l } = e;
          l > o ? l += p.length - i.length : c.cursorOffset >= 0 && (l = c.cursorOffset + u);
          let m = n.slice(0, u) + p + n.slice(o);
          if (e.endOfLine !== "lf") {
            let f = we2(e.endOfLine);
            l >= 0 && f === `\r
` && (l += Nt2(m.slice(0, l), `
`)), m = ne2(0, m, `
`, f);
          }
          return { formatted: m, cursorOffset: l, comments: c.comments };
        }
        function Dr2(t, e, r) {
          return typeof e != "number" || Number.isNaN(e) || e < 0 || e > t.length ? r : e;
        }
        function fu2(t, e) {
          let { cursorOffset: r, rangeStart: n, rangeEnd: u } = e;
          return r = Dr2(t, r, -1), n = Dr2(t, n, 0), u = Dr2(t, u, t.length), { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u };
        }
        function du2(t, e) {
          let { cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o } = fu2(t, e), i = t.charAt(0) === pu2;
          if (i && (t = t.slice(1), r--, n--, u--), o === "auto" && (o = hr2(t)), t.includes("\r")) {
            let D = (s) => Nt2(t.slice(0, Math.max(s, 0)), `\r
`);
            r -= D(r), n -= D(n), u -= D(u), t = gr2(t);
          }
          return { hasBOM: i, text: t, options: fu2(t, { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o }) };
        }
        async function lu2(t, e) {
          let r = await Ue2(e);
          return !r.hasPragma || r.hasPragma(t);
        }
        async function Ai2(t, e) {
          return (await Ue2(e)).hasIgnorePragma?.(t);
        }
        async function ar2(t, e) {
          let { hasBOM: r, text: n, options: u } = du2(t, await se2(e));
          if (u.rangeStart >= u.rangeEnd && n !== "" || u.requirePragma && !await lu2(n, u) || u.checkIgnorePragma && await Ai2(n, u)) return { formatted: t, cursorOffset: e.cursorOffset, comments: [] };
          let o;
          return u.rangeStart > 0 || u.rangeEnd < n.length ? o = await yi2(n, u) : (!u.requirePragma && u.insertPragma && u.printer.insertPragma && !await lu2(n, u) && (n = u.printer.insertPragma(n)), o = await mu2(n, u)), r && (o.formatted = pu2 + o.formatted, o.cursorOffset >= 0 && o.cursorOffset++), o;
        }
        async function Fu2(t, e, r) {
          let { text: n, options: u } = du2(t, await se2(e)), o = await me2(n, u);
          return r && (r.preprocessForPrint && (o.ast = await or2(o.ast, u)), r.massage && (o.ast = uu2(o.ast, u))), o;
        }
        async function Eu2(t, e) {
          e = await se2(e);
          let r = await Ve2(t, e);
          return Ce2(r, e);
        }
        async function Cu2(t, e) {
          let r = Vr2(t), { formatted: n } = await ar2(r, { ...e, parser: "__js_expression" });
          return n;
        }
        async function hu2(t, e) {
          e = await se2(e);
          let { ast: r } = await me2(t, e);
          return e.cursorOffset >= 0 && (e = { ...e, ...ir2(r, e) }), Ve2(r, e);
        }
        async function gu2(t, e) {
          return Ce2(t, await se2(e));
        }
        var cr2 = {};
        At2(cr2, { builders: () => Bi2, printer: () => Ti2, utils: () => Ni2 });
        var Bi2 = { join: be2, line: Ze2, softline: Yr2, hardline: W2, literalline: Je2, group: Ot2, conditionalGroup: Rr2, fill: Ir2, lineSuffix: Ie2, lineSuffixBoundary: jr2, cursor: ee2, breakParent: ae2, ifBreak: vr2, trim: Ur2, indent: oe2, indentIfBreak: Lr2, align: De2, addAlignmentToDoc: Qe2, markAsRoot: Xe2, dedentToRoot: br2, dedent: kr2, hardlineWithoutBreakParent: ke2, literallineWithoutBreakParent: Pt2, label: Mr2, concat: (t) => t }, Ti2 = { printDocToString: Ce2 }, Ni2 = { willBreak: Br2, traverseDoc: Oe2, findInDoc: Ke2, mapDoc: Se2, removeLines: Nr2, stripTrailingHardline: He2, replaceEndOfLine: wr2, canBreak: Or2 };
        var _u2 = "3.9.6";
        var lr = {};
        At2(lr, { addDanglingComment: () => re2, addLeadingComment: () => ce2, addTrailingComment: () => fe2, getAlignmentSize: () => he2, getIndentSize: () => yu2, getMaxContinuousCount: () => Au2, getNextNonSpaceNonCommentCharacter: () => xu2, getNextNonSpaceNonCommentCharacterIndex: () => ji2, getPreferredQuote: () => Nu2, getStringWidth: () => Re2, hasNewline: () => H2, hasNewlineInRange: () => wu2, hasSpaces: () => Ou2, isNextLineEmpty: () => zi, isNextLineEmptyAfterIndex: () => gt2, isPreviousLineEmpty: () => Vi2, makeString: () => $i2, skip: () => _e2, skipEverythingButNewLine: () => ut2, skipInlineComment: () => Be2, skipNewline: () => $2, skipSpaces: () => j2, skipToLineEnd: () => nt2, skipTrailingComment: () => Te2, skipWhitespace: () => rn2 });
        function wi2(t, e) {
          if (e === false) return false;
          if (t.charAt(e) === "/" && t.charAt(e + 1) === "*") {
            for (let r = e + 2; r < t.length; ++r) if (t.charAt(r) === "*" && t.charAt(r + 1) === "/") return r + 2;
          }
          return e;
        }
        var Be2 = wi2;
        function Oi2(t, e) {
          return e === false ? false : t.charAt(e) === "/" && t.charAt(e + 1) === "/" ? ut2(t, e) : e;
        }
        var Te2 = Oi2;
        function Pi2(t, e) {
          let r = null, n = e;
          for (; n !== r; ) r = n, n = j2(t, n), n = Be2(t, n), n = Te2(t, n), n = $2(t, n);
          return n;
        }
        var We2 = Pi2;
        function Si2(t, e) {
          let r = null, n = e;
          for (; n !== r; ) r = n, n = nt2(t, n), n = Be2(t, n), n = j2(t, n);
          return n = Te2(t, n), n = $2(t, n), n !== false && H2(t, n);
        }
        var gt2 = Si2;
        function bi2(t, e) {
          let r = t.lastIndexOf(`
`);
          return r === -1 ? 0 : he2(t.slice(r + 1).match(/^[\t ]*/)[0], e);
        }
        var yu2 = bi2;
        function fr2(t) {
          if (typeof t != "string") throw new TypeError("Expected a string");
          return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
        }
        function ki2(t, e) {
          let r = t.matchAll(new RegExp(`(?:${fr2(e)})+`, "g"));
          return r.reduce || (r = [...r]), r.reduce((n, [u]) => Math.max(n, u.length), 0) / e.length;
        }
        var Au2 = ki2;
        function Ii2(t, e) {
          let r = We2(t, e);
          return r === false ? "" : t.charAt(r);
        }
        var xu2 = Ii2;
        var Bu2 = Object.freeze({ character: "'", codePoint: 39 }), Tu2 = Object.freeze({ character: '"', codePoint: 34 }), Ri2 = Object.freeze({ preferred: Bu2, alternate: Tu2 }), vi2 = Object.freeze({ preferred: Tu2, alternate: Bu2 });
        function Nu2(t, e) {
          let { preferred: r, alternate: n } = e === true || e === "'" ? Ri2 : vi2, { length: u } = t, o = 0, i = 0;
          for (let D = 0; D < u; D++) {
            let s = t.charCodeAt(D);
            s === r.codePoint ? o++ : s === n.codePoint && i++;
          }
          return (o > i ? n : r).character;
        }
        function Li2(t, e, r) {
          for (let n = e; n < r; ++n) if (t.charAt(n) === `
`) return true;
          return false;
        }
        var wu2 = Li2;
        function Mi2(t, e, r = {}) {
          return j2(t, r.backwards ? e - 1 : e, r) !== e;
        }
        var Ou2 = Mi2;
        function Yi2(t, e, r) {
          return We2(t, r(e));
        }
        function ji2(t, e) {
          return arguments.length === 2 || typeof e == "number" ? We2(t, e) : Yi2(...arguments);
        }
        function Ui2(t, e, r) {
          return ve2(t, r(e));
        }
        function Vi2(t, e) {
          return arguments.length === 2 || typeof e == "number" ? ve2(t, e) : Ui2(...arguments);
        }
        function Wi2(t, e, r) {
          return gt2(t, r(e));
        }
        function $i2(t, e, r) {
          let n = e === '"' ? "'" : '"', o = ne2(0, t, /\\(.)|(["'])/gs, (i, D, s) => D === n ? D : s === e ? "\\" + s : s || (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(D) ? D : "\\" + D));
          return e + o + e;
        }
        function zi(t, e) {
          return arguments.length === 2 || typeof e == "number" ? gt2(t, e) : Wi2(...arguments);
        }
        function de2(t, e = 1) {
          return async (...r) => {
            let n = r[e] ?? {}, u = n.plugins ?? [];
            return r[e] = { ...n, plugins: Array.isArray(u) ? u : Object.values(u) }, await t(...r);
          };
        }
        var Pu2 = de2(ar2);
        async function Su2(t, e) {
          let { formatted: r } = await Pu2(t, { ...e, cursorOffset: -1 });
          return r;
        }
        async function Gi(t, e) {
          return await Su2(t, e) === t;
        }
        var Ki = de2(it2, 0), Hi = { parse: de2(Fu2), formatAST: de2(Eu2), formatDoc: de2(Cu2), printToDoc: de2(hu2), printDocToString: de2(gu2) };
        return Yu2(Ji);
      });
    }
  });

  // fs-stub.cjs
  var require_fs_stub = __commonJS({
    "fs-stub.cjs"(exports, module) {
      var noop = () => {
      };
      module.exports = {
        readFileSync: () => {
          throw new Error("fs.readFileSync unavailable in browser");
        },
        writeFileSync: noop,
        existsSync: () => false,
        statSync: () => ({ isFile: () => false, isDirectory: () => false }),
        readdirSync: () => [],
        mkdirSync: noop,
        unlinkSync: noop,
        promises: {}
      };
    }
  });

  // path-polyfill.cjs
  var require_path_polyfill = __commonJS({
    "path-polyfill.cjs"(exports, module) {
      function basename(p, ext) {
        p = String(p == null ? "" : p);
        let i = p.lastIndexOf("/");
        if (i < 0) i = p.lastIndexOf("\\");
        let b2 = p.slice(i + 1);
        if (ext) {
          if (b2.endsWith(ext)) b2 = b2.slice(0, b2.length - ext.length);
        }
        return b2;
      }
      function dirname(p) {
        p = String(p == null ? "" : p);
        let i = p.lastIndexOf("/");
        if (i < 0) i = p.lastIndexOf("\\");
        if (i < 0) return ".";
        if (i === 0) return "/";
        return p.slice(0, i);
      }
      function extname(p) {
        p = String(p == null ? "" : p);
        const b2 = basename(p);
        const i = b2.lastIndexOf(".");
        return i > 0 ? b2.slice(i) : "";
      }
      function join(...args) {
        const parts = [];
        for (const a of args) {
          if (!a) continue;
          for (const s of String(a).split("/")) {
            if (s === "" || s === ".") continue;
            if (s === "..") parts.pop();
            else parts.push(s);
          }
        }
        return parts.join("/");
      }
      var path = {
        sep: "/",
        delimiter: ":",
        basename,
        dirname,
        extname,
        join,
        resolve: (...a) => "/" + join(...a),
        normalize: (p) => join(p),
        relative: () => "",
        isAbsolute: (p) => String(p).startsWith("/"),
        parse: (p) => ({ root: "/", dir: dirname(p), base: basename(p), ext: extname(p), name: basename(p, extname(p)) })
      };
      path.posix = Object.assign({}, path);
      path.win32 = Object.assign({}, path, { sep: "\\", delimiter: ";" });
      module.exports = path;
    }
  });

  // node_modules/@prettier/plugin-php/standalone.js
  var require_standalone2 = __commonJS({
    "node_modules/@prettier/plugin-php/standalone.js"(exports, module) {
      !(function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports, require_standalone(), require_fs_stub(), require_path_polyfill()) : "function" == typeof define && define.amd ? define(["exports", "prettier/standalone", "fs", "path"], e) : e(((t = "undefined" != typeof globalThis ? globalThis : t || self).prettierPlugins = t.prettierPlugins || {}, t.prettierPlugins.php = {}), t.prettier, t.fs, t.path);
      })(exports, (function(t, e, s, i) {
        "use strict";
        function n(t2) {
          return t2 && t2.__esModule && Object.prototype.hasOwnProperty.call(t2, "default") ? t2.default : t2;
        }
        var r = { exports: {} }, o = { attributeIndex: 0, attributeListDepth: {}, matchST_ATTRIBUTE() {
          const t2 = this.input();
          if (this.is_WHITESPACE()) {
            do {
              this.input();
            } while (this.is_WHITESPACE());
            return this.unput(1), null;
          }
          switch (t2) {
            case "]":
              return 0 === this.attributeListDepth[this.attributeIndex] ? (delete this.attributeListDepth[this.attributeIndex], this.attributeIndex--, this.popState()) : this.attributeListDepth[this.attributeIndex]--, "]";
            case "(":
            case ")":
            case ":":
            case "=":
            case "|":
            case "&":
            case "^":
            case "-":
            case "+":
            case "*":
            case "%":
            case "~":
            case "<":
            case ">":
            case "!":
            case ".":
              return this.consume_TOKEN();
            case "[":
              return this.attributeListDepth[this.attributeIndex]++, "[";
            case ",":
              return ",";
            case '"':
              return this.ST_DOUBLE_QUOTES();
            case "'":
              return this.T_CONSTANT_ENCAPSED_STRING();
            case "/":
              return "/" === this._input[this.offset] ? this.T_COMMENT() : "*" === this._input[this.offset] ? (this.input(), this.T_DOC_COMMENT()) : this.consume_TOKEN();
          }
          if (this.is_LABEL_START() || "\\" === t2) {
            for (; this.offset < this.size; ) {
              const t3 = this.input();
              if (!this.is_LABEL() && "\\" !== t3) {
                t3 && this.unput(1);
                break;
              }
            }
            return this.T_STRING();
          }
          if (this.is_NUM()) return this.consume_NUM();
          throw new Error(`Bad terminal sequence "${t2}" at line ${this.yylineno} (offset ${this.offset})`);
        } }, h = { T_COMMENT() {
          for (; this.offset < this.size; ) {
            const t2 = this.input();
            if ("\n" === t2 || "\r" === t2) return this.tok.T_COMMENT;
            if ("?" === t2 && !this.aspTagMode && ">" === this._input[this.offset]) return this.unput(1), this.tok.T_COMMENT;
            if ("%" === t2 && this.aspTagMode && ">" === this._input[this.offset]) return this.unput(1), this.tok.T_COMMENT;
          }
          return this.tok.T_COMMENT;
        }, T_DOC_COMMENT() {
          let t2 = this.input(), e2 = this.tok.T_COMMENT;
          if ("*" === t2) {
            if (t2 = this.input(), this.is_WHITESPACE() && (e2 = this.tok.T_DOC_COMMENT), "/" === t2) return e2;
            this.unput(1);
          }
          for (; this.offset < this.size; ) if (t2 = this.input(), "*" === t2 && "/" === this._input[this.offset]) {
            this.input();
            break;
          }
          return e2;
        } }, a = { nextINITIAL() {
          return this.conditionStack.length > 1 && "INITIAL" === this.conditionStack[this.conditionStack.length - 1] ? this.popState() : this.begin("ST_IN_SCRIPTING"), this;
        }, matchINITIAL() {
          for (; this.offset < this.size; ) {
            let t2 = this.input();
            if ("<" == t2) {
              if (t2 = this.ahead(1), "?" == t2) {
                if (this.tryMatch("?=")) {
                  this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
                  break;
                }
                if (this.tryMatchCaseless("?php") && (t2 = this._input[this.offset + 4], " " === t2 || "	" === t2 || "\n" === t2 || "\r" === t2)) {
                  this.unput(1).appendToken(this.tok.T_OPEN_TAG, 6).nextINITIAL();
                  break;
                }
                if (this.short_tags) {
                  this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
                  break;
                }
              } else if (this.asp_tags && "%" == t2) {
                if (this.tryMatch("%=")) {
                  this.aspTagMode = true, this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
                  break;
                }
                this.aspTagMode = true, this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
                break;
              }
            }
          }
          return this.yytext.length > 0 && this.tok.T_INLINE_HTML;
        } };
        var c = { consume_NUM() {
          let t2 = this.yytext[0], e2 = "." === t2;
          if ("0" === t2) if (t2 = this.input(), "x" === t2 || "X" === t2) {
            if (t2 = this.input(), "_" !== t2 && this.is_HEX()) return this.consume_HNUM();
            this.unput(t2 ? 2 : 1);
          } else if ("b" === t2 || "B" === t2) {
            if (t2 = this.input(), "_" !== t2 && "0" === t2 || "1" === t2) return this.consume_BNUM();
            this.unput(t2 ? 2 : 1);
          } else if ("o" === t2 || "O" === t2) {
            if (t2 = this.input(), "_" !== t2 && this.is_OCTAL()) return this.consume_ONUM();
            this.unput(t2 ? 2 : 1);
          } else this.is_NUM() || t2 && this.unput(1);
          for (; this.offset < this.size; ) {
            const s2 = t2;
            if (t2 = this.input(), "_" === t2) {
              if ("_" === s2) {
                this.unput(2);
                break;
              }
              if ("." === s2) {
                this.unput(1);
                break;
              }
              if ("e" === s2 || "E" === s2) {
                this.unput(2);
                break;
              }
            } else {
              if ("." === t2) {
                if (e2) {
                  this.unput(1);
                  break;
                }
                if ("_" === s2) {
                  this.unput(2);
                  break;
                }
                e2 = true;
                continue;
              }
              if ("e" === t2 || "E" === t2) {
                if ("_" === s2) {
                  this.unput(1);
                  break;
                }
                let e3 = 2;
                if (t2 = this.input(), "+" !== t2 && "-" !== t2 || (e3 = 3, t2 = this.input()), this.is_NUM_START()) return this.consume_LNUM(), this.tok.T_DNUMBER;
                this.unput(t2 ? e3 : e3 - 1);
                break;
              }
            }
            if (!this.is_NUM()) {
              t2 && this.unput(1);
              break;
            }
          }
          return e2 ? this.tok.T_DNUMBER : this.yytext.length < 9 || this.yytext.length < 10 || 10 == this.yytext.length && this.yytext < "2147483648" ? this.tok.T_LNUMBER : this.tok.T_DNUMBER;
        }, consume_HNUM() {
          for (; this.offset < this.size; ) {
            const t2 = this.input();
            if (!this.is_HEX()) {
              t2 && this.unput(1);
              break;
            }
          }
          return this.tok.T_LNUMBER;
        }, consume_LNUM() {
          for (; this.offset < this.size; ) {
            const t2 = this.input();
            if (!this.is_NUM()) {
              t2 && this.unput(1);
              break;
            }
          }
          return this.tok.T_LNUMBER;
        }, consume_BNUM() {
          let t2;
          for (; this.offset < this.size; ) if (t2 = this.input(), "0" !== t2 && "1" !== t2 && "_" !== t2) {
            t2 && this.unput(1);
            break;
          }
          return this.tok.T_LNUMBER;
        }, consume_ONUM() {
          for (; this.offset < this.size; ) {
            const t2 = this.input();
            if (!this.is_OCTAL()) {
              t2 && this.unput(1);
              break;
            }
          }
          return this.tok.T_LNUMBER;
        } }, l = { matchST_LOOKING_FOR_PROPERTY() {
          let t2 = this.input();
          if ("-" === t2) {
            if (t2 = this.input(), ">" === t2) return this.tok.T_OBJECT_OPERATOR;
            t2 && this.unput(1);
          } else {
            if (this.is_WHITESPACE()) return this.tok.T_WHITESPACE;
            if (this.is_LABEL_START()) return this.consume_LABEL(), this.popState(), this.tok.T_STRING;
          }
          return this.popState(), t2 && this.unput(1), false;
        }, matchST_LOOKING_FOR_VARNAME() {
          let t2 = this.input();
          if (this.popState(), this.begin("ST_IN_SCRIPTING"), this.is_LABEL_START()) {
            if (this.consume_LABEL(), t2 = this.input(), "[" === t2 || "}" === t2) return this.unput(1), this.tok.T_STRING_VARNAME;
            this.unput(this.yytext.length);
          } else t2 && this.unput(1);
          return false;
        }, matchST_VAR_OFFSET() {
          const t2 = this.input();
          if (this.is_NUM_START()) return this.consume_NUM(), this.tok.T_NUM_STRING;
          if ("]" === t2) return this.popState(), "]";
          if ("$" === t2) {
            if (this.input(), this.is_LABEL_START()) return this.consume_LABEL(), this.tok.T_VARIABLE;
            throw new Error("Unexpected terminal");
          }
          if (this.is_LABEL_START()) return this.consume_LABEL(), this.tok.T_STRING;
          if (this.is_WHITESPACE() || "\\" === t2 || "'" === t2 || "#" === t2) return this.tok.T_ENCAPSED_AND_WHITESPACE;
          if ("[" === t2 || "{" === t2 || "}" === t2 || '"' === t2 || "`" === t2 || this.is_TOKEN()) return t2;
          throw new Error("Unexpected terminal");
        } }, _ = { matchST_IN_SCRIPTING() {
          let t2 = this.input();
          switch (t2) {
            case " ":
            case "	":
            case "\n":
            case "\r":
            case "\r\n":
              return this.T_WHITESPACE();
            case "#":
              return this.version >= 800 && "[" === this._input[this.offset] ? (this.input(), this.attributeListDepth[++this.attributeIndex] = 0, this.begin("ST_ATTRIBUTE"), this.tok.T_ATTRIBUTE) : this.T_COMMENT();
            case "/":
              return "/" === this._input[this.offset] ? this.T_COMMENT() : "*" === this._input[this.offset] ? (this.input(), this.T_DOC_COMMENT()) : this.consume_TOKEN();
            case "'":
              return this.T_CONSTANT_ENCAPSED_STRING();
            case '"':
              return this.ST_DOUBLE_QUOTES();
            case "`":
              return this.begin("ST_BACKQUOTE"), "`";
            case "?":
              if (!this.aspTagMode && this.tryMatch(">")) {
                this.input();
                const t3 = this._input[this.offset];
                return "\n" !== t3 && "\r" !== t3 || this.input(), this.conditionStack.length > 1 && this.begin("INITIAL"), this.tok.T_CLOSE_TAG;
              }
              return this.consume_TOKEN();
            case "%":
              return this.aspTagMode && ">" === this._input[this.offset] ? (this.input(), t2 = this._input[this.offset], "\n" !== t2 && "\r" !== t2 || this.input(), this.aspTagMode = false, this.conditionStack.length > 1 && this.begin("INITIAL"), this.tok.T_CLOSE_TAG) : this.consume_TOKEN();
            case "{":
              return this.begin("ST_IN_SCRIPTING"), "{";
            case "}":
              return this.conditionStack.length > 2 && this.popState(), "}";
            default:
              if ("." === t2) {
                if (t2 = this.input(), this.is_NUM_START()) return this.consume_NUM();
                t2 && this.unput(1);
              }
              if (this.is_NUM_START()) return this.consume_NUM();
              if (this.is_LABEL_START()) return this.consume_LABEL().T_STRING();
              if (this.is_TOKEN()) return this.consume_TOKEN();
          }
          throw new Error('Bad terminal sequence "' + t2 + '" at line ' + this.yylineno + " (offset " + this.offset + ")");
        }, T_WHITESPACE() {
          for (; this.offset < this.size; ) {
            const t2 = this.input();
            if (" " !== t2 && "	" !== t2 && "\n" !== t2 && "\r" !== t2) {
              t2 && this.unput(1);
              break;
            }
          }
          return this.tok.T_WHITESPACE;
        } };
        const u = ["\n", "\r"], p = ["\n", "\r", ";"], d = p.concat(["	", " ", ",", "]", ")", "/", "=", "!", "."]);
        var f = { T_CONSTANT_ENCAPSED_STRING() {
          let t2;
          for (; this.offset < this.size; ) if (t2 = this.input(), "\\" == t2) this.input();
          else if ("'" == t2) break;
          return this.tok.T_CONSTANT_ENCAPSED_STRING;
        }, is_HEREDOC() {
          const t2 = this.offset;
          if ("<" === this._input[this.offset - 1] && "<" === this._input[this.offset] && "<" === this._input[this.offset + 1]) {
            if (this.offset += 3, this.is_TABSPACE()) for (; this.offset < this.size && (this.offset++, this.is_TABSPACE()); ) ;
            let e2 = this._input[this.offset - 1];
            if ("'" === e2 || '"' === e2 ? this.offset++ : e2 = null, this.is_LABEL_START()) {
              let s2 = this.offset - 1;
              for (; this.offset < this.size && (this.offset++, this.is_LABEL()); ) ;
              const i2 = this._input.substring(s2, this.offset - 1);
              if ((!e2 || e2 === this._input[this.offset - 1]) && (e2 && this.offset++, u.includes(this._input[this.offset - 1]))) return this.heredoc_label.label = i2, this.heredoc_label.length = i2.length, this.heredoc_label.finished = false, s2 = this.offset - t2, this.offset = t2, this.consume(s2), "'" === e2 ? this.begin("ST_NOWDOC") : this.begin("ST_HEREDOC"), this.prematch_ENDOFDOC(), this.tok.T_START_HEREDOC;
            }
          }
          return this.offset = t2, false;
        }, ST_DOUBLE_QUOTES() {
          let t2;
          for (; this.offset < this.size; ) if (t2 = this.input(), "\\" == t2) this.input();
          else {
            if ('"' == t2) break;
            if ("$" == t2) {
              if (t2 = this.input(), "{" == t2 || this.is_LABEL_START()) {
                this.unput(2);
                break;
              }
              t2 && this.unput(1);
            } else if ("{" == t2) {
              if (t2 = this.input(), "$" == t2) {
                this.unput(2);
                break;
              }
              t2 && this.unput(1);
            }
          }
          if ('"' == t2) return this.tok.T_CONSTANT_ENCAPSED_STRING;
          {
            let t3 = 1;
            return "b" !== this.yytext[0] && "B" !== this.yytext[0] || (t3 = 2), this.yytext.length > 2 && this.appendToken(this.tok.T_ENCAPSED_AND_WHITESPACE, this.yytext.length - t3), this.unput(this.yytext.length - t3), this.begin("ST_DOUBLE_QUOTES"), this.yytext;
          }
        }, isDOC_MATCH(t2, e2) {
          const s2 = this._input[t2 - 2];
          if (!u.includes(s2)) return false;
          let i2 = false, n2 = false, r2 = 0, o2 = this._input[t2 - 1];
          if (this.version >= 703) {
            for (; "	" === o2 || " " === o2; ) " " === o2 ? i2 = true : "	" === o2 && (n2 = true), o2 = this._input[t2 + r2], r2++;
            if (t2 += r2, u.includes(this._input[t2 - 1])) return false;
          }
          if (this._input.substring(t2 - 1, t2 - 1 + this.heredoc_label.length) === this.heredoc_label.label) {
            const s3 = this._input[t2 - 1 + this.heredoc_label.length];
            if ((this.version >= 703 ? d : p).includes(s3)) {
              if (e2) {
                if (this.consume(r2), i2 && n2) throw new Error("Parse error:  mixing spaces and tabs in ending marker at line " + this.yylineno + " (offset " + this.offset + ")");
              } else this.heredoc_label.indentation = r2, this.heredoc_label.indentation_uses_spaces = i2, this.heredoc_label.first_encaps_node = true;
              return true;
            }
          }
          return false;
        }, prematch_ENDOFDOC() {
          this.heredoc_label.indentation_uses_spaces = false, this.heredoc_label.indentation = 0, this.heredoc_label.first_encaps_node = true;
          let t2 = this.offset + 1;
          for (; t2 < this._input.length; ) {
            if (this.isDOC_MATCH(t2, false)) return;
            if (!u.includes(this._input[t2 - 1])) for (; !u.includes(this._input[t2++]) && t2 < this._input.length; ) ;
            t2++;
          }
        }, matchST_NOWDOC() {
          if (this.isDOC_MATCH(this.offset, true)) return this.consume(this.heredoc_label.length), this.popState(), this.tok.T_END_HEREDOC;
          let t2 = this._input[this.offset - 1];
          for (; this.offset < this.size; ) if (u.includes(t2)) {
            if (t2 = this.input(), this.isDOC_MATCH(this.offset, true)) return this.unput(1).popState(), this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length), this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else t2 = this.input();
          return this.tok.T_ENCAPSED_AND_WHITESPACE;
        }, matchST_HEREDOC() {
          let t2 = this.input();
          if (this.isDOC_MATCH(this.offset, true)) return this.consume(this.heredoc_label.length - 1), this.popState(), this.tok.T_END_HEREDOC;
          for (; this.offset < this.size; ) if ("\\" === t2 && (t2 = this.input(), u.includes(t2) || (t2 = this.input())), u.includes(t2)) {
            if (t2 = this.input(), this.isDOC_MATCH(this.offset, true)) return this.unput(1).popState(), this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length), this.tok.T_ENCAPSED_AND_WHITESPACE;
          } else if ("$" === t2) {
            if (t2 = this.input(), "{" === t2) return this.begin("ST_LOOKING_FOR_VARNAME"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
            if (this.is_LABEL_START()) {
              const t3 = this.offset, e2 = this.consume_VARIABLE();
              return this.yytext.length > this.offset - t3 + 2 ? (this.appendToken(e2, this.offset - t3 + 2), this.unput(this.offset - t3 + 2), this.tok.T_ENCAPSED_AND_WHITESPACE) : e2;
            }
          } else if ("{" === t2) {
            if (t2 = this.input(), "$" === t2) return this.begin("ST_IN_SCRIPTING"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_CURLY_OPEN, 1), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : (this.unput(1), this.tok.T_CURLY_OPEN);
          } else t2 = this.input();
          return this.tok.T_ENCAPSED_AND_WHITESPACE;
        }, consume_VARIABLE() {
          this.consume_LABEL();
          const t2 = this.input();
          if ("[" == t2) return this.unput(1), this.begin("ST_VAR_OFFSET"), this.tok.T_VARIABLE;
          if ("-" === t2) {
            if (">" === this.input()) return this.input(), this.is_LABEL_START() && this.begin("ST_LOOKING_FOR_PROPERTY"), this.unput(3), this.tok.T_VARIABLE;
            this.unput(2);
          } else t2 && this.unput(1);
          return this.tok.T_VARIABLE;
        }, matchST_BACKQUOTE() {
          let t2 = this.input();
          if ("$" === t2) {
            if (t2 = this.input(), "{" === t2) return this.begin("ST_LOOKING_FOR_VARNAME"), this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
            if (this.is_LABEL_START()) {
              return this.consume_VARIABLE();
            }
          } else if ("{" === t2) {
            if ("$" === this._input[this.offset]) return this.begin("ST_IN_SCRIPTING"), this.tok.T_CURLY_OPEN;
          } else if ("`" === t2) return this.popState(), "`";
          for (; this.offset < this.size; ) {
            if ("\\" === t2) this.input();
            else {
              if ("`" === t2) {
                this.unput(1), this.popState(), this.appendToken("`", 1);
                break;
              }
              if ("$" === t2) {
                if (t2 = this.input(), "{" === t2) return this.begin("ST_LOOKING_FOR_VARNAME"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
                if (this.is_LABEL_START()) {
                  const t3 = this.offset, e2 = this.consume_VARIABLE();
                  return this.yytext.length > this.offset - t3 + 2 ? (this.appendToken(e2, this.offset - t3 + 2), this.unput(this.offset - t3 + 2), this.tok.T_ENCAPSED_AND_WHITESPACE) : e2;
                }
                continue;
              }
              if ("{" === t2) {
                if (t2 = this.input(), "$" === t2) return this.begin("ST_IN_SCRIPTING"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_CURLY_OPEN, 1), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : (this.unput(1), this.tok.T_CURLY_OPEN);
                continue;
              }
            }
            t2 = this.input();
          }
          return this.tok.T_ENCAPSED_AND_WHITESPACE;
        }, matchST_DOUBLE_QUOTES() {
          let t2 = this.input();
          if ("$" === t2) {
            if (t2 = this.input(), "{" === t2) return this.begin("ST_LOOKING_FOR_VARNAME"), this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
            if (this.is_LABEL_START()) {
              return this.consume_VARIABLE();
            }
          } else if ("{" === t2) {
            if ("$" === this._input[this.offset]) return this.begin("ST_IN_SCRIPTING"), this.tok.T_CURLY_OPEN;
          } else if ('"' === t2) return this.popState(), '"';
          for (; this.offset < this.size; ) {
            if ("\\" === t2) this.input();
            else {
              if ('"' === t2) {
                this.unput(1), this.popState(), this.appendToken('"', 1);
                break;
              }
              if ("$" === t2) {
                if (t2 = this.input(), "{" === t2) return this.begin("ST_LOOKING_FOR_VARNAME"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
                if (this.is_LABEL_START()) {
                  const t3 = this.offset, e2 = this.consume_VARIABLE();
                  return this.yytext.length > this.offset - t3 + 2 ? (this.appendToken(e2, this.offset - t3 + 2), this.unput(this.offset - t3 + 2), this.tok.T_ENCAPSED_AND_WHITESPACE) : e2;
                }
                t2 && this.unput(1);
              } else if ("{" === t2) {
                if (t2 = this.input(), "$" === t2) return this.begin("ST_IN_SCRIPTING"), this.yytext.length > 2 ? (this.appendToken(this.tok.T_CURLY_OPEN, 1), this.unput(2), this.tok.T_ENCAPSED_AND_WHITESPACE) : (this.unput(1), this.tok.T_CURLY_OPEN);
                t2 && this.unput(1);
              }
            }
            t2 = this.input();
          }
          return this.tok.T_ENCAPSED_AND_WHITESPACE;
        } }, k2 = { T_STRING() {
          const t2 = this.yytext.toLowerCase();
          let e2 = this.keywords[t2];
          if ("number" != typeof e2) {
            if ("yield" === t2) this.version >= 700 && this.tryMatch(" from") ? (this.consume(5), e2 = this.tok.T_YIELD_FROM) : e2 = this.tok.T_YIELD;
            else if (e2 = this.tok.T_STRING, "b" === t2 || "B" === t2) {
              const t3 = this.input();
              if ('"' === t3) return this.ST_DOUBLE_QUOTES();
              if ("'" === t3) return this.T_CONSTANT_ENCAPSED_STRING();
              t3 && this.unput(1);
            }
          }
          if (e2 === this.tok.T_ENUM) {
            if (this.version < 801) return this.tok.T_STRING;
            const t3 = this.offset;
            let e3 = this.input();
            for (; " " == e3; ) e3 = this.input();
            let s2 = false;
            if (this.is_LABEL_START()) {
              for (; this.is_LABEL(); ) e3 += this.input();
              const t4 = e3.slice(0, -1).toLowerCase();
              s2 = "extends" !== t4 && "implements" !== t4;
            }
            return this.unput(this.offset - t3), s2 ? this.tok.T_ENUM : this.tok.T_STRING;
          }
          if (this.offset < this.size && e2 !== this.tok.T_YIELD_FROM) {
            let s2 = this.input();
            if ("\\" === s2) {
              e2 = "namespace" === t2 ? this.tok.T_NAME_RELATIVE : this.tok.T_NAME_QUALIFIED;
              do {
                if ("{" === this._input[this.offset]) {
                  this.input();
                  break;
                }
                this.consume_LABEL(), s2 = this.input();
              } while ("\\" === s2);
            }
            s2 && this.unput(1);
          }
          return e2;
        }, consume_TOKEN() {
          const t2 = this._input[this.offset - 1], e2 = this.tokenTerminals[t2];
          return e2 ? e2.apply(this, []) : this.yytext;
        }, tokenTerminals: { $() {
          return this.offset++, this.is_LABEL_START() ? (this.offset--, this.consume_LABEL(), this.tok.T_VARIABLE) : (this.offset--, "$");
        }, "-"() {
          const t2 = this._input[this.offset];
          return ">" === t2 ? (this.begin("ST_LOOKING_FOR_PROPERTY").input(), this.tok.T_OBJECT_OPERATOR) : "-" === t2 ? (this.input(), this.tok.T_DEC) : "=" === t2 ? (this.input(), this.tok.T_MINUS_EQUAL) : "-";
        }, "\\"() {
          if (this.offset < this.size) {
            if (this.input(), this.is_LABEL_START()) {
              let t2;
              do {
                if ("{" === this._input[this.offset]) {
                  this.input();
                  break;
                }
                this.consume_LABEL(), t2 = this.input();
              } while ("\\" === t2);
              return this.unput(1), this.tok.T_NAME_FULLY_QUALIFIED;
            }
            this.unput(1);
          }
          return this.tok.T_NS_SEPARATOR;
        }, "/"() {
          return "=" === this._input[this.offset] ? (this.input(), this.tok.T_DIV_EQUAL) : "/";
        }, ":"() {
          return ":" === this._input[this.offset] ? (this.input(), this.tok.T_DOUBLE_COLON) : ":";
        }, "("() {
          const t2 = this.offset;
          if (this.input(), this.is_TABSPACE() && this.consume_TABSPACE().input(), this.is_LABEL_START()) {
            const t3 = this.yytext.length;
            this.consume_LABEL();
            const e2 = this.yytext.substring(t3 - 1).toLowerCase(), s2 = this.castKeywords[e2];
            if ("number" == typeof s2 && (this.input(), this.is_TABSPACE() && this.consume_TABSPACE().input(), ")" === this._input[this.offset - 1])) return s2;
          }
          return this.unput(this.offset - t2), "(";
        }, "="() {
          const t2 = this._input[this.offset];
          return ">" === t2 ? (this.input(), this.tok.T_DOUBLE_ARROW) : "=" === t2 ? "=" === this._input[this.offset + 1] ? (this.consume(2), this.tok.T_IS_IDENTICAL) : (this.input(), this.tok.T_IS_EQUAL) : "=";
        }, "+"() {
          const t2 = this._input[this.offset];
          return "+" === t2 ? (this.input(), this.tok.T_INC) : "=" === t2 ? (this.input(), this.tok.T_PLUS_EQUAL) : "+";
        }, "!"() {
          return "=" === this._input[this.offset] ? "=" === this._input[this.offset + 1] ? (this.consume(2), this.tok.T_IS_NOT_IDENTICAL) : (this.input(), this.tok.T_IS_NOT_EQUAL) : "!";
        }, "?"() {
          return this.version >= 700 && "?" === this._input[this.offset] ? this.version >= 704 && "=" === this._input[this.offset + 1] ? (this.consume(2), this.tok.T_COALESCE_EQUAL) : (this.input(), this.tok.T_COALESCE) : this.version >= 800 && "-" === this._input[this.offset] && ">" === this._input[this.offset + 1] ? (this.consume(1), this.begin("ST_LOOKING_FOR_PROPERTY").input(), this.tok.T_NULLSAFE_OBJECT_OPERATOR) : "?";
        }, "<"() {
          let t2 = this._input[this.offset];
          return "<" === t2 ? (t2 = this._input[this.offset + 1], "=" === t2 ? (this.consume(2), this.tok.T_SL_EQUAL) : "<" === t2 && this.is_HEREDOC() ? this.tok.T_START_HEREDOC : (this.input(), this.tok.T_SL)) : "=" === t2 ? (this.input(), this.version >= 700 && ">" === this._input[this.offset] ? (this.input(), this.tok.T_SPACESHIP) : this.tok.T_IS_SMALLER_OR_EQUAL) : ">" === t2 ? (this.input(), this.tok.T_IS_NOT_EQUAL) : "<";
        }, ">"() {
          let t2 = this._input[this.offset];
          return "=" === t2 ? (this.input(), this.tok.T_IS_GREATER_OR_EQUAL) : ">" === t2 ? (t2 = this._input[this.offset + 1], "=" === t2 ? (this.consume(2), this.tok.T_SR_EQUAL) : (this.input(), this.tok.T_SR)) : ">";
        }, "*"() {
          const t2 = this._input[this.offset];
          return "=" === t2 ? (this.input(), this.tok.T_MUL_EQUAL) : "*" === t2 ? (this.input(), "=" === this._input[this.offset] ? (this.input(), this.tok.T_POW_EQUAL) : this.tok.T_POW) : "*";
        }, "."() {
          const t2 = this._input[this.offset];
          return "=" === t2 ? (this.input(), this.tok.T_CONCAT_EQUAL) : "." === t2 && "." === this._input[this.offset + 1] ? (this.consume(2), this.tok.T_ELLIPSIS) : ".";
        }, "%"() {
          return "=" === this._input[this.offset] ? (this.input(), this.tok.T_MOD_EQUAL) : "%";
        }, "&"() {
          const t2 = this._input[this.offset];
          return "=" === t2 ? (this.input(), this.tok.T_AND_EQUAL) : "&" === t2 ? (this.input(), this.tok.T_BOOLEAN_AND) : "&";
        }, "|"() {
          const t2 = this._input[this.offset];
          return "=" === t2 ? (this.input(), this.tok.T_OR_EQUAL) : "|" === t2 ? (this.input(), this.tok.T_BOOLEAN_OR) : ">" === t2 ? (this.input(), this.tok.T_PIPE) : "|";
        }, "^"() {
          return "=" === this._input[this.offset] ? (this.input(), this.tok.T_XOR_EQUAL) : "^";
        } } };
        var T2 = { is_NUM() {
          const t2 = this._input.charCodeAt(this.offset - 1);
          return t2 > 47 && t2 < 58 || 95 === t2;
        }, is_NUM_START() {
          const t2 = this._input.charCodeAt(this.offset - 1);
          return t2 > 47 && t2 < 58;
        }, is_LABEL() {
          const t2 = this._input.charCodeAt(this.offset - 1);
          return t2 > 96 && t2 < 123 || t2 > 64 && t2 < 91 || 95 === t2 || t2 > 47 && t2 < 58 || t2 > 126;
        }, is_LABEL_START() {
          const t2 = this._input.charCodeAt(this.offset - 1);
          return t2 > 64 && t2 < 91 || (t2 > 96 && t2 < 123 || (95 === t2 || t2 > 126));
        }, consume_LABEL() {
          for (; this.offset < this.size; ) {
            const t2 = this.input();
            if (!this.is_LABEL()) {
              t2 && this.unput(1);
              break;
            }
          }
          return this;
        }, is_TOKEN() {
          const t2 = this._input[this.offset - 1];
          return -1 !== ";:,.\\[]()|^&+-/*=%!~$<>?@".indexOf(t2);
        }, is_WHITESPACE() {
          const t2 = this._input[this.offset - 1];
          return " " === t2 || "	" === t2 || "\n" === t2 || "\r" === t2;
        }, is_TABSPACE() {
          const t2 = this._input[this.offset - 1];
          return " " === t2 || "	" === t2;
        }, consume_TABSPACE() {
          for (; this.offset < this.size; ) {
            const t2 = this.input();
            if (!this.is_TABSPACE()) {
              t2 && this.unput(1);
              break;
            }
          }
          return this;
        }, is_HEX() {
          const t2 = this._input.charCodeAt(this.offset - 1);
          return t2 > 47 && t2 < 58 || (t2 > 64 && t2 < 71 || (t2 > 96 && t2 < 103 || 95 === t2));
        }, is_OCTAL() {
          const t2 = this._input.charCodeAt(this.offset - 1);
          return t2 > 47 && t2 < 56 || 95 === t2;
        } };
        const x2 = function(t2) {
          this.engine = t2, this.tok = this.engine.tokens.names, this.EOF = 1, this.debug = false, this.all_tokens = true, this.comment_tokens = false, this.mode_eval = false, this.asp_tags = false, this.short_tags = false, this.version = 803, this.yyprevcol = 0, this.keywords = { __class__: this.tok.T_CLASS_C, __trait__: this.tok.T_TRAIT_C, __function__: this.tok.T_FUNC_C, __method__: this.tok.T_METHOD_C, __line__: this.tok.T_LINE, __file__: this.tok.T_FILE, __dir__: this.tok.T_DIR, __namespace__: this.tok.T_NS_C, exit: this.tok.T_EXIT, die: this.tok.T_EXIT, function: this.tok.T_FUNCTION, const: this.tok.T_CONST, return: this.tok.T_RETURN, try: this.tok.T_TRY, catch: this.tok.T_CATCH, finally: this.tok.T_FINALLY, throw: this.tok.T_THROW, if: this.tok.T_IF, elseif: this.tok.T_ELSEIF, endif: this.tok.T_ENDIF, else: this.tok.T_ELSE, while: this.tok.T_WHILE, endwhile: this.tok.T_ENDWHILE, do: this.tok.T_DO, for: this.tok.T_FOR, endfor: this.tok.T_ENDFOR, foreach: this.tok.T_FOREACH, endforeach: this.tok.T_ENDFOREACH, declare: this.tok.T_DECLARE, enddeclare: this.tok.T_ENDDECLARE, instanceof: this.tok.T_INSTANCEOF, as: this.tok.T_AS, switch: this.tok.T_SWITCH, endswitch: this.tok.T_ENDSWITCH, case: this.tok.T_CASE, default: this.tok.T_DEFAULT, break: this.tok.T_BREAK, continue: this.tok.T_CONTINUE, goto: this.tok.T_GOTO, echo: this.tok.T_ECHO, print: this.tok.T_PRINT, class: this.tok.T_CLASS, interface: this.tok.T_INTERFACE, trait: this.tok.T_TRAIT, enum: this.tok.T_ENUM, extends: this.tok.T_EXTENDS, implements: this.tok.T_IMPLEMENTS, new: this.tok.T_NEW, clone: this.tok.T_CLONE, var: this.tok.T_VAR, eval: this.tok.T_EVAL, include: this.tok.T_INCLUDE, include_once: this.tok.T_INCLUDE_ONCE, require: this.tok.T_REQUIRE, require_once: this.tok.T_REQUIRE_ONCE, namespace: this.tok.T_NAMESPACE, use: this.tok.T_USE, insteadof: this.tok.T_INSTEADOF, global: this.tok.T_GLOBAL, isset: this.tok.T_ISSET, empty: this.tok.T_EMPTY, __halt_compiler: this.tok.T_HALT_COMPILER, static: this.tok.T_STATIC, abstract: this.tok.T_ABSTRACT, final: this.tok.T_FINAL, private: this.tok.T_PRIVATE, protected: this.tok.T_PROTECTED, public: this.tok.T_PUBLIC, unset: this.tok.T_UNSET, list: this.tok.T_LIST, array: this.tok.T_ARRAY, callable: this.tok.T_CALLABLE, or: this.tok.T_LOGICAL_OR, and: this.tok.T_LOGICAL_AND, xor: this.tok.T_LOGICAL_XOR, match: this.tok.T_MATCH, readonly: this.tok.T_READ_ONLY }, this.castKeywords = { int: this.tok.T_INT_CAST, integer: this.tok.T_INT_CAST, real: this.tok.T_DOUBLE_CAST, double: this.tok.T_DOUBLE_CAST, float: this.tok.T_DOUBLE_CAST, string: this.tok.T_STRING_CAST, binary: this.tok.T_STRING_CAST, array: this.tok.T_ARRAY_CAST, object: this.tok.T_OBJECT_CAST, bool: this.tok.T_BOOL_CAST, boolean: this.tok.T_BOOL_CAST, unset: this.tok.T_UNSET_CAST };
        };
        x2.prototype.setInput = function(t2) {
          return this._input = t2, this.size = t2.length, this.yylineno = 1, this.offset = 0, this.yyprevcol = 0, this.yytext = "", this.yylloc = { first_offset: 0, first_line: 1, first_column: 0, prev_offset: 0, prev_line: 1, prev_column: 0, last_line: 1, last_column: 0 }, this.tokens = [], this.version > 703 ? this.keywords.fn = this.tok.T_FN : delete this.keywords.fn, this.done = this.offset >= this.size, !this.all_tokens && this.mode_eval ? (this.conditionStack = ["INITIAL"], this.begin("ST_IN_SCRIPTING")) : (this.conditionStack = [], this.begin("INITIAL")), this.heredoc_label = { label: "", length: 0, indentation: 0, indentation_uses_spaces: false, finished: false, first_encaps_node: false, toString() {
            this.label;
          } }, this;
        }, x2.prototype.input = function() {
          const t2 = this._input[this.offset];
          return t2 ? (this.yytext += t2, this.offset++, "\r" === t2 && "\n" === this._input[this.offset] && (this.yytext += "\n", this.offset++), "\n" === t2 || "\r" === t2 ? (this.yylloc.last_line = ++this.yylineno, this.yyprevcol = this.yylloc.last_column, this.yylloc.last_column = 0) : this.yylloc.last_column++, t2) : "";
        }, x2.prototype.unput = function(t2) {
          if (1 === t2) this.offset--, "\n" === this._input[this.offset] && "\r" === this._input[this.offset - 1] && (this.offset--, t2++), "\r" === this._input[this.offset] || "\n" === this._input[this.offset] ? (this.yylloc.last_line--, this.yylineno--, this.yylloc.last_column = this.yyprevcol) : this.yylloc.last_column--, this.yytext = this.yytext.substring(0, this.yytext.length - t2);
          else if (t2 > 0) if (this.offset -= t2, t2 < this.yytext.length) {
            this.yytext = this.yytext.substring(0, this.yytext.length - t2), this.yylloc.last_line = this.yylloc.first_line, this.yylloc.last_column = this.yyprevcol = this.yylloc.first_column;
            for (let t3 = 0; t3 < this.yytext.length; t3++) {
              let e2 = this.yytext[t3];
              "\r" === e2 ? (e2 = this.yytext[++t3], this.yyprevcol = this.yylloc.last_column, this.yylloc.last_line++, this.yylloc.last_column = 0, "\n" !== e2 && ("\r" === e2 ? this.yylloc.last_line++ : this.yylloc.last_column++)) : "\n" === e2 ? (this.yyprevcol = this.yylloc.last_column, this.yylloc.last_line++, this.yylloc.last_column = 0) : this.yylloc.last_column++;
            }
            this.yylineno = this.yylloc.last_line;
          } else this.yytext = "", this.yylloc.last_line = this.yylineno = this.yylloc.first_line, this.yylloc.last_column = this.yylloc.first_column;
          return this;
        }, x2.prototype.tryMatch = function(t2) {
          return t2 === this.ahead(t2.length);
        }, x2.prototype.tryMatchCaseless = function(t2) {
          return t2 === this.ahead(t2.length).toLowerCase();
        }, x2.prototype.ahead = function(t2) {
          let e2 = this._input.substring(this.offset, this.offset + t2);
          return "\r" === e2[e2.length - 1] && "\n" === this._input[this.offset + t2 + 1] && (e2 += "\n"), e2;
        }, x2.prototype.consume = function(t2) {
          for (let e2 = 0; e2 < t2; e2++) {
            const t3 = this._input[this.offset];
            if (!t3) break;
            this.yytext += t3, this.offset++, "\r" === t3 && "\n" === this._input[this.offset] && (this.yytext += "\n", this.offset++, e2++), "\n" === t3 || "\r" === t3 ? (this.yylloc.last_line = ++this.yylineno, this.yyprevcol = this.yylloc.last_column, this.yylloc.last_column = 0) : this.yylloc.last_column++;
          }
          return this;
        }, x2.prototype.getState = function() {
          return { yytext: this.yytext, offset: this.offset, yylineno: this.yylineno, yyprevcol: this.yyprevcol, yylloc: { first_offset: this.yylloc.first_offset, first_line: this.yylloc.first_line, first_column: this.yylloc.first_column, last_line: this.yylloc.last_line, last_column: this.yylloc.last_column }, heredoc_label: this.heredoc_label };
        }, x2.prototype.setState = function(t2) {
          return this.yytext = t2.yytext, this.offset = t2.offset, this.yylineno = t2.yylineno, this.yyprevcol = t2.yyprevcol, this.yylloc = t2.yylloc, t2.heredoc_label && (this.heredoc_label = t2.heredoc_label), this;
        }, x2.prototype.appendToken = function(t2, e2) {
          return this.tokens.push([t2, e2]), this;
        }, x2.prototype.lex = function() {
          this.yylloc.prev_offset = this.offset, this.yylloc.prev_line = this.yylloc.last_line, this.yylloc.prev_column = this.yylloc.last_column;
          let t2 = this.next() || this.lex();
          if (!this.all_tokens) {
            for (; t2 === this.tok.T_WHITESPACE || !this.comment_tokens && (t2 === this.tok.T_COMMENT || t2 === this.tok.T_DOC_COMMENT) || t2 === this.tok.T_OPEN_TAG; ) t2 = this.next() || this.lex();
            if (t2 == this.tok.T_OPEN_TAG_WITH_ECHO) return this.tok.T_ECHO;
            if (t2 === this.tok.T_CLOSE_TAG) return ";";
          }
          return this.yylloc.prev_offset || (this.yylloc.prev_offset = this.yylloc.first_offset, this.yylloc.prev_line = this.yylloc.first_line, this.yylloc.prev_column = this.yylloc.first_column), t2;
        }, x2.prototype.begin = function(t2) {
          if (this.conditionStack.push(t2), this.curCondition = t2, this.stateCb = this["match" + t2], "function" != typeof this.stateCb) throw new Error('Undefined condition state "' + t2 + '"');
          return this;
        }, x2.prototype.popState = function() {
          const t2 = this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
          if (this.curCondition = this.conditionStack[this.conditionStack.length - 1], this.stateCb = this["match" + this.curCondition], "function" != typeof this.stateCb) throw new Error('Undefined condition state "' + this.curCondition + '"');
          return t2;
        }, x2.prototype.next = function() {
          let t2;
          if (this._input || (this.done = true), this.yylloc.first_offset = this.offset, this.yylloc.first_line = this.yylloc.last_line, this.yylloc.first_column = this.yylloc.last_column, this.yytext = "", this.done) return this.yylloc.prev_offset = this.yylloc.first_offset, this.yylloc.prev_line = this.yylloc.first_line, this.yylloc.prev_column = this.yylloc.first_column, this.EOF;
          if (this.tokens.length > 0 ? (t2 = this.tokens.shift(), "object" == typeof t2[1] ? this.setState(t2[1]) : this.consume(t2[1]), t2 = t2[0]) : t2 = this.stateCb.apply(this, []), this.offset >= this.size && 0 === this.tokens.length && (this.done = true), this.debug) {
            let e2 = t2;
            e2 = "number" == typeof e2 ? this.engine.tokens.values[e2] : '"' + e2 + '"';
            const s2 = new Error(e2 + "	from " + this.yylloc.first_line + "," + this.yylloc.first_column + "	 - to " + this.yylloc.last_line + "," + this.yylloc.last_column + '	"' + this.yytext + '"');
            console.error(s2.stack);
          }
          return t2;
        }, [o, h, a, c, l, _, f, k2, T2].forEach((function(t2) {
          for (const e2 in t2) x2.prototype[e2] = t2[e2];
        }));
        var E = x2;
        var m = function(t2, e2, s2) {
          this.line = t2, this.column = e2, this.offset = s2;
        }, y2 = { read_array() {
          let t2, e2 = false;
          const s2 = this.node("array");
          this.token === this.tok.T_ARRAY ? (this.next().expect("("), t2 = ")") : (e2 = true, t2 = "]");
          let i2 = [];
          return this.next().token !== t2 && (i2 = this.read_array_pair_list(e2)), this.expect(t2), this.next(), s2(e2, i2);
        }, read_array_pair_list(t2) {
          const e2 = this;
          return this.read_list((function() {
            return e2.read_array_pair(t2);
          }), ",", true);
        }, read_array_pair(t2) {
          if (!t2 && ")" === this.token || t2 && "]" === this.token) return;
          if ("," === this.token) return this.node("noop")();
          const e2 = this.node("entry");
          let s2, i2 = null, n2 = false, r2 = false;
          if ("&" === this.token) this.next(), n2 = true, s2 = this.read_variable(true, false);
          else if (this.token === this.tok.T_ELLIPSIS && this.version >= 704) this.next(), "&" === this.token && this.error(), r2 = true, s2 = this.read_expr();
          else {
            const t3 = this.read_expr();
            this.token === this.tok.T_DOUBLE_ARROW ? (this.next(), i2 = t3, "&" === this.token ? (this.next(), n2 = true, s2 = this.read_variable(true, false)) : s2 = this.read_expr()) : s2 = t3;
          }
          return e2(i2, s2, n2, r2);
        } }, A = { read_class_declaration_statement(t2) {
          const e2 = this.node("class"), s2 = this.read_class_modifiers();
          if (this.token !== this.tok.T_CLASS) return this.error(this.tok.T_CLASS), this.next(), null;
          this.next().expect(this.tok.T_STRING);
          let i2 = this.node("identifier");
          const n2 = this.text();
          this.next(), i2 = i2(n2);
          const r2 = this.read_extends_from(), o2 = this.read_implements_list();
          this.expect("{");
          const h2 = e2(i2, r2, o2, this.next().read_class_body(true, false), s2);
          return t2 && (h2.attrGroups = t2), h2;
        }, read_class_modifiers() {
          const t2 = this.read_class_modifier({ readonly: 0, final_or_abstract: 0 });
          return [0, 0, t2.final_or_abstract, t2.readonly];
        }, read_class_modifier(t2) {
          return this.token === this.tok.T_READ_ONLY ? (this.next(), t2.readonly = 1, t2 = this.read_class_modifier(t2)) : 0 === t2.final_or_abstract && this.token === this.tok.T_ABSTRACT ? (this.next(), t2.final_or_abstract = 1, t2 = this.read_class_modifier(t2)) : 0 === t2.final_or_abstract && this.token === this.tok.T_FINAL && (this.next(), t2.final_or_abstract = 2, t2 = this.read_class_modifier(t2)), t2;
        }, read_class_body(t2, e2) {
          let s2 = [], i2 = [];
          for (; this.token !== this.EOF && "}" !== this.token; ) {
            if (this.token === this.tok.T_COMMENT) {
              s2.push(this.read_comment());
              continue;
            }
            if (this.token === this.tok.T_DOC_COMMENT) {
              s2.push(this.read_doc_comment());
              continue;
            }
            if (this.token === this.tok.T_USE) {
              s2 = s2.concat(this.read_trait_use_statement());
              continue;
            }
            if (e2 && this.token === this.tok.T_CASE) {
              const t3 = this.read_enum_case();
              this.expect(";") && this.next(), s2 = s2.concat(t3);
              continue;
            }
            this.token === this.tok.T_ATTRIBUTE && (i2 = this.read_attr_list());
            const n2 = this.position(), r2 = this.read_member_flags(false);
            if (this.token !== this.tok.T_CONST) if (t2 && this.token === this.tok.T_VAR && (this.next().expect(this.tok.T_VARIABLE), r2[0] = null, r2[1] = 0), this.token === this.tok.T_FUNCTION) s2.push(this.read_function(false, r2, i2, n2)), i2 = [];
            else if (t2 && (this.token === this.tok.T_VARIABLE || this.version >= 801 && this.token === this.tok.T_READ_ONLY || this.version >= 704 && ("?" === this.token || this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE || this.token === this.tok.T_NAMESPACE || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_STRING))) {
              const t3 = this.read_variable_list(r2, i2);
              i2 = [], this.expect(";"), this.next(), s2 = s2.concat(t3);
            } else this.error([this.tok.T_CONST, ...t2 ? [this.tok.T_VARIABLE] : [], ...e2 ? [this.tok.T_CASE] : [], this.tok.T_FUNCTION]), this.next();
            else {
              const t3 = this.read_constant_list(r2, i2);
              this.expect(";") && this.next(), s2 = s2.concat(t3);
            }
          }
          return this.expect("}"), this.next(), s2;
        }, read_variable_list(t2, e2) {
          const s2 = this.node("propertystatement"), i2 = this.read_list((function() {
            const t3 = this.node("property");
            let s3 = false;
            this.token === this.tok.T_READ_ONLY && (s3 = true, this.next());
            const [i3, n2] = this.read_optional_type();
            this.expect(this.tok.T_VARIABLE);
            let r2 = this.node("identifier");
            const o2 = this.text().substring(1);
            this.next(), r2 = r2(o2);
            let h2 = null;
            return this.expect([",", ";", "="]), "=" === this.token && (h2 = this.next().read_expr()), t3(r2, h2, s3, i3, n2, e2 || []);
          }), ",");
          return s2(null, i2, t2);
        }, read_constant_list(t2, e2) {
          this.expect(this.tok.T_CONST) && this.next();
          const [s2, i2] = this.version >= 803 ? this.read_optional_type() : [false, null], n2 = this.node("classconstant"), r2 = this.read_list((function() {
            const t3 = this.node("constant");
            let e3 = null, s3 = null;
            if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
              e3 = this.node("identifier");
              const t4 = this.text();
              this.next(), e3 = e3(t4);
            } else this.expect("IDENTIFIER");
            return this.expect("=") && (s3 = this.next().read_expr()), t3(e3, s3);
          }), ",");
          return n2(null, r2, t2, s2, i2, e2 || []);
        }, read_member_flags(t2) {
          const e2 = [-1, -1, -1];
          if (this.is("T_MEMBER_FLAGS")) {
            let s2 = 0, i2 = 0;
            do {
              switch (this.token) {
                case this.tok.T_PUBLIC:
                  s2 = 0, i2 = 0;
                  break;
                case this.tok.T_PROTECTED:
                  s2 = 0, i2 = 1;
                  break;
                case this.tok.T_PRIVATE:
                  s2 = 0, i2 = 2;
                  break;
                case this.tok.T_STATIC:
                  s2 = 1, i2 = 1;
                  break;
                case this.tok.T_ABSTRACT:
                  s2 = 2, i2 = 1;
                  break;
                case this.tok.T_FINAL:
                  s2 = 2, i2 = 2;
              }
              t2 && (0 === s2 && 2 === i2 ? (this.expect([this.tok.T_PUBLIC, this.tok.T_PROTECTED]), i2 = -1) : 2 === s2 && 1 === i2 && (this.error(), i2 = -1)), -1 !== e2[s2] ? this.error() : -1 !== i2 && (e2[s2] = i2);
            } while (this.next().is("T_MEMBER_FLAGS"));
          }
          return -1 === e2[1] && (e2[1] = 0), -1 === e2[2] && (e2[2] = 0), e2;
        }, read_optional_type() {
          const t2 = "?" === this.token;
          if (t2 && this.next(), "=" === this.peekSkipComments()) return [false, null];
          let e2 = this.read_types();
          if (t2 && !e2 && this.raiseError("Expecting a type definition combined with nullable operator"), !t2 && !e2) return [false, null];
          if ("|" === this.token) {
            e2 = [e2];
            do {
              this.next();
              const t3 = this.read_type();
              if (!t3) {
                this.raiseError("Expecting a type definition");
                break;
              }
              e2.push(t3);
            } while ("|" === this.token);
          }
          return [t2, e2];
        }, peekSkipComments() {
          const t2 = this.lexer.getState();
          let e2;
          do {
            e2 = this.lexer.lex();
          } while (e2 === this.tok.T_COMMENT || e2 === this.tok.T_WHITESPACE);
          return this.lexer.setState(t2), e2;
        }, read_interface_declaration_statement(t2) {
          const e2 = this.node("interface");
          if (this.token !== this.tok.T_INTERFACE) return this.error(this.tok.T_INTERFACE), this.next(), null;
          this.next().expect(this.tok.T_STRING);
          let s2 = this.node("identifier");
          const i2 = this.text();
          this.next(), s2 = s2(i2);
          const n2 = this.read_interface_extends_list();
          this.expect("{");
          return e2(s2, n2, this.next().read_interface_body(), t2 || []);
        }, read_interface_body() {
          let t2, e2 = [];
          for (; this.token !== this.EOF && "}" !== this.token; ) {
            if (this.token === this.tok.T_COMMENT) {
              e2.push(this.read_comment());
              continue;
            }
            if (this.token === this.tok.T_DOC_COMMENT) {
              e2.push(this.read_doc_comment());
              continue;
            }
            const s2 = this.position();
            t2 = this.read_attr_list();
            const i2 = this.read_member_flags(true);
            if (this.token === this.tok.T_CONST) {
              const s3 = this.read_constant_list(i2, t2);
              this.expect(";") && this.next(), e2 = e2.concat(s3);
            } else if (this.token === this.tok.T_FUNCTION) {
              const n2 = this.read_function_declaration(2, i2, t2, s2);
              n2.parseFlags(i2), e2.push(n2), this.expect(";") && this.next();
            } else this.error([this.tok.T_CONST, this.tok.T_FUNCTION]), this.next();
          }
          return this.expect("}") && this.next(), e2;
        }, read_trait_declaration_statement() {
          const t2 = this.node("trait");
          if (this.token !== this.tok.T_TRAIT) return this.error(this.tok.T_TRAIT), this.next(), null;
          this.next().expect(this.tok.T_STRING);
          let e2 = this.node("identifier");
          const s2 = this.text();
          this.next(), e2 = e2(s2), this.expect("{");
          return t2(e2, this.next().read_class_body(true, false));
        }, read_trait_use_statement() {
          const t2 = this.node("traituse");
          this.expect(this.tok.T_USE) && this.next();
          const e2 = [this.read_namespace_name()];
          let s2 = null;
          for (; "," === this.token; ) e2.push(this.next().read_namespace_name());
          if ("{" === this.token) {
            for (s2 = []; this.next().token !== this.EOF && "}" !== this.token; ) s2.push(this.read_trait_use_alias()), this.expect(";");
            this.expect("}") && this.next();
          } else this.expect(";") && this.next();
          return t2(e2, s2);
        }, read_trait_use_alias() {
          const t2 = this.node();
          let e2, s2 = null;
          if (this.is("IDENTIFIER")) {
            e2 = this.node("identifier");
            const t3 = this.text();
            this.next(), e2 = e2(t3);
          } else if (e2 = this.read_namespace_name(), this.token === this.tok.T_DOUBLE_COLON) if (this.next(), this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
            s2 = e2, e2 = this.node("identifier");
            const t3 = this.text();
            this.next(), e2 = e2(t3);
          } else this.expect(this.tok.T_STRING);
          else e2 = e2.name;
          if (this.token === this.tok.T_INSTEADOF) return t2("traitprecedence", s2, e2, this.next().read_name_list());
          if (this.token === this.tok.T_AS) {
            let i2 = null, n2 = null;
            if (this.next().is("T_MEMBER_FLAGS") && (i2 = this.read_member_flags()), this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
              n2 = this.node("identifier");
              const t3 = this.text();
              this.next(), n2 = n2(t3);
            } else false === i2 && this.expect(this.tok.T_STRING);
            return t2("traitalias", s2, e2, n2, i2);
          }
          return this.expect([this.tok.T_AS, this.tok.T_INSTEADOF]), t2("traitalias", s2, e2, null, null);
        } }, N2 = { read_comment() {
          const t2 = this.text();
          let e2 = this.ast.prepare("/*" === t2.substring(0, 2) ? "commentblock" : "commentline", null, this);
          const s2 = this.lexer.yylloc.first_offset, i2 = this.prev;
          return this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset], this.lex(), e2 = e2(t2), e2.offset = s2, this.prev = i2, e2;
        }, read_doc_comment() {
          let t2 = this.ast.prepare("commentblock", null, this);
          const e2 = this.lexer.yylloc.first_offset, s2 = this.text(), i2 = this.prev;
          return this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset], this.lex(), t2 = t2(s2), t2.offset = e2, this.prev = i2, t2;
        } }, g2 = { read_expr(t2) {
          const e2 = this.node();
          if ("@" === this.token) return t2 || (t2 = this.next().read_expr()), e2("silent", t2);
          if (t2 || (t2 = this.read_expr_item()), "|" === this.token) return e2("bin", "|", t2, this.next().read_expr());
          if ("&" === this.token) return e2("bin", "&", t2, this.next().read_expr());
          if ("^" === this.token) return e2("bin", "^", t2, this.next().read_expr());
          if ("." === this.token) return e2("bin", ".", t2, this.next().read_expr());
          if ("+" === this.token) return e2("bin", "+", t2, this.next().read_expr());
          if ("-" === this.token) return e2("bin", "-", t2, this.next().read_expr());
          if ("*" === this.token) return e2("bin", "*", t2, this.next().read_expr());
          if ("/" === this.token) return e2("bin", "/", t2, this.next().read_expr());
          if ("%" === this.token) return e2("bin", "%", t2, this.next().read_expr());
          if (this.token === this.tok.T_POW) return e2("bin", "**", t2, this.next().read_expr());
          if (this.token === this.tok.T_SL) return e2("bin", "<<", t2, this.next().read_expr());
          if (this.token === this.tok.T_SR) return e2("bin", ">>", t2, this.next().read_expr());
          if (this.token === this.tok.T_BOOLEAN_OR) return e2("bin", "||", t2, this.next().read_expr());
          if (this.token === this.tok.T_LOGICAL_OR) return e2("bin", "or", t2, this.next().read_expr());
          if (this.token === this.tok.T_BOOLEAN_AND) return e2("bin", "&&", t2, this.next().read_expr());
          if (this.token === this.tok.T_LOGICAL_AND) return e2("bin", "and", t2, this.next().read_expr());
          if (this.token === this.tok.T_LOGICAL_XOR) return e2("bin", "xor", t2, this.next().read_expr());
          if (this.token === this.tok.T_IS_IDENTICAL) return e2("bin", "===", t2, this.next().read_expr());
          if (this.token === this.tok.T_IS_NOT_IDENTICAL) return e2("bin", "!==", t2, this.next().read_expr());
          if (this.token === this.tok.T_IS_EQUAL) return e2("bin", "==", t2, this.next().read_expr());
          if (this.token === this.tok.T_IS_NOT_EQUAL) return e2("bin", "!=", t2, this.next().read_expr());
          if ("<" === this.token) return e2("bin", "<", t2, this.next().read_expr());
          if (">" === this.token) return e2("bin", ">", t2, this.next().read_expr());
          if (this.token === this.tok.T_IS_SMALLER_OR_EQUAL) return e2("bin", "<=", t2, this.next().read_expr());
          if (this.token === this.tok.T_IS_GREATER_OR_EQUAL) return e2("bin", ">=", t2, this.next().read_expr());
          if (this.token === this.tok.T_SPACESHIP) return e2("bin", "<=>", t2, this.next().read_expr());
          if (this.token === this.tok.T_INSTANCEOF && (t2 = e2("bin", "instanceof", t2, this.next().read_class_name_reference()), ";" !== this.token && this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF && (t2 = this.read_expr(t2))), this.token === this.tok.T_NULLSAFE_OBJECT_OPERATOR && (t2 = e2("nullsafepropertylookup", t2, this.read_what()), t2 = this.recursive_variable_chain_scan(t2, false, true)), this.token === this.tok.T_COALESCE) return e2("bin", "??", t2, this.next().read_expr());
          if (this.token === this.tok.T_PIPE) return this.version < 805 && this.raiseError("PHP 8.5+ is required to use pipe operator"), e2("bin", "|>", t2, this.next().read_expr());
          if ("?" === this.token) {
            let s2 = null;
            return ":" !== this.next().token && (s2 = this.read_expr()), this.expect(":") && this.next(), e2("retif", t2, s2, this.read_expr());
          }
          return e2.destroy(t2), t2;
        }, read_expr_cast(t2) {
          return this.node("cast")(t2, this.text(), this.next().read_expr());
        }, read_isset_variable() {
          return this.read_expr();
        }, read_isset_variables() {
          return this.read_function_list(this.read_isset_variable, ",");
        }, read_internal_functions_in_yacc() {
          let t2 = null;
          switch (this.token) {
            case this.tok.T_ISSET:
              {
                t2 = this.node("isset"), this.next().expect("(") && this.next();
                const e2 = this.read_isset_variables();
                this.expect(")") && this.next(), t2 = t2(e2);
              }
              break;
            case this.tok.T_EMPTY:
              {
                t2 = this.node("empty"), this.next().expect("(") && this.next();
                const e2 = this.read_expr();
                this.expect(")") && this.next(), t2 = t2(e2);
              }
              break;
            case this.tok.T_INCLUDE:
              t2 = this.node("include")(false, false, this.next().read_expr());
              break;
            case this.tok.T_INCLUDE_ONCE:
              t2 = this.node("include")(true, false, this.next().read_expr());
              break;
            case this.tok.T_EVAL:
              {
                t2 = this.node("eval"), this.next().expect("(") && this.next();
                const e2 = this.read_expr();
                this.expect(")") && this.next(), t2 = t2(e2);
              }
              break;
            case this.tok.T_REQUIRE:
              t2 = this.node("include")(false, true, this.next().read_expr());
              break;
            case this.tok.T_REQUIRE_ONCE:
              t2 = this.node("include")(true, true, this.next().read_expr());
          }
          return t2;
        }, read_optional_expr(t2) {
          return this.token !== t2 ? this.read_expr() : null;
        }, read_exit_expr() {
          let t2 = null;
          return "(" === this.token && (this.next(), t2 = this.read_optional_expr(")"), this.expect(")") && this.next()), t2;
        }, read_expr_item() {
          let t2, e2, s2 = [];
          if ("+" === this.token) return this.node("unary")("+", this.next().read_expr());
          if ("-" === this.token) return this.node("unary")("-", this.next().read_expr());
          if ("!" === this.token) return this.node("unary")("!", this.next().read_expr());
          if ("~" === this.token) return this.node("unary")("~", this.next().read_expr());
          if ("(" === this.token) return e2 = this.next().read_expr(), e2.parenthesizedExpression = true, this.expect(")") && this.next(), this.handleDereferencable(e2);
          if ("`" === this.token) return this.read_encapsed_string("`");
          if (this.token === this.tok.T_LIST) {
            let e3 = null;
            const s3 = this.innerList;
            t2 = this.node("list"), s3 || (e3 = this.node("assign")), this.next().expect("(") && this.next(), this.innerList || (this.innerList = true);
            const i2 = this.read_array_pair_list(false);
            this.expect(")") && this.next();
            let n2 = false;
            for (let t3 = 0; t3 < i2.length; t3++) if (null !== i2[t3] && "noop" !== i2[t3].kind) {
              n2 = true;
              break;
            }
            return n2 || this.raiseError("Fatal Error :  Cannot use empty list on line " + this.lexer.yylloc.first_line), s3 ? t2(i2, false) : (this.innerList = false, this.expect("=") ? e3(t2(i2, false), this.next().read_expr(), "=") : t2(i2, false));
          }
          if (this.token === this.tok.T_ATTRIBUTE && (s2 = this.read_attr_list()), this.token === this.tok.T_CLONE) return this.node("clone")(this.next().read_expr());
          switch (this.token) {
            case this.tok.T_INC:
              return this.node("pre")("+", this.next().read_variable(false, false));
            case this.tok.T_DEC:
              return this.node("pre")("-", this.next().read_variable(false, false));
            case this.tok.T_NEW:
              return e2 = this.read_new_expr(), this.token === this.tok.T_OBJECT_OPERATOR && this.version < 804 && this.raiseError("New without parenthesis is not allowed before PHP 8.4"), this.handleDereferencable(e2);
            case this.tok.T_ISSET:
            case this.tok.T_EMPTY:
            case this.tok.T_INCLUDE:
            case this.tok.T_INCLUDE_ONCE:
            case this.tok.T_EVAL:
            case this.tok.T_REQUIRE:
            case this.tok.T_REQUIRE_ONCE:
              return this.read_internal_functions_in_yacc();
            case this.tok.T_MATCH:
              return this.read_match_expression();
            case this.tok.T_INT_CAST:
              return this.read_expr_cast("int");
            case this.tok.T_DOUBLE_CAST:
              return this.read_expr_cast("float");
            case this.tok.T_STRING_CAST:
              return this.read_expr_cast(-1 !== this.text().indexOf("binary") ? "binary" : "string");
            case this.tok.T_ARRAY_CAST:
              return this.read_expr_cast("array");
            case this.tok.T_OBJECT_CAST:
              return this.read_expr_cast("object");
            case this.tok.T_BOOL_CAST:
              return this.read_expr_cast("bool");
            case this.tok.T_UNSET_CAST:
              return this.read_expr_cast("unset");
            case this.tok.T_THROW:
              this.version < 800 && this.raiseError("PHP 8+ is required to use throw as an expression");
              return this.node("throw")(this.next().read_expr());
            case this.tok.T_EXIT: {
              const e3 = "die" === this.lexer.yytext.toLowerCase();
              t2 = this.node("exit"), this.next();
              return t2(this.read_exit_expr(), e3);
            }
            case this.tok.T_PRINT:
              return this.node("print")(this.next().read_expr());
            case this.tok.T_YIELD: {
              let e3 = null, s3 = null;
              return t2 = this.node("yield"), this.next().is("EXPR") && (e3 = this.read_expr(), this.token === this.tok.T_DOUBLE_ARROW && (s3 = e3, e3 = this.next().read_expr())), t2(e3, s3);
            }
            case this.tok.T_YIELD_FROM:
              return t2 = this.node("yieldfrom"), e2 = this.next().read_expr(), t2(e2);
            case this.tok.T_FN:
            case this.tok.T_FUNCTION:
              return this.read_inline_function(void 0, s2);
            case this.tok.T_STATIC: {
              const t3 = [this.token, this.lexer.getState()];
              if (this.next(), this.token === this.tok.T_FUNCTION || this.version >= 704 && this.token === this.tok.T_FN) return this.read_inline_function([0, 1, 0], s2);
              this.lexer.tokens.push(t3), this.next();
            }
          }
          if (this.is("VARIABLE")) {
            t2 = this.node(), e2 = this.read_variable(false, false);
            const s3 = "identifier" === e2.kind || "staticlookup" === e2.kind && "identifier" === e2.offset.kind;
            switch (this.token) {
              case "=":
                return s3 && this.error("VARIABLE"), "&" == this.next().token ? this.read_assignref(t2, e2) : t2("assign", e2, this.read_expr(), "=");
              case this.tok.T_PLUS_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "+=");
              case this.tok.T_MINUS_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "-=");
              case this.tok.T_MUL_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "*=");
              case this.tok.T_POW_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "**=");
              case this.tok.T_DIV_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "/=");
              case this.tok.T_CONCAT_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), ".=");
              case this.tok.T_MOD_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "%=");
              case this.tok.T_AND_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "&=");
              case this.tok.T_OR_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "|=");
              case this.tok.T_XOR_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "^=");
              case this.tok.T_SL_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "<<=");
              case this.tok.T_SR_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), ">>=");
              case this.tok.T_COALESCE_EQUAL:
                return s3 && this.error("VARIABLE"), t2("assign", e2, this.next().read_expr(), "??=");
              case this.tok.T_INC:
                return s3 && this.error("VARIABLE"), this.next(), t2("post", "+", e2);
              case this.tok.T_DEC:
                return s3 && this.error("VARIABLE"), this.next(), t2("post", "-", e2);
              default:
                t2.destroy(e2);
            }
          } else {
            if (this.is("SCALAR")) {
              if (t2 = this.node(), e2 = this.read_scalar(), "array" === e2.kind && e2.shortForm && "=" === this.token) {
                const s3 = this.convertToList(e2);
                e2.loc && (s3.loc = e2.loc);
                return t2("assign", s3, this.next().read_expr(), "=");
              }
              return t2.destroy(e2), this.handleDereferencable(e2);
            }
            this.error("EXPR"), this.next();
          }
          return e2;
        }, convertToList(t2) {
          const e2 = t2.items.map(((t3) => (t3.value && "array" === t3.value.kind && t3.value.shortForm && (t3.value = this.convertToList(t3.value)), t3))), s2 = this.node("list")(e2, true);
          return t2.loc && (s2.loc = t2.loc), t2.leadingComments && (s2.leadingComments = t2.leadingComments), t2.trailingComments && (s2.trailingComments = t2.trailingComments), s2;
        }, read_assignref(t2, e2) {
          let s2;
          return this.next(), this.token === this.tok.T_NEW ? (this.version >= 700 && this.error(), s2 = this.read_new_expr()) : s2 = this.read_variable(false, false), t2("assignref", e2, s2);
        }, read_inline_function(t2, e2) {
          if (this.token === this.tok.T_FUNCTION) {
            const s3 = this.read_function(true, t2, e2);
            return s3.attrGroups = e2, s3;
          }
          !this.version >= 704 && this.raiseError("Arrow Functions are not allowed");
          const s2 = this.node("arrowfunc");
          this.expect(this.tok.T_FN) && this.next();
          const i2 = this.is_reference();
          this.expect("(") && this.next();
          const n2 = this.read_parameter_list();
          this.expect(")") && this.next();
          let r2 = false, o2 = null;
          ":" === this.token && ("?" === this.next().token && (r2 = true, this.next()), o2 = this.read_types()), this.expect(this.tok.T_DOUBLE_ARROW) && this.next();
          const h2 = s2(n2, i2, this.read_expr(), o2, r2, !!t2);
          return h2.attrGroups = e2, h2;
        }, read_match_expression() {
          const t2 = this.node("match");
          this.expect(this.tok.T_MATCH) && this.next(), this.version < 800 && this.raiseError("Match statements are not allowed before PHP 8"), this.expect("(") && this.next();
          const e2 = this.read_expr();
          this.expect(")") && this.next(), this.expect("{") && this.next();
          const s2 = this.read_match_arms();
          return this.expect("}") && this.next(), t2(e2, s2);
        }, read_match_arms() {
          return this.read_list((() => this.read_match_arm()), ",", true);
        }, read_match_arm() {
          if ("}" !== this.token) return this.node("matcharm")(this.read_match_arm_conds(), this.read_expr());
        }, read_match_arm_conds() {
          let t2 = [];
          if (this.token === this.tok.T_DEFAULT) t2 = null, this.next();
          else for (t2.push(this.read_expr()); "," === this.token; ) {
            if (this.next(), this.token === this.tok.T_DOUBLE_ARROW) return this.next(), t2;
            t2.push(this.read_expr());
          }
          return this.expect(this.tok.T_DOUBLE_ARROW) && this.next(), t2;
        }, read_attribute() {
          const t2 = this.text();
          let e2 = [];
          return this.next(), "(" === this.token && (e2 = this.read_argument_list()), this.node("attribute")(t2, e2);
        }, read_attr_list() {
          const t2 = [];
          if (this.token === this.tok.T_ATTRIBUTE) do {
            const e2 = this.node("attrgroup")([]);
            for (this.next(), e2.attrs.push(this.read_attribute()); "," === this.token; ) this.next(), "]" !== this.token && e2.attrs.push(this.read_attribute());
            t2.push(e2), this.expect("]"), this.next();
          } while (this.token === this.tok.T_ATTRIBUTE);
          return t2;
        }, read_new_expr() {
          const t2 = this.node("new");
          this.expect(this.tok.T_NEW) && this.next();
          let e2 = [];
          if ("(" === this.token) {
            this.next();
            const s3 = this.read_expr();
            return this.expect(")"), this.next(), "(" === this.token && (e2 = this.read_argument_list()), t2(s3, e2);
          }
          const s2 = this.read_attr_list(), i2 = this.token === this.tok.T_READ_ONLY;
          if (i2 && (this.version < 803 && this.raiseError("Anonymous readonly classes are not allowed before PHP 8.3"), this.next()), this.token === this.tok.T_CLASS) {
            const n3 = this.node("class");
            "(" === this.next().token && (e2 = this.read_argument_list());
            const r2 = this.read_extends_from(), o2 = this.read_implements_list();
            let h2 = null;
            this.expect("{") && (h2 = this.next().read_class_body(true, false));
            const a2 = n3(null, r2, o2, h2, [0, 0, 0, i2 ? 1 : 0]);
            return a2.attrGroups = s2, t2(a2, e2);
          }
          let n2 = this.read_new_class_name();
          for (; "[" === this.token; ) {
            const t3 = this.node("offsetlookup"), e3 = this.next().read_encaps_var_offset();
            this.expect("]") && this.next(), n2 = t3(n2, e3);
          }
          return "(" === this.token && (e2 = this.read_argument_list()), t2(n2, e2);
        }, read_new_class_name() {
          if (this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_NAMESPACE) {
            let t2 = this.read_namespace_name(true);
            return this.token === this.tok.T_DOUBLE_COLON && (t2 = this.read_static_getter(t2)), t2;
          }
          if (this.is("VARIABLE")) return this.read_variable(true, false);
          this.expect([this.tok.T_STRING, "VARIABLE"]);
        }, handleDereferencable(t2) {
          for (; this.token !== this.EOF; ) if (this.token === this.tok.T_OBJECT_OPERATOR || this.token === this.tok.T_DOUBLE_COLON || this.token === this.tok.T_NULLSAFE_OBJECT_OPERATOR) t2 = this.recursive_variable_chain_scan(t2, false, false, true);
          else if (this.token === this.tok.T_CURLY_OPEN || "[" === this.token) t2 = this.read_dereferencable(t2);
          else {
            if ("(" !== this.token) return t2;
            t2 = this.node("call")(t2, this.read_argument_list());
          }
          return t2;
        } }, L2 = { read_enum_declaration_statement(t2) {
          const e2 = this.node("enum");
          if (!this.expect(this.tok.T_ENUM)) return null;
          this.next().expect(this.tok.T_STRING);
          let s2 = this.node("identifier");
          const i2 = this.text();
          this.next(), s2 = s2(i2);
          const n2 = this.read_enum_value_type(), r2 = this.read_implements_list();
          this.expect("{");
          const o2 = e2(s2, n2, r2, this.next().read_class_body(false, true));
          return t2 && (o2.attrGroups = t2), o2;
        }, read_enum_value_type() {
          return ":" === this.token ? this.next().read_namespace_name() : null;
        }, read_enum_case() {
          this.expect(this.tok.T_CASE);
          const t2 = this.node("enumcase");
          let e2 = this.node("identifier");
          const s2 = this.next().text();
          this.next(), e2 = e2(s2);
          const i2 = "=" === this.token ? this.next().read_expr() : null;
          return this.expect(";"), t2(e2, i2);
        } }, b2 = { is_reference() {
          return "&" === this.token && (this.next(), true);
        }, is_variadic() {
          return this.token === this.tok.T_ELLIPSIS && (this.next(), true);
        }, read_function(t2, e2, s2, i2) {
          const n2 = this.read_function_declaration(t2 ? 1 : e2 ? 2 : 0, e2 && 1 === e2[1], s2 || [], i2);
          return e2 && 1 == e2[2] ? (n2.parseFlags(e2), this.expect(";") && this.next()) : (this.expect("{") && (n2.body = this.read_code_block(false), n2.loc && n2.body.loc && (n2.loc.end = n2.body.loc.end)), !t2 && e2 && n2.parseFlags(e2)), n2;
        }, read_function_declaration(t2, e2, s2, i2) {
          let n2 = "function";
          1 === t2 ? n2 = "closure" : 2 === t2 && (n2 = "method");
          const r2 = this.node(n2);
          this.expect(this.tok.T_FUNCTION) && this.next();
          const o2 = this.is_reference();
          let h2 = false, a2 = [], c2 = null, l2 = false;
          if (1 !== t2) {
            const e3 = this.node("identifier");
            2 === t2 ? this.version >= 700 ? this.token === this.tok.T_STRING || this.is("IDENTIFIER") ? (h2 = this.text(), this.next()) : this.version < 704 && this.error("IDENTIFIER") : this.token === this.tok.T_STRING ? (h2 = this.text(), this.next()) : this.error("IDENTIFIER") : this.version >= 700 ? this.token === this.tok.T_STRING ? (h2 = this.text(), this.next()) : this.version >= 704 ? this.expect("(") || this.next() : (this.error(this.tok.T_STRING), this.next()) : (this.expect(this.tok.T_STRING) && (h2 = this.text()), this.next()), h2 = e3(h2);
          }
          this.expect("(") && this.next();
          const _2 = this.read_parameter_list("__construct" === h2.name);
          this.expect(")") && this.next(), 1 === t2 && (a2 = this.read_lexical_vars()), ":" === this.token && ("?" === this.next().token && (l2 = true, this.next()), c2 = this.read_types());
          const u2 = (t3) => (t3.attrGroups = s2 || [], i2 && t3.loc && (t3.loc.start = i2, t3.loc.source && (t3.loc.source = this.lexer._input.substr(t3.loc.start.offset, t3.loc.end.offset - t3.loc.start.offset))), t3);
          return u2(1 === t2 ? r2(_2, o2, a2, c2, l2, e2) : r2(h2, _2, o2, c2, l2));
        }, read_lexical_vars() {
          let t2 = [];
          return this.token === this.tok.T_USE && (this.next(), this.expect("(") && this.next(), t2 = this.read_lexical_var_list(), this.expect(")") && this.next()), t2;
        }, read_list_with_dangling_comma(t2) {
          const e2 = [];
          for (; this.token != this.EOF; ) {
            if (e2.push(t2()), "," != this.token) {
              if (")" == this.token) break;
              this.error([",", ")"]);
              break;
            }
            if (this.next(), this.version >= 800 && ")" === this.token) return e2;
          }
          return e2;
        }, read_lexical_var_list() {
          return this.read_list_with_dangling_comma(this.read_lexical_var.bind(this));
        }, read_lexical_var() {
          if ("&" === this.token) return this.read_byref(this.read_lexical_var.bind(this));
          const t2 = this.node("variable");
          this.expect(this.tok.T_VARIABLE);
          const e2 = this.text().substring(1);
          return this.next(), t2(e2, false);
        }, read_parameter_list(t2) {
          if (")" !== this.token) {
            let e2 = false;
            return this.read_list_with_dangling_comma(function() {
              const s2 = this.read_parameter(t2);
              return s2 && (e2 && this.raiseError("Unexpected parameter after a variadic parameter"), s2.variadic && (e2 = true)), s2;
            }.bind(this), ",");
          }
          return [];
        }, read_parameter(t2) {
          const e2 = this.node("parameter");
          let s2 = null, i2 = null, n2 = false, r2 = false, o2 = [];
          this.token === this.tok.T_ATTRIBUTE && (o2 = this.read_attr_list()), this.version >= 801 && this.token === this.tok.T_READ_ONLY && (t2 ? (this.next(), r2 = true) : this.raiseError("readonly properties can be used only on class constructor"));
          const h2 = this.read_promoted();
          !r2 && this.version >= 801 && this.token === this.tok.T_READ_ONLY && (t2 ? (this.next(), r2 = true) : this.raiseError("readonly properties can be used only on class constructor")), "?" === this.token && (this.next(), n2 = true);
          const a2 = this.read_types();
          n2 && !a2 && this.raiseError("Expecting a type definition combined with nullable operator");
          const c2 = this.is_reference(), l2 = this.is_variadic();
          if (this.expect(this.tok.T_VARIABLE)) {
            s2 = this.node("identifier");
            const t3 = this.text().substring(1);
            this.next(), s2 = s2(t3);
          }
          "=" == this.token && (i2 = this.next().read_expr());
          const _2 = e2(s2, a2, i2, c2, l2, r2, n2, h2);
          return o2 && (_2.attrGroups = o2), _2;
        }, read_types() {
          const t2 = "unset", e2 = "union", s2 = "intersection", i2 = [];
          let n2 = t2;
          const r2 = this.read_type();
          if (!r2) return null;
          for (i2.push(r2); "|" === this.token || this.version >= 801 && "&" === this.token; ) {
            const r3 = this.peek();
            if (r3 === this.tok.T_ELLIPSIS || r3 === this.tok.T_VARIABLE) break;
            n2 === t2 ? n2 = "|" === this.token ? e2 : s2 : (n2 === e2 && "|" !== this.token || n2 === s2 && "&" !== this.token) && this.raiseError('Unexpect token "' + this.token + '", "|" and "&" can not be mixed'), this.next(), i2.push(this.read_type());
          }
          return 1 === i2.length ? i2[0] : n2 === s2 ? this.node("intersectiontype")(i2) : this.node("uniontype")(i2);
        }, read_promoted() {
          return this.token === this.tok.T_PUBLIC ? (this.next(), 1) : this.token === this.tok.T_PROTECTED ? (this.next(), 2) : this.token === this.tok.T_PRIVATE ? (this.next(), 4) : 0;
        }, read_argument_list() {
          let t2 = [];
          return this.expect("(") && this.next(), this.version >= 801 && this.token === this.tok.T_ELLIPSIS && ")" === this.peek() ? (t2.push(this.node("variadicplaceholder")()), this.next()) : ")" !== this.token && (t2 = this.read_non_empty_argument_list()), this.expect(")") && this.next(), t2;
        }, read_non_empty_argument_list() {
          let t2 = false;
          return this.read_function_list(function() {
            const e2 = this.read_argument();
            if (e2) {
              const s2 = "variadic" === e2.kind;
              t2 && !s2 && this.raiseError("Unexpected non-variadic argument after a variadic argument"), s2 && (t2 = true);
            }
            return e2;
          }.bind(this), ",");
        }, read_argument() {
          if (this.token === this.tok.T_ELLIPSIS) return this.node("variadic")(this.next().read_expr());
          if (this.token === this.tok.T_STRING || Object.values(this.lexer.keywords).includes(this.token)) {
            if (":" === this.peek()) return this.version < 800 && this.raiseError("PHP 8+ is required to use named arguments"), this.node("namedargument")(this.text(), this.next().next().read_expr());
          }
          return this.read_expr();
        }, read_type() {
          const t2 = this.node();
          if (this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE) {
            const e2 = this.text();
            return this.next(), t2("typereference", e2.toLowerCase(), e2);
          }
          if (this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_STATIC) {
            const e2 = this.text(), s2 = [this.token, this.lexer.getState()];
            return this.next(), this.token !== this.tok.T_NS_SEPARATOR && this.ast.typereference.types.indexOf(e2.toLowerCase()) > -1 ? t2("typereference", e2.toLowerCase(), e2) : (this.lexer.tokens.push(s2), this.next(), t2.destroy(), this.read_namespace_name());
          }
          return t2.destroy(), null;
        } }, I2 = { read_if() {
          const t2 = this.node("if"), e2 = this.next().read_if_expr();
          let s2, i2 = null, n2 = false;
          if (":" === this.token) {
            n2 = true, this.next(), s2 = this.node("block");
            const t3 = [];
            for (; this.token !== this.EOF && this.token !== this.tok.T_ENDIF; ) {
              if (this.token === this.tok.T_ELSEIF) {
                i2 = this.read_elseif_short();
                break;
              }
              if (this.token === this.tok.T_ELSE) {
                i2 = this.read_else_short();
                break;
              }
              t3.push(this.read_inner_statement());
            }
            s2 = s2(null, t3), this.expect(this.tok.T_ENDIF) && this.next(), this.expectEndOfStatement();
          } else s2 = this.read_statement(), this.token === this.tok.T_ELSEIF ? i2 = this.read_if() : this.token === this.tok.T_ELSE && (i2 = this.next().read_statement());
          return t2(e2, s2, i2, n2);
        }, read_if_expr() {
          this.expect("(") && this.next();
          const t2 = this.read_expr();
          return this.expect(")") && this.next(), t2;
        }, read_elseif_short() {
          let t2 = null;
          const e2 = this.node("if"), s2 = this.next().read_if_expr();
          this.expect(":") && this.next();
          const i2 = this.node("block"), n2 = [];
          for (; this.token != this.EOF && this.token !== this.tok.T_ENDIF; ) {
            if (this.token === this.tok.T_ELSEIF) {
              t2 = this.read_elseif_short();
              break;
            }
            if (this.token === this.tok.T_ELSE) {
              t2 = this.read_else_short();
              break;
            }
            n2.push(this.read_inner_statement());
          }
          return e2(s2, i2(null, n2), t2, true);
        }, read_else_short() {
          this.next().expect(":") && this.next();
          const t2 = this.node("block"), e2 = [];
          for (; this.token != this.EOF && this.token !== this.tok.T_ENDIF; ) e2.push(this.read_inner_statement());
          return t2(null, e2);
        } }, C = { read_while() {
          const t2 = this.node("while");
          let e2;
          this.expect(this.tok.T_WHILE) && this.next();
          let s2 = false;
          this.expect("(") && this.next();
          const i2 = this.read_expr();
          return this.expect(")") && this.next(), ":" === this.token ? (s2 = true, e2 = this.read_short_form(this.tok.T_ENDWHILE)) : e2 = this.read_statement(), t2(i2, e2, s2);
        }, read_do() {
          const t2 = this.node("do");
          this.expect(this.tok.T_DO) && this.next();
          let e2 = null;
          const s2 = this.read_statement();
          return this.expect(this.tok.T_WHILE) && (this.next().expect("(") && this.next(), e2 = this.read_expr(), this.expect(")") && this.next(), this.expect(";") && this.next()), t2(e2, s2);
        }, read_for() {
          const t2 = this.node("for");
          this.expect(this.tok.T_FOR) && this.next();
          let e2, s2 = [], i2 = [], n2 = [], r2 = false;
          return this.expect("(") && this.next(), ";" !== this.token ? (s2 = this.read_list(this.read_expr, ","), this.expect(";") && this.next()) : this.next(), ";" !== this.token ? (i2 = this.read_list(this.read_expr, ","), this.expect(";") && this.next()) : this.next(), ")" !== this.token ? (n2 = this.read_list(this.read_expr, ","), this.expect(")") && this.next()) : this.next(), ":" === this.token ? (r2 = true, e2 = this.read_short_form(this.tok.T_ENDFOR)) : e2 = this.read_statement(), t2(s2, i2, n2, e2, r2);
        }, read_foreach() {
          const t2 = this.node("foreach");
          this.expect(this.tok.T_FOREACH) && this.next();
          let e2, s2 = null, i2 = null, n2 = false;
          this.expect("(") && this.next();
          const r2 = this.read_expr();
          return this.expect(this.tok.T_AS) && (this.next(), i2 = this.read_foreach_variable(), this.token === this.tok.T_DOUBLE_ARROW && (s2 = i2, i2 = this.next().read_foreach_variable())), s2 && "list" === s2.kind && this.raiseError("Fatal Error : Cannot use list as key element"), this.expect(")") && this.next(), ":" === this.token ? (n2 = true, e2 = this.read_short_form(this.tok.T_ENDFOREACH)) : e2 = this.read_statement(), t2(r2, s2, i2, e2, n2);
        }, read_foreach_variable() {
          if (this.token === this.tok.T_LIST || "[" === this.token) {
            const t2 = "[" === this.token, e2 = this.node("list");
            this.next(), !t2 && this.expect("(") && this.next();
            const s2 = this.read_array_pair_list(t2);
            return this.expect(t2 ? "]" : ")") && this.next(), e2(s2, t2);
          }
          return this.read_variable(false, false);
        } }, S2 = { read_start() {
          return this.token == this.tok.T_NAMESPACE ? this.read_namespace() : this.read_top_statement();
        } }, O2 = { read_namespace() {
          const t2 = this.node("namespace");
          let e2, s2;
          return this.expect(this.tok.T_NAMESPACE) && this.next(), s2 = "{" === this.token ? { name: [""] } : this.read_namespace_name(), this.currentNamespace = s2, ";" === this.token ? (this.currentNamespace = s2, e2 = this.next().read_top_statements(), this.expect(this.EOF), t2(s2.name, e2, false)) : "{" === this.token ? (this.currentNamespace = s2, e2 = this.next().read_top_statements(), this.expect("}") && this.next(), 0 === e2.length && this.extractDoc && this._docs.length > this._docIndex && e2.push(this.node("noop")()), t2(s2.name, e2, true)) : (this.error(["{", ";"]), this.currentNamespace = s2, e2 = this.read_top_statements(), this.expect(this.EOF), t2(s2, e2, false));
        }, read_namespace_name(t2) {
          const e2 = this.node();
          let s2, i2 = this.text();
          switch (this.token) {
            case this.tok.T_NAME_RELATIVE:
              s2 = this.ast.name.RELATIVE_NAME, i2 = i2.replace(/^namespace\\/, "");
              break;
            case this.tok.T_NAME_QUALIFIED:
              s2 = this.ast.name.QUALIFIED_NAME;
              break;
            case this.tok.T_NAME_FULLY_QUALIFIED:
              s2 = this.ast.name.FULL_QUALIFIED_NAME;
              break;
            default:
              if (s2 = this.ast.name.UNQUALIFIED_NAME, !this.expect(this.tok.T_STRING)) return e2("name", "", this.ast.name.FULL_QUALIFIED_NAME);
          }
          if (this.next(), t2 || "(" !== this.token) {
            if ("parent" === i2.toLowerCase()) return e2("parentreference", i2);
            if ("self" === i2.toLowerCase()) return e2("selfreference", i2);
          }
          return e2("name", i2, s2);
        }, read_use_statement() {
          let t2 = this.node("usegroup"), e2 = [], s2 = null;
          this.expect(this.tok.T_USE) && this.next();
          const i2 = this.read_use_type();
          return e2.push(this.read_use_declaration(false)), "," === this.token ? e2 = e2.concat(this.next().read_use_declarations(false)) : "{" === this.token && (s2 = e2[0].name, e2 = this.next().read_use_declarations(null === i2), this.expect("}") && this.next()), t2 = t2(s2, i2, e2), this.expect(";") && this.next(), t2;
        }, read_class_name_reference() {
          return this.read_variable(true, false);
        }, read_use_declaration(t2) {
          const e2 = this.node("useitem");
          let s2 = null;
          t2 && (s2 = this.read_use_type());
          const i2 = this.read_namespace_name(), n2 = this.read_use_alias();
          return e2(i2.name, n2, s2);
        }, read_use_declarations(t2) {
          const e2 = [this.read_use_declaration(t2)];
          for (; "," === this.token; ) {
            if (this.next(), t2) {
              if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_FUNCTION && this.token !== this.tok.T_CONST && this.token !== this.tok.T_STRING) break;
            } else if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_STRING && this.token !== this.tok.T_NS_SEPARATOR) break;
            e2.push(this.read_use_declaration(t2));
          }
          return e2;
        }, read_use_alias() {
          let t2 = null;
          if (this.token === this.tok.T_AS && this.next().expect(this.tok.T_STRING)) {
            const e2 = this.node("identifier"), s2 = this.text();
            this.next(), t2 = e2(s2);
          }
          return t2;
        }, read_use_type() {
          return this.token === this.tok.T_FUNCTION ? (this.next(), this.ast.useitem.TYPE_FUNCTION) : this.token === this.tok.T_CONST ? (this.next(), this.ast.useitem.TYPE_CONST) : null;
        } };
        const R2 = { "\\": "\\", $: "$", n: "\n", r: "\r", t: "	", f: String.fromCharCode(12), v: String.fromCharCode(11), e: String.fromCharCode(27) };
        var v2 = { resolve_special_chars: (t2, e2) => e2 ? t2.replace(/\\"/, '"').replace(/\\([\\$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})/g, ((t3, e3, s2) => R2[e3] ? R2[e3] : "x" === e3[0] || "X" === e3[0] ? String.fromCodePoint(parseInt(e3.substr(1), 16)) : "u" === e3[0] ? String.fromCodePoint(parseInt(s2, 16)) : String.fromCodePoint(parseInt(e3, 8)))) : t2.replace(/\\\\/g, "\\").replace(/\\'/g, "'"), remove_heredoc_leading_whitespace_chars(t2, e2, s2, i2) {
          if (0 === e2) return t2;
          this.check_heredoc_indentation_level(t2, e2, s2, i2);
          const n2 = s2 ? " " : "	", r2 = new RegExp(`\\n${n2}{${e2}}`, "g"), o2 = new RegExp(`^${n2}{${e2}}`);
          return i2 && (t2 = t2.replace(o2, "")), t2.replace(r2, "\n");
        }, check_heredoc_indentation_level(t2, e2, s2, i2) {
          const n2 = t2.length;
          let r2 = 0, o2 = 0, h2 = true;
          const a2 = s2 ? " " : "	";
          let c2 = false;
          if (!i2) {
            if (r2 = t2.indexOf("\n"), -1 === r2) return;
            r2++;
          }
          for (; r2 < n2; ) h2 ? t2[r2] === a2 ? o2++ : c2 = true : h2 = false, "\n" !== t2[r2] && c2 && o2 < e2 ? this.raiseError(`Invalid body indentation level (expecting an indentation at least ${e2})`) : c2 = false, "\n" === t2[r2] && (h2 = true, o2 = 0), r2++;
        }, read_dereferencable_scalar() {
          let t2 = null;
          switch (this.token) {
            case this.tok.T_CONSTANT_ENCAPSED_STRING:
              {
                let e2 = this.node("string");
                const s2 = this.text();
                let i2 = 0;
                "b" !== s2[0] && "B" !== s2[0] || (i2 = 1);
                const n2 = '"' === s2[i2];
                this.next();
                e2 = e2(n2, this.resolve_special_chars(s2.substring(i2 + 1, s2.length - 1), n2), 1 === i2, s2), t2 = this.token === this.tok.T_DOUBLE_COLON ? this.read_static_getter(e2) : e2;
              }
              break;
            case this.tok.T_ARRAY:
            case "[":
              t2 = this.read_array();
          }
          return t2;
        }, read_scalar() {
          if (this.is("T_MAGIC_CONST")) return this.get_magic_constant();
          {
            let t2, e2;
            switch (this.token) {
              case this.tok.T_LNUMBER:
              case this.tok.T_DNUMBER: {
                const e3 = this.node("number");
                return t2 = this.text(), this.next(), e3(t2, null);
              }
              case this.tok.T_START_HEREDOC:
                if ("ST_NOWDOC" === this.lexer.curCondition) {
                  const s2 = this.lexer.yylloc.first_offset;
                  e2 = this.node("nowdoc"), t2 = this.next().text(), this.lexer.heredoc_label.indentation > 0 && (t2 = t2.substring(0, t2.length - this.lexer.heredoc_label.indentation));
                  const i2 = t2[t2.length - 1];
                  "\n" === i2 ? t2 = "\r" === t2[t2.length - 2] ? t2.substring(0, t2.length - 2) : t2.substring(0, t2.length - 1) : "\r" === i2 && (t2 = t2.substring(0, t2.length - 1)), this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE) && this.next(), this.expect(this.tok.T_END_HEREDOC) && this.next();
                  const n2 = this.lexer._input.substring(s2, this.lexer.yylloc.first_offset);
                  return e2 = e2(this.remove_heredoc_leading_whitespace_chars(t2, this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node), n2, this.lexer.heredoc_label.label), this.lexer.heredoc_label.finished = true, e2;
                }
                return this.read_encapsed_string(this.tok.T_END_HEREDOC);
              case '"':
                return this.read_encapsed_string('"');
              case 'b"':
              case 'B"':
                return this.read_encapsed_string('"', true);
              case this.tok.T_CONSTANT_ENCAPSED_STRING:
              case this.tok.T_ARRAY:
              case "[":
                return this.read_dereferencable_scalar();
              default: {
                const t3 = this.error("SCALAR");
                return this.next(), t3;
              }
            }
          }
        }, read_dereferencable(t2) {
          let e2, s2;
          const i2 = this.node("offsetlookup");
          return "[" === this.token ? (s2 = this.next().read_expr(), this.expect("]") && this.next(), e2 = i2(t2, s2)) : this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES && (s2 = this.read_encapsed_string_item(false), e2 = i2(t2, s2)), e2;
        }, read_encapsed_string_item(t2) {
          const e2 = this.node("encapsedpart");
          let s2, i2, n2, r2 = null, o2 = false, h2 = this.node();
          if (this.token === this.tok.T_ENCAPSED_AND_WHITESPACE) {
            const e3 = this.text();
            this.next(), h2 = h2("string", false, this.version >= 703 && !this.lexer.heredoc_label.finished ? this.remove_heredoc_leading_whitespace_chars(this.resolve_special_chars(e3, t2), this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node) : e3, false, e3);
          } else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
            if (r2 = "simple", o2 = true, this.next().token === this.tok.T_STRING_VARNAME) {
              n2 = this.node("variable");
              const t3 = this.text();
              this.next(), h2.destroy(), "[" === this.token ? (n2 = n2(t3, false), i2 = this.node("offsetlookup"), s2 = this.next().read_expr(), this.expect("]") && this.next(), h2 = i2(n2, s2)) : h2 = n2(t3, false);
            } else h2 = h2("variable", this.read_expr(), false);
            this.expect("}") && this.next();
          } else if (this.token === this.tok.T_CURLY_OPEN) r2 = "complex", h2.destroy(), h2 = this.next().read_variable(false, false), this.expect("}") && this.next();
          else if (this.token === this.tok.T_VARIABLE) {
            if (r2 = "simple", h2.destroy(), h2 = this.read_simple_variable(), "[" === this.token && (i2 = this.node("offsetlookup"), s2 = this.next().read_encaps_var_offset(), this.expect("]") && this.next(), h2 = i2(h2, s2)), this.token === this.tok.T_OBJECT_OPERATOR) {
              i2 = this.node("propertylookup"), this.next().expect(this.tok.T_STRING);
              const t3 = this.node("identifier");
              n2 = this.text(), this.next(), h2 = i2(h2, t3(n2));
            }
          } else {
            this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE);
            const t3 = this.text();
            this.next(), h2.destroy(), h2 = h2("string", false, t3, false, t3);
          }
          return this.lexer.heredoc_label.first_encaps_node = false, e2(h2, r2, o2);
        }, read_encapsed_string(t2) {
          let e2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          const s2 = this.lexer.yylloc.first_offset;
          let i2 = this.node("encapsed");
          this.next();
          const n2 = this.lexer.yylloc.prev_offset - (e2 ? 1 : 0), r2 = [];
          let o2;
          for (o2 = "`" === t2 ? this.ast.encapsed.TYPE_SHELL : '"' === t2 ? this.ast.encapsed.TYPE_STRING : this.ast.encapsed.TYPE_HEREDOC; this.token !== t2 && this.token !== this.EOF; ) r2.push(this.read_encapsed_string_item(true));
          if (r2.length > 0 && "encapsedpart" === r2[r2.length - 1].kind && "string" === r2[r2.length - 1].expression.kind) {
            const t3 = r2[r2.length - 1].expression, e3 = t3.value[t3.value.length - 1];
            "\n" === e3 ? "\r" === t3.value[t3.value.length - 2] ? t3.value = t3.value.substring(0, t3.value.length - 2) : t3.value = t3.value.substring(0, t3.value.length - 1) : "\r" === e3 && (t3.value = t3.value.substring(0, t3.value.length - 1));
          }
          this.expect(t2) && this.next();
          return i2 = i2(r2, this.lexer._input.substring("heredoc" === o2 ? s2 : n2 - 1, this.lexer.yylloc.first_offset), o2), t2 === this.tok.T_END_HEREDOC && (i2.label = this.lexer.heredoc_label.label, this.lexer.heredoc_label.finished = true), i2;
        }, get_magic_constant() {
          const t2 = this.node("magic"), e2 = this.text();
          return this.next(), t2(e2.toUpperCase(), e2);
        } }, w2 = { read_top_statements() {
          let t2 = [];
          for (; this.token !== this.EOF && "}" !== this.token; ) {
            const e2 = this.read_top_statement();
            e2 && (Array.isArray(e2) ? t2 = t2.concat(e2) : t2.push(e2));
          }
          return t2;
        }, read_top_statement() {
          let t2 = [];
          switch (this.token === this.tok.T_ATTRIBUTE && (t2 = this.read_attr_list()), this.token) {
            case this.tok.T_FUNCTION:
              return this.read_function(false, false, t2);
            case this.tok.T_ABSTRACT:
            case this.tok.T_FINAL:
            case this.tok.T_READ_ONLY:
            case this.tok.T_CLASS:
              return this.read_class_declaration_statement(t2);
            case this.tok.T_INTERFACE:
              return this.read_interface_declaration_statement(t2);
            case this.tok.T_TRAIT:
              return this.read_trait_declaration_statement();
            case this.tok.T_ENUM:
              return this.read_enum_declaration_statement(t2);
            case this.tok.T_USE:
              return this.read_use_statement();
            case this.tok.T_CONST: {
              const t3 = this.node("constantstatement"), e2 = this.next().read_const_list();
              return this.expectEndOfStatement(), t3(null, e2);
            }
            case this.tok.T_NAMESPACE:
              return this.read_namespace();
            case this.tok.T_HALT_COMPILER: {
              const t3 = this.node("halt");
              return this.next().expect("(") && this.next(), this.expect(")") && this.next(), this.expect(";"), this.lexer.done = true, t3(this.lexer._input.substring(this.lexer.offset));
            }
            default:
              return this.read_statement();
          }
        }, read_inner_statements() {
          let t2 = [];
          for (; this.token != this.EOF && "}" !== this.token; ) {
            const e2 = this.read_inner_statement();
            e2 && (Array.isArray(e2) ? t2 = t2.concat(e2) : t2.push(e2));
          }
          return t2;
        }, read_const_list() {
          return this.read_list((function() {
            this.expect(this.tok.T_STRING);
            const t2 = this.node("constant");
            let e2 = this.node("identifier");
            const s2 = this.text();
            return this.next(), e2 = e2(s2), this.expect("=") ? t2(e2, this.next().read_expr()) : t2(e2, null);
          }), ",", false);
        }, read_declare_list() {
          const t2 = [];
          for (; this.token != this.EOF && ")" !== this.token; ) {
            this.expect(this.tok.T_STRING);
            const e2 = this.node("declaredirective");
            let s2 = this.node("identifier");
            const i2 = this.text();
            this.next(), s2 = s2(i2);
            let n2 = null;
            if (this.expect("=") && (n2 = this.next().read_expr()), t2.push(e2(s2, n2)), "," !== this.token) break;
            this.next();
          }
          return t2;
        }, read_inner_statement() {
          let t2 = [];
          switch (this.token === this.tok.T_ATTRIBUTE && (t2 = this.read_attr_list()), this.token) {
            case this.tok.T_FUNCTION: {
              const e2 = this.read_function(false, false);
              return e2.attrGroups = t2, e2;
            }
            case this.tok.T_ABSTRACT:
            case this.tok.T_FINAL:
            case this.tok.T_CLASS:
              return this.read_class_declaration_statement();
            case this.tok.T_INTERFACE:
              return this.read_interface_declaration_statement();
            case this.tok.T_TRAIT:
              return this.read_trait_declaration_statement();
            case this.tok.T_ENUM:
              return this.read_enum_declaration_statement();
            case this.tok.T_HALT_COMPILER: {
              this.raiseError("__HALT_COMPILER() can only be used from the outermost scope");
              let t3 = this.node("halt");
              return this.next().expect("(") && this.next(), this.expect(")") && this.next(), t3 = t3(this.lexer._input.substring(this.lexer.offset)), this.expect(";") && this.next(), t3;
            }
            default:
              return this.read_statement();
          }
        }, read_statement() {
          switch (this.token) {
            case "{":
              return this.read_code_block(false);
            case this.tok.T_IF:
              return this.read_if();
            case this.tok.T_SWITCH:
              return this.read_switch();
            case this.tok.T_FOR:
              return this.read_for();
            case this.tok.T_FOREACH:
              return this.read_foreach();
            case this.tok.T_WHILE:
              return this.read_while();
            case this.tok.T_DO:
              return this.read_do();
            case this.tok.T_COMMENT:
              return this.read_comment();
            case this.tok.T_DOC_COMMENT:
              return this.read_doc_comment();
            case this.tok.T_RETURN: {
              const t2 = this.node("return");
              this.next();
              const e2 = this.read_optional_expr(";");
              return this.expectEndOfStatement(), t2(e2);
            }
            case this.tok.T_BREAK:
            case this.tok.T_CONTINUE: {
              const t2 = this.node(this.token === this.tok.T_CONTINUE ? "continue" : "break");
              this.next();
              const e2 = this.read_optional_expr(";");
              return this.expectEndOfStatement(), t2(e2);
            }
            case this.tok.T_GLOBAL: {
              const t2 = this.node("global"), e2 = this.next().read_list(this.read_simple_variable, ",");
              return this.expectEndOfStatement(), t2(e2);
            }
            case this.tok.T_STATIC: {
              const t2 = [this.token, this.lexer.getState()], e2 = this.node();
              if (this.next().token === this.tok.T_DOUBLE_COLON) {
                this.lexer.tokens.push(t2);
                const s3 = this.next().read_expr();
                return this.expectEndOfStatement(s3), e2("expressionstatement", s3);
              }
              if (this.token === this.tok.T_FUNCTION) return this.read_function(true, [0, 1, 0]);
              const s2 = this.read_variable_declarations();
              return this.expectEndOfStatement(), e2("static", s2);
            }
            case this.tok.T_ECHO: {
              const t2 = this.node("echo"), e2 = this.text(), s2 = "<?=" === e2 || "<%=" === e2, i2 = this.next().read_function_list(this.read_expr, ",");
              return this.expectEndOfStatement(), t2(i2, s2);
            }
            case this.tok.T_INLINE_HTML: {
              const t2 = this.text();
              let e2 = this.lexer.yylloc.first_offset > 0 ? this.lexer._input[this.lexer.yylloc.first_offset - 1] : null;
              const s2 = "\r" === e2 || "\n" === e2;
              s2 && "\n" === e2 && this.lexer.yylloc.first_offset > 1 && "\r" === this.lexer._input[this.lexer.yylloc.first_offset - 2] && (e2 = "\r\n");
              const i2 = this.node("inline");
              return this.next(), i2(t2, s2 ? e2 + t2 : t2);
            }
            case this.tok.T_UNSET: {
              const t2 = this.node("unset");
              this.next().expect("(") && this.next();
              const e2 = this.read_function_list(this.read_variable, ",");
              return this.expect(")") && this.next(), this.expect(";") && this.next(), t2(e2);
            }
            case this.tok.T_DECLARE: {
              const t2 = this.node("declare"), e2 = [];
              let s2;
              this.next().expect("(") && this.next();
              const i2 = this.read_declare_list();
              if (this.expect(")") && this.next(), ":" === this.token) {
                for (this.next(); this.token != this.EOF && this.token !== this.tok.T_ENDDECLARE; ) e2.push(this.read_top_statement());
                0 === e2.length && this.extractDoc && this._docs.length > this._docIndex && e2.push(this.node("noop")()), this.expect(this.tok.T_ENDDECLARE) && this.next(), this.expectEndOfStatement(), s2 = this.ast.declare.MODE_SHORT;
              } else if ("{" === this.token) {
                for (this.next(); this.token != this.EOF && "}" !== this.token; ) e2.push(this.read_top_statement());
                0 === e2.length && this.extractDoc && this._docs.length > this._docIndex && e2.push(this.node("noop")()), this.expect("}") && this.next(), s2 = this.ast.declare.MODE_BLOCK;
              } else this.expect(";") && this.next(), s2 = this.ast.declare.MODE_NONE;
              return t2(i2, e2, s2);
            }
            case this.tok.T_TRY:
              return this.read_try();
            case this.tok.T_THROW: {
              const t2 = this.node("throw"), e2 = this.next().read_expr();
              return this.expectEndOfStatement(), t2(e2);
            }
            case ";":
              return this.next(), null;
            case this.tok.T_STRING: {
              const t2 = this.node(), e2 = [this.token, this.lexer.getState()], s2 = this.text();
              let i2 = this.node("identifier");
              if (":" === this.next().token) return i2 = i2(s2), this.next(), t2("label", i2);
              i2.destroy(), t2.destroy(), this.lexer.tokens.push(e2);
              const n2 = this.node("expressionstatement"), r2 = this.next().read_expr();
              return this.expectEndOfStatement(r2), n2(r2);
            }
            case this.tok.T_GOTO: {
              const t2 = this.node("goto");
              let e2 = null;
              if (this.next().expect(this.tok.T_STRING)) {
                e2 = this.node("identifier");
                const t3 = this.text();
                this.next(), e2 = e2(t3), this.expectEndOfStatement();
              }
              return t2(e2);
            }
            default: {
              const t2 = this.node("expressionstatement"), e2 = this.read_expr();
              return this.expectEndOfStatement(e2), t2(e2);
            }
          }
        }, read_code_block(t2) {
          const e2 = this.node("block");
          this.expect("{") && this.next();
          const s2 = t2 ? this.read_top_statements() : this.read_inner_statements();
          return 0 === s2.length && this.extractDoc && this._docs.length > this._docIndex && s2.push(this.node("noop")()), this.expect("}") && this.next(), e2(null, s2);
        } }, D = { read_switch() {
          const t2 = this.node("switch");
          this.expect(this.tok.T_SWITCH) && this.next(), this.expect("(") && this.next();
          const e2 = this.read_expr();
          this.expect(")") && this.next();
          const s2 = ":" === this.token;
          return t2(e2, this.read_switch_case_list(), s2);
        }, read_switch_case_list() {
          let t2 = null;
          const e2 = this.node("block"), s2 = [];
          for ("{" === this.token ? t2 = "}" : ":" === this.token ? t2 = this.tok.T_ENDSWITCH : this.expect(["{", ":"]), this.next(), ";" === this.token && this.next(); this.token !== this.EOF && this.token !== t2; ) s2.push(this.read_case_list(t2));
          return 0 === s2.length && this.extractDoc && this._docs.length > this._docIndex && s2.push(this.node("noop")()), this.expect(t2) && this.next(), t2 === this.tok.T_ENDSWITCH && this.expectEndOfStatement(), e2(null, s2);
        }, read_case_list(t2) {
          const e2 = this.node("case");
          let s2 = null;
          this.token === this.tok.T_CASE ? s2 = this.next().read_expr() : this.token === this.tok.T_DEFAULT ? this.next() : this.expect([this.tok.T_CASE, this.tok.T_DEFAULT]), this.expect([":", ";"]) && this.next();
          const i2 = this.node("block"), n2 = [];
          for (; this.token !== this.EOF && this.token !== t2 && this.token !== this.tok.T_CASE && this.token !== this.tok.T_DEFAULT; ) n2.push(this.read_inner_statement());
          return e2(s2, i2(null, n2));
        } }, U2 = { read_try() {
          this.expect(this.tok.T_TRY);
          const t2 = this.node("try");
          let e2 = null;
          const s2 = [], i2 = this.next().read_statement();
          for (; this.token === this.tok.T_CATCH; ) {
            const t3 = this.node("catch");
            this.next().expect("(") && this.next();
            const e3 = this.read_list(this.read_namespace_name, "|", false);
            let i3 = null;
            (this.version < 800 || this.token === this.tok.T_VARIABLE) && (i3 = this.read_variable(true, false)), this.expect(")"), s2.push(t3(this.next().read_statement(), e3, i3));
          }
          return this.token === this.tok.T_FINALLY && (e2 = this.next().read_statement()), t2(i2, s2, e2);
        } }, P = { read_short_form(t2) {
          const e2 = this.node("block"), s2 = [];
          for (this.expect(":") && this.next(); this.token != this.EOF && this.token !== t2; ) s2.push(this.read_inner_statement());
          return 0 === s2.length && this.extractDoc && this._docs.length > this._docIndex && s2.push(this.node("noop")()), this.expect(t2) && this.next(), this.expectEndOfStatement(), e2(null, s2);
        }, read_function_list(t2, e2) {
          const s2 = [];
          do {
            if (this.token == e2 && this.version >= 703 && s2.length > 0) {
              s2.push(this.node("noop")());
              break;
            }
            if (s2.push(t2.apply(this, [])), this.token != e2) break;
            if (")" == this.next().token && this.version >= 703) break;
          } while (this.token != this.EOF);
          return s2;
        }, read_list(t2, e2, s2) {
          const i2 = [];
          if (this.token == e2 && (s2 && i2.push("function" == typeof t2 ? this.node("noop")() : null), this.next()), "function" == typeof t2) do {
            const s3 = t2.apply(this, []);
            if (s3 && i2.push(s3), this.token != e2) break;
          } while (this.next().token != this.EOF);
          else {
            if (!this.expect(t2)) return [];
            for (i2.push(this.text()); this.next().token != this.EOF && this.token == e2 && this.next().token == t2; ) i2.push(this.text());
          }
          return i2;
        }, read_name_list() {
          return this.read_list(this.read_namespace_name, ",", false);
        }, read_byref(t2) {
          let e2 = this.node("byref");
          this.next(), e2 = e2(null);
          const s2 = t2();
          return s2 && (this.ast.swapLocations(s2, e2, s2, this), s2.byref = true), s2;
        }, read_variable_declarations() {
          return this.read_list((function() {
            const t2 = this.node("staticvariable");
            let e2 = this.node("variable");
            if (this.expect(this.tok.T_VARIABLE)) {
              const t3 = this.text().substring(1);
              this.next(), e2 = e2(t3, false);
            } else e2 = e2("#ERR", false);
            return "=" === this.token ? t2(e2, this.next().read_expr()) : e2;
          }), ",");
        }, read_extends_from() {
          return this.token === this.tok.T_EXTENDS ? this.next().read_namespace_name() : null;
        }, read_interface_extends_list() {
          return this.token === this.tok.T_EXTENDS ? this.next().read_name_list() : null;
        }, read_implements_list() {
          return this.token === this.tok.T_IMPLEMENTS ? this.next().read_name_list() : null;
        } }, F = { read_variable(t2, e2) {
          let s2;
          if ("&" === this.token) return this.read_byref(this.read_variable.bind(this, t2, e2));
          if (this.is([this.tok.T_VARIABLE, "$"])) s2 = this.read_reference_variable(e2);
          else if (this.is([this.tok.T_NS_SEPARATOR, this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE])) {
            s2 = this.node();
            const t3 = this.read_namespace_name();
            if (this.token != this.tok.T_DOUBLE_COLON && "(" != this.token && -1 === ["parentreference", "selfreference"].indexOf(t3.kind)) {
              const e3 = t3.name.toLowerCase();
              "true" === e3 ? s2 = t3.destroy(s2("boolean", true, t3.name)) : "false" === e3 ? s2 = t3.destroy(s2("boolean", false, t3.name)) : "null" === e3 ? s2 = t3.destroy(s2("nullkeyword", t3.name)) : (s2.destroy(t3), s2 = t3);
            } else s2.destroy(t3), s2 = t3;
          } else if (this.token === this.tok.T_STATIC) {
            s2 = this.node("staticreference");
            const t3 = this.text();
            this.next(), s2 = s2(t3);
          } else this.expect("VARIABLE");
          return this.token === this.tok.T_DOUBLE_COLON && (s2 = this.read_static_getter(s2, e2)), this.recursive_variable_chain_scan(s2, t2, e2);
        }, read_static_getter(t2, e2) {
          const s2 = this.node("staticlookup");
          let i2, n2;
          return this.next().is([this.tok.T_VARIABLE, "$"]) ? i2 = this.read_reference_variable(e2) : this.token === this.tok.T_STRING || this.token === this.tok.T_CLASS || this.version >= 700 && this.is("IDENTIFIER") ? (i2 = this.node("identifier"), n2 = this.text(), this.next(), i2 = i2(n2)) : "{" === this.token ? (i2 = this.node("literal"), n2 = this.next().read_expr(), this.expect("}") && this.next(), i2 = i2("literal", n2, null)) : (this.error([this.tok.T_VARIABLE, this.tok.T_STRING]), i2 = this.node("identifier"), n2 = this.text(), this.next(), i2 = i2(n2)), s2(t2, i2);
        }, read_what() {
          let t2, e2, s2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          switch (this.next().token) {
            case this.tok.T_STRING:
              t2 = this.node("identifier"), e2 = this.text(), this.next(), t2 = t2(e2), s2 && this.token === this.tok.T_OBJECT_OPERATOR && this.error();
              break;
            case this.tok.T_VARIABLE:
              t2 = this.node("variable"), e2 = this.text().substring(1), this.next(), t2 = t2(e2, false);
              break;
            case this.tok.T_CLASS:
              s2 || this.error(), t2 = this.node("identifier"), e2 = this.text(), this.next(), t2 = t2(e2, false);
              break;
            case "$":
              t2 = this.node(), this.next().expect(["$", "{", this.tok.T_VARIABLE]), "{" === this.token ? (e2 = this.next().read_expr(), this.expect("}") && this.next(), t2 = t2("variable", e2, true)) : (e2 = this.read_expr(), t2 = t2("variable", e2, false));
              break;
            case "{":
              t2 = this.node("encapsedpart"), e2 = this.next().read_expr(), this.expect("}") && this.next(), t2 = t2(e2, "complex", false);
              break;
            default:
              this.error([this.tok.T_STRING, this.tok.T_VARIABLE, "$", "{"]), t2 = this.node("identifier"), e2 = this.text(), this.next(), t2 = t2(e2);
          }
          return t2;
        }, recursive_variable_chain_scan(t2, e2, s2) {
          let i2, n2;
          t: for (; this.token != this.EOF; ) switch (this.token) {
            case "(":
              if (e2) return t2;
              t2 = this.node("call")(t2, this.read_argument_list());
              break;
            case "[":
            case "{": {
              const e3 = "[" === this.token;
              if (i2 = this.node("offsetlookup"), this.next(), n2 = false, s2) n2 = this.read_encaps_var_offset(), this.expect(e3 ? "]" : "}") && this.next();
              else {
                (e3 ? "]" !== this.token : "}" !== this.token) ? (n2 = this.read_expr(), this.expect(e3 ? "]" : "}") && this.next()) : this.next();
              }
              t2 = i2(t2, n2);
              break;
            }
            case this.tok.T_DOUBLE_COLON:
              "staticlookup" === t2.kind && "identifier" === t2.offset.kind && this.error(), i2 = this.node("staticlookup"), t2 = i2(t2, this.read_what(true));
              break;
            case this.tok.T_OBJECT_OPERATOR:
              i2 = this.node("propertylookup"), t2 = i2(t2, this.read_what());
              break;
            case this.tok.T_NULLSAFE_OBJECT_OPERATOR:
              i2 = this.node("nullsafepropertylookup"), t2 = i2(t2, this.read_what());
              break;
            default:
              break t;
          }
          return t2;
        }, read_encaps_var_offset() {
          let t2 = this.node();
          if (this.token === this.tok.T_STRING) {
            const e2 = this.text();
            this.next(), t2 = t2("identifier", e2);
          } else if (this.token === this.tok.T_NUM_STRING) {
            const e2 = this.text();
            this.next(), t2 = t2("number", e2, null);
          } else if ("-" === this.token) {
            this.next();
            const e2 = -1 * this.text();
            this.expect(this.tok.T_NUM_STRING) && this.next(), t2 = t2("number", e2, null);
          } else if (this.token === this.tok.T_VARIABLE) {
            const e2 = this.text().substring(1);
            this.next(), t2 = t2("variable", e2, false);
          } else {
            this.expect([this.tok.T_STRING, this.tok.T_NUM_STRING, "-", this.tok.T_VARIABLE]);
            const e2 = this.text();
            this.next(), t2 = t2("identifier", e2);
          }
          return t2;
        }, read_reference_variable(t2) {
          let e2, s2 = this.read_simple_variable();
          for (; this.token != this.EOF; ) {
            const i2 = this.node();
            if ("{" != this.token || t2) {
              i2.destroy();
              break;
            }
            e2 = this.next().read_expr(), this.expect("}") && this.next(), s2 = i2("offsetlookup", s2, e2);
          }
          return s2;
        }, read_simple_variable() {
          let t2, e2 = this.node("variable");
          if (this.expect([this.tok.T_VARIABLE, "$"]) && this.token === this.tok.T_VARIABLE) t2 = this.text().substring(1), this.next(), e2 = e2(t2, false);
          else switch ("$" === this.token && this.next(), this.token) {
            case "{": {
              const t3 = this.next().read_expr();
              this.expect("}") && this.next(), e2 = e2(t3, true);
              break;
            }
            case "$":
              e2 = e2(this.read_simple_variable(), false);
              break;
            case this.tok.T_VARIABLE: {
              t2 = this.text().substring(1);
              const s2 = this.node("variable");
              this.next(), e2 = e2(s2(t2, false), false);
              break;
            }
            default:
              this.error(["{", "$", this.tok.T_VARIABLE]), t2 = this.text(), this.next(), e2 = e2(t2, false);
          }
          return e2;
        } };
        const M2 = m;
        function B(t2) {
          return "." != t2 && "," != t2 && !isNaN(parseFloat(t2)) && isFinite(t2);
        }
        const H2 = function(t2, e2) {
          this.lexer = t2, this.ast = e2, this.tok = t2.tok, this.EOF = t2.EOF, this.token = null, this.prev = null, this.debug = false, this.version = 803, this.extractDoc = false, this.extractTokens = false, this.suppressErrors = false;
          const s2 = function(t3) {
            return [t3, null];
          };
          this.entries = { IDENTIFIER: new Map([this.tok.T_ABSTRACT, this.tok.T_ARRAY, this.tok.T_AS, this.tok.T_BREAK, this.tok.T_CALLABLE, this.tok.T_CASE, this.tok.T_CATCH, this.tok.T_CLASS, this.tok.T_CLASS_C, this.tok.T_CLONE, this.tok.T_CONST, this.tok.T_CONTINUE, this.tok.T_DECLARE, this.tok.T_DEFAULT, this.tok.T_DIR, this.tok.T_DO, this.tok.T_ECHO, this.tok.T_ELSE, this.tok.T_ELSEIF, this.tok.T_EMPTY, this.tok.T_ENDDECLARE, this.tok.T_ENDFOR, this.tok.T_ENDFOREACH, this.tok.T_ENDIF, this.tok.T_ENDSWITCH, this.tok.T_ENDWHILE, this.tok.T_ENUM, this.tok.T_EVAL, this.tok.T_EXIT, this.tok.T_EXTENDS, this.tok.T_FILE, this.tok.T_FINAL, this.tok.T_FINALLY, this.tok.T_FN, this.tok.T_FOR, this.tok.T_FOREACH, this.tok.T_FUNC_C, this.tok.T_FUNCTION, this.tok.T_GLOBAL, this.tok.T_GOTO, this.tok.T_IF, this.tok.T_IMPLEMENTS, this.tok.T_INCLUDE, this.tok.T_INCLUDE_ONCE, this.tok.T_INSTANCEOF, this.tok.T_INSTEADOF, this.tok.T_INTERFACE, this.tok.T_ISSET, this.tok.T_LINE, this.tok.T_LIST, this.tok.T_LOGICAL_AND, this.tok.T_LOGICAL_OR, this.tok.T_LOGICAL_XOR, this.tok.T_MATCH, this.tok.T_METHOD_C, this.tok.T_NAMESPACE, this.tok.T_NEW, this.tok.T_NS_C, this.tok.T_PRINT, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_PUBLIC, this.tok.T_READ_ONLY, this.tok.T_REQUIRE, this.tok.T_REQUIRE_ONCE, this.tok.T_RETURN, this.tok.T_STATIC, this.tok.T_SWITCH, this.tok.T_THROW, this.tok.T_TRAIT, this.tok.T_TRY, this.tok.T_UNSET, this.tok.T_USE, this.tok.T_VAR, this.tok.T_WHILE, this.tok.T_YIELD].map(s2)), VARIABLE: new Map([this.tok.T_VARIABLE, "$", "&", this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE, this.tok.T_STATIC].map(s2)), SCALAR: new Map([this.tok.T_CONSTANT_ENCAPSED_STRING, this.tok.T_START_HEREDOC, this.tok.T_LNUMBER, this.tok.T_DNUMBER, this.tok.T_ARRAY, "[", this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C, '"', 'b"', 'B"', "-", this.tok.T_NS_SEPARATOR].map(s2)), T_MAGIC_CONST: new Map([this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C].map(s2)), T_MEMBER_FLAGS: new Map([this.tok.T_PUBLIC, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_STATIC, this.tok.T_ABSTRACT, this.tok.T_FINAL].map(s2)), EOS: new Map([";", this.EOF, this.tok.T_INLINE_HTML].map(s2)), EXPR: new Map(["@", "-", "+", "!", "~", "(", "`", this.tok.T_LIST, this.tok.T_CLONE, this.tok.T_INC, this.tok.T_DEC, this.tok.T_NEW, this.tok.T_ISSET, this.tok.T_EMPTY, this.tok.T_MATCH, this.tok.T_INCLUDE, this.tok.T_INCLUDE_ONCE, this.tok.T_REQUIRE, this.tok.T_REQUIRE_ONCE, this.tok.T_EVAL, this.tok.T_INT_CAST, this.tok.T_DOUBLE_CAST, this.tok.T_STRING_CAST, this.tok.T_ARRAY_CAST, this.tok.T_OBJECT_CAST, this.tok.T_BOOL_CAST, this.tok.T_UNSET_CAST, this.tok.T_EXIT, this.tok.T_PRINT, this.tok.T_YIELD, this.tok.T_STATIC, this.tok.T_FUNCTION, this.tok.T_FN, this.tok.T_VARIABLE, "$", this.tok.T_NS_SEPARATOR, this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_STRING, this.tok.T_CONSTANT_ENCAPSED_STRING, this.tok.T_START_HEREDOC, this.tok.T_LNUMBER, this.tok.T_DNUMBER, this.tok.T_ARRAY, "[", this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C, '"', 'b"', 'B"', "-", this.tok.T_NS_SEPARATOR].map(s2)) };
        };
        H2.prototype.getTokenName = function(t2) {
          return B(t2) ? t2 == this.EOF ? "the end of file (EOF)" : this.lexer.engine.tokens.values[t2] : "'" + t2 + "'";
        }, H2.prototype.parse = function(t2, e2) {
          this._errors = [], this.filename = e2 || "eval", this.currentNamespace = [""], this.extractDoc ? this._docs = [] : this._docs = null, this.extractTokens ? this._tokens = [] : this._tokens = null, this._docIndex = 0, this._lastNode = null, this.lexer.setInput(t2), this.lexer.all_tokens = this.extractTokens, this.lexer.comment_tokens = this.extractDoc, this.length = this.lexer._input.length, this.innerList = false, this.innerListForm = false;
          const s2 = this.node("program"), i2 = [];
          for (this.next(); this.token != this.EOF; ) i2.push(this.read_start());
          0 === i2.length && this.extractDoc && this._docs.length > this._docIndex && i2.push(this.node("noop")()), this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
          const n2 = s2(i2, this._errors, this._docs, this._tokens);
          if (this.debug) {
            const t3 = this.ast.checkNodes();
            if (t3.length > 0) throw t3.forEach((function(t4) {
              t4.position && console.log("Node at line " + t4.position.line + ", column " + t4.position.column), console.log(t4.stack.join("\n"));
            })), new Error("Some nodes are not closed");
          }
          return n2;
        }, H2.prototype.raiseError = function(t2, e2, s2, i2) {
          if (t2 += " on line " + this.lexer.yylloc.first_line, !this.suppressErrors) {
            const e3 = new SyntaxError(t2, this.filename, this.lexer.yylloc.first_line);
            throw e3.lineNumber = this.lexer.yylloc.first_line, e3.fileName = this.filename, e3.columnNumber = this.lexer.yylloc.first_column, e3;
          }
          const n2 = this.ast.prepare("error", null, this)(t2, i2, this.lexer.yylloc.first_line, s2);
          return this._errors.push(n2), n2;
        }, H2.prototype.error = function(t2) {
          let e2 = "Parse Error : syntax error", s2 = this.getTokenName(this.token), i2 = "";
          if (this.token !== this.EOF) {
            if (B(this.token)) {
              let t3 = this.text();
              t3.length > 10 && (t3 = t3.substring(0, 7) + "..."), s2 = "'" + t3 + "' (" + s2 + ")";
            }
            e2 += ", unexpected " + s2;
          }
          return t2 && !Array.isArray(t2) && ((B(t2) || 1 === t2.length) && (i2 = ", expecting " + this.getTokenName(t2)), e2 += i2), this.raiseError(e2, i2, t2, s2);
        }, H2.prototype.position = function() {
          return new M2(this.lexer.yylloc.first_line, this.lexer.yylloc.first_column, this.lexer.yylloc.first_offset);
        }, H2.prototype.node = function(t2) {
          if (this.extractDoc) {
            let e2 = null;
            this._docIndex < this._docs.length && (e2 = this._docs.slice(this._docIndex), this._docIndex = this._docs.length, this.debug && (console.log(new Error("Append docs on " + t2)), console.log(e2)));
            const s2 = this.ast.prepare(t2, e2, this);
            return s2.postBuild = function(t3) {
              if (this._docIndex < this._docs.length) if (this._lastNode) {
                const t4 = this.prev[2];
                let e3 = this._docIndex;
                for (; e3 < this._docs.length && !(this._docs[e3].offset > t4); e3++) ;
                e3 > this._docIndex && (this._lastNode.setTrailingComments(this._docs.slice(this._docIndex, e3)), this._docIndex = e3);
              } else this.token === this.EOF && (t3.setTrailingComments(this._docs.slice(this._docIndex)), this._docIndex = this._docs.length);
              this._lastNode = t3;
            }.bind(this), s2;
          }
          return this.ast.prepare(t2, null, this);
        }, H2.prototype.expectEndOfStatement = function(t2) {
          if (";" === this.token) t2 && ";" === this.lexer.yytext && t2.includeToken(this);
          else if (this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) return this.error(";"), false;
          return this.next(), true;
        };
        const G2 = ["parser.next", "parser.node", "parser.showlog"];
        H2.prototype.showlog = function() {
          const t2 = new Error().stack.split("\n");
          let e2;
          for (let s2 = 2; s2 < t2.length; s2++) {
            e2 = t2[s2].trim();
            let i2 = false;
            for (let t3 = 0; t3 < G2.length; t3++) if (e2.substring(3, 3 + G2[t3].length) === G2[t3]) {
              i2 = true;
              break;
            }
            if (!i2) break;
          }
          return console.log("Line " + this.lexer.yylloc.first_line + " : " + this.getTokenName(this.token) + ">" + this.lexer.yytext + "< @-->" + e2), this;
        }, H2.prototype.expect = function(t2) {
          if (Array.isArray(t2)) {
            if (-1 === t2.indexOf(this.token)) return this.error(t2), false;
          } else if (this.token != t2) return this.error(t2), false;
          return true;
        }, H2.prototype.text = function() {
          return this.lexer.yytext;
        }, H2.prototype.next = function() {
          if (";" === this.token && ";" !== this.lexer.yytext || (this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset]), this.lex(), this.debug && this.showlog(), this.extractDoc) for (; this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT; ) this.token === this.tok.T_COMMENT ? this._docs.push(this.read_comment()) : this._docs.push(this.read_doc_comment());
          return this;
        }, H2.prototype.peek = function() {
          const t2 = this.lexer.getState(), e2 = this.lexer.lex();
          return this.lexer.setState(t2), e2;
        }, H2.prototype.lex = function() {
          if (this.extractTokens) do {
            if (this.token = this.lexer.lex() || this.EOF, this.token === this.EOF) return this;
            let t2 = this.lexer.yytext;
            if (t2 = Object.prototype.hasOwnProperty.call(this.lexer.engine.tokens.values, this.token) ? [this.lexer.engine.tokens.values[this.token], t2, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset] : [null, t2, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset], this._tokens.push(t2), this.token === this.tok.T_CLOSE_TAG) return this.token = ";", this;
            if (this.token === this.tok.T_OPEN_TAG_WITH_ECHO) return this.token = this.tok.T_ECHO, this;
          } while (this.token === this.tok.T_WHITESPACE || !this.extractDoc && (this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT) || this.token === this.tok.T_OPEN_TAG);
          else this.token = this.lexer.lex() || this.EOF;
          return this;
        }, H2.prototype.is = function(t2) {
          return Array.isArray(t2) ? -1 !== t2.indexOf(this.token) : this.entries[t2].has(this.token);
        }, [y2, A, N2, g2, L2, b2, I2, C, S2, O2, v2, w2, D, U2, P, F].forEach((function(t2) {
          for (const e2 in t2) {
            if (Object.prototype.hasOwnProperty.call(H2.prototype, e2)) throw new Error("Function " + e2 + " is already defined - collision");
            H2.prototype[e2] = t2[e2];
          }
        }));
        var V2 = H2;
        const Q2 = { T_HALT_COMPILER: 101, T_USE: 102, T_ENCAPSED_AND_WHITESPACE: 103, T_OBJECT_OPERATOR: 104, T_STRING: 105, T_DOLLAR_OPEN_CURLY_BRACES: 106, T_STRING_VARNAME: 107, T_CURLY_OPEN: 108, T_NUM_STRING: 109, T_ISSET: 110, T_EMPTY: 111, T_INCLUDE: 112, T_INCLUDE_ONCE: 113, T_EVAL: 114, T_REQUIRE: 115, T_REQUIRE_ONCE: 116, T_NAMESPACE: 117, T_NS_SEPARATOR: 118, T_AS: 119, T_IF: 120, T_ENDIF: 121, T_WHILE: 122, T_DO: 123, T_FOR: 124, T_SWITCH: 125, T_BREAK: 126, T_CONTINUE: 127, T_RETURN: 128, T_GLOBAL: 129, T_STATIC: 130, T_ECHO: 131, T_INLINE_HTML: 132, T_UNSET: 133, T_FOREACH: 134, T_DECLARE: 135, T_TRY: 136, T_THROW: 137, T_GOTO: 138, T_FINALLY: 139, T_CATCH: 140, T_ENDDECLARE: 141, T_LIST: 142, T_CLONE: 143, T_PLUS_EQUAL: 144, T_MINUS_EQUAL: 145, T_MUL_EQUAL: 146, T_DIV_EQUAL: 147, T_CONCAT_EQUAL: 148, T_MOD_EQUAL: 149, T_AND_EQUAL: 150, T_OR_EQUAL: 151, T_XOR_EQUAL: 152, T_SL_EQUAL: 153, T_SR_EQUAL: 154, T_INC: 155, T_DEC: 156, T_BOOLEAN_OR: 157, T_BOOLEAN_AND: 158, T_LOGICAL_OR: 159, T_LOGICAL_AND: 160, T_LOGICAL_XOR: 161, T_SL: 162, T_SR: 163, T_IS_IDENTICAL: 164, T_IS_NOT_IDENTICAL: 165, T_IS_EQUAL: 166, T_IS_NOT_EQUAL: 167, T_IS_SMALLER_OR_EQUAL: 168, T_IS_GREATER_OR_EQUAL: 169, T_INSTANCEOF: 170, T_INT_CAST: 171, T_DOUBLE_CAST: 172, T_STRING_CAST: 173, T_ARRAY_CAST: 174, T_OBJECT_CAST: 175, T_BOOL_CAST: 176, T_UNSET_CAST: 177, T_EXIT: 178, T_PRINT: 179, T_YIELD: 180, T_YIELD_FROM: 181, T_FUNCTION: 182, T_DOUBLE_ARROW: 183, T_DOUBLE_COLON: 184, T_ARRAY: 185, T_CALLABLE: 186, T_CLASS: 187, T_ABSTRACT: 188, T_TRAIT: 189, T_FINAL: 190, T_EXTENDS: 191, T_INTERFACE: 192, T_IMPLEMENTS: 193, T_VAR: 194, T_PUBLIC: 195, T_PROTECTED: 196, T_PRIVATE: 197, T_CONST: 198, T_NEW: 199, T_INSTEADOF: 200, T_ELSEIF: 201, T_ELSE: 202, T_ENDSWITCH: 203, T_CASE: 204, T_DEFAULT: 205, T_ENDFOR: 206, T_ENDFOREACH: 207, T_ENDWHILE: 208, T_CONSTANT_ENCAPSED_STRING: 209, T_LNUMBER: 210, T_DNUMBER: 211, T_LINE: 212, T_FILE: 213, T_DIR: 214, T_TRAIT_C: 215, T_METHOD_C: 216, T_FUNC_C: 217, T_NS_C: 218, T_START_HEREDOC: 219, T_END_HEREDOC: 220, T_CLASS_C: 221, T_VARIABLE: 222, T_OPEN_TAG: 223, T_OPEN_TAG_WITH_ECHO: 224, T_CLOSE_TAG: 225, T_WHITESPACE: 226, T_COMMENT: 227, T_DOC_COMMENT: 228, T_ELLIPSIS: 229, T_COALESCE: 230, T_POW: 231, T_POW_EQUAL: 232, T_SPACESHIP: 233, T_COALESCE_EQUAL: 234, T_FN: 235, T_NULLSAFE_OBJECT_OPERATOR: 236, T_MATCH: 237, T_ATTRIBUTE: 238, T_ENUM: 239, T_READ_ONLY: 240, T_NAME_RELATIVE: 241, T_NAME_QUALIFIED: 242, T_NAME_FULLY_QUALIFIED: 243, T_PIPE: 244 }, Y2 = { values: Object.entries(Q2).reduce(((t2, e2) => {
          let [s2, i2] = e2;
          return { ...t2, [i2]: s2 };
        }), {}), names: Q2 };
        var W2 = Object.freeze(Y2);
        var $2 = function(t2, e2, s2) {
          this.source = t2, this.start = e2, this.end = s2;
        };
        const z2 = function(t2, e2, s2) {
          this.kind = t2, e2 && (this.leadingComments = e2), s2 && (this.loc = s2);
        };
        z2.prototype.setTrailingComments = function(t2) {
          this.trailingComments = t2;
        }, z2.prototype.destroy = function(t2) {
          if (!t2) throw new Error("Node already initialized, you must swap with another node");
          return this.leadingComments && (t2.leadingComments ? t2.leadingComments = Array.concat(this.leadingComments, t2.leadingComments) : t2.leadingComments = this.leadingComments), this.trailingComments && (t2.trailingComments ? t2.trailingComments = Array.concat(this.trailingComments, t2.trailingComments) : t2.trailingComments = this.trailingComments), t2;
        }, z2.prototype.includeToken = function(t2) {
          return this.loc && (this.loc.end && (this.loc.end.line = t2.lexer.yylloc.last_line, this.loc.end.column = t2.lexer.yylloc.last_column, this.loc.end.offset = t2.lexer.offset), t2.ast.withSource && (this.loc.source = t2.lexer._input.substring(this.loc.start.offset, t2.lexer.offset))), this;
        }, z2.extends = function(t2, e2) {
          return e2.prototype = Object.create(this.prototype), e2.extends = this.extends, e2.prototype.constructor = e2, e2.kind = t2, e2;
        };
        var j2 = z2;
        const K2 = j2, X2 = "expression";
        var q2 = K2.extends(X2, (function(t2, e2, s2) {
          K2.apply(this, [t2 || X2, e2, s2]);
        }));
        const J = q2, Z2 = "array";
        var tt2 = J.extends(Z2, (function(t2, e2, s2, i2) {
          J.apply(this, [Z2, s2, i2]), this.items = e2, this.shortForm = t2;
        }));
        const et2 = q2, st2 = "arrowfunc";
        var it2 = et2.extends(st2, (function(t2, e2, s2, i2, n2, r2, o2, h2) {
          et2.apply(this, [st2, o2, h2]), this.arguments = t2, this.byref = e2, this.body = s2, this.type = i2, this.nullable = n2, this.isStatic = r2 || false;
        }));
        const nt2 = q2, rt2 = "assign";
        var ot2 = nt2.extends(rt2, (function(t2, e2, s2, i2, n2) {
          nt2.apply(this, [rt2, i2, n2]), this.left = t2, this.right = e2, this.operator = s2;
        }));
        const ht2 = q2, at2 = "assignref";
        var ct2 = ht2.extends(at2, (function(t2, e2, s2, i2) {
          ht2.apply(this, [at2, s2, i2]), this.left = t2, this.right = e2;
        }));
        const lt2 = j2, _t = "attribute";
        var ut2 = lt2.extends(_t, (function(t2, e2, s2, i2) {
          lt2.apply(this, [_t, s2, i2]), this.name = t2, this.args = e2;
        }));
        const pt2 = j2, dt2 = "attrgroup";
        var ft2 = pt2.extends(dt2, (function(t2, e2, s2) {
          pt2.apply(this, [dt2, e2, s2]), this.attrs = t2 || [];
        }));
        const kt2 = q2, Tt2 = "operation";
        var xt2 = kt2.extends(Tt2, (function(t2, e2, s2) {
          kt2.apply(this, [t2 || Tt2, e2, s2]);
        }));
        const Et2 = xt2;
        var mt2 = Et2.extends("bin", (function(t2, e2, s2, i2, n2) {
          Et2.apply(this, ["bin", i2, n2]), this.type = t2, this.left = e2, this.right = s2;
        }));
        const yt2 = j2, At2 = "statement";
        var Nt2 = yt2.extends(At2, (function(t2, e2, s2) {
          yt2.apply(this, [t2 || At2, e2, s2]);
        }));
        const gt2 = Nt2, Lt2 = "block";
        var bt2 = gt2.extends(Lt2, (function(t2, e2, s2, i2) {
          gt2.apply(this, [t2 || Lt2, s2, i2]), this.children = e2.filter(Boolean);
        }));
        const It2 = q2, Ct2 = "literal";
        var St2 = It2.extends(Ct2, (function(t2, e2, s2, i2, n2) {
          It2.apply(this, [t2 || Ct2, i2, n2]), this.value = e2, s2 && (this.raw = s2);
        }));
        const Ot2 = St2, Rt2 = "boolean";
        var vt2 = Ot2.extends(Rt2, (function(t2, e2, s2, i2) {
          Ot2.apply(this, [Rt2, t2, e2, s2, i2]);
        }));
        const wt2 = Nt2, Dt2 = "break";
        var Ut2 = wt2.extends(Dt2, (function(t2, e2, s2) {
          wt2.apply(this, [Dt2, e2, s2]), this.level = t2;
        }));
        const Pt2 = q2, Ft2 = "byref";
        var Mt2 = Pt2.extends(Ft2, (function(t2, e2, s2) {
          Pt2.apply(this, [Ft2, e2, s2]), this.what = t2;
        }));
        const Bt2 = q2, Ht2 = "call";
        var Gt2 = Bt2.extends(Ht2, (function(t2, e2, s2, i2) {
          Bt2.apply(this, [Ht2, s2, i2]), this.what = t2, this.arguments = e2;
        }));
        const Vt2 = Nt2, Qt2 = "case";
        var Yt2 = Vt2.extends(Qt2, (function(t2, e2, s2, i2) {
          Vt2.apply(this, [Qt2, s2, i2]), this.test = t2, this.body = e2;
        }));
        const Wt2 = xt2, $t2 = "cast";
        var zt2 = Wt2.extends($t2, (function(t2, e2, s2, i2, n2) {
          Wt2.apply(this, [$t2, i2, n2]), this.type = t2, this.raw = e2, this.expr = s2;
        }));
        const jt2 = Nt2, Kt2 = "catch";
        var Xt2 = jt2.extends(Kt2, (function(t2, e2, s2, i2, n2) {
          jt2.apply(this, [Kt2, i2, n2]), this.body = t2, this.what = e2, this.variable = s2;
        }));
        const qt2 = Nt2, Jt2 = "declaration", Zt2 = qt2.extends(Jt2, (function(t2, e2, s2, i2) {
          qt2.apply(this, [t2 || Jt2, s2, i2]), this.name = e2;
        }));
        Zt2.prototype.parseFlags = function(t2) {
          this.isAbstract = 1 === t2[2], this.isFinal = 2 === t2[2], this.isReadonly = 1 === t2[3], "class" !== this.kind && (-1 === t2[0] ? this.visibility = "" : null === t2[0] ? this.visibility = null : 0 === t2[0] ? this.visibility = "public" : 1 === t2[0] ? this.visibility = "protected" : 2 === t2[0] && (this.visibility = "private"), this.isStatic = 1 === t2[1]);
        };
        var te2 = Zt2;
        const ee2 = te2, se2 = "class";
        var ie2 = ee2.extends(se2, (function(t2, e2, s2, i2, n2, r2, o2) {
          ee2.apply(this, [se2, t2, r2, o2]), this.isAnonymous = !t2, this.extends = e2, this.implements = s2, this.body = i2, this.attrGroups = [], this.parseFlags(n2);
        }));
        const ne2 = Nt2, re2 = "constantstatement";
        var oe2 = ne2.extends(re2, (function(t2, e2, s2, i2) {
          ne2.apply(this, [t2 || re2, s2, i2]), this.constants = e2;
        }));
        const he2 = oe2, ae2 = "classconstant", ce2 = he2.extends(ae2, (function(t2, e2, s2, i2, n2, r2, o2, h2) {
          he2.apply(this, [t2 || ae2, e2, o2, h2]), this.parseFlags(s2), this.nullable = i2, this.type = n2, this.attrGroups = r2;
        }));
        ce2.prototype.parseFlags = function(t2) {
          -1 === t2[0] ? this.visibility = "" : null === t2[0] ? this.visibility = null : 0 === t2[0] ? this.visibility = "public" : 1 === t2[0] ? this.visibility = "protected" : 2 === t2[0] && (this.visibility = "private"), this.final = 2 === t2[2];
        };
        var le2 = ce2;
        const _e2 = q2, ue2 = "clone";
        var pe2 = _e2.extends(ue2, (function(t2, e2, s2) {
          _e2.apply(this, [ue2, e2, s2]), this.what = t2;
        }));
        const de2 = q2, fe2 = "closure";
        var ke2 = de2.extends(fe2, (function(t2, e2, s2, i2, n2, r2, o2, h2) {
          de2.apply(this, [fe2, o2, h2]), this.uses = s2, this.arguments = t2, this.byref = e2, this.type = i2, this.nullable = n2, this.isStatic = r2 || false, this.body = null, this.attrGroups = [];
        }));
        const Te2 = j2;
        var xe2 = Te2.extends("comment", (function(t2, e2, s2, i2) {
          Te2.apply(this, [t2, s2, i2]), this.value = e2;
        }));
        const Ee2 = xe2, me2 = "commentblock";
        var ye2 = Ee2.extends(me2, (function(t2, e2, s2) {
          Ee2.apply(this, [me2, t2, e2, s2]);
        }));
        const Ae2 = xe2, Ne2 = "commentline";
        var ge2 = Ae2.extends(Ne2, (function(t2, e2, s2) {
          Ae2.apply(this, [Ne2, t2, e2, s2]);
        }));
        const Le2 = j2, be2 = "constant";
        var Ie2 = Le2.extends(be2, (function(t2, e2, s2, i2) {
          Le2.apply(this, [be2, s2, i2]), this.name = t2, this.value = e2;
        }));
        const Ce2 = Nt2, Se2 = "continue";
        var Oe2 = Ce2.extends(Se2, (function(t2, e2, s2) {
          Ce2.apply(this, [Se2, e2, s2]), this.level = t2;
        }));
        const Re2 = bt2, ve2 = "declare", we2 = Re2.extends(ve2, (function(t2, e2, s2, i2, n2) {
          Re2.apply(this, [ve2, e2, i2, n2]), this.directives = t2, this.mode = s2;
        }));
        we2.MODE_SHORT = "short", we2.MODE_BLOCK = "block", we2.MODE_NONE = "none";
        var De2 = we2;
        const Ue2 = j2, Pe2 = "declaredirective";
        var Fe2 = Ue2.extends(Pe2, (function(t2, e2, s2, i2) {
          Ue2.apply(this, [Pe2, s2, i2]), this.key = t2, this.value = e2;
        }));
        const Me2 = Nt2;
        var Be2 = Me2.extends("do", (function(t2, e2, s2, i2) {
          Me2.apply(this, ["do", s2, i2]), this.test = t2, this.body = e2;
        }));
        const He2 = Nt2, Ge2 = "echo";
        var Ve2 = He2.extends(Ge2, (function(t2, e2, s2, i2) {
          He2.apply(this, [Ge2, s2, i2]), this.shortForm = e2, this.expressions = t2;
        }));
        const Qe2 = q2, Ye2 = "empty";
        var We2 = Qe2.extends(Ye2, (function(t2, e2, s2) {
          Qe2.apply(this, [Ye2, e2, s2]), this.expression = t2;
        }));
        const $e = St2, ze2 = "encapsed", je2 = $e.extends(ze2, (function(t2, e2, s2, i2, n2) {
          $e.apply(this, [ze2, t2, e2, i2, n2]), this.type = s2;
        }));
        je2.TYPE_STRING = "string", je2.TYPE_SHELL = "shell", je2.TYPE_HEREDOC = "heredoc", je2.TYPE_OFFSET = "offset";
        var Ke2 = je2;
        const Xe2 = q2, qe2 = "encapsedpart";
        var Je2 = Xe2.extends(qe2, (function(t2, e2, s2, i2, n2) {
          Xe2.apply(this, [qe2, i2, n2]), this.expression = t2, this.syntax = e2, this.curly = s2;
        }));
        const Ze2 = q2, ts = "entry";
        var es = Ze2.extends(ts, (function(t2, e2, s2, i2, n2, r2) {
          Ze2.apply(this, [ts, n2, r2]), this.key = t2, this.value = e2, this.byRef = s2, this.unpack = i2;
        }));
        const ss = te2, is = "enum";
        var ns = ss.extends(is, (function(t2, e2, s2, i2, n2, r2) {
          ss.apply(this, [is, t2, n2, r2]), this.valueType = e2, this.implements = s2, this.body = i2, this.attrGroups = [];
        }));
        const rs = j2, os = "enumcase";
        var hs = rs.extends(os, (function(t2, e2, s2, i2) {
          rs.apply(this, [os, s2, i2]), this.name = t2, this.value = e2;
        }));
        const as = j2, cs = "error";
        var ls = as.extends(cs, (function(t2, e2, s2, i2, n2, r2) {
          as.apply(this, [cs, n2, r2]), this.message = t2, this.token = e2, this.line = s2, this.expected = i2;
        }));
        const _s = q2, us = "eval";
        var ps = _s.extends(us, (function(t2, e2, s2) {
          _s.apply(this, [us, e2, s2]), this.source = t2;
        }));
        const ds = q2, fs = "exit";
        var ks = ds.extends(fs, (function(t2, e2, s2, i2) {
          ds.apply(this, [fs, s2, i2]), this.expression = t2, this.useDie = e2;
        }));
        const Ts = Nt2, xs = "expressionstatement";
        var Es = Ts.extends(xs, (function(t2, e2, s2) {
          Ts.apply(this, [xs, e2, s2]), this.expression = t2;
        }));
        const ms = Nt2;
        var ys = ms.extends("for", (function(t2, e2, s2, i2, n2, r2, o2) {
          ms.apply(this, ["for", r2, o2]), this.init = t2, this.test = e2, this.increment = s2, this.shortForm = n2, this.body = i2;
        }));
        const As = Nt2, Ns = "foreach";
        var gs = As.extends(Ns, (function(t2, e2, s2, i2, n2, r2, o2) {
          As.apply(this, [Ns, r2, o2]), this.source = t2, this.key = e2, this.value = s2, this.shortForm = n2, this.body = i2;
        }));
        const Ls = te2, bs = "function";
        var Is = Ls.extends(bs, (function(t2, e2, s2, i2, n2, r2, o2) {
          Ls.apply(this, [bs, t2, r2, o2]), this.arguments = e2, this.byref = s2, this.type = i2, this.nullable = n2, this.body = null, this.attrGroups = [];
        }));
        const Cs = Nt2, Ss = "global";
        var Os = Cs.extends(Ss, (function(t2, e2, s2) {
          Cs.apply(this, [Ss, e2, s2]), this.items = t2;
        }));
        const Rs = Nt2, vs = "goto";
        var ws = Rs.extends(vs, (function(t2, e2, s2) {
          Rs.apply(this, [vs, e2, s2]), this.label = t2;
        }));
        const Ds = Nt2, Us = "halt";
        var Ps = Ds.extends(Us, (function(t2, e2, s2) {
          Ds.apply(this, [Us, e2, s2]), this.after = t2;
        }));
        const Fs = j2, Ms = "identifier", Bs = Fs.extends(Ms, (function(t2, e2, s2) {
          Fs.apply(this, [Ms, e2, s2]), this.name = t2;
        }));
        var Hs = Bs;
        const Gs = Nt2;
        var Vs = Gs.extends("if", (function(t2, e2, s2, i2, n2, r2) {
          Gs.apply(this, ["if", n2, r2]), this.test = t2, this.body = e2, this.alternate = s2, this.shortForm = i2;
        }));
        const Qs = q2, Ys = "include";
        var Ws = Qs.extends(Ys, (function(t2, e2, s2, i2, n2) {
          Qs.apply(this, [Ys, i2, n2]), this.once = t2, this.require = e2, this.target = s2;
        }));
        const $s = St2, zs = "inline";
        var js = $s.extends(zs, (function(t2, e2, s2, i2) {
          $s.apply(this, [zs, t2, e2, s2, i2]);
        }));
        const Ks = te2, Xs = "interface";
        var qs = Ks.extends(Xs, (function(t2, e2, s2, i2, n2, r2) {
          Ks.apply(this, [Xs, t2, n2, r2]), this.extends = e2, this.body = s2, this.attrGroups = i2;
        }));
        const Js = te2, Zs = "intersectiontype";
        var ti2 = Js.extends(Zs, (function(t2, e2, s2) {
          Js.apply(this, [Zs, null, e2, s2]), this.types = t2;
        }));
        const ei2 = q2, si2 = "isset";
        var ii2 = ei2.extends(si2, (function(t2, e2, s2) {
          ei2.apply(this, [si2, e2, s2]), this.variables = t2;
        }));
        const ni2 = Nt2, ri2 = "label";
        var oi2 = ni2.extends(ri2, (function(t2, e2, s2) {
          ni2.apply(this, [ri2, e2, s2]), this.name = t2;
        }));
        const hi2 = q2, ai2 = "list";
        var ci2 = hi2.extends(ai2, (function(t2, e2, s2, i2) {
          hi2.apply(this, [ai2, s2, i2]), this.items = t2, this.shortForm = e2;
        }));
        const li2 = q2, _i2 = "lookup";
        var ui2 = li2.extends(_i2, (function(t2, e2, s2, i2, n2) {
          li2.apply(this, [t2 || _i2, i2, n2]), this.what = e2, this.offset = s2;
        }));
        const pi2 = St2, di2 = "magic";
        var fi2 = pi2.extends(di2, (function(t2, e2, s2, i2) {
          pi2.apply(this, [di2, t2, e2, s2, i2]);
        }));
        const ki2 = q2, Ti2 = "match";
        var xi2 = ki2.extends(Ti2, (function(t2, e2, s2, i2) {
          ki2.apply(this, [Ti2, s2, i2]), this.cond = t2, this.arms = e2;
        }));
        const Ei2 = q2, mi2 = "matcharm";
        var yi2 = Ei2.extends(mi2, (function(t2, e2, s2, i2) {
          Ei2.apply(this, [mi2, s2, i2]), this.conds = t2, this.body = e2;
        }));
        const Ai2 = Is, Ni2 = "method";
        var gi = Ai2.extends(Ni2, (function() {
          Ai2.apply(this, arguments), this.kind = Ni2;
        }));
        const Li2 = j2, bi2 = "reference", Ii2 = Li2.extends(bi2, (function(t2, e2, s2) {
          Li2.apply(this, [t2 || bi2, e2, s2]);
        }));
        var Ci2 = Ii2;
        const Si2 = Ci2, Oi2 = "name", Ri2 = Si2.extends(Oi2, (function(t2, e2, s2, i2) {
          Si2.apply(this, [Oi2, s2, i2]), this.name = t2.replace(/\\$/, ""), this.resolution = e2;
        }));
        Ri2.UNQUALIFIED_NAME = "uqn", Ri2.QUALIFIED_NAME = "qn", Ri2.FULL_QUALIFIED_NAME = "fqn", Ri2.RELATIVE_NAME = "rn";
        var vi2 = Ri2;
        const wi2 = bt2, Di2 = "namespace";
        var Ui2 = wi2.extends(Di2, (function(t2, e2, s2, i2, n2) {
          wi2.apply(this, [Di2, e2, i2, n2]), this.name = t2, this.withBrackets = s2 || false;
        }));
        const Pi2 = q2, Fi2 = "namedargument";
        var Mi2 = Pi2.extends(Fi2, (function(t2, e2, s2, i2) {
          Pi2.apply(this, [Fi2, s2, i2]), this.name = t2, this.value = e2;
        }));
        const Bi2 = q2;
        var Hi = Bi2.extends("new", (function(t2, e2, s2, i2) {
          Bi2.apply(this, ["new", s2, i2]), this.what = t2, this.arguments = e2;
        }));
        const Gi = j2, Vi2 = "noop";
        var Qi = Gi.extends(Vi2, (function(t2, e2) {
          Gi.apply(this, [Vi2, t2, e2]);
        }));
        const Yi2 = St2, Wi2 = "nowdoc";
        var $i2 = Yi2.extends(Wi2, (function(t2, e2, s2, i2, n2) {
          Yi2.apply(this, [Wi2, t2, e2, i2, n2]), this.label = s2;
        }));
        const zi = j2, ji2 = "nullkeyword";
        var Ki = zi.extends(ji2, (function(t2, e2, s2) {
          zi.apply(this, [ji2, e2, s2]), this.raw = t2;
        }));
        const Xi = ui2, qi = "nullsafepropertylookup";
        var Ji = Xi.extends(qi, (function(t2, e2, s2, i2) {
          Xi.apply(this, [qi, t2, e2, s2, i2]);
        }));
        const Zi = St2, tn2 = "number";
        var en2 = Zi.extends(tn2, (function(t2, e2, s2, i2) {
          Zi.apply(this, [tn2, t2, e2, s2, i2]);
        }));
        const sn2 = ui2, nn2 = "offsetlookup";
        var rn2 = sn2.extends(nn2, (function(t2, e2, s2, i2) {
          sn2.apply(this, [nn2, t2, e2, s2, i2]);
        }));
        const on2 = te2, hn2 = "parameter";
        var an2 = on2.extends(hn2, (function(t2, e2, s2, i2, n2, r2, o2, h2, a2, c2) {
          on2.apply(this, [hn2, t2, a2, c2]), this.value = s2, this.type = e2, this.byref = i2, this.variadic = n2, this.readonly = r2, this.nullable = o2, this.flags = h2 || 0, this.attrGroups = [];
        }));
        const cn2 = Ci2, ln2 = "parentreference", _n2 = cn2.extends(ln2, (function(t2, e2, s2) {
          cn2.apply(this, [ln2, e2, s2]), this.raw = t2;
        }));
        var un2 = _n2;
        const pn2 = xt2, dn2 = "post";
        var fn2 = pn2.extends(dn2, (function(t2, e2, s2, i2) {
          pn2.apply(this, [dn2, s2, i2]), this.type = t2, this.what = e2;
        }));
        const kn2 = xt2;
        var Tn2 = kn2.extends("pre", (function(t2, e2, s2, i2) {
          kn2.apply(this, ["pre", s2, i2]), this.type = t2, this.what = e2;
        }));
        const xn2 = q2, En2 = "print";
        var mn2 = xn2.extends(En2, (function(t2, e2, s2) {
          xn2.apply(this, [En2, e2, s2]), this.expression = t2;
        }));
        const yn2 = bt2, An2 = "program";
        var Nn2 = yn2.extends(An2, (function(t2, e2, s2, i2, n2, r2) {
          yn2.apply(this, [An2, t2, n2, r2]), this.errors = e2, s2 && (this.comments = s2), i2 && (this.tokens = i2);
        }));
        const gn2 = Nt2, Ln2 = "property";
        var bn2 = gn2.extends(Ln2, (function(t2, e2, s2, i2, n2, r2, o2, h2) {
          gn2.apply(this, [Ln2, o2, h2]), this.name = t2, this.value = e2, this.readonly = s2, this.nullable = i2, this.type = n2, this.attrGroups = r2;
        }));
        const In2 = ui2, Cn2 = "propertylookup";
        var Sn2 = In2.extends(Cn2, (function(t2, e2, s2, i2) {
          In2.apply(this, [Cn2, t2, e2, s2, i2]);
        }));
        const On2 = Nt2, Rn2 = "propertystatement", vn2 = On2.extends(Rn2, (function(t2, e2, s2, i2, n2) {
          On2.apply(this, [Rn2, i2, n2]), this.properties = e2, this.parseFlags(s2);
        }));
        vn2.prototype.parseFlags = function(t2) {
          -1 === t2[0] ? this.visibility = "" : null === t2[0] ? this.visibility = null : 0 === t2[0] ? this.visibility = "public" : 1 === t2[0] ? this.visibility = "protected" : 2 === t2[0] && (this.visibility = "private"), this.isStatic = 1 === t2[1];
        };
        var wn2 = vn2;
        const Dn2 = q2, Un2 = "retif";
        var Pn2 = Dn2.extends(Un2, (function(t2, e2, s2, i2, n2) {
          Dn2.apply(this, [Un2, i2, n2]), this.test = t2, this.trueExpr = e2, this.falseExpr = s2;
        }));
        const Fn2 = Nt2, Mn2 = "return";
        var Bn2 = Fn2.extends(Mn2, (function(t2, e2, s2) {
          Fn2.apply(this, [Mn2, e2, s2]), this.expr = t2;
        }));
        const Hn2 = Ci2, Gn2 = "selfreference", Vn2 = Hn2.extends(Gn2, (function(t2, e2, s2) {
          Hn2.apply(this, [Gn2, e2, s2]), this.raw = t2;
        }));
        var Qn2 = Vn2;
        const Yn2 = q2, Wn2 = "silent";
        var $n2 = Yn2.extends(Wn2, (function(t2, e2, s2) {
          Yn2.apply(this, [Wn2, e2, s2]), this.expr = t2;
        }));
        const zn2 = Nt2, jn2 = "static";
        var Kn2 = zn2.extends(jn2, (function(t2, e2, s2) {
          zn2.apply(this, [jn2, e2, s2]), this.variables = t2;
        }));
        const Xn2 = j2, qn2 = "staticvariable";
        var Jn2 = Xn2.extends(qn2, (function(t2, e2, s2, i2) {
          Xn2.apply(this, [qn2, s2, i2]), this.variable = t2, this.defaultValue = e2;
        }));
        const Zn2 = ui2, tr2 = "staticlookup";
        var er2 = Zn2.extends(tr2, (function(t2, e2, s2, i2) {
          Zn2.apply(this, [tr2, t2, e2, s2, i2]);
        }));
        const sr2 = Ci2, ir2 = "staticreference", nr2 = sr2.extends(ir2, (function(t2, e2, s2) {
          sr2.apply(this, [ir2, e2, s2]), this.raw = t2;
        }));
        var rr2 = nr2;
        const or2 = St2, hr2 = "string";
        var ar2 = or2.extends(hr2, (function(t2, e2, s2, i2, n2, r2) {
          or2.apply(this, [hr2, e2, i2, n2, r2]), this.unicode = s2, this.isDoubleQuote = t2;
        }));
        const cr2 = Nt2, lr = "switch";
        var _r2 = cr2.extends(lr, (function(t2, e2, s2, i2, n2) {
          cr2.apply(this, [lr, i2, n2]), this.test = t2, this.body = e2, this.shortForm = s2;
        }));
        const ur2 = Nt2, pr2 = "throw";
        var dr2 = ur2.extends(pr2, (function(t2, e2, s2) {
          ur2.apply(this, [pr2, e2, s2]), this.what = t2;
        }));
        const fr2 = te2, kr2 = "trait";
        var Tr2 = fr2.extends(kr2, (function(t2, e2, s2, i2) {
          fr2.apply(this, [kr2, t2, s2, i2]), this.body = e2;
        }));
        const xr2 = j2, Er2 = "traitalias";
        var mr = xr2.extends(Er2, (function(t2, e2, s2, i2, n2, r2) {
          xr2.apply(this, [Er2, n2, r2]), this.trait = t2, this.method = e2, this.as = s2, this.visibility = "", i2 && (0 === i2[0] ? this.visibility = "public" : 1 === i2[0] ? this.visibility = "protected" : 2 === i2[0] && (this.visibility = "private"));
        }));
        const yr2 = j2, Ar2 = "traitprecedence";
        var Nr2 = yr2.extends(Ar2, (function(t2, e2, s2, i2, n2) {
          yr2.apply(this, [Ar2, i2, n2]), this.trait = t2, this.method = e2, this.instead = s2;
        }));
        const gr2 = j2, Lr2 = "traituse";
        var br2 = gr2.extends(Lr2, (function(t2, e2, s2, i2) {
          gr2.apply(this, [Lr2, s2, i2]), this.traits = t2, this.adaptations = e2;
        }));
        const Ir2 = Nt2;
        var Cr2 = Ir2.extends("try", (function(t2, e2, s2, i2, n2) {
          Ir2.apply(this, ["try", i2, n2]), this.body = t2, this.catches = e2, this.always = s2;
        }));
        const Sr2 = Ci2, Or2 = "typereference", Rr2 = Sr2.extends(Or2, (function(t2, e2, s2, i2) {
          Sr2.apply(this, [Or2, s2, i2]), this.name = t2, this.raw = e2;
        }));
        Rr2.types = ["int", "float", "string", "bool", "object", "array", "callable", "iterable", "void", "static"];
        var vr2 = Rr2;
        const wr2 = xt2, Dr2 = "unary";
        var Ur2 = wr2.extends(Dr2, (function(t2, e2, s2, i2) {
          wr2.apply(this, [Dr2, s2, i2]), this.type = t2, this.what = e2;
        }));
        const Pr2 = te2, Fr2 = "uniontype";
        var Mr2 = Pr2.extends(Fr2, (function(t2, e2, s2) {
          Pr2.apply(this, [Fr2, null, e2, s2]), this.types = t2;
        }));
        const Br2 = Nt2, Hr2 = "unset";
        var Gr2 = Br2.extends(Hr2, (function(t2, e2, s2) {
          Br2.apply(this, [Hr2, e2, s2]), this.variables = t2;
        }));
        const Vr2 = Nt2, Qr2 = "usegroup";
        var Yr2 = Vr2.extends(Qr2, (function(t2, e2, s2, i2, n2) {
          Vr2.apply(this, [Qr2, i2, n2]), this.name = t2, this.type = e2, this.items = s2;
        }));
        const Wr2 = Nt2, $r2 = "useitem", zr2 = Wr2.extends($r2, (function(t2, e2, s2, i2, n2) {
          Wr2.apply(this, [$r2, i2, n2]), this.name = t2, this.alias = e2, this.type = s2;
        }));
        zr2.TYPE_CONST = "const", zr2.TYPE_FUNCTION = "function";
        var jr2 = zr2;
        const Kr2 = q2, Xr2 = "variable";
        var qr2 = Kr2.extends(Xr2, (function(t2, e2, s2, i2) {
          Kr2.apply(this, [Xr2, s2, i2]), this.name = t2, this.curly = e2 || false;
        }));
        const Jr2 = q2, Zr2 = "variadic";
        var to2 = Jr2.extends(Zr2, (function(t2, e2, s2) {
          Jr2.apply(this, [Zr2, e2, s2]), this.what = t2;
        }));
        const eo2 = j2, so2 = "variadicplaceholder";
        var io2 = eo2.extends(so2, (function(t2, e2) {
          eo2.apply(this, [so2, t2, e2]);
        }));
        const no2 = Nt2, ro2 = "while";
        var oo2 = no2.extends(ro2, (function(t2, e2, s2, i2, n2) {
          no2.apply(this, [ro2, i2, n2]), this.test = t2, this.body = e2, this.shortForm = s2;
        }));
        const ho2 = q2, ao2 = "yield";
        var co2 = ho2.extends(ao2, (function(t2, e2, s2, i2) {
          ho2.apply(this, [ao2, s2, i2]), this.value = t2, this.key = e2;
        }));
        const lo2 = q2, _o2 = "yieldfrom";
        var uo2 = lo2.extends(_o2, (function(t2, e2, s2) {
          lo2.apply(this, [_o2, e2, s2]), this.value = t2;
        }));
        const po2 = $2, fo2 = m, ko2 = function(t2, e2) {
          this.withPositions = t2, this.withSource = e2;
        };
        ko2.precedence = {}, [["or"], ["xor"], ["and"], ["="], ["?"], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "!=", "===", "!==", "<=>"], ["<", "<=", ">", ">="], ["<<", ">>"], ["+", "-", "."], ["*", "/", "%"], ["!"], ["instanceof"], ["cast", "silent"], ["**"]].forEach((function(t2, e2) {
          t2.forEach((function(t3) {
            ko2.precedence[t3] = e2 + 1;
          }));
        })), ko2.prototype.isRightAssociative = function(t2) {
          return "**" === t2 || "??" === t2;
        }, ko2.prototype.swapLocations = function(t2, e2, s2, i2) {
          this.withPositions && (t2.loc.start = e2.loc.start, t2.loc.end = s2.loc.end, this.withSource && (t2.loc.source = i2.lexer._input.substring(t2.loc.start.offset, t2.loc.end.offset)));
        }, ko2.prototype.resolveLocations = function(t2, e2, s2, i2) {
          this.withPositions && (t2.loc.start.offset > e2.loc.start.offset && (t2.loc.start = e2.loc.start), t2.loc.end.offset < s2.loc.end.offset && (t2.loc.end = s2.loc.end), this.withSource && (t2.loc.source = i2.lexer._input.substring(t2.loc.start.offset, t2.loc.end.offset)));
        }, ko2.prototype.resolvePrecedence = function(t2, e2) {
          let s2, i2, n2;
          return "call" === t2.kind ? this.resolveLocations(t2, t2.what, t2, e2) : "propertylookup" === t2.kind || "staticlookup" === t2.kind || "offsetlookup" === t2.kind && t2.offset ? this.resolveLocations(t2, t2.what, t2.offset, e2) : "bin" === t2.kind ? t2.right && !t2.right.parenthesizedExpression && ("bin" === t2.right.kind ? (i2 = ko2.precedence[t2.type], n2 = ko2.precedence[t2.right.type], i2 && n2 && n2 <= i2 && (t2.type !== t2.right.type || !this.isRightAssociative(t2.type)) && (s2 = t2.right, t2.right = t2.right.left, this.swapLocations(t2, t2.left, t2.right, e2), s2.left = this.resolvePrecedence(t2, e2), this.swapLocations(s2, s2.left, s2.right, e2), t2 = s2)) : "retif" === t2.right.kind && (i2 = ko2.precedence[t2.type], n2 = ko2.precedence["?"], i2 && n2 && n2 <= i2 && (s2 = t2.right, t2.right = t2.right.test, this.swapLocations(t2, t2.left, t2.right, e2), s2.test = this.resolvePrecedence(t2, e2), this.swapLocations(s2, s2.test, s2.falseExpr, e2), t2 = s2))) : "silent" !== t2.kind && "cast" !== t2.kind || !t2.expr || t2.expr.parenthesizedExpression ? "unary" === t2.kind ? t2.what && !t2.what.parenthesizedExpression && ("bin" === t2.what.kind ? (s2 = t2.what, t2.what = t2.what.left, this.swapLocations(t2, t2, t2.what, e2), s2.left = this.resolvePrecedence(t2, e2), this.swapLocations(s2, s2.left, s2.right, e2), t2 = s2) : "retif" === t2.what.kind && (s2 = t2.what, t2.what = t2.what.test, this.swapLocations(t2, t2, t2.what, e2), s2.test = this.resolvePrecedence(t2, e2), this.swapLocations(s2, s2.test, s2.falseExpr, e2), t2 = s2)) : "retif" === t2.kind ? t2.falseExpr && "retif" === t2.falseExpr.kind && !t2.falseExpr.parenthesizedExpression && (s2 = t2.falseExpr, t2.falseExpr = s2.test, this.swapLocations(t2, t2.test, t2.falseExpr, e2), s2.test = this.resolvePrecedence(t2, e2), this.swapLocations(s2, s2.test, s2.falseExpr, e2), t2 = s2) : "assign" === t2.kind ? t2.right && "bin" === t2.right.kind && !t2.right.parenthesizedExpression && (i2 = ko2.precedence["="], n2 = ko2.precedence[t2.right.type], i2 && n2 && n2 < i2 && (s2 = t2.right, t2.right = t2.right.left, s2.left = t2, this.swapLocations(s2, s2.left, t2.right, e2), t2 = s2)) : "expressionstatement" === t2.kind && this.swapLocations(t2, t2.expression, t2, e2) : "bin" === t2.expr.kind ? (s2 = t2.expr, t2.expr = t2.expr.left, this.swapLocations(t2, t2, t2.expr, e2), s2.left = this.resolvePrecedence(t2, e2), this.swapLocations(s2, s2.left, s2.right, e2), t2 = s2) : "retif" === t2.expr.kind && (s2 = t2.expr, t2.expr = t2.expr.test, this.swapLocations(t2, t2, t2.expr, e2), s2.test = this.resolvePrecedence(t2, e2), this.swapLocations(s2, s2.test, s2.falseExpr, e2), t2 = s2), t2;
        }, ko2.prototype.prepare = function(t2, e2, s2) {
          let i2 = null;
          (this.withPositions || this.withSource) && (i2 = s2.position());
          const n2 = this, r2 = function() {
            const o2 = Array.prototype.slice.call(arguments);
            if (o2.push(e2), n2.withPositions || n2.withSource) {
              let t3 = null;
              n2.withSource && (t3 = s2.lexer._input.substring(i2.offset, s2.prev[2]));
              const e3 = new po2(t3, i2, new fo2(s2.prev[0], s2.prev[1], s2.prev[2]));
              o2.push(e3);
            }
            t2 || (t2 = o2.shift());
            const h2 = n2[t2];
            if ("function" != typeof h2) throw new Error('Undefined node "' + t2 + '"');
            const a2 = Object.create(h2.prototype);
            return h2.apply(a2, o2), r2.instance = a2, r2.trailingComments && (a2.trailingComments = r2.trailingComments), "function" == typeof r2.postBuild && r2.postBuild(a2), s2.debug && delete n2.stack[r2.stackUid], n2.resolvePrecedence(a2, s2);
          };
          return s2.debug && (this.stack || (this.stack = {}, this.stackUid = 1), this.stack[++this.stackUid] = { position: i2, stack: new Error().stack.split("\n").slice(3, 5) }, r2.stackUid = this.stackUid), r2.setTrailingComments = function(t3) {
            r2.instance ? r2.instance.setTrailingComments(t3) : r2.trailingComments = t3;
          }, r2.destroy = function(t3) {
            e2 && (t3 ? t3.leadingComments ? t3.leadingComments = e2.concat(t3.leadingComments) : t3.leadingComments = e2 : s2._docIndex = s2._docs.length - e2.length), s2.debug && delete n2.stack[r2.stackUid];
          }, r2;
        }, ko2.prototype.checkNodes = function() {
          const t2 = [];
          for (const e2 in this.stack) Object.prototype.hasOwnProperty.call(this.stack, e2) && (this.stack[e2].key = e2, t2.push(this.stack[e2]));
          return this.stack = {}, t2;
        }, [tt2, it2, ot2, ct2, ut2, ft2, mt2, bt2, vt2, Ut2, Mt2, Gt2, Yt2, zt2, Xt2, ie2, le2, pe2, ke2, xe2, ye2, ge2, Ie2, oe2, Oe2, te2, De2, Fe2, Be2, Ve2, We2, Ke2, Je2, es, ns, hs, ls, ps, ks, q2, Es, ys, gs, Is, Os, ws, Ps, Hs, Vs, Ws, js, qs, ti2, ii2, oi2, ci2, St2, ui2, fi2, xi2, yi2, gi, vi2, Ui2, Mi2, Hi, j2, Qi, $i2, Ki, Ji, en2, rn2, xt2, an2, un2, fn2, Tn2, mn2, Nn2, bn2, Sn2, wn2, Ci2, Pn2, Bn2, Qn2, $n2, Nt2, Kn2, Jn2, er2, rr2, ar2, _r2, dr2, Tr2, mr, Nr2, br2, Cr2, vr2, Ur2, Mr2, Gr2, Yr2, jr2, qr2, to2, io2, oo2, co2, uo2].forEach((function(t2) {
          ko2.prototype[t2.kind] = t2;
        }));
        const To2 = E, xo2 = V2, Eo2 = W2, mo2 = ko2;
        function yo2(t2, e2) {
          const s2 = Object.keys(t2);
          let i2 = s2.length;
          for (; i2--; ) {
            const n2 = s2[i2], r2 = t2[n2];
            null === r2 ? delete e2[n2] : "function" == typeof r2 ? e2[n2] = r2.bind(e2) : Array.isArray(r2) ? e2[n2] = Array.isArray(e2[n2]) ? e2[n2].concat(r2) : r2 : e2[n2] = "object" == typeof r2 && "object" == typeof e2[n2] ? yo2(r2, e2[n2]) : r2;
          }
          return e2;
        }
        const Ao2 = function(t2) {
          if ("function" == typeof this) return new this(t2);
          if (this.tokens = Eo2, this.lexer = new To2(this), this.ast = new mo2(), this.parser = new xo2(this.lexer, this.ast), t2 && "object" == typeof t2) {
            if (t2.parser && (t2.lexer || (t2.lexer = {}), t2.parser.version)) {
              if ("string" == typeof t2.parser.version) {
                let e2 = t2.parser.version.split(".");
                if (e2 = 100 * parseInt(e2[0]) + parseInt(e2[1]), isNaN(e2)) throw new Error("Bad version number : " + t2.parser.version);
                t2.parser.version = e2;
              } else if ("number" != typeof t2.parser.version) throw new Error("Expecting a number for version");
              if (t2.parser.version < 500 || t2.parser.version > 900) throw new Error("Can only handle versions between 5.x to 8.x");
            }
            yo2(t2, this), this.lexer.version = this.parser.version;
          }
        }, No2 = function(t2) {
          return "function" == typeof t2.write ? t2.toString() : t2;
        };
        Ao2.create = function(t2) {
          return new Ao2(t2);
        }, Ao2.parseEval = function(t2, e2) {
          return new Ao2(e2).parseEval(t2);
        }, Ao2.prototype.parseEval = function(t2) {
          return this.lexer.mode_eval = true, this.lexer.all_tokens = false, t2 = No2(t2), this.parser.parse(t2, "eval");
        }, Ao2.parseCode = function(t2, e2, s2) {
          "object" != typeof e2 || s2 || (s2 = e2, e2 = "unknown");
          return new Ao2(s2).parseCode(t2, e2);
        }, Ao2.prototype.parseCode = function(t2, e2) {
          return this.lexer.mode_eval = false, this.lexer.all_tokens = false, t2 = No2(t2), this.parser.parse(t2, e2);
        }, Ao2.tokenGetAll = function(t2, e2) {
          return new Ao2(e2).tokenGetAll(t2);
        }, Ao2.prototype.tokenGetAll = function(t2) {
          this.lexer.mode_eval = false, this.lexer.all_tokens = true, t2 = No2(t2);
          const e2 = this.lexer.EOF, s2 = this.tokens.values;
          this.lexer.setInput(t2);
          let i2 = this.lexer.lex() || e2;
          const n2 = [];
          for (; i2 != e2; ) {
            let t3 = this.lexer.yytext;
            Object.prototype.hasOwnProperty.call(s2, i2) && (t3 = [s2[i2], t3, this.lexer.yylloc.first_line]), n2.push(t3), i2 = this.lexer.lex() || e2;
          }
          return n2;
        }, r.exports = Ao2, r.exports.tokens = Eo2, r.exports.lexer = To2, r.exports.AST = mo2, r.exports.parser = xo2, r.exports.combine = yo2, r.exports.Engine = Ao2, r.exports.default = Ao2;
        var go2 = n(r.exports);
        const Lo2 = "PHP", bo2 = [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 7, 7.1, 7.2, 7.3, 7.4, 8, 8.1, 8.2, 8.3, 8.4, 8.5], Io2 = Math.max(...bo2);
        let Co2 = "";
        function So2() {
          const t2 = process.cwd();
          let e2 = null;
          const n2 = i.join(t2, "composer.json");
          if (s.existsSync(n2) && (e2 = n2), !e2) {
            let n3 = i.dirname(t2);
            for (; n3 !== i.parse(n3).root; ) {
              const t3 = i.join(n3, "composer.json");
              if (s.existsSync(t3)) {
                e2 = t3;
                break;
              }
              n3 = i.dirname(n3);
            }
          }
          if (e2) try {
            const t3 = s.readFileSync(e2, "utf8"), i2 = JSON.parse(t3);
            if (i2.require && i2.require.php) {
              const t4 = i2.require.php.match(/^(?:[^0-9]*)?([0-9]+)\.\*/);
              if (t4) return parseFloat(`${t4[1]}.0`);
              const e3 = i2.require.php.match(/^(?:[^0-9]*)?([0-9]+)\.([0-9]+)/);
              return e3 ? parseFloat(`${e3[1]}.${e3[2]}`) : (Co2 = `Could not decode PHP version (${i2.require.php}})`, null);
            }
          } catch (t3) {
            Co2 = `Error reading composer.json: ${t3.message}`;
          }
          else Co2 = "Could not find composer.json";
          return null;
        }
        var Oo2 = { phpVersion: { since: "0.13.0", category: Lo2, type: "choice", default: "auto", description: "Minimum target PHP version.", choices: [...bo2.map(((t2) => ({ value: t2.toFixed(1) }))), { value: "composer", description: "Use the PHP version defined in composer.json" }, { value: "auto", description: `Try composer.json, else latest PHP Version (${Io2})` }] }, trailingCommaPHP: { since: "0.0.0", category: Lo2, type: "boolean", default: true, description: "Print trailing commas wherever possible when multi-line." }, braceStyle: { since: "0.10.0", category: Lo2, type: "choice", default: "per-cs", description: "Print one space or newline for code blocks (classes and functions).", choices: [{ value: "psr-2", description: "(deprecated) Use per-cs" }, { value: "per-cs", description: "Use the PER Coding Style brace style." }, { value: "1tbs", description: "Use 1tbs brace style." }] }, singleQuote: { since: "0.0.0", category: Lo2, type: "boolean", default: false, description: "Use single quotes instead of double quotes." } };
        function Ro2(t2, e2) {
          const s2 = e2 && "markdown" === e2.parentParser;
          if (!t2 && s2) return "";
          !(function(t3) {
            if (t3) if ("auto" === t3.phpVersion) t3.phpVersion = So2() ?? Io2;
            else if ("composer" === t3.phpVersion) {
              const e3 = So2();
              if (null === e3) throw new Error(`Could not determine PHP version from composer; ${Co2}`);
              t3.phpVersion = e3;
            } else t3.phpVersion = parseFloat(t3.phpVersion);
          })(e2), t2 = t2.replace(/\?>\n<\?/g, "?>\n___PSEUDO_INLINE_PLACEHOLDER___<?");
          const i2 = new go2({ parser: { extractDoc: true, version: `${Io2}` }, ast: { withPositions: true, withSource: true } }), n2 = -1 !== t2.indexOf("<?php"), r2 = s2 && !n2;
          let o2;
          try {
            o2 = r2 ? i2.parseEval(t2) : i2.parseCode(t2);
          } catch (t3) {
            throw t3 instanceof SyntaxError && "lineNumber" in t3 && (t3.loc = { start: { line: t3.lineNumber, column: t3.columnNumber } }, delete t3.lineNumber, delete t3.columnNumber), t3;
          }
          return o2.extra = { parseAsEval: r2 }, o2.comments.forEach(((t3) => {
            "\n" === t3.value[t3.value.length - 1] && (t3.value = t3.value.slice(0, -1), t3.loc.end.offset = t3.loc.end.offset - 1);
          })), o2;
        }
        const vo2 = (t2) => (e2) => e2.loc?.[t2]?.offset, wo2 = vo2("start"), Do2 = vo2("end"), { hasNewline: Uo2, skipEverythingButNewLine: Po2, skipNewline: Fo2 } = e.util;
        function Mo2(t2) {
          return t2.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e)/, "");
        }
        const Bo2 = new Map([["or"], ["xor"], ["and"], ["=", "+=", "-=", "*=", "**=", "/=", ".=", "%=", "&=", "|=", "^=", "<<=", ">>="], ["|>"], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!==", "<>", "<=>"], ["<", ">", "<=", ">="], [">>", "<<"], ["+", "-", "."], ["*", "/", "%"], ["!"], ["instanceof"], ["++", "--", "~"], ["**"]].flatMap(((t2, e2) => t2.map(((t3) => [t3, e2])))));
        function Ho2(t2) {
          return Bo2.get(t2);
        }
        const Go2 = ["==", "!=", "===", "!==", "<>", "<=>"], Vo2 = ["*", "/", "%"], Qo2 = [">>", "<<"];
        function Yo2(t2, e2) {
          return Ho2(e2) === Ho2(t2) && ("**" !== t2 && ((!Go2.includes(t2) || !Go2.includes(e2)) && (!("%" === e2 && Vo2.includes(t2) || "%" === t2 && Vo2.includes(e2)) && ((e2 === t2 || !Vo2.includes(e2) || !Vo2.includes(t2)) && (!Qo2.includes(t2) || !Qo2.includes(e2))))));
        }
        function Wo2(t2) {
          const e2 = t2.children || t2.body || t2.adaptations;
          return Array.isArray(e2) ? e2 : null;
        }
        function $o2(t2) {
          return t2.length > 0 ? t2[t2.length - 1] : null;
        }
        function zo2(t2) {
          const { node: e2 } = t2;
          if ("program" === e2.kind) {
            const t3 = Wo2(e2);
            return !(!t3 || 0 === t3.length) && "inline" === t3[0].kind;
          }
          if ("switch" === e2.kind) {
            if (!e2.body) return false;
            const t3 = Wo2(e2.body);
            if (0 === t3.length) return false;
            const [s3] = t3;
            if (!s3.body) return false;
            const i2 = Wo2(s3.body);
            return 0 !== i2.length && "inline" === i2[0].kind;
          }
          const s2 = (function(t3) {
            let { body: e3 } = t3;
            return e3 ? ("block" === e3.kind && (e3 = e3.children), e3[0]) : null;
          })(e2);
          return !!s2 && "inline" === s2.kind;
        }
        function jo2(t2) {
          return "nowdoc" === t2.kind || "encapsed" === t2.kind && "heredoc" === t2.type;
        }
        function Ko2(t2) {
          let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          const s2 = t2.getNode(e2), i2 = t2.getNode(e2 + 1), n2 = t2.getNode(e2 + 2);
          if (!i2) return false;
          if (n2 && ["call", "new", "echo"].includes(n2.kind) && !["call", "array"].includes(i2.kind) || "parameter" === i2.kind) {
            const t3 = n2.arguments.length - 1;
            return n2.arguments.indexOf(i2) !== t3;
          }
          if (n2 && "for" === n2.kind) {
            const t3 = n2.init.indexOf(i2);
            if (-1 !== t3) return t3 !== n2.init.length - 1;
            const e3 = n2.test.indexOf(i2);
            if (-1 !== e3) return e3 !== n2.test.length - 1;
            const s3 = n2.increment.indexOf(i2);
            if (-1 !== s3) return s3 !== n2.increment.length - 1;
          }
          if ("bin" === i2.kind) return i2.left === s2 || Ko2(t2, e2 + 1);
          if ("case" === i2.kind && i2.test === s2) return true;
          if ("staticvariable" === i2.kind) {
            const t3 = n2.variables.length - 1;
            return n2.variables.indexOf(i2) !== t3;
          }
          if ("entry" === i2.kind) {
            if (i2.key === s2) return true;
            const t3 = n2.items.length - 1;
            return n2.items.indexOf(i2) !== t3;
          }
          if (["call", "new"].includes(i2.kind)) {
            const t3 = i2.arguments.length - 1;
            return i2.arguments.indexOf(s2) !== t3;
          }
          if ("echo" === i2.kind) {
            const t3 = i2.expressions.length - 1;
            return i2.expressions.indexOf(s2) !== t3;
          }
          if ("array" === i2.kind) {
            const t3 = i2.items.length - 1;
            return i2.items.indexOf(s2) !== t3;
          }
          return "retif" === i2.kind && Ko2(t2, e2 + 1);
        }
        function Xo2(t2) {
          const e2 = t2.replace(/^\\/, "");
          return -1 !== e2.indexOf("\\") ? e2 : t2;
        }
        function qo2(t2) {
          return t2.comments && t2.comments.some(((t3) => !t3.leading && !t3.trailing));
        }
        function Jo2(t2) {
          return "propertylookup" === t2.kind || "nullsafepropertylookup" === t2.kind || "staticlookup" === t2.kind || "offsetlookup" === t2.kind;
        }
        function Zo2(t2) {
          const { node: e2 } = t2;
          return !["try", "catch"].includes(e2.kind) && zo2(t2);
        }
        function th(t2) {
          const { node: e2 } = t2;
          if (["try", "catch"].includes(e2.kind)) return true;
          if ("switch" === e2.kind) {
            const t3 = Wo2(e2.body);
            if (0 === t3.length) return true;
            const s2 = $o2(t3);
            if (!s2.body) return true;
            const i2 = Wo2(s2.body);
            return 0 === i2.length || "inline" !== i2[0].kind;
          }
          return !zo2(t2);
        }
        function eh(t2) {
          return ["program", "declare", "namespace"].includes(t2.kind);
        }
        function sh(t2) {
          return ["name", "parentreference", "selfreference", "staticreference"].includes(t2.kind);
        }
        function ih(t2) {
          return "bin" === t2.kind && ["||", "&&"].includes(t2.type) ? "logical" : t2.kind;
        }
        function nh(t2) {
          let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "body";
          const { node: s2 } = t2;
          return s2[e2] && s2[e2].children && 0 === s2[e2].children.length && (!s2[e2].comments || 0 === s2[e2].comments.length);
        }
        function rh(t2, e2) {
          let s2 = wo2(e2);
          return s2 = Po2(t2, s2), s2 = Fo2(t2, s2), Uo2(t2, s2);
        }
        function oh(t2) {
          return "nowdoc" === t2.kind || "encapsed" === t2.kind && "heredoc" === t2.type || "entry" === t2.kind && ("nowdoc" === t2.value.kind || "encapsed" === t2.value.kind && "heredoc" === t2.value.type);
        }
        function hh(t2, e2) {
          const s2 = (function(t3, e3) {
            const s3 = [].concat(e3);
            let i2, n2 = -1;
            for (; i2 = t3.getParentNode(++n2); ) if (-1 !== s3.indexOf(i2.kind)) return n2;
            return -1;
          })(t2, e2);
          return -1 === s2 ? null : t2.getParentNode(s2);
        }
        const ah = new Map(["__construct", "__destruct", "__call", "__callStatic", "__get", "__set", "__isset", "__unset", "__sleep", "__wakeup", "__toString", "__invoke", "__set_state", "__clone", "__debugInfo"].map(((t2) => [t2.toLowerCase(), t2])));
        function ch(t2) {
          const e2 = t2.toLowerCase();
          return ah.has(e2) ? ah.get(e2) : t2;
        }
        function lh(t2) {
          const e2 = new Set(t2);
          return (t3) => e2.has(t3?.kind);
        }
        const _h = lh(["variadicplaceholder", "namedargument", "nullkeyword", "identifier", "parameter", "variable", "variadic", "boolean", "literal", "number", "string", "clone", "cast"]), uh = lh(["array"]), ph = lh(["nullsafepropertylookup", "propertylookup", "staticlookup", "offsetlookup", "call", "new"]), dh = lh(["arrowfunc"]);
        function fh(t2) {
          const e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          return ph(t2) && e2.push(t2), t2.what ? fh(t2.what, e2) : e2;
        }
        function kh(t2) {
          let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
          if (e2 <= 0) return false;
          const s2 = (t3) => kh(t3, e2 - 1);
          if (_h(t2)) return true;
          if (uh(t2)) return t2.items.every(((t3) => null === t3 || s2(t3)));
          if (ph(t2)) {
            const i2 = fh(t2);
            return i2.shift(), i2.length <= e2 && i2.every(((t3) => Jo2(t3) ? s2(t3.offset) : t3.arguments.every(s2)));
          }
          return !!dh(t2) && (t2.arguments.length <= e2 && t2.arguments.every(s2));
        }
        const { addLeadingComment: Th, addDanglingComment: xh, addTrailingComment: Eh, skipNewline: mh, hasNewline: yh, hasNewlineInRange: Ah, getNextNonSpaceNonCommentCharacterIndex: Nh, isNextLineEmpty: gh, isPreviousLineEmpty: Lh } = e.util, { join: bh, indent: Ih, hardline: Ch, cursor: Sh, lineSuffix: Oh, breakParent: Rh } = e.doc.builders;
        function vh(t2, e2) {
          const { children: s2 } = t2;
          0 === s2.length ? xh(t2, e2) : Th(s2[0], e2);
        }
        function wh(t2, e2) {
          "block" === t2.kind ? vh(t2, e2) : Th(t2, e2);
        }
        function Dh(t2, e2, s2, i2, n2) {
          const r2 = Nh(t2, Do2(n2)), o2 = t2.charAt(r2);
          return e2 && "identifier" === e2.kind && s2 && ("function" === s2.kind || "method" === s2.kind) && ")" === o2 ? (Eh(s2, n2), true) : !(!s2 || "function" !== s2.kind && "method" !== s2.kind || !i2 || "block" !== i2.kind) && (vh(i2, n2), true);
        }
        function Uh(t2, e2, s2, i2, n2) {
          if (!s2 || "if" !== s2.kind || !i2) return false;
          const r2 = Nh(t2, Do2(n2));
          return ")" === t2.charAt(r2) ? (Eh(e2, n2), true) : e2 === s2.body && i2 === s2.alternate ? (xh(s2, n2), true) : "if" === i2.kind ? (wh(i2.body, n2), true) : s2.body === i2 && (Th(i2, n2), true);
        }
        function Ph(t2, e2, s2) {
          if (t2 && ["class", "interface", "trait"].includes(t2.kind)) {
            if (t2.__parent_new_arguments?.includes(e2)) return false;
            if (e2 && t2.extends) {
              if (Array.isArray(t2.extends)) {
                if (t2.extends.some(((t3) => {
                  if (e2 && e2 === t3) return xh(e2, s2), true;
                }))) return true;
              } else if (e2 === t2.extends) return xh(e2, s2), true;
            }
            if (e2 && t2.implements && t2.implements.some(((t3) => {
              if (e2 && e2 === t3) return xh(e2, s2), true;
            }))) return true;
            if (!(t2.body && t2.body.length > 0)) return xh(t2, s2), true;
          }
          return !!(e2 && "class" === e2.kind && e2.isAnonymous && e2.leadingComments && "commentblock" === s2.kind);
        }
        function Fh(t2, e2, s2, i2) {
          if (e2 && ("function" === e2.kind || "method" === e2.kind)) {
            let s3 = 0;
            for (let t3 = 0; t3 < e2.arguments.length; t3++) s3 = Do2(e2.arguments[t3]) > s3 ? Do2(e2.arguments[t3]) : s3;
            const n2 = e2.body && wo2(i2) > s3 && Do2(i2) < wo2(e2.body), r2 = Nh(t2, Do2(i2));
            if (e2.type && n2 && ")" !== t2.charAt(r2)) return Do2(i2) < wo2(e2.type) ? (xh(e2.type, i2), true) : (Eh(e2.type, i2), true);
          }
          return false;
        }
        function Mh(t2, e2, s2, i2, n2) {
          return !(!s2 || !["function", "method", "parameter"].includes(s2.kind)) && ("typereference" === e2.kind && "identifier" === i2.kind && (Eh(e2, n2), true));
        }
        function Bh(t2, e2) {
          return !(!t2 || !["label", "goto"].includes(t2.kind)) && (Eh(t2, e2), true);
        }
        function Hh(t2, e2, s2, i2) {
          return s2 && "inline" === s2.kind ? (s2.leadingComments || (s2.leadingComments = []), s2.leadingComments.includes(i2) || s2.leadingComments.push(i2), true) : !(t2 || s2 || !e2 || "inline" !== e2.kind) && (xh(e2, i2), true);
        }
        function Gh(t2, e2, s2) {
          return !(!t2 || "try" !== t2.kind || !e2) && ("block" === e2.kind ? (vh(e2, s2), true) : "try" === e2.kind ? (wh(e2.always, s2), true) : "catch" === e2.kind && (wh(e2.body, s2), true));
        }
        function Vh(t2, e2, s2, i2) {
          return s2 || e2 || !t2 || "namespace" !== t2.kind || t2.withBrackets ? !(e2 || !t2 || "namespace" !== t2.kind || t2.withBrackets) && (xh(t2, i2), true) : (Eh(t2, i2), true);
        }
        function Qh(t2, e2, s2, i2) {
          return !(!t2 || "declare" !== t2.kind) && ((!e2 || "noop" !== e2.kind) && (s2 && t2.directives[0] !== s2 ? !(!s2 || !e2) && (Th(s2, i2), true) : ("none" === t2.mode ? Eh(t2, i2) : xh(t2, i2), true)));
        }
        function Yh(t2, e2, s2, i2, n2) {
          if (!s2 || "while" !== s2.kind || !i2) return false;
          const r2 = Nh(t2, Do2(n2));
          return ")" === t2.charAt(r2) ? (Eh(e2, n2), true) : "block" === i2.kind && (vh(i2, n2), true);
        }
        function Wh(t2, e2) {
          return t2.node.printed = true, e2.printer.printComment(t2, e2);
        }
        function $h(t2, e2, s2, i2) {
          const n2 = [], r2 = t2.getValue();
          return r2 && r2.comments ? (t2.each((() => {
            const s3 = t2.node;
            !s3 || s3.leading || s3.trailing || i2 && !i2(s3) || n2.push(Wh(t2, e2));
          }), "comments"), 0 === n2.length ? "" : s2 ? bh(Ch, n2) : Ih([Ch, bh(Ch, n2)])) : "";
        }
        function zh(t2) {
          return t2.comments && t2.comments.some(((t3) => t3.leading));
        }
        function jh(t2) {
          return t2.comments && t2.comments.some(((t3) => t3.trailing));
        }
        function Kh(t2, e2) {
          const s2 = [];
          return t2.forEach(((t3, i2, n2) => {
            t3.printed = true;
            const r2 = n2.length === i2 + 1;
            s2.push(t3.value), r2 || s2.push(Ch), gh(e2.originalText, Do2(t3)) && !r2 && s2.push(Ch);
          })), s2;
        }
        function Xh(t2) {
          return "commentblock" === t2.kind;
        }
        function qh(t2, e2, s2) {
          const { node: i2 } = t2;
          return i2 && i2 === e2.cursorNode ? [Sh, s2, Sh] : s2;
        }
        function Jh(t2, e2, s2, i2) {
          const { node: n2 } = t2, r2 = e2(t2), o2 = n2 && n2.comments;
          if (!o2 || 0 === o2.length) return qh(t2, s2, r2);
          const h2 = [], a2 = [i2 ? ";" : "", r2];
          return t2.each(((e3) => {
            let { node: i3 } = e3;
            const { leading: n3, trailing: r3 } = i3;
            if (n3) {
              const e4 = (function(t3, e5, s3) {
                const i4 = Wh(t3, s3);
                if (!i4) return "";
                const n5 = t3.node;
                return s3.printer.isBlockComment && s3.printer.isBlockComment(n5) ? [i4, yh(s3.originalText, Do2(n5)) ? Ch : " "] : [i4, Ch];
              })(t2, 0, s2);
              if (!e4) return;
              h2.push(e4);
              const n4 = s2.originalText;
              yh(n4, mh(n4, Do2(i3))) && h2.push(Ch);
            } else r3 && a2.push((function(t3, e4, s3) {
              const i4 = Wh(t3, s3);
              if (!i4) return "";
              const n4 = t3.node, r4 = s3.printer.isBlockComment && s3.printer.isBlockComment(n4);
              if (yh(s3.originalText, wo2(n4), { backwards: true })) {
                const t4 = Lh(s3.originalText, wo2(n4));
                return Oh([Ch, t4 ? Ch : "", i4]);
              }
              return r4 ? [" ", i4] : [Oh([" ", i4]), r4 ? "" : Rh];
            })(t2, 0, s2));
          }), "comments"), qh(t2, s2, h2.concat(a2));
        }
        function Zh(t2, e2) {
          const { parent: s2 } = t2;
          if (!s2) return false;
          const { key: i2, node: n2 } = t2;
          if (["program", "expressionstatement", "namespace", "declare", "block", "include", "print", "return", "echo"].includes(s2.kind)) return false;
          switch (n2.kind) {
            case "pre":
            case "post":
              if ("unary" === s2.kind) return "pre" === n2.kind && ("+" === n2.type && "+" === s2.type || "-" === n2.type && "-" === s2.type);
            case "unary":
              switch (s2.kind) {
                case "unary":
                  return n2.type === s2.type && ("+" === n2.type || "-" === n2.type);
                case "propertylookup":
                case "nullsafepropertylookup":
                case "staticlookup":
                case "offsetlookup":
                case "call":
                  return "what" === i2;
                case "bin":
                  return "**" === s2.type && "left" === i2;
                default:
                  return false;
              }
            case "bin":
              switch (s2.kind) {
                case "assign":
                case "retif":
                  return ["and", "xor", "or"].includes(n2.type);
                case "silent":
                case "cast":
                  return n2.parenthesizedExpression;
                case "pre":
                case "post":
                case "unary":
                  return true;
                case "call":
                case "propertylookup":
                case "nullsafepropertylookup":
                case "staticlookup":
                case "offsetlookup":
                  return "what" === i2;
                case "bin": {
                  const t3 = s2.type, e3 = Ho2(t3), o2 = n2.type, h2 = Ho2(o2);
                  return e3 > h2 || ("||" === t3 && "&&" === o2 || (e3 === h2 && "right" === i2 || (e3 === h2 && !Yo2(t3, o2) || (e3 < h2 && "%" === o2 ? "+" === t3 || "-" === t3 : (r2 = t3, !(!Qo2.includes(r2) && "|" !== r2 && "^" !== r2 && "&" !== r2))))));
                }
                default:
                  return false;
              }
            case "propertylookup":
            case "nullsafepropertylookup":
            case "staticlookup":
              return "call" === s2.kind && ("what" === i2 && n2.parenthesizedExpression);
            case "clone":
            case "new": {
              const t3 = "clone" === n2.kind || "new" === n2.kind && e2.phpVersion < 8.4;
              switch (s2.kind) {
                case "propertylookup":
                case "nullsafepropertylookup":
                case "staticlookup":
                case "offsetlookup":
                case "call":
                  return "what" === i2 && t3;
                default:
                  return false;
              }
            }
            case "yield":
            case "yieldfrom":
              switch (s2.kind) {
                case "propertylookup":
                case "nullsafepropertylookup":
                case "staticlookup":
                case "offsetlookup":
                case "call":
                  return "what" === i2;
                case "retif":
                  return "test" === i2;
                case "assign":
                  return "yield" === n2.kind && !(!n2.key && !n2.value);
                default:
                  return "yieldfrom" === n2.kind || !(!n2.key && !n2.value);
              }
            case "assign":
              return ("for" !== s2.kind || !s2.init.includes(n2) && !s2.increment.includes(n2)) && ("assign" !== s2.kind && ("staticvariable" !== s2.kind && (!["if", "do", "while", "foreach", "switch"].includes(s2.kind) && ("silent" !== s2.kind && "call" !== s2.kind))));
            case "retif":
              switch (s2.kind) {
                case "cast":
                  return true;
                case "unary":
                case "bin":
                case "retif":
                  return !("test" === i2 && !s2.trueExpr);
                case "propertylookup":
                case "nullsafepropertylookup":
                case "staticlookup":
                case "offsetlookup":
                case "call":
                  return "what" === i2;
                default:
                  return false;
              }
            case "closure":
              switch (s2.kind) {
                case "call":
                  return "what" === i2;
                case "propertylookup":
                case "nullsafepropertylookup":
                  return true;
                default:
                  return false;
              }
            case "silent":
            case "cast":
              return n2.parenthesizedExpression;
            case "string":
            case "array":
              switch (s2.kind) {
                case "propertylookup":
                case "nullsafepropertylookup":
                case "staticlookup":
                case "offsetlookup":
                case "call":
                  return (!["string", "array"].includes(n2.kind) || "offsetlookup" !== s2.kind) && "what" === i2;
                default:
                  return false;
              }
            case "print":
            case "include":
              return "bin" === s2.kind;
          }
          var r2;
          return false;
        }
        const { breakParent: ta, join: ea, line: sa, lineSuffix: ia, group: na, conditionalGroup: ra, indent: oa, dedent: ha, ifBreak: aa, hardline: ca, hardlineWithoutBreakParent: la, softline: _a, literalline: ua, align: pa, dedentToRoot: da } = e.doc.builders, { willBreak: fa } = e.doc.utils, { isNextLineEmptyAfterIndex: ka, hasNewline: Ta, hasNewlineInRange: xa, getNextNonSpaceNonCommentCharacterIndex: Ea, isNextLineEmpty: ma, isPreviousLineEmpty: ya } = e.util;
        function Aa(t2, e2) {
          return !!t2.trailingCommaPHP && t2.phpVersion >= e2;
        }
        function Na(t2) {
          return "1tbs" !== t2.braceStyle;
        }
        function ga(t2, e2, s2) {
          return [arguments.length > 3 && void 0 !== arguments[3] && arguments[3] ? "?" : "", "->", s2("offset")];
        }
        function La(t2, e2, s2) {
          return ga(t2, e2, s2, true);
        }
        function ba(t2, e2, s2) {
          const { node: i2 } = t2, n2 = !["variable", "identifier"].includes(i2.offset.kind);
          return ["::", n2 ? "{" : "", s2("offset"), n2 ? "}" : ""];
        }
        function Ia(t2, e2, s2) {
          const { node: i2 } = t2, n2 = i2.offset && "number" === i2.offset.kind || hh(t2, "encapsed");
          return ["[", i2.offset ? na([oa([n2 ? "" : _a, s2("offset")]), n2 ? "" : _a]) : "", "]"];
        }
        function Ca(t2) {
          return "array" === t2.kind && (t2.items.length > 0 || t2.comments) || "function" === t2.kind || "method" === t2.kind || "closure" === t2.kind;
        }
        function Sa(t2, e2, s2) {
          let i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "arguments";
          const n2 = t2.node[i2];
          if (0 === n2.length) return ["(", $h(t2, e2, true), ")"];
          let r2 = false, o2 = false;
          const h2 = t2.map(((t3) => {
            let { node: i3, isLast: n3, isFirst: h3 } = t3;
            const a3 = [s2()];
            return n3 || (ma(e2.originalText, Do2(i3)) ? (h3 && (o2 = true), r2 = true, a3.push(",", ca, ca)) : a3.push(",", sa)), a3;
          }), i2), { node: a2 } = t2, c2 = $o2(n2), l2 = Aa(e2, 7.3) && ["call", "new", "unset", "isset"].includes(a2.kind) || Aa(e2, 8) && ["function", "closure", "method", "arrowfunc", "attribute"].includes(a2.kind) ? oa([c2 && oh(c2) ? ca : "", ","]) : "";
          const _2 = (function(t3) {
            if (2 !== t3.length) return false;
            const [e3, s3] = t3;
            return !(e3.comments && e3.comments.length || "function" !== e3.kind && "method" !== e3.kind && "closure" !== e3.kind || "retif" === s3.kind || Ca(s3));
          })(n2), u2 = (function(t3) {
            const e3 = $o2(t3), s3 = (i3 = t3).length > 1 ? i3[i3.length - 2] : null;
            var i3;
            return !zh(e3) && !jh(e3) && Ca(e3) && (!s3 || s3.kind !== e3.kind);
          })(n2);
          if (_2 || u2) {
            const e3 = (_2 ? h2.slice(1).some(fa) : h2.slice(0, -1).some(fa)) || r2;
            let n3;
            t2.each(((t3) => {
              let { isLast: e4, isFirst: i3 } = t3;
              _2 && i3 && (n3 = [s2([], { expandFirstArg: true }), h2.length > 1 ? "," : "", o2 ? ca : sa, o2 ? ca : "", h2.slice(1)]), u2 && e4 && (n3 = [...h2.slice(0, -1), s2([], { expandLastArg: true })]);
            }), i2);
            const a3 = h2.some(fa), c3 = ["(", ...n3, ")"];
            return [a3 ? ta : "", ra([a3 ? aa(na(["(", oa([sa, ...h2]), l2, sa, ")"], { shouldBreak: true }), c3) : c3, _2 ? ["(", na(n3[0], { shouldBreak: true }), ...n3.slice(1), ")"] : ["(", ...h2.slice(0, -1), na($o2(n3), { shouldBreak: true }), ")"], na(["(", oa([sa, ...h2]), aa(l2), sa, ")"], { shouldBreak: true })], { shouldBreak: e3 })];
          }
          return na(["(", oa([_a, ...h2]), aa(l2), _a, ")"], { shouldBreak: h2.some(fa) || r2 });
        }
        function Oa(t2) {
          return "array" === t2.kind && 0 !== t2.items.length;
        }
        function Ra(t2) {
          return "array" === t2.right.kind && 0 !== t2.right.items.length;
        }
        function va(t2, e2, s2, i2, n2) {
          let r2 = [];
          const { node: o2 } = t2;
          if ("bin" === o2.kind) {
            Yo2(o2.type, o2.left.type) ? r2 = r2.concat(t2.call((() => va(t2, e2, s2, true, n2)), "left")) : r2.push(e2("left"));
            const h2 = Ra(o2) ? [o2.type, " ", e2("right")] : [o2.type, sa, e2("right")], { parent: a2 } = t2, c2 = !(n2 && ["||", "&&"].includes(o2.type)) && ih(a2) !== ih(o2) && ih(o2.left) !== ih(o2) && ih(o2.right) !== ih(o2), l2 = jo2(o2.left) || "bin" === o2.left.kind && jo2(o2.left.right);
            r2.push(l2 ? "" : " ", c2 ? na(h2) : h2), i2 && o2.comments && (r2 = Jh(t2, (() => r2), s2));
          } else r2.push(e2());
          return r2;
        }
        function wa(t2, e2, s2) {
          const { node: i2 } = t2;
          switch (i2.kind) {
            case "propertylookup":
              return ga(t2, e2, s2);
            case "nullsafepropertylookup":
              return La(t2, e2, s2);
            case "staticlookup":
              return ba(t2, 0, s2);
            case "offsetlookup":
              return Ia(t2, 0, s2);
            default:
              throw new Error(`Have not implemented lookup kind ${i2.kind} yet.`);
          }
        }
        function Da(t2) {
          let { opening: e2 = true } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if ("heredoc" === t2.type) return e2 ? `<<<${t2.label}` : t2.label;
          const s2 = { string: '"', shell: "`" };
          if (s2[t2.type]) return s2[t2.type];
          throw new Error(`Unimplemented encapsed type ${t2.type}`);
        }
        function Ua(t2, e2, s2) {
          const i2 = [];
          let n2 = [];
          return t2.each(((t3) => {
            let { node: r2 } = t3;
            i2.push(n2), i2.push(na(s2())), n2 = [",", sa], r2 && ma(e2.originalText, Do2(r2)) && n2.push(_a);
          }), "items"), i2;
        }
        function Pa(t2, e2, s2) {
          let i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "children";
          const { node: n2, parent: r2 } = t2;
          let o2 = -1;
          const h2 = [], a2 = [];
          t2.map((() => {
            const { node: i3, next: c3, isFirst: l2, isLast: _2, index: u2 } = t2, p2 = "inline" === i3.kind, d2 = s2(), f2 = !_2 && !p2 && (c3 && "case" === c3.kind ? !zo2(t2) : c3 && "inline" !== c3.kind);
            let k3 = [d2, f2 ? ca : "", f2 && ma(e2.originalText, Do2(i3)) ? ca : ""];
            const T3 = "block" === n2.kind && r2 && ["function", "closure", "method", "try", "catch"].includes(r2.kind);
            let x3 = T3 && l2 ? "" : " ";
            if (p2 || !p2 && _2 && o2 >= 0) {
              const e3 = o2;
              p2 && (o2 = u2);
              if (p2 && !l2 || !p2 && _2) {
                const s3 = (p2 ? e3 : o2) + 1, r3 = _2 && !p2 ? u2 + 1 : u2, h3 = t2.siblings[p2 ? e3 : o2], c4 = h3 ? (function(t3) {
                  const e4 = t3.split("\n").pop();
                  return e4.length - e4.trimLeft().length + 1;
                })(h3.raw) : "", l3 = r3 - s3 > 1, d3 = l3 ? T3 && !h3 || eh(n2) && 0 === s3 ? "" : ca : "", f3 = l3 && "halt" !== i3.kind ? T3 && _2 ? "" : ca : "";
                l3 && (x3 = ""), a2.push({ start: s3, end: r3, alignment: c4, before: d3, after: f3 });
              }
            }
            if (p2) {
              const s3 = c3 && "echo" === c3.kind && c3.shortForm ? "<?=" : "<?php", r3 = i3.leadingComments && i3.leadingComments.length ? [l2 && "namespace" !== n2.kind && !T3 ? "<?php" : "", "namespace" !== n2.kind && T3 ? "" : ca, Kh(i3.leadingComments, e2), ca, "?>"] : eh(n2) && l2 && "namespace" !== n2.kind ? "" : [x3, "?>"], o3 = t2.getNode(u2 + 1), h3 = o3 && o3.children && o3.children.length;
              k3 = [r3, k3, i3.comments && i3.comments.length ? [s3, ca, h3 ? Kh(i3.comments, e2) : "", ca] : eh(n2) && _2 ? "" : [s3, " "]];
            }
            h2.push(k3);
          }), i2);
          const c2 = (function(t3, e3) {
            if (0 === e3.length) return t3;
            let s3 = 0;
            return e3.reduce(((e4, i3) => {
              const { start: n3, end: r3, alignment: o3, before: h3, after: a3 } = i3, c3 = [h3 || "", ...t3.slice(n3, r3), a3 || ""], l2 = e4.concat(t3.slice(s3, n3), o3 ? da(na(pa(new Array(o3).join(" "), c3))) : na(c3), r3 === t3.length - 1 ? t3.slice(r3) : "");
              return s3 = r3, l2;
            }), []);
          })(h2, a2);
          if ("program" === n2.kind && !n2.extra.parseAsEval) {
            const t3 = [], [s3] = n2.children;
            if (!s3 || "inline" !== s3.kind) {
              const i3 = e2.originalText.trim().match(/^<\?(php|=)(\s+)?\S/), r3 = [i3 && i3[2] && i3[2].includes("\n") ? [ca, i3[2].split("\n").length > 2 ? ca : ""] : " ", n2.comments ? Kh(n2.comments, e2) : ""], o3 = s3 && "echo" === s3.kind && s3.shortForm;
              t3.push([o3 ? "<?=" : "<?php", r3]);
            }
            t3.push(c2);
            if (/\?>\n?$/.test(e2.originalText)) {
              const s4 = $o2(n2.children), i3 = s4 ? [xa(e2.originalText.trimEnd(), Do2(s4), Do2(n2)) ? "inline" === s4.kind && s4.comments && s4.comments.length ? "" : ca : " ", ma(e2.originalText, Do2(s4)) ? ca : ""] : n2.comments ? ca : "";
              t3.push(ia([i3, "?>"]));
            }
            return t3;
          }
          return c2;
        }
        function Fa(t2, e2, s2, i2) {
          return t2.map(((t3) => {
            let { node: i3, isLast: n2 } = t3;
            const r2 = [];
            return r2.push(s2()), n2 || (r2.push(ca), ma(e2.originalText, Do2(i3)) && r2.push(ca)), r2;
          }), i2);
        }
        function Ma(t2, e2, s2) {
          let i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "extends", n2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : " ", r2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : " ";
          const o2 = t2.node[i2], h2 = qo2(o2) ? [ca, t2.call((() => $h(t2, e2, true)), i2), ca] : n2, a2 = Array.isArray(o2) ? na(ea(",", t2.map(((i3) => {
            let { node: n3 } = i3;
            const o3 = s2();
            return qo2(n3) ? [ca, $h(t2, e2, true), ca, o3] : [r2, o3];
          }), i2))) : [r2, s2(i2)];
          return oa([h2, i2, fa(h2) ? oa(a2) : a2]);
        }
        function Ba(t2, e2, s2) {
          let { inline: i2 = false } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
          const n2 = [];
          return t2.node.attrGroups ? (t2.each((() => {
            const r2 = ["#["];
            !i2 && n2.length > 0 && n2.push(ca), r2.push(_a), t2.each((() => {
              const i3 = t2.node;
              r2.length > 2 && r2.push(",", sa);
              const n3 = [i3.name];
              i3.args.length > 0 && n3.push(Sa(t2, e2, s2, "args")), r2.push(na(n3));
            }), "attrs"), n2.push(na([oa(r2), aa(Aa(e2, 8) ? "," : ""), _a, "]", i2 ? aa(_a, " ") : ""]));
          }), "attrGroups"), 0 === n2.length ? [] : [...n2, i2 ? "" : ca]) : [];
        }
        function Ha(t2, e2, s2) {
          let i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "body";
          const { node: n2 } = t2;
          if (!n2[i2]) return ";";
          const r2 = s2(i2);
          return [n2.shortForm ? ":" : " {", oa("block" !== n2[i2].kind || n2[i2].children && n2[i2].children.length > 0 || n2[i2].comments && n2[i2].comments.length > 0 ? [Zo2(t2) ? "switch" === n2.kind ? " " : "" : ca, r2] : ""), "if" === n2.kind && "body" === i2 ? "" : [th(t2) ? ca : "", n2.shortForm ? ["end", n2.kind, ";"] : "}"]];
        }
        function Ga(t2, e2, s2, i2, n2, r2, o2) {
          if (!i2) return e2;
          const h2 = Qa(t2, i2, n2, r2, o2);
          return na([e2, s2, h2]);
        }
        function Va(t2) {
          return !!Jo2(t2) && (!("variable" !== t2.what.kind && !sh(t2.what)) || Va(t2.what));
        }
        function Qa(t2, e2, s2, i2, n2) {
          const r2 = i2 ? "&" : "";
          if ((function(t3, e3) {
            return e3.comments && e3.comments.some(((e4) => e4.leading && yh(t3, Do2(e4))));
          })(n2.originalText, e2)) return oa([ca, r2, s2]);
          const o2 = "cast" === e2.kind ? e2.expr : e2;
          return "bin" === o2.kind && "|>" !== o2.type && !Ra(o2) || "retif" === o2.kind && (!o2.trueExpr && !Oa(o2.falseExpr) || "bin" === o2.test.kind && !Ra(o2.test)) || ("variable" === t2.kind || "string" === t2.kind || Jo2(t2)) && ("string" === o2.kind && !Ya(o2) || Va(o2)) ? na(oa([sa, r2, s2])) : [" ", r2, s2];
        }
        function Ya(t2) {
          return t2.raw.includes("\n");
        }
        function Wa(t2, e2) {
          return ("string" === t2.kind || "encapsed" === t2.kind && ("string" === t2.type || "shell" === t2.type)) && Ya(t2) && !Ta(e2, wo2(t2), { backwards: true });
        }
        function $a(t2, e2, s2) {
          return na(t2.map(((t3) => {
            let { isFirst: i2 } = t3;
            return i2 ? [e2()] : [s2, e2()];
          }), "types"));
        }
        const za = /* @__PURE__ */ new Set(["loc", "range", "raw", "comments", "leadingComments", "trailingComments", "parenthesizedExpression", "parent", "prev", "start", "end", "tokens", "errors", "extra"]);
        function ja(t2, e2) {
          if ("string" === t2.kind && delete e2.isDoubleQuote, ["array", "list"].includes(t2.kind) && delete e2.shortForm, "inline" === t2.kind) {
            if (t2.value.includes("___PSEUDO_INLINE_PLACEHOLDER___")) return null;
            e2.value = e2.value.replace(/\n/g, "");
          }
          if (("continue" === t2.kind || "break" === t2.kind) && t2.level) {
            const { level: t3 } = e2;
            "number" === t3.kind && (e2.level = "1" === t3.value ? null : t3);
          }
          if ("block" === t2.kind && 1 === t2.children.length && "block" === t2.children[0].kind) for (; "block" === e2.children[0].kind; ) e2.children = e2.children[0].children;
          "number" === t2.kind && (e2.value = Mo2(t2.value));
          if (["foreach", "for", "if", "while", "do"].includes(t2.kind) && (t2.body && "block" !== t2.body.kind ? e2.body = { kind: "block", children: [e2.body] } : e2.body = e2.body ? e2.body : null, t2.alternate && "block" !== t2.alternate.kind ? e2.alternate = { kind: "block", children: [e2.alternate] } : e2.alternate = e2.alternate ? e2.alternate : null), "usegroup" === t2.kind && "string" == typeof t2.name && (e2.name = e2.name.replace(/^\\/, "")), "useitem" === t2.kind && (e2.name = e2.name.replace(/^\\/, "")), "method" === t2.kind && "identifier" === t2.name.kind && (e2.name.name = ch(e2.name.name)), "noop" === t2.kind) return null;
        }
        ja.ignoredProperties = za;
        const Ka = /@prettier|@format/, Xa = /* @__PURE__ */ (function(t2) {
          const e2 = /* @__PURE__ */ new Map();
          return (s2) => (e2.has(s2) || e2.set(s2, t2(s2)), e2.get(s2));
        })(((t2) => {
          const e2 = Ro2(t2), [s2] = e2.children, [i2] = e2.comments.filter(((t3) => "commentblock" === t3.kind));
          if (s2 && i2 && i2.loc.start.line < s2.loc.start.line) return i2;
        }));
        const { join: qa, hardline: Ja } = e.doc.builders;
        function Za(t2, e2) {
          let { extend: s2, override: i2 } = e2;
          const n2 = {};
          for (const e3 in t2) {
            n2["languageId" === e3 ? "linguistLanguageId" : e3] = t2[e3];
          }
          if (s2) for (const t3 in s2) n2[t3] = (n2[t3] || []).concat(s2[t3]);
          for (const t3 in i2) n2[t3] = i2[t3];
          return n2;
        }
        const tc = [Za({ name: "PHP", type: "programming", color: "#4F5D95", extensions: [".php", ".aw", ".ctp", ".fcgi", ".inc", ".php3", ".php4", ".php5", ".phps", ".phpt"], tmScope: "text.html.php", aceMode: "php", languageId: 272, aliases: ["inc"], codemirrorMode: "php", codemirrorMimeType: "application/x-httpd-php", interpreters: ["php"], filenames: [".php", ".php_cs", ".php_cs.dist", "Phakefile"] }, { override: { parsers: ["php"], vscodeLanguageIds: ["php"] } }), Za({ name: "HTML+PHP", type: "markup", color: "#4f5d95", extensions: [".phtml"], tmScope: "text.html.php", aceMode: "php", languageId: 151, codemirrorMode: "php", codemirrorMimeType: "application/x-httpd-php", group: "HTML" }, { override: { parsers: ["php"], vscodeLanguageIds: ["php"] } })], ec = { php: { parse: Ro2, astFormat: "php", locStart: wo2, locEnd: Do2, hasPragma: function(t2) {
          if (!Ka.test(t2)) return false;
          const e2 = Xa(t2);
          if (e2) {
            const { value: t3 } = e2;
            return Ka.test(t3);
          }
          return false;
        } } }, sc = /* @__PURE__ */ new Set(["kind", "loc", "errors", "extra", "comments", "leadingComments", "enclosingNode", "precedingNode", "followingNode"]);
        const ic = { php: { print: function(t2, e2, s2) {
          const { node: i2 } = t2;
          if ("string" == typeof i2) return i2;
          const n2 = (function(t3, e3, s3) {
            const { node: i3 } = t3;
            switch (i3.kind) {
              case "program":
                return na([Pa(t3, e3, s3), $h(t3, e3, true, ((t4) => !t4.printed))]);
              case "expressionstatement":
                return s3("expression");
              case "block":
                return [Pa(t3, e3, s3), $h(t3, e3, true)];
              case "declare": {
                const n3 = (t4) => ea(", ", t4.map(s3, "directives"));
                return ["block", "short"].includes(i3.mode) ? ["declare(", n3(t3), ")", "block" === i3.mode ? " {" : ":", i3.children.length > 0 ? oa([ca, Pa(t3, e3, s3)]) : "", $h(t3, e3), ca, "block" === i3.mode ? "}" : "enddeclare;"] : ["declare(", n3(t3), ")", "inline" === t3.next?.kind ? "" : ";"];
              }
              case "declaredirective":
                return [s3("key"), "=", s3("value")];
              case "namespace":
                return ["namespace ", i3.name && "string" == typeof i3.name ? [i3.name, i3.withBrackets ? " " : ""] : "", i3.withBrackets ? "{" : ";", qo2(i3) ? [" ", $h(t3, e3, true)] : "", i3.children.length > 0 ? i3.withBrackets ? oa([ca, Pa(t3, e3, s3)]) : ["inline" === i3.children[0].kind ? "" : [ca, rh(e3.originalText, i3) ? ca : ""], Pa(t3, e3, s3)] : "", i3.withBrackets ? [ca, "}"] : ""];
              case "usegroup":
                return na(["use ", i3.type ? [i3.type, " "] : "", oa([i3.name ? [Xo2(i3.name), "\\{", _a] : "", ea([",", sa], t3.map(s3, "items"))]), i3.name ? [aa(Aa(e3, 7.2) ? "," : ""), _a, "}"] : ""]);
              case "useitem":
                return [i3.type ? [i3.type, " "] : "", Xo2(i3.name), qo2(i3) ? [" ", $h(t3, e3, true)] : "", i3.alias ? [" as ", s3("alias")] : ""];
              case "class":
              case "enum":
              case "interface":
              case "trait":
                return (function(t4, e4, s4) {
                  const { node: i4 } = t4, n3 = "class" === i4.kind && i4.isAnonymous, r3 = Ba(t4, e4, s4, { inline: n3 }), o3 = n3 ? [] : [...r3];
                  i4.isFinal && o3.push("final ");
                  i4.isAbstract && o3.push("abstract ");
                  i4.isReadonly && !n3 && o3.push("readonly ");
                  o3.push(n3 ? "" : i4.kind), i4.name && o3.push(" ", s4("name"));
                  "enum" === i4.kind && i4.valueType && o3.push(": ", s4("valueType"));
                  i4.extends && i4.implements ? o3.push(ra([[Ma(t4, e4, s4, "extends"), Ma(t4, e4, s4, "implements")], [Ma(t4, e4, s4, "extends"), Ma(t4, e4, s4, "implements", " ", ca)], [Ma(t4, e4, s4, "extends", ca, " "), Ma(t4, e4, s4, "implements", ca, i4.implements.length > 1 ? ca : " ")]], { shouldBreak: qo2(i4.extends) })) : (i4.extends && o3.push(ra([Ma(t4, e4, s4, "extends"), Ma(t4, e4, s4, "extends", " ", ca), Ma(t4, e4, s4, "extends", ca, i4.extends.length > 1 ? ca : " ")])), i4.implements && o3.push(ra([Ma(t4, e4, s4, "implements"), Ma(t4, e4, s4, "implements", " ", ca), Ma(t4, e4, s4, "implements", ca, i4.implements.length > 1 ? ca : " ")])));
                  const h2 = i4.body && 0 === i4.body.length && !qo2(i4), a2 = na([na(o3), Na(e4) && !h2 ? n3 ? sa : ca : " "]), c2 = ["{", oa([h2 ? "" : ca, Fa(t4, e4, s4, "body")]), $h(t4, e4, true), h2 ? "" : ca, "}"];
                  return [a2, c2];
                })(t3, e3, s3);
              case "traitprecedence":
                return [s3("trait"), "::", s3("method"), " insteadof ", ea(", ", t3.map(s3, "instead"))];
              case "traitalias":
                return [i3.trait ? [s3("trait"), "::"] : "", i3.method ? s3("method") : "", " as ", ea(" ", [...i3.visibility ? [i3.visibility] : [], ...i3.as ? [s3("as")] : []])];
              case "traituse":
                return na(["use ", oa(na(ea([",", sa], t3.map(s3, "traits")))), i3.adaptations ? [" {", i3.adaptations.length > 0 ? [oa([ca, Fa(t3, e3, s3, "adaptations")]), ca] : qo2(i3) ? [sa, $h(t3, e3, true), sa] : "", "}"] : ""]);
              case "function":
              case "closure":
              case "method":
                return (function(t4, e4, s4) {
                  const { node: i4 } = t4, n3 = Ba(t4, e4, s4, { inline: "closure" === i4.kind }), r3 = [];
                  i4.isFinal && r3.push("final ");
                  i4.isAbstract && r3.push("abstract ");
                  i4.visibility && r3.push(i4.visibility, " ");
                  i4.isStatic && r3.push("static ");
                  r3.push("function "), i4.byref && r3.push("&");
                  i4.name && r3.push(s4("name"));
                  r3.push(Sa(t4, e4, s4)), i4.uses && i4.uses.length > 0 && r3.push(na([" use ", Sa(t4, e4, s4, "uses")]));
                  i4.type && r3.push([": ", qo2(i4.type) ? [t4.call((() => $h(t4, e4, true)), "type"), " "] : "", i4.nullable ? "?" : "", s4("type")]);
                  const o3 = r3;
                  if (!i4.body) return [...n3, o3];
                  const h2 = ["{", oa([nh(t4) ? "" : ca, s4("body")]), nh(t4) ? "" : ca, "}"], a2 = "closure" === i4.kind;
                  if (a2) return [...n3, o3, " ", h2];
                  if (0 === i4.arguments.length) return [...n3, o3, Na(e4) && !nh(t4) ? ca : " ", h2];
                  const c2 = r3.some(fa);
                  if (c2) return [...n3, o3, " ", h2];
                  return [...n3, ra([[o3, Na(e4) && !nh(t4) ? ca : " ", h2], [o3, " ", h2]])];
                })(t3, e3, s3);
              case "arrowfunc":
                return [i3.parenthesizedExpression ? "(" : "", ...Ba(t3, e3, s3, { inline: true }), i3.isStatic ? "static " : "", "fn", Sa(t3, e3, s3), i3.type ? [": ", i3.nullable ? "?" : "", s3("type")] : "", " => ", s3("body"), i3.parenthesizedExpression ? ")" : ""];
              case "parameter": {
                let n3 = "";
                1 === i3.flags ? n3 = "public " : 2 === i3.flags ? n3 = "protected " : 4 === i3.flags && (n3 = "private ");
                const r3 = [...Ba(t3, e3, s3, { inline: true }), n3, i3.readonly ? "readonly " : "", i3.nullable ? "?" : "", i3.type ? [s3("type"), " "] : "", i3.byref ? "&" : "", i3.variadic ? "..." : "", "$", s3("name")];
                return i3.value ? na([r3, qo2(i3) ? " " : "", $h(t3, e3, true), " =", Qa(i3.name, i3.value, s3("value"), false, e3)]) : r3;
              }
              case "variadic":
                return ["...", s3("what")];
              case "property":
                return na([i3.readonly ? "readonly " : "", i3.type ? [i3.nullable ? "?" : "", s3("type"), " "] : "", "$", s3("name"), i3.value ? [" =", Qa(i3.name, i3.value, s3("value"), false, e3)] : ""]);
              case "propertystatement": {
                const n3 = [];
                t3.each((() => {
                  n3.push(...Ba(t3, e3, s3));
                }), "properties");
                const r3 = t3.map(s3, "properties"), o3 = i3.properties.some(((t4) => t4.value));
                let h2;
                1 !== r3.length || i3.properties[0].comments ? r3.length > 0 && (h2 = oa(r3[0])) : [h2] = r3;
                const a2 = i3.visibility || null === i3.visibility;
                return na([...n3, a2 ? [null === i3.visibility ? "var" : i3.visibility, ""] : "", i3.isStatic ? [a2 ? " " : "", "static"] : "", h2 ? [" ", h2] : "", oa(r3.slice(1).map(((t4) => [",", o3 ? ca : sa, t4])))]);
              }
              case "if": {
                const n3 = [], r3 = Ha(t3, e3, s3, "body"), o3 = na(["if (", na([oa([_a, s3("test")]), _a]), ")", r3]);
                if (n3.push(o3, zo2(t3) || !i3.body ? "" : ca), i3.alternate) {
                  n3.push(i3.shortForm ? "" : "} ");
                  const r4 = jh(i3.body) && i3.body.comments.some(((t4) => t4.trailing && !Xh(t4))) || (function(t4) {
                    if (!t4.comments) return false;
                    const e4 = $o2(t4.comments.filter(((t5) => !t5.leading && !t5.trailing)));
                    return e4 && !Xh(e4);
                  })(i3), o4 = !r4;
                  n3.push(o4 ? "" : ca), qo2(i3) && n3.push(ma(e3.originalText, Do2(i3.body)) ? ca : "", $h(t3, e3, true), r4 ? ca : " "), n3.push("else", na("if" === i3.alternate.kind ? s3("alternate") : Ha(t3, e3, s3, "alternate")));
                } else n3.push(i3.body ? i3.shortForm ? "endif;" : "}" : "");
                return n3;
              }
              case "do":
                return ["do", Ha(t3, e3, s3, "body"), " while (", na([oa([_a, s3("test")]), _a]), ")"];
              case "while":
              case "switch":
                return na([i3.kind, " (", na([oa([_a, s3("test")]), _a]), ")", Ha(t3, e3, s3, "body")]);
              case "for": {
                const n3 = Ha(t3, e3, s3, "body"), r3 = $h(t3, e3, true), o3 = r3 ? [r3, _a] : "";
                return i3.init.length || i3.test.length || i3.increment.length ? [o3, na(["for (", na([oa([_a, na(ea([",", sa], t3.map(s3, "init"))), ";", sa, na(ea([",", sa], t3.map(s3, "test"))), ";", sa, na(ea([",", sa], t3.map(s3, "increment")))]), _a]), ")", n3])] : [o3, na(["for (;;)", n3])];
              }
              case "foreach": {
                const n3 = Ha(t3, e3, s3, "body"), r3 = $h(t3, e3, true);
                return [r3 ? [r3, _a] : "", na(["foreach (", na([oa([_a, s3("source"), sa, "as ", na(i3.key ? oa(ea([" =>", sa], [s3("key"), s3("value")])) : s3("value"))]), _a]), ")", n3])];
              }
              case "try": {
                const n3 = [];
                return n3.push("try", Ha(t3, e3, s3, "body")), i3.catches && n3.push(t3.map(s3, "catches")), i3.always && n3.push(" finally", Ha(t3, e3, s3, "always")), n3;
              }
              case "catch":
                return [" catch", i3.what ? [" (", ea(" | ", t3.map(s3, "what")), i3.variable ? [" ", s3("variable")] : "", ")"] : "", Ha(t3, e3, s3, "body")];
              case "case":
                return [i3.test ? ["case ", i3.test.comments ? oa(s3("test")) : s3("test"), ":"] : "default:", i3.body && i3.body.children && i3.body.children.length ? oa([zo2(t3) ? "" : ca, s3("body")]) : ""];
              case "break":
              case "continue":
                return i3.level && ("number" === i3.level.kind && "1" !== i3.level.value) ? [`${i3.kind} `, s3("level")] : i3.kind;
              case "call":
                return 1 === i3.arguments.length && Wa(i3.arguments[0], e3.originalText) ? [s3("what"), "(", ea(", ", t3.map(s3, "arguments")), ")"] : Jo2(i3.what) ? (function(t4, e4, s4) {
                  const i4 = [];
                  function n3(t5) {
                    const { originalText: s5 } = e4, i5 = Ea(s5, Do2(t5));
                    return ")" === s5.charAt(i5) ? ka(s5, i5 + 1, e4) : ma(s5, Do2(t5));
                  }
                  function r3(t5) {
                    const { node: o4 } = t5;
                    if ("call" !== o4.kind || !Jo2(o4.what) && "call" !== o4.what.kind) if (Jo2(o4)) {
                      let n4 = null;
                      n4 = "propertylookup" === o4.kind ? ga(t5, e4, s4) : "nullsafepropertylookup" === o4.kind ? La(t5, e4, s4) : "staticlookup" === o4.kind ? ba(t5, e4, s4) : Ia(t5, e4, s4), i4.unshift({ node: o4, needsParens: Zh(t5, e4), printed: Jh(t5, (() => n4), e4) }), t5.call(((t6) => r3(t6)), "what");
                    } else i4.unshift({ node: o4, printed: s4() });
                    else i4.unshift({ node: o4, printed: [Jh(t5, (() => Sa(t5, e4, s4)), e4), n3(o4) ? ca : ""] }), t5.call(((t6) => r3(t6)), "what");
                  }
                  const { node: o3 } = t4;
                  i4.unshift({ node: o3, printed: Sa(t4, e4, s4) }), t4.call(((t5) => r3(t5)), "what");
                  for (let t5 = 0; t5 < i4.length; ++t5) "call" === i4[t5].node.kind && i4[t5 - 1] && ["propertylookup", "nullsafepropertylookup", "staticlookup"].includes(i4[t5 - 1].node.kind) && i4[t5 - 1].needsParens && (i4[0].printed = ["(", i4[0].printed], i4[t5 - 1].printed = [i4[t5 - 1].printed, ")"]);
                  const h2 = [];
                  let a2 = [i4[0]], c2 = 1;
                  for (; c2 < i4.length && ("call" === i4[c2].node.kind || Jo2(i4[c2].node) && i4[c2].node.offset && "number" === i4[c2].node.offset.kind); ++c2) a2.push(i4[c2]);
                  if ("call" !== i4[0].node.kind) for (; c2 + 1 < i4.length && (Jo2(i4[c2].node) && Jo2(i4[c2 + 1].node)); ++c2) a2.push(i4[c2]);
                  h2.push(a2), a2 = [];
                  let l2 = false;
                  for (; c2 < i4.length; ++c2) {
                    if (l2 && Jo2(i4[c2].node)) {
                      if ("offsetlookup" === i4[c2].node.kind && i4[c2].node.offset && "number" === i4[c2].node.offset.kind) {
                        a2.push(i4[c2]);
                        continue;
                      }
                      h2.push(a2), a2 = [], l2 = false;
                    }
                    "call" === i4[c2].node.kind && (l2 = true), a2.push(i4[c2]), i4[c2].node.comments && jh(i4[c2].node) && (h2.push(a2), a2 = [], l2 = false);
                  }
                  a2.length > 0 && h2.push(a2);
                  function _2(t5) {
                    const s5 = t5[1].length && "offsetlookup" === t5[1][0].node.kind;
                    if (1 === t5[0].length) {
                      const e5 = t5[0][0].node;
                      return "variable" === e5.kind && ("this" === e5.name || u2 && i5(e5.name)) || sh(e5);
                    }
                    function i5(t6) {
                      return t6.length < e4.tabWidth;
                    }
                    const n4 = $o2(t5[0]).node;
                    return Jo2(n4) && ("identifier" === n4.offset.kind || "variable" === n4.offset.kind) && s5;
                  }
                  const u2 = "expressionstatement" === t4.parent.kind, p2 = h2.length >= 2 && !h2[1][0].node.comments && _2(h2);
                  function d2(t5) {
                    const e5 = [];
                    for (let s5 = 0; s5 < t5.length; s5++) t5[s5 + 1] && t5[s5 + 1].needsParens ? (e5.push("(", t5[s5].printed, t5[s5 + 1].printed, ")"), s5++) : e5.push(t5[s5].printed);
                    return e5;
                  }
                  function f2(t5) {
                    return 0 === t5.length ? "" : oa(na([ca, ea(ca, t5.map(d2))]));
                  }
                  const k3 = h2.map(d2), T3 = k3, x3 = p2 ? 3 : 2, E2 = h2.slice(0, x3).flat(), m2 = E2.slice(1, -1).some(((t5) => zh(t5.node))) || E2.slice(0, -1).some(((t5) => jh(t5.node))) || h2[x3] && zh(h2[x3][0].node), y3 = hh(t4, "encapsed");
                  if (h2.length <= x3 && !m2 || y3) return na(T3);
                  const A2 = $o2(p2 ? h2.slice(1, 2)[0] : h2[0]).node, N3 = "call" !== A2.kind && n3(A2), g3 = [d2(h2[0]), p2 ? h2.slice(1, 2).map(d2) : "", N3 ? ca : "", f2(h2.slice(p2 ? 2 : 1))], L3 = i4.filter(((t5) => "call" === t5.node.kind));
                  if (m2 || L3.length > 2 && L3.some(((t5) => !t5.node.arguments.every(((t6) => kh(t6))))) || k3.slice(0, -1).some(fa)) return na(g3);
                  return [fa(T3) || N3 ? ta : "", ra([T3, g3])];
                })(t3, e3, s3) : [s3("what"), Sa(t3, e3, s3)];
              case "new": {
                const n3 = i3.what && "class" === i3.what.kind && i3.what.isAnonymous;
                if (!n3 && 1 === i3.arguments.length && Wa(i3.arguments[0], e3.originalText)) return ["new ", ...t3.call(Ba, "what"), s3("what"), "(", ea(", ", t3.map(s3, "arguments")), ")"];
                const r3 = [];
                if (r3.push("new "), n3) r3.push(i3.what.leadingComments && "commentblock" === i3.what.leadingComments[0].kind ? [Kh(i3.what.leadingComments, e3), " "] : "", ...t3.call((() => Ba(t3, e3, s3, { inline: true })), "what"), i3.what.isReadonly ? "readonly class" : "class", i3.arguments.length > 0 ? [" ", Sa(t3, e3, s3)] : "", na(s3("what")));
                else {
                  const n4 = ["call", "offsetlookup"].includes(i3.what.kind), o3 = [n4 ? "(" : "", s3("what"), n4 ? ")" : "", Sa(t3, e3, s3)];
                  r3.push(zh(i3.what) ? oa(o3) : o3);
                }
                return r3;
              }
              case "clone":
                return ["clone ", i3.what.comments ? oa(s3("what")) : s3("what")];
              case "propertylookup":
              case "nullsafepropertylookup":
              case "staticlookup":
              case "offsetlookup": {
                const { parent: n3 } = t3;
                let r3, o3 = 0;
                do {
                  r3 = t3.getParentNode(o3), o3++;
                } while (r3 && Jo2(r3));
                const h2 = hh(t3, "encapsed") || r3 && ("new" === r3.kind || "assign" === r3.kind && "variable" !== r3.left.kind) || "offsetlookup" === i3.kind || (sh(i3.what) || "variable" === i3.what.kind) && ["identifier", "variable", "encapsedpart"].includes(i3.offset.kind) && n3 && !Jo2(n3);
                return [s3("what"), h2 ? wa(t3, e3, s3) : na(oa([_a, wa(t3, e3, s3)]))];
              }
              case "exit":
                return na([i3.useDie ? "die" : "exit", "(", i3.expression ? Wa(i3.expression, e3.originalText) ? s3("expression") : [oa([_a, s3("expression")]), _a] : $h(t3, e3), ")"]);
              case "global":
                return na(["global ", oa(ea([",", sa], t3.map(s3, "items")))]);
              case "include":
                return [i3.require ? "require" : "include", i3.once ? "_once" : "", " ", i3.target.comments ? oa(s3("target")) : s3("target")];
              case "label":
                return [s3("name"), ":"];
              case "goto":
                return ["goto ", s3("label")];
              case "throw":
                return ["throw ", i3.what.comments ? oa(s3("what")) : s3("what")];
              case "silent":
                return ["@", s3("expr")];
              case "halt":
                return [qo2(i3) ? [$h(t3, e3, true), ca] : "", "__halt_compiler();", i3.after];
              case "eval":
                return na(["eval(", Wa(i3.source, e3.originalText) ? s3("source") : [oa([_a, s3("source")]), _a], ")"]);
              case "echo": {
                const e4 = t3.map(s3, "expressions");
                let n3;
                return 1 !== e4.length || i3.expressions[0].comments ? e4.length > 0 && (n3 = jo2(i3.expressions[0]) || i3.expressions[0].comments ? oa(e4[0]) : ha(e4[0])) : [n3] = e4, na([i3.shortForm ? "" : "echo ", n3 || "", oa(e4.slice(1).map(((t4) => [",", sa, t4])))]);
              }
              case "print":
                return ["print ", i3.expression.comments ? oa(s3("expression")) : s3("expression")];
              case "return": {
                const n3 = [];
                if (n3.push("return"), i3.expr) {
                  const t4 = s3("expr");
                  n3.push(" ", i3.expr.comments ? oa(t4) : t4);
                }
                return qo2(i3) && n3.push(" ", $h(t3, e3, true)), n3;
              }
              case "isset":
              case "unset":
                return na([i3.kind, Sa(t3, e3, s3, "variables")]);
              case "empty":
                return na(["empty(", oa([_a, s3("expression")]), _a, ")"]);
              case "variable": {
                const { parent: e4, grandparent: n3 } = t3, r3 = "assign" === e4.kind ? "" : i3.byref ? "&" : "", o3 = "encapsedpart" === e4.kind && "simple" === e4.syntax && e4.curly || n3 && "offsetlookup" === e4.kind && "encapsedpart" === n3.kind && "simple" === n3.syntax && n3.curly ? "" : "$", h2 = i3.curly ? "{" : "", a2 = i3.curly ? "}" : "";
                return [r3, o3, h2, s3("name"), a2];
              }
              case "constantstatement":
              case "classconstant": {
                const n3 = Ba(t3, e3, s3), r3 = t3.map(s3, "constants");
                let o3;
                return 1 !== r3.length || i3.constants[0].comments ? r3.length > 0 && (o3 = oa(r3[0])) : [o3] = r3, na([...n3, i3.final ? "final " : "", i3.visibility ? [i3.visibility, " "] : "", "const", i3.type ? [i3.nullable ? " ?" : " ", s3("type")] : "", o3 ? [" ", o3] : "", oa(r3.slice(1).map(((t4) => [",", ca, t4])))]);
              }
              case "constant":
                return Ga(i3.name, s3("name"), " =", i3.value, s3("value"), false, e3);
              case "static": {
                const e4 = t3.map(s3, "variables"), n3 = i3.variables.some(((t4) => t4.defaultValue));
                let r3;
                return 1 !== e4.length || i3.variables[0].comments ? e4.length > 0 && (r3 = oa(e4[0])) : [r3] = e4, na(["static", r3 ? [" ", r3] : "", oa(e4.slice(1).map(((t4) => [",", n3 ? ca : sa, t4])))]);
              }
              case "staticvariable":
                return Ga(i3.variable, s3("variable"), " =", i3.defaultValue, s3("defaultValue"), false, e3);
              case "list":
              case "array": {
                const n3 = "array" === i3.kind && e3.phpVersion >= 5.4 || "list" === i3.kind && (i3.shortForm || e3.phpVersion >= 7.1), r3 = n3 ? "[" : [i3.kind, "("], o3 = n3 ? "]" : ")";
                if (0 === i3.items.length) return qo2(i3) ? na([r3, $h(t3, e3), _a, o3]) : [r3, o3];
                const h2 = $o2(i3.items), a2 = h2 && "noop" === h2.kind, [c2] = i3.items.filter(((t4) => "noop" !== t4.kind)).sort(((t4, e4) => wo2(t4) - wo2(e4))), l2 = !(!c2 || !c2.key) && c2 && xa(e3.originalText, wo2(i3), wo2(c2));
                return na([r3, oa([_a, Ua(t3, e3, s3)]), a2 ? "," : "", aa(!a2 && Aa(e3, 5) ? [h2 && oh(h2) ? ca : "", ","] : ""), $h(t3, e3, true), _a, o3], { shouldBreak: l2 });
              }
              case "entry": {
                const t4 = i3.byRef ? "&" : "", n3 = i3.unpack ? "..." : "";
                return i3.key ? Ga(i3.key, s3("key"), " =>", i3.value, s3("value"), t4, e3) : [t4, n3, s3("value")];
              }
              case "yield": {
                const t4 = [i3.key ? [s3("key"), " => "] : "", s3("value")];
                return ["yield", i3.key || i3.value ? " " : "", i3.value && i3.value.comments ? oa(t4) : t4];
              }
              case "yieldfrom":
                return ["yield from ", i3.value.comments ? oa(s3("value")) : s3("value")];
              case "unary":
                return [i3.type, s3("what")];
              case "pre":
                return [i3.type + i3.type, s3("what")];
              case "post":
                return [s3("what"), i3.type + i3.type];
              case "cast":
                return ["(", i3.type, ") ", i3.expr.comments ? oa(s3("expr")) : s3("expr")];
              case "assignref":
              case "assign": {
                const t4 = "assignref" === i3.kind;
                return Ga(i3.left, s3("left"), [" ", t4 ? "=" : i3.operator], i3.right, s3("right"), t4, e3);
              }
              case "bin": {
                if ("|>" === i3.type) {
                  const { parent: e4, grandparent: i4 } = t3, n4 = "expressionstatement" === e4.kind || "assign" === e4.kind && i4 && "expressionstatement" === i4.kind;
                  return (function(t4, e5) {
                    let s4 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    const i5 = [];
                    function n5() {
                      const { node: s5 } = t4;
                      "bin" === s5.kind && "|>" === s5.type ? (i5.push(t4.call(e5, "left")), t4.call(n5, "right")) : i5.push(e5());
                    }
                    n5();
                    const [r4, ...o4] = i5, h3 = s4 ? aa([la, ";"], ";") : "";
                    return na([r4, oa(o4.flatMap(((t5) => [sa, "|> ", t5]))), h3]);
                  })(t3, s3, n4);
                }
                const { parent: n3, grandparent: r3 } = t3, o3 = i3 !== n3.body && ("if" === n3.kind || "while" === n3.kind || "switch" === n3.kind || "do" === n3.kind), h2 = va(t3, s3, e3, false, o3);
                if (o3) return h2;
                if ("unary" === n3.kind || Jo2(n3) && "offsetlookup" !== n3.kind) return na([oa([_a, ...h2]), _a]);
                const a2 = i3 !== n3.body && "for" === n3.kind || "retif" === n3.kind && r3 && "return" !== r3.kind, c2 = ["assign", "property", "constant", "staticvariable", "entry"].includes(n3.kind), l2 = "bin" === i3.left.kind && Yo2(i3.type, i3.left.type);
                if (a2 || Ra(i3) && !l2 || !Ra(i3) && c2) return na(h2);
                const _2 = h2.slice(1);
                return na([h2.length > 0 ? h2[0] : "", oa(_2)]);
              }
              case "retif": {
                const e4 = [], { parent: n3 } = t3;
                let r3, o3 = 0;
                do {
                  r3 = t3.getParentNode(o3), o3++;
                } while (r3 && "retif" === r3.kind);
                const h2 = r3 || n3, a2 = "bin" === i3.falseExpr.kind ? oa(s3("falseExpr")) : s3("falseExpr"), c2 = [i3.trueExpr ? sa : " ", "?", i3.trueExpr ? [" ", "bin" === i3.trueExpr.kind ? oa(s3("trueExpr")) : s3("trueExpr"), sa] : "", ":", i3.trueExpr ? [" ", a2] : [Oa(i3.falseExpr) ? " " : sa, a2]];
                e4.push(c2);
                const l2 = (t4) => n3 === h2 ? na(t4) : t4, _2 = t3.grandparent, u2 = "cast" === n3.kind && _2 ? _2 : n3, p2 = ["propertylookup", "nullsafepropertylookup", "staticlookup"].includes(u2.kind), d2 = s3("test");
                if (!i3.trueExpr) {
                  const t4 = [d2, "bin" === u2.kind || ["print", "echo", "return", "include"].includes(h2.kind) ? oa(e4) : e4];
                  return "call" === u2.kind && u2.what === i3 || "unary" === u2.kind || Jo2(u2) && "offsetlookup" !== u2.kind ? na([oa([_a, t4]), _a]) : l2(t4);
                }
                return l2(["retif" === i3.test.kind ? oa(d2) : d2, oa(e4), p2 ? _a : ""]);
              }
              case "boolean":
                return i3.value ? "true" : "false";
              case "number":
                return Mo2(i3.value);
              case "string": {
                const { parent: s4 } = t3;
                if ("encapsedpart" === s4.kind) {
                  const s5 = t3.grandparent;
                  let n4 = 0;
                  const r4 = e3.phpVersion >= 7.3;
                  let o3 = ua;
                  if ("heredoc" === s5.type) {
                    o3 = r4 ? ca : ua;
                    const t4 = s5.raw.split("\n");
                    n4 = t4[t4.length - 1].search(/\S/), -1 === n4 && (n4 = t4[t4.length - 2].search(/\S/));
                  }
                  return ea(o3, i3.raw.split("\n").map(((t4, e4) => e4 > 0 || 0 === i3.loc.start.column ? t4.substring(n4) : t4)));
                }
                const n3 = (function(t4, e4) {
                  if (t4.isDoubleQuote === e4.singleQuote) {
                    const e5 = t4.raw.slice("b" === t4.raw[0] ? 2 : 1, -1).match(/\\([$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})|\r?\n|'|"|\$/);
                    return t4.isDoubleQuote ? e5 : !e5;
                  }
                  return t4.isDoubleQuote;
                })(i3, e3) ? '"' : "'";
                let r3 = i3.raw;
                return "b" === i3.raw[0] && (r3 = r3.slice(1)), ['"', "'"].includes(r3[0]) && (r3 = r3.substr(1)), ['"', "'"].includes(r3[r3.length - 1]) && (r3 = r3.substr(0, r3.length - 1)), ["b" === i3.raw[0] ? "b" : "", n3, ea(ua, r3.split("\n")), n3];
              }
              case "intersectiontype":
                return $a(t3, s3, "&");
              case "uniontype":
                return $a(t3, s3, "|");
              case "encapsedpart": {
                const t4 = "simple" === i3.syntax && i3.curly || "complex" === i3.syntax ? [i3.curly ? "$" : "", "{"] : "", e4 = "simple" === i3.syntax && i3.curly || "complex" === i3.syntax ? "}" : "";
                return [t4, s3("expression"), e4];
              }
              case "encapsed":
                switch (i3.type) {
                  case "string":
                  case "shell":
                  case "heredoc": {
                    const n3 = e3.phpVersion >= 7.3 ? ca : ua;
                    return [Da(i3), "heredoc" === i3.type ? n3 : "", ...t3.map(s3, "value"), Da(i3, { opening: false }), "heredoc" === i3.type && Ko2(t3) ? ca : ""];
                  }
                  default:
                    throw new Error(`Have not implemented kind ${i3.type} yet.`);
                }
              case "inline":
                return ea(ua, i3.raw.replace("___PSEUDO_INLINE_PLACEHOLDER___", "").split("\n"));
              case "magic":
                return i3.value;
              case "nowdoc": {
                const s4 = e3.phpVersion >= 7.3 ? ca : ua;
                return ["<<<'", i3.label, "'", s4, ea(s4, i3.value.split("\n")), s4, i3.label, Ko2(t3) ? ca : ""];
              }
              case "name":
                return ["rn" === i3.resolution ? "namespace\\" : "", i3.name];
              case "literal":
                return s3("value");
              case "parentreference":
                return "parent";
              case "selfreference":
                return "self";
              case "staticreference":
                return "static";
              case "typereference":
                return i3.name;
              case "nullkeyword":
                return "null";
              case "identifier": {
                const { parent: e4 } = t3;
                return "method" === e4.kind && (i3.name = ch(i3.name)), s3("name");
              }
              case "match": {
                const i4 = t3.map((() => {
                  const i5 = t3.node, n3 = zh(i5) ? [Kh(i5.leadingComments, e3), ca] : [], r3 = !t3.isLast || e3.trailingCommaPHP ? "," : "", o3 = jh(i5) ? [" ", Kh(i5.comments.filter(((t4) => t4.trailing)), e3)] : [], h2 = null === i5.conds ? "default" : t3.map(((t4) => {
                    let { isFirst: e4 } = t4;
                    return [",", sa, s3()].slice(e4 ? 2 : 0);
                  }), "conds"), a2 = s3("body"), c2 = !t3.isFirst && ya(e3.originalText, wo2(i5)) ? ca : "";
                  return ["", ca, c2, ...n3, na([na([h2, oa(sa)]), "=> ", a2, r3, ...o3])].slice(t3.isFirst ? 1 : 0);
                }), "arms");
                return na(["match (", na([oa([_a, s3("cond")]), _a]), ") {", na(oa([...i4])), " ", _a, "}"]);
              }
              case "noop":
                return i3.comments ? Kh(i3.comments, e3) : "";
              case "namedargument":
                return [i3.name, ": ", s3("value")];
              case "enumcase":
                return na(["case ", s3("name"), i3.value ? [" =", Qa(i3.name, i3.value, s3("value"), false, e3)] : ""]);
              case "variadicplaceholder":
                return "...";
              default:
                throw new Error(`Have not implemented kind '${i3.kind}' yet.`);
            }
          })(t2, e2, s2), r2 = [], o2 = Zh(t2, e2);
          return o2 && r2.unshift("("), r2.push(n2), o2 && r2.push(")"), (function(t3) {
            const { node: e3, parent: s3 } = t3;
            if (!s3) return false;
            if (["for", "foreach", "while", "do", "if", "switch"].includes(s3.kind) && "block" !== e3.kind && "if" !== e3.kind && (s3.body === e3 || s3.alternate === e3)) return true;
            if (!(function(t4) {
              return ["block", "program", "namespace", "class", "enum", "interface", "trait", "traituse", "declare"].includes(t4.kind);
            })(s3)) return false;
            if ("echo" === e3.kind && e3.shortForm) return false;
            if ("traituse" === e3.kind) return !e3.adaptations;
            if ("method" === e3.kind && e3.isAbstract) return true;
            if ("method" === e3.kind) {
              const { parent: e4 } = t3;
              if (e4 && "interface" === e4.kind) return true;
            }
            if ("expressionstatement" === e3.kind) {
              const t4 = e3.expression;
              if ("bin" === t4.kind && "|>" === t4.type || "assign" === t4.kind && "bin" === t4.right.kind && "|>" === t4.right.type) return false;
            }
            return ["expressionstatement", "do", "usegroup", "classconstant", "propertystatement", "traitprecedence", "traitalias", "goto", "constantstatement", "enumcase", "global", "static", "echo", "unset", "return", "break", "continue", "throw"].includes(e3.kind);
          })(t2) && r2.push(";"), (function(t3) {
            const { node: e3 } = t3, s3 = "program" === e3.kind, i3 = e3.children && $o2(e3.children);
            if (!s3) return false;
            if (i3 && ["halt", "inline"].includes(i3.kind)) return false;
            if (i3 && ("declare" === i3.kind || "namespace" === i3.kind)) {
              const t4 = i3.children.length > 0 && $o2(i3.children);
              if (t4 && ["halt", "inline"].includes(t4.kind)) return false;
            }
            return true;
          })(t2) && r2.push(ca), r2;
        }, getVisitorKeys: function(t2, e2) {
          return Object.keys(t2).filter(((t3) => !e2.has(t3) && !sc.has(t3)));
        }, insertPragma: function(t2) {
          const e2 = Xa(t2);
          if (e2) {
            const { start: { offset: s3 }, end: { offset: i2 } } = e2.loc, n2 = t2.substring(0, s3), r2 = t2.substring(i2);
            return `${n2}${(function(t3) {
              let e3 = t3.split("\n");
              if (1 === e3.length) {
                const [, t4] = /\/*\*\*(.*)\*\//.exec(e3[0]);
                e3 = ["/**", ` * ${t4.trim()}`, " */"];
              }
              const s4 = e3.findIndex(((t4) => /@\S/.test(t4))) || 1;
              return e3.splice(s4, 0, " * @format"), e3.join("\n");
            })(e2.value)}${r2}`;
          }
          const s2 = "<?php";
          return t2.startsWith(s2) ? `${t2.substring(0, 5)}
/** 
 * @format 
 */
${t2.substring(5)}` : t2;
        }, massageAstNode: ja, getCommentChildNodes: function(t2) {
          if ("new" === t2.kind && "class" === t2.what.kind) return t2.what.__parent_new_arguments = [...t2.arguments], [t2.what];
        }, canAttachComment: function(t2) {
          return t2.kind && "commentblock" !== t2.kind && "commentline" !== t2.kind;
        }, isBlockComment: Xh, handleComments: { ownLine: function(t2, e2, s2) {
          const { precedingNode: i2, enclosingNode: n2, followingNode: r2 } = t2;
          return Dh(e2, i2, n2, r2, t2) || (function(t3, e3, s3) {
            if (t3 && Jo2(t3) && e3 && ["identifier", "variable", "encapsed"].includes(e3.kind)) return Th(t3, s3), true;
            return false;
          })(n2, r2, t2) || Uh(e2, i2, n2, r2, t2) || Yh(e2, i2, n2, r2, t2) || Gh(n2, r2, t2) || Ph(n2, r2, t2) || Mh(e2, i2, n2, r2, t2) || Fh(e2, n2, r2, t2) || (function(t3, e3, s3, i3) {
            if (!s3 && t3 && ("for" === t3.kind || "foreach" === t3.kind)) return t3.body && "block" !== t3.body.kind ? Th(s3, i3) : Th(t3, i3), true;
            return false;
          })(n2, 0, r2, t2) || Hh(n2, i2, r2, t2) || Qh(n2, i2, r2, t2);
        }, endOfLine: function(t2, e2, s2) {
          const { precedingNode: i2, enclosingNode: n2, followingNode: r2 } = t2;
          return (function(t3, e3, s3, i3, n3) {
            if (!e3 && !i3 && s3 && "array" === s3.kind) return Eh(s3, n3), true;
            return false;
          })(0, i2, n2, r2, t2) || (function(t3, e3, s3, i3, n3) {
            if (s3 && "return" === s3.kind && !s3.expr) return Eh(s3, n3), true;
            return false;
          })(0, 0, n2, 0, t2) || Dh(e2, i2, n2, r2, t2) || (function(t3, e3, s3, i3, n3) {
            const r3 = e3 && !Ah(n3, Do2(e3), wo2(i3));
            if ((!e3 || !r3) && t3 && "retif" === t3.kind && s3) return Th(s3, i3), true;
            return false;
          })(n2, i2, r2, t2, e2) || Uh(e2, i2, n2, r2, t2) || Yh(e2, i2, n2, r2, t2) || Gh(n2, r2, t2) || Ph(n2, r2, t2) || Mh(e2, i2, n2, r2, t2) || Fh(e2, n2, r2, t2) || (function(t3, e3) {
            if (t3 && "entry" === t3.kind) return Th(t3, e3), true;
            return false;
          })(n2, t2) || (function(t3, e3, s3) {
            if (e3 && "call" === e3.kind && t3 && e3.what === t3 && e3.arguments.length > 0) return Th(e3.arguments[0], s3), true;
            return false;
          })(i2, n2, t2) || (function(t3, e3, s3) {
            if (t3 && "assign" === t3.kind && e3) {
              const i3 = t3.loc.start.offset + t3.loc.source.indexOf("=");
              if (s3.loc.start.offset > i3) return Th(e3, s3), true;
            }
            return false;
          })(n2, r2, t2) || Hh(n2, i2, r2, t2) || Vh(n2, i2, r2, t2) || Qh(n2, i2, r2, t2) || Bh(n2, t2);
        }, remaining: function(t2, e2, s2) {
          const { precedingNode: i2, enclosingNode: n2, followingNode: r2 } = t2;
          return Uh(e2, i2, n2, r2, t2) || Yh(e2, i2, n2, r2, t2) || (function(t3, e3, s3) {
            const i3 = Nh(t3, Do2(s3));
            if (")" !== t3.charAt(i3)) return false;
            if (e3 && ("function" === e3.kind || "closure" === e3.kind || "method" === e3.kind || "call" === e3.kind || "new" === e3.kind) && 0 === e3.arguments.length) return xh(e3, s3), true;
            return false;
          })(e2, n2, t2) || Ph(n2, r2, t2) || (function(t3, e3, s3) {
            if (t3 && "traituse" === t3.kind && t3.adaptations && !t3.adaptations.length) return xh(t3, s3), true;
            return false;
          })(n2, 0, t2) || Mh(e2, i2, n2, r2, t2) || Fh(e2, n2, r2, t2) || Bh(n2, t2) || (function(t3, e3, s3, i3) {
            if (e3 && "halt" === e3.kind) return xh(e3, i3), true;
            if (t3 && "halt" === t3.kind) return xh(t3, i3), true;
            return false;
          })(i2, n2, 0, t2) || (function(t3, e3) {
            if (t3 && ("continue" === t3.kind || "break" === t3.kind) && !t3.label) return Eh(t3, e3), true;
            return false;
          })(n2, t2) || Hh(n2, i2, r2, t2) || Vh(n2, i2, r2, t2);
        } }, willPrintOwnComments(t2) {
          const { node: e2 } = t2;
          return e2 && "noop" === e2.kind;
        }, printComment(t2) {
          const e2 = t2.node;
          switch (e2.kind) {
            case "commentblock": {
              if (!e2.value.includes("\n")) return e2.value;
              const t3 = e2.value.split("\n");
              return t3.slice(1, t3.length - 1).every(((t4) => "*" === t4.trim()[0])) ? qa(Ja, t3.map(((e3, s2) => (s2 > 0 ? " " : "") + (s2 < t3.length - 1 ? e3.trim() : e3.trimLeft())))) : e2.value;
            }
            case "commentline":
              return e2.value.trimRight();
            default:
              throw new Error(`Not a comment: ${JSON.stringify(e2)}`);
          }
        }, hasPrettierIgnore(t2) {
          const e2 = (t3) => t3.value.includes("prettier-ignore") && !t3.value.includes("prettier-ignore-start") && !t3.value.includes("prettier-ignore-end"), { node: s2, parent: i2 } = t2;
          return s2 && "classconstant" !== s2.kind && s2.comments && s2.comments.length > 0 && s2.comments.some(e2) || s2 && "constant" === s2.kind && i2 && "classconstant" === i2.kind && i2.comments && i2.comments.length > 0 && i2.comments.some(e2);
        } } };
        t.defaultOptions = { tabWidth: 4 }, t.languages = tc, t.options = Oo2, t.parsers = ec, t.printers = ic;
      }));
    }
  });

  // node_modules/prettier/standalone.mjs
  var Ru = Object.defineProperty;
  var yt = (t, e) => {
    for (var r in e) Ru(t, r, { get: e[r], enumerable: true });
  };
  var Su = {};
  yt(Su, { __debug: () => $i, check: () => Vi, doc: () => ar, format: () => Pu, formatWithCursor: () => Ou, getSupportInfo: () => Wi, util: () => fr, version: () => gu });
  var X = (t, e) => (r, n, ...u) => r | 1 && n == null ? void 0 : (e.call(n) ?? n[t]).apply(n, u);
  var vu = String.prototype.replaceAll ?? function(t, e) {
    return t.global ? this.replace(t, e) : this.split(t).join(e);
  };
  var Lu = X("replaceAll", function() {
    if (typeof this == "string") return vu;
  });
  var ne = Lu;
  var Ne = class {
    diff(e, r, n = {}) {
      let u;
      typeof n == "function" ? (u = n, n = {}) : "callback" in n && (u = n.callback);
      let o = this.castInput(e, n), i = this.castInput(r, n), D = this.removeEmpty(this.tokenize(o, n)), s = this.removeEmpty(this.tokenize(i, n));
      return this.diffWithOptionsObj(D, s, n, u);
    }
    diffWithOptionsObj(e, r, n, u) {
      var o;
      let i = (C) => {
        if (C = this.postProcess(C, n), u) {
          setTimeout(function() {
            u(C);
          }, 0);
          return;
        } else return C;
      }, D = r.length, s = e.length, a = 1, c = D + s;
      n.maxEditLength != null && (c = Math.min(c, n.maxEditLength));
      let p = (o = n.timeout) !== null && o !== void 0 ? o : 1 / 0, l = Date.now() + p, m = [{ oldPos: -1, lastComponent: void 0 }], f = this.extractCommon(m[0], r, e, 0, n);
      if (m[0].oldPos + 1 >= s && f + 1 >= D) return i(this.buildValues(m[0].lastComponent, r, e));
      let F = -1 / 0, d = 1 / 0, E = () => {
        for (let C = Math.max(F, -a); C <= Math.min(d, a); C += 2) {
          let h, _ = m[C - 1], P = m[C + 1];
          _ && (m[C - 1] = void 0);
          let A = false;
          if (P) {
            let J = P.oldPos - C;
            A = P && 0 <= J && J < D;
          }
          let B = _ && _.oldPos + 1 < s;
          if (!A && !B) {
            m[C] = void 0;
            continue;
          }
          if (!B || A && _.oldPos < P.oldPos ? h = this.addToPath(P, true, false, 0, n) : h = this.addToPath(_, false, true, 1, n), f = this.extractCommon(h, r, e, C, n), h.oldPos + 1 >= s && f + 1 >= D) return i(this.buildValues(h.lastComponent, r, e)) || true;
          m[C] = h, h.oldPos + 1 >= s && (d = Math.min(d, C - 1)), f + 1 >= D && (F = Math.max(F, C + 1));
        }
        a++;
      };
      if (u) (function C() {
        setTimeout(function() {
          if (a > c || Date.now() > l) return u(void 0);
          E() || C();
        }, 0);
      })();
      else for (; a <= c && Date.now() <= l; ) {
        let C = E();
        if (C) return C;
      }
    }
    addToPath(e, r, n, u, o) {
      let i = e.lastComponent;
      return i && !o.oneChangePerToken && i.added === r && i.removed === n ? { oldPos: e.oldPos + u, lastComponent: { count: i.count + 1, added: r, removed: n, previousComponent: i.previousComponent } } : { oldPos: e.oldPos + u, lastComponent: { count: 1, added: r, removed: n, previousComponent: i } };
    }
    extractCommon(e, r, n, u, o) {
      let i = r.length, D = n.length, s = e.oldPos, a = s - u, c = 0;
      for (; a + 1 < i && s + 1 < D && this.equals(n[s + 1], r[a + 1], o); ) a++, s++, c++, o.oneChangePerToken && (e.lastComponent = { count: 1, previousComponent: e.lastComponent, added: false, removed: false });
      return c && !o.oneChangePerToken && (e.lastComponent = { count: c, previousComponent: e.lastComponent, added: false, removed: false }), e.oldPos = s, a;
    }
    equals(e, r, n) {
      return n.comparator ? n.comparator(e, r) : e === r || !!n.ignoreCase && e.toLowerCase() === r.toLowerCase();
    }
    removeEmpty(e) {
      let r = [];
      for (let n = 0; n < e.length; n++) e[n] && r.push(e[n]);
      return r;
    }
    castInput(e, r) {
      return e;
    }
    tokenize(e, r) {
      return Array.from(e);
    }
    join(e) {
      return e.join("");
    }
    postProcess(e, r) {
      return e;
    }
    get useLongestToken() {
      return false;
    }
    buildValues(e, r, n) {
      let u = [], o;
      for (; e; ) u.push(e), o = e.previousComponent, delete e.previousComponent, e = o;
      u.reverse();
      let i = u.length, D = 0, s = 0, a = 0;
      for (; D < i; D++) {
        let c = u[D];
        if (c.removed) c.value = this.join(n.slice(a, a + c.count)), a += c.count;
        else {
          if (!c.added && this.useLongestToken) {
            let p = r.slice(s, s + c.count);
            p = p.map(function(l, m) {
              let f = n[a + m];
              return f.length > l.length ? f : l;
            }), c.value = this.join(p);
          } else c.value = this.join(r.slice(s, s + c.count));
          s += c.count, c.added || (a += c.count);
        }
      }
      return u;
    }
  };
  var At = class extends Ne {
    tokenize(e) {
      return e.slice();
    }
    join(e) {
      return e;
    }
    removeEmpty(e) {
      return e;
    }
  };
  var pr = new At();
  function xt(t, e, r) {
    return pr.diff(t, e, r);
  }
  var Mu = () => {
  };
  var k = Mu;
  var dr = "cr";
  var Fr = "crlf";
  var Yu = "lf";
  var ju = Yu;
  var Bt = "\r";
  var Er = `\r
`;
  var ze = `
`;
  var Uu = ze;
  function Cr(t) {
    let e = t.indexOf(Bt);
    return e !== -1 ? t.charAt(e + 1) === ze ? Fr : dr : ju;
  }
  function we(t) {
    return t === dr ? Bt : t === Fr ? Er : Uu;
  }
  var Vu = /* @__PURE__ */ new Map([[ze, /\n/g], [Bt, /\r/g], [Er, /\r\n/g]]);
  function Tt(t, e) {
    let r = Vu.get(e);
    return t.match(r)?.length ?? 0;
  }
  var Wu = /\r\n?/g;
  function hr(t) {
    return ne(0, t, Wu, ze);
  }
  var ue = /* @__PURE__ */ Symbol.for("comments");
  function $u(t) {
    return this[t < 0 ? this.length + t : t];
  }
  var zu = X("at", function() {
    if (Array.isArray(this) || typeof this == "string") return $u;
  });
  var y = zu;
  var G = "string";
  var U = "array";
  var V = "cursor";
  var I = "indent";
  var R = "align";
  var v = "trim";
  var x = "group";
  var S = "fill";
  var T = "if-break";
  var L = "indent-if-break";
  var M = "line-suffix";
  var Y = "line-suffix-boundary";
  var g = "line";
  var b = "label";
  var N = "break-parent";
  var Ge = /* @__PURE__ */ new Set([V, I, R, v, x, S, T, L, M, Y, g, b, N]);
  function gr(t) {
    let e = t.length;
    for (; e > 0 && (t[e - 1] === "\r" || t[e - 1] === `
`); ) e--;
    return e < t.length ? t.slice(0, e) : t;
  }
  function Fe(t, e, r) {
    if (!t.has(e)) {
      let n = r(e);
      t.set(e, n);
    }
    return t.get(e);
  }
  function Gu(t) {
    if (typeof t == "string") return G;
    if (Array.isArray(t)) return U;
    if (!t) return;
    let { type: e } = t;
    if (Ge.has(e)) return e;
  }
  var q = Gu;
  var Ku = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
  function Hu(t) {
    let e = t === null ? "null" : typeof t;
    if (e !== "string" && e !== "object") return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
    if (q(t)) throw new Error("doc is valid.");
    let r = Object.prototype.toString.call(t);
    if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
    let n = Ku([...Ge].map((u) => `'${u}'`));
    return `Unexpected doc.type '${t.type}'.
Expected it to be ${n}.`;
  }
  var Nt = class extends Error {
    name = "InvalidDocError";
    constructor(e) {
      super(Hu(e)), this.doc = e;
    }
  };
  var Z = Nt;
  var _r = {};
  function Ju(t, e, r, n) {
    let u = [t];
    for (; u.length > 0; ) {
      let o = u.pop();
      if (o === _r) {
        r(u.pop());
        continue;
      }
      r && u.push(o, _r);
      let i = q(o);
      if (!i) throw new Z(o);
      if (e?.(o) !== false) switch (i) {
        case U:
        case S: {
          let D = i === U ? o : o.parts;
          for (let s = D.length, a = s - 1; a >= 0; --a) u.push(D[a]);
          break;
        }
        case T:
          u.push(o.flatContents, o.breakContents);
          break;
        case x:
          if (n && o.expandedStates) for (let D = o.expandedStates.length, s = D - 1; s >= 0; --s) u.push(o.expandedStates[s]);
          else u.push(o.contents);
          break;
        case R:
        case I:
        case L:
        case b:
        case M:
          u.push(o.contents);
          break;
        case G:
        case V:
        case v:
        case Y:
        case g:
        case N:
          break;
        default:
          throw new Z(o);
      }
    }
  }
  var Oe = Ju;
  function Se(t, e) {
    if (typeof t == "string") return e(t);
    let r = /* @__PURE__ */ new Map();
    return n(t);
    function n(o) {
      return Fe(r, o, u);
    }
    function u(o) {
      switch (q(o)) {
        case U:
          return e(o.map(n));
        case S:
          return e({ ...o, parts: o.parts.map(n) });
        case T:
          return e({ ...o, breakContents: n(o.breakContents), flatContents: n(o.flatContents) });
        case x: {
          let { expandedStates: i, contents: D } = o;
          return i ? (i = i.map(n), D = i[0]) : D = n(D), e({ ...o, contents: D, expandedStates: i });
        }
        case R:
        case I:
        case L:
        case b:
        case M:
          return e({ ...o, contents: n(o.contents) });
        case G:
        case V:
        case v:
        case Y:
        case g:
        case N:
          return e(o);
        default:
          throw new Z(o);
      }
    }
  }
  function Ke(t, e, r) {
    let n = r, u = false;
    function o(i) {
      if (u) return false;
      let D = e(i);
      D !== void 0 && (u = true, n = D);
    }
    return Oe(t, o), n;
  }
  function qu(t) {
    if (t.type === x && t.break || t.type === g && t.hard || t.type === N) return true;
  }
  function xr(t) {
    return Ke(t, qu, false);
  }
  function yr(t) {
    if (t.length > 0) {
      let e = y(0, t, -1);
      !e.expandedStates && !e.break && (e.break = "propagated");
    }
    return null;
  }
  function Br(t) {
    let e = /* @__PURE__ */ new Set(), r = [];
    function n(o) {
      if (o.type === N && yr(r), o.type === x) {
        if (r.push(o), e.has(o)) return false;
        e.add(o);
      }
    }
    function u(o) {
      o.type === x && r.pop().break && yr(r);
    }
    Oe(t, n, u, true);
  }
  function Xu(t) {
    return t.type === g && !t.hard ? t.soft ? "" : " " : t.type === T ? t.flatContents : t;
  }
  function Tr(t) {
    return Se(t, Xu);
  }
  function Ar(t) {
    for (t = [...t]; t.length >= 2 && y(0, t, -2).type === g && y(0, t, -1).type === N; ) t.length -= 2;
    if (t.length > 0) {
      let e = Pe(y(0, t, -1));
      t[t.length - 1] = e;
    }
    return t;
  }
  function Pe(t) {
    switch (q(t)) {
      case I:
      case L:
      case x:
      case M:
      case b: {
        let e = Pe(t.contents);
        return { ...t, contents: e };
      }
      case T:
        return { ...t, breakContents: Pe(t.breakContents), flatContents: Pe(t.flatContents) };
      case S:
        return { ...t, parts: Ar(t.parts) };
      case U:
        return Ar(t);
      case G:
        return gr(t);
      case R:
      case V:
      case v:
      case Y:
      case g:
      case N:
        break;
      default:
        throw new Z(t);
    }
    return t;
  }
  function He(t) {
    return Pe(Zu(t));
  }
  function Qu(t) {
    switch (q(t)) {
      case S: {
        let { parts: e } = t;
        if (e.every((r) => r === "")) return "";
        if (e.length === 1) return e[0];
        break;
      }
      case x:
        if (!t.contents && !t.id && !t.break && !t.expandedStates) return "";
        if (t.contents.type === x && t.contents.id === t.id && t.contents.break === t.break && t.contents.expandedStates === t.expandedStates) return t.contents;
        break;
      case R:
      case I:
      case L:
      case M:
        if (!t.contents) return "";
        break;
      case T:
        if (!t.flatContents && !t.breakContents) return "";
        break;
      case U: {
        let e = [];
        for (let r of t) {
          if (!r) continue;
          let [n, ...u] = Array.isArray(r) ? r : [r];
          typeof n == "string" && typeof y(0, e, -1) == "string" ? e[e.length - 1] += n : e.push(n), e.push(...u);
        }
        return e.length === 0 ? "" : e.length === 1 ? e[0] : e;
      }
      case G:
      case V:
      case v:
      case Y:
      case g:
      case b:
      case N:
        break;
      default:
        throw new Z(t);
    }
    return t;
  }
  function Zu(t) {
    return Se(t, (e) => Qu(e));
  }
  function Nr(t, e = Je) {
    return Se(t, (r) => typeof r == "string" ? be(e, r.split(`
`)) : r);
  }
  function eo(t) {
    if (t.type === g) return true;
  }
  function wr(t) {
    return Ke(t, eo, false);
  }
  function Ee(t, e) {
    return t.type === b ? { ...t, contents: e(t.contents) } : e(t);
  }
  var w = k;
  var qe = k;
  var Or = k;
  var Pr = k;
  function oe(t) {
    return w(t), { type: I, contents: t };
  }
  function De(t, e) {
    return Pr(t), w(e), { type: R, contents: e, n: t };
  }
  function Sr(t) {
    return De(Number.NEGATIVE_INFINITY, t);
  }
  function Xe(t) {
    return De({ type: "root" }, t);
  }
  function br(t) {
    return De(-1, t);
  }
  function Qe(t, e, r) {
    w(t);
    let n = t;
    if (e > 0) {
      for (let u = 0; u < Math.floor(e / r); ++u) n = oe(n);
      n = De(e % r, n), n = De(Number.NEGATIVE_INFINITY, n);
    }
    return n;
  }
  var ae = { type: N };
  var ee = { type: V };
  function kr(t) {
    return Or(t), { type: S, parts: t };
  }
  function wt(t, e = {}) {
    return w(t), qe(e.expandedStates, true), { type: x, id: e.id, contents: t, break: !!e.shouldBreak, expandedStates: e.expandedStates };
  }
  function Ir(t, e) {
    return wt(t[0], { ...e, expandedStates: t });
  }
  function Rr(t, e = "", r = {}) {
    return w(t), e !== "" && w(e), { type: T, breakContents: t, flatContents: e, groupId: r.groupId };
  }
  function vr(t, e) {
    return w(t), { type: L, contents: t, groupId: e.groupId, negate: e.negate };
  }
  function be(t, e) {
    w(t), qe(e);
    let r = [];
    for (let n = 0; n < e.length; n++) n !== 0 && r.push(t), r.push(e[n]);
    return r;
  }
  function Lr(t, e) {
    return w(e), t ? { type: b, label: t, contents: e } : e;
  }
  var Ze = { type: g };
  var Mr = { type: g, soft: true };
  var ke = { type: g, hard: true };
  var W = [ke, ae];
  var Ot = { type: g, hard: true, literal: true };
  var Je = [Ot, ae];
  function Ie(t) {
    return w(t), { type: M, contents: t };
  }
  var Yr = { type: Y };
  var jr = { type: v };
  function te(t) {
    if (!t) return "";
    if (Array.isArray(t)) {
      let e = [];
      for (let r of t) if (Array.isArray(r)) e.push(...te(r));
      else {
        let n = te(r);
        n !== "" && e.push(n);
      }
      return e;
    }
    return t.type === T ? { ...t, breakContents: te(t.breakContents), flatContents: te(t.flatContents) } : t.type === x ? { ...t, contents: te(t.contents), expandedStates: t.expandedStates?.map(te) } : t.type === S ? { type: "fill", parts: t.parts.map(te) } : t.contents ? { ...t, contents: te(t.contents) } : t;
  }
  function Ur(t) {
    let e = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ new Set();
    return n(te(t));
    function n(o, i, D) {
      if (typeof o == "string") return JSON.stringify(o);
      if (Array.isArray(o)) {
        let s = o.map(n).filter(Boolean);
        return s.length === 1 ? s[0] : `[${s.join(", ")}]`;
      }
      if (o.type === g) {
        let s = D?.[i + 1]?.type === N;
        return o.literal ? s ? "literalline" : "literallineWithoutBreakParent" : o.hard ? s ? "hardline" : "hardlineWithoutBreakParent" : o.soft ? "softline" : "line";
      }
      if (o.type === N) return D?.[i - 1]?.type === g && D[i - 1].hard ? void 0 : "breakParent";
      if (o.type === v) return "trim";
      if (o.type === I) return "indent(" + n(o.contents) + ")";
      if (o.type === R) return o.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + n(o.contents) + ")" : o.n < 0 ? "dedent(" + n(o.contents) + ")" : o.n.type === "root" ? "markAsRoot(" + n(o.contents) + ")" : "align(" + JSON.stringify(o.n) + ", " + n(o.contents) + ")";
      if (o.type === T) return "ifBreak(" + n(o.breakContents) + (o.flatContents ? ", " + n(o.flatContents) : "") + (o.groupId ? (o.flatContents ? "" : ', ""') + `, { groupId: ${u(o.groupId)} }` : "") + ")";
      if (o.type === L) {
        let s = [];
        o.negate && s.push("negate: true"), o.groupId && s.push(`groupId: ${u(o.groupId)}`);
        let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
        return `indentIfBreak(${n(o.contents)}${a})`;
      }
      if (o.type === x) {
        let s = [];
        o.break && o.break !== "propagated" && s.push("shouldBreak: true"), o.id && s.push(`id: ${u(o.id)}`);
        let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
        return o.expandedStates ? `conditionalGroup([${o.expandedStates.map((c) => n(c)).join(",")}]${a})` : `group(${n(o.contents)}${a})`;
      }
      if (o.type === S) return `fill([${o.parts.map((s) => n(s)).join(", ")}])`;
      if (o.type === M) return "lineSuffix(" + n(o.contents) + ")";
      if (o.type === Y) return "lineSuffixBoundary";
      if (o.type === b) return `label(${JSON.stringify(o.label)}, ${n(o.contents)})`;
      if (o.type === V) return "cursor";
      throw new Error("Unknown doc type " + o.type);
    }
    function u(o) {
      if (typeof o != "symbol") return JSON.stringify(String(o));
      if (o in e) return e[o];
      let i = o.description || "symbol";
      for (let D = 0; ; D++) {
        let s = i + (D > 0 ? ` #${D}` : "");
        if (!r.has(s)) return r.add(s), e[o] = `Symbol.for(${JSON.stringify(s)})`;
      }
    }
  }
  var Vr = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
  var Wr = 12288;
  var $r = 65510;
  var zr = [12288, 12288, 65281, 65376, 65504, 65510];
  var Gr = 4352;
  var Kr = 262141;
  var Pt = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];
  var St = (t, e) => {
    let r = 0, n = Math.floor(t.length / 2) - 1;
    for (; r <= n; ) {
      let u = Math.floor((r + n) / 2), o = u * 2;
      if (e < t[o]) n = u - 1;
      else if (e > t[o + 1]) r = u + 1;
      else return true;
    }
    return false;
  };
  var Hr = 19968;
  var [to, ro] = no(Pt);
  function no(t) {
    let e = t[0], r = t[1];
    for (let n = 0; n < t.length; n += 2) {
      let u = t[n], o = t[n + 1];
      if (Hr >= u && Hr <= o) return [u, o];
      o - u > r - e && (e = u, r = o);
    }
    return [e, r];
  }
  var bt = (t) => t < Wr || t > $r ? false : St(zr, t);
  var kt = (t) => t >= to && t <= ro ? true : t < Gr || t > Kr ? false : St(Pt, t);
  var uo = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/;
  var Jr = (t) => uo.test(t);
  var oo = /[^\x20-\x7F]/;
  function io(t) {
    if (!t) return 0;
    if (!oo.test(t)) return t.length;
    let e = 0;
    t = t.replace(Vr(), (r) => (e += Jr(r) ? 1 : 2, ""));
    for (let r of t) {
      let n = r.codePointAt(0);
      n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || n >= 65024 && n <= 65039 || (e += bt(n) || kt(n) ? 2 : 1);
    }
    return e;
  }
  var Re = io;
  var so = { type: 0 };
  var Do = { type: 1 };
  var It = { value: "", length: 0, queue: [], get root() {
    return It;
  } };
  function qr(t, e, r) {
    let n = e.type === 1 ? t.queue.slice(0, -1) : [...t.queue, e], u = "", o = 0, i = 0, D = 0;
    for (let f of n) switch (f.type) {
      case 0:
        c(), r.useTabs ? s(1) : a(r.tabWidth);
        break;
      case 3: {
        let { string: F } = f;
        c(), u += F, o += F.length;
        break;
      }
      case 2: {
        let { width: F } = f;
        i += 1, D += F;
        break;
      }
      default:
        throw new Error(`Unexpected indent comment '${f.type}'.`);
    }
    return l(), { ...t, value: u, length: o, queue: n };
    function s(f) {
      u += "	".repeat(f), o += r.tabWidth * f;
    }
    function a(f) {
      u += " ".repeat(f), o += f;
    }
    function c() {
      r.useTabs ? p() : l();
    }
    function p() {
      i > 0 && s(i), m();
    }
    function l() {
      D > 0 && a(D), m();
    }
    function m() {
      i = 0, D = 0;
    }
  }
  function Xr(t, e, r) {
    if (!e) return t;
    if (e.type === "root") return { ...t, root: t };
    if (e === Number.NEGATIVE_INFINITY) return t.root;
    let n;
    return typeof e == "number" ? e < 0 ? n = Do : n = { type: 2, width: e } : n = { type: 3, string: e }, qr(t, n, r);
  }
  function Qr(t, e) {
    return qr(t, so, e);
  }
  function ao(t) {
    let e = 0;
    for (let r = t.length - 1; r >= 0; r--) {
      let n = t[r];
      if (n === " " || n === "	") e++;
      else break;
    }
    return e;
  }
  function et(t) {
    let e = ao(t);
    return { text: e === 0 ? t : t.slice(0, t.length - e), count: e };
  }
  var Rt = class {
    #t = [];
    #e = "";
    #n = 0;
    #u = [];
    #r = [];
    #o() {
      let e = this.#e;
      e !== "" && (this.#t.push(e), this.#n += e.length, this.#e = "");
      for (let r of this.#r) this.#u.push(Math.min(r, this.#n));
      this.#r.length = 0;
    }
    markPosition() {
      if (this.#u.length + this.#r.length >= 2) throw new Error("There are too many 'cursor' in doc.");
      this.#r.push(this.#n + this.#e.length);
    }
    write(e) {
      this.#e += e;
    }
    trim() {
      let { text: e, count: r } = et(this.#e);
      return this.#e = e, this.#o(), r;
    }
    finish() {
      return this.#o(), { text: this.#t.join(""), positions: this.#u };
    }
  };
  var Zr = Rt;
  var K = /* @__PURE__ */ Symbol("MODE_BREAK");
  var Q = /* @__PURE__ */ Symbol("MODE_FLAT");
  var vt = /* @__PURE__ */ Symbol("DOC_FILL_PRINTED_LENGTH");
  function tt(t, e, r, n, u, o) {
    if (r === Number.POSITIVE_INFINITY) return true;
    let i = e.length, D = false, s = [t], a = "";
    for (; r >= 0; ) {
      if (s.length === 0) {
        if (i === 0) return true;
        s.push(e[--i]);
        continue;
      }
      let { mode: c, doc: p } = s.pop(), l = q(p);
      switch (l) {
        case G:
          p && (D && (a += " ", r -= 1, D = false), a += p, r -= Re(p));
          break;
        case U:
        case S: {
          let m = l === U ? p : p.parts, f = p[vt] ?? 0;
          for (let F = m.length - 1; F >= f; F--) s.push({ mode: c, doc: m[F] });
          break;
        }
        case I:
        case R:
        case L:
        case b:
          s.push({ mode: c, doc: p.contents });
          break;
        case v: {
          let { text: m, count: f } = et(a);
          a = m, r += f;
          break;
        }
        case x: {
          if (o && p.break) return false;
          let m = p.break ? K : c, f = p.expandedStates && m === K ? y(0, p.expandedStates, -1) : p.contents;
          s.push({ mode: m, doc: f });
          break;
        }
        case T: {
          let f = (p.groupId ? u[p.groupId] || Q : c) === K ? p.breakContents : p.flatContents;
          f && s.push({ mode: c, doc: f });
          break;
        }
        case g:
          if (c === K || p.hard) return true;
          p.soft || (D = true);
          break;
        case M:
          n = true;
          break;
        case Y:
          if (n) return false;
          break;
      }
    }
    return false;
  }
  function Ce(t, e) {
    let r = /* @__PURE__ */ Object.create(null), n = e.printWidth, u = we(e.endOfLine), o = 0, i = [{ indent: It, mode: K, doc: t }], D = false, s = [], a = new Zr();
    for (Br(t); i.length > 0; ) {
      let { indent: f, mode: F, doc: d } = i.pop();
      switch (q(d)) {
        case G: {
          let E = u !== `
` ? ne(0, d, `
`, u) : d;
          E && (a.write(E), i.length > 0 && (o += Re(E)));
          break;
        }
        case U:
          for (let E = d.length - 1; E >= 0; E--) i.push({ indent: f, mode: F, doc: d[E] });
          break;
        case V:
          a.markPosition();
          break;
        case I:
          i.push({ indent: Qr(f, e), mode: F, doc: d.contents });
          break;
        case R:
          i.push({ indent: Xr(f, d.n, e), mode: F, doc: d.contents });
          break;
        case v:
          o -= a.trim();
          break;
        case x: {
          let E = (function() {
            if (F === Q && !D) return { indent: f, mode: d.break ? K : Q, doc: d.contents };
            D = false;
            let h = n - o, _ = s.length > 0, P = { indent: f, mode: Q, doc: d.contents };
            if (!d.break && tt(P, i, h, _, r)) return P;
            if (!d.expandedStates) return { indent: f, mode: K, doc: d.contents };
            if (!d.break) for (let A = 1; A < d.expandedStates.length - 1; A++) {
              let B = { indent: f, mode: Q, doc: d.expandedStates[A] };
              if (tt(B, i, h, _, r)) return B;
            }
            return { indent: f, mode: K, doc: y(0, d.expandedStates, -1) };
          })();
          i.push(E), d.id && (r[d.id] = E.mode);
          break;
        }
        case S: {
          let E = n - o, C = d[vt] ?? 0, { parts: h } = d, _ = h.length - C;
          if (_ === 0) break;
          let P = h[C + 0], A = h[C + 1], B = { indent: f, mode: Q, doc: P }, J = { indent: f, mode: K, doc: P }, $e = tt(B, [], E, s.length > 0, r, true);
          if (_ === 1) {
            $e ? i.push(B) : i.push(J);
            break;
          }
          let lr = { indent: f, mode: Q, doc: A }, _t = { indent: f, mode: K, doc: A };
          if (_ === 2) {
            $e ? i.push(lr, B) : i.push(_t, J);
            break;
          }
          let bu = h[C + 2], ku = { indent: f, mode: F, doc: { ...d, [vt]: C + 2 } }, Iu = tt({ indent: f, mode: Q, doc: [P, A, bu] }, [], E, s.length > 0, r, true);
          i.push(ku), Iu ? i.push(lr, B) : $e ? i.push(_t, B) : i.push(_t, J);
          break;
        }
        case T:
        case L: {
          let E = d.groupId ? r[d.groupId] : F;
          if (E === K) {
            let C = d.type === T ? d.breakContents : d.negate ? d.contents : oe(d.contents);
            C && i.push({ indent: f, mode: F, doc: C });
          }
          if (E === Q) {
            let C = d.type === T ? d.flatContents : d.negate ? oe(d.contents) : d.contents;
            C && i.push({ indent: f, mode: F, doc: C });
          }
          break;
        }
        case M:
          s.push({ indent: f, mode: F, doc: d.contents });
          break;
        case Y:
          s.length > 0 && i.push({ indent: f, mode: F, doc: ke });
          break;
        case g:
          switch (F) {
            case Q:
              if (!d.hard) {
                d.soft || (a.write(" "), o += 1);
                break;
              }
              D = true;
            case K:
              if (s.length > 0) {
                i.push({ indent: f, mode: F, doc: d }, ...s.reverse()), s.length = 0;
                break;
              }
              d.literal ? (a.write(u), o = 0, f.root && (f.root.value && a.write(f.root.value), o = f.root.length)) : (a.trim(), a.write(u + f.value), o = f.length);
              break;
          }
          break;
        case b:
          i.push({ indent: f, mode: F, doc: d.contents });
          break;
        case N:
          break;
        default:
          throw new Z(d);
      }
      i.length === 0 && s.length > 0 && (i.push(...s.reverse()), s.length = 0);
    }
    let { text: c, positions: p } = a.finish();
    if (p.length !== 2) return { formatted: c };
    let [l, m] = p;
    return { formatted: c, cursorNodeStart: l, cursorNodeText: c.slice(l, m) };
  }
  function co(t, e, r = 0) {
    let n = 0;
    for (let u = r; u < t.length; ++u) t[u] === "	" ? n = n + e - n % e : n++;
    return n;
  }
  var he = co;
  var Lt = class {
    constructor(e) {
      this.stack = [e];
    }
    get key() {
      let { stack: e, siblings: r } = this;
      return y(0, e, r === null ? -2 : -4) ?? null;
    }
    get index() {
      return this.siblings === null ? null : y(0, this.stack, -2);
    }
    get node() {
      return y(0, this.stack, -1);
    }
    get parent() {
      return this.getNode(1);
    }
    get grandparent() {
      return this.getNode(2);
    }
    get isInArray() {
      return this.siblings !== null;
    }
    get siblings() {
      let { stack: e } = this, r = y(0, e, -3);
      return Array.isArray(r) ? r : null;
    }
    get next() {
      let { siblings: e } = this;
      return e === null ? null : e[this.index + 1];
    }
    get previous() {
      let { siblings: e } = this;
      return e === null ? null : e[this.index - 1];
    }
    get isFirst() {
      return this.index === 0;
    }
    get isLast() {
      let { siblings: e, index: r } = this;
      return e !== null && r === e.length - 1;
    }
    get isRoot() {
      return this.stack.length === 1;
    }
    get root() {
      return this.stack[0];
    }
    get ancestors() {
      return [...this.#e()];
    }
    getName() {
      let { stack: e } = this, { length: r } = e;
      return r > 1 ? y(0, e, -2) : null;
    }
    getValue() {
      return y(0, this.stack, -1);
    }
    getNode(e = 0) {
      let r = this.#t(e);
      return r === -1 ? null : this.stack[r];
    }
    getParentNode(e = 0) {
      return this.getNode(e + 1);
    }
    #t(e) {
      let { stack: r } = this;
      for (let n = r.length - 1; n >= 0; n -= 2) if (!Array.isArray(r[n]) && --e < 0) return n;
      return -1;
    }
    call(e, ...r) {
      let { stack: n } = this, { length: u } = n, o = y(0, n, -1);
      for (let i of r) o = o?.[i], n.push(i, o);
      try {
        return e(this);
      } finally {
        n.length = u;
      }
    }
    callParent(e, r = 0) {
      let n = this.#t(r + 1), u = this.stack.splice(n + 1);
      try {
        return e(this);
      } finally {
        this.stack.push(...u);
      }
    }
    each(e, ...r) {
      let { stack: n } = this, { length: u } = n, o = y(0, n, -1);
      for (let i of r) o = o[i], n.push(i, o);
      try {
        for (let i = 0; i < o.length; ++i) n.push(i, o[i]), e(this, i, o), n.length -= 2;
      } finally {
        n.length = u;
      }
    }
    map(e, ...r) {
      let n = [];
      return this.each((u, o, i) => {
        n[o] = e(u, o, i);
      }, ...r), n;
    }
    match(...e) {
      let r = this.stack.length - 1, n = null, u = this.stack[r--];
      for (let o of e) {
        if (u === void 0) return false;
        let i = null;
        if (typeof n == "number" && (i = n, n = this.stack[r--], u = this.stack[r--]), o && !o(u, n, i)) return false;
        n = this.stack[r--], u = this.stack[r--];
      }
      return true;
    }
    findAncestor(e) {
      for (let r of this.#e()) if (e(r)) return r;
    }
    hasAncestor(e) {
      for (let r of this.#e()) if (e(r)) return true;
      return false;
    }
    *#e() {
      let { stack: e } = this;
      for (let r = e.length - 3; r >= 0; r -= 2) {
        let n = e[r];
        Array.isArray(n) || (yield n);
      }
    }
  };
  var en = Lt;
  function fo(t) {
    return Array.isArray(t) && t.length > 0;
  }
  var rt = fo;
  function lo(t) {
    return t !== null && typeof t == "object";
  }
  var ge = lo;
  function _e(t) {
    return (e, r, n) => {
      if (r === false) return false;
      let u = !!n?.backwards, { length: o } = e, i = r;
      for (; i >= 0 && i < o; ) {
        let D = e.charAt(i);
        if (t instanceof RegExp) {
          if (!t.test(D)) return i;
        } else if (!t.includes(D)) return i;
        u ? i-- : i++;
      }
      return i === -1 || i === o ? i : false;
    };
  }
  var tn = _e(/\s/);
  var j = _e(" 	");
  var nt = _e(",; 	");
  var ut = _e(/[^\n\r]/);
  var rn = (t) => t === `
` || t === "\r" || t === "\u2028" || t === "\u2029";
  function po(t, e, r) {
    if (e === false) return false;
    let n = !!r?.backwards, u = t.charAt(e);
    if (n) {
      if (t.charAt(e - 1) === "\r" && u === `
`) return e - 2;
      if (rn(u)) return e - 1;
    } else {
      if (u === "\r" && t.charAt(e + 1) === `
`) return e + 2;
      if (rn(u)) return e + 1;
    }
    return e;
  }
  var $ = po;
  function mo(t, e, r = {}) {
    let n = j(t, r.backwards ? e - 1 : e, r), u = $(t, n, r);
    return n !== u;
  }
  var H = mo;
  function* ye(t, e) {
    let { getVisitorKeys: r, filter: n = () => true } = e, u = (o) => ge(o) && n(o);
    for (let o of r(t)) {
      let i = t[o];
      if (Array.isArray(i)) for (let D of i) u(D) && (yield D);
      else u(i) && (yield i);
    }
  }
  function* nn(t, e) {
    let r = [t];
    for (let n = 0; n < r.length; n++) {
      let u = r[n];
      for (let o of ye(u, e)) yield o, r.push(o);
    }
  }
  function un(t, e) {
    return ye(t, e).next().done;
  }
  function Fo(t, e, r) {
    let { filter: n } = r;
    if (!n) return [];
    let u, o = (r.getChildren?.(t, r) ?? [...ye(t, { getVisitorKeys: r.getVisitorKeys })]).flatMap((s) => (u ?? (u = [t, ...e]), n(s, u) ? [s] : on(s, u, r))), { locStart: i, locEnd: D } = r;
    return o.sort((s, a) => i(s) - i(a) || D(s) - D(a)), o;
  }
  function on(t, e, r) {
    return Fe(r.cache, t, (n) => Fo(n, e, r));
  }
  var ot = on;
  function Eo(t) {
    let e = t.type || t.kind || "(unknown type)", r = String(t.name || t.id && (typeof t.id == "object" ? t.id.name : t.id) || t.key && (typeof t.key == "object" ? t.key.name : t.key) || t.value && (typeof t.value == "object" ? "" : String(t.value)) || t.operator || "");
    return r.length > 20 && (r = r.slice(0, 19) + "\u2026"), e + (r ? " " + r : "");
  }
  function Mt(t, e) {
    (t.comments ?? (t.comments = [])).push(e), e.printed = false, e.nodeDescription = Eo(t);
  }
  function ce(t, e) {
    e.leading = true, e.trailing = false, Mt(t, e);
  }
  function re(t, e, r) {
    e.leading = false, e.trailing = false, r && (e.marker = r), Mt(t, e);
  }
  function fe(t, e) {
    e.leading = false, e.trailing = true, Mt(t, e);
  }
  var Ut = /* @__PURE__ */ new WeakMap();
  function Dn(t, e, r, n, u = []) {
    let { locStart: o, locEnd: i } = r, D = o(e), s = i(e), a = ot(t, u, { cache: Ut, locStart: o, locEnd: i, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes }), c, p, l = 0, m = a.length;
    for (; l < m; ) {
      let f = l + m >> 1, F = a[f], d = o(F), E = i(F);
      if (d <= D && s <= E) return Dn(F, e, r, F, [F, ...u]);
      if (E <= D) {
        c = F, l = f + 1;
        continue;
      }
      if (s <= d) {
        p = F, m = f;
        continue;
      }
      throw new Error("Comment location overlaps with node location");
    }
    if (n?.type === "TemplateLiteral") {
      let { quasis: f } = n, F = jt(f, e, r);
      c && jt(f, c, r) !== F && (c = null), p && jt(f, p, r) !== F && (p = null);
    }
    return { enclosingNode: n, precedingNode: c, followingNode: p };
  }
  var Yt = () => false;
  function an(t, e) {
    let { comments: r } = t;
    if (delete t.comments, !rt(r) || !e.printer.canAttachComment) return;
    let n = [], { printer: { features: { experimental_avoidAstMutation: u }, handleComments: o = {} }, originalText: i } = e, { ownLine: D = Yt, endOfLine: s = Yt, remaining: a = Yt } = o, c = r.map((l, m) => ({ ...Dn(t, l, e), comment: l, text: i, options: e, ast: t, isLastComment: r.length - 1 === m, placement: void 0 })), p = !u;
    for (let [l, m] of c.entries()) {
      let { comment: f, precedingNode: F, enclosingNode: d, followingNode: E, text: C, options: h, ast: _, isLastComment: P } = m, A = Co(C, h, c, l) ? "ownLine" : ho(C, h, c, l) ? "endOfLine" : "remaining", B;
      if (u ? (m.placement = A, B = [m]) : B = [f, C, h, _, P], p && (f.enclosingNode = d, f.precedingNode = F, f.followingNode = E), f.placement = A, A === "ownLine") D(...B) || (E ? ce(E, f) : F ? fe(F, f) : d ? re(d, f) : re(_, f));
      else if (A === "endOfLine") s(...B) || (F ? fe(F, f) : E ? ce(E, f) : d ? re(d, f) : re(_, f));
      else if (!a(...B)) if (F && E) {
        let J = n.length;
        J > 0 && n[J - 1].followingNode !== E && sn(n, h), n.push(m);
      } else F ? fe(F, f) : E ? ce(E, f) : d ? re(d, f) : re(_, f);
    }
    if (sn(n, e), p) for (let l of r) delete l.precedingNode, delete l.enclosingNode, delete l.followingNode;
  }
  var cn = (t) => !/[\S\n\u2028\u2029]/.test(t);
  function Co(t, e, r, n) {
    let { comment: u, precedingNode: o } = r[n], { locStart: i, locEnd: D } = e, s = i(u);
    if (o) for (let a = n - 1; a >= 0; a--) {
      let { comment: c, precedingNode: p } = r[a];
      if (p !== o || !cn(t.slice(D(c), s))) break;
      s = i(c);
    }
    return H(t, s, { backwards: true });
  }
  function ho(t, e, r, n) {
    let { comment: u, followingNode: o } = r[n], { locStart: i, locEnd: D } = e, s = D(u);
    if (o) for (let a = n + 1; a < r.length; a++) {
      let { comment: c, followingNode: p } = r[a];
      if (p !== o || !cn(t.slice(s, i(c)))) break;
      s = D(c);
    }
    return H(t, s);
  }
  function sn(t, e) {
    let r = t.length;
    if (r === 0) return;
    let { precedingNode: n, followingNode: u } = t[0], o = e.locStart(u), i;
    for (i = r; i > 0; --i) {
      let { comment: D, precedingNode: s, followingNode: a } = t[i - 1];
      k(s, n), k(a, u);
      let c = e.originalText.slice(e.locEnd(D), o);
      if (e.printer.isGap?.(c, e) ?? /^[\s(]*$/.test(c)) o = e.locStart(D);
      else break;
    }
    for (let [D, { comment: s }] of t.entries()) D < i ? fe(n, s) : ce(u, s);
    for (let D of [n, u]) D.comments && D.comments.length > 1 && D.comments.sort((s, a) => e.locStart(s) - e.locStart(a));
    t.length = 0;
  }
  function jt(t, e, r) {
    let n = r.locStart(e) - 1;
    for (let u = 1; u < t.length; ++u) if (n < r.locStart(t[u])) return u - 1;
    return 0;
  }
  function go(t, e) {
    let r = e - 1;
    r = j(t, r, { backwards: true }), r = $(t, r, { backwards: true }), r = j(t, r, { backwards: true });
    let n = $(t, r, { backwards: true });
    return r !== n;
  }
  var ve = go;
  var fn = () => true;
  function ln(t, e) {
    let r = t.node;
    return r.printed = true, e.printer.printComment(t, e);
  }
  function _o(t, e) {
    let r = t.node, n = [ln(t, e)], { printer: u, originalText: o, locStart: i, locEnd: D } = e;
    if (u.isBlockComment?.(r)) {
      let c = " ";
      H(o, D(r)) && (H(o, i(r), { backwards: true }) ? c = W : c = Ze), n.push(c);
    } else n.push(W);
    let a = $(o, j(o, D(r)));
    return a !== false && H(o, a) && n.push(W), n;
  }
  function yo(t, e, r) {
    let n = t.node, u = ln(t, e), { printer: o, originalText: i, locStart: D } = e, s = o.isBlockComment?.(n);
    if (r?.hasLineSuffix && !r?.isBlock || H(i, D(n), { backwards: true })) {
      let a = ve(i, D(n));
      return { doc: Ie([W, a ? W : "", u]), isBlock: s, hasLineSuffix: true };
    }
    return !s || r?.hasLineSuffix ? { doc: [Ie([" ", u]), ae], isBlock: s, hasLineSuffix: true } : { doc: [" ", u], isBlock: s, hasLineSuffix: false };
  }
  function Ao(t, e, r) {
    let n = e[/* @__PURE__ */ Symbol.for("printedComments")], u = r?.filter ?? fn, o = new Set(t.node?.comments?.filter((i) => !n?.has(i) && i.leading && u(i)));
    return o.size === 0 ? "" : t.map(({ node: i }) => o.has(i) ? _o(t, e) : "", "comments").filter(Boolean);
  }
  function xo(t, e, r) {
    let n = t.node?.comments, u = new Set(n?.filter((c) => c.trailing)), o = e[/* @__PURE__ */ Symbol.for("printedComments")], i = r?.filter ?? fn, D = new Set(n?.filter((c) => u.has(c) && !o?.has(c) && i(c)));
    if (D.size === 0) return "";
    let s = [], a;
    return t.each(({ node: c }) => {
      u.has(c) && (a = yo(t, e, a), D.has(c) && s.push(a.doc));
    }, "comments"), s;
  }
  function pn(t, e, r, n) {
    let u = Ao(t, r, n), o = xo(t, r, n);
    return u || o ? Ee(e, (i) => [u, i, o]) : e;
  }
  function mn(t) {
    let { [ue]: e, [/* @__PURE__ */ Symbol.for("printedComments")]: r } = t;
    for (let n of e) {
      if (!n.printed && !r.has(n)) throw new Error('Comment "' + n.value.trim() + '" was not printed. Please report this error!');
      delete n.printed;
    }
  }
  var dn = () => k;
  var Le = class extends Error {
    name = "ConfigError";
  };
  var Me = class extends Error {
    name = "UndefinedParserError";
  };
  var Bo = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty);
  var le = Bo;
  var Fn = { checkIgnorePragma: { category: "Special", type: "boolean", default: false, description: "Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.", cliCategory: "Other" }, cursorOffset: { category: "Special", type: "int", default: -1, range: { start: -1, end: 1 / 0, step: 1 }, description: "Print (to stderr) where a cursor at the given position would move to after formatting.", cliCategory: "Editor" }, endOfLine: { category: "Global", type: "choice", default: "lf", description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)` }] }, filepath: { category: "Special", type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: "Other", cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { category: "Special", type: "boolean", default: false, description: "Insert @format pragma into file's first docblock comment.", cliCategory: "Other" }, parser: { category: "Global", type: "choice", default: void 0, description: "Which parser to use.", exception: (t) => typeof t == "string" || typeof t == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", description: "JavaScript" }, { value: "babel-flow", description: "Flow" }, { value: "babel-ts", description: "TypeScript" }, { value: "typescript", description: "TypeScript" }, { value: "acorn", description: "JavaScript" }, { value: "espree", description: "JavaScript" }, { value: "meriyah", description: "JavaScript" }, { value: "css", description: "CSS" }, { value: "less", description: "Less" }, { value: "scss", description: "SCSS" }, { value: "json", description: "JSON" }, { value: "json5", description: "JSON5" }, { value: "jsonc", description: "JSON with Comments" }, { value: "json-stringify", description: "JSON.stringify" }, { value: "graphql", description: "GraphQL" }, { value: "markdown", description: "Markdown" }, { value: "mdx", description: "MDX" }, { value: "vue", description: "Vue" }, { value: "yaml", description: "YAML" }, { value: "glimmer", description: "Ember / Handlebars" }, { value: "html", description: "HTML" }, { value: "angular", description: "Angular" }, { value: "lwc", description: "Lightning Web Components" }, { value: "mjml", description: "MJML" }] }, plugins: { type: "path", array: true, default: [{ value: [] }], category: "Global", description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (t) => typeof t == "string" || typeof t == "object", cliName: "plugin", cliCategory: "Config" }, printWidth: { category: "Global", type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: 1 / 0, step: 1 } }, rangeEnd: { category: "Special", type: "int", default: 1 / 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`, cliCategory: "Editor" }, rangeStart: { category: "Special", type: "int", default: 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`, cliCategory: "Editor" }, requirePragma: { category: "Special", type: "boolean", default: false, description: "Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.", cliCategory: "Other" }, tabWidth: { type: "int", category: "Global", default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: 1 / 0, step: 1 } }, useTabs: { category: "Global", type: "boolean", default: false, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { category: "Global", type: "choice", default: "auto", description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
  function it({ plugins: t = [], showDeprecated: e = false } = {}) {
    let r = t.flatMap((u) => u.languages ?? []), n = [];
    for (let u of No(Object.assign({}, ...t.map(({ options: o }) => o), Fn))) !e && u.deprecated || (Array.isArray(u.choices) && (e || (u.choices = u.choices.filter((o) => !o.deprecated)), u.name === "parser" && (u.choices = [...u.choices, ...To(u.choices, r, t)])), u.pluginDefaults = Object.fromEntries(t.filter((o) => o.defaultOptions?.[u.name] !== void 0).map((o) => [o.name, o.defaultOptions[u.name]])), n.push(u));
    return { languages: r, options: n };
  }
  function* To(t, e, r) {
    let n = new Set(t.map((u) => u.value));
    for (let u of e) if (u.parsers) {
      for (let o of u.parsers) if (!n.has(o)) {
        n.add(o);
        let i = r.find((s) => s.parsers && le(s.parsers, o)), D = u.name;
        i?.name && (D += ` (plugin: ${i.name})`), yield { value: o, description: D };
      }
    }
  }
  function No(t) {
    let e = [];
    for (let [r, n] of Object.entries(t)) {
      let u = { name: r, ...n };
      Array.isArray(u.default) && (u.default = y(0, u.default, -1).value), e.push(u);
    }
    return e;
  }
  var wo = Array.prototype.toReversed ?? function() {
    return [...this].reverse();
  };
  var Oo = X("toReversed", function() {
    if (Array.isArray(this)) return wo;
  });
  var En = Oo;
  function Po() {
    let t = globalThis, e = t.process?.platform;
    if (typeof e == "string") return e.startsWith("win");
    let r = t.Deno?.build?.os;
    return typeof r == "string" ? r === "windows" : t.navigator?.platform?.startsWith("Win") ?? false;
  }
  var So = Po();
  function Cn(t) {
    if (t = t instanceof URL ? t : new URL(t), t.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${t.protocol}"`);
    return t;
  }
  function bo(t) {
    return t = Cn(t), decodeURIComponent(t.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
  }
  function ko(t) {
    t = Cn(t);
    let e = decodeURIComponent(t.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    return t.hostname !== "" && (e = `\\\\${t.hostname}${e}`), e;
  }
  function Vt(t) {
    return So ? ko(t) : bo(t);
  }
  var hn = (t) => String(t).split(/[/\\]/).pop();
  var gn = (t) => String(t).startsWith("file:");
  function _n(t, e) {
    if (!e) return;
    let r = hn(e).toLowerCase();
    return t.find(({ filenames: n }) => n?.some((u) => u.toLowerCase() === r)) ?? t.find(({ extensions: n }) => n?.some((u) => r.endsWith(u)));
  }
  function Io(t, e) {
    if (e) return t.find(({ name: r }) => r.toLowerCase() === e) ?? t.find(({ aliases: r }) => r?.includes(e)) ?? t.find(({ extensions: r }) => r?.includes(`.${e}`));
  }
  var Ro = void 0;
  function yn(t, e) {
    if (e) {
      if (gn(e)) try {
        e = Vt(e);
      } catch {
        return;
      }
      if (typeof e == "string") return t.find(({ isSupported: r }) => r?.({ filepath: e }));
    }
  }
  function vo(t, e) {
    let r = En(0, t.plugins).flatMap((u) => u.languages ?? []);
    return (Io(r, e.language) ?? _n(r, e.physicalFile) ?? _n(r, e.file) ?? yn(r, e.physicalFile) ?? yn(r, e.file) ?? Ro?.(r, e.physicalFile))?.parsers[0];
  }
  var st = vo;
  var ie = { key: (t) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(t) ? t : JSON.stringify(t), value(t) {
    if (t === null || typeof t != "object") return JSON.stringify(t);
    if (Array.isArray(t)) return `[${t.map((r) => ie.value(r)).join(", ")}]`;
    let e = Object.keys(t);
    return e.length === 0 ? "{}" : `{ ${e.map((r) => `${ie.key(r)}: ${ie.value(t[r])}`).join(", ")} }`;
  }, pair: ({ key: t, value: e }) => ie.value({ [t]: e }) };
  var An = new Proxy(String, { get: () => An });
  var z = An;
  var xn = (t, e, { descriptor: r }) => {
    let n = [`${z.yellow(typeof t == "string" ? r.key(t) : r.pair(t))} is deprecated`];
    return e && n.push(`we now treat it as ${z.blue(typeof e == "string" ? r.key(e) : r.pair(e))}`), n.join("; ") + ".";
  };
  var Dt = /* @__PURE__ */ Symbol.for("vnopts.VALUE_NOT_EXIST");
  var Ae = /* @__PURE__ */ Symbol.for("vnopts.VALUE_UNCHANGED");
  var Bn = " ".repeat(2);
  var Nn = (t, e, r) => {
    let { text: n, list: u } = r.normalizeExpectedResult(r.schemas[t].expected(r)), o = [];
    return n && o.push(Tn(t, e, n, r.descriptor)), u && o.push([Tn(t, e, u.title, r.descriptor)].concat(u.values.map((i) => wn(i, r.loggerPrintWidth))).join(`
`)), On(o, r.loggerPrintWidth);
  };
  function Tn(t, e, r, n) {
    return [`Invalid ${z.red(n.key(t))} value.`, `Expected ${z.blue(r)},`, `but received ${e === Dt ? z.gray("nothing") : z.red(n.value(e))}.`].join(" ");
  }
  function wn({ text: t, list: e }, r) {
    let n = [];
    return t && n.push(`- ${z.blue(t)}`), e && n.push([`- ${z.blue(e.title)}:`].concat(e.values.map((u) => wn(u, r - Bn.length).replace(/^|\n/g, `$&${Bn}`))).join(`
`)), On(n, r);
  }
  function On(t, e) {
    if (t.length === 1) return t[0];
    let [r, n] = t, [u, o] = t.map((i) => i.split(`
`, 1)[0].length);
    return u > e && u > o ? n : r;
  }
  var xe = [];
  var Wt = [];
  function at(t, e, r) {
    if (t === e) return 0;
    let n = r?.maxDistance, u = t;
    t.length > e.length && (t = e, e = u);
    let o = t.length, i = e.length;
    for (; o > 0 && t.charCodeAt(~-o) === e.charCodeAt(~-i); ) o--, i--;
    let D = 0;
    for (; D < o && t.charCodeAt(D) === e.charCodeAt(D); ) D++;
    if (o -= D, i -= D, n !== void 0 && i - o > n) return n;
    if (o === 0) return n !== void 0 && i > n ? n : i;
    let s, a, c, p, l = 0, m = 0;
    for (; l < o; ) Wt[l] = t.charCodeAt(D + l), xe[l] = ++l;
    for (; m < i; ) {
      for (s = e.charCodeAt(D + m), c = m++, a = m, l = 0; l < o; l++) p = s === Wt[l] ? c : c + 1, c = xe[l], a = xe[l] = c > a ? p > a ? a + 1 : p : p > c ? c + 1 : p;
      if (n !== void 0) {
        let f = a;
        for (l = 0; l < o; l++) xe[l] < f && (f = xe[l]);
        if (f > n) return n;
      }
    }
    return xe.length = o, Wt.length = o, n !== void 0 && a > n ? n : a;
  }
  function Pn(t, e, r) {
    if (!Array.isArray(e) || e.length === 0) return;
    let n = r?.maxDistance, u = t.length;
    for (let s of e) if (s === t) return s;
    if (n === 0) return;
    let o, i = Number.POSITIVE_INFINITY, D = /* @__PURE__ */ new Set();
    for (let s of e) {
      if (D.has(s)) continue;
      D.add(s);
      let a = Math.abs(s.length - u);
      if (a >= i || n !== void 0 && a > n) continue;
      let c = Number.isFinite(i) ? n === void 0 ? i : Math.min(i, n) : n, p = c === void 0 ? at(t, s) : at(t, s, { maxDistance: c });
      if (n !== void 0 && p > n) continue;
      let l = p;
      if (c !== void 0 && p === c && c === n && (l = at(t, s)), l < i && (i = l, o = s, i === 0)) break;
    }
    if (!(n !== void 0 && i > n)) return o;
  }
  var ct = (t, e, { descriptor: r, logger: n, schemas: u }) => {
    let o = [`Ignored unknown option ${z.yellow(r.pair({ key: t, value: e }))}.`], i = Pn(t, Object.keys(u), { maxDistance: 3 });
    i && o.push(`Did you mean ${z.blue(r.key(i))}?`), n.warn(o.join(" "));
  };
  var Lo = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
  function Mo(t, e) {
    let r = new t(e), n = Object.create(r);
    for (let u of Lo) u in e && (n[u] = Yo(e[u], r, O.prototype[u].length));
    return n;
  }
  var O = class {
    static create(e) {
      return Mo(this, e);
    }
    constructor(e) {
      this.name = e.name;
    }
    default(e) {
    }
    expected(e) {
      return "nothing";
    }
    validate(e, r) {
      return false;
    }
    deprecated(e, r) {
      return false;
    }
    forward(e, r) {
    }
    redirect(e, r) {
    }
    overlap(e, r, n) {
      return e;
    }
    preprocess(e, r) {
      return e;
    }
    postprocess(e, r) {
      return Ae;
    }
  };
  function Yo(t, e, r) {
    return typeof t == "function" ? (...n) => t(...n.slice(0, r - 1), e, ...n.slice(r - 1)) : () => t;
  }
  var ft = class extends O {
    constructor(e) {
      super(e), this._sourceName = e.sourceName;
    }
    expected(e) {
      return e.schemas[this._sourceName].expected(e);
    }
    validate(e, r) {
      return r.schemas[this._sourceName].validate(e, r);
    }
    redirect(e, r) {
      return this._sourceName;
    }
  };
  var lt = class extends O {
    expected() {
      return "anything";
    }
    validate() {
      return true;
    }
  };
  var pt = class extends O {
    constructor({ valueSchema: e, name: r = e.name, ...n }) {
      super({ ...n, name: r }), this._valueSchema = e;
    }
    expected(e) {
      let { text: r, list: n } = e.normalizeExpectedResult(this._valueSchema.expected(e));
      return { text: r && `an array of ${r}`, list: n && { title: "an array of the following values", values: [{ list: n }] } };
    }
    validate(e, r) {
      if (!Array.isArray(e)) return false;
      let n = [];
      for (let u of e) {
        let o = r.normalizeValidateResult(this._valueSchema.validate(u, r), u);
        o !== true && n.push(o.value);
      }
      return n.length === 0 ? true : { value: n };
    }
    deprecated(e, r) {
      let n = [];
      for (let u of e) {
        let o = r.normalizeDeprecatedResult(this._valueSchema.deprecated(u, r), u);
        o !== false && n.push(...o.map(({ value: i }) => ({ value: [i] })));
      }
      return n;
    }
    forward(e, r) {
      let n = [];
      for (let u of e) {
        let o = r.normalizeForwardResult(this._valueSchema.forward(u, r), u);
        n.push(...o.map(Sn));
      }
      return n;
    }
    redirect(e, r) {
      let n = [], u = [];
      for (let o of e) {
        let i = r.normalizeRedirectResult(this._valueSchema.redirect(o, r), o);
        "remain" in i && n.push(i.remain), u.push(...i.redirect.map(Sn));
      }
      return n.length === 0 ? { redirect: u } : { redirect: u, remain: n };
    }
    overlap(e, r) {
      return e.concat(r);
    }
  };
  function Sn({ from: t, to: e }) {
    return { from: [t], to: e };
  }
  var mt = class extends O {
    expected() {
      return "true or false";
    }
    validate(e) {
      return typeof e == "boolean";
    }
  };
  function kn(t, e) {
    let r = /* @__PURE__ */ Object.create(null);
    for (let n of t) {
      let u = n[e];
      if (r[u]) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
      r[u] = n;
    }
    return r;
  }
  function In(t, e) {
    let r = /* @__PURE__ */ new Map();
    for (let n of t) {
      let u = n[e];
      if (r.has(u)) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
      r.set(u, n);
    }
    return r;
  }
  function Rn() {
    let t = /* @__PURE__ */ Object.create(null);
    return (e) => {
      let r = JSON.stringify(e);
      return t[r] ? true : (t[r] = true, false);
    };
  }
  function vn(t, e) {
    let r = [], n = [];
    for (let u of t) e(u) ? r.push(u) : n.push(u);
    return [r, n];
  }
  function Ln(t) {
    return t === Math.floor(t);
  }
  function Mn(t, e) {
    if (t === e) return 0;
    let r = typeof t, n = typeof e, u = ["undefined", "object", "boolean", "number", "string"];
    return r !== n ? u.indexOf(r) - u.indexOf(n) : r !== "string" ? Number(t) - Number(e) : t.localeCompare(e);
  }
  function Yn(t) {
    return (...e) => {
      let r = t(...e);
      return typeof r == "string" ? new Error(r) : r;
    };
  }
  function $t(t) {
    return t === void 0 ? {} : t;
  }
  function zt(t) {
    if (typeof t == "string") return { text: t };
    let { text: e, list: r } = t;
    return jo((e || r) !== void 0, "Unexpected `expected` result, there should be at least one field."), r ? { text: e, list: { title: r.title, values: r.values.map(zt) } } : { text: e };
  }
  function Gt(t, e) {
    return t === true ? true : t === false ? { value: e } : t;
  }
  function Kt(t, e, r = false) {
    return t === false ? false : t === true ? r ? true : [{ value: e }] : "value" in t ? [t] : t.length === 0 ? false : t;
  }
  function bn(t, e) {
    return typeof t == "string" || "key" in t ? { from: e, to: t } : "from" in t ? { from: t.from, to: t.to } : { from: e, to: t.to };
  }
  function dt(t, e) {
    return t === void 0 ? [] : Array.isArray(t) ? t.map((r) => bn(r, e)) : [bn(t, e)];
  }
  function Ht(t, e) {
    let r = dt(typeof t == "object" && "redirect" in t ? t.redirect : t, e);
    return r.length === 0 ? { remain: e, redirect: r } : typeof t == "object" && "remain" in t ? { remain: t.remain, redirect: r } : { redirect: r };
  }
  function jo(t, e) {
    if (!t) throw new Error(e);
  }
  var Ft = class extends O {
    constructor(e) {
      super(e), this._choices = In(e.choices.map((r) => r && typeof r == "object" ? r : { value: r }), "value");
    }
    expected({ descriptor: e }) {
      let r = Array.from(this._choices.keys()).map((i) => this._choices.get(i)).filter(({ hidden: i }) => !i).map((i) => i.value).sort(Mn).map(e.value), n = r.slice(0, -2), u = r.slice(-2);
      return { text: n.concat(u.join(" or ")).join(", "), list: { title: "one of the following values", values: r } };
    }
    validate(e) {
      return this._choices.has(e);
    }
    deprecated(e) {
      let r = this._choices.get(e);
      return r && r.deprecated ? { value: e } : false;
    }
    forward(e) {
      let r = this._choices.get(e);
      return r ? r.forward : void 0;
    }
    redirect(e) {
      let r = this._choices.get(e);
      return r ? r.redirect : void 0;
    }
  };
  var Et = class extends O {
    expected() {
      return "a number";
    }
    validate(e, r) {
      return typeof e == "number";
    }
  };
  var Ct = class extends Et {
    expected() {
      return "an integer";
    }
    validate(e, r) {
      return r.normalizeValidateResult(super.validate(e, r), e) === true && Ln(e);
    }
  };
  var Ye = class extends O {
    expected() {
      return "a string";
    }
    validate(e) {
      return typeof e == "string";
    }
  };
  var jn = ie;
  var Un = ct;
  var Vn = Nn;
  var Wn = xn;
  var ht = class {
    constructor(e, r) {
      let { logger: n = console, loggerPrintWidth: u = 80, descriptor: o = jn, unknown: i = Un, invalid: D = Vn, deprecated: s = Wn, missing: a = () => false, required: c = () => false, preprocess: p = (m) => m, postprocess: l = () => Ae } = r || {};
      this._utils = { descriptor: o, logger: n || { warn: () => {
      } }, loggerPrintWidth: u, schemas: kn(e, "name"), normalizeDefaultResult: $t, normalizeExpectedResult: zt, normalizeDeprecatedResult: Kt, normalizeForwardResult: dt, normalizeRedirectResult: Ht, normalizeValidateResult: Gt }, this._unknownHandler = i, this._invalidHandler = Yn(D), this._deprecatedHandler = s, this._identifyMissing = (m, f) => !(m in f) || a(m, f), this._identifyRequired = c, this._preprocess = p, this._postprocess = l, this.cleanHistory();
    }
    cleanHistory() {
      this._hasDeprecationWarned = Rn();
    }
    normalize(e) {
      let r = {}, u = [this._preprocess(e, this._utils)], o = () => {
        for (; u.length !== 0; ) {
          let i = u.shift(), D = this._applyNormalization(i, r);
          u.push(...D);
        }
      };
      o();
      for (let i of Object.keys(this._utils.schemas)) {
        let D = this._utils.schemas[i];
        if (!(i in r)) {
          let s = $t(D.default(this._utils));
          "value" in s && u.push({ [i]: s.value });
        }
      }
      o();
      for (let i of Object.keys(this._utils.schemas)) {
        if (!(i in r)) continue;
        let D = this._utils.schemas[i], s = r[i], a = D.postprocess(s, this._utils);
        a !== Ae && (this._applyValidation(a, i, D), r[i] = a);
      }
      return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
    }
    _applyNormalization(e, r) {
      let n = [], { knownKeys: u, unknownKeys: o } = this._partitionOptionKeys(e);
      for (let i of u) {
        let D = this._utils.schemas[i], s = D.preprocess(e[i], this._utils);
        this._applyValidation(s, i, D);
        let a = ({ from: m, to: f }) => {
          n.push(typeof f == "string" ? { [f]: m } : { [f.key]: f.value });
        }, c = ({ value: m, redirectTo: f }) => {
          let F = Kt(D.deprecated(m, this._utils), s, true);
          if (F !== false) if (F === true) this._hasDeprecationWarned(i) || this._utils.logger.warn(this._deprecatedHandler(i, f, this._utils));
          else for (let { value: d } of F) {
            let E = { key: i, value: d };
            if (!this._hasDeprecationWarned(E)) {
              let C = typeof f == "string" ? { key: f, value: d } : f;
              this._utils.logger.warn(this._deprecatedHandler(E, C, this._utils));
            }
          }
        };
        dt(D.forward(s, this._utils), s).forEach(a);
        let l = Ht(D.redirect(s, this._utils), s);
        if (l.redirect.forEach(a), "remain" in l) {
          let m = l.remain;
          r[i] = i in r ? D.overlap(r[i], m, this._utils) : m, c({ value: m });
        }
        for (let { from: m, to: f } of l.redirect) c({ value: m, redirectTo: f });
      }
      for (let i of o) {
        let D = e[i];
        this._applyUnknownHandler(i, D, r, (s, a) => {
          n.push({ [s]: a });
        });
      }
      return n;
    }
    _applyRequiredCheck(e) {
      for (let r of Object.keys(this._utils.schemas)) if (this._identifyMissing(r, e) && this._identifyRequired(r)) throw this._invalidHandler(r, Dt, this._utils);
    }
    _partitionOptionKeys(e) {
      let [r, n] = vn(Object.keys(e).filter((u) => !this._identifyMissing(u, e)), (u) => u in this._utils.schemas);
      return { knownKeys: r, unknownKeys: n };
    }
    _applyValidation(e, r, n) {
      let u = Gt(n.validate(e, this._utils), e);
      if (u !== true) throw this._invalidHandler(r, u.value, this._utils);
    }
    _applyUnknownHandler(e, r, n, u) {
      let o = this._unknownHandler(e, r, this._utils);
      if (o) for (let i of Object.keys(o)) {
        if (this._identifyMissing(i, o)) continue;
        let D = o[i];
        i in this._utils.schemas ? u(i, D) : n[i] = D;
      }
    }
    _applyPostprocess(e) {
      let r = this._postprocess(e, this._utils);
      if (r !== Ae) {
        if (r.delete) for (let n of r.delete) delete e[n];
        if (r.override) {
          let { knownKeys: n, unknownKeys: u } = this._partitionOptionKeys(r.override);
          for (let o of n) {
            let i = r.override[o];
            this._applyValidation(i, o, this._utils.schemas[o]), e[o] = i;
          }
          for (let o of u) {
            let i = r.override[o];
            this._applyUnknownHandler(o, i, e, (D, s) => {
              let a = this._utils.schemas[D];
              this._applyValidation(s, D, a), e[D] = s;
            });
          }
        }
      }
    }
  };
  var Jt;
  function Uo(t, e, { logger: r = false, isCLI: n = false, passThrough: u = false, FlagSchema: o, descriptor: i } = {}) {
    if (n) {
      if (!o) throw new Error("'FlagSchema' option is required.");
      if (!i) throw new Error("'descriptor' option is required.");
    } else i = ie;
    let D = u ? Array.isArray(u) ? (l, m) => u.includes(l) ? { [l]: m } : void 0 : (l, m) => ({ [l]: m }) : (l, m, f) => {
      let { _: F, ...d } = f.schemas;
      return ct(l, m, { ...f, schemas: d });
    }, s = Vo(e, { isCLI: n, FlagSchema: o }), a = new ht(s, { logger: r, unknown: D, descriptor: i }), c = r !== false;
    c && Jt && (a._hasDeprecationWarned = Jt);
    let p = a.normalize(t);
    return c && (Jt = a._hasDeprecationWarned), p;
  }
  function Vo(t, { isCLI: e, FlagSchema: r }) {
    let n = [];
    e && n.push(lt.create({ name: "_" }));
    for (let u of t) n.push(Wo(u, { isCLI: e, optionInfos: t, FlagSchema: r })), u.alias && e && n.push(ft.create({ name: u.alias, sourceName: u.name }));
    return n;
  }
  function Wo(t, { isCLI: e, optionInfos: r, FlagSchema: n }) {
    let { name: u } = t, o = { name: u }, i, D = {};
    switch (t.type) {
      case "int":
        i = Ct, e && (o.preprocess = Number);
        break;
      case "string":
        i = Ye;
        break;
      case "choice":
        i = Ft, o.choices = t.choices.map((s) => s?.redirect ? { ...s, redirect: { to: { key: t.name, value: s.redirect } } } : s);
        break;
      case "boolean":
        i = mt;
        break;
      case "flag":
        i = n, o.flags = r.flatMap((s) => [s.alias, s.description && s.name, s.oppositeDescription && `no-${s.name}`].filter(Boolean));
        break;
      case "path":
        i = Ye;
        break;
      default:
        throw new Error(`Unexpected type ${t.type}`);
    }
    if (t.exception ? o.validate = (s, a, c) => t.exception(s) || a.validate(s, c) : o.validate = (s, a, c) => s === void 0 || a.validate(s, c), t.redirect && (D.redirect = (s) => s ? { to: typeof t.redirect == "string" ? t.redirect : { key: t.redirect.option, value: t.redirect.value } } : void 0), t.deprecated && (D.deprecated = true), e && !t.array) {
      let s = o.preprocess || ((a) => a);
      o.preprocess = (a, c, p) => c.preprocess(s(Array.isArray(a) ? y(0, a, -1) : a), p);
    }
    return t.array ? pt.create({ ...e ? { preprocess: (s) => Array.isArray(s) ? s : [s] } : {}, ...D, valueSchema: i.create(o) }) : i.create({ ...o, ...D });
  }
  var $n = Uo;
  var $o = Array.prototype.findLast ?? function(t) {
    for (let e = this.length - 1; e >= 0; e--) {
      let r = this[e];
      if (t(r, e, this)) return r;
    }
  };
  var zo = X("findLast", function() {
    if (Array.isArray(this)) return $o;
  });
  var qt = zo;
  var zn = /* @__PURE__ */ Symbol.for("PRETTIER_IS_FRONT_MATTER");
  var Xt = [];
  function Go(t) {
    return !!t?.[zn];
  }
  var pe = Go;
  var Gn = /* @__PURE__ */ new Set(["yaml", "toml"]);
  var je = ({ node: t }) => pe(t) && Gn.has(t.language);
  async function Qt(t, e, r, n) {
    let { node: u } = r, { language: o } = u;
    if (!Gn.has(o)) return;
    let i = u.value.trim(), D;
    if (i) {
      let s = o === "yaml" ? o : st(n, { language: o });
      if (!s) return;
      D = i ? await t(i, { parser: s }) : "";
    } else D = i;
    return Xe([u.startDelimiter, u.explicitLanguage ?? "", W, D, D ? W : "", u.endDelimiter]);
  }
  function Ko(t, e) {
    return je({ node: t }) && (delete e.end, delete e.raw, delete e.value), e;
  }
  var Zt = Ko;
  function Ho({ node: t }) {
    return t.raw;
  }
  var er = Ho;
  var Kn = /* @__PURE__ */ new Set(["tokens", "comments", "parent", "enclosingNode", "precedingNode", "followingNode"]);
  var Jo = (t) => Object.keys(t).filter((e) => !Kn.has(e));
  function qo(t, e) {
    let r = t ? (n) => t(n, Kn) : Jo;
    return e ? new Proxy(r, { apply: (n, u, o) => pe(o[0]) ? Xt : Reflect.apply(n, u, o) }) : r;
  }
  var tr = qo;
  function rr(t, e) {
    if (!e) throw new Error("parserName is required.");
    let r = qt(0, t, (u) => u.parsers && le(u.parsers, e));
    if (r) return r;
    let n = `Couldn't resolve parser "${e}".`;
    throw n += " Plugins must be explicitly added to the standalone bundle.", new Le(n);
  }
  function Hn(t, e) {
    if (!e) throw new Error("astFormat is required.");
    let r = qt(0, t, (u) => u.printers && le(u.printers, e));
    if (r) return r;
    let n = `Couldn't find plugin for AST format "${e}".`;
    throw n += " Plugins must be explicitly added to the standalone bundle.", new Le(n);
  }
  function Ue({ plugins: t, parser: e }) {
    let r = rr(t, e);
    return nr(r, e);
  }
  function nr(t, e) {
    let r = t.parsers[e];
    return typeof r == "function" ? r() : r;
  }
  async function Jn(t, e) {
    let r = t.printers[e], n = typeof r == "function" ? await r() : r;
    return Zo(n);
  }
  function Xo(t) {
    let { features: e, getVisitorKeys: r, embed: n, massageAstNode: u, print: o, ...i } = t;
    e = ni(e);
    let D = e.experimental_frontMatterSupport;
    r = tr(r, D.massageAstNode || D.embed || D.print);
    let s = u;
    u && D.massageAstNode && (s = new Proxy(u, { apply(l, m, f) {
      return Zt(...f), Reflect.apply(l, m, f);
    } }));
    let a = n;
    if (n) {
      let l;
      a = new Proxy(n, { get(m, f, F) {
        return f === "getVisitorKeys" ? (l ?? (l = n.getVisitorKeys ? tr(n.getVisitorKeys, D.massageAstNode || D.embed) : r), l) : Reflect.get(m, f, F);
      }, apply: (m, f, F) => D.embed && je(...F) ? Qt : Reflect.apply(m, f, F) });
    }
    let c = o;
    return D.print && (c = new Proxy(o, { apply(l, m, f) {
      let [F] = f;
      return pe(F.node) ? er(F) : Reflect.apply(l, m, f);
    } })), { features: e, getVisitorKeys: r, embed: a, massageAstNode: s, print: c, ...i };
  }
  var Qo = /* @__PURE__ */ new WeakMap();
  function Zo(t) {
    return Fe(Qo, t, Xo);
  }
  var ei = ["clean", "embed", "print"];
  var ti = Object.fromEntries(ei.map((t) => [t, false]));
  function ri(t) {
    return { ...ti, ...t };
  }
  function ni(t) {
    return { experimental_avoidAstMutation: false, ...t, experimental_frontMatterSupport: ri(t?.experimental_frontMatterSupport) };
  }
  var qn = { astFormat: "estree", printer: {}, originalText: void 0, locStart: null, locEnd: null, getVisitorKeys: null };
  async function ui(t, e = {}) {
    let r = { ...t };
    if (!r.parser) {
      if (!r.filepath) throw new Me("No parser and no file path given, couldn't infer a parser.");
      if (r.parser = st(r, { physicalFile: r.filepath }), !r.parser) throw new Me(`No parser could be inferred for file "${r.filepath}".`);
    }
    let n = it({ plugins: t.plugins, showDeprecated: true }).options, u = { ...qn, ...Object.fromEntries(n.filter((p) => p.default !== void 0).map((p) => [p.name, p.default])) }, o = rr(r.plugins, r.parser), i = await nr(o, r.parser);
    r.astFormat = i.astFormat, r.locEnd = i.locEnd, r.locStart = i.locStart;
    let D = o.printers?.[i.astFormat] ? o : Hn(r.plugins, i.astFormat), s = await Jn(D, i.astFormat);
    r.printer = s, r.getVisitorKeys = s.getVisitorKeys;
    let a = D.defaultOptions ? Object.fromEntries(Object.entries(D.defaultOptions).filter(([, p]) => p !== void 0)) : {}, c = { ...u, ...a };
    for (let [p, l] of Object.entries(c)) r[p] ?? (r[p] = l);
    return r.parser === "json" && (r.trailingComma = "none"), $n(r, n, { passThrough: Object.keys(qn), ...e });
  }
  var se = ui;
  var Xn = /\r\n|[\n\r\u2028\u2029]/;
  function oi(t, e, r, n) {
    let u = { column: null, line: -1, ...t.start }, o = { ...u, ...t.end }, { linesAbove: i = 2, linesBelow: D = 3 } = r || {}, s = u.line - n, a = u.column, c = o.line - n, p = o.column, l = Math.max(s - (i + 1), 0), m = Math.min(e.length, c + D);
    s === -1 && (l = 0), c === -1 && (m = e.length);
    let f = c - s, F = {};
    if (f) for (let d = 0; d <= f; d++) {
      let E = d + s;
      if (a == null) F[E] = true;
      else if (d === 0) {
        let C = e[E - 1].length;
        F[E] = [a, C - a];
      } else if (d === f) F[E] = [0, p];
      else {
        let C = e[E - 1].length;
        F[E] = [0, C];
      }
    }
    else if (a === p) a != null ? F[s] = [a, 0] : F[s] = true;
    else {
      let d = a ?? 0, E = p ?? d;
      F[s] = [d, E - d];
    }
    return { start: l, end: m, markerLines: F };
  }
  function Qn(t, e, r = {}, n) {
    let { defs: u, highlight: o } = n || { defs: { gutter: String, marker: String, message: String, reset: String }, highlight: String }, i = (r.startLine || 1) - 1, D = t.split(Xn), { start: s, end: a, markerLines: c } = oi(e, D, r, i), p = e.start && typeof e.start.column == "number", l = String(a + i).length, f = o(t).split(Xn, a).slice(s, a).map((F, d) => {
      let E = s + 1 + d, h = ` ${` ${E + i}`.slice(-l)} |`, _ = c[E], P = !c[E + 1];
      if (_) {
        let A = "";
        if (Array.isArray(_)) {
          let B = F.slice(0, _[0]).replace(/[^\t]/g, " "), J = _[1] || 1;
          A = [`
 `, u.gutter(h.replace(/\d/g, " ")), " ", B, u.marker("^").repeat(J)].join(""), P && r.message && (A += " " + u.message(r.message));
        }
        return [u.marker(">"), u.gutter(h), F.length > 0 ? ` ${F}` : "", A].join("");
      } else return ` ${u.gutter(h)}${F.length > 0 ? ` ${F}` : ""}`;
    }).join(`
`);
    return r.message && !p && (f = `${" ".repeat(l + 1)}${r.message}
${f}`), u.reset(f);
  }
  function Zn(t, e, r = {}) {
    return Qn(t, e, r);
  }
  async function ii(t, e) {
    let r = await Ue(e), n = r.preprocess ? await r.preprocess(t, e) : t;
    e.originalText = n;
    let u;
    try {
      u = await r.parse(n, e, e);
    } catch (o) {
      si(o, t);
    }
    return { text: n, ast: u };
  }
  function si(t, e) {
    let { loc: r } = t;
    if (r) {
      let { start: n, end: u } = r;
      n && (n = { line: n.line, column: n.column - 1 }), u && (u = { line: u.line, column: u.column - 1 });
      let o = Zn(e, { start: n, end: u }, { highlightCode: true });
      t.message += `
` + o, t.codeFrame = o;
    }
    throw t;
  }
  var me = ii;
  async function eu(t, e, r, n, u) {
    if (r.embeddedLanguageFormatting !== "auto") return;
    let { printer: o } = r, { embed: i } = o;
    if (!i) return;
    if (i.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed");
    let { hasPrettierIgnore: D } = o, { getVisitorKeys: s } = i, a = [];
    l();
    let c = t.stack;
    for (let { print: m, node: f, pathStack: F } of a) try {
      t.stack = F;
      let d = await m(p, e, t, r);
      d && u.set(f, d);
    } catch (d) {
      if (globalThis.PRETTIER_DEBUG) throw d;
    }
    t.stack = c;
    function p(m, f) {
      return Di(m, f, r, n);
    }
    function l() {
      let { node: m } = t;
      if (m === null || typeof m != "object" || D?.(t)) return;
      for (let F of s(m)) Array.isArray(m[F]) ? t.each(l, F) : t.call(l, F);
      let f = i(t, r);
      if (f) {
        if (typeof f == "function") {
          a.push({ print: f, node: m, pathStack: [...t.stack] });
          return;
        }
        u.set(m, f);
      }
    }
  }
  async function Di(t, e, r, n) {
    let u = await se({ ...r, ...e, parentParser: r.parser, originalText: t, cursorOffset: void 0, rangeStart: void 0, rangeEnd: void 0 }, { passThrough: true }), { ast: o } = await me(t, u), i = await n(o, u);
    return He(i);
  }
  function ai(t, e, r, n) {
    let { originalText: u, [ue]: o, locStart: i, locEnd: D, [/* @__PURE__ */ Symbol.for("printedComments")]: s } = e, { node: a } = t, c = i(a), p = D(a);
    for (let m of o) i(m) >= c && D(m) <= p && s.add(m);
    let { printPrettierIgnored: l } = e.printer;
    return l ? l(t, e, r, n) : u.slice(c, p);
  }
  var tu = ai;
  async function Ve(t, e) {
    ({ ast: t } = await ur(t, e));
    let r = /* @__PURE__ */ new Map(), n = new en(t), u = dn(e), o = /* @__PURE__ */ new Map();
    await eu(n, D, e, Ve, o);
    let i = await ru(n, e, D, void 0, o);
    if (mn(e), e.cursorOffset >= 0) {
      if (e.nodeAfterCursor && !e.nodeBeforeCursor) return [ee, i];
      if (e.nodeBeforeCursor && !e.nodeAfterCursor) return [i, ee];
    }
    return i;
    function D(a, c) {
      return a === void 0 || a === n ? s(c) : Array.isArray(a) ? n.call(() => s(c), ...a) : n.call(() => s(c), a);
    }
    function s(a) {
      u(n);
      let c = n.node;
      if (c == null) return "";
      let p = ge(c) && a === void 0;
      if (p && r.has(c)) return r.get(c);
      let l = ru(n, e, D, a, o);
      return p && r.set(c, l), l;
    }
  }
  function ru(t, e, r, n, u) {
    let { node: o } = t, { printer: i } = e, D;
    switch (i.hasPrettierIgnore?.(t) ? D = tu(t, e, r, n) : u.has(o) ? D = u.get(o) : D = i.print(t, e, r, n), o) {
      case e.cursorNode:
        D = Ee(D, (s) => [ee, s, ee]);
        break;
      case e.nodeBeforeCursor:
        D = Ee(D, (s) => [s, ee]);
        break;
      case e.nodeAfterCursor:
        D = Ee(D, (s) => [ee, s]);
        break;
    }
    return i.printComment && rt(o.comments) && !i.willPrintOwnComments?.(t, e) && (D = pn(t, D, e)), D;
  }
  async function ur(t, e) {
    let r = t.comments ?? [];
    e[ue] = r, e[/* @__PURE__ */ Symbol.for("printedComments")] = /* @__PURE__ */ new Set(), an(t, e);
    let { printer: { preprocess: n } } = e;
    return t = n ? await n(t, e) : t, { ast: t, comments: r };
  }
  function ci(t, e) {
    let { cursorOffset: r, locStart: n, locEnd: u, getVisitorKeys: o } = e, i = (m) => n(m) <= r && u(m) >= r, D = t, s = [t];
    for (let m of nn(t, { getVisitorKeys: o, filter: i })) s.push(m), D = m;
    if (un(D, { getVisitorKeys: o })) return { cursorNode: D };
    let a, c, p = -1, l = Number.POSITIVE_INFINITY;
    for (; s.length > 0 && (a === void 0 || c === void 0); ) {
      D = s.pop();
      let m = a !== void 0, f = c !== void 0;
      for (let F of ye(D, { getVisitorKeys: o })) {
        if (!m) {
          let d = u(F);
          d <= r && d > p && (a = F, p = d);
        }
        if (!f) {
          let d = n(F);
          d >= r && d < l && (c = F, l = d);
        }
      }
    }
    return { nodeBeforeCursor: a, nodeAfterCursor: c };
  }
  var or = ci;
  function fi(t, e) {
    let { printer: r } = e, n = r.massageAstNode;
    if (!n) return t;
    let { getVisitorKeys: u } = r, { ignoredProperties: o } = n;
    return i(t);
    function i(D, s) {
      if (!ge(D)) return D;
      if (Array.isArray(D)) return D.map((l) => i(l, s)).filter(Boolean);
      let a = {}, c = new Set(u(D));
      for (let l in D) !le(D, l) || o?.has(l) || (c.has(l) ? a[l] = i(D[l], D) : a[l] = D[l]);
      let p = n(D, a, s);
      if (p !== null) return p ?? a;
    }
  }
  var nu = fi;
  var li = Array.prototype.findLastIndex ?? function(t) {
    for (let e = this.length - 1; e >= 0; e--) {
      let r = this[e];
      if (t(r, e, this)) return e;
    }
    return -1;
  };
  var pi = X("findLastIndex", function() {
    if (Array.isArray(this)) return li;
  });
  var uu = pi;
  function mi(t, e) {
    return e = new Set(e), t.find((r) => su.has(r.type) && e.has(r));
  }
  function ou(t) {
    let e = uu(0, t, (r) => r.type !== "Program" && r.type !== "File");
    return e === -1 ? t : t.slice(0, e + 1);
  }
  function di(t, e, { locStart: r, locEnd: n }) {
    let [u, ...o] = t, [i, ...D] = e;
    if (u === i) return [u, i];
    let s = r(u);
    for (let c of ou(D)) if (r(c) >= s) i = c;
    else break;
    let a = n(i);
    for (let c of ou(o)) {
      if (n(c) <= a) u = c;
      else break;
      if (u === i) break;
    }
    return [u, i];
  }
  function ir(t, e, r, n, u = [], o, i) {
    let { locStart: D, locEnd: s } = i, a = D(t), c = s(t);
    if (e > c || e < a || o === "rangeEnd" && e === a || o === "rangeStart" && e === c) return;
    let p = [t, ...u], l = ot(t, p, { cache: Ut, locStart: D, locEnd: s, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes });
    for (let m of l) {
      let f = ir(m, e, r, n, p, o, i);
      if (f) return f;
    }
    if (n(t, u[0])) return p;
  }
  function Fi(t, e) {
    return e !== "DeclareExportDeclaration" && t !== "TypeParameterDeclaration" && (t === "Directive" || t === "TypeAlias" || t === "TSExportAssignment" || t.startsWith("Declare") || t.startsWith("TSDeclare") || t.endsWith("Statement") || t.endsWith("Declaration"));
  }
  var su = /* @__PURE__ */ new Set(["JsonRoot", "ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]);
  var Ei = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
  function iu(t, e, r) {
    if (!e) return false;
    switch (t.parser) {
      case "flow":
      case "hermes":
      case "babel":
      case "babel-flow":
      case "babel-ts":
      case "typescript":
      case "acorn":
      case "espree":
      case "meriyah":
      case "oxc":
      case "oxc-ts":
      case "yuku":
      case "yuku-ts":
      case "__babel_estree":
        return Fi(e.type, r?.type);
      case "json":
      case "json5":
      case "jsonc":
      case "json-stringify":
        return su.has(e.type);
      case "graphql":
        return Ei.has(e.kind);
      case "vue":
        return e.tag !== "root";
    }
    return false;
  }
  function Du(t, e, r) {
    let { rangeStart: n, rangeEnd: u } = e;
    k(u > n);
    let o = t.slice(n, u).search(/\S/), i = o === -1;
    if (!i) for (n += o; u > n && !/\S/.test(t[u - 1]); --u) ;
    let D = e.printer.features?.experimental_locForRangeFormat ?? e, s = ir(r, n, e, (f, F) => iu(e, f, F), [], "rangeStart", D);
    if (!s) return;
    let a = i ? s : ir(r, u, e, (f) => iu(e, f), [], "rangeEnd", D);
    if (!a) return;
    let c, p;
    if (r.type === "JsonRoot") {
      let f = mi(s, a);
      c = f, p = f;
    } else [c, p] = di(s, a, e);
    let { locStart: l, locEnd: m } = D;
    return [Math.min(l(c), l(p)), Math.max(m(c), m(p))];
  }
  var lu = "\uFEFF";
  var au = /* @__PURE__ */ Symbol("cursor");
  async function pu(t, e, r = 0) {
    if (!t || t.trim().length === 0) return { formatted: "", cursorOffset: -1, comments: [] };
    let { ast: n, text: u } = await me(t, e);
    e.cursorOffset >= 0 && (e = { ...e, ...or(n, e) });
    let o = await Ve(n, e, r);
    r > 0 && (o = Qe([W, o], r, e.tabWidth));
    let i = Ce(o, e);
    if (r > 0) {
      let s = i.formatted.trim();
      i.cursorNodeStart !== void 0 && (i.cursorNodeStart -= i.formatted.indexOf(s), i.cursorNodeStart < 0 && (i.cursorNodeStart = 0, i.cursorNodeText = i.cursorNodeText.trimStart()), i.cursorNodeStart + i.cursorNodeText.length > s.length && (i.cursorNodeText = i.cursorNodeText.trimEnd())), i.formatted = s + we(e.endOfLine);
    }
    let D = e[ue];
    if (e.cursorOffset >= 0) {
      let s, a, c, p;
      if ((e.cursorNode || e.nodeBeforeCursor || e.nodeAfterCursor) && i.cursorNodeText) if (c = i.cursorNodeStart, p = i.cursorNodeText, e.cursorNode) s = e.locStart(e.cursorNode), a = u.slice(s, e.locEnd(e.cursorNode));
      else {
        if (!e.nodeBeforeCursor && !e.nodeAfterCursor) throw new Error("Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor");
        s = e.nodeBeforeCursor ? e.locEnd(e.nodeBeforeCursor) : 0;
        let E = e.nodeAfterCursor ? e.locStart(e.nodeAfterCursor) : u.length;
        a = u.slice(s, E);
      }
      else s = 0, a = u, c = 0, p = i.formatted;
      let l = e.cursorOffset - s;
      if (a === p) return { formatted: i.formatted, cursorOffset: c + l, comments: D };
      let m = a.split("");
      m.splice(l, 0, au);
      let f = p.split(""), F = xt(m, f), d = c;
      for (let E of F) if (E.removed) {
        if (E.value.includes(au)) break;
      } else d += E.count;
      return { formatted: i.formatted, cursorOffset: d, comments: D };
    }
    return { formatted: i.formatted, cursorOffset: -1, comments: D };
  }
  async function Ci(t, e) {
    let { ast: r, text: n } = await me(t, e), [u, o] = Du(n, e, r) ?? [0, 0], i = n.slice(u, o), D = Math.min(u, n.lastIndexOf(`
`, u) + 1), s = n.slice(D, u).match(/^\s*/)[0], a = he(s, e.tabWidth), c = await pu(i, { ...e, rangeStart: 0, rangeEnd: Number.POSITIVE_INFINITY, cursorOffset: e.cursorOffset > u && e.cursorOffset <= o ? e.cursorOffset - u : -1, endOfLine: "lf" }, a), p = c.formatted.trimEnd(), { cursorOffset: l } = e;
    l > o ? l += p.length - i.length : c.cursorOffset >= 0 && (l = c.cursorOffset + u);
    let m = n.slice(0, u) + p + n.slice(o);
    if (e.endOfLine !== "lf") {
      let f = we(e.endOfLine);
      l >= 0 && f === `\r
` && (l += Tt(m.slice(0, l), `
`)), m = ne(0, m, `
`, f);
    }
    return { formatted: m, cursorOffset: l, comments: c.comments };
  }
  function sr(t, e, r) {
    return typeof e != "number" || Number.isNaN(e) || e < 0 || e > t.length ? r : e;
  }
  function cu(t, e) {
    let { cursorOffset: r, rangeStart: n, rangeEnd: u } = e;
    return r = sr(t, r, -1), n = sr(t, n, 0), u = sr(t, u, t.length), { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u };
  }
  function mu(t, e) {
    let { cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o } = cu(t, e), i = t.charAt(0) === lu;
    if (i && (t = t.slice(1), r--, n--, u--), o === "auto" && (o = Cr(t)), t.includes("\r")) {
      let D = (s) => Tt(t.slice(0, Math.max(s, 0)), `\r
`);
      r -= D(r), n -= D(n), u -= D(u), t = hr(t);
    }
    return { hasBOM: i, text: t, options: cu(t, { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o }) };
  }
  async function fu(t, e) {
    let r = await Ue(e);
    return !r.hasPragma || r.hasPragma(t);
  }
  async function hi(t, e) {
    return (await Ue(e)).hasIgnorePragma?.(t);
  }
  async function Dr(t, e) {
    let { hasBOM: r, text: n, options: u } = mu(t, await se(e));
    if (u.rangeStart >= u.rangeEnd && n !== "" || u.requirePragma && !await fu(n, u) || u.checkIgnorePragma && await hi(n, u)) return { formatted: t, cursorOffset: e.cursorOffset, comments: [] };
    let o;
    return u.rangeStart > 0 || u.rangeEnd < n.length ? o = await Ci(n, u) : (!u.requirePragma && u.insertPragma && u.printer.insertPragma && !await fu(n, u) && (n = u.printer.insertPragma(n)), o = await pu(n, u)), r && (o.formatted = lu + o.formatted, o.cursorOffset >= 0 && o.cursorOffset++), o;
  }
  async function du(t, e, r) {
    let { text: n, options: u } = mu(t, await se(e)), o = await me(n, u);
    return r && (r.preprocessForPrint && (o.ast = await ur(o.ast, u)), r.massage && (o.ast = nu(o.ast, u))), o;
  }
  async function Fu(t, e) {
    e = await se(e);
    let r = await Ve(t, e);
    return Ce(r, e);
  }
  async function Eu(t, e) {
    let r = Ur(t), { formatted: n } = await Dr(r, { ...e, parser: "__js_expression" });
    return n;
  }
  async function Cu(t, e) {
    e = await se(e);
    let { ast: r } = await me(t, e);
    return e.cursorOffset >= 0 && (e = { ...e, ...or(r, e) }), Ve(r, e);
  }
  async function hu(t, e) {
    return Ce(t, await se(e));
  }
  var ar = {};
  yt(ar, { builders: () => _i, printer: () => yi, utils: () => Ai });
  var _i = { join: be, line: Ze, softline: Mr, hardline: W, literalline: Je, group: wt, conditionalGroup: Ir, fill: kr, lineSuffix: Ie, lineSuffixBoundary: Yr, cursor: ee, breakParent: ae, ifBreak: Rr, trim: jr, indent: oe, indentIfBreak: vr, align: De, addAlignmentToDoc: Qe, markAsRoot: Xe, dedentToRoot: Sr, dedent: br, hardlineWithoutBreakParent: ke, literallineWithoutBreakParent: Ot, label: Lr, concat: (t) => t };
  var yi = { printDocToString: Ce };
  var Ai = { willBreak: xr, traverseDoc: Oe, findInDoc: Ke, mapDoc: Se, removeLines: Tr, stripTrailingHardline: He, replaceEndOfLine: Nr, canBreak: wr };
  var gu = "3.9.6";
  var fr = {};
  yt(fr, { addDanglingComment: () => re, addLeadingComment: () => ce, addTrailingComment: () => fe, getAlignmentSize: () => he, getIndentSize: () => _u, getMaxContinuousCount: () => yu, getNextNonSpaceNonCommentCharacter: () => Au, getNextNonSpaceNonCommentCharacterIndex: () => vi, getPreferredQuote: () => Tu, getStringWidth: () => Re, hasNewline: () => H, hasNewlineInRange: () => Nu, hasSpaces: () => wu, isNextLineEmpty: () => Ui, isNextLineEmptyAfterIndex: () => gt, isPreviousLineEmpty: () => Mi, makeString: () => ji, skip: () => _e, skipEverythingButNewLine: () => ut, skipInlineComment: () => Be, skipNewline: () => $, skipSpaces: () => j, skipToLineEnd: () => nt, skipTrailingComment: () => Te, skipWhitespace: () => tn });
  function xi(t, e) {
    if (e === false) return false;
    if (t.charAt(e) === "/" && t.charAt(e + 1) === "*") {
      for (let r = e + 2; r < t.length; ++r) if (t.charAt(r) === "*" && t.charAt(r + 1) === "/") return r + 2;
    }
    return e;
  }
  var Be = xi;
  function Bi(t, e) {
    return e === false ? false : t.charAt(e) === "/" && t.charAt(e + 1) === "/" ? ut(t, e) : e;
  }
  var Te = Bi;
  function Ti(t, e) {
    let r = null, n = e;
    for (; n !== r; ) r = n, n = j(t, n), n = Be(t, n), n = Te(t, n), n = $(t, n);
    return n;
  }
  var We = Ti;
  function Ni(t, e) {
    let r = null, n = e;
    for (; n !== r; ) r = n, n = nt(t, n), n = Be(t, n), n = j(t, n);
    return n = Te(t, n), n = $(t, n), n !== false && H(t, n);
  }
  var gt = Ni;
  function wi(t, e) {
    let r = t.lastIndexOf(`
`);
    return r === -1 ? 0 : he(t.slice(r + 1).match(/^[\t ]*/)[0], e);
  }
  var _u = wi;
  function cr(t) {
    if (typeof t != "string") throw new TypeError("Expected a string");
    return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  function Oi(t, e) {
    let r = t.matchAll(new RegExp(`(?:${cr(e)})+`, "g"));
    return r.reduce || (r = [...r]), r.reduce((n, [u]) => Math.max(n, u.length), 0) / e.length;
  }
  var yu = Oi;
  function Pi(t, e) {
    let r = We(t, e);
    return r === false ? "" : t.charAt(r);
  }
  var Au = Pi;
  var xu = Object.freeze({ character: "'", codePoint: 39 });
  var Bu = Object.freeze({ character: '"', codePoint: 34 });
  var Si = Object.freeze({ preferred: xu, alternate: Bu });
  var bi = Object.freeze({ preferred: Bu, alternate: xu });
  function Tu(t, e) {
    let { preferred: r, alternate: n } = e === true || e === "'" ? Si : bi, { length: u } = t, o = 0, i = 0;
    for (let D = 0; D < u; D++) {
      let s = t.charCodeAt(D);
      s === r.codePoint ? o++ : s === n.codePoint && i++;
    }
    return (o > i ? n : r).character;
  }
  function ki(t, e, r) {
    for (let n = e; n < r; ++n) if (t.charAt(n) === `
`) return true;
    return false;
  }
  var Nu = ki;
  function Ii(t, e, r = {}) {
    return j(t, r.backwards ? e - 1 : e, r) !== e;
  }
  var wu = Ii;
  function Ri(t, e, r) {
    return We(t, r(e));
  }
  function vi(t, e) {
    return arguments.length === 2 || typeof e == "number" ? We(t, e) : Ri(...arguments);
  }
  function Li(t, e, r) {
    return ve(t, r(e));
  }
  function Mi(t, e) {
    return arguments.length === 2 || typeof e == "number" ? ve(t, e) : Li(...arguments);
  }
  function Yi(t, e, r) {
    return gt(t, r(e));
  }
  function ji(t, e, r) {
    let n = e === '"' ? "'" : '"', o = ne(0, t, /\\(.)|(["'])/gs, (i, D, s) => D === n ? D : s === e ? "\\" + s : s || (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(D) ? D : "\\" + D));
    return e + o + e;
  }
  function Ui(t, e) {
    return arguments.length === 2 || typeof e == "number" ? gt(t, e) : Yi(...arguments);
  }
  function de(t, e = 1) {
    return async (...r) => {
      let n = r[e] ?? {}, u = n.plugins ?? [];
      return r[e] = { ...n, plugins: Array.isArray(u) ? u : Object.values(u) }, await t(...r);
    };
  }
  var Ou = de(Dr);
  async function Pu(t, e) {
    let { formatted: r } = await Ou(t, { ...e, cursorOffset: -1 });
    return r;
  }
  async function Vi(t, e) {
    return await Pu(t, e) === t;
  }
  var Wi = de(it, 0);
  var $i = { parse: de(du), formatAST: de(Fu), formatDoc: de(Eu), printToDoc: de(Cu), printDocToString: de(hu) };

  // entry.js
  var import_plugin_php = __toESM(require_standalone2());
  window.PrettierExtra = { format: Pu, plugins: [import_plugin_php.default] };
})();
