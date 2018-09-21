$(document).ready(function()
{
    var wineMgr = new RecommendedWineManager();

    wineMgr.siteName      = 'mitsu-getsu';
    wineMgr.databaseTable = 'mitsugetsu_recommended_wines'.format(wineMgr.siteName);
    //wineMgr.siteName      = 'ofuro';
    //wineMgr.databaseTable = 'ofuro_recommended_wines'.format(wineMgr.siteName);
    wineMgr.postRender();

    var imgTag = new ImageTag('http://sei-ya.jp/{0}/images/adminHome.png'.format(wineMgr.siteName));
    imgTag.addClass('adminHomeImg');

    $('header').html('<a href="http://sei-ya.jp/admin_home.html">{0}</a>'.format(imgTag.toHtml()));
});

