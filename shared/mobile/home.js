var urlQuery = new UrlQuery();

var MobileIndexPage =
{
    intSite: parseInt(urlQuery.getValue('site'), 10),
    strId: 'home',
    $content: null,

    onPageCreate: function()
    {
        loadResourceStrings();

        $content = $('#home div:jqmData(role=content)');
        $content.find('a').click(MobileIndexPage.onLinkClick);
 
        switch (MobileIndexPage.intSite)
        {
        case 1:
            $('div.ui-body-z').css('background-color', 'rgb(64, 28, 32)');
            break;
        case 2:
            $('div.ui-body-z').css('background-color', '#463527');
            break;
        default:
            break;
        }
    },

    onLinkClick: function()
    {
        switch (this.id)
        {
        case 'eventLnk':
            MobileIndexPage.openEventPage();
            break;
        case 'photoLnk':
            MobileIndexPage.openPhotoPage();
            break;
        case 'mapLnk':
            MobileIndexPage.openMapPage();
            break;
        case 'dishLnk':
            window.location = 'dishes.html?site=' + MobileIndexPage.intSite;
            break;
        default:
            alert(this.id);
            break;
        }
    },

    _generateHeaderHtml: function()
    {
        var html = '';

        switch (MobileIndexPage.intSite)
        {
        case 1:
            html = '<img src="../images/mitsugetsu_logo_mobile.png" />';
            break;
        case 2:
            html = '<img src="../images/ofuro_logo_mobile.gif" />';
            break;
        default:
            break;
        }

        return(html);
    },

    _generateContentHtml: function()
    {
        var html =
            '<div class="ui-grid-b">' +
                '<div class="ui-block-a">' +
                    MobileIndexPage._generateImgLinkHtml('dishLnk', '#', '../images/80x80/dish.jpg') +
                '</div>' +
                '<div class="ui-block-b">' +
                    MobileIndexPage._generateImgLinkHtml('drinkLnk', '#', '../images/80x80/drink.png') +
                '</div>' +
                '<div class="ui-block-c">' +
                    MobileIndexPage._generateImgLinkHtml('wineLnk', '#', '../images/80x80/wine.jpg') +
                '</div>' +
                '<div class="ui-block-a">' +
                    MobileIndexPage._generateImgLinkHtml('eventLnk', '#', '../images/80x80/event.png') +
                '</div>' +
                '<div class="ui-block-b">' +
                    MobileIndexPage._generateImgLinkHtml('photoLnk', '#', '../images/80x80/photo.png') +
                '</div>' +
                '<div class="ui-block-c">' +
                    MobileIndexPage._generateImgLinkHtml('mapLnk', '#', '../images/80x80/map.png') +
                '</div>' +
                '<div class="ui-block-a">' +
                    MobileIndexPage._generateImgLinkHtml('languageLnk', '#', '../images/80x80/language.png') +
                '</div>' +
            '</div>';

        return(html);
    },

    _generateFooterHtml: function()
    {
        var navbarDiv,
            footerList = new ListTag(false);

        footerList.addItem(new ListItemTag(
            '<a href="tel:03-6423-0844" data-icon="false">' +
                '<img src="../images/icons/phone.png" />' +
            '</a>'));

        footerList.addItem(new ListItemTag(
            '<a href="mailto:info@mitsugetsu.com" data-icon="false">' +
                '<img src="../images/icons/mail.png" />' +
            '</a>'));

        footerList.addItem(new ListItemTag(
            '<a href="index.html" data-icon="false">' +
                '<img src="../images/icons/home.png" />' +
            '</a>'));

        navbarDiv = new DivTag(footerList.toHtml());
        navbarDiv.addAttr('data-role', 'navbar');

alert(navbarDiv.toHtml());
        return navbarDiv.toHtml();
    },

    _generateImgLinkHtml: function(strId, strHref, strImgSrc)
    {
        var innerHtml =
            '<img src="' + strImgSrc + '" />';

        var imgLnk = new AnchorTag(strHref, innerHtml);
        imgLnk.addAttr('id', strId);

        return(imgLnk.toHtml());
    },

    openEventPage: function()
    {
        var intCategory,
            headerHtml = '<h1>' + Strings.getString('EVENT_STR') + '</h1>',
            footerHtml = MobileIndexPage._generateFooterHtml();

        switch (MobileIndexPage.intSite)
        {
        case 1:
            intCategory = 2;
            break;
        case 2:
            intCategory = 4;
            break;
        default:
            break;
        }

        MobileIndexPage._openMobilePage('eventPage', headerHtml, '', footerHtml);

        var $eventContent = $('#eventPage div:jqmData(role=content)');
        if ($eventContent.length)
        {
            PhotoContents.onInit(intCategory, $eventContent, 1 /* cCol */);
        }
    },

    openPhotoPage: function()
    {
        var intCategory,
            headerHtml = '<h1>' + Strings.getString('PHOTO_STR') + '</h1>',
            footerHtml = MobileIndexPage._generateFooterHtml();

        switch (MobileIndexPage.intSite)
        {
        case 1:
            intCategory = 1;
            break;
        case 2:
            intCategory = 3;
            break;
        default:
            break;
        }

        MobileIndexPage._openMobilePage('photoPage', headerHtml, '', footerHtml);

        var $photoContent = $('#photoPage div:jqmData(role=content)');
        if ($photoContent.length)
        {
            PhotoContents.onInit(intCategory, $photoContent, 2 /* cCol */);
        }
    },

    openMapPage: function()
    {
        var headerHtml = '<h1>' + Strings.getString('MAP_STR') + '</h1>',
            footerHtml = MobileIndexPage._generateFooterHtml(),
            mapControl = new MapControl();

        switch (MobileIndexPage.intSite)
        {
        case 1:
            break;
        case 2:
            mapControl.coordinate    = '35.665859,139.640023';
            mapControl.subCoordinate = '35.673343,139.710388';
            mapControl.marker        = 'q=%E5%B1%85%E9%85%92%E5%B1%8B%E3%80%80%E3%81%8A%E3%81%B5%E3%82%8D';
            mapControl.coordinateId  = '6936012129984331143';
            mapControl.screenSpan    = '0.334679,0.676346';
            break;
        default:
            break;
        }

        MobileIndexPage._openMobilePage('mapPage', headerHtml, mapControl.toHtml(), footerHtml);
    },

    _openMobilePage: function(strId, headerHtml, contentHtml, footerHtml)
    {
        var $mapPage = $('#' + strId);
        if (!$mapPage.length)
        {
            MobilePage.init(strId, false);
            MobilePage.setHeaderHtml(headerHtml);
            MobilePage.setContentHtml(contentHtml);
            MobilePage.setFooterHtml(footerHtml);

            $('body').append(MobilePage.toHtml());
        }

        $.mobile.changePage($('#' + strId));
    }
};


MobilePage.init(MobileIndexPage.strId, true);
MobilePage.setHeaderHtml(MobileIndexPage._generateHeaderHtml());
MobilePage.setContentHtml(MobileIndexPage._generateContentHtml());
MobilePage.setFooterHtml(MobileIndexPage._generateFooterHtml());

$('body').append(MobilePage.toHtml());
$('body').delegate('div:jqmData(role=page)', 'pagecreate', MobileIndexPage.onPageCreate);

