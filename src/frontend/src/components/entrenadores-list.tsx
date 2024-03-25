import { component$, useStore, useTask$, useVisibleTask$, $, useSignal } from '@builder.io/qwik';
import { Entrenador } from '~/models/entrenador';
import { addEntrenador, deleteEntrenador, getEntrenadores, getEspana, getExtranjeros, getNacidos1970, updateEntrenador } from '~/utils/entrenadores-provider';

export const EntrenadoresList = component$(() => {

    const store = useStore<{ Entrenadores: Entrenador[] }>({
        Entrenadores: []
    })

    const form = useStore({
        Id: '',
        NomEntrenador: '',
        Pais: '',
        FechaNacimiento: '',
        Equipo: '',

    })

    const addOrModify = useSignal("Añadir")

    const oldId = useSignal("")

    const EntrenadoresBy = useSignal("Todos")

    useTask$(async () => {
        console.log("Desde useTask")

    })

    useVisibleTask$(async () => {
        console.log("Desde useVisibleTask")
        store.Entrenadores = await getEntrenadores()
    })

    const handleSubmit = $(async (event) => {
        event.preventDefault() // evita el comportamiento por defecto
        if (addOrModify.value === 'Añadir') {
            await addEntrenador(form)
        } else {
            await updateEntrenador(oldId.value, form)
            addOrModify.value = "Añadir"
        }
    })

    const handleInputChange = $((event: any) => {
        const target = event.target as HTMLInputElement
        form[target.name] = target.value
    })


    const copyForm = $((Entrenador: Entrenador) => {
        form.Id = Entrenador.Id
        form.NomEntrenador = Entrenador.NomEntrenador
        form.Pais = Entrenador.Pais
        form.FechaNacimiento = Entrenador.FechaNacimiento
        form.Equipo = Entrenador.Equipo
    })

    const cleanForm = $(() => {
        form.Id = ""
        form.NomEntrenador = ""
        form.Pais = ""
        form.FechaNacimiento = ""
        form.Equipo = ""
    })

    const handleDeleteEntrenador = $(async (Id: string) => {
        await deleteEntrenador(Id)
        store.Entrenadores = await getEntrenadores()
    })

    return (
        <div id='main' class="flex w-full justify-center">
            <div>
                <div class="px-6 py-4 bg-teal-200 rounded-xl">
                    <table class="border-separate border-spacing-2">
                        <thead>
                            <tr>
                                <th class="title">Identificador</th>
                                <th class="title">Nombre</th>
                                <th class="title">País</th>
                                <th class="title">Fecha nacimiento</th>
                                <th class="title">Equipo</th>
                                <th class="title" colSpan={2}>Editar</th>

                            </tr>
                        </thead>
                        <tbody>

                            {store.Entrenadores.map((Entrenador) => (
                                <tr key={Entrenador.Id}>
                                    <td>{Entrenador.Id}</td>
                                    <td>{Entrenador.NomEntrenador}</td>
                                    <td>{Entrenador.Pais}</td>
                                    <td>{Entrenador.FechaNacimiento}</td>
                                    <td>{Entrenador.Equipo}</td>
                                    <td>
                                        <button id='borrar'
                                            class=" bg-red-500"
                                            onClick$={() => handleDeleteEntrenador(Entrenador.Id)}>
                                            <i class="fa-solid fa-trash"></i>
                                            Borrar
                                        </button>
                                    </td>
                                    <td>
                                        <button id='modificar'
                                            class=" bg-orange-500 "
                                            onClick$={() => {
                                                addOrModify.value = 'Modificar';
                                                oldId.value = Entrenador.Id;
                                                copyForm(Entrenador);
                                            }}>
                                            <i class="fa-solid fa-pencil"></i>
                                            Modificar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr></tr>
                            <tr>
                                <form onSubmit$={handleSubmit}>
                                    <td>
                                        <input
                                            name='Id'
                                            type="number"
                                            value={form.Id}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                        <input
                                            name='NomEntrenador'
                                            type="text"
                                            value={form.NomEntrenador}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                        <input
                                            name='Pais'
                                            type="text"
                                            value={form.Pais}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                        <input
                                            name='FechaNacimiento'
                                            type="date"
                                            value={form.FechaNacimiento}
                                            onInput$={handleInputChange} />
                                    </td>
                                    <td>
                                        <select
                                            name='Equipo'
                                            value={form.Equipo}
                                            onInput$={handleInputChange}>
                                            <option value="">Seleccionar equipo</option>
                                            <option value="Real Madrid CF">Real Madrid CF</option>
                                            <option value="Athletic Club de Bilbao">Athletic Club de Bilbao</option>
                                            <option value="FC Barcelona">FC Barcelona</option>
                                            <option value="Atlético de Madrid">Atlético de Madrid</option>
                                            <option value="Girona FC">Girona FC</option>
                                            <option value="Deportivo Alaves">Deportivo Alaves</option>
                                            <option value="UD Almería">UD Almería</option>
                                            <option value="Real Betis Balompié">Real Betis Balompie</option>
                                            <option value="Cádiz CF">Cádiz CF</option>
                                            <option value="RC Celta de Vigo">RC Celta de Vigo</option>
                                            <option value="Getafe CF">Getafe CF</option>
                                            <option value="Granada CF">Granada CF</option>
                                            <option value="RCD Mallorca">RCD Mallorca</option>
                                            <option value="CA Osasuna">CA Osasuna</option>
                                            <option value="Rayo Vallecano">Rayo Vallecano</option>
                                            <option value="Real Sociedad">Real Sociedad</option>
                                            <option value="Sevilla FC">Sevilla FC</option>
                                            <option value="UD Las Palmas">UD Las Palmas</option>
                                            <option value="Valencia CF">Valencia CF</option>
                                            <option value="Villarreal CF">Villarreal CF</option>

                                        </select>
                                    </td>
                                    <td>
                                        <button id="aceptar"
                                            class="  bg-green-500"
                                            type='submit'>
                                            <i class="fa-solid fa-check"></i>
                                            Aceptar
                                        </button>
                                    </td>
                                    <td>
                                        <span id='cancelar'
                                            class="button bg-red-500"
                                            style={`visibility: ${addOrModify.value === 'Añadir' ? 'hidden' : 'visible'}`}
                                            onClick$={() => { addOrModify.value = "Añadir"; cleanForm(); }}>
                                            <i class="fa-solid fa-x"></i>
                                            Cancelar
                                        </span>
                                    </td>
                                </form>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button
                    class={EntrenadoresBy.value === 'Todos' ? 'button-age-highlighted' : 'button-age'}
                    onClick$={
                        async () => { EntrenadoresBy.value = 'Todos'; store.Entrenadores = await getEntrenadores() }
                    }>
                    <i class="fa-solid fa-Entrenadors"></i>
                    Todos los Entrenadores👨‍💼
                </button>

                <button
                    class={EntrenadoresBy.value === 'Españoles' ? 'button-age-highlighted' : 'button-age'}
                    onClick$={
                        async () => { EntrenadoresBy.value = 'Españoles'; store.Entrenadores = await getEspana() }
                    }>
                    Entrenadores Españoles🏳️
                </button>


                <button
                    class={EntrenadoresBy.value === 'Exxtranjeros' ? 'button-age-highlighted' : 'button-age'}
                    onClick$={
                        async () => { EntrenadoresBy.value = 'Extranjeros'; store.Entrenadores = await getExtranjeros() }
                    }>

                    Entrenadores Extranjeros🌍
                </button>

                <button
                    class={EntrenadoresBy.value === '1970' ? 'button-age-highlighted' : 'button-age'}
                    onClick$={
                        async () => { EntrenadoresBy.value = '1970'; store.Entrenadores = await getNacidos1970() }
                    }>

                    Nacidos a partir de 1970📅
                </button>

            </div>
        </div>)
});