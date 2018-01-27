<?php
    // include config file
    include("../config/config.php");

    // DB Manager
    include('../dbmanager/dbmanager.php');

    $action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($action) {
        case 'signup':
            $firstName = isset($_POST['firstName']) ? $_POST['firstName'] : '';
            $lastName = isset($_POST['lastName']) ? $_POST['lastName'] : '';
            $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '';
            $username = isset($_POST['username']) ? $_POST['username'] : '';
            $password = isset($_POST['password']) ? $_POST['password'] : '';
            $securityQuestion = isset($_POST['securityQuestion']) ? $_POST['securityQuestion'] : '';
            $answer = isset($_POST['answer']) ? $_POST['answer'] : '';
            $created_date = date("Y-m-d h:i:s");
            $modified_date = date("Y-m-d h:i:s");

            if(
                $firstName == '' ||
                $phoneNumber == '' ||
                $username == '' ||
                $password == '' ||
                $securityQuestion == '' ||
                $answer == ''
            ) {
                echo "REQUIRED_ERROR";die;
            } else {
                // Check if user already exists
                $select = "*";
                $table = 'users';
                $where = "username = '".$username."' OR phone = '".$phoneNumber."'";
                $userData = $db->get($select, $table, $where);
                if(count($userData)) {
                    echo "EXISTS_ERROR";die;
                } else {
                    $table = "users";
                    $columns = array('first_name', 'last_name', 'phone', 'username', 'password', 'security_question', 'answer', 'created_date', 'modified_date');
                    $values = array($firstName, $lastName, $phoneNumber, $username, md5($password), $securityQuestion, $answer, $created_date, $modified_date);
                    $userId = $db->insert($table, $columns, $values);
                    echo $userId;die;
                }
            }
            break;

        case 'checkUsernameExists':
            // Check if user already exists
            $username = isset($_POST['username']) ? $_POST['username'] : '';

            $select = "*";
            $table = 'users';
            $where = "username = '".$username."' AND is_active='1' AND is_delete='0'";
            $userData = $db->get($select, $table, $where);
            echo json_encode($userData, JSON_FORCE_OBJECT);die;
            break;

        case 'checkSecurityAnswer':
            // Check if user already exists
            $answer = isset($_POST['answer']) ? $_POST['answer'] : '';

            $select = "*";
            $table = 'users';
            $where = "answer = '".$answer."' AND is_active='1' AND is_delete='0'";
            $userData = $db->get($select, $table, $where);
            echo json_encode($userData, JSON_FORCE_OBJECT);die;
            break;

        case 'doLogin':
            // Check if user already exists
            $username = isset($_POST['username']) ? $_POST['username'] : '';
            $password = isset($_POST['password']) ? $_POST['password'] : '';

            $select = "*";
            $table = 'users';
            $where = "username = '".$username."' AND password = '".md5($password)."' AND is_delete='0'";
            $userData = $db->get($select, $table, $where);

            echo json_encode($userData, JSON_FORCE_OBJECT);die;
            break;

        case 'resetpassword':
            // Check if user already exists
            $password = isset($_POST['password']) ? $_POST['password'] : '';
            $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : '';
            $data = array('password'=>md5($password));
            $userData = $db->update('users', $data, "user_id = '$user_id'");

            break;

        default:
            echo "Goes into default case";
            break;
    }
?>
