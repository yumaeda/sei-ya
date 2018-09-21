function renderHeader()
{
    var html =
        '<a href="./index.html" class="header__link">' +
            '<figure class="logo__container">' +
                '<img src="images/logo.png" class="logo__image" />' +
                '<figcaption class="logo__caption">Since 2007</figcaption>' +
            '</figure>' +
        '</a>';

    $('header.header').html(html);
}

function renderSlideShow()
{
    var pageUrl = 'http://sei-ya.jp/mitsu-getsu/slideshow.html?siteName=mitsu-getsu',
        imgHtml = '<iframe class="slideshow__container" src="{0}" />'.format(pageUrl);

    $('div.body').html(imgHtml);
}

function renderFooter()
{
    var contactInfo = new ContactInfo($('footer.footer'));

    contactInfo.email       = 'mitsu-getsu@sei-ya.jp';
    contactInfo.phoneNumber = '03-6413-1810';
    contactInfo.faxNumber   = '03-6413-9736';
    contactInfo.address     = '1F 2-13-1 Kyodo, Setagaya-ku, Tokyo 156-0052';
    contactInfo.openingHour = '17:00～24:00(Sun～Thr) 17:00～26:00(Fri～Sat)';
    contactInfo.closedOn    = 'Tuesday';
    contactInfo.facebookUrl = 'https://www.facebook.com/pages/%E5%89%B5%E4%BD%9C%E5%92%8C%E9%A3%9F%E3%81%A8%E3%83%AF%E3%82%A4%E3%83%B3-%E8%9C%9C%E6%9C%88/245358198909164';
    contactInfo.render();
}

$(document).ready(function()
{
    renderHeader();
    (new MitsuGetsuMenu($('aside.menu'))).render();

    renderSlideShow();
    renderFooter();
});
