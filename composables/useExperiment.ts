/** Assign a visitor consistently to an experiment variant without collecting identity. */
export function useExperiment(name: string, variants: string[] = ['control', 'challenger']) {
  const variant = useState(`experiment:${name}`, () => variants[0] || 'control')

  if (import.meta.client) onMounted(() => {
    const key = `northstar_experiment_${name}`
    let assigned = localStorage.getItem(key)
    if (!assigned || !variants.includes(assigned)) {
      assigned = variants[Math.floor(Math.random() * variants.length)] || 'control'
      localStorage.setItem(key, assigned)
    }
    variant.value = assigned
  })

  return readonly(variant)
}
