import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../components/header'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';





const ListaVagas = () => {


  const [data, setData] = useState([
    { id: '3', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto' , descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '4', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto', descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '5', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto', descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '6', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '7', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '8', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '9', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '10', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '11', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '12', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '13', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '14', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade: 'Remoto',descricao:"A EmpresaVarejo de luxo.Descrição da vaga Recepção de clientes em loja;Encaminhamento ao vendedor responsável;Organização geral da loja;Recebimento dos produtos;Reposição de produtos;Relacionamento com os clientes e pós venda.Perfil desejadoExperiência em segmento de varejo;Flexibilidade de horário e disponibilidade para trabalhar em regime presencial em shopping;Boa comunicação;Organizado;Forte habilidade de atendimento ao cliente." },
    { id: '15', name: 'Fullstack Software Engineer', empresa: 'Plan A Technologies', modalidade : 'Remoto', descricao:"Nível: AnalistaCusos de: Bacharelado em Publicidade e propaganda,MarketingEscolaridade: Graduação - CompletoTipo de contrato: CLTJornada de trabalho: De Segunda à Sexta-Feira das 09h ás 19hBenefícios: 🍔 Vale Refeição de R$ 40,00, 🩺 Assistência Médica, 🦷 Assistência Odontológica, 🤍 Seguro de Vida, TotalPassResponsabilidades e Experiências Desejáveis\nMUDANDO VIDAS A PARTIR DO COACHING INTEGRAL SISTÊMICO.Com matriz em Barueri (SP), filial em Fortaleza (CE) e núcleos em mais de 40 cidades do Brasil, incluindo EUA e mais três continentes, a Febracis já impactou mais de 70 milhões pessoas ao longo de sua trajetória. A história da instituição tem início em 1998, ainda como Instituto Paulo Vieira e só depois passa a ser chamada Febracis, reforçando a continuidade do compromisso em atender seus clientes com respeito e responsabilidade. A atuação da Febracis é destaque no mercado por transformar vidas por meio do Coaching Integral Sistêmico (CIS), um processo que se adequa à"}
  ]);
  const navigation = useNavigation();


  const handleVagaClick = (item) =>{
    navigation.navigate('DetalheVagaScreen', item );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() =>handleVagaClick(item)}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.empresaText}>{item.empresa}</Text>
      <Text>{item.modalidade}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
    <Header/>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 7,
  },
  nameText:{
    fontFamily: 'monospace',
    fontSize: 15,
  },
  empresaText: {
    fontSize: 13,
  }
});

export default ListaVagas;
