<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../config.php");

if (isAuthenticated() && ($_SERVER['REQUEST_METHOD'] === 'POST'))
{
    if (isset($_POST['barcode']) &&
        isset($_POST['quantity']))
    {
        prepareNextQuery($dbc);

        $barcode  = mysqli_real_escape_string($dbc, $_POST['barcode']);
        $quantity = mysqli_real_escape_string($dbc, $_POST['quantity']);

        $result = mysqli_query($dbc, "CALL wholesale.add_to_cart('$userId', $barcode, $quantity)");
        if ($result !== FALSE)
        {
            echo 'SUCCESS';
        }
        else
        {
            echo 'FAIL';
        }
    }
}

mysqli_close($dbc);

?>
