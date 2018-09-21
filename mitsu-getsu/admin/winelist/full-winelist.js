function extractHashValues(hash, fRecurse)
{
    var rgobjValue = [];

    for (var key in hash)
    {
        if (Object.prototype.toString.call(hash[key]) === '[object Array]')
        {
            if (fRecurse)
            {
                rgobjValue.push.apply(rgobjValue, hash[key]);
            }
        }
        else
        {
            rgobjValue.push(hash[key]);
        }
    }

    return rgobjValue;
}


//-------------------------------------------------------
//
// WineListUtility
//
//-------------------------------------------- YuMaeda --
var WineListUtility = (function()
{
    // Private members

    var _sort = function(rgobjWine)
        {
            var strRegion       = '',
                strType         = '',
                rgobjSortedWine = rgobjWine,
                urlQuery        = new UrlQuery();

            if (rgobjSortedWine && (rgobjSortedWine.length > 0))
            {
                rgobjSortedWine = rgobjSortedWine.sort(_sortByVintage);
                rgobjSortedWine = rgobjSortedWine.sort(_sortByName);

                strRegion = rgobjSortedWine[0].region;
                strType = rgobjSortedWine[0].type;

                if (urlQuery.getValue('country') == 'fr')
                {
                    if (strType === 'Mousseux')
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortBySparklingAoc);
                    }
                    else if (strRegion.startsWith('Champagne'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByChampagneAoc);
                    }
                    else if (strRegion.startsWith('Alsace'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByAlsaceAoc);
                    }
                    else if (strRegion.startsWith('Vallée de la Loire'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByLoireAoc);
                    }
                    else if (strRegion.startsWith('Bordeaux'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByBordeauxAoc);
                    }
                    else if (strRegion.startsWith('Sud-Ouest'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortBySudOuestAoc);
                    }
                    else if (strRegion.startsWith('Bourgogne'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByBourgogneAoc);
                    }
                    else if (strRegion.startsWith('Vallée du Rhône'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByRhoneAoc);
                    }
                    else if (strRegion.startsWith('Languedoc'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByLanguedocAoc);
                    }
                    else if (strRegion.startsWith('Roussillon'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByRoussillonAoc);
                    }
                    else if (strRegion.startsWith('Provence'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProvenceAoc);
                    }
                    else if (strRegion.startsWith('Savoie'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByProducer);
                        rgobjSortedWine = rgobjSortedWine.sort(_sortBySavoieAoc);
                    }
                }
                else
                {
                    if (strRegion.startsWith('Washinton'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByWashintonAoc);
                    }
                    else if (strRegion.startsWith('Oregon'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByOregonAoc);
                    }
                    else if (strRegion.startsWith('California'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByCaliforniaAoc);
                    }
                    else if (strRegion.startsWith('Western Cape'))
                    {
                        rgobjSortedWine = rgobjSortedWine.sort(_sortByWesternCapeAoc);
                    }
                }
            }

            return rgobjSortedWine;
        },

        // OK
        _sortByName = function(lhs, rhs)
        {
            var lhsName = lhs.name.toLowerCase(),
                rhsName = rhs.name.toLowerCase(); 

            return ((lhsName < rhsName) ? -1 : ((lhsName > rhsName) ? 1 : 0));
        },

        // OK
        _sortByProducer = function(lhs, rhs)
        {
            var lhsProducer = lhs.producer.toLowerCase(),
                rhsProducer = rhs.producer.toLowerCase(); 

            return ((lhsProducer < rhsProducer) ? -1 : ((lhsProducer > rhsProducer) ? 1 : 0));
        },

        // OK
        _sortByVintage = function(lhs, rhs)
        {
            var intResult = -1;

            if (lhs.vintage >= rhs.vintage)
            {
                intResult = (lhs.vintage > rhs.vintage) ? 1 : 0;
            }

            return intResult;
        },

        _sortBySparklingAoc = function(lhs, rhs)
        {
            var lhsValue = _getSparklingAocAsInt(lhs.name),
                rhsValue = _getSparklingAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },
 
        // OK
        _sortByChampagneAoc = function(lhs, rhs)
        {
            var compareHash = null,
                key         = 'village',
                lhsValue    = 100,
                rhsValue    = 100;

            if (lhs.district == 'Montagne de Reims')
            {
                compareHash =
                {
                    'Merfy':             0,
                    'Ambonnay':          1,
                    'Bouzy':             2,
                    'Chamery':           3,
                    'Mareuil-sur-Aÿ':    4,
                    'Ludes':             5,
                    'Reims':             6,
                    'Rilly la Montagne': 7,
                    'Verzenay':          8,
                    'Verzy':             9,
                    'Brouillet':         10,
                    'Trois Puits':       11,
                    'Courmas':           12,
                    'Mailly':            13
                };
            }
            else if (lhs.district == 'Vallée de la Marne')
            {
                compareHash =
                {
                    'Cerseuil':                0,
                    'Baslieux-Sous-Châtillon': 1,
                    'Venteuil':                2,
                    'Trélou-sur-Marne':        3,
                    'Aÿ':                      4,
                    'Cauroy-les-Hermonville':  5,
                    'Hautvillers':             6,
                    'Dizy':                    7,
                    'Passy sur Marne':         8,
                    'Festigny':                9,
                    'Epernay':                10,
                    'Chézy sur Marne':        11,
                    'Charly sur Marne':       12
                };
            }
            else if (lhs.district == 'Côte des Blancs')
            {
                compareHash =
                {
                    'Chouilly':             0,
                    'Pierry':               1,
                    'Avize':                2,
                    'Grauves':              3,
                    'Oger':                 4,
                    'le Mesnil-sur-Oger':   5,
                    'Vertus':               6,
                    'Férebrianges':         7,
                    'Avirey Lingey':        8,
                    'les Riceys':           9
                };
            }
            else if (lhs.district == 'Petit et Grand-Mont')
            {
                compareHash =
                {
                    'Congy': 0
                };
            }
            else if (lhs.district == 'Côte des Bar')
            {
                compareHash =
                {
                    'Buxières-sur-Arce':  0,
                    'Viviers-Sur-Artaut': 1,
                    'Buxeuil':            2,
                    'Gyé Sur Seine':      3,
                    'Courteron':          4,
                    'Bagneux-la-Fosse':   5
                };
            }
            else if (lhs.district == 'Côte de Champagne')
            {
                compareHash =
                {
                    'Montgueux': 0
                };
            }

            if (compareHash)
            {
                lhsValue = compareHash[lhs[key]];
                rhsValue = compareHash[rhs[key]];
            }

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortByBourgogneAoc = function(lhs, rhs)
        {
            var lhsValue = _getBourgogneAocAsInt(lhs.name),
                rhsValue = _getBourgogneAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortByRhoneAoc = function(lhs, rhs)
        {
            var lhsValue = _getRhoneAocAsInt(lhs.name),
                rhsValue = _getRhoneAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortByAlsaceAoc = function(lhs, rhs)
        {
            var lhsValue = 0,
                rhsValue = 0;

            if (lhs.name.indexOf('Grand Cru') > -1)
            {
                ++lhsValue;
            }

            if (rhs.name.indexOf('Grand Cru') > -1)
            {
                ++rhsValue;
            }

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortByBordeauxAoc = function(lhs, rhs)
        {
            var lhsValue = _getBordeauxAocAsInt(lhs.village),
                rhsValue = _getBordeauxAocAsInt(rhs.village);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortByLoireAoc = function(lhs, rhs)
        {
            var lhsValue = _getLoireAocAsInt(lhs.name),
                rhsValue = _getLoireAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortBySudOuestAoc = function(lhs, rhs)
        {
            var lhsValue = _getSudOuestAocAsInt(lhs.name),
                rhsValue = _getSudOuestAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        _sortBySavoieAoc = function(lhs, rhs)
        {
            var lhsValue = _getSavoieAocAsInt(lhs.name),
                rhsValue = _getSavoieAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },


        // OK
        _sortByProvenceAoc = function(lhs, rhs)
        {
            var lhsValue = _getProvenceAocAsInt(lhs.name),
                rhsValue = _getProvenceAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortByRoussillonAoc = function(lhs, rhs)
        {
            var lhsValue = _getRoussillonAocAsInt(lhs.name),
                rhsValue = _getRoussillonAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        // OK
        _sortByLanguedocAoc = function(lhs, rhs)
        {
            var lhsValue = _getLanguedocAocAsInt(lhs.name),
                rhsValue = _getLanguedocAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        _sortByWashintonAoc = function(lhs, rhs)
        {
            var lhsValue = _getWashintonAocAsInt(lhs.name),
                rhsValue = _getWashintonAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        _sortByOregonAoc = function(lhs, rhs)
        {
            var lhsValue = _getOregonAocAsInt(lhs.name),
                rhsValue = _getOregonAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        _sortByCaliforniaAoc = function(lhs, rhs)
        {
            var lhsValue = _getCaliforniaAocAsInt(lhs.name),
                rhsValue = _getCaliforniaAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

        _sortByWesternCapeAoc = function(lhs, rhs)
        {
            var lhsValue = _getWesternCapeAocAsInt(lhs.name),
                rhsValue = _getWesternCapeAocAsInt(rhs.name);

            return ((lhsValue < rhsValue) ? -1 : ((lhsValue > rhsValue) ? 1 : 0));
        },

       _getAocAsInt = function(rgstrAocName, aocName)
        {
            var intValue = 9999;
            for (var i = 0; i < rgstrAocName.length; ++i)
            {
                if (aocName.startsWith(rgstrAocName[i]))
                {
                    intValue = (5 * i + 1);
                    break;
                }
            }

            return intValue;
        },

        _getSparklingAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Crémant d\'Alsace',
                    'Crémant de Loire',
                    'Crémant de Bourgogne',
                    'Crémant de Jura'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getBourgogneAocAsInt = function(aocName)
        {
            var intValue = 9999,
                rgstrAocName =
                [
                    'Chablis',
                    'Irancy',
                    'Marsannay',
                    'Fixin',
                    'Gevrey-Chambertin',
                    'Charmes-Chambertin',
                    'Latricières-Chambertin',
                    'Ruchottes-Chambertin',
                    'Chapelle-Chambertin',
                    'Mazis-Chambertin',
                    'Griotte-Chambertin',
                    'Mazoyeres-Chambertin',
                    'Chambertin Clos de Bèze',
                    'Chambertin',
                    'Morey-Saint-Denis',
                    'Clos de la Roche',
                    'Clos Saint Denis',
                    'Bonnes-Mares',
                    'Chambolle-Musigny',
                    'Musigny',
                    'Clos de Vougeot',
                    'Clos Vougeot',
                    'Vougeot',
                    'Vosne-Romanée',
                    'Grands-Echézeaux',
                    'Echézeaux',
                    'Richebourg',
                    'la Tâche',
                    'Romanée-Saint-Vivant',
                    'Nuits-Saint-Georges',
                    'Corton Charlemagne',
                    'Corton Renardes',
                    'Corton Maréchaudes',
                    'Corton Bressandes',
                    'Corton Clos du Roi',
                    'Corton Perrières',
                    'Corton',
                    'Ladoix',
                    'Aloxe Corton',
                    'Pernand-Vergelesses',
                    'Chourey-les-Beaune',
                    'Savigny les Beaune',
                    'Beaune',
                    'Pommard',
                    'Volnay',
                    'Monthelie',
                    'Auxey-Duresses',
                    'Meursault',
                    'Blagny',
                    'Puligny-Montrachet',
                    'Chevalier-Montrachet',
                    'Bâtard-Montrachet',
                    'Bienvenues Bâtard-Montrachet',
                    'Montrachet',
                    'Chassagne Montrachet',
                    'Saint-Aubin',
                    'Santenay',
                    'Maranges',
                    'Bouzeron',
                    'Rully',
                    'Mercurey',
                    'Givry',
                    'Montagny',
                    'Mâcon-Clesse',
                    'Mâcon-Bussières',
                    'Mâcon-Pierreclos',
                    'Mâcon-Verze',
                    'Mâcon-Chaintré',
                    'Macon',
                    'Pouilly-Fuissé',
                    'Viré-Clessé',
                    'Saint-Véran',
                    'Juliénas',
                    'Chénas',
                    'Moulin-à-Vent',
                    'Fleurie',
                    'Morgon',
                    'Régnié',
                    'Brouilly',
                    'Côte de Brouilly',
                    'Bourgogne Aligote',
                    'Bourgogne Chardonnay',
                    'Côtes de Nuits',
                    'Côte de Beaune'
                ];

            for (var i = 0; i < rgstrAocName.length; ++i)
            {
                if (aocName.startsWith(rgstrAocName[i]))
                {
                    intValue = (10 * i + 1);
                    if (aocName.indexOf('1er Cru') > -1)
                    {
                        intValue += 2;
                    }
                    else if (aocName.indexOf('Grand Cru') > -1)
                    {
                        intValue += 4;
                    } 

                    if (aocName.indexOf('Vieilles Vignes') > -1)
                    {
                        ++intValue;
                    }

                    break;
                }
            }

            return intValue;
        },

        _getRhoneAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Côte-Rôtie',
                    'Château Grillet',
                    'Condrieu',
                    'Saint-Joséph',
                    'Cornas',
                    'Hermitage',
                    'Crozes-Hermitage',
                    'Saint-Péray',
                    'Grignan',
                    'Coteaux du Tricastin',
                    'Châteauneuf-du-Pape',
                    'Gigondas',
                    'Vacqueyras',
                    'Lirac',
                    'Vinsobre',
                    'Côtes du Luberon',
                    'Luberon',
                    'Ventoux',
                    'Costières de Nîmes'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getLoireAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Fiefs Vendeens Mareuil',
                    'Muscadet Sèrve & Maine',
                    'Muscadet',
                    'Savennières',
                    'Coteaux de l\'Aubance',
                    'Saumur-Champigny',
                    'Saumur',
                    'Anjou',
                    'Bourgueil',
                    'Sain Nicolas de Bourgueil',
                    'Coteaux du Loir',
                    'Jasnières',
                    'Vouvray',
                    'Montlouis-sur-Loire',
                    'Touraine',
                    'Chinon',
                    'Côte Roannaise',
                    'Coteaux du Giennois',
                    'Blanc Fumé de Pouilly',
                    'Pouilly Fumé',
                    'Quincy',
                    'Sancerre',
                    'Menetou-Salon',
                    'Valençay'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getBordeauxAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Saint-Estéphe',
                    'Pauillac',
                    'Saint-Julien',
                    'Margaux',
                    'Haut-Médoc',
                    'Pessac-Léognan',
                    'Saint-Émilion',
                    'Pomerol',
                    'Lalande de Pomerol',
                    'Castillon Côtes de Bordeaux'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getSudOuestAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Cahors',
                    'Gaillac',
                    'Côtes-de-Saint-Mont',
                    'Saint-Mont',
                    'Madiran',
                    'Jurançon',
                    'Fronton',
                    'Irouléguy'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getLanguedocAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Coteaux du Languedoc',
                    'Coteaux du Languedoc Montpeyroux',
                    'Coteaux du Languedoc Pic Saint-Loup',
                    'Faugères',
                    'Minervois',
                    'Fitou'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getRoussillonAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Côtes du Roussillon',
                    'Collioure'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getSavoieAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Crépy',
                    'Vin de Savoie',
                    'Roussette de Savoie'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getProvenceAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Bandol',
                    'Coteaux d\'Aix-en-Provence',
                    'Les Baux de Provence',
                    'Côtes de Provence',
                    'Bellet',
                    'Coteaux Varois en Provence'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getWashintonAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Columbia Valley'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

        _getOregonAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Willamette Valley'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },

         _getCaliforniaAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'Mendocino',
                    'Anderson Valley',
                    'Sierra Foothills',
                    'Sonoma',
                    'Carneros',
                    'Napa Valley',
                    'Lodi',
                    'Santa Barbara'
                ];

            return _getAocAsInt(rgstrAocName, aocName);
        },
        
        _getWesternCapeAocAsInt = function(aocName)
        {
            var rgstrAocName =
                [
                    'W.O. Piekenierskloof',
                    'W.O. Olifants River',
                    'W.O. Cederberg',
                    'W.O. Swartland',
                    'W.O. Tulbagh',
                    'W.O. Voor-Paardeberg',
                    'W.O. Paarl',
                    'W.O. Franschhoek',
                    'W.O. Stellenbosch',
                    'W.O. Constantia',
                    'W.O. Overberg',
                    'W.O. Upper Hemel-en-Aarde Valley',
                    'W.O. Hemel-en-Aarde Ridge',
                    'W.O. Elim',
                    'W.O. Coastal Region',
                    'W.O. Western Cape'
                ];
 
            return _getAocAsInt(rgstrAocName, aocName);
        };

    // Public members

    return(
    {
        sort: _sort
    });
})();



//-------------------------------------------------------
//
// WineListPage
//
//-------------------------------------------- YuMaeda --
var WineListPage = (function()
{
    // Private members

    var m_cMaxItem    = 20,
        m_title       = '',
        m_jpnTitle    = '',
        m_subtitle    = '',
        m_jpnSubtitle = '',

        _init = function(title, jpnTitle, subtitle, jpnSubtitle)
        {
            this.m_title       = title;
            this.m_jpnTitle    = jpnTitle;
            this.m_subtitle    = subtitle;
            this.m_jpnSubtitle = jpnSubtitle;
        },

        _render = function(pageNumber, rgobjWine)
        {
            var cRenderedPage = 0;

            if ((pageNumber > 0) && rgobjWine)
            {
                var objWine,
                    html            = '',
                    hiddenInputHtml = '',
                    cRenderedPage   = 0;

                html += '<table id="page{0}" index="{0}">'.format(pageNumber);
                html += _generateHeaderHtml(this.m_title, this.m_jpnTitle, this.m_subtitle, this.m_jpnSubtitle, pageNumber);
                html += _generateFooterHtml(pageNumber);

                ++cRenderedPage;

                var cItem = 0;
                for (var i = 0; i < rgobjWine.length; ++i)
                {
                    if (cItem == m_cMaxItem)
                    {
                        ++cRenderedPage;
                        ++pageNumber;
                        cItem = 0;

                        html += '</table>';
                        html += '<table id="page{0}" index="{0}">'.format(pageNumber);
                        html += _generateHeaderHtml(this.m_title, this.m_jpnTitle, this.m_subtitle, this.m_jpnSubtitle, pageNumber);
                        html += _generateFooterHtml(pageNumber);
                    }

                    objWine = rgobjWine[i];
                    if ((objWine.region == 'Champagne') && (objWine.type.startsWith('Champagne')))
                    {
                        html += _generateChampagnePageBodyHtml(objWine, pageNumber, cItem + 1);
                    }
                    else
                    {
                        html += _generatePageBodyHtml(objWine, pageNumber, cItem + 1);
                    }

                    hiddenInputHtml += _generateItemValueHtml(objWine, pageNumber, cItem + 1);

                    ++cItem;
                }

                html += '</table>';

                $('div#contents').append(html);
                $('form').append(hiddenInputHtml);
            }

            return cRenderedPage;
        },

        _refresh = function(pageNumber)
        {
            var $table = $('table[index={0}]'.format(pageNumber));
            if ($table && $table.length == 1)
            {
                var $tableRows,
                    $hiddenInputs   = $('form input[page=' + pageNumber + ']');
                    hiddenInputHtml = '',
                    itemId          = 1;

                // Remove all the hidden inputs for the page.
                if ($hiddenInputs && $hiddenInputs.length > 0)
                {
                    $hiddenInputs.remove();
                }

                $table.find('tbody > tr').each(function()
                {
                    var $this         = $(this),
                        fPadded       = $this.hasClass('bottomPaddedRow'),
                        rgstrProducer = $this.find('td.producerCol').html().split('<br>'),
                        rgstrName     = $this.find('td.nameCol').html().split('<br>');

                    // Refresh id attribute of <tr />.
                    $this.attr('id', _generateUniqueItemId(pageNumber, itemId));

                    hiddenInputHtml += _generateItemValueHtml(
                    {
                        vintage:      $this.find('td.vintageCol').html(),
                        producer:     (rgstrProducer.length === 2) ? rgstrProducer[0] : '',
                        producer_jpn: (rgstrProducer.length === 2) ? rgstrProducer[1] : '',
                        name:         (rgstrName.length === 2) ? rgstrName[0] : '',
                        name_jpn:     (rgstrName.length === 2) ? rgstrName[1] : '',
                        store_price:  $this.find('td.priceCol').html(),
                        padded:       fPadded
                    }, pageNumber, itemId);

                    ++itemId;
                });

                $('form').append(hiddenInputHtml);
            }
        },

        _generateItemValueHtml = function(objWine, pageNumber, itemId)
        {
            var html = '';

            if (objWine)
            {
                rgstrRowValue =
                [
                    objWine.vintage,
                    objWine.producer.replace(/"/g, '&quot;'),
                    objWine.producer_jpn.replace(/"/g, '&quot;'),
                    objWine.name.replace(/"/g, '&quot;'),
                    objWine.name_jpn.replace(/"/g, '&quot;'),
                    objWine.store_price
                ];

                if (objWine.padded)
                {
                    rgstrRowValue.push('PADDED');
                }

                var inputName  = _generateUniqueItemId(pageNumber, itemId),
                    inputValue = rgstrRowValue.join('#;#');

                html = '<input type="hidden" name="{0}" value="{1}" page="{2}" />'.format(inputName, inputValue, pageNumber);
            }

            return html;
        },
    
        _generateHeaderHtml = function(title, jpnTitle, subtitle, jpnSubtitle, pageNumber)
        {
            var html,
                arrowImg = (pageNumber > 1) ? '<img src="./upArrow.png" class="upArrow" />' : '',

            html =
                '<thead>' +
                    '<tr>' +
                        '<td colspan="4">' +
                            '<input type="text" name="page_title_{0}" value="{1}" />'.format(pageNumber, title) +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="4">' +
                            '<input type="text" name="page_title_jpn_{0}" value="{1}" /><br />'.format(pageNumber, jpnTitle) +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td><img src="./newPage.png" class="newPage" /></td>' +
                        '<td colspan="2">&nbsp;</td>' +
                        '<td class="imgCol">{0}</td>'.format(arrowImg) +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="4">' +
                            '<input type="text" name="region_title_{0}" value="{1}" />'.format(pageNumber, subtitle) +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="4">' +
                            '<input type="text" name="region_title_jpn_{0}" value="{1}" />'.format(pageNumber, jpnSubtitle) +
                        '</td>' +
                    '</tr>' +
                '</thead>';

            return html;
        },

        _generateChampagnePageBodyHtml = function(objWine, pageNumber, itemId)
        {
            var namePrefix = _generateUniqueItemId(pageNumber, itemId),
                strClass   = objWine.padded ? 'bottomPaddedRow' : '',
                html       =
                    '<tr id="{0}" class="{1}">'.format(namePrefix, strClass) +
                       '<td class="producerCol">{0}<br />{1}</td>'.format(objWine.village, objWine.village_jpn) +
                       '<td class="vintageCol">{0}</td>'.format(objWine.vintage) +
                       '<td class="nameCol">{0}<br />{1}</td>'.format(objWine.name, objWine.name_jpn) +
                       '<td class="priceCol">{0}</td>'.format(objWine.store_price) +
                   '</tr>';

            return html;
        },

        _generatePageBodyHtml = function(objWine, pageNumber, itemId)
        {
            var namePrefix = _generateUniqueItemId(pageNumber, itemId),
                strClass   = objWine.padded ? 'bottomPaddedRow' : '',
                html       =
                    '<tr id="{0}" class="{1}">'.format(namePrefix, strClass) +
                       '<td class="producerCol">{0}<br />{1}</td>'.format(objWine.producer, objWine.producer_jpn) +
                       '<td class="vintageCol">{0}</td>'.format(objWine.vintage) +
                       '<td class="nameCol">{0}<br />{1}</td>'.format(objWine.name, objWine.name_jpn) +
                       '<td class="priceCol">{0}</td>'.format(objWine.store_price) +
                   '</tr>';

            return html;
        },

        _generateFooterHtml = function(intPage)
        {
            var html,
                arrowImg = '<img src="./downArrow.png" class="downArrow" />';

            html =
                '<tfoot>' +
                    '<tr>' +
                        '<td colspan="3">' +
                            'le Numéro ' + intPage +
                        '</td>' +
                        '<td class="priceCol">{0}</td>'.format(arrowImg) +
                    '</tr>' +
                '</tfoot>';

            return html;
        },

        _generateUniqueItemId = function(pageNumber, itemId)
        {
            var strItemId = '';

            if ((pageNumber > 0) && (itemId > 0))
            {
                strItemId = 'page_{0}_item_{1}'.format(pageNumber, itemId);
            }

            return strItemId;
        };

    // Public members

    return(
    {
        init:               _init,
        render:             _render,
        refresh:            _refresh,
        generateHeaderHtml: _generateHeaderHtml,
        generateFooterHtml: _generateFooterHtml
    });
})();



//-------------------------------------------------------
//
// WineList
//
//-------------------------------------------- YuMaeda --
var WineList = (function()
{
    // Private members

    var _render = function(strCondition, rgobjPageInfo)
        {
            $.ajax(
            {
                url: "http://anyway-grapes.jp/wines/get_items.php",
                //url: "http://anyway-grapes.jp/wines/admin/get_admin_items.php",
                data:
                {
                    dbTable:  'wines',
                    condition: '((apply = "D") OR (apply = "S")) AND (stock > 0) AND (store_price > 0) AND {0}'.format(strCondition)
                },

                dataType: "jsonp",
                jsonp:    "xDomainCallback",
                success: function(rgobjWine)
                {
                    var rgobjSortedWine, pageInfo,
                        pageNumber = 1, 
                        cPage      = rgobjPageInfo.length,
                        wineHash   = _generateWineHash(rgobjWine);

                    for (var i = 0; i < cPage; ++i)
                    {
                        rgobjSortedWine = null;
                        pageInfo        = rgobjPageInfo[i];

                        if (wineHash[pageInfo.type])
                        {
                            if (pageInfo.region)
                            {
                                if (pageInfo.district)
                                {
                                    if (wineHash[pageInfo.type][pageInfo.region])
                                    {
                                        rgobjSortedWine =
                                            WineListUtility.sort(wineHash[pageInfo.type][pageInfo.region][pageInfo.district]);
                                    }
                                }
                                else
                                {
                                    if (pageInfo.noRecurse)
                                    {
                                        rgobjSortedWine =
                                            WineListUtility.sort(extractHashValues(wineHash[pageInfo.type][pageInfo.region], false));
                                    }
                                    else
                                    {
                                        rgobjSortedWine =
                                            WineListUtility.sort(extractHashValues(wineHash[pageInfo.type][pageInfo.region], true));
                                    }
                                }
                            }
                            else
                            {
                                console.error('Region is not set!!');
                            }
                        }

                        if (rgobjSortedWine && (rgobjSortedWine.length > 0))
                        {
                            WineListPage.init(pageInfo.title, pageInfo.jpnTitle, pageInfo.subtitle, pageInfo.jpnSubtitle);
                            pageNumber += WineListPage.render(pageNumber, rgobjSortedWine);
                        }
                    }

                    _postRender();
                },

                error: function()
                {
                    console.error('WineList._render: ERRRO');
                }
            });
        },

        _restore = function(rgobjWineData)
        {
            var title, jpnTitle, subtitle, jpnSubtitle,
                iPage        = 1,
                rgobjTmpWine = [];

            var objWineData = null,
                cWineData   = rgobjWineData.length;

            for (var i = 0; i < cWineData; ++i)
            {
                objWineData = rgobjWineData[i];
                if (iPage != objWineData.page_number) 
                {
                    WineListPage.init(title, jpnTitle, subtitle, jpnSubtitle);
                    WineListPage.render(iPage, rgobjTmpWine);
                    ++iPage;

                    rgobjTmpWine = [];
                }

                if (iPage == objWineData.page_number)
                {
                    title       = objWineData.name;
                    jpnTitle    = objWineData.name_jpn;
                    subtitle    = objWineData.region;
                    jpnSubtitle = objWineData.region_jpn;

                    var rgstrValues = objWineData.comment.split('#;#');
                    rgobjTmpWine.push(
                    {
                        vintage:      rgstrValues[0],
                        producer:     rgstrValues[1],
                        producer_jpn: rgstrValues[2],
                        name:         rgstrValues[3],
                        name_jpn:     rgstrValues[4],
                        store_price:  rgstrValues[5],
                        padded:       (rgstrValues.length > 6)
                    });

                    if (i == (cWineData - 1))
                    {
                        WineListPage.init(title, jpnTitle, subtitle, jpnSubtitle);
                        WineListPage.render(iPage, rgobjTmpWine);
                    }
                }
            }
        },

        _postRender = function()
        {
            var $contents = $('div#contents');
            if ($contents && ($contents.length == 1))
            {
                _updatePageCount();

                // Hide the down arrow on the last page.
                var $tables = $contents.find('table');
                $tables.last().find('tfoot img.downArrow').hide();

                // Register event handlers.
                $('body').on('click', 'img#refreshImg', _onRefreshImgClick);
                $contents.on('click', 'img.newPage', _onNewPageImgClick);
                $contents.on('click', 'img.upArrow,img.downArrow', _onArrowImgClick);
                _registerDragAndDropEventHandler($tables);
                _registerDoubleClickEventHandler($contents);
                _registerRightClickEventHandler($contents);
                _registerKeydownEventHandler();
           }
        },

        _updatePageCount = function()
        {
            var cPage = $('table').length;
            _setPageCount(cPage);

            var selectHtml = '<option value="all">Print all the pages.</option>';
            for (var i = 1; i <= cPage; ++i)
            {
                selectHtml += '<option value="' + i + '">Page ' + i + '</option>';
            }

            $('footer select').html(selectHtml);
        },

        _generateWineHash = function(rgobjWine)
        {
            var objWine, strRegion, strDistrict,
                cWine     = rgobjWine.length,
                wineHash  = {};

            for (var i = 0; i < cWine; ++i)
            {
                objWine = rgobjWine[i];

                var objMenuWine = {},
                    strJpnName  = objWine.combined_name_jpn,
                    strName     = objWine.combined_name;

                strJpnName = strJpnName.replace('デノミナツィオーネ・ディ・オリージネ・コントロッラータ・エ・ガランティータ・', 'D.O.C.G. ');
                strJpnName = strJpnName.replace('デノミナツィオーネ・ディ・オリージネ・コントロッラータ・', 'D.O.C. ');
                strJpnName = strJpnName.replace('デノミナシオン・デ・オリヘン・カリフィカーダ・', 'D.O.Ca. ');
                strJpnName = strJpnName.replace('デノミナツィオーネ・ディ・オリージネ・プロテッタ・', 'D.O.P. ');
                strJpnName = strJpnName.replace('インディカツィオーネ・ジェオグラフィカ・ティピカ・', 'I.G.T. ');
                strJpnName = strJpnName.replace('ヴィーノ・ダ・タヴォラ・', 'V.d.T. ');
                strJpnName = strJpnName.replace('ヴィノ・スプマンテ・アロマティコ・カリタ・', 'V.S.A.Q. ');
                strJpnName = strJpnName.replace('ヴィーノ・スプマンテ・ディ・クアリタ・', 'V.S.Q. ');
                strJpnName = strJpnName.replace('デノミナシオン・デ・オリヘン・', 'D.O. ');
                strJpnName = strJpnName.replace('ヴィーノ・ディ・ラ・ティエラ・', 'V.d.l.T ');
                strJpnName = strJpnName.replace('クワリテーツヴァイン・ベシュティムテ・アンバウゲビーテ・', 'Q.b.A. ');
                strJpnName = strJpnName.replace('クワリテーツヴァイン・ベシュティムテ・アンバウゲビーテ・', 'Q.m.P. ');
                strJpnName = strJpnName.replace('ゼクト・ベシュティムテ・アンバウゲビーテ・', 'Sekt.b.A. ');
                strName    = strName.replace(/\([\w\.']+(\s)Desgorgements\)/, '');

                // Deep copy objWine to objMenuWine.
                $.extend(objMenuWine, objWine);
                objMenuWine['name']         = strName;
                objMenuWine['name_jpn']     = strJpnName;
                objMenuWine['producer']     = WineUtility.getProducer(objWine);
                objMenuWine['producer_jpn'] = WineUtility.getJpnProducer(objWine);

                if (objMenuWine['producer'].length > 28)
                {
                    objMenuWine['producer'] = objMenuWine['producer'].replace('Domaine', 'Dom.', 'gi');
                }

                if (!wineHash[objWine.type])
                {
                    wineHash[objWine.type] = {};
                }

                strRegion = objWine.region.trim();
                if (!wineHash[objWine.type][strRegion])
                {
                    wineHash[objWine.type][strRegion] = [];
                }

                strDistrict = objWine.district.trim();
                if (strDistrict)
                {
                    if (!wineHash[objWine.type][strRegion][strDistrict])
                    {
                        wineHash[objWine.type][strRegion][strDistrict] = [];
                    }

                    wineHash[objWine.type][strRegion][strDistrict].push(objMenuWine);
                }
                else
                {
                    wineHash[objWine.type][strRegion].push(objMenuWine);
                }
            }

            return wineHash;
        },

        // Precondition: This function has to call after onPostRender(). 
        _getPageCount = function()
        {
            var cPage = 0;

            var $pageCountInput = $('header input[name=page_count]');
            if ($pageCountInput && ($pageCountInput.length == 1))
            {
                cPage = $pageCountInput.val();
            }

            return cPage;
        },

        // Precondition: This function has to call after onPostRender(). 
        _setPageCount = function(cPage)
        {
            $('header input[name=page_count]').val(cPage);
        },

        _save = function()
        {
            // TODO yumaeda: Remove below workaround code, which recreate all the hidden inputs.
            $('table').each(function()
            {
                WineListPage.refresh($(this).attr('index'));
            });

            $.ajax(
            {
                type: 'POST',
                url:  'update_winelist.php',
                async: false,
                data: $('form').serialize() + '&' + $.param({ action: 'save' }),
                success: function(responseText)
                {
                    alert('The wine list has saved successfully.');
                },

                error: function()
                {
                    console.error('WineList._save: ERROR');
                }
            });
        },

        _onRefreshImgClick = function()
        {
            $.ajax(
            {
                type: 'POST',
                url:  'update_winelist.php',
                async: false,
                data: { action: 'clear' },
                success: function(responseText)
                {
                    if (responseText == 'SUCCESS')
                    {
                        location.reload(true);
                    }
                    else
                    {
                        console.error('clearWineList: Invalid response.');
                    }
                },

                error: function()
                {
                    console.error('clearWineList: ERROR');
                }
            });
        },

        _onNewPageImgClick = function(event)
        {
            var newPageHtml   = '',
                $page         = $(this).closest('table'),
                pageNumber    = parseInt($page.attr('index'), 10),
                newPageNumber = pageNumber + 1,
                title         = $page.find('input[name=page_title_{0}]'.format(pageNumber)).val(),
                jpnTitle      = $page.find('input[name=page_title_jpn_{0}]'.format(pageNumber)).val(),
                subtitle      = $page.find('input[name=region_title_{0}]'.format(pageNumber)).val(),
                jpnSubtitle   = $page.find('input[name=region_title_jpn_{0}]'.format(pageNumber)).val();

            // shift pages after the current one downward.
            _shiftPages(newPageNumber, false);

            // Create a new page after the current one.
            newPageHtml += '<table id="page{0}" index="{0}" >'.format(newPageNumber);
            newPageHtml +=     WineListPage.generateHeaderHtml(title, jpnTitle, subtitle, jpnSubtitle, newPageNumber);
            newPageHtml +=     WineListPage.generateFooterHtml(newPageNumber);
            newPageHtml +=     '<tbody></tbody>';
            newPageHtml += '</table>';

            $page.after(newPageHtml);
            _registerDragAndDropEventHandler($page.next());

            // Update the page count since the new page is added.
            _updatePageCount();
        },

        _onArrowImgClick = function(event)
        {
            var $this              = $(this), 
                $srcPage           = $this.closest('table'),
                $destPage          = null,
                $srcRow            = null,
                $srcRowHiddenInput = null;

            if ($this.attr('class') == 'upArrow')
            {
                $destPage = $srcPage.prev();
                $srcRow = $srcPage.find('tbody tr:first').remove().clone();
                $srcRowHiddenInput = $('form input[name={0}]'.format($srcRow.attr('id')));

                $destPage.find('tbody').append($srcRow);
                $srcRowHiddenInput.remove();

                // Refresh the source page for reassign row ids and input names.
                WineListPage.refresh($srcPage.attr('index'));
                WineListPage.refresh($destPage.attr('index'));
            }
            else
            {
                $destPage = $srcPage.next();
                $srcRow   = $srcPage.find('tbody tr:last').remove().clone();
                $srcRowHiddenInput = $('form input[name={0}]'.format($srcRow.attr('id')));

                $destPage.find('tbody').prepend($srcRow);
                $srcRowHiddenInput.remove();

                // Refresh the destination page for reassign row ids and input names.
                WineListPage.refresh($destPage.attr('index'));
            }

            $destPage.tableDnDUpdate();
            if ($srcPage.find('tbody tr').length > 0)
            {
                $srcPage.tableDnDUpdate();
            }
            else
            {
                var iShiftStart = $srcPage.next().attr('index');

                $srcPage.remove();
                _updatePageCount();

                _shiftPages(iShiftStart, true);
            }
        },

        _registerDragAndDropEventHandler = function($rgobjTable)
        {
            if ($rgobjTable && ($rgobjTable.length > 0))
            {
                // Enable drap & drop.
                $rgobjTable.tableDnD(
                {
                    onDragStart: function(table, row)
                    {
                        var $row = $(row);

                        $row.css('background-color', 'rgb(201,201,148)');
                        $row.siblings().css('background-color', 'white');
                    },

                    onDrop: function(table, row)
                    {
                        WineListPage.refresh($(table).attr('index'));
                    }
                });
            }
        },

        _registerDoubleClickEventHandler = function($contents)
        {
            $contents.on('dblclick', 'tbody td', function()
            {
                var $this = $(this);
                if (($this.find('input').length === 0) &&
                    ($this.hasClass('producerCol') || $this.hasClass('nameCol')))
                {
                    var rgstrValue = $this.html().split('<br>');
                    if (rgstrValue.length == 2)
                    {
                        var inputHtml =
                            '<input id="engInput" type="text" value="' + htmlEncode(rgstrValue[0]) + '" />' +
                            '<br />' +
                            '<input id="jpnInput" type="text" value="' + htmlEncode(rgstrValue[1]) + '" />';

                        $(this).html(inputHtml);
                        $(this).find('input').first().focus();
                        $this.on('focusout', 'input', function()
                        {
                            var $this    = $(this),
                                $table   = $this.closest('table'),
                                strValue = $this.val();

                            if (this.id === 'engInput')
                            {
                                $this.closest('td').prepend(strValue);
                            }
                            else if (this.id === 'jpnInput')
                            {
                                $this.closest('td').append(strValue);
                            }

                            $this.remove();
                            WineListPage.refresh($table.attr('index'));
                        });
                    }
                }
            });
        },

        _registerRightClickEventHandler = function($contents)
        {
            $contents.on('contextmenu', 'tbody > tr', function(event)
            {
                event.preventDefault();

                var $this = $(this);
                $this.css('background-color', 'white');
                $this.toggleClass('bottomPaddedRow');

                var $targetInput = $('form input[name=' + this.id + ']'),
                    rgstrInput   = $targetInput.val().split('#;#');

                while (rgstrInput.length > 6)
                {
                    rgstrInput.pop();
                }
                    
                if ($this.hasClass('bottomPaddedRow'))
                {
                    rgstrInput.push('PADDED');
                }

                $targetInput.val(rgstrInput.join('#;#'));

                return false;
            });
        },

        _registerKeydownEventHandler = function()
        {
            document.addEventListener('keydown', function(event)
            {
                var baseKey = navigator.platform.match('Mac') ? event.metaKey : event.ctrlKey;
                if (baseKey)
                {
                    if (event.which == 83)
                    {
                        event.preventDefault();
                        _save();
                    }
                }

                return false;
            }, false);
        },

        _shiftPages = function(pageNumber, fUp)
        {
            var $page     = $('table[index={0}]'.format(pageNumber)),
                $nextPage = $page;

            while ($nextPage && ($nextPage.length == 1))
            {
                var oldPageNumber  = parseInt($nextPage.attr('index'), 10),
                    nextPageNumber = fUp ? (oldPageNumber - 1) : (oldPageNumber + 1);

                // Remove the hidden inputs for the old page.
                $('form input[page={0}]'.format(oldPageNumber)).remove();

                $nextPage.attr('id', 'page{0}'.format(nextPageNumber));
                $nextPage.attr('index', nextPageNumber);

                // Reset the 'name' attributes of the inputs in the page head.
                $nextPage.find('thead input').each(function()
                {
                    var $this    = $(this),
                        attrName = $this.attr('name');

                    $this.attr('name', attrName.replace(oldPageNumber, nextPageNumber, 'gi'));
                });

                // Reset the 'id' attributes of the trs in the page body.
                $nextPage.find('tbody tr').each(function()
                {
                    var newId = this.id.replace(oldPageNumber, nextPageNumber, 'gi');
                    $(this).attr('id', newId);
                });

                // Reset the page number on the page footer.
                $nextPage.find('tfoot td:first').html('le Numéro ' + nextPageNumber);
                $nextPage = $nextPage.next();
            }

            // Refresh all the shifted pages.
            // TODO yumaeda: Need to rewrite more efficient code.
            $nextPage = $page;
            while ($nextPage && ($nextPage.length == 1))
            {
                var pageNumber = parseInt($nextPage.attr('index'), 10);

                WineListPage.refresh(pageNumber);
                $nextPage = $nextPage.next();
            }
        };
 
    // Public members

    return(
    {
        render:     _render,
        restore:    _restore,
        postRender: _postRender
    });
})();


$(document).ready(function()
{
    var rgobjWine = null,
        urlQuery  = new UrlQuery();

    $.ajax(
    { 
        url:      '../../get_items.php',
        dataType: 'json', 
        async:    false,
        data:
        {
            dbTable: 'mitsugetsu_winelist',
            orderBy: 'page_number,item_number ASC'
        },

        success: function(data)
        { 
            rgobjWine = data;
        },

        error: function(){}
    });

    if ((rgobjWine !== null) && (rgobjWine.length > 0))
    {
        WineList.restore(rgobjWine);
        WineList.postRender();
    }
    else
    {
        if (urlQuery.getValue('country') == 'fr')
        {
            WineList.render('(country = "France")', FrenchMenuInfo);
        }
        else
        {
            WineList.render('(country <> "France")', NonFrenchMenuInfo);
        }
    }
});

