//-------------------------------------------------------
// Variables
//-------------------------------------------- YuMaeda --

var rgobjMitsugetsuDishCategory =
    [
        { resId: 'COLD_APPETIZER_STR', value: 1 },
        { resId: 'HOT_APPETIZER_STR',  value: 2 },
        { resId: 'PASTA_STR',          value: 3 },
        { resId: 'FISH_DISH_STR',      value: 4 },
        { resId: 'MEAT_DISH_STR',      value: 5 },
        { resId: 'GIBIER_STR',         value: 6 },
        { resId: 'GOHAN_STR',          value: 7 },
        { resId: 'CHEESE_STR',         value: 8 },
        { resId: 'DESSERT_STR',        value: 9 },
        { resId: 'MITSU_COURSE_STR',   value: 10 },
        { resId: 'GETSU_COURSE_STR',   value: 11 },
        { resId: 'DRY_FRUIT_STR',      value: 12 }
    ],

    rgobjALaCarteCategory =
    [
        rgobjMitsugetsuDishCategory[0],
        rgobjMitsugetsuDishCategory[1],
        rgobjMitsugetsuDishCategory[2],
        rgobjMitsugetsuDishCategory[3],
        rgobjMitsugetsuDishCategory[4],
        rgobjMitsugetsuDishCategory[5],
        rgobjMitsugetsuDishCategory[6],
        rgobjMitsugetsuDishCategory[8],
        rgobjMitsugetsuDishCategory[7],
        rgobjMitsugetsuDishCategory[11]
    ],

    rgobjMitsugetsuDrinkCategory =
    [
        rgobjDrinkCategory[0],
        rgobjDrinkCategory[1],
        rgobjDrinkCategory[2],
        rgobjDrinkCategory[4],
        rgobjDrinkCategory[6],
        rgobjDrinkCategory[12],
        rgobjDrinkCategory[13]
    ],

    rgobjMitsugetsuPhotoCategory =
    [
        { resId: 'SHOP_PHOTO_STR',     value: 2 },
        { resId: 'DISH_PHOTO_STR',     value: 3 },
        { resId: 'MAGAZINE_PHOTO_STR', value: 4 }
    ];


//-------------------------------------------------------
// Functions
//-------------------------------------------- YuMaeda --

var getObjDish = function(intValue)
    {
        return _getCategory(rgobjMitsugetsuDishCategory, intValue);
    },

    generatePhotoCategorySelectHtml = function(intSite)
    {
        return _generateCategorySelectHtml(
            rgobjMitsugetsuPhotoCategory,
            'photoCategorySelect',
            Strings.getString('PHOTO_TYPE_STR'));
    };

