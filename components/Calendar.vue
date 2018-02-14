<template>
    <div class="calendar">
        <div class="calendar__head">
            <p>prev</p>
            <p>{{ currentMonth.name }}, {{ currentMonth.year }}</p>
            <p>next</p>
        </div>
        <div class="calendar__body">
            <div>
                <div class="day">
                    <p>Пн</p>
                </div>
                <div class="day">
                    <p>Вт</p>
                </div>
                <div class="day">
                    <p>Ср</p>
                </div>
                <div class="day">
                    <p>Чт</p>
                </div>
                <div class="day">
                    <p>Пт</p>
                </div>
                <div class="day">
                    <p>Сб</p>
                </div>
                <div class="day">
                    <p>Вск</p>
                </div>
            </div>
            <div class="day" v-for="day in refreshMonth" v-on:click="selectDay">
                <p v-bind:class="{'day-current': day.currentDay, 'day-selected': day.selected, 'day-no-events': day.notEvents}" :day_num=day.val>{{ day.val }}</p>
            </div>
            <div v-if='selectedForm.date > 0' class="calendar__date">
                <p>{{ selectedForm.date }}, {{ currentMonth.name }}, {{ currentMonth.year }}</p>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
const name_months = [
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
];
const daysOfTheWeek = [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'суб',
    'вс'
];
    export default {
        data: () => ({
            daysCalendar: [],
            selectedForm: [],
            currentMonthInfo: {}
        }),
        computed: {
            refreshMonth: function () {
                this.daysCalendar = month.createMonth();
                return this.daysCalendar;
            },
            currentDay: function () {
               this.selectDay();
                return this.daysCalendar;
            },
            currentMonth: function() {
                this.currentMonthInfo.index = month.infoMonth()[0];
                this.currentMonthInfo.year = month.infoMonth()[1];
                this.currentMonthInfo.name = name_months[this.currentMonthInfo.index];
                return this.currentMonthInfo;
            }
        },
        methods: {
            selectDay(event){
                this.daysCalendar.forEach(day => {
                    day.selected = false;
                   if ( day.val == +event.target.attributes.day_num.value ){
                       day.selected = true;
                   }
                });
                this.selectedForm.date =  event.target.attributes.day_num.value;
                this.$forceUpdate();

            }
        }
    };
    var cerrentNumbMonth = new Date().getDate();
    class Day{
        constructor(val, currentMonth) {
            this.val = val;
            this.selected = false;
            this.notEvents = !currentMonth;
            if(currentMonth){
                if ( cerrentNumbMonth == val){
                    this.currentDay = true;
                }
            } else {
                this.currentDay = false;
            }
        }
        day_create(currentMonth){
            return this;
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
                    return tempDays;
                }
        }
    }
    var getMonthIndex = new Date().getMonth() + 0;
    var prevMonthT = day_generator('prev');
    var nextMonthT = day_generator('next');
    var curMonthT = day_generator('current');
    
    class Month {
        constructor(index, rule) {
            this.index = index;
            this.year = new Date().getFullYear();
            this.countsDays = new Date(this.year, this.index+1, 0).getDate(); //количество дней в текущем месяце
            this.first_day_of_the_week = new Date(this.year, this.index).getDay() - 1; //-- день недели первого дня месяца
            this.last_day_of_the_week = new Date(this.year, this.index, this.countsDays).getDay(); //-- день недели последнего дня месяца
            if(this.first_day_of_the_week < 0){ //-- проверка если вск
                this.first_day_of_the_week = this.first_day_of_the_week + 7;
            }
            this.createDays = rule.bind(this);
            
        }
        
        createMonth() {
            var month_prev_days = monthPrevDay.createDays();
            var month_next_days = monthNextDay.createDays();
            var month_days = month.createDays();  
            this.daysCalendar =  month_prev_days.concat(month_days, month_next_days);
            return this.daysCalendar;
        };
        infoMonth() {
            let informMonth = [this.index, this.year];
           return informMonth;
        };
    }
    
    const monthPrevDay = new Month(getMonthIndex, prevMonthT);
    const monthNextDay = new Month(getMonthIndex, nextMonthT);
    const month = new Month(getMonthIndex, curMonthT);
    const myMonth = month.createMonth();
                



















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



<!--Return the day of the week:-->

<!--var d = new Date();-->
<!--var n = d.getDay();-->