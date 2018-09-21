(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _html_tags = require('../../../e-commerce/modules/build/html_tags');

var _fields = require('../../../e-commerce/modules/build/fields');

var _CountryInfo = require('../../../e-commerce/modules/build/CountryInfo');

var _CountryInfo2 = _interopRequireDefault(_CountryInfo);

var _HtmlUtility = require('../../../e-commerce/anyway-grapes/singletons/HtmlUtility.js');

var _HtmlUtility2 = _interopRequireDefault(_HtmlUtility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// RecommendedWineManager
//
//-------------------------------------------- YuMaeda --
var RecommendedWineManager = function () {
    function RecommendedWineManager() {
        _classCallCheck(this, RecommendedWineManager);

        this.m_strSiteName = '';
        this.m_strDatabaseTable = '';
        this.m_strHeaderText = '';
        this.m_strFooterText = '';
        this.m_strHeaderSubText = '';
        this.m_fRestaurantPrice = true;
        this.m_fWholesalePrice = false;
        this.m_fAllowPrintForLess = false, this.m_intPage = 0;
        this.m_iFirstItemNumber = 0;
        this.m_cExpectedItem = 9;
        this.m_cFocusout = 0;
    }

    _createClass(RecommendedWineManager, [{
        key: 'postRender',
        value: function postRender() {
            var self = this;

            $('select#pageSelect').change(function () {
                $('button#printBtn').hide();
                self.onPageSelectChange($(this), self);
            });
        }
    }, {
        key: '_getColorAsInt',
        value: function _getColorAsInt(objWine) {
            var intColor = objWine.color;

            if (!intColor) {
                switch (objWine.type) {
                    case 'Champagne':
                    case 'Champagne Rosé':
                    case 'Mousseux':
                    case 'Mousseux Rosé':
                    case 'Mousseux Rouge':
                        intColor = 1;
                        break;
                    case 'Blanc':
                    case 'Jaune':
                        intColor = 3;
                        break;
                    case 'Rosé':
                        intColor = 4;
                        break;
                    case 'Rouge':
                        intColor = 5;
                        break;
                    case 'Doux':
                        intColor = 6;
                        break;
                    default:
                        console.log(objWine.type);
                        break;
                }
            }

            return intColor;
        }
    }, {
        key: '_getCssColor',
        value: function _getCssColor(intColor) {
            var colorValue = '';

            switch (intColor) {
                case 1:
                    colorValue = 'rgb(254,188,90)';
                    break;
                case 3:
                    colorValue = 'rgb(68,191,227)';
                    break;
                case 4:
                    colorValue = 'rgb(253,179,193)';
                    break;
                case 5:
                    colorValue = 'rgb(218,24,58)';
                    break;
                case 6:
                    colorValue = 'rgb(170,85,0)';
                    break;
                default:
                    break;
            }

            return colorValue;
        }
    }, {
        key: '_generateBarcodeNumberFldHtml',
        value: function _generateBarcodeNumberFldHtml(index) {
            var barcodeNumberFld = new _fields.TextField('barcode_number_{0}'.format(index), '');

            barcodeNumberFld.addAttr('maxlength', 4);
            barcodeNumberFld.addAttr('tabindex', index);

            return barcodeNumberFld.toHtml();
        }
    }, {
        key: '_updateTotal',
        value: function _updateTotal() {
            var strTaxNote = '※価格は税込価格となっております。';
            if (this.m_strFooterText != strTaxNote) {
                var intTotal = 0,
                    intTaxedTotal = 0,
                    footerText = '';

                $('input.priceFld').each(function () {
                    var $strPrice = $(this).val();
                    if ($strPrice != '') {
                        intTotal += parseInt($(this).val(), 10);
                    }
                });

                footerText = '{0} yen'.format(intTotal.format());
                if (!this.m_fRestaurantPrice) {
                    intTaxedTotal = Math.floor(intTotal * 1.08);
                    footerText += ' [Taxed: {0} yen]'.format(intTaxedTotal.format());
                } else {
                    footerText += ' ' + strTaxNote;
                }

                $('input[name=footerText]').val(footerText);
            }
        }
    }, {
        key: '_generateRowHtml',
        value: function _generateRowHtml(index) {
            var buttonsHtml = '';

            if (index !== this.m_iFirstItemNumber) {
                buttonsHtml += '<img id="upBtn%%INDEX%%" src="../../images/upArrow.png" class="buttonImage" />';
            }

            if (index !== this.m_iFirstItemNumber + this.m_cExpectedItem - 1) {
                buttonsHtml += '<img id="downBtn%%INDEX%%" src="../../images/downArrow.png" class="buttonImage" />';
            }

            var html = '<tr>' + '<td class="firstCol">' + this._generateBarcodeNumberFldHtml(index) + '<br />' + '<img id="flagImg%%INDEX%%" src="" alt="FLAG" />' + '<br />' + '<span>#{0}</span>'.format(index) + '</td>' + '<td class="secondCol" id="previewPane%%INDEX%%"></td>' + '<td class="thirdCol">' + buttonsHtml + '</td>' + '</tr>';

            return html.replace(/%%INDEX%%/g, index);
        }
    }, {
        key: '_clearPreview',
        value: function _clearPreview(index) {
            $('td#previewPane{0} :input'.format(index)).val('');
            $('td#previewPane{0}'.format(index)).closest('tr').find('td.firstCol > input').attr('code', '');
            $('img#flagImg{0}'.format(index)).attr('src', '');

            this._updateTotal();
        }
    }, {
        key: '_getProducerFieldValue',
        value: function _getProducerFieldValue(objWine) {
            var strProducer = objWine.producer;

            if (objWine.region == 'Bordeaux') {
                strProducer = objWine.village ? objWine.village : objWine.district;
            }

            return strProducer;
        }
    }, {
        key: '_getJpnProducerFieldValue',
        value: function _getJpnProducerFieldValue(objWine) {
            var strProducer = objWine.producer_jpn;

            if (objWine.region == 'Bordeaux') {
                strProducer = objWine.village_jpn ? objWine.village_jpn : objWine.district_jpn;
            }

            return strProducer;
        }
    }, {
        key: '_getJpnRegionFieldValue',
        value: function _getJpnRegionFieldValue(objWine) {
            var strRegion = objWine.region_jpn ? objWine.region_jpn : '';
            if (objWine.district_jpn) {
                strRegion = '{0} / {1}'.format(strRegion, objWine.district_jpn);
            }

            return strRegion;
        }
    }, {
        key: '_renderPreviewPane',
        value: function _renderPreviewPane(objWine, index, self) {
            if (objWine) {
                var strCountry,
                    flagImgName,
                    flagImgPath,
                    $tableRow,
                    intColor = self._getColorAsInt(objWine);
                if (intColor == 2) {
                    alert('入力されたバーコードのアイテムは、ワインではありません。もう一度バーコードを入力しなおして下さい。');
                    return;
                }

                var $tableRow = $('td#previewPane{0}'.format(index)).closest('tr');
                $tableRow.css('background-color', self._getCssColor(intColor));

                if (objWine.country) {
                    strCountry = _CountryInfo2.default.getJpnName(objWine.country);
                    flagImgName = _CountryInfo2.default.getImgFileName(objWine.country);
                    flagImgPath = 'http://sei-ya.jp/{0}/images/{1}'.format(self.m_strSiteName, flagImgName);
                }

                var strName = objWine.combined_name ? objWine.combined_name : objWine.name,
                    strJpnName = objWine.combined_name_jpn ? objWine.combined_name_jpn : objWine.name_jpn,
                    strCepage = objWine.cepage ? objWine.cepage : '',
                    strComment = objWine.comment ? objWine.comment : '',
                    intQty = objWine.quantity ? objWine.quantity : '',
                    intPrice = objWine.restaurant_price ? objWine.restaurant_price : objWine.store_price; // Set to the restaurant price first.

                if (self.m_intPage == 2 && objWine.glass_price) {
                    intPrice = objWine.glass_price;
                } else if (!self.m_fRestaurantPrice && objWine.price) {
                    intPrice = objWine.price;
                    if (self.m_fWholesalePrice) {
                        // Use Math.round() in order to workaround PHP rounding problem.
                        intPrice = parseInt(Math.round(intPrice * 0.7));
                    }
                }

                var colorFld = new _fields.HiddenField('color_{0}'.format(index), intColor),
                    flagImgFld = new _fields.HiddenField('flagImg_{0}'.format(index), flagImgName),
                    countryFld = new _fields.HiddenField('country_{0}'.format(index), objWine.country),
                    jpnCountryFld = new _fields.HiddenField('country_jpn_{0}'.format(index), strCountry),
                    vintageFld = new _fields.TextField('vintage_{0}'.format(index), objWine.vintage),
                    nameFld = new _fields.TextField('name_{0}'.format(index), _HtmlUtility2.default.htmlEncode(strName)),
                    producerFld = new _fields.TextField('producer_{0}'.format(index), _HtmlUtility2.default.htmlEncode(self._getProducerFieldValue(objWine))),
                    priceFld = new _fields.TextField('price_{0}'.format(index), intPrice),
                    quantityFld = new _fields.TextField('quantity_{0}'.format(index), intQty),
                    jpnNameFld = new _fields.TextField('name_jpn_{0}'.format(index), _HtmlUtility2.default.htmlEncode(strJpnName)),
                    jpnProducerFld = new _fields.TextField('producer_jpn_{0}'.format(index), _HtmlUtility2.default.htmlEncode(self._getJpnProducerFieldValue(objWine))),
                    jpnRegionFld = new _fields.TextField('region_jpn_{0}'.format(index), _HtmlUtility2.default.htmlEncode(self._getJpnRegionFieldValue(objWine))),
                    cepageFld = new _fields.TextField('cepage_{0}'.format(index), _HtmlUtility2.default.htmlEncode(strCepage)),
                    commentFld = new _fields.MultiTextField('comment_{0}'.format(index), _HtmlUtility2.default.htmlEncode(strComment));

                vintageFld.addClass('vintageFld');
                nameFld.addClass('nameFld');
                producerFld.addClass('producerFld');
                priceFld.addClass('priceFld');
                priceFld.addAttr('maxlength', 7);

                quantityFld.addClass('quantityFld');

                jpnNameFld.addClass('jpnNameFld');
                jpnProducerFld.addClass('jpnProducerFld');
                jpnRegionFld.addClass('jpnRegionFld');
                cepageFld.addClass('cepageFld');
                commentFld.addAttr('rows', '2');
                commentFld.addAttr('cols', '60');
                commentFld.addAttr('maxlength', '120');
                commentFld.addClass('commentFld');

                var html = colorFld.toHtml() + flagImgFld.toHtml() + countryFld.toHtml() + jpnCountryFld.toHtml() + vintageFld.toHtml() + '{0}&nbsp;({1})'.format(nameFld.toHtml(), producerFld.toHtml()) + priceFld.toHtml() + '<span class="textSmall">&nbsp;yen</span>';

                if (self.m_intPage == 2) {
                    html += '&nbsp;/&nbsp;{0}<span class="textSmall">&nbsp;ml</span>'.format(quantityFld.toHtml());
                }

                html += '<br />' + jpnNameFld.toHtml() + '<span>&nbsp;({0})</span><br />'.format(jpnProducerFld.toHtml()) + jpnRegionFld.toHtml() + '<span>【{0}】</span>'.format(cepageFld.toHtml()) + commentFld.toHtml();

                if (objWine.barcode_number) {
                    var $barcodeInput = $('td.firstCol > input[name=barcode_number_{0}]'.format(index));
                    $barcodeInput.val(objWine.barcode_number);
                    $barcodeInput.attr('code', objWine.barcode_number);
                }

                $('td#previewPane{0}'.format(index)).html(html);
                $('img#flagImg{0}'.format(index)).attr('src', flagImgPath);
            }

            if ($('.firstCol > img[src!=""]').length == self.m_cExpectedItem) {
                $('button#printBtn').fadeIn(600);
            } else {
                if (!self.m_fAllowPrintForLess) {
                    $('button#printBtn').hide();
                } else {
                    $('button#printBtn').fadeIn(600);
                }
            }
        }
    }, {
        key: 'onBarcodeNumberInputFocusout',
        value: function onBarcodeNumberInputFocusout($input, self) {
            var curBarcode = $input.val();

            if (self.m_cFocusout !== 0) {
                return;
            }
            self.m_cFocusout += 1;

            var index = $input.attr('tabindex');
            $.ajax({
                url: 'http://anyway-grapes.jp/restaurant/get_wine.php',
                data: { code: curBarcode },
                dataType: 'jsonp',
                jsonp: 'xDomainCallback',
                success: function success(data) {
                    if (data.length === 1) {
                        self._renderPreviewPane(data[0], index, self);
                        self._updateTotal();
                    } else {
                        self._clearPreview(index);
                    }
                },

                error: function error() {
                    self._clearPreview(index);
                }
            });
        }
    }, {
        key: 'onRenderWineList',
        value: function onRenderWineList() {
            var self = this;

            var html = '';

            if (this.m_strHeaderSubText) {
                html += '<input type="text" name="pageSubtitle" class="subtitleFld" value="{0}" />'.format(this.m_strHeaderSubText);
            }

            html += '<input type="hidden" name="dbTable"         value="{0}" />'.format(this.m_strDatabaseTable) + '<input type="hidden" name="pageTitle"       value="{0}" />'.format(this.m_strHeaderText) + '<input type="hidden" name="footerText"      value="{0}" />'.format(this.m_strFooterText) + '<input type="hidden" name="firstItemNumber" value="{0}" />'.format(this.m_iFirstItemNumber) + '<input type="hidden" name="page_number"     value="{0}" />'.format(this.m_intPage);

            html += '<table style="border-collapse:collapse;">';
            for (var i = 0; i < this.m_cExpectedItem; ++i) {
                html += this._generateRowHtml(this.m_iFirstItemNumber + i);
            }
            html += '</table>';

            $('div').html(html);

            $.ajax({
                url: '../../get_items.php',
                dataType: 'json',
                data: {
                    dbTable: self.m_strDatabaseTable,
                    condition: 'page_number={0}'.format(self.m_intPage)
                },

                success: function success(data) {
                    var objWine = null,
                        cWine = data.length;

                    for (var i = 0; i < cWine; ++i) {
                        objWine = data[i];
                        self._renderPreviewPane(objWine, objWine.item_number, self);
                    }

                    self._updateTotal();
                },

                error: function error() {}
            });

            $('img.buttonImage').click(function () {
                self.onImageButtonClick($(this));
            });

            var $inputs = $('td.firstCol > input');
            $inputs.focusout(function () {
                self.onBarcodeNumberInputFocusout($(this), self);
            });

            $inputs.keyup(function () {
                self.m_cFocusout = 0;
            });
        }
    }, {
        key: 'onImageButtonClick',
        value: function onImageButtonClick($image) {
            var $curRow = $image.closest('tr'),
                $targetRow = null,
                srcRowId = $curRow.find('td.firstCol > span').html().replace('#', '');

            if ($image.attr('id').startsWith('upBtn')) {
                $targetRow = $curRow.closest('tr').prev();
            } else if ($image.attr('id').startsWith('downBtn')) {
                $targetRow = $curRow.closest('tr').next();
            }

            var targetRowId = $targetRow.find('td.firstCol > span').html().replace('#', ''),
                tmpBarcodeNumber = $targetRow.find('td.firstCol > input').val(),
                tmpFlagImageUrl = $targetRow.find('td.firstCol > img').attr('src'),
                tmpColorCss = $targetRow.css('background-color');

            $targetRow.find('td.firstCol > input').val($curRow.find('td.firstCol > input').val());
            $targetRow.find('td.firstCol > img').attr('src', $curRow.find('td.firstCol > img').attr('src'));
            $targetRow.css('background-color', $curRow.css('background-color'));

            $curRow.find('td.firstCol > input').val(tmpBarcodeNumber);
            $curRow.find('td.firstCol > input').attr('code', tmpBarcodeNumber);
            $curRow.find('td.firstCol > img').attr('src', tmpFlagImageUrl);
            $curRow.css('background-color', tmpColorCss);

            var iTargetField = 0,
                iCurField = 0,
                tmpFieldValues = [],
                $targetFields = $targetRow.find('td.secondCol :input'),
                $curFields = $curRow.find('td.secondCol :input');

            $targetFields.each(function () {
                var $this = $(this);

                tmpFieldValues.push($this.val());
                $this.val($($curFields.get(iTargetField)).val());

                // Replace the index suffix in the 'name' attribute.
                var nameAttr = $this.attr('name');
                $this.attr('name', nameAttr.replace(srcRowId, targetRowId));

                ++iTargetField;
            });

            $curFields.each(function () {
                var $this = $(this);

                $this.val(tmpFieldValues[iCurField]);

                // Replace the index suffix in the 'name' attribute.
                var nameAttr = $this.attr('name');
                $this.attr('name', nameAttr.replace(targetRowId, srcRowId));

                ++iCurField;
            });
        }
    }, {
        key: 'onPageSelectChange',
        value: function onPageSelectChange($select, self) {
            self.m_strHeaderText = $select.find('option:selected').text();
            self.m_strFooterText = '※価格は税込価格となっております。';

            self.m_intPage = $select.val();
            if (self.m_intPage == 2) {
                self.m_cExpectedItem = 12;
                self.m_iFirstItemNumber = 1000;
                self.m_strHeaderSubText = '本日のグラスワイン';
            } else if (self.m_intPage == 3) {
                self.m_cExpectedItem = 12;
                self.m_iFirstItemNumber = 1012;
                self.m_strHeaderSubText = '今月のオススメボトル';
            } else if (self.m_intPage == 999) {
                // Only used by Anyway-Grapes.
                self.m_cExpectedItem = 12;
                self.m_iFirstItemNumber = 1;
                self.m_fRestaurantPrice = false;
                self.m_strHeaderSubText = '納品書（仮）';
                self.m_strFooterText = '';
            } else if (self.m_intPage == 1000) {
                // Only used by Anyway-Grapes.
                self.m_cExpectedItem = 12;
                self.m_iFirstItemNumber = 1;
                self.m_fRestaurantPrice = false;
                self.m_strHeaderSubText = '納品書（仮）';

                self.m_strFooterText = '';
                self.m_fWholesalePrice = true;
                self.m_fAllowPrintForLess = true;
            } else if (self.m_intPage == 1001) {
                // Only used by Anyway-Grapes.
                self.m_cExpectedItem = 12;
                self.m_iFirstItemNumber = 1;
                self.m_fRestaurantPrice = true;
                self.m_strHeaderText = 'Wine List';
                self.m_strHeaderSubText = '納品書（仮）';

                self.m_strFooterText = '';
                self.m_fWholesalePrice = false;
                self.m_fAllowPrintForLess = true;
            } else if (self.m_intPage == 9999) // Only used by Himawari.
                {
                    self.m_cExpectedItem = 12;
                    self.m_iFirstItemNumber = 1;
                } else {
                self.m_cExpectedItem = 9;
                self.m_iFirstItemNumber = (self.m_intPage - 9) * self.m_cExpectedItem + 1;
                self.m_strHeaderSubText = '';
            }

            self.onRenderWineList();
        }
    }, {
        key: 'siteName',
        get: function get() {
            return this.m_strSiteName;
        },
        set: function set(value) {
            this.m_strSiteName = value;
        }
    }, {
        key: 'databaseTable',
        set: function set(value) {
            this.m_strDatabaseTable = value;
        }
    }]);

    return RecommendedWineManager;
}();

$(document).ready(function () {
    var wineMgr = new RecommendedWineManager();

    wineMgr.siteName = 'ofuro';
    wineMgr.databaseTable = 'ofuro_recommended_wines';
    wineMgr.postRender();

    var imgTag = new _html_tags.ImageTag('http://sei-ya.jp/{0}/images/adminHome.png'.format(wineMgr.siteName));
    imgTag.addClass('adminHomeImg');

    $('header').html('<a href="http://sei-ya.jp/admin_home.html">{0}</a>'.format(imgTag.toHtml()));
});

},{"../../../e-commerce/anyway-grapes/singletons/HtmlUtility.js":2,"../../../e-commerce/modules/build/CountryInfo":3,"../../../e-commerce/modules/build/fields":4,"../../../e-commerce/modules/build/html_tags":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _html_tags = require('../../modules/build/html_tags');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-------------------------------------------------------
//
// HtmlUtility (Requires jqueiry.js)
//
//-------------------------------------------- YuMaeda --
var HtmlUtility = function () {
    function HtmlUtility() {
        _classCallCheck(this, HtmlUtility);

        if (!HtmlUtility.instance) {
            HtmlUtility.instance = this;
        }

        return HtmlUtility.instance;
    }

    _createClass(HtmlUtility, [{
        key: 'renderPage',
        value: function renderPage($parentContainer, pageUrl) {
            var html = '<iframe src="{0}" width="100%" onload="iframeLoaded()" frameborder="0" class="content-height-iframe"></iframe>'.format(pageUrl);

            $parentContainer.html(html);
        }

        // Copied from seiya.wineutility-0.1.jp

    }, {
        key: 'generateImgHtml',
        value: function generateImgHtml(strBarcode, strClass) {
            var baseDirUrl = '//anyway-grapes.jp/images/wines/400px/',
                imgUrl = '{0}/{1}.png'.format(baseDirUrl, strBarcode),
                emptyImgUrl = '{0}/no_wine_photo.png'.format(baseDirUrl),
                imgTag = new _html_tags.ImageTag(imgUrl);

            imgTag.addAttr('alt', strBarcode);
            imgTag.addAttr('onerror', 'this.src=\'' + emptyImgUrl + '\';');
            imgTag.addClass(strClass);

            return imgTag.toHtml();
        }
    }, {
        key: 'htmlEncode',
        value: function htmlEncode(strHtml) {
            return $('<div/>').text(strHtml).html().replace(/"/g, '&quot;');
        }
    }, {
        key: 'htmlDecode',
        value: function htmlDecode(strHtml) {
            return $('<div/>').html(strHtml).text().replace('&quot;', '"', 'gi');
        }
    }]);

    return HtmlUtility;
}();

var instance = new HtmlUtility();
Object.freeze(instance);

exports.default = instance;

},{"../../modules/build/html_tags":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextField = exports.MultiTextField = exports.HiddenField = exports.FileField = exports.CurrencyField = exports.NumberField = exports.ChoiceField = exports.BooleanField = exports.BaseField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _html_tags = require('./html_tags');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//-------------------------------------------------------
//
// BaseField
//
//-------------------------------------------- YuMaeda --
var BaseField = exports.BaseField = function (_InputTag) {
    _inherits(BaseField, _InputTag);

    function BaseField(strName, strType, strValue) {
        _classCallCheck(this, BaseField);

        var _this = _possibleConstructorReturn(this, (BaseField.__proto__ || Object.getPrototypeOf(BaseField)).call(this, strName, strType, strValue));

        _this.m_fRequired = false;
        return _this;
    }

    _createClass(BaseField, [{
        key: 'toHtml',
        value: function toHtml() {
            if (this.m_fRequired) {
                this.addAttr('required', 'required');
            }

            return _get(BaseField.prototype.__proto__ || Object.getPrototypeOf(BaseField.prototype), 'toHtml', this).call(this);
        }
    }, {
        key: 'isRequired',
        get: function get() {
            return this.m_fRequired;
        },
        set: function set(fRequired) {
            this.m_fRequired = fRequired;
        }
    }]);

    return BaseField;
}(_html_tags.InputTag);

//-------------------------------------------------------
//
// BooleanField
//
// [Dependencies]
//     BaseField.js
//
//-------------------------------------------- YuMaeda --


var BooleanField = exports.BooleanField = function (_BaseField) {
    _inherits(BooleanField, _BaseField);

    function BooleanField(strName, fSelected) {
        _classCallCheck(this, BooleanField);

        var _this2 = _possibleConstructorReturn(this, (BooleanField.__proto__ || Object.getPrototypeOf(BooleanField)).call(this, strName, 'checkbox', '1'));

        if (fSelected) {
            _this2.addAttr('checked', 'checked');
        }
        return _this2;
    }

    return BooleanField;
}(BaseField);

//-------------------------------------------------------
//
// ChoiceField
//
//-------------------------------------------- YuMaeda --
var ChoiceField = exports.ChoiceField = function (_SelectTag) {
    _inherits(ChoiceField, _SelectTag);

    function ChoiceField(strName) {
        _classCallCheck(this, ChoiceField);

        var _this3 = _possibleConstructorReturn(this, (ChoiceField.__proto__ || Object.getPrototypeOf(ChoiceField)).call(this));

        _this3.addAttr('name', strName);
        return _this3;
    }

    return ChoiceField;
}(_html_tags.SelectTag);

//-------------------------------------------------------
//
// NumberField
//
// [Dependencies]
//     BaseField.js
//
//-------------------------------------------- YuMaeda --


var NumberField = exports.NumberField = function (_BaseField2) {
    _inherits(NumberField, _BaseField2);

    function NumberField(strName, strValue) {
        _classCallCheck(this, NumberField);

        return _possibleConstructorReturn(this, (NumberField.__proto__ || Object.getPrototypeOf(NumberField)).call(this, strName, 'number', strValue));
    }

    return NumberField;
}(BaseField);

//-------------------------------------------------------
//
// CurrencyField
//
// [Dependencies]
//     NumberField.js
//
//-------------------------------------------- YuMaeda --


var CurrencyField = exports.CurrencyField = function (_NumberField) {
    _inherits(CurrencyField, _NumberField);

    function CurrencyField(strName, strValue) {
        _classCallCheck(this, CurrencyField);

        var _this5 = _possibleConstructorReturn(this, (CurrencyField.__proto__ || Object.getPrototypeOf(CurrencyField)).call(this, strName, strValue));

        _this5.addAttr('step', '10');
        _this5.m_strUnit = 'yen';
        return _this5;
    }

    _createClass(CurrencyField, [{
        key: 'toHtml',
        value: function toHtml() {
            return _get(CurrencyField.prototype.__proto__ || Object.getPrototypeOf(CurrencyField.prototype), 'toHtml', this).call(this) + '&nbsp;' + this.m_strUnit;
        }
    }, {
        key: 'unit',
        set: function set(strUnit) {
            this.m_strUnit = strUnit;
        }
    }]);

    return CurrencyField;
}(NumberField);

//-------------------------------------------------------
//
// FileField
//
// [Dependencies]
//     BaseField.js
//
//-------------------------------------------- YuMaeda --


var FileField = exports.FileField = function (_BaseField3) {
    _inherits(FileField, _BaseField3);

    function FileField(strName) {
        _classCallCheck(this, FileField);

        return _possibleConstructorReturn(this, (FileField.__proto__ || Object.getPrototypeOf(FileField)).call(this, strName, 'file', ''));
    }

    return FileField;
}(BaseField);

//-------------------------------------------------------
//
// HiddenField
//
// [Dependencies]
//     BaseField.js
//
//-------------------------------------------- YuMaeda --


var HiddenField = exports.HiddenField = function (_BaseField4) {
    _inherits(HiddenField, _BaseField4);

    function HiddenField(strName, strValue) {
        _classCallCheck(this, HiddenField);

        return _possibleConstructorReturn(this, (HiddenField.__proto__ || Object.getPrototypeOf(HiddenField)).call(this, strName, 'hidden', strValue));
    }

    return HiddenField;
}(BaseField);

//-------------------------------------------------------
//
// MultiTextField
//
//-------------------------------------------- YuMaeda --
var MultiTextField = exports.MultiTextField = function (_TextAreaTag) {
    _inherits(MultiTextField, _TextAreaTag);

    function MultiTextField(strName, strValue) {
        _classCallCheck(this, MultiTextField);

        return _possibleConstructorReturn(this, (MultiTextField.__proto__ || Object.getPrototypeOf(MultiTextField)).call(this, strName, strValue));
    }

    return MultiTextField;
}(_html_tags.TextAreaTag);

//-------------------------------------------------------
//
// TextField
//
// [Dependencies]
//     BaseField.js
//
//-------------------------------------------- YuMaeda --


var TextField = exports.TextField = function (_BaseField5) {
    _inherits(TextField, _BaseField5);

    function TextField(strName, strValue) {
        _classCallCheck(this, TextField);

        return _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, strName, 'text', strValue));
    }

    return TextField;
}(BaseField);

},{"./html_tags":5}],5:[function(require,module,exports){
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

},{}]},{},[1]);
