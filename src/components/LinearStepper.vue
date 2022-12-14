<script setup lang="ts">
    import { computed, provide, Ref, ref, watchEffect } from 'vue';
    import { clamp } from '../helpers';
    import { registerInjectionKey } from '../inject';

    const props = withDefaults(
        defineProps<{
            as?: string;
            steps: (Partial<any> & Pick<any, 'id'>)[];
        }>(),
        {
            as: 'div',
        }
    );

    const emit = defineEmits(['update:modelValue', 'update:completed', 'update:upcoming']);

    /**
     * When steps are mounted, they register with their parent stepper. This is
     * where we keep a reference to all the registered steps.
     */
    const stepComponents = ref<Ref[]>([]);

    /**
     * Index of the step currently being shown within the array of steps.
     */
    const current = ref(0);

    /**
     * Move to the previous step
     *
     * This function moves the stepper's internal cursor to the previous step
     * (if any), and returns the new index.
     */
    const previous = (): number =>
        (current.value = clamp(current.value - 1, 0, stepComponents.value.length - 1));

    /**
     * Indicates whether the current step is preceded by another step
     */
    const hasPrevious = computed(() => current.value > 0);

    /**
     * Move to the next step
     *
     * This function moves the stepper's internal cursor to the next step
     * (if any), and returns the new index.
     */
    const next = (): number =>
        (current.value = clamp(current.value + 1, 0, stepComponents.value.length - 1));

    /**
     * Indicates whether the current step if following by another step
     */
    const hasNext = computed(() => current.value < stepComponents.value.length - 1);

    /**
     * Move to the specified step
     *
     * This function moves the stepper's internal cursor to the specified step
     * and returns the new index.
     */
    const goTo = (step: number) =>
        (current.value = clamp(step, 0, stepComponents.value.length - 1));

    /**
     * Registers a step with the stepper
     *
     * Steps created as children of the stepper call this method to register with the stepper.
     *
     * @param step A reference to the child step component being registered
     * @param position The position of the step in the stepper (0-based index)
     */
    const register = (step: Ref): void => {
        stepComponents.value.push(step);
    };

    /**
     * Provide the `register` function to all child Step components.
     */
    provide(registerInjectionKey, register);

    provide('current', current);
    provide('steps', stepComponents);

    watchEffect(() => {
        emit('update:modelValue', props.steps[current.value]);
        emit('update:completed', props.steps.slice(0, current.value));
        emit('update:upcoming', props.steps.slice(current.value));
    });
</script>

<template>
    <component :is="as">
        <slot
            :current="current"
            :previous="previous"
            :has-previous="hasPrevious"
            :next="next"
            :has-next="hasNext"
            :go-to="goTo" />
    </component>
</template>
