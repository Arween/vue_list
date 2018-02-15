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
                <p>{{ selectedForm.date }}, {{ monthInfo.name }}, {{ monthInfo.year }}</p>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data: () => ({
            current_state: [],
            selectedForm: [],
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
            const calendar =  new Calendar(new Date().getMonth(), new Date().getFullYear());
            this.current_state = calendar.createCurrentState();
            this.monthInfo = calendar.infoMonth();
            this.monthInfo.name = name_months[this.language][this.monthInfo.index];
            this.monthInfo.dayWeek = name_daysOfTheWeek[this.language];
            console.log("calendar", calendar);
            console.log('current state: ', this.current_state);
        },
        // created: {
            
        //     createMonth(){
        //         this.current_state = calendar.createCurrentState();
        //         console.log('current state: ', this.current_state);
        //     }
        // },
        methods: {
            selectDay(event){
                this.current_state.forEach(day => {
                    day.selected = false;
                   if ( day.val == +event.target.attributes.day_num.value ){
                       day.selected = true;
                   }
                });
                this.selectedForm.date =  event.target.attributes.day_num.value;
                // this.$forceUpdate();

            },
            nextMonth(){
                // monthIndex = monthIndex + 1;
                // console.log('monthIndex(vue):', monthIndex);
                // const monthPrevDay = new Month(monthIndex, prevMonthT);
                // const monthNextDay = new Month(monthIndex, nextMonthT);
                // const month = new Month(monthIndex, curMonthT);
                console.log('dsfd')
                const calendar =  new Calendar(new Date().getMonth() + 1, new Date().getFullYear());
            },
            prevMonth(){
                
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


    function day_generator(flag_rule){
        if (flag_rule == "prev") {
            return function() {
                let countsDaysPrevMonth = new Date(this.year, this.index, 0).getDate();   //-- ко-во дней прошлого месяца
                let temp = getDaysPrevMonth(this.first_day_of_the_week);
                function getDaysPrevMonth(firstDay) {
                    let tempDays = [];
                    for ( let l = firstDay - 1; l >= 0; l-- ){
                        tempDays.push(new Day(countsDaysPrevMonth - l,false).day_create());
                    }
                    return tempDays;
                }
                return temp;
            }
        } else if (flag_rule == "next") {
                return function() {
                    let tempLast = getDaysNextMonth(this.last_day_of_the_week);
                    function getDaysNextMonth(lastDay) {
                        let tempDays = [];
                        for ( let l = 1; l <= 7-lastDay; l++ ){
                            tempDays.push(new Day(l,false).day_create());
                        }
                        return tempDays;
                    }
                    return tempLast;
                }
        } else {
                return function() {
                    let tempDays = [];
                    for ( let i = 1; i <= this.countsDays; i++ ){
                        tempDays.push(new Day(i,true).day_create());
                    }
                    console.log('day_generator-current', monthIndex);
                    return tempDays;
                }
        }
    }
    // var monthIndex = new Date().getMonth() + 2;

    // console.log('monthIndex:', monthIndex);
    // var prevMonthT = day_generator('prev');
    // var nextMonthT = day_generator('next');
    // var curMonthT = day_generator('current');



class Calendar {
    constructor(month, year) {
        this._monthIndex = month;
        this._yearIndex = year;
        this._prevMonthT = this._day_generator('prev');
        this._nextMonthT = this._day_generator('next');
        this._curMonthT = this._day_generator('current');
    }

    createCurrentState() {
            var month_prev_days = new Month(this.monthIndex, this.yearIndex, this._prevMonthT).createDays();
            var month_next_days = new Month(this.monthIndex, this.yearIndex, this._nextMonthT).createDays();
            var month_days = new Month(this.monthIndex, this.yearIndex, this._curMonthT).createDays();  
            var daysCalendar =  month_prev_days.concat(month_days, month_next_days);
            console.log('month-createMonth');
            return daysCalendar;
    }
    infoMonth() {
        return { 'index' : this.monthIndex, 'year' : this.yearIndex};
    }


    set monthIndex(num) {
        this._monthIndex = num;
    } 


    get monthIndex() {
        return this._monthIndex;
    }
    set yearIndex(num) {
        this._yearIndex = num;
    } 


    get yearIndex() {
        return this._yearIndex;
    }


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
                    let tempLast = getDaysNextMonth(this.last_day_of_the_week);
                    function getDaysNextMonth(lastDay) {
                        let tempDays = [];
                        for ( let l = 1; l <= 7-lastDay; l++ ){
                            tempDays.push(new Day(l,false));
                        }
                        return tempDays;
                    }
                    return tempLast;
                }
        } else {
                return function() {
                    let tempDays = [];
                    for ( let i = 1; i <= this.countsDays; i++ ){
                        tempDays.push(new Day(i,true));
                    }
                    console.log('day_generator-current', 456);
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


