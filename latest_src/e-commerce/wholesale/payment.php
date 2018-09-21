<?php

$curDirPath = dirname(__FILE__);
require_once("$curDirPath/config.php");

$errorMessage = '';
$inputErrors  = array();
if (($_SERVER['REQUEST_METHOD'] === 'POST') && isAuthenticated())
{
    $fPaid   = FALSE;
    $tokenId = '';

    if (isset($_POST['wine_total']) && isset($_POST['shipping_fee']))
    {
        $totalWinePrice = (int)$_POST['wine_total'];
        $shippingFee    = (int)$_POST['shipping_fee'];
        $paymentTotal   = floor(1.08 * ($totalWinePrice + $shippingFee));
    }

    if ('cart.php' !== basename(strtok($_SERVER['HTTP_REFERER'], '?')))
    {
        $cvc        = mysqli_real_escape_string($dbc, $_POST['cvc']);
        $holderName = mysqli_real_escape_string($dbc, $_POST['holder_name']);
        $expMonth   = mysqli_real_escape_string($dbc, $_POST['expMonth']);
        $expYear    = mysqli_real_escape_string($dbc, $_POST['expYear']);
        $cardNumber = mysqli_real_escape_string($dbc, $_POST['card_number_1']) .
            mysqli_real_escape_string($dbc, $_POST['card_number_2']) .
            mysqli_real_escape_string($dbc, $_POST['card_number_3']) .
            mysqli_real_escape_string($dbc, $_POST['card_number_4']);

        if (empty($holderName))
        {
            $inputErrors['holder_name'] = '値を入力してください。';
        }

        if (!preg_match("/^[0-9]{3,4}$/", $cvc))
        {
            $inputErrors['cvc'] = '3桁、もしくは4桁のセキュリティーコードを入力してください。';
        }

        if (!preg_match("/^4[0-9]{12,15}$/",         $cardNumber) && // VISA
            !preg_match("/^5[1-5][0-9]{14}$/",       $cardNumber) && // MasterCard
            !preg_match("/^35[2-8][0-9][0-9]{12}$/", $cardNumber) && // JCB
            !preg_match("/^3[47][0-9]{13}$/",        $cardNumber) && // American Express
            !preg_match("/^3[0-9]{13}$/",            $cardNumber))   // Diners Club International
        {
            $inputErrors['card_number'] = 'クレジットカードの番号をご確認ください。';
        }

        if (empty($inputErrors))
        {
            $paymentId =
                date('Ymd-His') . '_' . $_SESSION['business_customer_id'];

            require_once('../../includes/util.inc.php');

            try
            {
                require_once('../../includes/veritrans.inc.php');
$paymentId = 'TEST012345678901' . rand(0, 999);
                $objResponse = chargeWithVeritrans($paymentId, $paymentTotal, $cardNumber, $expMonth, $expYear, $cvc);
                if ($objResponse === FALSE)
                {
                    $errorMessage = 'システムのメンテナンス中のため、ご注文を承ることができませんでした。お手数ですが、数時間後に再度お試し下さい。';
                }
                else if ($objResponse->status !== 'success')
                {
                    $vResultCode = isset($objResponse->vresult_code) ? substr($objResponse->vresult_code, 0, 4) : '';
                    if ($vResultCode === '')
                    {
                        error_log($objResponse->message, 1, 'sysadm@anyway-grapes.jp');
                        $inputErrors['card_number'] = '指定されたクレジットカードでは決済できませんでした。カード番号、セキュリティーコード、有効期限を確認のうえ再入力頂くか、「銀行振り込み」を選択して下さい。';
                    }
                    else
                    {
                        error_log($vResultCode . ': ' . $objResponse->message, 1, 'sysadm@anyway-grapes.jp');

                        switch ($vResultCode)
                        {
                        case 'AG33': // カード使用不可（VISAで、CVCが違う場合このコードになった。）
                        case 'AG41': // セキュリティコード誤りです。
                        case 'AG49': // 会員番号エラー
                        case 'AG64': // 有効期限エラー
                            $inputErrors['card_number'] = '指定されたクレジットカードでは決済できませんでした。カード番号、セキュリティーコード、有効期限を確認のうえ再入力頂くか、「銀行振り込み」を選択して下さい。';
                            break;
                        case 'AB12': // DBにFCBCがありません。 
                        case 'AG39': // 取引判定保留（有人判定）です。
                        case 'AG44': // 1口座利用回数または金額オーバーです。
                        case 'AG45': // 1日限度額オーバーです。
                        case 'AG46': // クレジットカードが無効です。
                        case 'AG47': // 事故カードです。
                        case 'AG48': // 無効カードです。
                            $inputErrors['card_number'] = '指定されたカードはご利用頂けません。別のカードをご利用頂くか、カード発行会社へお問い合わせください。';
                            break;
                        case 'AC09': // ダミー取引では利用できないカード番号です。
                        case 'AC25': // カード番号パラメータの書式が誤り
                        case 'AC27': // カード番号パラメータの値がディジットエラーです。
                        case 'AC30': // カード有効期限パラメータの書式が誤り
                        case 'AC38': // パラメータで指定した金額が超過
                        case 'ACD3': // 取引は期限切れです。
                        case 'ACD4': // 元取引は成功の状態ではない
                        case 'ACD6': // 元取引が存在しません。
                        case 'AG51': // 極端に大きな金額や0円などの金額入力が誤っている。
                        case 'AG61': // お客様のカードが指定された支払い回数に対応していない。
                        case 'AG70': // 当該要求拒否です。
                        case 'AG71': // 当該自社対象業務エラーです。
                        case 'AG72': // 接続要求自社受付拒否です。
                        case 'AE10': // トランザクションが保留
                        case 'NC06': // 無効なパラメータ
                        case 'NH02': // 指定されたOrder Idの注文が既にキャンセルされているなど、取引の状態に問題がある
                        case 'NH04': // 取引が重複
                        case 'NH05': // 取引が処理中
                        case 'NH18': // 既に決済済みのOrder Idを指定してchargeを要求した場合
                        case 'NH40': // Order IDが他のサービスで使用済み
                        case 'NH42': // テストモードでのOrder IDが無効です。
                        default:
                            $errorMessage = 'システムのメンテナンス中のため、ご注文を承ることができませんでした。お手数ですが、数時間後に再度お試し下さい。';
                            break;
                        }
                    }
                }
            }
            catch (\Exception $e)
            {
                sendErrorMail($e);
                $errorMessage = 'システムのメンテナンス中のため、ご注文を承ることができませんでした。お手数ですが、数時間後に再度お試し下さい。';
            }

            if (empty($inputErrors) && ($errorMessage == ''))
            {
                $fPaid = TRUE;
            }
        }
    }

    if (isset($_POST['payment_method']) &&
        isset($_POST['contents']) &&
        isset($_POST['delivery_date']) &&
        isset($_POST['delivery_time']) &&
        isset($_POST['name']) &&
        isset($_POST['address']))
    {
        $intPaymentMethod = (int)$_POST['payment_method'];
        $strOrderedWines  = $_POST['contents'];
        $deliveryDate     = mysqli_real_escape_string($dbc, $_POST['delivery_date']); 
        $deliveryTime     = mysqli_real_escape_string($dbc, $_POST['delivery_time']);
        $intCool          = $_POST['refrigerated'];
        $name             = mysqli_real_escape_string($dbc, $_POST['name']);
        $address          = mysqli_real_escape_string($dbc, $_POST['address']);

        if (($intPaymentMethod == 2) || $fPaid)
        {
            $fCheckedOut = FALSE;

            prepareNextQuery($dbc);
            mysqli_query($dbc, "CALL wholesale.checkout_cart_items('$userId', @fSuccess)");
            prepareNextQuery($dbc);

            $result = mysqli_query($dbc, 'SELECT @fSuccess');
            if ($result !== FALSE)
            {
                if (mysqli_num_rows($result) == 1)
                {
                    list($fSuccess) = mysqli_fetch_array($result);
                    if ($fSuccess == 1)
                    {
                        $fCheckedOut = TRUE;
                    }
                }

                mysqli_free_result($result);
            }

            if ($fCheckedOut)
            {
                $_SESSION['cart_checked_out'] = 1;
                prepareNextQuery($dbc);

                $email        = $_SESSION['business_customer_id'];
                $ipAddress    = '';
                $userAgent    = $_SERVER['HTTP_USER_AGENT'];
                $ipAddress    = isset($_SERVER['REMOTE_ADDR']) ? mysqli_real_escape_string($dbc, $_SERVER['REMOTE_ADDR']) : '';

                if ($ipAddress === '')
                {
                    $ipAddress = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? mysqli_real_escape_string($dbc, $_SERVER['HTTP_X_FORWARDED_FOR']) : '';
                }

                $result  = mysqli_query($dbc, "CALL wholesale.add_business_order('$email', '$strOrderedWines', $intPaymentMethod, '$deliveryDate', '$deliveryTime', $intCool, $totalWinePrice, $shippingFee, '$ipAddress', '$userAgent')");

                if ($result !== FALSE)
                {
                    if (mysqli_affected_rows($dbc) == 1)
                    {
                        $subject      = 'Anyway-Grapes: ご注文の確認';
                        $orderEmail   = 'order@anyway-grapes.jp';
                        $archiveEmail = 'archive@anyway-grapes.jp';

                        list($insertedId) = mysqli_fetch_array($result);
                        $orderId         = 'ANYWAY_WS_' . str_pad($insertedId, 8, '0', STR_PAD_LEFT);
                        $strOrderedWines = $_POST['contents'];

                        $deliverTo       = "$name 御中";
                        $deliveryCompany = '佐川急便';

                        $curDirPath = dirname(__FILE__);
                        require_once("$curDirPath/../mails/text/wholesale/business_order_received_mail_body.php");
                        require("$curDirPath/../../../../includes/text_mail.inc.php");
                        sendMailAsPlainText(
                            $email,
                            $deliverTo,
                            $orderEmail,
                            $archiveEmail,
                            $subject,
                            $textMessage
                        );
                    }

                    mysqli_free_result($result);
                }
            }

            echo '<script type="text/javascript">window.top.close();</script>';
            exit();
        }
    }
}

