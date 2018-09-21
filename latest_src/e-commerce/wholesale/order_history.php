<?php

require_once('./config.php');

if (!isAuthenticated())
{
    $location = 'https://' . BASE_URL . 'login.php';
    header("Location: $location");

    exit();
}

$pageTitle = '注文履歴｜Anyway-Grapes（飲食店様用）';
include_once('../includes/header.html');

function generateWineListHtml($strContents)
{
    global $dbc;

    $html = '';

    $rgstrToken = explode('#;', $strContents);
    foreach ($rgstrToken as $strToken)
    {
        if (!empty($strToken))
        {
            $rgintToken = explode(':', $strToken);
            $code = $rgintToken[0];
            $qty  = $rgintToken[1];

            prepareNextQuery($dbc);

            $result = mysqli_query($dbc, "CALL get_business_customer_wine('$code')");
            if ($result !== FALSE)
            {
                $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

                $cartColumns = '';
                if ($row['stock'] > 0)
                {
                    $cartColumns = "
                        <td>
                            <span>
                                現在の価格（税別）<br />
                                <span style=\"color:darkred;font-size:13px;\">" .
                                    number_format($row['price']) . "&nbsp;yen
                                </span>
                            </span>
                        </td>
                        <td>
                            <img id=\"image_$code\" src=\"//anyway-grapes.jp/campaign/add_to_cart.png\" style=\"width:30px;height:30px;cursor:pointer;\" class=\"addToCartBtn\" title=\"もう一度購入する\" />
                        </td>";
                }
                else
                {
                    $cartColumns = '
                        <td colspan="2">
                            <span style="color:red;">完売しました。</span>
                        </td>';
                }

                $html .= "<table>
                              <tr>
                                  <td style=\"padding-right:10px;\">
                                      <img style=\"width:90px;\" src=\"//anyway-grapes.jp/images/wines/200px/$code.png\" onerror=\"this.src='//anyway-grapes.jp/images/wines/200px/no_wine_photo.jpg';\" />
                                  </td>
                                  <td style=\"width:600px;\">
                                      <a href=\"https://anyway-grapes.jp/wholesale/detail.php?id=$code\" target=\"_blank\" style=\"text-decoration:none;\">" .
                                          $row['vintage'] . '&nbsp;' . $row['combined_name_jpn'] . '&nbsp;/&nbsp;' . $row['producer_jpn'] . "
                                      </a>
                                      <br /><br />
                                      コード:&nbsp;&nbsp;$code<br />
                                      数　量:&nbsp;&nbsp;$qty
                                  </td>
                                  $cartColumns 
                              </tr>
                          </table>";
            }
        }
    }

    return $html;
}

echo '<div id="contents" style="width:100%;color:rgb(80,80,80);">';

$email     = $_SESSION['business_customer_id'];
$pdfFolder = $_SESSION['pdf_folder'];

$cMaxItemPerPage = 10;
$iPage      = (isset($_GET['page']) ? $_GET['page'] : 0);
$iStartItem = $iPage * $cMaxItemPerPage;

