var urlQuery = new UrlQuery();

var NewItemPage =
{
    dbTable: urlQuery.getValue('dbTable'),
    objItem: null,

    $categorySelect: null,
    $regionSelect: null,
    $manipulantSelect: null,

    strSite: '',

    fnGenerateFormHtml: {},

    onReady: function()
    {
        loadResourceStrings('{0}/{1}/resources'.format(getRootFolderUrl(), NewItemPage.strSite));
        document.title = Strings.getString('NEW_ITEM_STR');

        var $div = $('div');
        if (NewItemPage.fnGenerateFormHtml[NewItemPage.dbTable])
        {
            NewItemPage.fnGenerateFormHtml[NewItemPage.dbTable]($div);
        }

        if (NewItemPage.$categorySelect)
        {
            $div.find('form').prepend(NewItemPage.$categorySelect);
            NewItemPage.$categorySelect.change(NewItemPage.onCategorySelect);
            NewItemPage.$categorySelect.val(NewItemPage._getCategory());

            if (NewItemPage.$categorySelect.val() > 0)
            {
                NewItemPage.onCategorySelect();
            }
        }

        $div.find('#cancelBtn').click(NewItemPage.onCancelBtnClick);

        $('form').submit(NewItemPage.onSubmit);
    },

    onCategorySelect: function()
    {
        switch(NewItemPage.dbTable)
        {
        case 'anyway_wines':
            if (NewItemPage.$regionSelect)
            {
                NewItemPage.$regionSelect.remove();
            }

            NewItemPage.$regionSelect = $(generateRegionSelectHtmlByColor(NewItemPage.$categorySelect.val()));
            NewItemPage.$regionSelect.insertAfter(NewItemPage.$categorySelect);
            NewItemPage.$regionSelect.val(NewItemPage._getRegion());
            break;
        default:
            break;
        }
    },

    onCancelBtnClick: function()
    {
        window.close();
    },

    onSubmit: function(e)
    {
        var fValid = FormValidator.validate($('form'));
        if (!fValid)
        {
            e.preventDefault();
        }
    },

    tryLoadItem: function()
    {
        var intId = urlQuery.getValue('id');
        if (intId)
        {
            $.ajax(
            { 
                url: '{0}/{1}/get_items.php'.format(getRootFolderUrl(), NewItemPage.strSite),
                data: { id: intId, dbTable: NewItemPage.dbTable },
                async: false,
                cache: false,
                dataType: 'json', 
                success: function(data)
                { 
                    NewItemPage.objItem = data[0];
                }
            });
        }
    },

    _generateVintageInputHtml: function(intVintage, fMonoVintage)
    {
        var vintageFld, booleanFld,
            html = '';

        vintageFld = new NumberField('vintage', intVintage);
        vintageFld.addAttr('class', 'vintageFld');

        booleanFld = new BooleanField('mono_vintage', fMonoVintage);

        html +=
            vintageFld.toHtml() +
            booleanFld.toHtml() +
            '<label>' + Strings.getString('MONO_YEAR_STR') + '</label>';

        return(html);
    },

    _getCategory: function()
    {
        var intCategory = -1;

        if (NewItemPage.objItem)
        {
            if (NewItemPage.dbTable.endsWith('_wines'))
            {
                intCategory = NewItemPage.objItem.color;
            }
            else if (NewItemPage.dbTable.endsWith('_events'))
            {
                intCategory = NewItemPage.objItem.year;
            }
            else
            {
                intCategory = NewItemPage.objItem.category;
            }
        }
        else if (urlQuery.getValue('category'))
        {
            intCategory = urlQuery.getValue('category');
        }

        return intCategory;
    },

    _getRegion: function()
    {
        var intRegion = -1;

        if (NewItemPage.objItem)
        {
            if (NewItemPage.dbTable == 'anyway_wines')
            {
                intRegion = NewItemPage.objItem.general_region;
            }
            else
            {
                intRegion = NewItemPage.objItem.region;
            }
        }
        else if (urlQuery.getValue('region'))
        {
            intRegion = urlQuery.getValue('region');
        }

        return intRegion;
    },

    _getManipulant: function()
    {
        var intManipulant = -1;

        if (NewItemPage.objItem)
        {
            intManipulant = NewItemPage.objItem.manipulant;
        }

        return(intManipulant);
    },

    _generateHiddenInputFromUrlQuery: function(strKey)
    {
        var strValue = urlQuery.getValue(strKey);
        if (strValue)
        {
            return (new HiddenField(strKey, strValue).toHtml());
        }

        return '';
    },

    m_rgstrImgDirPath:
    {
        'mitsugetsu_photos': 'mitsu-getsu/images/',
        'ofuro_photos':      'ofuro/images/',
        'anyway_photos':     'anyway-grapes/images/'
    },

    _generateHiddenInputsHtml: function()
    {
        var html = '';

        html += NewItemPage._generateHiddenInputFromUrlQuery('id');
        html += NewItemPage._generateHiddenInputFromUrlQuery('dbTable');
        html += NewItemPage._generateHiddenInputFromUrlQuery('sort_order');

        var dir = NewItemPage.m_rgstrImgDirPath[NewItemPage.dbTable];
        if (dir)
        {
            var fileSizeFld = new HiddenField('MAX_FILE_SIZE', '400000');

            html += fileSizeFld.toHtml();

            if (NewItemPage.objItem)
            {
                var filenameFld =
                    new HiddenField('prevFileName', NewItemPage.objItem.filename);
                html += filenameFld.toHtml();
            }

            var dirFld = new HiddenField('dir', dir);
            html += dirFld.toHtml();
        }

        return html;
    }
};


