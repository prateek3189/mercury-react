<?php
    // include config file
    include("../config/config.php");

    // DB Manager
    include('../dbmanager/dbmanager.php');

    $action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($action) {
        case 'addRelation':
            $relation = isset($_POST['relation']) ? $_POST['relation'] : '';
            $owner_id = isset($_POST['owner_id']) ? $_POST['owner_id'] : 0;
            $created_date = date("Y-m-d h:i:s");
            $modified_date = date("Y-m-d h:i:s");

            if(
                $relation == ''
            ) {
                echo "REQUIRED_ERROR";die;
            } else {
                // Check if user already exists
                $select = "*";
                $table = 'relations';
                $where = "relation = '".$relation."'";
                $relationData = $db->get($select, $table, $where);
                if(count($relationData)) {
                    echo "EXISTS_ERROR";die;
                } else {
                    $table = "relations";
                    $columns = array('relation', 'owner_id', 'created_date', 'modified_date');
                    $values = array($relation, $owner_id, $created_date, $modified_date);
                    $relationId = $db->insert($table, $columns, $values);
                    echo $relationId;die;
                }
            }
            break;

        case 'getRelationData':
            // Check if user already exists
            $relationId = isset($_POST['relationId']) ? $_POST['relationId'] : '';

            $select = "*";
            $table = 'relations';
            $where = "relation_id = '".$relationId."' AND is_active='1' AND is_delete='0'";
            $relationData = $db->get($select, $table, $where);
            echo json_encode($relationData, JSON_FORCE_OBJECT);die;
            break;

        case 'fetchMyRelations':
                $owner_id = isset($_POST['owner_id']) ? $_POST['owner_id'] : '';

                $select = "*";
                $table = 'relations';
                $where = "owner_id = '".$owner_id."' AND is_delete = '0'";
                $relationsData = $db->getAll($select, $table, $where);
                echo json_encode($relationsData, JSON_FORCE_OBJECT);die;
            break;

        case 'checkRelationExists':
            // Check if user already exists
            $relation = isset($_POST['relation']) ? $_POST['relation'] : '';

            $select = "*";
            $table = 'relations';
            $where = "relation = '".$relation."' AND is_active='1' AND is_delete='0'";
            $relationData = $db->get($select, $table, $where);
            echo json_encode($relationData, JSON_FORCE_OBJECT);die;
            break;

        case 'updateRelation':
            $relation = isset($_POST['relation']) ? $_POST['relation'] : '';
            $relation_id = isset($_POST['relation_id']) ? $_POST['relation_id'] : '';
            $modified_date = date("Y-m-d h:i:s");

            if(
                $relation == ''
            ) {
                echo "REQUIRED_ERROR";die;
            } else {
                // Check if user already exists
                $select = "*";
                $table = 'relations';
                $where = "(relation = '".$relation."' AND relation_id != '".$relation_id."')";
                $relationData = $db->get($select, $table, $where);
                if(count($relationData)) {
                    echo "EXISTS_ERROR";die;
                } else {
                    $table = "relations";
                    $columns = array('relation', 'modified_date');
                    $values = array($relation, $modified_date);
                    $where = "relation_id = '".$relation_id."'";
                    $relation_id = $db->update($table, $columns, $values, $where);
                    echo $relation_id;die;
                }
            }
            break;

        case 'deleteRelation':
            $relation_id = isset($_POST['relation_id']) ? $_POST['relation_id'] : 0;
            $modified_date = date("Y-m-d h:i:s");

            $table = "relations";
            $columns = array('is_delete', 'modified_date');
            $values = array(1, $modified_date);
            $where = "relation_id = '".$relation_id."'";
            $userId = $db->update($table, $columns, $values, $where);
            echo $userId;die;
            break;

        default:
            echo "Goes into default case";
            break;
    }
?>
