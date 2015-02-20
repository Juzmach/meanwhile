angular.module('meanwhile').factory('socket', function($rootScope) {
    var address = location.host;
    var socket = io(address);
    socket.on('message', function(message) {
        console.log(message);
    });

    socket.on('disconnect', function() {
        alert('Disconnected!');
        location.reload();
    });
    socket.on('reconnect', function() {
        alert('Disconnected!');
        location.reload();
    });

    return {
        emit: function(event, data, callback) {
            socket.emit(event, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});
