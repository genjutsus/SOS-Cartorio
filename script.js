document.addEventListener('DOMContentLoaded', () => {
    const optionsSelect = document.getElementById('options');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const instructions = document.getElementById('instructions');

    const forms = {
        form1: `
            <span color="red"><strong>APÓS CLICAR EM ENVIAR, A PEÇA SERÁ PRODUZIDA, BASTANDO COPIAR E COLAR NO SCO. SE NECESSÁRIO, FAÇA SUAS EDIÇÕES ANTES DE GRAVAR.</strong></span><br><form id="form1">
                <label for="input1ima">Destinatário (nome da pessoa ou função):</label>
                <input type="text" id="input1ima" name="input1ima" placeholder="Responsável pelo Condomínio Leblon Ocean" required><br>
            <font size="1"><i>Na falta de uma forma melhor de se referir ao destinatário, utilize algo como "Responsável pelo edifício localizado na Rua Barão da Torre, 255"</i></font>
                <br>
                <label for="input2ima">Você deseja imagens de qual área específica? ("da calçada"/"da recepção"/"da portaria e do depósito"/etc)</label>
                <input type="text" id="input2ima" name="input2ima" placeholder="da calçada" required><br>
                
                <label for="input3ima">Endereço sobre o qual se referem as imagens:</label>
                <input type="text" id="input3ima" name="input3ima" placeholder="Rua Barão da Torre, 255" required><br>
                
                <label for="input4ima">Momento inicial das imagens:</label>
                <input type="text" id="input4ima" name="input4ima" placeholder="06h00 (21/10/2024)" required><br>
                
                <label for="input5ima">Momento final das imagens:</label>
                <input type="text" id="input5ima" name="input5ima" placeholder="18h00 (21/10/2024)" required><br>
                
                <input type="submit" value="Enviar">
            </form>
        `,
        form2: `
            <form id="form2">
                <label for="2nome">Nome da vítima-comunicante:</label>
                <input type="text" id="2nome" name="2nome" required><br>

                <label for="2data">Data do crime:</label>
                <input type="text" id="2data" name="2data" required><br>

                <label for="2hora">Hora do crime:</label>
                <input type="text" id="2hora" name="2hora" required><br>

                <label for="2local">Local do crime:</label>
                <input type="text" id="2local" name="2local" required><br>

                <label for="2meio">Meio de locomoção do criminoso:</label>
                <select id="2meio" name="2meio" required>
                <option value="a pé">A pé</option>
                <option value="se locomovendo com bicicleta">Bicicleta</option>
                <option value="se locomovendo com bicicleta elétrica">Bicicleta Elétrica</option>
                <option value="se locomovendo com motocicleta">Moto</option>
                <option value="se locomovendo com carro">Carro</option>
            </select><br>

                <label for="2fazendo">O que a vítima estava fazendo na hora do arrebatamento?</label>
                <input type="text" id="2fazendo" name="2fazendo" required><br>

                <label for="2acompanhado">O criminoso estava sozinho ou acompanhado?</label>
                <input type="text" id="2acompanhado" name="2acompanhado" required><br>

                <label for="2evadiu">O criminoso evadiu-se em direção a...</label>
                <input type="text" id="2evadiu" name="2evadiu" required><br>

                <label for="2descricao">Descrição do criminoso:</label>
                <input type="text" id="2descricao" name="2descricao" required><br>

                <label for="2imei">IMEI do celular subtraído:</label>
                <input type="text" id="2imei" name="2imei" required><br>

                <label for="2modelo">Modelo do celular subtraído:</label>
                <input type="text" id="2modelo" name="2modelo" required><br>

                <label for="2testemunhas">Testemunharam o fato:</label>
                <input type="text" id="2testemunhas" name="2testemunhas" required><br>

                <label for="2probabilidade">É provável, improvável ou impossível que haja imagens de câmera?</label>
                <input type="text" id="2probabilidade" name="2probabilidade" required><br>
                
                <input type="submit" value="Enviar">
            </form>
        `,
        form3: `
            <form id="form3">
                <label for="3nomedopreso">Nome do Preso em Flagrante:</label>
                <input type="text" id="3nomedopreso" name="3nomedopreso" required><br>
                
                <!-- Adicione os outros campos conforme necessário -->
                <input type="submit" value="Enviar">
            </form>
        `
    };

    const resultTemplates = {
        form1: {
            text: '<br> Prezado(a) {input1ima},<br><br>Venho através do presente, com fundamento no artigo 2°, §2°, da Lei n. 12.830/2013, e no artigo 6° do Código de Processo Penal, REQUISITAR, a fim de instruir o Procedimento Policial em epígrafe, que tem como objeto a apuração de crime insculpido no Código Penal:<br><br>1. Que sejam enviadas a esta unidade de polícia judiciária (14ª Delegacia de Polícia - Rua Humberto de Campos, 315, Leblon) as imagens gravadas por TODAS as câmeras de segurança que tenham imagens de câmera {input2ima}, em {input3ima}, referentes ao período entre as {input4ima} e as {input5ima}, devendo a mídia ser disponibilizada de maneira compatível com a reprodução imediata no sistema operacional Windows 10 com seus recursos nativos. Também deve ser possível identificar a localização referente a cada câmera.<br><br>2. Caso o sistema de monitoramento seja gerido exclusivamente por alguma outra empresa e, em virtude disso, não seja possível realizar o acesso às imagens, que seja disponibilizado nome, e-mail e telefone do responsável.<br><br>3. Que, nesta última hipótese, caso as imagens já tenham sido processadas pela empresa ou por algum técnico, sejam enviadas as seleções obtidas, bem como eventuais imagens dos possíveis autores.<br><br>Saliento que o prazo para cumprimento do ora requisitado é de três dias úteis, alertando o destinatário que a inobservância deste lapso temporal acarretará na prática do crime previsto no artigo 330 do Código Penal.<br><br>Att.',
            instructions: '_____________ <br> <br> <strong>Observações:</strong> <br> 1. Você deve imprimir duas cópias e deixar na caixa destinada a intimações e ofícios a serem entregues. <br> 2. O prazo padrão da peça gerada é de três dias úteis. Quando for colar a peça no SCO, pode alterar manualmente esse prazo, em casos excepcionais.'
        },
        form2: {
            text: '<strong> DINÂMICA DO FATO </strong> <br> <br> Narra o comunicante-vítima, {2nome}, que no dia {2data}, hora {2hora}, estava no local {2local}, {2fazendo}, quando surgiu um indivíduo, {2acompanhado}, que estava {2meio}, e arrebatou o seu celular ({2modelo}, IMEI nº {2imei}) de suas mãos, evadindo-se logo após em direção a {2evadiu}. As características lembradas do indivíduo que arrebatou o celular eram: {2descricao}. O fato foi testemunhado por {2testemunhas}. O comunicante afirma que é {2probabilidade} que haja imagens de câmera sobre o ocorrido. <br> <br> <strong> TERMO DE DECLARAÇÃO </strong> <br> <br> QUE no dia {2data}, hora {2hora}, estava no local {2local}, {2fazendo}, quando surgiu um indivíduo, {2acompanhado}, que estava {2meio}, e arrebatou o seu celular ({2modelo}, IMEI nº {2imei}) de suas mãos, evadindo-se logo após em direção a {2evadiu}; QUE as características lembradas do indivíduo que arrebatou o celular eram: {2descricao}; QUE o fato foi testemunhado por {2testemunhas}; QUE é {2probabilidade} que haja imagens de câmera sobre o ocorrido. E mais não disse.',
            instructions: '_____________ <br> <br> <strong>Observações:</strong> <br> 1. Se foi mais de uma pessoa envolvida na ação criminosa, tipifique como Artigo 155, § 4º, IV, do Código Penal'
        },
        form3: {
            text: 'Ilustre Sr. Diretor da SEAP,<br><br>Encaminho o nacional {3nomedopreso}, detido pelo crime conforme este procedimento, para acautelamento em unidade prisional e posterior apresentação à Audiência de Custódia no primeiro dia útil seguinte.<br><br>Cordialmente,',
            instructions: '<strong>____________</strong><br>Para menor de idade, selecione no SOS Plantão a opção de CI de Encaminhamento de Menor Apreendido'
        }
    };

    optionsSelect.addEventListener('change', (event) => {
        const formId = event.target.value;
        formContainer.innerHTML = forms[formId] || '';
        
        if (forms[formId]) {
            const form = document.getElementById(formId);
            // Remove event listeners anteriores se existirem
            form.removeEventListener('submit', handleSubmit);
            form.addEventListener('submit', handleSubmit);
        } else {
            resultContainer.style.display = 'none';
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const formId = form.id;
        let resultTextTemplate = '';
        let resultInstructions = '';

        if (resultTemplates[formId]) {
            resultTextTemplate = resultTemplates[formId].text;
            resultInstructions = resultTemplates[formId].instructions;
        }

        let result = resultTextTemplate;
        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(`{${key}}`, 'g'); // Cria uma expressão regular global
            result = result.replace(regex, value); // Substitui todas as ocorrências
        }

        resultText.innerHTML = result;
        instructions.innerHTML = resultInstructions;
        resultContainer.style.display = 'block';
    }
});
