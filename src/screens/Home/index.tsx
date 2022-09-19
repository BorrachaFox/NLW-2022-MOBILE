import { useEffect, useState } from 'react'; 
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameCard, GameCardProps } from '../../components/gameCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { apiUrl } from '../../api';

export function Home() {
  const [games, setgames] = useState<GameCardProps[]>([]) 

  const navigation = useNavigation()

  useEffect(() => {
    fetch(`${apiUrl}/games`)
    .then(res => res.json())
    .then(data => setgames(data))
  }, [])

  function handleOpenGame({ id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl})
  }
  
  return (
    <Background>  
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  )
}