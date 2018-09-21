<?php

$pageTitle = 'Set I｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8179',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8152',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '6999',
        selectWine:     false
    },

    {
        barcode_number: '7000',
        selectWine:     false
    },

    {
        barcode_number: '7367',
        selectWine:     false
    },

    {
        barcode_number: '7368',
        selectWine:     false
    },

    {
        barcode_number: '7369',
        selectWine:     false
    },

    {
        barcode_number: '7371',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set I : メオ・セット（クロ・パラントゥ）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

