<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Opcion=$request->Opcion;
@$Estado=$request->Estado;
@$Padre=$request->Padre;
@$Url = $request->Url;
$pagina="errorLogin.php";
 $sql = "
INSERT INTO menus (Opcion,Estado,Padre,Url)VALUES  ('$Opcion','$Estado','$Padre','$Url')
";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);
