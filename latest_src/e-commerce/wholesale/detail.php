<?php

require_once('./config.php');

if (!isAuthenticated())
{
    $location = 'https://' . BASE_URL . 'login.php';
    header("Location: $location");

    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $location = 'https://' . BASE_URL . 'index.php';
    header("Location: $location");

    exit();
}

$pageTitle = 'ワインの詳細｜Anyway-Grapes（飲食店様用）';

include_once('../includes/header.html');

echo '
    <div id="loadingPane" style="text-align:center;">
        <img src="./loading.gif" style="width:150px;" />
    </div>
    <div id="detailPane" style="margin: 0 auto 0 auto">
    </div>
    <div id="commentPane"    style="margin: 35px auto 35px auto;"></div>
    <div id="producerPane"   style="margin: 35px auto 35px auto;"></div>
    <div id="navigationPane" style="text-align:center;">
    </div>
';

include_once('../includes/footer.html');

mysqli_close($dbc);

?>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="../scripts/seiya.country-0.1.js"></script> 
<script type="text/javascript" src="../scripts/seiya.functions-0.1.js"></script> 
<script type="text/javascript" src="../scripts/string.js"></script> 
<script type="text/javascript" src="../scripts/urlquery.js"></script> 
<script type="text/javascript" src="../scripts/htmltag.js"></script> 
<script type="text/javascript" src="../scripts/seiya.wine.functions-0.1.js"></script> 
<script type="text/javascript" src="../scripts/seiya.producers-0.1.js"></script> 
<script type="text/javascript">

