<template>
    <div class="list">
        <div class="list_button">
            <input v-model="search"/>
            <button v-on:click="sortLtoG" class="red">По возрастанию</button>
            <button v-on:click="sortGtoL" class="green">По убыанию</button>
        </div>


        <div class="item" v-for="i in searchName">
            <p>{{ i.number_f }}</p>
            <p>{{ i.title }}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data: () => ({
            text: 'Hello from Vue',
            search: '',
            arr: [
                {
                    title: "text",
                    number_f: 24
                },
                {
                    title: "name",
                    number_f: 6
                },
                {
                    title: "name text",
                    number_f: 1
                },
                {
                    title: "text",
                    number_f: 5
                },
                {
                    title: "name",
                    number_f: 83
                },
                {
                    title: "text",
                    number_f: 7
                },
                {
                    title: "text name",
                    number_f: 9
                }
            ],
            sort_arr: []
        }),
        computed: {
//            selectedSortLtoG() {
//                return this.arr;
//            },
            searchName() {
                return this.arr.filter(post => {
                    console.log(post)
                    return post.title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
//        watch: {
//
//        },
//        mounted: function(){
//            this.sortLtoG();
//        },
        methods: {

//            addTempArray(){
//                this.sort_arr = this.arr;
//            },
//            searchName() {
//                console.log('67677')
//            },
            sortLtoG() {
                let temp_arr = this.arr;
                this.arr = this.quickSort(temp_arr, 0, temp_arr.length - 1, true);
//                console.dir(this.arr)
            },
            sortGtoL() {
                let temp_arr = this.arr;
                this.arr = this.quickSort(temp_arr, 0, temp_arr.length - 1, false);
//                console.dir(this.arr)
            },
            quickSort(items, left, right, val_sort) {
                let index;
//                console.dir(items);
                if (items.length > 1) {
                    index = this.partition(items, left, right, val_sort);
                    if (left < index - 1) {
                        this.quickSort(items, left, index - 1, val_sort);
                    }
                    if (index < right) {
                        this.quickSort(items, index, right, val_sort);
                    }
                }
                return items;
            },
            partition(items, left, right, val_sort) {
                let pivot   = items[Math.floor((right + left) / 2)],
                    i       = left,
                    j       = right;

                if ( val_sort ) {
                    while (i <= j) {
                        while (items[i].number_f < pivot.number_f) {
                            i++;
                        }
                        while (items[j].number_f > pivot.number_f) {
                            j--;
                        }
                        if (i <= j) {
                            this.swap(items, i, j);
                            i++;
                            j--;
                        }
                    }
//                }
                } else {
                    while (i <= j) {
                        while (items[i].number_f > pivot.number_f) {
                            i++;
                        }
                        while (items[j].number_f < pivot.number_f) {
                            j--;
                        }
                        if (i <= j) {
                            this.swap(items, i, j);
                            i++;
                            j--;
                        }
                    }
                }


                return i;
            },
            swap(items, firstIndex, secondIndex){
                const temp = items[firstIndex].number_f;
                items[firstIndex].number_f = items[secondIndex].number_f;
                items[secondIndex].number_f = temp;
            }
        },

    }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list{
        width: 100%;
        padding: 200px 0;
    }
    .item{
        width: 100px;
        height: 100px;
        border: none;
        background: slateblue;
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .item p{
        /*color: darkorange;*/
        color: #ffffff;
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

