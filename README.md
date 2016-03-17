# visioapp
Aplicación para Visio Oftalmología Veterinaria

######Configuración
Para la configuración de la aplicación hay que crear un fichero .env con estas variables de configuración:

* cloudant: los datos de acceso a la BD:
  * cloudant_username=XXX
  * cloudant_password=XXX
  * cloudant_database=XXX
  * cloudant_database_test=XXX
* jsonwebtoken: el valor utilizado como "SuperSecret" para generar los tokens
  * jsonwebtoken_super_secret=XXX

NOTA: este fichero está añadido en .gitignore

######Despliegue
Desde Cloud Foundry CLI:
```
cf push
```

Para ver el último log:
```
cf logs visioapp --recent
```