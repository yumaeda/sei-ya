<?php

require_once('./config.php');

if (!isAuthenticated())
{
    $location = 'https://' . BASE_URL . 'login.php';
    header("Location: $location");

    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    if (isset($_POST['barcode']) && isset($_POST['quantity']))
    {
        $barcode  = isset($_POST['barcode'])  ? $_POST['barcode']  : '';
        $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : 0;

        mysqli_query($dbc, "CALL wholesale.add_to_cart('$userId', $barcode, $quantity)");
    }
}
else
{
}

function generateDeliveryDateSelectHtml($prefecture)
{
    $rgstr2DaysDelivery = array(
        '北海道',
        '青森県',
        '愛媛県',
        '香川県',
        '高知県',
        '鳥取県',
        '広島県',
        '島根県',
        '山口県',
        '岡山県',
        '福岡県',
        '大分県',
        '佐賀県',
        '鹿児島県',
        '長崎県',
        '宮崎県',
        '熊本県'
    );

    $html = '
        <select id="deliveryDateSelect">
            <option value="指定なし">指定なし</option>';

    $intDays      = 1;
    $intHour      = (int)date('H');
    $intDayOfWeek = (int)date('N');

    if (($intHour > 13) || ($intDayOfWeek == 2))
    {
        ++$intDays;
    }

    if (($intHour > 13) && ($intDayOfWeek == 1))
    {
        ++$intDays;
    }

    if (in_array($prefecture, $rgstr2DaysDelivery))
    {
        ++$intDays;
    }
    else if ($prefecture === '沖縄県')
    {
        $intDays += 2;
    }

    for ($i = $intDays; $i < ($intDays + 5); ++$i)
    {
        $tmpDate = date('Y年m月d日', strtotime("+$i days"));

        $html .= '<option value="' . $tmpDate . '">' . $tmpDate . '</option>';
    }

    $html .= '</select>';

    return $html;
}

function generateDescriptionHtml()
{
    global $dbc;

    $html       = '';
    $customerId = $_SESSION['business_customer_id'];
    $prefecture = '';

    $result = mysqli_query($dbc, "CALL wholesale.get_business_customer('$customerId')");
    if ($result !== FALSE)
    {
        if (mysqli_num_rows($result) == 1)
        {
            $row        = mysqli_fetch_array($result, MYSQLI_ASSOC);
            $prefecture = $row['prefecture'];
            $html = '
                <span id="nameSpan" style="font-size:20px;">' . $row['name'] . '</span>(<span id="emailSpan">' . $customerId . '</span>)<br />
                〒<span id="postCodeSpan">' . $row['post_code'] . '</span>&nbsp;<span id="prefectureSpan">' . $prefecture . '</span><span id="addressSpan">' . $row['address'] . '</span><br />
                TEL / ' . $row['phone'];
        }

        mysqli_free_result($result);
    }

    $html .= '
        <hr style="border:none;height:1px;background-color:rgb(224,224,224);margin:15px 0 15px 0;" />
        ご希望のお届け日時：' . generateDeliveryDateSelectHtml($prefecture) . '
        &nbsp;&nbsp;
        <select id="deliveryTimeSelect">
            <option value="指定なし">指定なし</option>
            <option value="午前中（8時～12時）">午前中（8時～12時）</option>
            <option value="12時～14時">12時～14時</option>
            <option value="14時～16時">14時～16時</option>
            <option value="16時～18時">16時～18時</option>
            <option value="18時～20時">18時～20時</option>
            <option value="18時～21時">18時～21時</option>
        </select>
        ';

    $html .= '
        <p style="padding:10px 0 10px 0;">
            お支払い方法：
            &nbsp;&nbsp;
            <input type="radio" name="payment_method" value="2" checked="checked">&nbsp;掛売り（銀行振込）
            <input type="radio" name="payment_method" value="1">&nbsp;クレジットカード
        </p>
        ';

    $strChecked = '';
    $intMonth   = intval(date('n'));
    if (($intMonth >= 5) && ($intMonth <= 10))
    {
        $strChecked = ' checked="checked"';
    }

    $html .= '
        <p style="padding:10px 0 10px 0;">
            クール便の利用：
            &nbsp;&nbsp;
            <input type="checkbox" name="refrigerated" value="1"' . $strChecked . ' />
        </p>';

    return $html;
}

