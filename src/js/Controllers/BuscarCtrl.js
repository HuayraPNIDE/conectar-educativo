var app = angular.module('app');
var gui = require('nw.gui');

app.controller('BuscarController', function($scope, $http, ApiFactory, _) {
  $scope.data.juegos = [];
  $scope.data.videos = [];
  $scope.data.ebooks = [];
  $scope.data.secuencias = [];
  $scope.data.infografias = [];
  $scope.data.recursos = [];
  $scope.data.result = false;

  function alertar_error(data) {
    alert(data);
  }

  $scope.buscar = function(){
    function success(req) {
      console.log(req);
      for(var i in req){
        var data = req[i].data;
        _.each(data.result.data, function (recurso) {
          recurso.entity = data.entity;
          $scope.data.recursos.push(recurso);
        });
      }
      console.log($scope.data.recursos);
      $scope.data.result = true;
    };
    ApiFactory.buscar({}, success, alertar_error);
  }

  $scope.listar_juegos = function() {
    function success(data) {
      $scope.data.juegos = data;
      $scope.data.result = true;
    }
    ApiFactory.listar_juegos({}, success, alertar_error);
  }

  $scope.listar_videos = function() {
    function success(data) {
      $scope.data.videos = data;
      $scope.data.result = true;
    }
    ApiFactory.listar_videos({}, success, alertar_error);
  }


  var ModalDetalleCtrl = function ($scope, $modalInstance, detalle) {
    $scope.data = {};
    $scope.data.detalle = detalle;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };


  $scope.abrir_recurso = function(recurso) {
    console.log({id: recurso.id});

    function success(data) {

      var modalInstance = $modal.open({
        templateUrl: 'templates/modal_detalle.html',
        controller: ModalDetalleCtrl,
        resolve: {
          detalle: function() {return data;}
        }
      });

    }

    ApiFactory.obtener_detalle_video(recurso.id, success, alertar_error);
  }

  $scope.ver_recurso_en_educar = function(recurso) {
    gui.Shell.openExternal(recurso.visualizacion_educar);
  }
});
