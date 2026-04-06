// Ajusta textarea do objetivo dinamicamente
document.getElementById("objetivo").addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

// Função de estimativa de páginas
function atualizarEstimativa() {
  const texto = document.getElementById("previewCurriculo").innerText;
  const caracteresPorPagina = 1800; 
  const paginas = Math.max(1, Math.ceil(texto.length / caracteresPorPagina));
  document.getElementById("contadorPaginas").innerText = `Estimativa: ${paginas} página(s) A4`;
}

// Função genérica para confirmar exclusão
function confirmarExclusao(botao) {
  if (confirm("Você realmente quer excluir este item?")) {
    botao.closest("div").remove();
    atualizarPreview();
  }
}

// Funções para adicionar blocos
function addProjeto() {
  const container = document.getElementById("projetos");
  const div = document.createElement("div");
  div.style.marginBottom = "12px";
  div.innerHTML = `
    <input type="text" placeholder="Título do Projeto"><br>
    <textarea rows="3" placeholder="Objetivo do projeto"></textarea><br>
    <input type="text" placeholder="Tecnologias/Ferramentas"><br>
    <input type="text" placeholder="Link do Projeto"><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Remover</button>
    <br><br>
  `;
  container.appendChild(div);
  div.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", atualizarPreview);
  });
  atualizarPreview();
}

function addExperiencia() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Empresa"><br>
    <input type="text" placeholder="Cargo"><br>
    <label>Início:</label><input type="date" class="inicio"><br>
    <label>Fim:</label><input type="date" class="fim"><br>
    <select onchange="toggleEmpregoAtual(this)">
      <option value="">Selecione</option>
      <option value="atual">Emprego Atual</option>
      <option value="antigo">Emprego Antigo</option>
    </select><br>
    <textarea placeholder="Descrição" rows="5"></textarea><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
  `;
  document.getElementById("experiencias").appendChild(div);
  atualizarPreview();
}
function toggleEmpregoAtual(select) {
  const fim = select.parentNode.querySelector(".fim");
  fim.style.display = select.value === "atual" ? "none" : "block";
}

function addFormacao() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Curso"><br>
    <input type="text" placeholder="Instituição"><br>
    <select onchange="toggleFormacaoAno(this)">
      <option value="concluido">Concluído</option>
      <option value="cursando">Cursando</option>
    </select><br>
    <input type="text" class="ano" placeholder="Ano de conclusão" style="display:none;">
    <input type="text" class="termino" placeholder="Previsão de término" style="display:none;"><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
  `;
  document.getElementById("formacoes").appendChild(div);
}
function toggleFormacaoAno(select) {
  const ano = select.parentNode.querySelector(".ano");
  const termino = select.parentNode.querySelector(".termino");
  ano.style.display = select.value === "concluido" ? "block" : "none";
  termino.style.display = select.value === "cursando" ? "block" : "none";
}

function addHabilidade() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Habilidade">
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br>
  `;
  document.getElementById("habilidades").appendChild(div);
  atualizarPreview();
}

function addCurso() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Nome do Curso"><br>
    <input type="text" placeholder="Instituição"><br>
    <select onchange="toggleCursoStatus(this)">
      <option value="">Selecione</option>
      <option value="concluido">Concluído</option>
      <option value="cursando">Cursando</option>
    </select><br>
    <input type="text" class="ano" placeholder="Ano de conclusão" style="display:none;">
    <input type="text" class="termino" placeholder="Data prevista (dia/mês/ano)" style="display:none;"><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
  `;
  document.getElementById("cursos").appendChild(div);
  atualizarPreview();
}
function toggleCursoStatus(select) {
  const ano = select.parentNode.querySelector(".ano");
  const termino = select.parentNode.querySelector(".termino");
  ano.style.display = (select.value === "concluido") ? "block" : "none";
  termino.style.display = (select.value === "cursando") ? "block" : "none";
}

function addIdioma() {
  const div = document.createElement("div");
  div.innerHTML = `
    <select onchange="toggleIdiomaOutro(this)" class="idioma">
      <option value="portugues">Português</option>
      <option value="espanhol">Espanhol</option>
      <option value="ingles">Inglês</option>
      <option value="outro">Outro</option>
    </select>
    <select class="nivel">
      <option value="basico">Básico</option>
      <option value="intermediario">Intermediário</option>
      <option value="avancado">Avançado</option>
      <option value="nativo">Nativo</option>
      <option value="tecnico">Técnico</option>
    </select>
    <input type="text" class="idiomaOutro" placeholder="Informe o idioma" style="display:none;">
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
  `;
  document.getElementById("idiomas").appendChild(div);
  atualizarPreview();
}
function toggleIdiomaOutro(select) {
  const outroInput = select.parentNode.querySelector(".idiomaOutro");
  outroInput.style.display = select.value === "outro" ? "block" : "none";
}

// Remover foto com confirmação
function removerFoto() {
  if (confirm("Você realmente quer remover a foto?")) {
    const fotoInput = document.getElementById("fotoCandidato");
    fotoInput.value = "";
    document.querySelector(".preview-header").innerHTML = "<h3>" + document.getElementById("nomeCompleto").value + "</h3>";
    atualizarPreview();
  }
}

// Função para formatar telefone (apenas uma vez no topo)
function formatTelefone(telefone) {
  telefone = telefone.replace(/\D/g, ""); // remove tudo que não for número

  if (telefone.length === 11) {
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (telefone.length === 10) {
    return telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }
  return telefone;
}


// ===== Bullets automáticos p/ frases (Projetos) =====

// Aceita maiúsculas com acento (PT-BR)
const RE_UPPER_PT = /^[A-ZÀ-ÖØ-Ý]/;

// Quebra uma linha em frases quando encontra ". " / "! " / "? " antes de maiúscula
function splitEmFrases(linha) {
  const s = (linha || "");
  const out = [];
  const re = /[.!?]\s+(?=[A-ZÀ-ÖØ-Ý])/g;

  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    const end = m.index + 1;       // inclui pontuação (.,!,?)
    out.push(s.slice(last, end));
    last = re.lastIndex;           // pula espaços após pontuação
  }
  out.push(s.slice(last));
  return out;
}

/**
 * Adiciona "• " para cada frase que começa com letra maiúscula.
 * - Mantém bullets existentes (não duplica)
 * - Trata quebras de linha e múltiplas frases na mesma linha
 * - Retorna em formato texto com \n (ideal p/ PDF e TXT)
 */
