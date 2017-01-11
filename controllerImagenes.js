/**
 * Created by ferazo on 5/1/2017.
 */
angular.module('app',[])
    .controller("ControllerImagenes",function ($scope,$http,usuario) {
        Id_usuario=$scope.usuario;
        var carrusel=false;
        console.log('CtrIma'+Id_usuario);
        $scope.getImagenes=function (Id_usuario) {
            console.log($scope.userenimagenes);
            console.log($scope.Id_usuario);
            var request=$http({
                method: "POST",
                url: "http://localhost/SistemaAngular/ws/imagenesUsuario.php",
                data: {
                    Id_usuario: Id_usuario},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                $scope.imag=data.DATOSIMAGEN;
                console.log('data' + $scope.imag);
            })
        }
        $scope.carrusel=function (show) {
            $scope.carrusel=show;
        }
        $scope.uploadFile = function(Direccion,Estado,Id_usuario){
            var name = $scope.name;
            var file = $scope.file;
            upload.uploadFile(file, name).then(function(res){
                console.log(res);
            });
            console.log(Direccion + Estado + Id_usuario)
            var request = $http({
                method: "POST",
                url: "http://localhost/imagenes/cargaImagenes/ws/subirArchivos.php",
                data: {
                    Direccion: Direccion,
                    Estado: Estado,
                    Id_propietario: Id_usuario
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
        $scope.deletFile=function(Id_imagenes,Direccion,Estado,Id_usuario){
            console.log("prueba" + direccion + estado + Id_propietario);
            var request=$http({
                method: "POST",
                url: "http://localhost/imagenes/cargaImagenes/ws/eliminarArchivos.php",
                data: {
                    Id_imagenes:Id_imagenes,
                    Direccion: Direccion,
                    Estado: Estado,
                    Id_usuario: Id_usuario
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
        $scope.carrusel=function (show) {
            $scope.carrusel=show;
        }
    });