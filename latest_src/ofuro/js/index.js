function renderHeader()
{
    var html =
        '<a href="./index.html" class="header__link">' +
            '<figure class="logo__container">' +
                '<img src="images/logo.png" class="logo__image" />' +
                '<figcaption class="logo__caption">Since 1994</figcaption>' +
            '</figure>' +
        '</a>';

    $('header.header').html(html);
}

function renderSlideShow()
{
    var pageUrl = 'http://sei-ya.jp/ofuro/slideshow.html?siteName=ofuro',
        imgHtml = '<iframe class="slideshow__container" src="{0}" />'.format(pageUrl);

    $('div.body').html(imgHtml);
}

function renderFooter()
{
    var contactInfo = new ContactInfo($('footer.footer'));

    contactInfo.email       = 'ofuro@sei-ya.jp';
    contactInfo.phoneNumber = '03-5300-6007';
    contactInfo.faxNumber   = '03-3325-4989';
    contactInfo.address     = 'Anshin-do building B1F 4-45-10 Akazutsumi, Setagaya-ku, Tokyo 156-0044';
    contactInfo.openingHour = '17:00～25:00(Sun～Thr) 17:00～27:00(Fri～Sat)';
    contactInfo.closedOn    = 'Tuesday';
    contactInfo.facebookUrl = 'https://www.facebook.com/pages/%E5%B1%85%E9%85%92%E5%B1%8B-%E3%81%8A%E3%81%B5%E3%82%8D/384695951545320';
    contactInfo.twitterUrl  = 'https://twitter.com/sagaraburo';
    contactInfo.render();
}

$(document).ready(function()
{
    renderHeader();
    (new OfuroMenu($('aside.menu'))).render();

    renderSlideShow();
    renderFooter();
});

