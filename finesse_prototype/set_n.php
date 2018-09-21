<?php

$pageTitle = 'Set N｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8167',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '7400',
        selectWine:     false
    },

    {
        barcode_number: '7401',
        selectWine:     false
    },

    {
        barcode_number: '7402',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set N : ルーミエ・セット（シャンボール・ミュジニー 1500ml）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

