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
                <p v-bind:class="{'day-current': day[1], 'day-selected': day[2], 'day-no-events': day[3]}" :day_num=day[0]>{{ day[0] }}</p>
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
                this.currentMonthInfo.first = month.determineDayOfWeekOfFirstDay();
                return this.currentMonthInfo;
            }
        },
        methods: {
            selectDay(event){
                this.daysCalendar.forEach(day => {
                    day[2] = false;
                   if ( day[0] == +event.target.attributes.day_num.value ){
                       day[2] = true;
                   }
                });
                this.selectedForm.date =  event.target.attributes.day_num.value;
                this.$forceUpdate();

            }
        }
    };
    // var Day = function(val, currentMonth, currentDay) {
    //     // Приватная функция
    //     var log = function(message) {
    //         console.log(message);
    //     };
    //     // Публичное свойство
    //     this.val = val;
    //     this.currentDay = this.currentDay;
    //     this.currentMonth = currentMonth;
    //     this.selectDay = selectDay;
    //     this.currentDay = currentDay;
    //     this.notEvents = notEvents;

    //     // Публичный метод
    //     this.logger = function(message) {
    //         log('Public ' + message);
    //     };
    // };
    class Day{
        constructor(index, rule) {
        //     this.val = val;
        //     this.currentDay = this.currentDay;
        //    // this.currentMonth = currentMonth; // не забыть проверить.если это текущий месяц, то искать текущий день
        //     this.selectDay = selectDay;
        //     this.notEvents = notEvents;
            // this.rule = rule;
            this.rule = rule;
        }
        day_generator(){
            if (this.rule == "prev") {
            return function() {
                // arr.sort(a,b);
                console.log('this.msg', this.msg);
            }
            } else if (this.rule == "next") {
                return function() {
                // arr.sort(a,b);
                    console.log('this.msg', this.msg);
                }
            } else {
                return function() {
                // arr.sort(a,b);
                    console.log('this.msg', this.msg);
                }
            }
        }
    }
    var getMonthIndex = new Date().getMonth()+0;
    var prevMonthT = new Day(getMonthIndex, 'prev').day_generator();
    
    class Month {
        constructor(index, rule) {
            this.name = '';
            this.index = index;
            this.countsDays = 0;
            this.days = [];
            this.previousDaysMonth = [];
            this.nextDaysMonth = [];
            this.year = new Date().getFullYear();
            this.msg = 'ура ура урара';
            // this.rule = rule;
            this.createDays = rule.bind(this);
            
        }
        
        createMonth() {
            this.countsDays = new Date(this.year, this.index+1, 0).getDate();   //количество дней в текущем месяце
            
            let tempDays = [];
            var cerrentNumbMonth = new Date().getDate() ;

            for ( let i = 1; i <= this.countsDays; i++ ){
                let currentDay = false;
                let selectDay = false;
                let notEvents = false;
                if ( cerrentNumbMonth == i){
                    currentDay = true;
                }
                tempDays.push([i,currentDay,selectDay]);
            }
            //------------------------------------
            this.daysCalendar = this.determineDayOfWeekOfFirstDay(tempDays);
            return this.daysCalendar;
        };
        infoMonth() {
            let informMonth = [this.index, this.year];
           return informMonth ;
        };


        //-------------------------------------------
        determineDayOfWeekOfFirstDay(tD){
            console.log(this.year, this.index);
            let first_day_of_the_week = new Date(this.year, this.index).getDay() - 1; //-- день недели первого дня месяца
            if(first_day_of_the_week < 0){ //-- проверка если вск
                first_day_of_the_week = first_day_of_the_week + 7;
            }
            let tempCountsD = new Date(this.year, this.index, 0).getDate();   //-- ко-во дней
            let lastDay_of_the_week = new Date(this.year, this.index, this.countsDays).getDay(); //-- день недели последнего дня месяца
            console.log("lastDay_of_the_week",lastDay_of_the_week);
            console.log("first_day_of_the_week",first_day_of_the_week);
            let temp = getDaysPrevMonth(first_day_of_the_week);
                function getDaysPrevMonth(firstDay) {
                    let tempDays = [];
                    for ( let l = firstDay - 1; l >= 0; l-- ){
                        let currentDay = false;
                        let selectDay = false;
                        let notEvents = true;
                        tempDays.push([tempCountsD - l, currentDay, selectDay, notEvents]);
                    }
                    return tempDays;
                }
                let tempLast = getDaysNextMonth(lastDay_of_the_week);
                function getDaysNextMonth(lastDay) {
                    let tempDays = [];
                    for ( let l = 1; l <= 7-lastDay; l++ ){
                        let currentDay = false;
                        let selectDay = false;
                        let notEvents = true;
                        tempDays.push([l, currentDay, selectDay, notEvents]);
                    }
                    return tempDays;
                }
                this.daysCalendar = temp.concat(tD, tempLast);
                
           return this.daysCalendar;
        }
        



    }
    
    const month = new Month(getMonthIndex, prevMonthT);
    // const month = new Month(2);
    //создать функцию получения индекса месяца
    const myMonth = month.createMonth();
                month.createDays();



















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