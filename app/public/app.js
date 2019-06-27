


angular.module('appTest', ['ngCookies'])
    .controller('appController',['$cookies',function($cookies) {
        var app = this;

        app.wordText = ''; 
        app.words = []; 

        //get words from cookie
        var myState = $cookies.get('myState');
        var url = 'http://' + document.location.host + '/api/word';

        var postData = function(wordText, old) {
            return new Promise(function(resolve, reject) {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        words: wordText,
                        old : old
                    })
                }).then(function(response) {
                    response.json().then(function(data) {
                        resolve(data);
                    });
                }).catch(function(err) {
                    reject(err);
                })
            })
        }

        //if cookie exsist then repopulate output
        if (myState) {
            var newUrl = new URL(url); 
            newUrl.searchParams.append('words', myState);
            fetch(newUrl).then(function(response) {
                response.json().then(function(data) {
                   app.words = data.data;
                })
            });
        }

        app.submitText = function() {

            if (app.wordText.trim() != "") {
                const oldText = app.words.map(function(e) {
                    return e.word
                }).join(' ');

                //hit post data api endpoint
                postData(app.wordText, oldText).then(function(data) {
                    app.words = data.data
                    //save to cookie
                    $cookies.put('myState', app.words.map(function(e) {
                        return e.word;
                    }).join(' '));
                });

                app.wordText = '';
            }
        }


    }]).directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });
    
                    event.preventDefault();
                }
            });
        };
    });