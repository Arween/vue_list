<template>
    <div>
        <div class="calendar">
            <div class="calendar__head">
                <p v-on:click="prevMonth" class="calendar__head_arrow">&lt;</p>
                <p>{{ monthInfo.name }}, {{ monthInfo.year }}</p>
                <p v-on:click="nextMonth" class="calendar__head_arrow">&gt;</p>
            </div>
            <div class="calendar__body">
                <div>
                    <div class="day" v-for="day_name in monthInfo.dayWeek">
                        <p>{{ day_name }}</p>
                    </div>
                </div>
                <div class="calendar__body_table">
                    <div class="day" v-for="day in current_state" v-on:click="selectDay">
                        <p v-bind:class="{'day-current': day.currentDay, 'day-selected': day.selected, 'day-no-events': day.notEvents}" :day_num=day.val>{{ day.val }}</p>
                    </div>
                </div>
                <div v-if='selectedForm.day > 0' class="calendar__date">
                    <p>{{ selectedForm.month_name }} {{ selectedForm.day }}, {{ selectedForm.year }}</p>
                <!-- <p v-bind:value=selectedForm.date></p> -->
                </div>
            </div>
        <!-- <div v-model="selectedForm"> -->
                <input type="text" :placeholder=placeholder v-model="selectedForm.date" v-mask="'##.##.####'">
                <button v-on:click="selectDayInput">Применить</button>
        <!-- </div> -->
        </div>
        <div class="calendar-gradient">
            <p>Calendar Vue</p>
        </div>
    </div>
</template>
<style>

</style>
<script>
import Vue from 'vue'
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)
    export default {
        props: ['placeholder', 'language'],
        data: () => ({
            calendar: {},
            current_state: [],
            selectedForm: {},
            currentMonthInfo: {},
            // language: 'en',
        }),
        computed: {   
        },
        created: function () {
            this.calendar = new Calendar(new Date().getMonth(), new Date().getFullYear());
            this.get_current_state();
            
        },
        methods: {
            get_current_state(){
                if ( this.calendar.monthIndex < 0 ){
                    this.calendar.monthIndex = 11;
                    this.calendar.yearIndex--;
                }
                if ( this.calendar.monthIndex > 11 ){
                    this.calendar.monthIndex = 0;
                    this.calendar.yearIndex++;
                }
                this.current_state = this.calendar.createCurrentState();
                this.monthInfo = this.calendar.infoMonth();
                this.monthInfo.name = name_months[this.language][this.monthInfo.index];
                this.monthInfo.dayWeek = name_daysOfTheWeek[this.language];
            },
            selectDay(event){
                this.current_state.forEach(day => {
                    day.selected = false;
                   if ( day.val == +event.target.attributes.day_num.value ){
                       day.selected = true;
                   }
                });
                this.selectedForm.day =  event.target.attributes.day_num.value;
                this.selectedForm.month_index = this.calendar.monthIndex;
                this.selectedForm.month_name = name_months[this.language][this.selectedForm.month_index];
                this.selectedForm.year = this.calendar.yearIndex;
                const correctFormatDayMonth = this.getCorrectFormatDate(this.selectedForm.day, this.selectedForm.month_index);
                this.selectedForm.date = correctFormatDayMonth[0] + '.' + correctFormatDayMonth[1] + '.' + this.selectedForm.year;
                // this.$forceUpdate();

            },
            getCorrectFormatDate(day, month){
                    if ( (month + 1) < 10 ){
                        month = '0' + (month + 1);
                    } else {
                        month =  +month + 1;
                    }
                    if ( +day < 10 ){
                        day = '0' + day;
                    } else {
                        day =  day;
                    }
                    let temp = [];
                    temp.push(day, month);
                    return temp;
            },
            selectDayInput(){
                // let successful_validation = this.validateDateInput();
                // if ( successful_validation ){
                    this.selectedForm.day = this.selectedForm.date.split('.')[0];
                    this.selectedForm.month_index = +this.selectedForm.date.split('.')[1] - 1;
                    this.selectedForm.year = this.selectedForm.date.split('.')[2];
                    this.calendar.monthIndex = this.selectedForm.month_index;
                    this.calendar.yearIndex = this.selectedForm.year;
                    this.selectedForm.month_name = name_months[this.language][this.selectedForm.month_index];
                    this.get_current_state();
                    this.current_state.forEach(day => {
                    day.selected = false;
                    if ( day.val == +this.selectedForm.day ){
                       day.selected = true;
                    }
                    });
                    this.selectedForm.day =  event.target.attributes.day_num.value;
                    this.selectedForm.month_index = this.calendar.monthIndex;
                    this.selectedForm.month_name = name_months[this.language][this.selectedForm.month_index];
                    this.selectedForm.year = this.calendar.yearIndex;
                    this.selectedForm.date = this.selectedForm.day + '.' + this.selectedForm.month_index + '.' + this.selectedForm.year;
                // } else {

                // }
                // this.$forceUpdate();
            }, 
            nextMonth(){
                this.calendar.monthIndex++;
                this.get_current_state();
            },
            prevMonth(){
                this.calendar.monthIndex--;
                this.get_current_state();
            },
            // validateDateInput(){
            //     try {
            //         console.log(this.selectedForm.date.length)
            //         if ( this.selectedForm.date.length != 10 ) {
            //             throw new SyntaxError("Ошибка в данных");
            //         }
            //     } catch (e) {
            //         if (e.name == "SyntaxError") {
            //             alert( "Извините, в данных ошибка" );
            //         } 
            //     }
                
            //     return true;
            // }
        }
    };
   
    class Day{
        constructor(val, currentMonth, flagCurrentDay) {
            this.val = val;
            this.selected = false;
            this.notEvents = !currentMonth;
            if(flagCurrentDay){
                var cerrentNumbMonth = new Date().getDate();
                if ( cerrentNumbMonth == val){
                    this.currentDay = true;
                }
            } else {
                this.currentDay = false;
            }
        }
    }

