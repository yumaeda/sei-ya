//-------------------------------------------------------
//
// RecommendedWineManager
//
//-------------------------------------------- YuMaeda --
class RecommendedWineManager
{
    constructor()
    {
        this.m_strSiteName        = '';
        this.m_strDatabaseTable   = '';
        this.m_strHeaderText      = '';
        this.m_strFooterText      = '';
        this.m_strHeaderSubText   = '';
        this.m_fRestaurantPrice   = true;
        this.m_fWholesalePrice    = false;
        this.m_fAllowPrintForLess = false,
        this.m_intPage            = 0;
        this.m_iFirstItemNumber   = 0;
        this.m_cExpectedItem      = 9;
        this.m_cFocusout          = 0;
    }

    postRender()
    {
        var self = this;

        $('select#pageSelect').change(function()
        {
            $('button#printBtn').hide();
            self.onPageSelectChange($(this), self);
        });
    }

    _getColorAsInt(objWine)
    {
        var intColor = objWine.color;

        if (!intColor)
        {
            switch (objWine.type)
            {
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

    _getCssColor(intColor)
    {
        var colorValue = '';

        switch (intColor)
        {
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

    _generateBarcodeNumberFldHtml(index)
    {
        var barcodeNumberFld = new TextField('barcode_number_{0}'.format(index), '');

        barcodeNumberFld.addAttr('maxlength', 6);
        barcodeNumberFld.addAttr('tabindex', index);

        return barcodeNumberFld.toHtml();
    }

    _updateTotal()
    {
        var strTaxNote = '※価格は税込価格となっております。';
        if (this.m_strFooterText != strTaxNote)
        {
            var intTotal      = 0,
                intTaxedTotal = 0,
                footerText    = '';

            $('input.priceFld').each(function()
            {
                var $strPrice = $(this).val();
                if ($strPrice != '')
                {
                    intTotal += parseInt($(this).val(), 10);
                }
            });

            footerText = '{0} yen'.format(intTotal.format());
            if (!this.m_fRestaurantPrice)
            {
                intTaxedTotal = Math.floor(intTotal * 1.08);
                footerText += ' [Taxed: {0} yen]'.format(intTaxedTotal.format());
            }
            else
            {
                footerText += ' ' + strTaxNote;
            }

            $('input[name=footerText]').val(footerText);
        }
    }

    _generateRowHtml(index)
    {
        var buttonsHtml = '';

        if (index !== this.m_iFirstItemNumber)
        {
            buttonsHtml +=
                '<img id="upBtn%%INDEX%%" src="../../images/upArrow.png" class="buttonImage" />';
        }

        if (index !== (this.m_iFirstItemNumber + this.m_cExpectedItem - 1))
        {
            buttonsHtml +=
                '<img id="downBtn%%INDEX%%" src="../../images/downArrow.png" class="buttonImage" />';
        }

        var html =
            '<tr>' +
                '<td class="firstCol">' +
                    this._generateBarcodeNumberFldHtml(index) + '<br />' +
                    '<img id="flagImg%%INDEX%%" src="" alt="FLAG" />' + '<br />' +
                    '<span>#{0}</span>'.format(index) +
                '</td>' +
                '<td class="secondCol" id="previewPane%%INDEX%%"></td>' +
                '<td class="thirdCol">' +
                    buttonsHtml +
                '</td>' +
            '</tr>';

        return html.replace(/%%INDEX%%/g, index);
    }

    _clearPreview(index)
    {
        $('td#previewPane{0} :input'.format(index)).val('');
        $('td#previewPane{0}'.format(index)).closest('tr').find('td.firstCol > input').attr('code', '');
        $('img#flagImg{0}'.format(index)).attr('src', '');

        this._updateTotal();
    }

    _getProducerFieldValue(objWine)
    {
        var strProducer = objWine.producer;

        if (objWine.region == 'Bordeaux')
        {
            strProducer = (objWine.village ? objWine.village : objWine.district);
        }

        return strProducer;
    }

    _getJpnProducerFieldValue(objWine)
    {
        var strProducer = objWine.producer_jpn;

        if (objWine.region == 'Bordeaux')
        {
            strProducer = (objWine.village_jpn ? objWine.village_jpn : objWine.district_jpn);
        }

        return strProducer;
    }

    _getJpnRegionFieldValue(objWine)
    {
        var strRegion = objWine.region_jpn ? objWine.region_jpn : '';
        if (objWine.district_jpn)
        {
            strRegion = '{0} / {1}'.format(strRegion, objWine.district_jpn);
        }

        return strRegion;
    }

    _renderPreviewPane(objWine, index, self)
    {
        if (objWine)
        {
            var strCountry, flagImgName, flagImgPath, $tableRow,
                intColor = self._getColorAsInt(objWine);
            if (intColor == 2)
            {
                alert('入力されたバーコードのアイテムは、ワインではありません。もう一度バーコードを入力しなおして下さい。');
                return;
            }

            var $tableRow  = $('td#previewPane{0}'.format(index)).closest('tr');
            $tableRow.css('background-color', self._getCssColor(intColor));

            if (objWine.country)
            {
                strCountry  = CountryInfo.getJpnName(objWine.country);
                flagImgName = CountryInfo.getImgFileName(objWine.country);
                flagImgPath = 'http://sei-ya.jp/{0}/images/{1}'.format(self.m_strSiteName, flagImgName);
            }

            var strName    = objWine.combined_name ? objWine.combined_name : objWine.name,
                strJpnName = objWine.combined_name_jpn ? objWine.combined_name_jpn : objWine.name_jpn,
                strCepage  = objWine.cepage ? objWine.cepage : '',
                strComment = objWine.comment ? objWine.comment : '',
                intQty     = objWine.quantity ? objWine.quantity : '',
                intPrice   = objWine.restaurant_price ? objWine.restaurant_price : objWine.store_price; // Set to the restaurant price first.
                
            if ((self.m_intPage == 2) && (objWine.glass_price))
            {
                intPrice = objWine.glass_price;
            }
            else if (!self.m_fRestaurantPrice && objWine.price)
            {
                intPrice = objWine.price;
                if (self.m_fWholesalePrice)
                {
                    // Use Math.round() in order to workaround PHP rounding problem.
                    intPrice = parseInt(Math.round(intPrice * 0.7));
                }
            }

            var colorFld       = new HiddenField('color_{0}'.format(index), intColor),
                flagImgFld     = new HiddenField('flagImg_{0}'.format(index), flagImgName),
                countryFld     = new HiddenField('country_{0}'.format(index), objWine.country),
                jpnCountryFld  = new HiddenField('country_jpn_{0}'.format(index), strCountry),
                vintageFld     = new TextField('vintage_{0}'.format(index), objWine.vintage),
                nameFld        = new TextField('name_{0}'.format(index), HtmlUtility.htmlEncode(strName)),
                producerFld    = new TextField('producer_{0}'.format(index), HtmlUtility.htmlEncode(self._getProducerFieldValue(objWine))),
                priceFld       = new TextField('price_{0}'.format(index), intPrice),
                quantityFld    = new TextField('quantity_{0}'.format(index), intQty),
                jpnNameFld     = new TextField('name_jpn_{0}'.format(index), HtmlUtility.htmlEncode(strJpnName)),
                jpnProducerFld = new TextField('producer_jpn_{0}'.format(index), HtmlUtility.htmlEncode(self._getJpnProducerFieldValue(objWine))),
                jpnRegionFld   = new TextField('region_jpn_{0}'.format(index), HtmlUtility.htmlEncode(self._getJpnRegionFieldValue(objWine))),
                cepageFld      = new TextField('cepage_{0}'.format(index), HtmlUtility.htmlEncode(strCepage)),
                commentFld     = new MultiTextField('comment_{0}'.format(index), HtmlUtility.htmlEncode(strComment));

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

            var html =
                colorFld.toHtml() +
                flagImgFld.toHtml() +
                countryFld.toHtml() +
                jpnCountryFld.toHtml() +
                vintageFld.toHtml() +
                '{0}&nbsp;({1})'.format(nameFld.toHtml(), producerFld.toHtml()) +
                priceFld.toHtml() +
                '<span class="textSmall">&nbsp;yen</span>';

            if (self.m_intPage == 2)
            {
                html += '&nbsp;/&nbsp;{0}<span class="textSmall">&nbsp;ml</span>'.format(quantityFld.toHtml());
            }

            html +=
                '<br />' +
                jpnNameFld.toHtml() +
                '<span>&nbsp;({0})</span><br />'.format(jpnProducerFld.toHtml()) +
                jpnRegionFld.toHtml() +
                '<span>【{0}】</span>'.format(cepageFld.toHtml()) +
                commentFld.toHtml();

            if (objWine.barcode_number)
            {
                var $barcodeInput = $('td.firstCol > input[name=barcode_number_{0}]'.format(index));
                $barcodeInput.val(objWine.barcode_number);
                $barcodeInput.attr('code', objWine.barcode_number);
            }

            $('td#previewPane{0}'.format(index)).html(html);
            $('img#flagImg{0}'.format(index)).attr('src', flagImgPath);
        }

        if ($('.firstCol > img[src!=""]').length == self.m_cExpectedItem)
        {
            $('button#printBtn').fadeIn(600);
        }
        else
        {
            if (!self.m_fAllowPrintForLess)
            {
                $('button#printBtn').hide();
            }
            else
            {
                $('button#printBtn').fadeIn(600);
            }
        }
    }

    get siteName()           { return this.m_strSiteName; }
    set siteName(value)      { this.m_strSiteName = value; }
    set databaseTable(value) { this.m_strDatabaseTable = value; }

    onBarcodeNumberInputFocusout($input, self)
    {
        var curBarcode = $input.val();

        if (self.m_cFocusout !== 0)
        {
            return;
        }
        self.m_cFocusout += 1;

        var index = $input.attr('tabindex');
        $.ajax(
        {
            url : 'http://anyway-grapes.jp/restaurant/get_wine.php',
            data: { code: curBarcode },
            dataType: 'jsonp',
            jsonp:    'xDomainCallback',
            success: function(data)
            {
                if (data.length === 1)
                {
                    self._renderPreviewPane(data[0], index, self);
                    self._updateTotal();
                }
                else
                {
                    self._clearPreview(index);
                }
            },

            error: function()
            {
                self._clearPreview(index);
            }
        });
    }

    onRenderWineList()
    {
        var self = this;

        var html = '';

        if (this.m_strHeaderSubText)
        {
            html += '<input type="text" name="pageSubtitle" class="subtitleFld" value="{0}" />'.format(this.m_strHeaderSubText);
        }

        html +=
            '<input type="hidden" name="dbTable"         value="{0}" />'.format(this.m_strDatabaseTable) +
            '<input type="hidden" name="pageTitle"       value="{0}" />'.format(this.m_strHeaderText) +
            '<input type="hidden" name="footerText"      value="{0}" />'.format(this.m_strFooterText) +
            '<input type="hidden" name="firstItemNumber" value="{0}" />'.format(this.m_iFirstItemNumber) +
            '<input type="hidden" name="page_number"     value="{0}" />'.format(this.m_intPage);

        html += '<table style="border-collapse:collapse;">';
        for (var i = 0; i < this.m_cExpectedItem; ++i)
        {
            html += this._generateRowHtml(this.m_iFirstItemNumber + i);
        }
        html += '</table>';

        $('div').html(html);

        $.ajax(
        { 
            url:      '../../get_items.php',
            dataType: 'json', 
            data:
            {
                dbTable: self.m_strDatabaseTable,
                condition: 'page_number={0}'.format(self.m_intPage)
            },

            success: function(data)
            { 
                var objWine = null,
                    cWine   = data.length;

                for  (var i = 0; i < cWine; ++i)
                {
                    objWine = data[i];
                    self._renderPreviewPane(objWine, objWine.item_number, self);
                }

                self._updateTotal();
            },

            error: function() {}
        });

        $('img.buttonImage').click(function()
        {
            self.onImageButtonClick($(this));
        });

        var $inputs = $('td.firstCol > input');
        $inputs.focusout(function()
        {
            self.onBarcodeNumberInputFocusout($(this), self);
        });

        $inputs.keyup(function() { self.m_cFocusout = 0; });
    }

    onImageButtonClick($image)
    {
        var $curRow    = $image.closest('tr'),
            $targetRow = null,
            srcRowId   = $curRow.find('td.firstCol > span').html().replace('#', '');

        if ($image.attr('id').startsWith('upBtn'))
        {
            $targetRow = $curRow.closest('tr').prev();
        }
        else if ($image.attr('id').startsWith('downBtn'))
        {
            $targetRow = $curRow.closest('tr').next();
        }

        var targetRowId      = $targetRow.find('td.firstCol > span').html().replace('#', ''),
            tmpBarcodeNumber = $targetRow.find('td.firstCol > input').val(),
            tmpFlagImageUrl  = $targetRow.find('td.firstCol > img').attr('src'),
            tmpColorCss      = $targetRow.css('background-color');

        $targetRow.find('td.firstCol > input').val($curRow.find('td.firstCol > input').val());
        $targetRow.find('td.firstCol > img').attr('src', $curRow.find('td.firstCol > img').attr('src'));
        $targetRow.css('background-color', $curRow.css('background-color'));

        $curRow.find('td.firstCol > input').val(tmpBarcodeNumber);
        $curRow.find('td.firstCol > input').attr('code', tmpBarcodeNumber);
        $curRow.find('td.firstCol > img').attr('src', tmpFlagImageUrl);
        $curRow.css('background-color', tmpColorCss);

        var iTargetField   = 0,
            iCurField      = 0,
            tmpFieldValues = [],
            $targetFields  = $targetRow.find('td.secondCol :input'),
            $curFields     = $curRow.find('td.secondCol :input');

        $targetFields.each(function()
        {
            var $this = $(this);

            tmpFieldValues.push($this.val());
            $this.val($($curFields.get(iTargetField)).val());

            // Replace the index suffix in the 'name' attribute.
            var nameAttr = $this.attr('name');
            $this.attr('name', nameAttr.replace(srcRowId, targetRowId));

            ++iTargetField;
        });

        $curFields.each(function()
        {
            var $this = $(this);

            $this.val(tmpFieldValues[iCurField]);

            // Replace the index suffix in the 'name' attribute.
            var nameAttr = $this.attr('name');
            $this.attr('name', nameAttr.replace(targetRowId, srcRowId));

            ++iCurField;
        });
    }

    onPageSelectChange($select, self)
    {
        self.m_strHeaderText = $select.find('option:selected').text();
        self.m_strFooterText = '※価格は税込価格となっております。';

        self.m_intPage = $select.val();
        if (self.m_intPage == 2)
        {
            self.m_cExpectedItem    = 12;
            self.m_iFirstItemNumber = 1000;
            self.m_strHeaderSubText = '本日のグラスワイン';
        }
        else if (self.m_intPage == 3)
        {
            self.m_cExpectedItem    = 12;
            self.m_iFirstItemNumber = 1012;
            self.m_strHeaderSubText = '今月のオススメボトル';
        }
        else if (self.m_intPage == 999)
        {
            // Only used by Anyway-Grapes.
            self.m_cExpectedItem      = 12;
            self.m_iFirstItemNumber   = 1;
            self.m_fRestaurantPrice = false;
            self.m_strHeaderSubText = '納品書（仮）';
            self.m_strFooterText    = '';
        }
        else if (self.m_intPage == 1000)
        {
            // Only used by Anyway-Grapes.
            self.m_cExpectedItem    = 12;
            self.m_iFirstItemNumber = 1;
            self.m_fRestaurantPrice = false;
            self.m_strHeaderSubText = '納品書（仮）';

            self.m_strFooterText   = '';
            self.m_fWholesalePrice = true;
            self.m_fAllowPrintForLess = true;
        }
        else if (self.m_intPage == 1001)
        {
            // Only used by Anyway-Grapes.
            self.m_cExpectedItem    = 12;
            self.m_iFirstItemNumber = 1;
            self.m_fRestaurantPrice = true;
            self.m_strHeaderText    = 'Wine List';
            self.m_strHeaderSubText = '納品書（仮）';

            self.m_strFooterText      = '';
            self.m_fWholesalePrice    = false;
            self.m_fAllowPrintForLess = true;
        }
        else if (self.m_intPage == 9999) // Only used by Himawari.
        {
            self.m_cExpectedItem    = 12;
            self.m_iFirstItemNumber = 1;
        }
        else
        {
            self.m_cExpectedItem    = 9;
            self.m_iFirstItemNumber = ((self.m_intPage - 9) * self.m_cExpectedItem) + 1;
            self.m_strHeaderSubText = '';
        }

        self.onRenderWineList();
    }
}

