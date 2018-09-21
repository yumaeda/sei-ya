<?php

header('Content-Type: text/html;charset=utf-8');
require_once('dbutils.php');


$tmpDBTables = array();

$targetDir = 'csv';
if ($hDir = opendir($targetDir))
{
    while (FALSE !== ($entry = readdir($hDir)))
    {
        if ($entry !== '.' && $entry !== '..')
        {
            $keyColName = 'id';

            // TODO yumaeda: Figure out the better logic for changing a primary key.
            if (($entry === 'ofuro_recommended_wines.csv') ||
                ($entry === 'mitsugetsu_recommended_wines.csv'))
            {
                $keyColName = 'item_number';
            }

            if (importCsv("$targetDir/$entry", $tmpDBTables, $keyColName))
            {
                echo("Finished importing $entry.");
            }
            else
            {
                echo("Failed importing $entry.");
            }
        }
    }

    closedir($hDir);
    exportDBTableColumnNames($tmpDBTables);
}

?>