function bulletizarFrasesMaiusculas(texto) {
  if (!texto) return "";

  const limpo = texto.replace(/\r/g, "").trim();
  if (!limpo) return "";

  const linhas = limpo.split(/\n+/);
  const saida = [];

  linhas.forEach(l => {
    const partes = splitEmFrases(l);

    partes.forEach(p => {
      const frase = (p || "").trim();
      if (!frase) return;

      // Se já começar com bullet/hífen, não duplica
      if (/^([•\u2022\-–—])\s*/.test(frase)) {
        // padroniza bullet visual (opcional)
        saida.push(frase.replace(/^([•\u2022])\s*/, "• "));
        return;
      }

      // Só aplica bullet se começar com letra maiúscula
      if (RE_UPPER_PT.test(frase)) saida.push(`• ${frase}`);
      else saida.push(frase);
    });
  });

  return saida.join("\n");
}

// Função de pré-visualização
function atualizarPreview() {
  let html = "";

  // Nome + Foto + Subtítulo
  const nome = (document.getElementById("nomeCompleto") || {}).value || "";
  const subtitulo = (document.getElementById("subtitulo") || {}).value.trim() || "";
  const fotoInput = document.getElementById("fotoCandidato");
  let fotoHTML = "";

  if (fotoInput && fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fotoHTML = `<img src="${e.target.result}" alt="Foto do candidato" style="max-width:100px; border-radius:6px; display:block; margin:0 auto;">`;
      document.querySelector(".preview-header").innerHTML =
        `<div style="text-align:center;">
           ${fotoHTML}
           <h3 style="margin:5px 0;">${nome}</h3>
           ${subtitulo ? `<h4 style="margin:0; font-style:italic; font-weight:normal;">${subtitulo}</h4>` : ""}
         </div>`;
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    document.querySelector(".preview-header").innerHTML =
      `<div style="text-align:center;">
         <h3 style="margin:5px 0;">${nome}</h3>
         ${subtitulo ? `<h4 style="margin:0; font-style:italic; font-weight:normal;">${subtitulo}</h4>` : ""}
       </div>`;
  }

  // Dados de contato
  const idade = (document.getElementById("idade") || {}).value || "";
  const telefone = (document.getElementById("telefone") || {}).value || "";
  const email = (document.getElementById("email") || {}).value || "";
  const localizacao = (document.getElementById("localizacao") || {}).value || "";
  const linkedin = (document.getElementById("linkedin") || {}).value || "";
  const portfolio = (document.getElementById("portfolio") || {}).value || "";
  const pretensao = (document.getElementById("pretensaoSalarial") || {}).value.trim() || "";

  if (idade || telefone || email || localizacao || linkedin || portfolio || pretensao) {
    html += `<h2>Dados de Contato</h2><ul style="font-size:12px; line-height:1.3;">`;
    if (idade) html += `<li>Idade: ${idade}</li>`;
    if (telefone) html += `<li>Telefone: ${telefone}</li>`;
    if (email) html += `<li>E-mail: ${email}</li>`;
    if (localizacao) html += `<li>Localização: ${localizacao}</li>`;
    if (linkedin) html += `<li>LinkedIn: ${linkedin}</li>`;
    if (portfolio) html += `<li>Portfólio: ${portfolio}</li>`;
    if (pretensao) html += `<li>Pretensão Salarial: ${pretensao}</li>`;
    html += `</ul>`;
  }

  // Objetivo
  const objetivo = document.getElementById("objetivo").value;
  if (objetivo) {
    html += `<h2>Objetivo</h2><p style="font-size:12px; line-height:1.3;">${objetivo}</p>`;
  }

  // Projetos Acadêmicos
const projetos = Array.from(document.querySelectorAll("#projetos div")).map(div => {
  const titulo = (div.querySelector("input[placeholder='Título do Projeto']") || {}).value || "";
  const objetivoProjeto = (div.querySelector("textarea") || {}).value || "";
  const tecnologias = (div.querySelector("input[placeholder='Tecnologias/Ferramentas']") || {}).value || "";
  const link = (div.querySelector("input[placeholder='Link do Projeto']") || {}).value || "";

  if (!titulo && !objetivoProjeto && !tecnologias && !link) return "";

  // ✅ BULLETS AUTOMÁTICOS por frase (maiúscula)
  const objetivoComBullets = bulletizarFrasesMaiusculas(objetivoProjeto);
  const objetivoHTML = objetivoComBullets
    ? objetivoComBullets.split("\n").join("<br>")
    : "";

  return `<p style="font-size:12px; line-height:1.3; margin:3px 0;">
            <strong>${titulo}</strong><br>
            ${objetivoHTML ? `Objetivo:<br><span style="display:block; margin-left:12px;">${objetivoHTML}</span><br>` : ""}
            ${tecnologias ? `Tecnologias: ${tecnologias}<br>` : ""}
            ${link ? `Link: ${link}` : ""}
          </p>`;
}).filter(Boolean).join("");


  if (projetos) {
    html += `<h2>Projetos Acadêmicos</h2>${projetos}`;
  }

// Experiências
const experiencias = Array.from(document.querySelectorAll("#experiencias div"))
  .map(div => {
    const empresa = (div.querySelector("input[placeholder='Empresa']") || {}).value || "";
    const cargo = (div.querySelector("input[placeholder='Cargo']") || {}).value || "";
    const inicio = div.querySelector(".inicio")?.value || "";
    const fim = div.querySelector(".fim")?.value || "";
    const descricao = div.querySelector("textarea")?.value || "";

    if (!empresa && !cargo && !descricao) return "";

    // ✅ Formata descrição com bullets por linha
    const descricaoFormatada = descricao
      .replace(/\r/g, "")
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean)
      .map(l => {
        if (/^([•\-–—])\s*/.test(l)) return l; // evita duplicar bullet
        return `• ${l}`;
      })
      .join("<br>");

    return `
      <p style="font-size:12px; line-height:1.3; margin:3px 0;">
        <strong>${cargo}</strong> - ${empresa} (${inicio || "?"} - ${fim || "?"})<br>
        ${descricaoFormatada}
      </p>
    `;
  })
  .filter(Boolean)
  .join("");