$result = mysqli_query($dbc, "CALL wholesale.get_business_orders_by_customer('$email', $iStartItem, 9999999)");
if ($result !== FALSE)
{
    $cItem = mysqli_num_rows($result);

    echo '
          <div id="popupPane" style="display:none;width:750px;padding:10px;background-color:black;color:white;">
          </div>'; 

    echo '<div id="paginatePane">';

    if ($iPage > 0)
    {
        echo '<a href="./order_history.php?page=' . ($iPage - 1) . '">&lt;&lt;&nbsp;前へ</a>&nbsp;&nbsp;&nbsp;';
    }

    echo 'Page&nbsp;' . ($iPage + 1);

    if (($iStartItem + $cMaxItemPerPage) <= $cItem)
    {
        echo '&nbsp;&nbsp;&nbsp;<a href="./order_history.php?page=' . ($iPage + 1) . '">次へ&nbsp;&gt;&gt;</a>';
    }

    echo '
          </div>
          <br />
          <table style="">
          <thead>
              <tr>
                  <td style="width:100px;text-align:left;">注文日</td>
                  <td style="width:150px;text-align:left;">オーダーID</td>
                  <td style="width:480px;text-align:left;">お届け先</td>
                  <td style="width:100px;text-align:left;">金額</td>
                  <td style="width:70px;text-align:left;">ステータス</td>
                  <td style="width:70px;text-align:center;">納品書</td>
              </tr>
          </thead>
          <tbody>';

    $i = 0;
    while (($i < $cMaxItemPerPage) && ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)))
    {
        $fShowPdfLink = TRUE;
        $orderId      = $row['filemaker_id'];
        if ($orderId == 'xxxxxx')
        {
            $orderId = 'ANYWAY_WS_' . str_pad($row['id'], 8, '0', STR_PAD_LEFT);
            $fShowPdfLink = FALSE;
        }

        $orderedDate   = date('Y年m月d日', strtotime($row['date_created']));
        $name          = $row['name'];
        $shippingFee   = $row['shipping_fee'];
        $wineTotal     = $row['wine_total'];
        $tax           = floor(0.08 * ($wineTotal + $shippingFee));
        $total         = $tax + ($wineTotal + $shippingFee);
        $paymentMethod = $row['payment_method'];
        $status        = $row['status'];
        $deliveryDate  = $row['delivery_date'];
        $deliveryTime  = $row['delivery_time'];
        $refrigerated  = ($row['refrigerated'] == 1) ? '利用する' : '利用しない';
        $address       = '〒' . $row['post_code'] . '&nbsp;' . $row['prefecture'] . $row['address'];
        $contents      = $row['contents'];
        $wineListHtml  = generateWineListHtml($contents);

        if ($paymentMethod == 1)
        {
            $paymentMethod = 'クレジットカード';
        }
        else if ($paymentMethod == 2)
        {
            $paymentMethod = '掛売り（銀行振込）';
        }

        if ($status == 0)
        {
            $status = '確定待ち';
        }
        else if ($status == 3)
        {
            $status = '発送待ち';
        }
        else if ($status == 4)
        {
            $status = '発送済み';
        }

        $strTotal       = number_format($total);
        $strWineTotal   = number_format($wineTotal);
        $strShippingFee = number_format($shippingFee);
        $strTax         = number_format($tax);
        $detailHtml     = "
            <input type=\"hidden\" value=\"$contents\" class=\"data_contents\" />
            $wineListHtml
            <hr style=\"margin:20px 0 0 0;height:1px;background-color:rgb(224,224,224);border:none;\" />
            <div style=\"padding:10px;\">
                <span style=\"font-size:13px;font-weight:bold;\">支払い方法</span><br />
                $paymentMethod
                <br /><br />
                <span style=\"font-size:13px;font-weight:bold;\">合計金額</span><br />
                $strTotal yen [&nbsp;<span class=\"data_wine_total\">$strWineTotal</span>（小計）+ <span class=\"data_shipping_fee\">$strShippingFee</span>（送料）+ <span class=\"data_tax\">$strTax</span>（消費税）]
                <br /><br />
                <span style=\"font-size:13px;font-weight:bold;\">配送先</span><br />
                <span class=\"data_address\">$address</span>
                <br /><br />
                <span style=\"font-size:13px;font-weight:bold;\">配送希望時間</span><br />
                <span class=\"data_delivery_date\">$deliveryDate</span>
                <span class=\"data_delivery_time\">$deliveryTime</span>
                <br /><br />
                <span style=\"font-size:13px;font-weight:bold;\">クール便</span><br />
                <span class=\"data_refrigerated\">$refrigerated</span>
            </div>";

        echo '
            <tr id="' . $row['id'] . '" class="listItemRow">
                <td style="width:120px;">' . $orderedDate . '</td>
                <td style="height:50px;">
                    <a href="#" class="orderDetailLnk">' . $orderId . '</a>
                </td>
                <td>' . $name . '</td>
                <td style="font-size:12px;">' . number_format($total) . ' yen</td>
                <td>' . $status . '</td>
                <td style="text-align:center;">';

        if ($fShowPdfLink)
        {
            echo '<a href="./receipts/' . $pdfFolder . '/' . $orderId . '.pdf" target="_blank"><img src="//anyway-grapes.jp/images/pdf.png" style="width:20px;" /></a>';
        }

        echo ' 
                </td>
            </tr>
            <tr id="' . $row['id'] . '_detail" style="display:none;" class="detailRow">
                <td colspan="5" style="border:1px solid rgb(224,224,224);">' . $detailHtml . '</td>
            </tr>';

        ++$i;
    }

    echo '<tbody>
          </table>';

    mysqli_free_result($result);
}

echo '
    <br /><br />
    <div style="width:100%;text-align:center;">
        <div style="border:1px solid rgb(224,224,224);display:inline;padding:15px 20px 15px 20px;">
            <a href="javascript:window.top.close();" style="text-decoration:none;color:rgb(80,80,80);">買い物を続ける</a>
        </div>
        <div style="border:1px solid rgb(224,224,224);display:inline;padding:15px 20px 15px 20px;"><a href="./cart.php" style="text-decoration:none;color:rgb(80,80,80);" target="_blank">カートを見る</a></div>
    </div>
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
    $('div.contents').on('click', 'a.orderDetailLnk', function(event)
    {
        var $tr = $(this).closest('tr'),
            id  = $tr.attr('id');

        $('tr.detailRow').hide();
        $('tr.listItemRow').css('font-weight', 'normal');

        $tr.css('font-weight', 'bold');
        $('tr#' + id + '_detail').fadeIn(1000);
    });

    $('div.contents').off('click', 'img.addToCartBtn');
    $('div.contents').on('click', 'img.addToCartBtn', function()
    {
        var $this      = $(this),
            strBarcode = $this.attr('id').replace(/image_/g, '');

        $this.attr('src', './load_ajax_post.gif');

        $.ajax(
        {
            url:  './api/add_to_cart.php',
            type: 'POST',
            data:
            {
                barcode: strBarcode,
                quantity: 1
            },

            dataType: 'text',
            success: function(strResult)
            {
                if (strResult == 'SUCCESS')
                {
                    $this.attr('src', './success.png');
                    $this.css('cursor', 'default');
                    $this.removeClass();
                }
            },

            error: function() {}
        });
    });
});

</script>

