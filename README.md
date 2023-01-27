<h1> Tutorial SNS + Lambda </h1>

![AWS_Lambda_SNS drawio](https://user-images.githubusercontent.com/40245102/215133764-ed6dbba1-de85-47a9-920f-8170e8736e14.png)


### 1 - SNS:

- criar o tópico;
  - Escolha o tipo (FIFO, Padrão);
  - Padrão (permite protocolos SMS, EMAIL e etc);
  - Dê um nome e nome de exibição.
- criar assinatura;
  - Selecione o ARN do tópico criado;
  - Escolha o protocolo (SMS, EMAIL e etc);

### 2 - Lambda

- Código Node 12

```jsx
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });
function snsRequest(mensagem) {
  var params = {
    Message: mensagem,
    TopicArn: "arn:aws:sns:us-east-1:123456789012:myTopic",
  };
  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();
}
exports.handler = (event, context, callback) => {
  snsRequest("Enviando mensagem");
};
```

- Código Python 3.9

```python
import boto3

def send_sns(message, subject):
    client = boto3.client("sns")
    topic_arn = 'arn:aws:sns:us-east-1:085959936702:snstopic'
    client.publish(
        TopicArn=topic_arn, Message=message, Subject=subject)

def lambda_handler(event, context):
    message = "Hello from lambda!"
    subject = "From  Lambda"
    send_sns(message, subject)
```

- Crie um teste
  - Escolha um nome;
  - Conteúdo (pode ser um json vazio)
- Adicione permissões:
  - Em configuração>Permissões>Adicionar permissões:
    - Escolha Serviço da AWS
    - Insira um ID (pode ser qualquer nome)
    - Insira o ARN do Topico criado no SNS
    - Escolha a Ação lambda:PublishVersion
  - Adicione a politica:
    - Em IAM>Funções:
      - Escolha a função criada (em lambda Nome da Função, ex.: snsPublish-role-reri48349
      - Escolha ‘AmazonSNSFullAccess’
- Testar
