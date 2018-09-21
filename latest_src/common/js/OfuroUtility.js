//-------------------------------------------------------
//
// OfuroUtility
//
//-------------------------------------------- YuMaeda --
class OfuroUtility
{
    constructor()
    {
        this.m_strLang = UrlQuery.getValue('lang');
        if (!this.m_strLang)
        {
            this.m_strLang = 'ja';
        }

        this.m_objResourceString =
        {
            'OPEN_BRACE':
            {
                'ja': '（',
                'en': '(',
                'fr': '('
            },

            'CLOSE_BRACE':
            {
                'ja': '）',
                'en': ')',
                'fr': ')'
            },

            'TAX_INCLUDED_STR':
            {
                'ja': '税込',
                'en': 'tax included',
                'fr': 'TTC'
            },

            'MARKET_VALUE_STR':
            {
                'ja': '時価',
                'en': 'market value',
                'fr': 'la valeur de marché'
            }
        }
    }

    get tax() { return 0.8; }
    getString(strId) { return this.m_objResourceString[strId][this.m_strLang]; }

    _convertToPriceText(intPrice)
    {
        return '{0} yen'.format(intPrice.format());
    }

    _getPriceWithTax(objWine)
    {
        return Math.floor(objWine.price * (1 + this.tax));
    }

    getPriceText2(objWine, fAppendActualPrice)
    {
        var strPrice = '';

        if (objWine)
        {
            if (objWine.price > 0)
            {
                strPrice += this._convertToPriceText(objWine.price);
                if (fAppendActualPrice)
                {
                    strPrice +=
                        ' ' + this.getString('OPEN_BRACE') +
                        this.getString('TAX_INCLUDED_STR') + ' ' +
                        this._convertToPriceText(this._getPriceWithTax(objWine)) +
                        this.getString('CLOSE_BRACE');
                }

                if (objWine.market_price)
                {
                    strPrice += '～';
                }
            }
            else if (objWine.market_price)
            {
                strPrice = this.getString('MARKET_VALUE_STR');
            }
        }

        return strPrice;
    }
}

