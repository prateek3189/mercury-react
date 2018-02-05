<?php
    // include config file
    include("../config/config.php");

    // DB Manager
    include('../dbmanager/dbmanager.php');

    $action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($action) {
        case 'fetchMyFriends':
                $ownerId = isset($_POST['ownerId']) ? $_POST['ownerId'] : '';

                $select = "*";
                $table = 'users';
                $where = "owner_id = '".$ownerId."' AND is_delete = '0'";
                $usersData = $db->getAll($select, $table, $where);
                echo json_encode($usersData, JSON_FORCE_OBJECT);die;
            break;

        case 'updateFriend':
            $first_name = isset($_POST['first_name']) ? $_POST['first_name'] : '';
            $last_name = isset($_POST['last_name']) ? $_POST['last_name'] : '';
            $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
            $username = isset($_POST['username']) ? $_POST['username'] : '';
            $password = isset($_POST['password']) ? $_POST['password'] : '';
            $security_question = isset($_POST['security_question']) ? $_POST['security_question'] : '';
            $answer = isset($_POST['answer']) ? $_POST['answer'] : '';
            $owner_id = isset($_POST['owner_id']) ? $_POST['owner_id'] : 0;
            $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : 0;
            $created_date = date("Y-m-d h:i:s");
            $modified_date = date("Y-m-d h:i:s");

            if(
                $first_name == '' ||
                $phone == '' ||
                $username == '' ||
                $security_question == ''
            ) {
                echo "REQUIRED_ERROR";die;
            } else {
                // Check if user already exists
                $select = "*";
                $table = 'users';
                $where = "(username = '".$username."' OR phone = '".$phone."') AND user_id != '".$user_id."'";
                $userData = $db->get($select, $table, $where);
                if(count($userData)) {
                    echo "EXISTS_ERROR";die;
                } else {
                    $table = "users";
                    $columns = array('first_name', 'last_name', 'phone', 'username', 'security_question', 'owner_id', 'created_date', 'modified_date');
                    $values = array($first_name, $last_name, $phone, $username, $security_question, $owner_id, $created_date, $modified_date);
                    if($password !== '') {
                        array_push($columns, 'password');
                        array_push($values, md5($password));
                    }
                    if($answer !== '') {
                        array_push($columns, 'answer');
                        array_push($values, $answer);
                    }
                    $where = "user_id = '".$user_id."'";
                    $userId = $db->update($table, $columns, $values, $where);
                    echo $userId;die;
                }
            }
            break;

        case 'unFriend':
            $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : 0;
            $modified_date = date("Y-m-d h:i:s");

            $table = "users";
            $columns = array('owner_id', 'modified_date');
            $values = array(0, $modified_date);
            $where = "user_id = '".$user_id."'";
            $userId = $db->update($table, $columns, $values, $where);
            echo $userId;die;
            break;

        case 'deleteFriend':
            $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : 0;
            $modified_date = date("Y-m-d h:i:s");

            $table = "users";
            $columns = array('is_delete', 'modified_date');
            $values = array(1, $modified_date);
            $where = "user_id = '".$user_id."'";
            $userId = $db->update($table, $columns, $values, $where);
            echo $userId;die;
            break;

        default:
            echo "Goes into default case";
            break;
    }
?>
