<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../config.php");

if (($_SERVER['REQUEST_METHOD'] === 'POST') && isAuthenticated())
{
    prepareNextQuery($dbc);
    if (isset($_SESSION['cart_checked_out']) && ($_SESSION['cart_checked_out'] == 1))
    {
        unset($_SESSION['cart_checked_out']);
        echo 'TRUE';
    }
}

mysqli_close($dbc);

?>
