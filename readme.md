# Super Auxiliar
Mais um serviço para te auxiliar a fazer algo que geralmente é mais trabalhoso do que deveria.

## Passo a passo
### 1. Visto que esse serviço não está hospedado, clone o projeto na sua máquina com `git clone https://github.com/Dgvalerio/super-puppeteer.git`;
### 2. Execute o comando `start:project` para criar as pastas e arquivos necessários.
### 3. Preencha o `config.ts` com seus dados.
(Opcional) Caso você queira buscar os commits de uma branch específica, execute `git:get-branchs` para ver as branches dos repositórios informados, após isso, copie o SHA da Branch e insira no parâmetro `branch_sha` após o `name` do repositório.
### 4. Execute o comando `git:get-commits` para buscar seus commits. Eles serão copiados para a pasta `markdown`, no arquivo nomeado com a data da busca.
### 5. Confira o arquivo de commits, mude os textos que achar necessário e adicione o campo `appointment` ao seu `config.ts` com o que você deseja enviar.
### 6. Execute o comando `sheet:send-appointments` para enviar seus apontamentos e veja a mágica acontecer.

D  S  T  Q  Q  S  S
01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 38 29 30 31

D  S  T  Q  Q  S  S
01
02 03 04 05 06 07 08
09 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 38

06 - Após 12h

12 - Após 12h

18 - Após 12h
19 - após 17h

24 - Após 12h
26 - As 17h

03	08:20	12:30
03	13:30	22:30
04	08:00	13:00
04	14:00	19:00
05	08:00	12:00
05	13:00	17:00
06	07:00	12:00
07	09:00	12:00
07	13:00	18:00
10	07:00	12:00
10	13:00	18:00
11	08:00	12:00
11	13:00	20:00
12	08:00	12:00
13	08:00	12:00
13	13:00	19:30
14	08:00	12:00
14	13:00	18:00
17	08:00	12:00
17	13:00	21:00
18	08:00	12:00
19	08:00	12:00
19	13:00	17:00
20	08:00	12:00
20	13:00	21:30
21	08:00	12:00
21	13:00	18:00
24	08:00	12:50
25	08:00	12:00
25	13:00	21:20
26	08:00	12:00
26	13:00	21:00
27	08:00	12:00
27	13:00	19:00
28	07:00	12:00
28	13:00	18:40
