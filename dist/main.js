(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/crypto-js/core.js
  var require_core = __commonJS({
    "node_modules/crypto-js/core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define([], factory);
        } else {
          root.CryptoJS = factory();
        }
      })(exports, function() {
        var CryptoJS2 = CryptoJS2 || function(Math2, undefined2) {
          var crypto;
          if (typeof window !== "undefined" && window.crypto) {
            crypto = window.crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto = globalThis.crypto;
          }
          if (!crypto && typeof window !== "undefined" && window.msCrypto) {
            crypto = window.msCrypto;
          }
          if (!crypto && typeof global !== "undefined" && global.crypto) {
            crypto = global.crypto;
          }
          if (!crypto && typeof __require === "function") {
            try {
              crypto = require_crypto();
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if (typeof crypto.getRandomValues === "function") {
                try {
                  return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto.randomBytes === "function") {
                try {
                  return crypto.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = function() {
            return {
              /**
               * Creates a new object that inherits from this object.
               *
               * @param {Object} overrides Properties to copy into the new object.
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         field: 'value',
               *
               *         method: function () {
               *         }
               *     });
               */
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              /**
               * Extends this object and runs the init method.
               * Arguments to create() will be passed to init().
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var instance = MyType.create();
               */
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              /**
               * Initializes a newly created object.
               * Override this method to add some logic when your objects are created.
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         init: function () {
               *             // ...
               *         }
               *     });
               */
              init: function() {
              },
              /**
               * Copies properties into this object.
               *
               * @param {Object} properties The properties to mix in.
               *
               * @example
               *
               *     MyType.mixIn({
               *         field: 'value'
               *     });
               */
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              /**
               * Creates a copy of this object.
               *
               * @return {Object} The clone.
               *
               * @example
               *
               *     var clone = instance.clone();
               */
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),
            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS2;
      });
    }
  });

  // node_modules/crypto-js/x64-core.js
  var require_x64_core = __commonJS({
    "node_modules/crypto-js/x64-core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(undefined2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C.x64 = {};
          var X64Word = C_x64.Word = Base.extend({
            /**
             * Initializes a newly created 64-bit word.
             *
             * @param {number} high The high 32 bits.
             * @param {number} low The low 32 bits.
             *
             * @example
             *
             *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
             */
            init: function(high, low) {
              this.high = high;
              this.low = low;
            }
            /**
             * Bitwise NOTs this word.
             *
             * @return {X64Word} A new x64-Word object after negating.
             *
             * @example
             *
             *     var negated = x64Word.not();
             */
            // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ANDs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to AND with this word.
             *
             * @return {X64Word} A new x64-Word object after ANDing.
             *
             * @example
             *
             *     var anded = x64Word.and(anotherX64Word);
             */
            // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to OR with this word.
             *
             * @return {X64Word} A new x64-Word object after ORing.
             *
             * @example
             *
             *     var ored = x64Word.or(anotherX64Word);
             */
            // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise XORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to XOR with this word.
             *
             * @return {X64Word} A new x64-Word object after XORing.
             *
             * @example
             *
             *     var xored = x64Word.xor(anotherX64Word);
             */
            // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the left.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftL(25);
             */
            // shiftL: function (n) {
            // if (n < 32) {
            // var high = (this.high << n) | (this.low >>> (32 - n));
            // var low = this.low << n;
            // } else {
            // var high = this.low << (n - 32);
            // var low = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the right.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftR(7);
             */
            // shiftR: function (n) {
            // if (n < 32) {
            // var low = (this.low >>> n) | (this.high << (32 - n));
            // var high = this.high >>> n;
            // } else {
            // var low = this.high >>> (n - 32);
            // var high = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Rotates this word n bits to the left.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotL(25);
             */
            // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
            // },
            /**
             * Rotates this word n bits to the right.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotR(7);
             */
            // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
            // },
            /**
             * Adds this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to add with this word.
             *
             * @return {X64Word} A new x64-Word object after adding.
             *
             * @example
             *
             *     var added = x64Word.add(anotherX64Word);
             */
            // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;
            // return X64Word.create(high, low);
            // }
          });
          var X64WordArray = C_x64.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.x64.WordArray.create();
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ]);
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ], 10);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            /**
             * Converts this 64-bit word array to a 32-bit word array.
             *
             * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
             *
             * @example
             *
             *     var x32WordArray = x64WordArray.toX32();
             */
            toX32: function() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {X64WordArray} The clone.
             *
             * @example
             *
             *     var clone = x64WordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              var words = clone.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
              }
              return clone;
            }
          });
        })();
        return CryptoJS2;
      });
    }
  });

  // node_modules/crypto-js/lib-typedarrays.js
  var require_lib_typedarrays = __commonJS({
    "node_modules/crypto-js/lib-typedarrays.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          if (typeof ArrayBuffer != "function") {
            return;
          }
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var superInit = WordArray.init;
          var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
              typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
              typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
              var typedArrayByteLength = typedArray.byteLength;
              var words = [];
              for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
              }
              superInit.call(this, words, typedArrayByteLength);
            } else {
              superInit.apply(this, arguments);
            }
          };
          subInit.prototype = WordArray;
        })();
        return CryptoJS2.lib.WordArray;
      });
    }
  });

  // node_modules/crypto-js/enc-utf16.js
  var require_enc_utf16 = __commonJS({
    "node_modules/crypto-js/enc-utf16.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
            /**
             * Converts a word array to a UTF-16 BE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 BE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 BE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 BE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          C_enc.Utf16LE = {
            /**
             * Converts a word array to a UTF-16 LE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 LE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 LE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 LE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
          }
        })();
        return CryptoJS2.enc.Utf16;
      });
    }
  });

  // node_modules/crypto-js/enc-base64.js
  var require_enc_base64 = __commonJS({
    "node_modules/crypto-js/enc-base64.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Base64 = C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS2.enc.Base64;
      });
    }
  });

  // node_modules/crypto-js/enc-base64url.js
  var require_enc_base64url = __commonJS({
    "node_modules/crypto-js/enc-base64url.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Base64url = C_enc.Base64url = {
            /**
             * Converts a word array to a Base64url string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {string} The Base64url string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
             */
            stringify: function(wordArray, urlSafe) {
              if (urlSafe === void 0) {
                urlSafe = true;
              }
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = urlSafe ? this._safe_map : this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64url string to a word array.
             *
             * @param {string} base64Str The Base64url string.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
             */
            parse: function(base64Str, urlSafe) {
              if (urlSafe === void 0) {
                urlSafe = true;
              }
              var base64StrLength = base64Str.length;
              var map = urlSafe ? this._safe_map : this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS2.enc.Base64url;
      });
    }
  });

  // node_modules/crypto-js/md5.js
  var require_md5 = __commonJS({
    "node_modules/crypto-js/md5.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var T = [];
          (function() {
            for (var i = 0; i < 64; i++) {
              T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var M_offset_0 = M[offset + 0];
              var M_offset_1 = M[offset + 1];
              var M_offset_2 = M[offset + 2];
              var M_offset_3 = M[offset + 3];
              var M_offset_4 = M[offset + 4];
              var M_offset_5 = M[offset + 5];
              var M_offset_6 = M[offset + 6];
              var M_offset_7 = M[offset + 7];
              var M_offset_8 = M[offset + 8];
              var M_offset_9 = M[offset + 9];
              var M_offset_10 = M[offset + 10];
              var M_offset_11 = M[offset + 11];
              var M_offset_12 = M[offset + 12];
              var M_offset_13 = M[offset + 13];
              var M_offset_14 = M[offset + 14];
              var M_offset_15 = M[offset + 15];
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              a = FF(a, b, c, d, M_offset_0, 7, T[0]);
              d = FF(d, a, b, c, M_offset_1, 12, T[1]);
              c = FF(c, d, a, b, M_offset_2, 17, T[2]);
              b = FF(b, c, d, a, M_offset_3, 22, T[3]);
              a = FF(a, b, c, d, M_offset_4, 7, T[4]);
              d = FF(d, a, b, c, M_offset_5, 12, T[5]);
              c = FF(c, d, a, b, M_offset_6, 17, T[6]);
              b = FF(b, c, d, a, M_offset_7, 22, T[7]);
              a = FF(a, b, c, d, M_offset_8, 7, T[8]);
              d = FF(d, a, b, c, M_offset_9, 12, T[9]);
              c = FF(c, d, a, b, M_offset_10, 17, T[10]);
              b = FF(b, c, d, a, M_offset_11, 22, T[11]);
              a = FF(a, b, c, d, M_offset_12, 7, T[12]);
              d = FF(d, a, b, c, M_offset_13, 12, T[13]);
              c = FF(c, d, a, b, M_offset_14, 17, T[14]);
              b = FF(b, c, d, a, M_offset_15, 22, T[15]);
              a = GG(a, b, c, d, M_offset_1, 5, T[16]);
              d = GG(d, a, b, c, M_offset_6, 9, T[17]);
              c = GG(c, d, a, b, M_offset_11, 14, T[18]);
              b = GG(b, c, d, a, M_offset_0, 20, T[19]);
              a = GG(a, b, c, d, M_offset_5, 5, T[20]);
              d = GG(d, a, b, c, M_offset_10, 9, T[21]);
              c = GG(c, d, a, b, M_offset_15, 14, T[22]);
              b = GG(b, c, d, a, M_offset_4, 20, T[23]);
              a = GG(a, b, c, d, M_offset_9, 5, T[24]);
              d = GG(d, a, b, c, M_offset_14, 9, T[25]);
              c = GG(c, d, a, b, M_offset_3, 14, T[26]);
              b = GG(b, c, d, a, M_offset_8, 20, T[27]);
              a = GG(a, b, c, d, M_offset_13, 5, T[28]);
              d = GG(d, a, b, c, M_offset_2, 9, T[29]);
              c = GG(c, d, a, b, M_offset_7, 14, T[30]);
              b = GG(b, c, d, a, M_offset_12, 20, T[31]);
              a = HH(a, b, c, d, M_offset_5, 4, T[32]);
              d = HH(d, a, b, c, M_offset_8, 11, T[33]);
              c = HH(c, d, a, b, M_offset_11, 16, T[34]);
              b = HH(b, c, d, a, M_offset_14, 23, T[35]);
              a = HH(a, b, c, d, M_offset_1, 4, T[36]);
              d = HH(d, a, b, c, M_offset_4, 11, T[37]);
              c = HH(c, d, a, b, M_offset_7, 16, T[38]);
              b = HH(b, c, d, a, M_offset_10, 23, T[39]);
              a = HH(a, b, c, d, M_offset_13, 4, T[40]);
              d = HH(d, a, b, c, M_offset_0, 11, T[41]);
              c = HH(c, d, a, b, M_offset_3, 16, T[42]);
              b = HH(b, c, d, a, M_offset_6, 23, T[43]);
              a = HH(a, b, c, d, M_offset_9, 4, T[44]);
              d = HH(d, a, b, c, M_offset_12, 11, T[45]);
              c = HH(c, d, a, b, M_offset_15, 16, T[46]);
              b = HH(b, c, d, a, M_offset_2, 23, T[47]);
              a = II(a, b, c, d, M_offset_0, 6, T[48]);
              d = II(d, a, b, c, M_offset_7, 10, T[49]);
              c = II(c, d, a, b, M_offset_14, 15, T[50]);
              b = II(b, c, d, a, M_offset_5, 21, T[51]);
              a = II(a, b, c, d, M_offset_12, 6, T[52]);
              d = II(d, a, b, c, M_offset_3, 10, T[53]);
              c = II(c, d, a, b, M_offset_10, 15, T[54]);
              b = II(b, c, d, a, M_offset_1, 21, T[55]);
              a = II(a, b, c, d, M_offset_8, 6, T[56]);
              d = II(d, a, b, c, M_offset_15, 10, T[57]);
              c = II(c, d, a, b, M_offset_6, 15, T[58]);
              b = II(b, c, d, a, M_offset_13, 21, T[59]);
              a = II(a, b, c, d, M_offset_4, 6, T[60]);
              d = II(d, a, b, c, M_offset_11, 10, T[61]);
              c = II(c, d, a, b, M_offset_2, 15, T[62]);
              b = II(b, c, d, a, M_offset_9, 21, T[63]);
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          C.MD5 = Hasher._createHelper(MD5);
          C.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS2.MD5;
      });
    }
  });

  // node_modules/crypto-js/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/crypto-js/sha1.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i = 0; i < 80; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                  W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                  t += (b & c | ~b & d) + 1518500249;
                } else if (i < 40) {
                  t += (b ^ c ^ d) + 1859775393;
                } else if (i < 60) {
                  t += (b & c | b & d | c & d) - 1894007588;
                } else {
                  t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS2.SHA1;
      });
    }
  });

  // node_modules/crypto-js/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/crypto-js/sha256.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H = [];
          var K = [];
          (function() {
            function isPrime(n2) {
              var sqrtN = Math2.sqrt(n2);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n2 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n2) {
              return (n2 - (n2 | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                nPrime++;
              }
              n++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e = H2[4];
              var f = H2[5];
              var g = H2[6];
              var h2 = H2[7];
              for (var i = 0; i < 64; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e & f ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h2 + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h2 = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e | 0;
              H2[5] = H2[5] + f | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h2 | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS2.SHA256;
      });
    }
  });

  // node_modules/crypto-js/sha224.js
  var require_sha224 = __commonJS({
    "node_modules/crypto-js/sha224.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha256"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function() {
              var hash = SHA256._doFinalize.call(this);
              hash.sigBytes -= 4;
              return hash;
            }
          });
          C.SHA224 = SHA256._createHelper(SHA224);
          C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS2.SHA224;
      });
    }
  });

  // node_modules/crypto-js/sha512.js
  var require_sha512 = __commonJS({
    "node_modules/crypto-js/sha512.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W = [];
          (function() {
            for (var i = 0; i < 80; i++) {
              W[i] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var H0 = H[0];
              var H1 = H[1];
              var H2 = H[2];
              var H3 = H[3];
              var H4 = H[4];
              var H5 = H[5];
              var H6 = H[6];
              var H7 = H[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H2.high;
              var H2l = H2.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i = 0; i < 80; i++) {
                var Wil;
                var Wih;
                var Wi = W[i];
                if (i < 16) {
                  Wih = Wi.high = M[offset + i * 2] | 0;
                  Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W[i - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W[i - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W[i - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  Wil = gamma0l + Wi7l;
                  Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  Wil = Wil + gamma1l;
                  Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  Wil = Wil + Wi16l;
                  Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H2.low = H2l + cl;
              H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash = this._hash.toX32();
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            },
            blockSize: 1024 / 32
          });
          C.SHA512 = Hasher._createHelper(SHA512);
          C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS2.SHA512;
      });
    }
  });

  // node_modules/crypto-js/sha384.js
  var require_sha384 = __commonJS({
    "node_modules/crypto-js/sha384.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_sha512());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core", "./sha512"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function() {
              var hash = SHA512._doFinalize.call(this);
              hash.sigBytes -= 16;
              return hash;
            }
          });
          C.SHA384 = SHA512._createHelper(SHA384);
          C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS2.SHA384;
      });
    }
  });

  // node_modules/crypto-js/sha3.js
  var require_sha3 = __commonJS({
    "node_modules/crypto-js/sha3.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var C_algo = C.algo;
          var RHO_OFFSETS = [];
          var PI_INDEXES = [];
          var ROUND_CONSTANTS = [];
          (function() {
            var x = 1, y = 0;
            for (var t = 0; t < 24; t++) {
              RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
              var newX = y % 5;
              var newY = (2 * x + 3 * y) % 5;
              x = newX;
              y = newY;
            }
            for (var x = 0; x < 5; x++) {
              for (var y = 0; y < 5; y++) {
                PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
              }
            }
            var LFSR = 1;
            for (var i = 0; i < 24; i++) {
              var roundConstantMsw = 0;
              var roundConstantLsw = 0;
              for (var j = 0; j < 7; j++) {
                if (LFSR & 1) {
                  var bitPosition = (1 << j) - 1;
                  if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                  } else {
                    roundConstantMsw ^= 1 << bitPosition - 32;
                  }
                }
                if (LFSR & 128) {
                  LFSR = LFSR << 1 ^ 113;
                } else {
                  LFSR <<= 1;
                }
              }
              ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
          })();
          var T = [];
          (function() {
            for (var i = 0; i < 25; i++) {
              T[i] = X64Word.create();
            }
          })();
          var SHA3 = C_algo.SHA3 = Hasher.extend({
            /**
             * Configuration options.
             *
             * @property {number} outputLength
             *   The desired number of bits in the output hash.
             *   Only values permitted are: 224, 256, 384, 512.
             *   Default: 512
             */
            cfg: Hasher.cfg.extend({
              outputLength: 512
            }),
            _doReset: function() {
              var state = this._state = [];
              for (var i = 0; i < 25; i++) {
                state[i] = new X64Word.init();
              }
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M, offset) {
              var state = this._state;
              var nBlockSizeLanes = this.blockSize / 2;
              for (var i = 0; i < nBlockSizeLanes; i++) {
                var M2i = M[offset + 2 * i];
                var M2i1 = M[offset + 2 * i + 1];
                M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                var lane = state[i];
                lane.high ^= M2i1;
                lane.low ^= M2i;
              }
              for (var round = 0; round < 24; round++) {
                for (var x = 0; x < 5; x++) {
                  var tMsw = 0, tLsw = 0;
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                  }
                  var Tx = T[x];
                  Tx.high = tMsw;
                  Tx.low = tLsw;
                }
                for (var x = 0; x < 5; x++) {
                  var Tx4 = T[(x + 4) % 5];
                  var Tx1 = T[(x + 1) % 5];
                  var Tx1Msw = Tx1.high;
                  var Tx1Lsw = Tx1.low;
                  var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                  var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                  }
                }
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                  var tMsw;
                  var tLsw;
                  var lane = state[laneIndex];
                  var laneMsw = lane.high;
                  var laneLsw = lane.low;
                  var rhoOffset = RHO_OFFSETS[laneIndex];
                  if (rhoOffset < 32) {
                    tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                    tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                  } else {
                    tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                    tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                  }
                  var TPiLane = T[PI_INDEXES[laneIndex]];
                  TPiLane.high = tMsw;
                  TPiLane.low = tLsw;
                }
                var T0 = T[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;
                for (var x = 0; x < 5; x++) {
                  for (var y = 0; y < 5; y++) {
                    var laneIndex = x + 5 * y;
                    var lane = state[laneIndex];
                    var TLane = T[laneIndex];
                    var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                    var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                  }
                }
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
              }
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              var blockSizeBits = this.blockSize * 32;
              dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
              dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var state = this._state;
              var outputLengthBytes = this.cfg.outputLength / 8;
              var outputLengthLanes = outputLengthBytes / 8;
              var hashWords = [];
              for (var i = 0; i < outputLengthLanes; i++) {
                var lane = state[i];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
              }
              return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              var state = clone._state = this._state.slice(0);
              for (var i = 0; i < 25; i++) {
                state[i] = state[i].clone();
              }
              return clone;
            }
          });
          C.SHA3 = Hasher._createHelper(SHA3);
          C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
        })(Math);
        return CryptoJS2.SHA3;
      });
    }
  });

  // node_modules/crypto-js/ripemd160.js
  var require_ripemd160 = __commonJS({
    "node_modules/crypto-js/ripemd160.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
              this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H[0];
              br = bl = H[1];
              cr = cl = H[2];
              dr = dl = H[3];
              er = el = H[4];
              var t;
              for (var i = 0; i < 80; i += 1) {
                t = al + M[offset + zl[i]] | 0;
                if (i < 16) {
                  t += f1(bl, cl, dl) + hl[0];
                } else if (i < 32) {
                  t += f2(bl, cl, dl) + hl[1];
                } else if (i < 48) {
                  t += f3(bl, cl, dl) + hl[2];
                } else if (i < 64) {
                  t += f4(bl, cl, dl) + hl[3];
                } else {
                  t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl(t, sl[i]);
                t = t + el | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t;
                t = ar + M[offset + zr[i]] | 0;
                if (i < 16) {
                  t += f5(br, cr, dr) + hr[0];
                } else if (i < 32) {
                  t += f4(br, cr, dr) + hr[1];
                } else if (i < 48) {
                  t += f3(br, cr, dr) + hr[2];
                } else if (i < 64) {
                  t += f2(br, cr, dr) + hr[3];
                } else {
                  t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl(t, sr[i]);
                t = t + er | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t;
              }
              t = H[1] + cl + dr | 0;
              H[1] = H[2] + dl + er | 0;
              H[2] = H[3] + el + ar | 0;
              H[3] = H[4] + al + br | 0;
              H[4] = H[0] + bl + cr | 0;
              H[0] = t;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 5; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function f1(x, y, z) {
            return x ^ y ^ z;
          }
          function f2(x, y, z) {
            return x & y | ~x & z;
          }
          function f3(x, y, z) {
            return (x | ~y) ^ z;
          }
          function f4(x, y, z) {
            return x & z | y & ~z;
          }
          function f5(x, y, z) {
            return x ^ (y | ~z);
          }
          function rotl(x, n) {
            return x << n | x >>> 32 - n;
          }
          C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })(Math);
        return CryptoJS2.RIPEMD160;
      });
    }
  });

  // node_modules/crypto-js/hmac.js
  var require_hmac = __commonJS({
    "node_modules/crypto-js/hmac.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          var HMAC = C_algo.HMAC = Base.extend({
            /**
             * Initializes a newly created HMAC.
             *
             * @param {Hasher} hasher The hash algorithm to use.
             * @param {WordArray|string} key The secret key.
             *
             * @example
             *
             *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
             */
            init: function(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 1549556828;
                iKeyWords[i] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            /**
             * Resets this HMAC to its initial state.
             *
             * @example
             *
             *     hmacHasher.reset();
             */
            reset: function() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            /**
             * Updates this HMAC with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {HMAC} This HMAC instance.
             *
             * @example
             *
             *     hmacHasher.update('message');
             *     hmacHasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            /**
             * Finalizes the HMAC computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The HMAC.
             *
             * @example
             *
             *     var hmac = hmacHasher.finalize();
             *     var hmac = hmacHasher.finalize('message');
             *     var hmac = hmacHasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac;
            }
          });
        })();
      });
    }
  });

  // node_modules/crypto-js/pbkdf2.js
  var require_pbkdf2 = __commonJS({
    "node_modules/crypto-js/pbkdf2.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha256", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var HMAC = C_algo.HMAC;
          var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hasher to use. Default: SHA256
             * @property {number} iterations The number of iterations to perform. Default: 250000
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: SHA256,
              iterations: 25e4
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.PBKDF2.create();
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Computes the Password-Based Key Derivation Function 2.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var cfg = this.cfg;
              var hmac = HMAC.create(cfg.hasher, password);
              var derivedKey = WordArray.create();
              var blockIndex = WordArray.create([1]);
              var derivedKeyWords = derivedKey.words;
              var blockIndexWords = blockIndex.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                var block = hmac.update(salt).finalize(blockIndex);
                hmac.reset();
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;
                var intermediate = block;
                for (var i = 1; i < iterations; i++) {
                  intermediate = hmac.finalize(intermediate);
                  hmac.reset();
                  var intermediateWords = intermediate.words;
                  for (var j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                  }
                }
                derivedKey.concat(block);
                blockIndexWords[0]++;
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS2.PBKDF2;
      });
    }
  });

  // node_modules/crypto-js/evpkdf.js
  var require_evpkdf = __commonJS({
    "node_modules/crypto-js/evpkdf.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha1", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hash algorithm to use. Default: MD5
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.EvpKDF.create();
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Derives a key from a password.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var block;
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i = 1; i < iterations; i++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS2.EvpKDF;
      });
    }
  });

  // node_modules/crypto-js/cipher-core.js
  var require_cipher_core = __commonJS({
    "node_modules/crypto-js/cipher-core.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_evpkdf());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./evpkdf"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.lib.Cipher || function(undefined2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var Base64 = C_enc.Base64;
          var C_algo = C.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             *
             * @property {WordArray} iv The IV to use for this operation.
             */
            cfg: Base.extend(),
            /**
             * Creates this cipher in encryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
             */
            createEncryptor: function(key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            /**
             * Creates this cipher in decryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
             */
            createDecryptor: function(key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            /**
             * Initializes a newly created cipher.
             *
             * @param {number} xformMode Either the encryption or decryption transormation mode constant.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
             */
            init: function(xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            /**
             * Resets this cipher to its initial state.
             *
             * @example
             *
             *     cipher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Adds data to be encrypted or decrypted.
             *
             * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
             *
             * @return {WordArray} The data after processing.
             *
             * @example
             *
             *     var encrypted = cipher.process('data');
             *     var encrypted = cipher.process(wordArray);
             */
            process: function(dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            /**
             * Finalizes the encryption or decryption process.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
             *
             * @return {WordArray} The data after final processing.
             *
             * @example
             *
             *     var encrypted = cipher.finalize();
             *     var encrypted = cipher.finalize('data');
             *     var encrypted = cipher.finalize(wordArray);
             */
            finalize: function(dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            /**
             * Creates shortcut functions to a cipher's object interface.
             *
             * @param {Cipher} cipher The cipher to create a helper for.
             *
             * @return {Object} An object with encrypt and decrypt shortcut functions.
             *
             * @static
             *
             * @example
             *
             *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
             */
            _createHelper: function() {
              function selectCipherStrategy(key) {
                if (typeof key == "string") {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function(cipher) {
                return {
                  encrypt: function(message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function(ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            }()
          });
          var StreamCipher = C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
              var finalProcessedBlocks = this._process(true);
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
             * Creates this mode for encryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
             */
            createEncryptor: function(cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            /**
             * Creates this mode for decryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
             */
            createDecryptor: function(cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            /**
             * Initializes a newly created mode.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
             */
            init: function(cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = function() {
            var CBC2 = BlockCipherMode.extend();
            CBC2.Encryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC2.Decryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var block;
              var iv = this._iv;
              if (iv) {
                block = iv;
                this._iv = undefined2;
              } else {
                block = this._prevBlock;
              }
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
              }
            }
            return CBC2;
          }();
          var C_pad = C.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            /**
             * Pads data using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to pad.
             * @param {number} blockSize The multiple that the data should be padded to.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
             */
            pad: function(data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            /**
             * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to unpad.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.unpad(wordArray);
             */
            unpad: function(data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
              data.sigBytes -= nPaddingBytes;
            }
          };
          var BlockCipher = C_lib.BlockCipher = Cipher.extend({
            /**
             * Configuration options.
             *
             * @property {Mode} mode The block mode to use. Default: CBC
             * @property {Padding} padding The padding strategy to use. Default: Pkcs7
             */
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function() {
              var modeCreator;
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
              } else {
                modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function(words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
              var finalProcessedBlocks;
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                finalProcessedBlocks = this._process(true);
              } else {
                finalProcessedBlocks = this._process(true);
                padding.unpad(finalProcessedBlocks);
              }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            /**
             * Initializes a newly created cipher params object.
             *
             * @param {Object} cipherParams An object with any of the possible cipher parameters.
             *
             * @example
             *
             *     var cipherParams = CryptoJS.lib.CipherParams.create({
             *         ciphertext: ciphertextWordArray,
             *         key: keyWordArray,
             *         iv: ivWordArray,
             *         salt: saltWordArray,
             *         algorithm: CryptoJS.algo.AES,
             *         mode: CryptoJS.mode.CBC,
             *         padding: CryptoJS.pad.PKCS7,
             *         blockSize: 4,
             *         formatter: CryptoJS.format.OpenSSL
             *     });
             */
            init: function(cipherParams) {
              this.mixIn(cipherParams);
            },
            /**
             * Converts this cipher params object to a string.
             *
             * @param {Format} formatter (Optional) The formatting strategy to use.
             *
             * @return {string} The stringified cipher params.
             *
             * @throws Error If neither the formatter nor the default formatter is set.
             *
             * @example
             *
             *     var string = cipherParams + '';
             *     var string = cipherParams.toString();
             *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
             */
            toString: function(formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            /**
             * Converts a cipher params object to an OpenSSL-compatible string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The OpenSSL-compatible string.
             *
             * @static
             *
             * @example
             *
             *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              var wordArray;
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
              } else {
                wordArray = ciphertext;
              }
              return wordArray.toString(Base64);
            },
            /**
             * Converts an OpenSSL-compatible string to a cipher params object.
             *
             * @param {string} openSSLStr The OpenSSL-compatible string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
             */
            parse: function(openSSLStr) {
              var salt;
              var ciphertext = Base64.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({ ciphertext, salt });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
             * Configuration options.
             *
             * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
             */
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            /**
             * Encrypts a message.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext,
                key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            /**
             * Decrypts serialized ciphertext.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            /**
             * Converts serialized ciphertext to CipherParams,
             * else assumed CipherParams already and returns ciphertext unchanged.
             *
             * @param {CipherParams|string} ciphertext The ciphertext.
             * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
             *
             * @return {CipherParams} The unserialized ciphertext.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
             */
            _parse: function(ciphertext, format) {
              if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
             * Derives a key and IV from a password.
             *
             * @param {string} password The password to derive from.
             * @param {number} keySize The size in words of the key to generate.
             * @param {number} ivSize The size in words of the IV to generate.
             * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
             *
             * @return {CipherParams} A cipher params object with the key, IV, and salt.
             *
             * @static
             *
             * @example
             *
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
             */
            execute: function(password, keySize, ivSize, salt, hasher) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              if (!hasher) {
                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
              } else {
                var key = EvpKDF.create({ keySize: keySize + ivSize, hasher }).compute(password, salt);
              }
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({ key, iv, salt });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
             * Configuration options.
             *
             * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
             */
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            /**
             * Encrypts a message using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            /**
             * Decrypts serialized ciphertext using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        }();
      });
    }
  });

  // node_modules/crypto-js/mode-cfb.js
  var require_mode_cfb = __commonJS({
    "node_modules/crypto-js/mode-cfb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.CFB = function() {
          var CFB = CryptoJS2.lib.BlockCipherMode.extend();
          CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = thisBlock;
            }
          });
          function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var keystream;
            var iv = this._iv;
            if (iv) {
              keystream = iv.slice(0);
              this._iv = void 0;
            } else {
              keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
          return CFB;
        }();
        return CryptoJS2.mode.CFB;
      });
    }
  });

  // node_modules/crypto-js/mode-ctr.js
  var require_mode_ctr = __commonJS({
    "node_modules/crypto-js/mode-ctr.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.CTR = function() {
          var CTR = CryptoJS2.lib.BlockCipherMode.extend();
          var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTR.Decryptor = Encryptor;
          return CTR;
        }();
        return CryptoJS2.mode.CTR;
      });
    }
  });

  // node_modules/crypto-js/mode-ctr-gladman.js
  var require_mode_ctr_gladman = __commonJS({
    "node_modules/crypto-js/mode-ctr-gladman.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.CTRGladman = function() {
          var CTRGladman = CryptoJS2.lib.BlockCipherMode.extend();
          function incWord(word) {
            if ((word >> 24 & 255) === 255) {
              var b1 = word >> 16 & 255;
              var b2 = word >> 8 & 255;
              var b3 = word & 255;
              if (b1 === 255) {
                b1 = 0;
                if (b2 === 255) {
                  b2 = 0;
                  if (b3 === 255) {
                    b3 = 0;
                  } else {
                    ++b3;
                  }
                } else {
                  ++b2;
                }
              } else {
                ++b1;
              }
              word = 0;
              word += b1 << 16;
              word += b2 << 8;
              word += b3;
            } else {
              word += 1 << 24;
            }
            return word;
          }
          function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
              counter[1] = incWord(counter[1]);
            }
            return counter;
          }
          var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              incCounter(counter);
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTRGladman.Decryptor = Encryptor;
          return CTRGladman;
        }();
        return CryptoJS2.mode.CTRGladman;
      });
    }
  });

  // node_modules/crypto-js/mode-ofb.js
  var require_mode_ofb = __commonJS({
    "node_modules/crypto-js/mode-ofb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.OFB = function() {
          var OFB = CryptoJS2.lib.BlockCipherMode.extend();
          var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var keystream = this._keystream;
              if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = void 0;
              }
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          OFB.Decryptor = Encryptor;
          return OFB;
        }();
        return CryptoJS2.mode.OFB;
      });
    }
  });

  // node_modules/crypto-js/mode-ecb.js
  var require_mode_ecb = __commonJS({
    "node_modules/crypto-js/mode-ecb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.mode.ECB = function() {
          var ECB = CryptoJS2.lib.BlockCipherMode.extend();
          ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.encryptBlock(words, offset);
            }
          });
          ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.decryptBlock(words, offset);
            }
          });
          return ECB;
        }();
        return CryptoJS2.mode.ECB;
      });
    }
  });

  // node_modules/crypto-js/pad-ansix923.js
  var require_pad_ansix923 = __commonJS({
    "node_modules/crypto-js/pad-ansix923.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.AnsiX923 = {
          pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS2.pad.Ansix923;
      });
    }
  });

  // node_modules/crypto-js/pad-iso10126.js
  var require_pad_iso10126 = __commonJS({
    "node_modules/crypto-js/pad-iso10126.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.Iso10126 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS2.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS2.lib.WordArray.create([nPaddingBytes << 24], 1));
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS2.pad.Iso10126;
      });
    }
  });

  // node_modules/crypto-js/pad-iso97971.js
  var require_pad_iso97971 = __commonJS({
    "node_modules/crypto-js/pad-iso97971.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.Iso97971 = {
          pad: function(data, blockSize) {
            data.concat(CryptoJS2.lib.WordArray.create([2147483648], 1));
            CryptoJS2.pad.ZeroPadding.pad(data, blockSize);
          },
          unpad: function(data) {
            CryptoJS2.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
          }
        };
        return CryptoJS2.pad.Iso97971;
      });
    }
  });

  // node_modules/crypto-js/pad-zeropadding.js
  var require_pad_zeropadding = __commonJS({
    "node_modules/crypto-js/pad-zeropadding.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.ZeroPadding = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
          },
          unpad: function(data) {
            var dataWords = data.words;
            var i = data.sigBytes - 1;
            for (var i = data.sigBytes - 1; i >= 0; i--) {
              if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
                data.sigBytes = i + 1;
                break;
              }
            }
          }
        };
        return CryptoJS2.pad.ZeroPadding;
      });
    }
  });

  // node_modules/crypto-js/pad-nopadding.js
  var require_pad_nopadding = __commonJS({
    "node_modules/crypto-js/pad-nopadding.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        CryptoJS2.pad.NoPadding = {
          pad: function() {
          },
          unpad: function() {
          }
        };
        return CryptoJS2.pad.NoPadding;
      });
    }
  });

  // node_modules/crypto-js/format-hex.js
  var require_format_hex = __commonJS({
    "node_modules/crypto-js/format-hex.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(undefined2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var CipherParams = C_lib.CipherParams;
          var C_enc = C.enc;
          var Hex = C_enc.Hex;
          var C_format = C.format;
          var HexFormatter = C_format.Hex = {
            /**
             * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The hexadecimally encoded string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              return cipherParams.ciphertext.toString(Hex);
            },
            /**
             * Converts a hexadecimally encoded ciphertext string to a cipher params object.
             *
             * @param {string} input The hexadecimally encoded string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
             */
            parse: function(input) {
              var ciphertext = Hex.parse(input);
              return CipherParams.create({ ciphertext });
            }
          };
        })();
        return CryptoJS2.format.Hex;
      });
    }
  });

  // node_modules/crypto-js/aes.js
  var require_aes = __commonJS({
    "node_modules/crypto-js/aes.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var SBOX = [];
          var INV_SBOX = [];
          var SUB_MIX_0 = [];
          var SUB_MIX_1 = [];
          var SUB_MIX_2 = [];
          var SUB_MIX_3 = [];
          var INV_SUB_MIX_0 = [];
          var INV_SUB_MIX_1 = [];
          var INV_SUB_MIX_2 = [];
          var INV_SUB_MIX_3 = [];
          (function() {
            var d = [];
            for (var i = 0; i < 256; i++) {
              if (i < 128) {
                d[i] = i << 1;
              } else {
                d[i] = i << 1 ^ 283;
              }
            }
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
              var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
              sx = sx >>> 8 ^ sx & 255 ^ 99;
              SBOX[x] = sx;
              INV_SBOX[sx] = x;
              var x2 = d[x];
              var x4 = d[x2];
              var x8 = d[x4];
              var t = d[sx] * 257 ^ sx * 16843008;
              SUB_MIX_0[x] = t << 24 | t >>> 8;
              SUB_MIX_1[x] = t << 16 | t >>> 16;
              SUB_MIX_2[x] = t << 8 | t >>> 24;
              SUB_MIX_3[x] = t;
              var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
              INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
              INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
              INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
              INV_SUB_MIX_3[sx] = t;
              if (!x) {
                x = xi = 1;
              } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
              }
            }
          })();
          var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
              var t;
              if (this._nRounds && this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              var nRounds = this._nRounds = keySize + 6;
              var ksRows = (nRounds + 1) * 4;
              var keySchedule = this._keySchedule = [];
              for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                  keySchedule[ksRow] = keyWords[ksRow];
                } else {
                  t = keySchedule[ksRow - 1];
                  if (!(ksRow % keySize)) {
                    t = t << 8 | t >>> 24;
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                    t ^= RCON[ksRow / keySize | 0] << 24;
                  } else if (keySize > 6 && ksRow % keySize == 4) {
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  }
                  keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
              }
              var invKeySchedule = this._invKeySchedule = [];
              for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                  var t = keySchedule[ksRow];
                } else {
                  var t = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                  invKeySchedule[invKsRow] = t;
                } else {
                  invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
                }
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M, offset) {
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
              this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
            },
            _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
              var nRounds = this._nRounds;
              var s0 = M[offset] ^ keySchedule[0];
              var s1 = M[offset + 1] ^ keySchedule[1];
              var s2 = M[offset + 2] ^ keySchedule[2];
              var s3 = M[offset + 3] ^ keySchedule[3];
              var ksRow = 4;
              for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
              }
              var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
              var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
              var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
              var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
              M[offset] = t0;
              M[offset + 1] = t1;
              M[offset + 2] = t2;
              M[offset + 3] = t3;
            },
            keySize: 256 / 32
          });
          C.AES = BlockCipher._createHelper(AES);
        })();
        return CryptoJS2.AES;
      });
    }
  });

  // node_modules/crypto-js/tripledes.js
  var require_tripledes = __commonJS({
    "node_modules/crypto-js/tripledes.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var PC1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
          ];
          var PC2 = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
          ];
          var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var SBOX_P = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }
          ];
          var SBOX_MASK = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
          ];
          var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keyBits = [];
              for (var i = 0; i < 56; i++) {
                var keyBitPos = PC1[i] - 1;
                keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
              }
              var subKeys = this._subKeys = [];
              for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                var subKey = subKeys[nSubKey] = [];
                var bitShift = BIT_SHIFTS[nSubKey];
                for (var i = 0; i < 24; i++) {
                  subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                  subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
                }
                subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                for (var i = 1; i < 7; i++) {
                  subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
                }
                subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
              }
              var invSubKeys = this._invSubKeys = [];
              for (var i = 0; i < 16; i++) {
                invSubKeys[i] = subKeys[15 - i];
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._subKeys);
            },
            decryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M, offset, subKeys) {
              this._lBlock = M[offset];
              this._rBlock = M[offset + 1];
              exchangeLR.call(this, 4, 252645135);
              exchangeLR.call(this, 16, 65535);
              exchangeRL.call(this, 2, 858993459);
              exchangeRL.call(this, 8, 16711935);
              exchangeLR.call(this, 1, 1431655765);
              for (var round = 0; round < 16; round++) {
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;
                var f = 0;
                for (var i = 0; i < 8; i++) {
                  f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f;
              }
              var t = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = t;
              exchangeLR.call(this, 1, 1431655765);
              exchangeRL.call(this, 8, 16711935);
              exchangeRL.call(this, 2, 858993459);
              exchangeLR.call(this, 16, 65535);
              exchangeLR.call(this, 4, 252645135);
              M[offset] = this._lBlock;
              M[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          function exchangeLR(offset, mask) {
            var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t;
            this._lBlock ^= t << offset;
          }
          function exchangeRL(offset, mask) {
            var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t;
            this._rBlock ^= t << offset;
          }
          C.DES = BlockCipher._createHelper(DES);
          var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              }
              var key1 = keyWords.slice(0, 2);
              var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
              var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
              this._des1 = DES.createEncryptor(WordArray.create(key1));
              this._des2 = DES.createEncryptor(WordArray.create(key2));
              this._des3 = DES.createEncryptor(WordArray.create(key3));
            },
            encryptBlock: function(M, offset) {
              this._des1.encryptBlock(M, offset);
              this._des2.decryptBlock(M, offset);
              this._des3.encryptBlock(M, offset);
            },
            decryptBlock: function(M, offset) {
              this._des3.decryptBlock(M, offset);
              this._des2.encryptBlock(M, offset);
              this._des1.decryptBlock(M, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          C.TripleDES = BlockCipher._createHelper(TripleDES);
        })();
        return CryptoJS2.TripleDES;
      });
    }
  });

  // node_modules/crypto-js/rc4.js
  var require_rc4 = __commonJS({
    "node_modules/crypto-js/rc4.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keySigBytes = key.sigBytes;
              var S = this._S = [];
              for (var i = 0; i < 256; i++) {
                S[i] = i;
              }
              for (var i = 0, j = 0; i < 256; i++) {
                var keyByteIndex = i % keySigBytes;
                var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                j = (j + S[i] + keyByte) % 256;
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function(M, offset) {
              M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
          });
          function generateKeystreamWord() {
            var S = this._S;
            var i = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; n < 4; n++) {
              i = (i + 1) % 256;
              j = (j + S[i]) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
              keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
            }
            this._i = i;
            this._j = j;
            return keystreamWord;
          }
          C.RC4 = StreamCipher._createHelper(RC4);
          var RC4Drop = C_algo.RC4Drop = RC4.extend({
            /**
             * Configuration options.
             *
             * @property {number} drop The number of keystream words to drop. Default 192
             */
            cfg: RC4.cfg.extend({
              drop: 192
            }),
            _doReset: function() {
              RC4._doReset.call(this);
              for (var i = this.cfg.drop; i > 0; i--) {
                generateKeystreamWord.call(this);
              }
            }
          });
          C.RC4Drop = StreamCipher._createHelper(RC4Drop);
        })();
        return CryptoJS2.RC4;
      });
    }
  });

  // node_modules/crypto-js/rabbit.js
  var require_rabbit = __commonJS({
    "node_modules/crypto-js/rabbit.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              for (var i = 0; i < 4; i++) {
                K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
              }
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.Rabbit = StreamCipher._createHelper(Rabbit);
        })();
        return CryptoJS2.Rabbit;
      });
    }
  });

  // node_modules/crypto-js/rabbit-legacy.js
  var require_rabbit_legacy = __commonJS({
    "node_modules/crypto-js/rabbit-legacy.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
        })();
        return CryptoJS2.RabbitLegacy;
      });
    }
  });

  // node_modules/crypto-js/blowfish.js
  var require_blowfish = __commonJS({
    "node_modules/crypto-js/blowfish.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          const N = 16;
          const ORIG_P = [
            608135816,
            2242054355,
            320440878,
            57701188,
            2752067618,
            698298832,
            137296536,
            3964562569,
            1160258022,
            953160567,
            3193202383,
            887688300,
            3232508343,
            3380367581,
            1065670069,
            3041331479,
            2450970073,
            2306472731
          ];
          const ORIG_S = [
            [
              3509652390,
              2564797868,
              805139163,
              3491422135,
              3101798381,
              1780907670,
              3128725573,
              4046225305,
              614570311,
              3012652279,
              134345442,
              2240740374,
              1667834072,
              1901547113,
              2757295779,
              4103290238,
              227898511,
              1921955416,
              1904987480,
              2182433518,
              2069144605,
              3260701109,
              2620446009,
              720527379,
              3318853667,
              677414384,
              3393288472,
              3101374703,
              2390351024,
              1614419982,
              1822297739,
              2954791486,
              3608508353,
              3174124327,
              2024746970,
              1432378464,
              3864339955,
              2857741204,
              1464375394,
              1676153920,
              1439316330,
              715854006,
              3033291828,
              289532110,
              2706671279,
              2087905683,
              3018724369,
              1668267050,
              732546397,
              1947742710,
              3462151702,
              2609353502,
              2950085171,
              1814351708,
              2050118529,
              680887927,
              999245976,
              1800124847,
              3300911131,
              1713906067,
              1641548236,
              4213287313,
              1216130144,
              1575780402,
              4018429277,
              3917837745,
              3693486850,
              3949271944,
              596196993,
              3549867205,
              258830323,
              2213823033,
              772490370,
              2760122372,
              1774776394,
              2652871518,
              566650946,
              4142492826,
              1728879713,
              2882767088,
              1783734482,
              3629395816,
              2517608232,
              2874225571,
              1861159788,
              326777828,
              3124490320,
              2130389656,
              2716951837,
              967770486,
              1724537150,
              2185432712,
              2364442137,
              1164943284,
              2105845187,
              998989502,
              3765401048,
              2244026483,
              1075463327,
              1455516326,
              1322494562,
              910128902,
              469688178,
              1117454909,
              936433444,
              3490320968,
              3675253459,
              1240580251,
              122909385,
              2157517691,
              634681816,
              4142456567,
              3825094682,
              3061402683,
              2540495037,
              79693498,
              3249098678,
              1084186820,
              1583128258,
              426386531,
              1761308591,
              1047286709,
              322548459,
              995290223,
              1845252383,
              2603652396,
              3431023940,
              2942221577,
              3202600964,
              3727903485,
              1712269319,
              422464435,
              3234572375,
              1170764815,
              3523960633,
              3117677531,
              1434042557,
              442511882,
              3600875718,
              1076654713,
              1738483198,
              4213154764,
              2393238008,
              3677496056,
              1014306527,
              4251020053,
              793779912,
              2902807211,
              842905082,
              4246964064,
              1395751752,
              1040244610,
              2656851899,
              3396308128,
              445077038,
              3742853595,
              3577915638,
              679411651,
              2892444358,
              2354009459,
              1767581616,
              3150600392,
              3791627101,
              3102740896,
              284835224,
              4246832056,
              1258075500,
              768725851,
              2589189241,
              3069724005,
              3532540348,
              1274779536,
              3789419226,
              2764799539,
              1660621633,
              3471099624,
              4011903706,
              913787905,
              3497959166,
              737222580,
              2514213453,
              2928710040,
              3937242737,
              1804850592,
              3499020752,
              2949064160,
              2386320175,
              2390070455,
              2415321851,
              4061277028,
              2290661394,
              2416832540,
              1336762016,
              1754252060,
              3520065937,
              3014181293,
              791618072,
              3188594551,
              3933548030,
              2332172193,
              3852520463,
              3043980520,
              413987798,
              3465142937,
              3030929376,
              4245938359,
              2093235073,
              3534596313,
              375366246,
              2157278981,
              2479649556,
              555357303,
              3870105701,
              2008414854,
              3344188149,
              4221384143,
              3956125452,
              2067696032,
              3594591187,
              2921233993,
              2428461,
              544322398,
              577241275,
              1471733935,
              610547355,
              4027169054,
              1432588573,
              1507829418,
              2025931657,
              3646575487,
              545086370,
              48609733,
              2200306550,
              1653985193,
              298326376,
              1316178497,
              3007786442,
              2064951626,
              458293330,
              2589141269,
              3591329599,
              3164325604,
              727753846,
              2179363840,
              146436021,
              1461446943,
              4069977195,
              705550613,
              3059967265,
              3887724982,
              4281599278,
              3313849956,
              1404054877,
              2845806497,
              146425753,
              1854211946
            ],
            [
              1266315497,
              3048417604,
              3681880366,
              3289982499,
              290971e4,
              1235738493,
              2632868024,
              2414719590,
              3970600049,
              1771706367,
              1449415276,
              3266420449,
              422970021,
              1963543593,
              2690192192,
              3826793022,
              1062508698,
              1531092325,
              1804592342,
              2583117782,
              2714934279,
              4024971509,
              1294809318,
              4028980673,
              1289560198,
              2221992742,
              1669523910,
              35572830,
              157838143,
              1052438473,
              1016535060,
              1802137761,
              1753167236,
              1386275462,
              3080475397,
              2857371447,
              1040679964,
              2145300060,
              2390574316,
              1461121720,
              2956646967,
              4031777805,
              4028374788,
              33600511,
              2920084762,
              1018524850,
              629373528,
              3691585981,
              3515945977,
              2091462646,
              2486323059,
              586499841,
              988145025,
              935516892,
              3367335476,
              2599673255,
              2839830854,
              265290510,
              3972581182,
              2759138881,
              3795373465,
              1005194799,
              847297441,
              406762289,
              1314163512,
              1332590856,
              1866599683,
              4127851711,
              750260880,
              613907577,
              1450815602,
              3165620655,
              3734664991,
              3650291728,
              3012275730,
              3704569646,
              1427272223,
              778793252,
              1343938022,
              2676280711,
              2052605720,
              1946737175,
              3164576444,
              3914038668,
              3967478842,
              3682934266,
              1661551462,
              3294938066,
              4011595847,
              840292616,
              3712170807,
              616741398,
              312560963,
              711312465,
              1351876610,
              322626781,
              1910503582,
              271666773,
              2175563734,
              1594956187,
              70604529,
              3617834859,
              1007753275,
              1495573769,
              4069517037,
              2549218298,
              2663038764,
              504708206,
              2263041392,
              3941167025,
              2249088522,
              1514023603,
              1998579484,
              1312622330,
              694541497,
              2582060303,
              2151582166,
              1382467621,
              776784248,
              2618340202,
              3323268794,
              2497899128,
              2784771155,
              503983604,
              4076293799,
              907881277,
              423175695,
              432175456,
              1378068232,
              4145222326,
              3954048622,
              3938656102,
              3820766613,
              2793130115,
              2977904593,
              26017576,
              3274890735,
              3194772133,
              1700274565,
              1756076034,
              4006520079,
              3677328699,
              720338349,
              1533947780,
              354530856,
              688349552,
              3973924725,
              1637815568,
              332179504,
              3949051286,
              53804574,
              2852348879,
              3044236432,
              1282449977,
              3583942155,
              3416972820,
              4006381244,
              1617046695,
              2628476075,
              3002303598,
              1686838959,
              431878346,
              2686675385,
              1700445008,
              1080580658,
              1009431731,
              832498133,
              3223435511,
              2605976345,
              2271191193,
              2516031870,
              1648197032,
              4164389018,
              2548247927,
              300782431,
              375919233,
              238389289,
              3353747414,
              2531188641,
              2019080857,
              1475708069,
              455242339,
              2609103871,
              448939670,
              3451063019,
              1395535956,
              2413381860,
              1841049896,
              1491858159,
              885456874,
              4264095073,
              4001119347,
              1565136089,
              3898914787,
              1108368660,
              540939232,
              1173283510,
              2745871338,
              3681308437,
              4207628240,
              3343053890,
              4016749493,
              1699691293,
              1103962373,
              3625875870,
              2256883143,
              3830138730,
              1031889488,
              3479347698,
              1535977030,
              4236805024,
              3251091107,
              2132092099,
              1774941330,
              1199868427,
              1452454533,
              157007616,
              2904115357,
              342012276,
              595725824,
              1480756522,
              206960106,
              497939518,
              591360097,
              863170706,
              2375253569,
              3596610801,
              1814182875,
              2094937945,
              3421402208,
              1082520231,
              3463918190,
              2785509508,
              435703966,
              3908032597,
              1641649973,
              2842273706,
              3305899714,
              1510255612,
              2148256476,
              2655287854,
              3276092548,
              4258621189,
              236887753,
              3681803219,
              274041037,
              1734335097,
              3815195456,
              3317970021,
              1899903192,
              1026095262,
              4050517792,
              356393447,
              2410691914,
              3873677099,
              3682840055
            ],
            [
              3913112168,
              2491498743,
              4132185628,
              2489919796,
              1091903735,
              1979897079,
              3170134830,
              3567386728,
              3557303409,
              857797738,
              1136121015,
              1342202287,
              507115054,
              2535736646,
              337727348,
              3213592640,
              1301675037,
              2528481711,
              1895095763,
              1721773893,
              3216771564,
              62756741,
              2142006736,
              835421444,
              2531993523,
              1442658625,
              3659876326,
              2882144922,
              676362277,
              1392781812,
              170690266,
              3921047035,
              1759253602,
              3611846912,
              1745797284,
              664899054,
              1329594018,
              3901205900,
              3045908486,
              2062866102,
              2865634940,
              3543621612,
              3464012697,
              1080764994,
              553557557,
              3656615353,
              3996768171,
              991055499,
              499776247,
              1265440854,
              648242737,
              3940784050,
              980351604,
              3713745714,
              1749149687,
              3396870395,
              4211799374,
              3640570775,
              1161844396,
              3125318951,
              1431517754,
              545492359,
              4268468663,
              3499529547,
              1437099964,
              2702547544,
              3433638243,
              2581715763,
              2787789398,
              1060185593,
              1593081372,
              2418618748,
              4260947970,
              69676912,
              2159744348,
              86519011,
              2512459080,
              3838209314,
              1220612927,
              3339683548,
              133810670,
              1090789135,
              1078426020,
              1569222167,
              845107691,
              3583754449,
              4072456591,
              1091646820,
              628848692,
              1613405280,
              3757631651,
              526609435,
              236106946,
              48312990,
              2942717905,
              3402727701,
              1797494240,
              859738849,
              992217954,
              4005476642,
              2243076622,
              3870952857,
              3732016268,
              765654824,
              3490871365,
              2511836413,
              1685915746,
              3888969200,
              1414112111,
              2273134842,
              3281911079,
              4080962846,
              172450625,
              2569994100,
              980381355,
              4109958455,
              2819808352,
              2716589560,
              2568741196,
              3681446669,
              3329971472,
              1835478071,
              660984891,
              3704678404,
              4045999559,
              3422617507,
              3040415634,
              1762651403,
              1719377915,
              3470491036,
              2693910283,
              3642056355,
              3138596744,
              1364962596,
              2073328063,
              1983633131,
              926494387,
              3423689081,
              2150032023,
              4096667949,
              1749200295,
              3328846651,
              309677260,
              2016342300,
              1779581495,
              3079819751,
              111262694,
              1274766160,
              443224088,
              298511866,
              1025883608,
              3806446537,
              1145181785,
              168956806,
              3641502830,
              3584813610,
              1689216846,
              3666258015,
              3200248200,
              1692713982,
              2646376535,
              4042768518,
              1618508792,
              1610833997,
              3523052358,
              4130873264,
              2001055236,
              3610705100,
              2202168115,
              4028541809,
              2961195399,
              1006657119,
              2006996926,
              3186142756,
              1430667929,
              3210227297,
              1314452623,
              4074634658,
              4101304120,
              2273951170,
              1399257539,
              3367210612,
              3027628629,
              1190975929,
              2062231137,
              2333990788,
              2221543033,
              2438960610,
              1181637006,
              548689776,
              2362791313,
              3372408396,
              3104550113,
              3145860560,
              296247880,
              1970579870,
              3078560182,
              3769228297,
              1714227617,
              3291629107,
              3898220290,
              166772364,
              1251581989,
              493813264,
              448347421,
              195405023,
              2709975567,
              677966185,
              3703036547,
              1463355134,
              2715995803,
              1338867538,
              1343315457,
              2802222074,
              2684532164,
              233230375,
              2599980071,
              2000651841,
              3277868038,
              1638401717,
              4028070440,
              3237316320,
              6314154,
              819756386,
              300326615,
              590932579,
              1405279636,
              3267499572,
              3150704214,
              2428286686,
              3959192993,
              3461946742,
              1862657033,
              1266418056,
              963775037,
              2089974820,
              2263052895,
              1917689273,
              448879540,
              3550394620,
              3981727096,
              150775221,
              3627908307,
              1303187396,
              508620638,
              2975983352,
              2726630617,
              1817252668,
              1876281319,
              1457606340,
              908771278,
              3720792119,
              3617206836,
              2455994898,
              1729034894,
              1080033504
            ],
            [
              976866871,
              3556439503,
              2881648439,
              1522871579,
              1555064734,
              1336096578,
              3548522304,
              2579274686,
              3574697629,
              3205460757,
              3593280638,
              3338716283,
              3079412587,
              564236357,
              2993598910,
              1781952180,
              1464380207,
              3163844217,
              3332601554,
              1699332808,
              1393555694,
              1183702653,
              3581086237,
              1288719814,
              691649499,
              2847557200,
              2895455976,
              3193889540,
              2717570544,
              1781354906,
              1676643554,
              2592534050,
              3230253752,
              1126444790,
              2770207658,
              2633158820,
              2210423226,
              2615765581,
              2414155088,
              3127139286,
              673620729,
              2805611233,
              1269405062,
              4015350505,
              3341807571,
              4149409754,
              1057255273,
              2012875353,
              2162469141,
              2276492801,
              2601117357,
              993977747,
              3918593370,
              2654263191,
              753973209,
              36408145,
              2530585658,
              25011837,
              3520020182,
              2088578344,
              530523599,
              2918365339,
              1524020338,
              1518925132,
              3760827505,
              3759777254,
              1202760957,
              3985898139,
              3906192525,
              674977740,
              4174734889,
              2031300136,
              2019492241,
              3983892565,
              4153806404,
              3822280332,
              352677332,
              2297720250,
              60907813,
              90501309,
              3286998549,
              1016092578,
              2535922412,
              2839152426,
              457141659,
              509813237,
              4120667899,
              652014361,
              1966332200,
              2975202805,
              55981186,
              2327461051,
              676427537,
              3255491064,
              2882294119,
              3433927263,
              1307055953,
              942726286,
              933058658,
              2468411793,
              3933900994,
              4215176142,
              1361170020,
              2001714738,
              2830558078,
              3274259782,
              1222529897,
              1679025792,
              2729314320,
              3714953764,
              1770335741,
              151462246,
              3013232138,
              1682292957,
              1483529935,
              471910574,
              1539241949,
              458788160,
              3436315007,
              1807016891,
              3718408830,
              978976581,
              1043663428,
              3165965781,
              1927990952,
              4200891579,
              2372276910,
              3208408903,
              3533431907,
              1412390302,
              2931980059,
              4132332400,
              1947078029,
              3881505623,
              4168226417,
              2941484381,
              1077988104,
              1320477388,
              886195818,
              18198404,
              3786409e3,
              2509781533,
              112762804,
              3463356488,
              1866414978,
              891333506,
              18488651,
              661792760,
              1628790961,
              3885187036,
              3141171499,
              876946877,
              2693282273,
              1372485963,
              791857591,
              2686433993,
              3759982718,
              3167212022,
              3472953795,
              2716379847,
              445679433,
              3561995674,
              3504004811,
              3574258232,
              54117162,
              3331405415,
              2381918588,
              3769707343,
              4154350007,
              1140177722,
              4074052095,
              668550556,
              3214352940,
              367459370,
              261225585,
              2610173221,
              4209349473,
              3468074219,
              3265815641,
              314222801,
              3066103646,
              3808782860,
              282218597,
              3406013506,
              3773591054,
              379116347,
              1285071038,
              846784868,
              2669647154,
              3771962079,
              3550491691,
              2305946142,
              453669953,
              1268987020,
              3317592352,
              3279303384,
              3744833421,
              2610507566,
              3859509063,
              266596637,
              3847019092,
              517658769,
              3462560207,
              3443424879,
              370717030,
              4247526661,
              2224018117,
              4143653529,
              4112773975,
              2788324899,
              2477274417,
              1456262402,
              2901442914,
              1517677493,
              1846949527,
              2295493580,
              3734397586,
              2176403920,
              1280348187,
              1908823572,
              3871786941,
              846861322,
              1172426758,
              3287448474,
              3383383037,
              1655181056,
              3139813346,
              901632758,
              1897031941,
              2986607138,
              3066810236,
              3447102507,
              1393639104,
              373351379,
              950779232,
              625454576,
              3124240540,
              4148612726,
              2007998917,
              544563296,
              2244738638,
              2330496472,
              2058025392,
              1291430526,
              424198748,
              50039436,
              29584100,
              3605783033,
              2429876329,
              2791104160,
              1057563949,
              3255363231,
              3075367218,
              3463963227,
              1469046755,
              985887462
            ]
          ];
          var BLOWFISH_CTX = {
            pbox: [],
            sbox: []
          };
          function F(ctx, x) {
            let a = x >> 24 & 255;
            let b = x >> 16 & 255;
            let c = x >> 8 & 255;
            let d = x & 255;
            let y = ctx.sbox[0][a] + ctx.sbox[1][b];
            y = y ^ ctx.sbox[2][c];
            y = y + ctx.sbox[3][d];
            return y;
          }
          function BlowFish_Encrypt(ctx, left, right) {
            let Xl = left;
            let Xr = right;
            let temp;
            for (let i = 0; i < N; ++i) {
              Xl = Xl ^ ctx.pbox[i];
              Xr = F(ctx, Xl) ^ Xr;
              temp = Xl;
              Xl = Xr;
              Xr = temp;
            }
            temp = Xl;
            Xl = Xr;
            Xr = temp;
            Xr = Xr ^ ctx.pbox[N];
            Xl = Xl ^ ctx.pbox[N + 1];
            return { left: Xl, right: Xr };
          }
          function BlowFish_Decrypt(ctx, left, right) {
            let Xl = left;
            let Xr = right;
            let temp;
            for (let i = N + 1; i > 1; --i) {
              Xl = Xl ^ ctx.pbox[i];
              Xr = F(ctx, Xl) ^ Xr;
              temp = Xl;
              Xl = Xr;
              Xr = temp;
            }
            temp = Xl;
            Xl = Xr;
            Xr = temp;
            Xr = Xr ^ ctx.pbox[1];
            Xl = Xl ^ ctx.pbox[0];
            return { left: Xl, right: Xr };
          }
          function BlowFishInit(ctx, key, keysize) {
            for (let Row = 0; Row < 4; Row++) {
              ctx.sbox[Row] = [];
              for (let Col = 0; Col < 256; Col++) {
                ctx.sbox[Row][Col] = ORIG_S[Row][Col];
              }
            }
            let keyIndex = 0;
            for (let index = 0; index < N + 2; index++) {
              ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
              keyIndex++;
              if (keyIndex >= keysize) {
                keyIndex = 0;
              }
            }
            let Data1 = 0;
            let Data2 = 0;
            let res = 0;
            for (let i = 0; i < N + 2; i += 2) {
              res = BlowFish_Encrypt(ctx, Data1, Data2);
              Data1 = res.left;
              Data2 = res.right;
              ctx.pbox[i] = Data1;
              ctx.pbox[i + 1] = Data2;
            }
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 256; j += 2) {
                res = BlowFish_Encrypt(ctx, Data1, Data2);
                Data1 = res.left;
                Data2 = res.right;
                ctx.sbox[i][j] = Data1;
                ctx.sbox[i][j + 1] = Data2;
              }
            }
            return true;
          }
          var Blowfish = C_algo.Blowfish = BlockCipher.extend({
            _doReset: function() {
              if (this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
            },
            encryptBlock: function(M, offset) {
              var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
              M[offset] = res.left;
              M[offset + 1] = res.right;
            },
            decryptBlock: function(M, offset) {
              var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
              M[offset] = res.left;
              M[offset + 1] = res.right;
            },
            blockSize: 64 / 32,
            keySize: 128 / 32,
            ivSize: 64 / 32
          });
          C.Blowfish = BlockCipher._createHelper(Blowfish);
        })();
        return CryptoJS2.Blowfish;
      });
    }
  });

  // node_modules/crypto-js/index.js
  var require_crypto_js = __commonJS({
    "node_modules/crypto-js/index.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_lib_typedarrays(), require_enc_utf16(), require_enc_base64(), require_enc_base64url(), require_md5(), require_sha1(), require_sha256(), require_sha224(), require_sha512(), require_sha384(), require_sha3(), require_ripemd160(), require_hmac(), require_pbkdf2(), require_evpkdf(), require_cipher_core(), require_mode_cfb(), require_mode_ctr(), require_mode_ctr_gladman(), require_mode_ofb(), require_mode_ecb(), require_pad_ansix923(), require_pad_iso10126(), require_pad_iso97971(), require_pad_zeropadding(), require_pad_nopadding(), require_format_hex(), require_aes(), require_tripledes(), require_rc4(), require_rabbit(), require_rabbit_legacy(), require_blowfish());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./enc-base64url", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy", "./blowfish"], factory);
        } else {
          root.CryptoJS = factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2;
      });
    }
  });

  // src/ui/config.tsx
  var settingOptions = [
    {
      key: "quantity",
      label: "\u9009\u62E9\u97F3\u8D28  ",
      defaultValue: "128",
      options: [
        { label: "\u6807\u51C6", value: "128" },
        { label: "\u6781\u9AD8", value: "320" },
        { label: "\u65E0\u635F\u97F3\u8D28", value: "999" },
        { label: "\u65E0\u635F\u97F3\u8D28(\u8FD9\u4FE9\u5176\u5B9E\u4E00\u6837\u7684\u53EA\u662F\u6015\u62A5\u9519)", value: "1999" }
      ]
    },
    {
      key: "bottom0rtop",
      label: "\u64AD\u653E\u5668\u5782\u76F4\u4F4D\u7F6E  ",
      defaultValue: "bottom",
      options: [
        { label: "\u5C45\u4E0B", value: "bottom" },
        { label: "\u5C45\u4E0A", value: "top" }
      ]
    },
    {
      key: "left0rright",
      label: "\u64AD\u653E\u5668\u6C34\u5E73\u4F4D\u7F6E  ",
      defaultValue: "right",
      options: [
        { label: "\u5C45\u53F3", value: "right" },
        { label: "\u5C45\u5DE6", value: "left" }
      ]
    },
    {
      key: "opacity",
      label: "\u534A\u900F\u660E\u6548\u679C  ",
      defaultValue: "false",
      options: [
        { label: "\u5173\u95ED", value: "false" },
        { label: "\u542F\u7528(\u8DDF\u968FLyricBarBlur\u63D2\u4EF6)", value: "true" }
      ]
    }
    //
    // {
    //     key: 'newSetting',
    //     label: '新设置项',
    //     defaultValue: 'value1',
    //     options: [
    //         { label: '选项1', value: 'value1' },
    //         { label: '选项2', value: 'value2' },
    //     ],
    // },
  ];
  function Config() {
    const initialSettings = settingOptions.reduce((acc, setting) => {
      acc[setting.key] = getSetting(setting.key, setting.defaultValue);
      return acc;
    }, {});
    const [settings, setSettings] = React.useState(initialSettings);
    React.useEffect(() => {
      Object.keys(settings).forEach((key) => setSetting(key, settings[key]));
    }, [settings]);
    const handleSettingChange = (key, value) => {
      setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
    };
    return /* @__PURE__ */ h("div", null, settingOptions.map((setting) => /* @__PURE__ */ h("div", { key: setting.key, className: "item u-cklist" }, /* @__PURE__ */ h("span", null, setting.label), setting.options.map((option) => /* @__PURE__ */ h("label", { key: option.value }, /* @__PURE__ */ h(
      "input",
      {
        type: "radio",
        style: {
          cursor: "pointer"
        },
        name: setting.key,
        value: option.value,
        checked: settings[setting.key] === option.value,
        onChange: () => handleSettingChange(setting.key, option.value)
      }
    ), /* @__PURE__ */ h("span", null, /* @__PURE__ */ h("i", { className: "circle" })), option.label)))), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("h1", null, "\u4E3A\u4EC0\u4E48\u5355\u72EC\u5199\u4E00\u4E2A\u64AD\u653E\u5668? \u56E0\u4E3A\u627E\u4E0D\u5230\u7F51\u6613\u4E91\u64AD\u653E\u63A5\u53E3 \u51D1\u5408\u7528\u5427"), /* @__PURE__ */ h("h1", null, "\u81F3\u4E8E\u517C\u5BB9\u6027 \u6211\u81EA\u5DF1\u7528\u7684\u63D2\u4EF6\u5DF2\u7ECF\u57FA\u672C\u9002\u914D\u5B8C\u4E86"), /* @__PURE__ */ h("h4", null, "\u5F20\u680B\u8FD8\u6211\u9996\u53D1\u97F3\u4E50!!!"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(
      "span",
      {
        style: {
          cursor: "pointer"
        },
        onClick: () => betterncm.ncm.openUrl("https://github.com/etherfun/MHYNotRelease")
      },
      "\u6E90\u4EE3\u7801"
    ), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(
      "span",
      {
        style: {
          cursor: "pointer"
        },
        onClick: () => betterncm.ncm.openUrl("https://github.com/etherfun/MHYNotRelease/issues")
      },
      "\u95EE\u9898\u53CD\u9988"
    ));
  }
  var getSetting = (option, defaultValue) => {
    const key = "MHYNotRelease-" + option;
    const value = localStorage.getItem(key);
    return value ?? defaultValue;
  };
  var setSetting = (option, value) => {
    const key = "MHYNotRelease-" + option;
    localStorage.setItem(key, value);
  };

  // src/ui/page.tsx
  var Playlist = ({ songList }) => {
    const CountdownTimer = ({ initialPublishTime }) => {
      const [publishTime, setPublishTime] = React.useState(initialPublishTime);
      React.useEffect(() => {
        const timer = setInterval(() => {
          setPublishTime((prevTime) => {
            let { day, hour, minute, second } = prevTime;
            if (second > 0) {
              second--;
            } else {
              second = 59;
              if (minute > 0) {
                minute--;
              } else {
                minute = 59;
                if (hour > 0) {
                  hour--;
                } else {
                  hour = 23;
                  if (day > 0) {
                    day--;
                  }
                }
              }
            }
            return { day, hour, minute, second };
          });
        }, 1e3);
        return () => clearInterval(timer);
      }, []);
      return /* @__PURE__ */ h("div", null, publishTime.day > 0 && `${publishTime.day}:`, publishTime.hour, ":", publishTime.minute, ":", publishTime.second);
    };
    const formatTimeInSeconds = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", { className: "m-plylist m-plylist-pl2 m-plylist_playlist m-plylist-sort", tabIndex: 1e3, id: "all-songs-list" }, /* @__PURE__ */ h("div", { className: "head sort f-cb j-flag" }, /* @__PURE__ */ h("div", { className: "fix" }, /* @__PURE__ */ h("div", { className: "th col" }, /* @__PURE__ */ h("span", { title: "\u8FD8\u539F\u9ED8\u8BA4\u6392\u5E8F", className: "icn-sort-btn" }, /* @__PURE__ */ h("a", { className: "j-flag" }, /* @__PURE__ */ h("i", null)), /* @__PURE__ */ h("a", { className: "f-dn z-def j-flag" }, /* @__PURE__ */ h("svg", { className: "u-icn u-icn-sort-reset" })))), /* @__PURE__ */ h("div", { className: "th col" }, "\u65F6\u95F4", /* @__PURE__ */ h("svg", { className: "u-icn u-icn-sort-hvr" }), /* @__PURE__ */ h("svg", { className: "u-icn u-icn-sort" }))), /* @__PURE__ */ h("div", { className: "flow j-flag" }, /* @__PURE__ */ h("div", { className: "th col", "data-res-action": "sort", "data-res-field": "title" }, /* @__PURE__ */ h("span", null, "\u6807\u9898 ")), /* @__PURE__ */ h("div", { className: "th col", "data-res-action": "sort", "data-res-field": "artist" }, /* @__PURE__ */ h("span", null, "\u6B4C\u624B")), /* @__PURE__ */ h("div", { className: "th col", "data-res-action": "sort", "data-res-field": "album" }, /* @__PURE__ */ h("span", null, "\u4E13\u8F91")), /* @__PURE__ */ h("div", { className: "th col", "data-res-action": "sort", "data-res-field": "duration" }, /* @__PURE__ */ h("span", null, "\u9884\u8BA1\u4E0A\u67B6\u65F6\u95F4")))), /* @__PURE__ */ h("ul", { className: "j-flag" }, /* @__PURE__ */ h("div", { id: "all-songs-list-wrapper-1", tabIndex: 1e4 }, /* @__PURE__ */ h("div", { className: "lst fixed-scroll-management", id: "all-songs-list-wrapper-2" }, /* @__PURE__ */ h("div", { className: "pl-di pl-di-1" }, /* @__PURE__ */ h("ul", { style: { counterReset: "tlistorder 0" } }, songList.map((song) => /* @__PURE__ */ h(
      "li",
      {
        key: song.url,
        className: "itm j-item j-impress",
        "data-res-menu": "true",
        "data-res-type": "4",
        "data-url": song.url
      },
      /* @__PURE__ */ h(
        "span",
        {
          title: "",
          className: "td col s-fc4",
          "data-url": song.url
        },
        formatTimeInSeconds(song.time)
      ),
      /* @__PURE__ */ h("div", { className: "flow" }, /* @__PURE__ */ h("div", { className: "td col title", "data-url": song.url }, /* @__PURE__ */ h("img", { src: song.cover, className: "cover", "data-url": song.url, alt: "cover" }), /* @__PURE__ */ h("span", { className: "tit s-fc1", title: song.name, "data-url": song.url }, song.name)), /* @__PURE__ */ h("div", { className: "td col ellipsis s-fc3 f-pr", title: song.author, "data-url": song.url }, song.author), /* @__PURE__ */ h("div", { className: "td col ellipsis", "data-url": song.url }, /* @__PURE__ */ h("a", { className: "s-fc3", title: song.albumname, "data-url": song.url }, song.albumname)), /* @__PURE__ */ h("div", { className: "td col s-fc4", "data-url": song.url }, /* @__PURE__ */ h(CountdownTimer, { initialPublishTime: song.publish_time })))
    )))))))), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
  };
  var NoNotrelease = () => {
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", { className: "m-plylist m-plylist-pl2 m-plylist_playlist m-plylist-sort" }, /* @__PURE__ */ h(
      "span",
      {
        style: {
          marginRight: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          display: "inline-block",
          verticalAlign: "middle",
          paddingLeft: "20px",
          paddingBottom: "20px",
          color: "#fff"
        }
      },
      "\u5DF2\u5168\u90E8\u4E0A\u67B6 \u53EF\u559C\u53EF\u8D3A"
    )), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
  };

  // src/source/kugou.ts
  var import_crypto_js = __toESM(require_crypto_js());
  var kugou_source = class {
    constructor() {
      this.list = [];
    }
    async kugou_enter() {
      try {
        var data = {
          data: [
            {
              albumid: 106683147,
              albumname: "\u7EDD\u533A\u96F62024Mix\u4E28\u6781\u9650\u59D4\u6258",
              img: "http://imge.kugou.com/stdmusic/240/20241017/20241017224213914467.jpg",
              publish_time: "2024-10-29",
              song_count: 1,
              singername: "\u4E09Z-STUDIO\u3001HOYO-MiX",
              encode_albumid: "1ril8rb0"
            },
            {
              albumid: 106700148,
              albumname: "\u5D29\u574F\u661F\u7A79\u94C1\u9053-\u4E0D\u4E71\u4E0D\u7834 No Dazzle, No Break",
              img: "http://imge.kugou.com/stdmusic/240/20241016/20241016111606971661.jpg",
              publish_time: "2024-10-29",
              song_count: 1,
              singername: "HOYO-MiX\u3001Reol",
              encode_albumid: "1riyd076"
            }
          ]
        };
        this.getalbum(data);
      } catch (error) {
        console.error("\u52A0\u8F7D\u4E13\u8F91\u5931\u8D25, Error:", error);
      }
    }
    getalbum(data) {
      const album = [];
      const now = /* @__PURE__ */ new Date();
      const sevenAndHalfDaysInMilliseconds = 7.5 * 24 * 60 * 60 * 1e3 - 6 * 60 * 60 * 1e3;
      for (let i = 0; i < data.data.length; i++) {
        const publishTime = new Date(data.data[i].publish_time);
        const differenceInTime = now.getTime() - publishTime.getTime();
        if (differenceInTime <= sevenAndHalfDaysInMilliseconds && differenceInTime >= 0) {
          album.push(data.data[i]);
          album[i].publish_time = this.formatTimeDifference(sevenAndHalfDaysInMilliseconds - differenceInTime);
        }
      }
      if (album.length === 0) {
        return this.list.push("\u5DF2\u5168\u90E8\u4E0A\u67B6");
      } else {
        this.album2song(album);
      }
    }
    formatTimeDifference(ms) {
      const totalSeconds = Math.floor(ms / 1e3);
      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor(totalSeconds % (24 * 60 * 60) / (60 * 60));
      const minutes = Math.floor(totalSeconds % (60 * 60) / 60);
      const seconds = totalSeconds % 60;
      return {
        day: days >= 0 ? days : 0,
        hour: hours,
        minute: minutes,
        second: seconds
      };
    }
    async album2song(data) {
      var album2list = { album2list: [] };
      for (var i = 0; i < data.length; i++) {
        try {
          var response = await fetch("http://mobilecdn.kugou.com/api/v3/album/song?version=9108&albumid=" + data[i].albumid + "&plat=0&pagesize=100&area_code=1&page=1&with_res_tag=1", {
            method: "GET",
            headers: {
              "User-Agent": "Mozilla/5.0 (Linux; U; Android 11; zh-cn; Redmi K30 Pro Build/RKQ1.200826.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/14.7.10"
            }
          });
          if (!response.ok) {
            throw new Error("\u7F51\u7EDC\u9519\u8BEF! status: ${response.status}");
          }
          var text = await response.text();
          var cleanedText = text.replace(/<!--KG_TAG_RES_START-->|<!--KG_TAG_RES_END-->/g, "");
          var json_data = JSON.parse(cleanedText);
          for (var l = 0; l < json_data.data.info.length; l++) {
            if (!album2list.album2list[i]) {
              album2list.album2list[i] = { song: [] };
            }
            if (!album2list.album2list[i].song[l]) {
              album2list.album2list[i].song[l] = { info: {} };
            }
            album2list.album2list[i].song[l].info.hash = json_data.data.info[l].hash;
            album2list.album2list[i].song[l].info.sqhash = json_data.data.info[l].sqhash;
            album2list.album2list[i].song[l].info.hqhash = json_data.data.info[l]["320hash"];
            album2list.album2list[i].song[l].info.audio_id = json_data.data.info[l].audio_id;
            album2list.album2list[i].song[l].info.album_id = json_data.data.info[l].album_id;
            album2list.album2list[i].song[l].info.cover = json_data.data.info[l].trans_param.union_cover;
            album2list.album2list[i].song[l].info.name = json_data.data.info[l].filename;
            album2list.album2list[i].song[l].info.publish_time = data[i].publish_time;
            album2list.album2list[i].song[l].info.albumname = data[i].albumname;
          }
        } catch (error) {
          console.error("\u63D0\u53D6\u4E13\u8F91\u5931\u8D25,Error:", error);
        }
      }
      this.getsongurl(album2list);
    }
    getsongurl(data) {
      var albumsong = { albumlist: [] };
      for (var i = 0; i < data.album2list.length; i++) {
        for (var l = 0; l < data.album2list[i].song.length; l++) {
          if (!albumsong.albumlist[i]) {
            albumsong.albumlist[i] = { song: [] };
          }
          if (!albumsong.albumlist[i].song[l]) {
            albumsong.albumlist[i].song[l] = { url: {} };
          }
          albumsong.albumlist[i].song[l].publish_time = data.album2list[i].song[l].info.publish_time;
          albumsong.albumlist[i].song[l].name = data.album2list[i].song[l].info.name;
          albumsong.albumlist[i].song[l].albumname = data.album2list[i].song[l].info.albumname;
          albumsong.albumlist[i].song[l].cover = data.album2list[i].song[l].info.cover;
          albumsong.albumlist[i].song[l].audio_id = data.album2list[i].song[l].info.audio_id;
          albumsong.albumlist[i].song[l].album_id = data.album2list[i].song[l].info.album_id;
          albumsong.albumlist[i].song[l].url.origin = "http://trackercdn.kugou.com/i/v2/?key=" + import_crypto_js.default.MD5(data.album2list[i].song[l].info.hash + "kgcloudv2").toString(import_crypto_js.default.enc.Hex) + "&hash=" + data.album2list[i].song[l].info.hash + "&appid=1005&pid=2&cmd=25&behavior=play&album_id=" + data.album2list[i].song[l].info.album_id;
          albumsong.albumlist[i].song[l].url.sq = "http://trackercdn.kugou.com/i/v2/?key=" + import_crypto_js.default.MD5(data.album2list[i].song[l].info.sqhash + "kgcloudv2").toString(import_crypto_js.default.enc.Hex) + "&hash=" + data.album2list[i].song[l].info.sqhash + "&appid=1005&pid=2&cmd=25&behavior=play&album_id=" + data.album2list[i].song[l].info.album_id;
          albumsong.albumlist[i].song[l].url.hq = "http://trackercdn.kugou.com/i/v2/?key=" + import_crypto_js.default.MD5(data.album2list[i].song[l].info.hqhash + "kgcloudv2").toString(import_crypto_js.default.enc.Hex) + "&hash=" + data.album2list[i].song[l].info.hqhash + "&appid=1005&pid=2&cmd=25&behavior=play&album_id=" + data.album2list[i].song[l].info.album_id;
        }
      }
      this.choose_qu(albumsong);
    }
    choose_qu(data) {
      var quality;
      switch (JSON.parse(localStorage.getItem("MHYNotRelease-quantity"))) {
        case 128:
          quality = "origin";
          break;
        case 320:
          quality = "hq";
          break;
        case 999:
          quality = "sq";
          break;
        case 1999:
          quality = "sq";
          break;
      }
      for (var i = 0; i < data.albumlist.length; i++) {
        for (var l = 0; l < data.albumlist[i].song.length; l++) {
          var url;
          switch (quality) {
            case "origin":
              url = data.albumlist[i].song[l].url.origin;
              break;
            case "hq":
              url = data.albumlist[i].song[l].url.hq;
              break;
            case "sq":
              url = data.albumlist[i].song[l].url.sq;
              break;
            default:
              console.error("\u97F3\u8D28\u9009\u62E9\u9519\u8BEF");
              return;
          }
          data.albumlist[i].song[l].url = url;
        }
      }
      this.list2json(data);
      console.log(data);
    }
    async list2json(data) {
      for (var i = 0; i < data.albumlist.length; i++) {
        for (var l = 0; l < data.albumlist[i].song.length; l++) {
          const parts = data.albumlist[i].song[l].name.split(" - ");
          try {
            var response = await fetch(data.albumlist[i].song[l].url);
            if (!response.ok) {
              throw new Error("\u7F51\u7EDC\u9519\u8BEF! status: ${response.status}");
            }
          } catch (error) {
            console.error("\u63D0\u53D6\u6B4C\u66F2\u5931\u8D25,Error:", error);
          }
          var data_get = await response.json();
          var song = {
            url: data_get.url[0],
            time: data_get.timeLength,
            albumname: data.albumlist[i].song[l].albumname,
            name: parts[1],
            author: parts[0],
            cover: ("orpheus://cache/?" + data.albumlist[i].song[l].cover).replace("{size}", "240"),
            publish_time: data.albumlist[i].song[l].publish_time
          };
          this.list.push(song);
        }
      }
      console.log(this.list);
    }
  };

  // src/ui/player.tsx
  var AudioPlayer = ({ url, tracks }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState("0:00");
    const [showCloseButton, setShowCloseButton] = React.useState(false);
    const [fadeOut, setFadeOut] = React.useState(false);
    const audioRef = React.useRef(null);
    React.useEffect(() => {
      const index = tracks.findIndex((track) => track.url === url);
      if (index !== -1) {
        setCurrentTrackIndex(index);
      }
    }, [url, tracks]);
    React.useEffect(() => {
      if (audioRef.current) {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
      }
    }, [isPlaying]);
    React.useEffect(() => {
      const elements = document.querySelectorAll(".has.j-flag");
      if (elements.length === 0)
        return;
      const observer = new MutationObserver(() => {
        const heights = Array.from(elements).map((el) => parseFloat(el.style.height)).filter((height) => !isNaN(height));
        if (heights.length === 0)
          return;
        const minHeight = Math.min(...heights);
        if (audioRef.current) {
          audioRef.current.volume = Math.max(0, Math.min(1, minHeight / 100));
        }
      });
      elements.forEach((el) => {
        observer.observe(el, { attributes: true, attributeFilter: ["style"] });
      });
      return () => observer.disconnect();
    }, []);
    React.useEffect(() => {
      const currentTrack2 = tracks[currentTrackIndex];
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentTrack2.name,
          artist: currentTrack2.author,
          album: currentTrack2.albumname,
          artwork: [{ src: currentTrack2.cover.replace("orpheus://cache/?", "").replace("/240", ""), type: "image/jpeg" }]
        });
        navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true));
        navigator.mediaSession.setActionHandler("pause", () => setIsPlaying(false));
        navigator.mediaSession.setActionHandler("nexttrack", () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length));
        navigator.mediaSession.setActionHandler("previoustrack", () => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length));
      }
    }, [currentTrackIndex, tracks]);
    React.useEffect(() => {
      const audioPlayer = document.querySelector("#audio-player");
      if (!audioPlayer)
        return;
      if (localStorage.getItem("MHYNotRelease-left0rright") == "right") {
        if (document.body.classList.contains("floating-bottombar")) {
          audioPlayer.style.right = "calc(50vw - var(--bottombar-width)/2)";
          audioPlayer.style.left = null;
        } else {
          audioPlayer.style.right = "calc(15px + var(--extra-pos-margin, 0px))";
          audioPlayer.style.left = null;
        }
      } else {
        if (document.body.classList.contains("floating-bottombar")) {
          audioPlayer.style.right = null;
          audioPlayer.style.left = "max(calc(var(--leftbar-width, 199px) + 15px + var(--extra-pos-margin, 0px)), calc(50vw - var(--bottombar-width)/2))";
        } else {
          audioPlayer.style.right = null;
          audioPlayer.style.left = "calc(var(--leftbar-width, 199px) + 15px + var(--extra-pos-margin, 0px))";
        }
      }
      if (localStorage.getItem("MHYNotRelease-bottom0rtop") == "bottom") {
        audioPlayer.style.bottom = "calc(var(--bottombar-height, 72px) + var(--bottombar-elevation, 0px) + 15px)";
        audioPlayer.style.top = null;
      } else {
        audioPlayer.style.bottom = null;
        audioPlayer.style.top = "75px";
      }
      if (localStorage.getItem("MHYNotRelease-opacity") == "true") {
        audioPlayer.style.background = "rgba(var(--md-accent-color-bg-rgb, var(--ncm-fg-rgb))," + opacitycss() + ")";
        audioPlayer.style.backdropFilter = "blur(" + blurcss() + "px)";
      } else {
        audioPlayer.style.background = "rgba(var(--md-accent-color-bg-rgb, var(--ncm-fg-rgb)),1)";
        audioPlayer.style.backdropFilter = null;
      }
    }, [localStorage.getItem("MHYNotRelease-opacity"), localStorage.getItem("MHYNotRelease-bottom0rtop"), localStorage.getItem("MHYNotRelease-left0rright")]);
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
    const playTrack = () => setIsPlaying(true);
    const pauseTrack = () => setIsPlaying(false);
    const nextTrack = () => setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    const previousTrack = () => setCurrentTrackIndex((prevIndex) => prevIndex === 0 ? tracks.length - 1 : prevIndex - 1);
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const current = audioRef.current.currentTime;
        setProgress(current / tracks[currentTrackIndex].time * 100);
        setCurrentTime(formatTime(current));
      }
    };
    const handleSeek = (event) => {
      if (audioRef.current) {
        const rect = event.target.getBoundingClientRect();
        const seekTime = (event.clientX - rect.left) / rect.width * tracks[currentTrackIndex].time;
        audioRef.current.currentTime = seekTime;
        setProgress(seekTime / tracks[currentTrackIndex].time * 100);
      }
    };
    const handleMouseEnter = () => {
      setShowCloseButton(true);
      setFadeOut(false);
    };
    const handleMouseLeave = () => {
      setFadeOut(true);
    };
    const handleClose = () => {
      pauseTrack();
      document.querySelector("#audio-player").remove();
    };
    const currentTrack = tracks[currentTrackIndex];
    const totalTime = formatTime(currentTrack.time);
    const blurcss = () => {
      if (localStorage.getItem("LyricBarBlurSettings")) {
        var css = JSON.parse(localStorage.getItem("LyricBarBlurSettings")).blur;
        return css;
      } else {
        return 5;
      }
    };
    const buttoncss = () => {
      return {
        color: "var(--md-accent-color-secondary)",
        background: "rgba(var(--md-accent-color-secondary-rgb), 0.4)",
        borderRadius: "5px",
        border: "none",
        margin: "0 5px"
      };
    };
    const opacitycss = () => {
      if (localStorage.getItem("LyricBarBlurSettings")) {
        var css = JSON.parse(localStorage.getItem("LyricBarBlurSettings")).bgTrans;
        return css;
      } else {
        return 0.4;
      }
    };
    const bgcss = () => {
      if (document.body.classList.contains("material-you-theme")) {
        return "var(--md-accent-color)";
      } else {
        return "var(--themePlay)";
      }
    };
    return /* @__PURE__ */ h(
      "div",
      {
        id: "audio-player",
        style: {
          position: "fixed",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          zIndex: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "var(--md-accent-color-secondary)",
          overflow: "hidden",
          backdropFilter: "blur(" + blurcss() + "px)",
          width: "auto",
          background: "rgba(var(--md-accent-color-bg-rgb, var(--ncm-fg-rgb)), 0.4)",
          height: "auto"
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      },
      showCloseButton && /* @__PURE__ */ h(
        "button",
        {
          title: "\u6682\u505C\u97F3\u4E50\u5E76\u5173\u95ED\u6B64\u7A97\u53E3",
          onClick: handleClose,
          style: {
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            borderRadius: "50%",
            width: "15px",
            height: "15px",
            background: "rgba(var(--md-accent-color-secondary-rgb)," + opacitycss() / 10 + ")",
            color: "var(--md-accent-color-secondary)",
            transition: "opacity 2s",
            opacity: fadeOut ? 0 : 1,
            cursor: "pointer",
            backdropFilter: "blur(5px)"
          }
        },
        "\xD7"
      ),
      /* @__PURE__ */ h(
        "div",
        {
          className: "fullplayerbar",
          onClick: handleSeek,
          style: {
            width: "100%",
            height: "5px",
            background: "linear-gradient(0deg, rgba(var(--md-accent-color-rgb), 0.15), rgba(var(--md-accent-color-rgb)," + opacitycss() / 10 + ")",
            cursor: "pointer",
            borderRadius: "2px",
            marginBottom: "8px"
          }
        },
        /* @__PURE__ */ h(
          "div",
          {
            className: "playerbar",
            style: {
              width: `${progress}%`,
              height: "100%",
              background: bgcss(),
              borderRadius: "2px"
            }
          }
        )
      ),
      /* @__PURE__ */ h("div", { style: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "0 5px 10px 10px"
      } }, /* @__PURE__ */ h(
        "img",
        {
          src: currentTrack.cover,
          alt: currentTrack.name,
          style: {
            width: "56px",
            height: "56px",
            borderRadius: "8px",
            marginRight: "10px",
            marginLeft: "10px"
          }
        }
      ), /* @__PURE__ */ h("div", { style: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
      } }, /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h3", { style: { fontSize: "1.3em" } }, currentTrack.name), /* @__PURE__ */ h("p", { style: { fontSize: "1em" } }, currentTrack.author)), /* @__PURE__ */ h("div", { style: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
      } }, /* @__PURE__ */ h("span", { style: { width: "40px", textAlign: "center" } }, currentTime), /* @__PURE__ */ h(
        "button",
        {
          onClick: previousTrack,
          style: buttoncss()
        },
        "\u4E0A\u4E00\u9996"
      ), isPlaying ? /* @__PURE__ */ h(
        "button",
        {
          onClick: pauseTrack,
          style: buttoncss()
        },
        "\u6682\u505C"
      ) : /* @__PURE__ */ h(
        "button",
        {
          onClick: playTrack,
          style: buttoncss()
        },
        "\u64AD\u653E"
      ), /* @__PURE__ */ h(
        "button",
        {
          onClick: nextTrack,
          style: buttoncss()
        },
        "\u4E0B\u4E00\u9996"
      ), /* @__PURE__ */ h("span", { style: { width: "40px", textAlign: "center" } }, totalTime)))),
      /* @__PURE__ */ h(
        "audio",
        {
          ref: audioRef,
          src: currentTrack.url,
          onEnded: nextTrack,
          onTimeUpdate: handleTimeUpdate,
          autoPlay: true
        }
      )
    );
  };

  // src/main.tsx
  var kugou = new kugou_source();
  plugin.onConfig(() => {
    const element = document.createElement("div");
    setTimeout(() => {
      ReactDOM.render(/* @__PURE__ */ h(Config, null), element);
    }, 4e3);
    return element;
  });
  plugin.onLoad(async () => {
    window.addEventListener("hashchange", async () => {
      if (window.location.href != "orpheus://orpheus/pub/app.html#/m/artist/?id=12487174") {
        return;
      }
      await betterncm.utils.waitForElement(".m-yrsh.g-wrap1.q-lrc .u-tab2 ul li");
      if (document.getElementById("wonhyle-tab")) {
        document.getElementById("wonhyle-tab").remove();
      }
      if (document.getElementById("mhy-page-root")) {
        document.getElementById("mhy-page-root").remove();
      }
      let womhyle = document.createElement("a");
      womhyle.className = "text_tab";
      womhyle.id = "wheremymhymuisc";
      womhyle.innerText = "\u672A\u4E0A\u67B6\u6B4C\u66F2";
      let womhylebtn = document.createElement("li");
      womhylebtn.appendChild(womhyle);
      womhylebtn.id = "wonhyle-tab";
      document.querySelector(".m-yrsh.g-wrap1.q-lrc .u-tab2 ul li").parentNode.appendChild(womhylebtn);
      const root = document.createElement("div");
      root.id = "mhy-page-root";
      root.style.display = "none";
      document.querySelector(".m-yrsh.g-wrap1.q-lrc").appendChild(root);
      const artistTabs = document.querySelector(".m-yrsh.g-wrap1.q-lrc .u-tab2 ul");
      artistTabs.addEventListener("click", (event) => {
        const targetTabText = event.target;
        womhylebtn.querySelectorAll(".text_tab").forEach((tabText) => {
          tabText.classList.remove("z-sel");
        });
        targetTabText.classList.add("z-sel");
        const originalPage = document.querySelector(".m-yrsh.g-wrap1.q-lrc div.q-lrc");
        if (targetTabText.matches("#wheremymhymuisc")) {
          root.style.display = null;
          originalPage.style.display = "none";
          document.querySelector(".j-flag.style.u-stab").style.display = "none";
        } else {
          root.style.display = "none";
          originalPage.style.display = null;
          document.querySelector(".j-flag.style.u-stab").style.display = null;
        }
      });
      if (kugou.list.length === 0) {
        kugou.kugou_enter();
      }
      await betterncm.utils.delay(3e3);
      if (kugou.list.length === 0) {
        return console.log("\u6211\u7C73\u54C8\u6E38\u9996\u53D1\u97F3\u4E50\u5462: \u65E0\u6CD5\u52A0\u8F7D\u6E05\u5355");
      } else if (kugou.list.includes("\u5DF2\u5168\u90E8\u4E0A\u67B6")) {
        return ReactDOM.render(/* @__PURE__ */ h(NoNotrelease, null), root);
      }
      ReactDOM.render(/* @__PURE__ */ h(Playlist, { songList: kugou.list }), root);
      await betterncm.utils.delay(100);
      document.querySelector("#mhy-page-root .pl-di.pl-di-1").addEventListener("click", function(event) {
        const target = event.target;
        const url = target.getAttribute("data-url");
        console.log(url);
        if (document.getElementById("audio-player")) {
          document.getElementById("audio-player").remove();
        }
        const playertarget = document.getElementById("x-g-mn");
        const playerContainer = document.createElement("div");
        playertarget.appendChild(playerContainer);
        root.style.display = null;
        ReactDOM.render(/* @__PURE__ */ h(AudioPlayer, { url, tracks: kugou.list }), playerContainer);
      });
    });
  });
})();
/*! Bundled license information:

crypto-js/ripemd160.js:
  (** @preserve
  	(c) 2012 by Cédric Mesnil. All rights reserved.
  
  	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
  	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
  	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  	*)

crypto-js/mode-ctr-gladman.js:
  (** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9jb3JlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMveDY0LWNvcmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9saWItdHlwZWRhcnJheXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtdXRmMTYuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtYmFzZTY0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvZW5jLWJhc2U2NHVybC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL21kNS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTEuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEyNTYuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEyMjQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGE1MTIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEzODQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcmlwZW1kMTYwLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvaG1hYy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL3Bia2RmMi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2V2cGtkZi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2NpcGhlci1jb3JlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbW9kZS1jZmIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tb2RlLWN0ci5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL21vZGUtY3RyLWdsYWRtYW4uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tb2RlLW9mYi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL21vZGUtZWNiLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcGFkLWFuc2l4OTIzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcGFkLWlzbzEwMTI2LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcGFkLWlzbzk3OTcxLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcGFkLXplcm9wYWRkaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvcGFkLW5vcGFkZGluZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2Zvcm1hdC1oZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9hZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy90cmlwbGVkZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9yYzQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9yYWJiaXQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9yYWJiaXQtbGVnYWN5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvYmxvd2Zpc2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9pbmRleC5qcyIsICIuLi9zcmMvdWkvY29uZmlnLnRzeCIsICIuLi9zcmMvdWkvcGFnZS50c3giLCAiLi4vc3JjL3NvdXJjZS9rdWdvdS50cyIsICIuLi9zcmMvdWkvcGxheWVyLnRzeCIsICIuLi9zcmMvbWFpbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKmdsb2JhbHMgd2luZG93LCBnbG9iYWwsIHJlcXVpcmUqL1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXG5cdCAgICB2YXIgY3J5cHRvO1xuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGluIHdlYiB3b3JrZXIgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gc2VsZi5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3b3JrZXJcblx0ICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWxUaGlzLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIChleHBlcmltZW50YWwgSUUgMTEpIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tc0NyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5tc0NyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIGdsb2JhbCAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbC5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW1wb3J0IHZpYSByZXF1aXJlIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgIH1cblxuXHQgICAgLypcblx0ICAgICAqIENyeXB0b2dyYXBoaWNhbGx5IHNlY3VyZSBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuXHQgICAgICpcblx0ICAgICAqIEFzIE1hdGgucmFuZG9tKCkgaXMgY3J5cHRvZ3JhcGhpY2FsbHkgbm90IHNhZmUgdG8gdXNlXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcnlwdG9TZWN1cmVSYW5kb21JbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKGNyeXB0bykge1xuXHQgICAgICAgICAgICAvLyBVc2UgZ2V0UmFuZG9tVmFsdWVzIG1ldGhvZCAoQnJvd3Nlcilcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgxKSlbMF07XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBVc2UgcmFuZG9tQnl0ZXMgbWV0aG9kIChOb2RlSlMpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLnJhbmRvbUJ5dGVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoNCkucmVhZEludDMyTEUoKTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignTmF0aXZlIGNyeXB0byBtb2R1bGUgY291bGQgbm90IGJlIHVzZWQgdG8gZ2V0IHNlY3VyZSByYW5kb20gbnVtYmVyLicpO1xuXHQgICAgfTtcblxuXHQgICAgLypcblx0ICAgICAqIExvY2FsIHBvbHlmaWxsIG9mIE9iamVjdC5jcmVhdGVcblxuXHQgICAgICovXG5cdCAgICB2YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG5cdCAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgICAgICAgdmFyIHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvYmo7XG5cblx0ICAgICAgICAgICAgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBudWxsO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIENyeXB0b0pTIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMaWJyYXJ5IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbGliID0gQy5saWIgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlIG9iamVjdCBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IGNyZWF0ZSh0aGlzKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpIHx8IHRoaXMuaW5pdCA9PT0gc3VidHlwZS5pbml0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGF0U2lnQnl0ZXM7IGogKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaikgPj4+IDJdID0gdGhhdFdvcmRzW2ogPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkJ5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goY3J5cHRvU2VjdXJlUmFuZG9tSW50KCkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBYMzJXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogeDY0IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfeDY0ID0gQy54NjQgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIDY0LWJpdCB3b3JkLlxuXHQgICAgICovXG5cdCAgICB2YXIgWDY0V29yZCA9IENfeDY0LldvcmQgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIDY0LWJpdCB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGhpZ2ggVGhlIGhpZ2ggMzIgYml0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbG93IFRoZSBsb3cgMzIgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHg2NFdvcmQgPSBDcnlwdG9KUy54NjQuV29yZC5jcmVhdGUoMHgwMDAxMDIwMywgMHgwNDA1MDYwNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGhpZ2gsIGxvdykge1xuXHQgICAgICAgICAgICB0aGlzLmhpZ2ggPSBoaWdoO1xuXHQgICAgICAgICAgICB0aGlzLmxvdyA9IGxvdztcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE5PVHMgdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIG5lZ2F0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbmVnYXRlZCA9IHg2NFdvcmQubm90KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gbm90OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gfnRoaXMuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IH50aGlzLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQml0d2lzZSBBTkRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gQU5EIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIEFORGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFuZGVkID0geDY0V29yZC5hbmQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFuZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggJiB3b3JkLmhpZ2g7XG5cdCAgICAgICAgICAgIC8vIHZhciBsb3cgPSB0aGlzLmxvdyAmIHdvcmQubG93O1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBCaXR3aXNlIE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIE9SIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIE9SaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgb3JlZCA9IHg2NFdvcmQub3IoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIG9yOiBmdW5jdGlvbiAod29yZCkge1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9IHRoaXMuaGlnaCB8IHdvcmQuaGlnaDtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9IHRoaXMubG93IHwgd29yZC5sb3c7XG5cblx0ICAgICAgICAgICAgLy8gcmV0dXJuIFg2NFdvcmQuY3JlYXRlKGhpZ2gsIGxvdyk7XG5cdCAgICAgICAgLy8gfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEJpdHdpc2UgWE9ScyB0aGlzIHdvcmQgd2l0aCB0aGUgcGFzc2VkIHdvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1g2NFdvcmR9IHdvcmQgVGhlIHg2NC1Xb3JkIHRvIFhPUiB3aXRoIHRoaXMgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciBYT1JpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB4b3JlZCA9IHg2NFdvcmQueG9yKGFub3RoZXJYNjRXb3JkKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICAvLyB4b3I6IGZ1bmN0aW9uICh3b3JkKSB7XG5cdCAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5oaWdoIF4gd29yZC5oaWdoO1xuXHQgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgXiB3b3JkLmxvdztcblxuXHQgICAgICAgICAgICAvLyByZXR1cm4gWDY0V29yZC5jcmVhdGUoaGlnaCwgbG93KTtcblx0ICAgICAgICAvLyB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU2hpZnRzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdEwoMjUpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIHNoaWZ0TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gaWYgKG4gPCAzMikge1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSAodGhpcy5oaWdoIDw8IG4pIHwgKHRoaXMubG93ID4+PiAoMzIgLSBuKSk7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5sb3cgPDwgbjtcblx0ICAgICAgICAgICAgLy8gfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gdGhpcy5sb3cgPDwgKG4gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBTaGlmdHMgdGhpcyB3b3JkIG4gYml0cyB0byB0aGUgcmlnaHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtYNjRXb3JkfSBBIG5ldyB4NjQtV29yZCBvYmplY3QgYWZ0ZXIgc2hpZnRpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzaGlmdGVkID0geDY0V29yZC5zaGlmdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gc2hpZnRSOiBmdW5jdGlvbiAobikge1xuXHQgICAgICAgICAgICAvLyBpZiAobiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gKHRoaXMubG93ID4+PiBuKSB8ICh0aGlzLmhpZ2ggPDwgKDMyIC0gbikpO1xuXHQgICAgICAgICAgICAgICAgLy8gdmFyIGhpZ2ggPSB0aGlzLmhpZ2ggPj4+IG47XG5cdCAgICAgICAgICAgIC8vIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyB2YXIgbG93ID0gdGhpcy5oaWdoID4+PiAobiAtIDMyKTtcblx0ICAgICAgICAgICAgICAgIC8vIHZhciBoaWdoID0gMDtcblx0ICAgICAgICAgICAgLy8gfVxuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIGxlZnQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcm90YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIHJvdGF0aW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcm90YXRlZCA9IHg2NFdvcmQucm90TCgyNSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90TDogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRMKG4pLm9yKHRoaXMuc2hpZnRSKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSb3RhdGVzIHRoaXMgd29yZCBuIGJpdHMgdG8gdGhlIHJpZ2h0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJvdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmR9IEEgbmV3IHg2NC1Xb3JkIG9iamVjdCBhZnRlciByb3RhdGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHJvdGF0ZWQgPSB4NjRXb3JkLnJvdFIoNyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgLy8gcm90UjogZnVuY3Rpb24gKG4pIHtcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2hpZnRSKG4pLm9yKHRoaXMuc2hpZnRMKDY0IC0gbikpO1xuXHQgICAgICAgIC8vIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIHRoaXMgd29yZCB3aXRoIHRoZSBwYXNzZWQgd29yZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7WDY0V29yZH0gd29yZCBUaGUgeDY0LVdvcmQgdG8gYWRkIHdpdGggdGhpcyB3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7WDY0V29yZH0gQSBuZXcgeDY0LVdvcmQgb2JqZWN0IGFmdGVyIGFkZGluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGFkZGVkID0geDY0V29yZC5hZGQoYW5vdGhlclg2NFdvcmQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIC8vIGFkZDogZnVuY3Rpb24gKHdvcmQpIHtcblx0ICAgICAgICAgICAgLy8gdmFyIGxvdyA9ICh0aGlzLmxvdyArIHdvcmQubG93KSB8IDA7XG5cdCAgICAgICAgICAgIC8vIHZhciBjYXJyeSA9IChsb3cgPj4+IDApIDwgKHRoaXMubG93ID4+PiAwKSA/IDEgOiAwO1xuXHQgICAgICAgICAgICAvLyB2YXIgaGlnaCA9ICh0aGlzLmhpZ2ggKyB3b3JkLmhpZ2ggKyBjYXJyeSkgfCAwO1xuXG5cdCAgICAgICAgICAgIC8vIHJldHVybiBYNjRXb3JkLmNyZWF0ZShoaWdoLCBsb3cpO1xuXHQgICAgICAgIC8vIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDY0LWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgQ3J5cHRvSlMueDY0LldvcmQgb2JqZWN0cy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLng2NC5Xb3JkQXJyYXkuY3JlYXRlKFtcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDAwMDEwMjAzLCAweDA0MDUwNjA3KSxcblx0ICAgICAgICAgKiAgICAgICAgIENyeXB0b0pTLng2NC5Xb3JkLmNyZWF0ZSgweDE4MTkxYTFiLCAweDFjMWQxZTFmKVxuXHQgICAgICAgICAqICAgICBdKTtcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMueDY0LldvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MDAwMTAyMDMsIDB4MDQwNTA2MDcpLFxuXHQgICAgICAgICAqICAgICAgICAgQ3J5cHRvSlMueDY0LldvcmQuY3JlYXRlKDB4MTgxOTFhMWIsIDB4MWMxZDFlMWYpXG5cdCAgICAgICAgICogICAgIF0sIDEwKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgNjQtYml0IHdvcmQgYXJyYXkgdG8gYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NyeXB0b0pTLmxpYi5Xb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheSdzIGRhdGEgYXMgYSAzMi1iaXQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHgzMldvcmRBcnJheSA9IHg2NFdvcmRBcnJheS50b1gzMigpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvWDMyOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgeDY0V29yZHNMZW5ndGggPSB4NjRXb3Jkcy5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgeDMyV29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4NjRXb3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgeDY0V29yZCA9IHg2NFdvcmRzW2ldO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmhpZ2gpO1xuXHQgICAgICAgICAgICAgICAgeDMyV29yZHMucHVzaCh4NjRXb3JkLmxvdyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gWDMyV29yZEFycmF5LmNyZWF0ZSh4MzJXb3JkcywgdGhpcy5zaWdCeXRlcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1g2NFdvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB4NjRXb3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUgXCJ3b3Jkc1wiIGFycmF5XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBlYWNoIFg2NFdvcmQgb2JqZWN0XG5cdCAgICAgICAgICAgIHZhciB3b3Jkc0xlbmd0aCA9IHdvcmRzLmxlbmd0aDtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkc0xlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldLmNsb25lKCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gQ2hlY2sgaWYgdHlwZWQgYXJyYXlzIGFyZSBzdXBwb3J0ZWRcblx0ICAgIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHJldHVybjtcblx0ICAgIH1cblxuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXG5cdCAgICAvLyBSZWZlcmVuY2Ugb3JpZ2luYWwgaW5pdFxuXHQgICAgdmFyIHN1cGVySW5pdCA9IFdvcmRBcnJheS5pbml0O1xuXG5cdCAgICAvLyBBdWdtZW50IFdvcmRBcnJheS5pbml0IHRvIGhhbmRsZSB0eXBlZCBhcnJheXNcblx0ICAgIHZhciBzdWJJbml0ID0gV29yZEFycmF5LmluaXQgPSBmdW5jdGlvbiAodHlwZWRBcnJheSkge1xuXHQgICAgICAgIC8vIENvbnZlcnQgYnVmZmVycyB0byB1aW50OFxuXHQgICAgICAgIGlmICh0eXBlZEFycmF5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSA9IG5ldyBVaW50OEFycmF5KHR5cGVkQXJyYXkpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENvbnZlcnQgb3RoZXIgYXJyYXkgdmlld3MgdG8gdWludDhcblx0ICAgICAgICBpZiAoXG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBJbnQ4QXJyYXkgfHxcblx0ICAgICAgICAgICAgKHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlZEFycmF5IGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHx8XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBJbnQxNkFycmF5IHx8XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBVaW50MTZBcnJheSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgSW50MzJBcnJheSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgVWludDMyQXJyYXkgfHxcblx0ICAgICAgICAgICAgdHlwZWRBcnJheSBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSB8fFxuXHQgICAgICAgICAgICB0eXBlZEFycmF5IGluc3RhbmNlb2YgRmxvYXQ2NEFycmF5XG5cdCAgICAgICAgKSB7XG5cdCAgICAgICAgICAgIHR5cGVkQXJyYXkgPSBuZXcgVWludDhBcnJheSh0eXBlZEFycmF5LmJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5LmJ5dGVMZW5ndGgpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIEhhbmRsZSBVaW50OEFycmF5XG5cdCAgICAgICAgaWYgKHR5cGVkQXJyYXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciB0eXBlZEFycmF5Qnl0ZUxlbmd0aCA9IHR5cGVkQXJyYXkuYnl0ZUxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBFeHRyYWN0IGJ5dGVzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkQXJyYXlCeXRlTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDJdIHw9IHR5cGVkQXJyYXlbaV0gPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGlzIHdvcmQgYXJyYXlcblx0ICAgICAgICAgICAgc3VwZXJJbml0LmNhbGwodGhpcywgd29yZHMsIHR5cGVkQXJyYXlCeXRlTGVuZ3RoKTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvLyBFbHNlIGNhbGwgbm9ybWFsIGluaXRcblx0ICAgICAgICAgICAgc3VwZXJJbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgc3ViSW5pdC5wcm90b3R5cGUgPSBXb3JkQXJyYXk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMubGliLldvcmRBcnJheTtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBVVEYtMTYgQkUgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGYxNkJFID0gQ19lbmMuVXRmMTYgPSBDX2VuYy5VdGYxNkJFID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIFVURi0xNiBCRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTE2IEJFIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjE2U3RyaW5nID0gQ3J5cHRvSlMuZW5jLlV0ZjE2LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgdXRmMTZDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgxNiAtIChpICUgNCkgKiA4KSkgJiAweGZmZmY7XG5cdCAgICAgICAgICAgICAgICB1dGYxNkNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB1dGYxNkNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi0xNiBCRSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjE2U3RyIFRoZSBVVEYtMTYgQkUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGYxNi5wYXJzZSh1dGYxNlN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh1dGYxNlN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgdXRmMTZTdHJMZW5ndGggPSB1dGYxNlN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1dGYxNlN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAxXSB8PSB1dGYxNlN0ci5jaGFyQ29kZUF0KGkpIDw8ICgxNiAtIChpICUgMikgKiAxNik7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gV29yZEFycmF5LmNyZWF0ZSh3b3JkcywgdXRmMTZTdHJMZW5ndGggKiAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi0xNiBMRSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgQ19lbmMuVXRmMTZMRSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtMTYgTEUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi0xNiBMRSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB1dGYxNlN0ciA9IENyeXB0b0pTLmVuYy5VdGYxNkxFLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgdXRmMTZDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSBzd2FwRW5kaWFuKCh3b3Jkc1tpID4+PiAyXSA+Pj4gKDE2IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmZmZik7XG5cdCAgICAgICAgICAgICAgICB1dGYxNkNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnQpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB1dGYxNkNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi0xNiBMRSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjE2U3RyIFRoZSBVVEYtMTYgTEUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGYxNkxFLnBhcnNlKHV0ZjE2U3RyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjE2U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciB1dGYxNlN0ckxlbmd0aCA9IHV0ZjE2U3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHV0ZjE2U3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDFdIHw9IHN3YXBFbmRpYW4odXRmMTZTdHIuY2hhckNvZGVBdChpKSA8PCAoMTYgLSAoaSAlIDIpICogMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBXb3JkQXJyYXkuY3JlYXRlKHdvcmRzLCB1dGYxNlN0ckxlbmd0aCAqIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIGZ1bmN0aW9uIHN3YXBFbmRpYW4od29yZCkge1xuXHQgICAgICAgIHJldHVybiAoKHdvcmQgPDwgOCkgJiAweGZmMDBmZjAwKSB8ICgod29yZCA+Pj4gOCkgJiAweDAwZmYwMGZmKTtcblx0ICAgIH1cblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuVXRmMTY7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZTY0IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZTY0ID0gQ19lbmMuQmFzZTY0ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIEJhc2U2NCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGJhc2U2NFN0cmluZyA9IENyeXB0b0pTLmVuYy5CYXNlNjQuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMSA9ICh3b3Jkc1tpID4+PiAyXSAgICAgICA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAgICAgICAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTIgPSAod29yZHNbKGkgKyAxKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDEpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUzID0gKHdvcmRzWyhpICsgMikgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAyKSAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZTEgPDwgMTYpIHwgKGJ5dGUyIDw8IDgpIHwgYnl0ZTM7XG5cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyAoaiA8IDQpICYmIChpICsgaiAqIDAuNzUgPCBzaWdCeXRlcyk7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gobWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gKDYgKiAoMyAtIGopKSkgJiAweDNmKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB3aGlsZSAoYmFzZTY0Q2hhcnMubGVuZ3RoICUgNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGJhc2U2NENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIEJhc2U2NCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2U2NFN0ciBUaGUgQmFzZTY0IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuQmFzZTY0LnBhcnNlKGJhc2U2NFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChiYXNlNjRTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRTdHJMZW5ndGggPSBiYXNlNjRTdHIubGVuZ3RoO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHQgICAgICAgICAgICB2YXIgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXA7XG5cblx0ICAgICAgICAgICAgaWYgKCFyZXZlcnNlTWFwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXAgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcC5sZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlTWFwW21hcC5jaGFyQ29kZUF0KGopXSA9IGo7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSWdub3JlIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdDaGFyID0gbWFwLmNoYXJBdCg2NCk7XG5cdCAgICAgICAgICAgIGlmIChwYWRkaW5nQ2hhcikge1xuXHQgICAgICAgICAgICAgICAgdmFyIHBhZGRpbmdJbmRleCA9IGJhc2U2NFN0ci5pbmRleE9mKHBhZGRpbmdDaGFyKTtcblx0ICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nSW5kZXggIT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmFzZTY0U3RyTGVuZ3RoID0gcGFkZGluZ0luZGV4O1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICByZXR1cm4gcGFyc2VMb29wKGJhc2U2NFN0ciwgYmFzZTY0U3RyTGVuZ3RoLCByZXZlcnNlTWFwKTtcblxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWFwOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nXG5cdCAgICB9O1xuXG5cdCAgICBmdW5jdGlvbiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApIHtcblx0ICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgIHZhciBuQnl0ZXMgPSAwO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NFN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICBpZiAoaSAlIDQpIHtcblx0ICAgICAgICAgICAgICB2YXIgYml0czEgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkgLSAxKV0gPDwgKChpICUgNCkgKiAyKTtcblx0ICAgICAgICAgICAgICB2YXIgYml0czIgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkpXSA+Pj4gKDYgLSAoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgdmFyIGJpdHNDb21iaW5lZCA9IGJpdHMxIHwgYml0czI7XG5cdCAgICAgICAgICAgICAgd29yZHNbbkJ5dGVzID4+PiAyXSB8PSBiaXRzQ29tYmluZWQgPDwgKDI0IC0gKG5CeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgbkJ5dGVzKys7XG5cdCAgICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIG5CeXRlcyk7XG5cdCAgICB9XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuZW5jLkJhc2U2NDtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlNjR1cmwgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlNjR1cmwgPSBDX2VuYy5CYXNlNjR1cmwgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgQmFzZTY0dXJsIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVybFNhZmUgV2hldGhlciB0byB1c2UgdXJsIHNhZmVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIEJhc2U2NHVybCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBiYXNlNjRTdHJpbmcgPSBDcnlwdG9KUy5lbmMuQmFzZTY0dXJsLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSwgdXJsU2FmZSkge1xuXHQgICAgICAgICAgICBpZiAodXJsU2FmZSA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB1cmxTYWZlID0gdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIG1hcCA9IHVybFNhZmUgPyB0aGlzLl9zYWZlX21hcCA6IHRoaXMuX21hcDtcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpICs9IDMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBieXRlMSA9ICh3b3Jkc1tpID4+PiAyXSAgICAgICA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAgICAgICAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICB2YXIgYnl0ZTIgPSAod29yZHNbKGkgKyAxKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDEpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgdmFyIGJ5dGUzID0gKHdvcmRzWyhpICsgMikgPj4+IDJdID4+PiAoMjQgLSAoKGkgKyAyKSAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZTEgPDwgMTYpIHwgKGJ5dGUyIDw8IDgpIHwgYnl0ZTM7XG5cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyAoaiA8IDQpICYmIChpICsgaiAqIDAuNzUgPCBzaWdCeXRlcyk7IGorKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gobWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gKDYgKiAoMyAtIGopKSkgJiAweDNmKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB3aGlsZSAoYmFzZTY0Q2hhcnMubGVuZ3RoICUgNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGJhc2U2NENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIEJhc2U2NHVybCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2U2NFN0ciBUaGUgQmFzZTY0dXJsIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXJsU2FmZSBXaGV0aGVyIHRvIHVzZSB1cmwgc2FmZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5CYXNlNjR1cmwucGFyc2UoYmFzZTY0U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGJhc2U2NFN0ciwgdXJsU2FmZSkge1xuXHQgICAgICAgICAgICBpZiAodXJsU2FmZSA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB1cmxTYWZlID0gdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBiYXNlNjRTdHJMZW5ndGggPSBiYXNlNjRTdHIubGVuZ3RoO1xuXHQgICAgICAgICAgICB2YXIgbWFwID0gdXJsU2FmZSA/IHRoaXMuX3NhZmVfbWFwIDogdGhpcy5fbWFwO1xuXHQgICAgICAgICAgICB2YXIgcmV2ZXJzZU1hcCA9IHRoaXMuX3JldmVyc2VNYXA7XG5cblx0ICAgICAgICAgICAgaWYgKCFyZXZlcnNlTWFwKSB7XG5cdCAgICAgICAgICAgICAgICByZXZlcnNlTWFwID0gdGhpcy5fcmV2ZXJzZU1hcCA9IFtdO1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtYXAubGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXZlcnNlTWFwW21hcC5jaGFyQ29kZUF0KGopXSA9IGo7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJZ25vcmUgcGFkZGluZ1xuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ0NoYXIgPSBtYXAuY2hhckF0KDY0KTtcblx0ICAgICAgICAgICAgaWYgKHBhZGRpbmdDaGFyKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcGFkZGluZ0luZGV4ID0gYmFzZTY0U3RyLmluZGV4T2YocGFkZGluZ0NoYXIpO1xuXHQgICAgICAgICAgICAgICAgaWYgKHBhZGRpbmdJbmRleCAhPT0gLTEpIHtcblx0ICAgICAgICAgICAgICAgICAgICBiYXNlNjRTdHJMZW5ndGggPSBwYWRkaW5nSW5kZXg7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHJldHVybiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApO1xuXG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9tYXA6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPScsXG5cdCAgICAgICAgX3NhZmVfbWFwOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktXycsXG5cdCAgICB9O1xuXG5cdCAgICBmdW5jdGlvbiBwYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHJldmVyc2VNYXApIHtcblx0ICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICB2YXIgbkJ5dGVzID0gMDtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NFN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGlmIChpICUgNCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdHMxID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpIC0gMSldIDw8ICgoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0czIgPSByZXZlcnNlTWFwW2Jhc2U2NFN0ci5jaGFyQ29kZUF0KGkpXSA+Pj4gKDYgLSAoaSAlIDQpICogMik7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0c0NvbWJpbmVkID0gYml0czEgfCBiaXRzMjtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW25CeXRlcyA+Pj4gMl0gfD0gYml0c0NvbWJpbmVkIDw8ICgyNCAtIChuQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgbkJ5dGVzKys7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIFdvcmRBcnJheS5jcmVhdGUod29yZHMsIG5CeXRlcyk7XG5cdCAgICB9XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuZW5jLkJhc2U2NHVybDtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZVxuXHQgICAgdmFyIFQgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgIFRbaV0gPSAoTWF0aC5hYnMoTWF0aC5zaW4oaSArIDEpKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBNRDUgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBNRDUgPSBDX2FsZ28uTUQ1ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LFxuXHQgICAgICAgICAgICAgICAgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NlxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0X2kgPSBvZmZzZXQgKyBpO1xuXHQgICAgICAgICAgICAgICAgdmFyIE1fb2Zmc2V0X2kgPSBNW29mZnNldF9pXTtcblxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXRfaV0gPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCA4KSAgfCAoTV9vZmZzZXRfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDI0KSB8IChNX29mZnNldF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8wICA9IE1bb2Zmc2V0ICsgMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xICA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8yICA9IE1bb2Zmc2V0ICsgMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8zICA9IE1bb2Zmc2V0ICsgM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF80ICA9IE1bb2Zmc2V0ICsgNF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF81ICA9IE1bb2Zmc2V0ICsgNV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF82ICA9IE1bb2Zmc2V0ICsgNl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF83ICA9IE1bb2Zmc2V0ICsgN107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF84ICA9IE1bb2Zmc2V0ICsgOF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF85ICA9IE1bb2Zmc2V0ICsgOV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMCA9IE1bb2Zmc2V0ICsgMTBdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTEgPSBNW29mZnNldCArIDExXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEyID0gTVtvZmZzZXQgKyAxMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMyA9IE1bb2Zmc2V0ICsgMTNdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTQgPSBNW29mZnNldCArIDE0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzE1ID0gTVtvZmZzZXQgKyAxNV07XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF8wLCAgNywgIFRbMF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMSwgIDEyLCBUWzFdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNywgVFsyXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8zLCAgMjIsIFRbM10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDcsICBUWzRdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzUsICAxMiwgVFs1XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTcsIFRbNl0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfNywgIDIyLCBUWzddKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA3LCAgVFs4XSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF85LCAgMTIsIFRbOV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE3LCBUWzEwXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8xMSwgMjIsIFRbMTFdKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEyLCA3LCAgVFsxMl0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTMsIDEyLCBUWzEzXSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTcsIFRbMTRdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzE1LCAyMiwgVFsxNV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNSwgIFRbMTZdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzYsICA5LCAgVFsxN10pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE0LCBUWzE4XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8wLCAgMjAsIFRbMTldKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzUsICA1LCAgVFsyMF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMTAsIDksICBUWzIxXSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xNSwgMTQsIFRbMjJdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzQsICAyMCwgVFsyM10pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDUsICBUWzI0XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xNCwgOSwgIFRbMjVdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNCwgVFsyNl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfOCwgIDIwLCBUWzI3XSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xMywgNSwgIFRbMjhdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzIsICA5LCAgVFsyOV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE0LCBUWzMwXSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8xMiwgMjAsIFRbMzFdKTtcblxuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDQsICBUWzMyXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF84LCAgMTEsIFRbMzNdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzExLCAxNiwgVFszNF0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTQsIDIzLCBUWzM1XSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNCwgIFRbMzZdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzQsICAxMSwgVFszN10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE2LCBUWzM4XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xMCwgMjMsIFRbMzldKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA0LCAgVFs0MF0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfMCwgIDExLCBUWzQxXSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8zLCAgMTYsIFRbNDJdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzYsICAyMywgVFs0M10pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDQsICBUWzQ0XSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8xMiwgMTEsIFRbNDVdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNiwgVFs0Nl0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMiwgIDIzLCBUWzQ3XSk7XG5cblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA2LCAgVFs0OF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfNywgIDEwLCBUWzQ5XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTUsIFRbNTBdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzUsICAyMSwgVFs1MV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDYsICBUWzUyXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8zLCAgMTAsIFRbNTNdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzEwLCAxNSwgVFs1NF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfMSwgIDIxLCBUWzU1XSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF84LCAgNiwgIFRbNTZdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE1LCAxMCwgVFs1N10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfNiwgIDE1LCBUWzU4XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xMywgMjEsIFRbNTldKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzQsICA2LCAgVFs2MF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTEsIDEwLCBUWzYxXSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8yLCAgMTUsIFRbNjJdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzksICAyMSwgVFs2M10pO1xuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsSCA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxMID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCA4KSAgfCAobkJpdHNUb3RhbEggPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCAyNCkgfCAobkJpdHNUb3RhbEggPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDgpICB8IChuQml0c1RvdGFsTCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDI0KSB8IChuQml0c1RvdGFsTCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IChkYXRhV29yZHMubGVuZ3RoICsgMSkgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoO1xuXHQgICAgICAgICAgICB2YXIgSCA9IGhhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgSF9pID0gSFtpXTtcblxuXHQgICAgICAgICAgICAgICAgSFtpXSA9ICgoKEhfaSA8PCA4KSAgfCAoSF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKEhfaSA8PCAyNCkgfCAoSF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gRkYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGMpIHwgKH5iICYgZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gR0coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGQpIHwgKGMgJiB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSEgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChiIF4gYyBeIGQpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSUkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLk1ENSgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuTUQ1ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoTUQ1KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNNRDUobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjTUQ1ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKE1ENSk7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLk1ENTtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0XG5cdCAgICB2YXIgVyA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0xIGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMSA9IENfYWxnby5TSEExID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LFxuXHQgICAgICAgICAgICAgICAgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3Nixcblx0ICAgICAgICAgICAgICAgIDB4YzNkMmUxZjBcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IFdbaSAtIDNdIF4gV1tpIC0gOF0gXiBXW2kgLSAxNF0gXiBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IChuIDw8IDEpIHwgKG4gPj4+IDMxKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIHQgPSAoKGEgPDwgNSkgfCAoYSA+Pj4gMjcpKSArIGUgKyBXW2ldO1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAyMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgKz0gKChiICYgYykgfCAofmIgJiBkKSkgKyAweDVhODI3OTk5O1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgNDApIHtcblx0ICAgICAgICAgICAgICAgICAgICB0ICs9IChiIF4gYyBeIGQpICsgMHg2ZWQ5ZWJhMTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDYwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdCArPSAoKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpKSAtIDB4NzBlNDQzMjQ7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgLyogaWYgKGkgPCA4MCkgKi8ge1xuXHQgICAgICAgICAgICAgICAgICAgIHQgKz0gKGIgXiBjIF4gZCkgLSAweDM1OWQzZTJhO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBlID0gZDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IChiIDw8IDMwKSB8IChiID4+PiAyKTtcblx0ICAgICAgICAgICAgICAgIGIgPSBhO1xuXHQgICAgICAgICAgICAgICAgYSA9IHQ7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMSgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMSh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTEgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEExKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEExKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTEgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMSk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMTtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIEluaXRpYWxpemF0aW9uIGFuZCByb3VuZCBjb25zdGFudHMgdGFibGVzXG5cdCAgICB2YXIgSCA9IFtdO1xuXHQgICAgdmFyIEsgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gaXNQcmltZShuKSB7XG5cdCAgICAgICAgICAgIHZhciBzcXJ0TiA9IE1hdGguc3FydChuKTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgZmFjdG9yID0gMjsgZmFjdG9yIDw9IHNxcnROOyBmYWN0b3IrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKCEobiAlIGZhY3RvcikpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBmdW5jdGlvbiBnZXRGcmFjdGlvbmFsQml0cyhuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoKG4gLSAobiB8IDApKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIG4gPSAyO1xuXHQgICAgICAgIHZhciBuUHJpbWUgPSAwO1xuXHQgICAgICAgIHdoaWxlIChuUHJpbWUgPCA2NCkge1xuXHQgICAgICAgICAgICBpZiAoaXNQcmltZShuKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKG5QcmltZSA8IDgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBIW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMikpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgS1tuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDMpKTtcblxuXHQgICAgICAgICAgICAgICAgblByaW1lKys7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBuKys7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0XG5cdCAgICB2YXIgVyA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0yNTYgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEyNTYgPSBDX2FsZ28uU0hBMjU2ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChILnNsaWNlKDApKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cdCAgICAgICAgICAgIHZhciBlID0gSFs0XTtcblx0ICAgICAgICAgICAgdmFyIGYgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgZyA9IEhbNl07XG5cdCAgICAgICAgICAgIHZhciBoID0gSFs3XTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChpIDwgMTYpIHtcblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gTVtvZmZzZXQgKyBpXSB8IDA7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4ID0gV1tpIC0gMTVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTAgID0gKChnYW1tYTB4IDw8IDI1KSB8IChnYW1tYTB4ID4+PiA3KSkgIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWEweCA8PCAxNCkgfCAoZ2FtbWEweCA+Pj4gMTgpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMHggPj4+IDMpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXggPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExICA9ICgoZ2FtbWExeCA8PCAxNSkgfCAoZ2FtbWExeCA+Pj4gMTcpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMXggPDwgMTMpIHwgKGdhbW1hMXggPj4+IDE5KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTF4ID4+PiAxMCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXW2ldID0gZ2FtbWEwICsgV1tpIC0gN10gKyBnYW1tYTEgKyBXW2kgLSAxNl07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciBjaCAgPSAoZSAmIGYpIF4gKH5lICYgZyk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqID0gKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwID0gKChhIDw8IDMwKSB8IChhID4+PiAyKSkgXiAoKGEgPDwgMTkpIHwgKGEgPj4+IDEzKSkgXiAoKGEgPDwgMTApIHwgKGEgPj4+IDIyKSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExID0gKChlIDw8IDI2KSB8IChlID4+PiA2KSkgXiAoKGUgPDwgMjEpIHwgKGUgPj4+IDExKSkgXiAoKGUgPDwgNykgIHwgKGUgPj4+IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyID0gc2lnbWEwICsgbWFqO1xuXG5cdCAgICAgICAgICAgICAgICBoID0gZztcblx0ICAgICAgICAgICAgICAgIGcgPSBmO1xuXHQgICAgICAgICAgICAgICAgZiA9IGU7XG5cdCAgICAgICAgICAgICAgICBlID0gKGQgKyB0MSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZCA9IGM7XG5cdCAgICAgICAgICAgICAgICBjID0gYjtcblx0ICAgICAgICAgICAgICAgIGIgPSBhO1xuXHQgICAgICAgICAgICAgICAgYSA9ICh0MSArIHQyKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcblx0ICAgICAgICAgICAgSFs1XSA9IChIWzVdICsgZikgfCAwO1xuXHQgICAgICAgICAgICBIWzZdID0gKEhbNl0gKyBnKSB8IDA7XG5cdCAgICAgICAgICAgIEhbN10gPSAoSFs3XSArIGgpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEEyNTYpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTI1NihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEyNTYgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMjU2KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuU0hBMjU2O1xuXG59KSk7IiwgIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9zaGEyNTZcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vc2hhMjU2XCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblx0ICAgIHZhciBTSEEyNTYgPSBDX2FsZ28uU0hBMjU2O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS0yMjQgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEEyMjQgPSBDX2FsZ28uU0hBMjI0ID0gU0hBMjU2LmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweGMxMDU5ZWQ4LCAweDM2N2NkNTA3LCAweDMwNzBkZDE3LCAweGY3MGU1OTM5LFxuXHQgICAgICAgICAgICAgICAgMHhmZmMwMGIzMSwgMHg2ODU4MTUxMSwgMHg2NGY5OGZhNywgMHhiZWZhNGZhNFxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSBTSEEyNTYuX2RvRmluYWxpemUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICBoYXNoLnNpZ0J5dGVzIC09IDQ7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyMjQoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTIyNCh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTIyNCA9IFNIQTI1Ni5fY3JlYXRlSGVscGVyKFNIQTIyNCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMjI0KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTIyNCA9IFNIQTI1Ni5fY3JlYXRlSG1hY0hlbHBlcihTSEEyMjQpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTIyNDtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBYNjRXb3JkQXJyYXkgPSBDX3g2NC5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICBmdW5jdGlvbiBYNjRXb3JkX2NyZWF0ZSgpIHtcblx0ICAgICAgICByZXR1cm4gWDY0V29yZC5jcmVhdGUuYXBwbHkoWDY0V29yZCwgYXJndW1lbnRzKTtcblx0ICAgIH1cblxuXHQgICAgLy8gQ29uc3RhbnRzXG5cdCAgICB2YXIgSyA9IFtcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDQyOGEyZjk4LCAweGQ3MjhhZTIyKSwgWDY0V29yZF9jcmVhdGUoMHg3MTM3NDQ5MSwgMHgyM2VmNjVjZCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiNWMwZmJjZiwgMHhlYzRkM2IyZiksIFg2NFdvcmRfY3JlYXRlKDB4ZTliNWRiYTUsIDB4ODE4OWRiYmMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Mzk1NmMyNWIsIDB4ZjM0OGI1MzgpLCBYNjRXb3JkX2NyZWF0ZSgweDU5ZjExMWYxLCAweGI2MDVkMDE5KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkyM2Y4MmE0LCAweGFmMTk0ZjliKSwgWDY0V29yZF9jcmVhdGUoMHhhYjFjNWVkNSwgMHhkYTZkODExOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkODA3YWE5OCwgMHhhMzAzMDI0MiksIFg2NFdvcmRfY3JlYXRlKDB4MTI4MzViMDEsIDB4NDU3MDZmYmUpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MjQzMTg1YmUsIDB4NGVlNGIyOGMpLCBYNjRXb3JkX2NyZWF0ZSgweDU1MGM3ZGMzLCAweGQ1ZmZiNGUyKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDcyYmU1ZDc0LCAweGYyN2I4OTZmKSwgWDY0V29yZF9jcmVhdGUoMHg4MGRlYjFmZSwgMHgzYjE2OTZiMSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg5YmRjMDZhNywgMHgyNWM3MTIzNSksIFg2NFdvcmRfY3JlYXRlKDB4YzE5YmYxNzQsIDB4Y2Y2OTI2OTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZTQ5YjY5YzEsIDB4OWVmMTRhZDIpLCBYNjRXb3JkX2NyZWF0ZSgweGVmYmU0Nzg2LCAweDM4NGYyNWUzKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDBmYzE5ZGM2LCAweDhiOGNkNWI1KSwgWDY0V29yZF9jcmVhdGUoMHgyNDBjYTFjYywgMHg3N2FjOWM2NSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyZGU5MmM2ZiwgMHg1OTJiMDI3NSksIFg2NFdvcmRfY3JlYXRlKDB4NGE3NDg0YWEsIDB4NmVhNmU0ODMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NWNiMGE5ZGMsIDB4YmQ0MWZiZDQpLCBYNjRXb3JkX2NyZWF0ZSgweDc2Zjk4OGRhLCAweDgzMTE1M2I1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDk4M2U1MTUyLCAweGVlNjZkZmFiKSwgWDY0V29yZF9jcmVhdGUoMHhhODMxYzY2ZCwgMHgyZGI0MzIxMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiMDAzMjdjOCwgMHg5OGZiMjEzZiksIFg2NFdvcmRfY3JlYXRlKDB4YmY1OTdmYzcsIDB4YmVlZjBlZTQpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YzZlMDBiZjMsIDB4M2RhODhmYzIpLCBYNjRXb3JkX2NyZWF0ZSgweGQ1YTc5MTQ3LCAweDkzMGFhNzI1KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDA2Y2E2MzUxLCAweGUwMDM4MjZmKSwgWDY0V29yZF9jcmVhdGUoMHgxNDI5Mjk2NywgMHgwYTBlNmU3MCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyN2I3MGE4NSwgMHg0NmQyMmZmYyksIFg2NFdvcmRfY3JlYXRlKDB4MmUxYjIxMzgsIDB4NWMyNmM5MjYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGQyYzZkZmMsIDB4NWFjNDJhZWQpLCBYNjRXb3JkX2NyZWF0ZSgweDUzMzgwZDEzLCAweDlkOTViM2RmKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDY1MGE3MzU0LCAweDhiYWY2M2RlKSwgWDY0V29yZF9jcmVhdGUoMHg3NjZhMGFiYiwgMHgzYzc3YjJhOCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg4MWMyYzkyZSwgMHg0N2VkYWVlNiksIFg2NFdvcmRfY3JlYXRlKDB4OTI3MjJjODUsIDB4MTQ4MjM1M2IpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4YTJiZmU4YTEsIDB4NGNmMTAzNjQpLCBYNjRXb3JkX2NyZWF0ZSgweGE4MWE2NjRiLCAweGJjNDIzMDAxKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGMyNGI4YjcwLCAweGQwZjg5NzkxKSwgWDY0V29yZF9jcmVhdGUoMHhjNzZjNTFhMywgMHgwNjU0YmUzMCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhkMTkyZTgxOSwgMHhkNmVmNTIxOCksIFg2NFdvcmRfY3JlYXRlKDB4ZDY5OTA2MjQsIDB4NTU2NWE5MTApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ZjQwZTM1ODUsIDB4NTc3MTIwMmEpLCBYNjRXb3JkX2NyZWF0ZSgweDEwNmFhMDcwLCAweDMyYmJkMWI4KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDE5YTRjMTE2LCAweGI4ZDJkMGM4KSwgWDY0V29yZF9jcmVhdGUoMHgxZTM3NmMwOCwgMHg1MTQxYWI1MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgyNzQ4Nzc0YywgMHhkZjhlZWI5OSksIFg2NFdvcmRfY3JlYXRlKDB4MzRiMGJjYjUsIDB4ZTE5YjQ4YTgpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MzkxYzBjYjMsIDB4YzVjOTVhNjMpLCBYNjRXb3JkX2NyZWF0ZSgweDRlZDhhYTRhLCAweGUzNDE4YWNiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDViOWNjYTRmLCAweDc3NjNlMzczKSwgWDY0V29yZF9jcmVhdGUoMHg2ODJlNmZmMywgMHhkNmIyYjhhMyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHg3NDhmODJlZSwgMHg1ZGVmYjJmYyksIFg2NFdvcmRfY3JlYXRlKDB4NzhhNTYzNmYsIDB4NDMxNzJmNjApLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4ODRjODc4MTQsIDB4YTFmMGFiNzIpLCBYNjRXb3JkX2NyZWF0ZSgweDhjYzcwMjA4LCAweDFhNjQzOWVjKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDkwYmVmZmZhLCAweDIzNjMxZTI4KSwgWDY0V29yZF9jcmVhdGUoMHhhNDUwNmNlYiwgMHhkZTgyYmRlOSksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHhiZWY5YTNmNywgMHhiMmM2NzkxNSksIFg2NFdvcmRfY3JlYXRlKDB4YzY3MTc4ZjIsIDB4ZTM3MjUzMmIpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4Y2EyNzNlY2UsIDB4ZWEyNjYxOWMpLCBYNjRXb3JkX2NyZWF0ZSgweGQxODZiOGM3LCAweDIxYzBjMjA3KSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweGVhZGE3ZGQ2LCAweGNkZTBlYjFlKSwgWDY0V29yZF9jcmVhdGUoMHhmNTdkNGY3ZiwgMHhlZTZlZDE3OCksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgwNmYwNjdhYSwgMHg3MjE3NmZiYSksIFg2NFdvcmRfY3JlYXRlKDB4MGE2MzdkYzUsIDB4YTJjODk4YTYpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4MTEzZjk4MDQsIDB4YmVmOTBkYWUpLCBYNjRXb3JkX2NyZWF0ZSgweDFiNzEwYjM1LCAweDEzMWM0NzFiKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDI4ZGI3N2Y1LCAweDIzMDQ3ZDg0KSwgWDY0V29yZF9jcmVhdGUoMHgzMmNhYWI3YiwgMHg0MGM3MjQ5MyksXG5cdCAgICAgICAgWDY0V29yZF9jcmVhdGUoMHgzYzllYmUwYSwgMHgxNWM5YmViYyksIFg2NFdvcmRfY3JlYXRlKDB4NDMxZDY3YzQsIDB4OWMxMDBkNGMpLFxuXHQgICAgICAgIFg2NFdvcmRfY3JlYXRlKDB4NGNjNWQ0YmUsIDB4Y2IzZTQyYjYpLCBYNjRXb3JkX2NyZWF0ZSgweDU5N2YyOTljLCAweGZjNjU3ZTJhKSxcblx0ICAgICAgICBYNjRXb3JkX2NyZWF0ZSgweDVmY2I2ZmFiLCAweDNhZDZmYWVjKSwgWDY0V29yZF9jcmVhdGUoMHg2YzQ0MTk4YywgMHg0YTQ3NTgxNylcblx0ICAgIF07XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdHNcblx0ICAgIHZhciBXID0gW107XG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICBXW2ldID0gWDY0V29yZF9jcmVhdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNIQS01MTIgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBTSEE1MTIgPSBDX2FsZ28uU0hBNTEyID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBYNjRXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NmEwOWU2NjcsIDB4ZjNiY2M5MDgpLCBuZXcgWDY0V29yZC5pbml0KDB4YmI2N2FlODUsIDB4ODRjYWE3M2IpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweDNjNmVmMzcyLCAweGZlOTRmODJiKSwgbmV3IFg2NFdvcmQuaW5pdCgweGE1NGZmNTNhLCAweDVmMWQzNmYxKSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg1MTBlNTI3ZiwgMHhhZGU2ODJkMSksIG5ldyBYNjRXb3JkLmluaXQoMHg5YjA1Njg4YywgMHgyYjNlNmMxZiksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4MWY4M2Q5YWIsIDB4ZmI0MWJkNmIpLCBuZXcgWDY0V29yZC5pbml0KDB4NWJlMGNkMTksIDB4MTM3ZTIxNzkpXG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgSDAgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgSDEgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgSDIgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgSDMgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgSDQgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgSDUgPSBIWzVdO1xuXHQgICAgICAgICAgICB2YXIgSDYgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgSDcgPSBIWzddO1xuXG5cdCAgICAgICAgICAgIHZhciBIMGggPSBIMC5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDBsID0gSDAubG93O1xuXHQgICAgICAgICAgICB2YXIgSDFoID0gSDEuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEgxbCA9IEgxLmxvdztcblx0ICAgICAgICAgICAgdmFyIEgyaCA9IEgyLmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBIMmwgPSBIMi5sb3c7XG5cdCAgICAgICAgICAgIHZhciBIM2ggPSBIMy5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDNsID0gSDMubG93O1xuXHQgICAgICAgICAgICB2YXIgSDRoID0gSDQuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg0bCA9IEg0Lmxvdztcblx0ICAgICAgICAgICAgdmFyIEg1aCA9IEg1LmhpZ2g7XG5cdCAgICAgICAgICAgIHZhciBINWwgPSBINS5sb3c7XG5cdCAgICAgICAgICAgIHZhciBINmggPSBINi5oaWdoO1xuXHQgICAgICAgICAgICB2YXIgSDZsID0gSDYubG93O1xuXHQgICAgICAgICAgICB2YXIgSDdoID0gSDcuaGlnaDtcblx0ICAgICAgICAgICAgdmFyIEg3bCA9IEg3LmxvdztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYWggPSBIMGg7XG5cdCAgICAgICAgICAgIHZhciBhbCA9IEgwbDtcblx0ICAgICAgICAgICAgdmFyIGJoID0gSDFoO1xuXHQgICAgICAgICAgICB2YXIgYmwgPSBIMWw7XG5cdCAgICAgICAgICAgIHZhciBjaCA9IEgyaDtcblx0ICAgICAgICAgICAgdmFyIGNsID0gSDJsO1xuXHQgICAgICAgICAgICB2YXIgZGggPSBIM2g7XG5cdCAgICAgICAgICAgIHZhciBkbCA9IEgzbDtcblx0ICAgICAgICAgICAgdmFyIGVoID0gSDRoO1xuXHQgICAgICAgICAgICB2YXIgZWwgPSBINGw7XG5cdCAgICAgICAgICAgIHZhciBmaCA9IEg1aDtcblx0ICAgICAgICAgICAgdmFyIGZsID0gSDVsO1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSBINmg7XG5cdCAgICAgICAgICAgIHZhciBnbCA9IEg2bDtcblx0ICAgICAgICAgICAgdmFyIGhoID0gSDdoO1xuXHQgICAgICAgICAgICB2YXIgaGwgPSBIN2w7XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIFdpbDtcblx0ICAgICAgICAgICAgICAgIHZhciBXaWg7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgV2kgPSBXW2ldO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBFeHRlbmQgbWVzc2FnZVxuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpLmhpZ2ggPSBNW29mZnNldCArIGkgKiAyXSAgICAgfCAwO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpbCA9IFdpLmxvdyAgPSBNW29mZnNldCArIGkgKiAyICsgMV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTBcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCAgPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHhoID0gZ2FtbWEweC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTB4bCA9IGdhbW1hMHgubG93O1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTBoICA9ICgoZ2FtbWEweGggPj4+IDEpIHwgKGdhbW1hMHhsIDw8IDMxKSkgXiAoKGdhbW1hMHhoID4+PiA4KSB8IChnYW1tYTB4bCA8PCAyNCkpIF4gKGdhbW1hMHhoID4+PiA3KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwbCAgPSAoKGdhbW1hMHhsID4+PiAxKSB8IChnYW1tYTB4aCA8PCAzMSkpIF4gKChnYW1tYTB4bCA+Pj4gOCkgfCAoZ2FtbWEweGggPDwgMjQpKSBeICgoZ2FtbWEweGwgPj4+IDcpIHwgKGdhbW1hMHhoIDw8IDI1KSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBHYW1tYTFcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCAgPSBXW2kgLSAyXTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeGggPSBnYW1tYTF4LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMXhsID0gZ2FtbWExeC5sb3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMWggID0gKChnYW1tYTF4aCA+Pj4gMTkpIHwgKGdhbW1hMXhsIDw8IDEzKSkgXiAoKGdhbW1hMXhoIDw8IDMpIHwgKGdhbW1hMXhsID4+PiAyOSkpIF4gKGdhbW1hMXhoID4+PiA2KTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExbCAgPSAoKGdhbW1hMXhsID4+PiAxOSkgfCAoZ2FtbWExeGggPDwgMTMpKSBeICgoZ2FtbWExeGwgPDwgMykgfCAoZ2FtbWExeGggPj4+IDI5KSkgXiAoKGdhbW1hMXhsID4+PiA2KSB8IChnYW1tYTF4aCA8PCAyNikpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpNyAgPSBXW2kgLSA3XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2k3aCA9IFdpNy5oaWdoO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTdsID0gV2k3LmxvdztcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBXaTE2ICA9IFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgV2kxNmggPSBXaTE2LmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFdpMTZsID0gV2kxNi5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBnYW1tYTBsICsgV2k3bDtcblx0ICAgICAgICAgICAgICAgICAgICBXaWggPSBnYW1tYTBoICsgV2k3aCArICgoV2lsID4+PiAwKSA8IChnYW1tYTBsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgICAgICBXaWwgPSBXaWwgKyBnYW1tYTFsO1xuXHQgICAgICAgICAgICAgICAgICAgIFdpaCA9IFdpaCArIGdhbW1hMWggKyAoKFdpbCA+Pj4gMCkgPCAoZ2FtbWExbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICAgICAgV2lsID0gV2lsICsgV2kxNmw7XG5cdCAgICAgICAgICAgICAgICAgICAgV2loID0gV2loICsgV2kxNmggKyAoKFdpbCA+Pj4gMCkgPCAoV2kxNmwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV2kuaGlnaCA9IFdpaDtcblx0ICAgICAgICAgICAgICAgICAgICBXaS5sb3cgID0gV2lsO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2hoICA9IChlaCAmIGZoKSBeICh+ZWggJiBnaCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgY2hsICA9IChlbCAmIGZsKSBeICh+ZWwgJiBnbCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFqaCA9IChhaCAmIGJoKSBeIChhaCAmIGNoKSBeIChiaCAmIGNoKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWpsID0gKGFsICYgYmwpIF4gKGFsICYgY2wpIF4gKGJsICYgY2wpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWEwaCA9ICgoYWggPj4+IDI4KSB8IChhbCA8PCA0KSkgIF4gKChhaCA8PCAzMCkgIHwgKGFsID4+PiAyKSkgXiAoKGFoIDw8IDI1KSB8IChhbCA+Pj4gNykpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMGwgPSAoKGFsID4+PiAyOCkgfCAoYWggPDwgNCkpICBeICgoYWwgPDwgMzApICB8IChhaCA+Pj4gMikpIF4gKChhbCA8PCAyNSkgfCAoYWggPj4+IDcpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTFoID0gKChlaCA+Pj4gMTQpIHwgKGVsIDw8IDE4KSkgXiAoKGVoID4+PiAxOCkgfCAoZWwgPDwgMTQpKSBeICgoZWggPDwgMjMpIHwgKGVsID4+PiA5KSk7XG5cdCAgICAgICAgICAgICAgICB2YXIgc2lnbWExbCA9ICgoZWwgPj4+IDE0KSB8IChlaCA8PCAxOCkpIF4gKChlbCA+Pj4gMTgpIHwgKGVoIDw8IDE0KSkgXiAoKGVsIDw8IDIzKSB8IChlaCA+Pj4gOSkpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldXG5cdCAgICAgICAgICAgICAgICB2YXIgS2kgID0gS1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciBLaWggPSBLaS5oaWdoO1xuXHQgICAgICAgICAgICAgICAgdmFyIEtpbCA9IEtpLmxvdztcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IGhsICsgc2lnbWExbDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSBoaCArIHNpZ21hMWggKyAoKHQxbCA+Pj4gMCkgPCAoaGwgPj4+IDApID8gMSA6IDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxbCA9IHQxbCArIGNobDtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWggPSB0MWggKyBjaGggKyAoKHQxbCA+Pj4gMCkgPCAoY2hsID4+PiAwKSA/IDEgOiAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MWwgPSB0MWwgKyBLaWw7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFoID0gdDFoICsgS2loICsgKCh0MWwgPj4+IDApIDwgKEtpbCA+Pj4gMCkgPyAxIDogMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgdDFsID0gdDFsICsgV2lsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQxaCA9IHQxaCArIFdpaCArICgodDFsID4+PiAwKSA8IChXaWwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyB0MiA9IHNpZ21hMCArIG1halxuXHQgICAgICAgICAgICAgICAgdmFyIHQybCA9IHNpZ21hMGwgKyBtYWpsO1xuXHQgICAgICAgICAgICAgICAgdmFyIHQyaCA9IHNpZ21hMGggKyBtYWpoICsgKCh0MmwgPj4+IDApIDwgKHNpZ21hMGwgPj4+IDApID8gMSA6IDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBVcGRhdGUgd29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgICAgIGhoID0gZ2g7XG5cdCAgICAgICAgICAgICAgICBobCA9IGdsO1xuXHQgICAgICAgICAgICAgICAgZ2ggPSBmaDtcblx0ICAgICAgICAgICAgICAgIGdsID0gZmw7XG5cdCAgICAgICAgICAgICAgICBmaCA9IGVoO1xuXHQgICAgICAgICAgICAgICAgZmwgPSBlbDtcblx0ICAgICAgICAgICAgICAgIGVsID0gKGRsICsgdDFsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBlaCA9IChkaCArIHQxaCArICgoZWwgPj4+IDApIDwgKGRsID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgICAgICAgICAgZGggPSBjaDtcblx0ICAgICAgICAgICAgICAgIGRsID0gY2w7XG5cdCAgICAgICAgICAgICAgICBjaCA9IGJoO1xuXHQgICAgICAgICAgICAgICAgY2wgPSBibDtcblx0ICAgICAgICAgICAgICAgIGJoID0gYWg7XG5cdCAgICAgICAgICAgICAgICBibCA9IGFsO1xuXHQgICAgICAgICAgICAgICAgYWwgPSAodDFsICsgdDJsKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBhaCA9ICh0MWggKyB0MmggKyAoKGFsID4+PiAwKSA8ICh0MWwgPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIMGwgPSBIMC5sb3cgID0gKEgwbCArIGFsKTtcblx0ICAgICAgICAgICAgSDAuaGlnaCA9IChIMGggKyBhaCArICgoSDBsID4+PiAwKSA8IChhbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMWwgPSBIMS5sb3cgID0gKEgxbCArIGJsKTtcblx0ICAgICAgICAgICAgSDEuaGlnaCA9IChIMWggKyBiaCArICgoSDFsID4+PiAwKSA8IChibCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIMmwgPSBIMi5sb3cgID0gKEgybCArIGNsKTtcblx0ICAgICAgICAgICAgSDIuaGlnaCA9IChIMmggKyBjaCArICgoSDJsID4+PiAwKSA8IChjbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIM2wgPSBIMy5sb3cgID0gKEgzbCArIGRsKTtcblx0ICAgICAgICAgICAgSDMuaGlnaCA9IChIM2ggKyBkaCArICgoSDNsID4+PiAwKSA8IChkbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINGwgPSBINC5sb3cgID0gKEg0bCArIGVsKTtcblx0ICAgICAgICAgICAgSDQuaGlnaCA9IChINGggKyBlaCArICgoSDRsID4+PiAwKSA8IChlbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINWwgPSBINS5sb3cgID0gKEg1bCArIGZsKTtcblx0ICAgICAgICAgICAgSDUuaGlnaCA9IChINWggKyBmaCArICgoSDVsID4+PiAwKSA8IChmbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBINmwgPSBINi5sb3cgID0gKEg2bCArIGdsKTtcblx0ICAgICAgICAgICAgSDYuaGlnaCA9IChINmggKyBnaCArICgoSDZsID4+PiAwKSA8IChnbCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgICAgICBIN2wgPSBINy5sb3cgID0gKEg3bCArIGhsKTtcblx0ICAgICAgICAgICAgSDcuaGlnaCA9IChIN2ggKyBoaCArICgoSDdsID4+PiAwKSA8IChobCA+Pj4gMCkgPyAxIDogMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyAxMjgpID4+PiAxMCkgPDwgNSkgKyAzMV0gPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gZGF0YVdvcmRzLmxlbmd0aCAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgaGFzaCB0byAzMi1iaXQgd29yZCBhcnJheSBiZWZvcmUgcmV0dXJuaW5nXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaC50b1gzMigpO1xuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEwMjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBNTEyKCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEE1MTIod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEE1MTIpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTUxMihtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEE1MTIgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBNTEyKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEE1MTI7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpLCByZXF1aXJlKFwiLi9zaGE1MTJcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIiwgXCIuL3NoYTUxMlwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX3g2NCA9IEMueDY0O1xuXHQgICAgdmFyIFg2NFdvcmQgPSBDX3g2NC5Xb3JkO1xuXHQgICAgdmFyIFg2NFdvcmRBcnJheSA9IENfeDY0LldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBNTEyID0gQ19hbGdvLlNIQTUxMjtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMzg0IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMzg0ID0gQ19hbGdvLlNIQTM4NCA9IFNIQTUxMi5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgWDY0V29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweGNiYmI5ZDVkLCAweGMxMDU5ZWQ4KSwgbmV3IFg2NFdvcmQuaW5pdCgweDYyOWEyOTJhLCAweDM2N2NkNTA3KSxcblx0ICAgICAgICAgICAgICAgIG5ldyBYNjRXb3JkLmluaXQoMHg5MTU5MDE1YSwgMHgzMDcwZGQxNyksIG5ldyBYNjRXb3JkLmluaXQoMHgxNTJmZWNkOCwgMHhmNzBlNTkzOSksXG5cdCAgICAgICAgICAgICAgICBuZXcgWDY0V29yZC5pbml0KDB4NjczMzI2NjcsIDB4ZmZjMDBiMzEpLCBuZXcgWDY0V29yZC5pbml0KDB4OGViNDRhODcsIDB4Njg1ODE1MTEpLFxuXHQgICAgICAgICAgICAgICAgbmV3IFg2NFdvcmQuaW5pdCgweGRiMGMyZTBkLCAweDY0Zjk4ZmE3KSwgbmV3IFg2NFdvcmQuaW5pdCgweDQ3YjU0ODFkLCAweGJlZmE0ZmE0KVxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSBTSEE1MTIuX2RvRmluYWxpemUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICBoYXNoLnNpZ0J5dGVzIC09IDE2O1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMzg0KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEzODQod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5TSEEzODQgPSBTSEE1MTIuX2NyZWF0ZUhlbHBlcihTSEEzODQpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY1NIQTM4NChtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNTSEEzODQgPSBTSEE1MTIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMzg0KTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEzODQ7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3g2NC1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3g2NC1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ194NjQgPSBDLng2NDtcblx0ICAgIHZhciBYNjRXb3JkID0gQ194NjQuV29yZDtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBSSE9fT0ZGU0VUUyA9IFtdO1xuXHQgICAgdmFyIFBJX0lOREVYRVMgID0gW107XG5cdCAgICB2YXIgUk9VTkRfQ09OU1RBTlRTID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgQ29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8vIENvbXB1dGUgcmhvIG9mZnNldCBjb25zdGFudHNcblx0ICAgICAgICB2YXIgeCA9IDEsIHkgPSAwO1xuXHQgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMjQ7IHQrKykge1xuXHQgICAgICAgICAgICBSSE9fT0ZGU0VUU1t4ICsgNSAqIHldID0gKCh0ICsgMSkgKiAodCArIDIpIC8gMikgJSA2NDtcblxuXHQgICAgICAgICAgICB2YXIgbmV3WCA9IHkgJSA1O1xuXHQgICAgICAgICAgICB2YXIgbmV3WSA9ICgyICogeCArIDMgKiB5KSAlIDU7XG5cdCAgICAgICAgICAgIHggPSBuZXdYO1xuXHQgICAgICAgICAgICB5ID0gbmV3WTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBDb21wdXRlIHBpIGluZGV4IGNvbnN0YW50c1xuXHQgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNTsgeCsrKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNTsgeSsrKSB7XG5cdCAgICAgICAgICAgICAgICBQSV9JTkRFWEVTW3ggKyA1ICogeV0gPSB5ICsgKCgyICogeCArIDMgKiB5KSAlIDUpICogNTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENvbXB1dGUgcm91bmQgY29uc3RhbnRzXG5cdCAgICAgICAgdmFyIExGU1IgPSAweDAxO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIgcm91bmRDb25zdGFudE1zdyA9IDA7XG5cdCAgICAgICAgICAgIHZhciByb3VuZENvbnN0YW50THN3ID0gMDtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKExGU1IgJiAweDAxKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGJpdFBvc2l0aW9uID0gKDEgPDwgaikgLSAxO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChiaXRQb3NpdGlvbiA8IDMyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kQ29uc3RhbnRMc3cgXj0gMSA8PCBiaXRQb3NpdGlvbjtcblx0ICAgICAgICAgICAgICAgICAgICB9IGVsc2UgLyogaWYgKGJpdFBvc2l0aW9uID49IDMyKSAqLyB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kQ29uc3RhbnRNc3cgXj0gMSA8PCAoYml0UG9zaXRpb24gLSAzMik7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBDb21wdXRlIG5leHQgTEZTUlxuXHQgICAgICAgICAgICAgICAgaWYgKExGU1IgJiAweDgwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUHJpbWl0aXZlIHBvbHlub21pYWwgb3ZlciBHRigyKTogeF44ICsgeF42ICsgeF41ICsgeF40ICsgMVxuXHQgICAgICAgICAgICAgICAgICAgIExGU1IgPSAoTEZTUiA8PCAxKSBeIDB4NzE7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIExGU1IgPDw9IDE7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBST1VORF9DT05TVEFOVFNbaV0gPSBYNjRXb3JkLmNyZWF0ZShyb3VuZENvbnN0YW50TXN3LCByb3VuZENvbnN0YW50THN3KTtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3RzIGZvciB0ZW1wb3JhcnkgdmFsdWVzXG5cdCAgICB2YXIgVCA9IFtdO1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspIHtcblx0ICAgICAgICAgICAgVFtpXSA9IFg2NFdvcmQuY3JlYXRlKCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMyBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTMgPSBDX2FsZ28uU0hBMyA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBvdXRwdXRMZW5ndGhcblx0ICAgICAgICAgKiAgIFRoZSBkZXNpcmVkIG51bWJlciBvZiBiaXRzIGluIHRoZSBvdXRwdXQgaGFzaC5cblx0ICAgICAgICAgKiAgIE9ubHkgdmFsdWVzIHBlcm1pdHRlZCBhcmU6IDIyNCwgMjU2LCAzODQsIDUxMi5cblx0ICAgICAgICAgKiAgIERlZmF1bHQ6IDUxMlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogSGFzaGVyLmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBvdXRwdXRMZW5ndGg6IDUxMlxuXHQgICAgICAgIH0pLFxuXG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGUgPSBbXVxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHN0YXRlW2ldID0gbmV3IFg2NFdvcmQuaW5pdCgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgdGhpcy5ibG9ja1NpemUgPSAoMTYwMCAtIDIgKiB0aGlzLmNmZy5vdXRwdXRMZW5ndGgpIC8gMzI7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGU7XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tTaXplTGFuZXMgPSB0aGlzLmJsb2NrU2l6ZSAvIDI7XG5cblx0ICAgICAgICAgICAgLy8gQWJzb3JiXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkJsb2NrU2l6ZUxhbmVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIE0yaSAgPSBNW29mZnNldCArIDIgKiBpXTtcblx0ICAgICAgICAgICAgICAgIHZhciBNMmkxID0gTVtvZmZzZXQgKyAyICogaSArIDFdO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICAgICAgTTJpID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaSA8PCA4KSAgfCAoTTJpID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaSA8PCAyNCkgfCAoTTJpID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgICAgICBNMmkxID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE0yaTEgPDwgOCkgIHwgKE0yaTEgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTTJpMSA8PCAyNCkgfCAoTTJpMSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBBYnNvcmIgbWVzc2FnZSBpbnRvIHN0YXRlXG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW2ldO1xuXHQgICAgICAgICAgICAgICAgbGFuZS5oaWdoIF49IE0yaTE7XG5cdCAgICAgICAgICAgICAgICBsYW5lLmxvdyAgXj0gTTJpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUm91bmRzXG5cdCAgICAgICAgICAgIGZvciAodmFyIHJvdW5kID0gMDsgcm91bmQgPCAyNDsgcm91bmQrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gVGhldGFcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNTsgeCsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gTWl4IGNvbHVtbiBsYW5lc1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0TXN3ID0gMCwgdExzdyA9IDA7XG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCA1OyB5KyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVt4ICsgNSAqIHldO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0TXN3IF49IGxhbmUuaGlnaDtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdExzdyBePSBsYW5lLmxvdztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBUZW1wb3JhcnkgdmFsdWVzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4ID0gVFt4XTtcblx0ICAgICAgICAgICAgICAgICAgICBUeC5oaWdoID0gdE1zdztcblx0ICAgICAgICAgICAgICAgICAgICBUeC5sb3cgID0gdExzdztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgNTsgeCsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4NCA9IFRbKHggKyA0KSAlIDVdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBUeDEgPSBUWyh4ICsgMSkgJSA1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgVHgxTXN3ID0gVHgxLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFR4MUxzdyA9IFR4MS5sb3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBNaXggc3Vycm91bmRpbmcgY29sdW1uc1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0TXN3ID0gVHg0LmhpZ2ggXiAoKFR4MU1zdyA8PCAxKSB8IChUeDFMc3cgPj4+IDMxKSk7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRMc3cgPSBUeDQubG93ICBeICgoVHgxTHN3IDw8IDEpIHwgKFR4MU1zdyA+Pj4gMzEpKTtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDU7IHkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW3ggKyA1ICogeV07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxhbmUuaGlnaCBePSB0TXN3O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmxvdyAgXj0gdExzdztcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJobyBQaVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgbGFuZUluZGV4ID0gMTsgbGFuZUluZGV4IDwgMjU7IGxhbmVJbmRleCsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRNc3c7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRMc3c7XG5cblx0ICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlW2xhbmVJbmRleF07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmVNc3cgPSBsYW5lLmhpZ2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmVMc3cgPSBsYW5lLmxvdztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmhvT2Zmc2V0ID0gUkhPX09GRlNFVFNbbGFuZUluZGV4XTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFJvdGF0ZSBsYW5lc1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChyaG9PZmZzZXQgPCAzMikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0TXN3ID0gKGxhbmVNc3cgPDwgcmhvT2Zmc2V0KSB8IChsYW5lTHN3ID4+PiAoMzIgLSByaG9PZmZzZXQpKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdExzdyA9IChsYW5lTHN3IDw8IHJob09mZnNldCkgfCAobGFuZU1zdyA+Pj4gKDMyIC0gcmhvT2Zmc2V0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIC8qIGlmIChyaG9PZmZzZXQgPj0gMzIpICovIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdE1zdyA9IChsYW5lTHN3IDw8IChyaG9PZmZzZXQgLSAzMikpIHwgKGxhbmVNc3cgPj4+ICg2NCAtIHJob09mZnNldCkpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0THN3ID0gKGxhbmVNc3cgPDwgKHJob09mZnNldCAtIDMyKSkgfCAobGFuZUxzdyA+Pj4gKDY0IC0gcmhvT2Zmc2V0KSk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gVHJhbnNwb3NlIGxhbmVzXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIFRQaUxhbmUgPSBUW1BJX0lOREVYRVNbbGFuZUluZGV4XV07XG5cdCAgICAgICAgICAgICAgICAgICAgVFBpTGFuZS5oaWdoID0gdE1zdztcblx0ICAgICAgICAgICAgICAgICAgICBUUGlMYW5lLmxvdyAgPSB0THN3O1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSaG8gcGkgYXQgeCA9IHkgPSAwXG5cdCAgICAgICAgICAgICAgICB2YXIgVDAgPSBUWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIHN0YXRlMCA9IHN0YXRlWzBdO1xuXHQgICAgICAgICAgICAgICAgVDAuaGlnaCA9IHN0YXRlMC5oaWdoO1xuXHQgICAgICAgICAgICAgICAgVDAubG93ICA9IHN0YXRlMC5sb3c7XG5cblx0ICAgICAgICAgICAgICAgIC8vIENoaVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCA1OyB4KyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDU7IHkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmVJbmRleCA9IHggKyA1ICogeTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmUgPSBzdGF0ZVtsYW5lSW5kZXhdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgVExhbmUgPSBUW2xhbmVJbmRleF07XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBUeDFMYW5lID0gVFsoKHggKyAxKSAlIDUpICsgNSAqIHldO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgVHgyTGFuZSA9IFRbKCh4ICsgMikgJSA1KSArIDUgKiB5XTtcblxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBNaXggcm93c1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmhpZ2ggPSBUTGFuZS5oaWdoIF4gKH5UeDFMYW5lLmhpZ2ggJiBUeDJMYW5lLmhpZ2gpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYW5lLmxvdyAgPSBUTGFuZS5sb3cgIF4gKH5UeDFMYW5lLmxvdyAgJiBUeDJMYW5lLmxvdyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJb3RhXG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZSA9IHN0YXRlWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIHJvdW5kQ29uc3RhbnQgPSBST1VORF9DT05TVEFOVFNbcm91bmRdO1xuXHQgICAgICAgICAgICAgICAgbGFuZS5oaWdoIF49IHJvdW5kQ29uc3RhbnQuaGlnaDtcblx0ICAgICAgICAgICAgICAgIGxhbmUubG93ICBePSByb3VuZENvbnN0YW50Lmxvdztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQml0cyA9IHRoaXMuYmxvY2tTaXplICogMzI7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHgxIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoTWF0aC5jZWlsKChuQml0c0xlZnQgKyAxKSAvIGJsb2NrU2l6ZUJpdHMpICogYmxvY2tTaXplQml0cykgPj4+IDUpIC0gMV0gfD0gMHg4MDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGU7XG5cdCAgICAgICAgICAgIHZhciBvdXRwdXRMZW5ndGhCeXRlcyA9IHRoaXMuY2ZnLm91dHB1dExlbmd0aCAvIDg7XG5cdCAgICAgICAgICAgIHZhciBvdXRwdXRMZW5ndGhMYW5lcyA9IG91dHB1dExlbmd0aEJ5dGVzIC8gODtcblxuXHQgICAgICAgICAgICAvLyBTcXVlZXplXG5cdCAgICAgICAgICAgIHZhciBoYXNoV29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvdXRwdXRMZW5ndGhMYW5lczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBsYW5lID0gc3RhdGVbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgbGFuZU1zdyA9IGxhbmUuaGlnaDtcblx0ICAgICAgICAgICAgICAgIHZhciBsYW5lTHN3ID0gbGFuZS5sb3c7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgICAgICBsYW5lTXN3ID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKGxhbmVNc3cgPDwgOCkgIHwgKGxhbmVNc3cgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgobGFuZU1zdyA8PCAyNCkgfCAobGFuZU1zdyA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICAgICAgbGFuZUxzdyA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChsYW5lTHN3IDw8IDgpICB8IChsYW5lTHN3ID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKGxhbmVMc3cgPDwgMjQpIHwgKGxhbmVMc3cgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3F1ZWV6ZSBzdGF0ZSB0byByZXRyaWV2ZSBoYXNoXG5cdCAgICAgICAgICAgICAgICBoYXNoV29yZHMucHVzaChsYW5lTHN3KTtcblx0ICAgICAgICAgICAgICAgIGhhc2hXb3Jkcy5wdXNoKGxhbmVNc3cpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdChoYXNoV29yZHMsIG91dHB1dExlbmd0aEJ5dGVzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgdmFyIHN0YXRlID0gY2xvbmUuX3N0YXRlID0gdGhpcy5fc3RhdGUuc2xpY2UoMCk7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgc3RhdGVbaV0gPSBzdGF0ZVtpXS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMygnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMyh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTMgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihTSEEzKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEzKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTMgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoU0hBMyk7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTM7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKiogQHByZXNlcnZlXG5cdChjKSAyMDEyIGJ5IENcdTAwRTlkcmljIE1lc25pbC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuXHRSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cblx0ICAgIC0gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXHQgICAgLSBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblx0VEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuXHQqL1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZVxuXHQgICAgdmFyIF96bCA9IFdvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgIDAsICAxLCAgMiwgIDMsICA0LCAgNSwgIDYsICA3LCAgOCwgIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXG5cdCAgICAgICAgNywgIDQsIDEzLCAgMSwgMTAsICA2LCAxNSwgIDMsIDEyLCAgMCwgIDksICA1LCAgMiwgMTQsIDExLCAgOCxcblx0ICAgICAgICAzLCAxMCwgMTQsICA0LCAgOSwgMTUsICA4LCAgMSwgIDIsICA3LCAgMCwgIDYsIDEzLCAxMSwgIDUsIDEyLFxuXHQgICAgICAgIDEsICA5LCAxMSwgMTAsICAwLCAgOCwgMTIsICA0LCAxMywgIDMsICA3LCAxNSwgMTQsICA1LCAgNiwgIDIsXG5cdCAgICAgICAgNCwgIDAsICA1LCAgOSwgIDcsIDEyLCAgMiwgMTAsIDE0LCAgMSwgIDMsICA4LCAxMSwgIDYsIDE1LCAxM10pO1xuXHQgICAgdmFyIF96ciA9IFdvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgIDUsIDE0LCAgNywgIDAsICA5LCAgMiwgMTEsICA0LCAxMywgIDYsIDE1LCAgOCwgIDEsIDEwLCAgMywgMTIsXG5cdCAgICAgICAgNiwgMTEsICAzLCAgNywgIDAsIDEzLCAgNSwgMTAsIDE0LCAxNSwgIDgsIDEyLCAgNCwgIDksICAxLCAgMixcblx0ICAgICAgICAxNSwgIDUsICAxLCAgMywgIDcsIDE0LCAgNiwgIDksIDExLCAgOCwgMTIsICAyLCAxMCwgIDAsICA0LCAxMyxcblx0ICAgICAgICA4LCAgNiwgIDQsICAxLCAgMywgMTEsIDE1LCAgMCwgIDUsIDEyLCAgMiwgMTMsICA5LCAgNywgMTAsIDE0LFxuXHQgICAgICAgIDEyLCAxNSwgMTAsICA0LCAgMSwgIDUsICA4LCAgNywgIDYsICAyLCAxMywgMTQsICAwLCAgMywgIDksIDExXSk7XG5cdCAgICB2YXIgX3NsID0gV29yZEFycmF5LmNyZWF0ZShbXG5cdCAgICAgICAgIDExLCAxNCwgMTUsIDEyLCAgNSwgIDgsICA3LCAgOSwgMTEsIDEzLCAxNCwgMTUsICA2LCAgNywgIDksICA4LFxuXHQgICAgICAgIDcsIDYsICAgOCwgMTMsIDExLCAgOSwgIDcsIDE1LCAgNywgMTIsIDE1LCAgOSwgMTEsICA3LCAxMywgMTIsXG5cdCAgICAgICAgMTEsIDEzLCAgNiwgIDcsIDE0LCAgOSwgMTMsIDE1LCAxNCwgIDgsIDEzLCAgNiwgIDUsIDEyLCAgNywgIDUsXG5cdCAgICAgICAgICAxMSwgMTIsIDE0LCAxNSwgMTQsIDE1LCAgOSwgIDgsICA5LCAxNCwgIDUsICA2LCAgOCwgIDYsICA1LCAxMixcblx0ICAgICAgICA5LCAxNSwgIDUsIDExLCAgNiwgIDgsIDEzLCAxMiwgIDUsIDEyLCAxMywgMTQsIDExLCAgOCwgIDUsICA2IF0pO1xuXHQgICAgdmFyIF9zciA9IFdvcmRBcnJheS5jcmVhdGUoW1xuXHQgICAgICAgIDgsICA5LCAgOSwgMTEsIDEzLCAxNSwgMTUsICA1LCAgNywgIDcsICA4LCAxMSwgMTQsIDE0LCAxMiwgIDYsXG5cdCAgICAgICAgOSwgMTMsIDE1LCAgNywgMTIsICA4LCAgOSwgMTEsICA3LCAgNywgMTIsICA3LCAgNiwgMTUsIDEzLCAxMSxcblx0ICAgICAgICA5LCAgNywgMTUsIDExLCAgOCwgIDYsICA2LCAxNCwgMTIsIDEzLCAgNSwgMTQsIDEzLCAxMywgIDcsICA1LFxuXHQgICAgICAgIDE1LCAgNSwgIDgsIDExLCAxNCwgMTQsICA2LCAxNCwgIDYsICA5LCAxMiwgIDksIDEyLCAgNSwgMTUsICA4LFxuXHQgICAgICAgIDgsICA1LCAxMiwgIDksIDEyLCAgNSwgMTQsICA2LCAgOCwgMTMsICA2LCAgNSwgMTUsIDEzLCAxMSwgMTEgXSk7XG5cblx0ICAgIHZhciBfaGwgPSAgV29yZEFycmF5LmNyZWF0ZShbIDB4MDAwMDAwMDAsIDB4NUE4Mjc5OTksIDB4NkVEOUVCQTEsIDB4OEYxQkJDREMsIDB4QTk1M0ZENEVdKTtcblx0ICAgIHZhciBfaHIgPSAgV29yZEFycmF5LmNyZWF0ZShbIDB4NTBBMjhCRTYsIDB4NUM0REQxMjQsIDB4NkQ3MDNFRjMsIDB4N0E2RDc2RTksIDB4MDAwMDAwMDBdKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBSSVBFTUQxNjAgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBSSVBFTUQxNjAgPSBDX2FsZ28uUklQRU1EMTYwID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCAgPSBXb3JkQXJyYXkuY3JlYXRlKFsweDY3NDUyMzAxLCAweEVGQ0RBQjg5LCAweDk4QkFEQ0ZFLCAweDEwMzI1NDc2LCAweEMzRDJFMUYwXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0X2kgPSBvZmZzZXQgKyBpO1xuXHQgICAgICAgICAgICAgICAgdmFyIE1fb2Zmc2V0X2kgPSBNW29mZnNldF9pXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3dhcFxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXRfaV0gPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCA4KSAgfCAoTV9vZmZzZXRfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDI0KSB8IChNX29mZnNldF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggID0gdGhpcy5faGFzaC53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGhsID0gX2hsLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaHIgPSBfaHIud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB6bCA9IF96bC53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHpyID0gX3pyLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2wgPSBfc2wud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzciA9IF9zci53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuXHQgICAgICAgICAgICB2YXIgYWwsIGJsLCBjbCwgZGwsIGVsO1xuXHQgICAgICAgICAgICB2YXIgYXIsIGJyLCBjciwgZHIsIGVyO1xuXG5cdCAgICAgICAgICAgIGFyID0gYWwgPSBIWzBdO1xuXHQgICAgICAgICAgICBiciA9IGJsID0gSFsxXTtcblx0ICAgICAgICAgICAgY3IgPSBjbCA9IEhbMl07XG5cdCAgICAgICAgICAgIGRyID0gZGwgPSBIWzNdO1xuXHQgICAgICAgICAgICBlciA9IGVsID0gSFs0XTtcblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgdmFyIHQ7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODA7IGkgKz0gMSkge1xuXHQgICAgICAgICAgICAgICAgdCA9IChhbCArICBNW29mZnNldCt6bFtpXV0pfDA7XG5cdCAgICAgICAgICAgICAgICBpZiAoaTwxNil7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjEoYmwsY2wsZGwpICsgaGxbMF07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8MzIpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmMihibCxjbCxkbCkgKyBobFsxXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTw0OCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYzKGJsLGNsLGRsKSArIGhsWzJdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDY0KSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjQoYmwsY2wsZGwpICsgaGxbM107XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Ugey8vIGlmIChpPDgwKSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjUoYmwsY2wsZGwpICsgaGxbNF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0ID0gdHwwO1xuXHQgICAgICAgICAgICAgICAgdCA9ICByb3RsKHQsc2xbaV0pO1xuXHQgICAgICAgICAgICAgICAgdCA9ICh0K2VsKXwwO1xuXHQgICAgICAgICAgICAgICAgYWwgPSBlbDtcblx0ICAgICAgICAgICAgICAgIGVsID0gZGw7XG5cdCAgICAgICAgICAgICAgICBkbCA9IHJvdGwoY2wsIDEwKTtcblx0ICAgICAgICAgICAgICAgIGNsID0gYmw7XG5cdCAgICAgICAgICAgICAgICBibCA9IHQ7XG5cblx0ICAgICAgICAgICAgICAgIHQgPSAoYXIgKyBNW29mZnNldCt6cltpXV0pfDA7XG5cdCAgICAgICAgICAgICAgICBpZiAoaTwxNil7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjUoYnIsY3IsZHIpICsgaHJbMF07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGk8MzIpIHtcblx0XHQgICAgICAgICAgICB0ICs9ICBmNChicixjcixkcikgKyBoclsxXTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaTw0OCkge1xuXHRcdCAgICAgICAgICAgIHQgKz0gIGYzKGJyLGNyLGRyKSArIGhyWzJdO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpPDY0KSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjIoYnIsY3IsZHIpICsgaHJbM107XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Ugey8vIGlmIChpPDgwKSB7XG5cdFx0ICAgICAgICAgICAgdCArPSAgZjEoYnIsY3IsZHIpICsgaHJbNF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0ID0gdHwwO1xuXHQgICAgICAgICAgICAgICAgdCA9ICByb3RsKHQsc3JbaV0pIDtcblx0ICAgICAgICAgICAgICAgIHQgPSAodCtlcil8MDtcblx0ICAgICAgICAgICAgICAgIGFyID0gZXI7XG5cdCAgICAgICAgICAgICAgICBlciA9IGRyO1xuXHQgICAgICAgICAgICAgICAgZHIgPSByb3RsKGNyLCAxMCk7XG5cdCAgICAgICAgICAgICAgICBjciA9IGJyO1xuXHQgICAgICAgICAgICAgICAgYnIgPSB0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIHQgICAgPSAoSFsxXSArIGNsICsgZHIpfDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsyXSArIGRsICsgZXIpfDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFszXSArIGVsICsgYXIpfDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFs0XSArIGFsICsgYnIpfDA7XG5cdCAgICAgICAgICAgIEhbNF0gPSAoSFswXSArIGJsICsgY3IpfDA7XG5cdCAgICAgICAgICAgIEhbMF0gPSAgdDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWwgPDwgOCkgIHwgKG5CaXRzVG90YWwgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsIDw8IDI0KSB8IChuQml0c1RvdGFsID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IChkYXRhV29yZHMubGVuZ3RoICsgMSkgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoO1xuXHQgICAgICAgICAgICB2YXIgSCA9IGhhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgSF9pID0gSFtpXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU3dhcFxuXHQgICAgICAgICAgICAgICAgSFtpXSA9ICgoKEhfaSA8PCA4KSAgfCAoSF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKEhfaSA8PCAyNCkgfCAoSF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXG5cdCAgICBmdW5jdGlvbiBmMSh4LCB5LCB6KSB7XG5cdCAgICAgICAgcmV0dXJuICgoeCkgXiAoeSkgXiAoeikpO1xuXG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGYyKHgsIHksIHopIHtcblx0ICAgICAgICByZXR1cm4gKCgoeCkmKHkpKSB8ICgofngpJih6KSkpO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBmMyh4LCB5LCB6KSB7XG5cdCAgICAgICAgcmV0dXJuICgoKHgpIHwgKH4oeSkpKSBeICh6KSk7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGY0KHgsIHksIHopIHtcblx0ICAgICAgICByZXR1cm4gKCgoeCkgJiAoeikpIHwgKCh5KSYofih6KSkpKTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZjUoeCwgeSwgeikge1xuXHQgICAgICAgIHJldHVybiAoKHgpIF4gKCh5KSB8KH4oeikpKSk7XG5cblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gcm90bCh4LG4pIHtcblx0ICAgICAgICByZXR1cm4gKHg8PG4pIHwgKHg+Pj4oMzItbikpO1xuXHQgICAgfVxuXG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5SSVBFTUQxNjAoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlJJUEVNRDE2MCh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlJJUEVNRDE2MCA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFJJUEVNRDE2MCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjUklQRU1EMTYwKG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1JJUEVNRDE2MCA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihSSVBFTUQxNjApO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5SSVBFTUQxNjA7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmODtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8qKlxuXHQgICAgICogSE1BQyBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBITUFDID0gQ19hbGdvLkhNQUMgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIEhNQUMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBobWFjSGFzaGVyID0gQ3J5cHRvSlMuYWxnby5ITUFDLmNyZWF0ZShDcnlwdG9KUy5hbGdvLlNIQTI1Niwga2V5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoaGFzaGVyLCBrZXkpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdCBoYXNoZXJcblx0ICAgICAgICAgICAgaGFzaGVyID0gdGhpcy5faGFzaGVyID0gbmV3IGhhc2hlci5pbml0KCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gVXRmOC5wYXJzZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemUgPSBoYXNoZXIuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgaGFzaGVyQmxvY2tTaXplQnl0ZXMgPSBoYXNoZXJCbG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEFsbG93IGFyYml0cmFyeSBsZW5ndGgga2V5c1xuXHQgICAgICAgICAgICBpZiAoa2V5LnNpZ0J5dGVzID4gaGFzaGVyQmxvY2tTaXplQnl0ZXMpIHtcblx0ICAgICAgICAgICAgICAgIGtleSA9IGhhc2hlci5maW5hbGl6ZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAga2V5LmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUga2V5IGZvciBpbm5lciBhbmQgb3V0ZXIgcGFkc1xuXHQgICAgICAgICAgICB2YXIgb0tleSA9IHRoaXMuX29LZXkgPSBrZXkuY2xvbmUoKTtcblx0ICAgICAgICAgICAgdmFyIGlLZXkgPSB0aGlzLl9pS2V5ID0ga2V5LmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5V29yZHMgPSBvS2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaUtleVdvcmRzID0gaUtleS53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBYT1Iga2V5cyB3aXRoIHBhZCBjb25zdGFudHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYXNoZXJCbG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgb0tleVdvcmRzW2ldIF49IDB4NWM1YzVjNWM7XG5cdCAgICAgICAgICAgICAgICBpS2V5V29yZHNbaV0gXj0gMHgzNjM2MzYzNjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBvS2V5LnNpZ0J5dGVzID0gaUtleS5zaWdCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZUJ5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIEhNQUMgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIFJlc2V0XG5cdCAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAgICBoYXNoZXIudXBkYXRlKHRoaXMuX2lLZXkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgSE1BQyB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtITUFDfSBUaGlzIEhNQUMgaW5zdGFuY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoZXIudXBkYXRlKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBITUFDIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhhc2hlciA9IHRoaXMuX2hhc2hlcjtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIEhNQUNcblx0ICAgICAgICAgICAgdmFyIGlubmVySGFzaCA9IGhhc2hlci5maW5hbGl6ZShtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIHZhciBobWFjID0gaGFzaGVyLmZpbmFsaXplKHRoaXMuX29LZXkuY2xvbmUoKS5jb25jYXQoaW5uZXJIYXNoKSk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhtYWM7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMjU2XCIpLCByZXF1aXJlKFwiLi9obWFjXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3NoYTI1NlwiLCBcIi4vaG1hY1wiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1Njtcblx0ICAgIHZhciBITUFDID0gQ19hbGdvLkhNQUM7XG5cblx0ICAgIC8qKlxuXHQgICAgICogUGFzc3dvcmQtQmFzZWQgS2V5IERlcml2YXRpb24gRnVuY3Rpb24gMiBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBQQktERjIgPSBDX2FsZ28uUEJLREYyID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBrZXlTaXplIFRoZSBrZXkgc2l6ZSBpbiB3b3JkcyB0byBnZW5lcmF0ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZS4gRGVmYXVsdDogU0hBMjU2XG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGl0ZXJhdGlvbnMgVGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIHBlcmZvcm0uIERlZmF1bHQ6IDI1MDAwMFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICBrZXlTaXplOiAxMjgvMzIsXG5cdCAgICAgICAgICAgIGhhc2hlcjogU0hBMjU2LFxuXHQgICAgICAgICAgICBpdGVyYXRpb25zOiAyNTAwMDBcblx0ICAgICAgICB9KSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhlIGRlcml2YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLlBCS0RGMi5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGtkZiA9IENyeXB0b0pTLmFsZ28uUEJLREYyLmNyZWF0ZSh7IGtleVNpemU6IDggfSk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLlBCS0RGMi5jcmVhdGUoeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29tcHV0ZXMgdGhlIFBhc3N3b3JkLUJhc2VkIEtleSBEZXJpdmF0aW9uIEZ1bmN0aW9uIDIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBrZXkgPSBrZGYuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29tcHV0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjZmcgPSB0aGlzLmNmZztcblxuXHQgICAgICAgICAgICAvLyBJbml0IEhNQUNcblx0ICAgICAgICAgICAgdmFyIGhtYWMgPSBITUFDLmNyZWF0ZShjZmcuaGFzaGVyLCBwYXNzd29yZCk7XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRLZXkgPSBXb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgIHZhciBibG9ja0luZGV4ID0gV29yZEFycmF5LmNyZWF0ZShbMHgwMDAwMDAwMV0pO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZEtleVdvcmRzID0gZGVyaXZlZEtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrSW5kZXhXb3JkcyA9IGJsb2NrSW5kZXgud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaXplID0gY2ZnLmtleVNpemU7XG5cdCAgICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gY2ZnLml0ZXJhdGlvbnM7XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUga2V5XG5cdCAgICAgICAgICAgIHdoaWxlIChkZXJpdmVkS2V5V29yZHMubGVuZ3RoIDwga2V5U2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrID0gaG1hYy51cGRhdGUoc2FsdCkuZmluYWxpemUoYmxvY2tJbmRleCk7XG5cdCAgICAgICAgICAgICAgICBobWFjLnJlc2V0KCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIGJsb2NrV29yZHMgPSBibG9jay53b3Jkcztcblx0ICAgICAgICAgICAgICAgIHZhciBibG9ja1dvcmRzTGVuZ3RoID0gYmxvY2tXb3Jkcy5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGlvbnNcblx0ICAgICAgICAgICAgICAgIHZhciBpbnRlcm1lZGlhdGUgPSBibG9jaztcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlID0gaG1hYy5maW5hbGl6ZShpbnRlcm1lZGlhdGUpO1xuXHQgICAgICAgICAgICAgICAgICAgIGhtYWMucmVzZXQoKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGludGVybWVkaWF0ZVdvcmRzID0gaW50ZXJtZWRpYXRlLndvcmRzO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gWE9SIGludGVybWVkaWF0ZSB3aXRoIGJsb2NrXG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBibG9ja1dvcmRzTGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tXb3Jkc1tqXSBePSBpbnRlcm1lZGlhdGVXb3Jkc1tqXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGRlcml2ZWRLZXkuY29uY2F0KGJsb2NrKTtcblx0ICAgICAgICAgICAgICAgIGJsb2NrSW5kZXhXb3Jkc1swXSsrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGRlcml2ZWRLZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICByZXR1cm4gZGVyaXZlZEtleTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDb21wdXRlcyB0aGUgUGFzc3dvcmQtQmFzZWQgS2V5IERlcml2YXRpb24gRnVuY3Rpb24gMi5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCBBIHNhbHQuXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgY29tcHV0YXRpb24uXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgZGVyaXZlZCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5QQktERjIocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICogICAgIHZhciBrZXkgPSBDcnlwdG9KUy5QQktERjIocGFzc3dvcmQsIHNhbHQsIHsga2V5U2l6ZTogOCB9KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuUEJLREYyKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDgsIGl0ZXJhdGlvbnM6IDEwMDAgfSk7XG5cdCAgICAgKi9cblx0ICAgIEMuUEJLREYyID0gZnVuY3Rpb24gKHBhc3N3b3JkLCBzYWx0LCBjZmcpIHtcblx0ICAgICAgICByZXR1cm4gUEJLREYyLmNyZWF0ZShjZmcpLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgfTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5QQktERjI7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTFcIiksIHJlcXVpcmUoXCIuL2htYWNcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vc2hhMVwiLCBcIi4vaG1hY1wiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgTUQ1ID0gQ19hbGdvLk1ENTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBUaGlzIGtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uIGlzIG1lYW50IHRvIGNvbmZvcm0gd2l0aCBFVlBfQnl0ZXNUb0tleS5cblx0ICAgICAqIHd3dy5vcGVuc3NsLm9yZy9kb2NzL2NyeXB0by9FVlBfQnl0ZXNUb0tleS5odG1sXG5cdCAgICAgKi9cblx0ICAgIHZhciBFdnBLREYgPSBDX2FsZ28uRXZwS0RGID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBrZXlTaXplIFRoZSBrZXkgc2l6ZSBpbiB3b3JkcyB0byBnZW5lcmF0ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMpXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaCBhbGdvcml0aG0gdG8gdXNlLiBEZWZhdWx0OiBNRDVcblx0ICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gaXRlcmF0aW9ucyBUaGUgbnVtYmVyIG9mIGl0ZXJhdGlvbnMgdG8gcGVyZm9ybS4gRGVmYXVsdDogMVxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICBrZXlTaXplOiAxMjgvMzIsXG5cdCAgICAgICAgICAgIGhhc2hlcjogTUQ1LFxuXHQgICAgICAgICAgICBpdGVyYXRpb25zOiAxXG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQga2V5IGRlcml2YXRpb24gZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoZSBkZXJpdmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIga2RmID0gQ3J5cHRvSlMuYWxnby5FdnBLREYuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciBrZGYgPSBDcnlwdG9KUy5hbGdvLkV2cEtERi5jcmVhdGUoeyBrZXlTaXplOiA4IH0pO1xuXHQgICAgICAgICAqICAgICB2YXIga2RmID0gQ3J5cHRvSlMuYWxnby5FdnBLREYuY3JlYXRlKHsga2V5U2l6ZTogOCwgaXRlcmF0aW9uczogMTAwMCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2ZnKSB7XG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIERlcml2ZXMgYSBrZXkgZnJvbSBhIHBhc3N3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmQuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBzYWx0IEEgc2FsdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGRlcml2ZWQga2V5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIga2V5ID0ga2RmLmNvbXB1dGUocGFzc3dvcmQsIHNhbHQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbXB1dGU6IGZ1bmN0aW9uIChwYXNzd29yZCwgc2FsdCkge1xuXHQgICAgICAgICAgICB2YXIgYmxvY2s7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGNmZyA9IHRoaXMuY2ZnO1xuXG5cdCAgICAgICAgICAgIC8vIEluaXQgaGFzaGVyXG5cdCAgICAgICAgICAgIHZhciBoYXNoZXIgPSBjZmcuaGFzaGVyLmNyZWF0ZSgpO1xuXG5cdCAgICAgICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBkZXJpdmVkS2V5ID0gV29yZEFycmF5LmNyZWF0ZSgpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZEtleVdvcmRzID0gZGVyaXZlZEtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGtleVNpemUgPSBjZmcua2V5U2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGl0ZXJhdGlvbnMgPSBjZmcuaXRlcmF0aW9ucztcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBrZXlcblx0ICAgICAgICAgICAgd2hpbGUgKGRlcml2ZWRLZXlXb3Jkcy5sZW5ndGggPCBrZXlTaXplKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoYmxvY2spIHtcblx0ICAgICAgICAgICAgICAgICAgICBoYXNoZXIudXBkYXRlKGJsb2NrKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJsb2NrID0gaGFzaGVyLnVwZGF0ZShwYXNzd29yZCkuZmluYWxpemUoc2FsdCk7XG5cdCAgICAgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gSXRlcmF0aW9uc1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpdGVyYXRpb25zOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBibG9jayA9IGhhc2hlci5maW5hbGl6ZShibG9jayk7XG5cdCAgICAgICAgICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGRlcml2ZWRLZXkuY29uY2F0KGJsb2NrKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBkZXJpdmVkS2V5LnNpZ0J5dGVzID0ga2V5U2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGRlcml2ZWRLZXk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRGVyaXZlcyBhIGtleSBmcm9tIGEgcGFzc3dvcmQuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmQuXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IHNhbHQgQSBzYWx0LlxuXHQgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIGNvbXB1dGF0aW9uLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGRlcml2ZWQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuRXZwS0RGKHBhc3N3b3JkLCBzYWx0KTtcblx0ICAgICAqICAgICB2YXIga2V5ID0gQ3J5cHRvSlMuRXZwS0RGKHBhc3N3b3JkLCBzYWx0LCB7IGtleVNpemU6IDggfSk7XG5cdCAgICAgKiAgICAgdmFyIGtleSA9IENyeXB0b0pTLkV2cEtERihwYXNzd29yZCwgc2FsdCwgeyBrZXlTaXplOiA4LCBpdGVyYXRpb25zOiAxMDAwIH0pO1xuXHQgICAgICovXG5cdCAgICBDLkV2cEtERiA9IGZ1bmN0aW9uIChwYXNzd29yZCwgc2FsdCwgY2ZnKSB7XG5cdCAgICAgICAgcmV0dXJuIEV2cEtERi5jcmVhdGUoY2ZnKS5jb21wdXRlKHBhc3N3b3JkLCBzYWx0KTtcblx0ICAgIH07XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuRXZwS0RGO1xuXG59KSk7IiwgIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZXZwa2RmXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogQ2lwaGVyIGNvcmUgY29tcG9uZW50cy5cblx0ICovXG5cdENyeXB0b0pTLmxpYi5DaXBoZXIgfHwgKGZ1bmN0aW9uICh1bmRlZmluZWQpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQ19saWIuQnVmZmVyZWRCbG9ja0FsZ29yaXRobTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4O1xuXHQgICAgdmFyIEJhc2U2NCA9IENfZW5jLkJhc2U2NDtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cdCAgICB2YXIgRXZwS0RGID0gQ19hbGdvLkV2cEtERjtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBiYXNlIGNpcGhlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0ga2V5U2l6ZSBUaGlzIGNpcGhlcidzIGtleSBzaXplLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpdlNpemUgVGhpcyBjaXBoZXIncyBJViBzaXplLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfRU5DX1hGT1JNX01PREUgQSBjb25zdGFudCByZXByZXNlbnRpbmcgZW5jcnlwdGlvbiBtb2RlLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9ERUNfWEZPUk1fTU9ERSBBIGNvbnN0YW50IHJlcHJlc2VudGluZyBkZWNyeXB0aW9uIG1vZGUuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDaXBoZXIgPSBDX2xpYi5DaXBoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtXb3JkQXJyYXl9IGl2IFRoZSBJViB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgdGhpcyBjaXBoZXIgaW4gZW5jcnlwdGlvbiBtb2RlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGtleSBUaGUga2V5LlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJ9IEEgY2lwaGVyIGluc3RhbmNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVyID0gQ3J5cHRvSlMuYWxnby5BRVMuY3JlYXRlRW5jcnlwdG9yKGtleVdvcmRBcnJheSwgeyBpdjogaXZXb3JkQXJyYXkgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY3JlYXRlRW5jcnlwdG9yOiBmdW5jdGlvbiAoa2V5LCBjZmcpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRoaXMuX0VOQ19YRk9STV9NT0RFLCBrZXksIGNmZyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgdGhpcyBjaXBoZXIgaW4gZGVjcnlwdGlvbiBtb2RlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGtleSBUaGUga2V5LlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJ9IEEgY2lwaGVyIGluc3RhbmNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVyID0gQ3J5cHRvSlMuYWxnby5BRVMuY3JlYXRlRGVjcnlwdG9yKGtleVdvcmRBcnJheSwgeyBpdjogaXZXb3JkQXJyYXkgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY3JlYXRlRGVjcnlwdG9yOiBmdW5jdGlvbiAoa2V5LCBjZmcpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRoaXMuX0RFQ19YRk9STV9NT0RFLCBrZXksIGNmZyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBjaXBoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0geGZvcm1Nb2RlIEVpdGhlciB0aGUgZW5jcnlwdGlvbiBvciBkZWNyeXB0aW9uIHRyYW5zb3JtYXRpb24gbW9kZSBjb25zdGFudC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0ga2V5IFRoZSBrZXkuXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlciA9IENyeXB0b0pTLmFsZ28uQUVTLmNyZWF0ZShDcnlwdG9KUy5hbGdvLkFFUy5fRU5DX1hGT1JNX01PREUsIGtleVdvcmRBcnJheSwgeyBpdjogaXZXb3JkQXJyYXkgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHhmb3JtTW9kZSwga2V5LCBjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU3RvcmUgdHJhbnNmb3JtIG1vZGUgYW5kIGtleVxuXHQgICAgICAgICAgICB0aGlzLl94Zm9ybU1vZGUgPSB4Zm9ybU1vZGU7XG5cdCAgICAgICAgICAgIHRoaXMuX2tleSA9IGtleTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBjaXBoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGNpcGhlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWNpcGhlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFkZHMgZGF0YSB0byBiZSBlbmNyeXB0ZWQgb3IgZGVjcnlwdGVkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhVXBkYXRlIFRoZSBkYXRhIHRvIGVuY3J5cHQgb3IgZGVjcnlwdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGRhdGEgYWZ0ZXIgcHJvY2Vzc2luZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci5wcm9jZXNzKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIucHJvY2Vzcyh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHByb2Nlc3M6IGZ1bmN0aW9uIChkYXRhVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9hcHBlbmQoZGF0YVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBhdmFpbGFibGUgYmxvY2tzXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEZpbmFsaXplcyB0aGUgZW5jcnlwdGlvbiBvciBkZWNyeXB0aW9uIHByb2Nlc3MuXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YVVwZGF0ZSBUaGUgZmluYWwgZGF0YSB0byBlbmNyeXB0IG9yIGRlY3J5cHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBkYXRhIGFmdGVyIGZpbmFsIHByb2Nlc3NpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci5maW5hbGl6ZSgnZGF0YScpO1xuXHQgICAgICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uIChkYXRhVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEZpbmFsIGRhdGEgdXBkYXRlXG5cdCAgICAgICAgICAgIGlmIChkYXRhVXBkYXRlKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmQoZGF0YVVwZGF0ZSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWNpcGhlciBsb2dpY1xuXHQgICAgICAgICAgICB2YXIgZmluYWxQcm9jZXNzZWREYXRhID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBmaW5hbFByb2Nlc3NlZERhdGE7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDEyOC8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogMTI4LzMyLFxuXG5cdCAgICAgICAgX0VOQ19YRk9STV9NT0RFOiAxLFxuXG5cdCAgICAgICAgX0RFQ19YRk9STV9NT0RFOiAyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBzaG9ydGN1dCBmdW5jdGlvbnMgdG8gYSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBUaGUgY2lwaGVyIHRvIGNyZWF0ZSBhIGhlbHBlciBmb3IuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGVuY3J5cHQgYW5kIGRlY3J5cHQgc2hvcnRjdXQgZnVuY3Rpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgQUVTID0gQ3J5cHRvSlMubGliLkNpcGhlci5fY3JlYXRlSGVscGVyKENyeXB0b0pTLmFsZ28uQUVTKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSGVscGVyOiAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDaXBoZXJTdHJhdGVneShrZXkpIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBhc3N3b3JkQmFzZWRDaXBoZXI7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBTZXJpYWxpemFibGVDaXBoZXI7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNpcGhlcikge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgICAgICBlbmNyeXB0OiBmdW5jdGlvbiAobWVzc2FnZSwga2V5LCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdENpcGhlclN0cmF0ZWd5KGtleSkuZW5jcnlwdChjaXBoZXIsIG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAgICAgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgICAgICAgICAgZGVjcnlwdDogZnVuY3Rpb24gKGNpcGhlcnRleHQsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RDaXBoZXJTdHJhdGVneShrZXkpLmRlY3J5cHQoY2lwaGVyLCBjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9KCkpXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBiYXNlIHN0cmVhbSBjaXBoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgbnVtYmVyIG9mIDMyLWJpdCB3b3JkcyB0aGlzIGNpcGhlciBvcGVyYXRlcyBvbi4gRGVmYXVsdDogMSAoMzIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIFN0cmVhbUNpcGhlciA9IENfbGliLlN0cmVhbUNpcGhlciA9IENpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgdmFyIGZpbmFsUHJvY2Vzc2VkQmxvY2tzID0gdGhpcy5fcHJvY2VzcyghISdmbHVzaCcpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBmaW5hbFByb2Nlc3NlZEJsb2Nrcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiAxXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBNb2RlIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbW9kZSA9IEMubW9kZSA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJhc2UgYmxvY2sgY2lwaGVyIG1vZGUgdGVtcGxhdGUuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCbG9ja0NpcGhlck1vZGUgPSBDX2xpYi5CbG9ja0NpcGhlck1vZGUgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyB0aGlzIG1vZGUgZm9yIGVuY3J5cHRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIEEgYmxvY2sgY2lwaGVyIGluc3RhbmNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGl2IFRoZSBJViB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIG1vZGUgPSBDcnlwdG9KUy5tb2RlLkNCQy5jcmVhdGVFbmNyeXB0b3IoY2lwaGVyLCBpdi53b3Jkcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY3JlYXRlRW5jcnlwdG9yOiBmdW5jdGlvbiAoY2lwaGVyLCBpdikge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5FbmNyeXB0b3IuY3JlYXRlKGNpcGhlciwgaXYpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIHRoaXMgbW9kZSBmb3IgZGVjcnlwdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgQSBibG9jayBjaXBoZXIgaW5zdGFuY2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gaXYgVGhlIElWIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbW9kZSA9IENyeXB0b0pTLm1vZGUuQ0JDLmNyZWF0ZURlY3J5cHRvcihjaXBoZXIsIGl2LndvcmRzKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjcmVhdGVEZWNyeXB0b3I6IGZ1bmN0aW9uIChjaXBoZXIsIGl2KSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLkRlY3J5cHRvci5jcmVhdGUoY2lwaGVyLCBpdik7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBtb2RlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJ9IGNpcGhlciBBIGJsb2NrIGNpcGhlciBpbnN0YW5jZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBpdiBUaGUgSVYgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBtb2RlID0gQ3J5cHRvSlMubW9kZS5DQkMuRW5jcnlwdG9yLmNyZWF0ZShjaXBoZXIsIGl2LndvcmRzKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2lwaGVyLCBpdikge1xuXHQgICAgICAgICAgICB0aGlzLl9jaXBoZXIgPSBjaXBoZXI7XG5cdCAgICAgICAgICAgIHRoaXMuX2l2ID0gaXY7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQ2lwaGVyIEJsb2NrIENoYWluaW5nIG1vZGUuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDQkMgPSBDX21vZGUuQ0JDID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBYnN0cmFjdCBiYXNlIENCQyBtb2RlLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHZhciBDQkMgPSBCbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDQkMgZW5jcnlwdG9yLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIENCQy5FbmNyeXB0b3IgPSBDQkMuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIFByb2Nlc3NlcyB0aGUgZGF0YSBibG9jayBhdCBvZmZzZXQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIFRoZSBkYXRhIHdvcmRzIHRvIG9wZXJhdGUgb24uXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB3aGVyZSB0aGUgYmxvY2sgc3RhcnRzLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgbW9kZS5wcm9jZXNzQmxvY2soZGF0YS53b3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIGNpcGhlciA9IHRoaXMuX2NpcGhlcjtcblx0ICAgICAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBjaXBoZXIuYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBYT1IgYW5kIGVuY3J5cHRcblx0ICAgICAgICAgICAgICAgIHhvckJsb2NrLmNhbGwodGhpcywgd29yZHMsIG9mZnNldCwgYmxvY2tTaXplKTtcblx0ICAgICAgICAgICAgICAgIGNpcGhlci5lbmNyeXB0QmxvY2sod29yZHMsIG9mZnNldCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgYmxvY2sgdG8gdXNlIHdpdGggbmV4dCBibG9ja1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fcHJldkJsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBibG9ja1NpemUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSk7XG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDQkMgZGVjcnlwdG9yLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIENCQy5EZWNyeXB0b3IgPSBDQkMuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIFByb2Nlc3NlcyB0aGUgZGF0YSBibG9jayBhdCBvZmZzZXQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIFRoZSBkYXRhIHdvcmRzIHRvIG9wZXJhdGUgb24uXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB3aGVyZSB0aGUgYmxvY2sgc3RhcnRzLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgbW9kZS5wcm9jZXNzQmxvY2soZGF0YS53b3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIGNpcGhlciA9IHRoaXMuX2NpcGhlcjtcblx0ICAgICAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBjaXBoZXIuYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1lbWJlciB0aGlzIGJsb2NrIHRvIHVzZSB3aXRoIG5leHQgYmxvY2tcblx0ICAgICAgICAgICAgICAgIHZhciB0aGlzQmxvY2sgPSB3b3Jkcy5zbGljZShvZmZzZXQsIG9mZnNldCArIGJsb2NrU2l6ZSk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIERlY3J5cHQgYW5kIFhPUlxuXHQgICAgICAgICAgICAgICAgY2lwaGVyLmRlY3J5cHRCbG9jayh3b3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIHhvckJsb2NrLmNhbGwodGhpcywgd29yZHMsIG9mZnNldCwgYmxvY2tTaXplKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVGhpcyBibG9jayBiZWNvbWVzIHRoZSBwcmV2aW91cyBibG9ja1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fcHJldkJsb2NrID0gdGhpc0Jsb2NrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSk7XG5cblx0ICAgICAgICBmdW5jdGlvbiB4b3JCbG9jayh3b3Jkcywgb2Zmc2V0LCBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXG5cdCAgICAgICAgICAgIC8vIENob29zZSBtaXhpbmcgYmxvY2tcblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICBibG9jayA9IGl2O1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGJsb2NrID0gdGhpcy5fcHJldkJsb2NrO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gWE9SIGJsb2Nrc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBibG9ja1tpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiBDQkM7XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFBhZGRpbmcgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19wYWQgPSBDLnBhZCA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFBLQ1MgIzUvNyBwYWRkaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgUGtjczcgPSBDX3BhZC5Qa2NzNyA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQYWRzIGRhdGEgdXNpbmcgdGhlIGFsZ29yaXRobSBkZWZpbmVkIGluIFBLQ1MgIzUvNy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBkYXRhIFRoZSBkYXRhIHRvIHBhZC5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxvY2tTaXplIFRoZSBtdWx0aXBsZSB0aGF0IHRoZSBkYXRhIHNob3VsZCBiZSBwYWRkZWQgdG8uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIENyeXB0b0pTLnBhZC5Qa2NzNy5wYWQod29yZEFycmF5LCA0KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBwYWRkaW5nIGJ5dGVzXG5cdCAgICAgICAgICAgIHZhciBuUGFkZGluZ0J5dGVzID0gYmxvY2tTaXplQnl0ZXMgLSBkYXRhLnNpZ0J5dGVzICUgYmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ3JlYXRlIHBhZGRpbmcgd29yZFxuXHQgICAgICAgICAgICB2YXIgcGFkZGluZ1dvcmQgPSAoblBhZGRpbmdCeXRlcyA8PCAyNCkgfCAoblBhZGRpbmdCeXRlcyA8PCAxNikgfCAoblBhZGRpbmdCeXRlcyA8PCA4KSB8IG5QYWRkaW5nQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ3JlYXRlIHBhZGRpbmdcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmdXb3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5QYWRkaW5nQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgcGFkZGluZ1dvcmRzLnB1c2gocGFkZGluZ1dvcmQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBwYWRkaW5nID0gV29yZEFycmF5LmNyZWF0ZShwYWRkaW5nV29yZHMsIG5QYWRkaW5nQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGEuY29uY2F0KHBhZGRpbmcpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVbnBhZHMgZGF0YSB0aGF0IGhhZCBiZWVuIHBhZGRlZCB1c2luZyB0aGUgYWxnb3JpdGhtIGRlZmluZWQgaW4gUEtDUyAjNS83LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IGRhdGEgVGhlIGRhdGEgdG8gdW5wYWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIENyeXB0b0pTLnBhZC5Qa2NzNy51bnBhZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVucGFkOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgICAgICAvLyBHZXQgbnVtYmVyIG9mIHBhZGRpbmcgYnl0ZXMgZnJvbSBsYXN0IGJ5dGVcblx0ICAgICAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBkYXRhLndvcmRzWyhkYXRhLnNpZ0J5dGVzIC0gMSkgPj4+IDJdICYgMHhmZjtcblxuXHQgICAgICAgICAgICAvLyBSZW1vdmUgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5QYWRkaW5nQnl0ZXM7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBiYXNlIGJsb2NrIGNpcGhlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgY2lwaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiA0ICgxMjggYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXIgPSBDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge01vZGV9IG1vZGUgVGhlIGJsb2NrIG1vZGUgdG8gdXNlLiBEZWZhdWx0OiBDQkNcblx0ICAgICAgICAgKiBAcHJvcGVydHkge1BhZGRpbmd9IHBhZGRpbmcgVGhlIHBhZGRpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBQa2NzN1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQ2lwaGVyLmNmZy5leHRlbmQoe1xuXHQgICAgICAgICAgICBtb2RlOiBDQkMsXG5cdCAgICAgICAgICAgIHBhZGRpbmc6IFBrY3M3XG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgbW9kZUNyZWF0b3I7XG5cblx0ICAgICAgICAgICAgLy8gUmVzZXQgY2lwaGVyXG5cdCAgICAgICAgICAgIENpcGhlci5yZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2ZnID0gdGhpcy5jZmc7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IGNmZy5pdjtcblx0ICAgICAgICAgICAgdmFyIG1vZGUgPSBjZmcubW9kZTtcblxuXHQgICAgICAgICAgICAvLyBSZXNldCBibG9jayBtb2RlXG5cdCAgICAgICAgICAgIGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fRU5DX1hGT1JNX01PREUpIHtcblx0ICAgICAgICAgICAgICAgIG1vZGVDcmVhdG9yID0gbW9kZS5jcmVhdGVFbmNyeXB0b3I7XG5cdCAgICAgICAgICAgIH0gZWxzZSAvKiBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0RFQ19YRk9STV9NT0RFKSAqLyB7XG5cdCAgICAgICAgICAgICAgICBtb2RlQ3JlYXRvciA9IG1vZGUuY3JlYXRlRGVjcnlwdG9yO1xuXHQgICAgICAgICAgICAgICAgLy8gS2VlcCBhdCBsZWFzdCBvbmUgYmxvY2sgaW4gdGhlIGJ1ZmZlciBmb3IgdW5wYWRkaW5nXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9taW5CdWZmZXJTaXplID0gMTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIGlmICh0aGlzLl9tb2RlICYmIHRoaXMuX21vZGUuX19jcmVhdG9yID09IG1vZGVDcmVhdG9yKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9tb2RlLmluaXQodGhpcywgaXYgJiYgaXYud29yZHMpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGVDcmVhdG9yLmNhbGwobW9kZSwgdGhpcywgaXYgJiYgaXYud29yZHMpO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbW9kZS5fX2NyZWF0b3IgPSBtb2RlQ3JlYXRvcjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX21vZGUucHJvY2Vzc0Jsb2NrKHdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgZmluYWxQcm9jZXNzZWRCbG9ja3M7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIHBhZGRpbmcgPSB0aGlzLmNmZy5wYWRkaW5nO1xuXG5cdCAgICAgICAgICAgIC8vIEZpbmFsaXplXG5cdCAgICAgICAgICAgIGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fRU5DX1hGT1JNX01PREUpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFBhZCBkYXRhXG5cdCAgICAgICAgICAgICAgICBwYWRkaW5nLnBhZCh0aGlzLl9kYXRhLCB0aGlzLmJsb2NrU2l6ZSk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICBmaW5hbFByb2Nlc3NlZEJsb2NrcyA9IHRoaXMuX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgICAgfSBlbHNlIC8qIGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fREVDX1hGT1JNX01PREUpICovIHtcblx0ICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICBmaW5hbFByb2Nlc3NlZEJsb2NrcyA9IHRoaXMuX3Byb2Nlc3MoISEnZmx1c2gnKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVW5wYWQgZGF0YVxuXHQgICAgICAgICAgICAgICAgcGFkZGluZy51bnBhZChmaW5hbFByb2Nlc3NlZEJsb2Nrcyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gZmluYWxQcm9jZXNzZWRCbG9ja3M7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogMTI4LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBIGNvbGxlY3Rpb24gb2YgY2lwaGVyIHBhcmFtZXRlcnMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtXb3JkQXJyYXl9IGNpcGhlcnRleHQgVGhlIHJhdyBjaXBoZXJ0ZXh0LlxuXHQgICAgICogQHByb3BlcnR5IHtXb3JkQXJyYXl9IGtleSBUaGUga2V5IHRvIHRoaXMgY2lwaGVydGV4dC5cblx0ICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBpdiBUaGUgSVYgdXNlZCBpbiB0aGUgY2lwaGVyaW5nIG9wZXJhdGlvbi5cblx0ICAgICAqIEBwcm9wZXJ0eSB7V29yZEFycmF5fSBzYWx0IFRoZSBzYWx0IHVzZWQgd2l0aCBhIGtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uLlxuXHQgICAgICogQHByb3BlcnR5IHtDaXBoZXJ9IGFsZ29yaXRobSBUaGUgY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqIEBwcm9wZXJ0eSB7TW9kZX0gbW9kZSBUaGUgYmxvY2sgbW9kZSB1c2VkIGluIHRoZSBjaXBoZXJpbmcgb3BlcmF0aW9uLlxuXHQgICAgICogQHByb3BlcnR5IHtQYWRkaW5nfSBwYWRkaW5nIFRoZSBwYWRkaW5nIHNjaGVtZSB1c2VkIGluIHRoZSBjaXBoZXJpbmcgb3BlcmF0aW9uLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgYmxvY2sgc2l6ZSBvZiB0aGUgY2lwaGVyLlxuXHQgICAgICogQHByb3BlcnR5IHtGb3JtYXR9IGZvcm1hdHRlciBUaGUgZGVmYXVsdCBmb3JtYXR0aW5nIHN0cmF0ZWd5IHRvIGNvbnZlcnQgdGhpcyBjaXBoZXIgcGFyYW1zIG9iamVjdCB0byBhIHN0cmluZy5cblx0ICAgICAqL1xuXHQgICAgdmFyIENpcGhlclBhcmFtcyA9IENfbGliLkNpcGhlclBhcmFtcyA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2lwaGVyUGFyYW1zIEFuIG9iamVjdCB3aXRoIGFueSBvZiB0aGUgcG9zc2libGUgY2lwaGVyIHBhcmFtZXRlcnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJQYXJhbXMgPSBDcnlwdG9KUy5saWIuQ2lwaGVyUGFyYW1zLmNyZWF0ZSh7XG5cdCAgICAgICAgICogICAgICAgICBjaXBoZXJ0ZXh0OiBjaXBoZXJ0ZXh0V29yZEFycmF5LFxuXHQgICAgICAgICAqICAgICAgICAga2V5OiBrZXlXb3JkQXJyYXksXG5cdCAgICAgICAgICogICAgICAgICBpdjogaXZXb3JkQXJyYXksXG5cdCAgICAgICAgICogICAgICAgICBzYWx0OiBzYWx0V29yZEFycmF5LFxuXHQgICAgICAgICAqICAgICAgICAgYWxnb3JpdGhtOiBDcnlwdG9KUy5hbGdvLkFFUyxcblx0ICAgICAgICAgKiAgICAgICAgIG1vZGU6IENyeXB0b0pTLm1vZGUuQ0JDLFxuXHQgICAgICAgICAqICAgICAgICAgcGFkZGluZzogQ3J5cHRvSlMucGFkLlBLQ1M3LFxuXHQgICAgICAgICAqICAgICAgICAgYmxvY2tTaXplOiA0LFxuXHQgICAgICAgICAqICAgICAgICAgZm9ybWF0dGVyOiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTFxuXHQgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2lwaGVyUGFyYW1zKSB7XG5cdCAgICAgICAgICAgIHRoaXMubWl4SW4oY2lwaGVyUGFyYW1zKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyBjaXBoZXIgcGFyYW1zIG9iamVjdCB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Rm9ybWF0fSBmb3JtYXR0ZXIgKE9wdGlvbmFsKSBUaGUgZm9ybWF0dGluZyBzdHJhdGVneSB0byB1c2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCBjaXBoZXIgcGFyYW1zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHRocm93cyBFcnJvciBJZiBuZWl0aGVyIHRoZSBmb3JtYXR0ZXIgbm9yIHRoZSBkZWZhdWx0IGZvcm1hdHRlciBpcyBzZXQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSBjaXBoZXJQYXJhbXMgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IGNpcGhlclBhcmFtcy50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gY2lwaGVyUGFyYW1zLnRvU3RyaW5nKENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGZvcm1hdHRlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gKGZvcm1hdHRlciB8fCB0aGlzLmZvcm1hdHRlcikuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEZvcm1hdCBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2Zvcm1hdCA9IEMuZm9ybWF0ID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogT3BlblNTTCBmb3JtYXR0aW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgT3BlblNTTEZvcm1hdHRlciA9IENfZm9ybWF0Lk9wZW5TU0wgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBjaXBoZXIgcGFyYW1zIG9iamVjdCB0byBhbiBPcGVuU1NMLWNvbXBhdGlibGUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtDaXBoZXJQYXJhbXN9IGNpcGhlclBhcmFtcyBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBPcGVuU1NMLWNvbXBhdGlibGUgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgb3BlblNTTFN0cmluZyA9IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMLnN0cmluZ2lmeShjaXBoZXJQYXJhbXMpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKGNpcGhlclBhcmFtcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZEFycmF5O1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IGNpcGhlclBhcmFtcy5jaXBoZXJ0ZXh0O1xuXHQgICAgICAgICAgICB2YXIgc2FsdCA9IGNpcGhlclBhcmFtcy5zYWx0O1xuXG5cdCAgICAgICAgICAgIC8vIEZvcm1hdFxuXHQgICAgICAgICAgICBpZiAoc2FsdCkge1xuXHQgICAgICAgICAgICAgICAgd29yZEFycmF5ID0gV29yZEFycmF5LmNyZWF0ZShbMHg1MzYxNmM3NCwgMHg2NTY0NWY1Zl0pLmNvbmNhdChzYWx0KS5jb25jYXQoY2lwaGVydGV4dCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB3b3JkQXJyYXkgPSBjaXBoZXJ0ZXh0O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHdvcmRBcnJheS50b1N0cmluZyhCYXNlNjQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhbiBPcGVuU1NMLWNvbXBhdGlibGUgc3RyaW5nIHRvIGEgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3BlblNTTFN0ciBUaGUgT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NpcGhlclBhcmFtc30gVGhlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVyUGFyYW1zID0gQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wucGFyc2Uob3BlblNTTFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChvcGVuU1NMU3RyKSB7XG5cdCAgICAgICAgICAgIHZhciBzYWx0O1xuXG5cdCAgICAgICAgICAgIC8vIFBhcnNlIGJhc2U2NFxuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IEJhc2U2NC5wYXJzZShvcGVuU1NMU3RyKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dFdvcmRzID0gY2lwaGVydGV4dC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBUZXN0IGZvciBzYWx0XG5cdCAgICAgICAgICAgIGlmIChjaXBoZXJ0ZXh0V29yZHNbMF0gPT0gMHg1MzYxNmM3NCAmJiBjaXBoZXJ0ZXh0V29yZHNbMV0gPT0gMHg2NTY0NWY1Zikge1xuXHQgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBzYWx0XG5cdCAgICAgICAgICAgICAgICBzYWx0ID0gV29yZEFycmF5LmNyZWF0ZShjaXBoZXJ0ZXh0V29yZHMuc2xpY2UoMiwgNCkpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgc2FsdCBmcm9tIGNpcGhlcnRleHRcblx0ICAgICAgICAgICAgICAgIGNpcGhlcnRleHRXb3Jkcy5zcGxpY2UoMCwgNCk7XG5cdCAgICAgICAgICAgICAgICBjaXBoZXJ0ZXh0LnNpZ0J5dGVzIC09IDE2O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIENpcGhlclBhcmFtcy5jcmVhdGUoeyBjaXBoZXJ0ZXh0OiBjaXBoZXJ0ZXh0LCBzYWx0OiBzYWx0IH0pO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQSBjaXBoZXIgd3JhcHBlciB0aGF0IHJldHVybnMgY2lwaGVydGV4dCBhcyBhIHNlcmlhbGl6YWJsZSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNlcmlhbGl6YWJsZUNpcGhlciA9IENfbGliLlNlcmlhbGl6YWJsZUNpcGhlciA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcHJvcGVydHkge0Zvcm1hdHRlcn0gZm9ybWF0IFRoZSBmb3JtYXR0aW5nIHN0cmF0ZWd5IHRvIGNvbnZlcnQgY2lwaGVyIHBhcmFtIG9iamVjdHMgdG8gYW5kIGZyb20gYSBzdHJpbmcuIERlZmF1bHQ6IE9wZW5TU0xcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgZm9ybWF0OiBPcGVuU1NMRm9ybWF0dGVyXG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBFbmNyeXB0cyBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZW5jcnlwdC5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0ga2V5IFRoZSBrZXkuXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0NpcGhlclBhcmFtc30gQSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNpcGhlcnRleHRQYXJhbXMgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5lbmNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBtZXNzYWdlLCBrZXksIHsgaXY6IGl2IH0pO1xuXHQgICAgICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5TZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwga2V5LCB7IGl2OiBpdiwgZm9ybWF0OiBDcnlwdG9KUy5mb3JtYXQuT3BlblNTTCB9KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBlbmNyeXB0OiBmdW5jdGlvbiAoY2lwaGVyLCBtZXNzYWdlLCBrZXksIGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICB2YXIgZW5jcnlwdG9yID0gY2lwaGVyLmNyZWF0ZUVuY3J5cHRvcihrZXksIGNmZyk7XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gZW5jcnlwdG9yLmZpbmFsaXplKG1lc3NhZ2UpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBjaXBoZXJDZmcgPSBlbmNyeXB0b3IuY2ZnO1xuXG5cdCAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIHNlcmlhbGl6YWJsZSBjaXBoZXIgcGFyYW1zXG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHtcblx0ICAgICAgICAgICAgICAgIGNpcGhlcnRleHQ6IGNpcGhlcnRleHQsXG5cdCAgICAgICAgICAgICAgICBrZXk6IGtleSxcblx0ICAgICAgICAgICAgICAgIGl2OiBjaXBoZXJDZmcuaXYsXG5cdCAgICAgICAgICAgICAgICBhbGdvcml0aG06IGNpcGhlcixcblx0ICAgICAgICAgICAgICAgIG1vZGU6IGNpcGhlckNmZy5tb2RlLFxuXHQgICAgICAgICAgICAgICAgcGFkZGluZzogY2lwaGVyQ2ZnLnBhZGRpbmcsXG5cdCAgICAgICAgICAgICAgICBibG9ja1NpemU6IGNpcGhlci5ibG9ja1NpemUsXG5cdCAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGNmZy5mb3JtYXRcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIERlY3J5cHRzIHNlcmlhbGl6ZWQgY2lwaGVydGV4dC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyfSBjaXBoZXIgVGhlIGNpcGhlciBhbGdvcml0aG0gdG8gdXNlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfHN0cmluZ30gY2lwaGVydGV4dCBUaGUgY2lwaGVydGV4dCB0byBkZWNyeXB0LlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSBrZXkgVGhlIGtleS5cblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcGxhaW50ZXh0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcGxhaW50ZXh0ID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBmb3JtYXR0ZWRDaXBoZXJ0ZXh0LCBrZXksIHsgaXY6IGl2LCBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqICAgICB2YXIgcGxhaW50ZXh0ID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBjaXBoZXJ0ZXh0UGFyYW1zLCBrZXksIHsgaXY6IGl2LCBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGRlY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXIsIGNpcGhlcnRleHQsIGtleSwgY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICBjZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBDaXBoZXJQYXJhbXNcblx0ICAgICAgICAgICAgY2lwaGVydGV4dCA9IHRoaXMuX3BhcnNlKGNpcGhlcnRleHQsIGNmZy5mb3JtYXQpO1xuXG5cdCAgICAgICAgICAgIC8vIERlY3J5cHRcblx0ICAgICAgICAgICAgdmFyIHBsYWludGV4dCA9IGNpcGhlci5jcmVhdGVEZWNyeXB0b3Ioa2V5LCBjZmcpLmZpbmFsaXplKGNpcGhlcnRleHQuY2lwaGVydGV4dCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgc2VyaWFsaXplZCBjaXBoZXJ0ZXh0IHRvIENpcGhlclBhcmFtcyxcblx0ICAgICAgICAgKiBlbHNlIGFzc3VtZWQgQ2lwaGVyUGFyYW1zIGFscmVhZHkgYW5kIHJldHVybnMgY2lwaGVydGV4dCB1bmNoYW5nZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlclBhcmFtc3xzdHJpbmd9IGNpcGhlcnRleHQgVGhlIGNpcGhlcnRleHQuXG5cdCAgICAgICAgICogQHBhcmFtIHtGb3JtYXR0ZXJ9IGZvcm1hdCBUaGUgZm9ybWF0dGluZyBzdHJhdGVneSB0byB1c2UgdG8gcGFyc2Ugc2VyaWFsaXplZCBjaXBoZXJ0ZXh0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBUaGUgdW5zZXJpYWxpemVkIGNpcGhlcnRleHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5fcGFyc2UoY2lwaGVydGV4dFN0cmluZ09yUGFyYW1zLCBmb3JtYXQpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wYXJzZTogZnVuY3Rpb24gKGNpcGhlcnRleHQsIGZvcm1hdCkge1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNpcGhlcnRleHQgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQucGFyc2UoY2lwaGVydGV4dCwgdGhpcyk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfa2RmID0gQy5rZGYgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBPcGVuU1NMIGtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uLlxuXHQgICAgICovXG5cdCAgICB2YXIgT3BlblNTTEtkZiA9IENfa2RmLk9wZW5TU0wgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVyaXZlcyBhIGtleSBhbmQgSVYgZnJvbSBhIHBhc3N3b3JkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZCB0byBkZXJpdmUgZnJvbS5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0ga2V5U2l6ZSBUaGUgc2l6ZSBpbiB3b3JkcyBvZiB0aGUga2V5IHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpdlNpemUgVGhlIHNpemUgaW4gd29yZHMgb2YgdGhlIElWIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gc2FsdCAoT3B0aW9uYWwpIEEgNjQtYml0IHNhbHQgdG8gdXNlLiBJZiBvbWl0dGVkLCBhIHNhbHQgd2lsbCBiZSBnZW5lcmF0ZWQgcmFuZG9tbHkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IEEgY2lwaGVyIHBhcmFtcyBvYmplY3Qgd2l0aCB0aGUga2V5LCBJViwgYW5kIHNhbHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBkZXJpdmVkUGFyYW1zID0gQ3J5cHRvSlMua2RmLk9wZW5TU0wuZXhlY3V0ZSgnUGFzc3dvcmQnLCAyNTYvMzIsIDEyOC8zMik7XG5cdCAgICAgICAgICogICAgIHZhciBkZXJpdmVkUGFyYW1zID0gQ3J5cHRvSlMua2RmLk9wZW5TU0wuZXhlY3V0ZSgnUGFzc3dvcmQnLCAyNTYvMzIsIDEyOC8zMiwgJ3NhbHRzYWx0Jyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKHBhc3N3b3JkLCBrZXlTaXplLCBpdlNpemUsIHNhbHQsIGhhc2hlcikge1xuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gc2FsdFxuXHQgICAgICAgICAgICBpZiAoIXNhbHQpIHtcblx0ICAgICAgICAgICAgICAgIHNhbHQgPSBXb3JkQXJyYXkucmFuZG9tKDY0LzgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gRGVyaXZlIGtleSBhbmQgSVZcblx0ICAgICAgICAgICAgaWYgKCFoYXNoZXIpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrZXkgPSBFdnBLREYuY3JlYXRlKHsga2V5U2l6ZToga2V5U2l6ZSArIGl2U2l6ZSB9KS5jb21wdXRlKHBhc3N3b3JkLCBzYWx0KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrZXkgPSBFdnBLREYuY3JlYXRlKHsga2V5U2l6ZToga2V5U2l6ZSArIGl2U2l6ZSwgaGFzaGVyOiBoYXNoZXIgfSkuY29tcHV0ZShwYXNzd29yZCwgc2FsdCk7XG5cdCAgICAgICAgICAgIH1cblxuXG5cdCAgICAgICAgICAgIC8vIFNlcGFyYXRlIGtleSBhbmQgSVZcblx0ICAgICAgICAgICAgdmFyIGl2ID0gV29yZEFycmF5LmNyZWF0ZShrZXkud29yZHMuc2xpY2Uoa2V5U2l6ZSksIGl2U2l6ZSAqIDQpO1xuXHQgICAgICAgICAgICBrZXkuc2lnQnl0ZXMgPSBrZXlTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcGFyYW1zXG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHsga2V5OiBrZXksIGl2OiBpdiwgc2FsdDogc2FsdCB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEEgc2VyaWFsaXphYmxlIGNpcGhlciB3cmFwcGVyIHRoYXQgZGVyaXZlcyB0aGUga2V5IGZyb20gYSBwYXNzd29yZCxcblx0ICAgICAqIGFuZCByZXR1cm5zIGNpcGhlcnRleHQgYXMgYSBzZXJpYWxpemFibGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgKi9cblx0ICAgIHZhciBQYXNzd29yZEJhc2VkQ2lwaGVyID0gQ19saWIuUGFzc3dvcmRCYXNlZENpcGhlciA9IFNlcmlhbGl6YWJsZUNpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwcm9wZXJ0eSB7S0RGfSBrZGYgVGhlIGtleSBkZXJpdmF0aW9uIGZ1bmN0aW9uIHRvIHVzZSB0byBnZW5lcmF0ZSBhIGtleSBhbmQgSVYgZnJvbSBhIHBhc3N3b3JkLiBEZWZhdWx0OiBPcGVuU1NMXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBTZXJpYWxpemFibGVDaXBoZXIuY2ZnLmV4dGVuZCh7XG5cdCAgICAgICAgICAgIGtkZjogT3BlblNTTEtkZlxuXHQgICAgICAgIH0pLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRW5jcnlwdHMgYSBtZXNzYWdlIHVzaW5nIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZW5jcnlwdC5cblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgVGhlIHBhc3N3b3JkLlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtDaXBoZXJQYXJhbXN9IEEgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlBhc3N3b3JkQmFzZWRDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwgJ3Bhc3N3b3JkJyk7XG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlBhc3N3b3JkQmFzZWRDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwgJ3Bhc3N3b3JkJywgeyBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMIH0pO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGVuY3J5cHQ6IGZ1bmN0aW9uIChjaXBoZXIsIG1lc3NhZ2UsIHBhc3N3b3JkLCBjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIGNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIERlcml2ZSBrZXkgYW5kIG90aGVyIHBhcmFtc1xuXHQgICAgICAgICAgICB2YXIgZGVyaXZlZFBhcmFtcyA9IGNmZy5rZGYuZXhlY3V0ZShwYXNzd29yZCwgY2lwaGVyLmtleVNpemUsIGNpcGhlci5pdlNpemUsIGNmZy5zYWx0LCBjZmcuaGFzaGVyKTtcblxuXHQgICAgICAgICAgICAvLyBBZGQgSVYgdG8gY29uZmlnXG5cdCAgICAgICAgICAgIGNmZy5pdiA9IGRlcml2ZWRQYXJhbXMuaXY7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IFNlcmlhbGl6YWJsZUNpcGhlci5lbmNyeXB0LmNhbGwodGhpcywgY2lwaGVyLCBtZXNzYWdlLCBkZXJpdmVkUGFyYW1zLmtleSwgY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBNaXggaW4gZGVyaXZlZCBwYXJhbXNcblx0ICAgICAgICAgICAgY2lwaGVydGV4dC5taXhJbihkZXJpdmVkUGFyYW1zKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRGVjcnlwdHMgc2VyaWFsaXplZCBjaXBoZXJ0ZXh0IHVzaW5nIGEgcGFzc3dvcmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlcn0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge0NpcGhlclBhcmFtc3xzdHJpbmd9IGNpcGhlcnRleHQgVGhlIGNpcGhlcnRleHQgdG8gZGVjcnlwdC5cblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgVGhlIHBhc3N3b3JkLlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwbGFpbnRleHQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwbGFpbnRleHQgPSBDcnlwdG9KUy5saWIuUGFzc3dvcmRCYXNlZENpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBmb3JtYXR0ZWRDaXBoZXJ0ZXh0LCAncGFzc3dvcmQnLCB7IGZvcm1hdDogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wgfSk7XG5cdCAgICAgICAgICogICAgIHZhciBwbGFpbnRleHQgPSBDcnlwdG9KUy5saWIuUGFzc3dvcmRCYXNlZENpcGhlci5kZWNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBjaXBoZXJ0ZXh0UGFyYW1zLCAncGFzc3dvcmQnLCB7IGZvcm1hdDogQ3J5cHRvSlMuZm9ybWF0Lk9wZW5TU0wgfSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZGVjcnlwdDogZnVuY3Rpb24gKGNpcGhlciwgY2lwaGVydGV4dCwgcGFzc3dvcmQsIGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gQ2lwaGVyUGFyYW1zXG5cdCAgICAgICAgICAgIGNpcGhlcnRleHQgPSB0aGlzLl9wYXJzZShjaXBoZXJ0ZXh0LCBjZmcuZm9ybWF0KTtcblxuXHQgICAgICAgICAgICAvLyBEZXJpdmUga2V5IGFuZCBvdGhlciBwYXJhbXNcblx0ICAgICAgICAgICAgdmFyIGRlcml2ZWRQYXJhbXMgPSBjZmcua2RmLmV4ZWN1dGUocGFzc3dvcmQsIGNpcGhlci5rZXlTaXplLCBjaXBoZXIuaXZTaXplLCBjaXBoZXJ0ZXh0LnNhbHQsIGNmZy5oYXNoZXIpO1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBJViB0byBjb25maWdcblx0ICAgICAgICAgICAgY2ZnLml2ID0gZGVyaXZlZFBhcmFtcy5pdjtcblxuXHQgICAgICAgICAgICAvLyBEZWNyeXB0XG5cdCAgICAgICAgICAgIHZhciBwbGFpbnRleHQgPSBTZXJpYWxpemFibGVDaXBoZXIuZGVjcnlwdC5jYWxsKHRoaXMsIGNpcGhlciwgY2lwaGVydGV4dCwgZGVyaXZlZFBhcmFtcy5rZXksIGNmZyk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG59KSk7IiwgIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIENpcGhlciBGZWVkYmFjayBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5DRkIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENGQiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIENGQi5FbmNyeXB0b3IgPSBDRkIuZXh0ZW5kKHtcblx0ICAgICAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uICh3b3Jkcywgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVyID0gdGhpcy5fY2lwaGVyO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICBnZW5lcmF0ZUtleXN0cmVhbUFuZEVuY3J5cHQuY2FsbCh0aGlzLCB3b3Jkcywgb2Zmc2V0LCBibG9ja1NpemUsIGNpcGhlcik7XG5cblx0ICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHdvcmRzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgYmxvY2tTaXplKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgQ0ZCLkRlY3J5cHRvciA9IENGQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXI7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBjaXBoZXIuYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoaXMgYmxvY2sgdG8gdXNlIHdpdGggbmV4dCBibG9ja1xuXHQgICAgICAgICAgICB2YXIgdGhpc0Jsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBibG9ja1NpemUpO1xuXG5cdCAgICAgICAgICAgIGdlbmVyYXRlS2V5c3RyZWFtQW5kRW5jcnlwdC5jYWxsKHRoaXMsIHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKTtcblxuXHQgICAgICAgICAgICAvLyBUaGlzIGJsb2NrIGJlY29tZXMgdGhlIHByZXZpb3VzIGJsb2NrXG5cdCAgICAgICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHRoaXNCbG9jaztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzdHJlYW1BbmRFbmNyeXB0KHdvcmRzLCBvZmZzZXQsIGJsb2NrU2l6ZSwgY2lwaGVyKSB7XG5cdCAgICAgICAgdmFyIGtleXN0cmVhbTtcblxuXHQgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgdmFyIGl2ID0gdGhpcy5faXY7XG5cblx0ICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW1cblx0ICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAga2V5c3RyZWFtID0gaXYuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgLy8gUmVtb3ZlIElWIGZvciBzdWJzZXF1ZW50IGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBrZXlzdHJlYW0gPSB0aGlzLl9wcmV2QmxvY2s7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGNpcGhlci5lbmNyeXB0QmxvY2soa2V5c3RyZWFtLCAwKTtcblxuXHQgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGtleXN0cmVhbVtpXTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBDRkI7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMubW9kZS5DRkI7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogQ291bnRlciBibG9jayBtb2RlLlxuXHQgKi9cblx0Q3J5cHRvSlMubW9kZS5DVFIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIENUUiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0ICAgIHZhciBFbmNyeXB0b3IgPSBDVFIuRW5jcnlwdG9yID0gQ1RSLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNpcGhlciA9IHRoaXMuX2NpcGhlclxuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGl2ID0gdGhpcy5faXY7XG5cdCAgICAgICAgICAgIHZhciBjb3VudGVyID0gdGhpcy5fY291bnRlcjtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW1cblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlciA9IGl2LnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gY291bnRlci5zbGljZSgwKTtcblx0ICAgICAgICAgICAgY2lwaGVyLmVuY3J5cHRCbG9jayhrZXlzdHJlYW0sIDApO1xuXG5cdCAgICAgICAgICAgIC8vIEluY3JlbWVudCBjb3VudGVyXG5cdCAgICAgICAgICAgIGNvdW50ZXJbYmxvY2tTaXplIC0gMV0gPSAoY291bnRlcltibG9ja1NpemUgLSAxXSArIDEpIHwgMFxuXG5cdCAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbb2Zmc2V0ICsgaV0gXj0ga2V5c3RyZWFtW2ldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIENUUi5EZWNyeXB0b3IgPSBFbmNyeXB0b3I7XG5cblx0ICAgIHJldHVybiBDVFI7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMubW9kZS5DVFI7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKiogQHByZXNlcnZlXG5cdCAqIENvdW50ZXIgYmxvY2sgbW9kZSBjb21wYXRpYmxlIHdpdGggIERyIEJyaWFuIEdsYWRtYW4gZmlsZWVuYy5jXG5cdCAqIGRlcml2ZWQgZnJvbSBDcnlwdG9KUy5tb2RlLkNUUlxuXHQgKiBKYW4gSHJ1YnkgamhydWJ5LndlYkBnbWFpbC5jb21cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuQ1RSR2xhZG1hbiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgQ1RSR2xhZG1hbiA9IENyeXB0b0pTLmxpYi5CbG9ja0NpcGhlck1vZGUuZXh0ZW5kKCk7XG5cblx0XHRmdW5jdGlvbiBpbmNXb3JkKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYgKCgod29yZCA+PiAyNCkgJiAweGZmKSA9PT0gMHhmZikgeyAvL292ZXJmbG93XG5cdFx0XHR2YXIgYjEgPSAod29yZCA+PiAxNikmMHhmZjtcblx0XHRcdHZhciBiMiA9ICh3b3JkID4+IDgpJjB4ZmY7XG5cdFx0XHR2YXIgYjMgPSB3b3JkICYgMHhmZjtcblxuXHRcdFx0aWYgKGIxID09PSAweGZmKSAvLyBvdmVyZmxvdyBiMVxuXHRcdFx0e1xuXHRcdFx0YjEgPSAwO1xuXHRcdFx0aWYgKGIyID09PSAweGZmKVxuXHRcdFx0e1xuXHRcdFx0XHRiMiA9IDA7XG5cdFx0XHRcdGlmIChiMyA9PT0gMHhmZilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGIzID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQrK2IzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdCsrYjI7XG5cdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHQrK2IxO1xuXHRcdFx0fVxuXG5cdFx0XHR3b3JkID0gMDtcblx0XHRcdHdvcmQgKz0gKGIxIDw8IDE2KTtcblx0XHRcdHdvcmQgKz0gKGIyIDw8IDgpO1xuXHRcdFx0d29yZCArPSBiMztcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdHdvcmQgKz0gKDB4MDEgPDwgMjQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHdvcmQ7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaW5jQ291bnRlcihjb3VudGVyKVxuXHRcdHtcblx0XHRcdGlmICgoY291bnRlclswXSA9IGluY1dvcmQoY291bnRlclswXSkpID09PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBlbmNyX2RhdGEgaW4gZmlsZWVuYy5jIGZyb20gIERyIEJyaWFuIEdsYWRtYW4ncyBjb3VudHMgb25seSB3aXRoIERXT1JEIGogPCA4XG5cdFx0XHRcdGNvdW50ZXJbMV0gPSBpbmNXb3JkKGNvdW50ZXJbMV0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvdW50ZXI7XG5cdFx0fVxuXG5cdCAgICB2YXIgRW5jcnlwdG9yID0gQ1RSR2xhZG1hbi5FbmNyeXB0b3IgPSBDVFJHbGFkbWFuLmV4dGVuZCh7XG5cdCAgICAgICAgcHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAod29yZHMsIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGNpcGhlciA9IHRoaXMuX2NpcGhlclxuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gY2lwaGVyLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGl2ID0gdGhpcy5faXY7XG5cdCAgICAgICAgICAgIHZhciBjb3VudGVyID0gdGhpcy5fY291bnRlcjtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW1cblx0ICAgICAgICAgICAgaWYgKGl2KSB7XG5cdCAgICAgICAgICAgICAgICBjb3VudGVyID0gdGhpcy5fY291bnRlciA9IGl2LnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfVxuXG5cdFx0XHRcdGluY0NvdW50ZXIoY291bnRlcik7XG5cblx0XHRcdFx0dmFyIGtleXN0cmVhbSA9IGNvdW50ZXIuc2xpY2UoMCk7XG5cdCAgICAgICAgICAgIGNpcGhlci5lbmNyeXB0QmxvY2soa2V5c3RyZWFtLCAwKTtcblxuXHQgICAgICAgICAgICAvLyBFbmNyeXB0XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tTaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGtleXN0cmVhbVtpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBDVFJHbGFkbWFuLkRlY3J5cHRvciA9IEVuY3J5cHRvcjtcblxuXHQgICAgcmV0dXJuIENUUkdsYWRtYW47XG5cdH0oKSk7XG5cblxuXG5cblx0cmV0dXJuIENyeXB0b0pTLm1vZGUuQ1RSR2xhZG1hbjtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBPdXRwdXQgRmVlZGJhY2sgYmxvY2sgbW9kZS5cblx0ICovXG5cdENyeXB0b0pTLm1vZGUuT0ZCID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBPRkIgPSBDcnlwdG9KUy5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO1xuXG5cdCAgICB2YXIgRW5jcnlwdG9yID0gT0ZCLkVuY3J5cHRvciA9IE9GQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBjaXBoZXIgPSB0aGlzLl9jaXBoZXJcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IGNpcGhlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuX2l2O1xuXHQgICAgICAgICAgICB2YXIga2V5c3RyZWFtID0gdGhpcy5fa2V5c3RyZWFtO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGtleXN0cmVhbVxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIGtleXN0cmVhbSA9IHRoaXMuX2tleXN0cmVhbSA9IGl2LnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pdiA9IHVuZGVmaW5lZDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjaXBoZXIuZW5jcnlwdEJsb2NrKGtleXN0cmVhbSwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBrZXlzdHJlYW1baV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgT0ZCLkRlY3J5cHRvciA9IEVuY3J5cHRvcjtcblxuXHQgICAgcmV0dXJuIE9GQjtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5tb2RlLk9GQjtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBFbGVjdHJvbmljIENvZGVib29rIGJsb2NrIG1vZGUuXG5cdCAqL1xuXHRDcnlwdG9KUy5tb2RlLkVDQiA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgRUNCID0gQ3J5cHRvSlMubGliLkJsb2NrQ2lwaGVyTW9kZS5leHRlbmQoKTtcblxuXHQgICAgRUNCLkVuY3J5cHRvciA9IEVDQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdGhpcy5fY2lwaGVyLmVuY3J5cHRCbG9jayh3b3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgRUNCLkRlY3J5cHRvciA9IEVDQi5leHRlbmQoe1xuXHQgICAgICAgIHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKHdvcmRzLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdGhpcy5fY2lwaGVyLmRlY3J5cHRCbG9jayh3b3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgcmV0dXJuIEVDQjtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5tb2RlLkVDQjtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBBTlNJIFguOTIzIHBhZGRpbmcgc3RyYXRlZ3kuXG5cdCAqL1xuXHRDcnlwdG9KUy5wYWQuQW5zaVg5MjMgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICB2YXIgZGF0YVNpZ0J5dGVzID0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgLy8gQ291bnQgcGFkZGluZyBieXRlc1xuXHQgICAgICAgIHZhciBuUGFkZGluZ0J5dGVzID0gYmxvY2tTaXplQnl0ZXMgLSBkYXRhU2lnQnl0ZXMgJSBibG9ja1NpemVCeXRlcztcblxuXHQgICAgICAgIC8vIENvbXB1dGUgbGFzdCBieXRlIHBvc2l0aW9uXG5cdCAgICAgICAgdmFyIGxhc3RCeXRlUG9zID0gZGF0YVNpZ0J5dGVzICsgblBhZGRpbmdCeXRlcyAtIDE7XG5cblx0ICAgICAgICAvLyBQYWRcblx0ICAgICAgICBkYXRhLmNsYW1wKCk7XG5cdCAgICAgICAgZGF0YS53b3Jkc1tsYXN0Qnl0ZVBvcyA+Pj4gMl0gfD0gblBhZGRpbmdCeXRlcyA8PCAoMjQgLSAobGFzdEJ5dGVQb3MgJSA0KSAqIDgpO1xuXHQgICAgICAgIGRhdGEuc2lnQnl0ZXMgKz0gblBhZGRpbmdCeXRlcztcblx0ICAgIH0sXG5cblx0ICAgIHVucGFkOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgIC8vIEdldCBudW1iZXIgb2YgcGFkZGluZyBieXRlcyBmcm9tIGxhc3QgYnl0ZVxuXHQgICAgICAgIHZhciBuUGFkZGluZ0J5dGVzID0gZGF0YS53b3Jkc1soZGF0YS5zaWdCeXRlcyAtIDEpID4+PiAyXSAmIDB4ZmY7XG5cblx0ICAgICAgICAvLyBSZW1vdmUgcGFkZGluZ1xuXHQgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gblBhZGRpbmdCeXRlcztcblx0ICAgIH1cblx0fTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5wYWQuQW5zaXg5MjM7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQvKipcblx0ICogSVNPIDEwMTI2IHBhZGRpbmcgc3RyYXRlZ3kuXG5cdCAqL1xuXHRDcnlwdG9KUy5wYWQuSXNvMTAxMjYgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAvLyBDb3VudCBwYWRkaW5nIGJ5dGVzXG5cdCAgICAgICAgdmFyIG5QYWRkaW5nQnl0ZXMgPSBibG9ja1NpemVCeXRlcyAtIGRhdGEuc2lnQnl0ZXMgJSBibG9ja1NpemVCeXRlcztcblxuXHQgICAgICAgIC8vIFBhZFxuXHQgICAgICAgIGRhdGEuY29uY2F0KENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkucmFuZG9tKG5QYWRkaW5nQnl0ZXMgLSAxKSkuXG5cdCAgICAgICAgICAgICBjb25jYXQoQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoW25QYWRkaW5nQnl0ZXMgPDwgMjRdLCAxKSk7XG5cdCAgICB9LFxuXG5cdCAgICB1bnBhZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAvLyBHZXQgbnVtYmVyIG9mIHBhZGRpbmcgYnl0ZXMgZnJvbSBsYXN0IGJ5dGVcblx0ICAgICAgICB2YXIgblBhZGRpbmdCeXRlcyA9IGRhdGEud29yZHNbKGRhdGEuc2lnQnl0ZXMgLSAxKSA+Pj4gMl0gJiAweGZmO1xuXG5cdCAgICAgICAgLy8gUmVtb3ZlIHBhZGRpbmdcblx0ICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5QYWRkaW5nQnl0ZXM7XG5cdCAgICB9XG5cdH07XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMucGFkLklzbzEwMTI2O1xuXG59KSk7IiwgIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0LyoqXG5cdCAqIElTTy9JRUMgOTc5Ny0xIFBhZGRpbmcgTWV0aG9kIDIuXG5cdCAqL1xuXHRDcnlwdG9KUy5wYWQuSXNvOTc5NzEgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAvLyBBZGQgMHg4MCBieXRlXG5cdCAgICAgICAgZGF0YS5jb25jYXQoQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4ODAwMDAwMDBdLCAxKSk7XG5cblx0ICAgICAgICAvLyBaZXJvIHBhZCB0aGUgcmVzdFxuXHQgICAgICAgIENyeXB0b0pTLnBhZC5aZXJvUGFkZGluZy5wYWQoZGF0YSwgYmxvY2tTaXplKTtcblx0ICAgIH0sXG5cblx0ICAgIHVucGFkOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgIC8vIFJlbW92ZSB6ZXJvIHBhZGRpbmdcblx0ICAgICAgICBDcnlwdG9KUy5wYWQuWmVyb1BhZGRpbmcudW5wYWQoZGF0YSk7XG5cblx0ICAgICAgICAvLyBSZW1vdmUgb25lIG1vcmUgYnl0ZSAtLSB0aGUgMHg4MCBieXRlXG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcy0tO1xuXHQgICAgfVxuXHR9O1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLnBhZC5Jc285Nzk3MTtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBaZXJvIHBhZGRpbmcgc3RyYXRlZ3kuXG5cdCAqL1xuXHRDcnlwdG9KUy5wYWQuWmVyb1BhZGRpbmcgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uIChkYXRhLCBibG9ja1NpemUpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAvLyBQYWRcblx0ICAgICAgICBkYXRhLmNsYW1wKCk7XG5cdCAgICAgICAgZGF0YS5zaWdCeXRlcyArPSBibG9ja1NpemVCeXRlcyAtICgoZGF0YS5zaWdCeXRlcyAlIGJsb2NrU2l6ZUJ5dGVzKSB8fCBibG9ja1NpemVCeXRlcyk7XG5cdCAgICB9LFxuXG5cdCAgICB1bnBhZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgLy8gVW5wYWRcblx0ICAgICAgICB2YXIgaSA9IGRhdGEuc2lnQnl0ZXMgLSAxO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSBkYXRhLnNpZ0J5dGVzIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgICAgICAgICAgaWYgKCgoZGF0YVdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZikpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBpICsgMTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9O1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLnBhZC5aZXJvUGFkZGluZztcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdC8qKlxuXHQgKiBBIG5vb3AgcGFkZGluZyBzdHJhdGVneS5cblx0ICovXG5cdENyeXB0b0pTLnBhZC5Ob1BhZGRpbmcgPSB7XG5cdCAgICBwYWQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIH0sXG5cblx0ICAgIHVucGFkOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB9XG5cdH07XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMucGFkLk5vUGFkZGluZztcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBDaXBoZXJQYXJhbXMgPSBDX2xpYi5DaXBoZXJQYXJhbXM7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXg7XG5cdCAgICB2YXIgQ19mb3JtYXQgPSBDLmZvcm1hdDtcblxuXHQgICAgdmFyIEhleEZvcm1hdHRlciA9IENfZm9ybWF0LkhleCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGUgY2lwaGVydGV4dCBvZiBhIGNpcGhlciBwYXJhbXMgb2JqZWN0IHRvIGEgaGV4YWRlY2ltYWxseSBlbmNvZGVkIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Q2lwaGVyUGFyYW1zfSBjaXBoZXJQYXJhbXMgVGhlIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4YWRlY2ltYWxseSBlbmNvZGVkIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmZvcm1hdC5IZXguc3RyaW5naWZ5KGNpcGhlclBhcmFtcyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoY2lwaGVyUGFyYW1zKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjaXBoZXJQYXJhbXMuY2lwaGVydGV4dC50b1N0cmluZyhIZXgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleGFkZWNpbWFsbHkgZW5jb2RlZCBjaXBoZXJ0ZXh0IHN0cmluZyB0byBhIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IFRoZSBoZXhhZGVjaW1hbGx5IGVuY29kZWQgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7Q2lwaGVyUGFyYW1zfSBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjaXBoZXJQYXJhbXMgPSBDcnlwdG9KUy5mb3JtYXQuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChpbnB1dCkge1xuXHQgICAgICAgICAgICB2YXIgY2lwaGVydGV4dCA9IEhleC5wYXJzZShpbnB1dCk7XG5cdCAgICAgICAgICAgIHJldHVybiBDaXBoZXJQYXJhbXMuY3JlYXRlKHsgY2lwaGVydGV4dDogY2lwaGVydGV4dCB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLmZvcm1hdC5IZXg7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2VuYy1iYXNlNjRcIiksIHJlcXVpcmUoXCIuL21kNVwiKSwgcmVxdWlyZShcIi4vZXZwa2RmXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9lbmMtYmFzZTY0XCIsIFwiLi9tZDVcIiwgXCIuL2V2cGtkZlwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCbG9ja0NpcGhlciA9IENfbGliLkJsb2NrQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gTG9va3VwIHRhYmxlc1xuXHQgICAgdmFyIFNCT1ggPSBbXTtcblx0ICAgIHZhciBJTlZfU0JPWCA9IFtdO1xuXHQgICAgdmFyIFNVQl9NSVhfMCA9IFtdO1xuXHQgICAgdmFyIFNVQl9NSVhfMSA9IFtdO1xuXHQgICAgdmFyIFNVQl9NSVhfMiA9IFtdO1xuXHQgICAgdmFyIFNVQl9NSVhfMyA9IFtdO1xuXHQgICAgdmFyIElOVl9TVUJfTUlYXzAgPSBbXTtcblx0ICAgIHZhciBJTlZfU1VCX01JWF8xID0gW107XG5cdCAgICB2YXIgSU5WX1NVQl9NSVhfMiA9IFtdO1xuXHQgICAgdmFyIElOVl9TVUJfTUlYXzMgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBsb29rdXAgdGFibGVzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIC8vIENvbXB1dGUgZG91YmxlIHRhYmxlXG5cdCAgICAgICAgdmFyIGQgPSBbXTtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG5cdCAgICAgICAgICAgIGlmIChpIDwgMTI4KSB7XG5cdCAgICAgICAgICAgICAgICBkW2ldID0gaSA8PCAxO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgZFtpXSA9IChpIDw8IDEpIF4gMHgxMWI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBXYWxrIEdGKDJeOClcblx0ICAgICAgICB2YXIgeCA9IDA7XG5cdCAgICAgICAgdmFyIHhpID0gMDtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgc2JveFxuXHQgICAgICAgICAgICB2YXIgc3ggPSB4aSBeICh4aSA8PCAxKSBeICh4aSA8PCAyKSBeICh4aSA8PCAzKSBeICh4aSA8PCA0KTtcblx0ICAgICAgICAgICAgc3ggPSAoc3ggPj4+IDgpIF4gKHN4ICYgMHhmZikgXiAweDYzO1xuXHQgICAgICAgICAgICBTQk9YW3hdID0gc3g7XG5cdCAgICAgICAgICAgIElOVl9TQk9YW3N4XSA9IHg7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBtdWx0aXBsaWNhdGlvblxuXHQgICAgICAgICAgICB2YXIgeDIgPSBkW3hdO1xuXHQgICAgICAgICAgICB2YXIgeDQgPSBkW3gyXTtcblx0ICAgICAgICAgICAgdmFyIHg4ID0gZFt4NF07XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBzdWIgYnl0ZXMsIG1peCBjb2x1bW5zIHRhYmxlc1xuXHQgICAgICAgICAgICB2YXIgdCA9IChkW3N4XSAqIDB4MTAxKSBeIChzeCAqIDB4MTAxMDEwMCk7XG5cdCAgICAgICAgICAgIFNVQl9NSVhfMFt4XSA9ICh0IDw8IDI0KSB8ICh0ID4+PiA4KTtcblx0ICAgICAgICAgICAgU1VCX01JWF8xW3hdID0gKHQgPDwgMTYpIHwgKHQgPj4+IDE2KTtcblx0ICAgICAgICAgICAgU1VCX01JWF8yW3hdID0gKHQgPDwgOCkgIHwgKHQgPj4+IDI0KTtcblx0ICAgICAgICAgICAgU1VCX01JWF8zW3hdID0gdDtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGludiBzdWIgYnl0ZXMsIGludiBtaXggY29sdW1ucyB0YWJsZXNcblx0ICAgICAgICAgICAgdmFyIHQgPSAoeDggKiAweDEwMTAxMDEpIF4gKHg0ICogMHgxMDAwMSkgXiAoeDIgKiAweDEwMSkgXiAoeCAqIDB4MTAxMDEwMCk7XG5cdCAgICAgICAgICAgIElOVl9TVUJfTUlYXzBbc3hdID0gKHQgPDwgMjQpIHwgKHQgPj4+IDgpO1xuXHQgICAgICAgICAgICBJTlZfU1VCX01JWF8xW3N4XSA9ICh0IDw8IDE2KSB8ICh0ID4+PiAxNik7XG5cdCAgICAgICAgICAgIElOVl9TVUJfTUlYXzJbc3hdID0gKHQgPDwgOCkgIHwgKHQgPj4+IDI0KTtcblx0ICAgICAgICAgICAgSU5WX1NVQl9NSVhfM1tzeF0gPSB0O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgbmV4dCBjb3VudGVyXG5cdCAgICAgICAgICAgIGlmICgheCkge1xuXHQgICAgICAgICAgICAgICAgeCA9IHhpID0gMTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHggPSB4MiBeIGRbZFtkW3g4IF4geDJdXV07XG5cdCAgICAgICAgICAgICAgICB4aSBePSBkW2RbeGldXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8vIFByZWNvbXB1dGVkIFJjb24gbG9va3VwXG5cdCAgICB2YXIgUkNPTiA9IFsweDAwLCAweDAxLCAweDAyLCAweDA0LCAweDA4LCAweDEwLCAweDIwLCAweDQwLCAweDgwLCAweDFiLCAweDM2XTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBRVMgYmxvY2sgY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEFFUyA9IENfYWxnby5BRVMgPSBCbG9ja0NpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciB0O1xuXG5cdCAgICAgICAgICAgIC8vIFNraXAgcmVzZXQgb2YgblJvdW5kcyBoYXMgYmVlbiBzZXQgYmVmb3JlIGFuZCBrZXkgZGlkIG5vdCBjaGFuZ2Vcblx0ICAgICAgICAgICAgaWYgKHRoaXMuX25Sb3VuZHMgJiYgdGhpcy5fa2V5UHJpb3JSZXNldCA9PT0gdGhpcy5fa2V5KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm47XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2tleVByaW9yUmVzZXQgPSB0aGlzLl9rZXk7XG5cdCAgICAgICAgICAgIHZhciBrZXlXb3JkcyA9IGtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGtleVNpemUgPSBrZXkuc2lnQnl0ZXMgLyA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgbnVtYmVyIG9mIHJvdW5kc1xuXHQgICAgICAgICAgICB2YXIgblJvdW5kcyA9IHRoaXMuX25Sb3VuZHMgPSBrZXlTaXplICsgNjtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIG51bWJlciBvZiBrZXkgc2NoZWR1bGUgcm93c1xuXHQgICAgICAgICAgICB2YXIga3NSb3dzID0gKG5Sb3VuZHMgKyAxKSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0ZSBrZXkgc2NoZWR1bGVcblx0ICAgICAgICAgICAgdmFyIGtleVNjaGVkdWxlID0gdGhpcy5fa2V5U2NoZWR1bGUgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIga3NSb3cgPSAwOyBrc1JvdyA8IGtzUm93czsga3NSb3crKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGtzUm93IDwga2V5U2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGtleVNjaGVkdWxlW2tzUm93XSA9IGtleVdvcmRzW2tzUm93XTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdCA9IGtleVNjaGVkdWxlW2tzUm93IC0gMV07XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIShrc1JvdyAlIGtleVNpemUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJvdCB3b3JkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAodCA8PCA4KSB8ICh0ID4+PiAyNCk7XG5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3ViIHdvcmRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdCA9IChTQk9YW3QgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsodCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHQgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3QgJiAweGZmXTtcblxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBNaXggUmNvblxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0IF49IFJDT05bKGtzUm93IC8ga2V5U2l6ZSkgfCAwXSA8PCAyNDtcblx0ICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleVNpemUgPiA2ICYmIGtzUm93ICUga2V5U2l6ZSA9PSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1YiB3b3JkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAoU0JPWFt0ID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHQgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyh0ID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFt0ICYgMHhmZl07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3ddID0ga2V5U2NoZWR1bGVba3NSb3cgLSBrZXlTaXplXSBeIHQ7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGludiBrZXkgc2NoZWR1bGVcblx0ICAgICAgICAgICAgdmFyIGludktleVNjaGVkdWxlID0gdGhpcy5faW52S2V5U2NoZWR1bGUgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaW52S3NSb3cgPSAwOyBpbnZLc1JvdyA8IGtzUm93czsgaW52S3NSb3crKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGtzUm93ID0ga3NSb3dzIC0gaW52S3NSb3c7XG5cblx0ICAgICAgICAgICAgICAgIGlmIChpbnZLc1JvdyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGtleVNjaGVkdWxlW2tzUm93XTtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBrZXlTY2hlZHVsZVtrc1JvdyAtIDRdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBpZiAoaW52S3NSb3cgPCA0IHx8IGtzUm93IDw9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd10gPSB0O1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd10gPSBJTlZfU1VCX01JWF8wW1NCT1hbdCA+Pj4gMjRdXSBeIElOVl9TVUJfTUlYXzFbU0JPWFsodCA+Pj4gMTYpICYgMHhmZl1dIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlZfU1VCX01JWF8yW1NCT1hbKHQgPj4+IDgpICYgMHhmZl1dIF4gSU5WX1NVQl9NSVhfM1tTQk9YW3QgJiAweGZmXV07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZW5jcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2tleVNjaGVkdWxlLCBTVUJfTUlYXzAsIFNVQl9NSVhfMSwgU1VCX01JWF8yLCBTVUJfTUlYXzMsIFNCT1gpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBkZWNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU3dhcCAybmQgYW5kIDR0aCByb3dzXG5cdCAgICAgICAgICAgIHZhciB0ID0gTVtvZmZzZXQgKyAxXTtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAxXSA9IE1bb2Zmc2V0ICsgM107XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgM10gPSB0O1xuXG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2ludktleVNjaGVkdWxlLCBJTlZfU1VCX01JWF8wLCBJTlZfU1VCX01JWF8xLCBJTlZfU1VCX01JWF8yLCBJTlZfU1VCX01JWF8zLCBJTlZfU0JPWCk7XG5cblx0ICAgICAgICAgICAgLy8gSW52IHN3YXAgMm5kIGFuZCA0dGggcm93c1xuXHQgICAgICAgICAgICB2YXIgdCA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSBNW29mZnNldCArIDNdO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDNdID0gdDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvQ3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCwga2V5U2NoZWR1bGUsIFNVQl9NSVhfMCwgU1VCX01JWF8xLCBTVUJfTUlYXzIsIFNVQl9NSVhfMywgU0JPWCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgblJvdW5kcyA9IHRoaXMuX25Sb3VuZHM7XG5cblx0ICAgICAgICAgICAgLy8gR2V0IGlucHV0LCBhZGQgcm91bmQga2V5XG5cdCAgICAgICAgICAgIHZhciBzMCA9IE1bb2Zmc2V0XSAgICAgXiBrZXlTY2hlZHVsZVswXTtcblx0ICAgICAgICAgICAgdmFyIHMxID0gTVtvZmZzZXQgKyAxXSBeIGtleVNjaGVkdWxlWzFdO1xuXHQgICAgICAgICAgICB2YXIgczIgPSBNW29mZnNldCArIDJdIF4ga2V5U2NoZWR1bGVbMl07XG5cdCAgICAgICAgICAgIHZhciBzMyA9IE1bb2Zmc2V0ICsgM10gXiBrZXlTY2hlZHVsZVszXTtcblxuXHQgICAgICAgICAgICAvLyBLZXkgc2NoZWR1bGUgcm93IGNvdW50ZXJcblx0ICAgICAgICAgICAgdmFyIGtzUm93ID0gNDtcblxuXHQgICAgICAgICAgICAvLyBSb3VuZHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgcm91bmQgPSAxOyByb3VuZCA8IG5Sb3VuZHM7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNoaWZ0IHJvd3MsIHN1YiBieXRlcywgbWl4IGNvbHVtbnMsIGFkZCByb3VuZCBrZXlcblx0ICAgICAgICAgICAgICAgIHZhciB0MCA9IFNVQl9NSVhfMFtzMCA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMSA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMyID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MzICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MSA9IFNVQl9NSVhfMFtzMSA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMiA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMzID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MwICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IFNVQl9NSVhfMFtzMiA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMyA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMwID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MxICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MyA9IFNVQl9NSVhfMFtzMyA+Pj4gMjRdIF4gU1VCX01JWF8xWyhzMCA+Pj4gMTYpICYgMHhmZl0gXiBTVUJfTUlYXzJbKHMxID4+PiA4KSAmIDB4ZmZdIF4gU1VCX01JWF8zW3MyICYgMHhmZl0gXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN0YXRlXG5cdCAgICAgICAgICAgICAgICBzMCA9IHQwO1xuXHQgICAgICAgICAgICAgICAgczEgPSB0MTtcblx0ICAgICAgICAgICAgICAgIHMyID0gdDI7XG5cdCAgICAgICAgICAgICAgICBzMyA9IHQzO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hpZnQgcm93cywgc3ViIGJ5dGVzLCBhZGQgcm91bmQga2V5XG5cdCAgICAgICAgICAgIHZhciB0MCA9ICgoU0JPWFtzMCA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMSA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMyID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMyAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdO1xuXHQgICAgICAgICAgICB2YXIgdDEgPSAoKFNCT1hbczEgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsoczIgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChTQk9YWyhzMyA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbczAgJiAweGZmXSkgXiBrZXlTY2hlZHVsZVtrc1JvdysrXTtcblx0ICAgICAgICAgICAgdmFyIHQyID0gKChTQk9YW3MyID4+PiAyNF0gPDwgMjQpIHwgKFNCT1hbKHMzID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoU0JPWFsoczAgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3MxICYgMHhmZl0pIF4ga2V5U2NoZWR1bGVba3NSb3crK107XG5cdCAgICAgICAgICAgIHZhciB0MyA9ICgoU0JPWFtzMyA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyhzMCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHMxID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgU0JPWFtzMiAmIDB4ZmZdKSBeIGtleVNjaGVkdWxlW2tzUm93KytdO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBvdXRwdXRcblx0ICAgICAgICAgICAgTVtvZmZzZXRdICAgICA9IHQwO1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDFdID0gdDE7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMl0gPSB0Mjtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAzXSA9IHQzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiAyNTYvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLkFFUy5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5BRVMgPSBCbG9ja0NpcGhlci5fY3JlYXRlSGVscGVyKEFFUyk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuQUVTO1xuXG59KSk7IiwgIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBQZXJtdXRlZCBDaG9pY2UgMSBjb25zdGFudHNcblx0ICAgIHZhciBQQzEgPSBbXG5cdCAgICAgICAgNTcsIDQ5LCA0MSwgMzMsIDI1LCAxNywgOSwgIDEsXG5cdCAgICAgICAgNTgsIDUwLCA0MiwgMzQsIDI2LCAxOCwgMTAsIDIsXG5cdCAgICAgICAgNTksIDUxLCA0MywgMzUsIDI3LCAxOSwgMTEsIDMsXG5cdCAgICAgICAgNjAsIDUyLCA0NCwgMzYsIDYzLCA1NSwgNDcsIDM5LFxuXHQgICAgICAgIDMxLCAyMywgMTUsIDcsICA2MiwgNTQsIDQ2LCAzOCxcblx0ICAgICAgICAzMCwgMjIsIDE0LCA2LCAgNjEsIDUzLCA0NSwgMzcsXG5cdCAgICAgICAgMjksIDIxLCAxMywgNSwgIDI4LCAyMCwgMTIsIDRcblx0ICAgIF07XG5cblx0ICAgIC8vIFBlcm11dGVkIENob2ljZSAyIGNvbnN0YW50c1xuXHQgICAgdmFyIFBDMiA9IFtcblx0ICAgICAgICAxNCwgMTcsIDExLCAyNCwgMSwgIDUsXG5cdCAgICAgICAgMywgIDI4LCAxNSwgNiwgIDIxLCAxMCxcblx0ICAgICAgICAyMywgMTksIDEyLCA0LCAgMjYsIDgsXG5cdCAgICAgICAgMTYsIDcsICAyNywgMjAsIDEzLCAyLFxuXHQgICAgICAgIDQxLCA1MiwgMzEsIDM3LCA0NywgNTUsXG5cdCAgICAgICAgMzAsIDQwLCA1MSwgNDUsIDMzLCA0OCxcblx0ICAgICAgICA0NCwgNDksIDM5LCA1NiwgMzQsIDUzLFxuXHQgICAgICAgIDQ2LCA0MiwgNTAsIDM2LCAyOSwgMzJcblx0ICAgIF07XG5cblx0ICAgIC8vIEN1bXVsYXRpdmUgYml0IHNoaWZ0IGNvbnN0YW50c1xuXHQgICAgdmFyIEJJVF9TSElGVFMgPSBbMSwgIDIsICA0LCAgNiwgIDgsICAxMCwgMTIsIDE0LCAxNSwgMTcsIDE5LCAyMSwgMjMsIDI1LCAyNywgMjhdO1xuXG5cdCAgICAvLyBTQk9YZXMgYW5kIHJvdW5kIHBlcm11dGF0aW9uIGNvbnN0YW50c1xuXHQgICAgdmFyIFNCT1hfUCA9IFtcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIDB4MDogMHg4MDgyMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDAwMDA6IDB4ODAwMCxcblx0ICAgICAgICAgICAgMHgyMDAwMDAwMDogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4MzAwMDAwMDA6IDB4Mixcblx0ICAgICAgICAgICAgMHg0MDAwMDAwMDogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwMDA6IDB4ODA4MjAyLFxuXHQgICAgICAgICAgICAweDYwMDAwMDAwOiAweDgwMDIwMixcblx0ICAgICAgICAgICAgMHg3MDAwMDAwMDogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDA6IDB4MjAyLFxuXHQgICAgICAgICAgICAweDkwMDAwMDAwOiAweDgwMDIwMCxcblx0ICAgICAgICAgICAgMHhhMDAwMDAwMDogMHg4MjAwLFxuXHQgICAgICAgICAgICAweGIwMDAwMDAwOiAweDgwODAwMCxcblx0ICAgICAgICAgICAgMHhjMDAwMDAwMDogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGQwMDAwMDAwOiAweDgwMDAwMixcblx0ICAgICAgICAgICAgMHhlMDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGYwMDAwMDAwOiAweDgyMDIsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDE4MDAwMDAwOiAweDgwODIwMixcblx0ICAgICAgICAgICAgMHgyODAwMDAwMDogMHg4MjAyLFxuXHQgICAgICAgICAgICAweDM4MDAwMDAwOiAweDgwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwMDA6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweDU4MDAwMDAwOiAweDIwMCxcblx0ICAgICAgICAgICAgMHg2ODAwMDAwMDogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4NzgwMDAwMDA6IDB4Mixcblx0ICAgICAgICAgICAgMHg4ODAwMDAwMDogMHg4MDAyMDAsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDA6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHhhODAwMDAwMDogMHg4MDgwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwMDA6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweGM4MDAwMDAwOiAweDgwMDAwMixcblx0ICAgICAgICAgICAgMHhkODAwMDAwMDogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGU4MDAwMDAwOiAweDIwMixcblx0ICAgICAgICAgICAgMHhmODAwMDAwMDogMHg4MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTogMHg4MDAwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDAxOiAweDIsXG5cdCAgICAgICAgICAgIDB4MjAwMDAwMDE6IDB4ODA4MjAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDAxOiAweDgwMDAwMCxcblx0ICAgICAgICAgICAgMHg0MDAwMDAwMTogMHg4MDgwMDIsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwMDE6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHg2MDAwMDAwMTogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwMDE6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAxOiAweDgwODIwMixcblx0ICAgICAgICAgICAgMHg5MDAwMDAwMTogMHg4MDgwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwMDE6IDB4ODAwMDAyLFxuXHQgICAgICAgICAgICAweGIwMDAwMDAxOiAweDgyMDIsXG5cdCAgICAgICAgICAgIDB4YzAwMDAwMDE6IDB4MjAyLFxuXHQgICAgICAgICAgICAweGQwMDAwMDAxOiAweDgwMDIwMCxcblx0ICAgICAgICAgICAgMHhlMDAwMDAwMTogMHg4MDAyLFxuXHQgICAgICAgICAgICAweGYwMDAwMDAxOiAweDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTogMHg4MDgyMDIsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDE6IDB4ODA4MDAwLFxuXHQgICAgICAgICAgICAweDI4MDAwMDAxOiAweDgwMDAwMCxcblx0ICAgICAgICAgICAgMHgzODAwMDAwMTogMHgyMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwMDE6IDB4ODAwMCxcblx0ICAgICAgICAgICAgMHg1ODAwMDAwMTogMHg4MDAwMDIsXG5cdCAgICAgICAgICAgIDB4NjgwMDAwMDE6IDB4Mixcblx0ICAgICAgICAgICAgMHg3ODAwMDAwMTogMHg4MjAyLFxuXHQgICAgICAgICAgICAweDg4MDAwMDAxOiAweDgwMDIsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDE6IDB4ODAwMjAyLFxuXHQgICAgICAgICAgICAweGE4MDAwMDAxOiAweDIwMixcblx0ICAgICAgICAgICAgMHhiODAwMDAwMTogMHg4MDgyMDAsXG5cdCAgICAgICAgICAgIDB4YzgwMDAwMDE6IDB4ODAwMjAwLFxuXHQgICAgICAgICAgICAweGQ4MDAwMDAxOiAweDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDAwMDE6IDB4ODIwMCxcblx0ICAgICAgICAgICAgMHhmODAwMDAwMTogMHg4MDgwMDJcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgMHgwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDA6IDB4NDAwMCxcblx0ICAgICAgICAgICAgMHgyMDAwMDAwOiAweDgwMDAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDA6IDB4NDAwODAwMTAsXG5cdCAgICAgICAgICAgIDB4NDAwMDAwMDogMHg0MDAwMDAxMCxcblx0ICAgICAgICAgICAgMHg1MDAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDYwMDAwMDA6IDB4NDAwMDQwMDAsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwMDogMHgxMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwOiAweDg0MDAwLFxuXHQgICAgICAgICAgICAweDkwMDAwMDA6IDB4NDAwMDQwMTAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwMDogMHg0MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHhiMDAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweGMwMDAwMDA6IDB4ODAwMTAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGUwMDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHhmMDAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDogMHg0MDAwNDAwMCxcblx0ICAgICAgICAgICAgMHgxODAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweDI4MDAwMDA6IDB4MTAsXG5cdCAgICAgICAgICAgIDB4MzgwMDAwMDogMHg0MDAwNDAxMCxcblx0ICAgICAgICAgICAgMHg0ODAwMDAwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDU4MDAwMDA6IDB4NDAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NjgwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHg3ODAwMDAwOiAweDQwMDgwMDEwLFxuXHQgICAgICAgICAgICAweDg4MDAwMDA6IDB4ODAwMTAsXG5cdCAgICAgICAgICAgIDB4OTgwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGE4MDAwMDA6IDB4NDAwMCxcblx0ICAgICAgICAgICAgMHhiODAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweGM4MDAwMDA6IDB4NDAwMDAwMTAsXG5cdCAgICAgICAgICAgIDB4ZDgwMDAwMDogMHg4NDAwMCxcblx0ICAgICAgICAgICAgMHhlODAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweGY4MDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDExMDAwMDAwOiAweDQwMDgwMDEwLFxuXHQgICAgICAgICAgICAweDEyMDAwMDAwOiAweDQwMDA0MDEwLFxuXHQgICAgICAgICAgICAweDEzMDAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDE0MDAwMDAwOiAweDQwMDgwMDAwLFxuXHQgICAgICAgICAgICAweDE1MDAwMDAwOiAweDEwLFxuXHQgICAgICAgICAgICAweDE2MDAwMDAwOiAweDg0MDEwLFxuXHQgICAgICAgICAgICAweDE3MDAwMDAwOiAweDQwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxOTAwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDAwMDogMHg4MDAxMCxcblx0ICAgICAgICAgICAgMHgxYjAwMDAwMDogMHg0MDAwMDAxMCxcblx0ICAgICAgICAgICAgMHgxYzAwMDAwMDogMHg4NDAwMCxcblx0ICAgICAgICAgICAgMHgxZDAwMDAwMDogMHg0MDAwNDAwMCxcblx0ICAgICAgICAgICAgMHgxZTAwMDAwMDogMHg0MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZjAwMDAwMDogMHg0MDA4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMDgwMDAwMDogMHg4NDAxMCxcblx0ICAgICAgICAgICAgMHgxMTgwMDAwMDogMHg4MDAwMCxcblx0ICAgICAgICAgICAgMHgxMjgwMDAwMDogMHg0MDA4MDAwMCxcblx0ICAgICAgICAgICAgMHgxMzgwMDAwMDogMHg0MDAwLFxuXHQgICAgICAgICAgICAweDE0ODAwMDAwOiAweDQwMDA0MDAwLFxuXHQgICAgICAgICAgICAweDE1ODAwMDAwOiAweDQwMDg0MDEwLFxuXHQgICAgICAgICAgICAweDE2ODAwMDAwOiAweDEwLFxuXHQgICAgICAgICAgICAweDE3ODAwMDAwOiAweDQwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE4ODAwMDAwOiAweDQwMDg0MDAwLFxuXHQgICAgICAgICAgICAweDE5ODAwMDAwOiAweDQwMDAwMDEwLFxuXHQgICAgICAgICAgICAweDFhODAwMDAwOiAweDQwMDA0MDEwLFxuXHQgICAgICAgICAgICAweDFiODAwMDAwOiAweDgwMDEwLFxuXHQgICAgICAgICAgICAweDFjODAwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWQ4MDAwMDA6IDB4NDAxMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDAwMDogMHg0MDA4MDAxMCxcblx0ICAgICAgICAgICAgMHgxZjgwMDAwMDogMHg4NDAwMFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4MTA0LFxuXHQgICAgICAgICAgICAweDEwMDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweDIwMDAwMDogMHg0MDAwMTAwLFxuXHQgICAgICAgICAgICAweDMwMDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHg0MDAwMDA6IDB4MTAwMDQsXG5cdCAgICAgICAgICAgIDB4NTAwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4NjAwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4NzAwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwOiAweDQwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4OTAwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDAwOiAweDEwMTAwLFxuXHQgICAgICAgICAgICAweGIwMDAwMDogMHg0MDEwMDA0LFxuXHQgICAgICAgICAgICAweGMwMDAwMDogMHg0MDAwMTA0LFxuXHQgICAgICAgICAgICAweGQwMDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHhlMDAwMDA6IDB4NCxcblx0ICAgICAgICAgICAgMHhmMDAwMDA6IDB4MTAwLFxuXHQgICAgICAgICAgICAweDgwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwOiAweDQwMTAwMDQsXG5cdCAgICAgICAgICAgIDB4MjgwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MzgwMDAwOiAweDQwMDAxMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4NTgwMDAwOiAweDEwMDAwLFxuXHQgICAgICAgICAgICAweDY4MDAwMDogMHgxMDAwNCxcblx0ICAgICAgICAgICAgMHg3ODAwMDA6IDB4MTA0LFxuXHQgICAgICAgICAgICAweDg4MDAwMDogMHg0LFxuXHQgICAgICAgICAgICAweDk4MDAwMDogMHgxMDAsXG5cdCAgICAgICAgICAgIDB4YTgwMDAwOiAweDQwMTAwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDAwOiAweDEwMTA0LFxuXHQgICAgICAgICAgICAweGM4MDAwMDogMHgxMDEwMCxcblx0ICAgICAgICAgICAgMHhkODAwMDA6IDB4NDAwMDEwNCxcblx0ICAgICAgICAgICAgMHhlODAwMDA6IDB4NDAxMDEwNCxcblx0ICAgICAgICAgICAgMHhmODAwMDA6IDB4NDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMDAwMDAwOiAweDQwMTAxMDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDAwMDogMHgxMDAwNCxcblx0ICAgICAgICAgICAgMHgxMjAwMDAwOiAweDEwMDAwLFxuXHQgICAgICAgICAgICAweDEzMDAwMDA6IDB4NDAwMDEwMCxcblx0ICAgICAgICAgICAgMHgxNDAwMDAwOiAweDEwMCxcblx0ICAgICAgICAgICAgMHgxNTAwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4MTYwMDAwMDogMHg0MDAwMDA0LFxuXHQgICAgICAgICAgICAweDE3MDAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxODAwMDAwOiAweDQwMDAxMDQsXG5cdCAgICAgICAgICAgIDB4MTkwMDAwMDogMHg0MDAwMDAwLFxuXHQgICAgICAgICAgICAweDFhMDAwMDA6IDB4NCxcblx0ICAgICAgICAgICAgMHgxYjAwMDAwOiAweDEwMTAwLFxuXHQgICAgICAgICAgICAweDFjMDAwMDA6IDB4NDAxMDAwMCxcblx0ICAgICAgICAgICAgMHgxZDAwMDAwOiAweDEwNCxcblx0ICAgICAgICAgICAgMHgxZTAwMDAwOiAweDEwMTA0LFxuXHQgICAgICAgICAgICAweDFmMDAwMDA6IDB4NDAxMDAwNCxcblx0ICAgICAgICAgICAgMHgxMDgwMDAwOiAweDQwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTE4MDAwMDogMHgxMDQsXG5cdCAgICAgICAgICAgIDB4MTI4MDAwMDogMHg0MDEwMTAwLFxuXHQgICAgICAgICAgICAweDEzODAwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxNDgwMDAwOiAweDEwMDA0LFxuXHQgICAgICAgICAgICAweDE1ODAwMDA6IDB4NDAwMDEwMCxcblx0ICAgICAgICAgICAgMHgxNjgwMDAwOiAweDEwMCxcblx0ICAgICAgICAgICAgMHgxNzgwMDAwOiAweDQwMTAwMDQsXG5cdCAgICAgICAgICAgIDB4MTg4MDAwMDogMHgxMDAwMCxcblx0ICAgICAgICAgICAgMHgxOTgwMDAwOiAweDQwMTAxMDQsXG5cdCAgICAgICAgICAgIDB4MWE4MDAwMDogMHgxMDEwNCxcblx0ICAgICAgICAgICAgMHgxYjgwMDAwOiAweDQwMDAwMDQsXG5cdCAgICAgICAgICAgIDB4MWM4MDAwMDogMHg0MDAwMTA0LFxuXHQgICAgICAgICAgICAweDFkODAwMDA6IDB4NDAxMDAwMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDAwOiAweDQsXG5cdCAgICAgICAgICAgIDB4MWY4MDAwMDogMHgxMDEwMFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODA0MDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MjAwMDA6IDB4NDAxMDQwLFxuXHQgICAgICAgICAgICAweDMwMDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDQwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4NTAwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDYwMDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDcwMDAwOiAweDQwMDA0MCxcblx0ICAgICAgICAgICAgMHg4MDAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg5MDAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4YjAwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4YzAwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDA6IDB4MTA0MCxcblx0ICAgICAgICAgICAgMHhlMDAwMDogMHgxMDAwLFxuXHQgICAgICAgICAgICAweGYwMDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDgwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MjgwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MzgwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDU4MDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDY4MDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4NzgwMDA6IDB4ODA0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODgwMDA6IDB4MTAwMCxcblx0ICAgICAgICAgICAgMHg5ODAwMDogMHg4MDQwMTAwMCxcblx0ICAgICAgICAgICAgMHhhODAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4YjgwMDA6IDB4MTA0MCxcblx0ICAgICAgICAgICAgMHhjODAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHhkODAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDA6IDB4NDAxMDQwLFxuXHQgICAgICAgICAgICAweGY4MDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDEwMDAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDAwOiAweDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxMjAwMDA6IDB4ODAwMDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTMwMDAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MTQwMDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTUwMDAwOiAweDgwNDAwMDQwLFxuXHQgICAgICAgICAgICAweDE2MDAwMDogMHg4MDQwMTAwMCxcblx0ICAgICAgICAgICAgMHgxNzAwMDA6IDB4ODAwMDEwNDAsXG5cdCAgICAgICAgICAgIDB4MTgwMDAwOiAweDgwNDAxMDQwLFxuXHQgICAgICAgICAgICAweDE5MDAwMDogMHg4MDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTAwMDA6IDB4ODA0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWIwMDAwOiAweDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgxYzAwMDA6IDB4ODAwMDEwMDAsXG5cdCAgICAgICAgICAgIDB4MWQwMDAwOiAweDQwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZTAwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MWYwMDAwOiAweDEwMDAsXG5cdCAgICAgICAgICAgIDB4MTA4MDAwOiAweDgwNDAwMDAwLFxuXHQgICAgICAgICAgICAweDExODAwMDogMHg4MDQwMTA0MCxcblx0ICAgICAgICAgICAgMHgxMjgwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxMzgwMDA6IDB4NDAxMDAwLFxuXHQgICAgICAgICAgICAweDE0ODAwMDogMHg0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MTU4MDAwOiAweDgwMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE2ODAwMDogMHg4MDAwMTA0MCxcblx0ICAgICAgICAgICAgMHgxNzgwMDA6IDB4NDAsXG5cdCAgICAgICAgICAgIDB4MTg4MDAwOiAweDgwMDAwMDQwLFxuXHQgICAgICAgICAgICAweDE5ODAwMDogMHgxMDAwLFxuXHQgICAgICAgICAgICAweDFhODAwMDogMHg4MDAwMTAwMCxcblx0ICAgICAgICAgICAgMHgxYjgwMDA6IDB4ODA0MDAwNDAsXG5cdCAgICAgICAgICAgIDB4MWM4MDAwOiAweDEwNDAsXG5cdCAgICAgICAgICAgIDB4MWQ4MDAwOiAweDgwNDAxMDAwLFxuXHQgICAgICAgICAgICAweDFlODAwMDogMHg0MDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWY4MDAwOiAweDQwMTA0MFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODAsXG5cdCAgICAgICAgICAgIDB4MTAwMDogMHgxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDIwMDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4MzAwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg0MDAwOiAweDIwMDQwMDgwLFxuXHQgICAgICAgICAgICAweDUwMDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHg2MDAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDcwMDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4ODAwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDkwMDA6IDB4MjAwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4YTAwMDogMHgyMDAwMDA4MCxcblx0ICAgICAgICAgICAgMHhiMDAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweGMwMDA6IDB4MjEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZDAwMDogMHgwLFxuXHQgICAgICAgICAgICAweGUwMDA6IDB4MTA0MDA4MCxcblx0ICAgICAgICAgICAgMHhmMDAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE4MDA6IDB4MjEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MjgwMDogMHg4MCxcblx0ICAgICAgICAgICAgMHgzODAwOiAweDEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwMDogMHg0MDAwMCxcblx0ICAgICAgICAgICAgMHg1ODAwOiAweDIwMDQwMDgwLFxuXHQgICAgICAgICAgICAweDY4MDA6IDB4MjEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4NzgwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4ODAwOiAweDIwMDQwMDAwLFxuXHQgICAgICAgICAgICAweDk4MDA6IDB4MCxcblx0ICAgICAgICAgICAgMHhhODAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweGI4MDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHhjODAwOiAweDIwMDAwMDgwLFxuXHQgICAgICAgICAgICAweGQ4MDA6IDB4MjEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZTgwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweGY4MDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4MTAwMDA6IDB4NDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTEwMDA6IDB4ODAsXG5cdCAgICAgICAgICAgIDB4MTIwMDA6IDB4MjAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTMwMDA6IDB4MjEwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MTQwMDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHgxNTAwMDogMHgyMTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxNjAwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxNzAwMDogMHgxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE4MDAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE5MDAwOiAweDIxMDAwMDAwLFxuXHQgICAgICAgICAgICAweDFhMDAwOiAweDEwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWIwMDA6IDB4MjAwNDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWMwMDA6IDB4NDAwODAsXG5cdCAgICAgICAgICAgIDB4MWQwMDA6IDB4MjAwMDAwODAsXG5cdCAgICAgICAgICAgIDB4MWUwMDA6IDB4MCxcblx0ICAgICAgICAgICAgMHgxZjAwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDEwODAwOiAweDIxMDAwMDgwLFxuXHQgICAgICAgICAgICAweDExODAwOiAweDEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDA6IDB4MTA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxMzgwMDogMHgyMDA0MDA4MCxcblx0ICAgICAgICAgICAgMHgxNDgwMDogMHgyMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxNTgwMDogMHgxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDE2ODAwOiAweDgwLFxuXHQgICAgICAgICAgICAweDE3ODAwOiAweDIxMDQwMDAwLFxuXHQgICAgICAgICAgICAweDE4ODAwOiAweDQwMDgwLFxuXHQgICAgICAgICAgICAweDE5ODAwOiAweDIxMDQwMDgwLFxuXHQgICAgICAgICAgICAweDFhODAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWI4MDA6IDB4MjEwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWM4MDA6IDB4MTAwMDA4MCxcblx0ICAgICAgICAgICAgMHgxZDgwMDogMHg0MDAwMCxcblx0ICAgICAgICAgICAgMHgxZTgwMDogMHgyMDA0MDAwMCxcblx0ICAgICAgICAgICAgMHgxZjgwMDogMHgyMDAwMDA4MFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4MTAwOiAweDIwMDAsXG5cdCAgICAgICAgICAgIDB4MjAwOiAweDEwMjAwMDAwLFxuXHQgICAgICAgICAgICAweDMwMDogMHgxMDIwMjAwOCxcblx0ICAgICAgICAgICAgMHg0MDA6IDB4MTAwMDIwMDAsXG5cdCAgICAgICAgICAgIDB4NTAwOiAweDIwMDAwMCxcblx0ICAgICAgICAgICAgMHg2MDA6IDB4MjAwMDA4LFxuXHQgICAgICAgICAgICAweDcwMDogMHgxMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDA6IDB4MCxcblx0ICAgICAgICAgICAgMHg5MDA6IDB4MTAwMDIwMDgsXG5cdCAgICAgICAgICAgIDB4YTAwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHhiMDA6IDB4OCxcblx0ICAgICAgICAgICAgMHhjMDA6IDB4MTAyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4ZDAwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHhlMDA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHhmMDA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4ODA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTgwOiAweDEwMjAyMDA4LFxuXHQgICAgICAgICAgICAweDI4MDogMHg4LFxuXHQgICAgICAgICAgICAweDM4MDogMHgyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NDgwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHg1ODA6IDB4MTAwMDAwMDgsXG5cdCAgICAgICAgICAgIDB4NjgwOiAweDEwMDAyMDAwLFxuXHQgICAgICAgICAgICAweDc4MDogMHgyMDA4LFxuXHQgICAgICAgICAgICAweDg4MDogMHgyMDAwMDgsXG5cdCAgICAgICAgICAgIDB4OTgwOiAweDIwMDAsXG5cdCAgICAgICAgICAgIDB4YTgwOiAweDEwMDAyMDA4LFxuXHQgICAgICAgICAgICAweGI4MDogMHgxMDIwMDAwOCxcblx0ICAgICAgICAgICAgMHhjODA6IDB4MCxcblx0ICAgICAgICAgICAgMHhkODA6IDB4MTAyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4ZTgwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHhmODA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTAwMDogMHgxMDAwMjAwMCxcblx0ICAgICAgICAgICAgMHgxMTAwOiAweDEwMjAwMDA4LFxuXHQgICAgICAgICAgICAweDEyMDA6IDB4MTAyMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MTMwMDogMHgyMDA4LFxuXHQgICAgICAgICAgICAweDE0MDA6IDB4MjAwMDAwLFxuXHQgICAgICAgICAgICAweDE1MDA6IDB4MTAwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTYwMDogMHgxMDAwMDAwOCxcblx0ICAgICAgICAgICAgMHgxNzAwOiAweDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxODAwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgxOTAwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWEwMDogMHg4LFxuXHQgICAgICAgICAgICAweDFiMDA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWMwMDogMHgyMDAwLFxuXHQgICAgICAgICAgICAweDFkMDA6IDB4MTAwMDIwMDgsXG5cdCAgICAgICAgICAgIDB4MWUwMDogMHgxMDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxZjAwOiAweDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxMDgwOiAweDgsXG5cdCAgICAgICAgICAgIDB4MTE4MDogMHgyMDIwMDAsXG5cdCAgICAgICAgICAgIDB4MTI4MDogMHgyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTM4MDogMHgxMDAwMDAwOCxcblx0ICAgICAgICAgICAgMHgxNDgwOiAweDEwMDAyMDAwLFxuXHQgICAgICAgICAgICAweDE1ODA6IDB4MjAwOCxcblx0ICAgICAgICAgICAgMHgxNjgwOiAweDEwMjAyMDA4LFxuXHQgICAgICAgICAgICAweDE3ODA6IDB4MTAyMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTg4MDogMHgxMDIwMjAwMCxcblx0ICAgICAgICAgICAgMHgxOTgwOiAweDEwMjAwMDA4LFxuXHQgICAgICAgICAgICAweDFhODA6IDB4MjAwMCxcblx0ICAgICAgICAgICAgMHgxYjgwOiAweDIwMjAwOCxcblx0ICAgICAgICAgICAgMHgxYzgwOiAweDIwMDAwOCxcblx0ICAgICAgICAgICAgMHgxZDgwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWU4MDogMHgxMDAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxZjgwOiAweDEwMDAyMDA4XG5cdCAgICAgICAgfSxcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIDB4MDogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTA6IDB4MjAwMDQwMSxcblx0ICAgICAgICAgICAgMHgyMDogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4MzA6IDB4MTAwNDAxLFxuXHQgICAgICAgICAgICAweDQwOiAweDIxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4NTA6IDB4MCxcblx0ICAgICAgICAgICAgMHg2MDogMHgxLFxuXHQgICAgICAgICAgICAweDcwOiAweDIxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4ODA6IDB4MjAwMDQwMCxcblx0ICAgICAgICAgICAgMHg5MDogMHgxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4YTA6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHhiMDogMHgyMTAwNDAwLFxuXHQgICAgICAgICAgICAweGMwOiAweDIxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ZDA6IDB4NDAxLFxuXHQgICAgICAgICAgICAweGUwOiAweDEwMDQwMCxcblx0ICAgICAgICAgICAgMHhmMDogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDg6IDB4MjEwMDAwMSxcblx0ICAgICAgICAgICAgMHgxODogMHgwLFxuXHQgICAgICAgICAgICAweDI4OiAweDIwMDA0MDEsXG5cdCAgICAgICAgICAgIDB4Mzg6IDB4MjEwMDQwMCxcblx0ICAgICAgICAgICAgMHg0ODogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4NTg6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHg2ODogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDc4OiAweDQwMSxcblx0ICAgICAgICAgICAgMHg4ODogMHgxMDA0MDEsXG5cdCAgICAgICAgICAgIDB4OTg6IDB4MjAwMDQwMCxcblx0ICAgICAgICAgICAgMHhhODogMHgyMTAwMDAwLFxuXHQgICAgICAgICAgICAweGI4OiAweDEwMDAwMSxcblx0ICAgICAgICAgICAgMHhjODogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4ZDg6IDB4MjEwMDQwMSxcblx0ICAgICAgICAgICAgMHhlODogMHgxLFxuXHQgICAgICAgICAgICAweGY4OiAweDEwMDQwMCxcblx0ICAgICAgICAgICAgMHgxMDA6IDB4MjAwMDAwMCxcblx0ICAgICAgICAgICAgMHgxMTA6IDB4MTAwMDAwLFxuXHQgICAgICAgICAgICAweDEyMDogMHgyMDAwNDAxLFxuXHQgICAgICAgICAgICAweDEzMDogMHgyMTAwMDAxLFxuXHQgICAgICAgICAgICAweDE0MDogMHgxMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MTUwOiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTYwOiAweDIxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MTcwOiAweDEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxODA6IDB4NDAxLFxuXHQgICAgICAgICAgICAweDE5MDogMHgyMTAwNDAxLFxuXHQgICAgICAgICAgICAweDFhMDogMHgxMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MWIwOiAweDEsXG5cdCAgICAgICAgICAgIDB4MWMwOiAweDAsXG5cdCAgICAgICAgICAgIDB4MWQwOiAweDIxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MWUwOiAweDIwMDAwMDEsXG5cdCAgICAgICAgICAgIDB4MWYwOiAweDQwMCxcblx0ICAgICAgICAgICAgMHgxMDg6IDB4MTAwNDAwLFxuXHQgICAgICAgICAgICAweDExODogMHgyMDAwNDAxLFxuXHQgICAgICAgICAgICAweDEyODogMHgyMTAwMDAxLFxuXHQgICAgICAgICAgICAweDEzODogMHgxLFxuXHQgICAgICAgICAgICAweDE0ODogMHgyMDAwMDAwLFxuXHQgICAgICAgICAgICAweDE1ODogMHgxMDAwMDAsXG5cdCAgICAgICAgICAgIDB4MTY4OiAweDQwMSxcblx0ICAgICAgICAgICAgMHgxNzg6IDB4MjEwMDQwMCxcblx0ICAgICAgICAgICAgMHgxODg6IDB4MjAwMDAwMSxcblx0ICAgICAgICAgICAgMHgxOTg6IDB4MjEwMDAwMCxcblx0ICAgICAgICAgICAgMHgxYTg6IDB4MCxcblx0ICAgICAgICAgICAgMHgxYjg6IDB4MjEwMDQwMSxcblx0ICAgICAgICAgICAgMHgxYzg6IDB4MTAwNDAxLFxuXHQgICAgICAgICAgICAweDFkODogMHg0MDAsXG5cdCAgICAgICAgICAgIDB4MWU4OiAweDIwMDA0MDAsXG5cdCAgICAgICAgICAgIDB4MWY4OiAweDEwMDAwMVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICAweDA6IDB4ODAwMDgyMCxcblx0ICAgICAgICAgICAgMHgxOiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDI6IDB4ODAwMDAwMCxcblx0ICAgICAgICAgICAgMHgzOiAweDIwLFxuXHQgICAgICAgICAgICAweDQ6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4NTogMHg4MDIwODIwLFxuXHQgICAgICAgICAgICAweDY6IDB4ODAyMDgwMCxcblx0ICAgICAgICAgICAgMHg3OiAweDgwMCxcblx0ICAgICAgICAgICAgMHg4OiAweDgwMjAwMDAsXG5cdCAgICAgICAgICAgIDB4OTogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweGE6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4YjogMHg4MDIwMDIwLFxuXHQgICAgICAgICAgICAweGM6IDB4ODIwLFxuXHQgICAgICAgICAgICAweGQ6IDB4MCxcblx0ICAgICAgICAgICAgMHhlOiAweDgwMDAwMjAsXG5cdCAgICAgICAgICAgIDB4ZjogMHgyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMDogMHg4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDE6IDB4ODAyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwMjogMHg4MDAwODIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDAzOiAweDgwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMDQ6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNTogMHgyMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNjogMHgyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwNzogMHgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwODogMHg4MDAwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDA5OiAweDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwYTogMHgyMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwYjogMHg4MDIwODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDBjOiAweDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMGQ6IDB4ODAyMDAyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAwZTogMHg4MDAwODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDBmOiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDEwOiAweDIwODIwLFxuXHQgICAgICAgICAgICAweDExOiAweDgwMjA4MDAsXG5cdCAgICAgICAgICAgIDB4MTI6IDB4MjAsXG5cdCAgICAgICAgICAgIDB4MTM6IDB4ODAwLFxuXHQgICAgICAgICAgICAweDE0OiAweDgwMDA4MDAsXG5cdCAgICAgICAgICAgIDB4MTU6IDB4ODAwMDAyMCxcblx0ICAgICAgICAgICAgMHgxNjogMHg4MDIwMDIwLFxuXHQgICAgICAgICAgICAweDE3OiAweDIwMDAwLFxuXHQgICAgICAgICAgICAweDE4OiAweDAsXG5cdCAgICAgICAgICAgIDB4MTk6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4MWE6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHgxYjogMHg4MDAwODIwLFxuXHQgICAgICAgICAgICAweDFjOiAweDgwMjA4MjAsXG5cdCAgICAgICAgICAgIDB4MWQ6IDB4MjA4MDAsXG5cdCAgICAgICAgICAgIDB4MWU6IDB4ODIwLFxuXHQgICAgICAgICAgICAweDFmOiAweDgwMDAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTA6IDB4MjAwMDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTE6IDB4ODAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDEyOiAweDgwMjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTM6IDB4MjA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTQ6IDB4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTU6IDB4ODAyMDAwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxNjogMHg4MDAwMDAwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDE3OiAweDgwMDA4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMTg6IDB4ODAyMDgyMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxOTogMHg4MDAwMDIwLFxuXHQgICAgICAgICAgICAweDgwMDAwMDFhOiAweDgwMDA4MDAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWI6IDB4MCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxYzogMHgyMDgwMCxcblx0ICAgICAgICAgICAgMHg4MDAwMDAxZDogMHg4MjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWU6IDB4MjAwMjAsXG5cdCAgICAgICAgICAgIDB4ODAwMDAwMWY6IDB4ODAyMDgwMFxuXHQgICAgICAgIH1cblx0ICAgIF07XG5cblx0ICAgIC8vIE1hc2tzIHRoYXQgc2VsZWN0IHRoZSBTQk9YIGlucHV0XG5cdCAgICB2YXIgU0JPWF9NQVNLID0gW1xuXHQgICAgICAgIDB4ZjgwMDAwMDEsIDB4MWY4MDAwMDAsIDB4MDFmODAwMDAsIDB4MDAxZjgwMDAsXG5cdCAgICAgICAgMHgwMDAxZjgwMCwgMHgwMDAwMWY4MCwgMHgwMDAwMDFmOCwgMHg4MDAwMDAxZlxuXHQgICAgXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBERVMgYmxvY2sgY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIERFUyA9IENfYWxnby5ERVMgPSBCbG9ja0NpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5O1xuXHQgICAgICAgICAgICB2YXIga2V5V29yZHMgPSBrZXkud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2VsZWN0IDU2IGJpdHMgYWNjb3JkaW5nIHRvIFBDMVxuXHQgICAgICAgICAgICB2YXIga2V5Qml0cyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrZXlCaXRQb3MgPSBQQzFbaV0gLSAxO1xuXHQgICAgICAgICAgICAgICAga2V5Qml0c1tpXSA9IChrZXlXb3Jkc1trZXlCaXRQb3MgPj4+IDVdID4+PiAoMzEgLSBrZXlCaXRQb3MgJSAzMikpICYgMTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFzc2VtYmxlIDE2IHN1YmtleXNcblx0ICAgICAgICAgICAgdmFyIHN1YktleXMgPSB0aGlzLl9zdWJLZXlzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIG5TdWJLZXkgPSAwOyBuU3ViS2V5IDwgMTY7IG5TdWJLZXkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHN1YmtleVxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YktleSA9IHN1YktleXNbblN1YktleV0gPSBbXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRTaGlmdCA9IEJJVF9TSElGVFNbblN1YktleV07XG5cblx0ICAgICAgICAgICAgICAgIC8vIFNlbGVjdCA0OCBiaXRzIGFjY29yZGluZyB0byBQQzJcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBmcm9tIHRoZSBsZWZ0IDI4IGtleSBiaXRzXG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5WyhpIC8gNikgfCAwXSB8PSBrZXlCaXRzWygoUEMyW2ldIC0gMSkgKyBiaXRTaGlmdCkgJSAyOF0gPDwgKDMxIC0gaSAlIDYpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gU2VsZWN0IGZyb20gdGhlIHJpZ2h0IDI4IGtleSBiaXRzXG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5WzQgKyAoKGkgLyA2KSB8IDApXSB8PSBrZXlCaXRzWzI4ICsgKCgoUEMyW2kgKyAyNF0gLSAxKSArIGJpdFNoaWZ0KSAlIDI4KV0gPDwgKDMxIC0gaSAlIDYpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBTaW5jZSBlYWNoIHN1YmtleSBpcyBhcHBsaWVkIHRvIGFuIGV4cGFuZGVkIDMyLWJpdCBpbnB1dCxcblx0ICAgICAgICAgICAgICAgIC8vIHRoZSBzdWJrZXkgY2FuIGJlIGJyb2tlbiBpbnRvIDggdmFsdWVzIHNjYWxlZCB0byAzMi1iaXRzLFxuXHQgICAgICAgICAgICAgICAgLy8gd2hpY2ggYWxsb3dzIHRoZSBrZXkgdG8gYmUgdXNlZCB3aXRob3V0IGV4cGFuc2lvblxuXHQgICAgICAgICAgICAgICAgc3ViS2V5WzBdID0gKHN1YktleVswXSA8PCAxKSB8IChzdWJLZXlbMF0gPj4+IDMxKTtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNzsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3ViS2V5W2ldID0gc3ViS2V5W2ldID4+PiAoKGkgLSAxKSAqIDQgKyAzKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHN1YktleVs3XSA9IChzdWJLZXlbN10gPDwgNSkgfCAoc3ViS2V5WzddID4+PiAyNyk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIGludmVyc2Ugc3Via2V5c1xuXHQgICAgICAgICAgICB2YXIgaW52U3ViS2V5cyA9IHRoaXMuX2ludlN1YktleXMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpbnZTdWJLZXlzW2ldID0gc3ViS2V5c1sxNSAtIGldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGVuY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB0aGlzLl9kb0NyeXB0QmxvY2soTSwgb2Zmc2V0LCB0aGlzLl9zdWJLZXlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RvQ3J5cHRCbG9jayhNLCBvZmZzZXQsIHRoaXMuX2ludlN1YktleXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9DcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0LCBzdWJLZXlzKSB7XG5cdCAgICAgICAgICAgIC8vIEdldCBpbnB1dFxuXHQgICAgICAgICAgICB0aGlzLl9sQmxvY2sgPSBNW29mZnNldF07XG5cdCAgICAgICAgICAgIHRoaXMuX3JCbG9jayA9IE1bb2Zmc2V0ICsgMV07XG5cblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCBwZXJtdXRhdGlvblxuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgNCwgIDB4MGYwZjBmMGYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMTYsIDB4MDAwMGZmZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgMiwgIDB4MzMzMzMzMzMpO1xuXHQgICAgICAgICAgICBleGNoYW5nZVJMLmNhbGwodGhpcywgOCwgIDB4MDBmZjAwZmYpO1xuXHQgICAgICAgICAgICBleGNoYW5nZUxSLmNhbGwodGhpcywgMSwgIDB4NTU1NTU1NTUpO1xuXG5cdCAgICAgICAgICAgIC8vIFJvdW5kc1xuXHQgICAgICAgICAgICBmb3IgKHZhciByb3VuZCA9IDA7IHJvdW5kIDwgMTY7IHJvdW5kKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIHN1YktleSA9IHN1YktleXNbcm91bmRdO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxCbG9jayA9IHRoaXMuX2xCbG9jaztcblx0ICAgICAgICAgICAgICAgIHZhciByQmxvY2sgPSB0aGlzLl9yQmxvY2s7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEZlaXN0ZWwgZnVuY3Rpb25cblx0ICAgICAgICAgICAgICAgIHZhciBmID0gMDtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZiB8PSBTQk9YX1BbaV1bKChyQmxvY2sgXiBzdWJLZXlbaV0pICYgU0JPWF9NQVNLW2ldKSA+Pj4gMF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9sQmxvY2sgPSByQmxvY2s7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9yQmxvY2sgPSBsQmxvY2sgXiBmO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gVW5kbyBzd2FwIGZyb20gbGFzdCByb3VuZFxuXHQgICAgICAgICAgICB2YXIgdCA9IHRoaXMuX2xCbG9jaztcblx0ICAgICAgICAgICAgdGhpcy5fbEJsb2NrID0gdGhpcy5fckJsb2NrO1xuXHQgICAgICAgICAgICB0aGlzLl9yQmxvY2sgPSB0O1xuXG5cdCAgICAgICAgICAgIC8vIEZpbmFsIHBlcm11dGF0aW9uXG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCAxLCAgMHg1NTU1NTU1NSk7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlUkwuY2FsbCh0aGlzLCA4LCAgMHgwMGZmMDBmZik7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlUkwuY2FsbCh0aGlzLCAyLCAgMHgzMzMzMzMzMyk7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCAxNiwgMHgwMDAwZmZmZik7XG5cdCAgICAgICAgICAgIGV4Y2hhbmdlTFIuY2FsbCh0aGlzLCA0LCAgMHgwZjBmMGYwZik7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IG91dHB1dFxuXHQgICAgICAgICAgICBNW29mZnNldF0gPSB0aGlzLl9sQmxvY2s7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0ICsgMV0gPSB0aGlzLl9yQmxvY2s7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDY0LzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiA2NC8zMixcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvLyBTd2FwIGJpdHMgYWNyb3NzIHRoZSBsZWZ0IGFuZCByaWdodCB3b3Jkc1xuXHQgICAgZnVuY3Rpb24gZXhjaGFuZ2VMUihvZmZzZXQsIG1hc2spIHtcblx0ICAgICAgICB2YXIgdCA9ICgodGhpcy5fbEJsb2NrID4+PiBvZmZzZXQpIF4gdGhpcy5fckJsb2NrKSAmIG1hc2s7XG5cdCAgICAgICAgdGhpcy5fckJsb2NrIF49IHQ7XG5cdCAgICAgICAgdGhpcy5fbEJsb2NrIF49IHQgPDwgb2Zmc2V0O1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBleGNoYW5nZVJMKG9mZnNldCwgbWFzaykge1xuXHQgICAgICAgIHZhciB0ID0gKCh0aGlzLl9yQmxvY2sgPj4+IG9mZnNldCkgXiB0aGlzLl9sQmxvY2spICYgbWFzaztcblx0ICAgICAgICB0aGlzLl9sQmxvY2sgXj0gdDtcblx0ICAgICAgICB0aGlzLl9yQmxvY2sgXj0gdCA8PCBvZmZzZXQ7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuREVTLmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuREVTLmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLkRFUyA9IEJsb2NrQ2lwaGVyLl9jcmVhdGVIZWxwZXIoREVTKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBUcmlwbGUtREVTIGJsb2NrIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBUcmlwbGVERVMgPSBDX2FsZ28uVHJpcGxlREVTID0gQmxvY2tDaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2tleTtcblx0ICAgICAgICAgICAgdmFyIGtleVdvcmRzID0ga2V5LndvcmRzO1xuXHQgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGtleSBsZW5ndGggaXMgdmFsaWQgKDY0LCAxMjggb3IgPj0gMTkyIGJpdClcblx0ICAgICAgICAgICAgaWYgKGtleVdvcmRzLmxlbmd0aCAhPT0gMiAmJiBrZXlXb3Jkcy5sZW5ndGggIT09IDQgJiYga2V5V29yZHMubGVuZ3RoIDwgNikge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGtleSBsZW5ndGggLSAzREVTIHJlcXVpcmVzIHRoZSBrZXkgbGVuZ3RoIHRvIGJlIDY0LCAxMjgsIDE5MiBvciA+MTkyLicpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gRXh0ZW5kIHRoZSBrZXkgYWNjb3JkaW5nIHRvIHRoZSBrZXlpbmcgb3B0aW9ucyBkZWZpbmVkIGluIDNERVMgc3RhbmRhcmRcblx0ICAgICAgICAgICAgdmFyIGtleTEgPSBrZXlXb3Jkcy5zbGljZSgwLCAyKTtcblx0ICAgICAgICAgICAgdmFyIGtleTIgPSBrZXlXb3Jkcy5sZW5ndGggPCA0ID8ga2V5V29yZHMuc2xpY2UoMCwgMikgOiBrZXlXb3Jkcy5zbGljZSgyLCA0KTtcblx0ICAgICAgICAgICAgdmFyIGtleTMgPSBrZXlXb3Jkcy5sZW5ndGggPCA2ID8ga2V5V29yZHMuc2xpY2UoMCwgMikgOiBrZXlXb3Jkcy5zbGljZSg0LCA2KTtcblxuXHQgICAgICAgICAgICAvLyBDcmVhdGUgREVTIGluc3RhbmNlc1xuXHQgICAgICAgICAgICB0aGlzLl9kZXMxID0gREVTLmNyZWF0ZUVuY3J5cHRvcihXb3JkQXJyYXkuY3JlYXRlKGtleTEpKTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMiA9IERFUy5jcmVhdGVFbmNyeXB0b3IoV29yZEFycmF5LmNyZWF0ZShrZXkyKSk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczMgPSBERVMuY3JlYXRlRW5jcnlwdG9yKFdvcmRBcnJheS5jcmVhdGUoa2V5MykpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBlbmNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMS5lbmNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMi5kZWNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgdGhpcy5fZGVzMy5lbmNyeXB0QmxvY2soTSwgb2Zmc2V0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgZGVjcnlwdEJsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczMuZGVjcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczIuZW5jcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgICAgIHRoaXMuX2RlczEuZGVjcnlwdEJsb2NrKE0sIG9mZnNldCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGtleVNpemU6IDE5Mi8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzIsXG5cblx0ICAgICAgICBibG9ja1NpemU6IDY0LzMyXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbnMgdG8gdGhlIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGNpcGhlcnRleHQgPSBDcnlwdG9KUy5UcmlwbGVERVMuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5UcmlwbGVERVMuZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuVHJpcGxlREVTID0gQmxvY2tDaXBoZXIuX2NyZWF0ZUhlbHBlcihUcmlwbGVERVMpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlRyaXBsZURFUztcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2VuYy1iYXNlNjRcIiwgXCIuL21kNVwiLCBcIi4vZXZwa2RmXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFN0cmVhbUNpcGhlciA9IENfbGliLlN0cmVhbUNpcGhlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8qKlxuXHQgICAgICogUkM0IHN0cmVhbSBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgUkM0ID0gQ19hbGdvLlJDNCA9IFN0cmVhbUNpcGhlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fa2V5O1xuXHQgICAgICAgICAgICB2YXIga2V5V29yZHMgPSBrZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBrZXlTaWdCeXRlcyA9IGtleS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBJbml0IHNib3hcblx0ICAgICAgICAgICAgdmFyIFMgPSB0aGlzLl9TID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIFNbaV0gPSBpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gS2V5IHNldHVwXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IDI1NjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIga2V5Qnl0ZUluZGV4ID0gaSAlIGtleVNpZ0J5dGVzO1xuXHQgICAgICAgICAgICAgICAgdmFyIGtleUJ5dGUgPSAoa2V5V29yZHNba2V5Qnl0ZUluZGV4ID4+PiAyXSA+Pj4gKDI0IC0gKGtleUJ5dGVJbmRleCAlIDQpICogOCkpICYgMHhmZjtcblxuXHQgICAgICAgICAgICAgICAgaiA9IChqICsgU1tpXSArIGtleUJ5dGUpICUgMjU2O1xuXG5cdCAgICAgICAgICAgICAgICAvLyBTd2FwXG5cdCAgICAgICAgICAgICAgICB2YXIgdCA9IFNbaV07XG5cdCAgICAgICAgICAgICAgICBTW2ldID0gU1tqXTtcblx0ICAgICAgICAgICAgICAgIFNbal0gPSB0O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ291bnRlcnNcblx0ICAgICAgICAgICAgdGhpcy5faSA9IHRoaXMuX2ogPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgTVtvZmZzZXRdIF49IGdlbmVyYXRlS2V5c3RyZWFtV29yZC5jYWxsKHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBrZXlTaXplOiAyNTYvMzIsXG5cblx0ICAgICAgICBpdlNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBnZW5lcmF0ZUtleXN0cmVhbVdvcmQoKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgdmFyIFMgPSB0aGlzLl9TO1xuXHQgICAgICAgIHZhciBpID0gdGhpcy5faTtcblx0ICAgICAgICB2YXIgaiA9IHRoaXMuX2o7XG5cblx0ICAgICAgICAvLyBHZW5lcmF0ZSBrZXlzdHJlYW0gd29yZFxuXHQgICAgICAgIHZhciBrZXlzdHJlYW1Xb3JkID0gMDtcblx0ICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IDQ7IG4rKykge1xuXHQgICAgICAgICAgICBpID0gKGkgKyAxKSAlIDI1Njtcblx0ICAgICAgICAgICAgaiA9IChqICsgU1tpXSkgJSAyNTY7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcFxuXHQgICAgICAgICAgICB2YXIgdCA9IFNbaV07XG5cdCAgICAgICAgICAgIFNbaV0gPSBTW2pdO1xuXHQgICAgICAgICAgICBTW2pdID0gdDtcblxuXHQgICAgICAgICAgICBrZXlzdHJlYW1Xb3JkIHw9IFNbKFNbaV0gKyBTW2pdKSAlIDI1Nl0gPDwgKDI0IC0gbiAqIDgpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIFVwZGF0ZSBjb3VudGVyc1xuXHQgICAgICAgIHRoaXMuX2kgPSBpO1xuXHQgICAgICAgIHRoaXMuX2ogPSBqO1xuXG5cdCAgICAgICAgcmV0dXJuIGtleXN0cmVhbVdvcmQ7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuUkM0LmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuUkM0LmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLlJDNCA9IFN0cmVhbUNpcGhlci5fY3JlYXRlSGVscGVyKFJDNCk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogTW9kaWZpZWQgUkM0IHN0cmVhbSBjaXBoZXIgYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgUkM0RHJvcCA9IENfYWxnby5SQzREcm9wID0gUkM0LmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRyb3AgVGhlIG51bWJlciBvZiBrZXlzdHJlYW0gd29yZHMgdG8gZHJvcC4gRGVmYXVsdCAxOTJcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IFJDNC5jZmcuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgZHJvcDogMTkyXG5cdCAgICAgICAgfSksXG5cblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICBSQzQuX2RvUmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBEcm9wXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNmZy5kcm9wOyBpID4gMDsgaS0tKSB7XG5cdCAgICAgICAgICAgICAgICBnZW5lcmF0ZUtleXN0cmVhbVdvcmQuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLlJDNERyb3AuZW5jcnlwdChtZXNzYWdlLCBrZXksIGNmZyk7XG5cdCAgICAgKiAgICAgdmFyIHBsYWludGV4dCAgPSBDcnlwdG9KUy5SQzREcm9wLmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLlJDNERyb3AgPSBTdHJlYW1DaXBoZXIuX2NyZWF0ZUhlbHBlcihSQzREcm9wKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5SQzQ7XG5cbn0pKTsiLCAiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL2VuYy1iYXNlNjRcIiksIHJlcXVpcmUoXCIuL21kNVwiKSwgcmVxdWlyZShcIi4vZXZwa2RmXCIpLCByZXF1aXJlKFwiLi9jaXBoZXItY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9lbmMtYmFzZTY0XCIsIFwiLi9tZDVcIiwgXCIuL2V2cGtkZlwiLCBcIi4vY2lwaGVyLWNvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBTdHJlYW1DaXBoZXIgPSBDX2xpYi5TdHJlYW1DaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3RzXG5cdCAgICB2YXIgUyAgPSBbXTtcblx0ICAgIHZhciBDXyA9IFtdO1xuXHQgICAgdmFyIEcgID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogUmFiYml0IHN0cmVhbSBjaXBoZXIgYWxnb3JpdGhtXG5cdCAgICAgKi9cblx0ICAgIHZhciBSYWJiaXQgPSBDX2FsZ28uUmFiYml0ID0gU3RyZWFtQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBLID0gdGhpcy5fa2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaXYgPSB0aGlzLmNmZy5pdjtcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgS1tpXSA9ICgoKEtbaV0gPDwgOCkgIHwgKEtbaV0gPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoS1tpXSA8PCAyNCkgfCAoS1tpXSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gR2VuZXJhdGUgaW5pdGlhbCBzdGF0ZSB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIFggPSB0aGlzLl9YID0gW1xuXHQgICAgICAgICAgICAgICAgS1swXSwgKEtbM10gPDwgMTYpIHwgKEtbMl0gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbMV0sIChLWzBdIDw8IDE2KSB8IChLWzNdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzJdLCAoS1sxXSA8PCAxNikgfCAoS1swXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1szXSwgKEtbMl0gPDwgMTYpIHwgKEtbMV0gPj4+IDE2KVxuXHQgICAgICAgICAgICBdO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGluaXRpYWwgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICAgICAgdmFyIEMgPSB0aGlzLl9DID0gW1xuXHQgICAgICAgICAgICAgICAgKEtbMl0gPDwgMTYpIHwgKEtbMl0gPj4+IDE2KSwgKEtbMF0gJiAweGZmZmYwMDAwKSB8IChLWzFdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1szXSA8PCAxNikgfCAoS1szXSA+Pj4gMTYpLCAoS1sxXSAmIDB4ZmZmZjAwMDApIHwgKEtbMl0gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzBdIDw8IDE2KSB8IChLWzBdID4+PiAxNiksIChLWzJdICYgMHhmZmZmMDAwMCkgfCAoS1szXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbMV0gPDwgMTYpIHwgKEtbMV0gPj4+IDE2KSwgKEtbM10gJiAweGZmZmYwMDAwKSB8IChLWzBdICYgMHgwMDAwZmZmZilcblx0ICAgICAgICAgICAgXTtcblxuXHQgICAgICAgICAgICAvLyBDYXJyeSBiaXRcblx0ICAgICAgICAgICAgdGhpcy5fYiA9IDA7XG5cblx0ICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aGUgc3lzdGVtIGZvdXIgdGltZXNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIG5leHRTdGF0ZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gTW9kaWZ5IHRoZSBjb3VudGVyc1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgQ1tpXSBePSBYWyhpICsgNCkgJiA3XTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIElWIHNldHVwXG5cdCAgICAgICAgICAgIGlmIChpdikge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgSVYgPSBpdi53b3Jkcztcblx0ICAgICAgICAgICAgICAgIHZhciBJVl8wID0gSVZbMF07XG5cdCAgICAgICAgICAgICAgICB2YXIgSVZfMSA9IElWWzFdO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBHZW5lcmF0ZSBmb3VyIHN1YnZlY3RvcnNcblx0ICAgICAgICAgICAgICAgIHZhciBpMCA9ICgoKElWXzAgPDwgOCkgfCAoSVZfMCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHwgKCgoSVZfMCA8PCAyNCkgfCAoSVZfMCA+Pj4gOCkpICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTIgPSAoKChJVl8xIDw8IDgpIHwgKElWXzEgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8ICgoKElWXzEgPDwgMjQpIHwgKElWXzEgPj4+IDgpKSAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkxID0gKGkwID4+PiAxNikgfCAoaTIgJiAweGZmZmYwMDAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMyA9IChpMiA8PCAxNikgIHwgKGkwICYgMHgwMDAwZmZmZik7XG5cblx0ICAgICAgICAgICAgICAgIC8vIE1vZGlmeSBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgICAgICAgICAgQ1swXSBePSBpMDtcblx0ICAgICAgICAgICAgICAgIENbMV0gXj0gaTE7XG5cdCAgICAgICAgICAgICAgICBDWzJdIF49IGkyO1xuXHQgICAgICAgICAgICAgICAgQ1szXSBePSBpMztcblx0ICAgICAgICAgICAgICAgIENbNF0gXj0gaTA7XG5cdCAgICAgICAgICAgICAgICBDWzVdIF49IGkxO1xuXHQgICAgICAgICAgICAgICAgQ1s2XSBePSBpMjtcblx0ICAgICAgICAgICAgICAgIENbN10gXj0gaTM7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbSBmb3VyIHRpbWVzXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIG5leHRTdGF0ZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgWCA9IHRoaXMuX1g7XG5cblx0ICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aGUgc3lzdGVtXG5cdCAgICAgICAgICAgIG5leHRTdGF0ZS5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGZvdXIga2V5c3RyZWFtIHdvcmRzXG5cdCAgICAgICAgICAgIFNbMF0gPSBYWzBdIF4gKFhbNV0gPj4+IDE2KSBeIChYWzNdIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1sxXSA9IFhbMl0gXiAoWFs3XSA+Pj4gMTYpIF4gKFhbNV0gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzJdID0gWFs0XSBeIChYWzFdID4+PiAxNikgXiAoWFs3XSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbM10gPSBYWzZdIF4gKFhbM10gPj4+IDE2KSBeIChYWzFdIDw8IDE2KTtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgICAgIFNbaV0gPSAoKChTW2ldIDw8IDgpICB8IChTW2ldID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKFNbaV0gPDwgMjQpIHwgKFNbaV0gPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gRW5jcnlwdFxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXQgKyBpXSBePSBTW2ldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogMTI4LzMyLFxuXG5cdCAgICAgICAgaXZTaXplOiA2NC8zMlxuXHQgICAgfSk7XG5cblx0ICAgIGZ1bmN0aW9uIG5leHRTdGF0ZSgpIHtcblx0ICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICB2YXIgWCA9IHRoaXMuX1g7XG5cdCAgICAgICAgdmFyIEMgPSB0aGlzLl9DO1xuXG5cdCAgICAgICAgLy8gU2F2ZSBvbGQgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuXHQgICAgICAgICAgICBDX1tpXSA9IENbaV07XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBjb3VudGVyIHZhbHVlc1xuXHQgICAgICAgIENbMF0gPSAoQ1swXSArIDB4NGQzNGQzNGQgKyB0aGlzLl9iKSB8IDA7XG5cdCAgICAgICAgQ1sxXSA9IChDWzFdICsgMHhkMzRkMzRkMyArICgoQ1swXSA+Pj4gMCkgPCAoQ19bMF0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1syXSA9IChDWzJdICsgMHgzNGQzNGQzNCArICgoQ1sxXSA+Pj4gMCkgPCAoQ19bMV0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1szXSA9IChDWzNdICsgMHg0ZDM0ZDM0ZCArICgoQ1syXSA+Pj4gMCkgPCAoQ19bMl0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s0XSA9IChDWzRdICsgMHhkMzRkMzRkMyArICgoQ1szXSA+Pj4gMCkgPCAoQ19bM10gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s1XSA9IChDWzVdICsgMHgzNGQzNGQzNCArICgoQ1s0XSA+Pj4gMCkgPCAoQ19bNF0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s2XSA9IChDWzZdICsgMHg0ZDM0ZDM0ZCArICgoQ1s1XSA+Pj4gMCkgPCAoQ19bNV0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgQ1s3XSA9IChDWzddICsgMHhkMzRkMzRkMyArICgoQ1s2XSA+Pj4gMCkgPCAoQ19bNl0gPj4+IDApID8gMSA6IDApKSB8IDA7XG5cdCAgICAgICAgdGhpcy5fYiA9IChDWzddID4+PiAwKSA8IChDX1s3XSA+Pj4gMCkgPyAxIDogMDtcblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZy12YWx1ZXNcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIgZ3ggPSBYW2ldICsgQ1tpXTtcblxuXHQgICAgICAgICAgICAvLyBDb25zdHJ1Y3QgaGlnaCBhbmQgbG93IGFyZ3VtZW50IGZvciBzcXVhcmluZ1xuXHQgICAgICAgICAgICB2YXIgZ2EgPSBneCAmIDB4ZmZmZjtcblx0ICAgICAgICAgICAgdmFyIGdiID0gZ3ggPj4+IDE2O1xuXG5cdCAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBoaWdoIGFuZCBsb3cgcmVzdWx0IG9mIHNxdWFyaW5nXG5cdCAgICAgICAgICAgIHZhciBnaCA9ICgoKChnYSAqIGdhKSA+Pj4gMTcpICsgZ2EgKiBnYikgPj4+IDE1KSArIGdiICogZ2I7XG5cdCAgICAgICAgICAgIHZhciBnbCA9ICgoKGd4ICYgMHhmZmZmMDAwMCkgKiBneCkgfCAwKSArICgoKGd4ICYgMHgwMDAwZmZmZikgKiBneCkgfCAwKTtcblxuXHQgICAgICAgICAgICAvLyBIaWdoIFhPUiBsb3dcblx0ICAgICAgICAgICAgR1tpXSA9IGdoIF4gZ2w7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBzdGF0ZSB2YWx1ZXNcblx0ICAgICAgICBYWzBdID0gKEdbMF0gKyAoKEdbN10gPDwgMTYpIHwgKEdbN10gPj4+IDE2KSkgKyAoKEdbNl0gPDwgMTYpIHwgKEdbNl0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzFdID0gKEdbMV0gKyAoKEdbMF0gPDwgOCkgIHwgKEdbMF0gPj4+IDI0KSkgKyBHWzddKSB8IDA7XG5cdCAgICAgICAgWFsyXSA9IChHWzJdICsgKChHWzFdIDw8IDE2KSB8IChHWzFdID4+PiAxNikpICsgKChHWzBdIDw8IDE2KSB8IChHWzBdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFszXSA9IChHWzNdICsgKChHWzJdIDw8IDgpICB8IChHWzJdID4+PiAyNCkpICsgR1sxXSkgfCAwO1xuXHQgICAgICAgIFhbNF0gPSAoR1s0XSArICgoR1szXSA8PCAxNikgfCAoR1szXSA+Pj4gMTYpKSArICgoR1syXSA8PCAxNikgfCAoR1syXSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbNV0gPSAoR1s1XSArICgoR1s0XSA8PCA4KSAgfCAoR1s0XSA+Pj4gMjQpKSArIEdbM10pIHwgMDtcblx0ICAgICAgICBYWzZdID0gKEdbNl0gKyAoKEdbNV0gPDwgMTYpIHwgKEdbNV0gPj4+IDE2KSkgKyAoKEdbNF0gPDwgMTYpIHwgKEdbNF0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzddID0gKEdbN10gKyAoKEdbNl0gPDwgOCkgIHwgKEdbNl0gPj4+IDI0KSkgKyBHWzVdKSB8IDA7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb25zIHRvIHRoZSBjaXBoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBjaXBoZXJ0ZXh0ID0gQ3J5cHRvSlMuUmFiYml0LmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuUmFiYml0LmRlY3J5cHQoY2lwaGVydGV4dCwga2V5LCBjZmcpO1xuXHQgICAgICovXG5cdCAgICBDLlJhYmJpdCA9IFN0cmVhbUNpcGhlci5fY3JlYXRlSGVscGVyKFJhYmJpdCk7XG5cdH0oKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuUmFiYml0O1xuXG59KSk7IiwgIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnksIHVuZGVmKSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4vZW5jLWJhc2U2NFwiLCBcIi4vbWQ1XCIsIFwiLi9ldnBrZGZcIiwgXCIuL2NpcGhlci1jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgU3RyZWFtQ2lwaGVyID0gQ19saWIuU3RyZWFtQ2lwaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gUmV1c2FibGUgb2JqZWN0c1xuXHQgICAgdmFyIFMgID0gW107XG5cdCAgICB2YXIgQ18gPSBbXTtcblx0ICAgIHZhciBHICA9IFtdO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFJhYmJpdCBzdHJlYW0gY2lwaGVyIGFsZ29yaXRobS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGlzIGlzIGEgbGVnYWN5IHZlcnNpb24gdGhhdCBuZWdsZWN0ZWQgdG8gY29udmVydCB0aGUga2V5IHRvIGxpdHRsZS1lbmRpYW4uXG5cdCAgICAgKiBUaGlzIGVycm9yIGRvZXNuJ3QgYWZmZWN0IHRoZSBjaXBoZXIncyBzZWN1cml0eSxcblx0ICAgICAqIGJ1dCBpdCBkb2VzIGFmZmVjdCBpdHMgY29tcGF0aWJpbGl0eSB3aXRoIG90aGVyIGltcGxlbWVudGF0aW9ucy5cblx0ICAgICAqL1xuXHQgICAgdmFyIFJhYmJpdExlZ2FjeSA9IENfYWxnby5SYWJiaXRMZWdhY3kgPSBTdHJlYW1DaXBoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEsgPSB0aGlzLl9rZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpdiA9IHRoaXMuY2ZnLml2O1xuXG5cdCAgICAgICAgICAgIC8vIEdlbmVyYXRlIGluaXRpYWwgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBYID0gdGhpcy5fWCA9IFtcblx0ICAgICAgICAgICAgICAgIEtbMF0sIChLWzNdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksXG5cdCAgICAgICAgICAgICAgICBLWzFdLCAoS1swXSA8PCAxNikgfCAoS1szXSA+Pj4gMTYpLFxuXHQgICAgICAgICAgICAgICAgS1syXSwgKEtbMV0gPDwgMTYpIHwgKEtbMF0gPj4+IDE2KSxcblx0ICAgICAgICAgICAgICAgIEtbM10sIChLWzJdIDw8IDE2KSB8IChLWzFdID4+PiAxNilcblx0ICAgICAgICAgICAgXTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBpbml0aWFsIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgICAgIHZhciBDID0gdGhpcy5fQyA9IFtcblx0ICAgICAgICAgICAgICAgIChLWzJdIDw8IDE2KSB8IChLWzJdID4+PiAxNiksIChLWzBdICYgMHhmZmZmMDAwMCkgfCAoS1sxXSAmIDB4MDAwMGZmZmYpLFxuXHQgICAgICAgICAgICAgICAgKEtbM10gPDwgMTYpIHwgKEtbM10gPj4+IDE2KSwgKEtbMV0gJiAweGZmZmYwMDAwKSB8IChLWzJdICYgMHgwMDAwZmZmZiksXG5cdCAgICAgICAgICAgICAgICAoS1swXSA8PCAxNikgfCAoS1swXSA+Pj4gMTYpLCAoS1syXSAmIDB4ZmZmZjAwMDApIHwgKEtbM10gJiAweDAwMDBmZmZmKSxcblx0ICAgICAgICAgICAgICAgIChLWzFdIDw8IDE2KSB8IChLWzFdID4+PiAxNiksIChLWzNdICYgMHhmZmZmMDAwMCkgfCAoS1swXSAmIDB4MDAwMGZmZmYpXG5cdCAgICAgICAgICAgIF07XG5cblx0ICAgICAgICAgICAgLy8gQ2FycnkgYml0XG5cdCAgICAgICAgICAgIHRoaXMuX2IgPSAwO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbSBmb3VyIHRpbWVzXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIE1vZGlmeSB0aGUgY291bnRlcnNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIENbaV0gXj0gWFsoaSArIDQpICYgN107XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBJViBzZXR1cFxuXHQgICAgICAgICAgICBpZiAoaXYpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIElWID0gaXYud29yZHM7XG5cdCAgICAgICAgICAgICAgICB2YXIgSVZfMCA9IElWWzBdO1xuXHQgICAgICAgICAgICAgICAgdmFyIElWXzEgPSBJVlsxXTtcblxuXHQgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgZm91ciBzdWJ2ZWN0b3JzXG5cdCAgICAgICAgICAgICAgICB2YXIgaTAgPSAoKChJVl8wIDw8IDgpIHwgKElWXzAgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8ICgoKElWXzAgPDwgMjQpIHwgKElWXzAgPj4+IDgpKSAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICAgICAgdmFyIGkyID0gKCgoSVZfMSA8PCA4KSB8IChJVl8xID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfCAoKChJVl8xIDw8IDI0KSB8IChJVl8xID4+PiA4KSkgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgICAgIHZhciBpMSA9IChpMCA+Pj4gMTYpIHwgKGkyICYgMHhmZmZmMDAwMCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgaTMgPSAoaTIgPDwgMTYpICB8IChpMCAmIDB4MDAwMGZmZmYpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBNb2RpZnkgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICAgICAgICAgIENbMF0gXj0gaTA7XG5cdCAgICAgICAgICAgICAgICBDWzFdIF49IGkxO1xuXHQgICAgICAgICAgICAgICAgQ1syXSBePSBpMjtcblx0ICAgICAgICAgICAgICAgIENbM10gXj0gaTM7XG5cdCAgICAgICAgICAgICAgICBDWzRdIF49IGkwO1xuXHQgICAgICAgICAgICAgICAgQ1s1XSBePSBpMTtcblx0ICAgICAgICAgICAgICAgIENbNl0gXj0gaTI7XG5cdCAgICAgICAgICAgICAgICBDWzddIF49IGkzO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIHRoZSBzeXN0ZW0gZm91ciB0aW1lc1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXG5cdCAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhlIHN5c3RlbVxuXHQgICAgICAgICAgICBuZXh0U3RhdGUuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBHZW5lcmF0ZSBmb3VyIGtleXN0cmVhbSB3b3Jkc1xuXHQgICAgICAgICAgICBTWzBdID0gWFswXSBeIChYWzVdID4+PiAxNikgXiAoWFszXSA8PCAxNik7XG5cdCAgICAgICAgICAgIFNbMV0gPSBYWzJdIF4gKFhbN10gPj4+IDE2KSBeIChYWzVdIDw8IDE2KTtcblx0ICAgICAgICAgICAgU1syXSA9IFhbNF0gXiAoWFsxXSA+Pj4gMTYpIF4gKFhbN10gPDwgMTYpO1xuXHQgICAgICAgICAgICBTWzNdID0gWFs2XSBeIChYWzNdID4+PiAxNikgXiAoWFsxXSA8PCAxNik7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgICAgICBTW2ldID0gKCgoU1tpXSA8PCA4KSAgfCAoU1tpXSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChTW2ldIDw8IDI0KSB8IChTW2ldID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEVuY3J5cHRcblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0ICsgaV0gXj0gU1tpXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDEyOC8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBuZXh0U3RhdGUoKSB7XG5cdCAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgdmFyIFggPSB0aGlzLl9YO1xuXHQgICAgICAgIHZhciBDID0gdGhpcy5fQztcblxuXHQgICAgICAgIC8vIFNhdmUgb2xkIGNvdW50ZXIgdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgQ19baV0gPSBDW2ldO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgY291bnRlciB2YWx1ZXNcblx0ICAgICAgICBDWzBdID0gKENbMF0gKyAweDRkMzRkMzRkICsgdGhpcy5fYikgfCAwO1xuXHQgICAgICAgIENbMV0gPSAoQ1sxXSArIDB4ZDM0ZDM0ZDMgKyAoKENbMF0gPj4+IDApIDwgKENfWzBdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbMl0gPSAoQ1syXSArIDB4MzRkMzRkMzQgKyAoKENbMV0gPj4+IDApIDwgKENfWzFdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbM10gPSAoQ1szXSArIDB4NGQzNGQzNGQgKyAoKENbMl0gPj4+IDApIDwgKENfWzJdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNF0gPSAoQ1s0XSArIDB4ZDM0ZDM0ZDMgKyAoKENbM10gPj4+IDApIDwgKENfWzNdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNV0gPSAoQ1s1XSArIDB4MzRkMzRkMzQgKyAoKENbNF0gPj4+IDApIDwgKENfWzRdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbNl0gPSAoQ1s2XSArIDB4NGQzNGQzNGQgKyAoKENbNV0gPj4+IDApIDwgKENfWzVdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIENbN10gPSAoQ1s3XSArIDB4ZDM0ZDM0ZDMgKyAoKENbNl0gPj4+IDApIDwgKENfWzZdID4+PiAwKSA/IDEgOiAwKSkgfCAwO1xuXHQgICAgICAgIHRoaXMuX2IgPSAoQ1s3XSA+Pj4gMCkgPCAoQ19bN10gPj4+IDApID8gMSA6IDA7XG5cblx0ICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGctdmFsdWVzXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIGd4ID0gWFtpXSArIENbaV07XG5cblx0ICAgICAgICAgICAgLy8gQ29uc3RydWN0IGhpZ2ggYW5kIGxvdyBhcmd1bWVudCBmb3Igc3F1YXJpbmdcblx0ICAgICAgICAgICAgdmFyIGdhID0gZ3ggJiAweGZmZmY7XG5cdCAgICAgICAgICAgIHZhciBnYiA9IGd4ID4+PiAxNjtcblxuXHQgICAgICAgICAgICAvLyBDYWxjdWxhdGUgaGlnaCBhbmQgbG93IHJlc3VsdCBvZiBzcXVhcmluZ1xuXHQgICAgICAgICAgICB2YXIgZ2ggPSAoKCgoZ2EgKiBnYSkgPj4+IDE3KSArIGdhICogZ2IpID4+PiAxNSkgKyBnYiAqIGdiO1xuXHQgICAgICAgICAgICB2YXIgZ2wgPSAoKChneCAmIDB4ZmZmZjAwMDApICogZ3gpIHwgMCkgKyAoKChneCAmIDB4MDAwMGZmZmYpICogZ3gpIHwgMCk7XG5cblx0ICAgICAgICAgICAgLy8gSGlnaCBYT1IgbG93XG5cdCAgICAgICAgICAgIEdbaV0gPSBnaCBeIGdsO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgc3RhdGUgdmFsdWVzXG5cdCAgICAgICAgWFswXSA9IChHWzBdICsgKChHWzddIDw8IDE2KSB8IChHWzddID4+PiAxNikpICsgKChHWzZdIDw8IDE2KSB8IChHWzZdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFsxXSA9IChHWzFdICsgKChHWzBdIDw8IDgpICB8IChHWzBdID4+PiAyNCkpICsgR1s3XSkgfCAwO1xuXHQgICAgICAgIFhbMl0gPSAoR1syXSArICgoR1sxXSA8PCAxNikgfCAoR1sxXSA+Pj4gMTYpKSArICgoR1swXSA8PCAxNikgfCAoR1swXSA+Pj4gMTYpKSkgfCAwO1xuXHQgICAgICAgIFhbM10gPSAoR1szXSArICgoR1syXSA8PCA4KSAgfCAoR1syXSA+Pj4gMjQpKSArIEdbMV0pIHwgMDtcblx0ICAgICAgICBYWzRdID0gKEdbNF0gKyAoKEdbM10gPDwgMTYpIHwgKEdbM10gPj4+IDE2KSkgKyAoKEdbMl0gPDwgMTYpIHwgKEdbMl0gPj4+IDE2KSkpIHwgMDtcblx0ICAgICAgICBYWzVdID0gKEdbNV0gKyAoKEdbNF0gPDwgOCkgIHwgKEdbNF0gPj4+IDI0KSkgKyBHWzNdKSB8IDA7XG5cdCAgICAgICAgWFs2XSA9IChHWzZdICsgKChHWzVdIDw8IDE2KSB8IChHWzVdID4+PiAxNikpICsgKChHWzRdIDw8IDE2KSB8IChHWzRdID4+PiAxNikpKSB8IDA7XG5cdCAgICAgICAgWFs3XSA9IChHWzddICsgKChHWzZdIDw8IDgpICB8IChHWzZdID4+PiAyNCkpICsgR1s1XSkgfCAwO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLlJhYmJpdExlZ2FjeS5lbmNyeXB0KG1lc3NhZ2UsIGtleSwgY2ZnKTtcblx0ICAgICAqICAgICB2YXIgcGxhaW50ZXh0ICA9IENyeXB0b0pTLlJhYmJpdExlZ2FjeS5kZWNyeXB0KGNpcGhlcnRleHQsIGtleSwgY2ZnKTtcblx0ICAgICAqL1xuXHQgICAgQy5SYWJiaXRMZWdhY3kgPSBTdHJlYW1DaXBoZXIuX2NyZWF0ZUhlbHBlcihSYWJiaXRMZWdhY3kpO1xuXHR9KCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlJhYmJpdExlZ2FjeTtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vZW5jLWJhc2U2NFwiKSwgcmVxdWlyZShcIi4vbWQ1XCIpLCByZXF1aXJlKFwiLi9ldnBrZGZcIiksIHJlcXVpcmUoXCIuL2NpcGhlci1jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL2VuYy1iYXNlNjRcIiwgXCIuL21kNVwiLCBcIi4vZXZwa2RmXCIsIFwiLi9jaXBoZXItY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIEJsb2NrQ2lwaGVyID0gQ19saWIuQmxvY2tDaXBoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICBjb25zdCBOID0gMTY7XG5cblx0ICAgIC8vT3JpZ2luIHBib3ggYW5kIHNib3gsIGRlcml2ZWQgZnJvbSBQSVxuXHQgICAgY29uc3QgT1JJR19QID0gW1xuXHQgICAgICAgIDB4MjQzRjZBODgsIDB4ODVBMzA4RDMsIDB4MTMxOThBMkUsIDB4MDM3MDczNDQsXG5cdCAgICAgICAgMHhBNDA5MzgyMiwgMHgyOTlGMzFEMCwgMHgwODJFRkE5OCwgMHhFQzRFNkM4OSxcblx0ICAgICAgICAweDQ1MjgyMUU2LCAweDM4RDAxMzc3LCAweEJFNTQ2NkNGLCAweDM0RTkwQzZDLFxuXHQgICAgICAgIDB4QzBBQzI5QjcsIDB4Qzk3QzUwREQsIDB4M0Y4NEQ1QjUsIDB4QjU0NzA5MTcsXG5cdCAgICAgICAgMHg5MjE2RDVEOSwgMHg4OTc5RkIxQlxuXHQgICAgXTtcblxuXHQgICAgY29uc3QgT1JJR19TID0gW1xuXHQgICAgICAgIFsgICAweEQxMzEwQkE2LCAweDk4REZCNUFDLCAweDJGRkQ3MkRCLCAweEQwMUFERkI3LFxuXHQgICAgICAgICAgICAweEI4RTFBRkVELCAweDZBMjY3RTk2LCAweEJBN0M5MDQ1LCAweEYxMkM3Rjk5LFxuXHQgICAgICAgICAgICAweDI0QTE5OTQ3LCAweEIzOTE2Q0Y3LCAweDA4MDFGMkUyLCAweDg1OEVGQzE2LFxuXHQgICAgICAgICAgICAweDYzNjkyMEQ4LCAweDcxNTc0RTY5LCAweEE0NThGRUEzLCAweEY0OTMzRDdFLFxuXHQgICAgICAgICAgICAweDBEOTU3NDhGLCAweDcyOEVCNjU4LCAweDcxOEJDRDU4LCAweDgyMTU0QUVFLFxuXHQgICAgICAgICAgICAweDdCNTRBNDFELCAweEMyNUE1OUI1LCAweDlDMzBENTM5LCAweDJBRjI2MDEzLFxuXHQgICAgICAgICAgICAweEM1RDFCMDIzLCAweDI4NjA4NUYwLCAweENBNDE3OTE4LCAweEI4REIzOEVGLFxuXHQgICAgICAgICAgICAweDhFNzlEQ0IwLCAweDYwM0ExODBFLCAweDZDOUUwRThCLCAweEIwMUU4QTNFLFxuXHQgICAgICAgICAgICAweEQ3MTU3N0MxLCAweEJEMzE0QjI3LCAweDc4QUYyRkRBLCAweDU1NjA1QzYwLFxuXHQgICAgICAgICAgICAweEU2NTUyNUYzLCAweEFBNTVBQjk0LCAweDU3NDg5ODYyLCAweDYzRTgxNDQwLFxuXHQgICAgICAgICAgICAweDU1Q0EzOTZBLCAweDJBQUIxMEI2LCAweEI0Q0M1QzM0LCAweDExNDFFOENFLFxuXHQgICAgICAgICAgICAweEExNTQ4NkFGLCAweDdDNzJFOTkzLCAweEIzRUUxNDExLCAweDYzNkZCQzJBLFxuXHQgICAgICAgICAgICAweDJCQTlDNTVELCAweDc0MTgzMUY2LCAweENFNUMzRTE2LCAweDlCODc5MzFFLFxuXHQgICAgICAgICAgICAweEFGRDZCQTMzLCAweDZDMjRDRjVDLCAweDdBMzI1MzgxLCAweDI4OTU4Njc3LFxuXHQgICAgICAgICAgICAweDNCOEY0ODk4LCAweDZCNEJCOUFGLCAweEM0QkZFODFCLCAweDY2MjgyMTkzLFxuXHQgICAgICAgICAgICAweDYxRDgwOUNDLCAweEZCMjFBOTkxLCAweDQ4N0NBQzYwLCAweDVERUM4MDMyLFxuXHQgICAgICAgICAgICAweEVGODQ1RDVELCAweEU5ODU3NUIxLCAweERDMjYyMzAyLCAweEVCNjUxQjg4LFxuXHQgICAgICAgICAgICAweDIzODkzRTgxLCAweEQzOTZBQ0M1LCAweDBGNkQ2RkYzLCAweDgzRjQ0MjM5LFxuXHQgICAgICAgICAgICAweDJFMEI0NDgyLCAweEE0ODQyMDA0LCAweDY5QzhGMDRBLCAweDlFMUY5QjVFLFxuXHQgICAgICAgICAgICAweDIxQzY2ODQyLCAweEY2RTk2QzlBLCAweDY3MEM5QzYxLCAweEFCRDM4OEYwLFxuXHQgICAgICAgICAgICAweDZBNTFBMEQyLCAweEQ4NTQyRjY4LCAweDk2MEZBNzI4LCAweEFCNTEzM0EzLFxuXHQgICAgICAgICAgICAweDZFRUYwQjZDLCAweDEzN0EzQkU0LCAweEJBM0JGMDUwLCAweDdFRkIyQTk4LFxuXHQgICAgICAgICAgICAweEExRjE2NTFELCAweDM5QUYwMTc2LCAweDY2Q0E1OTNFLCAweDgyNDMwRTg4LFxuXHQgICAgICAgICAgICAweDhDRUU4NjE5LCAweDQ1NkY5RkI0LCAweDdEODRBNUMzLCAweDNCOEI1RUJFLFxuXHQgICAgICAgICAgICAweEUwNkY3NUQ4LCAweDg1QzEyMDczLCAweDQwMUE0NDlGLCAweDU2QzE2QUE2LFxuXHQgICAgICAgICAgICAweDRFRDNBQTYyLCAweDM2M0Y3NzA2LCAweDFCRkVERjcyLCAweDQyOUIwMjNELFxuXHQgICAgICAgICAgICAweDM3RDBENzI0LCAweEQwMEExMjQ4LCAweERCMEZFQUQzLCAweDQ5RjFDMDlCLFxuXHQgICAgICAgICAgICAweDA3NTM3MkM5LCAweDgwOTkxQjdCLCAweDI1RDQ3OUQ4LCAweEY2RThERUY3LFxuXHQgICAgICAgICAgICAweEUzRkU1MDFBLCAweEI2Nzk0QzNCLCAweDk3NkNFMEJELCAweDA0QzAwNkJBLFxuXHQgICAgICAgICAgICAweEMxQTk0RkI2LCAweDQwOUY2MEM0LCAweDVFNUM5RUMyLCAweDE5NkEyNDYzLFxuXHQgICAgICAgICAgICAweDY4RkI2RkFGLCAweDNFNkM1M0I1LCAweDEzMzlCMkVCLCAweDNCNTJFQzZGLFxuXHQgICAgICAgICAgICAweDZERkM1MTFGLCAweDlCMzA5NTJDLCAweENDODE0NTQ0LCAweEFGNUVCRDA5LFxuXHQgICAgICAgICAgICAweEJFRTNEMDA0LCAweERFMzM0QUZELCAweDY2MEYyODA3LCAweDE5MkU0QkIzLFxuXHQgICAgICAgICAgICAweEMwQ0JBODU3LCAweDQ1Qzg3NDBGLCAweEQyMEI1RjM5LCAweEI5RDNGQkRCLFxuXHQgICAgICAgICAgICAweDU1NzlDMEJELCAweDFBNjAzMjBBLCAweEQ2QTEwMEM2LCAweDQwMkM3Mjc5LFxuXHQgICAgICAgICAgICAweDY3OUYyNUZFLCAweEZCMUZBM0NDLCAweDhFQTVFOUY4LCAweERCMzIyMkY4LFxuXHQgICAgICAgICAgICAweDNDNzUxNkRGLCAweEZENjE2QjE1LCAweDJGNTAxRUM4LCAweEFEMDU1MkFCLFxuXHQgICAgICAgICAgICAweDMyM0RCNUZBLCAweEZEMjM4NzYwLCAweDUzMzE3QjQ4LCAweDNFMDBERjgyLFxuXHQgICAgICAgICAgICAweDlFNUM1N0JCLCAweENBNkY4Q0EwLCAweDFBODc1NjJFLCAweERGMTc2OURCLFxuXHQgICAgICAgICAgICAweEQ1NDJBOEY2LCAweDI4N0VGRkMzLCAweEFDNjczMkM2LCAweDhDNEY1NTczLFxuXHQgICAgICAgICAgICAweDY5NUIyN0IwLCAweEJCQ0E1OEM4LCAweEUxRkZBMzVELCAweEI4RjAxMUEwLFxuXHQgICAgICAgICAgICAweDEwRkEzRDk4LCAweEZEMjE4M0I4LCAweDRBRkNCNTZDLCAweDJERDFEMzVCLFxuXHQgICAgICAgICAgICAweDlBNTNFNDc5LCAweEI2Rjg0NTY1LCAweEQyOEU0OUJDLCAweDRCRkI5NzkwLFxuXHQgICAgICAgICAgICAweEUxRERGMkRBLCAweEE0Q0I3RTMzLCAweDYyRkIxMzQxLCAweENFRTRDNkU4LFxuXHQgICAgICAgICAgICAweEVGMjBDQURBLCAweDM2Nzc0QzAxLCAweEQwN0U5RUZFLCAweDJCRjExRkI0LFxuXHQgICAgICAgICAgICAweDk1REJEQTRELCAweEFFOTA5MTk4LCAweEVBQUQ4RTcxLCAweDZCOTNENUEwLFxuXHQgICAgICAgICAgICAweEQwOEVEMUQwLCAweEFGQzcyNUUwLCAweDhFM0M1QjJGLCAweDhFNzU5NEI3LFxuXHQgICAgICAgICAgICAweDhGRjZFMkZCLCAweEYyMTIyQjY0LCAweDg4ODhCODEyLCAweDkwMERGMDFDLFxuXHQgICAgICAgICAgICAweDRGQUQ1RUEwLCAweDY4OEZDMzFDLCAweEQxQ0ZGMTkxLCAweEIzQThDMUFELFxuXHQgICAgICAgICAgICAweDJGMkYyMjE4LCAweEJFMEUxNzc3LCAweEVBNzUyREZFLCAweDhCMDIxRkExLFxuXHQgICAgICAgICAgICAweEU1QTBDQzBGLCAweEI1NkY3NEU4LCAweDE4QUNGM0Q2LCAweENFODlFMjk5LFxuXHQgICAgICAgICAgICAweEI0QTg0RkUwLCAweEZEMTNFMEI3LCAweDdDQzQzQjgxLCAweEQyQURBOEQ5LFxuXHQgICAgICAgICAgICAweDE2NUZBMjY2LCAweDgwOTU3NzA1LCAweDkzQ0M3MzE0LCAweDIxMUExNDc3LFxuXHQgICAgICAgICAgICAweEU2QUQyMDY1LCAweDc3QjVGQTg2LCAweEM3NTQ0MkY1LCAweEZCOUQzNUNGLFxuXHQgICAgICAgICAgICAweEVCQ0RBRjBDLCAweDdCM0U4OUEwLCAweEQ2NDExQkQzLCAweEFFMUU3RTQ5LFxuXHQgICAgICAgICAgICAweDAwMjUwRTJELCAweDIwNzFCMzVFLCAweDIyNjgwMEJCLCAweDU3QjhFMEFGLFxuXHQgICAgICAgICAgICAweDI0NjQzNjlCLCAweEYwMDlCOTFFLCAweDU1NjM5MTFELCAweDU5REZBNkFBLFxuXHQgICAgICAgICAgICAweDc4QzE0Mzg5LCAweEQ5NUE1MzdGLCAweDIwN0Q1QkEyLCAweDAyRTVCOUM1LFxuXHQgICAgICAgICAgICAweDgzMjYwMzc2LCAweDYyOTVDRkE5LCAweDExQzgxOTY4LCAweDRFNzM0QTQxLFxuXHQgICAgICAgICAgICAweEIzNDcyRENBLCAweDdCMTRBOTRBLCAweDFCNTEwMDUyLCAweDlBNTMyOTE1LFxuXHQgICAgICAgICAgICAweEQ2MEY1NzNGLCAweEJDOUJDNkU0LCAweDJCNjBBNDc2LCAweDgxRTY3NDAwLFxuXHQgICAgICAgICAgICAweDA4QkE2RkI1LCAweDU3MUJFOTFGLCAweEYyOTZFQzZCLCAweDJBMEREOTE1LFxuXHQgICAgICAgICAgICAweEI2NjM2NTIxLCAweEU3QjlGOUI2LCAweEZGMzQwNTJFLCAweEM1ODU1NjY0LFxuXHQgICAgICAgICAgICAweDUzQjAyRDVELCAweEE5OUY4RkExLCAweDA4QkE0Nzk5LCAweDZFODUwNzZBICAgXSxcblx0ICAgICAgICBbICAgMHg0QjdBNzBFOSwgMHhCNUIzMjk0NCwgMHhEQjc1MDkyRSwgMHhDNDE5MjYyMyxcblx0ICAgICAgICAgICAgMHhBRDZFQTZCMCwgMHg0OUE3REY3RCwgMHg5Q0VFNjBCOCwgMHg4RkVEQjI2Nixcblx0ICAgICAgICAgICAgMHhFQ0FBOEM3MSwgMHg2OTlBMTdGRiwgMHg1NjY0NTI2QywgMHhDMkIxOUVFMSxcblx0ICAgICAgICAgICAgMHgxOTM2MDJBNSwgMHg3NTA5NEMyOSwgMHhBMDU5MTM0MCwgMHhFNDE4M0EzRSxcblx0ICAgICAgICAgICAgMHgzRjU0OTg5QSwgMHg1QjQyOUQ2NSwgMHg2QjhGRTRENiwgMHg5OUY3M0ZENixcblx0ICAgICAgICAgICAgMHhBMUQyOUMwNywgMHhFRkU4MzBGNSwgMHg0RDJEMzhFNiwgMHhGMDI1NURDMSxcblx0ICAgICAgICAgICAgMHg0Q0REMjA4NiwgMHg4NDcwRUIyNiwgMHg2MzgyRTlDNiwgMHgwMjFFQ0M1RSxcblx0ICAgICAgICAgICAgMHgwOTY4NkIzRiwgMHgzRUJBRUZDOSwgMHgzQzk3MTgxNCwgMHg2QjZBNzBBMSxcblx0ICAgICAgICAgICAgMHg2ODdGMzU4NCwgMHg1MkEwRTI4NiwgMHhCNzlDNTMwNSwgMHhBQTUwMDczNyxcblx0ICAgICAgICAgICAgMHgzRTA3ODQxQywgMHg3RkRFQUU1QywgMHg4RTdENDRFQywgMHg1NzE2RjJCOCxcblx0ICAgICAgICAgICAgMHhCMDNBREEzNywgMHhGMDUwMEMwRCwgMHhGMDFDMUYwNCwgMHgwMjAwQjNGRixcblx0ICAgICAgICAgICAgMHhBRTBDRjUxQSwgMHgzQ0I1NzRCMiwgMHgyNTgzN0E1OCwgMHhEQzA5MjFCRCxcblx0ICAgICAgICAgICAgMHhEMTkxMTNGOSwgMHg3Q0E5MkZGNiwgMHg5NDMyNDc3MywgMHgyMkY1NDcwMSxcblx0ICAgICAgICAgICAgMHgzQUU1RTU4MSwgMHgzN0MyREFEQywgMHhDOEI1NzYzNCwgMHg5QUYzRERBNyxcblx0ICAgICAgICAgICAgMHhBOTQ0NjE0NiwgMHgwRkQwMDMwRSwgMHhFQ0M4QzczRSwgMHhBNDc1MUU0MSxcblx0ICAgICAgICAgICAgMHhFMjM4Q0Q5OSwgMHgzQkVBMEUyRiwgMHgzMjgwQkJBMSwgMHgxODNFQjMzMSxcblx0ICAgICAgICAgICAgMHg0RTU0OEIzOCwgMHg0RjZEQjkwOCwgMHg2RjQyMEQwMywgMHhGNjBBMDRCRixcblx0ICAgICAgICAgICAgMHgyQ0I4MTI5MCwgMHgyNDk3N0M3OSwgMHg1Njc5QjA3MiwgMHhCQ0FGODlBRixcblx0ICAgICAgICAgICAgMHhERTlBNzcxRiwgMHhEOTkzMDgxMCwgMHhCMzhCQUUxMiwgMHhEQ0NGM0YyRSxcblx0ICAgICAgICAgICAgMHg1NTEyNzIxRiwgMHgyRTZCNzEyNCwgMHg1MDFBRERFNiwgMHg5Rjg0Q0Q4Nyxcblx0ICAgICAgICAgICAgMHg3QTU4NDcxOCwgMHg3NDA4REExNywgMHhCQzlGOUFCQywgMHhFOTRCN0Q4Qyxcblx0ICAgICAgICAgICAgMHhFQzdBRUMzQSwgMHhEQjg1MURGQSwgMHg2MzA5NDM2NiwgMHhDNDY0QzNEMixcblx0ICAgICAgICAgICAgMHhFRjFDMTg0NywgMHgzMjE1RDkwOCwgMHhERDQzM0IzNywgMHgyNEMyQkExNixcblx0ICAgICAgICAgICAgMHgxMkExNEQ0MywgMHgyQTY1QzQ1MSwgMHg1MDk0MDAwMiwgMHgxMzNBRTRERCxcblx0ICAgICAgICAgICAgMHg3MURGRjg5RSwgMHgxMDMxNEU1NSwgMHg4MUFDNzdENiwgMHg1RjExMTk5Qixcblx0ICAgICAgICAgICAgMHgwNDM1NTZGMSwgMHhEN0EzQzc2QiwgMHgzQzExMTgzQiwgMHg1OTI0QTUwOSxcblx0ICAgICAgICAgICAgMHhGMjhGRTZFRCwgMHg5N0YxRkJGQSwgMHg5RUJBQkYyQywgMHgxRTE1M0M2RSxcblx0ICAgICAgICAgICAgMHg4NkUzNDU3MCwgMHhFQUU5NkZCMSwgMHg4NjBFNUUwQSwgMHg1QTNFMkFCMyxcblx0ICAgICAgICAgICAgMHg3NzFGRTcxQywgMHg0RTNEMDZGQSwgMHgyOTY1RENCOSwgMHg5OUU3MUQwRixcblx0ICAgICAgICAgICAgMHg4MDNFODlENiwgMHg1MjY2QzgyNSwgMHgyRTRDQzk3OCwgMHg5QzEwQjM2QSxcblx0ICAgICAgICAgICAgMHhDNjE1MEVCQSwgMHg5NEUyRUE3OCwgMHhBNUZDM0M1MywgMHgxRTBBMkRGNCxcblx0ICAgICAgICAgICAgMHhGMkY3NEVBNywgMHgzNjFEMkIzRCwgMHgxOTM5MjYwRiwgMHgxOUMyNzk2MCxcblx0ICAgICAgICAgICAgMHg1MjIzQTcwOCwgMHhGNzEzMTJCNiwgMHhFQkFERkU2RSwgMHhFQUMzMUY2Nixcblx0ICAgICAgICAgICAgMHhFM0JDNDU5NSwgMHhBNjdCQzg4MywgMHhCMTdGMzdEMSwgMHgwMThDRkYyOCxcblx0ICAgICAgICAgICAgMHhDMzMyRERFRiwgMHhCRTZDNUFBNSwgMHg2NTU4MjE4NSwgMHg2OEFCOTgwMixcblx0ICAgICAgICAgICAgMHhFRUNFQTUwRiwgMHhEQjJGOTUzQiwgMHgyQUVGN0RBRCwgMHg1QjZFMkY4NCxcblx0ICAgICAgICAgICAgMHgxNTIxQjYyOCwgMHgyOTA3NjE3MCwgMHhFQ0RENDc3NSwgMHg2MTlGMTUxMCxcblx0ICAgICAgICAgICAgMHgxM0NDQTgzMCwgMHhFQjYxQkQ5NiwgMHgwMzM0RkUxRSwgMHhBQTAzNjNDRixcblx0ICAgICAgICAgICAgMHhCNTczNUM5MCwgMHg0QzcwQTIzOSwgMHhENTlFOUUwQiwgMHhDQkFBREUxNCxcblx0ICAgICAgICAgICAgMHhFRUNDODZCQywgMHg2MDYyMkNBNywgMHg5Q0FCNUNBQiwgMHhCMkYzODQ2RSxcblx0ICAgICAgICAgICAgMHg2NDhCMUVBRiwgMHgxOUJERjBDQSwgMHhBMDIzNjlCOSwgMHg2NTVBQkI1MCxcblx0ICAgICAgICAgICAgMHg0MDY4NUEzMiwgMHgzQzJBQjRCMywgMHgzMTlFRTlENSwgMHhDMDIxQjhGNyxcblx0ICAgICAgICAgICAgMHg5QjU0MEIxOSwgMHg4NzVGQTA5OSwgMHg5NUY3OTk3RSwgMHg2MjNEN0RBOCxcblx0ICAgICAgICAgICAgMHhGODM3ODg5QSwgMHg5N0UzMkQ3NywgMHgxMUVEOTM1RiwgMHgxNjY4MTI4MSxcblx0ICAgICAgICAgICAgMHgwRTM1ODgyOSwgMHhDN0U2MUZENiwgMHg5NkRFREZBMSwgMHg3ODU4QkE5OSxcblx0ICAgICAgICAgICAgMHg1N0Y1ODRBNSwgMHgxQjIyNzI2MywgMHg5QjgzQzNGRiwgMHgxQUMyNDY5Nixcblx0ICAgICAgICAgICAgMHhDREIzMEFFQiwgMHg1MzJFMzA1NCwgMHg4RkQ5NDhFNCwgMHg2REJDMzEyOCxcblx0ICAgICAgICAgICAgMHg1OEVCRjJFRiwgMHgzNEM2RkZFQSwgMHhGRTI4RUQ2MSwgMHhFRTdDM0M3Myxcblx0ICAgICAgICAgICAgMHg1RDRBMTREOSwgMHhFODY0QjdFMywgMHg0MjEwNUQxNCwgMHgyMDNFMTNFMCxcblx0ICAgICAgICAgICAgMHg0NUVFRTJCNiwgMHhBM0FBQUJFQSwgMHhEQjZDNEYxNSwgMHhGQUNCNEZEMCxcblx0ICAgICAgICAgICAgMHhDNzQyRjQ0MiwgMHhFRjZBQkJCNSwgMHg2NTRGM0IxRCwgMHg0MUNEMjEwNSxcblx0ICAgICAgICAgICAgMHhEODFFNzk5RSwgMHg4Njg1NERDNywgMHhFNDRCNDc2QSwgMHgzRDgxNjI1MCxcblx0ICAgICAgICAgICAgMHhDRjYyQTFGMiwgMHg1QjhEMjY0NiwgMHhGQzg4ODNBMCwgMHhDMUM3QjZBMyxcblx0ICAgICAgICAgICAgMHg3RjE1MjRDMywgMHg2OUNCNzQ5MiwgMHg0Nzg0OEEwQiwgMHg1NjkyQjI4NSxcblx0ICAgICAgICAgICAgMHgwOTVCQkYwMCwgMHhBRDE5NDg5RCwgMHgxNDYyQjE3NCwgMHgyMzgyMEUwMCxcblx0ICAgICAgICAgICAgMHg1ODQyOEQyQSwgMHgwQzU1RjVFQSwgMHgxREFERjQzRSwgMHgyMzNGNzA2MSxcblx0ICAgICAgICAgICAgMHgzMzcyRjA5MiwgMHg4RDkzN0U0MSwgMHhENjVGRUNGMSwgMHg2QzIyM0JEQixcblx0ICAgICAgICAgICAgMHg3Q0RFMzc1OSwgMHhDQkVFNzQ2MCwgMHg0MDg1RjJBNywgMHhDRTc3MzI2RSxcblx0ICAgICAgICAgICAgMHhBNjA3ODA4NCwgMHgxOUY4NTA5RSwgMHhFOEVGRDg1NSwgMHg2MUQ5OTczNSxcblx0ICAgICAgICAgICAgMHhBOTY5QTdBQSwgMHhDNTBDMDZDMiwgMHg1QTA0QUJGQywgMHg4MDBCQ0FEQyxcblx0ICAgICAgICAgICAgMHg5RTQ0N0EyRSwgMHhDMzQ1MzQ4NCwgMHhGREQ1NjcwNSwgMHgwRTFFOUVDOSxcblx0ICAgICAgICAgICAgMHhEQjczREJEMywgMHgxMDU1ODhDRCwgMHg2NzVGREE3OSwgMHhFMzY3NDM0MCxcblx0ICAgICAgICAgICAgMHhDNUM0MzQ2NSwgMHg3MTNFMzhEOCwgMHgzRDI4Rjg5RSwgMHhGMTZERkYyMCxcblx0ICAgICAgICAgICAgMHgxNTNFMjFFNywgMHg4RkIwM0Q0QSwgMHhFNkUzOUYyQiwgMHhEQjgzQURGNyAgIF0sXG5cdCAgICAgICAgWyAgIDB4RTkzRDVBNjgsIDB4OTQ4MTQwRjcsIDB4RjY0QzI2MUMsIDB4OTQ2OTI5MzQsXG5cdCAgICAgICAgICAgIDB4NDExNTIwRjcsIDB4NzYwMkQ0RjcsIDB4QkNGNDZCMkUsIDB4RDRBMjAwNjgsXG5cdCAgICAgICAgICAgIDB4RDQwODI0NzEsIDB4MzMyMEY0NkEsIDB4NDNCN0Q0QjcsIDB4NTAwMDYxQUYsXG5cdCAgICAgICAgICAgIDB4MUUzOUY2MkUsIDB4OTcyNDQ1NDYsIDB4MTQyMTRGNzQsIDB4QkY4Qjg4NDAsXG5cdCAgICAgICAgICAgIDB4NEQ5NUZDMUQsIDB4OTZCNTkxQUYsIDB4NzBGNERERDMsIDB4NjZBMDJGNDUsXG5cdCAgICAgICAgICAgIDB4QkZCQzA5RUMsIDB4MDNCRDk3ODUsIDB4N0ZBQzZERDAsIDB4MzFDQjg1MDQsXG5cdCAgICAgICAgICAgIDB4OTZFQjI3QjMsIDB4NTVGRDM5NDEsIDB4REEyNTQ3RTYsIDB4QUJDQTBBOUEsXG5cdCAgICAgICAgICAgIDB4Mjg1MDc4MjUsIDB4NTMwNDI5RjQsIDB4MEEyQzg2REEsIDB4RTlCNjZERkIsXG5cdCAgICAgICAgICAgIDB4NjhEQzE0NjIsIDB4RDc0ODY5MDAsIDB4NjgwRUMwQTQsIDB4MjdBMThERUUsXG5cdCAgICAgICAgICAgIDB4NEYzRkZFQTIsIDB4RTg4N0FEOEMsIDB4QjU4Q0UwMDYsIDB4N0FGNEQ2QjYsXG5cdCAgICAgICAgICAgIDB4QUFDRTFFN0MsIDB4RDMzNzVGRUMsIDB4Q0U3OEEzOTksIDB4NDA2QjJBNDIsXG5cdCAgICAgICAgICAgIDB4MjBGRTlFMzUsIDB4RDlGMzg1QjksIDB4RUUzOUQ3QUIsIDB4M0IxMjRFOEIsXG5cdCAgICAgICAgICAgIDB4MURDOUZBRjcsIDB4NEI2RDE4NTYsIDB4MjZBMzY2MzEsIDB4RUFFMzk3QjIsXG5cdCAgICAgICAgICAgIDB4M0E2RUZBNzQsIDB4REQ1QjQzMzIsIDB4Njg0MUU3RjcsIDB4Q0E3ODIwRkIsXG5cdCAgICAgICAgICAgIDB4RkIwQUY1NEUsIDB4RDhGRUIzOTcsIDB4NDU0MDU2QUMsIDB4QkE0ODk1MjcsXG5cdCAgICAgICAgICAgIDB4NTU1MzNBM0EsIDB4MjA4MzhEODcsIDB4RkU2QkE5QjcsIDB4RDA5Njk1NEIsXG5cdCAgICAgICAgICAgIDB4NTVBODY3QkMsIDB4QTExNTlBNTgsIDB4Q0NBOTI5NjMsIDB4OTlFMURCMzMsXG5cdCAgICAgICAgICAgIDB4QTYyQTRBNTYsIDB4M0YzMTI1RjksIDB4NUVGNDdFMUMsIDB4OTAyOTMxN0MsXG5cdCAgICAgICAgICAgIDB4RkRGOEU4MDIsIDB4MDQyNzJGNzAsIDB4ODBCQjE1NUMsIDB4MDUyODJDRTMsXG5cdCAgICAgICAgICAgIDB4OTVDMTE1NDgsIDB4RTRDNjZEMjIsIDB4NDhDMTEzM0YsIDB4QzcwRjg2REMsXG5cdCAgICAgICAgICAgIDB4MDdGOUM5RUUsIDB4NDEwNDFGMEYsIDB4NDA0Nzc5QTQsIDB4NUQ4ODZFMTcsXG5cdCAgICAgICAgICAgIDB4MzI1RjUxRUIsIDB4RDU5QkMwRDEsIDB4RjJCQ0MxOEYsIDB4NDExMTM1NjQsXG5cdCAgICAgICAgICAgIDB4MjU3Qjc4MzQsIDB4NjAyQTlDNjAsIDB4REZGOEU4QTMsIDB4MUY2MzZDMUIsXG5cdCAgICAgICAgICAgIDB4MEUxMkI0QzIsIDB4MDJFMTMyOUUsIDB4QUY2NjRGRDEsIDB4Q0FEMTgxMTUsXG5cdCAgICAgICAgICAgIDB4NkIyMzk1RTAsIDB4MzMzRTkyRTEsIDB4M0IyNDBCNjIsIDB4RUVCRUI5MjIsXG5cdCAgICAgICAgICAgIDB4ODVCMkEyMEUsIDB4RTZCQTBEOTksIDB4REU3MjBDOEMsIDB4MkRBMkY3MjgsXG5cdCAgICAgICAgICAgIDB4RDAxMjc4NDUsIDB4OTVCNzk0RkQsIDB4NjQ3RDA4NjIsIDB4RTdDQ0Y1RjAsXG5cdCAgICAgICAgICAgIDB4NTQ0OUEzNkYsIDB4ODc3RDQ4RkEsIDB4QzM5REZEMjcsIDB4RjMzRThEMUUsXG5cdCAgICAgICAgICAgIDB4MEE0NzYzNDEsIDB4OTkyRUZGNzQsIDB4M0E2RjZFQUIsIDB4RjRGOEZEMzcsXG5cdCAgICAgICAgICAgIDB4QTgxMkRDNjAsIDB4QTFFQkRERjgsIDB4OTkxQkUxNEMsIDB4REI2RTZCMEQsXG5cdCAgICAgICAgICAgIDB4QzY3QjU1MTAsIDB4NkQ2NzJDMzcsIDB4Mjc2NUQ0M0IsIDB4RENEMEU4MDQsXG5cdCAgICAgICAgICAgIDB4RjEyOTBEQzcsIDB4Q0MwMEZGQTMsIDB4QjUzOTBGOTIsIDB4NjkwRkVEMEIsXG5cdCAgICAgICAgICAgIDB4NjY3QjlGRkIsIDB4Q0VEQjdEOUMsIDB4QTA5MUNGMEIsIDB4RDkxNTVFQTMsXG5cdCAgICAgICAgICAgIDB4QkIxMzJGODgsIDB4NTE1QkFEMjQsIDB4N0I5NDc5QkYsIDB4NzYzQkQ2RUIsXG5cdCAgICAgICAgICAgIDB4MzczOTJFQjMsIDB4Q0MxMTU5NzksIDB4ODAyNkUyOTcsIDB4RjQyRTMxMkQsXG5cdCAgICAgICAgICAgIDB4Njg0MkFEQTcsIDB4QzY2QTJCM0IsIDB4MTI3NTRDQ0MsIDB4NzgyRUYxMUMsXG5cdCAgICAgICAgICAgIDB4NkExMjQyMzcsIDB4Qjc5MjUxRTcsIDB4MDZBMUJCRTYsIDB4NEJGQjYzNTAsXG5cdCAgICAgICAgICAgIDB4MUE2QjEwMTgsIDB4MTFDQUVERkEsIDB4M0QyNUJERDgsIDB4RTJFMUMzQzksXG5cdCAgICAgICAgICAgIDB4NDQ0MjE2NTksIDB4MEExMjEzODYsIDB4RDkwQ0VDNkUsIDB4RDVBQkVBMkEsXG5cdCAgICAgICAgICAgIDB4NjRBRjY3NEUsIDB4REE4NkE4NUYsIDB4QkVCRkU5ODgsIDB4NjRFNEMzRkUsXG5cdCAgICAgICAgICAgIDB4OURCQzgwNTcsIDB4RjBGN0MwODYsIDB4NjA3ODdCRjgsIDB4NjAwMzYwNEQsXG5cdCAgICAgICAgICAgIDB4RDFGRDgzNDYsIDB4RjYzODFGQjAsIDB4Nzc0NUFFMDQsIDB4RDczNkZDQ0MsXG5cdCAgICAgICAgICAgIDB4ODM0MjZCMzMsIDB4RjAxRUFCNzEsIDB4QjA4MDQxODcsIDB4M0MwMDVFNUYsXG5cdCAgICAgICAgICAgIDB4NzdBMDU3QkUsIDB4QkRFOEFFMjQsIDB4NTU0NjQyOTksIDB4QkY1ODJFNjEsXG5cdCAgICAgICAgICAgIDB4NEU1OEY0OEYsIDB4RjJEREZEQTIsIDB4RjQ3NEVGMzgsIDB4ODc4OUJEQzIsXG5cdCAgICAgICAgICAgIDB4NTM2NkY5QzMsIDB4QzhCMzhFNzQsIDB4QjQ3NUYyNTUsIDB4NDZGQ0Q5QjksXG5cdCAgICAgICAgICAgIDB4N0FFQjI2NjEsIDB4OEIxRERGODQsIDB4ODQ2QTBFNzksIDB4OTE1Rjk1RTIsXG5cdCAgICAgICAgICAgIDB4NDY2RTU5OEUsIDB4MjBCNDU3NzAsIDB4OENENTU1OTEsIDB4QzkwMkRFNEMsXG5cdCAgICAgICAgICAgIDB4QjkwQkFDRTEsIDB4QkI4MjA1RDAsIDB4MTFBODYyNDgsIDB4NzU3NEE5OUUsXG5cdCAgICAgICAgICAgIDB4Qjc3RjE5QjYsIDB4RTBBOURDMDksIDB4NjYyRDA5QTEsIDB4QzQzMjQ2MzMsXG5cdCAgICAgICAgICAgIDB4RTg1QTFGMDIsIDB4MDlGMEJFOEMsIDB4NEE5OUEwMjUsIDB4MUQ2RUZFMTAsXG5cdCAgICAgICAgICAgIDB4MUFCOTNEMUQsIDB4MEJBNUE0REYsIDB4QTE4NkYyMEYsIDB4Mjg2OEYxNjksXG5cdCAgICAgICAgICAgIDB4RENCN0RBODMsIDB4NTczOTA2RkUsIDB4QTFFMkNFOUIsIDB4NEZDRDdGNTIsXG5cdCAgICAgICAgICAgIDB4NTAxMTVFMDEsIDB4QTcwNjgzRkEsIDB4QTAwMkI1QzQsIDB4MERFNkQwMjcsXG5cdCAgICAgICAgICAgIDB4OUFGODhDMjcsIDB4NzczRjg2NDEsIDB4QzM2MDRDMDYsIDB4NjFBODA2QjUsXG5cdCAgICAgICAgICAgIDB4RjAxNzdBMjgsIDB4QzBGNTg2RTAsIDB4MDA2MDU4QUEsIDB4MzBEQzdENjIsXG5cdCAgICAgICAgICAgIDB4MTFFNjlFRDcsIDB4MjMzOEVBNjMsIDB4NTNDMkREOTQsIDB4QzJDMjE2MzQsXG5cdCAgICAgICAgICAgIDB4QkJDQkVFNTYsIDB4OTBCQ0I2REUsIDB4RUJGQzdEQTEsIDB4Q0U1OTFENzYsXG5cdCAgICAgICAgICAgIDB4NkYwNUU0MDksIDB4NEI3QzAxODgsIDB4Mzk3MjBBM0QsIDB4N0M5MjdDMjQsXG5cdCAgICAgICAgICAgIDB4ODZFMzcyNUYsIDB4NzI0RDlEQjksIDB4MUFDMTVCQjQsIDB4RDM5RUI4RkMsXG5cdCAgICAgICAgICAgIDB4RUQ1NDU1NzgsIDB4MDhGQ0E1QjUsIDB4RDgzRDdDRDMsIDB4NERBRDBGQzQsXG5cdCAgICAgICAgICAgIDB4MUU1MEVGNUUsIDB4QjE2MUU2RjgsIDB4QTI4NTE0RDksIDB4NkM1MTEzM0MsXG5cdCAgICAgICAgICAgIDB4NkZENUM3RTcsIDB4NTZFMTRFQzQsIDB4MzYyQUJGQ0UsIDB4RERDNkM4MzcsXG5cdCAgICAgICAgICAgIDB4RDc5QTMyMzQsIDB4OTI2MzgyMTIsIDB4NjcwRUZBOEUsIDB4NDA2MDAwRTAgIF0sXG5cdCAgICAgICAgWyAgIDB4M0EzOUNFMzcsIDB4RDNGQUY1Q0YsIDB4QUJDMjc3MzcsIDB4NUFDNTJEMUIsXG5cdCAgICAgICAgICAgIDB4NUNCMDY3OUUsIDB4NEZBMzM3NDIsIDB4RDM4MjI3NDAsIDB4OTlCQzlCQkUsXG5cdCAgICAgICAgICAgIDB4RDUxMThFOUQsIDB4QkYwRjczMTUsIDB4RDYyRDFDN0UsIDB4QzcwMEM0N0IsXG5cdCAgICAgICAgICAgIDB4Qjc4QzFCNkIsIDB4MjFBMTkwNDUsIDB4QjI2RUIxQkUsIDB4NkEzNjZFQjQsXG5cdCAgICAgICAgICAgIDB4NTc0OEFCMkYsIDB4QkM5NDZFNzksIDB4QzZBMzc2RDIsIDB4NjU0OUMyQzgsXG5cdCAgICAgICAgICAgIDB4NTMwRkY4RUUsIDB4NDY4RERFN0QsIDB4RDU3MzBBMUQsIDB4NENEMDREQzYsXG5cdCAgICAgICAgICAgIDB4MjkzOUJCREIsIDB4QTlCQTQ2NTAsIDB4QUM5NTI2RTgsIDB4QkU1RUUzMDQsXG5cdCAgICAgICAgICAgIDB4QTFGQUQ1RjAsIDB4NkEyRDUxOUEsIDB4NjNFRjhDRTIsIDB4OUE4NkVFMjIsXG5cdCAgICAgICAgICAgIDB4QzA4OUMyQjgsIDB4NDMyNDJFRjYsIDB4QTUxRTAzQUEsIDB4OUNGMkQwQTQsXG5cdCAgICAgICAgICAgIDB4ODNDMDYxQkEsIDB4OUJFOTZBNEQsIDB4OEZFNTE1NTAsIDB4QkE2NDVCRDYsXG5cdCAgICAgICAgICAgIDB4MjgyNkEyRjksIDB4QTczQTNBRTEsIDB4NEJBOTk1ODYsIDB4RUY1NTYyRTksXG5cdCAgICAgICAgICAgIDB4QzcyRkVGRDMsIDB4Rjc1MkY3REEsIDB4M0YwNDZGNjksIDB4NzdGQTBBNTksXG5cdCAgICAgICAgICAgIDB4ODBFNEE5MTUsIDB4ODdCMDg2MDEsIDB4OUIwOUU2QUQsIDB4M0IzRUU1OTMsXG5cdCAgICAgICAgICAgIDB4RTk5MEZENUEsIDB4OUUzNEQ3OTcsIDB4MkNGMEI3RDksIDB4MDIyQjhCNTEsXG5cdCAgICAgICAgICAgIDB4OTZENUFDM0EsIDB4MDE3REE2N0QsIDB4RDFDRjNFRDYsIDB4N0M3RDJEMjgsXG5cdCAgICAgICAgICAgIDB4MUY5RjI1Q0YsIDB4QURGMkI4OUIsIDB4NUFENkI0NzIsIDB4NUE4OEY1NEMsXG5cdCAgICAgICAgICAgIDB4RTAyOUFDNzEsIDB4RTAxOUE1RTYsIDB4NDdCMEFDRkQsIDB4RUQ5M0ZBOUIsXG5cdCAgICAgICAgICAgIDB4RThEM0M0OEQsIDB4MjgzQjU3Q0MsIDB4RjhENTY2MjksIDB4NzkxMzJFMjgsXG5cdCAgICAgICAgICAgIDB4Nzg1RjAxOTEsIDB4RUQ3NTYwNTUsIDB4Rjc5NjBFNDQsIDB4RTNEMzVFOEMsXG5cdCAgICAgICAgICAgIDB4MTUwNTZERDQsIDB4ODhGNDZEQkEsIDB4MDNBMTYxMjUsIDB4MDU2NEYwQkQsXG5cdCAgICAgICAgICAgIDB4QzNFQjlFMTUsIDB4M0M5MDU3QTIsIDB4OTcyNzFBRUMsIDB4QTkzQTA3MkEsXG5cdCAgICAgICAgICAgIDB4MUIzRjZEOUIsIDB4MUU2MzIxRjUsIDB4RjU5QzY2RkIsIDB4MjZEQ0YzMTksXG5cdCAgICAgICAgICAgIDB4NzUzM0Q5MjgsIDB4QjE1NUZERjUsIDB4MDM1NjM0ODIsIDB4OEFCQTNDQkIsXG5cdCAgICAgICAgICAgIDB4Mjg1MTc3MTEsIDB4QzIwQUQ5RjgsIDB4QUJDQzUxNjcsIDB4Q0NBRDkyNUYsXG5cdCAgICAgICAgICAgIDB4NERFODE3NTEsIDB4MzgzMERDOEUsIDB4Mzc5RDU4NjIsIDB4OTMyMEY5OTEsXG5cdCAgICAgICAgICAgIDB4RUE3QTkwQzIsIDB4RkIzRTdCQ0UsIDB4NTEyMUNFNjQsIDB4Nzc0RkJFMzIsXG5cdCAgICAgICAgICAgIDB4QThCNkUzN0UsIDB4QzMyOTNENDYsIDB4NDhERTUzNjksIDB4NjQxM0U2ODAsXG5cdCAgICAgICAgICAgIDB4QTJBRTA4MTAsIDB4REQ2REIyMjQsIDB4Njk4NTJERkQsIDB4MDkwNzIxNjYsXG5cdCAgICAgICAgICAgIDB4QjM5QTQ2MEEsIDB4NjQ0NUMwREQsIDB4NTg2Q0RFQ0YsIDB4MUMyMEM4QUUsXG5cdCAgICAgICAgICAgIDB4NUJCRUY3REQsIDB4MUI1ODhENDAsIDB4Q0NEMjAxN0YsIDB4NkJCNEUzQkIsXG5cdCAgICAgICAgICAgIDB4RERBMjZBN0UsIDB4M0E1OUZGNDUsIDB4M0UzNTBBNDQsIDB4QkNCNENERDUsXG5cdCAgICAgICAgICAgIDB4NzJFQUNFQTgsIDB4RkE2NDg0QkIsIDB4OEQ2NjEyQUUsIDB4QkYzQzZGNDcsXG5cdCAgICAgICAgICAgIDB4RDI5QkU0NjMsIDB4NTQyRjVEOUUsIDB4QUVDMjc3MUIsIDB4RjY0RTYzNzAsXG5cdCAgICAgICAgICAgIDB4NzQwRTBEOEQsIDB4RTc1QjEzNTcsIDB4Rjg3MjE2NzEsIDB4QUY1MzdENUQsXG5cdCAgICAgICAgICAgIDB4NDA0MENCMDgsIDB4NEVCNEUyQ0MsIDB4MzREMjQ2NkEsIDB4MDExNUFGODQsXG5cdCAgICAgICAgICAgIDB4RTFCMDA0MjgsIDB4OTU5ODNBMUQsIDB4MDZCODlGQjQsIDB4Q0U2RUEwNDgsXG5cdCAgICAgICAgICAgIDB4NkYzRjNCODIsIDB4MzUyMEFCODIsIDB4MDExQTFENEIsIDB4Mjc3MjI3RjgsXG5cdCAgICAgICAgICAgIDB4NjExNTYwQjEsIDB4RTc5MzNGREMsIDB4QkIzQTc5MkIsIDB4MzQ0NTI1QkQsXG5cdCAgICAgICAgICAgIDB4QTA4ODM5RTEsIDB4NTFDRTc5NEIsIDB4MkYzMkM5QjcsIDB4QTAxRkJBQzksXG5cdCAgICAgICAgICAgIDB4RTAxQ0M4N0UsIDB4QkNDN0QxRjYsIDB4Q0YwMTExQzMsIDB4QTFFOEFBQzcsXG5cdCAgICAgICAgICAgIDB4MUE5MDg3NDksIDB4RDQ0RkJEOUEsIDB4RDBEQURFQ0IsIDB4RDUwQURBMzgsXG5cdCAgICAgICAgICAgIDB4MDMzOUMzMkEsIDB4QzY5MTM2NjcsIDB4OERGOTMxN0MsIDB4RTBCMTJCNEYsXG5cdCAgICAgICAgICAgIDB4Rjc5RTU5QjcsIDB4NDNGNUJCM0EsIDB4RjJENTE5RkYsIDB4MjdEOTQ1OUMsXG5cdCAgICAgICAgICAgIDB4QkY5NzIyMkMsIDB4MTVFNkZDMkEsIDB4MEY5MUZDNzEsIDB4OUI5NDE1MjUsXG5cdCAgICAgICAgICAgIDB4RkFFNTkzNjEsIDB4Q0VCNjlDRUIsIDB4QzJBODY0NTksIDB4MTJCQUE4RDEsXG5cdCAgICAgICAgICAgIDB4QjZDMTA3NUUsIDB4RTMwNTZBMEMsIDB4MTBEMjUwNjUsIDB4Q0IwM0E0NDIsXG5cdCAgICAgICAgICAgIDB4RTBFQzZFMEUsIDB4MTY5OERCM0IsIDB4NEM5OEEwQkUsIDB4MzI3OEU5NjQsXG5cdCAgICAgICAgICAgIDB4OUYxRjk1MzIsIDB4RTBEMzkyREYsIDB4RDNBMDM0MkIsIDB4ODk3MUYyMUUsXG5cdCAgICAgICAgICAgIDB4MUIwQTc0NDEsIDB4NEJBMzM0OEMsIDB4QzVCRTcxMjAsIDB4QzM3NjMyRDgsXG5cdCAgICAgICAgICAgIDB4REYzNTlGOEQsIDB4OUI5OTJGMkUsIDB4RTYwQjZGNDcsIDB4MEZFM0YxMUQsXG5cdCAgICAgICAgICAgIDB4RTU0Q0RBNTQsIDB4MUVEQUQ4OTEsIDB4Q0U2Mjc5Q0YsIDB4Q0QzRTdFNkYsXG5cdCAgICAgICAgICAgIDB4MTYxOEIxNjYsIDB4RkQyQzFEMDUsIDB4ODQ4RkQyQzUsIDB4RjZGQjIyOTksXG5cdCAgICAgICAgICAgIDB4RjUyM0YzNTcsIDB4QTYzMjc2MjMsIDB4OTNBODM1MzEsIDB4NTZDQ0NEMDIsXG5cdCAgICAgICAgICAgIDB4QUNGMDgxNjIsIDB4NUE3NUVCQjUsIDB4NkUxNjM2OTcsIDB4ODhEMjczQ0MsXG5cdCAgICAgICAgICAgIDB4REU5NjYyOTIsIDB4ODFCOTQ5RDAsIDB4NEM1MDkwMUIsIDB4NzFDNjU2MTQsXG5cdCAgICAgICAgICAgIDB4RTZDNkM3QkQsIDB4MzI3QTE0MEEsIDB4NDVFMUQwMDYsIDB4QzNGMjdCOUEsXG5cdCAgICAgICAgICAgIDB4QzlBQTUzRkQsIDB4NjJBODBGMDAsIDB4QkIyNUJGRTIsIDB4MzVCREQyRjYsXG5cdCAgICAgICAgICAgIDB4NzExMjY5MDUsIDB4QjIwNDAyMjIsIDB4QjZDQkNGN0MsIDB4Q0Q3NjlDMkIsXG5cdCAgICAgICAgICAgIDB4NTMxMTNFQzAsIDB4MTY0MEUzRDMsIDB4MzhBQkJENjAsIDB4MjU0N0FERjAsXG5cdCAgICAgICAgICAgIDB4QkEzODIwOUMsIDB4Rjc0NkNFNzYsIDB4NzdBRkExQzUsIDB4MjA3NTYwNjAsXG5cdCAgICAgICAgICAgIDB4ODVDQkZFNEUsIDB4OEFFODhERDgsIDB4N0FBQUY5QjAsIDB4NENGOUFBN0UsXG5cdCAgICAgICAgICAgIDB4MTk0OEMyNUMsIDB4MDJGQjhBOEMsIDB4MDFDMzZBRTQsIDB4RDZFQkUxRjksXG5cdCAgICAgICAgICAgIDB4OTBENEY4NjksIDB4QTY1Q0RFQTAsIDB4M0YwOTI1MkQsIDB4QzIwOEU2OUYsXG5cdCAgICAgICAgICAgIDB4Qjc0RTYxMzIsIDB4Q0U3N0UyNUIsIDB4NTc4RkRGRTMsIDB4M0FDMzcyRTYgIF1cblx0ICAgIF07XG5cblx0ICAgIHZhciBCTE9XRklTSF9DVFggPSB7XG5cdCAgICAgICAgcGJveDogW10sXG5cdCAgICAgICAgc2JveDogW11cblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gRihjdHgsIHgpe1xuXHQgICAgICAgIGxldCBhID0gKHggPj4gMjQpICYgMHhGRjtcblx0ICAgICAgICBsZXQgYiA9ICh4ID4+IDE2KSAmIDB4RkY7XG5cdCAgICAgICAgbGV0IGMgPSAoeCA+PiA4KSAmIDB4RkY7XG5cdCAgICAgICAgbGV0IGQgPSB4ICYgMHhGRjtcblxuXHQgICAgICAgIGxldCB5ID0gY3R4LnNib3hbMF1bYV0gKyBjdHguc2JveFsxXVtiXTtcblx0ICAgICAgICB5ID0geSBeIGN0eC5zYm94WzJdW2NdO1xuXHQgICAgICAgIHkgPSB5ICsgY3R4LnNib3hbM11bZF07XG5cblx0ICAgICAgICByZXR1cm4geTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gQmxvd0Zpc2hfRW5jcnlwdChjdHgsIGxlZnQsIHJpZ2h0KXtcblx0ICAgICAgICBsZXQgWGwgPSBsZWZ0O1xuXHQgICAgICAgIGxldCBYciA9IHJpZ2h0O1xuXHQgICAgICAgIGxldCB0ZW1wO1xuXG5cdCAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IE47ICsraSl7XG5cdCAgICAgICAgICAgIFhsID0gWGwgXiBjdHgucGJveFtpXTtcblx0ICAgICAgICAgICAgWHIgPSBGKGN0eCwgWGwpIF4gWHI7XG5cblx0ICAgICAgICAgICAgdGVtcCA9IFhsO1xuXHQgICAgICAgICAgICBYbCA9IFhyO1xuXHQgICAgICAgICAgICBYciA9IHRlbXA7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdGVtcCA9IFhsO1xuXHQgICAgICAgIFhsID0gWHI7XG5cdCAgICAgICAgWHIgPSB0ZW1wO1xuXG5cdCAgICAgICAgWHIgPSBYciBeIGN0eC5wYm94W05dO1xuXHQgICAgICAgIFhsID0gWGwgXiBjdHgucGJveFtOICsgMV07XG5cblx0ICAgICAgICByZXR1cm4ge2xlZnQ6IFhsLCByaWdodDogWHJ9O1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBCbG93RmlzaF9EZWNyeXB0KGN0eCwgbGVmdCwgcmlnaHQpe1xuXHQgICAgICAgIGxldCBYbCA9IGxlZnQ7XG5cdCAgICAgICAgbGV0IFhyID0gcmlnaHQ7XG5cdCAgICAgICAgbGV0IHRlbXA7XG5cblx0ICAgICAgICBmb3IobGV0IGkgPSBOICsgMTsgaSA+IDE7IC0taSl7XG5cdCAgICAgICAgICAgIFhsID0gWGwgXiBjdHgucGJveFtpXTtcblx0ICAgICAgICAgICAgWHIgPSBGKGN0eCwgWGwpIF4gWHI7XG5cblx0ICAgICAgICAgICAgdGVtcCA9IFhsO1xuXHQgICAgICAgICAgICBYbCA9IFhyO1xuXHQgICAgICAgICAgICBYciA9IHRlbXA7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdGVtcCA9IFhsO1xuXHQgICAgICAgIFhsID0gWHI7XG5cdCAgICAgICAgWHIgPSB0ZW1wO1xuXG5cdCAgICAgICAgWHIgPSBYciBeIGN0eC5wYm94WzFdO1xuXHQgICAgICAgIFhsID0gWGwgXiBjdHgucGJveFswXTtcblxuXHQgICAgICAgIHJldHVybiB7bGVmdDogWGwsIHJpZ2h0OiBYcn07XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogSW5pdGlhbGl6YXRpb24gY3R4J3MgcGJveCBhbmQgc2JveC5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge09iamVjdH0gY3R4IFRoZSBvYmplY3QgaGFzIHBib3ggYW5kIHNib3guXG5cdCAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXkgQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHBhcmFtIHtpbnR9IGtleXNpemUgVGhlIGxlbmd0aCBvZiB0aGUga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIEJsb3dGaXNoSW5pdChCTE9XRklTSF9DVFgsIGtleSwgMTI4LzMyKTtcblx0ICAgICAqL1xuXHQgICAgZnVuY3Rpb24gQmxvd0Zpc2hJbml0KGN0eCwga2V5LCBrZXlzaXplKVxuXHQgICAge1xuXHQgICAgICAgIGZvcihsZXQgUm93ID0gMDsgUm93IDwgNDsgUm93KyspXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICBjdHguc2JveFtSb3ddID0gW107XG5cdCAgICAgICAgICAgIGZvcihsZXQgQ29sID0gMDsgQ29sIDwgMjU2OyBDb2wrKylcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAgY3R4LnNib3hbUm93XVtDb2xdID0gT1JJR19TW1Jvd11bQ29sXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGxldCBrZXlJbmRleCA9IDA7XG5cdCAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTiArIDI7IGluZGV4KyspXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICBjdHgucGJveFtpbmRleF0gPSBPUklHX1BbaW5kZXhdIF4ga2V5W2tleUluZGV4XTtcblx0ICAgICAgICAgICAga2V5SW5kZXgrKztcblx0ICAgICAgICAgICAgaWYoa2V5SW5kZXggPj0ga2V5c2l6ZSlcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAga2V5SW5kZXggPSAwO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgbGV0IERhdGExID0gMDtcblx0ICAgICAgICBsZXQgRGF0YTIgPSAwO1xuXHQgICAgICAgIGxldCByZXMgPSAwO1xuXHQgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBOICsgMjsgaSArPSAyKVxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgcmVzID0gQmxvd0Zpc2hfRW5jcnlwdChjdHgsIERhdGExLCBEYXRhMik7XG5cdCAgICAgICAgICAgIERhdGExID0gcmVzLmxlZnQ7XG5cdCAgICAgICAgICAgIERhdGEyID0gcmVzLnJpZ2h0O1xuXHQgICAgICAgICAgICBjdHgucGJveFtpXSA9IERhdGExO1xuXHQgICAgICAgICAgICBjdHgucGJveFtpICsgMV0gPSBEYXRhMjtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDI1NjsgaiArPSAyKVxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICByZXMgPSBCbG93RmlzaF9FbmNyeXB0KGN0eCwgRGF0YTEsIERhdGEyKTtcblx0ICAgICAgICAgICAgICAgIERhdGExID0gcmVzLmxlZnQ7XG5cdCAgICAgICAgICAgICAgICBEYXRhMiA9IHJlcy5yaWdodDtcblx0ICAgICAgICAgICAgICAgIGN0eC5zYm94W2ldW2pdID0gRGF0YTE7XG5cdCAgICAgICAgICAgICAgICBjdHguc2JveFtpXVtqICsgMV0gPSBEYXRhMjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIEJsb3dmaXNoIGJsb2NrIGNpcGhlciBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBCbG93ZmlzaCA9IENfYWxnby5CbG93ZmlzaCA9IEJsb2NrQ2lwaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2tpcCByZXNldCBvZiBuUm91bmRzIGhhcyBiZWVuIHNldCBiZWZvcmUgYW5kIGtleSBkaWQgbm90IGNoYW5nZVxuXHQgICAgICAgICAgICBpZiAodGhpcy5fa2V5UHJpb3JSZXNldCA9PT0gdGhpcy5fa2V5KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm47XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2tleVByaW9yUmVzZXQgPSB0aGlzLl9rZXk7XG5cdCAgICAgICAgICAgIHZhciBrZXlXb3JkcyA9IGtleS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGtleVNpemUgPSBrZXkuc2lnQnl0ZXMgLyA0O1xuXG5cdCAgICAgICAgICAgIC8vSW5pdGlhbGl6YXRpb24gcGJveCBhbmQgc2JveFxuXHQgICAgICAgICAgICBCbG93RmlzaEluaXQoQkxPV0ZJU0hfQ1RYLCBrZXlXb3Jkcywga2V5U2l6ZSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGVuY3J5cHRCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICB2YXIgcmVzID0gQmxvd0Zpc2hfRW5jcnlwdChCTE9XRklTSF9DVFgsIE1bb2Zmc2V0XSwgTVtvZmZzZXQgKyAxXSk7XG5cdCAgICAgICAgICAgIE1bb2Zmc2V0XSA9IHJlcy5sZWZ0O1xuXHQgICAgICAgICAgICBNW29mZnNldCArIDFdID0gcmVzLnJpZ2h0O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBkZWNyeXB0QmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgdmFyIHJlcyA9IEJsb3dGaXNoX0RlY3J5cHQoQkxPV0ZJU0hfQ1RYLCBNW29mZnNldF0sIE1bb2Zmc2V0ICsgMV0pO1xuXHQgICAgICAgICAgICBNW29mZnNldF0gPSByZXMubGVmdDtcblx0ICAgICAgICAgICAgTVtvZmZzZXQgKyAxXSA9IHJlcy5yaWdodDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiA2NC8zMixcblxuXHQgICAgICAgIGtleVNpemU6IDEyOC8zMixcblxuXHQgICAgICAgIGl2U2l6ZTogNjQvMzJcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9ucyB0byB0aGUgY2lwaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgY2lwaGVydGV4dCA9IENyeXB0b0pTLkJsb3dmaXNoLmVuY3J5cHQobWVzc2FnZSwga2V5LCBjZmcpO1xuXHQgICAgICogICAgIHZhciBwbGFpbnRleHQgID0gQ3J5cHRvSlMuQmxvd2Zpc2guZGVjcnlwdChjaXBoZXJ0ZXh0LCBrZXksIGNmZyk7XG5cdCAgICAgKi9cblx0ICAgIEMuQmxvd2Zpc2ggPSBCbG9ja0NpcGhlci5fY3JlYXRlSGVscGVyKEJsb3dmaXNoKTtcblx0fSgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5CbG93ZmlzaDtcblxufSkpOyIsICI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4veDY0LWNvcmVcIiksIHJlcXVpcmUoXCIuL2xpYi10eXBlZGFycmF5c1wiKSwgcmVxdWlyZShcIi4vZW5jLXV0ZjE2XCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0XCIpLCByZXF1aXJlKFwiLi9lbmMtYmFzZTY0dXJsXCIpLCByZXF1aXJlKFwiLi9tZDVcIiksIHJlcXVpcmUoXCIuL3NoYTFcIiksIHJlcXVpcmUoXCIuL3NoYTI1NlwiKSwgcmVxdWlyZShcIi4vc2hhMjI0XCIpLCByZXF1aXJlKFwiLi9zaGE1MTJcIiksIHJlcXVpcmUoXCIuL3NoYTM4NFwiKSwgcmVxdWlyZShcIi4vc2hhM1wiKSwgcmVxdWlyZShcIi4vcmlwZW1kMTYwXCIpLCByZXF1aXJlKFwiLi9obWFjXCIpLCByZXF1aXJlKFwiLi9wYmtkZjJcIiksIHJlcXVpcmUoXCIuL2V2cGtkZlwiKSwgcmVxdWlyZShcIi4vY2lwaGVyLWNvcmVcIiksIHJlcXVpcmUoXCIuL21vZGUtY2ZiXCIpLCByZXF1aXJlKFwiLi9tb2RlLWN0clwiKSwgcmVxdWlyZShcIi4vbW9kZS1jdHItZ2xhZG1hblwiKSwgcmVxdWlyZShcIi4vbW9kZS1vZmJcIiksIHJlcXVpcmUoXCIuL21vZGUtZWNiXCIpLCByZXF1aXJlKFwiLi9wYWQtYW5zaXg5MjNcIiksIHJlcXVpcmUoXCIuL3BhZC1pc28xMDEyNlwiKSwgcmVxdWlyZShcIi4vcGFkLWlzbzk3OTcxXCIpLCByZXF1aXJlKFwiLi9wYWQtemVyb3BhZGRpbmdcIiksIHJlcXVpcmUoXCIuL3BhZC1ub3BhZGRpbmdcIiksIHJlcXVpcmUoXCIuL2Zvcm1hdC1oZXhcIiksIHJlcXVpcmUoXCIuL2Flc1wiKSwgcmVxdWlyZShcIi4vdHJpcGxlZGVzXCIpLCByZXF1aXJlKFwiLi9yYzRcIiksIHJlcXVpcmUoXCIuL3JhYmJpdFwiKSwgcmVxdWlyZShcIi4vcmFiYml0LWxlZ2FjeVwiKSwgcmVxdWlyZShcIi4vYmxvd2Zpc2hcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiLCBcIi4veDY0LWNvcmVcIiwgXCIuL2xpYi10eXBlZGFycmF5c1wiLCBcIi4vZW5jLXV0ZjE2XCIsIFwiLi9lbmMtYmFzZTY0XCIsIFwiLi9lbmMtYmFzZTY0dXJsXCIsIFwiLi9tZDVcIiwgXCIuL3NoYTFcIiwgXCIuL3NoYTI1NlwiLCBcIi4vc2hhMjI0XCIsIFwiLi9zaGE1MTJcIiwgXCIuL3NoYTM4NFwiLCBcIi4vc2hhM1wiLCBcIi4vcmlwZW1kMTYwXCIsIFwiLi9obWFjXCIsIFwiLi9wYmtkZjJcIiwgXCIuL2V2cGtkZlwiLCBcIi4vY2lwaGVyLWNvcmVcIiwgXCIuL21vZGUtY2ZiXCIsIFwiLi9tb2RlLWN0clwiLCBcIi4vbW9kZS1jdHItZ2xhZG1hblwiLCBcIi4vbW9kZS1vZmJcIiwgXCIuL21vZGUtZWNiXCIsIFwiLi9wYWQtYW5zaXg5MjNcIiwgXCIuL3BhZC1pc28xMDEyNlwiLCBcIi4vcGFkLWlzbzk3OTcxXCIsIFwiLi9wYWQtemVyb3BhZGRpbmdcIiwgXCIuL3BhZC1ub3BhZGRpbmdcIiwgXCIuL2Zvcm1hdC1oZXhcIiwgXCIuL2Flc1wiLCBcIi4vdHJpcGxlZGVzXCIsIFwiLi9yYzRcIiwgXCIuL3JhYmJpdFwiLCBcIi4vcmFiYml0LWxlZ2FjeVwiLCBcIi4vYmxvd2Zpc2hcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCAidHlwZSBTZXR0aW5nT3B0aW9uID0ge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgZGVmYXVsdFZhbHVlOiBzdHJpbmc7XHJcbiAgICBvcHRpb25zOiBBcnJheTx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmd9PjtcclxufTtcclxuXHJcbmNvbnN0IHNldHRpbmdPcHRpb25zOiBTZXR0aW5nT3B0aW9uW10gPSBbXHJcbiAgICB7XHJcbiAgICAgICAga2V5OiAncXVhbnRpdHknLFxyXG4gICAgICAgIGxhYmVsOiAnXHU5MDA5XHU2MkU5XHU5N0YzXHU4RDI4ICAnLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJzEyOCcsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7IGxhYmVsOiAnXHU2ODA3XHU1MUM2JywgdmFsdWU6ICcxMjgnIH0sXHJcbiAgICAgICAgICAgIHsgbGFiZWw6ICdcdTY3ODFcdTlBRDgnLCB2YWx1ZTogJzMyMCcgfSxcclxuICAgICAgICAgICAgeyBsYWJlbDogJ1x1NjVFMFx1NjM1Rlx1OTdGM1x1OEQyOCcsIHZhbHVlOiAnOTk5JyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnXHU2NUUwXHU2MzVGXHU5N0YzXHU4RDI4KFx1OEZEOVx1NEZFOVx1NTE3Nlx1NUI5RVx1NEUwMFx1NjgzN1x1NzY4NFx1NTNFQVx1NjYyRlx1NjAxNVx1NjJBNVx1OTUxOSknLCB2YWx1ZTogJzE5OTknIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAga2V5OiAnYm90dG9tMHJ0b3AnLFxyXG4gICAgICAgIGxhYmVsOiAnXHU2NEFEXHU2NTNFXHU1NjY4XHU1NzgyXHU3NkY0XHU0RjREXHU3RjZFICAnLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJ2JvdHRvbScsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7IGxhYmVsOiAnXHU1QzQ1XHU0RTBCJywgdmFsdWU6ICdib3R0b20nIH0sXHJcbiAgICAgICAgICAgIHsgbGFiZWw6ICdcdTVDNDVcdTRFMEEnLCB2YWx1ZTogJ3RvcCcgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBrZXk6ICdsZWZ0MHJyaWdodCcsXHJcbiAgICAgICAgbGFiZWw6ICdcdTY0QURcdTY1M0VcdTU2NjhcdTZDMzRcdTVFNzNcdTRGNERcdTdGNkUgICcsXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAncmlnaHQnLFxyXG4gICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgeyBsYWJlbDogJ1x1NUM0NVx1NTNGMycsIHZhbHVlOiAncmlnaHQnIH0sXHJcbiAgICAgICAgICAgIHsgbGFiZWw6ICdcdTVDNDVcdTVERTYnLCB2YWx1ZTogJ2xlZnQnIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAga2V5OiAnb3BhY2l0eScsXHJcbiAgICAgICAgbGFiZWw6ICdcdTUzNEFcdTkwMEZcdTY2MEVcdTY1NDhcdTY3OUMgICcsXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnZmFsc2UnLFxyXG4gICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgeyBsYWJlbDogJ1x1NTE3M1x1OTVFRCcsIHZhbHVlOiAnZmFsc2UnIH0sXHJcbiAgICAgICAgICAgIHsgbGFiZWw6ICdcdTU0MkZcdTc1MjgoXHU4RERGXHU5NjhGTHlyaWNCYXJCbHVyXHU2M0QyXHU0RUY2KScsIHZhbHVlOiAndHJ1ZScgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSxcclxuICAgIC8vXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAga2V5OiAnbmV3U2V0dGluZycsXHJcbiAgICAvLyAgICAgbGFiZWw6ICdcdTY1QjBcdThCQkVcdTdGNkVcdTk4NzknLFxyXG4gICAgLy8gICAgIGRlZmF1bHRWYWx1ZTogJ3ZhbHVlMScsXHJcbiAgICAvLyAgICAgb3B0aW9uczogW1xyXG4gICAgLy8gICAgICAgICB7IGxhYmVsOiAnXHU5MDA5XHU5ODc5MScsIHZhbHVlOiAndmFsdWUxJyB9LFxyXG4gICAgLy8gICAgICAgICB7IGxhYmVsOiAnXHU5MDA5XHU5ODc5MicsIHZhbHVlOiAndmFsdWUyJyB9LFxyXG4gICAgLy8gICAgIF0sXHJcbiAgICAvLyB9LFxyXG5dO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZygpIHtcclxuICAgIGNvbnN0IGluaXRpYWxTZXR0aW5ncyA9IHNldHRpbmdPcHRpb25zLnJlZHVjZSgoYWNjLCBzZXR0aW5nKSA9PiB7XHJcbiAgICAgICAgYWNjW3NldHRpbmcua2V5XSA9IGdldFNldHRpbmcoc2V0dGluZy5rZXksIHNldHRpbmcuZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPik7XHJcblxyXG4gICAgY29uc3QgW3NldHRpbmdzLCBzZXRTZXR0aW5nc10gPSBSZWFjdC51c2VTdGF0ZShpbml0aWFsU2V0dGluZ3MpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoc2V0dGluZ3MpLmZvckVhY2goKGtleSkgPT4gc2V0U2V0dGluZyhrZXksIHNldHRpbmdzW2tleV0pKTtcclxuICAgIH0sIFtzZXR0aW5nc10pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVNldHRpbmdDaGFuZ2UgPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBzZXRTZXR0aW5ncygocHJldlNldHRpbmdzKSA9PiAoeyAuLi5wcmV2U2V0dGluZ3MsIFtrZXldOiB2YWx1ZSB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAge3NldHRpbmdPcHRpb25zLm1hcCgoc2V0dGluZykgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3NldHRpbmcua2V5fSBjbGFzc05hbWU9XCJpdGVtIHUtY2tsaXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3NldHRpbmcubGFiZWx9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzZXR0aW5nLm9wdGlvbnMubWFwKChvcHRpb24pID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGtleT17b3B0aW9uLnZhbHVlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3NldHRpbmcua2V5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvcHRpb24udmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2V0dGluZ3Nbc2V0dGluZy5rZXldID09PSBvcHRpb24udmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IGhhbmRsZVNldHRpbmdDaGFuZ2Uoc2V0dGluZy5rZXksIG9wdGlvbi52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiY2lyY2xlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxoMT5cdTRFM0FcdTRFQzBcdTRFNDhcdTUzNTVcdTcyRUNcdTUxOTlcdTRFMDBcdTRFMkFcdTY0QURcdTY1M0VcdTU2Njg/IFx1NTZFMFx1NEUzQVx1NjI3RVx1NEUwRFx1NTIzMFx1N0Y1MVx1NjYxM1x1NEU5MVx1NjRBRFx1NjUzRVx1NjNBNVx1NTNFMyBcdTUxRDFcdTU0MDhcdTc1MjhcdTU0Mjc8L2gxPlxyXG4gICAgICAgICAgICA8aDE+XHU4MUYzXHU0RThFXHU1MTdDXHU1QkI5XHU2MDI3IFx1NjIxMVx1ODFFQVx1NURGMVx1NzUyOFx1NzY4NFx1NjNEMlx1NEVGNlx1NURGMlx1N0VDRlx1NTdGQVx1NjcyQ1x1OTAwMlx1OTE0RFx1NUI4Q1x1NEU4NjwvaDE+XHJcbiAgICAgICAgICAgIDxoND5cdTVGMjBcdTY4MEJcdThGRDhcdTYyMTFcdTk5OTZcdTUzRDFcdTk3RjNcdTRFNTAhISE8L2g0PlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGJldHRlcm5jbS5uY20ub3BlblVybCgnaHR0cHM6Ly9naXRodWIuY29tL2V0aGVyZnVuL01IWU5vdFJlbGVhc2UnKX0+XHJcbiAgICAgICAgICAgICAgICBcdTZFOTBcdTRFRTNcdTc4MDFcclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBiZXR0ZXJuY20ubmNtLm9wZW5VcmwoJ2h0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmZ1bi9NSFlOb3RSZWxlYXNlL2lzc3VlcycpfT5cclxuICAgICAgICAgICAgICAgIFx1OTVFRVx1OTg5OFx1NTNDRFx1OTk4OFxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5jb25zdCBnZXRTZXR0aW5nID0gKG9wdGlvbjogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gXCJNSFlOb3RSZWxlYXNlLVwiICsgb3B0aW9uO1xyXG4gICAgY29uc3QgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgcmV0dXJuIHZhbHVlID8/IGRlZmF1bHRWYWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IHNldFNldHRpbmcgPSAob3B0aW9uOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IFwiTUhZTm90UmVsZWFzZS1cIiArIG9wdGlvbjtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG59O1xyXG4iLCAiY29uc3QgUGxheWxpc3QgPSAoe3NvbmdMaXN0fSkgPT57XHJcblxyXG4gICAgaW50ZXJmYWNlIFB1Ymxpc2hUaW1lIHtcclxuICAgICAgICBkYXk6IG51bWJlcjtcclxuICAgICAgICBob3VyOiBudW1iZXI7XHJcbiAgICAgICAgbWludXRlOiBudW1iZXI7XHJcbiAgICAgICAgc2Vjb25kOiBudW1iZXI7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGNvbnN0IENvdW50ZG93blRpbWVyID0gKHsgaW5pdGlhbFB1Ymxpc2hUaW1lIH06IHsgaW5pdGlhbFB1Ymxpc2hUaW1lOiBQdWJsaXNoVGltZSB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgW3B1Ymxpc2hUaW1lLCBzZXRQdWJsaXNoVGltZV0gPSBSZWFjdC51c2VTdGF0ZTxQdWJsaXNoVGltZT4oaW5pdGlhbFB1Ymxpc2hUaW1lKTtcclxuICAgICAgXHJcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRQdWJsaXNoVGltZSgocHJldlRpbWUpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgeyBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kIH0gPSBwcmV2VGltZTtcclxuICAgICAgXHJcbiAgICAgICAgICAgICAgaWYgKHNlY29uZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlY29uZC0tO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSA1OTtcclxuICAgICAgICAgICAgICAgIGlmIChtaW51dGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZS0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgbWludXRlID0gNTk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChob3VyID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdXItLTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBob3VyID0gMjM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGRheS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICBcclxuICAgICAgICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgIFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICB7cHVibGlzaFRpbWUuZGF5ID4gMCAmJiBgJHtwdWJsaXNoVGltZS5kYXl9OmB9XHJcbiAgICAgICAgICAgIHtwdWJsaXNoVGltZS5ob3VyfTp7cHVibGlzaFRpbWUubWludXRlfTp7cHVibGlzaFRpbWUuc2Vjb25kfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IGZvcm1hdFRpbWVJblNlY29uZHMgPSAoc2Vjb25kcykgPT4geyAgXHJcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTsgIFxyXG4gICAgICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBzZWNvbmRzICUgNjA7ICBcclxuICAgICAgICByZXR1cm4gYCR7bWludXRlc306JHtyZW1haW5pbmdTZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gOyAgXHJcbiAgICB9O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm0tcGx5bGlzdCBtLXBseWxpc3QtcGwyIG0tcGx5bGlzdF9wbGF5bGlzdCBtLXBseWxpc3Qtc29ydFwiIHRhYkluZGV4PXsxMDAwfSBpZD1cImFsbC1zb25ncy1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkIHNvcnQgZi1jYiBqLWZsYWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGggY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdGl0bGU9XCJcdThGRDhcdTUzOUZcdTlFRDhcdThCQTRcdTYzOTJcdTVFOEZcIiBjbGFzc05hbWU9XCJpY24tc29ydC1idG5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiai1mbGFnXCI+PGk+PC9pPjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiZi1kbiB6LWRlZiBqLWZsYWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidS1pY24gdS1pY24tc29ydC1yZXNldFwiPjwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoIGNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1NjVGNlx1OTVGNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidS1pY24gdS1pY24tc29ydC1odnJcIj48L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInUtaWNuIHUtaWNuLXNvcnRcIj48L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbG93IGotZmxhZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aCBjb2xcIiBkYXRhLXJlcy1hY3Rpb249XCJzb3J0XCIgZGF0YS1yZXMtZmllbGQ9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlx1NjgwN1x1OTg5OCA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGggY29sXCIgZGF0YS1yZXMtYWN0aW9uPVwic29ydFwiIGRhdGEtcmVzLWZpZWxkPVwiYXJ0aXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHU2QjRDXHU2MjRCPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoIGNvbFwiIGRhdGEtcmVzLWFjdGlvbj1cInNvcnRcIiBkYXRhLXJlcy1maWVsZD1cImFsYnVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHU0RTEzXHU4RjkxPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRoIGNvbFwiIGRhdGEtcmVzLWFjdGlvbj1cInNvcnRcIiBkYXRhLXJlcy1maWVsZD1cImR1cmF0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHU5ODg0XHU4QkExXHU0RTBBXHU2N0I2XHU2NUY2XHU5NUY0PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJqLWZsYWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImFsbC1zb25ncy1saXN0LXdyYXBwZXItMVwiIHRhYkluZGV4PXsxMDAwMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxzdCBmaXhlZC1zY3JvbGwtbWFuYWdlbWVudFwiIGlkPVwiYWxsLXNvbmdzLWxpc3Qtd3JhcHBlci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC1kaSBwbC1kaS0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyBjb3VudGVyUmVzZXQ6IFwidGxpc3RvcmRlciAwXCIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c29uZ0xpc3QubWFwKChzb25nKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17c29uZy51cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIml0bSBqLWl0ZW0gai1pbXByZXNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1yZXMtbWVudT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXJlcy10eXBlPVwiNFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdXJsPXtzb25nLnVybH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZCBjb2wgcy1mYzRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS11cmw9e3NvbmcudXJsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0VGltZUluU2Vjb25kcyhzb25nLnRpbWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZCBjb2wgdGl0bGVcIiBkYXRhLXVybD17c29uZy51cmx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtzb25nLmNvdmVyfSBjbGFzc05hbWU9XCJjb3ZlclwiIGRhdGEtdXJsPXtzb25nLnVybH0gYWx0PVwiY292ZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpdCBzLWZjMVwiIHRpdGxlPXtzb25nLm5hbWV9IGRhdGEtdXJsPXtzb25nLnVybH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzb25nLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRkIGNvbCBlbGxpcHNpcyBzLWZjMyBmLXByXCIgdGl0bGU9e3NvbmcuYXV0aG9yfSBkYXRhLXVybD17c29uZy51cmx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzb25nLmF1dGhvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZCBjb2wgZWxsaXBzaXNcIiBkYXRhLXVybD17c29uZy51cmx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInMtZmMzXCIgdGl0bGU9e3NvbmcuYWxidW1uYW1lfSBkYXRhLXVybD17c29uZy51cmx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c29uZy5hbGJ1bW5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRkIGNvbCBzLWZjNFwiIGRhdGEtdXJsPXtzb25nLnVybH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvdW50ZG93blRpbWVyIGluaXRpYWxQdWJsaXNoVGltZT17c29uZy5wdWJsaXNoX3RpbWV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxufVxyXG5cclxuY29uc3QgTm9Ob3RyZWxlYXNlID0gKCkgPT57XHJcbiAgcmV0dXJuKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtLXBseWxpc3QgbS1wbHlsaXN0LXBsMiBtLXBseWxpc3RfcGxheWxpc3QgbS1wbHlsaXN0LXNvcnRcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogXCIxMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCIxMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCIsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogXCIyMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZcIlxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlx1NURGMlx1NTE2OFx1OTBFOFx1NEUwQVx1NjdCNiBcdTUzRUZcdTU1OUNcdTUzRUZcdThEM0E8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICA8YnIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgeyBOb05vdHJlbGVhc2UgfVxyXG5leHBvcnQgeyBQbGF5bGlzdCB9IiwgImltcG9ydCBDcnlwdG9KUyAgZnJvbSAnY3J5cHRvLWpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGt1Z291X3NvdXJjZSB7XG5cbiAgICBwdWJsaWMgIGxpc3QgPSBbXVxuICAgIGFzeW5jIGt1Z291X2VudGVyKCkgey8vXHU1MTY1XHU1M0UzIHwgXHU4M0I3XHU1M0Q2XHU1MjFEXHU1OUNCXHU2NTcwXHU2MzZFXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKnZhciByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly93d3cua3Vnb3UuY29tL3l5Lz9yPXNpbmdlci9hbGJ1bSZzaWQ9TzM0UUswRUNCMjFFMyZ0PVwiKyBEYXRlLm5vdygpLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChMaW51eDsgVTsgQW5kcm9pZCAxMTsgemgtY247IFJlZG1pIEszMCBQcm8gQnVpbGQvUktRMS4yMDA4MjYuMDAyKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzQuMCBDaHJvbWUvNzkuMC4zOTQ1LjE0NyBNb2JpbGUgU2FmYXJpLzUzNy4zNiBYaWFvTWkvTWl1aUJyb3dzZXIvMTQuNy4xMCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcdTdGNTFcdTdFRENcdTk1MTlcdThCRUYhIHN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOzkqL1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGJ1bWlkOiAxMDY2ODMxNDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGJ1bW5hbWU6IFwiXFx1N2VkZFxcdTUzM2FcXHU5NmY2MjAyNE1peFxcdTRlMjhcXHU2NzgxXFx1OTY1MFxcdTU5ZDRcXHU2MjU4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWc6IFwiaHR0cDpcXC9cXC9pbWdlLmt1Z291LmNvbVxcL3N0ZG11c2ljXFwvMjQwXFwvMjAyNDEwMTdcXC8yMDI0MTAxNzIyNDIxMzkxNDQ2Ny5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hfdGltZTogXCIyMDI0LTEwLTI5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb25nX2NvdW50OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2VybmFtZTogXCJcXHU0ZTA5Wi1TVFVESU9cXHUzMDAxSE9ZTy1NaVhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZV9hbGJ1bWlkOiBcIjFyaWw4cmIwXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxidW1pZDogMTA2NzAwMTQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxidW1uYW1lOiBcIlxcdTVkMjlcXHU1NzRmXFx1NjYxZlxcdTdhNzlcXHU5NGMxXFx1OTA1My1cXHU0ZTBkXFx1NGU3MVxcdTRlMGRcXHU3ODM0IE5vIERhenpsZSwgTm8gQnJlYWtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZzogXCJodHRwOlxcL1xcL2ltZ2Uua3Vnb3UuY29tXFwvc3RkbXVzaWNcXC8yNDBcXC8yMDI0MTAxNlxcLzIwMjQxMDE2MTExNjA2OTcxNjYxLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaF90aW1lOiBcIjIwMjQtMTAtMjlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvbmdfY291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nZXJuYW1lOiBcIkhPWU8tTWlYXFx1MzAwMVJlb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kZV9hbGJ1bWlkOiBcIjFyaXlkMDc2XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ2V0YWxidW0oZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdcdTUyQTBcdThGN0RcdTRFMTNcdThGOTFcdTU5MzFcdThEMjUsIEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBnZXRhbGJ1bShkYXRhKSB7Ly9cdTUyMDZcdTc5QkJcdThGQzdcdTY1RjZcdTY1NzBcdTYzNkVcbiAgICAgICAgY29uc3QgYWxidW0gPSBbXTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXHU0RjYwXHU5NUVFXHU2MjExXHU4RkQ5XHU5MUNDXHU0RTNBXHU0RUMwXHU0RTQ4XHU4OTgxXHU4RkQ5XHU2ODM3IFx1NjIxMVx1NEUwRFx1NzdFNVx1OTA1MyBcdTRGNDZcdTY2MkZcdTRFMERcdThGRDlcdTY4MzdcdTY1RjZcdTk1RjRcdTVCRjlcdTRFMERcdTRFMEFcbiAgICAgICAgY29uc3Qgc2V2ZW5BbmRIYWxmRGF5c0luTWlsbGlzZWNvbmRzID0gNy41ICogMjQgKiA2MCAqIDYwICogMTAwMCAtIDYgKiA2MCAqIDYwICogMTAwMDtcbiAgICBcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEuZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBwdWJsaXNoVGltZSA9IG5ldyBEYXRlKGRhdGEuZGF0YVtpXS5wdWJsaXNoX3RpbWUpO1xuICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZUluVGltZSA9IG5vdy5nZXRUaW1lKCkgLSBwdWJsaXNoVGltZS5nZXRUaW1lKCk7XG4gICAgXG4gICAgICAgICAgICBpZihkaWZmZXJlbmNlSW5UaW1lIDw9IHNldmVuQW5kSGFsZkRheXNJbk1pbGxpc2Vjb25kcyAmJiBkaWZmZXJlbmNlSW5UaW1lID49IDApe1xuICAgICAgICAgICAgICAgIGFsYnVtLnB1c2goZGF0YS5kYXRhW2ldKTtcbiAgICAgICAgICAgICAgICBhbGJ1bVtpXS5wdWJsaXNoX3RpbWUgPSB0aGlzLmZvcm1hdFRpbWVEaWZmZXJlbmNlKHNldmVuQW5kSGFsZkRheXNJbk1pbGxpc2Vjb25kcyAtIGRpZmZlcmVuY2VJblRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmKGFsYnVtLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LnB1c2goJ1x1NURGMlx1NTE2OFx1OTBFOFx1NEUwQVx1NjdCNicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYWxidW0yc29uZyhhbGJ1bSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBmb3JtYXRUaW1lRGlmZmVyZW5jZShtcykge1xuICAgICAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCk7XG4gICAgICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvICgyNCAqIDYwICogNjApKTtcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAoMjQgKiA2MCAqIDYwKSkgLyAoNjAgKiA2MCkpO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodG90YWxTZWNvbmRzICUgKDYwICogNjApKSAvIDYwKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xuICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF5OiBkYXlzID49IDAgPyBkYXlzIDogMCxcbiAgICAgICAgICAgIGhvdXI6IGhvdXJzLFxuICAgICAgICAgICAgbWludXRlOiBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kOiBzZWNvbmRzLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBhc3luYyBhbGJ1bTJzb25nKGRhdGEpIHsvL1x1ODNCN1x1NTNENlx1OEJFNlx1N0VDNlx1NEZFMVx1NjA2RlxuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIHZhciBhbGJ1bTJsaXN0ID0ge2FsYnVtMmxpc3Q6W119XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9tb2JpbGVjZG4ua3Vnb3UuY29tL2FwaS92My9hbGJ1bS9zb25nP3ZlcnNpb249OTEwOCZhbGJ1bWlkPVwiKyBkYXRhW2ldLmFsYnVtaWQgK1wiJnBsYXQ9MCZwYWdlc2l6ZT0xMDAmYXJlYV9jb2RlPTEmcGFnZT0xJndpdGhfcmVzX3RhZz0xXCIsIHsgXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChMaW51eDsgVTsgQW5kcm9pZCAxMTsgemgtY247IFJlZG1pIEszMCBQcm8gQnVpbGQvUktRMS4yMDA4MjYuMDAyKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzQuMCBDaHJvbWUvNzkuMC4zOTQ1LjE0NyBNb2JpbGUgU2FmYXJpLzUzNy4zNiBYaWFvTWkvTWl1aUJyb3dzZXIvMTQuNy4xMCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXHU3RjUxXHU3RURDXHU5NTE5XHU4QkVGISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTsgIFxuICAgICAgICAgICAgICAgIHZhciBjbGVhbmVkVGV4dCA9IHRleHQucmVwbGFjZSgvPCEtLUtHX1RBR19SRVNfU1RBUlQtLT58PCEtLUtHX1RBR19SRVNfRU5ELS0+L2csIFwiXCIpOyAgXG4gICAgICAgICAgICAgICAgdmFyIGpzb25fZGF0YSA9IEpTT04ucGFyc2UoY2xlYW5lZFRleHQpOyAgXG4gICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBqc29uX2RhdGEuZGF0YS5pbmZvLmxlbmd0aDsgbCsrKSB7ICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGJ1bTJsaXN0LmFsYnVtMmxpc3RbaV0pIHsgIFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxidW0ybGlzdC5hbGJ1bTJsaXN0W2ldID0geyBzb25nOiBbXSB9OyAgXG4gICAgICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsYnVtMmxpc3QuYWxidW0ybGlzdFtpXS5zb25nW2xdKSB7ICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsYnVtMmxpc3QuYWxidW0ybGlzdFtpXS5zb25nW2xdID0geyBpbmZvOiB7fSB9OyAgXG4gICAgICAgICAgICAgICAgICAgIH0gIFxuICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGFsYnVtMmxpc3QuYWxidW0ybGlzdFtpXS5zb25nW2xdLmluZm8uaGFzaCA9IGpzb25fZGF0YS5kYXRhLmluZm9bbF0uaGFzaDsgIFxuICAgICAgICAgICAgICAgICAgICBhbGJ1bTJsaXN0LmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLnNxaGFzaCA9IGpzb25fZGF0YS5kYXRhLmluZm9bbF0uc3FoYXNoOyAgXG4gICAgICAgICAgICAgICAgICAgIGFsYnVtMmxpc3QuYWxidW0ybGlzdFtpXS5zb25nW2xdLmluZm8uaHFoYXNoID0ganNvbl9kYXRhLmRhdGEuaW5mb1tsXVtcIjMyMGhhc2hcIl07ICBcbiAgICAgICAgICAgICAgICAgICAgYWxidW0ybGlzdC5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5hdWRpb19pZCA9IGpzb25fZGF0YS5kYXRhLmluZm9bbF0uYXVkaW9faWQ7ICBcbiAgICAgICAgICAgICAgICAgICAgYWxidW0ybGlzdC5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5hbGJ1bV9pZCA9IGpzb25fZGF0YS5kYXRhLmluZm9bbF0uYWxidW1faWQ7ICBcbiAgICAgICAgICAgICAgICAgICAgYWxidW0ybGlzdC5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5jb3ZlciA9IGpzb25fZGF0YS5kYXRhLmluZm9bbF0udHJhbnNfcGFyYW0udW5pb25fY292ZXI7ICBcbiAgICAgICAgICAgICAgICAgICAgYWxidW0ybGlzdC5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5uYW1lID0ganNvbl9kYXRhLmRhdGEuaW5mb1tsXS5maWxlbmFtZTsgIFxuICAgICAgICAgICAgICAgICAgICBhbGJ1bTJsaXN0LmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLnB1Ymxpc2hfdGltZSA9IGRhdGFbaV0ucHVibGlzaF90aW1lO1xuICAgICAgICAgICAgICAgICAgICBhbGJ1bTJsaXN0LmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLmFsYnVtbmFtZSA9IGRhdGFbaV0uYWxidW1uYW1lOyBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignXHU2M0QwXHU1M0Q2XHU0RTEzXHU4RjkxXHU1OTMxXHU4RDI1LEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldHNvbmd1cmwoYWxidW0ybGlzdClcbiAgICB9XG4gICAgXG4gICAgZ2V0c29uZ3VybChkYXRhKSB7Ly91cmxcbiAgICAgICAgdmFyIGFsYnVtc29uZyA9IHsgYWxidW1saXN0OiBbXSB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5hbGJ1bTJsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IGRhdGEuYWxidW0ybGlzdFtpXS5zb25nLmxlbmd0aDsgbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGJ1bXNvbmcuYWxidW1saXN0W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsYnVtc29uZy5hbGJ1bWxpc3RbaV0gPSB7IHNvbmc6IFtdIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYWxidW1zb25nLmFsYnVtbGlzdFtpXS5zb25nW2xdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsYnVtc29uZy5hbGJ1bWxpc3RbaV0uc29uZ1tsXSA9IHsgdXJsOiB7fSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbGJ1bXNvbmcuYWxidW1saXN0W2ldLnNvbmdbbF0ucHVibGlzaF90aW1lID0gZGF0YS5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5wdWJsaXNoX3RpbWVcbiAgICAgICAgICAgICAgICBhbGJ1bXNvbmcuYWxidW1saXN0W2ldLnNvbmdbbF0ubmFtZSA9IGRhdGEuYWxidW0ybGlzdFtpXS5zb25nW2xdLmluZm8ubmFtZVxuICAgICAgICAgICAgICAgIGFsYnVtc29uZy5hbGJ1bWxpc3RbaV0uc29uZ1tsXS5hbGJ1bW5hbWUgPSBkYXRhLmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLmFsYnVtbmFtZVxuICAgICAgICAgICAgICAgIGFsYnVtc29uZy5hbGJ1bWxpc3RbaV0uc29uZ1tsXS5jb3ZlciA9IGRhdGEuYWxidW0ybGlzdFtpXS5zb25nW2xdLmluZm8uY292ZXJcbiAgICAgICAgICAgICAgICBhbGJ1bXNvbmcuYWxidW1saXN0W2ldLnNvbmdbbF0uYXVkaW9faWQgPSBkYXRhLmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLmF1ZGlvX2lkXG4gICAgICAgICAgICAgICAgYWxidW1zb25nLmFsYnVtbGlzdFtpXS5zb25nW2xdLmFsYnVtX2lkID0gZGF0YS5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5hbGJ1bV9pZFxuICAgICAgICAgICAgICAgIGFsYnVtc29uZy5hbGJ1bWxpc3RbaV0uc29uZ1tsXS51cmwub3JpZ2luID0gJ2h0dHA6Ly90cmFja2VyY2RuLmt1Z291LmNvbS9pL3YyLz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdrZXk9JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9KUy5NRDUoZGF0YS5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5oYXNoICsgJ2tnY2xvdWR2MicpLnRvU3RyaW5nKENyeXB0b0pTLmVuYy5IZXgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmaGFzaD0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYWxidW0ybGlzdFtpXS5zb25nW2xdLmluZm8uaGFzaCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FwcGlkPTEwMDUmcGlkPTImY21kPTI1JmJlaGF2aW9yPXBsYXkmYWxidW1faWQ9JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLmFsYnVtX2lkXG5cbiAgICAgICAgICAgICAgICBhbGJ1bXNvbmcuYWxidW1saXN0W2ldLnNvbmdbbF0udXJsLnNxID0gJ2h0dHA6Ly90cmFja2VyY2RuLmt1Z291LmNvbS9pL3YyLz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2tleT0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3J5cHRvSlMuTUQ1KGRhdGEuYWxidW0ybGlzdFtpXS5zb25nW2xdLmluZm8uc3FoYXNoICsgJ2tnY2xvdWR2MicpLnRvU3RyaW5nKENyeXB0b0pTLmVuYy5IZXgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyZoYXNoPScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLnNxaGFzaCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhcHBpZD0xMDA1JnBpZD0yJmNtZD0yNSZiZWhhdmlvcj1wbGF5JmFsYnVtX2lkPScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLmFsYnVtX2lkXG4gICAgICAgICAgICAgICAgYWxidW1zb25nLmFsYnVtbGlzdFtpXS5zb25nW2xdLnVybC5ocSA9ICdodHRwOi8vdHJhY2tlcmNkbi5rdWdvdS5jb20vaS92Mi8/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdrZXk9JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyeXB0b0pTLk1ENShkYXRhLmFsYnVtMmxpc3RbaV0uc29uZ1tsXS5pbmZvLmhxaGFzaCArICdrZ2Nsb3VkdjInKS50b1N0cmluZyhDcnlwdG9KUy5lbmMuSGV4KSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcmaGFzaD0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5ocWhhc2ggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYXBwaWQ9MTAwNSZwaWQ9MiZjbWQ9MjUmYmVoYXZpb3I9cGxheSZhbGJ1bV9pZD0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hbGJ1bTJsaXN0W2ldLnNvbmdbbF0uaW5mby5hbGJ1bV9pZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hvb3NlX3F1KGFsYnVtc29uZylcbiAgICB9XG4gICAgXG4gICAgY2hvb3NlX3F1KGRhdGEpey8vXHU5N0YzXHU4RDI4XHU5MDA5XHU2MkU5XG4gICAgICAgIHZhciBxdWFsaXR5XG4gICAgICAgIHN3aXRjaChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdNSFlOb3RSZWxlYXNlLXF1YW50aXR5JykpKXtcbiAgICAgICAgICAgIGNhc2UgMTI4OlxuICAgICAgICAgICAgICAgIHF1YWxpdHkgPSAnb3JpZ2luJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDMyMDpcbiAgICAgICAgICAgICAgICBxdWFsaXR5ID0gJ2hxJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDk5OTpcbiAgICAgICAgICAgICAgICBxdWFsaXR5ID0gJ3NxJ1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDE5OTk6XG4gICAgICAgICAgICAgICAgcXVhbGl0eSA9ICdzcSdcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5hbGJ1bWxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgZGF0YS5hbGJ1bWxpc3RbaV0uc29uZy5sZW5ndGg7IGwrKykge1xuICAgICAgICAgICAgICAgIHZhciB1cmw7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChxdWFsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvcmlnaW5cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IGRhdGEuYWxidW1saXN0W2ldLnNvbmdbbF0udXJsLm9yaWdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaHFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IGRhdGEuYWxidW1saXN0W2ldLnNvbmdbbF0udXJsLmhxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzcVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gZGF0YS5hbGJ1bWxpc3RbaV0uc29uZ1tsXS51cmwuc3E7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTk3RjNcdThEMjhcdTkwMDlcdTYyRTlcdTk1MTlcdThCRUZcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhLmFsYnVtbGlzdFtpXS5zb25nW2xdLnVybCA9IHVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3QyanNvbihkYXRhKVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIH1cblxuICAgIGFzeW5jIGxpc3QyanNvbihkYXRhKSB7XG4gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuYWxidW1saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IGRhdGEuYWxidW1saXN0W2ldLnNvbmcubGVuZ3RoOyBsKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGRhdGEuYWxidW1saXN0W2ldLnNvbmdbbF0ubmFtZS5zcGxpdCgnIC0gJylcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChkYXRhLmFsYnVtbGlzdFtpXS5zb25nW2xdLnVybCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXHU3RjUxXHU3RURDXHU5NTE5XHU4QkVGISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1NjNEMFx1NTNENlx1NkI0Q1x1NjZGMlx1NTkzMVx1OEQyNSxFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkYXRhX2dldCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG5cbiAgICAgICAgICAgICAgICB2YXIgc29uZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBkYXRhX2dldC51cmxbMF0sXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IGRhdGFfZ2V0LnRpbWVMZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGFsYnVtbmFtZTogZGF0YS5hbGJ1bWxpc3RbaV0uc29uZ1tsXS5hbGJ1bW5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBhdXRob3I6IHBhcnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBjb3ZlcjogKFwib3JwaGV1czovL2NhY2hlLz9cIitkYXRhLmFsYnVtbGlzdFtpXS5zb25nW2xdLmNvdmVyKS5yZXBsYWNlKFwie3NpemV9XCIsJzI0MCcpLFxuICAgICAgICAgICAgICAgICAgICBwdWJsaXNoX3RpbWU6IGRhdGEuYWxidW1saXN0W2ldLnNvbmdbbF0ucHVibGlzaF90aW1lXG4gICAgICAgICAgICAgICAgfTtcbiBcbiAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goc29uZyk7ICBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9ICBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5saXN0KVxuICAgIH1cbn1cbiIsICJpbnRlcmZhY2UgVHJhY2sge1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjb3Zlcjogc3RyaW5nO1xyXG4gIHRpbWU6IG51bWJlcjtcclxuICBhdXRob3I6IHN0cmluZztcclxuICBhbGJ1bW5hbWU6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgQXVkaW9QbGF5ZXIgPSAoeyB1cmwsIHRyYWNrcyB9OiB7IHVybDogc3RyaW5nOyB0cmFja3M6IFRyYWNrW10gfSkgPT4ge1xyXG4gIGNvbnN0IFtjdXJyZW50VHJhY2tJbmRleCwgc2V0Q3VycmVudFRyYWNrSW5kZXhdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPigwKTtcclxuICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcbiAgY29uc3QgW3Byb2dyZXNzLCBzZXRQcm9ncmVzc10gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDApO1xyXG4gIGNvbnN0IFtjdXJyZW50VGltZSwgc2V0Q3VycmVudFRpbWVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPihcIjA6MDBcIik7XHJcbiAgY29uc3QgW3Nob3dDbG9zZUJ1dHRvbiwgc2V0U2hvd0Nsb3NlQnV0dG9uXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICBjb25zdCBbZmFkZU91dCwgc2V0RmFkZU91dF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcbiAgY29uc3QgYXVkaW9SZWYgPSBSZWFjdC51c2VSZWY8SFRNTEF1ZGlvRWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaW5kZXggPSB0cmFja3MuZmluZEluZGV4KCh0cmFjaykgPT4gdHJhY2sudXJsID09PSB1cmwpO1xyXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICBzZXRDdXJyZW50VHJhY2tJbmRleChpbmRleCk7XHJcbiAgICB9XHJcbiAgfSwgW3VybCwgdHJhY2tzXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoYXVkaW9SZWYuY3VycmVudCkge1xyXG4gICAgICBpc1BsYXlpbmcgPyBhdWRpb1JlZi5jdXJyZW50LnBsYXkoKSA6IGF1ZGlvUmVmLmN1cnJlbnQucGF1c2UoKTtcclxuICAgIH1cclxuICB9LCBbaXNQbGF5aW5nXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLmhhcy5qLWZsYWdcIik7XHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhlaWdodHMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKVxyXG4gICAgICAgIC5tYXAoKGVsKSA9PiBwYXJzZUZsb2F0KGVsLnN0eWxlLmhlaWdodCkpXHJcbiAgICAgICAgLmZpbHRlcigoaGVpZ2h0KSA9PiAhaXNOYU4oaGVpZ2h0KSk7XHJcbiAgICAgIGlmIChoZWlnaHRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgbWluSGVpZ2h0ID0gTWF0aC5taW4oLi4uaGVpZ2h0cyk7XHJcbiAgICAgIGlmIChhdWRpb1JlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgYXVkaW9SZWYuY3VycmVudC52b2x1bWUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBtaW5IZWlnaHQgLyAxMDApKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFtcInN0eWxlXCJdIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50VHJhY2sgPSB0cmFja3NbY3VycmVudFRyYWNrSW5kZXhdO1xyXG4gICAgaWYgKCdtZWRpYVNlc3Npb24nIGluIG5hdmlnYXRvcikge1xyXG4gICAgICBuYXZpZ2F0b3IubWVkaWFTZXNzaW9uLm1ldGFkYXRhID0gbmV3IE1lZGlhTWV0YWRhdGEoe1xyXG4gICAgICAgIHRpdGxlOiBjdXJyZW50VHJhY2submFtZSxcclxuICAgICAgICBhcnRpc3Q6IGN1cnJlbnRUcmFjay5hdXRob3IsXHJcbiAgICAgICAgYWxidW06IGN1cnJlbnRUcmFjay5hbGJ1bW5hbWUsXHJcbiAgICAgICAgYXJ0d29yazogW3sgc3JjOiBjdXJyZW50VHJhY2suY292ZXIucmVwbGFjZSgnb3JwaGV1czovL2NhY2hlLz8nLCcnKS5yZXBsYWNlKCcvMjQwJywnJyksIHR5cGU6IFwiaW1hZ2UvanBlZ1wiIH1dXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmF2aWdhdG9yLm1lZGlhU2Vzc2lvbi5zZXRBY3Rpb25IYW5kbGVyKFwicGxheVwiLCAoKSA9PiBzZXRJc1BsYXlpbmcodHJ1ZSkpO1xyXG4gICAgICBuYXZpZ2F0b3IubWVkaWFTZXNzaW9uLnNldEFjdGlvbkhhbmRsZXIoXCJwYXVzZVwiLCAoKSA9PiBzZXRJc1BsYXlpbmcoZmFsc2UpKTtcclxuICAgICAgbmF2aWdhdG9yLm1lZGlhU2Vzc2lvbi5zZXRBY3Rpb25IYW5kbGVyKFwibmV4dHRyYWNrXCIsICgpID0+IHNldEN1cnJlbnRUcmFja0luZGV4KChwcmV2KSA9PiAocHJldiArIDEpICUgdHJhY2tzLmxlbmd0aCkpO1xyXG4gICAgICBuYXZpZ2F0b3IubWVkaWFTZXNzaW9uLnNldEFjdGlvbkhhbmRsZXIoXCJwcmV2aW91c3RyYWNrXCIsICgpID0+IHNldEN1cnJlbnRUcmFja0luZGV4KChwcmV2KSA9PiAocHJldiAtIDEgKyB0cmFja3MubGVuZ3RoKSAlIHRyYWNrcy5sZW5ndGgpKTtcclxuICAgIH1cclxuICB9LCBbY3VycmVudFRyYWNrSW5kZXgsIHRyYWNrc10pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgYXVkaW9QbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXVkaW8tcGxheWVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBpZiAoIWF1ZGlvUGxheWVyKSByZXR1cm5cclxuICAgICAgXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01IWU5vdFJlbGVhc2UtbGVmdDBycmlnaHQnKSA9PSAncmlnaHQnKSB7XHJcbiAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnZmxvYXRpbmctYm90dG9tYmFyJykpIHtcclxuICAgICAgICBhdWRpb1BsYXllci5zdHlsZS5yaWdodCA9ICdjYWxjKDUwdncgLSB2YXIoLS1ib3R0b21iYXItd2lkdGgpLzIpJ1xyXG4gICAgICAgIGF1ZGlvUGxheWVyLnN0eWxlLmxlZnQgPSBudWxsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXVkaW9QbGF5ZXIuc3R5bGUucmlnaHQgPSAnY2FsYygxNXB4ICsgdmFyKC0tZXh0cmEtcG9zLW1hcmdpbiwgMHB4KSknXHJcbiAgICAgICAgYXVkaW9QbGF5ZXIuc3R5bGUubGVmdCA9IG51bGxcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbG9hdGluZy1ib3R0b21iYXInKSkge1xyXG4gICAgICAgIGF1ZGlvUGxheWVyLnN0eWxlLnJpZ2h0ID0gbnVsbFxyXG4gICAgICAgIGF1ZGlvUGxheWVyLnN0eWxlLmxlZnQgPSAnbWF4KGNhbGModmFyKC0tbGVmdGJhci13aWR0aCwgMTk5cHgpICsgMTVweCArIHZhcigtLWV4dHJhLXBvcy1tYXJnaW4sIDBweCkpLCBjYWxjKDUwdncgLSB2YXIoLS1ib3R0b21iYXItd2lkdGgpLzIpKSdcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhdWRpb1BsYXllci5zdHlsZS5yaWdodCA9IG51bGxcclxuICAgICAgICBhdWRpb1BsYXllci5zdHlsZS5sZWZ0ID0gJ2NhbGModmFyKC0tbGVmdGJhci13aWR0aCwgMTk5cHgpICsgMTVweCArIHZhcigtLWV4dHJhLXBvcy1tYXJnaW4sIDBweCkpJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTUhZTm90UmVsZWFzZS1ib3R0b20wcnRvcCcpID09ICdib3R0b20nKSB7XHJcbiAgICAgIGF1ZGlvUGxheWVyLnN0eWxlLmJvdHRvbSA9ICdjYWxjKHZhcigtLWJvdHRvbWJhci1oZWlnaHQsIDcycHgpICsgdmFyKC0tYm90dG9tYmFyLWVsZXZhdGlvbiwgMHB4KSArIDE1cHgpJ1xyXG4gICAgICBhdWRpb1BsYXllci5zdHlsZS50b3AgPSBudWxsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhdWRpb1BsYXllci5zdHlsZS5ib3R0b20gPSBudWxsXHJcbiAgICAgIGF1ZGlvUGxheWVyLnN0eWxlLnRvcCA9ICc3NXB4J1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01IWU5vdFJlbGVhc2Utb3BhY2l0eScpID09ICd0cnVlJykge1xyXG4gICAgICBhdWRpb1BsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEodmFyKC0tbWQtYWNjZW50LWNvbG9yLWJnLXJnYiwgdmFyKC0tbmNtLWZnLXJnYikpLCcgKyBvcGFjaXR5Y3NzKCkgKyAnKSdcclxuICAgICAgYXVkaW9QbGF5ZXIuc3R5bGUuYmFja2Ryb3BGaWx0ZXIgPSAnYmx1cignICsgYmx1cmNzcygpICsgJ3B4KSdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF1ZGlvUGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSh2YXIoLS1tZC1hY2NlbnQtY29sb3ItYmctcmdiLCB2YXIoLS1uY20tZmctcmdiKSksMSknXHJcbiAgICAgIGF1ZGlvUGxheWVyLnN0eWxlLmJhY2tkcm9wRmlsdGVyID0gbnVsbFxyXG4gICAgfVxyXG5cclxuICB9LCBbbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ01IWU5vdFJlbGVhc2Utb3BhY2l0eScpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTUhZTm90UmVsZWFzZS1ib3R0b20wcnRvcCcpLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTUhZTm90UmVsZWFzZS1sZWZ0MHJyaWdodCcpXSk7XHJcblxyXG4gIGNvbnN0IGZvcm1hdFRpbWUgPSAoc2Vjb25kczogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgY29uc3Qgc2VjcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKTtcclxuICAgIHJldHVybiBgJHttaW51dGVzfToke3NlY3MgPCAxMCA/IFwiMFwiIDogXCJcIn0ke3NlY3N9YDtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGF5VHJhY2sgPSAoKSA9PiBzZXRJc1BsYXlpbmcodHJ1ZSk7XHJcbiAgY29uc3QgcGF1c2VUcmFjayA9ICgpID0+IHNldElzUGxheWluZyhmYWxzZSk7XHJcbiAgY29uc3QgbmV4dFRyYWNrID0gKCkgPT4gc2V0Q3VycmVudFRyYWNrSW5kZXgoKHByZXZJbmRleCkgPT4gKHByZXZJbmRleCArIDEpICUgdHJhY2tzLmxlbmd0aCk7XHJcbiAgY29uc3QgcHJldmlvdXNUcmFjayA9ICgpID0+IHNldEN1cnJlbnRUcmFja0luZGV4KChwcmV2SW5kZXgpID0+IHByZXZJbmRleCA9PT0gMCA/IHRyYWNrcy5sZW5ndGggLSAxIDogcHJldkluZGV4IC0gMSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVRpbWVVcGRhdGUgPSAoKSA9PiB7XHJcbiAgICBpZiAoYXVkaW9SZWYuY3VycmVudCkge1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gYXVkaW9SZWYuY3VycmVudC5jdXJyZW50VGltZTtcclxuICAgICAgc2V0UHJvZ3Jlc3MoKGN1cnJlbnQgLyB0cmFja3NbY3VycmVudFRyYWNrSW5kZXhdLnRpbWUpICogMTAwKTtcclxuICAgICAgc2V0Q3VycmVudFRpbWUoZm9ybWF0VGltZShjdXJyZW50KSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VlayA9IChldmVudCkgPT4ge1xyXG4gICAgaWYgKGF1ZGlvUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY29uc3QgcmVjdCA9IGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3Qgc2Vla1RpbWUgPSAoKGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQpIC8gcmVjdC53aWR0aCkgKiB0cmFja3NbY3VycmVudFRyYWNrSW5kZXhdLnRpbWU7XHJcbiAgICAgIGF1ZGlvUmVmLmN1cnJlbnQuY3VycmVudFRpbWUgPSBzZWVrVGltZTtcclxuICAgICAgc2V0UHJvZ3Jlc3MoKHNlZWtUaW1lIC8gdHJhY2tzW2N1cnJlbnRUcmFja0luZGV4XS50aW1lKSAqIDEwMCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW91c2VFbnRlciA9ICgpID0+IHtcclxuICAgIHNldFNob3dDbG9zZUJ1dHRvbih0cnVlKTtcclxuICAgIHNldEZhZGVPdXQoZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vdXNlTGVhdmUgPSAoKSA9PiB7XHJcbiAgICAgIHNldEZhZGVPdXQodHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICBwYXVzZVRyYWNrKCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXVkaW8tcGxheWVyJykucmVtb3ZlKClcclxuICB9O1xyXG5cclxuICBjb25zdCBjdXJyZW50VHJhY2sgPSB0cmFja3NbY3VycmVudFRyYWNrSW5kZXhdO1xyXG4gIGNvbnN0IHRvdGFsVGltZSA9IGZvcm1hdFRpbWUoY3VycmVudFRyYWNrLnRpbWUpO1xyXG5cclxuICBjb25zdCBibHVyY3NzID0gKCkgPT57XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkx5cmljQmFyQmx1clNldHRpbmdzXCIpKXtcclxuICAgICAgdmFyIGNzcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJMeXJpY0JhckJsdXJTZXR0aW5nc1wiKSkuYmx1clxyXG4gICAgICByZXR1cm4gY3NzXHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIDVcclxuICAgIH1cclxuICB9XHJcbiAgY29uc3QgYnV0dG9uY3NzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29sb3I6ICd2YXIoLS1tZC1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5KScsXHJcbiAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKHZhcigtLW1kLWFjY2VudC1jb2xvci1zZWNvbmRhcnktcmdiKSwgMC40KScsXHJcbiAgICAgIGJvcmRlclJhZGl1czogJzVweCcsXHJcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICBtYXJnaW46ICcwIDVweCdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IG9wYWNpdHljc3MgPSAoKSA9PntcclxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTHlyaWNCYXJCbHVyU2V0dGluZ3NcIikpe1xyXG4gICAgICB2YXIgY3NzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkx5cmljQmFyQmx1clNldHRpbmdzXCIpKS5iZ1RyYW5zXHJcbiAgICAgIHJldHVybiBjc3NcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gMC40XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGNvbnN0IGJnY3NzID0gKCkgPT57XHJcbiAgICBpZihkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnbWF0ZXJpYWwteW91LXRoZW1lJykpe1xyXG4gICAgICByZXR1cm4gJ3ZhcigtLW1kLWFjY2VudC1jb2xvciknXHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuICd2YXIoLS10aGVtZVBsYXkpJ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgaWQ9XCJhdWRpby1wbGF5ZXJcIlxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxyXG4gICAgICAgIGJveFNoYWRvdzogJzAgMCAxMHB4IHJnYmEoMCwwLDAsMC41KScsXHJcbiAgICAgICAgekluZGV4OiA3MCxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgY29sb3I6IFwidmFyKC0tbWQtYWNjZW50LWNvbG9yLXNlY29uZGFyeSlcIixcclxuICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcclxuICAgICAgICBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoJysgYmx1cmNzcygpICsncHgpJyxcclxuICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKHZhcigtLW1kLWFjY2VudC1jb2xvci1iZy1yZ2IsIHZhcigtLW5jbS1mZy1yZ2IpKSwgMC40KScsXHJcbiAgICAgICAgaGVpZ2h0OiAnYXV0bydcclxuICAgICAgfX1cclxuICAgICAgb25Nb3VzZUVudGVyPXtoYW5kbGVNb3VzZUVudGVyfVxyXG4gICAgICBvbk1vdXNlTGVhdmU9e2hhbmRsZU1vdXNlTGVhdmV9XHJcbiAgICA+XHJcbiAgICAgIHtzaG93Q2xvc2VCdXR0b24gJiYgKFxyXG4gICAgICAgIDxidXR0b24gdGl0bGU9XCJcdTY2ODJcdTUwNUNcdTk3RjNcdTRFNTBcdTVFNzZcdTUxNzNcdTk1RURcdTZCNjRcdTdBOTdcdTUzRTNcIlxyXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xvc2V9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgdG9wOiAnMTBweCcsXHJcbiAgICAgICAgICAgIHJpZ2h0OiAnMTBweCcsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzE1cHgnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxNXB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEodmFyKC0tbWQtYWNjZW50LWNvbG9yLXNlY29uZGFyeS1yZ2IpLCcrIG9wYWNpdHljc3MoKS8xMCArJyknLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLW1kLWFjY2VudC1jb2xvci1zZWNvbmRhcnkpJyxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMnMnLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiBmYWRlT3V0ID8gMCA6IDEsXHJcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoNXB4KScsXHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgIFx1MDBEN1xyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICApfVxyXG4gICAgICBcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdWxscGxheWVyYmFyXCJcclxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVTZWVrfVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgaGVpZ2h0OiAnNXB4JyxcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSh2YXIoLS1tZC1hY2NlbnQtY29sb3ItcmdiKSwgMC4xNSksIHJnYmEodmFyKC0tbWQtYWNjZW50LWNvbG9yLXJnYiksJyArIG9wYWNpdHljc3MoKS8xMCArICcpJyxcclxuICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcclxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCdcclxuICAgICAgICB9fT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXllcmJhclwiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7cHJvZ3Jlc3N9JWAsXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBiZ2NzcygpLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBwYWRkaW5nOiAnMCA1cHggMTBweCAxMHB4J1xyXG4gICAgICB9fT5cclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICBzcmM9e2N1cnJlbnRUcmFjay5jb3Zlcn1cclxuICAgICAgICAgIGFsdD17Y3VycmVudFRyYWNrLm5hbWV9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICB3aWR0aDogJzU2cHgnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICc1NnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luTGVmdDogJzEwcHgnXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xyXG4gICAgICAgIH19PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgzIHN0eWxlPXt7IGZvbnRTaXplOiAnMS4zZW0nIH19PntjdXJyZW50VHJhY2submFtZX08L2gzPlxyXG4gICAgICAgICAgICA8cCBzdHlsZT17eyBmb250U2l6ZTogJzFlbScgfX0+e2N1cnJlbnRUcmFjay5hdXRob3J9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1ldmVubHknLFxyXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xyXG4gICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAnNDBweCcsIHRleHRBbGlnbjogJ2NlbnRlcicgfX0+e2N1cnJlbnRUaW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3ByZXZpb3VzVHJhY2t9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e2J1dHRvbmNzcygpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgXHU0RTBBXHU0RTAwXHU5OTk2XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICB7aXNQbGF5aW5nID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3BhdXNlVHJhY2t9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17YnV0dG9uY3NzKCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgXHU2NjgyXHU1MDVDXHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17cGxheVRyYWNrfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2J1dHRvbmNzcygpfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIFx1NjRBRFx1NjUzRVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgb25DbGljaz17bmV4dFRyYWNrfVxyXG4gICAgICAgICAgICAgIHN0eWxlPXtidXR0b25jc3MoKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIFx1NEUwQlx1NEUwMFx1OTk5NlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6ICc0MHB4JywgdGV4dEFsaWduOiAnY2VudGVyJyB9fT57dG90YWxUaW1lfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGF1ZGlvXHJcbiAgICAgICAgcmVmPXthdWRpb1JlZn1cclxuICAgICAgICBzcmM9e2N1cnJlbnRUcmFjay51cmx9XHJcbiAgICAgICAgb25FbmRlZD17bmV4dFRyYWNrfVxyXG4gICAgICAgIG9uVGltZVVwZGF0ZT17aGFuZGxlVGltZVVwZGF0ZX1cclxuICAgICAgICBhdXRvUGxheVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCB7IEF1ZGlvUGxheWVyIH0gO1xyXG4iLCAiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vdWkvY29uZmlnXCI7XHJcbmltcG9ydCB7ICBQbGF5bGlzdCB9ICBmcm9tIFwiLi91aS9wYWdlXCI7XHJcbmltcG9ydCBrdWdvdV9zb3VyY2UgZnJvbSBcIi4vc291cmNlL2t1Z291XCJcclxubGV0IGt1Z291ID0gbmV3IGt1Z291X3NvdXJjZSgpXHJcbmltcG9ydCB7IEF1ZGlvUGxheWVyIH0gZnJvbSAnLi91aS9wbGF5ZXInO1xyXG5pbXBvcnQgeyBOb05vdHJlbGVhc2UgfSBmcm9tIFwiLi91aS9wYWdlXCI7XHJcblxyXG5cclxucGx1Z2luLm9uQ29uZmlnKCgpPT57XHJcbiAgICBjb25zdCBlbGVtZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIFJlYWN0RE9NLnJlbmRlcig8Q29uZmlnLz4sZWxlbWVudCk7XHJcbiAgICB9LCA0MDAwKTtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59KVxyXG5cclxucGx1Z2luLm9uTG9hZChhc3luYygpPT57XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ocmVmICE9IFwib3JwaGV1czovL29ycGhldXMvcHViL2FwcC5odG1sIy9tL2FydGlzdC8/aWQ9MTI0ODcxNzRcIil7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IGJldHRlcm5jbS51dGlscy53YWl0Rm9yRWxlbWVudCgnLm0teXJzaC5nLXdyYXAxLnEtbHJjIC51LXRhYjIgdWwgbGknKTtcclxuICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29uaHlsZS10YWInKSl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b25oeWxlLXRhYicpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWh5LXBhZ2Utcm9vdCcpKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21oeS1wYWdlLXJvb3QnKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHdvbWh5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgd29taHlsZS5jbGFzc05hbWUgPSAndGV4dF90YWInO1xyXG4gICAgICAgIHdvbWh5bGUuaWQgPSAnd2hlcmVteW1oeW11aXNjJztcclxuICAgICAgICB3b21oeWxlLmlubmVyVGV4dCA9ICdcdTY3MkFcdTRFMEFcdTY3QjZcdTZCNENcdTY2RjInO1xyXG4gICAgICAgIGxldCB3b21oeWxlYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICB3b21oeWxlYnRuLmFwcGVuZENoaWxkKHdvbWh5bGUpO1xyXG4gICAgICAgIHdvbWh5bGVidG4uaWQgPSAnd29uaHlsZS10YWInO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tLXlyc2guZy13cmFwMS5xLWxyYyAudS10YWIyIHVsIGxpJykucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh3b21oeWxlYnRuKTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcm9vdC5pZCA9ICdtaHktcGFnZS1yb290JztcclxuICAgICAgICByb290LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm0teXJzaC5nLXdyYXAxLnEtbHJjJykuYXBwZW5kQ2hpbGQocm9vdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFydGlzdFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubS15cnNoLmctd3JhcDEucS1scmMgLnUtdGFiMiB1bCcpO1xyXG4gICAgICAgIGFydGlzdFRhYnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50PT57XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFRhYlRleHQgPSBldmVudC50YXJnZXQgYXMgRWxlbWVudDtcclxuICAgICAgICAgICAgd29taHlsZWJ0bi5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dF90YWInKS5mb3JFYWNoKHRhYlRleHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFiVGV4dC5jbGFzc0xpc3QucmVtb3ZlKCd6LXNlbCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGFyZ2V0VGFiVGV4dC5jbGFzc0xpc3QuYWRkKCd6LXNlbCcpO1xyXG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm0teXJzaC5nLXdyYXAxLnEtbHJjIGRpdi5xLWxyY1wiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICAgICAgaWYodGFyZ2V0VGFiVGV4dC5tYXRjaGVzKCcjd2hlcmVteW1oeW11aXNjJykpe1xyXG4gICAgICAgICAgICAgICAgcm9vdC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsUGFnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qLWZsYWcuc3R5bGUudS1zdGFiJykgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByb290LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFBhZ2Uuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmotZmxhZy5zdHlsZS51LXN0YWInKSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZihrdWdvdS5saXN0Lmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgIGt1Z291Lmt1Z291X2VudGVyKClcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgYmV0dGVybmNtLnV0aWxzLmRlbGF5KDMwMDApXHJcbiAgICAgICAgaWYoa3Vnb3UubGlzdC5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJcdTYyMTFcdTdDNzNcdTU0QzhcdTZFMzhcdTk5OTZcdTUzRDFcdTk3RjNcdTRFNTBcdTU0NjI6IFx1NjVFMFx1NkNENVx1NTJBMFx1OEY3RFx1NkUwNVx1NTM1NVwiKVxyXG4gICAgICAgIH1lbHNlIGlmKGt1Z291Lmxpc3QuaW5jbHVkZXMoJ1x1NURGMlx1NTE2OFx1OTBFOFx1NEUwQVx1NjdCNicpKXtcclxuICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKDxOb05vdHJlbGVhc2UgLz4sIHJvb3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlYWN0RE9NLnJlbmRlcig8UGxheWxpc3Qgc29uZ0xpc3Q9e2t1Z291Lmxpc3R9Lz4sIHJvb3QpO1xyXG5cclxuICAgICAgICBhd2FpdCBiZXR0ZXJuY20udXRpbHMuZGVsYXkoMTAwKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtaHktcGFnZS1yb290IC5wbC1kaS5wbC1kaS0xJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudDogTW91c2VFdmVudCkgeyAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codXJsKVxyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8tcGxheWVyJykpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvLXBsYXllcicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcnRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4LWctbW4nKVxyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgcGxheWVydGFyZ2V0LmFwcGVuZENoaWxkKHBsYXllckNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcig8QXVkaW9QbGF5ZXIgdXJsPXt1cmx9IHRyYWNrcz17a3Vnb3UubGlzdH0gLz4sIHBsYXllckNvbnRhaW5lcik7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFDLE9BQUMsU0FBVSxNQUFNLFNBQVM7QUFDMUIsWUFBSSxPQUFPLFlBQVksVUFBVTtBQUVoQyxpQkFBTyxVQUFVLFVBQVUsUUFBUTtBQUFBLFFBQ3BDLFdBQ1MsT0FBTyxXQUFXLGNBQWMsT0FBTyxLQUFLO0FBRXBELGlCQUFP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LEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBRXpDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFFekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUV6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsR0FBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsYUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxZQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxHQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLGtCQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7QUFDekMsa0JBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFlBQWEsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUN6QyxrQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBYSxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBR3pDLGdCQUFFLENBQUMsSUFBSyxFQUFFLENBQUMsSUFBSSxJQUFLO0FBQ3BCLGdCQUFFLENBQUMsSUFBSyxFQUFFLENBQUMsSUFBSSxJQUFLO0FBQ3BCLGdCQUFFLENBQUMsSUFBSyxFQUFFLENBQUMsSUFBSSxJQUFLO0FBQ3BCLGdCQUFFLENBQUMsSUFBSyxFQUFFLENBQUMsSUFBSSxJQUFLO0FBQUEsWUFDeEI7QUFBQSxZQUVBLGFBQWEsV0FBWTtBQUVyQixrQkFBSSxPQUFPLEtBQUs7QUFDaEIsa0JBQUksWUFBWSxLQUFLO0FBRXJCLGtCQUFJLGFBQWEsS0FBSyxjQUFjO0FBQ3BDLGtCQUFJLFlBQVksS0FBSyxXQUFXO0FBR2hDLHdCQUFVLGNBQWMsQ0FBQyxLQUFLLE9BQVMsS0FBSyxZQUFZO0FBRXhELGtCQUFJLGNBQWNBLE1BQUssTUFBTSxhQUFhLFVBQVc7QUFDckQsa0JBQUksY0FBYztBQUNsQix5QkFBYSxZQUFZLE9BQVEsS0FBTSxLQUFLLEVBQUUsS0FDdkMsZUFBZSxJQUFPLGdCQUFnQixNQUFPLFlBQzdDLGVBQWUsS0FBTyxnQkFBZ0IsS0FBTztBQUVwRCx5QkFBYSxZQUFZLE9BQVEsS0FBTSxLQUFLLEVBQUUsS0FDdkMsZUFBZSxJQUFPLGdCQUFnQixNQUFPLFlBQzdDLGVBQWUsS0FBTyxnQkFBZ0IsS0FBTztBQUdwRCxtQkFBSyxZQUFZLFVBQVUsU0FBUyxLQUFLO0FBR3pDLG1CQUFLLFNBQVM7QUFHZCxrQkFBSSxPQUFPLEtBQUs7QUFDaEIsa0JBQUksSUFBSSxLQUFLO0FBR2IsdUJBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBRXhCLG9CQUFJLE1BQU0sRUFBRSxDQUFDO0FBRWIsa0JBQUUsQ0FBQyxLQUFPLE9BQU8sSUFBTyxRQUFRLE1BQU8sWUFDN0IsT0FBTyxLQUFPLFFBQVEsS0FBTztBQUFBLGNBQzNDO0FBR0EscUJBQU87QUFBQSxZQUNYO0FBQUEsWUFFQSxPQUFPLFdBQVk7QUFDZixrQkFBSSxRQUFRLE9BQU8sTUFBTSxLQUFLLElBQUk7QUFDbEMsb0JBQU0sUUFBUSxLQUFLLE1BQU0sTUFBTTtBQUUvQixxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKLENBQUM7QUFFRCxtQkFBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDN0IsZ0JBQUksSUFBSSxLQUFNLElBQUksSUFBTSxDQUFDLElBQUksS0FBTSxJQUFJO0FBQ3ZDLG9CQUFTLEtBQUssSUFBTSxNQUFPLEtBQUssS0FBTztBQUFBLFVBQzNDO0FBRUEsbUJBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQzdCLGdCQUFJLElBQUksS0FBTSxJQUFJLElBQU0sSUFBSSxDQUFDLEtBQU0sSUFBSTtBQUN2QyxvQkFBUyxLQUFLLElBQU0sTUFBTyxLQUFLLEtBQU87QUFBQSxVQUMzQztBQUVBLG1CQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztBQUM3QixnQkFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssSUFBSTtBQUM5QixvQkFBUyxLQUFLLElBQU0sTUFBTyxLQUFLLEtBQU87QUFBQSxVQUMzQztBQUVBLG1CQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztBQUM3QixnQkFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxJQUFJO0FBQ2pDLG9CQUFTLEtBQUssSUFBTSxNQUFPLEtBQUssS0FBTztBQUFBLFVBQzNDO0FBZ0JBLFlBQUUsTUFBTSxPQUFPLGNBQWMsR0FBRztBQWdCaEMsWUFBRSxVQUFVLE9BQU8sa0JBQWtCLEdBQUc7QUFBQSxRQUM1QyxHQUFFLElBQUk7QUFHTixlQUFPRCxVQUFTO0FBQUEsTUFFakIsQ0FBQztBQUFBO0FBQUE7OztBQzNRRDtBQUFBO0FBQUMsT0FBQyxTQUFVLE1BQU0sU0FBUztBQUMxQixZQUFJLE9BQU8sWUFBWSxVQUFVO0FBRWhDLGlCQUFPLFVBQVUsVUFBVSxRQUFRLGNBQWlCO0FBQUEsUUFDckQsV0FDUyxPQUFPLFdBQVcsY0FBYyxPQUFPLEtBQUs7QUFFcEQsaUJBQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTztBQUFBLFFBQzNCLE9BQ0s7QUFFSixrQkFBUSxLQUFLLFFBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0QsR0FBRSxTQUFNLFNBQVVFLFdBQVU7QUFFM0IsU0FBQyxXQUFZO0FBRVQsY0FBSSxJQUFJQTtBQUNSLGNBQUksUUFBUSxFQUFFO0FBQ2QsY0FBSSxZQUFZLE1BQU07QUFDdEIsY0FBSSxTQUFTLE1BQU07QUFDbkIsY0FBSSxTQUFTLEVBQUU7QUFHZixjQUFJLElBQUksQ0FBQztBQUtULGNBQUksT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPO0FBQUEsWUFDbkMsVUFBVSxXQUFZO0FBQ2xCLG1CQUFLLFFBQVEsSUFBSSxVQUFVLEtBQUs7QUFBQSxnQkFDNUI7QUFBQSxnQkFBWTtBQUFBLGdCQUNaO0FBQUEsZ0JBQVk7QUFBQSxnQkFDWjtBQUFBLGNBQ0osQ0FBQztBQUFBLFlBQ0w7QUFBQSxZQUVBLGlCQUFpQixTQUFVLEdBQUcsUUFBUTtBQUVsQyxrQkFBSSxJQUFJLEtBQUssTUFBTTtBQUduQixrQkFBSSxJQUFJLEVBQUUsQ0FBQztBQUNYLGtCQUFJLElBQUksRUFBRSxDQUFDO0FBQ1gsa0JBQUksSUFBSSxFQUFFLENBQUM7QUFDWCxrQkFBSSxJQUFJLEVBQUUsQ0FBQztBQUNYLGtCQUFJLElBQUksRUFBRSxDQUFDO0FBR1gsdUJBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQ3pCLG9CQUFJLElBQUksSUFBSTtBQUNSLG9CQUFFLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO0FBQUEsZ0JBQzNCLE9BQU87QUFDSCxzQkFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ2xELG9CQUFFLENBQUMsSUFBSyxLQUFLLElBQU0sTUFBTTtBQUFBLGdCQUM3QjtBQUVBLG9CQUFJLEtBQU0sS0FBSyxJQUFNLE1BQU0sTUFBTyxJQUFJLEVBQUUsQ0FBQztBQUN6QyxvQkFBSSxJQUFJLElBQUk7QUFDUix3QkFBTyxJQUFJLElBQU0sQ0FBQyxJQUFJLEtBQU07QUFBQSxnQkFDaEMsV0FBVyxJQUFJLElBQUk7QUFDZix3QkFBTSxJQUFJLElBQUksS0FBSztBQUFBLGdCQUN2QixXQUFXLElBQUksSUFBSTtBQUNmLHdCQUFPLElBQUksSUFBTSxJQUFJLElBQU0sSUFBSSxLQUFNO0FBQUEsZ0JBQ3pDLE9BQXlCO0FBQ3JCLHdCQUFNLElBQUksSUFBSSxLQUFLO0FBQUEsZ0JBQ3ZCO0FBRUEsb0JBQUk7QUFDSixvQkFBSTtBQUNKLG9CQUFLLEtBQUssS0FBTyxNQUFNO0FBQ3ZCLG9CQUFJO0FBQ0osb0JBQUk7QUFBQSxjQUNSO0FBR0EsZ0JBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUs7QUFDcEIsZ0JBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUs7QUFDcEIsZ0JBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUs7QUFDcEIsZ0JBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUs7QUFDcEIsZ0JBQUUsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUs7QUFBQSxZQUN4QjtBQUFBLFlBRUEsYUFBYSxXQUFZO0FBRXJCLGtCQUFJLE9BQU8sS0FBSztBQUNoQixrQkFBSSxZQUFZLEtBQUs7QUFFckIsa0JBQUksYUFBYSxLQUFLLGNBQWM7QUFDcEMsa0JBQUksWUFBWSxLQUFLLFdBQVc7QUFHaEMsd0JBQVUsY0FBYyxDQUFDLEtBQUssT0FBUyxLQUFLLFlBQVk7QUFDeEQseUJBQWEsWUFBWSxPQUFRLEtBQU0sS0FBSyxFQUFFLElBQUksS0FBSyxNQUFNLGFBQWEsVUFBVztBQUNyRix5QkFBYSxZQUFZLE9BQVEsS0FBTSxLQUFLLEVBQUUsSUFBSTtBQUNsRCxtQkFBSyxXQUFXLFVBQVUsU0FBUztBQUduQyxtQkFBSyxTQUFTO0FBR2QscUJBQU8sS0FBSztBQUFBLFlBQ2hCO0FBQUEsWUFFQSxPQUFPLFdBQVk7QUFDZixrQkFBSSxRQUFRLE9BQU8sTUFBTSxLQUFLLElBQUk7QUFDbEMsb0JBQU0sUUFBUSxLQUFLLE1BQU0sTUFBTTtBQUUvQixxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKLENBQUM7QUFnQkQsWUFBRSxPQUFPLE9BQU8sY0FBYyxJQUFJO0FBZ0JsQyxZQUFFLFdBQVcsT0FBTyxrQkFBa0IsSUFBSTtBQUFBLFFBQzlDLEdBQUU7QUFHRixlQUFPQSxVQUFTO0FBQUEsTUFFakIsQ0FBQztBQUFBO0FBQUE7OztBQ3JKRDtBQUFBO0FBQUMsT0FBQyxTQUFVLE1BQU0sU0FBUztBQUMxQixZQUFJLE9BQU8sWUFBWSxVQUFVO0FBRWhDLGlCQUFPLFVBQVUsVUFBVSxRQUFRLGNBQWlCO0FBQUEsUUFDckQsV0FDUyxPQUFPLFdBQVcsY0FBYyxPQUFPLEtBQUs7QUFFcEQsaUJBQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTztBQUFBLFFBQzNCLE9BQ0s7QUFFSixrQkFBUSxLQUFLLFFBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0QsR0FBRSxTQUFNLFNBQVVDLFdBQVU7QUFFM0IsU0FBQyxTQUFVQyxPQUFNO0FBRWIsY0FBSSxJQUFJRDtBQUNSLGNBQUksUUFBUSxFQUFFO0FBQ2QsY0FBSSxZQUFZLE1BQU07QUFDdEIsY0FBSSxTQUFTLE1BQU07QUFDbkIsY0FBSSxTQUFTLEVBQUU7QUFHZixjQUFJLElBQUksQ0FBQztBQUNULGNBQUksSUFBSSxDQUFDO0FBR1QsV0FBQyxXQUFZO0FBQ1QscUJBQVMsUUFBUUUsSUFBRztBQUNoQixrQkFBSSxRQUFRRCxNQUFLLEtBQUtDLEVBQUM7QUFDdkIsdUJBQVMsU0FBUyxHQUFHLFVBQVUsT0FBTyxVQUFVO0FBQzVDLG9CQUFJLEVBQUVBLEtBQUksU0FBUztBQUNmLHlCQUFPO0FBQUEsZ0JBQ1g7QUFBQSxjQUNKO0FBRUEscUJBQU87QUFBQSxZQUNYO0FBRUEscUJBQVMsa0JBQWtCQSxJQUFHO0FBQzFCLHNCQUFTQSxNQUFLQSxLQUFJLE1BQU0sYUFBZTtBQUFBLFlBQzNDO0FBRUEsZ0JBQUksSUFBSTtBQUNSLGdCQUFJLFNBQVM7QUFDYixtQkFBTyxTQUFTLElBQUk7QUFDaEIsa0JBQUksUUFBUSxDQUFDLEdBQUc7QUFDWixvQkFBSSxTQUFTLEdBQUc7QUFDWixvQkFBRSxNQUFNLElBQUksa0JBQWtCRCxNQUFLLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztBQUFBLGdCQUNwRDtBQUNBLGtCQUFFLE1BQU0sSUFBSSxrQkFBa0JBLE1BQUssSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWhEO0FBQUEsY0FDSjtBQUVBO0FBQUEsWUFDSjtBQUFBLFVBQ0osR0FBRTtBQUdGLGNBQUksSUFBSSxDQUFDO0FBS1QsY0FBSSxTQUFTLE9BQU8sU0FBUyxPQUFPLE9BQU87QUFBQSxZQUN2QyxVQUFVLFdBQVk7QUFDbEIsbUJBQUssUUFBUSxJQUFJLFVBQVUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQUEsWUFDOUM7QUFBQSxZQUVBLGlCQUFpQixTQUFVLEdBQUcsUUFBUTtBQUVsQyxrQkFBSUUsS0FBSSxLQUFLLE1BQU07QUFHbkIsa0JBQUksSUFBSUEsR0FBRSxDQUFDO0FBQ1gsa0JBQUksSUFBSUEsR0FBRSxDQUFDO0FBQ1gsa0JBQUksSUFBSUEsR0FBRSxDQUFDO0FBQ1gsa0JBQUksSUFBSUEsR0FBRSxDQUFDO0FBQ1gsa0JBQUksSUFBSUEsR0FBRSxDQUFDO0FBQ1gsa0JBQUksSUFBSUEsR0FBRSxDQUFDO0FBQ1gsa0JBQUksSUFBSUEsR0FBRSxDQUFDO0FBQ1gsa0JBQUlDLEtBQUlELEdBQUUsQ0FBQztBQUdYLHVCQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUN6QixvQkFBSSxJQUFJLElBQUk7QUFDUixvQkFBRSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtBQUFBLGdCQUMzQixPQUFPO0FBQ0gsc0JBQUksVUFBVSxFQUFFLElBQUksRUFBRTtBQUN0QixzQkFBSSxVQUFZLFdBQVcsS0FBTyxZQUFZLE1BQzlCLFdBQVcsS0FBTyxZQUFZLE1BQzlCLFlBQVk7QUFFNUIsc0JBQUksVUFBVSxFQUFFLElBQUksQ0FBQztBQUNyQixzQkFBSSxVQUFZLFdBQVcsS0FBTyxZQUFZLE9BQzlCLFdBQVcsS0FBTyxZQUFZLE1BQzlCLFlBQVk7QUFFNUIsb0JBQUUsQ0FBQyxJQUFJLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQUEsZ0JBQ2hEO0FBRUEsb0JBQUksS0FBTyxJQUFJLElBQU0sQ0FBQyxJQUFJO0FBQzFCLG9CQUFJLE1BQU8sSUFBSSxJQUFNLElBQUksSUFBTSxJQUFJO0FBRW5DLG9CQUFJLFVBQVcsS0FBSyxLQUFPLE1BQU0sTUFBUSxLQUFLLEtBQU8sTUFBTSxPQUFTLEtBQUssS0FBTyxNQUFNO0FBQ3RGLG9CQUFJLFVBQVcsS0FBSyxLQUFPLE1BQU0sTUFBUSxLQUFLLEtBQU8sTUFBTSxPQUFTLEtBQUssSUFBTyxNQUFNO0FBRXRGLG9CQUFJLEtBQUtDLEtBQUksU0FBUyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxvQkFBSSxLQUFLLFNBQVM7QUFFbEIsZ0JBQUFBLEtBQUk7QUFDSixvQkFBSTtBQUNKLG9CQUFJO0FBQ0osb0JBQUssSUFBSSxLQUFNO0FBQ2Ysb0JBQUk7QUFDSixvQkFBSTtBQUNKLG9CQUFJO0FBQ0osb0JBQUssS0FBSyxLQUFNO0FBQUEsY0FDcEI7QUFHQSxjQUFBRCxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksSUFBSztBQUNwQixjQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksSUFBSztBQUNwQixjQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksSUFBSztBQUNwQixjQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksSUFBSztBQUNwQixjQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksSUFBSztBQUNwQixjQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksSUFBSztBQUNwQixjQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksSUFBSztBQUNwQixjQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUlDLEtBQUs7QUFBQSxZQUN4QjtBQUFBLFlBRUEsYUFBYSxXQUFZO0FBRXJCLGtCQUFJLE9BQU8sS0FBSztBQUNoQixrQkFBSSxZQUFZLEtBQUs7QUFFckIsa0JBQUksYUFBYSxLQUFLLGNBQWM7QUFDcEMsa0JBQUksWUFBWSxLQUFLLFdBQVc7QUFHaEMsd0JBQVUsY0FBYyxDQUFDLEtBQUssT0FBUyxLQUFLLFlBQVk7QUFDeEQseUJBQWEsWUFBWSxPQUFRLEtBQU0sS0FBSyxFQUFFLElBQUlILE1BQUssTUFBTSxhQUFhLFVBQVc7QUFDckYseUJBQWEsWUFBWSxPQUFRLEtBQU0sS0FBSyxFQUFFLElBQUk7QUFDbEQsbUJBQUssV0FBVyxVQUFVLFNBQVM7QUFHbkMsbUJBQUssU0FBUztBQUdkLHFCQUFPLEtBQUs7QUFBQSxZQUNoQjtBQUFBLFlBRUEsT0FBTyxXQUFZO0FBQ2Ysa0JBQUksUUFBUSxPQUFPLE1BQU0sS0FBSyxJQUFJO0FBQ2xDLG9CQUFNLFFBQVEsS0FBSyxNQUFNLE1BQU07QUFFL0IscUJBQU87QUFBQSxZQUNYO0FBQUEsVUFDSixDQUFDO0FBZ0JELFlBQUUsU0FBUyxPQUFPLGNBQWMsTUFBTTtBQWdCdEMsWUFBRSxhQUFhLE9BQU8sa0JBQWtCLE1BQU07QUFBQSxRQUNsRCxHQUFFLElBQUk7QUFHTixlQUFPRCxVQUFTO0FBQUEsTUFFakIsQ0FBQztBQUFBO0FBQUE7OztBQ3RNRDtBQUFBO0FBQUMsT0FBQyxTQUFVLE1BQU0sU0FBUyxPQUFPO0FBQ2pDLFlBQUksT0FBTyxZQUFZLFVBQVU7QUFFaEMsaUJBQU8sVUFBVSxVQUFVLFFBQVEsZ0JBQW1CLGdCQUFtQjtBQUFBLFFBQzFFLFdBQ1MsT0FBTyxXQUFXLGNBQWMsT0FBTyxLQUFLO0FBRXBELGlCQUFPLENBQUMsVUFBVSxVQUFVLEdBQUcsT0FBTztBQUFBLFFBQ3ZDLE9BQ0s7QUFFSixrQkFBUSxLQUFLLFFBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0QsR0FBRSxTQUFNLFNBQVVLLFdBQVU7QUFFM0IsU0FBQyxXQUFZO0FBRVQsY0FBSSxJQUFJQTtBQUNSLGNBQUksUUFBUSxFQUFFO0FBQ2QsY0FBSSxZQUFZLE1BQU07QUFDdEIsY0FBSSxTQUFTLEVBQUU7QUFDZixjQUFJLFNBQVMsT0FBTztBQUtwQixjQUFJLFNBQVMsT0FBTyxTQUFTLE9BQU8sT0FBTztBQUFBLFlBQ3ZDLFVBQVUsV0FBWTtBQUNsQixtQkFBSyxRQUFRLElBQUksVUFBVSxLQUFLO0FBQUEsZ0JBQzVCO0FBQUEsZ0JBQVk7QUFBQSxnQkFBWTtBQUFBLGdCQUFZO0FBQUEsZ0JBQ3BDO0FBQUEsZ0JBQVk7QUFBQSxnQkFBWTtBQUFBLGdCQUFZO0FBQUEsY0FDeEMsQ0FBQztBQUFBLFlBQ0w7QUFBQSxZQUVBLGFBQWEsV0FBWTtBQUNyQixrQkFBSSxPQUFPLE9BQU8sWUFBWSxLQUFLLElBQUk7QUFFdkMsbUJBQUssWUFBWTtBQUVqQixxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKLENBQUM7QUFnQkQsWUFBRSxTQUFTLE9BQU8sY0FBYyxNQUFNO0FBZ0J0QyxZQUFFLGFBQWEsT0FBTyxrQkFBa0IsTUFBTTtBQUFBLFFBQ2xELEdBQUU7QUFHRixlQUFPQSxVQUFTO0FBQUEsTUFFakIsQ0FBQztBQUFBO0FBQUE7OztBQy9FRDtBQUFBO0FBQUMsT0FBQyxTQUFVLE1BQU0sU0FBUyxPQUFPO0FBQ2pDLFlBQUksT0FBTyxZQUFZLFVBQVU7QUFFaEMsaUJBQU8sVUFBVSxVQUFVLFFBQVEsZ0JBQW1CLGtCQUFxQjtBQUFBLFFBQzVFLFdBQ1MsT0FBTyxXQUFXLGNBQWMsT0FBTyxLQUFLO0FBRXBELGlCQUFPLENBQUMsVUFBVSxZQUFZLEdBQUcsT0FBTztBQUFBLFFBQ3pDLE9BQ0s7QUFFSixrQkFBUSxLQUFLLFFBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0QsR0FBRSxTQUFNLFNBQVVDLFdBQVU7QUFFM0IsU0FBQyxXQUFZO0FBRVQsY0FBSSxJQUFJQTtBQUNSLGNBQUksUUFBUSxFQUFFO0FBQ2QsY0FBSSxTQUFTLE1BQU07QUFDbkIsY0FBSSxRQUFRLEVBQUU7QUFDZCxjQUFJLFVBQVUsTUFBTTtBQUNwQixjQUFJLGVBQWUsTUFBTTtBQUN6QixjQUFJLFNBQVMsRUFBRTtBQUVmLG1CQUFTLGlCQUFpQjtBQUN0QixtQkFBTyxRQUFRLE9BQU8sTUFBTSxTQUFTLFNBQVM7QUFBQSxVQUNsRDtBQUdBLGNBQUksSUFBSTtBQUFBLFlBQ0osZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFNBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFNBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxTQUFVO0FBQUEsWUFDN0UsZUFBZSxXQUFZLFNBQVU7QUFBQSxZQUFHLGVBQWUsV0FBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFNBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFVBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsWUFDN0UsZUFBZSxZQUFZLFNBQVU7QUFBQSxZQUFHLGVBQWUsWUFBWSxVQUFVO0FBQUEsVUFDakY7QUFHQSxjQUFJLElBQUksQ0FBQztBQUNULFdBQUMsV0FBWTtBQUNULHFCQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUN6QixnQkFBRSxDQUFDLElBQUksZUFBZTtBQUFBLFlBQzFCO0FBQUEsVUFDSixHQUFFO0FBS0YsY0FBSSxTQUFTLE9BQU8sU0FBUyxPQUFPLE9BQU87QUFBQSxZQUN2QyxVQUFVLFdBQVk7QUFDbEIsbUJBQUssUUFBUSxJQUFJLGFBQWEsS0FBSztBQUFBLGdCQUMvQixJQUFJLFFBQVEsS0FBSyxZQUFZLFVBQVU7QUFBQSxnQkFBRyxJQUFJLFFBQVEsS0FBSyxZQUFZLFVBQVU7QUFBQSxnQkFDakYsSUFBSSxRQUFRLEtBQUssWUFBWSxVQUFVO0FBQUEsZ0JBQUcsSUFBSSxRQUFRLEtBQUssWUFBWSxVQUFVO0FBQUEsZ0JBQ2pGLElBQUksUUFBUSxLQUFLLFlBQVksVUFBVTtBQUFBLGdCQUFHLElBQUksUUFBUSxLQUFLLFlBQVksU0FBVTtBQUFBLGdCQUNqRixJQUFJLFFBQVEsS0FBSyxXQUFZLFVBQVU7QUFBQSxnQkFBRyxJQUFJLFFBQVEsS0FBSyxZQUFZLFNBQVU7QUFBQSxjQUNyRixDQUFDO0FBQUEsWUFDTDtBQUFBLFlBRUEsaUJBQWlCLFNBQVUsR0FBRyxRQUFRO0FBRWxDLGtCQUFJLElBQUksS0FBSyxNQUFNO0FBRW5CLGtCQUFJLEtBQUssRUFBRSxDQUFDO0FBQ1osa0JBQUksS0FBSyxFQUFFLENBQUM7QUFDWixrQkFBSSxLQUFLLEVBQUUsQ0FBQztBQUNaLGtCQUFJLEtBQUssRUFBRSxDQUFDO0FBQ1osa0JBQUksS0FBSyxFQUFFLENBQUM7QUFDWixrQkFBSSxLQUFLLEVBQUUsQ0FBQztBQUNaLGtCQUFJLEtBQUssRUFBRSxDQUFDO0FBQ1osa0JBQUksS0FBSyxFQUFFLENBQUM7QUFFWixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFDYixrQkFBSSxNQUFNLEdBQUc7QUFHYixrQkFBSSxLQUFLO0FBQ1Qsa0JBQUksS0FBSztBQUNULGtCQUFJLEtBQUs7QUFDVCxrQkFBSSxLQUFLO0FBQ1Qsa0JBQUksS0FBSztBQUNULGtCQUFJLEtBQUs7QUFDVCxrQkFBSSxLQUFLO0FBQ1Qsa0JBQUksS0FBSztBQUNULGtCQUFJLEtBQUs7QUFDVCxrQkFBSSxLQUFLO0FBQ1Qsa0JBQUksS0FBSztBQUNULGtCQUFJLEtBQUs7QUFDVCxrQkFBSSxLQUFLO0FBQ1Qsa0JBQUksS0FBSztBQUNULGtCQUFJLEtBQUs7QUFDVCxrQkFBSSxLQUFLO0FBR1QsdUJBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQ3pCLG9CQUFJO0FBQ0osb0JBQUk7QUFHSixvQkFBSSxLQUFLLEVBQUUsQ0FBQztBQUdaLG9CQUFJLElBQUksSUFBSTtBQUNSLHdCQUFNLEdBQUcsT0FBTyxFQUFFLFNBQVMsSUFBSSxDQUFDLElBQVE7QUFDeEMsd0JBQU0sR0FBRyxNQUFPLEVBQUUsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJO0FBQUEsZ0JBQzVDLE9BQU87QUFFSCxzQkFBSSxVQUFXLEVBQUUsSUFBSSxFQUFFO0FBQ3ZCLHNCQUFJLFdBQVcsUUFBUTtBQUN2QixzQkFBSSxXQUFXLFFBQVE7QUFDdkIsc0JBQUksV0FBYSxhQUFhLElBQU0sWUFBWSxPQUFTLGFBQWEsSUFBTSxZQUFZLE1BQVEsYUFBYTtBQUM3RyxzQkFBSSxXQUFhLGFBQWEsSUFBTSxZQUFZLE9BQVMsYUFBYSxJQUFNLFlBQVksT0FBUyxhQUFhLElBQU0sWUFBWTtBQUdoSSxzQkFBSSxVQUFXLEVBQUUsSUFBSSxDQUFDO0FBQ3RCLHNCQUFJLFdBQVcsUUFBUTtBQUN2QixzQkFBSSxXQUFXLFFBQVE7QUFDdkIsc0JBQUksV0FBYSxhQUFhLEtBQU8sWUFBWSxPQUFTLFlBQVksSUFBTSxhQUFhLE1BQVEsYUFBYTtBQUM5RyxzQkFBSSxXQUFhLGFBQWEsS0FBTyxZQUFZLE9BQVMsWUFBWSxJQUFNLGFBQWEsT0FBUyxhQUFhLElBQU0sWUFBWTtBQUdqSSxzQkFBSSxNQUFPLEVBQUUsSUFBSSxDQUFDO0FBQ2xCLHNCQUFJLE9BQU8sSUFBSTtBQUNmLHNCQUFJLE9BQU8sSUFBSTtBQUVmLHNCQUFJLE9BQVEsRUFBRSxJQUFJLEVBQUU7QUFDcEIsc0JBQUksUUFBUSxLQUFLO0FBQ2pCLHNCQUFJLFFBQVEsS0FBSztBQUVqQix3QkFBTSxVQUFVO0FBQ2hCLHdCQUFNLFVBQVUsUUFBUyxRQUFRLElBQU0sWUFBWSxJQUFLLElBQUk7QUFDNUQsd0JBQU0sTUFBTTtBQUNaLHdCQUFNLE1BQU0sV0FBWSxRQUFRLElBQU0sWUFBWSxJQUFLLElBQUk7QUFDM0Qsd0JBQU0sTUFBTTtBQUNaLHdCQUFNLE1BQU0sU0FBVSxRQUFRLElBQU0sVUFBVSxJQUFLLElBQUk7QUFFdkQscUJBQUcsT0FBTztBQUNWLHFCQUFHLE1BQU87QUFBQSxnQkFDZDtBQUVBLG9CQUFJLE1BQVEsS0FBSyxLQUFPLENBQUMsS0FBSztBQUM5QixvQkFBSSxNQUFRLEtBQUssS0FBTyxDQUFDLEtBQUs7QUFDOUIsb0JBQUksT0FBUSxLQUFLLEtBQU8sS0FBSyxLQUFPLEtBQUs7QUFDekMsb0JBQUksT0FBUSxLQUFLLEtBQU8sS0FBSyxLQUFPLEtBQUs7QUFFekMsb0JBQUksV0FBWSxPQUFPLEtBQU8sTUFBTSxNQUFTLE1BQU0sS0FBUSxPQUFPLE1BQVEsTUFBTSxLQUFPLE9BQU87QUFDOUYsb0JBQUksV0FBWSxPQUFPLEtBQU8sTUFBTSxNQUFTLE1BQU0sS0FBUSxPQUFPLE1BQVEsTUFBTSxLQUFPLE9BQU87QUFDOUYsb0JBQUksV0FBWSxPQUFPLEtBQU8sTUFBTSxPQUFTLE9BQU8sS0FBTyxNQUFNLE9BQVMsTUFBTSxLQUFPLE9BQU87QUFDOUYsb0JBQUksV0FBWSxPQUFPLEtBQU8sTUFBTSxPQUFTLE9BQU8sS0FBTyxNQUFNLE9BQVMsTUFBTSxLQUFPLE9BQU87QUFHOUYsb0JBQUksS0FBTSxFQUFFLENBQUM7QUFDYixvQkFBSSxNQUFNLEdBQUc7QUFDYixvQkFBSSxNQUFNLEdBQUc7QUFFYixvQkFBSSxNQUFNLEtBQUs7QUFDZixvQkFBSSxNQUFNLEtBQUssV0FBWSxRQUFRLElBQU0sT0FBTyxJQUFLLElBQUk7QUFDekQsb0JBQUksTUFBTSxNQUFNO0FBQ2hCLG9CQUFJLE1BQU0sTUFBTSxPQUFRLFFBQVEsSUFBTSxRQUFRLElBQUssSUFBSTtBQUN2RCxvQkFBSSxNQUFNLE1BQU07QUFDaEIsb0JBQUksTUFBTSxNQUFNLE9BQVEsUUFBUSxJQUFNLFFBQVEsSUFBSyxJQUFJO0FBQ3ZELG9CQUFJLE1BQU0sTUFBTTtBQUNoQixvQkFBSSxNQUFNLE1BQU0sT0FBUSxRQUFRLElBQU0sUUFBUSxJQUFLLElBQUk7QUFHdkQsb0JBQUksTUFBTSxVQUFVO0FBQ3BCLG9CQUFJLE1BQU0sVUFBVSxRQUFTLFFBQVEsSUFBTSxZQUFZLElBQUssSUFBSTtBQUdoRSxxQkFBSztBQUNMLHFCQUFLO0FBQ0wscUJBQUs7QUFDTCxxQkFBSztBQUNMLHFCQUFLO0FBQ0wscUJBQUs7QUFDTCxxQkFBTSxLQUFLLE1BQU87QUFDbEIscUJBQU0sS0FBSyxPQUFRLE9BQU8sSUFBTSxPQUFPLElBQUssSUFBSSxLQUFNO0FBQ3RELHFCQUFLO0FBQ0wscUJBQUs7QUFDTCxxQkFBSztBQUNMLHFCQUFLO0FBQ0wscUJBQUs7QUFDTCxxQkFBSztBQUNMLHFCQUFNLE1BQU0sTUFBTztBQUNuQixxQkFBTSxNQUFNLE9BQVEsT0FBTyxJQUFNLFFBQVEsSUFBSyxJQUFJLEtBQU07QUFBQSxjQUM1RDtBQUdBLG9CQUFNLEdBQUcsTUFBUSxNQUFNO0FBQ3ZCLGlCQUFHLE9BQVEsTUFBTSxNQUFPLFFBQVEsSUFBTSxPQUFPLElBQUssSUFBSTtBQUN0RCxvQkFBTSxHQUFHLE1BQVEsTUFBTTtBQUN2QixpQkFBRyxPQUFRLE1BQU0sTUFBTyxRQUFRLElBQU0sT0FBTyxJQUFLLElBQUk7QUFDdEQsb0JBQU0sR0FBRyxNQUFRLE1BQU07QUFDdkIsaUJBQUcsT0FBUSxNQUFNLE1BQU8sUUFBUSxJQUFNLE9BQU8sSUFBSyxJQUFJO0FBQ3RELG9CQUFNLEdBQUcsTUFBUSxNQUFNO0FBQ3ZCLGlCQUFHLE9BQVEsTUFBTSxNQUFPLFFBQVEsSUFBTSxPQUFPLElBQUssSUFBSTtBQUN0RCxvQkFBTSxHQUFHLE1BQVEsTUFBTTtBQUN2QixpQkFBRyxPQUFRLE1BQU0sTUFBTyxRQUFRLElBQU0sT0FBTyxJQUFLLElBQUk7QUFDdEQsb0JBQU0sR0FBRyxNQUFRLE1BQU07QUFDdkIsaUJBQUcsT0FBUSxNQUFNLE1BQU8sUUFBUSxJQUFNLE9BQU8sSUFBSyxJQUFJO0FBQ3RELG9CQUFNLEdBQUcsTUFBUSxNQUFNO0FBQ3ZCLGlCQUFHLE9BQVEsTUFBTSxNQUFPLFFBQVEsSUFBTSxPQUFPLElBQUssSUFBSTtBQUN0RCxvQkFBTSxHQUFHLE1BQVEsTUFBTTtBQUN2QixpQkFBRyxPQUFRLE1BQU0sTUFBTyxRQUFRLElBQU0sT0FBTyxJQUFLLElBQUk7QUFBQSxZQUMxRDtBQUFBLFlBRUEsYUFBYSxXQUFZO0FBRXJCLGtCQUFJLE9BQU8sS0FBSztBQUNoQixrQkFBSSxZQUFZLEtBQUs7QUFFckIsa0JBQUksYUFBYSxLQUFLLGNBQWM7QUFDcEMsa0JBQUksWUFBWSxLQUFLLFdBQVc7QUFHaEMsd0JBQVUsY0FBYyxDQUFDLEtBQUssT0FBUyxLQUFLLFlBQVk7QUFDeEQseUJBQWEsWUFBWSxRQUFTLE1BQU8sS0FBSyxFQUFFLElBQUksS0FBSyxNQUFNLGFBQWEsVUFBVztBQUN2Rix5QkFBYSxZQUFZLFFBQVMsTUFBTyxLQUFLLEVBQUUsSUFBSTtBQUNwRCxtQkFBSyxXQUFXLFVBQVUsU0FBUztBQUduQyxtQkFBSyxTQUFTO0FBR2Qsa0JBQUksT0FBTyxLQUFLLE1BQU0sTUFBTTtBQUc1QixxQkFBTztBQUFBLFlBQ1g7QUFBQSxZQUVBLE9BQU8sV0FBWTtBQUNmLGtCQUFJLFFBQVEsT0FBTyxNQUFNLEtBQUssSUFBSTtBQUNsQyxvQkFBTSxRQUFRLEtBQUssTUFBTSxNQUFNO0FBRS9CLHFCQUFPO0FBQUEsWUFDWDtBQUFBLFlBRUEsV0FBVyxPQUFLO0FBQUEsVUFDcEIsQ0FBQztBQWdCRCxZQUFFLFNBQVMsT0FBTyxjQUFjLE1BQU07QUFnQnRDLFlBQUUsYUFBYSxPQUFPLGtCQUFrQixNQUFNO0FBQUEsUUFDbEQsR0FBRTtBQUdGLGVBQU9BLFVBQVM7QUFBQSxNQUVqQixDQUFDO0FBQUE7QUFBQTs7O0FDclVEO0FBQUE7QUFBQyxPQUFDLFNBQVUsTUFBTSxTQUFTLE9BQU87QUFDakMsWUFBSSxPQUFPLFlBQVksVUFBVTtBQUVoQyxpQkFBTyxVQUFVLFVBQVUsUUFBUSxnQkFBbUIsb0JBQXVCLGdCQUFtQjtBQUFBLFFBQ2pHLFdBQ1MsT0FBTyxXQUFXLGNBQWMsT0FBTyxLQUFLO0FBRXBELGlCQUFPLENBQUMsVUFBVSxjQUFjLFVBQVUsR0FBRyxPQUFPO0FBQUEsUUFDckQsT0FDSztBQUVKLGtCQUFRLEtBQUssUUFBUTtBQUFBLFFBQ3RCO0FBQUEsTUFDRCxHQUFFLFNBQU0sU0FBVUMsV0FBVTtBQUUzQixTQUFDLFdBQVk7QUFFVCxjQUFJLElBQUlBO0FBQ1IsY0FBSSxRQUFRLEVBQUU7QUFDZCxjQUFJLFVBQVUsTUFBTTtBQUNwQixjQUFJLGVBQWUsTUFBTTtBQUN6QixjQUFJLFNBQVMsRUFBRTtBQUNmLGNBQUksU0FBUyxPQUFPO0FBS3BCLGNBQUksU0FBUyxPQUFPLFNBQVMsT0FBTyxPQUFPO0FBQUEsWUFDdkMsVUFBVSxXQUFZO0FBQ2xCLG1CQUFLLFFBQVEsSUFBSSxhQUFhLEtBQUs7QUFBQSxnQkFDL0IsSUFBSSxRQUFRLEtBQUssWUFBWSxVQUFVO0FBQUEsZ0JBQUcsSUFBSSxRQUFRLEtBQUssWUFBWSxTQUFVO0FBQUEsZ0JBQ2pGLElBQUksUUFBUSxLQUFLLFlBQVksU0FBVTtBQUFBLGdCQUFHLElBQUksUUFBUSxLQUFLLFdBQVksVUFBVTtBQUFBLGdCQUNqRixJQUFJLFFBQVEsS0FBSyxZQUFZLFVBQVU7QUFBQSxnQkFBRyxJQUFJLFFBQVEsS0FBSyxZQUFZLFVBQVU7QUFBQSxnQkFDakYsSUFBSSxRQUFRLEtBQUssWUFBWSxVQUFVO0FBQUEsZ0JBQUcsSUFBSSxRQUFRLEtBQUssWUFBWSxVQUFVO0FBQUEsY0FDckYsQ0FBQztBQUFBLFlBQ0w7QUFBQSxZQUVBLGFBQWEsV0FBWTtBQUNyQixrQkFBSSxPQUFPLE9BQU8sWUFBWSxLQUFLLElBQUk7QUFFdkMsbUJBQUssWUFBWTtBQUVqQixxQkFBTztBQUFBLFlBQ1g7QUFBQSxVQUNKLENBQUM7QUFnQkQsWUFBRSxTQUFTLE9BQU8sY0FBYyxNQUFNO0FBZ0J0QyxZQUFFLGFBQWEsT0FBTyxrQkFBa0IsTUFBTTtBQUFBLFFBQ2xELEdBQUU7QUFHRixlQUFPQSxVQUFTO0FBQUEsTUFFakIsQ0FBQztBQUFBO0FBQUE7OztBQ2xGRDtBQUFBO0FBQUMsT0FBQyxTQUFVLE1BQU0sU0FBUyxPQUFPO0FBQ2pDLFlBQUksT0FBTyxZQUFZLFVBQVU7QUFFaEMsaUJBQU8sVUFBVSxVQUFVLFFBQVEsZ0JBQW1CLGtCQUFxQjtBQUFBLFFBQzVFLFdBQ1MsT0FBTyxXQUFXLGNBQWMsT0FBTyxLQUFLO0FBRXBELGlCQUFPLENBQUMsVUFBVSxZQUFZLEdBQUcsT0FBTztBQUFBLFFBQ3pDLE9BQ0s7QUFFSixrQkFBUSxLQUFLLFFBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0QsR0FBRSxTQUFNLFNBQVVDLFdBQVU7QUFFM0IsU0FBQyxTQUFVQyxPQUFNO0FBRWIsY0FBSSxJQUFJRDtBQUNSLGNBQUksUUFBUSxFQUFFO0FBQ2QsY0FBSSxZQUFZLE1BQU07QUFDdEIsY0FBSSxTQUFTLE1BQU07QUFDbkIsY0FBSSxRQUFRLEVBQUU7QUFDZCxjQUFJLFVBQVUsTUFBTTtBQUNwQixjQUFJLFNBQVMsRUFBRTtBQUdmLGNBQUksY0FBYyxDQUFDO0FBQ25CLGNBQUksYUFBYyxDQUFDO0FBQ25CLGNBQUksa0JBQWtCLENBQUM7QUFHdkIsV0FBQyxXQUFZO0FBRVQsZ0JBQUksSUFBSSxHQUFHLElBQUk7QUFDZixxQkFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7QUFDekIsMEJBQVksSUFBSSxJQUFJLENBQUMsS0FBTSxJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUs7QUFFbkQsa0JBQUksT0FBTyxJQUFJO0FBQ2Ysa0JBQUksUUFBUSxJQUFJLElBQUksSUFBSSxLQUFLO0FBQzdCLGtCQUFJO0FBQ0osa0JBQUk7QUFBQSxZQUNSO0FBR0EscUJBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hCLHVCQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QiwyQkFBVyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQU0sSUFBSSxJQUFJLElBQUksS0FBSyxJQUFLO0FBQUEsY0FDeEQ7QUFBQSxZQUNKO0FBR0EsZ0JBQUksT0FBTztBQUNYLHFCQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUN6QixrQkFBSSxtQkFBbUI7QUFDdkIsa0JBQUksbUJBQW1CO0FBRXZCLHVCQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QixvQkFBSSxPQUFPLEdBQU07QUFDYixzQkFBSSxlQUFlLEtBQUssS0FBSztBQUM3QixzQkFBSSxjQUFjLElBQUk7QUFDbEIsd0NBQW9CLEtBQUs7QUFBQSxrQkFDN0IsT0FBb0M7QUFDaEMsd0NBQW9CLEtBQU0sY0FBYztBQUFBLGtCQUM1QztBQUFBLGdCQUNKO0FBR0Esb0JBQUksT0FBTyxLQUFNO0FBRWIseUJBQVEsUUFBUSxJQUFLO0FBQUEsZ0JBQ3pCLE9BQU87QUFDSCwyQkFBUztBQUFBLGdCQUNiO0FBQUEsY0FDSjtBQUVBLDhCQUFnQixDQUFDLElBQUksUUFBUSxPQUFPLGtCQUFrQixnQkFBZ0I7QUFBQSxZQUMxRTtBQUFBLFVBQ0osR0FBRTtBQUdGLGNBQUksSUFBSSxDQUFDO0FBQ1QsV0FBQyxXQUFZO0FBQ1QscUJBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQ3pCLGdCQUFFLENBQUMsSUFBSSxRQUFRLE9BQU87QUFBQSxZQUMxQjtBQUFBLFVBQ0osR0FBRTtBQUtGLGNBQUksT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBU25DLEtBQUssT0FBTyxJQUFJLE9BQU87QUFBQSxjQUNuQixjQUFjO0FBQUEsWUFDbEIsQ0FBQztBQUFBLFlBRUQsVUFBVSxXQUFZO0FBQ2xCLGtCQUFJLFFBQVEsS0FBSyxTQUFTLENBQUM7QUFDM0IsdUJBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQ3pCLHNCQUFNLENBQUMsSUFBSSxJQUFJLFFBQVEsS0FBSztBQUFBLGNBQ2hDO0FBRUEsbUJBQUssYUFBYSxPQUFPLElBQUksS0FBSyxJQUFJLGdCQUFnQjtBQUFBLFlBQzFEO0FBQUEsWUFFQSxpQkFBaUIsU0FBVSxHQUFHLFFBQVE7QUFFbEMsa0JBQUksUUFBUSxLQUFLO0FBQ2pCLGtCQUFJLGtCQUFrQixLQUFLLFlBQVk7QUFHdkMsdUJBQVMsSUFBSSxHQUFHLElBQUksaUJBQWlCLEtBQUs7QUFFdEMsb0JBQUksTUFBTyxFQUFFLFNBQVMsSUFBSSxDQUFDO0FBQzNCLG9CQUFJLE9BQU8sRUFBRSxTQUFTLElBQUksSUFBSSxDQUFDO0FBRy9CLHVCQUNPLE9BQU8sSUFBTyxRQUFRLE1BQU8sWUFDN0IsT0FBTyxLQUFPLFFBQVEsS0FBTztBQUVwQyx3QkFDTyxRQUFRLElBQU8sU0FBUyxNQUFPLFlBQy9CLFFBQVEsS0FBTyxTQUFTLEtBQU87QUFJdEMsb0JBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIscUJBQUssUUFBUTtBQUNiLHFCQUFLLE9BQVE7QUFBQSxjQUNqQjtBQUdBLHVCQUFTLFFBQVEsR0FBRyxRQUFRLElBQUksU0FBUztBQUVyQyx5QkFBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFFeEIsc0JBQUksT0FBTyxHQUFHLE9BQU87QUFDckIsMkJBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hCLHdCQUFJLE9BQU8sTUFBTSxJQUFJLElBQUksQ0FBQztBQUMxQiw0QkFBUSxLQUFLO0FBQ2IsNEJBQVEsS0FBSztBQUFBLGtCQUNqQjtBQUdBLHNCQUFJLEtBQUssRUFBRSxDQUFDO0FBQ1oscUJBQUcsT0FBTztBQUNWLHFCQUFHLE1BQU87QUFBQSxnQkFDZDtBQUNBLHlCQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUV4QixzQkFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUM7QUFDdkIsc0JBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDO0FBQ3ZCLHNCQUFJLFNBQVMsSUFBSTtBQUNqQixzQkFBSSxTQUFTLElBQUk7QUFHakIsc0JBQUksT0FBTyxJQUFJLFFBQVMsVUFBVSxJQUFNLFdBQVc7QUFDbkQsc0JBQUksT0FBTyxJQUFJLE9BQVMsVUFBVSxJQUFNLFdBQVc7QUFDbkQsMkJBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hCLHdCQUFJLE9BQU8sTUFBTSxJQUFJLElBQUksQ0FBQztBQUMxQix5QkFBSyxRQUFRO0FBQ2IseUJBQUssT0FBUTtBQUFBLGtCQUNqQjtBQUFBLGdCQUNKO0FBR0EseUJBQVMsWUFBWSxHQUFHLFlBQVksSUFBSSxhQUFhO0FBQ2pELHNCQUFJO0FBQ0osc0JBQUk7QUFHSixzQkFBSSxPQUFPLE1BQU0sU0FBUztBQUMxQixzQkFBSSxVQUFVLEtBQUs7QUFDbkIsc0JBQUksVUFBVSxLQUFLO0FBQ25CLHNCQUFJLFlBQVksWUFBWSxTQUFTO0FBR3JDLHNCQUFJLFlBQVksSUFBSTtBQUNoQiwyQkFBUSxXQUFXLFlBQWMsWUFBYSxLQUFLO0FBQ25ELDJCQUFRLFdBQVcsWUFBYyxZQUFhLEtBQUs7QUFBQSxrQkFDdkQsT0FBa0M7QUFDOUIsMkJBQVEsV0FBWSxZQUFZLEtBQVEsWUFBYSxLQUFLO0FBQzFELDJCQUFRLFdBQVksWUFBWSxLQUFRLFlBQWEsS0FBSztBQUFBLGtCQUM5RDtBQUdBLHNCQUFJLFVBQVUsRUFBRSxXQUFXLFNBQVMsQ0FBQztBQUNyQywwQkFBUSxPQUFPO0FBQ2YsMEJBQVEsTUFBTztBQUFBLGdCQUNuQjtBQUdBLG9CQUFJLEtBQUssRUFBRSxDQUFDO0FBQ1osb0JBQUksU0FBUyxNQUFNLENBQUM7QUFDcEIsbUJBQUcsT0FBTyxPQUFPO0FBQ2pCLG1CQUFHLE1BQU8sT0FBTztBQUdqQix5QkFBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFDeEIsMkJBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBRXhCLHdCQUFJLFlBQVksSUFBSSxJQUFJO0FBQ3hCLHdCQUFJLE9BQU8sTUFBTSxTQUFTO0FBQzFCLHdCQUFJLFFBQVEsRUFBRSxTQUFTO0FBQ3ZCLHdCQUFJLFVBQVUsR0FBSSxJQUFJLEtBQUssSUFBSyxJQUFJLENBQUM7QUFDckMsd0JBQUksVUFBVSxHQUFJLElBQUksS0FBSyxJQUFLLElBQUksQ0FBQztBQUdyQyx5QkFBSyxPQUFPLE1BQU0sT0FBUSxDQUFDLFFBQVEsT0FBTyxRQUFRO0FBQ2xELHlCQUFLLE1BQU8sTUFBTSxNQUFRLENBQUMsUUFBUSxNQUFPLFFBQVE7QUFBQSxrQkFDdEQ7QUFBQSxnQkFDSjtBQUdBLG9CQUFJLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLG9CQUFJLGdCQUFnQixnQkFBZ0IsS0FBSztBQUN6QyxxQkFBSyxRQUFRLGNBQWM7QUFDM0IscUJBQUssT0FBUSxjQUFjO0FBQUEsY0FDL0I7QUFBQSxZQUNKO0FBQUEsWUFFQSxhQUFhLFdBQVk7QUFFckIsa0JBQUksT0FBTyxLQUFLO0FBQ2hCLGtCQUFJLFlBQVksS0FBSztBQUNyQixrQkFBSSxhQUFhLEtBQUssY0FBYztBQUNwQyxrQkFBSSxZQUFZLEtBQUssV0FBVztBQUNoQyxrQkFBSSxnQkFBZ0IsS0FBSyxZQUFZO0FBR3JDLHdCQUFVLGNBQWMsQ0FBQyxLQUFLLEtBQVEsS0FBSyxZQUFZO0FBQ3ZELHlCQUFZQyxNQUFLLE1BQU0sWUFBWSxLQUFLLGFBQWEsSUFBSSxrQkFBbUIsS0FBSyxDQUFDLEtBQUs7QUFDdkYsbUJBQUssV0FBVyxVQUFVLFNBQVM7QUFHbkMsbUJBQUssU0FBUztBQUdkLGtCQUFJLFFBQVEsS0FBSztBQUNqQixrQkFBSSxvQkFBb0IsS0FBSyxJQUFJLGVBQWU7QUFDaEQsa0JBQUksb0JBQW9CLG9CQUFvQjtBQUc1QyxrQkFBSSxZQUFZLENBQUM7QUFDakIsdUJBQVMsSUFBSSxHQUFHLElBQUksbUJBQW1CLEtBQUs7QUFFeEMsb0JBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsb0JBQUksVUFBVSxLQUFLO0FBQ25CLG9CQUFJLFVBQVUsS0FBSztBQUduQiwyQkFDTyxXQUFXLElBQU8sWUFBWSxNQUFPLFlBQ3JDLFdBQVcsS0FBTyxZQUFZLEtBQU87QUFFNUMsMkJBQ08sV0FBVyxJQUFPLFlBQVksTUFBTyxZQUNyQyxXQUFXLEtBQU8sWUFBWSxLQUFPO0FBSTVDLDBCQUFVLEtBQUssT0FBTztBQUN0QiwwQkFBVSxLQUFLLE9BQU87QUFBQSxjQUMxQjtBQUdBLHFCQUFPLElBQUksVUFBVSxLQUFLLFdBQVcsaUJBQWlCO0FBQUEsWUFDMUQ7QUFBQSxZQUVBLE9BQU8sV0FBWTtBQUNmLGtCQUFJLFFBQVEsT0FBTyxNQUFNLEtBQUssSUFBSTtBQUVsQyxrQkFBSSxRQUFRLE1BQU0sU0FBUyxLQUFLLE9BQU8sTUFBTSxDQUFDO0FBQzlDLHVCQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUN6QixzQkFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsTUFBTTtBQUFBLGNBQzlCO0FBRUEscUJBQU87QUFBQSxZQUNYO0FBQUEsVUFDSixDQUFDO0FBZ0JELFlBQUUsT0FBTyxPQUFPLGNBQWMsSUFBSTtBQWdCbEMsWUFBRSxXQUFXLE9BQU8sa0JBQWtCLElBQUk7QUFBQSxRQUM5QyxHQUFFLElBQUk7QUFHTixlQUFPRCxVQUFTO0FBQUEsTUFFakIsQ0FBQztBQUFBO0FBQUE7OztBQ3JVRDtBQUFBO0FBQUMsT0FBQyxTQUFVLE1BQU0sU0FBUztBQUMxQixZQUFJLE9BQU8sWUFBWSxVQUFVO0FBRWhDLGlCQUFPLFVBQVUsVUFBVSxRQUFRLGNBQWlCO0FBQUEsUUFDckQsV0FDUyxPQUFPLFdBQVcsY0FBYyxPQUFPLEtBQUs7QUFFcEQsaUJBQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTztBQUFBLFFBQzNCLE9BQ0s7QUFFSixrQkFBUSxLQUFLLFFBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0QsR0FBRSxTQUFNLFNBQVVFLFdBQVU7QUFhM0IsU0FBQyxTQUFVQyxPQUFNO0FBRWIsY0FBSSxJQUFJRDtBQUNSLGNBQUksUUFBUSxFQUFFO0FBQ2QsY0FBSSxZQUFZLE1BQU07QUFDdEIsY0FBSSxTQUFTLE1BQU07QUFDbkIsY0FBSSxTQUFTLEVBQUU7QUFHZixjQUFJLE1BQU0sVUFBVSxPQUFPO0FBQUEsWUFDdkI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUMzRDtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQzVEO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFDM0Q7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUM1RDtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFVBQUUsQ0FBQztBQUNsRSxjQUFJLE1BQU0sVUFBVSxPQUFPO0FBQUEsWUFDdkI7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUMzRDtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQzVEO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFDNUQ7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUMzRDtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFVBQUUsQ0FBQztBQUNuRSxjQUFJLE1BQU0sVUFBVSxPQUFPO0FBQUEsWUFDdEI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUM5RDtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQzNEO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFDM0Q7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUM5RDtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFVBQUUsQ0FBQztBQUNuRSxjQUFJLE1BQU0sVUFBVSxPQUFPO0FBQUEsWUFDdkI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUM1RDtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQzNEO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFDNUQ7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlB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QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDNUI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsVUFDaEM7QUFHQSxjQUFJLE1BQU07QUFBQSxZQUNOO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUNwQjtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDcEI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQ3BCO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUNwQjtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFDcEI7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQ3BCO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUNwQjtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsVUFDeEI7QUFHQSxjQUFJLGFBQWEsQ0FBQyxHQUFJLEdBQUksR0FBSSxHQUFJLEdBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBR2hGLGNBQUksU0FBUztBQUFBLFlBQ1Q7QUFBQSxjQUNJLEdBQUs7QUFBQSxjQUNMLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFdBQVc7QUFBQSxjQUNYLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLEdBQUs7QUFBQSxjQUNMLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFdBQVc7QUFBQSxjQUNYLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxjQUNaLFlBQVk7QUFBQSxZQUNoQjtBQUFBLFlBQ0E7QUFBQSxjQUNJLEdBQUs7QUFBQSxjQUNMLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFNBQVU7QUFBQSxjQUNWLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVc7QUFBQSxjQUNYLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxjQUNaLFdBQVk7QUFBQSxZQUNoQjtBQUFBLFlBQ0E7QUFBQSxjQUNJLEdBQUs7QUFBQSxjQUNMLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFFBQVM7QUFBQSxjQUNULFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFNBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQSxjQUNWLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxjQUNYLFVBQVc7QUFBQSxZQUNmO0FBQUEsWUFDQTtBQUFBLGNBQ0ksR0FBSztBQUFBLGNBQ0wsT0FBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsT0FBUTtBQUFBLGNBQ1IsT0FBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsUUFBUztBQUFBLGNBQ1QsU0FBUztBQUFBLGNBQ1QsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLGNBQ1YsU0FBVTtBQUFBLFlBQ2Q7QUFBQSxZQUNBO0FBQUEsY0FDSSxHQUFLO0FBQUEsY0FDTCxNQUFRO0FBQUEsY0FDUixNQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixNQUFPO0FBQUEsY0FDUCxNQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFRO0FBQUEsY0FDUixPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxPQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsY0FDVCxRQUFTO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxjQUNJLEdBQUs7QUFBQSxjQUNMLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLEtBQU07QUFBQSxjQUNOLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLEtBQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQU87QUFBQSxjQUNQLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxjQUNSLE1BQVE7QUFBQSxZQUNaO0FBQUEsWUFDQTtBQUFBLGNBQ0ksR0FBSztBQUFBLGNBQ0wsSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sR0FBSztBQUFBLGNBQ0wsSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sSUFBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTTtBQUFBLGNBQ04sS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLGNBQ1AsS0FBTztBQUFBLFlBQ1g7QUFBQSxZQUNBO0FBQUEsY0FDSSxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxHQUFLO0FBQUEsY0FDTCxJQUFLO0FBQUEsY0FDTCxJQUFLO0FBQUEsY0FDTCxJQUFLO0FBQUEsY0FDTCxJQUFLO0FBQUEsY0FDTCxJQUFLO0FBQUEsY0FDTCxJQUFLO0FBQUEsY0FDTCxZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixJQUFNO0FBQUEsY0FDTixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixZQUFZO0FB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QUFLO0FBQ2IsZ0JBQUlBLEtBQUksS0FBSztBQUdiLHFCQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QixpQkFBRyxDQUFDLElBQUlBLEdBQUUsQ0FBQztBQUFBLFlBQ2Y7QUFHQSxZQUFBQSxHQUFFLENBQUMsSUFBS0EsR0FBRSxDQUFDLElBQUksYUFBYSxLQUFLLEtBQU07QUFDdkMsWUFBQUEsR0FBRSxDQUFDLElBQUtBLEdBQUUsQ0FBQyxJQUFJLGNBQWVBLEdBQUUsQ0FBQyxNQUFNLElBQU0sR0FBRyxDQUFDLE1BQU0sSUFBSyxJQUFJLEtBQU07QUFDdEUsWUFBQUEsR0FBRSxDQUFDLElBQUtBLEdBQUUsQ0FBQyxJQUFJLGFBQWVBLEdBQUUsQ0FBQyxNQUFNLElBQU0sR0FBRyxDQUFDLE1BQU0sSUFBSyxJQUFJLEtBQU07QUFDdEUsWUFBQUEsR0FBRSxDQUFDLElBQUtBLEdBQUUsQ0FBQyxJQUFJLGNBQWVBLEdBQUUsQ0FBQyxNQUFNLElBQU0sR0FBRyxDQUFDLE1BQU0sSUFBSyxJQUFJLEtBQU07QUFDdEUsWUFBQUEsR0FBRSxDQUFDLElBQUtBLEdBQUUsQ0FBQyxJQUFJLGNBQWVBLEdBQUUsQ0FBQyxNQUFNLElBQU0sR0FBRyxDQUFDLE1BQU0sSUFBSyxJQUFJLEtBQU07QUFDdEUsWUFBQUEsR0FBRSxDQUFDLElBQUtBLEdBQUUsQ0FBQyxJQUFJLGFBQWVBLEdBQUUsQ0FBQyxNQUFNLElBQU0sR0FBRyxDQUFDLE1BQU0sSUFBSyxJQUFJLEtBQU07QUFDdEUsWUFBQUEsR0FBRSxDQUFDLElBQUtBLEdBQUUsQ0FBQyxJQUFJLGNBQWVBLEdBQUUsQ0FBQyxNQUFNLElBQU0sR0FBRyxDQUFDLE1BQU0sSUFBSyxJQUFJLEtBQU07QUFDdEUsWUFBQUEsR0FBRSxDQUFDLElBQUtBLEdBQUUsQ0FBQyxJQUFJLGNBQWVBLEdBQUUsQ0FBQyxNQUFNLElBQU0sR0FBRyxDQUFDLE1BQU0sSUFBSyxJQUFJLEtBQU07QUFDdEUsaUJBQUssS0FBTUEsR0FBRSxDQUFDLE1BQU0sSUFBTSxHQUFHLENB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Y0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLFlBQWE7QUFBQSxZQUNyRDtBQUFBLGNBQUk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxZQUFhO0FBQUEsWUFDckQ7QUFBQSxjQUFJO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsWUFBWTtBQUFBLFlBQ3BEO0FBQUEsY0FBSTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQ3BDO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEsY0FDcEM7QUFBQSxjQUFZO0FBQUEsY0FBWTtBQUFBLGNBQVk7QUFBQSxjQUNwQztBQUFBLGNBQVk7QUFBQSxjQUFZO0FBQUEs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QUFXLEdBQUU7QUFDdkIsY0FBTSxZQUFZO0FBQUEsTUFDdEI7QUFDQSxZQUFNLFVBQVUsTUFBTSxNQUFNLEdBQUk7QUFDaEMsVUFBRyxNQUFNLEtBQUssV0FBVyxHQUFFO0FBQ3ZCLGVBQU8sUUFBUSxJQUFJLDhGQUFtQjtBQUFBLE1BQzFDLFdBQVMsTUFBTSxLQUFLLFNBQVMsZ0NBQU8sR0FBRTtBQUNuQyxlQUFPLFNBQVMsT0FBTyxrQkFBQyxrQkFBYSxHQUFJLElBQUk7QUFBQSxNQUNoRDtBQUNBLGVBQVMsT0FBTyxrQkFBQyxZQUFTLFVBQVUsTUFBTSxNQUFLLEdBQUksSUFBSTtBQUV2RCxZQUFNLFVBQVUsTUFBTSxNQUFNLEdBQUc7QUFDL0IsZUFBUyxjQUFjLCtCQUErQixFQUFFLGlCQUFpQixTQUFTLFNBQVMsT0FBbUI7QUFDMUcsY0FBTSxTQUFTLE1BQU07QUFDckIsY0FBTSxNQUFNLE9BQU8sYUFBYSxVQUFVO0FBQzFDLGdCQUFRLElBQUksR0FBRztBQUNmLFlBQUcsU0FBUyxlQUFlLGNBQWMsR0FBRTtBQUN2QyxtQkFBUyxlQUFlLGNBQWMsRUFBRSxPQUFPO0FBQUEsUUFDbkQ7QUFDQSxjQUFNLGVBQWUsU0FBUyxlQUFlLFFBQVE7QUFDckQsY0FBTSxrQkFBa0IsU0FBUyxjQUFjLEtBQUs7QUFDcEQscUJBQWEsWUFBWSxlQUFlO0FBQ3hDLGFBQUssTUFBTSxVQUFVO0FBQ3JCLGlCQUFTLE9BQU8sa0JBQUMsZUFBWSxLQUFVLFFBQVEsTUFBTSxNQUFNLEdBQUksZUFBZTtBQUFBLE1BQ2xGLENBQUM7QUFBQSxJQUNMLENBQUM7QUFBQSxFQUNMLENBQUM7IiwKICAibmFtZXMiOiBbIkNyeXB0b0pTIiwgIk1hdGgiLCAidW5kZWZpbmVkIiwgIkNyeXB0b0pTIiwgInVuZGVmaW5lZCIsICJDcnlwdG9KUyIsICJDcnlwdG9KUyIsICJDcnlwdG9KUyIsICJDcnlwdG9KUyIsICJDcnlwdG9KUyIsICJNYXRoIiwgIkNyeXB0b0pTIiwgIkNyeXB0b0pTIiwgIk1hdGgiLCAibiIsICJIIiwgImgiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiTWF0aCIsICJDcnlwdG9KUyIsICJNYXRoIiwgIkNyeXB0b0pTIiwgIkNyeXB0b0pTIiwgIkNyeXB0b0pTIiwgIkNyeXB0b0pTIiwgInVuZGVmaW5lZCIsICJDQkMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAiQ3J5cHRvSlMiLCAidW5kZWZpbmVkIiwgIkNyeXB0b0pTIiwgIlNVQl9NSVhfMCIsICJTVUJfTUlYXzEiLCAiU1VCX01JWF8yIiwgIlNVQl9NSVhfMyIsICJTQk9YIiwgIkNyeXB0b0pTIiwgIkNyeXB0b0pTIiwgIkNyeXB0b0pTIiwgIkMiLCAiQ3J5cHRvSlMiLCAiQyIsICJDcnlwdG9KUyIsICJDcnlwdG9KUyIsICJDcnlwdG9KUyIsICJjdXJyZW50VHJhY2siXQp9Cg==
