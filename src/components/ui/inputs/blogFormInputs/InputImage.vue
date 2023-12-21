<template>
  <div
    @click="triggerFileInput"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="handleDrop"
    class="p-4 border border-dashed cursor-pointer bg-[#F4F3FF] rounded-xl border-[#85858D] flex justify-center items-center w-[600px] h-[180px]"
  >
    <div class="text-center flex items-center flex-col">
      <IconImageAdd class="self-center" />
      <p class="text-sm text-[#1A1A1F] mt-2">
        ჩააგდეთ ფაილი აქ ან <span class="font-bold text-[#1A1A1F] underline">აირჩიეთ ფაილი</span>
      </p>
      <input
        type="file"
        class="hidden"
        @change="handleImageChange"
        ref="fileInput"
      />
      <img :src="imageValue" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useField } from 'vee-validate'
import IconImageAdd from '@/components/icons/IconImageAdd.vue'

export default {
  name: 'InputImage',
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { value: imageValue } = useField('image')
    const isDragOver = ref(false)

    const fileInput = ref(null)
    const triggerFileInput = () => {
      fileInput.value.click()
    }
    const handleImageChange = (event) => {
      const files = event.target.files || event.dataTransfer.files
      if (files.length !== 0) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(files[0])
        fileReader.onload = (e) => {
          imageValue.value = e.target.result
        }
      }
    }
    const dragOver = (event) => {
      isDragOver.value = true
    }

    const dragLeave = (event) => {
      isDragOver.value = false
    }

    const handleDrop = (event) => {
      isDragOver.value = false
      handleImageChange(event)
    }
    return {
      imageValue,
      fileInput,
      triggerFileInput,
      handleImageChange,
      handleDrop,
      dragOver,
      dragLeave
    }
  },
  components: { IconImageAdd }
}
</script>
