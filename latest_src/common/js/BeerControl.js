//-------------------------------------------------------
//
// BeerControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --
class BeerControl extends HtmlControl
{
    constructor($parentContainer, strTableName)
    {
        super($parentContainer, strTableName);

        this.m_strTableName = strTableName;
        this.m_rgobjBeer    = [];
    }

    _generateLogoHtml()
    {
        var logoHtml  = (new ImageTag('./images/gargery.gif')).toHtml(),
            anchorTag = new AnchorTag('http://www.gargery.com', logoHtml);

        anchorTag.addAttr('rel', 'nofollow');
        anchorTag.addClass('gargery-link');

        return anchorTag.toHtml();
    }

    _generateTable(rgobjBeer, fDraft)
    {
        var objBeer,
            cBeer = rgobjBeer.length,
            html  = '';

        if (cBeer > 0)
        {
            var imgTag, anchorTag,
                engNameHtml = '<span class="eng-font">Beer</span>',
                jpnNameHtml = '<span class="text-small">麦酒</span>',
                tableTag    = new TableTag(),
                titleRow    = new TableRow(),
                lineRow     = new TableRow(),
                logoRow     = new TableRow(),

                titleCol    = new TableColumn('{0} / {1}'.format(engNameHtml, jpnNameHtml)),
                lineCol     = new TableColumn('<hr />'),
                logoCol     = new TableColumn(this._generateLogoHtml());

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
            for (var i = 0; i < cBeer; ++i)
            {
                objBeer = rgobjBeer[i];

                var tableRow = new TableRow(),
                    nameCol  = new TableColumn(objBeer.loc_name),
                    priceCol = new TableColumn(ofuroUtility.getPriceText2(objBeer, false));

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

    renderChildren()
    {
        this.m_rgobjBeer.length = 0;

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

            error: function() {}
        });
    }
}