if (experiencias) {
  html += `<h2>Experiência Profissional</h2>${experiencias}`;
}


  // Formação Acadêmica
  const formacoes = Array.from(document.querySelectorAll("#formacoes div")).map(div => {
    const curso = (div.querySelector("input[placeholder='Curso']") || {}).value || "";
    const instituicao = (div.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = div.querySelector(".ano")?.value || "";
    const termino = div.querySelector(".termino")?.value || "";
    const status = div.querySelector("select").value;

    if (!curso && !instituicao) return "";

    let infoAno = "";
    if (status === "concluido" && ano) infoAno = ano;
    if (status === "cursando" && termino) infoAno = "Previsão: " + termino;

    return `<li>${curso} - ${instituicao} (${infoAno})</li>`;
  }).filter(Boolean).join("");

  if (formacoes) {
    html += `<h2>Formação Acadêmica</h2><ul style="font-size:12px; line-height:1.3; margin:3px 0;">${formacoes}</ul>`;
  }

  // Habilidades Técnicas
  const habilidades = Array.from(document.querySelectorAll("#habilidades input"))
    .map(i => i.value.trim())
    .filter(Boolean);
  if (habilidades.length) {
    html += `<h2>Habilidades Técnicas</h2><ul style="font-size:12px; line-height:1.3; margin:3px 0;">`;
    habilidades.forEach(h => {
      html += `<li>${h}</li>`;
    });
    html += `</ul>`;
  }

  // Cursos
  const cursos = Array.from(document.querySelectorAll("#cursos div")).map(div => {
    const nomeCurso = (div.querySelector("input[placeholder='Nome do Curso']") || {}).value || "";
    const instituicao = (div.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = div.querySelector(".ano")?.value || "";
    const termino = div.querySelector(".termino")?.value || "";
    if (!nomeCurso && !instituicao) return "";
    return `<li>${nomeCurso} - ${instituicao} (${ano || termino || ""})</li>`;
  }).filter(Boolean).join("");
  if (cursos) {
    html += `<h2>Cursos</h2><ul style="font-size:12px; line-height:1.3; margin:3px 0;">${cursos}</ul>`;
  }

    // Idiomas
  const idiomas = Array.from(document.querySelectorAll("#idiomas div")).map(div => {
    let idioma = div.querySelector(".idioma")?.value || "";
    let nivel = div.querySelector(".nivel")?.value || "";
    const outro = div.querySelector(".idiomaOutro")?.value || "";

    if (!idioma && !nivel) return "";

    if (idioma === "portugues") idioma = "Português";
    else if (idioma === "ingles") idioma = "Inglês";
    else if (idioma === "espanhol") idioma = "Espanhol";
    else if (idioma === "outro") idioma = outro;

    if (nivel === "basico") nivel = "Básico";
    else if (nivel === "intermediario") nivel = "Intermediário";
    else if (nivel === "avancado") nivel = "Avançado";
    else if (nivel === "nativo") nivel = "Nativo";
    else if (nivel === "tecnico") nivel = "Técnico";

    return `<li>${idioma} - ${nivel}</li>`;
  }).filter(Boolean).join("");

  if (idiomas) {
    html += `<h2>Idiomas</h2><ul style="font-size:12px; line-height:1.2; margin:2px 0;">${idiomas}</ul>`;
  }

 // Atualiza preview e contador
document.getElementById("previewCurriculo").innerHTML = html;
atualizarSugestoesPalavras();
atualizarEstimativa();
}

// Eventos para atualizar preview em tempo real
["nomeCompleto","subtitulo","telefone","email","localizacao","linkedin","portfolio","objetivo"].forEach(id => {
  document.getElementById(id).addEventListener("input", atualizarPreview);
});
document.querySelectorAll("#projetos input, #projetos textarea").forEach(el => {
  el.addEventListener("input", atualizarPreview);
});

// Listener da foto
document.getElementById("fotoCandidato").addEventListener("change", atualizarPreview);

// Função para alternar exibição da caixa de termos da vaga
function togglePalavrasChaves() {
  const checkbox = document.getElementById("ativarPalavrasChaves");
  const bloco = document.getElementById("blocoPalavrasChaves");
  bloco.style.display = checkbox.checked ? "block" : "none";
  atualizarSugestoesPalavras();
}

// ===== Assistente de adaptação à vaga (100% limpo) =====

// 1) Escape HTML (segurança para innerHTML)
function escapeHTML(str) {
  return (str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// 2) Normalização (acentos + hífens especiais)
function normalizarTexto(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[\u2010\u2011\u2012\u2013\u2014]/g, "-"); // hífens especiais -> "-"
}

// 3) Extrair termos do textarea (vírgula, ; ou quebra de linha)
function extrairTermos(texto) {
  const termos = (texto || "")
    .split(/[,;\n]+/)
    .map(t => t.trim())
    .filter(Boolean);

  // remove duplicados mantendo ordem (por normalização)
  const seen = new Set();
  const unicos = [];
  termos.forEach(t => {
    const key = normalizarTexto(t);
    if (!seen.has(key)) {
      seen.add(key);
      unicos.push(t);
    }
  });

  return unicos;
}

// 4) Sugestão de onde encaixar (Logística + TI + Cyber leve)
function sugerirOndeColocar(termo) {
  const t = normalizarTexto(termo);

  if (/(python|sql|excel|power bi|tableau|etl|api|rest|javascript|node|react|git|linux|windows|aws|azure|docker|kubernetes|grafana|prometheus|wms|tms|sap|totvs)/.test(t)) {
    return "Habilidades / Projetos";
  }
  if (/(inventario|estoque|armazenagem|frota|roteirizacao|picking|packing|expedicao|recebimento|acuracidade|lead time|kpi|sla|processo|melhoria|otimizacao|lean|six sigma|kanban)/.test(t)) {
    return "Experiência / Projetos";
  }
  if (/(iso 27001|sgsi|lgpd|compliance|auditoria|gestao de riscos|controles|politicas|seguranca da informacao)/.test(t)) {
    return "Objetivo / Experiência / Certificações";
  }
  if (/(certificacao|certificado|curso|formacao|graduacao|pos|mba|itil|scrum|pmp)/.test(t)) {
    return "Cursos / Formação / Certificações";
  }

  return "Objetivo / Experiência";
}

function exemploFraseNatural(termo) {
  return `Ex.: “Atuei com ${termo} em rotinas do time, aplicando no processo e registrando resultados/indicadores.”`;
}

// 5) Função principal: calcula encontrados x faltantes e escreve no painel
function atualizarSugestoesPalavras() {
  const chk = document.getElementById("ativarPalavrasChaves");
  const area = document.getElementById("sugestoesPalavras");
  const campo = document.getElementById("textoPalavrasChaves");

  if (!area) return;

  // se não ativado, limpa
  if (!chk?.checked) {
    area.innerHTML = "";
    return;
  }

  const termos = extrairTermos(campo?.value || "");
  if (termos.length === 0) {
    area.innerHTML = "<em>Dica: cole termos da própria vaga (ex.: WMS, inventário cíclico, KPIs, ISO 27001...).</em>";
  }

  const base = normalizarTexto(document.getElementById("previewCurriculo")?.innerText || "");

  const encontrados = [];
  const faltantes = [];

  termos.forEach(term => {
    const n = normalizarTexto(term);
    if (n && base.includes(n)) encontrados.push(term);
    else faltantes.push(term);
  });

  let html = "";
html += `<strong>Termos encontrados no currículo:</strong> ${
  encontrados.length ? escapeHTML(encontrados.join(", ")) : "<em>nenhum</em>"
}<br><br>`;

html += `<strong>Termos faltando (sugestão de encaixe):</strong><br>`;

  if (!faltantes.length) {
    html += "<em>Ótimo! Todos os termos já aparecem no texto do currículo.</em>";
  } else {
    html += "<ul style='margin:6px 0 0 18px;'>";
faltantes.forEach(term => {
  const safeTerm = escapeHTML(term);
  const secao = escapeHTML(sugerirOndeColocar(term));
  const ex = escapeHTML(exemploFraseNatural(term));
  html += `<li><strong>${safeTerm}</strong> → colocar em: <em>${secao}</em><br><span style="color:#666;">${ex}</span></li>`;
});
html += "</ul>";

    html += "<div style='margin-top:8px; color:#555;'>";
    html += "✅ Dica: prefira inserir os termos dentro das atividades e resultados (contexto), em vez de repetir uma lista.";
    html += "</div>";
  }

  area.innerHTML = html;

}

// 6) Listeners (registrar uma vez)
(function conectarAssistenteTermos() {
  const campo = document.getElementById("textoPalavrasChaves");
  const chk = document.getElementById("ativarPalavrasChaves");

  if (campo) campo.addEventListener("input", atualizarSugestoesPalavras);
  if (chk) chk.addEventListener("change", atualizarSugestoesPalavras);
})();


// Função para gerar PDF
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 30;

  function formatarDataBR(dataStr) {
    if (!dataStr) return "";
    const partes = dataStr.split("-");
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataStr;
  }

  const fotoInput = document.getElementById("fotoCandidato");
  if (fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const mimeType = fotoInput.files[0].type.toLowerCase();
      const tipoImagem = mimeType.includes("png") ? "PNG" :
                         (mimeType.includes("jpg") || mimeType.includes("jpeg")) ? "JPEG" : "JPEG";
      doc.addImage(e.target.result, tipoImagem, 10, 10, 30, 40);
      y = 55;
      finalizarPDF(doc, y, formatarDataBR);
      doc.save("curriculo.pdf");
    };
    reader.onerror = function() {
      finalizarPDF(doc, y, formatarDataBR);
      doc.save("curriculo.pdf");
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    finalizarPDF(doc, y, formatarDataBR);
    doc.save("curriculo.pdf");
  }
}

// Função para escrever texto com quebra automática de página
function escreverTexto(texto, x, largura, yInicial, doc) {
  let linhas = doc.splitTextToSize(texto, largura);
  linhas.forEach(linha => {
    if (yInicial > 270) {   // limite da página A4
      doc.addPage();
      yInicial = 20;        // reinicia posição Y
    }
    doc.text(linha, x, yInicial);
    yInicial += 5;          // espaçamento entre linhas
  });
  return yInicial;
}

// Função que monta o conteúdo do PDF
function finalizarPDF(doc, y, formatarDataBR) {
  doc.setFont("helvetica", "normal");

  // Cabeçalho - Nome e Subtítulo centralizados
  const nomeCompletoEl = document.getElementById("nomeCompleto");
  const subtituloEl = document.getElementById("subtitulo");
  const nomeCompleto = nomeCompletoEl ? nomeCompletoEl.value.trim() : "";
  const subtitulo = subtituloEl ? subtituloEl.value.trim() : "";

  const pageWidth = doc.internal.pageSize.getWidth();

  if (nomeCompleto) {
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const textWidth = doc.getTextWidth(nomeCompleto);
    const x = (pageWidth - textWidth) / 2;
    doc.text(nomeCompleto, x, 25);
  }

  if (subtitulo) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "italic");
    const textWidth = doc.getTextWidth(subtitulo);
    const x = (pageWidth - textWidth) / 2;
    doc.text(subtitulo, x, 35);
    doc.setFont("helvetica", "normal");
  }

  y = 55;

  // Dados de contato
