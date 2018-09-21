<?php

require_once('./config.php');

if (!isAuthenticated())
{
    $location = 'https://' . BASE_URL . 'login.php';
    header("Location: $location");

    exit();
}

$pageTitle = 'ホーム｜Anyway-Grapes（飲食店様用）';

include_once('../includes/header.html');

echo '
    <div id="contents" style="width:100%;">
        <img id="popupArrowImg" src="./arrow.png" style="width:30px;height:10px;z-index:100;display:none;" />
        <div id="popupPane" style="background-color:white;border:solid 1px rgb(224,224,224);display:none;width:300px;height:200px;padding:10px;z-index:99;text-align:center;">
            <a href="./customer_info.php" style="text-decoration:none;font-size:13px;" target="_blank">会員情報</a>
            <br /><br />
            <a href="./order_history.php" style="text-decoration:none;font-size:13px;" target="_blank">注文履歴</a>
            <br /><br />
            <a href="./logout.php" style="text-decoration:none;font-size:13px;">ログアウト</a>
        </div>
        <div id="loadingPane" style="text-align:center;">
            <img src="./loading.gif" style="width:150px;" />
        </div>
        <div id="wineListPane" style="padding-top:25px;"></div>
    </div>
';

include_once('../includes/footer.html');

mysqli_close($dbc);

?>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="../scripts/seiya.country-0.1.js"></script> 
<script type="text/javascript" src="../scripts/seiya.functions-0.1.js"></script> 
<script type="text/javascript" src="../scripts/urlquery.js"></script> 
<script type="text/javascript" src="../scripts/htmltag.js"></script> 
<script type="text/javascript" src="../scripts/seiya.wine.functions-0.1.js"></script> 
<script type="text/javascript">

var sortOrderHash =
{
    '1': '価格 (安い順)',
    '2': '価格 (高い順)',
    '3': 'ヴィンテージ (古い順)',
    '4': 'ヴィンテージ (新しい順)',
    '5': '生産者 (昇順)',
    '6': '生産者 (降順)',
    '7': '商品名 (昇順)',
    '8': '商品名 (降順)'
}

function generateCountryFlagHtml(strCountry)
{
    var html =
        '<figure>' +
            '<img style="width:45px;" src="//anyway-grapes.jp/images/' + getCountryImgFileName(strCountry) + '" />' +
            '<figcaption style="font-size:6px;white-space:nowrap;">' + countryHash[strCountry] + '</figcaption>' +
        '</figure>';

    return html;
}

//
// Dependencies:
//     seiya.htmltag-0.1.js
//
function generateSelectHtml(strId, sourceHash, objValue)
{
    var selectTag  = new SelectTag(),
        iOption    = 1,
        optionText = '',
        html       = '';

    selectTag.addAttr('id', strId);
    selectTag.addOption('指定なし', '');

    for (var key in sourceHash)
    {
        if ((key != '') && (key == objValue))
        {
            selectTag.setSelectedIndex(iOption);
        }

        selectTag.addOption(sourceHash[key], key);
        ++iOption;
    }

    return selectTag.toHtml();
}

function compareVintage(lhs, rhs)
{
    if (lhs.vintage < rhs.vintage)
    {
        return -1;
    }

    if (lhs.vintage > rhs.vintage)
    {
        return 1;
    }

    return 0;
}

function compareVintageReverse(lhs, rhs)
{
    if (lhs.vintage > rhs.vintage)
    {
        return -1;
    }

    if (lhs.vintage < rhs.vintage)
    {
        return 1;
    }

    return 0;
}

function comparePrice(lhs, rhs)
{
    if (parseInt(lhs.price) < parseInt(rhs.price))
    {
        return -1;
    }

    if (parseInt(lhs.price) > parseInt(rhs.price))
    {
        return 1;
    }

    return 0;
}

function comparePriceReverse(lhs, rhs)
{
    if (parseInt(lhs.price) > parseInt(rhs.price))
    {
        return -1;
    }

    if (parseInt(lhs.price) < parseInt(rhs.price))
    {
        return 1;
    }

    return 0;
}

