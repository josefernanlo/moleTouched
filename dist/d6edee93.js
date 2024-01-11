/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const D = window,
  Y =
    D.ShadowRoot &&
    (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  mt = Symbol(),
  gt = new WeakMap();
class ve {
  constructor(t, e, s) {
    if (((this._$cssResult$ = !0), s !== mt))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Y && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = gt.get(e)),
        t === void 0 &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          s && gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const _e = n => new ve(typeof n == 'string' ? n : n + '', void 0, mt),
  Ae = (n, t) => {
    Y
      ? (n.adoptedStyleSheets = t.map(e =>
          e instanceof CSSStyleSheet ? e : e.styleSheet
        ))
      : t.forEach(e => {
          const s = document.createElement('style'),
            i = D.litNonce;
          i !== void 0 && s.setAttribute('nonce', i),
            (s.textContent = e.cssText),
            n.appendChild(s);
        });
  },
  Et = Y
    ? n => n
    : n =>
        n instanceof CSSStyleSheet
          ? (t => {
              let e = '';
              for (const s of t.cssRules) e += s.cssText;
              return _e(e);
            })(n)
          : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var tt;
const V = window,
  St = V.trustedTypes,
  fe = St ? St.emptyScript : '',
  bt = V.reactiveElementPolyfillSupport,
  et = {
    toAttribute(n, t) {
      switch (t) {
        case Boolean:
          n = n ? fe : null;
          break;
        case Object:
        case Array:
          n = n == null ? n : JSON.stringify(n);
      }
      return n;
    },
    fromAttribute(n, t) {
      let e = n;
      switch (t) {
        case Boolean:
          e = n !== null;
          break;
        case Number:
          e = n === null ? null : Number(n);
          break;
        case Object:
        case Array:
          try {
            e = JSON.parse(n);
          } catch (s) {
            e = null;
          }
      }
      return e;
    },
  },
  wt = (n, t) => t !== n && (t == t || n == n),
  st = {
    attribute: !0,
    type: String,
    converter: et,
    reflect: !1,
    hasChanged: wt,
  },
  it = 'finalized';
class O extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this._$Eu();
  }
  static addInitializer(t) {
    var e;
    this.finalize(),
      ((e = this.h) !== null && e !== void 0 ? e : (this.h = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, s) => {
        const i = this._$Ep(s, e);
        i !== void 0 && (this._$Ev.set(i, s), t.push(i));
      }),
      t
    );
  }
  static createProperty(t, e = st) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = typeof t == 'symbol' ? Symbol() : '__' + t,
        i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Object.defineProperty(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return {
      get() {
        return this[e];
      },
      set(i) {
        const r = this[t];
        (this[e] = i), this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || st;
  }
  static finalize() {
    if (this.hasOwnProperty(it)) return !1;
    this[it] = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      t.h !== void 0 && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const e = this.properties,
        s = [
          ...Object.getOwnPropertyNames(e),
          ...Object.getOwnPropertySymbols(e),
        ];
      for (const i of s) this.createProperty(i, e[i]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(Et(i));
    } else t !== void 0 && e.push(Et(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return s === !1
      ? void 0
      : typeof s == 'string'
      ? s
      : typeof t == 'string'
      ? t.toLowerCase()
      : void 0;
  }
  _$Eu() {
    var t;
    (this._$E_ = new Promise(e => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      (t = this.constructor.h) === null ||
        t === void 0 ||
        t.forEach(e => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$ES) !== null && e !== void 0 ? e : (this._$ES = [])).push(t),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((s = t.hostConnected) === null || s === void 0 || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null ||
      e === void 0 ||
      e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e =
      (t = this.shadowRoot) !== null && t !== void 0
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return Ae(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (t = this._$ES) === null ||
        t === void 0 ||
        t.forEach(e => {
          var s;
          return (s = e.hostConnected) === null || s === void 0
            ? void 0
            : s.call(e);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null ||
      t === void 0 ||
      t.forEach(e => {
        var s;
        return (s = e.hostDisconnected) === null || s === void 0
          ? void 0
          : s.call(e);
      });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = st) {
    var i;
    const r = this.constructor._$Ep(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (
        ((i = s.converter) === null || i === void 0
          ? void 0
          : i.toAttribute) !== void 0
          ? s.converter
          : et
      ).toAttribute(e, s.type);
      (this._$El = t),
        o == null ? this.removeAttribute(r) : this.setAttribute(r, o),
        (this._$El = null);
    }
  }
  _$AK(t, e) {
    var s;
    const i = this.constructor,
      r = i._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = i.getPropertyOptions(r),
        a =
          typeof o.converter == 'function'
            ? { fromAttribute: o.converter }
            : ((s = o.converter) === null || s === void 0
                ? void 0
                : s.fromAttribute) !== void 0
            ? o.converter
            : et;
      (this._$El = r),
        (this[r] = a.fromAttribute(e, o.type)),
        (this._$El = null);
    }
  }
  requestUpdate(t, e, s) {
    let i = !0;
    t !== void 0 &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || wt)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          s.reflect === !0 &&
            this._$El !== t &&
            (this._$EC === void 0 && (this._$EC = new Map()),
            this._$EC.set(t, s)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((i, r) => (this[r] = i)), (this._$Ei = void 0));
    let e = !1;
    const s = this._$AL;
    try {
      (e = this.shouldUpdate(s)),
        e
          ? (this.willUpdate(s),
            (t = this._$ES) === null ||
              t === void 0 ||
              t.forEach(i => {
                var r;
                return (r = i.hostUpdate) === null || r === void 0
                  ? void 0
                  : r.call(i);
              }),
            this.update(s))
          : this._$Ek();
    } catch (i) {
      throw ((e = !1), this._$Ek(), i);
    }
    e && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    (e = this._$ES) === null ||
      e === void 0 ||
      e.forEach(s => {
        var i;
        return (i = s.hostUpdated) === null || i === void 0
          ? void 0
          : i.call(s);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 &&
      (this._$EC.forEach((e, s) => this._$EO(s, this[s], e)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
(O[it] = !0),
  (O.elementProperties = new Map()),
  (O.elementStyles = []),
  (O.shadowRootOptions = { mode: 'open' }),
  bt == null || bt({ ReactiveElement: O }),
  ((tt = V.reactiveElementVersions) !== null && tt !== void 0
    ? tt
    : (V.reactiveElementVersions = [])
  ).push('1.6.3');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var nt;
const W = window,
  w = W.trustedTypes,
  Ct = w ? w.createPolicy('lit-html', { createHTML: n => n }) : void 0,
  ot = '$lit$',
  A = 'lit$'.concat((Math.random() + '').slice(9), '$'),
  xt = '?' + A,
  ye = '<'.concat(xt, '>'),
  y = document,
  q = () => y.createComment(''),
  T = n => n === null || (typeof n != 'object' && typeof n != 'function'),
  Ut = Array.isArray,
  me = n =>
    Ut(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == 'function',
  rt = '[ 	\n\f\r]',
  M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  Pt = /-->/g,
  Ht = />/g,
  m = RegExp(
    '>|'
      .concat(rt, '(?:([^\\s"\'>=/]+)(')
      .concat(rt, '*=')
      .concat(rt, '*(?:[^ 	\n\f\r"\'`<>=]|("|\')|))|$)'),
    'g'
  ),
  Nt = /'/g,
  Ot = /"/g,
  Tt = /^(?:script|style|textarea|title)$/i,
  R = Symbol.for('lit-noChange'),
  $ = Symbol.for('lit-nothing'),
  Mt = new WeakMap(),
  g = y.createTreeWalker(y, 129, null, !1);
function Rt(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return Ct !== void 0 ? Ct.createHTML(t) : t;
}
const ge = (n, t) => {
  const e = n.length - 1,
    s = [];
  let i,
    r = t === 2 ? '<svg>' : '',
    o = M;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let h,
      d,
      c = -1,
      u = 0;
    for (; u < l.length && ((o.lastIndex = u), (d = o.exec(l)), d !== null); )
      (u = o.lastIndex),
        o === M
          ? d[1] === '!--'
            ? (o = Pt)
            : d[1] !== void 0
            ? (o = Ht)
            : d[2] !== void 0
            ? (Tt.test(d[2]) && (i = RegExp('</' + d[2], 'g')), (o = m))
            : d[3] !== void 0 && (o = m)
          : o === m
          ? d[0] === '>'
            ? ((o = i != null ? i : M), (c = -1))
            : d[1] === void 0
            ? (c = -2)
            : ((c = o.lastIndex - d[2].length),
              (h = d[1]),
              (o = d[3] === void 0 ? m : d[3] === '"' ? Ot : Nt))
          : o === Ot || o === Nt
          ? (o = m)
          : o === Pt || o === Ht
          ? (o = M)
          : ((o = m), (i = void 0));
    const p = o === m && n[a + 1].startsWith('/>') ? ' ' : '';
    r +=
      o === M
        ? l + ye
        : c >= 0
        ? (s.push(h), l.slice(0, c) + ot + l.slice(c) + A + p)
        : l + A + (c === -2 ? (s.push(void 0), a) : p);
  }
  return [Rt(n, r + (n[e] || '<?>') + (t === 2 ? '</svg>' : '')), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0,
      o = 0;
    const a = t.length - 1,
      l = this.parts,
      [h, d] = ge(t, e);
    if (
      ((this.el = z.createElement(h, s)),
      (g.currentNode = this.el.content),
      e === 2)
    ) {
      const c = this.el.content,
        u = c.firstChild;
      u.remove(), c.append(...u.childNodes);
    }
    for (; (i = g.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) {
          const c = [];
          for (const u of i.getAttributeNames())
            if (u.endsWith(ot) || u.startsWith(A)) {
              const p = d[o++];
              if ((c.push(u), p !== void 0)) {
                const X = i.getAttribute(p.toLowerCase() + ot).split(A),
                  _ = /([.?@])?(.*)/.exec(p);
                l.push({
                  type: 1,
                  index: r,
                  name: _[2],
                  strings: X,
                  ctor:
                    _[1] === '.'
                      ? Se
                      : _[1] === '?'
                      ? we
                      : _[1] === '@'
                      ? Ce
                      : Z,
                });
              } else l.push({ type: 6, index: r });
            }
          for (const u of c) i.removeAttribute(u);
        }
        if (Tt.test(i.tagName)) {
          const c = i.textContent.split(A),
            u = c.length - 1;
          if (u > 0) {
            i.textContent = w ? w.emptyScript : '';
            for (let p = 0; p < u; p++)
              i.append(c[p], q()),
                g.nextNode(),
                l.push({ type: 2, index: ++r });
            i.append(c[u], q());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === xt) l.push({ type: 2, index: r });
        else {
          let c = -1;
          for (; (c = i.data.indexOf(A, c + 1)) !== -1; )
            l.push({ type: 7, index: r }), (c += A.length - 1);
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function C(n, t, e = n, s) {
  var i, r, o, a;
  if (t === R) return t;
  let l =
    s !== void 0
      ? (i = e._$Co) === null || i === void 0
        ? void 0
        : i[s]
      : e._$Cl;
  const h = T(t) ? void 0 : t._$litDirective$;
  return (
    (l == null ? void 0 : l.constructor) !== h &&
      ((r = l == null ? void 0 : l._$AO) === null ||
        r === void 0 ||
        r.call(l, !1),
      h === void 0 ? (l = void 0) : ((l = new h(n)), l._$AT(n, e, s)),
      s !== void 0
        ? (((o = (a = e)._$Co) !== null && o !== void 0 ? o : (a._$Co = []))[
            s
          ] = l)
        : (e._$Cl = l)),
    l !== void 0 && (t = C(n, l._$AS(n, t.values), l, s)),
    t
  );
}
class Ee {
  constructor(t, e) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const {
        el: { content: s },
        parts: i,
      } = this._$AD,
      r = (
        (e = t == null ? void 0 : t.creationScope) !== null && e !== void 0
          ? e
          : y
      ).importNode(s, !0);
    g.currentNode = r;
    let o = g.nextNode(),
      a = 0,
      l = 0,
      h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let d;
        h.type === 2
          ? (d = new Q(o, o.nextSibling, this, t))
          : h.type === 1
          ? (d = new h.ctor(o, h.name, h.strings, this, t))
          : h.type === 6 && (d = new xe(o, this, t)),
          this._$AV.push(d),
          (h = i[++l]);
      }
      a !== (h == null ? void 0 : h.index) && ((o = g.nextNode()), a++);
    }
    return (g.currentNode = y), r;
  }
  v(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 &&
        (s.strings !== void 0
          ? (s._$AI(t, s, e), (e += s.strings.length - 2))
          : s._$AI(t[e])),
        e++;
  }
}
class Q {
  constructor(t, e, s, i) {
    var r;
    (this.type = 2),
      (this._$AH = $),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = s),
      (this.options = i),
      (this._$Cp =
        (r = i == null ? void 0 : i.isConnected) === null || r === void 0 || r);
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !==
      null && e !== void 0
      ? e
      : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return (
      e !== void 0 &&
        (t == null ? void 0 : t.nodeType) === 11 &&
        (t = e.parentNode),
      t
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = C(this, t, e)),
      T(t)
        ? t === $ || t == null || t === ''
          ? (this._$AH !== $ && this._$AR(), (this._$AH = $))
          : t !== this._$AH && t !== R && this._(t)
        : t._$litType$ !== void 0
        ? this.g(t)
        : t.nodeType !== void 0
        ? this.$(t)
        : me(t)
        ? this.T(t)
        : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
  }
  _(t) {
    this._$AH !== $ && T(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.$(y.createTextNode(t)),
      (this._$AH = t);
  }
  g(t) {
    var e;
    const { values: s, _$litType$: i } = t,
      r =
        typeof i == 'number'
          ? this._$AC(t)
          : (i.el === void 0 &&
              (i.el = z.createElement(Rt(i.h, i.h[0]), this.options)),
            i);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.v(s);
    else {
      const o = new Ee(r, this),
        a = o.u(this.options);
      o.v(s), this.$(a), (this._$AH = o);
    }
  }
  _$AC(t) {
    let e = Mt.get(t.strings);
    return e === void 0 && Mt.set(t.strings, (e = new z(t))), e;
  }
  T(t) {
    Ut(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let s,
      i = 0;
    for (const r of t)
      i === e.length
        ? e.push((s = new Q(this.k(q()), this.k(q()), this, this.options)))
        : (s = e[i]),
        s._$AI(r),
        i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), (e.length = i));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for (
      (s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 &&
      ((this._$Cp = t),
      (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class Z {
  constructor(t, e, s, i, r) {
    (this.type = 1),
      (this._$AH = $),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = i),
      (this.options = r),
      s.length > 2 || s[0] !== '' || s[1] !== ''
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = $);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      (t = C(this, t, e, 0)),
        (o = !T(t) || (t !== this._$AH && t !== R)),
        o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        (h = C(this, a[s + l], e, l)),
          h === R && (h = this._$AH[l]),
          o || (o = !T(h) || h !== this._$AH[l]),
          h === $ ? (t = $) : t !== $ && (t += (h != null ? h : '') + r[l + 1]),
          (this._$AH[l] = h);
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === $
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t != null ? t : '');
  }
}
class Se extends Z {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
const be = w ? w.emptyScript : '';
class we extends Z {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    t && t !== $
      ? this.element.setAttribute(this.name, be)
      : this.element.removeAttribute(this.name);
  }
}
class Ce extends Z {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), (this.type = 5);
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = C(this, t, e, 0)) !== null && s !== void 0 ? s : $) === R)
      return;
    const i = this._$AH,
      r =
        (t === $ && i !== $) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      o = t !== $ && (i === $ || r);
    r && this.element.removeEventListener(this.name, this, i),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == 'function'
      ? this._$AH.call(
          (s =
            (e = this.options) === null || e === void 0 ? void 0 : e.host) !==
            null && s !== void 0
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class xe {
  constructor(t, e, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const kt = W.litHtmlPolyfillSupport;
kt == null || kt(z, Q),
  ((nt = W.litHtmlVersions) !== null && nt !== void 0
    ? nt
    : (W.litHtmlVersions = [])
  ).push('2.8.0');
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const J = window,
  lt =
    J.ShadowRoot &&
    (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  ht = Symbol(),
  jt = new WeakMap();
class Lt {
  constructor(t, e, s) {
    if (((this._$cssResult$ = !0), s !== ht))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (lt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = jt.get(e)),
        t === void 0 &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          s && jt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Ue = n => new Lt(typeof n == 'string' ? n : n + '', void 0, ht),
  zt = (n, ...t) => {
    const e =
      n.length === 1
        ? n[0]
        : t.reduce(
            (s, i, r) =>
              s +
              (o => {
                if (o._$cssResult$ === !0) return o.cssText;
                if (typeof o == 'number') return o;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    o +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(i) +
              n[r + 1],
            n[0]
          );
    return new Lt(e, n, ht);
  },
  Pe = (n, t) => {
    lt
      ? (n.adoptedStyleSheets = t.map(e =>
          e instanceof CSSStyleSheet ? e : e.styleSheet
        ))
      : t.forEach(e => {
          const s = document.createElement('style'),
            i = J.litNonce;
          i !== void 0 && s.setAttribute('nonce', i),
            (s.textContent = e.cssText),
            n.appendChild(s);
        });
  },
  It = lt
    ? n => n
    : n =>
        n instanceof CSSStyleSheet
          ? (t => {
              let e = '';
              for (const s of t.cssRules) e += s.cssText;
              return Ue(e);
            })(n)
          : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var at;
const K = window,
  Bt = K.trustedTypes,
  He = Bt ? Bt.emptyScript : '',
  Dt = K.reactiveElementPolyfillSupport,
  dt = {
    toAttribute(n, t) {
      switch (t) {
        case Boolean:
          n = n ? He : null;
          break;
        case Object:
        case Array:
          n = n == null ? n : JSON.stringify(n);
      }
      return n;
    },
    fromAttribute(n, t) {
      let e = n;
      switch (t) {
        case Boolean:
          e = n !== null;
          break;
        case Number:
          e = n === null ? null : Number(n);
          break;
        case Object:
        case Array:
          try {
            e = JSON.parse(n);
          } catch (s) {
            e = null;
          }
      }
      return e;
    },
  },
  Vt = (n, t) => t !== n && (t == t || n == n),
  ct = {
    attribute: !0,
    type: String,
    converter: dt,
    reflect: !1,
    hasChanged: Vt,
  },
  ut = 'finalized';
class x extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this._$Eu();
  }
  static addInitializer(t) {
    var e;
    this.finalize(),
      ((e = this.h) !== null && e !== void 0 ? e : (this.h = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, s) => {
        const i = this._$Ep(s, e);
        i !== void 0 && (this._$Ev.set(i, s), t.push(i));
      }),
      t
    );
  }
  static createProperty(t, e = ct) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = typeof t == 'symbol' ? Symbol() : '__' + t,
        i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Object.defineProperty(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return {
      get() {
        return this[e];
      },
      set(i) {
        const r = this[t];
        (this[e] = i), this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || ct;
  }
  static finalize() {
    if (this.hasOwnProperty(ut)) return !1;
    this[ut] = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      t.h !== void 0 && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const e = this.properties,
        s = [
          ...Object.getOwnPropertyNames(e),
          ...Object.getOwnPropertySymbols(e),
        ];
      for (const i of s) this.createProperty(i, e[i]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(It(i));
    } else t !== void 0 && e.push(It(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return s === !1
      ? void 0
      : typeof s == 'string'
      ? s
      : typeof t == 'string'
      ? t.toLowerCase()
      : void 0;
  }
  _$Eu() {
    var t;
    (this._$E_ = new Promise(e => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      (t = this.constructor.h) === null ||
        t === void 0 ||
        t.forEach(e => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$ES) !== null && e !== void 0 ? e : (this._$ES = [])).push(t),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((s = t.hostConnected) === null || s === void 0 || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null ||
      e === void 0 ||
      e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e =
      (t = this.shadowRoot) !== null && t !== void 0
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return Pe(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (t = this._$ES) === null ||
        t === void 0 ||
        t.forEach(e => {
          var s;
          return (s = e.hostConnected) === null || s === void 0
            ? void 0
            : s.call(e);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null ||
      t === void 0 ||
      t.forEach(e => {
        var s;
        return (s = e.hostDisconnected) === null || s === void 0
          ? void 0
          : s.call(e);
      });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = ct) {
    var i;
    const r = this.constructor._$Ep(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (
        ((i = s.converter) === null || i === void 0
          ? void 0
          : i.toAttribute) !== void 0
          ? s.converter
          : dt
      ).toAttribute(e, s.type);
      (this._$El = t),
        o == null ? this.removeAttribute(r) : this.setAttribute(r, o),
        (this._$El = null);
    }
  }
  _$AK(t, e) {
    var s;
    const i = this.constructor,
      r = i._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = i.getPropertyOptions(r),
        a =
          typeof o.converter == 'function'
            ? { fromAttribute: o.converter }
            : ((s = o.converter) === null || s === void 0
                ? void 0
                : s.fromAttribute) !== void 0
            ? o.converter
            : dt;
      (this._$El = r),
        (this[r] = a.fromAttribute(e, o.type)),
        (this._$El = null);
    }
  }
  requestUpdate(t, e, s) {
    let i = !0;
    t !== void 0 &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || Vt)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          s.reflect === !0 &&
            this._$El !== t &&
            (this._$EC === void 0 && (this._$EC = new Map()),
            this._$EC.set(t, s)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((i, r) => (this[r] = i)), (this._$Ei = void 0));
    let e = !1;
    const s = this._$AL;
    try {
      (e = this.shouldUpdate(s)),
        e
          ? (this.willUpdate(s),
            (t = this._$ES) === null ||
              t === void 0 ||
              t.forEach(i => {
                var r;
                return (r = i.hostUpdate) === null || r === void 0
                  ? void 0
                  : r.call(i);
              }),
            this.update(s))
          : this._$Ek();
    } catch (i) {
      throw ((e = !1), this._$Ek(), i);
    }
    e && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    (e = this._$ES) === null ||
      e === void 0 ||
      e.forEach(s => {
        var i;
        return (i = s.hostUpdated) === null || i === void 0
          ? void 0
          : i.call(s);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 &&
      (this._$EC.forEach((e, s) => this._$EO(s, this[s], e)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
(x[ut] = !0),
  (x.elementProperties = new Map()),
  (x.elementStyles = []),
  (x.shadowRootOptions = { mode: 'open' }),
  Dt == null || Dt({ ReactiveElement: x }),
  ((at = K.reactiveElementVersions) !== null && at !== void 0
    ? at
    : (K.reactiveElementVersions = [])
  ).push('1.6.3');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var pt;
const F = window,
  U = F.trustedTypes,
  Wt = U ? U.createPolicy('lit-html', { createHTML: n => n }) : void 0,
  $t = '$lit$',
  f = 'lit$'.concat((Math.random() + '').slice(9), '$'),
  qt = '?' + f,
  Ne = '<'.concat(qt, '>'),
  E = document,
  k = () => E.createComment(''),
  j = n => n === null || (typeof n != 'object' && typeof n != 'function'),
  Zt = Array.isArray,
  Oe = n =>
    Zt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == 'function',
  vt = '[ 	\n\f\r]',
  L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  Jt = /-->/g,
  Kt = />/g,
  S = RegExp(
    '>|'
      .concat(vt, '(?:([^\\s"\'>=/]+)(')
      .concat(vt, '*=')
      .concat(vt, '*(?:[^ 	\n\f\r"\'`<>=]|("|\')|))|$)'),
    'g'
  ),
  Ft = /'/g,
  Gt = /"/g,
  Qt = /^(?:script|style|textarea|title)$/i,
  Te =
    n =>
    (t, ...e) => ({ _$litType$: n, strings: t, values: e }),
  Xt = Te(1),
  P = Symbol.for('lit-noChange'),
  v = Symbol.for('lit-nothing'),
  Yt = new WeakMap(),
  b = E.createTreeWalker(E, 129, null, !1);
function te(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return Wt !== void 0 ? Wt.createHTML(t) : t;
}
const Me = (n, t) => {
  const e = n.length - 1,
    s = [];
  let i,
    r = t === 2 ? '<svg>' : '',
    o = L;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let h,
      d,
      c = -1,
      u = 0;
    for (; u < l.length && ((o.lastIndex = u), (d = o.exec(l)), d !== null); )
      (u = o.lastIndex),
        o === L
          ? d[1] === '!--'
            ? (o = Jt)
            : d[1] !== void 0
            ? (o = Kt)
            : d[2] !== void 0
            ? (Qt.test(d[2]) && (i = RegExp('</' + d[2], 'g')), (o = S))
            : d[3] !== void 0 && (o = S)
          : o === S
          ? d[0] === '>'
            ? ((o = i != null ? i : L), (c = -1))
            : d[1] === void 0
            ? (c = -2)
            : ((c = o.lastIndex - d[2].length),
              (h = d[1]),
              (o = d[3] === void 0 ? S : d[3] === '"' ? Gt : Ft))
          : o === Gt || o === Ft
          ? (o = S)
          : o === Jt || o === Kt
          ? (o = L)
          : ((o = S), (i = void 0));
    const p = o === S && n[a + 1].startsWith('/>') ? ' ' : '';
    r +=
      o === L
        ? l + Ne
        : c >= 0
        ? (s.push(h), l.slice(0, c) + $t + l.slice(c) + f + p)
        : l + f + (c === -2 ? (s.push(void 0), a) : p);
  }
  return [te(n, r + (n[e] || '<?>') + (t === 2 ? '</svg>' : '')), s];
};
class I {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0,
      o = 0;
    const a = t.length - 1,
      l = this.parts,
      [h, d] = Me(t, e);
    if (
      ((this.el = I.createElement(h, s)),
      (b.currentNode = this.el.content),
      e === 2)
    ) {
      const c = this.el.content,
        u = c.firstChild;
      u.remove(), c.append(...u.childNodes);
    }
    for (; (i = b.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) {
          const c = [];
          for (const u of i.getAttributeNames())
            if (u.endsWith($t) || u.startsWith(f)) {
              const p = d[o++];
              if ((c.push(u), p !== void 0)) {
                const X = i.getAttribute(p.toLowerCase() + $t).split(f),
                  _ = /([.?@])?(.*)/.exec(p);
                l.push({
                  type: 1,
                  index: r,
                  name: _[2],
                  strings: X,
                  ctor:
                    _[1] === '.'
                      ? ke
                      : _[1] === '?'
                      ? Le
                      : _[1] === '@'
                      ? ze
                      : G,
                });
              } else l.push({ type: 6, index: r });
            }
          for (const u of c) i.removeAttribute(u);
        }
        if (Qt.test(i.tagName)) {
          const c = i.textContent.split(f),
            u = c.length - 1;
          if (u > 0) {
            i.textContent = U ? U.emptyScript : '';
            for (let p = 0; p < u; p++)
              i.append(c[p], k()),
                b.nextNode(),
                l.push({ type: 2, index: ++r });
            i.append(c[u], k());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === qt) l.push({ type: 2, index: r });
        else {
          let c = -1;
          for (; (c = i.data.indexOf(f, c + 1)) !== -1; )
            l.push({ type: 7, index: r }), (c += f.length - 1);
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function H(n, t, e = n, s) {
  var i, r, o, a;
  if (t === P) return t;
  let l =
    s !== void 0
      ? (i = e._$Co) === null || i === void 0
        ? void 0
        : i[s]
      : e._$Cl;
  const h = j(t) ? void 0 : t._$litDirective$;
  return (
    (l == null ? void 0 : l.constructor) !== h &&
      ((r = l == null ? void 0 : l._$AO) === null ||
        r === void 0 ||
        r.call(l, !1),
      h === void 0 ? (l = void 0) : ((l = new h(n)), l._$AT(n, e, s)),
      s !== void 0
        ? (((o = (a = e)._$Co) !== null && o !== void 0 ? o : (a._$Co = []))[
            s
          ] = l)
        : (e._$Cl = l)),
    l !== void 0 && (t = H(n, l._$AS(n, t.values), l, s)),
    t
  );
}
class Re {
  constructor(t, e) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const {
        el: { content: s },
        parts: i,
      } = this._$AD,
      r = (
        (e = t == null ? void 0 : t.creationScope) !== null && e !== void 0
          ? e
          : E
      ).importNode(s, !0);
    b.currentNode = r;
    let o = b.nextNode(),
      a = 0,
      l = 0,
      h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let d;
        h.type === 2
          ? (d = new B(o, o.nextSibling, this, t))
          : h.type === 1
          ? (d = new h.ctor(o, h.name, h.strings, this, t))
          : h.type === 6 && (d = new Ie(o, this, t)),
          this._$AV.push(d),
          (h = i[++l]);
      }
      a !== (h == null ? void 0 : h.index) && ((o = b.nextNode()), a++);
    }
    return (b.currentNode = E), r;
  }
  v(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 &&
        (s.strings !== void 0
          ? (s._$AI(t, s, e), (e += s.strings.length - 2))
          : s._$AI(t[e])),
        e++;
  }
}
class B {
  constructor(t, e, s, i) {
    var r;
    (this.type = 2),
      (this._$AH = v),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = s),
      (this.options = i),
      (this._$Cp =
        (r = i == null ? void 0 : i.isConnected) === null || r === void 0 || r);
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !==
      null && e !== void 0
      ? e
      : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return (
      e !== void 0 &&
        (t == null ? void 0 : t.nodeType) === 11 &&
        (t = e.parentNode),
      t
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = H(this, t, e)),
      j(t)
        ? t === v || t == null || t === ''
          ? (this._$AH !== v && this._$AR(), (this._$AH = v))
          : t !== this._$AH && t !== P && this._(t)
        : t._$litType$ !== void 0
        ? this.g(t)
        : t.nodeType !== void 0
        ? this.$(t)
        : Oe(t)
        ? this.T(t)
        : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
  }
  _(t) {
    this._$AH !== v && j(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.$(E.createTextNode(t)),
      (this._$AH = t);
  }
  g(t) {
    var e;
    const { values: s, _$litType$: i } = t,
      r =
        typeof i == 'number'
          ? this._$AC(t)
          : (i.el === void 0 &&
              (i.el = I.createElement(te(i.h, i.h[0]), this.options)),
            i);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.v(s);
    else {
      const o = new Re(r, this),
        a = o.u(this.options);
      o.v(s), this.$(a), (this._$AH = o);
    }
  }
  _$AC(t) {
    let e = Yt.get(t.strings);
    return e === void 0 && Yt.set(t.strings, (e = new I(t))), e;
  }
  T(t) {
    Zt(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let s,
      i = 0;
    for (const r of t)
      i === e.length
        ? e.push((s = new B(this.k(k()), this.k(k()), this, this.options)))
        : (s = e[i]),
        s._$AI(r),
        i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), (e.length = i));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for (
      (s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 &&
      ((this._$Cp = t),
      (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class G {
  constructor(t, e, s, i, r) {
    (this.type = 1),
      (this._$AH = v),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = i),
      (this.options = r),
      s.length > 2 || s[0] !== '' || s[1] !== ''
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = v);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      (t = H(this, t, e, 0)),
        (o = !j(t) || (t !== this._$AH && t !== P)),
        o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        (h = H(this, a[s + l], e, l)),
          h === P && (h = this._$AH[l]),
          o || (o = !j(h) || h !== this._$AH[l]),
          h === v ? (t = v) : t !== v && (t += (h != null ? h : '') + r[l + 1]),
          (this._$AH[l] = h);
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === v
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t != null ? t : '');
  }
}
class ke extends G {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
const je = U ? U.emptyScript : '';
class Le extends G {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    t && t !== v
      ? this.element.setAttribute(this.name, je)
      : this.element.removeAttribute(this.name);
  }
}
class ze extends G {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), (this.type = 5);
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = H(this, t, e, 0)) !== null && s !== void 0 ? s : v) === P)
      return;
    const i = this._$AH,
      r =
        (t === v && i !== v) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      o = t !== v && (i === v || r);
    r && this.element.removeEventListener(this.name, this, i),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == 'function'
      ? this._$AH.call(
          (s =
            (e = this.options) === null || e === void 0 ? void 0 : e.host) !==
            null && s !== void 0
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class Ie {
  constructor(t, e, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const ee = F.litHtmlPolyfillSupport;
ee == null || ee(I, B),
  ((pt = F.litHtmlVersions) !== null && pt !== void 0
    ? pt
    : (F.litHtmlVersions = [])
  ).push('2.8.0');
const Be = (n, t, e) => {
  var s, i;
  const r =
    (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const a =
      (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0
        ? i
        : null;
    r._$litPart$ = o = new B(
      t.insertBefore(k(), a),
      a,
      void 0,
      e != null ? e : {}
    );
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var _t, At;
class N extends x {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (
      ((t = (e = this.renderOptions).renderBefore) !== null && t !== void 0) ||
        (e.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = Be(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return P;
  }
}
(N.finalized = !0),
  (N._$litElement$ = !0),
  (_t = globalThis.litElementHydrateSupport) === null ||
    _t === void 0 ||
    _t.call(globalThis, { LitElement: N });
const se = globalThis.litElementPolyfillSupport;
se == null || se({ LitElement: N }),
  ((At = globalThis.litElementVersions) !== null && At !== void 0
    ? At
    : (globalThis.litElementVersions = [])
  ).push('3.3.3');
var ie = Object.freeze,
  ne = Object.defineProperty,
  De = (n, t, e) =>
    t in n
      ? ne(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
      : (n[t] = e),
  oe = (n, t, e) => (De(n, typeof t != 'symbol' ? t + '' : t, e), e),
  re = (n, t) => ie(ne(n, 'raw', { value: ie(t || n.slice()) })),
  le,
  he;
class ft extends N {
  constructor() {
    super(), (this.header = 'Soy el componente: view-home!');
  }
  render() {
    return Xt(he || (he = re([' <h1>', '</h1> '])), this.header);
  }
}
oe(
  ft,
  'styles',
  zt(
    le ||
      (le = re([
        '\n    :host {\n      display: block;\n      padding: 25px;\n      color: var(--view-home-text-color, #000);\n    }\n  ',
      ]))
  )
),
  oe(ft, 'properties', { header: { type: String } }),
  window.customElements.define('view-home', ft);
var ae = Object.freeze,
  de = Object.defineProperty,
  Ve = (n, t, e) =>
    t in n
      ? de(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
      : (n[t] = e),
  ce = (n, t, e) => (Ve(n, typeof t != 'symbol' ? t + '' : t, e), e),
  ue = (n, t) => ae(de(n, 'raw', { value: ae(t || n.slice()) })),
  pe,
  $e;
class yt extends N {
  constructor() {
    super(), (this.header = 'Este es el componente: flow-mole');
  }
  render() {
    return Xt(
      $e ||
        ($e = ue([
          '\n      <h1>',
          '</h1>\n      <p>Aqu\xED debajo deber\xEDa estar el componente view-home:</p>\n      <view-home></view-home>\n    ',
        ])),
      this.header
    );
  }
}
ce(
  yt,
  'styles',
  zt(
    pe ||
      (pe = ue([
        '\n    :host {\n      display: block;\n      padding: 25px;\n      color: var(--flow-mole-text-color, #000);\n    }\n  ',
      ]))
  )
),
  ce(yt, 'properties', { header: { type: String } }),
  window.customElements.define('flow-mole', yt);
