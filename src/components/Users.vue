<template>
<div>
    <h1>Users</h1>
    <p>Team ID: {{$route.params.teamId}}</p>
    <button @click="goHome">Go Home!</button>
</div>
</template>

<script>
export default {
    watch:{
        '$route'(to, from){
            // alert(to.params.teamId);
        }
    },
    methods:{
        goHome(){
            this.$router.push('/');
        }
    },
    created(){
        // alert(this.$route.params.teamId);
    }
}
</script>
