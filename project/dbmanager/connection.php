<?php

    $db_host	=	"localhost";
    $db_name	=	"mercury-react";
    $db_user	=	"root";
    $db_pass	=	"";

    $conn = mysql_connect($db_host, $db_user, $db_pass);

    if (!$conn) {
        die('Not connected : ' . mysql_error());
    }

    $db_selected = mysql_select_db($db_name, $conn);

    if (!$db_selected) {
        die ('Can\'t use $DB : ' . mysql_error());
    }
?>
