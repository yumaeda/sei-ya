<?php

// Do not use the value of $_SERVER["DOCUMENT_ROOT"] since it does not work for IIS.
$_SERVER["DOCUMENT_ROOT"] =
    substr($_SERVER["SCRIPT_FILENAME"], 0, -strlen($_SERVER["SCRIPT_NAME"]));

define (DB_SERVER, "localhost");
define (DB_LOGIN, "seiya_admin1");
define (DB_PWD, "mitsugetsuP@ssw0rd");
define (DB_NAME, "seiya_mitsugetsu");

define (LOCAL_APP_DIR, $_SERVER["DOCUMENT_ROOT"] . "/");
define (MAX_SIZE, 400);
