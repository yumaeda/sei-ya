var DailyMenuManager =
{
    $form: null,
    $menuTable: null,
    dbTable: 'ofuro_dishes',
    cItem: -1,

    onReady: function()
    {
        loadResourceStrings('{0}/ofuro/resources'.format(getRootFolderUrl()));
        document.title = Strings.getString('MODIFY_DAILY_MENU_STR');

        DailyMenuManager.cItem = 0;
        DailyMenuManager.createDateHeader();
        DailyMenuManager.createMenuTable();
    },

    tryLoadItems: function()
    {
        $.ajax(
        { 
            url: '../get_items.php',
            cache: false,
            dataType: 'json', 
            data:
            {
                dbTable: DailyMenuManager.dbTable,
                condition: 'daily=1',
                orderBy: 'id'
            },

            success: function(data)
            { 
                var cData = data.length;
                for (var i = 0; i < cData; ++i)
                {
                    DailyMenuManager._addDish(data[i]);
                }
            },

            error: function()
            {
                console.error('tryLoadItems: Ajax call failed.');
            }
        });
    },

    createDateHeader: function()
    {
        Today.init();

        $('header').html('<h1>' + Today.toString() + '</h1>');
    },

    createMenuTable: function()
    {
        DailyMenuManager.$form = $('<form action="modify_dailymenu.php" method="POST"></form>');
        DailyMenuManager.$form.appendTo($('div'));

        // Bind event handlers.
        DailyMenuManager.$form.delegate('a', 'click', DailyMenuManager.onAddDish);
        DailyMenuManager.$form.delegate('button#deleteBtn', 'click', DailyMenuManager.onDelete);
        DailyMenuManager.$form.delegate('button#cancelBtn', 'click', DailyMenuManager.onCancel);

        // Adds [Save] and [Cancel] buttons.
        DailyMenuManager.$form.append(DailyMenuManager._generateSubmitButtonHtml());
        DailyMenuManager.$form.append(DailyMenuManager._generateCancelButtonHtml());
        DailyMenuManager.$form.append('<br /><br />');

        var tableTag       = new TableTag(),
            labelRow       = new TableRow(),
            hiddenFld      = new HiddenField('dbTable', DailyMenuManager.dbTable),
            jpNameLabelCol = new TableColumn('<label>' + Strings.getString('LOC_NAME_STR') + '</label>'),
            priceLabelCol  = new TableColumn('<label>' + Strings.getString('PRICE_STR') + '</label>');
        jpNameLabelCol.addClass('locNameFld');
        labelRow.addColumn(new TableColumn(hiddenFld.toHtml()));
        labelRow.addColumn(jpNameLabelCol);
        labelRow.addColumn(priceLabelCol);

        var addRowLnk = new AnchorTag('#', Strings.getString('NEW_ITEM_STR')),
            footerRow = new TableRow(),
            footerCol = new TableColumn(addRowLnk.toHtml());
        footerCol.addAttr('colspan', '3');
        footerRow.addColumn(footerCol);

        tableTag.head.addRow(labelRow);
        tableTag.foot.addRow(footerRow);

        // Adds a table.
        DailyMenuManager.$menuTable = $(tableTag.toHtml());
        DailyMenuManager.$menuTable.appendTo(DailyMenuManager.$form);

        DailyMenuManager.tryLoadItems();
    },

    onAddDish: function()
    {
        DailyMenuManager._addDish(null);
    },

    onDelete: function()
    {
        var $tr = $(this).closest('tr');
        var targetId = $tr.attr('id');

        if (targetId > 0)
        {
            $.ajax(
            {
                url: 'delete_dbrow.php',
                type: 'POST',
                data: {
                    dbTable: DailyMenuManager.dbTable,
                    id: targetId,
                    content: 9
                },

                success: function()
                {
                    $tr.remove();
                },

                error: function(xhr, status)
                {
                    console.error(targetId + ' was not deleted from the database.');
                }
            });
        }
        else
        {
            $tr.remove();
        }
    },

    onCancel: function()
    {
        window.location = 'index.html';
    },

    _addDish: function(objDish)
    {
        ++DailyMenuManager.cItem;

        var locNameFld, priceFld, rowHtml,
            strId      = (objDish ? objDish.id : -DailyMenuManager.cItem),
            strLocName = (objDish ? objDish.loc_name : ''),
            strPrice   = (objDish ? objDish.price : '');

        locNameFld = new TextField(strId + ':' + 'loc_name', strLocName);
        locNameFld.setCssClass('locNameFld');

        priceFld = new CurrencyField(strId + ':' + 'price', strPrice);
        priceFld.setCssClass('priceFld');

        rowHtml =
            '<tr id="' + strId + '">' +
                '<td>' +
                    DailyMenuManager._generateDeleteButtonHtml() +
                '</td>' +
                '<td>' +
                    locNameFld.toHtml() +
                '</td>' +
                '<td>' +
                    priceFld.toHtml() +
                '</td>' +
            '</tr>';

        DailyMenuManager.$menuTable.append(rowHtml);
    },

    _generateDeleteButtonHtml : function()
    {
        return('<button id="deleteBtn" type="button">' + Strings.getString('DELETE_STR') + '</button>');
    },

    _generateSubmitButtonHtml : function()
    {
        return('<button type="submit">' + Strings.getString('SAVE_STR') + '</button>');
    },

    _generateCancelButtonHtml : function()
    {
        return('<button id="cancelBtn" type="button">' + Strings.getString('CANCEL_STR') + '</button>');
    }
};

$(document).ready(DailyMenuManager.onReady);

