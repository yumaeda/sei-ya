function generateSakeFormHtml()
{
    var textFld, currencyFld,
        vintageValue        = (NewItemPage.objItem ? NewItemPage.objItem.vintage : ''),
        bottlingMethodValue = (NewItemPage.objItem ? NewItemPage.objItem.bottling_method : ''),
        ingredientValue     = (NewItemPage.objItem ? NewItemPage.objItem.ingredient : ''),
        nameValue           = (NewItemPage.objItem ? NewItemPage.objItem.name : ''),
        romajiNameValue     = (NewItemPage.objItem ? NewItemPage.objItem.romaji_name : ''),
        hiraganaNameValue   = (NewItemPage.objItem ? NewItemPage.objItem.hiragana_name : ''),
        producerValue       = (NewItemPage.objItem ? NewItemPage.objItem.producer: ''),
        glassPriceValue     = (NewItemPage.objItem ? NewItemPage.objItem.glass_price: ''),
        tokkuriPriceValue   = (NewItemPage.objItem ? NewItemPage.objItem.tokkuri_price: ''),
        tableTag            = new TableTag(),

        vintageRow      = new TableRow(),
        bottlingRow     = new TableRow(),
        ingredientRow   = new TableRow(),
        nameRow         = new TableRow(),
        jpnNameRow      = new TableRow(),
        hiraganaRow     = new TableRow(),
        producerRow     = new TableRow(),
        glassPriceRow   = new TableRow(),
        tokkuriPriceRow = new TableRow();

    // Add vintage row 
    tableTag.addRow(null);
    var vintageFld = new NumberField('vintage', vintageValue);
    vintageFld.addAttr('class', 'vintageFld');
    vintageRow.addColumn(new TableColumn('<label>' + Strings.getString('VINTAGE_STR') + ':&nbsp;</label>'));
    vintageRow.addColumn(new TableColumn(vintageFld.toHtml()));

    // Add sub category row 
    textFld = new TextField('bottling_method', bottlingMethodValue);
    textFld.setRequired(false);
    bottlingRow.addColumn(new TableColumn('<label>' + Strings.getString('BOTTLING_METHOD_STR') + ':&nbsp;</label>'));
    bottlingRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add ingredient row 
    textFld = new TextField('ingredient', ingredientValue);
    textFld.setRequired(true);
    ingredientRow.addColumn(new TableColumn('<label>' + Strings.getString('INGREDIENT_STR') + ':&nbsp;</label>'));
    ingredientRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add name row 
    textFld = new TextField('name', nameValue);
    textFld.setRequired(true);
    nameRow.addColumn(new TableColumn('<label>' + Strings.getString('NAME_STR') + ':&nbsp;</label>'));
    nameRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add romaji name row 
    textFld = new TextField('romaji_name', romajiNameValue);
    textFld.setRequired(true);
    jpnNameRow.addColumn(new TableColumn('<label>' + Strings.getString('ROMAJI_NAME_STR') + ':&nbsp;</label>'));
    jpnNameRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add hiragana name row 
    textFld = new TextField('hiragana_name', hiraganaNameValue);
    textFld.setRequired(true);
    hiraganaRow.addColumn(new TableColumn('<label>' + Strings.getString('HIRAGANA_NAME_STR') + ':&nbsp;</label>'));
    hiraganaRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add producer row
    textFld = new TextField('producer', producerValue);
    textFld.setRequired(true);
    producerRow.addColumn(new TableColumn('<label>' + Strings.getString('PRODUCER_STR') + ':&nbsp;</label>'));
    producerRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add price row 
    currencyFld = new CurrencyField('glass_price', glassPriceValue);
    currencyFld.setRequired(true);
    glassPriceRow.addColumn(new TableColumn('<label>' + Strings.getString('GLASS_PRICE_STR') + ':&nbsp;</label>'));
    glassPriceRow.addColumn(new TableColumn(currencyFld.toHtml()));

    // tokkuri price row
    currencyFld = new CurrencyField('tokkuri_price', tokkuriPriceValue);
    currencyFld.setRequired(true);
    tokkuriPriceRow.addColumn(new TableColumn('<label>' + Strings.getString('TOKKURI_PRICE_STR') + ':&nbsp;</label>'));
    tokkuriPriceRow.addColumn(new TableColumn(currencyFld.toHtml()));

    tableTag.body.addRow(vintageRow);
    tableTag.body.addRow(bottlingRow);
    tableTag.body.addRow(ingredientRow);
    tableTag.body.addRow(nameRow);
    tableTag.body.addRow(jpnNameRow);
    tableTag.body.addRow(hiraganaRow);
    tableTag.body.addRow(producerRow);
    tableTag.body.addRow(glassPriceRow);
    tableTag.body.addRow(tokkuriPriceRow);

    var html =
        '<form action="edit_dbtable.php" method="POST">' +
            NewItemPage._generateHiddenInputsHtml() +
            tableTag.toHtml() +
            '<button type="submit">' + Strings.getString('SAVE_STR') + '</button>' +
            '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
        '</form>';

    return(html);
}

