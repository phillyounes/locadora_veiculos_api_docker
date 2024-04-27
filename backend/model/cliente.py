
from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey
#from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from datetime import datetime
from typing import Union

from  model import Base

class Cliente(Base):
    __tablename__ = 'cliente'

    id = Column("id_cliente", Integer, primary_key=True)
    cpf = Column(String(11), unique=True)
    nome = Column(String(50))
    email = Column(String(50))
    cep = Column(String(8))
    endereco = Column(String(150))
    bairro = Column(String(150))
    uf = Column(String(2))
    municipio = Column(String(150))
    numero = Column(String(50))
    complemento = Column(String(150))
    data_cadastro = Column(DateTime, default=datetime.now())

    def __init__(self,
                 cpf:str,
                 nome:str,
                 email:str,
                 cep:str,
                 endereco:str,
                 bairro:str,
                 uf:str,
                 municipio:str,
                 numero:str,
                 complemento:str,
                 data_cadastro:Union[DateTime, None] = None):

        self.cpf = cpf
        self.nome = nome
        self.email = email
        self.cep = cep
        self.endereco = endereco
        self.bairro = bairro
        self.uf = uf
        self.municipio = municipio
        self.numero = numero
        self.complemento = complemento

        if data_cadastro:
            self.data_cadastro = data_cadastro