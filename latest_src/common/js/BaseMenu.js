//-------------------------------------------------------
//
// BaseMenu
//
// [Dependencies]
//     HtmlControl.cs
//     AnchorTag.cs
//     ListTag.cs
//
//-------------------------------------------- YuMaeda --
class BaseMenu extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_objList = new ListTag(false);
        this.m_objList.addClass('main-list');

        this.m_objLinkClickHandler = {}
    }

    _registerEventLinkHandler(strDBTable)
    {
        this.m_objLinkClickHandler['event-link'] = function()
        {
            $('.footer').hide();

            $('div.body').html('<div id="thisYearEventPane"></div><br /><br /><div id="nextYearEventPane"></div>');

            var intYear = (new Date()).getFullYear(),
                thisYearEvent = new EventControl($('div#thisYearEventPane'), strDBTable, intYear),
                nextYearEvent = new EventControl($('div#nextYearEventPane'), strDBTable, intYear + 1);

            thisYearEvent.render();
            nextYearEvent.render();
        };
    }

    _registerWineLinkHandler(strDBTable, fHasCellar)
    {
        var $body = $('div.body');

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
                (new AllWineControl(strDBTable, $body)).render();
            });

            $body.off('click', 'div.sparkling-wine-image');
            $body.on('click', 'div.sparkling-wine-image', function()
            {
                (new RecommendedWineControl(strDBTable, 1, $body)).render();
            });

            $body.off('click', 'div.white-wine-image');
            $body.on('click', 'div.white-wine-image', function()
            {
                (new RecommendedWineControl(strDBTable, 3, $body)).render();
            });

            $body.off('click', 'div.rose-wine-image');
            $body.on('click', 'div.rose-wine-image', function()
            {
                (new RecommendedWineControl(strDBTable, 4, $body)).render();
            });

            $body.off('click', 'div.red-wine-image');
            $body.on('click', 'div.red-wine-image', function()
            {
                (new RecommendedWineControl(strDBTable, 5, $body)).render();
            });

            $body.off('click', 'div.wine-list-image');
            $body.on('click', 'div.wine-list-image', function()
            {
                var strNotice = '';
                if (!fHasCellar)
                {
                    strNotice =
                        '※こちらのリストに掲載されているワインのストックは店舗外のセラーで管理しているため、ご要望のあるお客様は前日までに電話またはメールでご予約ください。また、姉妹店と在庫を共有しているため、売り切れている場合もございます。ご了承ください。';
                }

                (new RestaurantWineList($body, strNotice)).render();
            });
        };
    }

    _registerPhotoLinkHandler(strProfileTable, intFirst)
    {
        this.m_objLinkClickHandler['photo-link'] = function()
        {
            $('.footer').hide();

            var $body             = $('div.body'),
                rgobjPhotoSubMenu =
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
                (new ProfileControl(strProfileTable, $body)).render();
            });

            $body.off('click', 'div.store-interior-image');
            $body.on('click', 'div.store-interior-image', function()
            {
                (new PhotoControl(intFirst, $body)).render(); 
            });

            $body.off('click', 'div.dish-image');
            $body.on('click', 'div.dish-image', function()
            {
                (new PhotoControl((intFirst + 1), $body)).render(); 
            });

            $body.on('click', 'div.magazine-image', function()
            {
                (new PhotoControl((intFirst + 2), $body)).render(); 
            });
        };
    }

    addItem(objItem)
    {
        this.m_objList.addItem(objItem);
    }

    preRender()
    {
        var objDishLink = new AnchorTag('#', 'Dish');
        objDishLink.addAttr('id', 'dish-link'); 
        objDishLink.addClass('eng-font');

        var objDrinkLink = new AnchorTag('#', 'Drink');
        objDrinkLink.addAttr('id', 'drink-link'); 
        objDrinkLink.addClass('eng-font');

        var objWineLink = new AnchorTag('#', 'Wine');
        objWineLink.addAttr('id', 'wine-link'); 
        objWineLink.addClass('eng-font');

        var objEventLink = new AnchorTag('#', 'Event');
        objEventLink.addAttr('id', 'event-link');
        objEventLink.addClass('eng-font');

        var objPhotoLink = new AnchorTag('#', 'Photo');
        objPhotoLink.addAttr('id', 'photo-link');
        objPhotoLink.addClass('eng-font');

        var objMapLink = new AnchorTag('#', 'Map');
        objMapLink.addAttr('id', 'map-link');
        objMapLink.addClass('eng-font');

        var objSiteTopLink = new AnchorTag('#', 'Site Top');
        objSiteTopLink.addAttr('id', 'site-top-lnk');
        objSiteTopLink.addClass('eng-font');

        this.m_objList.addItem(new ListItemTag(objDishLink.toHtml()));
        this.m_objList.addItem(new ListItemTag(objDrinkLink.toHtml()));
        this.m_objList.addItem(new ListItemTag(objWineLink.toHtml()));
        this.m_objList.addItem(new ListItemTag(objEventLink.toHtml()));
        this.m_objList.addItem(new ListItemTag(objPhotoLink.toHtml()));
        this.m_objList.addItem(new ListItemTag(objMapLink.toHtml()));
        this.m_objList.addItem(new ListItemTag(objSiteTopLink.toHtml()));
    }

    renderChildren()
    {
        this.$m_parentContainer.html(this.m_objList.toHtml());
    }

    postRender()
    {
        var self = this;

        var $mainList = this.$m_parentContainer.find('ul.main-list');
        $mainList.find('> li > a').click({ handlers: self.m_objLinkClickHandler }, function(event)
        {
            var $this = $(this);

            var objLinkClickHandler = event.data.handlers[this.id];
            if (objLinkClickHandler)
            {
                objLinkClickHandler();
            }

            $this.closest('ul.main-list').find('> li > a').removeClass('selected-link');
            $this.addClass('selected-link');

            return false;
        });

        $mainList.find('> li > a').removeClass('selected-link');

        this.m_objLinkClickHandler['site-top-lnk'] = function()
        {
            window.location = '../index.php';
        };
    }
}

