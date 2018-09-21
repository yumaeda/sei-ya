//-------------------------------------------------------
//
// MitsuGetsuMenu
//
// [Dependencies]
//     BaseMenu.js
//
//-------------------------------------------- YuMaeda --
class MitsuGetsuMenu extends BaseMenu
{
    constructor($parentContainer)
    {
        super($parentContainer);
    }

    _registerMapLinkHandler()
    {
        this.m_objLinkClickHandler['map-link'] = function()
        {
            var $footer     = $('.footer'),
                contactInfo = new ContactInfo($footer);

            $footer.show();

            contactInfo.email       = 'mitsu-getsu@sei-ya.jp';
            contactInfo.phoneNumber = '03-6413-1810';
            contactInfo.faxNumber   = '03-6413-9736';
            contactInfo.address     = '1F 2-13-1 Kyodo, Setagaya-ku, Tokyo 156-0052';
            contactInfo.openingHour = '15:00～24:00(Sun～Thr) 15:00～26:00(Fri～Sat)';
            contactInfo.closedOn    = 'Tuesday';
            contactInfo.render();

            var mapControl = new MapControl();
            mapControl.width              = 750;
            mapControl.height             = 400;
            mapControl.marker             = '';
            mapControl.screenSpan         = '';
            mapControl.subCoordinate      = '';
            mapControl.coordinate         = '35.651555,139.634685';
            mapControl.coordinateId       = '9636767212025462165';
            mapControl.infoWindowLocation = 'A';

            $('div.body').html(mapControl.toHtml());
        };
    }

    _registerDishLinkHandler()
    {
        this.m_objLinkClickHandler['dish-link'] = function()
        {
            $('.footer').hide();

            var $body            = $('div.body'),
                rgobjDishSubMenu =
            [
                { resId: 'A_LA_CARTE', cssClass: 'a-la-carte-image' },
                { resId: 'COURSE_STR', cssClass: 'course-image'     }
            ];

            $body.html((new SubMenuTable('Dish', rgobjDishSubMenu)).toHtml());
            $body.off('click', 'div.a-la-carte-image');
            $body.on('click', 'div.a-la-carte-image', function()
            {
                (new DishMenuControl('mitsugetsu_dishes', $body)).render();
            });

            $body.off('click', 'div.course-image');
            $body.on('click', 'div.course-image', function()
            {
                var tableTag = new TableTag(),
                    tableRow = new TableRow(),
                    tableCol = new TableColumn('<img src="images/course.gif" />');

                tableTag.addClass('auto-horizontal-margin contents-width padding-bottom-large');
                tableCol.addClass('text-center');

                tableRow.addColumn(tableCol);
                tableTag.body.addRow(tableRow);
                $body.html(tableTag.toHtml());
            });
        };
    }

    _registerDrinkLinkHandler()
    {
        this.m_objLinkClickHandler['drink-link'] = function()
        {
            $('.footer').hide();

            var $body             = $('div.body'),
                rgobjDrinkSubMenu =
            [
                { resId: 'BEER_STR',         cssClass: 'beer-image'         },
                { resId: 'DIGESTIF_STR',     cssClass: 'digestif-image'     },
                { resId: 'OTHER_DRINKS_STR', cssClass: 'other-drinks-image' }
            ];

            $body.html((new SubMenuTable('Drink', rgobjDrinkSubMenu)).toHtml()); 
            $body.off('click', 'div.beer-image');
            $body.on('click', 'div.beer-image', function()
            {
                (new BeerControl($body, 'mitsugetsu_drinks')).render();
            });

            $body.off('click', 'div.digestif-image');
            $body.on('click', 'div.digestif-image', function()
            {
                (new BrandyControl($body, 'mitsugetsu_drinks')).render();
            });

            $body.off('click', 'div.other-drinks-image');
            $body.on('click', 'div.other-drinks-image', function()
            {
                (new DrinkControl($body, 'mitsugetsu_drinks')).render();
            });
        };
    }

    postRender()
    {
        super.postRender();

        var self  = this,
            $body = $('div.body');

        this._registerEventLinkHandler('mitsugetsu_events');
        this._registerWineLinkHandler('mitsugetsu_recommended_wines', true);
        this._registerPhotoLinkHandler('mitsugetsu_profiles', 2);
        this._registerMapLinkHandler();
        this._registerDishLinkHandler();
        this._registerDrinkLinkHandler();
    }
}

