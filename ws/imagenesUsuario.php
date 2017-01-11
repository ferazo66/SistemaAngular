<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Id_usuario = $request->Id_usuario;
$pagina="errorLogin.php";
$sql = "
SELECT ima.Id_imagen,ima.Direccion,ima.Estado,ima.Id_usuario,us.Nombre FROM imagenes AS ima , usuarios AS us WHERE ima.Id_usuario=us.Id_usuario AND us.Id_usuario='$Id_usuario' AND ima.Estado='1'
";
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
        $outp .= '{"Id_imagen":"'  .  $row['Id_imagen'] . '",';
        $outp .= '"Direccion":"'   .  $row['Direccion']. '",';
        $outp .= '"Estado":"'   .  $row['Estado']. '",';
        $outp .= '"Id_usuario":"'   .  $row['Id_usuario']. '",';
        $outp .= '"Nombre":"'   .  $row['Nombre']. '"}';
    }
    $outp ='{"DATOSIMAGEN":['.$outp.']}';
    $conn->close();
    echo($outp);
}
?>