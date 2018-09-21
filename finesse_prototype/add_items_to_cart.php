<?php

require('../includes/config.inc.php');
require(MYSQL);

$userId = startCartSession($dbc);

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $rgstrBarcode = isset($_POST['barcode']) ? $_POST['barcode'] : array();
    foreach ($rgstrBarcode as $key => $value)
    {
        prepareNextQuery($dbc);
        mysqli_query($dbc, "CALL add_to_cart_force('$userId', $value, 1)");
    }

    mysqli_close($dbc);
    $_SESSION['disable_cart_edit'] = true;

    redirectToPage('cart.php');
}

echo '
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <title>' . $pageTitle . '</title>
        <script type="text/javascript">

        document.createElement(\'header\');
        document.createElement(\'aside\');

        </script>
        <link rel="stylesheet" type="text/css" href="index.css" />
    </head>
    <body>
        <header>
            <div id="titlePane"></div>';

if ((session_status() == PHP_SESSION_NONE) ||
    (!isset($_SESSION['user_id']) || !isset($_SESSION['user_name'])))
{
    $returnUrl = urlencode('http://anyway-grapes.jp' . $_SERVER['REQUEST_URI']);

    echo '
        <p style="color:red;font-size:14px;margin-top:10px;">
            ※会員価格でご購入頂くには、会員登録後に必ず<a href="https://anyway-grapes.jp/login.php?return_url=' . $returnUrl . '">ログイン</a>してください。
        </p>';
}

echo '
        </header>
        <aside>
            <ul id="setWineList">
            </ul>
            <div id="totalPricePane"></div>
            <div id="checkoutPane">
                <div id="checkoutBtn">チェックアウト</div>
                <br />
                <span style="color:red;font-size:13px;">※予約販売のため、すべての商品の入荷後に発送いたします。</span>
            </div>
        </aside>
        <div class="contents"></div>
    </body>
</html>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="../scripts/seiya.functions-0.1.js"></script> 
<script type="text/javascript" src="./index.js"></script>';
