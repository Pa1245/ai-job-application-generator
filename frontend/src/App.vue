<template>
  <div style="padding: 2rem; font-family: sans-serif">
    <h1>AI Resume & Cover Letter Generator</h1>

    <input type="file" @change="handleFile" />
    <br /><br />

    <textarea
      v-model="jobDescription"
      rows="6"
      cols="60"
      placeholder="Paste job description here"
    ></textarea>
    <br /><br />

    <button @click="submit">Generate</button>

    <div v-if="result" style="margin-top: 2rem">
      <h2>Tailored Resume</h2>
      <pre>{{ result.resume }}</pre>

      <h2>Cover Letter</h2>
      <pre>{{ result.cover_letter }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const file = ref(null);
const jobDescription = ref('');
const result = ref(null);

function handleFile(event) {
  file.value = event.target.files[0];
}

async function submit() {
  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('job_description', jobDescription.value);

  try {
    const response = await axios.post('http://localhost:8000/generate', formData);
    result.value = response.data;
  } catch (err) {
    console.error('Error generating documents:', err);
  }
}
</script>
