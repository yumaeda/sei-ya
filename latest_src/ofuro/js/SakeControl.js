//-------------------------------------------------------
//
// SakeControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --
class SakeControl extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_rgstrCategory =
        [
            '純米',
            '特別純米',
            '白麹仕込み純米',
            '純米酒仕込貴醸酒',
            '純米吟醸',
            '山廃純米',
            '純米大吟醸',
            '大吟醸',
            '山廃純米吟醸',
            '水もと純米',
            'きもと純米大吟醸',
            '特別本醸造',
            '本醸造',
            '吟醸'
        ];
    }

    _generateTable(rgobjSake)
    {
        var objSake = null,
            cSake   = rgobjSake.length,
            html    = '';

        if (cSake > 0)
        {
            var tableTag = new TableTag();
            tableTag.addClass('auto-horizontal-margin contents-width text-left');

            for (var i = 0; i < cSake; ++i)
            {
                objSake = rgobjSake[i];

                var nameRow  = new TableRow(),
                    nameCol  = new TableColumn(objSake.name),
                    priceCol = new TableColumn('{0} yen / {1} yen'.format(objSake.glass_price, objSake.tokkuri_price));

                nameRow.addClass('padding-right');
                nameCol.addAttr('colspan', '2');
                nameCol.addClass('text-medium');
                priceCol.addClass('text-right text-small eng-font');
                nameRow.addColumn(nameCol);
                nameRow.addColumn(priceCol);

                var jpnNameRow = new TableRow(),
                    jpnNameCol = new TableColumn(objSake.romaji_name + ' / ' + objSake.hiragana_name);

                jpnNameCol.addAttr('colspan', '3');
                jpnNameCol.addClass('text-x-small');
                jpnNameRow.addColumn(jpnNameCol);

                var strCategory = this.m_rgstrCategory[objSake.category - 1],
                    detailRow   = new TableRow(),
                    detailCol   = new TableColumn('{0} {1} {2} ({3})'.format(objSake.vintage, strCategory, objSake.bottling_method, objSake.ingredient)),
                    producerCol = new TableColumn(objSake.producer);

                detailRow.addClass('padding-bottom-medium-large');
                detailCol.addAttr('colspan', '2');
                detailCol.addClass('text-small');
                producerCol.addClass('text-right text-small');
                detailRow.addColumn(detailCol);
                detailRow.addColumn(producerCol);

                tableTag.body.addRow(nameRow);
                tableTag.body.addRow(jpnNameRow);
                tableTag.body.addRow(detailRow);
            }

            html = tableTag.toHtml();
        }

        return html;
    }

    renderChildren()
    {
        var self = this;

        $.ajax(
        { 
            url: '//sei-ya.jp/ofuro/get_items.php', 
            dataType: 'json', 
            data:
            {
                dbTable: 'ofuro_sakes',
                orderBy: 'sort_order'
            },

            success: function(rgobjSake)
            { 
                self.$m_parentContainer.html(self._generateTable(rgobjSake));
            },

            error: function() {}
        });
    }
}

