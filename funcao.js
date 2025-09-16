'use strict'

const cep = document.querySelector('#cep')
const logradouro = document.querySelector('#endereco')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#estado')
const message = document.querySelector('#message')


cep.addEventListener('focusout', async () => {

    try {
        const validarCep = /^[0-9]{5}\-[0-9]{3}$/

        if (!validarCep.test(cep.value)) {
            throw { cep_error: 'CEP Inválido! Deve conter 8 dígitos numéricos.' }
        }

        const response = await fetch(`https://corsproxy.io/?url=https://cdn.apicep.com/file/apicep/${cep.value}.json`)

        if (!response.ok) {
            throw new Error('Erro na requisição para a API Postmon');
        }

        const responseCep = await response.json()
        
        if (responseCep.erro) {
            throw { cep_error: 'CEP não encontrado.' };
        }

        logradouro.value = responseCep.address
        bairro.value = responseCep.district
        cidade.value = responseCep.city
        estado.value = responseCep.state

    } catch (error) {

        if (error?.cep_error) {
            message.textContent = error.cep_error
            setTimeout(() => {
                message.textContent = ''
            }, 5000)

        }
        console.error(error)
    }

})