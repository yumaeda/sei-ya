var $contents = null;

var _generateCourseTableHtml = function(rgobjCourse, strCourseName, intPrice)
    {
        var cCourse      = rgobjCourse.length,
            objCourse    = null,
            titleHtml    = '',
            dishNameHtml = '',
            tableTag     = new TableTag(),
            titleRow     = new TableRow(),
            priceRow     = new TableRow();

        tableTag.addClass('hMarginAuto contentsWidth paddingBottomLarge');

        titleHtml =
            '<span class="textLarge">{0}</span><span class="textMedium">{1}</span>'.format(
                strCourseName,
                Constants['COURSE_TITLE_POSTFIX']);

        titleRow.addClass('paddingBottomMedium');
        var titleCol = new TableColumn(titleHtml);
        titleCol.addClass('textCenter');
        titleRow.addColumn(titleCol);

        priceRow.addClass('paddingTopLarge paddingBottomMedium');
        var priceCol = new TableColumn(WineUtility.convertToPriceText(intPrice));
        priceCol.addClass('textCenter textMedium engFont');
        priceRow.addColumn(priceCol);

        tableTag.head.addRow(titleRow);
        tableTag.foot.addRow(priceRow);

        for (var i = 0; i < cCourse; ++i)
        {
            objCourse = rgobjCourse[i];
            dishNameHtml = '<span class="textSmall">{0}</span>'.format(objCourse.loc_name);

            var tableRow = new TableRow(),
                tableCol = new TableColumn(dishNameHtml);

            tableRow.addClass('paddingTopMedium');
            tableCol.addClass('textCenter paddingTopMedium');
            tableRow.addColumn(tableCol);
            tableTag.body.addRow(tableRow);
        }

        return tableTag.toHtml();
    },

    getCourseContentHtml = function()
    {
        var html =
            _generateCourseTableHtml(DishMenu.rgobjCourseMitsu, Constants['MITSU_TITLE'], 3980) +
            _generateCourseTableHtml(DishMenu.rgobjCourseGetsu, Constants['GETSU_TITLE'], 5980) +
            '<p class="textSmall textCenter hMarginAuto" style="width:50%;">' +
                Constants['COURSE_DESCRIPTION'] +
            '</p>';

        return html;
    };


//-------------------------------------------------------
// MitsugetsuMenu
//-------------------------------------------- YuMaeda --

function MitsugetsuMenu($parentContainer)
{
    // Call the parent constructor.
    BaseMenu.call(this, $parentContainer);

    this.mainMenuClickHandlers['drinkLnk'] = function()
    {
        // Creates a back button.
        _createBackButtonPane('drinkLnk', Constants['en']['DRINK_STR']);

        var rgobjDrinkSubMenu =
        [
            { resId: 'BEER_STR',         cssClass: 'beerImage'        },
            { resId: 'DIGESTIF_STR',     cssClass: 'digestifImage'    },
            { resId: 'OTHER_DRINKS_STR', cssClass: 'otherDrinksImage' }
        ];

        $contents.html(generateSubMenuTableHtml(Constants['en']['DRINK_STR'], rgobjDrinkSubMenu));

        $contents.find('div.digestifImage').on('click', function()
        {
            BrandyContents.onInit('mitsugetsu_drinks');
        });

        $contents.find('div.beerImage').on('click', function()
        {
            BeerContents.onInit('mitsugetsu_drinks');
        });

        $contents.find('div.otherDrinksImage').on('click', function()
        {
            DrinkContents.onInit('mitsugetsu_drinks');
        });
    };
}

// Inherit BaseMenu.
MitsugetsuMenu.prototype = new BaseMenu();
MitsugetsuMenu.prototype.constructor = MitsugetsuMenu;


MitsugetsuMenu.prototype.addDrinkMenu = function()
{
    var listItemTag, anchorTag;

    anchorTag = new AnchorTag('#', Strings.getString('DRINK_STR'));
    anchorTag.addAttr('id', 'drinkLnk');
    anchorTag.addClass('engFont');
    listItemTag = new ListItemTag(anchorTag.toHtml());

    this.mainMenu.addItem(listItemTag);
};

MitsugetsuMenu.prototype.addEventMenu = function()
{
    var listItemTag, anchorTag;

    anchorTag = new AnchorTag('#', Constants['en']['EVENT_STR']);
    anchorTag.addAttr('id', 'eventLnk');
    anchorTag.addClass('engFont');
    listItemTag = new ListItemTag(anchorTag.toHtml());

    this.mainMenu.addItem(listItemTag);
};

MitsugetsuMenu.prototype.addPhotoMenu = function()
{
    var listItemTag, anchorTag;

    anchorTag = new AnchorTag('#', Constants['en']['PHOTO_STR']);
    anchorTag.addAttr('id', 'photoLnk');
    anchorTag.addClass('engFont');
    listItemTag = new ListItemTag(anchorTag.toHtml());

    this.mainMenu.addItem(listItemTag);
};

MitsugetsuMenu.prototype.addMapMenu = function()
{
    var listItemTag, anchorTag;

    anchorTag = new AnchorTag('#', Constants['en']['MAP_STR']);
    anchorTag.addAttr('id', 'mapLnk');
    anchorTag.addClass('engFont');
    listItemTag = new ListItemTag(anchorTag.toHtml());

    this.mainMenu.addItem(listItemTag);
};

MitsugetsuMenu.prototype.addWineMenu = function()
{
    var listItemTag, anchorTag;

    anchorTag = new AnchorTag('#', Constants['en']['WINE_STR']);
    anchorTag.addAttr('id', 'wineLnk'); 
    anchorTag.addClass('engFont');
    listItemTag = new ListItemTag(anchorTag.toHtml());

    this.mainMenu.addItem(listItemTag);
};

MitsugetsuMenu.prototype.addDishMenu = function()
{
    var anchorTag, listItemTag;

    anchorTag = new AnchorTag('#', Constants['en']['DISH_STR']);
    anchorTag.addAttr('id', 'dishLnk');
    anchorTag.addClass('engFont');
    listItemTag = new ListItemTag(anchorTag.toHtml());

    this.mainMenu.addItem(listItemTag);
};
       

$(document).ready(MitsugetsuHomePage.onReady);

