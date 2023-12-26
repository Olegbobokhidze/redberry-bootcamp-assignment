<template>
  <div class="flex flex-col gap-2 self-start w-full">
    <label class="font-bold text-[#1A1A1F]">{{ title }}</label>
    <input
      v-model="value"
      @input="onInput"
      :type="type || 'text'"
      :placeholder="placeholder"
      :class="inputClasses"
      @blur="wasTouched = true"
    />
    <div v-if="showValidationMessage" class="flex gap-2">
      <IconError />
      <p class="text-red-500">{{ validationMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import IconError from '@/components/icons/IconError.vue'
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'

const props = defineProps(['name', 'type', 'title', 'placeholder'])

const { value } = useField(props.name)
const wasTouched = ref(false)

const onInput = (event) => {
  value.value = event.target.value
}

const endsWithRedberryRule = computed(() => {
  return value.value ? value.value.endsWith('@redberry.ge') : true
})

const validationMessage = computed(() => {
  return endsWithRedberryRule.value ? '' : 'უნდა მთავრდებოდეს @redberry.ge'
})

const inputClasses = computed(() => [
  'rounded-xl w-full h-[44px] border px-4 py-2 text-[#1A1A1F] outline-none focus:border-purple-500',
  {
    'border-gray-300': !wasTouched.value && endsWithRedberryRule.value,
    'border-red-500 focus:border-purple-500 bg-[#F7F7FF]':
      wasTouched.value && !endsWithRedberryRule.value,
    'border-red-500 bg-[#FAF2F3]': !wasTouched.value && !endsWithRedberryRule.value
  }
])

const showValidationMessage = computed(() => wasTouched.value && !endsWithRedberryRule.value)
</script>
