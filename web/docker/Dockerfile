FROM node:latest

# Instale o Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /var/www

COPY package.json package-lock.json /var/www/

RUN npm install

COPY . /var/www

RUN npm run tailwindcss

# Exponha a porta necessária para acessar a aplicação
EXPOSE 8888

# Comando padrão para iniciar a aplicação quando o container for iniciado
CMD ["npm", "run", "dev:node"]
