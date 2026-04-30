/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudyItem {
  id: string;
  title: string;
  simpleTitle: string;
  description: string;
  outline: string[];
  content: string;
  references: string[];
  category: 'Messias' | 'Festas' | 'Torah' | 'Conceitos' | 'Brit Hadasha';
  createdAt: string;
}

export const studies: StudyItem[] = [
  {
    id: 'brit-hadasha-intro',
    title: 'A Brit Hadasha: A Renovação da Aliança',
    simpleTitle: 'O "Novo Testamento" anula o Antigo?',
    description: 'Entendendo como a Nova Aliança prometida em Jeremias se cumpre em Yeshua.',
    category: 'Brit Hadasha',
    createdAt: '2024-01-01T10:00:00Z',
    outline: [
      'A Promessa em Jeremias 31:31',
      'O significado de "Hadasha" (Nova vs Renovada)',
      'A Torah escrita no coração pelo Ruach HaKodesh',
      'A continuidade da Lei através do Messias'
    ],
    references: ['Jeremias 31:31-34', 'Hebreus 8:8', 'Lucas 22:20'],
    content: `
      Muitos acreditam erroneamente que a Brit Hadasha (Nova Aliança) veio para substituir a Torah. No entanto, o próprio termo em hebraico sugere uma aliança "renovada" ou levada ao seu pleno propósito.
      
      **A Promessa Profética:**
      Deus prometeu através de Jeremias que faria uma nova aliança com a casa de Israel e de Judá. O diferencial não era a mudança da Lei, mas o local onde ela seria escrita: não mais em pedras, mas nos corações.
      
      **O Papel de Yeshua:**
      Yeshua é o mediador desta aliança. Através do Seu sacrifício, o vêu foi removido, permitindo que todo seguidor tenha o Ruach HaKodesh (Espírito Santo) para capacitá-lo a viver os mandamentos por amor, e não por mera obrigação externa.
    `
  },
  {
    id: 'yeshua-messias',
    title: 'Yeshua HaMashiach (Jesus o Messias)',
    simpleTitle: 'Como entender Jesus no Seu contexto original?',
    description: 'Um olhar profundo sobre como Yeshua cumpre as promessas a Israel sem anular a Aliança.',
    category: 'Messias',
    createdAt: '2024-01-02T10:00:00Z',
    outline: [
      'A Genealogia e o Direito ao Trono de David',
      'O Mistério de Mashiach Ben Yosef (O Servo Sofredor)',
      'O Conceito de "Cumprir" a Torah (Mateus 5:17)',
      'A Unidade de Deus (Echad) e a Divindade do Messias'
    ],
    references: ['Isaías 53', 'Miquéias 5:2', 'Mateus 1:1', 'Romanos 11:26'],
    content: `
      Ao falarmos de Yeshua como o Messias, não estamos falando de uma ruptura com o Judaísmo, mas do seu ápice. No pensamento messiânico, Yeshua é a personificação da Torah Viva.
      
      **O Messias Ben Yosef:**
      Muitos se perguntam por que nem todo Israel O reconheceu. A tradição judaica fala de um Messias sofredor (Ben Yosef) que viria primeiro. Yeshua cumpriu este papel perfeitamente, trazendo expiação para os pecados.
      
      **A Continuidade da Aliança:**
      Yeshua não veio para substituir Israel, mas para expandir as bênçãos da Aliança de Abraão para todas as nações, permitindo que os gentios se tornem parte do povo de Deus através da fé.
    `
  },
  {
    id: 'shabbat',
    title: 'Shabbat: O Santuário no Tempo',
    simpleTitle: 'Onde encontramos o verdadeiro descanso?',
    description: 'O Shabbat como um memorial da criação e um ensaio para o Reino Messiânico.',
    category: 'Conceitos',
    createdAt: '2024-01-03T10:00:00Z',
    outline: [
      'O Sétimo Dia: O Único Dia Santificado na Criação',
      'Shabbat como Memorial da Libertação do Egito',
      'O Messias como "Senhor do Sábado"',
      'O Descanso Messiânico (Menuhah) na Carta aos Hebreus'
    ],
    references: ['Gênesis 2:2-3', 'Êxodo 20:8', 'Mateus 12:8', 'Hebreus 4:9'],
    content: `
      O Shabbat é um presente divino que nos ensina a parar de "fazer" para simplesmente "ser". É o único dia que Deus chamou de santo na criação.
      
      **Yeshua e o Shabbat:**
      Quando Yeshua disse que o "Sábado foi feito por causa do homem", Ele estava reafirmando seu valor como um dia de restauração. Ele não aboliu o Sábado; Ele o libertou das interpretações que impediam a misericórdia.
      
      **Significado Profético:**
      Guardar o Shabbat é declarar que Deus é o Criador e que aguardamos o "Grande Shabbat", o milênio de paz sob o governo do Messias.
    `
  },
  {
    id: 'as-sete-festas',
    title: 'As Sete Festas do Senhor: O Plano da Redenção',
    simpleTitle: 'O que cada uma das festas bíblicas representa?',
    description: 'Um guia prático sobre o significado profético das festas de Levítico 23 e como elas apontam para o Messias.',
    category: 'Festas',
    createdAt: '2024-01-04T10:00:00Z',
    outline: [
      'Pessach (Páscoa): A Morte do Cordeiro',
      'Matzot (Pães Asmos): A Sepultura e Santidade',
      'Bikkurim (Primícias): A Ressurreição',
      'Shavuot (Pentecoste): O Envio do Espírito',
      'Yom Teruah (Trombetas): O Despertar e o Arrebatamento',
      'Yom Kippur (Expiação): O Julgamento e Redenção Final',
      'Succot (Tabernáculos): A Habitação de Deus com os Homens'
    ],
    references: ['Levítico 23', '1 Coríntios 5:7', 'Colossenses 2:16-17'],
    content: `
      As Festas do Senhor não são apenas "festas judaicas", mas ensaios proféticos (Moedim) que revelam o plano de Deus para a humanidade através de Yeshua.
      
      **As Festas da Primavera (Já Cumpridas):**
      - **Pessach:** Representa a morte de Yeshua como o Cordeiro de Deus que tira o pecado do mundo.
      - **Matzot:** Representa a Sua sepultura e a vida sem o fermento do pecado.
      - **Bikkurim:** Celebra a ressurreição de Yeshua, as primícias dos que dormem.
      - **Shavuot:** Marca o envio do Ruach HaKodesh e a entrega da Torah no coração.
      
      **As Festas do Outono (A Cumprir):**
      - **Yom Teruah:** Aponta para o retorno do Messias com o som da grande trombeta.
      - **Yom Kippur:** Simboliza o dia do perdão nacional de Israel e o julgamento final.
      - **Succot:** Representa o Reino Milenar, onde o Messias habitará fisicamente entre nós.
      
      Entender estas festas é ver a Bíblia como uma história contínua e coerente, onde cada detalhe aponta para a redenção em Yeshua.
    `
  }
];

export const glossary: { term: string; meaning: string; pronunciation?: string }[] = [
  { term: 'Yeshua', meaning: 'Salvação (Nome de Jesus em hebraico)' },
  { term: 'Mashiach', meaning: 'Messias (Ungido)' },
  { term: 'Tanakh', meaning: 'A Bíblia Hebraica (Torah, Profetas e Escritos)' },
  { term: 'Echad', meaning: 'Um / Unidade (Deus é um)' },
  { term: 'Mitzvah', meaning: 'Mandamento / Boa ação' },
  { term: 'Shalom', meaning: 'Paz, plenitude, bem-estar' },
  { term: 'Brit Hadasha', meaning: 'Nova Aliança (Novo Testamento)' },
  { term: 'Ruach HaKodesh', meaning: 'Espírito Santo' },
  { term: 'Shlichim', meaning: 'Emissários / Apóstolos' }
];
