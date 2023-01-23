<template>
    <div class="service-card">
        <div class="card-header">
            <div class="status-container">
                <p>{{ service.published }}</p>
            </div>
            <div class="version-badge">
                <p>
                    {{ service.versions.length }} versions
                </p>
            </div>
        </div>
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>
        <div class="card-footer">
            <div class="metrics-container">
                <p v-for="metric in service.metrics" class="metric">
                    {{ metric }}
                </p>
            </div>
            <div class="avatars-container">
                {{ service.versions.developer }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useServices from '@/composables/useServices'

export default defineComponent({
    name: 'ServiceCard',
    props: {
        service: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        // Import services from the composable
        const { services, loading } = useServices()


        return {
            services,
            loading
        }
    },
})
</script>
<style lang="scss">
.service-card {
    width: 200px;
    margin: 6px;
    border: 1px solid #999;
    border-radius: 10px;
    padding: 8px 16px;

    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>