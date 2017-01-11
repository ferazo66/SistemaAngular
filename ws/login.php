<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$Usuario = $request->Usuario;
@$Contrasena=$request->Contrasena;
$pagina="errorLogin.php";
$sql = "
SELECT usuarios.Id_perfil, usuarios.Id_usuario FROM usuarios WHERE usuarios.Usuario='$Usuario' AND usuarios.Contrasena='$Contrasena' AND usuarios.Estado='1'
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
            $outp .= '{"Id_perfil":"'  .  $row['Id_perfil'] . '",';
            $outp .= '"Id_usuario":"'   .  $row['Id_usuario']. '"}';
    }
    $outp ='{"LOGUSER":['.$outp.']}';
    $conn->close();
    echo($outp);
}else{
$outp = "Id_perfil=0";
    $outp ='{"LOGUSER":['.$outp.']}';
    $conn->close();
    echo($outp);
}


?>