<?php

$pageTitle = 'Set F｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8169',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '7157',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set F : ルーミエ・セット（コルトン・シャルルマーニュ）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

