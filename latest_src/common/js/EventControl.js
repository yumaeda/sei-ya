//-------------------------------------------------------
//
// EventControl
//
// [Dependencies]
//     HtmlControl.cs
//     TableTag.cs
//     TableRow.cs
//     TableColumn.cs
//
//-------------------------------------------- YuMaeda --
class EventControl extends HtmlControl
{
    constructor($parentContainer, strTableName, intYear)
    {
        super($parentContainer);

        this.m_strTableName = strTableName;
        this.m_intYear      = intYear;
    }

    _getDayOfWeek(intYear, intMonth, intDate)
    {
        var rgstrWeek    = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
            intDayOfWeek = (new Date(intYear, intMonth - 1, intDate)).getDay();

        return rgstrWeek[intDayOfWeek];
    }

    _generateDateLabel(intYear, intMonth)
    {
        var strLabel = (intYear >= 1900) ? intYear : (new Date()).getFullYear();

        if ((intMonth >= 1) && (intMonth <= 12))
        {
            strLabel += ('.' + intMonth);
        }

        return strLabel;
    }

    _toMonthlyHtml(intYear)
    {
        var rgobjEventSubMenu =
        [
            { resId: 'JANUARY_STR',   cssClass: 'january-image'   },
            { resId: 'FEBRUARY_STR',  cssClass: 'february-image'  },
            { resId: 'MARCH_STR',     cssClass: 'march-image'     },
            { resId: 'APRIL_STR',     cssClass: 'april-image'     },
            { resId: 'MAY_STR',       cssClass: 'may-image'       },
            { resId: 'JUNE_STR',      cssClass: 'june-image'      },
            { resId: 'JULY_STR',      cssClass: 'july-image'      },
            { resId: 'AUGUST_STR',    cssClass: 'august-image'    },
            { resId: 'SEPTEMBER_STR', cssClass: 'september-image' },
            { resId: 'OCTOBER_STR',   cssClass: 'october-image'   },
            { resId: 'NOVEMBER_STR',  cssClass: 'november-image'  },
            { resId: 'DECEMBER_STR',  cssClass: 'december-image'  }
        ];

        var headerLabel  = 'Event&nbsp;{0}'.format(this._generateDateLabel(intYear, 0)),
            subMenuTable = new SubMenuTable(headerLabel, rgobjEventSubMenu);

        return subMenuTable.toHtml();
    }

    _toDailyHtml(intYear, intMonth)
    {
        var monthLabel = this._generateDateLabel(intYear, intMonth),
            tableTag   = new TableTag();

        tableTag.addClass('auto-horizontal-margin width-semi-full no-border-spacing');

        var labelRow = new TableRow(),
            labelCol = new TableColumn(monthLabel),
            lineRow  = new TableRow(),
            lineCol  = new TableColumn('<hr /><br />');

        labelCol.addAttr('colspan', '4');
        labelCol.addClass('eng-font');
        labelRow.addColumn(labelCol);
        tableTag.head.addRow(labelRow);

        lineCol.addAttr('colspan', '4');
        lineRow.addColumn(lineCol);
        tableTag.head.addRow(lineRow);

        var eventDictionary = {},
            self            = this;

        $.ajax(
        { 
            url: './get_items.php', 
            data:
            {
                dbTable: self.m_strTableName,
                orderBy: 'year DESC, date ASC'
            },
            async: false,
            dataType: 'json', 
            success: function(data)
            {
                var objEvent,
                    cEvent = data.length;

                for (var i = 0; i < cEvent; ++i)
                {
                    objEvent = data[i];

                    if ((objEvent.year == intYear) && (objEvent.month == intMonth))
                    {
                        eventDictionary[objEvent.date] = objEvent.description;
                    }
                }
            },

            error: function() {}
        });

        var lastDateOfMonth = (new Date(intYear, intMonth, 0)).getDate();
        for (var intDate = 1; intDate <= lastDateOfMonth; ++intDate)
        {
            var dayOfWeekHtml   = this._getDayOfWeek(intYear, intMonth, intDate),
                descriptionHtml = eventDictionary[intDate] ?
                '<span>{0}</span>'.format(eventDictionary[intDate]) :
                '';

            var eventRow     = new TableRow(),
                dateCol      = new TableColumn(intDate),
                dayOfWeekCol = new TableColumn('&nbsp;/&nbsp;{0}'.format(dayOfWeekHtml));

            eventRow.addClass('event-date-border text-small');
            dateCol.addClass('eng-font text-right event-date-column');
            dayOfWeekCol.addClass('eng-font event-week-column');

            if (dayOfWeekHtml == 'Sun')
            {
                dateCol.addClass('color-sunday');
                dayOfWeekCol.addClass('color-sunday');
            }
            else if (dayOfWeekHtml == 'Sat')
            {
                dateCol.addClass('color-saturday');
                dayOfWeekCol.addClass('color-saturday');
            }

            eventRow.addColumn(dateCol);
            eventRow.addColumn(dayOfWeekCol);
            eventRow.addColumn(new TableColumn(descriptionHtml));

            tableTag.body.addRow(eventRow);
        }

        return tableTag.toHtml();
    }

    renderChildren()
    {
        var self = this;

        this.$m_parentContainer.html(this._toMonthlyHtml(this.m_intYear));

        this.$m_parentContainer.on('click', '.january-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 1));
        });

        this.$m_parentContainer.on('click', '.february-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 2));
        });

        this.$m_parentContainer.on('click', '.march-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 3));
        });

        this.$m_parentContainer.on('click', '.april-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 4));
        });

        this.$m_parentContainer.on('click', '.may-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 5));
        });

        this.$m_parentContainer.on('click', '.june-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 6));
        });

        this.$m_parentContainer.on('click', '.july-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 7));
        });

        this.$m_parentContainer.on('click', '.august-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 8));
        });

        this.$m_parentContainer.on('click', '.september-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 9));
        });

        this.$m_parentContainer.on('click', '.october-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 10));
        });

        this.$m_parentContainer.on('click', '.november-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 11));
        });

        this.$m_parentContainer.on('click', '.december-image', function()
        {
            $('div.back-link-pane').css('visibility', 'visible');
            self.$m_parentContainer.html(self._toDailyHtml(self.m_intYear, 12));
        });
    }
}

