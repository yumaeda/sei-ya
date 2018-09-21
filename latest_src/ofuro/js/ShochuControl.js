//-------------------------------------------------------
//
// ShochuControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --
class ShochuControl extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_rgobjAwamori = [];
        this.m_rgobjKokuto  = [];
        this.m_rgobjKome    = [];
        this.m_rgobjMugi    = [];
        this.m_rgobjImo     = [];
        this.m_rgobjKuri    = [];
    }

    _generateTable(rgobjShochu, strTitle, strJpnTitle)
    {
        var objShochu = null,
            cShochu   = rgobjShochu.length,
            html      = '';

        if (cShochu > 0)
        {
            var tableTag = new TableTag(),
                titleRow = new TableRow(),
                lineRow  = new TableRow(),
                titleCol = new TableColumn('<span class="eng-font">{0}</span> / <span class="text-small">{1}</span>'.format(strTitle, strJpnTitle)),
                lineCol  = new TableColumn('<hr />'); 

            tableTag.addClass('auto-horizontal-margin width-semi-full margin-bottom-large text-left');

            titleCol.addAttr('colspan', '4');
            titleCol.addClass('text-left');
            lineCol.addAttr('colspan', '4');
            titleRow.addColumn(titleCol);
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);

            for (var i = 0; i < cShochu; ++i)
            {
                objShochu = rgobjShochu[i];

                var vintage    = (objShochu.vintage ? objShochu.vintage : 0),
                    priceText  = '{0} ml / {1} yen'.format(objShochu.volume, objShochu.price.format()),
                    nameRow    = new TableRow(),
                    jpnNameRow = new TableRow(),
                    nameCol    = new TableColumn(objShochu.name),
                    priceCol   = new TableColumn(priceText),
                    jpnNameCol = new TableColumn(objShochu.romaji_name + ' / ' + objShochu.hiragana_name);

                nameRow.addClass('padding-top-medium');
                nameCol.addAttr('colspan', '2');
                nameCol.addClass('text-medium');
                priceCol.addClass('text-right text-small eng-font');
                jpnNameCol.addAttr('colspan', '3');
                jpnNameCol.addClass('text-x-small');

                nameRow.addColumn(nameCol);
                nameRow.addColumn(priceCol);
                jpnNameRow.addColumn(jpnNameCol);

                tableTag.body.addRow(nameRow);
                tableTag.body.addRow(jpnNameRow);

                var ingredientText = objShochu.ingredient;
                if (vintage > 0)
                {
                    ingredientText = '{0}&nbsp;{1}'.format(vintage, ingredientText);
                }

                var detailRow     = new TableRow(),
                    ingredientCol = new TableColumn('[{0} / {1}%]'.format(ingredientText, objShochu.alcohol)),
                    producerCol   = new TableColumn(objShochu.producer);

                detailRow.addClass('padding-top-small');
                ingredientCol.addClass('text-small');
                producerCol.addAttr('colspan', '2');
                producerCol.addClass('text-right text-small');

                detailRow.addColumn(ingredientCol);
                detailRow.addColumn(producerCol);
                tableTag.body.addRow(detailRow);
            }

            html = tableTag.toHtml();
        }

        return html;
    }

    renderChildren()
    {
        this.m_rgobjAwamori.length = 0;
        this.m_rgobjKokuto.length  = 0;
        this.m_rgobjKome.length    = 0;
        this.m_rgobjMugi.length    = 0;
        this.m_rgobjImo.length     = 0;
        this.m_rgobjKuri.length    = 0;

        var self = this;

        $.ajax(
        { 
            url: '//sei-ya.jp/ofuro/get_items.php', 
            dataType: 'json', 
            data:
            {
                dbTable: 'ofuro_shochus',
                orderBy: 'sort_order'
            },

            success: function(rgobjShochu)
            {
                var cShochu = rgobjShochu.length;

                for (var i = 0; i < cShochu; ++i)
                {
                    switch (rgobjShochu[i].category)
                    {
                    case 1:
                        self.m_rgobjAwamori.push(rgobjShochu[i]);
                        break;
                    case 2:
                        self.m_rgobjKokuto.push(rgobjShochu[i]);
                        break;
                    case 3:
                        self.m_rgobjKome.push(rgobjShochu[i]);
                        break;
                    case 4:
                        self.m_rgobjMugi.push(rgobjShochu[i]);
                        break;
                    case 5:
                        self.m_rgobjImo.push(rgobjShochu[i]);
                        break;
                    case 6:
                        self.m_rgobjKuri.push(rgobjShochu[i]);
                        break;
                    default:
                        break;
                    }
                }

                var html =
                    self._generateTable(self.m_rgobjAwamori, 'Awamori', '泡盛') +
                    self._generateTable(self.m_rgobjKokuto, 'Kokutou-Jouchu', '黒糖焼酎') +
                    self._generateTable(self.m_rgobjKome, 'Kome-Jouchu', '米焼酎') +
                    self._generateTable(self.m_rgobjMugi, 'Mugi-Jouchu', '麦焼酎') +
                    self._generateTable(self.m_rgobjImo, 'Imo-Jouchu', '芋焼酎') +
                    self._generateTable(self.m_rgobjKuri, 'Kuri-Jouchu', '栗焼酎');

                self.$m_parentContainer.html(html);
            },

            error: function() {}
        });
    }
}

