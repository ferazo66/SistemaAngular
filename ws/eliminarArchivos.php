<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Id_imagen=$request->Id_imagen;
@$Estado=$request->Estado;
@$Id_usuario= $request->Id_usuario;
$pagina="errorLogin.php";

$sql = "
UPDATE imagenes set Estado='$Estado' WHERE Id_imagen='$Id_imagen' AND Id_usuario='$Id_usuario'
";
if (mysqli_connect_errno()) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode(array(
        'status' => 'failure',
        'message' => 'Could Not connect to database',
    ));
}
$data = mysqli_query($conn, $sql);
