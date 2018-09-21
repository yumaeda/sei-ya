<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../config.php");

if (isAuthenticated() && ($_SERVER['REQUEST_METHOD'] === 'POST'))
{
    prepareNextQuery($dbc);

    $barcode = isset($_POST['id']) ? $_POST['id'] : '';
    $result  = mysqli_query($dbc, "CALL wholesale.remove_cart_item('$userId', '$barcode')");

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
