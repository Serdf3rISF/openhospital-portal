# Open Hospital Patient Portal

The Patient Portal will allow patients to safely and intentionally (informed consent) access their data from outside the hospital that is using [Open Hospital](www.open-hospital.org) software. 

:warning: The current project is a work in progress (WIP) and it **is not ready for production**.

## Summary
- [Components](#components)
- [Prepare the environment (.env)](#prepare-the-environment-env)
- [Building](#building)
  * [1. build images from sources](#1-build-images-from-sources)
  * [2. copy the DB scripts](#2-copy-the-db-scripts)
  * [3. build the ui](#3-build-the-ui)
- [Starting](#starting)
  * [4. start the app mode with output in the terminal](#4-start-the-app-mode-with-output-in-the-terminal)
    + [Demo data (optional)](#demo-data-optional)
  * [5. available services](#5-available-services)
- [Stopping](#stopping)
- [Clean everything](#clean-everything)
  * [Clean the DB (only data)](#clean-the-db-only-data)
  * [Destroy and recreate the DB](#destroy-and-recreate-the-db)
  * [Remove all containers and volumes](#remove-all-containers-and-volumes)
  * [Clean all previous data](#clean-all-previous-data)
- [Screenshots](#screenshots)
- [Developing](#developing)
  * [Create DB script from code](#create-db-script-from-code-init-api)
  * [Generate migration scripts after changes to API codebase](#generate-migration-scripts-after-changes-to-api-codebase-update-api)
  * [API URLs](#api-urls)
  * [Develop the ui (React)](#develop-the-ui-react)
- [Connector (WIP)](#connector-wip)
  * [1. Setup using a test db](#1-setup-using-a-test-db)
  * [2. Build from sources](#2-build-from-sources)
  * [3. Start the connector with the output in the terminal](#3-start-the-connector-with-the-output-in-the-terminal)
  * [4. Using a production db](#4-using-a-production-db)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Components

<div align="center">
<img src="./doc/images/patientportal.png"  width="70%" height="70%">
</div>

## Prepare the environment (.env)

First copy `dotenv` to `.env` and set up your variables and locations.

Add in the `hosts` file the following entry `127.0.0.1 develop.ohpp.local api-develop.ohpp.local matomo-develop.ohpp.local`

Export the new .env into variables 

```
export $(grep -E 'ENVIRONMENT_NAME|BASE_DOMAIN' .env | xargs)
```

Create the folder structure using the .env variables

```
mkdir -p data/$ENVIRONMENT_NAME/database data/$ENVIRONMENT_NAME/database-matomo data/$ENVIRONMENT_NAME/logs/mysql data/$ENVIRONMENT_NAME/logs/mysql-matomo data/$ENVIRONMENT_NAME/logs/nginx data/$ENVIRONMENT_NAME/logs/nginx-matomo data/$ENVIRONMENT_NAME/run data/$ENVIRONMENT_NAME/sql/migrations data/$ENVIRONMENT_NAME/letsencrypt

```

## Building

### 1. build images from sources

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml build --build-arg ENVIRONMENT_NAME --build-arg BASE_DOMAIN build-api --no-cache
```

### 2. copy the DB scripts

When starting API, they will be used by Flyway to create the actual DB:

```
cp patient-portal/sql/migrations/* data/$ENVIRONMENT_NAME/sql/migrations
```

### 3. build the ui

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml build --build-arg ENVIRONMENT_NAME --build-arg BASE_DOMAIN ui
```

## Starting

### 4. start the app mode with output in the terminal

Start MySQL database/service (in background):

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml up -d mysql
```

(optional) Start Matomo instance (in background):

```
docker compose -f docker-compose-matomo.yaml up -d
```

Start the Traefik (loadbalancer), API and UI with output in the terminal. At the first boot, API will create the DB using the scripts copied at **Step 2**.

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml up loadbalancer api ui
```

#### Demo data (optional)

From another window, with everything started, run:

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml run --rm demo-data
```

Demo users

```
USER                USERNAME          PASSWORD           ROLE
------------------------------------------------------------------
admin               admin             admin              ADMIN
hospital admin      admin@email.com   hospadmin2023      ADMIN
doctor              doctor@email.com  doctor2023         DOCTOR
Justin Frederick    701010            justin2023         PATIENT
Anthon Geremy       701011            anthon2023         PATIENT
Veronique Fountain  701012            veronique2023      PATIENT
Cypher Marica       701013            cypher2023         PATIENT
Serena Levinson     701014            serena2023         PATIENT
Bardsley Zenaida    701015            bardsley2023       PATIENT
Graney Almedan      701016            graney2023         PATIENT
Ackman Sammy        701017            ackman2023         PATIENT
Pohlman Margot      701018            pohlman2023        PATIENT
Jeana Bennett       701019            jeana2023          PATIENT
Abramo Oliver       701020            abramo2023         PATIENT
```

To repeat the import, see [Clean the DB only (data)](#clean-the-db-only-data)



### 5. available services


- API will be available at `https://api-develop.ohpp.local/swagger-ui/` and `http://localhost:18080/swagger-ui/`

    - use the first one to connect and allow insecure connections for the swagger UI
    - use the second one to actually call the API and avoid 'Mixed Content' error

- Patient Portal (UI) will be available at `https://develop.ohpp.local/` 

- Loadbalancer dashboard (traefik) will be available at `http://localhost:8080`

- Matomo will be available at `http://matomo-develop.ohpp.local/` and `http://localhost:28080/`

- Instructions for Matomo (please read it carefully):

    - connect and configure the first time (installation) from http://develop-matomo.ohpp.local/
    - setup DB and users like in .env file
    - setup super user as root and choose a password (main user, don't forget!)
    - Website name: "Open Hospital Patient Portal"
    - Website URL: http://develop.ohpp.local
    - Untick "Enable Do Not Track support" or (after) in Administration > Privacy > Users opt-out, under “Support Do Not Track preference” disable
    
Patient Portal (ui) graphics:

- Respiratory Rate: <a href="https://www.freepik.com/free-vector/breathing-exercise-concept-illustration_28205234.htm#&position=0&from_view=collections">Image by storyset</a> on Freepik
- Heart Rate: <a href="https://www.freepik.com/free-vector/red-heartbeat-symbol-graphic-illustration_2631302.htm#&position=4&from_view=collections#position=4">Image by rawpixel.com</a> on Freepik
- Glicemy: Image by <a href="https://www.freepik.com/free-vector/diabetes-blood-test-with-flat-design_2621079.htm#&position=9&from_view=collections">Freepik</a>
- Weight: <a href="https://www.freepik.com/free-vector/mediterranean-diet-abstract-concept-illustration-healthy-diet-program-mediterranean-menu-nutrition-plan-home-cooking-organic-food-fresh-ingredient-shopping-list_12146004.htm#&position=5&from_view=collections">Image by vectorjuice</a> on Freepik
- Height: <a href="https://www.freepik.com/free-vector/healthy-lifestyle-icons-collection_1006435.htm#query=lifestyle&position=49&from_view=author">Image by macrovector</a> on Freepik
- Diuresis: <a href="https://www.freepik.com/free-vector/illustration-blood-donation_2606907.htm#&position=8&from_view=collections">Image by rawpixel.com</a> on Freepik
- Diuresis Vol: <a href="https://www.freepik.com/free-vector/illustration-blood-donation_2606907.htm#&position=8&from_view=collections">Image by rawpixel.com</a> on Freepik
- Saturation: <a href="https://www.freepik.com/free-vector/digital-healthcare-technology-elements-characters-set_6345812.htm#&position=2&from_view=collections">Image by macrovector</a> on Freepik
- Temperature: <a href="https://www.freepik.com/free-vector/digital-health-icons-flat-set_4407661.htm#&position=1&from_view=collections">Image by macrovector_official</a> on Freepik
- Blood Pressure: Image by <a href="https://www.freepik.com/free-vector/hand-drawn-world-hypertension-day-illustration_13184252.htm#query=hypertension&position=12&from_view=search&track=sph">Freepik</a>


## Stopping

Interrupt with CTRL-C in the terminal from [4. start the app mode with output in the terminal](#4-start-the-app-mode-with-output-in-the-terminal)

```
docker compose -f docker-compose-matomo.yaml stop
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml stop
```

## Clean everything

Use the one you need most.

### Clean the DB (only data)

With MySQL database/service running, do:

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml run --rm delete-all-data
```

(optional) reload demo data:

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml run --rm demo-data
```


### Destroy and recreate the DB

Stop api (loadbalancer, matomo and ui can stay)

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml stop api
```

Remove mysql container, volumes and folders

```
docker compose rm --stop --volumes --force mysql
docker volume rm oh-patient-portal_mysql_data
docker volume rm oh-patient-portal_mysql_logs
rm -rf data/$ENVIRONMENT_NAME/database/*
```

Restart mysql

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml up -d mysql
```

Restart api (will create the db structure using the already existing scripts at data/$ENVIRONMENT_NAME/sql/migrations)

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml up -d api
```

(optional) Reload demo data

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml run --rm demo-data
```

### Remove all containers and volumes

```
docker compose rm --stop --volumes --force
docker compose -f docker-compose-matomo.yaml rm --stop --volumes --force
docker volume rm $(docker volume ls --format '{{.Name}}' | grep ${PWD##*/})
```

### Clean all previous data

```
rm -rf data/$ENVIRONMENT_NAME
```

## Screenshots

![42iDuJPFd1XxX66M](https://user-images.githubusercontent.com/2938553/221145369-20f95889-6d00-4ab0-a172-b79896101b5c.png)

![image](https://user-images.githubusercontent.com/2938553/221145575-2877d137-4928-423c-a3a1-bdd7420c0a72.png)

![image](https://user-images.githubusercontent.com/2938553/221145603-24444a1d-45ab-4d69-bd72-488d39092289.png)

![image](https://user-images.githubusercontent.com/2938553/221145636-2f1a61c4-8fa5-4109-a356-82072b84bfc0.png)

![image](https://user-images.githubusercontent.com/2938553/221145659-c7c17405-002c-484a-8f6c-519d474ea1e4.png)


## Developing

### Create DB script from code (init-api)

Start mysql database/service (in background):

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml up -d mysql
```
Wait several seconds to finish the startup.

Let Hibernate to create the script in data/sql/migrations folder.

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml run --rm init-api
```

Interrupt with CTRL-C after finish (don't mind the errors)

In folder `data/$ENVIRONMENT_NAME/sql/migrations` you will find the `V1__ddljpacreate.sql` script with all needed tables. When started, API will use the scripts to create the DB.

To repeat the process, destroy and recreate the DB and delete the generated script first:

```
rm data/$ENVIRONMENT_NAME/sql/migrations/*
```

### Generate migration scripts after changes to API codebase (update-api)

Start mysql database/service (in background):

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml up -d mysql
```
Wait several seconds to finish the startup.

[1. build images from sources](#1-build-images-from-sources) the let Hibernate to create the script in `data/$ENVIRONMENT_NAME/sql/migrations` folder:

```
docker compose -f docker-compose-ops.yaml -f docker-compose.yaml run --rm update-api
```

Interrupt with CTRL-C after finish (don't mind the errors)

In folder `data/$ENVIRONMENT_NAME/sql/migrations` you will find the `update.sql` script with all new tables and changes, rename it to `V2__name.sql`. 

When started normally, API will use the new script to update the actual DB and track the migration changes with Flyway.


### API URLs

Api available at `https://develop-api.ohpp.local/` and `http://localhost:18080/`

Swagger UI available at `https://develop-api.ohpp.local/swagger-ui/` and `https://develop-api.ohpp.local/v3/api-docs`

See also `ppoh.postman_collection.json`

### Develop the ui (React)

Just cd into patient-portal-ui and run (ui available at http://localhost:3000/)

```
npm install
npm start
```

Codebase in `patient-portal-ui/src`

## Connector (WIP)

A scaffolding for the connector that will retrieve data from an Open Hospital instance (DB) and feed the Patient Portal DB

It uses [openhospital-core](https://github.com/informatici/openhospital-core.git) and it expects the OPENHOSPITAL_CORE_VERSION to point a tagged version

### 1. Setup using a test db

First create connector settings based on .env

```
make
```

Get db scripts from https://github.com/informatici/openhospital-core.git $OPENHOSPITAL_CORE_VERSION

```
rm -rf deps
export $(grep OPENHOSPITAL_CORE_VERSION .env | xargs)
mkdir deps && pushd deps && git clone --depth=1 -b v$OPENHOSPITAL_CORE_VERSION https://github.com/informatici/openhospital-core.git && popd

```

Start the database container with:

```
docker compose -f docker-compose-connector.yml up -d database
```

Install demo data with:

```
docker compose -f docker-compose-connector.yml run oh-database-init
```

### 2. Build from sources

```
docker compose -f docker-compose-connector.yml build connector
```

### 3. Start the connector with the output in the terminal

```
docker compose -f docker-compose-connector.yml up connector
```

### 4. Using a production db

You can setup the connector to use an existing Open Hospital DB with real data

In docker-compose-connector.yml, comment:

```
#    networks:
#      - hospital-net
```

and uncomment:

```
    network_mode: host
```

In `.env` set up variables in `[oh connector]` section then run `make`


Rebuild and start with `docker compose -f docker-compose-connector.yml up --build connector`
