//-------------------------------------------------------
// Number.prototype.format
//-------------------------------------------- YuMaeda --
if (!Number.prototype.format)
{
    Number.prototype.format = function()
    {
        // convert int to string.
        var strNumber = this + '';

        var rgstrToken   = strNumber.split('.'),
            intToken     = rgstrToken[0],
            decimalToken = ((rgstrToken.length > 1) ? '.' + rgstrToken[1] : '');

        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(intToken))
        {
            intToken = intToken.replace(rgx, '$1' + ',' + '$2');
        }

        return (intToken + decimalToken);
    };
}

