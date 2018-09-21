(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-------------------------------------------------------
//
// CountryInfo
//
//-------------------------------------------- YuMaeda --
var CountryInfo = function () {
    function CountryInfo() {
        _classCallCheck(this, CountryInfo);

        if (!CountryInfo.instance) {
            this.m_jpnNameHash = {
                'France': 'フランス',
                'Austria': 'オーストリア',
                'Italy': 'イタリア',
                'Germany': 'ドイツ',
                'Japan': '日本',
                'Australia': 'オーストラリア',
                'Portugal': 'ポルトガル',
                'United States': 'アメリカ合衆国',
                'New Zealand': 'ニュージーランド',
                'South Africa': '南アフリカ',
                'Spain': 'スペイン',
                'Croatia': 'クロアチア',
                'Argentina': 'アルゼンチン',
                'Hungary': 'ハンガリー',
                'United Kingdom': 'イギリス',
                'Rumania': 'ルーマニア',
                'Costa Rica': 'コスタリカ',
                'Colombia': 'コロンビア',
                'Uyghur Turpan': 'ウイグル・トルファン',
                'India': 'インド',
                'Malawi': 'マラウイ共和国',
                'Turkey': 'トルコ',
                'Canada': 'カナダ',
                'Ukraine': 'ウクライナ',
                'Switzerland': 'スイス',
                'Bulgaria': 'ブルガリア',
                'Lebanon': 'レバノン',
                'Chile': 'チリ',
                'Taiwan': '台湾',
                'Moldova': 'モルドヴァ',
                'Greece': 'ギリシャ'
            };

            CountryInfo.instance = this;
        }

        return CountryInfo.instance;
    }

    _createClass(CountryInfo, [{
        key: 'getJpnName',
        value: function getJpnName(strKey) {
            return this.m_jpnNameHash[strKey];
        }
    }, {
        key: 'getCountryAsInt',
        value: function getCountryAsInt(strKey) {
            var i = 1,
                iFound = 0;

            for (var hashKey in this.m_jpnNameHash) {
                if (hashKey == strKey) {
                    iFound = i;
                }

                ++i;
            }

            return iFound;
        }
    }, {
        key: 'getImgName',
        value: function getImgName(strKey) {
            return strKey.toLowerCase().replace(/\s/g, '_');
        }
    }, {
        key: 'getImgFileName',
        value: function getImgFileName(strKey) {
            return this.getImgName(strKey) + '.png';
        }
    }, {
        key: 'getImgCssName',
        value: function getImgCssName(strKey) {
            return this.getImgName(strKey) + 'Img';
        }
    }]);

    return CountryInfo;
}();

var instance = new CountryInfo();
Object.freeze(instance);

exports.default = instance;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _html_tags = require('./html_tags');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

jQuery.fn.center = function () {
    this.css('position', 'absolute');
    this.css('top', ($(window).height() - this.height()) / 2 + $(window).scrollTop() + 'px');
    this.css('left', ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + 'px');

    return this;
};

//-------------------------------------------------------
//
// ModalWindow.js
//
// [External Dependencies: jquery.js]
//
//-------------------------------------------- YuMaeda --

var ModalWindow = function () {
    function ModalWindow(fShowComment) {
        _classCallCheck(this, ModalWindow);

        if (!ModalWindow.instance) {
            this.$m_backgroundPane = $('<div id="background-pane"></div>');
            this.$m_dialogPane = $('<div id="dialog-pane"></div>');
            this.$m_commentPane = null;

            this.$m_backgroundPane.appendTo($('body'));
            this.$m_dialogPane.insertAfter(this.$m_backgroundPane);

            if (fShowComment) {
                this.$m_commentPane = $('<div id="comment-pane"></div>');
                this.$m_commentPane.insertAfter(this.$m_dialogPane);
            }

            ModalWindow.instance = this;
        }

        return ModalWindow.instance;
    }

    _createClass(ModalWindow, [{
        key: '_onClose',
        value: function _onClose() {
            var self = this;

            $('table#dialog-table').on('click', 'span#close-btn', function () {
                self.$m_backgroundPane.fadeOut('slow');
                self.$m_dialogPane.fadeOut('slow');
                if (self.$m_commentPane) {
                    self.$m_commentPane.fadeOut('slow');
                }

                // Re-enable scrollbar.
                $('body').css('overflow', 'auto');

                // Re-enable arrow keys.
                $(document).unbind('keydown');
            });
        }
    }, {
        key: '_toggleComment',
        value: function _toggleComment() {
            this.$m_commentPane.slideToggle('slow');
        }
    }, {
        key: '_setCommentBottom',
        value: function _setCommentBottom() {
            var intPadding = ($(window).height() - this.$m_dialogPane.height()) / 2;
            this.$m_commentPane.css('bottom', intPadding - $(window).scrollTop() + 'px');
        }
    }, {
        key: 'show',
        value: function show(strHtml, strComment) {
            var tableTag = new _html_tags.TableTag(),
                closeBtnRow = new _html_tags.TableRow(),
                contentsRow = new _html_tags.TableRow();

            tableTag.addAttr('id', 'dialog-table');
            closeBtnRow.addColumn(new _html_tags.TableColumn('<span id="close-btn">x</span>'));
            contentsRow.addColumn(new _html_tags.TableColumn(strHtml));
            tableTag.head.addRow(closeBtnRow);
            tableTag.body.addRow(contentsRow);

            var innerDialog = new _html_tags.DivTag(tableTag.toHtml());
            innerDialog.addAttr('id', 'inner-dialog-pane');

            var outerDialog = new _html_tags.DivTag(innerDialog.toHtml());
            outerDialog.addAttr('id', 'outer-dialog-pane');

            this.$m_backgroundPane.css({ 'opacity': '0.7' }).center().fadeIn('slow');
            this.$m_dialogPane.html(outerDialog.toHtml()).center().fadeIn('slow');

            this._onClose();

            if (this.$m_commentPane) {
                this.$m_dialogPane.find('div#inner-dialog-pane').click(this._toggleComment);

                this._setCommentBottom();
                this.$m_commentPane.html('<p>' + strComment + '</p>').fadeIn('slow');
            }

            // Hide scrollbar while the window is shown.
            $('body').css('overflow', 'hidden');

            // Temporarily disable arrow keys.
            $(document).keydown(function (e) {
                switch (e.keyCode) {
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        e.preventDefault();
                        break;
                    default:
                        break;
                }
            });
        }
    }]);

    return ModalWindow;
}();

var instance = new ModalWindow(false);
Object.freeze(instance);

exports.default = instance;

},{"./html_tags":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-------------------------------------------------------
//
// UrlQuery
//
//-------------------------------------------- YuMaeda --
var UrlQuery = function () {
    function UrlQuery() {
        _classCallCheck(this, UrlQuery);

        if (!UrlQuery.instance) {
            this._init();

            UrlQuery.instance = this;
        }

        return UrlQuery.instance;
    }

    _createClass(UrlQuery, [{
        key: '_init',
        value: function _init() {
            // Get a URL query string w/o '?'.
            var strSearch = window.location.search,
                strQuery = strSearch && strSearch.length > 1 ? decodeURI(window.location.search.substring(1)) : '';

            if (strQuery) {
                this.m_queryStringHash = {};

                var rgstrKeyValue = strQuery.split('&'),
                    cKeyValue = rgstrKeyValue.length,
                    strKeyValue = '',
                    ichEqual = -1,
                    strKey = '';

                for (var i = 0; i < cKeyValue; ++i) {
                    strKeyValue = rgstrKeyValue[i];
                    ichEqual = strKeyValue.indexOf('=');

                    if (ichEqual === -1) {
                        // Query string such as www.bobskitchen.com?id=2&menu 
                        this.m_queryStringHash[strKeyValue] = '';
                    } else {
                        strKey = strKeyValue.substring(0, ichEqual);
                        if (ichEqual < strKeyValue.length - 1) {
                            this.m_queryStringHash[strKey] = strKeyValue.substr(ichEqual + 1);
                        } else {
                            // Query string such as www.bobskitchen.com?id=2&menu= 
                            this.m_queryStringHash[strKey] = '';
                        }
                    }
                }
            }
        }
    }, {
        key: 'getValue',
        value: function getValue(strKey) {
            var strValue = '';

            if (this.m_queryStringHash != null && this.m_queryStringHash.hasOwnProperty(strKey)) {
                strValue = this.m_queryStringHash[strKey];
            }

            return strValue;
        }
    }]);

    return UrlQuery;
}();

var instance = new UrlQuery();
Object.freeze(instance);

exports.default = instance;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-------------------------------------------------------
//
// HtmlTag
//
//-------------------------------------------- YuMaeda --
var HtmlTag = function () {
    function HtmlTag(strTag, strValue) {
        _classCallCheck(this, HtmlTag);

        this.m_strTag = strTag;
        this.m_strValue = strValue;
        this.m_rgobjAttr = [];
        this.m_rgstrClass = [];
        this.m_fContainer = false;
        this.m_fEndTag = true;
    }

    _createClass(HtmlTag, [{
        key: '_generateClassAttribute',
        value: function _generateClassAttribute() {
            var html = '',
                cClass = this.m_rgstrClass ? this.m_rgstrClass.length : 0,
                strClass = '';

            if (cClass > 0) {
                html += 'class="';

                for (var i = 0; i < cClass; ++i) {
                    strClass = this.m_rgstrClass[i];
                    if (strClass && strClass.length > 0) {
                        html += strClass;
                    }

                    if (i < cClass - 1) {
                        html += ' ';
                    }
                }

                html += '"';
            }

            return html;
        }
    }, {
        key: '_generateBeginTag',
        value: function _generateBeginTag() {
            var html = '';

            if (this.m_strTag && this.m_strTag.length > 0) {
                html = '<' + this.m_strTag;

                // Adds class attributes.
                var strClassAttr = this._generateClassAttribute();
                if (strClassAttr !== '') {
                    html += ' ' + strClassAttr;
                }

                var cAttr = this.m_rgobjAttr ? this.m_rgobjAttr.length : 0,
                    objAttr = null;

                for (var i = 0; i < cAttr; ++i) {
                    objAttr = this.m_rgobjAttr[i];
                    if (objAttr.value && objAttr.key !== 'class') {
                        html += ' ' + objAttr.key + '="' + objAttr.value + '"';
                    }
                }

                if (!this.m_fEndTag) {
                    html += ' />';
                } else {
                    html += '>';
                }
            }

            return html;
        }
    }, {
        key: '_generateEndTag',
        value: function _generateEndTag() {
            return '</' + this.m_strTag + '>';
        }
    }, {
        key: 'addAttr',
        value: function addAttr(strKey, strValue) {
            // strKey cannot be an empty string, but strValue can.
            if (strKey && strKey.length > 0 && strValue) {
                this.m_rgobjAttr.push({ key: strKey, value: strValue });
            }
        }
    }, {
        key: 'addClass',
        value: function addClass(strClass) {
            if (strClass && strClass.length > 0) {
                this.m_rgstrClass.push(strClass);
            }
        }
    }, {
        key: 'toHtml',
        value: function toHtml() {
            if (!this.m_fEndTag && this.m_strValue) {
                this.m_rgobjAttr.push({ key: 'value', value: this.m_strValue });
            }

            var html = this._generateBeginTag(this.m_strTag, this.m_fEndTag, this.m_attrs, this.classes);

            if (this.m_fEndTag) {
                html += this.m_strValue + this._generateEndTag(this.m_strTag);
            }

            return html;
        }
    }]);

    return HtmlTag;
}();

//-------------------------------------------------------
//
// AnchorTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var AnchorTag = exports.AnchorTag = function (_HtmlTag) {
    _inherits(AnchorTag, _HtmlTag);

    function AnchorTag(strUrl, strInnerHtml) {
        _classCallCheck(this, AnchorTag);

        var _this = _possibleConstructorReturn(this, (AnchorTag.__proto__ || Object.getPrototypeOf(AnchorTag)).call(this, 'a', strInnerHtml));

        _get(AnchorTag.prototype.__proto__ || Object.getPrototypeOf(AnchorTag.prototype), 'addAttr', _this).call(_this, 'href', strUrl);
        return _this;
    }

    return AnchorTag;
}(HtmlTag);

//-------------------------------------------------------
//
// ButtonTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var ButtonTag = exports.ButtonTag = function (_HtmlTag2) {
    _inherits(ButtonTag, _HtmlTag2);

    function ButtonTag(strId, strCaption) {
        _classCallCheck(this, ButtonTag);

        var _this2 = _possibleConstructorReturn(this, (ButtonTag.__proto__ || Object.getPrototypeOf(ButtonTag)).call(this, 'button', strCaption));

        _get(ButtonTag.prototype.__proto__ || Object.getPrototypeOf(ButtonTag.prototype), 'addAttr', _this2).call(_this2, 'id', strId);
        return _this2;
    }

    return ButtonTag;
}(HtmlTag);

//-------------------------------------------------------
//
// DivTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var DivTag = exports.DivTag = function (_HtmlTag3) {
    _inherits(DivTag, _HtmlTag3);

    function DivTag(strInnerHtml) {
        _classCallCheck(this, DivTag);

        var _this3 = _possibleConstructorReturn(this, (DivTag.__proto__ || Object.getPrototypeOf(DivTag)).call(this, 'div', strInnerHtml));

        _this3.m_fContainer = true;
        return _this3;
    }

    return DivTag;
}(HtmlTag);

//-------------------------------------------------------
//
// ImageTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var ImageTag = exports.ImageTag = function (_HtmlTag4) {
    _inherits(ImageTag, _HtmlTag4);

    function ImageTag(strUrl) {
        _classCallCheck(this, ImageTag);

        var _this4 = _possibleConstructorReturn(this, (ImageTag.__proto__ || Object.getPrototypeOf(ImageTag)).call(this, 'img', ''));

        _get(ImageTag.prototype.__proto__ || Object.getPrototypeOf(ImageTag.prototype), 'addAttr', _this4).call(_this4, 'src', strUrl);

        _this4.m_fEndTag = false;
        return _this4;
    }

    return ImageTag;
}(HtmlTag);

