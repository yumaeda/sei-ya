<?php

$pageTitle = 'Set A｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8171',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8191',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '7372',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set A : クリストフ・ルーミエ・セット（シャルム・シャンベルタン）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

