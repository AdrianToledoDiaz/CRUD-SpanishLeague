import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
    return (
        <header class="py-8 text-center">
        <h1 class="text-4xl font-bold text-indigo-950">
        SpanishLeague Management
        </h1>
        <h2 class="text-3xl text-indiigo-500">
            Entrenadores La LigaEASports 2023/2024
        </h2>
        </header>
    )
});