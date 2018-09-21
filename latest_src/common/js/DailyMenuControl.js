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
class DailyMenuControl extends HtmlControl
{
    constructor(strTableName, $parentContainer)
    {
        super($parentContainer);

        this.m_strTableName = strTableName;
        if (strTableName === 'mitsugetsu_dishes')
        {
            this.m_rgobjTitle   =
            [
                { 'en': 'Cold Hors d\'Oeuvres', 'ja': '冷たい前菜'     },
                { 'en': 'Hot Hors d\'Oeuvres',  'ja': '温かい前菜'     },
                { 'en': 'Pasta',                'ja': 'パスタ'         },
                { 'en': 'Fish Dishes',          'ja': '魚料理'         },
                { 'en': 'Meat Dishes',          'ja': '肉料理'         },
                { 'en': 'Gibier',               'ja': 'ジビエ'         },
                { 'en': 'Gohan',                'ja': 'ごはん物'       },
                { 'en': 'Cheese',               'ja': 'チーズ'         },
                { 'en': 'Dessert',              'ja': 'デザート'       },
                { 'en': 'Mitsu Course',         'ja': '蜜コース'       },
                { 'en': 'Getsu Course',         'ja': '月コース'       },
                { 'en': 'Dry Fruit',            'ja': 'ドライフルーツ' }
            ];
        }
        else
        {
            this.m_rgobjTitle   =
            [
                { 'en': 'Cold Hors d\'Oeuvres', 'ja': '冷たい前菜'     },
                { 'en': 'Hot Hors d\'Oeuvres',  'ja': '温かい前菜'     },
                { 'en': 'Fish Dishes',          'ja': '魚料理'         },
                { 'en': 'Meat Dishes',          'ja': '肉料理'         },
                { 'en': 'Small Dish',           'ja': '小皿'           },
                { 'en': 'Gohan',                'ja': 'ごはん物'       },
                { 'en': 'Pasta',                'ja': 'パスタ'         },
                { 'en': 'Cheese',               'ja': 'チーズ'         },
                { 'en': 'Dessert',              'ja': 'デザート'       }
            ];
        }
    }

    _generateDishTableHtml(rgobjDish, strHeadTitle)
    {
        var cDish   = rgobjDish.length,
            objDish = null;

        if (cDish <= 0)
        {
            return '';
        }

        if (!strHeadTitle)
        {
            var objTitle = this.m_rgobjTitle[rgobjDish[0].category - 1];

            strHeadTitle = '<span class="eng-font">{0}</span> / <span class="text-small jpn-font">{1}</span>'.format(
                objTitle['en'],
                objTitle['ja']);
        }
        else
        {
            strHeadTitle = '<span class="eng-font">{0}</span>'.format(strHeadTitle);
        }

        var tableTag = new TableTag(),
            titleRow = new TableRow(),
            lineRow  = new TableRow(),
            titleCol = new TableColumn(strHeadTitle),
            lineCol  = new TableColumn('<hr />');
        
        tableTag.addClass('auto-horizontal-margin contents-width margin-bottom-large text-left');
        titleCol.addClass('text-left');
        titleRow.addColumn(titleCol);
        lineCol.addAttr('colspan', '2');
        lineRow.addColumn(lineCol);

        tableTag.head.addRow(titleRow);
        tableTag.head.addRow(lineRow);

        for (var i = 0; i < cDish; ++i)
        {
            var dishNameHtml = '';

            objDish = rgobjDish[i];
            if (objDish.name)
            {
                dishNameHtml =
                    '<span class="text-small">{0}</span>'.format(objDish.name);
            }
            else
            {
                dishNameHtml = '<span class="text-small" title="{0}">{1}</span>'.format(
                    objDish.comment,
                    objDish.loc_name);
            }

            var ofuroUtility = new OfuroUtility(),
                dishNameRow  = new TableRow(),
                dishNameCol  = new TableColumn(dishNameHtml),
                priceCol     = new TableColumn(ofuroUtility.getPriceText2(objDish, false));
            
            dishNameRow.addClass('padding-top-medium');
            dishNameCol.addClass('padding-top-medium dish-name-col');
            priceCol.addClass('text-right text-small eng-font');

            dishNameRow.addColumn(dishNameCol);
            dishNameRow.addColumn(priceCol);

            tableTag.body.addRow(dishNameRow);
        }

        return tableTag.toHtml();
    }

    renderChildren()
    {
        var self = this;

        $.ajax(
        { 
            url: './get_items.php',
            cache: false,
            dataType: 'json', 
            data:
            {
                dbTable: self.m_strTableName,
                condition: 'daily=1',
                orderBy: 'sort_order'
            },

            success: function(rgobjMenu)
            {
                var today = new Today(),
                    html  = self._generateDishTableHtml(rgobjMenu, today.toString());

                self.$m_parentContainer.html(html);
            },

            error: function() {}
        });
    }
}

