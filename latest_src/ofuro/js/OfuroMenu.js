//-------------------------------------------------------
//
// BaseMenu
//
// [Dependencies]
//     BaseMenu.js
//
//-------------------------------------------- YuMaeda --
class OfuroMenu extends BaseMenu
{
    constructor($parentContainer)
    {
        super($parentContainer);
    }

    postRender()
    {
        super.postRender();

        var self  = this,
            $body = $('div.body');

        this.m_objLinkClickHandler['event-link'] = function()
        {
            $('.footer').hide();

            $body.html('<div id="thisYearEventPane"></div><br /><br /><div id="nextYearEventPane"></div>');

            var intYear = (new Date()).getFullYear(),
                thisYearEvent = new EventControl($('div#thisYearEventPane'), 'ofuro_events', intYear),
                nextYearEvent = new EventControl($('div#nextYearEventPane'), 'ofuro_events', intYear + 1);

            thisYearEvent.render();
            nextYearEvent.render();
        };

        this.m_objLinkClickHandler['photo-link'] = function()
        {
            $('.footer').hide();

            var rgobjPhotoSubMenu =
            [
                { resId: 'STAFF_STR',          cssClass: 'staff-image'          },
                { resId: 'STORE_INTERIOR_STR', cssClass: 'store-interior-image' },
                { resId: 'DISH_STR',           cssClass: 'dish-image'           },
                { resId: 'MAGAZINE_STR',       cssClass: 'magazine-image'       }
            ];

            $body.html((new SubMenuTable('Photo', rgobjPhotoSubMenu)).toHtml());
            $body.off('click', 'div.staff-image');
            $body.on('click', 'div.staff-image', function()
            {
                (new ProfileControl('ofuro_profiles', $body)).render();
            });

            $body.off('click', 'div.store-interior-image');
            $body.on('click', 'div.store-interior-image', function()
            {
                (new PhotoControl(7, $body)).render(); 
            });

            $body.off('click', 'div.dish-image');
            $body.on('click', 'div.dish-image', function()
            {
                (new PhotoControl(8, $body)).render(); 
            });

            $body.on('click', 'div.magazine-image', function()
            {
                (new PhotoControl(9, $body)).render(); 
            });
        };

        this.m_objLinkClickHandler['map-link'] = function()
        {
            var $footer     = $('.footer'),
                contactInfo = new ContactInfo($footer);

            $footer.show();

            contactInfo.email       = 'ofuro@sei-ya.jp';
            contactInfo.phoneNumber = '03-5300-6007';
            contactInfo.faxNumber   = '03-3325-4989';
            contactInfo.address     = 'Anshin-do building B1F 4-45-10 Akazutsumi, Setagaya-ku, Tokyo 156-0044';
            contactInfo.openingHour = '17:00～25:00(Sun～Thr) 17:00～27:00(Fri～Sat)';
            contactInfo.closedOn    = 'Tuesday';
            contactInfo.render();

            var mapControl = new MapControl();
            mapControl.width              = 750;
            mapControl.height             = 400;
            mapControl.marker             = '%E5%B1%85%E9%85%92%E5%B1%8B%E3%80%80%E3%81%8A%E3%81%B5%E3%82%8D';
            mapControl.screenSpan         = '0.334679,0.676346';
            mapControl.subCoordinate      = '35.673343,139.710388';
            mapControl.coordinate         = '35.665859,139.640023';
            mapControl.coordinateId       = '6936012129984331143';
            mapControl.infoWindowLocation = 'A';

            $body.html(mapControl.toHtml());
        };

        this.m_objLinkClickHandler['dish-link'] = function()
        {
            $('.footer').hide();

            var rgobjDishSubMenu =
            [
                { resId: 'DAILY_MENU_STR',  cssClass: 'daily-menu-image'  },
                { resId: 'NORMAL_MENU_STR', cssClass: 'normal-menu-image' }
            ];

            $body.html((new SubMenuTable('Dish', rgobjDishSubMenu)).toHtml());
            $body.off('click', 'div.daily-menu-image');
            $body.on('click', 'div.daily-menu-image', function()
            {
                (new DailyMenuControl('ofuro_dishes', $body)).render();
            });

            $body.off('click', 'div.normal-menu-image');
            $body.on('click', 'div.normal-menu-image', function()
            {
                (new DishMenuControl('ofuro_dishes', $body)).render();
            });
        };

        this.m_objLinkClickHandler['drink-link'] = function()
        {
            $('.footer').hide();

            var rgobjDrinkSubMenu =
            [
                { resId: 'BEER_STR',         cssClass: 'beer-image'         },
                { resId: 'DIGESTIF_STR',     cssClass: 'digestif-image'     },
                { resId: 'SAKE_STR',         cssClass: 'sake-image'         },
                { resId: 'SHOCHU_STR',       cssClass: 'shochu-image'       },
                { resId: 'OTHER_DRINKS_STR', cssClass: 'other-drinks-image' }
            ];

            $body.html((new SubMenuTable('Drink', rgobjDrinkSubMenu)).toHtml()); 
            $body.off('click', 'div.beer-image');
            $body.on('click', 'div.beer-image', function()
            {
                (new BeerControl($body, 'ofuro_drinks')).render();
            });

            $body.off('click', 'div.digestif-image');
            $body.on('click', 'div.digestif-image', function()
            {
                (new BrandyControl($body, 'ofuro_drinks')).render();
            });

            $body.off('click', 'div.sake-image');
            $body.on('click', 'div.sake-image', function()
            {
                (new SakeControl($body)).render();
            });

            $body.off('click', 'div.shochu-image');
            $body.on('click', 'div.shochu-image', function()
            {
                (new ShochuControl($body)).render();
            });

            $body.off('click', 'div.other-drinks-image');
            $body.on('click', 'div.other-drinks-image', function()
            {
                (new DrinkControl($body, 'ofuro_drinks')).render();
            });
        };

        this.m_objLinkClickHandler['wine-link'] = function()
        {
            $('.footer').hide();

            var rgobjWineSubMenu =
            [
                { resId: 'GLASS_WINE_STR',     cssClass: 'glass-wine-image'     },
                { resId: 'SPARKLING_WINE_STR', cssClass: 'sparkling-wine-image' },
                { resId: 'WHITE_WINE_STR',     cssClass: 'white-wine-image'     },
                { resId: 'ROSE_WINE_STR',      cssClass: 'rose-wine-image'      },
                { resId: 'RED_WINE_STR',       cssClass: 'red-wine-image'       },
                { resId: 'WINE_LIST_STR',      cssClass: 'wine-list-image'      }
            ];

            $body.html((new SubMenuTable('Wine', rgobjWineSubMenu)).toHtml());
            $body.off('click', 'div.glass-wine-image');
            $body.on('click', 'div.glass-wine-image', function()
            {
                (new AllWineControl('ofuro_recommended_wines', $body)).render();
            });

            $body.off('click', 'div.sparkling-wine-image');
            $body.on('click', 'div.sparkling-wine-image', function()
            {
                (new RecommendedWineControl('ofuro_recommended_wines', 1, $body)).render();
            });

            $body.off('click', 'div.white-wine-image');
            $body.on('click', 'div.white-wine-image', function()
            {
                (new RecommendedWineControl('ofuro_recommended_wines', 3, $body)).render();
            });

            $body.off('click', 'div.rose-wine-image');
            $body.on('click', 'div.rose-wine-image', function()
            {
                (new RecommendedWineControl('ofuro_recommended_wines', 4, $body)).render();
            });

            $body.off('click', 'div.red-wine-image');
            $body.on('click', 'div.red-wine-image', function()
            {
                (new RecommendedWineControl('ofuro_recommended_wines', 5, $body)).render();
            });

            $body.off('click', 'div.wine-list-image');
            $body.on('click', 'div.wine-list-image', function()
            {
                var strNotice =
                    '※こちらのリストに掲載されているワインのストックは店舗外のセラーで管理しているため、ご要望のあるお客様は前日までに電話またはメールでご予約ください。また、姉妹店と在庫を共有しているため、売り切れている場合もございます。ご了承ください。';

                (new RestaurantWineList($body, strNotice)).render();
            });
        };
    }
}

