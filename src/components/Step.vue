<script setup lang="ts">
    import { computed, inject, onMounted, Ref, ref } from 'vue';
    import { registerInjectionKey } from '../inject';

    const props = defineProps<{
        position: number;
    }>();

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
     * Tells whether the step is the first step in the stepper
     */
    const isFirst = computed<boolean | undefined>(() => {
        if (current?.value !== undefined && steps?.value !== undefined) {
            return props.position === 0;
        }

        return undefined;
    });

    /**
     * Tells whether the step is the last step in the stepper
     */
    const isLast = computed<boolean | undefined>(() => {
        if (current?.value !== undefined && steps?.value !== undefined) {
            return props.position === steps.value.length - 1;
        }

        return undefined;
    });

    /**
     * A reference to the step component
     */
    const step = ref(null);

    /**
     * When the step is mounted, register it with the stepper
     */
    onMounted(() => {
        if (register === undefined) {
            console.error('Unable to register the step because a parent stepper is missing');
            return;
        }

        register(step, props.position);
    });
</script>

<template>
    <slot v-if="current === props.position" ref="step" :position="props.position" :is-first="isFirst" :is-last="isLast" />
</template>
