// Override NewItemPage.strSite.
NewItemPage.strSite = 'mitsu-getsu';


// Override NewItemPage.fnGenerateFormHtml.
NewItemPage.fnGenerateFormHtml['mitsugetsu_dishes'] = function($div)
{
    NewItemPage.$categorySelect =
        $(_generateCategorySelectHtml(
                rgobjMitsugetsuDishCategory,
                'dishCategorySelect',
                Strings.getString('DISH_TYPE_STR')));

    NewItemPage.tryLoadItem();
    $div.html(generateDishFormHtml());
};

NewItemPage.fnGenerateFormHtml['mitsugetsu_drinks'] = function($div)
{
    NewItemPage.$categorySelect = $(generateDrinkCategorySelectHtml());

    NewItemPage.tryLoadItem();
    $div.html(generateDrinkFormHtml());
};

NewItemPage.fnGenerateFormHtml['mitsugetsu_events'] = function($div)
{
    NewItemPage.$categorySelect = $(generateYearSelectHtml(Strings.getString('EVENT_YEAR_STR'), 1994));

    NewItemPage.tryLoadItem();
    $div.html(generateEventFormHtml());
};

