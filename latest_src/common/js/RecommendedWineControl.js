//-------------------------------------------------------
//
// RecommendedWineControl
//
// [Dependencies]
//     HtmlControl.js
//
//-------------------------------------------- YuMaeda --
class RecommendedWineControl extends IntlHtmlControl
{
    constructor(strTableName, intType, $parentContainer)
    {
        super($parentContainer);

        this.m_rgobjTitle =
        [
            { 'ja': 'スパークリング・ワイン', 'en': 'Sparkling Wine' },
            { 'ja': 'シャンパーニュ',         'en': 'Champagne'      },
            { 'ja': '白ワイン',               'en': 'White Wine'     },
            { 'ja': 'ロゼワイン',             'en': 'Rosé Wine'      },
            { 'ja': '赤ワイン',               'en': 'Red Wine'       },
            { 'ja': '甘口ワイン',             'en': 'Dessert Wine'   }
        ];

        this.m_strTableName = strTableName;
        this.m_intType      = intType;
    }

    _getWineVintageText(vintage)
    {
        var strVintage = 'S.A.',
            intVintage = parseInt(vintage, 10);

        if ((intVintage !== 'NaN') && (intVintage > 1000))
        {
            strVintage = intVintage;
            if (this.m_strLang == 'ja')
            {
                strVintage += '年';
            }
        }
        
        return strVintage;
    }

    _getWineTitleHtml(objWine)
    {
        var strTitle = '<span class="text-small-medium eng-font">{0} {1} ({2})</span>'.format(
            this._getWineVintageText(objWine.vintage),
            objWine.name,
            objWine.producer);

        return strTitle;
    }

    _generateWineListHtml(rgobjWine, intType)
    {
        var cWine      = rgobjWine.length,
            objWine    = null,
            strFlagImg = '',
            strVintage = '',
            tableTag   = new TableTag();

        tableTag.addClass('auto-horizontal-margin contents-width text-left');

        if (cWine > 0)
        {
            // Add header.
            var lineRow    = new TableRow(),
                titleRow   = new TableRow(),
                lineCol    = new TableColumn('<hr /><br />'),
                titleCol   = new TableColumn('<span class="eng-font">{0}</span> / <span class="text-small">{1}</span>'.format(
                    this.m_rgobjTitle[intType - 1]['en'],
                    this.m_rgobjTitle[intType - 1]['ja']));
            
            titleCol.addAttr('colspan', '3');
            titleCol.addClass('text-left');
            titleRow.addColumn(titleCol);
            lineCol.addAttr('colspan', '3');
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);

            for (var i = 0; i < cWine; ++i)
            {
                objWine = rgobjWine[i];

                strFlagImg = CountryInfo.getImgFileName(objWine.country);
                strVintage = this._getWineVintageText(objWine.vintage);

                var wineDetailHtml = this._getWineTitleHtml(objWine) + '<br />' +
                    '<span class="text-x-small">{0} {1}&nbsp;&nbsp;({2})</span><br />'.format(strVintage, objWine.name_jpn, objWine.producer_jpn) +
                    '<span class="text-small">{0}<br /></span>'.format(objWine.region_jpn);

                if (objWine.cepage)
                {
                    wineDetailHtml += '<span class="text-x-small">[ {0} ]</span>'.format(objWine.cepage);
                }

                objWine['price'] = objWine.store_price;

                var ofuroUtility = new OfuroUtility(),
                    tableRow     = new TableRow(),
                    imgCol       = new TableColumn('<img src="images/' + strFlagImg + '" />'),
                    detailCol    = new TableColumn(wineDetailHtml),
                    priceCol     = new TableColumn(ofuroUtility.getPriceText2(objWine, false));

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

    renderChildren()
    {
        var strCondition = '';
        switch(this.m_intType)
        {
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

        $.ajax(
        { 
            url: './get_items.php', 
            dataType: 'json', 
            data:
            {
                dbTable: self.m_strTableName,
                condition: strCondition,
                orderBy: 'item_number'
            },

            success: function(rgobjWine)
            { 
                self.$m_parentContainer.html(self._generateWineListHtml(rgobjWine, self.m_intType));
            },

            error: function() {}
        });
    }
}