function generateShochuFormHtml()
{
    var textFld, currencyFld, numberFld,
        vintageValue      = (NewItemPage.objItem ? NewItemPage.objItem.vintage : ''),
        ingredientValue   = (NewItemPage.objItem ? NewItemPage.objItem.ingredient : ''),
        nameValue         = (NewItemPage.objItem ? NewItemPage.objItem.name : ''),
        romajiNameValue   = (NewItemPage.objItem ? NewItemPage.objItem.romaji_name : ''),
        hiraganaNameValue = (NewItemPage.objItem ? NewItemPage.objItem.hiragana_name : ''),
        alcoholValue      = (NewItemPage.objItem ? NewItemPage.objItem.alcohol : ''),
        producerValue     = (NewItemPage.objItem ? NewItemPage.objItem.producer: ''),
        volumeValue       = (NewItemPage.objItem ? NewItemPage.objItem.volume: ''),
        priceValue        = (NewItemPage.objItem ? NewItemPage.objItem.price : ''),
        tableTag          = new TableTag(),

        vintageRow    = new TableRow(),
        ingredientRow = new TableRow(),
        nameRow       = new TableRow(),
        jpnNameRow    = new TableRow(),
        hiraganaRow   = new TableRow(),
        alcoholRow    = new TableRow(),
        producerRow   = new TableRow(),
        volumeRow     = new TableRow(),
        priceRow      = new TableRow();

    // Add vintage row 
    var vintageFld = new NumberField('vintage', vintageValue);
    vintageFld.addAttr('class', 'vintageFld');
    vintageRow.addColumn(new TableColumn('<label>' + Strings.getString('VINTAGE_STR') + ':&nbsp;</label>'));
    vintageRow.addColumn(new TableColumn(vintageFld.toHtml()));

    // Add ingredient row 
    textFld = new TextField('ingredient', ingredientValue);
    textFld.setRequired(true);
    ingredientRow.addColumn(new TableColumn('<label>' + Strings.getString('INGREDIENT_STR') + ':&nbsp;</label>'));
    ingredientRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add name row 
    textFld = new TextField('name', nameValue);
    textFld.setRequired(true);
    nameRow.addColumn(new TableColumn('<label>' + Strings.getString('NAME_STR') + ':&nbsp;</label>'));
    nameRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add romaji name row 
    textFld = new TextField('romaji_name', romajiNameValue);
    textFld.setRequired(true);
    jpnNameRow.addColumn(new TableColumn('<label>' + Strings.getString('ROMAJI_NAME_STR') + ':&nbsp;</label>'));
    jpnNameRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add hiragana name row 
    textFld = new TextField('hiragana_name', hiraganaNameValue);
    textFld.setRequired(true);
    hiraganaRow.addColumn(new TableColumn('<label>' + Strings.getString('HIRAGANA_NAME_STR') + ':&nbsp;</label>'));
    hiraganaRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add alcohol row 
    numberFld = new NumberField('alcohol', alcoholValue);
    numberFld.setRequired(true);
    alcoholRow.addColumn(new TableColumn('<label>' + Strings.getString('ALCOHOL_STR') + ':&nbsp;</label>'));
    alcoholRow.addColumn(new TableColumn(numberFld.toHtml() + ' %'));

    // Add producer row
    textFld = new TextField('producer', producerValue);
    textFld.setRequired(true);
    producerRow.addColumn(new TableColumn('<label>' + Strings.getString('PRODUCER_STR') + ':&nbsp;</label>'));
    producerRow.addColumn(new TableColumn(textFld.toHtml()));

    // Add volume row
    numberFld = new NumberField('volume', volumeValue);
    numberFld.setRequired(true);
    volumeRow.addColumn(new TableColumn('<label>' + Strings.getString('VOLUME_STR') + ':&nbsp;</label>'));
    volumeRow.addColumn(new TableColumn(numberFld.toHtml() + ' ml'));

    // Add price row 
    currencyFld = new CurrencyField('price', priceValue);
    currencyFld.setRequired(true);
    priceRow.addColumn(new TableColumn('<label>' + Strings.getString('PRICE_STR') + ':&nbsp;</label>'));
    priceRow.addColumn(new TableColumn(currencyFld.toHtml()));

    tableTag.body.addRow(vintageRow);
    tableTag.body.addRow(ingredientRow);
    tableTag.body.addRow(nameRow);
    tableTag.body.addRow(jpnNameRow);
    tableTag.body.addRow(hiraganaRow);
    tableTag.body.addRow(alcoholRow);
    tableTag.body.addRow(producerRow);
    tableTag.body.addRow(volumeRow);
    tableTag.body.addRow(priceRow);

    var html =
        '<form action="edit_dbtable.php" method="POST">' +
            NewItemPage._generateHiddenInputsHtml() +
            tableTag.toHtml() +
            '<button type="submit">' + Strings.getString('SAVE_STR') + '</button>' +
            '<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>' +
        '</form>';

    return html;
}


