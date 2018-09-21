// Override NewItemPage.strSite.
NewItemPage.strSite = 'ofuro';


// Override NewItemPage.fnGenerateFormHtml.
NewItemPage.fnGenerateFormHtml['ofuro_photos'] = function($div)
{
    var urlQuery = new UrlQuery();

    NewItemPage.$categorySelect = $(generatePhotoCategorySelectHtml(urlQuery.getValue('site')));

    NewItemPage.tryLoadItem();
    $div.html(generatePhotoFormHtml());
};

