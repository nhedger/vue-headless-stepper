<script setup lang="ts">
    import LinearStepper from './LinearStepper.vue';
    import Step from './Step.vue';
</script>

<template>
    <Story title="Linear Stepper" :layout="{ type: 'single', iframe: false }">
        <LinearStepper v-slot="{ current, previous, hasPrevious, next, hasNext }">
            <div>current step: {{ current }}</div>
            <div>has previous steps: {{ hasPrevious }}</div>
            <div>has next steps: {{ hasNext }}</div>
            <div>
                <button type="button" @click="previous" :disabled="!hasPrevious">Previous</button>
                <button type="button" @click="next" :disabled="!hasNext">Next</button>
            </div>
            <Step :position="0" v-slot="{ isFirst, isLast }">
                Step 0
                <div>is first: {{ isFirst }}</div>
                <div>is last: {{ isLast }}</div>
            </Step>
            <Step :position="1" v-slot="{ isFirst, isLast }">
                Step 1
                <div>is first: {{ isFirst }}</div>
                <div>is last: {{ isLast }}</div>
            </Step>
            <Step :position="2" v-slot="{ isFirst, isLast }">
                Step 2
                <div>is first: {{ isFirst }}</div>
                <div>is last: {{ isLast }}</div>
            </Step>
        </LinearStepper>
    </Story>
</template>
