<?php

$pageTitle = 'Set J-3｜世田谷区 経堂';
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
        barcode_number: '7152',
        selectWine:     false
    },

    {
        barcode_number: '7394',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set J-3 : ルーミエ・セット（シャンボール・ミュジニー）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