require_once('../includes/form_functions.inc.php');

$pageTitle = 'カード決済｜Anyway-Grapes（飲食店様用）';
include_once('../includes/header.html');

echo '
    <form action="./payment.php" method="POST">
        <input type="hidden" name="payment_method" value="' . $intPaymentMethod . '" />
        <input type="hidden" name="wine_total"     value="' . $totalWinePrice . '" />
        <input type="hidden" name="shipping_fee"   value="' . $shippingFee . '" />
        <input type="hidden" name="contents"       value="' . $strOrderedWines . '" />
        <input type="hidden" name="delivery_date"  value="' . $deliveryDate . '" />
        <input type="hidden" name="delivery_time"  value="' . $deliveryTime . '" />
        <input type="hidden" name="name"           value="' . $name . '" />
        <input type="hidden" name="address"        value="' . $address . '" />
        <input type="hidden" name="refrigerated"   value="' . $intCool . '" />
        <table style="width:100%;">
            <tr>
                <td>
                    <table id="cardTable" style="margin:0 auto 0 auto;width:550px;">
                    <tr>
                        <td style="vertical-align:top;width:150px;padding-bottom:15px;">カード番号</td>
                        <td style="padding-bottom:15px;">';
create_credit_card_number_input($inputErrors);
echo '
                        </td>
                    </tr>
                    <tr>
                        <td style="vertical-align:top;width:150px;padding-bottom:15px;">セキュリティーコード</td>
                        <td style="padding-bottom:15px;">';
