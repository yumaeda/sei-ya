//-------------------------------------------------------
// Wine types & regions
//
// Required
//     seiya.constants.js
//-------------------------------------------- YuMaeda --

var rgobjSparklingWineRegion =
    [
        { resId: 'CHAMPAGNE_STR',	imgUrl: 'images/france.png',		value: 1 },
        { resId: 'CHAMPAGNE_ROSE_STR',	imgUrl: 'images/france.png',		value: 2 },
        { resId: 'CREMANT_STR',		imgUrl: 'images/france.png',		value: 3 },
        { resId: 'PETILLANT_STR',	imgUrl: '',				value: 4 },
        { resId: 'OTHER_SPARKLING_STR',	imgUrl: '',				value: 5 }
    ],

    rgobjChampagneRegion =
    [
    ],

    rgobjWhiteWineRegion =
    [
        { resId: 'CHAMPAGNE_STR',	imgUrl: 'images/france.png',		value: 1 },
        { resId: 'LORRAINE_STR',	imgUrl: 'images/france.png',		value: 6 },
        { resId: 'ALSACE_STR',		imgUrl: 'images/france.png',		value: 7 },
        { resId: 'LOIRE_STR',		imgUrl: 'images/france.png',		value: 8 },
        { resId: 'BORDEAUX_STR',	imgUrl: 'images/france.png',		value: 9 },
        { resId: 'SUDWEST_STR',  	imgUrl: 'images/france.png',		value: 10 },
        { resId: 'BOURGOGNE_STR',	imgUrl: 'images/france.png',		value: 11 },
        { resId: 'JURA_STR', 		imgUrl: 'images/france.png',		value: 12 },
        { resId: 'SAVOIE_FRANCHE_STR',	imgUrl: 'images/france.png',		value: 13 },
        { resId: 'RHONE_STR',		imgUrl: 'images/france.png',		value: 14 },
        { resId: 'LANG_ROUS_STR',	imgUrl: 'images/france.png',		value: 15 },
        { resId: 'PROVENCE_STR',	imgUrl: 'images/france.png',		value: 16 },
        { resId: 'CORSE_STR',		imgUrl: 'images/france.png',		value: 17 },
        { resId: 'GERMANY_STR',		imgUrl: 'images/germany.png',		value: 18 },
        { resId: 'AUSTRIA_STR',		imgUrl: 'images/austria.png',		value: 19 },
        { resId: 'ITALY_STR',		imgUrl: 'images/italy.png',		value: 20 },
        { resId: 'SPAIN_STR',		imgUrl: 'images/spain.png',		value: 21 },
        { resId: 'AMERICA_STR',		imgUrl: 'images/america.png',		value: 22 },
        { resId: 'AUSTRALIA_STR',	imgUrl: 'images/australia.png',		value: 23 },
        { resId: 'NEW_ZEALAND_STR',	imgUrl: 'images/newzealand.png',	value: 24 }
    ],

    rgobjRoseWineRegion =
    [
        { resId: 'FRANCE_MAIN_STR',	imgUrl: 'images/france.png',		value: 29 }
    ],

    rgobjRedWineRegion =
    [
        { resId: 'CHAMPAGNE_STR',      	imgUrl: 'images/france.png',		value: 1 },
        { resId: 'ALSACE_STR',		imgUrl: 'images/france.png',		value: 7 },
        { resId: 'LOIRE_STR',		imgUrl: 'images/france.png',		value: 8 },
        { resId: 'BORDEAUX_STR',	imgUrl: 'images/france.png',		value: 9 },
        { resId: 'SUDWEST_STR',		imgUrl: 'images/france.png',		value: 10 },
        { resId: 'BOURGOGNE_STR',	imgUrl: 'images/france.png',		value: 11 },
        { resId: 'JURA_FRANCHE_STR',	imgUrl: 'images/france.png',		value: 25 },
        { resId: 'RHONE_STR',		imgUrl: 'images/france.png',		value: 14 },
        { resId: 'LANGUEDOC_STR',	imgUrl: 'images/france.png',		value: 26 },
        { resId: 'ROUSSILLON_STR',	imgUrl: 'images/france.png',		value: 27 },
        { resId: 'OTHER_LANG_ROUS_STR',	imgUrl: 'images/france.png',		value: 28 },
        { resId: 'PROVENCE_STR',	imgUrl: 'images/france.png',		value: 16 },
        { resId: 'CORSE_STR',		imgUrl: 'images/france.png',		value: 17 },
        { resId: 'GERMANY_STR',		imgUrl: 'images/germany.png',		value: 18 },
        { resId: 'AUSTRIA_STR',		imgUrl: 'images/austria.png',		value: 19 },
        { resId: 'ITALY_STR',		imgUrl: 'images/italy.png',		value: 20 },
        { resId: 'SPAIN_STR',		imgUrl: 'images/spain.png',		value: 21 },
        { resId: 'AMERICA_STR',		imgUrl: 'images/america.png',		value: 22 },
        { resId: 'AUSTRALIA_STR',	imgUrl: 'images/australia.png',		value: 23 },
        { resId: 'NEW_ZEALAND_STR',	imgUrl: 'images/newzealand.png',	value: 24 }
    ],

    rgobjDessertWineRegion =
    [
    ],

    rgobjWineColor =
    [
        { resId: 'SPARKLING_WINE_STR', value: 1, items: rgobjSparklingWineRegion },
        { resId: 'CHAMPAGNE_STR',      value: 2, items: rgobjChampagneRegion     },
        { resId: 'WHITE_WINE_STR',     value: 3, items: rgobjWhiteWineRegion     },
        { resId: 'ROSE_WINE_STR',      value: 4, items: rgobjRoseWineRegion      },
        { resId: 'RED_WINE_STR',       value: 5, items: rgobjRedWineRegion       },
        { resId: 'DESSERT_WINE_STR',   value: 6, items: rgobjDessertWineRegion   }
    ],

    rgobjGlassWineType =
    [
        rgobjWineColor[0],
        rgobjWineColor[2],
        rgobjWineColor[3],
        rgobjWineColor[4],
        rgobjWineColor[5]
    ],

    getRegionName = function(intColor, intRegion)
    {
        var strRegion,
            rgobjRegion = rgobjWineColor[intColor - 1].items,
            cRegion = rgobjRegion.length;

        for (var i = 0; i < cRegion; ++i)
        {
            if (intRegion === rgobjRegion[i].value)
            {
                strRegion = Strings.getString(rgobjRegion[i].resId);
                break;
            }
        }

        return strRegion;
    };


