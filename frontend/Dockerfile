# # Vamos usar uma imagem base com o servidor web Nginx, em sua versão mais recente
# FROM nginx:latest

# # Copie os arquivos da aplicação para o diretório padrão do servidor web do Nginx
# COPY . /usr/share/nginx/html

# # O Nginx expõe a porta 80 por padrão
# EXPOSE 8080

# # Comando para iniciar o servidor web Nginx em primeiro plano
# CMD ["nginx", "-g", "daemon off;"]

# define a imagem base
FROM debian:latest

# define o mantenedor da imagem
LABEL maintainer="MVP"

# Atualiza a imagem com os pacotes
RUN apt-get update && apt-get upgrade -y

# Instala o NGINX para testar
RUN apt-get install nginx -y

# Copie os arquivos da aplicação para o diretório padrão do servidor web do Nginx
COPY . /usr/share/nginx/html

# Expoe a porta 80
EXPOSE 80
# Comando para iniciar o NGINX no Container
CMD ["nginx", "-g", "daemon off;"]