from pydantic import BaseModel
from typing import List
from model.cliente import Cliente

class ClienteSchema(BaseModel):
    """ Define como um novo cliente a ser inserido deve ser representado
    """
    cpf: str = "11111111111"
    nome: str = "José da Silva"
    email: str = "xxx@xxx.com"
    cep: str = "22777000"
    endereco: str = "endereço"
    bairro: str = "bairro"
    uf: str = "RJ"
    municipio: str = "município"
    numero: str = "100"
    complemento: str = "complemento"


class ClienteBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. """
    cpf: str = "11111111111"
    nome: str = "José da Silva"


class ListagemClientesSchema(BaseModel):
    """ Define como uma listagem de clientes será retornada.
    """
    clientes:List[ClienteSchema]


def apresenta_clientes(clientes: List[Cliente]):
    """ Retorna uma representação do cliente seguindo o schema definido em
        ClienteViewSchema.
    """
    result = []
    for cliente in clientes:
        result.append({
            "id": cliente.id,
            "cpf": cliente.cpf,
            "nome": cliente.nome,
            "email": cliente.email,
            "cep": cliente.cep,
            "endereco": cliente.endereco,
            "bairro": cliente.bairro,
            "uf": cliente.uf,
            "municipio": cliente.municipio,
            "numero": cliente.numero,
            "complemento": cliente.complemento
        })

    return {"clientes": result}


class ClienteViewSchema(BaseModel):
    """ Define como um cliente será retornado: cliente.
    """
    id: int = 1
    cpf: str = "11111111111"
    nome: str = "José da Silva"
    email: str = "xxx@xxx.com"
    cep: str = "22777000"
    endereco: str = "endereço"
    bairro: str = "bairro"
    uf: str = "RJ"
    municipio: str = "município"
    numero: str = "100"
    complemento: str = "complemento"

class ClienteDelSchema(BaseModel):
    """ Define como deve ser a estrutura do dado retornado após uma requisição de remoção. """
    mesage: str
    nome: str

class CepConsultaSchema(BaseModel):
    cep: str = "22700000"

def apresenta_cliente(cliente: Cliente):
    """ Retorna uma representação do cliente seguindo o schema definido em
        ClienteViewSchema.
    """
    return {
        "id": cliente.id,
        "cpf": cliente.cpf,
        "nome": cliente.nome,
        "email": cliente.email,
        "cep": cliente.cep,
        "endereco": cliente.endereco,
        "bairro": cliente.bairro,
        "uf": cliente.uf,
        "municipio": cliente.municipio,
        "numero": cliente.numero,
        "complemento": cliente.complemento
    }
