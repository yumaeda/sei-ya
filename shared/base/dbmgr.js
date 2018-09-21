var urlQuery = new UrlQuery();

var DBManagerPage =
{
    intSite: urlQuery.getValue('site'),
    dbTable: '',
    rgobjChecked: [],
    NEW_PAGE: 'new.html',
    strSearchKey: 'category',

    $aside: null,
    $div: null,
    $menus: null,
    $cmdBtns: null,
    $categorySelect: null,
    $regionSelect: null,

    strSite: '',

    fnOnButtonClick: {},

    fnGenerateTableRowHtml: {}, 
    fnSetDatabase: {},

    onReady: function()
    {
        loadResourceStrings('{0}/{1}/resources'.format(getRootFolderUrl(), DBManagerPage.strSite));
        document.title = Strings.getString('DB_MANAGER_PAGE_STR');

        var imgTag = new ImageTag('{0}/{1}/images/adminHome.png'.format(getRootFolderUrl(), DBManagerPage.strSite));
        imgTag.addClass('adminHomeImg');

        var $nav = $('nav');
        $nav.html(DBManagerPage._generateMenuListHtml());
        $nav.prepend('<a href="{0}/admin_home.html">{1}</a>'.format(getRootFolderUrl(), imgTag.toHtml()));

        $(window).focus(DBManagerPage.onFocus);
        
        DBManagerPage.$aside = $('aside');
        DBManagerPage.$aside.delegate('select', 'change', DBManagerPage.onSelectChange);

        DBManagerPage.$div = $('div');
        DBManagerPage.$div.delegate(':checkbox', 'click', DBManagerPage.onCheckboxClick);

        DBManagerPage.$menus = $('ul.menuList a');
        DBManagerPage.$menus.click(DBManagerPage.onMenuClick);

        DBManagerPage.$cmdBtns = $('.menuList input');
        DBManagerPage.$cmdBtns.click(DBManagerPage.onBtnClick);
        DBManagerPage.$cmdBtns.hide();
    },

    onFocus: function()
    {
        console.log('onFocus');
        DBManagerPage.loadTableById(DBManagerPage._getCategorySelectId(), true);
    },

    onMenuClick: function()
    {
        DBManagerPage.$menus.filter('.selectedMenu').animate({ fontSize: '-=10' }, 100, function()
        {
            $(this).removeClass('selectedMenu');
        });

        $(this).animate({ fontSize: '+=10' }, 300, function()
        {
            $(this).addClass('selectedMenu');
        });

        DBManagerPage.$cmdBtns.hide();
        DBManagerPage.$div.html('');
        DBManagerPage.rgobjChecked.length = 0;

        if (DBManagerPage.$categorySelect)
        {
            DBManagerPage.$categorySelect.remove();
            DBManagerPage._removeRegionSelect();
        }

        DBManagerPage.fnSetDatabase[this.id]();

        if (DBManagerPage.$categorySelect)
        {
            DBManagerPage.$categorySelect.appendTo(DBManagerPage.$aside);
        }

        return false;
    },
    
    onBtnClick: function()
    {
        var html =
            appendQuery(DBManagerPage.NEW_PAGE, 'dbTable', DBManagerPage.dbTable);

        if (DBManagerPage.intSite)
        {
            html = appendQuery(html, 'site', DBManagerPage.intSite);
        }

        DBManagerPage.fnOnButtonClick[this.id](html);
        DBManagerPage.rgobjChecked.length = 0;
        DBManagerPage._tryToggleCmdBtns();
    },

    onSelectChange: function()
    {
        DBManagerPage.$categorySelect.removeClass('selectedMenu');
        DBManagerPage.rgobjChecked.length = 0;
        DBManagerPage.$cmdBtns.hide();

        if ((this.id != 'wineCategorySelect') &&
            (this.id != 'wineColorSelect'))
        {
            DBManagerPage._tryToggleCmdBtns();
        }

        DBManagerPage.loadTableById(this.id, false);
    },

    loadTableById: function(id, fFocus)
    {
        if (DBManagerPage.fnGenerateTableRowHtml[id])
        {
            DBManagerPage._loadTable(DBManagerPage.fnGenerateTableRowHtml[id]);
        }
    },

    _loadTable: function(fnGenerateRowHtml)
    {
        var strCondition;

        if (DBManagerPage.$categorySelect)
        {
            strCondition =
                '{0}={1}'.format(DBManagerPage.strSearchKey, DBManagerPage.$categorySelect.val());
        }

        var intRegion = DBManagerPage.$regionSelect ?
            DBManagerPage.$regionSelect.val() : 0;

        if ((intRegion > 0) && (DBManagerPage.dbTable == 'anyway_wines'))
        {
            strCondition += (' AND general_region=' + intRegion);
        }

        var phpPath = '{0}/{1}/get_items.php'.format(getRootFolderUrl(), DBManagerPage.strSite);

        $.ajax(
        { 
            url:      phpPath,
            cache:    false,
            dataType: 'json', 
            data:
            {
                dbTable: DBManagerPage.dbTable,
                condition: strCondition,
                orderBy: 'sort_order'
            },

            success: function(data)
            { 
                var cData = data.length,
                    html = '<table class="widthSemiFull hMarginAuto">';

                for (var i = 0; i < cData; ++i)
                {
                    html += fnGenerateRowHtml(data[i]);
                }

                DBManagerPage.$div.html(html + '</table>');
            },

            error: function()
            {
                console.error('_loadTable: Ajax call failed.');
            }
        });
    },

    onRegionSelect: null,

    onCheckboxClick: function()
    {
        if ($(this).attr('checked'))
        {
            DBManagerPage.rgobjChecked.push(
                {
                    id: this.id,
                    order: $(this).attr('order'),
                    $parentTr: $(this).closest('tr')
                }
            );
        }
        else
        {
            var cChecked = DBManagerPage.rgobjChecked.length;

            for (var i = 0; i < cChecked; ++i)
            {
                if (DBManagerPage.rgobjChecked[i].id == this.id)
                {
                    DBManagerPage.rgobjChecked.splice(i, 1);
                }
            }
        }

        DBManagerPage._tryToggleCmdBtns();
    },

    deleteSelectedItem: function(iChecked, dbTable)
    {
        var objChecked = DBManagerPage.rgobjChecked[iChecked];

        var phpPath = '{0}/{1}/admin/delete_dbrow.php'.format(getRootFolderUrl(), DBManagerPage.strSite);

        $.ajax(
        {
            url:  phpPath,
            type: 'POST',
            data: { id: objChecked.id, dbTable: dbTable },
            success: function()
            {
                objChecked.$parentTr.remove();
                DBManagerPage.rgobjChecked.splice(iChecked, 1);

                DBManagerPage._tryToggleCmdBtns();
            },

            error: function(xhr, status)
            {
                console.error(objChecked.id + ' was not deleted from the database.');
            }
        });
    },

    _tryToggleCmdBtns: function()
    {
        switch (DBManagerPage.rgobjChecked.length)
        {
        case 0:
            DBManagerPage.$cmdBtns.hide();
            DBManagerPage.$cmdBtns.filter('#newBtn').fadeIn(800);
            break;
        case 1:
            DBManagerPage.$cmdBtns.filter('#newBtn').hide();
            DBManagerPage.$cmdBtns.not('#newBtn').fadeIn(800);
            break;
        case 2:
            DBManagerPage.$cmdBtns.filter('#insertBtn').hide();
            break;
        default:
            break;
        }
    },

    _generateCheckBoxHtml: function(objData)
    {
        var inputTag = new InputTag('', '');
        inputTag.addAttr('id', objData.id);
        inputTag.addAttr('order', objData.sort_order);
        inputTag.addAttr('type', 'checkbox');

        return(inputTag.toHtml());
    },

    _addMenu: function(objMenuList, objMenuArgs)
    {
        var anchorTag, listItemTag;

        anchorTag = new AnchorTag(objMenuArgs.href, Strings.getString(objMenuArgs.resId));
        anchorTag.addAttr('id', objMenuArgs.id);
        listItemTag = new ListItemTag(anchorTag.toHtml());

        objMenuList.addItem(listItemTag);
    },

    fnAddMenus: null,

    rgCommandAttr:
    [
        { id: 'newBtn',    resId: 'NEW_ITEM_STR'     },
        { id: 'insertBtn', resId: 'INSERT_BELOW_STR' },
        { id: 'editBtn',   resId: 'EDIT_STR'         },
        { id: 'deleteBtn', resId: 'DELETE_STR'       }
    ],

    _generateMenuListHtml: function()
    {
        var menuList, anchorTag;

        menuList = new ListTag(false);
        menuList.addClass('menuList');

        if (DBManagerPage.fnAddMenus)
        {
            DBManagerPage.fnAddMenus(menuList);
        }

        var commandAttr, newBtn;
        for (var i = 0; i < DBManagerPage.rgCommandAttr.length; ++i)
        {
            commandAttr = DBManagerPage.rgCommandAttr[i];

            newBtn = new InputTag('', Strings.getString(commandAttr.resId));
            newBtn.addAttr('id', commandAttr.id);
            newBtn.addAttr('type', 'button');

            menuList.addItem(new ListItemTag(newBtn.toHtml()));
        }

        return menuList.toHtml();
    },

    _removeRegionSelect: function()
    {
        if (DBManagerPage.$regionSelect)
        {
            DBManagerPage.$regionSelect.remove();
            DBManagerPage.$regionSelect = null;
        }
    },

    _getCategorySelectId: function()
    {
        return((DBManagerPage.$categorySelect ? DBManagerPage.$categorySelect.attr('id') : ''));
    }
};


