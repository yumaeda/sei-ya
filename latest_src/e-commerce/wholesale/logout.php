<?php

require_once('./config.php');

if (isAuthenticated())
{
    // Clear cart.
    mysqli_query($dbc, "CALL wholesale.clear_cart_items('$userId')");

    // Unset Session variables.
    $_SESSION = array();

    // Remove the client cookie.
    if (isset($_COOKIE['PHPSESSID']))
    {
        setcookie('PHPSESSID', '', time() - 1800, '/');
    }

    session_destroy();
}

mysqli_close($dbc);

$location = 'https://' . BASE_URL . 'login.php';
header("Location: $location");
exit();

?>
