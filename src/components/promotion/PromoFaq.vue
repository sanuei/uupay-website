<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps<{
  items: Array<{
    question: string
    answer: string
  }>
}>()

const activeIndex = ref<number | null>(null)

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="faq-item"
      :class="{ active: activeIndex === index }"
      @click="toggle(index)"
    >
      <div class="faq-question">
        <span>{{ item.question }}</span>
        <div class="faq-icon">
          <ChevronDown />
        </div>
      </div>
      <div class="faq-answer">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  margin-bottom: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.faq-item:hover {
  border-color: rgba(71, 198, 143, 0.3);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  font-weight: 600;
  color: #fff;
}

.faq-icon {
  color: var(--text-secondary);
  transition: transform 0.3s ease;
}

.faq-icon svg {
  width: 20px;
  height: 20px;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 200px;
  padding: 0 1.5rem 1.5rem;
}

.faq-answer p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}
</style>
