# CEF - Centro Educacional de Floriano 

#### IMPORTANTE!!!!
Executem o ``` npm install ``` antes de executar ``` npm run dev ```



------------------------------------ Opcional -----------------------------------------------------
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

Obs.: Caso encontre algum erro após os testes, basta executar o 
comando abaixo (pode ser a partir da main)

#### HotFix
``` git flow hotfix start 1.1 ```

#### Subir todas as branchs (develop e master para nuvem)
``` git push --all ```

--------------------------- Não precisa instalar (pq já está no package.json) -------------------------------
##### Tiny MCE (Editor de texto personalizado)
``` npm install --save tinymce @tinymce/tinymce-react copy-webpack-plugin ```

##### Jwt Decode (Decodar o jwt vindo do backend)
``` npm install jwt-decode ```

##### Armazenar informações nos cookies
``` npm install nookies ```

##### Axios (Responsável por fazer requisições para o backend)
``` npm install axios ```

##### Pegar o dia e a hora atuais
``` npm install dayjs ```

##### Biblioteca de ícones
``` npm install react-icons --save ```

##### Carousel responsivo
``` npm install react-responsive-carousel ```

##### React Modal 
``` npm install react-modal ```

##### React Mask 
``` npm install react-input-mask ```

``` npm install date-fns ```