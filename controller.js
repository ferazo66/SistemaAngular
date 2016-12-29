/**
 * Created by ferazo on 23/12/2016.
 */
angular.module('app',[])
    .controller("ControllerUsuarios",function($scope, $http,upload) {
        var mostarlogin= false;
        var mostarNavBar=false;
        var mostarOpciones=false;
        $scope.navbarOpciones=function (Id_perfil) {
            var request=$http({
                method: "POST",
                url: "http://localhost/SistemaAngular/ws/consultaNavbar.php",
                data: {
                    Id_perfil:Id_perfil},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                $scope.navBar=data.DatosNavBar;
                console.log('data' + $scope.navBar);
            })
        }
        $scope.usuariologin=function (Usuario,Contrasena) {
            var request=$http({
                method: "POST",
                url: "http://localhost/SistemaAngular/ws/login.php",
                data: {
                    Usuario: Usuario,
                    Contrasena:Contrasena},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {

                $scope.resp=data.LOGUSER;
                console.log( $scope.resp[0].Id_perfil);
                if ($scope.resp[0].Id_perfil >= 1){
                    $scope.perfil=$scope.resp[0].Id_perfil;
                    $scope.mostarNavBar=true;
                    $scope.mostarlogin=false;
                    $scope.navbarOpciones($scope.perfil);
                }else {
                    console.log('Usuario y contraseña incorrectos')
                }
            });
        }
            $scope.showOpciones=function(show) {
                console.log(show);
                $scope.mostarlogin=show;
            };
            $scope.AdminUsuarios=function() {
                var request=$http.get(
                   "http://localhost/SistemaAngular/ws/Usuarios.php")
                request.success(function (data) {
                    $scope.users=data.DATOSUSUARIO;
                    console.log('data' + $scope.users);
                })
            }
            $scope.getPerfil=function () {
                var request=$http.get(
                    "http://localhost/SistemaAngular/ws/perfiles.php")
                request.success(function (data) {
                    $scope.perf=data.DATOSPERFIL;
                    console.log('data' + $scope.perf);
                })
            }
            $scope.nuevoUsuario=function (Nombre,Usuario,Contrasena,Estado) {
                console.log('prueba recargar'+$scope.perfil);
                console.log("prueba" + Nombre+ Usuario + Contrasena);
                Id_perfil=$scope.perfil;
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/NuevoUsuario.php",
                    data: {
                        Nombre: Nombre,
                        Usuario: Usuario,
                        Contrasena: Contrasena,
                        Estado: Estado,
                        Id_perfil:Id_perfil
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
            $scope.ModificarUsuario=function (Id_usuario,Nombre,Usuario,Contrasena,Estado) {
                console.log('prueba recargar'+$scope.perfil);
                console.log("prueba" + Nombre+ Usuario + Contrasena);
                Id_perfil=$scope.perfil;
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/ModificarUsuario.php",
                    data: {
                        Id_usuario:Id_usuario,
                        Nombre: Nombre,
                        Usuario: Usuario,
                        Contrasena: Contrasena,
                        Estado: Estado,
                        Id_perfil: Id_perfil
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
            $scope.recargar=function (perfil) {
                $scope.perfil=perfil;
                console.log('prueba recargar'+$scope.perfil);
            }
            $scope.CambioEstado=function (Id_usuario,Estado) {
                if(Estado==1){
                    Estado=0;
                }else {
                    Estado=1;
                }
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/CambioEstado.php",
                    data: {
                        Id_usuario:Id_usuario,
                        Estado: Estado
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            }
            $scope.getMenu=function () {
                var request=$http.get(
                    "http://localhost/SistemaAngular/ws/menus.php")
                request.success(function (data) {
                    $scope.menus=data.DATOSMENU;
                    console.log('data' + $scope.menus);
                })
            }
        $scope.nuevaOpcion=function (Opcion,Estado,Padre,Padre1,Url) {
                console.log(Url);
            if(Padre==1){
                Padre=null;
            }else{
                Padre=Padre1;
            }
            var request=$http({
                method: "POST",
                url: "http://localhost/SistemaAngular/ws/NuevaOpcion.php",
                data: {
                    Opcion: Opcion,
                    Estado: Estado,
                    Padre:Padre,
                    Url: Url
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
        $scope.ModificarOpcion=function (Id_opcion,Opcion,Estado,Padre,Padre1,Url) {
                console.log('moOP'+Id_opcion+Opcion+Estado+Padre+Padre1+Url);
            if(Padre==1){
                Padre=null;
            }else{
                Padre=Padre1;
            }
            console.log('moOP'+Id_opcion+Opcion,Estado,Padre,Url);

            var request=$http({
                method: "POST",
                url: "http://localhost/SistemaAngular/ws/ModificarOpciones.php",
                data: {
                    Id_opcion:Id_opcion,
                    Opcion: Opcion,
                    Estado: Estado,
                    Padre:Padre,
                    Url: Url
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
        $scope.CambioEstadoOpcion=function (Id_opcion,Estado) {
            if(Estado==1){
                Estado=0;
            }else {
                Estado=1;
            }
            var request=$http({
                method: "POST",
                url: "http://localhost/SistemaAngular/ws/CambioEstadoOpcion.php",
                data: {
                    Id_opcion:Id_opcion,
                    Estado: Estado
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
        }
    )
    .directive('uploaderModel', ["$parse", function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, iElement, iAttrs)
            {
                iElement.on("change", function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                });
            }
        };
    }])
    .service('upload', ["$http", "$q", function ($http, $q){
        this.uploadFile = function(file, name){
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("name", name);
            formData.append("file", file);
            return $http.post("ws/moverArchivos.php", formData, {
                headers: {
                    "Content-type": undefined
                },
                transformRequest: angular.identity
            })
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(msg, code){
                    deferred.reject(msg);
                })
            return deferred.promise;
        }
    }])
