<template>
    <footer>
        <div>
            <span>© {{ fecha }} Loan Project. All rights reserved.</span>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            fecha: new Date().getFullYear(),
        };
    },
};
</script>

<style scoped>

footer{
  padding: 20px;
  text-align: center;
  background-color: #ACD9B2;
}

</style>