DBManagerPage.fnOnButtonClick['newBtn'] = function(html)
{
    if (DBManagerPage.$categorySelect)
    {
        html = appendQuery(html, 'category', DBManagerPage.$categorySelect.val());
    }

    if (DBManagerPage.$regionSelect)
    {
        html = appendQuery(html, 'region', DBManagerPage.$regionSelect.val());
    }

    window.open(html);
};

DBManagerPage.fnOnButtonClick['insertBtn'] = function(html)
{
    var sortOrder = parseInt(DBManagerPage.rgobjChecked[0].order, 10) + 1;
    html = appendQuery(html, 'category', DBManagerPage.$categorySelect.val());
    html = appendQuery(html, 'sort_order', sortOrder);

    if (DBManagerPage.$regionSelect)
    {
        html = appendQuery(html, 'region', DBManagerPage.$regionSelect.val());
    }

    window.open(html);
};

DBManagerPage.fnOnButtonClick['editBtn'] = function(html)
{
    var cChecked = DBManagerPage.rgobjChecked.length;
    for (var i = 0; i < cChecked; ++i)
    {
        window.open(appendQuery(html, 'id', DBManagerPage.rgobjChecked[i].id));
    }
};

DBManagerPage.fnOnButtonClick['deleteBtn'] = function(html)
{
    var cChecked = DBManagerPage.rgobjChecked.length;
    for (var i = 0; i < cChecked; ++i)
    {
        DBManagerPage.deleteSelectedItem(i, DBManagerPage.dbTable);
    }
};

