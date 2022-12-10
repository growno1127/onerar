'use strict';
'use strict';
(() => {
  var Qe = Object.create;
  var ae = Object.defineProperty;
  var Pe = Object.getOwnPropertyDescriptor;
  var Ce = Object.getOwnPropertyNames;
  var Oe = Object.getPrototypeOf,
    Re = Object.prototype.hasOwnProperty;
  var _e = (t, e) => () => (e || t((e = {exports: {}}).exports, e), e.exports);
  var Me = (t, e, n, r) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let i of Ce(e))
        !Re.call(t, i) &&
          i !== n &&
          ae(t, i, {
            get: () => e[i],
            enumerable: !(r = Pe(e, i)) || r.enumerable,
          });
    return t;
  };
  var De = (t, e, n) => (
    (n = t != null ? Qe(Oe(t)) : {}),
    Me(
      e || !t || !t.__esModule
        ? ae(n, 'default', {value: t, enumerable: !0})
        : n,
      t
    )
  );
  var de = _e((ce, he) => {
    (function () {
      var t = function (e) {
        var n = new t.Builder();
        return (
          n.pipeline.add(t.trimmer, t.stopWordFilter, t.stemmer),
          n.searchPipeline.add(t.stemmer),
          e.call(n, n),
          n.build()
        );
      };
      t.version = '2.3.9';
      (t.utils = {}),
        (t.warn = (function (e) {
          return function (n) {
            e.console && console.warn && console.warn(n);
          };
        })(this)),
        (t.asString = function (e) {
          return e == null ? '' : e.toString();
        }),
        (t.clone = function (e) {
          if (e == null) return e;
          for (
            var n = Object.create(null), r = Object.keys(e), i = 0;
            i < r.length;
            i++
          ) {
            var s = r[i],
              o = e[s];
            if (Array.isArray(o)) {
              n[s] = o.slice();
              continue;
            }
            if (
              typeof o == 'string' ||
              typeof o == 'number' ||
              typeof o == 'boolean'
            ) {
              n[s] = o;
              continue;
            }
            throw new TypeError(
              'clone is not deep and does not support nested objects'
            );
          }
          return n;
        }),
        (t.FieldRef = function (e, n, r) {
          (this.docRef = e), (this.fieldName = n), (this._stringValue = r);
        }),
        (t.FieldRef.joiner = '/'),
        (t.FieldRef.fromString = function (e) {
          var n = e.indexOf(t.FieldRef.joiner);
          if (n === -1) throw 'malformed field ref string';
          var r = e.slice(0, n),
            i = e.slice(n + 1);
          return new t.FieldRef(i, r, e);
        }),
        (t.FieldRef.prototype.toString = function () {
          return (
            this._stringValue == null &&
              (this._stringValue =
                this.fieldName + t.FieldRef.joiner + this.docRef),
            this._stringValue
          );
        });
      (t.Set = function (e) {
        if (((this.elements = Object.create(null)), e)) {
          this.length = e.length;
          for (var n = 0; n < this.length; n++) this.elements[e[n]] = !0;
        } else this.length = 0;
      }),
        (t.Set.complete = {
          intersect: function (e) {
            return e;
          },
          union: function () {
            return this;
          },
          contains: function () {
            return !0;
          },
        }),
        (t.Set.empty = {
          intersect: function () {
            return this;
          },
          union: function (e) {
            return e;
          },
          contains: function () {
            return !1;
          },
        }),
        (t.Set.prototype.contains = function (e) {
          return !!this.elements[e];
        }),
        (t.Set.prototype.intersect = function (e) {
          var n,
            r,
            i,
            s = [];
          if (e === t.Set.complete) return this;
          if (e === t.Set.empty) return e;
          this.length < e.length
            ? ((n = this), (r = e))
            : ((n = e), (r = this)),
            (i = Object.keys(n.elements));
          for (var o = 0; o < i.length; o++) {
            var a = i[o];
            a in r.elements && s.push(a);
          }
          return new t.Set(s);
        }),
        (t.Set.prototype.union = function (e) {
          return e === t.Set.complete
            ? t.Set.complete
            : e === t.Set.empty
            ? this
            : new t.Set(
                Object.keys(this.elements).concat(Object.keys(e.elements))
              );
        }),
        (t.idf = function (e, n) {
          var r = 0;
          for (var i in e) i != '_index' && (r += Object.keys(e[i]).length);
          var s = (n - r + 0.5) / (r + 0.5);
          return Math.log(1 + Math.abs(s));
        }),
        (t.Token = function (e, n) {
          (this.str = e || ''), (this.metadata = n || {});
        }),
        (t.Token.prototype.toString = function () {
          return this.str;
        }),
        (t.Token.prototype.update = function (e) {
          return (this.str = e(this.str, this.metadata)), this;
        }),
        (t.Token.prototype.clone = function (e) {
          return (
            (e =
              e ||
              function (n) {
                return n;
              }),
            new t.Token(e(this.str, this.metadata), this.metadata)
          );
        });
      (t.tokenizer = function (e, n) {
        if (e == null || e == null) return [];
        if (Array.isArray(e))
          return e.map(function (m) {
            return new t.Token(t.asString(m).toLowerCase(), t.clone(n));
          });
        for (
          var r = e.toString().toLowerCase(),
            i = r.length,
            s = [],
            o = 0,
            a = 0;
          o <= i;
          o++
        ) {
          var u = r.charAt(o),
            l = o - a;
          if (u.match(t.tokenizer.separator) || o == i) {
            if (l > 0) {
              var h = t.clone(n) || {};
              (h.position = [a, l]),
                (h.index = s.length),
                s.push(new t.Token(r.slice(a, o), h));
            }
            a = o + 1;
          }
        }
        return s;
      }),
        (t.tokenizer.separator = /[\s\-]+/);
      (t.Pipeline = function () {
        this._stack = [];
      }),
        (t.Pipeline.registeredFunctions = Object.create(null)),
        (t.Pipeline.registerFunction = function (e, n) {
          n in this.registeredFunctions &&
            t.warn('Overwriting existing registered function: ' + n),
            (e.label = n),
            (t.Pipeline.registeredFunctions[e.label] = e);
        }),
        (t.Pipeline.warnIfFunctionNotRegistered = function (e) {
          var n = e.label && e.label in this.registeredFunctions;
          n ||
            t.warn(
              `Function is not registered with pipeline. This may cause problems when serialising the index.
`,
              e
            );
        }),
        (t.Pipeline.load = function (e) {
          var n = new t.Pipeline();
          return (
            e.forEach(function (r) {
              var i = t.Pipeline.registeredFunctions[r];
              if (i) n.add(i);
              else throw new Error('Cannot load unregistered function: ' + r);
            }),
            n
          );
        }),
        (t.Pipeline.prototype.add = function () {
          var e = Array.prototype.slice.call(arguments);
          e.forEach(function (n) {
            t.Pipeline.warnIfFunctionNotRegistered(n), this._stack.push(n);
          }, this);
        }),
        (t.Pipeline.prototype.after = function (e, n) {
          t.Pipeline.warnIfFunctionNotRegistered(n);
          var r = this._stack.indexOf(e);
          if (r == -1) throw new Error('Cannot find existingFn');
          (r = r + 1), this._stack.splice(r, 0, n);
        }),
        (t.Pipeline.prototype.before = function (e, n) {
          t.Pipeline.warnIfFunctionNotRegistered(n);
          var r = this._stack.indexOf(e);
          if (r == -1) throw new Error('Cannot find existingFn');
          this._stack.splice(r, 0, n);
        }),
        (t.Pipeline.prototype.remove = function (e) {
          var n = this._stack.indexOf(e);
          n != -1 && this._stack.splice(n, 1);
        }),
        (t.Pipeline.prototype.run = function (e) {
          for (var n = this._stack.length, r = 0; r < n; r++) {
            for (var i = this._stack[r], s = [], o = 0; o < e.length; o++) {
              var a = i(e[o], o, e);
              if (!(a == null || a === ''))
                if (Array.isArray(a))
                  for (var u = 0; u < a.length; u++) s.push(a[u]);
                else s.push(a);
            }
            e = s;
          }
          return e;
        }),
        (t.Pipeline.prototype.runString = function (e, n) {
          var r = new t.Token(e, n);
          return this.run([r]).map(function (i) {
            return i.toString();
          });
        }),
        (t.Pipeline.prototype.reset = function () {
          this._stack = [];
        }),
        (t.Pipeline.prototype.toJSON = function () {
          return this._stack.map(function (e) {
            return t.Pipeline.warnIfFunctionNotRegistered(e), e.label;
          });
        });
      (t.Vector = function (e) {
        (this._magnitude = 0), (this.elements = e || []);
      }),
        (t.Vector.prototype.positionForIndex = function (e) {
          if (this.elements.length == 0) return 0;
          for (
            var n = 0,
              r = this.elements.length / 2,
              i = r - n,
              s = Math.floor(i / 2),
              o = this.elements[s * 2];
            i > 1 && (o < e && (n = s), o > e && (r = s), o != e);

          )
            (i = r - n),
              (s = n + Math.floor(i / 2)),
              (o = this.elements[s * 2]);
          if (o == e || o > e) return s * 2;
          if (o < e) return (s + 1) * 2;
        }),
        (t.Vector.prototype.insert = function (e, n) {
          this.upsert(e, n, function () {
            throw 'duplicate index';
          });
        }),
        (t.Vector.prototype.upsert = function (e, n, r) {
          this._magnitude = 0;
          var i = this.positionForIndex(e);
          this.elements[i] == e
            ? (this.elements[i + 1] = r(this.elements[i + 1], n))
            : this.elements.splice(i, 0, e, n);
        }),
        (t.Vector.prototype.magnitude = function () {
          if (this._magnitude) return this._magnitude;
          for (var e = 0, n = this.elements.length, r = 1; r < n; r += 2) {
            var i = this.elements[r];
            e += i * i;
          }
          return (this._magnitude = Math.sqrt(e));
        }),
        (t.Vector.prototype.dot = function (e) {
          for (
            var n = 0,
              r = this.elements,
              i = e.elements,
              s = r.length,
              o = i.length,
              a = 0,
              u = 0,
              l = 0,
              h = 0;
            l < s && h < o;

          )
            (a = r[l]),
              (u = i[h]),
              a < u
                ? (l += 2)
                : a > u
                ? (h += 2)
                : a == u && ((n += r[l + 1] * i[h + 1]), (l += 2), (h += 2));
          return n;
        }),
        (t.Vector.prototype.similarity = function (e) {
          return this.dot(e) / this.magnitude() || 0;
        }),
        (t.Vector.prototype.toArray = function () {
          for (
            var e = new Array(this.elements.length / 2), n = 1, r = 0;
            n < this.elements.length;
            n += 2, r++
          )
            e[r] = this.elements[n];
          return e;
        }),
        (t.Vector.prototype.toJSON = function () {
          return this.elements;
        });
      (t.stemmer = (function () {
        var e = {
            ational: 'ate',
            tional: 'tion',
            enci: 'ence',
            anci: 'ance',
            izer: 'ize',
            bli: 'ble',
            alli: 'al',
            entli: 'ent',
            eli: 'e',
            ousli: 'ous',
            ization: 'ize',
            ation: 'ate',
            ator: 'ate',
            alism: 'al',
            iveness: 'ive',
            fulness: 'ful',
            ousness: 'ous',
            aliti: 'al',
            iviti: 'ive',
            biliti: 'ble',
            logi: 'log',
          },
          n = {
            icate: 'ic',
            ative: '',
            alize: 'al',
            iciti: 'ic',
            ical: 'ic',
            ful: '',
            ness: '',
          },
          r = '[^aeiou]',
          i = '[aeiouy]',
          s = r + '[^aeiouy]*',
          o = i + '[aeiou]*',
          a = '^(' + s + ')?' + o + s,
          u = '^(' + s + ')?' + o + s + '(' + o + ')?$',
          l = '^(' + s + ')?' + o + s + o + s,
          h = '^(' + s + ')?' + i,
          m = new RegExp(a),
          v = new RegExp(l),
          b = new RegExp(u),
          y = new RegExp(h),
          E = /^(.+?)(ss|i)es$/,
          f = /^(.+?)([^s])s$/,
          p = /^(.+?)eed$/,
          w = /^(.+?)(ed|ing)$/,
          S = /.$/,
          I = /(at|bl|iz)$/,
          _ = new RegExp('([^aeiouylsz])\\1$'),
          z = new RegExp('^' + s + i + '[^aeiouwxy]$'),
          A = /^(.+?[^aeiou])y$/,
          q =
            /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,
          $ = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,
          V =
            /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,
          W = /^(.+?)(s|t)(ion)$/,
          P = /^(.+?)e$/,
          U = /ll$/,
          G = new RegExp('^' + s + i + '[^aeiouwxy]$'),
          N = function (c) {
            var g, C, T, d, x, O, D;
            if (c.length < 3) return c;
            if (
              ((T = c.substr(0, 1)),
              T == 'y' && (c = T.toUpperCase() + c.substr(1)),
              (d = E),
              (x = f),
              d.test(c)
                ? (c = c.replace(d, '$1$2'))
                : x.test(c) && (c = c.replace(x, '$1$2')),
              (d = p),
              (x = w),
              d.test(c))
            ) {
              var L = d.exec(c);
              (d = m), d.test(L[1]) && ((d = S), (c = c.replace(d, '')));
            } else if (x.test(c)) {
              var L = x.exec(c);
              (g = L[1]),
                (x = y),
                x.test(g) &&
                  ((c = g),
                  (x = I),
                  (O = _),
                  (D = z),
                  x.test(c)
                    ? (c = c + 'e')
                    : O.test(c)
                    ? ((d = S), (c = c.replace(d, '')))
                    : D.test(c) && (c = c + 'e'));
            }
            if (((d = A), d.test(c))) {
              var L = d.exec(c);
              (g = L[1]), (c = g + 'i');
            }
            if (((d = q), d.test(c))) {
              var L = d.exec(c);
              (g = L[1]), (C = L[2]), (d = m), d.test(g) && (c = g + e[C]);
            }
            if (((d = $), d.test(c))) {
              var L = d.exec(c);
              (g = L[1]), (C = L[2]), (d = m), d.test(g) && (c = g + n[C]);
            }
            if (((d = V), (x = W), d.test(c))) {
              var L = d.exec(c);
              (g = L[1]), (d = v), d.test(g) && (c = g);
            } else if (x.test(c)) {
              var L = x.exec(c);
              (g = L[1] + L[2]), (x = v), x.test(g) && (c = g);
            }
            if (((d = P), d.test(c))) {
              var L = d.exec(c);
              (g = L[1]),
                (d = v),
                (x = b),
                (O = G),
                (d.test(g) || (x.test(g) && !O.test(g))) && (c = g);
            }
            return (
              (d = U),
              (x = v),
              d.test(c) && x.test(c) && ((d = S), (c = c.replace(d, ''))),
              T == 'y' && (c = T.toLowerCase() + c.substr(1)),
              c
            );
          };
        return function (M) {
          return M.update(N);
        };
      })()),
        t.Pipeline.registerFunction(t.stemmer, 'stemmer');
      (t.generateStopWordFilter = function (e) {
        var n = e.reduce(function (r, i) {
          return (r[i] = i), r;
        }, {});
        return function (r) {
          if (r && n[r.toString()] !== r.toString()) return r;
        };
      }),
        (t.stopWordFilter = t.generateStopWordFilter([
          'a',
          'able',
          'about',
          'across',
          'after',
          'all',
          'almost',
          'also',
          'am',
          'among',
          'an',
          'and',
          'any',
          'are',
          'as',
          'at',
          'be',
          'because',
          'been',
          'but',
          'by',
          'can',
          'cannot',
          'could',
          'dear',
          'did',
          'do',
          'does',
          'either',
          'else',
          'ever',
          'every',
          'for',
          'from',
          'get',
          'got',
          'had',
          'has',
          'have',
          'he',
          'her',
          'hers',
          'him',
          'his',
          'how',
          'however',
          'i',
          'if',
          'in',
          'into',
          'is',
          'it',
          'its',
          'just',
          'least',
          'let',
          'like',
          'likely',
          'may',
          'me',
          'might',
          'most',
          'must',
          'my',
          'neither',
          'no',
          'nor',
          'not',
          'of',
          'off',
          'often',
          'on',
          'only',
          'or',
          'other',
          'our',
          'own',
          'rather',
          'said',
          'say',
          'says',
          'she',
          'should',
          'since',
          'so',
          'some',
          'than',
          'that',
          'the',
          'their',
          'them',
          'then',
          'there',
          'these',
          'they',
          'this',
          'tis',
          'to',
          'too',
          'twas',
          'us',
          'wants',
          'was',
          'we',
          'were',
          'what',
          'when',
          'where',
          'which',
          'while',
          'who',
          'whom',
          'why',
          'will',
          'with',
          'would',
          'yet',
          'you',
          'your',
        ])),
        t.Pipeline.registerFunction(t.stopWordFilter, 'stopWordFilter');
      (t.trimmer = function (e) {
        return e.update(function (n) {
          return n.replace(/^\W+/, '').replace(/\W+$/, '');
        });
      }),
        t.Pipeline.registerFunction(t.trimmer, 'trimmer');
      (t.TokenSet = function () {
        (this.final = !1),
          (this.edges = {}),
          (this.id = t.TokenSet._nextId),
          (t.TokenSet._nextId += 1);
      }),
        (t.TokenSet._nextId = 1),
        (t.TokenSet.fromArray = function (e) {
          for (
            var n = new t.TokenSet.Builder(), r = 0, i = e.length;
            r < i;
            r++
          )
            n.insert(e[r]);
          return n.finish(), n.root;
        }),
        (t.TokenSet.fromClause = function (e) {
          return 'editDistance' in e
            ? t.TokenSet.fromFuzzyString(e.term, e.editDistance)
            : t.TokenSet.fromString(e.term);
        }),
        (t.TokenSet.fromFuzzyString = function (e, n) {
          for (
            var r = new t.TokenSet(),
              i = [{node: r, editsRemaining: n, str: e}];
            i.length;

          ) {
            var s = i.pop();
            if (s.str.length > 0) {
              var o = s.str.charAt(0),
                a;
              o in s.node.edges
                ? (a = s.node.edges[o])
                : ((a = new t.TokenSet()), (s.node.edges[o] = a)),
                s.str.length == 1 && (a.final = !0),
                i.push({
                  node: a,
                  editsRemaining: s.editsRemaining,
                  str: s.str.slice(1),
                });
            }
            if (s.editsRemaining != 0) {
              if ('*' in s.node.edges) var u = s.node.edges['*'];
              else {
                var u = new t.TokenSet();
                s.node.edges['*'] = u;
              }
              if (
                (s.str.length == 0 && (u.final = !0),
                i.push({
                  node: u,
                  editsRemaining: s.editsRemaining - 1,
                  str: s.str,
                }),
                s.str.length > 1 &&
                  i.push({
                    node: s.node,
                    editsRemaining: s.editsRemaining - 1,
                    str: s.str.slice(1),
                  }),
                s.str.length == 1 && (s.node.final = !0),
                s.str.length >= 1)
              ) {
                if ('*' in s.node.edges) var l = s.node.edges['*'];
                else {
                  var l = new t.TokenSet();
                  s.node.edges['*'] = l;
                }
                s.str.length == 1 && (l.final = !0),
                  i.push({
                    node: l,
                    editsRemaining: s.editsRemaining - 1,
                    str: s.str.slice(1),
                  });
              }
              if (s.str.length > 1) {
                var h = s.str.charAt(0),
                  m = s.str.charAt(1),
                  v;
                m in s.node.edges
                  ? (v = s.node.edges[m])
                  : ((v = new t.TokenSet()), (s.node.edges[m] = v)),
                  s.str.length == 1 && (v.final = !0),
                  i.push({
                    node: v,
                    editsRemaining: s.editsRemaining - 1,
                    str: h + s.str.slice(2),
                  });
              }
            }
          }
          return r;
        }),
        (t.TokenSet.fromString = function (e) {
          for (
            var n = new t.TokenSet(), r = n, i = 0, s = e.length;
            i < s;
            i++
          ) {
            var o = e[i],
              a = i == s - 1;
            if (o == '*') (n.edges[o] = n), (n.final = a);
            else {
              var u = new t.TokenSet();
              (u.final = a), (n.edges[o] = u), (n = u);
            }
          }
          return r;
        }),
        (t.TokenSet.prototype.toArray = function () {
          for (var e = [], n = [{prefix: '', node: this}]; n.length; ) {
            var r = n.pop(),
              i = Object.keys(r.node.edges),
              s = i.length;
            r.node.final && (r.prefix.charAt(0), e.push(r.prefix));
            for (var o = 0; o < s; o++) {
              var a = i[o];
              n.push({prefix: r.prefix.concat(a), node: r.node.edges[a]});
            }
          }
          return e;
        }),
        (t.TokenSet.prototype.toString = function () {
          if (this._str) return this._str;
          for (
            var e = this.final ? '1' : '0',
              n = Object.keys(this.edges).sort(),
              r = n.length,
              i = 0;
            i < r;
            i++
          ) {
            var s = n[i],
              o = this.edges[s];
            e = e + s + o.id;
          }
          return e;
        }),
        (t.TokenSet.prototype.intersect = function (e) {
          for (
            var n = new t.TokenSet(),
              r = void 0,
              i = [{qNode: e, output: n, node: this}];
            i.length;

          ) {
            r = i.pop();
            for (
              var s = Object.keys(r.qNode.edges),
                o = s.length,
                a = Object.keys(r.node.edges),
                u = a.length,
                l = 0;
              l < o;
              l++
            )
              for (var h = s[l], m = 0; m < u; m++) {
                var v = a[m];
                if (v == h || h == '*') {
                  var b = r.node.edges[v],
                    y = r.qNode.edges[h],
                    E = b.final && y.final,
                    f = void 0;
                  v in r.output.edges
                    ? ((f = r.output.edges[v]), (f.final = f.final || E))
                    : ((f = new t.TokenSet()),
                      (f.final = E),
                      (r.output.edges[v] = f)),
                    i.push({qNode: y, output: f, node: b});
                }
              }
          }
          return n;
        }),
        (t.TokenSet.Builder = function () {
          (this.previousWord = ''),
            (this.root = new t.TokenSet()),
            (this.uncheckedNodes = []),
            (this.minimizedNodes = {});
        }),
        (t.TokenSet.Builder.prototype.insert = function (e) {
          var n,
            r = 0;
          if (e < this.previousWord)
            throw new Error('Out of order word insertion');
          for (
            var i = 0;
            i < e.length &&
            i < this.previousWord.length &&
            e[i] == this.previousWord[i];
            i++
          )
            r++;
          this.minimize(r),
            this.uncheckedNodes.length == 0
              ? (n = this.root)
              : (n = this.uncheckedNodes[this.uncheckedNodes.length - 1].child);
          for (var i = r; i < e.length; i++) {
            var s = new t.TokenSet(),
              o = e[i];
            (n.edges[o] = s),
              this.uncheckedNodes.push({parent: n, char: o, child: s}),
              (n = s);
          }
          (n.final = !0), (this.previousWord = e);
        }),
        (t.TokenSet.Builder.prototype.finish = function () {
          this.minimize(0);
        }),
        (t.TokenSet.Builder.prototype.minimize = function (e) {
          for (var n = this.uncheckedNodes.length - 1; n >= e; n--) {
            var r = this.uncheckedNodes[n],
              i = r.child.toString();
            i in this.minimizedNodes
              ? (r.parent.edges[r.char] = this.minimizedNodes[i])
              : ((r.child._str = i), (this.minimizedNodes[i] = r.child)),
              this.uncheckedNodes.pop();
          }
        });
      (t.Index = function (e) {
        (this.invertedIndex = e.invertedIndex),
          (this.fieldVectors = e.fieldVectors),
          (this.tokenSet = e.tokenSet),
          (this.fields = e.fields),
          (this.pipeline = e.pipeline);
      }),
        (t.Index.prototype.search = function (e) {
          return this.query(function (n) {
            var r = new t.QueryParser(e, n);
            r.parse();
          });
        }),
        (t.Index.prototype.query = function (e) {
          for (
            var n = new t.Query(this.fields),
              r = Object.create(null),
              i = Object.create(null),
              s = Object.create(null),
              o = Object.create(null),
              a = Object.create(null),
              u = 0;
            u < this.fields.length;
            u++
          )
            i[this.fields[u]] = new t.Vector();
          e.call(n, n);
          for (var u = 0; u < n.clauses.length; u++) {
            var l = n.clauses[u],
              h = null,
              m = t.Set.empty;
            l.usePipeline
              ? (h = this.pipeline.runString(l.term, {fields: l.fields}))
              : (h = [l.term]);
            for (var v = 0; v < h.length; v++) {
              var b = h[v];
              l.term = b;
              var y = t.TokenSet.fromClause(l),
                E = this.tokenSet.intersect(y).toArray();
              if (E.length === 0 && l.presence === t.Query.presence.REQUIRED) {
                for (var f = 0; f < l.fields.length; f++) {
                  var p = l.fields[f];
                  o[p] = t.Set.empty;
                }
                break;
              }
              for (var w = 0; w < E.length; w++)
                for (
                  var S = E[w], I = this.invertedIndex[S], _ = I._index, f = 0;
                  f < l.fields.length;
                  f++
                ) {
                  var p = l.fields[f],
                    z = I[p],
                    A = Object.keys(z),
                    q = S + '/' + p,
                    $ = new t.Set(A);
                  if (
                    (l.presence == t.Query.presence.REQUIRED &&
                      ((m = m.union($)),
                      o[p] === void 0 && (o[p] = t.Set.complete)),
                    l.presence == t.Query.presence.PROHIBITED)
                  ) {
                    a[p] === void 0 && (a[p] = t.Set.empty),
                      (a[p] = a[p].union($));
                    continue;
                  }
                  if (
                    (i[p].upsert(_, l.boost, function (ke, Ie) {
                      return ke + Ie;
                    }),
                    !s[q])
                  ) {
                    for (var V = 0; V < A.length; V++) {
                      var W = A[V],
                        P = new t.FieldRef(W, p),
                        U = z[W],
                        G;
                      (G = r[P]) === void 0
                        ? (r[P] = new t.MatchData(S, p, U))
                        : G.add(S, p, U);
                    }
                    s[q] = !0;
                  }
                }
            }
            if (l.presence === t.Query.presence.REQUIRED)
              for (var f = 0; f < l.fields.length; f++) {
                var p = l.fields[f];
                o[p] = o[p].intersect(m);
              }
          }
          for (
            var N = t.Set.complete, M = t.Set.empty, u = 0;
            u < this.fields.length;
            u++
          ) {
            var p = this.fields[u];
            o[p] && (N = N.intersect(o[p])), a[p] && (M = M.union(a[p]));
          }
          var c = Object.keys(r),
            g = [],
            C = Object.create(null);
          if (n.isNegated()) {
            c = Object.keys(this.fieldVectors);
            for (var u = 0; u < c.length; u++) {
              var P = c[u],
                T = t.FieldRef.fromString(P);
              r[P] = new t.MatchData();
            }
          }
          for (var u = 0; u < c.length; u++) {
            var T = t.FieldRef.fromString(c[u]),
              d = T.docRef;
            if (!!N.contains(d) && !M.contains(d)) {
              var x = this.fieldVectors[T],
                O = i[T.fieldName].similarity(x),
                D;
              if ((D = C[d]) !== void 0)
                (D.score += O), D.matchData.combine(r[T]);
              else {
                var L = {ref: d, score: O, matchData: r[T]};
                (C[d] = L), g.push(L);
              }
            }
          }
          return g.sort(function (we, Te) {
            return Te.score - we.score;
          });
        }),
        (t.Index.prototype.toJSON = function () {
          var e = Object.keys(this.invertedIndex)
              .sort()
              .map(function (r) {
                return [r, this.invertedIndex[r]];
              }, this),
            n = Object.keys(this.fieldVectors).map(function (r) {
              return [r, this.fieldVectors[r].toJSON()];
            }, this);
          return {
            version: t.version,
            fields: this.fields,
            fieldVectors: n,
            invertedIndex: e,
            pipeline: this.pipeline.toJSON(),
          };
        }),
        (t.Index.load = function (e) {
          var n = {},
            r = {},
            i = e.fieldVectors,
            s = Object.create(null),
            o = e.invertedIndex,
            a = new t.TokenSet.Builder(),
            u = t.Pipeline.load(e.pipeline);
          e.version != t.version &&
            t.warn(
              "Version mismatch when loading serialised index. Current version of lunr '" +
                t.version +
                "' does not match serialized index '" +
                e.version +
                "'"
            );
          for (var l = 0; l < i.length; l++) {
            var h = i[l],
              m = h[0],
              v = h[1];
            r[m] = new t.Vector(v);
          }
          for (var l = 0; l < o.length; l++) {
            var h = o[l],
              b = h[0],
              y = h[1];
            a.insert(b), (s[b] = y);
          }
          return (
            a.finish(),
            (n.fields = e.fields),
            (n.fieldVectors = r),
            (n.invertedIndex = s),
            (n.tokenSet = a.root),
            (n.pipeline = u),
            new t.Index(n)
          );
        });
      (t.Builder = function () {
        (this._ref = 'id'),
          (this._fields = Object.create(null)),
          (this._documents = Object.create(null)),
          (this.invertedIndex = Object.create(null)),
          (this.fieldTermFrequencies = {}),
          (this.fieldLengths = {}),
          (this.tokenizer = t.tokenizer),
          (this.pipeline = new t.Pipeline()),
          (this.searchPipeline = new t.Pipeline()),
          (this.documentCount = 0),
          (this._b = 0.75),
          (this._k1 = 1.2),
          (this.termIndex = 0),
          (this.metadataWhitelist = []);
      }),
        (t.Builder.prototype.ref = function (e) {
          this._ref = e;
        }),
        (t.Builder.prototype.field = function (e, n) {
          if (/\//.test(e))
            throw new RangeError(
              "Field '" + e + "' contains illegal character '/'"
            );
          this._fields[e] = n || {};
        }),
        (t.Builder.prototype.b = function (e) {
          e < 0 ? (this._b = 0) : e > 1 ? (this._b = 1) : (this._b = e);
        }),
        (t.Builder.prototype.k1 = function (e) {
          this._k1 = e;
        }),
        (t.Builder.prototype.add = function (e, n) {
          var r = e[this._ref],
            i = Object.keys(this._fields);
          (this._documents[r] = n || {}), (this.documentCount += 1);
          for (var s = 0; s < i.length; s++) {
            var o = i[s],
              a = this._fields[o].extractor,
              u = a ? a(e) : e[o],
              l = this.tokenizer(u, {fields: [o]}),
              h = this.pipeline.run(l),
              m = new t.FieldRef(r, o),
              v = Object.create(null);
            (this.fieldTermFrequencies[m] = v),
              (this.fieldLengths[m] = 0),
              (this.fieldLengths[m] += h.length);
            for (var b = 0; b < h.length; b++) {
              var y = h[b];
              if (
                (v[y] == null && (v[y] = 0),
                (v[y] += 1),
                this.invertedIndex[y] == null)
              ) {
                var E = Object.create(null);
                (E._index = this.termIndex), (this.termIndex += 1);
                for (var f = 0; f < i.length; f++)
                  E[i[f]] = Object.create(null);
                this.invertedIndex[y] = E;
              }
              this.invertedIndex[y][o][r] == null &&
                (this.invertedIndex[y][o][r] = Object.create(null));
              for (var p = 0; p < this.metadataWhitelist.length; p++) {
                var w = this.metadataWhitelist[p],
                  S = y.metadata[w];
                this.invertedIndex[y][o][r][w] == null &&
                  (this.invertedIndex[y][o][r][w] = []),
                  this.invertedIndex[y][o][r][w].push(S);
              }
            }
          }
        }),
        (t.Builder.prototype.calculateAverageFieldLengths = function () {
          for (
            var e = Object.keys(this.fieldLengths),
              n = e.length,
              r = {},
              i = {},
              s = 0;
            s < n;
            s++
          ) {
            var o = t.FieldRef.fromString(e[s]),
              a = o.fieldName;
            i[a] || (i[a] = 0),
              (i[a] += 1),
              r[a] || (r[a] = 0),
              (r[a] += this.fieldLengths[o]);
          }
          for (var u = Object.keys(this._fields), s = 0; s < u.length; s++) {
            var l = u[s];
            r[l] = r[l] / i[l];
          }
          this.averageFieldLength = r;
        }),
        (t.Builder.prototype.createFieldVectors = function () {
          for (
            var e = {},
              n = Object.keys(this.fieldTermFrequencies),
              r = n.length,
              i = Object.create(null),
              s = 0;
            s < r;
            s++
          ) {
            for (
              var o = t.FieldRef.fromString(n[s]),
                a = o.fieldName,
                u = this.fieldLengths[o],
                l = new t.Vector(),
                h = this.fieldTermFrequencies[o],
                m = Object.keys(h),
                v = m.length,
                b = this._fields[a].boost || 1,
                y = this._documents[o.docRef].boost || 1,
                E = 0;
              E < v;
              E++
            ) {
              var f = m[E],
                p = h[f],
                w = this.invertedIndex[f]._index,
                S,
                I,
                _;
              i[f] === void 0
                ? ((S = t.idf(this.invertedIndex[f], this.documentCount)),
                  (i[f] = S))
                : (S = i[f]),
                (I =
                  (S * ((this._k1 + 1) * p)) /
                  (this._k1 *
                    (1 - this._b + this._b * (u / this.averageFieldLength[a])) +
                    p)),
                (I *= b),
                (I *= y),
                (_ = Math.round(I * 1e3) / 1e3),
                l.insert(w, _);
            }
            e[o] = l;
          }
          this.fieldVectors = e;
        }),
        (t.Builder.prototype.createTokenSet = function () {
          this.tokenSet = t.TokenSet.fromArray(
            Object.keys(this.invertedIndex).sort()
          );
        }),
        (t.Builder.prototype.build = function () {
          return (
            this.calculateAverageFieldLengths(),
            this.createFieldVectors(),
            this.createTokenSet(),
            new t.Index({
              invertedIndex: this.invertedIndex,
              fieldVectors: this.fieldVectors,
              tokenSet: this.tokenSet,
              fields: Object.keys(this._fields),
              pipeline: this.searchPipeline,
            })
          );
        }),
        (t.Builder.prototype.use = function (e) {
          var n = Array.prototype.slice.call(arguments, 1);
          n.unshift(this), e.apply(this, n);
        }),
        (t.MatchData = function (e, n, r) {
          for (
            var i = Object.create(null), s = Object.keys(r || {}), o = 0;
            o < s.length;
            o++
          ) {
            var a = s[o];
            i[a] = r[a].slice();
          }
          (this.metadata = Object.create(null)),
            e !== void 0 &&
              ((this.metadata[e] = Object.create(null)),
              (this.metadata[e][n] = i));
        }),
        (t.MatchData.prototype.combine = function (e) {
          for (var n = Object.keys(e.metadata), r = 0; r < n.length; r++) {
            var i = n[r],
              s = Object.keys(e.metadata[i]);
            this.metadata[i] == null &&
              (this.metadata[i] = Object.create(null));
            for (var o = 0; o < s.length; o++) {
              var a = s[o],
                u = Object.keys(e.metadata[i][a]);
              this.metadata[i][a] == null &&
                (this.metadata[i][a] = Object.create(null));
              for (var l = 0; l < u.length; l++) {
                var h = u[l];
                this.metadata[i][a][h] == null
                  ? (this.metadata[i][a][h] = e.metadata[i][a][h])
                  : (this.metadata[i][a][h] = this.metadata[i][a][h].concat(
                      e.metadata[i][a][h]
                    ));
              }
            }
          }
        }),
        (t.MatchData.prototype.add = function (e, n, r) {
          if (!(e in this.metadata)) {
            (this.metadata[e] = Object.create(null)), (this.metadata[e][n] = r);
            return;
          }
          if (!(n in this.metadata[e])) {
            this.metadata[e][n] = r;
            return;
          }
          for (var i = Object.keys(r), s = 0; s < i.length; s++) {
            var o = i[s];
            o in this.metadata[e][n]
              ? (this.metadata[e][n][o] = this.metadata[e][n][o].concat(r[o]))
              : (this.metadata[e][n][o] = r[o]);
          }
        }),
        (t.Query = function (e) {
          (this.clauses = []), (this.allFields = e);
        }),
        (t.Query.wildcard = new String('*')),
        (t.Query.wildcard.NONE = 0),
        (t.Query.wildcard.LEADING = 1),
        (t.Query.wildcard.TRAILING = 2),
        (t.Query.presence = {OPTIONAL: 1, REQUIRED: 2, PROHIBITED: 3}),
        (t.Query.prototype.clause = function (e) {
          return (
            'fields' in e || (e.fields = this.allFields),
            'boost' in e || (e.boost = 1),
            'usePipeline' in e || (e.usePipeline = !0),
            'wildcard' in e || (e.wildcard = t.Query.wildcard.NONE),
            e.wildcard & t.Query.wildcard.LEADING &&
              e.term.charAt(0) != t.Query.wildcard &&
              (e.term = '*' + e.term),
            e.wildcard & t.Query.wildcard.TRAILING &&
              e.term.slice(-1) != t.Query.wildcard &&
              (e.term = '' + e.term + '*'),
            'presence' in e || (e.presence = t.Query.presence.OPTIONAL),
            this.clauses.push(e),
            this
          );
        }),
        (t.Query.prototype.isNegated = function () {
          for (var e = 0; e < this.clauses.length; e++)
            if (this.clauses[e].presence != t.Query.presence.PROHIBITED)
              return !1;
          return !0;
        }),
        (t.Query.prototype.term = function (e, n) {
          if (Array.isArray(e))
            return (
              e.forEach(function (i) {
                this.term(i, t.clone(n));
              }, this),
              this
            );
          var r = n || {};
          return (r.term = e.toString()), this.clause(r), this;
        }),
        (t.QueryParseError = function (e, n, r) {
          (this.name = 'QueryParseError'),
            (this.message = e),
            (this.start = n),
            (this.end = r);
        }),
        (t.QueryParseError.prototype = new Error()),
        (t.QueryLexer = function (e) {
          (this.lexemes = []),
            (this.str = e),
            (this.length = e.length),
            (this.pos = 0),
            (this.start = 0),
            (this.escapeCharPositions = []);
        }),
        (t.QueryLexer.prototype.run = function () {
          for (var e = t.QueryLexer.lexText; e; ) e = e(this);
        }),
        (t.QueryLexer.prototype.sliceString = function () {
          for (
            var e = [], n = this.start, r = this.pos, i = 0;
            i < this.escapeCharPositions.length;
            i++
          )
            (r = this.escapeCharPositions[i]),
              e.push(this.str.slice(n, r)),
              (n = r + 1);
          return (
            e.push(this.str.slice(n, this.pos)),
            (this.escapeCharPositions.length = 0),
            e.join('')
          );
        }),
        (t.QueryLexer.prototype.emit = function (e) {
          this.lexemes.push({
            type: e,
            str: this.sliceString(),
            start: this.start,
            end: this.pos,
          }),
            (this.start = this.pos);
        }),
        (t.QueryLexer.prototype.escapeCharacter = function () {
          this.escapeCharPositions.push(this.pos - 1), (this.pos += 1);
        }),
        (t.QueryLexer.prototype.next = function () {
          if (this.pos >= this.length) return t.QueryLexer.EOS;
          var e = this.str.charAt(this.pos);
          return (this.pos += 1), e;
        }),
        (t.QueryLexer.prototype.width = function () {
          return this.pos - this.start;
        }),
        (t.QueryLexer.prototype.ignore = function () {
          this.start == this.pos && (this.pos += 1), (this.start = this.pos);
        }),
        (t.QueryLexer.prototype.backup = function () {
          this.pos -= 1;
        }),
        (t.QueryLexer.prototype.acceptDigitRun = function () {
          var e, n;
          do (e = this.next()), (n = e.charCodeAt(0));
          while (n > 47 && n < 58);
          e != t.QueryLexer.EOS && this.backup();
        }),
        (t.QueryLexer.prototype.more = function () {
          return this.pos < this.length;
        }),
        (t.QueryLexer.EOS = 'EOS'),
        (t.QueryLexer.FIELD = 'FIELD'),
        (t.QueryLexer.TERM = 'TERM'),
        (t.QueryLexer.EDIT_DISTANCE = 'EDIT_DISTANCE'),
        (t.QueryLexer.BOOST = 'BOOST'),
        (t.QueryLexer.PRESENCE = 'PRESENCE'),
        (t.QueryLexer.lexField = function (e) {
          return (
            e.backup(),
            e.emit(t.QueryLexer.FIELD),
            e.ignore(),
            t.QueryLexer.lexText
          );
        }),
        (t.QueryLexer.lexTerm = function (e) {
          if (
            (e.width() > 1 && (e.backup(), e.emit(t.QueryLexer.TERM)),
            e.ignore(),
            e.more())
          )
            return t.QueryLexer.lexText;
        }),
        (t.QueryLexer.lexEditDistance = function (e) {
          return (
            e.ignore(),
            e.acceptDigitRun(),
            e.emit(t.QueryLexer.EDIT_DISTANCE),
            t.QueryLexer.lexText
          );
        }),
        (t.QueryLexer.lexBoost = function (e) {
          return (
            e.ignore(),
            e.acceptDigitRun(),
            e.emit(t.QueryLexer.BOOST),
            t.QueryLexer.lexText
          );
        }),
        (t.QueryLexer.lexEOS = function (e) {
          e.width() > 0 && e.emit(t.QueryLexer.TERM);
        }),
        (t.QueryLexer.termSeparator = t.tokenizer.separator),
        (t.QueryLexer.lexText = function (e) {
          for (;;) {
            var n = e.next();
            if (n == t.QueryLexer.EOS) return t.QueryLexer.lexEOS;
            if (n.charCodeAt(0) == 92) {
              e.escapeCharacter();
              continue;
            }
            if (n == ':') return t.QueryLexer.lexField;
            if (n == '~')
              return (
                e.backup(),
                e.width() > 0 && e.emit(t.QueryLexer.TERM),
                t.QueryLexer.lexEditDistance
              );
            if (n == '^')
              return (
                e.backup(),
                e.width() > 0 && e.emit(t.QueryLexer.TERM),
                t.QueryLexer.lexBoost
              );
            if ((n == '+' && e.width() === 1) || (n == '-' && e.width() === 1))
              return e.emit(t.QueryLexer.PRESENCE), t.QueryLexer.lexText;
            if (n.match(t.QueryLexer.termSeparator))
              return t.QueryLexer.lexTerm;
          }
        }),
        (t.QueryParser = function (e, n) {
          (this.lexer = new t.QueryLexer(e)),
            (this.query = n),
            (this.currentClause = {}),
            (this.lexemeIdx = 0);
        }),
        (t.QueryParser.prototype.parse = function () {
          this.lexer.run(), (this.lexemes = this.lexer.lexemes);
          for (var e = t.QueryParser.parseClause; e; ) e = e(this);
          return this.query;
        }),
        (t.QueryParser.prototype.peekLexeme = function () {
          return this.lexemes[this.lexemeIdx];
        }),
        (t.QueryParser.prototype.consumeLexeme = function () {
          var e = this.peekLexeme();
          return (this.lexemeIdx += 1), e;
        }),
        (t.QueryParser.prototype.nextClause = function () {
          var e = this.currentClause;
          this.query.clause(e), (this.currentClause = {});
        }),
        (t.QueryParser.parseClause = function (e) {
          var n = e.peekLexeme();
          if (n != null)
            switch (n.type) {
              case t.QueryLexer.PRESENCE:
                return t.QueryParser.parsePresence;
              case t.QueryLexer.FIELD:
                return t.QueryParser.parseField;
              case t.QueryLexer.TERM:
                return t.QueryParser.parseTerm;
              default:
                var r = 'expected either a field or a term, found ' + n.type;
                throw (
                  (n.str.length >= 1 && (r += " with value '" + n.str + "'"),
                  new t.QueryParseError(r, n.start, n.end))
                );
            }
        }),
        (t.QueryParser.parsePresence = function (e) {
          var n = e.consumeLexeme();
          if (n != null) {
            switch (n.str) {
              case '-':
                e.currentClause.presence = t.Query.presence.PROHIBITED;
                break;
              case '+':
                e.currentClause.presence = t.Query.presence.REQUIRED;
                break;
              default:
                var r = "unrecognised presence operator'" + n.str + "'";
                throw new t.QueryParseError(r, n.start, n.end);
            }
            var i = e.peekLexeme();
            if (i == null) {
              var r = 'expecting term or field, found nothing';
              throw new t.QueryParseError(r, n.start, n.end);
            }
            switch (i.type) {
              case t.QueryLexer.FIELD:
                return t.QueryParser.parseField;
              case t.QueryLexer.TERM:
                return t.QueryParser.parseTerm;
              default:
                var r = "expecting term or field, found '" + i.type + "'";
                throw new t.QueryParseError(r, i.start, i.end);
            }
          }
        }),
        (t.QueryParser.parseField = function (e) {
          var n = e.consumeLexeme();
          if (n != null) {
            if (e.query.allFields.indexOf(n.str) == -1) {
              var r = e.query.allFields
                  .map(function (o) {
                    return "'" + o + "'";
                  })
                  .join(', '),
                i = "unrecognised field '" + n.str + "', possible fields: " + r;
              throw new t.QueryParseError(i, n.start, n.end);
            }
            e.currentClause.fields = [n.str];
            var s = e.peekLexeme();
            if (s == null) {
              var i = 'expecting term, found nothing';
              throw new t.QueryParseError(i, n.start, n.end);
            }
            switch (s.type) {
              case t.QueryLexer.TERM:
                return t.QueryParser.parseTerm;
              default:
                var i = "expecting term, found '" + s.type + "'";
                throw new t.QueryParseError(i, s.start, s.end);
            }
          }
        }),
        (t.QueryParser.parseTerm = function (e) {
          var n = e.consumeLexeme();
          if (n != null) {
            (e.currentClause.term = n.str.toLowerCase()),
              n.str.indexOf('*') != -1 && (e.currentClause.usePipeline = !1);
            var r = e.peekLexeme();
            if (r == null) {
              e.nextClause();
              return;
            }
            switch (r.type) {
              case t.QueryLexer.TERM:
                return e.nextClause(), t.QueryParser.parseTerm;
              case t.QueryLexer.FIELD:
                return e.nextClause(), t.QueryParser.parseField;
              case t.QueryLexer.EDIT_DISTANCE:
                return t.QueryParser.parseEditDistance;
              case t.QueryLexer.BOOST:
                return t.QueryParser.parseBoost;
              case t.QueryLexer.PRESENCE:
                return e.nextClause(), t.QueryParser.parsePresence;
              default:
                var i = "Unexpected lexeme type '" + r.type + "'";
                throw new t.QueryParseError(i, r.start, r.end);
            }
          }
        }),
        (t.QueryParser.parseEditDistance = function (e) {
          var n = e.consumeLexeme();
          if (n != null) {
            var r = parseInt(n.str, 10);
            if (isNaN(r)) {
              var i = 'edit distance must be numeric';
              throw new t.QueryParseError(i, n.start, n.end);
            }
            e.currentClause.editDistance = r;
            var s = e.peekLexeme();
            if (s == null) {
              e.nextClause();
              return;
            }
            switch (s.type) {
              case t.QueryLexer.TERM:
                return e.nextClause(), t.QueryParser.parseTerm;
              case t.QueryLexer.FIELD:
                return e.nextClause(), t.QueryParser.parseField;
              case t.QueryLexer.EDIT_DISTANCE:
                return t.QueryParser.parseEditDistance;
              case t.QueryLexer.BOOST:
                return t.QueryParser.parseBoost;
              case t.QueryLexer.PRESENCE:
                return e.nextClause(), t.QueryParser.parsePresence;
              default:
                var i = "Unexpected lexeme type '" + s.type + "'";
                throw new t.QueryParseError(i, s.start, s.end);
            }
          }
        }),
        (t.QueryParser.parseBoost = function (e) {
          var n = e.consumeLexeme();
          if (n != null) {
            var r = parseInt(n.str, 10);
            if (isNaN(r)) {
              var i = 'boost must be numeric';
              throw new t.QueryParseError(i, n.start, n.end);
            }
            e.currentClause.boost = r;
            var s = e.peekLexeme();
            if (s == null) {
              e.nextClause();
              return;
            }
            switch (s.type) {
              case t.QueryLexer.TERM:
                return e.nextClause(), t.QueryParser.parseTerm;
              case t.QueryLexer.FIELD:
                return e.nextClause(), t.QueryParser.parseField;
              case t.QueryLexer.EDIT_DISTANCE:
                return t.QueryParser.parseEditDistance;
              case t.QueryLexer.BOOST:
                return t.QueryParser.parseBoost;
              case t.QueryLexer.PRESENCE:
                return e.nextClause(), t.QueryParser.parsePresence;
              default:
                var i = "Unexpected lexeme type '" + s.type + "'";
                throw new t.QueryParseError(i, s.start, s.end);
            }
          }
        }),
        (function (e, n) {
          typeof define == 'function' && define.amd
            ? define(n)
            : typeof ce == 'object'
            ? (he.exports = n())
            : (e.lunr = n());
        })(this, function () {
          return t;
        });
    })();
  });
  var le = [];
  function j(t, e) {
    le.push({selector: e, constructor: t});
  }
  var Y = class {
    constructor() {
      this.createComponents(document.body);
    }
    createComponents(e) {
      le.forEach((n) => {
        e.querySelectorAll(n.selector).forEach((r) => {
          r.dataset.hasInstance ||
            (new n.constructor({el: r}), (r.dataset.hasInstance = String(!0)));
        });
      });
    }
  };
  var k = class {
    constructor(e) {
      this.el = e.el;
    }
  };
  var J = class {
    constructor() {
      this.listeners = {};
    }
    addEventListener(e, n) {
      e in this.listeners || (this.listeners[e] = []),
        this.listeners[e].push(n);
    }
    removeEventListener(e, n) {
      if (!(e in this.listeners)) return;
      let r = this.listeners[e];
      for (let i = 0, s = r.length; i < s; i++)
        if (r[i] === n) {
          r.splice(i, 1);
          return;
        }
    }
    dispatchEvent(e) {
      if (!(e.type in this.listeners)) return !0;
      let n = this.listeners[e.type].slice();
      for (let r = 0, i = n.length; r < i; r++) n[r].call(this, e);
      return !e.defaultPrevented;
    }
  };
  var ne = (t, e = 100) => {
    let n = Date.now();
    return (...r) => {
      n + e - Date.now() < 0 && (t(...r), (n = Date.now()));
    };
  };
  var re = class extends J {
      constructor() {
        super();
        this.scrollTop = 0;
        this.lastY = 0;
        this.width = 0;
        this.height = 0;
        this.showToolbar = !0;
        (this.toolbar = document.querySelector('.tsd-page-toolbar')),
          (this.navigation = document.querySelector('.col-menu')),
          window.addEventListener(
            'scroll',
            ne(() => this.onScroll(), 10)
          ),
          window.addEventListener(
            'resize',
            ne(() => this.onResize(), 10)
          ),
          (this.searchInput = document.querySelector('#tsd-search input')),
          this.searchInput &&
            this.searchInput.addEventListener('focus', () => {
              this.hideShowToolbar();
            }),
          this.onResize(),
          this.onScroll();
      }
      triggerResize() {
        let n = new CustomEvent('resize', {
          detail: {width: this.width, height: this.height},
        });
        this.dispatchEvent(n);
      }
      onResize() {
        (this.width = window.innerWidth || 0),
          (this.height = window.innerHeight || 0);
        let n = new CustomEvent('resize', {
          detail: {width: this.width, height: this.height},
        });
        this.dispatchEvent(n);
      }
      onScroll() {
        this.scrollTop = window.scrollY || 0;
        let n = new CustomEvent('scroll', {
          detail: {scrollTop: this.scrollTop},
        });
        this.dispatchEvent(n), this.hideShowToolbar();
      }
      hideShowToolbar() {
        let n = this.showToolbar;
        (this.showToolbar =
          this.lastY >= this.scrollTop ||
          this.scrollTop <= 0 ||
          (!!this.searchInput && this.searchInput === document.activeElement)),
          n !== this.showToolbar &&
            (this.toolbar.classList.toggle('tsd-page-toolbar--hide'),
            this.navigation?.classList.toggle('col-menu--hide')),
          (this.lastY = this.scrollTop);
      }
    },
    R = re;
  R.instance = new re();
  var X = class extends k {
    constructor(n) {
      super(n);
      this.anchors = [];
      this.index = -1;
      R.instance.addEventListener('resize', () => this.onResize()),
        R.instance.addEventListener('scroll', (r) => this.onScroll(r)),
        this.createAnchors();
    }
    createAnchors() {
      let n = window.location.href;
      n.indexOf('#') != -1 && (n = n.substring(0, n.indexOf('#'))),
        this.el.querySelectorAll('a').forEach((r) => {
          let i = r.href;
          if (i.indexOf('#') == -1 || i.substring(0, n.length) != n) return;
          let s = i.substring(i.indexOf('#') + 1),
            o = document.querySelector('a.tsd-anchor[name=' + s + ']'),
            a = r.parentNode;
          !o || !a || this.anchors.push({link: a, anchor: o, position: 0});
        }),
        this.onResize();
    }
    onResize() {
      let n;
      for (let i = 0, s = this.anchors.length; i < s; i++) {
        n = this.anchors[i];
        let o = n.anchor.getBoundingClientRect();
        n.position = o.top + document.body.scrollTop;
      }
      this.anchors.sort((i, s) => i.position - s.position);
      let r = new CustomEvent('scroll', {
        detail: {scrollTop: R.instance.scrollTop},
      });
      this.onScroll(r);
    }
    onScroll(n) {
      let r = n.detail.scrollTop + 5,
        i = this.anchors,
        s = i.length - 1,
        o = this.index;
      for (; o > -1 && i[o].position > r; ) o -= 1;
      for (; o < s && i[o + 1].position < r; ) o += 1;
      this.index != o &&
        (this.index > -1 &&
          this.anchors[this.index].link.classList.remove('focus'),
        (this.index = o),
        this.index > -1 &&
          this.anchors[this.index].link.classList.add('focus'));
    }
  };
  var ue = (t, e = 100) => {
    let n;
    return (...r) => {
      clearTimeout(n), (n = setTimeout(() => t(r), e));
    };
  };
  var me = De(de());
  function ve() {
    let t = document.getElementById('tsd-search');
    if (!t) return;
    let e = document.getElementById('search-script');
    t.classList.add('loading'),
      e &&
        (e.addEventListener('error', () => {
          t.classList.remove('loading'), t.classList.add('failure');
        }),
        e.addEventListener('load', () => {
          t.classList.remove('loading'), t.classList.add('ready');
        }),
        window.searchData && t.classList.remove('loading'));
    let n = document.querySelector('#tsd-search input'),
      r = document.querySelector('#tsd-search .results');
    if (!n || !r)
      throw new Error(
        'The input field or the result list wrapper was not found'
      );
    let i = !1;
    r.addEventListener('mousedown', () => (i = !0)),
      r.addEventListener('mouseup', () => {
        (i = !1), t.classList.remove('has-focus');
      }),
      n.addEventListener('focus', () => t.classList.add('has-focus')),
      n.addEventListener('blur', () => {
        i || ((i = !1), t.classList.remove('has-focus'));
      });
    let s = {base: t.dataset.base + '/'};
    Fe(t, r, n, s);
  }
  function Fe(t, e, n, r) {
    n.addEventListener(
      'input',
      ue(() => {
        Ae(t, e, n, r);
      }, 200)
    );
    let i = !1;
    n.addEventListener('keydown', (s) => {
      (i = !0),
        s.key == 'Enter'
          ? Ve(e, n)
          : s.key == 'Escape'
          ? n.blur()
          : s.key == 'ArrowUp'
          ? fe(e, -1)
          : s.key === 'ArrowDown'
          ? fe(e, 1)
          : (i = !1);
    }),
      n.addEventListener('keypress', (s) => {
        i && s.preventDefault();
      }),
      document.body.addEventListener('keydown', (s) => {
        s.altKey ||
          s.ctrlKey ||
          s.metaKey ||
          (!n.matches(':focus') &&
            s.key === '/' &&
            (n.focus(), s.preventDefault()));
      });
  }
  function He(t, e) {
    t.index ||
      (window.searchData &&
        (e.classList.remove('loading'),
        e.classList.add('ready'),
        (t.data = window.searchData),
        (t.index = me.Index.load(window.searchData.index))));
  }
  function Ae(t, e, n, r) {
    if ((He(r, t), !r.index || !r.data)) return;
    e.textContent = '';
    let i = n.value.trim(),
      s = i ? r.index.search(`*${i}*`) : [];
    for (let o = 0; o < s.length; o++) {
      let a = s[o],
        u = r.data.rows[Number(a.ref)],
        l = 1;
      u.name.toLowerCase().startsWith(i.toLowerCase()) &&
        (l *= 1 + 1 / (1 + Math.abs(u.name.length - i.length))),
        (a.score *= l);
    }
    s.sort((o, a) => a.score - o.score);
    for (let o = 0, a = Math.min(10, s.length); o < a; o++) {
      let u = r.data.rows[Number(s[o].ref)],
        l = pe(u.name, i);
      globalThis.DEBUG_SEARCH_WEIGHTS &&
        (l += ` (score: ${s[o].score.toFixed(2)})`),
        u.parent && (l = `<span class="parent">${pe(u.parent, i)}.</span>${l}`);
      let h = document.createElement('li');
      h.classList.value = u.classes ?? '';
      let m = document.createElement('a');
      (m.href = r.base + u.url),
        (m.innerHTML = l),
        h.append(m),
        e.appendChild(h);
    }
  }
  function fe(t, e) {
    let n = t.querySelector('.current');
    if (!n)
      (n = t.querySelector(e == 1 ? 'li:first-child' : 'li:last-child')),
        n && n.classList.add('current');
    else {
      let r = n;
      if (e === 1)
        do r = r.nextElementSibling ?? void 0;
        while (r instanceof HTMLElement && r.offsetParent == null);
      else
        do r = r.previousElementSibling ?? void 0;
        while (r instanceof HTMLElement && r.offsetParent == null);
      r && (n.classList.remove('current'), r.classList.add('current'));
    }
  }
  function Ve(t, e) {
    let n = t.querySelector('.current');
    if ((n || (n = t.querySelector('li:first-child')), n)) {
      let r = n.querySelector('a');
      r && (window.location.href = r.href), e.blur();
    }
  }
  function pe(t, e) {
    if (e === '') return t;
    let n = t.toLocaleLowerCase(),
      r = e.toLocaleLowerCase(),
      i = [],
      s = 0,
      o = n.indexOf(r);
    for (; o != -1; )
      i.push(
        ie(t.substring(s, o)),
        `<b>${ie(t.substring(o, o + r.length))}</b>`
      ),
        (s = o + r.length),
        (o = n.indexOf(r, s));
    return i.push(ie(t.substring(s))), i.join('');
  }
  var Ne = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#039;',
    '"': '&quot;',
  };
  function ie(t) {
    return t.replace(/[&<>"'"]/g, (e) => Ne[e]);
  }
  var F = 'mousedown',
    ye = 'mousemove',
    B = 'mouseup',
    Z = {x: 0, y: 0},
    ge = !1,
    se = !1,
    je = !1,
    H = !1,
    xe = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  document.documentElement.classList.add(xe ? 'is-mobile' : 'not-mobile');
  xe &&
    'ontouchstart' in document.documentElement &&
    ((je = !0), (F = 'touchstart'), (ye = 'touchmove'), (B = 'touchend'));
  document.addEventListener(F, (t) => {
    (se = !0), (H = !1);
    let e = F == 'touchstart' ? t.targetTouches[0] : t;
    (Z.y = e.pageY || 0), (Z.x = e.pageX || 0);
  });
  document.addEventListener(ye, (t) => {
    if (!!se && !H) {
      let e = F == 'touchstart' ? t.targetTouches[0] : t,
        n = Z.x - (e.pageX || 0),
        r = Z.y - (e.pageY || 0);
      H = Math.sqrt(n * n + r * r) > 10;
    }
  });
  document.addEventListener(B, () => {
    se = !1;
  });
  document.addEventListener('click', (t) => {
    ge && (t.preventDefault(), t.stopImmediatePropagation(), (ge = !1));
  });
  var K = class extends k {
    constructor(n) {
      super(n);
      (this.className = this.el.dataset.toggle || ''),
        this.el.addEventListener(B, (r) => this.onPointerUp(r)),
        this.el.addEventListener('click', (r) => r.preventDefault()),
        document.addEventListener(F, (r) => this.onDocumentPointerDown(r)),
        document.addEventListener(B, (r) => this.onDocumentPointerUp(r));
    }
    setActive(n) {
      if (this.active == n) return;
      (this.active = n),
        document.documentElement.classList.toggle('has-' + this.className, n),
        this.el.classList.toggle('active', n);
      let r = (this.active ? 'to-has-' : 'from-has-') + this.className;
      document.documentElement.classList.add(r),
        setTimeout(() => document.documentElement.classList.remove(r), 500);
    }
    onPointerUp(n) {
      H || (this.setActive(!0), n.preventDefault());
    }
    onDocumentPointerDown(n) {
      if (this.active) {
        if (n.target.closest('.col-menu, .tsd-filter-group')) return;
        this.setActive(!1);
      }
    }
    onDocumentPointerUp(n) {
      if (!H && this.active && n.target.closest('.col-menu')) {
        let r = n.target.closest('a');
        if (r) {
          let i = window.location.href;
          i.indexOf('#') != -1 && (i = i.substring(0, i.indexOf('#'))),
            r.href.substring(0, i.length) == i &&
              setTimeout(() => this.setActive(!1), 250);
        }
      }
    }
  };
  var oe;
  try {
    oe = localStorage;
  } catch {
    oe = {
      getItem() {
        return null;
      },
      setItem() {},
    };
  }
  var Q = oe;
  var Le = document.head.appendChild(document.createElement('style'));
  Le.dataset.for = 'filters';
  var ee = class extends k {
    constructor(n) {
      super(n);
      (this.key = `filter-${this.el.name}`),
        (this.value = this.el.checked),
        this.el.addEventListener('change', () => {
          this.setLocalStorage(this.el.checked);
        }),
        this.setLocalStorage(this.fromLocalStorage()),
        (Le.innerHTML += `html:not(.${this.key}) .tsd-is-${this.el.name} { display: none; }
`);
    }
    fromLocalStorage() {
      let n = Q.getItem(this.key);
      return n ? n === 'true' : this.el.checked;
    }
    setLocalStorage(n) {
      Q.setItem(this.key, n.toString()),
        (this.value = n),
        this.handleValueChange();
    }
    handleValueChange() {
      (this.el.checked = this.value),
        document.documentElement.classList.toggle(this.key, this.value),
        document.querySelectorAll('.tsd-index-section').forEach((n) => {
          n.style.display = 'block';
          let r = Array.from(n.querySelectorAll('.tsd-index-link')).every(
            (i) => i.offsetParent == null
          );
          n.style.display = r ? 'none' : 'block';
        });
    }
  };
  var te = class extends k {
    constructor(n) {
      super(n);
      this.calculateHeights(),
        (this.summary = this.el.querySelector('.tsd-accordion-summary')),
        (this.icon = this.summary.querySelector('svg')),
        (this.key = `tsd-accordion-${this.summary.textContent
          .replace(/\s+/g, '-')
          .toLowerCase()}`),
        this.setLocalStorage(this.fromLocalStorage(), !0),
        this.summary.addEventListener('click', (r) => this.toggleVisibility(r)),
        (this.icon.style.transform = this.getIconRotation());
    }
    getIconRotation(n = this.el.open) {
      return `rotate(${n ? 0 : -90}deg)`;
    }
    calculateHeights() {
      let n = this.el.open,
        {position: r, left: i} = this.el.style;
      (this.el.style.position = 'fixed'),
        (this.el.style.left = '-9999px'),
        (this.el.open = !0),
        (this.expandedHeight = this.el.offsetHeight + 'px'),
        (this.el.open = !1),
        (this.collapsedHeight = this.el.offsetHeight + 'px'),
        (this.el.open = n),
        (this.el.style.height = n ? this.expandedHeight : this.collapsedHeight),
        (this.el.style.position = r),
        (this.el.style.left = i);
    }
    toggleVisibility(n) {
      n.preventDefault(),
        (this.el.style.overflow = 'hidden'),
        this.el.open ? this.collapse() : this.expand();
    }
    expand(n = !0) {
      (this.el.open = !0),
        this.animate(this.collapsedHeight, this.expandedHeight, {
          opening: !0,
          duration: n ? 300 : 0,
        });
    }
    collapse(n = !0) {
      this.animate(this.expandedHeight, this.collapsedHeight, {
        opening: !1,
        duration: n ? 300 : 0,
      });
    }
    animate(n, r, {opening: i, duration: s = 300}) {
      if (this.animation) return;
      let o = {duration: s, easing: 'ease'};
      (this.animation = this.el.animate({height: [n, r]}, o)),
        this.icon
          .animate(
            {
              transform: [
                this.icon.style.transform || this.getIconRotation(!i),
                this.getIconRotation(i),
              ],
            },
            o
          )
          .addEventListener('finish', () => {
            this.icon.style.transform = this.getIconRotation(i);
          }),
        this.animation.addEventListener('finish', () => this.animationEnd(i));
    }
    animationEnd(n) {
      (this.el.open = n),
        (this.animation = void 0),
        (this.el.style.height = 'auto'),
        (this.el.style.overflow = 'visible'),
        this.setLocalStorage(n);
    }
    fromLocalStorage() {
      let n = Q.getItem(this.key);
      return n ? n === 'true' : this.el.open;
    }
    setLocalStorage(n, r = !1) {
      (this.fromLocalStorage() === n && !r) ||
        (Q.setItem(this.key, n.toString()),
        (this.el.open = n),
        this.handleValueChange(r));
    }
    handleValueChange(n = !1) {
      (this.fromLocalStorage() === this.el.open && !n) ||
        (this.fromLocalStorage() ? this.expand(!1) : this.collapse(!1));
    }
  };
  function be(t) {
    let e = Q.getItem('tsd-theme') || 'os';
    (t.value = e),
      Ee(e),
      t.addEventListener('change', () => {
        Q.setItem('tsd-theme', t.value), Ee(t.value);
      });
  }
  function Ee(t) {
    document.documentElement.dataset.theme = t;
  }
  ve();
  j(X, '.menu-highlight');
  j(K, 'a[data-toggle]');
  j(te, '.tsd-index-accordion');
  j(ee, '.tsd-filter-item input[type=checkbox]');
  var Se = document.getElementById('theme');
  Se && be(Se);
  var Be = new Y();
  Object.defineProperty(window, 'app', {value: Be});
})();
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
