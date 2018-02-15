<template>
    <div class="calendar">
        <div class="calendar__head">
            <p v-on:click="prevMonth">prev</p>
            <p>{{ monthInfo.name }}, {{ monthInfo.year }}</p>
            <p v-on:click="nextMonth">next</p>
        </div>
        <div class="calendar__body">
            <div>
                <div class="day" v-for="day_name in monthInfo.dayWeek">
                    <p>{{ day_name }}</p>
                </div>
            </div>
            <div class="day" v-for="day in current_state" v-on:click="selectDay">
                <p v-bind:class="{'day-current': day.currentDay, 'day-selected': day.selected, 'day-no-events': day.notEvents}" :day_num=day.val>{{ day.val }}</p>
            </div>
            <div v-if='selectedForm.date > 0' class="calendar__date">
                <p>{{ selectedForm.date }}, {{ selectedForm.month_name }}, {{ selectedForm.year }}</p>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data: () => ({
            calendar: {},
            current_state: [],
            selectedForm: {},
            currentMonthInfo: {},
            language: 'en'
        }),
        computed: {
            refreshMonth: function () {
                // this.daysCalendar = month.createMonth();
                // return this.current_state;
            },
            // currentDay: function () {
            //    this.selectDay();
            //     // return this.current_state;
            // },
            currentMonth: function() {
                // this.currentMonthInfo.index = month.infoMonth()[0];
                // this.currentMonthInfo.year = month.infoMonth()[1];
                // this.currentMonthInfo.dayWeek = name_daysOfTheWeek[this.language];
                // let language = 
                // console.log(name_months[this.language]+'---------')
                
                // return this.currentMonthInfo;
            },
            // dayWeek: function() {

            // }
            
        },
        created: function () {
            // `this` указывает на экземпляр vm
            this.calendar = new Calendar(new Date().getMonth(), new Date().getFullYear());
            this.get_current_state();
            
        },
        // created: {
            
        //     createMonth(){
        //         this.current_state = calendar.createCurrentState();
        //         console.log('current state: ', this.current_state);
        //     }
        // },
        methods: {
            get_current_state(){
                // let tempMonth = this.monthInfo.index;
                if ( this.calendar.monthIndex < 0 ){
                    // console.log('this.monthInfo.index < 0', this.monthInfo.index)
                    this.calendar.monthIndex = 11;
                    this.calendar.yearIndex--;
                }
                if ( this.calendar.monthIndex > 11 ){
                    // console.log('this.monthInfo.index > 11', this.monthInfo.index)
                    this.calendar.monthIndex = 0;
                    this.calendar.yearIndex++;
                }
                this.current_state = this.calendar.createCurrentState();
                this.monthInfo = this.calendar.infoMonth();
                // console.log('this.monthInfo.index', this.monthInfo.index)
                this.monthInfo.name = name_months[this.language][this.monthInfo.index];
                this.monthInfo.dayWeek = name_daysOfTheWeek[this.language];
                // console.log("calendar", this.calendar);
                // console.log('current state: ', this.current_state);
            },
            selectDay(event){
                this.current_state.forEach(day => {
                    day.selected = false;
                   if ( day.val == +event.target.attributes.day_num.value ){
                       day.selected = true;
                   }
                });
                this.selectedForm.date =  event.target.attributes.day_num.value;
                // console.log(this.selectedForm.month_index, this.monthInfo.month_name)
                this.selectedForm.month_index = this.calendar.monthIndex;
                this.selectedForm.month_name = name_months[this.language][this.selectedForm.month_index];
                this.selectedForm.year = this.calendar.yearIndex;
                // this.$forceUpdate();

            },
            nextMonth(){
                // console.log('dsfd')
                this.calendar.monthIndex++;
                // console.log(this.calendar.monthIndex);
                this.get_current_state();
            },
            prevMonth(){
                this.calendar.monthIndex--;
                // console.log(this.calendar.monthIndex);
                this.get_current_state();
            }
        }
    };
   
    class Day{
        constructor(val, currentMonth) {
            this.val = val;
            this.selected = false;
            this.notEvents = !currentMonth;
            if(currentMonth){

                var cerrentNumbMonth = new Date().getDate();

                if ( cerrentNumbMonth == val){
                    this.currentDay = true;
                }
            } else {
                this.currentDay = false;
            }
        }
    }


    // function day_generator(flag_rule){
    //     if (flag_rule == "prev") {
    //         return function() {
    //             let countsDaysPrevMonth = new Date(this.year, this.index, 0).getDate();   //-- ко-во дней прошлого месяца
    //             let temp = getDaysPrevMonth(this.first_day_of_the_week);
    //             function getDaysPrevMonth(firstDay) {
    //                 let tempDays = [];
    //                 for ( let l = firstDay - 1; l >= 0; l-- ){
    //                     tempDays.push(new Day(countsDaysPrevMonth - l,false).day_create());
    //                 }
    //                 return tempDays;
    //             }
    //             return temp;
    //         }
    //     } else if (flag_rule == "next") {
    //             return function() {
    //                 let tempLast = getDaysNextMonth(this.last_day_of_the_week);
                    
    //                 function getDaysNextMonth(lastDay) {
    //                     let tempDays = [];
    //                     for ( let l = 1; l <= 7-lastDay; l++ ){
    //                         tempDays.push(new Day(l,false).day_create());
    //                     }
    //                     return tempDays;
    //                 }
    //                 console.log("last-day", this.last_day_of_the_week, tempLast);
    //                 // console.log('day_generator-current', monthIndex);
    //                 return tempLast;
    //             }
    //     } else {
    //             return function() {
    //                 let tempDays = [];
    //                 for ( let i = 1; i <= this.countsDays; i++ ){
    //                     tempDays.push(new Day(i,true).day_create());
    //                 }
    //                 return tempDays;
    //             }
    //     }
    // }
    // var monthIndex = new Date().getMonth() + 2;

    // console.log('monthIndex:', monthIndex);
    // var prevMonthT = day_generator('prev');
    // var nextMonthT = day_generator('next');
    // var curMonthT = day_generator('current');



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


    // set monthIndex(num) {
    //     this._monthIndex = num;
    // } 


    // get monthIndex() {
    //     return this._monthIndex;
    // }
    // set yearIndex(num) {
    //     this._yearIndex = num;
    // } 


    // get yearIndex() {
    //     return this._yearIndex;
    // }


    _day_generator(flag_rule){       
        if (flag_rule == "prev") {
            return function() {
                let countsDaysPrevMonth = new Date(this.year, this.index, 0).getDate();   //-- ко-во дней прошлого месяца
                let temp = getDaysPrevMonth(this.first_day_of_the_week);
                function getDaysPrevMonth(firstDay) {
                    let tempDays = [];
                    for ( let l = firstDay - 1; l >= 0; l-- ){
                        tempDays.push(new Day(countsDaysPrevMonth - l,false));
                    }
                    return tempDays;
                }
                return temp;
            }
        } else if (flag_rule == "next") {
                return function() {
                    // console.log(this.last_day_of_the_wee )
                    if ( this.last_day_of_the_week != 0 ){
                        let tempLast = getDaysNextMonth(this.last_day_of_the_week);
                        function getDaysNextMonth(lastDay) {
                            let tempDays = [];
                            for ( let l = 1; l <= 7-lastDay; l++ ){
                                tempDays.push(new Day(l,false));
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
                    let tempDays = [];
                    for ( let i = 1; i <= this.countsDays; i++ ){
                        tempDays.push(new Day(i,true));
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

    //  infoMonth() {
    //        return [this.index, this.year];
    //     };

}
    // class Month_old {
    //     constructor(index, rule) {
    //         this.index = index;
    //         this.year = new Date().getFullYear();
    //         this.countsDays = new Date(this.year, this.index+1, 0).getDate(); //количество дней в текущем месяце
    //         this.first_day_of_the_week = new Date(this.year, this.index).getDay() - 1; //-- день недели первого дня месяца
    //         this.last_day_of_the_week = new Date(this.year, this.index, this.countsDays).getDay(); //-- день недели последнего дня месяца
    //         if(this.first_day_of_the_week < 0){ //-- проверка если вск
    //             this.first_day_of_the_week = this.first_day_of_the_week + 7;
    //         }
    //         this.createDays = rule.bind(this);
    //     }
    //     static createCurrentState() {
    //         var month_prev_days = new Month(monthIndex, prevMonthT).createDays();
    //         var month_next_days = new Month(monthIndex, nextMonthT).createDays();
    //         var month_days = new Month(monthIndex, curMonthT).createDays();  
    //         var daysCalendar =  month_prev_days.concat(month_days, month_next_days);
    //         console.log('month-createMonth');
    //         return daysCalendar;
    //     };
    //     infoMonth() {
    //        return [this.index, this.year];
    //     };
    // }
    // console.log(monthIndex);
    // const monthPrevDay = new Month(monthIndex, prevMonthT);
    // const monthNextDay = new Month(monthIndex, nextMonthT);
    // const month = new Month(monthIndex, curMonthT);
    
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


