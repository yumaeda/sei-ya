var rgobjCandidateWine = null,
    wineQtyHash        = null;

var WineSetPage =
{
    m_strTitle: null,
    m_rgobjSetWine: null,
    m_fSoldOut: false,

    init: function(strTitle, rgobjSetWine)
    {
        WineSetPage.m_strTitle     = strTitle;
        WineSetPage.m_rgobjSetWine = rgobjSetWine;
    },

    renderHeader: function()
    {
        var innerHtml =
            WineSetPage.m_strTitle +
            '<div style="float:right;font-size:13px;"><a href="//anyway-grapes.jp/finesse/2014/roumier-camuzet.html">戻る</a></div>';

        $('header div#titlePane').html(innerHtml);
    },

    prepareSetWineList: function()
    {
        var cSetWine    = WineSetPage.m_rgobjSetWine.length,
            objSetWine  = null;

        for (var i = 0; i < cSetWine; ++i)
        {
            objSetWine = WineSetPage.m_rgobjSetWine[i];

            if (!objSetWine.selectWine)
            {
                $.ajax(
                { 
                    url: '../api/get_wine_core.php', 
                    dataType: 'json',
                    data: { code: objSetWine.barcode_number },
                    async: false,

                    success: function(rgobjWine)
                    {
                        if (rgobjWine && rgobjWine.length == 1)
                        {
                            var objWine = rgobjWine[0];

                            WineSetPage.m_rgobjSetWine[i] =
                            {
                                barcode_number: objWine.barcode_number,
                                vintage:        objWine.vintage,
                                name:           objWine.combined_name,
                                name_jpn:       objWine.combined_name_jpn,
                                producer:       objWine.producer,
                                producer_jpn:   objWine.producer_jpn,
                                stock:          objWine.stock,
                                price:          objWine.price
                            };

                            if (objWine.stock <= 0)
                            {
                                WineSetPage.m_fSoldOut = true;
                            }
                        }
                    },

                    error: function() {}
                });
            }
        }
    },

    renderSetWineList: function()
    {
        if (false)
        //if (WineSetPage.m_fSoldOut)
        {
            $('aside').html('<span style="font-size:13px;">申し訳ございません。こちらのセットは完売致しました。</span>');
        }
        else
        {
            var innerHtml  = '',
                cSetWine   = WineSetPage.m_rgobjSetWine.length,
                objSetWine = null,
                valueHtml  = '',
                priceHtml  = '';

            wineQtyHash = {};

            for (var i = 0; i < cSetWine; ++i)
            {
                objSetWine = WineSetPage.m_rgobjSetWine[i];

                if (!objSetWine.selectWine)
                {
                    if (!(objSetWine.barcode_number in wineQtyHash))
                    {
                        wineQtyHash[objSetWine.barcode_number] = 0;
                    }

                    wineQtyHash[objSetWine.barcode_number] =
                        wineQtyHash[objSetWine.barcode_number] + 1;

                    valueHtml = '<span class="producerSpan">[' + objSetWine.producer + ']</span>' + '<br />' +
                                '<span style="font-size:12px;">' +  objSetWine.vintage + ' ' + objSetWine.name + '</span><br />' +
                                '<span style="font-size:9px;">' + objSetWine.name_jpn + '</span>';

                    priceHtml = formatNumber(objSetWine.price) + ' yen';
                }
                else
                {
                    valueHtml = '<a id="' + i + '" href="#" class="selectableLnk"><span class="producerSpan">' + objSetWine.producer + '</span><br />' + objSetWine.vintage + ' ' + objSetWine.name + '</a>';
                    priceHtml = '';
                }

                innerHtml +=
                    '<li>' +
                        '<div class="valuePane">' + valueHtml + '</div>' +
                        '<div class="pricePane">' + priceHtml + '</div>';
                    '</li>';
            }

            $('ul#setWineList').html(innerHtml);
        }

        WineSetPage.renderTotalPrice();
        WineSetPage.validate();
    },

    renderCandidateList: function(objParam)
    {
        $.ajax(
        {
            url: '../api/get_wines_by_importer.php',
            data: objParam,
            dataType: 'json',
            success: function(rgobjWine)
            {
                var objWine = null,
                    cWine   = rgobjWine.length,
                    html    = '<table id="candidateTable">';

                for (var i = 0; i < cWine; ++i)
                {
                    objWine = rgobjWine[i];

                    if ((objWine.barcode_number in wineQtyHash) && (wineQtyHash[objWine.barcode_number] >= objWine.stock))
                    {
                        html += '<tr style="display:none;">';
                    }
                    else
                    {
                        html += '<tr>';
                    }

                    html +=
                            '<td class="imgCol">' +
                                '<img class="wineImg" src="//anyway-grapes.jp/images/wines/200px/' + objWine.barcode_number + '.png" onerror="this.src=\'//anyway-grapes.jp/images/wines/200px/no_wine_photo.png\';" />' +
                            '</td>' +
                            '<td>' +
                                '<span class="producerSpan">[' + objWine.producer_jpn + ']</span><br />' +
                                objWine.vintage + '&nbsp;' + objWine.combined_name_jpn +
                            '</td>' +
                            '<td>' +
                                '{0} yen'.format(formatNumber(objWine.price)) +
                            '</td>' +
                            '<td>' +
                                '<div class="selectButton">選択</div>' +
                            '</td>' +
                        '</tr>';
                }

                html += '</table>';

                $('div.contents').html(html);
                rgobjCandidateWine = rgobjWine;
            },

            error: function() {}
        });
    },

    onPostRender: function()
    {
        $('div.contents').outerWidth($('body').outerWidth() - $('aside').outerWidth());
        $('header').outerWidth($('aside').outerWidth() + $('div.contents').outerWidth());

        $('aside').on('click', 'a.selectableLnk', function()
        {
            $('ul#setWineList li').removeClass('selectedItem');
            $(this).closest('li').addClass('selectedItem');

            var iWine       = $(this).attr('id'),
                strImporter = WineSetPage.m_rgobjSetWine[iWine].importer,
                strProducer = WineSetPage.m_rgobjSetWine[iWine].producer,
                strType     = WineSetPage.m_rgobjSetWine[iWine].type,
                strVillage  = WineSetPage.m_rgobjSetWine[iWine].village,
                intMinPrice = WineSetPage.m_rgobjSetWine[iWine].minPrice,
                intMaxPrice = WineSetPage.m_rgobjSetWine[iWine].maxPrice;

            var objParam =
            {
                importer:  strImporter,
                producer:  strProducer,
                type:      strType,
                village:   strVillage,
                min_price: intMinPrice,
                max_price: intMaxPrice
            };

            WineSetPage.renderCandidateList(objParam);

            return false;
        });

        $('div').on('click', 'div.selectButton', function()
        {
            var iSetWine  = $('ul#setWineList li.selectedItem a').attr('id'),
                iSelected = $(this).closest('tr').index();

            WineSetPage.m_rgobjSetWine[iSetWine] = 
            {
                barcode_number: rgobjCandidateWine[iSelected].barcode_number,
                vintage:        rgobjCandidateWine[iSelected].vintage,
                name:           rgobjCandidateWine[iSelected].combined_name,
                name_jpn:       rgobjCandidateWine[iSelected].combined_name_jpn,
                producer:       rgobjCandidateWine[iSelected].producer,
                producer_jpn:   rgobjCandidateWine[iSelected].producer_jpn,
                price:          rgobjCandidateWine[iSelected].price,
                selectWine:     false
            };

            WineSetPage.renderSetWineList();
            $('div.contents').html('選択されたワインが追加されました。');

            WineSetPage.renderTotalPrice();
            WineSetPage.validate();
        });

        $(window).resize(function()
        {
            $('div.contents').outerWidth($('body').outerWidth() - $('aside').outerWidth());
            $('header').outerWidth($('aside').outerWidth() + $('div.contents').outerWidth());
        });

        $('aside').on('click', 'div#checkoutBtn', function()
        {
            var cWine    = WineSetPage.m_rgobjSetWine.length,
                objWine  = null,
                formHtml = '<form action="' + window.location.href + '" method="post">';

            for (var i = 0; i < cWine; ++i)
            {
                objWine  = WineSetPage.m_rgobjSetWine[i];
                formHtml += '<input type="hidden" name="barcode[{0}]" value="{1}" />'.format(i, objWine.barcode_number);
            }

            formHtml += '</form>';

            var $form = $(formHtml);
            $('body').append($form);
            $form.submit();
        });
    },

    renderTotalPrice: function()
    {
        $('div#totalPricePane').html('合計：{0} yen (税別)'.format(formatNumber(WineSetPage.getTotalPrice())));
    },

    validate: function()
    {
        var $rgSelectableLink = $('aside a.selectableLnk');
        if ($rgSelectableLink.length == 0)
        {
            $('div#checkoutPane').fadeIn();
            $('div.contents').fadeOut();
            $('aside').css('float', 'none');
            $('aside').css('margin', '0 auto 0 auto');
            $('aside').width(600);
        }
        else
        {
            $($rgSelectableLink.get(0)).trigger('click');
        }
    },

    getTotalPrice: function()
    {
        var intPrice = 0,
            cWine    = WineSetPage.m_rgobjSetWine.length,
            objWine  = null;

        for (var i = 0; i < cWine; ++i)
        {
            objWine = WineSetPage.m_rgobjSetWine[i];
            if (!objWine.selectWine)
            {
                intPrice += parseInt(objWine.price, 10);
            }
        }

        return intPrice;
    }
};