function compareProducer(lhs, rhs)
{
    if (lhs.producer_jpn < rhs.producer_jpn)
    {
        return -1;
    }

    if (lhs.producer_jpn > rhs.producer_jpn)
    {
        return 1;
    }

    return 0;
}

function compareProducerReverse(lhs, rhs)
{
    if (lhs.producer_jpn > rhs.producer_jpn)
    {
        return -1;
    }

    if (lhs.producer_jpn < rhs.producer_jpn)
    {
        return 1;
    }

    return 0;
}

function compareName(lhs, rhs)
{
    if (lhs.combined_name_jpn < rhs.combined_name_jpn)
    {
        return -1;
    }

    if (lhs.combined_name_jpn > rhs.combined_name_jpn)
    {
        return 1;
    }

    return 0;
}

function compareNameReverse(lhs, rhs)
{
    if (lhs.combined_name_jpn > rhs.combined_name_jpn)
    {
        return -1;
    }

    if (lhs.combined_name_jpn < rhs.combined_name_jpn)
    {
        return 1;
    }

    return 0;
}

var BusinessCustomerPage =
{
    rgobjWine:   null,
    intViewMode: 1,
    strType:     '',
    strCountry:  '',
    strRegion:   '',
    sortOrder:   '',
    iCurPage:    0,
    intMaxItem:  20,

    _generateSearchPaneHtml: function()
    {
        var html =
            '<div id="searchPane" style="position:absolute;top:10px;right:50px;">' +
                '<input type="text" placeholder="ワインを検索" style="height:30px;width:150px;" />' +
                '<img id="searchBtn" src="../images/search_btn2.png" style="width:30px;height:30px;vertical-align:middle;cursor:pointer;" />' +
            '</div>';

        return html;
    },

    _generateCountrySelectHtml: function()
    {
        return generateSelectHtml('countrySelect', countryHash, BusinessCustomerPage.strCountry);
    },

    _generateTypeSelectHtml: function()
    {
        return generateSelectHtml('typeSelect', wineTypeHash, BusinessCustomerPage.strType);
    },

    _generateSortOrderSelectHtml: function()
    {
        return generateSelectHtml('sortOrderSelect', sortOrderHash, BusinessCustomerPage.sortOrder);
    },

    reload: function()
    {
        $('div#wineListPane').hide();
        $('div#loadingPane').show();

        $.ajax(
        {
            url:  './api/get_business_customer_wines.php',
            type: 'GET',
            data:
            {
                type:     BusinessCustomerPage.strType,
                country:  BusinessCustomerPage.strCountry,
                region:   BusinessCustomerPage.strRegion,
                producer: ''
            },

            dataType: 'json',
            success: function(rgobjData)
            {
                BusinessCustomerPage.rgobjWine = rgobjData;
                BusinessCustomerPage.renderWineList(BusinessCustomerPage.rgobjWine, BusinessCustomerPage.intViewMode);

                $('div#loadingPane').hide();
                $('div#wineListPane').show();
            },

            error: function() {}
        });
    },

    renderRegionSelect: function()
    {
        var strUrl = "../laravel5.3/public/api/v1/regions";

        if (BusinessCustomerPage.strCountry !== '')
        {
            strUrl += '/' + BusinessCustomerPage.strCountry;
        }
        
        if (BusinessCustomerPage.strType !== '')
        {
            strUrl += '/' + BusinessCustomerPage.strType;
        }

        $.ajax(
        {
            url : strUrl,
            dataType: 'json',
            success: function(data)
            {
                var selectTag = new SelectTag();

                selectTag.addAttr('id', 'regionSelect');
                selectTag.addOption('指定なし', '');

                var rgobjRegion = data.regions,
                    objRegion   = null,
                    cRegion     = rgobjRegion.length,
                    optionText  = '',
                    iSelected   = 0;

                for (var i = 0; i < cRegion; ++i)
                {
                    objRegion  = rgobjRegion[i];
                    optionText = objRegion['region_jpn'];
                    selectTag.addOption(optionText, objRegion['region']);

                    if ((BusinessCustomerPage.strRegion != '') &&
                        (objRegion['region'] == BusinessCustomerPage.strRegion))
                    {
                        iSelected = (i + 1);
                    }
                }

                selectTag.setSelectedIndex(iSelected);
                $('span#regionSpan').html(selectTag.toHtml());
            },

            error: function() {}
        });
    },

    renderPagination: function(cPage)
    {
        if (cPage > 1)
        {
            var html       = '',
                iPage      = BusinessCustomerPage.iCurPage,
                iBeginPage = 0,
                strPage    = '';

            if (iPage > 0)
            {
                html += '<a href="#" class="paginationLnk" rel="' + (iPage - 1) + '" style="padding:5px;text-decoration:none;color:rgb(80,80,80);">&lt;</a>';
            }

            if ((cPage > 10) && (iPage > 5))
            {
                iBeginPage = (iPage - 5);
            }

            for (var i = iBeginPage; ((i < cPage) && (i < (iBeginPage + 10))); ++i)
            {
                strPage = i + 1;

                if (i == iPage)
                {
                    html += '<span style="padding:5px;background-color:rgb(80,80,80);color:white;">' + (iPage + 1) + '</span>';
                }
                else
                {
                    html += '<a href="#" class="paginationLnk" rel="' + i + '" style="padding:5px;text-decoration:none;color:rgb(80,80,80);">' + strPage + '</a>';
                }
            }

            if ((iPage + 1) < cPage)
            {
                html += '<a href="#" class="paginationLnk" rel="' + (iPage + 1) + '" style="padding:5px;text-decoration:none;color:rgb(80,80,80);">&gt;</a>';
            }

            html += '</div>';

            $('td.paginationCol').html('<div class="paginationPane" style="font-size:13px;text-align:right;">' + html + '</div>');

            $('div.paginationPane').on('click', 'a.paginationLnk', function()
            {
                BusinessCustomerPage.iCurPage = parseInt($(this).attr('rel'), 10);
                BusinessCustomerPage.renderWineList(BusinessCustomerPage.rgobjWine, BusinessCustomerPage.intViewMode);

                $('div#loadingPane').hide();

                return false;
            });
        }
    },

    renderNavigation: function()
    {
        var $searchPane     = $(BusinessCustomerPage._generateSearchPaneHtml()),
            $navigationPane = $('<div id="navigationPane" style="text-align:center;padding: 50px 0 25px 0;"></div>');

        $searchPane.appendTo($('header'));
        $navigationPane.appendTo($('header'));

        $searchPane.off('click', '#searchBtn');
        $searchPane.on('click', '#searchBtn', function()
        {
            BusinessCustomerPage.strType    = '';
            BusinessCustomerPage.strCountry = '';
            BusinessCustomerPage.strRegion  = '';
            BusinessCustomerPage.strOrder   = '';
            BusinessCustomerPage.iCurPage   = 0;

            $('select#typeSelect').val('');
            $('select#countrySelect').val('');
            $('select#regionSelect').val('');
            $('select#sortOrderSelect').val('');

            var searchText = $('div#searchPane input').val();
            if (searchText && searchText.length > 0)
            {
                $.ajax(
                {
                    url:  './api/get_business_customer_wines.php',
                    type: 'GET',
                    data:
                    {
                        keyword: searchText
                    },

                    dataType: 'json',
                    success: function(rgobjData)
                    {
                        BusinessCustomerPage.rgobjWine = rgobjData;
                        BusinessCustomerPage.renderWineList(BusinessCustomerPage.rgobjWine, BusinessCustomerPage.intViewMode);

                        $('div#loadingPane').hide();
                    },

                    error: function() {}
                });
            }
        });

        var cartLnk             = new AnchorTag('./cart.php', 'カート'),
            menuLnk             = new AnchorTag('#', 'メニュー <span style="font-size:3px;">▽</span>'),
            typeSelectHtml      = BusinessCustomerPage._generateTypeSelectHtml(),
            countrySelectHtml   = BusinessCustomerPage._generateCountrySelectHtml(),
            sortOrderSelectHtml = BusinessCustomerPage._generateSortOrderSelectHtml(),
            //viewSwitchLnk       = new AnchorTag('#', ''),
            html                = '';
        
        menuLnk.addAttr('id', 'menuLnk');
        menuLnk.addAttr('style', 'text-decoration:none;color:rgb(80,80,80);');
        cartLnk.addAttr('style', 'padding:0 15px 0 15px;text-decoration:none;color:rgb(80,80,80);');
        cartLnk.addAttr('target', '_blank');
        //viewSwitchLnk.addAttr('id', 'viewSwitcher');
        //viewSwitchLnk.addAttr('style', 'padding:0 15px 0 15px;text-decoration:none;color:rgb(80,80,80);');

        html =
            '種類：'   + typeSelectHtml      + '&nbsp;&nbsp;' +
            '国：'     + countrySelectHtml   + '&nbsp;&nbsp;' +
            '地域：'   + '<span id="regionSpan"></span>' + '&nbsp;&nbsp;' +
            '並び順：' + sortOrderSelectHtml + '&nbsp;&nbsp;' +
            //viewSwitchLnk.toHtml() +
            cartLnk.toHtml() +
            '&nbsp;&nbsp;' +
            menuLnk.toHtml();

        $navigationPane.html(html);
        $navigationPane.on('change', '#countrySelect', function()
        {
            BusinessCustomerPage.iCurPage   = 0;
            BusinessCustomerPage.strCountry = $(this).val();
            BusinessCustomerPage.strRegion  = '';
            BusinessCustomerPage.renderRegionSelect();

            BusinessCustomerPage.reload();
        });

        $navigationPane.on('change', '#typeSelect', function()
        {
            BusinessCustomerPage.iCurPage = 0;
            BusinessCustomerPage.strType  = $(this).val();
            BusinessCustomerPage.reload();
        });

        $navigationPane.on('change', '#sortOrderSelect', function()
        {
            $('div.paginationPane').remove();
            BusinessCustomerPage.sortOrder = $(this).val();
            BusinessCustomerPage.renderWineList(BusinessCustomerPage.rgobjWine, BusinessCustomerPage.intViewMode);
        });

/* Disable view switching code.
******************************************************
        $navigationPane.on('click', 'a#viewSwitcher', function()
        {
            $('div.paginationPane').remove();

            BusinessCustomerPage.intViewMode = ((BusinessCustomerPage.intViewMode + 1) % 2);
            BusinessCustomerPage.renderWineList(BusinessCustomerPage.rgobjWine, BusinessCustomerPage.intViewMode);

            return false;
        });
******************************************************
*/

        BusinessCustomerPage.renderRegionSelect();
        $navigationPane.on('change', '#regionSelect', function()
        {
            BusinessCustomerPage.iCurPage  = 0;
            BusinessCustomerPage.strRegion = $(this).val();
            BusinessCustomerPage.reload();
        });
    },

    renderWineList: function(rgobjWine, intViewMode)
    {
/* Disable view switching code.
******************************************************

        if (BusinessCustomerPage.intViewMode == 0)
        {
            $('a#viewSwitcher').html('写真を表示');
        }
        else
        {
            $('a#viewSwitcher').html('写真を非表示');
        }

******************************************************
*/

        if (rgobjWine && rgobjWine.length > 0)
        {
            switch(BusinessCustomerPage.sortOrder)
            {
            case '1':
                rgobjWine.sort(comparePrice);
                break;
            case '2':
                rgobjWine.sort(comparePriceReverse);
                break;
            case '3':
                rgobjWine.sort(compareVintage);
                break;
            case '4':
                rgobjWine.sort(compareVintageReverse);
                break;
            case '5':
                rgobjWine.sort(compareProducer);
                break;
            case '6':
                rgobjWine.sort(compareProducerReverse);
                break;
            case '7':
                rgobjWine.sort(compareName);
                break;
            case '8':
                rgobjWine.sort(compareNameReverse);
                break;
            }

            var iPage    = BusinessCustomerPage.iCurPage,
                cWine    = rgobjWine.length,
                objWine  = null,
                tableTag = new TableTag(),
                iStart   = iPage * BusinessCustomerPage.intMaxItem,
                iEnd     = iStart + BusinessCustomerPage.intMaxItem,
                cPage    = Math.floor(cWine / BusinessCustomerPage.intMaxItem);

            if ((cWine % BusinessCustomerPage.intMaxItem) > 0)
            {
                ++cPage;
            }

            var iFirstItem = iPage * BusinessCustomerPage.intMaxItem + 1,
                iLastItem  = iFirstItem + BusinessCustomerPage.intMaxItem - 1;
            if (iLastItem > cWine)
            {
                iLastItem = cWine;
            }

            var itemCountHtml = '<span style="color:rgb(150,150,150);">{0}&nbsp;件中&nbsp;{1}〜{2}&nbsp;件を表示</span>'.format(formatNumber(cWine), iFirstItem, iLastItem);

            var paginationRow = new TableRow(),
                emptyRow      = new TableRow(),
                paginationCol = new TableColumn(''),
                emptyCol      = new TableColumn('&nbsp;');

            paginationCol.addAttr('colspan', '3');
            paginationCol.addClass('paginationCol');
            paginationRow.addColumn(new TableColumn(itemCountHtml));
            paginationRow.addColumn(paginationCol);

            emptyCol.addAttr('colspan', '4');
            emptyRow.addColumn(emptyCol);

            tableTag.body.addRow(paginationRow);
            tableTag.body.addRow(emptyRow);

            for (var i = iStart; ((i < iEnd) && (i < cWine)); ++i)
            {
                objWine = rgobjWine[i];
                if (intViewMode == 0)
                {
                    BusinessCustomerPage.preRenderWineAsList(rgobjWine[i], tableTag);
                }
                else
                {
                    BusinessCustomerPage.preRenderWineAsImage(rgobjWine[i], tableTag, (i % 4));
                }
            }

            // Add pagination control to the bottom.
            var bottomPaginationRow = new TableRow(),
                bottomPaginationCol = new TableColumn('&nbsp;');
            bottomPaginationCol.addAttr('colspan', '3');
            bottomPaginationCol.addClass('paginationCol');
            bottomPaginationRow.addColumn(new TableColumn(itemCountHtml));
            bottomPaginationRow.addColumn(bottomPaginationCol);
            tableTag.body.addRow(bottomPaginationRow);

            $('div#wineListPane').html(tableTag.toHtml());
            $('div#wineListPane').off('click', 'img.addToCartBtn');
            $('div#wineListPane').on('click', 'img.addToCartBtn', function()
            {
                var $this      = $(this),
                    strBarcode = $this.attr('id');

                $this.attr('src', './load_ajax_post.gif');

                $.ajax(
                {
                    url:  './api/add_to_cart.php',
                    type: 'POST',
                    data:
                    {
                        barcode: strBarcode,
                        quantity: 1
                    },

                    dataType: 'text',
                    success: function(strResult)
                    {
                        if (strResult == 'SUCCESS')
                        {
                            $this.attr('src', './success.png');
                            $this.css('cursor', 'default');
                            $this.removeClass();
                        }
                    },

                    error: function() {}
                });
            });

            BusinessCustomerPage.renderPagination(cPage);
        }
        else
        {
            $('div#wineListPane').html('');
        }
    },

    preRenderWineAsList: function(objWine, targetTable)
    {
        var winePriceHtml = formatNumber(objWine.price) + '&nbsp;yen',
            wineFlagHtml  =
                '<figure style="text-align:center;">' +
                    generateCountryFlagHtml(objWine.country) +
                '</figure>',

            wineNameColHtml = 
            '<span style="font-size:10px;font-style:italic;">' + objWine.producer_jpn + '</span><br />' +
            '<a style="font-size:11px;" href="./detail.php?id=' + objWine.barcode_number + '" target="_blank">' +
                objWine.vintage + '&nbsp;' + objWine.combined_name_jpn +
            '</a>',

            wineTypeColHtml =
                '<span style="font-size:11px;">【' + wineTypeHash[objWine.type] + '】</span>';

        var strStock = (objWine.stock > 12) ? '12本以上' : (objWine.stock + '本');
        winePriceHtml += '<br /><span style="font-size:9px;white-space:nowrap;">在庫:&nbsp;' + strStock + '</span>';

        var detailRow = new TableRow(),
            emptyRow  = new TableRow(),
            nameCol   = new TableColumn(wineNameColHtml),
            emptyCol  = new TableColumn('&nbsp;');

        nameCol.addAttr('style', 'padding-left:10px;');
        emptyCol.addAttr('colspan', '4');

        detailRow.addColumn(new TableColumn(wineFlagHtml));
        detailRow.addColumn(nameCol);
        detailRow.addColumn(new TableColumn(wineTypeColHtml));
        detailRow.addColumn(new TableColumn(winePriceHtml));
        emptyRow.addColumn(emptyCol);

        targetTable.body.addRow(detailRow);
        targetTable.body.addRow(emptyRow);
    },

    preRenderWineAsImage: function(objWine, targetTable, iCol)
    {
        var imgUrl   = '//anyway-grapes.jp/images/wines/200px/{0}.png'.format(objWine.barcode_number),
            noImgUrl = '//anyway-grapes.jp/images/wines/200px/no_wine_photo.png',
            tableTag = new TableTag(),
            imgTag   = new ImageTag(imgUrl),
            strStock = (objWine.stock > 12) ? '12本以上' : (objWine.stock + '本');

        imgTag.addAttr('onerror', 'this.src=\'' + noImgUrl + '\';');
        imgTag.addAttr('style', 'max-height:200px;z-index:1;');

        var nameColInnerHtml =
                '<span style="font-size:11px;font-weight:bold;">' +
                    objWine.combined_name_jpn + '&nbsp;/&nbsp;' + objWine.producer_jpn +
                '</span>',

            imgColInnerHtml  = 
                '<a style="font-size:11px;" href="./detail.php?id=' + objWine.barcode_number + '" target="_blank">' +
                    imgTag.toHtml() +
                '</a>',

            infoColInnerHtml = 
                '<span style="font-size:9px;">' + wineTypeHash[objWine.type] + '&nbsp;(' + countryHash[objWine.country] + ')</span><br />' +
                objWine.vintage + '｜' + formatNumber(objWine.price) + '&nbsp;yen' + '｜' + strStock;

        var isComingSoon = false;

        if (objWine.etc && (objWine.etc.length > 0))
        {
             var rgstrToken  = objWine.etc.split('.');
             if (rgstrToken.length == 2)
             {
                 isComingSoon = (!Number.isNaN(Number(rgstrToken[0])) && !Number.isNaN(Number(rgstrToken[1])));
             }
        }

        if (isComingSoon)
        {
            imgColInnerHtml += '<img src="//anyway-grapes.jp/wholesale/coming_soon.png" style="width:215px;position:absolute;top:40px;left:0;z-index:3;cursor:pointer;" />';
        }
        else
        {
            imgColInnerHtml += '<img id="' + objWine.barcode_number +  '" class="addToCartBtn" src="//anyway-grapes.jp/campaign/add_to_cart.png" style="width:30px;height:30px;position:absolute;top:160px;left:175px;z-index:3;cursor:pointer;" />';
        }

        var imgRow  = new TableRow(),
            infoRow = new TableRow(),
            nameRow = new TableRow(),
            imgCol  = new TableColumn(imgColInnerHtml),
            infoCol = new TableColumn(infoColInnerHtml),
            nameCol = new TableColumn(nameColInnerHtml);

        imgCol.addAttr('style', 'width:218px;border:1px solid rgb(224,224,224);position:relative;text-align:center;');
        imgRow.addColumn(imgCol);

        infoCol.addAttr('style', 'text-align:center;vertical-align:top;');
        infoRow.addColumn(infoCol);

        nameCol.addAttr('style', 'height:120px;vertical-align:top;');
        nameRow.addColumn(nameCol);

        tableTag.body.addRow(imgRow);
        tableTag.body.addRow(infoRow);
        tableTag.body.addRow(nameRow);

        var innerTableCol = new TableColumn(tableTag.toHtml());
        innerTableCol.addAttr('style', 'max-width:225px;');
        if (iCol == 0)
        {
            var newRow = new TableRow();
            newRow.addColumn(innerTableCol);
            targetTable.body.addRow(newRow);
        }
        else
        {
            targetTable.body.m_rgobjRow[targetTable.body.m_rgobjRow.length - 1].addColumn(innerTableCol);
        }
    },

    render: function()
    {
        if (!BusinessCustomerPage.rgobjWine)
        {
            $.ajax(
            {
                url:  './api/get_business_customer_wines.php',
                type: 'GET',
                data:
                {
                    type:     BusinessCustomerPage.strType,
                    country:  BusinessCustomerPage.strCountry,
                    region:   BusinessCustomerPage.strRegion,
                    producer: ''
                },

                dataType: 'json',
                success: function(rgobjData)
                {
                    BusinessCustomerPage.rgobjWine = rgobjData;
                    BusinessCustomerPage.renderWineList(BusinessCustomerPage.rgobjWine, BusinessCustomerPage.intViewMode);

                    $('div#loadingPane').hide();
                },

                error: function() {}
            });
        }
        else
        {
            BusinessCustomerPage.renderWineList(BusinessCustomerPage.rgobjWine, BusinessCustomerPage.intViewMode);
        }
    }
};

