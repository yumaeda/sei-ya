//-------------------------------------------------------
//
// DishMenuControl
//
//-------------------------------------------- YuMaeda --
class DishMenuControl extends DailyMenuControl
{
    constructor(strTableName, $parentContainer)
    {
        super(strTableName, $parentContainer);

        this.m_objDishHash  = {};
    }

    renderChildren()
    {
        var self = this;

        $.ajax(
        { 
            url: './get_items.php', 
            cache: false,
            dataType: 'json', 
            data:
            {
                dbTable: self.m_strTableName,
                condition: 'daily=0',
                orderBy: 'sort_order'
            },

            success: function(rgobjDish)
            { 
                var cDish = rgobjDish.length;

                for (var i = 0; i < cDish; ++i)
                {
                    var objDish = rgobjDish[i];
                    if (!self.m_objDishHash[objDish.category])
                    {
                        self.m_objDishHash[objDish.category] = [];
                    }

                    self.m_objDishHash[objDish.category].push(objDish);
                }

                var html          = '',
                    cDishCategory = self.m_rgobjTitle.length;

                for (var i = 0; i < cDishCategory; ++i)
                {
                    if (self.m_objDishHash[i + 1])
                    {
                        html += self._generateDishTableHtml(self.m_objDishHash[i + 1], '');
                    }
                }

                self.$m_parentContainer.html(html);
            },

            error: function() {}
        });
    }
}

