<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../config.php");

if (isAuthenticated() && ($_SERVER['REQUEST_METHOD'] === 'GET'))
{
    prepareNextQuery($dbc);

    $result = mysqli_query($dbc, "CALL wholesale.get_cart_item_total('$userId')");
    if ($result !== FALSE)
    {
        if (mysqli_num_rows($result) == 1)
        {
            $row = mysqli_fetch_assoc($result);
            echo $row['total_price'];
        }

        mysqli_free_result($result);
    }
}

mysqli_close($dbc);

?>
