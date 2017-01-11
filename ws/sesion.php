<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Id_usuario=$request->Id_usuario;
@$Id_perfil=$request->Id_perfil;
$pagina="errorLogin.php";
 $sql = "
UPDATE sesion SET Id_usuario='$Id_usuario' ,Id_perfil='$Id_perfil' WHERE Id_sesion= '1'
";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);
