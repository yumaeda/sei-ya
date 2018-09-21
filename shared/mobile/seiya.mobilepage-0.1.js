//-------------------------------------------------------
// MobilePage
//-------------------------------------------- YuMaeda --
var MobilePage = (function()
{
    // Private members

    var m_id = '',
        m_hasBackBtn = false,
        m_headerHtml = '',
        m_contentHtml = '',
        m_footerHtml = '',

        _init = function(strId, fBackBtn)
        {
            m_id = strId;
            m_hasBackBtn = fBackBtn;
        },

        _setHeaderHtml = function(innerHtml)
        {
            m_headerHtml = innerHtml;
        },

        _setContentHtml = function(innerHtml)
        {
            m_contentHtml = innerHtml;
        },

        _setFooterHtml = function(innerHtml)
        {
            m_footerHtml = innerHtml;
        },

        _toHtml = function()
        {
            var pageDiv, headerDiv, contentDiv, footerDiv;

            headerDiv = new DivTag(m_headerHtml);
            headerDiv.addAttr('data-role', 'header');
            headerDiv.addAttr('data-position', 'fixed');

            contentDiv = new DivTag(m_contentHtml);
            contentDiv.addAttr('data-role', 'content');

            footerDiv = new DivTag(m_footerHtml);
            footerDiv.addAttr('data-role', 'footer');
            footerDiv.addAttr('data-id', 'footer');
            footerDiv.addAttr('data-position', 'fixed');

            pageDiv = new DivTag(headerDiv.toHtml() + contentDiv.toHtml() + footerDiv.toHtml());
            pageDiv.addAttr('id', m_id);
            pageDiv.addAttr('data-role', 'page');
            pageDiv.addAttr('data-theme', 'z');

            if (m_hasBackBtn)
            {
                pageDiv.addAttr('data-add-back-btn', 'true');
            }

            return(pageDiv.toHtml());
        };

    // Public members
    
    return(
    {
        init:           _init,
        setHeaderHtml:  _setHeaderHtml,
        setContentHtml: _setContentHtml,
        setFooterHtml:  _setFooterHtml,
        toHtml:         _toHtml
    });
})();

