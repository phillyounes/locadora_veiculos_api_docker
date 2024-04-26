
from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from datetime import datetime
from typing import Union

from  model import Base #, Endereco

class Cliente(Base):
    __tablename__ = 'cliente'

    id = Column("id_cliente", Integer, primary_key=True)
    cpf = Column(String(11), unique=True)
    nome = Column(String(50))
    email = Column(String(50))
    data_cadastro = Column(DateTime, default=datetime.now())

    def __init__(self,
                 cpf:str,
                 nome:str,
                 email:str,
                 data_cadastro:Union[DateTime, None] = None):

        self.cpf = cpf
        self.nome = nome
        self.email = email

        if data_cadastro:
            self.data_cadastro = data_cadastro