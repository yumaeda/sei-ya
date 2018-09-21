var urlQuery = new UrlQuery();

var MobileDishIndexPage =
{
    intSite: parseInt(urlQuery.getValue('site'), 10),
    strId: 'dishPage',

    onPageCreate: function()
    {
        setCurrentLang();

        $content = $('#home div:jqmData(role=content)');
 
        switch (MobileDishIndexPage.intSite)
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

    _generateHeaderHtml: function()
    {
        return('<h1>' + Strings.getString('DISH_STR') + '</h1>');
    },

    _generateContentHtml: function()
    {
        categoryList = new ListTag(false);
        categoryList.addAttr('data-role', 'listview');
        categoryList.addAttr('data-inset', 'true');

        var entreeHtml =
            '<a id="entreeLnk" href="#">' +
                '<img src="../images/80x80/entree.jpg" />' +
                '<h1>' + Strings.getString('APPETIZER_STR') + '</h1>' +
            '</a>';

        var mainHtml =
            '<a id="mainLnk" href="#">' +
                '<img src="../images/80x80/main.jpg" />' +
                '<h1>' +
                    Strings.getString('PASTA_STR') + ' / ' + Strings.getString('DISH_STR') +
                '</h1>' +
            '</a>';

        var dessertHtml =
            '<a id="desertLnk" href="#">' +
                '<img src="../images/80x80/desert.jpg" />' +
                '<h1>' +
                    Strings.getString('GOHAN_STR')   + ' / ' +
                    Strings.getString('DESSERT_STR') + ' / ' +
                    Strings.getString('TEA_STR')     +
                '</h1>' +
            '</a>';

        var courseHtml =
            '<a id="courseLnk" href="#">' +
                '<img src="../images/80x80/course.jpg" />' +
                '<h1>' +
                    Strings.getString('COURSE_STR') +
                '</h1>' +
            '</a>';

        categoryList.addItem(entreeHtml);
        categoryList.addItem(mainHtml);
        categoryList.addItem(dessertHtml);
        categoryList.addItem(courseHtml);

        return(categoryList.toHtml());
    },

    _generateFooterHtml: function()
    {
        var navbarDiv,
            footerList = new ListTag(false);

        footerList.addItem(
            '<a href="index.html" data-icon="false">' +
                '<img src="../images/icons/home.png" />' +
            '</a>');

        navbarDiv = new DivTag(footerList.toHtml());
        navbarDiv.addAttr('data-role', 'navbar');

        return(navbarDiv.toHtml());
    }
};

MobilePage.init(MobileDishIndexPage.strId, true);
MobilePage.setHeaderHtml(MobileDishIndexPage._generateHeaderHtml());
MobilePage.setContentHtml(MobileDishIndexPage._generateContentHtml());
MobilePage.setFooterHtml(MobileDishIndexPage._generateFooterHtml());

$('body').append(MobilePage.toHtml());
$('body').delegate('div:jqmData(role=page)', 'pagecreate', MobileDishIndexPage.onPageCreate);

