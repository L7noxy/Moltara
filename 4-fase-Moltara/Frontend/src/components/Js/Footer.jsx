import React from 'react'
import '../Css/Footer.css'

export default function Footer() {
    return (
        <div className="container-footer">
            <div className="departamentos">
                <h3>Departamentos</h3>
                <ul>
                    <li>Hardware</li>
                    <li>Celular e Smartphone</li>
                    <li>Periféricos</li>
                    <li>Teclado e Mouse</li>
                    <li>Computadores</li>
                    <li>Monitores</li>
                    <li>Impressoras</li>
                    <li>Acessórios</li>
                    <li>Outros</li>
                </ul>
            </div>
            <div className="promocoes">
                <h3>Promoções</h3>
                <ul>
                    <li>Promoção 1</li>
                    <li>Promoção 2</li>
                    <li>Promoção 3</li>
                </ul>
            </div>
            <div className="conta">
                <h3>Minha Conta</h3>
                <ul>
                    <li>Perfil</li>
                    <li>Pedidos</li>
                    <li>Endereços</li>
                </ul>
            </div>
            <div className="midias">
                <h3>Redes Sociais</h3>
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                </ul>
            </div>
            <div className="atendimento">
                <h3>Atendimento</h3>
                <ul>
                    <li>Contato</li>
                    <li>FAQ</li>
                    <li>Suporte</li>
                </ul>
            </div>
        </div>
    )
}
