#!/bin/bash

SHP_DIR="/Users/agustinezequielbrites/Desktop/sig_ign/SIG_IGN2011"
DB_HOST="localhost"
DB_PORT="5433"
DB_NAME="sigdb"
DB_USER="myuser"
DB_PASSWORD="mypassword"

export PGPASSWORD=$DB_PASSWORD

for file in $SHP_DIR/*.shp; do
    BASENAME=$(basename "$file" .shp)
    echo "Cargando $BASENAME..."
    ogr2ogr -f "PostgreSQL" \
        PG:"host=$DB_HOST port=$DB_PORT dbname=$DB_NAME user=$DB_USER password=$DB_PASSWORD" \
        "$file" \
        -nln "$BASENAME" \
        -lco "GEOMETRY_NAME=geom" \
        -lco "FID=gid" \
        -nlt PROMOTE_TO_MULTI
done

echo "Carga completa."