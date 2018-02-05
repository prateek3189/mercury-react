<?php
    include_once("connection.php");

    class DBManager {
        //insert single Record
        function insert($table, $columns, $values) {
            $sql	=	"INSERT INTO $table (";
            if(count($columns)) {
                foreach($columns as $col) {
                    $sql .=	"$col, ";
                }
            }
            $sql = rtrim($sql, ", ");
            $sql	.=	") VALUES (";
            if(count($values)) {
                foreach($values as $val) {
                    $sql	.=	"'$val', ";
                }
            }
            $sql = rtrim($sql, ", ");
            $sql	.=	")";

            $result	=	mysql_query($sql);

            if(!$result) {
                return array();
            } else {
                return mysql_insert_id();
            }
        }

        //get single Record
        function get($select, $table, $where) {
            $sql	=	"SELECT $select
                        FROM $table
                        WHERE $where";

            $result	=	mysql_query($sql);
            $row_num	=	$result ? mysql_num_rows($result) : 0;
            if(!$result || $row_num <= 0) {
                return array();
            } else {
                $row = mysql_fetch_object($result);
                return $row;
            }
        }

        //get all records
    	function getAll($select, $table, $where) {
    		$sql	=	"SELECT $select
    					FROM $table
    					WHERE $where";

    		$result	=	mysql_query($sql);
    		$row_num	=	mysql_num_rows($result);

    		if(!$result || $row_num <= 0) {
    			return array();
    		} else {
    			for($count = 0; $row = mysql_fetch_object($result); $count ++) {
    				$arr[$count]	=	$row;
    			}
    			return $arr;
    		}
    	}

        // update a records
        function update($table, $column, $value, $where) {
            $sql = "UPDATE $table
                    SET ";
            if(count($column)) {
                for($a = 0; $a < count($column); $a ++) {
                    $sql .= "$column[$a] = '$value[$a]', ";
                }
            }
            $sql = rtrim($sql, ", ");
            $sql .= " WHERE $where";
            echo $result	=	mysql_query($sql);die;
        }
    }

    $db = new DBManager();
?>
