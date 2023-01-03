# Super Auxiliar
Mais um serviço para te auxiliar a fazer algo que geralmente é mais trabalhoso do que deveria.

## Passo a passo
### 1. Visto que esse serviço não está hospedado, clone o projeto na sua máquina com `git clone https://github.com/Dgvalerio/super-puppeteer.git`;
### 2. Execute o comando `start:project` para criar as pastas e arquivos necessários.
### 3. Preencha o `config.ts` com seus dados.
(Opcional) Caso você queira buscar os commits de uma branch específica, execute `git:get-branchs` para ver as branches dos repositórios informados, após isso, copie o SHA da Branch e insira no parâmetro `branch_sha` após o `name` do repositório.
### 4. Execute o comando `git:get-commits` para buscar seus commits. Eles serão copiados para a pasta `markdown`, no arquivo nomeado com a data da busca.
### 5. Confira o arquivo de commits, mude os textos que achar necessário e adicione o campo `appointment` ao seu `config.ts` com o que você deseja enviar.
### 6. Execute o comando `pup:send-appointments` para enviar seus apontamentos e veja a mágica acontecer.
