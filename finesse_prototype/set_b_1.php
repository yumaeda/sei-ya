<?php

$pageTitle = 'Set B-1｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8170',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '7370',
        selectWine:     false,
    },

    {
        barcode_number: '2388',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set B-1 : クリストフ・ルーミエ・セット（リュショット・シャンベルタン）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