const idade = (document.getElementById("idade") || {}).value || "";
let telefone = (document.getElementById("telefone") || {}).value || "";
telefone = formatTelefone(telefone);
const email = (document.getElementById("email") || {}).value || "";
const localizacao = (document.getElementById("localizacao") || {}).value || "";
const linkedin = (document.getElementById("linkedin") || {}).value || "";
const portfolio = (document.getElementById("portfolio") || {}).value || "";
const pretensao = (document.getElementById("pretensaoSalarial") || {}).value || "";

if (idade || telefone || email || localizacao || linkedin || portfolio || pretensao) {
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  y = escreverTexto("Dados de Contato:", 10, 180, y, doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  if (idade) y = escreverTexto(`\u2022 Idade: ${idade}`, 12, 170, y, doc);
  if (telefone) y = escreverTexto(`\u2022 Telefone: ${telefone}`, 12, 170, y, doc);
  if (email) y = escreverTexto(`\u2022 E-mail: ${email}`, 12, 170, y, doc);
  if (localizacao) y = escreverTexto(`\u2022 Localização: ${localizacao}`, 12, 170, y, doc);
  if (linkedin) y = escreverTexto(`\u2022 LinkedIn: ${linkedin}`, 12, 170, y, doc);
  if (portfolio) y = escreverTexto(`\u2022 Portfólio: ${portfolio}`, 12, 170, y, doc);
  if (pretensao) y = escreverTexto(`\u2022 Pretensão Salarial: ${pretensao}`, 12, 170, y, doc);
  y += 8;
}


  // Objetivo
  const objetivoEl = document.getElementById("objetivo");
  const objetivo = objetivoEl ? objetivoEl.value.trim() : "";
  if (objetivo) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    y = escreverTexto("Objetivo:", 10, 180, y, doc);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y = escreverTexto(objetivo, 12, 180, y, doc);
    y += 8;
  }

  // Projetos Acadêmicos
