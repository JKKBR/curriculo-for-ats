# Currículos Profissionais

Aplicação web para criação, edição, pré-visualização e exportação de currículos diretamente no navegador.

## Funcionalidades

- Formulário organizado por seções.
- Pré-visualização atualizada durante o preenchimento.
- Inclusão opcional de foto e subtítulo.
- Cadastro de múltiplas experiências profissionais.
- Cadastro de formação acadêmica, habilidades, cursos e idiomas.
- Estimativa da quantidade de páginas A4.
- Geração de currículo em PDF.
- Exportação e importação em TXT.

## Seções do currículo

- Nome completo
- Subtítulo opcional
- Foto opcional
- Dados de contato
- Objetivo profissional
- Resumo profissional
- Experiência profissional
- Formação acadêmica
- Habilidades técnicas
- Cursos
- Idiomas
- Informações complementares opcionais

## Atualizações aplicadas

### Resumo Profissional

A antiga seção de Projetos Acadêmicos foi substituída por **Resumo Profissional**.

Agora essa seção possui apenas uma caixa de texto. O conteúdo preenchido é apresentado:

- Na pré-visualização do currículo;
- No PDF gerado;
- No arquivo TXT exportado;
- Na importação de arquivos TXT.

### Informações Complementares

Foi adicionada a seção opcional **Informações Complementares**, localizada abaixo de Idiomas.

Essa seção possui uma caixa de texto para conteúdos adicionais. Ela somente aparece na pré-visualização, no PDF e no TXT quando houver algum dado preenchido.

### Remoção do assistente de adaptação à vaga

Foram removidos:

- O campo “Termos da vaga”;
- O botão de ativação do assistente;
- As sugestões automáticas de palavras-chave;
- O código JavaScript e os estilos CSS associados ao recurso.

Essa alteração deixou o formulário mais simples e com menos elementos desnecessários.

## Exportação para PDF

O currículo pode ser gerado em PDF pelo botão **Gerar PDF**. Somente as seções preenchidas e configuradas como opcionais são adicionadas ao documento.

A geração utiliza a biblioteca jsPDF carregada pelo arquivo `index.html`.

## Exportação e importação TXT

O botão **Salvar como TXT** exporta os dados preenchidos em formato de texto.

Também é possível selecionar um arquivo TXT exportado anteriormente para carregar novamente os dados no formulário.

## Estrutura do projeto

```text
curriculo-for-ats/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Como utilizar

1. Abra o arquivo `index.html` em um navegador.
2. Preencha as seções desejadas.
3. Confira o resultado na pré-visualização.
4. Gere o PDF ou salve uma cópia em TXT.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- jsPDF

## Privacidade

O preenchimento e a montagem do currículo acontecem no navegador. A aplicação não exige cadastro.

## Acesso ao projeto

[Curriculo-for-ats](https://jkkbr.github.io/curriculo-for-ats/)
