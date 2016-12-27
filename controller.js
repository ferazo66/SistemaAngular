/**
 * Created by ferazo on 23/12/2016.
 */
angular.module('app',[])
    .controller("ControllerUsuarios",function($scope, $http,upload) {
        var mostarlogin= false;
        var mostarNavBar=false;
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
