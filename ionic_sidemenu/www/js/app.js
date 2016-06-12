    // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic-timepicker', 'starter.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html'
                    }
                }
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })

            .state('app.events', {
                url: '/events',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events.html'
                    }
                }
            })

            .state('app.login_fix', {
                url: '/login_fix',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login_fix.html'
                    }
                }
            })

            .state('app.register', {
                url: '/register',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/register.html'
                    }
                }
            })

            .state('app.create_events', {
                url: '/create_events',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/create_events.html'
                    }
                }
            })

            .state('app.filters', {
                url: '/filters',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/filters.html'
                    }
                }
            })

            .state('app.about_us', {
                url: '/about_us',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about_us.html'
                    }
                }
            })

            .state('app.contact', {
                url: '/contact',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact.html'
                    }
                }
            })

            .state('app.distance_events', {
                url: '/distance_events',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/distance_events.html'
                    }
                }
            })

            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    });


