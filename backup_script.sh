#!/bin/bash

# Set the backup directory and file name
BACKUP_DIR="/home/freshcodes/Desktop/backup"
BACKUP_FILE="backup_dredb_$(date +%Y%m%d%H%M%S).sql"

# Set PostgreSQL user and database
PG_USER="postgres"
PG_DB="dredatabase"

# Perform the backup using pg_dump
PGPASSWORD=">;D0.5|Qvo2\"CY/9" pg_dump -h 35.232.116.181 -U $PG_USER -d $PG_DB -F c -f $BACKUP_DIR/$BACKUP_FILE

echo "Backup completed: $BACKUP_DIR/$BACKUP_FILE"