//-------------------------------------------------------
//
// FigureTag
//
// [Dependencies]
//     htmltag.js
//     imgtag.js
//
//-------------------------------------------- YuMaeda --


var FigureTag = exports.FigureTag = function (_HtmlTag5) {
    _inherits(FigureTag, _HtmlTag5);

    function FigureTag(strUrl, strCaption) {
        _classCallCheck(this, FigureTag);

        var _this5 = _possibleConstructorReturn(this, (FigureTag.__proto__ || Object.getPrototypeOf(FigureTag)).call(this, 'figure', ''));

        _this5.m_objImgTag = new ImgTag(strUrl);
        _this5.m_objCaption = new HtmlTag('figcaption', strCaption);
        return _this5;
    }

    _createClass(FigureTag, [{
        key: 'toHtml',
        value: function toHtml() {
            this.m_strValue = this.m_objImgTag.toHtml() + this.m_objCaption.toHtml();

            return _get(FigureTag.prototype.__proto__ || Object.getPrototypeOf(FigureTag.prototype), 'toHtml', this).call(this);
        }
    }, {
        key: 'image',
        get: function get() {
            return this.m_objImgTag;
        }
    }, {
        key: 'caption',
        get: function get() {
            return this.m_objCaption;
        }
    }]);

    return FigureTag;
}(HtmlTag);

//-------------------------------------------------------
//
// InputTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var InputTag = exports.InputTag = function (_HtmlTag6) {
    _inherits(InputTag, _HtmlTag6);

    function InputTag(strName, strType, strValue) {
        _classCallCheck(this, InputTag);

        var _this6 = _possibleConstructorReturn(this, (InputTag.__proto__ || Object.getPrototypeOf(InputTag)).call(this, 'input', strValue));

        if (strName && strName.length > 0) {
            _get(InputTag.prototype.__proto__ || Object.getPrototypeOf(InputTag.prototype), 'addAttr', _this6).call(_this6, 'name', strName);
        }

        if (strType && strType.length > 0) {
            _get(InputTag.prototype.__proto__ || Object.getPrototypeOf(InputTag.prototype), 'addAttr', _this6).call(_this6, 'type', strType);
        }

        _this6.m_fEndTag = false;
        return _this6;
    }

    return InputTag;
}(HtmlTag);

//-------------------------------------------------------
//
// LabelTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var LabelTag = exports.LabelTag = function (_HtmlTag7) {
    _inherits(LabelTag, _HtmlTag7);

    function LabelTag(strFor, strInnerHtml) {
        _classCallCheck(this, LabelTag);

        var _this7 = _possibleConstructorReturn(this, (LabelTag.__proto__ || Object.getPrototypeOf(LabelTag)).call(this, 'label', strInnerHtml));

        if (strFor && strFor.length > 0) {
            _get(LabelTag.prototype.__proto__ || Object.getPrototypeOf(LabelTag.prototype), 'addAttr', _this7).call(_this7, 'for', strFor);
        }
        return _this7;
    }

    return LabelTag;
}(HtmlTag);

//-------------------------------------------------------
//
// ListItemTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var ListItemTag = exports.ListItemTag = function (_HtmlTag8) {
    _inherits(ListItemTag, _HtmlTag8);

    function ListItemTag(strInnerHtml) {
        _classCallCheck(this, ListItemTag);

        return _possibleConstructorReturn(this, (ListItemTag.__proto__ || Object.getPrototypeOf(ListItemTag)).call(this, 'li', strInnerHtml));
    }

    return ListItemTag;
}(HtmlTag);

//-------------------------------------------------------
//
// ListTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var ListTag = exports.ListTag = function (_HtmlTag9) {
    _inherits(ListTag, _HtmlTag9);

    function ListTag(fOrdered) {
        _classCallCheck(this, ListTag);

        if (fOrdered) {
            var _this9 = _possibleConstructorReturn(this, (ListTag.__proto__ || Object.getPrototypeOf(ListTag)).call(this, 'ol', ''));
        } else {
            var _this9 = _possibleConstructorReturn(this, (ListTag.__proto__ || Object.getPrototypeOf(ListTag)).call(this, 'ul', ''));
        }

        _this9.m_rgobjItem = [];
        _this9.m_fContainer = true;
        return _possibleConstructorReturn(_this9);
    }

    _createClass(ListTag, [{
        key: 'addItem',
        value: function addItem(objItem) {
            this.m_rgobjItem.push(objItem);
        }
    }, {
        key: 'toHtml',
        value: function toHtml() {
            var cItem = this.m_rgobjItem.length;
            for (var i = 0; i < cItem; ++i) {
                this.m_strValue += this.m_rgobjItem[i].toHtml();
            }

            return _get(ListTag.prototype.__proto__ || Object.getPrototypeOf(ListTag.prototype), 'toHtml', this).call(this);
        }
    }]);

    return ListTag;
}(HtmlTag);

//-------------------------------------------------------
//
// ParagraphTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var ParagraphTag = exports.ParagraphTag = function (_HtmlTag10) {
    _inherits(ParagraphTag, _HtmlTag10);

    function ParagraphTag(strInnerHtml) {
        _classCallCheck(this, ParagraphTag);

        var _this10 = _possibleConstructorReturn(this, (ParagraphTag.__proto__ || Object.getPrototypeOf(ParagraphTag)).call(this, 'p', strInnerHtml));

        _this10.m_fContainer = true;
        return _this10;
    }

    return ParagraphTag;
}(HtmlTag);

//-------------------------------------------------------
//
// SelectTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var SelectTag = exports.SelectTag = function (_HtmlTag11) {
    _inherits(SelectTag, _HtmlTag11);

    function SelectTag() {
        _classCallCheck(this, SelectTag);

        var _this11 = _possibleConstructorReturn(this, (SelectTag.__proto__ || Object.getPrototypeOf(SelectTag)).call(this, 'select', ''));

        _this11.m_rgobjOption = [];
        _this11.m_iSelected = -1;
        _this11.m_iDisabled = -1;
        return _this11;
    }

    _createClass(SelectTag, [{
        key: 'addOption',
        value: function addOption(strText, strValue) {
            if (strText && strText.length > 0) {
                this.m_rgobjOption.push({ text: strText, value: strValue });
            }
        }
    }, {
        key: 'addLabel',
        value: function addLabel(strText) {
            this.m_iDisabled = this.m_rgobjOption.length;
            this.m_rgobjOption.push({ text: strText, value: -1 });
        }
    }, {
        key: 'setSelectedIndex',
        value: function setSelectedIndex(index) {
            this.m_iSelected = index;
        }
    }, {
        key: 'toHtml',
        value: function toHtml() {
            var cOption = this.m_rgobjOption.length,
                objOption = null;

            for (var i = 0; i < cOption; ++i) {
                objOption = this.m_rgobjOption[i];
                this.m_strValue += '<option value="' + objOption.value + '"';

                if (this.m_iDisabled == i) {
                    this.m_strValue += ' disabled="disabled"';
                }

                if (this.m_iSelected == i) {
                    this.m_strValue += ' selected="selected"';
                }

                this.m_strValue += '>' + objOption.text + '</option>';
            }

            return _get(SelectTag.prototype.__proto__ || Object.getPrototypeOf(SelectTag.prototype), 'toHtml', this).call(this);
        }
    }]);

    return SelectTag;
}(HtmlTag);

//-------------------------------------------------------
//
// SpanTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var SpanTag = exports.SpanTag = function (_HtmlTag12) {
    _inherits(SpanTag, _HtmlTag12);

    function SpanTag(strInnerHtml) {
        _classCallCheck(this, SpanTag);

        return _possibleConstructorReturn(this, (SpanTag.__proto__ || Object.getPrototypeOf(SpanTag)).call(this, 'span', strInnerHtml));
    }

    return SpanTag;
}(HtmlTag);

//-------------------------------------------------------
//
// TableColumn
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var TableColumn = exports.TableColumn = function (_HtmlTag13) {
    _inherits(TableColumn, _HtmlTag13);

    function TableColumn(strInnerHtml) {
        _classCallCheck(this, TableColumn);

        return _possibleConstructorReturn(this, (TableColumn.__proto__ || Object.getPrototypeOf(TableColumn)).call(this, 'td', strInnerHtml));
    }

    return TableColumn;
}(HtmlTag);

//-------------------------------------------------------
//
// TableRow
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var TableRow = exports.TableRow = function (_HtmlTag14) {
    _inherits(TableRow, _HtmlTag14);

    function TableRow() {
        _classCallCheck(this, TableRow);

        var _this14 = _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, 'tr', ''));

        _this14.m_rgobjColumn = [];
        return _this14;
    }

    _createClass(TableRow, [{
        key: 'addColumn',
        value: function addColumn(objColumn) {
            this.m_rgobjColumn.push(objColumn);
        }
    }, {
        key: 'toHtml',
        value: function toHtml() {
            var cColumn = this.m_rgobjColumn.length;
            for (var i = 0; i < cColumn; ++i) {
                this.m_strValue += this.m_rgobjColumn[i].toHtml();
            }

            return _get(TableRow.prototype.__proto__ || Object.getPrototypeOf(TableRow.prototype), 'toHtml', this).call(this);
        }
    }]);

    return TableRow;
}(HtmlTag);

//-------------------------------------------------------
//
// TableContainer
//
//-------------------------------------------- YuMaeda --


var TableContainer = function (_HtmlTag15) {
    _inherits(TableContainer, _HtmlTag15);

    function TableContainer(strTag) {
        _classCallCheck(this, TableContainer);

        var _this15 = _possibleConstructorReturn(this, (TableContainer.__proto__ || Object.getPrototypeOf(TableContainer)).call(this, strTag, ''));

        _this15.m_rgobjRow = [];
        return _this15;
    }

    _createClass(TableContainer, [{
        key: 'addRow',
        value: function addRow(objRow) {
            this.m_rgobjRow.push(objRow);
        }
    }, {
        key: 'toHtml',
        value: function toHtml() {
            var cRow = this.m_rgobjRow.length;
            for (var i = 0; i < cRow; ++i) {
                this.m_strValue += this.m_rgobjRow[i].toHtml();
            }

            return _get(TableContainer.prototype.__proto__ || Object.getPrototypeOf(TableContainer.prototype), 'toHtml', this).call(this);
        }
    }, {
        key: 'lastRow',
        get: function get() {
            return this.m_rgobjRow[this.m_rgobjRow.length - 1];
        }
    }]);

    return TableContainer;
}(HtmlTag);

//-------------------------------------------------------
//
// TableTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var TableTag = exports.TableTag = function (_HtmlTag16) {
    _inherits(TableTag, _HtmlTag16);

    function TableTag() {
        _classCallCheck(this, TableTag);

        var _this16 = _possibleConstructorReturn(this, (TableTag.__proto__ || Object.getPrototypeOf(TableTag)).call(this, 'table', ''));

        _this16.m_objHead = new TableContainer('thead'), _this16.m_objBody = new TableContainer('tbody'), _this16.m_objFoot = new TableContainer('tfoot');
        return _this16;
    }

    _createClass(TableTag, [{
        key: 'toHtml',
        value: function toHtml() {
            this.m_strValue += this.m_objHead.toHtml();
            this.m_strValue += this.m_objBody.toHtml();
            this.m_strValue += this.m_objFoot.toHtml();

            return _get(TableTag.prototype.__proto__ || Object.getPrototypeOf(TableTag.prototype), 'toHtml', this).call(this);
        }
    }, {
        key: 'head',
        get: function get() {
            return this.m_objHead;
        }
    }, {
        key: 'body',
        get: function get() {
            return this.m_objBody;
        }
    }, {
        key: 'foot',
        get: function get() {
            return this.m_objFoot;
        }
    }]);

    return TableTag;
}(HtmlTag);

//-------------------------------------------------------
//
// TextAreaTag
//
// [Dependencies]
//     htmltag.js
//
//-------------------------------------------- YuMaeda --


var TextAreaTag = exports.TextAreaTag = function (_HtmlTag17) {
    _inherits(TextAreaTag, _HtmlTag17);

    function TextAreaTag(strName, strValue) {
        _classCallCheck(this, TextAreaTag);

        var _this17 = _possibleConstructorReturn(this, (TextAreaTag.__proto__ || Object.getPrototypeOf(TextAreaTag)).call(this, 'textarea', strValue));

        _get(TextAreaTag.prototype.__proto__ || Object.getPrototypeOf(TextAreaTag.prototype), 'addAttr', _this17).call(_this17, 'name', strName);
        _get(TextAreaTag.prototype.__proto__ || Object.getPrototypeOf(TextAreaTag.prototype), 'addAttr', _this17).call(_this17, 'rows', '4');
        return _this17;
    }

    return TextAreaTag;
}(HtmlTag);

},{}],5:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _html_tags = require('../../e-commerce/modules/build/html_tags');

var _UrlQuery = require('../../e-commerce/modules/build/UrlQuery');

var _UrlQuery2 = _interopRequireDefault(_UrlQuery);

var _ModalWindow = require('../../e-commerce/modules/build/ModalWindow');

var _ModalWindow2 = _interopRequireDefault(_ModalWindow);

var _CountryInfo = require('../../e-commerce/modules/build/CountryInfo');

var _CountryInfo2 = _interopRequireDefault(_CountryInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-------------------------------------------------------
// String.prototype.nl2br
//-------------------------------------------- YuMaeda --
if (!String.prototype.nl2br) {
    String.prototype.nl2br = function () {
        return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
    };
}

//-------------------------------------------------------
// String.prototype.format
//-------------------------------------------- YuMaeda --
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;

        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

//-------------------------------------------------------
// Number.prototype.format
//-------------------------------------------- YuMaeda --
if (!Number.prototype.format) {
    Number.prototype.format = function () {
        // convert int to string.
        var strNumber = this + '';

        var rgstrToken = strNumber.split('.'),
            intToken = rgstrToken[0],
            decimalToken = rgstrToken.length > 1 ? '.' + rgstrToken[1] : '';

        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(intToken)) {
            intToken = intToken.replace(rgx, '$1' + ',' + '$2');
        }

        return intToken + decimalToken;
    };
}