function _generateWineFormHtml(objWine, siteName)
{
    var textFld, currencyFld, booleanFld,
        countryValue     = (objWine ? objWine.country      : ''),
        regionValue      = (objWine ? objWine.region       : ''),
        jpnRegionValue   = (objWine ? objWine.region_jpn   : ''),
        nameValue        = (objWine ? objWine.name         : ''),
        jpnNameValue     = (objWine ? objWine.name_jpn     : ''),
        producerValue    = (objWine ? objWine.producer     : ''),
        jpnProducerValue = (objWine ? objWine.producer_jpn : ''),
        vintageValue     = (objWine ? objWine.vintage      : ''),
        cepageValue      = (objWine ? objWine.cepage       : ''),
        priceValue       = (objWine ? objWine.price        : ''),
        commentValue     = (objWine ? objWine.comment      : ''),
        tableTag         = new TableTag();

    var iCountrySelected = countryValue ?
        (getCountryIntValue(countryValue) - 1) :
        0;

    if (!objWine)
    {
        textFld = new TextField('barcodeNumber', '');

        // Add barcode number row.
        var barcodeRow = new TableRow();
        barcodeRow.addColumn(new TableColumn('<label>Barcode Number:&nbsp;</label>'));
        barcodeRow.addColumn(new TableColumn(textFld.toHtml()));
        tableTag.body.addRow(barcodeRow);
    }

    // Add country row
    var countryRow = new TableRow();
    countryRow.addColumn(new TableColumn('<label>' + Strings.getString('COUNTRY_STR') + ':&nbsp;</label>'));
    countryRow.addColumn(new TableColumn(generateCountrySelectHtml('', 'country', false, iCountrySelected)));

    // Add region row 
    textFld = new TextField('region', regionValue);
    textFld.setRequired(true);
    var regionRow = new TableRow();
    regionRow.addColumn(new TableColumn('<label>' + Strings.getString('AOC_STR') + ':&nbsp;</label>'));
    regionRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add region_jpn row 
    textFld = new TextField('region_jpn', jpnRegionValue);
    textFld.setRequired(true);
    var jpnRegionRow = new TableRow();
    jpnRegionRow.addColumn(new TableColumn('<label>' + Strings.getString('LOC_AOC_STR') + ':&nbsp;</label>'));
    jpnRegionRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add name row 
    textFld = new TextField('name', nameValue);
    textFld.setRequired(true);
    var nameRow = new TableRow();
    nameRow.addColumn(new TableColumn('<label>' + Strings.getString('NAME_STR') + ':&nbsp;</label>'));
    nameRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add name_jpn row
    textFld = new TextField('name_jpn', jpnNameValue);
    textFld.setRequired(true);
    var jpnNameRow = new TableRow();
    jpnNameRow.addColumn(new TableColumn('<label>' + Strings.getString('LOC_NAME_STR') + ':&nbsp;</label>'));
    jpnNameRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add producer row
    textFld = new TextField('producer', producerValue);
    textFld.setRequired(true);
    var producerRow = new TableRow();
    producerRow.addColumn(new TableColumn('<label>' + Strings.getString('PRODUCER_STR') + ':&nbsp;</label>'));
    producerRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add producer_jpn row 
    textFld = new TextField('producer_jpn', jpnProducerValue);
    textFld.setRequired(true);
    var jpnProducerRow = new TableRow();
    jpnProducerRow.addColumn(new TableColumn('<label>' + Strings.getString('LOC_PRODUCER_STR') + ':&nbsp;</label>'));
    jpnProducerRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add vintage row
    textFld = new TextField('vintage', vintageValue);
    textFld.setRequired(true);
    var vintageRow = new TableRow();
    vintageRow.addColumn(new TableColumn('<label>' + Strings.getString('VINTAGE_STR') + ':&nbsp;</label>'));
    vintageRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add cepage row 
    textFld = new TextField('cepage', cepageValue);
    textFld.setRequired(true);
    var cepageRow = new TableRow();
    cepageRow.addColumn(new TableColumn('<label>' + Strings.getString('CEPAGE_STR') + ':&nbsp;</label>'));
    cepageRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add price row 
    currencyFld = new CurrencyField('price', priceValue);
    currencyFld.setRequired(true);
    var priceRow = new TableRow();
    priceRow.addColumn(new TableColumn('<label>' + Strings.getString('PRICE_STR') + ':&nbsp;</label>'));
    priceRow.addColumn(new TableColumn(currencyFld.toHtml()));

    // Add comment row 
    textFld = new TextField('comment', commentValue);
    var commentRow = new TableRow();
    commentRow.addColumn(new TableColumn('<label>' + Strings.getString('COMMENT_STR') + ':&nbsp;</label>'));
    commentRow.addColumn(new TableColumn(textFld.toHtml()));

    tableTag.body.addRow(countryRow);
    tableTag.body.addRow(regionRow);
    tableTag.body.addRow(jpnRegionRow);
    tableTag.body.addRow(nameRow);
    tableTag.body.addRow(jpnNameRow);
    tableTag.body.addRow(producerRow);
    tableTag.body.addRow(jpnProducerRow);
    tableTag.body.addRow(vintageRow);
    tableTag.body.addRow(cepageRow);
    tableTag.body.addRow(priceRow);
    tableTag.body.addRow(commentRow);

    var postUrl = '{0}/{1}/admin/edit_dbtable.php'.format(getRootFolderUrl(), siteName),
        html    =
            '<form action="{0}" method="POST">'.format(postUrl) +
                NewItemPage._generateHiddenInputsHtml() +
                tableTag.toHtml() +
                '<button type="submit">' + Strings.getString('SAVE_STR') + '</button>' +
                '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
            '</form>';

    return html;
}


