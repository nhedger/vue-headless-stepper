<script setup lang="ts">
    import { inject, onMounted, Ref, ref } from 'vue';
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
    <slot v-if="current === props.position" ref="step" />
</template>
