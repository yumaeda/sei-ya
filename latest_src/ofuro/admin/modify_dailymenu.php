<?php

header('Content-Type: text/html;charset=utf-8');

ob_start();
require_once("defines.php");
require_once("dbutils.php");
ob_get_clean();


function tryUpdateDailyMenuDB($db, $rgobjKeyValue, $targetId)
{
    if (count($rgobjKeyValue) > 0)
    {
        $rgobjKeyValue["daily"] = 1;
        $query = generateUpdateTableQuery($_POST["dbTable"], $rgobjKeyValue, $targetId);

        if ($db->query($query) === FALSE)
        {
            die("Invalid SQL query: $query");
        }
    }
}


if ($_SERVER["REQUEST_METHOD"] != "POST")
{
    die(METHOD_ERR_MSG);
}

$id = "";
$curId = "";
$rgobjValue = array();

$mysqli = connectToMySql();

foreach ($_POST as $key => $value)
{
    if ($key != "dbTable")
    {
        $rgstrToken = explode(":", $key);
        $id = $rgstrToken[0];
        $colName = $rgstrToken[1];

        if ($curId === "")
        {
            $curId = $id;
        }

        if ($id != $curId)
        {
            tryUpdateDailyMenuDB($mysqli, $rgobjValue, $curId);

            $curId = $id;
            $rgobjValue = array();
        }

        if (($id > 0) || $value)
        {
            $rgobjValue[$colName] = $value;
        }
    }
}

// Execute the last SQL statement.
tryUpdateDailyMenuDB($mysqli, $rgobjValue, $curId);

$mysqli->close();
header("Location: index.html");

?>

