<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$sql = "
SELECT users.Id_usuario,users.Nombre,users.Usuario,users.Contrasena,users.Estado, per.Nombre as Perfil FROM usuarios as users, perfiles as per where users.Id_perfil=per.Id_perfil
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
        $outp .= '{"Id_usuario":"'  .  $row['Id_usuario'] . '",';
        $outp .= '"Nombre":"'   .  $row['Nombre']. '",';
        $outp .= '"Usuario":"'   .  $row['Usuario']. '",';
        $outp .= '"Contrasena":"'   .  $row['Contrasena']. '",';
        $outp .= '"Estado":"'   .  $row['Estado']. '",';
        $outp .= '"Perfil":"'   .  $row['Perfil']. '"}';
    }
    $outp ='{"DATOSUSUARIO":['.$outp.']}';
    $conn->close();
    echo($outp);
}
?>