// Override DBManagerPage.strSite.
DBManagerPage.strSite = 'ofuro';


// Override DBManagerPage.fnAddMenus().
DBManagerPage.fnAddMenus = function(menuList)
{
    DBManagerPage._addMenu(menuList, { id: 'dishLnk',   href: '#', resId: 'DISH_STR' });
    DBManagerPage._addMenu(menuList, { id: 'drinkLnk',  href: '#', resId: 'OTHER_DRINKS_STR' });
    DBManagerPage._addMenu(menuList, { id: 'eventLnk',  href: '#', resId: 'EVENT_STR' });
    DBManagerPage._addMenu(menuList, { id: 'sakeLnk',   href: '#', resId: 'SAKE_STR' });
    DBManagerPage._addMenu(menuList, { id: 'shochuLnk', href: '#', resId: 'SHOCHU_STR' });
};


// Override DBManagerPage.fnSetDatabase.
DBManagerPage.fnSetDatabase['dishLnk'] = function()
{
    DBManagerPage.dbTable      = 'ofuro_dishes';
    DBManagerPage.strSearchKey = 'category';

    DBManagerPage.$categorySelect =
        $(_generateCategorySelectHtml(
            rgobjOfuroDishCategory,
            'dishCategorySelect',
            Strings.getString('DISH_TYPE_STR')));
};

DBManagerPage.fnSetDatabase['eventLnk'] = function()
{
    DBManagerPage.dbTable         = 'ofuro_events';
    DBManagerPage.strSearchKey    = 'year';
    DBManagerPage.$categorySelect = $(generateYearSelectHtml(Strings.getString('EVENT_YEAR_STR'), 1994));
};

DBManagerPage.fnSetDatabase['drinkLnk'] = function()
{
    DBManagerPage.dbTable = 'ofuro_drinks';
    DBManagerPage.strSearchKey    = 'category';
    DBManagerPage.$categorySelect = $(generateDrinkCategorySelectHtml());
};

DBManagerPage.fnSetDatabase['sakeLnk'] = function()
{
    DBManagerPage.dbTable = 'ofuro_sakes';
    DBManagerPage.strSearchKey    = 'category';
    DBManagerPage.$categorySelect = $(generateSakeCategorySelectHtml());
};

DBManagerPage.fnSetDatabase['shochuLnk'] = function()
{
    DBManagerPage.dbTable = 'ofuro_shochus';
    DBManagerPage.strSearchKey    = 'category';
    DBManagerPage.$categorySelect = $(generateShochuCategorySelectHtml());
};


// Override DBManagerPage.fnGenerateTableRowHtml.
DBManagerPage.fnGenerateTableRowHtml['sakeCategorySelect'] = function(objSake)
{
    var html =
        '<tr class="dbmgrRow">' +
            '<td class="checkBoxCol">' +
                DBManagerPage._generateCheckBoxHtml(objSake) +
            '</td>' +
            '<td class="mediumText">' +
                objSake.vintage +
            '</td>' +
            '<td class="smallText">' +
                objSake.name +
            '</td>' +
            '<td class="smallText">' +
                objSake.ingredient +
            '</td>' +
            '<td class="smallText">' +
                objSake.producer +
            '</td>' +
            '<td class="mediumText">' +
                '{0}yen / {1}yen'.format(objSake.glass_price, objSake.tokkuri_price) +
            '</td>' +
        '</tr>';

    return(html);
};

DBManagerPage.fnGenerateTableRowHtml['shochuCategorySelect'] = function(objShochu)
{
    var html =
        '<tr class="dbmgrRow">' +
            '<td class="checkBoxCol">' +
                DBManagerPage._generateCheckBoxHtml(objShochu) +
            '</td>' +
            '<td class="mediumText">' +
                (objShochu.vintage ? objShochu.vintage : 'N.V.') +
            '</td>' +
            '<td class="smallText">' +
                objShochu.name +
            '</td>' +
            '<td class="smallText">' +
                objShochu.ingredient +
            '</td>' +
            '<td class="smallText">' +
                objShochu.producer +
            '</td>' +
            '<td class="mediumText">' +
                WineUtility.getPriceText(objShochu, false) +
            '</td>' +
        '</tr>';

    return html;
};

