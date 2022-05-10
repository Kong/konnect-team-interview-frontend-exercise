import { ref, Ref, onMounted } from 'vue'
import axios from 'axios'

// This composable is a simplified example for the exercise.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(): any {
  const services: Ref<any[]> = ref([])
  const loading = ref(false)

  const getServices = async (): Promise<void> => {
    // Initialize loading state
    loading.value = true

    // Fetch data from API
    const result = await axios.get('/api/service_packages')

    // Store data in Vue ref
    services.value = result.data

    // Reset loading state
    loading.value = false
  }

  // When the component mounts
  onMounted(async () => {
    // Fetch services from the API
    await getServices()
  })

  // Return stateful data
  return {
    services,
    loading,
  }
}
