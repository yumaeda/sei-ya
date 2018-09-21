// Override DBManagerPage.strSite.
DBManagerPage.strSite = 'ofuro';

// Override DBManagerPage.fnAddMenus().
DBManagerPage.fnAddMenus = function(menuList)
{
    DBManagerPage._addMenu(menuList, { id: 'photoLnk', href: '#', resId: 'PHOTO_STR' });
};

// Override DBManagerPage.fnSetDatabase.
DBManagerPage.fnSetDatabase['photoLnk'] = function()
{
    DBManagerPage.dbTable = 'ofuro_photos';
    DBManagerPage.$categorySelect = $(generatePhotoCategorySelectHtml(DBManagerPage.intSite));
};

