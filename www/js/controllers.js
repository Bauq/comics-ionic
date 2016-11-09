angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $state) {

    // Form data for the login modal
    $scope.loginData = {username: "", password: ""};

    $scope.userData = {username: "", password: "", password2: ""};

    $rootScope.users = [
      {username: "prueba1", password: "xxxx"},
      {username: "admin", password: "tttt"},
      {username: "admin", password: "admin"}
    ];

    $ionicModal.fromTemplateUrl('templates/registro.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.registermodal = modal;
    });

    $scope.doLogin = function () {
      console.log("Users", $scope.users);
      for (var i = 0; i < $scope.users.length; i++) {
        if ($scope.loginData.username == $scope.users[i].username && $scope.loginData.password == $scope.users[i].password) {
          $state.go('app.users');
          $scope.loginData = {};
        }
      }
    };

    $scope.saveUser = function () {
      if ($scope.userData.username != "" && $scope.userData.password != "" && $scope.userData.password == $scope.userData.password2) {
        $scope.users.push($scope.userData);
        $scope.registermodal.hide();
        $scope.userData = {};
      }
    }

  })

  .controller('ComicsCtrl', function ($scope, $rootScope, $ionicModal) {
    $rootScope.comics = [
      {
        title: "MARVEL UNIVERSE GUARDIANS OF THE GALAXY (2015) #14",
        description: "PETER QUILL IS MISSING! Now that they possess the powerful COSMIC SEED, the GUARDIANS OF THE GALAXY are on the hunt for answers. Drawn to Asgard, home of the mighty THOR, the Guardians are ready for a fight…but not one of this magnitude. It’s up to our heroes to save the day — and stop an intergalactic war at the same time!",
        comments: [{id: 1, comment: "Excelent!!"}, {id: 2, comment: ":O"}]
      },
      {title: "AMAZING SPIDER-MAN: RENEW YOUR VOWS (2016) #1",
        description: "he Parker family is web-slinging and wall-crawling their way into your hearts and into comic shops later this year! Life is good for Peter Parker and Mary Jane; their daughter Annie is their pride and joy, they’re both working and (barely) making ends meet, they’re keeping the streets of New York City safe from super villains…you know, normal family stuff. Oh, did we mention MJ and Annie have Spider-Powers –– just like Peter?! Being Spider-Man just became a family affair...",
        comments: [{id: 1, comment: "very good!"}]},
      {
        title: "BLACK PANTHER: WORLD OF WAKANDA (2016) #1",
        description: "Writer ROXANE GAY (Bad Feminst, Hunger) spins a Wakandan love story - its tenderness matched only by its brutality. You know them now as The Midnight Angels, but in this story they are just Ayo and Aneka, young women recruited to become Dora Milaje, an elite task force trained to protect the crown at all costs. And in a special backup story, acclaimed poet YONA HARVEY (Hemming the Water) explores the true origins of The People's mysterious leader Zenzi. Black Panther thinks he knows who Zenzi is and how she got her powers, but he only knows part of the story... Illustrated by rising star AFUA RICHARDSON (Genius). What happens when your nation needs your hearts and minds, but you already gave them to each other? Illustrated by industry veteran ALITHA E. MARTINEZ (Iron Man, Black Panther).",
        comments: [{id: 1, comment: "Amazing"}, {id: 2, comment: "I expected more..."}]
      }
    ];

    $scope.comic = {
      title: "",
      description: "",
      comments: [],
      comment: "",
      count: 0,
    };

    $rootScope.findtext = ""

    $ionicModal.fromTemplateUrl('templates/comicdetail.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.selectmodal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/newcomic.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.newmodal = modal;
    });

    $scope.comicSelect = function (select) {
      $scope.comic.title = select.title;
      $scope.comic.description = select.description;
      $scope.comic.comments = select.comments;
      $scope.selectmodal.show();
    }

    $scope.newModal = function () {
      $scope.comic.title = "";
      $scope.comic.description = "";
      $scope.comic.comments = [];
      $scope.comic.comment = "";
      $scope.comic.count = 0;
      $scope.newmodal.show();
    }


    $scope.addComment = function () {
      if($scope.comic.comment != ""){
        $scope.comic.count += 1;
        $scope.comic.comment.id = $scope.comic.count
        $scope.comic.comments.push($scope.comic.comment);
        $scope.comic.comment = "";
      }
    }

    $scope.saveComic = function () {
      if ($scope.comic.title != "" && $scope.comic.description != "" && $scope.comic.comments.length != 0) {
        $rootScope.comics.push($scope.comic);
        $scope.newmodal.hide();
      }
    }

    $scope.updateComic = function () {
      $scope.selectmodal.hide();
      $scope.newmodal.show();
    }

    $scope.findComic = function (text) {
      for (var i = 0; i < $rootScope.comics.length; i++) {
        if ($rootScope.comics[i].title == text) {
          $scope.comicSelect($rootScope.comics[i]);
          break;
        }
      }
    }
  })
