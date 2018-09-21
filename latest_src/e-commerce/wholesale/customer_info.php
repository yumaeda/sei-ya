<?php

require_once('./config.php');

if (!isAuthenticated())
{
    $location = 'https://' . BASE_URL . 'login.php';
    header("Location: $location");

    exit();
}

$inputErrors = array();
$inputSrc    = 'SESSION';

$pageTitle = '会員情報｜Anyway-Grapes（飲食店様用）';
include_once('../includes/header.html');

echo '<div id="contents" style="width:100%;color:rgb(80,80,80);">';

$email    = $_SESSION['business_customer_id'];
$fUpdated = FALSE;

if ($_SERVER['REQUEST_METHOD'] === 'GET')
{
    $result = mysqli_query($dbc, "CALL get_business_customer('$email')");
    if (($result !== FALSE) && (mysqli_num_rows($result) === 1))
    {
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

        $_SESSION['name']          = $row['name'];
        $_SESSION['name_phonetic'] = $row['name_phonetic'];
        $_SESSION['post_code']     = $row['post_code'];
        $_SESSION['prefecture']    = $row['prefecture'];
        $_SESSION['address']       = $row['address'];
        $_SESSION['phone']         = $row['phone'];
    }
}
else
{
    $name         = $_SESSION['name'];
    $namePhonetic = $_SESSION['name_phonetic'];

    $postCode    = $_POST['post_code'];
    $prefecture  = $_POST['prefecture'];
    $address     = $_POST['address'];
    $phone       = $_POST['phone'];
    $fullAddress = "〒$postCode $prefecture$address";

    $result = mysqli_query($dbc, "CALL update_business_customer_info('$email', '$postCode', '$prefecture', '$address', '$phone')");
    if ($result !== FALSE)
    {
        $fUpdated = TRUE;
        $inputSrc = 'POST';
        echo '<p>お客様の情報が変更されました。</p><br /><br />';
    }
}

require_once('../includes/form_functions.inc.php');
echo '
    <form action="./customer_info.php" method="POST" accept-charset="utf-8">
        <table class="cartTable" style="width:100%">
            <tr>
                <td class="labelCol">
                    <label for="last_name">店名</label>
                </td>
                <td class="inputCol">' .  $_SESSION['name'] . '</td>
            </tr>
            <tr>
                <td class="labelCol">
                    <label for="last_name_phonetic">店名（ふりがな）</label>
                </td>
                <td class="inputCol">' .  $_SESSION['name_phonetic'] . '</td>
            </tr>
            <tr>
                <td class="labelCol">
                    <label for="phone">電話番号<span class="requiredCol">*</span></label>
                </td>
                <td class="inputCol">';

create_form_input('phone', 'text', '', $inputErrors, $inputSrc);

echo '
                </td>
            </tr>
            <tr>
                <td class="labelCol">
                    <label for="post_code">郵便番号<span class="requiredCol">*</span></label>
                </td>
                <td class="inputCol">';

create_form_input('post_code', 'text', '', $inputErrors, $inputSrc);

echo '
                </td>
            </tr>
            <tr>
                <td class="labelCol">都道府県</td>
                <td class="inputCol">';

create_form_input('prefecture', 'select', ' ', $inputErrors, $inputSrc);

echo '
                </td>
            </tr>
            <tr>
                <td class="labelCol">
                    <label for="address">住所<span class="requiredCol">*</span></label>
                </td>
                <td class="inputCol">';

$inputStyle = array('style' => 'width:95%;');
create_form_input('address', 'text', '', $inputErrors, $inputSrc, $inputStyle);

echo '
                </td>
            </tr>
        </table>
        <br /><br />
        <div style="width:100%;text-align:center;">
        <input id="updateInfoBtn" type="submit" style="background-color:white;border:1px solid rgb(224,224,224);display:inline;padding:15px 20px 15px 20px;" value="更新" />
            <div style="border:1px solid rgb(224,224,224);display:inline;padding:15px 20px 15px 20px;">
                <a href="javascript:window.top.close();" style="text-decoration:none;color:rgb(80,80,80);">買い物を続ける</a>
            </div>
        </div>
    </from>
</div>';

include_once('../includes/footer.html');
mysqli_close($dbc);

?>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="../scripts/seiya.functions-0.1.js"></script> 
<script type="text/javascript">

$(document).ready(function()
{
    $('div.contents').width(900);
});

</script>