//-------------------------------------------------------
//
// HtmlControl (Requires jquery.js).
//
//-------------------------------------------- YuMaeda --

var HtmlControl = function () {
    function HtmlControl($parentContainer) {
        _classCallCheck(this, HtmlControl);

        this.m_fValidParent = $parentContainer && $parentContainer.length > 0;
        this.$m_parentContainer = $parentContainer;
    }

    _createClass(HtmlControl, [{
        key: 'preRender',
        value: function preRender() {}
    }, {
        key: 'renderChildren',
        value: function renderChildren() {}
    }, {
        key: 'render',
        value: function render() {
            this.preRender();

            if (this.m_fValidParent) {
                this.renderChildren();
            }

            this.postRender();
        }
    }, {
        key: 'postRender',
        value: function postRender() {}
    }]);

    return HtmlControl;
}();

//-------------------------------------------------------
//
// EventControl
//
// [Dependencies]
//     HtmlControl.cs
//     TableTag.cs
//     TableRow.cs
//     TableColumn.cs
//
//-------------------------------------------- YuMaeda --
var EventControl = function (_HtmlControl) {
    _inherits(EventControl, _HtmlControl);

    function EventControl($parentContainer, strTableName, intYear) {
        _classCallCheck(this, EventControl);

        var _this = _possibleConstructorReturn(this, (EventControl.__proto__ || Object.getPrototypeOf(EventControl)).call(this, $parentContainer));

        _this.m_strTableName = strTableName;
        _this.m_intYear = intYear;
        return _this;
    }

    _createClass(EventControl, [{
        key: '_getDayOfWeek',
        value: function _getDayOfWeek(intYear, intMonth, intDate) {
            var rgstrWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                intDayOfWeek = new Date(intYear, intMonth - 1, intDate).getDay();

            return rgstrWeek[intDayOfWeek];
        }
    }, {
        key: '_generateDateLabel',
        value: function _generateDateLabel(intYear, intMonth) {
            var strLabel = intYear >= 1900 ? intYear : new Date().getFullYear();

            if (intMonth >= 1 && intMonth <= 12) {
                strLabel += '.' + intMonth;
            }

            return strLabel;
        }
    }, {
        key: '_toMonthlyHtml',
        value: function _toMonthlyHtml(intYear) {
            var rgobjEventSubMenu = [{ resId: 'JANUARY_STR', cssClass: 'january-image' }, { resId: 'FEBRUARY_STR', cssClass: 'february-image' }, { resId: 'MARCH_STR', cssClass: 'march-image' }, { resId: 'APRIL_STR', cssClass: 'april-image' }, { resId: 'MAY_STR', cssClass: 'may-image' }, { resId: 'JUNE_STR', cssClass: 'june-image' }, { resId: 'JULY_STR', cssClass: 'july-image' }, { resId: 'AUGUST_STR', cssClass: 'august-image' }, { resId: 'SEPTEMBER_STR', cssClass: 'september-image' }, { resId: 'OCTOBER_STR', cssClass: 'october-image' }, { resId: 'NOVEMBER_STR', cssClass: 'november-image' }, { resId: 'DECEMBER_STR', cssClass: 'december-image' }];

            var headerLabel = 'Event&nbsp;{0}'.format(this._generateDateLabel(intYear, 0)),
                subMenuTable = new SubMenuTable(headerLabel, rgobjEventSubMenu);

            return subMenuTable.toHtml();
        }
    }, {
        key: '_toDailyHtml',
        value: function _toDailyHtml(intYear, intMonth) {
            var monthLabel = this._generateDateLabel(intYear, intMonth),
                tableTag = new _html_tags.TableTag();

            tableTag.addClass('auto-horizontal-margin width-semi-full no-border-spacing');

            var labelRow = new _html_tags.TableRow(),
                labelCol = new _html_tags.TableColumn(monthLabel),
                lineRow = new _html_tags.TableRow(),
                lineCol = new _html_tags.TableColumn('<hr /><br />');

            labelCol.addAttr('colspan', '4');
            labelCol.addClass('eng-font');
            labelRow.addColumn(labelCol);
            tableTag.head.addRow(labelRow);

            lineCol.addAttr('colspan', '4');
            lineRow.addColumn(lineCol);
            tableTag.head.addRow(lineRow);

            var eventDictionary = {},
                self = this;

            $.ajax({
                url: './get_items.php',
                data: {
                    dbTable: self.m_strTableName,
                    orderBy: 'year DESC, date ASC'
                },
                async: false,
                dataType: 'json',
                success: function success(data) {
                    var objEvent,
                        cEvent = data.length;

                    for (var i = 0; i < cEvent; ++i) {
                        objEvent = data[i];

                        if (objEvent.year == intYear && objEvent.month == intMonth) {
                            eventDictionary[objEvent.date] = objEvent.description;
                        }
                    }
                },

                error: function error() {}
            });

            var lastDateOfMonth = new Date(intYear, intMonth, 0).getDate();
            for (var intDate = 1; intDate <= lastDateOfMonth; ++intDate) {
                var dayOfWeekHtml = this._getDayOfWeek(intYear, intMonth, intDate),
                    descriptionHtml = eventDictionary[intDate] ? '<span>{0}</span>'.format(eventDictionary[intDate]) : '';

                var eventRow = new _html_tags.TableRow(),
                    dateCol = new _html_tags.TableColumn(intDate),
                    dayOfWeekCol = new _html_tags.TableColumn('&nbsp;/&nbsp;{0}'.format(dayOfWeekHtml));

                eventRow.addClass('event-date-border text-small');
                dateCol.addClass('eng-font text-right event-date-column');
                dayOfWeekCol.addClass('eng-font event-week-column');

                if (dayOfWeekHtml == 'Sun') {
                    dateCol.addClass('color-sunday');
                    dayOfWeekCol.addClass('color-sunday');
                } else if (dayOfWeekHtml == 'Sat') {
                    dateCol.addClass('color-saturday');
                    dayOfWeekCol.addClass('color-saturday');
                }

                eventRow.addColumn(dateCol);
                eventRow.addColumn(dayOfWeekCol);
                eventRow.addColumn(new _html_tags.TableColumn(descriptionHtml));

                tableTag.body.addRow(eventRow);
            }

            return tableTag.toHtml();
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var self = this;

            this.$m_parentContainer.html(this._toMonthlyHtml(this.m_intYear));

            this.$m_parentContainer.on('click', '.january-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 1));
            });

            this.$m_parentContainer.on('click', '.february-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 2));
            });

            this.$m_parentContainer.on('click', '.march-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 3));
            });

            this.$m_parentContainer.on('click', '.april-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 4));
            });

            this.$m_parentContainer.on('click', '.may-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 5));
            });

            this.$m_parentContainer.on('click', '.june-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 6));
            });

            this.$m_parentContainer.on('click', '.july-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 7));
            });

            this.$m_parentContainer.on('click', '.august-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 8));
            });

            this.$m_parentContainer.on('click', '.september-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 9));
            });

            this.$m_parentContainer.on('click', '.october-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 10));
            });

            this.$m_parentContainer.on('click', '.november-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 11));
            });

            this.$m_parentContainer.on('click', '.december-image', function () {
                $('div.back-link-pane').css('visibility', 'visible');
                self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 12));
            });
        }
    }]);

    return EventControl;
}(HtmlControl);

//-------------------------------------------------------
//
// SubMenuColumn
//
//-------------------------------------------- YuMaeda --


var SubMenuColumn = function () {
    function SubMenuColumn(strJpnText, strEngText, strCss) {
        _classCallCheck(this, SubMenuColumn);

        this.m_strJpnText = strJpnText;
        this.m_strEngText = strEngText;
        this.m_strCss = strCss;
    }

    _createClass(SubMenuColumn, [{
        key: 'toHtml',
        value: function toHtml() {
            var divTag = null;

            if (this.m_strCss) {
                var spanTag = new _html_tags.SpanTag(this.m_strJpnText);
                spanTag.addClass('text-x-small jpn-font');

                divTag = new _html_tags.DivTag(this.m_strEngText + '<br />' + spanTag.toHtml());
                divTag.addClass('submenu-column ' + this.m_strCss);
            } else {
                divTag = new _html_tags.DivTag('');
                divTag.addClass('empty-submenu-column');
            }

            return divTag.toHtml();
        }
    }]);

    return SubMenuColumn;
}();

//-------------------------------------------------------
//
// SubMenuTable
//
// [Dependencies]
//     TableTag.cs
//     TableRow.cs
//     TableColumn.cs
//
//-------------------------------------------- YuMaeda --


var SubMenuTable = function () {
    function SubMenuTable(strLabel, rgobjSubMenu) {
        _classCallCheck(this, SubMenuTable);

        this.m_strLabel = strLabel;
        this.m_rgobjSubMenu = rgobjSubMenu;
        this.m_objStrings = {
            'JANUARY_STR': { 'ja': '１月', 'en': 'January' },
            'FEBRUARY_STR': { 'ja': '２月', 'en': 'February' },
            'MARCH_STR': { 'ja': '３月', 'en': 'March' },
            'APRIL_STR': { 'ja': '４月', 'en': 'April' },
            'MAY_STR': { 'ja': '５月', 'en': 'May' },
            'JUNE_STR': { 'ja': '６月', 'en': 'June' },
            'JULY_STR': { 'ja': '７月', 'en': 'July' },
            'AUGUST_STR': { 'ja': '８月', 'en': 'August' },
            'SEPTEMBER_STR': { 'ja': '９月', 'en': 'September' },
            'OCTOBER_STR': { 'ja': '１０月', 'en': 'October' },
            'NOVEMBER_STR': { 'ja': '１１月', 'en': 'November' },
            'DECEMBER_STR': { 'ja': '１２月', 'en': 'December' },
            'STAFF_STR': { 'ja': 'スタッフ', 'en': 'Staff' },
            'STORE_INTERIOR_STR': { 'ja': '店内', 'en': 'Store Interior' },
            'DISH_STR': { 'ja': '料理', 'en': 'Dish' },
            'MAGAZINE_STR': { 'ja': '雑誌', 'en': 'Magazine' },
            'DAILY_MENU_STR': { 'ja': '日替わりメニュー', 'en': 'Daily Menu' },
            'NORMAL_MENU_STR': { 'ja': 'グランド・メニュー', 'en': 'Grand Menu' },
            'A_LA_CARTE': { 'ja': 'アラカルト', 'en': 'A la carte' },
            'COURSE_STR': { 'ja': 'コースメニュー', 'en': 'Course Menu' },
            'BEER_STR': { 'ja': '麦酒', 'en': 'Beer' },
            'DIGESTIF_STR': { 'ja': '食後酒', 'en': 'Digestif' },
            'SAKE_STR': { 'ja': '日本酒', 'en': 'Sake' },
            'SHOCHU_STR': { 'ja': '焼酎', 'en': 'Shochu' },
            'OTHER_DRINKS_STR': { 'ja': 'その他のドリンク', 'en': 'Other Drinks' },
            'GLASS_WINE_STR': { 'ja': 'グラスワイン', 'en': 'Glass Wine' },
            'SPARKLING_WINE_STR': { 'ja': 'スパークリング・ワイン', 'en': 'Sparkling Wine' },
            'WHITE_WINE_STR': { 'ja': '白ワイン', 'en': 'White Wine' },
            'ROSE_WINE_STR': { 'ja': 'ロゼワイン', 'en': 'Rosé Wine' },
            'RED_WINE_STR': { 'ja': '赤ワイン', 'en': 'Red Wine' },
            'WINE_LIST_STR': { 'ja': '秘蔵ワインリスト', 'en': 'Wine List' }
        };
    }

    _createClass(SubMenuTable, [{
        key: 'toHtml',
        value: function toHtml() {
            var cColumn = 4,
                tableTag = new _html_tags.TableTag();

            tableTag.addClass('auto-horizontal-margin contents-width');
            if (this.m_strLabel) {
                var labelRow = new _html_tags.TableRow(),
                    lineRow = new _html_tags.TableRow(),
                    labelCol = new _html_tags.TableColumn(this.m_strLabel),
                    lineCol = new _html_tags.TableColumn('<hr /><br />');

                labelCol.addAttr('colspan', cColumn * 2);
                labelCol.addClass('body__label');
                labelRow.addColumn(labelCol);
                lineCol.addAttr('colspan', cColumn * 2);
                lineRow.addColumn(lineCol);

                tableTag.head.addRow(labelRow);
                tableTag.head.addRow(lineRow);
            }

            var imgHtml = '',
                cSubMenu = this.m_rgobjSubMenu.length,
                tableWidth = $('div.body').outerWidth(true) * 0.8,
                imgWidth = 135,
                imgPadding = (tableWidth - imgWidth * cColumn) / (cColumn - 1),
                iSubMenu = 0,
                iCol = 0;

            while (iSubMenu < cColumn || iSubMenu < cSubMenu) {
                if (iCol === 0) {
                    var newRow = new _html_tags.TableRow();
                    newRow.addClass('padding-top-small text-center');

                    tableTag.body.addRow(newRow);
                }

                ++iCol;

                if (iSubMenu < cSubMenu) {
                    var resId = this.m_rgobjSubMenu[iSubMenu].resId,
                        strJpnText = this.m_objStrings[resId]['ja'],
                        strEngText = this.m_objStrings[resId]['en'],
                        submenuCol = new SubMenuColumn(strJpnText, strEngText, this.m_rgobjSubMenu[iSubMenu].cssClass);

                    imgHtml = submenuCol.toHtml();
                } else {
                    imgHtml = '';
                }

                var imgCol = new _html_tags.TableColumn(imgHtml);
                imgCol.addAttr('style', 'width:{0}px;'.format(imgWidth));
                tableTag.body.lastRow.addColumn(imgCol);

                if (iCol <= cColumn - 1) {
                    var imgPaddingCol = new _html_tags.TableColumn('&nbsp;');
                    imgPaddingCol.addAttr('style', 'width:{0}px;'.format(imgPadding));
                    tableTag.body.lastRow.addColumn(imgPaddingCol);
                } else {
                    iCol = 0;
                }

                ++iSubMenu;
            }

            return tableTag.toHtml();
        }
    }]);

    return SubMenuTable;
}();

