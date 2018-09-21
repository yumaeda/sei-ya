//-------------------------------------------------------
//
// BrandyControl
//
// [Dependencies]
//     DrinkControl.js
//
//-------------------------------------------- YuMaeda --
class BrandyControl extends DrinkControl
{
    constructor($parentContainer, strTableName)
    {
        super($parentContainer, strTableName);

        this.m_rgobjMarc     = [];
        this.m_rgobjFine     = [];
        this.m_rgobjCalvados = [];
        this.m_rgobjCognac   = [];
        this.m_rgobjArmagnac = [];
        this.m_rgobjMadeira     = [];
        this.m_rgobjGrappa   = [];
        this.m_rgobjWhisky   = [];
        this.m_rgobjEauDeVie = [];
    }

    renderChildren()
    {
        this.m_rgobjMarc.length     = 0;
        this.m_rgobjFine.length     = 0;
        this.m_rgobjCalvados.length = 0;
        this.m_rgobjCognac.length   = 0;
        this.m_rgobjArmagnac.length = 0;
        this.m_rgobjMadeira.length     = 0;
        this.m_rgobjGrappa.length   = 0;
        this.m_rgobjWhisky.length   = 0;
        this.m_rgobjEauDeVie.length = 0;

        var self = this;

        $.ajax(
        { 
            url: './get_items.php', 
            dataType: 'json', 
            data:
            {
                dbTable: self.m_strTableName,
                orderBy: 'sort_order'
            },

            success: function(rgobjBrandy)
            {
                var cBrandy   = rgobjBrandy.length,
                    objBrandy = null;

                for (var i = 0; i < cBrandy; ++i)
                {
                    objBrandy = rgobjBrandy[i];
                    switch (objBrandy.category)
                    {
                    case 2:
                        self.m_rgobjMarc.push(objBrandy);
                        break;
                    case 3:
                        self.m_rgobjFine.push(objBrandy);
                        break;
                    case 4:
                        self.m_rgobjCalvados.push(objBrandy);
                        break;
                    case 5:
                        self.m_rgobjCognac.push(objBrandy);
                        break;
                    case 6:
                        self.m_rgobjArmagnac.push(objBrandy);
                        break;
                    case 7:
                        self.m_rgobjMadeira.push(objBrandy);
                        break;
                    case 8:
                        self.m_rgobjGrappa.push(objBrandy);
                        break;
                    case 9:
                        self.m_rgobjWhisky.push(objBrandy);
                        break;
                    case 16:
                        self.m_rgobjEauDeVie.push(objBrandy);
                        break;
                    default:
                        break;
                    }
                }

                var html =
                    self.generateTable(self.m_rgobjMarc, 'Marc', 'マール') +
                    self.generateTable(self.m_rgobjFine, 'Fine', 'フィーヌ') +
                    self.generateTable(self.m_rgobjCalvados, 'Calvados', 'カルヴァドス') +
                    self.generateTable(self.m_rgobjCognac, 'Cognac', 'コニャック') +
                    self.generateTable(self.m_rgobjArmagnac, 'Armagnac', 'アルマニャック') +
                    self.generateTable(self.m_rgobjMadeira, 'Madeira', 'マデイラ') +
                    self.generateTable(self.m_rgobjGrappa, 'Grappa', 'グラッパ') +
                    self.generateTable(self.m_rgobjWhisky, 'Whisky', 'ウィスキー') +
                    self.generateTable(self.m_rgobjEauDeVie, 'Eau de Vie', 'オー・ド・ヴィ');

                self.$m_parentContainer.html(html);
            },

            error: function() {}
        });
    }
}

