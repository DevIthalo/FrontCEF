# CEF - Centro Educacional de Floriano 


#### Iniciar o git flow 
``` git flow init ```

Obs.: Com isso, o git flow automaticamente cria uma branch develop.
Para publicar a branch develop para acesso remoto, basta fazer um 
``` git push -u origin develop ```


#### Criar uma feature para adicionar uma funcionalidade
``` git flow feature start css ```

#### Publicar a feature para acesso remoto
``` git flow feature publish css ```

#### Finalizar a feature 
``` git flow feature finish css ```

Obs.: Quando finalizar a feature ela será removida do repositório remoto
também

#### Criar uma release (branch para testes)
``` git flow release start (version) ```

Obs.: Caso encontre algum problema, resolva na própria release

#### Finalizar release (branch para testes)
``` git flow release finish (version) ```

