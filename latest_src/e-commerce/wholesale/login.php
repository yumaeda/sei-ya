<?php

if (isset($_COOKIE['SESSION']))
{
    // Remove the Session cookie from the root site.
    setcookie('SESSION', '', (time() - 3600), '/', 'anyway-grapes.jp');
}

require_once('./config.php');

if (isAuthenticated())
{
    $location = 'https://' . BASE_URL;
    header("Location: $location");

    exit();
}

$strError = '';
$fError   = FALSE;

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $fError = TRUE;

    if (empty($_POST['user_id']) || empty($_POST['user_pwd']))
    {
        $strError = 'Please specify both ID and password.';
    }
    else
    {
        $userId = $_POST['user_id'];
        if (filter_var($userId, FILTER_VALIDATE_EMAIL))
        {
            $result = mysqli_query($dbc, "CALL get_business_customer('$userId')");
            if (($result !== FALSE) && (mysqli_num_rows($result) === 1))
            {
                $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                if (password_verify($_POST['user_pwd'], $row['hash']))
                {
                    $_SESSION['business_customer_id'] = $userId;
                    $_SESSION['pdf_folder']           = $row['id'];
                    redirectToIndexPage();
                }
                else
                {
                    // Do nothing.
                }

                mysqli_free_result($result);
            }
            else
            {
                // Do nothing.
            }
        }
        else
        {
            // Do nothing.
        }
    }
}

if ($fError)
{
    $strError = 'Specified ID or password is not valid.';
}

$pageTitle = 'ログイン｜Anyway-Grapes（飲食店様用）';

include_once('../includes/header.html');

echo '
    <form action="./login.php" method="POST">
        <table style="margin: 0 auto 0 auto;width:300px;">
            <tr>
                <td>Email:&nbsp;</td>
                <td><input type="text" name="user_id" /></td>
            </tr>
            <tr>
                <td>Password:&nbsp;</td>
                <td><input type="password" name="user_pwd" /></td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2"><input type="submit" value="ログイン" /></td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2" style="color:red;">' .  $strError . '</div>
            </tr>
        </table>
    </form>
';

include_once('../includes/footer.html');

mysqli_close($dbc);

?>