//-------------------------------------------------------
//
// BaseMenu
//
// [Dependencies]
//     HtmlControl.cs
//     AnchorTag.cs
//     ListTag.cs
//
//-------------------------------------------- YuMaeda --


var BaseMenu = function (_HtmlControl2) {
    _inherits(BaseMenu, _HtmlControl2);

    function BaseMenu($parentContainer) {
        _classCallCheck(this, BaseMenu);

        var _this2 = _possibleConstructorReturn(this, (BaseMenu.__proto__ || Object.getPrototypeOf(BaseMenu)).call(this, $parentContainer));

        _this2.m_objList = new _html_tags.ListTag(false);
        _this2.m_objList.addClass('main-list');

        _this2.m_objLinkClickHandler = {};
        return _this2;
    }

    _createClass(BaseMenu, [{
        key: '_registerEventLinkHandler',
        value: function _registerEventLinkHandler(strDBTable) {
            this.m_objLinkClickHandler['event-link'] = function () {
                $('.footer').hide();

                $('div.body').html('<div id="thisYearEventPane"></div><br /><br /><div id="nextYearEventPane"></div>');

                var intYear = new Date().getFullYear(),
                    thisYearEvent = new EventControl($('div#thisYearEventPane'), strDBTable, intYear),
                    nextYearEvent = new EventControl($('div#nextYearEventPane'), strDBTable, intYear + 1);

                thisYearEvent.render();
                nextYearEvent.render();
            };
        }
    }, {
        key: '_registerWineLinkHandler',
        value: function _registerWineLinkHandler(strDBTable, fHasCellar) {
            var $body = $('div.body');

            this.m_objLinkClickHandler['wine-link'] = function () {
                $('.footer').hide();

                var rgobjWineSubMenu = [{ resId: 'GLASS_WINE_STR', cssClass: 'glass-wine-image' }, { resId: 'SPARKLING_WINE_STR', cssClass: 'sparkling-wine-image' }, { resId: 'WHITE_WINE_STR', cssClass: 'white-wine-image' }, { resId: 'ROSE_WINE_STR', cssClass: 'rose-wine-image' }, { resId: 'RED_WINE_STR', cssClass: 'red-wine-image' }, { resId: 'WINE_LIST_STR', cssClass: 'wine-list-image' }];

                $body.html(new SubMenuTable('Wine', rgobjWineSubMenu).toHtml());
                $body.off('click', 'div.glass-wine-image');
                $body.on('click', 'div.glass-wine-image', function () {
                    new AllWineControl(strDBTable, $body).render();
                });

                $body.off('click', 'div.sparkling-wine-image');
                $body.on('click', 'div.sparkling-wine-image', function () {
                    new RecommendedWineControl(strDBTable, 1, $body).render();
                });

                $body.off('click', 'div.white-wine-image');
                $body.on('click', 'div.white-wine-image', function () {
                    new RecommendedWineControl(strDBTable, 3, $body).render();
                });

                $body.off('click', 'div.rose-wine-image');
                $body.on('click', 'div.rose-wine-image', function () {
                    new RecommendedWineControl(strDBTable, 4, $body).render();
                });

                $body.off('click', 'div.red-wine-image');
                $body.on('click', 'div.red-wine-image', function () {
                    new RecommendedWineControl(strDBTable, 5, $body).render();
                });

                $body.off('click', 'div.wine-list-image');
                $body.on('click', 'div.wine-list-image', function () {
                    var strNotice = '';
                    if (!fHasCellar) {
                        strNotice = '※こちらのリストに掲載されているワインのストックは店舗外のセラーで管理しているため、ご要望のあるお客様は前日までに電話またはメールでご予約ください。また、姉妹店と在庫を共有しているため、売り切れている場合もございます。ご了承ください。';
                    }

                    new RestaurantWineList($body, strNotice).render();
                });
            };
        }
    }, {
        key: '_registerPhotoLinkHandler',
        value: function _registerPhotoLinkHandler(strProfileTable, intFirst) {
            this.m_objLinkClickHandler['photo-link'] = function () {
                $('.footer').hide();

                var $body = $('div.body'),
                    rgobjPhotoSubMenu = [{ resId: 'STAFF_STR', cssClass: 'staff-image' }, { resId: 'STORE_INTERIOR_STR', cssClass: 'store-interior-image' }, { resId: 'DISH_STR', cssClass: 'dish-image' }, { resId: 'MAGAZINE_STR', cssClass: 'magazine-image' }];

                $body.html(new SubMenuTable('Photo', rgobjPhotoSubMenu).toHtml());
                $body.off('click', 'div.staff-image');
                $body.on('click', 'div.staff-image', function () {
                    new ProfileControl(strProfileTable, $body).render();
                });

                $body.off('click', 'div.store-interior-image');
                $body.on('click', 'div.store-interior-image', function () {
                    new PhotoControl(intFirst, $body).render();
                });

                $body.off('click', 'div.dish-image');
                $body.on('click', 'div.dish-image', function () {
                    new PhotoControl(intFirst + 1, $body).render();
                });

                $body.on('click', 'div.magazine-image', function () {
                    new PhotoControl(intFirst + 2, $body).render();
                });
            };
        }
    }, {
        key: 'addItem',
        value: function addItem(objItem) {
            this.m_objList.addItem(objItem);
        }
    }, {
        key: 'preRender',
        value: function preRender() {
            var objDishLink = new _html_tags.AnchorTag('#', 'Dish');
            objDishLink.addAttr('id', 'dish-link');
            objDishLink.addClass('eng-font');

            var objDrinkLink = new _html_tags.AnchorTag('#', 'Drink');
            objDrinkLink.addAttr('id', 'drink-link');
            objDrinkLink.addClass('eng-font');

            var objWineLink = new _html_tags.AnchorTag('#', 'Wine');
            objWineLink.addAttr('id', 'wine-link');
            objWineLink.addClass('eng-font');

            var objEventLink = new _html_tags.AnchorTag('#', 'Event');
            objEventLink.addAttr('id', 'event-link');
            objEventLink.addClass('eng-font');

            var objPhotoLink = new _html_tags.AnchorTag('#', 'Photo');
            objPhotoLink.addAttr('id', 'photo-link');
            objPhotoLink.addClass('eng-font');

            var objMapLink = new _html_tags.AnchorTag('#', 'Map');
            objMapLink.addAttr('id', 'map-link');
            objMapLink.addClass('eng-font');

            var objSiteTopLink = new _html_tags.AnchorTag('#', 'Site Top');
            objSiteTopLink.addAttr('id', 'site-top-lnk');
            objSiteTopLink.addClass('eng-font');

            this.m_objList.addItem(new _html_tags.ListItemTag(objDishLink.toHtml()));
            this.m_objList.addItem(new _html_tags.ListItemTag(objDrinkLink.toHtml()));
            this.m_objList.addItem(new _html_tags.ListItemTag(objWineLink.toHtml()));
            this.m_objList.addItem(new _html_tags.ListItemTag(objEventLink.toHtml()));
            this.m_objList.addItem(new _html_tags.ListItemTag(objPhotoLink.toHtml()));
            this.m_objList.addItem(new _html_tags.ListItemTag(objMapLink.toHtml()));
            this.m_objList.addItem(new _html_tags.ListItemTag(objSiteTopLink.toHtml()));
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            this.$m_parentContainer.html(this.m_objList.toHtml());
        }
    }, {
        key: 'postRender',
        value: function postRender() {
            var self = this;

            var $mainList = this.$m_parentContainer.find('ul.main-list');
            $mainList.find('> li > a').click({ handlers: self.m_objLinkClickHandler }, function (event) {
                var $this = $(this);

                var objLinkClickHandler = event.data.handlers[this.id];
                if (objLinkClickHandler) {
                    objLinkClickHandler();
                }

                $this.closest('ul.main-list').find('> li > a').removeClass('selected-link');
                $this.addClass('selected-link');

                return false;
            });

            $mainList.find('> li > a').removeClass('selected-link');

            this.m_objLinkClickHandler['site-top-lnk'] = function () {
                window.location = '../index.php';
            };
        }
    }]);

    return BaseMenu;
}(HtmlControl);

//-------------------------------------------------------
//
// MitsuGetsuMenu
//
// [Dependencies]
//     BaseMenu.js
//
//-------------------------------------------- YuMaeda --


var MitsuGetsuMenu = function (_BaseMenu) {
    _inherits(MitsuGetsuMenu, _BaseMenu);

    function MitsuGetsuMenu($parentContainer) {
        _classCallCheck(this, MitsuGetsuMenu);

        return _possibleConstructorReturn(this, (MitsuGetsuMenu.__proto__ || Object.getPrototypeOf(MitsuGetsuMenu)).call(this, $parentContainer));
    }

    _createClass(MitsuGetsuMenu, [{
        key: '_registerMapLinkHandler',
        value: function _registerMapLinkHandler() {
            this.m_objLinkClickHandler['map-link'] = function () {
                var $footer = $('.footer'),
                    contactInfo = new ContactInfo($footer);

                $footer.show();

                contactInfo.email = 'mitsu-getsu@sei-ya.jp';
                contactInfo.phoneNumber = '03-6413-1810';
                contactInfo.faxNumber = '03-6413-9736';
                contactInfo.address = '1F 2-13-1 Kyodo, Setagaya-ku, Tokyo 156-0052';
                contactInfo.openingHour = '15:00～24:00(Sun～Thr) 15:00～26:00(Fri～Sat)';
                contactInfo.closedOn = 'Tuesday';
                contactInfo.render();

                var mapControl = new MapControl();
                mapControl.width = 750;
                mapControl.height = 400;
                mapControl.marker = '';
                mapControl.screenSpan = '';
                mapControl.subCoordinate = '';
                mapControl.coordinate = '35.651555,139.634685';
                mapControl.coordinateId = '9636767212025462165';
                mapControl.infoWindowLocation = 'A';

                $('div.body').html(mapControl.toHtml());
            };
        }
    }, {
        key: '_registerDishLinkHandler',
        value: function _registerDishLinkHandler() {
            this.m_objLinkClickHandler['dish-link'] = function () {
                $('.footer').hide();

                var $body = $('div.body'),
                    rgobjDishSubMenu = [{ resId: 'A_LA_CARTE', cssClass: 'a-la-carte-image' }, { resId: 'COURSE_STR', cssClass: 'course-image' }];

                $body.html(new SubMenuTable('Dish', rgobjDishSubMenu).toHtml());
                $body.off('click', 'div.a-la-carte-image');
                $body.on('click', 'div.a-la-carte-image', function () {
                    new DishMenuControl('mitsugetsu_dishes', $body).render();
                });

                $body.off('click', 'div.course-image');
                $body.on('click', 'div.course-image', function () {
                    var tableTag = new _html_tags.TableTag(),
                        tableRow = new _html_tags.TableRow(),
                        tableCol = new _html_tags.TableColumn('<img src="images/course.gif" />');

                    tableTag.addClass('auto-horizontal-margin contents-width padding-bottom-large');
                    tableCol.addClass('text-center');

                    tableRow.addColumn(tableCol);
                    tableTag.body.addRow(tableRow);
                    $body.html(tableTag.toHtml());
                });
            };
        }
    }, {
        key: '_registerDrinkLinkHandler',
        value: function _registerDrinkLinkHandler() {
            this.m_objLinkClickHandler['drink-link'] = function () {
                $('.footer').hide();

                var $body = $('div.body'),
                    rgobjDrinkSubMenu = [{ resId: 'BEER_STR', cssClass: 'beer-image' }, { resId: 'DIGESTIF_STR', cssClass: 'digestif-image' }, { resId: 'OTHER_DRINKS_STR', cssClass: 'other-drinks-image' }];

                $body.html(new SubMenuTable('Drink', rgobjDrinkSubMenu).toHtml());
                $body.off('click', 'div.beer-image');
                $body.on('click', 'div.beer-image', function () {
                    new BeerControl($body, 'mitsugetsu_drinks').render();
                });

                $body.off('click', 'div.digestif-image');
                $body.on('click', 'div.digestif-image', function () {
                    new BrandyControl($body, 'mitsugetsu_drinks').render();
                });

                $body.off('click', 'div.other-drinks-image');
                $body.on('click', 'div.other-drinks-image', function () {
                    new DrinkControl($body, 'mitsugetsu_drinks').render();
                });
            };
        }
    }, {
        key: 'postRender',
        value: function postRender() {
            _get(MitsuGetsuMenu.prototype.__proto__ || Object.getPrototypeOf(MitsuGetsuMenu.prototype), 'postRender', this).call(this);

            var self = this,
                $body = $('div.body');

            this._registerEventLinkHandler('mitsugetsu_events');
            this._registerWineLinkHandler('mitsugetsu_recommended_wines', true);
            this._registerPhotoLinkHandler('mitsugetsu_profiles', 2);
            this._registerMapLinkHandler();
            this._registerDishLinkHandler();
            this._registerDrinkLinkHandler();
        }
    }]);

    return MitsuGetsuMenu;
}(BaseMenu);

//-------------------------------------------------------
//
// OfuroUtility
//
//-------------------------------------------- YuMaeda --


