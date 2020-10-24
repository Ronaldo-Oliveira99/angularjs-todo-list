(function () {
  'use strict';

  angular.module('todoApp')
    .controller('homeController', homeController);

  homeController.$inject = ['constantes', 'userService'];

  function homeController(constantes, userService) {
    var vm = this;

    /* ***************    INIT VARIÁVEIS    *********************************** */
    vm.loading = true;
    vm.cards = [];
    vm.users = [];
    vm.permissoes = [];
    vm.usuario = {};
    vm.usuarioSelecionado = null;
    vm.constantes = constantes;
    vm.isEdicao = false;

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.criarCards = criarCards;
    vm.dragEvent = dragEvent;
    vm.drop = drop;
    vm.allowDrop = allowDrop;
    vm.buscarUsuarios = buscarUsuarios;
    vm.submit = submit;
    vm.clearModal = clearModal;
    vm.buscarRoles = buscarRoles;

    /* ***************    FUNÇÕES    ******************************** */

    function init() {
      $('#novoUserModal').on('hidden.bs.modal', vm.clearModal);
      vm.buscarUsuarios();
      vm.criarCards();
      vm.buscarRoles();
    }

    function submit() {
      console.log('submited');
    }

    function clearModal() {
      console.log('modal cleared');
      vm.usuario = {};
    }

    function buscarUsuarios() {
      userService.getUsers(function (data) {
        vm.users = data;
        vm.usuarioSelecionado = data[0];
      });
    }

    function buscarRoles() {
      userService.getRoles(function (data) {
        vm.permissoes = data;
      });
    }

    function criarCards() {
      vm.cards = [{
          idStatus: 1,
          status: 'TODO',
          severity: 'info',
          registros: [{
            id: 1,
            text: 'Prova Quarkus'
          }]
        },
        {
          idStatus: 2,
          status: 'DOING',
          severity: 'warning',
          registros: [{
              id: 2,
              text: 'Estudando'
            },
            {
              id: 3,
              text: 'Fazendo front-end'
            },
          ]
        },
        {
          idStatus: 3,
          status: 'DONE',
          severity: 'success',
          registros: [{
              id: 4,
              text: 'Prova AngularJS'
            },
            {
              id: 5,
              text: 'Prova Java'
            },
          ]
        },
        {
          idStatus: 4,
          status: 'BLOCK',
          severity: 'danger',
          registros: [{
            id: 6,
            text: 'Fazer fork no projeto final'
          }]
        }
      ];
    }

    function dragEvent(event, sourceCard, value) {
      console.log('source:', sourceCard);
      console.log('valor source:', value);
      event.dataTransfer.setData('dragged', JSON.stringify(value));
    }

    function drop(event, targetCard) {
      console.log('target:', targetCard);
      var data = JSON.parse(event.dataTransfer.getData('dragged'));
      console.log('valor target:', data);
    }

    function allowDrop(event) {
      event.preventDefault();
    }
  }

})();