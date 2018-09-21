// Override DBManagerPage.strSite.
DBManagerPage.strSite = 'honeymoon';

// Override DBManagerPage.fnAddMenus().
DBManagerPage.fnAddMenus = function(menuList)
{
    DBManagerPage._addMenu(menuList, { id: 'tastingInfoLnk', href: '#', resId: 'TASTING_INFO_STR' });
};

DBManagerPage.fnSetDatabase['tastingInfoLnk'] = function()
{
    DBManagerPage.dbTable         = 'honeymoon_tasting_info';
    DBManagerPage.strSearchKey    = 'year';
    DBManagerPage.$categorySelect = $(generateYearSelectHtml(Strings.getString('EVENT_YEAR_STR'), 2014));
};

// Override DBManagerPage.fnGenerateTableRowHtml.
DBManagerPage.fnGenerateTableRowHtml['eventCategorySelect'] = function(objEvent)
{
    var html =
        '<tr class="dbmgrRow">' +
            '<td class="checkBoxCol">' +
                DBManagerPage._generateCheckBoxHtml(objEvent) +
            '</td>' +
            '<td class="mediumText">' +
                '{0}/{1}'.format(objEvent.month, objEvent.date) +
            '</td>' +
            '<td class="smallText">' +
                objEvent.description +
            '</td>' +
        '</tr>';

    return html;
};

