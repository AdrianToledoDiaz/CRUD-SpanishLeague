import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { EntrenadoresList } from "~/components/entrenadores-list";

export default component$(() => {
  return (
    <EntrenadoresList/>
  );
});

export const head: DocumentHead = {
  title: "SpanishLeague Management",
  meta: [
    {
      name: "description",
      content: "Entrenadores La LigaEASports 2023/2024",
    },
  ],
};