//-------------------------------------------------------
// Wine caetgories
//-------------------------------------------- YuMaeda --

var rgobjWineCategory =
    [
        { resId: 'SPARKLING_WINE_STR',   cssClass: 'colorOrange',    value: 1 },
        { resId: 'SPARKLING_ROSE_STR',   cssClass: 'colorPink',      value: 2 },
        { resId: 'FRENCH_WHITE_STR',     cssClass: 'colorCadetBlue', value: 3 },
        { resId: 'GERMAN_WHITE_STR',     cssClass: 'colorCadetBlue', value: 4 },
        { resId: 'AUSTRIAN_WHITE_STR',   cssClass: 'colorCadetBlue', value: 5 },
        { resId: 'ITALIAN_WHITE_STR',    cssClass: 'colorCadetBlue', value: 6 },
        { resId: 'SPANISH_WHITE_STR',    cssClass: 'colorCadetBlue', value: 7 },
        { resId: 'AMERICAN_WHITE_STR',   cssClass: 'colorCadetBlue', value: 8 },
        { resId: 'AUSTRALIAN_WHITE_STR', cssClass: 'colorCadetBlue', value: 9 },
        { resId: 'NEWZEALAND_WHITE_STR', cssClass: 'colorCadetBlue', value: 10 },
        { resId: 'FRENCH_RED_STR',       cssClass: 'colorRed',       value: 11 },
        { resId: 'AUSTRIAN_RED_STR',     cssClass: 'colorRed',       value: 12 },
        { resId: 'GERMAN_RED_STR',       cssClass: 'colorRed',       value: 13 },
        { resId: 'ITALIAN_RED_STR',      cssClass: 'colorRed',       value: 14 },
        { resId: 'SPANISH_RED_STR',      cssClass: 'colorRed',       value: 15 },
        { resId: 'AMERICAN_RED_STR',     cssClass: 'colorRed',       value: 16 },
        { resId: 'AUSTRALIAN_RED_STR',   cssClass: 'colorRed',       value: 17 },
        { resId: 'NEWZEALAND_RED_STR',   cssClass: 'colorRed',       value: 18 },
        { resId: 'ROSE_WINE_STR',        cssClass: 'colorPink',      value: 19 }
    ];


