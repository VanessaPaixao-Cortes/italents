

// Funções para alternar as imgens do banner no inicio
function slide1() {
    document.getElementById('troca').src = "img/banner3.jpg";
    setTimeout("slide2()", 4000)
}

function slide2() {
    document.getElementById('troca').src = "img/banner2.jpg";
    setTimeout("slide3()", 4000)
}

function slide3() {
    document.getElementById('troca').src = "img/banner1.jpg";
    setTimeout("slide1()", 4000)
}
// ######################################################

// Função para validar os campos do formulário de contato, atravez de expressoes regulares
function valida(form1) {

    // Valida campo nome

    if (form1.nome.value.search(/^[a-z\s]{1,200}$/i)) {
        alert("Verifique o campo nome. Somente são permitidos letras e não pode exceder 100 caracteres!")
        form1.nome.focus();
        return false
    }

    // Valida campo email
    if (form1.email.value.search(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
        alert("Verifique o campo email pois o mesmo não é válido!")
        form1.email.focus();
        return false
    }

    // Valida campo telefone
    if (form1.telefone.value.search(/^\(?(\d{3})\)?[\.\-\/]?(\d{4})[\.\-\/]?(\d{4})$/)) {
        alert("Verifique o campo telefone. Máscara esperada: (XXX)XXXX-XXXX")
        form1.telefone.focus();
        return false
    }

    // Valida campo endereco
    if (form1.endereco.value == "") {
        alert("Endereço não pode ficar em branco!")
        form1.endereco.focus()
        return false
    }

    // Valida campo assunto
    if (form1.assunto.value == "") {
        alert("Assunto não pode ficar em branco!")
        form1.assunto.focus()
        return false
    }

    // Valida campo mensagem
    if (form1.mensagem.value == "") {
        alert("Mensagem não pode ficar em branco!")
        form1.mensagem.focus()
        return false
    }

    alert("Mensagem Enviada!")

    // Limpa os campos
    form1.reset()

    return true
}
    // ##############################