//-------------------------------------------------------
// Required:
//     seiya.htmltag-0.1.js
//-------------------------------------------------------

function generateYearSelectHtml(strLabel, intStartYear)
{
    var intCurYear = (new Date()).getFullYear(),
        selectTag  = new SelectTag();

    selectTag.addAttr('id', 'eventCategorySelect');
    selectTag.addAttr('name', 'year');
    selectTag.addLabel(strLabel);
    selectTag.setSelectedIndex(0);

    for (var i = intStartYear; i <= (intCurYear + 1); ++i)
    {
        var strText = 'Year {0}'.format(i);
        selectTag.addOption(strText, i);
    } 

    return selectTag.toHtml();
}

function generateCountrySelectHtml(strId, strName, fAllowNoSelection, iSelected)
{
    var selectTag = new SelectTag();

    if (strId)
    {
        selectTag.addAttr('id', strId);
    }

    if (strName)
    {
        selectTag.addAttr('name', strName);
    }

    if (fAllowNoSelection)
    {
        selectTag.addLabel(Strings.getString('NOT_SPECIFY_STR'));
    }

    for (var key in countryHash)
    {
        selectTag.addOption(countryHash[key], key);
    }
    selectTag.setSelectedIndex(iSelected);

    return selectTag.toHtml();
}

