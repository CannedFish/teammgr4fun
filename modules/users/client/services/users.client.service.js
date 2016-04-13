(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('users.services')
    .factory('UsersService', UsersService);

  UsersService.$inject = ['$resource'];

  function UsersService($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }

  angular
    .module('users.services')
    .factory('UserNotLogin', UserNotLogin);

  UserNotLogin.$inject = ['$uibModal', '$state'];

  function UserNotLogin($uibModal, $state) {
    return {
      hint: function () {
        var hintModal = $uibModal.open({
          templateUrl: 'modules/users/client/views/user-not-login.client.view.html',
          controller: function () {
            var vm = this;
          },
          size: 'sm'
        });

        hintModal.result.then(function () {
          $state.go('authentication.signin');
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      }
    };
  }

  // TODO this should be Users service
  angular
    .module('users.admin.services')
    .factory('AdminService', AdminService);

  AdminService.$inject = ['$resource'];

  function AdminService($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
