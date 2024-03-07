function hn(f, w) {
  var x = w;
  if (f && f.__privatemessagebus__)
    return f.__privatemessagebus__;
  if (f && f.dispatchEvent) {
    var k = new CustomEvent("$SCOPE.DISCOVERY$", { bubbles: !0, cancelable: !0, composed: !0 });
    k.callback = function(F) {
      x = F;
    }, f.dispatchEvent(k);
  }
  return x;
}
const i1 = function(f, w, x, k) {
  if (k.debug) {
    var F = "for bus with id #" + k.instanceId;
    console.debug("Received subscription to topic", f, F);
  }
  var R = w.toLocaleString();
  x || (x = this), k.topics[f] ? k.topics[f][R] = { callback: w, context: x } : k.topics[f] = { hash: { callback: w, context: x } };
}, o1 = function(f, w, x) {
  if (x.debug) {
    var k = "scoped to bus with id #" + x.instanceId;
    console.debug("publishing event on topic", f, k);
  }
  var F = `${x.instanceId}.lastEvents.${f}`;
  localStorage.setItem(F, JSON.stringify(w));
  var R = x.topics[f];
  if (R)
    for (var U = Object.values(R), X = 0; U && X < U.length; X++)
      U[X].callback.call(U[X].context, w);
}, a1 = (f) => {
  f.debug && console.debug("destroying all callbacks");
  for (var w = Object.keys(f.topics), x = 0; x < w.length; x++)
    f.topics[w[x]] = {};
}, s1 = (f, w) => {
  w.debug && console.debug("destroying callbacks on topic '" + f + "'"), w.topics[f] && (w.topics[f] = {});
}, l1 = (f, w) => {
  var x = `${w.instanceId}.lastEvents.${f}`;
  return w.debug && console.debug("returning last value for", f, "from bus with id #", w.instanceId), JSON.parse(localStorage.getItem(x));
}, u1 = (f, w) => {
  w.debug && console.debug("clearing last value for", f, "from bus with id #", w.instanceId);
  var x = `${w.instanceId}.lastEvents.${f}`;
  localStorage.removeItem(x);
};
let Ot = class {
  constructor(w, x) {
    this.instanceId = Math.random().toString(16).substr(2, 8);
    const k = this;
    this.debug = !1, x && (this.debug = !!x), this.global = {
      subscribe: function(F, R, U) {
        i1.call(k, F, R, U, k);
      },
      publish: function(F, R) {
        o1.call(k, F, R, k);
      },
      clearAllCallbacks: function() {
        a1(k);
      },
      clearTopicCallbacks: function(F) {
        s1(F, k);
      },
      last: function(F) {
        return l1(F, k);
      },
      clearLast: function(F) {
        return u1(F, k);
      },
      setDebug: function(F) {
        k.debug = F;
      }
    }, this.topics = {}, this.lastEvents = {}, w && (w.__privatemessagebus__ = this, w.addEventListener("$SCOPE.DISCOVERY$", (F) => {
      F.callback && F.callback(w.__privatemessagebus__), F.stopPropagation();
    })), this.debug && console.debug("instantiating bus with ID #" + this.instanceId);
  }
};
Ot.prototype.setID = function(f, w) {
  var x = hn(w, this);
  x.debug && console.debug(`resetting bus id from #${x.instanceId} to #${f}`), x.instanceId = f;
};
Ot.prototype.subscribe = function(f, w, x) {
  var k = hn(x, this);
  i1.call(k, f, w, x, k);
};
Ot.prototype.publish = function(f, w, x) {
  var k = hn(x, this);
  o1.call(k, f, w, k);
};
Ot.prototype.clearAllCallbacks = function(f) {
  hn(f, this), a1(f);
};
Ot.prototype.clearTopicCallbacks = function(f, w) {
  var x = hn(w, this);
  s1(f, x);
};
Ot.prototype.last = function(f, w) {
  var x = hn(w, this);
  return l1(f, x);
};
Ot.prototype.clearLast = function(f, w) {
  var x = hn(w, this);
  return u1(f, x);
};
Ot.prototype.setDebug = function(f, w) {
  var x = hn(w, this);
  x.debug = f;
};
var ba = null;
function vu() {
  return ba || (ba = new Ot(), ba.setID("global")), ba;
}
var xi = vu();
try {
  module.exports.PubSub = vu(), exports.PubSub = vu();
} catch (f) {
  console.debug(f);
}
(function(f, w) {
  typeof exports == "object" && typeof module < "u" ? w(exports) : typeof define == "function" && define.amd ? define(["exports"], w) : w((f = typeof globalThis < "u" ? globalThis : f || self).d3 = f.d3 || {});
})(void 0, function(f) {
  function w(e, t) {
    return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
  }
  function x(e, t) {
    return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
  }
  function k(e) {
    let t, n, r;
    function i(o, a, s = 0, l = o.length) {
      if (s < l) {
        if (t(a, a) !== 0)
          return l;
        do {
          const u = s + l >>> 1;
          n(o[u], a) < 0 ? s = u + 1 : l = u;
        } while (s < l);
      }
      return s;
    }
    return e.length !== 2 ? (t = w, n = (o, a) => w(e(o), a), r = (o, a) => e(o) - a) : (t = e === w || e === x ? e : F, n = e, r = e), { left: i, center: function(o, a, s = 0, l = o.length) {
      const u = i(o, a, s, l - 1);
      return u > s && r(o[u - 1], a) > -r(o[u], a) ? u - 1 : u;
    }, right: function(o, a, s = 0, l = o.length) {
      if (s < l) {
        if (t(a, a) !== 0)
          return l;
        do {
          const u = s + l >>> 1;
          n(o[u], a) <= 0 ? s = u + 1 : l = u;
        } while (s < l);
      }
      return s;
    } };
  }
  function F() {
    return 0;
  }
  function R(e) {
    return e === null ? NaN : +e;
  }
  const U = k(w), X = U.right, q = U.left, Y = k(R).center;
  var G = X;
  function re(e, t) {
    let n = 0;
    if (t === void 0)
      for (let r of e)
        r != null && (r = +r) >= r && ++n;
    else {
      let r = -1;
      for (let i of e)
        (i = t(i, ++r, e)) != null && (i = +i) >= i && ++n;
    }
    return n;
  }
  function ie(e) {
    return 0 | e.length;
  }
  function W(e) {
    return !(e > 0);
  }
  function Q(e) {
    return typeof e != "object" || "length" in e ? e : Array.from(e);
  }
  function oe(e, t) {
    let n, r = 0, i = 0, o = 0;
    if (t === void 0)
      for (let a of e)
        a != null && (a = +a) >= a && (n = a - i, i += n / ++r, o += n * (a - i));
    else {
      let a = -1;
      for (let s of e)
        (s = t(s, ++a, e)) != null && (s = +s) >= s && (n = s - i, i += n / ++r, o += n * (s - i));
    }
    if (r > 1)
      return o / (r - 1);
  }
  function ge(e, t) {
    const n = oe(e, t);
    return n && Math.sqrt(n);
  }
  function Ce(e, t) {
    let n, r;
    if (t === void 0)
      for (const i of e)
        i != null && (n === void 0 ? i >= i && (n = r = i) : (n > i && (n = i), r < i && (r = i)));
    else {
      let i = -1;
      for (let o of e)
        (o = t(o, ++i, e)) != null && (n === void 0 ? o >= o && (n = r = o) : (n > o && (n = o), r < o && (r = o)));
    }
    return [n, r];
  }
  class me {
    constructor() {
      this._partials = new Float64Array(32), this._n = 0;
    }
    add(t) {
      const n = this._partials;
      let r = 0;
      for (let i = 0; i < this._n && i < 32; i++) {
        const o = n[i], a = t + o, s = Math.abs(t) < Math.abs(o) ? t - (a - o) : o - (a - t);
        s && (n[r++] = s), t = a;
      }
      return n[r] = t, this._n = r + 1, this;
    }
    valueOf() {
      const t = this._partials;
      let n, r, i, o = this._n, a = 0;
      if (o > 0) {
        for (a = t[--o]; o > 0 && (n = a, r = t[--o], a = n + r, i = r - (a - n), !i); )
          ;
        o > 0 && (i < 0 && t[o - 1] < 0 || i > 0 && t[o - 1] > 0) && (r = 2 * i, n = a + r, r == n - a && (a = n));
      }
      return a;
    }
  }
  class je extends Map {
    constructor(t, n = wu) {
      if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), t != null)
        for (const [r, i] of t)
          this.set(r, i);
    }
    get(t) {
      return super.get(dn(this, t));
    }
    has(t) {
      return super.has(dn(this, t));
    }
    set(t, n) {
      return super.set(Fn(this, t), n);
    }
    delete(t) {
      return super.delete(xr(this, t));
    }
  }
  class ut extends Set {
    constructor(t, n = wu) {
      if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), t != null)
        for (const r of t)
          this.add(r);
    }
    has(t) {
      return super.has(dn(this, t));
    }
    add(t) {
      return super.add(Fn(this, t));
    }
    delete(t) {
      return super.delete(xr(this, t));
    }
  }
  function dn({ _intern: e, _key: t }, n) {
    const r = t(n);
    return e.has(r) ? e.get(r) : n;
  }
  function Fn({ _intern: e, _key: t }, n) {
    const r = t(n);
    return e.has(r) ? e.get(r) : (e.set(r, n), n);
  }
  function xr({ _intern: e, _key: t }, n) {
    const r = t(n);
    return e.has(r) && (n = e.get(r), e.delete(r)), n;
  }
  function wu(e) {
    return e !== null && typeof e == "object" ? e.valueOf() : e;
  }
  function jn(e) {
    return e;
  }
  function Mu(e, ...t) {
    return Dn(e, jn, jn, t);
  }
  function Eu(e, ...t) {
    return Dn(e, Array.from, jn, t);
  }
  function Su(e, t) {
    for (let n = 1, r = t.length; n < r; ++n)
      e = e.flatMap((i) => i.pop().map(([o, a]) => [...i, o, a]));
    return e;
  }
  function Tu(e, t, ...n) {
    return Dn(e, jn, t, n);
  }
  function ku(e, t, ...n) {
    return Dn(e, Array.from, t, n);
  }
  function Au(e) {
    if (e.length !== 1)
      throw new Error("duplicate key");
    return e[0];
  }
  function Dn(e, t, n, r) {
    return function i(o, a) {
      if (a >= r.length)
        return n(o);
      const s = new je(), l = r[a++];
      let u = -1;
      for (const c of o) {
        const d = l(c, ++u, o), h = s.get(d);
        h ? h.push(c) : s.set(d, [c]);
      }
      for (const [c, d] of s)
        s.set(c, i(d, a));
      return t(s);
    }(e, 0);
  }
  function Nu(e, t) {
    return Array.from(t, (n) => e[n]);
  }
  function wa(e, ...t) {
    if (typeof e[Symbol.iterator] != "function")
      throw new TypeError("values is not iterable");
    e = Array.from(e);
    let [n] = t;
    if (n && n.length !== 2 || t.length > 1) {
      const r = Uint32Array.from(e, (i, o) => o);
      return t.length > 1 ? (t = t.map((i) => e.map(i)), r.sort((i, o) => {
        for (const a of t) {
          const s = wr(a[i], a[o]);
          if (s)
            return s;
        }
      })) : (n = e.map(n), r.sort((i, o) => wr(n[i], n[o]))), Nu(e, r);
    }
    return e.sort(Ma(n));
  }
  function Ma(e = w) {
    if (e === w)
      return wr;
    if (typeof e != "function")
      throw new TypeError("compare is not a function");
    return (t, n) => {
      const r = e(t, n);
      return r || r === 0 ? r : (e(n, n) === 0) - (e(t, t) === 0);
    };
  }
  function wr(e, t) {
    return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
  }
  var g1 = Array.prototype.slice;
  function wi(e) {
    return () => e;
  }
  var Ea = Math.sqrt(50), Sa = Math.sqrt(10), Ta = Math.sqrt(2);
  function qn(e, t, n) {
    var r, i, o, a, s = -1;
    if (n = +n, (e = +e) == (t = +t) && n > 0)
      return [e];
    if ((r = t < e) && (i = e, e = t, t = i), (a = Bn(e, t, n)) === 0 || !isFinite(a))
      return [];
    if (a > 0) {
      let l = Math.round(e / a), u = Math.round(t / a);
      for (l * a < e && ++l, u * a > t && --u, o = new Array(i = u - l + 1); ++s < i; )
        o[s] = (l + s) * a;
    } else {
      a = -a;
      let l = Math.round(e * a), u = Math.round(t * a);
      for (l / a < e && ++l, u / a > t && --u, o = new Array(i = u - l + 1); ++s < i; )
        o[s] = (l + s) / a;
    }
    return r && o.reverse(), o;
  }
  function Bn(e, t, n) {
    var r = (t - e) / Math.max(0, n), i = Math.floor(Math.log(r) / Math.LN10), o = r / Math.pow(10, i);
    return i >= 0 ? (o >= Ea ? 10 : o >= Sa ? 5 : o >= Ta ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= Ea ? 10 : o >= Sa ? 5 : o >= Ta ? 2 : 1);
  }
  function Un(e, t, n) {
    var r = Math.abs(t - e) / Math.max(0, n), i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), o = r / i;
    return o >= Ea ? i *= 10 : o >= Sa ? i *= 5 : o >= Ta && (i *= 2), t < e ? -i : i;
  }
  function Cu(e, t, n) {
    let r;
    for (; ; ) {
      const i = Bn(e, t, n);
      if (i === r || i === 0 || !isFinite(i))
        return [e, t];
      i > 0 ? (e = Math.floor(e / i) * i, t = Math.ceil(t / i) * i) : i < 0 && (e = Math.ceil(e * i) / i, t = Math.floor(t * i) / i), r = i;
    }
  }
  function ka(e) {
    return Math.ceil(Math.log(re(e)) / Math.LN2) + 1;
  }
  function zu() {
    var e = jn, t = Ce, n = ka;
    function r(i) {
      Array.isArray(i) || (i = Array.from(i));
      var o, a, s, l = i.length, u = new Array(l);
      for (o = 0; o < l; ++o)
        u[o] = e(i[o], o, i);
      var c = t(u), d = c[0], h = c[1], p = n(u, d, h);
      if (!Array.isArray(p)) {
        const v = h, M = +p;
        if (t === Ce && ([d, h] = Cu(d, h, M)), (p = qn(d, h, M))[0] <= d && (s = Bn(d, h, M)), p[p.length - 1] >= h)
          if (v >= h && t === Ce) {
            const _ = Bn(d, h, M);
            isFinite(_) && (_ > 0 ? h = (Math.floor(h / _) + 1) * _ : _ < 0 && (h = (Math.ceil(h * -_) + 1) / -_));
          } else
            p.pop();
      }
      for (var b = p.length; p[0] <= d; )
        p.shift(), --b;
      for (; p[b - 1] > h; )
        p.pop(), --b;
      var m, g = new Array(b + 1);
      for (o = 0; o <= b; ++o)
        (m = g[o] = []).x0 = o > 0 ? p[o - 1] : d, m.x1 = o < b ? p[o] : h;
      if (isFinite(s)) {
        if (s > 0)
          for (o = 0; o < l; ++o)
            (a = u[o]) != null && d <= a && a <= h && g[Math.min(b, Math.floor((a - d) / s))].push(i[o]);
        else if (s < 0) {
          for (o = 0; o < l; ++o)
            if ((a = u[o]) != null && d <= a && a <= h) {
              const v = Math.floor((d - a) * s);
              g[Math.min(b, v + (p[v] <= a))].push(i[o]);
            }
        }
      } else
        for (o = 0; o < l; ++o)
          (a = u[o]) != null && d <= a && a <= h && g[G(p, a, 0, b)].push(i[o]);
      return g;
    }
    return r.value = function(i) {
      return arguments.length ? (e = typeof i == "function" ? i : wi(i), r) : e;
    }, r.domain = function(i) {
      return arguments.length ? (t = typeof i == "function" ? i : wi([i[0], i[1]]), r) : t;
    }, r.thresholds = function(i) {
      return arguments.length ? (n = typeof i == "function" ? i : Array.isArray(i) ? wi(g1.call(i)) : wi(i), r) : n;
    }, r;
  }
  function Mi(e, t) {
    let n;
    if (t === void 0)
      for (const r of e)
        r != null && (n < r || n === void 0 && r >= r) && (n = r);
    else {
      let r = -1;
      for (let i of e)
        (i = t(i, ++r, e)) != null && (n < i || n === void 0 && i >= i) && (n = i);
    }
    return n;
  }
  function Ei(e, t) {
    let n;
    if (t === void 0)
      for (const r of e)
        r != null && (n > r || n === void 0 && r >= r) && (n = r);
    else {
      let r = -1;
      for (let i of e)
        (i = t(i, ++r, e)) != null && (n > i || n === void 0 && i >= i) && (n = i);
    }
    return n;
  }
  function Aa(e, t, n = 0, r = e.length - 1, i) {
    for (i = i === void 0 ? wr : Ma(i); r > n; ) {
      if (r - n > 600) {
        const l = r - n + 1, u = t - n + 1, c = Math.log(l), d = 0.5 * Math.exp(2 * c / 3), h = 0.5 * Math.sqrt(c * d * (l - d) / l) * (u - l / 2 < 0 ? -1 : 1);
        Aa(e, t, Math.max(n, Math.floor(t - u * d / l + h)), Math.min(r, Math.floor(t + (l - u) * d / l + h)), i);
      }
      const o = e[t];
      let a = n, s = r;
      for (Mr(e, n, t), i(e[r], o) > 0 && Mr(e, n, r); a < s; ) {
        for (Mr(e, a, s), ++a, --s; i(e[a], o) < 0; )
          ++a;
        for (; i(e[s], o) > 0; )
          --s;
      }
      i(e[n], o) === 0 ? Mr(e, n, s) : (++s, Mr(e, s, r)), s <= t && (n = s + 1), t <= s && (r = s - 1);
    }
    return e;
  }
  function Mr(e, t, n) {
    const r = e[t];
    e[t] = e[n], e[n] = r;
  }
  function Er(e, t, n) {
    if (e = Float64Array.from(function* (s, l) {
      if (l === void 0)
        for (let u of s)
          u != null && (u = +u) >= u && (yield u);
      else {
        let u = -1;
        for (let c of s)
          (c = l(c, ++u, s)) != null && (c = +c) >= c && (yield c);
      }
    }(e, n)), r = e.length) {
      if ((t = +t) <= 0 || r < 2)
        return Ei(e);
      if (t >= 1)
        return Mi(e);
      var r, i = (r - 1) * t, o = Math.floor(i), a = Mi(Aa(e, o).subarray(0, o + 1));
      return a + (Ei(e.subarray(o + 1)) - a) * (i - o);
    }
  }
  function Lu(e, t, n = R) {
    if (r = e.length) {
      if ((t = +t) <= 0 || r < 2)
        return +n(e[0], 0, e);
      if (t >= 1)
        return +n(e[r - 1], r - 1, e);
      var r, i = (r - 1) * t, o = Math.floor(i), a = +n(e[o], o, e);
      return a + (+n(e[o + 1], o + 1, e) - a) * (i - o);
    }
  }
  function Pu(e, t) {
    let n, r = -1, i = -1;
    if (t === void 0)
      for (const o of e)
        ++i, o != null && (n < o || n === void 0 && o >= o) && (n = o, r = i);
    else
      for (let o of e)
        (o = t(o, ++i, e)) != null && (n < o || n === void 0 && o >= o) && (n = o, r = i);
    return r;
  }
  function Na(e) {
    return Array.from(function* (t) {
      for (const n of t)
        yield* n;
    }(e));
  }
  function $u(e, t) {
    let n, r = -1, i = -1;
    if (t === void 0)
      for (const o of e)
        ++i, o != null && (n > o || n === void 0 && o >= o) && (n = o, r = i);
    else
      for (let o of e)
        (o = t(o, ++i, e)) != null && (n > o || n === void 0 && o >= o) && (n = o, r = i);
    return r;
  }
  function m1(e, t) {
    return [e, t];
  }
  function It(e, t, n) {
    e = +e, t = +t, n = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +n;
    for (var r = -1, i = 0 | Math.max(0, Math.ceil((t - e) / n)), o = new Array(i); ++r < i; )
      o[r] = e + r * n;
    return o;
  }
  function Ou(e, t = w) {
    if (t.length === 1)
      return $u(e, t);
    let n, r = -1, i = -1;
    for (const o of e)
      ++i, (r < 0 ? t(o, o) === 0 : t(o, n) < 0) && (n = o, r = i);
    return r;
  }
  var v1 = Iu(Math.random);
  function Iu(e) {
    return function(t, n = 0, r = t.length) {
      let i = r - (n = +n);
      for (; i; ) {
        const o = e() * i-- | 0, a = t[i + n];
        t[i + n] = t[o + n], t[o + n] = a;
      }
      return t;
    };
  }
  function Ru(e) {
    if (!(i = e.length))
      return [];
    for (var t = -1, n = Ei(e, b1), r = new Array(n); ++t < n; )
      for (var i, o = -1, a = r[t] = new Array(i); ++o < i; )
        a[o] = e[o][t];
    return r;
  }
  function b1(e) {
    return e.length;
  }
  function y1(e) {
    return e instanceof ut ? e : new ut(e);
  }
  function Fu(e, t) {
    const n = e[Symbol.iterator](), r = /* @__PURE__ */ new Set();
    for (const i of t) {
      const o = ju(i);
      if (r.has(o))
        continue;
      let a, s;
      for (; { value: a, done: s } = n.next(); ) {
        if (s)
          return !1;
        const l = ju(a);
        if (r.add(l), Object.is(o, l))
          break;
      }
    }
    return !0;
  }
  function ju(e) {
    return e !== null && typeof e == "object" ? e.valueOf() : e;
  }
  function _1(e) {
    return e;
  }
  var Du = 1e-6;
  function x1(e) {
    return "translate(" + e + ",0)";
  }
  function w1(e) {
    return "translate(0," + e + ")";
  }
  function M1(e) {
    return (t) => +e(t);
  }
  function E1(e, t) {
    return t = Math.max(0, e.bandwidth() - 2 * t) / 2, e.round() && (t = Math.round(t)), (n) => +e(n) + t;
  }
  function S1() {
    return !this.__axis;
  }
  function Si(e, t) {
    var n = [], r = null, i = null, o = 6, a = 6, s = 3, l = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, u = e === 1 || e === 4 ? -1 : 1, c = e === 4 || e === 2 ? "x" : "y", d = e === 1 || e === 3 ? x1 : w1;
    function h(p) {
      var b = r ?? (t.ticks ? t.ticks.apply(t, n) : t.domain()), m = i ?? (t.tickFormat ? t.tickFormat.apply(t, n) : _1), g = Math.max(o, 0) + s, v = t.range(), M = +v[0] + l, _ = +v[v.length - 1] + l, y = (t.bandwidth ? E1 : M1)(t.copy(), l), E = p.selection ? p.selection() : p, S = E.selectAll(".domain").data([null]), O = E.selectAll(".tick").data(b, t).order(), j = O.exit(), z = O.enter().append("g").attr("class", "tick"), C = O.select("line"), N = O.select("text");
      S = S.merge(S.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), O = O.merge(z), C = C.merge(z.append("line").attr("stroke", "currentColor").attr(c + "2", u * o)), N = N.merge(z.append("text").attr("fill", "currentColor").attr(c, u * g).attr("dy", e === 1 ? "0em" : e === 3 ? "0.71em" : "0.32em")), p !== E && (S = S.transition(p), O = O.transition(p), C = C.transition(p), N = N.transition(p), j = j.transition(p).attr("opacity", Du).attr("transform", function(P) {
        return isFinite(P = y(P)) ? d(P + l) : this.getAttribute("transform");
      }), z.attr("opacity", Du).attr("transform", function(P) {
        var T = this.parentNode.__axis;
        return d((T && isFinite(T = T(P)) ? T : y(P)) + l);
      })), j.remove(), S.attr("d", e === 4 || e === 2 ? a ? "M" + u * a + "," + M + "H" + l + "V" + _ + "H" + u * a : "M" + l + "," + M + "V" + _ : a ? "M" + M + "," + u * a + "V" + l + "H" + _ + "V" + u * a : "M" + M + "," + l + "H" + _), O.attr("opacity", 1).attr("transform", function(P) {
        return d(y(P) + l);
      }), C.attr(c + "2", u * o), N.attr(c, u * g).text(m), E.filter(S1).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", e === 2 ? "start" : e === 4 ? "end" : "middle"), E.each(function() {
        this.__axis = y;
      });
    }
    return h.scale = function(p) {
      return arguments.length ? (t = p, h) : t;
    }, h.ticks = function() {
      return n = Array.from(arguments), h;
    }, h.tickArguments = function(p) {
      return arguments.length ? (n = p == null ? [] : Array.from(p), h) : n.slice();
    }, h.tickValues = function(p) {
      return arguments.length ? (r = p == null ? null : Array.from(p), h) : r && r.slice();
    }, h.tickFormat = function(p) {
      return arguments.length ? (i = p, h) : i;
    }, h.tickSize = function(p) {
      return arguments.length ? (o = a = +p, h) : o;
    }, h.tickSizeInner = function(p) {
      return arguments.length ? (o = +p, h) : o;
    }, h.tickSizeOuter = function(p) {
      return arguments.length ? (a = +p, h) : a;
    }, h.tickPadding = function(p) {
      return arguments.length ? (s = +p, h) : s;
    }, h.offset = function(p) {
      return arguments.length ? (l = +p, h) : l;
    }, h;
  }
  var T1 = { value: () => {
  } };
  function pn() {
    for (var e, t = 0, n = arguments.length, r = {}; t < n; ++t) {
      if (!(e = arguments[t] + "") || e in r || /[\s.]/.test(e))
        throw new Error("illegal type: " + e);
      r[e] = [];
    }
    return new Ti(r);
  }
  function Ti(e) {
    this._ = e;
  }
  function k1(e, t) {
    return e.trim().split(/^|\s+/).map(function(n) {
      var r = "", i = n.indexOf(".");
      if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n))
        throw new Error("unknown type: " + n);
      return { type: n, name: r };
    });
  }
  function A1(e, t) {
    for (var n, r = 0, i = e.length; r < i; ++r)
      if ((n = e[r]).name === t)
        return n.value;
  }
  function qu(e, t, n) {
    for (var r = 0, i = e.length; r < i; ++r)
      if (e[r].name === t) {
        e[r] = T1, e = e.slice(0, r).concat(e.slice(r + 1));
        break;
      }
    return n != null && e.push({ name: t, value: n }), e;
  }
  Ti.prototype = pn.prototype = { constructor: Ti, on: function(e, t) {
    var n, r = this._, i = k1(e + "", r), o = -1, a = i.length;
    if (!(arguments.length < 2)) {
      if (t != null && typeof t != "function")
        throw new Error("invalid callback: " + t);
      for (; ++o < a; )
        if (n = (e = i[o]).type)
          r[n] = qu(r[n], e.name, t);
        else if (t == null)
          for (n in r)
            r[n] = qu(r[n], e.name, null);
      return this;
    }
    for (; ++o < a; )
      if ((n = (e = i[o]).type) && (n = A1(r[n], e.name)))
        return n;
  }, copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new Ti(e);
  }, call: function(e, t) {
    if ((n = arguments.length - 2) > 0)
      for (var n, r, i = new Array(n), o = 0; o < n; ++o)
        i[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (o = 0, n = (r = this._[e]).length; o < n; ++o)
      r[o].value.apply(t, i);
  }, apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(t, n);
  } };
  var Ca = "http://www.w3.org/1999/xhtml", za = { svg: "http://www.w3.org/2000/svg", xhtml: Ca, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };
  function Sr(e) {
    var t = e += "", n = t.indexOf(":");
    return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), za.hasOwnProperty(t) ? { space: za[t], local: e } : e;
  }
  function N1(e) {
    return function() {
      var t = this.ownerDocument, n = this.namespaceURI;
      return n === Ca && t.documentElement.namespaceURI === Ca ? t.createElement(e) : t.createElementNS(n, e);
    };
  }
  function C1(e) {
    return function() {
      return this.ownerDocument.createElementNS(e.space, e.local);
    };
  }
  function ki(e) {
    var t = Sr(e);
    return (t.local ? C1 : N1)(t);
  }
  function z1() {
  }
  function Ai(e) {
    return e == null ? z1 : function() {
      return this.querySelector(e);
    };
  }
  function Bu(e) {
    return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
  }
  function L1() {
    return [];
  }
  function La(e) {
    return e == null ? L1 : function() {
      return this.querySelectorAll(e);
    };
  }
  function Pa(e) {
    return function() {
      return this.matches(e);
    };
  }
  function Uu(e) {
    return function(t) {
      return t.matches(e);
    };
  }
  var P1 = Array.prototype.find;
  function $1() {
    return this.firstElementChild;
  }
  var O1 = Array.prototype.filter;
  function I1() {
    return Array.from(this.children);
  }
  function Yu(e) {
    return new Array(e.length);
  }
  function Ni(e, t) {
    this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
  }
  function R1(e) {
    return function() {
      return e;
    };
  }
  function F1(e, t, n, r, i, o) {
    for (var a, s = 0, l = t.length, u = o.length; s < u; ++s)
      (a = t[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] = new Ni(e, o[s]);
    for (; s < l; ++s)
      (a = t[s]) && (i[s] = a);
  }
  function j1(e, t, n, r, i, o, a) {
    var s, l, u, c = /* @__PURE__ */ new Map(), d = t.length, h = o.length, p = new Array(d);
    for (s = 0; s < d; ++s)
      (l = t[s]) && (p[s] = u = a.call(l, l.__data__, s, t) + "", c.has(u) ? i[s] = l : c.set(u, l));
    for (s = 0; s < h; ++s)
      u = a.call(e, o[s], s, o) + "", (l = c.get(u)) ? (r[s] = l, l.__data__ = o[s], c.delete(u)) : n[s] = new Ni(e, o[s]);
    for (s = 0; s < d; ++s)
      (l = t[s]) && c.get(p[s]) === l && (i[s] = l);
  }
  function D1(e) {
    return e.__data__;
  }
  function q1(e) {
    return typeof e == "object" && "length" in e ? e : Array.from(e);
  }
  function B1(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
  }
  function U1(e) {
    return function() {
      this.removeAttribute(e);
    };
  }
  function Y1(e) {
    return function() {
      this.removeAttributeNS(e.space, e.local);
    };
  }
  function H1(e, t) {
    return function() {
      this.setAttribute(e, t);
    };
  }
  function V1(e, t) {
    return function() {
      this.setAttributeNS(e.space, e.local, t);
    };
  }
  function G1(e, t) {
    return function() {
      var n = t.apply(this, arguments);
      n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
    };
  }
  function X1(e, t) {
    return function() {
      var n = t.apply(this, arguments);
      n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
    };
  }
  function $a(e) {
    return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
  }
  function Z1(e) {
    return function() {
      this.style.removeProperty(e);
    };
  }
  function W1(e, t, n) {
    return function() {
      this.style.setProperty(e, t, n);
    };
  }
  function J1(e, t, n) {
    return function() {
      var r = t.apply(this, arguments);
      r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
    };
  }
  function gn(e, t) {
    return e.style.getPropertyValue(t) || $a(e).getComputedStyle(e, null).getPropertyValue(t);
  }
  function K1(e) {
    return function() {
      delete this[e];
    };
  }
  function Q1(e, t) {
    return function() {
      this[e] = t;
    };
  }
  function eg(e, t) {
    return function() {
      var n = t.apply(this, arguments);
      n == null ? delete this[e] : this[e] = n;
    };
  }
  function Hu(e) {
    return e.trim().split(/^|\s+/);
  }
  function Oa(e) {
    return e.classList || new Vu(e);
  }
  function Vu(e) {
    this._node = e, this._names = Hu(e.getAttribute("class") || "");
  }
  function Gu(e, t) {
    for (var n = Oa(e), r = -1, i = t.length; ++r < i; )
      n.add(t[r]);
  }
  function Xu(e, t) {
    for (var n = Oa(e), r = -1, i = t.length; ++r < i; )
      n.remove(t[r]);
  }
  function tg(e) {
    return function() {
      Gu(this, e);
    };
  }
  function ng(e) {
    return function() {
      Xu(this, e);
    };
  }
  function rg(e, t) {
    return function() {
      (t.apply(this, arguments) ? Gu : Xu)(this, e);
    };
  }
  function ig() {
    this.textContent = "";
  }
  function og(e) {
    return function() {
      this.textContent = e;
    };
  }
  function ag(e) {
    return function() {
      var t = e.apply(this, arguments);
      this.textContent = t ?? "";
    };
  }
  function sg() {
    this.innerHTML = "";
  }
  function lg(e) {
    return function() {
      this.innerHTML = e;
    };
  }
  function ug(e) {
    return function() {
      var t = e.apply(this, arguments);
      this.innerHTML = t ?? "";
    };
  }
  function cg() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function fg() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function hg() {
    return null;
  }
  function dg() {
    var e = this.parentNode;
    e && e.removeChild(this);
  }
  function pg() {
    var e = this.cloneNode(!1), t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
  }
  function gg() {
    var e = this.cloneNode(!0), t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
  }
  function mg(e) {
    return e.trim().split(/^|\s+/).map(function(t) {
      var n = "", r = t.indexOf(".");
      return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
    });
  }
  function vg(e) {
    return function() {
      var t = this.__on;
      if (t) {
        for (var n, r = 0, i = -1, o = t.length; r < o; ++r)
          n = t[r], e.type && n.type !== e.type || n.name !== e.name ? t[++i] = n : this.removeEventListener(n.type, n.listener, n.options);
        ++i ? t.length = i : delete this.__on;
      }
    };
  }
  function bg(e, t, n) {
    return function() {
      var r, i = this.__on, o = /* @__PURE__ */ function(l) {
        return function(u) {
          l.call(this, u, this.__data__);
        };
      }(t);
      if (i) {
        for (var a = 0, s = i.length; a < s; ++a)
          if ((r = i[a]).type === e.type && r.name === e.name)
            return this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = n), void (r.value = t);
      }
      this.addEventListener(e.type, o, n), r = { type: e.type, name: e.name, value: t, listener: o, options: n }, i ? i.push(r) : this.__on = [r];
    };
  }
  function Zu(e, t, n) {
    var r = $a(e), i = r.CustomEvent;
    typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
  }
  function yg(e, t) {
    return function() {
      return Zu(this, e, t);
    };
  }
  function _g(e, t) {
    return function() {
      return Zu(this, e, t.apply(this, arguments));
    };
  }
  Ni.prototype = { constructor: Ni, appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  }, insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  }, querySelector: function(e) {
    return this._parent.querySelector(e);
  }, querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  } }, Vu.prototype = { add: function(e) {
    this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  }, remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  }, contains: function(e) {
    return this._names.indexOf(e) >= 0;
  } };
  var Ia = [null];
  function Ve(e, t) {
    this._groups = e, this._parents = t;
  }
  function mn() {
    return new Ve([[document.documentElement]], Ia);
  }
  function De(e) {
    return typeof e == "string" ? new Ve([[document.querySelector(e)]], [document.documentElement]) : new Ve([[e]], Ia);
  }
  Ve.prototype = mn.prototype = { constructor: Ve, select: function(e) {
    typeof e != "function" && (e = Ai(e));
    for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
      for (var o, a, s = t[i], l = s.length, u = r[i] = new Array(l), c = 0; c < l; ++c)
        (o = s[c]) && (a = e.call(o, o.__data__, c, s)) && ("__data__" in o && (a.__data__ = o.__data__), u[c] = a);
    return new Ve(r, this._parents);
  }, selectAll: function(e) {
    e = typeof e == "function" ? /* @__PURE__ */ function(c) {
      return function() {
        return Bu(c.apply(this, arguments));
      };
    }(e) : La(e);
    for (var t = this._groups, n = t.length, r = [], i = [], o = 0; o < n; ++o)
      for (var a, s = t[o], l = s.length, u = 0; u < l; ++u)
        (a = s[u]) && (r.push(e.call(a, a.__data__, u, s)), i.push(a));
    return new Ve(r, i);
  }, selectChild: function(e) {
    return this.select(e == null ? $1 : /* @__PURE__ */ function(t) {
      return function() {
        return P1.call(this.children, t);
      };
    }(typeof e == "function" ? e : Uu(e)));
  }, selectChildren: function(e) {
    return this.selectAll(e == null ? I1 : /* @__PURE__ */ function(t) {
      return function() {
        return O1.call(this.children, t);
      };
    }(typeof e == "function" ? e : Uu(e)));
  }, filter: function(e) {
    typeof e != "function" && (e = Pa(e));
    for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
      for (var o, a = t[i], s = a.length, l = r[i] = [], u = 0; u < s; ++u)
        (o = a[u]) && e.call(o, o.__data__, u, a) && l.push(o);
    return new Ve(r, this._parents);
  }, data: function(e, t) {
    if (!arguments.length)
      return Array.from(this, D1);
    var n = t ? j1 : F1, r = this._parents, i = this._groups;
    typeof e != "function" && (e = R1(e));
    for (var o = i.length, a = new Array(o), s = new Array(o), l = new Array(o), u = 0; u < o; ++u) {
      var c = r[u], d = i[u], h = d.length, p = q1(e.call(c, c && c.__data__, u, r)), b = p.length, m = s[u] = new Array(b), g = a[u] = new Array(b), v = l[u] = new Array(h);
      n(c, d, m, g, v, p, t);
      for (var M, _, y = 0, E = 0; y < b; ++y)
        if (M = m[y]) {
          for (y >= E && (E = y + 1); !(_ = g[E]) && ++E < b; )
            ;
          M._next = _ || null;
        }
    }
    return (a = new Ve(a, r))._enter = s, a._exit = l, a;
  }, enter: function() {
    return new Ve(this._enter || this._groups.map(Yu), this._parents);
  }, exit: function() {
    return new Ve(this._exit || this._groups.map(Yu), this._parents);
  }, join: function(e, t, n) {
    var r = this.enter(), i = this, o = this.exit();
    return typeof e == "function" ? (r = e(r)) && (r = r.selection()) : r = r.append(e + ""), t != null && (i = t(i)) && (i = i.selection()), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
  }, merge: function(e) {
    for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, o = r.length, a = Math.min(i, o), s = new Array(i), l = 0; l < a; ++l)
      for (var u, c = n[l], d = r[l], h = c.length, p = s[l] = new Array(h), b = 0; b < h; ++b)
        (u = c[b] || d[b]) && (p[b] = u);
    for (; l < i; ++l)
      s[l] = n[l];
    return new Ve(s, this._parents);
  }, selection: function() {
    return this;
  }, order: function() {
    for (var e = this._groups, t = -1, n = e.length; ++t < n; )
      for (var r, i = e[t], o = i.length - 1, a = i[o]; --o >= 0; )
        (r = i[o]) && (a && 4 ^ r.compareDocumentPosition(a) && a.parentNode.insertBefore(r, a), a = r);
    return this;
  }, sort: function(e) {
    function t(d, h) {
      return d && h ? e(d.__data__, h.__data__) : !d - !h;
    }
    e || (e = B1);
    for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
      for (var a, s = n[o], l = s.length, u = i[o] = new Array(l), c = 0; c < l; ++c)
        (a = s[c]) && (u[c] = a);
      u.sort(t);
    }
    return new Ve(i, this._parents).order();
  }, call: function() {
    var e = arguments[0];
    return arguments[0] = this, e.apply(null, arguments), this;
  }, nodes: function() {
    return Array.from(this);
  }, node: function() {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
      for (var r = e[t], i = 0, o = r.length; i < o; ++i) {
        var a = r[i];
        if (a)
          return a;
      }
    return null;
  }, size: function() {
    let e = 0;
    for (const t of this)
      ++e;
    return e;
  }, empty: function() {
    return !this.node();
  }, each: function(e) {
    for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
      for (var i, o = t[n], a = 0, s = o.length; a < s; ++a)
        (i = o[a]) && e.call(i, i.__data__, a, o);
    return this;
  }, attr: function(e, t) {
    var n = Sr(e);
    if (arguments.length < 2) {
      var r = this.node();
      return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
    }
    return this.each((t == null ? n.local ? Y1 : U1 : typeof t == "function" ? n.local ? X1 : G1 : n.local ? V1 : H1)(n, t));
  }, style: function(e, t, n) {
    return arguments.length > 1 ? this.each((t == null ? Z1 : typeof t == "function" ? J1 : W1)(e, t, n ?? "")) : gn(this.node(), e);
  }, property: function(e, t) {
    return arguments.length > 1 ? this.each((t == null ? K1 : typeof t == "function" ? eg : Q1)(e, t)) : this.node()[e];
  }, classed: function(e, t) {
    var n = Hu(e + "");
    if (arguments.length < 2) {
      for (var r = Oa(this.node()), i = -1, o = n.length; ++i < o; )
        if (!r.contains(n[i]))
          return !1;
      return !0;
    }
    return this.each((typeof t == "function" ? rg : t ? tg : ng)(n, t));
  }, text: function(e) {
    return arguments.length ? this.each(e == null ? ig : (typeof e == "function" ? ag : og)(e)) : this.node().textContent;
  }, html: function(e) {
    return arguments.length ? this.each(e == null ? sg : (typeof e == "function" ? ug : lg)(e)) : this.node().innerHTML;
  }, raise: function() {
    return this.each(cg);
  }, lower: function() {
    return this.each(fg);
  }, append: function(e) {
    var t = typeof e == "function" ? e : ki(e);
    return this.select(function() {
      return this.appendChild(t.apply(this, arguments));
    });
  }, insert: function(e, t) {
    var n = typeof e == "function" ? e : ki(e), r = t == null ? hg : typeof t == "function" ? t : Ai(t);
    return this.select(function() {
      return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
    });
  }, remove: function() {
    return this.each(dg);
  }, clone: function(e) {
    return this.select(e ? gg : pg);
  }, datum: function(e) {
    return arguments.length ? this.property("__data__", e) : this.node().__data__;
  }, on: function(e, t, n) {
    var r, i, o = mg(e + ""), a = o.length;
    if (!(arguments.length < 2)) {
      for (s = t ? bg : vg, r = 0; r < a; ++r)
        this.each(s(o[r], t, n));
      return this;
    }
    var s = this.node().__on;
    if (s) {
      for (var l, u = 0, c = s.length; u < c; ++u)
        for (r = 0, l = s[u]; r < a; ++r)
          if ((i = o[r]).type === l.type && i.name === l.name)
            return l.value;
    }
  }, dispatch: function(e, t) {
    return this.each((typeof t == "function" ? _g : yg)(e, t));
  }, [Symbol.iterator]: function* () {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
      for (var r, i = e[t], o = 0, a = i.length; o < a; ++o)
        (r = i[o]) && (yield r);
  } };
  var xg = 0;
  function Wu() {
    return new Ra();
  }
  function Ra() {
    this._ = "@" + (++xg).toString(36);
  }
  function Ju(e) {
    let t;
    for (; t = e.sourceEvent; )
      e = t;
    return e;
  }
  function ct(e, t) {
    if (e = Ju(e), t === void 0 && (t = e.currentTarget), t) {
      var n = t.ownerSVGElement || t;
      if (n.createSVGPoint) {
        var r = n.createSVGPoint();
        return r.x = e.clientX, r.y = e.clientY, [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y];
      }
      if (t.getBoundingClientRect) {
        var i = t.getBoundingClientRect();
        return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
      }
    }
    return [e.pageX, e.pageY];
  }
  Ra.prototype = Wu.prototype = { constructor: Ra, get: function(e) {
    for (var t = this._; !(t in e); )
      if (!(e = e.parentNode))
        return;
    return e[t];
  }, set: function(e, t) {
    return e[this._] = t;
  }, remove: function(e) {
    return this._ in e && delete e[this._];
  }, toString: function() {
    return this._;
  } };
  const wg = { passive: !1 }, Tr = { capture: !0, passive: !1 };
  function Fa(e) {
    e.stopImmediatePropagation();
  }
  function Yn(e) {
    e.preventDefault(), e.stopImmediatePropagation();
  }
  function Ci(e) {
    var t = e.document.documentElement, n = De(e).on("dragstart.drag", Yn, Tr);
    "onselectstart" in t ? n.on("selectstart.drag", Yn, Tr) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
  }
  function zi(e, t) {
    var n = e.document.documentElement, r = De(e).on("dragstart.drag", null);
    t && (r.on("click.drag", Yn, Tr), setTimeout(function() {
      r.on("click.drag", null);
    }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
  }
  var Li = (e) => () => e;
  function ja(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: o, x: a, y: s, dx: l, dy: u, dispatch: c }) {
    Object.defineProperties(this, { type: { value: e, enumerable: !0, configurable: !0 }, sourceEvent: { value: t, enumerable: !0, configurable: !0 }, subject: { value: n, enumerable: !0, configurable: !0 }, target: { value: r, enumerable: !0, configurable: !0 }, identifier: { value: i, enumerable: !0, configurable: !0 }, active: { value: o, enumerable: !0, configurable: !0 }, x: { value: a, enumerable: !0, configurable: !0 }, y: { value: s, enumerable: !0, configurable: !0 }, dx: { value: l, enumerable: !0, configurable: !0 }, dy: { value: u, enumerable: !0, configurable: !0 }, _: { value: c } });
  }
  function Mg(e) {
    return !e.ctrlKey && !e.button;
  }
  function Eg() {
    return this.parentNode;
  }
  function Sg(e, t) {
    return t ?? { x: e.x, y: e.y };
  }
  function Tg() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function Hn(e, t, n) {
    e.prototype = t.prototype = n, n.constructor = e;
  }
  function kr(e, t) {
    var n = Object.create(e.prototype);
    for (var r in t)
      n[r] = t[r];
    return n;
  }
  function Ht() {
  }
  ja.prototype.on = function() {
    var e = this._.on.apply(this._, arguments);
    return e === this._ ? this : e;
  };
  var vn = 0.7, Vn = 1 / vn, Gn = "\\s*([+-]?\\d+)\\s*", Ar = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Tt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", kg = /^#([0-9a-f]{3,8})$/, Ag = new RegExp(`^rgb\\(${Gn},${Gn},${Gn}\\)$`), Ng = new RegExp(`^rgb\\(${Tt},${Tt},${Tt}\\)$`), Cg = new RegExp(`^rgba\\(${Gn},${Gn},${Gn},${Ar}\\)$`), zg = new RegExp(`^rgba\\(${Tt},${Tt},${Tt},${Ar}\\)$`), Lg = new RegExp(`^hsl\\(${Ar},${Tt},${Tt}\\)$`), Pg = new RegExp(`^hsla\\(${Ar},${Tt},${Tt},${Ar}\\)$`), Ku = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
  function Qu() {
    return this.rgb().formatHex();
  }
  function ec() {
    return this.rgb().formatRgb();
  }
  function Vt(e) {
    var t, n;
    return e = (e + "").trim().toLowerCase(), (t = kg.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? tc(t) : n === 3 ? new $e(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, (15 & t) << 4 | 15 & t, 1) : n === 8 ? Pi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (255 & t) / 255) : n === 4 ? Pi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, ((15 & t) << 4 | 15 & t) / 255) : null) : (t = Ag.exec(e)) ? new $e(t[1], t[2], t[3], 1) : (t = Ng.exec(e)) ? new $e(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, 1) : (t = Cg.exec(e)) ? Pi(t[1], t[2], t[3], t[4]) : (t = zg.exec(e)) ? Pi(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = Lg.exec(e)) ? ic(t[1], t[2] / 100, t[3] / 100, 1) : (t = Pg.exec(e)) ? ic(t[1], t[2] / 100, t[3] / 100, t[4]) : Ku.hasOwnProperty(e) ? tc(Ku[e]) : e === "transparent" ? new $e(NaN, NaN, NaN, 0) : null;
  }
  function tc(e) {
    return new $e(e >> 16 & 255, e >> 8 & 255, 255 & e, 1);
  }
  function Pi(e, t, n, r) {
    return r <= 0 && (e = t = n = NaN), new $e(e, t, n, r);
  }
  function Da(e) {
    return e instanceof Ht || (e = Vt(e)), e ? new $e((e = e.rgb()).r, e.g, e.b, e.opacity) : new $e();
  }
  function Xn(e, t, n, r) {
    return arguments.length === 1 ? Da(e) : new $e(e, t, n, r ?? 1);
  }
  function $e(e, t, n, r) {
    this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
  }
  function nc() {
    return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}`;
  }
  function rc() {
    const e = $i(this.opacity);
    return `${e === 1 ? "rgb(" : "rgba("}${bn(this.r)}, ${bn(this.g)}, ${bn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
  }
  function $i(e) {
    return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
  }
  function bn(e) {
    return Math.max(0, Math.min(255, Math.round(e) || 0));
  }
  function yn(e) {
    return ((e = bn(e)) < 16 ? "0" : "") + e.toString(16);
  }
  function ic(e, t, n, r) {
    return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new bt(e, t, n, r);
  }
  function oc(e) {
    if (e instanceof bt)
      return new bt(e.h, e.s, e.l, e.opacity);
    if (e instanceof Ht || (e = Vt(e)), !e)
      return new bt();
    if (e instanceof bt)
      return e;
    var t = (e = e.rgb()).r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), o = Math.max(t, n, r), a = NaN, s = o - i, l = (o + i) / 2;
    return s ? (a = t === o ? (n - r) / s + 6 * (n < r) : n === o ? (r - t) / s + 2 : (t - n) / s + 4, s /= l < 0.5 ? o + i : 2 - o - i, a *= 60) : s = l > 0 && l < 1 ? 0 : a, new bt(a, s, l, e.opacity);
  }
  function Oi(e, t, n, r) {
    return arguments.length === 1 ? oc(e) : new bt(e, t, n, r ?? 1);
  }
  function bt(e, t, n, r) {
    this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
  }
  function ac(e) {
    return (e = (e || 0) % 360) < 0 ? e + 360 : e;
  }
  function Ii(e) {
    return Math.max(0, Math.min(1, e || 0));
  }
  function qa(e, t, n) {
    return 255 * (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t);
  }
  Hn(Ht, Vt, { copy(e) {
    return Object.assign(new this.constructor(), this, e);
  }, displayable() {
    return this.rgb().displayable();
  }, hex: Qu, formatHex: Qu, formatHex8: function() {
    return this.rgb().formatHex8();
  }, formatHsl: function() {
    return oc(this).formatHsl();
  }, formatRgb: ec, toString: ec }), Hn($e, Xn, kr(Ht, { brighter(e) {
    return e = e == null ? Vn : Math.pow(Vn, e), new $e(this.r * e, this.g * e, this.b * e, this.opacity);
  }, darker(e) {
    return e = e == null ? vn : Math.pow(vn, e), new $e(this.r * e, this.g * e, this.b * e, this.opacity);
  }, rgb() {
    return this;
  }, clamp() {
    return new $e(bn(this.r), bn(this.g), bn(this.b), $i(this.opacity));
  }, displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  }, hex: nc, formatHex: nc, formatHex8: function() {
    return `#${yn(this.r)}${yn(this.g)}${yn(this.b)}${yn(255 * (isNaN(this.opacity) ? 1 : this.opacity))}`;
  }, formatRgb: rc, toString: rc })), Hn(bt, Oi, kr(Ht, { brighter(e) {
    return e = e == null ? Vn : Math.pow(Vn, e), new bt(this.h, this.s, this.l * e, this.opacity);
  }, darker(e) {
    return e = e == null ? vn : Math.pow(vn, e), new bt(this.h, this.s, this.l * e, this.opacity);
  }, rgb() {
    var e = this.h % 360 + 360 * (this.h < 0), t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new $e(qa(e >= 240 ? e - 240 : e + 120, i, r), qa(e, i, r), qa(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
  }, clamp() {
    return new bt(ac(this.h), Ii(this.s), Ii(this.l), $i(this.opacity));
  }, displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  }, formatHsl() {
    const e = $i(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${ac(this.h)}, ${100 * Ii(this.s)}%, ${100 * Ii(this.l)}%${e === 1 ? ")" : `, ${e})`}`;
  } }));
  const sc = Math.PI / 180, lc = 180 / Math.PI, uc = 0.96422, cc = 0.82521, fc = 4 / 29, Ba = 6 / 29, hc = 3 * Ba * Ba;
  function dc(e) {
    if (e instanceof yt)
      return new yt(e.l, e.a, e.b, e.opacity);
    if (e instanceof kt)
      return gc(e);
    e instanceof $e || (e = Da(e));
    var t, n, r = Va(e.r), i = Va(e.g), o = Va(e.b), a = Ua((0.2225045 * r + 0.7168786 * i + 0.0606169 * o) / 1);
    return r === i && i === o ? t = n = a : (t = Ua((0.4360747 * r + 0.3850649 * i + 0.1430804 * o) / uc), n = Ua((0.0139322 * r + 0.0971045 * i + 0.7141733 * o) / cc)), new yt(116 * a - 16, 500 * (t - a), 200 * (a - n), e.opacity);
  }
  function Ri(e, t, n, r) {
    return arguments.length === 1 ? dc(e) : new yt(e, t, n, r ?? 1);
  }
  function yt(e, t, n, r) {
    this.l = +e, this.a = +t, this.b = +n, this.opacity = +r;
  }
  function Ua(e) {
    return e > 0.008856451679035631 ? Math.pow(e, 1 / 3) : e / hc + fc;
  }
  function Ya(e) {
    return e > Ba ? e * e * e : hc * (e - fc);
  }
  function Ha(e) {
    return 255 * (e <= 31308e-7 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055);
  }
  function Va(e) {
    return (e /= 255) <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
  }
  function pc(e) {
    if (e instanceof kt)
      return new kt(e.h, e.c, e.l, e.opacity);
    if (e instanceof yt || (e = dc(e)), e.a === 0 && e.b === 0)
      return new kt(NaN, 0 < e.l && e.l < 100 ? 0 : NaN, e.l, e.opacity);
    var t = Math.atan2(e.b, e.a) * lc;
    return new kt(t < 0 ? t + 360 : t, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity);
  }
  function Fi(e, t, n, r) {
    return arguments.length === 1 ? pc(e) : new kt(e, t, n, r ?? 1);
  }
  function kt(e, t, n, r) {
    this.h = +e, this.c = +t, this.l = +n, this.opacity = +r;
  }
  function gc(e) {
    if (isNaN(e.h))
      return new yt(e.l, 0, 0, e.opacity);
    var t = e.h * sc;
    return new yt(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity);
  }
  Hn(yt, Ri, kr(Ht, { brighter(e) {
    return new yt(this.l + 18 * (e ?? 1), this.a, this.b, this.opacity);
  }, darker(e) {
    return new yt(this.l - 18 * (e ?? 1), this.a, this.b, this.opacity);
  }, rgb() {
    var e = (this.l + 16) / 116, t = isNaN(this.a) ? e : e + this.a / 500, n = isNaN(this.b) ? e : e - this.b / 200;
    return new $e(Ha(3.1338561 * (t = uc * Ya(t)) - 1.6168667 * (e = 1 * Ya(e)) - 0.4906146 * (n = cc * Ya(n))), Ha(-0.9787684 * t + 1.9161415 * e + 0.033454 * n), Ha(0.0719453 * t - 0.2289914 * e + 1.4052427 * n), this.opacity);
  } })), Hn(kt, Fi, kr(Ht, { brighter(e) {
    return new kt(this.h, this.c, this.l + 18 * (e ?? 1), this.opacity);
  }, darker(e) {
    return new kt(this.h, this.c, this.l - 18 * (e ?? 1), this.opacity);
  }, rgb() {
    return gc(this).rgb();
  } }));
  var mc = -0.14861, Ga = 1.78277, Xa = -0.29227, ji = -0.90649, Nr = 1.97294, vc = Nr * ji, bc = Nr * Ga, yc = Ga * Xa - ji * mc;
  function $g(e) {
    if (e instanceof _n)
      return new _n(e.h, e.s, e.l, e.opacity);
    e instanceof $e || (e = Da(e));
    var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = (yc * r + vc * t - bc * n) / (yc + vc - bc), o = r - i, a = (Nr * (n - i) - Xa * o) / ji, s = Math.sqrt(a * a + o * o) / (Nr * i * (1 - i)), l = s ? Math.atan2(a, o) * lc - 120 : NaN;
    return new _n(l < 0 ? l + 360 : l, s, i, e.opacity);
  }
  function _t(e, t, n, r) {
    return arguments.length === 1 ? $g(e) : new _n(e, t, n, r ?? 1);
  }
  function _n(e, t, n, r) {
    this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
  }
  function _c(e, t, n, r, i) {
    var o = e * e, a = o * e;
    return ((1 - 3 * e + 3 * o - a) * t + (4 - 6 * o + 3 * a) * n + (1 + 3 * e + 3 * o - 3 * a) * r + a * i) / 6;
  }
  function xc(e) {
    var t = e.length - 1;
    return function(n) {
      var r = n <= 0 ? n = 0 : n >= 1 ? (n = 1, t - 1) : Math.floor(n * t), i = e[r], o = e[r + 1], a = r > 0 ? e[r - 1] : 2 * i - o, s = r < t - 1 ? e[r + 2] : 2 * o - i;
      return _c((n - r / t) * t, a, i, o, s);
    };
  }
  function wc(e) {
    var t = e.length;
    return function(n) {
      var r = Math.floor(((n %= 1) < 0 ? ++n : n) * t), i = e[(r + t - 1) % t], o = e[r % t], a = e[(r + 1) % t], s = e[(r + 2) % t];
      return _c((n - r / t) * t, i, o, a, s);
    };
  }
  Hn(_n, _t, kr(Ht, { brighter(e) {
    return e = e == null ? Vn : Math.pow(Vn, e), new _n(this.h, this.s, this.l * e, this.opacity);
  }, darker(e) {
    return e = e == null ? vn : Math.pow(vn, e), new _n(this.h, this.s, this.l * e, this.opacity);
  }, rgb() {
    var e = isNaN(this.h) ? 0 : (this.h + 120) * sc, t = +this.l, n = isNaN(this.s) ? 0 : this.s * t * (1 - t), r = Math.cos(e), i = Math.sin(e);
    return new $e(255 * (t + n * (mc * r + Ga * i)), 255 * (t + n * (Xa * r + ji * i)), 255 * (t + n * (Nr * r)), this.opacity);
  } }));
  var Di = (e) => () => e;
  function Mc(e, t) {
    return function(n) {
      return e + n * t;
    };
  }
  function qi(e, t) {
    var n = t - e;
    return n ? Mc(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : Di(isNaN(e) ? t : e);
  }
  function Og(e) {
    return (e = +e) == 1 ? Oe : function(t, n) {
      return n - t ? function(r, i, o) {
        return r = Math.pow(r, o), i = Math.pow(i, o) - r, o = 1 / o, function(a) {
          return Math.pow(r + a * i, o);
        };
      }(t, n, e) : Di(isNaN(t) ? n : t);
    };
  }
  function Oe(e, t) {
    var n = t - e;
    return n ? Mc(e, n) : Di(isNaN(e) ? t : e);
  }
  var Cr = function e(t) {
    var n = Og(t);
    function r(i, o) {
      var a = n((i = Xn(i)).r, (o = Xn(o)).r), s = n(i.g, o.g), l = n(i.b, o.b), u = Oe(i.opacity, o.opacity);
      return function(c) {
        return i.r = a(c), i.g = s(c), i.b = l(c), i.opacity = u(c), i + "";
      };
    }
    return r.gamma = e, r;
  }(1);
  function Ec(e) {
    return function(t) {
      var n, r, i = t.length, o = new Array(i), a = new Array(i), s = new Array(i);
      for (n = 0; n < i; ++n)
        r = Xn(t[n]), o[n] = r.r || 0, a[n] = r.g || 0, s[n] = r.b || 0;
      return o = e(o), a = e(a), s = e(s), r.opacity = 1, function(l) {
        return r.r = o(l), r.g = a(l), r.b = s(l), r + "";
      };
    };
  }
  var Sc = Ec(xc), Ig = Ec(wc);
  function Za(e, t) {
    t || (t = []);
    var n, r = e ? Math.min(t.length, e.length) : 0, i = t.slice();
    return function(o) {
      for (n = 0; n < r; ++n)
        i[n] = e[n] * (1 - o) + t[n] * o;
      return i;
    };
  }
  function Tc(e) {
    return ArrayBuffer.isView(e) && !(e instanceof DataView);
  }
  function kc(e, t) {
    var n, r = t ? t.length : 0, i = e ? Math.min(r, e.length) : 0, o = new Array(i), a = new Array(r);
    for (n = 0; n < i; ++n)
      o[n] = Gt(e[n], t[n]);
    for (; n < r; ++n)
      a[n] = t[n];
    return function(s) {
      for (n = 0; n < i; ++n)
        a[n] = o[n](s);
      return a;
    };
  }
  function Ac(e, t) {
    var n = /* @__PURE__ */ new Date();
    return e = +e, t = +t, function(r) {
      return n.setTime(e * (1 - r) + t * r), n;
    };
  }
  function dt(e, t) {
    return e = +e, t = +t, function(n) {
      return e * (1 - n) + t * n;
    };
  }
  function Nc(e, t) {
    var n, r = {}, i = {};
    for (n in e !== null && typeof e == "object" || (e = {}), t !== null && typeof t == "object" || (t = {}), t)
      n in e ? r[n] = Gt(e[n], t[n]) : i[n] = t[n];
    return function(o) {
      for (n in r)
        i[n] = r[n](o);
      return i;
    };
  }
  var Wa = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ja = new RegExp(Wa.source, "g");
  function Ka(e, t) {
    var n, r, i, o = Wa.lastIndex = Ja.lastIndex = 0, a = -1, s = [], l = [];
    for (e += "", t += ""; (n = Wa.exec(e)) && (r = Ja.exec(t)); )
      (i = r.index) > o && (i = t.slice(o, i), s[a] ? s[a] += i : s[++a] = i), (n = n[0]) === (r = r[0]) ? s[a] ? s[a] += r : s[++a] = r : (s[++a] = null, l.push({ i: a, x: dt(n, r) })), o = Ja.lastIndex;
    return o < t.length && (i = t.slice(o), s[a] ? s[a] += i : s[++a] = i), s.length < 2 ? l[0] ? /* @__PURE__ */ function(u) {
      return function(c) {
        return u(c) + "";
      };
    }(l[0].x) : /* @__PURE__ */ function(u) {
      return function() {
        return u;
      };
    }(t) : (t = l.length, function(u) {
      for (var c, d = 0; d < t; ++d)
        s[(c = l[d]).i] = c.x(u);
      return s.join("");
    });
  }
  function Gt(e, t) {
    var n, r = typeof t;
    return t == null || r === "boolean" ? Di(t) : (r === "number" ? dt : r === "string" ? (n = Vt(t)) ? (t = n, Cr) : Ka : t instanceof Vt ? Cr : t instanceof Date ? Ac : Tc(t) ? Za : Array.isArray(t) ? kc : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Nc : dt)(e, t);
  }
  function Bi(e, t) {
    return e = +e, t = +t, function(n) {
      return Math.round(e * (1 - n) + t * n);
    };
  }
  var Ui, Cc = 180 / Math.PI, Qa = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
  function zc(e, t, n, r, i, o) {
    var a, s, l;
    return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * n + t * r) && (n -= e * l, r -= t * l), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, l /= s), e * r < t * n && (e = -e, t = -t, l = -l, a = -a), { translateX: i, translateY: o, rotate: Math.atan2(t, e) * Cc, skewX: Math.atan(l) * Cc, scaleX: a, scaleY: s };
  }
  function Lc(e, t, n, r) {
    function i(o) {
      return o.length ? o.pop() + " " : "";
    }
    return function(o, a) {
      var s = [], l = [];
      return o = e(o), a = e(a), function(u, c, d, h, p, b) {
        if (u !== d || c !== h) {
          var m = p.push("translate(", null, t, null, n);
          b.push({ i: m - 4, x: dt(u, d) }, { i: m - 2, x: dt(c, h) });
        } else
          (d || h) && p.push("translate(" + d + t + h + n);
      }(o.translateX, o.translateY, a.translateX, a.translateY, s, l), function(u, c, d, h) {
        u !== c ? (u - c > 180 ? c += 360 : c - u > 180 && (u += 360), h.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: dt(u, c) })) : c && d.push(i(d) + "rotate(" + c + r);
      }(o.rotate, a.rotate, s, l), function(u, c, d, h) {
        u !== c ? h.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: dt(u, c) }) : c && d.push(i(d) + "skewX(" + c + r);
      }(o.skewX, a.skewX, s, l), function(u, c, d, h, p, b) {
        if (u !== d || c !== h) {
          var m = p.push(i(p) + "scale(", null, ",", null, ")");
          b.push({ i: m - 4, x: dt(u, d) }, { i: m - 2, x: dt(c, h) });
        } else
          d === 1 && h === 1 || p.push(i(p) + "scale(" + d + "," + h + ")");
      }(o.scaleX, o.scaleY, a.scaleX, a.scaleY, s, l), o = a = null, function(u) {
        for (var c, d = -1, h = l.length; ++d < h; )
          s[(c = l[d]).i] = c.x(u);
        return s.join("");
      };
    };
  }
  var Pc = Lc(function(e) {
    const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
    return t.isIdentity ? Qa : zc(t.a, t.b, t.c, t.d, t.e, t.f);
  }, "px, ", "px)", "deg)"), $c = Lc(function(e) {
    return e == null ? Qa : (Ui || (Ui = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ui.setAttribute("transform", e), (e = Ui.transform.baseVal.consolidate()) ? zc((e = e.matrix).a, e.b, e.c, e.d, e.e, e.f) : Qa);
  }, ", ", ")", ")");
  function Oc(e) {
    return ((e = Math.exp(e)) + 1 / e) / 2;
  }
  var Ic = function e(t, n, r) {
    function i(o, a) {
      var s, l, u = o[0], c = o[1], d = o[2], h = a[0], p = a[1], b = a[2], m = h - u, g = p - c, v = m * m + g * g;
      if (v < 1e-12)
        l = Math.log(b / d) / t, s = function(O) {
          return [u + O * m, c + O * g, d * Math.exp(t * O * l)];
        };
      else {
        var M = Math.sqrt(v), _ = (b * b - d * d + r * v) / (2 * d * n * M), y = (b * b - d * d - r * v) / (2 * b * n * M), E = Math.log(Math.sqrt(_ * _ + 1) - _), S = Math.log(Math.sqrt(y * y + 1) - y);
        l = (S - E) / t, s = function(O) {
          var j = O * l, z = Oc(E), C = d / (n * M) * (z * function(N) {
            return ((N = Math.exp(2 * N)) - 1) / (N + 1);
          }(t * j + E) - function(N) {
            return ((N = Math.exp(N)) - 1 / N) / 2;
          }(E));
          return [u + C * m, c + C * g, d * z / Oc(t * j + E)];
        };
      }
      return s.duration = 1e3 * l * t / Math.SQRT2, s;
    }
    return i.rho = function(o) {
      var a = Math.max(1e-3, +o), s = a * a;
      return e(a, s, s * s);
    }, i;
  }(Math.SQRT2, 2, 4);
  function Rc(e) {
    return function(t, n) {
      var r = e((t = Oi(t)).h, (n = Oi(n)).h), i = Oe(t.s, n.s), o = Oe(t.l, n.l), a = Oe(t.opacity, n.opacity);
      return function(s) {
        return t.h = r(s), t.s = i(s), t.l = o(s), t.opacity = a(s), t + "";
      };
    };
  }
  var Rg = Rc(qi), Fg = Rc(Oe);
  function Fc(e) {
    return function(t, n) {
      var r = e((t = Fi(t)).h, (n = Fi(n)).h), i = Oe(t.c, n.c), o = Oe(t.l, n.l), a = Oe(t.opacity, n.opacity);
      return function(s) {
        return t.h = r(s), t.c = i(s), t.l = o(s), t.opacity = a(s), t + "";
      };
    };
  }
  var jg = Fc(qi), Dg = Fc(Oe);
  function jc(e) {
    return function t(n) {
      function r(i, o) {
        var a = e((i = _t(i)).h, (o = _t(o)).h), s = Oe(i.s, o.s), l = Oe(i.l, o.l), u = Oe(i.opacity, o.opacity);
        return function(c) {
          return i.h = a(c), i.s = s(c), i.l = l(Math.pow(c, n)), i.opacity = u(c), i + "";
        };
      }
      return n = +n, r.gamma = t, r;
    }(1);
  }
  var qg = jc(qi), Yi = jc(Oe);
  function Dc(e, t) {
    t === void 0 && (t = e, e = Gt);
    for (var n = 0, r = t.length - 1, i = t[0], o = new Array(r < 0 ? 0 : r); n < r; )
      o[n] = e(i, i = t[++n]);
    return function(a) {
      var s = Math.max(0, Math.min(r - 1, Math.floor(a *= r)));
      return o[s](a - s);
    };
  }
  var Hi, zr, Zn = 0, Lr = 0, Pr = 0, Vi = 0, xn = 0, Gi = 0, $r = typeof performance == "object" && performance.now ? performance : Date, qc = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
    setTimeout(e, 17);
  };
  function Or() {
    return xn || (qc(Bg), xn = $r.now() + Gi);
  }
  function Bg() {
    xn = 0;
  }
  function Ir() {
    this._call = this._time = this._next = null;
  }
  function Xi(e, t, n) {
    var r = new Ir();
    return r.restart(e, t, n), r;
  }
  function Bc() {
    Or(), ++Zn;
    for (var e, t = Hi; t; )
      (e = xn - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
    --Zn;
  }
  function Uc() {
    xn = (Vi = $r.now()) + Gi, Zn = Lr = 0;
    try {
      Bc();
    } finally {
      Zn = 0, function() {
        for (var e, t, n = Hi, r = 1 / 0; n; )
          n._call ? (r > n._time && (r = n._time), e = n, n = n._next) : (t = n._next, n._next = null, n = e ? e._next = t : Hi = t);
        zr = e, es(r);
      }(), xn = 0;
    }
  }
  function Ug() {
    var e = $r.now(), t = e - Vi;
    t > 1e3 && (Gi -= t, Vi = e);
  }
  function es(e) {
    Zn || (Lr && (Lr = clearTimeout(Lr)), e - xn > 24 ? (e < 1 / 0 && (Lr = setTimeout(Uc, e - $r.now() - Gi)), Pr && (Pr = clearInterval(Pr))) : (Pr || (Vi = $r.now(), Pr = setInterval(Ug, 1e3)), Zn = 1, qc(Uc)));
  }
  function ts(e, t, n) {
    var r = new Ir();
    return t = t == null ? 0 : +t, r.restart((i) => {
      r.stop(), e(i + t);
    }, t, n), r;
  }
  Ir.prototype = Xi.prototype = { constructor: Ir, restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? Or() : +n) + (t == null ? 0 : +t), this._next || zr === this || (zr ? zr._next = this : Hi = this, zr = this), this._call = e, this._time = n, es();
  }, stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, es());
  } };
  var Yg = pn("start", "end", "cancel", "interrupt"), Hg = [];
  function Zi(e, t, n, r, i, o) {
    var a = e.__transition;
    if (a) {
      if (n in a)
        return;
    } else
      e.__transition = {};
    (function(s, l, u) {
      var c, d = s.__transition;
      function h(g) {
        u.state = 1, u.timer.restart(p, u.delay, u.time), u.delay <= g && p(g - u.delay);
      }
      function p(g) {
        var v, M, _, y;
        if (u.state !== 1)
          return m();
        for (v in d)
          if ((y = d[v]).name === u.name) {
            if (y.state === 3)
              return ts(p);
            y.state === 4 ? (y.state = 6, y.timer.stop(), y.on.call("interrupt", s, s.__data__, y.index, y.group), delete d[v]) : +v < l && (y.state = 6, y.timer.stop(), y.on.call("cancel", s, s.__data__, y.index, y.group), delete d[v]);
          }
        if (ts(function() {
          u.state === 3 && (u.state = 4, u.timer.restart(b, u.delay, u.time), b(g));
        }), u.state = 2, u.on.call("start", s, s.__data__, u.index, u.group), u.state === 2) {
          for (u.state = 3, c = new Array(_ = u.tween.length), v = 0, M = -1; v < _; ++v)
            (y = u.tween[v].value.call(s, s.__data__, u.index, u.group)) && (c[++M] = y);
          c.length = M + 1;
        }
      }
      function b(g) {
        for (var v = g < u.duration ? u.ease.call(null, g / u.duration) : (u.timer.restart(m), u.state = 5, 1), M = -1, _ = c.length; ++M < _; )
          c[M].call(s, v);
        u.state === 5 && (u.on.call("end", s, s.__data__, u.index, u.group), m());
      }
      function m() {
        for (var g in u.state = 6, u.timer.stop(), delete d[l], d)
          return;
        delete s.__transition;
      }
      d[l] = u, u.timer = Xi(h, 0, u.time);
    })(e, n, { name: t, index: r, group: i, on: Yg, tween: Hg, time: o.time, delay: o.delay, duration: o.duration, ease: o.ease, timer: null, state: 0 });
  }
  function ns(e, t) {
    var n = xt(e, t);
    if (n.state > 0)
      throw new Error("too late; already scheduled");
    return n;
  }
  function At(e, t) {
    var n = xt(e, t);
    if (n.state > 3)
      throw new Error("too late; already running");
    return n;
  }
  function xt(e, t) {
    var n = e.__transition;
    if (!n || !(n = n[t]))
      throw new Error("transition not found");
    return n;
  }
  function wn(e, t) {
    var n, r, i, o = e.__transition, a = !0;
    if (o) {
      for (i in t = t == null ? null : t + "", o)
        (n = o[i]).name === t ? (r = n.state > 2 && n.state < 5, n.state = 6, n.timer.stop(), n.on.call(r ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete o[i]) : a = !1;
      a && delete e.__transition;
    }
  }
  function Vg(e, t) {
    var n, r;
    return function() {
      var i = At(this, e), o = i.tween;
      if (o !== n) {
        for (var a = 0, s = (r = n = o).length; a < s; ++a)
          if (r[a].name === t) {
            (r = r.slice()).splice(a, 1);
            break;
          }
      }
      i.tween = r;
    };
  }
  function Gg(e, t, n) {
    var r, i;
    if (typeof n != "function")
      throw new Error();
    return function() {
      var o = At(this, e), a = o.tween;
      if (a !== r) {
        i = (r = a).slice();
        for (var s = { name: t, value: n }, l = 0, u = i.length; l < u; ++l)
          if (i[l].name === t) {
            i[l] = s;
            break;
          }
        l === u && i.push(s);
      }
      o.tween = i;
    };
  }
  function rs(e, t, n) {
    var r = e._id;
    return e.each(function() {
      var i = At(this, r);
      (i.value || (i.value = {}))[t] = n.apply(this, arguments);
    }), function(i) {
      return xt(i, r).value[t];
    };
  }
  function Yc(e, t) {
    var n;
    return (typeof t == "number" ? dt : t instanceof Vt ? Cr : (n = Vt(t)) ? (t = n, Cr) : Ka)(e, t);
  }
  function Xg(e) {
    return function() {
      this.removeAttribute(e);
    };
  }
  function Zg(e) {
    return function() {
      this.removeAttributeNS(e.space, e.local);
    };
  }
  function Wg(e, t, n) {
    var r, i, o = n + "";
    return function() {
      var a = this.getAttribute(e);
      return a === o ? null : a === r ? i : i = t(r = a, n);
    };
  }
  function Jg(e, t, n) {
    var r, i, o = n + "";
    return function() {
      var a = this.getAttributeNS(e.space, e.local);
      return a === o ? null : a === r ? i : i = t(r = a, n);
    };
  }
  function Kg(e, t, n) {
    var r, i, o;
    return function() {
      var a, s, l = n(this);
      if (l != null)
        return (a = this.getAttribute(e)) === (s = l + "") ? null : a === r && s === i ? o : (i = s, o = t(r = a, l));
      this.removeAttribute(e);
    };
  }
  function Qg(e, t, n) {
    var r, i, o;
    return function() {
      var a, s, l = n(this);
      if (l != null)
        return (a = this.getAttributeNS(e.space, e.local)) === (s = l + "") ? null : a === r && s === i ? o : (i = s, o = t(r = a, l));
      this.removeAttributeNS(e.space, e.local);
    };
  }
  function em(e, t) {
    return function(n) {
      this.setAttribute(e, t.call(this, n));
    };
  }
  function tm(e, t) {
    return function(n) {
      this.setAttributeNS(e.space, e.local, t.call(this, n));
    };
  }
  function nm(e, t) {
    var n, r;
    function i() {
      var o = t.apply(this, arguments);
      return o !== r && (n = (r = o) && tm(e, o)), n;
    }
    return i._value = t, i;
  }
  function rm(e, t) {
    var n, r;
    function i() {
      var o = t.apply(this, arguments);
      return o !== r && (n = (r = o) && em(e, o)), n;
    }
    return i._value = t, i;
  }
  function im(e, t) {
    return function() {
      ns(this, e).delay = +t.apply(this, arguments);
    };
  }
  function om(e, t) {
    return t = +t, function() {
      ns(this, e).delay = t;
    };
  }
  function am(e, t) {
    return function() {
      At(this, e).duration = +t.apply(this, arguments);
    };
  }
  function sm(e, t) {
    return t = +t, function() {
      At(this, e).duration = t;
    };
  }
  function lm(e, t) {
    if (typeof t != "function")
      throw new Error();
    return function() {
      At(this, e).ease = t;
    };
  }
  function um(e, t, n) {
    var r, i, o = function(a) {
      return (a + "").trim().split(/^|\s+/).every(function(s) {
        var l = s.indexOf(".");
        return l >= 0 && (s = s.slice(0, l)), !s || s === "start";
      });
    }(t) ? ns : At;
    return function() {
      var a = o(this, e), s = a.on;
      s !== r && (i = (r = s).copy()).on(t, n), a.on = i;
    };
  }
  var cm = mn.prototype.constructor;
  function Hc(e) {
    return function() {
      this.style.removeProperty(e);
    };
  }
  function fm(e, t, n) {
    return function(r) {
      this.style.setProperty(e, t.call(this, r), n);
    };
  }
  function hm(e, t, n) {
    var r, i;
    function o() {
      var a = t.apply(this, arguments);
      return a !== i && (r = (i = a) && fm(e, a, n)), r;
    }
    return o._value = t, o;
  }
  function dm(e) {
    return function(t) {
      this.textContent = e.call(this, t);
    };
  }
  function pm(e) {
    var t, n;
    function r() {
      var i = e.apply(this, arguments);
      return i !== n && (t = (n = i) && dm(i)), t;
    }
    return r._value = e, r;
  }
  var gm = 0;
  function Nt(e, t, n, r) {
    this._groups = e, this._parents = t, this._name = n, this._id = r;
  }
  function Vc(e) {
    return mn().transition(e);
  }
  function Gc() {
    return ++gm;
  }
  var Rt = mn.prototype;
  Nt.prototype = Vc.prototype = { constructor: Nt, select: function(e) {
    var t = this._name, n = this._id;
    typeof e != "function" && (e = Ai(e));
    for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
      for (var s, l, u = r[a], c = u.length, d = o[a] = new Array(c), h = 0; h < c; ++h)
        (s = u[h]) && (l = e.call(s, s.__data__, h, u)) && ("__data__" in s && (l.__data__ = s.__data__), d[h] = l, Zi(d[h], t, n, h, d, xt(s, n)));
    return new Nt(o, this._parents, t, n);
  }, selectAll: function(e) {
    var t = this._name, n = this._id;
    typeof e != "function" && (e = La(e));
    for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
      for (var l, u = r[s], c = u.length, d = 0; d < c; ++d)
        if (l = u[d]) {
          for (var h, p = e.call(l, l.__data__, d, u), b = xt(l, n), m = 0, g = p.length; m < g; ++m)
            (h = p[m]) && Zi(h, t, n, m, p, b);
          o.push(p), a.push(l);
        }
    return new Nt(o, a, t, n);
  }, selectChild: Rt.selectChild, selectChildren: Rt.selectChildren, filter: function(e) {
    typeof e != "function" && (e = Pa(e));
    for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
      for (var o, a = t[i], s = a.length, l = r[i] = [], u = 0; u < s; ++u)
        (o = a[u]) && e.call(o, o.__data__, u, a) && l.push(o);
    return new Nt(r, this._parents, this._name, this._id);
  }, merge: function(e) {
    if (e._id !== this._id)
      throw new Error();
    for (var t = this._groups, n = e._groups, r = t.length, i = n.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
      for (var l, u = t[s], c = n[s], d = u.length, h = a[s] = new Array(d), p = 0; p < d; ++p)
        (l = u[p] || c[p]) && (h[p] = l);
    for (; s < r; ++s)
      a[s] = t[s];
    return new Nt(a, this._parents, this._name, this._id);
  }, selection: function() {
    return new cm(this._groups, this._parents);
  }, transition: function() {
    for (var e = this._name, t = this._id, n = Gc(), r = this._groups, i = r.length, o = 0; o < i; ++o)
      for (var a, s = r[o], l = s.length, u = 0; u < l; ++u)
        if (a = s[u]) {
          var c = xt(a, t);
          Zi(a, e, n, u, s, { time: c.time + c.delay + c.duration, delay: 0, duration: c.duration, ease: c.ease });
        }
    return new Nt(r, this._parents, e, n);
  }, call: Rt.call, nodes: Rt.nodes, node: Rt.node, size: Rt.size, empty: Rt.empty, each: Rt.each, on: function(e, t) {
    var n = this._id;
    return arguments.length < 2 ? xt(this.node(), n).on.on(e) : this.each(um(n, e, t));
  }, attr: function(e, t) {
    var n = Sr(e), r = n === "transform" ? $c : Yc;
    return this.attrTween(e, typeof t == "function" ? (n.local ? Qg : Kg)(n, r, rs(this, "attr." + e, t)) : t == null ? (n.local ? Zg : Xg)(n) : (n.local ? Jg : Wg)(n, r, t));
  }, attrTween: function(e, t) {
    var n = "attr." + e;
    if (arguments.length < 2)
      return (n = this.tween(n)) && n._value;
    if (t == null)
      return this.tween(n, null);
    if (typeof t != "function")
      throw new Error();
    var r = Sr(e);
    return this.tween(n, (r.local ? nm : rm)(r, t));
  }, style: function(e, t, n) {
    var r = (e += "") == "transform" ? Pc : Yc;
    return t == null ? this.styleTween(e, /* @__PURE__ */ function(i, o) {
      var a, s, l;
      return function() {
        var u = gn(this, i), c = (this.style.removeProperty(i), gn(this, i));
        return u === c ? null : u === a && c === s ? l : l = o(a = u, s = c);
      };
    }(e, r)).on("end.style." + e, Hc(e)) : typeof t == "function" ? this.styleTween(e, /* @__PURE__ */ function(i, o, a) {
      var s, l, u;
      return function() {
        var c = gn(this, i), d = a(this), h = d + "";
        return d == null && (this.style.removeProperty(i), h = d = gn(this, i)), c === h ? null : c === s && h === l ? u : (l = h, u = o(s = c, d));
      };
    }(e, r, rs(this, "style." + e, t))).each(function(i, o) {
      var a, s, l, u, c = "style." + o, d = "end." + c;
      return function() {
        var h = At(this, i), p = h.on, b = h.value[c] == null ? u || (u = Hc(o)) : void 0;
        p === a && l === b || (s = (a = p).copy()).on(d, l = b), h.on = s;
      };
    }(this._id, e)) : this.styleTween(e, function(i, o, a) {
      var s, l, u = a + "";
      return function() {
        var c = gn(this, i);
        return c === u ? null : c === s ? l : l = o(s = c, a);
      };
    }(e, r, t), n).on("end.style." + e, null);
  }, styleTween: function(e, t, n) {
    var r = "style." + (e += "");
    if (arguments.length < 2)
      return (r = this.tween(r)) && r._value;
    if (t == null)
      return this.tween(r, null);
    if (typeof t != "function")
      throw new Error();
    return this.tween(r, hm(e, t, n ?? ""));
  }, text: function(e) {
    return this.tween("text", typeof e == "function" ? /* @__PURE__ */ function(t) {
      return function() {
        var n = t(this);
        this.textContent = n ?? "";
      };
    }(rs(this, "text", e)) : /* @__PURE__ */ function(t) {
      return function() {
        this.textContent = t;
      };
    }(e == null ? "" : e + ""));
  }, textTween: function(e) {
    var t = "text";
    if (arguments.length < 1)
      return (t = this.tween(t)) && t._value;
    if (e == null)
      return this.tween(t, null);
    if (typeof e != "function")
      throw new Error();
    return this.tween(t, pm(e));
  }, remove: function() {
    return this.on("end.remove", /* @__PURE__ */ function(e) {
      return function() {
        var t = this.parentNode;
        for (var n in this.__transition)
          if (+n !== e)
            return;
        t && t.removeChild(this);
      };
    }(this._id));
  }, tween: function(e, t) {
    var n = this._id;
    if (e += "", arguments.length < 2) {
      for (var r, i = xt(this.node(), n).tween, o = 0, a = i.length; o < a; ++o)
        if ((r = i[o]).name === e)
          return r.value;
      return null;
    }
    return this.each((t == null ? Vg : Gg)(n, e, t));
  }, delay: function(e) {
    var t = this._id;
    return arguments.length ? this.each((typeof e == "function" ? im : om)(t, e)) : xt(this.node(), t).delay;
  }, duration: function(e) {
    var t = this._id;
    return arguments.length ? this.each((typeof e == "function" ? am : sm)(t, e)) : xt(this.node(), t).duration;
  }, ease: function(e) {
    var t = this._id;
    return arguments.length ? this.each(lm(t, e)) : xt(this.node(), t).ease;
  }, easeVarying: function(e) {
    if (typeof e != "function")
      throw new Error();
    return this.each(/* @__PURE__ */ function(t, n) {
      return function() {
        var r = n.apply(this, arguments);
        if (typeof r != "function")
          throw new Error();
        At(this, t).ease = r;
      };
    }(this._id, e));
  }, end: function() {
    var e, t, n = this, r = n._id, i = n.size();
    return new Promise(function(o, a) {
      var s = { value: a }, l = { value: function() {
        --i == 0 && o();
      } };
      n.each(function() {
        var u = At(this, r), c = u.on;
        c !== e && ((t = (e = c).copy())._.cancel.push(s), t._.interrupt.push(s), t._.end.push(l)), u.on = t;
      }), i === 0 && o();
    });
  }, [Symbol.iterator]: Rt[Symbol.iterator] };
  function Xc(e) {
    return ((e *= 2) <= 1 ? e * e : --e * (2 - e) + 1) / 2;
  }
  function is(e) {
    return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
  }
  var mm = function e(t) {
    function n(r) {
      return Math.pow(r, t);
    }
    return t = +t, n.exponent = e, n;
  }(3), vm = function e(t) {
    function n(r) {
      return 1 - Math.pow(1 - r, t);
    }
    return t = +t, n.exponent = e, n;
  }(3), Zc = function e(t) {
    function n(r) {
      return ((r *= 2) <= 1 ? Math.pow(r, t) : 2 - Math.pow(2 - r, t)) / 2;
    }
    return t = +t, n.exponent = e, n;
  }(3), Wc = Math.PI, Jc = Wc / 2;
  function Kc(e) {
    return (1 - Math.cos(Wc * e)) / 2;
  }
  function Xt(e) {
    return 1.0009775171065494 * (Math.pow(2, -10 * e) - 9765625e-10);
  }
  function Qc(e) {
    return ((e *= 2) <= 1 ? Xt(1 - e) : 2 - Xt(e - 1)) / 2;
  }
  function ef(e) {
    return ((e *= 2) <= 1 ? 1 - Math.sqrt(1 - e * e) : Math.sqrt(1 - (e -= 2) * e) + 1) / 2;
  }
  var bm = 4 / 11, Wi = 7.5625;
  function Rr(e) {
    return (e = +e) < bm ? Wi * e * e : e < 0.7272727272727273 ? Wi * (e -= 0.5454545454545454) * e + 0.75 : e < 0.9090909090909091 ? Wi * (e -= 0.8181818181818182) * e + 0.9375 : Wi * (e -= 0.9545454545454546) * e + 0.984375;
  }
  var os = 1.70158, ym = function e(t) {
    function n(r) {
      return (r = +r) * r * (t * (r - 1) + r);
    }
    return t = +t, n.overshoot = e, n;
  }(os), _m = function e(t) {
    function n(r) {
      return --r * r * ((r + 1) * t + r) + 1;
    }
    return t = +t, n.overshoot = e, n;
  }(os), tf = function e(t) {
    function n(r) {
      return ((r *= 2) < 1 ? r * r * ((t + 1) * r - t) : (r -= 2) * r * ((t + 1) * r + t) + 2) / 2;
    }
    return t = +t, n.overshoot = e, n;
  }(os), Wn = 2 * Math.PI, xm = function e(t, n) {
    var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= Wn);
    function i(o) {
      return t * Xt(- --o) * Math.sin((r - o) / n);
    }
    return i.amplitude = function(o) {
      return e(o, n * Wn);
    }, i.period = function(o) {
      return e(t, o);
    }, i;
  }(1, 0.3), nf = function e(t, n) {
    var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= Wn);
    function i(o) {
      return 1 - t * Xt(o = +o) * Math.sin((o + r) / n);
    }
    return i.amplitude = function(o) {
      return e(o, n * Wn);
    }, i.period = function(o) {
      return e(t, o);
    }, i;
  }(1, 0.3), wm = function e(t, n) {
    var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= Wn);
    function i(o) {
      return ((o = 2 * o - 1) < 0 ? t * Xt(-o) * Math.sin((r - o) / n) : 2 - t * Xt(o) * Math.sin((r + o) / n)) / 2;
    }
    return i.amplitude = function(o) {
      return e(o, n * Wn);
    }, i.period = function(o) {
      return e(t, o);
    }, i;
  }(1, 0.3), Mm = { time: null, delay: 0, duration: 250, ease: is };
  function Em(e, t) {
    for (var n; !(n = e.__transition) || !(n = n[t]); )
      if (!(e = e.parentNode))
        throw new Error(`transition ${t} not found`);
    return n;
  }
  mn.prototype.interrupt = function(e) {
    return this.each(function() {
      wn(this, e);
    });
  }, mn.prototype.transition = function(e) {
    var t, n;
    e instanceof Nt ? (t = e._id, e = e._name) : (t = Gc(), (n = Mm).time = Or(), e = e == null ? null : e + "");
    for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
      for (var a, s = r[o], l = s.length, u = 0; u < l; ++u)
        (a = s[u]) && Zi(a, e, t, u, s, n || Em(a, t));
    return new Nt(r, this._parents, e, t);
  };
  var Sm = [null], as = (e) => () => e;
  function Tm(e, { sourceEvent: t, target: n, selection: r, mode: i, dispatch: o }) {
    Object.defineProperties(this, { type: { value: e, enumerable: !0, configurable: !0 }, sourceEvent: { value: t, enumerable: !0, configurable: !0 }, target: { value: n, enumerable: !0, configurable: !0 }, selection: { value: r, enumerable: !0, configurable: !0 }, mode: { value: i, enumerable: !0, configurable: !0 }, _: { value: o } });
  }
  function km(e) {
    e.stopImmediatePropagation();
  }
  function ss(e) {
    e.preventDefault(), e.stopImmediatePropagation();
  }
  var rf = { name: "drag" }, ls = { name: "space" }, Jn = { name: "handle" }, Kn = { name: "center" };
  const { abs: of, max: qe, min: Be } = Math;
  function af(e) {
    return [+e[0], +e[1]];
  }
  function us(e) {
    return [af(e[0]), af(e[1])];
  }
  var Ji = { name: "x", handles: ["w", "e"].map(Fr), input: function(e, t) {
    return e == null ? null : [[+e[0], t[0][1]], [+e[1], t[1][1]]];
  }, output: function(e) {
    return e && [e[0][0], e[1][0]];
  } }, Ki = { name: "y", handles: ["n", "s"].map(Fr), input: function(e, t) {
    return e == null ? null : [[t[0][0], +e[0]], [t[1][0], +e[1]]];
  }, output: function(e) {
    return e && [e[0][1], e[1][1]];
  } }, Am = { name: "xy", handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Fr), input: function(e) {
    return e == null ? null : us(e);
  }, output: function(e) {
    return e;
  } }, Ft = { overlay: "crosshair", selection: "move", n: "ns-resize", e: "ew-resize", s: "ns-resize", w: "ew-resize", nw: "nwse-resize", ne: "nesw-resize", se: "nwse-resize", sw: "nesw-resize" }, sf = { e: "w", w: "e", nw: "ne", ne: "nw", se: "sw", sw: "se" }, lf = { n: "s", s: "n", nw: "sw", ne: "se", se: "ne", sw: "nw" }, Nm = { overlay: 1, selection: 1, n: null, e: 1, s: null, w: -1, nw: -1, ne: 1, se: 1, sw: -1 }, Cm = { overlay: 1, selection: 1, n: -1, e: null, s: 1, w: null, nw: -1, ne: -1, se: 1, sw: 1 };
  function Fr(e) {
    return { type: e };
  }
  function zm(e) {
    return !e.ctrlKey && !e.button;
  }
  function Lm() {
    var e = this.ownerSVGElement || this;
    return e.hasAttribute("viewBox") ? [[(e = e.viewBox.baseVal).x, e.y], [e.x + e.width, e.y + e.height]] : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  function Pm() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function cs(e) {
    for (; !e.__brush; )
      if (!(e = e.parentNode))
        return;
    return e.__brush;
  }
  function $m(e) {
    return e[0][0] === e[1][0] || e[0][1] === e[1][1];
  }
  function fs(e) {
    var t, n = Lm, r = zm, i = Pm, o = !0, a = pn("start", "brush", "end"), s = 6;
    function l(g) {
      var v = g.property("__brush", m).selectAll(".overlay").data([Fr("overlay")]);
      v.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", Ft.overlay).merge(v).each(function() {
        var _ = cs(this).extent;
        De(this).attr("x", _[0][0]).attr("y", _[0][1]).attr("width", _[1][0] - _[0][0]).attr("height", _[1][1] - _[0][1]);
      }), g.selectAll(".selection").data([Fr("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", Ft.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
      var M = g.selectAll(".handle").data(e.handles, function(_) {
        return _.type;
      });
      M.exit().remove(), M.enter().append("rect").attr("class", function(_) {
        return "handle handle--" + _.type;
      }).attr("cursor", function(_) {
        return Ft[_.type];
      }), g.each(u).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", h).filter(i).on("touchstart.brush", h).on("touchmove.brush", p).on("touchend.brush touchcancel.brush", b).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function u() {
      var g = De(this), v = cs(this).selection;
      v ? (g.selectAll(".selection").style("display", null).attr("x", v[0][0]).attr("y", v[0][1]).attr("width", v[1][0] - v[0][0]).attr("height", v[1][1] - v[0][1]), g.selectAll(".handle").style("display", null).attr("x", function(M) {
        return M.type[M.type.length - 1] === "e" ? v[1][0] - s / 2 : v[0][0] - s / 2;
      }).attr("y", function(M) {
        return M.type[0] === "s" ? v[1][1] - s / 2 : v[0][1] - s / 2;
      }).attr("width", function(M) {
        return M.type === "n" || M.type === "s" ? v[1][0] - v[0][0] + s : s;
      }).attr("height", function(M) {
        return M.type === "e" || M.type === "w" ? v[1][1] - v[0][1] + s : s;
      })) : g.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
    }
    function c(g, v, M) {
      var _ = g.__brush.emitter;
      return !_ || M && _.clean ? new d(g, v, M) : _;
    }
    function d(g, v, M) {
      this.that = g, this.args = v, this.state = g.__brush, this.active = 0, this.clean = M;
    }
    function h(g) {
      if ((!t || g.touches) && r.apply(this, arguments)) {
        var v, M, _, y, E, S, O, j, z, C, N, P = this, T = g.target.__data__.type, A = (o && g.metaKey ? T = "overlay" : T) === "selection" ? rf : o && g.altKey ? Kn : Jn, $ = e === Ki ? null : Nm[T], I = e === Ji ? null : Cm[T], D = cs(P), B = D.extent, H = D.selection, Z = B[0][0], V = B[0][1], ae = B[1][0], se = B[1][1], K = 0, te = 0, ye = $ && I && o && g.shiftKey, he = Array.from(g.touches || [g], (de) => {
          const Pe = de.identifier;
          return (de = ct(de, P)).point0 = de.slice(), de.identifier = Pe, de;
        });
        wn(P);
        var rt = c(P, arguments, !0).beforestart();
        if (T === "overlay") {
          H && (z = !0);
          const de = [he[0], he[1] || he[0]];
          D.selection = H = [[v = e === Ki ? Z : Be(de[0][0], de[1][0]), _ = e === Ji ? V : Be(de[0][1], de[1][1])], [E = e === Ki ? ae : qe(de[0][0], de[1][0]), O = e === Ji ? se : qe(de[0][1], de[1][1])]], he.length > 1 && Rn(g);
        } else
          v = H[0][0], _ = H[0][1], E = H[1][0], O = H[1][1];
        M = v, y = _, S = E, j = O;
        var cn = De(P).attr("pointer-events", "none"), St = cn.selectAll(".overlay").attr("cursor", Ft[T]);
        if (g.touches)
          rt.moved = Vp, rt.ended = Gp;
        else {
          var _r = De(g.view).on("mousemove.brush", Vp, !0).on("mouseup.brush", Gp, !0);
          o && _r.on("keydown.brush", nx, !0).on("keyup.brush", rx, !0), Ci(g.view);
        }
        u.call(P), rt.start(g, A.name);
      }
      function Vp(de) {
        for (const Pe of de.changedTouches || [de])
          for (const _i of he)
            _i.identifier === Pe.identifier && (_i.cur = ct(Pe, P));
        if (ye && !C && !N && he.length === 1) {
          const Pe = he[0];
          of(Pe.cur[0] - Pe[0]) > of(Pe.cur[1] - Pe[1]) ? N = !0 : C = !0;
        }
        for (const Pe of he)
          Pe.cur && (Pe[0] = Pe.cur[0], Pe[1] = Pe.cur[1]);
        z = !0, ss(de), Rn(de);
      }
      function Rn(de) {
        const Pe = he[0], _i = Pe.point0;
        var fn;
        switch (K = Pe[0] - _i[0], te = Pe[1] - _i[1], A) {
          case ls:
          case rf:
            $ && (K = qe(Z - v, Be(ae - E, K)), M = v + K, S = E + K), I && (te = qe(V - _, Be(se - O, te)), y = _ + te, j = O + te);
            break;
          case Jn:
            he[1] ? ($ && (M = qe(Z, Be(ae, he[0][0])), S = qe(Z, Be(ae, he[1][0])), $ = 1), I && (y = qe(V, Be(se, he[0][1])), j = qe(V, Be(se, he[1][1])), I = 1)) : ($ < 0 ? (K = qe(Z - v, Be(ae - v, K)), M = v + K, S = E) : $ > 0 && (K = qe(Z - E, Be(ae - E, K)), M = v, S = E + K), I < 0 ? (te = qe(V - _, Be(se - _, te)), y = _ + te, j = O) : I > 0 && (te = qe(V - O, Be(se - O, te)), y = _, j = O + te));
            break;
          case Kn:
            $ && (M = qe(Z, Be(ae, v - K * $)), S = qe(Z, Be(ae, E + K * $))), I && (y = qe(V, Be(se, _ - te * I)), j = qe(V, Be(se, O + te * I)));
        }
        S < M && ($ *= -1, fn = v, v = E, E = fn, fn = M, M = S, S = fn, T in sf && St.attr("cursor", Ft[T = sf[T]])), j < y && (I *= -1, fn = _, _ = O, O = fn, fn = y, y = j, j = fn, T in lf && St.attr("cursor", Ft[T = lf[T]])), D.selection && (H = D.selection), C && (M = H[0][0], S = H[1][0]), N && (y = H[0][1], j = H[1][1]), H[0][0] === M && H[0][1] === y && H[1][0] === S && H[1][1] === j || (D.selection = [[M, y], [S, j]], u.call(P), rt.brush(de, A.name));
      }
      function Gp(de) {
        if (km(de), de.touches) {
          if (de.touches.length)
            return;
          t && clearTimeout(t), t = setTimeout(function() {
            t = null;
          }, 500);
        } else
          zi(de.view, z), _r.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
        cn.attr("pointer-events", "all"), St.attr("cursor", Ft.overlay), D.selection && (H = D.selection), $m(H) && (D.selection = null, u.call(P)), rt.end(de, A.name);
      }
      function nx(de) {
        switch (de.keyCode) {
          case 16:
            ye = $ && I;
            break;
          case 18:
            A === Jn && ($ && (E = S - K * $, v = M + K * $), I && (O = j - te * I, _ = y + te * I), A = Kn, Rn(de));
            break;
          case 32:
            A !== Jn && A !== Kn || ($ < 0 ? E = S - K : $ > 0 && (v = M - K), I < 0 ? O = j - te : I > 0 && (_ = y - te), A = ls, St.attr("cursor", Ft.selection), Rn(de));
            break;
          default:
            return;
        }
        ss(de);
      }
      function rx(de) {
        switch (de.keyCode) {
          case 16:
            ye && (C = N = ye = !1, Rn(de));
            break;
          case 18:
            A === Kn && ($ < 0 ? E = S : $ > 0 && (v = M), I < 0 ? O = j : I > 0 && (_ = y), A = Jn, Rn(de));
            break;
          case 32:
            A === ls && (de.altKey ? ($ && (E = S - K * $, v = M + K * $), I && (O = j - te * I, _ = y + te * I), A = Kn) : ($ < 0 ? E = S : $ > 0 && (v = M), I < 0 ? O = j : I > 0 && (_ = y), A = Jn), St.attr("cursor", Ft[T]), Rn(de));
            break;
          default:
            return;
        }
        ss(de);
      }
    }
    function p(g) {
      c(this, arguments).moved(g);
    }
    function b(g) {
      c(this, arguments).ended(g);
    }
    function m() {
      var g = this.__brush || { selection: null };
      return g.extent = us(n.apply(this, arguments)), g.dim = e, g;
    }
    return l.move = function(g, v, M) {
      g.tween ? g.on("start.brush", function(_) {
        c(this, arguments).beforestart().start(_);
      }).on("interrupt.brush end.brush", function(_) {
        c(this, arguments).end(_);
      }).tween("brush", function() {
        var _ = this, y = _.__brush, E = c(_, arguments), S = y.selection, O = e.input(typeof v == "function" ? v.apply(this, arguments) : v, y.extent), j = Gt(S, O);
        function z(C) {
          y.selection = C === 1 && O === null ? null : j(C), u.call(_), E.brush();
        }
        return S !== null && O !== null ? z : z(1);
      }) : g.each(function() {
        var _ = this, y = arguments, E = _.__brush, S = e.input(typeof v == "function" ? v.apply(_, y) : v, E.extent), O = c(_, y).beforestart();
        wn(_), E.selection = S === null ? null : S, u.call(_), O.start(M).brush(M).end(M);
      });
    }, l.clear = function(g, v) {
      l.move(g, null, v);
    }, d.prototype = { beforestart: function() {
      return ++this.active == 1 && (this.state.emitter = this, this.starting = !0), this;
    }, start: function(g, v) {
      return this.starting ? (this.starting = !1, this.emit("start", g, v)) : this.emit("brush", g), this;
    }, brush: function(g, v) {
      return this.emit("brush", g, v), this;
    }, end: function(g, v) {
      return --this.active == 0 && (delete this.state.emitter, this.emit("end", g, v)), this;
    }, emit: function(g, v, M) {
      var _ = De(this.that).datum();
      a.call(g, this.that, new Tm(g, { sourceEvent: v, target: l, selection: e.output(this.state.selection), mode: M, dispatch: a }), _);
    } }, l.extent = function(g) {
      return arguments.length ? (n = typeof g == "function" ? g : as(us(g)), l) : n;
    }, l.filter = function(g) {
      return arguments.length ? (r = typeof g == "function" ? g : as(!!g), l) : r;
    }, l.touchable = function(g) {
      return arguments.length ? (i = typeof g == "function" ? g : as(!!g), l) : i;
    }, l.handleSize = function(g) {
      return arguments.length ? (s = +g, l) : s;
    }, l.keyModifiers = function(g) {
      return arguments.length ? (o = !!g, l) : o;
    }, l.on = function() {
      var g = a.on.apply(a, arguments);
      return g === a ? l : g;
    }, l;
  }
  var uf = Math.abs, Qn = Math.cos, er = Math.sin, cf = Math.PI, Qi = cf / 2, ff = 2 * cf, hf = Math.max, hs = 1e-12;
  function ds(e, t) {
    return Array.from({ length: t - e }, (n, r) => e + r);
  }
  function Om(e) {
    return function(t, n) {
      return e(t.source.value + t.target.value, n.source.value + n.target.value);
    };
  }
  function ps(e, t) {
    var n = 0, r = null, i = null, o = null;
    function a(s) {
      var l, u = s.length, c = new Array(u), d = ds(0, u), h = new Array(u * u), p = new Array(u), b = 0;
      s = Float64Array.from({ length: u * u }, t ? (m, g) => s[g % u][g / u | 0] : (m, g) => s[g / u | 0][g % u]);
      for (let m = 0; m < u; ++m) {
        let g = 0;
        for (let v = 0; v < u; ++v)
          g += s[m * u + v] + e * s[v * u + m];
        b += c[m] = g;
      }
      l = (b = hf(0, ff - n * u) / b) ? n : ff / u;
      {
        let m = 0;
        r && d.sort((g, v) => r(c[g], c[v]));
        for (const g of d) {
          const v = m;
          if (e) {
            const M = ds(1 + ~u, u).filter((_) => _ < 0 ? s[~_ * u + g] : s[g * u + _]);
            i && M.sort((_, y) => i(_ < 0 ? -s[~_ * u + g] : s[g * u + _], y < 0 ? -s[~y * u + g] : s[g * u + y]));
            for (const _ of M)
              _ < 0 ? (h[~_ * u + g] || (h[~_ * u + g] = { source: null, target: null })).target = { index: g, startAngle: m, endAngle: m += s[~_ * u + g] * b, value: s[~_ * u + g] } : (h[g * u + _] || (h[g * u + _] = { source: null, target: null })).source = { index: g, startAngle: m, endAngle: m += s[g * u + _] * b, value: s[g * u + _] };
            p[g] = { index: g, startAngle: v, endAngle: m, value: c[g] };
          } else {
            const M = ds(0, u).filter((_) => s[g * u + _] || s[_ * u + g]);
            i && M.sort((_, y) => i(s[g * u + _], s[g * u + y]));
            for (const _ of M) {
              let y;
              if (g < _ ? (y = h[g * u + _] || (h[g * u + _] = { source: null, target: null }), y.source = { index: g, startAngle: m, endAngle: m += s[g * u + _] * b, value: s[g * u + _] }) : (y = h[_ * u + g] || (h[_ * u + g] = { source: null, target: null }), y.target = { index: g, startAngle: m, endAngle: m += s[g * u + _] * b, value: s[g * u + _] }, g === _ && (y.source = y.target)), y.source && y.target && y.source.value < y.target.value) {
                const E = y.source;
                y.source = y.target, y.target = E;
              }
            }
            p[g] = { index: g, startAngle: v, endAngle: m, value: c[g] };
          }
          m += l;
        }
      }
      return (h = Object.values(h)).groups = p, o ? h.sort(o) : h;
    }
    return a.padAngle = function(s) {
      return arguments.length ? (n = hf(0, s), a) : n;
    }, a.sortGroups = function(s) {
      return arguments.length ? (r = s, a) : r;
    }, a.sortSubgroups = function(s) {
      return arguments.length ? (i = s, a) : i;
    }, a.sortChords = function(s) {
      return arguments.length ? (s == null ? o = null : (o = Om(s))._ = s, a) : o && o._;
    }, a;
  }
  const gs = Math.PI, ms = 2 * gs, Mn = 1e-6, Im = ms - Mn;
  function vs() {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
  }
  function Zt() {
    return new vs();
  }
  vs.prototype = Zt.prototype = { constructor: vs, moveTo: function(e, t) {
    this._ += "M" + (this._x0 = this._x1 = +e) + "," + (this._y0 = this._y1 = +t);
  }, closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  }, lineTo: function(e, t) {
    this._ += "L" + (this._x1 = +e) + "," + (this._y1 = +t);
  }, quadraticCurveTo: function(e, t, n, r) {
    this._ += "Q" + +e + "," + +t + "," + (this._x1 = +n) + "," + (this._y1 = +r);
  }, bezierCurveTo: function(e, t, n, r, i, o) {
    this._ += "C" + +e + "," + +t + "," + +n + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o);
  }, arcTo: function(e, t, n, r, i) {
    e = +e, t = +t, n = +n, r = +r, i = +i;
    var o = this._x1, a = this._y1, s = n - e, l = r - t, u = o - e, c = a - t, d = u * u + c * c;
    if (i < 0)
      throw new Error("negative radius: " + i);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = e) + "," + (this._y1 = t);
    else if (d > Mn)
      if (Math.abs(c * s - l * u) > Mn && i) {
        var h = n - o, p = r - a, b = s * s + l * l, m = h * h + p * p, g = Math.sqrt(b), v = Math.sqrt(d), M = i * Math.tan((gs - Math.acos((b + d - m) / (2 * g * v))) / 2), _ = M / v, y = M / g;
        Math.abs(_ - 1) > Mn && (this._ += "L" + (e + _ * u) + "," + (t + _ * c)), this._ += "A" + i + "," + i + ",0,0," + +(c * h > u * p) + "," + (this._x1 = e + y * s) + "," + (this._y1 = t + y * l);
      } else
        this._ += "L" + (this._x1 = e) + "," + (this._y1 = t);
  }, arc: function(e, t, n, r, i, o) {
    e = +e, t = +t, o = !!o;
    var a = (n = +n) * Math.cos(r), s = n * Math.sin(r), l = e + a, u = t + s, c = 1 ^ o, d = o ? r - i : i - r;
    if (n < 0)
      throw new Error("negative radius: " + n);
    this._x1 === null ? this._ += "M" + l + "," + u : (Math.abs(this._x1 - l) > Mn || Math.abs(this._y1 - u) > Mn) && (this._ += "L" + l + "," + u), n && (d < 0 && (d = d % ms + ms), d > Im ? this._ += "A" + n + "," + n + ",0,1," + c + "," + (e - a) + "," + (t - s) + "A" + n + "," + n + ",0,1," + c + "," + (this._x1 = l) + "," + (this._y1 = u) : d > Mn && (this._ += "A" + n + "," + n + ",0," + +(d >= gs) + "," + c + "," + (this._x1 = e + n * Math.cos(i)) + "," + (this._y1 = t + n * Math.sin(i))));
  }, rect: function(e, t, n, r) {
    this._ += "M" + (this._x0 = this._x1 = +e) + "," + (this._y0 = this._y1 = +t) + "h" + +n + "v" + +r + "h" + -n + "Z";
  }, toString: function() {
    return this._;
  } };
  var Rm = Array.prototype.slice;
  function En(e) {
    return function() {
      return e;
    };
  }
  function Fm(e) {
    return e.source;
  }
  function jm(e) {
    return e.target;
  }
  function df(e) {
    return e.radius;
  }
  function Dm(e) {
    return e.startAngle;
  }
  function qm(e) {
    return e.endAngle;
  }
  function Bm() {
    return 0;
  }
  function Um() {
    return 10;
  }
  function pf(e) {
    var t = Fm, n = jm, r = df, i = df, o = Dm, a = qm, s = Bm, l = null;
    function u() {
      var c, d = t.apply(this, arguments), h = n.apply(this, arguments), p = s.apply(this, arguments) / 2, b = Rm.call(arguments), m = +r.apply(this, (b[0] = d, b)), g = o.apply(this, b) - Qi, v = a.apply(this, b) - Qi, M = +i.apply(this, (b[0] = h, b)), _ = o.apply(this, b) - Qi, y = a.apply(this, b) - Qi;
      if (l || (l = c = Zt()), p > hs && (uf(v - g) > 2 * p + hs ? v > g ? (g += p, v -= p) : (g -= p, v += p) : g = v = (g + v) / 2, uf(y - _) > 2 * p + hs ? y > _ ? (_ += p, y -= p) : (_ -= p, y += p) : _ = y = (_ + y) / 2), l.moveTo(m * Qn(g), m * er(g)), l.arc(0, 0, m, g, v), g !== _ || v !== y)
        if (e) {
          var E = +e.apply(this, arguments), S = M - E, O = (_ + y) / 2;
          l.quadraticCurveTo(0, 0, S * Qn(_), S * er(_)), l.lineTo(M * Qn(O), M * er(O)), l.lineTo(S * Qn(y), S * er(y));
        } else
          l.quadraticCurveTo(0, 0, M * Qn(_), M * er(_)), l.arc(0, 0, M, _, y);
      if (l.quadraticCurveTo(0, 0, m * Qn(g), m * er(g)), l.closePath(), c)
        return l = null, c + "" || null;
    }
    return e && (u.headRadius = function(c) {
      return arguments.length ? (e = typeof c == "function" ? c : En(+c), u) : e;
    }), u.radius = function(c) {
      return arguments.length ? (r = i = typeof c == "function" ? c : En(+c), u) : r;
    }, u.sourceRadius = function(c) {
      return arguments.length ? (r = typeof c == "function" ? c : En(+c), u) : r;
    }, u.targetRadius = function(c) {
      return arguments.length ? (i = typeof c == "function" ? c : En(+c), u) : i;
    }, u.startAngle = function(c) {
      return arguments.length ? (o = typeof c == "function" ? c : En(+c), u) : o;
    }, u.endAngle = function(c) {
      return arguments.length ? (a = typeof c == "function" ? c : En(+c), u) : a;
    }, u.padAngle = function(c) {
      return arguments.length ? (s = typeof c == "function" ? c : En(+c), u) : s;
    }, u.source = function(c) {
      return arguments.length ? (t = c, u) : t;
    }, u.target = function(c) {
      return arguments.length ? (n = c, u) : n;
    }, u.context = function(c) {
      return arguments.length ? (l = c ?? null, u) : l;
    }, u;
  }
  var gf = Array.prototype.slice;
  function Ym(e, t) {
    return e - t;
  }
  var Wt = (e) => () => e;
  function Hm(e, t) {
    for (var n, r = -1, i = t.length; ++r < i; )
      if (n = Vm(e, t[r]))
        return n;
    return 0;
  }
  function Vm(e, t) {
    for (var n = t[0], r = t[1], i = -1, o = 0, a = e.length, s = a - 1; o < a; s = o++) {
      var l = e[o], u = l[0], c = l[1], d = e[s], h = d[0], p = d[1];
      if (Gm(l, d, t))
        return 0;
      c > r != p > r && n < (h - u) * (r - c) / (p - c) + u && (i = -i);
    }
    return i;
  }
  function Gm(e, t, n) {
    var r, i, o, a;
    return function(s, l, u) {
      return (l[0] - s[0]) * (u[1] - s[1]) == (u[0] - s[0]) * (l[1] - s[1]);
    }(e, t, n) && (i = e[r = +(e[0] === t[0])], o = n[r], a = t[r], i <= o && o <= a || a <= o && o <= i);
  }
  function Xm() {
  }
  var jt = [[], [[[1, 1.5], [0.5, 1]]], [[[1.5, 1], [1, 1.5]]], [[[1.5, 1], [0.5, 1]]], [[[1, 0.5], [1.5, 1]]], [[[1, 1.5], [0.5, 1]], [[1, 0.5], [1.5, 1]]], [[[1, 0.5], [1, 1.5]]], [[[1, 0.5], [0.5, 1]]], [[[0.5, 1], [1, 0.5]]], [[[1, 1.5], [1, 0.5]]], [[[0.5, 1], [1, 0.5]], [[1.5, 1], [1, 1.5]]], [[[1.5, 1], [1, 0.5]]], [[[0.5, 1], [1.5, 1]]], [[[1, 1.5], [1.5, 1]]], [[[0.5, 1], [1, 1.5]]], []];
  function mf() {
    var e = 1, t = 1, n = ka, r = s;
    function i(l) {
      var u = n(l);
      if (Array.isArray(u))
        u = u.slice().sort(Ym);
      else {
        const c = Ce(l), d = Un(c[0], c[1], u);
        u = qn(Math.floor(c[0] / d) * d, Math.floor(c[1] / d - 1) * d, u);
      }
      return u.map((c) => o(l, c));
    }
    function o(l, u) {
      var c = [], d = [];
      return function(h, p, b) {
        var m, g, v, M, _, y, E = new Array(), S = new Array();
        for (m = g = -1, M = h[0] >= p, jt[M << 1].forEach(O); ++m < e - 1; )
          v = M, M = h[m + 1] >= p, jt[v | M << 1].forEach(O);
        for (jt[M << 0].forEach(O); ++g < t - 1; ) {
          for (m = -1, M = h[g * e + e] >= p, _ = h[g * e] >= p, jt[M << 1 | _ << 2].forEach(O); ++m < e - 1; )
            v = M, M = h[g * e + e + m + 1] >= p, y = _, _ = h[g * e + m + 1] >= p, jt[v | M << 1 | _ << 2 | y << 3].forEach(O);
          jt[M | _ << 3].forEach(O);
        }
        for (m = -1, _ = h[g * e] >= p, jt[_ << 2].forEach(O); ++m < e - 1; )
          y = _, _ = h[g * e + m + 1] >= p, jt[_ << 2 | y << 3].forEach(O);
        function O(j) {
          var z, C, N = [j[0][0] + m, j[0][1] + g], P = [j[1][0] + m, j[1][1] + g], T = a(N), A = a(P);
          (z = S[T]) ? (C = E[A]) ? (delete S[z.end], delete E[C.start], z === C ? (z.ring.push(P), b(z.ring)) : E[z.start] = S[C.end] = { start: z.start, end: C.end, ring: z.ring.concat(C.ring) }) : (delete S[z.end], z.ring.push(P), S[z.end = A] = z) : (z = E[A]) ? (C = S[T]) ? (delete E[z.start], delete S[C.end], z === C ? (z.ring.push(P), b(z.ring)) : E[C.start] = S[z.end] = { start: C.start, end: z.end, ring: C.ring.concat(z.ring) }) : (delete E[z.start], z.ring.unshift(N), E[z.start = T] = z) : E[T] = S[A] = { start: T, end: A, ring: [N, P] };
        }
        jt[_ << 3].forEach(O);
      }(l, u, function(h) {
        r(h, l, u), function(p) {
          for (var b = 0, m = p.length, g = p[m - 1][1] * p[0][0] - p[m - 1][0] * p[0][1]; ++b < m; )
            g += p[b - 1][1] * p[b][0] - p[b - 1][0] * p[b][1];
          return g;
        }(h) > 0 ? c.push([h]) : d.push(h);
      }), d.forEach(function(h) {
        for (var p, b = 0, m = c.length; b < m; ++b)
          if (Hm((p = c[b])[0], h) !== -1)
            return void p.push(h);
      }), { type: "MultiPolygon", value: u, coordinates: c };
    }
    function a(l) {
      return 2 * l[0] + l[1] * (e + 1) * 4;
    }
    function s(l, u, c) {
      l.forEach(function(d) {
        var h, p = d[0], b = d[1], m = 0 | p, g = 0 | b, v = u[g * e + m];
        p > 0 && p < e && m === p && (h = u[g * e + m - 1], d[0] = p + (c - h) / (v - h) - 0.5), b > 0 && b < t && g === b && (h = u[(g - 1) * e + m], d[1] = b + (c - h) / (v - h) - 0.5);
      });
    }
    return i.contour = o, i.size = function(l) {
      if (!arguments.length)
        return [e, t];
      var u = Math.floor(l[0]), c = Math.floor(l[1]);
      if (!(u >= 0 && c >= 0))
        throw new Error("invalid size");
      return e = u, t = c, i;
    }, i.thresholds = function(l) {
      return arguments.length ? (n = typeof l == "function" ? l : Array.isArray(l) ? Wt(gf.call(l)) : Wt(l), i) : n;
    }, i.smooth = function(l) {
      return arguments.length ? (r = l ? s : Xm, i) : r === s;
    }, i;
  }
  function bs(e, t, n) {
    for (var r = e.width, i = e.height, o = 1 + (n << 1), a = 0; a < i; ++a)
      for (var s = 0, l = 0; s < r + n; ++s)
        s < r && (l += e.data[s + a * r]), s >= n && (s >= o && (l -= e.data[s - o + a * r]), t.data[s - n + a * r] = l / Math.min(s + 1, r - 1 + o - s, o));
  }
  function ys(e, t, n) {
    for (var r = e.width, i = e.height, o = 1 + (n << 1), a = 0; a < r; ++a)
      for (var s = 0, l = 0; s < i + n; ++s)
        s < i && (l += e.data[a + s * r]), s >= n && (s >= o && (l -= e.data[a + (s - o) * r]), t.data[a + (s - n) * r] = l / Math.min(s + 1, i - 1 + o - s, o));
  }
  function Zm(e) {
    return e[0];
  }
  function Wm(e) {
    return e[1];
  }
  function Jm() {
    return 1;
  }
  const Ue = 134217729;
  function _s(e, t, n, r, i) {
    let o, a, s, l, u = t[0], c = r[0], d = 0, h = 0;
    c > u == c > -u ? (o = u, u = t[++d]) : (o = c, c = r[++h]);
    let p = 0;
    if (d < e && h < n)
      for (c > u == c > -u ? (a = u + o, s = o - (a - u), u = t[++d]) : (a = c + o, s = o - (a - c), c = r[++h]), o = a, s !== 0 && (i[p++] = s); d < e && h < n; )
        c > u == c > -u ? (a = o + u, l = a - o, s = o - (a - l) + (u - l), u = t[++d]) : (a = o + c, l = a - o, s = o - (a - l) + (c - l), c = r[++h]), o = a, s !== 0 && (i[p++] = s);
    for (; d < e; )
      a = o + u, l = a - o, s = o - (a - l) + (u - l), u = t[++d], o = a, s !== 0 && (i[p++] = s);
    for (; h < n; )
      a = o + c, l = a - o, s = o - (a - l) + (c - l), c = r[++h], o = a, s !== 0 && (i[p++] = s);
    return o === 0 && p !== 0 || (i[p++] = o), p;
  }
  function jr(e) {
    return new Float64Array(e);
  }
  const tr = jr(4), vf = jr(8), bf = jr(12), yf = jr(16), Ge = jr(4);
  function eo(e, t, n, r, i, o) {
    const a = (t - o) * (n - i), s = (e - i) * (r - o), l = a - s;
    if (a === 0 || s === 0 || a > 0 != s > 0)
      return l;
    const u = Math.abs(a + s);
    return Math.abs(l) >= 33306690738754716e-32 * u ? l : -function(c, d, h, p, b, m, g) {
      let v, M, _, y, E, S, O, j, z, C, N, P, T, A, $, I, D, B;
      const H = c - b, Z = h - b, V = d - m, ae = p - m;
      A = H * ae, S = Ue * H, O = S - (S - H), j = H - O, S = Ue * ae, z = S - (S - ae), C = ae - z, $ = j * C - (A - O * z - j * z - O * C), I = V * Z, S = Ue * V, O = S - (S - V), j = V - O, S = Ue * Z, z = S - (S - Z), C = Z - z, D = j * C - (I - O * z - j * z - O * C), N = $ - D, E = $ - N, tr[0] = $ - (N + E) + (E - D), P = A + N, E = P - A, T = A - (P - E) + (N - E), N = T - I, E = T - N, tr[1] = T - (N + E) + (E - I), B = P + N, E = B - P, tr[2] = P - (B - E) + (N - E), tr[3] = B;
      let se = function(rt, cn) {
        let St = cn[0];
        for (let _r = 1; _r < rt; _r++)
          St += cn[_r];
        return St;
      }(4, tr), K = 22204460492503146e-32 * g;
      if (se >= K || -se >= K || (E = c - H, v = c - (H + E) + (E - b), E = h - Z, _ = h - (Z + E) + (E - b), E = d - V, M = d - (V + E) + (E - m), E = p - ae, y = p - (ae + E) + (E - m), v === 0 && M === 0 && _ === 0 && y === 0) || (K = 11093356479670487e-47 * g + 33306690738754706e-32 * Math.abs(se), se += H * y + ae * v - (V * _ + Z * M), se >= K || -se >= K))
        return se;
      A = v * ae, S = Ue * v, O = S - (S - v), j = v - O, S = Ue * ae, z = S - (S - ae), C = ae - z, $ = j * C - (A - O * z - j * z - O * C), I = M * Z, S = Ue * M, O = S - (S - M), j = M - O, S = Ue * Z, z = S - (S - Z), C = Z - z, D = j * C - (I - O * z - j * z - O * C), N = $ - D, E = $ - N, Ge[0] = $ - (N + E) + (E - D), P = A + N, E = P - A, T = A - (P - E) + (N - E), N = T - I, E = T - N, Ge[1] = T - (N + E) + (E - I), B = P + N, E = B - P, Ge[2] = P - (B - E) + (N - E), Ge[3] = B;
      const te = _s(4, tr, 4, Ge, vf);
      A = H * y, S = Ue * H, O = S - (S - H), j = H - O, S = Ue * y, z = S - (S - y), C = y - z, $ = j * C - (A - O * z - j * z - O * C), I = V * _, S = Ue * V, O = S - (S - V), j = V - O, S = Ue * _, z = S - (S - _), C = _ - z, D = j * C - (I - O * z - j * z - O * C), N = $ - D, E = $ - N, Ge[0] = $ - (N + E) + (E - D), P = A + N, E = P - A, T = A - (P - E) + (N - E), N = T - I, E = T - N, Ge[1] = T - (N + E) + (E - I), B = P + N, E = B - P, Ge[2] = P - (B - E) + (N - E), Ge[3] = B;
      const ye = _s(te, vf, 4, Ge, bf);
      A = v * y, S = Ue * v, O = S - (S - v), j = v - O, S = Ue * y, z = S - (S - y), C = y - z, $ = j * C - (A - O * z - j * z - O * C), I = M * _, S = Ue * M, O = S - (S - M), j = M - O, S = Ue * _, z = S - (S - _), C = _ - z, D = j * C - (I - O * z - j * z - O * C), N = $ - D, E = $ - N, Ge[0] = $ - (N + E) + (E - D), P = A + N, E = P - A, T = A - (P - E) + (N - E), N = T - I, E = T - N, Ge[1] = T - (N + E) + (E - I), B = P + N, E = B - P, Ge[2] = P - (B - E) + (N - E), Ge[3] = B;
      const he = _s(ye, bf, 4, Ge, yf);
      return yf[he - 1];
    }(e, t, n, r, i, o, u);
  }
  const _f = Math.pow(2, -52), to = new Uint32Array(512);
  class no {
    static from(t, n = ev, r = tv) {
      const i = t.length, o = new Float64Array(2 * i);
      for (let a = 0; a < i; a++) {
        const s = t[a];
        o[2 * a] = n(s), o[2 * a + 1] = r(s);
      }
      return new no(o);
    }
    constructor(t) {
      const n = t.length >> 1;
      if (n > 0 && typeof t[0] != "number")
        throw new Error("Expected coords to contain numbers.");
      this.coords = t;
      const r = Math.max(2 * n - 5, 0);
      this._triangles = new Uint32Array(3 * r), this._halfedges = new Int32Array(3 * r), this._hashSize = Math.ceil(Math.sqrt(n)), this._hullPrev = new Uint32Array(n), this._hullNext = new Uint32Array(n), this._hullTri = new Uint32Array(n), this._hullHash = new Int32Array(this._hashSize).fill(-1), this._ids = new Uint32Array(n), this._dists = new Float64Array(n), this.update();
    }
    update() {
      const { coords: t, _hullPrev: n, _hullNext: r, _hullTri: i, _hullHash: o } = this, a = t.length >> 1;
      let s = 1 / 0, l = 1 / 0, u = -1 / 0, c = -1 / 0;
      for (let C = 0; C < a; C++) {
        const N = t[2 * C], P = t[2 * C + 1];
        N < s && (s = N), P < l && (l = P), N > u && (u = N), P > c && (c = P), this._ids[C] = C;
      }
      const d = (s + u) / 2, h = (l + c) / 2;
      let p, b, m, g = 1 / 0;
      for (let C = 0; C < a; C++) {
        const N = xs(d, h, t[2 * C], t[2 * C + 1]);
        N < g && (p = C, g = N);
      }
      const v = t[2 * p], M = t[2 * p + 1];
      g = 1 / 0;
      for (let C = 0; C < a; C++) {
        if (C === p)
          continue;
        const N = xs(v, M, t[2 * C], t[2 * C + 1]);
        N < g && N > 0 && (b = C, g = N);
      }
      let _ = t[2 * b], y = t[2 * b + 1], E = 1 / 0;
      for (let C = 0; C < a; C++) {
        if (C === p || C === b)
          continue;
        const N = Qm(v, M, _, y, t[2 * C], t[2 * C + 1]);
        N < E && (m = C, E = N);
      }
      let S = t[2 * m], O = t[2 * m + 1];
      if (E === 1 / 0) {
        for (let P = 0; P < a; P++)
          this._dists[P] = t[2 * P] - t[0] || t[2 * P + 1] - t[1];
        nr(this._ids, this._dists, 0, a - 1);
        const C = new Uint32Array(a);
        let N = 0;
        for (let P = 0, T = -1 / 0; P < a; P++) {
          const A = this._ids[P];
          this._dists[A] > T && (C[N++] = A, T = this._dists[A]);
        }
        return this.hull = C.subarray(0, N), this.triangles = new Uint32Array(0), void (this.halfedges = new Uint32Array(0));
      }
      if (eo(v, M, _, y, S, O) < 0) {
        const C = b, N = _, P = y;
        b = m, _ = S, y = O, m = C, S = N, O = P;
      }
      const j = function(C, N, P, T, A, $) {
        const I = P - C, D = T - N, B = A - C, H = $ - N, Z = I * I + D * D, V = B * B + H * H, ae = 0.5 / (I * H - D * B);
        return { x: C + (H * Z - D * V) * ae, y: N + (I * V - B * Z) * ae };
      }(v, M, _, y, S, O);
      this._cx = j.x, this._cy = j.y;
      for (let C = 0; C < a; C++)
        this._dists[C] = xs(t[2 * C], t[2 * C + 1], j.x, j.y);
      nr(this._ids, this._dists, 0, a - 1), this._hullStart = p;
      let z = 3;
      r[p] = n[m] = b, r[b] = n[p] = m, r[m] = n[b] = p, i[p] = 0, i[b] = 1, i[m] = 2, o.fill(-1), o[this._hashKey(v, M)] = p, o[this._hashKey(_, y)] = b, o[this._hashKey(S, O)] = m, this.trianglesLen = 0, this._addTriangle(p, b, m, -1, -1, -1);
      for (let C, N, P = 0; P < this._ids.length; P++) {
        const T = this._ids[P], A = t[2 * T], $ = t[2 * T + 1];
        if (P > 0 && Math.abs(A - C) <= _f && Math.abs($ - N) <= _f || (C = A, N = $, T === p || T === b || T === m))
          continue;
        let I = 0;
        for (let V = 0, ae = this._hashKey(A, $); V < this._hashSize && (I = o[(ae + V) % this._hashSize], I === -1 || I === r[I]); V++)
          ;
        I = n[I];
        let D, B = I;
        for (; D = r[B], eo(A, $, t[2 * B], t[2 * B + 1], t[2 * D], t[2 * D + 1]) >= 0; )
          if (B = D, B === I) {
            B = -1;
            break;
          }
        if (B === -1)
          continue;
        let H = this._addTriangle(B, T, r[B], -1, -1, i[B]);
        i[T] = this._legalize(H + 2), i[B] = H, z++;
        let Z = r[B];
        for (; D = r[Z], eo(A, $, t[2 * Z], t[2 * Z + 1], t[2 * D], t[2 * D + 1]) < 0; )
          H = this._addTriangle(Z, T, D, i[T], -1, i[Z]), i[T] = this._legalize(H + 2), r[Z] = Z, z--, Z = D;
        if (B === I)
          for (; D = n[B], eo(A, $, t[2 * D], t[2 * D + 1], t[2 * B], t[2 * B + 1]) < 0; )
            H = this._addTriangle(D, T, B, -1, i[B], i[D]), this._legalize(H + 2), i[D] = H, r[B] = B, z--, B = D;
        this._hullStart = n[T] = B, r[B] = n[Z] = T, r[T] = Z, o[this._hashKey(A, $)] = T, o[this._hashKey(t[2 * B], t[2 * B + 1])] = B;
      }
      this.hull = new Uint32Array(z);
      for (let C = 0, N = this._hullStart; C < z; C++)
        this.hull[C] = N, N = r[N];
      this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
    }
    _hashKey(t, n) {
      return Math.floor(function(r, i) {
        const o = r / (Math.abs(r) + Math.abs(i));
        return (i > 0 ? 3 - o : 1 + o) / 4;
      }(t - this._cx, n - this._cy) * this._hashSize) % this._hashSize;
    }
    _legalize(t) {
      const { _triangles: n, _halfedges: r, coords: i } = this;
      let o = 0, a = 0;
      for (; ; ) {
        const s = r[t], l = t - t % 3;
        if (a = l + (t + 2) % 3, s === -1) {
          if (o === 0)
            break;
          t = to[--o];
          continue;
        }
        const u = s - s % 3, c = l + (t + 1) % 3, d = u + (s + 2) % 3, h = n[a], p = n[t], b = n[c], m = n[d];
        if (Km(i[2 * h], i[2 * h + 1], i[2 * p], i[2 * p + 1], i[2 * b], i[2 * b + 1], i[2 * m], i[2 * m + 1])) {
          n[t] = m, n[s] = h;
          const g = r[d];
          if (g === -1) {
            let M = this._hullStart;
            do {
              if (this._hullTri[M] === d) {
                this._hullTri[M] = t;
                break;
              }
              M = this._hullPrev[M];
            } while (M !== this._hullStart);
          }
          this._link(t, g), this._link(s, r[a]), this._link(a, d);
          const v = u + (s + 1) % 3;
          o < to.length && (to[o++] = v);
        } else {
          if (o === 0)
            break;
          t = to[--o];
        }
      }
      return a;
    }
    _link(t, n) {
      this._halfedges[t] = n, n !== -1 && (this._halfedges[n] = t);
    }
    _addTriangle(t, n, r, i, o, a) {
      const s = this.trianglesLen;
      return this._triangles[s] = t, this._triangles[s + 1] = n, this._triangles[s + 2] = r, this._link(s, i), this._link(s + 1, o), this._link(s + 2, a), this.trianglesLen += 3, s;
    }
  }
  function xs(e, t, n, r) {
    const i = e - n, o = t - r;
    return i * i + o * o;
  }
  function Km(e, t, n, r, i, o, a, s) {
    const l = e - a, u = t - s, c = n - a, d = r - s, h = i - a, p = o - s, b = c * c + d * d, m = h * h + p * p;
    return l * (d * m - b * p) - u * (c * m - b * h) + (l * l + u * u) * (c * p - d * h) < 0;
  }
  function Qm(e, t, n, r, i, o) {
    const a = n - e, s = r - t, l = i - e, u = o - t, c = a * a + s * s, d = l * l + u * u, h = 0.5 / (a * u - s * l), p = (u * c - s * d) * h, b = (a * d - l * c) * h;
    return p * p + b * b;
  }
  function nr(e, t, n, r) {
    if (r - n <= 20)
      for (let i = n + 1; i <= r; i++) {
        const o = e[i], a = t[o];
        let s = i - 1;
        for (; s >= n && t[e[s]] > a; )
          e[s + 1] = e[s--];
        e[s + 1] = o;
      }
    else {
      let i = n + 1, o = r;
      Dr(e, n + r >> 1, i), t[e[n]] > t[e[r]] && Dr(e, n, r), t[e[i]] > t[e[r]] && Dr(e, i, r), t[e[n]] > t[e[i]] && Dr(e, n, i);
      const a = e[i], s = t[a];
      for (; ; ) {
        do
          i++;
        while (t[e[i]] < s);
        do
          o--;
        while (t[e[o]] > s);
        if (o < i)
          break;
        Dr(e, i, o);
      }
      e[n + 1] = e[o], e[o] = a, r - i + 1 >= o - n ? (nr(e, t, i, r), nr(e, t, n, o - 1)) : (nr(e, t, n, o - 1), nr(e, t, i, r));
    }
  }
  function Dr(e, t, n) {
    const r = e[t];
    e[t] = e[n], e[n] = r;
  }
  function ev(e) {
    return e[0];
  }
  function tv(e) {
    return e[1];
  }
  const xf = 1e-6;
  class Sn {
    constructor() {
      this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
    }
    moveTo(t, n) {
      this._ += `M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}`;
    }
    closePath() {
      this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
    }
    lineTo(t, n) {
      this._ += `L${this._x1 = +t},${this._y1 = +n}`;
    }
    arc(t, n, r) {
      const i = (t = +t) + (r = +r), o = n = +n;
      if (r < 0)
        throw new Error("negative radius");
      this._x1 === null ? this._ += `M${i},${o}` : (Math.abs(this._x1 - i) > xf || Math.abs(this._y1 - o) > xf) && (this._ += "L" + i + "," + o), r && (this._ += `A${r},${r},0,1,1,${t - r},${n}A${r},${r},0,1,1,${this._x1 = i},${this._y1 = o}`);
    }
    rect(t, n, r, i) {
      this._ += `M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${+r}v${+i}h${-r}Z`;
    }
    value() {
      return this._ || null;
    }
  }
  class ws {
    constructor() {
      this._ = [];
    }
    moveTo(t, n) {
      this._.push([t, n]);
    }
    closePath() {
      this._.push(this._[0].slice());
    }
    lineTo(t, n) {
      this._.push([t, n]);
    }
    value() {
      return this._.length ? this._ : null;
    }
  }
  class wf {
    constructor(t, [n, r, i, o] = [0, 0, 960, 500]) {
      if (!((i = +i) >= (n = +n) && (o = +o) >= (r = +r)))
        throw new Error("invalid bounds");
      this.delaunay = t, this._circumcenters = new Float64Array(2 * t.points.length), this.vectors = new Float64Array(2 * t.points.length), this.xmax = i, this.xmin = n, this.ymax = o, this.ymin = r, this._init();
    }
    update() {
      return this.delaunay.update(), this._init(), this;
    }
    _init() {
      const { delaunay: { points: t, hull: n, triangles: r }, vectors: i } = this, o = this.circumcenters = this._circumcenters.subarray(0, r.length / 3 * 2);
      for (let p, b, m = 0, g = 0, v = r.length; m < v; m += 3, g += 2) {
        const M = 2 * r[m], _ = 2 * r[m + 1], y = 2 * r[m + 2], E = t[M], S = t[M + 1], O = t[_], j = t[_ + 1], z = t[y], C = t[y + 1], N = O - E, P = j - S, T = z - E, A = C - S, $ = 2 * (N * A - P * T);
        if (Math.abs($) < 1e-9) {
          let I = 1e9;
          const D = 2 * r[0];
          I *= Math.sign((t[D] - E) * A - (t[D + 1] - S) * T), p = (E + z) / 2 - I * A, b = (S + C) / 2 + I * T;
        } else {
          const I = 1 / $, D = N * N + P * P, B = T * T + A * A;
          p = E + (A * D - P * B) * I, b = S + (N * B - T * D) * I;
        }
        o[g] = p, o[g + 1] = b;
      }
      let a, s, l, u = n[n.length - 1], c = 4 * u, d = t[2 * u], h = t[2 * u + 1];
      i.fill(0);
      for (let p = 0; p < n.length; ++p)
        u = n[p], a = c, s = d, l = h, c = 4 * u, d = t[2 * u], h = t[2 * u + 1], i[a + 2] = i[c] = l - h, i[a + 3] = i[c + 1] = d - s;
    }
    render(t) {
      const n = t == null ? t = new Sn() : void 0, { delaunay: { halfedges: r, inedges: i, hull: o }, circumcenters: a, vectors: s } = this;
      if (o.length <= 1)
        return null;
      for (let c = 0, d = r.length; c < d; ++c) {
        const h = r[c];
        if (h < c)
          continue;
        const p = 2 * Math.floor(c / 3), b = 2 * Math.floor(h / 3), m = a[p], g = a[p + 1], v = a[b], M = a[b + 1];
        this._renderSegment(m, g, v, M, t);
      }
      let l, u = o[o.length - 1];
      for (let c = 0; c < o.length; ++c) {
        l = u, u = o[c];
        const d = 2 * Math.floor(i[u] / 3), h = a[d], p = a[d + 1], b = 4 * l, m = this._project(h, p, s[b + 2], s[b + 3]);
        m && this._renderSegment(h, p, m[0], m[1], t);
      }
      return n && n.value();
    }
    renderBounds(t) {
      const n = t == null ? t = new Sn() : void 0;
      return t.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), n && n.value();
    }
    renderCell(t, n) {
      const r = n == null ? n = new Sn() : void 0, i = this._clip(t);
      if (i === null || !i.length)
        return;
      n.moveTo(i[0], i[1]);
      let o = i.length;
      for (; i[0] === i[o - 2] && i[1] === i[o - 1] && o > 1; )
        o -= 2;
      for (let a = 2; a < o; a += 2)
        i[a] === i[a - 2] && i[a + 1] === i[a - 1] || n.lineTo(i[a], i[a + 1]);
      return n.closePath(), r && r.value();
    }
    *cellPolygons() {
      const { delaunay: { points: t } } = this;
      for (let n = 0, r = t.length / 2; n < r; ++n) {
        const i = this.cellPolygon(n);
        i && (i.index = n, yield i);
      }
    }
    cellPolygon(t) {
      const n = new ws();
      return this.renderCell(t, n), n.value();
    }
    _renderSegment(t, n, r, i, o) {
      let a;
      const s = this._regioncode(t, n), l = this._regioncode(r, i);
      s === 0 && l === 0 ? (o.moveTo(t, n), o.lineTo(r, i)) : (a = this._clipSegment(t, n, r, i, s, l)) && (o.moveTo(a[0], a[1]), o.lineTo(a[2], a[3]));
    }
    contains(t, n, r) {
      return (n = +n) == n && (r = +r) == r && this.delaunay._step(t, n, r) === t;
    }
    *neighbors(t) {
      const n = this._clip(t);
      if (n)
        for (const r of this.delaunay.neighbors(t)) {
          const i = this._clip(r);
          if (i) {
            e:
              for (let o = 0, a = n.length; o < a; o += 2)
                for (let s = 0, l = i.length; s < l; s += 2)
                  if (n[o] == i[s] && n[o + 1] == i[s + 1] && n[(o + 2) % a] == i[(s + l - 2) % l] && n[(o + 3) % a] == i[(s + l - 1) % l]) {
                    yield r;
                    break e;
                  }
          }
        }
    }
    _cell(t) {
      const { circumcenters: n, delaunay: { inedges: r, halfedges: i, triangles: o } } = this, a = r[t];
      if (a === -1)
        return null;
      const s = [];
      let l = a;
      do {
        const u = Math.floor(l / 3);
        if (s.push(n[2 * u], n[2 * u + 1]), l = l % 3 == 2 ? l - 2 : l + 1, o[l] !== t)
          break;
        l = i[l];
      } while (l !== a && l !== -1);
      return s;
    }
    _clip(t) {
      if (t === 0 && this.delaunay.hull.length === 1)
        return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
      const n = this._cell(t);
      if (n === null)
        return null;
      const { vectors: r } = this, i = 4 * t;
      return r[i] || r[i + 1] ? this._clipInfinite(t, n, r[i], r[i + 1], r[i + 2], r[i + 3]) : this._clipFinite(t, n);
    }
    _clipFinite(t, n) {
      const r = n.length;
      let i, o, a, s, l = null, u = n[r - 2], c = n[r - 1], d = this._regioncode(u, c), h = 0;
      for (let p = 0; p < r; p += 2)
        if (i = u, o = c, u = n[p], c = n[p + 1], a = d, d = this._regioncode(u, c), a === 0 && d === 0)
          s = h, h = 0, l ? l.push(u, c) : l = [u, c];
        else {
          let b, m, g, v, M;
          if (a === 0) {
            if ((b = this._clipSegment(i, o, u, c, a, d)) === null)
              continue;
            [m, g, v, M] = b;
          } else {
            if ((b = this._clipSegment(u, c, i, o, d, a)) === null)
              continue;
            [v, M, m, g] = b, s = h, h = this._edgecode(m, g), s && h && this._edge(t, s, h, l, l.length), l ? l.push(m, g) : l = [m, g];
          }
          s = h, h = this._edgecode(v, M), s && h && this._edge(t, s, h, l, l.length), l ? l.push(v, M) : l = [v, M];
        }
      if (l)
        s = h, h = this._edgecode(l[0], l[1]), s && h && this._edge(t, s, h, l, l.length);
      else if (this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2))
        return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
      return l;
    }
    _clipSegment(t, n, r, i, o, a) {
      for (; ; ) {
        if (o === 0 && a === 0)
          return [t, n, r, i];
        if (o & a)
          return null;
        let s, l, u = o || a;
        8 & u ? (s = t + (r - t) * (this.ymax - n) / (i - n), l = this.ymax) : 4 & u ? (s = t + (r - t) * (this.ymin - n) / (i - n), l = this.ymin) : 2 & u ? (l = n + (i - n) * (this.xmax - t) / (r - t), s = this.xmax) : (l = n + (i - n) * (this.xmin - t) / (r - t), s = this.xmin), o ? (t = s, n = l, o = this._regioncode(t, n)) : (r = s, i = l, a = this._regioncode(r, i));
      }
    }
    _clipInfinite(t, n, r, i, o, a) {
      let s, l = Array.from(n);
      if ((s = this._project(l[0], l[1], r, i)) && l.unshift(s[0], s[1]), (s = this._project(l[l.length - 2], l[l.length - 1], o, a)) && l.push(s[0], s[1]), l = this._clipFinite(t, l))
        for (let u, c = 0, d = l.length, h = this._edgecode(l[d - 2], l[d - 1]); c < d; c += 2)
          u = h, h = this._edgecode(l[c], l[c + 1]), u && h && (c = this._edge(t, u, h, l, c), d = l.length);
      else
        this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (l = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]);
      return l;
    }
    _edge(t, n, r, i, o) {
      for (; n !== r; ) {
        let a, s;
        switch (n) {
          case 5:
            n = 4;
            continue;
          case 4:
            n = 6, a = this.xmax, s = this.ymin;
            break;
          case 6:
            n = 2;
            continue;
          case 2:
            n = 10, a = this.xmax, s = this.ymax;
            break;
          case 10:
            n = 8;
            continue;
          case 8:
            n = 9, a = this.xmin, s = this.ymax;
            break;
          case 9:
            n = 1;
            continue;
          case 1:
            n = 5, a = this.xmin, s = this.ymin;
        }
        i[o] === a && i[o + 1] === s || !this.contains(t, a, s) || (i.splice(o, 0, a, s), o += 2);
      }
      if (i.length > 4)
        for (let a = 0; a < i.length; a += 2) {
          const s = (a + 2) % i.length, l = (a + 4) % i.length;
          (i[a] === i[s] && i[s] === i[l] || i[a + 1] === i[s + 1] && i[s + 1] === i[l + 1]) && (i.splice(s, 2), a -= 2);
        }
      return o;
    }
    _project(t, n, r, i) {
      let o, a, s, l = 1 / 0;
      if (i < 0) {
        if (n <= this.ymin)
          return null;
        (o = (this.ymin - n) / i) < l && (s = this.ymin, a = t + (l = o) * r);
      } else if (i > 0) {
        if (n >= this.ymax)
          return null;
        (o = (this.ymax - n) / i) < l && (s = this.ymax, a = t + (l = o) * r);
      }
      if (r > 0) {
        if (t >= this.xmax)
          return null;
        (o = (this.xmax - t) / r) < l && (a = this.xmax, s = n + (l = o) * i);
      } else if (r < 0) {
        if (t <= this.xmin)
          return null;
        (o = (this.xmin - t) / r) < l && (a = this.xmin, s = n + (l = o) * i);
      }
      return [a, s];
    }
    _edgecode(t, n) {
      return (t === this.xmin ? 1 : t === this.xmax ? 2 : 0) | (n === this.ymin ? 4 : n === this.ymax ? 8 : 0);
    }
    _regioncode(t, n) {
      return (t < this.xmin ? 1 : t > this.xmax ? 2 : 0) | (n < this.ymin ? 4 : n > this.ymax ? 8 : 0);
    }
  }
  const nv = 2 * Math.PI, rr = Math.pow;
  function rv(e) {
    return e[0];
  }
  function iv(e) {
    return e[1];
  }
  function ov(e, t, n) {
    return [e + Math.sin(e + t) * n, t + Math.cos(e - t) * n];
  }
  class Ms {
    static from(t, n = rv, r = iv, i) {
      return new Ms("length" in t ? function(o, a, s, l) {
        const u = o.length, c = new Float64Array(2 * u);
        for (let d = 0; d < u; ++d) {
          const h = o[d];
          c[2 * d] = a.call(l, h, d, o), c[2 * d + 1] = s.call(l, h, d, o);
        }
        return c;
      }(t, n, r, i) : Float64Array.from(function* (o, a, s, l) {
        let u = 0;
        for (const c of o)
          yield a.call(l, c, u, o), yield s.call(l, c, u, o), ++u;
      }(t, n, r, i)));
    }
    constructor(t) {
      this._delaunator = new no(t), this.inedges = new Int32Array(t.length / 2), this._hullIndex = new Int32Array(t.length / 2), this.points = this._delaunator.coords, this._init();
    }
    update() {
      return this._delaunator.update(), this._init(), this;
    }
    _init() {
      const t = this._delaunator, n = this.points;
      if (t.hull && t.hull.length > 2 && function(l) {
        const { triangles: u, coords: c } = l;
        for (let d = 0; d < u.length; d += 3) {
          const h = 2 * u[d], p = 2 * u[d + 1], b = 2 * u[d + 2];
          if ((c[b] - c[h]) * (c[p + 1] - c[h + 1]) - (c[p] - c[h]) * (c[b + 1] - c[h + 1]) > 1e-10)
            return !1;
        }
        return !0;
      }(t)) {
        this.collinear = Int32Array.from({ length: n.length / 2 }, (h, p) => p).sort((h, p) => n[2 * h] - n[2 * p] || n[2 * h + 1] - n[2 * p + 1]);
        const l = this.collinear[0], u = this.collinear[this.collinear.length - 1], c = [n[2 * l], n[2 * l + 1], n[2 * u], n[2 * u + 1]], d = 1e-8 * Math.hypot(c[3] - c[1], c[2] - c[0]);
        for (let h = 0, p = n.length / 2; h < p; ++h) {
          const b = ov(n[2 * h], n[2 * h + 1], d);
          n[2 * h] = b[0], n[2 * h + 1] = b[1];
        }
        this._delaunator = new no(n);
      } else
        delete this.collinear;
      const r = this.halfedges = this._delaunator.halfedges, i = this.hull = this._delaunator.hull, o = this.triangles = this._delaunator.triangles, a = this.inedges.fill(-1), s = this._hullIndex.fill(-1);
      for (let l = 0, u = r.length; l < u; ++l) {
        const c = o[l % 3 == 2 ? l - 2 : l + 1];
        r[l] !== -1 && a[c] !== -1 || (a[c] = l);
      }
      for (let l = 0, u = i.length; l < u; ++l)
        s[i[l]] = l;
      i.length <= 2 && i.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = i[0], a[i[0]] = 1, i.length === 2 && (a[i[1]] = 0, this.triangles[1] = i[1], this.triangles[2] = i[1]));
    }
    voronoi(t) {
      return new wf(this, t);
    }
    *neighbors(t) {
      const { inedges: n, hull: r, _hullIndex: i, halfedges: o, triangles: a, collinear: s } = this;
      if (s) {
        const d = s.indexOf(t);
        return d > 0 && (yield s[d - 1]), void (d < s.length - 1 && (yield s[d + 1]));
      }
      const l = n[t];
      if (l === -1)
        return;
      let u = l, c = -1;
      do {
        if (yield c = a[u], u = u % 3 == 2 ? u - 2 : u + 1, a[u] !== t)
          return;
        if (u = o[u], u === -1) {
          const d = r[(i[t] + 1) % r.length];
          return void (d !== c && (yield d));
        }
      } while (u !== l);
    }
    find(t, n, r = 0) {
      if ((t = +t) != t || (n = +n) != n)
        return -1;
      const i = r;
      let o;
      for (; (o = this._step(r, t, n)) >= 0 && o !== r && o !== i; )
        r = o;
      return o;
    }
    _step(t, n, r) {
      const { inedges: i, hull: o, _hullIndex: a, halfedges: s, triangles: l, points: u } = this;
      if (i[t] === -1 || !u.length)
        return (t + 1) % (u.length >> 1);
      let c = t, d = rr(n - u[2 * t], 2) + rr(r - u[2 * t + 1], 2);
      const h = i[t];
      let p = h;
      do {
        let b = l[p];
        const m = rr(n - u[2 * b], 2) + rr(r - u[2 * b + 1], 2);
        if (m < d && (d = m, c = b), p = p % 3 == 2 ? p - 2 : p + 1, l[p] !== t)
          break;
        if (p = s[p], p === -1) {
          if (p = o[(a[t] + 1) % o.length], p !== b && rr(n - u[2 * p], 2) + rr(r - u[2 * p + 1], 2) < d)
            return p;
          break;
        }
      } while (p !== h);
      return c;
    }
    render(t) {
      const n = t == null ? t = new Sn() : void 0, { points: r, halfedges: i, triangles: o } = this;
      for (let a = 0, s = i.length; a < s; ++a) {
        const l = i[a];
        if (l < a)
          continue;
        const u = 2 * o[a], c = 2 * o[l];
        t.moveTo(r[u], r[u + 1]), t.lineTo(r[c], r[c + 1]);
      }
      return this.renderHull(t), n && n.value();
    }
    renderPoints(t, n) {
      n !== void 0 || t && typeof t.moveTo == "function" || (n = t, t = null), n = n == null ? 2 : +n;
      const r = t == null ? t = new Sn() : void 0, { points: i } = this;
      for (let o = 0, a = i.length; o < a; o += 2) {
        const s = i[o], l = i[o + 1];
        t.moveTo(s + n, l), t.arc(s, l, n, 0, nv);
      }
      return r && r.value();
    }
    renderHull(t) {
      const n = t == null ? t = new Sn() : void 0, { hull: r, points: i } = this, o = 2 * r[0], a = r.length;
      t.moveTo(i[o], i[o + 1]);
      for (let s = 1; s < a; ++s) {
        const l = 2 * r[s];
        t.lineTo(i[l], i[l + 1]);
      }
      return t.closePath(), n && n.value();
    }
    hullPolygon() {
      const t = new ws();
      return this.renderHull(t), t.value();
    }
    renderTriangle(t, n) {
      const r = n == null ? n = new Sn() : void 0, { points: i, triangles: o } = this, a = 2 * o[t *= 3], s = 2 * o[t + 1], l = 2 * o[t + 2];
      return n.moveTo(i[a], i[a + 1]), n.lineTo(i[s], i[s + 1]), n.lineTo(i[l], i[l + 1]), n.closePath(), r && r.value();
    }
    *trianglePolygons() {
      const { triangles: t } = this;
      for (let n = 0, r = t.length / 3; n < r; ++n)
        yield this.trianglePolygon(n);
    }
    trianglePolygon(t) {
      const n = new ws();
      return this.renderTriangle(t, n), n.value();
    }
  }
  var Mf = {}, Es = {};
  function Ef(e) {
    return new Function("d", "return {" + e.map(function(t, n) {
      return JSON.stringify(t) + ": d[" + n + '] || ""';
    }).join(",") + "}");
  }
  function Sf(e) {
    var t = /* @__PURE__ */ Object.create(null), n = [];
    return e.forEach(function(r) {
      for (var i in r)
        i in t || n.push(t[i] = i);
    }), n;
  }
  function ot(e, t) {
    var n = e + "", r = n.length;
    return r < t ? new Array(t - r + 1).join(0) + n : n;
  }
  function av(e) {
    var t = e.getUTCHours(), n = e.getUTCMinutes(), r = e.getUTCSeconds(), i = e.getUTCMilliseconds();
    return isNaN(e) ? "Invalid Date" : function(o) {
      return o < 0 ? "-" + ot(-o, 6) : o > 9999 ? "+" + ot(o, 6) : ot(o, 4);
    }(e.getUTCFullYear()) + "-" + ot(e.getUTCMonth() + 1, 2) + "-" + ot(e.getUTCDate(), 2) + (i ? "T" + ot(t, 2) + ":" + ot(n, 2) + ":" + ot(r, 2) + "." + ot(i, 3) + "Z" : r ? "T" + ot(t, 2) + ":" + ot(n, 2) + ":" + ot(r, 2) + "Z" : n || t ? "T" + ot(t, 2) + ":" + ot(n, 2) + "Z" : "");
  }
  function ro(e) {
    var t = new RegExp('["' + e + `
\r]`), n = e.charCodeAt(0);
    function r(s, l) {
      var u, c = [], d = s.length, h = 0, p = 0, b = d <= 0, m = !1;
      function g() {
        if (b)
          return Es;
        if (m)
          return m = !1, Mf;
        var M, _, y = h;
        if (s.charCodeAt(y) === 34) {
          for (; h++ < d && s.charCodeAt(h) !== 34 || s.charCodeAt(++h) === 34; )
            ;
          return (M = h) >= d ? b = !0 : (_ = s.charCodeAt(h++)) === 10 ? m = !0 : _ === 13 && (m = !0, s.charCodeAt(h) === 10 && ++h), s.slice(y + 1, M - 1).replace(/""/g, '"');
        }
        for (; h < d; ) {
          if ((_ = s.charCodeAt(M = h++)) === 10)
            m = !0;
          else if (_ === 13)
            m = !0, s.charCodeAt(h) === 10 && ++h;
          else if (_ !== n)
            continue;
          return s.slice(y, M);
        }
        return b = !0, s.slice(y, d);
      }
      for (s.charCodeAt(d - 1) === 10 && --d, s.charCodeAt(d - 1) === 13 && --d; (u = g()) !== Es; ) {
        for (var v = []; u !== Mf && u !== Es; )
          v.push(u), u = g();
        l && (v = l(v, p++)) == null || c.push(v);
      }
      return c;
    }
    function i(s, l) {
      return s.map(function(u) {
        return l.map(function(c) {
          return a(u[c]);
        }).join(e);
      });
    }
    function o(s) {
      return s.map(a).join(e);
    }
    function a(s) {
      return s == null ? "" : s instanceof Date ? av(s) : t.test(s += "") ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    return { parse: function(s, l) {
      var u, c, d = r(s, function(h, p) {
        if (u)
          return u(h, p - 1);
        c = h, u = l ? function(b, m) {
          var g = Ef(b);
          return function(v, M) {
            return m(g(v), M, b);
          };
        }(h, l) : Ef(h);
      });
      return d.columns = c || [], d;
    }, parseRows: r, format: function(s, l) {
      return l == null && (l = Sf(s)), [l.map(a).join(e)].concat(i(s, l)).join(`
`);
    }, formatBody: function(s, l) {
      return l == null && (l = Sf(s)), i(s, l).join(`
`);
    }, formatRows: function(s) {
      return s.map(o).join(`
`);
    }, formatRow: o, formatValue: a };
  }
  var Tn = ro(","), Tf = Tn.parse, sv = Tn.parseRows, lv = Tn.format, uv = Tn.formatBody, cv = Tn.formatRows, fv = Tn.formatRow, hv = Tn.formatValue, kn = ro("	"), kf = kn.parse, dv = kn.parseRows, pv = kn.format, gv = kn.formatBody, mv = kn.formatRows, vv = kn.formatRow, bv = kn.formatValue;
  const yv = (/* @__PURE__ */ new Date("2019-01-01T00:00")).getHours() || (/* @__PURE__ */ new Date("2019-07-01T00:00")).getHours();
  function _v(e) {
    if (!e.ok)
      throw new Error(e.status + " " + e.statusText);
    return e.blob();
  }
  function xv(e) {
    if (!e.ok)
      throw new Error(e.status + " " + e.statusText);
    return e.arrayBuffer();
  }
  function wv(e) {
    if (!e.ok)
      throw new Error(e.status + " " + e.statusText);
    return e.text();
  }
  function io(e, t) {
    return fetch(e, t).then(wv);
  }
  function Af(e) {
    return function(t, n, r) {
      return arguments.length === 2 && typeof n == "function" && (r = n, n = void 0), io(t, n).then(function(i) {
        return e(i, r);
      });
    };
  }
  var Mv = Af(Tf), Ev = Af(kf);
  function Sv(e) {
    if (!e.ok)
      throw new Error(e.status + " " + e.statusText);
    if (e.status !== 204 && e.status !== 205)
      return e.json();
  }
  function Ss(e) {
    return (t, n) => io(t, n).then((r) => new DOMParser().parseFromString(r, e));
  }
  var Tv = Ss("application/xml"), kv = Ss("text/html"), Av = Ss("image/svg+xml");
  function Nf(e, t, n, r) {
    if (isNaN(t) || isNaN(n))
      return e;
    var i, o, a, s, l, u, c, d, h, p = e._root, b = { data: r }, m = e._x0, g = e._y0, v = e._x1, M = e._y1;
    if (!p)
      return e._root = b, e;
    for (; p.length; )
      if ((u = t >= (o = (m + v) / 2)) ? m = o : v = o, (c = n >= (a = (g + M) / 2)) ? g = a : M = a, i = p, !(p = p[d = c << 1 | u]))
        return i[d] = b, e;
    if (s = +e._x.call(null, p.data), l = +e._y.call(null, p.data), t === s && n === l)
      return b.next = p, i ? i[d] = b : e._root = b, e;
    do
      i = i ? i[d] = new Array(4) : e._root = new Array(4), (u = t >= (o = (m + v) / 2)) ? m = o : v = o, (c = n >= (a = (g + M) / 2)) ? g = a : M = a;
    while ((d = c << 1 | u) == (h = (l >= a) << 1 | s >= o));
    return i[h] = p, i[d] = b, e;
  }
  function Xe(e, t, n, r, i) {
    this.node = e, this.x0 = t, this.y0 = n, this.x1 = r, this.y1 = i;
  }
  function Nv(e) {
    return e[0];
  }
  function Cv(e) {
    return e[1];
  }
  function oo(e, t, n) {
    var r = new Ts(t ?? Nv, n ?? Cv, NaN, NaN, NaN, NaN);
    return e == null ? r : r.addAll(e);
  }
  function Ts(e, t, n, r, i, o) {
    this._x = e, this._y = t, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
  }
  function Cf(e) {
    for (var t = { data: e.data }, n = t; e = e.next; )
      n = n.next = { data: e.data };
    return t;
  }
  var Ze = oo.prototype = Ts.prototype;
  function ze(e) {
    return function() {
      return e;
    };
  }
  function Jt(e) {
    return 1e-6 * (e() - 0.5);
  }
  function zv(e) {
    return e.x + e.vx;
  }
  function Lv(e) {
    return e.y + e.vy;
  }
  function Pv(e) {
    return e.index;
  }
  function zf(e, t) {
    var n = e.get(t);
    if (!n)
      throw new Error("node not found: " + t);
    return n;
  }
  Ze.copy = function() {
    var e, t, n = new Ts(this._x, this._y, this._x0, this._y0, this._x1, this._y1), r = this._root;
    if (!r)
      return n;
    if (!r.length)
      return n._root = Cf(r), n;
    for (e = [{ source: r, target: n._root = new Array(4) }]; r = e.pop(); )
      for (var i = 0; i < 4; ++i)
        (t = r.source[i]) && (t.length ? e.push({ source: t, target: r.target[i] = new Array(4) }) : r.target[i] = Cf(t));
    return n;
  }, Ze.add = function(e) {
    const t = +this._x.call(null, e), n = +this._y.call(null, e);
    return Nf(this.cover(t, n), t, n, e);
  }, Ze.addAll = function(e) {
    var t, n, r, i, o = e.length, a = new Array(o), s = new Array(o), l = 1 / 0, u = 1 / 0, c = -1 / 0, d = -1 / 0;
    for (n = 0; n < o; ++n)
      isNaN(r = +this._x.call(null, t = e[n])) || isNaN(i = +this._y.call(null, t)) || (a[n] = r, s[n] = i, r < l && (l = r), r > c && (c = r), i < u && (u = i), i > d && (d = i));
    if (l > c || u > d)
      return this;
    for (this.cover(l, u).cover(c, d), n = 0; n < o; ++n)
      Nf(this, a[n], s[n], e[n]);
    return this;
  }, Ze.cover = function(e, t) {
    if (isNaN(e = +e) || isNaN(t = +t))
      return this;
    var n = this._x0, r = this._y0, i = this._x1, o = this._y1;
    if (isNaN(n))
      i = (n = Math.floor(e)) + 1, o = (r = Math.floor(t)) + 1;
    else {
      for (var a, s, l = i - n || 1, u = this._root; n > e || e >= i || r > t || t >= o; )
        switch (s = (t < r) << 1 | e < n, (a = new Array(4))[s] = u, u = a, l *= 2, s) {
          case 0:
            i = n + l, o = r + l;
            break;
          case 1:
            n = i - l, o = r + l;
            break;
          case 2:
            i = n + l, r = o - l;
            break;
          case 3:
            n = i - l, r = o - l;
        }
      this._root && this._root.length && (this._root = u);
    }
    return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this;
  }, Ze.data = function() {
    var e = [];
    return this.visit(function(t) {
      if (!t.length)
        do
          e.push(t.data);
        while (t = t.next);
    }), e;
  }, Ze.extent = function(e) {
    return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
  }, Ze.find = function(e, t, n) {
    var r, i, o, a, s, l, u, c = this._x0, d = this._y0, h = this._x1, p = this._y1, b = [], m = this._root;
    for (m && b.push(new Xe(m, c, d, h, p)), n == null ? n = 1 / 0 : (c = e - n, d = t - n, h = e + n, p = t + n, n *= n); l = b.pop(); )
      if (!(!(m = l.node) || (i = l.x0) > h || (o = l.y0) > p || (a = l.x1) < c || (s = l.y1) < d))
        if (m.length) {
          var g = (i + a) / 2, v = (o + s) / 2;
          b.push(new Xe(m[3], g, v, a, s), new Xe(m[2], i, v, g, s), new Xe(m[1], g, o, a, v), new Xe(m[0], i, o, g, v)), (u = (t >= v) << 1 | e >= g) && (l = b[b.length - 1], b[b.length - 1] = b[b.length - 1 - u], b[b.length - 1 - u] = l);
        } else {
          var M = e - +this._x.call(null, m.data), _ = t - +this._y.call(null, m.data), y = M * M + _ * _;
          if (y < n) {
            var E = Math.sqrt(n = y);
            c = e - E, d = t - E, h = e + E, p = t + E, r = m.data;
          }
        }
    return r;
  }, Ze.remove = function(e) {
    if (isNaN(o = +this._x.call(null, e)) || isNaN(a = +this._y.call(null, e)))
      return this;
    var t, n, r, i, o, a, s, l, u, c, d, h, p = this._root, b = this._x0, m = this._y0, g = this._x1, v = this._y1;
    if (!p)
      return this;
    if (p.length)
      for (; ; ) {
        if ((u = o >= (s = (b + g) / 2)) ? b = s : g = s, (c = a >= (l = (m + v) / 2)) ? m = l : v = l, t = p, !(p = p[d = c << 1 | u]))
          return this;
        if (!p.length)
          break;
        (t[d + 1 & 3] || t[d + 2 & 3] || t[d + 3 & 3]) && (n = t, h = d);
      }
    for (; p.data !== e; )
      if (r = p, !(p = p.next))
        return this;
    return (i = p.next) && delete p.next, r ? (i ? r.next = i : delete r.next, this) : t ? (i ? t[d] = i : delete t[d], (p = t[0] || t[1] || t[2] || t[3]) && p === (t[3] || t[2] || t[1] || t[0]) && !p.length && (n ? n[h] = p : this._root = p), this) : (this._root = i, this);
  }, Ze.removeAll = function(e) {
    for (var t = 0, n = e.length; t < n; ++t)
      this.remove(e[t]);
    return this;
  }, Ze.root = function() {
    return this._root;
  }, Ze.size = function() {
    var e = 0;
    return this.visit(function(t) {
      if (!t.length)
        do
          ++e;
        while (t = t.next);
    }), e;
  }, Ze.visit = function(e) {
    var t, n, r, i, o, a, s = [], l = this._root;
    for (l && s.push(new Xe(l, this._x0, this._y0, this._x1, this._y1)); t = s.pop(); )
      if (!e(l = t.node, r = t.x0, i = t.y0, o = t.x1, a = t.y1) && l.length) {
        var u = (r + o) / 2, c = (i + a) / 2;
        (n = l[3]) && s.push(new Xe(n, u, c, o, a)), (n = l[2]) && s.push(new Xe(n, r, c, u, a)), (n = l[1]) && s.push(new Xe(n, u, i, o, c)), (n = l[0]) && s.push(new Xe(n, r, i, u, c));
      }
    return this;
  }, Ze.visitAfter = function(e) {
    var t, n = [], r = [];
    for (this._root && n.push(new Xe(this._root, this._x0, this._y0, this._x1, this._y1)); t = n.pop(); ) {
      var i = t.node;
      if (i.length) {
        var o, a = t.x0, s = t.y0, l = t.x1, u = t.y1, c = (a + l) / 2, d = (s + u) / 2;
        (o = i[0]) && n.push(new Xe(o, a, s, c, d)), (o = i[1]) && n.push(new Xe(o, c, s, l, d)), (o = i[2]) && n.push(new Xe(o, a, d, c, u)), (o = i[3]) && n.push(new Xe(o, c, d, l, u));
      }
      r.push(t);
    }
    for (; t = r.pop(); )
      e(t.node, t.x0, t.y0, t.x1, t.y1);
    return this;
  }, Ze.x = function(e) {
    return arguments.length ? (this._x = e, this) : this._x;
  }, Ze.y = function(e) {
    return arguments.length ? (this._y = e, this) : this._y;
  };
  const Lf = 4294967296;
  function $v(e) {
    return e.x;
  }
  function Ov(e) {
    return e.y;
  }
  var Iv = Math.PI * (3 - Math.sqrt(5));
  function ao(e, t) {
    if ((n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0)
      return null;
    var n, r = e.slice(0, n);
    return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
  }
  function ir(e) {
    return (e = ao(Math.abs(e))) ? e[1] : NaN;
  }
  var Pf, Rv = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function or(e) {
    if (!(t = Rv.exec(e)))
      throw new Error("invalid format: " + e);
    var t;
    return new so({ fill: t[1], align: t[2], sign: t[3], symbol: t[4], zero: t[5], width: t[6], comma: t[7], precision: t[8] && t[8].slice(1), trim: t[9], type: t[10] });
  }
  function so(e) {
    this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
  }
  function $f(e, t) {
    var n = ao(e, t);
    if (!n)
      return e + "";
    var r = n[0], i = n[1];
    return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
  }
  or.prototype = so.prototype, so.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type;
  };
  var Of = { "%": (e, t) => (100 * e).toFixed(t), b: (e) => Math.round(e).toString(2), c: (e) => e + "", d: function(e) {
    return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
  }, e: (e, t) => e.toExponential(t), f: (e, t) => e.toFixed(t), g: (e, t) => e.toPrecision(t), o: (e) => Math.round(e).toString(8), p: (e, t) => $f(100 * e, t), r: $f, s: function(e, t) {
    var n = ao(e, t);
    if (!n)
      return e + "";
    var r = n[0], i = n[1], o = i - (Pf = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1, a = r.length;
    return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + ao(e, Math.max(0, t + o - 1))[0];
  }, X: (e) => Math.round(e).toString(16).toUpperCase(), x: (e) => Math.round(e).toString(16) };
  function If(e) {
    return e;
  }
  var lo, Rf = Array.prototype.map, Ff = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function jf(e) {
    var t, n, r = e.grouping === void 0 || e.thousands === void 0 ? If : (t = Rf.call(e.grouping, Number), n = e.thousands + "", function(h, p) {
      for (var b = h.length, m = [], g = 0, v = t[0], M = 0; b > 0 && v > 0 && (M + v + 1 > p && (v = Math.max(1, p - M)), m.push(h.substring(b -= v, b + v)), !((M += v + 1) > p)); )
        v = t[g = (g + 1) % t.length];
      return m.reverse().join(n);
    }), i = e.currency === void 0 ? "" : e.currency[0] + "", o = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", s = e.numerals === void 0 ? If : /* @__PURE__ */ function(h) {
      return function(p) {
        return p.replace(/[0-9]/g, function(b) {
          return h[+b];
        });
      };
    }(Rf.call(e.numerals, String)), l = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
    function d(h) {
      var p = (h = or(h)).fill, b = h.align, m = h.sign, g = h.symbol, v = h.zero, M = h.width, _ = h.comma, y = h.precision, E = h.trim, S = h.type;
      S === "n" ? (_ = !0, S = "g") : Of[S] || (y === void 0 && (y = 12), E = !0, S = "g"), (v || p === "0" && b === "=") && (v = !0, p = "0", b = "=");
      var O = g === "$" ? i : g === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : "", j = g === "$" ? o : /[%p]/.test(S) ? l : "", z = Of[S], C = /[defgprs%]/.test(S);
      function N(P) {
        var T, A, $, I = O, D = j;
        if (S === "c")
          D = z(P) + D, P = "";
        else {
          var B = (P = +P) < 0 || 1 / P < 0;
          if (P = isNaN(P) ? c : z(Math.abs(P), y), E && (P = function(V) {
            e:
              for (var ae, se = V.length, K = 1, te = -1; K < se; ++K)
                switch (V[K]) {
                  case ".":
                    te = ae = K;
                    break;
                  case "0":
                    te === 0 && (te = K), ae = K;
                    break;
                  default:
                    if (!+V[K])
                      break e;
                    te > 0 && (te = 0);
                }
            return te > 0 ? V.slice(0, te) + V.slice(ae + 1) : V;
          }(P)), B && +P == 0 && m !== "+" && (B = !1), I = (B ? m === "(" ? m : u : m === "-" || m === "(" ? "" : m) + I, D = (S === "s" ? Ff[8 + Pf / 3] : "") + D + (B && m === "(" ? ")" : ""), C) {
            for (T = -1, A = P.length; ++T < A; )
              if (48 > ($ = P.charCodeAt(T)) || $ > 57) {
                D = ($ === 46 ? a + P.slice(T + 1) : P.slice(T)) + D, P = P.slice(0, T);
                break;
              }
          }
        }
        _ && !v && (P = r(P, 1 / 0));
        var H = I.length + P.length + D.length, Z = H < M ? new Array(M - H + 1).join(p) : "";
        switch (_ && v && (P = r(Z + P, Z.length ? M - D.length : 1 / 0), Z = ""), b) {
          case "<":
            P = I + P + D + Z;
            break;
          case "=":
            P = I + Z + P + D;
            break;
          case "^":
            P = Z.slice(0, H = Z.length >> 1) + I + P + D + Z.slice(H);
            break;
          default:
            P = Z + I + P + D;
        }
        return s(P);
      }
      return y = y === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y)), N.toString = function() {
        return h + "";
      }, N;
    }
    return { format: d, formatPrefix: function(h, p) {
      var b = d(((h = or(h)).type = "f", h)), m = 3 * Math.max(-8, Math.min(8, Math.floor(ir(p) / 3))), g = Math.pow(10, -m), v = Ff[8 + m / 3];
      return function(M) {
        return b(g * M) + v;
      };
    } };
  }
  function Df(e) {
    return lo = jf(e), f.format = lo.format, f.formatPrefix = lo.formatPrefix, lo;
  }
  function qf(e) {
    return Math.max(0, -ir(Math.abs(e)));
  }
  function Bf(e, t) {
    return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(ir(t) / 3))) - ir(Math.abs(e)));
  }
  function Uf(e, t) {
    return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, ir(t) - ir(e)) + 1;
  }
  f.format = void 0, f.formatPrefix = void 0, Df({ thousands: ",", grouping: [3], currency: ["$", ""] });
  var ue = 1e-6, uo = 1e-12, pe = Math.PI, Ae = pe / 2, co = pe / 4, We = 2 * pe, Me = 180 / pe, le = pe / 180, ve = Math.abs, ar = Math.atan, Je = Math.atan2, ee = Math.cos, fo = Math.ceil, Yf = Math.exp, ks = Math.hypot, ho = Math.log, As = Math.pow, J = Math.sin, pt = Math.sign || function(e) {
    return e > 0 ? 1 : e < 0 ? -1 : 0;
  }, Ie = Math.sqrt, Ns = Math.tan;
  function Hf(e) {
    return e > 1 ? 0 : e < -1 ? pe : Math.acos(e);
  }
  function Ke(e) {
    return e > 1 ? Ae : e < -1 ? -Ae : Math.asin(e);
  }
  function Vf(e) {
    return (e = J(e / 2)) * e;
  }
  function Te() {
  }
  function po(e, t) {
    e && Xf.hasOwnProperty(e.type) && Xf[e.type](e, t);
  }
  var Gf = { Feature: function(e, t) {
    po(e.geometry, t);
  }, FeatureCollection: function(e, t) {
    for (var n = e.features, r = -1, i = n.length; ++r < i; )
      po(n[r].geometry, t);
  } }, Xf = { Sphere: function(e, t) {
    t.sphere();
  }, Point: function(e, t) {
    e = e.coordinates, t.point(e[0], e[1], e[2]);
  }, MultiPoint: function(e, t) {
    for (var n = e.coordinates, r = -1, i = n.length; ++r < i; )
      e = n[r], t.point(e[0], e[1], e[2]);
  }, LineString: function(e, t) {
    Cs(e.coordinates, t, 0);
  }, MultiLineString: function(e, t) {
    for (var n = e.coordinates, r = -1, i = n.length; ++r < i; )
      Cs(n[r], t, 0);
  }, Polygon: function(e, t) {
    Zf(e.coordinates, t);
  }, MultiPolygon: function(e, t) {
    for (var n = e.coordinates, r = -1, i = n.length; ++r < i; )
      Zf(n[r], t);
  }, GeometryCollection: function(e, t) {
    for (var n = e.geometries, r = -1, i = n.length; ++r < i; )
      po(n[r], t);
  } };
  function Cs(e, t, n) {
    var r, i = -1, o = e.length - n;
    for (t.lineStart(); ++i < o; )
      r = e[i], t.point(r[0], r[1], r[2]);
    t.lineEnd();
  }
  function Zf(e, t) {
    var n = -1, r = e.length;
    for (t.polygonStart(); ++n < r; )
      Cs(e[n], t, 1);
    t.polygonEnd();
  }
  function wt(e, t) {
    e && Gf.hasOwnProperty(e.type) ? Gf[e.type](e, t) : po(e, t);
  }
  var Wf, Jf, zs, Ls, Ps, ke, at, Ne, ft, An, Kf, Qf, sr, qr, Kt, Dt, go = new me(), mo = new me(), Ct = { point: Te, lineStart: Te, lineEnd: Te, polygonStart: function() {
    go = new me(), Ct.lineStart = Fv, Ct.lineEnd = jv;
  }, polygonEnd: function() {
    var e = +go;
    mo.add(e < 0 ? We + e : e), this.lineStart = this.lineEnd = this.point = Te;
  }, sphere: function() {
    mo.add(We);
  } };
  function Fv() {
    Ct.point = Dv;
  }
  function jv() {
    eh(Wf, Jf);
  }
  function Dv(e, t) {
    Ct.point = eh, Wf = e, Jf = t, zs = e *= le, Ls = ee(t = (t *= le) / 2 + co), Ps = J(t);
  }
  function eh(e, t) {
    var n = (e *= le) - zs, r = n >= 0 ? 1 : -1, i = r * n, o = ee(t = (t *= le) / 2 + co), a = J(t), s = Ps * a, l = Ls * o + s * ee(i), u = s * r * J(i);
    go.add(Je(u, l)), zs = e, Ls = o, Ps = a;
  }
  function vo(e) {
    return [Je(e[1], e[0]), Ke(e[2])];
  }
  function Nn(e) {
    var t = e[0], n = e[1], r = ee(n);
    return [r * ee(t), r * J(t), J(n)];
  }
  function bo(e, t) {
    return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
  }
  function lr(e, t) {
    return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]];
  }
  function $s(e, t) {
    e[0] += t[0], e[1] += t[1], e[2] += t[2];
  }
  function yo(e, t) {
    return [e[0] * t, e[1] * t, e[2] * t];
  }
  function _o(e) {
    var t = Ie(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
    e[0] /= t, e[1] /= t, e[2] /= t;
  }
  var Br, xo, wo, Mo, Eo, So, To, ko, Os, Is, Rs, th, nh, Qe, et, tt, qt = { point: Fs, lineStart: ih, lineEnd: oh, polygonStart: function() {
    qt.point = ah, qt.lineStart = qv, qt.lineEnd = Bv, qr = new me(), Ct.polygonStart();
  }, polygonEnd: function() {
    Ct.polygonEnd(), qt.point = Fs, qt.lineStart = ih, qt.lineEnd = oh, go < 0 ? (ke = -(Ne = 180), at = -(ft = 90)) : qr > ue ? ft = 90 : qr < -1e-6 && (at = -90), Dt[0] = ke, Dt[1] = Ne;
  }, sphere: function() {
    ke = -(Ne = 180), at = -(ft = 90);
  } };
  function Fs(e, t) {
    Kt.push(Dt = [ke = e, Ne = e]), t < at && (at = t), t > ft && (ft = t);
  }
  function rh(e, t) {
    var n = Nn([e * le, t * le]);
    if (sr) {
      var r = lr(sr, n), i = lr([r[1], -r[0], 0], r);
      _o(i), i = vo(i);
      var o, a = e - An, s = a > 0 ? 1 : -1, l = i[0] * Me * s, u = ve(a) > 180;
      u ^ (s * An < l && l < s * e) ? (o = i[1] * Me) > ft && (ft = o) : u ^ (s * An < (l = (l + 360) % 360 - 180) && l < s * e) ? (o = -i[1] * Me) < at && (at = o) : (t < at && (at = t), t > ft && (ft = t)), u ? e < An ? ht(ke, e) > ht(ke, Ne) && (Ne = e) : ht(e, Ne) > ht(ke, Ne) && (ke = e) : Ne >= ke ? (e < ke && (ke = e), e > Ne && (Ne = e)) : e > An ? ht(ke, e) > ht(ke, Ne) && (Ne = e) : ht(e, Ne) > ht(ke, Ne) && (ke = e);
    } else
      Kt.push(Dt = [ke = e, Ne = e]);
    t < at && (at = t), t > ft && (ft = t), sr = n, An = e;
  }
  function ih() {
    qt.point = rh;
  }
  function oh() {
    Dt[0] = ke, Dt[1] = Ne, qt.point = Fs, sr = null;
  }
  function ah(e, t) {
    if (sr) {
      var n = e - An;
      qr.add(ve(n) > 180 ? n + (n > 0 ? 360 : -360) : n);
    } else
      Kf = e, Qf = t;
    Ct.point(e, t), rh(e, t);
  }
  function qv() {
    Ct.lineStart();
  }
  function Bv() {
    ah(Kf, Qf), Ct.lineEnd(), ve(qr) > ue && (ke = -(Ne = 180)), Dt[0] = ke, Dt[1] = Ne, sr = null;
  }
  function ht(e, t) {
    return (t -= e) < 0 ? t + 360 : t;
  }
  function Uv(e, t) {
    return e[0] - t[0];
  }
  function sh(e, t) {
    return e[0] <= e[1] ? e[0] <= t && t <= e[1] : t < e[0] || e[1] < t;
  }
  var Mt = { sphere: Te, point: js, lineStart: lh, lineEnd: uh, polygonStart: function() {
    Mt.lineStart = Vv, Mt.lineEnd = Gv;
  }, polygonEnd: function() {
    Mt.lineStart = lh, Mt.lineEnd = uh;
  } };
  function js(e, t) {
    e *= le;
    var n = ee(t *= le);
    Ur(n * ee(e), n * J(e), J(t));
  }
  function Ur(e, t, n) {
    ++Br, wo += (e - wo) / Br, Mo += (t - Mo) / Br, Eo += (n - Eo) / Br;
  }
  function lh() {
    Mt.point = Yv;
  }
  function Yv(e, t) {
    e *= le;
    var n = ee(t *= le);
    Qe = n * ee(e), et = n * J(e), tt = J(t), Mt.point = Hv, Ur(Qe, et, tt);
  }
  function Hv(e, t) {
    e *= le;
    var n = ee(t *= le), r = n * ee(e), i = n * J(e), o = J(t), a = Je(Ie((a = et * o - tt * i) * a + (a = tt * r - Qe * o) * a + (a = Qe * i - et * r) * a), Qe * r + et * i + tt * o);
    xo += a, So += a * (Qe + (Qe = r)), To += a * (et + (et = i)), ko += a * (tt + (tt = o)), Ur(Qe, et, tt);
  }
  function uh() {
    Mt.point = js;
  }
  function Vv() {
    Mt.point = Xv;
  }
  function Gv() {
    ch(th, nh), Mt.point = js;
  }
  function Xv(e, t) {
    th = e, nh = t, e *= le, t *= le, Mt.point = ch;
    var n = ee(t);
    Qe = n * ee(e), et = n * J(e), tt = J(t), Ur(Qe, et, tt);
  }
  function ch(e, t) {
    e *= le;
    var n = ee(t *= le), r = n * ee(e), i = n * J(e), o = J(t), a = et * o - tt * i, s = tt * r - Qe * o, l = Qe * i - et * r, u = ks(a, s, l), c = Ke(u), d = u && -c / u;
    Os.add(d * a), Is.add(d * s), Rs.add(d * l), xo += c, So += c * (Qe + (Qe = r)), To += c * (et + (et = i)), ko += c * (tt + (tt = o)), Ur(Qe, et, tt);
  }
  function ur(e) {
    return function() {
      return e;
    };
  }
  function Ds(e, t) {
    function n(r, i) {
      return r = e(r, i), t(r[0], r[1]);
    }
    return e.invert && t.invert && (n.invert = function(r, i) {
      return (r = t.invert(r, i)) && e.invert(r[0], r[1]);
    }), n;
  }
  function qs(e, t) {
    return [ve(e) > pe ? e + Math.round(-e / We) * We : e, t];
  }
  function Bs(e, t, n) {
    return (e %= We) ? t || n ? Ds(hh(e), dh(t, n)) : hh(e) : t || n ? dh(t, n) : qs;
  }
  function fh(e) {
    return function(t, n) {
      return [(t += e) > pe ? t - We : t < -pe ? t + We : t, n];
    };
  }
  function hh(e) {
    var t = fh(e);
    return t.invert = fh(-e), t;
  }
  function dh(e, t) {
    var n = ee(e), r = J(e), i = ee(t), o = J(t);
    function a(s, l) {
      var u = ee(l), c = ee(s) * u, d = J(s) * u, h = J(l), p = h * n + c * r;
      return [Je(d * i - p * o, c * n - h * r), Ke(p * i + d * o)];
    }
    return a.invert = function(s, l) {
      var u = ee(l), c = ee(s) * u, d = J(s) * u, h = J(l), p = h * i - d * o;
      return [Je(d * i + h * o, c * n + p * r), Ke(p * n - c * r)];
    }, a;
  }
  function ph(e) {
    function t(n) {
      return (n = e(n[0] * le, n[1] * le))[0] *= Me, n[1] *= Me, n;
    }
    return e = Bs(e[0] * le, e[1] * le, e.length > 2 ? e[2] * le : 0), t.invert = function(n) {
      return (n = e.invert(n[0] * le, n[1] * le))[0] *= Me, n[1] *= Me, n;
    }, t;
  }
  function gh(e, t, n, r, i, o) {
    if (n) {
      var a = ee(t), s = J(t), l = r * n;
      i == null ? (i = t + r * We, o = t - l / 2) : (i = mh(a, i), o = mh(a, o), (r > 0 ? i < o : i > o) && (i += r * We));
      for (var u, c = i; r > 0 ? c > o : c < o; c -= l)
        u = vo([a, -s * ee(c), -s * J(c)]), e.point(u[0], u[1]);
    }
  }
  function mh(e, t) {
    (t = Nn(t))[0] -= e, _o(t);
    var n = Hf(-t[1]);
    return ((-t[2] < 0 ? -n : n) + We - ue) % We;
  }
  function vh() {
    var e, t = [];
    return { point: function(n, r, i) {
      e.push([n, r, i]);
    }, lineStart: function() {
      t.push(e = []);
    }, lineEnd: Te, rejoin: function() {
      t.length > 1 && t.push(t.pop().concat(t.shift()));
    }, result: function() {
      var n = t;
      return t = [], e = null, n;
    } };
  }
  function Ao(e, t) {
    return ve(e[0] - t[0]) < ue && ve(e[1] - t[1]) < ue;
  }
  function No(e, t, n, r) {
    this.x = e, this.z = t, this.o = n, this.e = r, this.v = !1, this.n = this.p = null;
  }
  function bh(e, t, n, r, i) {
    var o, a, s = [], l = [];
    if (e.forEach(function(b) {
      if (!((m = b.length - 1) <= 0)) {
        var m, g, v = b[0], M = b[m];
        if (Ao(v, M)) {
          if (!v[2] && !M[2]) {
            for (i.lineStart(), o = 0; o < m; ++o)
              i.point((v = b[o])[0], v[1]);
            return void i.lineEnd();
          }
          M[0] += 2e-6;
        }
        s.push(g = new No(v, b, null, !0)), l.push(g.o = new No(v, null, g, !1)), s.push(g = new No(M, b, null, !1)), l.push(g.o = new No(M, null, g, !0));
      }
    }), s.length) {
      for (l.sort(t), yh(s), yh(l), o = 0, a = l.length; o < a; ++o)
        l[o].e = n = !n;
      for (var u, c, d = s[0]; ; ) {
        for (var h = d, p = !0; h.v; )
          if ((h = h.n) === d)
            return;
        u = h.z, i.lineStart();
        do {
          if (h.v = h.o.v = !0, h.e) {
            if (p)
              for (o = 0, a = u.length; o < a; ++o)
                i.point((c = u[o])[0], c[1]);
            else
              r(h.x, h.n.x, 1, i);
            h = h.n;
          } else {
            if (p)
              for (u = h.p.z, o = u.length - 1; o >= 0; --o)
                i.point((c = u[o])[0], c[1]);
            else
              r(h.x, h.p.x, -1, i);
            h = h.p;
          }
          u = (h = h.o).z, p = !p;
        } while (!h.v);
        i.lineEnd();
      }
    }
  }
  function yh(e) {
    if (t = e.length) {
      for (var t, n, r = 0, i = e[0]; ++r < t; )
        i.n = n = e[r], n.p = i, i = n;
      i.n = n = e[0], n.p = i;
    }
  }
  function Us(e) {
    return ve(e[0]) <= pe ? e[0] : pt(e[0]) * ((ve(e[0]) + pe) % We - pe);
  }
  function _h(e, t) {
    var n = Us(t), r = t[1], i = J(r), o = [J(n), -ee(n), 0], a = 0, s = 0, l = new me();
    i === 1 ? r = Ae + ue : i === -1 && (r = -Ae - ue);
    for (var u = 0, c = e.length; u < c; ++u)
      if (h = (d = e[u]).length)
        for (var d, h, p = d[h - 1], b = Us(p), m = p[1] / 2 + co, g = J(m), v = ee(m), M = 0; M < h; ++M, b = y, g = S, v = O, p = _) {
          var _ = d[M], y = Us(_), E = _[1] / 2 + co, S = J(E), O = ee(E), j = y - b, z = j >= 0 ? 1 : -1, C = z * j, N = C > pe, P = g * S;
          if (l.add(Je(P * z * J(C), v * O + P * ee(C))), a += N ? j + z * We : j, N ^ b >= n ^ y >= n) {
            var T = lr(Nn(p), Nn(_));
            _o(T);
            var A = lr(o, T);
            _o(A);
            var $ = (N ^ j >= 0 ? -1 : 1) * Ke(A[2]);
            (r > $ || r === $ && (T[0] || T[1])) && (s += N ^ j >= 0 ? 1 : -1);
          }
        }
    return (a < -1e-6 || a < ue && l < -1e-12) ^ 1 & s;
  }
  function xh(e, t, n, r) {
    return function(i) {
      var o, a, s, l = t(i), u = vh(), c = t(u), d = !1, h = { point: p, lineStart: m, lineEnd: g, polygonStart: function() {
        h.point = v, h.lineStart = M, h.lineEnd = _, a = [], o = [];
      }, polygonEnd: function() {
        h.point = p, h.lineStart = m, h.lineEnd = g, a = Na(a);
        var y = _h(o, r);
        a.length ? (d || (i.polygonStart(), d = !0), bh(a, Wv, y, n, i)) : y && (d || (i.polygonStart(), d = !0), i.lineStart(), n(null, null, 1, i), i.lineEnd()), d && (i.polygonEnd(), d = !1), a = o = null;
      }, sphere: function() {
        i.polygonStart(), i.lineStart(), n(null, null, 1, i), i.lineEnd(), i.polygonEnd();
      } };
      function p(y, E) {
        e(y, E) && i.point(y, E);
      }
      function b(y, E) {
        l.point(y, E);
      }
      function m() {
        h.point = b, l.lineStart();
      }
      function g() {
        h.point = p, l.lineEnd();
      }
      function v(y, E) {
        s.push([y, E]), c.point(y, E);
      }
      function M() {
        c.lineStart(), s = [];
      }
      function _() {
        v(s[0][0], s[0][1]), c.lineEnd();
        var y, E, S, O, j = c.clean(), z = u.result(), C = z.length;
        if (s.pop(), o.push(s), s = null, C)
          if (1 & j) {
            if ((E = (S = z[0]).length - 1) > 0) {
              for (d || (i.polygonStart(), d = !0), i.lineStart(), y = 0; y < E; ++y)
                i.point((O = S[y])[0], O[1]);
              i.lineEnd();
            }
          } else
            C > 1 && 2 & j && z.push(z.pop().concat(z.shift())), a.push(z.filter(Zv));
      }
      return h;
    };
  }
  function Zv(e) {
    return e.length > 1;
  }
  function Wv(e, t) {
    return ((e = e.x)[0] < 0 ? e[1] - Ae - ue : Ae - e[1]) - ((t = t.x)[0] < 0 ? t[1] - Ae - ue : Ae - t[1]);
  }
  qs.invert = qs;
  var Ys = xh(function() {
    return !0;
  }, function(e) {
    var t, n = NaN, r = NaN, i = NaN;
    return { lineStart: function() {
      e.lineStart(), t = 1;
    }, point: function(o, a) {
      var s = o > 0 ? pe : -pe, l = ve(o - n);
      ve(l - pe) < ue ? (e.point(n, r = (r + a) / 2 > 0 ? Ae : -Ae), e.point(i, r), e.lineEnd(), e.lineStart(), e.point(s, r), e.point(o, r), t = 0) : i !== s && l >= pe && (ve(n - i) < ue && (n -= i * ue), ve(o - s) < ue && (o -= s * ue), r = function(u, c, d, h) {
        var p, b, m = J(u - d);
        return ve(m) > ue ? ar((J(c) * (b = ee(h)) * J(d) - J(h) * (p = ee(c)) * J(u)) / (p * b * m)) : (c + h) / 2;
      }(n, r, o, a), e.point(i, r), e.lineEnd(), e.lineStart(), e.point(s, r), t = 0), e.point(n = o, r = a), i = s;
    }, lineEnd: function() {
      e.lineEnd(), n = r = NaN;
    }, clean: function() {
      return 2 - t;
    } };
  }, function(e, t, n, r) {
    var i;
    if (e == null)
      i = n * Ae, r.point(-pe, i), r.point(0, i), r.point(pe, i), r.point(pe, 0), r.point(pe, -i), r.point(0, -i), r.point(-pe, -i), r.point(-pe, 0), r.point(-pe, i);
    else if (ve(e[0] - t[0]) > ue) {
      var o = e[0] < t[0] ? pe : -pe;
      i = n * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i);
    } else
      r.point(t[0], t[1]);
  }, [-pe, -Ae]);
  function wh(e) {
    var t = ee(e), n = 6 * le, r = t > 0, i = ve(t) > ue;
    function o(l, u) {
      return ee(l) * ee(u) > t;
    }
    function a(l, u, c) {
      var d = [1, 0, 0], h = lr(Nn(l), Nn(u)), p = bo(h, h), b = h[0], m = p - b * b;
      if (!m)
        return !c && l;
      var g = t * p / m, v = -t * b / m, M = lr(d, h), _ = yo(d, g);
      $s(_, yo(h, v));
      var y = M, E = bo(_, y), S = bo(y, y), O = E * E - S * (bo(_, _) - 1);
      if (!(O < 0)) {
        var j = Ie(O), z = yo(y, (-E - j) / S);
        if ($s(z, _), z = vo(z), !c)
          return z;
        var C, N = l[0], P = u[0], T = l[1], A = u[1];
        P < N && (C = N, N = P, P = C);
        var $ = P - N, I = ve($ - pe) < ue;
        if (!I && A < T && (C = T, T = A, A = C), I || $ < ue ? I ? T + A > 0 ^ z[1] < (ve(z[0] - N) < ue ? T : A) : T <= z[1] && z[1] <= A : $ > pe ^ (N <= z[0] && z[0] <= P)) {
          var D = yo(y, (-E + j) / S);
          return $s(D, _), [z, vo(D)];
        }
      }
    }
    function s(l, u) {
      var c = r ? e : pe - e, d = 0;
      return l < -c ? d |= 1 : l > c && (d |= 2), u < -c ? d |= 4 : u > c && (d |= 8), d;
    }
    return xh(o, function(l) {
      var u, c, d, h, p;
      return { lineStart: function() {
        h = d = !1, p = 1;
      }, point: function(b, m) {
        var g, v = [b, m], M = o(b, m), _ = r ? M ? 0 : s(b, m) : M ? s(b + (b < 0 ? pe : -pe), m) : 0;
        if (!u && (h = d = M) && l.lineStart(), M !== d && (!(g = a(u, v)) || Ao(u, g) || Ao(v, g)) && (v[2] = 1), M !== d)
          p = 0, M ? (l.lineStart(), g = a(v, u), l.point(g[0], g[1])) : (g = a(u, v), l.point(g[0], g[1], 2), l.lineEnd()), u = g;
        else if (i && u && r ^ M) {
          var y;
          _ & c || !(y = a(v, u, !0)) || (p = 0, r ? (l.lineStart(), l.point(y[0][0], y[0][1]), l.point(y[1][0], y[1][1]), l.lineEnd()) : (l.point(y[1][0], y[1][1]), l.lineEnd(), l.lineStart(), l.point(y[0][0], y[0][1], 3)));
        }
        !M || u && Ao(u, v) || l.point(v[0], v[1]), u = v, d = M, c = _;
      }, lineEnd: function() {
        d && l.lineEnd(), u = null;
      }, clean: function() {
        return p | (h && d) << 1;
      } };
    }, function(l, u, c, d) {
      gh(d, e, n, c, l, u);
    }, r ? [0, -e] : [-pe, e - pe]);
  }
  var Hs, Vs, Co, zo, Yr = 1e9, Lo = -Yr;
  function Po(e, t, n, r) {
    function i(u, c) {
      return e <= u && u <= n && t <= c && c <= r;
    }
    function o(u, c, d, h) {
      var p = 0, b = 0;
      if (u == null || (p = a(u, d)) !== (b = a(c, d)) || l(u, c) < 0 ^ d > 0)
        do
          h.point(p === 0 || p === 3 ? e : n, p > 1 ? r : t);
        while ((p = (p + d + 4) % 4) !== b);
      else
        h.point(c[0], c[1]);
    }
    function a(u, c) {
      return ve(u[0] - e) < ue ? c > 0 ? 0 : 3 : ve(u[0] - n) < ue ? c > 0 ? 2 : 1 : ve(u[1] - t) < ue ? c > 0 ? 1 : 0 : c > 0 ? 3 : 2;
    }
    function s(u, c) {
      return l(u.x, c.x);
    }
    function l(u, c) {
      var d = a(u, 1), h = a(c, 1);
      return d !== h ? d - h : d === 0 ? c[1] - u[1] : d === 1 ? u[0] - c[0] : d === 2 ? u[1] - c[1] : c[0] - u[0];
    }
    return function(u) {
      var c, d, h, p, b, m, g, v, M, _, y, E = u, S = vh(), O = { point: j, lineStart: function() {
        O.point = z, d && d.push(h = []), _ = !0, M = !1, g = v = NaN;
      }, lineEnd: function() {
        c && (z(p, b), m && M && S.rejoin(), c.push(S.result())), O.point = j, M && E.lineEnd();
      }, polygonStart: function() {
        E = S, c = [], d = [], y = !0;
      }, polygonEnd: function() {
        var C = function() {
          for (var T = 0, A = 0, $ = d.length; A < $; ++A)
            for (var I, D, B = d[A], H = 1, Z = B.length, V = B[0], ae = V[0], se = V[1]; H < Z; ++H)
              I = ae, D = se, ae = (V = B[H])[0], se = V[1], D <= r ? se > r && (ae - I) * (r - D) > (se - D) * (e - I) && ++T : se <= r && (ae - I) * (r - D) < (se - D) * (e - I) && --T;
          return T;
        }(), N = y && C, P = (c = Na(c)).length;
        (N || P) && (u.polygonStart(), N && (u.lineStart(), o(null, null, 1, u), u.lineEnd()), P && bh(c, s, C, o, u), u.polygonEnd()), E = u, c = d = h = null;
      } };
      function j(C, N) {
        i(C, N) && E.point(C, N);
      }
      function z(C, N) {
        var P = i(C, N);
        if (d && h.push([C, N]), _)
          p = C, b = N, m = P, _ = !1, P && (E.lineStart(), E.point(C, N));
        else if (P && M)
          E.point(C, N);
        else {
          var T = [g = Math.max(Lo, Math.min(Yr, g)), v = Math.max(Lo, Math.min(Yr, v))], A = [C = Math.max(Lo, Math.min(Yr, C)), N = Math.max(Lo, Math.min(Yr, N))];
          (function($, I, D, B, H, Z) {
            var V, ae = $[0], se = $[1], K = 0, te = 1, ye = I[0] - ae, he = I[1] - se;
            if (V = D - ae, ye || !(V > 0)) {
              if (V /= ye, ye < 0) {
                if (V < K)
                  return;
                V < te && (te = V);
              } else if (ye > 0) {
                if (V > te)
                  return;
                V > K && (K = V);
              }
              if (V = H - ae, ye || !(V < 0)) {
                if (V /= ye, ye < 0) {
                  if (V > te)
                    return;
                  V > K && (K = V);
                } else if (ye > 0) {
                  if (V < K)
                    return;
                  V < te && (te = V);
                }
                if (V = B - se, he || !(V > 0)) {
                  if (V /= he, he < 0) {
                    if (V < K)
                      return;
                    V < te && (te = V);
                  } else if (he > 0) {
                    if (V > te)
                      return;
                    V > K && (K = V);
                  }
                  if (V = Z - se, he || !(V < 0)) {
                    if (V /= he, he < 0) {
                      if (V > te)
                        return;
                      V > K && (K = V);
                    } else if (he > 0) {
                      if (V < K)
                        return;
                      V < te && (te = V);
                    }
                    return K > 0 && ($[0] = ae + K * ye, $[1] = se + K * he), te < 1 && (I[0] = ae + te * ye, I[1] = se + te * he), !0;
                  }
                }
              }
            }
          })(T, A, e, t, n, r) ? (M || (E.lineStart(), E.point(T[0], T[1])), E.point(A[0], A[1]), P || E.lineEnd(), y = !1) : P && (E.lineStart(), E.point(C, N), y = !1);
        }
        g = C, v = N, M = P;
      }
      return O;
    };
  }
  var cr = { sphere: Te, point: Te, lineStart: function() {
    cr.point = Kv, cr.lineEnd = Jv;
  }, lineEnd: Te, polygonStart: Te, polygonEnd: Te };
  function Jv() {
    cr.point = cr.lineEnd = Te;
  }
  function Kv(e, t) {
    Vs = e *= le, Co = J(t *= le), zo = ee(t), cr.point = Qv;
  }
  function Qv(e, t) {
    e *= le;
    var n = J(t *= le), r = ee(t), i = ve(e - Vs), o = ee(i), a = r * J(i), s = zo * n - Co * r * o, l = Co * n + zo * r * o;
    Hs.add(Je(Ie(a * a + s * s), l)), Vs = e, Co = n, zo = r;
  }
  function Mh(e) {
    return Hs = new me(), wt(e, cr), +Hs;
  }
  var Gs = [null, null], eb = { type: "LineString", coordinates: Gs };
  function $o(e, t) {
    return Gs[0] = e, Gs[1] = t, Mh(eb);
  }
  var Eh = { Feature: function(e, t) {
    return Oo(e.geometry, t);
  }, FeatureCollection: function(e, t) {
    for (var n = e.features, r = -1, i = n.length; ++r < i; )
      if (Oo(n[r].geometry, t))
        return !0;
    return !1;
  } }, Sh = { Sphere: function() {
    return !0;
  }, Point: function(e, t) {
    return Th(e.coordinates, t);
  }, MultiPoint: function(e, t) {
    for (var n = e.coordinates, r = -1, i = n.length; ++r < i; )
      if (Th(n[r], t))
        return !0;
    return !1;
  }, LineString: function(e, t) {
    return kh(e.coordinates, t);
  }, MultiLineString: function(e, t) {
    for (var n = e.coordinates, r = -1, i = n.length; ++r < i; )
      if (kh(n[r], t))
        return !0;
    return !1;
  }, Polygon: function(e, t) {
    return Ah(e.coordinates, t);
  }, MultiPolygon: function(e, t) {
    for (var n = e.coordinates, r = -1, i = n.length; ++r < i; )
      if (Ah(n[r], t))
        return !0;
    return !1;
  }, GeometryCollection: function(e, t) {
    for (var n = e.geometries, r = -1, i = n.length; ++r < i; )
      if (Oo(n[r], t))
        return !0;
    return !1;
  } };
  function Oo(e, t) {
    return !(!e || !Sh.hasOwnProperty(e.type)) && Sh[e.type](e, t);
  }
  function Th(e, t) {
    return $o(e, t) === 0;
  }
  function kh(e, t) {
    for (var n, r, i, o = 0, a = e.length; o < a; o++) {
      if ((r = $o(e[o], t)) === 0 || o > 0 && (i = $o(e[o], e[o - 1])) > 0 && n <= i && r <= i && (n + r - i) * (1 - Math.pow((n - r) / i, 2)) < uo * i)
        return !0;
      n = r;
    }
    return !1;
  }
  function Ah(e, t) {
    return !!_h(e.map(tb), Nh(t));
  }
  function tb(e) {
    return (e = e.map(Nh)).pop(), e;
  }
  function Nh(e) {
    return [e[0] * le, e[1] * le];
  }
  function Ch(e, t, n) {
    var r = It(e, t - ue, n).concat(t);
    return function(i) {
      return r.map(function(o) {
        return [i, o];
      });
    };
  }
  function zh(e, t, n) {
    var r = It(e, t - ue, n).concat(t);
    return function(i) {
      return r.map(function(o) {
        return [o, i];
      });
    };
  }
  function Lh() {
    var e, t, n, r, i, o, a, s, l, u, c, d, h = 10, p = h, b = 90, m = 360, g = 2.5;
    function v() {
      return { type: "MultiLineString", coordinates: M() };
    }
    function M() {
      return It(fo(r / b) * b, n, b).map(c).concat(It(fo(s / m) * m, a, m).map(d)).concat(It(fo(t / h) * h, e, h).filter(function(_) {
        return ve(_ % b) > ue;
      }).map(l)).concat(It(fo(o / p) * p, i, p).filter(function(_) {
        return ve(_ % m) > ue;
      }).map(u));
    }
    return v.lines = function() {
      return M().map(function(_) {
        return { type: "LineString", coordinates: _ };
      });
    }, v.outline = function() {
      return { type: "Polygon", coordinates: [c(r).concat(d(a).slice(1), c(n).reverse().slice(1), d(s).reverse().slice(1))] };
    }, v.extent = function(_) {
      return arguments.length ? v.extentMajor(_).extentMinor(_) : v.extentMinor();
    }, v.extentMajor = function(_) {
      return arguments.length ? (r = +_[0][0], n = +_[1][0], s = +_[0][1], a = +_[1][1], r > n && (_ = r, r = n, n = _), s > a && (_ = s, s = a, a = _), v.precision(g)) : [[r, s], [n, a]];
    }, v.extentMinor = function(_) {
      return arguments.length ? (t = +_[0][0], e = +_[1][0], o = +_[0][1], i = +_[1][1], t > e && (_ = t, t = e, e = _), o > i && (_ = o, o = i, i = _), v.precision(g)) : [[t, o], [e, i]];
    }, v.step = function(_) {
      return arguments.length ? v.stepMajor(_).stepMinor(_) : v.stepMinor();
    }, v.stepMajor = function(_) {
      return arguments.length ? (b = +_[0], m = +_[1], v) : [b, m];
    }, v.stepMinor = function(_) {
      return arguments.length ? (h = +_[0], p = +_[1], v) : [h, p];
    }, v.precision = function(_) {
      return arguments.length ? (g = +_, l = Ch(o, i, 90), u = zh(t, e, g), c = Ch(s, a, 90), d = zh(r, n, g), v) : g;
    }, v.extentMajor([[-180, -89.999999], [180, 89.999999]]).extentMinor([[-180, -80.000001], [180, 80.000001]]);
  }
  var Ph, $h, Xs, Zs, Hr = (e) => e, Ws = new me(), Js = new me(), Qt = { point: Te, lineStart: Te, lineEnd: Te, polygonStart: function() {
    Qt.lineStart = nb, Qt.lineEnd = ib;
  }, polygonEnd: function() {
    Qt.lineStart = Qt.lineEnd = Qt.point = Te, Ws.add(ve(Js)), Js = new me();
  }, result: function() {
    var e = Ws / 2;
    return Ws = new me(), e;
  } };
  function nb() {
    Qt.point = rb;
  }
  function rb(e, t) {
    Qt.point = Oh, Ph = Xs = e, $h = Zs = t;
  }
  function Oh(e, t) {
    Js.add(Zs * e - Xs * t), Xs = e, Zs = t;
  }
  function ib() {
    Oh(Ph, $h);
  }
  var Ih = Qt, fr = 1 / 0, Io = fr, Vr = -fr, Ro = Vr, ob = { point: function(e, t) {
    e < fr && (fr = e), e > Vr && (Vr = e), t < Io && (Io = t), t > Ro && (Ro = t);
  }, lineStart: Te, lineEnd: Te, polygonStart: Te, polygonEnd: Te, result: function() {
    var e = [[fr, Io], [Vr, Ro]];
    return Vr = Ro = -(Io = fr = 1 / 0), e;
  } }, Rh, Fh, zt, Lt, Fo = ob, Ks = 0, Qs = 0, Gr = 0, jo = 0, Do = 0, hr = 0, el = 0, tl = 0, Xr = 0, Et = { point: Cn, lineStart: jh, lineEnd: Dh, polygonStart: function() {
    Et.lineStart = lb, Et.lineEnd = ub;
  }, polygonEnd: function() {
    Et.point = Cn, Et.lineStart = jh, Et.lineEnd = Dh;
  }, result: function() {
    var e = Xr ? [el / Xr, tl / Xr] : hr ? [jo / hr, Do / hr] : Gr ? [Ks / Gr, Qs / Gr] : [NaN, NaN];
    return Ks = Qs = Gr = jo = Do = hr = el = tl = Xr = 0, e;
  } };
  function Cn(e, t) {
    Ks += e, Qs += t, ++Gr;
  }
  function jh() {
    Et.point = ab;
  }
  function ab(e, t) {
    Et.point = sb, Cn(zt = e, Lt = t);
  }
  function sb(e, t) {
    var n = e - zt, r = t - Lt, i = Ie(n * n + r * r);
    jo += i * (zt + e) / 2, Do += i * (Lt + t) / 2, hr += i, Cn(zt = e, Lt = t);
  }
  function Dh() {
    Et.point = Cn;
  }
  function lb() {
    Et.point = cb;
  }
  function ub() {
    qh(Rh, Fh);
  }
  function cb(e, t) {
    Et.point = qh, Cn(Rh = zt = e, Fh = Lt = t);
  }
  function qh(e, t) {
    var n = e - zt, r = t - Lt, i = Ie(n * n + r * r);
    jo += i * (zt + e) / 2, Do += i * (Lt + t) / 2, hr += i, el += (i = Lt * e - zt * t) * (zt + e), tl += i * (Lt + t), Xr += 3 * i, Cn(zt = e, Lt = t);
  }
  var Bh = Et;
  function Uh(e) {
    this._context = e;
  }
  Uh.prototype = { _radius: 4.5, pointRadius: function(e) {
    return this._radius = e, this;
  }, polygonStart: function() {
    this._line = 0;
  }, polygonEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._point = 0;
  }, lineEnd: function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  }, point: function(e, t) {
    switch (this._point) {
      case 0:
        this._context.moveTo(e, t), this._point = 1;
        break;
      case 1:
        this._context.lineTo(e, t);
        break;
      default:
        this._context.moveTo(e + this._radius, t), this._context.arc(e, t, this._radius, 0, We);
    }
  }, result: Te };
  var nl, Yh, Hh, Zr, Wr, rl = new me(), qo = { point: Te, lineStart: function() {
    qo.point = fb;
  }, lineEnd: function() {
    nl && Vh(Yh, Hh), qo.point = Te;
  }, polygonStart: function() {
    nl = !0;
  }, polygonEnd: function() {
    nl = null;
  }, result: function() {
    var e = +rl;
    return rl = new me(), e;
  } };
  function fb(e, t) {
    qo.point = Vh, Yh = Zr = e, Hh = Wr = t;
  }
  function Vh(e, t) {
    Zr -= e, Wr -= t, rl.add(Ie(Zr * Zr + Wr * Wr)), Zr = e, Wr = t;
  }
  var Gh = qo;
  function Xh() {
    this._string = [];
  }
  function Zh(e) {
    return "m0," + e + "a" + e + "," + e + " 0 1,1 0," + -2 * e + "a" + e + "," + e + " 0 1,1 0," + 2 * e + "z";
  }
  function Jr(e) {
    return function(t) {
      var n = new il();
      for (var r in e)
        n[r] = e[r];
      return n.stream = t, n;
    };
  }
  function il() {
  }
  function ol(e, t, n) {
    var r = e.clipExtent && e.clipExtent();
    return e.scale(150).translate([0, 0]), r != null && e.clipExtent(null), wt(n, e.stream(Fo)), t(Fo.result()), r != null && e.clipExtent(r), e;
  }
  function Bo(e, t, n) {
    return ol(e, function(r) {
      var i = t[1][0] - t[0][0], o = t[1][1] - t[0][1], a = Math.min(i / (r[1][0] - r[0][0]), o / (r[1][1] - r[0][1])), s = +t[0][0] + (i - a * (r[1][0] + r[0][0])) / 2, l = +t[0][1] + (o - a * (r[1][1] + r[0][1])) / 2;
      e.scale(150 * a).translate([s, l]);
    }, n);
  }
  function al(e, t, n) {
    return Bo(e, [[0, 0], t], n);
  }
  function sl(e, t, n) {
    return ol(e, function(r) {
      var i = +t, o = i / (r[1][0] - r[0][0]), a = (i - o * (r[1][0] + r[0][0])) / 2, s = -o * r[0][1];
      e.scale(150 * o).translate([a, s]);
    }, n);
  }
  function ll(e, t, n) {
    return ol(e, function(r) {
      var i = +t, o = i / (r[1][1] - r[0][1]), a = -o * r[0][0], s = (i - o * (r[1][1] + r[0][1])) / 2;
      e.scale(150 * o).translate([a, s]);
    }, n);
  }
  Xh.prototype = { _radius: 4.5, _circle: Zh(4.5), pointRadius: function(e) {
    return (e = +e) !== this._radius && (this._radius = e, this._circle = null), this;
  }, polygonStart: function() {
    this._line = 0;
  }, polygonEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._point = 0;
  }, lineEnd: function() {
    this._line === 0 && this._string.push("Z"), this._point = NaN;
  }, point: function(e, t) {
    switch (this._point) {
      case 0:
        this._string.push("M", e, ",", t), this._point = 1;
        break;
      case 1:
        this._string.push("L", e, ",", t);
        break;
      default:
        this._circle == null && (this._circle = Zh(this._radius)), this._string.push("M", e, ",", t, this._circle);
    }
  }, result: function() {
    if (this._string.length) {
      var e = this._string.join("");
      return this._string = [], e;
    }
    return null;
  } }, il.prototype = { constructor: il, point: function(e, t) {
    this.stream.point(e, t);
  }, sphere: function() {
    this.stream.sphere();
  }, lineStart: function() {
    this.stream.lineStart();
  }, lineEnd: function() {
    this.stream.lineEnd();
  }, polygonStart: function() {
    this.stream.polygonStart();
  }, polygonEnd: function() {
    this.stream.polygonEnd();
  } };
  var hb = ee(30 * le);
  function Wh(e, t) {
    return +t ? /* @__PURE__ */ function(n, r) {
      function i(o, a, s, l, u, c, d, h, p, b, m, g, v, M) {
        var _ = d - o, y = h - a, E = _ * _ + y * y;
        if (E > 4 * r && v--) {
          var S = l + b, O = u + m, j = c + g, z = Ie(S * S + O * O + j * j), C = Ke(j /= z), N = ve(ve(j) - 1) < ue || ve(s - p) < ue ? (s + p) / 2 : Je(O, S), P = n(N, C), T = P[0], A = P[1], $ = T - o, I = A - a, D = y * $ - _ * I;
          (D * D / E > r || ve((_ * $ + y * I) / E - 0.5) > 0.3 || l * b + u * m + c * g < hb) && (i(o, a, s, l, u, c, T, A, N, S /= z, O /= z, j, v, M), M.point(T, A), i(T, A, N, S, O, j, d, h, p, b, m, g, v, M));
        }
      }
      return function(o) {
        var a, s, l, u, c, d, h, p, b, m, g, v, M = { point: _, lineStart: y, lineEnd: S, polygonStart: function() {
          o.polygonStart(), M.lineStart = O;
        }, polygonEnd: function() {
          o.polygonEnd(), M.lineStart = y;
        } };
        function _(C, N) {
          C = n(C, N), o.point(C[0], C[1]);
        }
        function y() {
          p = NaN, M.point = E, o.lineStart();
        }
        function E(C, N) {
          var P = Nn([C, N]), T = n(C, N);
          i(p, b, h, m, g, v, p = T[0], b = T[1], h = C, m = P[0], g = P[1], v = P[2], 16, o), o.point(p, b);
        }
        function S() {
          M.point = _, o.lineEnd();
        }
        function O() {
          y(), M.point = j, M.lineEnd = z;
        }
        function j(C, N) {
          E(a = C, N), s = p, l = b, u = m, c = g, d = v, M.point = E;
        }
        function z() {
          i(p, b, h, m, g, v, s, l, a, u, c, d, 16, o), M.lineEnd = S, S();
        }
        return M;
      };
    }(e, t) : function(n) {
      return Jr({ point: function(r, i) {
        r = n(r, i), this.stream.point(r[0], r[1]);
      } });
    }(e);
  }
  var db = Jr({ point: function(e, t) {
    this.stream.point(e * le, t * le);
  } });
  function Jh(e, t, n, r, i, o) {
    if (!o)
      return function(m, g, v, M, _) {
        function y(E, S) {
          return [g + m * (E *= M), v - m * (S *= _)];
        }
        return y.invert = function(E, S) {
          return [(E - g) / m * M, (v - S) / m * _];
        }, y;
      }(e, t, n, r, i);
    var a = ee(o), s = J(o), l = a * e, u = s * e, c = a / e, d = s / e, h = (s * n - a * t) / e, p = (s * t + a * n) / e;
    function b(m, g) {
      return [l * (m *= r) - u * (g *= i) + t, n - u * m - l * g];
    }
    return b.invert = function(m, g) {
      return [r * (c * m - d * g + h), i * (p - d * m - c * g)];
    }, b;
  }
  function Pt(e) {
    return ul(function() {
      return e;
    })();
  }
  function ul(e) {
    var t, n, r, i, o, a, s, l, u, c, d = 150, h = 480, p = 250, b = 0, m = 0, g = 0, v = 0, M = 0, _ = 0, y = 1, E = 1, S = null, O = Ys, j = null, z = Hr, C = 0.5;
    function N($) {
      return l($[0] * le, $[1] * le);
    }
    function P($) {
      return ($ = l.invert($[0], $[1])) && [$[0] * Me, $[1] * Me];
    }
    function T() {
      var $ = Jh(d, 0, 0, y, E, _).apply(null, t(b, m)), I = Jh(d, h - $[0], p - $[1], y, E, _);
      return n = Bs(g, v, M), s = Ds(t, I), l = Ds(n, s), a = Wh(s, C), A();
    }
    function A() {
      return u = c = null, N;
    }
    return N.stream = function($) {
      return u && c === $ ? u : u = db(function(I) {
        return Jr({ point: function(D, B) {
          var H = I(D, B);
          return this.stream.point(H[0], H[1]);
        } });
      }(n)(O(a(z(c = $)))));
    }, N.preclip = function($) {
      return arguments.length ? (O = $, S = void 0, A()) : O;
    }, N.postclip = function($) {
      return arguments.length ? (z = $, j = r = i = o = null, A()) : z;
    }, N.clipAngle = function($) {
      return arguments.length ? (O = +$ ? wh(S = $ * le) : (S = null, Ys), A()) : S * Me;
    }, N.clipExtent = function($) {
      return arguments.length ? (z = $ == null ? (j = r = i = o = null, Hr) : Po(j = +$[0][0], r = +$[0][1], i = +$[1][0], o = +$[1][1]), A()) : j == null ? null : [[j, r], [i, o]];
    }, N.scale = function($) {
      return arguments.length ? (d = +$, T()) : d;
    }, N.translate = function($) {
      return arguments.length ? (h = +$[0], p = +$[1], T()) : [h, p];
    }, N.center = function($) {
      return arguments.length ? (b = $[0] % 360 * le, m = $[1] % 360 * le, T()) : [b * Me, m * Me];
    }, N.rotate = function($) {
      return arguments.length ? (g = $[0] % 360 * le, v = $[1] % 360 * le, M = $.length > 2 ? $[2] % 360 * le : 0, T()) : [g * Me, v * Me, M * Me];
    }, N.angle = function($) {
      return arguments.length ? (_ = $ % 360 * le, T()) : _ * Me;
    }, N.reflectX = function($) {
      return arguments.length ? (y = $ ? -1 : 1, T()) : y < 0;
    }, N.reflectY = function($) {
      return arguments.length ? (E = $ ? -1 : 1, T()) : E < 0;
    }, N.precision = function($) {
      return arguments.length ? (a = Wh(s, C = $ * $), A()) : Ie(C);
    }, N.fitExtent = function($, I) {
      return Bo(N, $, I);
    }, N.fitSize = function($, I) {
      return al(N, $, I);
    }, N.fitWidth = function($, I) {
      return sl(N, $, I);
    }, N.fitHeight = function($, I) {
      return ll(N, $, I);
    }, function() {
      return t = e.apply(this, arguments), N.invert = t.invert && P, T();
    };
  }
  function cl(e) {
    var t = 0, n = pe / 3, r = ul(e), i = r(t, n);
    return i.parallels = function(o) {
      return arguments.length ? r(t = o[0] * le, n = o[1] * le) : [t * Me, n * Me];
    }, i;
  }
  function Kh(e, t) {
    var n = J(e), r = (n + J(t)) / 2;
    if (ve(r) < ue)
      return function(s) {
        var l = ee(s);
        function u(c, d) {
          return [c * l, J(d) / l];
        }
        return u.invert = function(c, d) {
          return [c / l, Ke(d * l)];
        }, u;
      }(e);
    var i = 1 + n * (2 * r - n), o = Ie(i) / r;
    function a(s, l) {
      var u = Ie(i - 2 * r * J(l)) / r;
      return [u * J(s *= r), o - u * ee(s)];
    }
    return a.invert = function(s, l) {
      var u = o - l, c = Je(s, ve(u)) * pt(u);
      return u * r < 0 && (c -= pe * pt(s) * pt(u)), [c / r, Ke((i - (s * s + u * u) * r * r) / (2 * r))];
    }, a;
  }
  function Uo() {
    return cl(Kh).scale(155.424).center([0, 33.6442]);
  }
  function Qh() {
    return Uo().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
  }
  function ed(e) {
    return function(t, n) {
      var r = ee(t), i = ee(n), o = e(r * i);
      return o === 1 / 0 ? [2, 0] : [o * i * J(t), o * J(n)];
    };
  }
  function Kr(e) {
    return function(t, n) {
      var r = Ie(t * t + n * n), i = e(r), o = J(i), a = ee(i);
      return [Je(t * o, r * a), Ke(r && n * o / r)];
    };
  }
  var fl = ed(function(e) {
    return Ie(2 / (1 + e));
  });
  fl.invert = Kr(function(e) {
    return 2 * Ke(e / 2);
  });
  var hl = ed(function(e) {
    return (e = Hf(e)) && e / J(e);
  });
  function Qr(e, t) {
    return [e, ho(Ns((Ae + t) / 2))];
  }
  function td(e) {
    var t, n, r, i = Pt(e), o = i.center, a = i.scale, s = i.translate, l = i.clipExtent, u = null;
    function c() {
      var d = pe * a(), h = i(ph(i.rotate()).invert([0, 0]));
      return l(u == null ? [[h[0] - d, h[1] - d], [h[0] + d, h[1] + d]] : e === Qr ? [[Math.max(h[0] - d, u), t], [Math.min(h[0] + d, n), r]] : [[u, Math.max(h[1] - d, t)], [n, Math.min(h[1] + d, r)]]);
    }
    return i.scale = function(d) {
      return arguments.length ? (a(d), c()) : a();
    }, i.translate = function(d) {
      return arguments.length ? (s(d), c()) : s();
    }, i.center = function(d) {
      return arguments.length ? (o(d), c()) : o();
    }, i.clipExtent = function(d) {
      return arguments.length ? (d == null ? u = t = n = r = null : (u = +d[0][0], t = +d[0][1], n = +d[1][0], r = +d[1][1]), c()) : u == null ? null : [[u, t], [n, r]];
    }, c();
  }
  function Yo(e) {
    return Ns((Ae + e) / 2);
  }
  function nd(e, t) {
    var n = ee(e), r = e === t ? J(e) : ho(n / ee(t)) / ho(Yo(t) / Yo(e)), i = n * As(Yo(e), r) / r;
    if (!r)
      return Qr;
    function o(a, s) {
      i > 0 ? s < -Ae + ue && (s = -Ae + ue) : s > Ae - ue && (s = Ae - ue);
      var l = i / As(Yo(s), r);
      return [l * J(r * a), i - l * ee(r * a)];
    }
    return o.invert = function(a, s) {
      var l = i - s, u = pt(r) * Ie(a * a + l * l), c = Je(a, ve(l)) * pt(l);
      return l * r < 0 && (c -= pe * pt(a) * pt(l)), [c / r, 2 * ar(As(i / u, 1 / r)) - Ae];
    }, o;
  }
  function ei(e, t) {
    return [e, t];
  }
  function rd(e, t) {
    var n = ee(e), r = e === t ? J(e) : (n - ee(t)) / (t - e), i = n / r + e;
    if (ve(r) < ue)
      return ei;
    function o(a, s) {
      var l = i - s, u = r * a;
      return [l * J(u), i - l * ee(u)];
    }
    return o.invert = function(a, s) {
      var l = i - s, u = Je(a, ve(l)) * pt(l);
      return l * r < 0 && (u -= pe * pt(a) * pt(l)), [u / r, i - pt(r) * Ie(a * a + l * l)];
    }, o;
  }
  hl.invert = Kr(function(e) {
    return e;
  }), Qr.invert = function(e, t) {
    return [e, 2 * ar(Yf(t)) - Ae];
  }, ei.invert = ei;
  var ti = 1.340264, ni = -0.081106, ri = 893e-6, ii = 3796e-6, Ho = Ie(3) / 2;
  function dl(e, t) {
    var n = Ke(Ho * J(t)), r = n * n, i = r * r * r;
    return [e * ee(n) / (Ho * (ti + 3 * ni * r + i * (7 * ri + 9 * ii * r))), n * (ti + ni * r + i * (ri + ii * r))];
  }
  function pl(e, t) {
    var n = ee(t), r = ee(e) * n;
    return [n * J(e) / r, J(t) / r];
  }
  function gl(e, t) {
    var n = t * t, r = n * n;
    return [e * (0.8707 - 0.131979 * n + r * (r * (3971e-6 * n - 1529e-6 * r) - 0.013791)), t * (1.007226 + n * (0.015085 + r * (0.028874 * n - 0.044475 - 5916e-6 * r)))];
  }
  function ml(e, t) {
    return [ee(t) * J(e), J(t)];
  }
  function vl(e, t) {
    var n = ee(t), r = 1 + ee(e) * n;
    return [n * J(e) / r, J(t) / r];
  }
  function bl(e, t) {
    return [ho(Ns((Ae + t) / 2)), -e];
  }
  function pb(e, t) {
    return e.parent === t.parent ? 1 : 2;
  }
  function gb(e, t) {
    return e + t.x;
  }
  function mb(e, t) {
    return Math.max(e, t.y);
  }
  function vb(e) {
    var t = 0, n = e.children, r = n && n.length;
    if (r)
      for (; --r >= 0; )
        t += n[r].value;
    else
      t = 1;
    e.value = t;
  }
  function yl(e, t) {
    e instanceof Map ? (e = [void 0, e], t === void 0 && (t = yb)) : t === void 0 && (t = bb);
    for (var n, r, i, o, a, s = new zn(e), l = [s]; n = l.pop(); )
      if ((i = t(n.data)) && (a = (i = Array.from(i)).length))
        for (n.children = i, o = a - 1; o >= 0; --o)
          l.push(r = i[o] = new zn(i[o])), r.parent = n, r.depth = n.depth + 1;
    return s.eachBefore(id);
  }
  function bb(e) {
    return e.children;
  }
  function yb(e) {
    return Array.isArray(e) ? e[1] : null;
  }
  function _b(e) {
    e.data.value !== void 0 && (e.value = e.data.value), e.data = e.data.data;
  }
  function id(e) {
    var t = 0;
    do
      e.height = t;
    while ((e = e.parent) && e.height < ++t);
  }
  function zn(e) {
    this.data = e, this.depth = this.height = 0, this.parent = null;
  }
  function Vo(e) {
    return e == null ? null : od(e);
  }
  function od(e) {
    if (typeof e != "function")
      throw new Error();
    return e;
  }
  function Ln() {
    return 0;
  }
  function dr(e) {
    return function() {
      return e;
    };
  }
  dl.invert = function(e, t) {
    for (var n, r = t, i = r * r, o = i * i * i, a = 0; a < 12 && (o = (i = (r -= n = (r * (ti + ni * i + o * (ri + ii * i)) - t) / (ti + 3 * ni * i + o * (7 * ri + 9 * ii * i))) * r) * i * i, !(ve(n) < uo)); ++a)
      ;
    return [Ho * e * (ti + 3 * ni * i + o * (7 * ri + 9 * ii * i)) / ee(r), Ke(J(r) / Ho)];
  }, pl.invert = Kr(ar), gl.invert = function(e, t) {
    var n, r = t, i = 25;
    do {
      var o = r * r, a = o * o;
      r -= n = (r * (1.007226 + o * (0.015085 + a * (0.028874 * o - 0.044475 - 5916e-6 * a))) - t) / (1.007226 + o * (0.045255 + a * (0.259866 * o - 0.311325 - 5916e-6 * 11 * a)));
    } while (ve(n) > ue && --i > 0);
    return [e / (0.8707 + (o = r * r) * (o * (o * o * o * (3971e-6 - 1529e-6 * o) - 0.013791) - 0.131979)), r];
  }, ml.invert = Kr(Ke), vl.invert = Kr(function(e) {
    return 2 * ar(e);
  }), bl.invert = function(e, t) {
    return [-t, 2 * ar(Yf(e)) - Ae];
  }, zn.prototype = yl.prototype = { constructor: zn, count: function() {
    return this.eachAfter(vb);
  }, each: function(e, t) {
    let n = -1;
    for (const r of this)
      e.call(t, r, ++n, this);
    return this;
  }, eachAfter: function(e, t) {
    for (var n, r, i, o = this, a = [o], s = [], l = -1; o = a.pop(); )
      if (s.push(o), n = o.children)
        for (r = 0, i = n.length; r < i; ++r)
          a.push(n[r]);
    for (; o = s.pop(); )
      e.call(t, o, ++l, this);
    return this;
  }, eachBefore: function(e, t) {
    for (var n, r, i = this, o = [i], a = -1; i = o.pop(); )
      if (e.call(t, i, ++a, this), n = i.children)
        for (r = n.length - 1; r >= 0; --r)
          o.push(n[r]);
    return this;
  }, find: function(e, t) {
    let n = -1;
    for (const r of this)
      if (e.call(t, r, ++n, this))
        return r;
  }, sum: function(e) {
    return this.eachAfter(function(t) {
      for (var n = +e(t.data) || 0, r = t.children, i = r && r.length; --i >= 0; )
        n += r[i].value;
      t.value = n;
    });
  }, sort: function(e) {
    return this.eachBefore(function(t) {
      t.children && t.children.sort(e);
    });
  }, path: function(e) {
    for (var t = this, n = function(o, a) {
      if (o === a)
        return o;
      var s = o.ancestors(), l = a.ancestors(), u = null;
      for (o = s.pop(), a = l.pop(); o === a; )
        u = o, o = s.pop(), a = l.pop();
      return u;
    }(t, e), r = [t]; t !== n; )
      t = t.parent, r.push(t);
    for (var i = r.length; e !== n; )
      r.splice(i, 0, e), e = e.parent;
    return r;
  }, ancestors: function() {
    for (var e = this, t = [e]; e = e.parent; )
      t.push(e);
    return t;
  }, descendants: function() {
    return Array.from(this);
  }, leaves: function() {
    var e = [];
    return this.eachBefore(function(t) {
      t.children || e.push(t);
    }), e;
  }, links: function() {
    var e = this, t = [];
    return e.each(function(n) {
      n !== e && t.push({ source: n.parent, target: n });
    }), t;
  }, copy: function() {
    return yl(this).eachBefore(_b);
  }, [Symbol.iterator]: function* () {
    var e, t, n, r, i = this, o = [i];
    do
      for (e = o.reverse(), o = []; i = e.pop(); )
        if (yield i, t = i.children)
          for (n = 0, r = t.length; n < r; ++n)
            o.push(t[n]);
    while (o.length);
  } };
  const ad = 4294967296;
  function _l() {
    let e = 1;
    return () => (e = (1664525 * e + 1013904223) % ad) / ad;
  }
  function sd(e, t) {
    for (var n, r, i = 0, o = (e = function(s, l) {
      let u, c, d = s.length;
      for (; d; )
        c = l() * d-- | 0, u = s[d], s[d] = s[c], s[c] = u;
      return s;
    }(Array.from(e), t)).length, a = []; i < o; )
      n = e[i], r && ld(r, n) ? ++i : (r = wb(a = xb(a, n)), i = 0);
    return r;
  }
  function xb(e, t) {
    var n, r;
    if (xl(t, e))
      return [t];
    for (n = 0; n < e.length; ++n)
      if (Go(t, e[n]) && xl(oi(e[n], t), e))
        return [e[n], t];
    for (n = 0; n < e.length - 1; ++n)
      for (r = n + 1; r < e.length; ++r)
        if (Go(oi(e[n], e[r]), t) && Go(oi(e[n], t), e[r]) && Go(oi(e[r], t), e[n]) && xl(ud(e[n], e[r], t), e))
          return [e[n], e[r], t];
    throw new Error();
  }
  function Go(e, t) {
    var n = e.r - t.r, r = t.x - e.x, i = t.y - e.y;
    return n < 0 || n * n < r * r + i * i;
  }
  function ld(e, t) {
    var n = e.r - t.r + 1e-9 * Math.max(e.r, t.r, 1), r = t.x - e.x, i = t.y - e.y;
    return n > 0 && n * n > r * r + i * i;
  }
  function xl(e, t) {
    for (var n = 0; n < t.length; ++n)
      if (!ld(e, t[n]))
        return !1;
    return !0;
  }
  function wb(e) {
    switch (e.length) {
      case 1:
        return function(t) {
          return { x: t.x, y: t.y, r: t.r };
        }(e[0]);
      case 2:
        return oi(e[0], e[1]);
      case 3:
        return ud(e[0], e[1], e[2]);
    }
  }
  function oi(e, t) {
    var n = e.x, r = e.y, i = e.r, o = t.x, a = t.y, s = t.r, l = o - n, u = a - r, c = s - i, d = Math.sqrt(l * l + u * u);
    return { x: (n + o + l / d * c) / 2, y: (r + a + u / d * c) / 2, r: (d + i + s) / 2 };
  }
  function ud(e, t, n) {
    var r = e.x, i = e.y, o = e.r, a = t.x, s = t.y, l = t.r, u = n.x, c = n.y, d = n.r, h = r - a, p = r - u, b = i - s, m = i - c, g = l - o, v = d - o, M = r * r + i * i - o * o, _ = M - a * a - s * s + l * l, y = M - u * u - c * c + d * d, E = p * b - h * m, S = (b * y - m * _) / (2 * E) - r, O = (m * g - b * v) / E, j = (p * _ - h * y) / (2 * E) - i, z = (h * v - p * g) / E, C = O * O + z * z - 1, N = 2 * (o + S * O + j * z), P = S * S + j * j - o * o, T = -(Math.abs(C) > 1e-6 ? (N + Math.sqrt(N * N - 4 * C * P)) / (2 * C) : P / N);
    return { x: r + S + O * T, y: i + j + z * T, r: T };
  }
  function cd(e, t, n) {
    var r, i, o, a, s = e.x - t.x, l = e.y - t.y, u = s * s + l * l;
    u ? (i = t.r + n.r, i *= i, a = e.r + n.r, i > (a *= a) ? (r = (u + a - i) / (2 * u), o = Math.sqrt(Math.max(0, a / u - r * r)), n.x = e.x - r * s - o * l, n.y = e.y - r * l + o * s) : (r = (u + i - a) / (2 * u), o = Math.sqrt(Math.max(0, i / u - r * r)), n.x = t.x + r * s - o * l, n.y = t.y + r * l + o * s)) : (n.x = t.x + n.r, n.y = t.y);
  }
  function fd(e, t) {
    var n = e.r + t.r - 1e-6, r = t.x - e.x, i = t.y - e.y;
    return n > 0 && n * n > r * r + i * i;
  }
  function hd(e) {
    var t = e._, n = e.next._, r = t.r + n.r, i = (t.x * n.r + n.x * t.r) / r, o = (t.y * n.r + n.y * t.r) / r;
    return i * i + o * o;
  }
  function Xo(e) {
    this._ = e, this.next = null, this.previous = null;
  }
  function dd(e, t) {
    if (!(o = (e = function(p) {
      return typeof p == "object" && "length" in p ? p : Array.from(p);
    }(e)).length))
      return 0;
    var n, r, i, o, a, s, l, u, c, d, h;
    if ((n = e[0]).x = 0, n.y = 0, !(o > 1))
      return n.r;
    if (r = e[1], n.x = -r.r, r.x = n.r, r.y = 0, !(o > 2))
      return n.r + r.r;
    cd(r, n, i = e[2]), n = new Xo(n), r = new Xo(r), i = new Xo(i), n.next = i.previous = r, r.next = n.previous = i, i.next = r.previous = n;
    e:
      for (l = 3; l < o; ++l) {
        cd(n._, r._, i = e[l]), i = new Xo(i), u = r.next, c = n.previous, d = r._.r, h = n._.r;
        do
          if (d <= h) {
            if (fd(u._, i._)) {
              r = u, n.next = r, r.previous = n, --l;
              continue e;
            }
            d += u._.r, u = u.next;
          } else {
            if (fd(c._, i._)) {
              (n = c).next = r, r.previous = n, --l;
              continue e;
            }
            h += c._.r, c = c.previous;
          }
        while (u !== c.next);
        for (i.previous = n, i.next = r, n.next = r.previous = r = i, a = hd(n); (i = i.next) !== r; )
          (s = hd(i)) < a && (n = i, a = s);
        r = n.next;
      }
    for (n = [r._], i = r; (i = i.next) !== r; )
      n.push(i._);
    for (i = sd(n, t), l = 0; l < o; ++l)
      (n = e[l]).x -= i.x, n.y -= i.y;
    return i.r;
  }
  function Mb(e) {
    return Math.sqrt(e.value);
  }
  function pd(e) {
    return function(t) {
      t.children || (t.r = Math.max(0, +e(t) || 0));
    };
  }
  function wl(e, t, n) {
    return function(r) {
      if (i = r.children) {
        var i, o, a, s = i.length, l = e(r) * t || 0;
        if (l)
          for (o = 0; o < s; ++o)
            i[o].r += l;
        if (a = dd(i, n), l)
          for (o = 0; o < s; ++o)
            i[o].r -= l;
        r.r = a + l;
      }
    };
  }
  function gd(e) {
    return function(t) {
      var n = t.parent;
      t.r *= e, n && (t.x = n.x + e * t.x, t.y = n.y + e * t.y);
    };
  }
  function md(e) {
    e.x0 = Math.round(e.x0), e.y0 = Math.round(e.y0), e.x1 = Math.round(e.x1), e.y1 = Math.round(e.y1);
  }
  function ai(e, t, n, r, i) {
    for (var o, a = e.children, s = -1, l = a.length, u = e.value && (r - t) / e.value; ++s < l; )
      (o = a[s]).y0 = n, o.y1 = i, o.x0 = t, o.x1 = t += o.value * u;
  }
  var Eb = { depth: -1 }, vd = {}, Ml = {};
  function Sb(e) {
    return e.id;
  }
  function Tb(e) {
    return e.parentId;
  }
  function bd(e) {
    let t = e.length;
    if (t < 2)
      return "";
    for (; --t > 1 && !El(e, t); )
      ;
    return e.slice(0, t);
  }
  function El(e, t) {
    if (e[t] === "/") {
      let n = 0;
      for (; t > 0 && e[--t] === "\\"; )
        ++n;
      if (!(1 & n))
        return !0;
    }
    return !1;
  }
  function kb(e, t) {
    return e.parent === t.parent ? 1 : 2;
  }
  function Sl(e) {
    var t = e.children;
    return t ? t[0] : e.t;
  }
  function Tl(e) {
    var t = e.children;
    return t ? t[t.length - 1] : e.t;
  }
  function Ab(e, t, n) {
    var r = n / (t.i - e.i);
    t.c -= r, t.s += n, e.c += r, t.z += n, t.m += n;
  }
  function Nb(e, t, n) {
    return e.a.parent === t.parent ? e.a : n;
  }
  function Zo(e, t) {
    this._ = e, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t;
  }
  function Wo(e, t, n, r, i) {
    for (var o, a = e.children, s = -1, l = a.length, u = e.value && (i - n) / e.value; ++s < l; )
      (o = a[s]).x0 = t, o.x1 = r, o.y0 = n, o.y1 = n += o.value * u;
  }
  Zo.prototype = Object.create(zn.prototype);
  var yd = (1 + Math.sqrt(5)) / 2;
  function _d(e, t, n, r, i, o) {
    for (var a, s, l, u, c, d, h, p, b, m, g, v = [], M = t.children, _ = 0, y = 0, E = M.length, S = t.value; _ < E; ) {
      l = i - n, u = o - r;
      do
        c = M[y++].value;
      while (!c && y < E);
      for (d = h = c, g = c * c * (m = Math.max(u / l, l / u) / (S * e)), b = Math.max(h / g, g / d); y < E; ++y) {
        if (c += s = M[y].value, s < d && (d = s), s > h && (h = s), g = c * c * m, (p = Math.max(h / g, g / d)) > b) {
          c -= s;
          break;
        }
        b = p;
      }
      v.push(a = { value: c, dice: l < u, children: M.slice(_, y) }), a.dice ? ai(a, n, r, i, S ? r += u * c / S : o) : Wo(a, n, r, S ? n += l * c / S : i, o), S -= c, _ = y;
    }
    return v;
  }
  var xd = function e(t) {
    function n(r, i, o, a, s) {
      _d(t, r, i, o, a, s);
    }
    return n.ratio = function(r) {
      return e((r = +r) > 1 ? r : 1);
    }, n;
  }(yd), Cb = function e(t) {
    function n(r, i, o, a, s) {
      if ((l = r._squarify) && l.ratio === t)
        for (var l, u, c, d, h, p = -1, b = l.length, m = r.value; ++p < b; ) {
          for (c = (u = l[p]).children, d = u.value = 0, h = c.length; d < h; ++d)
            u.value += c[d].value;
          u.dice ? ai(u, i, o, a, m ? o += (s - o) * u.value / m : s) : Wo(u, i, o, m ? i += (a - i) * u.value / m : a, s), m -= u.value;
        }
      else
        r._squarify = l = _d(t, r, i, o, a, s), l.ratio = t;
    }
    return n.ratio = function(r) {
      return e((r = +r) > 1 ? r : 1);
    }, n;
  }(yd);
  function zb(e, t, n) {
    return (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]);
  }
  function Lb(e, t) {
    return e[0] - t[0] || e[1] - t[1];
  }
  function wd(e) {
    const t = e.length, n = [0, 1];
    let r, i = 2;
    for (r = 2; r < t; ++r) {
      for (; i > 1 && zb(e[n[i - 2]], e[n[i - 1]], e[r]) <= 0; )
        --i;
      n[i++] = r;
    }
    return n.slice(0, i);
  }
  var Fe = Math.random, Pb = function e(t) {
    function n(r, i) {
      return r = r == null ? 0 : +r, i = i == null ? 1 : +i, arguments.length === 1 ? (i = r, r = 0) : i -= r, function() {
        return t() * i + r;
      };
    }
    return n.source = e, n;
  }(Fe), $b = function e(t) {
    function n(r, i) {
      return arguments.length < 2 && (i = r, r = 0), r = Math.floor(r), i = Math.floor(i) - r, function() {
        return Math.floor(t() * i + r);
      };
    }
    return n.source = e, n;
  }(Fe), kl = function e(t) {
    function n(r, i) {
      var o, a;
      return r = r == null ? 0 : +r, i = i == null ? 1 : +i, function() {
        var s;
        if (o != null)
          s = o, o = null;
        else
          do
            o = 2 * t() - 1, s = 2 * t() - 1, a = o * o + s * s;
          while (!a || a > 1);
        return r + i * s * Math.sqrt(-2 * Math.log(a) / a);
      };
    }
    return n.source = e, n;
  }(Fe), Ob = function e(t) {
    var n = kl.source(t);
    function r() {
      var i = n.apply(this, arguments);
      return function() {
        return Math.exp(i());
      };
    }
    return r.source = e, r;
  }(Fe), Md = function e(t) {
    function n(r) {
      return (r = +r) <= 0 ? () => 0 : function() {
        for (var i = 0, o = r; o > 1; --o)
          i += t();
        return i + o * t();
      };
    }
    return n.source = e, n;
  }(Fe), Ib = function e(t) {
    var n = Md.source(t);
    function r(i) {
      if ((i = +i) == 0)
        return t;
      var o = n(i);
      return function() {
        return o() / i;
      };
    }
    return r.source = e, r;
  }(Fe), Rb = function e(t) {
    function n(r) {
      return function() {
        return -Math.log1p(-t()) / r;
      };
    }
    return n.source = e, n;
  }(Fe), Fb = function e(t) {
    function n(r) {
      if ((r = +r) < 0)
        throw new RangeError("invalid alpha");
      return r = 1 / -r, function() {
        return Math.pow(1 - t(), r);
      };
    }
    return n.source = e, n;
  }(Fe), jb = function e(t) {
    function n(r) {
      if ((r = +r) < 0 || r > 1)
        throw new RangeError("invalid p");
      return function() {
        return Math.floor(t() + r);
      };
    }
    return n.source = e, n;
  }(Fe), Ed = function e(t) {
    function n(r) {
      if ((r = +r) < 0 || r > 1)
        throw new RangeError("invalid p");
      return r === 0 ? () => 1 / 0 : r === 1 ? () => 1 : (r = Math.log1p(-r), function() {
        return 1 + Math.floor(Math.log1p(-t()) / r);
      });
    }
    return n.source = e, n;
  }(Fe), Al = function e(t) {
    var n = kl.source(t)();
    function r(i, o) {
      if ((i = +i) < 0)
        throw new RangeError("invalid k");
      if (i === 0)
        return () => 0;
      if (o = o == null ? 1 : +o, i === 1)
        return () => -Math.log1p(-t()) * o;
      var a = (i < 1 ? i + 1 : i) - 1 / 3, s = 1 / (3 * Math.sqrt(a)), l = i < 1 ? () => Math.pow(t(), 1 / i) : () => 1;
      return function() {
        do {
          do
            var u = n(), c = 1 + s * u;
          while (c <= 0);
          c *= c * c;
          var d = 1 - t();
        } while (d >= 1 - 0.0331 * u * u * u * u && Math.log(d) >= 0.5 * u * u + a * (1 - c + Math.log(c)));
        return a * c * l() * o;
      };
    }
    return r.source = e, r;
  }(Fe), Sd = function e(t) {
    var n = Al.source(t);
    function r(i, o) {
      var a = n(i), s = n(o);
      return function() {
        var l = a();
        return l === 0 ? 0 : l / (l + s());
      };
    }
    return r.source = e, r;
  }(Fe), Td = function e(t) {
    var n = Ed.source(t), r = Sd.source(t);
    function i(o, a) {
      return o = +o, (a = +a) >= 1 ? () => o : a <= 0 ? () => 0 : function() {
        for (var s = 0, l = o, u = a; l * u > 16 && l * (1 - u) > 16; ) {
          var c = Math.floor((l + 1) * u), d = r(c, l - c + 1)();
          d <= u ? (s += c, l -= c, u = (u - d) / (1 - d)) : (l = c - 1, u /= d);
        }
        for (var h = u < 0.5, p = n(h ? u : 1 - u), b = p(), m = 0; b <= l; ++m)
          b += p();
        return s + (h ? m : l - m);
      };
    }
    return i.source = e, i;
  }(Fe), Db = function e(t) {
    function n(r, i, o) {
      var a;
      return (r = +r) == 0 ? a = (s) => -Math.log(s) : (r = 1 / r, a = (s) => Math.pow(s, r)), i = i == null ? 0 : +i, o = o == null ? 1 : +o, function() {
        return i + o * a(-Math.log1p(-t()));
      };
    }
    return n.source = e, n;
  }(Fe), qb = function e(t) {
    function n(r, i) {
      return r = r == null ? 0 : +r, i = i == null ? 1 : +i, function() {
        return r + i * Math.tan(Math.PI * t());
      };
    }
    return n.source = e, n;
  }(Fe), Bb = function e(t) {
    function n(r, i) {
      return r = r == null ? 0 : +r, i = i == null ? 1 : +i, function() {
        var o = t();
        return r + i * Math.log(o / (1 - o));
      };
    }
    return n.source = e, n;
  }(Fe), Ub = function e(t) {
    var n = Al.source(t), r = Td.source(t);
    function i(o) {
      return function() {
        for (var a = 0, s = o; s > 16; ) {
          var l = Math.floor(0.875 * s), u = n(l)();
          if (u > s)
            return a + r(l - 1, s / u)();
          a += l, s -= u;
        }
        for (var c = -Math.log1p(-t()), d = 0; c <= s; ++d)
          c -= Math.log1p(-t());
        return a + d;
      };
    }
    return i.source = e, i;
  }(Fe);
  const kd = 1 / 4294967296;
  function gt(e, t) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(e);
        break;
      default:
        this.range(t).domain(e);
    }
    return this;
  }
  function Bt(e, t) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        typeof e == "function" ? this.interpolator(e) : this.range(e);
        break;
      default:
        this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
    }
    return this;
  }
  const Nl = Symbol("implicit");
  function Cl() {
    var e = new je(), t = [], n = [], r = Nl;
    function i(o) {
      let a = e.get(o);
      if (a === void 0) {
        if (r !== Nl)
          return r;
        e.set(o, a = t.push(o) - 1);
      }
      return n[a % n.length];
    }
    return i.domain = function(o) {
      if (!arguments.length)
        return t.slice();
      t = [], e = new je();
      for (const a of o)
        e.has(a) || e.set(a, t.push(a) - 1);
      return i;
    }, i.range = function(o) {
      return arguments.length ? (n = Array.from(o), i) : n.slice();
    }, i.unknown = function(o) {
      return arguments.length ? (r = o, i) : r;
    }, i.copy = function() {
      return Cl(t, n).unknown(r);
    }, gt.apply(i, arguments), i;
  }
  function zl() {
    var e, t, n = Cl().unknown(void 0), r = n.domain, i = n.range, o = 0, a = 1, s = !1, l = 0, u = 0, c = 0.5;
    function d() {
      var h = r().length, p = a < o, b = p ? a : o, m = p ? o : a;
      e = (m - b) / Math.max(1, h - l + 2 * u), s && (e = Math.floor(e)), b += (m - b - e * (h - l)) * c, t = e * (1 - l), s && (b = Math.round(b), t = Math.round(t));
      var g = It(h).map(function(v) {
        return b + e * v;
      });
      return i(p ? g.reverse() : g);
    }
    return delete n.unknown, n.domain = function(h) {
      return arguments.length ? (r(h), d()) : r();
    }, n.range = function(h) {
      return arguments.length ? ([o, a] = h, o = +o, a = +a, d()) : [o, a];
    }, n.rangeRound = function(h) {
      return [o, a] = h, o = +o, a = +a, s = !0, d();
    }, n.bandwidth = function() {
      return t;
    }, n.step = function() {
      return e;
    }, n.round = function(h) {
      return arguments.length ? (s = !!h, d()) : s;
    }, n.padding = function(h) {
      return arguments.length ? (l = Math.min(1, u = +h), d()) : l;
    }, n.paddingInner = function(h) {
      return arguments.length ? (l = Math.min(1, h), d()) : l;
    }, n.paddingOuter = function(h) {
      return arguments.length ? (u = +h, d()) : u;
    }, n.align = function(h) {
      return arguments.length ? (c = Math.max(0, Math.min(1, h)), d()) : c;
    }, n.copy = function() {
      return zl(r(), [o, a]).round(s).paddingInner(l).paddingOuter(u).align(c);
    }, gt.apply(d(), arguments);
  }
  function Ad(e) {
    var t = e.copy;
    return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
      return Ad(t());
    }, e;
  }
  function Jo(e) {
    return +e;
  }
  var Nd = [0, 1];
  function nt(e) {
    return e;
  }
  function Ll(e, t) {
    return (t -= e = +e) ? function(n) {
      return (n - e) / t;
    } : /* @__PURE__ */ function(n) {
      return function() {
        return n;
      };
    }(isNaN(t) ? NaN : 0.5);
  }
  function Yb(e, t, n) {
    var r = e[0], i = e[1], o = t[0], a = t[1];
    return i < r ? (r = Ll(i, r), o = n(a, o)) : (r = Ll(r, i), o = n(o, a)), function(s) {
      return o(r(s));
    };
  }
  function Hb(e, t, n) {
    var r = Math.min(e.length, t.length) - 1, i = new Array(r), o = new Array(r), a = -1;
    for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++a < r; )
      i[a] = Ll(e[a], e[a + 1]), o[a] = n(t[a], t[a + 1]);
    return function(s) {
      var l = G(e, s, 1, r) - 1;
      return o[l](i[l](s));
    };
  }
  function si(e, t) {
    return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
  }
  function Ko() {
    var e, t, n, r, i, o, a = Nd, s = Nd, l = Gt, u = nt;
    function c() {
      var h = Math.min(a.length, s.length);
      return u !== nt && (u = function(p, b) {
        var m;
        return p > b && (m = p, p = b, b = m), function(g) {
          return Math.max(p, Math.min(b, g));
        };
      }(a[0], a[h - 1])), r = h > 2 ? Hb : Yb, i = o = null, d;
    }
    function d(h) {
      return h == null || isNaN(h = +h) ? n : (i || (i = r(a.map(e), s, l)))(e(u(h)));
    }
    return d.invert = function(h) {
      return u(t((o || (o = r(s, a.map(e), dt)))(h)));
    }, d.domain = function(h) {
      return arguments.length ? (a = Array.from(h, Jo), c()) : a.slice();
    }, d.range = function(h) {
      return arguments.length ? (s = Array.from(h), c()) : s.slice();
    }, d.rangeRound = function(h) {
      return s = Array.from(h), l = Bi, c();
    }, d.clamp = function(h) {
      return arguments.length ? (u = !!h || nt, c()) : u !== nt;
    }, d.interpolate = function(h) {
      return arguments.length ? (l = h, c()) : l;
    }, d.unknown = function(h) {
      return arguments.length ? (n = h, d) : n;
    }, function(h, p) {
      return e = h, t = p, c();
    };
  }
  function Pl() {
    return Ko()(nt, nt);
  }
  function Cd(e, t, n, r) {
    var i, o = Un(e, t, n);
    switch ((r = or(r ?? ",f")).type) {
      case "s":
        var a = Math.max(Math.abs(e), Math.abs(t));
        return r.precision != null || isNaN(i = Bf(o, a)) || (r.precision = i), f.formatPrefix(r, a);
      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        r.precision != null || isNaN(i = Uf(o, Math.max(Math.abs(e), Math.abs(t)))) || (r.precision = i - (r.type === "e"));
        break;
      case "f":
      case "%":
        r.precision != null || isNaN(i = qf(o)) || (r.precision = i - 2 * (r.type === "%"));
    }
    return f.format(r);
  }
  function en(e) {
    var t = e.domain;
    return e.ticks = function(n) {
      var r = t();
      return qn(r[0], r[r.length - 1], n ?? 10);
    }, e.tickFormat = function(n, r) {
      var i = t();
      return Cd(i[0], i[i.length - 1], n ?? 10, r);
    }, e.nice = function(n) {
      n == null && (n = 10);
      var r, i, o = t(), a = 0, s = o.length - 1, l = o[a], u = o[s], c = 10;
      for (u < l && (i = l, l = u, u = i, i = a, a = s, s = i); c-- > 0; ) {
        if ((i = Bn(l, u, n)) === r)
          return o[a] = l, o[s] = u, t(o);
        if (i > 0)
          l = Math.floor(l / i) * i, u = Math.ceil(u / i) * i;
        else {
          if (!(i < 0))
            break;
          l = Math.ceil(l * i) / i, u = Math.floor(u * i) / i;
        }
        r = i;
      }
      return e;
    }, e;
  }
  function zd(e, t) {
    var n, r = 0, i = (e = e.slice()).length - 1, o = e[r], a = e[i];
    return a < o && (n = r, r = i, i = n, n = o, o = a, a = n), e[r] = t.floor(o), e[i] = t.ceil(a), e;
  }
  function Ld(e) {
    return Math.log(e);
  }
  function Pd(e) {
    return Math.exp(e);
  }
  function Vb(e) {
    return -Math.log(-e);
  }
  function Gb(e) {
    return -Math.exp(-e);
  }
  function Xb(e) {
    return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
  }
  function $d(e) {
    return (t, n) => -e(-t, n);
  }
  function $l(e) {
    const t = e(Ld, Pd), n = t.domain;
    let r, i, o = 10;
    function a() {
      return r = function(s) {
        return s === Math.E ? Math.log : s === 10 && Math.log10 || s === 2 && Math.log2 || (s = Math.log(s), (l) => Math.log(l) / s);
      }(o), i = /* @__PURE__ */ function(s) {
        return s === 10 ? Xb : s === Math.E ? Math.exp : (l) => Math.pow(s, l);
      }(o), n()[0] < 0 ? (r = $d(r), i = $d(i), e(Vb, Gb)) : e(Ld, Pd), t;
    }
    return t.base = function(s) {
      return arguments.length ? (o = +s, a()) : o;
    }, t.domain = function(s) {
      return arguments.length ? (n(s), a()) : n();
    }, t.ticks = (s) => {
      const l = n();
      let u = l[0], c = l[l.length - 1];
      const d = c < u;
      d && ([u, c] = [c, u]);
      let h, p, b = r(u), m = r(c);
      const g = s == null ? 10 : +s;
      let v = [];
      if (!(o % 1) && m - b < g) {
        if (b = Math.floor(b), m = Math.ceil(m), u > 0) {
          for (; b <= m; ++b)
            for (h = 1; h < o; ++h)
              if (p = b < 0 ? h / i(-b) : h * i(b), !(p < u)) {
                if (p > c)
                  break;
                v.push(p);
              }
        } else
          for (; b <= m; ++b)
            for (h = o - 1; h >= 1; --h)
              if (p = b > 0 ? h / i(-b) : h * i(b), !(p < u)) {
                if (p > c)
                  break;
                v.push(p);
              }
        2 * v.length < g && (v = qn(u, c, g));
      } else
        v = qn(b, m, Math.min(m - b, g)).map(i);
      return d ? v.reverse() : v;
    }, t.tickFormat = (s, l) => {
      if (s == null && (s = 10), l == null && (l = o === 10 ? "s" : ","), typeof l != "function" && (o % 1 || (l = or(l)).precision != null || (l.trim = !0), l = f.format(l)), s === 1 / 0)
        return l;
      const u = Math.max(1, o * s / t.ticks().length);
      return (c) => {
        let d = c / i(Math.round(r(c)));
        return d * o < o - 0.5 && (d *= o), d <= u ? l(c) : "";
      };
    }, t.nice = () => n(zd(n(), { floor: (s) => i(Math.floor(r(s))), ceil: (s) => i(Math.ceil(r(s))) })), t;
  }
  function Od(e) {
    return function(t) {
      return Math.sign(t) * Math.log1p(Math.abs(t / e));
    };
  }
  function Id(e) {
    return function(t) {
      return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
    };
  }
  function Ol(e) {
    var t = 1, n = e(Od(t), Id(t));
    return n.constant = function(r) {
      return arguments.length ? e(Od(t = +r), Id(t)) : t;
    }, en(n);
  }
  function Rd(e) {
    return function(t) {
      return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
    };
  }
  function Zb(e) {
    return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
  }
  function Wb(e) {
    return e < 0 ? -e * e : e * e;
  }
  function Il(e) {
    var t = e(nt, nt), n = 1;
    function r() {
      return n === 1 ? e(nt, nt) : n === 0.5 ? e(Zb, Wb) : e(Rd(n), Rd(1 / n));
    }
    return t.exponent = function(i) {
      return arguments.length ? (n = +i, r()) : n;
    }, en(t);
  }
  function Rl() {
    var e = Il(Ko());
    return e.copy = function() {
      return si(e, Rl()).exponent(e.exponent());
    }, gt.apply(e, arguments), e;
  }
  function Fd(e) {
    return Math.sign(e) * e * e;
  }
  function Jb(e) {
    return Math.sign(e) * Math.sqrt(Math.abs(e));
  }
  var Fl = /* @__PURE__ */ new Date(), jl = /* @__PURE__ */ new Date();
  function Le(e, t, n, r) {
    function i(o) {
      return e(o = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+o)), o;
    }
    return i.floor = function(o) {
      return e(o = /* @__PURE__ */ new Date(+o)), o;
    }, i.ceil = function(o) {
      return e(o = new Date(o - 1)), t(o, 1), e(o), o;
    }, i.round = function(o) {
      var a = i(o), s = i.ceil(o);
      return o - a < s - o ? a : s;
    }, i.offset = function(o, a) {
      return t(o = /* @__PURE__ */ new Date(+o), a == null ? 1 : Math.floor(a)), o;
    }, i.range = function(o, a, s) {
      var l, u = [];
      if (o = i.ceil(o), s = s == null ? 1 : Math.floor(s), !(o < a && s > 0))
        return u;
      do
        u.push(l = /* @__PURE__ */ new Date(+o)), t(o, s), e(o);
      while (l < o && o < a);
      return u;
    }, i.filter = function(o) {
      return Le(function(a) {
        if (a >= a)
          for (; e(a), !o(a); )
            a.setTime(a - 1);
      }, function(a, s) {
        if (a >= a)
          if (s < 0)
            for (; ++s <= 0; )
              for (; t(a, -1), !o(a); )
                ;
          else
            for (; --s >= 0; )
              for (; t(a, 1), !o(a); )
                ;
      });
    }, n && (i.count = function(o, a) {
      return Fl.setTime(+o), jl.setTime(+a), e(Fl), e(jl), Math.floor(n(Fl, jl));
    }, i.every = function(o) {
      return o = Math.floor(o), isFinite(o) && o > 0 ? o > 1 ? i.filter(r ? function(a) {
        return r(a) % o == 0;
      } : function(a) {
        return i.count(0, a) % o == 0;
      }) : i : null;
    }), i;
  }
  var Qo = Le(function() {
  }, function(e, t) {
    e.setTime(+e + t);
  }, function(e, t) {
    return t - e;
  });
  Qo.every = function(e) {
    return e = Math.floor(e), isFinite(e) && e > 0 ? e > 1 ? Le(function(t) {
      t.setTime(Math.floor(t / e) * e);
    }, function(t, n) {
      t.setTime(+t + n * e);
    }, function(t, n) {
      return (n - t) / e;
    }) : Qo : null;
  };
  var Dl = Qo, jd = Qo.range;
  const li = 1e3, tn = 6e4, ui = 36e5, ql = 864e5, Bl = 6048e5, Kb = 2592e6, Ul = 31536e6;
  var Dd = Le(function(e) {
    e.setTime(e - e.getMilliseconds());
  }, function(e, t) {
    e.setTime(+e + t * li);
  }, function(e, t) {
    return (t - e) / li;
  }, function(e) {
    return e.getUTCSeconds();
  }), nn = Dd, qd = Dd.range, Bd = Le(function(e) {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * li);
  }, function(e, t) {
    e.setTime(+e + t * tn);
  }, function(e, t) {
    return (t - e) / tn;
  }, function(e) {
    return e.getMinutes();
  }), Yl = Bd, Qb = Bd.range, Ud = Le(function(e) {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * li - e.getMinutes() * tn);
  }, function(e, t) {
    e.setTime(+e + t * ui);
  }, function(e, t) {
    return (t - e) / ui;
  }, function(e) {
    return e.getHours();
  }), Hl = Ud, ey = Ud.range, Yd = Le((e) => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * tn) / ql, (e) => e.getDate() - 1), ci = Yd, ty = Yd.range;
  function Pn(e) {
    return Le(function(t) {
      t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
    }, function(t, n) {
      t.setDate(t.getDate() + 7 * n);
    }, function(t, n) {
      return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * tn) / Bl;
    });
  }
  var pr = Pn(0), fi = Pn(1), Hd = Pn(2), Vd = Pn(3), $n = Pn(4), Gd = Pn(5), Xd = Pn(6), Zd = pr.range, ny = fi.range, ry = Hd.range, iy = Vd.range, oy = $n.range, ay = Gd.range, sy = Xd.range, Wd = Le(function(e) {
    e.setDate(1), e.setHours(0, 0, 0, 0);
  }, function(e, t) {
    e.setMonth(e.getMonth() + t);
  }, function(e, t) {
    return t.getMonth() - e.getMonth() + 12 * (t.getFullYear() - e.getFullYear());
  }, function(e) {
    return e.getMonth();
  }), Vl = Wd, ly = Wd.range, Gl = Le(function(e) {
    e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  }, function(e, t) {
    e.setFullYear(e.getFullYear() + t);
  }, function(e, t) {
    return t.getFullYear() - e.getFullYear();
  }, function(e) {
    return e.getFullYear();
  });
  Gl.every = function(e) {
    return isFinite(e = Math.floor(e)) && e > 0 ? Le(function(t) {
      t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
    }, function(t, n) {
      t.setFullYear(t.getFullYear() + n * e);
    }) : null;
  };
  var rn = Gl, uy = Gl.range, Jd = Le(function(e) {
    e.setUTCSeconds(0, 0);
  }, function(e, t) {
    e.setTime(+e + t * tn);
  }, function(e, t) {
    return (t - e) / tn;
  }, function(e) {
    return e.getUTCMinutes();
  }), Xl = Jd, cy = Jd.range, Kd = Le(function(e) {
    e.setUTCMinutes(0, 0, 0);
  }, function(e, t) {
    e.setTime(+e + t * ui);
  }, function(e, t) {
    return (t - e) / ui;
  }, function(e) {
    return e.getUTCHours();
  }), Zl = Kd, fy = Kd.range, Qd = Le(function(e) {
    e.setUTCHours(0, 0, 0, 0);
  }, function(e, t) {
    e.setUTCDate(e.getUTCDate() + t);
  }, function(e, t) {
    return (t - e) / ql;
  }, function(e) {
    return e.getUTCDate() - 1;
  }), hi = Qd, hy = Qd.range;
  function On(e) {
    return Le(function(t) {
      t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
    }, function(t, n) {
      t.setUTCDate(t.getUTCDate() + 7 * n);
    }, function(t, n) {
      return (n - t) / Bl;
    });
  }
  var gr = On(0), di = On(1), e0 = On(2), t0 = On(3), In = On(4), n0 = On(5), r0 = On(6), i0 = gr.range, dy = di.range, py = e0.range, gy = t0.range, my = In.range, vy = n0.range, by = r0.range, o0 = Le(function(e) {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, t) {
    e.setUTCMonth(e.getUTCMonth() + t);
  }, function(e, t) {
    return t.getUTCMonth() - e.getUTCMonth() + 12 * (t.getUTCFullYear() - e.getUTCFullYear());
  }, function(e) {
    return e.getUTCMonth();
  }), Wl = o0, yy = o0.range, Jl = Le(function(e) {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, t) {
    e.setUTCFullYear(e.getUTCFullYear() + t);
  }, function(e, t) {
    return t.getUTCFullYear() - e.getUTCFullYear();
  }, function(e) {
    return e.getUTCFullYear();
  });
  Jl.every = function(e) {
    return isFinite(e = Math.floor(e)) && e > 0 ? Le(function(t) {
      t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
    }, function(t, n) {
      t.setUTCFullYear(t.getUTCFullYear() + n * e);
    }) : null;
  };
  var on = Jl, _y = Jl.range;
  function a0(e, t, n, r, i, o) {
    const a = [[nn, 1, li], [nn, 5, 5e3], [nn, 15, 15e3], [nn, 30, 3e4], [o, 1, tn], [o, 5, 3e5], [o, 15, 9e5], [o, 30, 18e5], [i, 1, ui], [i, 3, 108e5], [i, 6, 216e5], [i, 12, 432e5], [r, 1, ql], [r, 2, 1728e5], [n, 1, Bl], [t, 1, Kb], [t, 3, 7776e6], [e, 1, Ul]];
    function s(l, u, c) {
      const d = Math.abs(u - l) / c, h = k(([, , m]) => m).right(a, d);
      if (h === a.length)
        return e.every(Un(l / Ul, u / Ul, c));
      if (h === 0)
        return Dl.every(Math.max(Un(l, u, c), 1));
      const [p, b] = a[d / a[h - 1][2] < a[h][2] / d ? h - 1 : h];
      return p.every(b);
    }
    return [function(l, u, c) {
      const d = u < l;
      d && ([l, u] = [u, l]);
      const h = c && typeof c.range == "function" ? c : s(l, u, c), p = h ? h.range(l, +u + 1) : [];
      return d ? p.reverse() : p;
    }, s];
  }
  const [s0, l0] = a0(on, Wl, gr, hi, Zl, Xl), [u0, c0] = a0(rn, Vl, pr, ci, Hl, Yl);
  function Kl(e) {
    if (0 <= e.y && e.y < 100) {
      var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
      return t.setFullYear(e.y), t;
    }
    return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
  }
  function Ql(e) {
    if (0 <= e.y && e.y < 100) {
      var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
      return t.setUTCFullYear(e.y), t;
    }
    return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
  }
  function pi(e, t, n) {
    return { y: e, m: t, d: n, H: 0, M: 0, S: 0, L: 0 };
  }
  function f0(e) {
    var t = e.dateTime, n = e.date, r = e.time, i = e.periods, o = e.days, a = e.shortDays, s = e.months, l = e.shortMonths, u = gi(i), c = mi(i), d = gi(o), h = mi(o), p = gi(a), b = mi(a), m = gi(s), g = mi(s), v = gi(l), M = mi(l), _ = { a: function(z) {
      return a[z.getDay()];
    }, A: function(z) {
      return o[z.getDay()];
    }, b: function(z) {
      return l[z.getMonth()];
    }, B: function(z) {
      return s[z.getMonth()];
    }, c: null, d: v0, e: v0, f: Uy, g: Qy, G: t2, H: Dy, I: qy, j: By, L: b0, m: Yy, M: Hy, p: function(z) {
      return i[+(z.getHours() >= 12)];
    }, q: function(z) {
      return 1 + ~~(z.getMonth() / 3);
    }, Q: E0, s: S0, S: Vy, u: Gy, U: Xy, V: Zy, w: Wy, W: Jy, x: null, X: null, y: Ky, Y: e2, Z: n2, "%": M0 }, y = { a: function(z) {
      return a[z.getUTCDay()];
    }, A: function(z) {
      return o[z.getUTCDay()];
    }, b: function(z) {
      return l[z.getUTCMonth()];
    }, B: function(z) {
      return s[z.getUTCMonth()];
    }, c: null, d: _0, e: _0, f: a2, g: m2, G: b2, H: r2, I: i2, j: o2, L: x0, m: s2, M: l2, p: function(z) {
      return i[+(z.getUTCHours() >= 12)];
    }, q: function(z) {
      return 1 + ~~(z.getUTCMonth() / 3);
    }, Q: E0, s: S0, S: u2, u: c2, U: f2, V: h2, w: d2, W: p2, x: null, X: null, y: g2, Y: v2, Z: y2, "%": M0 }, E = { a: function(z, C, N) {
      var P = p.exec(C.slice(N));
      return P ? (z.w = b.get(P[0].toLowerCase()), N + P[0].length) : -1;
    }, A: function(z, C, N) {
      var P = d.exec(C.slice(N));
      return P ? (z.w = h.get(P[0].toLowerCase()), N + P[0].length) : -1;
    }, b: function(z, C, N) {
      var P = v.exec(C.slice(N));
      return P ? (z.m = M.get(P[0].toLowerCase()), N + P[0].length) : -1;
    }, B: function(z, C, N) {
      var P = m.exec(C.slice(N));
      return P ? (z.m = g.get(P[0].toLowerCase()), N + P[0].length) : -1;
    }, c: function(z, C, N) {
      return j(z, t, C, N);
    }, d: g0, e: g0, f: Iy, g: p0, G: d0, H: m0, I: m0, j: Ly, L: Oy, m: zy, M: Py, p: function(z, C, N) {
      var P = u.exec(C.slice(N));
      return P ? (z.p = c.get(P[0].toLowerCase()), N + P[0].length) : -1;
    }, q: Cy, Q: Fy, s: jy, S: $y, u: Sy, U: Ty, V: ky, w: Ey, W: Ay, x: function(z, C, N) {
      return j(z, n, C, N);
    }, X: function(z, C, N) {
      return j(z, r, C, N);
    }, y: p0, Y: d0, Z: Ny, "%": Ry };
    function S(z, C) {
      return function(N) {
        var P, T, A, $ = [], I = -1, D = 0, B = z.length;
        for (N instanceof Date || (N = /* @__PURE__ */ new Date(+N)); ++I < B; )
          z.charCodeAt(I) === 37 && ($.push(z.slice(D, I)), (T = h0[P = z.charAt(++I)]) != null ? P = z.charAt(++I) : T = P === "e" ? " " : "0", (A = C[P]) && (P = A(N, T)), $.push(P), D = I + 1);
        return $.push(z.slice(D, I)), $.join("");
      };
    }
    function O(z, C) {
      return function(N) {
        var P, T, A = pi(1900, void 0, 1);
        if (j(A, z, N += "", 0) != N.length)
          return null;
        if ("Q" in A)
          return new Date(A.Q);
        if ("s" in A)
          return new Date(1e3 * A.s + ("L" in A ? A.L : 0));
        if (C && !("Z" in A) && (A.Z = 0), "p" in A && (A.H = A.H % 12 + 12 * A.p), A.m === void 0 && (A.m = "q" in A ? A.q : 0), "V" in A) {
          if (A.V < 1 || A.V > 53)
            return null;
          "w" in A || (A.w = 1), "Z" in A ? (T = (P = Ql(pi(A.y, 0, 1))).getUTCDay(), P = T > 4 || T === 0 ? di.ceil(P) : di(P), P = hi.offset(P, 7 * (A.V - 1)), A.y = P.getUTCFullYear(), A.m = P.getUTCMonth(), A.d = P.getUTCDate() + (A.w + 6) % 7) : (T = (P = Kl(pi(A.y, 0, 1))).getDay(), P = T > 4 || T === 0 ? fi.ceil(P) : fi(P), P = ci.offset(P, 7 * (A.V - 1)), A.y = P.getFullYear(), A.m = P.getMonth(), A.d = P.getDate() + (A.w + 6) % 7);
        } else
          ("W" in A || "U" in A) && ("w" in A || (A.w = "u" in A ? A.u % 7 : "W" in A ? 1 : 0), T = "Z" in A ? Ql(pi(A.y, 0, 1)).getUTCDay() : Kl(pi(A.y, 0, 1)).getDay(), A.m = 0, A.d = "W" in A ? (A.w + 6) % 7 + 7 * A.W - (T + 5) % 7 : A.w + 7 * A.U - (T + 6) % 7);
        return "Z" in A ? (A.H += A.Z / 100 | 0, A.M += A.Z % 100, Ql(A)) : Kl(A);
      };
    }
    function j(z, C, N, P) {
      for (var T, A, $ = 0, I = C.length, D = N.length; $ < I; ) {
        if (P >= D)
          return -1;
        if ((T = C.charCodeAt($++)) === 37) {
          if (T = C.charAt($++), !(A = E[T in h0 ? C.charAt($++) : T]) || (P = A(z, N, P)) < 0)
            return -1;
        } else if (T != N.charCodeAt(P++))
          return -1;
      }
      return P;
    }
    return _.x = S(n, _), _.X = S(r, _), _.c = S(t, _), y.x = S(n, y), y.X = S(r, y), y.c = S(t, y), { format: function(z) {
      var C = S(z += "", _);
      return C.toString = function() {
        return z;
      }, C;
    }, parse: function(z) {
      var C = O(z += "", !1);
      return C.toString = function() {
        return z;
      }, C;
    }, utcFormat: function(z) {
      var C = S(z += "", y);
      return C.toString = function() {
        return z;
      }, C;
    }, utcParse: function(z) {
      var C = O(z += "", !0);
      return C.toString = function() {
        return z;
      }, C;
    } };
  }
  var mr, h0 = { "-": "", _: " ", 0: "0" }, Re = /^\s*\d+/, xy = /^%/, wy = /[\\^$*+?|[\]().{}]/g;
  function _e(e, t, n) {
    var r = e < 0 ? "-" : "", i = (r ? -e : e) + "", o = i.length;
    return r + (o < n ? new Array(n - o + 1).join(t) + i : i);
  }
  function My(e) {
    return e.replace(wy, "\\$&");
  }
  function gi(e) {
    return new RegExp("^(?:" + e.map(My).join("|") + ")", "i");
  }
  function mi(e) {
    return new Map(e.map((t, n) => [t.toLowerCase(), n]));
  }
  function Ey(e, t, n) {
    var r = Re.exec(t.slice(n, n + 1));
    return r ? (e.w = +r[0], n + r[0].length) : -1;
  }
  function Sy(e, t, n) {
    var r = Re.exec(t.slice(n, n + 1));
    return r ? (e.u = +r[0], n + r[0].length) : -1;
  }
  function Ty(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.U = +r[0], n + r[0].length) : -1;
  }
  function ky(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.V = +r[0], n + r[0].length) : -1;
  }
  function Ay(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.W = +r[0], n + r[0].length) : -1;
  }
  function d0(e, t, n) {
    var r = Re.exec(t.slice(n, n + 4));
    return r ? (e.y = +r[0], n + r[0].length) : -1;
  }
  function p0(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
  }
  function Ny(e, t, n) {
    var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
    return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
  }
  function Cy(e, t, n) {
    var r = Re.exec(t.slice(n, n + 1));
    return r ? (e.q = 3 * r[0] - 3, n + r[0].length) : -1;
  }
  function zy(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
  }
  function g0(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.d = +r[0], n + r[0].length) : -1;
  }
  function Ly(e, t, n) {
    var r = Re.exec(t.slice(n, n + 3));
    return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
  }
  function m0(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.H = +r[0], n + r[0].length) : -1;
  }
  function Py(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.M = +r[0], n + r[0].length) : -1;
  }
  function $y(e, t, n) {
    var r = Re.exec(t.slice(n, n + 2));
    return r ? (e.S = +r[0], n + r[0].length) : -1;
  }
  function Oy(e, t, n) {
    var r = Re.exec(t.slice(n, n + 3));
    return r ? (e.L = +r[0], n + r[0].length) : -1;
  }
  function Iy(e, t, n) {
    var r = Re.exec(t.slice(n, n + 6));
    return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
  }
  function Ry(e, t, n) {
    var r = xy.exec(t.slice(n, n + 1));
    return r ? n + r[0].length : -1;
  }
  function Fy(e, t, n) {
    var r = Re.exec(t.slice(n));
    return r ? (e.Q = +r[0], n + r[0].length) : -1;
  }
  function jy(e, t, n) {
    var r = Re.exec(t.slice(n));
    return r ? (e.s = +r[0], n + r[0].length) : -1;
  }
  function v0(e, t) {
    return _e(e.getDate(), t, 2);
  }
  function Dy(e, t) {
    return _e(e.getHours(), t, 2);
  }
  function qy(e, t) {
    return _e(e.getHours() % 12 || 12, t, 2);
  }
  function By(e, t) {
    return _e(1 + ci.count(rn(e), e), t, 3);
  }
  function b0(e, t) {
    return _e(e.getMilliseconds(), t, 3);
  }
  function Uy(e, t) {
    return b0(e, t) + "000";
  }
  function Yy(e, t) {
    return _e(e.getMonth() + 1, t, 2);
  }
  function Hy(e, t) {
    return _e(e.getMinutes(), t, 2);
  }
  function Vy(e, t) {
    return _e(e.getSeconds(), t, 2);
  }
  function Gy(e) {
    var t = e.getDay();
    return t === 0 ? 7 : t;
  }
  function Xy(e, t) {
    return _e(pr.count(rn(e) - 1, e), t, 2);
  }
  function y0(e) {
    var t = e.getDay();
    return t >= 4 || t === 0 ? $n(e) : $n.ceil(e);
  }
  function Zy(e, t) {
    return e = y0(e), _e($n.count(rn(e), e) + (rn(e).getDay() === 4), t, 2);
  }
  function Wy(e) {
    return e.getDay();
  }
  function Jy(e, t) {
    return _e(fi.count(rn(e) - 1, e), t, 2);
  }
  function Ky(e, t) {
    return _e(e.getFullYear() % 100, t, 2);
  }
  function Qy(e, t) {
    return _e((e = y0(e)).getFullYear() % 100, t, 2);
  }
  function e2(e, t) {
    return _e(e.getFullYear() % 1e4, t, 4);
  }
  function t2(e, t) {
    var n = e.getDay();
    return _e((e = n >= 4 || n === 0 ? $n(e) : $n.ceil(e)).getFullYear() % 1e4, t, 4);
  }
  function n2(e) {
    var t = e.getTimezoneOffset();
    return (t > 0 ? "-" : (t *= -1, "+")) + _e(t / 60 | 0, "0", 2) + _e(t % 60, "0", 2);
  }
  function _0(e, t) {
    return _e(e.getUTCDate(), t, 2);
  }
  function r2(e, t) {
    return _e(e.getUTCHours(), t, 2);
  }
  function i2(e, t) {
    return _e(e.getUTCHours() % 12 || 12, t, 2);
  }
  function o2(e, t) {
    return _e(1 + hi.count(on(e), e), t, 3);
  }
  function x0(e, t) {
    return _e(e.getUTCMilliseconds(), t, 3);
  }
  function a2(e, t) {
    return x0(e, t) + "000";
  }
  function s2(e, t) {
    return _e(e.getUTCMonth() + 1, t, 2);
  }
  function l2(e, t) {
    return _e(e.getUTCMinutes(), t, 2);
  }
  function u2(e, t) {
    return _e(e.getUTCSeconds(), t, 2);
  }
  function c2(e) {
    var t = e.getUTCDay();
    return t === 0 ? 7 : t;
  }
  function f2(e, t) {
    return _e(gr.count(on(e) - 1, e), t, 2);
  }
  function w0(e) {
    var t = e.getUTCDay();
    return t >= 4 || t === 0 ? In(e) : In.ceil(e);
  }
  function h2(e, t) {
    return e = w0(e), _e(In.count(on(e), e) + (on(e).getUTCDay() === 4), t, 2);
  }
  function d2(e) {
    return e.getUTCDay();
  }
  function p2(e, t) {
    return _e(di.count(on(e) - 1, e), t, 2);
  }
  function g2(e, t) {
    return _e(e.getUTCFullYear() % 100, t, 2);
  }
  function m2(e, t) {
    return _e((e = w0(e)).getUTCFullYear() % 100, t, 2);
  }
  function v2(e, t) {
    return _e(e.getUTCFullYear() % 1e4, t, 4);
  }
  function b2(e, t) {
    var n = e.getUTCDay();
    return _e((e = n >= 4 || n === 0 ? In(e) : In.ceil(e)).getUTCFullYear() % 1e4, t, 4);
  }
  function y2() {
    return "+0000";
  }
  function M0() {
    return "%";
  }
  function E0(e) {
    return +e;
  }
  function S0(e) {
    return Math.floor(+e / 1e3);
  }
  function T0(e) {
    return mr = f0(e), f.timeFormat = mr.format, f.timeParse = mr.parse, f.utcFormat = mr.utcFormat, f.utcParse = mr.utcParse, mr;
  }
  f.timeFormat = void 0, f.timeParse = void 0, f.utcFormat = void 0, f.utcParse = void 0, T0({ dateTime: "%x, %X", date: "%-m/%-d/%Y", time: "%-I:%M:%S %p", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] });
  var k0 = "%Y-%m-%dT%H:%M:%S.%LZ", _2 = Date.prototype.toISOString ? function(e) {
    return e.toISOString();
  } : f.utcFormat(k0), x2 = _2, w2 = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? function(e) {
    var t = new Date(e);
    return isNaN(t) ? null : t;
  } : f.utcParse(k0), M2 = w2;
  function E2(e) {
    return new Date(e);
  }
  function S2(e) {
    return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
  }
  function eu(e, t, n, r, i, o, a, s, l, u) {
    var c = Pl(), d = c.invert, h = c.domain, p = u(".%L"), b = u(":%S"), m = u("%I:%M"), g = u("%I %p"), v = u("%a %d"), M = u("%b %d"), _ = u("%B"), y = u("%Y");
    function E(S) {
      return (l(S) < S ? p : s(S) < S ? b : a(S) < S ? m : o(S) < S ? g : r(S) < S ? i(S) < S ? v : M : n(S) < S ? _ : y)(S);
    }
    return c.invert = function(S) {
      return new Date(d(S));
    }, c.domain = function(S) {
      return arguments.length ? h(Array.from(S, S2)) : h().map(E2);
    }, c.ticks = function(S) {
      var O = h();
      return e(O[0], O[O.length - 1], S ?? 10);
    }, c.tickFormat = function(S, O) {
      return O == null ? E : u(O);
    }, c.nice = function(S) {
      var O = h();
      return S && typeof S.range == "function" || (S = t(O[0], O[O.length - 1], S ?? 10)), S ? h(zd(O, S)) : c;
    }, c.copy = function() {
      return si(c, eu(e, t, n, r, i, o, a, s, l, u));
    }, c;
  }
  function ea() {
    var e, t, n, r, i, o = 0, a = 1, s = nt, l = !1;
    function u(d) {
      return d == null || isNaN(d = +d) ? i : s(n === 0 ? 0.5 : (d = (r(d) - e) * n, l ? Math.max(0, Math.min(1, d)) : d));
    }
    function c(d) {
      return function(h) {
        var p, b;
        return arguments.length ? ([p, b] = h, s = d(p, b), u) : [s(0), s(1)];
      };
    }
    return u.domain = function(d) {
      return arguments.length ? ([o, a] = d, e = r(o = +o), t = r(a = +a), n = e === t ? 0 : 1 / (t - e), u) : [o, a];
    }, u.clamp = function(d) {
      return arguments.length ? (l = !!d, u) : l;
    }, u.interpolator = function(d) {
      return arguments.length ? (s = d, u) : s;
    }, u.range = c(Gt), u.rangeRound = c(Bi), u.unknown = function(d) {
      return arguments.length ? (i = d, u) : i;
    }, function(d) {
      return r = d, e = d(o), t = d(a), n = e === t ? 0 : 1 / (t - e), u;
    };
  }
  function an(e, t) {
    return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
  }
  function tu() {
    var e = Il(ea());
    return e.copy = function() {
      return an(e, tu()).exponent(e.exponent());
    }, Bt.apply(e, arguments);
  }
  function ta() {
    var e, t, n, r, i, o, a, s = 0, l = 0.5, u = 1, c = 1, d = nt, h = !1;
    function p(m) {
      return isNaN(m = +m) ? a : (m = 0.5 + ((m = +o(m)) - t) * (c * m < c * t ? r : i), d(h ? Math.max(0, Math.min(1, m)) : m));
    }
    function b(m) {
      return function(g) {
        var v, M, _;
        return arguments.length ? ([v, M, _] = g, d = Dc(m, [v, M, _]), p) : [d(0), d(0.5), d(1)];
      };
    }
    return p.domain = function(m) {
      return arguments.length ? ([s, l, u] = m, e = o(s = +s), t = o(l = +l), n = o(u = +u), r = e === t ? 0 : 0.5 / (t - e), i = t === n ? 0 : 0.5 / (n - t), c = t < e ? -1 : 1, p) : [s, l, u];
    }, p.clamp = function(m) {
      return arguments.length ? (h = !!m, p) : h;
    }, p.interpolator = function(m) {
      return arguments.length ? (d = m, p) : d;
    }, p.range = b(Gt), p.rangeRound = b(Bi), p.unknown = function(m) {
      return arguments.length ? (a = m, p) : a;
    }, function(m) {
      return o = m, e = m(s), t = m(l), n = m(u), r = e === t ? 0 : 0.5 / (t - e), i = t === n ? 0 : 0.5 / (n - t), c = t < e ? -1 : 1, p;
    };
  }
  function nu() {
    var e = Il(ta());
    return e.copy = function() {
      return an(e, nu()).exponent(e.exponent());
    }, Bt.apply(e, arguments);
  }
  function fe(e) {
    for (var t = e.length / 6 | 0, n = new Array(t), r = 0; r < t; )
      n[r] = "#" + e.slice(6 * r, 6 * ++r);
    return n;
  }
  var T2 = fe("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), k2 = fe("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"), A2 = fe("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), N2 = fe("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), C2 = fe("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), z2 = fe("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), L2 = fe("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), P2 = fe("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), $2 = fe("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"), O2 = fe("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab"), Ee = (e) => Sc(e[e.length - 1]), A0 = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(fe), I2 = Ee(A0), N0 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(fe), R2 = Ee(N0), C0 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(fe), F2 = Ee(C0), z0 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(fe), j2 = Ee(z0), L0 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(fe), D2 = Ee(L0), P0 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(fe), q2 = Ee(P0), $0 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(fe), B2 = Ee($0), O0 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(fe), U2 = Ee(O0), I0 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(fe), Y2 = Ee(I0), R0 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(fe), H2 = Ee(R0), F0 = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(fe), V2 = Ee(F0), j0 = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(fe), G2 = Ee(j0), D0 = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(fe), X2 = Ee(D0), q0 = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(fe), Z2 = Ee(q0), B0 = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(fe), W2 = Ee(B0), U0 = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(fe), J2 = Ee(U0), Y0 = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(fe), K2 = Ee(Y0), H0 = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(fe), Q2 = Ee(H0), V0 = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(fe), e_ = Ee(V0), G0 = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(fe), t_ = Ee(G0), X0 = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(fe), n_ = Ee(X0), Z0 = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(fe), r_ = Ee(Z0), W0 = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(fe), i_ = Ee(W0), J0 = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(fe), o_ = Ee(J0), K0 = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(fe), a_ = Ee(K0), Q0 = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(fe), s_ = Ee(Q0), ep = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(fe), l_ = Ee(ep), u_ = Yi(_t(300, 0.5, 0), _t(-240, 0.5, 1)), c_ = Yi(_t(-100, 0.75, 0.35), _t(80, 1.5, 0.8)), f_ = Yi(_t(260, 0.75, 0.35), _t(80, 1.5, 0.8)), na = _t(), ra = Xn(), h_ = Math.PI / 3, d_ = 2 * Math.PI / 3;
  function ia(e) {
    var t = e.length;
    return function(n) {
      return e[Math.max(0, Math.min(t - 1, Math.floor(n * t)))];
    };
  }
  var p_ = ia(fe("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")), g_ = ia(fe("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), m_ = ia(fe("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), v_ = ia(fe("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
  function ce(e) {
    return function() {
      return e;
    };
  }
  const tp = Math.abs, Ye = Math.atan2, Ut = Math.cos, b_ = Math.max, vr = Math.min, st = Math.sin, Se = Math.sqrt, He = 1e-12, sn = Math.PI, oa = sn / 2, ln = 2 * sn;
  function y_(e) {
    return e > 1 ? 0 : e < -1 ? sn : Math.acos(e);
  }
  function np(e) {
    return e >= 1 ? oa : e <= -1 ? -oa : Math.asin(e);
  }
  function __(e) {
    return e.innerRadius;
  }
  function x_(e) {
    return e.outerRadius;
  }
  function w_(e) {
    return e.startAngle;
  }
  function M_(e) {
    return e.endAngle;
  }
  function E_(e) {
    return e && e.padAngle;
  }
  function S_(e, t, n, r, i, o, a, s) {
    var l = n - e, u = r - t, c = a - i, d = s - o, h = d * l - c * u;
    if (!(h * h < He))
      return [e + (h = (c * (t - o) - d * (e - i)) / h) * l, t + h * u];
  }
  function aa(e, t, n, r, i, o, a) {
    var s = e - n, l = t - r, u = (a ? o : -o) / Se(s * s + l * l), c = u * l, d = -u * s, h = e + c, p = t + d, b = n + c, m = r + d, g = (h + b) / 2, v = (p + m) / 2, M = b - h, _ = m - p, y = M * M + _ * _, E = i - o, S = h * m - b * p, O = (_ < 0 ? -1 : 1) * Se(b_(0, E * E * y - S * S)), j = (S * _ - M * O) / y, z = (-S * M - _ * O) / y, C = (S * _ + M * O) / y, N = (-S * M + _ * O) / y, P = j - g, T = z - v, A = C - g, $ = N - v;
    return P * P + T * T > A * A + $ * $ && (j = C, z = N), { cx: j, cy: z, x01: -c, y01: -d, x11: j * (i / E - 1), y11: z * (i / E - 1) };
  }
  var T_ = Array.prototype.slice;
  function sa(e) {
    return typeof e == "object" && "length" in e ? e : Array.from(e);
  }
  function rp(e) {
    this._context = e;
  }
  function la(e) {
    return new rp(e);
  }
  function ru(e) {
    return e[0];
  }
  function iu(e) {
    return e[1];
  }
  function ou(e, t) {
    var n = ce(!0), r = null, i = la, o = null;
    function a(s) {
      var l, u, c, d = (s = sa(s)).length, h = !1;
      for (r == null && (o = i(c = Zt())), l = 0; l <= d; ++l)
        !(l < d && n(u = s[l], l, s)) === h && ((h = !h) ? o.lineStart() : o.lineEnd()), h && o.point(+e(u, l, s), +t(u, l, s));
      if (c)
        return o = null, c + "" || null;
    }
    return e = typeof e == "function" ? e : e === void 0 ? ru : ce(e), t = typeof t == "function" ? t : t === void 0 ? iu : ce(t), a.x = function(s) {
      return arguments.length ? (e = typeof s == "function" ? s : ce(+s), a) : e;
    }, a.y = function(s) {
      return arguments.length ? (t = typeof s == "function" ? s : ce(+s), a) : t;
    }, a.defined = function(s) {
      return arguments.length ? (n = typeof s == "function" ? s : ce(!!s), a) : n;
    }, a.curve = function(s) {
      return arguments.length ? (i = s, r != null && (o = i(r)), a) : i;
    }, a.context = function(s) {
      return arguments.length ? (s == null ? r = o = null : o = i(r = s), a) : r;
    }, a;
  }
  function ip(e, t, n) {
    var r = null, i = ce(!0), o = null, a = la, s = null;
    function l(c) {
      var d, h, p, b, m, g = (c = sa(c)).length, v = !1, M = new Array(g), _ = new Array(g);
      for (o == null && (s = a(m = Zt())), d = 0; d <= g; ++d) {
        if (!(d < g && i(b = c[d], d, c)) === v)
          if (v = !v)
            h = d, s.areaStart(), s.lineStart();
          else {
            for (s.lineEnd(), s.lineStart(), p = d - 1; p >= h; --p)
              s.point(M[p], _[p]);
            s.lineEnd(), s.areaEnd();
          }
        v && (M[d] = +e(b, d, c), _[d] = +t(b, d, c), s.point(r ? +r(b, d, c) : M[d], n ? +n(b, d, c) : _[d]));
      }
      if (m)
        return s = null, m + "" || null;
    }
    function u() {
      return ou().defined(i).curve(a).context(o);
    }
    return e = typeof e == "function" ? e : e === void 0 ? ru : ce(+e), t = typeof t == "function" ? t : ce(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? iu : ce(+n), l.x = function(c) {
      return arguments.length ? (e = typeof c == "function" ? c : ce(+c), r = null, l) : e;
    }, l.x0 = function(c) {
      return arguments.length ? (e = typeof c == "function" ? c : ce(+c), l) : e;
    }, l.x1 = function(c) {
      return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : ce(+c), l) : r;
    }, l.y = function(c) {
      return arguments.length ? (t = typeof c == "function" ? c : ce(+c), n = null, l) : t;
    }, l.y0 = function(c) {
      return arguments.length ? (t = typeof c == "function" ? c : ce(+c), l) : t;
    }, l.y1 = function(c) {
      return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : ce(+c), l) : n;
    }, l.lineX0 = l.lineY0 = function() {
      return u().x(e).y(t);
    }, l.lineY1 = function() {
      return u().x(e).y(n);
    }, l.lineX1 = function() {
      return u().x(r).y(t);
    }, l.defined = function(c) {
      return arguments.length ? (i = typeof c == "function" ? c : ce(!!c), l) : i;
    }, l.curve = function(c) {
      return arguments.length ? (a = c, o != null && (s = a(o)), l) : a;
    }, l.context = function(c) {
      return arguments.length ? (c == null ? o = s = null : s = a(o = c), l) : o;
    }, l;
  }
  function k_(e, t) {
    return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
  }
  function A_(e) {
    return e;
  }
  rp.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._point = 0;
  }, lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
    }
  } };
  var op = au(la);
  function ap(e) {
    this._curve = e;
  }
  function au(e) {
    function t(n) {
      return new ap(e(n));
    }
    return t._curve = e, t;
  }
  function vi(e) {
    var t = e.curve;
    return e.angle = e.x, delete e.x, e.radius = e.y, delete e.y, e.curve = function(n) {
      return arguments.length ? t(au(n)) : t()._curve;
    }, e;
  }
  function sp() {
    return vi(ou().curve(op));
  }
  function lp() {
    var e = ip().curve(op), t = e.curve, n = e.lineX0, r = e.lineX1, i = e.lineY0, o = e.lineY1;
    return e.angle = e.x, delete e.x, e.startAngle = e.x0, delete e.x0, e.endAngle = e.x1, delete e.x1, e.radius = e.y, delete e.y, e.innerRadius = e.y0, delete e.y0, e.outerRadius = e.y1, delete e.y1, e.lineStartAngle = function() {
      return vi(n());
    }, delete e.lineX0, e.lineEndAngle = function() {
      return vi(r());
    }, delete e.lineX1, e.lineInnerRadius = function() {
      return vi(i());
    }, delete e.lineY0, e.lineOuterRadius = function() {
      return vi(o());
    }, delete e.lineY1, e.curve = function(a) {
      return arguments.length ? t(au(a)) : t()._curve;
    }, e;
  }
  function bi(e, t) {
    return [(t = +t) * Math.cos(e -= Math.PI / 2), t * Math.sin(e)];
  }
  ap.prototype = { areaStart: function() {
    this._curve.areaStart();
  }, areaEnd: function() {
    this._curve.areaEnd();
  }, lineStart: function() {
    this._curve.lineStart();
  }, lineEnd: function() {
    this._curve.lineEnd();
  }, point: function(e, t) {
    this._curve.point(t * Math.sin(e), t * -Math.cos(e));
  } };
  class up {
    constructor(t, n) {
      this._context = t, this._x = n;
    }
    areaStart() {
      this._line = 0;
    }
    areaEnd() {
      this._line = NaN;
    }
    lineStart() {
      this._point = 0;
    }
    lineEnd() {
      (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
    }
    point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
          break;
        case 1:
          this._point = 2;
        default:
          this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, n, t, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, t, this._y0, t, n);
      }
      this._x0 = t, this._y0 = n;
    }
  }
  class N_ {
    constructor(t) {
      this._context = t;
    }
    lineStart() {
      this._point = 0;
    }
    lineEnd() {
    }
    point(t, n) {
      if (t = +t, n = +n, this._point++ == 0)
        this._x0 = t, this._y0 = n;
      else {
        const r = bi(this._x0, this._y0), i = bi(this._x0, this._y0 = (this._y0 + n) / 2), o = bi(t, this._y0), a = bi(t, n);
        this._context.moveTo(...r), this._context.bezierCurveTo(...i, ...o, ...a);
      }
    }
  }
  function cp(e) {
    return new up(e, !0);
  }
  function fp(e) {
    return new up(e, !1);
  }
  function C_(e) {
    return new N_(e);
  }
  function z_(e) {
    return e.source;
  }
  function L_(e) {
    return e.target;
  }
  function ua(e) {
    let t = z_, n = L_, r = ru, i = iu, o = null, a = null;
    function s() {
      let l;
      const u = T_.call(arguments), c = t.apply(this, u), d = n.apply(this, u);
      if (o == null && (a = e(l = Zt())), a.lineStart(), u[0] = c, a.point(+r.apply(this, u), +i.apply(this, u)), u[0] = d, a.point(+r.apply(this, u), +i.apply(this, u)), a.lineEnd(), l)
        return a = null, l + "" || null;
    }
    return s.source = function(l) {
      return arguments.length ? (t = l, s) : t;
    }, s.target = function(l) {
      return arguments.length ? (n = l, s) : n;
    }, s.x = function(l) {
      return arguments.length ? (r = typeof l == "function" ? l : ce(+l), s) : r;
    }, s.y = function(l) {
      return arguments.length ? (i = typeof l == "function" ? l : ce(+l), s) : i;
    }, s.context = function(l) {
      return arguments.length ? (l == null ? o = a = null : a = e(o = l), s) : o;
    }, s;
  }
  const P_ = Se(3);
  var hp = { draw(e, t) {
    const n = 0.59436 * Se(t + vr(t / 28, 0.75)), r = n / 2, i = r * P_;
    e.moveTo(0, n), e.lineTo(0, -n), e.moveTo(-i, -r), e.lineTo(i, r), e.moveTo(-i, r), e.lineTo(i, -r);
  } }, ca = { draw(e, t) {
    const n = Se(t / sn);
    e.moveTo(n, 0), e.arc(0, 0, n, 0, ln);
  } }, dp = { draw(e, t) {
    const n = Se(t / 5) / 2;
    e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
  } };
  const pp = Se(1 / 3), $_ = 2 * pp;
  var gp = { draw(e, t) {
    const n = Se(t / $_), r = n * pp;
    e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
  } }, mp = { draw(e, t) {
    const n = 0.62625 * Se(t);
    e.moveTo(0, -n), e.lineTo(n, 0), e.lineTo(0, n), e.lineTo(-n, 0), e.closePath();
  } }, vp = { draw(e, t) {
    const n = 0.87559 * Se(t - vr(t / 7, 2));
    e.moveTo(-n, 0), e.lineTo(n, 0), e.moveTo(0, n), e.lineTo(0, -n);
  } }, bp = { draw(e, t) {
    const n = Se(t), r = -n / 2;
    e.rect(r, r, n, n);
  } }, yp = { draw(e, t) {
    const n = 0.4431 * Se(t);
    e.moveTo(n, n), e.lineTo(n, -n), e.lineTo(-n, -n), e.lineTo(-n, n), e.closePath();
  } };
  const _p = st(sn / 10) / st(7 * sn / 10), O_ = st(ln / 10) * _p, I_ = -Ut(ln / 10) * _p;
  var xp = { draw(e, t) {
    const n = Se(0.8908130915292852 * t), r = O_ * n, i = I_ * n;
    e.moveTo(0, -n), e.lineTo(r, i);
    for (let o = 1; o < 5; ++o) {
      const a = ln * o / 5, s = Ut(a), l = st(a);
      e.lineTo(l * n, -s * n), e.lineTo(s * r - l * i, l * r + s * i);
    }
    e.closePath();
  } };
  const su = Se(3);
  var wp = { draw(e, t) {
    const n = -Se(t / (3 * su));
    e.moveTo(0, 2 * n), e.lineTo(-su * n, -n), e.lineTo(su * n, -n), e.closePath();
  } };
  const R_ = Se(3);
  var Mp = { draw(e, t) {
    const n = 0.6824 * Se(t), r = n / 2, i = n * R_ / 2;
    e.moveTo(0, -n), e.lineTo(i, r), e.lineTo(-i, r), e.closePath();
  } };
  const mt = -0.5, vt = Se(3) / 2, lu = 1 / Se(12), F_ = 3 * (lu / 2 + 1);
  var Ep = { draw(e, t) {
    const n = Se(t / F_), r = n / 2, i = n * lu, o = r, a = n * lu + n, s = -o, l = a;
    e.moveTo(r, i), e.lineTo(o, a), e.lineTo(s, l), e.lineTo(mt * r - vt * i, vt * r + mt * i), e.lineTo(mt * o - vt * a, vt * o + mt * a), e.lineTo(mt * s - vt * l, vt * s + mt * l), e.lineTo(mt * r + vt * i, mt * i - vt * r), e.lineTo(mt * o + vt * a, mt * a - vt * o), e.lineTo(mt * s + vt * l, mt * l - vt * s), e.closePath();
  } }, Sp = { draw(e, t) {
    const n = 0.6189 * Se(t - vr(t / 6, 1.7));
    e.moveTo(-n, -n), e.lineTo(n, n), e.moveTo(-n, n), e.lineTo(n, -n);
  } };
  const Tp = [ca, dp, gp, bp, xp, wp, Ep], j_ = [ca, vp, Sp, Mp, hp, yp, mp];
  function un() {
  }
  function fa(e, t, n) {
    e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + n) / 6);
  }
  function ha(e) {
    this._context = e;
  }
  function kp(e) {
    this._context = e;
  }
  function Ap(e) {
    this._context = e;
  }
  function Np(e, t) {
    this._basis = new ha(e), this._beta = t;
  }
  ha.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  }, lineEnd: function() {
    switch (this._point) {
      case 3:
        fa(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        fa(this, e, t);
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  } }, kp.prototype = { areaStart: un, areaEnd: un, lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  }, lineEnd: function() {
    switch (this._point) {
      case 1:
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      case 2:
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      case 3:
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
    }
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        fa(this, e, t);
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  } }, Ap.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  }, lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var n = (this._x0 + 4 * this._x1 + e) / 6, r = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
        break;
      case 3:
        this._point = 4;
      default:
        fa(this, e, t);
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  } }, Np.prototype = { lineStart: function() {
    this._x = [], this._y = [], this._basis.lineStart();
  }, lineEnd: function() {
    var e = this._x, t = this._y, n = e.length - 1;
    if (n > 0)
      for (var r, i = e[0], o = t[0], a = e[n] - i, s = t[n] - o, l = -1; ++l <= n; )
        r = l / n, this._basis.point(this._beta * e[l] + (1 - this._beta) * (i + r * a), this._beta * t[l] + (1 - this._beta) * (o + r * s));
    this._x = this._y = null, this._basis.lineEnd();
  }, point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  } };
  var D_ = function e(t) {
    function n(r) {
      return t === 1 ? new ha(r) : new Np(r, t);
    }
    return n.beta = function(r) {
      return e(+r);
    }, n;
  }(0.85);
  function da(e, t, n) {
    e._context.bezierCurveTo(e._x1 + e._k * (e._x2 - e._x0), e._y1 + e._k * (e._y2 - e._y0), e._x2 + e._k * (e._x1 - t), e._y2 + e._k * (e._y1 - n), e._x2, e._y2);
  }
  function uu(e, t) {
    this._context = e, this._k = (1 - t) / 6;
  }
  uu.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  }, lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        da(this, this._x1, this._y1);
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2, this._x1 = e, this._y1 = t;
        break;
      case 2:
        this._point = 3;
      default:
        da(this, e, t);
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  } };
  var q_ = function e(t) {
    function n(r) {
      return new uu(r, t);
    }
    return n.tension = function(r) {
      return e(+r);
    }, n;
  }(0);
  function cu(e, t) {
    this._context = e, this._k = (1 - t) / 6;
  }
  cu.prototype = { areaStart: un, areaEnd: un, lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  }, lineEnd: function() {
    switch (this._point) {
      case 1:
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      case 2:
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      case 3:
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
    }
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        da(this, e, t);
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  } };
  var B_ = function e(t) {
    function n(r) {
      return new cu(r, t);
    }
    return n.tension = function(r) {
      return e(+r);
    }, n;
  }(0);
  function fu(e, t) {
    this._context = e, this._k = (1 - t) / 6;
  }
  fu.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  }, lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        da(this, e, t);
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  } };
  var U_ = function e(t) {
    function n(r) {
      return new fu(r, t);
    }
    return n.tension = function(r) {
      return e(+r);
    }, n;
  }(0);
  function hu(e, t, n) {
    var r = e._x1, i = e._y1, o = e._x2, a = e._y2;
    if (e._l01_a > He) {
      var s = 2 * e._l01_2a + 3 * e._l01_a * e._l12_a + e._l12_2a, l = 3 * e._l01_a * (e._l01_a + e._l12_a);
      r = (r * s - e._x0 * e._l12_2a + e._x2 * e._l01_2a) / l, i = (i * s - e._y0 * e._l12_2a + e._y2 * e._l01_2a) / l;
    }
    if (e._l23_a > He) {
      var u = 2 * e._l23_2a + 3 * e._l23_a * e._l12_a + e._l12_2a, c = 3 * e._l23_a * (e._l23_a + e._l12_a);
      o = (o * u + e._x1 * e._l23_2a - t * e._l12_2a) / c, a = (a * u + e._y1 * e._l23_2a - n * e._l12_2a) / c;
    }
    e._context.bezierCurveTo(r, i, o, a, e._x2, e._y2);
  }
  function Cp(e, t) {
    this._context = e, this._alpha = t;
  }
  Cp.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  }, lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var n = this._x2 - e, r = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        hu(this, e, t);
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  } };
  var Y_ = function e(t) {
    function n(r) {
      return t ? new Cp(r, t) : new uu(r, 0);
    }
    return n.alpha = function(r) {
      return e(+r);
    }, n;
  }(0.5);
  function zp(e, t) {
    this._context = e, this._alpha = t;
  }
  zp.prototype = { areaStart: un, areaEnd: un, lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  }, lineEnd: function() {
    switch (this._point) {
      case 1:
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      case 2:
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      case 3:
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
    }
  }, point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var n = this._x2 - e, r = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        hu(this, e, t);
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  } };
  var H_ = function e(t) {
    function n(r) {
      return t ? new zp(r, t) : new cu(r, 0);
    }
    return n.alpha = function(r) {
      return e(+r);
    }, n;
  }(0.5);
  function Lp(e, t) {
    this._context = e, this._alpha = t;
  }
  Lp.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  }, lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var n = this._x2 - e, r = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        hu(this, e, t);
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  } };
  var V_ = function e(t) {
    function n(r) {
      return t ? new Lp(r, t) : new fu(r, 0);
    }
    return n.alpha = function(r) {
      return e(+r);
    }, n;
  }(0.5);
  function Pp(e) {
    this._context = e;
  }
  function $p(e) {
    return e < 0 ? -1 : 1;
  }
  function Op(e, t, n) {
    var r = e._x1 - e._x0, i = t - e._x1, o = (e._y1 - e._y0) / (r || i < 0 && -0), a = (n - e._y1) / (i || r < 0 && -0), s = (o * i + a * r) / (r + i);
    return ($p(o) + $p(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(s)) || 0;
  }
  function Ip(e, t) {
    var n = e._x1 - e._x0;
    return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
  }
  function du(e, t, n) {
    var r = e._x0, i = e._y0, o = e._x1, a = e._y1, s = (o - r) / 3;
    e._context.bezierCurveTo(r + s, i + s * t, o - s, a - s * n, o, a);
  }
  function pa(e) {
    this._context = e;
  }
  function Rp(e) {
    this._context = new Fp(e);
  }
  function Fp(e) {
    this._context = e;
  }
  function jp(e) {
    this._context = e;
  }
  function Dp(e) {
    var t, n, r = e.length - 1, i = new Array(r), o = new Array(r), a = new Array(r);
    for (i[0] = 0, o[0] = 2, a[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t)
      i[t] = 1, o[t] = 4, a[t] = 4 * e[t] + 2 * e[t + 1];
    for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t)
      n = i[t] / o[t - 1], o[t] -= n, a[t] -= n * a[t - 1];
    for (i[r - 1] = a[r - 1] / o[r - 1], t = r - 2; t >= 0; --t)
      i[t] = (a[t] - i[t + 1]) / o[t];
    for (o[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t)
      o[t] = 2 * e[t + 1] - i[t + 1];
    return [i, o];
  }
  function ga(e, t) {
    this._context = e, this._t = t;
  }
  function br(e, t) {
    if ((i = e.length) > 1)
      for (var n, r, i, o = 1, a = e[t[0]], s = a.length; o < i; ++o)
        for (r = a, a = e[t[o]], n = 0; n < s; ++n)
          a[n][1] += a[n][0] = isNaN(r[n][1]) ? r[n][0] : r[n][1];
  }
  function yr(e) {
    for (var t = e.length, n = new Array(t); --t >= 0; )
      n[t] = t;
    return n;
  }
  function G_(e, t) {
    return e[t];
  }
  function X_(e) {
    const t = [];
    return t.key = e, t;
  }
  function qp(e) {
    var t = e.map(Z_);
    return yr(e).sort(function(n, r) {
      return t[n] - t[r];
    });
  }
  function Z_(e) {
    for (var t, n = -1, r = 0, i = e.length, o = -1 / 0; ++n < i; )
      (t = +e[n][1]) > o && (o = t, r = n);
    return r;
  }
  function Bp(e) {
    var t = e.map(Up);
    return yr(e).sort(function(n, r) {
      return t[n] - t[r];
    });
  }
  function Up(e) {
    for (var t, n = 0, r = -1, i = e.length; ++r < i; )
      (t = +e[r][1]) && (n += t);
    return n;
  }
  Pp.prototype = { areaStart: un, areaEnd: un, lineStart: function() {
    this._point = 0;
  }, lineEnd: function() {
    this._point && this._context.closePath();
  }, point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  } }, pa.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  }, lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        du(this, this._t0, Ip(this, this._t0));
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }, point: function(e, t) {
    var n = NaN;
    if (t = +t, (e = +e) !== this._x1 || t !== this._y1) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, du(this, Ip(this, n = Op(this, e, t)), n);
          break;
        default:
          du(this, this._t0, n = Op(this, e, t));
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
    }
  } }, (Rp.prototype = Object.create(pa.prototype)).point = function(e, t) {
    pa.prototype.point.call(this, t, e);
  }, Fp.prototype = { moveTo: function(e, t) {
    this._context.moveTo(t, e);
  }, closePath: function() {
    this._context.closePath();
  }, lineTo: function(e, t) {
    this._context.lineTo(t, e);
  }, bezierCurveTo: function(e, t, n, r, i, o) {
    this._context.bezierCurveTo(t, e, r, n, o, i);
  } }, jp.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x = [], this._y = [];
  }, lineEnd: function() {
    var e = this._x, t = this._y, n = e.length;
    if (n)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var r = Dp(e), i = Dp(t), o = 0, a = 1; a < n; ++o, ++a)
          this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], e[a], t[a]);
    (this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  }, point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  } }, ga.prototype = { areaStart: function() {
    this._line = 0;
  }, areaEnd: function() {
    this._line = NaN;
  }, lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  }, lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  }, point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var n = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(n, this._y), this._context.lineTo(n, t);
        }
    }
    this._x = e, this._y = t;
  } };
  var ma = (e) => () => e;
  function W_(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
    Object.defineProperties(this, { type: { value: e, enumerable: !0, configurable: !0 }, sourceEvent: { value: t, enumerable: !0, configurable: !0 }, target: { value: n, enumerable: !0, configurable: !0 }, transform: { value: r, enumerable: !0, configurable: !0 }, _: { value: i } });
  }
  function $t(e, t, n) {
    this.k = e, this.x = t, this.y = n;
  }
  $t.prototype = { constructor: $t, scale: function(e) {
    return e === 1 ? this : new $t(this.k * e, this.x, this.y);
  }, translate: function(e, t) {
    return e === 0 & t === 0 ? this : new $t(this.k, this.x + this.k * e, this.y + this.k * t);
  }, apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  }, applyX: function(e) {
    return e * this.k + this.x;
  }, applyY: function(e) {
    return e * this.k + this.y;
  }, invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  }, invertX: function(e) {
    return (e - this.x) / this.k;
  }, invertY: function(e) {
    return (e - this.y) / this.k;
  }, rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  }, rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  }, toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  } };
  var va = new $t(1, 0, 0);
  function Yp(e) {
    for (; !e.__zoom; )
      if (!(e = e.parentNode))
        return va;
    return e.__zoom;
  }
  function pu(e) {
    e.stopImmediatePropagation();
  }
  function yi(e) {
    e.preventDefault(), e.stopImmediatePropagation();
  }
  function J_(e) {
    return !(e.ctrlKey && e.type !== "wheel" || e.button);
  }
  function K_() {
    var e = this;
    return e instanceof SVGElement ? (e = e.ownerSVGElement || e).hasAttribute("viewBox") ? [[(e = e.viewBox.baseVal).x, e.y], [e.x + e.width, e.y + e.height]] : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]] : [[0, 0], [e.clientWidth, e.clientHeight]];
  }
  function Hp() {
    return this.__zoom || va;
  }
  function Q_(e) {
    return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
  }
  function ex() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function tx(e, t, n) {
    var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], a = e.invertY(t[1][1]) - n[1][1];
    return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a));
  }
  Yp.prototype = $t.prototype, f.Adder = me, f.Delaunay = Ms, f.FormatSpecifier = so, f.InternMap = je, f.InternSet = ut, f.Node = zn, f.Voronoi = wf, f.ZoomTransform = $t, f.active = function(e, t) {
    var n, r, i = e.__transition;
    if (i) {
      for (r in t = t == null ? null : t + "", i)
        if ((n = i[r]).state > 1 && n.name === t)
          return new Nt([[e]], Sm, t, +r);
    }
    return null;
  }, f.arc = function() {
    var e = __, t = x_, n = ce(0), r = null, i = w_, o = M_, a = E_, s = null;
    function l() {
      var u, c, d = +e.apply(this, arguments), h = +t.apply(this, arguments), p = i.apply(this, arguments) - oa, b = o.apply(this, arguments) - oa, m = tp(b - p), g = b > p;
      if (s || (s = u = Zt()), h < d && (c = h, h = d, d = c), h > He)
        if (m > ln - He)
          s.moveTo(h * Ut(p), h * st(p)), s.arc(0, 0, h, p, b, !g), d > He && (s.moveTo(d * Ut(b), d * st(b)), s.arc(0, 0, d, b, p, g));
        else {
          var v, M, _ = p, y = b, E = p, S = b, O = m, j = m, z = a.apply(this, arguments) / 2, C = z > He && (r ? +r.apply(this, arguments) : Se(d * d + h * h)), N = vr(tp(h - d) / 2, +n.apply(this, arguments)), P = N, T = N;
          if (C > He) {
            var A = np(C / d * st(z)), $ = np(C / h * st(z));
            (O -= 2 * A) > He ? (E += A *= g ? 1 : -1, S -= A) : (O = 0, E = S = (p + b) / 2), (j -= 2 * $) > He ? (_ += $ *= g ? 1 : -1, y -= $) : (j = 0, _ = y = (p + b) / 2);
          }
          var I = h * Ut(_), D = h * st(_), B = d * Ut(S), H = d * st(S);
          if (N > He) {
            var Z, V = h * Ut(y), ae = h * st(y), se = d * Ut(E), K = d * st(E);
            if (m < sn && (Z = S_(I, D, se, K, V, ae, B, H))) {
              var te = I - Z[0], ye = D - Z[1], he = V - Z[0], rt = ae - Z[1], cn = 1 / st(y_((te * he + ye * rt) / (Se(te * te + ye * ye) * Se(he * he + rt * rt))) / 2), St = Se(Z[0] * Z[0] + Z[1] * Z[1]);
              P = vr(N, (d - St) / (cn - 1)), T = vr(N, (h - St) / (cn + 1));
            }
          }
          j > He ? T > He ? (v = aa(se, K, I, D, h, T, g), M = aa(V, ae, B, H, h, T, g), s.moveTo(v.cx + v.x01, v.cy + v.y01), T < N ? s.arc(v.cx, v.cy, T, Ye(v.y01, v.x01), Ye(M.y01, M.x01), !g) : (s.arc(v.cx, v.cy, T, Ye(v.y01, v.x01), Ye(v.y11, v.x11), !g), s.arc(0, 0, h, Ye(v.cy + v.y11, v.cx + v.x11), Ye(M.cy + M.y11, M.cx + M.x11), !g), s.arc(M.cx, M.cy, T, Ye(M.y11, M.x11), Ye(M.y01, M.x01), !g))) : (s.moveTo(I, D), s.arc(0, 0, h, _, y, !g)) : s.moveTo(I, D), d > He && O > He ? P > He ? (v = aa(B, H, V, ae, d, -P, g), M = aa(I, D, se, K, d, -P, g), s.lineTo(v.cx + v.x01, v.cy + v.y01), P < N ? s.arc(v.cx, v.cy, P, Ye(v.y01, v.x01), Ye(M.y01, M.x01), !g) : (s.arc(v.cx, v.cy, P, Ye(v.y01, v.x01), Ye(v.y11, v.x11), !g), s.arc(0, 0, d, Ye(v.cy + v.y11, v.cx + v.x11), Ye(M.cy + M.y11, M.cx + M.x11), g), s.arc(M.cx, M.cy, P, Ye(M.y11, M.x11), Ye(M.y01, M.x01), !g))) : s.arc(0, 0, d, S, E, g) : s.lineTo(B, H);
        }
      else
        s.moveTo(0, 0);
      if (s.closePath(), u)
        return s = null, u + "" || null;
    }
    return l.centroid = function() {
      var u = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, c = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - sn / 2;
      return [Ut(c) * u, st(c) * u];
    }, l.innerRadius = function(u) {
      return arguments.length ? (e = typeof u == "function" ? u : ce(+u), l) : e;
    }, l.outerRadius = function(u) {
      return arguments.length ? (t = typeof u == "function" ? u : ce(+u), l) : t;
    }, l.cornerRadius = function(u) {
      return arguments.length ? (n = typeof u == "function" ? u : ce(+u), l) : n;
    }, l.padRadius = function(u) {
      return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : ce(+u), l) : r;
    }, l.startAngle = function(u) {
      return arguments.length ? (i = typeof u == "function" ? u : ce(+u), l) : i;
    }, l.endAngle = function(u) {
      return arguments.length ? (o = typeof u == "function" ? u : ce(+u), l) : o;
    }, l.padAngle = function(u) {
      return arguments.length ? (a = typeof u == "function" ? u : ce(+u), l) : a;
    }, l.context = function(u) {
      return arguments.length ? (s = u ?? null, l) : s;
    }, l;
  }, f.area = ip, f.areaRadial = lp, f.ascending = w, f.autoType = function(e) {
    for (var t in e) {
      var n, r, i = e[t].trim();
      if (i)
        if (i === "true")
          i = !0;
        else if (i === "false")
          i = !1;
        else if (i === "NaN")
          i = NaN;
        else if (isNaN(n = +i)) {
          if (!(r = i.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)))
            continue;
          yv && r[4] && !r[7] && (i = i.replace(/-/g, "/").replace(/T/, " ")), i = new Date(i);
        } else
          i = n;
      else
        i = null;
      e[t] = i;
    }
    return e;
  }, f.axisBottom = function(e) {
    return Si(3, e);
  }, f.axisLeft = function(e) {
    return Si(4, e);
  }, f.axisRight = function(e) {
    return Si(2, e);
  }, f.axisTop = function(e) {
    return Si(1, e);
  }, f.bin = zu, f.bisect = G, f.bisectCenter = Y, f.bisectLeft = q, f.bisectRight = X, f.bisector = k, f.blob = function(e, t) {
    return fetch(e, t).then(_v);
  }, f.brush = function() {
    return fs(Am);
  }, f.brushSelection = function(e) {
    var t = e.__brush;
    return t ? t.dim.output(t.selection) : null;
  }, f.brushX = function() {
    return fs(Ji);
  }, f.brushY = function() {
    return fs(Ki);
  }, f.buffer = function(e, t) {
    return fetch(e, t).then(xv);
  }, f.chord = function() {
    return ps(!1, !1);
  }, f.chordDirected = function() {
    return ps(!0, !1);
  }, f.chordTranspose = function() {
    return ps(!1, !0);
  }, f.cluster = function() {
    var e = pb, t = 1, n = 1, r = !1;
    function i(o) {
      var a, s = 0;
      o.eachAfter(function(h) {
        var p = h.children;
        p ? (h.x = function(b) {
          return b.reduce(gb, 0) / b.length;
        }(p), h.y = function(b) {
          return 1 + b.reduce(mb, 0);
        }(p)) : (h.x = a ? s += e(h, a) : 0, h.y = 0, a = h);
      });
      var l = function(h) {
        for (var p; p = h.children; )
          h = p[0];
        return h;
      }(o), u = function(h) {
        for (var p; p = h.children; )
          h = p[p.length - 1];
        return h;
      }(o), c = l.x - e(l, u) / 2, d = u.x + e(u, l) / 2;
      return o.eachAfter(r ? function(h) {
        h.x = (h.x - o.x) * t, h.y = (o.y - h.y) * n;
      } : function(h) {
        h.x = (h.x - c) / (d - c) * t, h.y = (1 - (o.y ? h.y / o.y : 1)) * n;
      });
    }
    return i.separation = function(o) {
      return arguments.length ? (e = o, i) : e;
    }, i.size = function(o) {
      return arguments.length ? (r = !1, t = +o[0], n = +o[1], i) : r ? null : [t, n];
    }, i.nodeSize = function(o) {
      return arguments.length ? (r = !0, t = +o[0], n = +o[1], i) : r ? [t, n] : null;
    }, i;
  }, f.color = Vt, f.contourDensity = function() {
    var e = Zm, t = Wm, n = Jm, r = 960, i = 500, o = 20, a = 2, s = 3 * o, l = r + 2 * s >> a, u = i + 2 * s >> a, c = Wt(20);
    function d(v) {
      var M = new Float32Array(l * u), _ = new Float32Array(l * u), y = Math.pow(2, -a);
      v.forEach(function(O, j, z) {
        var C = (e(O, j, z) + s) * y, N = (t(O, j, z) + s) * y, P = +n(O, j, z);
        if (C >= 0 && C < l && N >= 0 && N < u) {
          var T = Math.floor(C), A = Math.floor(N), $ = C - T - 0.5, I = N - A - 0.5;
          M[T + A * l] += (1 - $) * (1 - I) * P, M[T + 1 + A * l] += $ * (1 - I) * P, M[T + 1 + (A + 1) * l] += $ * I * P, M[T + (A + 1) * l] += (1 - $) * I * P;
        }
      }), bs({ width: l, height: u, data: M }, { width: l, height: u, data: _ }, o >> a), ys({ width: l, height: u, data: _ }, { width: l, height: u, data: M }, o >> a), bs({ width: l, height: u, data: M }, { width: l, height: u, data: _ }, o >> a), ys({ width: l, height: u, data: _ }, { width: l, height: u, data: M }, o >> a), bs({ width: l, height: u, data: M }, { width: l, height: u, data: _ }, o >> a), ys({ width: l, height: u, data: _ }, { width: l, height: u, data: M }, o >> a);
      var E = c(M);
      if (!Array.isArray(E)) {
        var S = Mi(M);
        E = Un(0, S, E), (E = It(0, Math.floor(S / E) * E, E)).shift();
      }
      return mf().thresholds(E).size([l, u])(M).map(h);
    }
    function h(v) {
      return v.value *= Math.pow(2, -2 * a), v.coordinates.forEach(p), v;
    }
    function p(v) {
      v.forEach(b);
    }
    function b(v) {
      v.forEach(m);
    }
    function m(v) {
      v[0] = v[0] * Math.pow(2, a) - s, v[1] = v[1] * Math.pow(2, a) - s;
    }
    function g() {
      return l = r + 2 * (s = 3 * o) >> a, u = i + 2 * s >> a, d;
    }
    return d.x = function(v) {
      return arguments.length ? (e = typeof v == "function" ? v : Wt(+v), d) : e;
    }, d.y = function(v) {
      return arguments.length ? (t = typeof v == "function" ? v : Wt(+v), d) : t;
    }, d.weight = function(v) {
      return arguments.length ? (n = typeof v == "function" ? v : Wt(+v), d) : n;
    }, d.size = function(v) {
      if (!arguments.length)
        return [r, i];
      var M = +v[0], _ = +v[1];
      if (!(M >= 0 && _ >= 0))
        throw new Error("invalid size");
      return r = M, i = _, g();
    }, d.cellSize = function(v) {
      if (!arguments.length)
        return 1 << a;
      if (!((v = +v) >= 1))
        throw new Error("invalid cell size");
      return a = Math.floor(Math.log(v) / Math.LN2), g();
    }, d.thresholds = function(v) {
      return arguments.length ? (c = typeof v == "function" ? v : Array.isArray(v) ? Wt(gf.call(v)) : Wt(v), d) : c;
    }, d.bandwidth = function(v) {
      if (!arguments.length)
        return Math.sqrt(o * (o + 1));
      if (!((v = +v) >= 0))
        throw new Error("invalid bandwidth");
      return o = Math.round((Math.sqrt(4 * v * v + 1) - 1) / 2), g();
    }, d;
  }, f.contours = mf, f.count = re, f.create = function(e) {
    return De(ki(e).call(document.documentElement));
  }, f.creator = ki, f.cross = function(...e) {
    const t = typeof e[e.length - 1] == "function" && /* @__PURE__ */ function(a) {
      return (s) => a(...s);
    }(e.pop()), n = (e = e.map(Q)).map(ie), r = e.length - 1, i = new Array(r + 1).fill(0), o = [];
    if (r < 0 || n.some(W))
      return o;
    for (; ; ) {
      o.push(i.map((s, l) => e[l][s]));
      let a = r;
      for (; ++i[a] === n[a]; ) {
        if (a === 0)
          return t ? o.map(t) : o;
        i[a--] = 0;
      }
    }
  }, f.csv = Mv, f.csvFormat = lv, f.csvFormatBody = uv, f.csvFormatRow = fv, f.csvFormatRows = cv, f.csvFormatValue = hv, f.csvParse = Tf, f.csvParseRows = sv, f.cubehelix = _t, f.cumsum = function(e, t) {
    var n = 0, r = 0;
    return Float64Array.from(e, t === void 0 ? (i) => n += +i || 0 : (i) => n += +t(i, r++, e) || 0);
  }, f.curveBasis = function(e) {
    return new ha(e);
  }, f.curveBasisClosed = function(e) {
    return new kp(e);
  }, f.curveBasisOpen = function(e) {
    return new Ap(e);
  }, f.curveBumpX = cp, f.curveBumpY = fp, f.curveBundle = D_, f.curveCardinal = q_, f.curveCardinalClosed = B_, f.curveCardinalOpen = U_, f.curveCatmullRom = Y_, f.curveCatmullRomClosed = H_, f.curveCatmullRomOpen = V_, f.curveLinear = la, f.curveLinearClosed = function(e) {
    return new Pp(e);
  }, f.curveMonotoneX = function(e) {
    return new pa(e);
  }, f.curveMonotoneY = function(e) {
    return new Rp(e);
  }, f.curveNatural = function(e) {
    return new jp(e);
  }, f.curveStep = function(e) {
    return new ga(e, 0.5);
  }, f.curveStepAfter = function(e) {
    return new ga(e, 1);
  }, f.curveStepBefore = function(e) {
    return new ga(e, 0);
  }, f.descending = x, f.deviation = ge, f.difference = function(e, ...t) {
    e = new ut(e);
    for (const n of t)
      for (const r of n)
        e.delete(r);
    return e;
  }, f.disjoint = function(e, t) {
    const n = t[Symbol.iterator](), r = new ut();
    for (const i of e) {
      if (r.has(i))
        return !1;
      let o, a;
      for (; ({ value: o, done: a } = n.next()) && !a; ) {
        if (Object.is(i, o))
          return !1;
        r.add(o);
      }
    }
    return !0;
  }, f.dispatch = pn, f.drag = function() {
    var e, t, n, r, i = Mg, o = Eg, a = Sg, s = Tg, l = {}, u = pn("start", "drag", "end"), c = 0, d = 0;
    function h(y) {
      y.on("mousedown.drag", p).filter(s).on("touchstart.drag", g).on("touchmove.drag", v, wg).on("touchend.drag touchcancel.drag", M).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function p(y, E) {
      if (!r && i.call(this, y, E)) {
        var S = _(this, o.call(this, y, E), y, E, "mouse");
        S && (De(y.view).on("mousemove.drag", b, Tr).on("mouseup.drag", m, Tr), Ci(y.view), Fa(y), n = !1, e = y.clientX, t = y.clientY, S("start", y));
      }
    }
    function b(y) {
      if (Yn(y), !n) {
        var E = y.clientX - e, S = y.clientY - t;
        n = E * E + S * S > d;
      }
      l.mouse("drag", y);
    }
    function m(y) {
      De(y.view).on("mousemove.drag mouseup.drag", null), zi(y.view, n), Yn(y), l.mouse("end", y);
    }
    function g(y, E) {
      if (i.call(this, y, E)) {
        var S, O, j = y.changedTouches, z = o.call(this, y, E), C = j.length;
        for (S = 0; S < C; ++S)
          (O = _(this, z, y, E, j[S].identifier, j[S])) && (Fa(y), O("start", y, j[S]));
      }
    }
    function v(y) {
      var E, S, O = y.changedTouches, j = O.length;
      for (E = 0; E < j; ++E)
        (S = l[O[E].identifier]) && (Yn(y), S("drag", y, O[E]));
    }
    function M(y) {
      var E, S, O = y.changedTouches, j = O.length;
      for (r && clearTimeout(r), r = setTimeout(function() {
        r = null;
      }, 500), E = 0; E < j; ++E)
        (S = l[O[E].identifier]) && (Fa(y), S("end", y, O[E]));
    }
    function _(y, E, S, O, j, z) {
      var C, N, P, T = u.copy(), A = ct(z || S, E);
      if ((P = a.call(y, new ja("beforestart", { sourceEvent: S, target: h, identifier: j, active: c, x: A[0], y: A[1], dx: 0, dy: 0, dispatch: T }), O)) != null)
        return C = P.x - A[0] || 0, N = P.y - A[1] || 0, function $(I, D, B) {
          var H, Z = A;
          switch (I) {
            case "start":
              l[j] = $, H = c++;
              break;
            case "end":
              delete l[j], --c;
            case "drag":
              A = ct(B || D, E), H = c;
          }
          T.call(I, y, new ja(I, { sourceEvent: D, subject: P, target: h, identifier: j, active: H, x: A[0] + C, y: A[1] + N, dx: A[0] - Z[0], dy: A[1] - Z[1], dispatch: T }), O);
        };
    }
    return h.filter = function(y) {
      return arguments.length ? (i = typeof y == "function" ? y : Li(!!y), h) : i;
    }, h.container = function(y) {
      return arguments.length ? (o = typeof y == "function" ? y : Li(y), h) : o;
    }, h.subject = function(y) {
      return arguments.length ? (a = typeof y == "function" ? y : Li(y), h) : a;
    }, h.touchable = function(y) {
      return arguments.length ? (s = typeof y == "function" ? y : Li(!!y), h) : s;
    }, h.on = function() {
      var y = u.on.apply(u, arguments);
      return y === u ? h : y;
    }, h.clickDistance = function(y) {
      return arguments.length ? (d = (y = +y) * y, h) : Math.sqrt(d);
    }, h;
  }, f.dragDisable = Ci, f.dragEnable = zi, f.dsv = function(e, t, n, r) {
    arguments.length === 3 && typeof n == "function" && (r = n, n = void 0);
    var i = ro(e);
    return io(t, n).then(function(o) {
      return i.parse(o, r);
    });
  }, f.dsvFormat = ro, f.easeBack = tf, f.easeBackIn = ym, f.easeBackInOut = tf, f.easeBackOut = _m, f.easeBounce = Rr, f.easeBounceIn = function(e) {
    return 1 - Rr(1 - e);
  }, f.easeBounceInOut = function(e) {
    return ((e *= 2) <= 1 ? 1 - Rr(1 - e) : Rr(e - 1) + 1) / 2;
  }, f.easeBounceOut = Rr, f.easeCircle = ef, f.easeCircleIn = function(e) {
    return 1 - Math.sqrt(1 - e * e);
  }, f.easeCircleInOut = ef, f.easeCircleOut = function(e) {
    return Math.sqrt(1 - --e * e);
  }, f.easeCubic = is, f.easeCubicIn = function(e) {
    return e * e * e;
  }, f.easeCubicInOut = is, f.easeCubicOut = function(e) {
    return --e * e * e + 1;
  }, f.easeElastic = nf, f.easeElasticIn = xm, f.easeElasticInOut = wm, f.easeElasticOut = nf, f.easeExp = Qc, f.easeExpIn = function(e) {
    return Xt(1 - +e);
  }, f.easeExpInOut = Qc, f.easeExpOut = function(e) {
    return 1 - Xt(e);
  }, f.easeLinear = (e) => +e, f.easePoly = Zc, f.easePolyIn = mm, f.easePolyInOut = Zc, f.easePolyOut = vm, f.easeQuad = Xc, f.easeQuadIn = function(e) {
    return e * e;
  }, f.easeQuadInOut = Xc, f.easeQuadOut = function(e) {
    return e * (2 - e);
  }, f.easeSin = Kc, f.easeSinIn = function(e) {
    return +e == 1 ? 1 : 1 - Math.cos(e * Jc);
  }, f.easeSinInOut = Kc, f.easeSinOut = function(e) {
    return Math.sin(e * Jc);
  }, f.every = function(e, t) {
    if (typeof t != "function")
      throw new TypeError("test is not a function");
    let n = -1;
    for (const r of e)
      if (!t(r, ++n, e))
        return !1;
    return !0;
  }, f.extent = Ce, f.fcumsum = function(e, t) {
    const n = new me();
    let r = -1;
    return Float64Array.from(e, t === void 0 ? (i) => n.add(+i || 0) : (i) => n.add(+t(i, ++r, e) || 0));
  }, f.filter = function(e, t) {
    if (typeof t != "function")
      throw new TypeError("test is not a function");
    const n = [];
    let r = -1;
    for (const i of e)
      t(i, ++r, e) && n.push(i);
    return n;
  }, f.flatGroup = function(e, ...t) {
    return Su(Eu(e, ...t), t);
  }, f.flatRollup = function(e, t, ...n) {
    return Su(ku(e, t, ...n), n);
  }, f.forceCenter = function(e, t) {
    var n, r = 1;
    function i() {
      var o, a, s = n.length, l = 0, u = 0;
      for (o = 0; o < s; ++o)
        l += (a = n[o]).x, u += a.y;
      for (l = (l / s - e) * r, u = (u / s - t) * r, o = 0; o < s; ++o)
        (a = n[o]).x -= l, a.y -= u;
    }
    return e == null && (e = 0), t == null && (t = 0), i.initialize = function(o) {
      n = o;
    }, i.x = function(o) {
      return arguments.length ? (e = +o, i) : e;
    }, i.y = function(o) {
      return arguments.length ? (t = +o, i) : t;
    }, i.strength = function(o) {
      return arguments.length ? (r = +o, i) : r;
    }, i;
  }, f.forceCollide = function(e) {
    var t, n, r, i = 1, o = 1;
    function a() {
      for (var u, c, d, h, p, b, m, g = t.length, v = 0; v < o; ++v)
        for (c = oo(t, zv, Lv).visitAfter(s), u = 0; u < g; ++u)
          d = t[u], b = n[d.index], m = b * b, h = d.x + d.vx, p = d.y + d.vy, c.visit(M);
      function M(_, y, E, S, O) {
        var j = _.data, z = _.r, C = b + z;
        if (!j)
          return y > h + C || S < h - C || E > p + C || O < p - C;
        if (j.index > d.index) {
          var N = h - j.x - j.vx, P = p - j.y - j.vy, T = N * N + P * P;
          T < C * C && (N === 0 && (T += (N = Jt(r)) * N), P === 0 && (T += (P = Jt(r)) * P), T = (C - (T = Math.sqrt(T))) / T * i, d.vx += (N *= T) * (C = (z *= z) / (m + z)), d.vy += (P *= T) * C, j.vx -= N * (C = 1 - C), j.vy -= P * C);
        }
      }
    }
    function s(u) {
      if (u.data)
        return u.r = n[u.data.index];
      for (var c = u.r = 0; c < 4; ++c)
        u[c] && u[c].r > u.r && (u.r = u[c].r);
    }
    function l() {
      if (t) {
        var u, c, d = t.length;
        for (n = new Array(d), u = 0; u < d; ++u)
          c = t[u], n[c.index] = +e(c, u, t);
      }
    }
    return typeof e != "function" && (e = ze(e == null ? 1 : +e)), a.initialize = function(u, c) {
      t = u, r = c, l();
    }, a.iterations = function(u) {
      return arguments.length ? (o = +u, a) : o;
    }, a.strength = function(u) {
      return arguments.length ? (i = +u, a) : i;
    }, a.radius = function(u) {
      return arguments.length ? (e = typeof u == "function" ? u : ze(+u), l(), a) : e;
    }, a;
  }, f.forceLink = function(e) {
    var t, n, r, i, o, a, s = Pv, l = function(m) {
      return 1 / Math.min(i[m.source.index], i[m.target.index]);
    }, u = ze(30), c = 1;
    function d(m) {
      for (var g = 0, v = e.length; g < c; ++g)
        for (var M, _, y, E, S, O, j, z = 0; z < v; ++z)
          _ = (M = e[z]).source, E = (y = M.target).x + y.vx - _.x - _.vx || Jt(a), S = y.y + y.vy - _.y - _.vy || Jt(a), E *= O = ((O = Math.sqrt(E * E + S * S)) - n[z]) / O * m * t[z], S *= O, y.vx -= E * (j = o[z]), y.vy -= S * j, _.vx += E * (j = 1 - j), _.vy += S * j;
    }
    function h() {
      if (r) {
        var m, g, v = r.length, M = e.length, _ = new Map(r.map((y, E) => [s(y, E, r), y]));
        for (m = 0, i = new Array(v); m < M; ++m)
          (g = e[m]).index = m, typeof g.source != "object" && (g.source = zf(_, g.source)), typeof g.target != "object" && (g.target = zf(_, g.target)), i[g.source.index] = (i[g.source.index] || 0) + 1, i[g.target.index] = (i[g.target.index] || 0) + 1;
        for (m = 0, o = new Array(M); m < M; ++m)
          g = e[m], o[m] = i[g.source.index] / (i[g.source.index] + i[g.target.index]);
        t = new Array(M), p(), n = new Array(M), b();
      }
    }
    function p() {
      if (r)
        for (var m = 0, g = e.length; m < g; ++m)
          t[m] = +l(e[m], m, e);
    }
    function b() {
      if (r)
        for (var m = 0, g = e.length; m < g; ++m)
          n[m] = +u(e[m], m, e);
    }
    return e == null && (e = []), d.initialize = function(m, g) {
      r = m, a = g, h();
    }, d.links = function(m) {
      return arguments.length ? (e = m, h(), d) : e;
    }, d.id = function(m) {
      return arguments.length ? (s = m, d) : s;
    }, d.iterations = function(m) {
      return arguments.length ? (c = +m, d) : c;
    }, d.strength = function(m) {
      return arguments.length ? (l = typeof m == "function" ? m : ze(+m), p(), d) : l;
    }, d.distance = function(m) {
      return arguments.length ? (u = typeof m == "function" ? m : ze(+m), b(), d) : u;
    }, d;
  }, f.forceManyBody = function() {
    var e, t, n, r, i, o = ze(-30), a = 1, s = 1 / 0, l = 0.81;
    function u(p) {
      var b, m = e.length, g = oo(e, $v, Ov).visitAfter(d);
      for (r = p, b = 0; b < m; ++b)
        t = e[b], g.visit(h);
    }
    function c() {
      if (e) {
        var p, b, m = e.length;
        for (i = new Array(m), p = 0; p < m; ++p)
          b = e[p], i[b.index] = +o(b, p, e);
      }
    }
    function d(p) {
      var b, m, g, v, M, _ = 0, y = 0;
      if (p.length) {
        for (g = v = M = 0; M < 4; ++M)
          (b = p[M]) && (m = Math.abs(b.value)) && (_ += b.value, y += m, g += m * b.x, v += m * b.y);
        p.x = g / y, p.y = v / y;
      } else {
        (b = p).x = b.data.x, b.y = b.data.y;
        do
          _ += i[b.data.index];
        while (b = b.next);
      }
      p.value = _;
    }
    function h(p, b, m, g) {
      if (!p.value)
        return !0;
      var v = p.x - t.x, M = p.y - t.y, _ = g - b, y = v * v + M * M;
      if (_ * _ / l < y)
        return y < s && (v === 0 && (y += (v = Jt(n)) * v), M === 0 && (y += (M = Jt(n)) * M), y < a && (y = Math.sqrt(a * y)), t.vx += v * p.value * r / y, t.vy += M * p.value * r / y), !0;
      if (!(p.length || y >= s)) {
        (p.data !== t || p.next) && (v === 0 && (y += (v = Jt(n)) * v), M === 0 && (y += (M = Jt(n)) * M), y < a && (y = Math.sqrt(a * y)));
        do
          p.data !== t && (_ = i[p.data.index] * r / y, t.vx += v * _, t.vy += M * _);
        while (p = p.next);
      }
    }
    return u.initialize = function(p, b) {
      e = p, n = b, c();
    }, u.strength = function(p) {
      return arguments.length ? (o = typeof p == "function" ? p : ze(+p), c(), u) : o;
    }, u.distanceMin = function(p) {
      return arguments.length ? (a = p * p, u) : Math.sqrt(a);
    }, u.distanceMax = function(p) {
      return arguments.length ? (s = p * p, u) : Math.sqrt(s);
    }, u.theta = function(p) {
      return arguments.length ? (l = p * p, u) : Math.sqrt(l);
    }, u;
  }, f.forceRadial = function(e, t, n) {
    var r, i, o, a = ze(0.1);
    function s(u) {
      for (var c = 0, d = r.length; c < d; ++c) {
        var h = r[c], p = h.x - t || 1e-6, b = h.y - n || 1e-6, m = Math.sqrt(p * p + b * b), g = (o[c] - m) * i[c] * u / m;
        h.vx += p * g, h.vy += b * g;
      }
    }
    function l() {
      if (r) {
        var u, c = r.length;
        for (i = new Array(c), o = new Array(c), u = 0; u < c; ++u)
          o[u] = +e(r[u], u, r), i[u] = isNaN(o[u]) ? 0 : +a(r[u], u, r);
      }
    }
    return typeof e != "function" && (e = ze(+e)), t == null && (t = 0), n == null && (n = 0), s.initialize = function(u) {
      r = u, l();
    }, s.strength = function(u) {
      return arguments.length ? (a = typeof u == "function" ? u : ze(+u), l(), s) : a;
    }, s.radius = function(u) {
      return arguments.length ? (e = typeof u == "function" ? u : ze(+u), l(), s) : e;
    }, s.x = function(u) {
      return arguments.length ? (t = +u, s) : t;
    }, s.y = function(u) {
      return arguments.length ? (n = +u, s) : n;
    }, s;
  }, f.forceSimulation = function(e) {
    var t, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, a = 0.6, s = /* @__PURE__ */ new Map(), l = Xi(d), u = pn("tick", "end"), c = /* @__PURE__ */ function() {
      let m = 1;
      return () => (m = (1664525 * m + 1013904223) % Lf) / Lf;
    }();
    function d() {
      h(), u.call("tick", t), n < r && (l.stop(), u.call("end", t));
    }
    function h(m) {
      var g, v, M = e.length;
      m === void 0 && (m = 1);
      for (var _ = 0; _ < m; ++_)
        for (n += (o - n) * i, s.forEach(function(y) {
          y(n);
        }), g = 0; g < M; ++g)
          (v = e[g]).fx == null ? v.x += v.vx *= a : (v.x = v.fx, v.vx = 0), v.fy == null ? v.y += v.vy *= a : (v.y = v.fy, v.vy = 0);
      return t;
    }
    function p() {
      for (var m, g = 0, v = e.length; g < v; ++g) {
        if ((m = e[g]).index = g, m.fx != null && (m.x = m.fx), m.fy != null && (m.y = m.fy), isNaN(m.x) || isNaN(m.y)) {
          var M = 10 * Math.sqrt(0.5 + g), _ = g * Iv;
          m.x = M * Math.cos(_), m.y = M * Math.sin(_);
        }
        (isNaN(m.vx) || isNaN(m.vy)) && (m.vx = m.vy = 0);
      }
    }
    function b(m) {
      return m.initialize && m.initialize(e, c), m;
    }
    return e == null && (e = []), p(), t = { tick: h, restart: function() {
      return l.restart(d), t;
    }, stop: function() {
      return l.stop(), t;
    }, nodes: function(m) {
      return arguments.length ? (e = m, p(), s.forEach(b), t) : e;
    }, alpha: function(m) {
      return arguments.length ? (n = +m, t) : n;
    }, alphaMin: function(m) {
      return arguments.length ? (r = +m, t) : r;
    }, alphaDecay: function(m) {
      return arguments.length ? (i = +m, t) : +i;
    }, alphaTarget: function(m) {
      return arguments.length ? (o = +m, t) : o;
    }, velocityDecay: function(m) {
      return arguments.length ? (a = 1 - m, t) : 1 - a;
    }, randomSource: function(m) {
      return arguments.length ? (c = m, s.forEach(b), t) : c;
    }, force: function(m, g) {
      return arguments.length > 1 ? (g == null ? s.delete(m) : s.set(m, b(g)), t) : s.get(m);
    }, find: function(m, g, v) {
      var M, _, y, E, S, O = 0, j = e.length;
      for (v == null ? v = 1 / 0 : v *= v, O = 0; O < j; ++O)
        (y = (M = m - (E = e[O]).x) * M + (_ = g - E.y) * _) < v && (S = E, v = y);
      return S;
    }, on: function(m, g) {
      return arguments.length > 1 ? (u.on(m, g), t) : u.on(m);
    } };
  }, f.forceX = function(e) {
    var t, n, r, i = ze(0.1);
    function o(s) {
      for (var l, u = 0, c = t.length; u < c; ++u)
        (l = t[u]).vx += (r[u] - l.x) * n[u] * s;
    }
    function a() {
      if (t) {
        var s, l = t.length;
        for (n = new Array(l), r = new Array(l), s = 0; s < l; ++s)
          n[s] = isNaN(r[s] = +e(t[s], s, t)) ? 0 : +i(t[s], s, t);
      }
    }
    return typeof e != "function" && (e = ze(e == null ? 0 : +e)), o.initialize = function(s) {
      t = s, a();
    }, o.strength = function(s) {
      return arguments.length ? (i = typeof s == "function" ? s : ze(+s), a(), o) : i;
    }, o.x = function(s) {
      return arguments.length ? (e = typeof s == "function" ? s : ze(+s), a(), o) : e;
    }, o;
  }, f.forceY = function(e) {
    var t, n, r, i = ze(0.1);
    function o(s) {
      for (var l, u = 0, c = t.length; u < c; ++u)
        (l = t[u]).vy += (r[u] - l.y) * n[u] * s;
    }
    function a() {
      if (t) {
        var s, l = t.length;
        for (n = new Array(l), r = new Array(l), s = 0; s < l; ++s)
          n[s] = isNaN(r[s] = +e(t[s], s, t)) ? 0 : +i(t[s], s, t);
      }
    }
    return typeof e != "function" && (e = ze(e == null ? 0 : +e)), o.initialize = function(s) {
      t = s, a();
    }, o.strength = function(s) {
      return arguments.length ? (i = typeof s == "function" ? s : ze(+s), a(), o) : i;
    }, o.y = function(s) {
      return arguments.length ? (e = typeof s == "function" ? s : ze(+s), a(), o) : e;
    }, o;
  }, f.formatDefaultLocale = Df, f.formatLocale = jf, f.formatSpecifier = or, f.fsum = function(e, t) {
    const n = new me();
    if (t === void 0)
      for (let r of e)
        (r = +r) && n.add(r);
    else {
      let r = -1;
      for (let i of e)
        (i = +t(i, ++r, e)) && n.add(i);
    }
    return +n;
  }, f.geoAlbers = Qh, f.geoAlbersUsa = function() {
    var e, t, n, r, i, o, a = Qh(), s = Uo().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), l = Uo().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), u = { point: function(h, p) {
      o = [h, p];
    } };
    function c(h) {
      var p = h[0], b = h[1];
      return o = null, n.point(p, b), o || (r.point(p, b), o) || (i.point(p, b), o);
    }
    function d() {
      return e = t = null, c;
    }
    return c.invert = function(h) {
      var p = a.scale(), b = a.translate(), m = (h[0] - b[0]) / p, g = (h[1] - b[1]) / p;
      return (g >= 0.12 && g < 0.234 && m >= -0.425 && m < -0.214 ? s : g >= 0.166 && g < 0.234 && m >= -0.214 && m < -0.115 ? l : a).invert(h);
    }, c.stream = function(h) {
      return e && t === h ? e : (p = [a.stream(t = h), s.stream(h), l.stream(h)], b = p.length, e = { point: function(m, g) {
        for (var v = -1; ++v < b; )
          p[v].point(m, g);
      }, sphere: function() {
        for (var m = -1; ++m < b; )
          p[m].sphere();
      }, lineStart: function() {
        for (var m = -1; ++m < b; )
          p[m].lineStart();
      }, lineEnd: function() {
        for (var m = -1; ++m < b; )
          p[m].lineEnd();
      }, polygonStart: function() {
        for (var m = -1; ++m < b; )
          p[m].polygonStart();
      }, polygonEnd: function() {
        for (var m = -1; ++m < b; )
          p[m].polygonEnd();
      } });
      var p, b;
    }, c.precision = function(h) {
      return arguments.length ? (a.precision(h), s.precision(h), l.precision(h), d()) : a.precision();
    }, c.scale = function(h) {
      return arguments.length ? (a.scale(h), s.scale(0.35 * h), l.scale(h), c.translate(a.translate())) : a.scale();
    }, c.translate = function(h) {
      if (!arguments.length)
        return a.translate();
      var p = a.scale(), b = +h[0], m = +h[1];
      return n = a.translate(h).clipExtent([[b - 0.455 * p, m - 0.238 * p], [b + 0.455 * p, m + 0.238 * p]]).stream(u), r = s.translate([b - 0.307 * p, m + 0.201 * p]).clipExtent([[b - 0.425 * p + ue, m + 0.12 * p + ue], [b - 0.214 * p - ue, m + 0.234 * p - ue]]).stream(u), i = l.translate([b - 0.205 * p, m + 0.212 * p]).clipExtent([[b - 0.214 * p + ue, m + 0.166 * p + ue], [b - 0.115 * p - ue, m + 0.234 * p - ue]]).stream(u), d();
    }, c.fitExtent = function(h, p) {
      return Bo(c, h, p);
    }, c.fitSize = function(h, p) {
      return al(c, h, p);
    }, c.fitWidth = function(h, p) {
      return sl(c, h, p);
    }, c.fitHeight = function(h, p) {
      return ll(c, h, p);
    }, c.scale(1070);
  }, f.geoArea = function(e) {
    return mo = new me(), wt(e, Ct), 2 * mo;
  }, f.geoAzimuthalEqualArea = function() {
    return Pt(fl).scale(124.75).clipAngle(179.999);
  }, f.geoAzimuthalEqualAreaRaw = fl, f.geoAzimuthalEquidistant = function() {
    return Pt(hl).scale(79.4188).clipAngle(179.999);
  }, f.geoAzimuthalEquidistantRaw = hl, f.geoBounds = function(e) {
    var t, n, r, i, o, a, s;
    if (ft = Ne = -(ke = at = 1 / 0), Kt = [], wt(e, qt), n = Kt.length) {
      for (Kt.sort(Uv), t = 1, o = [r = Kt[0]]; t < n; ++t)
        sh(r, (i = Kt[t])[0]) || sh(r, i[1]) ? (ht(r[0], i[1]) > ht(r[0], r[1]) && (r[1] = i[1]), ht(i[0], r[1]) > ht(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
      for (a = -1 / 0, t = 0, r = o[n = o.length - 1]; t <= n; r = i, ++t)
        i = o[t], (s = ht(r[1], i[0])) > a && (a = s, ke = i[0], Ne = r[1]);
    }
    return Kt = Dt = null, ke === 1 / 0 || at === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[ke, at], [Ne, ft]];
  }, f.geoCentroid = function(e) {
    Br = xo = wo = Mo = Eo = So = To = ko = 0, Os = new me(), Is = new me(), Rs = new me(), wt(e, Mt);
    var t = +Os, n = +Is, r = +Rs, i = ks(t, n, r);
    return i < uo && (t = So, n = To, r = ko, xo < ue && (t = wo, n = Mo, r = Eo), (i = ks(t, n, r)) < uo) ? [NaN, NaN] : [Je(n, t) * Me, Ke(r / i) * Me];
  }, f.geoCircle = function() {
    var e, t, n = ur([0, 0]), r = ur(90), i = ur(6), o = { point: function(s, l) {
      e.push(s = t(s, l)), s[0] *= Me, s[1] *= Me;
    } };
    function a() {
      var s = n.apply(this, arguments), l = r.apply(this, arguments) * le, u = i.apply(this, arguments) * le;
      return e = [], t = Bs(-s[0] * le, -s[1] * le, 0).invert, gh(o, l, u, 1), s = { type: "Polygon", coordinates: [e] }, e = t = null, s;
    }
    return a.center = function(s) {
      return arguments.length ? (n = typeof s == "function" ? s : ur([+s[0], +s[1]]), a) : n;
    }, a.radius = function(s) {
      return arguments.length ? (r = typeof s == "function" ? s : ur(+s), a) : r;
    }, a.precision = function(s) {
      return arguments.length ? (i = typeof s == "function" ? s : ur(+s), a) : i;
    }, a;
  }, f.geoClipAntimeridian = Ys, f.geoClipCircle = wh, f.geoClipExtent = function() {
    var e, t, n, r = 0, i = 0, o = 960, a = 500;
    return n = { stream: function(s) {
      return e && t === s ? e : e = Po(r, i, o, a)(t = s);
    }, extent: function(s) {
      return arguments.length ? (r = +s[0][0], i = +s[0][1], o = +s[1][0], a = +s[1][1], e = t = null, n) : [[r, i], [o, a]];
    } };
  }, f.geoClipRectangle = Po, f.geoConicConformal = function() {
    return cl(nd).scale(109.5).parallels([30, 30]);
  }, f.geoConicConformalRaw = nd, f.geoConicEqualArea = Uo, f.geoConicEqualAreaRaw = Kh, f.geoConicEquidistant = function() {
    return cl(rd).scale(131.154).center([0, 13.9389]);
  }, f.geoConicEquidistantRaw = rd, f.geoContains = function(e, t) {
    return (e && Eh.hasOwnProperty(e.type) ? Eh[e.type] : Oo)(e, t);
  }, f.geoDistance = $o, f.geoEqualEarth = function() {
    return Pt(dl).scale(177.158);
  }, f.geoEqualEarthRaw = dl, f.geoEquirectangular = function() {
    return Pt(ei).scale(152.63);
  }, f.geoEquirectangularRaw = ei, f.geoGnomonic = function() {
    return Pt(pl).scale(144.049).clipAngle(60);
  }, f.geoGnomonicRaw = pl, f.geoGraticule = Lh, f.geoGraticule10 = function() {
    return Lh()();
  }, f.geoIdentity = function() {
    var e, t, n, r, i, o, a, s = 1, l = 0, u = 0, c = 1, d = 1, h = 0, p = null, b = 1, m = 1, g = Jr({ point: function(y, E) {
      var S = _([y, E]);
      this.stream.point(S[0], S[1]);
    } }), v = Hr;
    function M() {
      return b = s * c, m = s * d, o = a = null, _;
    }
    function _(y) {
      var E = y[0] * b, S = y[1] * m;
      if (h) {
        var O = S * e - E * t;
        E = E * e + S * t, S = O;
      }
      return [E + l, S + u];
    }
    return _.invert = function(y) {
      var E = y[0] - l, S = y[1] - u;
      if (h) {
        var O = S * e + E * t;
        E = E * e - S * t, S = O;
      }
      return [E / b, S / m];
    }, _.stream = function(y) {
      return o && a === y ? o : o = g(v(a = y));
    }, _.postclip = function(y) {
      return arguments.length ? (v = y, p = n = r = i = null, M()) : v;
    }, _.clipExtent = function(y) {
      return arguments.length ? (v = y == null ? (p = n = r = i = null, Hr) : Po(p = +y[0][0], n = +y[0][1], r = +y[1][0], i = +y[1][1]), M()) : p == null ? null : [[p, n], [r, i]];
    }, _.scale = function(y) {
      return arguments.length ? (s = +y, M()) : s;
    }, _.translate = function(y) {
      return arguments.length ? (l = +y[0], u = +y[1], M()) : [l, u];
    }, _.angle = function(y) {
      return arguments.length ? (t = J(h = y % 360 * le), e = ee(h), M()) : h * Me;
    }, _.reflectX = function(y) {
      return arguments.length ? (c = y ? -1 : 1, M()) : c < 0;
    }, _.reflectY = function(y) {
      return arguments.length ? (d = y ? -1 : 1, M()) : d < 0;
    }, _.fitExtent = function(y, E) {
      return Bo(_, y, E);
    }, _.fitSize = function(y, E) {
      return al(_, y, E);
    }, _.fitWidth = function(y, E) {
      return sl(_, y, E);
    }, _.fitHeight = function(y, E) {
      return ll(_, y, E);
    }, _;
  }, f.geoInterpolate = function(e, t) {
    var n = e[0] * le, r = e[1] * le, i = t[0] * le, o = t[1] * le, a = ee(r), s = J(r), l = ee(o), u = J(o), c = a * ee(n), d = a * J(n), h = l * ee(i), p = l * J(i), b = 2 * Ke(Ie(Vf(o - r) + a * l * Vf(i - n))), m = J(b), g = b ? function(v) {
      var M = J(v *= b) / m, _ = J(b - v) / m, y = _ * c + M * h, E = _ * d + M * p, S = _ * s + M * u;
      return [Je(E, y) * Me, Je(S, Ie(y * y + E * E)) * Me];
    } : function() {
      return [n * Me, r * Me];
    };
    return g.distance = b, g;
  }, f.geoLength = Mh, f.geoMercator = function() {
    return td(Qr).scale(961 / We);
  }, f.geoMercatorRaw = Qr, f.geoNaturalEarth1 = function() {
    return Pt(gl).scale(175.295);
  }, f.geoNaturalEarth1Raw = gl, f.geoOrthographic = function() {
    return Pt(ml).scale(249.5).clipAngle(90.000001);
  }, f.geoOrthographicRaw = ml, f.geoPath = function(e, t) {
    var n, r, i = 4.5;
    function o(a) {
      return a && (typeof i == "function" && r.pointRadius(+i.apply(this, arguments)), wt(a, n(r))), r.result();
    }
    return o.area = function(a) {
      return wt(a, n(Ih)), Ih.result();
    }, o.measure = function(a) {
      return wt(a, n(Gh)), Gh.result();
    }, o.bounds = function(a) {
      return wt(a, n(Fo)), Fo.result();
    }, o.centroid = function(a) {
      return wt(a, n(Bh)), Bh.result();
    }, o.projection = function(a) {
      return arguments.length ? (n = a == null ? (e = null, Hr) : (e = a).stream, o) : e;
    }, o.context = function(a) {
      return arguments.length ? (r = a == null ? (t = null, new Xh()) : new Uh(t = a), typeof i != "function" && r.pointRadius(i), o) : t;
    }, o.pointRadius = function(a) {
      return arguments.length ? (i = typeof a == "function" ? a : (r.pointRadius(+a), +a), o) : i;
    }, o.projection(e).context(t);
  }, f.geoProjection = Pt, f.geoProjectionMutator = ul, f.geoRotation = ph, f.geoStereographic = function() {
    return Pt(vl).scale(250).clipAngle(142);
  }, f.geoStereographicRaw = vl, f.geoStream = wt, f.geoTransform = function(e) {
    return { stream: Jr(e) };
  }, f.geoTransverseMercator = function() {
    var e = td(bl), t = e.center, n = e.rotate;
    return e.center = function(r) {
      return arguments.length ? t([-r[1], r[0]]) : [(r = t())[1], -r[0]];
    }, e.rotate = function(r) {
      return arguments.length ? n([r[0], r[1], r.length > 2 ? r[2] + 90 : 90]) : [(r = n())[0], r[1], r[2] - 90];
    }, n([0, 0, 90]).scale(159.155);
  }, f.geoTransverseMercatorRaw = bl, f.gray = function(e, t) {
    return new yt(e, 0, 0, t ?? 1);
  }, f.greatest = function(e, t = w) {
    let n, r = !1;
    if (t.length === 1) {
      let i;
      for (const o of e) {
        const a = t(o);
        (r ? w(a, i) > 0 : w(a, a) === 0) && (n = o, i = a, r = !0);
      }
    } else
      for (const i of e)
        (r ? t(i, n) > 0 : t(i, i) === 0) && (n = i, r = !0);
    return n;
  }, f.greatestIndex = function(e, t = w) {
    if (t.length === 1)
      return Pu(e, t);
    let n, r = -1, i = -1;
    for (const o of e)
      ++i, (r < 0 ? t(o, o) === 0 : t(o, n) > 0) && (n = o, r = i);
    return r;
  }, f.group = Mu, f.groupSort = function(e, t, n) {
    return (t.length !== 2 ? wa(Tu(e, t, n), ([r, i], [o, a]) => w(i, a) || w(r, o)) : wa(Mu(e, n), ([r, i], [o, a]) => t(i, a) || w(r, o))).map(([r]) => r);
  }, f.groups = Eu, f.hcl = Fi, f.hierarchy = yl, f.histogram = zu, f.hsl = Oi, f.html = kv, f.image = function(e, t) {
    return new Promise(function(n, r) {
      var i = new Image();
      for (var o in t)
        i[o] = t[o];
      i.onerror = r, i.onload = function() {
        n(i);
      }, i.src = e;
    });
  }, f.index = function(e, ...t) {
    return Dn(e, jn, Au, t);
  }, f.indexes = function(e, ...t) {
    return Dn(e, Array.from, Au, t);
  }, f.interpolate = Gt, f.interpolateArray = function(e, t) {
    return (Tc(t) ? Za : kc)(e, t);
  }, f.interpolateBasis = xc, f.interpolateBasisClosed = wc, f.interpolateBlues = r_, f.interpolateBrBG = I2, f.interpolateBuGn = H2, f.interpolateBuPu = V2, f.interpolateCividis = function(e) {
    return e = Math.max(0, Math.min(1, e)), "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - e * (35.34 - e * (2381.73 - e * (6402.7 - e * (7024.72 - 2710.57 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + e * (170.73 + e * (52.82 - e * (131.46 - e * (176.58 - 67.37 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + e * (442.36 - e * (2482.43 - e * (6167.24 - e * (6614.94 - 2475.67 * e))))))) + ")";
  }, f.interpolateCool = f_, f.interpolateCubehelix = qg, f.interpolateCubehelixDefault = u_, f.interpolateCubehelixLong = Yi, f.interpolateDate = Ac, f.interpolateDiscrete = function(e) {
    var t = e.length;
    return function(n) {
      return e[Math.max(0, Math.min(t - 1, Math.floor(n * t)))];
    };
  }, f.interpolateGnBu = G2, f.interpolateGreens = i_, f.interpolateGreys = o_, f.interpolateHcl = jg, f.interpolateHclLong = Dg, f.interpolateHsl = Rg, f.interpolateHslLong = Fg, f.interpolateHue = function(e, t) {
    var n = qi(+e, +t);
    return function(r) {
      var i = n(r);
      return i - 360 * Math.floor(i / 360);
    };
  }, f.interpolateInferno = m_, f.interpolateLab = function(e, t) {
    var n = Oe((e = Ri(e)).l, (t = Ri(t)).l), r = Oe(e.a, t.a), i = Oe(e.b, t.b), o = Oe(e.opacity, t.opacity);
    return function(a) {
      return e.l = n(a), e.a = r(a), e.b = i(a), e.opacity = o(a), e + "";
    };
  }, f.interpolateMagma = g_, f.interpolateNumber = dt, f.interpolateNumberArray = Za, f.interpolateObject = Nc, f.interpolateOrRd = X2, f.interpolateOranges = l_, f.interpolatePRGn = R2, f.interpolatePiYG = F2, f.interpolatePlasma = v_, f.interpolatePuBu = W2, f.interpolatePuBuGn = Z2, f.interpolatePuOr = j2, f.interpolatePuRd = J2, f.interpolatePurples = a_, f.interpolateRainbow = function(e) {
    (e < 0 || e > 1) && (e -= Math.floor(e));
    var t = Math.abs(e - 0.5);
    return na.h = 360 * e - 100, na.s = 1.5 - 1.5 * t, na.l = 0.8 - 0.9 * t, na + "";
  }, f.interpolateRdBu = D2, f.interpolateRdGy = q2, f.interpolateRdPu = K2, f.interpolateRdYlBu = B2, f.interpolateRdYlGn = U2, f.interpolateReds = s_, f.interpolateRgb = Cr, f.interpolateRgbBasis = Sc, f.interpolateRgbBasisClosed = Ig, f.interpolateRound = Bi, f.interpolateSinebow = function(e) {
    var t;
    return e = (0.5 - e) * Math.PI, ra.r = 255 * (t = Math.sin(e)) * t, ra.g = 255 * (t = Math.sin(e + h_)) * t, ra.b = 255 * (t = Math.sin(e + d_)) * t, ra + "";
  }, f.interpolateSpectral = Y2, f.interpolateString = Ka, f.interpolateTransformCss = Pc, f.interpolateTransformSvg = $c, f.interpolateTurbo = function(e) {
    return e = Math.max(0, Math.min(1, e)), "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + e * (1172.33 - e * (10793.56 - e * (33300.12 - e * (38394.49 - 14825.05 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + e * (557.33 + e * (1225.33 - e * (3574.96 - e * (1073.77 + 707.56 * e))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + e * (3211.1 - e * (15327.97 - e * (27814 - e * (22569.18 - 6838.66 * e))))))) + ")";
  }, f.interpolateViridis = p_, f.interpolateWarm = c_, f.interpolateYlGn = e_, f.interpolateYlGnBu = Q2, f.interpolateYlOrBr = t_, f.interpolateYlOrRd = n_, f.interpolateZoom = Ic, f.interrupt = wn, f.intersection = function(e, ...t) {
    e = new ut(e), t = t.map(y1);
    e:
      for (const n of e)
        for (const r of t)
          if (!r.has(n)) {
            e.delete(n);
            continue e;
          }
    return e;
  }, f.interval = function(e, t, n) {
    var r = new Ir(), i = t;
    return t == null ? (r.restart(e, t, n), r) : (r._restart = r.restart, r.restart = function(o, a, s) {
      a = +a, s = s == null ? Or() : +s, r._restart(function l(u) {
        u += i, r._restart(l, i += a, s), o(u);
      }, a, s);
    }, r.restart(e, t, n), r);
  }, f.isoFormat = x2, f.isoParse = M2, f.json = function(e, t) {
    return fetch(e, t).then(Sv);
  }, f.lab = Ri, f.lch = function(e, t, n, r) {
    return arguments.length === 1 ? pc(e) : new kt(n, t, e, r ?? 1);
  }, f.least = function(e, t = w) {
    let n, r = !1;
    if (t.length === 1) {
      let i;
      for (const o of e) {
        const a = t(o);
        (r ? w(a, i) < 0 : w(a, a) === 0) && (n = o, i = a, r = !0);
      }
    } else
      for (const i of e)
        (r ? t(i, n) < 0 : t(i, i) === 0) && (n = i, r = !0);
    return n;
  }, f.leastIndex = Ou, f.line = ou, f.lineRadial = sp, f.link = ua, f.linkHorizontal = function() {
    return ua(cp);
  }, f.linkRadial = function() {
    const e = ua(C_);
    return e.angle = e.x, delete e.x, e.radius = e.y, delete e.y, e;
  }, f.linkVertical = function() {
    return ua(fp);
  }, f.local = Wu, f.map = function(e, t) {
    if (typeof e[Symbol.iterator] != "function")
      throw new TypeError("values is not iterable");
    if (typeof t != "function")
      throw new TypeError("mapper is not a function");
    return Array.from(e, (n, r) => t(n, r, e));
  }, f.matcher = Pa, f.max = Mi, f.maxIndex = Pu, f.mean = function(e, t) {
    let n = 0, r = 0;
    if (t === void 0)
      for (let i of e)
        i != null && (i = +i) >= i && (++n, r += i);
    else {
      let i = -1;
      for (let o of e)
        (o = t(o, ++i, e)) != null && (o = +o) >= o && (++n, r += o);
    }
    if (n)
      return r / n;
  }, f.median = function(e, t) {
    return Er(e, 0.5, t);
  }, f.merge = Na, f.min = Ei, f.minIndex = $u, f.mode = function(e, t) {
    const n = new je();
    if (t === void 0)
      for (let o of e)
        o != null && o >= o && n.set(o, (n.get(o) || 0) + 1);
    else {
      let o = -1;
      for (let a of e)
        (a = t(a, ++o, e)) != null && a >= a && n.set(a, (n.get(a) || 0) + 1);
    }
    let r, i = 0;
    for (const [o, a] of n)
      a > i && (i = a, r = o);
    return r;
  }, f.namespace = Sr, f.namespaces = za, f.nice = Cu, f.now = Or, f.pack = function() {
    var e = null, t = 1, n = 1, r = Ln;
    function i(o) {
      const a = _l();
      return o.x = t / 2, o.y = n / 2, e ? o.eachBefore(pd(e)).eachAfter(wl(r, 0.5, a)).eachBefore(gd(1)) : o.eachBefore(pd(Mb)).eachAfter(wl(Ln, 1, a)).eachAfter(wl(r, o.r / Math.min(t, n), a)).eachBefore(gd(Math.min(t, n) / (2 * o.r))), o;
    }
    return i.radius = function(o) {
      return arguments.length ? (e = Vo(o), i) : e;
    }, i.size = function(o) {
      return arguments.length ? (t = +o[0], n = +o[1], i) : [t, n];
    }, i.padding = function(o) {
      return arguments.length ? (r = typeof o == "function" ? o : dr(+o), i) : r;
    }, i;
  }, f.packEnclose = function(e) {
    return sd(e, _l());
  }, f.packSiblings = function(e) {
    return dd(e, _l()), e;
  }, f.pairs = function(e, t = m1) {
    const n = [];
    let r, i = !1;
    for (const o of e)
      i && n.push(t(r, o)), r = o, i = !0;
    return n;
  }, f.partition = function() {
    var e = 1, t = 1, n = 0, r = !1;
    function i(o) {
      var a = o.height + 1;
      return o.x0 = o.y0 = n, o.x1 = e, o.y1 = t / a, o.eachBefore(/* @__PURE__ */ function(s, l) {
        return function(u) {
          u.children && ai(u, u.x0, s * (u.depth + 1) / l, u.x1, s * (u.depth + 2) / l);
          var c = u.x0, d = u.y0, h = u.x1 - n, p = u.y1 - n;
          h < c && (c = h = (c + h) / 2), p < d && (d = p = (d + p) / 2), u.x0 = c, u.y0 = d, u.x1 = h, u.y1 = p;
        };
      }(t, a)), r && o.eachBefore(md), o;
    }
    return i.round = function(o) {
      return arguments.length ? (r = !!o, i) : r;
    }, i.size = function(o) {
      return arguments.length ? (e = +o[0], t = +o[1], i) : [e, t];
    }, i.padding = function(o) {
      return arguments.length ? (n = +o, i) : n;
    }, i;
  }, f.path = Zt, f.permute = Nu, f.pie = function() {
    var e = A_, t = k_, n = null, r = ce(0), i = ce(ln), o = ce(0);
    function a(s) {
      var l, u, c, d, h, p = (s = sa(s)).length, b = 0, m = new Array(p), g = new Array(p), v = +r.apply(this, arguments), M = Math.min(ln, Math.max(-ln, i.apply(this, arguments) - v)), _ = Math.min(Math.abs(M) / p, o.apply(this, arguments)), y = _ * (M < 0 ? -1 : 1);
      for (l = 0; l < p; ++l)
        (h = g[m[l] = l] = +e(s[l], l, s)) > 0 && (b += h);
      for (t != null ? m.sort(function(E, S) {
        return t(g[E], g[S]);
      }) : n != null && m.sort(function(E, S) {
        return n(s[E], s[S]);
      }), l = 0, c = b ? (M - p * y) / b : 0; l < p; ++l, v = d)
        u = m[l], d = v + ((h = g[u]) > 0 ? h * c : 0) + y, g[u] = { data: s[u], index: l, value: h, startAngle: v, endAngle: d, padAngle: _ };
      return g;
    }
    return a.value = function(s) {
      return arguments.length ? (e = typeof s == "function" ? s : ce(+s), a) : e;
    }, a.sortValues = function(s) {
      return arguments.length ? (t = s, n = null, a) : t;
    }, a.sort = function(s) {
      return arguments.length ? (n = s, t = null, a) : n;
    }, a.startAngle = function(s) {
      return arguments.length ? (r = typeof s == "function" ? s : ce(+s), a) : r;
    }, a.endAngle = function(s) {
      return arguments.length ? (i = typeof s == "function" ? s : ce(+s), a) : i;
    }, a.padAngle = function(s) {
      return arguments.length ? (o = typeof s == "function" ? s : ce(+s), a) : o;
    }, a;
  }, f.piecewise = Dc, f.pointRadial = bi, f.pointer = ct, f.pointers = function(e, t) {
    return e.target && (e = Ju(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => ct(n, t));
  }, f.polygonArea = function(e) {
    for (var t, n = -1, r = e.length, i = e[r - 1], o = 0; ++n < r; )
      t = i, i = e[n], o += t[1] * i[0] - t[0] * i[1];
    return o / 2;
  }, f.polygonCentroid = function(e) {
    for (var t, n, r = -1, i = e.length, o = 0, a = 0, s = e[i - 1], l = 0; ++r < i; )
      t = s, s = e[r], l += n = t[0] * s[1] - s[0] * t[1], o += (t[0] + s[0]) * n, a += (t[1] + s[1]) * n;
    return [o / (l *= 3), a / l];
  }, f.polygonContains = function(e, t) {
    for (var n, r, i = e.length, o = e[i - 1], a = t[0], s = t[1], l = o[0], u = o[1], c = !1, d = 0; d < i; ++d)
      n = (o = e[d])[0], (r = o[1]) > s != u > s && a < (l - n) * (s - r) / (u - r) + n && (c = !c), l = n, u = r;
    return c;
  }, f.polygonHull = function(e) {
    if ((n = e.length) < 3)
      return null;
    var t, n, r = new Array(n), i = new Array(n);
    for (t = 0; t < n; ++t)
      r[t] = [+e[t][0], +e[t][1], t];
    for (r.sort(Lb), t = 0; t < n; ++t)
      i[t] = [r[t][0], -r[t][1]];
    var o = wd(r), a = wd(i), s = a[0] === o[0], l = a[a.length - 1] === o[o.length - 1], u = [];
    for (t = o.length - 1; t >= 0; --t)
      u.push(e[r[o[t]][2]]);
    for (t = +s; t < a.length - l; ++t)
      u.push(e[r[a[t]][2]]);
    return u;
  }, f.polygonLength = function(e) {
    for (var t, n, r = -1, i = e.length, o = e[i - 1], a = o[0], s = o[1], l = 0; ++r < i; )
      t = a, n = s, t -= a = (o = e[r])[0], n -= s = o[1], l += Math.hypot(t, n);
    return l;
  }, f.precisionFixed = qf, f.precisionPrefix = Bf, f.precisionRound = Uf, f.quadtree = oo, f.quantile = Er, f.quantileSorted = Lu, f.quantize = function(e, t) {
    for (var n = new Array(t), r = 0; r < t; ++r)
      n[r] = e(r / (t - 1));
    return n;
  }, f.quickselect = Aa, f.radialArea = lp, f.radialLine = sp, f.randomBates = Ib, f.randomBernoulli = jb, f.randomBeta = Sd, f.randomBinomial = Td, f.randomCauchy = qb, f.randomExponential = Rb, f.randomGamma = Al, f.randomGeometric = Ed, f.randomInt = $b, f.randomIrwinHall = Md, f.randomLcg = function(e = Math.random()) {
    let t = 0 | (0 <= e && e < 1 ? e / kd : Math.abs(e));
    return () => (t = 1664525 * t + 1013904223 | 0, kd * (t >>> 0));
  }, f.randomLogNormal = Ob, f.randomLogistic = Bb, f.randomNormal = kl, f.randomPareto = Fb, f.randomPoisson = Ub, f.randomUniform = Pb, f.randomWeibull = Db, f.range = It, f.rank = function(e, t = w) {
    if (typeof e[Symbol.iterator] != "function")
      throw new TypeError("values is not iterable");
    let n = Array.from(e);
    const r = new Float64Array(n.length);
    t.length !== 2 && (n = n.map(t), t = w);
    const i = (s, l) => t(n[s], n[l]);
    let o, a;
    return Uint32Array.from(n, (s, l) => l).sort(t === w ? (s, l) => wr(n[s], n[l]) : Ma(i)).forEach((s, l) => {
      const u = i(s, o === void 0 ? s : o);
      u >= 0 ? ((o === void 0 || u > 0) && (o = s, a = l), r[s] = a) : r[s] = NaN;
    }), r;
  }, f.reduce = function(e, t, n) {
    if (typeof t != "function")
      throw new TypeError("reducer is not a function");
    const r = e[Symbol.iterator]();
    let i, o, a = -1;
    if (arguments.length < 3) {
      if ({ done: i, value: n } = r.next(), i)
        return;
      ++a;
    }
    for (; { done: i, value: o } = r.next(), !i; )
      n = t(n, o, ++a, e);
    return n;
  }, f.reverse = function(e) {
    if (typeof e[Symbol.iterator] != "function")
      throw new TypeError("values is not iterable");
    return Array.from(e).reverse();
  }, f.rgb = Xn, f.ribbon = function() {
    return pf();
  }, f.ribbonArrow = function() {
    return pf(Um);
  }, f.rollup = Tu, f.rollups = ku, f.scaleBand = zl, f.scaleDiverging = function e() {
    var t = en(ta()(nt));
    return t.copy = function() {
      return an(t, e());
    }, Bt.apply(t, arguments);
  }, f.scaleDivergingLog = function e() {
    var t = $l(ta()).domain([0.1, 1, 10]);
    return t.copy = function() {
      return an(t, e()).base(t.base());
    }, Bt.apply(t, arguments);
  }, f.scaleDivergingPow = nu, f.scaleDivergingSqrt = function() {
    return nu.apply(null, arguments).exponent(0.5);
  }, f.scaleDivergingSymlog = function e() {
    var t = Ol(ta());
    return t.copy = function() {
      return an(t, e()).constant(t.constant());
    }, Bt.apply(t, arguments);
  }, f.scaleIdentity = function e(t) {
    var n;
    function r(i) {
      return i == null || isNaN(i = +i) ? n : i;
    }
    return r.invert = r, r.domain = r.range = function(i) {
      return arguments.length ? (t = Array.from(i, Jo), r) : t.slice();
    }, r.unknown = function(i) {
      return arguments.length ? (n = i, r) : n;
    }, r.copy = function() {
      return e(t).unknown(n);
    }, t = arguments.length ? Array.from(t, Jo) : [0, 1], en(r);
  }, f.scaleImplicit = Nl, f.scaleLinear = function e() {
    var t = Pl();
    return t.copy = function() {
      return si(t, e());
    }, gt.apply(t, arguments), en(t);
  }, f.scaleLog = function e() {
    const t = $l(Ko()).domain([1, 10]);
    return t.copy = () => si(t, e()).base(t.base()), gt.apply(t, arguments), t;
  }, f.scaleOrdinal = Cl, f.scalePoint = function() {
    return Ad(zl.apply(null, arguments).paddingInner(1));
  }, f.scalePow = Rl, f.scaleQuantile = function e() {
    var t, n = [], r = [], i = [];
    function o() {
      var s = 0, l = Math.max(1, r.length);
      for (i = new Array(l - 1); ++s < l; )
        i[s - 1] = Lu(n, s / l);
      return a;
    }
    function a(s) {
      return s == null || isNaN(s = +s) ? t : r[G(i, s)];
    }
    return a.invertExtent = function(s) {
      var l = r.indexOf(s);
      return l < 0 ? [NaN, NaN] : [l > 0 ? i[l - 1] : n[0], l < i.length ? i[l] : n[n.length - 1]];
    }, a.domain = function(s) {
      if (!arguments.length)
        return n.slice();
      n = [];
      for (let l of s)
        l == null || isNaN(l = +l) || n.push(l);
      return n.sort(w), o();
    }, a.range = function(s) {
      return arguments.length ? (r = Array.from(s), o()) : r.slice();
    }, a.unknown = function(s) {
      return arguments.length ? (t = s, a) : t;
    }, a.quantiles = function() {
      return i.slice();
    }, a.copy = function() {
      return e().domain(n).range(r).unknown(t);
    }, gt.apply(a, arguments);
  }, f.scaleQuantize = function e() {
    var t, n = 0, r = 1, i = 1, o = [0.5], a = [0, 1];
    function s(u) {
      return u != null && u <= u ? a[G(o, u, 0, i)] : t;
    }
    function l() {
      var u = -1;
      for (o = new Array(i); ++u < i; )
        o[u] = ((u + 1) * r - (u - i) * n) / (i + 1);
      return s;
    }
    return s.domain = function(u) {
      return arguments.length ? ([n, r] = u, n = +n, r = +r, l()) : [n, r];
    }, s.range = function(u) {
      return arguments.length ? (i = (a = Array.from(u)).length - 1, l()) : a.slice();
    }, s.invertExtent = function(u) {
      var c = a.indexOf(u);
      return c < 0 ? [NaN, NaN] : c < 1 ? [n, o[0]] : c >= i ? [o[i - 1], r] : [o[c - 1], o[c]];
    }, s.unknown = function(u) {
      return arguments.length && (t = u), s;
    }, s.thresholds = function() {
      return o.slice();
    }, s.copy = function() {
      return e().domain([n, r]).range(a).unknown(t);
    }, gt.apply(en(s), arguments);
  }, f.scaleRadial = function e() {
    var t, n = Pl(), r = [0, 1], i = !1;
    function o(a) {
      var s = Jb(n(a));
      return isNaN(s) ? t : i ? Math.round(s) : s;
    }
    return o.invert = function(a) {
      return n.invert(Fd(a));
    }, o.domain = function(a) {
      return arguments.length ? (n.domain(a), o) : n.domain();
    }, o.range = function(a) {
      return arguments.length ? (n.range((r = Array.from(a, Jo)).map(Fd)), o) : r.slice();
    }, o.rangeRound = function(a) {
      return o.range(a).round(!0);
    }, o.round = function(a) {
      return arguments.length ? (i = !!a, o) : i;
    }, o.clamp = function(a) {
      return arguments.length ? (n.clamp(a), o) : n.clamp();
    }, o.unknown = function(a) {
      return arguments.length ? (t = a, o) : t;
    }, o.copy = function() {
      return e(n.domain(), r).round(i).clamp(n.clamp()).unknown(t);
    }, gt.apply(o, arguments), en(o);
  }, f.scaleSequential = function e() {
    var t = en(ea()(nt));
    return t.copy = function() {
      return an(t, e());
    }, Bt.apply(t, arguments);
  }, f.scaleSequentialLog = function e() {
    var t = $l(ea()).domain([1, 10]);
    return t.copy = function() {
      return an(t, e()).base(t.base());
    }, Bt.apply(t, arguments);
  }, f.scaleSequentialPow = tu, f.scaleSequentialQuantile = function e() {
    var t = [], n = nt;
    function r(i) {
      if (i != null && !isNaN(i = +i))
        return n((G(t, i, 1) - 1) / (t.length - 1));
    }
    return r.domain = function(i) {
      if (!arguments.length)
        return t.slice();
      t = [];
      for (let o of i)
        o == null || isNaN(o = +o) || t.push(o);
      return t.sort(w), r;
    }, r.interpolator = function(i) {
      return arguments.length ? (n = i, r) : n;
    }, r.range = function() {
      return t.map((i, o) => n(o / (t.length - 1)));
    }, r.quantiles = function(i) {
      return Array.from({ length: i + 1 }, (o, a) => Er(t, a / i));
    }, r.copy = function() {
      return e(n).domain(t);
    }, Bt.apply(r, arguments);
  }, f.scaleSequentialSqrt = function() {
    return tu.apply(null, arguments).exponent(0.5);
  }, f.scaleSequentialSymlog = function e() {
    var t = Ol(ea());
    return t.copy = function() {
      return an(t, e()).constant(t.constant());
    }, Bt.apply(t, arguments);
  }, f.scaleSqrt = function() {
    return Rl.apply(null, arguments).exponent(0.5);
  }, f.scaleSymlog = function e() {
    var t = Ol(Ko());
    return t.copy = function() {
      return si(t, e()).constant(t.constant());
    }, gt.apply(t, arguments);
  }, f.scaleThreshold = function e() {
    var t, n = [0.5], r = [0, 1], i = 1;
    function o(a) {
      return a != null && a <= a ? r[G(n, a, 0, i)] : t;
    }
    return o.domain = function(a) {
      return arguments.length ? (n = Array.from(a), i = Math.min(n.length, r.length - 1), o) : n.slice();
    }, o.range = function(a) {
      return arguments.length ? (r = Array.from(a), i = Math.min(n.length, r.length - 1), o) : r.slice();
    }, o.invertExtent = function(a) {
      var s = r.indexOf(a);
      return [n[s - 1], n[s]];
    }, o.unknown = function(a) {
      return arguments.length ? (t = a, o) : t;
    }, o.copy = function() {
      return e().domain(n).range(r).unknown(t);
    }, gt.apply(o, arguments);
  }, f.scaleTime = function() {
    return gt.apply(eu(u0, c0, rn, Vl, pr, ci, Hl, Yl, nn, f.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
  }, f.scaleUtc = function() {
    return gt.apply(eu(s0, l0, on, Wl, gr, hi, Zl, Xl, nn, f.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
  }, f.scan = function(e, t) {
    const n = Ou(e, t);
    return n < 0 ? void 0 : n;
  }, f.schemeAccent = k2, f.schemeBlues = Z0, f.schemeBrBG = A0, f.schemeBuGn = R0, f.schemeBuPu = F0, f.schemeCategory10 = T2, f.schemeDark2 = A2, f.schemeGnBu = j0, f.schemeGreens = W0, f.schemeGreys = J0, f.schemeOrRd = D0, f.schemeOranges = ep, f.schemePRGn = N0, f.schemePaired = N2, f.schemePastel1 = C2, f.schemePastel2 = z2, f.schemePiYG = C0, f.schemePuBu = B0, f.schemePuBuGn = q0, f.schemePuOr = z0, f.schemePuRd = U0, f.schemePurples = K0, f.schemeRdBu = L0, f.schemeRdGy = P0, f.schemeRdPu = Y0, f.schemeRdYlBu = $0, f.schemeRdYlGn = O0, f.schemeReds = Q0, f.schemeSet1 = L2, f.schemeSet2 = P2, f.schemeSet3 = $2, f.schemeSpectral = I0, f.schemeTableau10 = O2, f.schemeYlGn = V0, f.schemeYlGnBu = H0, f.schemeYlOrBr = G0, f.schemeYlOrRd = X0, f.select = De, f.selectAll = function(e) {
    return typeof e == "string" ? new Ve([document.querySelectorAll(e)], [document.documentElement]) : new Ve([Bu(e)], Ia);
  }, f.selection = mn, f.selector = Ai, f.selectorAll = La, f.shuffle = v1, f.shuffler = Iu, f.some = function(e, t) {
    if (typeof t != "function")
      throw new TypeError("test is not a function");
    let n = -1;
    for (const r of e)
      if (t(r, ++n, e))
        return !0;
    return !1;
  }, f.sort = wa, f.stack = function() {
    var e = ce([]), t = yr, n = br, r = G_;
    function i(o) {
      var a, s, l = Array.from(e.apply(this, arguments), X_), u = l.length, c = -1;
      for (const d of o)
        for (a = 0, ++c; a < u; ++a)
          (l[a][c] = [0, +r(d, l[a].key, c, o)]).data = d;
      for (a = 0, s = sa(t(l)); a < u; ++a)
        l[s[a]].index = a;
      return n(l, s), l;
    }
    return i.keys = function(o) {
      return arguments.length ? (e = typeof o == "function" ? o : ce(Array.from(o)), i) : e;
    }, i.value = function(o) {
      return arguments.length ? (r = typeof o == "function" ? o : ce(+o), i) : r;
    }, i.order = function(o) {
      return arguments.length ? (t = o == null ? yr : typeof o == "function" ? o : ce(Array.from(o)), i) : t;
    }, i.offset = function(o) {
      return arguments.length ? (n = o ?? br, i) : n;
    }, i;
  }, f.stackOffsetDiverging = function(e, t) {
    if ((s = e.length) > 0)
      for (var n, r, i, o, a, s, l = 0, u = e[t[0]].length; l < u; ++l)
        for (o = a = 0, n = 0; n < s; ++n)
          (i = (r = e[t[n]][l])[1] - r[0]) > 0 ? (r[0] = o, r[1] = o += i) : i < 0 ? (r[1] = a, r[0] = a += i) : (r[0] = 0, r[1] = i);
  }, f.stackOffsetExpand = function(e, t) {
    if ((r = e.length) > 0) {
      for (var n, r, i, o = 0, a = e[0].length; o < a; ++o) {
        for (i = n = 0; n < r; ++n)
          i += e[n][o][1] || 0;
        if (i)
          for (n = 0; n < r; ++n)
            e[n][o][1] /= i;
      }
      br(e, t);
    }
  }, f.stackOffsetNone = br, f.stackOffsetSilhouette = function(e, t) {
    if ((n = e.length) > 0) {
      for (var n, r = 0, i = e[t[0]], o = i.length; r < o; ++r) {
        for (var a = 0, s = 0; a < n; ++a)
          s += e[a][r][1] || 0;
        i[r][1] += i[r][0] = -s / 2;
      }
      br(e, t);
    }
  }, f.stackOffsetWiggle = function(e, t) {
    if ((i = e.length) > 0 && (r = (n = e[t[0]]).length) > 0) {
      for (var n, r, i, o = 0, a = 1; a < r; ++a) {
        for (var s = 0, l = 0, u = 0; s < i; ++s) {
          for (var c = e[t[s]], d = c[a][1] || 0, h = (d - (c[a - 1][1] || 0)) / 2, p = 0; p < s; ++p) {
            var b = e[t[p]];
            h += (b[a][1] || 0) - (b[a - 1][1] || 0);
          }
          l += d, u += h * d;
        }
        n[a - 1][1] += n[a - 1][0] = o, l && (o -= u / l);
      }
      n[a - 1][1] += n[a - 1][0] = o, br(e, t);
    }
  }, f.stackOrderAppearance = qp, f.stackOrderAscending = Bp, f.stackOrderDescending = function(e) {
    return Bp(e).reverse();
  }, f.stackOrderInsideOut = function(e) {
    var t, n, r = e.length, i = e.map(Up), o = qp(e), a = 0, s = 0, l = [], u = [];
    for (t = 0; t < r; ++t)
      n = o[t], a < s ? (a += i[n], l.push(n)) : (s += i[n], u.push(n));
    return u.reverse().concat(l);
  }, f.stackOrderNone = yr, f.stackOrderReverse = function(e) {
    return yr(e).reverse();
  }, f.stratify = function() {
    var e, t = Sb, n = Tb;
    function r(i) {
      var o, a, s, l, u, c, d, h, p = Array.from(i), b = t, m = n, g = /* @__PURE__ */ new Map();
      if (e != null) {
        const v = p.map((y, E) => function(S) {
          let O = (S = `${S}`).length;
          return El(S, O - 1) && !El(S, O - 2) && (S = S.slice(0, -1)), S[0] === "/" ? S : `/${S}`;
        }(e(y, E, i))), M = v.map(bd), _ = new Set(v).add("");
        for (const y of M)
          _.has(y) || (_.add(y), v.push(y), M.push(bd(y)), p.push(Ml));
        b = (y, E) => v[E], m = (y, E) => M[E];
      }
      for (s = 0, o = p.length; s < o; ++s)
        a = p[s], c = p[s] = new zn(a), (d = b(a, s, i)) != null && (d += "") && (h = c.id = d, g.set(h, g.has(h) ? vd : c)), (d = m(a, s, i)) != null && (d += "") && (c.parent = d);
      for (s = 0; s < o; ++s)
        if (d = (c = p[s]).parent) {
          if (!(u = g.get(d)))
            throw new Error("missing: " + d);
          if (u === vd)
            throw new Error("ambiguous: " + d);
          u.children ? u.children.push(c) : u.children = [c], c.parent = u;
        } else {
          if (l)
            throw new Error("multiple roots");
          l = c;
        }
      if (!l)
        throw new Error("no root");
      if (e != null) {
        for (; l.data === Ml && l.children.length === 1; )
          l = l.children[0], --o;
        for (let v = p.length - 1; v >= 0 && (c = p[v], c.data === Ml); --v)
          c.data = null;
      }
      if (l.parent = Eb, l.eachBefore(function(v) {
        v.depth = v.parent.depth + 1, --o;
      }).eachBefore(id), l.parent = null, o > 0)
        throw new Error("cycle");
      return l;
    }
    return r.id = function(i) {
      return arguments.length ? (t = Vo(i), r) : t;
    }, r.parentId = function(i) {
      return arguments.length ? (n = Vo(i), r) : n;
    }, r.path = function(i) {
      return arguments.length ? (e = Vo(i), r) : e;
    }, r;
  }, f.style = gn, f.subset = function(e, t) {
    return Fu(t, e);
  }, f.sum = function(e, t) {
    let n = 0;
    if (t === void 0)
      for (let r of e)
        (r = +r) && (n += r);
    else {
      let r = -1;
      for (let i of e)
        (i = +t(i, ++r, e)) && (n += i);
    }
    return n;
  }, f.superset = Fu, f.svg = Av, f.symbol = function(e, t) {
    let n = null;
    function r() {
      let i;
      if (n || (n = i = Zt()), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), i)
        return n = null, i + "" || null;
    }
    return e = typeof e == "function" ? e : ce(e || ca), t = typeof t == "function" ? t : ce(t === void 0 ? 64 : +t), r.type = function(i) {
      return arguments.length ? (e = typeof i == "function" ? i : ce(i), r) : e;
    }, r.size = function(i) {
      return arguments.length ? (t = typeof i == "function" ? i : ce(+i), r) : t;
    }, r.context = function(i) {
      return arguments.length ? (n = i ?? null, r) : n;
    }, r;
  }, f.symbolAsterisk = hp, f.symbolCircle = ca, f.symbolCross = dp, f.symbolDiamond = gp, f.symbolDiamond2 = mp, f.symbolPlus = vp, f.symbolSquare = bp, f.symbolSquare2 = yp, f.symbolStar = xp, f.symbolTriangle = wp, f.symbolTriangle2 = Mp, f.symbolWye = Ep, f.symbolX = Sp, f.symbols = Tp, f.symbolsFill = Tp, f.symbolsStroke = j_, f.text = io, f.thresholdFreedmanDiaconis = function(e, t, n) {
    return Math.ceil((n - t) / (2 * (Er(e, 0.75) - Er(e, 0.25)) * Math.pow(re(e), -1 / 3)));
  }, f.thresholdScott = function(e, t, n) {
    return Math.ceil((n - t) * Math.cbrt(re(e)) / (3.49 * ge(e)));
  }, f.thresholdSturges = ka, f.tickFormat = Cd, f.tickIncrement = Bn, f.tickStep = Un, f.ticks = qn, f.timeDay = ci, f.timeDays = ty, f.timeFormatDefaultLocale = T0, f.timeFormatLocale = f0, f.timeFriday = Gd, f.timeFridays = ay, f.timeHour = Hl, f.timeHours = ey, f.timeInterval = Le, f.timeMillisecond = Dl, f.timeMilliseconds = jd, f.timeMinute = Yl, f.timeMinutes = Qb, f.timeMonday = fi, f.timeMondays = ny, f.timeMonth = Vl, f.timeMonths = ly, f.timeSaturday = Xd, f.timeSaturdays = sy, f.timeSecond = nn, f.timeSeconds = qd, f.timeSunday = pr, f.timeSundays = Zd, f.timeThursday = $n, f.timeThursdays = oy, f.timeTickInterval = c0, f.timeTicks = u0, f.timeTuesday = Hd, f.timeTuesdays = ry, f.timeWednesday = Vd, f.timeWednesdays = iy, f.timeWeek = pr, f.timeWeeks = Zd, f.timeYear = rn, f.timeYears = uy, f.timeout = ts, f.timer = Xi, f.timerFlush = Bc, f.transition = Vc, f.transpose = Ru, f.tree = function() {
    var e = kb, t = 1, n = 1, r = null;
    function i(l) {
      var u = function(v) {
        for (var M, _, y, E, S, O = new Zo(v, 0), j = [O]; M = j.pop(); )
          if (y = M._.children)
            for (M.children = new Array(S = y.length), E = S - 1; E >= 0; --E)
              j.push(_ = M.children[E] = new Zo(y[E], E)), _.parent = M;
        return (O.parent = new Zo(null, 0)).children = [O], O;
      }(l);
      if (u.eachAfter(o), u.parent.m = -u.z, u.eachBefore(a), r)
        l.eachBefore(s);
      else {
        var c = l, d = l, h = l;
        l.eachBefore(function(v) {
          v.x < c.x && (c = v), v.x > d.x && (d = v), v.depth > h.depth && (h = v);
        });
        var p = c === d ? 1 : e(c, d) / 2, b = p - c.x, m = t / (d.x + p + b), g = n / (h.depth || 1);
        l.eachBefore(function(v) {
          v.x = (v.x + b) * m, v.y = v.depth * g;
        });
      }
      return l;
    }
    function o(l) {
      var u = l.children, c = l.parent.children, d = l.i ? c[l.i - 1] : null;
      if (u) {
        (function(p) {
          for (var b, m = 0, g = 0, v = p.children, M = v.length; --M >= 0; )
            (b = v[M]).z += m, b.m += m, m += b.s + (g += b.c);
        })(l);
        var h = (u[0].z + u[u.length - 1].z) / 2;
        d ? (l.z = d.z + e(l._, d._), l.m = l.z - h) : l.z = h;
      } else
        d && (l.z = d.z + e(l._, d._));
      l.parent.A = function(p, b, m) {
        if (b) {
          for (var g, v = p, M = p, _ = b, y = v.parent.children[0], E = v.m, S = M.m, O = _.m, j = y.m; _ = Tl(_), v = Sl(v), _ && v; )
            y = Sl(y), (M = Tl(M)).a = p, (g = _.z + O - v.z - E + e(_._, v._)) > 0 && (Ab(Nb(_, p, m), p, g), E += g, S += g), O += _.m, E += v.m, j += y.m, S += M.m;
          _ && !Tl(M) && (M.t = _, M.m += O - S), v && !Sl(y) && (y.t = v, y.m += E - j, m = p);
        }
        return m;
      }(l, d, l.parent.A || c[0]);
    }
    function a(l) {
      l._.x = l.z + l.parent.m, l.m += l.parent.m;
    }
    function s(l) {
      l.x *= t, l.y = l.depth * n;
    }
    return i.separation = function(l) {
      return arguments.length ? (e = l, i) : e;
    }, i.size = function(l) {
      return arguments.length ? (r = !1, t = +l[0], n = +l[1], i) : r ? null : [t, n];
    }, i.nodeSize = function(l) {
      return arguments.length ? (r = !0, t = +l[0], n = +l[1], i) : r ? [t, n] : null;
    }, i;
  }, f.treemap = function() {
    var e = xd, t = !1, n = 1, r = 1, i = [0], o = Ln, a = Ln, s = Ln, l = Ln, u = Ln;
    function c(h) {
      return h.x0 = h.y0 = 0, h.x1 = n, h.y1 = r, h.eachBefore(d), i = [0], t && h.eachBefore(md), h;
    }
    function d(h) {
      var p = i[h.depth], b = h.x0 + p, m = h.y0 + p, g = h.x1 - p, v = h.y1 - p;
      g < b && (b = g = (b + g) / 2), v < m && (m = v = (m + v) / 2), h.x0 = b, h.y0 = m, h.x1 = g, h.y1 = v, h.children && (p = i[h.depth + 1] = o(h) / 2, b += u(h) - p, m += a(h) - p, (g -= s(h) - p) < b && (b = g = (b + g) / 2), (v -= l(h) - p) < m && (m = v = (m + v) / 2), e(h, b, m, g, v));
    }
    return c.round = function(h) {
      return arguments.length ? (t = !!h, c) : t;
    }, c.size = function(h) {
      return arguments.length ? (n = +h[0], r = +h[1], c) : [n, r];
    }, c.tile = function(h) {
      return arguments.length ? (e = od(h), c) : e;
    }, c.padding = function(h) {
      return arguments.length ? c.paddingInner(h).paddingOuter(h) : c.paddingInner();
    }, c.paddingInner = function(h) {
      return arguments.length ? (o = typeof h == "function" ? h : dr(+h), c) : o;
    }, c.paddingOuter = function(h) {
      return arguments.length ? c.paddingTop(h).paddingRight(h).paddingBottom(h).paddingLeft(h) : c.paddingTop();
    }, c.paddingTop = function(h) {
      return arguments.length ? (a = typeof h == "function" ? h : dr(+h), c) : a;
    }, c.paddingRight = function(h) {
      return arguments.length ? (s = typeof h == "function" ? h : dr(+h), c) : s;
    }, c.paddingBottom = function(h) {
      return arguments.length ? (l = typeof h == "function" ? h : dr(+h), c) : l;
    }, c.paddingLeft = function(h) {
      return arguments.length ? (u = typeof h == "function" ? h : dr(+h), c) : u;
    }, c;
  }, f.treemapBinary = function(e, t, n, r, i) {
    var o, a, s = e.children, l = s.length, u = new Array(l + 1);
    for (u[0] = a = o = 0; o < l; ++o)
      u[o + 1] = a += s[o].value;
    (function c(d, h, p, b, m, g, v) {
      if (d >= h - 1) {
        var M = s[d];
        return M.x0 = b, M.y0 = m, M.x1 = g, void (M.y1 = v);
      }
      for (var _ = u[d], y = p / 2 + _, E = d + 1, S = h - 1; E < S; ) {
        var O = E + S >>> 1;
        u[O] < y ? E = O + 1 : S = O;
      }
      y - u[E - 1] < u[E] - y && d + 1 < E && --E;
      var j = u[E] - _, z = p - j;
      if (g - b > v - m) {
        var C = p ? (b * z + g * j) / p : g;
        c(d, E, j, b, m, C, v), c(E, h, z, C, m, g, v);
      } else {
        var N = p ? (m * z + v * j) / p : v;
        c(d, E, j, b, m, g, N), c(E, h, z, b, N, g, v);
      }
    })(0, l, e.value, t, n, r, i);
  }, f.treemapDice = ai, f.treemapResquarify = Cb, f.treemapSlice = Wo, f.treemapSliceDice = function(e, t, n, r, i) {
    (1 & e.depth ? Wo : ai)(e, t, n, r, i);
  }, f.treemapSquarify = xd, f.tsv = Ev, f.tsvFormat = pv, f.tsvFormatBody = gv, f.tsvFormatRow = vv, f.tsvFormatRows = mv, f.tsvFormatValue = bv, f.tsvParse = kf, f.tsvParseRows = dv, f.union = function(...e) {
    const t = new ut();
    for (const n of e)
      for (const r of n)
        t.add(r);
    return t;
  }, f.utcDay = hi, f.utcDays = hy, f.utcFriday = n0, f.utcFridays = vy, f.utcHour = Zl, f.utcHours = fy, f.utcMillisecond = Dl, f.utcMilliseconds = jd, f.utcMinute = Xl, f.utcMinutes = cy, f.utcMonday = di, f.utcMondays = dy, f.utcMonth = Wl, f.utcMonths = yy, f.utcSaturday = r0, f.utcSaturdays = by, f.utcSecond = nn, f.utcSeconds = qd, f.utcSunday = gr, f.utcSundays = i0, f.utcThursday = In, f.utcThursdays = my, f.utcTickInterval = l0, f.utcTicks = s0, f.utcTuesday = e0, f.utcTuesdays = py, f.utcWednesday = t0, f.utcWednesdays = gy, f.utcWeek = gr, f.utcWeeks = i0, f.utcYear = on, f.utcYears = _y, f.variance = oe, f.version = "7.4.4", f.window = $a, f.xml = Tv, f.zip = function() {
    return Ru(arguments);
  }, f.zoom = function() {
    var e, t, n, r = J_, i = K_, o = tx, a = Q_, s = ex, l = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], c = 250, d = Ic, h = pn("start", "zoom", "end"), p = 500, b = 0, m = 10;
    function g(T) {
      T.property("__zoom", Hp).on("wheel.zoom", O, { passive: !1 }).on("mousedown.zoom", j).on("dblclick.zoom", z).filter(s).on("touchstart.zoom", C).on("touchmove.zoom", N).on("touchend.zoom touchcancel.zoom", P).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function v(T, A) {
      return (A = Math.max(l[0], Math.min(l[1], A))) === T.k ? T : new $t(A, T.x, T.y);
    }
    function M(T, A, $) {
      var I = A[0] - $[0] * T.k, D = A[1] - $[1] * T.k;
      return I === T.x && D === T.y ? T : new $t(T.k, I, D);
    }
    function _(T) {
      return [(+T[0][0] + +T[1][0]) / 2, (+T[0][1] + +T[1][1]) / 2];
    }
    function y(T, A, $, I) {
      T.on("start.zoom", function() {
        E(this, arguments).event(I).start();
      }).on("interrupt.zoom end.zoom", function() {
        E(this, arguments).event(I).end();
      }).tween("zoom", function() {
        var D = this, B = arguments, H = E(D, B).event(I), Z = i.apply(D, B), V = $ == null ? _(Z) : typeof $ == "function" ? $.apply(D, B) : $, ae = Math.max(Z[1][0] - Z[0][0], Z[1][1] - Z[0][1]), se = D.__zoom, K = typeof A == "function" ? A.apply(D, B) : A, te = d(se.invert(V).concat(ae / se.k), K.invert(V).concat(ae / K.k));
        return function(ye) {
          if (ye === 1)
            ye = K;
          else {
            var he = te(ye), rt = ae / he[2];
            ye = new $t(rt, V[0] - he[0] * rt, V[1] - he[1] * rt);
          }
          H.zoom(null, ye);
        };
      });
    }
    function E(T, A, $) {
      return !$ && T.__zooming || new S(T, A);
    }
    function S(T, A) {
      this.that = T, this.args = A, this.active = 0, this.sourceEvent = null, this.extent = i.apply(T, A), this.taps = 0;
    }
    function O(T, ...A) {
      if (r.apply(this, arguments)) {
        var $ = E(this, A).event(T), I = this.__zoom, D = Math.max(l[0], Math.min(l[1], I.k * Math.pow(2, a.apply(this, arguments)))), B = ct(T);
        if ($.wheel)
          $.mouse[0][0] === B[0] && $.mouse[0][1] === B[1] || ($.mouse[1] = I.invert($.mouse[0] = B)), clearTimeout($.wheel);
        else {
          if (I.k === D)
            return;
          $.mouse = [B, I.invert(B)], wn(this), $.start();
        }
        yi(T), $.wheel = setTimeout(H, 150), $.zoom("mouse", o(M(v(I, D), $.mouse[0], $.mouse[1]), $.extent, u));
      }
      function H() {
        $.wheel = null, $.end();
      }
    }
    function j(T, ...A) {
      if (!n && r.apply(this, arguments)) {
        var $ = T.currentTarget, I = E(this, A, !0).event(T), D = De(T.view).on("mousemove.zoom", V, !0).on("mouseup.zoom", ae, !0), B = ct(T, $), H = T.clientX, Z = T.clientY;
        Ci(T.view), pu(T), I.mouse = [B, this.__zoom.invert(B)], wn(this), I.start();
      }
      function V(se) {
        if (yi(se), !I.moved) {
          var K = se.clientX - H, te = se.clientY - Z;
          I.moved = K * K + te * te > b;
        }
        I.event(se).zoom("mouse", o(M(I.that.__zoom, I.mouse[0] = ct(se, $), I.mouse[1]), I.extent, u));
      }
      function ae(se) {
        D.on("mousemove.zoom mouseup.zoom", null), zi(se.view, I.moved), yi(se), I.event(se).end();
      }
    }
    function z(T, ...A) {
      if (r.apply(this, arguments)) {
        var $ = this.__zoom, I = ct(T.changedTouches ? T.changedTouches[0] : T, this), D = $.invert(I), B = $.k * (T.shiftKey ? 0.5 : 2), H = o(M(v($, B), I, D), i.apply(this, A), u);
        yi(T), c > 0 ? De(this).transition().duration(c).call(y, H, I, T) : De(this).call(g.transform, H, I, T);
      }
    }
    function C(T, ...A) {
      if (r.apply(this, arguments)) {
        var $, I, D, B, H = T.touches, Z = H.length, V = E(this, A, T.changedTouches.length === Z).event(T);
        for (pu(T), I = 0; I < Z; ++I)
          B = [B = ct(D = H[I], this), this.__zoom.invert(B), D.identifier], V.touch0 ? V.touch1 || V.touch0[2] === B[2] || (V.touch1 = B, V.taps = 0) : (V.touch0 = B, $ = !0, V.taps = 1 + !!e);
        e && (e = clearTimeout(e)), $ && (V.taps < 2 && (t = B[0], e = setTimeout(function() {
          e = null;
        }, p)), wn(this), V.start());
      }
    }
    function N(T, ...A) {
      if (this.__zooming) {
        var $, I, D, B, H = E(this, A).event(T), Z = T.changedTouches, V = Z.length;
        for (yi(T), $ = 0; $ < V; ++$)
          D = ct(I = Z[$], this), H.touch0 && H.touch0[2] === I.identifier ? H.touch0[0] = D : H.touch1 && H.touch1[2] === I.identifier && (H.touch1[0] = D);
        if (I = H.that.__zoom, H.touch1) {
          var ae = H.touch0[0], se = H.touch0[1], K = H.touch1[0], te = H.touch1[1], ye = (ye = K[0] - ae[0]) * ye + (ye = K[1] - ae[1]) * ye, he = (he = te[0] - se[0]) * he + (he = te[1] - se[1]) * he;
          I = v(I, Math.sqrt(ye / he)), D = [(ae[0] + K[0]) / 2, (ae[1] + K[1]) / 2], B = [(se[0] + te[0]) / 2, (se[1] + te[1]) / 2];
        } else {
          if (!H.touch0)
            return;
          D = H.touch0[0], B = H.touch0[1];
        }
        H.zoom("touch", o(M(I, D, B), H.extent, u));
      }
    }
    function P(T, ...A) {
      if (this.__zooming) {
        var $, I, D = E(this, A).event(T), B = T.changedTouches, H = B.length;
        for (pu(T), n && clearTimeout(n), n = setTimeout(function() {
          n = null;
        }, p), $ = 0; $ < H; ++$)
          I = B[$], D.touch0 && D.touch0[2] === I.identifier ? delete D.touch0 : D.touch1 && D.touch1[2] === I.identifier && delete D.touch1;
        if (D.touch1 && !D.touch0 && (D.touch0 = D.touch1, delete D.touch1), D.touch0)
          D.touch0[1] = this.__zoom.invert(D.touch0[0]);
        else if (D.end(), D.taps === 2 && (I = ct(I, this), Math.hypot(t[0] - I[0], t[1] - I[1]) < m)) {
          var Z = De(this).on("dblclick.zoom");
          Z && Z.apply(this, arguments);
        }
      }
    }
    return g.transform = function(T, A, $, I) {
      var D = T.selection ? T.selection() : T;
      D.property("__zoom", Hp), T !== D ? y(T, A, $, I) : D.interrupt().each(function() {
        E(this, arguments).event(I).start().zoom(null, typeof A == "function" ? A.apply(this, arguments) : A).end();
      });
    }, g.scaleBy = function(T, A, $, I) {
      g.scaleTo(T, function() {
        var D = this.__zoom.k, B = typeof A == "function" ? A.apply(this, arguments) : A;
        return D * B;
      }, $, I);
    }, g.scaleTo = function(T, A, $, I) {
      g.transform(T, function() {
        var D = i.apply(this, arguments), B = this.__zoom, H = $ == null ? _(D) : typeof $ == "function" ? $.apply(this, arguments) : $, Z = B.invert(H), V = typeof A == "function" ? A.apply(this, arguments) : A;
        return o(M(v(B, V), H, Z), D, u);
      }, $, I);
    }, g.translateBy = function(T, A, $, I) {
      g.transform(T, function() {
        return o(this.__zoom.translate(typeof A == "function" ? A.apply(this, arguments) : A, typeof $ == "function" ? $.apply(this, arguments) : $), i.apply(this, arguments), u);
      }, null, I);
    }, g.translateTo = function(T, A, $, I, D) {
      g.transform(T, function() {
        var B = i.apply(this, arguments), H = this.__zoom, Z = I == null ? _(B) : typeof I == "function" ? I.apply(this, arguments) : I;
        return o(va.translate(Z[0], Z[1]).scale(H.k).translate(typeof A == "function" ? -A.apply(this, arguments) : -A, typeof $ == "function" ? -$.apply(this, arguments) : -$), B, u);
      }, I, D);
    }, S.prototype = { event: function(T) {
      return T && (this.sourceEvent = T), this;
    }, start: function() {
      return ++this.active == 1 && (this.that.__zooming = this, this.emit("start")), this;
    }, zoom: function(T, A) {
      return this.mouse && T !== "mouse" && (this.mouse[1] = A.invert(this.mouse[0])), this.touch0 && T !== "touch" && (this.touch0[1] = A.invert(this.touch0[0])), this.touch1 && T !== "touch" && (this.touch1[1] = A.invert(this.touch1[0])), this.that.__zoom = A, this.emit("zoom"), this;
    }, end: function() {
      return --this.active == 0 && (delete this.that.__zooming, this.emit("end")), this;
    }, emit: function(T) {
      var A = De(this.that).datum();
      h.call(T, this.that, new W_(T, { sourceEvent: this.sourceEvent, target: g, type: T, transform: this.that.__zoom, dispatch: h }), A);
    } }, g.wheelDelta = function(T) {
      return arguments.length ? (a = typeof T == "function" ? T : ma(+T), g) : a;
    }, g.filter = function(T) {
      return arguments.length ? (r = typeof T == "function" ? T : ma(!!T), g) : r;
    }, g.touchable = function(T) {
      return arguments.length ? (s = typeof T == "function" ? T : ma(!!T), g) : s;
    }, g.extent = function(T) {
      return arguments.length ? (i = typeof T == "function" ? T : ma([[+T[0][0], +T[0][1]], [+T[1][0], +T[1][1]]]), g) : i;
    }, g.scaleExtent = function(T) {
      return arguments.length ? (l[0] = +T[0], l[1] = +T[1], g) : [l[0], l[1]];
    }, g.translateExtent = function(T) {
      return arguments.length ? (u[0][0] = +T[0][0], u[1][0] = +T[1][0], u[0][1] = +T[0][1], u[1][1] = +T[1][1], g) : [[u[0][0], u[0][1]], [u[1][0], u[1][1]]];
    }, g.constrain = function(T) {
      return arguments.length ? (o = T, g) : o;
    }, g.duration = function(T) {
      return arguments.length ? (c = +T, g) : c;
    }, g.interpolate = function(T) {
      return arguments.length ? (d = T, g) : d;
    }, g.on = function() {
      var T = h.on.apply(h, arguments);
      return T === h ? g : T;
    }, g.clickDistance = function(T) {
      return arguments.length ? (b = (T = +T) * T, g) : Math.sqrt(b);
    }, g.tapDistance = function(T) {
      return arguments.length ? (m = +T, g) : m;
    }, g;
  }, f.zoomIdentity = va, f.zoomTransform = Yp, Object.defineProperty(f, "__esModule", { value: !0 });
});
const c1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
class _u extends HTMLElement {
  // syntactical sugar for event bindings to IDs
  bindEvents(w) {
    let x = Object.keys(w), k = this;
    x.forEach((F) => {
      if (!w[F])
        throw new Error(`Bad binding supplied for ${F}`);
      let [R, U] = F.split("@"), X = k.shadow.querySelector(R);
      X[U] = function() {
        w[F].apply(k, arguments);
      };
    });
  }
}
const ya = {
  choiceAmong: function(f, w) {
    return f.indexOf(w) >= 0;
  },
  boolean: function(f) {
    return choiceAmong(["true", 1, "yes", "True", !0], f);
  },
  string: function(f) {
    return String(f);
  },
  number: function(f) {
    return Number(f);
  },
  function: function(f) {
    return f;
  }
}, ix = /\${[^{}]+}/g;
function ox(f, w, x = "") {
  return f.split(".").reduce((k, F) => k[F] || x, w);
}
function xu(f, w, x) {
  return f.replace(ix, (k) => {
    const F = k.slice(2, -1).trim();
    return ox(F, w, x);
  });
}
const Xp = `
  <svg xmlns="http://www.w3.org/2000/svg"
      role="graphics-symbol"
      aria-labelledby="Rate"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-gauge"
  >
      <path d="m12 14 4-4"/>
      <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
  </svg>
`, ax = `
  <svg xmlns="http://www.w3.org/2000/svg"
    role="graphics-symbol"
    aria-labelledby="In Volume"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-arrow-right-to-line"
  >
    <path d="M17 12H3"/>
    <path d="m11 18 6-6-6-6"/>
    <path d="M21 5v14"/>
  </svg>`, sx = `
    <svg xmlns="http://www.w3.org/2000/svg"
      role="graphics-symbol"
      aria-labelledby="Out Volume"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-left-from-line"
    >
      <path d="m9 6-6 6 6 6"/>
      <path d="M3 12h14"/>
      <path d="M21 19V5"/>
    </svg>
  `, f1 = `
  <div class="flow-tooltip">
    <strong>\${name}</strong>
  </div>
  <div class="flow-tooltip">
    <strong>${ax} \${inValue}</strong>
  </div>
  <div class="flow-tooltip">
    <strong>${sx} \${outValue}</strong>
  </div>
`, lx = `
  <div class="flow-tooltip">
    <strong>
      \${forward.from} → \${forward.to}
      <br />
      ${Xp} \${forward.dataPoint}
    </strong>
  </div>
  <div class="flow-tooltip">
    <span>
      \${reverse.from} → \${reverse.to}
      <br />
      ${Xp} \${reverse.dataPoint}
    </span>
  </div>
`, ne = xi, xe = window.d3 || c1;
function Zp(f, w, x, k) {
  if (f)
    for (var F = "http://www.w3.org/2000/svg", R = 12, U = 0; U < Math.floor(f.getTotalLength() / R); U++) {
      f.getAttribute("d");
      var X = k * 1.2, q = document.createElementNS(F, "g");
      q.setAttributeNS(null, "class", w);
      var Y = document.createElementNS(F, "polygon");
      Y.setAttributeNS(null, "points", `
        ${R / 5 * 3 - X / 3 * 2},${X}
        -${X / 3 * 2},${X}
        0,0
        -${X / 3 * 2},-${X}
        ${R / 5 * 3 - X / 3 * 2},-${X}
        ${R / 5 * 3},0`), Y.setAttributeNS(null, "fill", x);
      var G = U * R, re = (U + 1) * R > f.getTotalLength() ? f.getTotalLength() : (U + 1) * R, ie = f.getPointAtLength(G), W = f.getPointAtLength(re), Q = { dx: W.x - ie.x, dy: W.y - ie.y }, oe = Math.atan2(Q.dy, Q.dx), ge = oe * (180 / Math.PI);
      q.setAttributeNS(null, "transform", `translate(${ie.x} ${ie.y}) rotate(${ge})`), q.appendChild(Y), f.parentElement.insertBefore(q, f);
    }
}
function it(f) {
  const w = "S_S_E_E_P_P_A_A_R_R_A_A_T_T_O_O_R_R";
  var x = f.replaceAll("--", w);
  return x = x.replaceAll(/[ \-\/\\]+/g, "-"), x = x.replaceAll(/[^\w-]/g, ""), x = x.replaceAll(w, "--"), x;
}
function ux(f, w, x, k, F) {
  x.div;
  const R = x.options.layers[k].edgeWidth, U = x.options.layers[k].color;
  var X = f.selectAll("path.edge-az").data(w.edges);
  const q = (W, Q) => {
    var oe = xe.select(W.target);
    const ge = oe.classed("edge-az");
    var Ce = Q.azColor ? Q.azColor : U;
    ge || (Ce = Q.zaColor ? Q.zaColor : U), oe.classed("animated-edge") || (Zp(W.target, "dash-over", Ce, R), oe.classed("animated-edge", !0)), ne.publish("hideTooltip", null, x.svg.node());
    var me = x.options.enableCustomEdgeTooltip ? x.options.customEdgeTooltip : lx;
    const je = { from: Q.nodeA, to: Q.nodeZ, dataPoint: Q.azDisplayValue }, ut = { from: Q.nodeZ, to: Q.nodeA, dataPoint: Q.zaDisplayValue };
    var Fn = xu(me, {
      forward: ge ? je : ut,
      reverse: ge ? ut : je
    });
    ne.publish("showTooltip", { event: W, text: Fn }, x.svg.node());
  }, Y = (W, Q) => {
    ne.publish("hideTooltip", null, x.svg.node());
    const oe = xe.select(W.target);
    var ge = Q.azColor ? Q.azColor : U;
    oe.classed("edge-za") && (ge = Q.zaColor ? Q.zaColor : U), oe.attr("stroke", ge);
    for (var Ce = document.querySelectorAll(".dash-over"), me = 0; me < Ce.length; me++)
      Ce[me].remove();
    oe.classed("selected") || oe.classed("animated-edge", !1);
  };
  X.enter().append("path").merge(X).attr("d", function(W) {
    return W.azPath.indexOf("NaN") > -1 ? null : W.azPath;
  }).attr("stroke", function(W) {
    return W.azColor ? W.azColor : U;
  }).attr("stroke-width", R).attr("class", function(W) {
    var Q = it(W.name), oe = " cnxn-" + Q.split("--").join(" cnxn-"), ge = " l" + k;
    return "edge edge-az edge-az-" + Q + oe + ge;
  }).attr("text", function(W) {
    return W.AZname;
  }).attr("pointer-events", "stroke").on("mousedown", function(W, Q) {
    W.stopPropagation(), ne.publish("clearSelection", null, x.svg.node());
    const oe = {
      selection: Q,
      event: W,
      layer: k,
      type: "edge",
      instance: x.mapCanvas.id
    };
    ne.publish("setVariables", Q, x.svg.node()), ne.publish("setSelection", oe, x.svg.node()), ne.global.publish("setSelection", oe);
  }).on("mouseover", q).on("mouseout", Y), X.exit().remove();
  var G = f.selectAll("path.edge-za").data(w.edges);
  G.enter().append("path").merge(G).attr("d", function(W) {
    return W.zaPath.indexOf("NaN") > -1 ? null : W.zaPath;
  }).attr("stroke", function(W) {
    return W.zaColor ? W.zaColor : U;
  }).attr("stroke-width", R).attr("class", function(W) {
    var Ce, me, je;
    var Q = it(W.name), oe = " cnxn-" + Q.split("--").join(" cnxn-");
    (me = (Ce = W.meta) == null ? void 0 : Ce.endpoint_identifiers) != null && me.pops && ((je = W.meta.endpoint_identifiers.pops) != null && je.length) && (oe += " cnxn-" + W.meta.endpoint_identifiers.pops.join(" cnxn-"));
    var ge = " l" + k;
    return "edge edge-za edge-za-" + Q + oe + ge;
  }).attr("text", function(W) {
    return W.ZAname;
  }).attr("pointer-events", "stroke").on("mousedown", function(W, Q) {
    W.stopPropagation(), ne.publish("clearSelection", null, x.svg.node());
    const oe = {
      selection: Q,
      event: W,
      layer: k,
      type: "edge"
    };
    ne.publish("setVariables", Q, x.svg.node()), ne.publish("setSelection", oe, x.svg.node()), ne.global.publish("setSelection", oe);
  }).on("mouseover", q).on("mouseout", Y), G.exit().remove();
  function re(W) {
    for (var Q = document.querySelectorAll(".dash-selected, .dash-over"), oe = 0; oe < Q.length; oe++)
      Q[oe].remove();
    xe.selectAll(".selected").classed("selected", !1).classed("animated-edge", !1).classed("edge", !0);
    var ge = it(W.selection.name), Ce = "map-" + x.mapCanvas.instanceId, me = {
      az: { selector: `#${Ce} .l${W.layer}.edge-az-${ge}`, color: W.selection.azColor },
      za: { selector: `#${Ce} .l${W.layer}.edge-za-${ge}`, color: W.selection.zaColor }
    };
    Object.keys(me).forEach((je) => {
      var ut = U, dn = me[je].color, Fn = me[je].selector;
      dn && (ut = dn);
      var xr = xe.select(Fn);
      Zp(
        xr.node(),
        "dash-selected",
        ut,
        R
      ), xr.classed("selected", !0).classed("animated-edge", !0);
    });
  }
  ne.subscribe("setSelection", re, x.svg.node()), ne.subscribe("clearSelection", function() {
    ne.clearLast("setSelection", x.svg.node()), ne.global.clearLast("setSelection");
  }, x.svg.node());
  var ie = ne.last("setSelection", x.svg.node());
  ie && ie.type == "edge" && re(ie);
}
function cx(f, w, x, k, F) {
  for (var R = 0; R < x.coordinates.length; R++)
    if (x.coordinates[R] == w) {
      var U = JSON.parse(JSON.stringify(x));
      x.coordinates.splice(R, 1), ne.publish("updateMapEdge", { layer: F, edge: x, oldEdge: U }, k.svg.node()), ne.publish("updateMapTopology", k.data, k.svg.node()), ne.publish("refresh", null, k.svg.node()), ne.publish("updateTopologyData", null, k.svg.node());
      break;
    }
}
function fx(f, w, x, k) {
  var F = x.leafletMap.getContainer(), R = x.leafletMap.containerPointToLatLng(L.point(xe.pointer(f, F))), U = JSON.parse(JSON.stringify(w.__data__)), X = w.__data__.coordinates, q = [R.lat, R.lng], Y = 0, G = 0, re = 0, ie = 1e3;
  for (Y = 0; Y < X.length - 1; Y++) {
    var W = Math.abs(Math.atan((X[Y][1] - q[1]) / (X[Y][0] - q[0]))), Q = Math.abs(Math.atan((X[Y][1] - X[Y + 1][1]) / (X[Y][0] - X[Y + 1][0]))), oe = Math.abs(W - Q);
    oe < 0.1 && oe < ie && (ie = oe, G = Y + 1, re = 1);
  }
  if (re == 1) {
    var ge = X.slice(0, G);
    ge.push(q), X = ge.concat(X.slice(G)), w.__data__.coordinates = X, x.update(), ne.publish("updateMapEdge", { layer: k, edge: w.__data__, oldEdge: U }, x.svg.node());
  }
}
function bu(f, w, x, k) {
  var F = "map-" + x.instanceId, R = x.options.multiLayerNodeSnap ? "" : `.l${w}`, U = {};
  U.lat = f.coordinate[0], U.lng = f.coordinate[1];
  var X = `#${F} ${R}.cnxn-${it(f.name)}`;
  xe.selectAll(X).attr("d", function(q) {
    var Y = null;
    k && (Y = JSON.parse(JSON.stringify(q)));
    var G = 0, re = 1, ie = q.coordinates.length - 1;
    q.nodeZ == f.name && (G = q.coordinates.length - 1, re = -1, ie = 0), q.coordinates[G][0] = U.lat, q.coordinates[G][1] = U.lng;
    for (var W = q.coordinates.length - 1, Q = (U.lat - q.coordinates[ie][0]) / W, oe = (U.lng - q.coordinates[ie][1]) / W, ge = G + re; ge != ie; ge += re)
      ie > 0 ? (q.coordinates[ge][0] = U.lat - Q * ge, q.coordinates[ge][1] = U.lng - oe * ge) : (q.coordinates[ge][0] = q.coordinates[ie][0] + Q * ge, q.coordinates[ge][1] = q.coordinates[ie][1] + oe * ge);
    k && ne.publish("updateMapEdge", { layer: w, edge: q, oldEdge: Y }, x);
  });
}
function hx(f, w, x, k) {
  var F = f.selectAll("circle").data(w.nodes);
  const R = (q) => {
    if (q && q.type == "nodes") {
      xe.selectAll(".control-selected").classed("control-selected", !1);
      var Y = `.controlPoint.control-point-layer${q.layer}.control-point-for-node-${it(q.object.name)}`;
      xe.select(Y).classed("control-selected", !0);
    }
  };
  function U(q, Y) {
    var G = x.leafletMap.getContainer();
    ne.publish("dragStarted", { event: q, node: { ...Y } }, x.svg.node());
    var re = x.leafletMap.containerPointToLatLng(L.point(xe.pointer(q, G)));
    Y.coordinate[0] = re.lat, Y.coordinate[1] = re.lng, bu(Y, k, x.mapCanvas, !1), x.update(), R(ne.last("setEditSelection", x.svg.node()));
  }
  function X(q, Y) {
    if (ne.last("dragStarted", x.svg.node())) {
      var G = ne.last("dragStarted", x.svg.node());
      ne.publish("updateMapNode", { layer: k, node: Y, oldNode: G.node }, x.svg.node()), ne.clearLast("dragStarted", x.svg.node()), bu(Y, k, x.mapCanvas, !0), x.update(), x.mapCanvas.updateTopology ? x.mapCanvas.updateTopology([
        x.data[0],
        x.data[1],
        x.data[2]
      ]) : ne.publish("updateTopology", [
        x.data[0],
        x.data[1],
        x.data[2]
      ], x.svg.node()), xe.select(`.control-point-layer${k}.control-point-for-node-${it(Y.name)}`).classed("control-selected", !0);
    }
  }
  F.enter().append("circle").attr("r", 6).attr("class", function(q) {
    return `control controlPoint control-point-layer${k} control-point-for-node-${it(q.name)}`;
  }).attr("data-layer", k).attr("data-index", function(q, Y) {
    return Y;
  }).merge(F).on("dblclick", function(q, Y) {
    Y.layer = "layer" + k;
    var G = 0, re = null;
    q.currentTarget.parentElement.childNodes.forEach(function(ie) {
      ie == q.currentTarget && (re = G), G++;
    }), ne.publish("showEditNodeDialog", { object: Y, index: re, layer: Y.layer }, x.svg.node());
  }).on("mouseover", function(q, Y) {
    let G;
    const re = x.options.enableCustomNodeTooltip ? x.options.customNodeTooltip : f1;
    G = xu(re, { ...Y, self: Y }), ne.publish("showTooltip", { event: q, text: G }, x.svg.node());
  }).on("mouseleave", function() {
    ne.publish("hideTooltip", null, x.svg.node());
  }).on("mouseenter", function() {
    x.mapCanvas.options.enableScrolling && x.leafletMap.dragging.disable();
  }).on("mouseout", function() {
    x.mapCanvas.options.enableScrolling && x.leafletMap.dragging.enable();
  }).on("mousedown", function(q, Y) {
    q.stopPropagation(), ne.publish("setEditSelection", {
      object: Y,
      index: Number(q.target.getAttribute("data-index")),
      layer: Number(q.target.getAttribute("data-layer")),
      type: "nodes"
    }, x.svg.node());
  }).call(xe.drag().on("drag", U).on("end", X)), R(ne.last("setEditSelection", x.svg.node())), ne.subscribe("setEditSelection", R, x.svg.node()), f.selectAll("circle").attr("transform", function(q) {
    var Y = L.latLng(q.coordinate), G = x.leafletMap.latLngToLayerPoint(Y);
    return "translate(" + G.x + "," + G.y + ")";
  }), F.exit().remove();
}
function dx(f, w, x, k) {
  var F = f.selectAll("path").data(w.edges);
  F.enter().append("path").merge(F).attr("d", function(q) {
    return q.controlPointPath;
  }).attr("data-layer", k).attr("data-index", function(q, Y) {
    return Y;
  }).attr("class", function(q) {
    var Y = it(q.name), G = " control-for-" + Y.split("--").join(" control-for-"), re = " l" + k;
    return "control controlEdge edge-az-" + Y + G + re;
  }).on("dblclick", function(q) {
    fx(q, this, x, k);
  }).on("mousedown", function(q, Y) {
    q.stopPropagation();
    var G = Number(q.target.getAttribute("data-index")), re = Number(q.target.getAttribute("data-layer"));
    let ie = { object: Y, type: "edges", index: G, layer: re };
    ne.publish("setEditSelection", ie, x.svg.node());
  }).on("mouseenter", function() {
    x.mapCanvas.options.enableScrolling && x.leafletMap.dragging.disable();
  }).on("mouseout", function() {
    x.mapCanvas.options.enableScrolling && x.leafletMap.dragging.enable();
  });
  const R = (q) => {
    q && q.type == "edges" && (xe.selectAll(".control-selected").classed("control-selected", !1), xe.select(`.controlEdge.l${q.layer}.edge-az-${it(q.object.name)}`).classed("control-selected", !0));
  };
  R(ne.last("setEditSelection", x.svg.node())), ne.subscribe("setEditSelection", R, x.svg.node()), F.exit().remove(), f.selectAll("g").remove();
  function U(q, Y, G, re, ie) {
    ne.publish("dragStarted", { event: q, edge: { ...G } }, x.svg.node()), ne.publish("setEditSelection", { object: G, type: "edges", index: re, layer: ie }, x.svg.node());
    var W = x.leafletMap.getContainer(), Q = x.leafletMap.containerPointToLatLng(L.point(xe.pointer(q, W)));
    Y[0] = Q.lat, Y[1] = Q.lng, x.update(), xe.select(`.controlEdge.l${ie}.edge-az-${it(G.name)}`).classed("control-selected", !0);
  }
  function X(q, Y) {
    if (ne.last("dragStarted", x.svg.node())) {
      var G = ne.last("dragStarted", x.svg.node());
      ne.clearLast("dragStarted", x.svg.node()), x.leafletMap.getZoom(), L.latLng(x.leafletMap.getCenter()), ne.publish("updateMapEdge", { layer: k, edge: Y, oldEdge: G.edge }, x.svg.node()), x.mapCanvas.updateTopology ? x.mapCanvas.updateTopology([
        x.data[0],
        x.data[1],
        x.data[2]
      ]) : ne.publish("updateTopology", [
        x.data[0],
        x.data[1],
        x.data[2]
      ], x.svg.node()), xe.select(`.controlEdge.l${k}.edge-az-${it(Y.name)}`).classed("control-selected", !0);
    }
  }
  w.edges.forEach(function(q, Y) {
    var G = f.append("g"), re = G.selectAll("circle").data(q.coordinates);
    re.enter().append("circle").attr("r", 4).attr("class", function(ie) {
      return "control controlPoint control-point-for-edge-" + it(q.name);
    }).merge(re).on("mousedown", function(ie, W) {
      ie.stopPropagation();
      let Q = {
        object: q,
        index: Y,
        layer: k,
        type: "edges"
      };
      ne.publish("setEditSelection", Q, x.svg.node());
    }).call(xe.drag().on("drag", function(ie, W) {
      U(ie, W, q, Y, k);
    }).on("end", function(ie, W) {
      X(ie, q);
    })), G.selectAll("circle").attr("transform", function(ie) {
      var W = L.latLng(ie), Q = x.leafletMap.latLngToLayerPoint(W);
      return "translate(" + Q.x + "," + Q.y + ")";
    }).on("mouseenter", function() {
      x.mapCanvas.options.enableScrolling && x.leafletMap.dragging.disable();
    }).on("mouseout", function() {
      x.mapCanvas.options.enableScrolling && x.leafletMap.dragging.enable();
    }).on("dblclick", function(ie, W) {
      cx(ie, W, q, x, k);
    }), re.exit().remove();
  });
}
function px(f, w, x, k) {
  const F = x.options.layers[k].color;
  var R = f.selectAll("g.node").data(w.nodes);
  x.div, R.enter().append("g").attr("class", function(q) {
    var Y = it(q.name), G = ` l${k}`;
    return "node node-" + Y + G;
  }).attr("stroke-width", 0.25).attr("stroke", "black").append("g").attr("class", "scale-container").attr("transform", "scale(1.0, 1.0)").html(function(q) {
    var Y = `<circle r='${x.options.layers[k].nodeWidth}' />`;
    return q.meta.svg || Y;
  }).attr("text", function(q) {
    return q.name;
  }).attr("fill", function(q) {
    return q.color ? q.color : F;
  }).on("mouseover", function(q, Y) {
    xe.select(q.target.parentElement).attr("transform", "scale(1.5, 1.5)");
    const G = x.options.enableCustomNodeTooltip ? x.options.customNodeTooltip : f1;
    let re = xu(G, { ...Y, self: Y });
    ne.publish("showTooltip", { event: q, text: re }, x.svg.node());
  }).on("mouseout", function(q, Y) {
    xe.select(q.target.parentElement).attr("transform", "scale(1.0, 1.0)"), ne.publish("hideTooltip", null, x.svg.node());
  }).on("mousedown", function(q, Y) {
    ne.publish("clearSelection", null, x.svg.node());
    const G = {
      selection: Y,
      event: q,
      layer: k,
      type: "node"
    };
    ne.publish("setSelection", G, x.svg.node());
  }).select(function(q) {
    return this.childNodes[0];
  }).attr("height", function(q) {
    return x.options.layers[k].nodeWidth * 2;
  }).attr("width", function(q) {
    return x.options.layers[k].nodeWidth * 2;
  }).attr("x", function(q) {
    return x.options.layers[k].nodeWidth * -1;
  }).attr("y", function(q) {
    return x.options.layers[k].nodeWidth * -1;
  });
  function U(q) {
    xe.selectAll(".selected").classed("selected", !1).classed("animated-node", !1).classed("node", !0), xe.select(`.l${q.layer}.node-${it(q.selection.name)} .scale-container`).classed("selected", !0).classed("node", !1).classed("animated-node", !0), q && q.type == "node" && ne.publish("setVariables", q, x.svg.node());
  }
  ne.subscribe("setSelection", U, x.svg.node());
  var X = ne.last("setSelection", x.svg.node());
  X && X.type == "node" && U(X), f.selectAll("g.node").attr("transform", function(q) {
    var Y = L.latLng(q.coordinate), G = x.leafletMap.latLngToLayerPoint(Y);
    return "translate(" + G.x + "," + G.y + ")";
  }), R.exit().remove();
}
function Wp(f, w, x, k) {
  var F = Math.atan2(k[1] - x[1], k[0] - x[0]);
  return [w[0] + Math.sin(F) * f, w[1] + -Math.cos(F) * f];
}
function Jp(f, w, x, k) {
  var F = k - w, R = x - f, U = Math.atan2(F, R);
  return U *= 180 / Math.PI, U;
}
function gx(f, w, x) {
  var k = Jp(...w, ...f), F = Jp(...w, ...x), R = k - F;
  let U = k - R * 0.5;
  return k > F && (U += 180), U;
}
function mx(f, w, x, k, F, R = !1) {
  if (F == 0)
    return [parseFloat(x), parseFloat(k)];
  if (R)
    var U = Math.PI / 180 * F;
  else
    var U = Math.PI / -180 * F;
  var X = Math.cos(U), q = Math.sin(U), Y = X * (x - f) + q * (k - w) + f, G = X * (k - w) - q * (x - f) + w;
  return [Y, G];
}
function Kp(f, w) {
  var x = f.slice();
  let k = 0;
  for (x[0] = Wp(w, x[0], x[0], x[1]), k = x.length - 1, x[k] = Wp(-w, x[k], x[k], x[k - 1]), k = 1; k < x.length - 1; k++) {
    var F = gx(x[k - 1], x[k], x[k + 1]);
    x[k] = mx(...x[k], x[k][0] + w, x[k][1], F);
  }
  return x;
}
class vx {
  constructor(w, x, k, F) {
    this.mapCanvas = w, this.leafletMap = this.mapCanvas.getCurrentLeafletMap(), this.svg = x, this.data = [], this.mapLayers = [], this.curves = [], this.lineGen = xe.line().curve(F), this.editEdges = this.mapCanvas.editingInterface && this.mapCanvas.editingInterface.editEdgeMode, this.editNodes = this.mapCanvas.editingInterface && this.mapCanvas.editingInterface.editNodeMode, this.div = k, this.options = this.mapCanvas.options, this.lastInteractedObject = null, this.lastInteractedType = null, this.showTooltipSubscription = null, ne.subscribe("snapEdges", (G) => {
      bu(G.node, G.layer, this.mapCanvas, !1);
    }, this.mapCanvas), this.mapCanvas.options.showSidebar || (ne.subscribe(
      "showTooltip",
      (G) => {
        if (!this.mapCanvas.options.showSidebar) {
          var re = "#map-" + w.instanceId, ie = w.getBoundingClientRect(), W = G.event.clientY - ie.top, Q = G.event.clientX - ie.left, oe = document.createElement("div");
          oe.setAttribute("id", "tooltip-hover"), oe.setAttribute("class", "tight-form-func tooltip-hover"), oe.innerHTML = G.text, w.querySelector(re).appendChild(oe);
          var ge = oe.getBoundingClientRect(), Ce = "left";
          Q + ge.right > ie.right && (Ce = "right", Q = ie.right - G.event.clientX);
          var me = "top";
          W + ge.bottom > ie.bottom && (me = "bottom", W = ie.bottom - G.event.clientY);
          var je = `${me}:${W}px; ${Ce}:${Q}px;`;
          oe.setAttribute("style", je);
        }
      },
      this.svg.node()
    ), ne.subscribe(
      "hideTooltip",
      function() {
        var G = document.querySelectorAll("#tooltip-hover");
        G.forEach((re) => {
          re.remove();
        });
      },
      this.mapCanvas
    ));
    let R = this;
    this.leafletMap.on("moveend", function() {
      R.update();
    }), this.leafletMap.on("viewreset", function() {
      R.update();
    });
    function U(G) {
      R.options = G;
    }
    ne.subscribe("updateOptions", U, this.svg.node());
    function X() {
      for (var G = document.querySelectorAll(".dash-selected, .dash-over"), re = 0; re < G.length; re++)
        G[re].remove();
      xe.selectAll(".selected").classed("selected", !1), xe.selectAll(".animated-edge").classed("animated-edge", !1).classed("edge", !0), xe.selectAll(".animated-node").classed("animated-node", !1).classed("node", !0);
    }
    ne.subscribe("clearSelection", X, this.svg.node());
    function q(G) {
      G ? (R.lastInteractedObject = G.object, R.lastInteractedType = G.type) : (R.lastInteractedObject = null, R.lastInteractedType = null);
    }
    ne.subscribe("updateLastInteractedObject", q, this.svg.node());
    function Y(G, re) {
      if (!(R.lastInteractedType === null || R.lastInteractedObject === null) && R.lastInteractedType == "nodes") {
        var ie = 0;
        G == "longitude" && (ie = 1), R.lastInteractedObject.coordinate[ie] += re;
        var W = R.lastInteractedObject.coordinate;
        xe.selectAll(".cnxn-" + it(R.lastInteractedObject.name)).attr("d", function(Q) {
          var oe = 0;
          Q.nodeZ == R.lastInteractedObject.name && (oe = Q.coordinates.length - 1), Q.coordinates[oe] = W;
        }), R.update();
      }
    }
    xe.select("body").on("keydown", function(G, re) {
      switch (G.key) {
        case "ArrowLeft":
          Y("longitude", -0.05);
          break;
        case "ArrowRight":
          Y("longitude", 0.05);
          break;
        case "ArrowUp":
          Y("latitude", 0.05);
          break;
        case "ArrowDown":
          Y("latitude", -0.05);
          break;
      }
    });
  }
  editEdgeMode(w) {
    return w == null ? this.editEdges : (w > 0 ? (this.editEdges = 1, this.editNodes = 0) : this.editEdges = 0, this.update(), this.editEdges);
  }
  editNodeMode(w) {
    return w == null ? this.editNodes : (w > 0 ? (this.editNodes = 1, this.editEdges = 0) : this.editNodes = 0, this.update(), this.editNodes);
  }
  updateCoordinates(w, x) {
    var k = this, F = [];
    w.edges.forEach(function(R) {
      var U = 0;
      if (R.points = [], R.rejected = 0, typeof R.coordinates > "u" || R.coordinates === null) {
        R.rejected = 1;
        return;
      }
      if (R.coordinates.forEach(function(X) {
        if (!Array.isArray(X)) {
          U = 1;
          return;
        }
        var q = L.latLng(X), Y = k.leafletMap.latLngToLayerPoint(q);
        R.points.push([Y.x, Y.y]);
      }), R.points.length < 2 && (U = 1), U) {
        w.edges.indexOf(R), R.rejected = 1;
        return;
      }
      F.push(R), R.controlPointPath = xe.line()(R.points), R.azPath = k.curves[x](Kp(R.points, k.mapCanvas.options.layers[x].pathOffset)), R.zaPath = k.curves[x](Kp(R.points.reverse(), k.mapCanvas.options.layers[x].pathOffset));
    }), w.edges = F;
  }
  //--- loop through data and map objects and refresh them
  update() {
    this.mapCanvas.options.enableScrolling && this.leafletMap.dragging.enable();
    var w = 0;
    this.data.forEach((x) => {
      this.updateCoordinates(x, w), w++;
    });
    var w = 0;
    this.mapLayers.forEach((x) => {
      var X, q, Y;
      if (!((Y = (q = (X = this == null ? void 0 : this.options) == null ? void 0 : X.layers) == null ? void 0 : q[w]) != null && Y.visible)) {
        w++;
        return;
      }
      var k = x.select("g.edge"), F = x.select("g.node"), R = x.select("g.cp"), U = this.data[w];
      this.editNodes == 1 ? (hx(R, U, this, w), this.leafletMap.getZoom(), L.latLng(this.leafletMap.getCenter())) : R.selectAll(".controlPoint").remove(), this.editEdges == 1 ? (dx(R, U, this, w), this.leafletMap.getZoom(), L.latLng(this.leafletMap.getCenter())) : R.selectAll(".controlEdge").remove(), !this.editEdges && !this.editNodes && R.selectAll("*").remove(), px(F, U, this, w), ux(k, U, this, w, this.mapCanvas.options), w++;
    });
  }
  addNetLayer(w, x) {
    var U, X;
    var k = this;
    k.data[w] = x;
    let F = k.lineGen;
    if ((U = x == null ? void 0 : x.pathLayout) != null && U.type && xe.hasOwnProperty((X = x == null ? void 0 : x.pathLayout) == null ? void 0 : X.type)) {
      let q = xe[x.pathLayout.type];
      F = xe.line().curve(q);
    }
    k.curves[w] = F;
    var R = this.svg.append("g").attr("class", "esmap");
    return k.mapLayers[w] = R, R.append("g").attr("class", "edge"), R.append("g").attr("class", "node"), R.append("g").attr("class", "cp"), this.update(), R;
  }
}
const Yt = 3;
function h1() {
  const w = window.location.search.substring(1).split("&");
  let x = {};
  for (const k of w) {
    const F = k.split("=");
    if (F.length > 1) {
      const R = decodeURIComponent(F[0]), U = decodeURIComponent(F[1]);
      R in x ? x[R] = [...x[R], U] : x[R] = [U];
    } else if (F.length === 1) {
      const R = decodeURIComponent(F[0]);
      x[R] = !0;
    }
  }
  return x;
}
const d1 = {
  type: "object",
  properties: {
    edges: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          coordinates: { type: "array", items: { type: "array", items: { type: "number" } } },
          meta: {
            type: "object",
            properties: { endpoint_identifiers: { type: "object" } }
          }
        },
        required: ["name", "coordinates", "meta"]
      }
    },
    nodes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          coordinate: { type: "array", items: { type: "number" } }
        },
        required: ["name", "coordinate"]
      }
    }
  },
  required: ["edges", "nodes"],
  additionalProperties: !0
}, p1 = function(f, w) {
  for (var x = { valid: !0, errorDetails: {} }, k = 0; k < w.length; k++) {
    var { valid: F, errorDetails: R } = xa(f.items, w[k]);
    if (x.valid = F && x.valid, x.errorDetails = R, !F)
      return x;
  }
  return x;
}, xa = function(f, w) {
  var x = { valid: !0, errorDetails: "" };
  if (!{
    object: (X) => typeof X == "object",
    number: (X) => typeof X == "number",
    string: (X) => typeof X == "string" || X instanceof String,
    boolean: (X) => typeof X == "boolean",
    null: (X) => X === null,
    array: Array.isArray
  }[f.type](w))
    return x.valid = !1, x.errorDetails += "Type check failed.<br>", x;
  for (var F = f.properties ? Object.keys(f.properties) : [], R = 0; R < F.length; R++) {
    var U = F[R];
    if (!w[U] && f.required.indexOf(U) >= 0)
      return x.valid = !1, x.errorDetails = "required property '" + U + "' is not set<br>", x;
  }
  return F.forEach((X) => {
    var q = !0, Y = "";
    switch (f.properties[X].type) {
      case "array":
        var G = p1(f.properties[X], w[X]);
        q = G.valid, Y = G.errorDetails;
        break;
      default:
        var G = xa(f.properties[X], w[X]);
        q = G.valid, Y = G.errorDetails;
    }
    x.valid = !!(q && x.valid), Object.keys(Y).forEach((re) => {
      x.errorDetails += Y[re];
    });
  }), x;
};
function yu(f) {
  const { valid: w, errorDetails: x } = xa(d1, f);
  return w ? [w, "valid"] : [w, x];
}
function bx(f, w, x = null) {
  return w.split(/[\.\[\]\'\"]/).filter((k) => k).reduce((k, F) => k ? k[F] : x, f);
}
function yx(f, w, x) {
  let k = w.split(/[\.\[\]\'\"]/).filter((U) => U), F = f, R = k.pop();
  k.forEach((U) => {
    F = F[U];
  }), F[R] = x;
}
try {
  const f = {
    getUrlSearchParams: h1,
    schema: d1,
    validateArray: p1,
    validate: xa,
    testJsonSchema: yu,
    resolvePath: bx,
    setPath: yx,
    LAYER_LIMIT: Yt
  };
  module.exports.Utils = f, exports.Utils = f;
} catch (f) {
  console.debug(f);
}
const Qp = xi, gu = window.d3 || c1;
var _x = window.L;
try {
  var _x = require("./lib/leaflet.js");
} catch {
}
class xx {
  /**
   * Renders the Network Map in the panel.
   *
   * @param mapCanvas - the parent MapCanvas object.
   */
  constructor(w) {
    this.mapCanvas = w, this.groups = [], this.leafletMap = this.mapCanvas.getCurrentLeafletMap();
    var x = this.leafletMap.getPanes().overlayPane;
    const k = gu.select(x);
    this.svgLayer = k.select("svg").attr("pointer-events", "all"), this.sideBar = gu.selectAll("#sidebar-tooltip"), this.esmap = new vx(
      this.mapCanvas,
      this.svgLayer,
      this.sideBar,
      gu.curveNatural
    ), Qp.subscribe("setEditMode", this.setEditMode, this), Qp.subscribe("renderMap", this.renderMapLayers, this);
  }
  dispatchEvent(w) {
    return this.mapCanvas.dispatchEvent(w);
  }
  setEdgeEdit(w) {
    this.esmap.editNodeMode(!1), this.esmap.editEdgeMode(w);
  }
  setNodeEdit(w) {
    this.esmap.editEdgeMode(!1), this.esmap.editNodeMode(w);
  }
  setEditMode(w) {
    w == "edge" && (this.setEdgeEdit(!1), this.setEdgeEdit(!this.esmap.editEdges)), w == "node" && (this.setEdgeEdit(!1), this.setNodeEdit(!this.esmap.editNodes)), w == null && (this.setEdgeEdit(!1), this.setNodeEdit(!1));
  }
  renderMapLayers() {
    if (this.mapCanvas.topology) {
      let x = function(F, R) {
        var U = F;
        return R.forEach((X) => {
          X.name == F && X.meta.display_name && (U = X.meta.display_name);
        }), U;
      }, k = 0;
      this.mapCanvas.topology.forEach((F) => {
        if (!(!F || typeof F == "string")) {
          for (var R = 0; R < F.edges.length; R++) {
            var U = F.edges[R];
            U.nodeA = x(U.meta.endpoint_identifiers[this.mapCanvas.options.layers[k].endpointId][0], F.nodes), U.nodeZ = x(U.meta.endpoint_identifiers[this.mapCanvas.options.layers[k].endpointId][1], F.nodes);
          }
          k++;
        }
      });
    }
    this.groups.forEach((x) => x.remove());
    let w = { nodes: [], edges: [] };
    for (let x = 0; x < Yt; x++) {
      let k = w;
      this.mapCanvas.topology[x] && typeof this.mapCanvas.topology[x] != "string" && (k = this.mapCanvas.topology[x]), this.groups.push(this.esmap.addNetLayer(x, k));
    }
  }
  renderMap() {
    if (!(!this.mapCanvas.options || !this.mapCanvas.topology))
      return this.renderMapLayers(), this.map;
  }
}
const wx = `/* required styles */

.leaflet-pane,
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-tile-container,
.leaflet-pane > svg,
.leaflet-pane > canvas,
.leaflet-zoom-box,
.leaflet-image-layer,
.leaflet-layer {
    position: absolute;
    left: 0;
    top: 0;
    }
.leaflet-container {
    overflow: hidden;
    }
.leaflet-tile,
.leaflet-marker-icon,
.leaflet-marker-shadow {
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
      -webkit-user-drag: none;
    }
/* Prevents IE11 from highlighting tiles in blue */
.leaflet-tile::selection {
    background: transparent;
}
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */
.leaflet-safari .leaflet-tile {
    image-rendering: -webkit-optimize-contrast;
    }
/* hack that prevents hw layers "stretching" when loading new tiles */
.leaflet-safari .leaflet-tile-container {
    width: 1600px;
    height: 1600px;
    -webkit-transform-origin: 0 0;
    }
.leaflet-marker-icon,
.leaflet-marker-shadow {
    display: block;
    }
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
.leaflet-container .leaflet-overlay-pane svg,
.leaflet-container .leaflet-marker-pane img,
.leaflet-container .leaflet-shadow-pane img,
.leaflet-container .leaflet-tile-pane img,
.leaflet-container img.leaflet-image-layer,
.leaflet-container .leaflet-tile {
    max-width: none !important;
    max-height: none !important;
    }

.leaflet-container.leaflet-touch-zoom {
    -ms-touch-action: pan-x pan-y;
    touch-action: pan-x pan-y;
    }
.leaflet-container.leaflet-touch-drag {
    -ms-touch-action: pinch-zoom;
    /* Fallback for FF which doesn't support pinch-zoom */
    touch-action: none;
    touch-action: pinch-zoom;
}
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
    -ms-touch-action: none;
    touch-action: none;
}
.leaflet-container {
    -webkit-tap-highlight-color: transparent;
}
.leaflet-container a {
    -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
}
.leaflet-tile {
    filter: inherit;
    visibility: hidden;
    }
.leaflet-tile-loaded {
    visibility: inherit;
    }
.leaflet-zoom-box {
    width: 0;
    height: 0;
    -moz-box-sizing: border-box;
         box-sizing: border-box;
    }
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
.leaflet-overlay-pane svg {
    -moz-user-select: none;
    }

.leaflet-vml-shape {
    width: 1px;
    height: 1px;
    }
.lvml {
    behavior: url(#default#VML);
    display: inline-block;
    position: absolute;
    }


/* control positioning */

.leaflet-control {
    position: relative;
    pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
    pointer-events: auto;
    }
.leaflet-top,
.leaflet-bottom {
    position: absolute;
    pointer-events: none;
    }
.leaflet-top {
    top: 0;
    }
.leaflet-right {
    right: 0;
    }
.leaflet-bottom {
    bottom: 0;
    }
.leaflet-left {
    left: 0;
    }
.leaflet-control {
    float: left;
    clear: both;
    }
.leaflet-right .leaflet-control {
    float: right;
    }
.leaflet-top .leaflet-control {
    margin-top: 10px;
    }
.leaflet-bottom .leaflet-control {
    margin-bottom: 10px;
    }
.leaflet-left .leaflet-control {
    margin-left: 10px;
    }
.leaflet-right .leaflet-control {
    margin-right: 10px;
    }


/* zoom and fade animations */

.leaflet-fade-anim .leaflet-tile {
    will-change: opacity;
    }
.leaflet-fade-anim .leaflet-popup {
    opacity: 0;
    -webkit-transition: opacity 0.2s linear;
       -moz-transition: opacity 0.2s linear;
            transition: opacity 0.2s linear;
    }
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
    opacity: 1;
    }
.leaflet-zoom-animated {
    -webkit-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
            transform-origin: 0 0;
    }
.leaflet-zoom-anim .leaflet-zoom-animated {
    will-change: transform;
    }
.leaflet-zoom-anim .leaflet-zoom-animated {
    -webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);
       -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);
            transition:         transform 0.25s cubic-bezier(0,0,0.25,1);
    }
.leaflet-zoom-anim .leaflet-tile,
.leaflet-pan-anim .leaflet-tile {
    -webkit-transition: none;
       -moz-transition: none;
            transition: none;
    }

.leaflet-zoom-anim .leaflet-zoom-hide {
    visibility: hidden;
    }


/* cursors */

.leaflet-interactive {
    cursor: pointer;
    }
.leaflet-grab {
    cursor: -webkit-grab;
    cursor:    -moz-grab;
    cursor:         grab;
    }
.leaflet-crosshair,
.leaflet-crosshair .leaflet-interactive {
    cursor: crosshair;
    }
.leaflet-popup-pane,
.leaflet-control {
    cursor: auto;
    }
.leaflet-dragging .leaflet-grab,
.leaflet-dragging .leaflet-grab .leaflet-interactive,
.leaflet-dragging .leaflet-marker-draggable {
    cursor: move;
    cursor: -webkit-grabbing;
    cursor:    -moz-grabbing;
    cursor:         grabbing;
    }

/* marker & overlays interactivity */
.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-image-layer,
.leaflet-pane > svg path,
.leaflet-tile-container {
    pointer-events: all;
    }

.leaflet-marker-icon.leaflet-interactive,
.leaflet-image-layer.leaflet-interactive,
.leaflet-pane > svg path.leaflet-interactive,
svg.leaflet-image-layer.leaflet-interactive path {
    pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
    pointer-events: auto;
    }

/* visual tweaks */

.leaflet-container {
    background: #ddd;
    outline: 0;
    }
.leaflet-container a {
    color: #0078A8;
    }
.leaflet-container a.leaflet-active {
    outline: 2px solid orange;
    }
.leaflet-zoom-box {
    border: 2px dotted #38f;
    background: rgba(255,255,255,0.5);
    }


/* general typography */
.leaflet-container {
    font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
    }


/* general toolbar styles */

.leaflet-bar {
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    border-radius: 4px;
    }
.leaflet-bar a,
.leaflet-bar a:hover {
    border-bottom: 1px solid rgba(128,128,128,0.3);
    width: 26px;
    height: 26px;
    line-height: 26px;
    display: block;
    text-align: center;
    text-decoration: none;
    }
.leaflet-bar a,
.leaflet-control-layers-toggle {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    display: block;
    }
.leaflet-bar a:hover {
    background-color: #f4f4f4;
    }
.leaflet-bar a:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    }
.leaflet-bar a:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: none;
    }
.leaflet-bar a.leaflet-disabled {
    cursor: default;
    background-color: #f4f4f4;
    color: #bbb;
    }

.leaflet-touch .leaflet-bar a {
    width: 30px;
    height: 30px;
    line-height: 30px;
    }
.leaflet-touch .leaflet-bar a:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    }
.leaflet-touch .leaflet-bar a:last-child {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    }

/* zoom control */

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
    font: bold 18px 'Lucida Console', Monaco, monospace;
    text-indent: 1px;
    }

.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {
    font-size: 22px;
    }


/* layers control */

.leaflet-control-layers {
    box-shadow: 0 1px 5px rgba(0,0,0,0.4);
    background: #fff;
    border-radius: 5px;
    }
.leaflet-control-layers-toggle {
    /* background-image: url(../images/layers.png); */
    width: 36px;
    height: 36px;
    }
.leaflet-retina .leaflet-control-layers-toggle {
    /* background-image: url(../images/layers-2x.png); */
    background-size: 26px 26px;
    }
.leaflet-touch .leaflet-control-layers-toggle {
    width: 44px;
    height: 44px;
    }
.leaflet-control-layers .leaflet-control-layers-list,
.leaflet-control-layers-expanded .leaflet-control-layers-toggle {
    display: none;
    }
.leaflet-control-layers-expanded .leaflet-control-layers-list {
    display: block;
    position: relative;
    }
.leaflet-control-layers-expanded {
    padding: 6px 10px 6px 6px;
    color: #333;
    background: #fff;
    }
.leaflet-control-layers-scrollbar {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 5px;
    }
.leaflet-control-layers-selector {
    margin-top: 2px;
    position: relative;
    top: 1px;
    }
.leaflet-control-layers label {
    display: block;
    }
.leaflet-control-layers-separator {
    height: 0;
    border-top: 1px solid #ddd;
    margin: 5px -10px 5px -6px;
    }

/* Default icon URLs */
/* .leaflet-default-icon-path {
    background-image: url(images/marker-icon.png); 
    } */


/* attribution and scale controls */

.leaflet-container .leaflet-control-attribution {
    background: #fff;
    background: rgba(255, 255, 255, 0.7);
    margin: 0;
    }
.leaflet-control-attribution,
.leaflet-control-scale-line {
    padding: 0 5px;
    color: #333;
    }
.leaflet-control-attribution a {
    text-decoration: none;
    }
.leaflet-control-attribution a:hover {
    text-decoration: underline;
    }
.leaflet-container .leaflet-control-attribution,
.leaflet-container .leaflet-control-scale {
    font-size: 11px;
    }
.leaflet-left .leaflet-control-scale {
    margin-left: 5px;
    }
.leaflet-bottom .leaflet-control-scale {
    margin-bottom: 5px;
    }
.leaflet-control-scale-line {
    border: 2px solid #777;
    border-top: none;
    line-height: 1.1;
    padding: 2px 5px 1px;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    -moz-box-sizing: border-box;
         box-sizing: border-box;

    background: #fff;
    background: rgba(255, 255, 255, 0.5);
    }
.leaflet-control-scale-line:not(:first-child) {
    border-top: 2px solid #777;
    border-bottom: none;
    margin-top: -2px;
    }
.leaflet-control-scale-line:not(:first-child):not(:last-child) {
    border-bottom: 2px solid #777;
    }

.leaflet-touch .leaflet-control-attribution,
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
    box-shadow: none;
    }
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
    border: 2px solid rgba(0,0,0,0.2);
    background-clip: padding-box;
    }


/* popup */

.leaflet-popup {
    position: absolute;
    text-align: center;
    margin-bottom: 20px;
    }
.leaflet-popup-content-wrapper {
    padding: 1px;
    text-align: left;
    border-radius: 12px;
    }
.leaflet-popup-content {
    margin: 13px 19px;
    line-height: 1.4;
    }
.leaflet-popup-content p {
    margin: 18px 0;
    }
.leaflet-popup-tip-container {
    width: 40px;
    height: 20px;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    overflow: hidden;
    pointer-events: none;
    }
.leaflet-popup-tip {
    width: 17px;
    height: 17px;
    padding: 1px;

    margin: -10px auto 0;

    -webkit-transform: rotate(45deg);
       -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
            transform: rotate(45deg);
    }
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
    background: white;
    color: #333;
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
    }
.leaflet-container a.leaflet-popup-close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 4px 0 0;
    border: none;
    text-align: center;
    width: 18px;
    height: 14px;
    font: 16px/14px Tahoma, Verdana, sans-serif;
    color: #c3c3c3;
    text-decoration: none;
    font-weight: bold;
    background: transparent;
    }
.leaflet-container a.leaflet-popup-close-button:hover {
    color: #999;
    }
.leaflet-popup-scrolled {
    overflow: auto;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    }

.leaflet-oldie .leaflet-popup-content-wrapper {
    -ms-zoom: 1;
    }
.leaflet-oldie .leaflet-popup-tip {
    width: 24px;
    margin: 0 auto;

    -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
    filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
    }
.leaflet-oldie .leaflet-popup-tip-container {
    margin-top: -1px;
    }

.leaflet-oldie .leaflet-control-zoom,
.leaflet-oldie .leaflet-control-layers,
.leaflet-oldie .leaflet-popup-content-wrapper,
.leaflet-oldie .leaflet-popup-tip {
    border: 1px solid #999;
    }


/* div icon */

.leaflet-div-icon {
    background: #fff;
    border: 1px solid #666;
    }


/* Tooltip */
/* Base styles for the element that has a tooltip */
.leaflet-tooltip {
    position: absolute;
    padding: 6px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #222;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }
.leaflet-tooltip.leaflet-clickable {
    cursor: pointer;
    pointer-events: auto;
    }
.leaflet-tooltip-top:before,
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
    position: absolute;
    pointer-events: none;
    border: 6px solid transparent;
    background: transparent;
    content: "";
    }

/* Directions */

.leaflet-tooltip-bottom {
    margin-top: 6px;
}
.leaflet-tooltip-top {
    margin-top: -6px;
}
.leaflet-tooltip-bottom:before,
.leaflet-tooltip-top:before {
    left: 50%;
    margin-left: -6px;
    }
.leaflet-tooltip-top:before {
    bottom: 0;
    margin-bottom: -12px;
    border-top-color: #fff;
    }
.leaflet-tooltip-bottom:before {
    top: 0;
    margin-top: -12px;
    margin-left: -6px;
    border-bottom-color: #fff;
    }
.leaflet-tooltip-left {
    margin-left: -6px;
}
.leaflet-tooltip-right {
    margin-left: 6px;
}
.leaflet-tooltip-left:before,
.leaflet-tooltip-right:before {
    top: 50%;
    margin-top: -6px;
    }
.leaflet-tooltip-left:before {
    right: 0;
    margin-right: -12px;
    border-left-color: #fff;
    }
.leaflet-tooltip-right:before {
    left: 0;
    margin-left: -12px;
    border-right-color: #fff;
    }
.leaflet-tile-container img { will-change: transform; outline: 1px solid transparent; }

`, Mx = `
.leaflet-pane svg path.edge {
    pointer-events: stroke;
}
.leaflet-pane svg path.control {
    pointer-events: stroke;
}

.map-panel {
  position: relative;
}

.flow-tooltip {
  display: flex;
  align-items: center;
  grid-gap: 8px;
}
.flow-tooltip strong {
  font-weight: bold;
}
.flow-tooltip svg {
  height: 12px;
  width: 12px;
  stroke-width: 2px;
}

svg path.edge-az {
  marker-start: url("#arrow");
}

svg path.edge-za {
  marker-start: url("#arrow");
}

svg circle.node {
        /* fill: #999; */
        stroke: #777;
        stroke-width: 1;
        pointer-events: all;
}

svg path.edge {
        stroke-linecap: butt;
        fill:  none;
        pointer-events: visiblePainted !important;
}

svg path.animated-edge.edge-az {
        stroke: transparent;
        stroke-linecap: butt;
        fill:  none;
        cursor: crosshair;
}

svg path.animated-edge.edge-za {
        stroke: transparent;
        stroke-linecap: butt;
        fill:  none;
        cursor: crosshair;
}
svg path.animated-edge.edge-az.selected {
}

svg path.animated-edge.edge-za.selected {
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}


svg path.control {
        stroke-dasharray: 8 1;
        stroke-width: 6;
        stroke: #f808;
        fill:  none;
    cursor: crosshair;
}

svg circle.controlPoint {
    stroke: black;
    stroke-width: 1;
        fill: #f80;
        cursor: move;
}

div.tooltip-hover {
  position:absolute;
  border-radius:4px;
  padding:10px;
  margin:10px;
  max-width:250px;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
}

div.tooltip-hover p:first-of-type {
  margin-top:0;
}

div.tooltip-hover p {
  margin-top: 6px;
  margin-bottom:0;
}

div.sidebar-tooltip {
    position: absolute;
    text-align: left;
    height: auto;
    font: sans-serif;
    pointer-events: none;
}

.legend-text {
  padding-left: 5px;
  vertical-align: middle;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 26px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  margin-top: 5px;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 25px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4EC1E0;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4EC1E0;
}

input:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}

.home-overlay {
    position: absolute;
    margin-top: 12px;
    margin-left: 57px;
}
.home-overlay > .button {
   border-radius: 4px;
   padding: 5px 10px;
   margin-right: 5px;
   box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
   display: inline-block;
   cursor: pointer;
}

.legend {
    position: absolute;
    padding: 1em 1em 0.3em 1em;
    margin: 0.8em;
    box-shadow: 0px 0px 2px rgb(0 0 0 / 50%);
    border-radius: 3px;
}

.legend.topright {
  top: 0;
  right: 0;
}

.legend.bottomright {
  bottom: 0;
  right: 0;
  margin: 0.8em 0.8em 1.8em 0.8em;
}

.legend.bottomleft {
  bottom: 0;
  left: 0;
}

.color-sample {
  height:1.5em;
  width:1.5em;
  margin-right:0.5em;
  border:1px solid rgba(0,0,0,0.2);
  display: inline-block;
  vertical-align: middle;
  border-radius: 2px;
}

.legend p {
    vertical-align: text-top;
    margin-bottom: 0.6em;
}

.legend h4 {
  font-weight:600;
  font-size:1.1em;
  padding: 0;
  margin: 0 0.4em 0.4em 0;
  display: inline-block;
}

.legend .minimize {
  float:right;
}

.legend .minimize .circle-background {
  fill: rgba(128,128,128,0.3); cursor: pointer;
}

.legend .minimize .circle-background:hover {
  fill: rgba(128,128,128,0.5);
}

.legend-column {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
}

.legend-column:last-child {
  margin-right:0;
}

/* a 0-specificity class selector. Allows override for background elements by grafana's version of this class */
div:where(.tight-form-func) { background: #FFF; }
a:where(.tight-form-func) { background: #FFF; }

.animated-node { 
  transform: scale(1.5, 1.5);
}

svg .control.control-selected { 
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}

@keyframes pulse {
  0% { opacity:1.0 }
  80% { opacity:0.0 }
  100% { opacity:1.0 }
}

`, be = xi, mu = "rgb(202, 149, 229)";
class Ex extends _u {
  constructor(w) {
    super(), this._topology = {}, this.srcDstOptions = [], this._editMode = null, this._edgeEditMode = !1, this._nodeEditMode = !1, this._selection = !1, this._dialog = !1, this._selectedLayer = 0, this._spliceIndex = null, this._formTouched = !1;
  }
  // connect component
  connectedCallback() {
    this.setEditMode(be.last("setEditMode", this)), be.subscribe("setEditMode", (w) => {
      this.setEditMode(w), this.render();
    }, this), this.setEditNodeData(be.last("showEditNodeDialog", this)), be.subscribe("showEditNodeDialog", (w) => {
      this.setEditNodeData(w), this.render();
    }, this), this.setEditSelection(be.last("setEditSelection", this)), be.subscribe("setEditSelection", (w) => {
      this.setEditSelection(w), this.render();
    }, this), this.setEditing(be.last("updateEditMode", this)), be.subscribe("updateEditMode", (w) => {
      this.setEditing(w), this.render();
    }, this), this.render();
  }
  setEditMode(w) {
    w == null && (this._edgeEditMode = !1, this._nodeEditMode = !1), w && w.mode === "edge" && (this._nodeEditMode = !1, this._edgeEditMode = w.value), w && w.mode === "node" && (this._edgeEditMode = !1, this._nodeEditMode = w.value), this.mapCanvas && this.mapCanvas.map && this.mapCanvas.map.esmap.editEdgeMode(this._edgeEditMode), this.mapCanvas && this.mapCanvas.map && this.mapCanvas.map.esmap.editNodeMode(this._nodeEditMode);
  }
  setEditing(w) {
    this._editMode = be.last("updateEditMode", this), w && !this._edgeEditMode && !this._nodeEditMode && be.publish("setEditMode", { mode: "edge", value: !0 }, this);
  }
  setEditNodeData(w) {
    w ? (this._selectedObject = w.object, this._spliceIndex = w.index, this.selectedLayer = w.layer, this._dialog = "node") : this._dialog = !1;
  }
  setEditSelection(w) {
    if (!w) {
      this._formTouched = !1, this._selectedObject = null, this._spliceIndex = null, this._selectedLayer = null, this._selectedType = null;
      return;
    }
    this._formTouched = !1, this._selectedObject = w.object, this._spliceIndex = w.index, this._selectedLayer = w.layer, this._selectedType = w.type;
  }
  //////////////////////////////////////
  // setters and getters
  set editMode(w) {
    this.render();
  }
  get editMode() {
    return this._editMode;
  }
  set edgeEditMode(w) {
    this._edgeEditMode = w, this.render();
  }
  get edgeEditMode() {
    return this._edgeEditMode;
  }
  set nodeEditMode(w) {
    this._nodeEditMode = w, this.render();
  }
  get nodeEditMode() {
    return this._nodeEditMode;
  }
  set dialog(w) {
    this._dialog = w, this.render();
  }
  get dialog() {
    return this._dialog;
  }
  set topology(w) {
    this._topology = w, this.render();
  }
  get topology() {
    return this._topology;
  }
  set selectedLayer(w) {
    this._selectedLayer = w, this.setSrcDstOptions();
  }
  get selectedLayer() {
    return this._selectedLayer;
  }
  set updateTopology(w) {
    this._updateTopology = w, this.setSrcDstOptions();
  }
  get updateTopology() {
    return this._updateTopology;
  }
  // end setters and getters
  //////////////////////////////////
  ///////////////////////////
  // event bindings
  toggleNodeEdit(w) {
    w.stopPropagation(), be.publish("setEditSelection", null, this), be.publish("setEditMode", { mode: "node", value: !this._nodeEditMode }, this);
  }
  toggleEdgeEdit(w) {
    w.stopPropagation(), be.publish("setEditSelection", null, this), be.publish("setEditMode", { mode: "edge", value: !this._edgeEditMode }, this);
  }
  recalcPaths() {
    be.publish("recalcPaths", null, this);
  }
  showAddNodeDialog(w) {
    w.stopPropagation(), this._selectedLayer = 0, this._selectedObject = null, this._spliceIndex = null, this.dialog = "node";
  }
  showAddEdgeDialog(w) {
    w.stopPropagation(), this._selectedLayer = 0, this._selectedObject = null, this._spliceIndex = null, this.setSrcDstOptions(), this.dialog = "edge";
  }
  hideDialogs(w) {
    w.stopPropagation(), be.publish("showEditNodeDialog", null, this);
  }
  showSrcDst(w) {
    this.selectedLayer = w.target.value;
  }
  updateMapNodes(w) {
    var G, re, ie;
    w.preventDefault();
    var x = this.shadow.querySelector("#node_layer").value, k = this.shadow.querySelector("#node_name").value, F = this.shadow.querySelector("#node_display_name").value, R = this.shadow.querySelector("#node_svg").value, U = this.shadow.querySelector("#node_tooltip").value, X = this.shadow.querySelector("#node_lat").value, q = this.shadow.querySelector("#node_lng").value, Y = {
      name: k,
      color: ((ie = (re = (G = this.mapCanvas.options) == null ? void 0 : G.layers) == null ? void 0 : re[x]) == null ? void 0 : ie.color) || mu,
      meta: {
        display_name: F,
        svg: R,
        template: U
      },
      coordinate: [parseFloat(X), parseFloat(q)],
      children: []
    };
    this.updateLayerNodes(x, Y, this._spliceIndex), this._formTouched = !1;
  }
  updateLayerNodes(w, x, k) {
    if (k === null)
      this._topology[w].nodes.push(x), be.publish("createMapNode", { layer: w, node: x }, this);
    else {
      let U = this._topology[w].nodes.splice(k, 1, x);
      be.publish("updateMapNode", { layer: w, node: x, oldNode: U }, this);
    }
    var F = { nodes: [], edges: [] };
    const R = [];
    for (let U = 0; U < Yt; U++)
      R.push(this._topology[U] || F);
    be.publish("updateTopology", R, this), this.updateTopology && this.updateTopology(R), be.publish("showEditNodeDialog", null, this), setTimeout(() => {
      be.publish("snapEdges", { node: x, layer: w.replace("layer", "") }, this), be.publish("renderMap", R, this);
    }, 10);
  }
  createMapEdge(w) {
    var Y, G, re, ie, W, Q;
    w.stopPropagation();
    for (var x = this.shadow.querySelector("#edge_layer").value, k = this.shadow.querySelector("#node_source").value, F = this.shadow.querySelector("#node_destination").value, R = [], U = 0; U < Yt; U++)
      try {
        R[U] = this._topology[U];
      } catch {
        R[U] = { nodes: [], edges: [] };
      }
    var X = [null, null];
    for (let oe = 0; oe < R[x].nodes.length; oe++)
      R[x].nodes[oe].name === k && (X[0] = R[x].nodes[oe].coordinate), R[x].nodes[oe].name === F && (X[1] = R[x].nodes[oe].coordinate);
    let q = {
      name: k + "--" + F,
      meta: {
        endpoint_identifiers: {
          pops: [k, F]
        }
      },
      layer: x,
      azColor: ((re = (G = (Y = this.mapCanvas.options) == null ? void 0 : Y.layers) == null ? void 0 : G[x]) == null ? void 0 : re.color) || mu,
      zaColor: ((Q = (W = (ie = this.mapCanvas.options) == null ? void 0 : ie.layers) == null ? void 0 : W[x]) == null ? void 0 : Q.color) || mu,
      coordinates: X,
      children: []
    };
    R[x].edges.push(q), be.publish("createMapEdge", {
      layer: x,
      source: k,
      destination: F,
      edge: q
    }, this), be.publish("updateTopology", R, this), be.publish("updateMapTopology", R, this), this.updateTopology && this.updateTopology(R), this.dialog = !1, setTimeout(function() {
      be.publish(
        "renderMap",
        // the renderMap signal triggers a re-render of json layers
        R,
        this
      );
    }, 100);
  }
  deleteSelection(w) {
    w.stopPropagation();
    var x = this.mapCanvas.topology, k = x[this._selectedLayer][this._selectedType].splice(this._spliceIndex, 1);
    this._selectedType == "edges" && be.publish("deleteMapEdge", { edge: k[0], layer: this._selectedLayer }, this), this._selectedType == "nodes" && be.publish("deleteMapNode", { node: k[0], layer: this._selectedLayer }, this), be.publish("updateTopology", x, this), be.publish("updateMapTopology", x, this), be.publish("refresh", null, this), be.publish("updateTopologyData", null, this), this._selectedLayer = null, this._selectedType = null, this._spliceIndex = null, this._selectedObject = null, this.render();
  }
  disableScrolling(w) {
    w.stopPropagation(), be.publish("disableScrolling", null, this);
  }
  enableScrolling(w) {
    w.stopPropagation(), be.publish("enableScrolling", null, this);
  }
  // end eventbindings
  /////////////////////////////
  setSrcDstOptions() {
    let w = { nodes: [] };
    try {
      w = this._topology[this._selectedLayer];
    } catch {
    }
    if (this.srcDstOptions = [], !w || !w.nodes) {
      this.render();
      return;
    }
    for (let x = 0; x < w.nodes.length; x++) {
      let k = { name: null };
      k = w.nodes[x], k.name && this.srcDstOptions.push(k.name);
    }
    this.render();
  }
  renderSrcDstOptions(w) {
    if (this.srcDstOptions.length === 0)
      return `<div class="no-node-message">
              The Layer You&apos;ve Selected has no Nodes.
              <div class="add-node-link">
                Add Node
              </div>
            </div>`;
    var x = this.srcDstOptions.map((k, F) => `<option key=${F} value=${k}>${k}</option>`);
    return `<select id="${w}">${x}</select>`;
  }
  toString(w) {
    return typeof w == "number" && !Number.isInteger(w) ? w.toFixed(3) : w || "";
  }
  getFieldValue(w, x) {
    var k = null;
    this._selectedType == w && this._selectedObject && (k = this._selectedObject);
    var F = x.split(".");
    for (var R of F) {
      if (!k)
        return this.toString(k);
      k = k[R];
    }
    return this.toString(k);
  }
  markFormTouched() {
    this._formTouched = !0;
  }
  render() {
    this.shadow || (this.shadow = document.createElement("div"), this.append(this.shadow));
    let w = this._editMode && "inline-block" || "none", x = this._editMode && "inline-block" || "none";
    if (this._formTouched)
      var k = this.shadow.querySelector("#add_node_form");
    let F = "";
    for (let R = 0; R < Yt; R++)
      F += `<option value='${R}' ${this._selectedLayer === R && "selected"}>Layer ${R + 1}</option>`;
    this.shadow.innerHTML = `
            <style>
                .button-overlay { 
                    position: absolute;
                    z-index: 600;
                    margin-top: 12px;
                    margin-right: 12px;
                    right: 0;
                }
                .button-overlay > .button {
                   border-radius: 4px;
                   padding: 5px 10px;
                   margin-right: 5px;
                   box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                   display: inline-block;
                   cursor: pointer;
                }
                .tools-overlay { 
                    position: absolute;
                    z-index: 600;
                    margin-top: 84px;
                    margin-left: 10px;
                    max-width:120px;
                }
                .tools-overlay > .button {
                    border-radius: 4px;
                    padding: 5px 10px;
                    margin-bottom: 10px;
                    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                    display: inline-block;
                    cursor: pointer;
                    width: max-content;
                }
                .button-overlay > .button.edit-mode-only {
                    display: ${w}
                }
                .tools-overlay > .button.edit-mode-only {
                    display: ${x}
                }
                .dialog {
                  position: absolute;
                  z-index: 10000;
                  width: 100%;
                  background: rgba(0,0,0,0.2);
                  height:100%;
                  display: ${this._dialog ? "block" : "none"}
                }

                .dialog .dialog-form {
                  border-radius: 5px;
                  padding:20px;
                  margin: 20px 20%;
                  box-shadow: 3px 3px 13px black;
                  display: none;
                }

                #add_edge_dialog { 
                    display: ${this._dialog == "edge" ? "block" : "none"}
                }

                #add_node_dialog { 
                    display: ${this._dialog == "node" ? "block" : "none"}
                }

                .dialog .dialog-form div {
                  margin: 0.5em 0;
                }

                .dialog .dialog-form .no-node-message {
                  padding-left:10px;
                }
                .dialog .dialog-form .add-node-link {
                  color: blue;
                  text-decoration: underline;
                }
                .dialog .dialog-form input {
                  border:1px solid #b5b5b5;
                }
                .dialog .dialog-form select {
                  margin-left:10px;
                }
                .dialog .dialog-form .text-input {
                  margin-left:10px;
                }

                .dialog .dialog-form input.button {
                  background: rgba(200, 200, 200, 0.5);
                  margin: 1em 0.5em 0 0;
                }

                .dialog .dialog-form table td {
                  padding-bottom:10px;
                }
            </style>
            <div id="dialog" class="dialog">
                <!-- add node dialog -->
                <div class="dialog-form tight-form-func" id="add_node_dialog">
                  <form id='add_node_form'>
                    <h2>${this._selectedType == "nodes" && this._selectedObject ? "Edit Node" : "Add a Node"}</h2>
                    <table>
                      <tr>
                        <td>
                          <label>Layer:</label>
                        </td>
                        <td>
                          <select id="node_layer">
                            ${F}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Name:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_name' type='text' required='required' value='${this.getFieldValue("nodes", "name")}'></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Display Name:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_display_name' type='text' value='${this.getFieldValue("nodes", "display_name")}'></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Latitude:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_lat' type='number' step='0.001' required='required' value='${this.getFieldValue("nodes", "coordinate.0")}'></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Longitude:</label>
                        </td>
                        <td>
                          <input class='text-input' id='node_lng' type='number' step='0.001' required='required' value='${this.getFieldValue("nodes", "coordinate.1")}'></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>SVG Icon:</label>
                        </td>
                        <td>
                          <textarea class='text-input' id='node_svg'>${this.getFieldValue("nodes", "meta.svg")}</textarea>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Custom Tooltip:</label>
                        </td>
                        <td>
                          <textarea class='text-input' id='node_tooltip'>${this.getFieldValue("nodes", "meta.template")}</textarea>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <input class='button' type='button' id='create_node_cancel' value='Cancel' />
                          <input class='button' type='submit' id='create_node' value='${this._selectedType == "nodes" && this._selectedObject ? "Update Node" : "Add Node"}' />
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
                <!-- add edge dialog -->
                <div class='dialog-form tight-form-func' id="add_edge_dialog">
                  <form>
                    <h2>Add an Edge</h2>
                    <table>
                      <tr>
                        <td>
                          <label>Layer:</label>
                        </td>
                        <td>
                          <select id="edge_layer">
                            ${F}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Source:</label>
                        </td>
                        <td>${this.renderSrcDstOptions("node_source")}</td>
                      </tr>
                      <tr>
                        <td>
                          <label>Destination:</label>
                        </td>
                        <td>${this.renderSrcDstOptions("node_destination")}</td>
                      </tr>
                      <tr>
                        <td colspan='2'>
                          <input class="button" type="button" id="create_edge_cancel" value="Cancel" />
                          <input class="button" type="button" id="create_edge" value="Create Edge" />
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
            </div>
            <div class="button-overlay">
              <div class='button edit-mode-only tight-form-func' id='edge_edit_mode'>
                Edit Edges: ${this._edgeEditMode ? "On" : "Off"}
              </div>
              <div class='button edit-mode-only tight-form-func' id='node_edit_mode'>
                Edit Nodes: ${this._nodeEditMode ? "On" : "Off"}
              </div>
            </div>
            <div class="tools-overlay">
              <div class='button edit-mode-only tight-form-func' id='add_node'>
                +&nbsp;Node
              </div>
              <div class='button edit-mode-only tight-form-func' id='add_edge'>
                +&nbsp;Edge
              </div>
              <div class='button edit-mode-only tight-form-func' id='delete_selection' style='${this._selectedObject && this._selectedLayer !== null && this._selectedType ? "display: block" : "display: none"}'>
                Delete<br>
                ${this._selectedObject && this._selectedObject.name}
              </div>
            </div>
            `, this._formTouched && this.shadow.querySelector("#add_node_form").replaceWith(k), this.bindEvents({
      "#dialog@onmousedown": this.disableScrolling,
      "#dialog@onmouseup": this.enableScrolling,
      "#edge_edit_mode@onclick": this.toggleEdgeEdit,
      "#node_edit_mode@onclick": this.toggleNodeEdit,
      //".add_node_link@onclick": this.showAddNodeDialog(), // sometimes null... TODO
      "#add_node@onclick": this.showAddNodeDialog,
      "#add_node_form@onsubmit": this.updateMapNodes,
      "#create_node_cancel@onclick": this.hideDialogs,
      "#node_layer@onchange": this.showSrcDst,
      "#add_edge@onclick": this.showAddEdgeDialog,
      "#create_edge@onclick": this.createMapEdge,
      "#create_edge_cancel@onclick": this.hideDialogs,
      "#edge_layer@onchange": this.showSrcDst,
      "#delete_selection@onclick": this.deleteSelection,
      "input.text-input@onkeyup": this.markFormTouched
    });
  }
}
customElements.get("esnet-map-editing-interface") || customElements.define("esnet-map-editing-interface", Ex);
const _a = xi;
class Sx extends _u {
  constructor() {
    super(), this.instanceId = Math.random().toString(16).substr(2, 8), this._mapCanvas = {
      options: {},
      editingInterface: {}
    }, _a.subscribe("updateEditMode", this.render, this), _a.subscribe("showTooltip", this.showTooltip, this), _a.subscribe("hideTooltip", this.hideTooltip, this);
  }
  set mapCanvas(w) {
    this._mapCanvas = w, this.render();
  }
  get mapCanvas() {
    return this._mapCanvas;
  }
  toggleLayer(w) {
    var x = w.target, k = x.id.split("-")[2], F = x.checked;
    _a.publish("toggleLayer", { layer: k, visible: F }, this);
  }
  showTooltip(w) {
    var x = w.text, k = this.shadow.querySelector("#sidebar-tooltip");
    k && (k.style.opacity = 1, k.innerHTML = x);
  }
  hideTooltip() {
    var w = this.shadow.querySelector("#sidebar-tooltip");
    w && (w.innerHTML = "");
  }
  render() {
    var k, F;
    this.shadow || (this.shadow = document.createElement("div"), this.shadow.setAttribute("class", "tight-form-func"), this.shadow.id = "tooltip-" + this.instanceId, this.append(this.shadow));
    let w = "";
    for (let R = 0; R < Yt; R++)
      !this.mapCanvas.options.layers || !this.mapCanvas.options.layers[R] || !this.mapCanvas.jsonResults || (w += `<div class='toggle container' ${!this.mapCanvas.options.layers[R].legend && "style='display: none;'"}>
        <label class="switch">
          <input type="checkbox" ${this.mapCanvas.options.layers[R].visible && "checked"} id="sidebar-layer-${R}">
          <span class="slider round"></span>
        </label>
        <text class="legend-text">${this.mapCanvas.options.layers[R].name || "Layer " + (R + 1)}</text>
        <div class="legend-text small" style="${this.mapCanvas.editingInterface && !this.mapCanvas.editingInterface.editMode ? "display: none" : ""}">
          JSON Schema: ${this.mapCanvas.jsonResults && this.mapCanvas.jsonResults[R] && this.mapCanvas.jsonResults[R][0] ? "valid" : `invalid${(F = (k = this.mapCanvas.jsonResults) == null ? void 0 : k[R]) != null && F[1] ? ": " + this.mapCanvas.jsonResults[R][1] : ""}`}
        </div>
      </div>`);
    this.shadow.innerHTML = `
      <style>
        #tooltip-${this.instanceId} {
          font-family: sans-serif;
          padding: 0 1em;
          vertical-align: top;
          display: inline-block;
          ${this.mapCanvas.height && "height: " + this.mapCanvas.height + "px;"}
          ${this.mapCanvas && this.mapCanvas.width ? `width: ${this.mapCanvas.width * 0.2}px;` : "width: 19%;"}
        }
        .toggle.container {
          display: block;
          margin-bottom: 8px;
          margin-top:8px;
          padding: 0 5px;
        }
        #tooltip-${this.instanceId} .legend-text {
          vertical-align: bottom;
          margin-bottom:3px;
          line-height: 27px;
          font-size: 14px;
        }
        #tooltip-${this.instanceId} .legend-text.small {
          vertical-align: bottom;
          color: #888;
          line-height: 12px;
          font-size: 12px;
          margin-top:3px;
        }
        #tooltip-${this.instanceId} h2 {
          margin-bottom: 5px;
          margin-top: 10px;
          font-size:20px;
        }
        #sidebar-tooltip p {
          margin: 0;
        }
      </style>
      <h2>Map Layers</h2>

      ${w}

      <h2>Tooltip</h2>
      <div class="sidebar-tooltip" id="sidebar-tooltip">
      </div>
    `;
    var x = {};
    for (let R = 0; R < Yt; R++) {
      if (!this.mapCanvas.options.layers || !this.mapCanvas.options.layers[R])
        continue;
      let U = `#sidebar-layer-${R}@onchange`;
      x[U] = this.toggleLayer;
    }
    this.bindEvents(x);
  }
  /**
   * connect component
   */
  connectedCallback() {
    this.render();
  }
}
customElements.get("esnet-map-side-bar") || customElements.define("esnet-map-side-bar", Sx);
const e1 = {
  arcgis: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    attributes: {
      attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
      minZoom: 2,
      maxZoom: 10,
      ext: "png"
    }
  },
  usgs: {
    url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
    attributes: {
      maxZoom: 20,
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    }
  },
  "esri.shaded": {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
    attributes: {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri",
      maxZoom: 13
    }
  },
  geoportail: {
    url: "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    attributes: {
      attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
      bounds: [
        [-75, -180],
        [81, 180]
      ],
      minZoom: 2,
      maxZoom: 19,
      apikey: "choisirgeoportail",
      format: "image/jpeg",
      style: "normal"
    }
  },
  "cartodb.labeled": {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attributes: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20
    }
  },
  "cartodb.unlabeled": {
    url: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
    attributes: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20
    }
  },
  opentopomap: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attributes: {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
  }
}, t1 = {
  "toner.boundaries": {
    url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}{r}.{ext}",
    attributes: {
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 20,
      ext: "png"
    }
  }
}, n1 = {
  "toner.labels": {
    url: "https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.{ext}",
    attributes: {
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 20,
      ext: "png"
    }
  }
}, we = xi, Tx = Ot;
var lt = window.L;
if (typeof require < "u")
  var lt = require("./lib/leaflet.js");
(function() {
  var f = lt.GridLayer.prototype._initTile;
  lt.GridLayer.include({
    _initTile: function(w) {
      f.call(this, w);
      var x = this.getTileSize();
      w.style.width = x.x + 0.5 + "px", w.style.height = x.y + 0.5 + "px";
    }
  });
})();
const r1 = {
  height: ya.number,
  width: ya.number,
  startlat: ya.number,
  startlng: ya.number
};
class kx extends _u {
  constructor() {
    super(), this.instanceId = Math.random().toString(16).substr(2, 8), this._topology = null, this._options = null, this._selection = !1, this.map = null, this.leafletMap = null, this.jsonResults = [!1, !1, !1], this.legendMinimized = !1, this.userChangedMapFrame = !1;
  }
  // connect component
  connectedCallback() {
    var w = new Tx(this);
    w.setID(this.id, this), we.subscribe("destroyMap", this.destroyMap, this), we.subscribe("newMap", this.newMap, this), we.subscribe("renderMap", () => {
      this.map && this.map.renderMap();
    }, this), we.subscribe("toggleLayer", this.toggleLayer, this), we.subscribe("updateMapOptions", this.updateMapOptions, this), we.subscribe("updateMapTopology", this.updateMapTopology, this), we.subscribe("updateMapDimensions", this.updateMapDimensions, this), we.subscribe("updateTopology", () => {
      this.updateTopology && this.updateTopology(this.topology);
    }, this), we.subscribe("disableScrolling", () => {
      this.disableScrolling();
    }, this), we.subscribe("enableScrolling", () => {
      this.enableScrolling();
    }, this), we.subscribe("setSelection", function(k) {
      this.selection = !0;
    }, this), we.subscribe("clearSelection", function() {
      this.selection = !1;
    }, this), we.subscribe("getMapCenterAndZoom", /* @__PURE__ */ (() => {
      var k = this;
      return () => {
        we.publish("returnMapCenterAndZoom", {
          center: k.map.leafletMap.getCenter(),
          zoom: k.map.leafletMap.getZoom()
        });
      };
    })()), we.subscribe("getMapViewport", /* @__PURE__ */ (() => {
      var k = this;
      return () => {
        we.publish("returnMapViewport", {
          coordinates: k.map.leafletMap.getBounds()
        });
      };
    })()), window.addEventListener("resize", () => {
      this.recalculateMapZoom();
    }), !this.topology && this.getAttribute("topology") && (this.topology = JSON.parse(this.getAttribute("topology"))), !this.options && this.getAttribute("options") && (this.options = JSON.parse(this.getAttribute("options"))), this.options && this.options.legendDefaultBehavior && (this.legendMinimized = this.options.legendDefaultBehavior === "minimized");
    const x = h1();
    x.editPanel === null || x.editPanel === void 0 || !this.options.enableEditing ? this.disableEditing() : this.enableEditing(), this.render();
  }
  get topology() {
    return this._topology;
  }
  set topology(w) {
    return this._topology = w, w;
  }
  get options() {
    return this._options;
  }
  set options(w) {
    return this._options = w, w;
  }
  get jsonResults() {
    return this._jsonResults;
  }
  set jsonResults(w) {
    this._jsonResults = w;
  }
  get updateTopology() {
    return this._updateTopology;
  }
  set updateTopology(w) {
    return this._updateTopology = w, this.editingInterface && (this.editingInterface.updateTopology = w), w;
  }
  get updateOptions() {
    return this._updateOptions;
  }
  set updateOptions(w) {
    return this._updateOptions = w, w;
  }
  // "propattribute" setters/getters
  get height() {
    return this._height;
  }
  set height(w) {
    return this._height = w, w;
  }
  get width() {
    return this._width;
  }
  set width(w) {
    return this._width = w, w;
  }
  get startlat() {
    return this._startlat;
  }
  set startlat(w) {
    return this._startlat = w, this.newMap(), w;
  }
  get startlng() {
    return this._startlng;
  }
  set startlng(w) {
    return this._startlng = w, this.newMap(), w;
  }
  set selection(w) {
    this._selection = w, this.renderStyle();
  }
  get selection() {
    return this._selection;
  }
  // "propattribute" helper functions
  static get observedAttributes() {
    return Object.keys(r1);
  }
  attributeChangedCallback(w, x, k) {
    x != k && k != this[w] && (this[w] = r1[w](k));
  }
  clearSelection() {
    we.publish("setVariables", null, this), we.publish("clearSelection", null, this);
  }
  disableEditing() {
    we.publish("updateEditMode", !1, this), we.last("setEditMode", this) && we.publish("setEditMode", null, this), we.last("setEditSelection", this) && we.publish("setEditSelection", null, this);
  }
  enableEditing() {
    we.publish("updateEditMode", !0, this);
  }
  enableScrolling() {
    this.leafletMap && this.leafletMap.dragging.enable();
  }
  disableScrolling() {
    this.leafletMap && this.leafletMap.dragging.disable();
  }
  updateMapOptions(w) {
    var { options: x, changed: k } = w;
    Object.keys(x).forEach((R) => {
      this._options[R] = x[R];
    });
    function F(R, U) {
      return U.indexOf(R) >= 0;
    }
    (F("showLegend", k) || F("customLegend", k) || F("customLegendValue", k) || F("thresholds", k) || F("legendColumnLength", k) || F("legendPosition", k)) && this.renderLegend(), F("enableEditing", k) && (x.enableEditing ? this.enableEditing() : this.disableEditing(), this.shadow.remove(), this.shadow = null, this.render(), this.newMap()), (F("showSidebar", k) || F("showViewControls", k) || F("enableScrolling", k) || F("resolveLat", k) || F("resolveLng", k)) && (this.shadow.remove(), this.shadow = null, this.render(), this.newMap()), F("tileset.geographic", k) || F("tileset.boundaries", k) || F("tileset.labels", k) ? this.newMap() : this.map && this.map.renderMap(), (F("background", k) || F("enableNodeAnimation", k) || F("enableEdgeAnimation", k)) && this.renderStyle(), this.sideBar && this.sideBar.render();
  }
  updateMapTopology(w) {
    if (this._topology = w, this.editingInterface && (this.editingInterface._topology = w), this.topology)
      this.jsonResults = this.topology.map((x) => yu(x));
    else {
      this.jsonResults = [];
      for (let x = 0; x < Yt; x++)
        this.jsonResults.push([!1, "No Topology data available."]);
    }
    this.sideBar && this.sideBar.render(), this.map && this.map.renderMap();
  }
  updateMapDimensions(w) {
    this.width = w.width, this.height = w.height, this.recalculateMapZoom();
  }
  recalculateMapZoom() {
    if (this.leafletMap && this.leafletMap.invalidateSize(), this.leafletMap && !this.userChangedMapFrame && this._options.initialViewStrategy === "viewport") {
      var w = lt.latLngBounds(
        lt.latLng(
          this._options.viewport.top,
          this._options.viewport.left
        ),
        lt.latLng(
          this._options.viewport.bottom,
          this._options.viewport.right
        )
      );
      this.leafletMap.fitBounds(w);
    }
    this.render(), this.sideBar && this.sideBar.render();
  }
  updateCenter(w) {
    var x = this._options;
    x.viewport = {
      ...x.viewport,
      zoom: w.zoom,
      center: {
        lat: w.center.lat.toFixed(2),
        lng: w.center.lng.toFixed(2)
      }
    }, this._updateOptions && this._updateOptions(x);
  }
  toggleLayer(w) {
    var x = this._options;
    x.layers && x.layers[w.layer] ? x.layers[w.layer].visible = w.visible : x.layers[w.layer] = { visible: w.visible }, this.map.renderMapLayers(), this._updateOptions && this._updateOptions(x);
  }
  getCurrentLeafletMap() {
    var R, U, X, q, Y, G, re, ie, W, Q;
    if (!this.leafletMap) {
      var w = [this.startlat || ((X = (U = (R = this._options) == null ? void 0 : R.viewport) == null ? void 0 : U.center) == null ? void 0 : X.lat), this.startlng || ((G = (Y = (q = this._options) == null ? void 0 : q.viewport) == null ? void 0 : Y.center) == null ? void 0 : G.lng)], x = ((ie = (re = this._options) == null ? void 0 : re.viewport) == null ? void 0 : ie.zoom) || 3;
      window[this.id + "mapPosition"] && window[this.id + "mapPosition"].center && (w = window[this.id + "mapPosition"].center), window[this.id + "mapPosition"] && window[this.id + "mapPosition"].zoom && (x = window[this.id + "mapPosition"].zoom), this.leafletMap = lt.map(this.mapContainer, {
        zoomAnimation: !1,
        fadeAnimation: !1,
        zoomSnap: 0.125,
        zoomDelta: 0.125,
        scrollWheelZoom: !1,
        doubleClickZoom: !1,
        keyboard: !1,
        dragging: (W = this._options) == null ? void 0 : W.enableScrolling,
        zoomControl: (Q = this._options) == null ? void 0 : Q.showViewControls
      }).setView(w, x), this._options.tileset.geographic && lt.tileLayer(
        e1[this._options.tileset.geographic].url,
        e1[this._options.tileset.geographic].attributes
      ).addTo(this.leafletMap), this._options.tileset.boundaries && lt.tileLayer(
        t1[this._options.tileset.boundaries].url,
        t1[this._options.tileset.boundaries].attributes
      ).addTo(this.leafletMap), this._options.tileset.labels && lt.tileLayer(
        n1[this._options.tileset.labels].url,
        n1[this._options.tileset.labels].attributes
      ).addTo(this.leafletMap), !window[this.id + "mapPosition"] && this._options.initialViewStrategy === "viewport" && this.leafletMap.fitBounds(lt.latLngBounds(
        lt.latLng(
          this._options.viewport.top,
          this._options.viewport.left
        ),
        lt.latLng(
          this._options.viewport.bottom,
          this._options.viewport.right
        )
      )), lt.svg({ clickable: !0 }).addTo(this.leafletMap);
    }
    let k = this.querySelector(".leaflet-control-zoom-in");
    k == null || k.classList.add("tight-form-func"), k == null || k.addEventListener("click", () => {
      this.userChangedMapFrame = !0;
    });
    let F = this.querySelector(".leaflet-control-zoom-out");
    return F == null || F.classList.add("tight-form-func"), F == null || F.addEventListener("click", () => {
      this.userChangedMapFrame = !0;
    }), this.leafletMap.on("zoomend", (oe) => {
      window[this.id + "mapPosition"] || (window[this.id + "mapPosition"] = {}), window[this.id + "mapPosition"].zoom = this.leafletMap.getZoom();
    }), this.leafletMap.on("move", (oe) => {
      oe.originalEvent && (this.userChangedMapFrame = !0);
    }), this.leafletMap.on("moveend", () => {
      window[this.id + "mapPosition"] || (window[this.id + "mapPosition"] = {}), window[this.id + "mapPosition"].center = this.leafletMap.getCenter();
    }), this.leafletMap;
  }
  destroyMap() {
    this.leafletMap && (this.leafletMap.off(), this.leafletMap.remove(), this.leafletMap = null), we.clearTopicCallbacks("");
  }
  homeMap() {
    window[this.id + "mapPosition"] = null, this.newMap();
  }
  newMap() {
    if (this.topology)
      this.jsonResults = this.topology.map((x) => yu(x));
    else {
      this.jsonResults = [];
      for (let x = 0; x < Yt; x++)
        this.jsonResults[x] = [!1, "No Topology data available."];
      return;
    }
    this.sideBar && this.sideBar.render(), this.destroyMap && this.destroyMap(), this.map = new xx(this), this.map.renderMap();
    var w = we.last("setEditMode", this);
    we.publish("setEditMode", w, this);
  }
  renderStyle() {
    let w = this.shadow.querySelector("#mapstyle"), x = this._selection && "inline-block" || "none", k = this.options.zIndexBase ? this.options.zIndexBase : 50, F = [];
    for (let R = 0; R <= 10; R++)
      F.push(k + R * 10);
    w.innerHTML = `
      <style>

        /* this is to bring grafana panel header on top leaflet layers */
        .panel-header:hover { z-index: ${F[9]}; }
        div.tooltip-hover { z-index: 1000; position:absolute; }
        .home-overlay { z-index: ${F[8]}; }
        .legend {  z-index: ${F[8]}; }
        .leaflet-zoom-box { z-index: ${F[8]}; }
        .leaflet-pane         { z-index: ${F[4]}; }

        .leaflet-tile-pane    { z-index: ${F[1]}; }
        .leaflet-overlay-pane { z-index: ${F[3]}; }
        .leaflet-shadow-pane  { z-index: ${F[4]}; }
        .leaflet-marker-pane  { z-index: ${F[5]}; }
        .leaflet-tooltip-pane   { z-index: ${F[6]}; }
        .leaflet-popup-pane   { z-index: ${F[7]}; }

        .leaflet-map-pane canvas { z-index: ${F[0]}; }
        .leaflet-map-pane svg    { z-index: ${F[1]}; }
        .leaflet-control { z-index: ${F[8]}; }
        .leaflet-bottom { z-index: ${F[9]}; }

          #map-${this.instanceId} { 
            font-family: sans-serif;
            position:relative;
            background: ${this.options.background};
            display: inline-block;
          }
          #map-${this.instanceId} > .home-overlay > .button.selected-only {
              display: ${x}
          }
          ${this.options.enableNodeAnimation ? `
          .animated-node { 
            animation-name: throb;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          @keyframes throb {
            0% {transform:scale(1.5, 1.5);}
            50% {transform:scale(1.0, 1.0); }
            100% {transform:scale(1.5, 1.5); }
          }
          ` : ""}
          ${this.options.enableEdgeAnimation ? `
          g.dash-over polygon {
            animation-name: crawl;
            animation-duration: 0.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          g.dash-selected polygon {
            animation-name: crawl;
            animation-duration: 0.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          @keyframes crawl {
            0% {transform:translate(0,0);}
            100% {transform:translate(12px,0); }
          }` : ""}
      </style>
    `;
  }
  valueFormat(w, x) {
    if (x == null && (x = "b"), w = parseInt(w, 10), w === 0)
      return "0";
    let k = Math.floor(Math.log(w) / Math.log(1024)), R = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"][k];
    return { text: (w / Math.pow(1024, k)).toFixed(2), suffix: R + x };
  }
  legendFormatter(w, x) {
    w === -1 / 0 && (w = null);
    var k = this.valueFormat(w || x);
    return w ? `≥ ${k.text} ${k.suffix}` : `${k.text} ${k.suffix} or below`;
  }
  toggleMinimizeLegend() {
    this.legendMinimized = !this.legendMinimized, this.renderLegend();
  }
  renderLegend() {
    let w = this.shadow.querySelector("#legend-container"), x = "";
    if (!this.options.showLegend) {
      w.innerHTML = x;
      return;
    }
    let k = [], F = this.options.legendColumnLength ? this.options.legendColumnLength : 3, R = this.options.thresholds;
    if (x = `<div class='tight-form-func legend ${this.options.legendPosition}'>
      <div class='heading'>
        <h4>Legend</h4>
        <svg class='minimize' version="1.1" xmlns="http://www.w3.org/2000/svg" height="16" width="16">
          <g transform='scale(1.4) translate(0 0.5)'>
          <circle class='circle-background' cx="5" cy="5" r="5" />
          <polyline points="${this.legendMinimized ? "3,6.5 5,3.5 7,6.5" : "3,3.5 5,6.5 7,3.5"}" fill="#FFFFFF" stroke="#FFFFFF" />
          </g>
        </svg>
      </div>`, this.legendMinimized) {
      x += "</div>", w.innerHTML = x, this.bindEvents({
        ".minimize@onclick": this.toggleMinimizeLegend
      });
      return;
    }
    if (this.options.customLegend)
      x += this.options.customLegendValue;
    else {
      for (let Y = 0; Y < R.length; Y++) {
        Y % F == 0 && k.push([]);
        var U = k.length - 1, X = R[Y].value, q = R[Y + 1] ? R[Y + 1].value : null;
        k[U].push(`<div class='legend-entry'>
          <p>
            <span class='color-sample' style='background-color: ${R[Y].color}'></span>
            ${this.legendFormatter(X, q)}
          </p>
        </div>`);
      }
      k.forEach((Y) => {
        x += "<div class='legend-column'>", Y.forEach((G) => {
          x += G;
        }), x += "</div>";
      });
    }
    x += "</div>", w.innerHTML = x, this.bindEvents({
      ".minimize@onclick": this.toggleMinimizeLegend
    });
  }
  render() {
    this.shadow || (this._selection = !!we.last("setSelection", this), this.shadow = document.createElement("div"), this.append(this.shadow), this.shadow.innerHTML = `
      <style>
        ${Mx}
      </style>
      <style>
        ${wx}
      </style>
      <div id='mapstyle'>
      </div>


      <div id='map-${this.instanceId}'>
        <div class='home-overlay'>
            <div class="button tight-form-func" id="home_map" ${this.options.showViewControls ? "" : "style='display:none;'"}>
              🏠
            </div>
            <div class='button selected-only tight-form-func' id='clear_selection'">
              &times; Clear Selection
            </div>
        </div>
        <div class='legend-overlay'>
          <div id='legend-container'>
          </div>
        </div>
        ${this.options.enableEditing ? "<esnet-map-editing-interface></esnet-map-editing-interface>" : ""}
      </div>
      ${this.options.showSidebar ? "<esnet-map-side-bar></esnet-map-side-bar>" : ""}`, this.mapContainer = this.shadow.querySelector(`#map-${this.instanceId}`), this.editingInterface = this.shadow.querySelector("esnet-map-editing-interface"), this.editingInterface && (this.editingInterface.mapCanvas = this, this.editingInterface.topology = this.topology, this.editingInterface.updateTopology = this.updateTopology), this.sideBar = this.shadow.querySelector("esnet-map-side-bar"), this.sideBar && (this.sideBar.mapCanvas = this), typeof ResizeObserver < "u" && new ResizeObserver(() => {
      this.recalculateMapZoom.apply(this);
    }).observe(this.shadow)), this.renderStyle(), this.renderLegend(), this.height && (this.mapContainer.style.height = this.height + "px"), this.width ? this.options.showSidebar ? this.mapContainer.style.width = this.width * 0.8 - 5 + "px" : this.mapContainer.style.width = this.width + "px" : this.options.showSidebar ? this.mapContainer.style.width = "77%" : this.mapContainer.style.width = "100%", !this.map && this.options && this.topology && this.newMap(), this.map && this.map.renderMap(), this.bindEvents({
      "#home_map@onclick": this.homeMap,
      "#clear_selection@onclick": this.clearSelection
    });
  }
}
customElements.get("esnet-map-canvas") || customElements.define("esnet-map-canvas", kx);
export {
  kx as MapCanvas
};