// Common functions in Mitsu-Getsu and Ofuro.
DBManagerPage.fnGenerateTableRowHtml['dishCategorySelect'] = function(objDish)
{
    var html =
        '<tr class="dbmgrRow">' +
            '<td class="checkBoxCol">' +
                DBManagerPage._generateCheckBoxHtml(objDish) +
            '</td>' +
            '<td class="mediumText">' +
                objDish.name +
            '</td>' +
            '<td class="mediumText">' +
                WineUtility.getPriceText(objDish, false) +
            '</td>' +
        '</tr>';

    return html;
};

// Common functions in Mitsu-Getsu and Ofuro.
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

// Common functions in Mitsu-Getsu and Ofuro.
DBManagerPage.fnGenerateTableRowHtml['drinkCategorySelect'] = function(objDrink)
{
    var html =
        '<tr class="dbmgrRow">' +
            '<td class="checkBoxCol">' +
                DBManagerPage._generateCheckBoxHtml(objDrink) +
            '</td>' +
            '<td class="mediumText">{0}</td>'.format(objDrink.name) +
            '<td class="mediumText">{0}</td>'.format(objDrink.loc_name) +
            '<td class="mediumText">' +
                WineUtility.getPriceText(objDrink, false) +
            '</td>' +
        '</tr>';

    return html;
};

// Common functions in Mitsu-Getsu and Ofuro.
DBManagerPage.fnGenerateTableRowHtml['photoCategorySelect'] = function(objPhoto)
{
    var html =
        '<tr>' +
            '<td class="checkBoxCol">' +
                DBManagerPage._generateCheckBoxHtml(objPhoto) +
            '</td>' +
            '<td class="mediumText">' +
                objPhoto.filename +
            '</td>' +
            '<td class="smallText">' +
                objPhoto.comment +
            '</td>' +
        '</tr>';

    return html;
};

$(document).ready(DBManagerPage.onReady);

