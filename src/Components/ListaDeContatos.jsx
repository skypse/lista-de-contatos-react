import React, { useState } from 'react';
import './ListaDeContatos.css';

// função lista de contatos
function ListaDeContatos() {
  // estados utilizados no componente
  const [contatos, setContatos] = useState([]); // estado para armazenar a lista de contatos
  const [nome, setNome] = useState(''); // estado para armazenar o nome do contato
  const [telefone, setTelefone] = useState(''); // estado para armazenar o telefone do contato
  const [indiceEditando, setIndiceEditando] = useState(null); // estado para armazenar o índice do contato sendo editado

  // Função para adicionar um novo contato à lista
  const adicionarContato = () => {
    // verifica se tanto o nome quanto o telefone estão preenchidos
    if (nome && telefone) {
      // se estiverem preenchidos
      if (indiceEditando !== null) {
        // se houver um índice de contato sendo editado
        const novosContatos = [...contatos]; // cópia da lista de contatos
        novosContatos[indiceEditando] = { nome, telefone }; // atualiza o contato no índice especificado
        setContatos(novosContatos); // atualiza a lista de contatos com o contato editado
        setIndiceEditando(null); // reseta o índice de edição para null
      } else {
        // se não houver um índice de contato sendo editado
        setContatos([...contatos, { nome, telefone }]); // adiciona um novo contato à lista
      }
      setNome('');
      setTelefone('');
    }
  };

  // Função para remover um contato da lista
  const removerContato = (index) => {
    // filtra a lista de contatos excluindo o contato com o índice especificado
    const novosContatos = contatos.filter((_, i) => i !== index);
    // utilizando metodo 'filter' para criar um novo array de contatos excluindo o contato que corresponde ao índice fornecido.
    setContatos(novosContatos); // atualiza a lista de contatos sem o contato removido
  };

  // Função para editar um contato da lista
  const editarContato = (index) => {
    // obtém o contato selecionado com base no índice
    const contatoSelecionado = contatos[index];
    // define os estados do nome e telefone com os valores do contato selecionado
    setNome(contatoSelecionado.nome);
    setTelefone(contatoSelecionado.telefone);
    // define o índice de edição com o índice do contato selecionado
    setIndiceEditando(index);
  };

  return (
    <div className='container'>
      <h2>Lista de Contatos</h2>
      <div>
        <input
          className='inputs'
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          className='inputs'
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone"
        />
        <button id='button' onClick={adicionarContato}>
          {indiceEditando !== null ? 'Salvar Edição' : 'Adicionar Contato'}
        </button>
      </div>
      <ul>
        {contatos.map((contato, index) => (
          <li key={index}>
            <strong>{contato.nome}:</strong> {contato.telefone}
            <button id='button' onClick={() => editarContato(index)}>Editar</button>
            <button id='button' onClick={() => removerContato(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeContatos;
