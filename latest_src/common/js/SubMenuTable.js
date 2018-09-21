//-------------------------------------------------------
//
// SubMenuTable
//
// [Dependencies]
//     TableTag.cs
//     TableRow.cs
//     TableColumn.cs
//
//-------------------------------------------- YuMaeda --
class SubMenuTable
{
    constructor(strLabel, rgobjSubMenu)
    {
        this.m_strLabel     = strLabel;
        this.m_rgobjSubMenu = rgobjSubMenu;
        this.m_objStrings   =
        {
            'JANUARY_STR':        { 'ja': '１月',                   'en': 'January'        },
            'FEBRUARY_STR':       { 'ja': '２月',                   'en': 'February'       },
            'MARCH_STR':          { 'ja': '３月',                   'en': 'March'          },
            'APRIL_STR':          { 'ja': '４月',                   'en': 'April'          },
            'MAY_STR':            { 'ja': '５月',                   'en': 'May'            },
            'JUNE_STR':           { 'ja': '６月',                   'en': 'June'           },
            'JULY_STR':           { 'ja': '７月',                   'en': 'July'           },
            'AUGUST_STR':         { 'ja': '８月',                   'en': 'August'         },
            'SEPTEMBER_STR':      { 'ja': '９月',                   'en': 'September'      },
            'OCTOBER_STR':        { 'ja': '１０月',                 'en': 'October'        },
            'NOVEMBER_STR':       { 'ja': '１１月',                 'en': 'November'       },
            'DECEMBER_STR':       { 'ja': '１２月',                 'en': 'December'       },
            'STAFF_STR':          { 'ja': 'スタッフ',               'en': 'Staff'          },
            'STORE_INTERIOR_STR': { 'ja': '店内',                   'en': 'Store Interior' },
            'DISH_STR':           { 'ja': '料理',                   'en': 'Dish'           },
            'MAGAZINE_STR':       { 'ja': '雑誌',                   'en': 'Magazine'       },
            'DAILY_MENU_STR':     { 'ja': '日替わりメニュー',       'en': 'Daily Menu'     },
            'NORMAL_MENU_STR':    { 'ja': 'グランド・メニュー',     'en': 'Grand Menu'     },
            'A_LA_CARTE':         { 'ja': 'アラカルト',             'en': 'A la carte'     },
            'COURSE_STR':         { 'ja': 'コースメニュー',         'en': 'Course Menu'    },
            'BEER_STR':           { 'ja': '麦酒',                   'en': 'Beer'           },
            'DIGESTIF_STR':       { 'ja': '食後酒',                 'en': 'Digestif'       },
            'SAKE_STR':           { 'ja': '日本酒',                 'en': 'Sake'           },
            'SHOCHU_STR':         { 'ja': '焼酎',                   'en': 'Shochu'         },
            'OTHER_DRINKS_STR':   { 'ja': 'その他のドリンク',       'en': 'Other Drinks'   },
            'GLASS_WINE_STR':     { 'ja': 'グラスワイン',           'en': 'Glass Wine'     },
            'SPARKLING_WINE_STR': { 'ja': 'スパークリング・ワイン', 'en': 'Sparkling Wine' },
            'WHITE_WINE_STR':     { 'ja': '白ワイン',               'en': 'White Wine'     },
            'ROSE_WINE_STR':      { 'ja': 'ロゼワイン',             'en': 'Rosé Wine'      },
            'RED_WINE_STR':       { 'ja': '赤ワイン',               'en': 'Red Wine'       },
            'WINE_LIST_STR':      { 'ja': '秘蔵ワインリスト',       'en': 'Wine List'      }
        }
    }

    toHtml()
    {
        var cColumn  = 4,
            tableTag = new TableTag();

        tableTag.addClass('auto-horizontal-margin contents-width');
        if (this.m_strLabel)
        {
            var labelRow = new TableRow(),
                lineRow  = new TableRow(),
                labelCol = new TableColumn(this.m_strLabel),
                lineCol  = new TableColumn('<hr /><br />');
                
            labelCol.addAttr('colspan', (cColumn * 2));
            labelCol.addClass('body__label');
            labelRow.addColumn(labelCol);
            lineCol.addAttr('colspan', (cColumn * 2));
            lineRow.addColumn(lineCol);

            tableTag.head.addRow(labelRow);
            tableTag.head.addRow(lineRow);
        }

        var imgHtml    = '',
            cSubMenu   = this.m_rgobjSubMenu.length,
            tableWidth = ($('div.body').outerWidth(true) * 0.8),
            imgWidth   = 135,
            imgPadding = ((tableWidth - imgWidth * cColumn) / (cColumn - 1)),
            iSubMenu   = 0,
            iCol       = 0;

        while ((iSubMenu < cColumn) || (iSubMenu < cSubMenu))
        {
            if (iCol === 0)
            {
                var newRow = new TableRow();
                newRow.addClass('padding-top-small text-center');

                tableTag.body.addRow(newRow);
            }

            ++iCol;

            if (iSubMenu < cSubMenu)
            {
                var resId      = this.m_rgobjSubMenu[iSubMenu].resId,
                    strJpnText = this.m_objStrings[resId]['ja'],
                    strEngText = this.m_objStrings[resId]['en'],
                    submenuCol = new SubMenuColumn(strJpnText, strEngText, this.m_rgobjSubMenu[iSubMenu].cssClass);

                imgHtml = submenuCol.toHtml();
            }
            else
            {
                imgHtml = '';
            }

            var imgCol = new TableColumn(imgHtml);
            imgCol.addAttr('style', 'width:{0}px;'.format(imgWidth));
            tableTag.body.lastRow.addColumn(imgCol);

            if (iCol <= (cColumn - 1))
            {
                var imgPaddingCol = new TableColumn('&nbsp;');
                imgPaddingCol.addAttr('style', 'width:{0}px;'.format(imgPadding));
                tableTag.body.lastRow.addColumn(imgPaddingCol);
            }
            else
            {
                iCol = 0;
            }

            ++iSubMenu;
        }

        return tableTag.toHtml();
    }
}

