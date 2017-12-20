angular.module('helloWorldApp' )
.controller('HomeCtrl', [
    '$scope','homeServices','$sce','$window' ,
    function($scope, homeServices, $sce, $window) {
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
          console.log($scope.final_transcript);
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
           $("#final_span").html($scope.final_transcript);
          $scope.interim_span = '';
          $scope.srcImage = "images/mic-animate.gif";
          $scope.infoAllow = true;
          $scope.showBUtton = false;
          start_timestamp = event.timeStamp;
        }

        $scope.getClassification = function(){
          $scope.isLoading = true;
          homeServices.classification({text: $scope.final_transcript}).then(function(response){
            $scope.isLoading = false;
            if(response.data !== null && response.data !== undefined){
              $scope.model = response.data;
              console.log( $scope.model);
            };
          }, function( err){
            return false;
          });
        };

        $scope.getSegmentation = function(){
          $scope.isLoading2 = true;
          homeServices.segmentation({text: $scope.final_transcript}).then(function(response){
            $scope.isLoading2 = false;
            if(response.data !== null && response.data !== undefined){
              $scope.model2 = response.data;
              console.log( $scope.model2);
            };
          }, function( err){
            return false;
          });
        };
        //
        $scope.getAnswer = function(){
          $scope.isloading3 = true;
          homeServices.getAnswer({"question": $scope.final_transcript}).then(function(response){
            $scope.isloading3 = false;
            if(response.data !== null && response.data !== undefined){
              $scope.answers = response.data.answers;
              var datas = [];
              datas = $scope.answers;
              for(var i = 0; i < datas.length; i++){
                datas[i].answer = datas[i].answer.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                if(datas[i].score < 70){
                  datas[i].answer = "no answer with this question !"
                  $scope.showAddQuestionButton = true;
                }
              };
              
              $scope.answers = datas;
            //  $scope.answers = $scope.answers[0].answer.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
              $scope.toTrustedHTML = function( html ){
                return $sce.trustAsHtml( html );
            }
              //console.log($scope.answers[0].answer.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#244;/g, "ô").replace(/&#253;/g, "ý").replace(/&#243;/g, "ó").replace(/&#234;/g, "ê"));
             console.log($scope.answers);
             
            };
          }, function(error){
            return false;
            console.log("error");
          });
        };
        //

        $scope.goContribute = function(){
          $window.location.href = '#!/contribute';
        };

        $scope.goListQuestion = function(){
          $window.location.href = '#!/questions';
        }  
        $scope.addToListQuestion = function(){
          homeServices.addQuestion({"question": $scope.final_transcript}).then(function(response){

          }, function(error){

          })
        }
      }
    }
]);