var OfuroUtility = function () {
    function OfuroUtility() {
        _classCallCheck(this, OfuroUtility);

        this.m_strLang = _UrlQuery2.default.getValue('lang');
        if (!this.m_strLang) {
            this.m_strLang = 'ja';
        }

        this.m_objResourceString = {
            'OPEN_BRACE': {
                'ja': '（',
                'en': '(',
                'fr': '('
            },

            'CLOSE_BRACE': {
                'ja': '）',
                'en': ')',
                'fr': ')'
            },

            'TAX_INCLUDED_STR': {
                'ja': '税込',
                'en': 'tax included',
                'fr': 'TTC'
            },

            'MARKET_VALUE_STR': {
                'ja': '時価',
                'en': 'market value',
                'fr': 'la valeur de marché'
            }
        };
    }

    _createClass(OfuroUtility, [{
        key: 'getString',
        value: function getString(strId) {
            return this.m_objResourceString[strId][this.m_strLang];
        }
    }, {
        key: '_convertToPriceText',
        value: function _convertToPriceText(intPrice) {
            return '{0} yen'.format(intPrice.format());
        }
    }, {
        key: '_getPriceWithTax',
        value: function _getPriceWithTax(objWine) {
            return Math.floor(objWine.price * (1 + this.tax));
        }
    }, {
        key: 'getPriceText2',
        value: function getPriceText2(objWine, fAppendActualPrice) {
            var strPrice = '';

            if (objWine) {
                if (objWine.price > 0) {
                    strPrice += this._convertToPriceText(objWine.price);
                    if (fAppendActualPrice) {
                        strPrice += ' ' + this.getString('OPEN_BRACE') + this.getString('TAX_INCLUDED_STR') + ' ' + this._convertToPriceText(this._getPriceWithTax(objWine)) + this.getString('CLOSE_BRACE');
                    }

                    if (objWine.market_price) {
                        strPrice += '～';
                    }
                } else if (objWine.market_price) {
                    strPrice = this.getString('MARKET_VALUE_STR');
                }
            }

            return strPrice;
        }
    }, {
        key: 'tax',
        get: function get() {
            return 0.8;
        }
    }]);

    return OfuroUtility;
}();

//-------------------------------------------------------
//
// ContactInfo
//
//-------------------------------------------- YuMaeda --


var ContactInfo = function (_HtmlControl3) {
    _inherits(ContactInfo, _HtmlControl3);

    function ContactInfo($parentContainer) {
        _classCallCheck(this, ContactInfo);

        var _this4 = _possibleConstructorReturn(this, (ContactInfo.__proto__ || Object.getPrototypeOf(ContactInfo)).call(this, $parentContainer));

        _this4.m_strEmail = '';
        _this4.m_strPhoneNumber = '';
        _this4.m_strFaxNumber = '';
        _this4.m_strAddress = '';
        _this4.m_strOpeningHour = '';
        _this4.m_strClosedOn = '';
        _this4.m_strFacebookUrl = '';
        _this4.m_strTwitterUrl = '';
        _this4.m_strMailMagazineUrl = '';
        _this4.m_rgobjAdvertisement = [];
        return _this4;
    }

    _createClass(ContactInfo, [{
        key: '_generateLinkImageHtml',
        value: function _generateLinkImageHtml(url, imgName) {
            var html = '';

            if (url) {
                var imgTag, anchorTag;

                var imgTag = new _html_tags.ImageTag('images/icons/{0}'.format(imgName)),
                    anchorTag = new _html_tags.AnchorTag(url, imgTag.toHtml());

                anchorTag.addAttr('rel', 'nofollow');
                html = anchorTag.toHtml();
            }

            return html;
        }
    }, {
        key: '_generateInnerTableHtml',
        value: function _generateInnerTableHtml() {
            var innerTable = new _html_tags.TableTag(),
                numberRow = new _html_tags.TableRow(),
                emailRow = new _html_tags.TableRow();

            var telLabelCol = new _html_tags.TableColumn('Tel/ '),
                telCol = new _html_tags.TableColumn('<a href="tel:{0}">{0}</a>'.format(this.m_strPhoneNumber)),
                faxLabelCol = new _html_tags.TableColumn('Fax/ '),
                faxCol = new _html_tags.TableColumn(this.m_strFaxNumber);

            innerTable.addClass('footer__table__container');
            telLabelCol.addClass('footer__table__label');
            faxLabelCol.addClass('footer__table__label');
            numberRow.addColumn(telLabelCol);
            numberRow.addColumn(telCol);
            numberRow.addColumn(faxLabelCol);
            numberRow.addColumn(faxCol);

            var anchorTag = new _html_tags.AnchorTag('mailto:{0}'.format(this.m_strEmail), this.m_strEmail),
                emailLabelCol = new _html_tags.TableColumn('Email/ '),
                emailCol = new _html_tags.TableColumn(anchorTag.toHtml());

            emailLabelCol.addClass('footer__table__label');
            emailCol.addAttr('colspan', '3');
            emailRow.addColumn(emailLabelCol);
            emailRow.addColumn(emailCol);

            innerTable.body.addRow(numberRow);
            innerTable.body.addRow(emailRow);

            if (this.m_strOpeningHour && this.m_strClosedOn) {
                var openHourRow = new _html_tags.TableRow(),
                    openHourLabelCol = new _html_tags.TableColumn('Open/ '),
                    openHourCol = new _html_tags.TableColumn(this.m_strOpeningHour);

                openHourLabelCol.addClass('footer__table__label');
                openHourCol.addAttr('colspan', '3');
                openHourRow.addColumn(openHourLabelCol);
                openHourRow.addColumn(openHourCol);

                var closedDayRow = new _html_tags.TableRow(),
                    closedDayLabelCol = new _html_tags.TableColumn('Close/ '),
                    closedDayCol = new _html_tags.TableColumn(this.m_strClosedOn);

                closedDayLabelCol.addClass('footer__table__label');
                closedDayCol.addAttr('colspan', '3');
                closedDayRow.addColumn(closedDayLabelCol);
                closedDayRow.addColumn(closedDayCol);

                innerTable.body.addRow(openHourRow);
                innerTable.body.addRow(closedDayRow);
            }

            return innerTable.toHtml();
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var tableTag = new _html_tags.TableTag();
            tableTag.addClass('footer__table');

            var addressRow = new _html_tags.TableRow(),
                addressCol = new _html_tags.TableColumn(this.m_strAddress);
            addressCol.addAttr('colspan', '3');
            addressCol.addClass('footer__table__address__column');
            addressRow.addColumn(addressCol);

            var childTableRow = new _html_tags.TableRow(),
                childTableCol = new _html_tags.TableColumn(this._generateInnerTableHtml());
            childTableCol.addAttr('colspan', '3');
            childTableRow.addColumn(childTableCol);

            tableTag.body.addRow(addressRow);
            tableTag.body.addRow(childTableRow);

            if (this.comment) {
                var commentRow = new _html_tags.TableRow(),
                    commentCol = new _html_tags.TableColumn(this.comment);

                commentCol.addAttr('colspan', '3');
                commentRow.addColumn(commentCol);

                tableTag.body.addRow(commentRow);
            }

            var linkImageHtml = '{0}{1}'.format(this._generateLinkImageHtml(this.m_strMailMagazineUrl, 'mailmagazine.jpg'), this._generateLinkImageHtml(this.m_strFacebookUrl, 'facebook.png'), this._generateLinkImageHtml(this.m_strTwitterUrl, 'twitter.jpg'));

            var linkImgRow = new _html_tags.TableRow(),
                copyRightRow = new _html_tags.TableRow(),
                linkImgCol = new _html_tags.TableColumn(linkImageHtml),
                copyRightCol = new _html_tags.TableColumn('Copyright &copy; 2017 SEI-YA co.ltd. All rights reserved.');

            linkImgCol.addClass('footer__table__sns__column');
            linkImgCol.addAttr('colspan', '3');
            copyRightCol.addAttr('colspan', '3');
            copyRightCol.addClass('copyright');

            linkImgRow.addColumn(linkImgCol);
            copyRightRow.addColumn(copyRightCol);

            tableTag.body.addRow(linkImgRow);
            tableTag.body.addRow(copyRightRow);

            // Render advertisement images.
            var objAd = null,
                cAd = this.m_rgobjAdvertisement.length;
            for (var i = 0; i < cAd; ++i) {
                objAd = this.m_rgobjAdvertisement[i];

                var tableRow = new _html_tags.TableRow(),
                    tableCol = new _html_tags.TableColumn('<a href="{0}"><img style="width:350px;" src="{1}" /></a>'.format(objAd.linkUrl, objAd.imgUrl));

                tableCol.addAttr('colspan', '3');
                tableRow.addColumn(tableCol);

                tableTag.body.addRow(tableRow);
            }

            this.$m_parentContainer.html(tableTag.toHtml());
        }
    }, {
        key: 'email',
        set: function set(value) {
            this.m_strEmail = value;
        }
    }, {
        key: 'phoneNumber',
        set: function set(value) {
            this.m_strPhoneNumber = value;
        }
    }, {
        key: 'faxNumber',
        set: function set(value) {
            this.m_strFaxNumber = value;
        }
    }, {
        key: 'address',
        set: function set(value) {
            this.m_strAddress = value;
        }
    }, {
        key: 'openingHour',
        set: function set(value) {
            this.m_strOpeningHour = value;
        }
    }, {
        key: 'closedOn',
        set: function set(value) {
            this.m_strClosedOn = value;
        }
    }, {
        key: 'facebookUrl',
        set: function set(value) {
            this.m_strFacebookUrl = value;
        }
    }, {
        key: 'twitterUrl',
        set: function set(value) {
            this.m_strTwitterUrl = value;
        }
    }, {
        key: 'mailMagazineUrl',
        set: function set(value) {
            this.m_strMailMagazineUrl = value;
        }
    }, {
        key: 'advertisements',
        set: function set(value) {
            this.m_rgobjAdvertisement = value;
        }
    }]);

    return ContactInfo;
}(HtmlControl);

//-------------------------------------------------------
//
// MapControl
//
// [Dependencies]
//     UrlQuery.cs
//     TableTag.cs
//     TableRow.cs
//     TableColumn.cs
//
//-------------------------------------------- YuMaeda --


var MapControl = function () {
    function MapControl() {
        _classCallCheck(this, MapControl);

        this.m_intWidth = 300;
        this.m_intHeight = 200;
        this.m_strMarker = '';
        this.m_strCoordinate = '';
        this.m_strSubCoordinate = '';
        this.m_intCoordinateId = '';
        this.m_strInfoWindowLocation = 'near';
        this.m_strScreenSpan = '';
    }

    _createClass(MapControl, [{
        key: '_generateSrc',
        value: function _generateSrc() {
            var html = 'https://maps.google.co.jp/maps?f=q' + '&amp;hl=' + _UrlQuery2.default.getValue('lang') + '&amp;q=' + this.m_strMarker + '&amp;sspn=' + this.m_strScreenSpan + '&amp;sll=' + this.m_strSubCoordinate + '&amp;ll=' + this.m_strCoordinate + '&amp;cid=' + this.m_intCoordinateId + '&amp;iwloc=' + this.m_strInfoWindowLocation + '&amp;num=10' + '&amp;source=s_q' + '&amp;t=m' + '&amp;z=17' + '&amp;output=embed';

            return html;
        }
    }, {
        key: 'toHtml',
        value: function toHtml() {
            var tableTag = new _html_tags.TableTag(),
                titleRow = new _html_tags.TableRow(),
                lineRow = new _html_tags.TableRow(),
                titleCol = new _html_tags.TableColumn('Map'),
                lineCol = new _html_tags.TableColumn('<hr /><br />');

            tableTag.addClass('body__map__container');
            titleCol.addAttr('colspan', '4');
            titleCol.addClass('body__label');
            lineCol.addAttr('colspan', '4');

            titleRow.addColumn(titleCol);
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);

            var iframeHtml = '<iframe ' + 'class="body__map__contents" ' + 'width="' + this.m_intWidth + '" ' + 'height="' + this.m_intHeight + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ' + 'src="' + this._generateSrc() + '">' + '</iframe>';

            var bodyRow = new _html_tags.TableRow(),
                bodyCol = new _html_tags.TableColumn(iframeHtml);

            bodyCol.addAttr('colspan', '4');
            bodyRow.addColumn(bodyCol);
            tableTag.body.addRow(bodyRow);

            return tableTag.toHtml();
        }
    }, {
        key: 'width',
        set: function set(value) {
            this.m_intWidth = value;
        }
    }, {
        key: 'height',
        set: function set(value) {
            this.m_intHeight = value;
        }
    }, {
        key: 'infoWindowLocation',
        set: function set(value) {
            this.m_strInfoWindowLocation = value;
        }
    }, {
        key: 'coordinate',
        set: function set(value) {
            this.m_strCoordinate = value;
        }
    }, {
        key: 'subCoordinate',
        set: function set(value) {
            this.m_strSubCoordinate = value;
        }
    }, {
        key: 'marker',
        set: function set(value) {
            this.m_strMarker = value;
        }
    }, {
        key: 'coordinateId',
        set: function set(value) {
            this.m_intCoordinateId = value;
        }
    }, {
        key: 'screenSpan',
        set: function set(value) {
            this.m_strScreenSpan = value;
        }
    }]);

    return MapControl;
}();

//-------------------------------------------------------
//
// IntlHtmlControl
//
// [Dependencies]
//     HtmlControl.cs
//     UrlQuery.cs
//
//-------------------------------------------- YuMaeda --


var IntlHtmlControl = function (_HtmlControl4) {
    _inherits(IntlHtmlControl, _HtmlControl4);

    function IntlHtmlControl($parentContainer) {
        _classCallCheck(this, IntlHtmlControl);

        var _this5 = _possibleConstructorReturn(this, (IntlHtmlControl.__proto__ || Object.getPrototypeOf(IntlHtmlControl)).call(this, $parentContainer));

        _this5.m_strLang = _UrlQuery2.default.getValue('lang');
        if (!_this5.m_strLang) {
            _this5.m_strLang = 'ja';
        }

        _this5.m_objResourceString = {};
        return _this5;
    }

    _createClass(IntlHtmlControl, [{
        key: 'addString',
        value: function addString(strKey, strJpn, strEng) {
            this.m_objResourceString[strKey] = { 'ja': strJpn, 'en': strEng };
        }
    }, {
        key: 'getString',
        value: function getString(strId) {
            var str = '';

            if (strId in this.m_objResourceString) {
                str = this.m_objResourceString[strId][this.m_strLang];
            }

            return str;
        }
    }]);

    return IntlHtmlControl;
}(HtmlControl);

