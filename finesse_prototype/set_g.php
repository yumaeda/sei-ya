<?php

$pageTitle = 'Set G｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8162',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8182',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8187',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8188',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8189',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8192',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8191',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8200',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '7366',
        selectWine:     false
    },

    {
        barcode_number: '7372',
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set G : ルーミエ・セット（アムルーズ）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

