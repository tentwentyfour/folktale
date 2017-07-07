'use strict';

var __metamagical_withMeta = function metamagical_withMeta(object, meta) {
  var parent = Object.getPrototypeOf(object);var oldMeta = object[Symbol.for('@@meta:magical')] || {};if (parent && parent[Symbol.for('@@meta:magical')] === oldMeta) {
    oldMeta = {};
  }Object.keys(meta).forEach(function (key) {
    if (/^~/.test(key)) {
      oldMeta[key.slice(1)] = meta[key];
    } else {
      oldMeta[key] = meta[key];
    }
  });object[Symbol.for('@@meta:magical')] = oldMeta;return object;
},
    _equals,
    _concat,
    _empty,
    _map,
    _apply,
    _of,
    _reduce,
    _traverse,
    _chain,
    _chainRecursively,
    _extend,
    _extract,
    _bimap,
    _promap;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


var aliases = {
  equals: (_equals = {
    'fantasy-land/equals': function fantasyLandEquals(that) {
      return this.equals(that);
    }
  }, __metamagical_withMeta(_equals['fantasy-land/equals'], {
    'name': 'fantasy-land/equals',
    'source': '\'fantasy-land/equals\'(that) {\n      return this.equals(that);\n    }',
    'signature': 'fantasy-land/equals(that)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 12,
        'column': 10
      },
      'end': {
        'line': 22,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': '(\'S \'a).(\'S \'a) => Boolean\nwhere \'S is Setoid\n   \n'
  }), _equals),

  concat: (_concat = {
    'fantasy-land/concat': function fantasyLandConcat(that) {
      return this.concat(that);
    }
  }, __metamagical_withMeta(_concat['fantasy-land/concat'], {
    'name': 'fantasy-land/concat',
    'source': '\'fantasy-land/concat\'(that) {\n      return this.concat(that);\n    }',
    'signature': 'fantasy-land/concat(that)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 24,
        'column': 10
      },
      'end': {
        'line': 34,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': '(\'S \'a).(\'S \'a) => \'S \'a\nwhere \'S is Semigroup\n   \n'
  }), _concat),

  empty: (_empty = {
    'fantasy-land/empty': function fantasyLandEmpty() {
      return this.empty();
    }
  }, __metamagical_withMeta(_empty['fantasy-land/empty'], {
    'name': 'fantasy-land/empty',
    'source': '\'fantasy-land/empty\'() {\n      return this.empty();\n    }',
    'signature': 'fantasy-land/empty()',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 36,
        'column': 9
      },
      'end': {
        'line': 46,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': '(\'M).() => \'M a\nwhere \'M is Monoid\n   \n'
  }), _empty),

  map: (_map = {
    'fantasy-land/map': function fantasyLandMap(transformation) {
      return this.map(transformation);
    }
  }, __metamagical_withMeta(_map['fantasy-land/map'], {
    'name': 'fantasy-land/map',
    'source': '\'fantasy-land/map\'(transformation) {\n      return this.map(transformation);\n    }',
    'signature': 'fantasy-land/map(transformation)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 48,
        'column': 7
      },
      'end': {
        'line': 58,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': '(\'F \'a).((\'a) => \'b) => \'F \'b\nwhere \'F is Functor\n   \n'
  }), _map),

  apply: (_apply = {
    ap: function ap(that) {
      return this.apply(that);
    },
    'fantasy-land/ap': function fantasyLandAp(that) {
      return that.apply(this);
    }
  }, __metamagical_withMeta(_apply['ap'], {
    'name': 'ap',
    'source': 'ap(that) {\n      return this.apply(that);\n    }',
    'signature': 'ap(that)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 60,
        'column': 9
      },
      'end': {
        'line': 80,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': '(\'F (\'a) => b).(\'F \'a) => \'F \'b\nwhere \'F is Apply\n   \n'
  }), __metamagical_withMeta(_apply['fantasy-land/ap'], {
    'name': 'fantasy-land/ap',
    'source': '\'fantasy-land/ap\'(that) {\n      return that.apply(this);\n    }',
    'signature': 'fantasy-land/ap(that)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 60,
        'column': 9
      },
      'end': {
        'line': 80,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': '(\'F \'a).(\'F (\'a) => \'b) => \'F \'b\nwhere \'F is Apply\n   \n'
  }), _apply),

  of: (_of = {
    'fantasy-land/of': function fantasyLandOf(value) {
      return this.of(value);
    }
  }, __metamagical_withMeta(_of['fantasy-land/of'], {
    'name': 'fantasy-land/of',
    'source': '\'fantasy-land/of\'(value) {\n      return this.of(value);\n    }',
    'signature': 'fantasy-land/of(value)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 82,
        'column': 6
      },
      'end': {
        'line': 93,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall F, a:\n  (F).(a) => F a\nwhere F is Applicative \n   \n'
  }), _of),

  reduce: (_reduce = {
    'fantasy-land/reduce': function fantasyLandReduce(combinator, initial) {
      return this.reduce(combinator, initial);
    }
  }, __metamagical_withMeta(_reduce['fantasy-land/reduce'], {
    'name': 'fantasy-land/reduce',
    'source': '\'fantasy-land/reduce\'(combinator, initial) {\n      return this.reduce(combinator, initial);\n    }',
    'signature': 'fantasy-land/reduce(combinator, initial)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 95,
        'column': 10
      },
      'end': {
        'line': 106,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall F, a, b:\n  (F a).((b, a) => b, b) => b\nwhere F is Foldable  \n   \n'
  }), _reduce),

  traverse: (_traverse = {
    'fantasy-land/traverse': function fantasyLandTraverse(transformation, lift) {
      return this.traverse(transformation, lift);
    }
  }, __metamagical_withMeta(_traverse['fantasy-land/traverse'], {
    'name': 'fantasy-land/traverse',
    'source': '\'fantasy-land/traverse\'(transformation, lift) {\n      return this.traverse(transformation, lift);\n    }',
    'signature': 'fantasy-land/traverse(transformation, lift)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 108,
        'column': 12
      },
      'end': {
        'line': 119,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall F, T, a, b:\n  (T a).((a) => F b, (c) => F c) => F (T b)\nwhere F is Apply, T is Traversable\n   \n'
  }), _traverse),

  chain: (_chain = {
    'fantasy-land/chain': function fantasyLandChain(transformation) {
      return this.chain(transformation);
    }
  }, __metamagical_withMeta(_chain['fantasy-land/chain'], {
    'name': 'fantasy-land/chain',
    'source': '\'fantasy-land/chain\'(transformation) {\n      return this.chain(transformation);\n    }',
    'signature': 'fantasy-land/chain(transformation)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 121,
        'column': 9
      },
      'end': {
        'line': 132,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall M, a, b:\n  (M a).((a) => M b) => M b\nwhere M is Chain\n   \n'
  }), _chain),

  chainRecursively: (_chainRecursively = {
    chainRec: function chainRec(step, initial) {
      return this.chainRecursively(step, initial);
    },
    'fantasy-land/chainRec': function fantasyLandChainRec(step, initial) {
      return this.chainRecursively(step, initial);
    }
  }, __metamagical_withMeta(_chainRecursively['chainRec'], {
    'name': 'chainRec',
    'source': 'chainRec(step, initial) {\n      return this.chainRecursively(step, initial);\n    }',
    'signature': 'chainRec(step, initial)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 134,
        'column': 20
      },
      'end': {
        'line': 162,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall M, a, b, c:\n  (M).(\n    Step:    ((a) => c, (b) => c, a) => M c,\n    Initial: a\n  ) => M b\nwhere M is ChainRec \n   \n'
  }), __metamagical_withMeta(_chainRecursively['fantasy-land/chainRec'], {
    'name': 'fantasy-land/chainRec',
    'source': '\'fantasy-land/chainRec\'(step, initial) {\n      return this.chainRecursively(step, initial);\n    }',
    'signature': 'fantasy-land/chainRec(step, initial)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 134,
        'column': 20
      },
      'end': {
        'line': 162,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall M, a, b, c:\n  (M).(\n    Step:    ((a) => c, (b) => c, a) => M c,\n    Initial: a\n  ) => M b\nwhere M is ChainRec \n   \n'
  }), _chainRecursively),

  extend: (_extend = {
    'fantasy-land/extend': function fantasyLandExtend(transformation) {
      return this.extend(transformation);
    }
  }, __metamagical_withMeta(_extend['fantasy-land/extend'], {
    'name': 'fantasy-land/extend',
    'source': '\'fantasy-land/extend\'(transformation) {\n      return this.extend(transformation);\n    }',
    'signature': 'fantasy-land/extend(transformation)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 164,
        'column': 10
      },
      'end': {
        'line': 175,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall W, a, b:\n  (W a).((W a) => b) => W b\nwhere W is Extend\n   \n'
  }), _extend),

  extract: (_extract = {
    'fantasy-land/extract': function fantasyLandExtract() {
      return this.extract();
    }
  }, __metamagical_withMeta(_extract['fantasy-land/extract'], {
    'name': 'fantasy-land/extract',
    'source': '\'fantasy-land/extract\'() {\n      return this.extract();\n    }',
    'signature': 'fantasy-land/extract()',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 177,
        'column': 11
      },
      'end': {
        'line': 188,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall W, a, b:\n  (W a).() => a\nwhere W is Comonad\n   \n'
  }), _extract),

  bimap: (_bimap = {
    'fantasy-land/bimap': function fantasyLandBimap(f, g) {
      return this.bimap(f, g);
    }
  }, __metamagical_withMeta(_bimap['fantasy-land/bimap'], {
    'name': 'fantasy-land/bimap',
    'source': '\'fantasy-land/bimap\'(f, g) {\n      return this.bimap(f, g);\n    }',
    'signature': 'fantasy-land/bimap(f, g)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 190,
        'column': 9
      },
      'end': {
        'line': 201,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall F, a, b, c, d:\n  (F a b).((a) => c, (b) => d) => F c d\nwhere F is Bifunctor\n   \n'
  }), _bimap),

  promap: (_promap = {
    'fantasy-land/promap': function fantasyLandPromap(f, g) {
      return this.promap(f, g);
    }
  }, __metamagical_withMeta(_promap['fantasy-land/promap'], {
    'name': 'fantasy-land/promap',
    'source': '\'fantasy-land/promap\'(f, g) {\n      return this.promap(f, g);\n    }',
    'signature': 'fantasy-land/promap(f, g)',
    'location': {
      'filename': 'source/helpers/provide-fantasy-land-aliases.js',
      'start': {
        'line': 203,
        'column': 10
      },
      'end': {
        'line': 213,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'forall P, a, b, c, d:\n  (P a b).((c) => a, (b) => d) => P c d\n   \n'
  }), _promap)
};

var provideAliases = function provideAliases(structure) {
  Object.keys(aliases).forEach(function (method) {
    if (typeof structure[method] === 'function') {
      Object.keys(aliases[method]).forEach(function (alias) {
        structure[alias] = aliases[method][alias];
      });
    }
  });
};

module.exports = provideAliases;