//-------------------------------------------------------
//
// ProfileControl
//
// [Dependencies]
//     IntlHtmlControl.cs
//
//-------------------------------------------- YuMaeda --


var ProfileControl = function (_IntlHtmlControl) {
    _inherits(ProfileControl, _IntlHtmlControl);

    function ProfileControl(strTableName, $parentContainer) {
        _classCallCheck(this, ProfileControl);

        var _this6 = _possibleConstructorReturn(this, (ProfileControl.__proto__ || Object.getPrototypeOf(ProfileControl)).call(this, $parentContainer));

        _get(ProfileControl.prototype.__proto__ || Object.getPrototypeOf(ProfileControl.prototype), 'addString', _this6).call(_this6, 'HOME_TOWN_LABEL', '出身地　/', 'Home Town /');
        _get(ProfileControl.prototype.__proto__ || Object.getPrototypeOf(ProfileControl.prototype), 'addString', _this6).call(_this6, 'CAREER_HISTORY_LABEL', '職　歴　/', 'Career History /');
        _get(ProfileControl.prototype.__proto__ || Object.getPrototypeOf(ProfileControl.prototype), 'addString', _this6).call(_this6, 'FAVORITE_LABEL', '趣　味　/', 'Favorite /');

        _this6.m_strTableName = strTableName;
        return _this6;
    }

    _createClass(ProfileControl, [{
        key: '_generateTable',
        value: function _generateTable(objProfile) {
            var nameHtml = '<span class="text-large">{0}</span>'.format(objProfile.name),
                phoneticHtml = '<span class="text-small">&nbsp;&nbsp;({0})</span>'.format(objProfile.phonetic),
                innerTable = new _html_tags.TableTag(),
                positionRow = new _html_tags.TableRow(),
                nameRow = new _html_tags.TableRow(),
                lineRow = new _html_tags.TableRow(),
                prefectureRow = new _html_tags.TableRow(),
                careerRow = new _html_tags.TableRow(),
                favoriteRow = new _html_tags.TableRow(),
                positionCol = new _html_tags.TableColumn(objProfile.position),
                nameCol = new _html_tags.TableColumn(nameHtml + phoneticHtml),
                lineCol = new _html_tags.TableColumn('<hr class="line-thin" />'),
                prefectureLabelCol = new _html_tags.TableColumn(this.getString('HOME_TOWN_LABEL')),
                prefectureCol = new _html_tags.TableColumn(objProfile.prefecture),
                careerLabelCol = new _html_tags.TableColumn(this.getString('CAREER_HISTORY_LABEL')),
                careerCol = new _html_tags.TableColumn(objProfile.career_history),
                favoriteLabelCol = new _html_tags.TableColumn(this.getString('FAVORITE_LABEL')),
                favoriteCol = new _html_tags.TableColumn(objProfile.favorite);

            positionCol.addAttr('colspan', '2');
            positionCol.addClass('text-small');
            nameCol.addAttr('colspan', '2');
            lineCol.addAttr('colspan', '2');
            prefectureRow.addClass('text-small padding-top-small');
            prefectureLabelCol.addClass('label-column');
            prefectureCol.addAttr('colspan', '2');
            careerRow.addClass('text-small padding-top-small');
            careerLabelCol.addClass('label-column');
            favoriteRow.addClass('text-small padding-top-small');
            favoriteLabelCol.addClass('label-column');

            positionRow.addColumn(positionCol);
            nameRow.addColumn(nameCol);
            lineRow.addColumn(lineCol);
            prefectureRow.addColumn(prefectureLabelCol);
            prefectureRow.addColumn(prefectureCol);
            careerRow.addColumn(careerLabelCol);
            careerRow.addColumn(careerCol);
            favoriteRow.addColumn(favoriteLabelCol);
            favoriteRow.addColumn(favoriteCol);

            innerTable.body.addRow(positionRow);
            innerTable.body.addRow(nameRow);
            innerTable.body.addRow(lineRow);
            innerTable.body.addRow(prefectureRow);
            innerTable.body.addRow(careerRow);
            innerTable.body.addRow(favoriteRow);

            var imgTag = new _html_tags.ImageTag('images/profiles/' + objProfile.filename);
            imgTag.addClass('profile-image');

            // Creates an outer table.
            var tableTag = new _html_tags.TableTag(),
                tableRow = new _html_tags.TableRow(),
                imgCol = new _html_tags.TableColumn(imgTag.toHtml());

            tableTag.addClass('auto-horizontal-margin contents-width margin-top-small margin-bottom-large text-left');
            imgCol.addAttr('style', 'padding-right:15px;');

            tableRow.addColumn(imgCol);
            tableRow.addColumn(new _html_tags.TableColumn(innerTable.toHtml()));
            tableTag.body.addRow(tableRow);

            return tableTag.toHtml();
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            // Set a header.
            var tableTag = new _html_tags.TableTag(),
                titleRow = new _html_tags.TableRow(),
                lineRow = new _html_tags.TableRow(),
                titleCol = new _html_tags.TableColumn('Staff'),
                lineCol = new _html_tags.TableColumn('<hr /><br />'),
                self = this;

            tableTag.addClass('auto-horizontal-margin width-semi-full text-left');
            titleCol.addAttr('colspan', '2');
            titleCol.addClass('eng-font');
            lineCol.addAttr('colspan', '2');

            titleRow.addColumn(titleCol);
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);
            this.$m_parentContainer.html(tableTag.toHtml());

            $.ajax({
                url: './get_items.php',
                dataType: 'json',
                data: {
                    dbTable: self.m_strTableName,
                    orderBy: 'sort_order'
                },

                success: function success(data) {
                    var profilesHtml = '',
                        cData = data.length;

                    for (var i = 0; i < cData; ++i) {
                        profilesHtml += self._generateTable(data[i]);
                    }

                    self.$m_parentContainer.append(profilesHtml);
                },

                error: function error() {}
            });
        }
    }]);

    return ProfileControl;
}(IntlHtmlControl);

//-------------------------------------------------------
//
// PhotoControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --


var PhotoControl = function (_HtmlControl5) {
    _inherits(PhotoControl, _HtmlControl5);

    function PhotoControl(intCategory, $parentContainer) {
        _classCallCheck(this, PhotoControl);

        var _this7 = _possibleConstructorReturn(this, (PhotoControl.__proto__ || Object.getPrototypeOf(PhotoControl)).call(this, $parentContainer));

        _this7.m_intCategory = intCategory;
        return _this7;
    }

    _createClass(PhotoControl, [{
        key: '_getHeaderText',
        value: function _getHeaderText() {
            var strHeader = '';

            if (this.m_intCategory % 5 == 2) {
                strHeader = 'Store Interior';
            } else if (this.m_intCategory % 5 == 3) {
                strHeader = 'Dish';
            } else if (this.m_intCategory % 5 == 4) {
                strHeader = 'Magazine';
            }

            return strHeader;
        }
    }, {
        key: '_generateThumbnailsHtml',
        value: function _generateThumbnailsHtml(rgobjPhoto) {
            var iCol = 0,
                cPhoto = rgobjPhoto.length,
                objPhoto = null,
                headerText = this._getHeaderText(),
                tableTag = new _html_tags.TableTag();

            tableTag.addClass('auto-horizontal-margin contents-width text-left');

            if (headerText) {
                var titleRow = new _html_tags.TableRow(),
                    lineRow = new _html_tags.TableRow(),
                    titleCol = new _html_tags.TableColumn(headerText),
                    lineCol = new _html_tags.TableColumn('<hr /><br />');

                titleCol.addAttr('colspan', '8');
                titleCol.addClass('eng-font');
                lineCol.addAttr('colspan', '8');
                titleRow.addColumn(titleCol);
                lineRow.addColumn(lineCol);

                tableTag.head.addRow(titleRow);
                tableTag.head.addRow(lineRow);
            }

            var tableWidth = this.$m_parentContainer.outerWidth(true) * 0.8,
                imgWidth = 135,
                imgPadding = (tableWidth - imgWidth * 4) / 3,
                imgHtml = '';

            var iPhoto = 0;
            while (iPhoto < 4 || iPhoto < cPhoto) {
                if (iCol === 0) {
                    var newRow = new _html_tags.TableRow();
                    if (cPhoto > iCol + 4) {
                        newRow.addClass('padding-bottom-x-large');
                    }

                    tableTag.body.addRow(newRow);
                }
                ++iCol;

                if (iPhoto < cPhoto) {
                    objPhoto = rgobjPhoto[iPhoto];
                    imgHtml = '<a href="#" class="thumbnail-img" img="http://sei-ya.jp/' + objPhoto.dir + objPhoto.filename + '" rel="' + objPhoto.comment + '">' + '<img src="//sei-ya.jp/' + objPhoto.dir + 'thumb_' + objPhoto.filename + '" />' + '</a>';
                } else {
                    imgHtml = '';
                }

                var imgCol = new _html_tags.TableColumn(imgHtml);
                imgCol.addAttr('style', 'width:{0}px;'.format(imgWidth));

                tableTag.body.lastRow.addColumn(imgCol);
                if (iCol <= 3) {
                    var imgPaddingCol = new _html_tags.TableColumn('&nbsp;');
                    imgPaddingCol.addAttr('style', 'width:{0}px;'.format(imgPadding));
                    tableTag.body.lastRow.addColumn(imgPaddingCol);
                } else {
                    iCol = 0;
                }

                ++iPhoto;
            }

            return tableTag.toHtml();
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var strTableName = this.m_intCategory <= 5 ? 'mitsugetsu_photos' : 'ofuro_photos',
                self = this;

            $.ajax({
                url: './get_items.php',
                data: {
                    dbTable: strTableName,
                    condition: 'category={0}'.format(this.m_intCategory),
                    orderBy: 'sort_order'
                },
                dataType: 'json',
                success: function success(rgobjPhoto) {
                    self.$m_parentContainer.html(self._generateThumbnailsHtml(rgobjPhoto));
                },

                error: function error() {}
            });
        }
    }, {
        key: 'postRender',
        value: function postRender() {
            this.$m_parentContainer.on('click', '.thumbnail-img', function () {
                _ModalWindow2.default.show('<img src="' + $(this).attr('img') + '" />', $(this).attr('rel'));

                return false;
            });
        }
    }]);

    return PhotoControl;
}(HtmlControl);

//-------------------------------------------------------
//
// BeerControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --


var BeerControl = function (_HtmlControl6) {
    _inherits(BeerControl, _HtmlControl6);

    function BeerControl($parentContainer, strTableName) {
        _classCallCheck(this, BeerControl);

        var _this8 = _possibleConstructorReturn(this, (BeerControl.__proto__ || Object.getPrototypeOf(BeerControl)).call(this, $parentContainer, strTableName));

        _this8.m_strTableName = strTableName;
        _this8.m_rgobjBeer = [];
        return _this8;
    }

    _createClass(BeerControl, [{
        key: '_generateLogoHtml',
        value: function _generateLogoHtml() {
            var logoHtml = new _html_tags.ImageTag('./images/gargery.gif').toHtml(),
                anchorTag = new _html_tags.AnchorTag('http://www.gargery.com', logoHtml);

            anchorTag.addAttr('rel', 'nofollow');
            anchorTag.addClass('gargery-link');

            return anchorTag.toHtml();
        }
    }, {
        key: '_generateTable',
        value: function _generateTable(rgobjBeer, fDraft) {
            var objBeer,
                cBeer = rgobjBeer.length,
                html = '';

            if (cBeer > 0) {
                var imgTag,
                    anchorTag,
                    engNameHtml = '<span class="eng-font">Beer</span>',
                    jpnNameHtml = '<span class="text-small">麦酒</span>',
                    tableTag = new _html_tags.TableTag(),
                    titleRow = new _html_tags.TableRow(),
                    lineRow = new _html_tags.TableRow(),
                    logoRow = new _html_tags.TableRow(),
                    titleCol = new _html_tags.TableColumn('{0} / {1}'.format(engNameHtml, jpnNameHtml)),
                    lineCol = new _html_tags.TableColumn('<hr />'),
                    logoCol = new _html_tags.TableColumn(this._generateLogoHtml());

                tableTag.addClass('auto-horizontal-margin width-semi-full padding-bottom-large text-left');
                logoRow.addClass('padding-top-large');
                titleCol.addClass('text-left');
                lineCol.addAttr('colspan', '2');
                logoCol.addAttr('colspan', '2');
                logoCol.addClass('text-right');

                titleRow.addColumn(titleCol);
                lineRow.addColumn(lineCol);
                logoRow.addColumn(logoCol);

                tableTag.head.addRow(titleRow);
                tableTag.head.addRow(lineRow);
                tableTag.foot.addRow(logoRow);

                var ofuroUtility = new OfuroUtility();
                for (var i = 0; i < cBeer; ++i) {
                    objBeer = rgobjBeer[i];

                    var tableRow = new _html_tags.TableRow(),
                        nameCol = new _html_tags.TableColumn(objBeer.loc_name),
                        priceCol = new _html_tags.TableColumn(ofuroUtility.getPriceText2(objBeer, false));

                    tableRow.addClass('padding-top-small');
                    nameCol.addClass('text-small');
                    priceCol.addClass('text-right text-small eng-font');
                    tableRow.addColumn(nameCol);
                    tableRow.addColumn(priceCol);

                    tableTag.body.addRow(tableRow);
                }

                html = tableTag.toHtml();
            }

            return html;
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            this.m_rgobjBeer.length = 0;

            var self = this;

            $.ajax({
                url: './get_items.php',
                dataType: 'json',
                data: {
                    dbTable: self.m_strTableName,
                    orderBy: 'sort_order'
                },

                success: function success(data) {
                    var cData = data.length;

                    for (var i = 0; i < cData; ++i) {
                        switch (data[i].category) {
                            case 1:
                                self.m_rgobjBeer.push(data[i]);
                                break;
                            default:
                                break;
                        }
                    }

                    var html = self._generateTable(self.m_rgobjBeer);
                    self.$m_parentContainer.html(html);
                },

                error: function error() {}
            });
        }
    }]);

    return BeerControl;
}(HtmlControl);

