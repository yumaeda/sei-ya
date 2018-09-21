var TAX_RATE = 0.08;

var wineTypeHash =
{
    'Mousseux':       'スパークリング',
    'Mousseux Rosé':  'スパークリング・ロゼ',
    'Champagne':      'シャンパーニュ',
    'Champagne Rosé': 'シャンパーニュ・ロゼ',
    'Blanc':          '白ワイン',
    'Orange':         'オレンジワイン',
    'Rosé':           'ロゼワイン',
    'Rouge':          '赤ワイン',
    'Jaune':          'ヴァン・ジョーヌ',
    'Doux':           '甘口ワイン',
    'Liqueur':        'リキュール',
    'Beer':           'ビール',
    'Cider':          'シードル',
    'Food':           '食品'
};

function getImporterName(objWine)
{
    var strImporter = objWine.importer;
    if ((strImporter === 'TAKAHASHI COLLECTION') ||
        (strImporter === 'MATSUYA SAKETEN') ||
        (strImporter === 'KANAI-YA') ||
        (strImporter === 'ESPOA SHINKAWA') ||
        (strImporter === 'LA VINÉE') ||
        (strImporter === 'SENSHO') ||
        (strImporter === 'BERRY BROS & RUDD') ||
        (strImporter === 'LA TOUR D\'ARGENT') ||
        (strImporter === 'TSUCHIURA SUZUKI-YA'))
    {
        strImporter = '';
    }

    return strImporter;
}

function getRatingsHtml(objWine)
{
    var html        = '',
        rgstrRating = objWine.point.split(','),
        cRating     = rgstrRating.length;

    for (var i = 0; i < cRating; ++i)
    {
        if (!rgstrRating[i].startsWith('○○'))
        {
            html += rgstrRating[i];
            if (i < (cRating - 1))
            {
                html += ',&nbsp;&nbsp;&nbsp;&nbsp;';
            }
        }
    }

    return html;
}

function getVintageHtml(objWine)
{
    var strCountry = objWine.country,
        strRegion  = objWine.region,
        intVintage = objWine.vintage,
        baseUrl    = ('//anyway-grapes.jp/vintages/index.php?country=' + strCountry + '&region=' + strRegion + '&vintage=' + intVintage),
        strVintage = objWine.vintage,
        html       = strVintage;

    if ((objWine.region == 'Champagne') ||
        (objWine.region == 'Alsace')    ||
        (objWine.region == 'Bordeaux')  ||
        (objWine.region == 'Sud-Ouest') ||
        (objWine.region == 'Bourgogne') ||
        (objWine.region == 'Vallée de la Loire') ||
        (objWine.region == 'Jura') ||
        (objWine.region == 'Savoie') ||
        (objWine.region == 'Vallée du Rhône') ||
        (objWine.region == 'Provence') ||
        (objWine.region == 'Corse') ||
        ((objWine.region == 'Languedoc') || (objWine.region == 'Roussillon')) ||
        (objWine.region == 'Western Cape'))
    {
        html = '<a href="' + baseUrl + '">{0}</a>'.format(strVintage);
    }

    return html;
}

