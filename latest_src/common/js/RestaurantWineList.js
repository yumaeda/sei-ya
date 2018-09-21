//-------------------------------------------------------
//
// RestaurantWineList
//
// [Dependencies]
//     HtmlControl.js
//
//-------------------------------------------- YuMaeda --
class RestaurantWineList extends HtmlControl
{
    constructor($parentContainer, strNotice)
    {
        super($parentContainer);

        this.m_strNotice = strNotice;
    }

    _generatePdfViewerHtml(filePath, altText)
    {
        var html = 
            '<div class="auto-horizontal-margin contents-width">' +
                '<object data="{0}" type="application/pdf" class="pdf-container">'.format(filePath) +
                    '<a href="{0}" class="jpn-font text-x-small">{1}</a>'.format(filePath, altText) +
                '</object>' +
            '</div>';

        return html;
    }

    renderChildren()
    {
        var frenchMenuUrl    = '../winelist.pdf',
            nonFrenchMenuUrl = '../winelist_nf.pdf';

        this.$m_parentContainer.html(this._generatePdfViewerHtml(frenchMenuUrl, 'ワインリスト（フランス）'));
        this.$m_parentContainer.append('<br /><br />' + this._generatePdfViewerHtml(nonFrenchMenuUrl, 'ワインリスト（フランス以外）'));

        var tableTag  = new TableTag(),
            titleRow  = new TableRow(),
            lineRow   = new TableRow(),
            noticeRow = new TableRow(),
            lineCol   = new TableColumn('<hr />'),
            noticeCol = new TableColumn(this.m_strNotice);

        // Add a header w/ notification.
        tableTag.addClass('auto-horizontal-margin width-semi-full text-left');

        lineCol.addAttr('colspan', '2');
        noticeCol.addClass('text-x-small');

        titleRow.addColumn(new TableColumn('<span class="eng-font">Wine List</span>'));
        lineRow.addColumn(lineCol);
        noticeRow.addClass('padding-top-small padding-bottom-x-large');
        noticeRow.addColumn(noticeCol);

        tableTag.head.addRow(titleRow);
        tableTag.head.addRow(lineRow);
        tableTag.body.addRow(noticeRow);

        this.$m_parentContainer.prepend(tableTag.toHtml());
    }
}