//-------------------------------------------------------
//
// DrinkControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --


var DrinkControl = function (_HtmlControl7) {
    _inherits(DrinkControl, _HtmlControl7);

    function DrinkControl($parentContainer, strTableName) {
        _classCallCheck(this, DrinkControl);

        var _this9 = _possibleConstructorReturn(this, (DrinkControl.__proto__ || Object.getPrototypeOf(DrinkControl)).call(this, $parentContainer));

        _this9.m_strTableName = strTableName;
        _this9.m_rgobjShochu = [];
        _this9.m_rgobjSake = [];
        _this9.m_rgobjLiquor = [];
        _this9.m_rgobjCocktail = [];
        _this9.m_rgobjSoftDrink = [];
        _this9.m_rgobjHerbTea = [];
        return _this9;
    }

    _createClass(DrinkControl, [{
        key: 'generateTable',
        value: function generateTable(rgobjDrink, strTitle, strJpnTitle) {
            var objDrink = null,
                cDrink = rgobjDrink.length,
                html = '',
                tableTag = new _html_tags.TableTag();

            if (cDrink > 0) {
                tableTag.addClass('auto-horizontal-margin width-semi-full margin-bottom-large text-left');
                var titleRow = new _html_tags.TableRow(),
                    lineRow = new _html_tags.TableRow(),
                    titleCol = new _html_tags.TableColumn('<span class="eng-font">{0}</span> / <span class="text-small">{1}</span>'.format(strTitle, strJpnTitle)),
                    lineCol = new _html_tags.TableColumn('<hr />');

                titleCol.addClass('text-left');
                titleRow.addColumn(titleCol);
                lineCol.addAttr('colspan', '2');
                lineRow.addColumn(lineCol);

                tableTag.head.addRow(titleRow);
                tableTag.head.addRow(lineRow);

                var ofuroUtility = new OfuroUtility();

                for (var i = 0; i < cDrink; ++i) {
                    objDrink = rgobjDrink[i];

                    var fontStyle = 'jpn-font';
                    if (objDrink.loc_name) {
                        fontStyle = 'eng-font';
                    }

                    if (objDrink.name) {
                        var nameRow = new _html_tags.TableRow(),
                            nameCol = new _html_tags.TableColumn(objDrink.name),
                            priceCol = new _html_tags.TableColumn(ofuroUtility.getPriceText2(objDrink, false));

                        nameRow.addClass('padding-top-small');
                        nameCol.addClass('text-small');
                        nameCol.addClass(fontStyle);
                        priceCol.addClass('text-right text-small eng-font');
                        nameRow.addColumn(nameCol);
                        nameRow.addColumn(priceCol);

                        tableTag.body.addRow(nameRow);
                    }

                    if (objDrink.loc_name) {
                        var jpnNameRow = new _html_tags.TableRow(),
                            jpnNameCol = new _html_tags.TableColumn(objDrink.loc_name);

                        jpnNameCol.addClass('text-x-small');
                        jpnNameRow.addColumn(jpnNameCol);
                        tableTag.body.addRow(jpnNameRow);

                        if (!objDrink.name) {
                            tableTag.addCol(OfuroUtility.getPriceText(objDrink, false), null, ['text-right text-small eng-font']);
                        }
                    }
                }

                html = tableTag.toHtml();
            }

            return html;
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            this.m_rgobjShochu.length = 0;
            this.m_rgobjSake.length = 0;
            this.m_rgobjLiquor.length = 0;
            this.m_rgobjCocktail.length = 0;
            this.m_rgobjSoftDrink.length = 0;
            this.m_rgobjHerbTea.length = 0;

            var self = this;

            $.ajax({
                url: './get_items.php',
                dataType: 'json',
                data: {
                    dbTable: self.m_strTableName,
                    orderBy: 'sort_order'
                },

                success: function success(data) {
                    var cData = data.length;

                    for (var i = 0; i < cData; ++i) {
                        switch (data[i].category) {
                            case 10:
                                self.m_rgobjShochu.push(data[i]);
                                break;
                            case 11:
                                self.m_rgobjSake.push(data[i]);
                                break;
                            case 12:
                                self.m_rgobjLiquor.push(data[i]);
                                break;
                            case 13:
                                self.m_rgobjCocktail.push(data[i]);
                                break;
                            case 14:
                                self.m_rgobjSoftDrink.push(data[i]);
                                break;
                            case 15:
                                self.m_rgobjHerbTea.push(data[i]);
                                break;
                            default:
                                break;
                        }
                    }

                    var html = self.generateTable(self.m_rgobjShochu, 'Shochu', '焼酎') + self.generateTable(self.m_rgobjSake, 'Sake', '日本酒') + self.generateTable(self.m_rgobjLiquor, 'Liquor', 'リキュール') + self.generateTable(self.m_rgobjCocktail, 'Cocktail', 'カクテル') + self.generateTable(self.m_rgobjSoftDrink, 'Soft Drink', '無酒') + self.generateTable(self.m_rgobjHerbTea, 'Herb Tea', 'ハーブ・ティー');

                    self.$m_parentContainer.html(html);
                },

                error: function error() {}
            });
        }
    }]);

    return DrinkControl;
}(HtmlControl);

//-------------------------------------------------------
//
// BrandyControl
//
// [Dependencies]
//     DrinkControl.js
//
//-------------------------------------------- YuMaeda --


var BrandyControl = function (_DrinkControl) {
    _inherits(BrandyControl, _DrinkControl);

    function BrandyControl($parentContainer, strTableName) {
        _classCallCheck(this, BrandyControl);

        var _this10 = _possibleConstructorReturn(this, (BrandyControl.__proto__ || Object.getPrototypeOf(BrandyControl)).call(this, $parentContainer, strTableName));

        _this10.m_rgobjMarc = [];
        _this10.m_rgobjFine = [];
        _this10.m_rgobjCalvados = [];
        _this10.m_rgobjCognac = [];
        _this10.m_rgobjArmagnac = [];
        _this10.m_rgobjMadeira = [];
        _this10.m_rgobjGrappa = [];
        _this10.m_rgobjWhisky = [];
        _this10.m_rgobjEauDeVie = [];
        return _this10;
    }

    _createClass(BrandyControl, [{
        key: 'renderChildren',
        value: function renderChildren() {
            this.m_rgobjMarc.length = 0;
            this.m_rgobjFine.length = 0;
            this.m_rgobjCalvados.length = 0;
            this.m_rgobjCognac.length = 0;
            this.m_rgobjArmagnac.length = 0;
            this.m_rgobjMadeira.length = 0;
            this.m_rgobjGrappa.length = 0;
            this.m_rgobjWhisky.length = 0;
            this.m_rgobjEauDeVie.length = 0;

            var self = this;

            $.ajax({
                url: './get_items.php',
                dataType: 'json',
                data: {
                    dbTable: self.m_strTableName,
                    orderBy: 'sort_order'
                },

                success: function success(rgobjBrandy) {
                    var cBrandy = rgobjBrandy.length,
                        objBrandy = null;

                    for (var i = 0; i < cBrandy; ++i) {
                        objBrandy = rgobjBrandy[i];
                        switch (objBrandy.category) {
                            case 2:
                                self.m_rgobjMarc.push(objBrandy);
                                break;
                            case 3:
                                self.m_rgobjFine.push(objBrandy);
                                break;
                            case 4:
                                self.m_rgobjCalvados.push(objBrandy);
                                break;
                            case 5:
                                self.m_rgobjCognac.push(objBrandy);
                                break;
                            case 6:
                                self.m_rgobjArmagnac.push(objBrandy);
                                break;
                            case 7:
                                self.m_rgobjMadeira.push(objBrandy);
                                break;
                            case 8:
                                self.m_rgobjGrappa.push(objBrandy);
                                break;
                            case 9:
                                self.m_rgobjWhisky.push(objBrandy);
                                break;
                            case 16:
                                self.m_rgobjEauDeVie.push(objBrandy);
                                break;
                            default:
                                break;
                        }
                    }

                    var html = self.generateTable(self.m_rgobjMarc, 'Marc', 'マール') + self.generateTable(self.m_rgobjFine, 'Fine', 'フィーヌ') + self.generateTable(self.m_rgobjCalvados, 'Calvados', 'カルヴァドス') + self.generateTable(self.m_rgobjCognac, 'Cognac', 'コニャック') + self.generateTable(self.m_rgobjArmagnac, 'Armagnac', 'アルマニャック') + self.generateTable(self.m_rgobjMadeira, 'Madeira', 'マデイラ') + self.generateTable(self.m_rgobjGrappa, 'Grappa', 'グラッパ') + self.generateTable(self.m_rgobjWhisky, 'Whisky', 'ウィスキー') + self.generateTable(self.m_rgobjEauDeVie, 'Eau de Vie', 'オー・ド・ヴィ');

                    self.$m_parentContainer.html(html);
                },

                error: function error() {}
            });
        }
    }]);

    return BrandyControl;
}(DrinkControl);

//-------------------------------------------------------
//
// DailyMenuControl
//
// [Dependencies]
//     HtmlControl.cs
//     TableTag.cs
//     TableRow.cs
//     TableColumn.cs
//
//-------------------------------------------- YuMaeda --


var DailyMenuControl = function (_HtmlControl8) {
    _inherits(DailyMenuControl, _HtmlControl8);

    function DailyMenuControl(strTableName, $parentContainer) {
        _classCallCheck(this, DailyMenuControl);

        var _this11 = _possibleConstructorReturn(this, (DailyMenuControl.__proto__ || Object.getPrototypeOf(DailyMenuControl)).call(this, $parentContainer));

        _this11.m_strTableName = strTableName;
        if (strTableName === 'mitsugetsu_dishes') {
            _this11.m_rgobjTitle = [{ 'en': 'Cold Hors d\'Oeuvres', 'ja': '冷たい前菜' }, { 'en': 'Hot Hors d\'Oeuvres', 'ja': '温かい前菜' }, { 'en': 'Pasta', 'ja': 'パスタ' }, { 'en': 'Fish Dishes', 'ja': '魚料理' }, { 'en': 'Meat Dishes', 'ja': '肉料理' }, { 'en': 'Gibier', 'ja': 'ジビエ' }, { 'en': 'Gohan', 'ja': 'ごはん物' }, { 'en': 'Cheese', 'ja': 'チーズ' }, { 'en': 'Dessert', 'ja': 'デザート' }, { 'en': 'Mitsu Course', 'ja': '蜜コース' }, { 'en': 'Getsu Course', 'ja': '月コース' }, { 'en': 'Dry Fruit', 'ja': 'ドライフルーツ' }];
        } else {
            _this11.m_rgobjTitle = [{ 'en': 'Cold Hors d\'Oeuvres', 'ja': '冷たい前菜' }, { 'en': 'Hot Hors d\'Oeuvres', 'ja': '温かい前菜' }, { 'en': 'Fish Dishes', 'ja': '魚料理' }, { 'en': 'Meat Dishes', 'ja': '肉料理' }, { 'en': 'Small Dish', 'ja': '小皿' }, { 'en': 'Gohan', 'ja': 'ごはん物' }, { 'en': 'Pasta', 'ja': 'パスタ' }, { 'en': 'Cheese', 'ja': 'チーズ' }, { 'en': 'Dessert', 'ja': 'デザート' }];
        }
        return _this11;
    }

    _createClass(DailyMenuControl, [{
        key: '_generateDishTableHtml',
        value: function _generateDishTableHtml(rgobjDish, strHeadTitle) {
            var cDish = rgobjDish.length,
                objDish = null;

            if (cDish <= 0) {
                return '';
            }

            if (!strHeadTitle) {
                var objTitle = this.m_rgobjTitle[rgobjDish[0].category - 1];

                strHeadTitle = '<span class="eng-font">{0}</span> / <span class="text-small jpn-font">{1}</span>'.format(objTitle['en'], objTitle['ja']);
            } else {
                strHeadTitle = '<span class="eng-font">{0}</span>'.format(strHeadTitle);
            }

            var tableTag = new _html_tags.TableTag(),
                titleRow = new _html_tags.TableRow(),
                lineRow = new _html_tags.TableRow(),
                titleCol = new _html_tags.TableColumn(strHeadTitle),
                lineCol = new _html_tags.TableColumn('<hr />');

            tableTag.addClass('auto-horizontal-margin contents-width margin-bottom-large text-left');
            titleCol.addClass('text-left');
            titleRow.addColumn(titleCol);
            lineCol.addAttr('colspan', '2');
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);

            for (var i = 0; i < cDish; ++i) {
                var dishNameHtml = '';

                objDish = rgobjDish[i];
                if (objDish.name) {
                    dishNameHtml = '<span class="text-small">{0}</span>'.format(objDish.name);
                } else {
                    dishNameHtml = '<span class="text-small" title="{0}">{1}</span>'.format(objDish.comment, objDish.loc_name);
                }

                var ofuroUtility = new OfuroUtility(),
                    dishNameRow = new _html_tags.TableRow(),
                    dishNameCol = new _html_tags.TableColumn(dishNameHtml),
                    priceCol = new _html_tags.TableColumn(ofuroUtility.getPriceText2(objDish, false));

                dishNameRow.addClass('padding-top-medium');
                dishNameCol.addClass('padding-top-medium dish-name-col');
                priceCol.addClass('text-right text-small eng-font');

                dishNameRow.addColumn(dishNameCol);
                dishNameRow.addColumn(priceCol);

                tableTag.body.addRow(dishNameRow);
            }

            return tableTag.toHtml();
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var self = this;

            $.ajax({
                url: './get_items.php',
                cache: false,
                dataType: 'json',
                data: {
                    dbTable: self.m_strTableName,
                    condition: 'daily=1',
                    orderBy: 'sort_order'
                },

                success: function success(rgobjMenu) {
                    var today = new Today(),
                        html = self._generateDishTableHtml(rgobjMenu, today.toString());

                    self.$m_parentContainer.html(html);
                },

                error: function error() {}
            });
        }
    }]);

    return DailyMenuControl;
}(HtmlControl);

