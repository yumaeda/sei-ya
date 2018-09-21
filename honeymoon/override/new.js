// Override NewItemPage.strSite.
NewItemPage.strSite = 'honeymoon';

// Override NewItemPage.fnGenerateFormHtml.
NewItemPage.fnGenerateFormHtml['honeymoon_tasting_info'] = function($div)
{
    NewItemPage.$categorySelect = $(generateYearSelectHtml(Strings.getString('EVENT_YEAR_STR'), 2014));

    NewItemPage.tryLoadItem();
    $div.html(generateEventFormHtml());
};

