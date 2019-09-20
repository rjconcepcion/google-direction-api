$(function() {

    'use strict';

    var latlangs = {
        200 : {
            3 : "14.586311, 121.070762",
            6 : "14.594493, 121.068745",
            9 : "14.583030, 121.052673"
        },
        201 : {
            3 : "14.5945962, 121.06968",
            6 : "14.5874944, 121.0679204",
        }        
    }
    
    var map;

    var markers = [];

    var mainMap = {

        init : function() {
            var ths = this;
            ths._createMap();

            let ctr = 0;
            for (var key in latlangs) {
                for (var id in latlangs[key]) {
                    ctr++;
                    ths._addMarker(ctr,latlangs[key][id],key,id);
                }
            }

            /**
             * Events
             */
            this._events();
        },
        _createMap : function() {

            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 14.586311, lng: 121.070762},
                zoom: 13
            });
        },
        _addMarker : function(ctr,location,parentId,childId){

            // window.setTimeout(function() {
                var loc = location.split(',');
                var marker = new google.maps.Marker({
                    position: {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])},
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                marker.parentId = parseInt(parentId);
                marker.childId = parseInt(childId);
                markers.push(marker);
            // }, ctr * 200);

        },

        _setMapOnAll : function(map) {
            for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(map);
            }
        },
        _hideMarkers : function() {
            mainMap._setMapOnAll(null);
        },
        _showMarkers : function() {
            mainMap._setMapOnAll(map);
        },       
        _markers : function() {
            console.log(markers.length);
        },
        _events : function() {
            $(document).on('click', '#check-markers' , this._markers);
            $(document).on('click', '#hide' , this._hideMarkers);
            $(document).on('click', '#show' , this._showMarkers);
        }

    }

    mainMap.init();

    var contentFeed = {

        init : function() {

            this._events();
            this._createParent();
        },
        _createParent : function() {
            for (var key in latlangs) {
                var title = $('<span>').attr('data-parent','').text(key);
                var details = $('<span>').text('[show]');
                var li = $('<li>');
                li.append(title);
                li.append(details);
                $('#list-wrap').append(li);
                var innerUL = $('<ul>');
                for (var id in latlangs[key]) {                
                    if (latlangs[key].hasOwnProperty(id)) {                    
                        var innerLI = $('<li>').addClass('subs').text(latlangs[key][id]);                        
                        innerUL.append(innerLI);
                        li.append(innerUL);                                    
                    }                    
                }
            }
        },
        _showChild : function(){
            console.log('x');
        },
        _events : function(){

            $(document).on('click','[data-parent]',this._showChild);
        }


    }
    contentFeed.init();



});