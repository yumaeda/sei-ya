//-------------------------------------------------------
//
// ProfileControl
//
// [Dependencies]
//     IntlHtmlControl.cs
//
//-------------------------------------------- YuMaeda --
class ProfileControl extends IntlHtmlControl 
{
    constructor(strTableName, $parentContainer)
    {
        super($parentContainer);

        super.addString('HOME_TOWN_LABEL', '出身地　/', 'Home Town /');
        super.addString('CAREER_HISTORY_LABEL', '職　歴　/', 'Career History /');
        super.addString('FAVORITE_LABEL', '趣　味　/', 'Favorite /');

        this.m_strTableName = strTableName;
    }

    _generateTable(objProfile)
    {
        var nameHtml      = '<span class="text-large">{0}</span>'.format(objProfile.name),
            phoneticHtml  = '<span class="text-small">&nbsp;&nbsp;({0})</span>'.format(objProfile.phonetic),
            innerTable    = new TableTag(),
            positionRow   = new TableRow(),
            nameRow       = new TableRow(),
            lineRow       = new TableRow(),
            prefectureRow = new TableRow(),
            careerRow     = new TableRow(),
            favoriteRow   = new TableRow(),

            positionCol        = new TableColumn(objProfile.position),
            nameCol            = new TableColumn(nameHtml + phoneticHtml),
            lineCol            = new TableColumn('<hr class="line-thin" />'),
            prefectureLabelCol = new TableColumn(this.getString('HOME_TOWN_LABEL')),
            prefectureCol      = new TableColumn(objProfile.prefecture),
            careerLabelCol     = new TableColumn(this.getString('CAREER_HISTORY_LABEL')),
            careerCol          = new TableColumn(objProfile.career_history),
            favoriteLabelCol   = new TableColumn(this.getString('FAVORITE_LABEL')),
            favoriteCol        = new TableColumn(objProfile.favorite);

        positionCol.addAttr('colspan', '2');
        positionCol.addClass('text-small');
        nameCol.addAttr('colspan', '2');
        lineCol.addAttr('colspan', '2');
        prefectureRow.addClass('text-small padding-top-small');
        prefectureLabelCol.addClass('label-column');
        prefectureCol.addAttr('colspan', '2');
        careerRow.addClass('text-small padding-top-small');
        careerLabelCol.addClass('label-column');
        favoriteRow.addClass('text-small padding-top-small');
        favoriteLabelCol.addClass('label-column');

        positionRow.addColumn(positionCol);
        nameRow.addColumn(nameCol);
        lineRow.addColumn(lineCol);
        prefectureRow.addColumn(prefectureLabelCol);
        prefectureRow.addColumn(prefectureCol);
        careerRow.addColumn(careerLabelCol);
        careerRow.addColumn(careerCol);
        favoriteRow.addColumn(favoriteLabelCol);
        favoriteRow.addColumn(favoriteCol);

        innerTable.body.addRow(positionRow);
        innerTable.body.addRow(nameRow);
        innerTable.body.addRow(lineRow);
        innerTable.body.addRow(prefectureRow);
        innerTable.body.addRow(careerRow);
        innerTable.body.addRow(favoriteRow);

        var imgTag = new ImageTag('images/profiles/' + objProfile.filename);
        imgTag.addClass('profile-image');

        // Creates an outer table.
        var tableTag = new TableTag(),
            tableRow = new TableRow(),
            imgCol   = new TableColumn(imgTag.toHtml());

        tableTag.addClass('auto-horizontal-margin contents-width margin-top-small margin-bottom-large text-left');
        imgCol.addAttr('style', 'padding-right:15px;');

        tableRow.addColumn(imgCol);
        tableRow.addColumn(new TableColumn(innerTable.toHtml()));
        tableTag.body.addRow(tableRow);

        return tableTag.toHtml();
    }

    renderChildren()
    {
        // Set a header.
        var tableTag = new TableTag(),
            titleRow = new TableRow(),
            lineRow  = new TableRow(),
            titleCol = new TableColumn('Staff'),
            lineCol  = new TableColumn('<hr /><br />'),
            self     = this;

        tableTag.addClass('auto-horizontal-margin width-semi-full text-left');
        titleCol.addAttr('colspan', '2');
        titleCol.addClass('eng-font');
        lineCol.addAttr('colspan', '2');

        titleRow.addColumn(titleCol);
        lineRow.addColumn(lineCol);

        tableTag.head.addRow(titleRow);
        tableTag.head.addRow(lineRow);
        this.$m_parentContainer.html(tableTag.toHtml());

        $.ajax(
        { 
            url: './get_items.php', 
            dataType: 'json', 
            data:
            {
                dbTable: self.m_strTableName,
                orderBy: 'sort_order'
            },

            success: function(data)
            { 
                var profilesHtml = '',
                    cData        = data.length;

                for (var i = 0; i < cData; ++i)
                {
                    profilesHtml += self._generateTable(data[i]);
                }

                self.$m_parentContainer.append(profilesHtml);
            },

            error: function() {}
        });
    }
}