//-------------------------------------------------------
// Drink types
//-------------------------------------------- YuMaeda --
var rgobjDrinkCategory =
    [
        { resId: 'BEER_STR',       value: 1 },
        { resId: 'MARC_STR',       value: 2 },
        { resId: 'FINE_STR',       value: 3 },
        { resId: 'CALVADOS_STR',   value: 4 },
        { resId: 'COGNAC_STR',     value: 5 },
        { resId: 'ARMAGNAC_STR',   value: 6 },
        { resId: 'MADEIRA_STR',    value: 7 },
        { resId: 'GRAPPA_STR',     value: 8 },
        { resId: 'WHISKY_STR',     value: 9 },
        { resId: 'SHOCHU_STR',     value: 10 },
        { resId: 'SAKE_STR',       value: 11 },
        { resId: 'LIQUOR_STR',     value: 12 },
        { resId: 'COCKTAIL_STR',   value: 13 },
        { resId: 'SOFT_DRINK_STR', value: 14 },
        { resId: 'HERB_TEA_STR',   value: 15 },
        { resId: 'EAU_DE_VIE_STR', value: 16 }
    ];


//-------------------------------------------------------
// Shochu types
//-------------------------------------------- YuMaeda --

var rgobjShochuCategory =
    [
        { resId: 'AWAMORI_STR',        value: 1 },
        { resId: 'KOKUTOU_JOUCHU_STR', value: 2 },
        { resId: 'KOME_JOUCHU_STR',    value: 3 },
        { resId: 'MUGI_JOUCHU_STR',    value: 4 },
        { resId: 'IMO_JOUCHU_STR',     value: 5 },
        { resId: 'KURI_JOUCHU_STR',    value: 6 }
    ];



var _getWineColorResourceId = function(intCategory)
{
    var objWineColor,
        resId = '';

    for (var i = 0; i < rgobjWineColor.length; ++i)
    {
        objWineColor = rgobjWineColor[i];
        if (objWineColor.value == intCategory)
        {
            resId = objWineColor.resId;
            break;
        }
    }

    return resId;
};


//-------------------------------------------------------
// Dropdowns
//-------------------------------------------- YuMaeda --
var _generateSelectHtml = function(rgobjOption, strId, strName, strLabel, iSelected)
    {
        var cOption = rgobjOption.length,
            objOption = null,
            strText = '';

        var selectTag = new SelectTag();
        selectTag.addAttr('name', strName);

        if (strId)
        {
            selectTag.addAttr('id', strId);
        }

        if (strLabel)
        {
            selectTag.addLabel(strLabel);
        }

        selectTag.setSelectedIndex(iSelected);

        for (var i = 0; i < cOption; ++i)
        {
            objOption = rgobjOption[i];

            strText = Strings.getString(objOption.resId);
            if (strText == null)
            {
                // TODO yumaeda: Remove this workaround code.
                strText = Constants[objOption.resId];
                if (strText == null)
                {
                    strText = Constants['ja'][objOption.resId];
                }
            }

            selectTag.addOption(strText, objOption.value);
        }

        return selectTag.toHtml();
    },

    _generateCategorySelectHtml = function(rgobjCategory, strId, strLabel)
    {
        return(_generateSelectHtml(rgobjCategory, strId, 'category', strLabel, 0));
    };


