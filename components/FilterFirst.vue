<template>
    <div class="list">
        <div class="list_button">
            <button v-on:click="sortLtoG" >По возрастанию</button>
        </div>


        <div class="item" v-for="i in selectedSortLtoG">
            <p>{{ i }}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data: () => ({
            text: 'Hello from Vue',
            arr: [ 24, 1, 83, 5, 9],
            sort_arr: []
        }),
        computed: {
            selectedSortLtoG() {
                return this.arr;
            }
        },
        watch: {

        },
//        mounted: function(){
//            this.sortLtoG();
//        },
        methods: {
            sortLtoG() {
                let temp_arr = this.arr;
//                this.sort_arr = temp_arr.sort();


//                const result = this.quickSort(temp_arr, 0, temp_arr.length - 1);
                this.arr = this.quickSort(temp_arr, 0, temp_arr.length - 1);
                console.dir(this.arr)

            },
           quickSort(items, left, right) {
                let index;
                if (items.length > 1) {
                    index = this.partition(items, left, right);
                if (left < index - 1) {
                    this.quickSort(items, left, index - 1);
                }
                if (index < right) {
                    this.quickSort(items, index, right);
                }
                }
                return items;
           },
            partition(items, left, right) {
                var pivot   = items[Math.floor((right + left) / 2)],
                    i       = left,
                    j       = right;

                while (i <= j) {
                    while (items[i] < pivot) {
                        i++;
                    }
                    while (items[j] > pivot) {
                        j--;
                    }
                    if (i <= j) {
                        this.swap(items, i, j);
                        i++;
                        j--;
                    }
                }
                return i;
            },
            swap(items, firstIndex, secondIndex){
                const temp = items[firstIndex];
                items[firstIndex] = items[secondIndex];
                items[secondIndex] = temp;
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
        display: inline-flex;
        margin-right: 10px;
    }
    .item p{
        color: darkorange;
        display: block;
        margin: auto;
    }
    .list_button{
        width: 100%;
        margin-bottom: 50px;
    }
    .list button{
        width: 150px;
        height: 50px;
        color: white;
        background: firebrick;
        border: none;

    }
</style>

