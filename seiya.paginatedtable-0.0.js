//-------------------------------------------------------
// PaginatedTable
//
// Required:
//     seiya.htmltag-0.1.js
//-------------------------------------------- YuMaeda --
var PaginatedTable = (function()
{
    // Private members

    var $m_parentContainer = null,
        $m_startItemNumber = null,
        $m_endItemNumber = null,
        $m_previousLink = null,
        $m_nextLink = null,
        m_rgobjItem = null,
        m_iStartItem = 0,
        m_cDisplayItem = 12,
        m_cColumn = 3,
        m_fnRenderColumn = null,
        m_fnRenderColumnDetail = null,

        _init = function($parentContainer, rgobjItem, fnRenderColumn, fnRenderColumDetail)
        {
            m_iStartItem = 0;

            if (!rgobjItem)
            {
                console.error('ArgumentNullException: rgobjItem');
            }

            $m_parentContainer = $parentContainer;
            m_rgobjItem = rgobjItem;
            m_fnRenderColumn = fnRenderColumn;
            m_fnRenderColumnDetail = fnRenderColumDetail;

            _createPaginationControl();
            _createTable();

            $m_startItemNumber = $m_parentContainer.find('span#startNumber');
            $m_endItemNumber = $m_parentContainer.find('span#endNumber');

            $m_previousLink.click(_previousLinkClick);
            $m_nextLink.click(_nextLinkClick);

            _updatePaginationLinks();
        },

        _createPaginationControl = function()
        {
            var paragraphTag, previousLink, nextLink,
                previousLinkText = '&lt; ' + Strings.getString('PREVIOUS_STR'),
                nextLinkText = Strings.getString('NEXT_STR') + ' &gt;',
                innerHtml = '';

            previousLink = new AnchorTag('#', previousLinkText);
            previousLink.addAttr('id', 'previousLink');
            previousLink.addClass('paginationLink');
            $m_previousLink = $(previousLink.toHtml());

            nextLink = new AnchorTag('#', nextLinkText);
            nextLink.addAttr('id', 'nextLink');
            nextLink.addClass('paginationLink');
            $m_nextLink = $(nextLink.toHtml());

            innerHtml =
                '<p class="textCenter">' +
                    '<span id="startNumber">0</span>' +
                    '&nbsp;&nbsp;-&nbsp;&nbsp;' +
                    '<span id="endNumber">0</span>' +
                '</p>';

            $p = $(innerHtml);
            $m_previousLink.prependTo($p);
            $m_nextLink.appendTo($p);
            $p.appendTo($m_parentContainer);
        },

        _createTable = function()
        {
            var iColumn  = 0,
                cItem    = m_rgobjItem.length,
                iEndItem = m_iStartItem + m_cDisplayItem,
                objItem  = null,
                tableTag = new TableTag();

            tableTag.addClass('hMarginAuto');

            for (var i = m_iStartItem; (i < cItem) && (i < iEndItem); ++i)
            {
                objItem = m_rgobjItem[i];

                if (iColumn === (m_cColumn - 1))
                {
                    iColumn = 0;
                }
                else if (iColumn++ === 0)
                {
                    tableTag.body.addRow(new TableRow());
                }

                var tableCol = new TableColumn(m_fnRenderColumn(objItem));
                tableCol.addAttr('id', objItem.id);
                tableCol.addClass('paginatedTableCell');

                tableTag.body.lastRow.addColumn(tableCol);
            }

            $m_parentContainer.find('table').remove();
            $m_parentContainer.append(tableTag.toHtml());
            $m_parentContainer.find('td.paginatedTableCell').click(_onTableCellClick);
        },

        _onTableCellClick = function()
        {
            m_fnRenderColumnDetail(this.id);
            return(false);
        },

        _previousLinkClick = function()
        {
            if (m_iStartItem >= m_cDisplayItem)
            {
                m_iStartItem -= m_cDisplayItem;
            }

            _updatePaginationLinks();
            _createTable();
        },

        _nextLinkClick = function()
        {
            if (m_iStartItem + m_cDisplayItem < m_rgobjItem.length)
            {
                m_iStartItem += m_cDisplayItem;
            }

            _updatePaginationLinks();
            _createTable();
        },

        _updatePaginationLinks = function()
        {
            $m_startItemNumber.html(m_iStartItem);

            if (m_iStartItem <= 0)
            {
                $m_previousLink.hide();
            }
            else
            {
                $m_previousLink.show();
            }
            
            if (m_iStartItem + m_cDisplayItem >= m_rgobjItem.length)
            {
                $m_nextLink.hide();
                $m_endItemNumber.html(m_rgobjItem.length);
            }
            else
            {
                $m_nextLink.show();
                $m_endItemNumber.html(m_iStartItem + m_cDisplayItem);
            }
        };
        
    // Public members

    return(
    {
        init: _init
    });
})();

