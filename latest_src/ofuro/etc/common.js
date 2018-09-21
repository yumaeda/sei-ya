//-------------------------------------------------------
// Variables
//-------------------------------------------- YuMaeda --
var rgobjOfuroDishCategory =
    [
        { resId: 'COLD_APPETIZER_STR', value: 1 },
        { resId: 'HOT_APPETIZER_STR',  value: 2 },
        { resId: 'FISH_DISH_STR',      value: 3 },
        { resId: 'MEAT_DISH_STR',      value: 4 },
        { resId: 'SMALL_DISH_STR',     value: 5 },
        { resId: 'GOHAN_STR',          value: 6 },
        { resId: 'PASTA_STR',          value: 7 },
        { resId: 'CHEESE_STR',         value: 8 },
        { resId: 'DESSERT_STR',        value: 9 }
    ];

var rgobjSakeCategory =
    [
        { resId: 'JUNMAI_STR',                   value: 1 },
        { resId: 'TOKUBETSU_JUNMAI_STR',         value: 2 },
        { resId: 'SHIROKOJIJIKOMI_JUNMAI_STR',   value: 3 },
        { resId: 'JUNMAISYUJIKOMI_KIJYOSHU_STR', value: 4 },
        { resId: 'JUNMAIGINJYO_STR',             value: 5 },
        { resId: 'SANPAIJUNMAI_STR',             value: 6 },
        { resId: 'JUNMAI_DAIGINJYO_STR',         value: 7 },
        { resId: 'DAIGINJYO_STR',                value: 8 },
        { resId: 'SANPAIJUNMAI_GINJYO_STR',      value: 9 },
        { resId: 'MIZUMOTO_JUNMAI_STR',          value: 10 },
        { resId: 'KIMOTOJUNMAI_DAIGINJYO_STR',   value: 11 },
        { resId: 'TOKUBETSU_HON_JYOUZOU_STR',    value: 12 },
        { resId: 'HON_JYOUZOU_STR',              value: 13 },
        { resId: 'GINJYO_STR',                   value: 14 }
    ],

    rgobjShochuCategory =
    [
        { resId: 'AWAMORI_STR',        value: 1 },
        { resId: 'KOKUTOU_JOUCHU_STR', value: 2 },
        { resId: 'KOME_JOUCHU_STR',    value: 3 },
        { resId: 'MUGI_JOUCHU_STR',    value: 4 },
        { resId: 'IMO_JOUCHU_STR',     value: 5 },
        { resId: 'KURI_JOUCHU_STR',    value: 6 }
    ],

    rgobjOfuroPhotoCategory =
    [
        { resId: 'SHOP_PHOTO_STR',     value: 7 },
        { resId: 'DISH_PHOTO_STR',     value: 8 },
        { resId: 'MAGAZINE_PHOTO_STR', value: 9 }
    ];


//-------------------------------------------------------
// Functions
//-------------------------------------------- YuMaeda --

var getObjDish = function(intValue)
    {
        return _getCategory(rgobjOfuroDishCategory, intValue);
    },

    getObjSake = function(intValue)
    {
        return(_getCategory(rgobjSakeCategory, intValue));
    },

    getObjShochu = function(intValue)
    {
        return(_getCategory(rgobjShochuCategory, intValue));
    },

    generateSakeCategorySelectHtml = function()
    {
        return(_generateCategorySelectHtml(rgobjSakeCategory, 'sakeCategorySelect', Strings.getString('SAKE_TYPE_STR')));
    },

    generateShochuCategorySelectHtml = function()
    {
        return(_generateCategorySelectHtml(rgobjShochuCategory, 'shochuCategorySelect', Strings.getString('SHOCHU_TYPE_STR')));
    },

    generatePhotoCategorySelectHtml = function(intSite)
    {
        return _generateCategorySelectHtml(
            rgobjOfuroPhotoCategory,
            'photoCategorySelect',
            Strings.getString('PHOTO_TYPE_STR'));
    };

