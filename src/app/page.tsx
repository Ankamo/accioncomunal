'use client';

import { useEffect, useState } from 'react';

export default function Home() {
    const [formData, setFormData] = useState({
        department: '',
        municipality: '',
        tipoOac: '',
        tipoUbicacion: '',
        nombreBarrio: '', // Campo para el nombre del barrio o vereda
    });

    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [tiposOac, setTiposOac] = useState([]);
    const [tiposUbicacion, setTiposUbicacion] = useState([]);

    const apiKey = 'AIzaSyDdbmm259ZMNXfmqwCptHtPwPcluVbb-WA'; // Reemplaza con tu API Key
    const sheetId = '1w_8hXKQVKbNMZz7jjx0K1VkqibzK3wm5M_pCIACEffo'; // Reemplaza con el ID de tu hoja de Google Sheets

    // Obtener los departamentos
    useEffect(() => {
        const fetchDepartamentos = async () => {
            const sheetName = 'Departamentos';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:B?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedDepartamentos = data.values.slice(1).map((row) => ({
                        id: row[0],
                        nombre: row[1],
                    }));
                    setDepartamentos(fetchedDepartamentos);
                } else {
                    throw new Error('Error al obtener los departamentos');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchDepartamentos();
    }, [apiKey, sheetId]);

    // Obtener los municipios basados en el departamento seleccionado
    useEffect(() => {
        if (formData.department) {
            const fetchMunicipios = async () => {
                const sheetName = 'Municipios';

                try {
                    const response = await fetch(
                        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:D?key=${apiKey}`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        const fetchedMunicipios = data.values.slice(1)
                            .filter((row) => row[0] === formData.department)
                            .map((row) => ({
                                id: row[2],
                                nombre: row[3],
                            }));
                        setMunicipios(fetchedMunicipios);
                    } else {
                        throw new Error('Error al obtener los municipios');
                    }
                } catch (error) {
                    console.error('Error al obtener los datos de Google Sheets:', error);
                }
            };

            fetchMunicipios();
        } else {
            setMunicipios([]); // Vaciar la lista si no hay departamento seleccionado
        }
    }, [formData.department, apiKey, sheetId]);

    // Obtener los tipos de OAC
    useEffect(() => {
        const fetchTiposOac = async () => {
            const sheetName = 'TipoOac';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:A?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedTiposOac = data.values.slice(1).map((row) => ({
                        nombre: row[0],
                    }));
                    setTiposOac(fetchedTiposOac);
                } else {
                    throw new Error('Error al obtener los tipos de OAC');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchTiposOac();
    }, [apiKey, sheetId]);

    // Obtener los tipos de ubicación
    useEffect(() => {
        const fetchTiposUbicacion = async () => {
            const sheetName = 'TipoUbicacion';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:A?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedTiposUbicacion = data.values.slice(1).map((row) => ({
                        nombre: row[0],
                    }));
                    setTiposUbicacion(fetchedTiposUbicacion);
                } else {
                    throw new Error('Error al obtener los tipos de ubicación');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchTiposUbicacion();
    }, [apiKey, sheetId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que se seleccionaron los datos necesarios
        if (!formData.department || !formData.municipality || !formData.tipoOac || !formData.tipoUbicacion) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            // Preparar los datos para enviar a Google Sheets
            const body = {
                values: [
                    [
                        formData.department,
                        formData.municipality,
                        formData.tipoOac,
                        formData.tipoUbicacion,
                        formData.nombreBarrio || '',
                        '', // URL, puedes agregarla si es necesario
                    ],
                ],
            };

            // Hacer la petición POST a la API de Google Sheets
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/OacRegistrados!A:H:append?valueInputOption=USER_ENTERED&key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );

            if (response.ok) {
                alert('Datos enviados correctamente a la hoja OacRegistrados.');
                setFormData({
                    department: '',
                    municipality: '',
                    tipoOac: '',
                    tipoUbicacion: '',
                    nombreBarrio: '',
                });
            } else {
                const errorData = await response.json();
                console.error('Error al enviar los datos a Google Sheets:', errorData);
                throw new Error('Error al enviar los datos a Google Sheets.');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al enviar los datos.');
        }
    };

    return (
        <main className="min-h-screen bg-gray-800 flex items-center justify-center">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Formulario de Selección
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo Departamento */}
                    <div>
                        <label htmlFor="department" className="block text-gray-300">
                            Departamento:
                        </label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        >
                            <option value="">Selecciona un departamento</option>
                            {departamentos.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Municipio */}
                    <div>
                        <label htmlFor="municipality" className="block text-gray-300">
                            Municipio:
                        </label>
                        <select
                            id="municipality"
                            name="municipality"
                            value={formData.municipality}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                            disabled={!formData.department}
                        >
                            <option value="">Selecciona un municipio</option>
                            {municipios.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Tipo de OAC */}
                    <div>
                        <label htmlFor="tipoOac" className="block text-gray-300">
                            Tipo de OAC:
                        </label>
                        <select
                            id="tipoOac"
                            name="tipoOac"
                            value={formData.tipoOac}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        >
                            <option value="">Selecciona un tipo de OAC</option>
                            {tiposOac.map((t) => (
                                <option key={t.nombre} value={t.nombre}>
                                    {t.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Tipo de Ubicación */}
                    <div>
                        <label htmlFor="tipoUbicacion" className="block text-gray-300">
                            Tipo de Ubicación:
                        </label>
                        <select
                            id="tipoUbicacion"
                            name="tipoUbicacion"
                            value={formData.tipoUbicacion}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        >
                            <option value="">Selecciona un tipo de ubicación</option>
                            {tiposUbicacion.map((t) => (
                                <option key={t.nombre} value={t.nombre}>
                                    {t.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Nombre del Barrio */}
                    <div>
                        <label htmlFor="nombreBarrio" className="block text-gray-300">
                            Nombre del Barrio o Vereda:
                        </label>
                        <input
                            type="text"
                            id="nombreBarrio"
                            name="nombreBarrio"
                            value={formData.nombreBarrio}
                            onChange={handleChange}
                            placeholder="Ingresa el nombre del barrio o vereda"
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
