import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'

import logoImf from '../../assets/logo-nlw-esports.png';

import { THEME } from '../../theme';
import { styles } from './styles'

import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Background } from '../../components/Background';
import { DuoMatch } from '../../components/DuoMatch';
import { Heading } from '../../components/Heading';

import { apiUrl } from '../../api';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`${apiUrl}/games/${adsId}/discord`)
    .then(res => res.json())
    .then(data => setDiscordDuoSelected(data))
  }

  useEffect(() => {
    fetch(`${apiUrl}/games/${game.id}/ads`)
    .then(res => res.json())
    .then(data => setDuos(data))
  }, [])

  return(
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImf}
            style={styles.logo}
          />

          <View style={styles.right}></View>
        </View>

        <Image
          source={{ uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={ item => item.id }
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Não há anúncios publicados no momento
            </Text>
          }
        />

        <DuoMatch 
          visible={Boolean(discordDuoSelected)}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
          onRequestClose={() => setDiscordDuoSelected('')}
        />

      </SafeAreaView>
    </Background>
  )
}