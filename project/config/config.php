<?php

    $_POST = json_decode(file_get_contents('php://input'), true);
    $_REQUEST = json_decode(file_get_contents('php://input'), true);
    $_GET = json_decode(file_get_contents('php://input'), true);

?>
