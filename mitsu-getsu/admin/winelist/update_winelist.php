<?php

set_time_limit(0);

header('Content-Type: text/html;charset=utf-8');

$curDirPath = dirname(__FILE__);

ob_start();
require_once("$curDirPath/../defines.php");
require_once("$curDirPath/../dbutils.php");
ob_get_clean();

$mysqli = connectToMySql();

function clearTable($dbTable)
{
    global $mysqli;

    return execDBQuery("DELETE FROM $dbTable");
}

$dbTable = 'mitsugetsu_winelist';
$fSave   = isset($_POST['action']) && ($_POST['action'] === 'save'); 

clearTable($dbTable);

if ($fSave && isset($_POST["page_count"]))
{
    $cPage = $_POST['page_count'];
    for ($i = 1; $i <= $cPage; ++$i)
    {
        $pageTitle      = addslashes($_POST["page_title_$i"]);
        $jpnPageTitle   = addslashes($_POST["page_title_jpn_$i"]);
        $regionTitle    = addslashes($_POST["region_title_$i"]);
        $jpnRegionTitle = addslashes($_POST["region_title_jpn_$i"]);

        $j = 1;
        while (isset($_POST[('page_' . $i . '_item_' . $j)]))
        {
            $wineValue = addslashes($_POST[('page_' . $i . '_item_' . $j)]);

            $insertQuery = "INSERT INTO $dbTable (
                page_number,
                item_number,
                name,
                name_jpn,
                region,
                region_jpn,
                comment) VALUES (
                $i,
                $j,
                '$pageTitle',
                '$jpnPageTitle',
                '$regionTitle',
                '$jpnRegionTitle',
                '$wineValue')";

            $mysqli->query($insertQuery);

            ++$j;
        }
    }
}

$mysqli->close();
echo 'SUCCESS';

?>
