import { InjectionKey, Ref } from "vue";

export const registerInjectionKey = Symbol() as InjectionKey<(step: Ref, position: number) => void>;