var onWindowFocus = function()
{
    $.ajax(
    {
        url:  './api/auto_refresh_enabled.php',
        type: 'POST',
        data: {},
        dataType: 'text',
        success: function(responseText)
        {
            if (responseText == 'TRUE')
            {
                setTimeout(function(){ location.reload(); }, 300);             
            }
        },
        error: function() {}
    });
};

// main visibility API function 
// use visibility API to check if current tab is active or not
var vis = (function()
{
    var stateKey, 
        eventKey, 
        keys =
        {
            hidden:       'visibilitychange',
            webkitHidden: 'webkitvisibilitychange',
            mozHidden:    'mozvisibilitychange',
            msHidden:     'msvisibilitychange'
        };

    for (stateKey in keys)
    {
        if (stateKey in document)
        {
            eventKey = keys[stateKey];
            break;
        }
    }

    return function(c)
    {
        if (c)
        {
            document.addEventListener(eventKey, c);
        }

        return !document[stateKey];
    }
})();

function registerWindowFocusEvent()
{
    // check if current tab is active or not
    vis(function()
    {
        if (vis())
        {
            // tween resume() code goes here        
            setTimeout(function()
            {            
                //console.log('Tab is visible - has focus');
            }, 300);             
        }
        else
        {
            // tween pause() code goes here
            //console.log('Tab is invisible - has blur');
        }
    });

    // check if browser window has focus            
    var notIE      = (document.documentMode === undefined),
        isChromium = window.chrome;

    if (notIE && !isChromium)
    {
        // checks for Firefox and other  NON IE Chrome versions
        $(window).on('focusin', onWindowFocus);

        /*
        .on("focusout", function()
        {
            console.log("blur");
        });
        */
    }
    else
    {
        // Checks for IE and Chromium versions
        if (window.addEventListener)
        {
            // bind focus event
            window.addEventListener('focus', function(event){ onWindowFocus(); }, false);
    
            /*
            window.addEventListener('blur', function(event)
            {
                // tween pause() code goes here
                console.log("blur");
                
            }, false);
            */
        }
        else
        {
            window.attachEvent('focus', function(event){ onWindowFocus(); });

            /*
            window.attachEvent("blur", function(event)
            {
                // tween pause() code goes here
                console.log("blur");
    
            });
            */
        }
    }
}

$(document).ready(function()
{
    registerWindowFocusEvent();

    $('body').click(function()
    {
        $('div#popupPane').hide();
        $('img#popupArrowImg').hide();
    });

    $('header').css(
    {
        'height':  '140px',
        'padding': '0',
        'margin':  '0',
        'background-position': 'center'
    });

    $('div.contents').width(900);

    BusinessCustomerPage.renderNavigation();
    BusinessCustomerPage.render();

    $('div#navigationPane').on('click', 'a#menuLnk', function(event)
    {
        event.stopPropagation();

        var objPosition = $(this).position();

        $('div#popupPane')
            .css('position', 'absolute')
            .show()
            .css('top', objPosition.top + 30)
            .css('left', objPosition.left - ($('div#popupPane').outerWidth() - $(this).outerWidth()));

        $('img#popupArrowImg')
            .css('position', 'absolute')
            .show()
            .css('top', objPosition.top + 21)
            .css('left', objPosition.left + ($(this).outerWidth() / 2) - 15);

        return false;
    });
});

</script>

