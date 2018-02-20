console.log('test');
import Vue from 'vue'
import Test from './components/Test.vue'
// import Social from './components/Social.vue'
// import FilterFirst from './components/FilterFirst.vue'
// import FilterSecond from './components/FilterSecond.vue'
import Calendar from './components/Calendar.vue'

// import Tabscalendar from './components/Tabscalendar.vue'
// import Calendar from './components/Calendar.vue'
// import Tabscalendar from './components/Tabscalendar.vue'
// import Place from './components/Place.vue'
// import Calendarform from './components/Calendarform.vue'

import MapGoogle from './components/MapGoogle.vue'


window.Vue = Vue;





Vue.component('test', Test);
Vue.component('calendar', Calendar);
// Vue.component('socialsharning', Social);
// Vue.component('mapgoogle', MapGoogle);
// Vue.component('filterfirst', FilterFirst);
// Vue.component('filtersecond', FilterSecond);
// Vue.component('tabscalendar', Tabscalendar);
// Vue.component('calendar', Calendar);
// Vue.component('tabscalendar', Tabscalendar);
// Vue.component('place', Place);
// Vue.component('calendarform', Calendarform);



// bug ios11
// document.body.classList.add('hidden-scroll');
// document.body.classList.remove('hidden-scroll');


new Vue({
  el: '#app', 
  // components: { Test, Vacancyfilter },
  data: {
    message: 'Hello Vue!',
      showModal: false,
      // data: {
      //     form: new Form({
      //         name: '',
      //         description: ''
      //     })
      // },
  }


});
