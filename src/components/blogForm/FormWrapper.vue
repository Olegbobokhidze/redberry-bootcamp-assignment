<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import InputAuthor from '../ui/inputs/blogFormInputs/InputAuthor.vue'
import InputTitle from '../ui/inputs/blogFormInputs/InputTitle.vue'
import InputDescription from '../ui/inputs/blogFormInputs/InputDescription.vue'
import InputDate from '../ui/inputs/blogFormInputs/InputDate.vue'
import InputCategory from '../ui/inputs/blogFormInputs/InputCategory.vue'
import InputEmail from '../ui/inputs/blogFormInputs/InputEmail.vue'
import InputImage from '../ui/inputs/blogFormInputs/InputImage.vue'
const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().email().nonempty().endsWith('@redberry.ge'),
    description: zod.string().min(4).nonempty(),
    title: zod.string().min(4).nonempty(),
    author: zod
      .string()
      .min(4, { message: 'მინიმუმ 4 სიმბოლო' })
      .nonempty()
      .refine(
        (value) => {
          const words = value.trim().split(' ')
          return words.length === 2
        },
        {
          message: 'მინიმუმ 2 სიტყვა'
        }
      ),
    date: zod.any(),
    category: zod.any(),
    image: zod.any()
  })
)
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema
})
const [email, emailProps] = defineField('email')
const [description, descriptionProps] = defineField('description')
const [title, titleProps] = defineField('title')
const [author, authorProps] = defineField('author')
const [date, dateProps] = defineField('date')
const [image, imageProps] = defineField('image')
const [category, categoryProps] = defineField('category')
const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form>
    <div class="text-black flex gap-6 flex-col justify-center items-center w-[600px]">
      <h1 class="text-[32px] self-start text-[#1A1A1F] font-bold">ბლოგის დამატება</h1>
      <InputImage name="image" />
      <div class="flex gap-6">
        <InputAuthor name="author" type="author" title="* ავტორი" placeholder="შეიყვანეთ ავტორი" />
        <InputTitle name="title" type="title" title="* სათაური" placeholder="შეიყვანეთ სათაური" />
      </div>
      <InputDescription
        name="description"
        type="description"
        title="* აღწერა"
        placeholder="შეიყვანეთ აღწერა"
      />
      <div class="flex gap-6">
        <InputDate name="date" type="date" title="* თარიღი" placeholder="შეიყვანეთ თარიღი" />
        <InputCategory
          name="category"
          type="category"
          title="* კატეგორია"
          placeholder="შეიყვანეთ კატეგორია"
        />
      </div>
      <InputEmail name="email" type="email" title="* ელ-ფოსტა" placeholder="Example@redberry.ge" />
      <button
        type="button"
        @click="onSubmit"
        class="enabled:bg-[#5D37F3] disabled:bg-[#E4E3EB] self-end mt-[40px] w-[288px] text-white mb-[237px] h-[40px] rounded-lg"
      >
        გამოქვეყნება
      </button>
    </div>
  </form>
</template>
