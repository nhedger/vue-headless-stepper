# Vue 3 Headless Stepper

This library provides a _headless_ component for Vue 3.

## Installation

Run any of the following commands to add the dependency to your project.

```bash
# npm
npm install @hedger/vue-headless-stepper

# pnpm
pnpm add @hedger/vue-headless-stepper

# yarn
yarn add @hedger/vue-headless-stepper
```

## Usage

Create a `LinearStepper` component with some `Step` components as children.

`Step` components are only displayed when the stepper's `current` step matches the `position`.

```html
<template>
    <LinearStepper v-slot="{current, previous, hasPrevious, next, hasNext}">
        <Step :position="0">
            Anything here will only appear if the current step is 0
        </Step>
        <Step :position="1">
            Anything here will only appear if the current step is 1
        </Step>
    </LinearStepper>
</template>
```

### Accessing the current step

The `LinearStepper` component exposes a `current` slot property that contains
the current index of the stepper.

```html
<LinearStepper v-slot="{current}">
    The current step is: {{ current }}
</LinearStepper>
```

### Navigating between steps

The `LinearStepper` components exposes the `previous`, `next` and `goTo` slot
properties. These are function that you may call to go to another step.

```html
<LinearStepper v-slot="{previous, next, goTo}">
    <button @click="previous">Previous</button>
    <button @click="next">Next</button>
</LinearStepper>
```

### Check for surrounding steps

The `LinearStepper` components exposes the `hasPrevious` and `hasNext` slot
properties to check whether previous or next steps are available from the
current position.

```html
<LinearStepper v-slot="{hasPrevious, previous, hasNext, next}">
    <button @click="previous" :disabled="!hasPrevious">Previous</button>
    <button @click="next" :disabled="!hasNext">Next</button>
</LinearStepper>
```
