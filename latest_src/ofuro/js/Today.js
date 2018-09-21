//-------------------------------------------------------
//
// Today
//
// [Dependencies]
//     UrlQuery.cs
//
//-------------------------------------------- YuMaeda --
class Today
{
    constructor()
    {
        this.m_strLang        = UrlQuery.getValue('lang');
        this.m_objDate        = new Date();
        this.m_rgstrShortWeek = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
        this.m_objYearSymbol  = { 'en': '', 'fr': '', 'ja': '年' };
        this.m_objMonthSymbol = { 'en': '', 'fr': '', 'ja': '月' };
        this.m_objDateSymbol  = { 'en': '', 'fr': '', 'ja': '日' };
    }
        
    _toStrDay(intDay)
    {
        return this.m_rgstrShortWeek[intDay];
    }

    _toStrYear(intYear)
    {
        return '{0}{1}'.format(intYear, this.m_objYearSymbol[this.m_strLang]);
    }

    _toStrMonth(intMonth)
    {
        return '{0}{1}'.format(intMonth, this.m_objMonthSymbol[this.m_strLang]);
    }

    _toStrDate(intDate)
    {
        return '{0}{1}'.format(intDate, this.m_objDateSymbol[this.m_strLang]);
    }

    addDates(cDate)
    {
        this.m_objDate.setDate(this.m_objDate.getDate() + cDate);
    }

    toString()
    {
        var strDay      = this._toStrDay(this.m_objDate.getDay()),
            strYear     = this._toStrYear(this.m_objDate.getFullYear()),
            strMonth    = this._toStrMonth(this.m_objDate.getMonth() + 1),
            strDate     = this._toStrDate(this.m_objDate.getDate()),
            strFullDate = '';

        switch (this.m_strLang)
        {
        case 'en':
            strFullDate = '{0}/{1}/{2} ({3})'.format(strMonth, strDate, strYear, strDay);
            break;
        case 'ja':
            strFullDate = '{0}/{1}/{2} ({3})'.format(strYear, strMonth, strDate, strDay);
            break;
        case 'fr':
            strFullDate = '{0}/{1}/{2} ({3})'.format(strDate, strMonth, strYear, strDay);
            break;
        default:
            strFullDate = '{0}.{1}.{2} {3}'.format(
                this.m_objDate.getFullYear(),
                (this.m_objDate.getMonth() + 1),
                this.m_objDate.getDate(),
                this.m_rgstrShortWeek[this.m_objDate.getDay()]);
            break;
        }

        return strFullDate;
    }
}