create_form_input('cvc', 'text', '', $inputErrors, 'POST', array('maxlength' => 4, 'size' => 4, 'autocomplete' => 'off'));
echo '
                        </td>
                    </tr>
                    <tr>
                        <td style="vertical-align:top;width:150px;padding-bottom:15px;">カード名義</td>
                        <td style="padding-bottom:15px;">';
create_form_input('holder_name', 'text', '', $inputErrors);
echo '
                        </td>
                    </tr>
                    <tr>
                        <td style="vertical-align:top;width:150px;padding-bottom:15px;">有効期限</td>
                        <td style="padding-bottom:15px;">';
create_expiration_eng_input($inputErrors);
echo '
                        </td>
                    </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div align="center" style="padding-top:25px;">
            <input style="font-size:12px;color:rgb(80,80,80);cursor:pointer;padding:10px;background-color:floralwhite;border:1px solid rgb(224,224,224);" id="paymentBtn" type="submit" value="支払いをする（' . number_format($paymentTotal) . ' yen）" />
            &nbsp;
            <a href="javascript:window.top.close();" style="font-size:12px;padding:10px;background-color:floralwhite;color:rgb(80,80,80);text-decoration:none;border:1px solid rgb(224,224,224);">キャンセル</a>
            <br /><br /><br />
            <img id="cardLogos" src="../cart_images/creditcard_logos.png" />
        </div>
    </form>
</div>';

include_once('../includes/footer.html');
mysqli_close($dbc);

?>
