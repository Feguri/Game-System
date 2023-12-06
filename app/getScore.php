<?php 
require_once("db_connect.php");//establish DB connection

if ($dbi) {
    // SQL query
    $q = "SELECT handle, score FROM score ORDER BY score DESC";

    // Array of return from SQL query to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rH,$rS);

        //Collect the results
        while($stmt->fetch()) {
            $rArray[] = [
                "Handle"=>$rH,
                "Score"=>$rS
            ];
        }
        
        //Encode JSON and return to JS
        echo json_encode($rArray);
        
        $stmt->close(); //end statement
    }
    else {
        echo "no execute statement";
    }
}
//Inform user if error
else {
        echo "Connection Error: " . mysqli_connect_error();
}
//Close connection
mysqli_close($dbi);
    
?>