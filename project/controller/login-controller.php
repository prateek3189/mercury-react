<?php
    // include config file
    include("../config/config.php");

    // DB Manager
    include('../dbmanager/dbmanager.php');

    $action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($action) {
        case 'signup':
            $first_name = isset($_POST['first_name']) ? $_POST['first_name'] : '';
            $last_name = isset($_POST['last_name']) ? $_POST['last_name'] : '';
            $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
            $username = isset($_POST['username']) ? $_POST['username'] : '';
            $password = isset($_POST['password']) ? $_POST['password'] : '';
            $security_question = isset($_POST['security_question']) ? $_POST['security_question'] : '';
            $answer = isset($_POST['answer']) ? $_POST['answer'] : '';
            $owner_id = isset($_POST['owner_id']) ? $_POST['owner_id'] : 0;
            $created_date = date("Y-m-d h:i:s");
            $modified_date = date("Y-m-d h:i:s");

            if(
                $first_name == '' ||
                $phone == '' ||
                $username == '' ||
                $password == '' ||
                $security_question == '' ||
                $answer == ''
            ) {
                echo "REQUIRED_ERROR";die;
            } else {
                // Check if user already exists
                $select = "*";
                $table = 'users';
                $where = "username = '".$username."' OR phone = '".$phone."'";
                $userData = $db->get($select, $table, $where);
                if(count($userData)) {
                    echo "EXISTS_ERROR";die;
                } else {
                    $table = "users";
                    $columns = array('first_name', 'last_name', 'phone', 'username', 'password', 'security_question', 'answer', 'owner_id', 'created_date', 'modified_date');
                    $values = array($first_name, $last_name, $phone, $username, md5($password), $security_question, $answer, $owner_id, $created_date, $modified_date);
                    $userId = $db->insert($table, $columns, $values);
                    echo $userId;die;
                }
            }
            break;

        case 'getFriendData':
            // Check if user already exists
            $userId = isset($_POST['userId']) ? $_POST['userId'] : '';

            $select = "*";
            $table = 'users';
            $where = "user_id = '".$userId."' AND is_active='1' AND is_delete='0'";
            $userData = $db->get($select, $table, $where);
            echo json_encode($userData, JSON_FORCE_OBJECT);die;
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