//-------------------------------------------------------
// Item Getters
//-------------------------------------------- YuMaeda --
var _getCategory = function(rgCategory, intValue)
    {
        var cCategory = rgCategory.length,
            objCategory = null;

        for (var i = 0; !objCategory && (i < cCategory); ++i)
        {
            if (rgCategory[i].value == intValue)
            {
                objCategory = rgCategory[i];
            }
        }

        return(objCategory);
    },

    getWineColor = function(intValue)
    {
        return(_getCategory(rgobjWineColor, intValue));
    },

    getGeneralRegion = function(intColor, intValue)
    {
        return(_getCategory(rgobjWineColor[intColor - 1].items, intValue));
    };


var rgobjRegion =
    [
        { text: 'Champagne',                                      	locText: 'シャンパーニュ地方',			value: 1,	categories: [ 3, 11 ] },
        { text: 'Champagne / Montagne de Reims',                  	locText: 'シャンパーニュ地方 / モンターニュ・ド・ランス地区',	value: 2,	categories: [ 1 ] },			
        { text: 'Champagne / Valée de la Marne',                  	locText: 'シャンパーニュ地方 / ヴァレ・ド・ラ・マルヌ地区', 	value: 3,	categories: [ 1 ] },		
        { text: 'Champagne / Côte des Blancs',                    	locText: 'シャンパーニュ地方 / コート・デ・ブラン地区',	value: 4,	categories: [ 1 ] },		
        { text: 'Champagne / Petit et Grand-Mont',                	locText: 'シャンパーニュ地方 / プティ・エ・グラン・モン地区',	value: 5,	categories: [ 1 ] },		
        { text: 'Champagne / Côte des Bar',                       	locText: 'シャンパーニュ地方 / コート・デ・バール地区',	value: 6,	categories: [ 1 ] },		
        { text: 'Champagne / Côte de Champagne',                  	locText: 'シャンパーニュ地方 / コート・ドゥ・シャンパーニュ地区',	value: 7,	categories: [ 1 ] },		
        { text: 'Champagne Rosé',                                 	locText: 'シャンパーニュ・ロゼ',			value: 8,	categories: [ 2 ] },
        { text: 'Crémant',                                        	locText: 'クレマン',			        value: 20,	categories: [ 1 ] },
        { text: 'Vin Mousseux',                                   	locText: 'ヴァン・ムスー',			value: 21,	categories: [ 1 ] },
        { text: 'Vin Mousseux　Rosé',                              	locText: 'ヴァン・ムスー・ロゼ',			value: 22,	categories: [ 1 ] },			
        { text: 'Pétillant',                                      	locText: 'ペティヤン',         		value: 23,	categories: [ 1 ] },
        { text: 'Lorraine',                                       	locText: 'ロレーヌ地方',			value: 30,	categories: [ 3 ] },
        { text: 'Alsace / Riesling',                              	locText: 'アルザス地方 / リースリング',		value: 40,	categories: [ 3 ] },	
        { text: 'Alsace / Gewurztraminer',                        	locText: 'アルザス地方 / ゲヴェルツトラミネール',		value: 41,	categories: [ 3 ] },	
        { text: 'Alsace / Pinot Gris',                            	locText: 'アルザス地方 / ピノ・グリ',		value: 42,	categories: [ 3 ] },	
        { text: 'Alsace / Musucat',                               	locText: 'アルザス地方 / ミュスカ',		value: 43,	categories: [ 3 ] },	
        { text: 'Alsace / Sylvaner',                              	locText: 'アルザス地方 / シルヴァネール',		value: 44,	categories: [ 3 ] },	
        { text: 'Alsace / Pinot Blanc',                           	locText: 'アルザス地方 / ピノ・ブラン',		value: 45,	categories: [ 3 ] },
        { text: 'Alsace / Pinot Noir',                            	locText: 'アルザス地方 / ピノ・ノワール',		value: 46,	categories: [ 11 ] },					
        { text: 'Autres de Alsace',                               	locText: 'その他のアルザス地方',			value: 47,	categories: [ 3 ] },	
        { text: 'Vallée de la Loire / Pays Nantais',              	locText: 'ロワール河流域 / ナント地区',		value: 60,	categories: [ 3 ] },				
        { text: 'Vallée de la Loire / Anjou & Saumur',            	locText: 'ロワール河流域 / アンジュー＆ソミュール地区',	value: 61,	categories: [ 3, 11 ] },		
        { text: 'Vallée de la Loire / Touraine',                  	locText: 'ロワール河流域 / トゥーレーヌ地区',		value: 62,	categories: [ 3, 11 ] },	
        { text: 'Vallée de la Loire / Centre',                    	locText: 'ロワール河流域 / 中央フランス地区',		value: 63,	categories: [ 3, 11 ] },	
        { text: 'Vallée de la Loire / Autres Vignobles de Loire',	locText: 'ロワール河流域 / ロワール河流域のその他の栽培地',	value: 64,	categories: [ 3 ] },			
        { text: 'Bordeaux',                                       	locText: 'ボルドー地方',			value: 80,	categories: [ 3 ] }, 
        { text: 'Bordeaux / Médoc',                               	locText: 'ボルドー地方 / メドック地区',		value: 81,	categories: [ 11 ] },
        { text: 'Bordeaux / Graves',                              	locText: 'ボルドー地方 / グラーヴ地区',		value: 82,	categories: [ 11 ] },
        { text: 'Bordeaux / Saint-Émilion',                       	locText: 'ボルドー地方 / サンテミリオン地区',		value: 83,	categories: [ 11 ] },	
        { text: 'Bordeaux / Pomerol',                             	locText: 'ボルドー地方 / ポムロル地区',		value: 84,	categories: [ 11 ] },
        { text: 'Bordeaux / Rive Droit de la Dordogne',           	locText: 'ボルドー地方 / ドルドーニュ右岸地区',		value: 85,	categories: [ 11 ] },		
        { text: 'Sud-Ouest',                                      	locText: '南西地方',	        	value: 100,	categories: [ 3 ] },				
        { text: 'Bourgogne',                                      	locText: 'ブルゴーニュ',			value: 110,	categories: [ 3, 11, 19 ] },
        { text: 'Bourgogne / Auxerois',                           	locText: 'ブルゴーニュ地方 / オーセロワ地区',		value: 111,	categories: [ 11 ] },
        { text: 'Bourgogne / Chablis',                            	locText: 'ブルゴーニュ地方 / シャブリ地区',		value: 112,	categories: [ 3 ] },
        { text: 'Bourgogne / Côte de Nuits',                      	locText: 'ブルゴーニュ地方 / コート・ド・ニュイ地区',	value: 113,	categories: [ 3, 11 ] },	
        { text: 'Bourgogne / Côte de Beaune',                     	locText: 'ブルゴーニュ地方 / コート・ド・ボーヌ地区',	value: 114,	categories: [ 3, 11 ] },	
        { text: 'Bourgogne / Côte Chalonnaise',                   	locText: 'ブルゴーニュ地方 / コート・シャロネーズ地区',	value: 115,	categories: [ 3, 11 ] },	
        { text: 'Bourgogne / Mâconnais',                          	locText: 'ブルゴーニュ地方 / マコネー地区',		value: 116,	categories: [ 3 ] },
        { text: 'Bourgogne / Beaujolais',                         	locText: 'ブルゴーニュ地方 / ボージョレ地区',		value: 117,	categories: [ 11 ] },					
        { text: 'Jura',                                           	locText: 'ジュラ地方',			value: 130,	categories: [ 3, 11 ] },
        { text: 'Franche-Comté',                                  	locText: 'フランシュ・コンテ地方',			value: 140,	categories: [ 3, 11 ] },				
        { text: 'Savoie',                                         	locText: 'サヴォワ地方',			value: 150,	categories: [ 3 ] },
        { text: 'Vallée du Rhône / Vignoble Septentrional',       	locText: 'ローヌ河流域 / ローヌ地方北部の栽培地域',	value: 160,	categories: [ 3, 11 ] },			
        { text: 'Vallée du Rhône / Vignoble Méridional',        	locText: 'ローヌ河流域 / ローヌ地方南部の栽培地域',	value: 161,	categories: [ 3, 11 ] },		
        { text: 'Vallée du Rhône / Autres Vignobles de Rhône',  	locText: 'ローヌ河流域 / ローヌ河流域のその他の栽培地',	value: 162,	categories: [ 3 ] },			
        { text: 'Côtes du Rhône Villages',                      	locText: 'コート・デュ・ローヌ・ヴィラージュ',		value: 163,	categories: [ 11 ] },
        { text: 'Côtes du Rhône & Autres Vignobles',            	locText: 'コート・デュ・ローヌとその他の栽培地',		value: 164,	categories: [ 11 ] },						
        { text: 'Languedoc',                                    	locText: 'ラングドック地方',			value: 180,	categories: [ 11, 19 ] },
        { text: 'Roussillon',                                   	locText: 'ルーション地方',			value: 181,	categories: [ 11 ] },
        { text: 'Languedoc & Roussillon',                       	locText: 'ラングドック地方＆ルーション地方',		value: 182,	categories: [ 3 ] },			
        { text: 'Autres Vignobles de Languedoc et Roussillon',  	locText: 'ラングドック地方＆ルーション地方のその他の栽培地',	value: 183,	categories: [ 11 ] },			
        { text: 'Provence',                                     	locText: 'プロヴァンス地方',			value: 190,	categories: [ 3, 11, 19 ] },	
	
        { text: 'Corse',						locText: 'コルシカ島',			value: 195,	categories: [ 3, 11 ] },

        { text: 'Mosel-Saar-Ruwer',					locText: 'モーゼル・ザール・ルヴァー地区',		value: 200,	categories: [ 4 ] },
        { text: 'Rheingau',         					locText: 'ラインガウ地区',			value: 201,	categories: [ 4 ] },
        { text: 'Pfalz',            					locText: 'ファルツ地区',			value: 202,	categories: [ 4 ] },
        { text: 'Barden',           					locText: 'バーデン地区',			value: 203,	categories: [ 4, 13 ] },

        { text: 'Niederösterreich / Kamptal',       			locText: 'ニーダーエスタライヒ州 / カンプタール地区',	value: 300,	categories: [ 5 ] },
        { text: 'Niederösterreich / Wien',          			locText: 'ニーダーエスタライヒ州 / ヴィーン地区',		value: 301,	categories: [ 5 ] },
        { text: 'Niederösterreich / Donauland',     			locText: 'ニーダーエスタライヒ州 / ドナウラント地区',	value: 302,	categories: [ 5 ] },	
        { text: 'Niederösterreich / Kremstal',      			locText: 'ニーダーエスタライヒ州 / クレムスタール地区',	value: 303,	categories: [ 5 ] },
        { text: 'Niederösterreich / Wachau',        			locText: 'ニーダーエスタライヒ州 / ヴァッハウ地区',   	value: 304,	categories: [ 5 ] },	
        { text: 'Niederösterreich / Thermenregion',			locText: 'ニーダーエスタライヒ州 / テルメンレギオン地区',    	value: 305,	categories: [ 12 ] },
        { text: 'Burgenland / Neusiedlersee',       			locText: 'ブルゲンラント州 / ノイジードラーゼー地区',  	value: 306,	categories: [ 5 ] },	
        { text: 'Steiermark / Südsteiermark',       			locText: 'シュタイヤーマルク州 / ズュートシュタイヤーマルク地区',	value: 307,	categories: [ 5 ] },

        { text: 'Trentino Alto-Adige',					locText: 'トレンティーノ・アルト・アディジェ州',		value: 400,	categories: [ 6 ] },
        { text: 'Vallée d\'Aoste',					locText: 'ヴァッレ・ダオスタ州',			value: 401,	categories: [ 14 ] },
        { text: 'Friuli-Venezia-Giulia',				locText: 'フリウ-リ・ヴェネツィア・ジューリア州',		value: 402,	categories: [ 6, 14 ] },
        { text: 'Veneto',						locText: 'ヴェネト州',			value: 403,	categories: [ 14 ] },
        { text: 'Emilia Romagna',					locText: 'エミリア・ロマーニャ州',	 		value: 404,	categories: [ 14 ] },			
        { text: 'Piemonte',						locText: 'ピエモンテ州',	 		value: 405,	categories: [ 6, 14 ] },	
        { text: 'Toscana',						locText: 'トスカーナ州',			value: 406,	categories: [ 6, 14 ] },
        { text: 'Umbria',						locText: 'ウンブリア州',	 		value: 407,	categories: [ 6, 14 ] },
        { text: 'Marche',						locText: 'マルケ州',	 		value: 408,	categories: [ 6, 14 ] },
        { text: 'Abruzzo',						locText: 'アブルッツォ州',	 		value: 409,	categories: [ 6, 14 ] },
        { text: 'Lazio',						locText: 'ラツィオ州',	 		value: 410,	categories: [ 6, 14 ] },
        { text: 'Molise',						locText: 'モリーゼ州',			value: 411,	categories: [ 14 ] },
        { text: 'Campagna',						locText: 'カンパーニャ州',	 		value: 412,	categories: [ 6, 14 ] },
        { text: 'Basilicata',						locText: 'バジリカータ州',	 		value: 413,	categories: [ 14 ] },
        { text: 'Sardegna',						locText: 'サルディーニャ州',	 		value: 414,	categories: [ 14 ] },
        { text: 'Sicilia',						locText: 'シチリア州',	 		value: 415,	categories: [ 14 ] },

        { text: 'Galicia',						locText: 'ガリシア州',			value: 500,	categories: [ 7 ] },
        { text: 'Castilla Y León',					locText: 'カスティーリャ・イ・レオン州',		value: 501,	categories: [ 15 ] },
        { text: 'Cataluña',						locText: 'カタルーニャ州',			value: 502,	categories: [ 15 ] },
        { text: 'Valenciana',						locText: 'ヴァレンシア州',			value: 503,	categories: [ 15 ] },
        { text: 'Murcia',						locText: 'ムルシア州',			value: 504,	categories: [ 15 ] },

        { text: 'Washington',						locText: 'ワシントン州',			value: 600,	categories: [ 8 ] },
        { text: 'Oregon',						locText: 'オレゴン州',			value: 601,	categories: [ 8, 16 ] },
        { text: 'California',						locText: 'カルフォルニア州',			value: 602,	categories: [ 8, 16 ] },

        { text: 'Victoria / Macedon',					locText: 'ヴィクトリア州 / マセドン地区',		value: 700,	categories: [ 17 ] },
        { text: 'Victoria / Gippsland',					locText: 'ヴィクトリア州 / ジップスランド地区',		value: 701,	categories: [ 9, 17 ] },
        { text: 'Victoria / Geelong',					locText: 'ヴィクトリア州・ジーロング地区',		value: 702,	categories: [ 17 ] },	
        { text: 'Victoria / Mornington Peninsula',			locText: 'ヴィクトリア州 / モーニングトン・ペニンシュラ地区',	value: 703,	categories: [ 9, 17 ] },
        { text: 'Victoria / Yarra Valley',				locText: 'ヴィクトリア州 / ヤラ・ヴァレー',		value: 704,	categories: [ 17 ] },
        { text: 'South Australia / Barossa Valley',			locText: 'サウス・オーストラリア州 / バロッサ・ヴァレイ',	value: 705,	categories: [ 17 ] },		
        { text: 'South Australia / Langhorne Creek',			locText: 'サウス・オーストラリア州・ラングホーン・クリーク地区',	value: 706,	categories: [ 17 ] },		
        { text: 'New South Wales / Cowra',				locText: 'ニュー・サウス・ウェールズ州 / カウラ地区',	value: 707,	categories: [ 17 ] },
        { text: 'South Australia / McLaren Vale',			locText: 'サウス・オーストラリア州 / マクラーレン・ヴェール地区',	value: 708,	categories: [ 17 ] },			
        { text: 'Tasmania / Northeast Coast Tasmania',			locText: 'タスマニ州 / 北東地域タスマニア地区',	value: 709,	categories: [ 9, 17 ] },		
        { text: 'Tasmania / Derwent Valley',				locText: 'タスマニ州 / ダーヴェント・ヴァレー地区',	value: 710,	categories: [ 9 ] },		
        { text: 'Western Australia / Pemberton',			locText: 'ウエスタン・オーストラリア州 / ペンバートン地区',	value: 711,	categories: [ 9 ] },	

        { text: 'Waiheke Island',					locText: 'ワイヘキ島',			value: 800,	categories: [ 18 ] },
        { text: 'North Island',						locText: '北島',				value: 801,	categories: [ 10, 18 ] },
        { text: 'South Island',						locText: '南島',				value: 802,	categories: [ 10, 18 ] }
    ];


