<?php

if ('cart.php' === basename(strtok($_SERVER['HTTP_REFERER'], '?')))
{
    $curDirPath = dirname(__FILE__);
    require_once("$curDirPath/../config.php");

    if (($_SERVER['REQUEST_METHOD'] === 'POST') && isAuthenticated())
    {
        $fCheckedOut = FALSE;

        prepareNextQuery($dbc);
        mysqli_query($dbc, "CALL wholesale.checkout_cart_items('$userId', @fSuccess)");
        prepareNextQuery($dbc);

        $result = mysqli_query($dbc, 'SELECT @fSuccess');
        if ($result !== FALSE)
        {
            if (mysqli_num_rows($result) == 1)
            {
                list($fSuccess) = mysqli_fetch_array($result);
                if ($fSuccess == 1)
                {
                    $fCheckedOut = TRUE;
                }
            }

            mysqli_free_result($result);
        }

        if ($fCheckedOut === TRUE)
        {
            $_SESSION['cart_checked_out'] = 1;
            echo 'SUCCESS';
        }
        else
        {
            echo 'FAIL';
        }
    }

    mysqli_close($dbc);
}

?>
