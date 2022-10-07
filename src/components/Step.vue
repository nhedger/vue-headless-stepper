<script setup lang="ts">
    import { computed, inject, Ref, ref } from 'vue';
    import { registerInjectionKey } from '../inject';

    const props = withDefaults(
        defineProps<{
            as?: string;
        }>(),
        {
            as: 'div',
        }
    );

    /**
     * A reference to the step component
     */
    const step = ref(null);

    /**
     * Inject the register method provided by the parent stepper
     */
    const register = inject(registerInjectionKey);

    /**
     * Current step of the parent stepper
     */
    const current = inject<Ref<number>>('current');

    /**
     * Reference to all the steps currently in the stepper
     */
    const steps = inject<Ref<Ref[]>>('steps');

    /**
     * Current index of the step
     */
    const index = computed<number | undefined>(() => {
        return steps?.value.indexOf(step);
    });

    /**
     * Tells whether the step is the first step in the stepper
     */
    const isFirst = computed<boolean | undefined>(() => {
        if (steps?.value !== undefined) {
            return steps.value.indexOf(step) === 0;
        }
        return undefined;
    });

    /**
     * Tells whether the step is the last step in the stepper
     */
    const isLast = computed<boolean | undefined>(() => {
        if (steps?.value !== undefined) {
            return steps.value.indexOf(step) === steps.value.length - 1;
        }
        return undefined;
    });

    /**
     * Register the step with the stepper
     */
    if (register !== undefined) {
        register(step);
    } else {
        console.error('Unable to register the step because a parent stepper is missing');
    }
</script>

<template>
    <component :is="props.as">
        <slot ref="step" :index="index" :is-first="isFirst" :is-last="isLast" />
    </component>
</template>