function generateEventFormHtml()
{
    var monthFld, dateFld, multiTextFld,
        monthValue       = (NewItemPage.objItem ? NewItemPage.objItem.month : ''),
        dateValue        = (NewItemPage.objItem ? NewItemPage.objItem.date : ''),
        descriptionValue = (NewItemPage.objItem ? NewItemPage.objItem.description : ''),
        tableTag         = new TableTag(),
        eventDateRow     = new TableRow(),
        eventDescRow     = new TableRow();

    // Add month row 
    monthFld = new NumberField('month', monthValue);
    monthFld.setRequired(true);
    monthFld.setCssClass('dateFld');
    dateFld = new NumberField('date', dateValue);
    dateFld.setRequired(true);
    dateFld.setCssClass('dateFld');

    eventDateRow.addColumn(new TableColumn('<label>{0}:&nbsp;</label>'.format(Strings.getString('EVENT_DATE_STR'))));
    eventDateRow.addColumn(new TableColumn(monthFld.toHtml() + Strings.getString('MONTH_SYMBOL') + dateFld.toHtml()  + Strings.getString('DATE_SYMBOL')));

    // Add description row
    multiTextFld = new MultiTextField('description', descriptionValue);
    eventDescRow.addColumn(new TableColumn('<label>{0}:&nbsp;</label>'.format(Strings.getString('EVENT_DESCRIPTION'))));
    eventDescRow.addColumn(new TableColumn(multiTextFld.toHtml()));

    tableTag.body.addRow(eventDateRow);
    tableTag.body.addRow(eventDescRow);

    var html =
        '<form action="edit_dbtable.php" method="POST">' +
            NewItemPage._generateHiddenInputsHtml() +
            tableTag.toHtml() +
            '<button type="submit">' + Strings.getString('SAVE_STR') + '</button>' +
            '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
        '</form>';

    return html;
}

