// Override DBManagerPage.strSite.
DBManagerPage.strSite = 'mitsu-getsu';


// Override DBManagerPage.fnAddMenus().
DBManagerPage.fnAddMenus = function(menuList)
{
    DBManagerPage._addMenu(menuList, { id: 'dishLnk',   href: '#', resId: 'DISH_STR' });
    DBManagerPage._addMenu(menuList, { id: 'drinkLnk',  href: '#', resId: 'OTHER_DRINKS_STR' });
    DBManagerPage._addMenu(menuList, { id: 'eventLnk',  href: '#', resId: 'EVENT_STR' });
};


// Override DBManagerPage.fnSetDatabase().
DBManagerPage.fnSetDatabase['dishLnk'] = function()
{
    DBManagerPage.dbTable      = 'mitsugetsu_dishes';
    DBManagerPage.strSearchKey = 'category';

    DBManagerPage.$categorySelect =
        $(_generateCategorySelectHtml(
                rgobjMitsugetsuDishCategory,
                'dishCategorySelect',
                Strings.getString('DISH_TYPE_STR')));
};

DBManagerPage.fnSetDatabase['eventLnk'] = function()
{
    DBManagerPage.dbTable         = 'mitsugetsu_events';
    DBManagerPage.strSearchKey    = 'year';
    DBManagerPage.$categorySelect = $(generateYearSelectHtml(Strings.getString('EVENT_YEAR_STR'), 2007));
};

DBManagerPage.fnSetDatabase['drinkLnk'] = function()
{
    DBManagerPage.dbTable = 'mitsugetsu_drinks';
    DBManagerPage.$categorySelect =
        $(_generateCategorySelectHtml(rgobjMitsugetsuDrinkCategory, 'drinkCategorySelect', Strings.getString('DRINK_TYPE_STR')));
};

