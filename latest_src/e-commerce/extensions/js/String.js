//-------------------------------------------------------
// String.prototype.nl2br
//-------------------------------------------- YuMaeda --
if (!String.prototype.nl2br)
{
    String.prototype.nl2br = function()
    {
        return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
    };
}

//-------------------------------------------------------
// String.prototype.format
//-------------------------------------------- YuMaeda --
if (!String.prototype.format)
{
    String.prototype.format = function()
    {
        var args = arguments;

        return this.replace(/{(\d+)}/g, function(match, number)
        { 
            return ((typeof args[number] != 'undefined') ? args[number] : match);
        });
    };
}

