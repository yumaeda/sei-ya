<?php

$pageTitle = 'Set J-1｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8166',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8154',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8193',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '6664',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set J-1 : ルーミエ・セット（シャンボール・ミュジニー）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