// Override NewItemPage.strSite.
NewItemPage.strSite = 'ofuro';


// Override NewItemPage.fnGenerateFormHtml.
NewItemPage.fnGenerateFormHtml['ofuro_dishes'] = function($div)
{
    NewItemPage.$categorySelect =
        $(_generateCategorySelectHtml(
            rgobjOfuroDishCategory,
            'dishCategorySelect',
            Strings.getString('DISH_TYPE_STR')));

    NewItemPage.tryLoadItem();
    $div.html(generateDishFormHtml());
};

NewItemPage.fnGenerateFormHtml['ofuro_drinks'] = function($div)
{
    NewItemPage.$categorySelect = $(generateDrinkCategorySelectHtml());

    NewItemPage.tryLoadItem();
    $div.html(generateDrinkFormHtml());
};

NewItemPage.fnGenerateFormHtml['ofuro_events'] = function($div)
{
    NewItemPage.$categorySelect = $(generateYearSelectHtml(Strings.getString('EVENT_YEAR_STR'), 1994));

    NewItemPage.tryLoadItem();
    $div.html(generateEventFormHtml());
};

NewItemPage.fnGenerateFormHtml['ofuro_sakes'] = function($div)
{
    NewItemPage.$categorySelect = $(generateSakeCategorySelectHtml());

    NewItemPage.tryLoadItem();
    $div.html(generateSakeFormHtml());
};

NewItemPage.fnGenerateFormHtml['ofuro_shochus'] = function($div)
{
    NewItemPage.$categorySelect = $(generateShochuCategorySelectHtml());

    NewItemPage.tryLoadItem();
    $div.html(generateShochuFormHtml());
};