var getObjWine = function(intValue)
    {
        return(_getCategory(rgobjWineCategory, intValue));
    },

    getObjRegion = function(intValue)
    {
        return(_getCategory(rgobjRegion, intValue));
    },

    getObjDrink = function(intValue)
    {
        return(_getCategory(rgobjDrinkCategory, intValue));
    },

    getObjShochu = function(intValue)
    {
        return(_getCategory(rgobjShochuCategory, intValue));
    },

    _getRegionsByCategory = function(intCategory)
    {
        var cRegion = rgobjRegion.length,
            rgobjTargetRegion = [];

        for (var i = 0; i < cRegion; ++i)
        {
            var fFound = false,
                cCategory = rgobjRegion[i].categories.length;

            for (var j = 0; (!fFound && (j < cCategory)); ++j)
            {
                if (rgobjRegion[i].categories[j] == intCategory)
                {
                    rgobjTargetRegion.push(rgobjRegion[i]);
                    fFound = true;
                }
            }
        }

        return(rgobjTargetRegion);
    };


var generateRegionSelectHtml = function(intCategory)
    {
        var rgobjRegion = _getRegionsByCategory(intCategory);
        var cRegion = rgobjRegion.length;

        var selectTag = new SelectTag();
        selectTag.addAttr('id', 'regionSelect');
        selectTag.addAttr('name', 'aoc');
        selectTag.addLabel(Strings.getString('REGION_STR'));

        for (var i = 0; i < cRegion; ++i)
        {
            selectTag.addOption(rgobjRegion[i].text, rgobjRegion[i].value);
        }

        selectTag.setSelectedIndex(0);
        return selectTag.toHtml();
    },

    generateRegionSelectHtmlByColor = function(intColor)
    {
        var rgobjRegion = _getCategory(rgobjWineColor, intColor).items;
        var cRegion = rgobjRegion.length;

        var selectTag = new SelectTag();
        selectTag.addAttr('id', 'regionSelect');
        selectTag.addAttr('name', 'general_region');
        selectTag.addLabel(Strings.getString('REGION_STR'));

        for (var i = 0; i < cRegion; ++i)
        {
            selectTag.addOption(Strings.getString(rgobjRegion[i].resId), rgobjRegion[i].value);
        }

        selectTag.setSelectedIndex(0);
        return selectTag.toHtml();
    },

    generateManipulantSelectHtml = function()
    {
        var selectTag = new SelectTag();
        selectTag.addAttr('id', 'manipulantSelect');
        selectTag.addAttr('name', 'manipulant');
        selectTag.addLabel('マニピュランの種類');
        selectTag.addOption('Recoltant Manipulant', 1);
        selectTag.addOption('Negociant Manipulant', 2);
        selectTag.addOption('Cooperative Manipulant', 3);
        selectTag.setSelectedIndex(0);

        return(selectTag.toHtml());
    },

    generateWineCategorySelectHtml = function()
    {
        return(_generateCategorySelectHtml(rgobjWineCategory, 'wineCategorySelect', Strings.getString('WINE_TYPE_STR')));
    },

    generateDrinkCategorySelectHtml = function()
    {
        return(_generateCategorySelectHtml(rgobjDrinkCategory, 'drinkCategorySelect', Strings.getString('DRINK_TYPE_STR')));
    };