// Functions
function generateDishFormHtml()
{
    var textFld, currencyFld, booleanFld,
        nameValue      = (NewItemPage.objItem ? NewItemPage.objItem.name : ''),
        priceValue     = (NewItemPage.objItem ? NewItemPage.objItem.price : ''),
        marketPrice    = (NewItemPage.objItem ? NewItemPage.objItem.market_price : 0),
        tableTag       = new TableTag(),
        nameRow        = new TableRow(),
        priceRow       = new TableRow(),
        marketPriceRow = new TableRow();

    textFld = new TextField('name', nameValue);
    nameRow.addColumn(new TableColumn('<label>' + Strings.getString('NAME_STR') + ':&nbsp;</label>'));
    nameRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add price row.
    currencyFld = new CurrencyField('price', priceValue);
    priceRow.addColumn(new TableColumn('<label>' + Strings.getString('PRICE_STR') + ':&nbsp;</label>'));
    priceRow.addColumn(new TableColumn(currencyFld.toHtml()));

    // Add market price row.
    booleanFld = new BooleanField('market_price', marketPrice);
    marketPriceRow.addColumn(new TableColumn('<label>' + Strings.getString('MARKET_VALUE_STR') + ':&nbsp;</label>'));
    marketPriceRow.addColumn(new TableColumn(booleanFld.toHtml()));

    tableTag.body.addRow(nameRow);
    tableTag.body.addRow(priceRow);
    tableTag.body.addRow(marketPriceRow);

    var html =
        '<form action="edit_dbtable.php" method="POST">' +
            NewItemPage._generateHiddenInputsHtml() +
            tableTag.toHtml() +
            '<button type="submit">' + Strings.getString('SAVE_STR') + '</button>' +
            '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
        '</form>';

    return html;
}

function generateDrinkFormHtml()
{
    var textFld, currencyFld, booleanFld, multiTextFld,
        nameValue      = (NewItemPage.objItem ? NewItemPage.objItem.name : ''),
        locNameValue   = (NewItemPage.objItem ? NewItemPage.objItem.loc_name : ''),
        priceValue     = (NewItemPage.objItem ? NewItemPage.objItem.price : ''),
        marketPrice    = (NewItemPage.objItem ? NewItemPage.objItem.market_price : 0),
        tableTag       = new TableTag(),
        nameRow        = new TableRow(),
        jpnNameRow     = new TableRow(),
        priceRow       = new TableRow(),
        marketPriceRow = new TableRow();

    if (NewItemPage._getCategory() > 1)
    {
        // Add name row 
        textFld = new TextField('name', nameValue);
        nameRow.addColumn(new TableColumn('<label>' + Strings.getString('NAME_STR') + ':&nbsp;</label>'));
        nameRow.addColumn(new TableColumn(textFld.toHtml()));
    }

    if (NewItemPage._getCategory() < 10)
    {
        // Add loc name row.
        textFld = new TextField('loc_name', locNameValue);
        jpnNameRow.addColumn(new TableColumn('<label>' + Strings.getString('LOC_NAME_STR') + ':&nbsp;</label>'));
        jpnNameRow.addColumn(new TableColumn(textFld.toHtml()));
    }

    // Add price row 
    currencyFld = new CurrencyField('price', priceValue);
    currencyFld.setRequired(true);
    priceRow.addColumn(new TableColumn('<label>' + Strings.getString('PRICE_STR') + ':&nbsp;</label>'));
    priceRow.addColumn(new TableColumn(currencyFld.toHtml()));

    // Add market price row.
    booleanFld = new BooleanField('market_price', marketPrice);
    marketPriceRow.addColumn(new TableColumn('<label>' + Strings.getString('MARKET_VALUE_STR') + ':&nbsp;</label>'));
    marketPriceRow.addColumn(new TableColumn(booleanFld.toHtml()));

    tableTag.body.addRow(nameRow);
    tableTag.body.addRow(jpnNameRow);
    tableTag.body.addRow(priceRow);
    tableTag.body.addRow(marketPriceRow);

    var html =
        '<form action="edit_dbtable.php" method="POST">' +
            NewItemPage._generateHiddenInputsHtml() +
            tableTag.toHtml() +
            '<button type="submit">' + Strings.getString('SAVE_STR') + '</button>' +
            '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
        '</form>';

    return html;
}

