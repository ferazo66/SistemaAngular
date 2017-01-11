/**
 * Created by ferazo on 23/12/2016.
 */
angular.module('app',[])
    .controller("ControllerUsuarios",function($scope, $http,$window,upload) {
        var mostarlogin= false;
        var mostarNavBar=false;
        var mostarOpciones=false;
        var carrusel=false;
        var Id_usuario=0;
        var usuario=Id_usuario;
        var Direccion= " ";
        var Estado=true;
        var perfil=0;
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
                if($scope.resp==''||$scope.resp==null||$scope.resp=='0'||$scope.resp.length<0){
                    console.log('Usuario y contraseña incorrectos');
                    $scope.errorLog=true;
                }else {
                    console.log($scope.resp[0].Id_perfil);
                    if ($scope.resp[0].Id_perfil >= 1) {
                        $scope.perfil = $scope.resp[0].Id_perfil;
                        $scope.mostarNavBar = true;
                        $scope.mostarlogin = false;
                        $scope.navbarOpciones($scope.perfil);
                        $scope.correctLog = true;
                        $scope.Id_usuario=$scope.resp[0].Id_usuario;
                        console.log('log'+ $scope.Id_usuario);
                        var request=$http({
                            method: "POST",
                            url: "http://localhost/SistemaAngular/ws/sesion.php",
                            data: {
                                Id_usuario: $scope.Id_usuario,
                                Id_perfil:$scope.perfil
                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        });
                        console.log('login'+ $scope.Id_usuario);
                        console.log('login'+ $scope.perfil);
                    }
                }

            });
        }
        $scope.navbarpaginas=function () {
            var requestperf = $http.get(
                "http://localhost/SistemaAngular/ws/sesionlog.php")
            requestperf.success(function (data) {
                $scope.usuario = data.DATOSSESION[0].Id_usuario;
                console.log('data  ' + $scope.usuario);
                $scope.perfil = data.DATOSSESION[0].Id_perfil;
                $scope.mostarNavBar = true;
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/consultaNavbar.php",
                    data: {
                        Id_perfil:$scope.perfil
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
                request.success(function (data) {
                    $scope.navBar=data.DatosNavBar;
                    console.log('data' + $scope.navBar);
                });
            })
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

                $window.location.reload();
                $scope.correctcrea=true;

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
                $window.location.reload();
                $scope.correctact=true;
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
                request = $http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/subirArchivos.php",
                    data: {
                        Direccion: Direccion,
                        Estado: Estado,
                        Id_usuario: Id_usuario
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                $window.location.reload();

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
                });
                $window.location.reload();

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
                $window.location.reload();

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
                $window.location.reload();

            }
            $scope.nuevoPerfil=function (Nombre,Estado) {
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/NuevoPerfil.php",
                    data: {
                        Nombre: Nombre,
                        Estado: Estado
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
                $window.location.reload();
            }
            $scope.nuevaRelacion=function (Id_opcion,Id_perfil) {
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/NuevaRelacion.php",
                    data: {
                        Id_opcion: Id_opcion,
                        Id_perfil: Id_perfil
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
                $window.location.reload();

            }
            $scope.getRelacion=function () {
                var request=$http.get(
                    "http://localhost/SistemaAngular/ws/relaciones.php")
                request.success(function (data) {
                    $scope.relacion=data.DATOSRELACION;
                    console.log('data' + $scope.relacion);
                })
            }
            $scope.CambioEstadoPerfil=function (Id_perfil,Estado){
                    console.log(Id_perfil+Estado);
                if(Estado==1){
                    Estado=0;
                }else {
                    Estado=1;
                }
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/CambioEstadoPerfil.php",
                    data: {
                        Id_perfil:Id_perfil,
                        Estado: Estado
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
                $window.location.reload();

            }
            $scope.ModificarPerfil=function (Id_perfil,Nombre,Estado) {
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/ModificarPerfil.php",
                    data: {
                        Id_perfil:Id_perfil,
                        Nombre: Nombre,
                        Estado: Estado
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
                $window.location.reload();
            }
            $scope.getUsuario=function () {
                var request=$http.get(
                    "http://localhost/SistemaAngular/ws/sesionlog.php")
                request.success(function (data) {
                    $scope.usuario=data.DATOSSESION[0].Id_usuario;
                    console.log('data  ' + $scope.usuario);
                    requestima = $http({
                        method: "POST",
                        url: "http://localhost/SistemaAngular/ws/imagenesUsuario.php",
                        data: {
                            Id_usuario: $scope.usuario
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                    console.log('data3  ' + $scope.usuario);
                    requestima.success(function (data) {
                        $scope.imag=data.DATOSIMAGEN;
                        console.log('data' + $scope.imag);
                    })
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
                console.log(Direccion + Estado + Id_usuario);
                var request = $http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/subirArchivos.php",
                    data: {
                        Direccion: Direccion,
                        Estado: Estado,
                        Id_usuario: Id_usuario
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                $window.location.reload();
            }
            $scope.deletFile=function(Id_imagen,Estado,Id_usuario){
                console.log("prueba" +Id_imagen + Estado + Id_usuario);
                var request=$http({
                    method: "POST",
                    url: "http://localhost/SistemaAngular/ws/eliminarArchivos.php",
                    data: {
                        Id_imagen:Id_imagen,
                        Estado: Estado,
                        Id_usuario: Id_usuario
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                $window.location.reload();
            }
    })
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
            return $http.post("../ws/moverArchivos.php", formData, {
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
