import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
    return (
        <footer class="bottom-4 w-full text-center" style="margin-top: 260px; background-color: black" >
            &copy; © 2024 SpanishLeague Management. Todos los derechos reservados. Este material no puede ser reproducido, distribuido, transmitido, exhibido o publicado sin el permiso expreso por escrito del titular de los derechos de autor.
        </footer>
    )
});