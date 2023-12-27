<template>
  <div
    v-if="imageFile"
    class="bg-[#E4E3EB] w-[600px] h-[56px] border rounded-xl flex items-center justify-between p-4"
  >
    <div class="flex gap-3 items-center justify-center">
      <IconImageAdded />
      <p>{{ imageFile.name }}</p>
    </div>
    <div
      @click="deleteImg"
      class="cursor-pointer flex items-center justify-center hover:bg-[#F5F4F9] rounded-[50%] w-[40px] h-[40px]"
    >
      <IconRemove />
    </div>
  </div>
  <div
    v-else
    @click="triggerFileInput"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="handleDrop"
    :class="[
      'p-4 border border-dashed  cursor-pointer bg-[#F4F3FF] rounded-xl border-[#85858D] flex justify-center items-center w-[600px] h-[180px]'
    ]"
  >
    <div class="text-center flex items-center flex-col">
      <IconImageAdd class="self-center" />
      <p class="text-sm text-[#1A1A1F] mt-2">
        ჩააგდეთ ფაილი აქ ან <span class="font-bold text-[#1A1A1F] underline">აირჩიეთ ფაილი</span>
      </p>
      <input type="file" class="hidden" @change="handleImageChange" ref="fileInput" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useField } from 'vee-validate'
import IconImageAdd from '@/components/icons/IconImageAdd.vue'
import IconImageAdded from '@/components/icons/IconImageAdded.vue'
import IconRemove from '@/components/icons/IconRemove.vue'

export default {
  name: 'InputImage',
  props: {
    name: String
  },
  setup(props) {
    const { value: imageFile, setValue } = useField(props.name)
    const isDragOver = ref(false)

    onMounted(() => {
      const storedData = localStorage.getItem('blogFormData')
      if (storedData) {
        const formData = JSON.parse(storedData)
        const image = formData.image
        if (image !== undefined) {
          setValue(image)
        }
      }
    })

    const fileInput = ref(null)

    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleImageChange = (event) => {
      const files = event.target.files || event.dataTransfer.files
      if (files.length !== 0) {
        const selectedFile = files[0]
        imageFile.value = selectedFile
      }
    }

    const dragOver = () => {
      isDragOver.value = true
    }

    const dragLeave = () => {
      isDragOver.value = false
    }

    const handleDrop = (event) => {
      isDragOver.value = false
      handleImageChange(event)
    }

    const deleteImg = () => {
      imageFile.value = null
    }

    return {
      imageFile,
      fileInput,
      triggerFileInput,
      handleImageChange,
      handleDrop,
      dragOver,
      deleteImg,
      dragLeave
    }
  },
  components: { IconImageAdd, IconImageAdded, IconRemove }
}
</script>