$pageTitle = 'ショッピングカート｜Anyway-Grapes（飲食店様用）';
include_once('../includes/header.html');

echo '<div id="contents" style="width:100%;color:rgb(80,80,80);">';

$result = mysqli_query($dbc, "CALL wholesale.get_cart_items('$userId')");
if ($result !== FALSE)
{
    if (mysqli_num_rows($result) > 0)
    {
        echo '<span style="font-size:22px;">Wines in Your Cart&nbsp;(<span id="itemCountSpan"></span>)</span>
              <table style="width:100%">
                  <tbody>';

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $price          = $row['price'];
            $quantity       = $row['quantity'];
            $producerName   = $row['producer'] ? $row['producer'] : '';
            $barcodeNumber  = $row['barcode_number'];
            $intStock       = $row['stock'];

            $detailTableHtml = '
                <table style="width:400px;">
                    <tr>
                        <td>
                            <span style="font-weight:bold">' . $row['name'] . '</span><br />' . $producerName . '
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:11px;padding:10px 0 10px 0;">
                            生産年:&nbsp;&nbsp;' . $row['vintage'] . '<br />
                            国　名:&nbsp;&nbsp;' . $row['country'] . '<br />
                            種　類:&nbsp;&nbsp;' . $row['type'] . '<br />
                        </td>
                    </tr>
                    <tr>
                        <td><a href="#" class="removeLnk">削除</a></td>
                    </tr>
                </table>';

            $imgHtml  = "<img style=\"width:110px;\" src=\"//anyway-grapes.jp/images/wines/200px/$barcodeNumber.png\" onerror=\"this.src='//anyway-grapes.jp/images/wines/200px/no_wine_photo.jpg';\" />";
            $qtyHtml  = "<input type=\"number\" min=\"1\" max=\"$intStock\" value=\"$quantity\" />";
            $strPrice = number_format($price);
            $total    = '¥' . number_format($price * $quantity);

            echo '
                <tr>
                    <td colspan="6" style="padding:10px 0 10px 0;">
                        <hr style="border:none;height:1px;background-color:rgb(224,224,224);" />
                    </td>
                </tr>';

            echo "
                <tr id=\"$barcodeNumber\" class=\"itemTr\">
                    <td>$imgHtml</td>
                    <td>$detailTableHtml</td>
                    <td class=\"priceCol\">¥$strPrice</td>
                    <td style=\"width:30px;text-align:center;\">x</td>
                    <td class=\"quantityCol\">$qtyHtml</td>
                    <td class=\"amountCol\" style=\"width:80px;text-align:right;font-weight:bold;\">$total</td>
                </tr>
                <tr id=\"$barcodeNumber" . "_error\"></tr>";

        }

        prepareNextQuery($dbc);

        echo '    
                      <tr>
                          <td colspan="6" style="padding:10px 0 30px 0;">
                              <hr style="border:none;height:1px;background-color:rgb(224,224,224);" />
                          </td>
                      </tr>
                  </tbody>
                  <tfoot>
                      <tr>
                          <td colspan="2" style="background-color:white;">' . generateDescriptionHtml() . '</td>
                          <td colspan="4" id="totalPane"></td>
                      </tr>
                  </tfoot>
              </table>';
    }

    mysqli_free_result($result);
}

