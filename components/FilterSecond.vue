<template>
    <div class="list2">
        <!--<div class="list__filter">-->
            <!--<ul>-->
                <!--<li v-for="(item, index)  in categories">-->

                    <!--<label class="list__filter__label"    >-->
                        <!--<input class="list__filter__checkbox" :data-idx=index checked="checked" type="checkbox">-->
                        <!--<span class="list__filter__checkbox-span">{{ item  }}</span>-->
                    <!--</label>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<div class="list_button">-->
            <!--<input v-model="search" placeholder="Search title.."/>-->
            <!--<button v-on:click="sortLtoG" class="red">По возрастанию</button>-->
            <!--<button v-on:click="sortGtoL" class="green">По убыанию</button>-->
        <!--</div>-->


        <div class="item2" v-for="i in arr">
            <p>{{ i.number_f  | sortBig }}</p>
            <p>{{ i.title }}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data: () => ({
            text: 'Hello from Vue',
            search: '',
            categories: [
                'vue',
                'react',
            ],
            arr: [
                {
                    title: "text",
                    number_f: 24,
                    category: 'vue'
                },
                {
                    title: "name",
                    number_f: 6,
                    category: 'vue'
                },
                {
                    title: "name text",
                    number_f: 1,
                    category: 'react'
                },
                {
                    title: "text",
                    number_f: 5,
                    category: 'vue'
                },
                {
                    title: "name",
                    number_f: 83,
                    category: 'react'
                },
                {
                    title: "text",
                    number_f: 7,
                    category: 'react'
                },
                {
                    title: "text name",
                    number_f: 9,
                    category: 'vue'
                }
            ],
            sort_arr: []
        }),
        filters: {
            sortBig: function (value) {
                if ( value > 5) return '';
                value = value + 100;
                return value;
            }
        },
        computed: {

        },
//        watch: {
//
//        },
//        mounted: function(){
//            this.sortLtoG();
//        },
        methods: {

        },

    }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list2{
        width: 80%;
        padding: 200px 0;
        margin: auto;
        background: lightskyblue;
    }
    .item2{
        width: 100px;
        height: 100px;
        border: none;
        background: steelblue;
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
        vertical-align: top;
    }
    .item2 p{
        /*color: darkorange;*/
        color: lightyellow;
        /*display: block;*/
        margin: 10px auto;
        text-align: center;
        width: 100%;
        font-weight: bold;
    }
    .list_button{
        width: 100%;
        margin-bottom: 50px;
    }
    .list .red{
        width: 150px;
        height: 50px;
        color: white;
        background: firebrick;
        border: none;

    }
    .list .green{
        width: 150px;
        height: 50px;
        color: white;
        background: lightcoral;
        border: none;
    }
</style>

