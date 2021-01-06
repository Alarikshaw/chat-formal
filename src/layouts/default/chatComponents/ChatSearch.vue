<template>
    <div class="search">
        <div class="search-select">
            <Select
                show-search
                placeholder="搜索聊天组"
                default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                @search="handleSearch"
                >
            </Select>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import { Select } from 'ant-design-vue';
export default defineComponent({
    name: 'ChatSearch',
    components: {
        Select
    },
    setup() {
        function handleSearch() {

        }
        return {
            handleSearch
        }
    }
})
</script>
