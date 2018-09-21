//-------------------------------------------------------
//
// DrinkControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --
class DrinkControl extends HtmlControl
{
    constructor($parentContainer, strTableName)
    {
        super($parentContainer);

        this.m_strTableName   = strTableName;
        this.m_rgobjShochu    = [];
        this.m_rgobjSake      = [];
        this.m_rgobjLiquor    = [];
        this.m_rgobjCocktail  = [];
        this.m_rgobjSoftDrink = [];
        this.m_rgobjHerbTea   = [];
    }

    generateTable(rgobjDrink, strTitle, strJpnTitle)
    {
        var objDrink = null,
            cDrink   = rgobjDrink.length,
            html     = '',
            tableTag = new TableTag();

        if (cDrink > 0)
        {
            tableTag.addClass('auto-horizontal-margin width-semi-full margin-bottom-large text-left');
            var titleRow = new TableRow(),
                lineRow  = new TableRow(),
                titleCol = new TableColumn('<span class="eng-font">{0}</span> / <span class="text-small">{1}</span>'.format(strTitle, strJpnTitle)),
                lineCol  = new TableColumn('<hr />');

            titleCol.addClass('text-left');
            titleRow.addColumn(titleCol);
            lineCol.addAttr('colspan', '2');
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);

            var ofuroUtility = new OfuroUtility();

            for (var i = 0; i < cDrink; ++i)
            {
                objDrink = rgobjDrink[i];

                var fontStyle = 'jpn-font';
                if (objDrink.loc_name)
                {
                    fontStyle = 'eng-font';
                }

                if (objDrink.name)
                {
                    var nameRow  = new TableRow(),
                        nameCol  = new TableColumn(objDrink.name),
                        priceCol = new TableColumn(ofuroUtility.getPriceText2(objDrink, false));

                    nameRow.addClass('padding-top-small');
                    nameCol.addClass('text-small');
                    nameCol.addClass(fontStyle);
                    priceCol.addClass('text-right text-small eng-font');
                    nameRow.addColumn(nameCol);
                    nameRow.addColumn(priceCol);

                    tableTag.body.addRow(nameRow);
                }

                if (objDrink.loc_name)
                {
                    var jpnNameRow = new TableRow(),
                        jpnNameCol = new TableColumn(objDrink.loc_name);

                    jpnNameCol.addClass('text-x-small');
                    jpnNameRow.addColumn(jpnNameCol);
                    tableTag.body.addRow(jpnNameRow);

                    if (!objDrink.name)
                    {
                        tableTag.addCol(OfuroUtility.getPriceText(objDrink, false), null, [ 'text-right text-small eng-font' ]);
                    }
                }
            }

            html = tableTag.toHtml();
        }

        return html;
    }

    renderChildren()
    {
        this.m_rgobjShochu.length    = 0;
        this.m_rgobjSake.length      = 0;
        this.m_rgobjLiquor.length    = 0;
        this.m_rgobjCocktail.length  = 0;
        this.m_rgobjSoftDrink.length = 0;
        this.m_rgobjHerbTea.length   = 0;

        var self = this;

        $.ajax(
        { 
            url: './get_items.php', 
            dataType: 'json', 
            data:
            {
                dbTable: self.m_strTableName,
                orderBy: 'sort_order'
            },

            success: function(data)
            {
                var cData = data.length;

                for (var i = 0; i < cData; ++i)
                {
                    switch (data[i].category)
                    {
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

                var html =
                    self.generateTable(self.m_rgobjShochu, 'Shochu', '焼酎') +
                    self.generateTable(self.m_rgobjSake, 'Sake', '日本酒') +
                    self.generateTable(self.m_rgobjLiquor, 'Liquor', 'リキュール') +
                    self.generateTable(self.m_rgobjCocktail, 'Cocktail', 'カクテル') +
                    self.generateTable(self.m_rgobjSoftDrink, 'Soft Drink', '無酒') +
                    self.generateTable(self.m_rgobjHerbTea, 'Herb Tea', 'ハーブ・ティー');

                self.$m_parentContainer.html(html);
            },

            error: function() {}
        });
    }
}

