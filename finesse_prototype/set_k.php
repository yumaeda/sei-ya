<?php

$pageTitle = 'Set K｜世田谷区 経堂';
require_once('./add_items_to_cart.php');

?>

<script type="text/javascript">

var rgobjSetWine =
[
    {
        barcode_number: '8160',
        preOrder:       true,
        selectWine:     false
    },

    {
        barcode_number: '8155',
        preOrder:       true,
        selectWine:     false
    }
];

$(document).ready(function()
{
    WineSetPage.init('Set K : ルーミエ・セット（クロ・ド・ラ・ビュシエール）', rgobjSetWine);
    WineSetPage.prepareSetWineList();
    WineSetPage.renderHeader();
    WineSetPage.renderSetWineList();
    WineSetPage.onPostRender();
});

</script>

