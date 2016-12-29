<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$sql = "
SELECT * FROM `perfiles`";
if (mysqli_connect_errno()) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode(array(
        'status' => 'failure',
        'message' => 'Could Not connect to database',
    ));
}
$data = mysqli_query($conn, $sql);
if ($data) {
    $outp = "";
    while ($row = mysqli_fetch_array($data)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"Id_perfil":"'  .  $row['Id_perfil'] . '",';
        $outp .= '"Nombre":"'   .  $row['Nombre']. '",';
        $outp .= '"Estado":"'   .  $row['Estado']. '"}';
    }
    $outp ='{"DATOSPERFIL":['.$outp.']}';
    $conn->close();
    echo($outp);
}
?>