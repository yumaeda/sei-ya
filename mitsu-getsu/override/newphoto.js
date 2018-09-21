// Override NewItemPage.strSite.
NewItemPage.strSite = 'mitsu-getsu';


// Override NewItemPage.fnGenerateFormHtml.
NewItemPage.fnGenerateFormHtml['mitsugetsu_photos'] = function($div)
{
    var urlQuery = new UrlQuery();

    NewItemPage.$categorySelect = $(generatePhotoCategorySelectHtml(urlQuery.getValue('site')));

    NewItemPage.tryLoadItem();
    $div.html(generatePhotoFormHtml());
};

