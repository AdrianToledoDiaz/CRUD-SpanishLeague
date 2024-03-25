from fastapi import FastAPI, HTTPException

# Para poder utilizar campos con fecha
from datetime import date, datetime

# Pydantic es una librería para validar los datos.
# BaseModel sirve para definir clases para crear los modelos de datos que se van a usar en la API.
from pydantic import BaseModel

from typing import List

# Motor es una versión asíncrona de PyMongo,
# la biblioteca estándar de Python para trabajar con MongoDB.
import motor.motor_asyncio

# Para aceptar peticiones de diferentes dominios.
from fastapi.middleware.cors import CORSMiddleware


# Define el modelo de datos para un usuario utilizando Pydantic.
# Esto ayuda a FastAPI a validar los tipos de datos entrantes.
class Entrenador(BaseModel):
    Id: int
    NomEntrenador: str
    Pais: str
    FechaNacimiento: date
    Equipo: str

# Crea la instancia de la aplicación FastAPI
app = FastAPI()

# Lista de origenes permitidos.
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Método permitidos
    allow_headers=["*"], # Cabeceras permitidas
)

# Cadena de conexión a MongoDB con autenticación
MONGODB_URL = "mongodb://admin:123@mongodb:27017/?authSource=admin"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
db = client.entrenadores

# Endpoint para listar todos los entrenadores.
@app.get("/entrenadores/", response_description="Lista todos los entrenadores", response_model=List[Entrenador])
async def list_entrenadores():
    entrenadores = await db["entrenadores"].find().to_list(1000)
    return entrenadores

#Endpoint para crear un nuevo entrenador
@app.post("/entrenadores/", response_description="Añade un nuevo entrenador", response_model=Entrenador) 
async def create_user(entrenador: Entrenador):
    entrenador_dict = entrenador.dict()
    entrenador_dict["FechaNacimiento"] = datetime.combine(entrenador.FechaNacimiento, datetime.min.time())
    await db["entrenadores"].insert_one(entrenador_dict)
    return entrenador

# Endpoint para obtener un entrenador específico por id.
@app.get("/entrenadores/{Id}", response_description="Obtiene un entrenador", response_model=Entrenador)
async def find_entrenador(Id: int):
    entrenador = await db["entrenadores"].find_one({"Id": Id })
    if entrenador is not None:
        return entrenador
    raise HTTPException(status_code=404, detail=f"Entrenador con ID {Id} no se ha encontrado.")

# Endpoint para borrar un entrenador especifico por ID.
@app.delete("/entrenadores/{Id}", response_description="Borra un entrenador", status_code=204)
async def delete_entrenador(Id: int):
    delete_result = await db["entrenadores"].delete_one({"Id": Id })
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Entrenador con ID {Id} no se ha encontrado.")

# Endpoint para actualizar un entrenador especifico por ID.
@app.put("/entrenadores/{Id}", response_description="Actualiza un entrenador por el ID", status_code=204)
async def update_entrenador(Id: int, entrenador: Entrenador):
    entrenador_dict = entrenador.dict()
    entrenador_dict["FechaNacimiento"] = datetime.combine(entrenador.FechaNacimiento, datetime.min.time())
    await db["entrenadores"].update_one({"Id": Id}, {"$set": entrenador_dict})
    return entrenador

# Endpoint para listar todos los entrenadores españoles.

@app.get("/entrenadores/espanoles/", response_description="Lista los entrenadores españoles", response_model=List[Entrenador])
# async def list_españoles():
async def list_entrenadores_espanoles():
    # Filtrar entrenadores por el campo "Pais" igual a "España"
    query = {"Pais": "España"}
    entrenadores_espanoles = await db["entrenadores"].find(query).to_list(1000)
    return entrenadores_espanoles 

@app.get("/entrenadores/extranjeros/", response_description="Lista los entrenadores extranjeros", response_model=List[Entrenador])
# async def list_extranjeros():
async def list_entrenadores_extranjeros():
    # Filtrar entrenadores por el campo "Pais" no igual a "España"
    query = {"Pais": {"$ne": "España"}}
    entrenadores_extranjeros = await db["entrenadores"].find(query).to_list(1000)
    return entrenadores_extranjeros 

# Endpoint para listar todos los entrenadores nacidos a partir de 1970 mayores de edad.
@app.get("/entrenadores/nacidos1970/", response_description="Lista de entrenadores nacidos a partir de 1975", response_model=List[Entrenador])
async def list_entrenadores_nacidos_desde_1970():
    # Filtrar entrenadores por fecha de nacimiento a partir de 1970
    query = {"FechaNacimiento": {"$gte": datetime(1970, 1, 1)}}
    entrenadores_desde_1970 = await db["entrenadores"].find(query).to_list(1000)
    return entrenadores_desde_1970