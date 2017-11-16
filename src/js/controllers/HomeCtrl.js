angular.module('helloWorldApp')
.controller('HomeCtrl', [
    '$scope','homeServices',
    function($scope, homeServices) {
      $scope.srcImage = "images/mic.gif";
      //startregion variable
      var ignore_onend;
      var start_timestamp;
      var recognizing;
      $scope.final_transcript = '';
      var create_email;
      $scope.infoStart = false;
      $scope.infoSpeachNow = false;
      $scope.infoNoSpeech = false;
      $scope.infoNoMicroPhone = false;
      $scope.infoAllow = false;
      $scope.infoDenied = false;
      $scope.infoBlocled = false;
      $scope.infoUpgrade = false;
      $scope.final_span = "start";
      $scope.interim_span = "START";
      //endregion

      //startregion define function 
      function upgrade() {
        // angular.element("#start_button").style.visibility = 'hidden';
        $scope.infoUpgrade = true;
      }

      var two_line = /\n\n/g;
      var one_line = /\n/g;
      function linebreak(s) {
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
      }
      
      var first_char = /\S/;
      function capitalize(s) {
        return s.replace(first_char, function(m) { return m.toUpperCase(); });
      }

     
      //endregion

      if(!('webkitSpeechRecognition' in window)){
        upgrade();
      }else{
        // angular.element("start_button").style.display = "inline-block";
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function (){
          recognizing = true;
          $scope.infoSpeachNow = true;
          $scope.srcImage = "images/mic-slash.gif";
        };

        recognition.onerror = function(event){
          if(event.error = "no-speech"){
            $scope.srcImage = "images/mic.gif";
            $scope.infoNoSpeech = true;
            ignore_onend = true;
          }
          if(event.error = "audio-captrue"){
            $scope.srcImage = "images/mic.gif";
            $scope.infoNoMicroPhone = true;
            ignore_onend = true;
          }
          if(event.error = "not-allowed"){
            if(event.timeStamp - start_timestamp < 100){
              $scope.infoBlocked = true;
            }else{
              $scope.Denied = true;
            }
            ignore_onend = true;
          }
        };

        recognition.onend = function (){
          recognizing = false;
          if(ignore_onend){
            return;
          }
          $scope.srcImage= "images/mic.gif";
          if(!$scope.final_transcript){
            $scope.infoStart = true;
            return;
          }
          // TODO: set false all show
          $scope.infoStart = false;
          $scope.infoSpeachNow = false;
          $scope.infoNoSpeech = false;
          $scope.infoNoMicroPhone = false;
          $scope.infoAllow = false;
          $scope.infoDenied = false;
          $scope.infoBlocled = false;
          $scope.infoUpgrade = false;
          // endTODO
          if(window.getSelection){
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById("final_span"));
            window.getSelection().addRange(range);
          }
        };

        recognition.onresult = function(event){
          var interim_transcript = '';
          for(var i = event.resultIndex; i< event.results.length; i++){
            if(event.results[i].isFinal){
              $scope.final_transcript += event.results[i][0].transcript;
             
            }else{
              interim_transcript += event.results[i][0].transcript;
            }
          }
          $scope.final_transcript = capitalize($scope.final_transcript);
          $scope.final_span = linebreak($scope.final_transcript);
          $scope.interim_span = linebreak(interim_transcript);
          $("#final_span").html($scope.final_transcript);
          if($scope.final_transcript || interim_transcript){
            $scope.inlineBlock = true;
          }
        };

        $scope.startButton = function(event){
          if(recognizing){
            recognition.stop();
            return;
          }
          $scope.final_transcript = '';
          recognition.lang= "vi-VI";
          recognition.start();
          ignore_onend = false;
          $scope.final_span = '';
          $("#final_span").html('');
          $scope.interim_span = '';
          $scope.srcImage = "images/mic-animate.gif";
          $scope.infoAllow = true;
          $scope.showBUtton = false;
          start_timestamp = event.timeStamp;
        }

        $scope.getClassification = function(){
          homeServices.classification({text: $scope.final_transcript}).then(function(response){
            if(response.data !== null && response.data !== undefined){
              $scope.model = response.data;
              console.log( $scope.model);
            };
          }, function( err){
            return false;
          });
        };
      }
    }
]);
