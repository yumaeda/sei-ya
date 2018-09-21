<?php

$pageTitle = 'Set H｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8173',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8174',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8177',
        preOrder:       true,
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set H : メオ・セット（リシュブール）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