var WineDetailPage =
{
    _generateDetailInnerTableHtml: function(objWine)
    {
        var innerTable     = new TableTag(),
            emptyRow       = new TableRow(),
            codeRow        = new TableRow(),
            producerRow    = new TableRow(),
            typeRow        = new TableRow(),
            countryRow     = new TableRow(),
            regionRow      = new TableRow(),
            vintageRow     = new TableRow(),
            cepageRow      = new TableRow(),
            cultivationRow = new TableRow(),
            ratingRow      = new TableRow(),
            importerRow    = new TableRow(),

            emptyCol            = new TableColumn('&nbsp;'),
            codeLabelCol        = new TableColumn('商品コード:'),
            codeValueCol        = new TableColumn(objWine.barcode_number),
            producerLabelCol    = new TableColumn('生産者:'),
            producerValueCol    = new TableColumn('{0} ({1})'.format(objWine.producer_jpn, objWine.producer)),
            typeLabelCol        = new TableColumn('種類:'),
            typeValueCol        = new TableColumn(wineTypeHash[objWine.type]),
            countryLabelCol     = new TableColumn('生産国:'),
            countryValueCol     = new TableColumn(countryHash[objWine.country]),
            regionLabelCol      = new TableColumn('地域:'),
            regionValueCol      = new TableColumn('{0} ({1})'.format(objWine.region_jpn, objWine.region)),
            vintageLabelCol     = new TableColumn('生産年:'),
            vintageValueCol     = new TableColumn(objWine.vintage),
            cepageLabelCol      = new TableColumn('品種:'), 
            cepageValueCol      = new TableColumn(objWine.cepage),
            cultivationLabelCol = new TableColumn('栽培方法:'),
            cultivationValueCol = new TableColumn(objWine.cultivation_method),
            ratingLabelCol      = new TableColumn('評価:'),
            ratingValueCol      = new TableColumn(getRatingsHtml(objWine)),
            importerLabelCol    = new TableColumn('輸入元:'),
            importerValueCol    = new TableColumn(getImporterName(objWine));

        emptyCol.addAttr('colspan', '2');
        codeLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        codeValueCol.addAttr('style', 'padding-bottom:5px;');
        producerLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        producerValueCol.addAttr('style', 'padding-bottom:5px;');
        producerValueCol.addClass('producerCol');
        typeLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        typeValueCol.addAttr('style', 'padding-bottom:5px;');
        countryLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        countryValueCol.addAttr('style', 'padding-bottom:5px;');
        regionLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        regionValueCol.addAttr('style', 'padding-bottom:5px;');
        vintageLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        vintageValueCol.addAttr('style', 'padding-bottom:5px;');
        cepageLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        cepageValueCol.addAttr('style', 'padding-bottom:5px;');
        cultivationLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        cultivationValueCol.addAttr('style', 'padding-bottom:5px;');
        ratingLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        ratingValueCol.addAttr('style', 'padding-bottom:5px;');
        importerLabelCol.addAttr('style', 'width:90px;white-space:nowrap;font-weight:bold;');
        importerValueCol.addAttr('style', 'padding-bottom:5px;');

        emptyRow.addColumn(emptyCol);
        codeRow.addColumn(codeLabelCol);
        codeRow.addColumn(codeValueCol);
        producerRow.addColumn(producerLabelCol);
        producerRow.addColumn(producerValueCol);
        typeRow.addColumn(typeLabelCol);
        typeRow.addColumn(typeValueCol);
        countryRow.addColumn(countryLabelCol);
        countryRow.addColumn(countryValueCol);
        regionRow.addColumn(regionLabelCol);
        regionRow.addColumn(regionValueCol);
        vintageRow.addColumn(vintageLabelCol);
        vintageRow.addColumn(vintageValueCol);
        cepageRow.addColumn(cepageLabelCol);
        cepageRow.addColumn(cepageValueCol);
        cultivationRow.addColumn(cultivationLabelCol);
        cultivationRow.addColumn(cultivationValueCol);
        ratingRow.addColumn(ratingLabelCol);
        ratingRow.addColumn(ratingValueCol);
        importerRow.addColumn(importerLabelCol);
        importerRow.addColumn(importerValueCol);

        innerTable.body.addRow(emptyRow);
        innerTable.body.addRow(codeRow);
        innerTable.body.addRow(producerRow);
        innerTable.body.addRow(typeRow);
        innerTable.body.addRow(countryRow);
        innerTable.body.addRow(regionRow);
        innerTable.body.addRow(vintageRow);
        innerTable.body.addRow(cepageRow);
        innerTable.body.addRow(cultivationRow);
        innerTable.body.addRow(ratingRow);
        innerTable.body.addRow(importerRow);

        return innerTable.toHtml();
    },

    _generateDetailTableHtml: function(objWine)
    {
        var imgUrl     = '//anyway-grapes.jp/images/wines/200px/{0}.png'.format(objWine.barcode_number),
            noImgUrl   = '//anyway-grapes.jp/images/wines/200px/no_wine_photo.png',
            imgTag     = new ImageTag(imgUrl),
            nameHtml   =
                '<p style="line-height:100%;">' +
                    '<span style="font-size:18px;">{0}</span>'.format(objWine.combined_name)     + '<br />' +
                    '<span style="font-size:12px;">{0}</span>'.format(objWine.combined_name_jpn) +
                '</p>';

        imgTag.addAttr('style', 'border: 1px solid rgb(224, 224, 224);');
        imgTag.addAttr('onerror', 'this.src=\'' + noImgUrl + '\';');

        var nameRow = new TableRow(),
            imgRow  = new TableRow(),
            nameCol = new TableColumn(nameHtml),
            imgCol  = new TableColumn(imgTag.toHtml());

        nameCol.addAttr('colspan', '2');
        nameCol.addAttr('style', 'font-size:14px;border:none;');
        nameRow.addAttr('style', 'text-align:left;background-color:transparent;');
        nameRow.addColumn(nameCol);

        imgCol.addAttr('style', 'padding-right:15px;');
        imgRow.addColumn(imgCol);
        imgRow.addColumn(new TableColumn(WineDetailPage._generateDetailInnerTableHtml(objWine)));

        var outerTable = new TableTag();
        outerTable.head.addRow(nameRow);
        outerTable.body.addRow(imgRow);

        var isComingSoon = false;
        console.dir(objWine);
        if (objWine.etc && (objWine.etc.length > 0))
        {
             var rgstrToken  = objWine.etc.split('.');
             if (rgstrToken.length == 2)
             {
                 isComingSoon = (!Number.isNaN(Number(rgstrToken[0])) && !Number.isNaN(Number(rgstrToken[1])));
             }
        }

        var addToCartHtml =
            '<input type="submit" id="addToCartButton" style="cursor:pointer;height:50px;color:white;background-color:darkred;display:inline;padding:8px 30px 8px 30px;border:1px solid rgb(246,246,246);" value="カートに入れる" />',
                
            priceAndQuantityHtml = 
                '{0} yen (税抜)'.format(formatNumber(objWine.price)) +
                '<input style="margin-left:20px;" type="number" id="quantityFld" min="1" max="{0}" value="1" name="quantity" />&nbsp;本'.format(objWine.stock);

        if (isComingSoon)
        {
            addToCartHtml = '<span style="color:red">Coming soon...</span>';
        }

        var priceRow = new TableRow(),
            priceCol = new TableColumn(priceAndQuantityHtml),
            cartCol  = new TableColumn(addToCartHtml);

        priceRow.addAttr('style', 'background-color:transparent;');
        priceCol.addAttr('style', 'border:none;font-size:14px;padding-top:15px;');
        cartCol.addAttr('style', 'text-align:left;padding-top:15px;font-size:14px;border:none;');

        outerTable.foot.addRow(priceRow);

        var formHtml =
            '<form method="POST" action="./cart.php?action=add">' +
                '<input type="hidden" name="barcode" value="{0}" />'.format(objWine.barcode_number) +
                 outerTable.toHtml() +
            '</form>';

        return formHtml;
    },

    _generateBackButtonHtml: function()
    {
        var imgTag = new ImageTag('//anyway-grapes.jp/images/buttons/back.gif');
        imgTag.addAttr('id', 'backBtnImg');
        imgTag.addAttr('style', 'width:120px;');

        return imgTag.toHtml();
    },

    render: function()
    {
        var urlQuery = new UrlQuery(),
            strId    = urlQuery.getValue('id');

        $.ajax(
        {
            url:  './api/get_business_customer_wines.php',
            type: 'GET',
            data:
            {
                id: strId
            },

            dataType: 'json',
            success: function(rgobjWine)
            {
                $('div#loadingPane').hide();

                if (rgobjWine && rgobjWine.length == 1)
                {
                    $('div#detailPane').html(WineDetailPage._generateDetailTableHtml(rgobjWine[0]));

                    var escapedProducer = rgobjWine[0].producer.replace(/\&amp;/g, '&'); 
                    escapedProducer = escapedProducer.replace(/'/g, "\\'");

                    $.ajax(
                    {
                        url: '//anyway-grapes.jp/laravel5.3/public/api/v1/producer-details/{0}'.format(escapedProducer),
                        dataType: 'json',
                        success: function(data)
                        {
                            var rgobjDetail = data.details;
                            if (rgobjDetail.length == 1)
                            {
                                var html               = '',
                                    objDetail          = rgobjDetail[0],
                                    historyAndDetail   = objDetail.history_detail,
                                    fieldDetail        = objDetail.field_detail,
                                    fermentationDetail = objDetail.fermentation_detail,
                                    originalContents   = objDetail.original_contents;

                                if (historyAndDetail)
                                {
                                    html += '<h3>詳細・歴史</h3><br />' + historyAndDetail.nl2br() + '<br />';
                                }

                                if (fieldDetail)
                                {
                                    html += '<br /><br /><h3>畑</h3><br />' + fieldDetail.nl2br() + '<br />';
                                }

                                if (fermentationDetail)
                                {
                                    html += '<br /><br /><h3>醸造</h3><br />' + fermentationDetail.nl2br();
                                }

                                $('div#producerPane').html(html);
                            }
                        }
                    });

                    $.ajax(
                    {
                        url: '//anyway-grapes.jp/laravel5.3/public/api/v1/wine-details/{0}'.format(escapedProducer),
                        dataType: 'json',
                        success: function(data)
                        {
                            var itemHtml    = '',
                                rgobjDetail = data.details,
                                cItem       = rgobjDetail.length,
                                objDetail   = null,
                                fItemFound  = false;

                            for (var i = 0; (!fItemFound && (i < cItem)); ++i)
                            {
                                objDetail = rgobjDetail[i];

                                if (objDetail.barcode_number == urlQuery.getValue('id'))
                                {
                                    itemHtml = (objDetail.detail ? objDetail.detail.nl2br() : '');
                                    fItemFound = true;
                                }
                            }

                            if (itemHtml != 'null')
                            {
                                $('div#commentPane').html(itemHtml);
                            }
                        },

                        error: function() {}
                    });
                }

                $('div#navigationPane').html(WineDetailPage._generateBackButtonHtml());
            },

            error: function() {}
        });
    }
};

$(document).ready(function()
{
    $('div.contents').width(900);

    WineDetailPage.render();
    $('div#navigationPane').on('click', 'img#backBtnImg', function()
    {
        window.top.close();
    });
});

</script>
