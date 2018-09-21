<?php

$pageTitle = 'Set L｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8163',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8184',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8185',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8199',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8201',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '7150',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set L : ルーミエ・セット（レ・クラ）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

