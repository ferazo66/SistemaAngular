<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Nombre=$request->Nombre;
@$Usuario=$request->Usuario;
@$Contrasena = $request->Contrasena;
@$Estado = $request->Estado;
@$Id_perfil = $request->Id_perfil;
$pagina="errorLogin.php";
 $sql = "
INSERT INTO usuarios (Nombre,Usuario,Contrasena,Estado,Id_perfil)VALUES  ('$Nombre','$Usuario','$Contrasena','$Estado','$Id_perfil')
";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);
