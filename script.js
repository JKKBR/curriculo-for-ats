const $ = (id) => document.getElementById(id);
const valor = (id) => $(id)?.value?.trim() || "";

function escapeHTML(texto) {
  return String(texto || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textoComQuebras(texto) {
  return escapeHTML(texto).replace(/\r?\n/g, "<br>");
}

function conectarAtualizacao(container) {
  container.querySelectorAll("input, textarea, select").forEach((elemento) => {
    elemento.addEventListener("input", atualizarPreview);
    elemento.addEventListener("change", atualizarPreview);
  });
}

function ajustarAlturaTextarea(elemento) {
  elemento.style.height = "auto";
  elemento.style.height = `${elemento.scrollHeight}px`;
}

function atualizarEstimativa() {
  const texto = $("previewCurriculo")?.innerText || "";
  const paginas = Math.max(1, Math.ceil(texto.length / 1800));
  if ($("contadorPaginas")) {
    $("contadorPaginas").innerText = `Estimativa: ${paginas} página(s) A4`;
  }
}

function confirmarExclusao(botao) {
  if (confirm("Você realmente quer excluir este item?")) {
    botao.closest("div")?.remove();
    atualizarPreview();
  }
}

function limparResumoProfissional() {
  if (confirm("Você realmente deseja excluir o Resumo Profissional?")) {
    $("resumoProfissional").value = "";
    atualizarPreview();
  }
}

function addProjeto() {
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
  $("projetos").appendChild(div);
  conectarAtualizacao(div);
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
  $("experiencias").appendChild(div);
  conectarAtualizacao(div);
  atualizarPreview();
}

function toggleEmpregoAtual(select) {
  const fim = select.parentNode.querySelector(".fim");
  const atual = select.value === "atual";
  fim.style.display = atual ? "none" : "block";
  if (atual) fim.value = "";
  atualizarPreview();
}

function addFormacao() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Curso"><br>
    <input type="text" placeholder="Instituição"><br>
    <select onchange="toggleFormacaoAno(this)">
      <option value="">Selecione</option>
      <option value="concluido">Concluído</option>
      <option value="cursando">Cursando</option>
    </select><br>
    <input type="text" class="ano" placeholder="Ano de conclusão" style="display:none;">
    <input type="text" class="termino" placeholder="Previsão de término" style="display:none;"><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
  `;
  $("formacoes").appendChild(div);
  conectarAtualizacao(div);
  atualizarPreview();
}

function toggleFormacaoAno(select) {
  const div = select.parentNode;
  div.querySelector(".ano").style.display = select.value === "concluido" ? "block" : "none";
  div.querySelector(".termino").style.display = select.value === "cursando" ? "block" : "none";
  atualizarPreview();
}

function addHabilidade() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Habilidade">
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button><br>
  `;
  $("habilidades").appendChild(div);
  conectarAtualizacao(div);
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
    <input type="text" class="termino" placeholder="Previsão de término" style="display:none;"><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
  `;
  $("cursos").appendChild(div);
  conectarAtualizacao(div);
  atualizarPreview();
}

function toggleCursoStatus(select) {
  const div = select.parentNode;
  div.querySelector(".ano").style.display = select.value === "concluido" ? "block" : "none";
  div.querySelector(".termino").style.display = select.value === "cursando" ? "block" : "none";
  atualizarPreview();
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
  $("idiomas").appendChild(div);
  conectarAtualizacao(div);
  atualizarPreview();
}

function toggleIdiomaOutro(select) {
  const outro = select.parentNode.querySelector(".idiomaOutro");
  outro.style.display = select.value === "outro" ? "block" : "none";
  atualizarPreview();
}

function formatarMesAno(data) {
  if (!data) return "";
  const partes = data.split("-");
  return partes.length >= 2 ? `${partes[1]}/${partes[0]}` : data;
}

function converterMesAnoParaData(texto) {
  const match = String(texto || "").trim().match(/^(\d{2})\/(\d{4})$/);
  return match ? `${match[2]}-${match[1]}-01` : texto;
}

function formatarTelefone(telefone) {
  const numeros = String(telefone || "").replace(/\D/g, "");
  if (numeros.length === 11) return numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  if (numeros.length === 10) return numeros.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  return telefone;
}

function formatarInformacoesComplementares(texto) {
  return String(texto || "")
    .split(/\r?\n/)
    .map((linha) => linha.trim().replace(/^[•\-–—]\s*/, ""))
    .filter(Boolean)
    .map((linha) => `• ${linha}`)
    .join("\n");
}

const RE_UPPER_PT = /^[A-ZÀ-ÖØ-Ý]/;

function splitEmFrases(linha) {
  const texto = linha || "";
  const resultado = [];
  const regex = /[.!?]\s+(?=[A-ZÀ-ÖØ-Ý])/g;
  let inicio = 0;
  let match;
  while ((match = regex.exec(texto)) !== null) {
    resultado.push(texto.slice(inicio, match.index + 1));
    inicio = regex.lastIndex;
  }
  resultado.push(texto.slice(inicio));
  return resultado;
}

function bulletizarFrasesMaiusculas(texto) {
  if (!texto?.trim()) return "";
  const saida = [];
  texto.replace(/\r/g, "").trim().split(/\n+/).forEach((linha) => {
    splitEmFrases(linha).forEach((parte) => {
      const frase = parte.trim();
      if (!frase) return;
      if (/^[•\-–—]\s*/.test(frase)) saida.push(`• ${frase.replace(/^[•\-–—]\s*/, "")}`);
      else saida.push(RE_UPPER_PT.test(frase) ? `• ${frase}` : frase);
    });
  });
  return saida.join("\n");
}

function removerFoto() {
  if (confirm("Você realmente quer remover a foto?")) {
    $("fotoCandidato").value = "";
    atualizarPreview();
  }
}

function nomeIdioma(div) {
  const mapa = { portugues: "Português", ingles: "Inglês", espanhol: "Espanhol" };
  const selecionado = div.querySelector(".idioma")?.value || "";
  return selecionado === "outro" ? div.querySelector(".idiomaOutro")?.value.trim() || "" : mapa[selecionado] || "";
}

function nivelIdioma(div) {
  const mapa = { basico: "Básico", intermediario: "Intermediário", avancado: "Avançado", nativo: "Nativo", tecnico: "Técnico" };
  return mapa[div.querySelector(".nivel")?.value] || "";
}

function atualizarPreview() {
  let html = "";
  const nome = valor("nomeCompleto");
  const subtitulo = valor("subtitulo");
  const fotoInput = $("fotoCandidato");
  const cabecalho = $("previewCurriculo")?.previousElementSibling?.classList.contains("preview-header")
    ? $("previewCurriculo").previousElementSibling
    : document.querySelector(".preview-header");

  const montarCabecalho = (foto = "") => {
    if (!cabecalho) return;
    cabecalho.innerHTML = `<div style="text-align:center;">${foto}<h3 style="margin:5px 0;">${escapeHTML(nome)}</h3>${subtitulo ? `<h4 style="margin:0; font-style:italic; font-weight:normal;">${escapeHTML(subtitulo)}</h4>` : ""}</div>`;
  };

  if (fotoInput?.files?.[0]) {
    const reader = new FileReader();
    reader.onload = (evento) => montarCabecalho(`<img src="${evento.target.result}" alt="Foto do candidato" style="max-width:100px; border-radius:6px; display:block; margin:0 auto;">`);
    reader.readAsDataURL(fotoInput.files[0]);
  } else montarCabecalho();

  const contatos = [
    ["Idade", valor("idade")], ["Telefone", valor("telefone")], ["E-mail", valor("email")],
    ["Localização", valor("localizacao")], ["LinkedIn", valor("linkedin")],
    ["Portfólio", valor("portfolio")], ["Pretensão Salarial", valor("pretensaoSalarial")]
  ].filter(([, conteudo]) => conteudo);
  if (contatos.length) html += `<h2>Dados de Contato</h2><ul>${contatos.map(([rotulo, conteudo]) => `<li>${rotulo}: ${escapeHTML(conteudo)}</li>`).join("")}</ul>`;

  if (valor("objetivo")) html += `<h2>Objetivo</h2><p>${textoComQuebras(valor("objetivo"))}</p>`;
  if (valor("resumoProfissional")) html += `<h2>Resumo Profissional</h2><p>${textoComQuebras(valor("resumoProfissional"))}</p>`;

  const projetos = Array.from(document.querySelectorAll("#projetos > div")).map((div) => {
    const titulo = div.querySelector("input[placeholder='Título do Projeto']")?.value.trim() || "";
    const objetivo = div.querySelector("textarea")?.value.trim() || "";
    const tecnologias = div.querySelector("input[placeholder='Tecnologias/Ferramentas']")?.value.trim() || "";
    const link = div.querySelector("input[placeholder='Link do Projeto']")?.value.trim() || "";
    if (!titulo && !objetivo && !tecnologias && !link) return "";
    return `<p><strong>${escapeHTML(titulo)}</strong><br>${objetivo ? `Objetivo:<br><span style="display:block;margin-left:12px;">${textoComQuebras(bulletizarFrasesMaiusculas(objetivo))}</span><br>` : ""}${tecnologias ? `Tecnologias: ${escapeHTML(tecnologias)}<br>` : ""}${link ? `Link: ${escapeHTML(link)}` : ""}</p>`;
  }).filter(Boolean).join("");
  if (projetos) html += `<h2>Projetos Acadêmicos</h2>${projetos}`;

  const experiencias = Array.from(document.querySelectorAll("#experiencias > div")).map((div) => {
    const empresa = div.querySelector("input[placeholder='Empresa']")?.value.trim() || "";
    const cargo = div.querySelector("input[placeholder='Cargo']")?.value.trim() || "";
    const inicio = formatarMesAno(div.querySelector(".inicio")?.value || "");
    const fim = formatarMesAno(div.querySelector(".fim")?.value || "");
    const status = div.querySelector("select")?.value || "";
    const descricao = div.querySelector("textarea")?.value.trim() || "";
    if (!empresa && !cargo && !descricao) return "";
    const periodo = [inicio || "?", status === "atual" ? "o momento" : fim || "?"].join(" até ");
    const itens = descricao.split(/\r?\n/).map((l) => l.trim().replace(/^[•\-–—]\s*/, "")).filter(Boolean);
    return `<p><strong>${escapeHTML(cargo)}</strong> - ${escapeHTML(empresa)} (${periodo})</p>${itens.length ? `<ul>${itens.map((i) => `<li>${escapeHTML(i)}</li>`).join("")}</ul>` : ""}`;
  }).filter(Boolean).join("");
  if (experiencias) html += `<h2>Experiência Profissional</h2>${experiencias}`;

  const listaSimples = (seletor, montar) => Array.from(document.querySelectorAll(seletor)).map(montar).filter(Boolean);
  const formacoes = listaSimples("#formacoes > div", (div) => {
    const curso = div.querySelector("input[placeholder='Curso']")?.value.trim() || "";
    const instituicao = div.querySelector("input[placeholder='Instituição']")?.value.trim() || "";
    if (!curso && !instituicao) return "";
    const status = div.querySelector("select")?.value;
    const data = status === "concluido" ? div.querySelector(".ano")?.value.trim() : div.querySelector(".termino")?.value.trim();
    const complemento = data ? ` (${status === "cursando" ? "Previsão: " : ""}${escapeHTML(data)})` : "";
    return `${escapeHTML(curso)} - ${escapeHTML(instituicao)}${complemento}`;
  });
  if (formacoes.length) html += `<h2>Formação Acadêmica</h2><ul>${formacoes.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  const habilidades = Array.from(document.querySelectorAll("#habilidades input")).map((i) => i.value.trim()).filter(Boolean);
  if (habilidades.length) html += `<h2>Habilidades Técnicas</h2><ul>${habilidades.map((i) => `<li>${escapeHTML(i)}</li>`).join("")}</ul>`;

  const cursos = listaSimples("#cursos > div", (div) => {
    const curso = div.querySelector("input[placeholder='Nome do Curso']")?.value.trim() || "";
    const instituicao = div.querySelector("input[placeholder='Instituição']")?.value.trim() || "";
    if (!curso && !instituicao) return "";
    const status = div.querySelector("select")?.value;
    const data = status === "concluido" ? div.querySelector(".ano")?.value.trim() : div.querySelector(".termino")?.value.trim();
    return `${escapeHTML(curso)} - ${escapeHTML(instituicao)}${data ? ` (${status === "cursando" ? "Previsão: " : ""}${escapeHTML(data)})` : ""}`;
  });
  if (cursos.length) html += `<h2>Cursos</h2><ul>${cursos.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  const idiomas = listaSimples("#idiomas > div", (div) => {
    const idioma = nomeIdioma(div);
    return idioma ? `${escapeHTML(idioma)} - ${escapeHTML(nivelIdioma(div))}` : "";
  });
  if (idiomas.length) html += `<h2>Idiomas</h2><ul>${idiomas.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  const complementares = valor("informacoesComplementares").split(/\r?\n/).map((l) => l.trim().replace(/^[•\-–—]\s*/, "")).filter(Boolean);
  if (complementares.length) html += `<h2>Informações Complementares</h2><ul>${complementares.map((i) => `<li>${escapeHTML(i)}</li>`).join("")}</ul>`;

  $("previewCurriculo").innerHTML = html || '<p style="color:#777;font-size:12px;">Preencha os campos ao lado para visualizar seu currículo aqui.</p>';
  atualizarSugestoesPalavras();
  atualizarEstimativa();
}

function togglePalavrasChaves() {
  $("blocoPalavrasChaves").style.display = $("ativarPalavrasChaves").checked ? "block" : "none";
  atualizarSugestoesPalavras();
}

function normalizarTexto(texto) {
  return String(texto || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[\u2010-\u2014]/g, "-");
}

function extrairTermos(texto) {
  const vistos = new Set();
  return String(texto || "").split(/[,;\n]+/).map((t) => t.trim()).filter((t) => {
    const chave = normalizarTexto(t);
    if (!chave || vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });
}

function sugerirOndeColocar(termo) {
  const t = normalizarTexto(termo);
  if (/(python|sql|excel|power bi|tableau|etl|api|javascript|node|react|git|linux|windows|aws|azure|docker|kubernetes|grafana|prometheus|wms|tms|sap|totvs)/.test(t)) return "Habilidades / Projetos";
  if (/(inventario|estoque|armazenagem|frota|roteirizacao|picking|packing|expedicao|recebimento|acuracidade|lead time|kpi|sla|processo|melhoria|otimizacao|lean|six sigma|kanban)/.test(t)) return "Experiência / Projetos";
  if (/(iso 27001|sgsi|lgpd|compliance|auditoria|gestao de riscos|seguranca da informacao)/.test(t)) return "Objetivo / Experiência / Certificações";
  return "Objetivo / Experiência";
}

function atualizarSugestoesPalavras() {
  const area = $("sugestoesPalavras");
  if (!area) return;
  if (!$("ativarPalavrasChaves")?.checked) {
    area.innerHTML = "";
    return;
  }
  const termos = extrairTermos($("textoPalavrasChaves")?.value || "");
  if (!termos.length) {
    area.innerHTML = "<em>Dica: cole termos da própria vaga.</em>";
    return;
  }
  const base = normalizarTexto($("previewCurriculo")?.innerText || "");
  const encontrados = termos.filter((t) => base.includes(normalizarTexto(t)));
  const faltantes = termos.filter((t) => !base.includes(normalizarTexto(t)));
  area.innerHTML = `<strong>Termos encontrados no currículo:</strong> ${encontrados.length ? escapeHTML(encontrados.join(", ")) : "<em>nenhum</em>"}<br><br><strong>Termos faltando:</strong>${faltantes.length ? `<ul>${faltantes.map((t) => `<li><strong>${escapeHTML(t)}</strong> → ${escapeHTML(sugerirOndeColocar(t))}</li>`).join("")}</ul>` : " <em>nenhum</em>"}`;
}

function escreverTexto(texto, x, largura, y, doc) {
  const linhas = doc.splitTextToSize(String(texto || ""), largura);
  linhas.forEach((linha) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(linha, x, y);
    y += 5;
  });
  return y;
}

function tituloPDF(doc, titulo, y) {
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  return escreverTexto(`${titulo}:`, 10, 180, y, doc);
}

function gerarPDF() {
  if (!window.jspdf?.jsPDF) {
    alert("Não foi possível carregar o gerador de PDF. Atualize a página e tente novamente.");
    return;
  }
  const doc = new window.jspdf.jsPDF();
  const foto = $("fotoCandidato")?.files?.[0];
  const concluir = () => {
    finalizarPDF(doc);
    doc.save("curriculo.pdf");
  };
  if (!foto) return concluir();
  const reader = new FileReader();
  reader.onload = (evento) => {
    try {
      const tipo = foto.type.toLowerCase().includes("png") ? "PNG" : "JPEG";
      doc.addImage(evento.target.result, tipo, 10, 10, 30, 40);
    } catch (erro) {
      console.error("Não foi possível inserir a foto no PDF:", erro);
    }
    concluir();
  };
  reader.onerror = concluir;
  reader.readAsDataURL(foto);
}

function finalizarPDF(doc) {
  let y = 55;
  const nome = valor("nomeCompleto");
  const subtitulo = valor("subtitulo");
  const larguraPagina = doc.internal.pageSize.getWidth();
  if (nome) {
    doc.setFontSize(20); doc.setFont("helvetica", "bold");
    doc.text(nome, (larguraPagina - doc.getTextWidth(nome)) / 2, 25);
  }
  if (subtitulo) {
    doc.setFontSize(14); doc.setFont("helvetica", "italic");
    doc.text(subtitulo, (larguraPagina - doc.getTextWidth(subtitulo)) / 2, 35);
  }

  const contatos = [["Idade", valor("idade")], ["Telefone", formatarTelefone(valor("telefone"))], ["E-mail", valor("email")], ["Localização", valor("localizacao")], ["LinkedIn", valor("linkedin")], ["Portfólio", valor("portfolio")], ["Pretensão Salarial", valor("pretensaoSalarial")]].filter(([, v]) => v);
  if (contatos.length) {
    y = tituloPDF(doc, "Dados de Contato", y); doc.setFont("helvetica", "normal"); doc.setFontSize(11);
    contatos.forEach(([r, v]) => { y = escreverTexto(`• ${r}: ${v}`, 12, 170, y, doc); }); y += 8;
  }
  const secoesTexto = [["Objetivo", valor("objetivo")], ["Resumo Profissional", valor("resumoProfissional")]];
  secoesTexto.forEach(([titulo, texto]) => { if (texto) { y = tituloPDF(doc, titulo, y); doc.setFont("helvetica", "normal"); doc.setFontSize(11); y = escreverTexto(texto, 12, 170, y, doc) + 8; } });

  const projetos = Array.from(document.querySelectorAll("#projetos > div"));
  if (projetos.some((p) => p.querySelector("input,textarea")?.value.trim())) {
    y = tituloPDF(doc, "Projetos Acadêmicos", y);
    projetos.forEach((p) => {
      const titulo = p.querySelector("input[placeholder='Título do Projeto']")?.value.trim() || "";
      const objetivo = p.querySelector("textarea")?.value.trim() || "";
      const tecnologias = p.querySelector("input[placeholder='Tecnologias/Ferramentas']")?.value.trim() || "";
      const link = p.querySelector("input[placeholder='Link do Projeto']")?.value.trim() || "";
      if (!titulo && !objetivo && !tecnologias && !link) return;
      if (titulo) { doc.setFont("helvetica", "bold"); y = escreverTexto(titulo, 12, 170, y + 3, doc); }
      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      if (objetivo) y = escreverTexto(`Objetivo:\n${bulletizarFrasesMaiusculas(objetivo)}`, 12, 170, y, doc);
      if (tecnologias) y = escreverTexto(`Tecnologias: ${tecnologias}`, 12, 170, y, doc);
      if (link) y = escreverTexto(`Link: ${link}`, 12, 170, y, doc);
    }); y += 8;
  }

  const exp = Array.from(document.querySelectorAll("#experiencias > div"));
  if (exp.some((e) => e.querySelector("input[placeholder='Empresa']")?.value.trim() || e.querySelector("input[placeholder='Cargo']")?.value.trim() || e.querySelector("textarea")?.value.trim())) {
    y = tituloPDF(doc, "Experiência Profissional", y); doc.setFont("helvetica", "normal"); doc.setFontSize(11);
    exp.forEach((e) => {
      const empresa = e.querySelector("input[placeholder='Empresa']")?.value.trim() || "";
      const cargo = e.querySelector("input[placeholder='Cargo']")?.value.trim() || "";
      const descricao = e.querySelector("textarea")?.value.trim() || "";
      if (!empresa && !cargo && !descricao) return;
      const inicio = formatarMesAno(e.querySelector(".inicio")?.value || "");
      const fim = e.querySelector("select")?.value === "atual" ? "o momento" : formatarMesAno(e.querySelector(".fim")?.value || "");
      y = escreverTexto(`• ${cargo} - ${empresa} (${inicio} até ${fim})`, 12, 170, y, doc);
      if (descricao) y = escreverTexto(descricao.split(/\r?\n/).map((l) => `• ${l.replace(/^[•\-–—]\s*/, "").trim()}`).filter((l) => l !== "• ").join("\n"), 16, 165, y, doc) + 5;
    }); y += 8;
  }

  const adicionarLista = (titulo, itens) => {
    if (!itens.length) return;
    y = tituloPDF(doc, titulo, y); doc.setFont("helvetica", "normal"); doc.setFontSize(11);
    itens.forEach((item) => { y = escreverTexto(`• ${item}`, 12, 170, y, doc); }); y += 8;
  };

  adicionarLista("Formação Acadêmica", Array.from(document.querySelectorAll("#formacoes > div")).map((d) => {
    const curso = d.querySelector("input[placeholder='Curso']")?.value.trim() || ""; const inst = d.querySelector("input[placeholder='Instituição']")?.value.trim() || ""; if (!curso && !inst) return "";
    const status = d.querySelector("select")?.value; const data = status === "concluido" ? d.querySelector(".ano")?.value.trim() : d.querySelector(".termino")?.value.trim();
    return `${curso} - ${inst}${data ? ` (${status === "cursando" ? "Previsão: " : ""}${data})` : ""}`;
  }).filter(Boolean));
  adicionarLista("Habilidades Técnicas", Array.from(document.querySelectorAll("#habilidades input")).map((i) => i.value.trim()).filter(Boolean));
  adicionarLista("Cursos", Array.from(document.querySelectorAll("#cursos > div")).map((d) => {
    const curso = d.querySelector("input[placeholder='Nome do Curso']")?.value.trim() || ""; const inst = d.querySelector("input[placeholder='Instituição']")?.value.trim() || ""; if (!curso && !inst) return "";
    const status = d.querySelector("select")?.value; const data = status === "concluido" ? d.querySelector(".ano")?.value.trim() : d.querySelector(".termino")?.value.trim();
    return `${curso} - ${inst}${data ? ` (${status === "cursando" ? "Previsão: " : ""}${data})` : ""}`;
  }).filter(Boolean));
  adicionarLista("Idiomas", Array.from(document.querySelectorAll("#idiomas > div")).map((d) => nomeIdioma(d) ? `${nomeIdioma(d)} - ${nivelIdioma(d)}` : "").filter(Boolean));
  adicionarLista("Informações Complementares", valor("informacoesComplementares").split(/\r?\n/).map((l) => l.trim().replace(/^[•\-–—]\s*/, "")).filter(Boolean));
}

function salvarComoTXT() {
  const linhas = [];
  const nome = valor("nomeCompleto") || "curriculo";
  linhas.push(`Nome: ${nome}`);
  [["Subtítulo", valor("subtitulo")], ["Idade", valor("idade")], ["Telefone", valor("telefone")], ["E-mail", valor("email")], ["Localização", valor("localizacao")], ["LinkedIn", valor("linkedin")], ["Portfólio", valor("portfolio")], ["Pretensão Salarial", valor("pretensaoSalarial")]].forEach(([r, v]) => { if (v) linhas.push(`${r}: ${v}`); });
  const secaoTexto = (titulo, texto) => { if (texto) linhas.push("", `${titulo}:`, texto); };
  secaoTexto("Objetivo", valor("objetivo"));
  secaoTexto("Resumo Profissional", valor("resumoProfissional"));

  const inserirSecao = (titulo, itens) => { if (itens.length) linhas.push("", `${titulo}:`, ...itens); };
  inserirSecao("Projetos Acadêmicos", Array.from(document.querySelectorAll("#projetos > div")).map((p) => {
    const t = p.querySelector("input[placeholder='Título do Projeto']")?.value.trim() || ""; const o = p.querySelector("textarea")?.value.trim() || ""; const tec = p.querySelector("input[placeholder='Tecnologias/Ferramentas']")?.value.trim() || ""; const link = p.querySelector("input[placeholder='Link do Projeto']")?.value.trim() || "";
    if (!t && !o && !tec && !link) return "";
    return [`- ${t}`, o ? `  Objetivo: ${bulletizarFrasesMaiusculas(o).replace(/\n/g, "\n  ")}` : "", tec ? `  Tecnologias: ${tec}` : "", link ? `  Link: ${link}` : ""].filter(Boolean).join("\n");
  }).filter(Boolean));
  inserirSecao("Experiência Profissional", Array.from(document.querySelectorAll("#experiencias > div")).map((e) => {
    const empresa = e.querySelector("input[placeholder='Empresa']")?.value.trim() || ""; const cargo = e.querySelector("input[placeholder='Cargo']")?.value.trim() || ""; const desc = e.querySelector("textarea")?.value.trim() || ""; if (!empresa && !cargo && !desc) return "";
    const inicio = formatarMesAno(e.querySelector(".inicio")?.value || ""); const fim = e.querySelector("select")?.value === "atual" ? "o momento" : formatarMesAno(e.querySelector(".fim")?.value || "");
    return `- ${cargo} em ${empresa} (${inicio} até ${fim})${desc ? `\n${desc}` : ""}`;
  }).filter(Boolean));
  inserirSecao("Formação Acadêmica", Array.from(document.querySelectorAll("#formacoes > div")).map((d) => {
    const c = d.querySelector("input[placeholder='Curso']")?.value.trim() || ""; const i = d.querySelector("input[placeholder='Instituição']")?.value.trim() || ""; if (!c && !i) return ""; const s = d.querySelector("select")?.value; const data = s === "concluido" ? d.querySelector(".ano")?.value.trim() : d.querySelector(".termino")?.value.trim(); return `- ${c} - ${i}${data ? ` (${s === "cursando" ? "Previsão: " : ""}${data})` : ""}`;
  }).filter(Boolean));
  inserirSecao("Habilidades Técnicas", Array.from(document.querySelectorAll("#habilidades input")).map((i) => i.value.trim() ? `- ${i.value.trim()}` : "").filter(Boolean));
  inserirSecao("Cursos", Array.from(document.querySelectorAll("#cursos > div")).map((d) => {
    const c = d.querySelector("input[placeholder='Nome do Curso']")?.value.trim() || ""; const i = d.querySelector("input[placeholder='Instituição']")?.value.trim() || ""; if (!c && !i) return ""; const s = d.querySelector("select")?.value; const data = s === "concluido" ? d.querySelector(".ano")?.value.trim() : d.querySelector(".termino")?.value.trim(); return `- ${c} - ${i}${data ? ` (${s === "cursando" ? "Previsão: " : ""}${data})` : ""}`;
  }).filter(Boolean));
  inserirSecao("Idiomas", Array.from(document.querySelectorAll("#idiomas > div")).map((d) => nomeIdioma(d) ? `- ${nomeIdioma(d)} (${nivelIdioma(d)})` : "").filter(Boolean));
  inserirSecao("Informações Complementares", valor("informacoesComplementares").split(/\r?\n/).map((l) => l.trim().replace(/^[•\-–—]\s*/, "")).filter(Boolean).map((l) => `• ${l}`));

  const blob = new Blob([linhas.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = `${nome}.txt`; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function importarTXT(event) {
  const arquivo = event.target.files?.[0];
  if (!arquivo) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const linhas = String(e.target.result || "").split(/\r?\n/);
    let secao = "";
    let ultimo = null;
    ["objetivo", "resumoProfissional", "informacoesComplementares"].forEach((id) => { if ($(id)) $(id).value = ""; });
    const titulos = { "Objetivo:": "objetivo", "Resumo Profissional:": "resumo", "Projetos Acadêmicos:": "projetos", "Experiência Profissional:": "experiencia", "Formação Acadêmica:": "formacao", "Habilidades Técnicas:": "habilidade", "Cursos:": "curso", "Idiomas:": "idioma", "Informações Complementares:": "complementares" };
    linhas.forEach((linha) => {
      const t = linha.trim();
      const campos = { "Nome:": "nomeCompleto", "Subtítulo:": "subtitulo", "Idade:": "idade", "Telefone:": "telefone", "E-mail:": "email", "Localização:": "localizacao", "LinkedIn:": "linkedin", "Portfólio:": "portfolio", "Pretensão Salarial:": "pretensaoSalarial" };
      const prefixo = Object.keys(campos).find((p) => linha.startsWith(p));
      if (prefixo) { $(campos[prefixo]).value = linha.slice(prefixo.length).trim(); return; }
      if (titulos[t]) { secao = titulos[t]; ultimo = null; return; }
      if (!t) return;
      if (secao === "objetivo" || secao === "resumo" || secao === "complementares") {
        const id = secao === "objetivo" ? "objetivo" : secao === "resumo" ? "resumoProfissional" : "informacoesComplementares";
        const limpo = secao === "complementares" ? t.replace(/^[•\-]\s*/, "") : t;
        $(id).value += `${$(id).value ? "\n" : ""}${limpo}`; return;
      }
      if (secao === "projetos") {
        if (/^-\s*/.test(t)) { addProjeto(); ultimo = document.querySelector("#projetos > div:last-child"); ultimo.querySelector("input[placeholder='Título do Projeto']").value = t.replace(/^-\s*/, ""); }
        else if (ultimo && t.startsWith("Objetivo:")) ultimo.querySelector("textarea").value = t.replace("Objetivo:", "").trim();
        else if (ultimo && t.startsWith("Tecnologias:")) ultimo.querySelector("input[placeholder='Tecnologias/Ferramentas']").value = t.replace("Tecnologias:", "").trim();
        else if (ultimo && t.startsWith("Link:")) ultimo.querySelector("input[placeholder='Link do Projeto']").value = t.replace("Link:", "").trim();
        else if (ultimo) ultimo.querySelector("textarea").value += `${ultimo.querySelector("textarea").value ? "\n" : ""}${t.replace(/^•\s*/, "")}`;
        return;
      }
      if (secao === "experiencia") {
        if (/^[-•]\s*/.test(t)) {
          addExperiencia(); ultimo = document.querySelector("#experiencias > div:last-child");
          const m = t.replace(/^[-•]\s*/, "").match(/^(.*?) em (.*?) \((.*?)\)$/);
          if (m) { ultimo.querySelector("input[placeholder='Cargo']").value = m[1].trim(); ultimo.querySelector("input[placeholder='Empresa']").value = m[2].trim(); const partes = m[3].split(" até "); ultimo.querySelector(".inicio").value = converterMesAnoParaData(partes[0]); const atual = /momento/i.test(partes[1] || ""); ultimo.querySelector("select").value = atual ? "atual" : "antigo"; ultimo.querySelector(".fim").value = atual ? "" : converterMesAnoParaData(partes[1] || ""); toggleEmpregoAtual(ultimo.querySelector("select")); }
        } else if (ultimo) ultimo.querySelector("textarea").value += `${ultimo.querySelector("textarea").value ? "\n" : ""}${t}`;
        return;
      }
      if (secao === "habilidade" && /^[-•]\s*/.test(t)) { addHabilidade(); document.querySelector("#habilidades > div:last-child input").value = t.replace(/^[-•]\s*/, ""); return; }
      if (secao === "idioma" && /^[-•]\s*/.test(t)) {
        addIdioma(); ultimo = document.querySelector("#idiomas > div:last-child"); const m = t.replace(/^[-•]\s*/, "").match(/^(.*?)\s*\((.*?)\)$/); if (!m) return;
        const nomes = { "português": "portugues", "inglês": "ingles", "espanhol": "espanhol" }; const niveis = { "básico": "basico", "intermediário": "intermediario", "avançado": "avancado", "nativo": "nativo", "técnico": "tecnico" };
        ultimo.querySelector(".idioma").value = nomes[m[1].toLowerCase()] || "outro"; ultimo.querySelector(".nivel").value = niveis[m[2].toLowerCase()] || "basico"; if (ultimo.querySelector(".idioma").value === "outro") { ultimo.querySelector(".idiomaOutro").value = m[1]; toggleIdiomaOutro(ultimo.querySelector(".idioma")); } return;
      }
      if ((secao === "formacao" || secao === "curso") && /^[-•]\s*/.test(t)) {
        secao === "formacao" ? addFormacao() : addCurso(); const seletor = secao === "formacao" ? "#formacoes > div:last-child" : "#cursos > div:last-child"; ultimo = document.querySelector(seletor);
        const limpo = t.replace(/^[-•]\s*/, ""); const m = limpo.match(/^(.*?) - (.*?)(?: \((.*?)\))?$/); if (!m) return;
        ultimo.querySelector(secao === "formacao" ? "input[placeholder='Curso']" : "input[placeholder='Nome do Curso']").value = m[1].trim(); ultimo.querySelector("input[placeholder='Instituição']").value = m[2].trim();
        if (m[3]) { const cursando = /^Previsão:/i.test(m[3]); ultimo.querySelector("select").value = cursando ? "cursando" : "concluido"; secao === "formacao" ? toggleFormacaoAno(ultimo.querySelector("select")) : toggleCursoStatus(ultimo.querySelector("select")); ultimo.querySelector(cursando ? ".termino" : ".ano").value = m[3].replace(/^Previsão:\s*/i, ""); }
      }
    });
    atualizarPreview();
    event.target.value = "";
  };
  reader.readAsText(arquivo, "utf-8");
}

document.addEventListener("DOMContentLoaded", () => {
  const objetivo = $("objetivo");
  if (objetivo) objetivo.addEventListener("input", function () { ajustarAlturaTextarea(this); });
  ["nomeCompleto", "subtitulo", "idade", "telefone", "email", "localizacao", "linkedin", "portfolio", "pretensaoSalarial", "objetivo", "resumoProfissional", "informacoesComplementares"].forEach((id) => $(id)?.addEventListener("input", atualizarPreview));
  $("fotoCandidato")?.addEventListener("change", atualizarPreview);
  $("textoPalavrasChaves")?.addEventListener("input", atualizarSugestoesPalavras);
  $("ativarPalavrasChaves")?.addEventListener("change", atualizarSugestoesPalavras);
  atualizarPreview();
});
