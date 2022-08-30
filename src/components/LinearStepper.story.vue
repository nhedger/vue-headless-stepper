<script setup lang="ts">
    import LinearStepper from './LinearStepper.vue';
    import Step from './Step.vue';
</script>

<template>
    <Story title="Linear Stepper" :layout="{type: 'single', iframe: false}">
        <LinearStepper v-slot="{ current, previous, hasPrevious, next, hasNext }">
            <div>current step: {{ current }}</div>
            <div>has previous steps: {{ hasPrevious }}</div>
            <div>has next steps: {{ hasNext }}</div>
            <div>
                <button type="button" @click="previous" :disabled="!hasPrevious">Previous</button>
                <button type="button" @click="next" :disabled="!hasNext">Next</button>
            </div>
            <Step :position="0">
                Step 0
            </Step>
            <Step :position="1">
                Step 1
            </Step>
        </LinearStepper>
    </Story>
</template>
