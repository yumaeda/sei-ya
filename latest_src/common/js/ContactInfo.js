//-------------------------------------------------------
//
// ContactInfo
//
//-------------------------------------------- YuMaeda --
class ContactInfo extends HtmlControl
{
    constructor($parentContainer)
    {
        super($parentContainer);

        this.m_strEmail           = '';
        this.m_strPhoneNumber     = '';
        this.m_strFaxNumber       = '';
        this.m_strAddress         = '';
        this.m_strOpeningHour     = '';
        this.m_strClosedOn        = '';
        this.m_strFacebookUrl     = '';
        this.m_strTwitterUrl      = '';
        this.m_strMailMagazineUrl = '';
        this.m_rgobjAdvertisement = [];
    }

    set email(value)           { this.m_strEmail = value; }
    set phoneNumber(value)     { this.m_strPhoneNumber = value; }
    set faxNumber(value)       { this.m_strFaxNumber = value; }
    set address(value)         { this.m_strAddress = value; }
    set openingHour(value)     { this.m_strOpeningHour = value; }
    set closedOn(value)        { this.m_strClosedOn = value; }
    set facebookUrl(value)     { this.m_strFacebookUrl = value; }
    set twitterUrl(value)      { this.m_strTwitterUrl = value; }
    set mailMagazineUrl(value) { this.m_strMailMagazineUrl = value; }
    set advertisements(value)  { this.m_rgobjAdvertisement = value; }

    _generateLinkImageHtml(url, imgName)
    {
        var html = '';

        if (url)
        {
            var imgTag, anchorTag;

            var imgTag    = new ImageTag('images/icons/{0}'.format(imgName)),
                anchorTag = new AnchorTag(url, imgTag.toHtml());

            anchorTag.addAttr('rel', 'nofollow');
            html = anchorTag.toHtml();
        }

        return html;
    }

    _generateInnerTableHtml()
    {
        var innerTable = new TableTag(),
            numberRow  = new TableRow(),
            emailRow   = new TableRow();

        var telLabelCol = new TableColumn('Tel/ '),
            telCol      = new TableColumn('<a href="tel:{0}">{0}</a>'.format(this.m_strPhoneNumber)),
            faxLabelCol = new TableColumn('Fax/ '),
            faxCol      = new TableColumn(this.m_strFaxNumber); 

        innerTable.addClass('footer__table__container');
        telLabelCol.addClass('footer__table__label');
        faxLabelCol.addClass('footer__table__label');
        numberRow.addColumn(telLabelCol);
        numberRow.addColumn(telCol);
        numberRow.addColumn(faxLabelCol);
        numberRow.addColumn(faxCol);

        var anchorTag     = new AnchorTag('mailto:{0}'.format(this.m_strEmail), this.m_strEmail),
            emailLabelCol = new TableColumn('Email/ '),
            emailCol      = new TableColumn(anchorTag.toHtml());

        emailLabelCol.addClass('footer__table__label');
        emailCol.addAttr('colspan', '3');
        emailRow.addColumn(emailLabelCol);
        emailRow.addColumn(emailCol);

        innerTable.body.addRow(numberRow);
        innerTable.body.addRow(emailRow);

        if (this.m_strOpeningHour && this.m_strClosedOn)
        {
            var openHourRow      = new TableRow(),
                openHourLabelCol = new TableColumn('Open/ '),
                openHourCol      = new TableColumn(this.m_strOpeningHour);
            
            openHourLabelCol.addClass('footer__table__label');
            openHourCol.addAttr('colspan', '3');
            openHourRow.addColumn(openHourLabelCol);
            openHourRow.addColumn(openHourCol);

            var closedDayRow      = new TableRow(),
                closedDayLabelCol = new TableColumn('Close/ '),
                closedDayCol      = new TableColumn(this.m_strClosedOn);

            closedDayLabelCol.addClass('footer__table__label');
            closedDayCol.addAttr('colspan', '3');
            closedDayRow.addColumn(closedDayLabelCol);
            closedDayRow.addColumn(closedDayCol);

            innerTable.body.addRow(openHourRow);
            innerTable.body.addRow(closedDayRow);
        }

        return innerTable.toHtml();
    }

    renderChildren()
    {
        var tableTag = new TableTag();
        tableTag.addClass('footer__table');

        var addressRow = new TableRow(),
            addressCol = new TableColumn(this.m_strAddress);
        addressCol.addAttr('colspan', '3');
        addressCol.addClass('footer__table__address__column');
        addressRow.addColumn(addressCol);

        var childTableRow = new TableRow(),
            childTableCol = new TableColumn(this._generateInnerTableHtml());
        childTableCol.addAttr('colspan', '3');
        childTableRow.addColumn(childTableCol);

        tableTag.body.addRow(addressRow);
        tableTag.body.addRow(childTableRow);

        if (this.comment)
        {
            var commentRow = new TableRow(),
                commentCol = new TableColumn(this.comment);

            commentCol.addAttr('colspan', '3');
            commentRow.addColumn(commentCol);

            tableTag.body.addRow(commentRow);
        }

        var linkImageHtml = '{0}{1}'.format(
            this._generateLinkImageHtml(this.m_strMailMagazineUrl, 'mailmagazine.jpg'),
            this._generateLinkImageHtml(this.m_strFacebookUrl, 'facebook.png'),
            this._generateLinkImageHtml(this.m_strTwitterUrl, 'twitter.jpg'));

        var linkImgRow   = new TableRow(),
            copyRightRow = new TableRow(),
            linkImgCol   = new TableColumn(linkImageHtml),
            copyRightCol = new TableColumn('Copyright &copy; 2017 SEI-YA co.ltd. All rights reserved.');

        linkImgCol.addClass('footer__table__sns__column');
        linkImgCol.addAttr('colspan', '3');
        copyRightCol.addAttr('colspan', '3');
        copyRightCol.addClass('copyright');

        linkImgRow.addColumn(linkImgCol);
        copyRightRow.addColumn(copyRightCol);

        tableTag.body.addRow(linkImgRow);
        tableTag.body.addRow(copyRightRow);

        // Render advertisement images.
        var objAd = null,
            cAd   = this.m_rgobjAdvertisement.length;
        for (var i = 0; i < cAd; ++i)
        {
            objAd = this.m_rgobjAdvertisement[i];

            var tableRow = new TableRow(),
                tableCol = new TableColumn('<a href="{0}"><img style="width:350px;" src="{1}" /></a>'.format(objAd.linkUrl, objAd.imgUrl));
            
            tableCol.addAttr('colspan', '3');
            tableRow.addColumn(tableCol);

            tableTag.body.addRow(tableRow);
        }

        this.$m_parentContainer.html(tableTag.toHtml());
    }
}