echo '
    <br /><br />
    <div style="width:100%;text-align:right;">
        <div style="border:1px solid rgb(224,224,224);display:inline;padding:15px 20px 15px 20px;margin-right:10px;"><a href="javascript:window.top.close();" style="text-decoration:none;color:rgb(80,80,80);">買い物を続ける</a></div>
        <div id="checkoutBtn" style="border:1px solid rgb(224,224,224);display:inline;padding:15px 20px 15px 20px;"></div>
    </div>
</div>';

include_once('../includes/footer.html');
mysqli_close($dbc);

?>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="../scripts/seiya.functions-0.1.js"></script> 
<script type="text/javascript">

var wineTotal   = 0,
    shippingFee = 0,
    fCool       = $('div.contents input[name=refrigerated]').prop('checked');

var shippingFeeHash = 
    {
        '北海道':   1200,
        '青森県':   1000,
        '岩手県':   1000,
        '秋田県':   1000,
        '宮城県':   900,
        '山形県':   900,
        '福島県':   900,
        '茨城県':   800,
        '栃木県':   800,
        '群馬県':   800,
        '埼玉県':   800,
        '千葉県':   800,
        '東京都':   800,
        '神奈川県': 800,
        '新潟県':   800,
        '富山県':   800,
        '石川県':   800,
        '福井県':   800,
        '山梨県':   800,
        '長野県':   800,
        '岐阜県':   800,
        '静岡県':   800,
        '愛知県':   800,
        '三重県':   800,
        '滋賀県':   900,
        '京都府':   900,
        '大阪府':   900,
        '兵庫県':   900,
        '奈良県':   900,
        '和歌山県': 900,
        '鳥取県':   1000,
        '島根県':   1000,
        '岡山県':   1000,
        '広島県':   1000,
        '山口県':   1000,
        '徳島県':   1100,
        '香川県':   1100,
        '愛媛県':   1100,
        '高知県':   1100,
        '福岡県':   1200,
        '佐賀県':   1200,
        '長崎県':   1200,
        '大分県':   1200,
        '熊本県':   1200,
        '宮崎県':   1200,
        '鹿児島県': 1200,
        '沖縄県':   1500
    },

    coolShippingFeeHash = 
    {
        '北海道':   2150,
        '青森県':   1850,
        '岩手県':   1850,
        '秋田県':   1850,
        '宮城県':   1750,
        '山形県':   1750,
        '福島県':   1750,
        '茨城県':   1750,
        '栃木県':   1750,
        '群馬県':   1750,
        '埼玉県':   1750,
        '千葉県':   1750,
        '東京都':   1750,
        '神奈川県': 1750,
        '新潟県':   1750,
        '富山県':   1750,
        '石川県':   1750,
        '福井県':   1750,
        '山梨県':   1750,
        '長野県':   1750,
        '岐阜県':   1750,
        '静岡県':   1750,
        '愛知県':   1750,
        '三重県':   1750,
        '滋賀県':   1850,
        '京都府':   1850,
        '大阪府':   1850,
        '兵庫県':   1850,
        '奈良県':   1850,
        '和歌山県': 1850,
        '鳥取県':   1950,
        '島根県':   1950,
        '岡山県':   1950,
        '広島県':   1950,
        '山口県':   1950,
        '徳島県':   2050,
        '香川県':   2050,
        '愛媛県':   2050,
        '高知県':   2050,
        '福岡県':   2150,
        '佐賀県':   2150,
        '長崎県':   2150,
        '大分県':   2150,
        '熊本県':   2150,
        '宮崎県':   2150,
        '鹿児島県': 2150,
        '沖縄県':   3600
    };


function redirectWithPostData(redirectUrl, objParam)
{
    var formHtml = '<form action="{0}" method="post">'.format(redirectUrl);

    for (var property in objParam)
    {
        if (objParam.hasOwnProperty(property))
        {
            formHtml += '<input type="hidden" name="{0}" value="{1}" />'.format(property, objParam[property]);
        }
    }

    formHtml += '</form>';

    var $form = $(formHtml);
    $('body').append($form);
    $form.submit();
}

