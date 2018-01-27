<?php

    // Request configuration
    $_POST = json_decode(file_get_contents('php://input'), true);
    $_REQUEST = json_decode(file_get_contents('php://input'), true);
    $_GET = json_decode(file_get_contents('php://input'), true);

    // Facebook App ID
    define('FACEBOOK_APP_ID', '168987727049288')

?>
