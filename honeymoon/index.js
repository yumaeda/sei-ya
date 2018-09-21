var WhatsNewContents =
{
    onInit: function(dbTableName, $parentContainer, headerText, intYear, intMonth, curDate)
    {
        var tableTag = new TableTag();
        tableTag.addClass('noBorderSpacing');

        if (intYear === 0)
        {
            intYear  = (new Date()).getFullYear();
        }

        if (intMonth === 0)
        {
            intMonth = (new Date()).getMonth() + 1;
        }

        var lastDateOfMonth = (new Date(intYear, intMonth, 0)).getDate();



            whatsNewDictionary = {};

        $.ajax(
        { 
            url: './get_items.php', 
            data:
            {
                dbTable:   dbTableName,
                condition: '(year = {0}) AND (month = {1})'.format(intYear, intMonth),
                orderBy:   'date ASC'
            },
            async: false,
            dataType: 'json', 
            success: function(data)
            {
                var objWhatsNew,
                    cWhatsNew = data.length;

                for (var i = 0; i < cWhatsNew; ++i)
                {
                    objWhatsNew = data[i];
                    whatsNewDictionary[objWhatsNew.date] = objWhatsNew.description;
                }
            },

            error: function() {}
        });

        for (var intDate = 1; intDate <= lastDateOfMonth; ++intDate)
        {
            var strDayOfWeek    = getDayOfWeek(intYear, intMonth, intDate),
                descriptionHtml = whatsNewDictionary[intDate] ?
                    whatsNewDictionary[intDate] :
                    '&nbsp;';

            var tableRow = new TableRow();
            tableRow.addClass('dateBorder textSmall');

            var dateCol = new TableColumn(intDate),
                dayCol  = new TableColumn('&nbsp;/&nbsp;{0}'.format(strDayOfWeek)),
                descCol = new TableColumn(descriptionHtml);

            dateCol.addClass('engFont textRight dateColumn');
            dayCol.addClass('engFont weekColumn');
            descCol.addClass('infoColumn');

            if (strDayOfWeek == rgstrWeek[0])
            {
                dateCol.addClass('colorSunday');
                dayCol.addClass('colorSunday');
            }
            else if (strDayOfWeek == rgstrWeek[6])
            {
                dateCol.addClass('colorSaturday');
                dayCol.addClass('colorSaturday');
            }

            tableRow.addColumn(dateCol);
            tableRow.addColumn(dayCol);
            tableRow.addColumn(descCol);

            tableTag.body.addRow(tableRow);
        }

        var headerDivHtml = '<div class="engFont textSmallMedium">{0}&nbsp;{1}</div>'.format(
                generateDateLabel(intYear, intMonth),
                headerText);

        var headerDiv = new DivTag(headerDivHtml),
            bodyDiv   = new DivTag(tableTag.toHtml());

        headerDiv.addClass('whatsNewHeader contentsWidth hMarginAuto');
        bodyDiv.addClass('whatsNewContainer contentsWidth hMarginAuto');
        $parentContainer.html(headerDiv.toHtml() + bodyDiv.toHtml());

        if (curDate > 0)
        {
            // Scroll down to today.
            $container = $parentContainer.find('div.whatsNewContainer');
            $scrollTo  = $($container.find('table tr').get(curDate - 1));
            $container.animate(
            {
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            }, 'slow');
        }
    }
};


var HoneymoonHomePage =
{
    onReady: function()
    {
        document.title = Constants['HONEYMOON_PAGE_TITLE'];
        loadResourceStrings('{0}/honeymoon/resources'.format(getRootFolderUrl()));

        ImageSlide.$parentContainer = $('div#imgContainer');
        var timerId = ImageSlide.start();

        var curMonth  = new Date();
        WhatsNewContents.onInit('honeymoon_tasting_info', $('div.contents > div#currentMonthDiv'), Constants['en']['TASTING_INFO_STR'], curMonth.getFullYear(), curMonth.getMonth() + 1, curMonth.getDate());
        curMonth.setMonth(curMonth.getMonth() + 1);
        WhatsNewContents.onInit('honeymoon_tasting_info', $('div.contents > div#nextMonthDiv'), Constants['en']['TASTING_INFO_STR'], curMonth.getFullYear(), curMonth.getMonth() + 1, 0);

        $('div.container').on('click', 'div#exitBtn', function()
        {
            window.location.replace('http://sei-ya.jp');
        });
    }
};

$(document).ready(HoneymoonHomePage.onReady);