function generateEventFormHtml()
{
    var monthFld, dateFld, multiTextFld,
        monthValue       = (NewItemPage.objItem ? NewItemPage.objItem.month : ''),
        dateValue        = (NewItemPage.objItem ? NewItemPage.objItem.date : ''),
        descriptionValue = (NewItemPage.objItem ? NewItemPage.objItem.description : ''),
        tableTag         = new TableTag(),
        eventDateRow     = new TableRow(),
        eventDescRow     = new TableRow();

    // Add month row 
    monthFld = new NumberField('month', monthValue);
    monthFld.setRequired(true);
    monthFld.setCssClass('dateFld');
    dateFld = new NumberField('date', dateValue);
    dateFld.setRequired(true);
    dateFld.setCssClass('dateFld');
    eventDateRow.addColumn(new TableColumn('<label>{0}:&nbsp;</label>'.format(Strings.getString('EVENT_DATE_STR'))));
    eventDateRow.addColumn(new TableColumn(monthFld.toHtml() + Strings.getString('MONTH_SYMBOL') + dateFld.toHtml()  + Strings.getString('DATE_SYMBOL')));

    // Add description row
    multiTextFld = new MultiTextField('description', descriptionValue);
    eventDescRow.addColumn(new TableColumn('<label>{0}:&nbsp;</label>'.format(Strings.getString('EVENT_DESCRIPTION'))));
    eventDescRow.addColumn(new TableColumn(multiTextFld.toHtml()));

    tableTag.body.addRow(eventDateRow);
    tableTag.body.addRow(eventDescRow);

    var html =
        '<form action="edit_dbtable.php" method="POST">' +
            NewItemPage._generateHiddenInputsHtml() +
            tableTag.toHtml() +
            '<button type="submit">' + Strings.getString('SAVE_STR') + '</button>' +
            '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
        '</form>';

    return html;
}

function generatePhotoFormHtml()
{
    var multiTextFld,
        commentValue = (NewItemPage.objItem ? NewItemPage.objItem.comment : ''),
        tableTag     = new TableTag(),
        fileNameRow  = new TableRow();

    var fileNameValue =
        (NewItemPage.objItem ? NewItemPage.objItem.filename : '');

    // Add fileName row 
    fileNameRow.addColumn(new TableColumn('<label>' + Strings.getString('FILENAME_STR') + ':&nbsp;</label>'));
    if (!NewItemPage.objItem)
    {
        var fileFld = new FileField('uploadedFile');
        fileNameRow.addColumn(new TableColumn(fileFld.toHtml()));
    }
    else
    {
        var textFld = new TextField('filename', fileNameValue);
        textFld.setRequired(true);
        fileNameRow.addColumn(new TableColumn(textFld.toHtml()));
    }

    tableTag.body.addRow(fileNameRow);

    // Add comment row
    multiTextFld = new MultiTextField('comment', commentValue);
    var commentRow = new TableRow();
    commentRow.addColumn(new TableColumn('<label>' + Strings.getString('COMMENT_STR') + ':&nbsp;</label>'));
    commentRow.addColumn(new TableColumn(multiTextFld.toHtml()));

    var html =
        '<form enctype="multipart/form-data" action="../edit_dbtable.php" method="POST">' +
            NewItemPage._generateHiddenInputsHtml() +
            tableTag.toHtml() +
            '<button type="submit">' + Strings.getString('UPLOAD_IMG_STR') + '</button>' +
            '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
        '</form>';

    return html;
}

$(document).ready(NewItemPage.onReady);

