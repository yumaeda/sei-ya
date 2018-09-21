//-------------------------------------------------------
//
// AllWineControl 
//
// [Dependencies]
//     RecommendedWineControl.js
//
//-------------------------------------------- YuMaeda --
class AllWineControl extends RecommendedWineControl
{
    constructor(strTableName, $parentContainer)
    {
        super(strTableName, 0, $parentContainer);
    }

    preRender()
    {
        super.preRender();

        this.$m_parentContainer.html('');
    }

    renderChildren()
    {
        var cType   = 6,
            intType = 0,
            self    = this;

        for (var i = 0; i < cType; ++i)
        {
            intType = i + 1;

            $.ajax(
            { 
                url: './get_items.php', 
                async: false,
                dataType: 'json', 
                data:
                {
                    dbTable: self.m_strTableName,
                    condition: '(page_number=2) AND (color={0})'.format(intType),
                    orderBy: 'item_number'
                },

                success: function(rgobjWine)
                { 
                    var html = self._generateWineListHtml(rgobjWine, intType);
                    self.$m_parentContainer.append(html);
                },

                error: function() {}
            });
        }
    }
}

