<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Id_perfil = $request->Id_perfil;
@$pagina = $request->pagina;
$pagina="errorLogin.php";

$sql = "
SELECT * from `menus` where Estado=1 AND Id_opcion in (SELECT Id_opcion FROM `relacion` WHERE Id_perfil='$Id_perfil') ";
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
        $outp .= '{"Id_opcion":"'  .  $row['Id_opcion'] . '",';
        $outp .= '"Opcion":"'   .  $row['Opcion']. '",';
        $outp .= '"Estado":"'   .  $row['Estado']. '",';
        $outp .= '"Padre":"'   .  $row['Padre']. '",';
        $outp .= '"Url":"'   .  $row['Url']. '"}';
    }
    $outp ='{"DatosNavBar":['.$outp.']}';
    $conn->close();
    echo($outp);
}
?>