let projetos = Array.from(document.querySelectorAll("#projetos div"));
if (projetos.some(p => {
  const tituloEl = p.querySelector("input[placeholder='Título do Projeto']");
  const objetivoEl = p.querySelector("textarea");
  const tecnologiasEl = p.querySelector("input[placeholder='Tecnologias/Ferramentas']");
  const linkEl = p.querySelector("input[placeholder='Link do Projeto']");
  return (tituloEl && tituloEl.value.trim()) || 
         (objetivoEl && objetivoEl.value.trim()) || 
         (tecnologiasEl && tecnologiasEl.value.trim()) || 
         (linkEl && linkEl.value.trim());
})) {
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  y = escreverTexto("Projetos Acadêmicos:", 10, 180, y, doc); // título alinhado à esquerda

  projetos.forEach(p => {
    const tituloEl = p.querySelector("input[placeholder='Título do Projeto']");
    const objetivoEl = p.querySelector("textarea");
    const tecnologiasEl = p.querySelector("input[placeholder='Tecnologias/Ferramentas']");
    const linkEl = p.querySelector("input[placeholder='Link do Projeto']");

    if (tituloEl && tituloEl.value.trim()) {
      doc.setFont("helvetica", "bold");
      y = escreverTexto(tituloEl.value.trim(), 12, 180, y + 4, doc); // título do projeto
    }

    doc.setFont("helvetica", "normal");

if (objetivoEl && objetivoEl.value.trim()) {
  const objetivoComBullets = bulletizarFrasesMaiusculas(objetivoEl.value.trim());

  // Título "Objetivo:" (mantém alinhado à esquerda)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11); // ✅ garante o tamanho do texto
  y = escreverTexto("Objetivo:", 10, 180, y + 2, doc);

  // Bullets com recuo
  y = escreverTexto(objetivoComBullets, 16, 165, y, doc);

  // (opcional) um respiro depois do objetivo
  // y += 2;
}
    if (tecnologiasEl && tecnologiasEl.value.trim()) {
      y = escreverTexto(`Tecnologias: ${tecnologiasEl.value.trim()}`, 10, 180, y + 2, doc);
    }
    if (linkEl && linkEl.value.trim()) {
      y = escreverTexto(`Link: ${linkEl.value.trim()}`, 10, 180, y + 2, doc);
    }

    y += 4; // espaçamento menor entre projetos
  });

  y += 8; // espaçamento final da seção
}

