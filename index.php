<?php

/*

$strUserAgent = $_SERVER['HTTP_USER_AGENT'];

// Redirect iPhone/iPod visitors
if(strpos($strUserAgent, "Android") ||
   strpos($strUserAgent, "iPhone") ||
   strpos($strUserAgent, "iPod"))
{
    header("Location: mobile/index.html");
}

*/

?>


<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <link rel="stylesheet" type="text/css" href="index.min.css" />

        <!--[if lt IE 8]>
        <script type="text/javascript">

        window.location = 'ie_update.html';

        </script>
        <![endif]-->

        <script type="text/javascript">

        document.createElement('figure');
        document.createElement('figcaption');

        </script>
    </head>
    <body>
        <div class="leftDiv">
        </div>
        <div class="centerDiv">
            <div class="middleDiv">
                <div class="innerDiv">
                    <figure>
                        <a href="ofuro/index.html">
                            <img class="ofuroLogo" src="ofuro/images/logo.png" />
                        </a>
                        <figcaption>Since 1994</figcaption>
                    </figure>
                    <figure>
                        <a href="mitsu-getsu/index.html">
                            <img class="mitsugetsuLogo" src="mitsu-getsu/images/logo.png" />
                        </a>
                        <figcaption>Since 2007</figcaption>
                    </figure>
                    <figure>
                        <a href="http://anyway-grapes.jp">
                            <img class="anywayLogo" src="anyway-grapes/images/logo.png" />
                        </a>
                        <figcaption>Since 2011</figcaption>
                    </figure>
                    <figure>
                        <a href="honeymoon/index.html">
                            <img class="honeymoonLogo" src="honeymoon/images/logo.png" />
                        </a>
                        <figcaption>Since 2014</figcaption>
                    </figure>
                    <hr class="lineThin linePadded" />
                    <img class="companyLogo" src="seiya_logo.png" />
              </div>
           </div>
        </div>
        <div class="rightDiv">
        </div>
    </body>
</html>

<script type="text/javascript">

document.title = 'Seiya Ltd.';

</script>

