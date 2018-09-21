<?php

$pageTitle = 'Set E｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8159',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8176',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8198',
        preOrder:       true,
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set E : ルーミエ・セット（ボンヌ・マール 1500ml）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