// Experiências
let experiencias = Array.from(document.querySelectorAll("#experiencias div"));
if (experiencias.some(exp => {
  const empresaEl = exp.querySelector("input[placeholder='Empresa']");
  const cargoEl = exp.querySelector("input[placeholder='Cargo']");
  const descEl = exp.querySelector("textarea");
  return (empresaEl && empresaEl.value.trim()) || (cargoEl && cargoEl.value.trim()) || (descEl && descEl.value.trim());
})) {
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  y = escreverTexto("Experiência Profissional:", 10, 180, y, doc);
  doc.setFont("helvetica", "normal");

  experiencias.forEach(exp => {
    const empresa = (exp.querySelector("input[placeholder='Empresa']") || {}).value || "";
    const cargo = (exp.querySelector("input[placeholder='Cargo']") || {}).value || "";
    const inicio = formatarDataBR((exp.querySelector(".inicio") || {}).value || "");
    const fim = formatarDataBR((exp.querySelector(".fim") || {}).value || "");
    const status = (exp.querySelector("select") || {}).value || "";
    const descricao = (exp.querySelector("textarea") || {}).value || "";

    if (empresa || cargo || descricao) {
      doc.setFontSize(11);
      // Cargo e empresa continuam iguais
      y = escreverTexto(`• ${cargo} - ${empresa} (${inicio} até ${status === "atual" ? "o momento" : fim})`, 12, 170, y, doc);

      // Descrição com recuo e espaçamento extra
if (descricao) {
  const linhas = descricao
    .replace(/\r/g, "")
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => {
      // se já começar com bullet, hífen ou marcador, não duplica
      if (/^([•\u2022\-–—])\s+/.test(l)) return l;
      return `\u2022 ${l}`;
    });

  const textoDescricao = linhas.join("\n");
  y = escreverTexto(textoDescricao, 16, 165, y, doc);
  y += 6;
}

    }
  });
  y += 8;
}

  // Formação Acadêmica
  let formacoes = Array.from(document.querySelectorAll("#formacoes div"));
  if (formacoes.some(f => {
    const cursoEl = f.querySelector("input[placeholder='Curso']");
    const instEl = f.querySelector("input[placeholder='Instituição']");
    return (cursoEl && cursoEl.value.trim()) || (instEl && instEl.value.trim());
  })) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    y = escreverTexto("Formação Acadêmica:", 10, 180, y, doc);
    doc.setFont("helvetica", "normal");

    formacoes.forEach(f => {
      const curso = (f.querySelector("input[placeholder='Curso']") || {}).value || "";
      const instituicao = (f.querySelector("input[placeholder='Instituição']") || {}).value || "";
      const ano = formatarDataBR((f.querySelector(".ano") || {}).value || "");
      const termino = formatarDataBR((f.querySelector(".termino") || {}).value || "");
      const status = (f.querySelector("select") || {}).value || "";

      if (curso || instituicao) {
        let textoFormacao = `• ${curso} - ${instituicao}`;
        if (status === "concluido" && ano) textoFormacao += ` (${ano})`;
        if (status === "cursando" && termino) textoFormacao += ` (Previsão: ${termino})`;

        doc.setFontSize(11);
        y = escreverTexto(textoFormacao, 12, 170, y, doc);
      }
    });
    y += 8;
  }

  // Habilidades Técnicas
  const habilidades = Array.from(document.querySelectorAll("#habilidades input"))
                           .map(h => h.value.trim())
                           .filter(Boolean);
  if (habilidades.length > 0) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    y = escreverTexto("Habilidades Técnicas:", 10, 180, y, doc);
    doc.setFont("helvetica", "normal");
    habilidades.forEach(h => {
      doc.setFontSize(11);
      y = escreverTexto(`• ${h}`, 12, 170, y, doc);
    });
    y += 8;
  }

  // Cursos
  let cursos = Array.from(document.querySelectorAll("#cursos div"));
  if (cursos.some(c => {
    const nomeEl = c.querySelector("input[placeholder='Nome do Curso']");
    const instEl = c.querySelector("input[placeholder='Instituição']");
    return (nomeEl && nomeEl.value.trim()) || (instEl && instEl.value.trim());
  })) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    y = escreverTexto("Cursos:", 10, 180, y, doc);
    doc.setFont("helvetica", "normal");

    cursos.forEach(c => {
      const nomeCurso = (c.querySelector("input[placeholder='Nome do Curso']") || {}).value || "";
      const instituicao = (c.querySelector("input[placeholder='Instituição']") || {}).value || "";
      const ano = formatarDataBR((c.querySelector(".ano") || {}).value || "");
      const termino = formatarDataBR((c.querySelector(".termino") || {}).value || "");
      const status = (c.querySelector("select") || {}).value || "";

      if (nomeCurso || instituicao) {
        let textoCurso = `• ${nomeCurso} - ${instituicao}`;
        if (status === "concluido" && ano) textoCurso += ` (${ano})`;
        if (status === "cursando" && termino) textoCurso += ` (Previsão: ${termino})`;

        doc.setFontSize(11);
        y = escreverTexto(textoCurso, 12, 170, y, doc);
      }
    });
    y += 8;
  }

  // Idiomas
  let idiomas = Array.from(document.querySelectorAll("#idiomas div"));
  if (idiomas.some(i => {
    const idiomaEl = i.querySelector(".idioma");
    const outroEl = i.querySelector(".idiomaOutro");
    return (idiomaEl && idiomaEl.value.trim()) || (outroEl && outroEl.value.trim());
  })) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    y = escreverTexto("Idiomas:", 10, 180, y, doc);
    doc.setFont("helvetica", "normal");

    idiomas.forEach(i => {
      let idiomaSelect = (i.querySelector(".idioma") || {}).value || "";
      let nivel = (i.querySelector(".nivel") || {}).value || "";
      const outro = (i.querySelector(".idiomaOutro") || {}).value || "";

      if (idiomaSelect === "portugues") idiomaSelect = "Português";
      else if (idiomaSelect === "ingles") idiomaSelect = "Inglês";
      else if (idiomaSelect === "espanhol") idiomaSelect = "Espanhol";
      else if (idiomaSelect === "outro") idiomaSelect = outro;

      if (nivel === "basico") nivel = "Básico";
      else if (nivel === "intermediario") nivel = "Intermediário";
      else if (nivel === "avancado") nivel = "Avançado";
      else if (nivel === "nativo") nivel = "Nativo";
      else if (nivel === "tecnico") nivel = "Técnico";

      if (idiomaSelect) {
        doc.setFontSize(11);
        y = escreverTexto(`• ${idiomaSelect} - ${nivel}`, 12, 170, y, doc);
      }
    });
    y += 8;
  }

  // Palavras‑Chave (se ativado)
  const ativarPK = document.getElementById("ativarPalavrasChaves")?.checked;
  const palavrasChaves = document.getElementById("textoPalavrasChaves")?.value.trim() || "";

  if (ativarPK && palavrasChaves) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    y = escreverTexto("Palavras‑Chave:", 10, 180, y, doc);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // escreve como texto normal (visível) — recomendado
    y = escreverTexto(palavrasChaves, 12, 180, y, doc);
    y += 8;
  }
}
// Função para salvar como TXT
function salvarComoTXT() {
  const nomeCompletoEl = document.getElementById("nomeCompleto");
  const subtituloEl = document.getElementById("subtitulo");
  const pretensaoEl = document.getElementById("pretensaoSalarial");

  const nomeCompleto = nomeCompletoEl ? nomeCompletoEl.value.trim() || "curriculo" : "curriculo";
  const subtitulo = subtituloEl ? subtituloEl.value.trim() : "";
  const pretensao = pretensaoEl ? pretensaoEl.value.trim() : "";

  let conteudo = "";
  conteudo += `Nome: ${nomeCompleto}\n`;
  if (subtitulo) conteudo += `Subtítulo: ${subtitulo}\n`;
  conteudo += `Idade: ${(document.getElementById("idade") || {}).value || ""}\n`;
  conteudo += `Telefone: ${(document.getElementById("telefone") || {}).value || ""}\n`;
  conteudo += `E-mail: ${(document.getElementById("email") || {}).value || ""}\n`;
  conteudo += `Localização: ${(document.getElementById("localizacao") || {}).value || ""}\n`;
  conteudo += `LinkedIn: ${(document.getElementById("linkedin") || {}).value || ""}\n`;
  conteudo += `Portfólio: ${(document.getElementById("portfolio") || {}).value || ""}\n`;

  if (pretensao) conteudo += `Pretensão Salarial: ${pretensao}\n`;

  conteudo += `\nObjetivo:\n${(document.getElementById("objetivo") || {}).value || ""}\n\n`;

  // Projetos Acadêmicos
  conteudo += "Projetos Acadêmicos:\n";
  Array.from(document.querySelectorAll("#projetos div")).forEach(p => {
    const titulo = (p.querySelector("input[placeholder='Título do Projeto']") || {}).value || "";
    const objetivo = (p.querySelector("textarea") || {}).value || "";
    const tecnologias = (p.querySelector("input[placeholder='Tecnologias/Ferramentas']") || {}).value || "";
    const link = (p.querySelector("input[placeholder='Link do Projeto']") || {}).value || "";

    if (titulo || objetivo || tecnologias || link) {
      conteudo += `- ${titulo}\n`;
      if (objetivo) {
  const objetivoComBullets = bulletizarFrasesMaiusculas(objetivo);

  // Primeira linha com "Objetivo:" e as próximas linhas continuam normalmente
  const linhasObj = objetivoComBullets.split("\n");
  conteudo += `  Objetivo: ${linhasObj.shift() || ""}\n`;
  linhasObj.forEach(l => conteudo += `${l}\n`);
}

      if (tecnologias) conteudo += `  Tecnologias: ${tecnologias}\n`;
      if (link) conteudo += `  Link: ${link}\n`;
    }
  });
  conteudo += "\n";

  // Experiências
  conteudo += "Experiência Profissional:\n";
  Array.from(document.querySelectorAll("#experiencias div")).forEach(exp => {
    const empresa = (exp.querySelector("input[placeholder='Empresa']") || {}).value || "";
    const cargo = (exp.querySelector("input[placeholder='Cargo']") || {}).value || "";
    const inicio = (exp.querySelector(".inicio") || {}).value || "";
    const fim = (exp.querySelector(".fim") || {}).value || "";
    const descricao = (exp.querySelector("textarea") || {}).value || "";
    if (empresa || cargo || descricao) {
      conteudo += `- ${cargo} em ${empresa} (${inicio} - ${fim})\n${descricao}\n`;
    }
  });
  conteudo += "\n";

  // Formação
  conteudo += "Formação Acadêmica:\n";
  Array.from(document.querySelectorAll("#formacoes div")).forEach(f => {
    const curso = (f.querySelector("input[placeholder='Curso']") || {}).value || "";
    const instituicao = (f.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = (f.querySelector(".ano") || {}).value || "";
    const termino = (f.querySelector(".termino") || {}).value || "";
    const status = (f.querySelector("select") || {}).value || "";

    if (status === "concluido" && (curso || instituicao)) {
      conteudo += `- ${curso} - ${instituicao} (${ano})\n`;
    } else if (status === "cursando" && (curso || instituicao)) {
      conteudo += `- ${curso} - ${instituicao} (Previsão: ${termino})\n`;
    } else if (curso || instituicao) {
      conteudo += `- ${curso} - ${instituicao}\n`;
    }
  });
  conteudo += "\n";

  // Habilidades Técnicas (compatível com seu addHabilidade atual)
conteudo += "Habilidades Técnicas:\n";
const habilidades = Array.from(document.querySelectorAll("#habilidades input"))
  .map(i => i.value.trim())
  .filter(Boolean);

habilidades.forEach(hab => {
  conteudo += `- ${hab}\n`;
});
conteudo += "\n";

  // Cursos
  conteudo += "Cursos:\n";
  Array.from(document.querySelectorAll("#cursos div")).forEach(c => {
    const nomeCurso = (c.querySelector("input[placeholder='Nome do Curso']") || {}).value || "";
    const instituicao = (c.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = (c.querySelector(".ano") || {}).value || "";
    const termino = (c.querySelector(".termino") || {}).value || "";
    const status = (c.querySelector("select") || {}).value || "";

    if (status === "concluido" && (nomeCurso || instituicao)) {
      conteudo += `- ${nomeCurso} - ${instituicao} (${ano})\n`;
    } else if (status === "cursando" && (nomeCurso || instituicao)) {
      conteudo += `- ${nomeCurso} - ${instituicao} (Previsão: ${termino})\n`;
    } else if (nomeCurso || instituicao) {
      conteudo += `- ${nomeCurso} - ${instituicao}\n`;
    }
  });
  conteudo += "\n";

  // Idiomas
  conteudo += "Idiomas:\n";
  Array.from(document.querySelectorAll("#idiomas div")).forEach(i => {
    let idiomaSelect = (i.querySelector(".idioma") || {}).value || "";
    let nivel = (i.querySelector(".nivel") || {}).value || "";
    const outro = (i.querySelector(".idiomaOutro") || {}).value || "";

    if (idiomaSelect === "portugues") idiomaSelect = "Português";
    else if (idiomaSelect === "ingles") idiomaSelect = "Inglês";
    else if (idiomaSelect === "espanhol") idiomaSelect = "Espanhol";
    else if (idiomaSelect === "outro") idiomaSelect = outro;

    if (nivel === "basico") nivel = "Básico";
    else if (nivel === "intermediario") nivel = "Intermediário";
    else if (nivel === "avancado") nivel = "Avançado";
    else if (nivel === "nativo") nivel = "Nativo";
    else if (nivel === "tecnico") nivel = "Técnico";

    if (idiomaSelect) conteudo += `- ${idiomaSelect.normalize("NFC")} (${nivel})\n`;
  });
  conteudo += "\n";
    
  // Exportar arquivo TXT
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeCompleto}.txt`;
  link.click();
}

// Função para importar TXT
function importarTXT(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const linhas = e.target.result.split(/\r?\n/);
    let secaoAtual = "";
    let ultimaDiv = null;

    linhas.forEach(linha => {
      if (linha.startsWith("Nome:")) {
        document.getElementById("nomeCompleto").value = linha.replace("Nome:", "").trim();
      }
      else if (linha.startsWith("Subtítulo:")) {
        document.getElementById("subtitulo").value = linha.replace("Subtítulo:", "").trim();
      }
      else if (linha.startsWith("Idade:")) {
        document.getElementById("idade").value = linha.replace("Idade:", "").trim();
      }
      else if (linha.startsWith("Telefone:")) {
        document.getElementById("telefone").value = linha.replace("Telefone:", "").trim();
      }
      else if (linha.startsWith("E-mail:")) {
        document.getElementById("email").value = linha.replace("E-mail:", "").trim();
      }
      else if (linha.startsWith("Localização:")) {
        document.getElementById("localizacao").value = linha.replace("Localização:", "").trim();
      }
      else if (linha.startsWith("LinkedIn:")) {
        document.getElementById("linkedin").value = linha.replace("LinkedIn:", "").trim();
      }
      else if (linha.startsWith("Portfólio:")) {
        document.getElementById("portfolio").value = linha.replace("Portfólio:", "").trim();
      }
      else if (linha.startsWith("Pretensão Salarial:")) {
        document.getElementById("pretensaoSalarial").value = linha.replace("Pretensão Salarial:", "").trim();
      }
      else if (linha.startsWith("Objetivo:")) secaoAtual = "objetivo";
      else if (linha.startsWith("Projetos Acadêmicos:")) secaoAtual = "projetos";
      else if (linha.startsWith("Experiência Profissional:")) secaoAtual = "experiencia";
      else if (linha.startsWith("Formação Acadêmica:")) secaoAtual = "formacao";
      else if (linha.startsWith("Habilidades Técnicas:")) secaoAtual = "habilidade";
      else if (linha.startsWith("Cursos:")) secaoAtual = "curso";
      else if (linha.startsWith("Idiomas:")) secaoAtual = "idioma";

      // Objetivo
      else if (secaoAtual === "objetivo" && linha.trim() !== "") {
        document.getElementById("objetivo").value += linha + "\n";
      }

// Projetos
else if (secaoAtual === "projetos" && linha.trim().startsWith("-")) {
  addProjeto();
  ultimaDiv = document.querySelector("#projetos div:last-child");
  ultimaDiv.querySelector("input[placeholder='Título do Projeto']").value = linha.replace("-", "").trim();

  // limpa objetivo do projeto para não acumular lixo
  ultimaDiv.querySelector("textarea").value = "";
}
else if (secaoAtual === "projetos" && ultimaDiv && linha.trim() !== "") {
  const t = linha.trim();

  if (t.startsWith("Objetivo:")) {
    const textarea = ultimaDiv.querySelector("textarea");
    const texto = t.replace("Objetivo:", "").trim();
    textarea.value += (textarea.value ? "\n" : "") + texto;
  }
  else if (t.startsWith("Tecnologias:")) {
    ultimaDiv.querySelector("input[placeholder='Tecnologias/Ferramentas']").value =
      t.replace("Tecnologias:", "").trim();
  }
  else if (t.startsWith("Link:")) {
    ultimaDiv.querySelector("input[placeholder='Link do Projeto']").value =
      t.replace("Link:", "").trim();
  }
  else {
    // ✅ continuação do objetivo (linhas adicionais)
    const textarea = ultimaDiv.querySelector("textarea");
    textarea.value += (textarea.value ? "\n" : "") + linha;
  }
}

     // Experiências
else if (
  secaoAtual === "experiencia" &&
  (linha.trim().startsWith("-") || linha.trim().startsWith("•"))
) {
  addExperiencia();
  ultimaDiv = document.querySelector("#experiencias div:last-child");

  const partes = linha.trim().replace(/^[-•]\s*/, "").split(" em ");
  const cargo = partes[0].split("(")[0].trim();
  const empresa = partes[1]?.split("(")[0].trim() || "";

  const datas = linha.match(/\((.*?)\)/)?.[1] || "";
  let inicio = "";
  let fim = "";

  if (datas.includes(" até ")) {
    [inicio, fim] = datas.split(" até ");
  } else if (datas.includes(" - ")) {
    [inicio, fim] = datas.split(" - ");
  }

  // campos
  ultimaDiv.querySelector("input[placeholder='Cargo']").value = cargo;
  ultimaDiv.querySelector("input[placeholder='Empresa']").value = empresa;
  ultimaDiv.querySelector(".inicio").value = inicio || "";

  const selectStatus = ultimaDiv.querySelector("select");

  // ✅ define status corretamente
  if (/momento/i.test(fim)) {
    selectStatus.value = "atual";
    ultimaDiv.querySelector(".fim").value = "";
  } else {
    selectStatus.value = "antigo";
    ultimaDiv.querySelector(".fim").value = fim || "";
  }

  // ✅ APLICA o comportamento visual (ESSENCIAL)
  toggleEmpregoAtual(selectStatus);
}
else if (
  secaoAtual === "experiencia" &&
  ultimaDiv &&
  linha.trim() !== ""
) {
  ultimaDiv.querySelector("textarea").value += linha.trim() + "\n";
}

      // Formação
else if (secaoAtual === "formacao" && (linha.trim().startsWith("-") || linha.trim().startsWith("•"))) {
  addFormacao();
  ultimaDiv = document.querySelector("#formacoes div:last-child");

  const textoLinha = linha.trim().replace(/^[-•]\s*/, "");
  const partes = textoLinha.split(" - ");

  ultimaDiv.querySelector("input[placeholder='Curso']").value = (partes[0] || "").trim();
  ultimaDiv.querySelector("input[placeholder='Instituição']").value = (partes[1] || "").split("(")[0].trim();

  // ✅ pega o ÚLTIMO (...) no final da linha (evita pegar (CST) do curso)
  const anoOuTermino = textoLinha.match(/\(([^()]*)\)\s*$/)?.[1] || "";

  const select = ultimaDiv.querySelector("select");

  if (/^\d{4}$/.test(anoOuTermino.trim())) {
    select.value = "concluido";
    toggleFormacaoAno(select); // ✅ mostra input .ano
    ultimaDiv.querySelector(".ano").value = anoOuTermino.trim();
  } else if (anoOuTermino) {
    select.value = "cursando";
    toggleFormacaoAno(select); // ✅ mostra input .termino
    ultimaDiv.querySelector(".termino").value = anoOuTermino.replace("Previsão:", "").trim();
  }
}

// Habilidades (compatível com addHabilidade: placeholder="Habilidade")
else if (secaoAtual === "habilidade" && /^[-•]\s*/.test(linha.trim())) {
  addHabilidade();
  ultimaDiv = document.querySelector("#habilidades div:last-child");

  const texto = linha.trim().replace(/^[-•]\s*/, "").trim();

  const inputHab = ultimaDiv.querySelector("input[placeholder='Habilidade']") 
                || ultimaDiv.querySelector("input");

  if (inputHab) inputHab.value = texto;
}


      // Cursos
else if (secaoAtual === "curso" && (linha.trim().startsWith("-") || linha.trim().startsWith("•"))) {
  addCurso();
  ultimaDiv = document.querySelector("#cursos div:last-child");

  const textoLinha = linha.trim().replace(/^[-•]\s*/, "");
  const partes = textoLinha.split(" - ");

  ultimaDiv.querySelector("input[placeholder='Nome do Curso']").value = (partes[0] || "").trim();
  ultimaDiv.querySelector("input[placeholder='Instituição']").value = (partes[1] || "").split("(")[0].trim();

  // ✅ pega o ÚLTIMO (...) no final da linha (evita pegar parênteses do nome)
  const anoOuTermino = textoLinha.match(/\(([^()]*)\)\s*$/)?.[1] || "";

  const select = ultimaDiv.querySelector("select");

  if (/^\d{4}$/.test(anoOuTermino.trim())) {
    select.value = "concluido";
    toggleCursoStatus(select); // ✅ mostra input .ano
    ultimaDiv.querySelector(".ano").value = anoOuTermino.trim();
  } else if (anoOuTermino) {
    select.value = "cursando";
    toggleCursoStatus(select); // ✅ mostra input .termino
    ultimaDiv.querySelector(".termino").value = anoOuTermino.replace("Previsão:", "").trim();
  }
}

      // Idiomas
else if (secaoAtual === "idioma" && (linha.trim().startsWith("-") || linha.trim().startsWith("•"))) {
  addIdioma();
  ultimaDiv = document.querySelector("#idiomas div:last-child");
  const partes = linha.trim().replace(/^[-•]\s*/, "").split("(");

        const idiomaTxt = partes[0].trim();
        const nivelTxt = partes[1]?.replace(")", "").trim().toLowerCase() || "";

        if (idiomaTxt.toLowerCase() === "português") ultimaDiv.querySelector(".idioma").value = "portugues";
        else if (idiomaTxt.toLowerCase() === "inglês") ultimaDiv.querySelector(".idioma").value = "ingles";
        else if (idiomaTxt.toLowerCase() === "espanhol") ultimaDiv.querySelector(".idioma").value = "espanhol";
        else {
          ultimaDiv.querySelector(".idioma").value = "outro";
          ultimaDiv.querySelector(".idiomaOutro").value = idiomaTxt;
        }

        if (nivelTxt === "básico") ultimaDiv.querySelector(".nivel").value = "basico";
        else if (nivelTxt === "intermediário") ultimaDiv.querySelector(".nivel").value = "intermediario";
        else if (nivelTxt === "avançado") ultimaDiv.querySelector(".nivel").value = "avancado";
        else if (nivelTxt === "nativo") ultimaDiv.querySelector(".nivel").value = "nativo";
        else if (nivelTxt === "técnico") ultimaDiv.querySelector(".nivel").value = "tecnico";
      }
    });

    atualizarPreview();
  };
  reader.readAsText(file, "utf-8");
}