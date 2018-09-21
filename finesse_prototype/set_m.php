<?php

$pageTitle = 'Set M｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8164',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8190',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8200',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '7006',
        selectWine:     false
    },

    {
        barcode_number: '7035',
        selectWine:     false
    },

    {
        barcode_number: '7149',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set M : ルーミエ・セット（コンボット）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

