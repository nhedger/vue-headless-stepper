<script setup lang="ts">
    import { ref } from 'vue';
    import LinearStepper from './LinearStepper.vue';
    import Step from './Step.vue';

    const steps = [{ id: 'first' }, { id: 'second' }, { id: 'third' }];

    const current = ref(null);
    const upcoming = ref([]);
    const completed = ref([]);
</script>

<template>
    <Story title="Linear Stepper" :layout="{ type: 'single', iframe: false }">
        <div>completed: {{ completed }}</div>
        <div>current: {{ current }}</div>
        <div>upcoming: {{ upcoming }}</div>

        <LinearStepper
            :steps="steps"
            v-model="current"
            v-model:completed="completed"
            v-model:upcoming="upcoming"
            v-slot="{ current, previous, hasPrevious, next, hasNext }">
            <div>current step: {{ current }}</div>
            <div>has previous steps: {{ hasPrevious }}</div>
            <div>has next steps: {{ hasNext }}</div>
            <div>
                <button type="button" @click="previous" :disabled="!hasPrevious">Previous</button>
                <button type="button" @click="next" :disabled="!hasNext">Next</button>
            </div>
            <Step v-show="current === 0" v-slot="{ isFirst, isLast }">
                Step 0
                <div>is first: {{ isFirst }}</div>
                <div>is last: {{ isLast }}</div>
            </Step>
            <Step v-show="current === 1" v-slot="{ isFirst, isLast }">
                Step 1
                <div>is first: {{ isFirst }}</div>
                <div>is last: {{ isLast }}</div>
            </Step>
            <Step v-show="current === 2" v-slot="{ isFirst, isLast }">
                Step 2
                <div>is first: {{ isFirst }}</div>
                <div>is last: {{ isLast }}</div>
            </Step>
        </LinearStepper>
    </Story>
</template>
