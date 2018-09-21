//-------------------------------------------------------
//
// IntlHtmlControl
//
// [Dependencies]
//     HtmlControl.cs
//     UrlQuery.cs
//
//-------------------------------------------- YuMaeda --
class IntlHtmlControl extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_strLang = UrlQuery.getValue('lang');
        if (!this.m_strLang)
        {
            this.m_strLang = 'ja';
        }

        this.m_objResourceString = {};
    }

    addString(strKey, strJpn, strEng)
    {
        this.m_objResourceString[strKey] = { 'ja': strJpn, 'en': strEng };
    }

    getString(strId)
    {
        var str = '';

        if (strId in this.m_objResourceString)
        {
            str = this.m_objResourceString[strId][this.m_strLang];
        }

        return str;
    }
}

