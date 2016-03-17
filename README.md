# visioapp
Aplicación para Visio Oftalmología Veterinaria

Para la configuración de la aplicaciónhay que crear un fichero .env coon estas variables de configuración:

* cloudant: los datos de acceso a la BD:
  * cloudant_username=XXX
  * cloudant_password=XXX
  * cloudant_database=XXX
  * cloudant_database_test=XXX
* jsonwebtoken: el valor utilizado como "SuperSecret" para generar los tokens
  * jsonwebtoken_super_secret=XXX

NOTA: este fichero esta añadido a .gitignore
