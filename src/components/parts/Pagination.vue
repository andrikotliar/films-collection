<template>
    <div class="pagination">
        <div class="pages">
            <router-link :to="'/films/' + pageNum" v-for="pageNum in count" class="page-num" :key="pageNum"> {{pageNum}} </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: ['count']
    }
</script>

<style>
	.pagination {
		margin: 15px 0 30px;
		width: 100%;
	}
	.pages {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.page-num {
		font-family: Arial, sans-serif;
		font-size: 14px;
		font-weight: bold;
		width: 40px;
		height: 30px;
		text-align: center;
		color: var(--main-color);
		border: 1px solid var(--main-color);
		border-right: 0;
		background: none;
		outline: none;
		transition: .3s;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		position: relative;
		transition: .3s;
	}
	.page-num:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-shadow: 0 0 0 3px var(--main-color);
		visibility: hidden;
		opacity: 0;
		transition: .3s;
	}
	.page-num:last-child {
		border: 1px solid var(--main-color);
	}

	.page-num:hover {
		background-color: var(--main-color);
		color: #fff;
	}

	.page-num:hover:after {
		visibility: visible;
		opacity: 1;
	}

	.pages .router-link-active {
		background-color: var(--main-color);
		color: #fff;	
	}

	.pages .router-link-active:after {
		visibility: visible;
		opacity: 1;
	}
</style>