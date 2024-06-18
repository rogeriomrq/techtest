# KANASTRA
### Backend
Acesse a pasta da api.
```shell
cd api/
docker-compose -f docker-compose.yml up -d
```
### Frontend
```shell
cd web/
docker-compose -f docker-compose.yml up -d
```
Acesse via url http://localhost:8888/

## Desenvolvimento
### Testes unitarios e integração
#### Para o backend execute
```shell
docker exec backend-rest php artisan test
```
#### Para o frontend execute
```shell
docker exec frontend-react npm test
```
***

## Estrutura de Frontend

O frontend foi desenvolvido utilizando o boilerplate recomendado, com ajustes nos componentes existentes para melhorar a usabilidade. Foram criados novos componentes específicos para atender às necessidades do projeto, como a paginação (Pagination) e uma estrutura padrão de tabela (DefaultTable).

### Componentes Criados

1. **Pagination Component (Componente de Paginação):**
   - O componente de paginação foi desenvolvido para facilitar a navegação entre páginas de dados, proporcionando uma experiência mais intuitiva para o usuário. Ele permite a exibição de um conjunto limitado de dados por página e oferece controles para navegar entre as páginas.

2. **DefaultTable Component (Componente de Tabela Padrão):**
   - O componente DefaultTable foi criado com o objetivo de fornecer uma estrutura básica e reutilizável para exibição de dados em formato tabular. Ele pode ser personalizado e estendido conforme necessário para se adaptar a diferentes tipos de dados e requisitos de exibição.

### Observações de Desenvolvimentos Futuros
- Pagination Component: Implementar suporte a botões de navegação para primeira e última página.
- DefaultTable Component: Adicionar suporte a ordenação de colunas, filtro de dados e paginação integrada para grandes conjuntos de dados.
- Revisão da Estrutura de Tabela: Revisar e refatorar o DefaultTable para garantir maior flexibilidade e extensibilidade, permitindo a personalização avançada de estilos e funcionalidades.
- Permissoes: Implementar uma estrutura para validar se o usuário logado tem permissão para acessar telas ou executar ações na aplicação.
- Menu: Criar uma estrutura de menu que leve em consideração as permissões do usuário e esteja alinhada com a proposta da aplicação.

## Estrutura de Backend: Controller, Services e Repositories

- **Controller**: Responsável pela validação e manipulação das requisições HTTP, gerenciando dados de entrada e saída.
- **Services**: Aplica as regras de negócio da aplicação, processando e validando dados de acordo com as necessidades do domínio.
- **Repositories**: Fornece uma camada de abstração para operações de persistência de dados, interagindo com o banco de dados ou outros sistemas de armazenamento de forma padronizada e eficiente.

### Observações de Desenvolvimentos Futuros

#### Envio de E-mail Relacionado a Pagamentos

1. **Criação de um Job para Envio de E-mails:**
   - Implementar um job no Laravel, que encapsula a lógica de envio de e-mails relacionados aos pagamentos. Isso permite que o processamento ocorra de forma assíncrona, sem bloquear a aplicação principal.

2. **Configuração de Fila de E-mails:**
   - Utilizar filas do Laravel para gerenciar o envio dos e-mails. Isso inclui configurar o driver de fila apropriado (por exemplo, Redis, database) no arquivo `.env` e configurar o sistema de filas do Laravel.

3. **Relacionamento com a Tabela de Pagamentos:**
   - Criar uma tabela no banco de dados que relacione os e-mails a serem enviados com os pagamentos correspondentes. Essa tabela pode armazenar informações adicionais relevantes para o controle do envio dos e-mails, como o status do envio, tentativas de envio, entre outros.

4. **Monitoramento e Controle:**
   - Implementar um mecanismo para monitorar o status dos envios de e-mails, utilizando ferramentas do Laravel para verificar o status da fila de e-mails, reenviar e-mails falhados, e gerenciar retries automáticos.

5. **Integração com Eventos ou Observadores:**
   - Integrar o job de envio de e-mails com eventos ou observadores no Laravel. Isso permite que o job seja disparado automaticamente em resposta a determinados eventos no sistema, como a confirmação de um pagamento ou a atualização de status.

### Uso de Constantes
 - Utilize constantes para consolidar mensagens de erro e outros valores constantes importantes no sistema. Promovendo consistência, facilidade de manutenção e reutilização das mensagens ao longo do código.

### Banco de dados
 - Ajustar ambiente de banco para que o mesmo possa ser compartilhado com a equipe no desenvolvimento da aplicação.
