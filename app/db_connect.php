<?php
//Establish connection: host, user, password, database
$dbi = mysqli_connect("localhost","2073558_app","k@63Bax82","2073558_game");
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
?>