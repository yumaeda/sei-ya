<?php

require_once('./config.php');

$pageTitle = 'セッションタイムアウト｜anyway-grapes.jp';
include('../includes/header.html');

echo '
    <span class="engFont" style="font-size:15px;">Session Timeout</span>&nbsp;/&nbsp;<span style="font-size:10px;">セッションタイムアウト</span>
    <hr class="lineThin" />
    <p>
        サーバーへのアクセスが一定時間なかったため、処理を中断しました。
        <br />
        お手数ですが以下のページからログインしなおしてください。
        <br /><br />
        <a href="https://anyway-grapes.jp/wholesale/logout.php">ログインページ</a>
    </p>
';

include('../includes/footer.html');

mysqli_close($dbc);

?>
