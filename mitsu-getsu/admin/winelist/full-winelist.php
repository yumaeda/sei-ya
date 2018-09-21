<?php

require_once('../wine/tcpdf/tcpdf.php');

function startsWith($str, $find)
{
    return ($find === '' || strpos($str, $find) === 0);
}

// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF
{
    public function Header()
    {
        $helveticaThin = $this->AddTTFfont("../font/Helvetica-Neue-Ultra-Light.ttf");
        $helveticaBold = $this->AddTTFfont("../font/Helvetica-Neue-Bold.ttf");
        $mspgothic     = $this->AddTTFfont("../font/MS PGothic.ttf");
        $mspmincho     = $this->AddTTFfont("../font/MS PMincho.ttf");

        // Set current page number.
        $pageNumber = $this->page;
        if ($_POST['pageToPrint'] != 'all')
        {
            $pageNumber = intval($_POST['pageToPrint'], 10);
        }

        $pageTitle      = stripslashes($_POST["page_title_$pageNumber"]);
        $jpnPageTitle   = $_POST["page_title_jpn_$pageNumber"];
        $regionTitle    = stripslashes($_POST["region_title_$pageNumber"]);
        $jpnRegionTitle = $_POST["region_title_jpn_$pageNumber"];

        $pageTitleWidth = strlen($pageTitle) * 2;

        if (startsWith($pageTitle, 'Vin Mousseux'))
        {
            if (strpos($pageTitle, 'Rosé') > 0)
            {
                $this->SetTextColor(239, 25, 132);
            }
            else
            {
                $this->SetTextColor(252, 102, 33);
            }
        }
        else if (startsWith($pageTitle, 'Vin Blanc') ||
                 startsWith($pageTitle, 'White Wine'))
        {
            $this->SetTextColor(52, 55, 151);
        }
        else if (startsWith($pageTitle, 'Vin Rouge') ||
                 startsWith($pageTitle, 'Red Wine'))
        {
            $this->SetTextColor(128, 33, 81);
        }
        else if (startsWith($pageTitle, 'Vin Rosé') ||
                 startsWith($pageTitle, 'Rosé Wine'))
        {
            $this->SetTextColor(239, 25, 132);
        }
        else if (startsWith($pageTitle, 'Vin Jaune'))
        {
            $this->SetTextColor(203, 130, 15);
        }
        else if (startsWith($pageTitle, 'Sparkling Wine'))
        {
            $this->SetTextColor(252, 102, 33);
        }
        else if (startsWith($pageTitle, 'Sparkling Rosé Wine'))
        {
            $this->SetTextColor(239, 25, 132);
        }
        else if (startsWith($pageTitle, 'Vin Moelleux') ||
                 startsWith($pageTitle, 'Dessert Wine'))
        {
            $this->SetTextColor(0, 0, 0);
        }

        $this->SetY(12);
        $this->SetX(105 - ($pageTitleWidth / 2));
        $this->SetFont($helveticaThin, "", 10, "", false);
        $this->Cell($pageTitleWidth, 10, $pageTitle, 0, 1, 'C', 0, '', 4);

        $this->SetY(16);
        $this->SetFont($mspmincho, "", 8, "", false);
        $this->Cell(0, 10, $jpnPageTitle, 0, false, 'C', 0, '', 0, false, 'T', 'M');

        $this->SetTextColor(0, 0, 0);
        $this->SetY(23);
        $this->SetFont($helveticaBold, "", 12, "", false);
        $this->Cell(0, 10, $regionTitle, 0, false, 'C', 0, '', 0, false, 'T', 'M');

        $this->SetY(27);
        $this->SetFont($mspgothic, "", 8, "", false);
        $this->Cell(0, 10, $jpnRegionTitle, 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }

    public function Footer()
    {
        $helveticaThin = $this->AddTTFfont("../font/Helvetica-Neue-Ultra-Light.ttf");
        $helveticaBold = $this->AddTTFfont("../font/Helvetica-Neue-Bold.ttf");

        // Set current page number.
        $pageNumber = $this->page;
        if ($_POST['pageToPrint'] != 'all')
        {
            $pageNumber = intval($_POST['pageToPrint'], 10);
        }

        $strPadding = '';

        if ($this->page < 10)
        {
            $strPadding = '  ';
        }
        elseif ($this->page < 100)
        {
            $strPadding = ' ';
        }

        $strPage = ($strPadding . 'le Numéro ' . $pageNumber);

        // Set position at 20 mm from bottom
        $this->SetY(-20);
        $this->SetFont($helveticaBold, "", 10, "", false);

        $pageNumWidth = $this->GetStringWidth($strPage, $helveticaBold, '', 12, false);
        $this->Cell(72 + $pageNumWidth, 10, $strPage, 0, false, 'R', 0, '', 0, false, 'T', 'M');

        // Set position at 25 mm from bottom
        //$this->SetY(-26);
        //$this->SetX(75);
        //$this->SetFont($helveticaThin, "", 10, "", false);
        //$this->Cell(60, 10, 'The price contains all the taxes.', 0, 1, 'C', 0, '', 4);
    }
}

ini_set('max_execution_time', 300);
ini_set("memory_limit", "-1");

$xMargin = 15;
$yMargin = 5;

$pdf = new MYPDF("P", "mm", "A4", true, "UTF-8" );
$pdf->setPrintHeader(true);
$pdf->SetMargins($xMargin, $yMargin, $xMargin, true);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
$pdf->SetAutoPageBreak(false, 0);

// Japanese fonts.
$mspgothic = $pdf->AddTTFfont("../font/MS PGothic.ttf");
$mspmincho = $pdf->AddTTFfont("../font/MS PMincho.ttf");
//$ipaexm    = $pdf->AddTTFfont("../font/ipaexm.ttf");


function generateTableRowHtml($strProducer, $strVintage, $strName, $intPrice, $strJpnProducer, $strJpnName, $fPadded)
{
    $singleYearPrefix = 'M.A.';
    $strVintage2      = '';
    if (strpos($strVintage, $singleYearPrefix) === 0)
    {
        $strVintage2 = substr($strVintage, 5, 4);
        $strVintage  = $singleYearPrefix;
    }

    $html = '
        <tr>
            <td class="producerCol" style="font-family:helvetica;font-size:9px;width:27%;text-align:right;">' .
                $strProducer . '
            </td>
            <td class="vintageCol" style="font-family:helvetica;font-size:9px;width:7%;text-align:center;">' .
                $strVintage . '
            </td>
            <td class="nameCol" style="font-family:helvetica;font-size:9px;width:58%;">' .
                $strName . '
            </td>
            <td class="priceCol" style="font-family:helvetica;font-size:9px;width:8%;text-align:right;">' .
                number_format($intPrice) . '
            </td>
        </tr>
        <tr>
            <td class="jpnProducerCol" style="text-align:right;">' .
                $strJpnProducer . '
            </td>
            <td style="font-family:helvetica;font-size:9px;text-align:center;">' .
                $strVintage2 . '
                </td>
                <td class="jpnNameCol">' .
                    $strJpnName . '
                </td>
                <td style="font-size:6px;text-align:right;">
                    [税込' . number_format($intPrice * 1.08) . ']
                </td>
            </tr>
            <tr>
                <td colspan="4" style="font-family:helvetica;font-size:4px;">&nbsp;</td>
            </tr>';

    if ($fPadded)
    {
        $html .= '<tr><td colspan="4" style="height:15px;">&nbsp;</td></tr>';
    }

    return $html;
}

function generateChampagneTableRowHtml($strProducer, $strVintage, $strName, $intPrice, $strJpnProducer, $strJpnName, $fPadded)
{
    $singleYearPrefix = 'M.A.';
    $strVintage2      = '';
    if (strpos($strVintage, $singleYearPrefix) === 0)
    {
        $strVintage2 = substr($strVintage, 5, 4);
        $strVintage  = $singleYearPrefix;
    }

    $html = '
        <tr>
            <td class="producerCol" style="font-family:helvetica;font-size:9px;width:21%;text-align:right;">' .
                $strProducer . '
            </td>
            <td class="vintageCol" style="font-family:helvetica;font-size:9px;width:7%;text-align:center;">' .
                $strVintage . '
            </td>
            <td style="font-family:helvetica;font-size:9px;width:64%;">' .
                $strName . '
            </td>
            <td class="priceCol" style="font-family:helvetica;font-size:9px;width:8%;text-align:right;">' .
                number_format($intPrice) . '
            </td>
        </tr>
        <tr>
            <td class="jpnProducerCol" style="text-align:right;">' .
                $strJpnProducer . '
            </td>
            <td style="font-family:helvetica;font-size:9px;text-align:center;">' .
                $strVintage2 . '
            </td>
            <td class="jpnNameCol">' .
                $strJpnName . '
            </td>
            <td style="font-size:6px;text-align:right;">
                [税込' . number_format($intPrice * 1.08) . ']
            </td>
        </tr>
        <tr>
            <td colspan="4" style="font-family:helvetica;font-size:4px;">&nbsp;</td>
        </tr>';

    if ($fPadded)
    {
        $html .= '<tr><td colspan="4" style="height:15px;">&nbsp;</td></tr>';
    }

    return $html;
}

function renderPage($pdf, $intPage)
{
    $pageTitle      = stripslashes($_POST["page_title_$intPage"]);
    $jpnPageTitle   = $_POST["page_title_jpn_$intPage"];
    $regionTitle    = stripslashes($_POST["region_title_$intPage"]);
    $jpnRegionTitle = $_POST["region_title_jpn_$intPage"];

    $html = '<table>';

    $j = 1;
    while (isset($_POST[('page_' . $intPage . '_item_' . $j)]))
    {
        $strValues      = $_POST[('page_' . $intPage . '_item_' . $j)];
        $rgstrValue     = explode("#;#", $strValues);
        $strVintage     = $rgstrValue[0];
        $strProducer    = stripslashes($rgstrValue[1]);
        $strJpnProducer = $rgstrValue[2];
        $strName        = stripslashes($rgstrValue[3]);
        $strJpnName     = $rgstrValue[4];
        $intPrice       = $rgstrValue[5];
        $fPadded        = (count($rgstrValue) > 6);

        if ((strpos($regionTitle, 'Champagne') === 0) ||
            (strpos($pageTitle, 'Allemagne') > 0))
        {
            $html .= generateChampagneTableRowHtml($strProducer, $strVintage, $strName, $intPrice, $strJpnProducer, $strJpnName, $fPadded);
        }
        else
        {
            $html .= generateTableRowHtml($strProducer, $strVintage, $strName, $intPrice, $strJpnProducer, $strJpnName, $fPadded);
        }

        ++$j;
    }

    $html .= '</table>';

    $pdf->AddPage();
    $pdf->SetY(42);
    $pdf->writeHTML($html, true, false, true, false, '');
}

$pdf->SetFont($mspmincho, "", 7, "", false);
//$pdf->SetFont($mspgothic, "", 6, "", false);

if (isset($_POST["page_count"]))
{
    $cPage       = $_POST['page_count'];
    $pageToPrint = $_POST['pageToPrint'];
    if ($pageToPrint == 'all')
    {
        for ($i = 1; $i <= $cPage; ++$i)
        {
            renderPage($pdf, $i);
        }
    }
    else
    {
        renderPage($pdf, intval($pageToPrint, 10));
    }

    $pdf->Output("winelist.pdf", "I");
}
else
{
    echo "page_count is not specfied.";
}

