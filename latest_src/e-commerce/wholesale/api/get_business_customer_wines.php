<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/../config.php");

if (isAuthenticated() && ($_SERVER['REQUEST_METHOD'] === 'GET'))
{
    $keyword  = isset($_GET['keyword'])  ? $_GET['keyword']  : '';
    $barcode  = isset($_GET['id'])       ? $_GET['id']       : '';
    $type     = isset($_GET['type'])     ? $_GET['type']     : '';
    $country  = isset($_GET['country'])  ? $_GET['country']  : '';
    $region   = isset($_GET['region'])   ? $_GET['region']   : '';
    $producer = isset($_GET['producer']) ? $_GET['producer'] : '';

    $rows = array();

    prepareNextQuery($dbc);

    if ($keyword != '')
    {
	$result = mysqli_query($dbc, "CALL get_business_customer_wines_by_keyword('$keyword')");
    }
    else
    {
	$result = ($barcode != '') ? 
	    mysqli_query($dbc, "CALL get_business_customer_wine('$barcode')") :
	    mysqli_query($dbc, "CALL get_business_customer_wines('$type', '$country', '$region', '$producer')");
    }

    if ($result !== FALSE)
    {
        while ($row = mysqli_fetch_assoc($result))
        {
            $rows[] = $row;
        }

        echo json_encode($rows);
        mysqli_free_result($result);
    }
}

mysqli_close($dbc);

?>