function getItemCount()
{
    var cItem = 0;
    $('td.quantityCol > input').each(function(index)
    {
        cItem += parseInt($(this).val(), 10);
    });

    return cItem;
}

function getShippingFee()
{
    var strPrefecture = $('span#prefectureSpan').html(),
        intBaseFee    = (fCool ? coolShippingFeeHash[strPrefecture] : shippingFeeHash[strPrefecture]),
        cItem         = getItemCount();

    return (intBaseFee * Math.floor(cItem / 12));
}

function refreshTotal()
{
    $.ajax(
    {
        url:  './api/get_cart_item_total.php',
        type: 'GET',
        data:
        {
        },

        dataType: 'text',
        success: function(strResult)
        {
            wineTotal   = parseInt(strResult, 10);
            shippingFee = getShippingFee();

            var html     = '',
                taxRate  = 0.08,
                intTax   = Math.floor(taxRate * (wineTotal + shippingFee)),
                intTotal = wineTotal + shippingFee + intTax;

            html =
                '<table style="width:100%;border-collapse:collapse;">' +
                    '<tr>' +
                        '<td style="border:none;">小　計</td>' +
                        '<td id="subTotalCol" style="border:none;text-align:right;">¥{0}</td>'.format(formatNumber(wineTotal)) +
                    '</tr>' +
                    '<tr>' +
                        '<td style="border:none;">送　料</td>' +
                        '<td style="border:none;text-align:right;">¥{0}</td>'.format(formatNumber(shippingFee)) +
                    '</tr>' +
                    '<tr>' +
                        '<td style="border:none;">消費税</td>' +
                        '<td id="taxCol" style="border:none;text-align:right;">¥{0}</td>'.format(formatNumber(intTax)) +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="2" style="border:none;">' +
                            '<hr style="border:none;height:1px;background-color:rgb(80,80,80);" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="border:none;">合　計</td>' +
                        '<td id="totalCol" style="border:none;font-size:18px;text-align:right;">¥{0}</td>'.format(formatNumber(intTotal)) +
                    '</tr>' +
                '</table>';

            $('tfoot td#totalPane').html(html);
        },

        error: function() {}
    });
}


function addLeadingZero(intValue, cDigit)
{
    var strValue = intValue.toString();
    return ((strValue.length < cDigit) ? addLeadingZero('0' + strValue, cDigit) : strValue);
}


function refreshItemCount()
{
    var fError   = false,
        strError = 'ご注文は12本単位となっております。',
        cItem    = getItemCount();

    $('span#itemCountSpan').html(cItem);

    $("tr[id$='_error']").each(function(index)
    {
        if (!fError && ($(this).html() != ''))
        {
            fError = true;
            strError = '在庫が不足しております。';
        }
    });

    var $checkoutBtn = $('div#checkoutBtn');
    if (fError || (cItem == 0) || ((cItem % 12) > 0))
    {
        $checkoutBtn.html('{0}本（{1}）'.format(cItem, strError));
        $checkoutBtn.css({
            'background-color': 'red',
            'color': 'white',
            'cursor': 'default'
        });

        $('div.contents').off('click', 'div#checkoutBtn');
    }
    else
    {
        $checkoutBtn.html('チェックアウト（{0}ケース）'.format(cItem / 12));
        $checkoutBtn.css({
            'background-color': '#008d00',
            'color': 'white',
            'cursor': 'pointer'
        });

        $('div.contents').on('click', 'div#checkoutBtn', function()
        {
            var strOrderContents = '';
            $('td.quantityCol > input').each(function(index)
            {
                var intQty        = $(this).val(),
                    $itemTr       = $(this).parents('tr.itemTr'),
                    barcodeNumber = $itemTr.attr('id');

                strOrderContents += '{0}:{1}#;'.format(barcodeNumber, intQty);
            });

            var strDeliveryDate = getDeliveryDate(),
                strDeliveryTime = getDeliveryTime(),
                strName         = $('span#nameSpan').html(),
                strEmail        = $('span#emailSpan').html(),
                strAddress      = '〒{0}&nbsp;{1}{2}'.format($('span#postCodeSpan').html(), $('span#prefectureSpan').html(), $('span#addressSpan').html());

            var objParam =
            {
                payment_method: $('input[name=payment_method]:checked').val(),
                refrigerated:   (fCool ? 1 : 0),
                wine_total:     wineTotal,
                shipping_fee:   shippingFee,
                contents:       strOrderContents,
                delivery_date:  strDeliveryDate,
                delivery_time:  strDeliveryTime,
                name:           strName,
                address:        strAddress
            };

            redirectWithPostData('./payment.php', objParam)
        });
    }
}

