<?php

$curDirPath = dirname(__FILE__);

ob_start();
require_once("$curDirPath/../defines.php");
require_once("$curDirPath/../dbutils.php");
ob_get_clean();

header('Content-Type: text/html;charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] === "POST")
{
    $dbTable  = $_POST["dbTable"];
    $id       = $_POST["id"];
    $quantity = $_POST["quantity"];

    addQuantity($dbTable, $id, $quantity);
}

?>