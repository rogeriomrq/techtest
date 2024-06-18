FROM php:8.3-fpm AS php_dev
RUN set -eux; \
    apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libzip-dev \
    libpq-dev \
    openssl \
    wget \
    alien \
    libaio1 \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libxml2-dev \
    libldap2-dev \
    libldb-dev \
    locales \
    libicu-dev \
    ; \
    rm -rf /var/lib/apt/lists/*; \
    docker-php-ext-configure zip; \
    docker-php-ext-configure intl; \
    docker-php-ext-configure gd --with-jpeg --with-freetype; \
    docker-php-ext-install -j$(nproc) gd bcmath intl xml dom pdo pdo_mysql \
    zip \
    ;

WORKDIR /var/www/
RUN rm -rf /var/www/html
ENV COMPOSER_PROCESS_TIMEOUT=900
COPY . /var/www/
ADD ./.env ./.env

COPY ./docker/entrypoint.sh /usr/local/bin/start
RUN chmod +x /usr/local/bin/start

# Configurações do PHP
RUN echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "post_max_size = 110M" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/php-memlimit.ini

CMD ["/usr/local/bin/start"]

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN ln -s public html

EXPOSE 8080
