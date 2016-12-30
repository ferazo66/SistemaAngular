<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../data/conect.php';

$conn = mysqli_connect(NOMBRE_HOST, USUARIO, CONTRASENA, BASE_DE_DATOS);
$sql = "

select p.Id_perfil,p.Nombre,p.Estado,m.Id_opcion as tipoOpcion,m.Opcion,m.Estado as Activo,m.Padre,m.Url,r.Id_relacion as tipoRelacion,r.Id_opcion as tipoPerfil,r.Id_perfil as tipoPerfilRelacion from perfiles as p, menus as m, relacion as r where p.Id_perfil=r.Id_perfil and m.Id_opcion=r.Id_opcion

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
        $outp .= '"Nombre":"'   .  $row['Nombre']. '",';
        $outp .= '"Estado":"'   .  $row['Estado']. '",';
        $outp .= '"tipoOpcion":"'   .  $row['tipoOpcion']. '",';
        $outp .= '"Opcion":"'   .  $row['Opcion']. '",';
        $outp .= '"Activo":"'   .  $row['Activo']. '",';
        $outp .= '"Padre":"'   .  $row['Padre']. '",';
        $outp .= '"Url":"'   .  $row['Url']. '",';
        $outp .= '"tipoRelacion":"'   .  $row['tipoRelacion']. '",';
        $outp .= '"tipoPerfil":"'   .  $row['tipoPerfil']. '",';
        $outp .= '"tipoPerfilRelacion":"'   .  $row['tipoPerfilRelacion']. '"}';
    }
    $outp ='{"DATOSRELACION":['.$outp.']}';
    $conn->close();
    echo($outp);
}
?>