<?php

$pageTitle = 'Set C｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8158',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8172',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8197',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8153',
        preOrder:       true,
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set C : ルーミエ・セット（ボンヌ・マール）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

