<?php

define('BASE_URL', 'anyway-grapes.jp/wholesale/');

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../../includes/wholesale_defines.php");
require_once("$curDirPath/../../includes/mysql.inc.php");

function isSessionTimeout()
{
    $isTimedout = FALSE;

    if (isset($_SESSION['BUSINESS_CUSTOMER_LAST_ACCESS']))
    {
        $sinceLastActivity = time() - $_SESSION['BUSINESS_CUSTOMER_LAST_ACCESS'];
        $timeoutPeriod     = 6 * 60 * 60; // 6 hours
        if ($sinceLastActivity > $timeoutPeriod)
        {
            $isTimedout = true;
        }
    }

    $_SESSION['BUSINESS_CUSTOMER_LAST_ACCESS'] = time();
    return $isTimedout;
}

// Generate and set the Session ID for the user.
if (!isset($_COOKIE['SESSION']) || (strlen($_COOKIE['SESSION']) !== 32))
{
    $randomId = openssl_random_pseudo_bytes(16);
    $randomId = bin2hex($randomId);

    // Set cookie, which expires in 24 hours.
    $expireDate = time() + (1 * 24 * 60 * 60);
    setcookie('SESSION', $randomId, $expireDate, '/wholesale', 'anyway-grapes.jp');
}
else
{
    session_id($_COOKIE['SESSION']);
}

// Start session.
if (session_status() == PHP_SESSION_NONE)
{
    if (session_start() == FALSE)
    {
        exit('Failed to start Session!!');
    }
}

$userId = session_id();

// If the session is timed out, navigate user to the timeout page.
if (isSessionTimeout())
{
    mysqli_query($dbc, "CALL wholesale.clear_cart_items('$userId')");

    // Regenerate the Session ID if the previous Session is already expired.
    if (session_regenerate_id(true))
    {
        $location = 'https://' . BASE_URL . 'timeout.php';
        header("Location: $location");
        exit();
    }
    else
    {
        exit('Failed to regenerate the Session ID!!');
    }
}

function redirectToIndexPage()
{
    $location = 'https://' . BASE_URL;
    header("Location: $location");

    exit();
}

function isAuthenticated()
{
    $userId = isset($_SESSION['business_customer_id']) ? $_SESSION['business_customer_id'] : '';
    return filter_var($userId, FILTER_VALIDATE_EMAIL);
}

