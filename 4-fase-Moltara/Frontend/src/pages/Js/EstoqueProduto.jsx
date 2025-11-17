import '../Css/EstoqueProduto.css'

export default function EstoqueProduto() {
const [produtos, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProduto('http://localhost:3000/api/produto/buscar');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar dados dos produtos:', error);
      }
    }
  }, []);


  return (
    <div>
      <div className='container-estoque'>
        <h2>produtos no estoque: </h2>
        <table className='tabela-estoque'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Preço (R$)</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.estoque}</td>
                <td>{produto.preco}</td>
                <td className={produto.baixoEstoque ? 'low-stock' : 'in-stock'}>
                  {produto.baixoEstoque ? 'Estoque Baixo' : 'Em Estoque'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}