FROM composer:latest
RUN apk upgrade --update && apk add \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd


WORKDIR /beep
COPY . /beep
RUN ls -l && composer install && mv storage storage.bak && chmod -R 777 bootstrap/cache



FROM php:7.4-apache
WORKDIR /var/www/html/
COPY --from=0 /beep/ .
COPY apache/docker.conf /etc/apache2/sites-enabled


# Install system dependencies
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    netcat \
    unzip \
    git \
    zip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql

# Install Xdebug via PECL
RUN pecl install debug-3.3.0 \
    && docker-php-ext-enable xdebug

# Configure Xdebug (for Xdebug 3.x)
RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.client_port=9111" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.log=/tmp/xdebug.log" >> /usr/local/etc/php/conf.d/xdebug.ini

# Enable Apache rewrite module
RUN a2enmod rewrite \
    && sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Copy project files
# COPY . /var/www/html

# Expose Apache port
# EXPOSE 80

# Start Apache
# CMD ["apache2-foreground"]





ENTRYPOINT [ "./docker-run.sh" ]