//-------------------------------------------------------
//
// DishMenuControl
//
//-------------------------------------------- YuMaeda --


var DishMenuControl = function (_DailyMenuControl) {
    _inherits(DishMenuControl, _DailyMenuControl);

    function DishMenuControl(strTableName, $parentContainer) {
        _classCallCheck(this, DishMenuControl);

        var _this12 = _possibleConstructorReturn(this, (DishMenuControl.__proto__ || Object.getPrototypeOf(DishMenuControl)).call(this, strTableName, $parentContainer));

        _this12.m_objDishHash = {};
        return _this12;
    }

    _createClass(DishMenuControl, [{
        key: 'renderChildren',
        value: function renderChildren() {
            var self = this;

            $.ajax({
                url: './get_items.php',
                cache: false,
                dataType: 'json',
                data: {
                    dbTable: self.m_strTableName,
                    condition: 'daily=0',
                    orderBy: 'sort_order'
                },

                success: function success(rgobjDish) {
                    var cDish = rgobjDish.length;

                    for (var i = 0; i < cDish; ++i) {
                        var objDish = rgobjDish[i];
                        if (!self.m_objDishHash[objDish.category]) {
                            self.m_objDishHash[objDish.category] = [];
                        }

                        self.m_objDishHash[objDish.category].push(objDish);
                    }

                    var html = '',
                        cDishCategory = self.m_rgobjTitle.length;

                    for (var i = 0; i < cDishCategory; ++i) {
                        if (self.m_objDishHash[i + 1]) {
                            html += self._generateDishTableHtml(self.m_objDishHash[i + 1], '');
                        }
                    }

                    self.$m_parentContainer.html(html);
                },

                error: function error() {}
            });
        }
    }]);

    return DishMenuControl;
}(DailyMenuControl);

//-------------------------------------------------------
//
// RestaurantWineList
//
// [Dependencies]
//     HtmlControl.js
//
//-------------------------------------------- YuMaeda --


var RestaurantWineList = function (_HtmlControl9) {
    _inherits(RestaurantWineList, _HtmlControl9);

    function RestaurantWineList($parentContainer, strNotice) {
        _classCallCheck(this, RestaurantWineList);

        var _this13 = _possibleConstructorReturn(this, (RestaurantWineList.__proto__ || Object.getPrototypeOf(RestaurantWineList)).call(this, $parentContainer));

        _this13.m_strNotice = strNotice;
        return _this13;
    }

    _createClass(RestaurantWineList, [{
        key: '_generatePdfViewerHtml',
        value: function _generatePdfViewerHtml(filePath, altText) {
            var html = '<div class="auto-horizontal-margin contents-width">' + '<object data="{0}" type="application/pdf" class="pdf-container">'.format(filePath) + '<a href="{0}" class="jpn-font text-x-small">{1}</a>'.format(filePath, altText) + '</object>' + '</div>';

            return html;
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var frenchMenuUrl = '../winelist.pdf',
                nonFrenchMenuUrl = '../winelist_nf.pdf';

            this.$m_parentContainer.html(this._generatePdfViewerHtml(frenchMenuUrl, 'ワインリスト（フランス）'));
            this.$m_parentContainer.append('<br /><br />' + this._generatePdfViewerHtml(nonFrenchMenuUrl, 'ワインリスト（フランス以外）'));

            var tableTag = new _html_tags.TableTag(),
                titleRow = new _html_tags.TableRow(),
                lineRow = new _html_tags.TableRow(),
                noticeRow = new _html_tags.TableRow(),
                lineCol = new _html_tags.TableColumn('<hr />'),
                noticeCol = new _html_tags.TableColumn(this.m_strNotice);

            // Add a header w/ notification.
            tableTag.addClass('auto-horizontal-margin width-semi-full text-left');

            lineCol.addAttr('colspan', '2');
            noticeCol.addClass('text-x-small');

            titleRow.addColumn(new _html_tags.TableColumn('<span class="eng-font">Wine List</span>'));
            lineRow.addColumn(lineCol);
            noticeRow.addClass('padding-top-small padding-bottom-x-large');
            noticeRow.addColumn(noticeCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);
            tableTag.body.addRow(noticeRow);

            this.$m_parentContainer.prepend(tableTag.toHtml());
        }
    }]);

    return RestaurantWineList;
}(HtmlControl);

//-------------------------------------------------------
//
// RecommendedWineControl
//
// [Dependencies]
//     HtmlControl.js
//
//-------------------------------------------- YuMaeda --


var RecommendedWineControl = function (_IntlHtmlControl2) {
    _inherits(RecommendedWineControl, _IntlHtmlControl2);

    function RecommendedWineControl(strTableName, intType, $parentContainer) {
        _classCallCheck(this, RecommendedWineControl);

        var _this14 = _possibleConstructorReturn(this, (RecommendedWineControl.__proto__ || Object.getPrototypeOf(RecommendedWineControl)).call(this, $parentContainer));

        _this14.m_rgobjTitle = [{ 'ja': 'スパークリング・ワイン', 'en': 'Sparkling Wine' }, { 'ja': 'シャンパーニュ', 'en': 'Champagne' }, { 'ja': '白ワイン', 'en': 'White Wine' }, { 'ja': 'ロゼワイン', 'en': 'Rosé Wine' }, { 'ja': '赤ワイン', 'en': 'Red Wine' }, { 'ja': '甘口ワイン', 'en': 'Dessert Wine' }];

        _this14.m_strTableName = strTableName;
        _this14.m_intType = intType;
        return _this14;
    }

    _createClass(RecommendedWineControl, [{
        key: '_getWineVintageText',
        value: function _getWineVintageText(vintage) {
            var strVintage = 'S.A.',
                intVintage = parseInt(vintage, 10);

            if (intVintage !== 'NaN' && intVintage > 1000) {
                strVintage = intVintage;
                if (this.m_strLang == 'ja') {
                    strVintage += '年';
                }
            }

            return strVintage;
        }
    }, {
        key: '_getWineTitleHtml',
        value: function _getWineTitleHtml(objWine) {
            var strTitle = '<span class="text-small-medium eng-font">{0} {1} ({2})</span>'.format(this._getWineVintageText(objWine.vintage), objWine.name, objWine.producer);

            return strTitle;
        }
    }, {
        key: '_generateWineListHtml',
        value: function _generateWineListHtml(rgobjWine, intType) {
            var cWine = rgobjWine.length,
                objWine = null,
                strFlagImg = '',
                strVintage = '',
                tableTag = new _html_tags.TableTag();

            tableTag.addClass('auto-horizontal-margin contents-width text-left');

            if (cWine > 0) {
                // Add header.
                var lineRow = new _html_tags.TableRow(),
                    titleRow = new _html_tags.TableRow(),
                    lineCol = new _html_tags.TableColumn('<hr /><br />'),
                    titleCol = new _html_tags.TableColumn('<span class="eng-font">{0}</span> / <span class="text-small">{1}</span>'.format(this.m_rgobjTitle[intType - 1]['en'], this.m_rgobjTitle[intType - 1]['ja']));

                titleCol.addAttr('colspan', '3');
                titleCol.addClass('text-left');
                titleRow.addColumn(titleCol);
                lineCol.addAttr('colspan', '3');
                lineRow.addColumn(lineCol);

                tableTag.head.addRow(titleRow);
                tableTag.head.addRow(lineRow);

                for (var i = 0; i < cWine; ++i) {
                    objWine = rgobjWine[i];

                    strFlagImg = _CountryInfo2.default.getImgFileName(objWine.country);
                    strVintage = this._getWineVintageText(objWine.vintage);

                    var wineDetailHtml = this._getWineTitleHtml(objWine) + '<br />' + '<span class="text-x-small">{0} {1}&nbsp;&nbsp;({2})</span><br />'.format(strVintage, objWine.name_jpn, objWine.producer_jpn) + '<span class="text-small">{0}<br /></span>'.format(objWine.region_jpn);

                    if (objWine.cepage) {
                        wineDetailHtml += '<span class="text-x-small">[ {0} ]</span>'.format(objWine.cepage);
                    }

                    objWine['price'] = objWine.store_price;

                    var ofuroUtility = new OfuroUtility(),
                        tableRow = new _html_tags.TableRow(),
                        imgCol = new _html_tags.TableColumn('<img src="images/' + strFlagImg + '" />'),
                        detailCol = new _html_tags.TableColumn(wineDetailHtml),
                        priceCol = new _html_tags.TableColumn(ofuroUtility.getPriceText2(objWine, false));

                    tableRow.addClass('general-wine-row');
                    imgCol.addClass('text-top flag-col');
                    detailCol.addClass('wine-name-col text-top');
                    priceCol.addClass('text-right text-top text-small eng-font');

                    tableRow.addColumn(imgCol);
                    tableRow.addColumn(detailCol);
                    tableRow.addColumn(priceCol);

                    tableTag.body.addRow(tableRow);
                }
            }

            return tableTag.toHtml();
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var strCondition = '';
            switch (this.m_intType) {
                case 1:
                case 2:
                    strCondition = '(page_number >= 9) AND (page_number <= 11)';
                    break;
                case 3:
                    strCondition = '(page_number >= 13) AND (page_number <= 15)';
                    break;
                case 4:
                    strCondition = '(page_number = 12)';
                    break;
                case 5:
                    strCondition = '(page_number >= 16) AND (page_number <= 20)';
                    break;
            }

            var self = this;

            $.ajax({
                url: './get_items.php',
                dataType: 'json',
                data: {
                    dbTable: self.m_strTableName,
                    condition: strCondition,
                    orderBy: 'item_number'
                },

                success: function success(rgobjWine) {
                    self.$m_parentContainer.html(self._generateWineListHtml(rgobjWine, self.m_intType));
                },

                error: function error() {}
            });
        }
    }]);

    return RecommendedWineControl;
}(IntlHtmlControl);

//-------------------------------------------------------
//
// AllWineControl 
//
// [Dependencies]
//     RecommendedWineControl.js
//
//-------------------------------------------- YuMaeda --


var AllWineControl = function (_RecommendedWineContr) {
    _inherits(AllWineControl, _RecommendedWineContr);

    function AllWineControl(strTableName, $parentContainer) {
        _classCallCheck(this, AllWineControl);

        return _possibleConstructorReturn(this, (AllWineControl.__proto__ || Object.getPrototypeOf(AllWineControl)).call(this, strTableName, 0, $parentContainer));
    }

    _createClass(AllWineControl, [{
        key: 'preRender',
        value: function preRender() {
            _get(AllWineControl.prototype.__proto__ || Object.getPrototypeOf(AllWineControl.prototype), 'preRender', this).call(this);

            this.$m_parentContainer.html('');
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var cType = 6,
                intType = 0,
                self = this;

            for (var i = 0; i < cType; ++i) {
                intType = i + 1;

                $.ajax({
                    url: './get_items.php',
                    async: false,
                    dataType: 'json',
                    data: {
                        dbTable: self.m_strTableName,
                        condition: '(page_number=2) AND (color={0})'.format(intType),
                        orderBy: 'item_number'
                    },

                    success: function success(rgobjWine) {
                        var html = self._generateWineListHtml(rgobjWine, intType);
                        self.$m_parentContainer.append(html);
                    },

                    error: function error() {}
                });
            }
        }
    }]);

    return AllWineControl;
}(RecommendedWineControl);

function renderHeader() {
    var html = '<a href="./index.html" class="header__link">' + '<figure class="logo__container">' + '<img src="images/logo.png" class="logo__image" />' + '<figcaption class="logo__caption">Since 2007</figcaption>' + '</figure>' + '</a>';

    $('header.header').html(html);
}

function renderSlideShow() {
    var pageUrl = 'http://sei-ya.jp/mitsu-getsu/slideshow.html?siteName=mitsu-getsu',
        imgHtml = '<iframe class="slideshow__container" src="{0}" />'.format(pageUrl);

    $('div.body').html(imgHtml);
}

function renderFooter() {
    var contactInfo = new ContactInfo($('footer.footer'));

    contactInfo.email = 'mitsu-getsu@sei-ya.jp';
    contactInfo.phoneNumber = '03-6413-1810';
    contactInfo.faxNumber = '03-6413-9736';
    contactInfo.address = '1F 2-13-1 Kyodo, Setagaya-ku, Tokyo 156-0052';
    contactInfo.openingHour = '17:00～24:00(Sun～Thr) 17:00～26:00(Fri～Sat)';
    contactInfo.closedOn = 'Tuesday';
    contactInfo.facebookUrl = 'https://www.facebook.com/pages/%E5%89%B5%E4%BD%9C%E5%92%8C%E9%A3%9F%E3%81%A8%E3%83%AF%E3%82%A4%E3%83%B3-%E8%9C%9C%E6%9C%88/245358198909164';
    contactInfo.render();
}

$(document).ready(function () {
    renderHeader();
    new MitsuGetsuMenu($('aside.menu')).render();

    renderSlideShow();
    renderFooter();
});

},{"../../e-commerce/modules/build/CountryInfo":1,"../../e-commerce/modules/build/ModalWindow":2,"../../e-commerce/modules/build/UrlQuery":3,"../../e-commerce/modules/build/html_tags":4}]},{},[5]);