function getDeliveryDate()
{
    return $('select#deliveryDateSelect').val();
}

function getDeliveryTime()
{
    return $('select#deliveryTimeSelect').val();
}

function validateItemStock(barcodeNumber, intQty, intStock)
{
    if (parseInt(intQty, 10) > parseInt(intStock, 10))
    {
        var html =
            '<td colspan="6" style="color:red;">' +
                '在庫が残り{0}本のため、ご希望の本数を購入頂く事ができません。'.format(intStock) +
            '</td>';

        $('tr#' + barcodeNumber + '_error').html(html);
    }
    else
    {
        $('tr#' + barcodeNumber + '_error').html('');
    }
}

$(document).ready(function()
{
    $('div.contents').width(900);

    $('div.contents').on('click', 'a.removeLnk', function()
    {
        var $itemTr       = $(this).parents('tr.itemTr'),
            barcodeNumber = $itemTr.attr('id');

        $.ajax(
        {
            url:  './api/remove_cart_item.php',
            type: 'POST',
            data:
            {
                id: barcodeNumber
            },

            dataType: 'text',
            success: function(strResult)
            {
                if (strResult == 'SUCCESS')
                {
                    $itemTr.prev().remove();
                    $itemTr.remove();
                    $('tr#{0}_error'.format(barcodeNumber)).html('');

                    refreshTotal();
                    refreshItemCount();
                }
            },

            error: function() {}
        });

        return false;
    });

    $('div.contents input[type=number]').each(function(index)
    {
        var intQty        = $(this).val(),
            intStock      = $(this).attr('max'),
            $itemTr       = $(this).parents('tr.itemTr'),
            barcodeNumber = $itemTr.attr('id');

        validateItemStock(barcodeNumber, intQty, intStock);
    });

    $('div.contents input[type=number]').focusout(function()
    {
        var intQty        = $(this).val(),
            intStock      = $(this).attr('max'),
            $itemTr       = $(this).parents('tr.itemTr'),
            $amountTd     = $itemTr.find('td.amountCol'),
            strPrice      = $itemTr.find('td.priceCol').html(),
            intPrice      = parseInt(strPrice.replace(/[,¥]/g, ''), 10),
            barcodeNumber = $itemTr.attr('id');

        $amountTd.html('<img style="width:100px;" src="./loading_price.gif" />');

        $.ajax(
        {
            url:  './api/set_cart_item_quantity.php',
            type: 'POST',
            data:
            {
                id: barcodeNumber,
                qty: intQty
            },

            dataType: 'text',
            success: function(strResult)
            {
                if (strResult == 'SUCCESS')
                {
                    refreshTotal();
                    $amountTd.html('¥{0}'.format(formatNumber(intPrice * intQty)));
                    validateItemStock(barcodeNumber, intQty, intStock);
                    refreshItemCount();
                }
            },

            error: function() {}
        });
    });

    $('div.contents input[name=refrigerated]').change(function()
    {
        fCool = !fCool;
        refreshTotal();
    });

    refreshTotal();
    refreshItemCount();
});

</script>

