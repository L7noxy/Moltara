import React from 'react'
import './CardProduto.css'

export default function CardProduto() {

    const produtos = [
        {
            id: 1,
            name: 'Produto 1',
            description: 'Descrição do Produto 1',
            price: 9.99
        },
        {
            id: 2,
            name: 'Produto 2',
            description: 'Descrição do Produto 2',
            price: 19.99
        },
        {
            id: 3,
            name: 'Produto 3',
            description: 'Descrição do Produto 3',
            price: 29.99
        }
    ]

    return (
        <div>
            {produtos.map((produto) => (
                <div key={produto.id} className="card-produto">
                    <h2>{produto.name}</h2>
                    <p>{produto.description}</p>
                    <p>{produto.price}</p>
                </div>
            ))}
        </div>
    )
}
