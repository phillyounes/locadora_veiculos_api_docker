
from sqlalchemy import Column, String, Integer, ForeignKey #, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship #, DeclarativeBase
# from datetime import datetime
# from typing import Union

from  model import Base

class Endereco(Base):
    __tablename__ = 'endereco'

    id = Column("id_endereco", Integer, primary_key=True)
    tipo_logradouro = Column(String(50))
    logradouro = Column(String(100))
    cep = Column(Integer)
    bairro = Column(String(50))
    numero = Column(Integer)
    complemento = Column(String(50))
    cliente_id = Column(Integer, ForeignKey("cliente.id"))
    
    # cliente_id: Mapped[int] = mapped_column(ForeignKey("cliente.id"))
    # cliente: Mapped["Cliente"] = relationship(back_populates="cliente")

    def __init__(self,
                 logradouro:str,
                 tipo_logradouro:str,
                 cep:str,
                 bairro:str, 
                 numero:str,
                 complemento:str):

        self.tipo_logradouro = tipo_logradouro
        self.logradouro = logradouro
        self.cep = cep
        self.bairro = bairro
        self.numero = numero
        self.complemento = complemento