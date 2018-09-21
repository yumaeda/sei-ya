//-------------------------------------------------------
//
// MapControl
//
// [Dependencies]
//     UrlQuery.cs
//     TableTag.cs
//     TableRow.cs
//     TableColumn.cs
//
//-------------------------------------------- YuMaeda --
class MapControl
{
    constructor()
    {
        this.m_intWidth              = 300;
        this.m_intHeight             = 200;
        this.m_strMarker             = '';
        this.m_strCoordinate         = '';
        this.m_strSubCoordinate      = '';
        this.m_intCoordinateId       = '';
        this.m_strInfoWindowLocation = 'near';
        this.m_strScreenSpan         = '';
    }

    _generateSrc()
    {
        var html =
            'https://maps.google.co.jp/maps?f=q' +
            '&amp;hl='        + UrlQuery.getValue('lang') +
            '&amp;q='         + this.m_strMarker +
            '&amp;sspn='      + this.m_strScreenSpan +
            '&amp;sll='       + this.m_strSubCoordinate +
            '&amp;ll='        + this.m_strCoordinate +
            '&amp;cid='       + this.m_intCoordinateId +
            '&amp;iwloc='     + this.m_strInfoWindowLocation +
            '&amp;num=10'     +
            '&amp;source=s_q' +
            '&amp;t=m'        +
            '&amp;z=17'       +
            '&amp;output=embed';

        return html;
    }

    set width(value)              { this.m_intWidth = value; }
    set height(value)             { this.m_intHeight = value; }
    set infoWindowLocation(value) { this.m_strInfoWindowLocation = value; }
    set coordinate(value)         { this.m_strCoordinate = value; }
    set subCoordinate(value)      { this.m_strSubCoordinate = value; }
    set marker(value)             { this.m_strMarker = value; }
    set coordinateId(value)       { this.m_intCoordinateId = value; }
    set screenSpan(value)         { this.m_strScreenSpan = value; }

    toHtml()
    {
        var tableTag = new TableTag(),
            titleRow = new TableRow(),
            lineRow  = new TableRow(),
            titleCol = new TableColumn('Map'),
            lineCol  = new TableColumn('<hr /><br />');

        tableTag.addClass('body__map__container');
        titleCol.addAttr('colspan', '4');
        titleCol.addClass('body__label');
        lineCol.addAttr('colspan', '4');

        titleRow.addColumn(titleCol);
        lineRow.addColumn(lineCol);

        tableTag.head.addRow(titleRow);
        tableTag.head.addRow(lineRow);

        var iframeHtml =
            '<iframe ' +
                'class="body__map__contents" ' + 
                'width="' + this.m_intWidth + '" ' +
                'height="' + this.m_intHeight + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ' +
                'src="' + this._generateSrc() + '">' +
            '</iframe>';

        var bodyRow = new TableRow(),
            bodyCol = new TableColumn(iframeHtml);

        bodyCol.addAttr('colspan', '4');
        bodyRow.addColumn(bodyCol);
        tableTag.body.addRow(bodyRow);

        return tableTag.toHtml();
    }
}

