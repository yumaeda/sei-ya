var imageUrlHash =
{
    'mitsu-getsu': [
        {
            imgUrl:  './images/covers/image1.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image2.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image3.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image4.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image5.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image6.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image7.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image8.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image9.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image10.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image11.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image12.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image13.jpg',
            pageUrl: ''
        }
    ],

    'ofuro': [
        {
            imgUrl:  './images/covers/image1.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image2.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image3.jpg',
            pageUrl: ''
        },

        {
            imgUrl:  './images/covers/image4.jpg',
            pageUrl: ''
        }
    ],

    'anyway-grapes': [
        {
            imgUrl: 'http://anyway-grapes.jp/images/covers/image5.png',
            pageUrl: 'http://anyway-grapes.jp/store/index.php?pc_view=1&submenu=shipping'
        },

        {
            imgUrl: 'http://anyway-grapes.jp/images/covers/image9.png',
            pageUrl: 'http://anyway-grapes.jp/store/index.php?pc_view=1&submenu=wine_set&id=26'
        },

        {
            imgUrl: 'http://anyway-grapes.jp/images/covers/image3.png',
            pageUrl: 'http://anyway-grapes.jp/producers/south-africa/western-cape/restless-river/index.php'
        },

        {
            imgUrl: 'http://anyway-grapes.jp/images/covers/image9.png',
            pageUrl: 'http://anyway-grapes.jp/store/index.php?pc_view=1&submenu=wine_set&id=26'
        }
    ]
};

var siteName  = UrlQuery.getValue('siteName'),
    rgstrUrl  = imageUrlHash[siteName], 
    iCurImage = 0;

function loadImage()
{
    $img = $('div a img');

    $img.animate({ opacity: 0.1 }, 1000, function()
    {
        iCurImage = (iCurImage % rgstrUrl.length);

        $img.closest('a').attr('href', rgstrUrl[iCurImage].pageUrl);
        $img.attr('src', rgstrUrl[iCurImage].imgUrl);

        ++iCurImage;

        $img.animate({ opacity: 1 }, 1000, function()
        {
            setTimeout(loadImage, 5000);
        });
    });
}

$(document).ready(function()
{
    var istrUrl = rgstrUrl.length - 1,
        pageUrl = rgstrUrl[istrUrl].pageUrl,
        imgUrl  = rgstrUrl[istrUrl].imgUrl;

    $('div').html('<a target="parent" href="' + rgstrUrl[istrUrl].pageUrl + '"><img src="' + rgstrUrl[istrUrl].imgUrl + '" /></a>');
    setTimeout(loadImage, 5000);
});

