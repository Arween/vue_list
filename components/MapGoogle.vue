<template>
    <div class="b-map">
        <div class="map-container">
            <gmap-map :center="{lat:53.90, lng:27.48}" :zoom="12" :options="{styles: styles} ">
                <div v-for="(marker, idx) in markers" >
                    <gmap-marker :position=marker.coordinates :icon.sync="marker.icon" v-on:click="choose(idx)">
                    </gmap-marker>
                    <gmap-info-window :position=marker.coordinatesInfo>
                        {{ marker.name }}
                    </gmap-info-window>
                </div>

            </gmap-map>

        </div>

        <div class="tabs_address_wp" id="address_wp">
            <div class="tab" v-for="place in places" >
                <input id="place.index" type="radio" name="tabs2" class="address_tab">
                <label for="place.index" >{{ place.name }}</label>
                <div class="tab-content">
                    <p>{{ place.information.address }}</p>
                    <p>Время работы: 24/7</p>
                    <p>{{ place.information.phone }}</p>
                </div>
            </div>

        </div>
    </div>

</template>
<script>

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCkTmRLe13JUfDeihf5xKO-aHhCehQHMfo',
    v: '3',
    // libraries: 'places' // Only if you need Autocomplete
  }
})
export default {
    data () {
      return {

      markers: [
      	{	
      		coordinates: 
      			{
      				lat: 53.90,
        			lng: 27.50
      			}
      		,
      		coordinatesInfo:
      			{
      				lat: 53.91,
        			lng: 27.50
      			}
      		,
        	name: 'Minsk',
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      	},
      	{
      		
        	coordinates: 
      			{
      				lat: 53.88,
        			lng: 27.46
      			}
      		,
      		coordinatesInfo: 
      			{
      				lat: 53.89,
        			lng: 27.46
      			}
      		,
        	name: 'Uzda',
            icon: 'img/map_icon.png',
      	}
      ],

          places: [
              {
                  name: "г. Узда",
                  index: "tab_1",
                  information:
                      {
                          address: 'г. Узда',
                          phone: '3784273648'
                      }

              },
              {
                  name: "г. Минск",
                  index: "tab_2",
                  information:
                      {
                          address: 'г. Минск',
                          phone: '2344354888'
                      }

              }

          ],

          styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#3e606f"
                    },
                    {
                        "weight": 2
                    },
                    {
                        "gamma": 0.84
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "weight": 0.6
                    },
                    {
                        "color": "#1a3541"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2b7396"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#306782"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#5388a2"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": -37
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "weight": ".25"
                    },
                    {
                        "gamma": "1"
                    },
                    {
                        "color": "#cdcdcd"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#214658"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#144056"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#8ba0ab"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#406d80"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#193341"
                    }
                ]
            }
         ]
      }
    },
    methods: {

        choose(idx) {
//        choose(idx) {
//            this.places.forEach(place => {
//                place.chosen = false;
//            });
//
//            this.places[idx].chosen = true;
//            this.$emit('choose_place', this.places[idx].address);
//            this.$forceUpdate();
            console.log(idx)
//            console.log('sdsdfsd')
        }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	/*.map-container {*/
    	/*width: 100%;*/
    	/*height: 300px;*/
  	/*}*/


  	/*.vue-map{*/
  		/*height: 500px;*/
  	/*}*/
    .map-container {
        width: 100%;
        height: 500px !important;
    }
    .vue-map-container{
        width: 100%;
        height: 500px !important;
    }


    .vue-map-container .vue-map{
        height: 500px !important;
    }


</style>