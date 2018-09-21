<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../config.php");

if (isAuthenticated() && ($_SERVER['REQUEST_METHOD'] === 'POST'))
{
    prepareNextQuery($dbc);

    $barcode = isset($_POST['id'])  ? $_POST['id'] : '';
    $qty     = isset($_POST['qty']) ? $_POST['qty'] : '';
    $result  = mysqli_query($dbc, "CALL wholesale.set_cart_item_quantity('$userId', '$barcode', $qty)");

    if (($result !== FALSE) && (mysqli_affected_rows($dbc) == 1))
    {
        echo 'SUCCESS';
    }
    else
    {
        echo 'FAIL';
    }
}

mysqli_close($dbc);

?>
