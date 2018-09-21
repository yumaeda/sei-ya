//-------------------------------------------------------
//
// PhotoControl
//
// [Dependencies]
//     HtmlControl.cs
//
//-------------------------------------------- YuMaeda --
class PhotoControl extends HtmlControl 
{
    constructor(intCategory, $parentContainer)
    {
        super($parentContainer);

        this.m_intCategory = intCategory;
    }

    _getHeaderText()
    {
        var strHeader = '';

        if ((this.m_intCategory % 5) == 2)
        {
            strHeader = 'Store Interior';
        }
        else if ((this.m_intCategory % 5) == 3)
        {
            strHeader = 'Dish';
        }
        else if ((this.m_intCategory % 5) == 4)
        {
            strHeader = 'Magazine';
        }

        return strHeader;
    }

    _generateThumbnailsHtml(rgobjPhoto)
    {
        var iCol       = 0,
            cPhoto     = rgobjPhoto.length,
            objPhoto   = null,
            headerText = this._getHeaderText(),
            tableTag   = new TableTag();

        tableTag.addClass('auto-horizontal-margin contents-width text-left');

        if (headerText)
        {
            var titleRow = new TableRow(),
                lineRow  = new TableRow(),
                titleCol = new TableColumn(headerText),
                lineCol  = new TableColumn('<hr /><br />');

            titleCol.addAttr('colspan', '8');
            titleCol.addClass('eng-font');
            lineCol.addAttr('colspan', '8');
            titleRow.addColumn(titleCol);
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(titleRow);
            tableTag.head.addRow(lineRow);
        }

        var tableWidth = (this.$m_parentContainer.outerWidth(true) * 0.8),
            imgWidth   = 135,
            imgPadding = (tableWidth - imgWidth * 4) / 3,
            imgHtml    = '';

        var iPhoto = 0;
        while ((iPhoto < 4) || (iPhoto < cPhoto))
        {
            if (iCol === 0)
            {
                var newRow = new TableRow();
                if (cPhoto > (iCol + 4))
                {
                    newRow.addClass('padding-bottom-x-large');
                }

                tableTag.body.addRow(newRow);
            }
            ++iCol;

            if (iPhoto < cPhoto)
            {
                objPhoto = rgobjPhoto[iPhoto];
                imgHtml =
                    '<a href="#" class="thumbnail-img" img="http://sei-ya.jp/' + objPhoto.dir + objPhoto.filename + '" rel="' + objPhoto.comment + '">' +
                        '<img src="//sei-ya.jp/' + objPhoto.dir + 'thumb_' + objPhoto.filename + '" />' +
                    '</a>';
            }
            else
            {
                imgHtml = '';
            }

            var imgCol = new TableColumn(imgHtml);
            imgCol.addAttr('style', 'width:{0}px;'.format(imgWidth));

            tableTag.body.lastRow.addColumn(imgCol);
            if (iCol <= 3)
            {
                var imgPaddingCol = new TableColumn('&nbsp;');
                imgPaddingCol.addAttr('style', 'width:{0}px;'.format(imgPadding));
                tableTag.body.lastRow.addColumn(imgPaddingCol);
            }
            else
            {
                iCol = 0;
            }

            ++iPhoto;
        }

        return tableTag.toHtml();
    }

    renderChildren()
    {
        var strTableName = ((this.m_intCategory <= 5) ? 'mitsugetsu_photos' : 'ofuro_photos'),
            self         = this;

        $.ajax(
        { 
            url: './get_items.php', 
            data:
            {
                dbTable: strTableName,
                condition: 'category={0}'.format(this.m_intCategory),
                orderBy: 'sort_order'
            },
            dataType: 'json', 
            success: function(rgobjPhoto)
            {
                self.$m_parentContainer.html(self._generateThumbnailsHtml(rgobjPhoto));
            },

            error: function() {}
        });
    }

    postRender()
    {
        this.$m_parentContainer.on('click', '.thumbnail-img', function()
        {
            ModalWindow.show('<img src="' + $(this).attr('img') + '" />',
                $(this).attr('rel'));

            return false;
        });
    }
}