class Calendar {
    constructor(month, year) {
        this.monthIndex = month;
        this.yearIndex = year;
        this._prevMonthT = this._day_generator('prev');
        this._nextMonthT = this._day_generator('next');
        this._curMonthT = this._day_generator('current');
    }

    createCurrentState() {
            var month_prev_days = new Month(this.monthIndex, this.yearIndex, this._prevMonthT).createDays();
            var month_next_days = new Month(this.monthIndex, this.yearIndex, this._nextMonthT).createDays();
            var month_days = new Month(this.monthIndex, this.yearIndex, this._curMonthT).createDays();  
            var daysCalendar =  month_prev_days.concat(month_days, month_next_days);
            return daysCalendar;
    }
    infoMonth() {
        return { 'index' : this.monthIndex, 'year' : this.yearIndex};
    }
    _day_generator(flag_rule){       
        if (flag_rule == "prev") {
            return function() {
                let countsDaysPrevMonth = new Date(this.year, this.index, 0).getDate();   //-- ко-во дней прошлого месяца
                let temp = getDaysPrevMonth(this.first_day_of_the_week);
                function getDaysPrevMonth(firstDay) {
                    let tempDays = [];
                    for ( let l = firstDay - 1; l >= 0; l-- ){
                        tempDays.push(new Day(countsDaysPrevMonth - l, false, false));
                    }
                    return tempDays;
                }
                return temp;
            }
        } else if (flag_rule == "next") {
                return function() {
                    if ( this.last_day_of_the_week != 0 ){
                        let tempLast = getDaysNextMonth(this.last_day_of_the_week);
                        function getDaysNextMonth(lastDay) {
                            let tempDays = [];
                            for ( let l = 1; l <= 7-lastDay; l++ ){
                                tempDays.push(new Day(l,false, false));
                            }
                            return tempDays;
                        }
                        return tempLast;
                    } else {
                        let tempLast = []
                        return tempLast;
                    }
                }
        } else {
                return function() {
                    let currentMonth = new Date().getMonth(),
                        currentYear = new Date().getFullYear(), 
                        flagCurrentMonth = false;
                    if ( currentMonth == this.index && currentYear == this.year ){
                        flagCurrentMonth = true;
                    }
                    let tempDays = [];
                    for ( let i = 1; i <= this.countsDays; i++ ){
                        tempDays.push(new Day(i, true, flagCurrentMonth));
                    }
                    return tempDays;
                }
        }
    }


}


class Month {
    constructor(index, year, rule) {
            this.index = index;
            this.year = year;
            this.countsDays = new Date(this.year, this.index+1, 0).getDate(); //количество дней в текущем месяце
            this.first_day_of_the_week = new Date(this.year, this.index).getDay() - 1; //-- день недели первого дня месяца
            this.last_day_of_the_week = new Date(this.year, this.index, this.countsDays).getDay(); //-- день недели последнего дня месяца
            if(this.first_day_of_the_week < 0){ //-- проверка если вск
                this.first_day_of_the_week = this.first_day_of_the_week + 7;
            }
            this.createDays = rule.bind(this);
    }
}

    console.log('Работает!');


const name_months = {
        'en': 
        [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        'ru': 
        [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ]
    
    };
const name_daysOfTheWeek  = {
        'en': 
        [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun',
        ],
        'ru': 
        [
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
            'Вс',
        ]
    
    };
















    //------------ apply,call,bind     

    // function filter_generator(flag){ // ф-ции фильтров
    //     // var arr = arr;
    //     if (flag){
    //         return function() {
    //             // arr.sort(a,b);
    //             console.log('this.msg', this.arr);
    //         }
    //     } else{
    //         return function() {
    //             // arr.sort(a,b);
    //             console.log('this.msg', this.arr);
    //         }
    //     }
    // }
    // var ruleSortF = filter_generator(true); //flag F
    // var ruleSortT = filter_generator(false); //flag T
    // function RuleGenerator(arr, rule){
    //     // this.rule = form.querSelectorAll('INPUT');
    //     this.arr = arr;
    //     this.msg = 'My sort';
    //     this.sort = rule.bind(this);
    //     this.test = function() {
	//         console.log("this sort(test)");
    //     }
    // }
    // var filter_1 = new RuleGenerator([4,5], ruleSortF);
    // var filter_2 = new RuleGenerator([4,5,9], ruleSortT);
    // var resF1 = filter_1.sort();
    // var resF2 = filter_2.sort();
    // filter_1.test();
    // console.log(resF1);
    // console.log(resF2);

</script>


