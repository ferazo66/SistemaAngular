<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';
$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Id_opcion=$request->Id_opcion;
@$Opcion=$request->Opcion;
@$Estado=$request->Estado;
@$Padre=$request->Padre;
@$Url = $request->Url;
$pagina="errorLogin.php";
 $sql = "UPDATE menus set Opcion='$Opcion',Estado='$Estado',Padre='$Padre',Url='$Url' WHERE Id_opcion='$Id_opcion'
";
            if (mysqli_connect_errno()) {
                 header('Content-type: application/json; charset=utf-8');
                echo json_encode(array(
                    'status' => 'failure',
                    'message' => 'Could Not connect to database',
                ));
            }
            $data = mysqli_query($conn, $sql);
