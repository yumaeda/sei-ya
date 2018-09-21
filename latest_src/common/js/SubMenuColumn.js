//-------------------------------------------------------
//
// SubMenuColumn
//
//-------------------------------------------- YuMaeda --
class SubMenuColumn
{
    constructor(strJpnText, strEngText, strCss)
    {
        this.m_strJpnText = strJpnText;
        this.m_strEngText = strEngText;
        this.m_strCss     = strCss;
    }

    toHtml()
    {
        var divTag = null;

        if (this.m_strCss)
        {
            var spanTag = new SpanTag(this.m_strJpnText);
            spanTag.addClass('text-x-small jpn-font');

            divTag = new DivTag(this.m_strEngText + '<br />' + spanTag.toHtml());
            divTag.addClass('submenu-column ' + this.m_strCss);
        }
        else
        {
            divTag = new DivTag('');
            divTag.addClass('empty-submenu-column');
        }

        return divTag.toHtml();
    }
}

