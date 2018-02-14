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
            <!--<div class="day">-->
                <!--<p></p>-->
            <!--</div>-->
            <!--<div class="day">-->
                <!--<p>efewf</p>-->
            <!--</div>-->
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
                // console.log(this.daysCalendar);
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
                // month.name = name_months[arr_months[idx] - 12];
                return this.currentMonthInfo;
            }
        },
        methods: {
            selectDay(event){
                console.log(event.target.attributes.day_num.value);
                this.daysCalendar.forEach(day => {
                    day[2] = false;
                   if ( day[0] == +event.target.attributes.day_num.value ){
                       day[2] = true;
                       console.log(day)
                    //    return;
                   }
                    

                });
                // this.daysCalendar[event.target.attributes.day_num.value - 1][2] = true;
                this.selectedForm.date =  event.target.attributes.day_num.value;
            //    return this.daysCalendar[event.target.attributes.day_num.value][2];
                this.$forceUpdate();

            }
            // infoMonth(){
                
            // }
        }
    };
    var Day = function(val, currentMonth, currentDay) {
        // Приватная функция
        var log = function(message) {
            console.log(message);
        };
        // Публичное свойство
        this.val = val;
        this.currentMonth = currentMonth;
        this.currentDay = currentDay;

        // Публичный метод
        this.logger = function(message) {
            log('Public ' + message);
        };
    };
    var getMonthIndex = new Date().getMonth()+0;
    class Month {
        constructor(index) {
            this.name = '';
            this.index = index;
            this.countsDays = 0;
            this.days = [];
            this.previousDaysMonth = [];
            this.nextDaysMonth = [];
            this.year = new Date().getFullYear();
        }
        createMonth() {
            // console.log('hello', this.index);
            //  console.log(this.index + 'индекс');
            // console.log(new Date(this.year, this.index, 0).getDate());
            // console.log(typeof new Date(this.year, this.index, 0).getDate());

            this.countsDays = new Date(this.year, this.index+1, 0).getDate();   //количество дней в текущем месяце
            console.log('counts',this.countsDays);
            console.log("days:", new Date(this.year, this.index-1, 0).getDate(), new Date(this.year, this.index, 0).getDate(), new Date(this.year, this.index+1, 0).getDate(), new Date(this.year, this.index+2, 0).getDate() )
            // не забыть проверить.если это текущий месяц, то искать текущий день
            let tempDays = [];
            var d = new Date();

            for ( let i = 1; i <= this.countsDays; i++ ){
//                let temp day = [];
                let currentDay = false;
//                console.log(d.getDate())
                let selectDay = false;
                let notEvents = false;
                if ( d.getDate() == i){
                    // console.log('dfkd');
                    currentDay = true;
                }
                tempDays.push([i,currentDay,selectDay]);
//                console.log(i, d)
            }
            // console.log('calendar-d', tempDays)
            // this.daysCalendar = tempDays;
            // console.log('hhh', this.daysCalendar);
            // this.daysCalendar = tempDays;
            //------------------------------------
            this.daysCalendar = this.determineDayOfWeekOfFirstDay(tempDays);
            // console.log('kkk', this.daysCalendar);
            return this.daysCalendar;
//            today = new Date().getDate()
        };
        infoMonth() {
            // console.log(this.index+"----index");
            let informMonth = [this.index, this.year];
           return informMonth ;
        };
        // previousDays(){
        //     var d = new Date();
        //     var n = d.getDay();

        // };


        //-------------------------------------------
        determineDayOfWeekOfFirstDay(tD){
            console.log(this.year, this.index);
            let first_day_of_the_week = new Date(this.year, this.index).getDay() - 1; //-- день недели первого дня месяца
            if(first_day_of_the_week < 0){
                first_day_of_the_week = first_day_of_the_week + 7;
            }
            let tempCountsD = new Date(this.year, this.index, 0).getDate();   //-- ко-во дней
            let lastDay_of_the_week = new Date(this.year, this.index, this.countsDays).getDay(); //-- день недели последнего дня месяца
            console.log("lastDay_of_the_week",lastDay_of_the_week);
            console.log("first_day_of_the_week",first_day_of_the_week);
            let temp = getDaysPrevMonth(first_day_of_the_week);
                function getDaysPrevMonth(firstDay) {
                    let tempDays = [];
                    // если вск === 0, то ставить до 6 дней пустых, руками
                    // for ( let l = 0; l < firstDay; l++ ){
                    for ( let l = firstDay - 1; l >= 0; l-- ){
                        let currentDay = false;
                        let selectDay = false;
                        let notEvents = true;
                        tempDays.push([tempCountsD - l, currentDay, selectDay, notEvents]);
                        // tempDays.push(['temp', currentDay, selectDay, notEvents]);
                        // console.log("tempDays[]", tempDays);
                    }
                    // console.log("tempDays", tempDays);
                    return tempDays;
                    // this.daysCalendar.splice(0, 0, tempDays);
                }
                for ( let i = 1; i <= first_day_of_the_week; i++ ){
                    // this.daysCalendar.splice(i, 0, temp[i]);
                }
                let tempLast = getDaysNextMonth(lastDay_of_the_week);
                function getDaysNextMonth(lastDay) {
                    let tempDays = [];
                    // если вск === 0, то ставить до 6 дней пустых, руками
                    for ( let l = 1; l <= 7-lastDay; l++ ){
                    // for ( let l = lastDay - 1; l >= 0; l-- ){
                        let currentDay = false;
                        let selectDay = false;
                        let notEvents = true;
                        tempDays.push([l, currentDay, selectDay, notEvents]);
                        // tempDays.push(['temp', currentDay, selectDay, notEvents]);
                        // console.log("tempDays[]", tempDays);
                    }
                    // console.log("tempDays", tempDays);
                    return tempDays;
                    // this.daysCalendar.splice(0, 0, tempDays);
                }
                // temp.forEach( f => {
                //     console.log(f);
                //     this.daysCalendar.splice(0, 0, temp);
                // })
                this.daysCalendar = temp.concat(tD, tempLast);
                // console.log('concat',this.daysCalendar);
                
           return this.daysCalendar;
        }



    }
    
    const month = new Month(getMonthIndex);
    // const month = new Month(2);
    //создать функцию получения индекса месяца
    const myMonth = month.createMonth();




















    //------------ apply,call,bind     

    
    function filter_generator(flag){ // ф-ции фильтров
        // var arr = arr;
        if (flag){
            return function() {
                // arr.sort(a,b);
                console.log('this.msg', this.arr);
            }
        } else{
            return function() {
                // arr.sort(a,b);
                console.log('this.msg', this.arr);
            }
        }

        
    }
    var ruleSortF = filter_generator(true); //flag F
    var ruleSortT = filter_generator(false); //flag T
    
    function RuleGenerator(arr, rule){
        // this.rule = form.querSelectorAll('INPUT');
        this.arr = arr;
        this.msg = 'My sort';
    
        this.sort = rule.bind(this);

        this.test = function() {
	        console.log("this sort(test)");
        }
    }

    var filter_1 = new RuleGenerator([4,5], ruleSortF);

    var filter_2 = new RuleGenerator([4,5,9], ruleSortT);
    

    var resF1 = filter_1.sort();
    var resF2 = filter_2.sort();
    filter_1.test();
    console.log(resF1);
    console.log(resF2);

</script>



<!--Return the day of the week:-->

<!--var d = new Date();-->
<!--var n = d.getDay();-->